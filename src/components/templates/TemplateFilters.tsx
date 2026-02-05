'use client';

import React from 'react';
import { TemplateSubcategory, TemplateDifficulty } from '@/lib/templates';
import { Filter, X } from 'lucide-react';

// Navy Calm Light Theme
const theme = {
  bg: '#FFFFFF',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  faint: 'rgba(10, 37, 64, 0.35)',
  border: 'rgba(10, 37, 64, 0.08)',
  accent: '#00A896',
  accentLight: 'rgba(0, 168, 150, 0.08)',
  accentBorder: 'rgba(0, 168, 150, 0.25)',
};

interface TemplateFiltersProps {
  subcategories: TemplateSubcategory[];
  activeSubcategory: string | null;
  activeDifficulty: TemplateDifficulty | null;
  onSubcategoryChange: (subcategory: string | null) => void;
  onDifficultyChange: (difficulty: TemplateDifficulty | null) => void;
  onClearFilters: () => void;
  showMobileToggle?: boolean;
  hideSubcategories?: boolean;
}

const difficulties: { id: TemplateDifficulty; label: string }[] = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

export default function TemplateFilters({
  subcategories,
  activeSubcategory,
  activeDifficulty,
  onSubcategoryChange,
  onDifficultyChange,
  onClearFilters,
  hideSubcategories = false,
}: TemplateFiltersProps) {
  const hasActiveFilters = activeSubcategory !== null || activeDifficulty !== null;

  return (
    <aside
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: theme.text,
            fontWeight: 500,
            fontSize: '0.9375rem',
          }}
        >
          <Filter size={16} style={{ color: theme.subtle }} />
          Filters
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.25rem 0.5rem',
              background: 'transparent',
              border: 'none',
              color: theme.accent,
              fontSize: '0.8rem',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'all 0.2s ease',
            }}
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      {/* Subcategories */}
      {!hideSubcategories && subcategories.length > 0 && (
        <div>
          <h4
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: theme.subtle,
              marginBottom: '0.75rem',
            }}
          >
            Category
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() =>
                  onSubcategoryChange(activeSubcategory === sub.id ? null : sub.id)
                }
                style={{
                  padding: '0.5rem 0.75rem',
                  background:
                    activeSubcategory === sub.id ? theme.accentLight : 'transparent',
                  border: `1px solid ${
                    activeSubcategory === sub.id ? theme.accentBorder : 'transparent'
                  }`,
                  borderRadius: '8px',
                  color: activeSubcategory === sub.id ? theme.accent : theme.muted,
                  fontSize: '0.875rem',
                  fontWeight: activeSubcategory === sub.id ? 500 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{sub.name}</span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: theme.faint,
                  }}
                >
                  {sub.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Difficulty */}
      <div>
        <h4
          style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: theme.subtle,
            marginBottom: '0.75rem',
          }}
        >
          Difficulty
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {difficulties.map((diff) => (
            <button
              key={diff.id}
              onClick={() =>
                onDifficultyChange(activeDifficulty === diff.id ? null : diff.id)
              }
              style={{
                padding: '0.5rem 0.75rem',
                background:
                  activeDifficulty === diff.id ? theme.accentLight : 'transparent',
                border: `1px solid ${
                  activeDifficulty === diff.id ? theme.accentBorder : 'transparent'
                }`,
                borderRadius: '8px',
                color: activeDifficulty === diff.id ? theme.accent : theme.muted,
                fontSize: '0.875rem',
                fontWeight: activeDifficulty === diff.id ? 500 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
              }}
            >
              {diff.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
