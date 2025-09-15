import React from 'react'
import TopNavbar from '@/layouts/topnavbar'
import AboutHero from '@/components/about-hero-section'
import How from '@/components/how-it-works'
import DiscoverMoreCategories from '@/layouts/discover-more-campaigns'
import CtaSection from '@/layouts/cta-section'
import Footer from '@/layouts/footer'

export default function HeroSection() {
  return (
    <div>
        <TopNavbar/>
        <AboutHero/>
        <How/>
        <DiscoverMoreCategories />
        <CtaSection />
        <Footer />
    </div>
  )
}
