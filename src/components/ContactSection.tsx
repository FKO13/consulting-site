'use client'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Loader2 } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  // === форматирование телефона (оставил как было)
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
  const normalizePhone = (formatted: string) => {
    const digits = formatted.replace(/\D/g, '')
    if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) return '+7' + digits.slice(1)
    if (digits.length === 10) return '+7' + digits
    return '+' + digits
  }

  // === отправка формы
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
      const payload = {
        name: formData.name.trim(),
        phone: normalizePhone(formData.phone),
        message: formData.message.trim(),
        source: 'Contacts page'
      }
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        setError((data && data.error) ? data.error : 'Ошибка отправки. Попробуйте позже.')
        return
      }
      setIsSuccess(true)
      setFormData({ name: '', phone: '', message: '' })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка сети')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contacts" className="py-24 bg-transparent relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Свяжитесь с нами</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Контакты */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8 text-white">
            {[
              { icon: MapPin, title: 'Адрес', value: 'г. Санкт-Петербург, ул. Миллионная, 6' },
              { icon: Phone, title: 'Телефон', value: '+7 (969) 703-50-00' },
              { icon: Mail, title: 'Email', value: 'info@bolshe-nulya.ru' },
            ].map((item, i) => (
              <div key={i} className="flex items-start bg-gray-900/30 border border-gray-800 rounded-xl p-5 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition">
                <div className="p-3 rounded-full bg-gray-800 mr-4 flex items-center justify-center">
                  <item.icon className="text-blue-400" size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-300">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Форма */}
          <motion.form initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} onSubmit={handleSubmit} className="space-y-5 bg-gray-900/40 border border-gray-800 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
            {isSuccess ? (
              <div className="text-center p-8 bg-green-500/20 border border-green-500/40 rounded-xl">
                <h3 className="text-2xl font-bold text-green-400 mb-2">Спасибо!</h3>
                <p className="text-gray-200">Мы свяжемся с вами в течение 15 минут</p>
              </div>
            ) : (
              <>
                <input type="text" placeholder="Ваше имя" className="w-full p-4 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required />

                <input ref={phoneRef} type="tel" placeholder="+7 (___) ___-__-__" className="w-full p-4 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition" value={formData.phone} onChange={handlePhoneChange} onFocus={handlePhoneFocus} required />

                <textarea placeholder="Сообщение" rows={5} className="w-full p-4 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition" value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} required />

                {error && <div className="text-red-400 text-sm">{error}</div>}

                <button type="submit" disabled={isLoading} className={`w-full px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2 ${isLoading ? 'opacity-80 cursor-wait' : ''}`}>
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
