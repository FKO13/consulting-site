// Импортируем fetch корректно
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8286290657:AAElie3LRBu5biiOGYEdcve3BDi6pj-9_Hk';
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '1190121053';
const TEXT = 'Тестовое сообщение от бота 🚀';

async function sendTestMessage() {
  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: TEXT
    })
  });

  const data = await res.json();
  console.log('Ответ Telegram:', data);
}

sendTestMessage();
