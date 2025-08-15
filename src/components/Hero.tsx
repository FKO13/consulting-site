'use client'

import React, { useState, useEffect } from 'react'
import ConsultationFormModal from "./ConsultationFormModal"
import { motion, easeOut } from 'framer-motion' // <-- импорт easeOut
import Hero3D from './Hero3D'

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [themeColor, setThemeColor] = useState<string>('var(--col-accent)')

  // fadeUp с корректным easing
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: easeOut } // <-- используем функцию
    }
  }

  const stagger = {
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  }

  // Берём цвет из текущей секции через CSS-переменную (только на клиенте)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const section = document.querySelector<HTMLElement>('main > section:nth-of-type(1)')
    if (!section) return
    const accent = getComputedStyle(section).getPropertyValue('--col-accent')?.trim()
    if (accent) setThemeColor(accent)
  }, [])

  return (
    <>
      <section className="relative h-screen overflow-hidden">
        <Hero3D />

        <motion.div
          className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold"
          >
            Больше нуля — больше успеха
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-lg text-gray-300"
          >
            Профессиональный платный аудит Wildberries — глубокий разбор карточек,
            логистики и рекламных стратегий. Результат или возврат денег.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex gap-4 flex-wrap justify-center"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="cta-button"
            >
              Получить консультацию
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="cta-button border border-gray-500 bg-transparent text-white hover:filter hover:brightness-105"
            >
              Заказать аудит — от 30 000₽
            </button>
          </motion.div>
        </motion.div>
      </section>

      <ConsultationFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        themeColor={themeColor}
      />
    </>
  )
}
