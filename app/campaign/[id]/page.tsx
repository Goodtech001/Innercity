import React from 'react'
import { notFound } from 'next/navigation'
import campaignsData from '@/json/dummy-campaigns.json'

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
  return <div>Page {id}</div>
}

// import { notFound } from 'next/navigation'

// // 1️⃣ Pre-generate known IDs (optional, for static builds)
// export async function generateStaticParams() {
//   const res = await fetch('https://example.com/api/campaigns')
//   const campaigns = await res.json()

//   return campaigns.map((campaign: any) => ({
//     id: campaign.id.toString(),
//   }))
// }

// // 2️⃣ Type for Next.js v15
// interface CampaignPageProps {
//   params: Promise<{ id: string }>
// }

// // 3️⃣ Server component (no "use client")
// export default async function CampaignDetailsPage({ params }: CampaignPageProps) {
//   const { id } = await params

//   // 4️⃣ Fetch single campaign by ID — directly in server component
//   const res = await fetch(`https://example.com/api/campaigns/${id}`, {
//     // Important: disable caching for dynamic data
//     cache: 'no-store',
//   })

//   if (!res.ok) notFound()

//   const campaign = await res.json()

//   // 5️⃣ Render
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold">{campaign.title}</h1>
//       <p className="mt-2 text-gray-600">{campaign.description}</p>
//     </div>
//   )
// }
