'use client'
import { Icon } from '@iconify/react'
import { motion, Transition } from 'framer-motion'
import Link from 'next/link'

export default function BenefitsMetricsStrip() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transitionSpring: Transition<any> = {
    type: 'spring',
    stiffness: 150,
    damping: 12, // controls how "bouncy" vs "smooth"
    mass: 1, // adjust weightiness
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitionSpring}
      className="bg-complementary py-3 text-dark"
    >
      <div className="container flex flex-wrap items-center justify-between gap-5 gap-y-4 md:flex-row">
        <Link
          className="flex items-center gap-3"
          target="_blank"
          href={'https://kingsforms.online/form/respond/LWF-ZG105633136791'}
        >
          <Icon icon={'mingcute:world-fill'} className="size-6 text-2xl" />
          <p className="font-semibold underline">Join a Global Network of Changemakers</p>
        </Link>
        <Link className="flex items-center gap-3" target="_blank" href={'https://icm.ngo/gems'}>
          <Icon icon={'ri:seedling-fill'} className="size-6 text-2xl" />
          <p className="font-semibold underline">Give Every Month (G.E.M)</p>
        </Link>
        <Link className="flex items-center gap-3" href={'/'}>
          <Icon icon={'ri:progress-7-line'} className="size-6 text-2xl" />
          <p className="font-semibold underline">Track Your Impact in Real Time</p>
        </Link>
      </div>
    </motion.div>
  )
}
