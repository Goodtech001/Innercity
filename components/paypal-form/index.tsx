/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import CountryCurrencyDropdown from '../country-currency-dropdown'
import { baseUrl } from '@/constants'
import axios from 'axios'
import { toast } from 'react-hot-toast'

interface PaypalFormProps {
  // We make this required so the parent must provide it
  campaignId: string | number | null; 
  userId?: number;
}

function PaypalForm({ campaignId, userId }: PaypalFormProps) {
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [currency] = useState('USD') 
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1. STRENGTHENED VALIDATION
    if (!campaignId) {
      return toast.error('Error: No active campaign found.')
    }
    if (!amount || !email) {
      return toast.error('Please provide an email and amount.')
    }

    try {
      setLoading(true)
      
      const payload = {
        // 2. FORCED CONVERSION TO NUMBER
        campaignId: Number(campaignId), 
        amount: Number(amount),
        currency: currency,
        email: email,
        userId: userId || 11064 
      }

      console.log('Sending payload:', payload)

      const res = await axios.post(`${baseUrl}/payments/initialize/paypal`, payload)

      if (res.data?.data?.authorization_url || res.data?.url) {
        window.location.href = res.data.data?.authorization_url || res.data.url
      } else {
        toast.success('Check console for response')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Payment initialization failed')
    } finally {
      setLoading(false)
    }
  }

  // 3. UI PROTECTION
  const isDisabled = loading || !campaignId;

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md p-4 space-y-4">
      {/* Warning if ID is missing */}
      {!campaignId && (
        <div className="rounded-lg bg-red-50 p-3 text-xs font-bold text-red-500">
          ⚠️ System Error: Campaign ID is missing
        </div>
      )}

      <div>
        <label className="mb-1 block text-xs font-black uppercase text-gray-400">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="block w-full rounded-xl border border-gray-100 bg-gray-50 p-3 outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-black uppercase text-gray-400">Pledge</label>
        <div className="flex w-full">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full rounded-l-xl border border-gray-100 bg-gray-50 p-3 outline-none"
          />
          <div className="flex items-center rounded-r-xl border border-l-0 bg-gray-100 px-3">
            <CountryCurrencyDropdown />
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isDisabled}
        className={`w-full rounded-xl py-4 font-black transition-all ${
          isDisabled 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-[#0070ba] text-white hover:bg-[#005ea6] shadow-lg shadow-blue-200'
        }`}
      >
        {loading ? 'Initializing...' : 'Pay with PayPal'}
      </button>
    </form>
  )
}

export default PaypalForm