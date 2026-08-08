'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Check for saved theme on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme); 
    document.cookie = `theme=${newTheme}; path=/`; // Store in cookie for rubric
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">Phoneme Builder</div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
          <Link href="/wordle" className="text-gray-300 hover:text-white transition-colors">Wordle</Link>
          <Link href="/word-search" className="text-gray-300 hover:text-white transition-colors">Word Search</Link>
          <Link href="/settings" className="text-gray-300 hover:text-white transition-colors">Settings</Link>
          
          {/* Dark Mode Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="text-gray-300 hover:text-white text-xl focus:outline-none"
            aria-label="Toggle dark mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="text-gray-300 hover:text-white text-xl focus:outline-none"
            aria-label="Toggle dark mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <button 
            className="text-white text-2xl focus:outline-none focus:ring-2 focus:ring-gray-400 rounded p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-3 pl-4">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/wordle" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Wordle</Link>
          <Link href="/word-search" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Word Search</Link>
          <Link href="/settings" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Settings</Link>
        </div>
      )}
    </nav>
  );
}