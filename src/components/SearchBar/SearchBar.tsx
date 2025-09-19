"use client";

import React, { useState, useRef, useEffect } from 'react';

interface SearchBarProps {
  placeholder?: string;
  searchSuggestions?: string[];
  onSearch?: (query: string) => void;
  value?: string;
  onChange?: (query: string) => void;
  className?: string;
  style?: React.CSSProperties;
  context?: 'prompt-library' | 'school' | 'general' | 'homepage';
  inputFontSize?: string;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  searchSuggestions,
  onSearch,
  value = "",
  onChange,
  className = "",
  style = {},
  context = 'general',
  inputFontSize = '1.25rem',
  autoFocus = false
}) => {
  // Context-specific default suggestions
  const getDefaultSuggestions = (context: string) => {
    switch (context) {
      case 'prompt-library':
        return [
          "Character development prompts",
          "Academic essay writing templates",
          "Research methodology frameworks",
          "Creative writing exercises",
          "Professional communication tools"
        ];
      case 'school':
        return [
          "How to structure an academic paper",
          "Best practices for literature reviews", 
          "Understanding citation styles",
          "Writing compelling abstracts",
          "AI tools for research"
        ];
      case 'homepage':
        return [
          "How does AI impact academic integrity?",
          "What drives sustainable urban development?",
          "Can quantum computing solve climate models?",
          "How do social movements shape policy?",
          "What defines consciousness in neuroscience?"
        ];
      default:
        return [
          "Search for content...",
          "Find what you need",
          "Discover new ideas",
          "Explore resources",
          "Get started here"
        ];
    }
  };

  const defaultSuggestions = searchSuggestions || getDefaultSuggestions(context);
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [internalValue, setInternalValue] = useState(value);
  const searchRef = useRef<HTMLInputElement>(null);

  // Use controlled value if provided, otherwise use internal state
  const searchValue = value !== undefined ? value : internalValue;
  const handleChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  // Rotate search suggestions
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuestion((prev) => (prev + 1) % defaultSuggestions.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [defaultSuggestions.length]);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Auto-focus on mount if autoFocus is true
  useEffect(() => {
    if (autoFocus && searchRef.current) {
      searchRef.current.focus();
    }
  }, [autoFocus]);

  const handleSearch = () => {
    if (onSearch && searchValue) {
      onSearch(searchValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue) {
      handleSearch();
    }
  };

  // Responsive breakpoints for world-class mobile design
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isSmallMobile = typeof window !== 'undefined' && window.innerWidth < 480;
  const isTinyMobile = typeof window !== 'undefined' && window.innerWidth < 375;

  const styles = {
    searchContainer: {
      position: 'relative' as const,
      maxWidth: isMobile ? '100%' : '720px',
      margin: '0 auto 3rem auto',
      padding: isTinyMobile ? '0 0.5rem' : isSmallMobile ? '0 0.75rem' : '0',
      ...style
    },
    searchWrapper: {
      position: 'relative' as const,
      backgroundColor: searchFocused ? 'rgba(10, 10, 15, 0.9)' : 'rgba(22, 22, 31, 0.6)',
      border: `1px solid ${searchFocused ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
      borderRadius: isMobile ? '12px' : '16px',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      overflow: 'hidden' as const,
      boxShadow: searchFocused 
        ? `0 0 0 ${isMobile ? '2px' : '3px'} rgba(139, 92, 246, 0.2), 0 ${isMobile ? '12px' : '20px'} ${isMobile ? '24px' : '40px'} rgba(139, 92, 246, 0.1)` 
        : `0 ${isMobile ? '4px' : '8px'} ${isMobile ? '16px' : '24px'} rgba(0, 0, 0, 0.15)`,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)'
    },
    searchInner: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '0.75rem' : '1rem',
      minHeight: isMobile ? '56px' : '64px'
    },
    searchIconWrapper: {
      padding: isMobile ? '0 0 0 1.25rem' : '0 0 0 1.75rem',
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0
    },
    searchInput: {
      flex: 1,
      padding: isMobile ? '1rem 0' : '1.5rem 0',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ffffff',
      fontSize: isMobile ? (isTinyMobile ? '0.875rem' : '1rem') : inputFontSize,
      fontWeight: '300' as const,
      outline: 'none',
      minHeight: isMobile ? '24px' : 'auto',
      lineHeight: '1.4',
      '::placeholder': {
        color: 'rgba(255, 255, 255, 0.5)',
        fontWeight: '300'
      }
    },
    searchMeta: {
      padding: isMobile ? '0 1.25rem 0 0' : '0 1.75rem 0 0',
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '0.75rem' : '1rem',
      flexShrink: 0
    },
    searchDivider: {
      width: '1px',
      height: isMobile ? '20px' : '24px',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      display: isMobile ? 'none' : 'block'
    },
    searchButton: {
      padding: isMobile ? '0.625rem 1rem' : '0.75rem 1.5rem',
      backgroundColor: searchFocused || searchValue ? '#8b5cf6' : 'rgba(255, 255, 255, 0.08)',
      border: 'none',
      borderRadius: isMobile ? '6px' : '8px',
      color: searchFocused || searchValue ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
      fontSize: isMobile ? '0.875rem' : '0.9375rem',
      fontWeight: '500' as const,
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '0.375rem' : '0.5rem',
      minHeight: isMobile ? '36px' : '40px',
      whiteSpace: 'nowrap' as const,
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      boxShadow: searchFocused || searchValue 
        ? '0 4px 12px rgba(139, 92, 246, 0.3)' 
        : '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    searchHint: {
      position: 'absolute' as const,
      bottom: isMobile ? '-24px' : '-28px',
      left: '0',
      fontSize: isMobile ? '0.75rem' : '0.875rem',
      color: 'rgba(255, 255, 255, 0.4)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      opacity: isMobile ? 0.8 : 1
    }
  };

  return (
    <div style={styles.searchContainer} className={className}>
      <div style={styles.searchWrapper}>
        <div style={styles.searchInner}>
          <div style={styles.searchIconWrapper}>
            <svg 
              width={isMobile ? "18" : "20"} 
              height={isMobile ? "18" : "20"} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke={searchFocused ? '#8b5cf6' : 'rgba(255, 255, 255, 0.5)'}
              strokeWidth="2"
              style={{ 
                transition: 'stroke 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                flexShrink: 0
              }}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          <input
            ref={searchRef}
            type="text"
            placeholder={defaultSuggestions[activeQuestion]}
            value={searchValue}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onKeyDown={handleKeyDown}
            style={styles.searchInput}
          />
          <div style={styles.searchMeta}>
            <div style={styles.searchDivider} />
            <button 
              style={styles.searchButton}
              onClick={handleSearch}
            >
              <span>{isMobile ? 'Go' : 'Search'}</span>
              <svg 
                width={isMobile ? "14" : "16"} 
                height={isMobile ? "14" : "16"} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                style={{ flexShrink: 0 }}
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {!isMobile && (
        <div style={styles.searchHint}>
          <kbd style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontFamily: 'monospace'
          }}>⌘K</kbd>
          <span>for quick search</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
