import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import React from 'react'
import arrow from '@/public/assets/images/Vector 15.png'
import arrow1 from '@/public/assets/images/Vector 16.png'

function How() {
  return (
    <div className="relative bg-[#0074E6] p-5 md:p-10 md:mt-2 mt-5">
      <div className="text-center text-white">
        <h1 className="text-2xl font-bold md:text-4xl">How Fundraising Works</h1>
        <p className="text-xs md:text-sm">
          It takes less than 5 minutes to start a Fundrise. And the impact? Lifelong.
        </p>
      </div>
      {/* 1 */}
      <div className="mt-24 flex items-center justify-center md:mt-0">
        <div className="mt-10 flex w-full flex-col-reverse items-center justify-center gap-5 md:container md:grid-cols-2 md:flex-row md:gap-0 md:space-x-80">
          <div className="text-center text-white md:text-left">
            <h1 className="mb-2 text-2xl font-semibold">Step 1 — Create Your Fundrise</h1>
            <p className="hidden text-sm md:block">
              Start by giving your campaign a name, setting your goal, and <br /> choosing what
              cause you want to support — like meals, school <br /> kits, or shelter.
            </p>
            <p className="block text-sm md:hidden">
              Start by giving your campaign a name, setting your goal, and choosing what cause you
              want to support — like meals, school kits, or shelter.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="h-fit w-fit rounded-3xl border border-white p-5">
              <Icon
                icon="material-symbols:docs-rounded"
                width="63"
                height="76"
                className="text-white"
              />
              <h1 className="absolute right-[28%] top-[14%] text-7xl font-bold text-[#7BB2E7] md:right-[22%] md:top-[10%] md:text-8xl">
                01
              </h1>
            </div>
          </div>
        </div>
        <div className="absolute right-[28%] top-[26%] hidden justify-center md:flex">
          <Image src={arrow} alt="" className="h-[132px] w-[622px]" />
        </div>
      </div>
      {/* 2 */}
      <div className="md:mt-30 mt-24 flex items-center justify-center">
        <div className="mt-10 w-full flex-col justify-center gap-5 md:container md:flex md:grid-cols-2 md:flex-row md:gap-0 md:space-x-80">
          <div className="flex items-center justify-center">
            <div className="h-fit w-fit rounded-3xl border border-white p-5">
              <Icon icon="hugeicons:molecules" width="90" height="90" className="text-white" />
              <h1 className="absolute right-[26%] top-[43%] text-7xl font-bold text-[#7BB2E7] md:left-[22%] md:top-[42%] md:text-8xl">
                02
              </h1>
            </div>
          </div>

          <div className="text-center text-white md:text-right mt-5">
            <h1 className="mb-2 text-2xl font-semibold">Step 2 — Share Your Story</h1>
            <p className="block text-sm md:hidden">
              Tell people why you’re fundraising — then share your campaign link with friends,
              family, and your community through WhatsApp, social media, or email.
            </p>
            <p className="hidden text-sm md:block">
              Tell people why you’re fundraising — then share your campaign <br /> link with
              friends, family, and your community through <br /> WhatsApp, social media, or email.
            </p>
          </div>
        </div>
        <div className="absolute right-[22%] top-[59%] hidden justify-center md:flex">
          <Image src={arrow1} alt="" className="h-[132px] w-[622px]" />
        </div>
      </div>

      {/* 3 */}
      <div className="mt-24 flex items-center justify-center">
        <div className="mt-10 flex w-full flex-col-reverse justify-center gap-5 md:container md:grid-cols-2 md:flex-row md:gap-0 md:space-x-80">
          <div className="text-center text-white md:text-left">
            <h1 className="mb-2 text-2xl font-semibold">Step 3 — Raise Funds & Make Impact</h1>
            <p className="hidden text-sm md:block">
              Start by giving your campaign a name, setting your goal, and <br /> choosing what
              cause you want to support — like meals, school <br /> kits, or shelter.
            </p>
            <p className="block text-sm md:hidden">
              Start by giving your campaign a name, setting your goal, and choosing what cause you
              want to support — like meals, school kits, or shelter.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="h-fit w-fit rounded-3xl border border-white p-5">
              <Icon icon="mdi:seedling" width="85" height="85" className="text-white" />
              <h1 className="absolute right-[26%] top-[73%] text-7xl font-bold text-[#7BB2E7] md:right-[13%] md:top-[75%] md:text-8xl">
                03
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default How
