// src/components/ConsultationFormModal.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
  themeColor?: string
}

export default function ConsultationFormModal({
  isOpen,
  onClose,
  themeColor = 'var(--col-accent)'
}: Props) {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
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
    if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) return '+7' + digits.slice(1)
    if (digits.length === 10) return '+7' + digits
    return '+' + digits
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
      const payload = {
        name: formData.name.trim(),
        phone: normalizePhoneForSend(formData.phone),
        message: formData.message.trim(),
        source: 'Modal'
      }

      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data: any = await res.json().catch(() => null)

      if (!res.ok) {
        // Точное сообщение, если Телеграм не сконфигурен
        if (data?.code === 'TELEGRAM_NOT_CONFIGURED') {
          setError('Интеграция с Telegram не настроена. Свяжитесь с администратором.')
        } else {
          setError(data?.error || 'Ошибка отправки. Попробуйте позже.')
        }
        return
      }

      setIsSuccess(true)
      setFormData({ name: '', phone: '', message: '' })
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
      }, 1500)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка сети')
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
          {/* Фон */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Модалка */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.8, rotateX: -10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateX: -10 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
          >
            <div
              className="w-full max-w-md rounded-2xl shadow-2xl p-6 relative border-2"
              style={{
                borderColor: themeColor,
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
                boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${themeColor}33`
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Закрыть */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-200 cursor-pointer text-lg"
                aria-label="Закрыть"
              >
                ✖
              </button>

              <h3 className="text-2xl font-bold mb-3" style={{ color: themeColor }}>
                Получить консультацию
              </h3>

              {isSuccess ? (
                <div className="font-medium text-center" style={{ color: themeColor }}>
                  ✅ Заявка отправлена!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full rounded-lg border px-4 py-2 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-cyan-400 transition cursor-text"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                  <input
                    ref={phoneRef}
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full rounded-lg border px-4 py-2 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-cyan-400 transition cursor-text"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onFocus={handlePhoneFocus}
                    required
                  />
                  <textarea
                    placeholder="Сообщение (опционально)"
                    rows={3}
                    className="w-full rounded-lg border px-4 py-2 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-cyan-400 transition cursor-text"
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  />
                  {error && <div className="text-red-500 text-sm">{error}</div>}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-semibold uppercase shadow-lg transform transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl ${
                      isLoading ? 'opacity-80 cursor-wait' : 'cursor-pointer'
                    }`}
                    style={{
                      background: `linear-gradient(90deg, ${themeColor}, #7b5cff)`,
                      color: '#fff'
                    }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" /> Отправка...
                      </>
                    ) : (
                      'Отправить заявку'
                    )}
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
