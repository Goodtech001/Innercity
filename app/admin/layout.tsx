'use client'

import AdminSidebar from '@/components/admin'
import TopNavbar from '@/layouts/topnavbar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. Ensure Navbar has a high z-index */}
      <div className="fixed top-0 left-0 right-0 z-[60]">
        <TopNavbar />
      </div>
      
      <div className="flex pt-16"> {/* pt-16 matches the height of TopNavbar */}
        <AdminSidebar />
        
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}