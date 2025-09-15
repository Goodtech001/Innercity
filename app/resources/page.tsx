'use client'
import useSWR from 'swr'
import Footer from '@/layouts/footer'
import TopNavbar from '@/layouts/topnavbar'
import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import ResourceCard from '@/components/resources-card'
import { getResourcesService } from '@/services/resources.service'

function ResourcePage() {
  const { data } = useSWR('donations', getResourcesService)
  const [activeTab, setActiveTab] = useState('profile')
  const tabs = [
    { name: 'All', tab: 'all' },
    { name: 'Videos', tab: 'videos' },
    { name: 'Images', tab: 'images' },
  ]

  // const renderContent = () => {
  //   switch (activeTab) {
  //     case 'all':
  //       return (
  //         <div>
  //           <ResourceCard />
  //         </div>
  //       )
  //     case 'videos':
  //       return <div>Videos...</div>
  //     case 'images':
  //       return <div>Images...</div>
  //     default:
  //       return (
  //         <div>
  //           <ResourceCard />
  //         </div>
  //       )
  //   }
  // }

  return (
    <div>
      <TopNavbar />
      <div className="container">
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
        <div className="mt-10 flex flex-col items-center justify-center gap-3 overflow-y-auto rounded py-2 pb-10 md:grid md:grid-cols-3 lg:grid-cols-4">
          {data?.map((asset, index) => (
            <ResourceCard key={index} asset={asset} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ResourcePage
