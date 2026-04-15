/* eslint-disable @typescript-eslint/no-explicit-any */
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

  useEffect(() => {
    // 1. Prioritize the profile object, NOT the raw token
    const stored = localStorage.getItem('course-training-profile') || 
                   sessionStorage.getItem('course-training-profile')
    
    if (!stored) {
      console.log("DEBUG: No user data found in storage.")
      return
    }

    try {
      // 2. Safely check if the data is even JSON before parsing
      if (!stored.startsWith('{')) {
        console.log("DEBUG: Stored data is a raw string (token), skipping parse.")
        return
      }

      const parsed = JSON.parse(stored)
      
      // Handle nested or flat structure
      const userData = parsed.user || parsed

      console.log("DEBUG - Raw User Data:", userData)
      

      // Exact check for the property "admin": true
      const isAdmin = userData.admin === true || userData.admin === 1

      console.log("DEBUG - Admin Check Result:", isAdmin)

      setUser({ ...userData, admin: isAdmin })
    } catch (error) {
      console.error("Failed to parse user session:", error)
    }
  }, [])

  const handleLogout = async () => {
    try {
      setLoading(true)
      await postLogoutService()
      sessionStorage.removeItem('course-training-profile')
      localStorage.removeItem('course-training-profile')
      router.refresh()
      router.push('/auth/login')
    } catch (error: any) {
      console.error('Logout error:', error)
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
        className="z-10 inline-flex items-center gap-2 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
      >
        {user?.avatar || user?.photo ? (
          <img
            src={user.avatar || user.photo}
            className={`rounded-full border border-gray-200 object-cover ${mobile ? 'h-10 w-10' : 'h-9 w-9'}`}
          />
        ) : (
          <div
            className={`relative flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-gray-500 font-semibold text-white shadow-md ${mobile ? 'h-8 w-8 text-sm' : 'h-10 w-10 text-xs'}`}
          >
            <span className="animate-shine absolute inset-0 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)]"></span>
            {getInitials(displayName)}
          </div>
        )}

        <span className="hidden max-w-[100px] truncate font-medium sm:block">{displayName}</span>
        <Icon icon={'mynaui:chevron-down-solid'} className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          
          <div
            className={`absolute top-full mt-2 z-20 w-52 rounded-xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-black/5 ${direction === 'right' ? 'right-0' : 'left-0'}`}
          >
            <div className="px-4 py-2 border-b border-gray-50 mb-1">
               <p className="text-[10px] font-bold uppercase text-gray-400">Account</p>
            </div>
            
            <ul className="space-y-1">
              <li>
                <Link href="/profile?tab=profile" onClick={() => setIsOpen(false)}>
                  <button className="flex w-full items-center rounded-lg px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Icon icon="solar:user-bold" className="mr-3 h-5 w-5" />
                    Profile
                  </button>
                </Link>
              </li>

              {/* ADMIN BUTTON */}
              {user?.admin && (
                <li>
                  <Link href="/admin" onClick={() => setIsOpen(false)}>
                    <button className="flex w-full items-center rounded-lg px-3 py-2 text-amber-600 hover:bg-amber-50 transition-colors font-semibold">
                      <Icon icon="ri:admin-fill" className="mr-3 h-5 w-5" />
                      Admin Dashboard
                    </button>
                  </Link>
                </li>
              )}

              <li>
                <Link href="/profile?tab=campaigns" onClick={() => setIsOpen(false)}>
                  <button className="flex w-full items-center rounded-lg px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Icon icon="ri:funds-fill" className="mr-3 h-5 w-5" />
                    My Campaigns
                  </button>
                </Link>
              </li>

              <li>
                <Link href="/profile?tab=notifications" onClick={() => setIsOpen(false)}>
                  <button className="flex w-full items-center rounded-lg px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Icon icon="bxs:notification" className="mr-3 h-5 w-5" />
                    Notification
                  </button>
                </Link>
              </li>

              <li>
                <Link href="/profile?tab=chat" onClick={() => setIsOpen(false)}>
                  <button className="flex w-full items-center rounded-lg px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Icon icon="material-symbols-light:chat" className="mr-3 h-5 w-5" />
                    Chat
                  </button>
                </Link>
              </li>

              <li className="pt-1 border-t border-gray-50">
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="flex w-full items-center rounded-lg px-3 py-2 text-red-500 hover:bg-red-50 transition-colors"
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