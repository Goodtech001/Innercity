'use client'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useRef, useState } from 'react'
// import ima from "@/public/assets/images/education-class.jpg";

function DpUploader() {
  const [image, setImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    setImage(imageUrl)
  }

  const placeholderImage = '/assets/images/memo.png'

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex w-full items-center justify-between rounded-md border-b p-2">
      {/* Image box (small thumbnail) */}
      <div className="flex gap-2 md:gap-5">
        <div className="border-color relative h-[50px] w-[50px] overflow-hidden rounded-full border">
          <Image
            src={image || placeholderImage}
            alt="Thumbnail"
            width={50}
            height={50}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-xs font-medium text-black md:text-lg">Brother Elumelu Paul</h1>
          <p>Lagos,Nigeria</p>
        </div>
      </div>

      {/* Camera Icon (clickable) */}
      <button
        onClick={triggerFileInput}
        className="flex gap-1 rounded border border-primary bg-gray-100 px-4 py-1 transition hover:bg-gray-300"
        title="Change Image"
      >
        <Icon icon="fluent:camera-edit-20-filled" width="20" height="20" className="text-primary" />
        <div className="text-sm font-medium text-primary">DP</div>
      </button>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  )
}

export default DpUploader
