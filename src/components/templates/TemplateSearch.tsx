'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Navy Calm Light Theme for search
const theme = {
  bg: '#FFFFFF',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.5)',
  border: 'rgba(10, 37, 64, 0.12)',
  accent: '#00A896',
  accentLight: 'rgba(0, 168, 150, 0.08)',
  accentBorder: 'rgba(0, 168, 150, 0.3)',
};

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
          background: theme.bg,
          border: `1px solid ${isFocused ? theme.accentBorder : theme.border}`,
          borderRadius: '12px',
          transition: 'all 0.2s ease',
          boxShadow: isFocused
            ? `0 0 0 3px ${theme.accentLight}, 0 4px 12px rgba(10, 37, 64, 0.08)`
            : '0 2px 8px rgba(10, 37, 64, 0.04)',
        }}
      >
        <Search
          size={20}
          style={{
            color: isFocused ? theme.accent : theme.muted,
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
            color: theme.text,
            fontSize: '1rem',
            fontWeight: 400,
          }}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            style={{
              padding: '0.25rem 0.625rem',
              background: 'rgba(10, 37, 64, 0.06)',
              border: 'none',
              borderRadius: '4px',
              color: theme.muted,
              fontSize: '0.75rem',
              fontWeight: 500,
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

