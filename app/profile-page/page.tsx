import Footer from '@/layouts/footer'
import TopNavbar from '@/layouts/topnavbar'
import React from 'react'
import ProfileSection from '../profile/page'

function page() {
  return (
    <div>
      <TopNavbar />
      <ProfileSection />
      <Footer />
    </div>
  )
}

export default page
