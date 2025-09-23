import Footer from '@/layouts/footer'
import TopNavbar from '@/layouts/topnavbar'
import Link from 'next/link'
import React from 'react'
import ProfileSection from '../profile/page'

function page() {
  return (
    <div>
      <TopNavbar />
      <div className="p-5">
        <div className="flex justify-between border-b border-color">
          <h1 className="text-3xl font-bold text-black mb-3">Profile</h1>
          
        </div>
      </div>
      <ProfileSection />
      <Footer />
    </div>
  )
}

export default page
