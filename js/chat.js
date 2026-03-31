const chatBody = document.getElementById("chatBody");
const chatButtons = document.getElementById("chatButtons");
const chatInput = document.getElementById("chatInput");
const chatWidget = document.getElementById("chatWidget");
const chatLauncher = document.getElementById("chatLauncher");
const chatClose = document.getElementById("chatClose");
const chatMinimize = document.getElementById("chatMinimize");
const chatLauncherText = document.getElementById("chatLauncherText");
const chatTitle = document.getElementById("chatTitle");
const chatSubtitle = document.getElementById("chatSubtitle");
const chatSendBtn = document.getElementById("chatSendBtn");

const translations = {
  ru: {
    launcher: "Чат",
    subtitle: "Онлайн-консультант",
    inputPlaceholder: "Введите сообщение...",
    send: "Отправить",
    typing: "Печатает...",
    openAria: "Открыть чат",
    minimizeAria: "Свернуть чат",
    closeAria: "Закрыть чат",
    greeting: "Здравствуйте! 👋\nПоможем с ремонтом, расчётом стоимости и заявкой без заполнения формы. Что вас интересует?",
    defaultHelp: "Здравствуйте! Я помогу сориентироваться по стоимости и принять заявку прямо в чате.",
    choose: "Выберите, что вас интересует:",
    buttonsMain: ["Узнать стоимость", "Виды ремонта", "Заявка", "Контакты"],
    buttonsRepair: ["Косметический", "Капитальный", "Дизайнерский"],
    buttonsAfterPrice: ["Косметический", "Капитальный", "Дизайнерский", "Заявка"],
    buttonsAfterContact: ["Заявка", "Узнать стоимость"],
    buttonsAfterSent: ["Узнать стоимость", "Контакты", "Новая заявка"],
    buttonsFallback: ["Прокрутить к форме", "Контакты"],
    costReply: "Стоимость ремонта зависит от типа и площади.\n\n• Косметический — от 3500 грн/м²\n• Капитальный — от 6000 грн/м²\n• Дизайнерский — от 8000 грн/м²\n\nМогу сразу оформить заявку и отправить её из чата.",
    repairsReply: "Мы выполняем:\n\n• Косметический\n• Капитальный\n• Дизайнерский\n\nКакой вариант вас интересует?",
    selectedCosmetic: "Косметический ремонт выбран.",
    selectedCapital: "Капитальный ремонт выбран.",
    selectedDesign: "Дизайнерский ремонт выбран.",
    contactReply: "📞 +38 (095) 384-31-01\n\nТакже можно оставить заявку прямо в чате.",
    leadStart: "Хорошо 👌\nОформим заявку прямо в чате.\n\nНапишите, пожалуйста, ваше имя.",
    askPhone: "Спасибо. Теперь напишите ваш номер телефона.",
    askService: "Выберите тип ремонта.",
    askArea: "Отлично. Теперь напишите площадь объекта в м².",
    invalidPhone: "Похоже, номер введён не полностью. Напишите телефон ещё раз, например: +380951234567",
    invalidArea: "Введите площадь числом, например: 45",
    checking: (d) => `Проверяю данные:\n\nИмя: ${d.name}\nТелефон: ${d.phone}\nРемонт: ${d.service}\nПлощадь: ${d.area} м²\n\nОтправляю заявку...`,
    sent: (d) => `Готово ✅\n\nЗаявка отправлена без перехода к форме.\nИмя: ${d.name}\nТелефон: ${d.phone}\nРемонт: ${d.service}\nПлощадь: ${d.area} м²\n\nМы свяжемся с вами в рабочее время.`,
    fallback: "Не получилось отправить заявку автоматически.\nОткрою основную форму на сайте, чтобы вы могли отправить её обычным способом."
  },
  ua: {
    launcher: "Чат",
    subtitle: "Онлайн-консультант",
    inputPlaceholder: "Введіть повідомлення...",
    send: "Надіслати",
    typing: "Друкує...",
    openAria: "Відкрити чат",
    minimizeAria: "Згорнути чат",
    closeAria: "Закрити чат",
    greeting: "Вітаємо! 👋\nДопоможемо з ремонтом, розрахунком вартості та заявкою без заповнення форми. Що вас цікавить?",
    defaultHelp: "Вітаю! Я допоможу зорієнтуватися у вартості та прийняти заявку прямо в чаті.",
    choose: "Оберіть, що вас цікавить:",
    buttonsMain: ["Дізнатися вартість", "Види ремонту", "Заявка", "Контакти"],
    buttonsRepair: ["Косметичний", "Капітальний", "Дизайнерський"],
    buttonsAfterPrice: ["Косметичний", "Капітальний", "Дизайнерський", "Заявка"],
    buttonsAfterContact: ["Заявка", "Дізнатися вартість"],
    buttonsAfterSent: ["Дізнатися вартість", "Контакти", "Нова заявка"],
    buttonsFallback: ["Прокрутити до форми", "Контакти"],
    costReply: "Вартість ремонту залежить від типу та площі.\n\n• Косметичний — від 3500 грн/м²\n• Капітальний — від 6000 грн/м²\n• Дизайнерський — від 8000 грн/м²\n\nМожу одразу оформити заявку та надіслати її з чату.",
    repairsReply: "Ми виконуємо:\n\n• Косметичний\n• Капітальний\n• Дизайнерський\n\nЯкий варіант вас цікавить?",
    selectedCosmetic: "Косметичний ремонт обрано.",
    selectedCapital: "Капітальний ремонт обрано.",
    selectedDesign: "Дизайнерський ремонт обрано.",
    contactReply: "📞 +38 (095) 384-31-01\n\nТакож можна залишити заявку прямо в чаті.",
    leadStart: "Добре 👌\nОформимо заявку прямо в чаті.\n\nНапишіть, будь ласка, ваше ім'я.",
    askPhone: "Дякую. Тепер напишіть ваш номер телефону.",
    askService: "Оберіть тип ремонту.",
    askArea: "Чудово. Тепер напишіть площу об'єкта в м².",
    invalidPhone: "Схоже, номер введено не повністю. Напишіть телефон ще раз, наприклад: +380951234567",
    invalidArea: "Введіть площу числом, наприклад: 45",
    checking: (d) => `Перевіряю дані:\n\nІм'я: ${d.name}\nТелефон: ${d.phone}\nРемонт: ${d.service}\nПлоща: ${d.area} м²\n\nНадсилаю заявку...`,
    sent: (d) => `Готово ✅\n\nЗаявку відправлено без переходу до форми.\nІм'я: ${d.name}\nТелефон: ${d.phone}\nРемонт: ${d.service}\nПлоща: ${d.area} м²\n\nМи зв'яжемося з вами у робочий час.`,
    fallback: "Не вдалося автоматично відправити заявку.\nВідкрию основну форму на сайті, щоб ви могли надіслати її звичайним способом."
  }
};

const botState = {
  step: null,
  data: { name: "", phone: "", service: "", area: "" },
  started: false
};

function currentLang() {
  const activeBtn = document.querySelector(".lang-btn.active");
  if (activeBtn && activeBtn.dataset.lang) return activeBtn.dataset.lang === "ua" ? "ua" : "ru";
  const htmlLang = (document.documentElement.lang || "ru").toLowerCase();
  return htmlLang.startsWith("ua") || htmlLang.startsWith("uk") ? "ua" : "ru";
}
function t() {
  return translations[currentLang()];
}
function applyStaticTranslations() {
  const tr = t();
  if (chatLauncherText) chatLauncherText.textContent = tr.launcher;
  if (chatSubtitle) chatSubtitle.textContent = tr.subtitle;
  if (chatInput) chatInput.placeholder = tr.inputPlaceholder;
  if (chatSendBtn) chatSendBtn.textContent = tr.send;
  if (chatLauncher) chatLauncher.setAttribute("aria-label", tr.openAria);
  if (chatMinimize) chatMinimize.setAttribute("aria-label", tr.minimizeAria);
  if (chatClose) chatClose.setAttribute("aria-label", tr.closeAria);
}

function addMessage(text, sender = "bot") {
  const msg = document.createElement("div");
  msg.className = `chat-message ${sender}`;
  msg.innerHTML = text.replace(/\n/g, "<br>");
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}
function showTyping(callback) {
  const typing = document.createElement("div");
  typing.className = "chat-message bot typing";
  typing.textContent = t().typing;
  chatBody.appendChild(typing);
  chatBody.scrollTop = chatBody.scrollHeight;
  setTimeout(() => {
    typing.remove();
    callback();
  }, 700);
}
function showButtons(buttons) {
  chatButtons.innerHTML = "";
  buttons.forEach((text) => {
    const btn = document.createElement("button");
    btn.className = "chat-quick-btn";
    btn.type = "button";
    btn.textContent = text;
    btn.onclick = () => handleUserMessage(text);
    chatButtons.appendChild(btn);
  });
}
function openChat() {
  chatWidget.classList.add("open");
  chatWidget.classList.remove("compact");
  chatWidget.setAttribute("aria-hidden", "false");
  chatLauncher.style.opacity = "0";
  chatLauncher.style.pointerEvents = "none";
  setTimeout(() => chatInput && chatInput.focus(), 120);
}
function closeChat() {
  chatWidget.classList.remove("open");
  chatWidget.classList.add("compact");
  chatWidget.setAttribute("aria-hidden", "true");
  chatLauncher.style.opacity = "1";
  chatLauncher.style.pointerEvents = "auto";
}
function resetLeadState() {
  botState.step = null;
  botState.data = { name: "", phone: "", service: "", area: "" };
}
function startLeadFlow(service = "") {
  resetLeadState();
  botState.data.service = service;
  botState.step = "name";
  showTyping(() => {
    addMessage(t().leadStart);
    showButtons([]);
  });
}
function isValidPhone(phone) {
  const cleaned = phone.replace(/[^\d+]/g, "");
  return cleaned.length >= 10;
}
function isValidArea(text) {
  const value = parseFloat(String(text).replace(",", "."));
  return !isNaN(value) && value > 0;
}
function getLeadEndpoint() {
  const form = document.getElementById("lead-form");
  if (form && form.getAttribute("action")) return form.getAttribute("action");
  return "/.netlify/functions/send-telegram";
}
async function submitLeadDirectly() {
  const endpoint = getLeadEndpoint();
  const params = new URLSearchParams();
  params.append("source", currentLang() === "ua" ? "Чат-бот сайту" : "Чат-бот сайта");
  params.append("page", currentLang() === "ua" ? "Головна" : "Главная");
  params.append("website", "");
  params.append("name", botState.data.name);
  params.append("phone", botState.data.phone);
  params.append("service", botState.data.service);
  params.append("message", currentLang() === "ua" ? `Заявка з чату. Площа: ${botState.data.area} м²` : `Заявка из чата. Площадь: ${botState.data.area} м²`);

  if (chatSendBtn) chatSendBtn.disabled = true;
  if (chatInput) chatInput.disabled = true;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: params.toString()
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    showTyping(() => {
      addMessage(t().sent(botState.data));
      showButtons(t().buttonsAfterSent);
    });
    botState.step = "done";
  } catch (error) {
    showTyping(() => {
      addMessage(t().fallback);
      showButtons(t().buttonsFallback);
    });
    fillLeadFormFallback();
  } finally {
    if (chatSendBtn) chatSendBtn.disabled = false;
    if (chatInput) chatInput.disabled = false;
  }
}
function fillLeadFormFallback() {
  const form = document.getElementById("lead-form");
  if (!form) return;
  const nameInput = form.querySelector('input[name="name"]');
  const phoneInput = form.querySelector('input[name="phone"]');
  const serviceSelect = form.querySelector('select[name="service"]');
  if (nameInput) nameInput.value = botState.data.name || "";
  if (phoneInput) phoneInput.value = botState.data.phone || "";
  if (serviceSelect && botState.data.service) {
    const options = Array.from(serviceSelect.options);
    const match = options.find((opt) => opt.value.toLowerCase().includes(botState.data.service.toLowerCase()));
    if (match) serviceSelect.value = match.value;
  }
  form.scrollIntoView({ behavior: "smooth", block: "center" });
}
function finishLeadFlow() {
  showTyping(() => {
    addMessage(t().checking(botState.data));
    showButtons([]);
  });
  submitLeadDirectly();
}
function handleLeadStep(rawText) {
  const text = rawText.trim();
  if (botState.step === "name") {
    botState.data.name = text;
    botState.step = "phone";
    showTyping(() => addMessage(t().askPhone));
    return true;
  }
  if (botState.step === "phone") {
    if (!isValidPhone(text)) {
      showTyping(() => addMessage(t().invalidPhone));
      return true;
    }
    botState.data.phone = text;
    if (botState.data.service) {
      botState.step = "area";
      showTyping(() => addMessage(t().askArea));
    } else {
      botState.step = "service";
      showTyping(() => {
        addMessage(t().askService);
        showButtons(t().buttonsRepair);
      });
    }
    return true;
  }
  if (botState.step === "service") {
    botState.data.service = text;
    botState.step = "area";
    showTyping(() => {
      addMessage(t().askArea);
      showButtons([]);
    });
    return true;
  }
  if (botState.step === "area") {
    if (!isValidArea(text)) {
      showTyping(() => addMessage(t().invalidArea));
      return true;
    }
    botState.data.area = String(text).replace(",", ".").trim();
    finishLeadFlow();
    return true;
  }
  if (botState.step === "done" && (text.toLowerCase().includes("форма") || text.toLowerCase().includes("форми"))) {
    fillLeadFormFallback();
    return true;
  }
  return false;
}
function botReply(message) {
  const text = message.toLowerCase().trim();
  if (handleLeadStep(message)) return;

  if (
    text.includes("цена") || text.includes("стоимость") || text.includes("прайс") || text.includes("сколько стоит") ||
    text.includes("узнать стоимость") || text.includes("вартість") || text.includes("скільки коштує") || text.includes("дізнатися вартість")
  ) {
    showTyping(() => {
      addMessage(t().costReply);
      showButtons(t().buttonsAfterPrice);
    });
    return;
  }
  if (text.includes("косметический") || text.includes("косметичний")) {
    showTyping(() => addMessage(t().selectedCosmetic));
    startLeadFlow(currentLang() === "ua" ? "Косметичний" : "Косметический");
    return;
  }
  if (text.includes("капитальный") || text.includes("капітальний")) {
    showTyping(() => addMessage(t().selectedCapital));
    startLeadFlow(currentLang() === "ua" ? "Капітальний" : "Капитальный");
    return;
  }
  if (text.includes("дизайнерский") || text.includes("дизайнерський")) {
    showTyping(() => addMessage(t().selectedDesign));
    startLeadFlow(currentLang() === "ua" ? "Дизайнерський" : "Дизайнерский");
    return;
  }
  if (text.includes("виды ремонта") || text.includes("види ремонту") || text === "ремонт") {
    showTyping(() => {
      addMessage(t().repairsReply);
      showButtons(t().buttonsRepair);
    });
    return;
  }
  if (text.includes("заявка") || text.includes("нова заявка")) {
    startLeadFlow();
    return;
  }
  if (text.includes("контакт")) {
    showTyping(() => {
      addMessage(t().contactReply);
      showButtons(t().buttonsAfterContact);
    });
    return;
  }
  if (text.includes("прокрутить к форме") || text.includes("прокрутити до форми")) {
    fillLeadFormFallback();
    return;
  }
  showTyping(() => {
    addMessage(t().defaultHelp);
    showButtons(t().buttonsMain);
  });
}
function handleUserMessage(text) {
  if (!text || !text.trim()) return;
  addMessage(text, "user");
  botReply(text);
}
function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = "";
  handleUserMessage(text);
}
function initGreeting() {
  if (botState.started) return;
  botState.started = true;
  showTyping(() => {
    addMessage(t().greeting);
    showButtons(t().buttonsMain);
  });
}
function observeLanguageButtons() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setTimeout(() => {
        applyStaticTranslations();
        if (!botState.started) return;
        if (!chatButtons.children.length && !botState.step) {
          showButtons(t().buttonsMain);
        }
      }, 50);
    });
  });
}

if (chatInput) {
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
}
if (chatLauncher) chatLauncher.addEventListener("click", () => { openChat(); initGreeting(); });
if (chatClose) chatClose.addEventListener("click", closeChat);
if (chatMinimize) chatMinimize.addEventListener("click", closeChat);

window.addEventListener("load", () => {
  applyStaticTranslations();
  observeLanguageButtons();
});
