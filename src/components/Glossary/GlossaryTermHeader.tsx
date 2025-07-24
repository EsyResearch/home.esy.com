"use client";
import React from 'react';
import { Theme, CategoryType } from '@/types';

interface CategoryMeta {
  name: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
}

interface GlossaryTermHeaderProps {
  term: string;
  pronunciation?: string;
  category: CategoryType;
  definition: string;
  categoryMeta: CategoryMeta;
  currentTheme: Theme;
}

const GlossaryTermHeader: React.FC<GlossaryTermHeaderProps> = ({
  term,
  pronunciation,
  category,
  definition,
  categoryMeta,
  currentTheme
}) => {
  const IconComponent = categoryMeta.icon;
  
  return (
    <header style={{ marginBottom: '1.5rem' }}>
      {/* Category Badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.75rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.32rem 0.75rem',
          background: `${categoryMeta.color}18`,
          border: `1px solid ${categoryMeta.color}33`,
          borderRadius: '6px',
          fontSize: '0.93rem',
          fontWeight: 600,
          color: categoryMeta.color,
          letterSpacing: '0.01em',
          boxShadow: '0 1px 4px 0 rgba(99,102,241,0.06)'
        }}>
          <IconComponent size={15} color={categoryMeta.color} />
          {categoryMeta.name}
        </div>
      </div>
      {/* Term Title */}
      <h1 style={{
        fontSize: '2.6rem',
        fontWeight: 700,
        lineHeight: 1.13,
        marginBottom: pronunciation ? '0.4rem' : '0.9rem',
        color: currentTheme.text,
        letterSpacing: '-0.02em',
        wordBreak: 'break-word',
        fontFamily: 'var(--font-literata)'
      }}>
        {term}
      </h1>
      {/* Pronunciation */}
      {pronunciation && (
        <div style={{
          fontSize: '1.08rem',
          color: currentTheme.subtle,
          fontStyle: 'italic',
          marginBottom: '0.8rem',
          letterSpacing: '0.01em'
        }}>
          {pronunciation}
        </div>
      )}
      {/* Definition */}
      <p style={{
        fontSize: '1.18rem',
        lineHeight: 1.7,
        color: currentTheme.muted,
        fontWeight: 400,
        maxWidth: '900px',
        marginBottom: 0
      }}>
        {definition}
      </p>
    </header>
  );
};

export default GlossaryTermHeader; 