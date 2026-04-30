/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { baseUrl } from '@/constants'
import { Icon } from '@iconify/react'

interface VoucherFormProps {
  campaignId: string | number;
}

function VoucherForm({ campaignId }: VoucherFormProps) {
  const [voucherCode, setVoucherCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState<number | null>(null)
  const [pins, setPins] = useState(['', '', '', ''])

  // Modal State
  const [modal, setModal] = useState({ isOpen: false, type: 'success' as 'success' | 'error', message: '' })

  /* =====================
     LOAD USER
  ===================== */
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('course-training-profile') || localStorage.getItem('course-training-profile')
      if (!stored) return
      const parsed = JSON.parse(stored)
      const user = parsed?.user || parsed
      setEmail(user?.email || '')
      setUserId(user?.id || null)
    } catch (err) {
      console.error('User session parse error:', err)
    }
  }, [])

  /* =====================
     INPUT LOGIC
  ===================== */
  const handleVoucherChange = (value: string) => {
    const clean = value.replace(/\D/g, '').slice(0, 16)
    setVoucherCode(clean)
    setPins([
      clean.slice(0, 4),
      clean.slice(4, 8),
      clean.slice(8, 12),
      clean.slice(12, 16),
    ])
  }

  const handlePinChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return
    const updated = [...pins]
    updated[index] = value.slice(0, 4)
    setPins(updated)
    setVoucherCode(updated.join(''))
    if (value.length === 4 && index < 3) {
      document.getElementById(`pin-${index + 1}`)?.focus()
    }
  }

  /* =====================
     SUBMIT
  ===================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const idToSubmit = Number(campaignId)
    if (!idToSubmit || isNaN(idToSubmit)) {
      toast.error('Campaign ID is missing.')
      return
    }

    if (!pins.every((p) => /^\d{4}$/.test(p))) {
      toast.error('Please complete all 4 PIN fields')
      return
    }

    try {
      setLoading(true)
      const payload = {
        campaignId: idToSubmit,
        voucherCode,
        pin1: Number(pins[0]),
        pin2: Number(pins[1]),
        pin3: Number(pins[2]),
        pin4: Number(pins[3]),
        email,
        userId,
      }

      const res = await axios.post(`${baseUrl}/voucher/redeem`, payload, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })

      if (res.status === 200 || res.status === 201) {
        toast.success('Success')
        setModal({ isOpen: true, type: 'success', message: 'Voucher redeemed successfully!' })
        setVoucherCode('')
        setPins(['', '', '', ''])
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message
      const errorText = Array.isArray(msg) ? msg[0] : (msg || 'Invalid or already used voucher')
      
      toast.error('Error')
      setModal({ isOpen: true, type: 'error', message: errorText })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-md p-4">
        {/* ... (Existing form content remains exactly the same) ... */}
        <p className="max-w-lg text-sm text-gray-600">Recharge vouchers can be purchased at the Innercity Mission offices.</p>
        <div className="mb-4 mt-6">
          <label htmlFor="voucher-code" className="mb-2 block text-sm font-semibold text-gray-700">Insert Voucher</label>
          <input type="text" id="voucher-code" value={voucherCode} onChange={(e) => handleVoucherChange(e.target.value)} placeholder="Enter 16-digit code" maxLength={16} className="block w-full rounded-lg border border-gray-300 p-3 text-lg tracking-widest outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
          <div className="mt-10 flex gap-2">
            {pins.map((pin, index) => (
              <input key={index} id={`pin-${index}`} type="text" value={pin} onChange={(e) => handlePinChange(e.target.value, index)} maxLength={4} className="w-full rounded-lg border border-gray-200 p-3 text-center text-lg tracking-widest outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="0000" />
            ))}
          </div>
          <button type="submit" disabled={loading} className={`mt-6 w-full rounded-lg py-3 font-bold text-white shadow-md transition-all ${loading ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}>
            {loading ? 'Verifying...' : 'Donate with Voucher'}
          </button>
        </div>
      </form>

      {/* MODAL COMPONENT */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
            <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${modal.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              <Icon icon={modal.type === 'success' ? 'eva:checkmark-fill' : 'eva:alert-triangle-fill'} className="text-4xl" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-800">{modal.type === 'success' ? 'Redemption Successful' : 'Oops!'}</h3>
            <p className="mt-2 text-sm text-gray-600">{modal.message}</p>
            <button onClick={() => setModal({ ...modal, isOpen: false })} className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-bold text-white hover:bg-blue-700">
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default VoucherForm