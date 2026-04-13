// import AdminSidebar from "@/components/admin/sidebar";

import AdminSidebar from '@/components/admin'
import Footer from '@/layouts/footer'
import TopNavbar from '@/layouts/topnavbar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TopNavbar />
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
