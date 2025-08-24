import Image from 'next/image'
import React from 'react'
import signlogo from '@/public/inner-black-text.png'
import Link from 'next/link'
import people from '@/components/ui/people.json';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'

function SignUp() {
  return (
    <div className="mx-auto h-screen grid-cols-10 overflow-y-hidden md:grid">
      <div className="bg-sign-up col-span-6 hidden h-screen bg-cover bg-center text-white md:block items-center justify-center">
        <div className=" flex justify-center items-center h-screen flex-col">
          <h1 className="sign text-5xl font-bold">
            Start turning your <br /> ideas into realities{' '}
          </h1>
          <p className="mt-5 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus <br /> illo, aut
            repudiandae consectetur, modi quis ex, laudantium <br /> delectus dolorum unde quibusdam
            dicta sit corrupti aliquam.
          </p>
          <div className=" flex w-full ml-80">
      <AnimatedTooltip items={people} />
    </div>
        </div>
      </div>

      {/* form */}
      <form className="col-span-4 mx-auto flex w-full items-center justify-center self-start px-6 py-20 md:px-10">
        <div className="w-full">
           <Link href="/">
          <Image src={signlogo} alt="logo" width={90} height={90} className="mx-auto md:mx-0" />
         </Link>
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

export default SignUp
