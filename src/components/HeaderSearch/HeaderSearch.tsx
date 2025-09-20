"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { SearchResult } from '../SearchBar/SearchBar';
import { usePromptSearch } from '@/hooks/usePromptSearch';
import { useGlossarySearch } from '@/hooks/useGlossarySearch';
import { useSchoolSearch } from '@/hooks/useSchoolSearch';

interface HeaderSearchProps {
  prompts: any[];
  className?: string;
  alwaysExpanded?: boolean;
  searchContext?: 'prompt-library' | 'glossary' | 'school' | 'general';
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({ 
  prompts = [], 
  className = "",
  alwaysExpanded = false,
  searchContext = 'general'
}) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Always expanded on prompt-library, glossary view pages, and school pages when shown
  const isPromptLibraryPage = pathname?.startsWith('/prompt-library');
  const isGlossaryViewPage = pathname?.startsWith('/glossary/');
  const isSchoolPage = pathname?.startsWith('/school');
  const shouldAlwaysExpand = alwaysExpanded || isPromptLibraryPage || isGlossaryViewPage || isSchoolPage;
  
  const [isExpanded, setIsExpanded] = useState(shouldAlwaysExpand);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use the appropriate search hook based on context
  const promptSearchHook = usePromptSearch({
    prompts: searchContext === 'prompt-library' ? (prompts || []) : [],
    debounceMs: 200,
    maxResults: 6
  });
  
  const glossarySearchHook = useGlossarySearch({
    terms: searchContext === 'glossary' ? (prompts || []) : [],
    debounceMs: 200,
    maxResults: 6
  });
  
  const schoolSearchHook = useSchoolSearch({
    articles: searchContext === 'school' ? 
      [
        { type: 'Article', category: 'AI Research', title: '5 Ways AI is Revolutionizing Academic Research', excerpt: 'Discover how artificial intelligence is transforming the landscape of academic research.', author: 'Zev Uhuru', readTime: '6 min', link: '/school/articles/ai-research-revolution' },
        { type: 'Guide', category: 'Prompt Engineering', title: 'What is Prompt Engineering? A Comprehensive Guide', excerpt: 'Master the art and science of crafting effective prompts for AI systems.', author: 'Zev Uhuru', readTime: '8 min', link: '/school/articles/prompt-engineering-guide' },
        { type: 'Tutorial', category: 'LLM Basics', title: 'Understanding Large Language Models: From Theory to Practice', excerpt: 'Demystify the technology behind ChatGPT, Claude, and other LLMs.', author: 'Zev Uhuru', readTime: '12 min', link: '/school/articles/understanding-llms' },
        { type: 'Literature', category: 'Classic Literature', title: 'To Kill a Mockingbird: A Timeless Exploration of Justice', excerpt: 'Explore Harper Lee\'s masterpiece through the lens of moral courage.', author: 'Harper Lee Scholar', readTime: '15 min', link: '/school/articles/to-kill-a-mockingbird' }
      ] : [],
    resources: [],
    courses: [],
    debounceMs: 200,
    maxResults: 6
  });
  
  // Select the appropriate hook results based on context
  const { searchResults, isLoading, setSearchTerm: setSearchTermFromHook, showDropdown } = 
    searchContext === 'glossary' ? glossarySearchHook :
    searchContext === 'school' ? schoolSearchHook : promptSearchHook;

  // Sync search terms
  useEffect(() => {
    setSearchTermFromHook(searchTerm);
  }, [searchTerm, setSearchTermFromHook]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        // Always clear search term to close dropdown
        setSearchTerm('');
        setHoveredIndex(null);
        
        // Only collapse the search bar if not on prompt library pages
        if (!shouldAlwaysExpand) {
          setIsExpanded(false);
        }
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isExpanded, shouldAlwaysExpand]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      // Always clear search term to close dropdown
      setSearchTerm('');
      searchRef.current?.blur();
      
      // Only collapse the search bar if not on prompt library pages
      if (!shouldAlwaysExpand) {
        setIsExpanded(false);
      }
      } else if (e.key === 'Enter' && searchTerm.trim()) {
        // Navigate to appropriate page with search
        if (searchContext === 'glossary') {
          router.push(`/glossary?search=${encodeURIComponent(searchTerm)}`);
        } else if (searchContext === 'school') {
          router.push(`/school?search=${encodeURIComponent(searchTerm)}`);
        } else {
          router.push(`/prompt-library?search=${encodeURIComponent(searchTerm)}`);
        }
        setSearchTerm('');
        
        // Only collapse if not on prompt library or glossary pages
        if (!shouldAlwaysExpand) {
          setIsExpanded(false);
        }
      }
  };

  const handleResultSelect = (result: SearchResult) => {
    if (result.slug) {
      if (searchContext === 'glossary') {
        router.push(`/glossary/${result.slug}`);
      } else if (searchContext === 'school') {
        router.push(result.slug);
      } else {
        router.push(`/prompt-library/${result.slug}`);
      }
    }
    
    // Always clear search to close dropdown
    setSearchTerm('');
    setHoveredIndex(null);
    
    // Only collapse the search bar if not on prompt library pages
    if (!shouldAlwaysExpand) {
      setIsExpanded(false);
    }
  };

  const handleFocus = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  // Removed auto-focus - users can click when they want to search

  // Responsive breakpoints
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const styles = {
    container: {
      position: 'absolute' as const,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      zIndex: 100,
      ...(isExpanded || shouldAlwaysExpand ? {
        width: isMobile ? 'calc(100vw - 4rem)' : '600px',
        maxWidth: '90vw'
      } : {})
    },
    searchWrapper: {
      position: 'relative' as const,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: (isExpanded || shouldAlwaysExpand) ? 'rgba(10, 10, 15, 0.95)' : 'rgba(22, 22, 31, 0.6)',
      border: `1px solid ${(isExpanded || shouldAlwaysExpand) ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
      borderRadius: '8px',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: (isExpanded || shouldAlwaysExpand)
        ? '0 4px 16px rgba(139, 92, 246, 0.15), 0 2px 8px rgba(0, 0, 0, 0.2)' 
        : '0 2px 8px rgba(0, 0, 0, 0.1)',
      width: (isExpanded || shouldAlwaysExpand) ? '100%' : 'auto',
      minWidth: (isExpanded || shouldAlwaysExpand) ? 'auto' : '48px',
      height: '48px'
    },
    searchIcon: {
      padding: '0 14px',
      display: 'flex',
      alignItems: 'center',
      cursor: shouldAlwaysExpand ? 'default' : 'pointer',
      color: (isExpanded || shouldAlwaysExpand) ? '#8b5cf6' : 'rgba(255, 255, 255, 0.6)',
      transition: 'color 0.3s ease',
      flexShrink: 0
    },
    searchInput: {
      flex: 1,
      padding: '0 12px 0 0',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ffffff',
      fontSize: '1rem',
      fontWeight: '300' as const,
      outline: 'none',
      minWidth: isExpanded ? '300px' : '0',
      width: isExpanded ? 'auto' : '0',
      opacity: isExpanded ? 1 : 0,
      transition: 'all 0.3s ease',
      '::placeholder': {
        color: 'rgba(255, 255, 255, 0.5)'
      }
    },
    dropdown: {
      position: 'absolute' as const,
      top: '100%',
      left: '0',
      right: '0',
      backgroundColor: 'rgba(10, 10, 15, 0.98)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      marginTop: '8px',
      maxHeight: '400px',
      overflowY: 'auto' as const,
      zIndex: 1001,
      backdropFilter: 'blur(30px) saturate(180%)',
      WebkitBackdropFilter: 'blur(30px) saturate(180%)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.3)',
      opacity: showDropdown ? 1 : 0,
      transform: showDropdown ? 'translateY(0)' : 'translateY(-10px)',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      pointerEvents: (showDropdown ? 'auto' : 'none') as React.CSSProperties['pointerEvents']
    },
    dropdownItem: {
      padding: '12px 16px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '4px'
    },
    dropdownItemTitle: {
      fontSize: '0.875rem',
      fontWeight: '500' as const,
      color: 'rgba(255, 255, 255, 0.9)',
      margin: '0',
      lineHeight: '1.3'
    },
    dropdownItemDescription: {
      fontSize: '0.75rem',
      color: 'rgba(255, 255, 255, 0.6)',
      margin: '0',
      lineHeight: '1.4'
    },
    dropdownItemMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      marginTop: '2px'
    },
    dropdownItemCategory: {
      fontSize: '0.7rem',
      color: 'rgba(139, 92, 246, 0.8)',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      padding: '1px 6px',
      borderRadius: '8px',
      fontWeight: '500' as const
    },
    dropdownItemPro: {
      fontSize: '0.7rem',
      color: 'rgba(255, 215, 0, 0.8)',
      backgroundColor: 'rgba(255, 215, 0, 0.1)',
      padding: '1px 6px',
      borderRadius: '8px',
      fontWeight: '500' as const
    },
    dropdownLoading: {
      padding: '16px',
      textAlign: 'center' as const,
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.8rem'
    },
    dropdownEmpty: {
      padding: '16px',
      textAlign: 'center' as const,
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: '0.8rem'
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div ref={containerRef} style={styles.container} className={className}>
        <div style={styles.searchWrapper}>
          {!shouldAlwaysExpand && (
            <div 
              style={styles.searchIcon}
              onClick={() => {
                if (!isExpanded) {
                  setIsExpanded(true);
                  setTimeout(() => searchRef.current?.focus(), 100);
                }
              }}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          )}
          
          {(isExpanded || shouldAlwaysExpand) && (
            <>
              {shouldAlwaysExpand && (
                <div style={styles.searchIcon}>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#8b5cf6"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </div>
              )}
               <input
                 ref={searchRef}
                 type="text"
                 placeholder={
                   searchContext === 'glossary' ? "Search glossary terms..." : 
                   searchContext === 'school' ? "Search articles & guides..." :
                   "Search prompts..."
                 }
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 onKeyDown={handleKeyDown}
                 onFocus={handleFocus}
                 style={styles.searchInput}
               />
            </>
          )}
        </div>

        {/* Dropdown Results */}
        {isExpanded && showDropdown && (
          <div ref={dropdownRef} style={styles.dropdown}>
            {isLoading ? (
              <div style={styles.dropdownLoading}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '14px',
                    height: '14px',
                    border: '2px solid rgba(139, 92, 246, 0.3)',
                    borderTop: '2px solid #8b5cf6',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Searching...
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div
                  key={result.id}
                  style={{
                    ...styles.dropdownItem,
                    backgroundColor: hoveredIndex === index ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                    borderLeft: hoveredIndex === index ? '3px solid #8b5cf6' : '3px solid transparent',
                    paddingLeft: hoveredIndex === index ? '13px' : '16px'
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleResultSelect(result)}
                >
                  <div style={styles.dropdownItemTitle}>
                    {result.title}
                  </div>
                  {result.description && (
                    <div style={styles.dropdownItemDescription}>
                      {result.description}
                    </div>
                  )}
                  <div style={styles.dropdownItemMeta}>
                    {result.category && (
                      <span style={styles.dropdownItemCategory}>
                        {result.category}
                      </span>
                    )}
                    {result.isPro && (
                      <span style={styles.dropdownItemPro}>
                        PRO
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : searchTerm && (
              <div style={styles.dropdownEmpty}>
                No prompts found for &ldquo;{searchTerm}&rdquo;
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderSearch;
