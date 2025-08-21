'use client'
import React, { useEffect, useState } from 'react'
import VideoPlayer from '@/components/video-player'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from 'swiper/modules'
import Image from 'next/image'
import thumbnail from '@/public/assets/images/video-thumbnail.jpg'

export default function TopFundraisersVideo() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section>
      <div className="container py-8 pb-6 md:py-14 md:pb-8">
        <h3 className="mx-auto mb-4 max-w-3xl text-center text-3xl font-bold text-dark md:text-4xl">
          Top Fundraisers Share Their Stories{' '}
          <span className="hidden md:inline-block">and Reasons Behind Major Campaigns</span>
        </h3>
        <div className="mx-auto mb-2 mt-5 flex max-w-4xl items-center justify-center">
          <VideoPlayer />
        </div>
        <div className="">
          <Swiper
            slidesPerView={isMobile ? 2 : 4}
            spaceBetween={5}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="relative min-h-40 max-w-4xl"
          >
            <div className="absolute bottom-0 left-0 top-0 z-10 bg-gradient-to-tr from-white via-white/70 to-white/20 px-6 py-4" />
            <div className="absolute bottom-0 right-0 top-0 z-10 bg-gradient-to-tl from-white via-white/70 to-white/20 px-6 py-4" />
            {Array.from({ length: 8 }).map((_, index) => (
              <SwiperSlide key={index}>
                <div className="">
                  <Image
                    alt="thumbnail"
                    src={thumbnail}
                    className={`h-32 w-48 rounded-lg object-cover shadow-lg`}
                    width={640}
                    height={360}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
