/*Exercise 1: Implement a Theme Switcher
Objective: Create a theme switcher component that allows users to toggle between light and dark themes using useContext and useState.
Set up a new React project using create-react-app or your preferred method.
Create a context for managing the theme (light/dark mode).
Implement a theme switcher component that toggles between light and dark themes when clicked.
Use useContext to access the current theme in other components and apply the theme styles.

Hints:
You can create a context with a default theme value (e.g., light) and a function to toggle the theme.
The theme switcher component should have a button that, when clicked, calls the theme toggling function provided by the context.
Apply different styles (CSS or inline styles) to your components based on the current theme.*/

import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';
import './App.css';

const MainContent = () => {
  const { theme } = useTheme();

  return (
    <div className={`app-container ${theme}`}>
      <h1>Now is a {theme === 'light' ? 'light' : 'dark'} theme.</h1>
      <p>Press the button below to change the appearance of the page.</p>
      <ThemeSwitcher />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}

export default App;