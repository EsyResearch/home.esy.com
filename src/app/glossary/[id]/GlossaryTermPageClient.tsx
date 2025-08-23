'use client';
import React, { useState } from 'react';
import { Brain, Code, FileText, Globe, Lightbulb } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import GlossaryTermHeader from '@/components/Glossary/GlossaryTermHeader';
import GlossaryTermTabs from '@/components/Glossary/GlossaryTermTabs';
import GlossaryTermSidebar from '@/components/Glossary/GlossaryTermSidebar';
import { Theme, GlossaryTermDetail } from '@/types';
import Link from 'next/link';

interface CategoryMeta {
  name: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
}

interface CategoryMetaMap {
  [key: string]: CategoryMeta;
}

interface GlossaryTermPageClientProps {
  term: GlossaryTermDetail;
  Content?: React.ComponentType;
  content?: string;
  isCompiled?: boolean;
}

const GlossaryTermPageClient = ({ term, Content, content, isCompiled }: GlossaryTermPageClientProps) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');



  const currentTheme: Theme = {
    bg: '#0a0a0f',
    elevated: '#16161f',
    text: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.7)',
    subtle: 'rgba(255, 255, 255, 0.5)',
    faint: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.05)',
    accent: '#8b5cf6'
  };

  const categoryMeta: CategoryMetaMap = {
    writing: { name: 'Writing', icon: FileText, color: '#8b5cf6' },
    structure: { name: 'Structure', icon: Brain, color: '#f59e0b' },
    research: { name: 'Research', icon: Globe, color: '#ef4444' },
    citation: { name: 'Citation', icon: Lightbulb, color: '#10b981' },
    grammar: { name: 'Grammar', icon: Code, color: '#8b5cf6' }
  };

  const currentCategory = categoryMeta[term.category];

  const handleShare = async (platform: string) => {
    if (platform === 'link') {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Learning about ${term.term} - ${term.definition}`)}&url=${encodeURIComponent(window.location.href)}`);
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`);
    }
    setShowShareMenu(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Breadcrumbs */}
      <div style={{ marginTop: '6rem', marginBottom: '0.5rem' }}>
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Glossary', href: '/glossary' },
            { label: term.term, isCurrent: true }
          ]}
        />
      </div>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 2rem 4rem' }}>
        {/* Sub-header: Breadcrumbs and Share icon (now above the term title, not sticky) */}
        <div
          style={{
            width: '100%',
            borderBottom: `1.5px solid ${currentTheme.border}`,
            background: 'rgba(10,10,15,0.97)',
            display: 'flex',
            alignItems: 'center',
            height: 'auto',
            paddingTop: '1.1rem',
            paddingBottom: '1.1rem',
            justifyContent: 'space-between',
            boxShadow: '0 1px 0 0 ' + currentTheme.border,
            marginBottom: '3.5rem'
          }}
        >

          {/* Share Icon */}
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            style={{
              background: 'transparent',
              border: 'none',
              color: currentTheme.text,
              cursor: 'pointer',
              padding: '0.4rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '1.1rem',
              transition: 'background 0.15s',
              position: 'relative'
            }}
            aria-label="Share"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
          </button>
          {/* Share Menu (optional, if open) */}
          {showShareMenu && (
            <div style={{
              position: 'absolute',
              top: '110%',
              right: 0,
              marginTop: '0.5rem',
              padding: '0.5rem',
              background: currentTheme.elevated,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '8px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              minWidth: '160px',
              zIndex: 10
            }}>
              <button
                onClick={() => handleShare('link')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  width: '100%',
                  padding: '0.75rem',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  color: linkCopied ? currentTheme.accent : currentTheme.text,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 1 7 7l-1 1a5 5 0 0 1-7-7"/><path d="M14 11a5 5 0 0 0-7-7l-1 1a5 5 0 0 0 7 7"/></svg>
                {linkCopied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '4rem' }}>
          {/* Left Column - Main Content */}
          <div>
            <GlossaryTermHeader
              term={term.term}
              pronunciation={term.pronunciation}
              category={term.category}
              definition={term.definition}
              categoryMeta={currentCategory}
              currentTheme={currentTheme}
            />

            <GlossaryTermTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              term={term}
              currentTheme={currentTheme}
              Content={Content}
              content={content}
              isCompiled={isCompiled}
            />
          </div>

          {/* Right Column - Sidebar */}
          <GlossaryTermSidebar
            term={term}
            currentTheme={currentTheme}
          />
        </div>
      </main>
    </div>
  );
};

export default GlossaryTermPageClient; 