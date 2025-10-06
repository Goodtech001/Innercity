'use client'
import React, { useRef } from 'react'
import Link from 'next/link'
import HeroCardStack from '@/components/hero-card-stack'
import { AnimatePresence, circInOut, motion, spring, useInView } from 'framer-motion'

function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const transitionSpring = { duration: 0.4, ease: circInOut, type: spring, stiffness: 150 }

  return (
    <main className="bg-hero-blue-specs-pattern min-h-96 bg-[100%,100%] py-16 pb-0 md:py-28 md:pb-36">
      <AnimatePresence>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={transitionSpring}
        >
          <div className="container flex flex-col gap-6 gap-y-10 md:grid md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <p className="font-medium">Share love. Spread change</p>
              <h1 className="text-balance text-4xl font-extrabold text-dark md:text-5xl">
                Fundraise Your Moments, Uplift a Childd
              </h1>
              <p className="mt-2 font-medium md:mt-4">
                Fundraise turns your special days into meaningful action. From birthdays to “just
                because,” every campaign helps a child eat, learn, and thrive.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Link className="btn-primary w-fit" href={'/campaigns/create'}>
                  Create your campaign
                </Link>
                <Link className="btn-white w-fit" href={'/campaign/all'}>
                  Support a campaign
                </Link>
              </div>
            </div>
            <div className="mt-24 md:mt-0">
              <div className="mx-auto w-full max-w-xl">
                <HeroCardStack />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
export default HeroSection
