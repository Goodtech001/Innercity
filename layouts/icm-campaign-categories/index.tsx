/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Icon } from '@iconify/react'
// import { Campaign } from '@/types/Campaign'

type Campaign = {
  image: string | Blob | undefined
  id: number
  title: string
  banner?: { url: string }
  thumbnail?: { url: string }
  category?: { name: string }
  user?: { fullname: string; avatar?: string }
  goal: number
  raised: number
  excerpt: string
  endDate?: string
  donorCount?: number
  recentDonors?: { avatar?: string }[]
  impactMetric?: string
  thumbnail_large?: string
}

export default function CampaignShowcase({ campaign }: { campaign: Campaign }) {
  const image = campaign.thumbnail_large
    ? `https://fundraise.theinnercitymission.ngo/${campaign.thumbnail_large}`
    : campaign.thumbnail?.url || '/placeholder.jpg'
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#f8fafc] to-[#eef2ff] py-20">
      {/* Ambient glow */}
      <div className="absolute -top-32 left-0 h-[300px] w-[300px] bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] bg-blue-400/20 blur-3xl" />

      <div className="container grid items-center gap-12 md:grid-cols-2">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="rounded-lg bg-amber-100 p-1.5 text-amber-600">
              <Icon icon="solar:star-bold" width={16} />
            </div>
            <p className="text-sm font-black uppercase tracking-widest text-amber-600">
              Featured Campaign
            </p>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight text-gray-900 md:text-5xl">
            {campaign.title}
          </h2>
          <p className="mt-4 text-gray-600">{campaign.excerpt}</p>

          {/* STATS */}
          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <div>
              <p className="text-gray-400">Sponsors</p>
              <p className="text-lg font-bold">+ donors</p>
            </div>

            <div>
              <p className="text-gray-400">Raised</p>
              <p className="text-lg font-bold">${campaign.raised}</p>
            </div>

            <div>
              <p className="text-gray-400">Goal</p>
              <p className="text-lg font-bold">${campaign.goal}</p>
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/campaigns/${campaign.id}`}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-white shadow-lg transition hover:scale-[1.03]"
          >
            <Icon icon="solar:heart-bold" />
            Support Campaign
          </Link>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* GLASS CARD */}
          <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.1)] backdrop-blur-2xl">
            {/* VIDEO / IMAGE */}
            <div className="relative h-64 w-full">
              <img src={image} className="h-full w-full object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* PLAY BUTTON */}
              <button className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
                <Icon icon="solar:play-bold" />
              </button>
            </div>

            {/* PROGRESS */}
            <div className="p-6">
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                />
              </div>

              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>{campaign.raised} raised</span>
                <span>{campaign.goal} goal</span>
              </div>
            </div>
          </div>

          {/* FLOATING CARD */}
          <div className="absolute -bottom-6 -right-6 rounded-2xl bg-white p-4 shadow-xl">
            <p className="text-xs text-gray-500">Impact</p>
            <p className="text-lg font-bold text-primary">7B+ meals</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
