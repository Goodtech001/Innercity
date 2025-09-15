import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import '@/styles/globals.css'
import '@/styles/tailwind.css'
import '@/styles/bg.css'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import 'react-phone-input-2/lib/style.css'

export const metadata: Metadata = {
  title: 'The InnerCity Mission Gifting Platform',
  openGraph: {
    title: 'The InnerCity Mission Fund Raising Platform',
    images: 'http://fundraise.theinnercitymission.ngo/images/logoblack.png',
    description:
      '#EveryChildIsYourChild: Reaching out globally to Children and Families in the InnerCities with Food, Shelter, Education and Safety.',
    url: 'https://fundraise.theinnercitymission.ngo',
  },
  description:
    '#EveryChildIsYourChild: Reaching out globally to Children and Families in the InnerCities with Food, Shelter, Education and Safety.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body id="root" className={`scroll-smooth antialiased`}>
        {children}
        <div id="modal-root"></div>
        <Analytics />
      </body>
    </html>
  )
}
