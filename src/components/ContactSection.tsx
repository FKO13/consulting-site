'use client'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone } from 'lucide-react'

export default function ContactSection() {
  return (
    <section id="contacts" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Контакты</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-start">
              <MapPin className="text-blue-600 mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Адрес</h3>
                <p>г. Москва, ул. Примерная, 123</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="text-blue-600 mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p>info@bolshe-nulya.ru</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="text-blue-600 mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Телефон</h3>
                <p>+7 (999) 123-45-67</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Ваше имя" 
                className="w-full p-4 border rounded-lg"
                required
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full p-4 border rounded-lg"
                required
              />
              <textarea 
                placeholder="Сообщение" 
                rows={5}
                className="w-full p-4 border rounded-lg"
                required
              ></textarea>
              <button 
                type="submit"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition"
              >
                Отправить
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}