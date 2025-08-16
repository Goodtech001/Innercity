import Link from 'next/link'
import React from 'react'
import FundraiseCampaignCard from '@/components/fundraise-campaign-card'
import dummyCampaignsData from '@/json/dummy-campaigns.json'

export default function LatestFundraisingCampaigns() {
  return (
    <div>
      <div className="container py-8 md:py-14">
        <div className="mb-8 flex items-end justify-between">
          <h3 className="text-balance text-3xl font-bold text-dark md:text-4xl">
            Latest <span className="hidden md:inline">Fundraising</span> Campaigns
          </h3>

          <Link className="font-semibold underline" href={'/campaigns'}>
            See more
          </Link>
        </div>

        <div className="flex flex-col gap-5 md:grid md:grid-cols-3">
          {/* fundraise campaign card */}
          {dummyCampaignsData.slice(0, 3).map((data) => (
            <FundraiseCampaignCard key={data.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
