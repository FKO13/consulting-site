import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, phone, message, source } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ error: 'Имя и телефон обязательны' }, { status: 400 });
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json({ error: 'Telegram не настроен' }, { status: 500 });
    }

    const text = `
📩 *Новая заявка с сайта*
📝 Имя: ${name}
📞 Телефон: ${phone}
💬 Сообщение: ${message || '—'}
🔍 Источник: ${source || 'не указан'}
    `;

    const telegramRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'Markdown'
      })
    });

    if (!telegramRes.ok) {
      throw new Error('Ошибка при отправке в Telegram');
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Ошибка отправки' }, { status: 500 });
  }
}
