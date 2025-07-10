"use client"

import React from 'react';

const RelatedArticles = ({ articles }) => {
  const styles = {
    relatedArticles: {
      marginTop: '5rem',
      padding: '4rem 0',
      backgroundColor: '#16161f'
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
      textAlign: 'center'
    },
    relatedGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '2rem'
    },
    relatedCard: {
      backgroundColor: '#0a0a0f',
      borderRadius: '12px',
      padding: '1.5rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: '1px solid transparent'
    },
    relatedCategory: {
      fontSize: '0.75rem',
      color: '#8b5cf6',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      fontWeight: '500',
      marginBottom: '0.5rem'
    },
    relatedCardTitle: {
      fontSize: '1.125rem',
      fontWeight: '400',
      marginBottom: '0.5rem',
      letterSpacing: '-0.01em'
    },
    relatedMeta: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.4)'
    }
  };

  return (
    <section style={styles.relatedArticles}>
      <div style={styles.relatedInner}>
        <h2 style={styles.relatedTitle}>Continue Learning</h2>
        <div style={styles.relatedGrid}>
          {articles.map((article, index) => (
            <article
              key={index}
              style={styles.relatedCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;