import { HeroCardStack } from '@/components/hero-card-stack'
import Link from 'next/link'
import React from 'react'

export default function HeroSection() {
  return (
    <main className="bg-hero-blue-specs-pattern min-h-96 bg-[100%,100%] py-16 md:py-28">
      <div className="container flex flex-col gap-6 gap-y-10 md:grid md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className="font-medium">Share love. Spread change</p>
          <h1 className="text-balance text-4xl font-extrabold text-dark md:text-5xl">
            Fundraise Your Moments, Uplift a Child
          </h1>
          <p className="mt-2 font-medium md:mt-4">
            Fundrise turns your special days into meaningful action. From birthdays to “just
            because,” every campaign helps a child eat, learn, and thrive.
          </p>
          <div className="mt-8 flex items-center gap-6">
            <Link className="btn-primary w-fit" href={'/create-campaign'}>
              Create your campaign
            </Link>
            <Link className="btn-white w-fit" href={'/create-campaign'}>
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
    </main>
  )
}
