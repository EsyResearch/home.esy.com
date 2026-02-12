'use client';

import React, { useState, useMemo } from 'react';
import {
  templateCategories,
  getAllTemplates,
  getTemplatesByCategory,
  searchTemplates,
  getAllSubcategories,
} from '@/lib/templates';
import { TemplateDifficulty } from '@/lib/templates/types';
import TemplateGrid from './TemplateGrid';
import TemplateCategoryNav from './TemplateCategoryNav';
import TemplateFilters from './TemplateFilters';

// Navy Calm Light Theme
const theme = {
  text: '#0A2540',
  subtle: 'rgba(10, 37, 64, 0.5)',
  divider: 'rgba(10, 37, 64, 0.05)',
};

interface BrowseAllTemplatesProps {
  /** Optional initial category filter */
  initialCategory?: string;
  /** Optional initial search query */
  initialSearch?: string;
}

export default function BrowseAllTemplates({
  initialCategory = 'all',
  initialSearch = '',
}: BrowseAllTemplatesProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [activeDifficulty, setActiveDifficulty] = useState<TemplateDifficulty | null>(null);
  const [searchQuery] = useState(initialSearch);
  const [showFilters] = useState(true);

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

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveSubcategory(null);
  };

  const handleClearFilters = () => {
    setActiveSubcategory(null);
    setActiveDifficulty(null);
  };

  return (
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
  );
}
