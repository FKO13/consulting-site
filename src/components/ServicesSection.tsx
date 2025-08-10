'use client'
import { motion } from 'framer-motion'

const services = [
  {
    title: "Платный аудит",
    price: "25 000₽",
    description: "Полный разбор карточек товаров с гарантией результата",
    features: [
      "Выявление критических ошибок",
      "Анализ 10+ ключевых параметров",
      "Рекомендации по оптимизации"
    ]
  },
  {
    title: "Консалтинг PRO",
    price: "15% от прибыли",
    description: "Полное сопровождение для магазинов от 10 млн/мес",
    features: [
      "Персональный менеджер 24/7",
      "Еженедельные отчеты",
      "Оптимизация рекламных кампаний"
    ]
  }
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Наши услуги</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <div className="text-xl text-blue-600 font-bold mb-4">{service.price}</div>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                Оставить заявку
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}