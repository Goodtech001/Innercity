/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react'
import espees from '@/public/assets/images/espees.png'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { baseUrl } from '@/constants'
import { Campaign } from '@/types/Campaign'
import { Icon } from '@iconify/react'

function EspeeForm({ campaign }: { campaign: Campaign }) {
  const params = useParams()
  const campaignId = Number(params?.id)

  const [amount, setAmount] = useState('')
  const [email, setEmail] = useState('')
  const [fullname, setFullname] = useState('') // For guest donors
  const [userId, setUserId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [showGuestModal, setShowGuestModal] = useState(false)

  // Load user session on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('course-training-profile')
      if (!stored) return
      const parsed = JSON.parse(stored)
      const user = parsed?.user

      if (user) {
        setEmail(user?.email || '')
        setUserId(user?.id || null)
        setFullname(user?.fullname || '')
      }
    } catch (err) {
      console.error('User session parse error:', err)
    }
  }, [])

  const handleDonateClick = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount) return alert('Please enter an amount')

    // If no user is logged in, show the information modal first
    if (!userId) {
      setShowGuestModal(true)
    } else {
      startedPayment()
    }
  }

  const startedPayment = async (guestData?: { email: string, name: string }) => {
    const finalEmail = guestData?.email || email
    // Use guest ID fallback if your backend supports guest checkout (e.g., 0 or a generic guest ID)
    const finalUserId = userId || 0 

    if (!campaignId || !finalEmail || !amount) {
      alert('Missing payment information')
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`${baseUrl}/payments/initialize/espees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          amount: Number(amount),
          email: finalEmail,
          userId: finalUserId,
          fullname: guestData?.name || fullname
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Initialization failed')

      window.location.href = data.paymentUrl
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
      setShowGuestModal(false)
    }
  }

  return (
    <div className="mx-auto max-w-md p-4">
      <form onSubmit={handleDonateClick} className="space-y-6">
        <div className="rounded-2xl bg-blue-50/50 p-4 border border-blue-100">
          <small className="text-blue-700 font-medium leading-relaxed">
            Thank you for your sponsorship. You will be redirected to the Espee gateway. 
            Kindly wait to be redirected back so your payment is credited correctly.
          </small>
        </div>

        <div>
          <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-400">
            Pledged Amount (Espees)
          </label>
          <div className="flex w-full group">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="block w-full rounded-l-2xl border border-gray-200 bg-gray-50 p-4 outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
              required
            />
            <div className="flex items-center space-x-2 rounded-r-2xl border border-l-0 bg-white px-5 border-gray-200">
              <Image src={espees} alt="espees" height={20} width={20} />
              <span className="text-sm font-bold text-gray-600">Espees</span>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full rounded-2xl bg-[#00a2ed] py-4 font-black text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-500 active:scale-95 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Donate Now'}
        </button>
      </form>

      {/* GUEST INFORMATION MODAL */}
      {showGuestModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-[2.5rem] bg-white p-8 shadow-2xl">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Icon icon="solar:user-plus-bold-duotone" width={32} />
              </div>
              <h2 className="text-xl font-black text-gray-900">Donor Details</h2>
              <p className="text-xs text-gray-400 mt-1">Please provide your info to track your seed.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="mt-1 w-full rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="mt-1 w-full rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <button 
                onClick={() => startedPayment({ email, name: fullname })}
                disabled={loading || !email || !fullname}
                className="w-full rounded-xl bg-gray-900 py-3 text-sm font-bold text-white transition-all hover:bg-black disabled:opacity-30"
              >
                {loading ? 'Starting Payment...' : 'Continue to Payment'}
              </button>
              
              <button 
                onClick={() => setShowGuestModal(false)}
                className="w-full text-xs font-bold text-gray-400 uppercase tracking-tighter"
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

export default EspeeForm