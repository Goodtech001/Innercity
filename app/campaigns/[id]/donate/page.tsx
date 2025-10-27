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

// ✅ Fix types — no `Promise` on params
interface CampaignPageProps {
  params: { id: string }
}

// ✅ Server Component version
export default async function CampaignDonatePage({ params }: CampaignPageProps) {
  const { id } = params
  const post = campaignsData.find((p) => String(p.id) === id)

  if (!post) notFound()


  return (
    <div>
      <TopNavbar />

      <div className="container border-b">
        <p className="mb-3 mt-5 text-4xl font-bold text-black">Donation Summary</p>
      </div>

      <div className="wrapper container mt-10 min-h-screen w-full rounded-t-md">
        {/* Header section */}
        <div className="w-full overflow-auto rounded-t-md bg-primary">
          <div className="w-full justify-between border-textcolor px-12 py-2 md:flex">

            <div className="mb-3 flex gap-3">
              <div className='flex items-center'>
                <ProgressCircle />
              </div>

              <div className="">
                <h1 className="mt-4 line-clamp-2 text-2xl font-bold text-white md:max-w-80">
                  {post.title}
                </h1>
                <p className="text-white md:mt-2">Ends on: 22nd March 2025</p>

                 <div className="mt-2 flex gap-8 text-white">
              <div>
                <p className="md:text-right md:hidden block">Target</p>
                <p>$ 82,239.43</p>
              </div>
              <div>
                <p className="md:text-right md:hidden block">Raised</p>
                <p>$ 82,239.43</p>
              </div>
            </div>
              </div>
            </div>

            <div className=" flex gap-8 text-white">
              <div className=' md:block hidden'>
                <p className="text-right">Target</p>
                <p>$ 82,239.43</p>
              </div>
              <div className=' md:block hidden'>
                <p className="text-right md:block hidden">Raised</p>
                <p>$ 82,239.43</p>
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
