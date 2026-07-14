import React from 'react'
import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './styles.css'

// Self-hosted, optimized font. Eliminates the render-blocking Google Fonts
// request and — via Next's automatic size-adjusted fallback — removes the
// layout shift (CLS) that the swap on the large hero heading was causing.
const cairo = Cairo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cairo',
})

export const metadata: Metadata = {
  title: 'The Knowledge Club™ — Empowering Minds & Shaping Futures',
  description:
    'The Knowledge Club™ — 11 seasons empowering minds and shaping futures. Premium leadership workshops, seminars, conferences and corporate olympics. Est. 2013.',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cairo.variable}>
      <head>
        {/* Warm up connections to the image origins for faster LCP */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://87404fcf36d406d8f48adc48bb2130ab.r2.cloudflarestorage.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
