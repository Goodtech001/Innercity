import React from 'react'
import Link from 'next/link'

function CtaSection() {
  return (
    <section className="bg-ctabg flex items-center justify-center px-2 py-16">
      <div className="w-full max-w-2xl rounded-lg bg-white px-4 py-6 text-center md:py-10">
        <h1 className="text-2xl font-bold text-dark">
          You Can Be The Reason Someone Smiles Today.
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-base">
          Start a fundraiser or support one — every action helps change a life.
        </p>
        <span className="mt-10 flex flex-wrap justify-center gap-2 md:gap-5">
          <Link href={'/create-campaign'} className="btn-white w-fit max-w-md truncate">
            Support a campaign
          </Link>
          <Link href={'/campaigns/create'} className="btn-primary nowrap w-fit truncate">
            Create a campaign
          </Link>
        </span>
      </div>
    </section>
  )
}

export default CtaSection
