'use client'
import { useState, useRef } from 'react'
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
  const [error, setError] = useState<string | null>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '')
    if (digits.length === 0) return ''
    const rest = digits.startsWith('7') ? digits.slice(1) : digits
    let result = '+7 '
    if (rest.length > 0) result += '(' + rest.slice(0, 3)
    if (rest.length >= 3) result += ') ' + rest.slice(3, 6)
    if (rest.length >= 6) result += '-' + rest.slice(6, 8)
    if (rest.length >= 8) result += '-' + rest.slice(8, 10)
    return result
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setFormData(prev => ({ ...prev, phone: formatted }))
    requestAnimationFrame(() => {
      if (phoneRef.current) {
        const pos = formatted ? formatted.length : 0
        phoneRef.current.setSelectionRange(pos, pos)
      }
    })
  }

  const handlePhoneFocus = () => {
    if (!formData.phone) {
      setFormData(prev => ({ ...prev, phone: '+7 ' }))
      requestAnimationFrame(() => {
        if (phoneRef.current) phoneRef.current.setSelectionRange(3, 3)
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!/^[А-Яа-яЁёA-Za-z\s]+$/.test(formData.name.trim())) {
      setError('Имя может содержать только буквы.')
      return
    }

    if (formData.phone.replace(/\D/g, '').length !== 11) {
      setError('Введите корректный номер телефона.')
      return
    }

    setIsLoading(true)

    try {
      const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
      const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

      if (!token || !chatId) {
        throw new Error('Переменные окружения Telegram не найдены')
      }

      const text = `📩 Новая заявка с сайта\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nСообщение: ${formData.message || '-'}`

      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text })
      })

      if (!res.ok) {
        // попробуем распарсить тело ответа
        let data: unknown = null
        try {
          data = await res.json()
        } catch {
          data = null
        }
        let desc: string | undefined
        if (data && typeof data === 'object' && 'description' in data) {
          desc = (data as { description?: string }).description
        }
        throw new Error(desc || 'Ошибка отправки в Telegram')
      }

      setIsSuccess(true)
      setFormData({ name: '', phone: '', message: '' })
    } catch (err: unknown) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Ошибка отправки.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contacts" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Контакты</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
            <div className="flex items-start">
              <MapPin className="text-blue-600 mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Адрес</h3>
                <p>г. Москва, ул. Примерная, 123</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="text-blue-600 mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Телефон</h3>
                <p>+7 (999) 123-45-67</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="text-blue-600 mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p>info@bolshe-nulya.ru</p>
              </div>
            </div>
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} onSubmit={handleSubmit} className="space-y-4">
            {isSuccess ? (
              <div className="text-center p-8 bg-green-50 rounded-lg">
                <h3 className="text-2xl font-bold text-green-600 mb-2">Спасибо!</h3>
                <p>Мы свяжемся с вами в течение 15 минут</p>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full p-4 border rounded-lg"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
                <input
                  ref={phoneRef}
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  className="w-full p-4 border rounded-lg"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onFocus={handlePhoneFocus}
                  required
                />
                <textarea
                  placeholder="Сообщение"
                  rows={5}
                  className="w-full p-4 border rounded-lg"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  required
                />
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 w-full ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
                >
                  {isLoading ? <> <Loader2 className="animate-spin" /> Отправка... </> : 'Отправить'}
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
