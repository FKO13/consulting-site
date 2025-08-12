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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
          >
            <h3 className="text-3xl font-bold mb-2">{service.title}</h3>
            <div className="text-2xl font-bold text-blue-600 mb-4">{service.price}</div>
            <p className="text-gray-600 mb-6">{service.desc}</p>
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
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-bold"
            >
              Оставить заявку
            </button>
          </motion.div>
        ))}
      </div>

      {/* Модалка */}
      <ConsultationFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}
