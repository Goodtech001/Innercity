import Image from 'next/image'
import React from 'react'
import par from "../public/par.jpg"
import { LocateIcon } from 'lucide-react'

function Par() {
  return (
    <div className='bg-[#C8974D] rounded w-120  text-white justify-center'>
        <div className='flex p-4  gap-4'>
            <Image src={par} alt='face' width={120} height={120} className='rounded absolute top-650'/>
            <div className='ml-25'>
                <div className='flex justify-between gap-25'>
                    <span className='font-medium'>John Constantine</span>
                    <span>50 Donations</span>
                </div>
                <p>Donated: $3.5m</p>
                <p className='mt-4'>Member of the GEM platform</p>
            </div>
        </div>

        <div className='flex justify-between p-2'>
            <span>~G.E.M~</span>
            <span className='flex'><LocateIcon/> Lagos,Nigeria</span>
        </div>
    </div>
  )
}

export default Par