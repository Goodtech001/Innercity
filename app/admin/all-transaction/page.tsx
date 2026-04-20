/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { baseUrl } from '@/constants'
import clsx from 'clsx'

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedTx, setSelectedTx] = useState<any>(null)
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const fetchTransactions = async () => {
    try {
      const stored = sessionStorage.getItem('course-training-profile')
      const parsed = stored ? JSON.parse(stored) : null
      const token = parsed?.token

      const res = await fetch(`${baseUrl}/payments/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setTransactions(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTransactions() }, [])

  // Filters
  const filteredTxs = transactions
    .filter((tx) => {
      const q = search.toLowerCase()
      return (
        tx.reference?.toLowerCase().includes(q) ||
        tx.email?.toLowerCase().includes(q) ||
        tx.campaign?.title?.toLowerCase().includes(q)
      )
    })
    .filter((tx) => (statusFilter === 'all' ? true : tx.status === statusFilter))

  const totalPages = Math.ceil(filteredTxs.length / itemsPerPage)
  const paginatedTxs = filteredTxs.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-700 border-green-200'
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'failed': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Transaction History</h1>
        <p className="text-gray-500 text-sm">Monitor all incoming donations and platform revenue.</p>
      </div>

      {/* Filters Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative md:col-span-2">
          <Icon icon="solar:magnifer-linear" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search by Reference, Email or Campaign..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-gray-100 px-4 py-3.5 rounded-2xl text-sm shadow-sm outline-none appearance-none cursor-pointer font-semibold text-gray-600"
        >
          <option value="all">All Statuses</option>
          <option value="success">Successful</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Data Section */}
      <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-gray-200/50 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
              <tr>
                <th className="px-6 py-5">Reference & Date</th>
                <th className="px-6 py-5">Donor</th>
                <th className="px-6 py-5">Campaign / Owner</th>
                <th className="px-6 py-5">Amount</th>
                <th className="px-6 py-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="p-20 text-center text-gray-400 animate-pulse">Fetching transactions...</td></tr>
              ) : paginatedTxs.map((tx) => (
                <tr 
                  key={tx.id} 
                  className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                  onClick={() => setSelectedTx(tx)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <Icon icon="solar:bill-list-bold-duotone" width={24} className="text-gray-400 group-hover:text-blue-600" />
                      </div>
                      <div>
                        <p className="font-mono text-[11px] text-blue-600 font-bold">{tx.reference}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{new Date(tx.created_at || Date.now()).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-800">{tx.email}</p>
                    <p className="text-[10px] text-gray-400 capitalize">{tx.method || 'Digital Payment'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-700 line-clamp-1">{tx.campaign?.title}</p>
                    <p className="text-[10px] text-blue-500 font-bold">{tx.campaign?.user?.fullname}</p>
                  </td>
                  <td className="px-6 py-4 font-black text-gray-900">
                    ${Number(tx.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={clsx("px-3 py-1.5 rounded-full text-[10px] font-bold border", getStatusColor(tx.status))}>
                      {tx.status?.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: High-End Action Cards */}
        <div className="lg:hidden divide-y divide-gray-50">
          {loading ? (
            <div className="p-10 text-center text-gray-400">Loading...</div>
          ) : paginatedTxs.map((tx) => (
            <div 
              key={tx.id} 
              className="p-5 active:bg-gray-50 transition-colors"
              onClick={() => setSelectedTx(tx)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Icon icon="solar:banknote-2-bold-duotone" width={24} className="text-blue-600" />
                   </div>
                   <div>
                      <p className="text-sm font-black text-gray-900">${Number(tx.amount).toLocaleString()}</p>
                      <p className="text-[10px] text-blue-500 font-mono font-bold">{tx.reference}</p>
                   </div>
                </div>
                <span className={clsx("px-2.5 py-1 rounded-full text-[9px] font-bold border", getStatusColor(tx.status))}>
                  {tx.status}
                </span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl space-y-1">
                <p className="text-[10px] text-gray-500 leading-tight"><span className="font-bold">Campaign:</span> {tx.campaign?.title}</p>
                <p className="text-[10px] text-gray-500"><span className="font-bold">Donor:</span> {tx.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center gap-2">
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          className="p-2 bg-white border border-gray-100 rounded-xl disabled:opacity-30"
          disabled={page === 1}
        >
          <Icon icon="solar:alt-arrow-left-linear" />
        </button>
        <span className="text-xs font-bold text-gray-500 mx-4">Page {page} of {totalPages || 1}</span>
        <button 
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          className="p-2 bg-white border border-gray-100 rounded-xl disabled:opacity-30"
          disabled={page === totalPages}
        >
          <Icon icon="solar:alt-arrow-right-linear" />
        </button>
      </div>

      {/* Transaction Detail Drawer (Desktop & Mobile) */}
      {selectedTx && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedTx(null)} />
          <div className="relative ml-auto flex h-full w-full max-w-[450px] flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="p-8 bg-gray-900 text-white">
              <button onClick={() => setSelectedTx(null)} className="absolute top-6 right-6 text-white/50 hover:text-white">
                <Icon icon="solar:close-circle-bold" width={28} />
              </button>
              <div className="mt-4">
                <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1">Receipt Details</p>
                <h2 className="text-3xl font-black">{Number(selectedTx.amount).toLocaleString()}</h2>
                <span className={clsx("inline-block mt-3 px-3 py-1 rounded-full text-[10px] font-bold border", getStatusColor(selectedTx.status))}>
                  {selectedTx.status}
                </span>
              </div>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Transaction Info</h3>
                <div className="space-y-4">
                  <DetailItem label="Reference Number" value={selectedTx.reference} mono />
                  <DetailItem label="Payment Date" value={new Date(selectedTx.created_at).toLocaleString()} />
                  <DetailItem label="Method" value={selectedTx.method || 'Card/Digital'} capitalize />
                </div>
              </section>

              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Donor Details</h3>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                   <p className="text-sm font-bold text-gray-900">{selectedTx.email}</p>
                   <p className="text-xs text-gray-400 mt-1">Transaction Identity Verified</p>
                </div>
              </section>

              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Destination</h3>
                <div className="p-5 bg-blue-50 rounded-3xl border border-blue-100/50">
                  <p className="text-[10px] text-blue-400 font-black uppercase mb-2">Campaign Title</p>
                  <p className="text-sm font-bold text-blue-900 leading-tight mb-4">{selectedTx.campaign?.title}</p>
                  <div className="flex items-center gap-2 pt-4 border-t border-blue-100">
                    <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                      {selectedTx.campaign?.user?.fullname?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[10px] text-blue-400">Campaign Owner</p>
                      <p className="text-xs font-bold text-blue-800">{selectedTx.campaign?.user?.fullname}</p>
                    </div>
                  </div>
                </div>
              </section>

              <button className="w-full py-4 bg-gray-900 text-white rounded-2xl text-sm font-bold shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                <Icon icon="solar:printer-bold-duotone" width={20} />
                Print Confirmation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DetailItem({ label, value, mono = false, capitalize = false }: any) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-xs text-gray-400 font-medium">{label}</span>
      <span className={clsx(
        "text-sm font-bold text-gray-800",
        mono && "font-mono text-[11px] text-blue-600",
        capitalize && "capitalize"
      )}>{value}</span>
    </div>
  )
}