/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '@/constants'
import { toast } from 'react-hot-toast'
import { Icon } from '@iconify/react'
import { formatDate } from '@/utils/format-date'

export default function AdminBankTransfers() {
  const [transfers, setTransfers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<number | null>(null)

  const fetchTransfers = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      if (!token) {
        toast.error("Admin token not found. Please log in.")
        return
      }

      const res = await axios.get(`${baseUrl}/bank-transfers?t=${Date.now()}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache"
        }
      })

      const finalData = Array.isArray(res.data) ? res.data : res.data?.data || []
      setTransfers(finalData)

    } catch (error: any) {
      console.error("Fetch Error:", error)
      toast.error(error.response?.data?.message || "Failed to load transfers")
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (transferId: number) => {
    const confirmApprove = window.confirm("Are you sure you want to verify this bank transfer?")
    if (!confirmApprove) return

    try {
      setProcessingId(transferId)
      const token = localStorage.getItem('token')

      const res = await axios.post(`${baseUrl}/bank-transfers/verify/${transferId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.status === 200 || res.status === 201) {
        toast.success("Transfer Verified Successfully!")
        fetchTransfers() 
      }
    } catch (error: any) {
      console.error("Verification Error:", error)
      toast.error(error.response?.data?.message || "Verification failed")
    } finally {
      setProcessingId(null)
    }
  }

  useEffect(() => {
    fetchTransfers()
  }, [])

  return (
    <div className="p-4 md:p-6 bg-white md:rounded-2xl shadow-sm border-b md:border border-gray-100 min-h-screen md:min-h-fit">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-800">Bank Transfer Requests</h2>
          <p className="text-[10px] md:text-xs text-gray-400 mt-0.5">Review manual bank deposits</p>
        </div>
        <button 
          onClick={fetchTransfers} 
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-gray-100 p-2 md:px-4 md:py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all"
        >
          <Icon icon="solar:restart-bold" className={loading ? 'animate-spin text-lg md:text-sm' : 'text-lg md:text-sm'} />
          <span className="hidden md:inline">Refresh List</span>
        </button>
      </div>

      {/* MOBILE VIEW: Card Layout */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {loading ? (
          <div className="py-10 text-center text-gray-400">Loading transfers...</div>
        ) : transfers.map((item) => (
          <div key={item.id} className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                 <a href={item.pop_image_url} target="_blank" rel="noreferrer" className="h-12 w-12 rounded-lg overflow-hidden border border-white shadow-sm flex-shrink-0">
                    <img src={item.pop_image_url} className="h-full w-full object-cover" alt="POP" />
                 </a>
                 <div>
                    <p className="font-bold text-gray-800 leading-tight">{item.depositor_name || 'Anonymous'}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{formatDate(item.created_at).commaDateFormat}</p>
                 </div>
              </div>
              <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
                item.payment?.status === 'success' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {item.payment?.status || 'Processing'}
              </span>
            </div>

            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-50">
               <div>
                  <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Amount</p>
                  <p className="text-sm font-bold text-gray-900">{item.currency} {Number(item.payment?.amount || 0).toLocaleString()}</p>
               </div>
               <div className="text-right">
                  <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Reference</p>
                  <p className="text-[10px] font-mono font-medium text-gray-600">{item.payment?.reference?.slice(-8)}...</p>
               </div>
            </div>

            {item.payment?.status !== 'success' ? (
              <button
                disabled={processingId === item.id}
                onClick={() => handleApprove(item.id)}
                className="w-full py-3 bg-gray-900 text-white rounded-xl text-xs font-bold active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {processingId === item.id ? <Icon icon="solar:restart-bold" className="animate-spin text-base" /> : "Verify Transfer"}
              </button>
            ) : (
              <div className="w-full py-3 bg-green-50 text-green-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                <Icon icon="solar:check-circle-bold" className="text-base" /> Verified
              </div>
            )}
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW: Standard Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/50 text-gray-500 uppercase text-[10px] font-black tracking-wider">
            <tr>
              <th className="p-4">Depositor & Email</th>
              <th className="p-4">Amount & Ref</th>
              <th className="p-4 text-center">Receipt (POP)</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
               <tr><td colSpan={6} className="p-10 text-center text-gray-400">Loading transfers...</td></tr>
            ) : transfers.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-gray-800">{item.depositor_name || 'Anonymous'}</p>
                  <p className="text-[11px] text-gray-400 truncate max-w-[150px]">{item.payment?.email || 'N/A'}</p>
                </td>
                <td className="p-4">
                  <p className="font-bold text-gray-900">{item.currency} {Number(item.payment?.amount || 0).toLocaleString()}</p>
                  <p className="text-[10px] font-mono text-gray-400">{item.payment?.reference}</p>
                </td>
                <td className="p-4 text-center">
                  <div className="flex justify-center">
                    <a href={item.pop_image_url} target="_blank" rel="noreferrer" className="group relative block h-10 w-10 overflow-hidden rounded-xl border">
                      <img src={item.pop_image_url} className="h-full w-full object-cover transition-transform group-hover:scale-125" alt="POP" />
                    </a>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${
                    item.payment?.status === 'success' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {item.payment?.status || 'Processing'}
                  </span>
                </td>
                <td className="p-4 text-gray-500 text-xs">{formatDate(item.created_at).commaDateFormat}</td>
                <td className="p-4 text-right">
                  {item.payment?.status === 'success' ? (
                    <div className="text-green-600 font-bold text-[11px]">VERIFIED</div>
                  ) : (
                    <button
                      disabled={processingId === item.id}
                      onClick={() => handleApprove(item.id)}
                      className="rounded-xl bg-gray-900 px-5 py-2 text-xs font-bold text-white hover:bg-primary transition-all disabled:opacity-50"
                    >
                      {processingId === item.id ? <Icon icon="solar:restart-bold" className="animate-spin" /> : "Verify"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {!loading && transfers.length === 0 && (
        <div className="py-24 text-center text-gray-400">
           <Icon icon="solar:clipboard-list-bold" className="text-3xl mx-auto mb-2 opacity-20" />
           <p className="text-sm font-semibold uppercase tracking-widest text-gray-300">No Transfers Found</p>
        </div>
      )}
    </div>
  )
}