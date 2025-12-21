'use client';

import React, { useState } from 'react';
import { elevatedDarkTheme } from '@/lib/theme';
import { Search } from 'lucide-react';

interface TemplateSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
}

export default function TemplateSearch({
  value,
  onChange,
  onSearch,
  placeholder = 'Search templates by topic, goal, or output type...',
}: TemplateSearchProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        maxWidth: '600px',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.25rem',
          background: isFocused
            ? 'rgba(31, 31, 35, 0.95)'
            : 'rgba(31, 31, 35, 0.7)',
          border: `1px solid ${
            isFocused ? `${elevatedDarkTheme.accent}50` : elevatedDarkTheme.border
          }`,
          borderRadius: '12px',
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          boxShadow: isFocused
            ? `0 0 0 3px ${elevatedDarkTheme.accent}15, ${elevatedDarkTheme.shadows.glow}`
            : elevatedDarkTheme.shadows.sm,
          backdropFilter: 'blur(20px)',
        }}
      >
        <Search
          size={20}
          style={{
            color: isFocused ? elevatedDarkTheme.accent : elevatedDarkTheme.subtle,
            transition: 'color 0.2s ease',
            flexShrink: 0,
          }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: elevatedDarkTheme.text,
            fontSize: '1rem',
            fontWeight: 300,
          }}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            style={{
              padding: '0.25rem 0.5rem',
              background: elevatedDarkTheme.borderSubtle,
              border: 'none',
              borderRadius: '4px',
              color: elevatedDarkTheme.subtle,
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

