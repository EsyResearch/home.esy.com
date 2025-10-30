'use client';
import React, { useState, useEffect } from 'react';
import { BookOpen, Hash, User } from 'lucide-react';

interface NewsletterSignupProps {
  currentTheme: {
    bg: string;
    elevated: string;
    text: string;
    muted: string;
    subtle: string;
    faint: string;
    border: string;
    accent: string;
  };
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ currentTheme }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        background: `radial-gradient(circle, ${currentTheme.accent}06 0%, transparent 70%)`,
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
        {/* Outer Scaffold Frame - More rectangular */}
        <div style={{
          position: 'relative',
          padding: isMobile ? '1.5rem' : isTablet ? '2rem' : '2.5rem',
          background: `${currentTheme.elevated}10`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${currentTheme.border}`,
          borderLeft: 'none',
          borderRight: 'none',
          borderRadius: '0',
          overflow: 'hidden'
        }}>
          {/* Corner Accent Elements */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: isMobile ? '40px' : '60px',
            height: isMobile ? '40px' : '60px',
            background: `linear-gradient(135deg, ${currentTheme.accent}15 0%, transparent 100%)`
          }} />
          
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: isMobile ? '40px' : '60px',
            height: isMobile ? '40px' : '60px',
            background: `linear-gradient(225deg, ${currentTheme.accent}15 0%, transparent 100%)`
          }} />
          
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: isMobile ? '40px' : '60px',
            height: isMobile ? '40px' : '60px',
            background: `linear-gradient(45deg, ${currentTheme.accent}15 0%, transparent 100%)`
          }} />
          
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: isMobile ? '40px' : '60px',
            height: isMobile ? '40px' : '60px',
            background: `linear-gradient(315deg, ${currentTheme.accent}15 0%, transparent 100%)`
          }} />

          {/* Side decorative elements - Hide on mobile */}
          {!isMobile && (
            <>
              <div style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: isTablet ? '80px' : '120px',
                background: `linear-gradient(to bottom, transparent 0%, ${currentTheme.accent} 50%, transparent 100%)`,
                borderRadius: '2px'
              }} />
              
              <div style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: isTablet ? '80px' : '120px',
                background: `linear-gradient(to bottom, transparent 0%, ${currentTheme.accent} 50%, transparent 100%)`,
                borderRadius: '2px'
              }} />

              {/* Top and bottom accent lines */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: isTablet ? '80px' : '120px',
                height: '3px',
                background: `linear-gradient(to right, transparent 0%, ${currentTheme.accent} 50%, transparent 100%)`,
                borderRadius: '2px'
              }} />
              
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: isTablet ? '80px' : '120px',
                height: '3px',
                background: `linear-gradient(to right, transparent 0%, ${currentTheme.accent} 50%, transparent 100%)`,
                borderRadius: '2px'
              }} />
            </>
          )}

          {/* Inner Content Container - More spacious and rectangular */}
          <div style={{
            position: 'relative',
            padding: isMobile ? '2rem 1.5rem' : isTablet ? '3rem 2.5rem' : '3.5rem 3rem',
            background: `${currentTheme.bg}30`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${currentTheme.border}30`,
            borderRadius: isMobile ? '8px' : '12px',
            boxShadow: `0 4px 20px ${currentTheme.bg}15`
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
              {/* Header Section - Clean and organized */}
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
                  background: `${currentTheme.accent}10`,
                  borderRadius: '50%',
                  border: `2px solid ${currentTheme.accent}20`,
                  marginBottom: '1.5rem'
                }}>
                  <BookOpen size={isMobile ? 20 : 24} style={{ color: currentTheme.accent }} />
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: isMobile ? '1.75rem' : isTablet ? '2.25rem' : '2.5rem',
                  fontWeight: 300,
                  lineHeight: 1.2,
                  letterSpacing: '-0.025em',
                  marginBottom: '0.75rem',
                  fontFamily: 'Literata, serif',
                  color: currentTheme.text
                }}>
                  Subscribe to Esy Journal
                </h3>

                {/* Subtitle */}
                <p style={{
                  fontSize: isMobile ? '0.875rem' : '0.9375rem',
                  color: currentTheme.muted,
                  margin: '0 auto 1.5rem auto',
                  maxWidth: isMobile ? '100%' : '400px',
                  lineHeight: 1.5
                }}>
                  Daily insights from the frontlines of AI research and development
                </p>

                {/* Trust indicators */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  fontSize: '0.75rem',
                  color: currentTheme.subtle,
                  flexWrap: 'wrap'
                }}>
                  <span style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: `${currentTheme.elevated}50`,
                    borderRadius: '20px',
                    border: `1px solid ${currentTheme.border}40`,
                    whiteSpace: 'nowrap'
                  }}>
                    <Hash size={12} />
                    Daily delivery
                  </span>
                  <span style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: `${currentTheme.elevated}50`,
                    borderRadius: '20px',
                    border: `1px solid ${currentTheme.border}40`,
                    whiteSpace: 'nowrap'
                  }}>
                    <User size={12} />
                    Zero spam
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
                  gap: isMobile ? '1rem' : '1rem',
                  alignItems: 'stretch'
                }}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    style={{
                      flex: 1,
                      padding: isMobile ? '1rem 1.25rem' : '1rem 1.5rem',
                      background: currentTheme.elevated,
                      border: `2px solid ${currentTheme.border}`,
                      borderRadius: '10px',
                      color: currentTheme.text,
                      fontSize: '0.9375rem',
                      outline: 'none',
                      minHeight: '48px',
                      fontFamily: 'inherit',
                      boxShadow: `0 4px 12px ${currentTheme.bg}30`,
                      transition: 'border-color 0.2s ease'
                    }}
                  />
                  <button style={{
                    padding: isMobile ? '1rem 2.5rem' : '1rem 2rem',
                    background: `linear-gradient(135deg, ${currentTheme.accent} 0%, ${currentTheme.accent}DD 100%)`,
                    border: 'none',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: `0 6px 20px ${currentTheme.accent}25`,
                    minHeight: '48px',
                    whiteSpace: 'nowrap',
                    minWidth: isMobile ? 'auto' : '140px'
                  }}>
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
