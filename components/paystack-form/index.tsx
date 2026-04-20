/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import espees from '@/public/assets/images/espees.png'
import { getUsersService } from '@/app/auth/auth.service'
import { useParams } from 'next/navigation'
import { baseUrl } from '@/constants'
import CountryCurrencyDropdown, { Currency } from '../country-currency-dropdown'
import { Campaign } from '@/types/Campaign'

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

  // ✅ SAME USER FETCH PATTERN AS STRIPE
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

  const startPayment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!campaignId || !amount) {
      alert('Missing payment information')
      return
    }

    // If user not logged in → trigger modal
    if (!email) {
      setShowGuestModal(true)
      return
    }

    try {
      setLoading(true)

      const res = await fetch(`${baseUrl}/payments/initialize/paystack`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignId,
          amount: Number(amount),
          currency: currency?.code,
          email: email || guestEmail,
          userId: userId || null, // 👈 allow null
          donorName: guestName || null, // optional
          callback_url: `${window.location.origin}/payments/verify`,
        }),
      })

      const data = await res.json()

      console.log('PAYSTACK RESPONSE:', res.status, data)

      if (!res.ok) {
        throw new Error(JSON.stringify(data))
      }

      // Redirect to Paystack
      window.location.href = data.authorization_url
    } catch (error: any) {
      console.error(error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={startPayment} className="mx-auto max-w-md p-4">
      {/* <p className="text-primary">Dear {campaign.user?.fullname},</p> */}

      <small className="text-primary">
        Thank you for your sponsorship. You will now be redirected to our payment gateway. After
        making your payment kindly wait to be redirected back so your donation can be credited.
      </small>

      <div className="mb-4 mt-6">
        <label className="mb-2 block text-sm font-medium">Pledged Amount</label>

        <div className="flex w-full">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full rounded-l border border-gray-300 p-2"
            required
          />

          <div className="flex space-x-1 rounded-r border bg-gray-200 p-2 pr-7">
            <CountryCurrencyDropdown
              // value={currency}
              onChange={(value: Currency) => setCurrency(value)}
            />
          </div>
        </div>

        <button type="submit" className="btn-primary mt-4 w-fit" disabled={loading}>
          {loading ? 'Processing...' : 'Donate'}
        </button>

        {showGuestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
              <h2 className="mb-2 text-lg font-bold">Continue as Guest</h2>
              <p className="mb-4 text-sm text-gray-500">
                Enter your details to complete your donation.
              </p>

              <input
                type="text"
                placeholder="Full Name (optional)"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="mb-3 w-full rounded border p-2"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="mb-4 w-full rounded border p-2"
                required
              />

              <div className="flex justify-end gap-2">
                <button onClick={() => setShowGuestModal(false)} className="px-4 py-2 text-sm">
                  Cancel
                </button>

                <button
                  onClick={() => {
                    if (!guestEmail) {
                      alert('Email is required')
                      return
                    }

                    setEmail(guestEmail)
                    setShowGuestModal(false)

                    // 🔥 Retry payment automatically
                    setTimeout(() => {
                      document.querySelector('form')?.requestSubmit()
                    }, 100)
                  }}
                  className="btn-primary px-4 py-2 text-sm"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  )
}

export default PaystackForm
