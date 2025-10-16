/* eslint-disable @next/next/no-img-element */
'use client'
import campaigns from '@/json/dummy-campaigns.json'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import { Campaign } from '@/types/Campaign'
import TopNavbar from '@/layouts/topnavbar'
import ProgressCircle from '@/components/progress bar-circle'
import me from '@/public/assets/images/me.jpg'
import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import card from '@/public/assets/images/card.png'
import espees from '@/public/assets/images/espees.png'
import Image from 'next/image'
import CardForm from '@/components/card-form'
import paystack from '@/public/assets/images/paystackk.png'

type Props = {
  params: { id: string }
}

export default function DonatePage({ params }: Props) {
  const searchParams = useSearchParams()
  const [activeStep, setActiveStep] = useState(1)
  const [urlQueryTab, setUrlQueryTab] = useState<string | null>(null)
  const router = useRouter()

  const scrollRef = useRef(null)

  const scroll = (direction: string) => {
    const container = scrollRef.current
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const [tabs] = useState([
    {
      id: 1,
      title: 'Card',
      slug: 'card',
      icon: 'streamline-emojis:credit-card',
      iconType: 'iconify',
    },
    {
      id: 2,
      title: 'Espees',
      slug: 'espees',
      image: espees,
    },
    {
      id: 3,
      title: 'Stripe',
      slug: 'stripe',
      icon: 'bi:stripe',
      iconType: 'iconify',
    },
    {
      id: 4,
      title: 'PayPal',
      slug: 'paypal',
      icon: 'logos:paypal',
      iconType: 'iconify',
    },
    {
      id: 5,
      title: 'PayStack',
      slug: 'paystack',
      image: paystack,
    },
    {
      id: 6,
      title: 'Voucher',
      slug: 'voucher',
      icon: 'mdi:voucher',
      iconType: 'iconify',
    },
    {
      id: 7,
      title: 'Bank Transfer',
      slug: 'transfer',
      icon: 'noto:bank',
      iconType: 'iconify',
      iconClass: 'flex items-center justify-center text-center',
    },
  ])

  const stepsTab = [
    {
      step: 1,
      name: '/',
      component: () => (
        <div>
          <CardForm />
        </div>
      ),
    },
    {
      step: 2,
      name: 'espees',
      component: () => <div>Espees</div>,
    },
    {
      step: 3,
      name: 'Stripe',
      component: () => <div>stripe</div>,
    },
    {
      step: 4,
      name: 'paypal',
      component: () => <div>paypal</div>,
    },
    {
      step: 5,
      name: 'paystack',
      component: () => <div>paystack</div>,
    },
    {
      step: 6,
      name: 'voucher',
      component: () => <div>voucher</div>,
    },
    {
      step: 7,
      name: 'transfer',
      component: () => <div>Bank Transfer</div>,
    },
  ]
  const CurrentComponent = stepsTab.find((step) => step.step === activeStep)?.component

  function goForward() {
    setActiveStep((prev) => Math.min(prev + 1, stepsTab.length))
  }

  function goBack() {
    if (activeStep === 1) {
      router.back()
    }
    setActiveStep((prev) => Math.max(prev - 1, 1))
  }

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab) setUrlQueryTab(tab)
  }, [searchParams])

  useEffect(() => {
    if (!urlQueryTab || tabs.length === 0) return
    const tabIndex = tabs.findIndex((tab) => tab.slug.toLowerCase() === urlQueryTab.toLowerCase())
    if (tabIndex !== -1) setActiveStep(tabs[tabIndex].id)
    //   // remove tab from the query param
    //   // const newUrl = new URL(window.location.href)
    //   // newUrl.searchParams.delete('tab')
    //   // window.history.replaceState({}, '', newUrl.toString())
  }, [urlQueryTab, tabs])

  const { id } = params
  const campaign = (campaigns as unknown as Campaign[]).find((c) => String(c.id) === id)

  if (!campaign) return notFound()

  return (
    <div>
      <TopNavbar />
      <div className="container border-b">
        <p className="mb-3 mt-5 text-4xl font-bold text-black">Donation Summary</p>
      </div>
      <div className="wrapper container mt-10 h-screen w-full rounded-t-md">
        {/* 
        <p>Goal: ${campaign.goal}</p> */}
        <div className="w-full overflow-auto rounded-t-md bg-primary">
          <div className="md:flex w-full justify-between border-textcolor px-12 py-2">
            {/* PROGRESS BAR CIRCLE  */}
            <div className="mb-3 flex gap-3">
              <ProgressCircle />

              <div className="mt-4">
                <span className="flex w-full justify-between">
                  <h1 className="mt-4 line-clamp-2 md:max-w-80 text-2xl font-bold text-white">
                    {' '}
                    {campaign.title}
                  </h1>
                </span>
                <p className="text-white md:mt-2">Ends on: 22nd March 2025</p>
              </div>
            </div>
            <div className="mt-10 flex gap-8 items-end">
              <div className="text-white">
                <p className="text-right">Target</p>
                <p>$ 82,239.43</p>
              </div>
              <div className="text-white ml-auto">
                <p className="text-right">Raised</p>
                <p>$ 82,239.43</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center border">
          <div className="mt-10">
            <div className="hidden w-full gap-2 p-3 md:flex">
              <Image
                src={me}
                alt=""
                height={34}
                width={34}
                className="h-[50px] w-[50px] rounded-full object-cover"
              />
              <div>
                <span className="font-bold text-primary">{campaign.user}</span>
                <p className="text-sm text-textcolor">Joined on: 12 Sep 2025</p>
              </div>
            </div>

            <div className="flex">
              {/* <button
                onClick={() => scroll('left')}
                className="top-1/2 z-10 flex -translate-y-1/2 items-start rounded-full bg-white p-1 shadow"
              >
                <Icon icon="ic:chevron-left" className="h-5 w-5 text-gray-600" />
              </button> */}

              <div className="mb-6 gap-4">
                <div
                  ref={scrollRef}
                  className="flex max-w-[450px] gap-2 overflow-x-auto border-r p-1 no-scrollbar md:gap-2 md:p-2"
                >
                  {tabs.map((tab) => (
                    <div
                      key={tab.id}
                      onClick={() => setActiveStep(tab.id)}
                      className={`flex cursor-pointer flex-col items-center justify-center px-8 hover:bg-primary/5 ${activeStep === tab.id ? 'border-t-4 border-primary text-primary' : 'text-primary'} `}
                    >
                      <button
                        className={`flex h-12 w-full items-center justify-center text-lg md:text-2xl`}
                      >
                        {tab.iconType === 'iconify' ? (
                          <Icon icon={tab.icon} className="h-6 w-6" />
                        ) : (
                          <Image
                            src={tab.image}
                            alt={tab.title}
                            className="h-6 w-6 object-contain"
                          />
                        )}
                      </button>
                      <h4 className="mt-1 truncate text-center text-xs font-semibold text-textcolor md:text-sm">
                        {tab.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => scroll('right')}
                className="flex items-center justify-center"
              >
                <Icon icon="material-symbols-light:keyboard-arrow-right" className="h-8 w-8 text-gray-600" />
              </button>
            </div>

            <div className="rounded-xl p-1 md:col-span-7 md:p-2 lg:col-span-8">
              {CurrentComponent && <CurrentComponent />}
            </div>
          </div>
          <div />
        </div>
      </div>
    </div>
  )
}
