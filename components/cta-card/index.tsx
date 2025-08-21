import Link from 'next/link'
import React from 'react'

function Ctacard () {
  return (
    <div className='align-middle'>
      <div className='text-center md:p-20 p-5 bg-white w-fit cta rounded md:m-1 m-5 mt-10'>
        <h1 className='font-bold text-2xl text-black'>
            You can Be The Reason Someone Smiles Today.
        </h1>
        <p className='mt-5'>Start a fundraiser or support one — every action helps <br /> change a life.</p>
        <span className='flex justify-center gap-5 mt-10'>
            <Link href={'/create-campaign'} className='btn-white w-fit max-w-md truncate'>Support a campaign</Link>
             <Link href={'/create-campaign'} className='btn-primary w-fit nowrap truncate'>Create a campaign</Link>
        </span>
      </div>
    </div>
  )
}

export default Ctacard
