"use client";

import React, { useState, useEffect, useRef } from 'react';
import './the-gunpowder.css';

/*
 * THE GUNPOWDER - Explosive Discovery
 * 
 * Design Research Report:
 * 
 * Visual Archaeology:
 * - Tang Dynasty alchemy manuscripts
 * - Ancient Chinese fire arrow diagrams
 * - Medieval cannon blueprints
 * - Firework explosion patterns
 * 
 * UNIQUE MECHANICS (Anti-Pattern Applied):
 * ✅ Burning fuse that progresses with scroll
 * ✅ Explosion particle effects at sections
 * ✅ 75:15:10 formula visualization
 * ✅ Firework launches as milestones
 * ✅ Smoke trails following scroll
 * ✅ Alchemy to chemistry transformation
 */

const timelineEvents = [
  { year: '850 CE', text: 'First recorded formula in Chinese alchemical text Zhenyuan miaodao yaolüe' },
  { year: '904 CE', text: 'Fire arrows used in siege warfare during Tang Dynasty' },
  { year: '1044 CE', text: 'Wujing Zongyao military text details three gunpowder formulas' },
  { year: '1132 CE', text: 'Fire lance — first gun — used by Song Dynasty soldiers' },
  { year: '1280s', text: 'Gunpowder reaches Europe via Silk Road and Mongol conquests' },
  { year: '1346 CE', text: 'Cannons used at Battle of Crécy — warfare transformed' },
  { year: '1605 CE', text: 'Gunpowder Plot fails to blow up British Parliament' },
  { year: '1867 CE', text: 'Alfred Nobel patents dynamite — safer explosive' },
];

const GunpowderClient: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const [formulaVisible, setFormulaVisible] = useState(false);
  const [fireworksActive, setFireworksActive] = useState(false);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / scrollHeight, 1);
      setScrollProgress(progress);
      
      // Calculate timeline progress
      const timelineProgress = Math.floor(progress * timelineEvents.length);
      setActiveTimelineIndex(Math.min(timelineProgress, timelineEvents.length - 1));
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
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const formulaSection = document.querySelector('.formula-section');
    if (!formulaSection) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFormulaVisible(true);
      },
      { threshold: 0.3 }
    );
    
    observer.observe(formulaSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fireworkSection = document.querySelector('.firework-section');
    if (!fireworkSection) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFireworksActive(true);
      },
      { threshold: 0.5 }
    );
    
    observer.observe(fireworkSection);
    return () => observer.disconnect();
  }, []);

  const fuseHeight = scrollProgress * 100;

  return (
    <div className="gunpowder-story">
      {/* Burning Fuse Progress */}
      <div className="fuse-progress">
        <div className="fuse-track">
          <div className="fuse-burn" style={{ height: `${fuseHeight}%` }} />
          <div 
            className="fuse-spark" 
            style={{ top: `${fuseHeight}%` }}
          />
        </div>
        <span className="fuse-label">fuse lit</span>
      </div>

      {/* ==================== HERO ==================== */}
      <section className="hero">
        <div className="smoke-bg" />
        
        <div className="hero-content">
          <div className="hero-era">Tang Dynasty, 9th Century CE</div>
          <h1 className="hero-title">
            Gun<span className="accent">powder</span>
          </h1>
          <p className="hero-subtitle">The Discovery That Changed Everything</p>
          <p className="hero-description">
            Taoist alchemists sought the elixir of immortality. Instead, they discovered 
            the most destructive — and transformative — substance in human history.
          </p>
          
          <div className="formula-preview">
            <div className="formula-item saltpeter">
              <span className="formula-percent">75%</span>
              <span className="formula-name">Saltpeter</span>
            </div>
            <div className="formula-item charcoal">
              <span className="formula-percent">15%</span>
              <span className="formula-name">Charcoal</span>
            </div>
            <div className="formula-item sulfur">
              <span className="formula-percent">10%</span>
              <span className="formula-name">Sulfur</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <span>Light the fuse</span>
          <div className="scroll-spark" />
        </div>
      </section>

      {/* ==================== SECTION 1: The Alchemists ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[0] = el; }}
      >
        <div className="section-layout">
          <div className="section-visual">
            <svg viewBox="0 0 350 350" className="illustration-svg">
              {/* Alchemist's cauldron/furnace */}
              <g className={`fade-up ${visibleSections.has(0) ? 'visible' : ''}`}>
                {/* Furnace base */}
                <path 
                  d="M100 280 L100 200 Q100 180 120 180 L230 180 Q250 180 250 200 L250 280 Z" 
                  fill="#5a5a5a" 
                  stroke="#f0ebe0" 
                  strokeWidth="2"
                />
                {/* Fire opening */}
                <rect x="130" y="240" width="90" height="40" rx="5" fill="#1a1a1a" stroke="#f0ebe0" strokeWidth="1" />
                {/* Flames */}
                <path d="M150 240 Q160 210 175 230 Q190 200 175 240" fill="#ff6b35" opacity="0.8" />
                <path d="M180 240 Q195 215 210 235 Q220 210 200 240" fill="#e6c200" opacity="0.7" />
                
                {/* Cauldron */}
                <ellipse cx="175" cy="160" rx="60" ry="25" fill="#5a5a5a" stroke="#f0ebe0" strokeWidth="2" />
                <path d="M115 160 Q115 220 175 220 Q235 220 235 160" fill="none" stroke="#f0ebe0" strokeWidth="2" />
                
                {/* Steam/smoke rising */}
                <ellipse cx="160" cy="120" rx="15" ry="10" fill="#8a8a8a" opacity="0.4" />
                <ellipse cx="190" cy="100" rx="20" ry="12" fill="#8a8a8a" opacity="0.3" />
                <ellipse cx="170" cy="75" rx="18" ry="10" fill="#8a8a8a" opacity="0.2" />
                
                {/* Mysterious symbols around */}
                <text x="70" y="150" fontFamily="serif" fontSize="20" fill="#e6c200" opacity="0.6">☯</text>
                <text x="270" y="150" fontFamily="serif" fontSize="20" fill="#e6c200" opacity="0.6">☿</text>
                <text x="175" y="320" fontFamily="Caveat" fontSize="14" fill="#8a8a8a" textAnchor="middle">
                  Alchemist&apos;s Furnace
                </text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-era">The Quest for Immortality</div>
            <div className="section-year">850 CE</div>
            <h3 className="section-title">The Accidental Discovery</h3>
            <p className="section-text">
              In Tang Dynasty China, Taoist alchemists mixed saltpeter, sulfur, and charcoal 
              seeking an elixir of eternal life. What they found instead was &ldquo;huǒ yào&rdquo; — 
              fire medicine — the earliest form of gunpowder.
            </p>
            <p className="section-text">
              The earliest surviving recipe appears in the <em>Zhenyuan miaodao yaolüe</em> 
              (circa 850 CE), which warns alchemists: &ldquo;Some have heated together sulfur, 
              realgar, and saltpeter with honey; smoke and flames result, so that their hands 
              and faces have been burnt.&rdquo;
            </p>
            <div className="section-highlight">
              &ldquo;Seeking immortality, they found the means of destruction.&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FORMULA VISUALIZATION ==================== */}
      <section className="formula-section">
        <div className="formula-inner">
          <h3 className="formula-title">The Perfect Formula</h3>
          <p className="formula-subtitle">75 : 15 : 10 — The ratio that changed history</p>
          
          <div className="formula-bars">
            <div className="formula-bar">
              <div className="bar-value" style={{ color: '#f0ebe0' }}>75%</div>
              <div 
                className="bar-fill saltpeter"
                style={{ height: formulaVisible ? '180px' : '0px', transitionDelay: '0s' }}
              />
              <div className="bar-name">Saltpeter</div>
              <div className="bar-chemical">KNO₃</div>
            </div>
            <div className="formula-bar">
              <div className="bar-value" style={{ color: '#8a8a8a' }}>15%</div>
              <div 
                className="bar-fill charcoal"
                style={{ height: formulaVisible ? '36px' : '0px', transitionDelay: '0.2s' }}
              />
              <div className="bar-name">Charcoal</div>
              <div className="bar-chemical">C</div>
            </div>
            <div className="formula-bar">
              <div className="bar-value" style={{ color: '#e6c200' }}>10%</div>
              <div 
                className="bar-fill sulfur"
                style={{ height: formulaVisible ? '24px' : '0px', transitionDelay: '0.4s' }}
              />
              <div className="bar-name">Sulfur</div>
              <div className="bar-chemical">S</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: Fire Weapons ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[1] = el; }}
      >
        <div className="section-layout reverse">
          <div className="section-visual">
            <svg viewBox="0 0 400 300" className="illustration-svg">
              {/* Fire Lance */}
              <g className={`fade-up ${visibleSections.has(1) ? 'visible' : ''}`}>
                {/* Bamboo tube */}
                <rect x="80" y="140" width="220" height="30" rx="5" fill="#8b6914" stroke="#f0ebe0" strokeWidth="2" />
                <rect x="80" y="145" width="220" height="5" fill="#5a4510" opacity="0.5" />
                
                {/* Metal tip */}
                <path d="M300 140 L340 155 L300 170" fill="#8a8a8a" stroke="#f0ebe0" strokeWidth="2" />
                
                {/* Fire blast coming out */}
                <ellipse cx="355" cy="155" rx="30" ry="20" fill="#ff6b35" opacity="0.7" />
                <ellipse cx="375" cy="155" rx="20" ry="15" fill="#e6c200" opacity="0.6" />
                <ellipse cx="390" cy="155" rx="10" ry="8" fill="#f0ebe0" opacity="0.5" />
                
                {/* Sparks */}
                <circle cx="365" cy="135" r="3" fill="#ff6b35" />
                <circle cx="380" cy="140" r="2" fill="#e6c200" />
                <circle cx="370" cy="175" r="3" fill="#ff6b35" />
                <circle cx="385" cy="168" r="2" fill="#e6c200" />
                
                {/* Handle wrapping */}
                <rect x="60" y="140" width="25" height="30" fill="#5a4510" stroke="#f0ebe0" strokeWidth="1" />
                
                {/* Soldier hands (simplified) */}
                <ellipse cx="50" cy="155" rx="15" ry="20" fill="#d4a47a" stroke="#f0ebe0" strokeWidth="1" />
                
                <text x="200" y="280" fontFamily="Caveat" fontSize="14" fill="#8a8a8a" textAnchor="middle">
                  Fire Lance (Huǒ Qiāng), c. 1132 CE
                </text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-era">The First Guns</div>
            <div className="section-year">1132 CE</div>
            <h3 className="section-title">Fire Lances: Birth of the Gun</h3>
            <p className="section-text">
              The fire lance was the world&apos;s first firearm — a bamboo tube filled with 
              gunpowder that shot flames, shrapnel, and later, projectiles. Song Dynasty 
              soldiers used them against Jurchen cavalry with devastating effect.
            </p>
            <p className="section-text">
              By the 13th century, Chinese engineers replaced bamboo with metal barrels, 
              creating the first true guns. The oldest surviving firearm, the Heilongjiang 
              hand cannon (1288), shows how quickly the technology evolved.
            </p>
            <div className="section-highlight">
              The fire lance combined the terror of fire with the force of an explosion — 
              nothing like it had ever existed in warfare.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 3: Mongol Spread ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[2] = el; }}
      >
        <div className="section-layout">
          <div className="section-visual">
            <svg viewBox="0 0 400 300" className="illustration-svg">
              {/* Silk Road map simplified */}
              <g className={`fade-up ${visibleSections.has(2) ? 'visible' : ''}`}>
                {/* Simplified Asia-Europe landmass */}
                <path 
                  d="M50 150 Q100 100 180 130 Q260 80 350 150 Q300 200 200 180 Q100 200 50 150"
                  fill="none"
                  stroke="#5a5a5a"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />
                
                {/* China marker */}
                <circle cx="320" cy="140" r="12" fill="#c41e3a" stroke="#f0ebe0" strokeWidth="2" />
                <text x="320" y="175" fontFamily="Caveat" fontSize="12" fill="#f0ebe0" textAnchor="middle">China</text>
                
                {/* Europe marker */}
                <circle cx="80" cy="140" r="12" fill="#5a5a5a" stroke="#f0ebe0" strokeWidth="2" />
                <text x="80" y="175" fontFamily="Caveat" fontSize="12" fill="#f0ebe0" textAnchor="middle">Europe</text>
                
                {/* Middle East marker */}
                <circle cx="180" cy="145" r="8" fill="#b5a642" stroke="#f0ebe0" strokeWidth="1" />
                <text x="180" y="175" fontFamily="Caveat" fontSize="10" fill="#8a8a8a" textAnchor="middle">Persia</text>
                
                {/* Arrow showing spread */}
                <path 
                  d="M300 140 Q240 120 180 145 Q120 130 95 140"
                  fill="none"
                  stroke="#ff6b35"
                  strokeWidth="3"
                  markerEnd="url(#arrowhead)"
                />
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#ff6b35" />
                  </marker>
                </defs>
                
                {/* Explosion symbols along path */}
                <text x="240" y="115" fontSize="16" fill="#e6c200">💥</text>
                <text x="150" y="125" fontSize="14" fill="#ff6b35">💥</text>
                
                <text x="200" y="260" fontFamily="Caveat" fontSize="14" fill="#8a8a8a" textAnchor="middle">
                  The Spread of Gunpowder, 13th Century
                </text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-era">The Mongol Conduit</div>
            <div className="section-year">1240s-1280s</div>
            <h3 className="section-title">Westward: The Silk Road of Fire</h3>
            <p className="section-text">
              The Mongol Empire, stretching from Korea to Poland, became an unintentional 
              highway for gunpowder technology. Mongol armies used Chinese siege weapons 
              and fire bombs across Asia and into Europe.
            </p>
            <p className="section-text">
              By the 1280s, recipes for gunpowder appeared in European texts. Roger Bacon 
              described it in 1267. Within a century, European blacksmiths were casting 
              cannons that would reshape medieval warfare forever.
            </p>
            <div className="section-highlight">
              The knowledge traveled 5,000 miles in just 50 years — one of history&apos;s 
              fastest technology transfers.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FIREWORK SECTION ==================== */}
      <section className="firework-section">
        <div className="firework-sky">
          {fireworksActive && (
            <>
              <div className="firework burst" style={{ top: '30%', left: '25%', animationDelay: '0s' }} />
              <div className="firework burst" style={{ top: '40%', left: '75%', animationDelay: '0.5s' }} />
              <div className="firework burst" style={{ top: '25%', left: '50%', animationDelay: '1s' }} />
              <div className="firework burst" style={{ top: '50%', left: '35%', animationDelay: '1.5s' }} />
              <div className="firework burst" style={{ top: '35%', left: '65%', animationDelay: '2s' }} />
            </>
          )}
        </div>
        <div className="firework-text">
          <h3>Celebration & Destruction</h3>
          <p>From fireworks to firearms — the same powder, different purposes</p>
        </div>
      </section>

      {/* ==================== SECTION 4: European Transformation ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[3] = el; }}
      >
        <div className="section-layout reverse">
          <div className="section-visual">
            <svg viewBox="0 0 400 320" className="illustration-svg">
              {/* Medieval cannon */}
              <g className={`fade-up ${visibleSections.has(3) ? 'visible' : ''}`}>
                {/* Cannon barrel */}
                <ellipse cx="280" cy="180" rx="25" ry="35" fill="#5a5a5a" stroke="#f0ebe0" strokeWidth="2" />
                <rect x="80" y="155" width="200" height="50" rx="5" fill="#5a5a5a" stroke="#f0ebe0" strokeWidth="2" />
                
                {/* Decorative rings on barrel */}
                <ellipse cx="150" cy="180" rx="8" ry="30" fill="none" stroke="#b5a642" strokeWidth="3" />
                <ellipse cx="220" cy="180" rx="8" ry="28" fill="none" stroke="#b5a642" strokeWidth="3" />
                
                {/* Muzzle blast */}
                <ellipse cx="300" cy="180" rx="35" ry="25" fill="#ff6b35" opacity="0.6" />
                <ellipse cx="320" cy="180" rx="25" ry="18" fill="#e6c200" opacity="0.5" />
                
                {/* Cannonball in flight */}
                <circle cx="360" cy="170" r="10" fill="#1a1a1a" stroke="#f0ebe0" strokeWidth="1" />
                
                {/* Carriage wheels */}
                <circle cx="100" cy="240" r="30" fill="none" stroke="#8b6914" strokeWidth="4" />
                <circle cx="100" cy="240" r="5" fill="#8b6914" />
                <circle cx="200" cy="240" r="30" fill="none" stroke="#8b6914" strokeWidth="4" />
                <circle cx="200" cy="240" r="5" fill="#8b6914" />
                
                {/* Carriage frame */}
                <line x1="70" y1="210" x2="230" y2="210" stroke="#8b6914" strokeWidth="6" />
                <line x1="80" y1="205" x2="120" y2="240" stroke="#8b6914" strokeWidth="4" />
                <line x1="180" y1="205" x2="220" y2="240" stroke="#8b6914" strokeWidth="4" />
                
                {/* Smoke cloud */}
                <ellipse cx="50" cy="170" rx="25" ry="20" fill="#8a8a8a" opacity="0.3" />
                <ellipse cx="35" cy="155" rx="20" ry="15" fill="#8a8a8a" opacity="0.2" />
                
                <text x="200" y="300" fontFamily="Caveat" fontSize="14" fill="#8a8a8a" textAnchor="middle">
                  Bombard Cannon, c. 1400 CE
                </text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-era">The Gunpowder Age</div>
            <div className="section-year">1346 CE</div>
            <h3 className="section-title">The End of Castles</h3>
            <p className="section-text">
              At the Battle of Crécy (1346), English cannons roared against French knights — 
              one of the first major European battles featuring gunpowder weapons. Castle walls 
              that had stood for centuries could now be reduced to rubble.
            </p>
            <p className="section-text">
              By 1453, Ottoman cannons breached the &ldquo;impregnable&rdquo; walls of Constantinople, 
              ending the Byzantine Empire. The feudal age of armored knights and stone 
              fortresses was over. The age of gunpowder had begun.
            </p>
            <div className="section-highlight">
              A single cannon could do in hours what siege armies once took months to accomplish.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== QUOTE ==================== */}
      <section className="quote-section">
        <div className="quote-inner">
          <p className="quote-text">
            &ldquo;Gunpowder made all men equally tall. It shattered the armored knight and 
            crumbled the castle wall. A peasant with a musket was the equal of a duke.&rdquo;
          </p>
          <p className="quote-author">— Adapted from Thomas Carlyle</p>
        </div>
      </section>

      {/* ==================== TIMELINE ==================== */}
      <section className="fuse-timeline">
        <div className="timeline-inner">
          <h3 className="timeline-title">The Burning Fuse of History</h3>
          <div className="timeline-fuse" />
          <div 
            className="timeline-burn-line" 
            style={{ height: `${(activeTimelineIndex + 1) / timelineEvents.length * 100}%` }}
          />
          
          {timelineEvents.map((event, idx) => (
            <div key={event.year} className="timeline-event">
              <div className={`timeline-dot ${idx <= activeTimelineIndex ? 'active' : ''}`} />
              <div className="timeline-content">
                <div className="timeline-year">{event.year}</div>
                <div className="timeline-text">{event.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== SECTION 5: Modern Legacy ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[4] = el; }}
      >
        <div className="section-layout">
          <div className="section-visual">
            <svg viewBox="0 0 350 300" className="illustration-svg">
              {/* Modern applications collage */}
              <g className={`fade-up ${visibleSections.has(4) ? 'visible' : ''}`}>
                {/* Firework rocket */}
                <rect x="50" y="100" width="20" height="80" rx="3" fill="#c41e3a" stroke="#f0ebe0" strokeWidth="1" />
                <polygon points="60,100 50,100 60,70 70,100" fill="#e6c200" />
                <rect x="55" y="180" width="10" height="30" fill="#8b6914" />
                
                {/* Mining explosive */}
                <rect x="140" y="140" width="60" height="25" rx="5" fill="#c41e3a" stroke="#f0ebe0" strokeWidth="1" />
                <text x="170" y="157" fontFamily="sans-serif" fontSize="8" fill="#f0ebe0" textAnchor="middle">TNT</text>
                <line x1="200" y1="150" x2="230" y2="150" stroke="#1a1a1a" strokeWidth="2" />
                
                {/* Space rocket */}
                <path d="M280 200 L280 100 Q280 80 295 80 Q310 80 310 100 L310 200 Z" 
                      fill="#8a8a8a" stroke="#f0ebe0" strokeWidth="1" />
                <polygon points="295,80 280,100 310,100" fill="#c41e3a" />
                <rect x="280" y="200" width="10" height="20" fill="#ff6b35" />
                <rect x="300" y="200" width="10" height="20" fill="#ff6b35" />
                <ellipse cx="295" cy="230" rx="20" ry="10" fill="#ff6b35" opacity="0.7" />
                
                {/* Labels */}
                <text x="60" y="230" fontFamily="Caveat" fontSize="11" fill="#8a8a8a" textAnchor="middle">Fireworks</text>
                <text x="170" y="190" fontFamily="Caveat" fontSize="11" fill="#8a8a8a" textAnchor="middle">Mining</text>
                <text x="295" y="260" fontFamily="Caveat" fontSize="11" fill="#8a8a8a" textAnchor="middle">Rocketry</text>
                
                <text x="175" y="290" fontFamily="Caveat" fontSize="14" fill="#8a8a8a" textAnchor="middle">
                  The Legacy Continues
                </text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-era">Beyond the Battlefield</div>
            <div className="section-year">Today</div>
            <h3 className="section-title">The Explosive Legacy</h3>
            <p className="section-text">
              Gunpowder&apos;s descendants shaped the modern world. Black powder gave way to 
              dynamite (1867), then TNT, then rocket fuel. Mining, construction, demolition, 
              and space exploration all trace their lineage to that Tang Dynasty laboratory.
            </p>
            <p className="section-text">
              Today, fireworks still use formulas remarkably similar to those of ancient 
              China — a reminder that the same substance can bring joy or destruction, 
              depending on human intention.
            </p>
            <div className="section-highlight">
              From an alchemist&apos;s mistake to the moon landing — gunpowder&apos;s story 
              spans 1,200 years and still continues.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SOURCES ==================== */}
      <section className="sources-section">
        <div className="sources-inner">
          <h3 className="sources-title">Sources & Further Reading</h3>
          <div className="sources-grid">
            <a href="https://www.britannica.com/technology/gunpowder" target="_blank" rel="noopener noreferrer">
              Encyclopædia Britannica: Gunpowder
            </a>
            <a href="https://asiasociety.org/education/gunpowder" target="_blank" rel="noopener noreferrer">
              Asia Society: The Chinese Invention of Gunpowder
            </a>
            <a href="https://www.jstor.org/stable/41212888" target="_blank" rel="noopener noreferrer">
              JSTOR: The Gunpowder Age — Technology & History
            </a>
            <a href="https://www.metmuseum.org/toah/hd/gunp/hd_gunp.htm" target="_blank" rel="noopener noreferrer">
              Metropolitan Museum: Gunpowder and Firearms
            </a>
            <a href="https://www.smithsonianmag.com/history/brief-history-gunpowder-180969771/" target="_blank" rel="noopener noreferrer">
              Smithsonian: A Brief History of Gunpowder
            </a>
            <a href="https://www.cambridge.org/core/books/gunpowder-age/8BDA1C938D1B6F0F0A15ECE9B1775FF4" target="_blank" rel="noopener noreferrer">
              Cambridge: The Gunpowder Age by Tonio Andrade
            </a>
            <a href="https://www.loc.gov/collections/rare-book-and-special-collections/" target="_blank" rel="noopener noreferrer">
              Library of Congress: Rare Books on Early Firearms
            </a>
            <a href="https://www.history.com/topics/inventions/gunpowder" target="_blank" rel="noopener noreferrer">
              History.com: Gunpowder
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="story-footer">
        <div className="footer-content">
          <div className="footer-spark" />
          <p className="footer-text">
            A spark in a Chinese laboratory. A formula passed along the Silk Road. 
            A world forever changed. The fuse, once lit, never stopped burning.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GunpowderClient;

