'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 overflow-hidden">
      {/* Анимированный фон */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.8) 0%, transparent 30%)',
            'radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.8) 0%, transparent 30%)',
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="block mb-4">Больше нуля</span>
            <span className="text-2xl md:text-3xl font-normal">Профессиональный аудит Wildberries</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Найдем скрытые ошибки, которые съедают до 40% вашей прибыли.
            Гарантия результата или вернем деньги.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold flex items-center gap-2"
            >
              Бесплатный разбор
              <ArrowRight size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold"
            >
              Заказать аудит — 40 000₽
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="text-white">Листайте вниз</div>
      </div>
    </section>
  )
  
}