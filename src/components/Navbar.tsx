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

  // Безопасно берём accent цвет секции
  const getSectionAccentColor = (selector: string = 'main > section:nth-of-type(1)'): string | undefined => {
    const section = document.querySelector<HTMLElement>(selector)
    if (!section) return undefined
    const accent = getComputedStyle(section).getPropertyValue('--col-accent')?.trim()
    return accent || undefined
  }

  const handleNavClick = (href: string) => {
    const el = document.querySelector<HTMLElement>(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })

    const accent = getSectionAccentColor(href)
    if (accent) setThemeColor(accent)

    setIsOpen(false) // закрываем мобильное меню
  }

  const openModalWithAccent = (selector: string = 'main > section:nth-of-type(1)') => {
    const accent = getSectionAccentColor(selector)
    if (accent) setThemeColor(accent)
    setIsModalOpen(true)
  }

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all ${scrolled ? 'bg-white/90 backdrop-blur border-b' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-blue-600">Больше нуля</a>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <button
                key={item.href} 
                onClick={() => handleNavClick(item.href)}
                className="hover:text-blue-600 transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <button
            onClick={() => openModalWithAccent()}
            className="hidden md:block cta-button flex-shrink-0"
          >
            Консультация
          </button>

          <button 
            className="md:hidden text-gray-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Мобильное меню с анимацией */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white border-t"
            >
              <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
                {navItems.map(item => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="py-2 hover:text-blue-600 transition text-left"
                  >
                    {item.name}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setIsOpen(false)
                    openModalWithAccent()
                  }}
                  className="cta-button mt-4 flex-shrink-0"
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
