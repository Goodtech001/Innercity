/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import kingsChatIcon from '@/public/assets/icons/kings-chat-icon.png'
import Logo from '@/components/logo'
import axios from 'axios'

const quickLinks = [
  { label: 'Create Your Campaign', link: '/campaigns/create' },
  { label: 'Support Campaign', link: '/campaigns' },
  { label: 'Campaign Resources', link: '/resources' },
  { label: 'About Fundraiser', link: '/about' },
]

const campaignCategoryLinks = [
  { label: 'food campaign', link: '/campaigns?category=food' },
  { label: 'Education campaign', link: '/campaigns?category=education' },
  { label: 'Women Empowerment', link: '/campaigns?category=women' },
  { label: 'Community Development', link: '/campaigns?category=community' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setError('Please enter your email')
      return
    }

    try {
      setLoading(true)
      setError(null)
      setMessage(null)

      await axios.post('https://fundraise-api.onrender.com/api/v1/newsletter/subscribe', { email })

      // setMessage(data.message)

      setMessage('Subscribed successfully 🎉')
      setEmail('')
    } catch (err: any) {
      console.error('Newsletter error:', err)

      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError('Subscription failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-footer-grey px-2 py-8 text-white md:px-0 md:pt-16">
      <div className="container flex flex-col justify-between gap-8 md:flex-row">
        <div className="flex w-full max-w-md flex-wrap justify-between gap-6">
          <ul className="flex flex-col gap-1.5 text-sm">
            <h5 className="mb-4 text-lg font-bold md:text-xl">Quick Links</h5>
            {quickLinks.map((link) => (
              <Link href={link.link} key={link.label} className="hover:underline">
                {link.label}
              </Link>
            ))}
          </ul>

          <ul className="flex flex-col gap-1.5 text-sm">
            <h5 className="mb-4 text-lg font-bold md:text-xl">Campaign Categories</h5>
            {campaignCategoryLinks.map((link) => (
              <Link href={link.link} key={link.label} className="hover:underline">
                {link.label}
              </Link>
            ))}
          </ul>
        </div>

        {/* ================= NEWSLETTER ================= */}
        <div className="mt-10 w-full md:mt-0 md:max-w-md">
          <h5 className="mb-4 text-xl font-bold md:text-right md:text-2xl">
            Subscribe To Our Newsletter
          </h5>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field w-full"
            placeholder="Enter Your Email..."
          />

          <div className="mt-2 flex flex-row-reverse flex-wrap items-start justify-between gap-6 md:flex-row">
            <small>we will never spam :)</small>

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="btn-primary w-fit px-10 disabled:opacity-60"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>

          {message && <p className="mt-2 text-sm text-green-400">{message}</p>}

          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </div>
      </div>

      <hr className="container my-10 md:mt-20" />

      <div className="container flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div className="flex flex-col gap-6 md:flex-row">
          <Link href="/">
            <Logo variant="white" className="w-24" />
          </Link>
          <div className="flex flex-col gap-2 text-sm">
            <p>
              ©{new Date().getFullYear()} The InnerCity Mission For Children. All Rights Reserved.
            </p>
            <p>
              An Initiative of{' '}
              <a target="_blank" href="https://theinnercitymission.ngo/" className="underline">
                The Innercity Mission.
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="https://instagram.com/innercityhq/">
            <Icon className="size-7" icon="ri:instagram-fill" />
          </Link>
          <Link href="https://x.com/innercityhq/">
            <Icon className="size-7" icon="fa6-brands:square-x-twitter" />
          </Link>
          <Link href="https://www.kingschat.com/innercityhq/">
            <Image alt="kingschat" className="size-9" width={27} height={27} src={kingsChatIcon} />
          </Link>
          <Link href="https://facebook.com/OfficialInnerCityMission">
            <Icon className="size-7" icon="uim:facebook-f" />
          </Link>
          <Link href="https://linkedin.com/in/TheInnerCityMission">
            <Icon className="size-7" icon="fa6-brands:linkedin-in" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
