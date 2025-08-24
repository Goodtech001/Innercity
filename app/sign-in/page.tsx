import Image from 'next/image'
import React from 'react'
import signlogo from '@/public/inner-black-text.png'
import Link from 'next/link'
import people from '@/components/ui/people.json';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'


function SignIn() {
  
  return (
    <div className="h-screen grid-cols-10 overflow-x-hidden overflow-y-hidden md:grid">
      {/* form */}
      <form className="col-span-4 mx-auto my-auto flex w-full items-center justify-center px-6 py-20 md:px-10">
        <div className="w-full">
         <Link href="/">
          <Image src={signlogo} alt="logo" width={90} height={90} className="mx-auto md:mx-0" />
         </Link>
          <h1 className="mb-5 mt-5 text-center font-sans text-3xl font-bold text-black md:text-left">
            {' '}
            Sign In
          </h1>
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
              placeholder="Enter your email"
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
              Dont have an Account?{' '}
              <Link href="/sign-up" className="font-bold text-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </form>

      <div className="bg-sign-in col-span-6 hidden h-screen items-center bg-cover bg-center text-white md:block">
        <div className="flex justify-center items-center h-screen flex-col">
          <h1 className="sign text-5xl font-bold">
            Start turning your <br /> ideas into realities{' '}
          </h1>
          <p className="mt-5 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus <br /> illo, aut
            repudiandae consectetur, modi quis ex, laudantium <br /> delectus dolorum unde quibusdam
            dicta sit corrupti aliquam.
          </p>
           <div className="ml-80 flex w-full ">
      <AnimatedTooltip items={people} />
    </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
