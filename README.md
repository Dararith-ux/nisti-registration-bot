# Telegram Mini App Registration (Node.js + Express + React Vite + MongoDB)

Full-stack Telegram Mini App registration project with 3 folders:
- `bot` (Telegram bot)
- `frontend` (React Vite Mini App)
- `backend` (Express + MongoDB API)

## Folder Structure

```text
telegram-miniapp-registration/
├── README.md
├── backend/
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── src/
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   └── registerController.js
│       ├── middleware/
│       │   ├── errorHandler.js
│       │   └── notFound.js
│       ├── models/
│       │   └── Registration.js
│       ├── routes/
│       │   └── registerRoutes.js
│       └── server.js
├── bot/
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── src/
│       └── bot.js
└── frontend/
    ├── .env.example
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── styles.css
        ├── components/
        │   └── RegistrationForm.jsx
        └── utils/
            └── telegram.js
```

## Features Implemented

- Telegram bot `/start` command
- Inline keyboard button with `web_app` URL
- Telegram Mini App frontend registration form
- Form fields: `fullName`, `gender`, `institution`, `phone`, `email`
- Telegram WebApp SDK integration
- Telegram user data sent with form to backend
- Backend endpoint: `POST /api/register`
- MongoDB save via Mongoose `Registration` model
- Duplicate prevention using unique `telegramId`
- JSON success/error responses
- Mobile-friendly UI for Telegram
- ES modules used everywhere

## 1) Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` values:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/telegram_miniapp
FRONTEND_URL=http://localhost:5173
```

Run backend:

```bash
npm run dev
```

Backend API:
- Health: `GET http://localhost:5000/api/health`
- Register: `POST http://localhost:5000/api/register`

## 2) Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Update `.env`:

```env
VITE_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

Local frontend URL: `http://localhost:5173`

## 3) Bot Setup

```bash
cd bot
npm install
cp .env.example .env
```

Update `.env`:

```env
BOT_TOKEN=your_telegram_bot_token
WEB_APP_URL=https://your-frontend-domain.vercel.app
```

Run bot:

```bash
npm start
```

In Telegram:
1. Open your bot chat.
2. Send `/start`.
3. Tap **Open Registration Form**.

## Example API Request Body

`POST /api/register`

```json
{
  "fullName": "John Doe",
  "gender": "male",
  "institution": "ABC University",
  "phone": "+15551234567",
  "email": "john@example.com",
  "telegramUser": {
    "id": 123456789,
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe"
  }
}
```

## Example Deployment

### Deploy Frontend to Vercel

1. Push `frontend` folder to GitHub.
2. In Vercel, import the project and set root directory to `frontend`.
3. Set environment variable:
   - `VITE_API_URL=https://your-backend.onrender.com`
4. Deploy and copy your frontend URL.

### Deploy Backend to Render

1. Push `backend` folder to GitHub.
2. In Render, create a **Web Service** with root directory `backend`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables:
   - `PORT=10000` (or leave Render default)
   - `MONGODB_URI=<your_mongodb_connection_string>`
   - `FRONTEND_URL=https://your-frontend-domain.vercel.app`
6. Deploy and copy backend URL.

### Connect Bot to Deployed Frontend

1. Set `WEB_APP_URL` in `bot/.env` to your Vercel URL.
2. Restart bot service.
3. Use BotFather `/setdomain` with your frontend domain if required.

## Notes

- Mini Apps require HTTPS in production.
- Duplicate registrations are blocked by `telegramId`.
- Backend returns consistent JSON for success and errors.
# nisti-registration-bot
