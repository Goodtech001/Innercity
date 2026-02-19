/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import KingsChatButton from '@/components/kingschat-button'
import GoogleButton from '@/components/google-button'
import { encryptClient } from '@/utils/crypt.client'
import { postLoginService, postRegisterService } from '../auth/auth.service'

export default function SignUp() {
  // const [country, setCountry] = useState({ value: '' })
  // const [zone, setZone] = useState({ value: '' })
  const [name, setName] = useState('') //?? optionally you can define the type to see the values that are available when interacted with
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      // await postRegisterService({
      //   name,
      //   email,
      //   password,
      //   phoneNumber,
      //   birthDate,
      // })

      // router.push("/sign-in")

      const data = await postRegisterService({
        name,
        email,
        password,
        phoneNumber,
        birthDate,
      })

      sessionStorage.setItem('course-training-profile', JSON.stringify(data))

      localStorage.setItem('token', data.token)

      router.push('/')
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
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

            <div className="flex flex-col">
              <label className="label" htmlFor="name">
                Full Name*
              </label>
              <input
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                required
                placeholder="Enter your name..."
                className="rounded border-2 border-gray-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="">
                <label className="label" htmlFor="email">
                  Email*
                </label>
                <input
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  required
                  placeholder="Enter your email..."
                  className="w-full rounded border-2 border-gray-300"
                />
              </div>

              <div className="">
                <label className="label" htmlFor="birthDate">
                  Date of Birth
                </label>
                <input
                  name="birthDate"
                  onChange={(e) => setBirthDate(e.target.value)}
                  value={birthDate}
                  type="date"
                  placeholder="Select Birth Month"
                  className="w-full rounded border-2 border-gray-300"
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
                value={phoneNumber}
                onChange={(phone) => setPhoneNumber(phone)}
                inputClass="!w-full !h-11"
                buttonClass=""
                containerClass="input-field border-text/25 flex items-center !border bg-transparent px-0 py-0"
              />
            </div>

            <div className="flex flex-col">
              <label className="label" htmlFor="password">
                Password*
              </label>
              <input
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                required
                placeholder="Enter your password..."
                className="rounded border-2 border-gray-300"
              />
            </div>

            <button type="submit" id="submit" className="btn-primary mt-5">
              {loading ? 'Creating...' : 'Create Account'}
            </button>
            <KingsChatButton />
            <GoogleButton />

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

// export default SignUp
