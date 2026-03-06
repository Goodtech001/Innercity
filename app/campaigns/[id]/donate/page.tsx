import { notFound } from 'next/navigation'
import TopNavbar from '@/layouts/topnavbar'
import ProgressCircle from '@/components/progress bar-circle'

import campaignsData from '@/json/dummy-campaigns.json'

import espees from '@/public/assets/images/espees.png'

import paystack from '@/public/assets/images/paystackk.png'
import DonationTabsClient from '@/components/donation-tab-client'

// 👇 import client-side tab component

// ✅ Pre-generate paths for static campaigns
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

export default async function CampaignDonatePage({ params }: CampaignPageProps) {
  const { id } = await params // ✅ await it
  const post = campaignsData.find((p) => String(p.id) === id)

  if (!post) notFound()

  return (
    <div>
      <TopNavbar />

      <div className="container border-b">
        <p className="container mb-3 mt-5 text-2xl font-bold text-black md:text-4xl">
          Donation Summary
        </p>
      </div>

      <div className="wrapper container mt-10 min-h-screen w-full rounded-t-md">
        {/* Header section */}
        <div className="w-full overflow-auto rounded-t-md bg-primary px-10">
          <div className="">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex gap-6 items-center">
                <ProgressCircle />
                <div className="text-white">
                  <h1 className="my-auto mt-[px] line-clamp-2 text-base font-bold text-white md:max-w-80">
                    {post.title}
                  </h1>
                  <p>Ends on: 22nd March 2025</p>
                </div>
              </div>

              <div className="">


                 {/* <div className="mb-6  text-white">
                <div className="flex items-center gap-8 text-sm text-white">
                  <div className="md:hidden block">
                    <p className="text-left">Target</p>
                    <p>$ 82,239.43</p>
                  </div>
                  <div className="hidden md:block">
                    <p className="md:hidden block text-left ">Raised</p>
                    <p>$ 82,239.43</p>
                  </div>
                </div>
              </div> */}
               
              </div>
              <div className="mb-6 ml-auto mt-auto text-white">
                <div className="flex items-center gap-8 text-sm text-white">
                  <div className="hidden md:block">
                    <p className="text-right">Target</p>
                    <p>$ 82,239.43</p>
                  </div>
                  <div className="hidden md:block">
                    <p className="hidden text-right md:block">Raised</p>
                    <p>$ 82,239.43</p>
                  </div>
                </div>
              </div>
              {/* <p className='mt-auto justify-end text-white'>John</p> */}
            </div>
          </div>
        </div>

        {/* 🧩 Donation tabs (client-side component) */}
        <DonationTabsClient espees={espees} paystack={paystack} />
      </div>
    </div>
  )
}
