

// import { Campaign } from '@/types/Campaign'
import { notFound } from 'next/navigation'
// import { use } from 'react'
import fundraiseCampaignImage from '@/public/assets/images/campaign-flyer.jpg'
import Image from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
import PercentageCircle from '@/components/percentage-circle'
// import me from '@/public/assets/images/me.jpg'
import TopNavbar from '@/layouts/topnavbar'
import campaignsData from '@/json/dummy-campaigns.json'

import Link from 'next/link'
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

      <div className="container grid-cols-10 p-4 md:grid md:h-screen md:space-x-10 h-[118vh]">
        <section className="col-span-6 overflow-y-auto no-scrollbar">
          <Image
            src={fundraiseCampaignImage}
            alt={post.title}
            className="mb-6 max-h-[400px] w-full rounded-lg object-cover"
          />

          <h1 className="mb-4 text-2xl font-bold text-black">{post.title}</h1>

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
          <p className="mb-6 mt-5 border-t border-textcolor text-gray-700">
            {post.description}
          </p>
        </section>

        <div className="rounded-md border bg-blue-200 p-2 md:relative md:top-0 md:col-span-4 md:bg-white fixed md:w-ful w-11/12 bottom-0">
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
            <Icon
              icon="solar:bookmark-bold"
              width="24"
              height="24"
              className="ml-16 mt-2 text-primary md:ml-0"
            />
          </div>
          {/* <p>
          <strong>Category:</strong> {campaign.category}
        </p> */}
          <div className="mt-4 flex justify-between">
            <p>
              <strong>Goal:</strong> $<span className="text-primary">58,046</span>
            </p>
            <p>•</p>
            <p className="font-bold">End Date: 22nd Sept 2026</p>
          </div>

          <div className="mt-8 flex space-x-4 md:block md:space-x-0 md:space-y-3">
            {/* <button 
            className="btn-primary w-full gap-1"
            onClick={() => router.push(`/campaigns/${id}/donate`)}>
              Donate <span className="hidden md:inline"> to campaign</span>
            </button> */}
            <Link href={`/campaigns/${id}/donate`} className="btn-primary w-full gap-1">
              Donate <span className="hidden md:inline"> to campaign</span>
            </Link>
            <button className="btn-white w-full gap-1">
              Share <span className="hidden md:block"> campaign</span>
            </button>
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
              <span className="font-bold text-black">{post.user}</span>
              <p className="text-black">Joined on: 12 Sep 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}