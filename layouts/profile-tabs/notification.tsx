/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Icon } from '@iconify/react'
import React, { useEffect, useState, useCallback } from 'react'
import NotificationCard from '@/components/notifications-card'
import NotificationToast from '@/components/toast/notification-toast'

type Notification = {
  id: number
  title: string
  description: string
  type: string
  date: string
  isRead: boolean
  checked?: boolean
}

type Props = {
  user: any
  onClose: () => void; // Add this line
}

export default function Notifications({ user, onClose }: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [toastNotification, setToastNotification] = useState<any>(null)
  
  const userId = user?.id

  useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  // ✅ 1. Reusable Load Function (Production Ready)
  const loadNotifications = useCallback(async () => {
    if (!userId) return
    try {
      const res = await fetch(`/api/notifications/${userId}`, { cache: 'no-store' })
      const data = await res.json()

      if (Array.isArray(data) && data.length > 0) {
        setNotifications(data)
      } else {
        // Fallback to localStorage
        const stored = localStorage.getItem('user-notifications')
        const all = stored ? JSON.parse(stored) : {}
        setNotifications(all[userId] || [])
      }
    } catch (err) {
      const stored = localStorage.getItem('user-notifications')
      const all = stored ? JSON.parse(stored) : {}
      setNotifications(all[userId] || [])
    }
  }, [userId])

  // ✅ 2. Sync & Polling Effect
  useEffect(() => {
    loadNotifications()

    // Listen for storage changes (multi-tab)
    const handleStorage = () => {
      loadNotifications()
      const stored = localStorage.getItem('user-notifications')
      const all = stored ? JSON.parse(stored) : {}
      const latest = all[userId]?.[0]
      if (latest) setToastNotification(latest)
    }

    // Polling every 30s to catch Admin updates on Vercel
    const interval = setInterval(loadNotifications, 30000)
    window.addEventListener('storage', handleStorage)

    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', handleStorage)
    }
  }, [userId, loadNotifications])

  // ✅ 3. Restored Original Functions
  const isAnyChecked = notifications.some((n) => n.checked)
  const areAllChecked = notifications.length > 0 && notifications.every((n) => n.checked)

  const handleCheckboxChange = (id: string | number) => {
    const newNotifications = notifications.map((n) => {
      if (String(n.id) === String(id)) {
        return { ...n, checked: !n.checked }
      }
      return n
    })
    setNotifications(newNotifications)
  }

  const handleSelectAll = () => {
    const newCheckedState = !areAllChecked
    setNotifications((prev) => prev.map((n) => ({ ...n, checked: newCheckedState })))
  }

  const handleDeleteSelected = () => {
    const remaining = notifications.filter((n) => !n.checked)
    setNotifications(remaining)

    const all = JSON.parse(localStorage.getItem('user-notifications') || '{}')
    all[userId] = remaining
    localStorage.setItem('user-notifications', JSON.stringify(all))
  }

  const handleMarkRead = () => {
    const updated = notifications.map((n) =>
      n.checked ? { ...n, isRead: true, checked: false } : n,
    )
    setNotifications(updated)

    const all = JSON.parse(localStorage.getItem('user-notifications') || '{}')
    all[userId] = updated
    localStorage.setItem('user-notifications', JSON.stringify(all))
  }

  const filteredNotifications =
    filter === 'unread' ? notifications.filter((n) => !n.isRead) : notifications

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex justify-between items-center border-b pb-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-primary"
            checked={areAllChecked}
            onChange={handleSelectAll}
          />
          <span className="text-sm font-medium">Select All</span>
        </div>

        <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${
              filter === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${
              filter === 'unread' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            Unread
          </button>
        </div>
      </div>

      {/* Action Bar (Only shows when items are checked) */}
      {isAnyChecked && (
        <div className="flex gap-3 animate-in fade-in slide-in-from-top-1">
          <button
            onClick={handleDeleteSelected}
            className="flex items-center gap-1.5 bg-red-50 text-red-500 px-3 py-1.5 rounded-lg text-sm font-bold border border-red-100"
          >
            <Icon icon="solar:trash-bin-minimalistic-bold" width="18" />
            Delete Selected
          </button>

          <button
            onClick={handleMarkRead}
            className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-bold border border-blue-100"
          >
            <Icon icon="solar:check-read-bold" width="18" />
            Mark As Read
          </button>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.length === 0 ? (
          <div className="py-20 text-center text-gray-400 flex flex-col items-center">
            <Icon icon="solar:bell-off-bold" width={40} className="opacity-20 mb-2" />
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          filteredNotifications.map((n) => (
            <NotificationCard
              notification={n}
              key={n.id}
              handleCheckboxChange={() => handleCheckboxChange(n.id)}
            />
          ))
        )}
      </div>

      {/* Toast Notification */}
      {toastNotification && (
       <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-50 rounded-lg transition-colors text-gray-400"
        >
          <Icon icon="solar:close-circle-bold" width={20} />
        </button>
      )}
    </div>
  )
}