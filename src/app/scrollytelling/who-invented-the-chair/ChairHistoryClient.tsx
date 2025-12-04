"use client";

import { useEffect, useRef, useState } from 'react';
import './who-invented-the-chair.css';

/*
 * Design Research: The History of the Chair
 * SECOND ITERATION - Scholarly Manuscript Edition
 * 
 * COMPLETELY DIFFERENT from other scrollytelling:
 * - Light parchment backgrounds (not dark themes)
 * - Text-forward design (hero is ONLY image)
 * - Manuscript typography with drop caps
 * - Chapter structure with roman numerals
 * - Marginalia, footnotes, catalog cards
 * - Academic/archival aesthetic
 * 
 * Layout Patterns (6 unique, all text-forward):
 * - Hero: full-bleed image (only image)
 * - Chapter: drop cap opening with numbered sections
 * - Marginalia: three-column with side notes
 * - Catalog: museum card grid
 * - Quote: illuminated manuscript style
 * - Timeline: margin-annotated vertical
 * - Footnote: academic aside
 * - Stat: large number highlight
 * - Closing: centered epilogue
 * 
 * All citations from .edu sources only.
 */

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
          alt="Elegant furniture"
          style={{ transform: `scale(${1 + scrollY * 0.0002}) translateY(${scrollY * 0.15}px)` }}
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <div className="hero-badge">A History in Five Millennia</div>
        
        <h1>
          Who Invented
          <span className="title-accent">The Chair?</span>
        </h1>
        
        <p className="hero-tagline">
          From the throne rooms of pharaohs to the flat-pack aisles of IKEA—
          the improbable journey of humanity&apos;s most democratic furniture.
        </p>
      </div>

      <div className="scroll-cue">
        <span>Scroll to begin</span>
        <div className="scroll-line" />
      </div>
    </header>
  );
};

// ==================== CHAPTER I ====================
const ChapterOne: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`chapter fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="chapter-number">I</div>
      <h2 className="chapter-title">The Throne Before the Chair</h2>
      <div className="chapter-subtitle">Ancient Egypt, c. 3100 BCE</div>
      
      <p>
        The chair began not as furniture, but as symbol. In the Nile Valley, where 
        civilization first flowered into organized complexity, chairs were reserved 
        exclusively for those who commanded divine authority. Common people—merchants, 
        scribes, farmers—sat on the ground or on simple reed mats. The chair was never 
        merely a place to rest; it was a throne, a physical manifestation of power 
        elevated above the mass of humanity.
      </p>
      <p>
        The word &ldquo;chairman&rdquo; echoes this ancient distinction. To sit in the chair was 
        to possess authority. The pharaohs of Egypt understood this instinctively, 
        commissioning thrones carved with lion&apos;s paws and inlaid with lapis lazuli, 
        gold, and ivory. When Tutankhamun&apos;s tomb was opened in 1922, among its 
        treasures was a golden throne so magnificent it seemed to glow with the 
        authority of three millennia.
      </p>
    </section>
  );
};

// ==================== MARGINALIA SECTION ====================
const GreekInnovation: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`marginalia-section fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="marginalia-left">
        <div className="margin-note">
          <span className="note-year">c. 500 BCE</span>
          The klismos appears in Greek vase paintings, its curved legs and 
          concave back unlike anything before.
        </div>
        <div className="margin-note">
          <span className="note-year">Note</span>
          No original klismos chairs survive; our knowledge comes entirely 
          from artistic depictions.
        </div>
      </div>
      
      <div className="marginalia-content">
        <h2>The Greek Revolution: Comfort as Concept</h2>
        <p>
          The Greeks did something radical. They asked: what if a chair could be 
          beautiful? What if it could be comfortable? The klismos chair, with its 
          gently curved backrest and elegant splayed legs, represents one of history&apos;s 
          great design innovations—a departure from the rigid, imposing thrones of 
          Egypt and Mesopotamia toward something almost modern in its consideration 
          of the human body.
        </p>
        <p>
          As the Yale Teachers Institute curriculum notes, the klismos &ldquo;is one of 
          the most elegant and refined chair designs ever created—its graceful 
          curves have never been surpassed in 2,500 years.&rdquo; This was furniture 
          designed not just for ceremony, but for life: for conversation, for 
          reading, for the simple pleasure of sitting well.
        </p>
      </div>
      
      <div className="marginalia-right">
        <div className="margin-note">
          <span className="note-year">Revival</span>
          The klismos experienced a renaissance during the neoclassical period, 
          influencing Regency and Empire furniture.
        </div>
      </div>
    </section>
  );
};

// ==================== ILLUMINATED QUOTE ====================
const IlluminatedQuote: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`illuminated-quote fade-in ${isVisible ? 'visible' : ''}`}>
      <blockquote>
        <p>
          &ldquo;A chair is a very difficult object. A skyscraper is almost easier.&rdquo;
        </p>
        <cite>Ludwig Mies van der Rohe, Architect</cite>
      </blockquote>
    </section>
  );
};

// ==================== CATALOG ENTRIES ====================
const CatalogSection: React.FC = () => {
  const { ref, isVisible } = useInView(0.1);

  const entries = [
    {
      number: 'CAT. NO. 001',
      title: 'The Medieval Great Chair',
      date: 'c. 1200–1500 CE',
      description: 'Heavy, imposing, built for lords. The &ldquo;great chair&rdquo; at the head of the table signified authority in medieval halls. Everyone else used benches.'
    },
    {
      number: 'CAT. NO. 002',
      title: 'The Windsor Chair',
      date: 'c. 1710, England',
      description: 'Spindle-back construction from local woods. Vernacular craftsmanship that became an American icon, adapted by generations of rural chairmakers.'
    },
    {
      number: 'CAT. NO. 003',
      title: 'Thonet No. 14',
      date: '1859, Vienna',
      description: 'The first mass-produced chair. Six bent-wood pieces, 10 screws, 2 nuts. Ships flat-packed. Over 50 million sold—still in production today.'
    },
    {
      number: 'CAT. NO. 004',
      title: 'The Wassily Chair',
      date: '1925, Bauhaus',
      description: 'Marcel Breuer&apos;s tubular steel revolution. Inspired by bicycle handlebars. Modernism stripped to its essence: metal frame, leather straps, nothing more.'
    }
  ];

  return (
    <section ref={ref} className={`catalog-section fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="catalog-grid">
        {entries.map((entry, index) => (
          <div 
            key={entry.number} 
            className={`catalog-card stagger-${index + 1}`}
          >
            <div className="catalog-number">{entry.number}</div>
            <h3 className="catalog-title">{entry.title}</h3>
            <div className="catalog-date">{entry.date}</div>
            <p className="catalog-description" dangerouslySetInnerHTML={{ __html: entry.description }} />
          </div>
        ))}
      </div>
    </section>
  );
};

// ==================== MANUSCRIPT TIMELINE ====================
const ManuscriptTimeline: React.FC = () => {
  const { ref, isVisible } = useInView(0.1);

  const entries = [
    {
      year: '1754',
      title: 'Chippendale\'s Director',
      text: 'Thomas Chippendale publishes "The Gentleman and Cabinet-Maker\'s Director"—the furniture industry\'s first bestseller, spreading sophisticated designs across the Atlantic.'
    },
    {
      year: '1859',
      title: 'The Bentwood Revolution',
      text: 'Michael Thonet patents steam-bent beechwood. Chair No. 14 proves furniture can be affordable, elegant, and mass-produced simultaneously.'
    },
    {
      year: '1929',
      title: 'The Barcelona Chair',
      text: 'Mies van der Rohe creates an icon for the Barcelona Pavilion. Modernism\'s contradiction: designed for democracy, priced for the elite.'
    },
    {
      year: '1948',
      title: 'Eames Delivers',
      text: 'Charles and Ray Eames perfect molded plywood and fiberglass. Beautiful, affordable chairs for everyone. Modernism\'s promise finally fulfilled.'
    }
  ];

  return (
    <section ref={ref} className={`manuscript-timeline fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="timeline-header">
        <h2>Key Moments in Chair History</h2>
        <p>A selective chronology of innovation</p>
      </div>
      
      <div className="timeline-entries">
        {entries.map((entry, index) => (
          <div 
            key={entry.year} 
            className={`timeline-entry stagger-${index + 1}`}
          >
            <div className="timeline-year">{entry.year}</div>
            <h3 className="timeline-title">{entry.title}</h3>
            <p className="timeline-text">{entry.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ==================== FOOTNOTE SECTION ====================
const FootnoteSection: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`footnote-section fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="footnote-content">
        <div className="footnote-marker">†</div>
        <div className="footnote-text">
          <h3>A Note on &ldquo;The Harvard Chair&rdquo;</h3>
          <p>
            Harvard University possesses one of America&apos;s most significant historical 
            chairs: the President&apos;s Chair, made in England or Wales between 1550–1600. 
            As the Harvard Gazette describes it, this &ldquo;imposing, ancient, and curious 
            throne&rdquo; exemplifies the ceremonial function of chairs in early modern 
            institutions—furniture as symbol of academic authority.
          </p>
        </div>
      </div>
    </section>
  );
};

// ==================== STAT HIGHLIGHT ====================
const StatHighlight: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`stat-highlight fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="stat-number">50M+</div>
      <div className="stat-label">Thonet Chair No. 14 Sold Since 1859</div>
      <p className="stat-context">
        The most successful chair design in history—a single model still manufactured 
        after 165 years, purchased by cafés, homes, and institutions worldwide.
      </p>
    </section>
  );
};

// ==================== CLOSING CHAPTER ====================
const ClosingChapter: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`closing-chapter fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="closing-ornament">❧</div>
      <h2>The Democratic Seat</h2>
      <p>
        From pharaonic throne to IKEA flat-pack, the chair has completed its 
        improbable journey from exclusive symbol of divine right to universal 
        possession. We sit so constantly now—at work, at home, in transit—that 
        ergonomists warn of &ldquo;sitting disease.&rdquo;
      </p>
      <p>
        Yet the chair remains a canvas for design innovation. Sustainable materials, 
        3D printing, ergonomic science—each generation reinvents this ancient object. 
        The search for the perfect seat, it seems, is never finished.
      </p>
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
      <div className="footer-ornament">✦</div>
      <blockquote>
        <p>
          &ldquo;We shape our buildings, and afterwards our buildings shape us.&rdquo;
        </p>
        <cite>Winston Churchill, 1943</cite>
      </blockquote>
      <div className="footer-divider" />
      <p className="footer-colophon">
        Five thousand years of sitting, and we&apos;re still perfecting it.
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
      <ChapterOne />
      <GreekInnovation />
      <IlluminatedQuote />
      <CatalogSection />
      <ManuscriptTimeline />
      <FootnoteSection />
      <StatHighlight />
      <ClosingChapter />
      <Sources />
      <Footer />
    </div>
  );
};

export default ChairHistoryClient;
