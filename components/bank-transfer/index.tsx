/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { baseUrl } from '@/constants'
import { Icon } from '@iconify/react'

interface BankTransferProps {
  campaign: any
  amount: number
}

function BankTransfer({ campaign, amount }: BankTransferProps) {
  const [loading, setLoading] = useState(false)
  const [depositorName, setDepositorName] = useState('')
  const [proofImage, setProofImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState<number | null>(null)
  const [token, setToken] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('course-training-profile') || sessionStorage.getItem('course-training-profile')
    if (stored) {
      const parsed = JSON.parse(stored)
      const userData = parsed?.user || parsed
      setEmail(userData?.email || '')
      setUserId(userData?.id ? Number(userData.id) : null)
      setToken(parsed?.token || '')
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProofImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!proofImage || !depositorName) {
      return toast.error('Please provide depositor name and payment receipt')
    }

    try {
      setLoading(true)

      // 1. Use YOUR internal upload endpoint
      const formData = new FormData()
      formData.append('file', proofImage)

      const uploadRes = await axios.post(`${baseUrl}/uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })

      // Get URL from your backend response structure (asset.url or data.url)
      const proofImageUrl = uploadRes.data?.asset?.url || uploadRes.data?.url || uploadRes.data?.data?.url

      if (!proofImageUrl) {
        throw new Error('Failed to retrieve image URL from upload')
      }

      // 2. Submit to Backend - Following Postman Guide Exactly
      const payload = {
        campaignId: Number(campaign?.id),
        amount: Number(amount),
        currency: "NGN",
        depositor_name: depositorName,
        email: email,
        userId: userId ? Number(userId) : null,
        proofImageUrl: proofImageUrl 
      }

      const res = await axios.post(`${baseUrl}/bank-transfers`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.status === 200 || res.status === 201) {
        toast.success('Transfer details submitted for verification!')
        setPreview(null)
        setProofImage(null)
        setDepositorName('')
      }
    } catch (error: any) {
      console.error('Submission Error:', error)
      toast.error(error?.response?.data?.message || 'Failed to submit transfer proof')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md p-4 space-y-6">
      <div className="rounded-2xl bg-blue-50 p-5 border border-blue-100">
        <h4 className="text-blue-900 font-bold text-sm mb-3 flex items-center gap-2">
          <Icon icon="solar:bank-bold" /> Payment Instructions
        </h4>
        <div className="space-y-1 text-xs text-blue-800">
          <p>Account Name: <span className="font-bold">InnerCity Mission</span></p>
          <p>Account Number: <span className="font-bold">2030022369</span></p>
          <p>Bank: <span className="font-bold">Parallex Bank</span></p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[10px] font-black uppercase text-gray-400 mb-1.5 ml-1">
            Depositor Name
          </label>
          <input
            type="text"
            required
            value={depositorName}
            onChange={(e) => setDepositorName(e.target.value)}
            placeholder="Name on bank account"
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-gray-400 mb-1.5 ml-1">
            Upload Receipt (Proof of Payment)
          </label>
          <div className="relative group">
            <input
              type="file"
              required
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-gray-50 group-hover:border-blue-400 transition-colors">
              {preview ? (
                <img src={preview} alt="Preview" className="h-32 w-full object-cover rounded-lg" />
              ) : (
                <>
                  <Icon icon="solar:upload-minimalistic-bold" className="text-gray-300 text-3xl mb-2" />
                  <p className="text-[11px] text-gray-400 font-bold uppercase">Click to upload image</p>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-gray-900 py-4 text-sm font-bold text-white shadow-xl transition-all hover:bg-gray-800 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Icon icon="solar:restart-bold" className="animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Proof of Payment'
          )}
        </button>
      </form>

      <div className="text-center space-y-1">
        <p className="text-[10px] text-gray-400 font-medium italic">
          For assistance, please call Ruthelle: +2348083842789
        </p>
      </div>
    </div>
  )
}

export default BankTransfer