'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import ConsultationFormModal from './ConsultationFormModal'

export default function LossCalculator() {
  const [turnover, setTurnover] = useState(5000000)
  const losses = Math.round(turnover * 0.25)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [themeColor, setThemeColor] = useState<string>('var(--col-accent)')

  const getSectionAccentColor = () => {
    const section = document.querySelector('#calculator')
    if (!section) return undefined
    return getComputedStyle(section).getPropertyValue('--col-accent')?.trim() || undefined
  }

  const openModalWithTheme = () => {
    const accent = getSectionAccentColor()
    if (accent) setThemeColor(accent)
    setIsModalOpen(true)
  }

  return (
    <section
      id="calculator"
      className="py-20 bg-transparent relative z-10"
      style={{ '--col-accent': '#1d4ed8' } as React.CSSProperties}
    >
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto bg-gray-900/20 rounded-xl shadow-xl overflow-hidden text-white"
        >
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-8">Сколько вы теряете без аудита?</h2>
            
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Ваш оборот:</span>
                <span className="font-bold">{new Intl.NumberFormat('ru-RU').format(turnover)} ₽/мес</span>
              </div>
              <input
                type="range"
                min="100000"
                max="50000000"
                step="100000"
                value={turnover}
                onChange={(e) => setTurnover(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>100 тыс ₽</span>
                <span>50 млн ₽</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-2">
                {new Intl.NumberFormat('ru-RU').format(losses)} ₽
              </div>
              <p className="text-gray-300">ежемесячных потерь</p>
            </div>
          </div>

          <div className="bg-gray-800/30 p-6 text-center">
            <button 
              onClick={openModalWithTheme}
              className="relative px-8 py-3 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg transition-all transform hover:-translate-y-1 hover:brightness-110 cursor-pointer overflow-hidden"
            >
              <span className="relative z-10">Узнать как исправить</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-30 blur-xl animate-pulse rounded-full"></span>
            </button>
          </div>
        </motion.div>
      </div>

      <ConsultationFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        themeColor={themeColor}
      />
    </section>
  )
}
