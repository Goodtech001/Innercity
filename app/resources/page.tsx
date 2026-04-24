'use client'

import React, { useState } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'

import Footer from '@/layouts/footer'
import TopNavbar from '@/layouts/topnavbar'
import ResourceCard from '@/components/resources-card'
import VideoPlayer from '@/components/video-player'
import Modal from '@/components/modal'
import { useModal } from '@/components/modal/useModal'
import { getResourcesService, GetResourcesServiceResponse } from '@/services/resources.service'

function ResourcePage() {
  const { data, isLoading } = useSWR('donations', getResourcesService)
  const { closeModal, isModalClosed, openModal } = useModal()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedResource, setSelectedResource] = useState<GetResourcesServiceResponse | null>(null)

  const tabs = [
    { name: 'All Resources', tab: 'all', icon: 'solar: Palermo-bold' },
    { name: 'Videos', tab: 'video', icon: 'solar:play-circle-bold' },
    { name: 'Images', tab: 'image', icon: 'solar:gallery-bold' },
  ]

  const handleDownload = async () => {
    if (!selectedResource) return
    try {
      const imageUrl = selectedResource.asset.url
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const extension = imageUrl.split('.').pop() || 'png'

      const a = document.createElement('a')
      a.href = url
      a.download = `${selectedResource.name.replace(/\s+/g, '-').toLowerCase()}.${extension}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success('Download started')
    } catch (error) {
      window.open(selectedResource.asset.url, '_blank')
    }
  }

  // Filter logic
  const filteredData = data?.filter((item) => {
    const matchesTab = activeTab === 'all' || item.asset.resourceType === activeTab
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50/50">
      <TopNavbar />

      {/* HERO SECTION */}
      <section className="border-b border-gray-100 bg-white pb-16 pt-12">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
              Media <span className="text-blue-600">Assets</span>
            </h1>
            <p className="text-lg font-medium leading-relaxed text-gray-500">
              Access high-quality campaign resources, videos, and visual materials to support and
              share our community initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* CONTROL BAR */}
      <div className="sticky top-[72px] z-20 border-b border-gray-100 bg-white/80 py-4 backdrop-blur-md">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Tabs */}
          <div className="flex w-full rounded-2xl bg-gray-100 p-1 md:w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.tab}
                onClick={() => setActiveTab(tab.tab)}
                className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold transition-all ${
                  activeTab === tab.tab
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="group relative w-full md:w-80">
            <Icon
              icon="solar:magnifer-linear"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-600"
              width={20}
            />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border-none bg-gray-100 py-3.5 pl-12 pr-4 text-sm font-bold outline-none transition-all focus:ring-2 focus:ring-blue-500/10"
            />
          </div>
        </div>
      </div>

      <main className="container py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square animate-pulse rounded-[2rem] bg-gray-200" />
            ))}
          </div>
        ) : filteredData?.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Icon icon="solar:folder-empty-bold-duotone" width={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No resources found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {filteredData?.map((asset, index) => (
              <ResourceCard
                key={index}
                onClick={(item) => {
                  setSelectedResource(item)
                  openModal()
                }}
                asset={asset}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* ENHANCED MODAL */}
      <Modal
        className={`w-full overflow-hidden !rounded-[2.5rem] ${
          selectedResource?.asset.resourceType === 'video' ? 'md:max-w-5xl' : 'md:max-w-3xl'
        }`}
        closeModal={closeModal}
        isModalClosed={isModalClosed}
      >
        <div className="relative bg-white p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="mb-1 text-2xl font-black leading-none text-gray-900">
                {selectedResource?.name}
              </h2>
              <p className="text-sm font-medium text-gray-400">Asset ID: #{selectedResource?.id}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 rounded-xl bg-blue-50 px-5 py-2.5 font-bold text-blue-600 transition-all hover:bg-blue-600 hover:text-white"
              >
                <Icon icon="solar:download-bold" width={20} />
                Download
              </button>
              <button
                onClick={closeModal}
                className="rounded-xl bg-gray-100 p-2.5 text-gray-500 transition-all hover:bg-gray-200"
              >
                <Icon icon="solar:close-circle-bold" width={24} />
              </button>
            </div>
          </div>

          <div className="aspect-video flex items-center justify-center overflow-hidden rounded-[2rem] border border-gray-100 bg-black shadow-2xl">
            {selectedResource?.asset?.url ? (
              selectedResource.asset.resourceType === 'video' ? (
                <VideoPlayer className="h-full w-full" src={selectedResource.asset.url} />
              ) : (
                <Image
                  alt={selectedResource.name || 'asset'}
                  src={selectedResource.asset.url} // No fallback to "" here
                  width={1200}
                  height={800}
                  className="h-full w-full object-contain"
                  unoptimized
                />
              )
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <Icon icon="solar:gallery-wide-bold-duotone" width={40} />
                <p className="text-xs">No media available</p>
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-gray-100 pt-8">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Description</h3>
            <p className="max-w-2xl leading-relaxed text-gray-500">
              {selectedResource?.description ||
                'No additional description provided for this asset.'}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ResourcePage
