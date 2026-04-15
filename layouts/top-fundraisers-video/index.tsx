'use client'

import React, { useRef, useState } from 'react'
import VideoPlayer from '@/components/video-player'
import Image, { StaticImageData } from 'next/image'
import { Icon } from '@iconify/react'
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'

// import your existing images
import rita from '@/public/assets/images/rita.jpg'
import difference from '@/public/assets/images/difference.jpg'
import tosin from '@/public/assets/images/Tosin.jpg'
import amaechi from '@/public/assets/images/P-Amaechi.jpg'
import ikeja from '@/public/assets/images/ikeja-campus.jpg'
import sponsor from '@/public/assets/images/sponsor.jpg'
import hungry from '@/public/assets/images/hungry.jpg'
import chuka2 from '@/public/assets/images/chuka2.jpg'

interface VideoItem {
  thumb: StaticImageData
  src: string
  name: string
}

export default function TopFundraisersVideo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-100, 100], [6, -6])
  const rotateY = useTransform(mouseX, [-100, 100], [-6, 6])

  // ✅ ALL your original videos restored + named
  const videos: VideoItem[] = [
    {
      thumb: ikeja,
      src: 'https://vimeo.com/1177794733/612c542466?fl=tl&fe=ec',
      name: 'Ikeja Campus Impact',
    },
    {
      thumb: difference,
      src: 'https://vimeo.com/731472228/709298ca1b?share=copy',
      name: 'Making a Difference',
    },
    {
      thumb: tosin,
      src: 'https://vimeo.com/1010215295/7c79867761',
      name: 'Tosin’s Mission',
    },
    {
      thumb: amaechi,
      src: 'https://player.vimeo.com/video/231560451',
      name: 'Amaechi Story',
    },
    {
      thumb: rita,
      src: 'https://vimeo.com/1037756541/2f13d91b44',
      name: 'Rita Fundraiser',
    },
    {
      thumb: chuka2,
      src: 'https://player.vimeo.com/video/292941519',
      name: 'Chuka Story',
    },
    {
      thumb: hungry,
      src: 'https://player.vimeo.com/video/731472228/?h=709298ca1b',
      name: 'Feeding Program',
    },
    {
      thumb: sponsor,
      src: 'https://vimeo.com/1170952791/5c89a7ca54?share=copy&fl=sv&fe=ci',
      name: 'Sponsor Impact',
    },
    {
      thumb: ikeja,
      src: 'https://vimeo.com/1169079907/7b22336950?share=copy&fl=sv&fe=ci',
      name: 'Campus Outreach',
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const currentVideo = videos[activeIndex]

  return (
    <section className="relative overflow-hidden py-24 bg-[#eaf4ff]">
      {/* LIGHT BLUE AMBIENT SYSTEM */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-300/40 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-300/30 blur-[120px]" />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 80 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="container"
      >
        {/* HEADER */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-800">
            A Living System of Impact
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Every story is a signal. Every donation creates motion.
          </p>
        </div>

        {/* CORE EXPERIENCE */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* VIDEO CORE */}
          <motion.div
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              mouseX.set(e.clientX - rect.left - rect.width / 2)
              mouseY.set(e.clientY - rect.top - rect.height / 2)
            }}
            onMouseLeave={() => {
              mouseX.set(0)
              mouseY.set(0)
            }}
            style={{ rotateX, rotateY }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-blue-400 to-cyan-400 blur-2xl opacity-30" />

            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.15)]">
              <VideoPlayer src={currentVideo.src} thumb={currentVideo.thumb} />
            </div>

            {/* LIVE IMPACT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 left-6 right-6 bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-xl flex justify-between items-center"
            >
              <div>
                <p className="text-xs text-slate-500">Live Impact</p>
                <p className="font-semibold text-slate-800">₦2.4M raised from this story</p>
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                <Icon icon="mdi:trending-up" /> +12%
              </div>
            </motion.div>
          </motion.div>

          {/* STORY STREAM */}
          <div className="space-y-5 max-h-[520px] overflow-y-auto pr-2">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
                  activeIndex === index
                    ? 'bg-white shadow-lg'
                    : 'bg-white/60 backdrop-blur-sm'
                }`}
              >
                <div className="relative w-24 h-16 rounded-lg overflow-hidden">
                  <Image src={video.thumb} alt="thumb" fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition">
                    <Icon icon="solar:play-bold" className="text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-slate-800">{video.name}</p>
                  <p className="text-xs text-slate-500">Click to watch story</p>
                </div>

                {activeIndex === index && (
                  <motion.div layoutId="activeIndicator" className="w-2 h-10 bg-blue-500 rounded-full" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
