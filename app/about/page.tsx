import React from 'react'
import TopNavbar from '@/layouts/topnavbar'
import AboutHero from '@/layouts/about-hero-section'
import HowItWorks from '@/layouts/how-it-works'
import DiscoverMoreCategories from '@/layouts/discover-more-campaigns'
import CtaSection from '@/layouts/cta-section'
import Footer from '@/layouts/footer'

export default function HeroSection() {
  return (
    <div>
      <TopNavbar />
      <AboutHero />
      <HowItWorks />
      <DiscoverMoreCategories />
      <CtaSection />
      <Footer />
    </div>
  )
}
