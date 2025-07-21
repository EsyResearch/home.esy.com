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
import styles from './NewHomepage.module.css';

const NewHomepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Responsive breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

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
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Hero Section - Responsive */}
      <section style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'center',
        padding: isMobile ? '14rem 1rem 2rem' : isTablet ? '9rem 2rem 4rem' : '9rem 2rem',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          width: '100%', 
          position: 'relative', 
          zIndex: 1 
        }}>
          {/* Hero Content */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>


            {/* Main Headline */}
            <h1 style={{
              fontSize: isMobile ? '2rem' : isTablet ? '3.5rem' : '5rem',
              fontWeight: 300,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: isMobile ? '1.5rem' : '2rem'
            }}>
              Research Faster with AI.
              <br />
              <span style={{ color: currentTheme.accent }}>Write Essays That Impress.</span>
            </h1>

            {/* Subheadline */}
            <p style={{
              fontSize: isMobile ? '1rem' : isTablet ? '1.25rem' : '1.5rem',
              lineHeight: 1.6,
              color: currentTheme.muted,
              maxWidth: '720px',
              margin: '0 auto',
              padding: isMobile ? '0 0.5rem' : '0'
            }}>
              Harness AI to write A+ essays in half the time. Dive into sources, craft ironclad arguments, and cite flawlessly in APA, MLA, or any style.
            </p>
          </div>

          {/* Search Interface - Responsive */}
          <div style={{
            maxWidth: isMobile ? '100%' : '720px',
            margin: '0 auto',
            marginBottom: '3rem',
            padding: isMobile ? '0 1rem' : '0'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'stretch',
              background: searchFocused ? currentTheme.elevated : currentTheme.elevated,
              border: `2px solid ${searchFocused ? currentTheme.accent : currentTheme.border}`,
              borderRadius: isMobile ? '16px' : '12px',
              padding: isMobile ? '0.5rem' : '0.5rem',
              transition: 'all 0.2s',
              gap: isMobile ? '0.75rem' : '0',
              boxShadow: searchFocused ? '0 0 0 4px rgba(139, 92, 246, 0.1)' : 'none'
            }}>
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                background: isMobile ? currentTheme.bg : 'transparent',
                borderRadius: isMobile ? '12px' : '8px',
                padding: isMobile ? '0.25rem' : '0'
              }}>
                <Search size={isMobile ? 18 : 20} style={{ 
                  marginLeft: isMobile ? '0.75rem' : '1rem',
                  marginRight: isMobile ? '0.5rem' : '0',
                  color: searchFocused ? currentTheme.accent : currentTheme.subtle,
                  transition: 'color 0.2s',
                  flexShrink: 0
                }} />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isMobile ? 'Ask anything...' : researchQuestions[activeQuestion]}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  style={{
                    flex: 1,
                    padding: isMobile ? '0.875rem 0.75rem' : '1rem',
                    background: 'transparent',
                    border: 'none',
                    color: currentTheme.text,
                    fontSize: '16px', // Force 16px to prevent iOS zoom
                    outline: 'none',
                    width: '100%',
                    WebkitAppearance: 'none',
                    appearance: 'none',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                />
              </div>
              <button 
                onClick={handleStartWriting}
                style={{
                  padding: isMobile ? '1rem 1.5rem' : '0.75rem 1.5rem',
                  background: currentTheme.accent,
                  border: 'none',
                  borderRadius: isMobile ? '12px' : '8px',
                  color: 'white',
                  fontSize: '16px', // Force 16px to prevent iOS zoom
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  whiteSpace: 'nowrap',
                  WebkitTapHighlightColor: 'transparent',
                  minHeight: isMobile ? '48px' : 'auto',
                  width: isMobile ? '100%' : 'auto',
                  boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)'
                }}
              >
                <Sparkles size={isMobile ? 18 : 16} />
                Get started
              </button>
            </div>

            {/* Quick actions - Responsive */}
            <div style={{
              display: 'flex',
              gap: isMobile ? '0.75rem' : '0.5rem',
              justifyContent: 'center',
              marginTop: '1rem',
              flexWrap: 'wrap',
              padding: isMobile ? '0 1rem' : '0'
            }}>
              {!isMobile && (
                <span style={{
                  fontSize: '0.75rem',
                  color: currentTheme.faint
                }}>
                  Try:
                </span>
              )}
              {['Research paper', 'Essay outline', 'Literature review'].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSearchQuery(prompt);
                    searchRef.current?.focus();
                  }}
                  style={{
                    fontSize: isMobile ? '0.813rem' : '0.75rem',
                    color: currentTheme.subtle,
                    background: isMobile ? currentTheme.elevated : 'transparent',
                    border: isMobile ? `1px solid ${currentTheme.border}` : 'none',
                    borderRadius: isMobile ? '20px' : '0',
                    padding: isMobile ? '0.375rem 0.75rem' : '0',
                    textDecoration: isMobile ? 'none' : 'underline',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    minHeight: isMobile ? '32px' : 'auto',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.target.style.color = currentTheme.accent;
                    } else {
                      e.target.style.borderColor = currentTheme.accent;
                      e.target.style.background = currentTheme.accent + '10';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.target.style.color = currentTheme.subtle;
                    } else {
                      e.target.style.borderColor = currentTheme.border;
                      e.target.style.background = currentTheme.elevated;
                    }
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Indicators - Responsive Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? '1rem' : '2rem',
            fontSize: isMobile ? '0.75rem' : '0.813rem',
            color: currentTheme.subtle,
            maxWidth: '800px',
            margin: '0 auto',
            marginTop: isMobile ? '2rem' : '0'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              <CheckCircle size={16} style={{ color: currentTheme.accent }} />
              No credit card required
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              <Zap size={16} />
              Start in seconds
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              <Globe size={16} />
              4 AI models included
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              <Shield size={16} />
              Your data stays private
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Responsive Grid */}
      <section id="benefits" style={{ 
        padding: isMobile ? '4rem 1rem' : isTablet ? '6rem 2rem' : '8rem 2rem',
        background: currentTheme.elevated
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '5rem' }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem'
            }}>
              Proven results, immediate impact
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              color: currentTheme.muted,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Join researchers experiencing dramatic improvements in their academic writing
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
            gap: isMobile ? '2rem' : '2.5rem'
          }}>
            {keyBenefits.map((benefit, index) => (
              <div 
                key={index}
                style={{
                  textAlign: 'center',
                  padding: isMobile ? '1.5rem' : '2rem',
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
                  size={isMobile ? 24 : 32} 
                  style={{ 
                    color: currentTheme.accent, 
                    marginBottom: '1rem' 
                  }} 
                />
                <div style={{
                  fontSize: isMobile ? '2.5rem' : '3rem',
                  fontWeight: 300,
                  color: currentTheme.accent,
                  marginBottom: '0.5rem'
                }}>
                  {benefit.stat}
                </div>
                <h3 style={{
                  fontSize: isMobile ? '1rem' : '1.125rem',
                  fontWeight: 500,
                  marginBottom: '0.25rem'
                }}>
                  {benefit.title}
                </h3>
                <p style={{
                  fontSize: '0.813rem',
                  color: currentTheme.subtle
                }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Responsive */}
      <section id="features" style={{ 
        padding: isMobile ? '4rem 1rem' : isTablet ? '6rem 2rem' : '8rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '5rem' }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem'
            }}>
              Everything you need to excel
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              color: currentTheme.muted,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Powerful features designed for academic success
            </p>
          </div>

          {/* Feature highlights - Responsive layout */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
            gap: isMobile ? '2rem' : '3rem',
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
                  gap: '1.5rem',
                  padding: isMobile ? '1.5rem' : '2rem',
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
                  width: isMobile ? '48px' : '56px',
                  height: isMobile ? '48px' : '56px',
                  background: currentTheme.accent + '20',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <feature.icon size={24} style={{ color: currentTheme.accent }} />
                </div>
                
                <div>
                  <h3 style={{
                    fontSize: isMobile ? '1.125rem' : '1.25rem',
                    fontWeight: 500,
                    marginBottom: '0.75rem'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: isMobile ? '0.875rem' : '0.938rem',
                    lineHeight: 1.6,
                    color: currentTheme.muted,
                    marginBottom: '0.75rem'
                  }}>
                    {feature.description}
                  </p>
                  <div style={{
                    fontSize: '0.813rem',
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

      {/* Capabilities Section - Responsive */}
      <section id="capabilities" style={{ 
        padding: isMobile ? '4rem 1rem' : isTablet ? '6rem 2rem' : '8rem 2rem',
        background: currentTheme.elevated
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '5rem' }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem'
            }}>
              Built for every academic challenge
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              color: currentTheme.muted,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              From undergraduate essays to doctoral dissertations
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)', 
            gap: isMobile ? '1.5rem' : '2rem'
          }}>
            {capabilities.map((capability, index) => (
              <div 
                key={index}
                style={{
                  padding: isMobile ? '2rem' : '3rem',
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
                  size={32} 
                  style={{ 
                    color: currentTheme.accent,
                    marginBottom: '1.5rem'
                  }} 
                />
                <h3 style={{
                  fontSize: isMobile ? '1.25rem' : '1.5rem',
                  fontWeight: 400,
                  marginBottom: '0.75rem'
                }}>
                  {capability.title}
                </h3>
                <p style={{
                  fontSize: isMobile ? '0.875rem' : '0.938rem',
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
                      fontSize: '0.813rem',
                      color: currentTheme.subtle
                    }}>
                      <CheckCircle size={14} style={{ color: currentTheme.accent }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial - Responsive */}
      <section style={{ 
        padding: isMobile ? '4rem 1rem' : isTablet ? '6rem 2rem' : '8rem 2rem'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            padding: isMobile ? '2rem' : '4rem',
            background: currentTheme.elevated,
            borderRadius: '16px',
            border: `1px solid ${currentTheme.border}`,
            textAlign: 'center'
          }}>
            <Quote size={isMobile ? 32 : 40} style={{ 
              color: currentTheme.accent, 
              marginBottom: '2rem',
              opacity: 0.5
            }} />
            
            <blockquote style={{
              fontSize: isMobile ? '1.125rem' : isTablet ? '1.25rem' : '1.5rem',
              lineHeight: 1.8,
              color: currentTheme.text,
              marginBottom: '2rem',
              fontWeight: 300
            }}>
              &quot;Esy transformed how I approach academic writing. It&apos;s not about shortcuts—it&apos;s about 
              <span style={{ color: currentTheme.accent, fontWeight: 400 }}> thinking more clearly</span> and 
              <span style={{ color: currentTheme.accent, fontWeight: 400 }}> arguing more precisely</span>. 
              My productivity has doubled while my writing quality has never been better.&quot;
            </blockquote>
            
            <cite style={{
              fontSize: isMobile ? '0.875rem' : '1rem',
              color: currentTheme.muted,
              fontStyle: 'normal'
            }}>
              <strong style={{ color: currentTheme.text }}>Han Thi Htet</strong>
              <br />
              <span style={{ fontSize: isMobile ? '0.813rem' : '0.875rem' }}>
                Professor of Prompt Engineering, Esy University
              </span>
            </cite>
          </div>
        </div>
      </section>

      {/* CTA Section - Responsive */}
      <section style={{ 
        padding: isMobile ? '4rem 1rem' : isTablet ? '6rem 2rem' : '8rem 2rem',
        background: currentTheme.elevated,
        borderTop: `1px solid ${currentTheme.divider}`
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3.5rem',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            marginBottom: '2rem'
          }}>
            Ready to elevate your writing?
          </h2>
          
          <p style={{
            fontSize: isMobile ? '1rem' : '1.25rem',
            lineHeight: 1.8,
            color: currentTheme.muted,
            marginBottom: '3rem'
          }}>
            Start writing with AI that understands academic excellence. 
            No credit card, no commitment—just better writing from day one.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                padding: isMobile ? '1rem 2rem' : '1rem 3rem',
                background: currentTheme.accent,
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: isMobile ? '1rem' : '1.063rem',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
                width: isMobile ? '100%' : 'auto'
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
              <Sparkles size={18} />
              Start Writing Free
            </button>

            <button 
              style={{
                padding: isMobile ? '1rem 2rem' : '1rem 2rem',
                background: 'transparent',
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                color: currentTheme.text,
                fontSize: isMobile ? '1rem' : '1.063rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                width: isMobile ? '100%' : 'auto'
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
            fontSize: '0.875rem',
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