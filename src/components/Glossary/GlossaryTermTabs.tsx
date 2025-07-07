"use client";
import React from 'react';
import Link from 'next/link';
import { Theme, GlossaryTermDetail } from '@/types';

interface GlossaryTermTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  term: GlossaryTermDetail;
  currentTheme: Theme;
}

const GlossaryTermTabs: React.FC<GlossaryTermTabsProps> = ({
  activeTab,
  setActiveTab,
  term,
  currentTheme
}) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'usage', label: 'Usage' },
    { id: 'examples', label: 'Examples' },
    { id: 'related', label: 'Related' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            {/* Extended Definition */}
            <section style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: currentTheme.text
              }}>
                Extended Definition
              </h3>
              <div style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: currentTheme.muted,
                whiteSpace: 'pre-line'
              }}>
                {term.extendedDefinition}
              </div>
            </section>

            {/* Personal Note */}
            {term.personalNote && (
              <section style={{ marginBottom: '2rem' }}>
                <div style={{
                  padding: '1.5rem',
                  background: currentTheme.elevated,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '8px',
                  borderLeft: `4px solid ${currentTheme.accent}`
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{ fontSize: '1.25rem' }}>💡</span>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: currentTheme.text
                    }}>
                      Personal Note
                    </h4>
                  </div>
                  <p style={{
                    fontSize: '0.938rem',
                    lineHeight: 1.6,
                    color: currentTheme.muted,
                    fontStyle: 'italic',
                    margin: 0
                  }}>
                    {term.personalNote}
                  </p>
                </div>
              </section>
            )}

            {/* Etymology */}
            {term.etymology && (
              <section style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: currentTheme.text
                }}>
                  Etymology
                </h3>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: currentTheme.muted
                }}>
                  {term.etymology}
                </p>
              </section>
            )}
          </div>
        );

      case 'usage':
        return (
          <div>
            {term.usage && (
              <section style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: currentTheme.text
                }}>
                  Common Usage
                </h3>
                <div style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: currentTheme.muted,
                  whiteSpace: 'pre-line'
                }}>
                  {term.usage}
                </div>
              </section>
            )}

            {/* Related Posts */}
            {term.relatedPosts.length > 0 && (
              <section>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: currentTheme.text
                }}>
                  Related Articles
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {term.relatedPosts.map((post, index) => (
                    <Link
                      key={index}
                      href={post.url}
                      style={{
                        display: 'block',
                        padding: '1.25rem',
                        background: currentTheme.elevated,
                        border: `1px solid ${currentTheme.border}`,
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: currentTheme.text,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = currentTheme.accent;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = currentTheme.border;
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        marginBottom: '0.5rem',
                        color: currentTheme.text
                      }}>
                        {post.title}
                      </h4>
                      <div style={{
                        fontSize: '0.875rem',
                        color: currentTheme.subtle
                      }}>
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        );

      case 'examples':
        return (
          <div>
            {term.example && (
              <section style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: currentTheme.text
                }}>
                  Code Example
                </h3>
                <div style={{
                  background: currentTheme.elevated,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '1rem',
                    borderBottom: `1px solid ${currentTheme.border}`,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: currentTheme.subtle
                  }}>
                    Example
                  </div>
                  <pre style={{
                    padding: '1.5rem',
                    margin: 0,
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: currentTheme.text,
                    background: currentTheme.bg,
                    overflow: 'auto'
                  }}>
                    <code>{term.example.code}</code>
                  </pre>
                  {term.example.output && (
                    <>
                      <div style={{
                        padding: '1rem',
                        borderTop: `1px solid ${currentTheme.border}`,
                        borderBottom: `1px solid ${currentTheme.border}`,
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: currentTheme.subtle
                      }}>
                        Output
                      </div>
                      <pre style={{
                        padding: '1.5rem',
                        margin: 0,
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                        color: currentTheme.accent,
                        background: currentTheme.bg,
                        overflow: 'auto'
                      }}>
                        <code>{term.example.output}</code>
                      </pre>
                    </>
                  )}
                </div>
              </section>
            )}
          </div>
        );

      case 'related':
        return (
          <div>
            {term.relatedTerms.length > 0 && (
              <section>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: currentTheme.text
                }}>
                  Related Terms
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem'
                }}>
                  {term.relatedTerms.map((relatedTerm, index) => (
                    <Link
                      key={index}
                      href={`/glossary/${relatedTerm.id}`}
                      style={{
                        display: 'block',
                        padding: '1.25rem',
                        background: currentTheme.elevated,
                        border: `1px solid ${currentTheme.border}`,
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: currentTheme.text,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = currentTheme.accent;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = currentTheme.border;
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: currentTheme.text
                      }}>
                        {relatedTerm.term}
                      </h4>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        borderBottom: `1px solid ${currentTheme.border}`,
        marginBottom: '2rem'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '1rem 1.5rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? `2px solid ${currentTheme.accent}` : '2px solid transparent',
              color: activeTab === tab.id ? currentTheme.accent : currentTheme.muted,
              fontSize: '0.938rem',
              fontWeight: activeTab === tab.id ? 600 : 400,
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.color = currentTheme.text;
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.color = currentTheme.muted;
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default GlossaryTermTabs; 