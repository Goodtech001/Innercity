/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import PercentageBar from '@/components/percentage-bar'
import { Campaign } from '@/types/Campaign'
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'
import PercentageCircle from '@/components/percentage-circle'
import TopNavbar from '@/layouts/topnavbar'

const baseUrl = 'https://fundraise-api.onrender.com/api/v1'

export default function CampaignDetailsPage() {
  const params = useParams()
  const id = params?.id

  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)
  const [showShare, setShowShare] = useState(false)
  const [email, setEmail] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await fetch(`${baseUrl}/campaigns/${id}`)
        const data = await res.json()

        setCampaign(data?.data || data)
      } catch (err) {
        console.error('Failed to fetch campaign', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchCampaign()
  }, [id])

  if (loading) return <CampaignDetailsSkeleton />

  if (!campaign) return <div className="p-10">Campaign not found</div>

  const image = campaign.thumbnail_large
    ? `https://fundraise.theinnercitymission.ngo/${campaign.thumbnail_large}`
    : campaign.thumbnail?.url

  const avatar = campaign.user?.avatar
    ? `https://fundraise.theinnercitymission.ngo/${campaign.user?.avatar}`
    : campaign.thumbnail?.url

  const goal = Number(campaign.goal || 0)
  const raised = Number(campaign.raised || 0)

  const progress = goal > 0 ? Math.min(Math.round((raised / goal) * 100), 100) : 0

  const campaignUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/campaigns/${campaign.id}` : ''

  const handleCopy = async () => {
    await navigator.clipboard.writeText(campaignUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: campaign.title,
          text: campaign.excerpt,
          url: campaignUrl,
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Support this campaign: ${campaign.title}`)
    const body = encodeURIComponent(
      `Hi,\n\nI found this campaign and thought you might like to support it:\n\n${campaign.title}\n${campaignUrl}`,
    )

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  return (
    //

    <div>
      <TopNavbar />
      {/* <div className='container ml-auto'>
            <button onClick={() => router.back()} className="text-white rounded bg-red-200 p-2 mt-5 ">
        ← Back
      </button>
         </div> */}

      <div className="container h-[118vh] grid-cols-10 p-4 md:grid md:h-screen md:space-x-10">
        <section className="col-span-6 h-[180vh] overflow-y-auto no-scrollbar md:h-auto">
          <img
            src={image as string}
            alt={campaign.title}
            className="mb-6 h-auto max-h-[400px] w-full rounded-lg object-cover object-top"
          />

          <h1 className="title mb-4 text-2xl font-semibold text-black">{campaign.title}</h1>

          <div className="md:flex md:space-x-6">
            <div className="flex font-bold text-primary">
              <Icon icon={'mdi:tag'} className="mt-1" />
              <p>Send Children Back to School</p>
            </div>
            <div className="flex font-bold text-primary">
              <Icon icon={'mdi:location'} className="mt-1" />
              <p>Lagos, Nigeria</p>
            </div>
          </div>
          <div className="mt-4 flex gap-1">
            <span className="font-bold text-primary">{campaign.user?.fullname || 'Anonymous'}</span>{' '}
            <p className="mt text-base">Created this campaign</p>
          </div>
          <p className="mt-5 border-t border-textcolor text-gray-700"></p>
          <p className="mt-4 space-y-4">{campaign.excerpt}</p>
        </section>

        {/* LIVE CAMPAIGN PROGRESS */}

        <div className="fixed bottom-10 w-11/12 rounded-md border bg-blue-200 p-2 md:relative md:top-0 md:col-span-4 md:w-full md:bg-white">
          <div className="flex w-full justify-between border-b border-textcolor">
            <div className="mb-3 flex gap-3">
              <PercentageCircle progress={progress} />

              <div className="mt-2">
                <span className="flex w-full justify-between">
                  <p className="text-[15px] font-bold text-black">
                    <strong>${raised.toLocaleString()} Raised</strong>
                  </p>
                </span>

                <p className="md:mt-2"> 0+ Donors</p>
              </div>
            </div>

            <Icon
              icon="solar:bookmark-bold"
              width="24"
              height="24"
              className="ml-16 mt-2 text-primary md:ml-0"
            />
          </div>

          <div className="mt-4 flex gap-4">
            <p>
              <strong>Goal:</strong>
              <span className="text-primary">
                <strong>${goal.toLocaleString()}</strong>
              </span>
            </p>

            <p>•</p>

            <p className="font-bold">End Date: {campaign.period || '22 Sept 2026'}</p>
          </div>

          <div className="mt-8 flex space-x-4 md:block md:space-x-0 md:space-y-3">
            <Link href={`/campaigns/${campaign.id}/donate`} className="btn-primary w-full gap-1">
              Donate
            </Link>

            <button
              onClick={() => setShowShare(true)}
              className="btn-white flex w-full items-center justify-center gap-1 truncate"
            >
              <Icon icon="solar:share-bold" width="18" />
              Share campaign
            </button>
          </div>

          <div className="mt-10 hidden w-full gap-2 rounded-xl border bg-[#0074E626] p-3 md:flex">
            <Image
              src={avatar as string}
              alt=""
              height={34}
              width={34}
              className="h-[50px] w-[50px] rounded-full object-cover"
            />

            <div>
              <span className="font-bold text-black">{campaign.user?.fullname}</span>
              <p className="text-black">Joined on: {campaign.user?.created_at}</p>
            </div>
          </div>
        </div>
      </div>

      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
          <div className="animate-in fade-in zoom-in w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl duration-300">
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
                <Icon icon="solar:share-bold" width="20" />
                Share Campaign
              </h2>

              <button
                onClick={() => setShowShare(false)}
                className="rounded-full p-1 transition hover:bg-gray-100"
              >
                <Icon icon="solar:close-circle-bold" width="24" />
              </button>
            </div>

            {/* CAMPAIGN PREVIEW */}
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-gray-50 p-3">
              <img src={image as string} className="h-14 w-14 rounded-lg object-cover" alt="" />

              <div>
                <p className="line-clamp-1 text-sm font-semibold text-black">{campaign.title}</p>
                <p className="text-xs text-gray-500">by {campaign.user?.fullname || 'Anonymous'}</p>
              </div>
            </div>

            {/* COPY LINK */}
            <div className="mb-6 flex items-center gap-2 rounded-xl border p-2">
              <Icon icon="solar:link-bold" width="18" className="text-gray-400" />

              <input
                value={campaignUrl}
                readOnly
                className="flex-1 bg-transparent text-sm outline-none"
              />

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-sm text-white transition hover:scale-105"
              >
                <Icon icon="solar:copy-bold" width="16" />
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            {/* SHARE OPTIONS */}
            <p className="mb-3 text-sm font-semibold text-gray-700">Share to</p>

            <div className="mb-6 grid grid-cols-4 gap-3">
              <a href={`https://wa.me/?text=${campaignUrl}`} target="_blank" className="share-card">
                <Icon icon="logos:whatsapp-icon" width="28" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${campaignUrl}`}
                target="_blank"
                className="share-card"
              >
                <Icon icon="logos:twitter" width="26" />
                <span>Twitter</span>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${campaignUrl}`}
                target="_blank"
                className="share-card"
              >
                <Icon icon="logos:facebook" width="26" />
                <span>Facebook</span>
              </a>

              <button onClick={handleNativeShare} className="share-card">
                <Icon icon="solar:share-bold" width="26" />
                <span>More</span>
              </button>
            </div>

            {/* EMAIL */}
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-700">Send via email</p>

              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="friend@email.com"
                  className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  onClick={handleSendEmail}
                  className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:scale-105"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CampaignDetailsSkeleton() {
  return (
    <div className="container h-[118vh] animate-pulse grid-cols-10 p-4 md:grid md:h-screen md:space-x-10">
      {/* LEFT CONTENT */}
      <section className="col-span-6">
        <div className="mb-6 h-[400px] w-full rounded-lg bg-gray-200"></div>

        <div className="mb-4 h-8 w-3/4 rounded bg-gray-200"></div>

        <div className="flex gap-6">
          <div className="h-4 w-32 rounded bg-gray-200"></div>
          <div className="h-4 w-32 rounded bg-gray-200"></div>
        </div>

        <div className="mt-4 h-4 w-48 rounded bg-gray-200"></div>

        <div className="mt-6 space-y-3">
          <div className="h-4 w-full rounded bg-gray-200"></div>
          <div className="h-4 w-full rounded bg-gray-200"></div>
          <div className="h-4 w-5/6 rounded bg-gray-200"></div>
          <div className="h-4 w-2/3 rounded bg-gray-200"></div>
        </div>
      </section>

      {/* RIGHT PANEL */}
      <div className="mt-10 rounded-md border p-4 md:col-span-4 md:mt-0">
        <div className="mb-4 flex gap-3">
          <div className="h-12 w-12 rounded-full bg-gray-200"></div>
          <div>
            <div className="mb-2 h-4 w-32 rounded bg-gray-200"></div>
            <div className="h-4 w-24 rounded bg-gray-200"></div>
          </div>
        </div>

        <div className="mb-3 h-4 w-40 rounded bg-gray-200"></div>
        <div className="mb-6 h-4 w-32 rounded bg-gray-200"></div>

        <div className="space-y-3">
          <div className="h-10 w-full rounded bg-gray-200"></div>
          <div className="h-10 w-full rounded bg-gray-200"></div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gray-200"></div>
          <div>
            <div className="mb-2 h-4 w-32 rounded bg-gray-200"></div>
            <div className="h-4 w-24 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
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
