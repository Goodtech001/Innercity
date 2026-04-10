/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react'
import espees from '@/public/assets/images/espees.png'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { getUsersService } from '@/app/auth/auth.service'
import { baseUrl } from '@/constants'

function EspeeForm() {
  const [ifscCode, setIfscCode] = useState('')
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Validate form data and submit it to the server
    console.log({
      ifscCode,
    })
  }
  const params = useParams()
  const campaignId = Number(params?.id)

  const [amount, setAmount] = useState('')
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState<number | null>(null)
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

  const startedPayment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!campaignId || !email || !userId || !amount) {
      alert('Missing payment information')
      return
    }

    try {
      setLoading(true)

      const res = await fetch(`${baseUrl}/payments/initialize/espees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignId,
          amount: Number(amount),
          email,
          userId,
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
    <form onSubmit={startedPayment} className="mx-auto max-w-md p-4">
      <p className="text-primary">Dear Goodnews,</p>
      <small className="text-primary">
        Thank you for your sponsorship. You will now be redirected to our Espee gateway. After
        making your payment, kindly wait till you are redirected back to our website, so your
        payment is credited into the campaign. <br /> Thank you!
      </small>
      <div className="mb-4 mt-6">
        <label htmlFor="ifsc-code" className="mb-2 block text-sm font-medium">
          Pledged Amount
        </label>
        <div className="flex w-full">
          <input
            type="number"
            id="ifsc-code"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder=""
            className="block w-full rounded-l border border-gray-300 p-2"
            required
          />
          <div className="w-ful flex space-x-1 rounded-r border bg-gray-200 p-2 pr-7">
            <Image src={espees} alt="espees" height={24} width={24} />
            <div>Espees</div>
          </div>
        </div>
        <button type="submit" className="btn-primary mt-4 w-fit" disabled={loading}>
          {loading ? 'Processing...' : 'Donate'}
        </button>
      </div>
    </form>
  )
}

export default EspeeForm
