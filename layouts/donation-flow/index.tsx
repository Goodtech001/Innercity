'use client'

import { motion } from 'framer-motion'

export default function DonationFlow() {
  const nodes = [
    { x: 50, y: 20, label: 'Donor' },
    { x: 20, y: 70, label: 'Donor' },
    { x: 80, y: 70, label: 'Donor' },
  ]

  return (
    <div className="relative h-[420px] w-full rounded-3xl border bg-white shadow-xl overflow-hidden">

      {/* CENTRAL HUB */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex items-center justify-center">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg" />

          {/* PULSE */}
          <div className="absolute h-32 w-32 rounded-full bg-blue-400/20 animate-ping" />
        </div>
      </div>

      {/* DONOR NODES */}
      {nodes.map((node, i) => (
        <div
          key={i}
          className="absolute"
          style={{ top: `${node.y}%`, left: `${node.x}%` }}
        >
          <div className="h-10 w-10 rounded-full bg-gray-100 border flex items-center justify-center text-xs">
            💙
          </div>
        </div>
      ))}

      {/* FLOWING LINES */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-r from-transparent via-blue-400 to-transparent h-[2px]"
          style={{
            top: `${node.y}%`,
            left: `${node.x}%`,
            width: '40%',
            transformOrigin: 'left',
          }}
          animate={{
            opacity: [0, 1, 0],
            x: [0, 100],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* LABEL */}
      <div className="absolute bottom-4 left-4 text-sm text-gray-500">
        Real-time donation flow
      </div>
    </div>
  )
}