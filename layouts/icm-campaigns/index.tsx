/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { baseUrl } from '@/constants'
import React, { useEffect, useState } from 'react'
import { CampaignCardSkeleton } from '../latest-fundraising-campaigns'
import ICMCampaignCategories from '@/layouts/icm-campaign-categories'
import Link from 'next/link'
import { Icon } from '@iconify/react'

function IcmCampaign() {
  const [featuredCampaigns, setFeaturedCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const res = await fetch(`${baseUrl}/campaigns`)
      const data = await res.json()

      const campaignsArray = Array.isArray(data) ? data : data.data || data.campaigns || []

      // 1. Filter for FEATURED campaigns only
      // Handling both boolean true and string "true" based on your previous JSON example
      const featured = campaignsArray.filter(
        (c: any) => c.featured === true || c.featured === "true"
      )

      // 2. Sort by newest
      const sorted = featured.sort(
        (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )

      setFeaturedCampaigns(sorted)
    } catch (error) {
      console.error('Failed to fetch campaigns:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!loading && featuredCampaigns.length === 0) return null;

  return (
    <div className="relative">
      {/* Featured Header with Link */}
      <div className="container mb-[-40px] pt-10 flex justify-end relative z-10">
         <Link 
          href="/icm-campaigns" 
          className="group flex items-center gap-2 text-sm font-bold text-primary hover:opacity-80 transition-all"
        >
          View All Featured 
          <Icon icon="solar:alt-arrow-right-bold" className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {loading
        ? <CampaignCardSkeleton />
        : featuredCampaigns.slice(0, 1).map((campaign) => (
            <ICMCampaignCategories campaign={campaign} key={campaign.id} />
          ))}
    </div>
  )
}

export default IcmCampaign