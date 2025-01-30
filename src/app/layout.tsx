import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CryptoDash | Live Cryptocurrency Prices, Market Data & Analysis',
  description: 'Track real-time cryptocurrency prices, market caps, and trading volumes. Get detailed information about Bitcoin, Ethereum, and other digital assets with our comprehensive crypto monitoring platform.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex justify-center flex-col items-center py-6 bg-neutral-950 text-white`}>

        <Header />
        {children}

      </body>
    </html>
  )
}
