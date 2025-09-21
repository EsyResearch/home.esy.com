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
  }
  // No suffix for prompt-library
  return '';
};

interface NavigationProps {
  showHeaderSearch?: boolean;
  searchContext?: 'prompt-library' | 'glossary' | 'school' | 'essays' | 'general';
}

export default function Navigation ({ 
  showHeaderSearch = false, 
  searchContext = 'general' 
}: NavigationProps = {}) {
    const pathname = usePathname();
    const [searchData, setSearchData] = useState([]);

    // Use the shared suffix function
    const logoSuffix = getPageSuffix(pathname);
    
    console.log('[Navigation] Props received:', {
      showHeaderSearch,
      searchContext,
      pathname
    });
    
    // Load appropriate data based on search context
    useEffect(() => {
      if (showHeaderSearch) {
        if (searchContext === 'prompt-library') {
          getAllPrompts().then(setSearchData).catch(console.error);
        } else if (searchContext === 'glossary') {
          // Fetch glossary terms from static JSON
          fetch('/glossary-terms.json')
            .then(res => res.json())
            .then(terms => setSearchData(terms))
            .catch(console.error);
        } else if (searchContext === 'school') {
          // For school context, we'll pass empty data for now since school uses its own search
          setSearchData([]);
        } else if (searchContext === 'essays') {
          // Fetch essays data from static JSON
          fetch('/essays-data.json')
            .then(res => res.json())
            .then(essays => setSearchData(essays))
            .catch(console.error);
        }
      }
    }, [showHeaderSearch, searchContext]);

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
          
          {/* Header Search - Show on prompt-library and glossary view pages */}
          {showHeaderSearch && (
            <HeaderSearch 
              prompts={searchData} 
              className="header-search"
              searchContext={searchContext}
            />
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