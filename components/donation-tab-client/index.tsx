/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useRef, useEffect } from 'react'
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

export default function DonationTabsClient({
  espees,
  paystack,
  campaign,
}: {
  espees: any
  paystack: any
  campaign: Campaign
}) {
  const [activeStep, setActiveStep] = useState(1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const params = useParams()

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
        return <EspeeForm campaign={campaign}/>
      case 2:
        return <StripeForm />
      case 3:
        return <PaypalForm />
      case 4:
        return <PaystackForm campaign={campaign}/>
      case 5:
        return <VoucherForm campaignId={campaign} />
      case 6:
        return <BankTransfer />
      default:
        return null
    }
  }

  return (
    <section className="w-full flex justify-center px-4">
      <div className="w-full max-w-5xl">

        {/* ===== TOP USER STRIP (Stripe-style identity bar) ===== */}
        <div
          className="
            flex items-center justify-between
            rounded-2xl border border-zinc-200/70 dark:border-white/10
            bg-white dark:bg-[#0B0F19]
            px-5 py-4 shadow-sm
          "
        >
          <div className="flex items-center gap-3">
            <Image
              src={avatar as string}
              unoptimized
              alt="user"
              width={44}
              height={44}
              className="rounded-full object-cover"
            />

            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                {campaign.user?.fullname}
              </p>
              <p className="text-xs text-zinc-500">
                Verified campaign creator
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-zinc-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Secure checkout
          </div>
        </div>

        {/* ===== PAYMENT METHOD SELECTOR (Stripe-style pills) ===== */}
        <div className="mt-6">
          <div
            ref={scrollRef}
            className="
              flex gap-2 overflow-x-auto no-scrollbar
              rounded-2xl border border-zinc-200/70 dark:border-white/10
              bg-white dark:bg-[#0B0F19]
              p-2
            "
          >
            {steps.map((step) => {
              const active = activeStep === step.id

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`
                    flex items-center gap-2 whitespace-nowrap
                    px-4 py-2 rounded-xl transition-all duration-200
                    border
                    ${
                      active
                        ? 'bg-zinc-900 text-white border-zinc-900 shadow-md'
                        : 'bg-transparent text-zinc-600 dark:text-zinc-300 border-transparent hover:bg-zinc-100 dark:hover:bg-white/5'
                    }
                  `}
                >
                  <Icon icon={step.icon} className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {step.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ===== MAIN PAYMENT PANEL (Luxury checkout card) ===== */}
        <div
          className="
            mt-6 rounded-3xl
            border border-zinc-200/70 dark:border-white/10
            bg-white dark:bg-[#0B0F19]
            shadow-sm
            overflow-hidden
          "
        >
          {/* subtle top highlight */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/20 to-transparent" />

          <div className="p-5 md:p-8">
            {renderStep()}
          </div>
        </div>

        {/* ===== TRUST FOOTER (Paystack-style reassurance) ===== */}
        <div className="mt-4 text-center text-xs text-zinc-500">
          Payments are encrypted and processed securely via trusted providers
        </div>

      </div>
    </section>
  )
}