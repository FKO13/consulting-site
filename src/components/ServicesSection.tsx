'use client'
import { motion, useMotionValue } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import ConsultationFormModal from './ConsultationFormModal'

const services = [
  {
    title: 'Аудит PRO',
    price: 'Бесплатно',
    description: 'Полный разбор магазина/карточек с использованием авторского ПО',
    features: [
      'Глобальный скрининг ваших карточек (до 5 шт)',
      'Выявление критических ошибок',
      'Анализ 10+ ключевых параметров',
      'Рекомендации по оптимизации',
    ],
  },
  {
    title: 'Консалтинг PRO',
    price: 'до 15% от чистой прибыли',
    description: 'Полное сопровождение для магазинов под ключ',
    features: [
      'Вы отдыхаете - мы работаем',
      'Персональный менеджер 24/7',
      'Еженедельные отчеты',
      'Разработка и реализации стратегий в реальном времени',
      'Оптимизация рекламных кампаний в реальном времени',
    ],
  },
  {
    title: 'Запуск/перезапуск магазина',
    price: 'Определяется аудитом',
    description: 'Быстрый старт продаж с полного нуля',
    features: [
      'Фотоконтент/Видео',
      'Проработка конкурентов',
      'Настройка SEO',
      'Запуск РК',
      'Быстрый старт продаж',
      'Постановка и реализация плана продаж',
      'Аудит РК',
      'Управление РК',
    ],
  },
  {
    title: 'Запуск/перезапуск нового товара',
    price: 'Определяется аудитом',
    description: 'Полный цикл запуска нового продукта на маркетплейс',
    features: ['Анализ ниши', 'Поиск товара', 'Поиск поставщика', 'Закупка и ФФ', 'Запуск продаж'],
  },
]

export default function ServicesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [themeColor, setThemeColor] = useState<string>('var(--col-accent)')
  const containerRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const [slideWidth, setSlideWidth] = useState(0)
  const [speed, setSpeed] = useState(1)

  const openModalWithTheme = () => {
    setThemeColor('var(--col-accent)')
    setIsModalOpen(true)
  }

  const displayedServices = [...services, ...services]

  useEffect(() => {
    if (!containerRef.current) return
    const firstSlide = containerRef.current.querySelector<HTMLDivElement>('div')
    if (firstSlide) setSlideWidth(firstSlide.offsetWidth + 32) // gap
  }, [])

  useEffect(() => {
    if (!slideWidth) return
    let frame: number
    const animate = () => {
      x.set(x.get() - speed)
      if (Math.abs(x.get()) >= slideWidth * services.length) {
        x.set(0)
      }
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [slideWidth, x, speed])

  return (
    <section id="services" className="py-20 bg-transparent relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Наши услуги
        </h2>

        <div
          className="overflow-hidden relative"
          onMouseEnter={() => setSpeed(0.2)}
          onMouseLeave={() => setSpeed(1)}
        >
          <motion.div
            className="flex gap-8 w-max cursor-grab select-none"
            ref={containerRef}
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -Infinity, right: Infinity }}
            whileTap={{ cursor: 'grabbing' }}
          >
            {displayedServices.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="
                  bg-gray-900/20 p-8 rounded-2xl border border-transparent text-white
                  min-w-[320px] flex-shrink-0 flex flex-col justify-between
                  hover:border-blue-500/60 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]
                  transition duration-300 ease-in-out h-[480px]
                "
              >
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                  <div className="text-xl text-blue-400 font-bold mb-4">
                    {service.price}
                  </div>
                  <p className="text-gray-300 mb-6">{service.description}</p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={openModalWithTheme}
                  className="
                    inline-block w-full px-6 py-3 font-semibold text-white rounded-full
                    bg-gradient-to-r from-blue-500 to-indigo-600
                    shadow-md transition-all duration-300 cursor-pointer
                    hover:-translate-y-1 hover:shadow-lg hover:brightness-110
                  "
                >
                  Оставить заявку
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <ConsultationFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          themeColor={themeColor}
        />
      </div>
    </section>
  )
}
