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
  draft?: boolean; // Draft stories are hidden from index but accessible via direct URL
}

  const stories: Story[] = [
  {
    id: "mammary-gland-evolution",
    number: "01",
    title: "Mammary Gland Evolution",
    subtitle: "Anatomical Journey",
    description: "Detailed anatomical SVGs showing human breast cross-sections, alveoli, and comparative animal mammary systems—platypus to whale to human.",
    category: "Biology & Anatomy",
    readTime: "14 min",
    href: "/scrollytelling/mammary-gland-evolution",
    isNew: true,
    isFeatured: true,
    draft: true, // Hidden from index, accessible via direct URL
  },
  {
    id: "evolution-of-mammary-glands",
    number: "02",
    title: "Evolution of Mammary Glands",
    subtitle: "310 Million Years of Milk",
    description: "How a simple skin secretion became the defining feature of mammals. SVG cross-sections, evolutionary trees, and milk composition comparisons.",
    category: "Biology & Evolution",
    readTime: "12 min",
    href: "/scrollytelling/evolution-of-mammary-glands",
    draft: true, // Hidden from index, accessible via direct URL
  },
  {
    id: "the-dna-helix",
    number: "01",
    title: "DNA & The Double Helix",
    subtitle: "The Code of Life",
    description: "The helix twists as you scroll—base pairs connect (A-T, G-C), Photo 51 reveals, genetic sequences type out. From Miescher's nuclein to CRISPR.",
    category: "Biology & Science",
    readTime: "13 min",
    href: "/scrollytelling/the-dna-helix",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "the-skyscraper",
    number: "02",
    title: "The Skyscraper",
    subtitle: "Reaching for the Sky",
    description: "An elevator rises floor-by-floor as you scroll—steel frames draw themselves, cranes lift beams, and buildings grow from 10 stories to 163 floors.",
    category: "Architecture & Engineering",
    readTime: "14 min",
    href: "/scrollytelling/the-skyscraper",
  },
  {
    id: "the-firearm",
    number: "03",
    title: "The Firearm",
    subtitle: "From Fire Lance to Precision",
    description: "A revolver cylinder rotates as you scroll—muzzle flashes, ammunition counters, and bullet trajectories trace 800 years of controlled explosions.",
    category: "Military & Technology",
    readTime: "13 min",
    href: "/scrollytelling/the-firearm",
  },
  {
    id: "the-gunpowder",
    number: "04",
    title: "Gunpowder",
    subtitle: "The Discovery That Changed Everything",
    description: "A burning fuse tracks your progress through 1,200 years of explosive history—from Tang Dynasty alchemy to the 75:15:10 formula that reshaped warfare.",
    category: "Military & Science",
    readTime: "14 min",
    href: "/scrollytelling/the-gunpowder",
  },
  {
    id: "the-train",
    number: "05",
    title: "The Train",
    subtitle: "Iron Horse of Industry",
    description: "Locomotive wheels rotate as you scroll through 220 years of rail history—steam puffs, mile markers, and the race from 30 mph to 375 mph maglev.",
    category: "Transportation & History",
    readTime: "13 min",
    href: "/scrollytelling/the-train",
  },
  {
    id: "the-invention-of-the-car",
    number: "06",
    title: "The Automobile",
    subtitle: "A Sketch-Style Journey",
    description: "Hand-drawn SVGs animate as you scroll through 138 years of automotive history—from Benz's patent to the electric future.",
    category: "Transportation & Design",
    readTime: "11 min",
    href: "/scrollytelling/the-invention-of-the-car",
  },
  {
    id: "the-invention-of-wine",
    number: "07",
    title: "The Invention of Wine",
    subtitle: "8,000 Years in a Glass",
    description: "From Neolithic Georgia to billion-dollar Bordeaux—the story of humanity's most civilized beverage.",
    category: "History & Culture",
    readTime: "11 min",
    href: "/scrollytelling/the-invention-of-wine",
  },
  {
    id: "the-pale-blue-dot",
    number: "08",
    title: "The Pale Blue Dot",
    subtitle: "A Cosmic Perspective",
    description: "Scroll to zoom out 6 billion kilometers. Carl Sagan's reflection on the most humbling photograph ever taken.",
    category: "Space & Astronomy",
    readTime: "10 min",
    href: "/scrollytelling/the-pale-blue-dot",
  },
  {
    id: "the-deep-ocean",
    number: "09",
    title: "The Deep Ocean",
    subtitle: "Earth's Final Frontier",
    description: "Descend 10,935 meters into the abyss. From sunlit waters to Challenger Deep—71% of Earth, less than 0.001% explored.",
    category: "Science & Nature",
    readTime: "12 min",
    href: "/scrollytelling/the-deep-ocean",
  },
  {
    id: "language-death",
    number: "10",
    title: "Language Death",
    subtitle: "The Silence of Extinction",
    description: "7,168 languages exist today. Half will disappear by 2100. An exploration of what we lose when a language dies.",
    category: "Linguistics",
    readTime: "9 min",
    href: "/scrollytelling/language-death",
  },
  {
    id: "who-invented-the-mirror",
    number: "11",
    title: "The Mirror",
    subtitle: "8,000 Years of Reflection",
    description: "From polished obsidian to smart mirrors—humanity's eternal quest to see itself.",
    category: "Material Culture",
    readTime: "10 min",
    href: "/scrollytelling/who-invented-the-mirror",
  },
  {
    id: "who-invented-soda",
    number: "12",
    title: "The Fizz",
    subtitle: "From Pharmacy to Phenomenon",
    description: "How carbonated water became humanity's favorite way to celebrate, refresh, and rebel—one bubble at a time.",
    category: "Food & Beverage",
    readTime: "10 min",
    href: "/scrollytelling/who-invented-soda",
  },
  {
    id: "who-invented-the-sneaker",
    number: "13",
    title: "The Sneaker Story",
    subtitle: "From Plimsolls to $75 Billion",
    description: "How a rubber-soled shoe designed for silence became a global cultural force—from Charles Goodyear to Michael Jordan.",
    category: "Culture & Fashion",
    readTime: "12 min",
    href: "/scrollytelling/who-invented-the-sneaker",
  },
  {
    id: "who-invented-high-heels",
    number: "14",
    title: "The High Heels Story",
    subtitle: "500 Years of Elevation",
    description: "From Persian cavalrymen to Parisian runways, the extraordinary journey of fashion's most provocative invention.",
    category: "Fashion History",
    readTime: "14 min",
    href: "/scrollytelling/who-invented-high-heels",
  },
  {
    id: "who-invented-the-bicycle",
    number: "15",
    title: "The Bicycle Story",
    subtitle: "200 Years of Two Wheels",
    description: "The invention that changed transportation, liberated women, and became humanity's most efficient machine.",
    category: "Transportation",
    readTime: "10 min",
    href: "/scrollytelling/who-invented-the-bicycle",
  },
  {
    id: "who-invented-the-spoon",
    number: "16",
    title: "The Spoon Story",
    subtitle: "30,000 Years of Essential Tools",
    description: "From prehistoric bone carvings to silver apostle spoons—humanity's oldest eating utensil.",
    category: "Material Culture",
    readTime: "10 min",
    href: "/scrollytelling/who-invented-the-spoon",
  },
  {
    id: "who-invented-basketball",
    number: "17",
    title: "The Basketball Story",
    subtitle: "From Peach Baskets to Global Culture",
    description: "Dr. Naismith's 1891 invention becomes billion-dollar arenas and worldwide phenomenon.",
    category: "Sports History",
    readTime: "10 min",
    href: "/scrollytelling/who-invented-basketball",
  },
    {
      id: "who-invented-the-fork",
    number: "18",
    title: "The Fork Story",
    subtitle: "4,000 Years of Revolution",
    description: "From ancient Mesopotamia through Byzantine courts to your dinner table.",
      category: "History",
      readTime: "12 min",
      href: "/scrollytelling/who-invented-the-fork",
    },
  ];

// ==================== HELPERS ====================

// Filter out draft stories for public display
const publishedStories = stories.filter(s => !s.draft);

// ==================== COMPONENTS ====================

const EditorialHero: React.FC = () => {
  const featured = publishedStories.find(s => s.isFeatured);
  const totalStories = publishedStories.length;
  const totalTime = publishedStories.reduce((acc, s) => acc + parseInt(s.readTime), 0);

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
  const nonFeatured = publishedStories.filter(s => !s.isFeatured);
  
  return (
    <section className="stories-section">
      <div className="stories-header">
        <h2>All Stories</h2>
        <span className="stories-count">{publishedStories.length} narratives</span>
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
