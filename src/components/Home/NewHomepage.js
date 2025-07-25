"use client"

import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, ArrowRight, ChevronRight, Search,
  FileText, Brain, Sparkles, Quote,
  CheckCircle, Clock, Zap, Globe,
  BarChart, Edit3, BookMarked, Lightbulb,
  PenTool, Target, Layers, Award,
  Menu, X, TrendingUp, Shield
} from 'lucide-react';

const NewHomepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const searchRef = useRef(null);

  const currentTheme = {
    bg: '#0a0a0f',
    elevated: '#16161f',
    text: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.7)',
    subtle: 'rgba(255, 255, 255, 0.5)',
    faint: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.08)',
    divider: 'rgba(255, 255, 255, 0.05)',
    accent: '#8b5cf6'
  };

  // Enhanced responsive breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;
  const isSmallMobile = windowWidth < 480;
  const isTinyMobile = windowWidth < 375; // iPhone SE and similar small devices

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Rotating questions for search placeholder
  const researchQuestions = [
    "How does AI impact academic integrity?",
    "What drives sustainable urban development?",
    "Can quantum computing solve climate models?",
    "How do social movements shape policy?",
    "What defines consciousness in neuroscience?"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuestion((prev) => (prev + 1) % researchQuestions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [researchQuestions.length]);

  // Key benefits with icons
  const keyBenefits = [
    {
      icon: TrendingUp,
      stat: '87%',
      title: 'Clarity Improvement',
      description: 'in academic arguments'
    },
    {
      icon: Clock,
      stat: '2.5x',
      title: 'Faster Research',
      description: 'comprehensive literature review'
    },
    {
      icon: Award,
      stat: '73%',
      title: 'Time Saved',
      description: 'on first draft completion'
    },
    {
      icon: Shield,
      stat: '100%',
      title: 'Your Voice',
      description: 'authentic & preserved'
    }
  ];

  // Writing capabilities
  const capabilities = [
    {
      icon: FileText,
      title: 'Academic Essays',
      description: 'Structure arguments with precision and depth',
      features: ['Thesis development', 'Evidence integration', 'Citation management']
    },
    {
      icon: Brain,
      title: 'Research Papers',
      description: 'Comprehensive research from hypothesis to conclusion',
      features: ['Literature review', 'Methodology design', 'Data interpretation']
    },
    {
      icon: BookMarked,
      title: 'Dissertations',
      description: 'Long-form academic writing with consistent quality',
      features: ['Chapter planning', 'Argument coherence', 'Academic voice']
    },
    {
      icon: Lightbulb,
      title: 'Grant Proposals',
      description: 'Compelling proposals that secure funding',
      features: ['Impact articulation', 'Budget justification', 'Innovation emphasis']
    }
  ];

  const handleStartWriting = () => {
    if (searchQuery.trim()) {
      console.log('Starting with:', searchQuery);
      // Would navigate to writing interface
    }
  };

  return (
    <div style={{
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: 'var(--font-inter)'
    }}>
      {/* Hero Section - Enhanced Mobile Responsive */}
      <section style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isSmallMobile ? '8rem 1rem 3rem' : isMobile ? '9rem 1.5rem 4rem' : isTablet ? '9rem 2rem 4rem' : '9rem 2rem',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          width: '100%', 
          position: 'relative', 
          zIndex: 1 
        }}>
          {/* Hero Content */}
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '3rem' }}>

            {/* Main Headline - Enhanced Mobile Typography */}
            <h1 style={{
              fontSize: isTinyMobile ? '1.75rem' : isSmallMobile ? '2rem' : isMobile ? '2.5rem' : isTablet ? '3.5rem' : '5rem',
              fontWeight: 300,
              lineHeight: 1.3,
              letterSpacing: '0.01em',
              marginBottom: isMobile ? '1.5rem' : '2rem',
              padding: isTinyMobile ? '0 0.25rem' : isSmallMobile ? '0 0.5rem' : '0',
              fontFamily: 'var(--font-literata)'
            }}>
              <span style={{ fontWeight: 300 }}>Your Personal</span>
              <br />
              <span style={{ color: currentTheme.accent, fontWeight: 400 }}>AI Essay Writer</span>
            </h1>

            {/* Subheadline - Improved Mobile Readability */}
            <p style={{
              fontSize: isTinyMobile ? '0.938rem' : isSmallMobile ? '1rem' : isMobile ? '1.125rem' : isTablet ? '1.25rem' : '1.5rem',
              lineHeight: 1.6,
              color: currentTheme.muted,
              maxWidth: '720px',
              margin: '0 auto',
              padding: isTinyMobile ? '0 0.25rem' : isSmallMobile ? '0 0.5rem' : '0',
              fontFamily: 'var(--font-inter)'
            }}>
              Write A+ essays faster. Esy helps you research deeply, argue clearly, and cite with precision — APA, MLA, or any style.
            </p>
          </div>

          {/* Search Interface - Enhanced Mobile UX */}
          <div style={{
            maxWidth: isMobile ? '100%' : '720px',
            margin: '0 auto',
            marginBottom: isMobile ? '2.5rem' : '3rem',
            padding: isTinyMobile ? '0 0.25rem' : isSmallMobile ? '0 0.5rem' : '0'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'stretch',
              background: searchFocused ? currentTheme.elevated : 'transparent',
              border: `2px solid ${searchFocused ? currentTheme.accent : currentTheme.border}`,
              borderRadius: '12px',
              padding: isMobile ? '0.75rem' : '0.5rem',
              transition: 'all 0.2s',
              gap: isMobile ? '0.75rem' : '0'
            }}>
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center'
              }}>
                <Search size={isMobile ? 18 : 20} style={{ 
                  marginLeft: isMobile ? '0.75rem' : '1rem', 
                  color: searchFocused ? currentTheme.accent : currentTheme.subtle,
                  transition: 'color 0.2s'
                }} />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={researchQuestions[activeQuestion]}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  style={{
                    flex: 1,
                    padding: isMobile ? '1.25rem 0.75rem' : '1rem',
                    background: 'transparent',
                    border: 'none',
                    color: currentTheme.text,
                    fontSize: isSmallMobile ? '1rem' : isMobile ? '1rem' : '1.063rem',
                    outline: 'none',
                    width: '100%',
                    minHeight: isMobile ? '48px' : 'auto'
                  }}
                />
              </div>
              <button 
                onClick={handleStartWriting}
                style={{
                  padding: isSmallMobile ? '1rem' : isMobile ? '1rem 1.5rem' : '0.75rem 1.5rem',
                  background: searchFocused || searchQuery ? currentTheme.accent : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  color: searchFocused || searchQuery ? 'white' : currentTheme.subtle,
                  fontSize: isSmallMobile ? '1rem' : isMobile ? '1rem' : '0.938rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  minHeight: isMobile ? '48px' : 'auto',
                  minWidth: isMobile ? '120px' : 'auto'
                }}
              >
                <Sparkles size={isMobile ? 18 : 16} />
                Get started
              </button>
            </div>

            {/* Quick actions - Enhanced Mobile Touch Targets */}
            <div style={{
              display: 'flex',
              gap: isTinyMobile ? '0.5rem' : isMobile ? '0.75rem' : '0.5rem',
              justifyContent: 'center',
              marginTop: '1rem',
              flexWrap: 'wrap',
              padding: isTinyMobile ? '0 0.25rem' : isSmallMobile ? '0 0.5rem' : '0'
            }}>
              <span style={{
                fontSize: isTinyMobile ? '0.813rem' : isSmallMobile ? '0.875rem' : '0.75rem',
                color: currentTheme.faint
              }}>
                Try:
              </span>
              {['Research paper', 'Essay outline', 'Literature review'].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSearchQuery(prompt);
                    searchRef.current?.focus();
                  }}
                  style={{
                    fontSize: isTinyMobile ? '0.813rem' : isSmallMobile ? '0.875rem' : '0.75rem',
                    color: currentTheme.subtle,
                    background: 'transparent',
                    border: 'none',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    padding: isTinyMobile ? '0.375rem' : isMobile ? '0.5rem' : '0.25rem',
                    minHeight: isMobile ? '32px' : 'auto',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => e.target.style.color = currentTheme.accent}
                  onMouseLeave={(e) => e.target.style.color = currentTheme.subtle}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Indicators - Enhanced Mobile Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isTinyMobile ? '1fr' : isSmallMobile ? 'repeat(2, 1fr)' : isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isTinyMobile ? '1rem' : isSmallMobile ? '1.5rem' : isMobile ? '1rem' : '2rem',
            fontSize: isTinyMobile ? '0.813rem' : isSmallMobile ? '0.875rem' : '0.813rem',
            color: currentTheme.subtle,
            maxWidth: '800px',
            margin: '0 auto',
            padding: isTinyMobile ? '0 0.5rem' : isSmallMobile ? '0 1rem' : '0'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              justifyContent: isMobile ? 'center' : 'flex-start',
              textAlign: isSmallMobile ? 'center' : 'left'
            }}>
              <CheckCircle size={isMobile ? 18 : 16} style={{ color: currentTheme.accent }} />
              <span style={{ lineHeight: 1.3 }}>No credit card required</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              justifyContent: isMobile ? 'center' : 'flex-start',
              textAlign: isSmallMobile ? 'center' : 'left'
            }}>
              <Zap size={isMobile ? 18 : 16} />
              <span style={{ lineHeight: 1.3 }}>Start in seconds</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              justifyContent: isMobile ? 'center' : 'flex-start',
              textAlign: isSmallMobile ? 'center' : 'left'
            }}>
              <Globe size={isMobile ? 18 : 16} />
              <span style={{ lineHeight: 1.3 }}>4 AI models included</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              justifyContent: isMobile ? 'center' : 'flex-start',
              textAlign: isSmallMobile ? 'center' : 'left'
            }}>
              <Shield size={isMobile ? 18 : 16} />
              <span style={{ lineHeight: 1.3 }}>Your data stays private</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Enhanced Mobile Grid */}
      <section id="benefits" style={{ 
        padding: isSmallMobile ? '3rem 1rem' : isMobile ? '4rem 1.5rem' : isTablet ? '6rem 2rem' : '8rem 2rem',
        background: currentTheme.elevated
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '5rem' }}>
            <h2 style={{
              fontSize: isTinyMobile ? '1.5rem' : isSmallMobile ? '1.75rem' : isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
              padding: isTinyMobile ? '0 0.25rem' : isSmallMobile ? '0 0.5rem' : '0',
              fontFamily: 'var(--font-literata)'
            }}>
              Proven results, immediate impact
            </h2>
            <p style={{
              fontSize: isTinyMobile ? '0.875rem' : isSmallMobile ? '0.938rem' : isMobile ? '1rem' : '1.125rem',
              color: currentTheme.muted,
              maxWidth: '600px',
              margin: '0 auto',
              padding: isTinyMobile ? '0 0.25rem' : isSmallMobile ? '0 0.5rem' : '0',
              fontFamily: 'var(--font-inter)'
            }}>
              Join researchers experiencing dramatic improvements in their academic writing
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isTinyMobile ? '1fr' : isSmallMobile ? '1fr' : isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
            gap: isTinyMobile ? '1rem' : isSmallMobile ? '1.5rem' : isMobile ? '1.5rem' : '2.5rem'
          }}>
            {keyBenefits.map((benefit, index) => (
              <div 
                key={index}
                style={{
                  textAlign: 'center',
                  padding: isSmallMobile ? '1.25rem' : isMobile ? '1.5rem' : '2rem',
                  background: currentTheme.bg,
                  borderRadius: '12px',
                  border: `1px solid ${currentTheme.border}`,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = currentTheme.accent;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = currentTheme.border;
                  }
                }}
              >
                <benefit.icon 
                  size={isSmallMobile ? 20 : isMobile ? 24 : 32} 
                  style={{ 
                    color: currentTheme.accent, 
                    marginBottom: isMobile ? '0.75rem' : '1rem' 
                  }} 
                />
                <div style={{
                  fontSize: isSmallMobile ? '2rem' : isMobile ? '2.5rem' : '3rem',
                  fontWeight: 300,
                  color: currentTheme.accent,
                  marginBottom: '0.5rem'
                }}>
                  {benefit.stat}
                </div>
                <h3 style={{
                  fontSize: isSmallMobile ? '0.938rem' : isMobile ? '1rem' : '1.125rem',
                  fontWeight: 500,
                  marginBottom: '0.25rem'
                }}>
                  {benefit.title}
                </h3>
                <p style={{
                  fontSize: isSmallMobile ? '0.75rem' : '0.813rem',
                  color: currentTheme.subtle,
                  lineHeight: 1.4
                }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced Mobile Layout */}
      <section id="features" style={{ 
        padding: isSmallMobile ? '3rem 1rem' : isMobile ? '4rem 1.5rem' : isTablet ? '6rem 2rem' : '8rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '5rem' }}>
            <h2 style={{
              fontSize: isTinyMobile ? '1.5rem' : isSmallMobile ? '1.75rem' : isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
              padding: isTinyMobile ? '0 0.25rem' : isSmallMobile ? '0 0.5rem' : '0',
              fontFamily: 'var(--font-literata)'
            }}>
              Everything you need to excel
            </h2>
            <p style={{
              fontSize: isTinyMobile ? '0.875rem' : isSmallMobile ? '0.938rem' : isMobile ? '1rem' : '1.125rem',
              color: currentTheme.muted,
              maxWidth: '600px',
              margin: '0 auto',
              padding: isTinyMobile ? '0 0.25rem' : isSmallMobile ? '0 0.5rem' : '0',
              fontFamily: 'var(--font-inter)'
            }}>
              Powerful features designed for academic success
            </p>
          </div>

          {/* Feature highlights - Enhanced Mobile Layout */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isTinyMobile ? '1fr' : isSmallMobile ? '1fr' : isMobile ? '1fr' : 'repeat(2, 1fr)', 
            gap: isTinyMobile ? '1rem' : isSmallMobile ? '1.5rem' : isMobile ? '2rem' : '3rem',
            marginBottom: '4rem'
          }}>
            {[
              {
                icon: Brain,
                title: 'Multiple AI Models',
                description: 'Choose from GPT-4, Claude, Gemini, or Grok. Each model brings unique strengths—switch instantly based on your needs.',
                highlight: '4 leading AI models'
              },
              {
                icon: Target,
                title: 'Academic Voice Preservation',
                description: 'AI enhances your ideas without replacing your unique perspective. Maintain complete authorship while elevating arguments.',
                highlight: '100% your authentic voice'
              },
              {
                icon: Zap,
                title: 'Instant Research Integration',
                description: 'Find, evaluate, and cite sources seamlessly. Our AI understands academic conventions across disciplines.',
                highlight: '2.5x faster research'
              },
              {
                icon: Shield,
                title: 'Privacy First',
                description: 'Your work remains yours. No training on your data, encrypted storage, and complete control over your content.',
                highlight: 'Complete data ownership'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isSmallMobile ? '1rem' : isMobile ? '1.5rem' : '1.5rem',
                  padding: isSmallMobile ? '1.25rem' : isMobile ? '1.5rem' : '2rem',
                  background: currentTheme.elevated,
                  borderRadius: '12px',
                  border: `1px solid ${currentTheme.border}`,
                  transition: 'all 0.2s',
                  alignItems: isMobile ? 'center' : 'flex-start',
                  textAlign: isMobile ? 'center' : 'left'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateX(8px)';
                    e.currentTarget.style.borderColor = currentTheme.accent;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderColor = currentTheme.border;
                  }
                }}
              >
                <div style={{
                  width: isSmallMobile ? '40px' : isMobile ? '48px' : '56px',
                  height: isSmallMobile ? '40px' : isMobile ? '48px' : '56px',
                  background: currentTheme.accent + '20',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <feature.icon size={isSmallMobile ? 20 : isMobile ? 24 : 24} style={{ color: currentTheme.accent }} />
                </div>
                
                <div>
                  <h3 style={{
                    fontSize: isSmallMobile ? '1rem' : isMobile ? '1.125rem' : '1.25rem',
                    fontWeight: 500,
                    marginBottom: '0.75rem'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: isSmallMobile ? '0.813rem' : isMobile ? '0.875rem' : '0.938rem',
                    lineHeight: 1.6,
                    color: currentTheme.muted,
                    marginBottom: '0.75rem'
                  }}>
                    {feature.description}
                  </p>
                  <div style={{
                    fontSize: isSmallMobile ? '0.75rem' : '0.813rem',
                    color: currentTheme.accent,
                    fontWeight: 500
                  }}>
                    {feature.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section - Enhanced Mobile Layout */}
      <section id="capabilities" style={{ 
        padding: isSmallMobile ? '3rem 1rem' : isMobile ? '4rem 1.5rem' : isTablet ? '6rem 2rem' : '8rem 2rem',
        background: currentTheme.elevated
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '5rem' }}>
            <h2 style={{
              fontSize: isTinyMobile ? '1.5rem' : isSmallMobile ? '1.75rem' : isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
              padding: isTinyMobile ? '0 0.25rem' : isSmallMobile ? '0 0.5rem' : '0',
              fontFamily: 'var(--font-literata)'
            }}>
              Built for every academic challenge
            </h2>
            <p style={{
              fontSize: isTinyMobile ? '0.875rem' : isSmallMobile ? '0.938rem' : isMobile ? '1rem' : '1.125rem',
              color: currentTheme.muted,
              maxWidth: '600px',
              margin: '0 auto',
              padding: isTinyMobile ? '0 0.25rem' : isSmallMobile ? '0 0.5rem' : '0',
              fontFamily: 'var(--font-inter)'
            }}>
              From undergraduate essays to doctoral dissertations
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isTinyMobile ? '1fr' : isSmallMobile ? '1fr' : isMobile ? '1fr' : 'repeat(2, 1fr)', 
            gap: isTinyMobile ? '1rem' : isSmallMobile ? '1.5rem' : isMobile ? '1.5rem' : '2rem'
          }}>
            {capabilities.map((capability, index) => (
              <div 
                key={index}
                style={{
                  padding: isSmallMobile ? '1.5rem' : isMobile ? '2rem' : '3rem',
                  background: currentTheme.bg,
                  borderRadius: '12px',
                  border: `1px solid ${currentTheme.border}`,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.borderColor = currentTheme.accent;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.borderColor = currentTheme.border;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <capability.icon 
                  size={isSmallMobile ? 24 : isMobile ? 28 : 32} 
                  style={{ 
                    color: currentTheme.accent,
                    marginBottom: isMobile ? '1rem' : '1.5rem'
                  }} 
                />
                <h3 style={{
                  fontSize: isSmallMobile ? '1.125rem' : isMobile ? '1.25rem' : '1.5rem',
                  fontWeight: 400,
                  marginBottom: '0.75rem'
                }}>
                  {capability.title}
                </h3>
                <p style={{
                  fontSize: isSmallMobile ? '0.813rem' : isMobile ? '0.875rem' : '0.938rem',
                  lineHeight: 1.6,
                  color: currentTheme.muted,
                  marginBottom: '1.5rem'
                }}>
                  {capability.description}
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {capability.features.map((feature, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      fontSize: isSmallMobile ? '0.75rem' : '0.813rem',
                      color: currentTheme.subtle
                    }}>
                      <CheckCircle size={isSmallMobile ? 12 : 14} style={{ color: currentTheme.accent }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial - Enhanced Mobile Layout */}
      <section style={{ 
        padding: isSmallMobile ? '3rem 1rem' : isMobile ? '4rem 1.5rem' : isTablet ? '6rem 2rem' : '8rem 2rem'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            padding: isSmallMobile ? '1.5rem' : isMobile ? '2rem' : '4rem',
            background: currentTheme.elevated,
            borderRadius: '16px',
            border: `1px solid ${currentTheme.border}`,
            textAlign: 'center'
          }}>
            <Quote size={isSmallMobile ? 24 : isMobile ? 32 : 40} style={{ 
              color: currentTheme.accent, 
              marginBottom: isMobile ? '1.5rem' : '2rem',
              opacity: 0.5
            }} />
            
            <blockquote style={{
              fontSize: isSmallMobile ? '1rem' : isMobile ? '1.125rem' : isTablet ? '1.25rem' : '1.5rem',
              lineHeight: 1.8,
              color: currentTheme.text,
              marginBottom: isMobile ? '1.5rem' : '2rem',
              fontWeight: 300,
              padding: isSmallMobile ? '0 0.5rem' : '0'
            }}>
              &quot;Esy transformed how I approach academic writing. It&apos;s not about shortcuts—it&apos;s about 
              <span style={{ color: currentTheme.accent, fontWeight: 400 }}> thinking more clearly</span> and 
              <span style={{ color: currentTheme.accent, fontWeight: 400 }}> arguing more precisely</span>. 
              My productivity has doubled while my writing quality has never been better.&quot;
            </blockquote>
            
            <cite style={{
              fontSize: isSmallMobile ? '0.813rem' : isMobile ? '0.875rem' : '1rem',
              color: currentTheme.muted,
              fontStyle: 'normal'
            }}>
              <strong style={{ color: currentTheme.text }}>Han Thi Htet</strong>
              <br />
              <span style={{ fontSize: isSmallMobile ? '0.75rem' : isMobile ? '0.813rem' : '0.875rem' }}>
                Professor of Prompt Engineering, Esy University
              </span>
            </cite>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced Mobile Layout */}
      <section style={{ 
        padding: isSmallMobile ? '3rem 1rem' : isMobile ? '4rem 1.5rem' : isTablet ? '6rem 2rem' : '8rem 2rem',
        background: currentTheme.elevated,
        borderTop: `1px solid ${currentTheme.divider}`
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: isTinyMobile ? '1.5rem' : isSmallMobile ? '1.75rem' : isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            marginBottom: isMobile ? '1.5rem' : '2rem',
            padding: isTinyMobile ? '0 0.25rem' : isSmallMobile ? '0 0.5rem' : '0',
            fontFamily: 'var(--font-literata)'
          }}>
            Ready to elevate your writing?
          </h2>
          
          <p style={{
            fontSize: isTinyMobile ? '0.875rem' : isSmallMobile ? '0.938rem' : isMobile ? '1rem' : '1.25rem',
            lineHeight: 1.8,
            color: currentTheme.muted,
            marginBottom: isMobile ? '2rem' : '3rem',
            padding: isTinyMobile ? '0 0.25rem' : isSmallMobile ? '0 0.5rem' : '0',
            fontFamily: 'var(--font-inter)'
          }}>
            Start writing with AI that understands academic excellence. 
            No credit card, no commitment—just better writing from day one.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '1rem' : '1rem',
            justifyContent: 'center',
            marginBottom: isMobile ? '1.5rem' : '2rem'
          }}>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                padding: isTinyMobile ? '0.875rem 1.25rem' : isSmallMobile ? '1rem 1.5rem' : isMobile ? '1rem 2rem' : '1rem 3rem',
                background: currentTheme.accent,
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: isTinyMobile ? '0.938rem' : isSmallMobile ? '1rem' : isMobile ? '1rem' : '1.063rem',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
                width: isMobile ? '100%' : 'auto',
                minHeight: isMobile ? '48px' : 'auto'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 10px 30px ${currentTheme.accent}40`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <Sparkles size={isMobile ? 18 : 18} />
              Start Writing Free
            </button>

            <button 
              style={{
                padding: isTinyMobile ? '0.875rem 1.25rem' : isSmallMobile ? '1rem 1.5rem' : isMobile ? '1rem 2rem' : '1rem 2rem',
                background: 'transparent',
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                color: currentTheme.text,
                fontSize: isTinyMobile ? '0.938rem' : isSmallMobile ? '1rem' : isMobile ? '1rem' : '1.063rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                width: isMobile ? '100%' : 'auto',
                minHeight: isMobile ? '48px' : 'auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = currentTheme.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = currentTheme.border;
              }}
            >
              Watch Demo
            </button>
          </div>

          <p style={{
            fontSize: isTinyMobile ? '0.75rem' : isSmallMobile ? '0.813rem' : '0.875rem',
            color: currentTheme.subtle
          }}>
            Trusted by researchers at leading universities worldwide
          </p>
        </div>
      </section>
    </div>
  );
};

export default NewHomepage;