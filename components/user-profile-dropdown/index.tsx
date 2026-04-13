/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { postLogoutService } from '@/app/auth/auth.service'

type TUser = {
  id?: number
  fullname?: string
  username?: string
  email?: string
  avatar?: string
  photo?: string
  admin?: boolean
}

type Props = {
  mobile?: boolean
  direction?: 'left' | 'right'
  className?: string
}

export default function UserProfileDropdown({ mobile, className, direction = 'right' }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<TUser | null>(null)

  const router = useRouter()

  // ✅ Load user exactly like your navbar logic should
  useEffect(() => {
    const stored = sessionStorage.getItem('course-training-profile')
    if (!stored) return

    const parsed = JSON.parse(stored)

    // IMPORTANT: match your login storage structure
    setUser(parsed.user || parsed)
  }, [])

  const handleLogout = async () => {
    try {
      await postLogoutService()
      sessionStorage.removeItem('course-training-profile')
      localStorage.removeItem('token')
      router.push('/')
      window.location.reload()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const getInitials = (name?: string) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0][0].toUpperCase()
    return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase()
  }

  const displayName = user?.fullname || 'User'

  return (
    <div className={`min- relative flex h-fit w-fit flex-col ${className}`}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="z-10 inline-flex items-center gap-2 rounded-full text-sm font-medium"
      >
        {/* Avatar or Initials (MATCHES ADMIN PAGE STYLE) */}
        {user?.avatar ? (
          <img
            src={user.avatar}
            className={`rounded-full object-cover ${mobile ? 'h-10 w-10' : 'h-9 w-9'}`}
          />
        ) : (
          <div
            className={`relative flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-gray-500 font-semibold text-white shadow-md ${mobile ? 'h-8 w-8 text-sm' : 'h-10 w-10 text-xs'}`}
          >
            <span className="animate-shine absolute inset-0 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)]"></span>
            {getInitials(displayName)}
          </div>
        )}

        <Icon icon={'mynaui:chevron-down-solid'} className="h-4 w-4" />

        <span className="hidden max-w-10 truncate font-medium sm:block">{displayName}</span>
      </button>

      {/* Dropdown */}
      <div
        className={`absolute -bottom-48 z-20 w-52 rounded shadow-sm ${
          isOpen ? 'block' : 'hidden'
        } ${direction === 'right' ? 'right-0' : 'left-0'}`}
      >
        <ul className="rounded-md border-2 bg-white p-2 text-sm ring-2">
          <li>
            <Link href="/profile?tab=profile">
              <button className="inline-flex w-full rounded px-4 py-2 hover:bg-ghost-white">
                <Icon icon="solar:user-bold" className="mr-2 h-5 w-5" />
                Profile
              </button>
            </Link>
          </li>

          <li>
            <Link href="/profile?tab=campaigns">
              <button className="inline-flex w-full rounded px-4 py-2 hover:bg-ghost-white">
                <Icon icon="ri:funds-fill" className="mr-2 h-5 w-5" />
                My Campaigns
              </button>
            </Link>
          </li>

          <li>
            <Link href="/profile?tab=notifications">
              <button className="inline-flex w-full rounded px-4 py-2 hover:bg-ghost-white">
                <Icon icon="bxs:notification" className="mr-2 h-5 w-5" />
                Notification
              </button>
            </Link>
          </li>

          <li>
            <Link href="/profile?tab=chat">
              <button className="inline-flex w-full rounded px-4 py-2 hover:bg-ghost-white">
                <Icon icon="material-symbols-light:chat" className="mr-2 h-5 w-5" />
                Chat
              </button>
            </Link>
          </li>

          {/* ✅ ADMIN BUTTON (Now Guaranteed To Work) */}
          {user?.admin === true && (
            <li>
              <Link href="/admin">
                <button className="inline-flex w-full rounded px-4 py-2 hover:bg-ghost-white">
                  <Icon icon="ri:admin-fill" className="mr-2 h-5 w-5" />
                  Admin
                </button>
              </Link>
            </li>
          )}

          {/* Logout */}
          <li>
            <button
              onClick={handleLogout}
              className="inline-flex w-full rounded px-4 py-2 text-red-500 hover:bg-ghost-white"
            >
              <Icon icon="solar:logout-bold" className="mr-2 h-5 w-5" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
