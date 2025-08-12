'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function ConsultationFormModal({ isOpen, onClose }: Props) {
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

  const normalizePhoneForSend = (formatted: string) => {
    const digits = formatted.replace(/\D/g, '')
    if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
      return '+7' + digits.slice(1)
    }
    if (digits.length === 10) {
      return '+7' + digits
    }
    return '+' + digits
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!/^[А-Яа-яЁёA-Za-z\s]+$/.test(formData.name.trim())) {
      setError('Имя может содержать только буквы.')
      return
    }

    const digitsLen = formData.phone.replace(/\D/g, '').length
    if (digitsLen !== 11) {
      setError('Введите корректный номер телефона.')
      return
    }

    setIsLoading(true)

    try {
      const normalizedPhone = normalizePhoneForSend(formData.phone)
      const payload = {
        name: formData.name.trim(),
        phone: normalizedPhone,
        message: formData.message.trim(),
        source: 'Модальное окно'
      }

      const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
      const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

      if (!token || !chatId) {
        setError('Telegram не настроен. Проверь .env.local')
        setIsLoading(false)
        return
      }

      const text = `📩 Новая заявка с сайта\nИмя: ${payload.name}\nТелефон: ${payload.phone}\nСообщение: ${payload.message || '-'}\nИсточник: ${payload.source}`

      console.log('📤 sending consultation to Telegram (modal):', payload)

      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text })
      })

      // безопасно распарсим ответ
      let data: unknown = null
      try {
        data = await res.json()
      } catch {
        data = null
      }

      if (!res.ok) {
        // если объект - попробуем достать description
        let description: string | undefined
        if (data && typeof data === 'object' && 'description' in data) {
          description = (data as { description?: string }).description
        }
        console.error('Ошибка Telegram API (modal):', res.status, data)
        setError(description || 'Ошибка отправки в Telegram')
        setIsLoading(false)
        return
      }

      setIsSuccess(true)
      setFormData({ name: '', phone: '', message: '' })

      setTimeout(() => {
        setIsSuccess(false)
        onClose()
      }, 1500)
    } catch (err: unknown) {
      console.error('Network error при отправке Telegram (modal):', err)
      setError(err instanceof Error ? err.message : 'Ошибка сети. Попробуйте ещё раз.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false)
      setError(null)
      setFormData({ name: '', phone: '', message: '' })
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
          >
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 relative">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
                aria-label="Закрыть"
              >
                ✖
              </button>

              <h3 className="text-2xl font-bold mb-3">Получить консультацию</h3>

              {isSuccess ? (
                <div className="text-green-600 font-medium">
                  ✅ Заявка отправлена!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full rounded-lg border px-4 py-2"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                  <input
                    ref={phoneRef}
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full rounded-lg border px-4 py-2"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onFocus={handlePhoneFocus}
                    required
                  />
                  <textarea
                    placeholder="Сообщение (опционально)"
                    rows={3}
                    className="w-full rounded-lg border px-4 py-2"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  />
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
                  >
                    {isLoading ? <> <Loader2 className="animate-spin" /> Отправка... </> : 'Отправить заявку'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
