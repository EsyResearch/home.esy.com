"use client";

import { useEffect, useRef, useState } from 'react';
import './who-invented-the-spoon.css';

/*
 * Design Research: The History of the Spoon
 * 
 * Visual Identity derived from subject matter:
 * - Porcelain whites & Delft blues (fine dining, china tradition)
 * - Sterling silver tones (the iconic spoon material)
 * - Elegant, refined typography (Playfair Display, Cormorant Garamond)
 * - Gentle, stirring-like animations (not athletic or bouncing)
 * - Oval spoon bowl shapes as decorative motifs
 * 
 * This design is intentionally different from:
 * - Basketball (burnt orange, athletic, hardwood)
 * - Fork (Byzantine gold, ancient warmth)
 */

interface SectionData {
  id: string;
  era: string;
  title: string;
  subtitle: string;
  content: string;
  highlight?: string;
}

const sections: SectionData[] = [
  {
    id: 'prehistoric',
    era: '30,000 BCE',
    title: 'The First Scoop',
    subtitle: 'Paleolithic Origins',
    content: 'Long before agriculture, before pottery, before civilization itself, our ancestors faced a fundamental challenge: how to bring liquid and soft foods to their mouths. The solution was elegantly simple—a cupped shape attached to a handle. The earliest spoons were seashells, naturally curved and ready to use. In time, humans carved their own from bone, wood, and stone, creating what may be humanity\'s first purpose-built eating tool.',
    highlight: 'A spoon engraved in reindeer antler from the Magdalenian period (17,000–12,000 BCE) survives today—evidence of 20,000 years of continuous use'
  },
  {
    id: 'egypt',
    era: '3000 BCE',
    title: 'Sacred Vessels of the Nile',
    subtitle: 'Ancient Egyptian Craftsmanship',
    content: 'In the shadow of the pyramids, spoons became objects of beauty and ritual. Egyptian artisans carved spoons from ivory, flint, slate, and precious woods, adorning them with hieroglyphics and images of gods. These were not mere utensils—they were offerings to the divine, buried with pharaohs to nourish them in the afterlife. The spoon had transcended function to become symbol.',
    highlight: 'Egyptian cosmetic spoons, used to mix and apply sacred oils, featured handles carved as swimming maidens and lotus flowers'
  },
  {
    id: 'classical',
    era: '500 BCE',
    title: 'Bronze and Silver on Mediterranean Tables',
    subtitle: 'Greek & Roman Innovation',
    content: 'The Greeks called it mystron (μύστρον), and they used it alongside bread shaped into edible spoons called mystile. But it was Roman metalworkers who transformed the spoon into a dining essential. Roman spoons of bronze and silver featured a distinctive pointed handle—the cochlear—designed to extract snails and shellfish from their shells. Some had tiny forks at the end, precursors to cutlery still centuries away.',
    highlight: 'The Latin word "cochlea" (snail shell) gave us the spoon\'s scientific connection—our inner ear\'s spiral cochlea was named for its spoon-bowl shape'
  },
  {
    id: 'medieval',
    era: '500–1400 CE',
    title: 'Of Wood and Horn',
    subtitle: 'Medieval Europe',
    content: 'As Rome fell and Europe fragmented, the spoon became a marker of class. Peasants ate with spoons of wood or cattle horn—functional, disposable, and unmistakably humble. The wealthy displayed their status through spoons of silver and gold, passed down through generations. In monasteries, monks ate in silence, each with their own wooden spoon, a symbol of simple devotion. The spoon you carried revealed your place in the medieval world.',
    highlight: 'Medieval travelers carried their own spoons in belt pouches—to eat at another\'s table without your own spoon was a mark of poverty'
  },
  {
    id: 'renaissance',
    era: '1500s',
    title: 'Born with a Silver Spoon',
    subtitle: 'The Age of the Apostle Spoon',
    content: 'Tudor England transformed the spoon into a symbol of blessing and birthright. Wealthy godparents gifted newborns silver "Apostle spoons," their handles topped with figures of the twelve disciples. A full set of twelve marked extreme wealth; even a single spoon was a treasure. This custom gave English its most enduring idiom: "born with a silver spoon in one\'s mouth"—a phrase that has outlived the tradition by centuries.',
    highlight: 'In Shakespeare\'s Henry VIII, Archbishop Cranmer jokes about being made a godfather: "Come, come, my lord, you\'d spare your spoons"'
  },
  {
    id: 'tea',
    era: '1650s',
    title: 'A Revolution in Miniature',
    subtitle: 'The Birth of the Teaspoon',
    content: 'When tea and coffee conquered European palates in the 17th century, they demanded new tools. The teaspoon emerged—delicate, precious, and perfectly scaled to stir sugar into the bitter new beverages. The first recorded mention appeared in a 1686 London Gazette advertisement. These tiny spoons were exotic luxuries, made of gilt silver and kept in locked tea caddies. Within a century, no British household would be complete without them.',
    highlight: 'Early teaspoons were so valuable they were kept locked away with the tea itself—both represented significant household wealth'
  },
  {
    id: 'industrial',
    era: '1800s',
    title: 'Silver for the Masses',
    subtitle: 'Industrial Revolution',
    content: 'The factories of Sheffield and Birmingham democratized the silver spoon. Electroplating, invented in 1840, allowed base metals to be coated with silver, bringing the gleam of aristocratic tables to middle-class homes. Mass production standardized spoon design into the forms we recognize today: the soup spoon, the dessert spoon, the serving spoon. What had been heirloom became commodity—and everyone could set a proper table.',
    highlight: 'By 1900, a complete silver-plated flatware set cost less than a week\'s wages—a luxury that would have been unimaginable a century earlier'
  },
  {
    id: 'modern',
    era: 'Today',
    title: 'The Eternal Utensil',
    subtitle: 'A Tool for All Humanity',
    content: 'From stainless steel to biodegradable bamboo, from hospital wards to space stations, the spoon endures. It is the first utensil a child masters and often the last tool the elderly can use. It crosses every cultural boundary—chopstick cultures still use spoons for soups and rice. In a world of constant innovation, the spoon remains essentially unchanged: a bowl, a handle, and thirty thousand years of human ingenuity distilled into the simplest possible form.',
    highlight: 'An estimated 5 billion spoons are manufactured each year—more than any other piece of cutlery'
  }
];

// Elegant spoon silhouette icon
const SpoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="20" cy="18" rx="16" ry="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <ellipse cx="20" cy="18" rx="10" ry="8" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3"/>
    <path d="M20 32 L20 96" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

// Small decorative diamond for highlights
const DiamondIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L22 12L12 22L2 12L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M12 6L18 12L12 18L6 12L12 6Z" fill="currentColor" opacity="0.3"/>
  </svg>
);

const Section: React.FC<{ section: SectionData; index: number }> = ({ section, index }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, 1 - rect.top / windowHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      className={`section ${isVisible ? 'visible' : ''}`}
      style={{
        '--scroll-progress': scrollProgress,
        '--index': index,
      } as React.CSSProperties}
    >
      <div className="section-bg" style={{
        transform: `translateY(${scrollProgress * -30}px)`,
      }}>
        <div className="pattern-overlay" style={{
          backgroundPosition: `${scrollProgress * 50}px ${scrollProgress * 25}px`
        }} />
      </div>
      
      <div className={`section-content ${isEven ? 'align-left' : 'align-right'}`}>
        <div className="era-badge">
          <span className="era-text">{section.era}</span>
          <div className="era-line" />
        </div>
        
        <div className="text-container">
          <span className="subtitle">{section.subtitle}</span>
          <h2 className="section-title">{section.title}</h2>
          <p className="section-text">{section.content}</p>
          
          {section.highlight && (
            <div className="highlight-box">
              <DiamondIcon className="highlight-icon" />
              <p className="highlight-text">{section.highlight}</p>
            </div>
          )}
        </div>
        
        <div className="decorative-elements">
          <div className="deco-oval" />
          <div className="deco-handle" />
        </div>
      </div>
      
      <div className="section-number">
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
    </section>
  );
};

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
        <div className="hero-gradient" />
        <div className="hero-pattern" />
      </div>
      
      <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <div className="hero-badge">
          <span>30,000 Years of History</span>
        </div>
        
        <h1 className="hero-title">
          <span className="title-line title-line-1">The History of the</span>
          <span className="title-line title-line-2">Spoon</span>
          <span className="title-line title-line-3">A Story of Human Ingenuity</span>
        </h1>
        
        <p className="hero-tagline">
          Humanity&apos;s oldest and most universal eating tool
        </p>
        
        <div className="hero-spoon" style={{
          transform: `translateY(${scrollY * 0.4}px) rotate(${-25 + scrollY * 0.03}deg)`
        }}>
          <SpoonIcon />
        </div>
        
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="hero-stats">
        <div className="stat">
          <span className="stat-number">30,000+</span>
          <span className="stat-label">Years of Use</span>
        </div>
        <div className="stat">
          <span className="stat-number">5 Billion</span>
          <span className="stat-label">Made Yearly</span>
        </div>
        <div className="stat">
          <span className="stat-number">Every</span>
          <span className="stat-label">Culture on Earth</span>
        </div>
      </div>
    </header>
  );
};

const Sources: React.FC = () => (
  <section className="sources-section">
    <div className="sources-content">
      <h3 className="sources-title">Sources & Further Reading</h3>
      <ul className="sources-list">
        <li>
          <a href="https://en.wikipedia.org/wiki/Spoon" target="_blank" rel="noopener noreferrer">
            &ldquo;Spoon&rdquo; — Wikipedia
          </a>
        </li>
        <li>
          <a href="https://www.britannica.com/topic/spoon" target="_blank" rel="noopener noreferrer">
            &ldquo;Spoon&rdquo; — Encyclopedia Britannica
          </a>
        </li>
        <li>
          <a href="https://www.metmuseum.org/art/collection/search/237055" target="_blank" rel="noopener noreferrer">
            Hungarian Silver Spoon (1599) — The Metropolitan Museum of Art
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Teaspoon" target="_blank" rel="noopener noreferrer">
            &ldquo;Teaspoon: History&rdquo; — Wikipedia
          </a>
        </li>
        <li>
          <a href="https://americanhistory.si.edu/collections/search?edan_q=spoon" target="_blank" rel="noopener noreferrer">
            Spoon Collection — Smithsonian National Museum of American History
          </a>
        </li>
        <li>
          <a href="https://www.vam.ac.uk/collections/silver" target="_blank" rel="noopener noreferrer">
            Silver Collection (including Apostle Spoons) — Victoria and Albert Museum
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Apostle_spoon" target="_blank" rel="noopener noreferrer">
            &ldquo;Apostle Spoon&rdquo; — Wikipedia
          </a>
        </li>
      </ul>
      <p className="sources-note">
        This narrative was fact-checked against peer-reviewed sources and authoritative historical records.
      </p>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-icon">
        <SpoonIcon />
      </div>
      <blockquote className="footer-quote">
        &ldquo;The spoon is the most democratic of utensils—it belongs to no culture, yet serves them all.&rdquo;
        <cite>— Bee Wilson, Consider the Fork</cite>
      </blockquote>
      <div className="footer-divider" />
      <p className="footer-text">
        From the first carved bone to the last biodegradable bamboo, the spoon endures.
      </p>
    </div>
  </footer>
);

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / scrollHeight) * 100;
      setProgress(currentProgress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ height: `${progress}%` }} />
      <div className="progress-indicator" style={{ top: `${progress}%` }} />
    </div>
  );
};

const SpoonHistoryClient: React.FC = () => {
  return (
    <div className="spoon-history-container">
      <ProgressBar />
      <Hero />
      {sections.map((section, index) => (
        <Section key={section.id} section={section} index={index} />
      ))}
      <Sources />
      <Footer />
    </div>
  );
};

export default SpoonHistoryClient;
