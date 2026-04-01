const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

const TOKEN = process.env.TOKEN;
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;

if (!TOKEN) {
  console.error('ERROR: TOKEN is missing in environment variables');
  process.exit(1);
}
if (!ADMIN_CHAT_ID) {
  console.error('ERROR: ADMIN_CHAT_ID is missing in environment variables');
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });
const PRICE_FILE = path.join(__dirname, 'price-list-2026.pdf');

const userState = new Map();

const keyboard = {
  reply_markup: {
    keyboard: [
      ['📄 Прайс', '🖼 Фото работ'],
      ['📷 Instagram', '❓ Вопросы'],
      ['📝 Оставить заявку', '📞 Контакты']
    ],
    resize_keyboard: true
  }
};

function sendMainMenu(chatId) {
  return bot.sendMessage(
    chatId,
    'Здравствуйте! Вас приветствует MasterRemont Bot.\n\nВыберите нужный пункт:',
    keyboard
  );
}

function isText(msg) {
  return typeof msg.text === 'string' && msg.text.trim().length > 0;
}

bot.onText(/\/start/i, async (msg) => {
  userState.delete(msg.chat.id);
  await sendMainMenu(msg.chat.id);
});

bot.on('message', async (msg) => {
  if (!isText(msg)) return;

  const chatId = msg.chat.id;
  const originalText = msg.text.trim();
  const text = originalText.toLowerCase();

  if (text === '/start') return;

  const state = userState.get(chatId);

  if (state && state.step === 'name') {
    state.name = originalText;
    state.step = 'phone';
    userState.set(chatId, state);
    await bot.sendMessage(chatId, 'Введите телефон:');
    return;
  }

  if (state && state.step === 'phone') {
    state.phone = originalText;
    state.step = 'repair_type';
    userState.set(chatId, state);
    await bot.sendMessage(chatId, 'Тип ремонта:');
    return;
  }

  if (state && state.step === 'repair_type') {
    state.repairType = originalText;
    state.step = 'area';
    userState.set(chatId, state);
    await bot.sendMessage(chatId, 'Площадь:');
    return;
  }

  if (state && state.step === 'area') {
    state.area = originalText;
    state.step = 'comment';
    userState.set(chatId, state);
    await bot.sendMessage(chatId, 'Комментарий:');
    return;
  }

  if (state && state.step === 'comment') {
    state.comment = originalText;

    const result =
`🔔 Новая заявка

👤 Имя: ${state.name}
📞 Телефон: ${state.phone}
🛠 Услуга: ${state.repairType}
📐 Площадь: ${state.area}
💬 Комментарий: ${state.comment}`;

    try {
      await bot.sendMessage(ADMIN_CHAT_ID, result);
      await bot.sendMessage(chatId, 'Заявка отправлена!', keyboard);
    } catch (err) {
      console.error('Failed to send admin message:', err.message);
      await bot.sendMessage(chatId, 'Не удалось отправить заявку. Попробуйте позже.');
    }

    userState.delete(chatId);
    return;
  }

  if (text.includes('прайс')) {
    try {
      await bot.sendDocument(chatId, PRICE_FILE, {
        caption: 'Актуальный прайс на ремонтные работы.\n📞 0953843101\n📍 Харьков'
      });
    } catch (err) {
      console.error('Failed to send price file:', err.message);
      await bot.sendMessage(chatId, 'Не удалось открыть прайс. Проверьте, что файл price-list-2026.pdf есть в проекте.');
    }
    return;
  }

  if (text.includes('фото')) {
    await bot.sendMessage(
      chatId,
      'Фото работ:\nhttps://drive.google.com/drive/folders/1tsnDu-x7fdwVZjtTwSZuuc2O1bTG3eQe'
    );
    return;
  }

  if (text.includes('instagram') || text.includes('инст')) {
    await bot.sendMessage(
      chatId,
      'Instagram:\nhttps://www.instagram.com/masterremont_kh'
    );
    return;
  }

  if (text.includes('контакт') || text.includes('телефон') || text.includes('связ')) {
    await bot.sendMessage(
      chatId,
      '📞 0953843101\n📍 Харьков'
    );
    return;
  }

  if (text.includes('вопрос')) {
    await bot.sendMessage(
      chatId,
      'Виды ремонта:\n- Косметический\n- Капитальный\n- Дизайнерский\n- Под ключ'
    );
    return;
  }

  if (text.includes('заявк')) {
    userState.set(chatId, { step: 'name' });
    await bot.sendMessage(chatId, 'Введите имя:');
    return;
  }

  await sendMainMenu(chatId);
});

bot.on('polling_error', (err) => {
  console.error('Polling error:', err.message);
});

console.log('Bot started...');
