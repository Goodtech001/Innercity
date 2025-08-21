import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type TCampaignCategoryCard = {
  data: {
    id: number
    banner: string
    category: string
    description: string
    subCategory: {
      id: number
      title: string
      description: string
    }[]
    createdAt: string
  }
}

export default function CampaignCategoryCard({
  data: { banner, category },
}: TCampaignCategoryCard) {
  return (
    <Link href={'/'} className="w-full max-w-72">
      <div className="group relative overflow-hidden rounded-lg shadow-[0px_0px_6px_1px_rgba(0,_0,_0,_0.1)]">
        <div className="absolute inset-0 z-10 aspect-1 w-full bg-gradient-to-b from-dark/0 to-dark/80 group-hover:to-dark" />
        <Image
          className="aspect-1 w-full object-cover group-hover:scale-105"
          alt={category}
          src={banner}
          width={270}
          height={260}
        />
      </div>
      <h5 className="mt-5 text-lg font-bold !leading-[100%] text-dark md:text-xl">{category}</h5>
    </Link>
  )
}
