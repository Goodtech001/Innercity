import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import React from 'react'
import arrow from "@/public/assets/images/Vector 15.png"
import arrow1 from "@/public/assets/images/Vector 16.png"

function How() {
  return (
    <div className='bg-[#0074E6] md:p-10 p-5 relative'>
      <div className='text-center text-white'>
        <h1 className='md:text-4xl text-2xl font-bold'>How Fundraising Works</h1>
        <p className='md:text-sm text-xs '>It takes less than 5 minutes to start a Fundrise. And the impact? Lifelong.</p>
      </div>
{/* 1 */}
      <div className='md:mt-0 mt-24 flex items-center justify-center'>
        <div className=' md:container flex md:grid-cols-2 w-full justify-center items-center md:space-x-80 mt-10 md:flex-row flex-col-reverse md:gap-0 gap-5'>
        <div className='text-white md:text-left text-center'>
            <h1 className='font-semibold text-2xl mb-2'>Step 1 — Create Your Fundrise</h1>
            <p className='text-sm md:block hidden'>Start by giving your campaign a name, setting your goal, and <br /> choosing what cause you want to support — like meals, school <br /> kits, or shelter.</p>
            <p className='text-sm md:hidden block'>Start by giving your campaign a name, setting your goal, and choosing what cause you want to support — like meals, school kits, or shelter.</p>
        </div>

       <div className='flex items-center justify-center'>
         <div className='border border-white w-fit h-fit p-5 rounded-3xl '>
            <Icon icon="material-symbols:docs-rounded" width="63" height="76" className='text-white'/>
            <h1 className='md:text-8xl text-7xl text-[#7BB2E7] font-bold absolute md:top-[10%] md:right-[22%] top-[13%] right-[28%]'>01</h1>
        </div>
       </div>
      </div> 
      <div className='md:flex justify-center hidden absolute top-[26%] right-[28%]'>
        <Image src={arrow} alt='' className='w-[622px] h-[132px] '/>
      </div>
      </div>
{/* 2 */}
       <div className='md:mt-30 mt-24 flex items-center justify-center'>
        <div className=' md:container md:flex md:grid-cols-2 w-full justify-center md:space-x-80 mt-10 md:flex-row flex-col md:gap-0 gap-5'>
        <div className='flex items-center justify-center'>
          <div className='border border-white w-fit h-fit p-5 rounded-3xl'>
            <Icon icon="hugeicons:molecules" width="90" height="90" className='text-white'/>
            <h1 className='md:text-8xl text-7xl text-[#7BB2E7] font-bold absolute md:top-[42%] md:left-[22%] top-[41%] right-[26%]'>02</h1>
        </div>
        </div>

        <div className='text-white md:text-right text-center'>
            <h1 className='font-semibold text-2xl mb-2'>Step 2 — Share Your Story</h1>
            <p className='text-sm md:hidden block'>Tell people why you’re fundraising — then share your campaign link with friends, family, and your community through WhatsApp, social media, or email.</p>
            <p className='text-sm md:block hidden'>Tell people why you’re fundraising — then share your campaign <br /> link with friends, family, and your community through <br /> WhatsApp, social media, or email.</p>
        </div>
      </div>
      <div className='md:flex justify-center hidden absolute top-[59%] right-[22%]'>
        <Image src={arrow1} alt='' className='w-[622px] h-[132px] '/>
      </div>
      </div>

      {/* 3 */}
      <div className='mt-24 flex items-center justify-center'>
        <div className='md:container flex md:grid-cols-2 w-full justify-center md:space-x-80 mt-10 md:flex-row flex-col-reverse md:gap-0 gap-5'>
        <div className='text-white md:text-left text-center'>
            <h1 className='font-semibold text-2xl mb-2'>Step 3 — Raise Funds & Make Impact</h1>
            <p className='text-sm md:block hidden'>Start by giving your campaign a name, setting your goal, and <br /> choosing what cause you want to support — like meals, school <br /> kits, or shelter.</p>
            <p className='text-sm md:hidden block'>Start by giving your campaign a name, setting your goal, and choosing what cause you want to support — like meals, school kits, or shelter.</p>
        </div>

        <div className='flex items-center justify-center'>
          <div className='border border-white w-fit h-fit p-5 rounded-3xl'>
            <Icon icon="mdi:seedling" width="85" height="85" className='text-white'/>
            <h1 className='md:text-8xl text-7xl text-[#7BB2E7] font-bold absolute md:top-[75%] md:right-[13%] top-[71%] right-[26%]'>03</h1>
        </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default How
