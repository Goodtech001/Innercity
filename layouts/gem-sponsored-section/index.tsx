import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import gemBannerImage from '@/public/assets/images/gem-banner-image.jpg'

export default function GemSponsoredSection() {
  return (
    <section className="bg-complementary">
      <div className="container mx-auto flex max-w-6xl grid-cols-2 flex-col gap-6 py-8 pb-6 md:grid md:py-14 md:pb-8">
        <div className="flex flex-col gap-2">
          <p className="font-medium">Other Sponsored Events</p>
          <h1 className="text-balance text-3xl font-bold text-dark md:text-4xl">
            The Innercity Mission Give Every Month Initiative (GEM)
          </h1>
          <p className="mt-2 font-medium md:mt-4">
            The InnerCity Mission GEMs [Giving Every Month] Initiative is a Monthly Giving Program
            for Partners who commit to make a regular financial donation to the InnerCity Mission
            for Children. It affords partners the opportunity to partner with The InnerCity Mission
            in a consistent and structured manner.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6 md:mt-16">
            <Link
              className="btn-primary w-fit px-10"
              target="_blank"
              href={'https://icm.ngo/partnerwithus'}
            >
              Visit GEM
            </Link>
            <Link className="w-fit underline" href={'https://icm.ngo/partnerwithus'}>
              Learn more
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            className="w-full max-w-96 rounded-lg border border-dark/10 shadow md:w-auto"
            alt="GEM"
            src={gemBannerImage}
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  )
}
