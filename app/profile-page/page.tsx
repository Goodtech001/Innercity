import Footer from '@/layouts/footer'
import TopNavbar from '@/layouts/topnavbar'
import React from 'react'
import ProfileSection from '../profile/page'

function page() {
  return (
    <div>
      <TopNavbar />
      <div className="p-5">
        <div className="border-color flex justify-between border-b">
          <h1 className="mb-3 text-3xl font-bold text-black">Profile</h1>
        </div>
      </div>
      <ProfileSection />
      <Footer />
    </div>
  )
}

export default page
