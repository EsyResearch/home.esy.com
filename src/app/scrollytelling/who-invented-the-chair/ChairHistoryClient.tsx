"use client";

import { useEffect, useRef, useState } from 'react';
import './who-invented-the-chair.css';

/*
 * Design Research: The History of the Chair
 * 
 * Visual Identity derived from furniture workshop materials:
 * - Workshop walnut backgrounds (craftsman's studio)
 * - Leather cognac and mahogany accents (furniture wood/upholstery)
 * - Playfair Display typography (furniture catalog elegance)
 * - Weighted, deliberate animations (like placing furniture)
 * 
 * Layout Patterns Used (7 unique):
 * - Hero: full-bleed
 * - Section 1: split-screen (Ancient Egypt)
 * - Section 2: quote-monument (Greek Klismos)
 * - Section 3: timeline (Medieval to Renaissance)
 * - Section 4: full-bleed (Age of Craftsmen)
 * - Section 5: comparison (Thonet Revolution)
 * - Section 6: sticky-scroll (Modernism)
 * - Section 7: data-viz (Democratic Design stats)
 * - Section 8: split-screen reverse (Today)
 * 
 * All citations from .edu sources only.
 */

// Chair icon SVG
const ChairIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="10" width="50" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
    <rect x="25" y="18" width="50" height="35" rx="2" stroke="currentColor" strokeWidth="2"/>
    <line x1="30" y1="53" x2="30" y2="90" stroke="currentColor" strokeWidth="2"/>
    <line x1="70" y1="53" x2="70" y2="90" stroke="currentColor" strokeWidth="2"/>
    <rect x="25" y="53" width="50" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

// Animation hook
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

// Progress Bar
const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / scrollHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${progress}%` }} />
    </div>
  );
};

// ==================== HERO ====================
const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="hero">
      <div className="hero-bg">
        <img 
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80" 
          alt="Elegant furniture in warm lighting"
          style={{ transform: `scale(${1 + scrollY * 0.0002}) translateY(${scrollY * 0.15}px)` }}
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.25}px)` }}>
        <div className="hero-badge">5,000 Years of Seating</div>
        
        <h1>
          Who Invented
          <span className="title-accent">The Chair</span>
        </h1>
        
        <p className="hero-tagline">
          From pharaohs&apos; thrones to democratic design—the surprisingly radical history 
          of humanity&apos;s most ubiquitous furniture.
        </p>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number">5,000+</div>
            <div className="hero-stat-label">Years of History</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">1859</div>
            <div className="hero-stat-label">Chair No. 14</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">50M+</div>
            <div className="hero-stat-label">Thonet Chairs Sold</div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Take a seat</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </header>
  );
};

// ==================== SPLIT SCREEN: Ancient Egypt ====================
const AncientEgyptSection: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`split-screen ${isVisible ? 'visible' : ''}`}>
      <div className="split-image">
        <img 
          src="https://images.unsplash.com/photo-1503602642458-232111445657?w=1200&q=80"
          alt="Ancient Egyptian styled architecture"
        />
        <div className="image-overlay" />
        <div className="image-caption">Thrones of the Pharaohs</div>
      </div>
      
      <div className="split-content">
        <div className="era-badge">
          <span className="era-text">3100 BCE</span>
          <div className="era-line" />
        </div>
        
        <span className="subtitle">The Nile Valley</span>
        <h2>Thrones of Power</h2>
        
        <p>
          The chair began not as furniture, but as symbol. In ancient Egypt, chairs were 
          reserved exclusively for pharaohs and the highest nobility. Common people sat on 
          the ground or on simple stools—the chair was a throne, a statement of divine authority.
        </p>
        <p>
          Egyptian chairs featured animal legs carved as lion paws, seats of woven rushes, 
          and backs inlaid with gold, ivory, and precious stones. The famous throne of 
          Tutankhamun, discovered in 1922, reveals the extraordinary craftsmanship devoted 
          to royal seating.
        </p>
        
        <div className="highlight">
          <p>The word &ldquo;chairman&rdquo; literally means &ldquo;the person who sits in the chair&rdquo;—a title 
          dating back millennia when chairs were reserved for those in command.</p>
        </div>
      </div>
    </section>
  );
};

// ==================== QUOTE MONUMENT: Greek Klismos ====================
const KlismosQuote: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`quote-monument ${isVisible ? 'animate-in visible' : 'animate-in'}`}>
      <blockquote>
        <p>
          &ldquo;The klismos is one of the most elegant and refined chair designs ever created—its 
          graceful curves have never been surpassed in 2,500 years.&rdquo;
        </p>
        <cite>Yale Teachers Institute, Furniture Design Curriculum</cite>
        
        <div className="quote-context">
          <p>
            The ancient Greek klismos chair, with its gently curved backrest and splayed legs, 
            represents a revolutionary departure from the rigid thrones of Egypt. It was 
            designed for beauty and comfort—revolutionary concepts that would take centuries 
            to spread beyond the Mediterranean.
          </p>
        </div>
      </blockquote>
    </section>
  );
};

// ==================== TIMELINE: Medieval to Renaissance ====================
const TimelineSection: React.FC = () => {
  const { ref, isVisible } = useInView(0.1);

  const timelineItems = [
    {
      year: '500–1400 CE',
      title: 'Medieval Authority',
      text: 'Chairs remain symbols of power. Lords sit in high-backed wooden chairs; everyone else uses benches or stools. The common phrase "take a seat" was literal—only the privileged could.'
    },
    {
      year: '1450–1600',
      title: 'Renaissance Refinement',
      text: 'Italian craftsmen rediscover classical forms. Chairs become more common in wealthy homes, featuring turned legs, carved details, and upholstered seats.'
    },
    {
      year: '1550–1600',
      title: 'The Harvard Chair',
      text: 'Harvard\'s President\'s Chair, made in England or Wales between 1550–1600, exemplifies the imposing "great chairs" of the era—heavy, authoritative, built for ceremony.'
    },
    {
      year: '1700s',
      title: 'The Age of Styles',
      text: 'Queen Anne, Chippendale, Hepplewhite—the 18th century explodes with named styles. Pattern books spread designs across Europe and America.'
    }
  ];

  return (
    <section ref={ref} className={`timeline-section ${isVisible ? 'visible' : ''}`}>
      <h2>From Throne to Home</h2>
      
      <div className="timeline">
        {timelineItems.map((item, index) => (
          <div 
            key={item.year} 
            className="timeline-item"
            style={{ transitionDelay: `${index * 0.15}s` }}
          >
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-year">{item.year}</div>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-text">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ==================== FULL BLEED: Age of Craftsmen ====================
const CraftsmenSection: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`full-bleed ${isVisible ? 'animate-in visible' : 'animate-in'}`}>
      <div className="full-bleed-bg">
        <img 
          src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1920&q=80"
          alt="Traditional woodworking craftsmanship"
        />
        <div className="overlay" />
      </div>
      
      <div className="full-bleed-content">
        <span className="section-label">18th Century</span>
        
        <h2>The Age of Master Craftsmen</h2>
        
        <p>
          The 1700s transformed furniture-making into high art. Thomas Chippendale&apos;s 
          1754 pattern book, &ldquo;The Gentleman and Cabinet-Maker&apos;s Director,&rdquo; became the 
          furniture industry&apos;s first bestseller, spreading sophisticated designs across 
          the Atlantic to American craftsmen.
        </p>
        <p>
          Each chair was handcrafted—carved, joined, and finished by skilled artisans 
          over weeks or months. A fine chair cost a fortune and was meant to last 
          generations. But this era of bespoke craftsmanship was about to end.
        </p>
      </div>
    </section>
  );
};

// ==================== COMPARISON: Thonet Revolution ====================
const ThonetSection: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`comparison-section ${isVisible ? 'visible' : ''}`}>
      <div className="comparison-header">
        <span className="comparison-label">1859 — The Revolution</span>
        <h2>Thonet&apos;s Bentwood Breakthrough</h2>
      </div>
      
      <div className="comparison-container">
        <div className="comparison-panel before">
          <div className="panel-marker">Before</div>
          <div className="panel-content">
            <div className="panel-icon">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="15" width="60" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
                <rect x="20" y="25" width="60" height="40" stroke="currentColor" strokeWidth="2"/>
                <line x1="25" y1="65" x2="25" y2="90" stroke="currentColor" strokeWidth="3"/>
                <line x1="75" y1="65" x2="75" y2="90" stroke="currentColor" strokeWidth="3"/>
                <rect x="20" y="65" width="60" height="8" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Traditional Craft</h3>
            <p>
              Heavy wooden chairs assembled from dozens of carved and joined pieces. 
              Weeks of skilled labor. Expensive, fragile joints. Impossible to ship.
            </p>
            <ul className="panel-traits">
              <li><span className="trait-negative">✕</span> Expensive</li>
              <li><span className="trait-negative">✕</span> Heavy</li>
              <li><span className="trait-negative">✕</span> Fragile joints</li>
              <li><span className="trait-negative">✕</span> Weeks to build</li>
            </ul>
          </div>
        </div>

        <div className="comparison-divider">
          <div className="divider-line" />
          <div className="divider-year">1859</div>
          <div className="divider-line" />
        </div>

        <div className="comparison-panel after">
          <div className="panel-marker">After</div>
          <div className="panel-content">
            <div className="panel-icon">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="50" cy="25" rx="25" ry="15" stroke="currentColor" strokeWidth="2"/>
                <path d="M25 25 Q20 50 30 85" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M75 25 Q80 50 70 85" stroke="currentColor" strokeWidth="2" fill="none"/>
                <ellipse cx="50" cy="55" rx="20" ry="8" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Bentwood Innovation</h3>
            <p>
              Michael Thonet&apos;s Chair No. 14 used steam-bent beechwood and only 6 pieces, 
              10 screws, 2 nuts. Ships flat-packed. Assembled in minutes.
            </p>
            <ul className="panel-traits">
              <li><span className="trait-positive">✓</span> Affordable</li>
              <li><span className="trait-positive">✓</span> Lightweight</li>
              <li><span className="trait-positive">✓</span> Strong curves</li>
              <li><span className="trait-positive">✓</span> Mass-produced</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== STICKY SCROLL: Modernism ====================
const ModernismSection: React.FC = () => {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section ref={ref} className={`sticky-scroll-section ${isVisible ? 'visible' : ''}`}>
      <div className="sticky-element">
        <div className="sticky-content">
          <ChairIcon className="sticky-icon" />
          <h3>The Modern Revolution</h3>
          <p>
            The 20th century reimagined the chair from first principles. 
            New materials. New methods. New meanings.
          </p>
        </div>
      </div>
      
      <div className="scroll-panels">
        <div className="scroll-panel">
          <div className="scroll-panel-content">
            <div className="panel-label">1919–1933</div>
            <h4>Bauhaus: Form Follows Function</h4>
            <p>
              At the Bauhaus school, Marcel Breuer created the first tubular steel chair in 
              1925—inspired by bicycle handlebars. The Wassily Chair stripped seating to its 
              essence: metal frame, leather straps, nothing more.
            </p>
          </div>
        </div>
        
        <div className="scroll-panel">
          <div className="scroll-panel-content">
            <div className="panel-label">1929</div>
            <h4>The Barcelona Chair</h4>
            <p>
              Mies van der Rohe&apos;s Barcelona Chair became an icon of modernism—and a 
              contradiction. Designed for mass production, its leather and chrome construction 
              made it expensive and exclusive. Democratic ideals, elite pricing.
            </p>
          </div>
        </div>
        
        <div className="scroll-panel">
          <div className="scroll-panel-content">
            <div className="panel-label">1940s–1950s</div>
            <h4>Eames: True Democratic Design</h4>
            <p>
              Charles and Ray Eames perfected molded plywood and fiberglass to create 
              beautiful, affordable chairs for everyone. Their DCW and shell chairs finally 
              delivered on modernism&apos;s promise—great design accessible to the masses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== DATA VIZ: Democratic Design ====================
const StatsSection: React.FC = () => {
  const { ref, isVisible } = useInView();

  const stats = [
    { number: '50M+', label: 'Chair No. 14 Sold', detail: 'Thonet\'s design is history\'s best-selling chair' },
    { number: '6', label: 'Pieces Total', detail: 'The entire Chair No. 14 assembly' },
    { number: '36', label: 'Chairs Per Box', detail: 'Flat-packed for efficient shipping' },
    { number: '150+', label: 'Years In Production', detail: 'Still manufactured today' }
  ];

  return (
    <section ref={ref} className={`data-viz-section ${isVisible ? 'visible' : ''}`}>
      <h2>The Numbers Behind the Revolution</h2>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className={`stat-card ${isVisible ? 'animate-in visible' : 'animate-in'}`}
            style={{ transitionDelay: `${index * 0.12}s` }}
          >
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
            <p className="stat-detail">{stat.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ==================== SPLIT SCREEN REVERSE: Today ====================
const TodaySection: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`split-screen reverse ${isVisible ? 'visible' : ''}`}>
      <div className="split-image">
        <img 
          src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&q=80"
          alt="Modern minimal chair design"
        />
        <div className="image-overlay" />
        <div className="image-caption">Design for everyone</div>
      </div>
      
      <div className="split-content">
        <div className="era-badge">
          <span className="era-text">Today</span>
          <div className="era-line" />
        </div>
        
        <span className="subtitle">The Ubiquitous Object</span>
        <h2>The Democratic Seat</h2>
        
        <p>
          From pharaonic throne to IKEA flat-pack, the chair has completed its journey 
          from exclusive symbol of power to universal possession. We sit in chairs at work, 
          at home, in transit—so constantly that ergonomists now warn of &ldquo;sitting disease.&rdquo;
        </p>
        <p>
          Yet the chair remains a canvas for design innovation. Sustainable materials, 
          3D printing, ergonomic science—each generation reinvents this ancient object. 
          The search for the perfect seat continues.
        </p>
        
        <div className="highlight">
          <p>The average American spends over 8 hours per day sitting—more time than sleeping. 
          The chair has become, for better or worse, our default posture.</p>
        </div>
      </div>
    </section>
  );
};

// ==================== SOURCES ====================
const Sources: React.FC = () => (
  <section className="sources-section">
    <div className="sources-content">
      <h3 className="sources-title">Sources & Further Reading</h3>
      <ul className="sources-list">
        <li>
          <a href="https://teachersinstitute.yale.edu/curriculum/units/files/01.02.07.pdf" target="_blank" rel="noopener noreferrer">
            &ldquo;The Art of Furniture Making&rdquo; — Yale Teachers Institute
          </a>
        </li>
        <li>
          <a href="https://artgallery.yale.edu/sites/default/files/2023-04/Art_and_Industry_in_Early_America.pdf" target="_blank" rel="noopener noreferrer">
            &ldquo;Art and Industry in Early America&rdquo; — Yale University Art Gallery
          </a>
        </li>
        <li>
          <a href="https://news.harvard.edu/gazette/story/2001/10/an-imposing-ancient-and-curious-throne/" target="_blank" rel="noopener noreferrer">
            &ldquo;An Imposing, Ancient, and Curious Throne&rdquo; — Harvard Gazette
          </a>
        </li>
        <li>
          <a href="https://americanhistory.si.edu/collections/nmah_334962" target="_blank" rel="noopener noreferrer">
            &ldquo;George Washington&apos;s Red Wing Chair&rdquo; — Smithsonian American History
          </a>
        </li>
        <li>
          <a href="https://repository.si.edu/bitstreams/3ec113d9-3109-4021-8f0f-0c01b9a759ff/download" target="_blank" rel="noopener noreferrer">
            &ldquo;The Balloon Back Chair in America&rdquo; — Smithsonian Repository
          </a>
        </li>
        <li>
          <a href="https://idi.edu/history-of-the-chair/" target="_blank" rel="noopener noreferrer">
            &ldquo;History of the Chair&rdquo; — Interior Design Institute
          </a>
        </li>
      </ul>
      <p className="sources-note">
        All sources are from accredited educational institutions (.edu) or Smithsonian Institution (.si.edu).
      </p>
    </div>
  </section>
);

// ==================== FOOTER ====================
const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-icon">
        <ChairIcon />
      </div>
      <blockquote className="footer-quote">
        &ldquo;A chair is a very difficult object. A skyscraper is almost easier.&rdquo;
        <cite>— Ludwig Mies van der Rohe</cite>
      </blockquote>
      <div className="footer-divider" />
      <p className="footer-text">
        5,000 years of sitting, and we&apos;re still perfecting it.
      </p>
    </div>
  </footer>
);

// ==================== MAIN ====================
const ChairHistoryClient: React.FC = () => {
  return (
    <div className="chair-history-container">
      <ProgressBar />
      <Hero />
      <AncientEgyptSection />
      <KlismosQuote />
      <TimelineSection />
      <CraftsmenSection />
      <ThonetSection />
      <ModernismSection />
      <StatsSection />
      <TodaySection />
      <Sources />
      <Footer />
    </div>
  );
};

export default ChairHistoryClient;

