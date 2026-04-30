/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { baseUrl } from '@/constants'
import { Icon } from '@iconify/react'

export default function UserCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Edit State
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ title: '', goal: '', excerpt: '', period: '', thumbnail_large: '' })
  const [updating, setUpdating] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [token, setToken] = useState('')

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const stored = sessionStorage.getItem('course-training-profile')
        const parsed = stored ? JSON.parse(stored) : null
        const userId = parsed?.user?.id
        setToken(parsed?.token || '')

        const res = await axios.get(`${baseUrl}/campaigns`)
        const campaignsArray = res.data?.data?.data || res.data?.data || res.data || []
        const userCampaigns = campaignsArray.filter((c: any) => String(c.user?.id) === String(userId))
        setCampaigns(userCampaigns)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCampaigns()
  }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setUploadingImage(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await axios.post(`${baseUrl}/uploads`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      })
      const url = res.data?.asset?.url || res.data?.url || res.data?.data?.url
      setEditForm({ ...editForm, thumbnail_large: url })
      toast.success('Image uploaded!')
    } catch (err) {
      toast.error('Image upload failed')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleUpdateCampaign = async () => {
    if (!selectedCampaign) return
    setUpdating(true)
    try {
      await axios.post(`${baseUrl}/campaigns/${selectedCampaign.id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Campaign updated successfully!')
      setIsEditing(false)
      setSelectedCampaign(null)
      window.location.reload()
    } catch (err) {
      toast.error('Failed to update campaign')
    } finally {
      setUpdating(false)
    }
  }

  const stats = useMemo(() => {
    return campaigns.reduce((acc, c) => {
        acc.totalCampaigns += 1
        acc.totalRaised += Number(c.raised || 0)
        const uniqueDonors = new Set([...(c.funders || []).map((f: any) => f.user?.id), ...(c.payments || []).map((p: any) => p.user?.id)].filter(Boolean))
        acc.totalDonors += uniqueDonors.size || Number(c.donorCount || 0)
        return acc
      }, { totalCampaigns: 0, totalRaised: 0, totalDonors: 0 }
    )
  }, [campaigns])

  return (
    <div className="space-y-8 p-6">
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard icon="mdi:bullhorn" label="My Campaigns" value={stats.totalCampaigns} />
        <StatCard icon="solar:money-bag-bold" label="Total Raised" value={`$${stats.totalRaised.toLocaleString()}`} />
        <StatCard icon="fa:users" label="Total Donors" value={stats.totalDonors} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {campaigns.map((campaign) => (
          <div key={campaign.id} onClick={() => { setSelectedCampaign(campaign); setIsEditing(false); }} className="group cursor-pointer overflow-hidden rounded-2xl border bg-white transition hover:shadow-xl">
            <div className="relative h-44 w-full">
              <img src={campaign.thumbnail_large ? `https://fundraise.theinnercitymission.ngo/${campaign.thumbnail_large}` : campaign.thumbnail?.url} className="h-full w-full object-cover transition group-hover:scale-105" />
            </div>
            <div className="p-4"><h3 className="line-clamp-1 font-bold">{campaign.title}</h3></div>
          </div>
        ))}
      </div>

      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedCampaign(null)} />
          <div className="animate-slideUp relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
            <button onClick={() => setSelectedCampaign(null)} className="absolute right-6 top-6"><Icon icon="solar:close-circle-bold" width={28} className="text-gray-400" /></button>

            {isEditing ? (
              <div className="space-y-4 py-4">
                <h3 className="font-black text-xl mb-4">Edit Campaign Details</h3>
                <input className="w-full p-3 border rounded-xl" placeholder="Title" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
                <input type="number" className="w-full p-3 border rounded-xl" placeholder="Goal" value={editForm.goal} onChange={e => setEditForm({...editForm, goal: e.target.value})} />
                <textarea className="w-full p-3 border rounded-xl h-24" placeholder="Excerpt" value={editForm.excerpt} onChange={e => setEditForm({...editForm, excerpt: e.target.value})} />
                <input type="date" className="w-full p-3 border rounded-xl" value={editForm.period} onChange={e => setEditForm({...editForm, period: e.target.value})} />
                
                <div className="p-4 border-2 border-dashed rounded-xl text-center">
                    <input type="file" onChange={handleImageUpload} className="hidden" id="img-upload" />
                    <label htmlFor="img-upload" className="cursor-pointer text-sm font-bold text-blue-600">
                        {uploadingImage ? 'Uploading...' : (editForm.thumbnail_large ? 'Change Image' : 'Upload Thumbnail')}
                    </label>
                    {editForm.thumbnail_large && <img src={editForm.thumbnail_large} className="mt-2 h-20 mx-auto rounded" />}
                </div>

                <button onClick={handleUpdateCampaign} disabled={updating} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg">
                  {updating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            ) : (
              <>
                <img src={selectedCampaign.thumbnail_large ? `https://fundraise.theinnercitymission.ngo/${selectedCampaign.thumbnail_large}` : selectedCampaign.thumbnail?.url} className="mb-6 h-60 w-full rounded-2xl object-cover" />
                <h2 className="text-2xl font-black text-gray-900 mb-2">{selectedCampaign.title}</h2>
                <p className="text-sm text-gray-500 mb-6">{selectedCampaign.excerpt}</p>
                
                <div className="mb-8 grid grid-cols-3 gap-4">
                  <MiniStat label="Goal" value={`$${Number(selectedCampaign.goal).toLocaleString()}`} />
                  <MiniStat label="Raised" value={`$${Number(selectedCampaign.raised || 0).toLocaleString()}`} />
                  <MiniStat label="Ends" value={selectedCampaign.period ? new Date(selectedCampaign.period).toLocaleDateString() : 'N/A'} />
                </div>

                <button onClick={() => { setEditForm({title: selectedCampaign.title, goal: selectedCampaign.goal, excerpt: selectedCampaign.excerpt || '', period: selectedCampaign.period || '', thumbnail_large: selectedCampaign.thumbnail_large || ''}); setIsEditing(true); }} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl hover:bg-blue-700 transition">
                   <Icon icon="solar:pen-bold" /> Edit Campaign
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: any }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon icon={icon} width={24} /></div>
      <div>
        <p className="text-xs font-bold uppercase tracking-tight text-gray-400">{label}</p>
        <p className="text-xl font-black text-gray-900">{value}</p>
      </div>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-xl border bg-white p-3 text-center shadow-sm">
      <p className="text-[9px] font-bold uppercase text-gray-400">{label}</p>
      <p className="text-sm font-black text-gray-800">{value}</p>
    </div>
  )
}