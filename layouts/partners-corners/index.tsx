'use client'
import React, { useEffect, useState } from 'react'
import partnersGirl from '@/public/assets/images/partners-girl.jpg'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from 'swiper/modules'
import { Icon } from '@iconify/react'

export default function PartnersCorners() {
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
      <div className="container pb-8 md:py-2 md:pb-8">
        <h3 className="mb-8 text-balance text-center text-3xl font-bold text-dark md:text-4xl">
          Partners Corner
        </h3>
      </div>
      <div className="">
        <Swiper
          slidesPerView={isMobile ? 1 : 2}
          spaceBetween={5}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className=""
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide key={index} className="px-8 py-6 pb-20">
              <PartnersCornersCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export function PartnersCornersCard() {
  return (
    <>
      <div className="min-h-24 max-w-lg rounded-lg border bg-complementary px-2 py-2 text-textcolor md:grid md:min-w-96 md:grid-cols-12 md:px-3 md:py-3">
        <div className="relative col-span-3 flex justify-between md:flex-col">
          <span className="before:absolute before:-left-2 before:-top-2 before:hidden before:size-9 before:rounded-lg before:border-2 before:border-primary before:content-[''] md:mb-6 md:w-full before:md:-left-8 before:md:-top-8 before:md:inline-block before:md:size-24">
            <Image
              alt="partner"
              src={partnersGirl}
              className="relative z-10 aspect-1 rounded-md md:-ml-5 md:-mt-5"
              width={100}
              height={100}
            />
          </span>

          <div className="flex flex-col gap-2 text-right md:text-left">
            <h4 className="text-xs font-semibold text-dark md:text-sm">~ G.E.M ~</h4>
            <h4 className="text-sm font-medium text-dark md:hidden">50k Donations</h4>
          </div>
        </div>
        <div className="relative col-span-9 mt-2 border-t pt-2 md:mt-0 md:border-0 md:*:pt-0">
          <div className="mb-3 flex items-start justify-between">
            <div className="">
              <h4 className="text-sm font-semibold text-dark md:text-base">Abigail Otingba</h4>
              <h4 className="text-xs font-medium md:text-sm">Donated: $ 2.5m</h4>
            </div>
            <h4 className="hidden text-xs font-medium text-dark md:inline-block md:text-sm">
              50k Donations
            </h4>
          </div>

          <p className="mb-5">Member of the G.E.M platfrom</p>

          <small className="bottom-0 right-0 mt-auto flex items-center justify-end gap-1 md:absolute">
            <Icon className="text-sm" icon={'gridicons:location'} />
            <h4 className="">Lagos, Nigeria</h4>
          </small>
        </div>
      </div>
    </>
  )
}
