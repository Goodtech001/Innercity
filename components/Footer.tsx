import Link from 'next/link'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import mission from "../public/missionlogo.png"
import Image from 'next/image'
import { FacebookIcon, InstagramIcon, Linkedin, TwitterIcon } from 'lucide-react'

function Footer() {
  return (
    <footer className='p-6 bg-[#404756] text-white'>
    <div className='md:flex justify-between '>
       <div className='flex space-x-17 md:ml-0 ml-20 '>
         <div className=''>
            <h1 className='text-1xl font-bold mb-4'>Quick Links</h1>
            
            <ul className='md:text-0 text-sm'><Link href="">Create your campaign</Link></ul>
            <ul className='md:text-0 text-sm'><Link href="">Support campaign</Link></ul>
            <ul className='md:text-0 text-sm'><Link href="">Campaign Resources</Link></ul>
            <ul className='md:text-0 text-sm'><Link href="">About Fundraiser</Link></ul>
            
        </div>
        <div>
            <h1 className='text-1.5xl font-bold mb-4'>Campaign categories</h1>
            <ul className='md:text-0 text-sm'><Link href="">Health & Welfare</Link></ul>
            <ul className='md:text-0 text-sm'><Link href="">Child Health & Nutrition</Link></ul>
            <ul className='md:text-0 text-sm'><Link href="">Child Care & Support</Link></ul>
            <ul className='md:text-0 text-sm'><Link href="">Family Support Program</Link></ul>
            <ul className='md:text-0 text-sm'><Link href="">Send Portions</Link></ul>
        </div>
       </div>
        <div className='md:mt-0 mt-5'>
            <h1 className='md:text-2xl font-bold justify-center text-center'>Subscribe To Our Newsletter</h1>
            <Input type='text' placeholder='Enter your Email' className='w-100 h-12 outline-1 outline-blue-700 mt-4 md:ml-0 ml-15 bg-white'/>
            <div className='flex md:justify-between justify-center mt-4 md:gap-0 gap-25'>
                <div>
                    <p>We will never spam you:-) </p>
                </div>
                <div>
                    <Button className='py-4 px-8 bg-blue-700 text-white'>Send</Button>
                </div>
            </div>
        </div>
    </div>

    <div className='flex justify-between mt-20 border-t-2 '>
       <div className='flex space-x- mt-6'>
         <div>
           <Image src={mission} alt='logo' width={50} height={50}/>
        </div>
        <div className='md:text-sm text-xs'>
            <p>©2025 The InnerCity Mission for Children. All Rights Reserved.</p>
            <p className='text-center'>An Initiative of <Link href="" className='underline'>The Innercity Mission.</Link></p>
        </div>
       </div>
        <div className='flex space-x-2 mt-6 w-20'>
            <InstagramIcon />
            <FacebookIcon />
            <Linkedin />
            <TwitterIcon />
        </div>
    </div>
    </footer>
  )
}

export default Footer