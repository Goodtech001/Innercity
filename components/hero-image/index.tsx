// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'

// import { useEffect, useState } from 'react'
// import HeroCardStack from '../hero-card-stack'
// // import HeroCardStack from './hero-card-stack'

// type Card = {
//   id: string
//   image: string
// }

// export default function HeroImage() {
//   const [cards, setCards] = useState<Card[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//   fetch('/api/hero-images')
//     .then(async res => {
//       const text = await res.text()

//       try {
//         const json = JSON.parse(text)
//         setCards(
//           json.map((img: any) => ({
//             id: img.id,
//             image: img.imageUrl,
//           }))
//         )
//       } catch {
//         console.error('API returned non-JSON:', text)
//       }
//     })
// }, [])


//   // 🔹 Loading skeleton
//   if (loading) {
//     return (
//       <div className="h-72 w-full rounded-3xl bg-gray-100 animate-pulse" />
//     )
//   }

//   // 🔹 Guard: require enough images
//   if (cards.length < 3) {
//     console.warn('Hero stack requires at least 3 images')
//     return null
//   }

//   return <HeroCardStack items={cards} />
// }
