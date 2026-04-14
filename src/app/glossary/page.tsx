"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Bot, GitBranch, ShieldCheck, Server, FileOutput, Search, ArrowRight } from 'lucide-react';
import GlossaryGrid from '@/components/Glossary/GlossaryGrid';
import { Theme, GlossaryTerm, GlossaryCategory, CategoryType } from '@/types';
import { useScrollHeaderSearch } from '@/hooks/useScrollHeaderSearch';

const navyCalmLightTheme: Theme = {
  bg: '#FFFFFF',
  elevated: '#F8F9FA',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  faint: 'rgba(10, 37, 64, 0.4)',
  border: 'rgba(10, 37, 64, 0.1)',
  accent: '#00A896',
};

const GlossaryPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('alphabetical');
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useScrollHeaderSearch(searchBarRef);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentTheme: Theme = navyCalmLightTheme;

  const glossaryTerms: GlossaryTerm[] = [
    {
      id: 'agentic-workflow',
      term: 'Agentic Workflow',
      category: 'workflows',
      definition: 'A multi-step automated process where AI agents execute tasks, make decisions, and hand off results without human intervention at each stage.',
      views: 0,
      readTime: 4,
      popularity: 5,
      lastUpdated: '2026-04-14'
    },
    {
      id: 'hallucination',
      term: 'Hallucination',
      category: 'verification',
      definition: 'When an AI model generates plausible-sounding but factually incorrect information, including fabricated citations, invented data, or false claims.',
      views: 0,
      readTime: 5,
      popularity: 5,
      lastUpdated: '2026-04-14'
    },
    {
      id: 'citation-verification',
      term: 'Citation Verification',
      category: 'verification',
      definition: 'The automated process of validating that citations in AI-generated content reference real, accessible sources with accurate metadata.',
      views: 0,
      readTime: 5,
      popularity: 5,
      lastUpdated: '2026-04-14'
    },
    {
      id: 'structured-output',
      term: 'Structured Output',
      category: 'output',
      definition: 'AI-generated content delivered in a predefined, typed format — not free-form text — with consistent schema, metadata, and audit information.',
      views: 0,
      readTime: 4,
      popularity: 4,
      lastUpdated: '2026-04-14'
    },
    {
      id: 'pipeline-orchestration',
      term: 'Pipeline Orchestration',
      category: 'infrastructure',
      definition: 'The system that coordinates the execution order, data flow, and error handling across multiple agents in an agentic workflow.',
      views: 0,
      readTime: 4,
      popularity: 4,
      lastUpdated: '2026-04-14'
    },
  ];

  const categories: GlossaryCategory[] = [
    { id: 'all', name: 'All', icon: null, color: currentTheme.subtle },
    { id: 'agents', name: 'Agents', icon: Bot, color: '#00A896' },
    { id: 'workflows', name: 'Workflows', icon: GitBranch, color: '#0A2540' },
    { id: 'verification', name: 'Verification', icon: ShieldCheck, color: '#2A9D8F' },
    { id: 'infrastructure', name: 'Infrastructure', icon: Server, color: '#6C757D' },
    { id: 'output', name: 'Output', icon: FileOutput, color: '#F59E0B' }
  ];

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesCategory = activeFilter === 'all' || term.category === activeFilter;
    const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedTerms = [...filteredTerms].sort((a, b) => {
    if (sortBy === 'alphabetical') return a.term.localeCompare(b.term);
    if (sortBy === 'popular') return b.views - a.views;
    if (sortBy === 'recent') return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    return 0;
  });

  const getCategoryColor = (category: CategoryType) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || currentTheme.subtle;
  };

  const alphabetLetters = Array.from(
    new Set(glossaryTerms.map(t => t.term[0].toUpperCase()))
  ).sort();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: 'var(--font-inter)'
    }}>

      {/* ─── Hero Section ─── */}
      <section ref={searchBarRef} style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '7rem 2rem 3rem',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(10, 37, 64, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 37, 64, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
            fontSize: '0.875rem',
            color: currentTheme.subtle
          }}>
            <Link href="/" style={{ color: currentTheme.subtle, textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <span style={{ color: currentTheme.muted }}>Glossary</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: '1.25rem',
            letterSpacing: '-0.02em'
          }}>
            AI &amp; Agentic <span style={{ color: currentTheme.accent }}>Glossary</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)',
            lineHeight: 1.6,
            color: currentTheme.muted,
            maxWidth: '600px',
            marginBottom: '2.5rem'
          }}>
            Definitions for agentic workflows, AI infrastructure, and verification systems. Built for engineers.
          </p>
        </div>
      </section>

      {/* ─── Search & Filters ─── */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem 1.5rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{
            flex: '1 1 280px',
            minWidth: '200px',
            maxWidth: '400px',
            position: 'relative'
          }}>
            <Search size={16} style={{
              position: 'absolute',
              left: '0.875rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: currentTheme.subtle,
              pointerEvents: 'none'
            }} />
            <input
              type="text"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.625rem 1rem 0.625rem 2.5rem',
                background: currentTheme.elevated,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '10px',
                color: currentTheme.text,
                fontSize: '0.875rem',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = currentTheme.accent;
                e.target.style.boxShadow = `0 0 0 3px ${currentTheme.accent}15`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = currentTheme.border;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.625rem 2.25rem 0.625rem 0.875rem',
              background: currentTheme.elevated,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '10px',
              color: currentTheme.text,
              fontSize: '0.875rem',
              cursor: 'pointer',
              outline: 'none',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.25em 1.25em',
              transition: 'all 0.2s ease'
            }}
          >
            <option value="alphabetical">A–Z</option>
            <option value="popular">Most Viewed</option>
            <option value="recent">Recently Updated</option>
          </select>

          <div style={{ flex: 1 }} />

          <span style={{
            fontSize: '0.8125rem',
            color: currentTheme.subtle,
            whiteSpace: 'nowrap'
          }}>
            {sortedTerms.length} {sortedTerms.length === 1 ? 'term' : 'terms'}
            {searchQuery && ` for "${searchQuery}"`}
          </span>
        </div>
      </section>

      {/* ─── Category Filter Pills ─── */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem 2.5rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          paddingBottom: '2rem',
          borderBottom: `1px solid ${currentTheme.border}`
        }}>
          {categories.map(category => {
            const isActive = activeFilter === category.id;
            const IconComponent = category.icon;

            return (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '24px',
                  border: `1px solid ${isActive ? 'transparent' : currentTheme.border}`,
                  backgroundColor: isActive ? currentTheme.accent : 'transparent',
                  color: isActive ? '#FFFFFF' : currentTheme.muted,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                {IconComponent && <IconComponent size={14} />}
                {category.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── Alphabet Quick Nav ─── */}
      {!searchQuery && activeFilter === 'all' && sortBy === 'alphabetical' && alphabetLetters.length > 0 && (
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem 2rem'
        }}>
          <div style={{
            display: 'flex',
            gap: '0.25rem',
            flexWrap: 'wrap'
          }}>
            {alphabetLetters.map(letter => (
              <button
                key={letter}
                onClick={() => {
                  const el = document.getElementById(`letter-${letter}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'transparent',
                  color: currentTheme.accent,
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = currentTheme.elevated;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {letter}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ─── Terms Grid / Empty State ─── */}
      <main style={{ paddingBottom: '4rem' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          {sortedTerms.length > 0 ? (
            <GlossaryGrid
              terms={sortedTerms}
              categories={categories}
              currentTheme={currentTheme}
              hoveredTerm={hoveredTerm}
              setHoveredTerm={setHoveredTerm}
              getCategoryColor={getCategoryColor}
              windowWidth={windowWidth}
            />
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: currentTheme.subtle
            }}>
              <Bot size={48} strokeWidth={1} style={{ marginBottom: '1.5rem', opacity: 0.4 }} />
              <p style={{
                fontSize: '1.25rem',
                fontWeight: 500,
                color: currentTheme.text,
                marginBottom: '0.75rem'
              }}>
                Glossary launching soon
              </p>
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                maxWidth: '480px',
                margin: '0 auto'
              }}>
                We&apos;re building definitions for agentic workflows, AI infrastructure, and verification systems. Check back shortly.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* ─── CTA Section ─── */}
      <section style={{
        backgroundColor: '#0A2540',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '4rem 2rem'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 400,
            marginBottom: '1.25rem',
            letterSpacing: '-0.01em',
            color: '#FFFFFF'
          }}>
            See the glossary in action
          </h2>
          
          <p style={{
            fontSize: '1.0625rem',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 2rem'
          }}>
            These aren&apos;t just definitions — they&apos;re the building blocks of Esy&apos;s agentic workflows. See how they come together in real artifacts.
          </p>

          <Link
            href="/essays/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 1.75rem',
              backgroundColor: '#00D4AA',
              color: '#0A2540',
              borderRadius: '10px',
              fontSize: '0.9375rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#00A896';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#00D4AA';
              e.currentTarget.style.color = '#0A2540';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            View Artifacts
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default GlossaryPage;
