// 'use client'
// import { Icon } from '@iconify/react/dist/iconify.js'
// import React, { ReactNode, useState } from 'react'

// // --- SidebarButton Component ---
// type SidebarButtonProps = {
//   icon: ReactNode
//   label: string
//   active: boolean
//   onClick: () => void
// }

// const SidebarButton = ({ icon, label, active, onClick }: SidebarButtonProps) => (
//   <button
//     onClick={onClick}
//     className={classNames(
//       'flex items-center w-full py-3 px-4 rounded hover:bg-gray-700 transition mb-2',
//       { 'bg-gray-700': active }
//     )}
//   >
//     <span className="mr-3">{icon}</span>
//     <span>{label}</span>
//   </button>
// )

// const ProfilePage = () => {
//   const [activeTab, setActiveTab] = useState('profile')

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'profile':
//         return <div>Your Profile Info Here</div>
//       case 'settings':
//         return <div>Your Settings Info Here</div>
//       case 'notifications':
//         return <div>Your Notifications Here</div>
//       default:
//         return <div>Select an option from the sidebar</div>
//     }
//   }

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="w-1/3 max-w-xs bg-gray-800 text-white p-6">
//         <h2 className="text-xl font-bold mb-6">My Profile</h2>

//         <SidebarButton
//           icon={<Icon icon="mdi:user" width="24" height="24" />}
//           label="Profile"
//           active={activeTab === 'profile'}
//           onClick={() => setActiveTab('profile')}
//         />

//         <SidebarButton
//           icon={<Icon icon="mynaui:cog-solid" width="24" height="24" />}
//           label="Settings"
//           active={activeTab === 'settings'}
//           onClick={() => setActiveTab('settings')}
//         />

//         <SidebarButton
//           icon={<Icon icon="mdi:bell-outline" width="24" height="24" />}
//           label="Notifications"
//           active={activeTab === 'notifications'}
//           onClick={() => setActiveTab('notifications')}
//         />
//       </div>

//       {/* Content Area */}
//       <div className="w-2/3 p-10 overflow-y-auto">
//         <h1 className="text-2xl font-bold mb-4">{activeTab.toUpperCase()}</h1>
//         {renderContent()}
//       </div>
//     </div>
//   )
// }

// // type SidebarButtonProps = {
// //   icon: ReactNode
// //   label: string
// //   active: boolean
// //   onClick: () => void
// // }

// // Reusable button component
// // const SidebarButton = ({ icon, label, active, onClick }) => (
// //   <button
// //     onClick={onClick}
// //     className={classNames(
// //       'flex items-center w-full py-3 px-4 rounded hover:bg-gray-700 transition mb-2',
// //       { 'bg-gray-700': active }
// //     )}
// //   >
// //     <span className="mr-3">{icon}</span>
// //     <span>{label}</span>
// //   </button>
// // )

// export default ProfilePage
// function classNames(_arg0: string, _arg1: { 'bg-gray-700': unknown }): string | undefined {
//     throw new Error('Function not implemented.')
// }

// export default page

'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useState } from 'react'

const Page = () => {
  const [activeTab, setActiveTab] = useState('profile')

  // Dynamic background colors based on tab
  const bgColorMap: Record<typeof activeTab, string> = {
    profile: 'bg-blue-100',
    settings: 'bg-green-100',
    notifications: 'bg-yellow-100',
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <div>Profile content</div>
      case 'settings':
        return <div>Settings content</div>
      case 'notifications':
        return <div>Notifications content</div>
        case 'chat':
        return <div>Chat with Us.</div>
      default:
        return <div>Select a tab</div>
    }
  }

  return (
    <div className="${bgColorMap[activeTab]} flex h-screen transition-colors duration-500 p-20 gap-10">
        {/* Content Area */}
      <div className="w-2/3 p-10 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold capitalize">{activeTab}</h1>
        {renderContent()}
      </div>


      {/* Sidebar */}
      <div className="w-1/3 overflow-y-hidden  bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-bold">My Profile</h2>

        <SidebarButton
          label="Profile"
          note="View & edit basic details about yourself"
          icon={<Icon icon="mdi:user" width="24" height="24" />}
          onClick={() => setActiveTab('profile')}
          active={activeTab === 'profile'}
        />
        <SidebarButton
          label="My Campaigns"
          note="Manage your campaigns here"
          icon={<Icon icon="mynaui:cog-solid" width="24" height="24" />}
          onClick={() => setActiveTab('settings')}
          active={activeTab === 'settings'}
        />
        <SidebarButton
          label="Notifications"
          note="See updates you should be aware of"
          icon={<Icon icon="mdi:bell-outline" width="24" height="24" />}
          onClick={() => setActiveTab('notifications')}
          active={activeTab === 'notifications'}
        />
        <SidebarButton
          label="Chat"
          note="Chat with the ICM support team"
          icon={<Icon icon="material-symbols:chat" width="24" height="24" />}
          onClick={() => setActiveTab('chat')}
          active={activeTab === 'chat'}
        />
      </div>

      
    </div>
  )
}

type SidebarButtonProps = {
  icon: React.ReactNode
  label: string
  note: string
  onClick: () => void
  active?: boolean
}

const SidebarButton = ({ icon, label, onClick, active, note }: SidebarButtonProps) => (
  <button
    onClick={onClick}
    className={`mb-2 flex w-full rounded px-4 py-3 transition hover:bg-gray-200`}
  >
    <span className={`mr-4 btn-white w-fit p-2 ${
      active ? 'btn-primary' : ''
    }`}>{icon}</span>
    <div className='text-sm text-left '>
      <div className='text-black font-semibold'>{label}</div>
      <div className='text-xs'>{note}</div>
    </div>
  </button>
)

export default Page
