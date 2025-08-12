export async function sendToTelegram(name: string, phone: string, message?: string) {
  const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Переменные окружения не найдены");
  }

  const text = `🆕 Заявка с сайта\nИмя: ${name}\nТелефон: ${phone}\nСообщение: ${message || "-"}`;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData?.description || "Ошибка отправки");
  }

  return await res.json();
}
