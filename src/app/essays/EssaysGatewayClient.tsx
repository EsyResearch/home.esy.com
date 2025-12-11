"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { useHeaderSearch } from "@/contexts/HeaderSearchContext";
import SearchBar from "@/components/SearchBar/SearchBar";
import { 
  publishedVisualEssays, 
  featuredEssay, 
  nonFeaturedEssays,
  photoEssays,
  searchVisualEssays, 
  CATEGORY_COLORS 
} from "@/data/visualEssays";
import './essays-gateway.css';

/*
 * Essays Gateway Hub
 * 
 * Design Philosophy:
 * - Unified entry point for all essay content
 * - Showcases Visual Essays, Text Essays, and Writing Guides
 * - Premium editorial aesthetic with clear navigation
 * - Optimized for essay-related SEO
 * - Search bar with instant results dropdown
 */

// ==================== TYPES ====================

interface VisualEssayPreview {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
  readTime: string;
  href: string;
  isNew?: boolean;
}

interface TextEssay {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  readTime: number;
  tags: string[];
}

interface Guide {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  href: string;
}

interface SearchResult {
  id: string | number;
  title: string;
  description?: string;
  category?: string;
  slug?: string;
  type?: 'prompt' | 'suggestion' | 'category' | 'article' | 'resource' | 'course';
  isPro?: boolean;
  metadata?: Record<string, unknown>;
}

// ==================== DERIVED DATA ====================

// Convert visual essays to preview format
// Shows featured essay + next 3 most recent (sorted by newest first from centralized data)
const visualEssayPreviews: VisualEssayPreview[] = [
  ...(featuredEssay ? [{
    id: featuredEssay.id,
    title: featuredEssay.title,
    subtitle: featuredEssay.subtitle,
    category: featuredEssay.category,
    categoryColor: CATEGORY_COLORS[featuredEssay.category],
    readTime: featuredEssay.readTime,
    href: featuredEssay.href,
    isNew: featuredEssay.isNew,
  }] : []),
  ...nonFeaturedEssays.slice(0, 3).map(essay => ({
    id: essay.id,
    title: essay.title,
    subtitle: essay.subtitle,
    category: essay.category,
    categoryColor: CATEGORY_COLORS[essay.category],
    readTime: essay.readTime,
    href: essay.href,
    isNew: essay.isNew,
  })),
];

const guides: Guide[] = [
  {
    id: "how-to-write-an-essay",
    title: "How to Write an Essay",
    subtitle: "A Visual Step-by-Step Guide",
    readTime: "8 min",
    href: "/essays/guides/how-to-write-an-essay",
  },
];

// ==================== COMPONENTS ====================

// Hero Section with Search
interface HeroProps {
  searchBarRef: React.RefObject<HTMLDivElement | null>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (query: string) => void;
  searchResults: SearchResult[];
  onResultSelect: (result: SearchResult) => void;
  showDropdown: boolean;
  examplesCount: number;
  guidesCount: number;
}

const Hero: React.FC<HeroProps> = ({ 
  searchBarRef, 
  searchQuery, 
  setSearchQuery, 
  onSearch,
  searchResults,
  onResultSelect,
  showDropdown,
  examplesCount,
  guidesCount,
}) => {
  return (
    <section className="essays-hero">
      <div className="essays-hero-content">
        <span className="essays-hero-label">Essays</span>
        <h1 className="essays-hero-title">
          <span className="essays-hero-title-line">Examples,</span>
          <span className="essays-hero-title-line">Explorations &</span>
          <span className="essays-hero-title-line essays-hero-title-accent">Guides</span>
        </h1>
        <p className="essays-hero-description">
          Discover essay examples, interactive visual essays, and step-by-step 
          writing guides. Everything you need to write better essays.
        </p>
        
        {/* Search Bar with Instant Results */}
        <div ref={searchBarRef} className="essays-hero-search">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={onSearch}
            placeholder="Search visual essays..."
            context="general"
            inputFontSize="1rem"
            showDropdown={showDropdown}
            searchResults={searchResults}
            onResultSelect={onResultSelect}
            maxResults={8}
          />
        </div>
      </div>
      
      <div className="essays-hero-metrics">
        <div className="essays-metric">
          <span className="essays-metric-number">{publishedVisualEssays.length}</span>
          <span className="essays-metric-label">Visual Essays</span>
        </div>
        <span className="essays-metric-divider" />
        <div className="essays-metric">
          <span className="essays-metric-number">{examplesCount}</span>
          <span className="essays-metric-label">{examplesCount === 1 ? 'Example' : 'Examples'}</span>
        </div>
        <span className="essays-metric-divider" />
        <div className="essays-metric">
          <span className="essays-metric-number">{guidesCount}</span>
          <span className="essays-metric-label">{guidesCount === 1 ? 'Guide' : 'Guides'}</span>
        </div>
      </div>
    </section>
  );
};

// Photo Essays Callout (Editorial promotion linking to immersive landing)
const PhotoEssaysCallout: React.FC = () => {
  // Featured photo essay for the callout
  const featured = photoEssays[0]; // Manhattan Project

  return (
    <section className="photo-essays-callout">
      <Link href="/photo-essays" className="photo-callout-link">
        {/* Background image */}
        <div className="photo-callout-bg">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Trinity_Detonation_T%26B.jpg/800px-Trinity_Detonation_T%26B.jpg"
            alt="Trinity nuclear test - Photo Essays collection"
            className="photo-callout-image"
          />
          <div className="photo-callout-overlay" />
        </div>
        
        {/* Content */}
        <div className="photo-callout-content">
          <span className="photo-callout-label">Documentary Collection</span>
          <h2 className="photo-callout-title">Photo Essays</h2>
          <p className="photo-callout-description">
            History told through archival photography. Immersive narratives exploring 
            humanity&apos;s pivotal moments.
          </p>
          
          <div className="photo-callout-stats">
            <span className="photo-callout-stat">{photoEssays.length} Essays</span>
            <span className="photo-callout-divider">·</span>
            <span className="photo-callout-stat">100+ Archival Images</span>
          </div>
          
          <span className="photo-callout-cta">
            Explore Photo Essays <ArrowRight size={16} />
          </span>
        </div>
      </Link>
    </section>
  );
};

// Visual Essays Section (Illustrated/SVG-based essays)
const VisualEssaysSection: React.FC = () => (
  <section className="content-section">
    <div className="section-header">
      <div className="section-header-left">
        <div>
          <h2 className="section-title">Visual Essays</h2>
          <p className="section-description">
            Interactive essays that bring ideas to life through animation and storytelling
          </p>
        </div>
      </div>
      <Link href="/essays/visual" className="section-link">
        Explore all <ArrowRight size={14} />
      </Link>
    </div>
    
    <div className="visual-essays-grid">
      {visualEssayPreviews.map(essay => (
        <Link key={essay.id} href={essay.href} className="visual-essay-card">
          <div className="visual-essay-meta">
            <span 
              className="visual-essay-category"
              style={{ color: essay.categoryColor }}
            >
              {essay.category}
            </span>
          </div>
          <h3 className="visual-essay-title">{essay.title}</h3>
          <p className="visual-essay-subtitle">{essay.subtitle}</p>
          <div className="visual-essay-footer">
            <span className="visual-essay-time">
              <Clock size={12} />
              {essay.readTime}
            </span>
            <ArrowRight size={14} className="visual-essay-arrow" />
          </div>
        </Link>
      ))}
    </div>
  </section>
);

// Text Essays Section
const TextEssaysSection: React.FC<{ essays: TextEssay[] }> = ({ essays }) => (
  <section className="content-section">
    <div className="section-header">
      <div className="section-header-left">
        <div>
          <h2 className="section-title">Essay Examples</h2>
          <p className="section-description">
            Academic essays across various topics for reference and inspiration
          </p>
        </div>
      </div>
    </div>
    
    <div className="text-essays-list">
      {essays.map(essay => (
        <Link key={essay.id} href={`/essays/${essay.id}`} className="text-essay-row">
          <div className="text-essay-content">
            <h3 className="text-essay-title">{essay.title}</h3>
            <p className="text-essay-abstract">{essay.abstract}</p>
            <div className="text-essay-meta">
              <span className="text-essay-authors">
                {essay.authors.join(', ')}
              </span>
              <span className="text-essay-divider">·</span>
              <span className="text-essay-time">{essay.readTime} min read</span>
            </div>
          </div>
          <div className="text-essay-arrow">
            <ArrowRight size={18} />
          </div>
        </Link>
      ))}
    </div>
  </section>
);

// Writing Guides Section
const WritingGuidesSection: React.FC = () => (
  <section className="content-section guides-section">
    <div className="section-header">
      <div className="section-header-left">
        <div>
          <h2 className="section-title">Writing Guides</h2>
          <p className="section-description">
            Step-by-step guides to improve your essay writing skills
          </p>
        </div>
      </div>
      <Link href="/essays/guides" className="section-link">
        Browse all <ArrowRight size={14} />
      </Link>
    </div>
    
    <div className="guides-preview">
      {guides.map(guide => (
        <Link key={guide.id} href={guide.href} className="guide-preview-card">
          <div className="guide-preview-content">
            <span className="guide-preview-badge">Interactive Guide</span>
            <h3 className="guide-preview-title">{guide.title}</h3>
            <p className="guide-preview-subtitle">{guide.subtitle}</p>
            <div className="guide-preview-meta">
              <span>{guide.readTime} read</span>
            </div>
          </div>
          <div className="guide-preview-cta">
            Start Learning <ArrowRight size={16} />
          </div>
        </Link>
      ))}
    </div>
  </section>
);

// ==================== MAIN ====================

interface EssaysGatewayClientProps {
  textEssays: TextEssay[];
}

const EssaysGatewayClient: React.FC<EssaysGatewayClientProps> = ({ textEssays }) => {
  const router = useRouter();
  const { setShowHeaderSearch } = useHeaderSearch();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Scroll detection for header search
  useEffect(() => {
    const handleScroll = () => {
      if (searchBarRef.current) {
        const searchBarRect = searchBarRef.current.getBoundingClientRect();
        const shouldShowHeaderSearch = searchBarRect.bottom < 0;
        setShowHeaderSearch(shouldShowHeaderSearch);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
      setShowHeaderSearch(false); // Reset when leaving page
    };
  }, [setShowHeaderSearch]);

  // Search results with memoization
  const searchResults = useMemo((): SearchResult[] => {
    if (!searchQuery.trim()) return [];
    
    const results = searchVisualEssays(searchQuery);
    return results.map(essay => ({
      id: essay.id,
      title: essay.title,
      description: essay.subtitle,
      category: `Visual Essay · ${essay.category}`,
      slug: essay.href,
      type: 'article' as const,
      metadata: {
        categoryColor: CATEGORY_COLORS[essay.category]
      }
    }));
  }, [searchQuery]);

  const showDropdown = searchQuery.length > 0 && searchResults.length > 0;

  const handleSearch = (query: string) => {
    const searchTerm = query || searchQuery;
    if (searchTerm.trim()) {
      // Navigate to visual essays with search query
      router.push(`/essays/visual?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleResultSelect = (result: SearchResult) => {
    if (result.slug) {
      router.push(result.slug);
    }
  };

  return (
    <div className="essays-gateway">
      <Hero 
        searchBarRef={searchBarRef}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        searchResults={searchResults}
        onResultSelect={handleResultSelect}
        showDropdown={showDropdown}
        examplesCount={textEssays.length}
        guidesCount={guides.length}
      />
      <PhotoEssaysCallout />
      <VisualEssaysSection />
      <TextEssaysSection essays={textEssays} />
      <WritingGuidesSection />
    </div>
  );
};

export default EssaysGatewayClient;

