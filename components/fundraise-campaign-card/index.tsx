import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import fundraiseCampaignImage from '@/public/assets/images/campaign-flyer.jpg'
import PercentageBar from '@/components/percentage-bar'
import { Icon } from '@iconify/react'
import { Campaign } from '@/types/Campaign'

export default function FundraiseCampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <div className="flex w-fit flex-col">
      <div className="flex h-full w-full flex-row gap-4 rounded-md p-1.5 shadow-[0px_0px_4px_1px_rgba(100,_100,_100,_0.1)] hover:scale-[1.01] md:max-w-96 md:flex-col md:p-2">
        <Link href={'/profile?tab=notifications'} className="relative w-[40%] md:h-52 md:w-auto">
          <span className="absolute left-1 top-1 hidden w-fit items-center justify-center gap-3 rounded-md border border-primary bg-white px-6 py-1 font-semibold text-primary md:flex">
            <Icon icon={'mdi:tag'} />
            <small>Send Children Back to School</small>
          </span>
          <Image
            className="h-full rounded border border-dark/10 object-cover"
            alt="fundraise campaign image"
            src={fundraiseCampaignImage}
          />
        </Link>
        <div className="flex w-[60%] flex-col gap-2 md:h-full md:w-auto">
          <Link
            href={`/campaign/${campaign.id}`}
            title="Join Me To Impact 200 Lives Through Education All Around Lagos For The Next 3 Years"
            className="ellipsis-2 text-balance text-lg font-bold !leading-[100%] text-dark md:text-xl"
          >
            {campaign.title}
          </Link>
          <div className="hidden gap-x-1.5 font-medium md:flex">
            Created by: <h1 className="text-primary">{campaign.user}</h1>
          </div>
          <div className="flex items-center gap-6">
            <PercentageBar value={10} />
            <p className="pb-1 text-sm font-medium leading-tight text-primary">100%</p>
          </div>
          <p className="-mt-2 text-sm font-medium">
            Target: <span className="text-primary">${campaign.target}</span>
          </p>

          <button className="mt-auto inline-block w-fit py-4 text-sm underline md:hidden">
            Donate now
          </button>

          <button className="btn-primary mt-auto hidden w-fit px-10 text-sm md:inline-block">
            Donate now
          </button>
        </div>
      </div>
    </div>
  )
}
