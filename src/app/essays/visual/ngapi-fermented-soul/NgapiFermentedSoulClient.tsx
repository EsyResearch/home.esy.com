"use client";

import React, { useState, useEffect, useRef } from 'react';
import './ngapi-fermented-soul.css';

/*
 * NGAPI: THE FERMENTED SOUL OF MYANMAR
 * 
 * An illustration-focused scrollytelling experience exploring
 * WHY Myanmar became the land of fermented fish.
 * 
 * Design Philosophy:
 * - Rich, hand-crafted SVG illustrations
 * - Scroll-triggered CSS animations (no interactive JS components)
 * - Deep historical and geographical narrative
 * - Organic, patient reveal animations
 * 
 * Story Structure:
 * 1. Hero — The clay pot as cultural symbol
 * 2. Geography — Why Myanmar's landscape created ngapi
 * 3. The Rivers — Abundance that demanded preservation
 * 4. The Monsoon Problem — Heat, humidity, and necessity
 * 5. Salt & Sun — The preservation trinity
 * 6. The Ancient Masters — Mon coastal traditions
 * 7. River Kingdoms — Pyu freshwater innovation
 * 8. Cultural Synthesis — Bamar unification
 * 9. Regional Expressions — Four distinct traditions
 * 10. The Science — What fermentation creates
 * 11. Legacy — History you can taste
 */

// ============================================
// HOOKS
// ============================================

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = Math.min(window.scrollY / scrollHeight, 1);
      setProgress(currentProgress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return progress;
}

function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: '-5% 0px -10% 0px' }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  
  return { ref, isVisible };
}

// ============================================
// SVG ILLUSTRATIONS
// ============================================

// Hero Clay Pot with Steam
function HeroClayPotSVG() {
  return (
    <svg 
      viewBox="0 0 200 240" 
      role="img" 
      aria-labelledby="hero-pot-title hero-pot-desc"
    >
      <title id="hero-pot-title">Traditional Ngapi Fermentation Pot</title>
      <desc id="hero-pot-desc">A terracotta clay pot used for fermenting fish paste, with steam rising from the top</desc>
      
      <defs>
        <linearGradient id="potGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E07B59" />
          <stop offset="50%" stopColor="#C75B39" />
          <stop offset="100%" stopColor="#A04A2E" />
        </linearGradient>
        <linearGradient id="potInnerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5D4037" />
          <stop offset="100%" stopColor="#3E2723" />
        </linearGradient>
        <linearGradient id="ngapiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8D6E63" />
          <stop offset="30%" stopColor="#6D4C41" />
          <stop offset="100%" stopColor="#4E342E" />
        </linearGradient>
        <radialGradient id="oilSheen" cx="30%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#B8860B" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#B8860B" stopOpacity="0" />
        </radialGradient>
        <filter id="potShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#1A1512" floodOpacity="0.5" />
        </filter>
      </defs>
      
      {/* Pot body */}
      <g filter="url(#potShadow)">
        {/* Main pot shape */}
        <path 
          d="M40 80 
             Q25 100 30 160 
             Q35 200 100 200 
             Q165 200 170 160 
             Q175 100 160 80 
             Z" 
          fill="url(#potGradient)"
        />
        
        {/* Pot rim */}
        <ellipse cx="100" cy="80" rx="60" ry="18" fill="#A04A2E" />
        <ellipse cx="100" cy="78" rx="55" ry="15" fill="#C75B39" />
        
        {/* Inner darkness */}
        <ellipse cx="100" cy="78" rx="48" ry="12" fill="url(#potInnerGradient)" />
        
        {/* Ngapi paste inside */}
        <ellipse cx="100" cy="85" rx="42" ry="8" fill="url(#ngapiGradient)" />
        
        {/* Oil sheen on surface */}
        <ellipse cx="90" cy="83" rx="15" ry="4" fill="url(#oilSheen)" />
        
        {/* Surface texture */}
        <path 
          d="M70 140 Q85 145 100 140 Q115 135 130 140" 
          stroke="#A04A2E" 
          strokeWidth="2" 
          fill="none" 
          opacity="0.4"
        />
        <path 
          d="M60 165 Q80 170 100 165 Q120 160 140 165" 
          stroke="#8B4513" 
          strokeWidth="1.5" 
          fill="none" 
          opacity="0.3"
        />
      </g>
      
      {/* Steam wisps */}
      <g className="vapor-rise" style={{ ['--vapor-delay' as string]: '0s' }}>
        <path 
          d="M85 60 Q80 40 90 25 Q95 10 85 0" 
          stroke="rgba(245, 240, 225, 0.4)" 
          strokeWidth="4" 
          fill="none" 
          strokeLinecap="round"
        />
      </g>
      <g className="vapor-rise" style={{ ['--vapor-delay' as string]: '0.8s' }}>
        <path 
          d="M100 55 Q105 35 95 20 Q90 5 100 -5" 
          stroke="rgba(245, 240, 225, 0.35)" 
          strokeWidth="5" 
          fill="none" 
          strokeLinecap="round"
        />
      </g>
      <g className="vapor-rise" style={{ ['--vapor-delay' as string]: '1.6s' }}>
        <path 
          d="M115 60 Q120 40 110 25 Q105 10 115 0" 
          stroke="rgba(245, 240, 225, 0.3)" 
          strokeWidth="3" 
          fill="none" 
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

// Myanmar Geography Map
function MyanmarMapSVG() {
  return (
    <svg 
      viewBox="0 0 300 400" 
      role="img" 
      aria-labelledby="myanmar-map-title myanmar-map-desc"
    >
      <title id="myanmar-map-title">Map of Myanmar</title>
      <desc id="myanmar-map-desc">A stylized map showing Myanmar&apos;s rivers, coastline, and key regions for ngapi production</desc>
      
      <defs>
        <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B5344" />
          <stop offset="100%" stopColor="#4A3728" />
        </linearGradient>
        <linearGradient id="riverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5D6D7E" />
          <stop offset="100%" stopColor="#3D4D5E" />
        </linearGradient>
        <linearGradient id="coastGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4A6741" />
          <stop offset="100%" stopColor="#5D6D7E" />
        </linearGradient>
        <filter id="mapGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Bay of Bengal */}
      <rect x="0" y="0" width="80" height="400" fill="#3D4D5E" opacity="0.4" />
      
      {/* Myanmar landmass - simplified */}
      <path 
        d="M80 30 
           Q130 20 160 40 
           Q200 35 230 60 
           Q260 90 270 140 
           Q280 190 260 240 
           Q250 280 220 310 
           Q200 340 170 360 
           Q150 375 130 390 
           Q115 380 100 360 
           Q80 330 70 290 
           Q60 250 55 200 
           Q50 150 55 110 
           Q60 70 80 30 
           Z" 
        fill="url(#landGrad)"
        stroke="#8D6E63"
        strokeWidth="2"
      />
      
      {/* Irrawaddy River - main artery */}
      <path 
        d="M180 50 
           Q170 80 165 110 
           Q160 140 155 170 
           Q150 200 145 230 
           Q140 260 135 290 
           Q130 320 125 350 
           Q120 375 115 390" 
        fill="none" 
        stroke="url(#riverGrad)" 
        strokeWidth="6" 
        strokeLinecap="round"
        className="river-flow"
      />
      
      {/* Chindwin River */}
      <path 
        d="M140 60 Q130 100 135 140 Q145 170 155 170" 
        fill="none" 
        stroke="#5D6D7E" 
        strokeWidth="3" 
        strokeLinecap="round"
        className="river-flow"
        style={{ animationDelay: '0.5s' }}
      />
      
      {/* Sittang River */}
      <path 
        d="M200 120 Q190 160 180 200 Q170 240 165 280 Q160 310 155 340" 
        fill="none" 
        stroke="#5D6D7E" 
        strokeWidth="3" 
        strokeLinecap="round"
        className="river-flow"
        style={{ animationDelay: '0.3s' }}
      />
      
      {/* Delta region */}
      <ellipse 
        cx="130" cy="365" rx="40" ry="20" 
        fill="#4A6741" 
        opacity="0.6"
      />
      
      {/* Key regions with pulses */}
      {/* Rakhine Coast */}
      <g className="region-pulse">
        <circle cx="65" cy="200" r="12" fill="#C75B39" opacity="0.8" />
        <text x="40" y="225" fill="#F5F0E1" fontSize="10" fontFamily="var(--font-accent)">Rakhine</text>
      </g>
      
      {/* Delta */}
      <g className="region-pulse" style={{ animationDelay: '0.7s' }}>
        <circle cx="135" cy="340" r="14" fill="#C75B39" opacity="0.8" />
        <text x="155" y="345" fill="#F5F0E1" fontSize="10" fontFamily="var(--font-accent)">Delta</text>
      </g>
      
      {/* Upper Myanmar */}
      <g className="region-pulse" style={{ animationDelay: '1.4s' }}>
        <circle cx="175" cy="120" r="10" fill="#B8860B" opacity="0.8" />
        <text x="190" y="125" fill="#F5F0E1" fontSize="10" fontFamily="var(--font-accent)">Upper</text>
      </g>
      
      {/* Shan */}
      <g className="region-pulse" style={{ animationDelay: '2.1s' }}>
        <circle cx="220" cy="180" r="10" fill="#B8860B" opacity="0.8" />
        <text x="235" y="185" fill="#F5F0E1" fontSize="10" fontFamily="var(--font-accent)">Shan</text>
      </g>
      
      {/* Compass rose */}
      <g transform="translate(250, 50)">
        <circle cx="0" cy="0" r="15" fill="none" stroke="#8D6E63" strokeWidth="1" opacity="0.5" />
        <text x="0" y="-20" fill="#B8860B" fontSize="10" textAnchor="middle" fontFamily="var(--font-accent)">N</text>
        <path d="M0 -12 L3 0 L0 -5 L-3 0 Z" fill="#B8860B" />
      </g>
    </svg>
  );
}

// River Abundance Scene
function RiverAbundanceSVG() {
  return (
    <svg 
      viewBox="0 0 400 200" 
      role="img" 
      aria-labelledby="river-title river-desc"
    >
      <title id="river-title">The Irrawaddy River&apos;s Abundance</title>
      <desc id="river-desc">Fish swimming in the great Irrawaddy River, showing the abundance that ancient Myanmar communities relied upon</desc>
      
      <defs>
        <linearGradient id="riverWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5D6D7E" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3D4D5E" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="fishGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A8B2B8" />
          <stop offset="50%" stopColor="#C0C8CC" />
          <stop offset="100%" stopColor="#8A9499" />
        </linearGradient>
      </defs>
      
      {/* Water background */}
      <rect x="0" y="0" width="400" height="200" fill="url(#riverWaterGrad)" />
      
      {/* Water surface ripples */}
      <ellipse cx="100" cy="30" rx="60" ry="8" fill="none" stroke="#5D6D7E" strokeWidth="1" opacity="0.3" className="water-ripple" />
      <ellipse cx="280" cy="50" rx="50" ry="6" fill="none" stroke="#5D6D7E" strokeWidth="1" opacity="0.25" className="water-ripple" />
      <ellipse cx="180" cy="20" rx="40" ry="5" fill="none" stroke="#5D6D7E" strokeWidth="1" opacity="0.2" className="water-ripple" />
      
      {/* School of fish - Ngagyin (small river fish) */}
      {/* Fish 1 */}
      <g className="fish-swim" transform="translate(50, 80)">
        <ellipse cx="20" cy="10" rx="18" ry="8" fill="url(#fishGrad)" />
        <path d="M38 10 L50 4 L50 16 Z" fill="#A8B2B8" />
        <circle cx="8" cy="8" r="2" fill="#2C1810" />
        <path d="M12 10 Q20 6 28 10" stroke="#8A9499" strokeWidth="0.5" fill="none" opacity="0.5" />
        <path d="M20 2 L23 -2 L26 2" fill="#B8C2C8" />
      </g>
      
      {/* Fish 2 */}
      <g className="fish-swim" style={{ animationDelay: '1s' }} transform="translate(120, 110)">
        <ellipse cx="20" cy="10" rx="16" ry="7" fill="url(#fishGrad)" />
        <path d="M36 10 L46 5 L46 15 Z" fill="#A8B2B8" />
        <circle cx="8" cy="8" r="2" fill="#2C1810" />
        <path d="M20 3 L22 -1 L24 3" fill="#B8C2C8" />
      </g>
      
      {/* Fish 3 */}
      <g className="fish-swim" style={{ animationDelay: '2s' }} transform="translate(200, 70)">
        <ellipse cx="20" cy="10" rx="20" ry="9" fill="url(#fishGrad)" />
        <path d="M40 10 L54 3 L54 17 Z" fill="#A8B2B8" />
        <circle cx="6" cy="8" r="2.5" fill="#2C1810" />
        <path d="M20 1 L24 -4 L28 1" fill="#B8C2C8" />
      </g>
      
      {/* Fish 4 */}
      <g className="fish-swim" style={{ animationDelay: '0.5s' }} transform="translate(280, 130)">
        <ellipse cx="20" cy="10" rx="15" ry="6" fill="url(#fishGrad)" />
        <path d="M35 10 L44 6 L44 14 Z" fill="#A8B2B8" />
        <circle cx="9" cy="8" r="1.5" fill="#2C1810" />
      </g>
      
      {/* Fish 5 */}
      <g className="fish-swim" style={{ animationDelay: '1.5s' }} transform="translate(340, 90)">
        <ellipse cx="18" cy="10" rx="17" ry="7" fill="url(#fishGrad)" />
        <path d="M35 10 L46 5 L46 15 Z" fill="#A8B2B8" />
        <circle cx="6" cy="8" r="2" fill="#2C1810" />
        <path d="M18 3 L20 0 L22 3" fill="#B8C2C8" />
      </g>
      
      {/* Underwater plants */}
      <g opacity="0.4">
        <path d="M30 200 Q35 170 30 140 Q25 170 30 200" fill="#4A6741" />
        <path d="M45 200 Q50 175 45 150 Q40 175 45 200" fill="#3D5635" />
        <path d="M350 200 Q355 165 350 130 Q345 165 350 200" fill="#4A6741" />
        <path d="M370 200 Q375 180 370 160 Q365 180 370 200" fill="#3D5635" />
      </g>
      
      {/* Bubbles */}
      <circle cx="80" cy="150" r="3" fill="rgba(245, 240, 225, 0.3)" className="bubble-rise" style={{ ['--bubble-delay' as string]: '0s' }} />
      <circle cx="220" cy="160" r="2" fill="rgba(245, 240, 225, 0.25)" className="bubble-rise" style={{ ['--bubble-delay' as string]: '0.5s' }} />
      <circle cx="300" cy="140" r="2.5" fill="rgba(245, 240, 225, 0.3)" className="bubble-rise" style={{ ['--bubble-delay' as string]: '1s' }} />
    </svg>
  );
}

// Monsoon Cloud Scene
function MonsoonCloudsSVG() {
  return (
    <svg 
      viewBox="0 0 400 180" 
      role="img" 
      aria-labelledby="monsoon-title monsoon-desc"
    >
      <title id="monsoon-title">The Monsoon Season</title>
      <desc id="monsoon-desc">Heavy monsoon clouds bringing rain and humidity to Myanmar, creating conditions that made fish preservation essential</desc>
      
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3D4D5E" />
          <stop offset="100%" stopColor="#5D6D7E" />
        </linearGradient>
        <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6B7B8B" />
          <stop offset="100%" stopColor="#4A5A6A" />
        </linearGradient>
        <linearGradient id="rainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5D6D7E" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#5D6D7E" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {/* Sky background */}
      <rect x="0" y="0" width="400" height="180" fill="url(#skyGrad)" />
      
      {/* Main storm cloud */}
      <g className="float-drift">
        <ellipse cx="200" cy="50" rx="120" ry="35" fill="url(#cloudGrad)" />
        <ellipse cx="150" cy="45" rx="60" ry="30" fill="#5A6A7A" />
        <ellipse cx="250" cy="48" rx="55" ry="28" fill="#5A6A7A" />
        <ellipse cx="200" cy="35" rx="70" ry="25" fill="#6B7B8B" />
        <ellipse cx="170" cy="30" rx="40" ry="20" fill="#7A8A9A" opacity="0.8" />
        <ellipse cx="230" cy="32" rx="35" ry="18" fill="#7A8A9A" opacity="0.7" />
      </g>
      
      {/* Smaller clouds */}
      <g className="float-drift" style={{ animationDelay: '1s', animationDuration: '8s' }}>
        <ellipse cx="60" cy="40" rx="45" ry="20" fill="#6B7B8B" opacity="0.7" />
        <ellipse cx="45" cy="35" rx="25" ry="15" fill="#7A8A9A" opacity="0.6" />
      </g>
      
      <g className="float-drift" style={{ animationDelay: '2s', animationDuration: '7s' }}>
        <ellipse cx="350" cy="55" rx="40" ry="18" fill="#6B7B8B" opacity="0.6" />
        <ellipse cx="360" cy="48" rx="25" ry="12" fill="#7A8A9A" opacity="0.5" />
      </g>
      
      {/* Rain drops */}
      <g opacity="0.6">
        <line x1="120" y1="80" x2="115" y2="120" stroke="url(#rainGrad)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="150" y1="85" x2="145" y2="130" stroke="url(#rainGrad)" strokeWidth="1" strokeLinecap="round" />
        <line x1="180" y1="75" x2="175" y2="125" stroke="url(#rainGrad)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="210" y1="80" x2="205" y2="135" stroke="url(#rainGrad)" strokeWidth="1" strokeLinecap="round" />
        <line x1="240" y1="78" x2="235" y2="128" stroke="url(#rainGrad)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="270" y1="82" x2="265" y2="140" stroke="url(#rainGrad)" strokeWidth="1" strokeLinecap="round" />
        <line x1="300" y1="85" x2="295" y2="130" stroke="url(#rainGrad)" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      
      {/* Ground with puddles */}
      <rect x="0" y="160" width="400" height="20" fill="#4A3728" />
      <ellipse cx="100" cy="165" rx="30" ry="5" fill="#5D6D7E" opacity="0.4" />
      <ellipse cx="280" cy="168" rx="25" ry="4" fill="#5D6D7E" opacity="0.35" />
    </svg>
  );
}

// Sun Drying Scene
function SunDryingSVG() {
  return (
    <svg 
      viewBox="0 0 400 200" 
      role="img" 
      aria-labelledby="sundry-title sundry-desc"
    >
      <title id="sundry-title">Sun Drying Process</title>
      <desc id="sundry-desc">Fish paste spread on bamboo mats under the tropical sun, the traditional drying method that concentrates flavors</desc>
      
      <defs>
        <linearGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="skyDryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B8860B" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#DAA520" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="matGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8D6E63" />
          <stop offset="100%" stopColor="#6D4C41" />
        </linearGradient>
        <linearGradient id="pasteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5D4037" />
          <stop offset="50%" stopColor="#6D4C41" />
          <stop offset="100%" stopColor="#5D4037" />
        </linearGradient>
      </defs>
      
      {/* Sky with heat */}
      <rect x="0" y="0" width="400" height="200" fill="url(#skyDryGrad)" />
      
      {/* Sun */}
      <circle cx="320" cy="40" r="30" fill="#DAA520" />
      <circle cx="320" cy="40" r="25" fill="#F5D76E" />
      
      {/* Sun rays */}
      <g className="sun-ray">
        <line x1="320" y1="5" x2="320" y2="-10" stroke="#DAA520" strokeWidth="3" strokeLinecap="round" />
        <line x1="355" y1="40" x2="370" y2="40" stroke="#DAA520" strokeWidth="3" strokeLinecap="round" />
        <line x1="285" y1="40" x2="270" y2="40" stroke="#DAA520" strokeWidth="3" strokeLinecap="round" />
        <line x1="345" y1="15" x2="355" y2="5" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" />
        <line x1="295" y1="15" x2="285" y2="5" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" />
        <line x1="345" y1="65" x2="355" y2="75" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" />
        <line x1="295" y1="65" x2="285" y2="75" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" />
      </g>
      
      {/* Heat shimmer lines */}
      <g className="heat-shimmer" opacity="0.3">
        <path d="M50 100 Q70 95 90 100 Q110 105 130 100 Q150 95 170 100" stroke="#DAA520" strokeWidth="2" fill="none" />
        <path d="M180 90 Q200 85 220 90 Q240 95 260 90 Q280 85 300 90" stroke="#DAA520" strokeWidth="1.5" fill="none" />
      </g>
      
      {/* Ground */}
      <rect x="0" y="160" width="400" height="40" fill="#4A3728" />
      
      {/* Drying platform legs */}
      <rect x="40" y="130" width="6" height="35" fill="#6D4C41" />
      <rect x="180" y="130" width="6" height="35" fill="#6D4C41" />
      <rect x="354" y="130" width="6" height="35" fill="#6D4C41" />
      <rect x="214" y="130" width="6" height="35" fill="#6D4C41" />
      
      {/* Bamboo drying mats */}
      <rect x="30" y="120" width="200" height="15" rx="2" fill="url(#matGrad)" />
      
      {/* Mat texture lines */}
      <g stroke="#5D4037" strokeWidth="0.5" opacity="0.5">
        <line x1="35" y1="120" x2="35" y2="135" />
        <line x1="50" y1="120" x2="50" y2="135" />
        <line x1="65" y1="120" x2="65" y2="135" />
        <line x1="80" y1="120" x2="80" y2="135" />
        <line x1="95" y1="120" x2="95" y2="135" />
        <line x1="110" y1="120" x2="110" y2="135" />
        <line x1="125" y1="120" x2="125" y2="135" />
        <line x1="140" y1="120" x2="140" y2="135" />
        <line x1="155" y1="120" x2="155" y2="135" />
        <line x1="170" y1="120" x2="170" y2="135" />
        <line x1="185" y1="120" x2="185" y2="135" />
        <line x1="200" y1="120" x2="200" y2="135" />
        <line x1="215" y1="120" x2="215" y2="135" />
      </g>
      
      {/* Fish paste spread on mat */}
      <ellipse cx="130" cy="118" rx="80" ry="4" fill="url(#pasteGrad)" />
      
      {/* Second mat with paste */}
      <rect x="200" y="120" width="160" height="15" rx="2" fill="url(#matGrad)" />
      <ellipse cx="280" cy="118" rx="60" ry="3.5" fill="url(#pasteGrad)" />
      
      {/* Steam/vapor rising from paste */}
      <g className="vapor-rise" style={{ ['--vapor-delay' as string]: '0s' }} opacity="0.4">
        <path d="M100 110 Q105 95 100 80" stroke="rgba(245, 240, 225, 0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      <g className="vapor-rise" style={{ ['--vapor-delay' as string]: '1s' }} opacity="0.3">
        <path d="M150 108 Q155 90 150 75" stroke="rgba(245, 240, 225, 0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      <g className="vapor-rise" style={{ ['--vapor-delay' as string]: '0.5s' }} opacity="0.35">
        <path d="M270 108 Q275 92 270 78" stroke="rgba(245, 240, 225, 0.45)" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// Fermentation Cross-Section
function FermentationCrossSectionSVG() {
  return (
    <svg 
      viewBox="0 0 240 300" 
      role="img" 
      aria-labelledby="ferment-title ferment-desc"
    >
      <title id="ferment-title">Inside the Fermentation Pot</title>
      <desc id="ferment-desc">Cross-section of a clay fermentation pot showing the layers of fish, salt, and the transformation process</desc>
      
      <defs>
        <linearGradient id="potCrossGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A04A2E" />
          <stop offset="20%" stopColor="#C75B39" />
          <stop offset="80%" stopColor="#C75B39" />
          <stop offset="100%" stopColor="#A04A2E" />
        </linearGradient>
        <linearGradient id="layerFish" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6D7B8B" />
          <stop offset="100%" stopColor="#5D6D7E" />
        </linearGradient>
        <linearGradient id="layerSalt" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5F0E1" />
          <stop offset="100%" stopColor="#E0D8C8" />
        </linearGradient>
        <linearGradient id="layerPaste" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6D4C41" />
          <stop offset="100%" stopColor="#4E342E" />
        </linearGradient>
        <linearGradient id="layerLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5D4037" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3E2723" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      
      {/* Pot exterior outline - left half */}
      <path 
        d="M30 50 Q15 80 20 150 Q25 220 40 260 Q55 285 120 285" 
        fill="none" 
        stroke="url(#potCrossGrad)" 
        strokeWidth="12"
        strokeLinecap="round"
      />
      
      {/* Pot exterior outline - right half */}
      <path 
        d="M210 50 Q225 80 220 150 Q215 220 200 260 Q185 285 120 285" 
        fill="none" 
        stroke="url(#potCrossGrad)" 
        strokeWidth="12"
        strokeLinecap="round"
      />
      
      {/* Pot rim */}
      <ellipse cx="120" cy="50" rx="90" ry="20" fill="#A04A2E" />
      <ellipse cx="120" cy="48" rx="82" ry="16" fill="#C75B39" />
      
      {/* Interior - visible cross-section */}
      <path 
        d="M45 60 Q35 100 40 160 Q45 220 60 255 Q75 275 120 275 Q165 275 180 255 Q195 220 200 160 Q205 100 195 60 Z" 
        fill="#2C1810"
      />
      
      {/* Layer 1: Bottom paste (oldest) */}
      <path 
        d="M60 255 Q75 265 120 265 Q165 265 180 255 Q175 240 120 240 Q65 240 60 255 Z" 
        fill="url(#layerPaste)"
        className="ferment-layer"
      />
      
      {/* Layer 2: Fish/salt mixture */}
      <path 
        d="M55 210 Q50 240 60 255 Q65 240 120 240 Q175 240 180 255 Q190 240 185 210 Q170 195 120 195 Q70 195 55 210 Z" 
        fill="url(#layerFish)"
        className="ferment-layer"
      />
      
      {/* Salt crystals in fish layer */}
      <g className="ferment-layer">
        <circle cx="80" cy="215" r="3" fill="#F5F0E1" opacity="0.7" />
        <circle cx="110" cy="210" r="2" fill="#F5F0E1" opacity="0.6" />
        <circle cx="140" cy="218" r="2.5" fill="#F5F0E1" opacity="0.65" />
        <circle cx="160" cy="205" r="2" fill="#F5F0E1" opacity="0.6" />
      </g>
      
      {/* Layer 3: Brine liquid */}
      <path 
        d="M50 160 Q45 195 55 210 Q70 195 120 195 Q170 195 185 210 Q195 195 190 160 Q175 145 120 145 Q65 145 50 160 Z" 
        fill="url(#layerLiquid)"
        className="ferment-layer"
      />
      
      {/* Layer 4: Surface paste forming */}
      <ellipse cx="120" cy="140" rx="72" ry="12" fill="url(#layerPaste)" className="ferment-layer" />
      
      {/* Fermentation bubbles */}
      <g className="bubble-rise" style={{ ['--bubble-delay' as string]: '0s' }}>
        <circle cx="90" cy="180" r="3" fill="rgba(245, 240, 225, 0.4)" />
      </g>
      <g className="bubble-rise" style={{ ['--bubble-delay' as string]: '0.7s' }}>
        <circle cx="130" cy="190" r="2" fill="rgba(245, 240, 225, 0.35)" />
      </g>
      <g className="bubble-rise" style={{ ['--bubble-delay' as string]: '1.4s' }}>
        <circle cx="150" cy="175" r="2.5" fill="rgba(245, 240, 225, 0.4)" />
      </g>
      
      {/* Oil film on top */}
      <ellipse cx="110" cy="138" rx="25" ry="5" fill="#B8860B" opacity="0.4" />
      
      {/* Annotations */}
      <g fontFamily="var(--font-accent)" fontSize="8" fill="#F5F0E1">
        <text x="200" y="255" opacity="0.8">Aged Paste</text>
        <text x="200" y="215" opacity="0.8">Fish + Salt</text>
        <text x="200" y="175" opacity="0.8">Brine</text>
        <text x="200" y="140" opacity="0.8">New Layer</text>
      </g>
    </svg>
  );
}

// Regional Variant Illustrations
function RakhineCoastSVG() {
  return (
    <svg viewBox="0 0 120 100" role="img" aria-label="Rakhine coastal scene">
      <defs>
        <linearGradient id="rakhineOcean" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5D6D7E" />
          <stop offset="100%" stopColor="#3D4D5E" />
        </linearGradient>
      </defs>
      <rect x="0" y="50" width="120" height="50" fill="url(#rakhineOcean)" />
      <path d="M0 50 Q30 45 60 50 Q90 55 120 50" fill="#4A6741" opacity="0.6" />
      <circle cx="95" cy="20" r="12" fill="#DAA520" opacity="0.8" />
      <path d="M25 35 L30 20 L35 35 Z" fill="#6D4C41" />
      <ellipse cx="60" cy="75" rx="25" ry="8" fill="#4E342E" />
      <ellipse cx="60" cy="73" rx="20" ry="5" fill="#6D4C41" />
    </svg>
  );
}

function DeltaRiverSVG() {
  return (
    <svg viewBox="0 0 120 100" role="img" aria-label="Delta river scene">
      <defs>
        <linearGradient id="deltaRiver" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5D6D7E" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#5D6D7E" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#5D6D7E" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="120" height="100" fill="#4A3728" opacity="0.3" />
      <path d="M0 30 Q30 40 60 35 Q90 30 120 40 L120 70 Q90 60 60 65 Q30 70 0 60 Z" fill="url(#deltaRiver)" />
      <path d="M20 25 Q25 10 30 25" fill="#4A6741" />
      <path d="M35 25 Q40 5 45 25" fill="#3D5635" />
      <path d="M85 25 Q90 8 95 25" fill="#4A6741" />
      <ellipse cx="60" cy="85" rx="20" ry="6" fill="#5D4037" />
      <ellipse cx="60" cy="83" rx="15" ry="4" fill="#6D4C41" />
    </svg>
  );
}

function ShanHighlandSVG() {
  return (
    <svg viewBox="0 0 120 100" role="img" aria-label="Shan highland scene">
      <path d="M0 60 L25 25 L50 50 L75 15 L100 45 L120 30 L120 100 L0 100 Z" fill="#6D4C41" />
      <path d="M0 70 L120 70 L120 100 L0 100 Z" fill="#5D4037" opacity="0.5" />
      <ellipse cx="60" cy="80" rx="18" ry="5" fill="#4E342E" />
      <ellipse cx="60" cy="78" rx="14" ry="3" fill="#6D4C41" />
      <circle cx="25" cy="20" r="8" fill="#DAA520" opacity="0.5" />
      <path d="M75 40 Q80 35 85 40 Q82 50 78 50 Q75 50 75 40 Z" fill="#4A6741" opacity="0.7" />
    </svg>
  );
}

function TanintharyiCoastSVG() {
  return (
    <svg viewBox="0 0 120 100" role="img" aria-label="Tanintharyi tropical coast">
      <rect x="0" y="60" width="120" height="40" fill="#5D6D7E" />
      <path d="M0 60 Q40 55 80 60 Q100 65 120 60" fill="#4A6741" opacity="0.4" />
      <g transform="translate(20, 20)">
        <path d="M10 45 Q10 30 15 25 Q20 30 20 45" fill="#4A6741" />
        <path d="M5 40 Q10 35 8 28 Q5 32 5 40" fill="#3D5635" />
        <path d="M25 38 Q20 32 22 26 Q27 30 25 38" fill="#3D5635" />
        <rect x="13" y="45" width="4" height="15" fill="#6D4C41" />
      </g>
      <g transform="translate(75, 25)">
        <path d="M10 40 Q10 28 15 22 Q20 28 20 40" fill="#4A6741" />
        <rect x="13" y="40" width="4" height="12" fill="#6D4C41" />
      </g>
      <circle cx="100" cy="18" r="10" fill="#DAA520" />
      <ellipse cx="55" cy="85" rx="16" ry="5" fill="#4E342E" />
    </svg>
  );
}

// Closing Bowl Illustration
function ClosingBowlSVG() {
  return (
    <svg 
      viewBox="0 0 200 150" 
      role="img" 
      aria-labelledby="bowl-title bowl-desc"
    >
      <title id="bowl-title">Bowl of Ngapi-Flavored Dish</title>
      <desc id="bowl-desc">A traditional bowl containing food seasoned with ngapi, representing the ingredient&apos;s essential role in Burmese cuisine</desc>
      
      <defs>
        <linearGradient id="bowlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C75B39" />
          <stop offset="100%" stopColor="#A04A2E" />
        </linearGradient>
        <radialGradient id="foodGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#8D6E63" />
          <stop offset="100%" stopColor="#5D4037" />
        </radialGradient>
      </defs>
      
      {/* Bowl */}
      <ellipse cx="100" cy="110" rx="70" ry="20" fill="#A04A2E" />
      <path 
        d="M30 90 Q20 100 30 115 Q50 130 100 130 Q150 130 170 115 Q180 100 170 90 Q150 75 100 75 Q50 75 30 90 Z" 
        fill="url(#bowlGrad)"
      />
      <ellipse cx="100" cy="85" rx="60" ry="15" fill="#5D4037" />
      
      {/* Food in bowl */}
      <ellipse cx="100" cy="82" rx="52" ry="12" fill="url(#foodGrad)" />
      
      {/* Garnish details */}
      <ellipse cx="85" cy="80" rx="8" ry="3" fill="#4A6741" opacity="0.7" />
      <ellipse cx="115" cy="78" rx="6" ry="2" fill="#4A6741" opacity="0.6" />
      <circle cx="95" cy="76" r="3" fill="#C75B39" opacity="0.5" />
      
      {/* Steam */}
      <g className="vapor-rise" style={{ ['--vapor-delay' as string]: '0s' }} opacity="0.5">
        <path d="M85 60 Q80 45 88 30" stroke="rgba(245, 240, 225, 0.5)" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <g className="vapor-rise" style={{ ['--vapor-delay' as string]: '0.6s' }} opacity="0.4">
        <path d="M100 55 Q105 40 98 25" stroke="rgba(245, 240, 225, 0.4)" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <g className="vapor-rise" style={{ ['--vapor-delay' as string]: '1.2s' }} opacity="0.45">
        <path d="M115 58 Q120 42 112 28" stroke="rgba(245, 240, 225, 0.45)" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// ============================================
// SECTION COMPONENT
// ============================================

function Section({ 
  id, 
  className = '', 
  children 
}: { 
  id: string; 
  className?: string; 
  children: React.ReactNode;
}) {
  const { ref, isVisible } = useIntersectionObserver(0.12);
  
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id={id}
      className={`soul-section ${className} ${isVisible ? 'visible' : ''}`}
    >
      {children}
    </section>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function NgapiFermentedSoulClient() {
  const progress = useScrollProgress();
  
  return (
    <div className="ngapi-soul">
      {/* Progress Bar */}
      <div className="scroll-progress-bar">
        <div 
          className="scroll-progress-fill" 
          style={{ transform: `scaleX(${progress})` }} 
        />
      </div>
      
      {/* ==================== HERO ==================== */}
      <Section id="hero" className="hero full-height">
        <div className="hero-atmosphere">
          <div className="hero-glow" />
          <div className="hero-steam">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="steam-wisp"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  ['--steam-delay' as string]: `${Math.random() * 3}s`,
                  ['--steam-duration' as string]: `${3.5 + Math.random() * 2}s`,
                  ['--steam-drift' as string]: `${-40 + Math.random() * 80}px`,
                }}
              />
            ))}
          </div>
        </div>
        
        <span className="hero-eyebrow">Myanmar Culinary Heritage</span>
        <h1 className="hero-title"><em>Ngapi</em></h1>
        <p className="hero-tagline">
          Why did Myanmar become the land of fermented fish?<br />
          The answer lies in rivers, monsoons, and ancient wisdom.
        </p>
        
        <div className="hero-illustration">
          <HeroClayPotSVG />
        </div>
        
        <div className="scroll-hint">
          <span className="scroll-hint-text">Discover the story</span>
          <div className="scroll-hint-arrow" />
        </div>
      </Section>

      {/* ==================== THE GEOGRAPHY ==================== */}
      <Section id="geography" className="geography-section">
        <div className="section-content reveal-up">
          <h4>The Setting</h4>
          <h2>A Land Shaped by Water</h2>
          <p className="lead-paragraph">
            Myanmar sits at the crossroads of monsoon Asia, where the great <span className="highlight">Irrawaddy River</span> descends 
            from the Himalayas to meet the Bay of Bengal. This geography created the perfect conditions 
            for a food preservation revolution.
          </p>
        </div>
        
        <div className="illustration-container reveal-scale">
          <MyanmarMapSVG />
        </div>
        
        <div className="section-content reveal-up">
          <p>
            Three great rivers — the Irrawaddy, Chindwin, and Sittang — carve through the land, 
            delivering annual floods that deposit rich sediments across vast deltas. These waters 
            teemed with fish: <span className="accent-text">hundreds of species</span>, from the tiny ngagyin 
            to the massive nga-myin.
          </p>
          <p>
            But in a land without refrigeration, this abundance presented a paradox. 
            <strong> How do you preserve a blessing that spoils within hours?</strong>
          </p>
        </div>
      </Section>

      {/* ==================== THE RIVERS ==================== */}
      <Section id="rivers">
        <div className="section-content reveal-up">
          <h4>The Abundance</h4>
          <h2>Rivers That Fed a Civilization</h2>
          <p className="lead-paragraph">
            Every year, as monsoon waters recede, the rivers reveal their gifts. 
            Fish congregate in shrinking pools, making harvest almost effortless. 
            For ancient communities, this was both bounty and burden.
          </p>
        </div>
        
        <div className="illustration-container large reveal-scale">
          <RiverAbundanceSVG />
        </div>
        
        <div className="section-content reveal-up">
          <p>
            Archaeological evidence suggests that fishing communities thrived along these 
            waterways for at least <span className="accent-text">4,000 years</span>. Stone net-weights, 
            fish bones, and early pottery fragments tell a story of people intimately 
            connected to the river&apos;s rhythms.
          </p>
          <p>
            But the same warm waters that nurtured fish also hastened their decay. 
            In tropical heat, a fresh catch becomes inedible within hours. The solution 
            would require understanding something invisible: <em>fermentation</em>.
          </p>
        </div>
      </Section>

      {/* ==================== THE MONSOON PROBLEM ==================== */}
      <Section id="monsoon">
        <div className="section-content reveal-up">
          <h4>The Challenge</h4>
          <h2>The Monsoon&apos;s Double Edge</h2>
          <p className="lead-paragraph">
            From May to October, monsoon rains drench Myanmar. Humidity hovers near 100%. 
            <span className="highlight">Bacteria thrive</span>. Food spoils faster than anywhere 
            on earth. This was the crucible that forged ngapi.
          </p>
        </div>
        
        <div className="illustration-container large reveal-scale">
          <MonsoonCloudsSVG />
        </div>
        
        <div className="section-content reveal-up">
          <p>
            Yet the same conditions that threatened preservation also enabled it. 
            High humidity prevented fish from drying too quickly. Consistent warmth 
            accelerated fermentation. The monsoon wasn&apos;t just a problem — it was 
            <strong> part of the solution</strong>.
          </p>
          <p>
            What ancient Myanmar needed was a way to harness controlled decay: 
            to let certain bacteria transform fish while blocking those that caused rot. 
            The key was <span className="accent-text">salt</span>.
          </p>
        </div>
      </Section>

      {/* ==================== SALT & SUN ==================== */}
      <Section id="preservation">
        <div className="section-content reveal-up">
          <h4>The Discovery</h4>
          <h2>Salt, Sun, and Time</h2>
          <p className="lead-paragraph">
            The breakthrough was devastatingly simple: <span className="highlight">mix fish with salt</span>, 
            seal it away from air, and wait. The salt draws out moisture while creating 
            an environment where only beneficial bacteria survive.
          </p>
        </div>
        
        <div className="illustration-container reveal-scale">
          <SunDryingSVG />
        </div>
        
        <div className="section-content reveal-up">
          <p>
            Coastal communities had access to abundant sea salt. Inland villages developed 
            techniques to extract salt from mineral deposits. The ratio — roughly 
            <span className="accent-text">30% salt to 70% fish</span> — became the formula 
            passed through generations.
          </p>
          <p>
            After initial fermentation in clay pots, the paste would be spread on bamboo mats 
            under the tropical sun. Days of drying concentrated the flavors, creating the 
            intense umami that defines ngapi today.
          </p>
        </div>
      </Section>

      {/* ==================== THE ANCIENT MASTERS ==================== */}
      <Section id="mon">
        <div className="section-content reveal-up">
          <h4>The Pioneers</h4>
          <h2>Mon Civilization: Masters of the Coast</h2>
          <p className="lead-paragraph">
            The <span className="highlight">Mon people</span> were among the first to perfect 
            coastal ngapi production. Their civilization, flourishing from the 
            9th century BCE, commanded the coastlines from Rakhine to Tanintharyi.
          </p>
          <p>
            With direct access to both ocean fish and sea salt, Mon artisans developed 
            techniques that produced intensely flavored pastes. Their methods spread 
            through maritime trade routes, influencing fermentation practices across 
            Southeast Asia.
          </p>
          <p>
            Today, <span className="accent-text">Rakhine ngapi</span> — the direct descendant 
            of Mon traditions — is considered by many to be the finest expression of 
            the craft. Its bold, oceanic character reflects millennia of coastal expertise.
          </p>
        </div>
      </Section>

      {/* ==================== THE FERMENTATION ==================== */}
      <Section id="fermentation">
        <div className="section-content reveal-up">
          <h4>The Transformation</h4>
          <h2>Inside the Clay Pot</h2>
          <p className="lead-paragraph">
            Fermentation is not decay — it&apos;s <span className="highlight">controlled transformation</span>. 
            Within the sealed clay pot, enzymes break fish proteins into amino acids, 
            including glutamates: the molecules responsible for umami.
          </p>
        </div>
        
        <div className="illustration-container reveal-scale">
          <FermentationCrossSectionSVG />
        </div>
        
        <div className="section-content reveal-up">
          <p>
            The process takes weeks to months. Fresh fish and salt form the top layer. 
            As fermentation proceeds, brine collects in the middle. The oldest, most 
            transformed paste sinks to the bottom — the most prized portion.
          </p>
          <p>
            Clay pots are essential. Their porous walls allow subtle oxygen exchange 
            while maintaining the anaerobic conditions fermentation requires. 
            <span className="accent-text">Metal containers produce inferior results</span> — 
            a fact ancient potters understood intuitively.
          </p>
        </div>
      </Section>

      {/* ==================== QUOTE ==================== */}
      <Section id="quote" className="quote-section">
        <blockquote className="reveal-up">
          <span className="quote-mark">&ldquo;</span>
          <p className="quote-text">
            To cook without ngapi is to paint without color. 
            It is the invisible thread that holds every dish together.
          </p>
          <cite className="quote-attribution">— Traditional Burmese saying</cite>
        </blockquote>
      </Section>

      {/* ==================== RIVER KINGDOMS ==================== */}
      <Section id="pyu">
        <div className="section-content reveal-up">
          <h4>The Inland Tradition</h4>
          <h2>Pyu Cities: Freshwater Innovation</h2>
          <p className="lead-paragraph">
            While the Mon mastered coastal fermentation, the <span className="highlight">Pyu city-states</span> — 
            Sri Ksetra, Beikthano, Halin — developed distinct freshwater traditions 
            along the Irrawaddy from the 2nd century BCE.
          </p>
          <p>
            Without access to sea salt, Pyu artisans sourced salt from inland mineral 
            deposits. Their ngapi used freshwater species — milder in flavor, sweeter 
            in character. This style would become the backbone of central Myanmar cuisine.
          </p>
          <p>
            Archaeological excavations reveal clay storage vessels remarkably similar 
            to those still used today. The technology was refined over <span className="accent-text">2,000 years</span>, 
            yet the essential process remains unchanged.
          </p>
        </div>
      </Section>

      {/* ==================== CULTURAL SYNTHESIS ==================== */}
      <Section id="bamar">
        <div className="section-content reveal-up">
          <h4>The Unification</h4>
          <h2>Bamar Kingdoms: A Nation&apos;s Ingredient</h2>
          <p className="lead-paragraph">
            As Bamar kingdoms rose — <span className="highlight">Pagan, Ava, Taungoo, Konbaung</span> — 
            they unified the diverse ngapi traditions of coast and river into a 
            national culinary identity.
          </p>
          <p>
            Trade routes connected Rakhine fishermen to Shan mountain villages, 
            delta producers to royal courts. Ngapi became both common staple and 
            royal delicacy. Every kitchen, from palace to paddy-side hut, 
            kept a clay pot fermenting.
          </p>
          <p>
            By the height of the Konbaung Dynasty (1752-1885), ngapi was inseparable 
            from Burmese identity. It appeared in elaborate court dishes and simple 
            village meals alike — <span className="accent-text">the one constant across class and region</span>.
          </p>
        </div>
      </Section>

      {/* ==================== REGIONAL EXPRESSIONS ==================== */}
      <Section id="regional">
        <div className="section-content wide reveal-up">
          <h4>The Diversity</h4>
          <h2>Four Traditions, One Soul</h2>
          <p className="lead-paragraph" style={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
            Each region of Myanmar developed its own ngapi character, shaped by 
            local fish, local salt, and local taste. Together they form a 
            <span className="highlight"> tapestry of fermented flavor</span>.
          </p>
          
          <div className="regional-grid stagger-children">
            <div className="regional-card">
              <div className="regional-card-illustration">
                <RakhineCoastSVG />
              </div>
              <div className="regional-card-content">
                <h3 className="regional-card-title">Rakhine Ngapi</h3>
                <span className="regional-card-location">Rakhine State • Coastal</span>
                <p className="regional-card-description">
                  Considered the finest. Made from saltwater fish with intense oceanic 
                  depth. Bold, pungent, and prized across Myanmar.
                </p>
              </div>
            </div>
            
            <div className="regional-card">
              <div className="regional-card-illustration">
                <DeltaRiverSVG />
              </div>
              <div className="regional-card-content">
                <h3 className="regional-card-title">Delta Ngapi</h3>
                <span className="regional-card-location">Irrawaddy Delta • Riverine</span>
                <p className="regional-card-description">
                  The most common variety. Freshwater fish produce a milder, sweeter 
                  paste. The workhorse of everyday Burmese cooking.
                </p>
              </div>
            </div>
            
            <div className="regional-card">
              <div className="regional-card-illustration">
                <ShanHighlandSVG />
              </div>
              <div className="regional-card-content">
                <h3 className="regional-card-title">Shan Fermented Fish</h3>
                <span className="regional-card-location">Shan State • Highland</span>
                <p className="regional-card-description">
                  Mountain streams provide unique species. Often mixed with rice 
                  powder for a distinct highland character.
                </p>
              </div>
            </div>
            
            <div className="regional-card">
              <div className="regional-card-illustration">
                <TanintharyiCoastSVG />
              </div>
              <div className="regional-card-content">
                <h3 className="regional-card-title">Tanintharyi Ngapi</h3>
                <span className="regional-card-location">Tanintharyi • Tropical Coast</span>
                <p className="regional-card-description">
                  Tropical coastal variety with Thai-Malay influences. Often includes 
                  shrimp, creating unique flavor profiles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ==================== WHY IT MATTERS ==================== */}
      <Section id="significance">
        <div className="section-content reveal-up">
          <h4>The Significance</h4>
          <h2>More Than Seasoning</h2>
          <p className="lead-paragraph">
            Ngapi isn&apos;t merely a condiment. It is <span className="highlight">concentrated nutrition</span>, 
            <span className="highlight">preserved abundance</span>, and <span className="highlight">culinary architecture</span> — 
            all in one humble paste.
          </p>
          <p>
            <strong>Nutritionally</strong>, ngapi provides essential proteins and amino acids 
            in a rice-based diet. A small amount delivers concentrated nourishment — 
            vital in regions where fresh fish couldn&apos;t always reach.
          </p>
          <p>
            <strong>Practically</strong>, ngapi solved the storage problem. A year&apos;s worth 
            of protein could be preserved in a single clay pot, surviving monsoons 
            and dry seasons alike.
          </p>
          <p>
            <strong>Culinarily</strong>, ngapi is the umami foundation upon which 
            Burmese cuisine is built. It provides the &quot;fifth taste&quot; that makes 
            simple ingredients <span className="accent-text">sing with depth</span>.
          </p>
        </div>
      </Section>

      {/* ==================== CLOSING ==================== */}
      <Section id="closing" className="closing-section">
        <div className="closing-illustration reveal-scale">
          <ClosingBowlSVG />
        </div>
        
        <h2 className="closing-title reveal-up">
          History you can taste.
        </h2>
        
        <p className="closing-message reveal-up">
          Every jar of ngapi contains millennia of innovation — the accumulated 
          wisdom of river communities, coastal traders, and royal kitchens. 
          From prehistoric preservation to modern Burmese tables, the journey 
          of ngapi mirrors the journey of Myanmar itself: resilient, complex, 
          and profoundly <em>flavorful</em>.
        </p>
      </Section>

      {/* ==================== SOURCES ==================== */}
      <section className="sources-section">
        <div className="sources-content">
          <h3 className="sources-title">Sources & Further Reading</h3>
          <ul className="sources-list">
            <li>
              <a href="https://www.fao.org/3/x0560e/x0560e00.htm" target="_blank" rel="noopener noreferrer">
                Fermented Fish Products — FAO Corporate Document Repository
              </a>
            </li>
            <li>
              <a href="https://www.penn.museum/sites/expedition/food-culture-in-southeast-asia/" target="_blank" rel="noopener noreferrer">
                Food Culture in Southeast Asia — Penn Museum
              </a>
            </li>
            <li>
              <a href="https://journalofethnicfoods.biomedcentral.com/" target="_blank" rel="noopener noreferrer">
                Journal of Ethnic Foods — Fermentation in Southeast Asia
              </a>
            </li>
            <li>
              <a href="https://global.oup.com/academic/product/the-oxford-companion-to-food-9780192806819" target="_blank" rel="noopener noreferrer">
                The Oxford Companion to Food — Alan Davidson
              </a>
            </li>
            <li>
              <a href="https://folklife.si.edu/" target="_blank" rel="noopener noreferrer">
                Smithsonian Center for Folklife and Cultural Heritage
              </a>
            </li>
            <li>
              <a href="https://www.britannica.com/place/Myanmar" target="_blank" rel="noopener noreferrer">
                Myanmar — Encyclopædia Britannica
              </a>
            </li>
          </ul>
          <p className="sources-note">
            This narrative draws from ethnographic research, archaeological evidence, 
            and culinary scholarship on Southeast Asian fermented foods. 
            Cultural practices described reflect documented historical traditions.
          </p>
        </div>
      </section>
    </div>
  );
}

