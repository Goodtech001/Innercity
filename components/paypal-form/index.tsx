/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { baseUrl } from '@/constants'
import CountryCurrencyDropdown from '../country-currency-dropdown'

function PaypalForm({ campaignId, userId }: { campaignId: any, userId?: any }) {
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  
  // This hook tells us if the PayPal script is actually loaded
  const [{ isPending }] = usePayPalScriptReducer();

  const handleInitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!campaignId || !amount || !email) return toast.error('Fill all fields')

    try {
      setLoading(true)
      const res = await axios.post(`${baseUrl}/payments/initialize/paypal`, {
        campaignId: Number(campaignId),
        amount: Number(amount),
        currency: 'USD',
        email: email,
        userId: userId || 11064
      })

      // LOG THIS: If this is undefined, the buttons will never show
      const p_id = res.data?.data?.orderId || res.data?.orderId || res.data?.id
      console.log("Paypal Order ID received:", p_id)
      
      if (p_id) {
        setOrderId(p_id)
      } else {
        toast.error("Backend didn't return an Order ID")
      }
    } catch (error: any) {
      toast.error('Failed to start PayPal session')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md p-4 space-y-4">
      {/* If script is still loading from the provider */}
      {isPending && <div className="text-center text-[10px] animate-pulse">Loading PayPal SDK...</div>}

      <form onSubmit={handleInitOrder} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-black uppercase text-gray-400">Email</label>
          <input
            type="email"
            value={email}
            disabled={!!orderId}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-xl border border-gray-100 bg-gray-50 p-3 outline-none disabled:opacity-50"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-black uppercase text-gray-400">Pledge</label>
          <div className="flex w-full">
            <input
              type="number"
              value={amount}
              disabled={!!orderId}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full rounded-l-xl border border-gray-100 bg-gray-50 p-3 outline-none disabled:opacity-50"
            />
            <div className="flex items-center rounded-r-xl border border-l-0 bg-gray-100 px-3">
              <CountryCurrencyDropdown />
            </div>
          </div>
        </div>

        {!orderId && (
          <button 
            type="submit" 
            disabled={loading || isPending}
            className="w-full rounded-xl py-4 font-black bg-[#0070ba] text-white hover:bg-[#005ea6] shadow-lg disabled:opacity-50"
          >
            {loading ? 'Connecting...' : 'Pay with PayPal'}
          </button>
        )}
      </form>

      {orderId && (
        <div className="mt-4 animate-in fade-in zoom-in duration-500">
          <PayPalButtons 
            style={{ layout: 'vertical', shape: 'rect', height: 45 }}
            createOrder={() => orderId} 
            onApprove={async (data: { orderID: string }) => {
  try {
    toast.loading('Verifying payment...', { id: 'verify' });
    
    const verifyRes = await axios.post(`${baseUrl}/payments/verify/paypal`, {
      orderId: data.orderID, // Use orderID from the PayPal popup result
      campaignId: Number(campaignId)
    });

    if (verifyRes.data.success || verifyRes.data.status === 'COMPLETED') {
      toast.success('Payment Successful!', { id: 'verify' });
      window.location.href = '/donation/success';
    }
  } catch (err: any) {
    toast.error('Verification failed. Please contact support.', { id: 'verify' });
    console.error("Verification Error:", err);
  }
}}
          />
          <button onClick={() => setOrderId(null)} className="mt-4 w-full text-[10px] font-bold text-gray-400 uppercase">
            ← Back
          </button>
        </div>
      )}
    </div>
  )
}

export default PaypalForm