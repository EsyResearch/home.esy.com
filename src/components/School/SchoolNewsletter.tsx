"use client"

import React from 'react';

export default function SchoolNewsletter({ emailInputRef, handleNewsletterSubmit, isMobile, isTablet, theme, isDarkMode = true }) {
  return (
    <section style={{ 
      position: 'relative',
      paddingTop: isMobile ? '3rem' : isTablet ? '4rem' : '5rem',
      paddingBottom: isMobile ? '2rem' : isTablet ? '3rem' : '4rem',
      overflow: 'hidden'
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '30%',
        right: isMobile ? '5%' : '15%',
        width: isMobile ? '150px' : '200px',
        height: isMobile ? '150px' : '200px',
        background: isDarkMode 
          ? 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: -1,
        filter: isMobile ? 'blur(30px)' : 'blur(40px)'
      }} />

      {/* Newsletter Scaffold Container */}
      <div style={{
        width: '100%',
        margin: '0',
        padding: '0',
        position: 'relative'
      }}>
        {/* Outer Scaffold Frame */}
        <div style={{
          position: 'relative',
          padding: isMobile ? '1.5rem' : isTablet ? '2rem' : '2.5rem',
          background: isDarkMode 
            ? 'rgba(22, 22, 31, 0.95)' 
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          borderTop: isDarkMode 
            ? '1px solid rgba(255, 255, 255, 0.05)' 
            : 'none',
          borderBottom: isDarkMode 
            ? '1px solid rgba(255, 255, 255, 0.05)' 
            : 'none',
          borderLeft: 'none',
          borderRight: 'none',
          borderRadius: '0',
          overflow: 'hidden',
          boxShadow: isDarkMode 
            ? '0 1px 0 rgba(255,255,255,0.03) inset, 0 0 0 1px rgba(0,0,0,0.2)'
            : 'none'
        }}>
          {/* Corner Accent Elements */}
          {/* Corner Accents - Only in dark mode */}
          {isDarkMode && (
            <>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: isMobile ? '40px' : '60px',
                height: isMobile ? '40px' : '60px',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, transparent 100%)'
              }} />
              
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: isMobile ? '40px' : '60px',
                height: isMobile ? '40px' : '60px',
                background: 'linear-gradient(225deg, rgba(139, 92, 246, 0.15) 0%, transparent 100%)'
              }} />
              
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: isMobile ? '40px' : '60px',
                height: isMobile ? '40px' : '60px',
                background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.15) 0%, transparent 100%)'
              }} />
              
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: isMobile ? '40px' : '60px',
                height: isMobile ? '40px' : '60px',
                background: 'linear-gradient(315deg, rgba(139, 92, 246, 0.15) 0%, transparent 100%)'
              }} />
            </>
          )}

          {/* Side decorative elements - Only in dark mode */}
          {!isMobile && isDarkMode && (
            <>
              <div style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: isTablet ? '80px' : '120px',
                background: 'linear-gradient(to bottom, transparent 0%, #8b5cf6 50%, transparent 100%)',
                borderRadius: '2px'
              }} />
              
              <div style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: isTablet ? '80px' : '120px',
                background: 'linear-gradient(to bottom, transparent 0%, #8b5cf6 50%, transparent 100%)',
                borderRadius: '2px'
              }} />

              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: isTablet ? '80px' : '120px',
                height: '3px',
                background: 'linear-gradient(to right, transparent 0%, #8b5cf6 50%, transparent 100%)',
                borderRadius: '2px'
              }} />
              
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: isTablet ? '80px' : '120px',
                height: '3px',
                background: 'linear-gradient(to right, transparent 0%, #8b5cf6 50%, transparent 100%)',
                borderRadius: '2px'
              }} />
            </>
          )}

          {/* Inner Content Container */}
          <div style={{
            position: 'relative',
            padding: isMobile ? '2rem 1.5rem' : isTablet ? '3rem 2.5rem' : '3.5rem 3rem',
            background: isDarkMode 
              ? 'rgba(10, 10, 15, 0.3)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.6) 100%)',
            backdropFilter: 'blur(10px)',
            border: isDarkMode 
              ? '1px solid rgba(255, 255, 255, 0.03)'
              : '1px solid rgba(139, 92, 246, 0.1)',
            borderRadius: isMobile ? '8px' : '12px',
            boxShadow: isDarkMode 
              ? '0 4px 20px rgba(10, 10, 15, 0.15)'
              : 'none'
          }}>
            {/* Newsletter Content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              {/* Header Section */}
              <div style={{
                textAlign: 'center',
                marginBottom: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem'
              }}>
                {/* Icon */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: isMobile ? '48px' : '56px',
                  height: isMobile ? '48px' : '56px',
                  background: isDarkMode 
                    ? 'rgba(139, 92, 246, 0.1)'
                    : 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%)',
                  borderRadius: '50%',
                  border: isDarkMode 
                    ? '2px solid rgba(139, 92, 246, 0.2)'
                    : '2px solid rgba(139, 92, 246, 0.15)',
                  marginBottom: '1.5rem',
                  boxShadow: isDarkMode 
                    ? '0 4px 12px rgba(139, 92, 246, 0.2)'
                    : 'none'
                }}>
                  <span style={{ fontSize: isMobile ? '20px' : '24px' }}>📚</span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: isMobile ? '1.75rem' : isTablet ? '2.25rem' : '2.5rem',
                  fontWeight: '300',
                  lineHeight: '1.2',
                  letterSpacing: '-0.025em',
                  marginBottom: '0.75rem',
                  fontFamily: 'Literata, Georgia, serif',
                  color: isDarkMode ? '#ffffff' : '#0f172a'
                }}>
                  Get Weekly AI Writing Tips
                </h3>

                {/* Subtitle */}
                <p style={{
                  fontSize: isMobile ? '0.875rem' : '0.9375rem',
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)',
                  margin: '0 auto 1.5rem auto',
                  maxWidth: isMobile ? '100%' : '400px',
                  lineHeight: '1.5'
                }}>
                  Real-world tutorials from Esy School to help you apply AI writing strategies that actually work.
                </p>

                {/* Trust indicators */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  fontSize: '0.75rem',
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(15, 23, 42, 0.6)',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: isDarkMode 
                      ? 'rgba(22, 22, 31, 0.5)'
                      : 'rgba(139, 92, 246, 0.04)',
                    borderRadius: '20px',
                    border: isDarkMode 
                      ? '1px solid rgba(255, 255, 255, 0.04)'
                      : '1px solid rgba(139, 92, 246, 0.08)',
                    whiteSpace: 'nowrap',
                    color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(15, 23, 42, 0.7)',
                    fontWeight: '500'
                  }}>
                    #️⃣ Weekly delivery
                  </span>
                  <span style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: isDarkMode 
                      ? 'rgba(22, 22, 31, 0.5)'
                      : 'rgba(139, 92, 246, 0.04)',
                    borderRadius: '20px',
                    border: isDarkMode 
                      ? '1px solid rgba(255, 255, 255, 0.04)'
                      : '1px solid rgba(139, 92, 246, 0.08)',
                    whiteSpace: 'nowrap',
                    color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(15, 23, 42, 0.7)',
                    fontWeight: '500'
                  }}>
                    👤 Zero spam
                  </span>
                </div>
              </div>

              {/* Form Section */}
              <div style={{
                width: '100%',
                maxWidth: '500px'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: '1rem',
                  alignItems: 'stretch'
                }}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    ref={emailInputRef}
                    style={{
                      flex: 1,
                      padding: isMobile ? '1rem 1.25rem' : '1rem 1.5rem',
                      background: isDarkMode 
                        ? '#16161f' 
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
                      border: isDarkMode 
                        ? '2px solid rgba(255, 255, 255, 0.05)' 
                        : '2px solid rgba(139, 92, 246, 0.1)',
                      borderRadius: '10px',
                      color: isDarkMode ? '#ffffff' : '#0f172a',
                      fontSize: '0.9375rem',
                      outline: 'none',
                      minHeight: '48px',
                      fontFamily: 'inherit',
                      boxShadow: isDarkMode 
                        ? '0 4px 12px rgba(10, 10, 15, 0.3)'
                        : 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#8b5cf6';
                      e.target.style.boxShadow = isDarkMode 
                        ? '0 4px 12px rgba(10, 10, 15, 0.3), 0 0 0 3px rgba(139, 92, 246, 0.1)'
                        : 'none';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = isDarkMode 
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(139, 92, 246, 0.1)';
                      e.target.style.boxShadow = isDarkMode 
                        ? '0 4px 12px rgba(10, 10, 15, 0.3)'
                        : 'none';
                    }}
                  />
                  <button 
                    onClick={handleNewsletterSubmit}
                    style={{
                      padding: isMobile ? '1rem 1.5rem' : '1rem 1.75rem',
                      background: 'linear-gradient(135deg, #8b5cf6 0%, rgba(139, 92, 246, 0.87) 100%)',
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: isMobile ? '0.875rem' : '0.9375rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isDarkMode ? '0 6px 20px rgba(139, 92, 246, 0.25)' : 'none',
                      minHeight: '48px',
                      whiteSpace: 'nowrap',
                      minWidth: isMobile ? 'auto' : '180px'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLButtonElement;
                      target.style.transform = 'translateY(-2px)';
                      target.style.boxShadow = isDarkMode ? '0 8px 24px rgba(139, 92, 246, 0.35)' : 'none';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLButtonElement;
                      target.style.transform = 'translateY(0)';
                      target.style.boxShadow = isDarkMode ? '0 6px 20px rgba(139, 92, 246, 0.25)' : 'none';
                    }}>
                    Send Me Writing Tips
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
