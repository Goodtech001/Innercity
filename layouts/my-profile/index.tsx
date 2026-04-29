/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Icon } from '@iconify/react'
import { baseUrl } from '@/constants'
import { toast } from 'react-hot-toast'

export default function GlassProfile({ user }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState(user?.avatar || '/avatar.png')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [formData, setFormData] = useState({
    fullName: user?.fullname || '',
    phone: user?.telephone || '',
    email: user?.email || '',
    username: user?.username || '',
    location: user?.location || '',
    bio: user?.bio || '',
    country: user?.country || 'Nigeria',
    birthday: user?.birthday || '',
  })

  // ✅ SMOOTH CURSOR
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const smoothX = useSpring(x, { stiffness: 80, damping: 20 })
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 })
  const rotateX = useTransform(smoothY, [-100, 100], [2, -2])
  const rotateY = useTransform(smoothX, [-100, 100], [-2, 2])

  const handleAvatarClick = () => fileInputRef.current?.click()

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    const preview = URL.createObjectURL(file)
    setAvatar(preview)
  }

  // ✅ UPDATED SAVE HANDLER
  const handleSave = async () => {
    setLoading(true)
    try {
      // 1. Get Token (Checking both common storage locations)
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      // Inside handleSave in GlassProfile.tsx
      window.dispatchEvent(new Event('profileUpdate')) // This triggers the listener in your dropdown

      if (!token) {
        toast.error('Session expired. Please login again.')
        return
      }

      let finalAvatarUrl = avatar

      // 2. Upload Image if changed
      if (selectedFile) {
        const uploadData = new FormData()
        uploadData.append('file', selectedFile)

        const uploadRes = await fetch(`${baseUrl}/uploads`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }, // Most APIs need auth for uploads too
          body: uploadData,
        })
        const uploadJson = await uploadRes.json()
        // Adjust this based on your API response structure (e.g., uploadJson.data.url)
        finalAvatarUrl = uploadJson.url || uploadJson.data?.url || finalAvatarUrl
      }

      // 3. Update Profile
      const response = await fetch(`${baseUrl}/auth/update-profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullname: formData.fullName,
          username: formData.username,
          bio:      formData.bio,
          telephone:formData.phone,
          birthday: formData.birthday,
          location: formData.location,
          country:  formData.country,
          avatar:   finalAvatarUrl,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Profile updated successfully!')

        // 4. Update Local Session Data so changes reflect immediately on refresh
        const storageKeys = ['course-training-profile', 'user'] // Check common keys
        storageKeys.forEach((key) => {
          const stored = localStorage.getItem(key) || sessionStorage.getItem(key)
          if (stored) {
            const parsed = JSON.parse(stored)
            // Deep merge user data
            const updatedUser = {
              ...(parsed.user || parsed),
              fullname: formData.fullName,
              username: formData.username,
              bio: formData.bio,
              telephone: formData.phone,
              location: formData.location,
              avatar: finalAvatarUrl,
            }

            const newData = parsed.user ? { ...parsed, user: updatedUser } : updatedUser
            localStorage.setItem(key, JSON.stringify(newData))
            sessionStorage.setItem(key, JSON.stringify(newData))
          }
        })
      } else {
        toast.error(result.message || 'Failed to update profile')
      }
    } catch (error) {
      console.error('Save Error:', error)
      toast.error('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#eef2ff] p-6">
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
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="mx-auto max-w-5xl rounded-3xl border border-white/40 bg-white/50 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
      >
        <div className="items-center justify-center gap-6 border-b border-white/30 pb-6 md:flex md:justify-start">
          <div className="relative">
            <div className="h-[90px] w-[90px] overflow-hidden rounded-full ring-4 ring-white/40">
              <img src={avatar} className="h-full w-full object-cover" />
            </div>
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

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            { label: 'Full Name', name: 'fullName' },
            { label: 'Username', name: 'username' },
            { label: 'Email', name: 'email', disabled: true },
            { label: 'Phone', name: 'phone' },
            { label: 'Location', name: 'location' },
            { label: 'Bio', name: 'bio' },
          ].map((field) => (
            <div key={field.name} className="group relative">
              <label className="text-xs text-gray-500">{field.label}</label>
              <input
                name={field.name}
                disabled={field.disabled}
                value={(formData as any)[field.name]}
                onChange={(e) => setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-white/30 bg-white/60 px-4 py-3 text-sm outline-none backdrop-blur-md transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-end gap-3">
          <button
            onClick={() => window.location.reload()}
            className="rounded-xl border border-white/30 bg-white/50 px-6 py-2 text-sm hover:bg-white/70"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-70"
          >
            {loading && <Icon icon="line-md:loading-twotone-loop" className="animate-spin" />}
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
