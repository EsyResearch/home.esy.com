"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter } from 'lucide-react';
import { Theme, GlossaryCategory } from '@/types';

interface GlossaryNavigationProps {
  scrolled: boolean;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  categories: GlossaryCategory[];
  currentTheme: Theme;
}

const GlossaryNavigation: React.FC<GlossaryNavigationProps> = ({
  scrolled,
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  showFilters,
  setShowFilters,
  categories,
  currentTheme
}) => (
  <nav style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: scrolled ? 'rgba(10, 10, 15, 0.95)' : 'rgba(10, 10, 15, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: scrolled ? `1px solid ${currentTheme.border}` : '1px solid transparent',
    transition: 'all 0.3s ease'
  }}>
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'white' }}>
          <Image 
            src="/esy-logo.png" 
            alt="Esy Logo" 
            width={36} 
            height={36}
            style={{ flexShrink: 0 }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: currentTheme.text }}>
              Esy
            </span>
            <span style={{ 
              fontSize: '0.75rem', 
              color: currentTheme.subtle,
              marginTop: '-0.1rem'
            }}>
              AI Research Assistant
            </span>
          </div>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            href="/"
            style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '6px',
              color: currentTheme.subtle,
              fontSize: '0.875rem',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = currentTheme.elevated;
              e.currentTarget.style.color = currentTheme.text;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = currentTheme.subtle;
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
      
      {/* Search and Controls */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginTop: '2rem',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {/* Search */}
        <div style={{
          flex: '1 1 300px',
          minWidth: '250px',
          position: 'relative'
        }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: currentTheme.subtle,
            pointerEvents: 'none',
            zIndex: 1
          }} />
          <input
            type="text"
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.75rem',
              background: currentTheme.elevated,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '8px',
              color: currentTheme.text,
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'all 0.2s',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = currentTheme.accent;
              e.target.style.boxShadow = `0 0 0 3px ${currentTheme.accent}20`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = currentTheme.border;
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        
        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            background: currentTheme.elevated,
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '8px',
            color: currentTheme.text,
            fontSize: '0.875rem',
            cursor: 'pointer',
            outline: 'none',
            transition: 'all 0.2s',
            minWidth: '140px',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = currentTheme.accent;
            e.target.style.boxShadow = `0 0 0 3px ${currentTheme.accent}20`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = currentTheme.border;
            e.target.style.boxShadow = 'none';
          }}
        >
          <option value="alphabetical">A-Z</option>
          <option value="popular">Most Viewed</option>
          <option value="recent">Recently Updated</option>
        </select>
        
        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            background: showFilters ? currentTheme.accent : currentTheme.elevated,
            border: `1px solid ${showFilters ? currentTheme.accent : currentTheme.border}`,
            borderRadius: '8px',
            color: showFilters ? 'white' : currentTheme.text,
            fontSize: '0.875rem',
            cursor: 'pointer',
            outline: 'none',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            if (!showFilters) {
              e.currentTarget.style.background = currentTheme.accent;
              e.currentTarget.style.color = 'white';
            }
          }}
          onMouseLeave={(e) => {
            if (!showFilters) {
              e.currentTarget.style.background = currentTheme.elevated;
              e.currentTarget.style.color = currentTheme.text;
            }
          }}
        >
          <Filter size={16} />
          Categories
        </button>
      </div>
      
      {/* Category Filters */}
      {showFilters && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: currentTheme.elevated,
          border: `1px solid ${currentTheme.border}`,
          borderRadius: '8px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          {categories.map(category => {
            const isActive = activeFilter === category.id;
            const IconComponent = category.icon;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: isActive ? category.color : 'transparent',
                  border: `1px solid ${isActive ? category.color : currentTheme.border}`,
                  borderRadius: '6px',
                  color: isActive ? 'white' : currentTheme.text,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = category.color;
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = category.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = currentTheme.text;
                    e.currentTarget.style.borderColor = currentTheme.border;
                  }
                }}
              >
                {IconComponent && <IconComponent size={16} color={isActive ? 'white' : category.color} />}
                {category.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  </nav>
);

export default GlossaryNavigation; 