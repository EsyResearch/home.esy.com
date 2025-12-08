"use client";

import React, { useState, useEffect, useRef } from 'react';
import './mammary-gland-evolution.css';

/*
 * MAMMARY GLAND EVOLUTION - Enhanced Anatomical Version
 * 
 * Detailed medical illustration style with:
 * - Realistic human breast cross-section anatomy
 * - Comparative animal mammary gland anatomy
 * - Cellular-level alveoli detail
 * - Milk composition visualizations
 * - Educational labeling throughout
 */

const MammaryGlandEvolutionClient: React.FC = () => {
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
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const compSection = document.querySelector('.composition-section');
    if (!compSection) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCompositionVisible(true);
      },
      { threshold: 0.3 }
    );
    
    observer.observe(compSection);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mammary-v2">
      {/* Progress Indicator */}
      <div className="anatomy-progress">
        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
        <span className="progress-label">Scroll</span>
      </div>

      {/* ==================== HERO ==================== */}
      <section className="hero">
        <div className="hero-layout">
          {/* Detailed Breast Cross-Section */}
          <div className="hero-illustration">
            <svg viewBox="0 0 400 450" className="anatomy-svg">
              {/* Background tissue */}
              <ellipse cx="200" cy="200" rx="180" ry="170" className="skin-layer" />
              
              {/* Adipose (fat) tissue layer */}
              <ellipse cx="200" cy="210" rx="160" ry="145" className="adipose-layer" />
              
              {/* Chest wall base */}
              <rect x="30" y="350" width="340" height="80" rx="10" fill="#d4a882" opacity="0.5" />
              <text x="200" y="395" textAnchor="middle" className="anatomy-label" fontSize="11">Pectoralis Major Muscle</text>
              
              {/* Cooper&apos;s Ligaments */}
              <path d="M80 80 Q100 200 80 350" stroke="#c4a484" strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M150 60 Q160 200 140 350" stroke="#c4a484" strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M250 60 Q240 200 260 350" stroke="#c4a484" strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M320 80 Q300 200 320 350" stroke="#c4a484" strokeWidth="2" fill="none" opacity="0.6" />
              
              {/* Glandular Lobes (15-20 in human breast) */}
              {/* Lobe cluster 1 - upper left */}
              <ellipse cx="100" cy="140" rx="45" ry="35" className="glandular-tissue" />
              <circle cx="85" cy="125" r="12" className="alveolus" />
              <circle cx="105" cy="120" r="10" className="alveolus" />
              <circle cx="120" cy="135" r="11" className="alveolus" />
              <circle cx="90" cy="150" r="9" className="alveolus" />
              <circle cx="110" cy="155" r="10" className="alveolus" />
              
              {/* Lobe cluster 2 - upper center */}
              <ellipse cx="200" cy="120" rx="50" ry="40" className="glandular-tissue" />
              <circle cx="180" cy="105" r="11" className="alveolus" />
              <circle cx="200" cy="100" r="12" className="alveolus" />
              <circle cx="220" cy="105" r="11" className="alveolus" />
              <circle cx="185" cy="130" r="10" className="alveolus" />
              <circle cx="205" cy="135" r="11" className="alveolus" />
              <circle cx="225" cy="128" r="9" className="alveolus" />
              
              {/* Lobe cluster 3 - upper right */}
              <ellipse cx="300" cy="140" rx="45" ry="35" className="glandular-tissue" />
              <circle cx="285" cy="125" r="10" className="alveolus" />
              <circle cx="305" cy="120" r="11" className="alveolus" />
              <circle cx="320" cy="140" r="10" className="alveolus" />
              <circle cx="290" cy="155" r="11" className="alveolus" />
              <circle cx="310" cy="150" r="9" className="alveolus" />
              
              {/* Lobe cluster 4 - middle left */}
              <ellipse cx="120" cy="210" rx="40" ry="35" className="glandular-tissue" />
              <circle cx="105" cy="195" r="10" className="alveolus" />
              <circle cx="130" cy="200" r="11" className="alveolus" />
              <circle cx="110" cy="220" r="9" className="alveolus" />
              <circle cx="135" cy="225" r="10" className="alveolus" />
              
              {/* Lobe cluster 5 - middle right */}
              <ellipse cx="280" cy="210" rx="40" ry="35" className="glandular-tissue" />
              <circle cx="265" cy="195" r="10" className="alveolus" />
              <circle cx="290" cy="200" r="11" className="alveolus" />
              <circle cx="270" cy="225" r="9" className="alveolus" />
              <circle cx="295" cy="220" r="10" className="alveolus" />
              
              {/* Lactiferous Ducts - converging to nipple */}
              <path d="M100 140 Q130 220 170 300 Q190 340 200 370" className="duct" strokeWidth="3" />
              <path d="M200 120 Q200 200 200 300 L200 370" className="duct" strokeWidth="3" />
              <path d="M300 140 Q270 220 230 300 Q210 340 200 370" className="duct" strokeWidth="3" />
              <path d="M120 210 Q150 260 180 320 Q195 350 200 370" className="duct" strokeWidth="2.5" />
              <path d="M280 210 Q250 260 220 320 Q205 350 200 370" className="duct" strokeWidth="2.5" />
              
              {/* Lactiferous Sinuses (milk storage) */}
              <ellipse cx="175" cy="335" rx="15" ry="10" className="milk-fill" />
              <ellipse cx="200" cy="340" rx="18" ry="12" className="milk-fill" />
              <ellipse cx="225" cy="335" rx="15" ry="10" className="milk-fill" />
              
              {/* Areola */}
              <circle cx="200" cy="380" r="35" className="areola" />
              
              {/* Nipple */}
              <ellipse cx="200" cy="395" rx="18" ry="25" className="nipple" />
              <ellipse cx="200" cy="410" rx="12" ry="8" fill="#a04848" />
              
              {/* Nipple pores */}
              <circle cx="195" cy="400" r="2" fill="#5c3d4a" />
              <circle cx="205" cy="400" r="2" fill="#5c3d4a" />
              <circle cx="200" cy="407" r="2" fill="#5c3d4a" />
              
              {/* Labels with lines */}
              <line x1="50" y1="140" x2="85" y2="140" className="label-line" />
              <text x="10" y="145" className="anatomy-label">Lobes</text>
              
              <line x1="50" y1="195" x2="90" y2="195" className="label-line" />
              <text x="10" y="200" className="anatomy-label">Alveoli</text>
              
              <line x1="350" y1="180" x2="310" y2="200" className="label-line" />
              <text x="355" y="185" className="anatomy-label">Ducts</text>
              
              <line x1="350" y1="335" x2="245" y2="335" className="label-line" />
              <text x="355" y="340" className="anatomy-label">Sinuses</text>
              
              <line x1="270" y1="395" x2="235" y2="395" className="label-line" />
              <text x="275" y="400" className="anatomy-label">Nipple</text>
              
              <line x1="270" y1="365" x2="235" y2="375" className="label-line" />
              <text x="275" y="370" className="anatomy-label">Areola</text>
            </svg>
          </div>

          <div className="hero-content">
            <div className="hero-badge">A Medical Illustration Journey</div>
            <h1 className="hero-title">The Evolution of Mammary Glands</h1>
            <h2 className="hero-subtitle">310 Million Years of Adaptation</h2>
            <p className="hero-description">
              The mammary gland is one of evolution&apos;s most remarkable innovations — a modified 
              sweat gland that became the defining feature of over 6,400 mammalian species. 
              This is the story of how it evolved, how it works, and why it varies so dramatically 
              across the animal kingdom.
            </p>
          </div>
        </div>

        <div className="hero-scroll">
          <span>Explore the anatomy</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* ==================== SECTION 1: Alveoli Detail ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[0] = el; }}
      >
        <div className="section-layout">
          <div className="section-illustration">
            <svg viewBox="0 0 350 350" className="anatomy-svg">
              {/* Single Alveolus - Detailed */}
              <defs>
                <radialGradient id="alveolusGrad" cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#b0d0e8" />
                  <stop offset="100%" stopColor="#8eb4d0" />
                </radialGradient>
              </defs>
              
              {/* Alveolus cluster */}
              <g className={`anatomy-layer ${visibleSections.has(0) ? 'visible' : ''}`}>
                {/* Main alveolus */}
                <circle cx="175" cy="150" r="80" fill="url(#alveolusGrad)" stroke="#5a9898" strokeWidth="2" />
                
                {/* Milk inside */}
                <circle cx="175" cy="150" r="60" fill="#fefef6" opacity="0.8" />
                
                {/* Myoepithelial cells (surround alveolus) */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                  const x = 175 + 70 * Math.cos(angle * Math.PI / 180);
                  const y = 150 + 70 * Math.sin(angle * Math.PI / 180);
                  return (
                    <ellipse 
                      key={i}
                      cx={x} cy={y} 
                      rx="12" ry="8" 
                      fill="#d08090" 
                      transform={`rotate(${angle}, ${x}, ${y})`}
                      opacity="0.8"
                    />
                  );
                })}
                
                {/* Epithelial cells lining */}
                <circle cx="175" cy="150" r="65" fill="none" stroke="#e8a0b0" strokeWidth="8" strokeDasharray="12 4" />
                
                {/* Duct leading out */}
                <path d="M175 230 L175 320" stroke="#c86464" strokeWidth="12" strokeLinecap="round" />
                <ellipse cx="175" cy="240" rx="15" ry="10" fill="#c86464" />
              </g>
              
              {/* Blood vessels */}
              <g className={`anatomy-layer ${visibleSections.has(0) ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
                <path d="M80 100 Q120 120 100 170 Q90 200 110 240" stroke="#c86464" strokeWidth="3" fill="none" />
                <path d="M270 100 Q230 120 250 170 Q260 200 240 240" stroke="#c86464" strokeWidth="3" fill="none" />
                {/* Capillaries */}
                <path d="M100 170 Q140 160 160 170" stroke="#c86464" strokeWidth="1.5" fill="none" />
                <path d="M250 170 Q210 160 190 170" stroke="#c86464" strokeWidth="1.5" fill="none" />
              </g>
              
              {/* Labels */}
              <g className={`anatomy-layer ${visibleSections.has(0) ? 'visible' : ''}`} style={{ transitionDelay: '0.5s' }}>
                <line x1="40" y1="150" x2="95" y2="150" className="label-line" />
                <text x="10" y="145" className="anatomy-label">Milk-secreting</text>
                <text x="10" y="160" className="anatomy-label">cells</text>
                
                <line x1="310" y1="150" x2="255" y2="150" className="label-line" />
                <text x="290" y="145" className="anatomy-label">Myoepithelial</text>
                <text x="290" y="160" className="anatomy-label">cells</text>
                
                <line x1="220" y1="280" x2="190" y2="280" className="label-line" />
                <text x="225" y="285" className="anatomy-label">Duct</text>
                
                <text x="175" y="155" textAnchor="middle" className="anatomy-label" fontSize="11">Milk</text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-number">01</div>
            <div className="section-badge">The Milk Factory</div>
            <h3 className="section-title">Inside the Alveolus: Where Milk Is Born</h3>
            <p className="section-text">
              Each breast contains 15-20 lobes, and each lobe contains clusters of alveoli — 
              tiny hollow spheres lined with milk-secreting epithelial cells. When stimulated 
              by the hormone prolactin, these cells extract nutrients from the bloodstream and 
              synthesize milk.
            </p>
            <p className="section-text">
              Surrounding each alveolus are myoepithelial cells — muscle-like cells that contract 
              when triggered by oxytocin (the &ldquo;let-down reflex&rdquo;), squeezing milk into the ducts.
            </p>
            <div className="section-callout">
              A single breast can contain up to 100,000 alveoli, each one a microscopic milk factory.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: Evolutionary Origin ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[1] = el; }}
      >
        <div className="section-layout reverse">
          <div className="section-illustration">
            <svg viewBox="0 0 350 400" className="anatomy-svg">
              {/* Evolution from sweat gland */}
              <g className={`anatomy-layer ${visibleSections.has(1) ? 'visible' : ''}`}>
                {/* Ancient skin cross-section */}
                <rect x="50" y="20" width="250" height="60" rx="5" fill="#e8c4a0" stroke="#d4a882" />
                <text x="175" y="55" textAnchor="middle" className="anatomy-label" fontSize="10">Epidermis (skin)</text>
                
                {/* Simple apocrine gland */}
                <path d="M100 80 L100 140 Q100 160 120 160 L130 160 Q150 160 150 140 L150 80" 
                      fill="#f5d89a" stroke="#e5c87a" strokeWidth="2" />
                <ellipse cx="125" cy="140" rx="20" ry="15" fill="#8eb4d0" opacity="0.5" />
                <text x="125" y="200" textAnchor="middle" className="anatomy-label" fontSize="10">Apocrine Gland</text>
                <text x="125" y="215" textAnchor="middle" className="anatomy-label" fontSize="9">(Ancestral)</text>
              </g>
              
              {/* Arrow */}
              <g className={`anatomy-layer ${visibleSections.has(1) ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
                <path d="M175 230 L175 260" stroke="#5a9898" strokeWidth="3" markerEnd="url(#arrowhead)" />
                <text x="220" y="250" className="anatomy-label" fontSize="10">310 Million Years</text>
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#5a9898" />
                  </marker>
                </defs>
              </g>
              
              {/* Modern mammary gland */}
              <g className={`anatomy-layer ${visibleSections.has(1) ? 'visible' : ''}`} style={{ transitionDelay: '0.6s' }}>
                <rect x="50" y="270" width="250" height="40" rx="5" fill="#e8c4a0" stroke="#d4a882" />
                
                {/* Complex mammary structure */}
                <ellipse cx="175" cy="360" rx="80" ry="50" fill="#f5d89a" stroke="#e5c87a" />
                
                {/* Alveoli clusters */}
                <circle cx="120" cy="340" r="15" className="alveolus" />
                <circle cx="145" cy="330" r="12" className="alveolus" />
                <circle cx="175" cy="325" r="14" className="alveolus" />
                <circle cx="205" cy="330" r="12" className="alveolus" />
                <circle cx="230" cy="340" r="15" className="alveolus" />
                
                {/* Ducts */}
                <path d="M120 355 Q150 380 175 400" stroke="#c86464" strokeWidth="2" fill="none" />
                <path d="M175 340 L175 400" stroke="#c86464" strokeWidth="2" fill="none" />
                <path d="M230 355 Q200 380 175 400" stroke="#c86464" strokeWidth="2" fill="none" />
                
                <text x="175" y="420" textAnchor="middle" className="anatomy-label" fontSize="10">Mammary Gland</text>
                <text x="175" y="435" textAnchor="middle" className="anatomy-label" fontSize="9">(Modern)</text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-number">02</div>
            <div className="section-badge">Ancient Origins</div>
            <h3 className="section-title">From Sweat to Sustenance</h3>
            <p className="section-text">
              The mammary gland evolved from apocrine skin glands — relatives of sweat glands. 
              Our synapsid ancestors (proto-mammals) used these glands to secrete moisture onto 
              their parchment-shelled eggs, keeping them from drying out.
            </p>
            <p className="section-text">
              Over time, these secretions gained antimicrobial properties to protect eggs from 
              infection. Then, crucially, they became nutritious — eventually rich enough to 
              sustain hatchlings entirely, making eggshells unnecessary.
            </p>
            <div className="section-callout">
              Lactation is older than live birth. Mammals were nursing their young from eggs 
              before they evolved to give birth to live young.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== COMPARATIVE ANATOMY ==================== */}
      <section className="compare-section">
        <div className="compare-inner">
          <div className="compare-header">
            <h3 className="compare-title">Mammary Glands Across Species</h3>
            <p className="compare-subtitle">
              The same organ, radically different designs — each optimized for survival
            </p>
          </div>
          
          <div className="compare-grid">
            {/* Platypus */}
            <div className="compare-card">
              <div className="compare-illustration">
                <svg viewBox="0 0 150 150">
                  {/* Platypus body */}
                  <ellipse cx="75" cy="80" rx="60" ry="40" fill="#8B7355" />
                  <ellipse cx="75" cy="75" rx="50" ry="30" fill="#A08060" />
                  {/* Bill */}
                  <ellipse cx="140" cy="80" rx="25" ry="12" fill="#4a4a4a" />
                  {/* Tail */}
                  <ellipse cx="10" cy="85" rx="20" ry="15" fill="#6B5344" />
                  {/* Milk patches - no nipples */}
                  <ellipse cx="60" cy="95" rx="12" ry="8" fill="#e8a0b0" opacity="0.8" />
                  <ellipse cx="90" cy="95" rx="12" ry="8" fill="#e8a0b0" opacity="0.8" />
                  {/* Milk seeping */}
                  <circle cx="55" cy="105" r="3" fill="#fefef6" />
                  <circle cx="65" cy="108" r="2" fill="#fefef6" />
                  <circle cx="85" cy="105" r="3" fill="#fefef6" />
                  <circle cx="95" cy="108" r="2" fill="#fefef6" />
                </svg>
              </div>
              <div className="compare-name">Platypus</div>
              <div className="compare-type">Monotreme</div>
              <p className="compare-fact">
                <strong>No nipples.</strong> Milk seeps through specialized skin patches. 
                Babies lap milk from fur like sweat — the most ancient form of nursing.
              </p>
            </div>

            {/* Kangaroo */}
            <div className="compare-card">
              <div className="compare-illustration">
                <svg viewBox="0 0 150 150">
                  {/* Kangaroo body */}
                  <ellipse cx="75" cy="60" rx="35" ry="50" fill="#9B8B7A" />
                  {/* Head */}
                  <ellipse cx="75" cy="15" rx="20" ry="18" fill="#A09080" />
                  <ellipse cx="68" cy="8" rx="6" ry="12" fill="#9B8B7A" />
                  <ellipse cx="82" cy="8" rx="6" ry="12" fill="#9B8B7A" />
                  {/* Pouch with baby inside */}
                  <path d="M55 70 Q45 100 55 120 Q75 135 95 120 Q105 100 95 70" fill="#806050" />
                  <ellipse cx="75" cy="100" rx="18" ry="22" fill="#A09080" />
                  {/* Joey head peeking */}
                  <circle cx="75" cy="90" r="12" fill="#B0A090" />
                  <circle cx="72" cy="87" r="2" fill="#2a3440" />
                  <circle cx="78" cy="87" r="2" fill="#2a3440" />
                  {/* Nipples inside pouch */}
                  <circle cx="65" cy="105" r="4" fill="#d08090" />
                  <circle cx="85" cy="105" r="4" fill="#d08090" />
                </svg>
              </div>
              <div className="compare-name">Kangaroo</div>
              <div className="compare-type">Marsupial</div>
              <p className="compare-fact">
                <strong>4 nipples, 2 milk types.</strong> Can produce different milk 
                from different nipples simultaneously — one for newborn, one for older joey.
              </p>
            </div>

            {/* Cow */}
            <div className="compare-card">
              <div className="compare-illustration">
                <svg viewBox="0 0 150 150">
                  {/* Cow body */}
                  <ellipse cx="75" cy="50" rx="55" ry="35" fill="#F5F5DC" />
                  {/* Spots */}
                  <ellipse cx="50" cy="45" rx="15" ry="12" fill="#2a3440" />
                  <ellipse cx="95" cy="55" rx="12" ry="10" fill="#2a3440" />
                  {/* Head */}
                  <ellipse cx="130" cy="40" rx="20" ry="25" fill="#F5F5DC" />
                  <ellipse cx="125" cy="30" rx="8" ry="5" fill="#FFB6C1" />
                  <circle cx="125" cy="35" r="3" fill="#2a3440" />
                  {/* Udder */}
                  <ellipse cx="75" cy="95" rx="35" ry="25" fill="#FFB6C1" />
                  {/* 4 teats */}
                  <ellipse cx="55" cy="115" rx="6" ry="12" fill="#d08090" />
                  <ellipse cx="70" cy="118" rx="6" ry="12" fill="#d08090" />
                  <ellipse cx="85" cy="118" rx="6" ry="12" fill="#d08090" />
                  <ellipse cx="100" cy="115" rx="6" ry="12" fill="#d08090" />
                  {/* Legs */}
                  <rect x="35" y="75" width="8" height="35" fill="#F5F5DC" />
                  <rect x="110" y="75" width="8" height="35" fill="#F5F5DC" />
                </svg>
              </div>
              <div className="compare-name">Cow</div>
              <div className="compare-type">Placental (Ungulate)</div>
              <p className="compare-fact">
                <strong>4 teats, 1 udder.</strong> Produces 6-7 gallons/day. 
                Domesticated 10,000 years ago, now the world&apos;s primary milk source.
              </p>
            </div>

            {/* Human */}
            <div className="compare-card">
              <div className="compare-illustration">
                <svg viewBox="0 0 150 150">
                  {/* Torso outline */}
                  <path d="M45 30 Q35 60 40 120 L110 120 Q115 60 105 30 Q75 20 45 30" fill="#f5dcc8" stroke="#d4a882" />
                  {/* Breasts */}
                  <ellipse cx="60" cy="70" rx="25" ry="22" fill="#e8c4a0" />
                  <ellipse cx="90" cy="70" rx="25" ry="22" fill="#e8c4a0" />
                  {/* Areolae */}
                  <circle cx="60" cy="78" r="10" fill="#d08090" />
                  <circle cx="90" cy="78" r="10" fill="#d08090" />
                  {/* Nipples */}
                  <circle cx="60" cy="80" r="4" fill="#a04848" />
                  <circle cx="90" cy="80" r="4" fill="#a04848" />
                  {/* Shoulders */}
                  <path d="M30 25 Q45 30 45 30" stroke="#d4a882" strokeWidth="3" fill="none" />
                  <path d="M120 25 Q105 30 105 30" stroke="#d4a882" strokeWidth="3" fill="none" />
                </svg>
              </div>
              <div className="compare-name">Human</div>
              <div className="compare-type">Placental (Primate)</div>
              <p className="compare-fact">
                <strong>2 breasts, permanent development.</strong> Unique among primates — 
                breasts remain enlarged outside lactation. 200+ unique oligosaccharides in milk.
              </p>
            </div>

            {/* Whale */}
            <div className="compare-card">
              <div className="compare-illustration">
                <svg viewBox="0 0 150 150">
                  {/* Whale body */}
                  <path d="M10 75 Q30 40 75 50 Q120 45 140 75 Q120 105 75 100 Q30 110 10 75" fill="#4a6080" />
                  {/* Underside */}
                  <path d="M20 80 Q50 100 100 95 Q130 90 135 75" fill="#8090a0" />
                  {/* Eye */}
                  <circle cx="35" cy="65" r="5" fill="#2a3440" />
                  <circle cx="36" cy="64" r="2" fill="#fff" />
                  {/* Mammary slit */}
                  <path d="M70 92 L90 92" stroke="#d08090" strokeWidth="4" strokeLinecap="round" />
                  {/* Milk jet */}
                  <path d="M80 95 Q82 105 80 115" stroke="#fefef6" strokeWidth="6" fill="none" strokeLinecap="round" />
                  {/* Calf */}
                  <ellipse cx="80" cy="130" rx="25" ry="12" fill="#5a7090" />
                  <circle cx="60" cy="128" r="3" fill="#2a3440" />
                </svg>
              </div>
              <div className="compare-name">Blue Whale</div>
              <div className="compare-type">Placental (Cetacean)</div>
              <p className="compare-fact">
                <strong>Hidden mammary slits.</strong> Nipples retract for streamlining. 
                Milk is 35-50% fat (vs 4% human) — 200 liters/day to grow calf 200 lbs/day.
              </p>
            </div>

            {/* Seal */}
            <div className="compare-card">
              <div className="compare-illustration">
                <svg viewBox="0 0 150 150">
                  {/* Seal body */}
                  <ellipse cx="75" cy="80" rx="55" ry="35" fill="#8B8878" />
                  <ellipse cx="75" cy="75" rx="45" ry="28" fill="#9B9888" />
                  {/* Head */}
                  <circle cx="125" cy="70" r="22" fill="#9B9888" />
                  <ellipse cx="135" cy="65" rx="8" ry="5" fill="#2a3440" />
                  <circle cx="120" cy="62" r="4" fill="#2a3440" />
                  <circle cx="121" cy="61" r="1.5" fill="#fff" />
                  {/* Whiskers */}
                  <line x1="140" y1="68" x2="148" y2="65" stroke="#2a3440" strokeWidth="1" />
                  <line x1="140" y1="70" x2="148" y2="70" stroke="#2a3440" strokeWidth="1" />
                  <line x1="140" y1="72" x2="148" y2="75" stroke="#2a3440" strokeWidth="1" />
                  {/* Flippers */}
                  <ellipse cx="20" cy="95" rx="18" ry="10" fill="#7B7868" />
                  {/* Nipples */}
                  <circle cx="60" cy="100" r="5" fill="#d08090" />
                  <circle cx="90" cy="100" r="5" fill="#d08090" />
                  {/* Pup nursing */}
                  <ellipse cx="75" cy="125" rx="25" ry="15" fill="#C0C0B0" />
                  <circle cx="55" cy="120" r="8" fill="#C0C0B0" />
                </svg>
              </div>
              <div className="compare-name">Seal</div>
              <div className="compare-type">Placental (Pinniped)</div>
              <p className="compare-fact">
                <strong>50% fat milk — richest of all mammals.</strong> Pups gain 
                4-5 lbs/day. Mothers fast during nursing, losing 40% of body weight in weeks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MILK COMPOSITION ==================== */}
      <section className="composition-section">
        <div className="composition-inner">
          <h3 className="composition-title">Milk Fat Content by Species</h3>
          <p className="composition-subtitle">
            Environment drives composition — cold water mammals need the fattiest milk
          </p>
          
          <div className="milk-bars">
            {[
              { name: 'Human', fat: 4 },
              { name: 'Cow', fat: 4 },
              { name: 'Whale', fat: 35 },
              { name: 'Seal', fat: 50 },
              { name: 'Rabbit', fat: 12 },
            ].map((item, idx) => (
              <div key={item.name} className="milk-bar-item">
                <div className="milk-bar-container">
                  <div 
                    className="milk-bar-fill"
                    style={{ 
                      height: compositionVisible ? `${item.fat * 2}%` : '0%',
                      transitionDelay: `${idx * 0.15}s`
                    }}
                  />
                </div>
                <div className="milk-bar-label">{item.name}</div>
                <div className="milk-bar-value">{item.fat}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== QUOTE ==================== */}
      <section className="quote-section">
        <div className="quote-inner">
          <p className="quote-text">
            &ldquo;Milk is evolution&apos;s answer to a seemingly impossible problem: how to nourish 
            offspring with a food that didn&apos;t exist until the offspring was born.&rdquo;
          </p>
          <p className="quote-author">— Dr. Olav Oftedal, Smithsonian Institution</p>
        </div>
      </section>

      {/* ==================== SOURCES ==================== */}
      <section className="sources-section">
        <div className="sources-inner">
          <h3 className="sources-title">Sources & Further Reading</h3>
          <div className="sources-grid">
            <a href="https://pubmed.ncbi.nlm.nih.gov/22436214/" target="_blank" rel="noopener noreferrer">
              Oftedal, O.T. (2012) &ldquo;The evolution of milk secretion and its ancient origins&rdquo; — Animal
            </a>
            <a href="https://www.ncbi.nlm.nih.gov/books/NBK148970/" target="_blank" rel="noopener noreferrer">
              NCBI Bookshelf: Anatomy of the Lactating Breast
            </a>
            <a href="https://royalsocietypublishing.org/doi/10.1098/rstb.2010.0147" target="_blank" rel="noopener noreferrer">
              Lefèvre, C.M. et al. (2010) &ldquo;Evolution of lactation&rdquo; — Phil. Trans. R. Soc. B
            </a>
            <a href="https://www.nature.com/articles/nature06695" target="_blank" rel="noopener noreferrer">
              Tishkoff, S.A. et al. (2007) &ldquo;Convergent adaptation of human lactase persistence&rdquo; — Nature
            </a>
            <a href="https://pubmed.ncbi.nlm.nih.gov/22436215/" target="_blank" rel="noopener noreferrer">
              Urashima, T. et al. (2012) &ldquo;Evolution of milk oligosaccharides&rdquo; — Bioscience, Biotechnology
            </a>
            <a href="https://www.britannica.com/science/mammary-gland" target="_blank" rel="noopener noreferrer">
              Encyclopædia Britannica: Mammary Gland
            </a>
            <a href="https://anatomypubs.onlinelibrary.wiley.com/doi/10.1002/ar.20825" target="_blank" rel="noopener noreferrer">
              Anatomical Record: Evolution of mammary gland development
            </a>
            <a href="https://www.sciencedirect.com/topics/agricultural-and-biological-sciences/mammary-gland" target="_blank" rel="noopener noreferrer">
              ScienceDirect: Mammary Gland Overview
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="story-footer">
        <div className="footer-illustration">
          <svg viewBox="0 0 120 120">
            {/* Stylized mammary gland */}
            <circle cx="60" cy="60" r="50" fill="#f5d89a" stroke="#e5c87a" strokeWidth="2" />
            <circle cx="45" cy="45" r="12" fill="#8eb4d0" />
            <circle cx="75" cy="45" r="12" fill="#8eb4d0" />
            <circle cx="60" cy="55" r="14" fill="#8eb4d0" />
            <circle cx="40" cy="65" r="10" fill="#8eb4d0" />
            <circle cx="80" cy="65" r="10" fill="#8eb4d0" />
            <path d="M45 55 Q55 80 60 95" stroke="#c86464" strokeWidth="2" fill="none" />
            <path d="M60 60 L60 95" stroke="#c86464" strokeWidth="2" fill="none" />
            <path d="M75 55 Q65 80 60 95" stroke="#c86464" strokeWidth="2" fill="none" />
            <circle cx="60" cy="100" r="8" fill="#d08090" />
          </svg>
        </div>
        <p className="footer-text">
          310 million years of evolution, perfected for one purpose: 
          giving every mammal the best possible start to life.
        </p>
      </footer>
    </div>
  );
};

export default MammaryGlandEvolutionClient;

