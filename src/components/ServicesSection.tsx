'use client'
import { motion, useMotionValue } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import ConsultationFormModal from './ConsultationFormModal'

const services = [
  { 
    title: "Платный аудит", 
    price: "от 30 000₽",  
    description: "Полный разбор карточек товаров с гарантией результата", 
    features: ["Выявление критических ошибок", "Анализ 10+ ключевых параметров", "Рекомендации по оптимизации"] 
  },
  { 
    title: "Консалтинг PRO", 
    price: "до 15% от прибыли",  
    description: "Полное сопровождение для магазинов от 10 млн/мес", 
    features: ["Персональный менеджер 24/7", "Еженедельные отчеты", "Оптимизация рекламных кампаний"] 
  },
  { 
    title: "Запуск продаж", 
    price: "от 200 000₽",  
    description: "Быстрый старт продаж с полного нуля", 
    features: ["Фотоконтент/Видео", "Проработка конкурентов", "Настройка SEO", "Запуск РК", "Быстрый старт продаж", "Постановка и реализация плана продаж", "Аудит РК", "Управление РК"] 
  },
  { 
    title: "Запуск нового товара", 
    price: "от 250 000₽",  
    description: "Полный цикл запуска нового продукта на маркетплейс", 
    features: ["Анализ ниши", "Поиск поставщика", "Закупка и ФФ", "Запуск продаж"] 
  }
]

export default function ServicesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [themeColor, setThemeColor] = useState<string>('var(--col-accent)')
  const containerRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const [slideWidth, setSlideWidth] = useState(0)
  const [speed, setSpeed] = useState(1) // скорость движения

  const openModalWithTheme = () => {
    setThemeColor('var(--col-accent)')
    setIsModalOpen(true)
  }

  const displayedServices = [...services, ...services]

  // Определяем ширину одного слайда
  useEffect(() => {
    if (!containerRef.current) return
    const firstSlide = containerRef.current.querySelector<HTMLDivElement>('div')
    if (firstSlide) setSlideWidth(firstSlide.offsetWidth + 32) // gap
  }, [])

  // Бесконечная прокрутка
  useEffect(() => {
    if (!slideWidth) return
    let frame: number

    const animate = () => {
      x.set(x.get() - speed) // движение влево с текущей скоростью
      if (Math.abs(x.get()) >= slideWidth * services.length) {
        x.set(0) // wrap-around
      }
      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [slideWidth, x, speed])

  return (
    <section id="services" className="py-20 bg-transparent relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Наши услуги</h2>

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
            whileTap={{ cursor: "grabbing" }}
          >
            {displayedServices.map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/20 p-8 rounded-xl shadow-lg text-white min-w-[300px] flex-shrink-0"
              >
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <div className="text-xl text-blue-400 font-bold mb-4">{service.price}</div>
                <p className="text-gray-300 mb-6">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={openModalWithTheme}
                  className="relative w-full px-6 py-3 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg transition-all transform hover:-translate-y-1 hover:brightness-110 cursor-pointer overflow-hidden"
                >
                  <span className="relative z-10">Оставить заявку</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-30 blur-xl animate-pulse rounded-full"></span>
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
