'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  Clock,
  BarChart3,
  BookOpen,
  Sparkles,
  Layers,
  Zap,
  GraduationCap,
} from 'lucide-react';
import { useScrollHeaderSearch } from '@/hooks/useScrollHeaderSearch';
import {
  templateCategories,
  getAllTemplates,
  getTemplatesByCategory,
  getFeaturedTemplates,
  searchTemplates,
  getAllSubcategories,
} from '@/lib/templates';
import { TemplateDifficulty } from '@/lib/templates/types';
import {
  TemplateGrid,
  TemplateCategoryNav,
  TemplateFilters,
  TemplateSearch,
} from '@/components/templates';

// Navy Calm Light Theme
const theme = {
  bg: '#FFFFFF',
  elevated: '#F8FAFC',
  surface: '#F1F5F9',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  faint: 'rgba(10, 37, 64, 0.35)',
  border: 'rgba(10, 37, 64, 0.08)',
  divider: 'rgba(10, 37, 64, 0.05)',
  accent: '#00A896',
  accentLight: 'rgba(0, 168, 150, 0.08)',
  accentBorder: 'rgba(0, 168, 150, 0.2)',
};

// Intent-based creation paths with enhanced metadata
const creationPaths = [
  {
    id: 'visual-essays',
    title: 'Visual Essays',
    tagline: 'Scroll-driven narratives',
    description: 'Research + writing + visuals in immersive, explorable stories',
    href: '/templates?category=visual-essay',
    icon: FileText,
    category: 'visual-essay',
    count: 12,
  },
  // {
  //   id: 'timelines',
  //   title: 'Timelines',
  //   tagline: 'Chronological narratives',
  //   description: 'Historical overviews and event sequences made visual',
  //   href: '/templates?category=timeline',
  //   icon: Clock,
  //   category: 'timeline',
  //   count: 8,
  // },
  {
    id: 'infographics',
    title: 'Infographics',
    tagline: 'Data-driven visuals',
    description: 'Complex information distilled into clear visual summaries',
    href: '/templates?category=infographic',
    icon: BarChart3,
    category: 'infographic',
    count: 6,
  },
  {
    id: 'academic-essays',
    title: 'Academic Essays',
    tagline: 'Scholarly writing',
    description: 'Research-backed essays with proper structure, citations, and academic rigor',
    href: '/templates?category=academic-essay',
    icon: GraduationCap,
    category: 'academic-essay',
    count: 15,
  },
  // {
  //   id: 'explainers',
  //   title: 'Explainers',
  //   tagline: 'Clear breakdowns',
  //   description: 'Complex topics made accessible for any audience',
  //   href: '/templates?category=explainer',
  //   icon: BookOpen,
  //   category: 'explainer',
  //   count: 10,
  // },
];

// Value propositions
const valueProps = [
  {
    icon: Layers,
    title: 'Multi-step workflows',
    description: 'Not single prompts — guided processes from idea to output',
  },
  {
    icon: Zap,
    title: 'Run or customize',
    description: 'Use as-is for speed, or adjust to fit your exact needs',
  },
  {
    icon: Sparkles,
    title: 'Reliable results',
    description: 'Structured approaches that produce trustworthy artifacts',
  },
];

export default function TemplatesClient() {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [activeDifficulty, setActiveDifficulty] = useState<TemplateDifficulty | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  useScrollHeaderSearch(searchBarRef);

  const subcategories = useMemo(() => {
    if (activeCategory === 'all') return getAllSubcategories();
    const category = templateCategories.find((c) => c.id === activeCategory);
    return category?.subcategories || [];
  }, [activeCategory]);

  const filteredTemplates = useMemo(() => {
    let templates = searchQuery
      ? searchTemplates(searchQuery)
      : activeCategory === 'all'
      ? getAllTemplates()
      : getTemplatesByCategory(activeCategory);

    if (activeSubcategory) {
      templates = templates.filter((t) => t.subcategory === activeSubcategory);
    }
    if (activeDifficulty) {
      templates = templates.filter((t) => t.difficulty === activeDifficulty);
    }
    return templates;
  }, [activeCategory, activeSubcategory, activeDifficulty, searchQuery]);

  const featuredTemplates = getFeaturedTemplates().slice(0, 3);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveSubcategory(null);
    setTimeout(() => {
      document.getElementById('browse-templates')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleClearFilters = () => {
    setActiveSubcategory(null);
    setActiveDifficulty(null);
  };

  const handlePathClick = (category: string) => {
    setActiveCategory(category);
    setActiveSubcategory(null);
    setTimeout(() => {
      document.getElementById('browse-templates')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, color: theme.text }}>
      {/* Hero Section - Clean, Minimal */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 3rem)',
          paddingTop: 'clamp(6rem, 12vh, 8rem)',
          paddingBottom: 'clamp(4rem, 8vh, 6rem)',
        }}
      >
        {/* Main Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(2.75rem, 7vw, 4rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            color: theme.text,
            maxWidth: '700px',
          }}
        >
          From idea to artifact
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
            lineHeight: 1.7,
            color: theme.muted,
            maxWidth: '580px',
            marginBottom: '2.5rem',
          }}
        >
          Templates are step-by-step workflows that guide Esy from your initial concept to a polished,
          research-backed result you can trust.
        </p>

        {/* Search */}
        <div ref={searchBarRef} style={{ maxWidth: '520px' }}>
          <TemplateSearch
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            placeholder="Search by topic, goal, or output type..."
          />
        </div>
      </section>

      {/* Value Props - Subtle, Horizontal */}
      <section
        style={{
          borderTop: `1px solid ${theme.divider}`,
          borderBottom: `1px solid ${theme.divider}`,
          background: theme.elevated,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(2rem, 4vh, 3rem) clamp(1.5rem, 5vw, 3rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {valueProps.map((prop, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <prop.icon size={18} style={{ color: theme.accent }} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: theme.text, marginBottom: '0.25rem' }}>
                  {prop.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: theme.subtle, lineHeight: 1.5, margin: 0 }}>
                  {prop.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Creation Paths - Primary Navigation */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 3rem)',
        }}
      >
        <div style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: theme.text,
              marginBottom: '0.5rem',
            }}
          >
            What do you want to create?
          </h2>
          <p style={{ fontSize: '1rem', color: theme.subtle }}>
            Choose a path to see relevant templates
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
          }}
        >
          {creationPaths.map((path) => {
            const IconComponent = path.icon;
            const isHovered = hoveredPath === path.id;
            return (
              <button
                key={path.id}
                onClick={() => handlePathClick(path.category)}
                onMouseEnter={() => setHoveredPath(path.id)}
                onMouseLeave={() => setHoveredPath(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '1.5rem',
                  background: isHovered ? theme.bg : theme.elevated,
                  border: `1px solid ${isHovered ? theme.accentBorder : theme.border}`,
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  textAlign: 'left',
                  boxShadow: isHovered ? '0 8px 24px rgba(10, 37, 64, 0.08)' : 'none',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: isHovered ? theme.accentLight : theme.bg,
                    border: `1px solid ${isHovered ? theme.accentBorder : theme.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <IconComponent
                    size={22}
                    style={{ color: isHovered ? theme.accent : theme.subtle, transition: 'color 0.25s ease' }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    color: theme.text,
                    marginBottom: '0.25rem',
                  }}
                >
                  {path.title}
                </h3>
                <span
                  style={{
                    fontSize: '0.8125rem',
                    color: theme.accent,
                    fontWeight: 500,
                    marginBottom: '0.5rem',
                  }}
                >
                  {path.tagline}
                </span>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: theme.subtle,
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {path.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Templates */}
      <section
        style={{
          background: theme.elevated,
          borderTop: `1px solid ${theme.divider}`,
          borderBottom: `1px solid ${theme.divider}`,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 3rem)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-literata)',
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  color: theme.text,
                  marginBottom: '0.5rem',
                }}
              >
                Popular templates
              </h2>
              <p style={{ fontSize: '1rem', color: theme.subtle, margin: 0 }}>
                Good starting points for your first project
              </p>
            </div>
            <Link
              href="#browse-templates"
              onClick={() => setActiveCategory('all')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: theme.accent,
                textDecoration: 'none',
              }}
            >
              View all
              <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {featuredTemplates.map((template) => {
              const isHovered = hoveredCard === template.id;
              return (
                <Link
                  key={template.id}
                  href={`/templates/${template.slug}`}
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={() => setHoveredCard(template.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <article
                    style={{
                      background: theme.bg,
                      border: `1px solid ${isHovered ? theme.accentBorder : theme.border}`,
                      borderRadius: '16px',
                      padding: '1.75rem',
                      transition: 'all 0.25s ease',
                      boxShadow: isHovered ? '0 12px 32px rgba(10, 37, 64, 0.1)' : '0 2px 8px rgba(10, 37, 64, 0.04)',
                      transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Category */}
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.625rem',
                        background: theme.accentLight,
                        color: theme.accent,
                        borderRadius: '6px',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '1rem',
                        alignSelf: 'flex-start',
                      }}
                    >
                      {template.category}
                    </span>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-literata)',
                        fontSize: '1.25rem',
                        fontWeight: 400,
                        letterSpacing: '-0.01em',
                        lineHeight: 1.3,
                        marginBottom: '0.75rem',
                        color: theme.text,
                      }}
                    >
                      {template.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '0.9375rem',
                        color: theme.muted,
                        lineHeight: 1.6,
                        marginBottom: '1.5rem',
                        flexGrow: 1,
                      }}
                    >
                      {template.description}
                    </p>

                    {/* CTA */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: theme.accent,
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                    >
                      Use template
                      <ArrowRight
                        size={16}
                        style={{
                          transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                          transition: 'transform 0.2s ease',
                        }}
                      />
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Browse All Templates */}
      {/* 
      <section
        id="browse-templates"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 3rem)',
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: theme.text,
              marginBottom: '0.5rem',
            }}
          >
            All templates
          </h2>
          <p style={{ fontSize: '1rem', color: theme.subtle }}>
            Browse the full collection or filter by category
          </p>
        </div>

        <TemplateCategoryNav
          categories={templateCategories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: showFilters ? '220px 1fr' : '1fr',
            gap: '2.5rem',
            marginTop: '2rem',
          }}
        >
          {showFilters && (
            <div style={{ position: 'sticky', top: '100px', alignSelf: 'start' }}>
              <TemplateFilters
                subcategories={subcategories}
                activeSubcategory={activeSubcategory}
                activeDifficulty={activeDifficulty}
                onSubcategoryChange={setActiveSubcategory}
                onDifficultyChange={setActiveDifficulty}
                onClearFilters={handleClearFilters}
              />
            </div>
          )}

          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: `1px solid ${theme.divider}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: theme.text,
                    margin: 0,
                  }}
                >
                  {searchQuery
                    ? 'Search Results'
                    : activeCategory === 'all'
                      ? 'All Templates'
                      : templateCategories.find((c) => c.id === activeCategory)?.name || 'Templates'}
                </h3>
                <span style={{ fontSize: '0.875rem', color: theme.subtle }}>
                  {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'}
                </span>
              </div>
            </div>

            <TemplateGrid
              templates={filteredTemplates}
              showCategory={activeCategory === 'all'}
              columns={showFilters ? 2 : 3}
              emptyMessage={
                searchQuery
                  ? `No results found for "${searchQuery}"`
                  : 'No templates found with the current filters.'
              }
            />
          </div>
        </div>
      </section>
      */}

      {/* CTA Section - Clean, Minimal */}
      <section
        style={{
          background: theme.text,
          color: theme.bg,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 3rem)',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            Ready to start?
          </h2>
          <p
            style={{
              fontSize: '1.125rem',
              opacity: 0.8,
              marginBottom: '2rem',
              maxWidth: '480px',
              margin: '0 auto 2rem',
              lineHeight: 1.6,
            }}
          >
            Pick a template and run it in Esy. Adjust as needed, or use it as-is.
          </p>
          <Link
            href="https://app.esy.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '1rem 2rem',
              background: theme.accent,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            Open Esy
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
