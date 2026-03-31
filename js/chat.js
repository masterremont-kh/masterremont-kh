// CHAT BOT
const chatBody = document.getElementById("chatBody");
const chatButtons = document.getElementById("chatButtons");
const chatInput = document.getElementById("chatInput");

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
  typing.textContent = "Печатает...";
  chatBody.appendChild(typing);
  setTimeout(() => {
    typing.remove();
    callback();
  }, 1000);
}

function showButtons(buttons) {
  chatButtons.innerHTML = "";
  buttons.forEach(text => {
    const btn = document.createElement("button");
    btn.className = "chat-quick-btn";
    btn.textContent = text;
    btn.onclick = () => handleUserMessage(text);
    chatButtons.appendChild(btn);
  });
}

function botReply(message) {
  const text = message.toLowerCase();

  if (text.includes("цена") || text.includes("стоимость")) {
    showTyping(() => {
      addMessage("Стоимость ремонта:\n• Косметический — от 3500 грн/м²\n• Капитальный — от 6000 грн/м²\n• Дизайнерский — от 8000 грн/м²");
      showButtons(["Косметический", "Капитальный", "Дизайнерский", "Заявка"]);
    });
    return;
  }

  if (text.includes("ремонт")) {
    showTyping(() => {
      addMessage("Мы делаем косметический, капитальный и дизайнерский ремонт.");
      showButtons(["Косметический", "Капитальный", "Дизайнерский"]);
    });
    return;
  }

  if (text.includes("заявка")) {
    showTyping(() => {
      addMessage("Прокрутил к форме 👇 заполните и мы свяжемся");
      document.getElementById("lead-form").scrollIntoView({behavior:"smooth"});
    });
    return;
  }

  if (text.includes("контакт")) {
    showTyping(() => {
      addMessage("📞 +38 (095) 384-31-01");
    });
    return;
  }

  showTyping(() => {
    addMessage("Выберите, что вас интересует:");
    showButtons(["Узнать стоимость", "Виды ремонта", "Заявка", "Контакты"]);
  });
}

function handleUserMessage(text) {
  addMessage(text, "user");
  botReply(text);
}

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = "";
  handleUserMessage(text);
}

window.onload = () => {
  showTyping(() => {
    addMessage("Здравствуйте! 👋\nПоможем с ремонтом и расчетом стоимости. Что вас интересует?");
    showButtons(["Узнать стоимость", "Виды ремонта", "Заявка", "Контакты"]);
  });
};
