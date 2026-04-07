import { notFound } from 'next/navigation'
import TopNavbar from '@/layouts/topnavbar'
import ProgressCircle from '@/components/progress bar-circle'
import DonationTabsClient from '@/components/donation-tab-client'

import espees from '@/public/assets/images/espees.png'
import paystack from '@/public/assets/images/paystackk.png'
import PercentageCircle from '@/components/percentage-circle'
import DonatePercentageCircle from '@/components/donate-percentage-circle'

const baseUrl = "https://fundraise-api.onrender.com/api/v1"

interface CampaignPageProps {
  params: {
    id: string
  }
}

export default async function CampaignDonatePage({ params }: CampaignPageProps) {

  const res = await fetch(`${baseUrl}/campaigns/${params.id}`, {
    cache: "no-store"
  })

  if (!res.ok) notFound()

  const data = await res.json()
  const campaign = data?.data || data

  const goal = Number(campaign.goal || 0)
  const raised = Number(campaign.raised || 0)
  const progress = goal > 0 ? Math.min(Math.round((raised / goal) * 100), 100) : 0

  return (
    <div>
      <TopNavbar />

      <div className="container border-b">
        <p className="container mb-3 mt-5 text-2xl font-bold text-black md:text-4xl">
          Donation Summary
        </p>
      </div>

      <div className="wrapper container mt-10 min-h-screen w-full rounded-t-md">

        {/* HEADER */}
        <div className="w-full overflow-auto rounded-t-md bg-primary px-10">

          <div className="grid grid-cols-3 gap-4">

            {/* LEFT */}
            <div className="flex items-center gap-6">

              {/* <ProgressCircle
                progress={}
              /> */}
             <div className='py-6'>
               <DonatePercentageCircle progress={progress}/>
             </div>

              <div className="text-white">

                <h1 className="md:line-clamp-2 text-base font-bold md:max-w-80">
                  {campaign.title}
                </h1>

                <p className="truncate">
                  Ends on: {campaign.period || "No end date"}
                </p>

                <div className="mb-6 mt-auto text-white md:hidden">

                  <div className="flex items-center gap-8 text-sm">

                    <div>
                      <p className="text-left">Target</p>
                      <p>${goal.toLocaleString()}</p>
                    </div>

                    <div>
                      <p className="text-left">Raised</p>
                      <p>${raised.toLocaleString()}</p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* CENTER */}
            <div></div>

            {/* RIGHT */}
            <div className="mb-6 ml-auto mt-auto text-white">

              <div className="flex items-center gap-8 text-sm">

                <div className="hidden md:block">
                  <p className="text-right">Target</p>
                  <p>${goal.toLocaleString()}</p>
                </div>

                <div className="hidden md:block">
                  <p className="text-right">Raised</p>

                  <p>${raised.toLocaleString()}</p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* DONATION TABS */}
        <DonationTabsClient
          campaign={campaign}
          espees={espees}
          paystack={paystack}
        />

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
