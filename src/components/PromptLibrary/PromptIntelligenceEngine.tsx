"use client";

import React, { useState, useEffect, useRef } from 'react';
import { elevatedDarkTheme } from '@/lib/theme';
import { 
  Brain,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Layers,
  Target,
  ChevronRight,
  Check,
  Zap,
  FileText,
  GraduationCap,
  BarChart3
} from 'lucide-react';

interface TransformationExample {
  before: string;
  after: string;
  improvement: string;
}

const PromptIntelligenceEngine: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedVariable, setSelectedVariable] = useState('');
  const [liveResult, setLiveResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const currentRef = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Real prompt examples from the library
  const intelligenceExamples = [
    {
      id: 'research',
      category: 'Academic Research',
      title: 'Literature Review Framework',
      prompt: 'Conduct a systematic literature review on [TOPIC] following academic standards...',
      variables: ['TOPIC', 'DISCIPLINE', 'TIME_RANGE'],
      icon: BookOpen,
      color: elevatedDarkTheme.accent,
      transformation: {
        before: '"Write about climate change"',
        after: 'Systematic review of 50+ peer-reviewed sources with thematic analysis, methodological critique, and research gap identification',
        improvement: 'From C+ to A: Added scholarly depth and methodological rigor'
      }
    },
    {
      id: 'analysis',
      category: 'Literary Analysis',
      title: 'Critical Theory Application',
      prompt: 'Apply [THEORY] to analyze [TEXT] considering historical context...',
      variables: ['THEORY', 'TEXT', 'PERIOD'],
      icon: Layers,
      color: '#10b981',
      transformation: {
        before: '"Analyze The Great Gatsby"',
        after: 'Marxist critique examining class struggle, commodity fetishism, and the American Dream as capitalist mythology with 15 textual citations',
        improvement: 'From B- to A+: Theoretical sophistication and textual evidence'
      }
    },
    {
      id: 'argument',
      category: 'Essay Writing',
      title: 'Argumentative Essay Architect',
      prompt: 'Construct a compelling argument about [POSITION] using empirical evidence...',
      variables: ['POSITION', 'FIELD', 'COUNTERARGUMENTS'],
      icon: Target,
      color: '#f59e0b',
      transformation: {
        before: '"AI is good for education"',
        after: 'Multi-faceted argument with 8 empirical studies, 3 counter-argument refutations, and policy implications framework',
        improvement: 'From B to A: Evidence-based reasoning and nuanced perspective'
      }
    }
  ];

  const stats = [
    { value: '68', label: 'Expert Prompts', icon: FileText },
    { value: '87%', label: 'Grade Improvement', icon: TrendingUp },
    { value: '4.9/5', label: 'User Rating', icon: Award },
    { value: '10k+', label: 'Success Stories', icon: GraduationCap }
  ];

  const handleDemoGenerate = async () => {
    setIsGenerating(true);
    setLiveResult('');
    
    // Simulate generation with typewriter effect
    const fullResult = `Based on your input, here's your enhanced academic framework:

**Research Question Formation:**
Your topic has been transformed into a focused research question with clear parameters and measurable outcomes.

**Methodological Approach:**
- Systematic literature review protocol
- Thematic analysis framework
- Critical evaluation criteria
- Synthesis methodology

**Expected Outcomes:**
This prompt will generate a comprehensive analysis with 20+ scholarly sources, theoretical framework integration, and publication-ready structure.`;

    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < fullResult.length) {
        setLiveResult(fullResult.slice(0, currentIndex + 5));
        currentIndex += 5;
      } else {
        clearInterval(typeInterval);
        setIsGenerating(false);
      }
    }, 30);
  };

  const styles = {
    container: {
      width: '100%',
      padding: isMobile ? '4rem 1rem' : '6rem 2rem',
      background: `linear-gradient(180deg, 
        ${elevatedDarkTheme.bg} 0%, 
        rgba(31, 31, 35, 0.4) 50%,
        ${elevatedDarkTheme.bg} 100%)`,
      position: 'relative' as const,
      overflow: 'hidden'
    },
    wrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
      transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: isMobile ? '3rem' : '5rem'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.625rem 1.25rem',
      background: `linear-gradient(135deg, ${elevatedDarkTheme.accentGlow} 0%, rgba(159, 122, 234, 0.05) 100%)`,
      border: `1px solid ${elevatedDarkTheme.accentBorder}`,
      borderRadius: '100px',
      marginBottom: '2rem'
    },
    badgeText: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#a78bfa',
      letterSpacing: '0.025em',
      textTransform: 'uppercase' as const
    },
    title: {
      // Fluid responsive typography
      fontSize: `clamp(${
        isMobile ? '2rem' : '3rem'      // Minimum size
      }, ${
        isMobile ? '6vw' : '4vw'        // Preferred scaling
      }, ${
        isMobile ? '3rem' : '4.5rem'    // Maximum size
      })`,
      fontWeight: '300',
      color: '#ffffff',
      marginBottom: '1.5rem',
      letterSpacing: '-0.03em',
      lineHeight: 1.2,
      fontFamily: 'var(--font-literata)'
    },
    titleGradient: {
      background: `linear-gradient(135deg, ${elevatedDarkTheme.accent} 0%, #ec4899 50%, #f59e0b 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      display: 'block',
      marginTop: '0.5rem'
    },
    subtitle: {
      fontSize: isMobile ? '1.125rem' : '1.375rem',
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: 1.6,
      maxWidth: '800px',
      margin: '0 auto'
    },
    
    // Stats Section
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: '1.5rem',
      marginBottom: isMobile ? '3rem' : '5rem'
    },
    statCard: {
      background: `linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)`,
      border: `1px solid ${elevatedDarkTheme.borderSubtle}`,
      borderRadius: '20px',
      padding: '1.75rem',
      textAlign: 'center' as const,
      position: 'relative' as const,
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    },
    statIcon: {
      width: '48px',
      height: '48px',
      margin: '0 auto 1rem',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    statValue: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#ffffff',
      marginBottom: '0.5rem',
      fontFamily: 'var(--font-literata)',
      letterSpacing: '-0.02em'
    },
    statLabel: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.5)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      fontWeight: '500'
    },
    
    // Transformation Demo
    transformationSection: {
      marginBottom: isMobile ? '4rem' : '6rem'
    },
    sectionTitle: {
      fontSize: isMobile ? '1.75rem' : '2.5rem',
      fontWeight: '400',
      color: '#ffffff',
      marginBottom: '3rem',
      textAlign: 'center' as const,
      fontFamily: 'var(--font-literata)',
      letterSpacing: '-0.02em'
    },
    demoContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '2rem',
      marginBottom: '2rem'
    },
    demoTabs: {
      display: 'flex',
      gap: '0.75rem',
      marginBottom: '2rem',
      flexWrap: 'wrap' as const,
      justifyContent: 'center'
    },
    demoTab: {
      padding: '0.75rem 1.5rem',
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '12px',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.9375rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    demoTabActive: {
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)',
      borderColor: 'rgba(139, 92, 246, 0.4)',
      color: '#ffffff'
    },
    transformCard: {
      background: elevatedDarkTheme.elevated,
      border: `1px solid ${elevatedDarkTheme.border}`,
      borderRadius: '20px',
      padding: isMobile ? '1.5rem' : '2rem',
      position: 'relative' as const
    },
    transformLabel: {
      fontSize: '0.75rem',
      color: 'rgba(255, 255, 255, 0.4)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.1em',
      marginBottom: '1rem',
      fontWeight: '600'
    },
    transformContent: {
      fontSize: '1rem',
      lineHeight: 1.8,
      color: 'rgba(255, 255, 255, 0.9)'
    },
    transformBefore: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontStyle: 'italic',
      borderLeft: '3px solid rgba(239, 68, 68, 0.5)',
      paddingLeft: '1rem'
    },
    transformAfter: {
      borderLeft: '3px solid rgba(34, 197, 94, 0.5)',
      paddingLeft: '1rem'
    },
    improvementBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
      border: '1px solid rgba(34, 197, 94, 0.2)',
      borderRadius: '8px',
      marginTop: '1rem',
      fontSize: '0.875rem',
      color: '#22c55e'
    },
    
    // Live Demo Section
    liveDemo: {
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0.02) 100%)',
      border: '1px solid rgba(139, 92, 246, 0.1)',
      borderRadius: '24px',
      padding: isMobile ? '2rem 1.5rem' : '3rem',
      marginBottom: '4rem'
    },
    demoHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '2rem'
    },
    demoTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    variableSelect: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap' as const
    },
    variableChip: {
      padding: '0.625rem 1.25rem',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '0.9375rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    variableChipActive: {
      background: 'rgba(139, 92, 246, 0.2)',
      borderColor: 'rgba(139, 92, 246, 0.4)',
      color: '#ffffff'
    },
    generateButton: {
      padding: '1rem 2rem',
      background: `linear-gradient(135deg, ${elevatedDarkTheme.accent} 0%, ${elevatedDarkTheme.accentDark} 100%)`,
      border: 'none',
      borderRadius: '12px',
      color: '#ffffff',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s ease',
      marginBottom: '1.5rem'
    },
    resultBox: {
      background: 'rgba(10, 10, 15, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '12px',
      padding: '1.5rem',
      minHeight: '150px',
      whiteSpace: 'pre-wrap' as const,
      fontSize: '0.9375rem',
      lineHeight: 1.8,
      color: 'rgba(255, 255, 255, 0.9)',
      fontFamily: 'JetBrains Mono, monospace'
    },
    
    // CTA Section
    ctaSection: {
      textAlign: 'center' as const,
      padding: isMobile ? '3rem 1.5rem' : '4rem 2rem',
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.03) 100%)',
      borderRadius: '24px',
      border: '1px solid rgba(139, 92, 246, 0.15)'
    },
    ctaTitle: {
      fontSize: isMobile ? '2rem' : '2.75rem',
      fontWeight: '400',
      color: '#ffffff',
      marginBottom: '1rem',
      fontFamily: 'var(--font-literata)',
      letterSpacing: '-0.02em'
    },
    ctaSubtitle: {
      fontSize: '1.125rem',
      color: 'rgba(255, 255, 255, 0.7)',
      marginBottom: '2.5rem',
      lineHeight: 1.6
    },
    ctaButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap' as const
    },
    primaryCta: {
      padding: '1rem 2.5rem',
      background: `linear-gradient(135deg, ${elevatedDarkTheme.accent} 0%, ${elevatedDarkTheme.accentDark} 100%)`,
      color: '#ffffff',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1.0625rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s ease',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    },
    secondaryCta: {
      padding: '1rem 2.5rem',
      background: 'transparent',
      color: '#ffffff',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      fontSize: '1.0625rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s ease'
    },
    
    // Decorative Elements
    floatingGradient: {
      position: 'absolute' as const,
      width: '500px',
      height: '500px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
      filter: 'blur(80px)',
      pointerEvents: 'none' as const,
      animation: 'float 20s infinite ease-in-out'
    }
  };

  return (
    <section ref={containerRef} style={styles.container}>
      {/* Floating Gradients */}
      <div style={{ ...styles.floatingGradient, top: '-250px', left: '-250px' }} />
      <div style={{ ...styles.floatingGradient, bottom: '-250px', right: '-250px', animationDelay: '10s' }} />

      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge}>
            <Brain size={18} color="#a78bfa" />
            <span style={styles.badgeText}>The Biggest AI Prompt Library</span>
          </div>
          
          <h2 style={styles.title}>
            Transform Your Writing
            <br />
            <span style={styles.titleGradient}>From Generic to Genius</span>
          </h2>
          
          <p style={styles.subtitle}>
            AI prompts that teach you to think like scholars and researchers.
            {!isMobile && ' See the difference intelligence makes.'}
          </p>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div 
              key={index}
              style={styles.statCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              }}
            >
              <div style={styles.statIcon}>
                <stat.icon size={24} color="#8b5cf6" />
              </div>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Transformation Demo */}
        <div style={styles.transformationSection}>
          <h3 style={styles.sectionTitle}>
            See the Transformation
          </h3>

          <div style={styles.demoTabs}>
            {intelligenceExamples.map((example, index) => (
              <button
                key={example.id}
                style={{
                  ...styles.demoTab,
                  ...(activeDemo === index ? styles.demoTabActive : {})
                }}
                onClick={() => setActiveDemo(index)}
                onMouseEnter={(e) => {
                  if (activeDemo !== index) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeDemo !== index) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  }
                }}
              >
                <example.icon size={18} />
                {example.category}
              </button>
            ))}
          </div>

          <div style={styles.demoContainer}>
            <div style={styles.transformCard}>
              <div style={styles.transformLabel}>Without Esy Prompts</div>
              <div style={{ ...styles.transformContent, ...styles.transformBefore }}>
                {intelligenceExamples[activeDemo].transformation.before}
              </div>
            </div>

            <div style={styles.transformCard}>
              <div style={styles.transformLabel}>With Esy Intelligence</div>
              <div style={{ ...styles.transformContent, ...styles.transformAfter }}>
                {intelligenceExamples[activeDemo].transformation.after}
              </div>
              <div style={styles.improvementBadge}>
                <TrendingUp size={16} />
                {intelligenceExamples[activeDemo].transformation.improvement}
              </div>
            </div>
          </div>
        </div>

        {/* Live Demo */}
        <div style={styles.liveDemo}>
          <div style={styles.demoHeader}>
            <div style={styles.demoTitle}>
              <Zap size={24} color="#fbbf24" />
              Try It Live
            </div>
          </div>

          <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.5rem' }}>
            Select a variable to see how our prompts adapt to your specific needs:
          </p>

          <div style={styles.variableSelect}>
            {['Climate Change', 'Artificial Intelligence', 'Social Justice', 'Economic Policy'].map((variable) => (
              <div
                key={variable}
                style={{
                  ...styles.variableChip,
                  ...(selectedVariable === variable ? styles.variableChipActive : {})
                }}
                onClick={() => setSelectedVariable(variable)}
                onMouseEnter={(e) => {
                  if (selectedVariable !== variable) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedVariable !== variable) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
              >
                {variable}
              </div>
            ))}
          </div>

          <button
            style={styles.generateButton}
            onClick={handleDemoGenerate}
            disabled={!selectedVariable || isGenerating}
            onMouseEnter={(e) => {
              if (selectedVariable && !isGenerating) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.18)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
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
                Generating Intelligence...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Intelligent Framework
              </>
            )}
          </button>

          {liveResult && (
            <div style={styles.resultBox}>
              {liveResult}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div style={styles.ctaSection}>
          <h3 style={styles.ctaTitle}>
            Ready to Write
            {isMobile ? <br /> : ' '}
            at a Higher Level?
          </h3>
          <p style={styles.ctaSubtitle}>
            {isMobile 
              ? 'Achieve excellence with intelligent prompts'
              : 'Join thousands of students and professionals achieving excellence with intelligent prompts.'}
          </p>
          <div style={styles.ctaButtons}>
            <button
              style={styles.primaryCta}
              onClick={() => window.open('/prompt-library', '_blank')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
            >
              Explore All 68 Prompts
              <ArrowRight size={18} />
            </button>
            <button
              style={styles.secondaryCta}
              onClick={() => window.open('https://app.esy.com', '_blank')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              Start Writing Free
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default PromptIntelligenceEngine;
