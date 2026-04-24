/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { Icon } from '@iconify/react'
import { GetResourcesServiceResponse } from '@/services/resources.service'

type TResourceCardProps = {
  asset: GetResourcesServiceResponse
  onClick?: (asset: GetResourcesServiceResponse) => void
  onDownload?: (asset: GetResourcesServiceResponse) => void
}

function ResourceCard({ asset, onClick, onDownload }: TResourceCardProps) {
  const isVideo = asset.asset.resourceType === 'video'
  const fileUrl = asset.asset.url

  return (
    <div
      onClick={() => onClick && onClick(asset)}
      className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-lg text-white"
    >
      {isVideo ? (
        <video className="h-full w-full object-cover group-hover:scale-105">
          <source src={fileUrl} type="video/mp4" />
        </video>
      ) : (
        <img
          alt={asset.name}
          src={fileUrl}
          className="h-full w-full object-cover group-hover:scale-105"
        />
      )}

      {/* OVERLAY */}
      <div className="absolute inset-0 flex flex-col items-start justify-between bg-gradient-to-b from-dark/20 to-dark/90 p-2 group-hover:bg-dark/50 md:p-3">
        <div className="flex w-full items-start gap-1.5">
          {isVideo && (
            <Icon icon="line-md:play-filled" className="btn size-8 cursor-pointer p-1" />
          )}

          <div className="ml-auto flex flex-col gap-1.5 opacity-0 group-hover:opacity-100">
            <Icon
              icon="material-symbols:download"
              className="btn size-8 cursor-pointer p-1"
              onClick={(e) => {
                e.stopPropagation()
                if (onDownload) onDownload(asset)
              }}
            />
          </div>
        </div>

        <h5 className="text-xs font-semibold capitalize md:text-sm">{asset.name}</h5>
      </div>
    </div>
  )
}

export default ResourceCard