const TelegramBot = require('node-telegram-bot-api');

const TOKEN = "ВСТАВЬ_СЮДА_ТОКЕН_БОТА";
const ADMIN_CHAT_ID = "ВСТАВЬ_СЮДА_СВОЙ_CHAT_ID";

const bot = new TelegramBot(TOKEN, { polling: true });

const keyboard = {
  reply_markup: {
    keyboard: [
      ["📄 Прайс", "🖼 Фото работ"],
      ["📷 Instagram", "❓ Вопросы"],
      ["📝 Оставить заявку", "📞 Контакты"]
    ],
    resize_keyboard: true
  }
};

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id,
    "Здравствуйте! Вас приветствует MasterRemont Bot.\n\nВыберите нужный пункт:",
    keyboard
  );
});

bot.on('message', (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === "📄 Прайс") {
    bot.sendDocument(chatId, "price-list-2026.pdf", {
      caption: "Актуальный прайс.\n📞 0953843101\n📍 Харьков"
    });
  }

  if (text === "🖼 Фото работ") {
    bot.sendMessage(chatId,
      "Фото работ:\nhttps://drive.google.com/drive/folders/1tsnDu-x7fdwVZjtTwSZuuc2O1bTG3eQe");
  }

  if (text === "📷 Instagram") {
    bot.sendMessage(chatId,
      "Instagram:\nhttps://www.instagram.com/masterremont_kh");
  }

  if (text === "📞 Контакты") {
    bot.sendMessage(chatId,
      "📞 0953843101\n📍 Харьков");
  }

  if (text === "❓ Вопросы") {
    bot.sendMessage(chatId,
      "Виды ремонта:\n- Косметический\n- Капитальный\n- Дизайнерский\n- Под ключ");
  }

  if (text === "📝 Оставить заявку") {
    bot.sendMessage(chatId, "Введите имя:");
    bot.once('message', (m1) => {
      const name = m1.text;

      bot.sendMessage(chatId, "Телефон:");
      bot.once('message', (m2) => {
        const phone = m2.text;

        bot.sendMessage(chatId, "Тип ремонта:");
        bot.once('message', (m3) => {
          const type = m3.text;

          bot.sendMessage(chatId, "Площадь:");
          bot.once('message', (m4) => {
            const area = m4.text;

            bot.sendMessage(chatId, "Комментарий:");
            bot.once('message', (m5) => {
              const comment = m5.text;

              const result = `🔔 Новая заявка
👤 ${name}
📞 ${phone}
🛠 ${type}
📐 ${area}
💬 ${comment}`;

              bot.sendMessage(ADMIN_CHAT_ID, result);
              bot.sendMessage(chatId, "Заявка отправлена!");
            });
          });
        });
      });
    });
  }
});

console.log("Bot started...");
