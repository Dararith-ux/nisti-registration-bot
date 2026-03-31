import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();

const { BOT_TOKEN, WEB_APP_URL } = process.env;

if (!BOT_TOKEN || !WEB_APP_URL) {
  console.error('Missing BOT_TOKEN or WEB_APP_URL in .env');
  process.exit(1);
}

// Initialize bot in long-polling mode for local/server usage.
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from?.first_name || 'there';

  await bot.sendMessage(
    chatId,
    `Hi ${firstName}! Tap the button below to open the registration Mini App.`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Open Registration Form',
              web_app: { url: WEB_APP_URL }
            }
          ]
        ]
      }
    }
  );
});

bot.on('polling_error', (error) => {
  console.error('Polling error:', error.message);
});

console.log('Telegram bot is running...');
