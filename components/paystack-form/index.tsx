/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { baseUrl } from '@/constants'
import CountryCurrencyDropdown, { Currency } from '../country-currency-dropdown'
import { Campaign } from '@/types/Campaign'
import { Icon } from '@iconify/react'

function PaystackForm({ campaign }: { campaign: Campaign }) {
  const params = useParams()
  const campaignId = Number(params?.id)

  const [amount, setAmount] = useState('')
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [currency, setCurrency] = useState<Currency | null>(null)
  const [showGuestModal, setShowGuestModal] = useState(false)
  const [guestEmail, setGuestEmail] = useState('')
  const [guestName, setGuestName] = useState('')

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('course-training-profile')
      if (!stored) return
      const parsed = JSON.parse(stored)
      const user = parsed?.user

      setEmail(user?.email || '')
      setUserId(user?.id || null)
    } catch (err) {
      console.error('User session parse error:', err)
    }
  }, [])

  const startPayment = async (e?: React.FormEvent, guestData?: { email: string; name: string }) => {
    if (e) e.preventDefault()

    const finalEmail = guestData?.email || email
    const finalName = guestData?.name || guestName

    if (!campaignId || !amount) {
      alert('Missing payment information')
      return
    }

    if (!finalEmail) {
      setShowGuestModal(true)
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`${baseUrl}/payments/initialize/paystack`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          amount: Number(amount),
          currency: currency?.code || 'NGN',
          email: finalEmail,
          userId: userId || null,
          donorName: finalName || null,
          callback_url: `${window.location.origin}/payments/verify`,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(JSON.stringify(data))

      window.location.href = data.authorization_url
    } catch (error: any) {
      console.error(error)
      alert('Could not initialize payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md p-4">
      {/* ESPEE-STYLE INFO CARD */}
      <div className="mb-8 rounded-2xl bg-blue-50 p-5 border-l-4 border-[#00a2ed]">
        <p className="text-sm font-medium text-blue-800 leading-relaxed">
          You are sponsoring <span className="font-bold text-[#00a2ed]">&quot;{campaign.title}&quot;</span>. 
          Please wait to be redirected back after payment to confirm your seed.
        </p>
      </div>

      <form onSubmit={startPayment} className="space-y-6">
        <div>
          <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">
            Donation Amount
          </label>

          <div className="flex w-full overflow-hidden rounded-2xl border-2 border-gray-100 bg-gray-50 focus-within:border-[#00a2ed] focus-within:bg-white transition-all">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1000"
              className="w-full bg-transparent p-4 font-bold text-gray-900 outline-none"
              required
            />

            <div className="flex items-center bg-gray-100 px-4 border-l border-gray-100">
              <CountryCurrencyDropdown
                onChange={(value: Currency) => setCurrency(value)}
              />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full rounded-2xl bg-[#00a2ed] py-5 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-blue-100 transition-all hover:bg-blue-500 active:scale-95 disabled:opacity-50"
        >
          {loading ? 'Connecting to Secure Gateway...' : 'Proceed to Payment'}
        </button>
      </form>

      {/* GUEST MODAL - ESPEE STYLE */}
      {showGuestModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a1b2d]/80 p-4 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-sm rounded-[2.5rem] bg-white p-10 shadow-2xl">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-[#00a2ed]">
                <Icon icon="solar:user-id-bold-duotone" width={36} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Donor Info</h2>
              <p className="text-xs text-gray-400 mt-2 font-medium">Identify your donation for the campaign records.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Brother John"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm outline-none focus:ring-2 focus:ring-[#00a2ed]/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Email Address</label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm outline-none focus:ring-2 focus:ring-[#00a2ed]/20"
                  required
                />
              </div>

              <button
                onClick={() => {
                  if (!guestEmail) return alert('Email is required');
                  startPayment(undefined, { email: guestEmail, name: guestName });
                }}
                disabled={loading}
                className="mt-4 w-full rounded-2xl bg-gray-900 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all hover:bg-black active:scale-95"
              >
                {loading ? 'Initializing...' : 'Continue to Paystack'}
              </button>

              <button 
                onClick={() => setShowGuestModal(false)}
                className="w-full pt-2 text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-red-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaystackForm