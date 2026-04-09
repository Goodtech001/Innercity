/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { baseUrl } from '@/constants'
import { Icon } from '@iconify/react'

export default function UserCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    totalRaised: 0,
    totalDonors: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const stored = sessionStorage.getItem('course-training-profile')
        const parsed = stored ? JSON.parse(stored) : null
        const userId = parsed?.user?.id

        const res = await fetch(`${baseUrl}/campaigns`)
        const json = await res.json()

        const campaignsArray = json?.data?.data || json?.data || json || []

        const userCampaigns = campaignsArray.filter(
          (c: any) => String(c.user?.id) === String(userId),
        )

        /* ===== Dashboard Stats ===== */

        const totalRaised = userCampaigns.reduce(
          (sum: number, c: any) => sum + Number(c.raisedAmount || 0),
          0,
        )

        const totalDonors = userCampaigns.reduce(
          (sum: number, c: any) => sum + Number(c.donorCount || 0),
          0,
        )

        setStats({
          totalCampaigns: userCampaigns.length,
          totalRaised,
          totalDonors,
        })

        setCampaigns(userCampaigns)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  return (
    <div className="space-y-8 p-6">
      {/* ========================= */}
      {/* Campaign Stats Dashboard */}
      {/* ========================= */}

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard icon="mdi:bullhorn" label="My Campaigns" value={stats.totalCampaigns} />

        <StatCard
          icon="solar:money-bag-bold"
          label="Total Raised"
          value={`₦${stats.totalRaised.toLocaleString()}`}
        />

        <StatCard icon="fa:users" label="Total Donors" value={stats.totalDonors} />
      </div>

      {/* ========================= */}
      {/* Campaign Grid */}
      {/* ========================= */}

      {loading && <p>Loading campaigns...</p>}

      {!loading && campaigns.length === 0 && (
        <div className="py-20 text-center">
          <h3 className="text-xl font-semibold">No created campaigns</h3>

          <p className="text-gray-500">You haven&apos;t created a campaign yet</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {campaigns.map((campaign) => {
          const banner = campaign.thumbnail_large
            ? `https://fundraise.theinnercitymission.ngo/${campaign.thumbnail_large}`
            : campaign.thumbnail?.url
          return (
            <div
              key={campaign.id}
              onClick={() => setSelectedCampaign(campaign)}
              className="cursor-pointer overflow-hidden rounded-xl border transition hover:shadow-lg"
            >
              <img src={banner} className="h-44 w-full object-cover" />

              <div className="space-y-1 p-4">
                <h3 className="line-clamp-2 font-semibold">{campaign.title}</h3>

                <p className="text-sm text-gray-500">
                  Goal: ₦{Number(campaign.goal).toLocaleString()}
                </p>

                <p className="text-sm font-medium text-primary">
                  Raised: ₦{Number(campaign.raisedAmount || 0).toLocaleString()}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* ========================= */}
      {/* Campaign Modal */}
      {/* ========================= */}

      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}

          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedCampaign(null)} />

          {/* modal */}

          <div className="animate-slideUp relative max-h-[80vh] w-[600px] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <button onClick={() => setSelectedCampaign(null)} className="absolute right-4 top-4">
              <Icon icon="solar:close-circle-bold" width={24} />
            </button>

            <img
              src={
                selectedCampaign.thumbnail_large
                  ? `https://fundraise.theinnercitymission.ngo/${selectedCampaign.thumbnail_large}`
                  : selectedCampaign.thumbnail?.url
              }
              className="mb-4 h-56 w-full rounded-xl object-cover"
            />

            <h2 className="mb-2 text-2xl font-bold">{selectedCampaign.title}</h2>

            <p className="mb-4 text-gray-500">{selectedCampaign.excerpt}</p>

            {/* campaign stats */}

            <div className="mb-6 grid grid-cols-3 gap-4">
              <MiniStat label="Goal" value={`₦${Number(selectedCampaign.goal).toLocaleString()}`} />

              <MiniStat
                label="Raised"
                value={`₦${Number(selectedCampaign.raisedAmount || 0).toLocaleString()}`}
              />

              <MiniStat label="Donors" value={selectedCampaign.donorCount || 0} />
            </div>

            {/* donors placeholder */}

            <div className="rounded-xl border p-4">
              <h3 className="mb-3 font-semibold">Donors</h3>

              <p className="text-sm text-gray-500">Donor list will appear here</p>
            </div>

            {/* edit button */}

            <button className="mt-6 w-full rounded-lg bg-primary py-2 text-white">
              Edit Campaign
            </button>
          </div>

          <style jsx>{`
            .animate-slideUp {
              animation: slideUp 0.25s ease-out forwards;
            }

            @keyframes slideUp {
              from {
                transform: translateY(40px);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}

/* ========================= */
/* UI Components */
/* ========================= */

function StatCard({ icon, label, value }: { icon: string; label: string; value: any }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-white p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Icon icon={icon} />
      </div>

      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-lg border p-3 text-center">
      <p className="text-xs text-gray-500">{label}</p>

      <p className="font-semibold">{value}</p>
    </div>
  )
}

///* eslint-disable jsx-a11y/alt-text */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'

// import { useEffect, useState } from 'react'
// import { baseUrl } from '@/constants'
// import { useRouter } from 'next/navigation'

// export default function UserCampaignsPage() {
//   const [campaigns, setCampaigns] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)

//   const router = useRouter()

//   useEffect(() => {
//     const fetchUserCampaigns = async () => {
//       try {
//         /* GET USER FROM SESSION */

//         const stored = sessionStorage.getItem('course-training-profile')

//         const parsed = stored ? JSON.parse(stored) : null

//         const userId = parsed?.user?.id

//         if (!userId) {
//           setCampaigns([])
//           return
//         }

//         /* FETCH CAMPAIGNS */

//         const res = await fetch(`${baseUrl}/campaigns`)

//         const json = await res.json()

//         console.log('Campaigns API:', json)

//         /* SAFE ARRAY EXTRACTION */

//         const campaignsArray = json?.data?.data || json?.data || json || []

//         /* FILTER USER CAMPAIGNS */

//         const userCampaigns = Array.isArray(campaignsArray)
//           ? campaignsArray.filter((c: any) => String(c.user?.id) === String(userId))
//           : []

//         setCampaigns(userCampaigns)
//       } catch (err) {
//         console.error(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchUserCampaigns()
//   }, [])

//   return (
//     <div className="space-y-6 p-6">
//       <h1 className="text-2xl font-bold">My Campaigns</h1>

//       {loading && <p className="text-gray-500">Loading campaigns...</p>}

//       {!loading && campaigns.length === 0 && (
//         <div className="flex flex-col items-center justify-center py-20 text-center">
//           <h3 className="text-lg font-semibold">No created campaigns</h3>

//           <p className="mt-1 text-gray-500">You haven&apos;t created any campaign yet</p>

//           <button
//             onClick={() => router.push('/create-campaign')}
//             className="mt-4 rounded-lg bg-primary px-4 py-2 text-white"
//           >
//             Create Campaign
//           </button>
//         </div>
//       )}

//       <div className="grid gap-6 md:grid-cols-3">
//         {campaigns.map((campaign) => {
//           const banner = campaign.thumbnail_large
//             ? `https://fundraise.theinnercitymission.ngo/${campaign.thumbnail_large}`
//             : campaign.thumbnail?.url

//           return (
//             <div
//               key={campaign.id}
//               onClick={() => router.push(`/profile/campaigns/${campaign.id}`)}
//               className="cursor-pointer overflow-hidden rounded-xl border transition hover:shadow-lg"
//             >
//               <img src={banner} className="h-48 w-full object-cover" />

//               <div className="p-4">
//                 <h3 className="line-clamp-2 text-lg font-semibold">{campaign.title}</h3>

//                 <p className="mt-1 text-sm text-gray-500">
//                   Goal: ₦{Number(campaign.goal).toLocaleString()}
//                 </p>

//                 <p className="mt-1 text-sm font-medium text-primary">
//                   Raised: ₦{Number(campaign.raisedAmount || 0).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }
