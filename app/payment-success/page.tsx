/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { baseUrl } from '@/constants'
import { Icon } from '@iconify/react'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Paystack sends 'reference'. Stripe might send 'payment_intent'
  const reference = searchParams.get('reference') || searchParams.get('payment_intent')
  
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [message, setMessage] = useState('Verifying your donation...')

  useEffect(() => {
    if (reference) {
      verifyOnBackend()
    } else {
      // If someone visits this page without a reference, send them away
      setStatus('error')
      setMessage('No payment reference found.')
    }
  }, [reference])

  const verifyOnBackend = async () => {
    try {
      // ✅ This is the endpoint that tells your DB to update the 'raised' amount
      const { data } = await axios.get(`${baseUrl}/payments/verify/${reference}`)
      
      setStatus('success')
      setMessage('Thank you! Your donation has been recorded.')
    } catch (err: any) {
      console.error('Verification Error:', err)
      setStatus('error')
      setMessage(err?.response?.data?.message || 'Verification failed. Please contact support.')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-white dark:bg-neutral-950">
      <div className="max-w-md rounded-2xl border border-gray-100 p-8 shadow-2xl dark:border-white/10 dark:bg-white/5">
        
        {status === 'verifying' && (
          <>
            <Icon icon="line-md:loading-twotone-loop" className="mx-auto text-6xl text-primary" />
            <h1 className="mt-6 text-xl font-bold">Just a second...</h1>
            <p className="mt-2 text-gray-500">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <Icon icon="solar:check-circle-bold" className="mx-auto text-7xl text-green-500" />
            <h1 className="mt-6 text-2xl font-bold">Payment Confirmed!</h1>
            <p className="mt-2 text-gray-500">{message}</p>
            <button 
              onClick={() => router.push('/campaigns')}
              className="btn-primary mt-8 w-full"
            >
              View More Campaigns
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <Icon icon="solar:danger-bold" className="mx-auto text-7xl text-red-500" />
            <h1 className="mt-6 text-2xl font-bold">Oops!</h1>
            <p className="mt-2 text-gray-500">{message}</p>
            <button 
              onClick={() => router.push('/')}
              className="btn-primary mt-8 w-full"
            >
              Return Home
            </button>
          </>
        )}
      </div>
    </div>
  )
}