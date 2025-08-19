'use client'
import { motion } from 'framer-motion'
import { LineChart, Rocket, Search, Target } from 'lucide-react'

const steps = [
  { title: "Анализ", description: "Глубокий аудит вашего магазина", icon: <Search className="w-10 h-10 text-blue-400" /> },
  { title: "Стратегия", description: "Разработка индивидуального плана", icon: <Target className="w-10 h-10 text-indigo-400" /> },
  { title: "Реализация", description: "Внедрение улучшений", icon: <Rocket className="w-10 h-10 text-pink-400" /> },
  { title: "Контроль", description: "Мониторинг результатов", icon: <LineChart className="w-10 h-10 text-green-400" /> }
]

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 bg-transparent relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Как мы работаем
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 120 }}
              className="group bg-gray-900/20 backdrop-blur-sm p-8 rounded-2xl 
                         border border-transparent hover:border-blue-500/60
                         hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]
                         transition duration-300 ease-in-out cursor-pointer
                         flex flex-col items-center text-center relative"
            >
              <div className="mb-6 flex items-center justify-center 
                              w-20 h-20 rounded-full bg-black/30
                              border border-white/10 shadow-inner
                              group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]
                              transition">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold mb-3 text-white">
                {step.title}
              </h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
