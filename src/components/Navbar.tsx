'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ConsultationFormModal from './ConsultationFormModal'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [themeColor] = useState<string>('var(--col-accent)') // setThemeColor удалён

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Услуги', href: '#services' },
    { name: 'Кейсы', href: '#cases' },
    { name: 'Процесс', href: '#process' },
    { name: 'Блог', href: '#blog' },
    { name: 'Контакты', href: '#contacts' }
  ]

  const handleNavClick = (href: string) => {
    const el = document.querySelector<HTMLElement>(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsOpen(false)
  }

  const openModal = () => setIsModalOpen(true)

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all ${
          scrolled
            ? 'bg-black/70 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">

          <motion.a
            href="#"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 bg-clip-text text-transparent cursor-pointer inline-block"
            style={{ backgroundSize: '200% 200%' }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          >
            {Array.from('Больше Нуля').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 300 }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.a>

          <nav className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="relative text-gray-200 hover:text-white transition-colors duration-300
                           after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 
                           after:bg-gradient-to-r after:from-blue-500 after:to-indigo-500
                           hover:after:w-full after:transition-all after:duration-300"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <button
            onClick={openModal}
            className="hidden md:block px-6 py-2 font-semibold text-white rounded-full
                       bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg cursor-pointer
                       transition-all duration-300 transform
                       hover:-translate-y-0.5 hover:scale-105
                       hover:shadow-[0_0_18px_rgba(59,130,246,0.7)]
                       active:scale-95"
          >
            Консультация
          </button>

          <button
            className="md:hidden text-gray-200 z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="md:hidden fixed top-0 left-0 w-full h-screen bg-black/90 backdrop-blur-lg z-40 flex flex-col justify-center items-center space-y-8"
            >
              {navItems.map(item => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-2xl text-gray-200 hover:text-white transition-colors duration-300"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => {
                  setIsOpen(false)
                  openModal()
                }}
                className="px-8 py-3 font-semibold text-white rounded-full
                           bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg cursor-pointer
                           transition-all duration-300 transform
                           hover:-translate-y-0.5 hover:scale-105
                           hover:shadow-[0_0_18px_rgba(59,130,246,0.7)]
                           active:scale-95"
              >
                Консультация
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <ConsultationFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        themeColor={themeColor}
      />
    </>
  )
}
