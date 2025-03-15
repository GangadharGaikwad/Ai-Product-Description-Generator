import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'AI Product Description Generator',
  description: 'Create compelling, SEO-optimized product descriptions using AI',
}

// Separate viewport export as recommended by Next.js
export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Force CSS reload */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/_next/static/css/app/layout.css" precedence="high" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
          {children}
        </main>
      </body>
    </html>
  )
}
