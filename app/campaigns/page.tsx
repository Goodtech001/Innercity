/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import React, { Suspense, useEffect, useState } from 'react'
import campaigns from '@/json/dummy-campaigns.json'
import { Campaign } from '@/types/Campaign'
import TopNavbar from '@/layouts/topnavbar'
import Footer from '@/layouts/footer'
import { useRouter, useSearchParams } from 'next/navigation'
import SearchInput from '@/components/search-input'
import FundraiseCampaignCard from '@/components/fundraise-campaign-card'
import { Icon } from '@iconify/react/dist/iconify.js'
import useTopnavbar from '@/layouts/topnavbar/useTopnavbar'
import food from '@/public/assets/images/food-7bmc.jpg'
// import education from '@/public/assets/images/women-empowerment-gathering.jpg'
import women from '@/public/assets/images/women-empowerment-gathering.jpg'
import community from '@/public/assets/images/community-development-construction.jpg'
import Image from 'next/image'
import { baseUrl } from '@/constants'
// import useTopnavbar from '@/layouts/topnavbar/useTopnavbar'

function CampaignsContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')?.toLowerCase() || ''
  const category = searchParams.get('category')

  // const filteredCampaignsByQuery = (campaigns as unknown as Campaign[]).filter((campaign) =>
  //   campaign.title.toLowerCase().includes(query.toLowerCase()),
  // )
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // const filteredCampaigns = category
  //   ? filteredCampaignsByQuery.filter((campaign) => campaign.category === category)
  //   : filteredCampaignsByQuery

  const { setSubMenuClicked } = useTopnavbar()
  const handleSubMenuClick = (path: string) => {
    setActiveCategory(path)
    router.push(path)
    setSubMenuClicked(path)
  }
  // const [activeStep, setActiveStep] = useState(1)

  const router = useRouter()
  const baseButton =
    'btn-white flex items-center truncate px-4 py-2 text-xs font-light border border-transparent text-textcolor rounded-md transition-all duration-200 md:px-5 md:py-2'

  const activeGlow =
    'border-blue-200 border text-primary shadow-[0_0_8px_rgba(0,123,255,0.7)] bg-primary/10'

  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const res = await fetch(`${baseUrl}/campaigns`)
      const data = await res.json()

      const campaignsArray = Array.isArray(data) ? data : data.data || data.campaigns || []

       const sortedCampaigns = campaignsArray.sort(
        (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )

      setCampaigns(sortedCampaigns)
    } catch (error) {
      console.error('Failed to fetch campaigns:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 px-6 py-10 md:grid-cols-3 md:px-14">
        {Array.from({ length: 6 }).map((_, index) => (
          <CampaignCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="container !h-auto">
        <div className="mb-3 items-center justify-between border-b py-1.5 pt-6 md:flex">
          <h3 className="text-balance text-2xl font-bold text-dark md:text-4xl">
            Fundraising Campaigns
          </h3>
          <SearchInput />
        </div>

        <div className="mt-3 flex w-full justify-center overflow-x-auto no-scrollbar md:justify-between">
          <div className="space- flex justify-center gap-4 text-sm md:mb-0 md:gap-4 md:space-x-2">
            <button onClick={() => handleSubMenuClick('?category=food')}>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={food}
                  alt="food"
                  className={`h-10 w-10 rounded-full object-cover font-light ${
                    activeCategory === '?category=food' ? activeGlow : ''
                  }`}
                />
                <p>Food</p>
              </div>
            </button>
            <button onClick={() => handleSubMenuClick('?category=education')}>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={community}
                  alt="education"
                  className={`h-10 w-10 rounded-full object-cover font-light ${
                    activeCategory === '?category=food' ? activeGlow : ''
                  }`}
                />
                <p>Education</p>
              </div>
            </button>
            <button onClick={() => handleSubMenuClick('?category=women')}>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={women}
                  alt="women"
                  className={`h-10 w-10 rounded-full object-cover font-light ${
                    activeCategory === '?category=food' ? activeGlow : ''
                  }`}
                />
                <p>Women</p>
              </div>
            </button>
            <button onClick={() => handleSubMenuClick('?category=community')}>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={community}
                  alt="community"
                  className={`h-10 w-10 rounded-full object-cover font-light ${
                    activeCategory === '?category=food' ? activeGlow : ''
                  }`}
                />
                <p className="">Community</p>
              </div>
            </button>
          </div>

          <div className="flex text-black">
            <h1 className="hidden font-semibold text-black md:block">Sort by</h1>
            <Icon
              icon="iconamoon:arrow-down-2"
              width="24"
              height="24"
              className="hidden md:block"
            />
          </div>
        </div>

        <div className="mt-2 flex flex-col justify-between space-y-5 md:flex-row md:space-y-0">
          <div className="flex justify-between">
            <div className="flex space-x-4 md:space-x-5"></div>
            <div className="flex text-black">
              <h1 className="hidden text-sm font-semibold text-black">Sort by</h1>
              <Icon icon="iconamoon:arrow-down-2" width="20" height="20" className="hidden" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 px-6 py-10 md:grid-cols-3 md:px-14">
        {campaigns.map((campaign) => (
          <FundraiseCampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  )
}

export default function MoreFundraisingCampaigns() {
  return (
    <div>
      <TopNavbar />
      <Suspense fallback={<div className="p-4 text-gray-500">Loading campaigns...</div>}>
        <CampaignsContent />
      </Suspense>
      <Footer />
    </div>
  )
}

function CampaignCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border bg-white shadow-sm">
      {/* Image */}
      <div className="h-48 w-full rounded-t-xl bg-gray-200"></div>

      {/* Content */}
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
        <div className="h-4 w-1/2 rounded bg-gray-200"></div>

        <div className="mt-4 h-2 w-full rounded bg-gray-200"></div>

        <div className="flex justify-between pt-3">
          <div className="h-4 w-16 rounded bg-gray-200"></div>
          <div className="h-4 w-16 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  )
}
