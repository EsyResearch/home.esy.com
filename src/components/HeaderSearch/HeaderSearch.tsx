"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { SearchResult } from '../SearchBar/SearchBar';
import { usePromptSearch } from '@/hooks/usePromptSearch';

interface HeaderSearchProps {
  prompts: any[];
  className?: string;
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({ 
  prompts = [], 
  className = "" 
}) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use the existing prompt search hook
  const { searchResults, isLoading, setSearchTerm: setSearchTermFromHook, showDropdown } = usePromptSearch({
    prompts: prompts || [],
    debounceMs: 200,
    maxResults: 6
  });

  // Sync search terms
  useEffect(() => {
    setSearchTermFromHook(searchTerm);
  }, [searchTerm, setSearchTermFromHook]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setSearchTerm('');
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isExpanded]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsExpanded(false);
      setSearchTerm('');
      searchRef.current?.blur();
    } else if (e.key === 'Enter' && searchTerm.trim()) {
      // Navigate to prompt library with search
      router.push(`/prompt-library?search=${encodeURIComponent(searchTerm)}`);
      setIsExpanded(false);
      setSearchTerm('');
    }
  };

  const handleResultSelect = (result: SearchResult) => {
    if (result.slug) {
      router.push(`/prompt-library/${result.slug}`);
    }
    setIsExpanded(false);
    setSearchTerm('');
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

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
      ...(isExpanded ? {
        width: isMobile ? 'calc(100vw - 4rem)' : '400px',
        maxWidth: '90vw'
      } : {})
    },
    searchWrapper: {
      position: 'relative' as const,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: isExpanded ? 'rgba(10, 10, 15, 0.95)' : 'rgba(22, 22, 31, 0.6)',
      border: `1px solid ${isExpanded ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
      borderRadius: '8px',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: isExpanded 
        ? '0 8px 24px rgba(139, 92, 246, 0.2), 0 4px 12px rgba(0, 0, 0, 0.3)' 
        : '0 2px 8px rgba(0, 0, 0, 0.1)',
      width: isExpanded ? '100%' : 'auto',
      minWidth: isExpanded ? 'auto' : '40px',
      height: '40px'
    },
    searchIcon: {
      padding: '0 12px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      color: isExpanded ? '#8b5cf6' : 'rgba(255, 255, 255, 0.6)',
      transition: 'color 0.3s ease',
      flexShrink: 0
    },
    searchInput: {
      flex: 1,
      padding: '0 8px 0 0',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ffffff',
      fontSize: '0.875rem',
      fontWeight: '300' as const,
      outline: 'none',
      minWidth: isExpanded ? '200px' : '0',
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
      backgroundColor: 'rgba(10, 10, 15, 0.95)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      marginTop: '4px',
      maxHeight: '300px',
      overflowY: 'auto' as const,
      zIndex: 1001,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)',
      opacity: showDropdown ? 1 : 0,
      transform: showDropdown ? 'translateY(0)' : 'translateY(-8px)',
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
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          
          {isExpanded && (
            <input
              ref={searchRef}
              type="text"
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              style={styles.searchInput}
            />
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
                  style={styles.dropdownItem}
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
