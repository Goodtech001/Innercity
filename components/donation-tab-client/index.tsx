/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import { useParams } from 'next/navigation'

import EspeeForm from '@/components/espee-form'
import StripeForm from '@/components/stripe-form'
import PaypalForm from '@/components/paypal-form'
import PaystackForm from '@/components/paystack-form'
import VoucherForm from '@/components/voucher-form/voucher'
import BankTransfer from '@/components/bank-transfer'
import { Campaign } from '@/types/Campaign'

type TUser = {
  id?: number
  fullname?: string
  username?: string
  email?: string
  avatar?: string
  photo?: string
  admin?: boolean | number
}

type Props = {
  mobile?: boolean
  direction?: 'left' | 'right'
  className?: string
}

export default function DonationTabsClient({
  espees,
  paystack,
  campaign,
  mobile
}: {
  espees: any
  paystack: any
  campaign: Campaign
  mobile: Props
}) {
  const [activeStep, setActiveStep] = useState(1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const [user, setUser] = useState<TUser | null>(null)
  const [amount, setAmount] = useState<number>(0);

  const loadUserData = useCallback(() => {
    const stored =
      localStorage.getItem('course-training-profile') ||
      sessionStorage.getItem('course-training-profile')

    if (!stored) return

    try {
      if (!stored.startsWith('{')) return

      const parsed = JSON.parse(stored)
      const userData = parsed.user || parsed
      const isAdmin = userData.admin === true || userData.admin === 1

      setUser({ ...userData, admin: isAdmin })
    } catch (error) {
      console.error('Failed to parse user session:', error)
    }
  }, [])

  useEffect(() => {
    // Initial load
    loadUserData()

    // Listen for changes made in other components (like GlassProfile)
    window.addEventListener('storage', loadUserData)

    // Custom event listener for same-window updates
    window.addEventListener('profileUpdate', loadUserData)

    return () => {
      window.removeEventListener('storage', loadUserData)
      window.removeEventListener('profileUpdate', loadUserData)
    }
  }, [loadUserData])

  const avatar = campaign.user?.avatar
    ? `https://fundraise.theinnercitymission.ngo/${campaign.user?.avatar}`
    : campaign.thumbnail?.url

  const steps = [
    { id: 1, title: 'Espees', icon: 'solar:wallet-bold' },
    { id: 2, title: 'Stripe', icon: 'bi:stripe' },
    { id: 3, title: 'PayPal', icon: 'logos:paypal' },
    { id: 4, title: 'Paystack', icon: 'simple-icons:paystack' },
    { id: 5, title: 'Voucher', icon: 'mdi:voucher' },
    { id: 6, title: 'Bank', icon: 'noto:bank' },
  ]

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return <EspeeForm campaign={campaign} />
      case 2:
        return <StripeForm />
      case 3:
        return <PaypalForm />
      case 4:
        return <PaystackForm campaign={campaign} />
      case 5:
        return  <VoucherForm campaignId={campaign?.id} />
      case 6:
        return <BankTransfer campaign={campaign} amount={amount} />
      default:
        return null
    }
  }

  const getInitials = (name?: string) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0][0].toUpperCase()
    return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase()
  }

  const displayName = user?.fullname || user?.username || 'User'

  return (
    <section className="flex w-full justify-center px-4">
      <div className="w-full max-w-5xl">
        {/* ===== TOP USER STRIP (Stripe-style identity bar) ===== */}
        <div className="flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-white px-5 py-4 shadow-sm dark:border-white/10 dark:bg-[#0B0F19]">
          <div className="flex items-center gap-3">
            {user?.avatar || user?.photo ? (
              <img
                src={user.avatar || user.photo}
                alt={user.fullname || 'User avatar'}
                // Added aspect-square and flex-shrink-0 to prevent squashing
                className={`aspect-square flex-shrink-0 rounded-full border border-gray-200 object-cover ${mobile ? 'h-10 w-10' : 'h-10 w-10'}`}
              />
            ) : (
              <div
                className={`relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-gray-500 font-semibold text-white shadow-md ${mobile ? 'h-8 w-8 text-sm' : 'h-10 w-10 text-xs'}`}
              >
                <span className="animate-shine absolute inset-0 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)]"></span>
                {getInitials(displayName)}
              </div>
            )}

            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                {campaign.user?.fullname}
              </p>
              <p className="text-xs text-zinc-500">Verified campaign creator</p>
            </div>
          </div>

          <div className="hidden items-center gap-2 text-xs text-zinc-500 md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Secure checkout
          </div>
        </div>

        {/* ===== PAYMENT METHOD SELECTOR (Stripe-style pills) ===== */}
        <div className="mt-6">
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto rounded-2xl border border-zinc-200/70 bg-white p-2 no-scrollbar dark:border-white/10 dark:bg-[#0B0F19]"
          >
            {steps.map((step) => {
              const active = activeStep === step.id

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2 transition-all duration-200 ${
                    active
                      ? 'border-zinc-900 bg-zinc-900 text-white shadow-md'
                      : 'border-transparent bg-transparent text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5'
                  } `}
                >
                  <Icon icon={step.icon} className="h-4 w-4" />
                  <span className="text-sm font-medium">{step.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ===== MAIN PAYMENT PANEL (Luxury checkout card) ===== */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-sm dark:border-white/10 dark:bg-[#0B0F19]">
          {/* subtle top highlight */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-white/20" />

          <div className="p-5 md:p-8">{renderStep()}</div>
        </div>

        {/* ===== TRUST FOOTER (Paystack-style reassurance) ===== */}
        <div className="mt-4 text-center text-xs text-zinc-500">
          Payments are encrypted and processed securely via trusted providers
        </div>
      </div>
    </section>
  )
}
