'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import PercentageBar from '@/components/percentage-bar'
import PercentageCircle from '@/components/percentage-circle'
import TopNavbar from '@/layouts/topnavbar'
import { Campaign } from '@/types/Campaign'
import Image from 'next/image'

interface Props {
  campaign: Campaign
  progress: number
  goal: number
  raised: number
  mobile?: boolean
}

type TUser = {
  id?: number
  fullname?: string
  username?: string
  email?: string
  avatar?: string
  photo?: string
  admin?: boolean | number
}

export default function CampaignDetailsClient({ campaign, progress, goal, raised, mobile }: Props) {
  const [showShare, setShowShare] = useState(false)
  const [email, setEmail] = useState('')
  const [copied, setCopied] = useState(false)
  const [user, setUser] = useState<TUser | null>(null)
  console.log(setEmail)
  const image = campaign.thumbnail_large
    ? `https://fundraise.theinnercitymission.ngo/${campaign.thumbnail_large}`
    : campaign.thumbnail?.url || '/placeholder.jpg'

  const avatar = campaign.user?.avatar
    ? `https://fundraise.theinnercitymission.ngo/${campaign.user?.avatar}`
    : campaign.thumbnail?.url
  console.log(avatar)
  const campaignUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/campaigns/${campaign.id}` : ''

  const handleCopy = async () => {
    await navigator.clipboard.writeText(campaignUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Support: ${campaign.title}`)
    const body = encodeURIComponent(`${campaign.title}\n${campaignUrl}`)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  console.log(handleSendEmail)

    const loadUserData = useCallback(() => {
    const stored =
      localStorage.getItem('course-training-profile') ||
      sessionStorage.getItem('course-training-profile')

    if (!stored) return

    try {
      if (!stored.startsWith('{')) return

      const parsed = JSON.parse(stored)
      const userData = parsed.user || parsed
      const isAdmin = userData.admin === true || userData.admin === 1

      setUser({ ...userData, admin: isAdmin })
    } catch (error) {
      console.error('Failed to parse user session:', error)
    }
  }, [])

  useEffect(() => {
    // Initial load
    loadUserData()

    // Listen for changes made in other components (like GlassProfile)
    window.addEventListener('storage', loadUserData)
    
    // Custom event listener for same-window updates
    window.addEventListener('profileUpdate', loadUserData)

    return () => {
      window.removeEventListener('storage', loadUserData)
      window.removeEventListener('profileUpdate', loadUserData)
    }
  }, [loadUserData])

  const getInitials = (name?: string) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0][0].toUpperCase()
    return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase()
  }

  const displayName = user?.fullname || user?.username || 'User'

  return (
    <div className="bg-white text-black dark:bg-neutral-950 dark:text-white">
      <TopNavbar />
      <div className="container grid-cols-10 p-4 md:grid md:h-screen md:space-x-10">
        <section className="col-span-6 h-[180vh] overflow-y-auto no-scrollbar md:h-auto">
          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative mb-6 overflow-hidden rounded-xl"
          >
            <Image
              width={400}
              height={400}
              unoptimized
              src={image}
              alt={campaign.title}
              className="h-auto max-h-[420px] w-full object-cover"
            />
          </motion.div>

          <h1 className="mb-3 text-2xl font-semibold md:text-3xl">{campaign.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1 text-primary">
              <Icon icon="mdi:tag" /> {campaign.user?.location || 'General'}
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="mdi:account" /> {campaign.user?.fullname || 'Anonymous'}
            </div>
          </div>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
            {campaign.excerpt}
          </div>
        </section>

        <div className="fixed bottom-6 w-11/12 rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5 md:relative md:top-0 md:col-span-4 md:w-full">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <PercentageCircle progress={progress} />
              <div>
                <p className="text-lg font-semibold">${raised.toLocaleString()}</p>
                <p className="text-xs text-gray-500">of ${goal.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <PercentageBar value={progress} />
            <p className="mt-1 text-xs text-gray-500">{progress}% funded</p>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              href={`/campaigns/${campaign.id}/donate`}
              className="block w-full rounded-xl bg-primary py-3 text-center text-sm font-semibold text-white"
            >
              Donate now
            </Link>
            <button
              onClick={() => setShowShare(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm"
            >
              <Icon icon="solar:share-bold" /> Share campaign
            </button>
          </div>

          {/* CREATOR */}
          <div className="mt-6 hidden items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-white/5 md:flex">
            {user?.avatar || user?.photo ? (
          <img
            src={user.avatar || user.photo}
            alt={user.fullname || 'User avatar'}
            // Added aspect-square and flex-shrink-0 to prevent squashing
            className={`aspect-square flex-shrink-0 rounded-full border border-gray-200 object-cover ${mobile ? 'h-10 w-10' : 'h-10 w-10'}`}
          />
        ) : (
          <div
            className={`relative flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-gray-500 font-semibold text-white shadow-md flex-shrink-0 ${mobile ? 'h-8 w-8 text-sm' : 'h-10 w-10 text-xs'}`}
          >
            <span className="animate-shine absolute inset-0 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)]"></span>
            {getInitials(displayName)}
          </div>
        )}
            <div>
              <p className="text-sm font-semibold">{campaign.user?.fullname}</p>
              <p className="text-xs text-gray-500">Campaign creator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal Logic stays here... */}
      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          {/* ... modal content ... */}
          <div className="w-full max-w-md rounded-2xl bg-white p-6 dark:bg-neutral-900">
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
          </div>
        </div>
      )}
    </div>
  )
}
