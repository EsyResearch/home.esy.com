"use client";

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Target, 
  Zap, 
  TrendingUp,
  ArrowRight,
  Check,
  Layers,
  Brain,
  FileText,
  Award,
  ChevronRight
} from 'lucide-react';

interface PromptExample {
  id: string;
  category: string;
  title: string;
  description: string;
  example: string;
  result: string;
  icon: React.ElementType;
  color: string;
}

const PromptLibraryShowcase: React.FC = () => {
  const [activeExample, setActiveExample] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Check if mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('prompt-library-showcase');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const promptExamples: PromptExample[] = [
    {
      id: 'research',
      category: 'Research & Analysis',
      title: 'Deep Research Prompts',
      description: 'Uncover scholarly sources and build evidence-based arguments',
      example: '"Analyze the socioeconomic factors contributing to urban inequality with peer-reviewed sources from the last 5 years"',
      result: 'Get comprehensive research with 15+ academic citations, statistical analysis, and counter-arguments',
      icon: BookOpen,
      color: '#8b5cf6'
    },
    {
      id: 'structure',
      category: 'Essay Structure',
      title: 'Perfect Structure Templates',
      description: 'Create compelling narratives with proven frameworks',
      example: '"Build a comparative analysis essay structure examining renewable vs fossil fuel economics"',
      result: 'Receive detailed outline with thesis, topic sentences, evidence placement, and transition strategies',
      icon: Layers,
      color: '#10b981'
    },
    {
      id: 'critical',
      category: 'Critical Thinking',
      title: 'Analytical Depth Prompts',
      description: 'Develop sophisticated arguments that impress professors',
      example: '"Apply Foucault\'s power theory to modern social media surveillance capitalism"',
      result: 'Generate nuanced theoretical analysis with contemporary applications and scholarly discourse',
      icon: Brain,
      color: '#f59e0b'
    }
  ];

  const features = [
    {
      icon: Target,
      title: 'Precision Prompting',
      description: 'Get exactly what you need with field-tested prompts'
    },
    {
      icon: Zap,
      title: 'Instant Excellence',
      description: 'Transform basic ideas into sophisticated arguments'
    },
    {
      icon: TrendingUp,
      title: 'Grade Improvement',
      description: '87% of users report higher grades using our prompts'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Curated Prompts' },
    { value: '50+', label: 'Academic Disciplines' },
    { value: '4.9/5', label: 'User Rating' }
  ];

  const styles = {
    container: {
      width: '100%',
      padding: isMobile ? '3rem 1rem' : '5rem 2rem',
      background: 'linear-gradient(180deg, rgba(10, 10, 15, 0) 0%, rgba(10, 10, 15, 1) 100%)',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    wrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: isMobile ? '3rem' : '4rem'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
      border: '1px solid rgba(139, 92, 246, 0.2)',
      borderRadius: '100px',
      marginBottom: '1.5rem'
    },
    badgeText: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#8b5cf6',
      letterSpacing: '-0.01em'
    },
    title: {
      fontSize: isMobile ? '2rem' : '3rem',
      fontWeight: '700',
      color: '#ffffff',
      marginBottom: '1rem',
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
      fontFamily: 'var(--font-literata)'
    },
    subtitle: {
      fontSize: isMobile ? '1.125rem' : '1.25rem',
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: 1.6,
      maxWidth: '700px',
      margin: '0 auto'
    },
    content: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '2rem' : '4rem',
      alignItems: 'center',
      marginBottom: '4rem'
    },
    examplesSection: {
      position: 'relative' as const
    },
    exampleTabs: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '2rem',
      flexWrap: 'wrap' as const
    },
    exampleTab: {
      padding: '0.625rem 1.25rem',
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '12px',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    exampleTabActive: {
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
      borderColor: 'rgba(139, 92, 246, 0.3)',
      color: '#ffffff'
    },
    exampleCard: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '20px',
      padding: isMobile ? '1.5rem' : '2rem',
      minHeight: '320px',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    exampleIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1rem'
    },
    exampleTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#ffffff',
      marginBottom: '0.75rem',
      letterSpacing: '-0.01em'
    },
    exampleDescription: {
      fontSize: '0.9375rem',
      color: 'rgba(255, 255, 255, 0.6)',
      marginBottom: '1.5rem',
      lineHeight: 1.6
    },
    examplePrompt: {
      padding: '1rem',
      background: 'rgba(139, 92, 246, 0.05)',
      border: '1px solid rgba(139, 92, 246, 0.1)',
      borderRadius: '12px',
      marginBottom: '1rem'
    },
    examplePromptLabel: {
      fontSize: '0.75rem',
      color: 'rgba(139, 92, 246, 0.8)',
      fontWeight: '600',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      marginBottom: '0.5rem'
    },
    examplePromptText: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.9)',
      fontStyle: 'italic',
      lineHeight: 1.5
    },
    exampleResult: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      padding: '1rem',
      background: 'rgba(16, 185, 129, 0.05)',
      border: '1px solid rgba(16, 185, 129, 0.1)',
      borderRadius: '12px'
    },
    exampleResultText: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: 1.5
    },
    visualSection: {
      position: 'relative' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '2rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1rem',
      marginBottom: '2rem'
    },
    statCard: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      padding: '1.25rem',
      textAlign: 'center' as const,
      position: 'relative' as const,
      overflow: 'hidden'
    },
    statValue: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      fontWeight: '700',
      color: '#ffffff',
      marginBottom: '0.25rem',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    statLabel: {
      fontSize: '0.8125rem',
      color: 'rgba(255, 255, 255, 0.6)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em'
    },
    featuresGrid: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    },
    featureCard: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      padding: '1.25rem',
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      borderRadius: '16px',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    featureIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    featureContent: {
      flex: 1
    },
    featureTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#ffffff',
      marginBottom: '0.25rem',
      letterSpacing: '-0.01em'
    },
    featureDescription: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.6)',
      lineHeight: 1.5
    },
    cta: {
      textAlign: 'center' as const,
      padding: isMobile ? '3rem 1rem' : '4rem 2rem',
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0.02) 100%)',
      borderRadius: '24px',
      border: '1px solid rgba(139, 92, 246, 0.1)',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    ctaTitle: {
      fontSize: isMobile ? '1.75rem' : '2.25rem',
      fontWeight: '700',
      color: '#ffffff',
      marginBottom: '1rem',
      letterSpacing: '-0.02em',
      fontFamily: 'var(--font-literata)'
    },
    ctaSubtitle: {
      fontSize: '1.125rem',
      color: 'rgba(255, 255, 255, 0.7)',
      marginBottom: '2rem',
      lineHeight: 1.6
    },
    ctaButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap' as const
    },
    primaryButton: {
      padding: '0.875rem 2rem',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      color: '#ffffff',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s ease',
      boxShadow: '0 8px 20px rgba(139, 92, 246, 0.3)'
    },
    secondaryButton: {
      padding: '0.875rem 2rem',
      background: 'transparent',
      color: '#ffffff',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s ease'
    },
    decorativeGlow: {
      position: 'absolute' as const,
      width: '600px',
      height: '600px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
      filter: 'blur(100px)',
      pointerEvents: 'none' as const
    }
  };

  return (
    <section id="prompt-library-showcase" style={styles.container}>
      {/* Decorative Elements */}
      <div style={{ ...styles.decorativeGlow, top: '-300px', left: '-300px' }} />
      <div style={{ ...styles.decorativeGlow, bottom: '-300px', right: '-300px' }} />

      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge}>
            <Sparkles size={16} color="#8b5cf6" />
            <span style={styles.badgeText}>PROMPT LIBRARY</span>
          </div>
          <h2 style={styles.title}>
            Transform Your Writing with
            <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Expert-Crafted Prompts
            </span>
          </h2>
          <p style={styles.subtitle}>
            Stop struggling with what to write. Access thousands of proven prompts that help you 
            communicate effectively with AI to produce exceptional essays, research papers, and academic content.
          </p>
        </div>

        {/* Main Content */}
        <div style={styles.content}>
          {/* Examples Section */}
          <div style={styles.examplesSection}>
            <div style={styles.exampleTabs}>
              {promptExamples.map((example, index) => (
                <button
                  key={example.id}
                  style={{
                    ...styles.exampleTab,
                    ...(activeExample === index ? styles.exampleTabActive : {})
                  }}
                  onClick={() => setActiveExample(index)}
                  onMouseEnter={(e) => {
                    if (activeExample !== index) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeExample !== index) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    }
                  }}
                >
                  <example.icon size={16} />
                  {example.category}
                </button>
              ))}
            </div>

            <div style={styles.exampleCard}>
              <div style={{
                ...styles.exampleIcon,
                background: `linear-gradient(135deg, ${promptExamples[activeExample].color}20 0%, ${promptExamples[activeExample].color}10 100%)`
              }}>
                {React.createElement(promptExamples[activeExample].icon, {
                  size: 24,
                  color: promptExamples[activeExample].color
                })}
              </div>
              
              <h3 style={styles.exampleTitle}>
                {promptExamples[activeExample].title}
              </h3>
              
              <p style={styles.exampleDescription}>
                {promptExamples[activeExample].description}
              </p>

              <div style={styles.examplePrompt}>
                <div style={styles.examplePromptLabel}>Example Prompt</div>
                <div style={styles.examplePromptText}>
                  {promptExamples[activeExample].example}
                </div>
              </div>

              <div style={styles.exampleResult}>
                <Check size={16} color="#10b981" strokeWidth={3} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={styles.exampleResultText}>
                  <strong>Result:</strong> {promptExamples[activeExample].result}
                </div>
              </div>
            </div>
          </div>

          {/* Visual Section */}
          <div style={styles.visualSection}>
            {/* Stats */}
            <div style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  style={styles.statCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={styles.statValue}>{stat.value}</div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div 
                  key={index}
                  style={{
                    ...styles.featureCard,
                    ...(hoveredCard === feature.title ? {
                      background: 'rgba(255, 255, 255, 0.04)',
                      borderColor: 'rgba(139, 92, 246, 0.2)',
                      transform: 'translateX(8px)'
                    } : {})
                  }}
                  onMouseEnter={() => setHoveredCard(feature.title)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={styles.featureIcon}>
                    <feature.icon size={20} color="#8b5cf6" />
                  </div>
                  <div style={styles.featureContent}>
                    <h4 style={styles.featureTitle}>{feature.title}</h4>
                    <p style={styles.featureDescription}>{feature.description}</p>
                  </div>
                  <ChevronRight 
                    size={16} 
                    color="rgba(255, 255, 255, 0.3)"
                    style={{ 
                      transition: 'all 0.2s ease',
                      transform: hoveredCard === feature.title ? 'translateX(4px)' : 'translateX(0)'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={styles.cta}>
          <h3 style={styles.ctaTitle}>
            Ready to Write Better Essays?
          </h3>
          <p style={styles.ctaSubtitle}>
            Join thousands of students achieving academic excellence with our AI-powered prompt library.
          </p>
          <div style={styles.ctaButtons}>
            <button
              style={styles.primaryButton}
              onClick={() => window.open('/prompt-library', '_blank')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(139, 92, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.3)';
              }}
            >
              Explore Prompt Library
              <ArrowRight size={18} />
            </button>
            <button
              style={styles.secondaryButton}
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
              Try It Free
              <Sparkles size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromptLibraryShowcase;
