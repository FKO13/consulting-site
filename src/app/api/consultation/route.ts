import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log('🔹 API consultation вызван');

  try {
    const body = await req.json();
    console.log('📦 Получены данные формы:', body);

    const { name, phone, email } = body;

    if (!name || !phone || !email) {
      console.log('❌ Не все поля заполнены');
      return NextResponse.json({ ok: false, error: 'Не все поля заполнены' }, { status: 400 });
    }

    const TELEGRAM_BOT_TOKEN = '8286290657:AAElie3LRBu5biiOGYEdcve3BDi6pj-9_Hk';
    const TELEGRAM_CHAT_ID = '1190121053';

    try {
      const text = `📩 Новая заявка с сайта "Больше нуля"\n\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email}`;
      console.log('📨 Отправляем в Telegram:', text);

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
