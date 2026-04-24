/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import { baseUrl } from '@/constants'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import TopNavbar from '@/layouts/topnavbar'

export default function CreateResourcePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return toast.error('Please upload an asset first')

    try {
      setLoading(true)
      const stored = sessionStorage.getItem('course-training-profile')
      const token = stored ? JSON.parse(stored)?.token : null

      // --- STEP 1: UPLOAD ASSET ---
      const uploadData = new FormData()
      uploadData.append('file', file)
      uploadData.append('type', 'e-card') // Or dynamic based on file type

      toast.loading('Uploading asset...', { id: 'upload' })
      const uploadRes = await axios.post(`${baseUrl}/uploads`, uploadData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      })
      
      // Assuming the response is { data: { id: 91 } } or { id: 91 }
      const assetId = uploadRes.data?.data?.id || uploadRes.data?.id
      toast.success('Asset uploaded!', { id: 'upload' })

      // --- STEP 2: CREATE RESOURCE ---
      const resourcePayload = {
        name: formData.name,
        description: formData.description,
        asset_id: assetId // The ID we just got
      }

      await axios.post(`${baseUrl}/resources`, resourcePayload, {
        headers: { Authorization: `Bearer ${token}` }
      })

      toast.success('Resource created successfully!')
      router.push('/resources')
    } catch (err: any) {
      toast.dismiss('upload')
      toast.error(err.response?.data?.message || 'Failed to create resource')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <TopNavbar />
      
      <div className="max-w-3xl mx-auto p-6 md:p-12">
        <div className="mb-8 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-white rounded-full transition-colors">
            <Icon icon="solar:alt-arrow-left-linear" width={24} />
          </button>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Create Resource</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* UPLOAD AREA */}
          <div className="group relative flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-gray-200 bg-white p-12 transition-all hover:border-blue-400">
            {preview ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg bg-black">
                {file?.type.includes('video') ? (
                  <video src={preview} className="w-full h-full object-contain" controls />
                ) : (
                  <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                )}
                <button 
                  type="button"
                  onClick={() => { setFile(null); setPreview(null); }}
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-xl hover:scale-110 transition-transform"
                >
                  <Icon icon="solar:trash-bin-trash-bold" />
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center gap-3">
                <div className="rounded-2xl bg-blue-50 p-4 text-blue-600">
                  <Icon icon="solar:upload-minimalistic-bold-duotone" width={40} />
                </div>
                <p className="text-sm font-bold text-gray-900">Choose resource file</p>
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
            )}
          </div>

          {/* JSON FIELDS */}
          <div className="grid gap-6 rounded-[2.5rem] bg-white border border-gray-100 p-8 shadow-sm">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full rounded-2xl border border-gray-50 bg-gray-50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full rounded-2xl border border-gray-50 bg-gray-50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/10 resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[2rem] bg-gray-900 py-5 text-sm font-bold text-white shadow-xl transition-all hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Create Resource'}
          </button>
        </form>
      </div>
    </div>
  )
}