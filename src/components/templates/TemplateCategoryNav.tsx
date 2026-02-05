'use client';

import React from 'react';
import { TemplateCategoryInfo } from '@/lib/templates';

// Navy Calm Light Theme
const theme = {
  bg: '#FFFFFF',
  elevated: '#F8FAFC',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  faint: 'rgba(10, 37, 64, 0.35)',
  border: 'rgba(10, 37, 64, 0.08)',
  accent: '#00A896',
  accentLight: 'rgba(0, 168, 150, 0.08)',
};

interface TemplateCategoryNavProps {
  categories: TemplateCategoryInfo[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function TemplateCategoryNav({
  categories,
  activeCategory,
  onCategoryChange,
}: TemplateCategoryNavProps) {
  return (
    <nav
      style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        marginBottom: '2rem',
        padding: '0.375rem',
        background: theme.elevated,
        borderRadius: '12px',
        border: `1px solid ${theme.border}`,
      }}
    >
      {/* All category */}
      <button
        onClick={() => onCategoryChange('all')}
        style={{
          padding: '0.625rem 1.25rem',
          background: activeCategory === 'all' ? theme.accent : 'transparent',
          color: activeCategory === 'all' ? '#FFFFFF' : theme.muted,
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.875rem',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap',
        }}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => !category.isComingSoon && onCategoryChange(category.id)}
          disabled={category.isComingSoon}
          style={{
            padding: '0.625rem 1.25rem',
            background: activeCategory === category.id ? theme.accent : 'transparent',
            color:
              activeCategory === category.id
                ? '#FFFFFF'
                : category.isComingSoon
                ? theme.faint
                : theme.muted,
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: category.isComingSoon ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap',
            opacity: category.isComingSoon ? 0.6 : 1,
          }}
        >
          {category.name}
          {category.isComingSoon && (
            <span
              style={{
                fontSize: '0.625rem',
                padding: '0.125rem 0.375rem',
                background: 'rgba(10, 37, 64, 0.06)',
                borderRadius: '4px',
                color: theme.subtle,
              }}
            >
              Soon
            </span>
          )}
          {!category.isComingSoon && category.count > 0 && (
            <span
              style={{
                fontSize: '0.75rem',
                padding: '0.125rem 0.5rem',
                background:
                  activeCategory === category.id
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'rgba(10, 37, 64, 0.06)',
                borderRadius: '4px',
              }}
            >
              {category.count}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}
