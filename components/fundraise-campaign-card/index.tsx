import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import fundraiseCampaignImage from '@/public/assets/images/campaign-flyer.jpg'
import PercentageBar from '@/components/percentage-bar'
import { Icon } from '@iconify/react'
import { Campaign } from '@/types/Campaign'


export default function FundraiseCampaignCard({
  campaign,
  
}: {
  campaign: Campaign
  href: string
}) {
  return (
    <Link href={`/campaigns/${campaign.id}`}>
      <div className="flex w-full flex-row gap-4 rounded-md p-1.5 shadow-[0px_0px_6px_1px_rgba(0,_0,_0,_0.1)] hover:scale-[1.01] md:max-w-96 md:flex-col md:p-2">
        <div className="relative w-[40%] md:h-52 md:w-auto">
          <span className="absolute left-1 top-1 hidden w-fit items-center justify-center gap-3 rounded-md border border-primary bg-white px-6 py-1 font-semibold text-primary md:flex">
            <Icon icon={'mdi:tag'} />
            <small>Send Children Back to School</small>
          </span>
          <Image
            className="h-full rounded border border-dark/10 object-cover"
            alt="fundraise campaign image"
            src={fundraiseCampaignImage}
          />
        </div>
        <div className="flex w-[60%] flex-col gap-2 md:w-auto">
          <Link
            href={'/'}
            title="Join Me To Impact 200 Lives Through Education All Around Lagos For The Next 3 Years"
            className="ellipsis-2 text-balance text-lg font-bold !leading-[100%] text-dark md:text-xl"
          >
            {campaign.title}
          </Link>
          <p className="hidden font-medium md:inline-block">
            Created by:{' '}
            <Link className="text-primary" href={'/'}>
              {campaign.user}
            </Link>
          </p>
          <div className="flex items-center gap-6">
            <PercentageBar value={10} />
            <p className="pb-1 text-sm font-medium leading-tight text-primary">100%</p>
          </div>
          <p className="-mt-2 text-sm font-medium">
            Target: <span className="text-primary">${campaign.target}</span>
          </p>

          <Link className="mt-auto inline-block py-2.5 text-sm underline md:hidden" href={'/'}>
            Donate now
          </Link>

          <Link className="btn-primary mt-3 hidden w-fit px-10 text-sm md:inline-block" href={'/'}>
            Donate now
          </Link>
        </div>
      </div>
    </Link>
  )
}
