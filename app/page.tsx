import TopNavbar from '@/layouts/topnavbar'
import HeroSection from '@/layouts/hero-section'
import BenefitsMetricsStrip from '@/layouts/benefits-metrics-strip'
import LatestFundraisingCampaigns from '@/layouts/latest-fundraising-campaigns'
import ICMCampaignCategories from '@/layouts/icm-campaign-categories'
import GemSponsoredSection from '@/layouts/gem-sponsored-section'
import TopFundraisersVideo from '@/layouts/top-fundraisers-video'
import Footer from '@/layouts/footer'
import CtaSection from '@/layouts/cta-section'
import DiscoverMoreCategories from '@/layouts/discover-more-campaigns'

export default function Home() {
  return (
    <>
      <TopNavbar />
      <HeroSection />
      <BenefitsMetricsStrip />
      <LatestFundraisingCampaigns />
      <ICMCampaignCategories />
      <GemSponsoredSection />
      <TopFundraisersVideo />
      <DiscoverMoreCategories />
      <CtaSection />
      <Footer />
    </>
  )
}
