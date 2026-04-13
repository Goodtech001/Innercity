/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { baseUrl } from '@/constants'
import { Icon } from '@iconify/react'

export default function VerifyPaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const reference = searchParams.get('reference')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (reference) {
      verifyPayment()
    }
  }, [reference])

  const verifyPayment = async () => {
    try {
      // This calls your backend to check with Paystack and update the Campaign 'raised' amount
      const { data } = await axios.get(`${baseUrl}/payments/verify/paystack/${reference}`)
      
      if (data.status === true || data.data?.status === 'success') {
        setStatus('success')
        // Redirect to the campaign page after a short delay
        setTimeout(() => {
          router.push(`/campaigns/${data.data?.metadata?.campaignId || ''}`)
        }, 3000)
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error('Verification Error:', err)
      setStatus('error')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      {status === 'loading' && (
        <div className="flex flex-col items-center">
          <Icon icon="line-md:loading-twotone-loop" className="text-5xl text-primary" />
          <p className="mt-4 text-lg font-medium">Verifying your donation...</p>
        </div>
      )}

      {status === 'success' && (
        <div className="flex flex-col items-center">
          <Icon icon="solar:check-circle-bold" className="text-6xl text-green-500" />
          <h1 className="mt-4 text-2xl font-bold">Donation Successful!</h1>
          <p className="text-gray-500">Thank you for your support. Redirecting you back...</p>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center">
          <Icon icon="solar:danger-bold" className="text-6xl text-red-500" />
          <h1 className="mt-4 text-2xl font-bold">Payment Verification Failed</h1>
          <p className="text-gray-500">We couldn&apos;t verify your payment. Please contact support.</p>
          <button 
            onClick={() => router.push('/')}
            className="btn-primary mt-6"
          >
            Go back Home
          </button>
        </div>
      )}
    </div>
  )
}