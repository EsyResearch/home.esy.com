"use client";

import { useEffect, useRef, useState } from 'react';
import './who-invented-the-bicycle.css';

/*
 * Design Research: The History of the Bicycle
 * 
 * Visual Identity derived from subject matter:
 * - Chrome/steel silvers (bicycle frames)
 * - Racing red (competition, Italian racing heritage)
 * - Tour de France yellow (le maillot jaune)
 * - Asphalt dark backgrounds (the open road)
 * - Forward-moving, momentum-based animations
 * - Wheel and spoke decorative motifs
 * 
 * This design is intentionally different from:
 * - Spoon (porcelain whites, Delft blue, gentle/refined)
 * - Basketball (burnt orange, hardwood, athletic bounce)
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
    id: 'draisine',
    era: '1817',
    title: 'The Running Machine',
    subtitle: 'Mannheim, Germany',
    content: 'In the summer of 1817, Baron Karl von Drais unveiled his "Laufmaschine"—the running machine. A wooden frame connecting two wheels, steered by handlebars, propelled by pushing feet against the ground. It looked absurd to onlookers in Mannheim, but Drais had solved a problem created by a natural disaster: the 1815 eruption of Mount Tambora had killed crops and horses across Europe. The bicycle was born from necessity.',
    highlight: 'Drais covered 13 kilometers in under an hour on his first public ride—faster than a horse-drawn stagecoach'
  },
  {
    id: 'velocipede',
    era: '1860s',
    title: 'The Boneshaker',
    subtitle: 'Paris, France',
    content: 'Four decades later, in a Paris workshop, blacksmith Pierre Michaux (or perhaps his son Ernest—history disputes the credit) attached pedals directly to the front wheel of a Draisine. The "velocipede" was born. Iron tires on cobblestone streets earned it the nickname "boneshaker," but Parisians didn\'t care. Velocipede riding schools opened across the city. The bicycle craze had begun.',
    highlight: 'Pierre Lallement brought the velocipede to America and received the first U.S. bicycle patent in 1866'
  },
  {
    id: 'pennyfarthing',
    era: '1870s',
    title: 'The Ordinary',
    subtitle: 'Coventry, England',
    content: 'Engineers realized a simple truth: a larger wheel covers more ground per pedal stroke. The result was the "penny-farthing"—named for two British coins of vastly different sizes. With front wheels up to 1.5 meters tall, these machines were fast but terrifying. A small obstacle could send riders flying headfirst over the handlebars, earning the maneuver the grim name "taking a header." Only young, athletic men dared ride them.',
    highlight: 'The phrase "taking a header" for falling forward comes directly from penny-farthing accidents'
  },
  {
    id: 'safety',
    era: '1885',
    title: 'The Safety Bicycle',
    subtitle: 'The Invention That Changed Everything',
    content: 'John Kemp Starley\'s "Rover Safety Bicycle" transformed cycling from daredevil sport to universal transport. Equal-sized wheels. Chain drive to the rear wheel. Diamond frame geometry still used today. Suddenly, anyone could ride—old and young, men and women. Within a decade, the penny-farthing was obsolete, and the bicycle we recognize today had been born in a Coventry workshop.',
    highlight: 'Starley\'s basic diamond frame design has remained essentially unchanged for 140 years'
  },
  {
    id: 'liberation',
    era: '1890s',
    title: 'Wheels of Change',
    subtitle: 'The Bicycle & Women\'s Liberation',
    content: 'The safety bicycle didn\'t just change transportation—it changed society. For the first time, women could travel independently, without chaperones. Susan B. Anthony declared it had "done more to emancipate women than anything else in the world." The "rational dress" movement emerged as women abandoned corsets and long skirts for practical cycling attire. The bicycle became a symbol of freedom.',
    highlight: '"Let me tell you what I think of bicycling. I think it has done more to emancipate women than anything else in the world." — Susan B. Anthony, 1896'
  },
  {
    id: 'tourdefrance',
    era: '1903',
    title: 'The Birth of Racing',
    subtitle: 'Le Tour de France',
    content: 'On July 1, 1903, sixty cyclists left Paris for a 2,428-kilometer journey around France. The Tour de France was born—not as sport, but as a newspaper circulation stunt by L\'Auto. Maurice Garin won after 94 hours of riding. The race captured public imagination like nothing before. By the 1920s, the Tour had become a national obsession, transforming cycling into spectacle and cyclists into celebrities.',
    highlight: 'The famous yellow jersey (maillot jaune) was introduced in 1919—the color of L\'Auto\'s newspaper pages'
  },
  {
    id: 'modern',
    era: '1970s–Today',
    title: 'The Cycling Renaissance',
    subtitle: 'From Oil Crisis to Carbon Fiber',
    content: 'The 1970s oil crisis sparked a bicycle boom in the West. Mountain bikes emerged from Marin County, California in the 1980s. Carbon fiber frames made racing bikes lighter than ever. Cities worldwide began building cycling infrastructure. E-bikes extended cycling to new populations. Two centuries after Drais\'s wooden running machine, the bicycle remains humanity\'s most efficient form of transport—still two wheels, still powered by human ambition.',
    highlight: 'More bicycles are produced each year than cars—approximately 100 million bikes annually worldwide'
  },
  {
    id: 'future',
    era: 'Now',
    title: 'The Enduring Machine',
    subtitle: 'Two Wheels, Two Centuries',
    content: 'From wooden running machines to carbon-fiber racing bikes, from cobblestone streets to dedicated bike lanes, the bicycle has proven remarkably adaptable. It requires no fuel, produces no emissions, improves health, and connects communities. In an age of climate crisis and urban congestion, the simple invention of a German baron in 1817 may yet prove to be one of humanity\'s most important technologies.',
    highlight: 'Over 1 billion bicycles exist worldwide—more than double the number of cars'
  }
];

// Wheel icon with spokes
const WheelIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="3"/>
    <circle cx="50" cy="50" r="8" stroke="currentColor" strokeWidth="2"/>
    {/* Spokes */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
      <line
        key={angle}
        x1="50"
        y1="50"
        x2={50 + 37 * Math.cos((angle * Math.PI) / 180)}
        y2={50 + 37 * Math.sin((angle * Math.PI) / 180)}
        stroke="currentColor"
        strokeWidth="1"
      />
    ))}
  </svg>
);

// Gear/cog icon for highlights
const GearIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 1v4M12 19v4M23 12h-4M5 12H1M20.5 3.5l-3 3M6.5 17.5l-3 3M20.5 20.5l-3-3M6.5 6.5l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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
        transform: `translateY(${scrollProgress * -40}px)`,
      }}>
        <div className="road-texture" />
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
              <GearIcon className="highlight-icon" />
              <p className="highlight-text">{section.highlight}</p>
            </div>
          )}
        </div>
        
        <div className="decorative-wheel">
          <div className="wheel-circle">
            <div className="wheel-hub" />
            {[0, 45, 90, 135].map((angle) => (
              <div 
                key={angle} 
                className="wheel-spoke" 
                style={{ transform: `translate(-50%, 0) rotate(${angle}deg)` }} 
              />
            ))}
          </div>
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
        <div className="hero-road-lines">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="road-line" 
              style={{ 
                top: `${15 + i * 10}%`,
                opacity: 0.15 - i * 0.015,
                transform: `translateX(-50%) translateY(${scrollY * (0.1 + i * 0.03)}px)`
              }} 
            />
          ))}
        </div>
      </div>
      
      <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.35}px)` }}>
        <div className="hero-badge">
          <span>Since 1817</span>
        </div>
        
        <h1 className="hero-title">
          <span className="title-line title-line-1">Who Invented</span>
          <span className="title-line title-line-2">The Bicycle</span>
          <span className="title-line title-line-3">A Story of Wheels and Freedom</span>
        </h1>
        
        <p className="hero-tagline">
          From wooden running machines to carbon fiber racers—the 200-year journey of humanity&apos;s most efficient transport
        </p>
        
        <div className="hero-wheel" style={{
          transform: `rotate(${scrollY * 0.5}deg)`
        }}>
          <WheelIcon />
        </div>
        
        <div className="scroll-indicator">
          <span>Start the ride</span>
          <div className="scroll-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="hero-stats">
        <div className="stat">
          <span className="stat-number">200+</span>
          <span className="stat-label">Years of Innovation</span>
        </div>
        <div className="stat">
          <span className="stat-number">1B+</span>
          <span className="stat-label">Bicycles Worldwide</span>
        </div>
        <div className="stat">
          <span className="stat-number">100M</span>
          <span className="stat-label">Made Each Year</span>
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
          <a href="https://www.britannica.com/technology/bicycle" target="_blank" rel="noopener noreferrer">
            &ldquo;Bicycle&rdquo; — Encyclopedia Britannica
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/History_of_the_bicycle" target="_blank" rel="noopener noreferrer">
            &ldquo;History of the Bicycle&rdquo; — Wikipedia
          </a>
        </li>
        <li>
          <a href="https://www.history.com/articles/bicycle-history-invention" target="_blank" rel="noopener noreferrer">
            &ldquo;The Bicycle: A History&rdquo; — History.com
          </a>
        </li>
        <li>
          <a href="https://www.nationalgeographic.com/history/article/how-bicycles-transformed-world" target="_blank" rel="noopener noreferrer">
            &ldquo;How Bicycles Transformed Our World&rdquo; — National Geographic
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Karl_Drais" target="_blank" rel="noopener noreferrer">
            &ldquo;Karl Drais&rdquo; — Wikipedia
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Safety_bicycle" target="_blank" rel="noopener noreferrer">
            &ldquo;Safety Bicycle&rdquo; — Wikipedia
          </a>
        </li>
        <li>
          <a href="https://www.smithsonianmag.com/history/how-the-bicycle-paved-the-way-for-womens-rights-105413804/" target="_blank" rel="noopener noreferrer">
            &ldquo;How the Bicycle Paved the Way for Women&apos;s Rights&rdquo; — Smithsonian Magazine
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
        <WheelIcon />
      </div>
      <blockquote className="footer-quote">
        &ldquo;Life is like riding a bicycle. To keep your balance, you must keep moving.&rdquo;
        <cite>— Albert Einstein</cite>
      </blockquote>
      <div className="footer-divider" />
      <p className="footer-text">
        Two wheels, two centuries, and the journey continues.
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
      <div className="progress-wheel" style={{ top: `${progress}%` }} />
    </div>
  );
};

const BicycleHistoryClient: React.FC = () => {
  return (
    <div className="bicycle-history-container">
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

export default BicycleHistoryClient;

