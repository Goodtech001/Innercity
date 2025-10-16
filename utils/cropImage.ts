// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function getCroppedImg(imageSrc: string, crop: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = imageSrc
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = crop.width
      canvas.height = crop.height
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        return reject(new Error('Failed to get 2D context'))
      }

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      )

      canvas.toBlob((blob) => {
        if (!blob) {
          return reject(new Error('Canvas is empty'))
        }
        const fileUrl = URL.createObjectURL(blob)
        resolve(fileUrl)
      }, 'image/jpeg')
    }

    image.onerror = (e) => {
      reject(new Error('Failed to load image'))
    }
  })
}
