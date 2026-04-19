/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/alt-text */
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useMemo } from 'react'

type Campaign = {
  id: number
  title: string
  banner?: string
  thumbnail_large?: string
  thumbnail?: { url: string }
  category?: { name: string }
  user?: { fullname: string; avatar?: string }
  goal: number
  raised: number
  endDate?: string
  donorCount?: number
  recentDonors?: { avatar?: string }[]
  impactMetric?: string
  funders?: { user?: { avatar?: string } }[]
  payments?: any[]
}

export default function PremiumCampaignCard({ campaign }: { campaign: Campaign }) {
  // 🎯 Combine funders and payments to get unique donors and total count
  const { totalDonors, displayAvatars } = useMemo(() => {
    const combined = [...(campaign.funders || []), ...(campaign.payments || [])];
    
    // Extract unique avatars for social proof
    const avatars = combined
      .map(item => item.user?.avatar)
      .filter(Boolean)
      .map(avatar => `https://fundraise.theinnercitymission.ngo/${avatar}`)
      .slice(0, 3);

    return {
      totalDonors: combined.length || campaign.donorCount || 0,
      displayAvatars: avatars
    };
  }, [campaign.funders, campaign.payments, campaign.donorCount]);

  const image = campaign.thumbnail_large
    ? `https://fundraise.theinnercitymission.ngo/${campaign.thumbnail_large}`
    : campaign.thumbnail?.url

  const goal = Number(campaign.goal || 0)
  const raised = Number(campaign.raised || 0)
  const progress = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0

  const isCompleted = progress >= 100
  const isAlmost = progress >= 90 && progress < 100

  const daysLeft = useMemo(() => {
    if (!campaign.endDate) return null
    const diff = new Date(campaign.endDate).getTime() - new Date().getTime()
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0)
  }, [campaign.endDate])

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [6, -6])
  const rotateY = useTransform(x, [-100, 100], [-6, 6])

  if (!campaign?.id) return null;

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - rect.left - rect.width / 2)
        y.set(e.clientY - rect.top - rect.height / 2)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      style={{ rotateX, rotateY }}
      className="group relative w-full max-w-sm rounded-2xl"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-xl dark:bg-white/5">
        
        {/* IMAGE */}
        <div className="relative h-56 overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            <Image
              src={image as string}
              alt={campaign.title}
              unoptimized
              fill
              className="object-cover"
              priority={false}
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-black shadow">
            {campaign.category?.name || 'Campaign'}
          </div>

          {daysLeft !== null && daysLeft > 0 && (
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
              <Icon icon="solar:clock-circle-bold" />
              {daysLeft}d left
            </div>
          )}

          {isCompleted && (
            <div className="absolute bottom-3 left-3 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
              🎉 Funded
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="relative -mt-10 space-y-4 p-4">
          <div className="rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-md dark:bg-black/40">
            
            <Link
              href={`/campaigns/${campaign.id}`} prefetch
              className="line-clamp-2 text-lg font-bold text-black transition group-hover:text-primary dark:text-white"
            >
              {campaign.title}
            </Link>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              by{' '}
              <span className="font-medium text-primary">
                {campaign.user?.fullname || 'Anonymous'}
              </span>
            </p>

            {/* PROGRESS RING */}
            <div className="mt-4 flex items-center gap-4">
              <div className="relative h-14 w-14">
                <svg className="h-full w-full rotate-[-90deg]">
                  <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" className="text-gray-200 dark:text-gray-700" fill="transparent" />
                  <motion.circle
                    cx="28" cy="28" r="24" strokeWidth="4" fill="transparent" stroke="url(#grad)"
                    strokeDasharray={150}
                    strokeDashoffset={150 - (progress / 100) * 150}
                    className={`${isAlmost ? 'animate-pulse' : ''}`}
                  />
                  <defs>
                    <linearGradient id="grad">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black dark:text-white">
                  {Math.round(progress)}%
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-black dark:text-white">
                  ${raised.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  of ${goal.toLocaleString()}
                </p>
              </div>
            </div>

            {/* SOCIAL PROOF */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                {displayAvatars.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    onError={(e) => (e.currentTarget.src = '/avatar.png')}
                    className="h-7 w-7 rounded-full border-2 border-white object-cover"
                  />
                ))}
                {displayAvatars.length === 0 && (
                   <div className="h-7 w-7 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                      <Icon icon="solar:user-bold" className="text-gray-400 text-xs" />
                   </div>
                )}
              </div>

              <p className="text-xs text-gray-500">
                {totalDonors}+ donors
              </p>
            </div>

            {campaign.impactMetric && (
              <p className="mt-3 text-xs font-medium text-green-600">
                {campaign.impactMetric}
              </p>
            )}

            <Link
              href={`/campaigns/${campaign.id}`} prefetch
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg active:scale-95"
            >
              <Icon icon="solar:heart-bold" />
              Support this campaign
            </Link>
          </div>
        </div>

        {isAlmost && (
          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-yellow-400/40 shadow-[0_0_30px_rgba(250,204,21,0.4)]" />
        )}
      </div>
    </motion.div>
  )
}



// /* eslint-disable @next/next/no-img-element */
// import React from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { Icon } from '@iconify/react'
// import PercentageBar from '@/components/percentage-bar'
// import fundraiseCampaignImage from '@/public/assets/images/meal-fund.jpeg'
// import { Campaign } from '@/types/Campaign'

// export default function FundraiseCampaignCard({ campaign }: { campaign: Campaign }) {
//   const image = campaign.thumbnail_large
//   ? `https://fundraise.theinnercitymission.ngo/${campaign.thumbnail_large}`
//   : campaign.thumbnail?.url

//   const goal = Number(campaign.goal || 0)
//   const raised = Number(campaign.raised || 0)

//   const progress = goal > 0 ? Math.min(Math.round((raised / goal) * 100), 100) : 0

//   return (
//     <div className="flex w-full flex-col rounded-lg shadow-[0px_0px_4px_1px_rgba(100,_100,_100,_0.1)] transition hover:scale-[1.01]">
//       {/* IMAGE */}
//       <div className="relative h-52 w-full overflow-hidden rounded-t-lg">
//         {campaign.category?.name && (
//           <span className="absolute left-2 top-2 z-10 flex items-center gap-2 rounded-md bg-white px-3 py-1 text-xs font-semibold text-primary shadow">
//             <Icon icon="mdi:tag" />
//             {campaign.category.name} || Food
//           </span>
//         )}

//         <Image
//           src={image as string}
//           unoptimized
//           alt={campaign.title}
//           fill
//           className="object-cover"
//         />
//       </div>

//       {/* CONTENT */}
//       <div className="flex flex-col gap-3 p-4">
//         {/* TITLE */}
//         <Link href={`/campaigns/${campaign.id}`} className="line-clamp-2 text-lg font-bold text-dark hover:text-primary">
//           {campaign.title}
//         </Link>

//         {/* CREATOR */}
//         <p className="text-sm text-gray-500">
//           Created by{' '}
//           <span className="font-medium text-primary">{campaign.user?.fullname || 'Anonymous'}</span>
//         </p>

//         {/* PROGRESS */}
//         <div className="flex items-center gap-3">
//           <PercentageBar value={progress} />
//           <span className="text-sm font-semibold text-primary">{progress}%</span>
//         </div>

//         {/* AMOUNTS */}
//         <div className="flex justify-between text-sm font-medium">
//           <span>
//             Raised: <span className="text-primary">${raised.toLocaleString()}</span>
//           </span>

//           <span>
//             Goal: <span className="text-primary">${goal.toLocaleString()}</span>
//           </span>
//         </div>

//         {/* CTA */}
//         <Link href={`/campaigns/${campaign.id}`} className="btn-primary mt-2 w-fit px-8 text-sm">
//           Donate now
//         </Link>
//       </div>
//     </div>
//   )
// }