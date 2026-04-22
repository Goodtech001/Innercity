/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useRef, useState } from 'react'
import * as htmlToImage from 'html-to-image'
import { Icon } from '@iconify/react'
import { toast } from 'react-hot-toast'

/* =====================
   MOCK DATA (Replace with your actual state/props)
===================== */
const templates = [
  {
    id: "gold",
    name: "Luxury Gold",
    type: "image",
    background: "/assets/images/poster image.png", // Ensure this path is correct
  },
  {
    id: "classic",
    name: "Classic Gradient",
    type: "gradient",
    className: "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500",
  },
  {
    id: "blue",
    name: "Ocean Blue",
    type: "gradient",
    className: "bg-gradient-to-br from-blue-500 to-cyan-400",
  },
];

export default function BirthdayPosterPage() {
  const [name, setName] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [template, setTemplate] = useState(templates[0])
  const [loading, setLoading] = useState(false)
  const posterRef = useRef<HTMLDivElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  const exportPoster = async () => {
    if (!posterRef.current) return
    setLoading(true)
    try {
      const dataUrl = await htmlToImage.toPng(posterRef.current, {
        pixelRatio: 3, // Higher quality for printing
        cacheBust: true,
      })

      const link = document.createElement('a')
      link.download = `${name || 'birthday'}-poster.png`
      link.href = dataUrl
      link.click()
      toast.success("Poster downloaded!")
    } catch (err) {
      toast.error("Failed to export image")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="mb-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">Poster Creator</h1>
        <p className="text-gray-500">Create branded birthday posters instantly.</p>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12">
        
        {/* ✅ LEFT: CONTROLS (4 Columns) */}
        <section className="lg:col-span-5 space-y-6 rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 border-b pb-4">
            <Icon icon="solar:pen-new-square-bold" className="text-primary text-xl" />
            <h2 className="font-bold">Customize Details</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase text-gray-400">Celebrant Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter celebrant name..."
                className="mt-1 w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-gray-400">Celebrant Photo</label>
              <div className="mt-2 flex items-center gap-4">
                <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-6 text-gray-500 transition hover:bg-gray-50">
                  <Icon icon="solar:camera-add-bold" className="text-2xl" />
                  <span className="text-sm">Click to upload</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-gray-400">Select Template</label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t)}
                    className={`flex items-center gap-2 rounded-xl border p-3 text-left transition ${
                      template.id === t.id 
                      ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                      : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`h-4 w-4 rounded-full ${t.type === 'image' ? 'bg-amber-400' : t.className}`} />
                    <span className="text-xs font-semibold">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={exportPoster}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-bold text-white shadow-lg transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? <Icon icon="line-md:loading-twotone-loop" /> : <Icon icon="solar:download-bold" />}
            {loading ? 'Generating...' : 'Download Poster'}
          </button>
        </section>

        {/* ✅ RIGHT: PREVIEW (7 Columns) */}
        <section className="lg:col-span-7 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-100/50 p-4 md:p-12">
          <p className="mb-4 text-xs font-bold uppercase text-gray-400">Live Preview</p>
          
          <div
            ref={posterRef}
            className="relative aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-lg shadow-2xl bg-white"
          >
            {/* 1. BACKGROUND LAYER (Gradient or Color) */}
            <div className={`absolute inset-0 ${template.type === 'gradient' ? template.className : 'bg-white'}`} />

            {/* 2. CELEBRANT PHOTO (Centered & Sized for the frame) */}
            {image ? (
              <img
                src={image}
                alt="Celebrant"
                className="absolute left-1/2 top-[18%] w-[62%] -translate-x-1/2 object-cover"
              />
            ) : (
                <div className="absolute left-1/2 top-[18%] flex h-[50%] w-[62%] -translate-x-1/2 items-center justify-center bg-gray-200">
                    <Icon icon="solar:user-bold" className="text-4xl text-gray-400" />
                </div>
            )}

            {/* 3. FRAME OVERLAY (The PNG with the hole) */}
            {template.type === 'image' && (
              <img
                src={template.background}
                alt="Frame Overlay"
                className="pointer-events-none absolute inset-0 z-10 h-full w-full object-contain"
              />
            )}

            {/* 4. NAME TEXT (On top of everything) */}
            <div className="absolute bottom-[36%] left-1/2 z-20 w-[70%] -translate-x-1/2 text-center">
              <p className="truncate text-lg font-black tracking-tight text-gray-900 drop-shadow-sm md:text-xl">
                {name || 'YOUR NAME HERE'}
              </p>
            </div>
          </div>
          
          <p className="mt-6 text-center text-xs text-gray-400">
            * Higher resolution image will be generated on export
          </p>
        </section>
      </div>
    </div>
  )
}