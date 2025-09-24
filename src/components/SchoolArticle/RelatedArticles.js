"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';

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
        ? 'linear-gradient(180deg, rgba(30, 30, 40, 0.5) 0%, rgba(25, 25, 35, 0.3) 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
      borderRadius: '0px',
      border: isDarkMode 
        ? '1px solid rgba(255, 255, 255, 0.06)'
        : '1px solid rgba(139, 92, 246, 0.05)',
      boxShadow: isDarkMode 
        ? '0 1px 0 rgba(255,255,255,0.03) inset, 0 0 0 1px rgba(0,0,0,0.2)'
        : 'inset 0 1px 0 rgba(255,255,255,0.9), 0 20px 40px -20px rgba(0,0,0,0.1)',
      backdropFilter: isDarkMode ? 'blur(20px) saturate(1.2)' : 'none',
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
      backgroundColor: currentTheme.elevated,
      borderRadius: '16px',
      padding: '1.5rem',
      border: `1px solid ${currentTheme.border}`,
      height: '100%',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    relatedCategory: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      backgroundColor: `${currentTheme.accent}20`,
      color: currentTheme.accent,
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
      {/* Decorative gradient orbs */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-10%',
        width: '300px',
        height: '300px',
        background: isDarkMode 
          ? 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        opacity: isDarkMode ? 0.5 : 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-50%',
        right: '-10%',
        width: '300px',
        height: '300px',
        background: isDarkMode 
          ? 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        opacity: isDarkMode ? 0.5 : 1
      }} />

      {/* Top decorative line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100px',
        height: isDarkMode ? '2px' : '3px',
        background: isDarkMode 
          ? `linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent)`
          : `linear-gradient(90deg, transparent, ${currentTheme.accent}, transparent)`,
        borderRadius: '2px',
        opacity: isDarkMode ? 0.6 : 1
      }} />

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
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <article
                style={styles.relatedCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = currentTheme.accent;
                  e.currentTarget.style.boxShadow = isDarkMode ? '0 4px 12px rgba(0,0,0,0.2)' : 'none';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = currentTheme.border;
                  e.currentTarget.style.boxShadow = 'none';
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