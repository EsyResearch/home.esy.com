"use client"

import React from 'react';
import Image from 'next/image';

const ArticleHero = ({ category, title, author, date, readTime, theme, isDarkMode = true }) => {
  // Default theme if not provided
  const currentTheme = theme || {
    text: isDarkMode ? '#ffffff' : '#0f172a',
    muted: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
    accent: isDarkMode ? '#8b5cf6' : '#7c3aed',
    border: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
  };

  const styles = {
    articleHero: {
      padding: '3rem 3rem 4rem',
      maxWidth: '900px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 2
    },
    articleCategory: {
      display: 'inline-block',
      fontSize: '0.875rem',
      color: currentTheme.accent,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      fontWeight: '500',
      marginBottom: '1.5rem'
    },
    articleTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
      fontWeight: '200',
      lineHeight: '1.2',
      letterSpacing: '-0.03em',
      marginBottom: '2rem',
      color: currentTheme.text
    },
    articleMeta: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      flexWrap: 'wrap',
      marginBottom: '3rem'
    },
    authorInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    authorAvatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: 'rgba(139, 92, 246, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.25rem',
      fontWeight: '300',
      overflow: 'hidden',
      position: 'relative'
    },
    authorDetails: {
      textAlign: 'left'
    },
    authorName: {
      fontSize: '1rem',
      fontWeight: '500',
      marginBottom: '0.125rem'
    },
    authorRole: {
      fontSize: '0.875rem',
      color: currentTheme.muted
    },
    metaDivider: {
      width: '1px',
      height: '24px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    metaItem: {
      fontSize: '0.875rem',
      color: currentTheme.muted,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  };

  return (
    <header style={styles.articleHero}>
      <div style={styles.articleCategory}>{category}</div>
      <h1 style={styles.articleTitle}>{title}</h1>
      
      <div style={styles.articleMeta}>
        <div style={styles.authorInfo}>
          <div style={styles.authorAvatar}>
            {author.image ? (
              <Image
                src={author.image}
                alt={author.name}
                width={48}
                height={48}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            ) : (
              author.initials
            )}
          </div>
          <div style={styles.authorDetails}>
            <div style={styles.authorName}>{author.name}</div>
            <div style={styles.authorRole}>{author.role}</div>
          </div>
        </div>
        
        <div style={styles.metaDivider} />
        
        <div style={styles.metaItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {date}
        </div>
        
        <div style={styles.metaDivider} />
        
        <div style={styles.metaItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          {readTime} min read
        </div>
      </div>
    </header>
  );
};

export default ArticleHero;