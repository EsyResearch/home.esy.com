"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Footprints,
  Bike, 
  Trophy, 
  History,
  ChefHat
} from "lucide-react";
import './scrollytelling-index.css';

/*
 * Scrollytelling Index - "The Story Universe"
 * 
 * Design Philosophy:
 * - Cinematic, immersive full-viewport hero
 * - Interactive story cards with 3D depth effects
 * - Each story card hints at its unique visual identity
 * - Scroll-triggered animations
 * - Premium, sophisticated aesthetic
 * 
 * Built with:
 * - @agents/scrollytelling-expert.md (narrative architecture)
 * - @agents/ui-ux-design-expert.md (visual design)
 * - @agents/software-engineering-expert.md (implementation)
 */

// ==================== TYPES ====================
interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  readTime: string;
  href: string;
  icon: React.ReactNode;
  isNew?: boolean;
  isFeatured?: boolean;
}

// ==================== HOOKS ====================
const useInView = (threshold = 0.2) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// ==================== DATA ====================
const stories: Story[] = [
  {
    id: "who-invented-high-heels",
    slug: "heels",
    title: "The High Heels Story",
    subtitle: "500 Years of Elevation",
    description:
      "From Persian cavalrymen to Parisian runways, discover the extraordinary 500-year journey of the high heel—from military equipment to fashion icon.",
    category: "Fashion History",
    readTime: "14 min",
    href: "/scrollytelling/who-invented-high-heels",
    icon: <Footprints />,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "who-invented-the-bicycle",
    slug: "bicycle",
    title: "The Bicycle Story",
    subtitle: "200 Years of Two Wheels",
    description:
      "From Karl von Drais's 1817 running machine to modern carbon fiber racers, discover the invention that changed transportation forever.",
    category: "Transportation",
    readTime: "10 min",
    href: "/scrollytelling/who-invented-the-bicycle",
    icon: <Bike />,
  },
  {
    id: "who-invented-the-spoon",
    slug: "spoon",
    title: "The Spoon Story",
    subtitle: "30,000 Years of Essential Tools",
    description:
      "From prehistoric bone carvings to silver apostle spoons, discover the extraordinary journey of humanity's oldest eating utensil.",
    category: "Material Culture",
    readTime: "10 min",
    href: "/scrollytelling/who-invented-the-spoon",
    icon: <ChefHat />,
  },
  {
    id: "who-invented-basketball",
    slug: "basketball",
    title: "The Basketball Story",
    subtitle: "From Peach Baskets to Phenomenon",
    description:
      "Experience the 134-year journey of basketball from Dr. Naismith's invention to global culture and billion-dollar arenas.",
    category: "Sports History",
    readTime: "10 min",
    href: "/scrollytelling/who-invented-basketball",
    icon: <Trophy />,
  },
  {
    id: "who-invented-the-fork",
    slug: "fork",
    title: "The Fork Story",
    subtitle: "4,000 Years of Revolution",
    description:
      "From ancient Mesopotamia to modern tables, travel through Byzantine courts and Renaissance Italy in this immersive narrative.",
    category: "History",
    readTime: "12 min",
    href: "/scrollytelling/who-invented-the-fork",
    icon: <History />,
  },
];

// ==================== COMPONENTS ====================

// Floating particles for hero
const Particles: React.FC = () => (
  <div className="particles">
    {[...Array(10)].map((_, i) => (
      <div key={i} className="particle" />
    ))}
  </div>
);

// Hero Section
const HeroPortal: React.FC = () => {
  const totalStories = stories.length;
  const totalReadTime = stories.reduce((acc, s) => acc + parseInt(s.readTime), 0);
  
  return (
    <section className="hero-portal">
      <Particles />
      
      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles className="hero-badge-icon" />
          <span className="hero-badge-text">Immersive Narratives</span>
        </div>
        
        <h1 className="hero-title">
          <span className="hero-title-line">Stories That</span>
          <span className="hero-title-line hero-title-accent">Come Alive</span>
        </h1>
        
        <p className="hero-subtitle">
          Experience history like never before. Each scrollytelling piece combines 
          cinematic visuals, interactive elements, and compelling research into 
          unforgettable journeys through time.
        </p>
        
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">{totalStories}</div>
            <div className="hero-stat-label">Stories</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">{totalReadTime}+</div>
            <div className="hero-stat-label">Minutes of Discovery</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">∞</div>
            <div className="hero-stat-label">Years of History</div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span className="scroll-indicator-text">Explore</span>
        <div className="scroll-indicator-line" />
      </div>
    </section>
  );
};

// Featured Story Card
const FeaturedStory: React.FC<{ story: Story }> = ({ story }) => {
  const { ref, isVisible } = useInView(0.2);
  
  return (
    <div className="featured-story">
      <div className="featured-label">
        <h3>Featured Story</h3>
        {story.isNew && <span className="new-badge">New</span>}
      </div>
      
      <Link 
        href={story.href} 
        className={`featured-card ${isVisible ? 'fade-in-up' : ''}`}
        ref={ref as React.RefObject<HTMLAnchorElement>}
      >
        <div className="featured-visual">
          <div className="featured-icon">{story.icon}</div>
        </div>
        
        <div className="featured-content">
          <span className="featured-category">{story.category}</span>
          <h2 className="featured-title">{story.title}</h2>
          <p className="featured-subtitle">{story.subtitle}</p>
          <p className="featured-description">{story.description}</p>
          
          <div className="featured-meta">
            <div className="featured-time">
              <Clock size={16} />
              <span>{story.readTime} read</span>
            </div>
            <div className="featured-cta">
              <span>Begin Journey</span>
              <ArrowRight size={18} className="featured-cta-arrow" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

// Story Card
const StoryCard: React.FC<{ story: Story; index: number }> = ({ story, index }) => {
  const { ref, isVisible } = useInView(0.15);
  
  return (
    <Link 
      href={story.href}
      className={`story-card ${isVisible ? `fade-in-up stagger-${Math.min(index + 1, 5)}` : ''}`}
      data-story={story.slug}
      ref={ref as React.RefObject<HTMLAnchorElement>}
    >
      <div className="story-card-visual">
        <div className="story-card-icon">{story.icon}</div>
      </div>
      
      <div className="story-card-content">
        <div className="story-card-header">
          <span className="story-card-category">{story.category}</span>
        </div>
        
        <h3 className="story-card-title">{story.title}</h3>
        <p className="story-card-subtitle">{story.subtitle}</p>
        <p className="story-card-description">{story.description}</p>
        
        <div className="story-card-footer">
          <div className="story-card-time">
            <Clock size={14} />
            <span>{story.readTime}</span>
          </div>
          <ArrowRight className="story-card-arrow" />
        </div>
      </div>
    </Link>
  );
};

// Stories Section
const StoriesSection: React.FC = () => {
  const featuredStory = stories.find(s => s.isFeatured);
  const otherStories = stories.filter(s => !s.isFeatured);
  
  return (
    <section className="stories-section">
      <div className="stories-header">
        <h2>Choose Your Journey</h2>
        <p>Each story is a portal to another time. Where will you go?</p>
      </div>
      
      {featuredStory && <FeaturedStory story={featuredStory} />}
      
      <div className="stories-grid">
        {otherStories.map((story, index) => (
          <StoryCard key={story.id} story={story} index={index} />
        ))}
      </div>
    </section>
  );
};

// Coming Soon Section
const ComingSoon: React.FC = () => {
  const { ref, isVisible } = useInView(0.3);
  
  return (
    <section 
      className={`coming-soon ${isVisible ? 'fade-in-up' : ''}`}
      ref={ref}
    >
      <div className="coming-soon-icon">
        <Sparkles size={32} />
      </div>
      <h3>More Stories Coming Soon</h3>
      <p>
        We&apos;re crafting new immersive narratives covering science, art, 
        technology, and culture. Each piece takes weeks to research and 
        develop—ensuring every journey is unforgettable.
      </p>
    </section>
  );
};

// ==================== MAIN COMPONENT ====================
const ScrollytellingClient: React.FC = () => {
  return (
    <div className="scrollytelling-index">
      <HeroPortal />
      <StoriesSection />
      <ComingSoon />
    </div>
  );
};

export default ScrollytellingClient;
