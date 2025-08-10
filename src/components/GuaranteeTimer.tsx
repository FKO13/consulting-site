'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function GuaranteeTimer() {
  const [hoursLeft, setHoursLeft] = useState(72)

  useEffect(() => {
    const interval = setInterval(() => {
      setHoursLeft(prev => prev > 0 ? prev - 1 : 0)
    }, 3600000) // Обновление каждый час
    
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-yellow-100 p-6 rounded-xl text-center max-w-md mx-auto my-12"
    >
      <h3 className="text-xl font-bold mb-2">Гарантированный результат через:</h3>
      <motion.div 
        key={hoursLeft}
        animate={{ scale: [1, 1.05, 1] }}
        className="text-5xl font-bold text-blue-600"
      >
        {hoursLeft} часов
      </motion.div>
    </motion.div>
  )
}