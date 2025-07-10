import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  const [systemTheme, setSystemTheme] = useState('light');

  // Set the theme based on user preference or system preference
  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  // Toggle between light and dark mode
  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  // Check for system color scheme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
      // Only update theme if no user preference is set
      if (!window.localStorage.getItem('theme')) {
        setTheme(newSystemTheme);
      }
    };

    // Set initial system theme
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    
    // Add event listener for system theme changes
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // Set the theme on initial load
  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    
    if (localTheme) {
      setTheme(localTheme);
    } else if (systemTheme) {
      setTheme(systemTheme);
    }
    
    setMounted(true);
  }, [systemTheme]);

  // Update the HTML class when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  return [theme, toggleTheme, mounted];
};
