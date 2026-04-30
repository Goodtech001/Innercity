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
  const [editForm, setEditForm] = useState({ title: '', goal: '' })
  const [updating, setUpdating] = useState(false)
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

        const userCampaigns = campaignsArray.filter(
          (c: any) => String(c.user?.id) === String(userId),
        )

        setCampaigns(userCampaigns)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCampaigns()
  }, [])

  const handleUpdateCampaign = async () => {
    if (!selectedCampaign) return
    setUpdating(true)
    try {
      await axios.put(`${baseUrl}/campaigns/${selectedCampaign.id}`, editForm, {
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
    return campaigns.reduce(
      (acc, c) => {
        acc.totalCampaigns += 1
        acc.totalRaised += Number(c.raised || 0)
        const uniqueDonors = new Set([...(c.funders || []).map((f: any) => f.user?.id), ...(c.payments || []).map((p: any) => p.user?.id)].filter(Boolean))
        acc.totalDonors += uniqueDonors.size || Number(c.donorCount || 0)
        return acc
      },
      { totalCampaigns: 0, totalRaised: 0, totalDonors: 0 },
    )
  }, [campaigns])

  return (
    <div className="space-y-8 p-6">
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard icon="mdi:bullhorn" label="My Campaigns" value={stats.totalCampaigns} />
        <StatCard icon="solar:money-bag-bold" label="Total Raised" value={`$${stats.totalRaised.toLocaleString()}`} />
        <StatCard icon="fa:users" label="Total Donors" value={stats.totalDonors} />
      </div>

      {loading && <p className="animate-pulse py-10 text-center text-gray-500">Loading your campaigns...</p>}

      <div className="grid gap-6 md:grid-cols-3">
        {campaigns.map((campaign) => {
          const banner = campaign.thumbnail_large ? `https://fundraise.theinnercitymission.ngo/${campaign.thumbnail_large}` : campaign.thumbnail?.url
          const combinedDonors = [...(campaign.funders || []), ...(campaign.payments || [])]
          return (
            <div key={campaign.id} onClick={() => { setSelectedCampaign(campaign); setIsEditing(false); }} className="group cursor-pointer overflow-hidden rounded-2xl border bg-white transition hover:shadow-xl">
              <div className="relative h-44 w-full">
                <img src={banner} className="h-full w-full object-cover transition group-hover:scale-105" />
                <div className="absolute right-2 top-2 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">{combinedDonors.length} CONTRIBUTIONS</div>
              </div>
              <div className="p-4">
                <h3 className="line-clamp-1 font-bold text-gray-800">{campaign.title}</h3>
                <p className="mt-2 text-xs font-bold text-primary">${Number(campaign.raised).toLocaleString()} raised</p>
              </div>
            </div>
          )
        })}
      </div>

      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedCampaign(null)} />
          <div className="animate-slideUp relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
            <button onClick={() => setSelectedCampaign(null)} className="absolute right-6 top-6 z-10"><Icon icon="solar:close-circle-bold" width={28} className="text-gray-400" /></button>

            {isEditing ? (
              <div className="space-y-4 py-4">
                <h3 className="font-black text-xl">Edit Campaign</h3>
                <input className="w-full p-3 border rounded-xl" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} placeholder="Campaign Title" />
                <input type="number" className="w-full p-3 border rounded-xl" value={editForm.goal} onChange={e => setEditForm({...editForm, goal: e.target.value})} placeholder="Goal Amount" />
                <button onClick={handleUpdateCampaign} disabled={updating} className="w-full py-3 bg-primary text-white rounded-xl font-bold">{updating ? 'Saving...' : 'Save Changes'}</button>
                <button onClick={() => setIsEditing(false)} className="w-full py-3 text-gray-500 font-bold">Cancel</button>
              </div>
            ) : (
              <>
                <img src={selectedCampaign.thumbnail_large ? `https://fundraise.theinnercitymission.ngo/${selectedCampaign.thumbnail_large}` : selectedCampaign.thumbnail?.url} className="mb-6 h-60 w-full rounded-2xl object-cover" />
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-black text-gray-900">{selectedCampaign.title}</h2>
                    <button onClick={() => { setEditForm({title: selectedCampaign.title, goal: selectedCampaign.goal}); setIsEditing(true); }} className="text-xs bg-gray-100 px-3 py-1 rounded-full font-bold hover:bg-gray-200">Edit Campaign</button>
                </div>

                <div className="mb-8 grid grid-cols-3 gap-4">
                  <MiniStat label="Goal" value={`$${Number(selectedCampaign.goal).toLocaleString()}`} />
                  <MiniStat label="Raised" value={`$${Number(selectedCampaign.raised || 0).toLocaleString()}`} />
                  <MiniStat label="Total Donors" value={[...(selectedCampaign.funders || []), ...(selectedCampaign.payments || [])].length} />
                </div>

                <div className="rounded-2xl bg-gray-50 p-5">
                  <h3 className="mb-4 font-bold text-gray-800">Recent Contributions</h3>
                  <div className="space-y-3">
                     {/* ... (Donor list remains exactly as your original code) ... */}
                     {[...(selectedCampaign.funders || []), ...(selectedCampaign.payments || [])].map((donor: any, idx: number) => (
                         <div key={idx} className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                             <p className="text-sm font-bold text-gray-800">{donor.user?.fullname || 'Anonymous'}</p>
                             <p className="text-sm font-black text-green-600">${Number(donor.amount).toLocaleString()}</p>
                         </div>
                     ))}
                  </div>
                </div>
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