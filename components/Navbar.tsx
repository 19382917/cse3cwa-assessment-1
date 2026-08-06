'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">Phoneme Builder</div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
          <Link href="/wordle" className="text-gray-300 hover:text-white transition-colors">Wordle</Link>
          <Link href="/word-search" className="text-gray-300 hover:text-white transition-colors">Word Search</Link>
          <Link href="/settings" className="text-gray-300 hover:text-white transition-colors">Settings</Link>
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button 
          className="md:hidden text-white text-2xl focus:outline-none focus:ring-2 focus:ring-gray-400 rounded p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          ☰
        </button>
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