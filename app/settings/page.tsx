'use client';
import { useState, useEffect } from 'react';

export default function Settings() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); 
    document.cookie = `theme=${newTheme}; path=/`; // Store in cookie
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="flex items-center justify-between mb-4">
        <span>Dark Mode</span>
        <button 
          onClick={toggleTheme}
          className={`w-12 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-400'}`}
          aria-label="Toggle dark mode"
        >
          <span className={`block w-5 h-5 bg-white rounded-full transform transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
    </div>
  );
}