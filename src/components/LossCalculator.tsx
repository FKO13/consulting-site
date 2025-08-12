'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import ConsultationFormModal from './ConsultationFormModal'

export default function LossCalculator() {
  const [turnover, setTurnover] = useState(5000000)
  const losses = Math.round(turnover * 0.25)

  // Новое состояние для модалки
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="calculator" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-8">Сколько вы теряете без аудита?</h2>
            
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Ваш оборот:</span>
                <span className="font-bold">{new Intl.NumberFormat('ru-RU').format(turnover)} ₽/мес</span>
              </div>
              <input
                type="range"
                min="100000"
                max="50000000"
                step="100000"
                value={turnover}
                onChange={(e) => setTurnover(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>100 тыс ₽</span>
                <span>50 млн ₽</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {new Intl.NumberFormat('ru-RU').format(losses)} ₽
              </div>
              <p className="text-gray-600">ежемесячных потерь</p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 text-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition"
            >
              Узнать как исправить
            </button>
          </div>
        </motion.div>
      </div>

      {/* Модалка */}
      <ConsultationFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  )
}
