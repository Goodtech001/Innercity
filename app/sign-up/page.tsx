import Image from 'next/image'
import React from 'react'
import signlogo from '@/public/inner-black-text.png'
import Link from 'next/link'
import { AnimatedTooltipPreview } from '@/components/animated-tooltip'
import '@/styles/globals.css'

function index() {
  return (
    <div className="md:grid grid-cols-10 mx-auto h-screen overflow-y-hidden">
      <div className="bg-sign-up h-screen items-center bg-cover bg-center text-white col-span-6 md:block hidden ">
        <div className="bg-[100%,100%] p-20 mt-10">
          <h1 className="text-5xl font-bold sign">
            Start turning your <br /> ideas into realities{' '}
          </h1>
          <p className="mt-5 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus <br /> illo, aut
            repudiandae consectetur, modi quis ex, laudantium <br /> delectus dolorum unde quibusdam
            dicta sit corrupti aliquam.
          </p>
          <AnimatedTooltipPreview />
        </div>
      </div>

      {/* form */}
      <form className="flex items-center justify-center col-span-4 mx-auto py-20 md:px-10 px-6 w-full self-start">
        <div className='w-full '>
          <Image src={signlogo} alt="logo" width={90} height={90} className=' mx-auto md:mx-0'/>
          <h1 className="mb-5 mt-5 font-sans text-3xl font-bold text-black md:text-left text-center"> Sign Up</h1>
          <label htmlFor="text" className="label mt-5">
            Name*
          </label>
          <div className="flex-row">
            <input
              type="text"
              id="text"
              placeholder="Enter your name"
              required
              className="input mb-3"
            />
          </div>{' '}
          <label htmlFor="email" className="label mt-5">
            {' '}
            Email*
          </label>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className="input mb-3"
            />
          </div>{' '}
          <label htmlFor="password" className="label">
            {' '}
            Password*
          </label>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              className="input"
            />
          </div>
          <div>
            <button
              type="submit"
              id="submit"
              className="btn-primary mt-5"
            >
              Create Account
            </button>
          </div>
          <div className="mt-5 flex justify-center text-center">
            <p className="justify-center text-sm">
              Already have an Account?{' '}
              <Link href="/sign-in" className="font-bold text-primary">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default index
