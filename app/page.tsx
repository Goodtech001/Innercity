'use client'
import Body from '@/components/Body'
import Campaign2 from '@/components/campaign2'
import { Camp } from '@/components/Campaigns'
import Category from '@/components/Category'
import Gem from '@/components/Gem'
// import Hero from '@/components/Hero'
import { CarouselDemo } from '@/components/PartnersCorner'
import { Analytics } from '@vercel/analytics/next'
import TopNavbar from '@/layouts/topnavbar'
import HeroSection from '@/layouts/hero-section'

export default function Home() {
  return (
    <div>
      <TopNavbar />
      <HeroSection />
      {/* <Hero /> */}
      <Body />
      <Camp />
      <Category />
      <Gem />
      <CarouselDemo />
      <Analytics />
      <Campaign2 />
    </div>
  )
}
