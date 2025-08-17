import Link from 'next/link'
import React from 'react'
import dummyCategoryData from '@/json/dummy-category.json'
import CampaignCategoryCard from '@/components/campaign-category-card'

export default function ICMCampaignCategories() {
  return (
    <div>
      <div className="container py-8 pb-6 md:py-14 md:pb-8">
        <div className="mb-8 flex items-end justify-between">
          <h3 className="text-balance text-3xl font-bold text-dark md:text-4xl">
            ICM <span className="hidden md:inline">Campaign</span> Categories
          </h3>

          <Link className="font-semibold underline" href={'/campaigns'}>
            See more <span className="hidden md:inline">category</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 gap-y-8 md:grid-cols-4 md:gap-10 lg:gap-12">
          {/* fundraise campaign card */}
          {dummyCategoryData.map((data) => (
            <CampaignCategoryCard data={data} key={data.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
