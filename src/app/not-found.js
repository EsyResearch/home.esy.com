"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, ArrowRight, Compass, MapPin,
  Book, Lightbulb, Archive, Telescope
} from 'lucide-react';
import Link from 'next/link';

const NotFoundPage = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const canvasRef = useRef(null);

  const currentTheme = {
    bg: '#0a0a0f',
    elevated: '#16161f',
    text: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.7)',
    subtle: 'rgba(255, 255, 255, 0.5)',
    faint: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.05)',
    accent: '#8b5cf6'
  };

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

  // Constellation background
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
        ctx.fillStyle = `rgba(139, 92, 246, ${star.opacity})`;
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
  }, []);

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
      id: 'essays',
      icon: Book,
      title: 'Essay Collection',
      description: 'Explore published research',
      stat: '12,847 essays',
      href: '/essays'
    },
    {
      id: 'research',
      icon: Telescope,
      title: 'Research Tools',
      description: 'Discover methodologies',
      stat: '342 methods',
      href: '/research'
    },
    {
      id: 'glossary',
      icon: Archive,
      title: 'Knowledge Base',
      description: 'Define your terms',
      stat: '1,856 concepts',
      href: '/glossary'
    },
    {
      id: 'write',
      icon: Lightbulb,
      title: 'Begin Writing',
      description: 'Start your inquiry',
      stat: 'AI-assisted',
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
      overflow: 'hidden'
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
          opacity: 0.4,
          pointerEvents: 'none'
        }}
      />

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
                fontSize: '3.5rem',
                fontWeight: 300,
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
                marginBottom: '2rem'
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
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: currentTheme.text,
                    transition: 'all 0.2s',
                    transform: hoveredCard === domain.id ? 'translateY(-4px)' : 'translateY(0)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Icon */}
                  <domain.icon 
                    size={24} 
                    style={{ 
                      color: currentTheme.accent,
                      marginBottom: '1rem',
                      opacity: hoveredCard === domain.id ? 1 : 0.8
                    }} 
                  />
                  
                  {/* Content */}
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    marginBottom: '0.5rem'
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
                        transition: 'all 0.2s'
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
                      opacity: 0.05,
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
                    border: `1px solid ${currentTheme.subtle}`,
                    borderRadius: '6px',
                    color: currentTheme.text,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = currentTheme.accent;
                    e.currentTarget.style.color = currentTheme.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = currentTheme.subtle;
                    e.currentTarget.style.color = currentTheme.text;
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