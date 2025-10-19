import type { NextConfig } from 'next'
export const dynamic = 'force-dynamic';


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
      {
        protocol: 'https',
        hostname: 'static.mocortech.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'dummyimage.com',
      },
      {
        protocol: 'https',
        hostname: 'elements.envato.com',
      },
    ],
  },
}

export default nextConfig
