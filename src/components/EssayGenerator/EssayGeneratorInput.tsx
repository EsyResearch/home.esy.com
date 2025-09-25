/**
 * EssayGeneratorInput Component
 * © 2025 Esy.com - All Rights Reserved
 * 
 * World-class essay generation interface designed for maximum conversion
 * Combines award-winning aesthetics with proven UX patterns from top SaaS platforms
 * 
 * Design Philosophy:
 * - Immersive, eye-catching visuals that demand attention
 * - Sophisticated animations and micro-interactions
 * - Conversion-optimized with clear value propositions
 * - Mobile-first responsive design
 */

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Zap, 
  BookOpen, 
  GraduationCap,
  FileText,
  Brain,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Award
} from 'lucide-react';

interface EssayTopic {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  icon: React.ElementType;
}

interface EssayGeneratorInputProps {
  onGenerate?: (topic: string, options?: any) => void;
  isGenerating?: boolean;
  style?: React.CSSProperties;
}

const EssayGeneratorInput: React.FC<EssayGeneratorInputProps> = ({
  onGenerate,
  isGenerating = false,
  style = {}
}) => {
  const [topic, setTopic] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [animatedText, setAnimatedText] = useState('');
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive detection
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isSmallMobile = windowWidth < 480;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Rotating placeholder suggestions - carefully curated for conversion
  const placeholders = [
    "The impact of artificial intelligence on modern education...",
    "Climate change and sustainable urban development strategies...",
    "The psychology behind social media addiction in teenagers...",
    "Quantum computing's role in solving complex global problems...",
    "The ethics of gene editing in human enhancement...",
    "How blockchain technology is revolutionizing finance...",
    "The future of work in an automated economy...",
    "Mental health awareness in academic institutions..."
  ];

  // Trending topics with smart categorization
  const trendingTopics: EssayTopic[] = [
    { id: '1', title: 'AI Ethics & Society', category: 'Technology', difficulty: 'Advanced', icon: Brain },
    { id: '2', title: 'Climate Action Plans', category: 'Environment', difficulty: 'Medium', icon: TrendingUp },
    { id: '3', title: 'Digital Privacy Rights', category: 'Law & Policy', difficulty: 'Medium', icon: FileText },
    { id: '4', title: 'Mental Health Crisis', category: 'Psychology', difficulty: 'Easy', icon: Award }
  ];

  // Animate placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Glow effect on focus
  useEffect(() => {
    if (isFocused) {
      const glowAnimation = setInterval(() => {
        setGlowIntensity(prev => Math.sin(Date.now() / 1000) * 0.5 + 0.5);
      }, 50);
      return () => clearInterval(glowAnimation);
    } else {
      setGlowIntensity(0);
    }
  }, [isFocused]);

  // Auto-resize textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTopic(value);
    
    // Auto-resize
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 200)}px`;
    }

    // Show suggestions when typing
    setShowSuggestions(value.length > 2);
  };

  const handleGenerate = () => {
    if (topic.trim() && onGenerate) {
      onGenerate(topic.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow new line with Shift+Enter
        return;
      }
      e.preventDefault();
      if (!isGenerating && topic.trim()) {
        handleGenerate();
      }
    }
  };

  const styles = {
    container: {
      position: 'relative' as const,
      width: '100%',
      maxWidth: isMobile ? '100%' : '840px',
      margin: '0 auto',
      ...style
    },
    mainWrapper: {
      position: 'relative' as const,
      background: isFocused
        ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)'
        : 'linear-gradient(135deg, rgba(22, 22, 31, 0.6) 0%, rgba(22, 22, 31, 0.4) 100%)',
      border: `2px solid ${isFocused ? 'rgba(139, 92, 246, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
      borderRadius: isMobile ? '20px' : '24px',
      padding: isMobile ? '1.5rem' : '2rem',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(20px)',
      boxShadow: isFocused
        ? `0 0 0 4px rgba(139, 92, 246, 0.1),
           0 20px 40px rgba(139, 92, 246, 0.15),
           inset 0 1px 0 rgba(255, 255, 255, 0.1)`
        : `0 10px 30px rgba(0, 0, 0, 0.2),
           inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
      overflow: 'hidden'
    },
    glowEffect: {
      position: 'absolute' as const,
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: `radial-gradient(circle at center, rgba(139, 92, 246, ${glowIntensity * 0.15}) 0%, transparent 70%)`,
      pointerEvents: 'none' as const,
      transition: 'opacity 0.3s ease'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '0.75rem' : '1rem',
      marginBottom: isMobile ? '1rem' : '1.25rem'
    },
    iconWrapper: {
      width: isMobile ? '36px' : '44px',
      height: isMobile ? '36px' : '44px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 16px rgba(139, 92, 246, 0.3)',
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    },
    titleSection: {
      flex: 1
    },
    title: {
      fontSize: isMobile ? '1rem' : '1.125rem',
      fontWeight: '600',
      color: '#ffffff',
      margin: 0,
      letterSpacing: '-0.01em'
    },
    subtitle: {
      fontSize: isMobile ? '0.75rem' : '0.8125rem',
      color: 'rgba(255, 255, 255, 0.6)',
      margin: 0
    },
    inputWrapper: {
      position: 'relative' as const,
      marginBottom: isMobile ? '1rem' : '1.25rem'
    },
    textarea: {
      width: '100%',
      minHeight: isMobile ? '60px' : '72px',
      maxHeight: '200px',
      padding: isMobile ? '0.875rem' : '1rem',
      background: isFocused 
        ? 'rgba(10, 10, 15, 0.6)'
        : 'rgba(10, 10, 15, 0.4)',
      border: `1px solid ${isFocused ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.05)'}`,
      borderRadius: '12px',
      color: '#ffffff',
      fontSize: isMobile ? '0.9375rem' : '1.0625rem',
      fontFamily: 'var(--font-inter)',
      fontWeight: '400',
      lineHeight: 1.6,
      outline: 'none',
      resize: 'none' as const,
      transition: 'all 0.3s ease',
      caretColor: '#8b5cf6'
    },
    actionBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: isMobile ? '0.75rem' : '1rem'
    },
    quickActions: {
      display: 'flex',
      gap: isMobile ? '0.5rem' : '0.75rem',
      alignItems: 'center'
    },
    quickChip: {
      padding: isMobile ? '0.375rem 0.75rem' : '0.5rem 1rem',
      background: 'rgba(139, 92, 246, 0.08)',
      border: '1px solid rgba(139, 92, 246, 0.2)',
      borderRadius: '20px',
      color: '#8b5cf6',
      fontSize: isMobile ? '0.75rem' : '0.8125rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.375rem'
    },
    generateButton: {
      padding: isMobile ? '0.75rem 1.5rem' : '0.875rem 2rem',
      background: topic.trim() && !isGenerating
        ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
        : 'linear-gradient(135deg, rgba(139, 92, 246, 0.5) 0%, rgba(124, 58, 237, 0.5) 100%)',
      border: 'none',
      borderRadius: '12px',
      color: '#ffffff',
      fontSize: isMobile ? '0.875rem' : '0.9375rem',
      fontWeight: '600',
      cursor: topic.trim() && !isGenerating ? 'pointer' : 'default',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: topic.trim() && !isGenerating
        ? '0 8px 20px rgba(139, 92, 246, 0.4)'
        : 'none',
      transform: 'scale(1)',
      opacity: topic.trim() && !isGenerating ? 1 : 0.6
    },
    trendingSection: {
      marginTop: isMobile ? '1.5rem' : '2rem',
      paddingTop: isMobile ? '1.5rem' : '2rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
    },
    trendingTitle: {
      fontSize: isMobile ? '0.75rem' : '0.8125rem',
      color: 'rgba(255, 255, 255, 0.5)',
      fontWeight: '600',
      marginBottom: isMobile ? '0.75rem' : '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    trendingGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: isMobile ? '0.5rem' : '0.75rem'
    },
    trendingItem: {
      padding: isMobile ? '0.75rem' : '0.875rem',
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    trendingIcon: {
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      background: 'rgba(139, 92, 246, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    trendingContent: {
      flex: 1,
      minWidth: 0
    },
    trendingItemTitle: {
      fontSize: isMobile ? '0.8125rem' : '0.875rem',
      color: '#ffffff',
      fontWeight: '500',
      marginBottom: '0.125rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap' as const
    },
    trendingMeta: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      fontSize: '0.6875rem'
    },
    difficultyBadge: {
      padding: '0.125rem 0.375rem',
      borderRadius: '6px',
      fontWeight: '600',
      fontSize: '0.625rem'
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' };
      case 'Medium': return { bg: 'rgba(251, 146, 60, 0.1)', color: '#fb923c' };
      case 'Advanced': return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      default: return { bg: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' };
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        textarea::placeholder {
          color: rgba(255, 255, 255, 0.3);
          font-weight: 300;
        }
        textarea::-webkit-scrollbar {
          width: 6px;
        }
        textarea::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        textarea::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 3px;
        }
        textarea::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }
      `}</style>
      
      <div ref={containerRef} style={styles.container}>
        <div style={styles.mainWrapper}>
          <div style={styles.glowEffect} />
          
          {/* Header Section */}
          <div style={styles.header}>
            <div style={styles.iconWrapper}>
              <Sparkles size={isMobile ? 20 : 24} color="#ffffff" strokeWidth={2} />
            </div>
            <div style={styles.titleSection}>
              <h3 style={styles.title}>Generate Your Essay</h3>
              <p style={styles.subtitle}>AI-powered • Research-backed • Your voice</p>
            </div>
          </div>

          {/* Input Area */}
          <div style={styles.inputWrapper}>
            <textarea
              ref={inputRef}
              value={topic}
              onChange={handleInput}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onKeyDown={handleKeyDown}
              placeholder={placeholders[currentPlaceholder]}
              style={styles.textarea}
              disabled={isGenerating}
            />
          </div>

          {/* Action Bar */}
          <div style={styles.actionBar}>
            <div style={styles.quickActions}>
              <div 
                style={styles.quickChip}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                }}
              >
                <Zap size={14} />
                <span>Quick Start</span>
              </div>
              {!isMobile && (
                <div 
                  style={styles.quickChip}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                  }}
                >
                  <GraduationCap size={14} />
                  <span>Academic</span>
                </div>
              )}
            </div>

            <button
              style={styles.generateButton}
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              onMouseEnter={(e) => {
                if (topic.trim() && !isGenerating) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(139, 92, 246, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = topic.trim() && !isGenerating
                  ? '0 8px 20px rgba(139, 92, 246, 0.4)'
                  : 'none';
              }}
            >
              {isGenerating ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid #ffffff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span>Generate Essay</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          {/* Trending Topics */}
          <div style={styles.trendingSection}>
            <div style={styles.trendingTitle}>
              <TrendingUp size={14} />
              <span>Trending Topics</span>
            </div>
            <div style={styles.trendingGrid}>
              {trendingTopics.map((item) => {
                const IconComponent = item.icon;
                const diffColors = getDifficultyColor(item.difficulty);
                return (
                  <div
                    key={item.id}
                    style={styles.trendingItem}
                    onClick={() => setTopic(item.title)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div style={styles.trendingIcon}>
                      <IconComponent size={16} color="#8b5cf6" />
                    </div>
                    <div style={styles.trendingContent}>
                      <div style={styles.trendingItemTitle}>{item.title}</div>
                      <div style={styles.trendingMeta}>
                        <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>{item.category}</span>
                        <span style={{
                          ...styles.difficultyBadge,
                          backgroundColor: diffColors.bg,
                          color: diffColors.color
                        }}>
                          {item.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: isMobile ? '1rem' : '2rem',
          marginTop: '1.5rem',
          fontSize: isMobile ? '0.75rem' : '0.8125rem',
          color: 'rgba(255, 255, 255, 0.5)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <CheckCircle size={14} color="#22c55e" />
            <span>100% Original</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <BookOpen size={14} color="#8b5cf6" />
            <span>Academic Standards</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Award size={14} color="#fbbf24" />
            <span>A+ Quality</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EssayGeneratorInput;
