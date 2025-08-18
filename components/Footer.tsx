import Link from 'next/link'
import React from 'react'
import { Input } from './ui/input'
import mission from '../public/missionlogo.png'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import kings from '../public/kingslogo.png'

function Footer() {
  return (
    <footer className="bg-[#404756] p-6 text-white">
      <div className="justify-between md:flex">
        <div className="md:space-x-17 ml-20 flex gap-10 md:ml-0">
          <div className="">
            <h1 className="mb-4 text-2xl font-bold">Quick Links</h1>

            <ul className="md:text-0 mt-1 text-sm">
              <Link href="">Create your campaign</Link>
            </ul>
            <ul className="md:text-0 mt-1 text-sm">
              <Link href="">Support campaign</Link>
            </ul>
            <ul className="md:text-0 mt-1 text-sm">
              <Link href="">Campaign Resources</Link>
            </ul>
            <ul className="md:text-0 mt-1 text-sm">
              <Link href="">About Fundraiser</Link>
            </ul>
          </div>
          <div>
            <h1 className="mb-4 text-2xl font-bold">Campaign categories</h1>
            <ul className="md:text-0 mt-1 text-sm">
              <Link href="">Health & Welfare</Link>
            </ul>
            <ul className="md:text-0 mt-1 text-sm">
              <Link href="">Child Health & Nutrition</Link>
            </ul>
            <ul className="md:text-0 mt-1 text-sm">
              <Link href="">Child Care & Support</Link>
            </ul>
            <ul className="md:text-0 mt-1 text-sm">
              <Link href="">Family Support Program</Link>
            </ul>
            <ul className="md:text-0 mt-1 text-sm">
              <Link href="">Send Portions</Link>
            </ul>
          </div>
        </div>
        <div className="mt-5 md:mt-0">
          <h1 className="justify-center text-center font-bold md:text-2xl">
            Subscribe To Our Newsletter
          </h1>
          <Input
            type="text"
            placeholder="Enter your Email"
            className="md:w-400 sm:w-100 ml-15 mt-4 h-12 bg-white outline-1 outline-blue-700 md:ml-0"
          />
          <div className="mt-4 flex justify-center justify-between md:gap-0">
            <div>
              <p>We will never spam you:-) </p>
            </div>
            <div>
              <button className="btn-primary px-8 py-4 text-white">Send</button>
            </div>
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
