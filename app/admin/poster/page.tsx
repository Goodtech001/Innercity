/* eslint-disable @next/next/no-img-element */
'use client'

import { useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import * as htmlToImage from 'html-to-image'
import poster from '@/public/assets/images/poster image.png'

/* =====================
   MOCK AUTH / PERMISSIONS
===================== */

const currentUser = {
  id: 'user-1',
  role: 'campaign-owner', // or 'admin'
  campaignIds: ['cmp-1'],
}

const campaigns = [
  { id: 'cmp-1', name: 'Clean Water Project', ownerId: 'user-1' },
  { id: 'cmp-2', name: 'Education Support', ownerId: 'user-2' },
]

/* =====================
   TEMPLATES
===================== */

const templates = [
  {
    id: 'classic',
    name: 'Classic Gradient',
    type: 'gradient',
    className: 'bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500',
  },
  {
    id: 'gold',
    name: 'Luxury Gold',
    type: 'gradient',
    className: 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600',
  },
  {
    id: 'custom',
    name: 'Gold Birthday Frame',
    type: 'image',
    background: '/assets/images/poster image.png',
  },
]

export default function BirthdayPosterPage() {
  const [name, setName] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [template, setTemplate] = useState(templates[2])
  const posterRef = useRef<HTMLDivElement>(null)

  const allowedCampaigns = campaigns.filter(
    (c) => currentUser.role === 'admin' || c.ownerId === currentUser.id,
  )

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  const exportPoster = async () => {
    if (!posterRef.current) return

    const dataUrl = await htmlToImage.toPng(posterRef.current, {
      pixelRatio: 2,
    })

    const link = document.createElement('a')
    link.download = 'birthday-poster.png'
    link.href = dataUrl
    link.click()
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Birthday Poster Creator</h1>
        <p className="text-gray-500">Create branded birthday posters for your campaigns.</p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Controls */}
        <section className="space-y-6 rounded-2xl border bg-white p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold">Poster Settings</h2>

          <div>
            <label className="text-sm text-gray-600">Celebrant Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Upload Photo</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>

          <div>
            <label className="text-sm text-gray-600">Template Style</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t)}
                  className={`rounded-lg border p-2 text-xs ${
                    template.id === t.id
                      ? 'border-blue-600 ring-2 ring-blue-500'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Campaign</label>
            <select className="mt-1 w-full rounded-lg border px-4 py-2">
              {allowedCampaigns.map((c) => (
                <option key={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Preview */}
       <section className="flex justify-center lg:col-span-2">
          <div
            ref={posterRef}
            className="relative aspect-[7/4] w-[300px] overflow-hidden sm:w-[340px] md:w-[380px]"
          >
            {/* PHOTO BEHIND THE POSTER */}
            {image && (
              <img
                src={image}
                alt="Celebrant"
                className="aspect-circle absolute left-1/2 z-0 w-[62%] -translate-x-1/2 object-cover bg-center"
              />
            )}

            {/* NAME ON GOLD STRIP */}
            <div className="absolute bottom-[22%] left-1/2 z-10 w-[75%] -translate-x-1/2">
              <div className="rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 py-2 text-center shadow-md">
                <p className="truncate px-3 text-sm font-bold text-gray-900 sm:text-base">
                  {name || 'Celebrant Name'}
                </p>
              </div>
            </div>

            {/* POSTER PNG ON TOP */}
            <img
              src="/assets/images/poster image.png"
              alt="Birthday Poster Frame"
              className="pointer-events-none absolute inset-0 z-20 h-full w-full object-cover"
            />
          </div>
        </section>
      </div>

      <section className="flex justify-end gap-4">
        <button
          onClick={exportPoster}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Export as Image
        </button>
      </section>
    </div>
  )
}
