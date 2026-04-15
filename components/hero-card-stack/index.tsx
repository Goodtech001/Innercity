'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import white from "@/public/assets/images/white1.jpeg"
import white2 from "@/public/assets/images/white2.jpeg"
import white3 from "@/public/assets/images/white3.jpeg"
import black from "@/public/assets/images/blaack.avif"
import black2 from "@/public/assets/images/black3.png.avif"
import black3 from "@/public/assets/images/black2.avif"
import black4 from "@/public/assets/images/black4.avif"
import black5 from "@/public/assets/images/black5.avif"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let interval: any

type Card = {
  id: number | string
  image: string | StaticImageData
}

type CardStackProp = {
  items?: Card[]
  offset?: number
  scaleFactor?: number
}

const CARDS = [
  {
    id: 0,
    image:
     black
  },
  {
    id: 1,
    image:
     black3
  },
  {
    id: 2,
    image:
      black2
  },
  {
    id: 3,
    image:
      black4
  },
  {
    id: 4,
    image:
      black5
  },
  {
    id: 5,
    image:
      black
  },
  {
    id: 6,
    image:
      white,
  },
  {
    id: 7,
    image:
      white2,
  },
  {
    id: 8,
    image:
      white3,
  },
]

export default function HeroCardStack({
  items = CARDS,
  offset = 15,
  scaleFactor = 0.06,
}: CardStackProp) {
  const CARD_OFFSET = offset
  const SCALE_FACTOR = scaleFactor
  const [cards, setCards] = useState<Card[]>(items)
  const [isMobile, setIsMobile] = useState(false)

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards] // create a copy of the array
        newArray.unshift(newArray.pop()!) // move the last element to the front
        return newArray
      })
    }, 2000)
  }

  useEffect(() => {
    startFlipping()

    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width <= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="relative h-80 w-full md:h-auto">
      {cards.map((card, index) => {
        // First 2 go upward, next 2 go downward, rest stay hidden far
        let yPos = 0

        if (index === 1) yPos = -CARD_OFFSET // 1st behind → top
        if (index === 2) yPos = -CARD_OFFSET * 2 // 2nd behind → top
        if (index === 3) yPos = CARD_OFFSET * (isMobile ? 3.7 : 4.5) // 1st bottom
        if (index === 4) yPos = CARD_OFFSET * (isMobile ? 5.7 : 6.5) // 2nd bottom

        return (
          <motion.div
            key={card.id}
            className="absolute flex aspect-2 w-full flex-col justify-between rounded-3xl border shadow"
            style={{ transformOrigin: 'top center' }}
            animate={{
              top: yPos,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            <Image
              src={card.image}
              alt="cards"
              width={400}
              height={300}
              className="aspect-2 w-full rounded-2xl object-cover"
            />
          </motion.div>
        )
      })}
    </div>
  )
}



// 'use client'

// import { useEffect, useState } from 'react'
// import { motion } from 'framer-motion'
// import Image from 'next/image'

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// let interval: any

// export type Card = {
//   id: number | string
//   image: string
// }

// type CardStackProp = {
//   items: Card[]          // ← REQUIRED now
//   offset?: number
//   scaleFactor?: number
// }

// export default function HeroCardStack({
//   items,
//   offset = 15,
//   scaleFactor = 0.06,
// }: CardStackProp) {
//   const CARD_OFFSET = offset
//   const SCALE_FACTOR = scaleFactor

//   const [cards, setCards] = useState<Card[]>(items)
//   const [isMobile, setIsMobile] = useState(false)

//   useEffect(() => {
//     interval = setInterval(() => {
//       setCards(prev => {
//         const copy = [...prev]
//         copy.unshift(copy.pop()!)
//         return copy
//       })
//     }, 5000)

//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768)
//     }

//     handleResize()
//     window.addEventListener('resize', handleResize)

//     return () => {
//       clearInterval(interval)
//       window.removeEventListener('resize', handleResize)
//     }
//   }, [])

//   return (
//     <div className="relative h-80 w-full md:h-auto">
//       {cards.map((card, index) => {
//         let yPos = 0

//         if (index === 1) yPos = -CARD_OFFSET
//         if (index === 2) yPos = -CARD_OFFSET * 2
//         if (index === 3) yPos = CARD_OFFSET * (isMobile ? 3.7 : 4.5)
//         if (index === 4) yPos = CARD_OFFSET * (isMobile ? 5.7 : 6.5)

//         return (
//           <motion.div
//             key={card.id}
//             className="absolute w-full rounded-3xl border shadow"
//             style={{ transformOrigin: 'top center' }}
//             animate={{
//               top: yPos,
//               scale: 1 - index * SCALE_FACTOR,
//               zIndex: cards.length - index,
//             }}
//           >
//             <Image
//               src={card.image}
//               alt="Hero card"
//               width={400}
//               height={300}
//               className="aspect-2 w-full rounded-2xl object-cover"
//             />
//           </motion.div>
//         )
//       })}
//     </div>
//   )
// }
