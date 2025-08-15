import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'

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
      <body className={`hidden scroll-smooth antialiased`}>
        {children}
        <Footer />
        <div id="modal-root"></div>
      </body>
    </html>
  )
}
