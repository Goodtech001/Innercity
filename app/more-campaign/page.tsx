'use client'
import React, { Suspense } from 'react'
import campaigns from '@/json/dummy-campaigns.json'
import { Campaign } from '@/types/Campaign'
import TopNavbar from '@/layouts/topnavbar'
import Footer from '@/layouts/footer'
import { useSearchParams } from 'next/navigation'
import SearchInput from '@/components/search-input'
import FundraiseCampaignCard from '@/components/fundraise-campaign-card'
import { Icon } from '@iconify/react/dist/iconify.js'

function CampaignsContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')?.toLowerCase() || ''

  // Filter campaigns by title using the query

  // 3. Filter campaigns based on searchTerm (not directly from URL anymore)
  const campaignsData = (campaigns as unknown as Campaign[]).filter((campaign) =>
    campaign.title.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div>

       <div className="w-full mt-5 justify-between flex overflow-x-auto no-scrollbar px-2">
          <div className="flex space-x-2 md:space-x-2 text-sm md:mb-0 mb-1">
            <button className="btn-white px-4 py-2 text-xs font-light md:px-3 md:py-2 truncate">
              Food Campaigns
            </button>
            <button className="btn-white bg-color border-textcolor px-4 py-2 text-xs font-light text-textcolor md:px-3 md:py-2 flex items-center truncate">
              Education Campaigns
            </button>
            <button className="btn-white px-4 py-2 text-xs font-light md:truncate md:px-5 md:py-2 flex items-center truncate">
              Women Empowerment
            </button>
            <button className="btn-white border-textcolor px-6 py-2 text-xs font-light text-textcolor md:truncate md:px-5 md:py-2 flex items-center truncate">
              Community Development
            </button>
          </div>
          </div>
      <section>
        <div className="container py-8 pb-6 md:py-14 md:pb-8">
          <div className="mb-8 items-end justify-between gap-5 md:flex md:gap-0">
            <div className='flex justify-between font-medium'>
              <h3 className="text-balance text-2xl font-bold text-dark md:text-4xl">
                <span className="hidden md:inline">Fundraising</span> Campaigns
              </h3>
              <div className='flex'>
                <h3 className="block md:hidden mt-2 text-base text-black">Sort by</h3>
              <Icon
              icon="iconamoon:arrow-down-2"
              width="24"
              height="24"
              className="block md:hidden mt-2 "
            />
              </div>
            </div>
            <SearchInput />
          </div>
          {query && (
            <p className="mb-6 text-sm text-gray-500">
              Showing results for `<span className="font-semibold">{query}</span>`
            </p>
          )}
          {campaignsData.length === 0 ? (
            <p className="text-gray-500">No campaigns found for.</p>
          ) : (
            <div className="flex flex-col gap-5 md:grid md:grid-cols-3">
              {/* fundraise campaign card */}
              {campaignsData.map((campaign) => (
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
