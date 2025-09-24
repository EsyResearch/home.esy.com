"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Hash, BookOpen, Clock, Check } from 'lucide-react';

const ArticleSidebarComponent = ({ 
  tableOfContents = [], 
  scrollProgress = 0,
  showEmailCapture = true,
  emailCaptureTitle = "Stay Updated",
  emailCaptureDescription = "Get the latest articles delivered to your inbox",
  onEmailSubmit = () => {},
  currentTheme = null,
  isDarkMode = false
}) => {
  const [activeSection, setActiveSection] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const sidebarRef = useRef(null);

  // Default theme if not provided
  const theme = currentTheme || {
    text: isDarkMode ? '#ffffff' : '#000000',
    muted: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
    subtle: isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
    elevated: isDarkMode ? '#1a1a24' : '#f9fafb',
    card: isDarkMode ? '#16161f' : '#ffffff',
    border: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    accent: '#8b5cf6',
    accentLight: '#a78bfa',
    bg: isDarkMode ? '#0a0a0f' : '#ffffff'
  };

  // Update active section based on scroll
  useEffect(() => {
    const updateActiveSection = () => {
      if (!tableOfContents.length) return;
      
      const sections = tableOfContents.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(section => section.element);

      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Check if we're near the bottom of the page
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      
      if (isNearBottom && sections.length > 0) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          return;
        }
      }
      
      // If no section is active, activate the first one
      if (sections.length > 0) {
        setActiveSection(sections[0].id);
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection);
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [tableOfContents]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      onEmailSubmit(email);
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <aside ref={sidebarRef} style={{
      position: 'sticky',
      top: '100px',
      height: 'fit-content',
      width: '100%',
      maxWidth: '280px'
    }}>
      {/* Table of Contents */}
      {tableOfContents.length > 0 && (
        <div style={{
          background: `linear-gradient(145deg, ${theme.elevated} 0%, ${theme.card} 100%)`,
          borderRadius: '20px',
          padding: '1.5rem',
          border: `1px solid ${theme.border}`,
          backdropFilter: 'blur(20px)',
          boxShadow: `0 8px 32px ${theme.accent}10`,
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '2rem'
        }}>
          {/* Decorative corner accent - only in dark mode */}
          {isDarkMode && (
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '60px',
              height: '60px',
              background: `linear-gradient(135deg, ${theme.accent}20 0%, transparent 50%)`,
              borderRadius: '0 20px 0 20px'
            }} />
          )}
          
          <div style={{
            position: 'relative',
            zIndex: 1
          }}>
            {/* Header */}
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '300',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: theme.text,
              fontFamily: 'var(--font-literata)',
              letterSpacing: '-0.01em'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accentLight} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 12px ${theme.accent}30`
              }}>
                <Hash size={16} color="#ffffff" strokeWidth={2.5} />
              </div>
              Table of Contents
            </h3>

            {/* Progress Bar */}
            <div style={{
              marginBottom: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  color: theme.subtle,
                  fontWeight: '500',
                  letterSpacing: '0.025em'
                }}>
                  Reading Progress
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  color: theme.accent,
                  fontWeight: '600'
                }}>
                  {Math.round(scrollProgress)}%
                </span>
              </div>
              <div style={{
                height: '4px',
                backgroundColor: theme.border,
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${scrollProgress}%`,
                  background: `linear-gradient(90deg, ${theme.accent} 0%, ${theme.accentLight} 100%)`,
                  borderRadius: '4px',
                  transition: 'width 0.3s ease',
                  boxShadow: `0 2px 8px ${theme.accent}40`
                }} />
              </div>
            </div>

            {/* TOC Items */}
            <div style={{
              maxHeight: '400px',
              overflowY: 'auto',
              overflowX: 'hidden',
              paddingRight: '0.5rem'
            }}>
              {tableOfContents.map((item, index) => {
                const isActive = activeSection === item.id;
                const itemNumber = index + 1;
                
                return (
                  <div
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      marginBottom: '0.5rem',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundColor: isActive ? `${theme.accent}15` : 'transparent',
                      transform: isActive ? 'translateX(4px)' : 'translateX(0)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = `${theme.accent}08`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: isActive ? `${theme.accent}25` : theme.border,
                      color: isActive ? theme.accent : theme.subtle,
                      transition: 'all 0.3s ease',
                      flexShrink: 0
                    }}>
                      {itemNumber}
                    </div>
                    <span style={{
                      fontSize: '0.875rem',
                      color: isActive ? theme.text : theme.muted,
                      fontWeight: isActive ? '500' : '400',
                      lineHeight: 1.4,
                      transition: 'all 0.3s ease'
                    }}>
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Email Capture Card */}
      {showEmailCapture && (
        <div style={{
          background: isDarkMode 
            ? `linear-gradient(135deg, rgba(30, 30, 40, 0.9) 0%, rgba(25, 25, 35, 0.7) 100%)`
            : `linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)`,
          borderRadius: '20px',
          padding: '1.5rem',
          border: `1px solid ${theme.border}`,
          backdropFilter: 'blur(10px)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Title */}
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: theme.text,
            fontFamily: 'var(--font-literata), serif',
            letterSpacing: '-0.01em',
            lineHeight: 1.2
          }}>
            {emailCaptureTitle}
          </h4>

          {/* Description */}
          <p style={{
            fontSize: '0.8125rem',
            color: theme.muted,
            marginBottom: '1.5rem',
            lineHeight: 1.5,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}>
            {emailCaptureDescription}
          </p>

          {/* Email Form */}
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                borderRadius: '12px',
                color: theme.text,
                fontSize: '0.875rem',
                marginBottom: '1rem',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = theme.accent;
                e.target.style.boxShadow = `0 0 0 3px ${theme.accent}15`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = theme.border;
                e.target.style.boxShadow = 'none';
              }}
            />
            
            <button
              type="submit"
              disabled={isSubscribed}
              style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                background: isSubscribed 
                  ? `linear-gradient(135deg, #10b981 0%, #059669 100%)`
                  : `linear-gradient(135deg, ${theme.accent} 0%, #7c3aed 100%)`,
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: isSubscribed ? 'default' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                if (!isSubscribed) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 8px 20px ${theme.accent}30`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {isSubscribed ? (
                <>
                  <Check size={16} />
                  Subscribed!
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 4px;
        }
        
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        
        div::-webkit-scrollbar-thumb {
          background: ${theme.border};
          border-radius: 4px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: ${theme.accent}40;
        }
      `}</style>
    </aside>
  );
};

export default ArticleSidebarComponent;
