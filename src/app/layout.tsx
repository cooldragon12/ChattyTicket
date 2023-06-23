
import './globals.css'
import { Inter } from 'next/font/google'
import { Suspense, lazy } from 'react'
import StyleProvider from '@/components/StyleProvider'
// import NavigationBar from '@/components/NavigationBar'
const NavigationBar = lazy(() => import('@/components/NavigationBar'))
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ChattyTicket',
  description: 'A ticketing system for Valorant Chat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode 
}) {
  return (
    <StyleProvider>
        <html lang="en">
          <body className={inter.className}>
            <Suspense fallback={<div>Loading...</div>}>
              <NavigationBar />
              {children}
            </Suspense>
          </body>
        </html>
      </StyleProvider>
  )
}
