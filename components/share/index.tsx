'use client'

import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import kingsChatIcon from '@/public/assets/icons/kings-chat-icon.png'
import Image from 'next/image'

interface ShareModalProps {
  showShare: boolean
  setShowShare: (val: boolean) => void
  campaignUrl: string
  campaignTitle: string
  campaignImage?: string
}

export default function ShareModal({
  showShare,
  setShowShare,
  campaignUrl,
  campaignTitle,
  campaignImage,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(campaignUrl)
    setCopied(true)
    toast.success('Link copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLinks = [
    {
      name: 'KingsChat',
      image: kingsChatIcon, // Use image property instead // Best approximation for KingsChat style
      color: 'bg-[#00a2ed]',
      url: `https://www.kingsch.at/h/post?message=${encodeURIComponent(campaignTitle + ' ' + campaignUrl)}`,
    },
    {
      name: 'WhatsApp',
      icon: 'logos:whatsapp-icon',
      color: 'bg-[#25D366]',
      url: `https://wa.me/?text=${encodeURIComponent(campaignTitle + ' ' + campaignUrl)}`,
    },
    {
      name: 'X',
      icon: 'ri:twitter-x-fill',
      color: 'bg-black',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(campaignTitle)}&url=${encodeURIComponent(campaignUrl)}`,
    },
    {
      name: 'Facebook',
      icon: 'logos:facebook',
      color: 'bg-[#1877F2]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(campaignUrl)}`,
    },
  ]

  if (!showShare) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-md transition-all">
      <div className="w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white shadow-2xl dark:bg-neutral-900">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-gray-50 p-6 pb-4 dark:border-neutral-800">
          <h2 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
            Spread the Word
          </h2>
          <button
            onClick={() => setShowShare(false)}
            className="rounded-full bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-neutral-800"
          >
            <Icon icon="solar:close-circle-bold" width={24} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* MINI PREVIEW CARD (Visual Context) */}
          <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-3 dark:bg-neutral-800/50">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gray-200">
              <img
                src={campaignImage || '/placeholder.png'}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="mb-0.5 text-[10px] font-black uppercase tracking-widest text-blue-600">
                Campaign Sharing
              </p>
              <h3 className="truncate text-sm font-bold text-gray-900 dark:text-white">
                {campaignTitle}
              </h3>
            </div>
          </div>

          {/* SOCIAL GRID */}
          <div className="grid grid-cols-4 gap-4">
            {shareLinks.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg transition-transform group-hover:scale-110 ${platform.color}`}
                >
                  {platform.image ? (
                    <Image
                      src={platform.image}
                      alt={platform.name}
                      className="h-7 w-7 object-contain"
                    />
                  ) : (
                    <Icon icon={platform.icon!} width={24} />
                  )}
                </div>
                <span className="text-[10px] font-bold text-gray-500 dark:text-neutral-400">
                  {platform.name}
                </span>
              </a>
            ))}
          </div>

          <hr className="border-gray-50 dark:border-neutral-800" />

          {/* LINK COPY AREA */}
          <div className="space-y-2">
            <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
              Copy Link
            </label>
            <div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 p-2 transition-all focus-within:border-blue-200 dark:border-neutral-800 dark:bg-neutral-800">
              <input
                value={campaignUrl}
                readOnly
                className="flex-1 bg-transparent px-2 text-sm font-medium text-gray-600 outline-none dark:text-neutral-300"
              />
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-blue-600 active:scale-95"
              >
                <Icon icon={copied ? 'solar:check-read-linear' : 'solar:copy-bold'} width={16} />
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* CAMPAIGN TEMPLATE ACTION */}
          <button className="group flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 p-4 transition-all hover:border-blue-400 hover:bg-blue-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <Icon icon="solar:gallery-bold-duotone" width={24} />
            </div>
            <div className="text-left">
              <p className="text-sm font-black text-gray-900 dark:text-white">
                Download Design Template
              </p>
              <p className="text-[10px] text-gray-400">
                Share a personalized flyer for this campaign
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
