"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowRight, Clock, Search, Grid, List, ChevronDown, X, SlidersHorizontal, Sparkles } from "lucide-react";
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
 * Architecture:
 * - Layer 1: Editorial Hero (featured essay)
 * - Layer 2: Discovery Bar (search + filters, sticky)
 * - Layer 3: Content Grid/List (with Load More pagination)
 */

// ==================== TYPES ====================

type EssayCategory = 
  | 'Science'
  | 'History' 
  | 'Technology'
  | 'Culture'
  | 'Space'
  | 'Nature';

interface VisualEssay {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  category: EssayCategory;
  readTime: string;
  href: string;
  isNew?: boolean;
  isFeatured?: boolean;
  tags?: string[];
}

// ==================== CATEGORY CONFIG ====================

const CATEGORY_CONFIG: Record<EssayCategory, { color: string; label: string }> = {
  'Science': { color: '#10B981', label: 'Science' },
  'History': { color: '#F59E0B', label: 'History' },
  'Technology': { color: '#3B82F6', label: 'Technology' },
  'Culture': { color: '#EC4899', label: 'Culture' },
  'Space': { color: '#8B5CF6', label: 'Space' },
  'Nature': { color: '#06B6D4', label: 'Nature' },
};

const ALL_CATEGORIES: EssayCategory[] = ['Science', 'History', 'Technology', 'Culture', 'Space', 'Nature'];

// ==================== VISUAL ESSAYS DATA ====================
// These will be migrated from /scrollytelling to /essays/visual

const visualEssays: VisualEssay[] = [
  {
    id: "mammary-gland-evolution",
    number: "01",
    title: "Mammary Gland Evolution",
    subtitle: "Anatomical Journey",
    description: "Detailed anatomical SVGs showing human breast cross-sections, alveoli, and comparative animal mammary systems—platypus to whale to human.",
    category: "Science",
    readTime: "14 min",
    href: "/essays/visual/mammary-gland-evolution",
    tags: ["biology", "anatomy", "evolution"],
  },
  {
    id: "evolution-of-mammary-glands",
    number: "02",
    title: "Evolution of Mammary Glands",
    subtitle: "310 Million Years of Milk",
    description: "How a simple skin secretion became the defining feature of mammals. SVG cross-sections, evolutionary trees, and milk composition comparisons.",
    category: "Science",
    readTime: "12 min",
    href: "/essays/visual/evolution-of-mammary-glands",
    tags: ["biology", "evolution"],
  },
  {
    id: "eternal-honey",
    number: "03",
    title: "Eternal Honey",
    subtitle: "Into the Pyramid",
    description: "Descend through multi-layer parallax into Giza's depths. Pyramid cross-sections reveal, tombs unlock, and 3,000-year-old honey glows in the darkness.",
    category: "History",
    readTime: "12 min",
    href: "/essays/visual/eternal-honey",
    isNew: true,
    tags: ["archaeology", "ancient", "food"],
  },
  {
    id: "honey-never-spoils",
    number: "04",
    title: "Honey Never Spoils",
    subtitle: "The Eternal Elixir",
    description: "3,000-year-old honey from Egyptian tombs is still edible. Honeycomb cells fill, time counters tick, and golden drips reveal why honey defies time itself.",
    category: "Science",
    readTime: "11 min",
    href: "/essays/visual/honey-never-spoils",
    tags: ["food", "chemistry"],
  },
  {
    id: "the-dna-helix",
    number: "05",
    title: "DNA & The Double Helix",
    subtitle: "The Code of Life",
    description: "The helix twists as you scroll—base pairs connect (A-T, G-C), Photo 51 reveals, genetic sequences type out. From Miescher's nuclein to CRISPR.",
    category: "Science",
    readTime: "13 min",
    href: "/essays/visual/the-dna-helix",
    tags: ["biology", "genetics"],
  },
  {
    id: "the-skyscraper",
    number: "06",
    title: "The Skyscraper",
    subtitle: "Reaching for the Sky",
    description: "An elevator rises floor-by-floor as you scroll—steel frames draw themselves, cranes lift beams, and buildings grow from 10 stories to 163 floors.",
    category: "Technology",
    readTime: "14 min",
    href: "/essays/visual/the-skyscraper",
    tags: ["architecture", "engineering"],
  },
  {
    id: "the-firearm",
    number: "07",
    title: "The Firearm",
    subtitle: "From Fire Lance to Precision",
    description: "A revolver cylinder rotates as you scroll—muzzle flashes, ammunition counters, and bullet trajectories trace 800 years of controlled explosions.",
    category: "Technology",
    readTime: "13 min",
    href: "/essays/visual/the-firearm",
    tags: ["military", "invention"],
  },
  {
    id: "the-gunpowder",
    number: "08",
    title: "Gunpowder",
    subtitle: "The Discovery That Changed Everything",
    description: "A burning fuse tracks your progress through 1,200 years of explosive history—from Tang Dynasty alchemy to the 75:15:10 formula that reshaped warfare.",
    category: "Technology",
    readTime: "14 min",
    href: "/essays/visual/the-gunpowder",
    tags: ["military", "chemistry", "invention"],
  },
  {
    id: "the-train",
    number: "09",
    title: "The Train",
    subtitle: "Iron Horse of Industry",
    description: "Locomotive wheels rotate as you scroll through 220 years of rail history—steam puffs, mile markers, and the race from 30 mph to 375 mph maglev.",
    category: "Technology",
    readTime: "13 min",
    href: "/essays/visual/the-train",
    tags: ["transportation", "invention"],
  },
  {
    id: "the-invention-of-the-car",
    number: "10",
    title: "The Automobile",
    subtitle: "A Sketch-Style Journey",
    description: "Hand-drawn SVGs animate as you scroll through 138 years of automotive history—from Benz's patent to the electric future.",
    category: "Technology",
    readTime: "11 min",
    href: "/essays/visual/the-invention-of-the-car",
    tags: ["transportation", "invention"],
  },
  {
    id: "the-invention-of-wine",
    number: "11",
    title: "The Invention of Wine",
    subtitle: "8,000 Years in a Glass",
    description: "From Neolithic Georgia to billion-dollar Bordeaux—the story of humanity's most civilized beverage.",
    category: "Culture",
    readTime: "11 min",
    href: "/essays/visual/the-invention-of-wine",
    tags: ["food", "ancient"],
  },
  {
    id: "the-pale-blue-dot",
    number: "12",
    title: "The Pale Blue Dot",
    subtitle: "A Cosmic Perspective",
    description: "Scroll to zoom out 6 billion kilometers. Carl Sagan's reflection on the most humbling photograph ever taken.",
    category: "Space",
    readTime: "10 min",
    href: "/essays/visual/the-pale-blue-dot",
    tags: ["astronomy", "philosophy"],
  },
  {
    id: "the-deep-ocean",
    number: "13",
    title: "The Deep Ocean",
    subtitle: "Earth's Final Frontier",
    description: "Descend 10,935 meters into the abyss. From sunlit waters to Challenger Deep—71% of Earth, less than 0.001% explored.",
    category: "Nature",
    readTime: "12 min",
    href: "/essays/visual/the-deep-ocean",
    tags: ["nature", "exploration"],
  },
  {
    id: "language-death",
    number: "14",
    title: "Language Death",
    subtitle: "The Silence of Extinction",
    description: "7,168 languages exist today. Half will disappear by 2100. An exploration of what we lose when a language dies.",
    category: "Culture",
    readTime: "9 min",
    href: "/essays/visual/language-death",
    tags: ["linguistics", "anthropology"],
  },
  {
    id: "who-invented-the-mirror",
    number: "15",
    title: "The Mirror",
    subtitle: "8,000 Years of Reflection",
    description: "From polished obsidian to smart mirrors—humanity's eternal quest to see itself.",
    category: "History",
    readTime: "10 min",
    href: "/essays/visual/who-invented-the-mirror",
    tags: ["invention", "material"],
  },
  {
    id: "who-invented-soda",
    number: "16",
    title: "The Fizz",
    subtitle: "From Pharmacy to Phenomenon",
    description: "How carbonated water became humanity's favorite way to celebrate, refresh, and rebel—one bubble at a time.",
    category: "Culture",
    readTime: "10 min",
    href: "/essays/visual/who-invented-soda",
    tags: ["food", "invention"],
  },
  {
    id: "who-invented-the-sneaker",
    number: "17",
    title: "The Sneaker Story",
    subtitle: "From Plimsolls to $75 Billion",
    description: "How a rubber-soled shoe designed for silence became a global cultural force—from Charles Goodyear to Michael Jordan.",
    category: "Culture",
    readTime: "12 min",
    href: "/essays/visual/who-invented-the-sneaker",
    tags: ["fashion", "sports"],
  },
  {
    id: "who-invented-high-heels",
    number: "18",
    title: "The High Heels Story",
    subtitle: "500 Years of Elevation",
    description: "From Persian cavalrymen to Parisian runways, the extraordinary journey of fashion's most provocative invention.",
    category: "Culture",
    readTime: "14 min",
    href: "/essays/visual/who-invented-high-heels",
    tags: ["fashion"],
  },
  {
    id: "who-invented-the-bicycle",
    number: "19",
    title: "The Bicycle Story",
    subtitle: "200 Years of Two Wheels",
    description: "The invention that changed transportation, liberated women, and became humanity's most efficient machine.",
    category: "Technology",
    readTime: "10 min",
    href: "/essays/visual/who-invented-the-bicycle",
    tags: ["transportation", "invention"],
  },
  {
    id: "who-invented-the-spoon",
    number: "20",
    title: "The Spoon Story",
    subtitle: "30,000 Years of Essential Tools",
    description: "From prehistoric bone carvings to silver apostle spoons—humanity's oldest eating utensil.",
    category: "History",
    readTime: "10 min",
    href: "/essays/visual/who-invented-the-spoon",
    tags: ["material", "ancient"],
  },
  {
    id: "who-invented-basketball",
    number: "21",
    title: "The Basketball Story",
    subtitle: "From Peach Baskets to Global Culture",
    description: "Dr. Naismith's 1891 invention becomes billion-dollar arenas and worldwide phenomenon.",
    category: "Culture",
    readTime: "10 min",
    href: "/essays/visual/who-invented-basketball",
    tags: ["sports"],
  },
  {
    id: "who-invented-the-fork",
    number: "22",
    title: "The Fork Story",
    subtitle: "4,000 Years of Revolution",
    description: "From ancient Mesopotamia through Byzantine courts to your dinner table.",
    category: "History",
    readTime: "12 min",
    href: "/essays/visual/who-invented-the-fork",
    tags: ["material", "ancient"],
  },
  {
    id: "the-discovery-of-antibiotics",
    number: "23",
    title: "The Discovery of Antibiotics",
    subtitle: "The Petri Dish That Saved 200 Million Lives",
    description: "How Alexander Fleming's contaminated experiment in 1928 led to one of humanity's greatest medical breakthroughs—transforming a world where scratches could kill.",
    category: "Science",
    readTime: "10 min",
    href: "/essays/visual/the-discovery-of-antibiotics",
    tags: ["medical", "invention"],
  },
  {
    id: "flavors-of-the-east",
    number: "24",
    title: "Flavors of the East",
    subtitle: "A Culinary Journey Through Asia",
    description: "From ancient Chinese soy fermentation to Myanmar's fermented tea salads — explore how ingredients, geography, and tradition shaped the cuisines of three nations across millennia.",
    category: "Culture",
    readTime: "18 min",
    href: "/essays/visual/flavors-of-the-east",
    tags: ["food", "cuisine", "Asia", "China", "Thailand", "Myanmar", "history", "culture"],
  },
  {
    id: "the-ngapi-journey",
    number: "25",
    title: "The Ngapi Journey",
    subtitle: "The History & Evolution of Fish Paste in Myanmar",
    description: "Discover Myanmar's soul ingredient — 2,000 years of fermented fish paste, from prehistoric preservation to the umami backbone of Burmese cuisine. Explore regional varieties, fermentation science, and cultural significance.",
    category: "Culture",
    readTime: "16 min",
    href: "/essays/visual/the-ngapi-journey",
    tags: ["food", "fermentation", "Myanmar", "cuisine", "history", "umami", "preservation"],
  },
  {
    id: "ngapi-fermented-soul",
    number: "26",
    title: "Ngapi: The Fermented Soul",
    subtitle: "Why Myanmar Became the Land of Fermented Fish",
    description: "An illustrated journey through Myanmar's geography, rivers, and monsoons — discovering why this land became the heartland of fermented fish. Rich SVG illustrations bring the story of ngapi to life.",
    category: "Culture",
    readTime: "18 min",
    href: "/essays/visual/ngapi-fermented-soul",
    isNew: true,
    tags: ["food", "fermentation", "Myanmar", "geography", "illustration", "rivers", "monsoon", "preservation"],
  },
  {
    id: "the-tea-journey",
    number: "27",
    title: "Leaves of Time",
    subtitle: "The Global Journey of Tea",
    description: "From wild mountain leaves in ancient China to the world's most consumed beverage after water. Trace 5,000 years of tea history through animated trade routes, ceremonial traditions, and the empires built on a single leaf.",
    category: "Culture",
    readTime: "18 min",
    href: "/essays/visual/the-tea-journey",
    isNew: true,
    tags: ["tea", "history", "China", "Japan", "India", "trade", "ceremony", "empire", "culture"],
  },
  {
    id: "the-tea-journey-illustrated",
    number: "28",
    title: "Leaves of Time",
    subtitle: "The Global Journey of Tea (Illustrated Edition)",
    description: "An award-winning illustrated journey through 5,000 years of tea history. Stunning hand-crafted SVG illustrations, intricate animations, and immersive scenes trace tea's path from ancient China to global phenomenon.",
    category: "Culture",
    readTime: "20 min",
    href: "/essays/visual/the-tea-journey-illustrated",
    isNew: true,
    tags: ["tea", "history", "illustrated", "SVG", "animation", "China", "Japan", "India", "trade", "ceremony", "premium"],
  },
  {
    id: "the-cocoa-odyssey",
    number: "29",
    title: "The Cocoa Odyssey",
    subtitle: "From Ancient Ritual to Global Chocolate Empire",
    description: "From sacred Mesoamerican drink to billion-dollar empires—the untold story of how a bitter bean conquered the world. Explore botanical origins, colonial transformation, and the modern chocolate industry.",
    category: "History",
    readTime: "18 min",
    href: "/essays/visual/the-cocoa-odyssey",
    isNew: true,
    isFeatured: true,
    tags: ["cocoa", "chocolate", "history", "Mesoamerica", "Maya", "Aztec", "trade", "industry", "food"],
  },
];

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
                        style={{ backgroundColor: CATEGORY_CONFIG[cat].color }}
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
                      style={{ backgroundColor: CATEGORY_CONFIG[cat].color }}
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

// Editorial Hero
const EditorialHero: React.FC = () => {
  const featured = visualEssays.find(s => s.isFeatured);
  const totalEssays = visualEssays.length;
  const totalTime = visualEssays.reduce((acc, s) => acc + parseInt(s.readTime), 0);

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
        {featured && (
          <Link href={featured.href} className="hero-featured">
            <div className="hero-featured-badges">
              <span className="hero-featured-category" style={{ color: CATEGORY_CONFIG[featured.category].color }}>
                {featured.category}
              </span>
            </div>
            <h2 className="hero-featured-title">{featured.title}</h2>
            <p className="hero-featured-subtitle">{featured.subtitle}</p>
            <div className="hero-featured-meta">
              <Clock size={14} />
              <span>{featured.readTime} read</span>
              {featured.isNew && <span className="new-badge">New</span>}
            </div>
            <span className="hero-featured-cta">
              Read Essay <ArrowRight size={14} />
            </span>
          </Link>
        )}
        
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">{totalEssays}</div>
            <div className="hero-stat-label">Essays</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">{totalTime}</div>
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
        style={{ color: CATEGORY_CONFIG[essay.category].color }}
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
            style={{ color: CATEGORY_CONFIG[essay.category].color }}
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

  // Filter essays
  const filteredEssays = useMemo(() => {
    return visualEssays.filter(essay => {
      // Exclude featured from list
      if (essay.isFeatured) return false;

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

