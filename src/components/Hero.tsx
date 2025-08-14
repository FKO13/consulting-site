'use client'

import React, { useState } from 'react'
import ConsultationFormModal from "./ConsultationFormModal"
import { motion } from 'framer-motion'
import Hero3D from './Hero3D'

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  }
  const stagger = {
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  }

  return (
    <>
      <section className="relative h-screen overflow-hidden"> {/* убрали bg-black */}
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
            className="mt-6 flex gap-4"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              Получить консультацию
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 rounded-full border border-gray-500 text-white font-semibold hover:bg-white/10 transition"
            >
              Заказать аудит — 40 000₽
            </button>
          </motion.div>
        </motion.div>
      </section>

      <ConsultationFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
