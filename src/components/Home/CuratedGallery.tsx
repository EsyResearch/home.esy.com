'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { 
  publishedVisualEssays, 
  CATEGORY_COLORS,
  type VisualEssay 
} from '@/data/visualEssays';

// Explicitly featured essay on homepage (override auto-derived latest)
const FEATURED_ESSAY_ID = 'the-manhattan-project';
const featuredEssay = publishedVisualEssays.find(e => e.id === FEATURED_ESSAY_ID);

/**
 * CuratedGallery Component
 * 
 * Hand-picked showcase of 6-8 essays that demonstrate range and quality.
 * Positioned as "body of work" not "startup pitch."
 * 
 * Design: Museum-quality grid with editorial typography
 * SEO: Semantic HTML, structured data ready, descriptive links
 */

// Hand-picked essays showing range (manually curated for quality)
const CURATED_ESSAY_IDS = [
  'the-diamond-cartel',        // Business/manipulation narrative - compelling story
  'the-scramble-for-africa',   // Historical colonialism - serious topic
  'the-holocaust',             // Important/heavy - demonstrates gravitas
  'the-tea-journey-illustrated', // Beautiful/cultural - showcases craft
  'the-silicon-revolution',    // Technology - demonstrates range
  'the-ramayana',              // Cultural/mythology - demonstrates diversity
];

// Get curated essays from the data
const getCuratedEssays = (): VisualEssay[] => {
  return CURATED_ESSAY_IDS
    .map(id => publishedVisualEssays.find(e => e.id === id))
    .filter((essay): essay is VisualEssay => essay !== undefined);
};

/**
 * Essay Card Component
 */
interface EssayCardProps {
  essay: VisualEssay;
}

const EssayCard: React.FC<EssayCardProps> = ({ essay }) => (
  <Link href={essay.href} className="essay-card">
    <div className="essay-card-header">
      <span 
        className="essay-category"
        style={{ color: CATEGORY_COLORS[essay.category] }}
      >
        {essay.category}
      </span>
      {essay.isNew && <span className="essay-new-badge">New</span>}
    </div>
    
    <h3 className="essay-title">{essay.title}</h3>
    <p className="essay-subtitle">{essay.subtitle}</p>
    <p className="essay-description">{essay.description}</p>
    
    <div className="essay-meta">
      <Clock aria-hidden="true" />
      <span>{essay.readTime} read</span>
    </div>
  </Link>
);

/**
 * Featured Essay Section
 */
const FeaturedEssaySection: React.FC = () => {
  if (!featuredEssay) return null;

  return (
    <section className="featured-section" aria-labelledby="featured-heading">
      <div className="featured-container">
        {/* Left Side - Editorial Label */}
        <div className="featured-label-side">
          <span className="featured-label">Visual Essays</span>
          <h2 id="featured-heading" className="featured-heading">
            Essays That{' '}
            <span className="featured-heading-italic">Unfold</span>
          </h2>
          <p className="featured-description">
            Interactive essays combining research, design, and storytelling. 
            Ideas explored, not just explained.
          </p>
        </div>

        {/* Right Side - Featured Essay Card */}
        <Link href={featuredEssay.href} className="featured-essay-card">
          <span 
            className="featured-category"
            style={{ color: CATEGORY_COLORS[featuredEssay.category] }}
          >
            {featuredEssay.category}
          </span>
          
          <h3 className="featured-title">{featuredEssay.title}</h3>
          <p className="featured-subtitle">{featuredEssay.subtitle}</p>
          
          <div className="featured-meta">
            <Clock aria-hidden="true" />
            <span>{featuredEssay.readTime} read</span>
            {featuredEssay.isNew && <span className="new-badge">New</span>}
          </div>
          
          <span className="featured-cta">
            Read Essay
            <ArrowRight aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
};

/**
 * Curated Gallery Component
 */
const CuratedGallery: React.FC = () => {
  const curatedEssays = getCuratedEssays();

  return (
    <>
      {/* Featured Essay */}
      <FeaturedEssaySection />

      {/* Curated Grid */}
      <section className="curated-gallery" aria-labelledby="gallery-title">
        <header className="gallery-header">
          <h2 id="gallery-title" className="gallery-title">Explore</h2>
          <span className="gallery-count">
            {publishedVisualEssays.length} essays
          </span>
        </header>

        <div className="essay-grid" role="list">
          {curatedEssays.map((essay) => (
            <EssayCard key={essay.id} essay={essay} />
          ))}
        </div>

        <footer className="gallery-footer">
          <Link href="/essays/visual/" className="see-all-link">
            <span>See all essays</span>
            <ArrowRight aria-hidden="true" />
          </Link>
        </footer>
      </section>
    </>
  );
};

export default CuratedGallery;

