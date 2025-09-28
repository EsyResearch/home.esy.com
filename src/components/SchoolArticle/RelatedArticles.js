"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { elevatedDarkTheme } from '@/lib/theme';
import { lightTheme } from '@/lib/lightTheme';

const RelatedArticles = ({ articles, theme, isDarkMode = true }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      marginTop: '6rem',
      position: 'relative',
      padding: '4rem 2rem',
      background: isDarkMode 
        ? elevatedDarkTheme.bg
        : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
      borderRadius: '0px',
      border: 'none',
      boxShadow: 'none',
      overflow: 'hidden'
    },
    relatedInner: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 1
    },
    relatedTitle: {
      fontSize: '2rem',
      fontWeight: '300',
      marginBottom: '2rem',
      textAlign: 'center',
      color: currentTheme.text,
      fontFamily: 'var(--font-literata)',
      letterSpacing: '-0.02em'
    },
    relatedGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: '2rem',
      marginTop: '2rem'
    },
    relatedCard: {
      backgroundColor: isDarkMode ? elevatedDarkTheme.elevated : lightTheme.surface,
      borderRadius: '12px',
      padding: '1.5rem',
      border: 'none',
      height: '100%',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      boxShadow: isDarkMode ? '0 1px 3px rgba(0, 0, 0, 0.1)' : lightTheme.shadows?.sm
    },
    relatedCategory: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      backgroundColor: isDarkMode ? elevatedDarkTheme.accentGlow : lightTheme.accentGlow,
      color: isDarkMode ? elevatedDarkTheme.accent : lightTheme.accent,
      borderRadius: '8px',
      fontSize: '0.75rem',
      fontWeight: '600',
      marginBottom: '1rem'
    },
    relatedCardTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      marginBottom: '0.75rem',
      color: currentTheme.text,
      lineHeight: 1.3
    },
    relatedDescription: {
      fontSize: '0.875rem',
      color: currentTheme.muted,
      lineHeight: 1.5,
      marginBottom: '1rem'
    },
    relatedMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: currentTheme.subtle
    }
  };

  return (
    <section style={styles.relatedArticles}>


      <div style={styles.relatedInner}>
        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '3rem',
          position: 'relative',
          zIndex: 1
        }}>
          
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '300',
            marginBottom: '0.5rem',
            textAlign: 'center',
            fontFamily: 'var(--font-literata)',
            color: currentTheme.text,
            letterSpacing: '-0.02em'
          }}>
            Continue Learning
          </h2>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '0.5rem'
          }}>
            <div style={{
              width: '40px',
              height: '1px',
              background: isDarkMode 
                ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1))'
                : `linear-gradient(90deg, transparent, ${currentTheme.accent})`,
              opacity: isDarkMode ? 0.5 : 1
            }} />
            <p style={{
              fontSize: '1.125rem',
              color: isDarkMode ? 'rgba(255,255,255,0.6)' : currentTheme.muted,
              textAlign: 'center',
              margin: 0,
              fontStyle: 'italic'
            }}>
              Handpicked articles to expand your knowledge
            </p>
            <div style={{
              width: '40px',
              height: '1px',
              background: isDarkMode 
                ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1))'
                : `linear-gradient(90deg, transparent, ${currentTheme.accent})`,
              opacity: isDarkMode ? 0.5 : 1
            }} />
          </div>
        </div>
        <div style={styles.relatedGrid}>
          {articles.map((article, index) => (
            <Link
              key={index}
              href={article.link || '#'}
              style={{
                textDecoration: 'none',
                display: 'block',
                transform: 'translateY(0)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <article
                style={styles.relatedCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? elevatedDarkTheme.surface : lightTheme.elevated;
                  e.currentTarget.style.boxShadow = isDarkMode ? '0 4px 12px rgba(0,0,0,0.15)' : lightTheme.shadows?.md;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? elevatedDarkTheme.elevated : lightTheme.surface;
                  e.currentTarget.style.boxShadow = isDarkMode ? '0 1px 3px rgba(0, 0, 0, 0.1)' : lightTheme.shadows?.sm;
                }}
              >
                <div style={styles.relatedCategory}>{article.category}</div>
                <h3 style={styles.relatedCardTitle}>{article.title}</h3>
                <p style={styles.relatedDescription}>{article.description}</p>
                <div style={styles.relatedMeta}>
                  <Clock size={14} />
                  <span>{article.readTime} read</span>
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