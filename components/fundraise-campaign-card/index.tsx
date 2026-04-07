/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import PercentageBar from '@/components/percentage-bar'
import fundraiseCampaignImage from '@/public/assets/images/meal-fund.jpeg'
import { Campaign } from '@/types/Campaign'

export default function FundraiseCampaignCard({ campaign }: { campaign: Campaign }) {
  const image = campaign.thumbnail_large
  ? `https://fundraise.theinnercitymission.ngo/${campaign.thumbnail_large}`
  : campaign.thumbnail?.url

  const goal = Number(campaign.goal || 0)
  const raised = Number(campaign.raised || 0)

  const progress = goal > 0 ? Math.min(Math.round((raised / goal) * 100), 100) : 0

  return (
    <div className="flex w-full flex-col rounded-lg shadow-[0px_0px_4px_1px_rgba(100,_100,_100,_0.1)] transition hover:scale-[1.01]">
      {/* IMAGE */}
      <div className="relative h-52 w-full overflow-hidden rounded-t-lg">
        {campaign.category?.name && (
          <span className="absolute left-2 top-2 z-10 flex items-center gap-2 rounded-md bg-white px-3 py-1 text-xs font-semibold text-primary shadow">
            <Icon icon="mdi:tag" />
            {campaign.category.name} || Food
          </span>
        )}

        <Image
          src={image as string}
          unoptimized
          alt={campaign.title}
          fill
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-3 p-4">
        {/* TITLE */}
        <Link href={`/campaigns/${campaign.id}`} className="line-clamp-2 text-lg font-bold text-dark hover:text-primary">
          {campaign.title}
        </Link>

        {/* CREATOR */}
        <p className="text-sm text-gray-500">
          Created by{' '}
          <span className="font-medium text-primary">{campaign.user?.fullname || 'Anonymous'}</span>
        </p>

        {/* PROGRESS */}
        <div className="flex items-center gap-3">
          <PercentageBar value={progress} />
          <span className="text-sm font-semibold text-primary">{progress}%</span>
        </div>

        {/* AMOUNTS */}
        <div className="flex justify-between text-sm font-medium">
          <span>
            Raised: <span className="text-primary">${raised.toLocaleString()}</span>
          </span>

          <span>
            Goal: <span className="text-primary">${goal.toLocaleString()}</span>
          </span>
        </div>

        {/* CTA */}
        <Link href={`/campaigns/${campaign.id}`} className="btn-primary mt-2 w-fit px-8 text-sm">
          Donate now
        </Link>
      </div>
    </div>
  )
}
