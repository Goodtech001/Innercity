/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import NotificationCard from '@/components/notifications-card'
import { getUserNotifications } from '@/utils/notificationService'
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
type props = {
  user: any
}

export default function Notifications({ user }: props) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  //  const token = localStorage.getItem("token")

  const storedProfile = localStorage.getItem('course-training-profile')

  const parsedProfile = storedProfile ? JSON.parse(storedProfile) : null
  const [toastNotification, setToastNotification] = useState<any>(null)

  const userId = user?.id

  // ✅ Fetch user notifications
  useEffect(() => {
    if (!user?.id) return

    const loadNotifications = async () => {
      const res = await fetch(`/api/notification/${user.id}`)
      const data = await res.json()
      setNotifications(data)
    }

    loadNotifications()

    const handleStorage = () => {
      loadNotifications()

      const stored = localStorage.getItem('user-notifications')
      const all = stored ? JSON.parse(stored) : {}
      const latest = all[user.id]?.[0]

      if (latest) {
        setToastNotification(latest)
      }
    }

    window.addEventListener('storage', handleStorage)

    return () => window.removeEventListener('storage', handleStorage)
  }, [user])

  const isAnyChecked = notifications.some((n) => n.checked)
  const areAllChecked = notifications.length > 0 && notifications.every((n) => n.checked)

  const handleCheckboxChange = (id: string) => {
    const newNotifications = notifications.map((notification) => {
      if (String(notification.id) === String(id)) {
        return { ...notification, checked: !notification.checked }
      }
      return notification
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

    // update localStorage
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
    <div className="space-y-2">
      {/* Header */}
      <div className="flex justify-between border-b">
        <div className="mt-3 flex gap-2 md:mt-1">
          <input
            type="checkbox"
            className="mt-1 rounded-sm border border-primary"
            checked={areAllChecked}
            onChange={handleSelectAll}
          />
          <p>Select All</p>
        </div>

        <div className="mb-2 flex gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-full px-4 py-1 ${filter === 'all' ? 'btn-primary' : 'btn-white'}`}
          >
            All
          </button>

          <button
            onClick={() => setFilter('unread')}
            className={`rounded-full px-4 py-1 ${
              filter === 'unread' ? 'btn-primary' : 'btn-white'
            }`}
          >
            Unread
          </button>
        </div>
      </div>

      {/* Actions */}
      {isAnyChecked && (
        <div className="flex gap-3">
          <button
            onClick={handleDeleteSelected}
            className="flex space-x-1 truncate rounded border border-transparent bg-red-100 px-3 py-1 text-red-500"
          >
            <Icon icon="material-symbols:delete" width="24" height="24" />
            <p>Delete selected</p>
          </button>

          <button
            onClick={handleMarkRead}
            className="flex space-x-1 truncate rounded border border-transparent bg-blue-100 px-3 py-1 text-primary"
          >
            <Icon icon="solar:check-read-bold" width="24" height="24" />
            <p>Mark As Read</p>
          </button>
        </div>
      )}

      {/* Notifications */}

      {filteredNotifications.length === 0 ? (
        <div className="py-10 text-center text-gray-500">No notifications yet</div>
      ) : (
        filteredNotifications.map((n) => (
          <NotificationCard
            notification={n}
            key={n.id}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))
      )}

      {toastNotification && <NotificationToast notification={toastNotification} />}
    </div>
  )
}
