import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-btn">
      Switch {theme === 'light' ? 'dark' : 'light'} theme
    </button>
  );
};

export default ThemeSwitcher;