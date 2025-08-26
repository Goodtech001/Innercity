import Footer from '@/layouts/footer'
import TopNavbar from '@/layouts/topnavbar'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
        <TopNavbar />
        <div className='p-10 '>
            <div className='flex justify-between border-b-2 border-black'> 
            <h1 className='text-black font-bold text-3xl '>Profile</h1>
            <Link href="/" className='btn-white w-fit mb-5'>chat</Link>
        </div>
        </div>
        <Footer />
      
    </div>
  )
}

export default page
