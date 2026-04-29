/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CountryCurrencyDropdown, { Currency } from '../country-currency-dropdown'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useParams } from 'next/navigation'
import { baseUrl } from '@/constants'
import { Icon } from '@iconify/react'

const stripePromise = loadStripe('pk_test_i1sOzDxjO6tTKVhVvNeupIAh')

export default function StripeForm() {
  const params = useParams()
  const campaignId = Number(params?.id)

  const [amount, setAmount] = useState('')
  const [email, setEmail] = useState('')
  const [paymentData, setPaymentData] = useState<any>(null)
  const [userId, setUserId] = useState<number | null>(null)
  const [currency, setCurrency] = useState<Currency | null>(null)
  const [loading, setLoading] = useState(false)

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
    if (!campaignId || !amount) return alert('Missing payment information')

    if (!email && !guestEmail) {
      setShowGuestModal(true)
      return
    }

    await initializePayment(email || guestEmail, userId || 0)
  }

  const initializePayment = async (emailValue: string, userIdValue: number) => {
    try {
      setLoading(true)
      const { data } = await axios.post(`${baseUrl}/payments/initialize/stripe`, {
        campaignId,
        amount: Number(amount),
        currency: currency?.code || 'USD',
        email: emailValue,
        userId: userIdValue,
        donorName: guestName || undefined
      })
      setPaymentData(data)
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Stripe initialization failed')
    } finally {
      setLoading(false)
    }
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
        <CheckoutForm 
            // NOTE: Using paymentData.id (Internal Ref) or paymentIntent ID 
            reference={paymentData.id} 
            email={email || guestEmail} 
        />
      </Elements>
    )
  }

  return (
    <div className="mx-auto max-w-md p-4">
      <div className="mb-8 rounded-2xl bg-blue-50 p-5 border-l-4 border-[#00a2ed]">
        <p className="text-sm font-medium text-blue-800 leading-relaxed">
          Secure your sponsorship via Stripe. Your donation will be processed in <span className="font-bold">{currency?.code || 'USD'}</span>.
        </p>
      </div>

      <form onSubmit={startPayment} className="space-y-6">
        <div>
          <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">
            Pledge Amount
          </label>
          <div className="flex w-full overflow-hidden rounded-2xl border-2 border-gray-100 bg-gray-50 focus-within:border-[#00a2ed] focus-within:bg-white transition-all">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="50"
              className="w-full bg-transparent p-4 font-bold text-gray-900 outline-none"
              required
            />
            <div className="flex items-center bg-gray-100 px-4 border-l border-gray-100">
              <CountryCurrencyDropdown onChange={(value: Currency) => setCurrency(value)} />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full rounded-2xl bg-[#00a2ed] py-5 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-blue-100 transition-all hover:bg-blue-600 active:scale-95 disabled:opacity-50"
        >
          {loading ? 'Initializing Secure Checkout...' : 'Donate Now'}
        </button>
      </form>

      {showGuestModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a1b2d]/80 p-4 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm rounded-[2.5rem] bg-white p-10 shadow-2xl">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-[#00a2ed]">
                <Icon icon="solar:user-circle-bold-duotone" width={40} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Identity</h2>
              <p className="text-xs text-gray-400 mt-2 font-medium">Identify your donation for the records.</p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name (optional)"
                className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                onChange={(e) => setGuestName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                onChange={(e) => setGuestEmail(e.target.value)}
                required
              />
              <button
                onClick={() => {
                   if(!guestEmail) return alert("Email required");
                   setShowGuestModal(false);
                   initializePayment(guestEmail, 0);
                }}
                className="w-full rounded-2xl bg-gray-900 py-4 text-xs font-black uppercase text-white hover:bg-black"
              >
                Continue to Payment
              </button>
              <button onClick={() => setShowGuestModal(false)} className="w-full text-[10px] font-bold uppercase text-gray-300">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
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
  confirmParams: { receipt_email: email },
  redirect: 'if_required',
});

if (error) {
  // Handle the "already succeeded" edge case
  if (error.code === "payment_intent_unexpected_state") {
    const piId = error.payment_intent?.id; // Extract ID from the error object
    return handleServerVerification(piId);
  }
  alert(error.message);
  setIsProcessing(false);
  return;
}

if (paymentIntent?.status === 'succeeded') {
  await handleServerVerification(paymentIntent.id);
}

  setIsProcessing(false)
}

// 3. Extracted Verification Logic
const handleServerVerification = async (stripePI?: string) => {
  try {
    // 1. Log exactly what we are sending to the server
    console.log("Verifying with Internal Ref:", reference);
    console.log("Verifying with Stripe PI:", stripePI);

    // 2. Try the primary endpoint (GET)
    // If this fails, your backend might actually want the Stripe PI ID instead of the internal ID
    const verifyRes = await axios.get(`${baseUrl}/payments/verify/stripe/${reference}`);
    
    if (verifyRes.status === 200 || verifyRes.data.success) {
       window.location.href = '/donation/success';
       return;
    }
  } catch (verifyError: any) {
    console.error('Verification Error Details:', verifyError.response?.data);
    
    // 3. EMERGENCY FALLBACK: If GET fails, try a POST (common in NestJS/Express)
    try {
      console.log("GET failed, attempting POST fallback...");
      const postRes = await axios.post(`${baseUrl}/payments/verify/stripe`, { 
        reference: reference,
        stripe_pi: stripePI // Sending both just in case
      });
      if (postRes.status === 200) window.location.href = '/donation/success';
    } catch (postErr) {
      alert('Payment confirmed by Stripe, but server rejected verification. Please check console.');
    }
  } finally {
    setIsProcessing(false);
  }
}

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md p-4 space-y-6">
      <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
        <PaymentElement />
      </div>

      <button 
        disabled={!stripe || isProcessing} 
        className="w-full rounded-2xl bg-gray-900 py-5 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-black disabled:opacity-50"
      >
        {isProcessing ? 'Verifying Transaction...' : 'Complete Donation'}
      </button>
    </form>
  )
}