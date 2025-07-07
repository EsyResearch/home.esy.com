'use client';
import React, { useState, useEffect } from 'react';
import { Brain, Code, FileText, Globe, Lightbulb } from 'lucide-react';
import GlossaryTermNavigation from '@/components/Glossary/GlossaryTermNavigation';
import GlossaryTermHeader from '@/components/Glossary/GlossaryTermHeader';
import GlossaryTermTabs from '@/components/Glossary/GlossaryTermTabs';
import GlossaryTermSidebar from '@/components/Glossary/GlossaryTermSidebar';
import { Theme, GlossaryTermDetail } from '@/types';

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
  const [scrolled, setScrolled] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentTheme: Theme = {
    bg: '#0a0a0f',
    elevated: '#16161f',
    text: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.7)',
    subtle: 'rgba(255, 255, 255, 0.5)',
    faint: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.05)',
    accent: '#6366f1'
  };

  const categoryMeta: CategoryMetaMap = {
    writing: { name: 'Writing', icon: FileText, color: '#6366f1' },
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
      <GlossaryTermNavigation
        scrolled={scrolled}
        termId={term.id}
        isBookmarked={isBookmarked}
        setIsBookmarked={setIsBookmarked}
        showShareMenu={showShareMenu}
        setShowShareMenu={setShowShareMenu}
        linkCopied={linkCopied}
        currentTheme={currentTheme}
        handleShare={handleShare}
      />

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem 4rem' }}>
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