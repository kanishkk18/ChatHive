import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { SocketProvider } from '@/contexts/SocketContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChatHive',
  description: 'Real-time chat application',
  icons: {
    icon: 'https://res.cloudinary.com/kanishkkcloud18/image/upload/v1723382809/Kanishkk/chathive/zxkt4gkl4whqgexhjlma.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SocketProvider>
          {children}
          <Toaster closeButton richColors />
        </SocketProvider>
      </body>
    </html>
  )
}