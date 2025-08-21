import React from 'react'
import Marquee from '@/components/marquee/marquee'
import Link from 'next/link'

export default function DiscoverMoreCategories() {
  return (
    <section>
      <div className="container py-8 pb-6 md:py-14 md:pb-8">
        <div className="mb-8 flex items-end justify-between">
          <h3 className="text-balance text-3xl font-bold text-dark md:text-4xl">
            <span className="hidden md:inline">Discover </span>
            More Campaigns
          </h3>

          <Link className="font-semibold underline" href={'/campaigns'}>
            See more <span className="hidden md:inline">campaigns</span>
          </Link>
        </div>

        <div className="relative min-h-40">
          <div className="absolute bottom-0 left-0 top-0 z-10 bg-gradient-to-tr from-white via-white/70 to-white/20 px-6 py-4" />
          <div className="absolute bottom-0 right-0 top-0 z-10 bg-gradient-to-tl from-white via-white/70 to-white/20 px-6 py-4" />
          <div className="flex flex-col gap-3">
            {/* fundraise campaign card */}
            <Marquee direction="left">
              <div className="flex gap-4">
                <CategoryLinkButton />
                <CategoryLinkButton />
                <CategoryLinkButton />
                <CategoryLinkButton />
                <CategoryLinkButton />
              </div>
            </Marquee>
            <Marquee direction="right">
              <div className="flex gap-4">
                <CategoryLinkButton />
                <CategoryLinkButton />
                <CategoryLinkButton />
                <CategoryLinkButton />
                <CategoryLinkButton />
              </div>
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  )
}

const CategoryLinkButton = () => {
  return (
    <button className="rounded-lg border-2 border-textcolor/25 bg-white px-8 py-3 text-center text-textcolor shadow-[0px_0px_6px_1px_rgba(0,_0,_0,_0.1)] hover:border-primary hover:text-primary md:text-base">
      <p className="font-medium !leading-[100%]">Send Children Back to School</p>
    </button>
  )
}
