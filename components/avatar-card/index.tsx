'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useRef, useEffect, useState, useCallback } from 'react'

type TAvatarCard = {
  cardImageSrc: string
  croppedImage1: string
  hole1: { x: number; y: number; width: number; height: number }
  cardDimensions: { width: number; height: number }
  onPreviewReady?: (preview: string) => void
  text?: string
}

const AvatarCard = ({
  cardImageSrc,
  croppedImage1,
  hole1,
  cardDimensions,
  onPreviewReady,
  text = 'Your Avatar',
}: TAvatarCard) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [loading, setLoading] = useState(true)

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image()

      if (!src.startsWith('blob:') && !src.startsWith('data:')) {
        img.crossOrigin = 'anonymous'
      }

      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error('Image failed to load'))
      img.src = src
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const scaleFactor = 3
    canvas.width = cardDimensions.width * scaleFactor
    canvas.height = cardDimensions.height * scaleFactor
    canvas.style.width = `${cardDimensions.width}px`
    canvas.style.height = `${cardDimensions.height}px`
    ctx.scale(scaleFactor, scaleFactor)

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    Promise.all([loadImage(croppedImage1), loadImage(cardImageSrc)])
      .then(([image1, cardImage]) => {
       drawImageCover(ctx, image1, hole1.x, hole1.y, hole1.width, hole1.height)
        ctx.drawImage(cardImage, 0, 0, cardDimensions.width, cardDimensions.height)

        ctx.font = '32px sans-serif'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'right'
        ctx.textBaseline = 'bottom'
        ctx.fillText(text, cardDimensions.width - 30, cardDimensions.height - 30)

        const dataUrl = canvas.toDataURL('image/jpeg')
        setPreview(dataUrl)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error generating preview:', error)
        setLoading(false)
      })

    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [cardImageSrc, croppedImage1, hole1, cardDimensions, text])

  const handlePreviewReady = useCallback(() => {
    if (onPreviewReady && preview) {
      onPreviewReady(preview)
    }
  }, [onPreviewReady, preview])

  useEffect(() => {
    handlePreviewReady()
  }, [preview])

  return (
    <div className="aspect-square relative h-full w-full">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 text-primary">
          <Icon icon="eos-icons:bubble-loading" width="24" height="24" />
        </div>
      )}

      <canvas ref={canvasRef} className="invisible absolute -z-10" />

      {preview && (
        <img
          src={preview}
          alt="Birthday card preview"
          className="absolute inset-0 h-full w-full object-contain"
        />
      )}
    </div>
  )
}

export default AvatarCard


function drawImageCover(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) {
  const imageAspect = image.width / image.height
  const boxAspect = width / height

  let sx = 0, sy = 0, sWidth = image.width, sHeight = image.height

  if (imageAspect > boxAspect) {
    // Image is wider → crop sides
    sWidth = image.height * boxAspect
    sx = (image.width - sWidth) / 2
  } else {
    // Image is taller → crop top and bottom
    sHeight = image.width / boxAspect
    sy = (image.height - sHeight) / 2
  }

  ctx.drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height)
}