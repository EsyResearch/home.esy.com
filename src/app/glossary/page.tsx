"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Brain, FileText, Code, Globe, Lightbulb, Search, ArrowRight } from 'lucide-react';
import GlossaryGrid from '@/components/Glossary/GlossaryGrid';
import { Theme, GlossaryTerm, GlossaryCategory, CategoryType } from '@/types';
import { useScrollHeaderSearch } from '@/hooks/useScrollHeaderSearch';

// Navy Calm Light Theme
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

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1024;

  const currentTheme: Theme = navyCalmLightTheme;

  // Glossary terms
  const glossaryTerms: GlossaryTerm[] = [
    {
      id: 'thesis-statement',
      term: 'Thesis Statement',
      category: 'structure',
      definition: 'A concise summary of the main point or claim of an essay, usually appearing in the introduction.',
      views: 2987,
      readTime: 2,
      popularity: 5,
      lastUpdated: '2025-01-15'
    },
    {
      id: 'topic-sentence',
      term: 'Topic Sentence',
      category: 'structure',
      definition: 'The first sentence of a paragraph that introduces the main idea and connects to the thesis.',
      views: 2654,
      readTime: 2,
      popularity: 5,
      lastUpdated: '2025-01-14'
    },
    {
      id: 'argumentative-essay',
      term: 'Argumentative Essay',
      category: 'writing',
      definition: 'A type of essay that presents a clear position on a topic and supports it with evidence and reasoning.',
      views: 2432,
      readTime: 3,
      popularity: 5,
      lastUpdated: '2025-01-13'
    },
    {
      id: 'body-paragraph',
      term: 'Body Paragraph',
      category: 'structure',
      definition: 'The main paragraphs of an essay that develop and support the thesis with evidence and analysis.',
      views: 2198,
      readTime: 2,
      popularity: 4,
      lastUpdated: '2025-01-12'
    },
    {
      id: 'conclusion',
      term: 'Conclusion',
      category: 'structure',
      definition: 'The final paragraph that restates the thesis, summarizes key points, and provides closure.',
      views: 2076,
      readTime: 2,
      popularity: 4,
      lastUpdated: '2025-01-11'
    },
    {
      id: 'introduction',
      term: 'Introduction',
      category: 'structure',
      definition: 'The opening paragraph that provides background, engages the reader, and presents the thesis.',
      views: 1987,
      readTime: 2,
      popularity: 5,
      lastUpdated: '2025-01-10'
    },
    {
      id: 'hook',
      term: 'Hook',
      category: 'writing',
      definition: 'An engaging opening sentence or phrase designed to capture the reader\'s attention.',
      views: 1876,
      readTime: 2,
      popularity: 4,
      lastUpdated: '2025-01-09'
    },
    {
      id: 'transition',
      term: 'Transition',
      category: 'writing',
      definition: 'Words or phrases that connect ideas and create smooth flow between sentences and paragraphs.',
      views: 1765,
      readTime: 2,
      popularity: 4,
      lastUpdated: '2025-01-08'
    },
    {
      id: 'evidence',
      term: 'Evidence',
      category: 'research',
      definition: 'Facts, statistics, examples, or expert opinions used to support claims in an essay.',
      views: 1654,
      readTime: 3,
      popularity: 5,
      lastUpdated: '2025-01-07'
    },
    {
      id: 'citation',
      term: 'Citation',
      category: 'citation',
      definition: 'A reference to a source of information used in academic writing to give credit to original authors.',
      views: 1543,
      readTime: 2,
      popularity: 5,
      lastUpdated: '2025-01-06'
    },
    {
      id: 'mla-format',
      term: 'MLA Format',
      category: 'citation',
      definition: 'A citation style guide published by the Modern Language Association for humanities papers.',
      views: 1432,
      readTime: 3,
      popularity: 4,
      lastUpdated: '2025-01-05'
    },
    {
      id: 'apa-format',
      term: 'APA Format',
      category: 'citation',
      definition: 'A citation style guide by the American Psychological Association for social sciences papers.',
      views: 1321,
      readTime: 3,
      popularity: 4,
      lastUpdated: '2025-01-04'
    },
    {
      id: 'works-cited',
      term: 'Works Cited',
      category: 'citation',
      definition: 'A list of all sources referenced in an essay, formatted according to a specific style guide.',
      views: 1298,
      readTime: 2,
      popularity: 4,
      lastUpdated: '2025-01-03'
    },
    {
      id: 'plagiarism',
      term: 'Plagiarism',
      category: 'citation',
      definition: 'The practice of using someone else\'s work or ideas without proper attribution.',
      views: 1187,
      readTime: 2,
      popularity: 5,
      lastUpdated: '2025-01-02'
    },
    {
      id: 'paraphrase',
      term: 'Paraphrase',
      category: 'writing',
      definition: 'Restating someone else\'s ideas in your own words while maintaining the original meaning.',
      views: 1176,
      readTime: 2,
      popularity: 4,
      lastUpdated: '2025-01-01'
    },
    {
      id: 'quote',
      term: 'Quote',
      category: 'citation',
      definition: 'The exact words from a source, enclosed in quotation marks and properly attributed.',
      views: 1165,
      readTime: 2,
      popularity: 4,
      lastUpdated: '2024-12-31'
    },
    {
      id: 'analysis',
      term: 'Analysis',
      category: 'writing',
      definition: 'The process of examining and interpreting evidence to support your argument.',
      views: 1154,
      readTime: 3,
      popularity: 4,
      lastUpdated: '2024-12-30'
    },
    {
      id: 'counterargument',
      term: 'Counterargument',
      category: 'writing',
      definition: 'An opposing viewpoint that challenges your thesis, addressed to strengthen your argument.',
      views: 1143,
      readTime: 3,
      popularity: 4,
      lastUpdated: '2024-12-29'
    },
    {
      id: 'outline',
      term: 'Outline',
      category: 'structure',
      definition: 'A structured plan that organizes your main points and supporting details before writing.',
      views: 1132,
      readTime: 2,
      popularity: 4,
      lastUpdated: '2024-12-28'
    },
    {
      id: 'brainstorming',
      term: 'Brainstorming',
      category: 'writing',
      definition: 'A creative process for generating ideas and topics before beginning to write.',
      views: 1121,
      readTime: 2,
      popularity: 3,
      lastUpdated: '2024-12-27'
    },
    {
      id: 'revision',
      term: 'Revision',
      category: 'writing',
      definition: 'The process of reviewing and improving content, organization, and clarity of a draft.',
      views: 1110,
      readTime: 3,
      popularity: 4,
      lastUpdated: '2024-12-26'
    },
    {
      id: 'proofreading',
      term: 'Proofreading',
      category: 'grammar',
      definition: 'The final step of checking for spelling, grammar, and punctuation errors.',
      views: 1099,
      readTime: 2,
      popularity: 4,
      lastUpdated: '2024-12-25'
    },
    {
      id: 'subject-verb-agreement',
      term: 'Subject-Verb Agreement',
      category: 'grammar',
      definition: 'The grammatical rule that subjects and verbs must agree in number (singular or plural).',
      views: 1088,
      readTime: 2,
      popularity: 3,
      lastUpdated: '2024-12-24'
    },
    {
      id: 'comma-splice',
      term: 'Comma Splice',
      category: 'grammar',
      definition: 'A grammatical error where two independent clauses are incorrectly joined with only a comma.',
      views: 1077,
      readTime: 2,
      popularity: 3,
      lastUpdated: '2024-12-23'
    },
    {
      id: 'run-on-sentence',
      term: 'Run-on Sentence',
      category: 'grammar',
      definition: 'A sentence that contains multiple independent clauses without proper punctuation or conjunctions.',
      views: 1066,
      readTime: 2,
      popularity: 3,
      lastUpdated: '2024-12-22'
    },
    {
      id: 'parallel-structure',
      term: 'Parallel Structure',
      category: 'grammar',
      definition: 'Using the same grammatical form for similar elements in a sentence or series.',
      views: 1055,
      readTime: 2,
      popularity: 3,
      lastUpdated: '2024-12-21'
    },
    {
      id: 'active-voice',
      term: 'Active Voice',
      category: 'grammar',
      definition: 'A sentence construction where the subject performs the action expressed by the verb.',
      views: 1044,
      readTime: 2,
      popularity: 4,
      lastUpdated: '2024-12-20'
    },
    {
      id: 'passive-voice',
      term: 'Passive Voice',
      category: 'grammar',
      definition: 'A sentence construction where the subject receives the action expressed by the verb.',
      views: 1033,
      readTime: 2,
      popularity: 3,
      lastUpdated: '2024-12-19'
    },
    {
      id: 'peer-review',
      term: 'Peer Review',
      category: 'research',
      definition: 'The process of having classmates or colleagues evaluate and provide feedback on your writing.',
      views: 1022,
      readTime: 2,
      popularity: 4,
      lastUpdated: '2024-12-18'
    },
    {
      id: 'research-question',
      term: 'Research Question',
      category: 'research',
      definition: 'A focused question that guides your research and helps develop your thesis statement.',
      views: 1011,
      readTime: 3,
      popularity: 4,
      lastUpdated: '2024-12-17'
    }
  ];

  const categories: GlossaryCategory[] = [
    { id: 'all', name: 'All', icon: null, color: currentTheme.subtle },
    { id: 'writing', name: 'Writing', icon: FileText, color: '#00A896' },
    { id: 'structure', name: 'Structure', icon: Brain, color: '#0A2540' },
    { id: 'research', name: 'Research', icon: Globe, color: '#2A9D8F' },
    { id: 'citation', name: 'Citation', icon: Lightbulb, color: '#F59E0B' },
    { id: 'grammar', name: 'Grammar', icon: Code, color: '#6C757D' }
  ];

  // Filter and sort
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

  // Alphabet index — gather unique first letters
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
        {/* Grid Background Pattern */}
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
          {/* Breadcrumb */}
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

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: '1.25rem',
            letterSpacing: '-0.02em'
          }}>
            Writing <span style={{ color: currentTheme.accent }}>Glossary</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)',
            lineHeight: 1.6,
            color: currentTheme.muted,
            maxWidth: '600px',
            marginBottom: '2.5rem'
          }}>
            Essential terms and concepts for academic writing and essay composition. 
            From thesis statements to citation formats.
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
          {/* Search Input */}
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

          {/* Sort Dropdown */}
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

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Term Count */}
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
      {!searchQuery && activeFilter === 'all' && sortBy === 'alphabetical' && (
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

      {/* ─── Terms Grid ─── */}
      <main style={{ paddingBottom: '4rem' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <GlossaryGrid
            terms={sortedTerms}
            categories={categories}
            currentTheme={currentTheme}
            hoveredTerm={hoveredTerm}
            setHoveredTerm={setHoveredTerm}
            getCategoryColor={getCategoryColor}
            windowWidth={windowWidth}
          />
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
            Master academic writing with Esy
          </h2>
          
          <p style={{
            fontSize: '1.0625rem',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 2rem'
          }}>
            Go beyond definitions. Use Esy&apos;s structured workflows to produce essays, research briefs, and visual artifacts — publication-ready from the start.
          </p>

          <Link
            href="/about"
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
            Learn more about Esy
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default GlossaryPage;
