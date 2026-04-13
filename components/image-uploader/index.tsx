'use client'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useState } from 'react'
// import ima from "@/public/assets/images/education-class.jpg";

function ImageUploader() {
  const [image, setImage] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    setImage(imageUrl)
  }

  const placeholderImage = '/assets/images/video-thumbnail.jpg' // Change to your actual path

  return (
    <div className="relative h-[150px] w-full overflow-hidden rounded-lg shadow-md">
      {/* Next.js Image with fixed height and full width */}
      <div className="relative h-full w-full">
        <Image
          src={image || placeholderImage}
          alt="Preview"
          width={400}
          height={100}
          className="h-full w-full rounded-lg object-cover brightness-75"
        />
      </div>

      {/* Dark gradient overlay on bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-3/4 rounded-b-lg bg-gradient-to-t from-black/90 to-transparent" />

      {/* Camera icon in top-right corner */}
      <label
        htmlFor="file-upload"
        className="absolute right-2 top-2 cursor-pointer rounded-xl border border-primary bg-white p-2 shadow-xl transition hover:bg-gray-100"
      >
        <Icon icon="mdi:camera" width="24" height="24" className="text-primary" />
      </label>

      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  )
}

export default ImageUploader
