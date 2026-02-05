"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Theme, GlossaryTerm, GlossaryCategory } from '@/types';

interface GlossaryGridProps {
  terms: GlossaryTerm[];
  categories: GlossaryCategory[];
  currentTheme: Theme;
  hoveredTerm: string | null;
  setHoveredTerm: (term: string | null) => void;
  getCategoryColor: (category: string) => string;
  getPopularityDots: (popularity: number) => React.ReactNode;
  windowWidth: number;
}

const GlossaryGrid: React.FC<GlossaryGridProps> = ({
  terms,
  categories,
  currentTheme,
  hoveredTerm,
  setHoveredTerm,
  getCategoryColor,
  getPopularityDots,
  windowWidth
}) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: windowWidth < 768 
      ? '1fr' 
      : windowWidth < 1024 
        ? 'repeat(2, 1fr)' 
        : windowWidth < 1400 
          ? 'repeat(3, 1fr)'
          : 'repeat(4, 1fr)',
    gap: '1rem'
  }}>
    {terms.map(term => (
      <Link
        key={term.id}
        href={`/glossary/${term.id}/`}
        style={{
          display: 'block',
          padding: '1.25rem',
          background: hoveredTerm === term.id ? currentTheme.elevated : 'transparent',
          border: `1px solid ${hoveredTerm === term.id ? currentTheme.border : 'transparent'}`,
          borderRadius: '8px',
          textDecoration: 'none',
          color: currentTheme.text,
          transition: 'all 0.2s',
          cursor: 'pointer',
          position: 'relative'
        }}
        onMouseEnter={() => setHoveredTerm(term.id)}
        onMouseLeave={() => setHoveredTerm(null)}
      >
        {/* Term Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          marginBottom: '0.5rem'
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.2,
            marginBottom: '0.25rem'
          }}>
            {term.term}
          </h3>
          <ArrowUpRight 
            size={14} 
            style={{ 
              color: currentTheme.subtle,
              opacity: hoveredTerm === term.id ? 1 : 0,
              transition: 'opacity 0.2s'
            }} 
          />
        </div>
        
        {/* Category */}
        <div style={{
          marginBottom: '0.75rem',
          fontSize: '0.75rem'
        }}>
          <span style={{
            color: getCategoryColor(term.category),
            fontWeight: 500
          }}>
            {categories.find(c => c.id === term.category)?.name}
          </span>
        </div>
        
        {/* Definition Preview */}
        <p style={{
          fontSize: '0.813rem',
          lineHeight: 1.5,
          color: currentTheme.muted,
          marginBottom: '0.75rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {term.definition}
        </p>
        
        {/* Popularity Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>{getPopularityDots(term.popularity)}</div>
          <span style={{
            fontSize: '0.75rem',
            color: currentTheme.faint
          }}>
            {term.readTime} min
          </span>
        </div>
        
        {/* Hover Preview */}
        {hoveredTerm === term.id && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '0.5rem',
            padding: '1rem',
            background: currentTheme.elevated,
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '8px',
            boxShadow: '0 4px 24px rgba(10, 37, 64, 0.15)',
            zIndex: 10,
            fontSize: '0.813rem',
            lineHeight: 1.6,
            color: currentTheme.muted
          }}>
            {term.definition}
            <div style={{
              marginTop: '0.75rem',
              paddingTop: '0.75rem',
              borderTop: `1px solid ${currentTheme.border}`,
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: currentTheme.subtle
            }}>
              <span>Click to read full entry →</span>
              <span>Updated {new Date(term.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </Link>
    ))}
    
    {/* Empty State */}
    {terms.length === 0 && (
      <div style={{
        gridColumn: '1/-1',
        textAlign: 'center',
        padding: '4rem 2rem',
        color: currentTheme.subtle
      }}>
        <p style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>
          No terms found matching your criteria
        </p>
        <p style={{ fontSize: '0.875rem' }}>
          Try adjusting your search or filters
        </p>
      </div>
    )}
  </div>
);

export default GlossaryGrid; 