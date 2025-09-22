'use client'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react'
import React, { useState } from 'react'

type TTooltipProps = {
  content: string | React.JSX.Element
  children: React.ReactNode
}

export default function Tooltip({ content, children }: TTooltipProps) {
  const [isHovering, setIsHovering] = useState(false)
  const springConfig = { stiffness: 100, damping: 15 }
  const x = useMotionValue(0)
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig)
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig)
  return (
    <>
      <div
        className="group relative border-2"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: 'nowrap',
              }}
              className={`absolute bottom-full right-0 z-10 flex max-w-96 flex-col items-center justify-center rounded-md bg-dark px-4 py-2 shadow-xl`}
            >
              <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-primary to-transparent" />
              {typeof content === 'string' ? (
                <p className="text-wrap text-xs text-white md:text-sm">{content}</p>
              ) : (
                content
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {children}
      </div>
    </>
  )
}
