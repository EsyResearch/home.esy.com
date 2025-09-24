"use client"

import React from 'react';

const ShareSection = ({ onShare, copiedLink, theme, isDarkMode = true }) => {
  // Default theme if not provided
  const currentTheme = theme || {
    text: isDarkMode ? '#ffffff' : '#0f172a',
    muted: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)',
    border: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)',
    divider: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)',
    accent: isDarkMode ? '#8b5cf6' : '#7c3aed',
    accentBg: isDarkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(124, 58, 237, 0.1)'
  };

  const styles = {
    shareSection: {
      padding: '3rem 0',
      borderTop: `1px solid ${currentTheme.divider}`,
      borderBottom: `1px solid ${currentTheme.divider}`,
      textAlign: 'center'
    },
    shareTitle: {
      fontSize: '1.25rem',
      fontWeight: '300',
      marginBottom: '1.5rem',
      color: currentTheme.text
    },
    shareButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      position: 'relative'
    },
    shareButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: 'transparent',
      border: `1px solid ${currentTheme.border}`,
      borderRadius: '8px',
      color: currentTheme.muted,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem'
    }
  };

  return (
    <div style={styles.shareSection}>
      <h3 style={styles.shareTitle}>Share this article</h3>
      <div style={styles.shareButtons}>
        <button 
          style={styles.shareButton}
          onClick={() => onShare('twitter')}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = currentTheme.accent;
            e.currentTarget.style.color = currentTheme.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = currentTheme.border;
            e.currentTarget.style.color = currentTheme.muted;
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
          Share on Twitter
        </button>
        
        <button 
          style={styles.shareButton}
          onClick={() => onShare('linkedin')}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = currentTheme.accent;
            e.currentTarget.style.color = currentTheme.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = currentTheme.border;
            e.currentTarget.style.color = currentTheme.muted;
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
          Share on LinkedIn
        </button>
        
        <button 
          style={{
            ...styles.shareButton,
            backgroundColor: copiedLink ? currentTheme.accentBg : 'transparent',
            borderColor: copiedLink ? currentTheme.accent : currentTheme.border,
            color: copiedLink ? currentTheme.accent : currentTheme.muted
          }}
          onClick={() => onShare('copy')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          {copiedLink ? 'Link copied!' : 'Copy link'}
        </button>
      </div>
    </div>
  );
};

export default ShareSection;