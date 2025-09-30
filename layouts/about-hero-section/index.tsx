"use client";
import React, { useRef } from 'react'
import Image from 'next/image'
import about from '@/public/assets/images/about.jpg'
import { circInOut, motion,spring,useInView } from 'framer-motion';

function AboutHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
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
              Innercity Fundraiser is a simple and impactful way to support meaningful causes. With
              just a few steps, anyone can create a campaign, share their story, and raise funds for
              needs like meals, school kits, or shelter. The app makes it easy to turn generosity
              into real change by connecting people who want to help with the communities that need
              it most.
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
