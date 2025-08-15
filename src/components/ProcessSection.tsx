'use client'
import { motion } from 'framer-motion'

const steps = [
  { title: "Анализ", description: "Глубокий аудит вашего магазина", icon: "🔍" },
  { title: "Стратегия", description: "Разработка индивидуального плана", icon: "📊" },
  { title: "Реализация", description: "Внедрение улучшений", icon: "🚀" },
  { title: "Контроль", description: "Мониторинг результатов", icon: "📈" }
]

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 bg-transparent relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Как мы работаем</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/20 p-6 rounded-xl shadow text-center"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
