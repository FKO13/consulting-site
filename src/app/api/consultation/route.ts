import { NextResponse } from 'next/server'

export const runtime = 'nodejs'         // гарантируем Node.js
export const dynamic = 'force-dynamic'  // не кэшируем и не статизируем

type Payload = {
  name: string
  phone: string
  message?: string
  source?: string
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload

    // Основные серверные переменные
    const token =
      process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN /* мягкий фолбэк */
    const chatId =
      process.env.TELEGRAM_CHAT_ID || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID     /* мягкий фолбэк */

    if (!token || !chatId) {
      console.error('[consultation] Telegram not configured: missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID')
      return NextResponse.json(
        { error: 'Telegram не настроен', code: 'TELEGRAM_NOT_CONFIGURED' },
        { status: 500 }
      )
    }

    const text = [
      '📩 Новая заявка на консультацию',
      `👤 Имя: ${body.name}`,
      `📞 Телефон: ${body.phone}`,
      body.message ? `💬 Сообщение: ${body.message}` : undefined,
      body.source ? `🔖 Источник: ${body.source}` : undefined
    ]
      .filter(Boolean)
      .join('\n')

    const tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text
        // parse_mode: 'HTML' // если когда-нибудь захочешь форматирование — не забудь экранировать
      })
    })

    if (!tgResponse.ok) {
      const detail = await tgResponse.text().catch(() => '')
      console.error('[consultation] Telegram API error:', tgResponse.status, detail)
      return NextResponse.json(
        { error: 'Не удалось отправить сообщение в Telegram' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[consultation] Server error:', err)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
