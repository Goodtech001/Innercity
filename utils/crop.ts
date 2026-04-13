export default function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = imageSrc
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) return reject(new Error('Failed to get canvas context'))

      canvas.width = pixelCrop.width
      canvas.height = pixelCrop.height

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
      )

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'))
          return
        }
        const blobUrl = URL.createObjectURL(blob)
        resolve(blobUrl)
      }, 'image/png')
    }
    image.onerror = () => reject(new Error('Failed to load image'))
  })
}
