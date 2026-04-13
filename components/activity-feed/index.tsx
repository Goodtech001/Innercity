/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Icon } from '@iconify/react'

type Props = {
  payments: any[]
}

export default function ActivityFeed({ payments }: Props) {
  const activities = payments.slice(0, 6)

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h2 className="font-semibold mb-4 text-lg">Live Activity</h2>

      <div className="space-y-4">
        {activities.map((p: any) => (
          <div
            key={p.id}
            className="flex items-center gap-3 text-sm border-b pb-3"
          >
            <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
              <Icon icon="mdi:cash" />
            </div>

            <div className="flex-1">
              <p className="font-medium">
                {p.user?.fullname || 'Someone'} donated
              </p>

              <p className="text-gray-500 text-xs">
                {new Intl.NumberFormat('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                }).format(Number(p.amount))}
              </p>
            </div>

            <span className="text-xs text-gray-400">
              {new Date(p.created_at).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}