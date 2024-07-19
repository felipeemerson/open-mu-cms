import { useState } from 'react';

export const useTheme = () => {
  const isDarkMode =
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [mode, setMode] = useState(isDarkMode ? 'dark' : 'light');

  const onModeChange = (theme: 'dark' | 'light') => {
    localStorage.setItem('theme', theme);

    document.querySelector('html')?.classList.toggle('dark');

    setMode(theme);
  };

  return { mode, setMode: onModeChange };
};
