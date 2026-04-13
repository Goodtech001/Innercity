'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRouter } from 'next/navigation'
import DonationFlow from '../donation-flow'
import HeroCardStack from '@/components/hero-card-stack'
// import DonationFlow from '@/components/donation-flow'

export default function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const router = useRouter()

  const handleClick = () => {
    const stored = sessionStorage.getItem('course-training-profile')
    const parsed = stored ? JSON.parse(stored) : null
    const token = parsed?.token

    if (!token) return router.push('/sign-up')
    router.push('/campaigns/create')
  }

  return (
    <main className="relative overflow-hidden bg-[#F8FAFC]">

      {/* SOFT GRADIENT BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[400px] w-[400px] bg-blue-200/40 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] bg-indigo-200/40 blur-3xl rounded-full" />
      </div>

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div
        ref={ref}
        className="relative container mx-auto grid md:grid-cols-2  gap-12 py-20 md:py-28"
      >
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-gray-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Live donations happening now
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-gray-900">
            Where generosity becomes{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              real impact
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-gray-600 text-base md:text-lg">
            Every second, people are giving. Our system ensures every donation
            flows seamlessly to those who need it most.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={handleClick}
              className="relative overflow-hidden rounded-xl px-6 py-3 font-medium bg-black text-white hover:scale-[1.02] active:scale-95 transition"
            >
              Start a campaign
            </button>

            <Link
              href="/campaigns"
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
            >
              Explore campaigns
            </Link>
          </div>

          {/* TRUST */}
          <div className="mt-10 flex items-center gap-8 text-sm text-gray-500">
            <div>
              <p className="text-gray-900 font-semibold">10K+</p>
              Campaigns
            </div>
            <div>
              <p className="text-gray-900 font-semibold">$2M+</p>
              Raised
            </div>
            <div>
              <p className="text-gray-900 font-semibold">98%</p>
              Success rate
            </div>
          </div>
        </motion.div>

        {/* RIGHT — LIVE SYSTEM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="relativ mt-14"
        >
          {/* <DonationFlow /> */}
          <HeroCardStack />
        </motion.div>
      </div>
    </main>
  )
}