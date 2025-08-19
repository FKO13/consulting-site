'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ConsultationFormModal from './ConsultationFormModal'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [themeColor, setThemeColor] = useState<string>('var(--col-accent)')

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
          <a
            href="#"
            className="text-2xl font-bold text-white hover:text-blue-400 transition"
          >
            Больше нуля
          </a>

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

          {/* 🔹 Кнопка консультации с курсором и эффектами */}
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
            className="md:hidden text-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Мобильное меню */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-black/90 backdrop-blur-lg border-t border-white/10"
            >
              <div className="container mx-auto px-6 py-6 flex flex-col space-y-6">
                {navItems.map(item => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="text-left text-gray-200 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setIsOpen(false)
                    openModal()
                  }}
                  className="px-6 py-3 font-semibold text-white rounded-full
                             bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg cursor-pointer
                             transition-all duration-300 transform
                             hover:-translate-y-0.5 hover:scale-105
                             hover:shadow-[0_0_18px_rgba(59,130,246,0.7)]
                             active:scale-95"
                >
                  Консультация
                </button>
              </div>
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
