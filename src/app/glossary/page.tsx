"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Brain, FileText, Code, Globe, Lightbulb, Search, Filter } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import GlossaryGrid from '@/components/Glossary/GlossaryGrid';
import GlossarySidebar from '@/components/Glossary/GlossarySidebar';
import { Theme, GlossaryTerm, GlossaryCategory, TermOfDay, CategoryType } from '@/types';
import { useHeaderSearch } from '@/contexts/HeaderSearchContext';

const GlossaryPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('alphabetical');
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const { setShowHeaderSearch } = useHeaderSearch();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      // Check if search bar is visible
      if (searchBarRef.current) {
        const rect = searchBarRef.current.getBoundingClientRect();
        setShowHeaderSearch(rect.bottom < 0);
      }
    };
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [setShowHeaderSearch]);

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

  // Metrics summary
  const metrics = {
    totalTerms: 30,
    totalViews: '8.7k',
    avgReadTime: '2.3 min',
    lastUpdated: 'Today'
  };

  // Sample glossary terms - Essay writing focused
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
    { id: 'writing', name: 'Writing', icon: FileText, color: '#8b5cf6' },
    { id: 'structure', name: 'Structure', icon: Brain, color: '#f59e0b' },
    { id: 'research', name: 'Research', icon: Globe, color: '#ef4444' },
    { id: 'citation', name: 'Citation', icon: Lightbulb, color: '#10b981' },
    { id: 'grammar', name: 'Grammar', icon: Code, color: '#8b5cf6' }
  ];

  // Filter and sort terms
  const filteredTerms = glossaryTerms.filter(term => {
    const matchesCategory = activeFilter === 'all' || term.category === activeFilter;
    const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort terms
  const sortedTerms = [...filteredTerms].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.term.localeCompare(b.term);
    } else if (sortBy === 'popular') {
      return b.views - a.views;
    } else if (sortBy === 'recent') {
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    }
    return 0;
  });

  const getCategoryColor = (category: CategoryType) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || currentTheme.subtle;
  };

  const getPopularityDots = (popularity: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{
          display: 'inline-block',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: i < popularity ? currentTheme.accent : currentTheme.border,
          marginRight: '2px'
        }}
      />
    ));
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'k';
    }
    return views.toString();
  };

  // Sidebar data (Term of Day, Recent Terms)
  const termOfDay: TermOfDay = {
    term: 'Thesis Statement',
    definition: 'A concise summary of the main point or claim of an essay, usually appearing in the introduction.',
    category: 'structure',
    personalNote: 'A strong thesis statement is the foundation of any successful essay.',
    views: 2987,
    isNew: true
  };

  const recentTerms = glossaryTerms.slice(0, 5).map(t => ({ 
    term: t.term, 
    category: t.category, 
    views: t.views 
  }));

  return (
    <div className="academic-page" style={{
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
            { label: 'Glossary', isCurrent: true }
          ]}
        />
      </div>
      
      <header style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                marginBottom: '0.5rem',
                color: currentTheme.text,
                fontFamily: 'var(--font-literata)'
              }}>
                Glossary
              </h1>
              <p style={{
                fontSize: '1.125rem',
                color: currentTheme.muted,
                maxWidth: '600px',
                lineHeight: 1.6,
                fontWeight: 300
              }}>
                Essential terms and concepts for academic writing and essay composition. 
                From thesis statements to citation formats.
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '2rem',
              fontSize: '0.875rem',
              color: currentTheme.subtle
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>{metrics.totalTerms} terms</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>{metrics.totalViews} views</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>{metrics.avgReadTime} avg</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Updated {metrics.lastUpdated}</span>
              </div>
            </div>
          </div>
          
          {/* Search and Controls */}
          <div ref={searchBarRef} style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            {/* Search */}
            <div style={{
              flex: '1 1 300px',
              minWidth: '250px',
              position: 'relative'
            }}>
              <Search size={18} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: currentTheme.subtle,
                pointerEvents: 'none',
                zIndex: 1
              }} />
              <input
                type="text"
                placeholder="Search terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.75rem',
                  background: currentTheme.elevated,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '8px',
                  color: currentTheme.text,
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = currentTheme.accent;
                  e.target.style.boxShadow = `0 0 0 3px ${currentTheme.accent}20`;
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
                padding: '0.75rem 1rem',
                background: currentTheme.elevated,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                color: currentTheme.text,
                fontSize: '0.875rem',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.2s',
                minWidth: '140px',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = currentTheme.accent;
                e.target.style.boxShadow = `0 0 0 3px ${currentTheme.accent}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = currentTheme.border;
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="alphabetical">A-Z</option>
              <option value="popular">Most Viewed</option>
              <option value="recent">Recently Updated</option>
            </select>
            
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                background: showFilters ? currentTheme.accent : currentTheme.elevated,
                border: `1px solid ${showFilters ? currentTheme.accent : currentTheme.border}`,
                borderRadius: '8px',
                color: showFilters ? 'white' : currentTheme.text,
                fontSize: '0.875rem',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!showFilters) {
                  e.currentTarget.style.background = currentTheme.accent;
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (!showFilters) {
                  e.currentTarget.style.background = currentTheme.elevated;
                  e.currentTarget.style.color = currentTheme.text;
                }
              }}
            >
              <Filter size={16} />
              Categories
            </button>
          </div>
          
          {/* Category Filters */}
          {showFilters && (
            <div style={{
              marginBottom: '2rem',
              padding: '1rem',
              background: currentTheme.elevated,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '8px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {categories.map(category => {
                const isActive = activeFilter === category.id;
                const IconComponent = category.icon;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      background: isActive ? category.color : 'transparent',
                      border: `1px solid ${isActive ? category.color : currentTheme.border}`,
                      borderRadius: '6px',
                      color: isActive ? 'white' : currentTheme.text,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = category.color;
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor = category.color;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = currentTheme.text;
                        e.currentTarget.style.borderColor = currentTheme.border;
                      }
                    }}
                  >
                    {IconComponent && <IconComponent size={16} color={isActive ? 'white' : category.color} />}
                    {category.name}
                  </button>
                );
              })}
            </div>
          )}
          
          <div style={{
            fontSize: '0.813rem',
            color: currentTheme.subtle,
            marginBottom: '1rem'
          }}>
            Showing {sortedTerms.length} {sortedTerms.length === 1 ? 'term' : 'terms'}
            {searchQuery && ` for "${searchQuery}"`}
            {activeFilter !== 'all' && ` in ${categories.find(c => c.id === activeFilter)?.name}`}
          </div>
        </div>
      </header>
      
      <main style={{ paddingBottom: '6rem' }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          display: windowWidth >= 1024 ? 'grid' : 'block',
          gridTemplateColumns: windowWidth >= 1024 ? '3fr 1fr' : undefined,
          gap: windowWidth >= 1024 ? '2rem' : undefined
        }}>
          <div>
            <GlossaryGrid
              terms={sortedTerms}
              categories={categories}
              currentTheme={currentTheme}
              hoveredTerm={hoveredTerm}
              setHoveredTerm={setHoveredTerm}
              getCategoryColor={getCategoryColor}
              getPopularityDots={getPopularityDots}
              formatViews={formatViews}
              windowWidth={windowWidth}
            />
          </div>
          
          <div style={{ marginTop: windowWidth < 1024 ? '2rem' : 0 }}>
            <GlossarySidebar
              termOfDay={termOfDay}
              recentTerms={recentTerms}
              currentTheme={currentTheme}
              getCategoryColor={getCategoryColor}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default GlossaryPage; 