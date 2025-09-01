'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import campaigns from '@/json/dummy-campaigns.json'
import { Campaign } from '@/types/Campaign'
import TopNavbar from '@/layouts/topnavbar'
import Footer from '@/layouts/footer'
import { useSearchParams } from 'next/navigation'
import SearchInput from '@/components/search-input'
import router, { useRouter } from 'next/router'
import FundraiseCampaignCard from '@/components/fundraise-campaign-card'

export default function MoreFundraisingCampaigns() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')?.toLowerCase() || ''

  // Filter campaigns by title using the query

  // 3. Filter campaigns based on searchTerm (not directly from URL anymore)
  const campaignsData = (campaigns as unknown as Campaign[]).filter((campaign) =>
    campaign.title.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div>
      <TopNavbar />
      <section>
        <div className="container py-8 pb-6 md:py-14 md:pb-8">
          <div className="mb-8 flex items-end justify-between gap-5 md:gap-0">
            <h3 className="text-balance text-2xl font-bold text-dark md:text-4xl">
              <span className="hidden md:inline">Fundraising</span> Campaigns
            </h3>
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
      <Footer />
    </div>
  )
}
