'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import people from '@/json/people.json'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import { useRouter } from 'next/navigation'
import Input from '@/components/input'
import { IInputState } from '@/components/input/useInput'
import Logo from '@/components/logo'
import PhoneInput from 'react-phone-input-2'

function SignUp() {
  // const [country, setCountry] = useState({ value: '' })
  // const [zone, setZone] = useState({ value: '' })
  const [name, setName] = useState<IInputState>({ value: '' }) //?? optionally you can define the type to see the values that are available when interacted with
  const [phoneNumber, setPhoneNumber] = useState({ value: '' })
  const [email, setEmail] = useState({ value: '' })
  const [birthDate, setBirthDate] = useState({ value: '' })
  const [password, setPassword] = useState({ value: '' })
  const router = useRouter()

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push('/')
  }

  return (
    <div className="h-screen grid-cols-10 overflow-x-hidden overflow-y-hidden md:grid">
      <div className="bg-sign-up col-span-6 hidden h-screen items-center bg-cover bg-center text-white md:block">
        <div className="flex h-screen flex-col justify-center md:mx-20 lg:mx-40">
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

      <div className="flex h-full max-h-svh flex-col items-center overflow-y-auto px-6 py-8 md:col-span-4 md:px-10">
        <div className="my-auto w-full">
          <Link className="mx-auto mb-5 block w-fit md:mx-0" href={'/'}>
            <Logo variant="alt" className="w-24" />
          </Link>

          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <h1 className="mb-5 text-center text-3xl font-bold md:text-left">Sign Up</h1>

            <div className="">
              <label className="label" htmlFor="name">
                Full Name*
              </label>
              <Input
                name="name"
                setState={setName}
                state={name}
                type="text"
                required
                placeholder="Enter your name..."
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
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
                <label className="label" htmlFor="birthDate">
                  Date of Birth
                </label>
                <Input
                  name="birthDate"
                  setState={setBirthDate}
                  state={birthDate}
                  type="date"
                  placeholder="Select Birth Month"
                />
              </div>
            </div>

            <div className="">
              <label className="label" htmlFor="phoneNumber">
                Phone Number
              </label>
              <PhoneInput
                country={'ng'}
                placeholder="Phone Number"
                value={phoneNumber.value}
                onChange={(phone) => setPhoneNumber({ value: phone })}
                inputClass="!w-full !h-11 "
                buttonClass=""
                containerClass="input-field border-text/25 flex items-center !border bg-transparent px-0 py-0"
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
              Create account
            </button>

            <p className="mt-5 justify-center text-center text-sm">
              Already have an Account?{' '}
              <Link href="/sign-in" className="font-bold text-primary">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
