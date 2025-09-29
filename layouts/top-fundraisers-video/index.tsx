'use client'
import React, { useEffect, useRef, useState } from 'react'
import VideoPlayer from '@/components/video-player'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Pagination } from 'swiper/modules'
import Image, { StaticImageData } from 'next/image'

import rita from '@/public/assets/images/rita.jpg'
import difference from '@/public/assets/images/difference.jpg'
import tosin from '@/public/assets/images/Tosin.jpg'
import amaechi from '@/public/assets/images/P-Amaechi.jpg'

import hungry from '@/public/assets/images/hungry.jpg'
import chuka2 from '@/public/assets/images/chuka2.jpg'

import { Icon } from '@iconify/react'
import { motion,useInView } from 'framer-motion'

export default function TopFundraisersVideo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const [isMobile, setIsMobile] = useState(false)
  const [currentVideo, setCurrentVideo] = useState({
    src: 'https://vimeo.com/1037756541/2f13d91b44',
    thumb: rita,
  })

  const videos = [
    {
      thumb: difference,
      src: 'https://vimeo.com/731472228/709298ca1b?share=copy',
    },
    {
      thumb: tosin,
      src: 'https://vimeo.com/1010215295/7c79867761',
    },
    {
      thumb: amaechi,
      src: 'https://player.vimeo.com/video/231560451',
    },
    {
      thumb: rita,
      src: 'https://vimeo.com/1037756541/2f13d91b44',
    },
    {
      thumb: chuka2,
      src: 'https://player.vimeo.com/video/292941519',
    },
    {
      thumb: hungry,
      src: 'https://player.vimeo.com/video/731472228/?h=709298ca1b',
    },
    // ...
  ]

  interface Video {
    thumb: StaticImageData
    src: string
  }

  const handleThumbnailClick = (video: Video) => {
    setCurrentVideo(video) // ✅ just use as-is
  }

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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
    <section>
      <div className="container py-8 pb-6 md:py-14 md:pb-8">
        <h3 className="mx-auto mb-4 max-w-3xl text-center text-3xl font-bold text-dark md:text-4xl">
          Top Fundraisers Share Their Stories{' '}
          <span className="hidden md:inline-block">and Reasons Behind Major Campaigns</span>
        </h3>
        <div className="mx-auto mb-4 mt-5 flex max-w-4xl items-center justify-center">
          <VideoPlayer key={currentVideo.src} src={currentVideo.src} thumb={currentVideo.thumb} />
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
            {videos.map((video, index) => (
              <SwiperSlide key={index}>
                <div className="cursor-pointer" onClick={() => handleThumbnailClick(video)}>
                  <Image
                    alt="thumbnail"
                    src={video.thumb}
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
    </motion.div>
  )
}
