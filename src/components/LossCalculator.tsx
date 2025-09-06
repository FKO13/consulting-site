'use client'

import { useState, useEffect } from 'react'
import { animate } from 'framer-motion'
import ConsultationFormModal from './ConsultationFormModal'

export default function LossCalculator() {
  const [revenue, setRevenue] = useState<number>(1000000)
  const [displayedMinLoss, setDisplayedMinLoss] = useState<number>(0)
  const [displayedMaxLoss, setDisplayedMaxLoss] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const minLoss = Math.round(revenue * 0.1)  // 10%
  const maxLoss = Math.round(revenue * 0.3)  // 30%

  // Анимация чисел при изменении revenue
  useEffect(() => {
    const controlsMin = animate(displayedMinLoss, minLoss, {
      duration: 0.3, // ускоряем анимацию
      onUpdate: (v) => setDisplayedMinLoss(Math.floor(v)),
    })
    const controlsMax = animate(displayedMaxLoss, maxLoss, {
      duration: 0.3,
      onUpdate: (v) => setDisplayedMaxLoss(Math.floor(v)),
    })
    return () => {
      controlsMin.stop()
      controlsMax.stop()
    }
  }, [revenue, minLoss, maxLoss]) // теперь триггер только на revenue

  return (
    <section id="calculator" className="py-28 bg-transparent relative z-10">
      <div className="container mx-auto px-6">
        <div className="bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl p-10 shadow-xl max-w-3xl mx-auto relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Калькулятор потерь
          </h2>

          {/* Слайдер оборота */}
          <div className="mb-10">
            <label className="block text-gray-300 mb-4 text-lg">
              Ваш оборот: <span className="text-blue-400 font-semibold">{revenue.toLocaleString('ru-RU')} ₽</span>
            </label>
            <input
              type="range"
              min={100000}
              max={50000000}
              step={100000}
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          {/* Результат диапазона */}
          <div className="text-center mt-12">
            <p className="text-lg text-gray-300 mb-2">
              Без оптимизации вы можете терять:
            </p>
            <p className="text-4xl font-extrabold text-blue-400">
              от {displayedMinLoss.toLocaleString('ru-RU')} ₽ до {displayedMaxLoss.toLocaleString('ru-RU')} ₽
            </p>
            <p className="text-gray-400 mt-2">каждый месяц</p>
          </div>

          {/* CTA кнопка */}
          <div className="mt-12 text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="cta-button"
            >
              Узнать реальные потери и как их исправить
            </button>
          </div>
        </div>
      </div>

      {/* Модалка */}
      <ConsultationFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        themeColor="var(--col-accent)"
      />
    </section>
  )
}
