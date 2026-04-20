/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { notFound } from 'next/navigation'
import TopNavbar from '@/layouts/topnavbar'
import DonationTabsClient from '@/components/donation-tab-client'
import espees from '@/public/assets/images/espees.png'
import paystack from '@/public/assets/images/paystackk.png'
import DonatePercentageCircle from '@/components/donate-percentage-circle'
import { Campaign } from '@/types/Campaign'

const baseUrl = 'https://fundraise-api.onrender.com/api/v1'

// 1. Pre-generate paths for all campaigns so they are static on Vercel
export async function generateStaticParams() {
  try {
    const res = await fetch(`${baseUrl}/campaigns`)
    const result = await res.json()
    
    // Safety check: Ensure we actually have an array
    const data = result?.data || result
    const campaigns = Array.isArray(data) ? data : (data?.campaigns || [])

    return campaigns.map((campaign: any) => ({
      id: campaign.id.toString(),
    }))
  } catch (error) {
    console.error("Params error:", error)
    return []
  }
}

interface CampaignPageProps {
  params: Promise<{ id: string }>
}

// 2. Main Server Component
export default async function CampaignDonatePage({ params }: CampaignPageProps) {
  const { id } = await params

  // Fetch campaign data
  const res = await fetch(`${baseUrl}/campaigns/${id}`, {
    next: { revalidate: 60 }, // Revalidate every minute
  })

  if (!res.ok) notFound()

  const data = await res.json()
  const campaign: Campaign = data?.data || data

  // Calculate Progress
  const goal = Number(campaign.goal || 0)
  const raised = Number(campaign.raised || 0)
  const progress = goal > 0 ? Math.min(Math.round((raised / goal) * 100), 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50 dark:from-[#0B0F19] dark:to-[#070A12]">
      <TopNavbar />

      {/* PAGE HEADER */}
      <div className="container mx-auto px-4 pt-10">
        <div className="flex items-end justify-between border-b border-zinc-200 pb-6 dark:border-white/10">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              Donation Overview
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Transparent funding progress & secure contributions
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8 px-4 pb-20">
        {/* HERO FINTECH CARD */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-sm dark:border-white/10 dark:bg-[#0B0F19]">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-sky-500/5" />

          <div className="relative p-6 md:p-10">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
              {/* LEFT: PROGRESS + TITLE */}
              <div className="flex items-center gap-6">
                <div className="shrink-0">
                  <DonatePercentageCircle progress={progress} />
                </div>

                <div>
                  <h2 className="line-clamp-2 text-lg font-semibold text-zinc-900 dark:text-white md:text-xl">
                    {campaign.title}
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    Ends on:{' '}
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      {campaign.period
                        ? new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit',
                          }).format(new Date(campaign.period))
                        : 'No end date'}
                    </span>
                  </p>

                  <div className="mt-4 flex gap-6 text-sm md:hidden">
                    <div>
                      <p className="text-zinc-500">Target</p>
                      <p className="font-medium text-zinc-900 dark:text-white">
                        ${goal.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-zinc-500">Raised</p>
                      <p className="font-medium text-zinc-900 dark:text-white">
                        ${raised.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CENTER: TRUST INDICATORS */}
              <div className="hidden flex-col items-center justify-center gap-3 md:flex">
                <div className="text-xs uppercase tracking-wider text-zinc-400">
                  Secure Payments
                </div>
                <div className="flex items-center gap-3 opacity-80">
                  <img src={paystack.src} alt="Paystack" className="h-5" />
                  <img src={espees.src} alt="Espees" className="h-5" />
                </div>
                <div className="text-xs text-zinc-400">Encrypted • Trusted • Verified</div>
              </div>

              {/* RIGHT: STATS */}
              <div className="hidden justify-end md:flex">
                <div className="grid gap-4 text-right">
                  <div>
                    <p className="text-xs text-zinc-500">Target</p>
                    <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                      ${goal.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Raised</p>
                    <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                      ${raised.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Progress</p>
                    <p className="text-lg font-semibold text-indigo-500">{progress}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* DONATION TABS - Pass the campaign data to the client component */}
        <div className="mt-10">
          <DonationTabsClient campaign={campaign} espees={espees} paystack={paystack} mobile={{
            mobile: undefined,
          }} />
        </div>
      </div>
    </div>
  )
}

// import { notFound } from 'next/navigation'
// import TopNavbar from '@/layouts/topnavbar'
// import ProgressCircle from '@/components/progress bar-circle'

// import campaignsData from '@/json/dummy-campaigns.json'

// import espees from '@/public/assets/images/espees.png'

// import paystack from '@/public/assets/images/paystackk.png'
// import DonationTabsClient from '@/components/donation-tab-client'

// // 👇 import client-side tab component

// // ✅ Pre-generate paths for static campaigns
// export async function generateStaticParams() {
//   return campaignsData.map((campaign) => ({
//     id: campaign.id.toString(),
//   }))
// }

// interface CampaignPageProps {
//   params: Promise<{
//     id: string
//   }>
// }

// export default async function CampaignDonatePage({ params }: CampaignPageProps) {
//   const { id } = await params // ✅ await it
//   const post = campaignsData.find((p) => String(p.id) === id)

//   if (!post) notFound()

//   return (
//     <div>
//       <TopNavbar />

//       <div className="container border-b">
//         <p className="container mb-3 mt-5 text-2xl font-bold text-black md:text-4xl">
//           Donation Summary
//         </p>
//       </div>

//       <div className="wrapper container mt-10 min-h-screen w-full rounded-t-md">
//         {/* Header section */}
//         <div className="w-full overflow-auto rounded-t-md bg-primary px-10">
//           <div className="">
//             <div className="grid grid-cols-3 gap-4">
//               <div className="flex gap-6 items-center">
//                 <ProgressCircle />
//                 <div className="text-white">
//                   <h1 className="my-auto mt-[px] md:line-clamp-2 text-base font-bold text-white md:max-w-80">
//                     {post.title}
//                   </h1>
//                   <p className='truncate'>Ends on: 22nd March 2025</p>
//                   <div className="mb-6 ml-auto mt-auto text-white">
//                 <div className="flex items-center gap-8 text-sm text-white">
//                   <div className="md:hidden block">
//                     <p className="text-left">Target</p>
//                     <p> 82,239.43</p>
//                   </div>
//                   <div className="md:hidden block ">
//                     <p className="text-left">Raised</p>
//                     <p> 82,239.43</p>
//                   </div>
//                 </div>
//               </div>
//                 </div>
//               </div>

//               <div className="">

//                  {/* <div className="mb-6  text-white">
//                 <div className="flex items-center gap-8 text-sm text-white">
//                   <div className="md:hidden block">
//                     <p className="text-left">Target</p>
//                     <p>$ 82,239.43</p>
//                   </div>
//                   <div className="hidden md:block">
//                     <p className="md:hidden block text-left ">Raised</p>
//                     <p>$ 82,239.43</p>
//                   </div>
//                 </div>
//               </div> */}

//               </div>
//               <div className="mb-6 ml-auto mt-auto text-white">
//                 <div className="flex items-center gap-8 text-sm text-white">
//                   <div className="hidden md:block">
//                     <p className="text-right">Target</p>
//                     <p>$ 82,239.43</p>
//                   </div>
//                   <div className="hidden md:block">
//                     <p className="hidden text-right md:block">Raised</p>
//                     <p>$ 82,239.43</p>
//                   </div>
//                 </div>
//               </div>
//               {/* <p className='mt-auto justify-end text-white'>John</p> */}
//             </div>
//           </div>
//         </div>

//         {/* 🧩 Donation tabs (client-side component) */}
//         <DonationTabsClient espees={espees} paystack={paystack} />
//       </div>
//     </div>
//   )
// }
