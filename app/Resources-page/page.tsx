'use client'
import DpUploader from '@/components/dp-uploader'
import Editpage from '@/components/edit-profile'
import ImageUploader from '@/components/image-uploader'
import Footer from '@/layouts/footer'
import TopNavbar from '@/layouts/topnavbar'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import React, { useState } from 'react'
import DrawerPage from '../../components/drawer/page'

function ResourcePage() {
  const [activeTab, setActiveTab] = useState('profile')

  const renderContent = () => {
    switch (activeTab) {
      case 'all':
        return (
          <div>
            <DrawerPage />
          </div>
        )
      case 'videos':
        return <div>Videos...</div>
      case 'images':
        return <div>Images...</div>
      default:
        return (
          <div>
            <DrawerPage />
          </div>
        )
    }
  }

  return (
    <div>
      <TopNavbar />
      <div className="px-2 py-10 md:px-[10%]">
        <div className="border-b text-2xl font-bold text-black md:text-4xl">
          <h1 className="mb-2">Resources</h1>
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

        <div className="mt-20 items-center justify-between flex md:flex-row flex-col md:space-y-0 space-y-5 ">
          <div className="flex space-x-4 md:space-x-5">
            <SidebarButton
              label="All"
              onClick={() => setActiveTab('all')}
              active={activeTab === 'all'}
            />
            <SidebarButton
              label="Videos"
              onClick={() => setActiveTab('videos')}
              active={activeTab === 'videos'}
            />
            <SidebarButton
              label="Images"
              onClick={() => setActiveTab('images')}
              active={activeTab === 'images'}
            />
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
        <div className="mt-10 overflow-y-auto rounded p-2 md:h-3/4 md:w-full">
          {renderContent()}
        </div>
      </div>
      <Footer />
    </div>
  )
}

type SidebarButtonProps = {
  label: string
  onClick: () => void
  active?: boolean
}

const SidebarButton = ({ label, onClick, active }: SidebarButtonProps) => (
  <button onClick={onClick}>
    <span className={`${active ? 'text-primary' : ''}`}>{label}</span>
  </button>
)

export default ResourcePage
