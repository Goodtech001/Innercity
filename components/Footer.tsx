import Link from 'next/link'
import React from 'react'
import { Input } from './ui/input'
import mission from '../public/missionlogo.png'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import kings from '../public/kingslogo.png'

const quickLinks = [
  { label: 'Create Your Campaign', link: '' },
  { label: 'Support Campaign', link: '' },
  { label: 'Campaign Resources', link: '' },
  { label: 'About Fundraiser', link: '' },
]

const campaignCategoryLinks = [
  { label: 'Health & Welfare', link: '' },
  { label: 'Child Health & Nutrition', link: '' },
  { label: 'Child Care & Support', link: '' },
  { label: 'Family Support Program', link: '' },
  { label: 'Send Portions', link: '' },
]

function Footer() {
  return (
    <footer className="bg-footer-grey px-2 py-8 text-white md:px-0 md:pt-16">
      <div className="container flex flex-col justify-between gap-8 md:flex-row">
        <div className="flex w-full max-w-md flex-wrap justify-between gap-6">
          <ul className="flex flex-col gap-1.5">
            <h5 className="mb-4 text-lg font-bold !leading-[100%] md:text-xl">Quick Links</h5>
            {quickLinks.map((link) => (
              <Link href={link.link} key={link.label}>
                {link.label}
              </Link>
            ))}
          </ul>

          <ul className="flex flex-col gap-1.5">
            <h5 className="mb-4 text-lg font-bold !leading-[100%] md:text-xl">
              Campaign categories
            </h5>
            {campaignCategoryLinks.map((link) => (
              <Link href={link.link} key={link.label}>
                {link.label}
              </Link>
            ))}
          </ul>
        </div>

        <div className="mt-10 w-full md:mt-0 md:max-w-md">
          <h5 className="mb-4 text-right text-xl font-bold !leading-[120%] md:text-2xl">
            Subscribe To Our Newsletter
          </h5>
          <input type="text" className="input-field" placeholder="Enter Your Email..." />
          <div className="mt-2 flex flex-wrap items-start justify-between gap-6">
            <small>we will never spam :)</small>

            <button className="btn-primary w-fit px-10">Send</button>
          </div>
        </div>
      </div>

      <div className="mt-20 flex justify-between border-t-2">
        <div className="mt-6 flex space-x-10">
          <div>
            <Image src={mission} alt="logo" width={100} height={100} />
          </div>
          <div className="text-sm md:ml-5 md:mt-3">
            <p>©2025 The InnerCity Mission for Children. All Rights Reserved.</p>
            <p className="">
              An Initiative of{' '}
              <Link target="_blank" href="https://theinnercitymission.ngo/" className="underline">
                The Innercity Mission.
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-6 flex space-x-3">
          <Link target="_blank" href="https://www.instagram.com/innercityhq/">
            {' '}
            <Icon icon={'ri:instagram-fill'} className="mt-3 size-6 text-2xl" />
          </Link>
          <Link target="_blank" href="https://www.facebook.com/OfficialInnerCityMission">
            {' '}
            <Icon icon={'ic:baseline-facebook'} className="mt-3 size-6 text-2xl" />
          </Link>
          <Link target="_blank" href="https://x.com/innercityhq">
            {' '}
            <Icon icon={'streamline-logos:x-twitter-logo-block'} className="mt-3 size-6 text-2xl" />
          </Link>
          <Link target="_blank" href="https://www.linkedin.com/in/TheInnerCityMission">
            {' '}
            <Icon icon={'mdi:linkedin'} className="mt-3 size-6 text-2xl" />
          </Link>
          <Link target="_blank" href="https://web.kingsch.at/superusers/icm4c">
            <Image src={kings} alt="kings" width={40} height={40} />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
