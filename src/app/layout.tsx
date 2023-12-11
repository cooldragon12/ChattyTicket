
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

export default async function RootLayout(props: {
  children: React.ReactNode 
}) {

  return (
    <StyleProvider>
        <html lang="en">
          <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
          <body className={inter.className}>
            <Suspense unstable_expectedLoadTime={1000} fallback={<Loading/>}>
              <NavigationBar />
              {props.children}
            </Suspense>
          </body>
        </html>
      </StyleProvider>
  )
}
