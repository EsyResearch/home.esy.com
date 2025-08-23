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