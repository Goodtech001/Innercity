import { Icon } from '@iconify/react'
import Image from 'next/image'
import React from 'react'
import arrow from '@/public/assets/images/arrow-to-bl.png'
import arrow2 from '@/public/assets/images/arrow-to-br.png'

function HowItWorks() {
  return (
    <div className="mt-5 bg-primary p-5 text-light md:mt-2 md:p-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-20 text-center">
          <h1 className="text-2xl font-bold md:text-4xl">How Fundraising Works</h1>
          <p className="text-sm md:text-base">
            It takes less than 5 minutes to start a Fundrise. And the impact? Lifelong.
          </p>
        </div>

        {/* 1 */}
        <div className="w-full py-8">
          <div className="flex flex-col-reverse items-center gap-5 md:flex-row">
            {/* text */}
            <div className="text-center md:w-4/5 md:text-left">
              <h1 className="mb-2 text-2xl font-semibold">Step 1 — Create Your Campaign</h1>
              <p className="max-w-96 text-sm">
                Start by giving your campaign a name, setting your goal, and choosing what cause you
                want to support — like meals, school kits, or shelter.
              </p>
            </div>
            {/* numbering */}
            <div className="relative md:w-1/5">
              <div className="w-fit rounded-xl border border-white p-2.5 md:rounded-3xl md:p-5">
                <Icon icon="garden:file-spreadsheet-fill-12" className="h-16 w-16 text-white" />
              </div>
              <h1 className="absolute -left-8 -top-8 text-6xl font-bold text-[#7BB2E7] md:-left-10 md:-top-10 md:text-8xl">
                01
              </h1>
            </div>
          </div>

          {/* arrow image */}
          <div className="-mt-6 hidden md:block">
            <Image src={arrow} alt="follow" className="mx-auto mr-48 h-auto w-4/6" />
          </div>
        </div>

        {/* 2 */}
        <div className="w-full py-8">
          <div className="flex flex-col items-center gap-5 md:flex-row">
            {/* numbering */}
            <div className="relative md:w-1/5">
              <div className="w-fit rounded-xl border border-white p-2.5 md:rounded-3xl md:p-5">
                <Icon icon="icon-park-solid:connect" className="h-16 w-16 text-white" />
              </div>
              <h1 className="absolute -top-8 right-8 text-6xl font-bold text-[#7BB2E7] md:-top-10 md:right-10 md:text-8xl">
                02
              </h1>
            </div>

            {/* text */}
            <div className="text-center md:w-4/5 md:text-right">
              <h1 className="mb-2 text-2xl font-semibold">Step 2 — Share Your Story</h1>
              <p className="max-w-96 text-sm md:ml-auto">
                Tell people why you’re fundraising — then share your campaign link with friends,
                family, and your community through WhatsApp, social media, or email.
              </p>
            </div>
          </div>

          {/* arrow image */}
          <div className="-mt-6 hidden md:block">
            <Image src={arrow2} alt="follow" className="mx-auto ml-32 h-auto w-4/6" />
          </div>
        </div>

        {/* 3 */}
        <div className="w-full py-8">
          <div className="flex flex-col-reverse items-center gap-5 md:flex-row">
            {/* text */}
            <div className="text-center md:w-4/5 md:text-left">
              <h1 className="mb-2 text-2xl font-semibold">Step 3 — Raise Funds & Make Impact</h1>
              <p className="max-w-96 text-sm">
                Share your campaign with friends and families, track your progress and keep
                supporters updated. Each contribution brings you closer to your goal showcasing your
                own impact.
              </p>
            </div>
            {/* numbering */}
            <div className="relative md:w-1/5">
              <div className="w-fit rounded-xl border border-white p-2.5 md:rounded-3xl md:p-5">
                <Icon icon="mdi:seedling" className="h-16 w-16 text-white" />
              </div>
              <h1 className="absolute -left-8 -top-8 text-6xl font-bold text-[#7BB2E7] md:-left-10 md:-top-10 md:text-8xl">
                03
              </h1>
            </div>
          </div>

          {/* arrow image */}
          <div className="-mt-6 hidden">
            <Image src={arrow} alt="follow" className="mx-auto mr-48 h-auto w-4/6" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
