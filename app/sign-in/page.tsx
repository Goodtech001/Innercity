'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import people from '@/json/people.json'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import { useRouter } from 'next/navigation'
import Input from '@/components/input'
import { IInputState } from '@/components/input/useInput'
import Logo from '@/components/logo'

function SignIn() {
  const [email, setEmail] = useState<IInputState>({ value: '' })
  const [password, setPassword] = useState({ value: '' })
  const router = useRouter()

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push('/')
  }

  return (
    <div className="h-screen grid-cols-10 overflow-x-hidden overflow-y-hidden md:grid">
      <div className="flex h-full max-h-svh flex-col items-center overflow-y-auto px-6 py-8 md:col-span-4 md:px-10">
        <div className="my-auto w-full">
          <Link className="mx-auto mb-5 block w-fit md:mx-0" href={'/'}>
            <Logo variant="alt" className="w-24" />
          </Link>

          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <h1 className="mb-5 text-center text-3xl font-bold md:text-left">Sign In</h1>

            <div className="">
              <label className="label" htmlFor="email">
                Email*
              </label>
              <Input
                name="email"
                setState={setEmail}
                state={email}
                type="email"
                required
                placeholder="Enter your email..."
              />
            </div>

            <div className="">
              <label className="label" htmlFor="password">
                Password*
              </label>
              <Input
                name="password"
                setState={setPassword}
                state={password}
                type="password"
                required
                placeholder="Enter your password..."
              />
            </div>

            <button type="submit" id="submit" className="btn-primary mt-5">
              Login
            </button>

            <p className="mt-5 justify-center text-center text-sm">
              Don&apos;t have an Account?{' '}
              <Link href="/sign-up" className="font-bold text-primary">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="bg-sign-in col-span-6 hidden h-screen items-center bg-cover bg-center text-white md:block">
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
    </div>
  )
}

export default SignIn
