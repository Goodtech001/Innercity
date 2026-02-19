// import { Icon } from 'lucide-react'
import { loginWithGoogle } from '@/app/auth/auth.service'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

function GoogleButton() {
  return (
    <button className='flex btn-white space-x-4' onClick={loginWithGoogle}>
        <Icon icon="devicon:google" width="20" height="20" className='flex justify-center items-center' />
         <p >Sign up with Google</p>
    </button>
  )
}

export default GoogleButton