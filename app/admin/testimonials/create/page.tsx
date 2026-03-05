'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'
import { createTestimonialService, uploadFileService } from '@/app/auth/auth.service'

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return

    setFile(selected)
    setPreview(URL.createObjectURL(selected))
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

      router.push('/admin/testimonials')
    } catch (err) {
      console.error(err)
      alert('Failed to create testimonial')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Create Testimonial</h1>
            <p className="text-sm text-gray-500">Add a new partner testimonial to the platform</p>
          </div>

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
          >
            <Icon icon="solar:arrow-left-linear" />
            Back
          </button>
        </div>

        {/* Card */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Profile Image</label>

              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border bg-gray-100">
                  {preview ? (
                    <img src={preview} className="h-full w-full object-cover" />
                  ) : (
                    <Icon icon="solar:user-bold" className="text-3xl text-gray-400" />
                  )}
                </div>

                <input type="file" onChange={handleFileChange} className="text-sm" />
              </div>
            </div>

            {/* Grid Fields */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">Client Name</label>
                <input
                  name="clientName"
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Location</label>
                <input
                  name="location"
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Donated Amount</label>
                <input
                  name="donatedAmount"
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Donations Count</label>
                <input
                  name="donations"
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-gray-700">Testimonial Message</label>
              <textarea
                name="content"
                rows={4}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Rating */}
            <div>
              <label className="text-sm font-medium text-gray-700">Rating</label>
              <select
                name="rating"
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Stars
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-primary py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Testimonial'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
