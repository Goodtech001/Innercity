import Link from 'next/link'
import React from 'react'
import FundraiseCampaignCard from '@/components/fundraise-campaign-card'
import campaigns from '@/json/dummy-campaigns.json'
import { Campaign } from "@/types/Campaign"

export default function LatestFundraisingCampaigns() {
  return (
    <section>
      <div className="container py-8 pb-6 md:py-14 md:pb-8">
        <div className="mb-8 flex items-end justify-between">
          <h3 className="text-balance text-3xl font-bold text-dark md:text-4xl">
            Latest <span className="hidden md:inline">Fundraising</span> Campaigns
          </h3>

          <Link className="font-semibold underline" href={'/more-campaign'}>
            See more
          </Link>
        </div>

        <div className="flex flex-col gap-5 md:grid md:grid-cols-3">
          {/* fundraise campaign card */}
          {(campaigns as unknown as Campaign[]).slice(0, 3).map((campaign) => (
             <FundraiseCampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  )
}
