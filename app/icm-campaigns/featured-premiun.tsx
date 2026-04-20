/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Icon } from '@iconify/react'

export default function FeaturedSleekCard({ campaign }: { campaign: any }) {
  const image = campaign.thumbnail_large
    ? `https://fundraise.theinnercitymission.ngo/${campaign.thumbnail_large}`
    : campaign.thumbnail?.url || '/placeholder.jpg'

  const progress = Math.min(((campaign.raised || 0) / (campaign.goal || 1)) * 100, 100)

  // 🪄 Senior Motion: Smooth Tilt Logic
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="group relative"
    >
      {/* 💎 The Glass Container */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.12)]">
        
        {/* MEDIA BOX */}
        <Link href={`/campaigns/${campaign.id}`} className="relative block aspect-[16/10] overflow-hidden rounded-[2rem] bg-gray-100">
          <motion.img
            src={image}
            alt={campaign.title}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          
          {/* Subtle Dynamic Light Overlays */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 opacity-60" />
          
          {/* Top Info Bar */}
          <div className="absolute inset-x-4 top-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 rounded-full bg-black/20 px-3 py-1.5 backdrop-blur-md border border-white/10">
              <Icon icon="solar:star-bold" className="text-amber-400" width={12} />
              <span className="text-[9px] font-black uppercase tracking-[0.1em] text-white">Featured</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Icon icon="solar:magnifer-zoom-in-linear" width={16} />
            </div>
          </div>

          {/* Bottom Funding Pulse */}
          <div className="absolute bottom-4 left-4">
             <div className="flex items-center gap-2 rounded-xl bg-white/90 p-2 pr-4 shadow-xl backdrop-blur-md">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Icon icon="solar:graph-up-bold" width={18} />
                </div>
                <div>
                    <p className="text-[8px] font-black uppercase tracking-tighter text-gray-400">Raised</p>
                    <p className="text-xs font-black text-gray-900">₦{Number(campaign.raised).toLocaleString()}</p>
                </div>
             </div>
          </div>
        </Link>

        {/* DETAILS SECTION */}
        <div className="p-5 pb-2">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
                    {campaign.category?.name || 'InnerCity Mission'}
                </p>
                <Link href={`/campaigns/${campaign.id}`}>
                    <h3 className="text-lg font-black leading-tight tracking-tight text-gray-950 line-clamp-1 group-hover:text-primary transition-colors">
                        {campaign.title}
                    </h3>
                </Link>
            </div>
          </div>

          {/* ⚡ Senior Level Progress UI */}
          <div className="mt-6 flex items-center gap-4">
             <div className="relative flex-1">
                {/* Track */}
                <div className="h-[6px] w-full rounded-full bg-gray-50 overflow-hidden border border-gray-100/50">
                    {/* Progress Fill */}
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress}%` }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full"
                    />
                </div>
             </div>
             <span className="text-sm font-black text-gray-950 tabular-nums">{Math.round(progress)}%</span>
          </div>

          {/* FOOTER */}
          <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
             <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gray-100 overflow-hidden ring-2 ring-white">
                   <img src={`https://fundraise.theinnercitymission.ngo/${campaign.user?.avatar}`} className="h-full w-full object-cover" />
                </div>
                <p className="text-[10px] font-bold text-gray-400">By <span className="text-gray-900">{campaign.user?.fullname}</span></p>
             </div>
             
             <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary transition-transform group-hover:translate-x-1">
                Support <Icon icon="solar:alt-arrow-right-bold" />
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}