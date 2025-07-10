import React, { useState, useEffect } from 'react';
import { BookOpen, ArrowRight, Sparkles, Brain, Layers, MessageSquare } from 'lucide-react';

const EsyAboutPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      // Update active section based on scroll
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActiveSection(section.id);
        }
      });
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

  const principles = [
    {
      number: '01',
      title: 'Intelligence amplified',
      description: 'The best research happens when human creativity meets AI capability. We teach you to orchestrate this partnership—maintaining your voice while leveraging unprecedented computational intelligence.'
    },
    {
      number: '02',
      title: 'Precision through prompting',
      description: 'A perfectly crafted prompt can unlock insights that would take weeks to discover manually. Master the subtle art of AI communication and watch your research transform.'
    },
    {
      number: '03',
      title: 'Collective advancement',
      description: 'Every breakthrough prompt becomes a gift to the community. Share what works, learn from others, and accelerate the pace of academic discovery together.'
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'Intelligent Prompting',
      description: 'Transform vague ideas into precise AI instructions that yield publication-ready insights'
    },
    {
      icon: Layers,
      title: 'Academic Templates',
      description: 'Start with battle-tested prompts refined by leading researchers in your field'
    },
    {
      icon: MessageSquare,
      title: 'Prompt Evolution',
      description: 'Track, version, and refine your prompts based on output quality metrics'
    },
    {
      icon: Sparkles,
      title: 'AI Mastery Path',
      description: 'Progress from basic queries to advanced research methodologies with guided learning'
    }
  ];

  const benefits = [
    {
      metric: '10x',
      title: 'Faster Literature Reviews',
      description: 'What took weeks now takes hours'
    },
    {
      metric: '73%',
      title: 'Better First Drafts',
      description: 'Higher quality initial outputs'
    },
    {
      metric: '5hrs',
      title: 'Weekly Time Saved',
      description: 'On average per researcher'
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
              <a href="/" style={{ 
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
              </a>

              <nav style={{ display: 'flex', gap: '2.5rem' }}>
                <a href="/write" style={{ 
                  color: currentTheme.muted, 
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  transition: 'color 0.2s'
                }}>
                  Write
                </a>
                <a href="/prompts" style={{ 
                  color: currentTheme.muted, 
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  transition: 'color 0.2s'
                }}>
                  Prompts
                </a>
                <a href="/learn" style={{ 
                  color: currentTheme.muted, 
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  transition: 'color 0.2s'
                }}>
                  Learn
                </a>
                <a href="/about" style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  fontSize: '0.938rem',
                  fontWeight: 500
                }}>
                  About
                </a>
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

      {/* Side Navigation */}
      <aside style={{
        position: 'fixed',
        left: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {['hero', 'problem', 'principles', 'features', 'transform'].map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            style={{
              width: '3px',
              height: '40px',
              background: activeSection === section ? currentTheme.accent : currentTheme.border,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              padding: 0
            }}
          />
        ))}
      </aside>

      {/* Hero Section */}
      <section id="hero" style={{ 
        paddingTop: '10rem', 
        paddingBottom: '6rem',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
          <div style={{ maxWidth: '820px' }}>
            <h1 style={{
              fontSize: '4rem',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '3rem'
            }}>
              Where breakthrough
              <br />
              research meets
              <br />
              <span style={{ fontWeight: 400 }}>artificial intelligence</span>
            </h1>
            
            <p style={{
              fontSize: '1.5rem',
              lineHeight: 1.6,
              color: currentTheme.muted,
              marginBottom: '3rem',
              maxWidth: '680px'
            }}>
              Esy transforms how academics work with AI. Master prompt engineering, 
              access field-tested templates, and produce exceptional research—faster 
              than ever before.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <button style={{
                padding: '1rem 2rem',
                background: currentTheme.accent,
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'opacity 0.2s'
              }}>
                Request Early Access
                <ArrowRight size={18} strokeWidth={2} />
              </button>
              <span style={{
                fontSize: '0.938rem',
                color: currentTheme.subtle
              }}>
                Join 500+ researchers on the waitlist
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" style={{ 
        padding: '8rem 0',
        backgroundColor: currentTheme.elevated
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            marginBottom: '4rem',
            textAlign: 'center'
          }}>
            The hidden cost of
            <br />
            <span style={{ color: currentTheme.muted }}>AI trial and error</span>
          </h2>

          <div style={{
            fontSize: '1.25rem',
            lineHeight: 1.8,
            color: currentTheme.muted,
            marginBottom: '4rem',
            textAlign: 'center'
          }}>
            Every researcher using AI faces the same struggle: hours spent crafting 
            prompts, inconsistent results, and the nagging feeling they're only 
            scratching the surface of what's possible.
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '3rem'
          }}>
            {benefits.map((benefit, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 300,
                  color: currentTheme.accent,
                  marginBottom: '0.75rem'
                }}>
                  {benefit.metric}
                </div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem'
                }}>
                  {benefit.title}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: currentTheme.subtle
                }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section id="principles" style={{ 
        padding: '8rem 0',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            marginBottom: '6rem',
            maxWidth: '720px'
          }}>
            A new philosophy for
            <br />
            academic AI collaboration
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {principles.map((principle, index) => (
              <div key={index} style={{ 
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: '3rem',
                maxWidth: '900px'
              }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 300,
                  color: currentTheme.faint,
                  lineHeight: 1
                }}>
                  {principle.number}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.75rem',
                    fontWeight: 400,
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.01em'
                  }}>
                    {principle.title}
                  </h3>
                  <p style={{
                    fontSize: '1.125rem',
                    lineHeight: 1.8,
                    color: currentTheme.muted
                  }}>
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ 
        padding: '8rem 0',
        backgroundColor: currentTheme.elevated
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ maxWidth: '720px', marginBottom: '6rem' }}>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '3rem'
            }}>
              Everything you need to
              <br />
              excel with AI
            </h2>

            <p style={{
              fontSize: '1.25rem',
              lineHeight: 1.8,
              color: currentTheme.muted
            }}>
              From your first prompt to your hundredth paper, Esy provides the 
              tools, templates, and training to make AI your most powerful research ally.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '4rem'
          }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    border: `1px solid ${currentTheme.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2rem'
                  }}>
                    <Icon size={24} color={currentTheme.subtle} strokeWidth={1.5} />
                  </div>
                  <h3 style={{
                    fontSize: '1.375rem',
                    fontWeight: 400,
                    marginBottom: '1rem'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: '1.063rem',
                    lineHeight: 1.8,
                    color: currentTheme.subtle
                  }}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transform Section */}
      <section id="transform" style={{ 
        padding: '8rem 0',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem', width: '100%', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '3.5rem',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            marginBottom: '3rem'
          }}>
            Ready to transform
            <br />
            your research?
          </h2>

          <p style={{
            fontSize: '1.375rem',
            lineHeight: 1.7,
            color: currentTheme.muted,
            marginBottom: '4rem',
            maxWidth: '600px',
            margin: '0 auto 4rem'
          }}>
            Join the waitlist and be among the first to experience the future 
            of AI-powered academic work. Limited spots available.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '2rem' }}>
            <button style={{
              padding: '1.125rem 2.5rem',
              background: currentTheme.accent,
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              fontSize: '1.063rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'opacity 0.2s'
            }}>
              Claim Your Spot
              <ArrowRight size={20} strokeWidth={2} />
            </button>
            <button style={{
              padding: '1.125rem 2.5rem',
              background: 'transparent',
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '6px',
              color: currentTheme.text,
              fontSize: '1.063rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              Watch Demo
            </button>
          </div>

          <p style={{
            fontSize: '0.938rem',
            color: currentTheme.subtle
          }}>
            No credit card required • Early access benefits • Cancel anytime
          </p>

          <div style={{
            marginTop: '6rem',
            paddingTop: '4rem',
            borderTop: `1px solid ${currentTheme.border}`
          }}>
            <blockquote style={{
              fontSize: '1.5rem',
              fontWeight: 300,
              lineHeight: 1.6,
              color: currentTheme.muted,
              margin: '0 auto',
              maxWidth: '600px'
            }}>
              "The prompt templates alone would have saved me six months of 
              trial and error. This is game-changing."
            </blockquote>
            <cite style={{
              display: 'block',
              fontSize: '1rem',
              color: currentTheme.subtle,
              marginTop: '1.5rem',
              fontStyle: 'normal'
            }}>
              — Dr. Michael Chen, Stanford AI Lab
            </cite>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        borderTop: `1px solid ${currentTheme.border}`,
        padding: '4rem 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '4rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  background: currentTheme.accent, 
                  borderRadius: '6px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}>
                  <BookOpen size={18} color="white" strokeWidth={1.5} />
                </div>
                <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>esy</span>
              </div>
              <p style={{
                fontSize: '0.938rem',
                lineHeight: 1.7,
                color: currentTheme.subtle,
                maxWidth: '280px'
              }}>
                Transforming academic research through intelligent AI collaboration.
              </p>
            </div>

            <div>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: currentTheme.subtle,
                marginBottom: '1.5rem'
              }}>
                Product
              </h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <a href="/features" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Features</a>
                <a href="/templates" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Templates</a>
                <a href="/pricing" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Pricing</a>
                <a href="/roadmap" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Roadmap</a>
              </nav>
            </div>

            <div>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: currentTheme.subtle,
                marginBottom: '1.5rem'
              }}>
                Resources
              </h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <a href="/guide" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Getting Started</a>
                <a href="/best-practices" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Best Practices</a>
                <a href="/examples" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Examples</a>
                <a href="/community" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Community</a>
              </nav>
            </div>

            <div>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: currentTheme.subtle,
                marginBottom: '1.5rem'
              }}>
                Company
              </h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <a href="/about" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>About</a>
                <a href="/blog" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Blog</a>
                <a href="/contact" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Contact</a>
                <a href="/privacy" style={{ color: currentTheme.muted, textDecoration: 'none', fontSize: '0.938rem' }}>Privacy</a>
              </nav>
            </div>
          </div>

          <div style={{
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: `1px solid ${currentTheme.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <p style={{
              fontSize: '0.875rem',
              color: currentTheme.faint
            }}>
              © 2025 Esy. All rights reserved.
            </p>
            <p style={{
              fontSize: '0.875rem',
              color: currentTheme.subtle
            }}>
              Built for researchers, by researchers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EsyAboutPage;