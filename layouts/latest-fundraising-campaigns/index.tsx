"use client";
import Link from 'next/link'
import React, { useRef } from 'react'
import FundraiseCampaignCard from '@/components/fundraise-campaign-card'
import campaigns from '@/json/dummy-campaigns.json'
import { Campaign } from '@/types/Campaign'
import {  motion, useInView } from 'framer-motion'

export default function LatestFundraisingCampaigns() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

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

          <div className="flex flex-col gap-5 md:grid md:grid-cols-3">
            {/* fundraise campaign card */}
            {(campaigns as unknown as Campaign[]).slice(0, 3).map((campaign) => (
              <FundraiseCampaignCard key={campaign.id} campaign={campaign} href={`/campaigns/${campaign.id}`} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
