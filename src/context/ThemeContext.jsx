import { createContext, useContext } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

export const ThemeContext = createContext({
  theme: 'light',
  isDarkMode: false,
  toggleTheme: () => {},
  mounted: false,
});

export const ThemeProvider = ({ children }) => {
  const [theme, toggleTheme, mounted] = useDarkMode();
  const isDarkMode = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
