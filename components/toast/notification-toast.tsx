/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'

type Props = {
  notification: any
}

export default function NotificationToast({ notification }: Props) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-slideIn">
      <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-xl border w-[320px]">
        <div className="text-primary text-xl">
          <Icon icon="bxs:notification" />
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-dark">
            {notification.title}
          </h4>

          <p className="text-sm text-gray-600">
            {notification.description}
          </p>
        </div>
      </div>

      <style jsx>{`
        .animate-slideIn {
          animation: slideIn 0.35s ease;
        }

        @keyframes slideIn {
          from {
            transform: translateY(80px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}