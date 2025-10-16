/* eslint-disable @next/next/no-img-element */
'use client'
import campaigns from '@/json/dummy-campaigns.json'
import { Campaign } from '@/types/Campaign'
import { notFound, useRouter } from 'next/navigation'
import { use } from 'react'
import fundraiseCampaignImage from '@/public/assets/images/campaign-flyer.jpg'
import Image from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
import PercentageCircle from '@/components/percentage-circle'
import me from '@/public/assets/images/me.jpg'
import TopNavbar from '@/layouts/topnavbar'

type Props = {
  params: { id: string }
}

export default function CampaignDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const campaign = (campaigns as unknown as Campaign[]).find((c) => String(c.id) === id)

  if (!campaign) return notFound()

  return (
    <div>
      <TopNavbar />
      {/* <div className='container ml-auto'>
            <button onClick={() => router.back()} className="text-white rounded bg-red-200 p-2 mt-5 ">
        ← Back
      </button>
         </div> */}
      <div className="container md:h-screen grid-cols-10 py-5 md:grid md:space-x-10">
        <section className="col-span-6 overflow-y-auto no-scrollbar">
          <Image
            src={fundraiseCampaignImage}
            alt={campaign.title}
            className="mb-6 max-h-[400px] w-full rounded-lg object-cover"
          />
          <h1 className="mb-4 text-2xl font-bold text-black">{campaign.title}</h1>

          <div className="justify-between md:flex">
            <div className="flex font-bold text-primary">
              <Icon icon={'mdi:tag'} className="mt-1" />
              <p>Send Children Back to School</p>
            </div>
            <div className="flex font-bold text-primary">
              <Icon icon={'mdi:location'} className="mt-1" />
              <p>Lagos,Nigeria</p>
            </div>
          </div>
          <div className="mt-4 flex gap-1">
            <span className="font-bold text-primary">{campaign.user}</span>{' '}
            <p className="mt text-base">Created this campaign</p>
          </div>
          <p className="mb-4 mt-5 border-t border-textcolor text-gray-700">
            {campaign.description}
          </p>
        </section>

      
        <div className="md:col-span-4 rounded-md border bg-blue-200 p-2 md:bg-white md:relative md:top-0">
          <div className="flex w-full justify-between border-b border-textcolor">
            {/* PROGRESS BAR CIRCLE  */}
            <div className="mb-3 flex gap-3">
              <PercentageCircle progress={70} />

              <div className="mt-2">
                <span className="flex w-full justify-between">
                  <p className="text-[15px] font-bold text-black">$512,458,046 Raised</p>
                </span>
                <p className="md:mt-2">100k+ Donors</p>
              </div>
            </div>
            <Icon icon="solar:bookmark-bold" width="24" height="24" className="mt-2 text-primary md:ml-0 ml-16" />
          </div>
          {/* <p>
          <strong>Category:</strong> {campaign.category}
        </p> */}
          <div className="mt-4 flex justify-between">
            <p>
              <strong>Goal:</strong> ${campaign.goal} <span className="text-primary">58,046</span>
            </p>
            <p>•</p>
            <p className="font-bold">End Date: 22nd Sept 2026</p>
          </div>

          <div className="mt-8 flex space-x-4 md:block md:space-x-0 md:space-y-3">
            <button 
            className="btn-primary w-full gap-1"
            onClick={() => router.push(`/campaigns/${id}/donate`)}>
              Donate <span className="hidden md:inline"> to campaign</span>
            </button>
            <button className="btn-white w-full gap-1">
              Share <span className="hidden md:block"> campaign</span>
            </button>
          </div>

          <div className="mt-10 hidden w-full gap-2 rounded-xl border bg-[#0074E626] p-3 md:flex">
            <Image
              src={me}
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
      </div>
    </div>
  
  )
}
