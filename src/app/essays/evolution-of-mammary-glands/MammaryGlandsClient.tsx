"use client";

import React, { useState, useEffect, useRef } from 'react';
import './evolution-of-mammary-glands.css';

/*
 * EVOLUTION OF MAMMARY GLANDS
 * 
 * Design Research Report:
 * 
 * Visual Archaeology:
 * - Anatomical illustrations (Gray's Anatomy, Da Vinci)
 * - Scientific cross-sections and cellular diagrams
 * - Evolutionary tree branching patterns
 * - Biological textures (tissue, cells, ducts)
 * 
 * Color Palette (Derived from subject):
 * - Tissue Pink (#e8b4b8) — mammary tissue
 * - Cream White (#faf5e4) — milk
 * - Cellular Blue (#7ba7bc) — scientific diagrams
 * - Warm Coral (#d4847c) — blood vessels
 * - Deep Burgundy (#5c3d4a) — deep tissue
 * 
 * Typography:
 * - Cormorant Garamond — scientific authority
 * - Caveat — hand-written anatomical notes
 * - Inter — clean body text
 * 
 * UNIQUE MECHANICS (Anti-Pattern Applied):
 * ✅ Mammary gland cross-section revealing layers
 * ✅ Evolutionary tree that GROWS with branches
 * ✅ Milk droplet progress indicator
 * ✅ Milk composition animated bars by species
 * ✅ Cellular-level animations
 */

// Milk composition data (approximate percentages)
const milkComposition = [
  { name: 'Human', fat: 4, protein: 1, sugar: 7 },
  { name: 'Cow', fat: 4, protein: 3.5, sugar: 5 },
  { name: 'Whale', fat: 35, protein: 12, sugar: 1 },
  { name: 'Seal', fat: 50, protein: 10, sugar: 0.1 },
  { name: 'Rabbit', fat: 12, protein: 13, sugar: 2 },
  { name: 'Platypus', fat: 22, protein: 8, sugar: 3 },
];

const MammaryGlandsClient: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const [compositionVisible, setCompositionVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / scrollHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleSections((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.25 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Composition section observer
  useEffect(() => {
    const compSection = document.querySelector('.composition-section');
    if (!compSection) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCompositionVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    observer.observe(compSection);
    return () => observer.disconnect();
  }, []);

  const dropFillHeight = scrollProgress * 100;

  return (
    <div className="mammary-story">
      {/* Milk Drop Progress Indicator */}
      <div className="milk-progress">
        <svg viewBox="0 0 60 90" className="milk-drop-svg">
          <defs>
            <clipPath id="dropClip">
              <path d="M30 5 Q5 45 5 60 Q5 85 30 85 Q55 85 55 60 Q55 45 30 5 Z" />
            </clipPath>
          </defs>
          {/* Fill */}
          <rect 
            x="0" 
            y={90 - dropFillHeight * 0.9} 
            width="60" 
            height={dropFillHeight * 0.9} 
            fill="#faf5e4"
            clipPath="url(#dropClip)"
          />
          {/* Outline */}
          <path 
            d="M30 5 Q5 45 5 60 Q5 85 30 85 Q55 85 55 60 Q55 45 30 5 Z" 
            className="drop-outline"
          />
          <text x="30" y="55" className="drop-percent">
            {Math.round(scrollProgress * 100)}%
          </text>
        </svg>
      </div>

      {/* HERO */}
      <section className="hero">
        {/* Background Mammary Gland SVG */}
        <div className="hero-gland">
          <svg viewBox="0 0 400 400">
            {/* Outer tissue */}
            <ellipse cx="200" cy="200" rx="180" ry="170" className="gland-outline" />
            {/* Ductal system */}
            <path d="M200 350 Q200 280 180 240 Q160 200 120 180" className="gland-ducts" />
            <path d="M200 350 Q200 280 220 240 Q240 200 280 180" className="gland-ducts" />
            <path d="M200 350 Q200 300 200 260 Q200 220 200 180" className="gland-ducts" />
            {/* Alveoli clusters */}
            <circle cx="120" cy="160" r="25" className="gland-alveoli" />
            <circle cx="160" cy="140" r="20" className="gland-alveoli" />
            <circle cx="200" cy="150" r="22" className="gland-alveoli" />
            <circle cx="240" cy="140" r="20" className="gland-alveoli" />
            <circle cx="280" cy="160" r="25" className="gland-alveoli" />
            <circle cx="140" cy="190" r="18" className="gland-alveoli" />
            <circle cx="260" cy="190" r="18" className="gland-alveoli" />
          </svg>
        </div>

        <div className="hero-content">
          <div className="hero-badge">310 MILLION YEARS OF EVOLUTION</div>
          <h1 className="hero-title">The Evolution of</h1>
          <h2 className="hero-title-accent">Mammary Glands</h2>
          <p className="hero-subtitle">
            How a simple skin secretion became the defining feature of mammals — 
            and the most sophisticated infant nutrition system on Earth
          </p>
        </div>

        <div className="hero-scroll">
          <span>Scroll to explore</span>
          <div className="scroll-indicator"></div>
        </div>
      </section>

      {/* SECTION 1: Ancient Origins */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[0] = el; }}
      >
        <div className="section-inner">
          <div className="section-visual">
            <svg viewBox="0 0 300 300" className="cross-section-svg">
              {/* Skin layer */}
              <ellipse 
                cx="150" cy="150" rx="130" ry="120" 
                className={`layer layer-skin ${visibleSections.has(0) ? 'visible' : ''}`}
                style={{ transitionDelay: '0s' }}
              />
              {/* Glandular tissue */}
              <ellipse 
                cx="150" cy="160" rx="100" ry="85" 
                className={`layer layer-tissue ${visibleSections.has(0) ? 'visible' : ''}`}
                style={{ transitionDelay: '0.3s' }}
              />
              {/* Primitive ducts */}
              <path 
                d="M150 240 L150 180 M150 180 L120 150 M150 180 L180 150 M120 150 L100 130 M180 150 L200 130"
                className={`layer-duct ${visibleSections.has(0) ? 'visible' : ''}`}
              />
              {/* Early secretory cells */}
              <circle cx="100" cy="120" r="15" className={`layer-alveoli ${visibleSections.has(0) ? 'visible' : ''}`} />
              <circle cx="130" cy="110" r="12" className={`layer-alveoli ${visibleSections.has(0) ? 'visible' : ''}`} />
              <circle cx="170" cy="110" r="12" className={`layer-alveoli ${visibleSections.has(0) ? 'visible' : ''}`} />
              <circle cx="200" cy="120" r="15" className={`layer-alveoli ${visibleSections.has(0) ? 'visible' : ''}`} />
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-badge">310 Million Years Ago</div>
            <h3 className="section-title">From Sweat to Sustenance</h3>
            <p className="section-text">
              The mammary gland didn&apos;t appear from nothing. It evolved from modified 
              apocrine skin glands — essentially, specialized sweat glands. Our synapsid 
              ancestors (the lineage that would eventually become mammals) developed 
              glandular skin secretions to keep their parchment-shelled eggs moist.
            </p>
            <p className="section-text">
              These early secretions contained antimicrobial compounds that protected 
              eggs from bacterial and fungal infections. Over millions of years, this 
              protective function expanded: the secretions became increasingly nutritious, 
              eventually capable of fully sustaining offspring.
            </p>
            <div className="section-highlight">
              &ldquo;Lactation is older than live birth itself — it evolved to protect eggs before 
              mammals stopped laying them.&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: The Key Innovation */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[1] = el; }}
      >
        <div className="section-inner reverse">
          <div className="section-visual">
            <svg viewBox="0 0 300 250" className="cross-section-svg">
              {/* α-lactalbumin molecule representation */}
              <g className={`layer ${visibleSections.has(1) ? 'visible' : ''}`}>
                {/* Central structure */}
                <circle cx="150" cy="125" r="40" fill="#7ba7bc" opacity="0.3" />
                <circle cx="150" cy="125" r="25" fill="#7ba7bc" opacity="0.5" />
                <circle cx="150" cy="125" r="12" fill="#7ba7bc" />
                
                {/* Branching elements - representing protein structure */}
                <circle cx="100" cy="100" r="15" fill="#d4847c" opacity="0.7" />
                <circle cx="200" cy="100" r="15" fill="#d4847c" opacity="0.7" />
                <circle cx="120" cy="160" r="12" fill="#e8b4b8" opacity="0.8" />
                <circle cx="180" cy="160" r="12" fill="#e8b4b8" opacity="0.8" />
                <circle cx="150" cy="70" r="10" fill="#faf5e4" />
                
                {/* Connecting lines */}
                <line x1="150" y1="125" x2="100" y2="100" stroke="#5c3d4a" strokeWidth="2" />
                <line x1="150" y1="125" x2="200" y2="100" stroke="#5c3d4a" strokeWidth="2" />
                <line x1="150" y1="125" x2="120" y2="160" stroke="#5c3d4a" strokeWidth="2" />
                <line x1="150" y1="125" x2="180" y2="160" stroke="#5c3d4a" strokeWidth="2" />
                <line x1="150" y1="125" x2="150" y2="70" stroke="#5c3d4a" strokeWidth="2" />
              </g>
              
              {/* Labels */}
              <text x="150" y="220" textAnchor="middle" className={`tree-label ${visibleSections.has(1) ? 'visible' : ''}`}>
                α-lactalbumin
              </text>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-badge">The Molecular Revolution</div>
            <h3 className="section-title">α-Lactalbumin: The Key to Milk</h3>
            <p className="section-text">
              The defining moment in lactation evolution came with a single gene duplication. 
              An enzyme called C-type lysozyme — which originally fought bacteria — duplicated 
              and mutated to become α-lactalbumin.
            </p>
            <p className="section-text">
              This new protein enabled something revolutionary: the synthesis of lactose, 
              milk&apos;s primary sugar. Lactose became the energy foundation of mammalian milk, 
              and α-lactalbumin remains in every drop of milk produced by every mammal today.
            </p>
            <div className="section-highlight">
              One gene duplication, 200+ million years ago, made mammalian milk possible.
            </div>
          </div>
        </div>
      </section>

      {/* EVOLUTIONARY TREE SECTION */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[2] = el; }}
      >
        <div className="evo-tree-container">
          <div className="section-content" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="section-badge">Divergent Evolution</div>
            <h3 className="section-title">Three Paths, One Purpose</h3>
            <p className="section-text" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Mammals split into three major lineages, each with distinct lactation strategies — 
              but all united by the mammary gland.
            </p>
          </div>
          
          <svg viewBox="0 0 800 350" className="evo-tree-svg">
            {/* Main trunk */}
            <path 
              d="M400 320 L400 250" 
              className={`tree-branch ${visibleSections.has(2) ? 'visible' : ''}`}
              style={{ transitionDelay: '0s' }}
            />
            
            {/* Left branch - Monotremes */}
            <path 
              d="M400 250 Q350 220 280 180 Q240 160 180 100" 
              className={`tree-branch ${visibleSections.has(2) ? 'visible' : ''}`}
              style={{ transitionDelay: '0.5s' }}
            />
            
            {/* Middle branch - Marsupials */}
            <path 
              d="M400 250 L400 150 L400 80" 
              className={`tree-branch ${visibleSections.has(2) ? 'visible' : ''}`}
              style={{ transitionDelay: '0.7s' }}
            />
            
            {/* Right branch - Placentals */}
            <path 
              d="M400 250 Q450 220 520 180 Q560 160 620 100" 
              className={`tree-branch ${visibleSections.has(2) ? 'visible' : ''}`}
              style={{ transitionDelay: '0.9s' }}
            />
            
            {/* Nodes and labels */}
            {/* Monotremes */}
            <g className={`tree-node ${visibleSections.has(2) ? 'visible' : ''}`} style={{ transitionDelay: '1.2s' }}>
              <circle cx="180" cy="80" r="35" fill="#e8b4b8" />
              <text x="180" y="85" textAnchor="middle" fill="#5c3d4a" fontSize="12" fontWeight="600">
                🥚
              </text>
            </g>
            <text x="180" y="140" textAnchor="middle" className={`tree-label ${visibleSections.has(2) ? 'visible' : ''}`} style={{ transitionDelay: '1.4s' }}>
              Monotremes
            </text>
            <text x="180" y="158" textAnchor="middle" fontSize="11" fill="#6a6a7a" className={`tree-label ${visibleSections.has(2) ? 'visible' : ''}`} style={{ transitionDelay: '1.5s' }}>
              (Platypus, Echidna)
            </text>
            <text x="180" y="175" textAnchor="middle" fontSize="10" fill="#d4847c" className={`tree-label ${visibleSections.has(2) ? 'visible' : ''}`} style={{ transitionDelay: '1.6s' }}>
              No nipples — milk seeps through skin
            </text>
            
            {/* Marsupials */}
            <g className={`tree-node ${visibleSections.has(2) ? 'visible' : ''}`} style={{ transitionDelay: '1.3s' }}>
              <circle cx="400" cy="60" r="35" fill="#d4847c" />
              <text x="400" y="65" textAnchor="middle" fill="#faf5e4" fontSize="12" fontWeight="600">
                🦘
              </text>
            </g>
            <text x="400" y="120" textAnchor="middle" className={`tree-label ${visibleSections.has(2) ? 'visible' : ''}`} style={{ transitionDelay: '1.5s' }}>
              Marsupials
            </text>
            <text x="400" y="138" textAnchor="middle" fontSize="11" fill="#6a6a7a" className={`tree-label ${visibleSections.has(2) ? 'visible' : ''}`} style={{ transitionDelay: '1.6s' }}>
              (Kangaroo, Koala)
            </text>
            <text x="400" y="155" textAnchor="middle" fontSize="10" fill="#d4847c" className={`tree-label ${visibleSections.has(2) ? 'visible' : ''}`} style={{ transitionDelay: '1.7s' }}>
              Milk changes composition during pouch life
            </text>
            
            {/* Placentals */}
            <g className={`tree-node ${visibleSections.has(2) ? 'visible' : ''}`} style={{ transitionDelay: '1.4s' }}>
              <circle cx="620" cy="80" r="35" fill="#7ba7bc" />
              <text x="620" y="85" textAnchor="middle" fill="#faf5e4" fontSize="12" fontWeight="600">
                🐄
              </text>
            </g>
            <text x="620" y="140" textAnchor="middle" className={`tree-label ${visibleSections.has(2) ? 'visible' : ''}`} style={{ transitionDelay: '1.6s' }}>
              Placental Mammals
            </text>
            <text x="620" y="158" textAnchor="middle" fontSize="11" fill="#6a6a7a" className={`tree-label ${visibleSections.has(2) ? 'visible' : ''}`} style={{ transitionDelay: '1.7s' }}>
              (Humans, Whales, Dogs)
            </text>
            <text x="620" y="175" textAnchor="middle" fontSize="10" fill="#d4847c" className={`tree-label ${visibleSections.has(2) ? 'visible' : ''}`} style={{ transitionDelay: '1.8s' }}>
              Nipples + rich colostrum
            </text>
            
            {/* Common ancestor */}
            <g className={`tree-node ${visibleSections.has(2) ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
              <circle cx="400" cy="290" r="25" fill="#5c3d4a" />
            </g>
            <text x="400" y="335" textAnchor="middle" className={`tree-label ${visibleSections.has(2) ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
              Common Ancestor (~200 MYA)
            </text>
          </svg>
        </div>
      </section>

      {/* MILK COMPOSITION COMPARISON */}
      <section className="composition-section">
        <div className="composition-inner">
          <h3 className="composition-title">Milk: Tailored to Every Species</h3>
          <p style={{ textAlign: 'center', marginBottom: '2rem', opacity: 0.8 }}>
            Fat %, Protein %, and Sugar % vary dramatically based on environment and offspring needs
          </p>
          
          <div className="composition-grid">
            {milkComposition.map((animal, idx) => (
              <div key={animal.name} className="animal-card">
                <div className="animal-name">{animal.name}</div>
                
                <div className="bar-label">
                  <span>Fat</span>
                  <span>{animal.fat}%</span>
                </div>
                <div className="composition-bar">
                  <div 
                    className={`bar-fill fat ${compositionVisible ? 'visible' : ''}`}
                    style={{ 
                      '--target-width': `${Math.min(animal.fat * 2, 100)}%`,
                      transitionDelay: `${idx * 0.1}s`
                    } as React.CSSProperties}
                  />
                </div>
                
                <div className="bar-label">
                  <span>Protein</span>
                  <span>{animal.protein}%</span>
                </div>
                <div className="composition-bar">
                  <div 
                    className={`bar-fill protein ${compositionVisible ? 'visible' : ''}`}
                    style={{ 
                      '--target-width': `${Math.min(animal.protein * 7, 100)}%`,
                      transitionDelay: `${idx * 0.1 + 0.1}s`
                    } as React.CSSProperties}
                  />
                </div>
                
                <div className="bar-label">
                  <span>Sugar</span>
                  <span>{animal.sugar}%</span>
                </div>
                <div className="composition-bar">
                  <div 
                    className={`bar-fill sugar ${compositionVisible ? 'visible' : ''}`}
                    style={{ 
                      '--target-width': `${Math.min(animal.sugar * 14, 100)}%`,
                      transitionDelay: `${idx * 0.1 + 0.2}s`
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', opacity: 0.7 }}>
            Seal milk is 50% fat — 12× fattier than human milk — to build blubber fast in freezing waters
          </p>
        </div>
      </section>

      {/* SECTION 3: Human Specialization */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[3] = el; }}
      >
        <div className="section-inner">
          <div className="section-visual">
            <svg viewBox="0 0 300 280" className="cross-section-svg">
              {/* Human mammary cross-section */}
              <g className={`layer ${visibleSections.has(3) ? 'visible' : ''}`}>
                {/* Skin */}
                <path d="M50 140 Q150 100 250 140 L250 200 Q150 240 50 200 Z" fill="#faf5e4" stroke="#e8b4b8" strokeWidth="2" />
                
                {/* Fatty tissue */}
                <ellipse cx="150" cy="160" rx="80" ry="50" fill="#e8b4b8" opacity="0.5" />
                
                {/* Lobes */}
                <circle cx="100" cy="140" r="25" fill="#d4847c" opacity="0.6" />
                <circle cx="150" cy="130" r="28" fill="#d4847c" opacity="0.6" />
                <circle cx="200" cy="140" r="25" fill="#d4847c" opacity="0.6" />
                <circle cx="120" cy="170" r="20" fill="#d4847c" opacity="0.6" />
                <circle cx="180" cy="170" r="20" fill="#d4847c" opacity="0.6" />
                
                {/* Ducts converging to nipple */}
                <path d="M100 140 Q120 180 150 210" stroke="#c99a9f" strokeWidth="2" fill="none" />
                <path d="M150 130 L150 210" stroke="#c99a9f" strokeWidth="2" fill="none" />
                <path d="M200 140 Q180 180 150 210" stroke="#c99a9f" strokeWidth="2" fill="none" />
                
                {/* Nipple */}
                <ellipse cx="150" cy="215" rx="15" ry="10" fill="#c99a9f" />
              </g>
              
              {/* Labels */}
              <text x="70" y="120" fontSize="10" fill="#5c3d4a" className={`tree-label ${visibleSections.has(3) ? 'visible' : ''}`}>Lobes (15-20)</text>
              <text x="220" y="190" fontSize="10" fill="#5c3d4a" className={`tree-label ${visibleSections.has(3) ? 'visible' : ''}`}>Ducts</text>
              <text x="150" y="255" textAnchor="middle" fontSize="10" fill="#5c3d4a" className={`tree-label ${visibleSections.has(3) ? 'visible' : ''}`}>Nipple</text>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-badge">Human Specialization</div>
            <h3 className="section-title">The Most Complex Milk on Earth</h3>
            <p className="section-text">
              Human milk contains over 200 different oligosaccharides — complex sugars that 
              infants cannot digest. Why would evolution produce indigestible nutrition?
            </p>
            <p className="section-text">
              Because they&apos;re not for the infant — they&apos;re for the infant&apos;s gut bacteria. 
              These oligosaccharides selectively feed beneficial bifidobacteria, essentially 
              &ldquo;programming&rdquo; the infant immune system. No other mammal has this level of 
              oligosaccharide complexity.
            </p>
            <div className="section-highlight">
              Human milk contains 200+ oligosaccharides — cow milk has fewer than 50.
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="quote-section">
        <div className="quote-inner">
          <p className="quote-text">
            &ldquo;Milk is the only food specifically designed by evolution for consumption by another 
            organism. Every component has been refined over 200 million years for a single 
            purpose: ensuring offspring survival.&rdquo;
          </p>
          <p className="quote-author">— Dr. Katie Hinde, Evolutionary Biologist</p>
        </div>
      </section>

      {/* SECTION 4: Lactase Persistence */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[4] = el; }}
      >
        <div className="section-inner reverse">
          <div className="section-visual">
            <svg viewBox="0 0 300 250" className="cross-section-svg">
              {/* World map simplified showing lactase persistence */}
              <g className={`layer ${visibleSections.has(4) ? 'visible' : ''}`}>
                {/* Background */}
                <rect x="20" y="40" width="260" height="160" rx="10" fill="#faf5e4" stroke="#e8b4b8" strokeWidth="2" />
                
                {/* Europe - high persistence */}
                <ellipse cx="150" cy="90" rx="35" ry="25" fill="#7ba7bc" opacity="0.8" />
                <text x="150" y="95" textAnchor="middle" fontSize="10" fill="#fff">90%</text>
                
                {/* Middle East / Africa (pastoral) */}
                <ellipse cx="180" cy="130" rx="25" ry="20" fill="#7ba7bc" opacity="0.6" />
                <text x="180" y="135" textAnchor="middle" fontSize="9" fill="#fff">50%</text>
                
                {/* East Asia - low persistence */}
                <ellipse cx="240" cy="100" rx="25" ry="20" fill="#d4847c" opacity="0.4" />
                <text x="240" y="105" textAnchor="middle" fontSize="9" fill="#5c3d4a">5%</text>
                
                {/* Americas (indigenous) */}
                <ellipse cx="70" cy="120" rx="20" ry="30" fill="#d4847c" opacity="0.4" />
                <text x="70" y="125" textAnchor="middle" fontSize="9" fill="#5c3d4a">10%</text>
              </g>
              
              <text x="150" y="230" textAnchor="middle" fontSize="11" fill="#5c3d4a" className={`tree-label ${visibleSections.has(4) ? 'visible' : ''}`}>
                Adult Lactase Persistence by Region
              </text>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-badge">10,000 Years Ago</div>
            <h3 className="section-title">The Dairy Revolution</h3>
            <p className="section-text">
              Most mammals lose the ability to digest lactose after weaning — the gene for 
              lactase (the enzyme that breaks down lactose) simply switches off. Humans were 
              no different, until we domesticated cattle, sheep, and goats.
            </p>
            <p className="section-text">
              In populations that adopted dairying, a mutation arose that kept lactase 
              production active into adulthood. This &ldquo;lactase persistence&rdquo; spread rapidly — 
              it&apos;s one of the strongest signals of recent natural selection in the human genome.
            </p>
            <div className="section-highlight">
              Lactase persistence evolved independently at least 5 times in different human populations.
            </div>
          </div>
        </div>
      </section>

      {/* SOURCES */}
      <section className="sources-section">
        <div className="sources-inner">
          <h3 className="sources-title">Sources & Further Reading</h3>
          <div className="sources-list">
            <a href="https://pubmed.ncbi.nlm.nih.gov/22436214/" target="_blank" rel="noopener noreferrer">
              Oftedal, O.T. (2012) &ldquo;The evolution of milk secretion and its ancient origins&rdquo; — Animal
            </a>
            <a href="https://pubmed.ncbi.nlm.nih.gov/22436215/" target="_blank" rel="noopener noreferrer">
              Urashima, T. et al. (2012) &ldquo;Evolution of milk oligosaccharides&rdquo; — Bioscience, Biotechnology, and Biochemistry
            </a>
            <a href="https://www.cambridge.org/core/journals/nutrition-research-reviews/article/evolution-of-lactation-nutrition-v-protection-with-special-reference-to-five-mammalian-species/9A518FD5D8D1BC4B711E34441939A394" target="_blank" rel="noopener noreferrer">
              Blackburn, D.G. (1993) &ldquo;Lactation: Historical Patterns and Potential for Manipulation&rdquo; — Cambridge
            </a>
            <a href="https://www.nature.com/articles/nature06695" target="_blank" rel="noopener noreferrer">
              Tishkoff, S.A. et al. (2007) &ldquo;Convergent adaptation of human lactase persistence in Africa and Europe&rdquo; — Nature Genetics
            </a>
            <a href="https://royalsocietypublishing.org/doi/10.1098/rstb.2010.0147" target="_blank" rel="noopener noreferrer">
              Lefèvre, C.M. et al. (2010) &ldquo;Evolution of lactation: ancient origin and extreme adaptations&rdquo; — Phil. Trans. R. Soc. B
            </a>
            <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4586535/" target="_blank" rel="noopener noreferrer">
              Hinde, K. & German, J.B. (2012) &ldquo;Food in an evolutionary context: insights from mother&apos;s milk&rdquo; — Journal of the Science of Food and Agriculture
            </a>
            <a href="https://en.wikipedia.org/wiki/Lactase_persistence" target="_blank" rel="noopener noreferrer">
              Wikipedia: Lactase Persistence — Overview of genetics and global distribution
            </a>
            <a href="https://www.britannica.com/science/mammary-gland" target="_blank" rel="noopener noreferrer">
              Encyclopædia Britannica: Mammary Gland — Anatomy and evolution
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="story-footer">
        <div className="footer-content">
          <div className="footer-visual">
            <svg viewBox="0 0 100 100">
              {/* Stylized milk drop with gland pattern */}
              <path d="M50 10 Q20 50 20 65 Q20 90 50 90 Q80 90 80 65 Q80 50 50 10 Z" fill="#e8b4b8" stroke="#c99a9f" strokeWidth="2" />
              <circle cx="40" cy="55" r="8" fill="#faf5e4" opacity="0.6" />
              <circle cx="60" cy="55" r="8" fill="#faf5e4" opacity="0.6" />
              <circle cx="50" cy="70" r="10" fill="#faf5e4" opacity="0.6" />
              <path d="M40 55 L50 75 M60 55 L50 75" stroke="#d4847c" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <p className="footer-text">
            310 million years of evolution, condensed into every drop of milk — 
            the original superfood, designed by nature.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MammaryGlandsClient;

