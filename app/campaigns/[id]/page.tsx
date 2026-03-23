// import { Campaign } from '@/types/Campaign'
import { notFound } from 'next/navigation'
// import { use } from 'react'
import fundraiseCampaignImage from '@/public/assets/images/meal-fund.jpeg'
import Image from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
import PercentageCircle from '@/components/percentage-circle'
// import me from '@/public/assets/images/me.jpg'
import TopNavbar from '@/layouts/topnavbar'
import campaignsData from '@/json/dummy-campaigns.json'

import Link from 'next/link'
import CampaignLiveProgress from '../live-progress'
// import { use } from 'react'

// export const dynamic = 'force-dynamic'
export async function generateStaticParams() {
  return campaignsData.map((campaign) => ({
    id: campaign.id.toString(),
  }))
}

interface CampaignPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CampaignDetailsPage({ params }: CampaignPageProps) {
  const { id } = await params // ✅ await it
  const post = campaignsData.find((p) => String(p.id) === id)

  if (!post) notFound()
  console.log(post)

  return (
    <div>
      <TopNavbar />
      {/* <div className='container ml-auto'>
            <button onClick={() => router.back()} className="text-white rounded bg-red-200 p-2 mt-5 ">
        ← Back
      </button>
         </div> */}

      <div className="container h-[118vh] grid-cols-10 p-4 md:grid md:h-screen md:space-x-10">
        <section className="col-span-6 h-[180vh] overflow-y-auto no-scrollbar md:h-auto">
          <Image
            src={fundraiseCampaignImage}
            alt={post.title}
            className="mb-6 max-h-[400px] w-full rounded-lg object-cover"
          />

          <h1 className="title mb-4 text-2xl font-semibold text-black">{post.title}</h1>

          <div className="md:flex md:space-x-6">
            <div className="flex font-bold text-primary">
              <Icon icon={'mdi:tag'} className="mt-1" />
              <p>Send Children Back to School</p>
            </div>
            <div className="flex font-bold text-primary">
              <Icon icon={'mdi:location'} className="mt-1" />
              <p>Lagos, Nigeria</p>
            </div>
          </div>
          <div className="mt-4 flex gap-1">
            <span className="font-bold text-primary">{post.user}</span>{' '}
            <p className="mt text-base">Created this campaign</p>
          </div>
          <p className="mt-5 border-t border-textcolor text-gray-700"></p>
          <p className="mt-4 space-y-4">{post.description}</p>
        </section>

         {/* LIVE CAMPAIGN PROGRESS */}
              <CampaignLiveProgress campaign={post} />

      </div>
    </div>
  )
}
