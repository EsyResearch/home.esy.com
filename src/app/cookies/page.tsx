'use client';

import React, { useState } from 'react';
import { Cookie, Shield, Eye, Zap, Settings, ChevronDown, ChevronRight, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

const EsyCookiesPage = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedCookieType, setSelectedCookieType] = useState('all');

  const colors = {
    background: '#0a0a0f',
    surface: '#16161f',
    surfaceHover: '#1a1a24',
    accent: '#8b5cf6',
    accentHover: '#7c3aed',
    textPrimary: 'rgba(255, 255, 255, 1)',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textTertiary: 'rgba(255, 255, 255, 0.5)',
    textQuaternary: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.05)',
    borderHover: 'rgba(255, 255, 255, 0.1)',
    borderAccent: 'rgba(139, 92, 246, 0.2)',
    success: '#10b981',
    warning: '#f59e0b'
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const cookieData = {
    essential: [
      {
        name: 'csrf_token',
        purpose: 'Helps prevent Cross-Site Request Forgery (CSRF) attacks using Javascript.',
        provider: 'www.esy.com',
        service: 'Django',
        type: 'HTTP Cookie',
        expires: '29 days'
      },
      {
        name: 'esy-cookie-consent',
        purpose: 'Stores user\'s cookie consent preferences to remember their choices.',
        provider: 'www.esy.com',
        service: 'Esy',
        type: 'Local Storage',
        expires: '1 year'
      }
    ],
    analytics: [
      {
        name: '_ga_#',
        purpose: 'Used to distinguish individual users by means of designation of a randomly generated number as client identifier, which allows calculation of visits and sessions',
        provider: '.esy.com',
        service: 'Google Analytics',
        type: 'HTTP Cookie',
        expires: '1 year 1 month 4 days'
      },
      {
        name: '_ga',
        purpose: 'Records a particular ID used to come up with data about website usage by the user',
        provider: '.esy.com',
        service: 'Google Analytics',
        type: 'HTTP Cookie',
        expires: '1 year 1 month 4 days'
      }
    ],
    functional: [
      {
        name: 'user_preferences',
        purpose: 'Stores user writing preferences, citation styles, and workspace configurations',
        provider: 'www.esy.com',
        service: 'Esy',
        type: 'Local Storage',
        expires: '12 months'
      }
    ],
    personalization: [
      {
        name: 'research_suggestions',
        purpose: 'Stores personalized research suggestions and academic resource recommendations',
        provider: 'www.esy.com',
        service: 'Esy',
        type: 'Local Storage',
        expires: '24 months'
      }
    ]
  };

  const cookieTypes = [
    { id: 'all', label: 'All Cookies', icon: Cookie, count: Object.values(cookieData).flat().length },
    { id: 'essential', label: 'Essential', icon: Shield, count: cookieData.essential.length },
    { id: 'analytics', label: 'Analytics', icon: Eye, count: cookieData.analytics.length },
    { id: 'functional', label: 'Functional', icon: Zap, count: cookieData.functional.length },
    { id: 'personalization', label: 'Personalization', icon: Settings, count: cookieData.personalization.length }
  ];

  const ExpandableSection = ({ id, title, children, defaultExpanded = false }) => {
    const isExpanded = expandedSections[id] ?? defaultExpanded;
    
    return (
      <div style={{ 
        backgroundColor: colors.surface,
        borderRadius: '12px',
        border: `1px solid ${colors.border}`,
        marginBottom: '1.5rem',
        overflow: 'hidden',
        transition: 'all 0.2s ease'
      }}>
        <button
          onClick={() => toggleSection(id)}
          style={{
            width: '100%',
            padding: '1.5rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: colors.textPrimary,
            fontSize: '1.1rem',
            fontWeight: '600',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = colors.surfaceHover}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <span>{title}</span>
          {isExpanded ? 
            <ChevronDown size={20} style={{ transition: 'transform 0.2s ease' }} /> : 
            <ChevronRight size={20} style={{ transition: 'transform 0.2s ease' }} />
          }
        </button>
        
        {isExpanded && (
          <div style={{ 
            padding: '0 1.5rem 1.5rem 1.5rem',
            borderTop: `1px solid ${colors.border}`,
            animation: 'fadeIn 0.3s ease'
          }}>
            {children}
          </div>
        )}
      </div>
    );
  };

  const CookieCard = ({ cookie, category }) => {
    const getTypeColor = () => {
      switch(category) {
        case 'essential': return colors.success;
        case 'analytics': return colors.accent;
        case 'functional': return colors.accentHover;
        case 'personalization': return colors.warning;
        default: return colors.textTertiary;
      }
    };

    return (
      <div style={{
        backgroundColor: colors.background,
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        padding: '1.25rem',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: colors.textPrimary,
            margin: 0,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            {cookie.name}
          </h4>
          <span style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.5rem',
            backgroundColor: getTypeColor(),
            color: colors.background,
            borderRadius: '4px',
            fontWeight: '500',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            {cookie.type}
          </span>
        </div>
        
        <p style={{
          fontSize: '0.9rem',
          color: colors.textSecondary,
          lineHeight: '1.5',
          margin: '0 0 1rem 0',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          {cookie.purpose}
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8rem' }}>
          <div>
            <span style={{ color: colors.textTertiary, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontWeight: '500' }}>Provider:</span>
            <p style={{ color: colors.textSecondary, margin: '0.25rem 0 0 0', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              {cookie.provider}
            </p>
          </div>
          <div>
            <span style={{ color: colors.textTertiary, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontWeight: '500' }}>Expires:</span>
            <p style={{ color: colors.textSecondary, margin: '0.25rem 0 0 0', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              {cookie.expires}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const filteredCookies = selectedCookieType === 'all' 
    ? Object.entries(cookieData).flatMap(([category, cookies]) => 
        cookies.map(cookie => ({ ...cookie, category }))
      )
    : cookieData[selectedCookieType]?.map(cookie => ({ ...cookie, category: selectedCookieType })) || [];

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      
      <div style={{ 
        backgroundColor: colors.background, 
        color: colors.textPrimary, 
        minHeight: '100vh',
        fontFamily: 'var(--font-inter)',
        paddingTop: '6rem'
      }}>
        {/* Header */}
        <header style={{ 
          padding: '4rem 2rem 2rem 2rem', 
          maxWidth: '1200px', 
          margin: '0 auto',
          borderBottom: `1px solid ${colors.border}`
        }}>
          <div style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ 
                backgroundColor: colors.accent,
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Cookie size={24} color={colors.background} />
              </div>
              <h1 style={{ 
                fontSize: '3rem', 
                fontWeight: '300', 
                lineHeight: '1.1', 
                margin: 0,
                fontFamily: 'var(--font-literata)'
              }}>
                Cookie Policy
              </h1>
            </div>
            
            <div style={{ 
              backgroundColor: colors.surface,
              padding: '1.5rem',
              borderRadius: '12px',
              border: `1px solid ${colors.border}`,
              marginBottom: '2rem'
            }}>
              <p style={{ 
                fontSize: '1.1rem', 
                color: colors.textSecondary, 
                lineHeight: '1.7',
                margin: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                This policy explains how Esy uses cookies and similar technologies to enhance your academic research experience while respecting your privacy.
              </p>
            </div>
            
            <div style={{ 
              fontSize: '0.9rem', 
              color: colors.textTertiary,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem' }}>
            
            {/* Sidebar */}
            <aside style={{ position: 'sticky', top: '2rem', height: 'fit-content' }}>
              <div style={{ 
                backgroundColor: colors.surface,
                borderRadius: '12px',
                border: `1px solid ${colors.border}`,
                padding: '1.5rem'
              }}>
                <h3 style={{ 
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: colors.textPrimary,
                  margin: '0 0 1rem 0',
                  fontFamily: 'var(--font-literata)'
                }}>
                  Cookie Categories
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {cookieTypes.map(type => {
                    const Icon = type.icon;
                    const isSelected = selectedCookieType === type.id;
                    
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedCookieType(type.id)}
                        style={{
                          padding: '0.75rem',
                          backgroundColor: isSelected ? colors.accent : 'transparent',
                          color: isSelected ? colors.background : colors.textSecondary,
                          border: `1px solid ${isSelected ? colors.accent : colors.border}`,
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          transition: 'all 0.2s ease',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          fontSize: '0.9rem'
                        }}
                        onMouseOver={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = colors.surfaceHover;
                            e.currentTarget.style.color = colors.textPrimary;
                          }
                        }}
                        onMouseOut={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = colors.textSecondary;
                          }
                        }}
                      >
                        <Icon size={16} />
                        <span style={{ flex: 1, textAlign: 'left' }}>{type.label}</span>
                        <span style={{ 
                          fontSize: '0.75rem',
                          backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : colors.border,
                          color: isSelected ? colors.background : colors.textTertiary,
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontWeight: '500'
                        }}>
                          {type.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Content */}
            <div style={{ maxWidth: '800px' }}>
              
              {/* What are cookies */}
              <ExpandableSection id="what-are-cookies" title="What are cookies?" defaultExpanded={true}>
                <p style={{ 
                  fontSize: '1rem',
                  color: colors.textSecondary,
                  lineHeight: '1.7',
                  margin: '0 0 1rem 0',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  Cookies are small data files placed on your device when you visit a website. They help make websites work efficiently and provide valuable insights to improve your experience.
                </p>
                <p style={{ 
                  fontSize: '1rem',
                  color: colors.textSecondary,
                  lineHeight: '1.7',
                  margin: 0,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  <strong>First-party cookies</strong> are set by Esy directly, while <strong>third-party cookies</strong> are set by external services we use to enhance functionality, such as analytics and research tools.
                </p>
              </ExpandableSection>

              {/* Why we use cookies */}
              <ExpandableSection id="why-use-cookies" title="Why we use cookies">
                <p style={{ 
                  fontSize: '1rem',
                  color: colors.textSecondary,
                  lineHeight: '1.7',
                  margin: '0 0 1rem 0',
                  fontFamily: "'Source Serif Pro', Georgia, serif"
                }}>
                  We use cookies to provide essential platform functionality, enhance your research experience, and understand how to improve our academic writing tools.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: colors.background, borderRadius: '8px', border: `1px solid ${colors.border}` }}>
                    <Shield size={20} color={colors.success} style={{ marginBottom: '0.5rem' }} />
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: colors.textPrimary, margin: '0 0 0.5rem 0', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                      Essential Functions
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: colors.textSecondary, margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                      Authentication, security, and core platform operations
                    </p>
                  </div>
                  <div style={{ padding: '1rem', backgroundColor: colors.background, borderRadius: '8px', border: `1px solid ${colors.border}` }}>
                    <Eye size={20} color={colors.accent} style={{ marginBottom: '0.5rem' }} />
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: colors.textPrimary, margin: '0 0 0.5rem 0', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                      Research Enhancement
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: colors.textSecondary, margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                      Understanding usage patterns to improve academic tools
                    </p>
                  </div>
                </div>
              </ExpandableSection>

              {/* Cookie Details */}
              <div style={{ 
                backgroundColor: colors.surface,
                borderRadius: '12px',
                border: `1px solid ${colors.border}`,
                padding: '2rem',
                marginBottom: '2rem'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: colors.textPrimary,
                  margin: '0 0 1.5rem 0',
                  fontFamily: 'var(--font-literata)'
                }}>
                  Cookie Details
                </h2>
                
                {filteredCookies.length > 0 ? (
                  <div>
                    {filteredCookies.map((cookie, index) => (
                      <CookieCard key={`${cookie.name}-${index}`} cookie={cookie} category={cookie.category} />
                    ))}
                  </div>
                ) : (
                  <p style={{ 
                    color: colors.textTertiary,
                    fontStyle: 'italic',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}>
                    No cookies found for this category.
                  </p>
                )}
              </div>

              {/* How to control cookies */}
              <ExpandableSection id="control-cookies" title="How to control cookies">
                <p style={{ 
                  fontSize: '1rem',
                  color: colors.textSecondary,
                  lineHeight: '1.7',
                  margin: '0 0 1rem 0',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  You have complete control over cookie preferences. Use our Cookie Consent Manager or adjust your browser settings.
                </p>
                <div style={{ 
                  backgroundColor: colors.background,
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  marginTop: '1rem'
                }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', color: colors.textPrimary, margin: '0 0 1rem 0', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    Browser Controls
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
                    {['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'].map(browser => (
                      <a
                        key={browser}
                        href={`#${browser.toLowerCase()}-help`}
                        style={{
                          color: colors.accent,
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          padding: '0.5rem',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(139, 92, 246, 0.1)',
                          textAlign: 'center',
                          transition: 'all 0.2s ease',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                        }}
                        onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(139, 92, 246, 0.2)'}
                        onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(139, 92, 246, 0.1)'}
                      >
                        {browser}
                      </a>
                    ))}
                  </div>
                </div>
              </ExpandableSection>

              {/* Other tracking technologies */}
              <ExpandableSection id="tracking-tech" title="Other tracking technologies">
                <p style={{ 
                  fontSize: '1rem',
                  color: colors.textSecondary,
                  lineHeight: '1.7',
                  margin: '0 0 1rem 0',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  Beyond cookies, we may use web beacons (tracking pixels) and similar technologies to understand user behavior and improve our research platform. These technologies often rely on cookies to function properly.
                </p>
              </ExpandableSection>

              {/* Contact Information */}
              <div style={{ 
                backgroundColor: colors.surface,
                borderRadius: '12px',
                border: `1px solid ${colors.border}`,
                padding: '2rem',
                marginTop: '3rem'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: colors.textPrimary,
                  margin: '0 0 1.5rem 0',
                  fontFamily: 'var(--font-literata)'
                }}>
                  Questions About Our Cookie Policy?
                </h2>
                
                <p style={{ 
                  fontSize: '1rem',
                  color: colors.textSecondary,
                  lineHeight: '1.7',
                  margin: '0 0 1.5rem 0',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  If you have questions about our use of cookies or other technologies, we&apos;re here to help.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Mail size={18} color={colors.accent} />
                    <div>
                      <div style={{ fontSize: '0.8rem', color: colors.textTertiary, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Email</div>
                      <a href="mailto:support@esy.com" style={{ color: colors.textPrimary, textDecoration: 'none', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                        support@esy.com
                      </a>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Phone size={18} color={colors.accent} />
                    <div>
                      <div style={{ fontSize: '0.8rem', color: colors.textTertiary, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Phone</div>
                      <a href="tel:+13052045687" style={{ color: colors.textPrimary, textDecoration: 'none', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                        (305) 204-5687
                      </a>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <MapPin size={18} color={colors.accent} style={{ marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: '0.8rem', color: colors.textTertiary, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Address</div>
                      <div style={{ color: colors.textPrimary, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontSize: '0.9rem', lineHeight: '1.4' }}>
                        ESY LLC<br />
                        7901 4th St N ste 8782<br />
                        St. Petersburg, FL 33702
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EsyCookiesPage; 