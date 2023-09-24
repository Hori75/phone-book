'use client';
import './globals.css'
import { ApolloWrapper } from '@/apollo-client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ApolloProvider } from '@apollo/client'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Phone Book',
  description: 'View, Update, and Delete your contacts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isClient, setIsClient] = useState(false);
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          {isClient && children}
        </ApolloWrapper>
      </body>
    </html>
  )
}
