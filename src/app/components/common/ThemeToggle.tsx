'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = (checked: boolean) => {
    setIsDarkMode(checked);
  };

  return (
    <div className="mb-[26px] flex h-6 items-center justify-between bg-[var(--white)] dark:bg-[var(--dark-bg-primary)]">
      <span className="text-sm font-semibold text-black dark:text-[var(--dark-gray-700)]">
        다크모드 설정
      </span>

      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={isDarkMode}
          onChange={(e) => toggleTheme(e.target.checked)}
        />
        <div className="relative h-6 w-[38px] rounded-full bg-[var(--gray-300)] peer-checked:bg-[var(--primary-yellow)] peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-[var(--white)] after:shadow-[0px_3px_8px_rgba(0,0,0,0.15)] after:transition-all peer-checked:after:translate-x-[14px] dark:bg-[var(--dark-bg-primary)]"></div>
      </label>
    </div>
  );
}
