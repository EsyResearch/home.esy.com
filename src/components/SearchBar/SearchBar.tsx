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
  context?: 'prompt-library' | 'school' | 'general';
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  searchSuggestions,
  onSearch,
  value = "",
  onChange,
  className = "",
  style = {},
  context = 'general'
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

  const styles = {
    searchContainer: {
      position: 'relative' as const,
      maxWidth: '720px',
      margin: '0 auto 3rem auto',
      ...style
    },
    searchWrapper: {
      position: 'relative' as const,
      backgroundColor: searchFocused ? 'rgba(10, 10, 15, 0.8)' : 'rgba(22, 22, 31, 0.4)',
      border: `1px solid ${searchFocused ? 'transparent' : 'rgba(255, 255, 255, 0.08)'}`,
      borderRadius: '16px',
      transition: 'all 0.3s ease',
      overflow: 'hidden' as const,
      boxShadow: searchFocused ? '0 0 0 3px rgba(139, 92, 246, 0.2), 0 20px 40px rgba(139, 92, 246, 0.1)' : 'none'
    },
    searchInner: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    searchIconWrapper: {
      padding: '0 0 0 1.75rem',
      display: 'flex',
      alignItems: 'center'
    },
    searchInput: {
      flex: 1,
      padding: '1.5rem 0',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ffffff',
      fontSize: '1.25rem',
      fontWeight: '300' as const,
      outline: 'none'
    },
    searchMeta: {
      padding: '0 1.75rem 0 0',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    searchDivider: {
      width: '1px',
      height: '24px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    searchButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: searchFocused || searchValue ? '#8b5cf6' : 'transparent',
      border: 'none',
      borderRadius: '8px',
      color: searchFocused || searchValue ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
      fontSize: '0.9375rem',
      fontWeight: '500' as const,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    searchHint: {
      position: 'absolute' as const,
      bottom: '-28px',
      left: '0',
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.4)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  };

  return (
    <div style={styles.searchContainer} className={className}>
      <div style={styles.searchWrapper}>
        <div style={styles.searchInner}>
          <div style={styles.searchIconWrapper}>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke={searchFocused ? '#8b5cf6' : 'rgba(255, 255, 255, 0.4)'}
              strokeWidth="2"
              style={{ transition: 'stroke 0.3s ease' }}
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
              <span>Search</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default SearchBar;
