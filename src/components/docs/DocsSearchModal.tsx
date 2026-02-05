"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Clock, TrendingUp, FileText } from 'lucide-react';

const theme = {
  bg: '#18181b',
  elevated: '#27272a',
  surface: '#1f1f23',
  text: '#fafafa',
  muted: 'rgba(255, 255, 255, 0.7)',
  subtle: 'rgba(255, 255, 255, 0.5)',
  border: 'rgba(255, 255, 255, 0.08)',
  accent: '#00A896',
};

// Mock data - replace with actual search implementation
const allDocs = [
  {
    title: 'Prompt Engineering Guide',
    href: '/docs/prompt-engineering',
    excerpt: 'Master the CRISPE framework to craft powerful AI prompts...',
    category: 'Fundamentals'
  },
  {
    title: 'ChatGPT Prompts for Academic Writing',
    href: '/docs/chatgpt-prompts-for-academic-writing',
    excerpt: 'Copy-paste battle-tested prompts for essays, research papers...',
    category: 'Prompt Library'
  },
  {
    title: 'Write Better Essays with AI',
    href: '/docs/how-to-write-better-essays-with-ai',
    excerpt: 'Transform your writing process from brainstorming to final draft...',
    category: 'Techniques'
  },
  {
    title: 'Agent Workflows in Esy',
    href: '/docs/agent-workflows',
    excerpt: 'Automate complex research tasks with visual workflow builder...',
    category: 'Advanced'
  }
];

const popularDocs = [
  { title: 'Prompt Engineering Guide', href: '/docs/prompt-engineering' },
  { title: 'ChatGPT Prompts', href: '/docs/chatgpt-prompts-for-academic-writing' },
  { title: 'Agent Workflows', href: '/docs/agent-workflows' }
];

interface DocsSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DocsSearchModal({ isOpen, onClose }: DocsSearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filter results based on query
  const results = query.trim()
    ? allDocs.filter(doc =>
        doc.title.toLowerCase().includes(query.toLowerCase()) ||
        doc.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          Math.min(prev + 1, (query ? results.length : popularDocs.length) - 1)
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const items = query ? results : popularDocs;
        if (items[selectedIndex]) {
          window.location.href = items[selectedIndex].href;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, query, results, selectedIndex]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Reset query when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          animation: 'fadeIn 0.2s ease'
        }}
      />
      
      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '640px',
        background: theme.elevated,
        border: `1px solid ${theme.border}`,
        borderRadius: '16px',
        boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5)',
        zIndex: 1001,
        overflow: 'hidden',
        animation: 'slideDown 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}>
        {/* Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1.25rem 1.5rem',
          borderBottom: `1px solid ${theme.border}`
        }}>
          <Search style={{ width: '20px', height: '20px', color: theme.accent }} />
          <input
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '1.125rem',
              color: theme.text,
              fontWeight: 300
            }}
          />
          <kbd style={{
            padding: '0.25rem 0.5rem',
            background: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: '6px',
            fontSize: '0.75rem',
            color: theme.subtle
          }}>
            esc
          </kbd>
        </div>

        {/* Results */}
        <div style={{
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          {query ? (
            // Search Results
            results.length > 0 ? (
              <div style={{ padding: '0.5rem' }}>
                {results.map((doc, index) => (
                  <Link
                    key={doc.href}
                    href={doc.href}
                    onClick={onClose}
                    style={{
                      display: 'block',
                      padding: '0.875rem 1rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      background: selectedIndex === index ? theme.surface : 'transparent',
                      border: `1px solid ${selectedIndex === index ? theme.border : 'transparent'}`,
                      marginBottom: '0.25rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(0, 168, 150, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.accent,
                        flexShrink: 0
                      }}>
                        <FileText style={{ width: '16px', height: '16px' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '0.9375rem',
                          fontWeight: 500,
                          color: theme.text,
                          marginBottom: '0.25rem'
                        }}>
                          {doc.title}
                        </div>
                        <div style={{
                          fontSize: '0.8125rem',
                          color: theme.muted,
                          lineHeight: 1.4
                        }}>
                          {doc.excerpt}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: theme.subtle,
                          marginTop: '0.25rem'
                        }}>
                          {doc.category}
                        </div>
                      </div>
                      <ArrowRight style={{
                        width: '16px',
                        height: '16px',
                        color: theme.subtle,
                        flexShrink: 0,
                        marginTop: '0.5rem'
                      }} />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div style={{
                padding: '3rem 2rem',
                textAlign: 'center',
                color: theme.muted
              }}>
                <Search style={{
                  width: '48px',
                  height: '48px',
                  margin: '0 auto 1rem',
                  color: theme.subtle,
                  opacity: 0.5
                }} />
                <div style={{ fontSize: '0.9375rem', marginBottom: '0.5rem' }}>
                  No results found for &ldquo;{query}&rdquo;
                </div>
                <div style={{ fontSize: '0.8125rem', color: theme.subtle }}>
                  Try searching for something else
                </div>
              </div>
            )
          ) : (
            // Default State: Popular Docs
            <>
              <div style={{ padding: '1rem 1rem 0.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.75rem',
                  color: theme.subtle,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 600
                }}>
                  <TrendingUp className="w-3 h-3" />
                  Popular Pages
                </div>
              </div>
              <div style={{ padding: '0.5rem' }}>
                {popularDocs.map((doc, index) => (
                  <Link
                    key={doc.href}
                    href={doc.href}
                    onClick={onClose}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      background: selectedIndex === index ? theme.surface : 'transparent',
                      border: `1px solid ${selectedIndex === index ? theme.border : 'transparent'}`,
                      marginBottom: '0.25rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{
                      fontSize: '0.875rem',
                      color: theme.text
                    }}>
                      {doc.title}
                    </span>
                    <ArrowRight style={{
                      width: '14px',
                      height: '14px',
                      color: theme.subtle
                    }} />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.25rem',
          borderTop: `1px solid ${theme.border}`,
          fontSize: '0.75rem',
          color: theme.subtle
        }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <kbd style={{
                padding: '0.125rem 0.375rem',
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: '4px',
                fontSize: '0.7rem'
              }}>
                ↑↓
              </kbd>
              <span>Navigate</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <kbd style={{
                padding: '0.125rem 0.375rem',
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: '4px',
                fontSize: '0.7rem'
              }}>
                ↵
              </kbd>
              <span>Select</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </>
  );
}

export default DocsSearchModal;

