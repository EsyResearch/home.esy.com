"use client";
import React from 'react';
import Link from 'next/link';
import { Eye, Clock, Bookmark, TrendingUp } from 'lucide-react';
import { Theme, TermOfDay, CategoryType } from '@/types';

interface Term {
  term: string;
  category: CategoryType;
  views: number;
}

interface GlossarySidebarProps {
  termOfDay: TermOfDay;
  recentTerms: Term[];
  currentTheme: Theme;
  getCategoryColor: (category: CategoryType) => string;
}

const GlossarySidebar: React.FC<GlossarySidebarProps> = ({
  termOfDay,
  recentTerms,
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
    
    {/* Recent Terms */}
    <div style={{
      padding: '2rem',
      background: currentTheme.elevated,
      border: `1px solid ${currentTheme.border}`,
      borderRadius: '18px',
      marginTop: 0,
      minWidth: 0
    }}>
      <h3 style={{
        fontSize: '1rem',
        fontWeight: 700,
        color: currentTheme.subtle,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: '1.5rem'
      }}>
        Recently Added
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {recentTerms.map((term, index) => (
          <Link
            key={index}
            href={`/glossary/${term.term.toLowerCase().replace(/\s+/g, '-')}/`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              background: currentTheme.bg,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '12px',
              textDecoration: 'none',
              color: currentTheme.text,
              transition: 'all 0.2s',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 500
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = currentTheme.accent;
              e.currentTarget.style.background = currentTheme.elevated;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = currentTheme.border;
              e.currentTarget.style.background = currentTheme.bg;
            }}
          >
            <div>
              <div style={{ fontWeight: 600, marginBottom: '0.15rem' }}>{term.term}</div>
              <div style={{ fontSize: '0.85rem', color: getCategoryColor(term.category), fontWeight: 600, textTransform: 'uppercase' }}>{term.category}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: currentTheme.subtle }}>
              <Eye size={14} />
              <span>{term.views > 1000 ? `${(term.views / 1000).toFixed(1)}k` : term.views}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
    {/* Quick Stats */}
    <div style={{
      padding: '2rem',
      background: currentTheme.elevated,
      border: `1px solid ${currentTheme.border}`,
      borderRadius: '18px',
      marginTop: 0,
      minWidth: 0
    }}>
      <h3 style={{
        fontSize: '1rem',
        fontWeight: 700,
        color: currentTheme.subtle,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: '1.5rem'
      }}>
        Quick Stats
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 0',
          borderBottom: `1px solid ${currentTheme.border}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: currentTheme.muted }}>
            <span style={{ fontWeight: 600 }}>Total Terms</span>
          </div>
          <span style={{ fontWeight: 700, color: currentTheme.text }}>156</span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 0',
          borderBottom: `1px solid ${currentTheme.border}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: currentTheme.muted }}>
            <span style={{ fontWeight: 600 }}>Total Views</span>
          </div>
          <span style={{ fontWeight: 700, color: currentTheme.text }}>24.3k</span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 0',
          borderBottom: `1px solid ${currentTheme.border}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: currentTheme.muted }}>
            <span style={{ fontWeight: 600 }}>Avg Read Time</span>
          </div>
          <span style={{ fontWeight: 700, color: currentTheme.text }}>2.4 min</span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: currentTheme.muted }}>
            <span style={{ fontWeight: 600 }}>Last Updated</span>
          </div>
          <span style={{ fontWeight: 700, color: currentTheme.text }}>Today</span>
        </div>
      </div>
    </div>
  </div>
);

export default GlossarySidebar; 