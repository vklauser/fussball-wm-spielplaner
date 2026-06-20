import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { Header } from '@/components/layout/Header'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WM 2026 Spielplaner',
  description: 'Interaktiver Spielplan & K.O.-Bracket für die Fußball-WM 2026',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}>
      <body className="min-h-screen flex flex-col font-sans">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
