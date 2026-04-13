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

    if (!campaignId || !email || !userId || !amount) {
      alert('Missing payment information')
      return
    }

    try {
      setLoading(true)

      const { data } = await axios.post(`${baseUrl}/payments/initialize/stripe`, {
        campaignId,
        amount: Number(amount),
        currency: 'USD', // Consider using your currency state here if needed: currency?.code || 'USD'
        email,
        userId,
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

  // If we have the clientSecret, render the Stripe Elements wrapper
  if (paymentData?.clientSecret) {
    return (
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: paymentData.clientSecret,
          appearance: {
            theme: 'stripe',
          },
        }}
      >
        <CheckoutForm reference={paymentData.id} email={email} />
      </Elements>
    )
  }

  // Otherwise, render the initial pledge amount form
  return (
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

    // Using confirmPayment with redirect: 'if_required' allows you to stay on the page
    // and execute your custom backend verification logic below.
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        receipt_email: email,
      },
      redirect: 'if_required',
    })

    if (error) {
      alert(error.message)
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      try {
        // Included baseUrl here to match your startPayment setup
        await axios.get(`${baseUrl}/payments/verify/stripe/${reference}`)
        alert('Donation Successful!')
        // You might want to trigger a state update here to show a success UI
      } catch (verifyError) {
        console.error('Verification failed:', verifyError)
        alert('Payment succeeded, but we had trouble verifying it on our servers.')
      }
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md p-4">
      {/* Kept your container design, but removed the manual label as PaymentElement renders its own */}
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
