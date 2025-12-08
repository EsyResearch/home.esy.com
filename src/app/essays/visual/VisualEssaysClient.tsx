"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowRight, Clock, Search, Grid, List, ChevronDown, X, SlidersHorizontal, Sparkles } from "lucide-react";
import { 
  publishedVisualEssays, 
  featuredEssay, 
  nonFeaturedEssays, 
  totalReadTime,
  CATEGORY_COLORS,
  type EssayCategory,
  type VisualEssay 
} from "@/data/visualEssays";
import './visual-essays.css';

/*
 * Visual Essays Discovery Platform
 * 
 * Design Philosophy:
 * - Premium editorial aesthetic
 * - Discovery-first: Search, Filter, Sort
 * - Scalable for 1000+ essays
 * - Mobile-first with grid/list toggle
 * - URL-addressable filtered views
 * 
 * Data Source: @/data/visualEssays.ts (single source of truth)
 * - Essays sorted by newest first (highest number)
 * - Featured essay: Always the latest (auto-determined)
 * - Stats calculated dynamically
 * 
 * Architecture:
 * - Layer 1: Editorial Hero (featured essay - always latest)
 * - Layer 2: Discovery Bar (search + filters, sticky)
 * - Layer 3: Content Grid/List (with Load More pagination)
 */

// ==================== CATEGORY CONFIG ====================

const ALL_CATEGORIES: EssayCategory[] = ['Science', 'History', 'Technology', 'Culture', 'Space', 'Nature'];

// ==================== HELPERS ====================

const ESSAYS_PER_PAGE = 12;

// ==================== COMPONENTS ====================

// Discovery Bar Component
interface DiscoveryBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: EssayCategory | 'all';
  setSelectedCategory: (c: EssayCategory | 'all') => void;
  viewMode: 'grid' | 'list';
  setViewMode: (m: 'grid' | 'list') => void;
  resultCount: number;
  isSticky: boolean;
}

const DiscoveryBar: React.FC<DiscoveryBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  resultCount,
  isSticky,
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery.length > 0;

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <>
      <div className={`discovery-bar ${isSticky ? 'sticky' : ''}`}>
        <div className="discovery-bar-inner">
          {/* Search */}
          <div className="discovery-search">
            <Search size={18} className="discovery-search-icon" />
            <input
              type="text"
              placeholder="Search visual essays..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="discovery-search-input"
            />
            {searchQuery && (
              <button 
                className="discovery-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Desktop Filters */}
          <div className="discovery-filters desktop-only">
            {/* Category Dropdown */}
            <div className="discovery-dropdown">
              <button 
                className={`discovery-dropdown-trigger ${selectedCategory !== 'all' ? 'active' : ''}`}
                onClick={() => setCategoryOpen(!categoryOpen)}
              >
                <span>{selectedCategory === 'all' ? 'All Categories' : selectedCategory}</span>
                <ChevronDown size={14} />
              </button>
              {categoryOpen && (
                <div className="discovery-dropdown-menu">
                  <button 
                    className={selectedCategory === 'all' ? 'active' : ''}
                    onClick={() => { setSelectedCategory('all'); setCategoryOpen(false); }}
                  >
                    All Categories
                  </button>
                  {ALL_CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      className={selectedCategory === cat ? 'active' : ''}
                      onClick={() => { setSelectedCategory(cat); setCategoryOpen(false); }}
                    >
                      <span 
                        className="category-dot" 
                        style={{ backgroundColor: CATEGORY_COLORS[cat] }}
                      />
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button className="discovery-clear" onClick={clearFilters}>
                Clear filters
              </button>
            )}
          </div>

          {/* View Toggle */}
          <div className="discovery-view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <Grid size={16} />
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <List size={16} />
            </button>
          </div>

          {/* Mobile Filter Button */}
          <button 
            className="discovery-mobile-filter-btn mobile-only"
            onClick={() => setShowMobileFilters(true)}
          >
            <SlidersHorizontal size={18} />
            {hasActiveFilters && <span className="filter-badge" />}
          </button>
        </div>

        {/* Results Count */}
        <div className="discovery-results">
          <span>{resultCount} {resultCount === 1 ? 'essay' : 'essays'}</span>
          {hasActiveFilters && (
            <button className="discovery-clear-mobile" onClick={clearFilters}>
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      {showMobileFilters && (
        <div className="mobile-filter-overlay" onClick={() => setShowMobileFilters(false)}>
          <div className="mobile-filter-sheet" onClick={e => e.stopPropagation()}>
            <div className="mobile-filter-header">
              <h3>Filters</h3>
              <button onClick={() => setShowMobileFilters(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="mobile-filter-section">
              <h4>Category</h4>
              <div className="mobile-filter-options">
                <button 
                  className={selectedCategory === 'all' ? 'active' : ''}
                  onClick={() => setSelectedCategory('all')}
                >
                  All
                </button>
                {ALL_CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    className={selectedCategory === cat ? 'active' : ''}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span 
                      className="category-dot" 
                      style={{ backgroundColor: CATEGORY_COLORS[cat] }}
                    />
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="mobile-filter-actions">
              <button className="mobile-filter-clear" onClick={clearFilters}>
                Clear All
              </button>
              <button className="mobile-filter-apply" onClick={() => setShowMobileFilters(false)}>
                Show {resultCount} Essays
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Editorial Hero - Featured essay is always the latest (auto-determined)
const EditorialHero: React.FC = () => {
  return (
    <section className="editorial-hero">
      <div className="hero-left">
        <span className="hero-label">Visual Essays</span>
        <h1 className="hero-title">
          <span className="hero-title-line">Essays</span>
          <span className="hero-title-line">That</span>
          <span className="hero-title-line hero-title-italic">Unfold</span>
        </h1>
        <p className="hero-description">
          Interactive essays that combine research, design, and storytelling. 
          Ideas explored, not just explained.
        </p>
      </div>
      
      <div className="hero-right">
        {featuredEssay && (
          <Link href={featuredEssay.href} className="hero-featured">
            <div className="hero-featured-badges">
              <span className="hero-featured-category" style={{ color: CATEGORY_COLORS[featuredEssay.category] }}>
                {featuredEssay.category}
              </span>
            </div>
            <h2 className="hero-featured-title">{featuredEssay.title}</h2>
            <p className="hero-featured-subtitle">{featuredEssay.subtitle}</p>
            <div className="hero-featured-meta">
              <Clock size={14} />
              <span>{featuredEssay.readTime} read</span>
              {featuredEssay.isNew && <span className="new-badge">New</span>}
            </div>
            <span className="hero-featured-cta">
              Read Essay <ArrowRight size={14} />
            </span>
          </Link>
        )}
        
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">{publishedVisualEssays.length}</div>
            <div className="hero-stat-label">Essays</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">{totalReadTime}</div>
            <div className="hero-stat-label">Minutes</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">
              <Sparkles size={20} />
            </div>
            <div className="hero-stat-label">Interactive</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Essay Card (Grid View)
const EssayCard: React.FC<{ essay: VisualEssay }> = ({ essay }) => (
  <Link href={essay.href} className="essay-card">
    <div className="essay-card-header">
      <span 
        className="essay-card-category"
        style={{ color: CATEGORY_COLORS[essay.category] }}
      >
        {essay.category}
      </span>
      {essay.isNew && <span className="essay-card-new">New</span>}
    </div>
    <h3 className="essay-card-title">{essay.title}</h3>
    <p className="essay-card-subtitle">{essay.subtitle}</p>
    <p className="essay-card-description">{essay.description}</p>
    <div className="essay-card-meta">
      <Clock size={12} />
      <span>{essay.readTime}</span>
    </div>
  </Link>
);

// Essay Row (List View)
const EssayRow: React.FC<{ essay: VisualEssay }> = ({ essay }) => (
  <Link href={essay.href} className="essay-row">
    <span className="essay-number">{essay.number}</span>
    
    <div className="essay-main">
      <div className="essay-info">
        <div className="essay-row-badges">
          <span 
            className="essay-category"
            style={{ color: CATEGORY_COLORS[essay.category] }}
          >
            {essay.category}
          </span>
          {essay.isNew && <span className="essay-row-new">New</span>}
        </div>
        <h3 className="essay-title">{essay.title}</h3>
        <p className="essay-subtitle">{essay.subtitle}</p>
        <p className="essay-description">{essay.description}</p>
      </div>

      <div className="essay-meta">
        <Clock size={14} />
        <span>{essay.readTime}</span>
      </div>
    </div>

    <div className="essay-arrow">
      <ArrowRight size={18} />
    </div>
  </Link>
);

// Essays Section with Grid/List toggle and Load More
interface EssaysSectionProps {
  essays: VisualEssay[];
  viewMode: 'grid' | 'list';
  visibleCount: number;
  onLoadMore: () => void;
  hasMore: boolean;
}

const EssaysSection: React.FC<EssaysSectionProps> = ({ 
  essays, 
  viewMode, 
  visibleCount,
  onLoadMore,
  hasMore,
}) => {
  const visibleEssays = essays.slice(0, visibleCount);

  return (
    <section className="essays-section">
      {viewMode === 'grid' ? (
        <div className="essays-grid">
          {visibleEssays.map(essay => (
            <EssayCard key={essay.id} essay={essay} />
          ))}
        </div>
      ) : (
        <div className="essays-list">
          {visibleEssays.map(essay => (
            <EssayRow key={essay.id} essay={essay} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={onLoadMore}>
            Load More Essays
            <span className="load-more-count">
              ({essays.length - visibleCount} remaining)
            </span>
          </button>
        </div>
      )}
    </section>
  );
};

// Back to Essays Link
const BackToEssays: React.FC = () => (
  <div className="back-link-container">
    <Link href="/essays" className="back-link">
      ← Back to Essays
    </Link>
  </div>
);

// Coming Soon
const ComingSoon: React.FC = () => (
  <section className="coming-soon">
    <p className="coming-soon-text">
      More visual essays in development. Each piece takes weeks of research 
      and design to create an unforgettable experience.
    </p>
  </section>
);

// ==================== MAIN ====================

const VisualEssaysClient: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const discoveryBarRef = useRef<HTMLDivElement>(null);

  // State from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<EssayCategory | 'all'>(
    (searchParams.get('category') as EssayCategory) || 'all'
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(
    (searchParams.get('view') as 'grid' | 'list') || 'grid'
  );
  const [visibleCount, setVisibleCount] = useState(ESSAYS_PER_PAGE);
  const [isSticky, setIsSticky] = useState(false);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (viewMode !== 'grid') params.set('view', viewMode);

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : '/essays/visual';
    
    router.replace(newUrl, { scroll: false });
  }, [searchQuery, selectedCategory, viewMode, router]);

  // Sticky detection
  useEffect(() => {
    const handleScroll = () => {
      if (discoveryBarRef.current) {
        const rect = discoveryBarRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter essays - uses nonFeaturedEssays (already sorted newest first, excludes featured)
  const filteredEssays = useMemo(() => {
    return nonFeaturedEssays.filter(essay => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          essay.title.toLowerCase().includes(query) ||
          essay.subtitle.toLowerCase().includes(query) ||
          essay.description.toLowerCase().includes(query) ||
          essay.category.toLowerCase().includes(query) ||
          (essay.tags?.some(tag => tag.toLowerCase().includes(query)));
        if (!matchesSearch) return false;
      }

      // Category
      if (selectedCategory !== 'all' && essay.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ESSAYS_PER_PAGE);
  }, [searchQuery, selectedCategory]);

  const handleLoadMore = useCallback(() => {
    setVisibleCount(prev => prev + ESSAYS_PER_PAGE);
  }, []);

  const hasMore = visibleCount < filteredEssays.length;

  return (
    <div className="visual-essays-index">
      <BackToEssays />
      <EditorialHero />
      
      <div ref={discoveryBarRef}>
        <DiscoveryBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          viewMode={viewMode}
          setViewMode={setViewMode}
          resultCount={filteredEssays.length}
          isSticky={isSticky}
        />
      </div>

      <EssaysSection
        essays={filteredEssays}
        viewMode={viewMode}
        visibleCount={visibleCount}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
      />

      <ComingSoon />
    </div>
  );
};

export default VisualEssaysClient;

