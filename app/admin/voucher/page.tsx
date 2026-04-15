/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { baseUrl } from '@/constants'
import { toast } from 'react-hot-toast'
import axios from 'axios'

/* =====================
    TYPES & CONSTANTS
===================== */
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
  // State for Table
  const [vouchers, setVouchers] = useState<TVoucher[]>([])
  const [fetching, setFetching] = useState(true)

  // State for Modal & Generation
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('NGN')
  const [isGenerating, setIsGenerating] = useState(false)

  const fetchVouchers = async () => {
    try {
      setFetching(true)

      // 1. Get the token
      const stored = sessionStorage.getItem('course-training-profile')
      const parsed = stored ? JSON.parse(stored) : null
      const token = parsed?.token

      if (!token) {
        console.warn('No token found in session storage')
        // You might want to redirect to login here
      }

      // 2. Use Axios (No need for .json())
      const res = await axios.get(`${baseUrl}/voucher`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // 3. Axios puts the response body in 'res.data'
      // Based on your Postman, the array is inside a 'data' property
      const result = res.data
      const actualData = result?.data || result

      setVouchers(Array.isArray(actualData) ? actualData : [])
    } catch (err: any) {
      console.error('Fetch error:', err)

      // If it's a 401, the token is likely expired
      if (err.response?.status === 401) {
        toast.error('Session expired. Please login again.')
      } else {
        toast.error('Could not load vouchers')
      }
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchVouchers()
  }, [])

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount) return toast.error('Please enter an amount')

    try {
      setIsGenerating(true)

      // 1. Get token from storage (matching your fetchVouchers fix)
      const stored = sessionStorage.getItem('course-training-profile')
      const parsed = stored ? JSON.parse(stored) : null
      const token = parsed?.token

      // 2. Use Axios for the POST request
      const res = await axios.post(
        `${baseUrl}/voucher/generate`,
        {
          amount: Number(amount),
          currency,
          count: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      // 3. Axios automatically parses JSON into res.data
      const result = res.data

      toast.success('Voucher Created!')
      setIsModalOpen(false)
      setAmount('')

      // Refresh the list to show the new voucher
      fetchVouchers()
    } catch (err: any) {
      // Axios error handling
      const msg = err.response?.data?.message || err.message || 'Generation failed'
      console.error('Voucher creation failed:', msg)
      toast.error(msg)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="relative min-h-screen space-y-6 p-4 md:p-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Voucher System</h1>
          <p className="text-sm text-gray-500">Managing {vouchers.length} total records</p>
        </div>
        <button onClick={fetchVouchers} className="rounded-full p-2 hover:bg-gray-100">
          <Icon icon="mdi:refresh" className={fetching ? 'animate-spin' : ''} width={24} />
        </button>
      </header>

      {/* VOUCHER TABLE */}
      <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0B0F19]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-[10px] font-bold uppercase text-gray-500 dark:bg-white/5">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Status</th>
                <th className="p-4">Full Code</th>
                <th className="p-4">PIN Segments</th>
                <th className="p-4">Value</th>
                <th className="p-4">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-white/5">
              {vouchers.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="p-4 font-mono text-gray-400">#{v.id}</td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        v.used ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {v.used ? 'USED' : 'AVAILABLE'}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold tracking-wider">{v.voucher}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {[v.pin1, v.pin2, v.pin3, v.pin4].map((p, i) => (
                        <span
                          key={i}
                          className="rounded bg-gray-100 px-1.5 text-[10px] dark:bg-white/10"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-semibold">
                    {v.currency} {v.amount.toLocaleString()}
                  </td>
                  <td className="p-4 text-xs text-gray-500">
                    {new Date(v.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FLOATING ACTION BUTTON (FAB) */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl transition-transform hover:scale-110 hover:bg-blue-700 active:scale-95"
      >
        <Icon icon="mdi:plus" width={32} />
      </button>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !isGenerating && setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="animate-in fade-in zoom-in relative w-full max-w-md rounded-3xl border border-white/10 bg-white p-8 shadow-2xl duration-200 dark:bg-[#0B0F19]">
            <h2 className="mb-2 text-xl font-bold">Generate New Voucher</h2>
            <p className="mb-6 text-sm text-gray-500">
              Enter the value for the single-use voucher.
            </p>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-400">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-gray-50 p-3 outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-white/5"
                >
                  {currencies.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-400">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full rounded-xl border border-zinc-200 bg-gray-50 p-3 outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-white/5"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isGenerating}
                  className="flex-1 rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="flex-1 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition-colors hover:bg-blue-700 disabled:opacity-50"
                >
                  {isGenerating ? 'Processing...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
