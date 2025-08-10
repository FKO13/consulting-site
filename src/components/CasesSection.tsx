'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Loader2 } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setIsSuccess(true)
        setFormData({ name: '', phone: '', message: '' })
      }
    } catch (err) {
      console.error('Ошибка отправки формы:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contacts" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Контакты</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Левая колонка с контактами */}
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

          {/* Правая колонка с формой */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {isSuccess ? (
              <div className="text-center p-8 bg-green-50 rounded-lg">
                <h3 className="text-2xl font-bold text-green-600 mb-2">Спасибо!</h3>
                <p>Мы свяжемся с вами в течение 15 минут</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full p-4 border rounded-lg"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="w-full p-4 border rounded-lg"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Сообщение"
                  rows={5}
                  className="w-full p-4 border rounded-lg"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    'Отправить'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
