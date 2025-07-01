'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, ArrowRight, Sparkles, Calendar, Users, HelpCircle,
  Clock, Mail, ChevronDown
} from 'lucide-react';

const ContactPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentTheme = {
    bg: '#0a0a0f',
    elevated: '#16161f',
    text: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.7)',
    subtle: 'rgba(255, 255, 255, 0.5)',
    faint: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.05)',
    accent: '#6366f1'
  };

  const contactPaths = [
    {
      id: 'early-access',
      icon: Sparkles,
      title: 'Get Early Access',
      description: 'Join 500+ researchers already on the waitlist',
      action: 'Join Waitlist',
      details: [
        'First access when we launch in Q2 2025',
        'Exclusive onboarding session',
        'Founding member pricing',
        'Direct input on feature development'
      ]
    },
    {
      id: 'demo',
      icon: Calendar,
      title: 'Book a Demo',
      description: 'See Esy in action with your research team',
      action: 'Schedule Demo',
      details: [
        '30-minute personalized walkthrough',
        'Custom prompt examples for your field',
        'Team collaboration features',
        'Pricing and implementation discussion'
      ]
    },
    {
      id: 'partnership',
      icon: Users,
      title: 'Partner With Us',
      description: 'Integrate Esy into your institution or research',
      action: 'Explore Partnership',
      details: [
        'Institutional licensing',
        'API access and integration',
        'Co-development opportunities',
        'Research collaboration'
      ]
    }
  ];

  const faqs = [
    {
      question: "What exactly is Esy?",
      answer: "Esy is a specialized platform that teaches researchers how to effectively use AI for academic work. We provide prompt engineering education, field-specific templates, and tools to manage your AI-assisted research workflow while maintaining scholarly rigor."
    },
    {
      question: "When are you launching?",
      answer: "We're currently in private beta with select research groups. Public access begins in Q2 2025. Join the waitlist to secure your spot and get exclusive early access benefits."
    },
    {
      question: "How is this different from ChatGPT or Claude?",
      answer: "While those are general-purpose AI tools, Esy is built specifically for academic research. We provide structured workflows, citation management, version control for prompts, and templates designed to maintain scholarly standards."
    },
    {
      question: "What fields do you support?",
      answer: "We currently have specialized templates for STEM fields, social sciences, and humanities. Our prompt engineering principles work across all disciplines, and we're constantly adding field-specific resources based on user feedback."
    },
    {
      question: "Is there a free tier?",
      answer: "Yes! We'll offer a free tier for individual researchers with access to basic features and templates. Institutional plans will include advanced collaboration tools and unlimited usage."
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle submission
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: scrolled ? 'rgba(10, 10, 15, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? `1px solid ${currentTheme.border}` : '1px solid transparent',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
              <Link href="/" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.875rem', 
                textDecoration: 'none', 
                color: 'white' 
              }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: currentTheme.accent, 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}>
                  <BookOpen size={20} color="white" strokeWidth={1.5} />
                </div>
                <span style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 600, 
                  letterSpacing: '-0.02em' 
                }}>esy</span>
              </Link>

              <nav style={{ display: 'flex', gap: '2.5rem' }}>
                <Link href="/write" style={{ 
                  color: currentTheme.muted, 
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  transition: 'color 0.2s'
                }}>
                  Write
                </Link>
                <Link href="/prompts" style={{ 
                  color: currentTheme.muted, 
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  transition: 'color 0.2s'
                }}>
                  Prompts
                </Link>
                <Link href="/learn" style={{ 
                  color: currentTheme.muted, 
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  transition: 'color 0.2s'
                }}>
                  Learn
                </Link>
                <Link href="/about" style={{ 
                  color: currentTheme.muted, 
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  transition: 'color 0.2s'
                }}>
                  About
                </Link>
                <Link href="/contact" style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  fontWeight: 500
                }}>
                  Contact
                </Link>
              </nav>
            </div>

            <button style={{
              padding: '0.625rem 1.5rem',
              background: currentTheme.accent,
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              fontSize: '0.938rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}>
              Get Early Access
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Split Screen */}
      <section style={{ 
        paddingTop: '6rem',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 2rem',
          width: '100%'
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6rem',
            alignItems: 'center'
          }}>
            {/* Left Side - Content */}
            <div>
              <h1 style={{
                fontSize: '4rem',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '2rem'
              }}>
                Ready to transform
                <br />
                your research?
              </h1>
              
              <p style={{
                fontSize: '1.5rem',
                lineHeight: 1.6,
                color: currentTheme.muted,
                marginBottom: '3rem'
              }}>
                Choose how you&apos;d like to connect with us.
              </p>

              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {contactPaths.map(path => {
                  const Icon = path.icon;
                  return (
                    <button
                      key={path.id}
                      onClick={() => setSelectedPath(path.id)}
                      style={{
                        padding: '1.5rem',
                        background: selectedPath === path.id ? currentTheme.elevated : 'transparent',
                        border: `1px solid ${selectedPath === path.id ? currentTheme.accent : currentTheme.border}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '8px',
                        background: selectedPath === path.id ? currentTheme.accent : 'transparent',
                        border: `1px solid ${selectedPath === path.id ? currentTheme.accent : currentTheme.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Icon size={24} color={selectedPath === path.id ? 'white' : currentTheme.subtle} strokeWidth={1.5} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: '1.25rem',
                          fontWeight: 400,
                          marginBottom: '0.25rem'
                        }}>
                          {path.title}
                        </h3>
                        <p style={{
                          fontSize: '0.938rem',
                          color: currentTheme.subtle
                        }}>
                          {path.description}
                        </p>
                      </div>
                      <ArrowRight size={20} color={currentTheme.subtle} />
                    </button>
                  );
                })}
              </div>

              <div style={{
                marginTop: '3rem',
                paddingTop: '3rem',
                borderTop: `1px solid ${currentTheme.border}`
              }}>
                <button
                  onClick={() => setShowForm(true)}
                  style={{
                    color: currentTheme.subtle,
                    background: 'transparent',
                    border: 'none',
                    fontSize: '0.938rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'color 0.2s'
                  }}
                >
                  <HelpCircle size={16} />
                  Have a different question? Send us a message
                </button>
              </div>
            </div>

            {/* Right Side - Dynamic Content */}
            <div style={{
              background: currentTheme.elevated,
              borderRadius: '12px',
              padding: '3rem',
              minHeight: '500px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              {!selectedPath && !showForm && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: currentTheme.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 2rem'
                  }}>
                    <Mail size={36} color={currentTheme.subtle} strokeWidth={1.5} />
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 300,
                    marginBottom: '1rem'
                  }}>
                    Select an option to get started
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: currentTheme.subtle,
                    lineHeight: 1.6
                  }}>
                    Choose how you&apos;d like to connect with us, and we&apos;ll guide you through the next steps.
                  </p>
                </div>
              )}

              {selectedPath && !showForm && (
                <div>
                  {(() => {
                    const path = contactPaths.find(p => p.id === selectedPath);
                    if (!path) return null;
                    const Icon = path.icon;
                    return (
                      <>
                        <div style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '12px',
                          background: currentTheme.accent,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '2rem'
                        }}>
                          <Icon size={32} color="white" strokeWidth={1.5} />
                        </div>
                        
                        <h2 style={{
                          fontSize: '2rem',
                          fontWeight: 300,
                          marginBottom: '1rem'
                        }}>
                          {path.title}
                        </h2>
                        
                        <p style={{
                          fontSize: '1.125rem',
                          color: currentTheme.muted,
                          marginBottom: '2.5rem',
                          lineHeight: 1.6
                        }}>
                          {path.description}
                        </p>

                        <div style={{
                          marginBottom: '2.5rem'
                        }}>
                          <h4 style={{
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: currentTheme.subtle,
                            marginBottom: '1rem'
                          }}>
                            What you&apos;ll get
                          </h4>
                          <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem'
                          }}>
                            {path.details.map((detail, index) => (
                              <li key={index} style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.75rem',
                                fontSize: '0.938rem',
                                color: currentTheme.muted
                              }}>
                                <span style={{ color: currentTheme.accent, marginTop: '2px' }}>•</span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          onClick={() => {
                            if (path.id === 'early-access') {
                              window.location.href = '/waitlist';
                            } else if (path.id === 'demo') {
                              window.location.href = '/book-demo';
                            } else {
                              setShowForm(true);
                            }
                          }}
                          style={{
                            width: '100%',
                            padding: '1rem',
                            background: currentTheme.accent,
                            border: 'none',
                            borderRadius: '6px',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            transition: 'opacity 0.2s'
                          }}
                        >
                          {path.action}
                          <ArrowRight size={18} />
                        </button>

                        <div style={{
                          marginTop: '1.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.875rem',
                          color: currentTheme.subtle,
                          justifyContent: 'center'
                        }}>
                          <Clock size={14} />
                          Response within 24 hours
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {showForm && (
                <div>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setSelectedPath(null);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: currentTheme.subtle,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      marginBottom: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    ← Back to options
                  </button>

                  <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 300,
                    marginBottom: '2rem'
                  }}>
                    Send us a message
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      style={{
                        padding: '0.875rem',
                        background: currentTheme.bg,
                        border: `1px solid ${currentTheme.border}`,
                        borderRadius: '6px',
                        color: currentTheme.text,
                        fontSize: '0.938rem',
                        outline: 'none'
                      }}
                    />
                    
                    <input
                      type="email"
                      placeholder="your.email@university.edu"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      style={{
                        padding: '0.875rem',
                        background: currentTheme.bg,
                        border: `1px solid ${currentTheme.border}`,
                        borderRadius: '6px',
                        color: currentTheme.text,
                        fontSize: '0.938rem',
                        outline: 'none'
                      }}
                    />
                    
                    <textarea
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={6}
                      style={{
                        padding: '0.875rem',
                        background: currentTheme.bg,
                        border: `1px solid ${currentTheme.border}`,
                        borderRadius: '6px',
                        color: currentTheme.text,
                        fontSize: '0.938rem',
                        outline: 'none',
                        resize: 'vertical',
                        lineHeight: 1.6
                      }}
                    />

                    <button
                      onClick={handleSubmit}
                      style={{
                        padding: '0.875rem',
                        background: currentTheme.accent,
                        border: 'none',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '0.938rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'opacity 0.2s'
                      }}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ 
        padding: '6rem 0',
        borderTop: `1px solid ${currentTheme.border}`
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            marginBottom: '3rem',
            textAlign: 'center'
          }}>
            Frequently asked questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                style={{
                  borderBottom: `1px solid ${currentTheme.border}`,
                  paddingBottom: '1.5rem',
                  marginBottom: '1.5rem'
                }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    padding: '1rem 0',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left'
                  }}
                >
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    color: currentTheme.text
                  }}>
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    size={20} 
                    color={currentTheme.subtle}
                    style={{
                      transform: expandedFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s'
                    }}
                  />
                </button>
                
                {expandedFaq === index && (
                  <p style={{
                    fontSize: '0.938rem',
                    lineHeight: 1.7,
                    color: currentTheme.muted,
                    paddingTop: '0.5rem',
                    paddingBottom: '1rem'
                  }}>
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '3rem'
          }}>
            <p style={{
              fontSize: '0.938rem',
              color: currentTheme.subtle
            }}>
              Still have questions? 
              <button
                onClick={() => {
                  setShowForm(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: currentTheme.accent,
                  fontSize: '0.938rem',
                  cursor: 'pointer',
                  marginLeft: '0.5rem',
                  textDecoration: 'underline'
                }}
              >
                Send us a message
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        borderTop: `1px solid ${currentTheme.border}`,
        padding: '3rem 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                background: currentTheme.accent, 
                borderRadius: '6px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <BookOpen size={16} color="white" strokeWidth={1.5} />
              </div>
              <span style={{ fontSize: '1rem', fontWeight: 600 }}>esy</span>
            </div>

            <p style={{ 
              fontSize: '0.813rem',
              color: currentTheme.faint
            }}>
              © 2025 Esy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage; 