"use client";
import React from 'react';
import { Eye, Clock, Bookmark, Share2, Calendar, TrendingUp } from 'lucide-react';
import { Theme, GlossaryTermDetail } from '@/types';

interface GlossaryTermSidebarProps {
  term: GlossaryTermDetail;
  currentTheme: Theme;
}

const GlossaryTermSidebar: React.FC<GlossaryTermSidebarProps> = ({
  term,
  currentTheme
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
    {/* Statistics Card */}
    <div style={{
      padding: '2rem 1.5rem 1.5rem 1.5rem',
      background: '#181824',
      border: `1.5px solid ${currentTheme.border}`,
      borderRadius: '18px',
      boxShadow: '0 2px 16px 0 rgba(99,102,241,0.06)',
      marginBottom: '0.5rem'
    }}>
      <div style={{
        fontSize: '1.08rem',
        fontWeight: 700,
        color: currentTheme.accent,
        marginBottom: '1.5rem',
        letterSpacing: '-0.01em'
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <Eye size={18} color={currentTheme.accent} /> Statistics
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: currentTheme.muted, fontSize: '0.98rem' }}>Views</span>
          <span style={{ color: currentTheme.text, fontWeight: 700, fontSize: '1.13rem' }}>{term.stats.views.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: currentTheme.muted, fontSize: '0.98rem' }}>Avg. read time</span>
          <span style={{ color: currentTheme.text, fontWeight: 700, fontSize: '1.13rem' }}>{term.stats.avgReadTime}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: currentTheme.muted, fontSize: '0.98rem' }}>Bookmarks</span>
          <span style={{ color: currentTheme.text, fontWeight: 700, fontSize: '1.13rem' }}>{term.stats.bookmarks}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: currentTheme.muted, fontSize: '0.98rem' }}>Shares</span>
          <span style={{ color: currentTheme.text, fontWeight: 700, fontSize: '1.13rem' }}>{term.stats.shares}</span>
        </div>
      </div>
    </div>
    {/* Related Terms Card */}
    {term.relatedTerms && term.relatedTerms.length > 0 && (
      <div style={{
        padding: '1.5rem',
        background: '#181824',
        border: `1.5px solid ${currentTheme.border}`,
        borderRadius: '18px',
        boxShadow: '0 2px 16px 0 rgba(99,102,241,0.06)',
        marginBottom: '0.5rem'
      }}>
        <div style={{
          fontSize: '1.08rem',
          fontWeight: 700,
          color: currentTheme.text,
          marginBottom: '1.1rem',
          letterSpacing: '-0.01em'
        }}>
          Related Terms
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          {term.relatedTerms.map((related, idx) => (
            <button
              key={related.toString()}
              style={{
                background: '#13131a',
                color: currentTheme.text,
                border: `1.5px solid ${currentTheme.border}`,
                borderRadius: '10px',
                padding: '0.7rem 1.1rem',
                fontSize: '1.02rem',
                fontWeight: 500,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s',
                outline: 'none',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              onMouseOver={e => e.currentTarget.style.background = currentTheme.elevated}
              onMouseOut={e => e.currentTarget.style.background = '#13131a'}
            >
              {related.toString()}
              <span style={{ color: currentTheme.accent, fontSize: '1.1em', marginLeft: '0.5rem' }}>›</span>
            </button>
          ))}
        </div>
      </div>
    )}
    {/* Used in Posts Card */}
    {term.relatedPosts && term.relatedPosts.length > 0 && (
      <div style={{
        padding: '1.25rem',
        background: '#181824',
        border: `1.5px solid ${currentTheme.border}`,
        borderRadius: '18px',
        boxShadow: '0 2px 16px 0 rgba(99,102,241,0.06)',
        marginBottom: '0.5rem'
      }}>
        <div style={{
          fontSize: '1.02rem',
          fontWeight: 700,
          color: currentTheme.text,
          marginBottom: '0.9rem',
          letterSpacing: '-0.01em',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ color: currentTheme.accent, fontSize: '1.1em' }}>⎋</span>Used in Posts
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {term.relatedPosts.map((post, idx) => (
            <div key={post.title} style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
              <a href={post.url || '#'} style={{ color: currentTheme.text, fontWeight: 500, fontSize: '1.01rem', textDecoration: 'none', marginBottom: '0.1rem' }}>{post.title}</a>
              <span style={{ color: currentTheme.muted, fontSize: '0.91rem' }}>{post.date}</span>
            </div>
          ))}
        </div>
      </div>
    )}
    {/* Buttons */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
      <button style={{
        background: currentTheme.accent,
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        fontWeight: 600,
        fontSize: '1.04rem',
        padding: '0.7rem 0',
        cursor: 'pointer',
        boxShadow: '0 2px 12px 0 rgba(99,102,241,0.10)',
        marginBottom: '0.2rem',
        transition: 'background 0.15s',
        minHeight: 'unset',
        height: 'auto',
        lineHeight: 1.2
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.7rem' }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="18" height="14" x="3" y="5" rx="2"/><path d="M8 9h8M8 13h6"/></svg>
          Copy Definition
        </span>
      </button>
      <button style={{
        background: 'transparent',
        color: currentTheme.text,
        border: `1.5px solid ${currentTheme.border}`,
        borderRadius: '12px',
        fontWeight: 600,
        fontSize: '1.04rem',
        padding: '0.7rem 0',
        cursor: 'pointer',
        boxShadow: 'none',
        transition: 'background 0.15s, color 0.15s',
        minHeight: 'unset',
        height: 'auto',
        lineHeight: 1.2
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.7rem' }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M5 12v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2"/><path d="M9 17l-2-2 2-2"/></svg>
          View in Context
        </span>
      </button>
    </div>
  </div>
);

export default GlossaryTermSidebar; 