import React from 'react'

type Props = {
  children: React.ReactNode
  speed?: number
  className?: string
  direction?: 'left' | 'right'
}

const Marquee = ({ children, direction, className, speed = 50 }: Props) => {
  return (
    <div className={`relative box-border w-full overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className={`${direction == 'right' ? 'animate-marquee-right left-0' : 'animate-marquee right-0'} whitespace-nowrap text-right will-change-transform`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
    </div>
  )
}

export default Marquee
