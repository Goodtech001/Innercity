/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Icon } from '@iconify/react'
import { baseUrl } from "@/constants"
// import FeaturedSleekCard from "@/components/FeaturedSleekCard"
import Link from "next/link"
import FeaturedSleekCard from "./featured-premiun"

export default function FeaturedCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${baseUrl}/campaigns`)
        const data = await res.json()
        const featured = (Array.isArray(data) ? data : data.data || []).filter(
          (c: any) => c.featured === true || c.featured === "true"
        )
        setCampaigns(featured)
      } catch (err) { console.error(err) } finally { setLoading(false) }
    }
    fetchFeatured()
  }, [])

  return (
    <div className="relative min-h-screen bg-[#f8fafc] overflow-hidden">
      {/* 🌟 Restored Ambient Glows */}
      <div className="absolute -top-32 left-0 h-[500px] w-[500px] bg-primary/10 blur-[120px] rounded-full opacity-60" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-blue-400/10 blur-[120px] rounded-full opacity-60" />

      {/* 🏛️ Previous Header Style */}
      <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl border-b border-gray-100">
        <nav className="container flex items-center justify-between py-5">
          <Link href="/" className="flex items-center gap-3">
             <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20 text-white">
                <Icon icon="solar:star-bold-duotone" width={20} />
             </div>
             <h1 className="text-lg font-black text-gray-950 tracking-tight">Featured Collections</h1>
          </Link>
          <Link href="/campaigns" className="text-xs font-bold text-gray-500 hover:text-primary transition-colors flex items-center gap-1.5 group uppercase tracking-widest">
             Explore All
             <Icon icon="solar:alt-arrow-right-linear" className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </nav>
      </header>

      <div className="container py-16 relative z-10">
        <div className="max-w-xl mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-blue-100">
              Gold Standard
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter text-gray-950">Curated Impact.</h1>
            <p className="mt-4 text-gray-500 text-sm max-w-sm leading-relaxed">
              Discover our most critical missions, hand-picked for their immediate potential to change lives.
            </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
             {[1,2,3].map(i => <div key={i} className="aspect-video animate-pulse rounded-3xl bg-gray-200/50" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <FeaturedSleekCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}