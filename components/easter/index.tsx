'use client'

import { motion } from 'framer-motion'

const eggs = [
  '/assets/images/easter-egg.png',
  '/assets/images/easter-egg2.png',
  '/assets/images/easter-egg3.png',
  '/assets/images/easter-egg-4.png',
]

export default function FloatingEasterEggs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-40">
      {Array.from({ length: 12 }).map((_, i) => {
        const randomEgg = eggs[Math.floor(Math.random() * eggs.length)]

        const startX = Math.random() * 100
        const duration = 15 + Math.random() * 10
        const delay = Math.random() * 10

        return (
          <motion.img
            key={i}
            src={randomEgg}
            className="absolute w-10 md:w-14 opacity-80"
            style={{
              left: `${startX}%`,
              top: '110%',
            }}
            animate={{
              y: ['0%', '-130vh'],
              x: ['0%', `${Math.random() * 80 - 40}px`],
              rotate: [0, 360],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )
      })}
    </div>
  )
}