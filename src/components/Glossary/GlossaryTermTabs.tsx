"use client";
import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Theme, GlossaryTermDetail } from '@/types';

interface GlossaryTermTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  term: GlossaryTermDetail;
  currentTheme: Theme;
  Content?: React.ComponentType;
  content?: string;
  isCompiled?: boolean;
}

const GlossaryTermTabs: React.FC<GlossaryTermTabsProps> = ({
  activeTab,
  setActiveTab,
  term,
  currentTheme,
  Content,
  content,
  isCompiled
}) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'usage', label: 'Usage' },
    { id: 'examples', label: 'Examples' },
    { id: 'history', label: 'History' }
  ];

  // Custom markdown components for callouts
  const markdownComponents = {
    h1: ({ children }) => <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2.5rem 0 1.5rem', color: currentTheme.text, letterSpacing: '-0.01em' }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ fontSize: '1.35rem', fontWeight: 600, margin: '2rem 0 1.25rem', color: currentTheme.text, letterSpacing: '-0.01em' }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ fontSize: '1.15rem', fontWeight: 600, margin: '1.5rem 0 1rem', color: currentTheme.text }}>{children}</h3>,
    p: ({ children }) => <p style={{ marginBottom: '1.25rem', color: currentTheme.text, fontSize: '1.08rem', lineHeight: 1.8 }}>{children}</p>,
    ul: ({ children }) => <ul style={{ marginBottom: '1.25rem', paddingLeft: '1.5rem', color: currentTheme.text }}>{children}</ul>,
    ol: ({ children }) => <ol style={{ marginBottom: '1.25rem', paddingLeft: '1.5rem', color: currentTheme.text }}>{children}</ol>,
    li: ({ children }) => <li style={{ marginBottom: '0.5rem', color: currentTheme.text }}>{children}</li>,
    blockquote: ({ children }) => <blockquote style={{ padding: '1.25rem 1.5rem', margin: '2rem 0', background: currentTheme.elevated, borderRadius: '12px', fontStyle: 'italic', color: currentTheme.text, fontWeight: 500, boxShadow: '0 2px 12px 0 rgba(99,102,241,0.06)' }}>{children}</blockquote>,
    strong: ({ children }) => <strong style={{ fontWeight: 600, color: currentTheme.text }}>{children}</strong>,
    em: ({ children }) => <em style={{ fontStyle: 'italic', color: currentTheme.text }}>{children}</em>,
    code: ({ children }) => <code style={{ background: currentTheme.elevated, padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.98rem', color: currentTheme.accent }}>{children}</code>,
    // Custom callout for 'My Understanding' or similar
    div: ({ node, ...props }) => {
      if (props.className && props.className.includes('callout')) {
        return (
          <div style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(168,85,247,0.10) 100%)',
            border: '1.5px solid ' + currentTheme.accent,
            borderRadius: '16px',
            padding: '1.5rem 2rem',
            margin: '2.5rem 0',
            color: currentTheme.text,
            boxShadow: '0 4px 24px 0 rgba(99,102,241,0.08)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1.25rem',
            fontSize: '1.08rem',
            lineHeight: 1.8
          }}>
            <span style={{ fontSize: '1.5rem', color: currentTheme.accent, marginRight: '0.75rem' }}>💡</span>
            <span>{props.children}</span>
          </div>
        );
      }
      return <div {...props} />;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            {/* Full Markdown Content */}
            {content ? (
              <div style={{
                fontSize: '1.08rem',
                lineHeight: 1.8,
                color: currentTheme.text
              }}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {content}
                </ReactMarkdown>
              </div>
            ) : (
              <div style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: currentTheme.muted,
                fontStyle: 'italic'
              }}>
                No content available for this term.
              </div>
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

            {/* Related Articles */}
            {term.relatedArticles && term.relatedArticles.length > 0 && (
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
                  {term.relatedArticles.map((article, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'block',
                        padding: '1.25rem',
                        background: currentTheme.elevated,
                        border: `1px solid ${currentTheme.border}`,
                        borderRadius: '8px',
                        color: currentTheme.text
                      }}
                    >
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        marginBottom: '0.5rem',
                        color: currentTheme.text
                      }}>
                        {article.title}
                      </h4>
                      <p style={{
                        fontSize: '0.875rem',
                        color: currentTheme.muted,
                        marginBottom: '0.5rem'
                      }}>
                        {article.description}
                      </p>
                      <span style={{
                        fontSize: '0.75rem',
                        color: currentTheme.accent,
                        fontWeight: 500
                      }}>
                        {article.type}
                      </span>
                    </div>
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
                  Examples
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

      case 'content':
        return (
          <div>
            {Content && isCompiled ? (
              <div style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: currentTheme.text
              }}>
                <Content />
              </div>
            ) : content ? (
              <div style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: currentTheme.text,
                whiteSpace: 'pre-wrap'
              }}>
                {content}
              </div>
            ) : (
              <div style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: currentTheme.muted,
                fontStyle: 'italic'
              }}>
                No content available for this term.
              </div>
            )}
          </div>
        );

      case 'history':
        return (
          <div>
            <section style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: currentTheme.text
              }}>
                Version History
              </h3>
              <div style={{
                background: currentTheme.elevated,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                padding: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>📅</span>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: currentTheme.text
                  }}>
                    Last Updated: {term.lastUpdated}
                  </h4>
                </div>
                <p style={{
                  fontSize: '0.938rem',
                  lineHeight: 1.6,
                  color: currentTheme.muted,
                  margin: 0
                }}>
                  This term was last updated on {term.lastUpdated}. Check back for the latest information and improvements.
                </p>
              </div>
            </section>

            {term.updateHistory && term.updateHistory.length > 0 && (
              <section>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: currentTheme.text
                }}>
                  Update History
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {term.updateHistory.map((update, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '1rem',
                        background: currentTheme.elevated,
                        border: `1px solid ${currentTheme.border}`,
                        borderRadius: '8px'
                      }}
                    >
                      <div style={{
                        fontSize: '0.875rem',
                        color: currentTheme.accent,
                        fontWeight: 500,
                        marginBottom: '0.5rem'
                      }}>
                        {update.date}
                      </div>
                      <p style={{
                        fontSize: '0.938rem',
                        color: currentTheme.text,
                        margin: 0
                      }}>
                        {update.change}
                      </p>
                    </div>
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
    <div>
      {/* Tabs Navigation */}
      <nav style={{
        display: 'flex',
        gap: '2.5rem',
        borderBottom: `2px solid ${currentTheme.border}`,
        marginBottom: '2.5rem',
        marginTop: '2.5rem',
        paddingBottom: '0.5rem',
        fontSize: '1.13rem',
        fontWeight: 600
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === tab.id ? currentTheme.accent : currentTheme.muted,
              borderBottom: activeTab === tab.id ? `3px solid ${currentTheme.accent}` : '3px solid transparent',
              padding: '0.5rem 0',
              cursor: 'pointer',
              fontSize: '1.13rem',
              fontWeight: 700,
              transition: 'color 0.2s, border-bottom 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div style={{ marginTop: '2.5rem' }}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default GlossaryTermTabs; 