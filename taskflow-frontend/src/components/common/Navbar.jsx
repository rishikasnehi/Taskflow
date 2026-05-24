import React, { useState } from 'react';
import { Menu, Bell, Settings, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDark(!isDark);
  };

  return (
    <nav className="bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800 sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left - Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden btn-icon"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1 hidden lg:block" />

        {/* Right - Actions */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <button className="btn-icon relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full" />
          </button>

          {/* Settings */}
          <button className="btn-icon">
            <Settings size={20} />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="btn-icon"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold cursor-pointer hover:ring-2 hover:ring-primary-300">
            {user?.name?.[0] || 'U'}
          </div>
        </div>
      </div>
    </nav>
  );
};
