// app/api/consultation/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log('🔹 API consultation вызван');

  try {
    const body = await req.json();
    console.log('📦 Получены данные формы:', body);

    const { name, phone, message } = body;

    if (!name || !phone || !message) {
      console.log('❌ Не все поля заполнены');
      return NextResponse.json({ ok: false, error: 'Не все поля заполнены' }, { status: 400 });
    }

    // Забираем данные из .env.local
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('❌ Переменные окружения TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы');
      return NextResponse.json({ ok: false, error: 'Server configuration error' }, { status: 500 });
    }

    // Формируем сообщение
    const text = `📩 Новая заявка с сайта "Больше нуля"\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n💬 Сообщение: ${message}`;

    // Отправка в Telegram
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const tgRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
      });

      const tgData = await tgRes.json();
      console.log('📬 Ответ Telegram API:', tgData);
    } catch (tgErr) {
      console.error('⚠ Ошибка отправки в Telegram', tgErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('💥 API error', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
