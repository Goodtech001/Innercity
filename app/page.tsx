'use client'
import Campaign2 from '@/components/campaign2'
import Category from '@/components/Category'
import Gem from '@/components/Gem'
import { CarouselDemo } from '@/components/PartnersCorner'
import TopNavbar from '@/layouts/topnavbar'
import HeroSection from '@/layouts/hero-section'
import BenefitsMetricsStrip from '@/layouts/benefits-metrics-strip'
import LatestFundraisingCampaigns from '@/layouts/latest-fundraising-campaigns'
import ICMCampaignCategories from '@/layouts/icm-campaign-categories'

export default function Home() {
  return (
    <>
      <TopNavbar />
      <HeroSection />
      <BenefitsMetricsStrip />
      <LatestFundraisingCampaigns />
      <ICMCampaignCategories />
      {/*
      <Category />
      <Gem />
      <CarouselDemo />
      <Campaign2 /> */}
    </>
  )
}
