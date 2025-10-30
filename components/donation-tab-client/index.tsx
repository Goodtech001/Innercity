'use client'

import { useState, useRef } from 'react'

import { Icon } from '@iconify/react/dist/iconify.js'

import CardForm from '@/components/card-form'
import EspeeForm from '@/components/espee-form'
import StripeForm from '@/components/stripe-form'
import PaypalForm from '@/components/paypal-form'
import PaystackForm from '@/components/paystack-form'
import VoucherForm from '@/components/voucher-form/voucher'
import BankTransfer from '@/components/bank-transfer'
import Image from 'next/image'
import me from '@/public/assets/images/me.jpg'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DonationTabsClient({ espees, paystack }: { espees: any; paystack: any }) {
  const [activeStep, setActiveStep] = useState(1)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (el) el.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' })
  }

  const tabs = [
    { id: 1, title: 'Card', icon: 'streamline-emojis:credit-card', iconType: 'iconify' },
    { id: 2, title: 'Espees', image: espees },
    { id: 3, title: 'Stripe', icon: 'bi:stripe', iconType: 'iconify' },
    { id: 4, title: 'PayPal', icon: 'logos:paypal', iconType: 'iconify' },
    { id: 5, title: 'PayStack', image: paystack },
    { id: 6, title: 'Voucher', icon: 'mdi:voucher', iconType: 'iconify' },
    { id: 7, title: 'Bank Transfer', icon: 'noto:bank', iconType: 'iconify' },
  ]

  const steps = [
    { id: 1, component: <CardForm /> },
    { id: 2, component: <EspeeForm /> },
    { id: 3, component: <StripeForm /> },
    { id: 4, component: <PaypalForm /> },
    { id: 5, component: <PaystackForm /> },
    { id: 6, component: <VoucherForm /> },
    { id: 7, component: <BankTransfer /> },
  ]

  const current = steps.find((s) => s.id === activeStep)?.component

  return (
    <section className="flex justify-center border">
      {/* User info */}
      <div>

        <div className="md:mt-10 w-full gap-2 p-3 flex ">
        <Image
          src={me}
          alt="me"
          height={50}
          width={50}
          className="h-[50px] w-[50px] rounded-full object-cover"
        />
        <div>
          <span className="font-bold text-primary">Pastor Daniel</span>
          <p className="text-sm text-textcolor">Joined on: 12 Sep 2025</p>
        </div>
      </div>

      <div className="flex">
        <div className="md:mt-10">
          <div className="flex">
            <div className="mb-6 gap-4">
              <div
                ref={scrollRef}
                // className="flex max-w-[300px] gap-2 overflow-x-auto border-r p-1 no-scrollbar md:gap-2 md:p-2"
                className="flex w-[90vw] gap-2 overflow-x-auto border-r p-1 no-scrollbar md:w-[450px] md:gap-2 md:p-2"
              >
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    onClick={() => setActiveStep(tab.id)}
                    className={`flex cursor-pointer flex-col items-center justify-center px-8 hover:bg-primary/5 ${
                      activeStep === tab.id
                        ? 'border-t-4 border-primary text-primary'
                        : 'text-primary'
                    }`}
                  >
                    <button className="flex h-12 w-full items-center justify-center text-lg md:text-2xl">
                      {tab.iconType === 'iconify' ? (
                        <Icon icon={tab.icon!} className="h-6 w-6" />
                      ) : tab.image ? (
                        <Image src={tab.image} alt={tab.title} className="h-6 w-6 object-contain" />
                      ) : (
                        <div className="h-6 w-6" />
                      )}
                    </button>
                    <h4 className="mt-1 truncate text-center text-xs font-semibold text-textcolor md:text-sm">
                      {tab.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => scroll('right')} className="flex items-center justify-center">
              <Icon
                icon="material-symbols-light:keyboard-arrow-right"
                className="h-8 w-8 text-gray-600"
              />
            </button>
          </div>

          <div className="rounded-xl p-1 md:p-2">{current}</div>
        </div>
      </div>
      </div>
    </section>
  )
}
