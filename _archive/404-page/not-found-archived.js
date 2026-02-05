"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen, ArrowRight, Compass, MapPin,
  Book, Lightbulb, Archive, FileText, Sun, Moon
} from 'lucide-react';
import Link from 'next/link';
import { publishedVisualEssays } from '@/data/visualEssays';
import { navyCalmDarkTheme } from '@/lib/theme';

// Glossary term count (matches glossary page)
const GLOSSARY_TERM_COUNT = 30;

// Light theme - Navy Calm
const lightTheme = {
  bg: '#FFFFFF',
  elevated: '#F8FAFC',
  surface: '#F1F5F9',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  faint: 'rgba(10, 37, 64, 0.3)',
  border: 'rgba(10, 37, 64, 0.08)',
  accent: '#00A896',
  accentMuted: 'rgba(0, 168, 150, 0.15)',
};

// Dark theme - Navy Calm Dark
const darkTheme = {
  bg: navyCalmDarkTheme.bg,
  elevated: navyCalmDarkTheme.surface,
  surface: navyCalmDarkTheme.elevated,
  text: navyCalmDarkTheme.text,
  muted: navyCalmDarkTheme.muted,
  subtle: navyCalmDarkTheme.subtle,
  faint: navyCalmDarkTheme.subtle,
  border: navyCalmDarkTheme.border,
  accent: navyCalmDarkTheme.accent,
  accentMuted: navyCalmDarkTheme.accentTint,
};

const NotFoundPage = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const canvasRef = useRef(null);

  // Set initial theme immediately on mount (before first render)
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme-404');
    const isDark = storedTheme === 'dark';
    if (isDark) {
      document.body.classList.add('not-found-dark');
      document.body.classList.remove('not-found-light');
    } else {
      document.body.classList.add('not-found-light');
      document.body.classList.remove('not-found-dark');
    }
    // Dispatch event immediately to update navigation and footer
    setTimeout(() => {
      window.dispatchEvent(new Event('themechange'));
    }, 0);
  }

  // Initialize theme on mount
  useEffect(() => {
    const checkTheme = () => {
      const storedTheme = localStorage.getItem('theme-404');
      const isDark = storedTheme === 'dark';
      setIsDarkMode(isDark);
      if (isDark) {
        document.body.classList.add('not-found-dark');
        document.body.classList.remove('not-found-light');
      } else {
        document.body.classList.add('not-found-light');
        document.body.classList.remove('not-found-dark');
      }
      // Dispatch event to update navigation and footer
      window.dispatchEvent(new Event('themechange'));
    };
    
    // Run immediately on mount
    checkTheme();
    
    // Also listen for theme changes
    window.addEventListener('themechange', checkTheme);
    return () => window.removeEventListener('themechange', checkTheme);
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    const newIsDark = !isDarkMode;
    setIsDarkMode(newIsDark);
    if (newIsDark) {
      document.body.classList.add('not-found-dark');
      document.body.classList.remove('not-found-light');
      localStorage.setItem('theme-404', 'dark');
    } else {
      document.body.classList.add('not-found-light');
      document.body.classList.remove('not-found-dark');
      localStorage.setItem('theme-404', 'light');
    }
    window.dispatchEvent(new Event('themechange'));
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  const fullText = "Every essay begins with a question...";
  
  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Constellation background - theme aware
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        opacity: Math.random() * 0.3
      });
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fillStyle = isDarkMode 
          ? `rgba(0, 212, 170, ${star.opacity})` 
          : `rgba(0, 168, 150, ${star.opacity * 0.2})`;
        ctx.fill();
      });
    };

    drawStars();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawStars();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDarkMode]);

  // Research suggestions that cycle
  const researchPrompts = [
    "What if consciousness is computational?",
    "How does language shape thought?",
    "Can ethics be algorithmic?",
    "Where does creativity originate?",
    "Why do civilizations rise and fall?"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % researchPrompts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [researchPrompts.length]);

  // Navigation cards as research domains
  const domains = [
    {
      id: 'templates',
      icon: FileText,
      title: 'Workflow Templates',
      description: 'Structured workflows for research artifacts',
      stat: '35 templates',
      href: '/templates/essay'
    },
    {
      id: 'write',
      icon: Lightbulb,
      title: 'Research Workflows',
      description: 'Design intent-driven artifacts',
      stat: 'app.esy.com',
      href: 'https://app.esy.com'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>
      {/* Constellation Canvas */}
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: isDarkMode ? 0.4 : 0.2,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease'
        }}
      />

      {/* Theme Toggle Button - Fixed position bottom right */}
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 100,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: `1px solid ${currentTheme.border}`,
          background: currentTheme.elevated,
          color: currentTheme.text,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: isDarkMode 
            ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
            : '0 4px 12px rgba(10, 37, 64, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Main Content */}
        <main style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8rem 2rem 4rem'
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            width: '100%',
            margin: '0 auto'
          }}>
            {/* 404 as coordinate */}
            <div style={{
              textAlign: 'center',
              marginBottom: '4rem'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem 1.5rem',
                background: currentTheme.elevated,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '100px',
                marginBottom: '3rem'
              }}>
                <MapPin size={16} style={{ color: currentTheme.accent }} />
                <span style={{
                  fontSize: '0.875rem',
                  letterSpacing: '0.1em',
                  color: currentTheme.muted
                }}>
                  COORDINATES: 40.4° N, 0.4° W
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 300,
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
                marginBottom: '2rem',
                color: currentTheme.text
              }}>
                Page <span style={{ color: currentTheme.accent }}>404</span>
              </h1>

              {/* Typewriter text */}
              <p style={{
                fontSize: '1.5rem',
                fontWeight: 300,
                color: currentTheme.muted,
                minHeight: '2rem'
              }}>
                {typedText}
                <span style={{
                  opacity: showCursor ? 1 : 0,
                  color: currentTheme.accent,
                  fontWeight: 400
                }}>
                  |
                </span>
              </p>
            </div>

            {/* Research prompt */}
            <div style={{
              textAlign: 'center',
              marginBottom: '4rem',
              minHeight: '3rem'
            }}>
              <p style={{
                fontSize: '1.125rem',
                color: currentTheme.subtle,
                fontStyle: 'italic',
                opacity: 0.8,
                transition: 'opacity 0.5s ease'
              }}>
                Perhaps you were searching for: 
                <span style={{
                  display: 'block',
                  marginTop: '0.5rem',
                  color: currentTheme.text,
                  fontStyle: 'normal'
                }}>
                  &ldquo;{researchPrompts[currentSuggestion]}&rdquo;
                </span>
              </p>
            </div>

            {/* Domain Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '4rem'
            }}>
              {domains.map((domain) => (
                <Link
                  key={domain.id}
                  href={domain.href}
                  onMouseEnter={() => setHoveredCard(domain.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    display: 'block',
                    padding: '2rem 1.5rem',
                    background: hoveredCard === domain.id ? currentTheme.elevated : 'transparent',
                    border: `1px solid ${hoveredCard === domain.id ? currentTheme.accent : currentTheme.border}`,
                    borderRadius: '12px',
                    textDecoration: 'none',
                    color: currentTheme.text,
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: hoveredCard === domain.id ? 'translateY(-4px)' : 'translateY(0)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: hoveredCard === domain.id 
                      ? (isDarkMode ? '0 8px 24px rgba(0, 0, 0, 0.3)' : '0 8px 24px rgba(10, 37, 64, 0.08)')
                      : 'none'
                  }}
                >
                  {/* Icon */}
                  <domain.icon 
                    size={24} 
                    style={{ 
                      color: currentTheme.accent,
                      marginBottom: '1rem',
                      opacity: hoveredCard === domain.id ? 1 : 0.8,
                      transition: 'opacity 0.25s ease'
                    }} 
                  />
                  
                  {/* Content */}
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                    color: currentTheme.text
                  }}>
                    {domain.title}
                  </h3>
                  
                  <p style={{
                    fontSize: '0.813rem',
                    color: currentTheme.subtle,
                    marginBottom: '1rem',
                    lineHeight: 1.5
                  }}>
                    {domain.description}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      color: currentTheme.faint
                    }}>
                      {domain.stat}
                    </span>
                    
                    <ArrowRight 
                      size={14} 
                      style={{
                        color: currentTheme.accent,
                        opacity: hoveredCard === domain.id ? 1 : 0,
                        transform: hoveredCard === domain.id ? 'translateX(0)' : 'translateX(-4px)',
                        transition: 'all 0.25s ease'
                      }}
                    />
                  </div>

                  {/* Decorative element */}
                  {hoveredCard === domain.id && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '60px',
                      height: '60px',
                      background: currentTheme.accent,
                      opacity: 0.1,
                      borderRadius: '50%',
                      transform: 'translate(20px, -20px)'
                    }} />
                  )}
                </Link>
              ))}
            </div>

            {/* Search bar */}
            <div style={{
              maxWidth: '32rem',
              margin: '0 auto',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '0.813rem',
                color: currentTheme.subtle,
                marginBottom: '1rem'
              }}>
                Or formulate your own inquiry
              </p>
              
              <Link href="/essays/">
                <button
                  style={{
                    padding: '0.875rem 2rem',
                    background: 'transparent',
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '8px',
                    color: currentTheme.text,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: 500
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = currentTheme.accent;
                    e.currentTarget.style.color = currentTheme.accent;
                    e.currentTarget.style.background = currentTheme.accentMuted;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = currentTheme.border;
                    e.currentTarget.style.color = currentTheme.text;
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Begin Search
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </main>

        {/* Footer Quote */}
        <footer style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          borderTop: `1px solid ${currentTheme.border}`
        }}>
          <blockquote style={{
            maxWidth: '36rem',
            margin: '0 auto'
          }}>
            <p style={{
              fontSize: '0.875rem',
              color: currentTheme.subtle,
              fontStyle: 'italic',
              marginBottom: '0.5rem'
            }}>
              &ldquo;In research the horizon recedes as we advance... And research is always incomplete.&rdquo;
            </p>
            <cite style={{
              fontSize: '0.813rem',
              color: currentTheme.faint,
              fontStyle: 'normal'
            }}>
              — Mark Pattison
            </cite>
          </blockquote>
        </footer>
      </div>
    </div>
  );
};

export default NotFoundPage;
