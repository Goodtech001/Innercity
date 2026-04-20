/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { baseUrl } from '@/constants'

interface VoucherFormProps {
  campaignId: any
}

function VoucherForm({ campaignId }: VoucherFormProps) {
  const [voucherCode, setVoucherCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState<number | null>(null)

  const [pins, setPins] = useState(['', '', '', ''])

  /* =====================
     LOAD USER (PAYSTACK STYLE)
  ===================== */
  useEffect(() => {
    try {
      const stored =
        sessionStorage.getItem('course-training-profile') ||
        localStorage.getItem('course-training-profile')

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
     FULL INPUT → PINS
  ===================== */
  const handleVoucherChange = (value: string) => {
    const clean = value.replace(/\D/g, '').slice(0, 16)
    setVoucherCode(clean)

    const newPins = [
      clean.slice(0, 4),
      clean.slice(4, 8),
      clean.slice(8, 12),
      clean.slice(12, 16),
    ]

    setPins(newPins)
  }

  /* =====================
     PINS → FULL INPUT
  ===================== */
  const handlePinChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return

    const updated = [...pins]
    updated[index] = value.slice(0, 4)
    setPins(updated)

    // sync full code
    const full = updated.join('')
    setVoucherCode(full)

    // auto focus next
    if (value.length === 4 && index < 3) {
      const next = document.getElementById(`pin-${index + 1}`)
      next?.focus()
    }
  }

  /* =====================
     SUBMIT
  ===================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🔥 Submit triggered')

    const idToSubmit = Number(campaignId)

    if (!idToSubmit || isNaN(idToSubmit)) {
      toast.error('Campaign ID is missing. Please refresh.')
      return
    }

    // ✅ validate pins ONLY (source of truth)
    if (!pins.every((p) => /^\d{4}$/.test(p))) {
      toast.error('Please complete all 4 PIN fields correctly')
      return
    }

    if (!email) {
      toast.error('Email is required')
      return
    }

    try {
      setLoading(true)

      const payload = {
        campaignId: idToSubmit,
        voucherCode, // synced
        pin1: Number(pins[0]),
        pin2: Number(pins[1]),
        pin3: Number(pins[2]),
        pin4: Number(pins[3]),
        email,
        userId,
      }

      console.log('🚀 Payload:', payload)

      const res = await axios.post(`${baseUrl}/voucher/redeem`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // ✅ supports cookie auth
      })

      console.log('✅ RESPONSE:', res.data)

      if (res.status === 200 || res.status === 201) {
        toast.success('Voucher redeemed successfully!')
        setVoucherCode('')
        setPins(['', '', '', ''])
      }
    } catch (error: any) {
      console.error('❌ Voucher Error:', error?.response?.data)

      const msg = error?.response?.data?.message

      toast.error(
        Array.isArray(msg)
          ? msg[0]
          : msg || 'Invalid or already used voucher'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-md p-4">
      <p className="max-w-lg text-sm text-gray-600">
        Recharge vouchers can be purchased at the Innercity Mission offices.
        Email{' '}
        <span className="font-medium text-primary">
          info@theinnercitymission.org
        </span>{' '}
        or call{' '}
        <span className="font-medium text-primary">
          +2348123445240
        </span>.
      </p>

      <div className="mb-4 mt-6">
        <label
          htmlFor="voucher-code"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Insert Voucher
        </label>

        {/* FULL CODE INPUT */}
        <input
          type="text"
          id="voucher-code"
          value={voucherCode}
          onChange={(e) => handleVoucherChange(e.target.value)}
          placeholder="Enter 16-digit code"
          maxLength={16}
          className="block w-full rounded-lg border border-gray-300 p-3 text-lg tracking-widest outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
        />

        {/* PIN INPUTS */}
        <div className="mt-10 flex gap-2">
          {pins.map((pin, index) => (
            <input
              key={index}
              id={`pin-${index}`}
              type="text"
              value={pin}
              onChange={(e) =>
                handlePinChange(e.target.value, index)
              }
              maxLength={4}
              className="w-full rounded-lg border border-gray-200 p-3 text-center text-lg tracking-widest outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="0000"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          onClick={() => console.log('🟢 Button clicked')}
          className={`mt-6 w-full rounded-lg py-3 font-bold text-white shadow-md transition-all ${
            loading
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
          }`}
        >
          {loading ? 'Verifying...' : 'Donate with Voucher'}
        </button>
      </div>
    </form>
  )
}

export default VoucherForm