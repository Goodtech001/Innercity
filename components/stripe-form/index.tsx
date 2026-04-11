/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import espees from '@/public/assets/images/espees.png'
import CountryCurrencyDropdown, { Currency } from '../country-currency-dropdown'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { getUsersService } from '@/app/auth/auth.service'
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

  // ✅ Fetch logged in user (same pattern as AdminUsersPage)
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

      const { data } = await axios.post(
        `${baseUrl}/payments/initialize/stripe`,
        {
          campaignId,
          amount: Number(amount),
          currency: currency?.code || 'NGN', // ⚠️ Stripe prefers USD
          email,
          userId,
        },
      )

      // ✅ Stripe expects clientSecret
      setPaymentData(data)
    } catch (err: any) {
      console.error(err)
      alert(err?.response?.data?.message || 'Stripe initialization failed')
    } finally {
      setLoading(false)
    }
  }

  if (!paymentData) {
    return (
      <form onSubmit={startPayment} className="mx-auto max-w-md p-4">
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Pledged Amount
          </label>

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
              onChange={(value: Currency) =>
                  setCurrency(value)
                }
              />
            </div>
          </div>

           <button
            type="submit"
            className="btn-primary mt-4 w-fit"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Donate'}
          </button>
        </div>
      </form>
    )
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret: paymentData.clientSecret }}>
      <CheckoutForm
        clientSecret={paymentData.clientSecret}
        reference={paymentData.id}
      />
    </Elements>
  )
}

function CheckoutForm({ clientSecret, reference }: any) {

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!stripe || !elements) return

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    })

    if (result.error) {
      alert(result.error.message)
    } else if (result.paymentIntent?.status === 'succeeded') {

        await axios.get(`/payments/verify/${reference}`)

        alert('Donation Successful!')
      }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md p-4">

      <div className="mb-4 rounded border border-gray-300 p-2">
        <label className="mb-2 block text-sm font-bold text-black">
          Card or debit card
        </label>

        <CardElement className="p-2" />
      </div>

      <button disabled={!stripe} className="btn-primary mt-4 w-fit">
        Donate
      </button>

    </form>
  )
}

export default StripeForm