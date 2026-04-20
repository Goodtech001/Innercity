'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

const links = [
  { href: '/admin', label: 'Overview', icon: 'solar:widget-add-bold-duotone' },
  {
    label: 'Media',
    icon: 'solar:gallery-bold-duotone',
    children: [
      { label: 'Banners', href: '/admin/hero-images', icon: 'solar:clapperboard-edit-bold' },
      { label: 'Videos', href: '/admin/upload-video', icon: 'solar:videocamera-record-bold' },
      { label: 'Birthday Cards', href: '/admin/poster', icon: 'solar:card-send-bold' },
      { label: 'Testimonials', href: '/admin/testimonials', icon: 'solar:heart-bold' },
    ],
  },
  {
    label: 'Campaigns',
    icon: 'solar:fire-bold-duotone',
    children: [
      { label: 'Categories', href: '/admin/category', icon: 'solar:folder-with-files-bold' },
      { label: 'All Campaigns', href: '/admin/campaigns', icon: 'solar:document-list-bold' },
    ],
  },
  { href: '/admin/voucher', label: 'Vouchers', icon: 'solar:ticket-sale-bold-duotone' },
  { href: '/admin/complaints', label: 'Messages', icon: 'solar:chat-round-dots-bold-duotone' },
  {
    href: '/admin/all-staff',
    label: 'Users & Staff',
    icon: 'solar:users-group-rounded-bold-duotone',
  },
  {
    href: '/admin/all-transaction',
    label: 'Transactions',
    icon: 'solar:card-transfer-bold-duotone',
  },
  {
    label: 'Reports',
    icon: 'solar:graph-square-bold-duotone',
    children: [
      { label: 'Income', href: '/admin/income', icon: 'solar:wad-of-money-bold' },
      { label: 'Database', href: '/admin/database', icon: 'solar:database-bold' },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggle = (label: string) => {
    setOpen((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  // Auto-open parent if child is active
  useEffect(() => {
    links.forEach((link) => {
      if (link.children?.some((child) => pathname === child.href)) {
        setOpen((prev) => ({ ...prev, [link.label]: true }))
      }
    })
  }, [pathname])

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg md:hidden"
      >
        <Icon icon="solar:hamburger-menu-bold" className="text-2xl" />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="z-99 fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={clsx(
          // Change 'top-0' to 'top-16' to start below the Navbar
          'fixed bottom-0 left-0 top-16 z-50 w-72 transform border-r border-gray-100 bg-white transition-all duration-300 ease-in-out md:relative md:top-0 md:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="z-auto flex h-full flex-col p-6">
          {/* Logo/Header */}
          <div className="mb-10 flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
              <Icon icon="solar:shield-user-bold" className="text-xl" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900">Admin Central</h2>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
            {links.map((link) => {
              const isActive = pathname === link.href
              const hasChildren = !!link.children
              const isParentOpen = open[link.label]

              if (hasChildren) {
                return (
                  <div key={link.label} className="py-1">
                    <button
                      onClick={() => toggle(link.label)}
                      className={clsx(
                        'group flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all duration-200',
                        isParentOpen
                          ? 'bg-blue-50/50 text-blue-600'
                          : 'text-gray-500 hover:bg-gray-50',
                      )}
                    >
                      <span className="flex items-center gap-3 text-sm font-semibold">
                        <Icon
                          icon={link.icon}
                          className={clsx(
                            'text-xl',
                            isParentOpen
                              ? 'text-blue-600'
                              : 'text-gray-400 group-hover:text-gray-600',
                          )}
                        />
                        {link.label}
                      </span>
                      <Icon
                        icon="solar:alt-arrow-down-bold"
                        className={clsx(
                          'text-xs transition-transform duration-300',
                          isParentOpen && 'rotate-180',
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {isParentOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-100">
                            {link.children?.map((child) => {
                              const isChildActive = pathname === child.href
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className={clsx(
                                    'flex items-center gap-3 px-6 py-2.5 text-sm transition-all duration-200',
                                    isChildActive
                                      ? 'font-bold text-blue-600'
                                      : 'text-gray-500 hover:text-gray-900',
                                  )}
                                >
                                  <Icon icon={child.icon} className="text-lg" />
                                  {child.label}
                                </Link>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href!}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    'group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200',
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900',
                  )}
                >
                  <Icon
                    icon={link.icon}
                    className={clsx(
                      'text-xl',
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600',
                    )}
                  />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Footer Area */}
          <div className="mt-auto border-t border-gray-100 pt-6">
            <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />{' '}
              {/* Replace with actual Admin Avatar */}
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-xs font-bold text-gray-900">Admin Account</p>
                <p className="truncate text-[10px] text-gray-500">Sign out</p>
              </div>
              <Icon
                icon="solar:logout-bold"
                className="cursor-pointer text-gray-400 hover:text-red-500"
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
