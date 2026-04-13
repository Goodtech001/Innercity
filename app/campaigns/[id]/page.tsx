/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import PercentageBar from '@/components/percentage-bar'
import { Campaign } from '@/types/Campaign'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import PercentageCircle from '@/components/percentage-circle'
import TopNavbar from '@/layouts/topnavbar'
import { motion } from 'framer-motion'
import { calculateProgress } from '@/utils/percentage'
// import { log } from 'console'

const baseUrl = 'https://fundraise-api.onrender.com/api/v1'
export const dynamic = 'force-dynamic';

export default function CampaignDetailsPage() {
  const params = useParams()
  const id = params?.id
  const campaignId = Array.isArray(id) ? id[0] : id

  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)
  const [showShare, setShowShare] = useState(false)
  const [email, setEmail] = useState('')
  const [copied, setCopied] = useState(false)
  

  useEffect(() => {
    if (!campaignId) return

    const fetchCampaign = async () => {
      try {
        const res = await fetch(`${baseUrl}/campaigns/${campaignId}`)
        const data = await res.json()
        setCampaign(data?.data || data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaign()
  }, [campaignId])

  if (loading) return <CampaignDetailsSkeleton />
  if (!campaign) return <div className="p-10">Campaign not found</div>

  const image = campaign.thumbnail_large
    ? `https://fundraise.theinnercitymission.ngo/${campaign.thumbnail_large}`
    : campaign.thumbnail?.url || '/placeholder.jpg'

  const avatar = campaign.user?.avatar
    ? `https://fundraise.theinnercitymission.ngo/${campaign.user?.avatar}`
    : campaign.thumbnail?.url

  const goal = Number(campaign.goal || 0)
  const raised = Number(campaign.raised || 0)
 const progress = calculateProgress(raised, goal);
 console.log(progress);
 console.log(campaign);
 
 

  const campaignUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/campaigns/${campaign.id}` : ''

  const handleCopy = async () => {
    await navigator.clipboard.writeText(campaignUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: campaign.title,
        text: campaign.excerpt,
        url: campaignUrl,
      })
    }
  }

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Support: ${campaign.title}`)
    const body = encodeURIComponent(`${campaign.title}\n${campaignUrl}`)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="bg-white text-black dark:bg-neutral-950 dark:text-white">
      <TopNavbar />

      <div className="container grid-cols-10 p-4 md:grid md:h-screen md:space-x-10">
        {/* LEFT */}
        <section className="col-span-6 h-[180vh] overflow-y-auto no-scrollbar md:h-auto">
          {/* IMAGE */}
          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative mb-6 overflow-hidden rounded-xl"
          >
            <img
              src={image}
              alt={campaign.title}
              className="h-auto max-h-[420px] w-full object-cover transition duration-700 hover:scale-[1.03]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          {/* TITLE */}
          <h1 className="mb-3 text-2xl font-semibold tracking-tight md:text-3xl">
            {campaign.title}
          </h1>

          {/* META */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1 text-primary">
              <Icon icon="mdi:tag" />
              {campaign.category?.name || 'General'}
            </div>

            <div className="flex items-center gap-1">
              <Icon icon="mdi:account" />
              {campaign.user?.fullname || 'Anonymous'}
            </div>
          </div>

          {/* STORY */}
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
            {campaign.excerpt}
          </div>
        </section>

        {/* RIGHT PANEL */}
        <div className="fixed bottom-6 w-11/12 rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5 md:relative md:top-0 md:col-span-4 md:w-full">
          {/* PROGRESS HEADER */}
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <PercentageCircle progress={progress} />

              <div>
                <p className="text-lg font-semibold">${raised.toLocaleString()}</p>
                <p className="text-xs text-gray-500">of ${goal.toLocaleString()}</p>
              </div>
            </div>

            <Icon
              icon="solar:bookmark-bold"
              className="cursor-pointer text-xl text-primary transition hover:scale-110"
            />
          </div>

          {/* PROGRESS BAR */}
          <div className="mt-4">
            <PercentageBar value={progress} />
            <p className="mt-1 text-xs text-gray-500">{progress}% funded</p>
          </div>

          {/* DETAILS */}
          <div className="mt-4 flex items-center gap-3 text-sm">
            <span>
              Goal: <strong>${goal.toLocaleString()}</strong>
            </span>
            <span>•</span>
            <p className=" text-sm text-zinc-500">
              Ends on:{' '}
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                {campaign.period
                  ? new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                    }).format(new Date(campaign.period))
                  : 'No end date'}
              </span>
            </p>
          </div>

          {/* CTA */}
          <div className="mt-6 space-y-3">
            <Link
              href={`/campaigns/${campaign.id}/donate`}
              className="block w-full rounded-xl bg-primary py-3 text-center text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
            >
              Donate now
            </Link>

            <button
              onClick={() => setShowShare(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm transition hover:bg-gray-50 dark:hover:bg-white/10"
            >
              <Icon icon="solar:share-bold" />
              Share campaign
            </button>
          </div>

          {/* CREATOR */}
          <div className="mt-6 hidden items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-white/5 md:flex">
            <Image
              src={avatar as string}
              unoptimized
              alt=""
              height={40}
              width={40}
              className="rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{campaign.user?.fullname}</p>
              <p className="text-xs text-gray-500">Campaign creator</p>
            </div>
          </div>
        </div>
      </div>

      {/* SHARE MODAL */}
      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900">
            <div className="mb-4 flex justify-between">
              <h2 className="font-semibold">Share campaign</h2>
              <button onClick={() => setShowShare(false)}>✕</button>
            </div>

            <div className="flex items-center gap-2 rounded-lg border p-2">
              <input
                value={campaignUrl}
                readOnly
                className="flex-1 bg-transparent text-sm outline-none"
              />
              <button onClick={handleCopy} className="text-sm text-primary">
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <a href={`https://wa.me/?text=${campaignUrl}`} target="_blank">
                WhatsApp
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${campaignUrl}`} target="_blank">
                Twitter
              </a>
              <a href={`https://facebook.com/sharer/sharer.php?u=${campaignUrl}`} target="_blank">
                Facebook
              </a>
            </div>

            <div className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="email"
                className="flex-1 rounded-lg border p-2 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={handleSendEmail}
                className="rounded-lg bg-primary px-4 text-sm text-white"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
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

// // import { Campaign } from '@/types/Campaign'
// import { notFound } from 'next/navigation'
// // import { use } from 'react'
// import fundraiseCampaignImage from '@/public/assets/images/meal-fund.jpeg'
// import Image from 'next/image'
// import { Icon } from '@iconify/react/dist/iconify.js'
// import PercentageCircle from '@/components/percentage-circle'
// // import me from '@/public/assets/images/me.jpg'
// import TopNavbar from '@/layouts/topnavbar'
// import campaignsData from '@/json/dummy-campaigns.json'
// import { Campaign } from "@/types/Campaign"

// import Link from 'next/link'
// import CampaignLiveProgress from '../live-progress'
// // import { use } from 'react'

// // export const dynamic = 'force-dynamic'
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

// export default async function CampaignDetailsPage({ params }: CampaignPageProps) {
//   const { id } = await params // ✅ await it
//   const post = campaignsData.find((p) => String(p.id) === id)

//   if (!post) notFound()
//   console.log(post)

//   return (

//   )
// }
