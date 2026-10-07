// Отправка заявки (квиз и формы).
// TODO: подключить реальный канал (WhatsApp / Telegram-бот / Supabase) — пока заявка только пишется в консоль.
export async function sendLead(payload) {
  console.warn('[lead] отправка не подключена, данные заявки:', payload);
}
