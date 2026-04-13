/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from "next/image"

export default function CampaignEcardPreview({
  ecard,
  images,
  title
}: any) {

  const uploadedImage =
    images?.length > 0
      ? URL.createObjectURL(images[0])
      : null

  return (
    <div className="relative w-full max-w-xl rounded-lg overflow-hidden shadow-lg">

      {/* Category Template */}
      <Image
        src={ecard}
        alt="ecard"
        width={800}
        height={500}
        className="w-full object-cover"
      />

      {/* User Uploaded Image */}
      {uploadedImage && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-lg overflow-hidden border-4 border-white">
          <img
            src={uploadedImage}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Campaign Title */}
      <div className="absolute bottom-5 left-5 text-white font-bold text-lg">
        {title}
      </div>

    </div>
  )
}