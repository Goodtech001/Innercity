'use client'
import useSWR from 'swr'
import Footer from '@/layouts/footer'
import TopNavbar from '@/layouts/topnavbar'
import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import ResourceCard from '@/components/resources-card'
import { getResourcesService, GetResourcesServiceResponse } from '@/services/resources.service'
import VideoPlayer from '@/components/video-player'
import Modal from '@/components/modal'
import { useModal } from '@/components/modal/useModal'
import Image from 'next/image'
import { setEngine } from 'crypto'

function ResourcePage() {
  const { data } = useSWR('donations', getResourcesService)
  const { closeModal, isModalClosed, openModal } = useModal()
  const [activeTab, setActiveTab] = useState('all')
  const [selectedResource, setSelectedResource] = useState<GetResourcesServiceResponse | null>(null)

  const tabs = [
    { name: 'All', tab: 'all' },
    { name: 'Videos', tab: 'videos' },
    { name: 'Images', tab: 'images' },
  ]

  const handleDownload = () => {
    if (!selectedResource) return
    const a = document.createElement('a')
    a.href = selectedResource.src
    a.download = '7-billion-meals.mp4' // Customize filename if needed
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  useEffect(() => {
    console.log(setEngine)
  }, [selectedResource])

  return (
    <>
      <TopNavbar />
      <div className="container !h-auto">
        <div className="mb-3 flex items-center justify-between border-b py-1.5 pt-6">
          <h3 className="text-balance text-3xl font-bold text-dark md:text-4xl">Resources</h3>
        </div>

        <div className="mt-3 justify-between md:flex">
          <div className="flex space-x-1 md:space-x-2">
            <button className="btn-white px-2 py-1 text-xs font-light md:px-3 md:py-2">
              Food Campaigns
            </button>
            <button className="btn-white bg-color border-textcolor px-2 py-1 text-xs font-light text-textcolor md:px-3 md:py-2">
              Education Campaigns
            </button>
            <button className="btn-white px-2 py-1 text-xs font-light md:truncate md:px-5 md:py-2">
              Women Empowerment
            </button>
            <button className="btn-white border-textcolor px-2 py-1 text-xs font-light text-textcolor md:truncate md:px-5 md:py-2">
              Community Development
            </button>
          </div>

          <div className="flex text-black">
            <h1 className="hidden font-semibold text-black md:block">Sort by</h1>
            <Icon
              icon="iconamoon:arrow-down-2"
              width="24"
              height="24"
              className="hidden md:block"
            />
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between space-y-5 md:flex-row md:space-y-0">
          <div className="flex space-x-4 md:space-x-5">
            {tabs.map((tab) => (
              <button key={tab.tab} onClick={() => setActiveTab(tab.tab)}>
                <span className={`${tab.tab === activeTab ? 'text-primary' : ''}`}>{tab.name}</span>
              </button>
            ))}
          </div>

          <div className="flex w-fit rounded-lg border border-[#7BB2E7] p-1">
            <input
              type="search"
              placeholder="Search..."
              className="h-7 border-transparent outline-none"
            />
            <div className="flex items-center">
              <Icon
                icon="material-symbols:search"
                width="24"
                height="24"
                className="w-fit rounded-sm bg-[#0074E6] px-2 py-1 text-white"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 pb-10 md:grid md:grid-cols-3 lg:grid-cols-4">
          {data?.map((asset, index) => (
            <ResourceCard
              key={index}
              onClick={(asset) => {
                setSelectedResource(asset)
                openModal()
              }}
              asset={asset}
            />
          ))}
        </div>
      </div>
      <Footer />

      <Modal
        className={`w-full overflow-hidden ${selectedResource?.type === 'video' ? 'md:max-w-4xl' : 'md:max-w-3xl'}`}
        closeModal={closeModal}
        isModalClosed={isModalClosed}
      >
        <button
          onClick={closeModal}
          className="absolute right-4 top-10 block rounded-lg border border-light/5 p-1.5 text-light"
        >
          <Icon icon="iconoir:cancel" className="size-6 md:size-8" />
        </button>

        <div className="my-auto rounded-lg bg-light px-2 py-4 md:px-4">
          <div className="mb-8 flex items-center justify-between">
            <h5 className="text-lg font-bold text-dark md:text-xl">{selectedResource?.name}</h5>

            <div className="ml-auto flex gap-5 border-4">
              <Icon
                icon="material-symbols:download"
                className="btn size-8 cursor-pointer p-1"
                onClick={handleDownload}
              />
              <Icon
                icon="material-symbols:collections-bookmark-outline"
                className="btn size-8 cursor-pointer p-1"
              />
            </div>
          </div>
          {selectedResource?.type === 'video' ? (
            <VideoPlayer className="max-w-4xl" src={selectedResource?.src || ''} />
          ) : (
            <div className="">
              <div className="overflow-hidden rounded-lg">
                <Image
                  alt={selectedResource?.name || 'image'}
                  src={selectedResource?.src || ''}
                  width={500}
                  height={500}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          )}

          <hr className="my-8" />

          <div className="">
            <h5 className="text-lg font-bold text-dark md:text-xl">More Videos like this</h5>

            <div className="mt-2 flex flex-col items-center justify-center gap-3 overflow-y-auto rounded py-2 pb-10 md:grid md:grid-cols-3 lg:grid-cols-4">
              {data?.map((asset, index) => (
                <ResourceCard
                  key={index}
                  onClick={(asset) => {
                    setSelectedResource(asset)
                    openModal()
                  }}
                  asset={asset}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ResourcePage
