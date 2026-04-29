/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import FundraiseCampaignCard from '@/components/fundraise-campaign-card'
import { motion, useInView } from 'framer-motion'
import { baseUrl } from '@/constants'
import ball from '@/public/assets/images/ball-new.png'
import Image from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'

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
      className="relative"
    >
      <section>
        <div className="container py-8 pb-6 md:py-14 md:pb-8">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
  {/* LEFT TITLE BLOCK */}
  <div className="max-w-2xl">
    {/* Subtle Accent Tag */}
    <div className="mb-3 flex items-center gap-2">
      <span className="h-1 w-8 rounded-full bg-primary" />
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
        Active Impact
      </span>
    </div>

    <h3 className="text-3xl font-black leading-tight tracking-tighter text-zinc-900 dark:text-white md:text-5xl">
      Latest <span className="text-blue-600 font-light ">Fundraising</span> Campaigns
    </h3>

    <p className="mt-3 max-w-md text-base leading-relaxed text-zinc-500 dark:text-zinc-400 md:text-lg">
      Discover active campaigns and support <span className="text-zinc-900 dark:text-zinc-200 font-medium">meaningful causes</span> around the world.
    </p>
  </div>

  {/* RIGHT CTA */}
  <div className="flex shrink-0 items-center">
    <Link
      href="/campaigns"
      className="group flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-bold text-zinc-900 shadow-sm transition-all hover:border-zinc-900 hover:bg-zinc-900 hover:text-white dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
    >
      <span>Explore All</span>
      <Icon 
        icon="solar:arrow-right-up-linear" 
        className="transition-transform duration-300 group-hover:rotate-45" 
        width={18} 
      />
    </Link>
  </div>
</div>

          <div className="grid grid-cols-1 gap-10 px-4 py-6 md:grid-cols-3 md:px-6">
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
      {/* <div className="absolute left-0 top-20 h-40 w-40 opacity-10">
        <Image src={ball} alt="" width={120} height={120} />
      </div>
      <div className="absolute bottom-0 right-20 h-40 w-40 ">
         <Image src={ball} alt="" width={100} height={100} />
      </div> */}
    </motion.div>
  )
}

export function CampaignCardSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-xl border p-4">
      <div className="h-48 w-full rounded-lg bg-gray-200"></div>

      <div className="h-5 w-3/4 rounded bg-gray-200"></div>

      <div className="h-4 w-1/2 rounded bg-gray-200"></div>

      <div className="h-3 w-full rounded bg-gray-200"></div>

      <div className="flex items-center justify-between">
        <div className="h-4 w-20 rounded bg-gray-200"></div>
        <div className="h-8 w-24 rounded bg-gray-200"></div>
      </div>
    </div>
  )
}
