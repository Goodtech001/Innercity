'use client'
import React from 'react'
import VideoPlayer from '@/components/video-player'

export default function TopFundraisersVideo() {
  return (
    <section>
      <div className="container py-8 pb-6 md:py-14 md:pb-8">
        <h3 className="mx-auto mb-4 max-w-3xl text-center text-3xl font-bold text-dark md:text-4xl">
          Top Fundraisers Share Their Stories{' '}
          <span className="hidden md:inline-block">and Reasons Behind Major Campaigns</span>
        </h3>
        <div className="mx-auto mt-5 flex max-w-4xl items-center justify-center">
          <VideoPlayer />
        </div>
        <div className=""></div>
      </div>
    </section>
  )
}
