// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Starfield3D from '@/components/Starfield3D'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Больше нуля | Профессиональный аудит Wildberries',
  description: 'Увеличиваем прибыль магазинов на Wildberries на 40-300%',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#05060d] text-gray-100 relative min-h-screen antialiased`}>

        {/* ⭐ Звёздный фон — под всеми секциями, фиксированный */}
        <Starfield3D />

        {/* Контент выше звёзд */}
        <div className="relative z-10">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>

      </body>
    </html>
  )
}
