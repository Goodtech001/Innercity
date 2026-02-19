'use client'
import React, { Suspense, useState } from 'react'
import campaigns from '@/json/dummy-campaigns.json'
import { Campaign } from '@/types/Campaign'
import TopNavbar from '@/layouts/topnavbar'
import Footer from '@/layouts/footer'
import { useRouter, useSearchParams } from 'next/navigation'
import SearchInput from '@/components/search-input'
import FundraiseCampaignCard from '@/components/fundraise-campaign-card'
import { Icon } from '@iconify/react/dist/iconify.js'
import useTopnavbar from '@/layouts/topnavbar/useTopnavbar'
// import useTopnavbar from '@/layouts/topnavbar/useTopnavbar'

function CampaignsContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')?.toLowerCase() || ''
  const category = searchParams.get('category')

  const filteredCampaignsByQuery = (campaigns as unknown as Campaign[]).filter((campaign) =>
    campaign.title.toLowerCase().includes(query.toLowerCase()),
  )
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredCampaigns = category
    ? filteredCampaignsByQuery.filter((campaign) => campaign.category === category)
    : filteredCampaignsByQuery

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

  return (
    <div>
      <div className="container !h-auto">
        <div className="mb-3 items-center justify-between border-b py-1.5 pt-6 md:flex">
          <h3 className="text-balance text-2xl font-bold text-dark md:text-4xl">
            Fundraising Campaigns
          </h3>
          <SearchInput />
        </div>

        <div className="mt-3 flex w-full justify-between overflow-x-auto no-scrollbar">
          <div className="flex space-x-2 text-sm md:mb-0 md:space-x-2">
            <button
              className={`btn-white truncate px-4 py-2 text-xs font-light md:px-3 md:py-2 ${baseButton} ${
                activeCategory === '?category=food' ?  activeGlow : ''
              }`}
              onClick={() => handleSubMenuClick('?category=food')}
            >
              Food Campaigns
            </button>
            <button
              className={`btn-white bg-color flex items-center truncate border-textcolor px-4 py-2 text-xs font-light text-textcolor md:px-3 md:py-2 ${baseButton} ${
                activeCategory === '?category=education' ? activeGlow : ''
              }`}
              onClick={() => handleSubMenuClick('?category=education')}
            >
              Education Campaigns
            </button>
            <button
              className={`btn-white flex items-center truncate px-4 py-2 text-xs font-light md:truncate md:px-5 md:py-2 ${baseButton} ${
                activeCategory === '?category=women' ? activeGlow : ''
              }`}
              onClick={() => handleSubMenuClick('?category=women')}
            >
              Women Empowerment
            </button>
            <button
              className={`btn-white flex items-center truncate border-textcolor px-6 py-2 text-xs font-light text-textcolor md:truncate md:px-5 md:py-2 ${baseButton} ${
                activeCategory === '?category=community' ? activeGlow : ''
              }`}
              onClick={() => handleSubMenuClick('?category=community')}
            >
              Community Development
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
              <h1 className="block text-sm font-semibold text-black md:hidden">Sort by</h1>
              <Icon
                icon="iconamoon:arrow-down-2"
                width="20"
                height="20"
                className="block md:hidden"
              />
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="container py-8 pb-6 md:py-14 md:pb-8">
          {query && (
            <p className="mb-6 text-sm text-gray-500">
              Showing results for <span className="font-semibold">{query}</span>
            </p>
          )}
          {filteredCampaignsByQuery.length === 0 ? (
            <p className="text-gray-500">No campaigns found.</p>
          ) : (
            <div className="flex justify-center flex-col gap-5 md:grid md:grid-cols-3">
              {/* fundraise campaign card */}
              {filteredCampaigns.map((campaign) => (
                <FundraiseCampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </div>
      </section>
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
