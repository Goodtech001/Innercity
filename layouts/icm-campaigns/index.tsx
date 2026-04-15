/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { baseUrl } from '@/constants'
import React, { useEffect, useState } from 'react'
import { CampaignCardSkeleton } from '../latest-fundraising-campaigns'
import ICMCampaignCategories from '@/layouts/icm-campaign-categories'

function IcmCampaign() {
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

      // SORT by newest
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

  return (
    <div>
      {loading
        ? Array.from({ length: 1 }).map((_, index) => <CampaignCardSkeleton key={index} />)
        : campaigns.slice(0, 1).map((campaign) => (
            <ICMCampaignCategories campaign={campaign} key={campaign.id} />
            // <FundraiseCampaignCard key={campaign.id} campaign={campaign} />
          ))}
    </div>
  )
}

export default IcmCampaign
