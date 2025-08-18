import Link from 'next/link'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import mission from "../public/missionlogo.png"
import { Icon } from '@iconify/react'
import Image from 'next/image'
import kings from "../public/kingslogo.png"
import { FacebookIcon, InstagramIcon, Linkedin, TwitterIcon } from 'lucide-react'
import { IconBrandFacebookFilled, IconBrandInstagram, IconBrandInstagramFilled, IconBrandLinkedinFilled, IconBrandTwitterFilled } from '@tabler/icons-react'

function Footer() {
  return (
    <footer className='p-6 bg-[#404756] text-white'>
    <div className='md:flex justify-between '>
       <div className='flex md:space-x-17 gap-10 md:ml-0 ml-20 '>
         <div className=''>
            <h1 className='text-2xl font-bold mb-4'>Quick Links</h1>
            
            <ul className='md:text-0 text-sm mt-1'><Link href="">Create your campaign</Link></ul>
            <ul className='md:text-0 text-sm mt-1'><Link href="">Support campaign</Link></ul>
            <ul className='md:text-0 text-sm mt-1'><Link href="">Campaign Resources</Link></ul>
            <ul className='md:text-0 text-sm mt-1'><Link href="">About Fundraiser</Link></ul>
            
        </div>
        <div>
            <h1 className='text-2xl font-bold mb-4'>Campaign categories</h1>
            <ul className='md:text-0 text-sm mt-1'><Link href="">Health & Welfare</Link></ul>
            <ul className='md:text-0 text-sm mt-1'><Link href="">Child Health & Nutrition</Link></ul>
            <ul className='md:text-0 text-sm mt-1'><Link href="">Child Care & Support</Link></ul>
            <ul className='md:text-0 text-sm mt-1'><Link href="">Family Support Program</Link></ul>
            <ul className='md:text-0 text-sm mt-1'><Link href="">Send Portions</Link></ul>
        </div>
       </div>
        <div className='md:mt-0 mt-5'>
            <h1 className='md:text-2xl font-bold justify-center text-center'>Subscribe To Our Newsletter</h1>
            <Input type='text' placeholder='Enter your Email' className='md:w-400 sm:w-100 h-12 outline-1 outline-blue-700 mt-4 md:ml-0 ml-15 bg-white'/>
            <div className='flex justify-between justify-center mt-4 md:gap-0'>
                <div>
                    <p>We will never spam you:-) </p>
                </div>
                <div>
                    <Button className='py-4 px-8 btn-primary text-white'>Send</Button>
                </div>
            </div>
        </div>
    </div>

    <div className='flex justify-between mt-20 border-t-2 '>
       <div className='flex space-x-10 mt-6'>
         <div>
           <Image src={mission} alt='logo' width={100} height={100}/>
        </div>
        <div className='text-sm md:mt-3 md:ml-5 '>
            <p>©2025 The InnerCity Mission for Children. All Rights Reserved.</p>
            <p className=''>An Initiative of  <Link target="_blank" href="https://theinnercitymission.ngo/" className='underline'>The Innercity Mission.</Link></p>
        </div>
       </div>
        <div className='flex space-x-3 mt-6 '>
            <Link target="_blank" href="https://www.instagram.com/innercityhq/"> <Icon icon={'ri:instagram-fill'} className="size-6 text-2xl mt-3" /></Link>
            <Link target="_blank" href="https://www.facebook.com/OfficialInnerCityMission"> <Icon icon={'ic:baseline-facebook'} className="size-6 text-2xl mt-3" /></Link>
            <Link target="_blank" href="https://x.com/innercityhq"> <Icon icon={'streamline-logos:x-twitter-logo-block'} className="size-6 text-2xl mt-3" /></Link>
            <Link target="_blank" href="https://www.linkedin.com/in/TheInnerCityMission"> <Icon icon={'mdi:linkedin'} className="size-6 text-2xl mt-3" /></Link>
            <Link target="_blank" href="https://web.kingsch.at/superusers/icm4c"><Image src={kings} alt='kings' width={40} height={40} /></Link>
        </div>
    </div>
    </footer>
  )
}

export default Footer