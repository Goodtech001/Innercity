/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CountryCurrencyDropdown, { Currency } from '../country-currency-dropdown'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useParams } from 'next/navigation'
import { baseUrl } from '@/constants'

const stripePromise = loadStripe('pk_test_i1sOzDxjO6tTKVhVvNeupIAh')

function StripeForm() {
  const params = useParams()
  const campaignId = Number(params?.id)

  const [amount, setAmount] = useState('')
  const [email, setEmail] = useState('')
  const [paymentData, setPaymentData] = useState<any>(null)
  const [userId, setUserId] = useState<number | null>(null)
  const [currency, setCurrency] = useState<Currency | null>(null)
  const [loading, setLoading] = useState(false)

  // ✅ NEW: guest modal state
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

  const startPayment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!campaignId || !amount) {
      alert('Missing payment information')
      return
    }

    // 🚨 If not logged in → open modal instead
    if (!email || !userId) {
      setShowGuestModal(true)
      return
    }

    await initializePayment(email, userId)
  }

  // ✅ Extracted so guest + user both use same flow
  const initializePayment = async (emailValue: string, userIdValue: number) => {
    try {
      setLoading(true)

      const { data } = await axios.post(`${baseUrl}/payments/initialize/stripe`, {
        campaignId,
        amount: Number(amount),
        currency: currency?.code || 'USD',
        email: emailValue,
        userId: userIdValue,
      })

      setPaymentData(data)
      console.log('STRIPE INIT RESPONSE:', data)
    } catch (err: any) {
      console.error(err)
      alert(err?.response?.data?.message || 'Stripe initialization failed')
    } finally {
      setLoading(false)
    }
  }

  // ✅ Handle guest submit
  const handleGuestSubmit = async () => {
    if (!guestEmail) {
      alert('Email is required')
      return
    }

    setShowGuestModal(false)

    // ⚠️ fallback userId for guests
    await initializePayment(guestEmail, 0)
  }

  if (paymentData?.clientSecret) {
    return (
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: paymentData.clientSecret,
          appearance: { theme: 'stripe' },
        }}
      >
        <CheckoutForm reference={paymentData.id} email={email || guestEmail} />
      </Elements>
    )
  }

  return (
    <>
      <form onSubmit={startPayment} className="mx-auto max-w-md p-4">
        <div className="mb-4">
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
              <CountryCurrencyDropdown onChange={(value: Currency) => setCurrency(value)} />
            </div>
          </div>

          <button type="submit" className="btn-primary mt-4 w-fit" disabled={loading}>
            {loading ? 'Processing...' : 'Donate'}
          </button>
        </div>
      </form>

      {/* ✅ GUEST MODAL */}
      {showGuestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Continue as Guest</h2>

            <input
              type="email"
              placeholder="Enter your email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="mb-3 w-full rounded border p-2"
            />

            <input
              type="text"
              placeholder="Full name (optional)"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="mb-4 w-full rounded border p-2"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowGuestModal(false)}
                className="px-4 py-2 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleGuestSubmit}
                className="btn-primary px-4 py-2"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

interface CheckoutFormProps {
  reference: string
  email: string
}

function CheckoutForm({ reference, email }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsProcessing(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        receipt_email: email,
      },
      redirect: 'if_required',
    })

    if (error) {
      alert(error.message)
    } else if (paymentIntent?.status === 'succeeded') {
      try {
        await axios.get(`${baseUrl}/payments/verify/stripe/${reference}`)
        alert('Donation Successful!')
      } catch (verifyError) {
        console.error('Verification failed:', verifyError)
        alert('Payment succeeded, but verification failed.')
      }
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md p-4">
      <div className="mb-4 rounded border border-gray-300 p-2">
        <PaymentElement className="p-2" />
      </div>

      <button disabled={!stripe || isProcessing} className="btn-primary mt-4 w-fit">
        {isProcessing ? 'Processing...' : 'Donate'}
      </button>
    </form>
  )
}

export default StripeForm