'use client';

import React from 'react';
import { TemplateCategoryInfo } from '@/lib/templates';
import { elevatedDarkTheme } from '@/lib/theme';

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
        padding: '0.5rem',
        background: elevatedDarkTheme.borderSubtle,
        borderRadius: '12px',
        border: `1px solid ${elevatedDarkTheme.border}`,
      }}
    >
      {/* All category */}
      <button
        onClick={() => onCategoryChange('all')}
        style={{
          padding: '0.75rem 1.5rem',
          background:
            activeCategory === 'all'
              ? elevatedDarkTheme.accent
              : 'transparent',
          color:
            activeCategory === 'all'
              ? '#ffffff'
              : elevatedDarkTheme.muted,
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.9375rem',
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
            padding: '0.75rem 1.5rem',
            background:
              activeCategory === category.id
                ? elevatedDarkTheme.accent
                : 'transparent',
            color:
              activeCategory === category.id
                ? '#ffffff'
                : category.isComingSoon
                ? elevatedDarkTheme.faint
                : elevatedDarkTheme.muted,
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.9375rem',
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
                fontSize: '0.65rem',
                padding: '0.125rem 0.5rem',
                background: elevatedDarkTheme.borderSubtle,
                borderRadius: '4px',
                color: elevatedDarkTheme.subtle,
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
                    : elevatedDarkTheme.borderSubtle,
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

