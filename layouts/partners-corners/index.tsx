/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useRef, useState } from 'react'
import partnersGirl from '@/public/assets/images/partners-girl.jpg'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from 'swiper/modules'
import { Icon } from '@iconify/react'
import { motion, useInView } from 'framer-motion'
import { getTestimonialsService } from '@/app/auth/auth.service'

// import { getTestimonialsService } from '@/services/testimonial.service'

export default function PartnersCorners() {
  // const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(true)
  const [testimonials, setTestimonials] = useState<any[]>([])

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonialsService()
        setTestimonials(data.data || data)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch testimonials', err)
      }
    }

    fetchTestimonials()
  }, [])
  const [isMobile, setIsMobile] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

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
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#f8fafc] to-[#eef2ff] py-20">
        {/* Ambient glow */}
        <div className="absolute -top-32 left-0 h-[300px] w-[300px] bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] bg-blue-400/20 blur-3xl" />

        <div className="mt-15 container pb-8 md:py-2 md:pb-8">
          <h3 className="mb-8 mt-10 text-balance text-center text-3xl font-bold text-dark md:text-4xl">
            Partner&apos;s Spotlight
          </h3>
        </div>
        <div className="">
          <Swiper
            slidesPerView={isMobile ? 1 : 2}
            spaceBetween={5}
            freeMode={true}
            pagination={{ clickable: true }}
            modules={[FreeMode, Pagination]}
          >
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <SwiperSlide key={index} className="px-8 py-6 pb-20">
                    <PartnersCornersCardSkeleton />
                  </SwiperSlide>
                ))
              : testimonials.map((item) => (
                  <SwiperSlide key={item.id} className="px-8 py-6 pb-20">
                    <PartnersCornersCard testimonial={item} />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </section>
    </motion.div>
  )
}

export function PartnersCornersCard({ testimonial }: any) {
  return (
    <>
      <div className="min-h-24 max-w-lg rounded-lg border bg-complementary px-2 py-2 text-textcolor md:grid md:min-w-96 md:grid-cols-12 md:px-3 md:py-3">
        <div className="relative col-span-3 flex justify-between md:flex-col">
          <span className="before:absolute before:-left-2 before:-top-2 before:hidden before:size-9 before:rounded-lg before:border-2 before:border-primary before:content-[''] md:mb-6 md:w-full before:md:-left-8 before:md:-top-8 before:md:inline-block before:md:size-24">
            <img
              alt="partner"
              src={testimonial.avatar?.url}
              width={100}
              height={100}
              className="relative z-10 aspect-1 rounded-md object-cover md:-ml-5 md:-mt-5"
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
              <h4 className="text-sm font-semibold text-dark md:text-base">
                {testimonial.clientName}
              </h4>
              <h4 className="text-xs font-medium md:text-sm">
                Donated: {testimonial.donatedAmount}
              </h4>
            </div>
            <h4 className="hidden text-xs font-medium text-dark md:inline-block md:text-sm">
              50k Donations
            </h4>
          </div>

          <p className="mb-5">{testimonial.content}</p>

          <small className="bottom-0 right-0 mt-auto flex items-center justify-end gap-1 md:absolute">
            <Icon className="text-sm" icon={'gridicons:location'} />
            <h4 className="">{testimonial.location}</h4>
          </small>
        </div>
      </div>
    </>
  )
}

export function PartnersCornersCardSkeleton() {
  return (
    <div className="min-h-24 max-w-lg animate-pulse rounded-lg border bg-complementary px-2 py-2 md:grid md:min-w-96 md:grid-cols-12 md:px-3 md:py-3">
      {/* Avatar */}
      <div className="col-span-3 flex justify-between md:flex-col">
        <div className="h-16 w-16 rounded-md bg-gray-300 md:h-20 md:w-20"></div>

        <div className="mt-2 flex flex-col gap-2">
          <div className="h-3 w-16 rounded bg-gray-300"></div>
          <div className="h-3 w-20 rounded bg-gray-300 md:hidden"></div>
        </div>
      </div>

      {/* Content */}
      <div className="col-span-9 mt-2 md:mt-0">
        <div className="mb-3 flex justify-between">
          <div>
            <div className="mb-2 h-4 w-32 rounded bg-gray-300"></div>
            <div className="h-3 w-24 rounded bg-gray-300"></div>
          </div>

          <div className="hidden h-3 w-20 rounded bg-gray-300 md:block"></div>
        </div>

        <div className="mb-3 h-3 w-full rounded bg-gray-300"></div>
        <div className="mb-3 h-3 w-5/6 rounded bg-gray-300"></div>
        <div className="mb-3 h-3 w-2/3 rounded bg-gray-300"></div>

        <div className="mt-4 flex justify-end">
          <div className="h-3 w-24 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  )
}
