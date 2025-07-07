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
    <header style={{ marginBottom: '2rem' }}>
      {/* Category Badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: `${categoryMeta.color}20`,
          border: `1px solid ${categoryMeta.color}30`,
          borderRadius: '6px',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: categoryMeta.color
        }}>
          <IconComponent size={16} color={categoryMeta.color} />
          {categoryMeta.name}
        </div>
      </div>
      
      {/* Term Title */}
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.2,
        marginBottom: pronunciation ? '0.5rem' : '1rem',
        color: currentTheme.text
      }}>
        {term}
      </h1>
      
      {/* Pronunciation */}
      {pronunciation && (
        <div style={{
          fontSize: '1.125rem',
          color: currentTheme.muted,
          fontStyle: 'italic',
          marginBottom: '1rem'
        }}>
          {pronunciation}
        </div>
      )}
      
      {/* Definition */}
      <p style={{
        fontSize: '1.25rem',
        lineHeight: 1.6,
        color: currentTheme.text,
        fontWeight: 300,
        maxWidth: '800px'
      }}>
        {definition}
      </p>
    </header>
  );
};

export default GlossaryTermHeader; 