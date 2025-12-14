'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Brain, Zap, Search } from 'lucide-react';
import { elevatedDarkTheme } from '@/lib/theme';
import { useScrollHeaderSearch } from '@/hooks/useScrollHeaderSearch';
import {
  templateCategories,
  getAllTemplates,
  getTemplatesByCategory,
  getTemplatesBySubcategory,
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

export default function TemplatesClient() {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [activeDifficulty, setActiveDifficulty] = useState<TemplateDifficulty | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);

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

  const featuredTemplates = getFeaturedTemplates();

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveSubcategory(null);
  };

  const handleClearFilters = () => {
    setActiveSubcategory(null);
    setActiveDifficulty(null);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: elevatedDarkTheme.bg,
        color: elevatedDarkTheme.text,
        fontFamily: 'var(--font-inter)',
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          paddingTop: 'clamp(6rem, 12vh, 8rem)',
          paddingBottom: 'clamp(3rem, 6vh, 4rem)',
          background: `linear-gradient(180deg, ${elevatedDarkTheme.bg} 0%, ${elevatedDarkTheme.elevated} 100%)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '400px',
            background: `radial-gradient(ellipse, ${elevatedDarkTheme.accent}10 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 clamp(1.5rem, 5vw, 3rem)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: `${elevatedDarkTheme.accent}15`,
              border: `1px solid ${elevatedDarkTheme.accent}30`,
              borderRadius: '24px',
              marginBottom: '1.5rem',
            }}
          >
            <Sparkles size={16} style={{ color: elevatedDarkTheme.accent }} />
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: elevatedDarkTheme.accent,
              }}
            >
              Templates Marketplace
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
              color: elevatedDarkTheme.text,
            }}
          >
            Esy Templates
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              lineHeight: 1.7,
              color: elevatedDarkTheme.muted,
              maxWidth: '700px',
              marginBottom: '2rem',
            }}
          >
            A growing library of AI prompts and writing frameworks designed to help you
            write better, faster, and more effectively. Copy, customize, and use directly
            in the Esy editor.
          </p>

          {/* Search */}
          <div ref={searchBarRef}>
            <TemplateSearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search prompts by title, description, or tags..."
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 3rem)',
        }}
      >
        {/* Category Navigation */}
        <TemplateCategoryNav
          categories={templateCategories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Featured Section (only show when no search/filters) */}
        {!searchQuery && activeCategory === 'all' && !activeSubcategory && !activeDifficulty && (
          <section style={{ marginBottom: 'clamp(3rem, 6vh, 4rem)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-literata)',
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  color: elevatedDarkTheme.text,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <Sparkles size={24} style={{ color: elevatedDarkTheme.accent }} />
                Featured
              </h2>
            </div>
            <TemplateGrid templates={featuredTemplates} columns={3} />
          </section>
        )}

        {/* Content Layout with Sidebar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: showFilters ? '240px 1fr' : '1fr',
            gap: '2rem',
            paddingBottom: 'clamp(4rem, 8vh, 6rem)',
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
              <h2
                style={{
                  fontFamily: 'var(--font-literata)',
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.01em',
                  color: elevatedDarkTheme.text,
                }}
              >
                {searchQuery
                  ? `Search Results`
                  : activeCategory === 'all'
                  ? 'All Prompts'
                  : templateCategories.find((c) => c.id === activeCategory)?.name || 'Prompts'}
                <span
                  style={{
                    marginLeft: '0.75rem',
                    fontSize: '0.875rem',
                    color: elevatedDarkTheme.subtle,
                    fontWeight: 400,
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  ({filteredTemplates.length})
                </span>
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'transparent',
                  border: `1px solid ${elevatedDarkTheme.border}`,
                  borderRadius: '8px',
                  color: elevatedDarkTheme.muted,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'none', // Hide for now, can enable for mobile
                }}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
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

        {/* CTA Section */}
        <section
          style={{
            padding: 'clamp(3rem, 6vh, 4rem)',
            background: elevatedDarkTheme.gradients.card,
            borderRadius: '24px',
            border: `1px solid ${elevatedDarkTheme.border}`,
            textAlign: 'center',
            marginBottom: 'clamp(4rem, 8vh, 6rem)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              color: elevatedDarkTheme.text,
            }}
          >
            Ready to write better?
          </h2>
          <p
            style={{
              fontSize: '1.0625rem',
              color: elevatedDarkTheme.muted,
              marginBottom: '2rem',
              maxWidth: '500px',
              margin: '0 auto 2rem',
            }}
          >
            Try these prompts in the Esy editor with AI-powered writing assistance.
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
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(124, 58, 237, 0.9) 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: `0 4px 15px ${elevatedDarkTheme.accent}40`,
            }}
          >
            Open Esy Editor
            <ArrowRight size={18} />
          </Link>
        </section>
      </div>

      {/* Footer spacer */}
      <div style={{ height: '2rem' }} />
    </div>
  );
}

