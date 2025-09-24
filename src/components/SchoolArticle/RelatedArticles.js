"use client"

import React from 'react';
import Link from 'next/link';

const RelatedArticles = ({ articles, theme, isDarkMode = true }) => {
  // Default theme if not provided
  const currentTheme = theme || {
    bg: isDarkMode ? '#0a0a0f' : '#ffffff',
    elevated: isDarkMode ? '#16161f' : '#f8fafc',
    text: isDarkMode ? '#ffffff' : '#0f172a',
    muted: isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(15, 23, 42, 0.4)',
    accent: isDarkMode ? '#8b5cf6' : '#7c3aed',
    border: isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.3)'
  };

  const styles = {
    relatedArticles: {
      marginTop: '5rem',
      padding: '4rem 0',
      backgroundColor: currentTheme.elevated,
      transition: 'background-color 0.3s ease'
    },
    relatedInner: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 3rem'
    },
    relatedTitle: {
      fontSize: '2rem',
      fontWeight: '300',
      marginBottom: '2rem',
      textAlign: 'center',
      color: currentTheme.text
    },
    relatedGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '2rem'
    },
    relatedCard: {
      backgroundColor: currentTheme.bg,
      borderRadius: '12px',
      padding: '1.5rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: '1px solid transparent'
    },
    relatedCategory: {
      fontSize: '0.75rem',
      color: currentTheme.accent,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      fontWeight: '500',
      marginBottom: '0.5rem'
    },
    relatedCardTitle: {
      fontSize: '1.125rem',
      fontWeight: '400',
      marginBottom: '0.5rem',
      letterSpacing: '-0.01em',
      color: currentTheme.text
    },
    relatedMeta: {
      fontSize: '0.875rem',
      color: currentTheme.muted
    }
  };

  return (
    <section style={styles.relatedArticles}>
      <div style={styles.relatedInner}>
        <h2 style={styles.relatedTitle}>Continue Learning</h2>
        <div style={styles.relatedGrid}>
          {articles.map((article, index) => (
            <Link
              key={index}
              href={article.link || '#'}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <article
                style={styles.relatedCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = currentTheme.border;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={styles.relatedCategory}>{article.category}</div>
                <h3 style={styles.relatedCardTitle}>{article.title}</h3>
                <div style={styles.relatedMeta}>
                  {article.author} · {article.readTime} read
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;