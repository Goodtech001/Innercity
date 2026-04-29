/* eslint-disable @typescript-eslint/no-explicit-any */
import { Campaign } from '@/types/Campaign'
// import CampaignDetailsClient from './CampaignDetailsClient'
import { calculateProgress } from '@/utils/percentage'
import CampaignDetailsClient from './campaign-details-client'
import { baseUrl } from '@/constants'

// const baseUrl = 'https://fundraise-api.onrender.com/api/v1'

// 1. generateStaticParams does NOT need to await params (it's the generator)
export async function generateStaticParams() {
  try {
    const res = await fetch(`${baseUrl}/campaigns`, {
      cache: 'no-store', // or 'force-cache' if you want SSG caching
    })

    const json = await res.json()

    // ✅ SAFE EXTRACTION
    const campaigns =
      Array.isArray(json) ? json :
      Array.isArray(json?.data) ? json.data :
      Array.isArray(json?.data?.campaigns) ? json.data.campaigns :
      []

    return campaigns.map((campaign: any) => ({
      id: campaign.id.toString(),
    }))
  } catch (err) {
    console.error('generateStaticParams error:', err)
    return [] // ✅ prevents build crash
  }
}

// Helper fetch function
async function getCampaign(id: string) {
  const res = await fetch(`${baseUrl}/campaigns/${id}`, {
    next: { revalidate: 60 } 
  })
  
  if (!res.ok) return null
  const data = await res.json()
  return data?.data || data
}

// 2. Update the PageProps type and await the params
interface PageProps {
  params: Promise<{ id: string }> // Params is now a Promise in Next.js 15
}

export default async function Page({ params }: PageProps) {
  // ✅ This is the critical fix: Await the params promise
  const resolvedParams = await params 
  const id = resolvedParams.id

  const campaign: Campaign | null = await getCampaign(id)
   if (!campaign) return <CampaignDetailsSkeleton />

  if (!campaign) {
    return <div className="p-10 text-center text-xl font-bold">Campaign not found</div>
  }

  const goal = Number(campaign.goal || 0)
  const raised = Number(campaign.raised || 0)
  const progress = calculateProgress(raised, goal)

  return (
    <CampaignDetailsClient 
      campaign={campaign} 
      progress={progress} 
      goal={goal} 
      raised={raised} 
    />
  )
}
function CampaignDetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-6">
      <div className="h-[300px] rounded-xl bg-gray-200" />
      <div className="h-6 w-1/2 bg-gray-200" />
      <div className="h-4 w-full bg-gray-200" />
    </div>
  )
}
