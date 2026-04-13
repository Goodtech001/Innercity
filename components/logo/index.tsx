import Image from 'next/image'
import logo from '@/public/assets/icons/logo.png'
import logoWhite from '@/public/assets/icons/logo-white.png'
import logoAlt from '@/public/assets/icons/logo-black-text.png'

type prop = {
  className?: string
  variant?: 'default' | 'alt' | 'white'
}

export default function Logo({ className, variant = 'default' }: prop) {
  let logoSrc = logo

  if (variant === 'alt') {
    logoSrc = logoAlt
  } else if (variant === 'white') {
    logoSrc = logoWhite
  }

  return (
    <>
      <Image
        alt="icm-logo"
        src={logoSrc}
        className={`object-contain ${className}`}
        width={40}
        height={40}
        unoptimized
      />
    </>
  )
}
