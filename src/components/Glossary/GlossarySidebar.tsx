"use client";
import React from 'react';
import Link from 'next/link';
import { Theme, TermOfDay, CategoryType } from '@/types';

interface GlossarySidebarProps {
  termOfDay: TermOfDay;
  currentTheme: Theme;
  getCategoryColor: (category: CategoryType) => string;
}

const GlossarySidebar: React.FC<GlossarySidebarProps> = ({
  termOfDay,
  currentTheme,
  getCategoryColor
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    {/* Term of the Day */}
    <div style={{
      position: 'relative',
      padding: '2rem',
      background: currentTheme.elevated,
      border: `1.5px solid ${currentTheme.accent}`,
      borderRadius: '18px',
      boxShadow: `0 0 0 2px ${currentTheme.accent}30`,
      minWidth: 0
    }}>
      {/* Header row: icon, label, badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        gap: '1.25rem',
        minWidth: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: '1.35rem', color: currentTheme.accent, fontWeight: 700, marginTop: '-2px' }}>✨</span>
          <span style={{
            fontSize: '1.08rem',
            fontWeight: 700,
            color: currentTheme.subtle,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginRight: '0.5rem',
            lineHeight: 1.1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            Term of the Day
          </span>
        </div>
        {termOfDay.isNew && (
          <span style={{
            padding: '0.22rem 1.1rem',
            background: currentTheme.accent,
            color: '#fff',
            fontSize: '1rem',
            borderRadius: '9px',
            fontWeight: 700,
            letterSpacing: '0.01em',
            lineHeight: 1.1,
            display: 'inline-block',
            marginLeft: '0.5rem',
            flexShrink: 0
          }}>
            NEW
          </span>
        )}
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <span style={{
          fontSize: '1.45rem',
          fontWeight: 700,
          color: currentTheme.text,
          letterSpacing: '-0.01em',
          lineHeight: 1.2
        }}>{termOfDay.term}</span>
      </div>
      <div style={{
        fontSize: '1rem',
        color: currentTheme.muted,
        marginBottom: '1.25rem',
        lineHeight: 1.6
      }}>
        {termOfDay.definition}
      </div>
      {termOfDay.personalNote && (
        <div style={{
          padding: '1rem',
          background: currentTheme.bg,
          border: `1px solid ${currentTheme.border}`,
          borderRadius: '12px',
          fontSize: '1rem',
          fontStyle: 'italic',
          color: currentTheme.subtle,
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '1.1rem' }}>💭</span>
          <span>{termOfDay.personalNote}</span>
        </div>
      )}
      {/* Divider */}
      <div style={{
        borderTop: `1px solid ${currentTheme.border}`,
        margin: '1.5rem 0 0.5rem 0'
      }} />
      {/* Bottom row: category and learn more */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '0.5rem',
        gap: '1rem'
      }}>
        <span style={{
          color: getCategoryColor(termOfDay.category),
          fontWeight: 700,
          fontSize: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.03em'
        }}>{termOfDay.category}</span>
        <Link
          href={`/glossary/${termOfDay.term.toLowerCase().replace(/\s+/g, '-')}/`}
          style={{
            color: currentTheme.accent,
            fontWeight: 500,
            fontSize: '1rem',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            transition: 'color 0.2s'
          }}
        >
          Learn more <span style={{ fontSize: '1.1em', marginLeft: '0.1em' }}>→</span>
        </Link>
      </div>
    </div>
    
  </div>
);

export default GlossarySidebar; 