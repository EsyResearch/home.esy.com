'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  Clock,
  BarChart3,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { elevatedDarkTheme } from '@/lib/theme';
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

// Theme matching docs page
const theme = {
  bg: '#18181b',
  elevated: '#27272a',
  surface: '#1f1f23',
  text: '#fafafa',
  muted: 'rgba(255, 255, 255, 0.7)',
  subtle: 'rgba(255, 255, 255, 0.5)',
  border: 'rgba(255, 255, 255, 0.08)',
  divider: 'rgba(255, 255, 255, 0.05)',
  accent: '#8b5cf6',
};

// Intent-based paths
const startHerePaths = [
  {
    id: 'visual-essays',
    title: 'Create a visual essay',
    description: 'Scroll-driven narratives that combine research, writing, and visuals',
    href: '/templates?category=visual-essay',
    icon: <FileText className="w-5 h-5" />,
    category: 'visual-essay',
  },
  {
    id: 'timelines',
    title: 'Build a timeline',
    description: 'Historical overviews and chronological narratives',
    href: '/templates?category=timeline',
    icon: <Clock className="w-5 h-5" />,
    category: 'timeline',
  },
  {
    id: 'infographics',
    title: 'Make an infographic',
    description: 'Visual summaries and data-driven explanations',
    href: '/templates?category=infographic',
    icon: <BarChart3 className="w-5 h-5" />,
    category: 'infographic',
  },
  {
    id: 'explainers',
    title: 'Write an explainer',
    description: 'Clear breakdowns of complex topics for any audience',
    href: '/templates?category=explainer',
    icon: <BookOpen className="w-5 h-5" />,
    category: 'explainer',
  },
];

export default function TemplatesClient() {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [activeDifficulty, setActiveDifficulty] = useState<TemplateDifficulty | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  // Show header search when in-page search scrolls out of view
  useScrollHeaderSearch(searchBarRef);

  // Get subcategories for active category
  const subcategories = useMemo(() => {
    if (activeCategory === 'all') {
      return getAllSubcategories();
    }
    const category = templateCategories.find((c) => c.id === activeCategory);
    return category?.subcategories || [];
  }, [activeCategory]);

  // Filter templates based on all active filters
  const filteredTemplates = useMemo(() => {
    let templates = searchQuery
      ? searchTemplates(searchQuery)
      : activeCategory === 'all'
      ? getAllTemplates()
      : getTemplatesByCategory(activeCategory);

    // Apply subcategory filter
    if (activeSubcategory) {
      templates = templates.filter((t) => t.subcategory === activeSubcategory);
    }

    // Apply difficulty filter
    if (activeDifficulty) {
      templates = templates.filter((t) => t.difficulty === activeDifficulty);
    }

    return templates;
  }, [activeCategory, activeSubcategory, activeDifficulty, searchQuery]);

  const featuredTemplates = getFeaturedTemplates().slice(0, 4);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveSubcategory(null);
    setShowAllTemplates(true);
  };

  const handleClearFilters = () => {
    setActiveSubcategory(null);
    setActiveDifficulty(null);
  };

  const handlePathClick = (category: string) => {
    setActiveCategory(category);
    setActiveSubcategory(null);
    setShowAllTemplates(true);
    // Scroll to browse section
    setTimeout(() => {
      document.getElementById('browse-templates')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.bg,
        color: theme.text,
        fontFamily: 'var(--font-inter)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 3rem)',
        }}
      >
        {/* Hero Section */}
        <section
          style={{
            paddingTop: 'clamp(4rem, 10vh, 6rem)',
            paddingBottom: 'clamp(3rem, 6vh, 4rem)',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
              color: theme.text,
              lineHeight: 1.2,
            }}
          >
            Esy Templates
          </h1>

          {/* Intro */}
          <div
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.8,
              color: theme.muted,
              maxWidth: '800px',
              marginBottom: '2rem',
            }}
          >
            <p style={{ marginBottom: '1rem' }}>
              Esy Templates help you go from an idea to a polished result — without starting from
              scratch.
            </p>
            <p>
              Each template gives you a clear structure for creating things like visual essays,
              timelines, infographics, explainers, and other research-backed artifacts. Pick a
              template, adjust it to your needs, and run it in the Esy editor to produce something
              you can trust.
            </p>
          </div>

          {/* TL;DR Box */}
          <div
            style={{
              padding: '1.25rem 1.5rem',
              background: `${theme.accent}08`,
              border: `1px solid ${theme.accent}20`,
              borderRadius: '12px',
              marginBottom: '3rem',
              maxWidth: '800px',
            }}
          >
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: '1rem',
                lineHeight: 1.7,
                color: theme.muted,
              }}
            >
              <li style={{ marginBottom: '0.5rem' }}>
                • Templates are step-by-step workflows, not single prompts.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                • Pick one, run it as-is, or adjust it to fit your project.
              </li>
              <li>
                • The goal is reliable output you can trust.
              </li>
            </ul>
          </div>

          {/* Search */}
          <div ref={searchBarRef} style={{ maxWidth: '600px' }}>
            <TemplateSearch
              value={searchQuery}
              onChange={(value) => {
                setSearchQuery(value);
                if (value) setShowAllTemplates(true);
              }}
              placeholder="Search templates by topic, goal, or output type..."
            />
            <p
              style={{
                fontSize: '0.8125rem',
                color: theme.subtle,
                marginTop: '0.75rem',
                opacity: 0.8,
              }}
            >
              Not sure which one to choose? Start with any template — you can change things later.
            </p>
          </div>
        </section>

        {/* Start Here Section */}
        <section
          style={{
            paddingBottom: 'clamp(3rem, 6vh, 4rem)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: '1.5rem',
              fontWeight: 400,
              color: theme.text,
              marginBottom: '1rem',
            }}
          >
            Start Here (Based on What You Want to Make)
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: theme.muted,
              marginBottom: '2rem',
              maxWidth: '600px',
            }}
          >
            Choose a path based on your goal. Each leads to templates designed for that output type.
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              maxWidth: '700px',
            }}
          >
            {startHerePaths.map((path) => (
              <button
                key={path.id}
                onClick={() => handlePathClick(path.category)}
                onMouseEnter={() => setHoveredPath(path.id)}
                onMouseLeave={() => setHoveredPath(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  background: hoveredPath === path.id ? theme.elevated : 'transparent',
                  border: `1px solid ${hoveredPath === path.id ? theme.border : 'transparent'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: `${theme.accent}15`,
                    border: `1px solid ${theme.accent}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.accent,
                    flexShrink: 0,
                  }}
                >
                  {path.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: theme.text,
                      marginBottom: '0.25rem',
                    }}
                  >
                    {path.title}
                  </div>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      color: theme.subtle,
                    }}
                  >
                    {path.description}
                  </div>
                </div>
                <ArrowRight
                  style={{
                    width: '18px',
                    height: '18px',
                    color: theme.accent,
                    opacity: hoveredPath === path.id ? 1 : 0.5,
                    transform: hoveredPath === path.id ? 'translateX(4px)' : 'translateX(0)',
                    transition: 'all 0.2s ease',
                  }}
                />
              </button>
            ))}
          </div>
        </section>

        {/* Featured Templates */}
        <section
          style={{
            paddingTop: 'clamp(3rem, 6vh, 4rem)',
            paddingBottom: 'clamp(3rem, 6vh, 4rem)',
            borderTop: `1px solid ${theme.divider}`,
          }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-literata)',
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                marginBottom: '0.75rem',
                color: theme.text,
              }}
            >
              Featured Templates
            </h2>
            <p
              style={{
                fontSize: '1rem',
                color: theme.muted,
                maxWidth: '600px',
              }}
            >
              Good places to start if you&apos;re new.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {featuredTemplates.map((template) => (
              <Link
                key={template.id}
                href={`/templates/${template.slug}`}
                style={{ textDecoration: 'none' }}
                onMouseEnter={() => setHoveredCard(template.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  style={{
                    background:
                      hoveredCard === template.id
                        ? 'linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)'
                        : 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
                    border: `1px solid ${hoveredCard === template.id ? 'rgba(139, 92, 246, 0.3)' : theme.border}`,
                    borderRadius: '16px',
                    padding: '1.75rem',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    boxShadow:
                      hoveredCard === template.id
                        ? '0 12px 32px rgba(139, 92, 246, 0.2)'
                        : '0 4px 16px rgba(0, 0, 0, 0.15)',
                    transform: hoveredCard === template.id ? 'translateY(-4px)' : 'translateY(0)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column' as const,
                  }}
                >
                  {/* Category Badge */}
                  <div
                    style={{
                      padding: '0.25rem 0.75rem',
                      background: `${theme.accent}20`,
                      color: theme.accent,
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.05em',
                      border: `1px solid ${theme.accent}30`,
                      alignSelf: 'flex-start',
                      marginBottom: '1rem',
                    }}
                  >
                    {template.category}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 400,
                      letterSpacing: '-0.01em',
                      lineHeight: 1.3,
                      marginBottom: '0.75rem',
                      color: theme.text,
                      fontFamily: 'var(--font-literata)',
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
                      marginBottom: '1.25rem',
                      flexGrow: 1,
                    }}
                  >
                    {template.description}
                  </p>

                  {/* Arrow */}
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
                      style={{
                        width: '16px',
                        height: '16px',
                        transform:
                          hoveredCard === template.id ? 'translateX(4px)' : 'translateX(0)',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* What's Inside a Template */}
        <section
          style={{
            paddingTop: 'clamp(3rem, 6vh, 4rem)',
            paddingBottom: 'clamp(3rem, 6vh, 4rem)',
            borderTop: `1px solid ${theme.divider}`,
          }}
        >
          <div
            style={{
              maxWidth: '800px',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-literata)',
                fontSize: '1.5rem',
                fontWeight: 400,
                color: theme.text,
                marginBottom: '1rem',
              }}
            >
              What&apos;s inside a template?
            </h2>
            <p
              style={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: theme.muted,
                marginBottom: '1.5rem',
              }}
            >
              A template is more than a single prompt. It&apos;s a step-by-step guide that helps
              Esy:
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 1.5rem 0',
              }}
            >
              {[
                "understand what you're trying to make",
                'gather and organize information',
                'shape it into a clear, professional output',
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: '1rem',
                    color: theme.muted,
                    marginBottom: '0.5rem',
                    paddingLeft: '1.5rem',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      color: theme.accent,
                    }}
                  >
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.8,
                color: theme.subtle,
              }}
            >
              You don&apos;t need to understand how it works — just start, tweak, and run.
            </p>
          </div>

          {/* How This Is Different - Recessed Box */}
          <div
            style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: theme.subtle,
              maxWidth: '800px',
              marginTop: '2rem',
              padding: '1.5rem',
              background: theme.surface,
              borderRadius: '12px',
              border: `1px solid ${theme.border}`,
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-literata)',
                fontSize: '1.125rem',
                fontWeight: 400,
                color: theme.muted,
                marginBottom: '1rem',
              }}
            >
              How this is different from prompt packs
            </h3>
            <p style={{ marginBottom: '0.75rem' }}>
              Prompt packs usually give you a single instruction and leave the rest up to you.
            </p>
            <p style={{ marginBottom: '0.75rem' }}>
              Esy templates guide the entire process — from shaping your idea, to organizing
              research, to producing a clear final result.
            </p>
            <p style={{ color: theme.muted, fontWeight: 500, margin: 0 }}>
              The goal isn&apos;t clever prompts. It&apos;s reliable output.
            </p>
          </div>
        </section>

        {/* Browse All Templates */}
        <section
          id="browse-templates"
          style={{
            paddingTop: 'clamp(3rem, 6vh, 4rem)',
            paddingBottom: 'clamp(3rem, 6vh, 4rem)',
            borderTop: `1px solid ${theme.divider}`,
          }}
        >
          <button
            onClick={() => setShowAllTemplates(!showAllTemplates)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              marginBottom: showAllTemplates ? '2rem' : 0,
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-literata)',
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                color: theme.text,
                margin: 0,
              }}
            >
              Browse All Templates
            </h2>
            <span
              style={{
                fontSize: '0.875rem',
                color: theme.subtle,
                fontFamily: 'var(--font-inter)',
              }}
            >
              ({getAllTemplates().length})
            </span>
            {showAllTemplates ? (
              <ChevronUp size={24} style={{ color: theme.muted }} />
            ) : (
              <ChevronDown size={24} style={{ color: theme.muted }} />
            )}
          </button>

          {showAllTemplates && (
            <>
              {/* Category Navigation */}
              <TemplateCategoryNav
                categories={templateCategories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />

              {/* Content Layout with Sidebar */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: showFilters ? '240px 1fr' : '1fr',
                  gap: '2rem',
                  marginTop: '2rem',
                }}
              >
                {/* Sidebar Filters */}
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

                {/* Main Grid */}
                <div>
                  {/* Results header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-literata)',
                        fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                        fontWeight: 300,
                        letterSpacing: '-0.01em',
                        color: theme.text,
                        margin: 0,
                      }}
                    >
                      {searchQuery
                        ? `Search Results`
                        : activeCategory === 'all'
                          ? 'All Templates'
                          : templateCategories.find((c) => c.id === activeCategory)?.name ||
                            'Templates'}
                      <span
                        style={{
                          marginLeft: '0.75rem',
                          fontSize: '0.875rem',
                          color: theme.subtle,
                          fontWeight: 400,
                          fontFamily: 'var(--font-inter)',
                        }}
                      >
                        ({filteredTemplates.length})
                      </span>
                    </h3>
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
            </>
          )}
        </section>

        {/* What Can I Make Section */}
        <section
          style={{
            paddingTop: 'clamp(3rem, 6vh, 4rem)',
            paddingBottom: 'clamp(3rem, 6vh, 4rem)',
            borderTop: `1px solid ${theme.divider}`,
          }}
        >
          <div style={{ maxWidth: '800px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-literata)',
                fontSize: '1.5rem',
                fontWeight: 400,
                color: theme.text,
                marginBottom: '1rem',
              }}
            >
              What can I make?
            </h2>
            <p
              style={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: theme.muted,
                marginBottom: '1.5rem',
              }}
            >
              Templates are designed to help you create:
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 1.5rem 0',
              }}
            >
              {[
                'Visual essays and scroll-driven narratives',
                'Timelines and historical overviews',
                'Infographics and visual summaries',
                'Explainers and research-backed writing',
                'School projects and structured artifacts',
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: '1rem',
                    color: theme.muted,
                    marginBottom: '0.5rem',
                    paddingLeft: '1.5rem',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      color: theme.accent,
                    }}
                  >
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.8,
                color: theme.subtle,
              }}
            >
              Templates work for students, educators, researchers, and anyone who needs to produce
              clear, well-sourced work.
            </p>
          </div>
        </section>

        {/* New to Esy CTA Section */}
        <section
          style={{
            paddingTop: 'clamp(3rem, 6vh, 4rem)',
            paddingBottom: 'clamp(4rem, 8vh, 6rem)',
            borderTop: `1px solid ${theme.divider}`,
          }}
        >
          <div
            style={{
              padding: 'clamp(2.5rem, 5vh, 3.5rem)',
              background: 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
              borderRadius: '24px',
              border: `1px solid ${theme.border}`,
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-literata)',
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
                color: theme.text,
              }}
            >
              New to Esy?
            </h2>
            <p
              style={{
                fontSize: '1.0625rem',
                color: theme.muted,
                marginBottom: '2rem',
                maxWidth: '500px',
                margin: '0 auto 2rem',
                lineHeight: 1.7,
              }}
            >
              Templates are the easiest way to get started. Choose one, run it as-is, or adjust it
              to fit your project.
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
                background:
                  'linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(124, 58, 237, 0.9) 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: `0 4px 15px ${theme.accent}40`,
              }}
            >
              Try a Template
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
