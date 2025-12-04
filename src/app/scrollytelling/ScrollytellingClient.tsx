"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import './scrollytelling-index.css';

/*
 * Scrollytelling Index - Editorial Magazine Layout
 * 
 * Design Philosophy:
 * - Premium editorial aesthetic (Vogue, Bloomberg, NYT Magazine)
 * - Typography-forward, not gimmick-forward
 * - Asymmetric, intentional layouts
 * - Refined interactions, not flashy animations
 * - Sophisticated use of negative space
 * 
 * Structure:
 * - Split hero: Left = masthead title, Right = featured story preview
 * - Stories as horizontal editorial rows with numbering
 * - Minimal color, strategic accents only
 */

// ==================== DATA ====================
interface Story {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  readTime: string;
  href: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

const stories: Story[] = [
  {
    id: "who-invented-high-heels",
    number: "01",
    title: "The High Heels Story",
    subtitle: "500 Years of Elevation",
    description: "From Persian cavalrymen to Parisian runways, the extraordinary journey of fashion's most provocative invention.",
    category: "Fashion History",
    readTime: "14 min",
    href: "/scrollytelling/who-invented-high-heels",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "who-invented-the-bicycle",
    number: "02",
    title: "The Bicycle Story",
    subtitle: "200 Years of Two Wheels",
    description: "The invention that changed transportation, liberated women, and became humanity's most efficient machine.",
    category: "Transportation",
    readTime: "10 min",
    href: "/scrollytelling/who-invented-the-bicycle",
  },
  {
    id: "who-invented-the-spoon",
    number: "03",
    title: "The Spoon Story",
    subtitle: "30,000 Years of Essential Tools",
    description: "From prehistoric bone carvings to silver apostle spoons—humanity's oldest eating utensil.",
    category: "Material Culture",
    readTime: "10 min",
    href: "/scrollytelling/who-invented-the-spoon",
  },
  {
    id: "who-invented-basketball",
    number: "04",
    title: "The Basketball Story",
    subtitle: "From Peach Baskets to Global Culture",
    description: "Dr. Naismith's 1891 invention becomes billion-dollar arenas and worldwide phenomenon.",
    category: "Sports History",
    readTime: "10 min",
    href: "/scrollytelling/who-invented-basketball",
  },
  {
    id: "who-invented-the-fork",
    number: "05",
    title: "The Fork Story",
    subtitle: "4,000 Years of Revolution",
    description: "From ancient Mesopotamia through Byzantine courts to your dinner table.",
    category: "History",
    readTime: "12 min",
    href: "/scrollytelling/who-invented-the-fork",
  },
];

// ==================== COMPONENTS ====================

const EditorialHero: React.FC = () => {
  const featured = stories.find(s => s.isFeatured);
  const totalStories = stories.length;
  const totalTime = stories.reduce((acc, s) => acc + parseInt(s.readTime), 0);
  
  return (
    <section className="editorial-hero">
      {/* Left: Masthead */}
      <div className="hero-left">
        <span className="hero-label">Scrollytelling</span>
        <h1 className="hero-title">
          <span className="hero-title-line">Stories</span>
          <span className="hero-title-line">That</span>
          <span className="hero-title-line hero-title-italic">Unfold</span>
        </h1>
        <p className="hero-description">
          Immersive narratives that combine research, design, and interaction. 
          History experienced, not just read.
        </p>
      </div>
      
      {/* Right: Featured + Stats */}
      <div className="hero-right">
        {featured && (
          <Link href={featured.href} className="hero-featured">
            <span className="hero-featured-category">{featured.category}</span>
            <h2 className="hero-featured-title">{featured.title}</h2>
            <p className="hero-featured-subtitle">{featured.subtitle}</p>
            <div className="hero-featured-meta">
              <Clock size={14} />
              <span>{featured.readTime} read</span>
              {featured.isNew && <span>• New</span>}
            </div>
            <span className="hero-featured-cta">
              Begin Story <ArrowRight size={14} />
            </span>
          </Link>
        )}
        
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">{totalStories}</div>
            <div className="hero-stat-label">Stories</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">{totalTime}</div>
            <div className="hero-stat-label">Minutes</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">∞</div>
            <div className="hero-stat-label">Years</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StoryRow: React.FC<{ story: Story }> = ({ story }) => (
  <Link href={story.href} className="story-row">
    <span className="story-number">{story.number}</span>
    
    <div className="story-main">
      <div className="story-info">
        <span className="story-category">{story.category}</span>
        <h3 className="story-title">{story.title}</h3>
        <p className="story-subtitle">{story.subtitle}</p>
        <p className="story-description">{story.description}</p>
      </div>
      
      <div className="story-meta">
        <Clock size={14} />
        <span>{story.readTime}</span>
      </div>
    </div>
    
    <div className="story-arrow">
      <ArrowRight size={18} />
    </div>
  </Link>
);

const StoriesSection: React.FC = () => {
  const nonFeatured = stories.filter(s => !s.isFeatured);
  
  return (
    <section className="stories-section">
      <div className="stories-header">
        <h2>All Stories</h2>
        <span className="stories-count">{stories.length} narratives</span>
      </div>
      
      <div className="stories-list">
        {nonFeatured.map(story => (
          <StoryRow key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
};

const ComingSoon: React.FC = () => (
  <section className="coming-soon">
    <p className="coming-soon-text">
      More stories in development. Each narrative takes weeks of research 
      and design to ensure an unforgettable experience.
    </p>
  </section>
);

// ==================== MAIN ====================
const ScrollytellingClient: React.FC = () => (
  <div className="scrollytelling-index">
    <EditorialHero />
    <StoriesSection />
    <ComingSoon />
  </div>
);

export default ScrollytellingClient;
