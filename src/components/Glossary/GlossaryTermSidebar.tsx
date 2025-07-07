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
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    {/* Term Stats */}
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
        Term Statistics
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
            <Eye size={14} />
            <span style={{ fontSize: '0.875rem' }}>Views</span>
          </div>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: currentTheme.text
          }}>
            {term.stats.views.toLocaleString()}
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
            <span style={{ fontSize: '0.875rem' }}>Read Time</span>
          </div>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: currentTheme.text
          }}>
            {term.stats.avgReadTime}
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
            <Bookmark size={14} />
            <span style={{ fontSize: '0.875rem' }}>Bookmarks</span>
          </div>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: currentTheme.text
          }}>
            {term.stats.bookmarks}
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
            <Share2 size={14} />
            <span style={{ fontSize: '0.875rem' }}>Shares</span>
          </div>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: currentTheme.text
          }}>
            {term.stats.shares}
          </span>
        </div>
      </div>
    </div>
    
    {/* Term History */}
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
        History
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
            <Calendar size={14} />
            <span style={{ fontSize: '0.875rem' }}>First Added</span>
          </div>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: currentTheme.text
          }}>
            {new Date(term.firstAdded).toLocaleDateString()}
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
            {new Date(term.lastUpdated).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
    
    {/* Update History */}
    {term.updateHistory.length > 0 && (
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
          Recent Updates
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {term.updateHistory.slice(0, 3).map((update, index) => (
            <div
              key={index}
              style={{
                padding: '0.75rem',
                background: currentTheme.bg,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '6px'
              }}
            >
              <div style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: currentTheme.text,
                marginBottom: '0.25rem'
              }}>
                {update.change}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: currentTheme.subtle
              }}>
                {new Date(update.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
    
    {/* Quick Actions */}
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
        Quick Actions
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            width: '100%',
            padding: '0.75rem',
            background: 'transparent',
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '6px',
            color: currentTheme.text,
            fontSize: '0.875rem',
            cursor: 'pointer',
            outline: 'none',
            transition: 'all 0.2s',
            textAlign: 'left'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = currentTheme.bg;
            e.currentTarget.style.borderColor = currentTheme.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = currentTheme.border;
          }}
        >
          <Bookmark size={16} />
          Add to Collection
        </button>
        
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            width: '100%',
            padding: '0.75rem',
            background: 'transparent',
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '6px',
            color: currentTheme.text,
            fontSize: '0.875rem',
            cursor: 'pointer',
            outline: 'none',
            transition: 'all 0.2s',
            textAlign: 'left'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = currentTheme.bg;
            e.currentTarget.style.borderColor = currentTheme.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = currentTheme.border;
          }}
        >
          <Share2 size={16} />
          Share Term
        </button>
      </div>
    </div>
  </div>
);

export default GlossaryTermSidebar; 