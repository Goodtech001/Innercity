import Image from 'next/image'
import React from 'react'
import signlogo from '@/public/inner-black-text.png'
import Link from 'next/link'
import { AnimatedTooltipPreview } from '@/components/animated-tooltip'
import '@/styles/globals.css' // TODO: what is this, please remove we already have an import initialized in the layout.tsx root under the app directly

// TODO: learn to format your code when you write (shift + alt + f) uses the formatter i have installed, there is a prettierrc.yaml already in the project just use it daily so code does'nt look like its written roughly

// TODO: please name your page render function something proper, in this case name it SingUp or SingUpPage, make the code easier to understand even after 5 years
function index() {
  return (
    <div className="mx-auto h-screen grid-cols-10 overflow-y-hidden md:grid">
      <div className="bg-sign-up col-span-6 hidden h-screen items-center bg-cover bg-center text-white md:block">
        <div className="mt-10 bg-[100%,100%] p-20">
          <h1 className="sign text-5xl font-bold">
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
      <form className="col-span-4 mx-auto flex w-full items-center justify-center self-start px-6 py-20 md:px-10">
        <div className="w-full">
          <Image src={signlogo} alt="logo" width={90} height={90} className="mx-auto md:mx-0" />
          <h1 className="mb-5 mt-5 text-center font-sans text-3xl font-bold text-black md:text-left">
            {' '}
            Sign Up
          </h1>
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
            <button type="submit" id="submit" className="btn-primary mt-5">
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
