// src/app/layout.tsx
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Starfield3D from '@/components/Starfield3D'

// ВАЖНО: пути относительные к этому файлу (src/app/layout.tsx)
const inter = localFont({
  src: [
    {
      path: '../../public/fonts/inter/InterVariable.woff2',
      style: 'normal',
      weight: '100 900',
    },
    {
      path: '../../public/fonts/inter/InterVariable-Italic.woff2',
      style: 'italic',
      weight: '100 900',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Больше нуля | Профессиональный аудит Wildberries',
  description: 'Увеличиваем прибыль магазинов на Wildberries на 40-300%',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${inter.variable} bg-[#05060d] text-gray-100 relative min-h-screen antialiased overflow-x-hidden`}
        style={{
          fontFamily:
            'var(--font-inter), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
        }}
      >
        {/* ⭐ Фиксированный звёздный фон */}
        <Starfield3D />

        {/* Контент */}
        <div className="relative z-10">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
