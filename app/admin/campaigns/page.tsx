/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { baseUrl } from "@/constants"

export default function AdminCampaignsPage() {

  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

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
      console.error("Campaign fetch error:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCampaigns = campaigns.filter((c) =>
    c.title?.toLowerCase().includes(search.toLowerCase())
  )

  const getStatus = (campaign: any) => {

    const now = new Date()
    const end = new Date(campaign.period)

    if (campaign.raised >= campaign.goal) return "Completed"
    if (end < now) return "Expired"

    return "Active"
  }

  return (
    <div className="p-8">

      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between">

        <h1 className="text-2xl font-bold">
          Campaign Dashboard
        </h1>

        <input
          placeholder="Search campaigns..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md text-sm"
        />

      </div>

      {loading ? (
        <p>Loading campaigns...</p>
      ) : (

        <div className="overflow-x-auto rounded-lg border">

          <table className="w-full text-sm">

            <thead className="bg-gray-100 text-left">

              <tr className="font-semibold">

                <th className="p-4">Campaign</th>
                <th className="p-4">Goal</th>
                <th className="p-4">Raised</th>
                <th className="p-4">Donors</th>
                <th className="p-4">Progress</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredCampaigns.map((campaign) => {

                const raised = campaign.raised || 0
                const goal = campaign.goal || 1

                const progress = Math.min(
                  Math.round((raised / goal) * 100),
                  100
                )

                const status = getStatus(campaign)

                return (

                  <tr
                    key={campaign.id}
                    className="border-t hover:bg-gray-50"
                  >

                    {/* CAMPAIGN */}

                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        <img
                          src={campaign.ecard_image || campaign.campaign_image}
                          className="h-12 w-16 rounded object-cover"
                          alt=""
                        />

                        <div>

                          <p className="font-semibold">
                            {campaign.title}
                          </p>

                          <p className="text-xs text-gray-500">
                            {campaign.category?.name || "No category"}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* GOAL */}

                    <td className="p-4">
                      ${goal.toLocaleString()}
                    </td>

                    {/* RAISED */}

                    <td className="p-4">
                      ${raised.toLocaleString()}
                    </td>

                    {/* DONORS */}

                    <td className="p-4">
                      {campaign.donor_count || 0}
                    </td>

                    {/* PROGRESS */}

                    <td className="p-4 w-60">

                      <div className="w-full bg-gray-200 h-2 rounded">

                        <div
                          className="bg-green-500 h-2 rounded"
                          style={{ width: `${progress}%` }}
                        />

                      </div>

                      <p className="text-xs mt-1">
                        {progress}%
                      </p>

                    </td>

                    {/* STATUS */}

                    <td className="p-4">

                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold
                        ${
                          status === "Active"
                            ? "bg-green-100 text-green-700"
                            : status === "Completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {status}
                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td className="p-4">

                      <div className="flex gap-2">

                        <button className="px-3 py-1 text-xs bg-gray-200 rounded">
                          View
                        </button>

                        <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded">
                          Edit
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              })}

            </tbody>

          </table>

        </div>

      )}

    </div>
  )
}