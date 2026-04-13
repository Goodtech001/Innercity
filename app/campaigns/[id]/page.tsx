import { Campaign } from '@/types/Campaign'
import { calculateProgress } from '@/utils/percentage'
import CampaignDetailsClient from './campaign-details-client'

const baseUrl = 'https://fundraise-api.onrender.com/api/v1'

// 1. Tell Next.js which paths to pre-render
export async function generateStaticParams() {
  const res = await fetch(`${baseUrl}/campaigns`)
  const result = await res.json()

  // Assuming the API returns an array in data or the body itself
  const campaigns: Campaign[] = result?.data || result || []

  return campaigns.map((campaign) => ({
    id: campaign.id.toString(),
  }))
}

// 2. Fetch the specific campaign data on the server
async function getCampaign(id: string) {
  const res = await fetch(`${baseUrl}/campaigns/${id}`, {
    next: { revalidate: 60 }, // Refresh data every 60 seconds
  })

  if (!res.ok) return null
  const data = await res.json()
  return data?.data || data
}

export default async function Page({ params }: { params: { id: string } }) {
  const campaign: Campaign | null = await getCampaign(params.id)

  if (!campaign) return <CampaignDetailsSkeleton />

  if (!campaign?.id) {
    return <div className="p-10 text-center">Campaign not found</div>
  }

  // Pre-calculate progress on server
  const goal = Number(campaign.goal || 0)
  const raised = Number(campaign.raised || 0)
  const progress = calculateProgress(raised, goal)

  return (
    <CampaignDetailsClient campaign={campaign} progress={progress} goal={goal} raised={raised} />
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
