// Safely get Telegram WebApp instance from browser window.
export const getTelegramWebApp = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.Telegram?.WebApp || null;
};

// Read Telegram user object provided by initDataUnsafe.
export const getTelegramUser = () => {
  const webApp = getTelegramWebApp();
  return webApp?.initDataUnsafe?.user || null;
};
