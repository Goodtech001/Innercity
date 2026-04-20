/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from 'react'
import TopNavbar from '@/layouts/topnavbar'
import HeroSection from '@/layouts/hero-section'
import BenefitsMetricsStrip from '@/layouts/benefits-metrics-strip'
import LatestFundraisingCampaigns, {
  CampaignCardSkeleton,
} from '@/layouts/latest-fundraising-campaigns'
import ICMCampaignCategories from '@/layouts/icm-campaign-categories'
import GemSponsoredSection from '@/layouts/gem-sponsored-section'
import TopFundraisersVideo from '@/layouts/top-fundraisers-video'
import Footer from '@/layouts/footer'
import CtaSection from '@/layouts/cta-section'
import DiscoverMoreCategories from '@/layouts/discover-more-campaigns'
import PartnersCorners from '@/layouts/partners-corners'
import IcmCampaign from '@/layouts/icm-campaigns'
import FAQPage from '@/layouts/faq'

export default function Home() {

  return (
    <>
      {/* <FloatingEasterEggs /> */}
      <TopNavbar />
      <HeroSection />
      <BenefitsMetricsStrip />
      <LatestFundraisingCampaigns />
      <IcmCampaign/>
      <FAQPage/>
      <GemSponsoredSection />
      <TopFundraisersVideo />
      <PartnersCorners />
      <DiscoverMoreCategories />
      <CtaSection />
      <Footer />
    </>
  )
}
