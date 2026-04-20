/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { baseUrl } from '@/constants'
import { toast } from 'react-hot-toast'
import axios from 'axios'

type TVoucher = {
  id: number
  amount: number
  pin1: number | string
  pin2: number | string
  pin3: number | string
  pin4: number | string
  voucher: string
  used: boolean
  date_used: string | null
  currency: string
  user: string | null
  user_id: number | null
  created_at: string
  updated_at: string
}

const currencies = ['NGN', 'USD', 'ZAR', 'GBP', 'EUR']

export default function VoucherManagementPage() {
  const [vouchers, setVouchers] = useState<TVoucher[]>([])
  const [fetching, setFetching] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('NGN')
  const [isGenerating, setIsGenerating] = useState(false)

  const fetchVouchers = async () => {
    try {
      setFetching(true)
      const stored = sessionStorage.getItem('course-training-profile')
      const parsed = stored ? JSON.parse(stored) : null
      const token = parsed?.token

      const res = await axios.get(`${baseUrl}/voucher`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const result = res.data
      const actualData = result?.data || result
      setVouchers(Array.isArray(actualData) ? actualData : [])
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error('Session expired. Please login again.')
      } else {
        toast.error('Could not load vouchers')
      }
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => { fetchVouchers() }, [])

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount) return toast.error('Please enter an amount')

    try {
      setIsGenerating(true)
      const stored = sessionStorage.getItem('course-training-profile')
      const parsed = stored ? JSON.parse(stored) : null
      const token = parsed?.token

      await axios.post(
        `${baseUrl}/voucher/generate`,
        { amount: Number(amount), currency, count: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      toast.success('Voucher Created!')
      setIsModalOpen(false)
      setAmount('')
      fetchVouchers()
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Generation failed'
      toast.error(msg)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Voucher System</h1>
          <p className="text-gray-500 text-sm font-medium">Tracking {vouchers.length} active and used records</p>
        </div>
        <button 
          onClick={fetchVouchers} 
          className="flex items-center gap-2 rounded-2xl bg-white border border-gray-100 px-5 py-2.5 text-sm font-bold text-gray-600 shadow-sm hover:bg-gray-50 transition-all active:scale-95"
        >
          <Icon icon="solar:restart-bold" className={fetching ? 'animate-spin' : ''} width={18} />
          Refresh List
        </button>
      </div>

      {/* VOUCHER TABLE CARD */}
      <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-gray-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
              <tr>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Full Voucher Code</th>
                <th className="px-6 py-5">Pin Segments</th>
                <th className="px-6 py-5">Value</th>
                <th className="px-6 py-5">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {fetching ? (
                <tr><td colSpan={5} className="p-20 text-center text-gray-400 animate-pulse">Loading secure vouchers...</td></tr>
              ) : vouchers.map((v) => (
                <tr key={v.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      v.used ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'
                    }`}>
                      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${v.used ? 'bg-red-500' : 'bg-green-600'}`} />
                      {v.used ? 'Used' : 'Available'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-bold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-xl border border-gray-200/50 tracking-widest">
                      {v.voucher}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5">
                      {[v.pin1, v.pin2, v.pin3, v.pin4].map((p, i) => (
                        <span key={i} className="text-[11px] font-black text-blue-600 bg-blue-50/50 border border-blue-100/50 px-2 py-1 rounded-lg">
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-gray-900">{v.currency} {v.amount.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[11px] font-medium text-gray-400">
                    {new Date(v.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-10 z-50 flex h-16 w-16 items-center justify-center rounded-[2rem] bg-gray-900 text-white shadow-2xl shadow-gray-900/40 transition-all hover:scale-110 active:scale-95 group"
      >
        <Icon icon="solar:add-circle-bold" width={28} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* GENERATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={() => !isGenerating && setIsModalOpen(false)} />
          <div className="relative w-full max-w-md space-y-6 rounded-[2.5rem] bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Generate Voucher</h2>
              <p className="text-xs text-gray-400 font-medium">Create a new secure pin for training payments.</p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Currency</label>
                <div className="relative">
                   <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full appearance-none rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold"
                  >
                    {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <Icon icon="solar:alt-arrow-down-linear" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">{currency}</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-2xl border border-gray-100 bg-gray-50 pl-14 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-black text-blue-600"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  disabled={isGenerating}
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 px-4 py-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="flex-[2] rounded-2xl bg-blue-600 px-4 py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Icon icon="solar:restart-bold" className="animate-spin" />
                      Creating...
                    </>
                  ) : 'Generate Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}