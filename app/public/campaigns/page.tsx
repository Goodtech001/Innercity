/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import FundraiseCampaignCard from "@/components/fundraise-campaign-card"
import { baseUrl } from "@/constants"

export default function CampaignListPage() {

  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {

      const res = await fetch(`${baseUrl}/campaigns`)
      const data = await res.json()

      const campaignsArray =
        Array.isArray(data) ? data : data.data || data.campaigns || []

      setCampaigns(campaignsArray)

    } catch (error) {
      console.error("Failed to fetch campaigns:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Loading campaigns...</p>

  return (
    <div className="grid px-14 grid-cols-1 gap-6 md:grid-cols-3">

      {campaigns.map((campaign) => (
        <FundraiseCampaignCard
          key={campaign.id}
          campaign={campaign}
        />
      ))}

    </div>
  )
}