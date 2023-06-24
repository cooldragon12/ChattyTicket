
import './globals.css'
import { Inter } from 'next/font/google'
import { Suspense} from 'react'
import dynamic from "next/dynamic"
import StyleProvider from '@/components/StyleProvider'
import Loading from './loading'
// import NavigationBar from '@/components/NavigationBar'
const NavigationBar = dynamic(() => import('@/components/NavigationBar'))
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
            <Suspense unstable_expectedLoadTime={1000} fallback={<Loading/>}>
              <NavigationBar />
              {children}
            </Suspense>
          </body>
        </html>
      </StyleProvider>
  )
}
