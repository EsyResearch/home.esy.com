"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const AuthorBox = ({ author, theme, isDarkMode = true }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Updated bio text to match blog profile
  const updatedBio = "Software Engineer with 5 years of experience, passionate about the intersection of AI and writing. Building tools that empower writers to create better content with the help of artificial intelligence.";

  // Default theme if not provided - Navy Calm
  const currentTheme = theme || {
    text: isDarkMode ? '#ffffff' : '#0A2540',
    muted: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(10, 37, 64, 0.7)',
    accent: isDarkMode ? '#00D4AA' : '#00A896',
    accentLight: isDarkMode ? '#5EEAD4' : '#00D4AA',
    border: isDarkMode ? 'rgba(0, 168, 150, 0.15)' : 'rgba(10, 37, 64, 0.1)',
    bg: isDarkMode ? 'linear-gradient(135deg, rgba(10, 37, 64, 0.9) 0%, rgba(6, 21, 39, 0.7) 100%)' : '#F8F9FA',
  };

  return (
    <div style={{
      width: '100%',
      marginTop: '4rem',
      padding: '3rem',
      background: currentTheme.bg,
      borderRadius: '24px',
      border: `1px solid ${currentTheme.border}`,
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box',
      transition: 'all 0.3s ease'
    }}>
      {/* Background decoration - Only in dark mode */}
      {isDarkMode && (
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(0, 168, 150, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }} />
      )}
      
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'center' : 'flex-start',
        gap: isMobile ? '2rem' : '3rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Author Avatar */}
        <div style={{
          flexShrink: 0
        }}>
          <div style={{
            width: isMobile ? '80px' : '100px',
            height: isMobile ? '80px' : '100px',
            borderRadius: '50%',
            background: isDarkMode 
              ? 'linear-gradient(135deg, rgba(0, 168, 150, 0.3) 0%, rgba(0, 168, 150, 0.15) 100%)'
              : 'rgba(0, 168, 150, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isDarkMode ? '#ffffff' : currentTheme.accent,
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: '600',
            boxShadow: 'none',
            border: `2px solid ${currentTheme.border}`,
            overflow: 'hidden'
          }}>
            {author.image ? (
              <img 
                src={author.image} 
                alt={author.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              author.initials || 'ZU'
            )}
          </div>
        </div>
        
        {/* Author Info */}
        <div style={{
          flex: 1,
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <div style={{
            fontSize: isMobile ? '1.5rem' : '1.75rem',
            fontWeight: '600',
            marginBottom: '0.25rem',
            color: currentTheme.text,
            fontFamily: 'var(--font-literata)'
          }}>
            {author.name}
          </div>
          <div style={{
            fontSize: '1rem',
            color: isDarkMode ? currentTheme.accent : currentTheme.muted,
            marginBottom: '1rem',
            fontWeight: '500'
          }}>
            {author.role}
          </div>
          <p style={{
            fontSize: '1rem',
            color: currentTheme.muted,
            lineHeight: 1.6,
            marginBottom: '1.5rem',
            maxWidth: '600px'
          }}>
            {updatedBio}
          </p>
          
          {/* Action Buttons - Side by Side */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            justifyContent: isMobile ? 'center' : 'flex-start',
            alignItems: 'center'
          }}>
            <Link 
              href="/school/articles/"
              style={{
                padding: '0.75rem 2rem',
                background: `linear-gradient(135deg, ${currentTheme.accent} 0%, ${currentTheme.accentLight} 100%)`,
                color: '#ffffff',
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.3s ease',
                boxShadow: 'none',
                textDecoration: 'none',
                display: 'inline-block',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                // Removed box shadow on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                // Removed box shadow
              }}
            >
              Read More Articles
            </Link>
            
            <Link 
              href="/ai-essay-writer/"
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: 'transparent',
                color: currentTheme.text,
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                border: `2px solid ${currentTheme.border}`,
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                display: 'inline-block',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 168, 150, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(0, 168, 150, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = currentTheme.border;
              }}
            >
              Try AI Essay Writer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBox;