import React from 'react';
import { Search } from 'lucide-react';

const HeroSection = ({ 
  searchFocused, 
  setSearchFocused, 
  activeFilter, 
  setActiveFilter, 
  filters,
  pageTitle = "Academic Essays",
  pageSubtitle = "& Research",
  pageDescription = "A collection of academic essays exploring contemporary issues. Each piece invites critical thinking, analysis, and continued exploration of ideas.",
  searchPlaceholder = "Search essays..."
}) => {
  return (
    <section style={{ 
      paddingTop: '10rem', 
      paddingBottom: '3rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ maxWidth: '42rem' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem'
          }}>
            <span style={{ fontWeight: 700 }}>{pageTitle}</span>
            <br />
            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{pageSubtitle}</span>
          </h1>
          
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '2.5rem',
            lineHeight: 1.6
          }}>
            {pageDescription}
          </p>

          {/* Simplified Search */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            padding: '0.25rem',
            maxWidth: '32rem',
            transition: 'all 0.2s',
            ...(searchFocused && {
              background: 'rgba(255, 255, 255, 0.04)',
              borderColor: 'rgba(99, 102, 241, 0.3)'
            })
          }}>
            <Search size={18} style={{ marginLeft: '1rem', color: 'rgba(255, 255, 255, 0.4)' }} />
            <input
              type="text"
              placeholder={searchPlaceholder}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
            <button style={{
              padding: '0.5rem 1.25rem',
              background: searchFocused ? '#6366f1' : 'transparent',
              border: 'none',
              borderRadius: '6px',
              color: searchFocused ? 'white' : 'rgba(255, 255, 255, 0.4)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              marginRight: '0.25rem',
              transition: 'all 0.2s'
            }}>
              Search
            </button>
          </div>

          {/* Clean Filter Pills */}
          <div style={{ 
            display: 'flex', 
            gap: '0.75rem', 
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                style={{
                  padding: '0.5rem 1rem',
                  background: activeFilter === filter.id ? '#6366f1' : 'transparent',
                  border: `1px solid ${activeFilter === filter.id ? '#6366f1' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '6px',
                  color: activeFilter === filter.id ? 'white' : 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.813rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {filter.label}
                <span style={{ 
                  marginLeft: '0.5rem', 
                  opacity: 0.5,
                  fontSize: '0.75rem'
                }}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 