/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState, useMemo } from 'react'
import { baseUrl } from '@/constants'
import { Icon } from '@iconify/react'

export default function UserCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
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

        setCampaigns(userCampaigns)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  // 🎯 Combine funders and payments for stats
  const stats = useMemo(() => {
    return campaigns.reduce((acc, c) => {
      acc.totalCampaigns += 1;
      acc.totalRaised += Number(c.raised || 0);
      
      const uniqueDonors = new Set([
        ...(c.funders || []).map((f: any) => f.user?.id),
        ...(c.payments || []).map((p: any) => p.user?.id)
      ].filter(Boolean));

      acc.totalDonors += uniqueDonors.size || Number(c.donorCount || 0);
      return acc;
    }, { totalCampaigns: 0, totalRaised: 0, totalDonors: 0 });
  }, [campaigns]);

  return (
    <div className="space-y-8 p-6">
      {/* Stats Dashboard */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard icon="mdi:bullhorn" label="My Campaigns" value={stats.totalCampaigns} />
        <StatCard icon="solar:money-bag-bold" label="Total Raised" value={`$${stats.totalRaised.toLocaleString()}`} />
        <StatCard icon="fa:users" label="Total Donors" value={stats.totalDonors} />
      </div>

      {loading && <p className="text-gray-500 animate-pulse text-center py-10">Loading your campaigns...</p>}

      {/* Campaign Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {campaigns.map((campaign) => {
          const banner = campaign.thumbnail_large
            ? `https://fundraise.theinnercitymission.ngo/${campaign.thumbnail_large}`
            : campaign.thumbnail?.url;
          
          const combinedDonors = [...(campaign.funders || []), ...(campaign.payments || [])];

          return (
            <div
              key={campaign.id}
              onClick={() => setSelectedCampaign(campaign)}
              className="group cursor-pointer overflow-hidden rounded-2xl border bg-white transition hover:shadow-xl"
            >
              <div className="relative h-44 w-full">
                <img src={banner} className="h-full w-full object-cover transition group-hover:scale-105" />
                <div className="absolute top-2 right-2 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                   {combinedDonors.length} CONTRIBUTIONS
                </div>
              </div>
              <div className="p-4">
                <h3 className="line-clamp-1 font-bold text-gray-800">{campaign.title}</h3>
                <p className="mt-2 text-xs font-bold text-primary">${Number(campaign.raised).toLocaleString()} raised</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedCampaign(null)} />

          <div className="animate-slideUp relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
            <button onClick={() => setSelectedCampaign(null)} className="absolute right-6 top-6 z-10 rounded-full bg-white/80 p-1">
              <Icon icon="solar:close-circle-bold" width={28} className="text-gray-400" />
            </button>

            <img
              src={selectedCampaign.thumbnail_large ? `https://fundraise.theinnercitymission.ngo/${selectedCampaign.thumbnail_large}` : selectedCampaign.thumbnail?.url}
              className="mb-6 h-60 w-full rounded-2xl object-cover"
            />

            <h2 className="mb-4 text-2xl font-black text-gray-900">{selectedCampaign.title}</h2>

            <div className="mb-8 grid grid-cols-3 gap-4">
              <MiniStat label="Goal" value={`$${Number(selectedCampaign.goal).toLocaleString()}`} />
              <MiniStat label="Raised" value={`$${Number(selectedCampaign.raised || 0).toLocaleString()}`} />
              <MiniStat label="Total Donors" value={[...(selectedCampaign.funders || []), ...(selectedCampaign.payments || [])].length} />
            </div>

            {/* COMBINED DONORS LIST */}
            <div className="rounded-2xl bg-gray-50 p-5">
              <h3 className="mb-4 font-bold text-gray-800">Recent Contributions</h3>
              <div className="space-y-3">
                {(() => {
                  const allDonors = [...(selectedCampaign.funders || []), ...(selectedCampaign.payments || [])]
                    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

                  return allDonors.length > 0 ? (
                    allDonors.map((donor: any, idx: number) => {
                      const user = donor.user;
                      const avatar = user?.avatar 
                        ? `https://fundraise.theinnercitymission.ngo/${user?.avatar}` 
                        : null;

                      return (
                        <div key={idx} className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-100">
                              {avatar ? (
                                <img src={avatar} className="h-full w-full object-cover" />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                                  <Icon icon="solar:user-bold" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-800">{user?.fullname || 'Anonymous'}</p>
                              <p className="text-[10px] text-gray-400 uppercase">{donor.method || donor.payment_channel || 'donation'}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-black text-green-600">${Number(donor.amount).toLocaleString()}</p>
                            <p className={`text-[9px] font-bold uppercase ${donor.status === 'success' ? 'text-blue-500' : 'text-orange-400'}`}>
                              {donor.status || 'completed'}
                            </p>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-center text-sm text-gray-400 py-4">No contributions found.</p>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: any }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon icon={icon} width={24} />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">{label}</p>
        <p className="text-xl font-black text-gray-900">{value}</p>
      </div>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-xl border bg-white p-3 text-center shadow-sm">
      <p className="text-[9px] font-bold uppercase text-gray-400">{label}</p>
      <p className="text-sm font-black text-gray-800">{value}</p>
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
