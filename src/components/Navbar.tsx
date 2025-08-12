'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import ConsultationFormModal from './ConsultationFormModal'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all ${scrolled ? 'bg-white/90 backdrop-blur border-b' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-blue-600">Больше нуля</a>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <a 
                key={item.href} 
                href={item.href}
                className="hover:text-blue-600 transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
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

        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              {navItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-2 hover:text-blue-600 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsModalOpen(true)
                  setIsOpen(false)
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-full mt-4"
              >
                Консультация
              </button>
            </div>
          </div>
        )}
      </header>

      <ConsultationFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
