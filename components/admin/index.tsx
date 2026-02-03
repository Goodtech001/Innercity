'use client'

import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import clsx from 'clsx'

type NavChild = {
  icon: string
  label: string
  href: string
}

type NavLink = {
  label: string
  icon: string
  href?: string
  children?: NavChild[]
}

const links: NavLink[] = [
  { href: '/admin', label: 'Overview', icon: 'pajamas:overview' },
  {
    label: 'Media',
    icon: 'fluent-mdl2:media-add',
    children: [
      { label: 'Banner', href: '/admin/hero-images', icon: 'pixel:image-solid' },
      { label: 'Video', href: '/admin/upload-video', icon: 'mingcute:video-fill' },
      { label: 'Birthday E-card', href: '/admin/poster', icon: 'emojione-monotone:birthday-cake' },
    ],
  },
  { href: '/admin/voucher', label: 'Vouchers', icon: 'mdi:voucher' },
  { href: '/admin/all-staff', label: 'Users', icon: 'fa:users' },
  { href: '/admin/all-transaction', label: 'Transaction', icon: 'hugeicons:transaction' },
  {
    label: 'Downloads',
    icon: 'solar:download-bold',
    children: [
      { label: 'Income', href: '/admin/income', icon: 'healthicons:low-income-level' },
      { label: 'Database', href: '/admin/database', icon: 'solar:database-bold' },
    ],
  },
]

export default function AdminSidebar() {
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggle = (label: string) => {
    setOpen(prev => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <>
      {/* 🔹 Mobile top bar */}
      <div className="md:hidden fle items-cente justify-between p-4 border-b bg-white">
        <h2 className="font-bold"></h2>
        <button onClick={() => setMobileOpen(true)}>
          <Icon icon="mdi:menu" className="text-2xl" />
        </button>
      </div>

      {/* 🔹 Overlay (mobile) */}
      {mobileOpen && (
        <div
          className="fixed inset- z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 🔹 Sidebar */}
      <aside
        className={clsx(
          'z-10 fixed top-0 left-0 h-full w-64 bg-white border-r p-4 transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:static md:block'
        )}
      >
        {/* Header */}
        <div className=" flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Admin Panel</h2>
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <Icon icon="mdi:close" className="text-xl" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {links.map(link => {
            if (link.children) {
              const isOpen = open[link.label]

              return (
                <div key={link.label}>
                  <button
                    onClick={() => toggle(link.label)}
                    className="w-full flex items-center justify-between px-2 py-2 font-semibold text-gray-700 hover:border-l-2 hover:border-blue-600"
                  >
                    <span className="flex items-center gap-2">
                      <Icon icon={link.icon} />
                      {link.label}
                    </span>
                    <Icon
                      icon="mdi:chevron-down"
                      className={clsx(
                        'transition-transform',
                        isOpen && 'rotate-180'
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div className="ml-6 mt-2 flex flex-col gap-2">
                      {link.children.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
                        >
                          <Icon icon={child.icon} />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={link.href}
                href={link.href!}
                onClick={() => setMobileOpen(false)}
                className="px-2 py-2 font-semibold text-gray-700 hover:border-l-2 hover:border-blue-600 flex items-center gap-2"
              >
                <Icon icon={link.icon} />
                {link.label}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
