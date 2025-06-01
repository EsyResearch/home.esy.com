import React from 'react';

const Header = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-900/20">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 3L4 7.5L12 12L20 7.5L12 3Z" />
              <path d="M4 7.5V16.5L12 21" />
              <path d="M20 7.5V16.5L12 21" />
              <path d="M12 12V21" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">esy</span>
        </div>
        
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-slate-300 hover:text-white text-sm">Dashboard</a>
            <a href="#" className="text-slate-300 hover:text-white text-sm">Essays</a>
            <a href="#" className="text-slate-300 hover:text-white text-sm">Research</a>
            <a href="#" className="text-slate-300 hover:text-white text-sm">Library</a>
          </nav>
          
          <div className="h-5 w-px bg-slate-700 hidden md:block"></div>
          
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white text-sm font-medium">
            LU
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;