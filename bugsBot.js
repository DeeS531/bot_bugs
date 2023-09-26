const TelegramBot = require("node-telegram-bot-api");

const BOT_TOKEN = "6226990795:AAFbLKPSdaYUYoPDHuDwXVXKpaBSQ91CLKc";
const PF_TOKEN = "2ce0641b9efe8c0640f7093b8b08e3cc";
const url = "https://bestdating.planfix.com/rest/task/";

const bot = new TelegramBot(BOT_TOKEN, {
  polling: true,
});

const buttonYas = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "Да, подтверждаю", callback_data: "1" },

        {
          text: "Нет, отклонить запрос!",
          callback_data: "2",
        },
      ],
    ],
  }),
};

const start = () => {
  bot.setMyCommands(
    [{ command: "/start", description: "Начальное приветствие" }],
    [{ command: "/expoData", description: "Подать запрос на выгрузку" }]
  );

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://chpic.su/_data/stickers/i/ITwise/ITwise_015.webp?v=1695287101"
      );
      return bot.sendMessage(
        chatId,
        `Добро пожаловать, ${msg.chat.first_name}, выбирите раздел запроса`,
        buttonYas
      );
    }
  });
  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === "1") {
      await bot.sendMessage(chatId, "Ответ принят, задача отправлена в работу");
    } else if (data === "Нет, отклонить запрос!") {
      await bot.sendMessage(chatId, "2");
    }
  });
};

start();
