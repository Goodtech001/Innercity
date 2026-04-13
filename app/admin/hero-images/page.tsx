'use client'

import { useState } from 'react'
import HeroCardStack from '@/components/hero-card-stack'

const MAX_IMAGES = 5

export default function HeroStackAdmin() {
  const [images, setImages] = useState<string[]>(
    Array(MAX_IMAGES).fill('')
  )

  /**
   * Build cards exactly the same way the frontend expects them
   */
//   const cards: Card[] = images
//     .filter(Boolean)
//     .slice(0, MAX_IMAGES)
//     .map((img, index) => ({
//       id: `hero-${index}`,
//       image: img,
//     }))

  const updateImage = (index: number, value: string) => {
    setImages(prev => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

//   const handleSave = async () => {
//     try {
//       await fetch('/api/hero-images', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(
//           cards.map(card => ({
//             imageUrl: card.image,
//           }))
//         ),
//       })

//       alert('Hero images saved successfully')
//     } catch (error) {
//       console.error(error)
//       alert('Failed to save hero images')
//     }
//   }

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-xl font-semibold">Hero Stack Images</h2>
        <p className="text-sm text-gray-500">
          Add up to {MAX_IMAGES} images. These control the homepage hero animation.
        </p>
      </header>

      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {images.map((value, index) => (
          <input
            key={index}
            placeholder={`Image URL ${index + 1}`}
            value={value}
            onChange={e => updateImage(index, e.target.value)}
            className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
        //   onClick={handleSave}
        //   disabled={cards.length === 0}
          className="rounded-lg bg-black px-5 py-2 text-white disabled:opacity-40"
        >
          Save Hero Images
        </button>
      </div>

      {/* Preview */}
      {/* {cards.length >= 3 && (
        <section className="mt-12">
          <h3 className="mb-4 text-sm font-medium text-gray-600">
            Live Preview
          </h3>

          <HeroCardStack />
        </section>
      )} */}
    </div>
  )
}





