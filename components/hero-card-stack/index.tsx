'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let interval: any

type Card = {
  id: number | string
  image: string
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
      'https://images.unsplash.com/photo-1700934909225-072b51bae308?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1602181047856-c07f6c5d6353?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIyfHx8ZW58MHx8fHx8',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1728135020024-b617b9f96394?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM5fHx8ZW58MHx8fHx8',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1694286079499-0b8fae29d11a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ5fHx8ZW58MHx8fHx8',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1627394677822-a9c3351e57d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIzNnx8fGVufDB8fHx8fA%3D%3D',
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
    }, 5000)
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
