'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
 * Hand-picked showcase of 6 essays with hero images that demonstrate range and quality.
 * Positioned as "body of work" not "startup pitch."
 * 
 * Design: Museum-quality grid with editorial typography and compelling imagery
 * SEO: Semantic HTML, structured data ready, descriptive links
 */

// Curated essays with hero images - manually selected for visual impact
interface CuratedEssay {
  id: string;
  heroImage: string;
  heroAlt: string;
}

const CURATED_ESSAYS: CuratedEssay[] = [
  {
    id: 'the-word-essay',
    // Essay craft and typography — aligns to the essay about "essay"
    heroImage: '/og/the-word-essay.png',
    heroAlt: 'The Word Essay — visual essay about the form itself',
  },
  {
    id: 'the-rwanda-genocide',
    // Kigali Genocide Memorial - solemn remembrance
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Kigali_Genocide_Memorial.jpg',
    heroAlt: 'Kigali Genocide Memorial exterior, Rwanda',
  },
  {
    id: 'the-word-han',
    // Han character — etymology across East Asia
    heroImage: '/og/the-word-han.png',
    heroAlt: 'The Word Han — 2,200-year journey across East Asia',
  },
  {
    id: 'how-a-chip-is-manufactured',
    // Semiconductor fab - chip manufacturing process
    heroImage: '/og/chip-manufacturing.png',
    heroAlt: 'How a Chip is Manufactured — semiconductor wafer fabrication',
  },
  {
    id: 'the-silicon-revolution',
    // Silicon wafers - the foundation of computing
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Wafer_2_Zoll_bis_8_Zoll.jpg',
    heroAlt: 'Silicon wafers of different sizes - foundation of modern computing',
  },
  {
    id: 'the-ramayana',
    // Vishnu at Badami - ancient Indian sculpture
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/6th_century_Vishnu_seated_on_Sesha_in_Cave_3%2C_Badami_Hindu_cave_temple_Karnataka.jpg',
    heroAlt: 'Vishnu seated on Shesha - 6th century Badami Cave sculpture',
  },
];

// Get curated essays from the data with hero images
const getCuratedEssays = (): (VisualEssay & { heroImage: string; heroAlt: string })[] => {
  return CURATED_ESSAYS
    .map(curated => {
      const essay = publishedVisualEssays.find(e => e.id === curated.id);
      if (!essay) return null;
      return { ...essay, heroImage: curated.heroImage, heroAlt: curated.heroAlt };
    })
    .filter((essay): essay is (VisualEssay & { heroImage: string; heroAlt: string }) => essay !== null);
};

/**
 * Essay Card Component with Image
 */
interface EssayCardProps {
  essay: VisualEssay & { heroImage: string; heroAlt: string };
}

const EssayCard: React.FC<EssayCardProps> = ({ essay }) => (
  <Link href={essay.href} className="essay-card essay-card-with-image">
    {/* Hero Image */}
    <div className="essay-card-image">
      <Image
        src={essay.heroImage}
        alt={essay.heroAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
      />
      <div className="essay-card-image-overlay" />
    </div>
    
    {/* Content */}
    <div className="essay-card-content">
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
      
      <div className="essay-meta">
        <Clock aria-hidden="true" />
        <span>{essay.readTime} read</span>
      </div>
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

        <div className="essay-grid essay-grid-with-images" role="list">
          {curatedEssays.map((essay) => (
            <EssayCard key={essay.id} essay={essay} />
          ))}
        </div>

        <footer className="gallery-footer">
          <Link href="/essays/" className="see-all-link">
            <span>See all essays</span>
            <ArrowRight aria-hidden="true" />
          </Link>
        </footer>
      </section>
    </>
  );
};

export default CuratedGallery;
