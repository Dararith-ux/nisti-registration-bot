import { useEffect, useState } from 'react';
import RegistrationForm from './components/RegistrationForm.jsx';
import { getTelegramUser, getTelegramWebApp } from './utils/telegram.js';

const App = () => {
  const [telegramUser, setTelegramUser] = useState(null);

  useEffect(() => {
    const webApp = getTelegramWebApp();

    if (!webApp) {
      return;
    }

    // Tell Telegram the app is ready and expand for better UX.
    webApp.ready();
    webApp.expand();

    const user = getTelegramUser();
    setTelegramUser(user);
  }, []);

  return (
    <main className="app-shell">
      <section className="card">
        <h1>Mini App Registration</h1>
        <p className="subtitle">Complete the form to register.</p>

        <div className="telegram-info">
          {telegramUser ? (
            <>
              <p>
                <strong>Telegram:</strong> {telegramUser.first_name}{' '}
                {telegramUser.last_name || ''}
              </p>
              <p>
                <strong>Username:</strong> @{telegramUser.username || 'not-set'}
              </p>
              <p>
                <strong>ID:</strong> {telegramUser.id}
              </p>
            </>
          ) : (
            <p className="warning">
              Telegram user data is unavailable. Open this app from your Telegram bot button.
            </p>
          )}
        </div>

        <RegistrationForm telegramUser={telegramUser} />
      </section>
    </main>
  );
};

export default App;
