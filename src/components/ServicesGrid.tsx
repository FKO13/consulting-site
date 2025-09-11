'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import ConsultationFormModal from './ConsultationFormModal'

const services = [
  {
    title: "Платный аудит",
    price: "40 000₽",
    desc: "Полный разбор карточек товаров, ценовой политики и логистики с гарантией результата",
    features: [
      "Выявление критических ошибок",
      "Анализ 10+ ключевых параметров",
      "Рекомендации по оптимизации"
    ]
  },
  {
    title: "Консалтинг PRO",
    price: "15% от прибыли",
    desc: "Полное сопровождение для магазинов от 10 млн/мес",
    features: [
      "Персональный менеджер 24/7",
      "Еженедельные отчеты",
      "Оптимизация рекламных кампаний"
    ]
  }
]

export default function ServicesGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="py-20 relative z-10 bg-transparent">
      {/* overflow-x-clip убирает возможный горизонтальный скролл */}
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-x-clip">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-gray-900/20 p-8 rounded-xl shadow-lg border border-gray-700 text-white transition-transform duration-300"
          >
            <h3 className="font-bold mb-2 text-[clamp(20px,4vw,28px)]">{service.title}</h3>
            <div className="font-bold text-blue-400 mb-4 text-[clamp(18px,3.5vw,24px)]">
              {service.price}
            </div>
            <p className="text-gray-300 mb-6">{service.desc}</p>
            <ul className="space-y-2 mb-6">
              {service.features.map((feature, j) => (
                <li key={j} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-bold
                         shadow-md transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              Оставить заявку
            </button>
          </motion.div>
        ))}
      </div>

      <ConsultationFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}
