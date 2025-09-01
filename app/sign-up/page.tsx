'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import signlogo from '@/public/inner-black-text.png'
import Link from 'next/link'
import people from '@/json/people.json'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import { useRouter } from 'next/navigation'

function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter();


const handleSignUp = (e: React.FormEvent) => {
  e.preventDefault(); // prevent page refresh
    // Simulate a sign-up request (replace with your actual API call)
    // Sign-up successful, redirect to login page
    router.push("/sign-in")
  }

  return (
    <div className="mx-auto h-screen grid-cols-10 overflow-y-hidden md:grid">
      <div className="bg-sign-up col-span-6 hidden h-screen items-center justify-center bg-cover bg-center text-white md:block">
        <div className="mx-40 flex h-screen flex-col justify-center">
          <h1 className="max-w-md text-5xl font-bold">Together, we can make a difference.</h1>
          <p className="mt-5 text-sm">
            Every small act of kindness begins here. Join our community to give, share, or ignite
            your own fundraiser today. Create an account to support inspiring causes and launch your
            own impactful campaign.
          </p>
          <div className="flex w-full">
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
          <h1 className="mb-5 mt-5 text-center font-sans text-3xl font-bold text-textcolor md:text-left">
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" id="submit" className="btn-primary mt-5" onClick={handleSignUp}>
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
