import Footer from '@/layouts/footer'
import ProfilePageLayout from '@/layouts/profile-page-layout'
import TopNavbar from '@/layouts/topnavbar'
import { Suspense } from 'react'

export default function ProfilePage() {
  return (
    <>
      <TopNavbar />
      <Suspense fallback={<div>Loading profile...</div>}>
        <ProfilePageLayout />
      </Suspense>
      <Footer />
    </>
  )
}
