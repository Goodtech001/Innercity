'use client'
import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import dummyNotifications from '@/json/dummy-notifications.json'
import NotificationCard from '@/components/notifications-card'

export default function Notifications() {
  const [notifications, setNotifications] = useState(dummyNotifications)

  const isAnyChecked = notifications.some((n) => n.checked)
  const areAllChecked = notifications.every((n) => n.checked)

  const handleCheckboxChange = (id: string) => {
    console.log(id)
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
    setNotifications((prev) => prev.filter((n) => !n.checked))
  }

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
          <button className="btn-primary rounded-full px-4 py-1">All</button>
          <button className="btn-white rounded-full px-4 py-1">Unread</button>
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
          <div className="flex space-x-1 truncate rounded border border-transparent bg-blue-100 px-3 py-1 text-primary">
            <Icon icon="solar:check-read-bold" width="24" height="24" />
            <p>Mark As Read</p>
          </div>
        </div>
      )}

      {/* Notifications */}
      {notifications.map((n) => (
        <NotificationCard notification={n} key={n.id} handleCheckboxChange={handleCheckboxChange} />
      ))}
    </div>
  )
}
