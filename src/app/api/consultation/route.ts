// src/app/api/consultation/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) return NextResponse.json({ error: 'Пустое тело запроса' }, { status: 400 })

    const { name, phone, message, source } = body as { name?: string, phone?: string, message?: string, source?: string }

    if (!name || !phone) {
      return NextResponse.json({ error: 'Поля name и phone обязательны' }, { status: 400 })
    }

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      console.error('Telegram env not configured on server')
      return NextResponse.json({ error: 'Telegram не настроен на сервере' }, { status: 500 })
    }

    const text = `📩 Новая заявка с сайта
Имя: ${name}
Телефон: ${phone}
Сообщение: ${message || '-'}
Источник: ${source || 'site'}`

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    })

    let data: any = null
    try { data = await res.json() } catch(_) { data = null }

    if (!res.ok) {
      const desc = data && typeof data === 'object' && 'description' in data ? data.description : 'Ошибка Telegram API'
      console.error('Telegram API error:', res.status, desc, data)
      return NextResponse.json({ error: desc }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('API /consultation error:', err)
    return NextResponse.json({ error: (err instanceof Error ? err.message : String(err)) }, { status: 500 })
  }
}
