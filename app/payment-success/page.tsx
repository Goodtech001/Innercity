/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { baseUrl } from '@/constants'
import { Icon } from '@iconify/react'

// 1. Move the logic into a sub-component
function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const reference = searchParams.get('reference') || searchParams.get('payment_intent')
  
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [message, setMessage] = useState('Verifying your donation...')

  useEffect(() => {
    if (reference) {
      verifyOnBackend()
    } else {
      setStatus('error')
      setMessage('No payment reference found.')
    }
  }, [reference])

  const verifyOnBackend = async () => {
    try {
      // Hits your verification endpoint to update the campaign "raised" total
      await axios.get(`${baseUrl}/payments/verify/${reference}`)
      setStatus('success')
      setMessage('Thank you! Your donation has been recorded.')
    } catch (err: any) {
      console.error('Verification Error:', err)
      setStatus('error')
      setMessage(err?.response?.data?.message || 'Verification failed.')
    }
  }

  return (
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
          <button onClick={() => router.push('/campaigns')} className="btn-primary mt-8 w-full">
            View More Campaigns
          </button>
        </>
      )}

      {status === 'error' && (
        <>
          <Icon icon="solar:danger-bold" className="mx-auto text-7xl text-red-500" />
          <h1 className="mt-6 text-2xl font-bold">Oops!</h1>
          <p className="mt-2 text-gray-500">{message}</p>
          <button onClick={() => router.push('/')} className="btn-primary mt-8 w-full">
            Return Home
          </button>
        </>
      )}
    </div>
  )
}

// 2. The main Page component wraps the content in Suspense
export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-white dark:bg-neutral-950">
      <Suspense fallback={
        <div className="flex flex-col items-center">
          <Icon icon="line-md:loading-twotone-loop" className="text-5xl text-primary" />
          <p className="mt-4 text-gray-500">Loading payment details...</p>
        </div>
      }>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  )
}