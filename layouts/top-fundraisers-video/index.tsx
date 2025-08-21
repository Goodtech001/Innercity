'use client'
import React, { useEffect, useState } from 'react'
import VideoPlayer from '@/components/video-player'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import thumbnail from '@/public/assets/images/video-thumbnail.jpg'
import { Icon } from '@iconify/react/dist/iconify.js'

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
            navigation={{ prevEl: '.swiper-prev', nextEl: '.swiper-next' }}
            modules={[FreeMode, Pagination, Navigation]}
            className="relative min-h-40 max-w-4xl"
          >
            <div className="absolute bottom-0 left-0 top-0 z-10 flex flex-col items-center justify-center bg-gradient-to-tr from-white via-white/70 to-white/20 px-6 py-4">
              <button className="btn-white swiper-prev mb-10 px-1 py-1">
                <Icon className="text-2xl" icon={'material-symbols-light:chevron-left-rounded'} />
              </button>
            </div>

            <div className="absolute bottom-0 right-0 top-0 z-10 flex flex-col items-center justify-center bg-gradient-to-tl from-white via-white/70 to-white/20 px-6 py-4">
              <button className="btn-white swiper-next mb-10 px-1 py-1">
                <Icon className="text-2xl" icon={'material-symbols-light:chevron-right-rounded'} />
              </button>
            </div>

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
