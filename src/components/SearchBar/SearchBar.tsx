"use client";

import React, { useState, useRef, useEffect } from 'react';

interface SearchResult {
  id: string | number;
  title: string;
  description?: string;
  category?: string;
  slug?: string;
  type?: 'prompt' | 'suggestion' | 'category' | 'article' | 'resource' | 'course';
  isPro?: boolean;
  metadata?: Record<string, any>;
}

interface SearchBarProps {
  placeholder?: string;
  searchSuggestions?: string[];
  onSearch?: (query: string) => void;
  value?: string;
  onChange?: (query: string) => void;
  className?: string;
  style?: React.CSSProperties;
  context?: 'prompt-library' | 'school' | 'general' | 'homepage' | 'blog';
  inputFontSize?: string;
  autoFocus?: boolean;
  isLoading?: boolean;
  // New dropdown props
  showDropdown?: boolean;
  searchResults?: SearchResult[];
  onResultSelect?: (result: SearchResult) => void;
  maxResults?: number;
  loadingResults?: boolean;
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
  autoFocus = false,
  isLoading = false,
  // New dropdown props
  showDropdown = false,
  searchResults = [],
  onResultSelect,
  maxResults = 8,
  loadingResults = false
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
      case 'blog':
        return [
          "AI in academic writing",
          "Prompt engineering techniques",
          "Research methodology guides",
          "Essay writing best practices",
          "Future of education technology"
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
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Handle dropdown visibility
  useEffect(() => {
    setShowResults(showDropdown && (searchResults.length > 0 || loadingResults));
  }, [showDropdown, searchResults.length, loadingResults]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedResultIndex(-1);
  }, [searchResults]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setSelectedResultIndex(-1);
      }
    };

    if (showResults) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showResults]);

  const handleSearch = () => {
    if (onSearch && searchValue) {
      onSearch(searchValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue) {
      if (selectedResultIndex >= 0 && searchResults[selectedResultIndex] && onResultSelect) {
        onResultSelect(searchResults[selectedResultIndex]);
        setShowResults(false);
        setSelectedResultIndex(-1);
      } else {
        handleSearch();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (showResults && searchResults.length > 0) {
        setSelectedResultIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (showResults && searchResults.length > 0) {
        setSelectedResultIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
      }
    } else if (e.key === 'Escape') {
      setShowResults(false);
      setSelectedResultIndex(-1);
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
      backgroundColor: isLoading ? '#8b5cf6' : (searchFocused || searchValue ? '#8b5cf6' : 'rgba(255, 255, 255, 0.08)'),
      border: 'none',
      borderRadius: isMobile ? '6px' : '8px',
      color: isLoading ? '#ffffff' : (searchFocused || searchValue ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'),
      fontSize: isMobile ? '0.875rem' : '0.9375rem',
      fontWeight: '500' as const,
      cursor: isLoading ? 'default' : 'pointer',
      transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '0.375rem' : '0.5rem',
      minHeight: isMobile ? '36px' : '40px',
      whiteSpace: 'nowrap' as const,
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      boxShadow: isLoading 
        ? '0 4px 12px rgba(139, 92, 246, 0.4)' 
        : (searchFocused || searchValue 
          ? '0 4px 12px rgba(139, 92, 246, 0.3)' 
          : '0 2px 8px rgba(0, 0, 0, 0.1)'),
      opacity: isLoading ? 0.9 : 1
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
    },
    // Dropdown styles
    dropdownContainer: {
      position: 'relative' as const,
      width: '100%'
    },
    dropdown: {
      position: 'absolute' as const,
      top: '100%',
      left: '0',
      right: '0',
      backgroundColor: 'rgba(10, 10, 15, 0.95)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: isMobile ? '12px' : '16px',
      marginTop: '8px',
      maxHeight: isMobile ? '300px' : '400px',
      overflowY: 'auto' as const,
      zIndex: 1000,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.2)',
      opacity: showResults ? 1 : 0,
      transform: showResults ? 'translateY(0)' : 'translateY(-10px)',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      pointerEvents: (showResults ? 'auto' : 'none') as React.CSSProperties['pointerEvents'],
      textAlign: 'left' as const
    },
    dropdownItem: {
      padding: isMobile ? '12px 16px' : '16px 20px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '4px',
      textAlign: 'left' as const
    },
    dropdownItemSelected: {
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      borderLeft: '3px solid #8b5cf6'
    },
    dropdownItemTitle: {
      fontSize: isMobile ? '0.875rem' : '1rem',
      fontWeight: '500' as const,
      color: 'rgba(255, 255, 255, 0.9)',
      margin: '0',
      lineHeight: '1.3'
    },
    dropdownItemDescription: {
      fontSize: isMobile ? '0.75rem' : '0.875rem',
      color: 'rgba(255, 255, 255, 0.6)',
      margin: '0',
      lineHeight: '1.4'
    },
    dropdownItemMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '4px'
    },
    dropdownItemCategory: {
      fontSize: '0.75rem',
      color: 'rgba(139, 92, 246, 0.8)',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      padding: '2px 8px',
      borderRadius: '12px',
      fontWeight: '500' as const
    },
    dropdownItemPro: {
      fontSize: '0.75rem',
      color: 'rgba(255, 215, 0, 0.8)',
      backgroundColor: 'rgba(255, 215, 0, 0.1)',
      padding: '2px 8px',
      borderRadius: '12px',
      fontWeight: '500' as const
    },
    dropdownLoading: {
      padding: isMobile ? '20px 16px' : '24px 20px',
      textAlign: 'center' as const,
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.875rem'
    },
    dropdownEmpty: {
      padding: isMobile ? '20px 16px' : '24px 20px',
      textAlign: 'center' as const,
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: '0.875rem'
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .dropdown-item {
          animation: fadeInUp 0.2s ease forwards;
        }
        .dropdown-item:nth-child(1) { animation-delay: 0.05s; }
        .dropdown-item:nth-child(2) { animation-delay: 0.1s; }
        .dropdown-item:nth-child(3) { animation-delay: 0.15s; }
        .dropdown-item:nth-child(4) { animation-delay: 0.2s; }
        .dropdown-item:nth-child(5) { animation-delay: 0.25s; }
        .dropdown-item:nth-child(6) { animation-delay: 0.3s; }
        .dropdown-item:nth-child(7) { animation-delay: 0.35s; }
        .dropdown-item:nth-child(8) { animation-delay: 0.4s; }
      `}</style>
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
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg 
                    width={isMobile ? "14" : "16"} 
                    height={isMobile ? "14" : "16"} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    style={{ 
                      flexShrink: 0,
                      animation: 'spin 1s linear infinite'
                    }}
                  >
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                  <span>Searching...</span>
                </>
              ) : (
                <>
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
                </>
              )}
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

      {/* Search Results Dropdown */}
      {showDropdown && (
        <div ref={dropdownRef} style={styles.dropdown}>
          {loadingResults ? (
            <div style={styles.dropdownLoading}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(139, 92, 246, 0.3)',
                  borderTop: '2px solid #8b5cf6',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Searching...
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.slice(0, maxResults).map((result, index) => (
              <div
                key={result.id}
                className="dropdown-item"
                style={{
                  ...styles.dropdownItem,
                  ...(selectedResultIndex === index ? styles.dropdownItemSelected : {}),
                  backgroundColor: selectedResultIndex === index 
                    ? 'rgba(139, 92, 246, 0.1)' 
                    : 'transparent'
                }}
                onMouseEnter={() => setSelectedResultIndex(index)}
                onClick={() => {
                  if (onResultSelect) {
                    onResultSelect(result);
                    setShowResults(false);
                    setSelectedResultIndex(-1);
                  }
                }}
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
                  {result.metadata?.readTime && (
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontWeight: '500'
                    }}>
                      {result.metadata.readTime}
                    </span>
                  )}
                  {result.metadata?.type && result.type === 'article' && (
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'rgba(59, 130, 246, 0.8)',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontWeight: '500'
                    }}>
                      {result.metadata.type}
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
          ) : (
            <div style={styles.dropdownEmpty}>
              No results found
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default SearchBar;
export type { SearchResult };
