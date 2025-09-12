import Link from 'next/link'
import React from 'react'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import kingsChatIcon from '@/public/assets/icons/kings-chat-icon.png'
import Logo from '@/components/logo'

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

export default function Footer() {
  return (
    <footer className="bg-footer-grey px-2 py-8 text-white md:px-0 md:pt-16">
      <div className="container flex flex-col justify-between gap-8 md:flex-row">
        <div className="flex w-full max-w-md flex-wrap justify-between gap-6">
          <ul className="flex flex-col gap-1.5 text-sm">
            <h5 className="mb-4 text-lg font-bold !leading-[100%] md:text-xl">Quick Links</h5>
            {quickLinks.map((link) => (
              <Link href={link.link} key={link.label}>
                {link.label}
              </Link>
            ))}
          </ul>

          <ul className="flex flex-col gap-1.5 text-sm">
            <h5 className="mb-4 text-lg font-bold !leading-[100%] md:text-xl">
              Campaign Categories
            </h5>
            {campaignCategoryLinks.map((link) => (
              <Link href={link.link} key={link.label}>
                {link.label}
              </Link>
            ))}
          </ul>
        </div>

        <div className="mt-10 w-full md:mt-0 md:max-w-md">
          <h5 className="mb-4 text-xl font-bold !leading-[120%] md:text-right md:text-2xl">
            Subscribe To Our Newsletter
          </h5>
          <input type="text" className="input-field" placeholder="Enter Your Email..." />
          <div className="mt-2 flex flex-row-reverse flex-wrap items-start justify-between gap-6 md:flex-row">
            <small>we will never spam :)</small>

            <button className="btn-primary w-fit px-10">Send</button>
          </div>
        </div>
      </div>

      <hr className="container my-10 md:mt-20" />

      <div className="container flex flex-col justify-between gap-5 gap-y-8 md:flex-row md:items-center">
        <div className="flex flex-col gap-6 gap-y-6 md:flex-row">
          <Link href={'/'}>
            <Logo variant="white" className="w-24" />
          </Link>
          <div className="flex flex-col gap-2 text-sm">
            <p>
              ©{new Date().getFullYear()} The InnerCity Mission For Children. All Rights Reserved.
            </p>
            <p className="">
              An Initiative of{' '}
              <a target="_blank" href="https://theinnercitymission.ngo/" className="underline">
                The Innercity Mission.
              </a>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href={'https://instagram.com/innercityhq/'}>
            <Icon className="size-7" icon={'ri:instagram-fill'} />
          </Link>

          <Link href={'https://x.com/innercityhq/'}>
            <Icon className="size-7" icon={'fa6-brands:square-x-twitter'} />
          </Link>

          <Link href={'https://www.instagram.com/innercityhq/'}>
            <Image alt="kingschat" className="size-9" width={27} height={27} src={kingsChatIcon} />
          </Link>

          <Link href={'https://facebook.com/OfficialInnerCityMission'}>
            <Icon className="size-7" icon={'uim:facebook-f'} />
          </Link>

          <Link href={'https://linkedin.com/in/TheInnerCityMission'}>
            <Icon className="size-7" icon={'fa6-brands:linkedin-in'} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
