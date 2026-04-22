"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'
import { createTestimonialService, uploadFileService } from '@/app/auth/auth.service'
import { toast } from 'react-hot-toast'

export default function CreateTestimonialPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const [form, setForm] = useState({
    clientName: '',
    content: '',
    donatedAmount: '',
    donations: '',
    location: '',
    rating: 5,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      setPreview(URL.createObjectURL(selected))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let uploadId = null
      if (file) {
        const uploadRes = await uploadFileService(file)
        uploadId = uploadRes.id
      }

      await createTestimonialService({
        ...form,
        avatarUploadId: uploadId,
      })

      toast.success("Testimonial Created!")
      router.push('/admin/testimonials')
    } catch (err) {
      toast.error('Failed to create testimonial')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6">
      <div className="mx-auto max-w-2xl">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-primary transition"
        >
          <Icon icon="solar:alt-arrow-left-linear" />
          Back to list
        </button>

        <div className="rounded-3xl border border-white bg-white/70 p-8 shadow-xl backdrop-blur-md">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Create New Testimonial</h1>
            <p className="text-gray-500">Capture the impact stories of your partners.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Custom Upload Area */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="group relative h-28 w-28">
                <div className="h-full w-full overflow-hidden rounded-full border-4 border-white shadow-lg">
                  {preview ? (
                    <img src={preview} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-300">
                      <Icon icon="solar:user-bold" width={48} />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-primary p-2 text-white shadow-md transition hover:scale-110">
                  <Icon icon="solar:camera-add-bold" />
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Upload Profile Photo</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-400 px-1">Full Name</label>
                <input
                  name="clientName"
                  required
                  placeholder="e.g. John Doe"
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-400 px-1">Location</label>
                <input
                  name="location"
                  placeholder="e.g. Lagos, Nigeria"
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-400 px-1">Amount Given</label>
                <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                   <input
                    name="donatedAmount"
                    placeholder="1,000"
                    className="w-full rounded-2xl border border-gray-100 bg-gray-50 py-3 pl-8 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                    onChange={(e) => setForm({ ...form, donatedAmount: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-400 px-1">Impact Rating</label>
                <select
                  name="rating"
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                  onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (Perfect)</option>
                  <option value={4}>⭐⭐⭐⭐ (Great)</option>
                  <option value={3}>⭐⭐⭐ (Good)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-400 px-1">Testimonial Message</label>
              <textarea
                name="content"
                required
                rows={4}
                placeholder="What did they have to say about the campaign?"
                className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-bold text-white shadow-lg transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <Icon icon="line-md:loading-twotone-loop" className="text-xl" />
              ) : (
                "Publish Testimonial"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}