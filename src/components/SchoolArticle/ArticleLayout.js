"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const ArticleLayout = ({ children, meta }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState('default');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = (platform) => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
    setShowShareMenu(false);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#0a0a0f',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      lineHeight: 1.6
    },
    progressBar: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '3px',
      backgroundColor: '#8b5cf6',
      width: `${scrollProgress}%`,
      transition: 'width 0.1s ease',
      zIndex: 1001
    },
    articleHeader: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(10, 10, 15, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      transition: 'all 0.3s ease'
    },
    headerInner: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '1rem 3rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: '1.25rem',
      fontWeight: '300',
      letterSpacing: '-0.02em',
      color: '#ffffff',
      textDecoration: 'none'
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    iconButton: {
      padding: '0.625rem',
      backgroundColor: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      color: 'rgba(255, 255, 255, 0.7)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    articleContainer: {
      paddingTop: '5rem'
    },
    breadcrumb: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1.5rem 3rem 0',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.5)'
    },
    breadcrumbLink: {
      color: 'rgba(255, 255, 255, 0.5)',
      textDecoration: 'none',
      transition: 'color 0.2s ease'
    },
    shareMenu: {
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: '0.5rem',
      backgroundColor: '#16161f',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      padding: '0.5rem',
      minWidth: '200px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
    },
    shareMenuItem: {
      padding: '0.75rem 1rem',
      backgroundColor: 'transparent',
      border: 'none',
      color: 'rgba(255, 255, 255, 0.7)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      width: '100%',
      fontSize: '0.875rem',
      borderRadius: '6px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.progressBar} />

      <article style={styles.articleContainer}>
        {/* Breadcrumb */}
        <nav style={styles.breadcrumb}>
          <Link 
            href="/school" 
            style={styles.breadcrumbLink}
            onMouseEnter={(e) => e.target.style.color = '#ffffff'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.5)'}
          >
            School
          </Link>
          <span>/</span>
          <Link 
            href="/school/articles" 
            style={styles.breadcrumbLink}
            onMouseEnter={(e) => e.target.style.color = '#ffffff'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.5)'}
          >
            Articles
          </Link>
          <span>/</span>
          <span>{meta?.category || 'Article'}</span>
        </nav>

        {children}
      </article>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
        }
      `}</style>
    </div>
  );
};

export default ArticleLayout;