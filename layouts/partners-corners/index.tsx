import React from 'react'
import partnersGirl from '@/public/assets/images/partners-girl.jpg'
import Image from 'next/image'
import { Icon } from '@iconify/react'

export default function PartnersCorners() {
  return (
    <section>
      <div className="container py-8 pb-6 md:py-14 md:pb-8">
        <h3 className="mb-8 text-balance text-center text-3xl font-bold text-dark md:text-4xl">
          Partners Corners
        </h3>

        <div className="relative min-h-40">
          <div className="min-h-24 max-w-xl rounded-lg border bg-secondary px-2 py-2 text-light md:grid md:grid-cols-12 md:px-3 md:py-3">
            <div className="col-span-3 flex justify-between md:flex-col">
              <span className="border-2 md:mb-6 md:w-full">
                <Image
                  alt="partner"
                  src={partnersGirl}
                  className="aspect-1 rounded-md md:-ml-5 md:-mt-5"
                  width={100}
                  height={100}
                />
              </span>

              <div className="flex flex-col gap-2 text-right md:text-left">
                <h4 className="text-xs font-semibold md:text-sm">~ G.E.M ~</h4>
                <h4 className="text-sm font-medium md:hidden">50k Donation</h4>
                <span className="mt-auto flex items-center justify-center gap-1 border-t text-sm font-medium md:hidden">
                  <Icon className="text-sm" icon={'gridicons:location'} />
                  <h4 className="">Lagos ,Nigeria</h4>
                </span>
              </div>
            </div>
            <div className="col-span-9 border">
              <h4 className="text-sm font-semibold md:text-base">Abigail Otingba</h4>
              <h4 className="text-sm md:text-base">Donated: $ 2.5m</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
