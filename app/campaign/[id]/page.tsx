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
