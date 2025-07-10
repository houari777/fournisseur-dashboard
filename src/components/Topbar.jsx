import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import LanguageSelector from './LanguageSelector';

export default function Topbar({ onToggleSidebar, isSidebarOpen }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isDarkMode, toggleTheme, mounted } = useTheme();
  const location = useLocation();
  
  // Only render the UI after the theme is determined on the client side
  if (!mounted) {
    return (
      <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-30">
        {/* Empty header while loading */}
      </header>
    );
  }

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white flex items-center justify-between px-4 md:px-6 z-30 transition-all duration-200">
      {/* Mobile menu button */}
      <button 
        onClick={onToggleSidebar}
        className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Search bar - hidden on mobile */}
      <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            placeholder="ابحث..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        {/* Language Selector */}
        <LanguageSelector />
        
        {/* Dark mode toggle */}
        <div className="border-r border-gray-200 dark:border-gray-700 h-6 mx-2"></div>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors duration-200"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="الإشعارات"
          >
            <Bell size={20} />
            {3 > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            )}
          </button>
        </div>

        {/* User profile */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse pr-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">المسؤول</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">مدير النظام</p>
          </div>
          <div className="relative">
            <img
              src="https://i.pravatar.cc/40"
              alt="صورة المستخدم"
              className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-700"
            />
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-800"></span>
          </div>
        </div>
      </div>
    </header>
  );
}
