// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// /**
//  * GET – public
//  * Used by HeroImage component on homepage
//  */
// export async function GET() {
//   try {
//     const images = await prisma.heroImage.findMany({
//       orderBy: { order: 'asc' },
//       select: {
//         id: true,
//         imageUrl: true,
//       },
//     })

//     return NextResponse.json(images)
//   } catch (error) {
//     console.error('[HERO_IMAGES_GET]', error)
//     return NextResponse.json([], { status: 200 }) // fail gracefully
//   }
// }

// /**
//  * POST – admin only
//  * Saves hero images from admin page
//  */
// export async function POST(req: Request) {
//   try {
//     const body = await req.json()

//     const images: { imageUrl: string; order: number }[] = body.images

//     if (!Array.isArray(images)) {
//       return NextResponse.json(
//         { message: 'Invalid payload' },
//         { status: 400 }
//       )
//     }

//     // Clear existing hero images
//     await prisma.heroImage.deleteMany()

//     // Insert new ones
//     await prisma.heroImage.createMany({
//       data: images,
//     })

//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error('[HERO_IMAGES_POST]', error)
//     return NextResponse.json(
//       { message: 'Failed to save hero images' },
//       { status: 500 }
//     )
//   }
// }
