/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import FundraiseCampaignCard from '@/components/fundraise-campaign-card'
import { motion, useInView } from 'framer-motion'
import { baseUrl } from '@/constants'

export default function LatestFundraisingCampaigns() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <section>
        <div className="container py-8 pb-6 md:py-14 md:pb-8">
          <div className="mb-8 flex items-end justify-between">
            <h3 className="text-balance text-3xl font-bold text-dark md:text-4xl">
              Latest <span className="hidden md:inline">Fundraising</span> Campaigns
            </h3>

            <Link className="font-semibold underline" href={'/campaigns'}>
              See more
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 px-6 py-6 md:grid-cols-3 md:px-14">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => <CampaignCardSkeleton key={index} />)
              : campaigns
                  .slice(0, 3)
                  .map((campaign) => (
                    <FundraiseCampaignCard key={campaign.id} campaign={campaign} />   
                  ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}


function CampaignCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border p-4 space-y-4">

      <div className="h-48 w-full rounded-lg bg-gray-200"></div>

      <div className="h-5 w-3/4 rounded bg-gray-200"></div>

      <div className="h-4 w-1/2 rounded bg-gray-200"></div>

      <div className="h-3 w-full rounded bg-gray-200"></div>

      <div className="flex justify-between items-center">
        <div className="h-4 w-20 rounded bg-gray-200"></div>
        <div className="h-8 w-24 rounded bg-gray-200"></div>
      </div>
    </div>
  )
}
