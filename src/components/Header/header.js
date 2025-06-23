import React, { useState, useEffect, useRef } from 'react';
import { Paperclip, FileText, ClipboardList, BookOpen, Clock, Lightbulb } from 'lucide-react';
import Logo from '../Logo';
import Navigation from '../Home/navigation';

const Header = () => {
  return (
    <header className="fixed top-0 w-full backdrop-blur-md z-50 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
};


export default Header;