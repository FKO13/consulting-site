'use client'

import { Mail, Phone, Send, MessageCircle, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 text-gray-300 pt-20 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Лого + описание */}
        <div>
          <h3 className="text-3xl font-extrabold mb-4 text-white tracking-tight">
            Больше нуля
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Профессиональный аудит и консалтинг для Wildberries. 
            Мы помогаем масштабировать бизнес и достигать новых высот.
          </p>
        </div>

        {/* Услуги */}
        <div>
          <h4 className="font-bold text-white mb-4">Услуги</h4>
          <ul className="space-y-2">
            <li>
              <a href="#services" className="hover:text-cyan-400 transition">
                Платный аудит
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-cyan-400 transition">
                Консалтинг PRO
              </a>
            </li>
          </ul>
        </div>

        {/* Контакты */}
        <div>
          <h4 className="font-bold text-white mb-4">Контакты</h4>
          <p className="flex items-center gap-2">
            <Mail size={16} className="text-cyan-400" />
            <a href="mailto:info@bolshe-nulya.ru" className="hover:text-cyan-400 transition">
              info@bolshe-nulya.ru
            </a>
          </p>
          <p className="flex items-center gap-2 mt-2">
            <Phone size={16} className="text-cyan-400" />
            <a href="tel:+79697035000" className="hover:text-cyan-400 transition">
              +7 (969) 703-50-00
            </a>
          </p>
        </div>

        {/* Соцсети */}
        <div>
          <h4 className="font-bold text-white mb-4">Мы на связи</h4>
          <div className="flex space-x-4">
            <a
              href="https://t.me/bolshe0channel"
              target="_blank"
              rel="noopener noreferrer"
              title="Telegram"
              className="p-2 rounded-full bg-gray-800 hover:bg-cyan-500/20 transition"
            >
              <Send size={20} className="text-cyan-400" />
            </a>
            <a
              href="https://wa.me/message/3SSYG32Q2UVNE1"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
              className="p-2 rounded-full bg-gray-800 hover:bg-green-500/20 transition"
            >
              <MessageCircle size={20} className="text-green-400" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
              className="p-2 rounded-full bg-gray-800 hover:bg-red-500/20 transition"
            >
              <Youtube size={20} className="text-red-500" />
            </a>
          </div>
        </div>
      </div>

      {/* Нижняя полоска */}
      <div className="container mx-auto px-6 mt-12 pt-6 border-t border-gray-800 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Больше нуля. Все права защищены.
        </p>
      </div>
    </footer>
  )
}
