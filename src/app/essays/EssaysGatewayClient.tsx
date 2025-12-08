"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, Sparkles, BookOpen, PenTool, FileText } from "lucide-react";
import './essays-gateway.css';

/*
 * Essays Gateway Hub
 * 
 * Design Philosophy:
 * - Unified entry point for all essay content
 * - Showcases Visual Essays, Text Essays, and Writing Guides
 * - Premium editorial aesthetic with clear navigation
 * - Optimized for essay-related SEO
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

// ==================== SAMPLE DATA ====================

const featuredVisualEssay: VisualEssayPreview = {
  id: "flavors-of-the-east",
  title: "Flavors of the East",
  subtitle: "A Culinary Journey Through Asia",
  category: "Culture",
  categoryColor: "#EC4899",
  readTime: "18 min",
  href: "/essays/visual/flavors-of-the-east",
  isNew: true,
};

const visualEssayPreviews: VisualEssayPreview[] = [
  {
    id: "the-dna-helix",
    title: "DNA & The Double Helix",
    subtitle: "The Code of Life",
    category: "Science",
    categoryColor: "#10B981",
    readTime: "13 min",
    href: "/essays/visual/the-dna-helix",
  },
  {
    id: "the-firearm",
    title: "The Firearm",
    subtitle: "From Fire Lance to Precision",
    category: "Technology",
    categoryColor: "#3B82F6",
    readTime: "13 min",
    href: "/essays/visual/the-firearm",
  },
  {
    id: "honey-never-spoils",
    title: "Honey Never Spoils",
    subtitle: "The Eternal Elixir",
    category: "Science",
    categoryColor: "#10B981",
    readTime: "11 min",
    href: "/essays/visual/honey-never-spoils",
  },
  {
    id: "the-pale-blue-dot",
    title: "The Pale Blue Dot",
    subtitle: "A Cosmic Perspective",
    category: "Space",
    categoryColor: "#8B5CF6",
    readTime: "10 min",
    href: "/essays/visual/the-pale-blue-dot",
  },
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

// Hero Section
const Hero: React.FC = () => (
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
    </div>
    
    <div className="essays-hero-stats">
      <div className="essays-hero-stat">
        <Sparkles size={20} className="stat-icon" />
        <span className="stat-value">24+</span>
        <span className="stat-label">Visual Essays</span>
      </div>
      <div className="essays-hero-stat">
        <FileText size={20} className="stat-icon" />
        <span className="stat-value">3</span>
        <span className="stat-label">Text Essays</span>
      </div>
      <div className="essays-hero-stat">
        <PenTool size={20} className="stat-icon" />
        <span className="stat-value">1</span>
        <span className="stat-label">Writing Guide</span>
      </div>
    </div>
  </section>
);

// Featured Visual Essay
const FeaturedVisualEssay: React.FC = () => (
  <section className="featured-section">
    <Link href={featuredVisualEssay.href} className="featured-visual-essay">
      <div className="featured-badge">Featured Visual Essay</div>
      <div className="featured-content">
        <div className="featured-meta">
          <span 
            className="featured-category"
            style={{ color: featuredVisualEssay.categoryColor }}
          >
            {featuredVisualEssay.category}
          </span>
          <span className="featured-time">
            <Clock size={14} />
            {featuredVisualEssay.readTime}
          </span>
          {featuredVisualEssay.isNew && <span className="featured-new">New</span>}
        </div>
        <h2 className="featured-title">{featuredVisualEssay.title}</h2>
        <p className="featured-subtitle">{featuredVisualEssay.subtitle}</p>
        <span className="featured-cta">
          Read Essay <ArrowRight size={16} />
        </span>
      </div>
      <div className="featured-decoration">
        <Sparkles size={48} />
      </div>
    </Link>
  </section>
);

// Visual Essays Section
const VisualEssaysSection: React.FC = () => (
  <section className="content-section">
    <div className="section-header">
      <div className="section-header-left">
        <Sparkles size={20} className="section-icon" />
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
        <FileText size={20} className="section-icon" />
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
        <PenTool size={20} className="section-icon" />
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
          <div className="guide-preview-icon">
            <BookOpen size={28} />
          </div>
          <div className="guide-preview-content">
            <span className="guide-preview-badge">Interactive Guide</span>
            <h3 className="guide-preview-title">{guide.title}</h3>
            <p className="guide-preview-subtitle">{guide.subtitle}</p>
            <div className="guide-preview-meta">
              <Clock size={14} />
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
  return (
    <div className="essays-gateway">
      <Hero />
      <FeaturedVisualEssay />
      <VisualEssaysSection />
      <TextEssaysSection essays={textEssays} />
      <WritingGuidesSection />
    </div>
  );
};

export default EssaysGatewayClient;

