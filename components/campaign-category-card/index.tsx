'use client'

import { Icon } from '@iconify/react/dist/iconify.js'
import { motion } from 'framer-motion'

type Category = {
  id: number
  category: string
  description: string
  count?: number
  trending?: boolean
  icon?: string
}

type Props = {
  data: Category
  activeCategory: string | null
  setActiveCategory: (category: string) => void
}

const categoryConfig: Record<string, { icon: string; gradient: string }> = {
  health: {
    icon: 'solar:heart-bold',
    gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
  },
  education: {
    icon: 'solar:book-bold',
    gradient: 'from-indigo-500/20 via-blue-500/10 to-transparent',
  },
  charity: {
    icon: 'mdi:hand-heart',
    gradient: 'from-emerald-500/20 via-green-500/10 to-transparent',
  },
  emergency: {
    icon: 'mdi:alert',
    gradient: 'from-orange-500/20 via-red-500/10 to-transparent',
  },
  default: {
    icon: 'solar:category-bold',
    gradient: 'from-zinc-500/20 via-zinc-400/10 to-transparent',
  },
}

export default function CampaignCategoryCard({ data, activeCategory, setActiveCategory }: Props) {
  const isActive = activeCategory === data.category.toLowerCase()

  const config = categoryConfig[data.category.toLowerCase()] || categoryConfig.default

  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      onClick={() => setActiveCategory(data.category.toLowerCase())}
      className={`group relative w-full cursor-pointer overflow-hidden rounded-3xl border transition-all duration-300 ${
        isActive
          ? 'border-primary bg-primary/5 shadow-xl'
          : 'border-zinc-200/70 bg-whit hover:shadow-lg from-rose-500/20 via-pink-500/10 to-transparent'
      } `}
    >
      {/* ACTIVE GLOW */}
      {isActive && (
        <motion.div
          layoutId="activeCategoryGlow"
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"
        />
      )}

      {/* HOVER GRADIENT */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
          data.category.toLowerCase() === 'health'
            ? 'bg-gradient-to-br from-rose-500/20 via-pink-500/10 to-transparent'
            : data.category.toLowerCase() === 'education'
              ? 'bg-gradient-to-br from-indigo-500/20 via-blue-500/10 to-transparent'
              : data.category.toLowerCase() === 'charity'
                ? 'bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-transparent'
                : data.category.toLowerCase() === 'emergency'
                  ? 'bg-gradient-to-br from-orange-500/20 via-red-500/10 to-transparent'
                  : 'bg-gradient-to-br from-zinc-500/20 via-zinc-400/10 to-transparent'
        } `}
      />

      <div className="relative flex items-center justify-between p-6">
        {/* LEFT */}
        <div className="max-w-[65%]">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white md:text-xl">
              {data.category}
            </h3>

            {/* 🔥 TRENDING BADGE */}
            {data.trending && (
              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] text-orange-600 dark:bg-orange-500/10">
                Trending
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{data.description}</p>

          {/* COUNT + CTA */}
          <div className="mt-3 flex items-center gap-4 text-sm">
            <span className="text-zinc-500">{data.count ?? 0} campaigns</span>

            <span className="flex items-center gap-1 font-medium text-primary">
              View
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>

        {/* RIGHT ICON */}
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 ${
            isActive
              ? 'border-primary bg-primary text-white'
              : 'border-zinc-200/60 bg-zinc-100 dark:border-white/10 dark:bg-white/5'
          } `}
        >
          <Icon icon={config.icon} width={80} height={80} className="h-6 w-6" />
        </div>
      </div>

      {/* ACTIVE INDICATOR BAR */}
      <div
        className={`h-[2px] w-full transition-all duration-300 ${
          isActive
            ? 'bg-primary opacity-100'
            : 'bg-transparent opacity-0 group-hover:bg-primary/40 group-hover:opacity-100'
        } `}
      />
    </motion.div>
  )
}
