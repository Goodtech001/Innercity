'use client'
import React, { useEffect, useState } from 'react'
import VideoPlayer from '@/components/video-player'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Pagination } from 'swiper/modules'
import Image, { StaticImageData } from 'next/image'

import rita from '@/public/assets/images/rita.jpg'
import difference from "@/public/assets/images/difference.jpg";
import tosin from "@/public/assets/images/Tosin.jpg"
import amaechi from "@/public/assets/images/P-Amaechi.jpg"

import hungry from "@/public/assets/images/hungry.jpg"
import chuka2 from "@/public/assets/images/chuka2.jpg"


export default function TopFundraisersVideo() {
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
  thumb: StaticImageData;
  src: string;
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
    <section>
      <div className="container py-8 pb-6 md:py-14 md:pb-8">
        <h3 className="mx-auto mb-4 max-w-3xl text-center text-3xl font-bold text-dark md:text-4xl">
          Top Fundraisers Share Their Stories{' '}
          <span className="hidden md:inline-block">and Reasons Behind Major Campaigns</span>
        </h3>
        <div className="mx-auto mb-2 mt-5 flex max-w-4xl items-center justify-center">
         <VideoPlayer key={currentVideo.src} src={currentVideo.src} thumb={currentVideo.thumb} />
        </div>
        <div className="">
          <div className='relative'>
           <div className="swiper-prev absolute top-1/2 w-10 border-2 border-gray-600 shadow bg-white p-2 rounded md:mt-10 mt-40">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </div>
  </div>
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
         {videos.map((video, index) => (
    <SwiperSlide key={index}>
      <div className="cursor-pointer" onClick={() => handleThumbnailClick(video)}>
        <Image alt="thumbnail" src={video.thumb} className={`h-32 w-48 rounded-lg object-cover shadow-lg`} width={640} height={360} />
      </div>
    </SwiperSlide>
  ))}
          </Swiper>
          <div className='relative'>
          <div className="
    swiper-next
    absolute
    md:top-[-115px]
    right-3
    w-10
    border-2
    border-gray-600
    shadow
    bg-white
    p-2
    rounded

  ">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </div>
  </div>
        </div>
      </div>
    </section>
  )
}
