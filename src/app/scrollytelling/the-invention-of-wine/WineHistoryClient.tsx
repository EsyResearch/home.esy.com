"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import './the-invention-of-wine.css';

/**
 * THE INVENTION OF WINE - 8,000 Years in a Glass
 * 
 * RADICAL Anti-Pattern-Matching Applied:
 * ✅ NO timeline cards (horizontal scroll parallax instead)
 * ✅ NO section label/title/text blocks (integrated layouts)
 * ✅ NO data grids (animated splash counters)
 * ✅ NO fixed left-side indicator (background bottle animation)
 * 
 * UNIQUE MECHANICS (Wine-Specific):
 * 1. Pouring bottle SVG - tilts in background as you scroll
 * 2. Fermentation bubbles - CO2 rising animation
 * 3. Horizontal parallax timeline - eras scroll horizontally via vertical scroll
 * 4. Grape cluster → wine drop transformation
 * 5. Split screen contrast (grape purple vs wine red)
 * 6. Full-screen quote takeover with giant quote mark
 * 7. Animated data counters on splash gradient
 * 
 * Forcing Question Answer:
 * "What could ONLY exist in a wine story?"
 * → Fermentation bubbles, grape→wine transformation, horizontal era timeline, pour animation
 */

// Timeline Eras for horizontal parallax
const eras = [
  {
    year: '6000 BCE',
    title: 'The First Vintage',
    text: 'In the hills of the South Caucasus, Neolithic farmers discover that crushed grapes left in clay jars transform into something extraordinary. The Eurasian grape vine (Vitis vinifera) is domesticated.',
    location: 'Georgia & Armenia'
  },
  {
    year: '3150 BCE',
    title: 'Wine of the Pharaohs',
    text: 'Wine reaches Egypt. King Scorpion I is buried with 700 jars. Hieroglyphics document sophisticated cultivation. Wine becomes the drink of gods and kings.',
    location: 'Ancient Egypt'
  },
  {
    year: '1500 BCE',
    title: 'Dionysus Rises',
    text: 'The Greeks worship Dionysus, god of wine and ecstasy. Symposia—drinking parties with philosophy—shape Western civilization. Viticulture spreads across the Mediterranean.',
    location: 'Ancient Greece'
  },
  {
    year: '200 BCE',
    title: 'Bacchus and Empire',
    text: 'Rome perfects large-scale production. Wooden barrels replace amphorae. Grape varieties are classified. Vineyards spread across Gaul, Iberia, and Germania.',
    location: 'Roman Empire'
  },
  {
    year: '1668 CE',
    title: 'Monks and Champagne',
    text: 'For centuries, monasteries preserve viticulture. Cistercian monks classify Burgundy terroir. Dom Pérignon advances sparkling wine. The great wine regions emerge.',
    location: 'Medieval Europe'
  },
];

const WineHistoryClient: React.FC = () => {
  const [bottleRotation, setBottleRotation] = useState(0);
  const [wineLevel, setWineLevel] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [visibleData, setVisibleData] = useState<number[]>([]);
  
  const timelineRef = useRef<HTMLDivElement>(null);
  const dataRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Update bottle animation and timeline based on scroll
  const updateFromScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(window.scrollY / scrollHeight, 1);
    
    // Bottle tilts and wine level increases
    setBottleRotation(scrollProgress * 45); // 0 to 45 degrees
    setWineLevel(scrollProgress * 100);
    
    // Timeline horizontal scroll (for the parallax section)
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const sectionHeight = timelineRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const sectionProgress = Math.max(0, Math.min(1, 
          (viewportHeight - rect.top) / (sectionHeight)
        ));
        setTimelineProgress(sectionProgress);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateFromScroll, { passive: true });
    updateFromScroll();
    return () => window.removeEventListener('scroll', updateFromScroll);
  }, [updateFromScroll]);

  // Intersection observer for data counters
  useEffect(() => {
    const dataObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = dataRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setTimeout(() => {
              setVisibleData(prev => [...new Set([...prev, index])]);
            }, index * 200);
          }
        }
      });
    }, { threshold: 0.5 });

    dataRefs.current.forEach(ref => ref && dataObserver.observe(ref));
    return () => dataObserver.disconnect();
  }, []);

  return (
    <div className="wine-story">
      
      {/* Background Pouring Bottle */}
      <div className="bottle-pour-container">
        <svg 
          className="bottle-svg" 
          viewBox="0 0 200 300"
          style={{ transform: `rotate(${bottleRotation}deg)` }}
        >
          {/* Bottle shape */}
          <path 
            className="bottle-glass"
            d="M80 20 L80 80 Q60 100 60 140 L60 280 Q60 290 70 290 L130 290 Q140 290 140 280 L140 140 Q140 100 120 80 L120 20 Z"
          />
          {/* Wine inside bottle */}
          <clipPath id="bottle-clip">
            <path d="M62 142 L62 278 Q62 288 72 288 L128 288 Q138 288 138 278 L138 142 Q138 102 118 82 L118 142 Z" />
          </clipPath>
          <rect 
            className="wine-liquid"
            x="60" 
            y={290 - (wineLevel * 1.5)} 
            width="80" 
            height={wineLevel * 1.5}
            clipPath="url(#bottle-clip)"
          />
          {/* Pour stream when tilted enough */}
          {bottleRotation > 20 && (
            <ellipse 
              className="wine-stream pouring"
              cx="145" 
              cy="120" 
              rx="8" 
              ry={bottleRotation - 15}
              style={{ 
                fill: 'var(--wine-young)',
                opacity: Math.min(1, (bottleRotation - 20) / 25)
              }}
            />
          )}
        </svg>
      </div>

      {/* === HERO === */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-year">6000</div>
        <div className="hero-content">
          <h1 className="hero-title">
            The Invention<br />of <em>Wine</em>
          </h1>
          <p className="hero-intro">
            Before writing. Before the wheel. Before cities rose and empires fell.
            Humanity discovered the magic of fermentation—and nothing was ever the same.
          </p>
        </div>
        <div className="hero-scroll">
          <span className="hero-scroll-text">Pour</span>
          <div className="wine-drop" />
        </div>
      </section>

      {/* === GRAPE TO WINE TRANSFORMATION === */}
      <section className="grape-section">
        <div className="wine-stain stain-1" />
        <div className="grape-transform">
          <svg className="grape-svg" viewBox="0 0 100 100">
            {/* Grape cluster */}
            <circle className="grape-circle" cx="35" cy="30" r="12" />
            <circle className="grape-circle" cx="55" cy="25" r="14" />
            <circle className="grape-circle" cx="70" cy="35" r="11" />
            <circle className="grape-circle" cx="30" cy="50" r="13" />
            <circle className="grape-circle" cx="50" cy="45" r="15" />
            <circle className="grape-circle" cx="70" cy="55" r="12" />
            <circle className="grape-circle" cx="40" cy="70" r="14" />
            <circle className="grape-circle" cx="60" cy="72" r="13" />
            {/* Stem */}
            <path d="M50 10 Q55 5 60 8" stroke="var(--cork)" strokeWidth="3" fill="none" />
          </svg>
          
          <span className="transform-arrow">→</span>
          
          <svg className="wine-drop-svg" viewBox="0 0 100 140">
            <path 
              className="drop-shape"
              d="M50 10 Q20 60 20 90 Q20 130 50 130 Q80 130 80 90 Q80 60 50 10"
            />
          </svg>
        </div>
        <div className="grape-text">
          <h2>Wild grapes, crushed and forgotten</h2>
          <p>
            In clay vessels across the Caucasus, wild Vitis vinifera grapes were left 
            to their own devices. Natural yeasts on the skins began their ancient work, 
            converting sugars to alcohol. The first winemakers discovered their creation 
            by accident—and recognized its power immediately.
          </p>
        </div>
      </section>

      {/* === FERMENTATION VAT === */}
      <section className="vat-section fermentation-section">
        {/* Bubbles */}
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        
        <div className="vat-container">
          <svg className="vat-svg" viewBox="0 0 150 200">
            {/* Vat outline */}
            <path 
              className="vat-body"
              d="M20 30 L20 180 Q20 195 35 195 L115 195 Q130 195 130 180 L130 30 Q130 15 115 15 L35 15 Q20 15 20 30"
            />
            {/* Wine in vat */}
            <rect className="vat-liquid" x="22" y="50" width="106" height="143" rx="10" />
            {/* Bubbles inside */}
            <circle cx="50" cy="120" r="4" fill="rgba(247,231,206,0.3)">
              <animate attributeName="cy" values="150;60;150" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.6;0" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="80" cy="140" r="3" fill="rgba(247,231,206,0.3)">
              <animate attributeName="cy" values="160;70;160" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.5;0" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="130" r="5" fill="rgba(247,231,206,0.3)">
              <animate attributeName="cy" values="155;65;155" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.4;0" dur="3.5s" repeatCount="indefinite" />
            </circle>
          </svg>
          
          <div className="vat-content">
            <h2>The Magic of Fermentation</h2>
            <p>
              Yeast consumes sugar. Alcohol and CO₂ are born. This transformation—
              invisible to the ancient eye—seemed nothing short of divine. 
              The bubbling, the changing flavors, the warming effect: 
              early humans attributed it to the gods.
            </p>
            <p>
              The process remains essentially unchanged after 8,000 years. 
              Wild yeasts still cling to grape skins. Fermentation still produces 
              roughly 12-14% alcohol. Nature perfected the formula long ago.
            </p>
            <div className="ferment-stats">
              <div className="ferment-stat">
                <div className="ferment-value">14%</div>
                <div className="ferment-label">Max Natural Alcohol</div>
              </div>
              <div className="ferment-stat">
                <div className="ferment-value">2-4</div>
                <div className="ferment-label">Weeks to Ferment</div>
              </div>
              <div className="ferment-stat">
                <div className="ferment-value">8,000</div>
                <div className="ferment-label">Years of Tradition</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === HORIZONTAL PARALLAX TIMELINE === */}
      <section className="parallax-timeline" ref={timelineRef}>
        <div className="timeline-sticky">
          <div 
            className="timeline-track"
            style={{ transform: `translateX(-${timelineProgress * (eras.length - 1) * 100}vw)` }}
          >
            {eras.map((era, index) => (
              <div key={index} className={`timeline-era era-${index + 1}`}>
                <div className="era-bg" />
                <div className="era-year">{era.year}</div>
                <div className="era-content">
                  <h2 className="era-title">{era.title}</h2>
                  <p className="era-text">{era.text}</p>
                  <div className="era-location">{era.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === SPLIT SCREEN CONTRAST === */}
      <section className="split-section">
        <div className="split-left">
          <div className="split-content">
            <div className="split-stat">700</div>
            <h3>Jars of Wine</h3>
            <p>
              Buried with King Scorpion I of Egypt in 3150 BCE—the largest 
              collection of wine ever found in an ancient tomb. Each jar 
              was sealed with clay and stamped with its origin.
            </p>
          </div>
        </div>
        <div className="split-right">
          <div className="split-content">
            <div className="split-stat">325</div>
            <h3>CE: The Speyer Bottle</h3>
            <p>
              The oldest unopened wine bottle in existence. Sealed with olive 
              oil and wax, it has survived 1,700 years in a Roman tomb in Germany.
              Scientists refuse to open it.
            </p>
          </div>
        </div>
      </section>

      {/* === QUOTE TAKEOVER === */}
      <section className="quote-takeover">
        <div className="quote-inner">
          <blockquote>
            &ldquo;Wine is one of the most civilized things in the world 
            and one of the most natural things that has been brought 
            to the greatest perfection.&rdquo;
          </blockquote>
          <cite>— Ernest Hemingway, Death in the Afternoon</cite>
        </div>
      </section>

      {/* === DATA SPLASH === */}
      <section className="data-splash">
        <div className="data-inner">
          <div 
            ref={el => { dataRefs.current[0] = el; }}
            className={`data-item ${visibleData.includes(0) ? 'visible' : ''}`}
          >
            <div className="data-number">260B</div>
            <div className="data-desc">liters of wine produced annually worldwide</div>
          </div>
          <div 
            ref={el => { dataRefs.current[1] = el; }}
            className={`data-item ${visibleData.includes(1) ? 'visible' : ''}`}
          >
            <div className="data-number">$340B</div>
            <div className="data-desc">global wine market value</div>
          </div>
          <div 
            ref={el => { dataRefs.current[2] = el; }}
            className={`data-item ${visibleData.includes(2) ? 'visible' : ''}`}
          >
            <div className="data-number">10,000+</div>
            <div className="data-desc">grape varieties cultivated worldwide</div>
          </div>
          <div 
            ref={el => { dataRefs.current[3] = el; }}
            className={`data-item ${visibleData.includes(3) ? 'visible' : ''}`}
          >
            <div className="data-number">7.4M</div>
            <div className="data-desc">hectares of vineyards globally</div>
          </div>
        </div>
      </section>

      {/* === SOURCES === */}
      <section className="sources">
        <div className="sources-inner">
          <h3>Sources &amp; Further Reading</h3>
          <div className="sources-list">
            <a href="https://www.pnas.org/doi/10.1073/pnas.1714728114" target="_blank" rel="noopener noreferrer">
              PNAS: Early Neolithic Wine of Georgia
            </a>
            <a href="https://www.nationalgeographic.com/culture/article/ancient-wine" target="_blank" rel="noopener noreferrer">
              National Geographic: Ancient Wine
            </a>
            <a href="https://www.smithsonianmag.com/history/ancient-wine-180950859/" target="_blank" rel="noopener noreferrer">
              Smithsonian: History of Wine
            </a>
            <a href="https://www.oiv.int/what-we-do/statistics" target="_blank" rel="noopener noreferrer">
              OIV: International Wine Statistics
            </a>
            <a href="https://www.britannica.com/topic/wine" target="_blank" rel="noopener noreferrer">
              Britannica: Wine
            </a>
            <a href="https://www.penn.museum/sites/biomoleculararchaeology/" target="_blank" rel="noopener noreferrer">
              Penn Museum: Biomolecular Archaeology
            </a>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="wine-footer">
        <svg className="footer-glass" viewBox="0 0 60 100">
          <path 
            d="M10 10 Q10 40 30 45 Q50 40 50 10 L50 10 L10 10 M30 45 L30 85 M15 85 L45 85"
            fill="none"
            stroke="var(--champagne)"
            strokeWidth="2"
            opacity="0.4"
          />
          <ellipse cx="30" cy="35" rx="18" ry="20" fill="var(--wine-young)" opacity="0.6" />
        </svg>
        <p className="footer-text">
          &ldquo;In vino veritas&rdquo;<br />
          <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>— Pliny the Elder</span>
        </p>
      </footer>
    </div>
  );
};

export default WineHistoryClient;
