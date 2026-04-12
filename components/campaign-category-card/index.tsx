import useTopnavbar from '@/layouts/topnavbar/useTopnavbar'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export type TCampaignCategoryCard = {
  data: {
    id: number
    banner: string
    category: string
    description: string
    path?: string
    subCategory: {
      id: number
      title: string
      description: string
    }[]
    createdAt: string
  }
}

export default function CampaignCategoryCard({
  data: { banner, category, description, subCategory },
}: TCampaignCategoryCard) {
  useTopnavbar()
  const router = useRouter()

  const handleCategoryClick = () => {
    if (!category) return
    router.push(`?category=${encodeURIComponent(category.toLowerCase())}`)
  }

  return (
    <div className="w-full max-w-72 group cursor-pointer">
      <div
        onClick={handleCategoryClick}
        className="
          relative overflow-hidden rounded-2xl
          border border-black/10 dark:border-white/10
          bg-white dark:bg-[#0B0F19]
          shadow-sm hover:shadow-xl
          transition-all duration-300
          hover:-translate-y-1
        "
      >
        {/* Image */}
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={banner}
            alt={category}
            fill
            className="object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
          />

          {/* Subtle fintech gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          {/* Top subtle highlight line (Stripe-style detail) */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {/* Category */}
          <h5 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
            {category}
          </h5>

          {/* Description */}
          <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Sub categories */}
          {subCategory?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {subCategory.slice(0, 3).map((sub) => (
                <span
                  key={sub.id}
                  className="
                    text-[11px] px-2 py-0.5 rounded-full
                    border border-zinc-200 dark:border-white/10
                    bg-zinc-50 dark:bg-white/5
                    text-zinc-600 dark:text-zinc-300
                  "
                >
                  {sub.title}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Subtle hover accent (Stripe-like focus glow) */}
        <div
          className="
            pointer-events-none absolute inset-0
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            bg-gradient-to-br from-indigo-500/5 via-transparent to-sky-500/5
          "
        />
      </div>
    </div>
  )
}


