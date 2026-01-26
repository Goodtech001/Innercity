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
        <div className="w-full overflow-auto rounded-t-md bg-primary">
          <div className="flex w-full items-center justify-between gap-3 border-textcolor py-2 md:mb-3 md:flex md:px-12">
            <div className="flex gap-4">
              <div className="flex items-center">
                <ProgressCircle />
              </div>

              <div className="">
                <h1 className="my-auto mt-[20px] line-clamp-2 text-base font-bold text-white md:max-w-80">
                  {post.title}
                </h1>
                <div className="flex justify-between">
                  <div className=''>
                    <p className="text-sm text-white md:mt-2">Ends on: 22nd March 2025</p>

                    <div className="mb-3 mt-2 flex gap-8 text-white">
                      <div className="block md:hidden">
                        <p className="md:text-right">Target</p>
                        <p>$ 82,239.43</p>
                      </div>
                      <div className="block md:hidden">
                        <p className="md:text-right">Raised</p>
                        <p>$ 82,239.43</p>
                      </div>
                    </div>
                  </div>

                  <div className="ml-[390px] flex items-center gap-8 text-sm text-white">
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
              </div>
            </div>
          </div>
        </div>

        {/* 🧩 Donation tabs (client-side component) */}
        <DonationTabsClient espees={espees} paystack={paystack} />
      </div>
    </div>
  )
}
