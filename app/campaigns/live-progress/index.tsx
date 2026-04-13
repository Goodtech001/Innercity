/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Icon } from '@iconify/react'
import PercentageCircle from '@/components/percentage-circle'
import Image from 'next/image'
import Link from 'next/link'

const socket = io('http://localhost:7070/campaigns/2')

export default function CampaignLiveProgress({ campaign }: any) {
  const [raised, setRaised] = useState(campaign.raised || 0)

  useEffect(() => {
    socket.on('campaignUpdated', (data: any) => {
      if (data.campaignId === campaign.id) {
        setRaised(data.raised)
      }
    })

    return () => {
      socket.off('campaignUpdated')
    }
  }, [campaign.id])

  const goal = campaign.goal || 1
  const percent = Math.min((raised / goal) * 100, 100)

  return (
    <div className="fixed bottom-10 w-11/12 rounded-md border bg-blue-200 p-2 md:relative md:top-0 md:col-span-4 md:w-full md:bg-white">
      <div className="flex w-full justify-between border-b border-textcolor">
        <div className="mb-3 flex gap-3">
          <PercentageCircle progress={percent} />

          <div className="mt-2">
            <span className="flex w-full justify-between">
              <p className="text-[15px] font-bold text-black">${ Number(raised).toLocaleString()} Raised</p>
            </span>

            <p className="md:mt-2">{campaign.donors || 0}+ Donors</p>
          </div>
        </div>

        <Icon
          icon="solar:bookmark-bold"
          width="24"
          height="24"
          className="ml-16 mt-2 text-primary md:ml-0"
        />
      </div>

      <div className="mt-4 flex gap-4">
        <p>
          <strong>Goal:</strong>
          <span className="text-primary">${Number(campaign.goal || 0).toLocaleString()}</span>
        </p>

        <p>•</p>

        <p className="font-bold">End Date: {campaign.endDate || '22 Sept 2026'}</p>
      </div>

      <div className="mt-8 flex space-x-4 md:block md:space-x-0 md:space-y-3">
        <Link href={`/campaigns/${campaign.id}/donate`} className="btn-primary w-full gap-1">
          Donate
        </Link>

        <button className="btn-white w-full gap-1">Share campaign</button>
      </div>

      <div className="mt-10 hidden w-full gap-2 rounded-xl border bg-[#0074E626] p-3 md:flex">
        <Image
          src="/assets/images/me.jpg"
          alt=""
          height={34}
          width={34}
          className="h-[50px] w-[50px] rounded-full object-cover"
        />

        <div>
          <span className="font-bold text-black">{campaign.user}</span>
          <p className="text-black">Joined on: 12 Sep 2025</p>
        </div>
      </div>
    </div>
  )
}
