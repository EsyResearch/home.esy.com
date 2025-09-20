"use client";

import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Logo from "@/components/Logo";
import Link from "next/link";
import HeaderSearch from "@/components/HeaderSearch/HeaderSearch";
import { getAllPrompts } from "@/lib/prompts";

// Shared suffix logic that can be used by both navigation and footer
export const getPageSuffix = (pathname) => {
  if (pathname?.startsWith('/essays')) {
    return 'Essays';
  } else if (pathname?.startsWith('/school')) {
    return 'School';
  } else if (pathname?.startsWith('/glossary')) {
    return 'Glossary';
  } else if (pathname?.startsWith('/prompt-library')) {
    return 'Prompt Library';
  }
  return '';
};

interface NavigationProps {
  showHeaderSearch?: boolean;
}

export default function Navigation ({ showHeaderSearch = false }: NavigationProps = {}) {
    const pathname = usePathname();
    const [prompts, setPrompts] = useState([]);

    // Use the shared suffix function
    const logoSuffix = getPageSuffix(pathname);
    
    // Load prompts when showHeaderSearch is true
    useEffect(() => {
      if (showHeaderSearch) {
        getAllPrompts().then(setPrompts).catch(console.error);
      }
    }, [showHeaderSearch]);

    useEffect(() => {
      const handleScroll = () => {
        const nav = document.getElementById('nav');
        if (window.scrollY > 100) {
          nav.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
          nav.style.background = 'rgba(10, 10, 15, 0.85)';
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  
    return (
      <nav className="nav" id="nav">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <Logo suffix={logoSuffix} href="" showText={false} />
          </Link>
          
          {/* Header Search - Only show on prompt-library pages */}
          {showHeaderSearch && (
            <HeaderSearch prompts={prompts} className="header-search" />
          )}
          
          {/* Navigation */}
          <div className="nav-links">
            {/* <a href="/essays" className="nav-link">Essays</a> */}
            {/* <a href="/research" className="nav-link">Research</a> */}
            {/* <a href="/school" className="nav-link">School</a> */}
            {/* <a href="/pricing" className="nav-link">Pricing</a> */}
            <a href="https://app.esy.com" className="nav-cta">Write</a>
          </div>
        </div>
      </nav>
    );
  };