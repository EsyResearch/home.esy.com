"use client";

import React, { useState, useEffect } from 'react';
import { Shield, Eye, Settings, Globe, Lock, Clock, Mail, MapPin, ArrowUpRight, ExternalLink } from 'lucide-react';

const EsyPrivacyPage = () => {
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  const colors = {
    background: '#0a0a0f',
    surface: '#16161f',
    accent: '#8b5cf6',
    textPrimary: 'rgba(255, 255, 255, 1)',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textTertiary: 'rgba(255, 255, 255, 0.5)',
    textQuaternary: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.05)'
  };

  // Enhanced content structure with privacy-focused categorization
  const contentStructure = [
    {
      category: 'Information Collection',
      sections: [
        { id: 'information-collect', title: 'What Information Do We Collect?', number: '1' },
        { id: 'process-information', title: 'How Do We Process Your Information?', number: '2' },
        { id: 'legal-bases', title: 'What Legal Bases Do We Rely On?', number: '3' }
      ]
    },
    {
      category: 'Data Sharing & Security',
      sections: [
        { id: 'share-information', title: 'When Do We Share Personal Information?', number: '4' },
        { id: 'third-party-websites', title: 'Third-Party Websites', number: '5' },
        { id: 'cookies-tracking', title: 'Cookies and Tracking Technologies', number: '6' },
        { id: 'keep-safe', title: 'How Do We Keep Your Information Safe?', number: '11' }
      ]
    },
    {
      category: 'AI & Technology',
      sections: [
        { id: 'ai-products', title: 'AI-Based Products', number: '7' },
        { id: 'social-logins', title: 'Social Logins', number: '8' },
        { id: 'international-transfer', title: 'International Information Transfer', number: '9' }
      ]
    },
    {
      category: 'Your Rights & Control',
      sections: [
        { id: 'privacy-rights', title: 'What Are Your Privacy Rights?', number: '13' },
        { id: 'us-residents', title: 'US Residents Privacy Rights', number: '15' },
        { id: 'data-retention', title: 'How Long Do We Keep Information?', number: '10' },
        { id: 'user-deleted-data', title: 'User-Deleted Data Retention', number: '16' }
      ]
    },
    {
      category: 'Additional Information',
      sections: [
        { id: 'minors', title: 'Information from Minors', number: '12' },
        { id: 'do-not-track', title: 'Do-Not-Track Features', number: '14' },
        { id: 'updates', title: 'Policy Updates', number: '17' },
        { id: 'contact', title: 'Contact Us', number: '18' }
      ]
    }
  ];

  // Enhanced scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);

      const allSections = contentStructure.flatMap(group => group.sections);
      const sectionElements = allSections.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(item => item.element);

      const viewportMiddle = window.innerHeight / 2;
      let currentSection = '';
      
      for (const { id, element } of sectionElements) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
          currentSection = id;
          break;
        }
      }
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.offsetTop - headerOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const Section = ({ id, title, number, children, emphasis = false }) => (
    <section id={id} style={{ 
      marginBottom: '4rem',
      opacity: activeSection === id ? 1 : 0.85,
      transition: 'opacity 0.2s ease'
    }}>
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'baseline', 
          gap: '1.5rem',
          marginBottom: '1rem'
        }}>
          <span style={{ 
            color: colors.accent,
            fontSize: '0.9rem',
            fontWeight: '600',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '0.05em',
            opacity: 0.8
          }}>
            {number}
          </span>
          <h2 style={{
            fontSize: emphasis ? '1.75rem' : '1.5rem',
            fontWeight: '600',
            color: colors.textPrimary,
            fontFamily: 'var(--font-literata)',
            lineHeight: '1.3',
            margin: 0,
            letterSpacing: '-0.01em'
          }}>
            {title}
          </h2>
        </div>
        <div style={{
          width: '4rem',
          height: '1px',
          backgroundColor: colors.border,
          opacity: 0.6
        }} />
      </header>
      
      <div style={{ 
        maxWidth: '800px'
      }}>
        {children}
      </div>
    </section>
  );

  const Paragraph = ({ children, emphasis = false, summary = false }) => (
    <p style={{
      fontSize: summary ? '1.1rem' : '1rem',
      color: emphasis ? colors.textPrimary : colors.textSecondary,
      lineHeight: '1.7',
      fontFamily: 'var(--font-inter)',
      marginBottom: '2rem',
      fontWeight: emphasis ? '500' : '400',
      fontStyle: summary ? 'italic' : 'normal'
    }}>
      {children}
    </p>
  );

  const EnhancedList = ({ items, type = 'bullets' }) => (
    <div style={{ marginBottom: '2rem' }}>
      {items.map((item, index) => (
        <div key={index} style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
          marginBottom: '1rem',
          fontSize: '1rem',
          lineHeight: '1.7',
          color: colors.textSecondary,
          fontFamily: 'var(--font-inter)'
        }}>
          <span style={{
            color: colors.accent,
            fontSize: '0.8rem',
            fontWeight: '600',
            minWidth: '1.5rem',
            marginTop: '0.1rem',
            opacity: 0.7
          }}>
            {type === 'numbers' ? `${index + 1}.` : '—'}
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );

  const PrivacyNotice = ({ children, type = 'standard', icon = null }) => {
    const Icon = icon;
    const styles = {
      standard: {
        backgroundColor: colors.surface,
        borderLeft: `3px solid ${colors.accent}`,
        padding: '2rem 2rem 2rem 2.5rem'
      },
      warning: {
        backgroundColor: `rgba(139, 92, 246, 0.05)`,
        border: `1px solid rgba(139, 92, 246, 0.2)`,
        padding: '2rem'
      },
      summary: {
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        padding: '2rem'
      }
    };

    return (
      <div style={{
        ...styles[type],
        marginBottom: '3rem',
        borderRadius: type === 'standard' ? '0' : '8px'
      }}>
        {Icon && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            marginBottom: '1rem' 
          }}>
            <Icon size={20} color={colors.accent} />
            <span style={{ 
              fontSize: '0.9rem', 
              fontWeight: '600', 
              color: colors.textPrimary,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              {type === 'summary' ? 'In Short' : 'Important'}
            </span>
          </div>
        )}
        <div style={{
          color: colors.textPrimary,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontSize: '1rem',
          lineHeight: '1.7',
          fontWeight: type === 'summary' ? '500' : '400'
        }}>
          {children}
        </div>
      </div>
    );
  };

  const SubSection = ({ title, children }) => (
    <div style={{ marginBottom: '3rem' }}>
      <h3 style={{
        fontSize: '1.1rem',
        fontWeight: '600',
        color: colors.textPrimary,
        fontFamily: 'var(--font-literata)',
        marginBottom: '1rem',
        letterSpacing: '-0.01em'
      }}>
        {title}
      </h3>
      {children}
    </div>
  );

  const KeyPointsGrid = () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '2rem',
      marginBottom: '4rem'
    }}>
      {[
        {
          icon: Eye,
          title: 'Information We Process',
          description: 'Personal information you provide during registration and service use, plus automatically collected technical data.'
        },
        {
          icon: Shield,
          title: 'Data Protection',
          description: 'We implement comprehensive security measures and only process data when we have valid legal grounds.'
        },
        {
          icon: Settings,
          title: 'Your Control',
          description: 'You can access, update, or delete your information at any time through your account settings.'
        },
        {
          icon: Globe,
          title: 'International Transfer',
          description: 'Data may be transferred internationally with appropriate safeguards including Standard Contractual Clauses.'
        }
      ].map((point, index) => {
        const Icon = point.icon;
        return (
          <div key={index} style={{
            backgroundColor: colors.surface,
            padding: '2rem',
            border: `1px solid ${colors.border}`,
            borderRadius: '8px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: `rgba(139, 92, 246, 0.1)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <Icon size={24} color={colors.accent} />
            </div>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '500',
              color: colors.textPrimary,
              fontFamily: 'var(--font-literata)',
              marginBottom: '1rem'
            }}>
              {point.title}
            </h3>
            <p style={{
              fontSize: '0.95rem',
              color: colors.textSecondary,
              lineHeight: '1.6',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              margin: 0
            }}>
              {point.description}
            </p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{ 
      backgroundColor: colors.background, 
      color: colors.textPrimary, 
      minHeight: '100vh',
      fontFamily: 'var(--font-inter)',
      paddingTop: '80px'
    }}>
      {/* Progress indicator */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress * 100}%`,
        height: '2px',
        backgroundColor: colors.accent,
        zIndex: 1000,
        transition: 'width 0.1s ease-out'
      }} />

      {/* Sophisticated Header */}
      <header style={{ 
        padding: '6rem 2rem 4rem 2rem', 
        maxWidth: '1200px', 
        margin: '0 auto',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '800px' }}>
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.5rem', 
              marginBottom: '2rem' 
            }}>
              <div style={{ 
                width: '48px',
                height: '48px',
                backgroundColor: colors.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Shield size={24} color={colors.background} />
              </div>
              <div>
                <h1 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '600', 
                  lineHeight: '1.2', 
                  margin: 0,
                  fontFamily: 'var(--font-literata)',
                  letterSpacing: '-0.02em'
                }}>
                  Privacy Policy
                </h1>
                <div style={{
                  fontSize: '1rem',
                  color: colors.textTertiary,
                  fontWeight: '400',
                  marginTop: '0.5rem',
                  letterSpacing: '0.02em'
                }}>
                  How We Protect Your Information
                </div>
              </div>
            </div>
          </div>
          
          {/* Key Points Overview */}
          <div style={{ marginBottom: '3rem' }}>
            <Paragraph emphasis>
              This Privacy Notice for Esy, LLC describes how and why we might access, collect, store, use, and share your personal information when you use our AI-powered academic writing platform.
            </Paragraph>
            <Paragraph>
              We are committed to protecting your privacy and maintaining transparency about our data practices. This notice will help you understand your privacy rights and choices.
            </Paragraph>
          </div>
          
          {/* Metadata */}
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
            paddingTop: '2rem',
            borderTop: `1px solid ${colors.border}`,
            fontSize: '0.9rem', 
            color: colors.textTertiary,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Clock size={16} opacity={0.7} />
              <span>Last updated July 23, 2025</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <MapPin size={16} opacity={0.7} />
              <span>United States</span>
            </div>
          </div>
        </div>
      </header>

      {/* Key Points Overview */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem 2rem' }}>
        <KeyPointsGrid />
      </div>

      {/* Enhanced Layout */}
      <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', gap: '5rem' }}>
        
        {/* Sophisticated Navigation */}
        <aside style={{ 
          width: '320px',
          padding: '2rem',
          position: 'sticky',
          top: '2rem',
          height: 'fit-content'
        }}>
          <nav style={{ 
            backgroundColor: colors.surface,
            padding: '2rem',
            border: `1px solid ${colors.border}`
          }}>
            <header style={{ marginBottom: '2rem' }}>
              <h3 style={{ 
                fontSize: '1rem',
                fontWeight: '600',
                color: colors.textPrimary,
                margin: 0,
                fontFamily: 'var(--font-literata)',
                letterSpacing: '0.02em'
              }}>
                Privacy Topics
              </h3>
              <div style={{
                width: '2rem',
                height: '1px',
                backgroundColor: colors.accent,
                marginTop: '0.75rem',
                opacity: 0.6
              }} />
            </header>
            
            {contentStructure.map((group, groupIndex) => (
              <div key={groupIndex} style={{ marginBottom: '2rem' }}>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: colors.textQuaternary,
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  {group.category}
                </div>
                
                {group.sections.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: '0.75rem 0',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: activeSection === item.id ? colors.accent : colors.textTertiary,
                      fontSize: '0.9rem',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      gap: '0.75rem',
                      fontWeight: activeSection === item.id ? '500' : '400'
                    }}
                    onMouseOver={(e) => {
                      if (activeSection !== item.id) {
                        e.currentTarget.style.color = colors.textSecondary;
                      }
                    }}
                    onMouseOut={(e) => {
                      if (activeSection !== item.id) {
                        e.currentTarget.style.color = colors.textTertiary;
                      }
                    }}
                  >
                    <span style={{ 
                      fontSize: '0.8rem', 
                      opacity: 0.6,
                      minWidth: '1.5rem' 
                    }}>
                      {item.number}
                    </span>
                    <span style={{ flex: 1 }}>{item.title}</span>
                    {activeSection === item.id && (
                      <ArrowUpRight size={14} style={{ opacity: 0.7 }} />
                    )}
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* Enhanced Main Content */}
        <main style={{ flex: 1, padding: '2rem 0 8rem 0' }}>
          
          {/* Summary of Key Points */}
          <Section id="summary" title="Summary of Key Points" number="" emphasis>
            <PrivacyNotice type="summary" icon={Eye}>
              This summary provides key points from our Privacy Notice. You can find detailed information by using the navigation or clicking links throughout this document.
            </PrivacyNotice>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr', 
              gap: '1.5rem',
              marginBottom: '3rem'
            }}>
              {[
                {
                  question: 'What personal information do we process?',
                  answer: 'We process personal information depending on how you interact with our Services, including registration details, usage data, and technical information.'
                },
                {
                  question: 'Do we process sensitive personal information?',
                  answer: 'We may process sensitive information like student data when necessary with your consent or as permitted by law.'
                },
                {
                  question: 'Do we collect information from third parties?',
                  answer: 'We do not collect information from third parties.'
                },
                {
                  question: 'How do we process your information?',
                  answer: 'We process information to provide and improve our Services, communicate with you, ensure security, and comply with law.'
                }
              ].map((item, index) => (
                <div key={index} style={{
                  backgroundColor: colors.surface,
                  padding: '1.5rem',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px'
                }}>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: colors.textPrimary,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    marginBottom: '0.75rem'
                  }}>
                    {item.question}
                  </h4>
                  <p style={{
                    fontSize: '0.95rem',
                    color: colors.textSecondary,
                    lineHeight: '1.6',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    margin: 0
                  }}>
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="information-collect" title="What Information Do We Collect?" number="1">
            <PrivacyNotice type="summary" icon={Eye}>
              We collect personal information that you provide to us when you register, use our Services, or contact us.
            </PrivacyNotice>

            <SubSection title="Personal Information You Provide">
              <Paragraph>
                We collect personal information that you voluntarily provide when you register on the Services, express interest in our products, participate in activities, or contact us.
              </Paragraph>
              
              <div style={{ 
                backgroundColor: colors.surface,
                padding: '2rem',
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                marginBottom: '2rem'
              }}>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: colors.textPrimary,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  marginBottom: '1rem'
                }}>
                  Information Categories We Collect
                </h4>
                <EnhancedList type="bullets" items={[
                  'Names, email addresses, and contact information',
                  'Account credentials (usernames, passwords)',
                  'Educational background and professional information',
                  'Payment information (processed securely by Stripe)',
                  'Profile photos and user preferences',
                  'Communication preferences and contact data'
                ]} />
              </div>

              <PrivacyNotice type="warning">
                <strong>Sensitive Information:</strong> When necessary and with your consent, we may process student data and other sensitive information as permitted by applicable law.
              </PrivacyNotice>
            </SubSection>

            <SubSection title="Information Automatically Collected">
              <Paragraph>
                We automatically collect certain technical information when you visit or use our Services. This includes device data, usage patterns, and location information.
              </Paragraph>
              
              <EnhancedList type="bullets" items={[
                'IP address, browser type, and device characteristics',
                'Operating system and language preferences',
                'Pages viewed, features used, and interaction data',
                'Location data (which you can opt out of)',
                'Log files and performance information'
              ]} />

              <PrivacyNotice type="standard">
                <strong>Google API Compliance:</strong> Our use of information received from Google APIs adheres to Google API Services User Data Policy, including Limited Use requirements.
              </PrivacyNotice>
            </SubSection>
          </Section>

          <Section id="process-information" title="How Do We Process Your Information?" number="2">
            <PrivacyNotice type="summary" icon={Settings}>
              We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.
            </PrivacyNotice>

            <Paragraph>
              We process your personal information for various purposes depending on how you interact with our Services:
            </Paragraph>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {[
                {
                  title: 'Service Delivery',
                  items: [
                    'Account creation and authentication',
                    'Delivering requested services',
                    'User support and inquiries',
                    'Order fulfillment and management'
                  ]
                },
                {
                  title: 'Communication',
                  items: [
                    'Administrative information',
                    'Marketing communications (with consent)',
                    'Feedback requests',
                    'Security notifications'
                  ]
                },
                {
                  title: 'Improvement & Security',
                  items: [
                    'Service protection and fraud prevention',
                    'Usage trend identification',
                    'Marketing campaign effectiveness',
                    'Platform security monitoring'
                  ]
                }
              ].map((category, index) => (
                <div key={index} style={{
                  backgroundColor: colors.surface,
                  padding: '2rem',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px'
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    color: colors.textPrimary,
                    fontFamily: 'var(--font-literata)',
                    marginBottom: '1rem'
                  }}>
                    {category.title}
                  </h3>
                  <EnhancedList type="bullets" items={category.items} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="ai-products" title="Do We Offer AI-Based Products?" number="7">
            <PrivacyNotice type="summary" icon={Settings}>
              We offer products, features, or tools powered by artificial intelligence, machine learning, or similar technologies.
            </PrivacyNotice>

            <SubSection title="AI Technologies We Use">
              <Paragraph>
                We provide AI Products through third-party service providers, including Anthropic, xAI, OpenAI, Hugging Face, Amazon Web Services (AWS) AI, and Google Cloud AI.
              </Paragraph>
              
              <div style={{ 
                backgroundColor: colors.surface,
                padding: '2rem',
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                marginBottom: '2rem'
              }}>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: colors.textPrimary,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  marginBottom: '1rem'
                }}>
                  Our AI Products Include
                </h4>
                <EnhancedList type="bullets" items={[
                  'AI research assistance',
                  'AI-powered insights and analysis',
                  'AI document generation',
                  'Text analysis and processing',
                  'AI search capabilities',
                  'AI translation services'
                ]} />
              </div>

              <PrivacyNotice type="warning">
                <strong>Data Processing:</strong> Your input, output, and personal information will be shared with and processed by AI Service Providers to enable your use of our AI Products. All processing is handled in line with our Privacy Notice and agreements with third parties.
              </PrivacyNotice>
            </SubSection>

            <SubSection title="How to Opt Out">
              <Paragraph>
                You can opt out of AI data processing by:
              </Paragraph>
              <EnhancedList type="bullets" items={[
                'Updating your account settings at app.esy.com/settings/privacy',
                'Contacting us using the information provided in this notice'
              ]} />
            </SubSection>
          </Section>

          <Section id="privacy-rights" title="What Are Your Privacy Rights?" number="13">
            <PrivacyNotice type="summary" icon={Lock}>
              Depending on your location, you have rights that allow you greater access to and control over your personal information.
            </PrivacyNotice>

            <SubSection title="Your Rights Under Privacy Laws">
              <Paragraph>
                In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights under applicable data protection laws:
              </Paragraph>
              
              <EnhancedList type="bullets" items={[
                'Right to request access and obtain a copy of your personal information',
                'Right to request rectification or erasure of your data',
                'Right to restrict the processing of your personal information',
                'Right to data portability (where applicable)',
                'Right not to be subject to automated decision-making',
                'Right to object to the processing of your personal information',
                'Right to withdraw consent at any time'
              ]} />

              <PrivacyNotice type="standard">
                <strong>Account Management:</strong> You can review, change, or terminate your account at any time by logging into your account settings or contacting us directly.
              </PrivacyNotice>
            </SubSection>

            <SubSection title="Exercising Your Rights">
              <Paragraph>
                To exercise your privacy rights, you can:
              </Paragraph>
              <EnhancedList type="bullets" items={[
                'Visit app.esy.com/settings/privacy to manage your preferences',
                'Email us at privacy@esy.com',
                'Use the contact information provided at the end of this notice'
              ]} />
            </SubSection>
          </Section>

          <Section id="user-deleted-data" title="User-Deleted Data Retention" number="16">
            <PrivacyNotice type="warning">
              <strong>Data Retention After Account Deletion:</strong> If you delete your account, we will retain your account data, including essays, school documents, or other critical content, for a period of 12 months.
            </PrivacyNotice>

            <Paragraph>
              This temporary retention period allows you to restore your data if you decide to reactivate your account within this timeframe. After 12 months, we will permanently delete your data.
            </Paragraph>

            <Paragraph emphasis>
              Users wishing to expedite the permanent deletion of their data may request this explicitly by contacting us at privacy@esy.com.
            </Paragraph>
          </Section>

          {/* Enhanced Contact Section */}
          <Section id="contact" title="How Can You Contact Us About This Notice?" number="18">
            <Paragraph>
              If you have questions or comments about this Privacy Notice, you may contact us using the information provided below.
            </Paragraph>
            
            <div style={{ 
              backgroundColor: colors.surface,
              padding: '3rem',
              border: `1px solid ${colors.border}`,
              marginTop: '3rem'
            }}>
              <header style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '400',
                  color: colors.textPrimary,
                  fontFamily: 'var(--font-literata)',
                  margin: 0,
                  letterSpacing: '-0.01em'
                }}>
                  Privacy Contact Information
                </h3>
                <div style={{
                  width: '3rem',
                  height: '1px',
                  backgroundColor: colors.accent,
                  marginTop: '0.75rem',
                  opacity: 0.6
                }} />
              </header>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '2.5rem' 
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: `rgba(139, 92, 246, 0.1)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Mail size={18} color={colors.accent} />
                  </div>
                  <div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: colors.textQuaternary, 
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Privacy Email
                    </div>
                    <a href="mailto:privacy@esy.com" style={{ 
                      color: colors.textPrimary, 
                      textDecoration: 'none', 
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '1rem',
                      fontWeight: '500'
                    }}>
                      privacy@esy.com
                    </a>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: `rgba(139, 92, 246, 0.1)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Settings size={18} color={colors.accent} />
                  </div>
                  <div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: colors.textQuaternary, 
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Privacy Settings
                    </div>
                    <a 
                      href="https://app.esy.com/settings/privacy" 
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        color: colors.textPrimary, 
                        textDecoration: 'none', 
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        fontSize: '1rem',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      app.esy.com/settings/privacy
                      <ExternalLink size={14} style={{ opacity: 0.7 }} />
                    </a>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: `rgba(139, 92, 246, 0.1)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MapPin size={18} color={colors.accent} />
                  </div>
                  <div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: colors.textQuaternary, 
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Mailing Address
                    </div>
                    <div style={{ 
                      color: colors.textPrimary, 
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
                      fontSize: '1rem', 
                      lineHeight: '1.6',
                      fontWeight: '400'
                    }}>
                      Esy, LLC<br />
                      8 The Green, STE B<br />
                      Dover, DE 19901<br />
                      United States
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
};

export default EsyPrivacyPage; 