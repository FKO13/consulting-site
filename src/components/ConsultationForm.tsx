'use client'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({ name: '', phone: '', email: '' })
      } else {
        console.error('Ошибка отправки формы:', await response.text())
        alert('❌ Не удалось отправить заявку. Попробуйте ещё раз.')
      }
    } catch (error) {
      console.error('Ошибка:', error)
      alert('⚠ Произошла ошибка при отправке.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-lg">
        <h3 className="text-2xl font-bold text-green-600 mb-2">Спасибо!</h3>
        <p>Мы свяжемся с вами в течение 15 минут</p>
      </div>
    )
  }

  return (
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
      <input
        type="email"
        placeholder="Email"
        className="w-full p-4 border rounded-lg"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2 w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            Отправка...
          </>
        ) : 'Получить консультацию'}
      </button>
    </form>
  )
}
