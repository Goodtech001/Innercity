/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Icon } from '@iconify/react'

export default function GlassProfile({ user }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [avatar, setAvatar] = useState(user?.avatar || '/avatar.png')

  const [formData, setFormData] = useState({
    fullName: user?.fullname || '',
    phone: user?.telephone || '',
    email: user?.email || '',
    username: user?.fullname || '',
    location: '',
    bio: '',
  })

  // ✅ SMOOTH CURSOR (no jitter)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const smoothX = useSpring(x, { stiffness: 80, damping: 20 })
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 })

  const rotateX = useTransform(smoothY, [-100, 100], [2, -2])
  const rotateY = useTransform(smoothX, [-100, 100], [-2, 2])

  // ✅ HANDLE IMAGE UPLOAD
  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const preview = URL.createObjectURL(file)
    setAvatar(preview)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#eef2ff] p-6">
      {/* ambient glow */}
      <div className="absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-purple-400/20 blur-3xl" />

      <motion.div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          x.set(e.clientX - rect.left - rect.width / 2)
          y.set(e.clientY - rect.top - rect.height / 2)
        }}
        onMouseLeave={() => {
          x.set(0)
          y.set(0)
        }}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200, // 🔥 THIS stabilizes depth
        }}
        className="mx-auto max-w-5xl rounded-3xl border border-white/40 bg-white/50 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
      >
        {/* HEADER */}
        <div className="md:flex items-center md:justify-start justify-center gap-6 border-b border-white/30 pb-6">
          {/* AVATAR */}
          <div className="relative">
            <Image
              src={avatar}
              alt=""
              width={90}
              height={90}
              className="rounded-full object-cover ring-4 ring-white/40"
            />

            {/* CAMERA BUTTON (WORKING) */}
            <button
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 rounded-full bg-white p-2 shadow-lg transition hover:scale-110"
            >
              <Icon icon="mdi:camera" />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {/* USER INFO */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{formData.fullName || 'Your Name'}</h2>

            <p className="text-sm text-gray-500">@{formData.username}</p>

            <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
              <span>🌍 {formData.location || 'No location'}</span>
              <span>•</span>
              <span>📧 {formData.email}</span>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            { label: 'Full Name', name: 'fullName' },
            { label: 'Username', name: 'username' },
            { label: 'Email', name: 'email' },
            { label: 'Phone', name: 'phone' },
            { label: 'Location', name: 'location' },
            { label: 'Bio', name: 'bio' },
          ].map((field) => (
            <div key={field.name} className="group relative">
              <label className="text-xs text-gray-500">{field.label}</label>

              <input
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [field.name]: e.target.value,
                  }))
                }
                className="mt-1 w-full rounded-xl border border-white/30 bg-white/60 px-4 py-3 text-sm outline-none backdrop-blur-md transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="mt-10 flex justify-end gap-3">
          <button className="rounded-xl border border-white/30 bg-white/50 px-6 py-2 text-sm hover:bg-white/70">
            Cancel
          </button>

          <button className="rounded-xl bg-primary px-6 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]">
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  )
}
