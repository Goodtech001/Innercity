/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import { Icon } from '@iconify/react'
import { useState, useEffect, useCallback } from 'react'
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
  admin?: boolean | number
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
  const [loading, setLoading] = useState(false)

  const loadUserData = useCallback(() => {
    // 1. Check BOTH storage types for the specific key
    const stored =
      localStorage.getItem('course-training-profile') ||
      sessionStorage.getItem('course-training-profile')

    if (!stored) {
      setUser(null)
      return
    }

    try {
      const parsed = JSON.parse(stored)

      // 2. Handle nested "user" object or flat object
      // Your profile page saves as { ...parsed, user: updatedUser }
      const userData = parsed.user ? parsed.user : parsed

      // 3. Prevent old cached data from showing by validating the ID exists
      if (userData && userData.id) {
        const isAdmin = userData.admin === true || userData.admin === 1 || userData.admin === '1'
        setUser({ ...userData, admin: isAdmin })
      }
    } catch (error) {
      console.error('Failed to parse user session:', error)
    }
  }, [])

  useEffect(() => {
    // Initial load
    loadUserData()

    // Listen for changes made in other components (like GlassProfile)
    window.addEventListener('storage', loadUserData)

    // Custom event listener for same-window updates
    window.addEventListener('profileUpdate', loadUserData)

    return () => {
      window.removeEventListener('storage', loadUserData)
      window.removeEventListener('profileUpdate', loadUserData)
    }
  }, [loadUserData])

  const handleLogout = async () => {
    try {
      setLoading(true)
      await postLogoutService()
      sessionStorage.removeItem('course-training-profile')
      localStorage.removeItem('course-training-profile')
      localStorage.removeItem('token')
      router.refresh()
      router.push('/auth/login')
    } catch (error: any) {
      router.push('/sign-in')
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (name?: string) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0][0].toUpperCase()
    return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase()
  }

  const displayName = user?.fullname || user?.username || 'User'

  return (
    <div className={`relative flex h-fit w-fit flex-col ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="z-10 inline-flex items-center gap-2 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
      >
        {user?.avatar || user?.photo ? (
          <img
            src={user.avatar || user.photo}
            alt={user.fullname || 'User avatar'}
            // Added aspect-square and flex-shrink-0 to prevent squashing
            className={`aspect-square flex-shrink-0 rounded-full border border-gray-200 object-cover ${mobile ? 'h-10 w-10' : 'h-10 w-10'}`}
          />
        ) : (
          <div
            className={`relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-gray-500 font-semibold text-white shadow-md ${mobile ? 'h-8 w-8 text-sm' : 'h-10 w-10 text-xs'}`}
          >
            <span className="animate-shine absolute inset-0 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)]"></span>
            {getInitials(displayName)}
          </div>
        )}

        <Icon
          icon={'mynaui:chevron-down-solid'}
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div
            className={`absolute top-full z-20 mt-2 w-52 rounded-xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-black/5 ${direction === 'right' ? 'right-0' : 'left-0'}`}
          >
            <div className="mb-1 border-b border-gray-50 px-4 py-2">
              <p className="text-[10px] font-bold uppercase text-gray-400">Account</p>
              <p className="truncate text-xs font-medium text-gray-900">{displayName}</p>
            </div>

            <ul className="space-y-1">
              <li>
                <Link href="/profile?tab=profile" onClick={() => setIsOpen(false)}>
                  <button className="flex w-full items-center rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600">
                    <Icon icon="solar:user-bold" className="mr-3 h-5 w-5" />
                    Profile
                  </button>
                </Link>
              </li>

              {user?.admin && (
                <li>
                  <Link href="/admin" onClick={() => setIsOpen(false)}>
                    <button className="flex w-full items-center rounded-lg px-3 py-2 font-semibold text-amber-600 transition-colors hover:bg-amber-50">
                      <Icon icon="ri:admin-fill" className="mr-3 h-5 w-5" />
                      Admin Dashboard
                    </button>
                  </Link>
                </li>
              )}

              <li>
                <Link href="/profile?tab=campaigns" onClick={() => setIsOpen(false)}>
                  <button className="flex w-full items-center rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600">
                    <Icon icon="ri:funds-fill" className="mr-3 h-5 w-5" />
                    My Campaigns
                  </button>
                </Link>
              </li>

              <li className="border-t border-gray-50 pt-1">
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="flex w-full items-center rounded-lg px-3 py-2 text-red-500 transition-colors hover:bg-red-50"
                >
                  <Icon
                    icon={loading ? 'line-md:loading-twotone-loop' : 'solar:logout-3-bold'}
                    className="mr-3 h-5 w-5"
                  />
                  {loading ? 'Logging out...' : 'Logout'}
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
