"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

function Newpage1() {
    const router = useRouter();

    const handleClick2 = () => {
        router.push("/new-page2")
    }
  return (
    <div>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil temporibus, sed ad obcaecati veritatis consectetur optio iure minima magnam nam praesentium mollitia ea blanditiis veniam aliquam eos dolor tempore hic quis unde molestias. Placeat molestias rerum molestiae necessitatibus velit consequuntur, sunt, fuga doloremque, officia libero deleniti autem ab impedit odit?</p>
      <button onClick={handleClick2} className='btn-primary w-fit'>Next</button>
    </div>
  )
}

export default Newpage1
