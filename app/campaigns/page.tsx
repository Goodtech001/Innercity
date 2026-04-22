/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { Campaign } from '@/types/Campaign'
import TopNavbar from '@/layouts/topnavbar'
import Footer from '@/layouts/footer'
import { useRouter, useSearchParams } from 'next/navigation'
import SearchInput from '@/components/search-input'
import FundraiseCampaignCard from '@/components/fundraise-campaign-card'
import { Icon } from '@iconify/react/dist/iconify.js'
import useTopnavbar from '@/layouts/topnavbar/useTopnavbar'
import food from '@/public/assets/images/food-7bmc.jpg'
import women from '@/public/assets/images/women-empowerment-gathering.jpg'
import community from '@/public/assets/images/community-development-construction.jpg'
import Image from 'next/image'
import { baseUrl } from '@/constants'

function CampaignsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const CATEGORY_MAP: Record<string, number[]> = {
    food: [32, 30, 38, 40],
    education: [33, 37],
    women: [31],
    community: [35, 36, 25, 29],
  }

  // Get search and category from URL
  const query = searchParams.get('query')?.toLowerCase() || ''
  const categoryParam = searchParams.get('category')?.toLowerCase() || ''

  const { setSubMenuClicked } = useTopnavbar()
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Handle Category Clicks
  const handleCategoryClick = (categoryName: string) => {
    // If clicking same category, clear it (toggle), else set it
    const newCategory = categoryParam === categoryName ? '' : categoryName
    const params = new URLSearchParams(searchParams.toString())

    if (newCategory) {
      params.set('category', newCategory)
    } else {
      params.delete('category')
    }

    router.push(`?${params.toString()}`)
    setSubMenuClicked(newCategory)
  }

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${baseUrl}/campaigns`)
      const data = await res.json()
      const campaignsArray = Array.isArray(data) ? data : data.data || data.campaigns || []

      const sortedCampaigns = [...campaignsArray].sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
        return dateB - dateA
      })

      setCampaigns(sortedCampaigns)
    } catch (error) {
      console.error('Failed to fetch campaigns:', error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ FILTERING LOGIC
  // ✅ UPDATED FILTERING LOGIC FOR MULTIPLE IDs
  const filteredCampaigns = campaigns.filter((campaign) => {
    // 1. Search Filter
    const matchesSearch =
      campaign.title?.toLowerCase().includes(query) ||
      campaign.description?.toLowerCase().includes(query)

    // 2. Category Filter (Handles multiple IDs)
    const targetIds = categoryParam ? CATEGORY_MAP[categoryParam] : null

    const matchesCategory = targetIds ? targetIds.includes(Number(campaign.category_id)) : true

    return matchesSearch && matchesCategory
  })

  const activeGlow = 'ring-4 ring-primary ring-offset-2 border-primary shadow-lg'

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
        <div className="mb-3 mt-10 items-center justify-between border-b py-1.5 pt-6 md:flex">
          <h3 className="text-balance text-2xl font-bold text-dark md:text-4xl">
            Fundraising Campaigns
          </h3>
          <SearchInput />
        </div>

        <div className="mt-3 flex w-full justify-center overflow-x-auto no-scrollbar md:justify-between">
          <div className="flex justify-center gap-4 text-sm md:mb-0 md:gap-4">
            {/* Category: Food */}
            <button onClick={() => handleCategoryClick('food')}>
              <div className="flex flex-col items-center justify-center gap-1">
                <Image
                  src={food}
                  alt="food"
                  className={`h-12 w-12 rounded-full object-cover transition-all ${
                    categoryParam === 'food' ? activeGlow : 'opacity-70 hover:opacity-100'
                  }`}
                />
                <p
                  className={`text-xs font-bold ${categoryParam === 'food' ? 'text-primary' : 'text-gray-500'}`}
                >
                  Food
                </p>
              </div>
            </button>

            {/* Category: Education */}
            <button onClick={() => handleCategoryClick('education')}>
              <div className="flex flex-col items-center justify-center gap-1">
                <Image
                  src={community}
                  alt="education"
                  className={`h-12 w-12 rounded-full object-cover transition-all ${
                    categoryParam === 'education' ? activeGlow : 'opacity-70 hover:opacity-100'
                  }`}
                />
                <p
                  className={`text-xs font-bold ${categoryParam === 'education' ? 'text-primary' : 'text-gray-500'}`}
                >
                  Education
                </p>
              </div>
            </button>

            {/* Category: Women */}
            <button onClick={() => handleCategoryClick('women')}>
              <div className="flex flex-col items-center justify-center gap-1">
                <Image
                  src={women}
                  alt="women"
                  className={`h-12 w-12 rounded-full object-cover transition-all ${
                    categoryParam === 'women' ? activeGlow : 'opacity-70 hover:opacity-100'
                  }`}
                />
                <p
                  className={`text-xs font-bold ${categoryParam === 'women' ? 'text-primary' : 'text-gray-500'}`}
                >
                  Women
                </p>
              </div>
            </button>

            {/* Category: Community */}
            <button onClick={() => handleCategoryClick('community')}>
              <div className="flex flex-col items-center justify-center gap-1">
                <Image
                  src={community}
                  alt="community"
                  className={`h-12 w-12 rounded-full object-cover transition-all ${
                    categoryParam === 'community' ? activeGlow : 'opacity-70 hover:opacity-100'
                  }`}
                />
                <p
                  className={`text-xs font-bold ${categoryParam === 'community' ? 'text-primary' : 'text-gray-500'}`}
                >
                  Community
                </p>
              </div>
            </button>
          </div>

          <div className="hidden items-center gap-1 text-black md:flex">
            <h1 className="font-semibold">Sort by</h1>
            <Icon icon="iconamoon:arrow-down-2" width="24" height="24" />
          </div>
        </div>
      </div>

      {/* Grid displays the FILTERED campaigns */}
      <div className="grid grid-cols-1 gap-6 px-6 py-10 md:grid-cols-3 md:px-14">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <FundraiseCampaignCard key={campaign.id} campaign={campaign} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500">
            <Icon
              icon="solar:magnifer-zoom-out-bold"
              className="mx-auto mb-4 text-4xl opacity-20"
            />
            <p className="text-lg font-medium">No campaigns found for this selection.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function MoreFundraisingCampaigns() {
  return (
    <div>
      <TopNavbar />
      <Suspense fallback={<div className="p-4 text-gray-500">Loading...</div>}>
        <CampaignsContent />
      </Suspense>
      <Footer />
    </div>
  )
}

function CampaignCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border bg-white shadow-sm">
      <div className="h-48 w-full rounded-t-xl bg-gray-200"></div>
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
