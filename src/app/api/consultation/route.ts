import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body: { name: string; phone: string; message?: string } = await req.json()

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      console.error('Ошибка: TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы')
      return NextResponse.json({ error: 'Telegram не настроен' }, { status: 500 })
    }

    const text =
      `📩 Новая заявка на консультацию\n` +
      `👤 Имя: ${body.name}\n` +
      `📞 Телефон: ${body.phone}\n` +
      (body.message ? `💬 Сообщение: ${body.message}` : '')

    const tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    })

    if (!tgResponse.ok) {
      console.error('Ошибка при отправке в Telegram:', await tgResponse.text())
      return NextResponse.json({ error: 'Не удалось отправить сообщение в Telegram' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Ошибка сервера:', err)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
