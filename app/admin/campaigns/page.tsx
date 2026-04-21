/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { baseUrl } from '@/constants'
import clsx from 'clsx'
import toast from 'react-hot-toast'

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [isToggling, setIsToggling] = useState(false)

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const res = await fetch(`${baseUrl}/campaigns`)
      const data = await res.json()
      const campaignsArray = Array.isArray(data) ? data : data.data || data.campaigns || []
      setCampaigns(campaignsArray)
    } catch (error) {
      console.error('Campaign fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatus = (campaign: any) => {
    const now = new Date()
    const end = new Date(campaign.period)
    if (campaign.raised >= campaign.goal) return 'Completed'
    if (end < now) return 'Expired'
    return 'Active'
  }

  const filteredCampaigns = campaigns
    .filter((c) => c.title?.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => (statusFilter === 'all' ? true : getStatus(c) === statusFilter))

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Campaign Dashboard
          </h1>
          <p className="text-sm text-gray-500">Monitor fundraising progress and campaign status.</p>
        </div>
        <div className="flex rounded-2xl border border-blue-100 bg-blue-50 p-1.5">
          <div className="px-4 py-2 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
              Total Active
            </p>
            <p className="text-lg font-black text-blue-700">
              {campaigns.filter((c) => getStatus(c) === 'Active').length}
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative md:col-span-2">
          <Icon
            icon="solar:magnifer-linear"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400"
          />
          <input
            placeholder="Search campaign title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-gray-100 bg-white py-3.5 pl-12 pr-4 text-sm shadow-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-2xl border border-gray-100 bg-white px-4 py-3.5 text-sm font-semibold text-gray-600 shadow-sm outline-none"
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Expired">Expired</option>
        </select>
      </div>

      {/* Data Section */}
      <div className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-xl shadow-gray-200/50">
        {/* Desktop View */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <tr>
                <th className="px-6 py-5">Campaign Info</th>
                <th className="px-6 py-5">Funding Goal</th>
                <th className="px-6 py-5">Donors</th>
                <th className="px-6 py-5">Progress</th>
                <th className="px-6 py-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-20 text-center text-gray-400">
                    Loading campaigns...
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map((campaign) => {
                  const status = getStatus(campaign)
                  const progress = Math.min(
                    Math.round(((campaign.raised || 0) / (campaign.goal || 1)) * 100),
                    100,
                  )

                  return (
                    <tr
                      key={campaign.id}
                      className="group cursor-pointer transition-colors hover:bg-blue-50/30"
                      onClick={() => setSelectedCampaign(campaign)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              campaign.thumbnail_large
                                ? `https://fundraise.theinnercitymission.ngo/${campaign.thumbnail_large}`
                                : campaign.ecard_image ||
                                  campaign.thumbnail?.url ||
                                  '/placeholder.jpg'
                            }
                            className="h-12 w-20 rounded-xl object-cover shadow-sm transition-transform group-hover:scale-105"
                            alt={campaign.title || 'Campaign thumbnail'}
                          />
                          <div>
                            <p className="line-clamp-1 text-sm font-bold text-gray-900">
                              {campaign.title}
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-tight text-blue-500">
                              {campaign.category?.name || 'Global Cause'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-black text-gray-900">
                          ${Number(campaign.raised).toLocaleString()}
                        </p>
                        <p className="text-[10px] font-medium text-gray-400">
                          of ${Number(campaign.goal).toLocaleString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <Icon
                            icon="solar:users-group-rounded-bold-duotone"
                            className="text-gray-400"
                            width={18}
                          />
                          <span className="text-sm font-bold text-gray-700">
                            {campaign.donor_count || 0}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-32">
                          <div className="mb-1 flex justify-between">
                            <span className="text-[10px] font-black text-gray-400">
                              {progress}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                            <div
                              className={clsx(
                                'h-full transition-all duration-1000',
                                progress >= 100 ? 'bg-blue-600' : 'bg-green-500',
                              )}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={clsx(
                            'rounded-full border px-3 py-1.5 text-[10px] font-bold',
                            status === 'Active'
                              ? 'border-green-100 bg-green-50 text-green-600'
                              : status === 'Completed'
                                ? 'border-blue-100 bg-blue-50 text-blue-600'
                                : 'border-red-100 bg-red-50 text-red-600',
                          )}
                        >
                          {status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="divide-y divide-gray-50 lg:hidden">
          {filteredCampaigns.map((campaign) => {
            const status = getStatus(campaign)
            const progress = Math.min(
              Math.round(((campaign.raised || 0) / (campaign.goal || 1)) * 100),
              100,
            )
            return (
              <div
                key={campaign.id}
                className="p-5 active:bg-gray-50"
                onClick={() => setSelectedCampaign(campaign)}
              >
                <div className="mb-4 flex gap-4">
                  <img
                    src={campaign.ecard_image || campaign.campaign_image}
                    className="h-16 w-24 rounded-2xl object-cover"
                  />
                  <div className="flex-1">
                    <span
                      className={clsx(
                        'mb-1 inline-block rounded-full border px-2 py-0.5 text-[9px] font-black',
                        status === 'Active'
                          ? 'border-green-100 text-green-600'
                          : 'border-gray-100 text-gray-400',
                      )}
                    >
                      {status}
                    </span>
                    <p className="line-clamp-2 text-sm font-bold leading-tight text-gray-900">
                      {campaign.title}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 rounded-2xl bg-gray-50 p-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-gray-400">Raised</p>
                    <p className="text-sm font-black text-gray-900">
                      ${Number(campaign.raised).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase text-gray-400">Progress</p>
                    <p className="text-sm font-black text-blue-600">{progress}%</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Detail Drawer */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-[100] flex">
          <div
            className="animate-in fade-in absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedCampaign(null)}
          />
          <div className="animate-in slide-in-from-right relative ml-auto flex h-full w-full max-w-[500px] flex-col bg-white shadow-2xl duration-300">
            <div className="relative h-64 w-full">
              <img
                src={
                  selectedCampaign.thumbnail_large
                    ? `https://fundraise.theinnercitymission.ngo/${selectedCampaign.thumbnail_large}`
                    : selectedCampaign.ecard_image ||
                      selectedCampaign.thumbnail?.url ||
                      '/placeholder.jpg'
                }
                className="h-full w-full object-cover"
                alt={selectedCampaign.title || 'Campaign thumbnail'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <button
                onClick={() => setSelectedCampaign(null)}
                className="absolute right-6 top-6 text-white/70 hover:text-white"
              >
                <Icon icon="solar:close-circle-bold" width={32} />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400">
                  {selectedCampaign.category?.name}
                </p>
                <h2 className="line-clamp-2 text-xl font-bold text-white">
                  {selectedCampaign.title}
                </h2>
              </div>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto p-8 no-scrollbar">
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-2xl bg-gray-50 p-4 text-center">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Donors</p>
                  <p className="text-lg font-black">{selectedCampaign.donor_count || 0}</p>
                </div>
                <div className="col-span-2 rounded-2xl bg-gray-50 p-4 text-center">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Goal Progress</p>
                  <p className="text-lg font-black text-green-600">
                    ₦{Number(selectedCampaign.raised).toLocaleString()}{' '}
                    <span className="text-sm font-normal text-gray-300">
                      / ₦{Number(selectedCampaign.goal).toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>

              <section>
                <h3 className="mb-3 text-xs font-black uppercase tracking-widest text-gray-400">
                  Description
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {selectedCampaign.excerpt ||
                    'No detailed description provided for this campaign.'}
                </p>
              </section>

              <section className="rounded-[2rem] border border-blue-100/50 bg-blue-50 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white">
                    {selectedCampaign.user?.fullname?.charAt(0)}
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase text-blue-400">
                      Campaign Manager
                    </p>
                    <p className="font-bold text-blue-900">
                      {selectedCampaign.user?.fullname || 'Anonymous Sponsor'}
                    </p>
                    <p className="text-sm text-blue-900">
                      {selectedCampaign.user?.email || 'Anonymous Sponsor'}
                    </p>
                  </div>
                </div>
              </section>

              {/* featured Toggle */}
              {/* Featured Toggle */}
              <div className="flex items-center justify-between rounded-[1.5rem] border border-blue-50 bg-blue-50/30 p-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-lg p-2 ${selectedCampaign.featured ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'}`}
                  >
                    <Icon
                      icon={selectedCampaign.featured ? 'solar:star-bold' : 'solar:star-linear'}
                      width={20}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Featured Campaign</p>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                      Highlight on homepage
                    </p>
                  </div>
                </div>

                <button
                  disabled={isToggling}
                  onClick={() => {
                    // Just update local state for now
                    const newStatus = !selectedCampaign.featured
                    setSelectedCampaign({ ...selectedCampaign, featured: newStatus })
                  }}
                  className={`relative h-7 w-12 rounded-full shadow-inner transition-all duration-300 ${
                    selectedCampaign.featured ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                      selectedCampaign.featured ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  disabled={isToggling}
                  onClick={async () => {
                    try {
                      setIsToggling(true)
                      const token = localStorage.getItem('token')

                      // Ensure we extract the ID if category is an object
                      const categoryId =
                        selectedCampaign.category?.id || selectedCampaign.category_id

                      const res = await fetch(`${baseUrl}/campaigns`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                          id: Number(selectedCampaign.id),
                          category_id: Number(categoryId), // Explicitly cast to Number to satisfy constraints
                          featured: selectedCampaign.featured,
                          title: selectedCampaign.title,
                          goal: Number(selectedCampaign.goal),
                          published: selectedCampaign.published ?? true,
                        }),
                      })

                      if (res.ok) {
                        toast.success('Campaign updated successfully!')
                        setCampaigns((prev) =>
                          prev.map((c) => (c.id === selectedCampaign.id ? selectedCampaign : c)),
                        )
                      } else {
                        const errorData = await res.json()
                        // This will help you see if other validation errors occur
                        toast.error(errorData.message || 'Update failed')
                      }
                    } catch (err) {
                      toast.error('Failed to save changes')
                    } finally {
                      setIsToggling(false)
                    }
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-sm font-bold text-white transition-all hover:bg-blue-700 disabled:opacity-50"
                >
                  {isToggling ? <Icon icon="line-md:loading-twotone-loop" /> : 'Save Changes'}
                </button>

                <div className="flex gap-3">
                  <button className="flex-1 rounded-2xl bg-gray-900 py-4 text-sm font-bold text-white transition-all hover:bg-gray-800">
                    Edit All Details
                  </button>
                  <button className="rounded-2xl bg-red-50 px-6 py-4 text-sm font-bold text-red-600 transition-all hover:bg-red-100">
                    <Icon icon="solar:trash-bin-trash-bold" width={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
