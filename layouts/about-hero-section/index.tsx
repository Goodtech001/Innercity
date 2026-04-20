'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import about from '@/public/assets/images/about.jpg'
import { circInOut, motion, spring, useInView } from 'framer-motion'

function AboutHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const transitionSpring = { duration: 0.4, ease: circInOut, type: spring, stiffness: 150 }

  return (
    <main className="bg-hero-blue-specs-pattern min-h-96 bg-[100%,100%] py-16 pb-0 md:py-28 md:pb-36">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={transitionSpring}
      >
        <div className="container flex flex-col gap-6 gap-y-10 md:grid md:grid-cols-2">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-balance text-4xl font-extrabold text-dark md:text-5xl">
              About Fundraiser
            </h1>
            <p className="mt-2 text-base font-medium md:mt-4">
              The InnerCity Mission Fundraising is a simple and impactful peer-to-peer platform that
              empowers anyone to raise funds for indigent children and poor families around the
              world. In just a few steps, you can create a campaign to commemorate your birthday,
              anniversary, wedding, promotion, or any special occasion — or simply out of the desire
              to help the vulnerable. By sharing your story and leveraging your network of friends
              and family, you can provide meals, education, shelter, and other essential needs to
              those who need it most. The platform makes sponsorship easy, turning your personal
              celebrations into meaningful acts of kindness that create real change in communities.
              Start your campaign today and be the change.
            </p>
          </div>
          <div className="">
            <div className="mx-auto w-full max-w-xl">
              {/* <HeroCardStack /> */}
              <div className="max:w-[557px] h-[364px] overflow-hidden rounded-lg">
                <Image src={about} alt="" className="h-auto w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}

export default AboutHero
