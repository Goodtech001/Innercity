"use client";
import DpUploader from '@/components/dp-uploader';
import Editpage from '@/components/edit-profile';
import ImageUploader from '@/components/image-uploader';
import Footer from '@/layouts/footer'
import TopNavbar from '@/layouts/topnavbar'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import React, {useState} from 'react'

function ResourcePage() {
  const [activeTab, setActiveTab] = useState('profile')

  const renderContent = () => {
    switch (activeTab) {
      case 'all':
        return <div>
          Incoming....
        </div>
      case 'videos':
        return <div>Videos...</div>
      case 'images':
        return <div>Images...</div>
        case 'ecard':
        return <div>Chat with Us...</div>
      default:
        return <div>Select a tab...</div>
    }
  }

  return (
    <div>
        <TopNavbar/>
       <div className='py-10 md:px-[10%] px-2'>
         <div className='border-b text-4xl text-black font-bold'>
            <h1 className='mb-2'>Resources</h1>
        </div>

       <div className='md:flex justify-between mt-3'>
         <div className='flex space-x-1'>
            <button className='btn-white md:py-3 md:px-5 py-1 px-2 font-light text-xs'>Food Campaigns</button>
            <button className='btn-white md:py-3 md:px-5  border-textcolor text-textcolor bg-color py-1 px-2 text-xs font-light'>Education Campaigns</button>
            <button className='btn-white md:py-3 md:px-5 py-1 px-2 text-xs font-light md:truncate'>Women Empowerment</button>
            <button className='btn-white border-textcolor text-textcolor md:py-3 md:px-5 py-1 px-2 text-xs font-light md:truncate'>Community Development</button>
        </div>

        <div className='flex text-black'>
            <h1 className='text-black font-semibold md:block hidden'>Sort by</h1>
            <Icon icon="iconamoon:arrow-down-2" width="24" height="24" className='md:block hidden'/>
        </div>
       </div>

       <div className='md:flex justify-between mt-20 items-center'>
        <div className='flex md:space-x-5 space-x-4'>
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
                    <SidebarButton
                      label="Ecard"
                      onClick={() => setActiveTab('ecard')}
                      active={activeTab === 'ecard'}
                    />
        </div>

              <div className='flex border border-[#7BB2E7] rounded-lg w-fit p-1 '>
                   <input type='search' placeholder='Search...' className='outline-none border-transparent h-7'/>
                      <div className='flex items-center'>
                      <Icon icon="material-symbols:search" width="24" height="24" className='bg-[#0074E6] text-white w-fit py-1 px-2 rounded-sm'/>
                      </div>
              </div>
       </div>

          {/* Content Area */}
      <div className="md:w-full md:h-3/4  rounded overflow-y-auto p-2 mt-10">
        
        {renderContent()}
      </div>
       

       </div>
       <Footer/>
    </div>
  )
}

type SidebarButtonProps = {
  label: string
  onClick: () => void
  active?: boolean
}

const SidebarButton = ({ label, onClick, active }: SidebarButtonProps) => (
  <button
    onClick={onClick}
    
  >
    <span className={`${
      active ? 'text-primary' : ''
    }`}>{label}</span>
  </button>
)


export default ResourcePage