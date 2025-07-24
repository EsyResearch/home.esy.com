"use client";

import React, { useState, useEffect } from 'react';
import { Scale, Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';

const EsyTermsPage = () => {
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

  // Enhanced table of contents with semantic groupings
  const contentStructure = [
    {
      category: 'Foundation',
      sections: [
        { id: 'our-services', title: 'Our Services', number: '1' },
        { id: 'intellectual-property', title: 'Intellectual Property Rights', number: '2' },
        { id: 'user-representations', title: 'User Representations', number: '3' }
      ]
    },
    {
      category: 'Account & Payments',
      sections: [
        { id: 'user-registration', title: 'User Registration', number: '4' },
        { id: 'purchases-payment', title: 'Purchases and Payment', number: '5' },
        { id: 'subscriptions', title: 'Subscriptions', number: '6' }
      ]
    },
    {
      category: 'Usage & Content',
      sections: [
        { id: 'software', title: 'Software', number: '7' },
        { id: 'prohibited-activities', title: 'Prohibited Activities', number: '8' },
        { id: 'user-contributions', title: 'User Generated Contributions', number: '9' },
        { id: 'contribution-license', title: 'Contribution License', number: '10' }
      ]
    },
    {
      category: 'Platform & Integrations',
      sections: [
        { id: 'mobile-license', title: 'Mobile Application License', number: '11' },
        { id: 'social-media', title: 'Social Media', number: '12' },
        { id: 'third-party', title: 'Third-Party Websites', number: '13' },
        { id: 'services-management', title: 'Services Management', number: '14' }
      ]
    },
    {
      category: 'Legal Framework',
      sections: [
        { id: 'privacy-policy', title: 'Privacy Policy', number: '15' },
        { id: 'copyright', title: 'Copyright Infringements', number: '16' },
        { id: 'termination', title: 'Term and Termination', number: '17' },
        { id: 'governing-law', title: 'Governing Law', number: '19' },
        { id: 'dispute-resolution', title: 'Dispute Resolution', number: '20' }
      ]
    },
    {
      category: 'Additional Terms',
      sections: [
        { id: 'disclaimer', title: 'Disclaimer', number: '22' },
        { id: 'limitations', title: 'Limitations of Liability', number: '23' },
        { id: 'indemnification', title: 'Indemnification', number: '24' },
        { id: 'contact', title: 'Contact Us', number: '29' }
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

      // Advanced section detection
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

  const Paragraph = ({ children, emphasis = false, legal = false }) => (
    <p style={{
      fontSize: legal ? '0.95rem' : '1rem',
      color: emphasis ? colors.textPrimary : colors.textSecondary,
      lineHeight: '1.7',
      fontFamily: 'var(--font-inter)',
      marginBottom: '2rem',
      fontWeight: emphasis ? '500' : '400',
      textTransform: legal ? 'uppercase' : 'none',
      letterSpacing: legal ? '0.05em' : '0'
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

  const LegalNotice = ({ children, type = 'standard' }) => {
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
      critical: {
        backgroundColor: colors.surface,
        border: `2px solid ${colors.accent}`,
        padding: '2rem'
      }
    };

    return (
      <div style={{
        ...styles[type],
        marginBottom: '3rem',
        borderRadius: type === 'standard' ? '0' : '8px'
      }}>
        <div style={{
          color: colors.textPrimary,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontSize: '1rem',
          lineHeight: '1.7',
          fontWeight: type === 'critical' ? '500' : '400'
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
          {/* Refined header with better spacing */}
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
                <Scale size={24} color={colors.background} />
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
                  Terms of Service
                </h1>
                <div style={{
                  fontSize: '1rem',
                  color: colors.textTertiary,
                  fontWeight: '400',
                  marginTop: '0.5rem',
                  letterSpacing: '0.02em'
                }}>
                  Legal Terms and Conditions
                </div>
              </div>
            </div>
          </div>
          
          {/* Sophisticated introduction */}
          <div style={{ marginBottom: '3rem' }}>
            <Paragraph emphasis>
              These Legal Terms constitute a legally binding agreement between you and Esy LLC concerning your access to and use of our AI-powered academic writing platform.
            </Paragraph>
            <Paragraph>
              By accessing our services, you acknowledge that you have read, understood, and agree to be bound by all terms outlined in this comprehensive document. We recommend careful review before proceeding.
            </Paragraph>
          </div>
          
          {/* Metadata with improved typography */}
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
              <span>Last updated June 23, 2025</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <MapPin size={16} opacity={0.7} />
              <span>Florida, United States</span>
            </div>
          </div>
        </div>
      </header>

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
                Navigation
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
          
          {/* Company Introduction */}
          <Section id="company-intro" title="Agreement to Our Legal Terms" number="" emphasis>
            <LegalNotice type="standard">
              <strong>Esy LLC</strong>, doing business as Esy and ESY.COM, LLC (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;), is a company registered in Florida, United States. We operate as a leading SaaS provider in the EdTech sector, offering an AI-powered writing assistant designed to help users create detailed and expressive academic essays.
            </LegalNotice>

            <Paragraph>
              We operate the website https://www.esy.com (the &ldquo;Site&rdquo;), the mobile application Esy (the &ldquo;App&rdquo;), as well as any other related products and services that refer or link to these legal terms (collectively, the &ldquo;Services&rdquo;).
            </Paragraph>

            <LegalNotice type="critical">
              <Paragraph legal>
                IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
              </Paragraph>
            </LegalNotice>

            <Paragraph>
              The Services are intended for users who are at least 13 years of age. All users who are minors in the jurisdiction in which they reside must have the permission of, and be directly supervised by, their parent or guardian to use the Services.
            </Paragraph>
          </Section>

          <Section id="our-services" title="Our Services" number="1">
            <Paragraph>
              The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country.
            </Paragraph>
            
            <LegalNotice type="warning">
              The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
            </LegalNotice>
          </Section>

          <Section id="intellectual-property" title="Intellectual Property Rights" number="2">
            <SubSection title="Our Intellectual Property">
              <Paragraph>
                We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the &ldquo;Content&rdquo;), as well as the trademarks, service marks, and logos contained therein (the &ldquo;Marks&rdquo;).
              </Paragraph>
              <Paragraph>
                Our Content and Marks are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws and treaties in the United States and around the world.
              </Paragraph>
            </SubSection>

            <SubSection title="Your Use of Our Services">
              <Paragraph>
                Subject to your compliance with these Legal Terms, including the &ldquo;PROHIBITED ACTIVITIES&rdquo; section below, we grant you a non-exclusive, non-transferable, revocable license to:
              </Paragraph>
              <EnhancedList type="bullets" items={[
                'Access the Services; and',
                'Download or print a copy of any portion of the Content to which you have properly gained access'
              ]} />
              <Paragraph emphasis>
                This license is solely for your personal, non-commercial use or internal business purpose.
              </Paragraph>
            </SubSection>
          </Section>

          <Section id="user-representations" title="User Representations" number="3">
            <Paragraph>
              By using the Services, you represent and warrant that:
            </Paragraph>
            <EnhancedList type="numbers" items={[
              'All registration information you submit will be true, accurate, current, and complete',
              'You will maintain the accuracy of such information and promptly update such registration information as necessary',
              'You have the legal capacity and you agree to comply with these Legal Terms',
              'You are not under the age of 13',
              'You are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Services',
              'You will not access the Services through automated or non-human means, whether through a bot, script or otherwise',
              'You will not use the Services for any illegal or unauthorized purpose',
              'Your use of the Services will not violate any applicable law or regulation'
            ]} />
          </Section>

          <Section id="subscriptions" title="Subscriptions" number="6">
            <SubSection title="Billing and Renewal">
              <Paragraph>
                Your subscription will continue and automatically renew unless canceled. You consent to our charging your payment method on a recurring basis without requiring your prior approval for each recurring charge, until such time as you cancel the applicable order.
              </Paragraph>
            </SubSection>

            <SubSection title="Free Trial">
              <LegalNotice type="standard">
                We offer a 7-day free trial to new users who register with the Services. The account will not be charged and the subscription will be suspended until upgraded to a paid version at the end of the free trial.
              </LegalNotice>
            </SubSection>

            <SubSection title="Cancellation">
              <Paragraph>
                You can cancel your subscription at any time by logging into your account. Your cancellation will take effect at the end of the current paid term. If you have any questions or are unsatisfied with our Services, please email us at support@esy.com.
              </Paragraph>
            </SubSection>
          </Section>

          <Section id="prohibited-activities" title="Prohibited Activities" number="8">
            <Paragraph>
              You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </Paragraph>
            
            <Paragraph emphasis>
              As a user of the Services, you agree not to:
            </Paragraph>
            
            <EnhancedList type="bullets" items={[
              'Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us',
              'Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords',
              'Circumvent, disable, or otherwise interfere with security-related features of the Services',
              'Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services',
              'Use any information obtained from the Services in order to harass, abuse, or harm another person',
              'Use the Services in a manner inconsistent with any applicable laws or regulations',
              'Upload or transmit viruses, Trojan horses, or other material that interferes with any party\'s uninterrupted use and enjoyment of the Services',
              'Engage in any automated use of the system, such as using scripts to send comments or messages',
              'Attempt to impersonate another user or person or use the username of another user',
              'Use the Services as part of any effort to compete with us or otherwise use the Services for any revenue-generating endeavor or commercial enterprise'
            ]} />
          </Section>

          <Section id="dispute-resolution" title="Dispute Resolution" number="20">
            <SubSection title="Informal Negotiations">
              <Paragraph>
                To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms, the Parties agree to first attempt to negotiate any Dispute informally for at least thirty (30) days before initiating arbitration.
              </Paragraph>
            </SubSection>

            <SubSection title="Binding Arbitration">
              <LegalNotice type="critical">
                <Paragraph legal>
                  YOU UNDERSTAND THAT WITHOUT THIS PROVISION, YOU WOULD HAVE THE RIGHT TO SUE IN COURT AND HAVE A JURY TRIAL.
                </Paragraph>
              </LegalNotice>
              <Paragraph>
                If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute will be finally and exclusively resolved by binding arbitration. The arbitration shall be commenced and conducted under the Commercial Arbitration Rules of the American Arbitration Association (AAA).
              </Paragraph>
            </SubSection>
          </Section>

          <Section id="governing-law" title="Governing Law" number="19">
            <LegalNotice type="standard">
              These Legal Terms and your use of the Services are governed by and construed in accordance with the laws of the State of Delaware applicable to agreements made and to be entirely performed within the State of Delaware, without regard to its conflict of law principles.
            </LegalNotice>
          </Section>

          {/* Enhanced Contact Section */}
          <Section id="contact" title="Contact Us" number="29">
            <Paragraph>
              In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us using the information provided below.
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
                  Contact Information
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
                      Email Support
                    </div>
                    <a href="mailto:support@esy.com" style={{ 
                      color: colors.textPrimary, 
                      textDecoration: 'none', 
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '1rem',
                      fontWeight: '500'
                    }}>
                      support@esy.com
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
                    <Phone size={18} color={colors.accent} />
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
                      Phone Support
                    </div>
                    <a href="tel:+13052045687" style={{ 
                      color: colors.textPrimary, 
                      textDecoration: 'none', 
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '1rem',
                      fontWeight: '500'
                    }}>
                      (305) 204-5687
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
                      Esy LLC<br />
                      7901 4th St N ste 8782<br />
                      St. Petersburg, FL 33702<br />
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

export default EsyTermsPage; 