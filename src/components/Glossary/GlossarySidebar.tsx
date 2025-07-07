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
      padding: '1.5rem',
      background: currentTheme.elevated,
      border: `1px solid ${currentTheme.border}`,
      borderRadius: '8px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: currentTheme.accent,
          animation: 'pulse 2s infinite'
        }} />
        <h3 style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: currentTheme.text,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Term of the Day
        </h3>
        {termOfDay.isNew && (
          <span style={{
            padding: '0.125rem 0.5rem',
            background: currentTheme.accent,
            color: 'white',
            fontSize: '0.75rem',
            borderRadius: '4px',
            fontWeight: 500
          }}>
            New
          </span>
        )}
      </div>
      
      <Link
        href={`/glossary/${termOfDay.term.toLowerCase().replace(/\s+/g, '-')}`}
        style={{
          display: 'block',
          textDecoration: 'none',
          color: currentTheme.text
        }}
      >
        <h4 style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
          color: currentTheme.text
        }}>
          {termOfDay.term}
        </h4>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.75rem',
          fontSize: '0.75rem'
        }}>
          <span style={{
            color: getCategoryColor(termOfDay.category),
            fontWeight: 500
          }}>
            {termOfDay.category.toUpperCase()}
          </span>
          <span style={{ color: currentTheme.faint }}>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Eye size={12} style={{ color: currentTheme.subtle }} />
            <span style={{ color: currentTheme.subtle }}>
              {termOfDay.views.toLocaleString()}
            </span>
          </div>
        </div>
        
        <p style={{
          fontSize: '0.875rem',
          lineHeight: 1.5,
          color: currentTheme.muted,
          marginBottom: '0.75rem'
        }}>
          {termOfDay.definition}
        </p>
        
        {termOfDay.personalNote && (
          <div style={{
            padding: '0.75rem',
            background: currentTheme.bg,
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '6px',
            fontSize: '0.813rem',
            fontStyle: 'italic',
            color: currentTheme.subtle
          }}>
            💡 {termOfDay.personalNote}
          </div>
        )}
      </Link>
    </div>
    
    {/* Recent Terms */}
    <div style={{
      padding: '1.5rem',
      background: currentTheme.elevated,
      border: `1px solid ${currentTheme.border}`,
      borderRadius: '8px'
    }}>
      <h3 style={{
        fontSize: '0.875rem',
        fontWeight: 600,
        color: currentTheme.text,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '1rem'
      }}>
        Recently Added
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {recentTerms.map((term, index) => (
          <Link
            key={index}
            href={`/glossary/${term.term.toLowerCase().replace(/\s+/g, '-')}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem',
              background: currentTheme.bg,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '6px',
              textDecoration: 'none',
              color: currentTheme.text,
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = currentTheme.accent;
              e.currentTarget.style.background = currentTheme.elevated;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = currentTheme.border;
              e.currentTarget.style.background = currentTheme.bg;
            }}
          >
            <div>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: '0.25rem'
              }}>
                {term.term}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: getCategoryColor(term.category),
                fontWeight: 500
              }}>
                {term.category.toUpperCase()}
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.75rem',
              color: currentTheme.subtle
            }}>
              <Eye size={12} />
              <span>{term.views > 1000 ? `${(term.views / 1000).toFixed(1)}k` : term.views}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
    
    {/* Quick Stats */}
    <div style={{
      padding: '1.5rem',
      background: currentTheme.elevated,
      border: `1px solid ${currentTheme.border}`,
      borderRadius: '8px'
    }}>
      <h3 style={{
        fontSize: '0.875rem',
        fontWeight: 600,
        color: currentTheme.text,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '1rem'
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
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: currentTheme.muted
          }}>
            <Bookmark size={14} />
            <span style={{ fontSize: '0.875rem' }}>Total Terms</span>
          </div>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: currentTheme.text
          }}>
            156
          </span>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 0',
          borderBottom: `1px solid ${currentTheme.border}`
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: currentTheme.muted
          }}>
            <Eye size={14} />
            <span style={{ fontSize: '0.875rem' }}>Total Views</span>
          </div>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: currentTheme.text
          }}>
            24.3k
          </span>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 0',
          borderBottom: `1px solid ${currentTheme.border}`
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: currentTheme.muted
          }}>
            <Clock size={14} />
            <span style={{ fontSize: '0.875rem' }}>Avg Read Time</span>
          </div>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: currentTheme.text
          }}>
            2.4 min
          </span>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 0'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: currentTheme.muted
          }}>
            <TrendingUp size={14} />
            <span style={{ fontSize: '0.875rem' }}>Last Updated</span>
          </div>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: currentTheme.text
          }}>
            Today
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default GlossarySidebar; 