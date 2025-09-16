// src/app/layout.tsx
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Starfield3D from '@/components/Starfield3D'
import Script from 'next/script'

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
        {/* Яндекс.Метрика — как можно ближе к началу страницы */}
        <Script id="ym-loader" strategy="beforeInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
              k=e.createElement(t), a=e.getElementsByTagName(t)[0], k.async=1, k.src=r, a.parentNode.insertBefore(k,a)
            })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=104173686', 'ym');

            ym(104173686, 'init', {
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: 'dataLayer',
              accurateTrackBounce: true,
              trackLinks: true
            });
          `}
        </Script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/104173686"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>

        {/* ⭐ Фиксированный звёздный фон */}
        <Starfield3D />

        {/* Контент */}
        <div className="relative z-10">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>

        {/* SPA-хиты: отправляем ym('hit', url) при каждом переходе внутри приложения */}
        <Script id="ym-spa-hits" strategy="afterInteractive">
          {`
            (function() {
              function sendHit() {
                if (typeof ym === 'function') {
                  ym(104173686, 'hit', location.pathname + location.search);
                }
              }
              // первый просмотр
              sendHit();
              // фиксация изменений History API
              var _pushState = history.pushState;
              var _replaceState = history.replaceState;
              history.pushState = function() { _pushState.apply(this, arguments); setTimeout(sendHit, 0); };
              history.replaceState = function() { _replaceState.apply(this, arguments); setTimeout(sendHit, 0); };
              window.addEventListener('popstate', sendHit);
            })();
          `}
        </Script>
      </body>
    </html>
  )
}
