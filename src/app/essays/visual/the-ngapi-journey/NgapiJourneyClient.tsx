"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './the-ngapi-journey.css';

/*
 * THE NGAPI JOURNEY - History & Evolution of Fish Paste in Myanmar
 * 
 * Design Research Report:
 * 
 * Visual Archaeology:
 * - Traditional Myanmar fermentation: clay pots, bamboo, earthenware
 * - Coastal/river landscapes: Irrawaddy Delta, Rakhine coast
 * - Ancient Mon and Pyu pottery aesthetics
 * - Sun-drying processes, salt crystallization
 * 
 * Color Palette (Material-Derived):
 * - Terracotta (#C75B39) — fermentation vessels
 * - Fish Oil Gold (#C99A53) — aged ngapi surface
 * - River Brown (#5D4037) — Irrawaddy sediment
 * - Salt Crystal (#F5F0E6) — preservation element
 * - Sun-Dried Amber (#D4A574) — outdoor drying
 * - Delta Green (#546E7A) — river waters
 * 
 * UNIQUE MECHANICS:
 * ✅ Fermentation Timeline Slider — drag through stages
 * ✅ Flavor Spectrum Dial — explore taste dimensions
 * ✅ Clay Pot Progress Meter — fills as you scroll
 * ✅ Regional Map with animated routes
 * ✅ Steam particle system
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

interface Ingredient {
  id: string;
  name: string;
  origin: string;
  role: string;
  tastingNotes: string;
  icon: React.ReactNode;
  color: string;
}

interface FermentationStage {
  id: string;
  name: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
}

interface FlavorNote {
  id: string;
  name: string;
  description: string;
  angle: number;
  color: string;
}

interface RegionalVariant {
  id: string;
  name: string;
  location: string;
  description: string;
  traits: string[];
  icon: React.ReactNode;
}

// ============================================
// FERMENTATION STAGES DATA
// ============================================

const FERMENTATION_STAGES: FermentationStage[] = [
  {
    id: 'fresh',
    name: 'Fresh Fish',
    description: 'Small fish like ngagyin are cleaned and prepared. In coastal areas, they catch fish at dawn.',
    duration: 'Day 1',
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-label="Fresh fish">
        <title>Fresh Fish</title>
        <ellipse cx="24" cy="24" rx="16" ry="8" fill="#546E7A" />
        <path d="M40 24 L48 18 L48 30 Z" fill="#546E7A" />
        <circle cx="12" cy="22" r="2" fill="#1a1410" />
        <path d="M18 24 Q24 20 30 24 Q24 28 18 24" fill="#37474F" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'salted',
    name: 'Salted & Mixed',
    description: 'Fish is layered with sea salt (about 30% ratio). Traditional methods use sun-dried sea salt.',
    duration: 'Day 1-3',
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-label="Salting process">
        <title>Salting Process</title>
        <rect x="8" y="20" width="32" height="20" rx="2" fill="#8D6E63" />
        <ellipse cx="24" cy="20" rx="16" ry="4" fill="#A1887F" />
        <circle cx="16" cy="28" r="2" fill="#F5F0E6" opacity="0.8" />
        <circle cx="24" cy="32" r="1.5" fill="#F5F0E6" opacity="0.6" />
        <circle cx="30" cy="26" r="2" fill="#F5F0E6" opacity="0.7" />
        <circle cx="20" cy="34" r="1" fill="#F5F0E6" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'fermenting',
    name: 'Fermentation',
    description: 'Sealed in clay pots, bacteria break down proteins creating glutamates — the source of umami.',
    duration: '2-8 weeks',
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-label="Clay pot fermentation">
        <title>Fermentation</title>
        <path d="M12 18 Q8 24 10 36 Q12 42 24 42 Q36 42 38 36 Q40 24 36 18 Z" fill="#C75B39" />
        <ellipse cx="24" cy="18" rx="12" ry="4" fill="#A04A2E" />
        <ellipse cx="24" cy="18" rx="8" ry="2" fill="#5D4037" />
        {/* Bubbles */}
        <circle cx="20" cy="28" r="2" fill="#F5F0E6" opacity="0.3" />
        <circle cx="26" cy="32" r="1.5" fill="#F5F0E6" opacity="0.2" />
        <circle cx="22" cy="36" r="1" fill="#F5F0E6" opacity="0.25" />
      </svg>
    ),
  },
  {
    id: 'aging',
    name: 'Aging & Drying',
    description: 'The paste is sun-dried to concentrate flavors. Premium ngapi ages for months or years.',
    duration: '1-12 months',
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-label="Sun drying">
        <title>Aging & Drying</title>
        {/* Sun rays */}
        <circle cx="24" cy="12" r="6" fill="#D4A574" />
        <path d="M24 2 L24 6 M24 18 L24 22 M14 12 L18 12 M30 12 L34 12" stroke="#D4A574" strokeWidth="2" />
        <path d="M17 5 L19 8 M31 5 L29 8 M17 19 L19 16 M31 19 L29 16" stroke="#D4A574" strokeWidth="1.5" />
        {/* Drying mat with paste */}
        <rect x="8" y="30" width="32" height="4" rx="1" fill="#8D6E63" />
        <ellipse cx="24" cy="30" rx="12" ry="3" fill="#5D4037" />
      </svg>
    ),
  },
  {
    id: 'finished',
    name: 'Finished Ngapi',
    description: 'Deep brown paste with complex umami. Each region\'s ngapi has unique character.',
    duration: 'Ready',
    icon: (
      <svg viewBox="0 0 48 48" role="img" aria-label="Finished ngapi">
        <title>Finished Ngapi</title>
        <ellipse cx="24" cy="32" rx="14" ry="8" fill="#5D4037" />
        <ellipse cx="24" cy="28" rx="14" ry="8" fill="#6D4C41" />
        <ellipse cx="24" cy="28" rx="10" ry="5" fill="#8D6E63" />
        {/* Surface oil sheen */}
        <ellipse cx="20" cy="26" rx="3" ry="1.5" fill="#C99A53" opacity="0.4" />
        <ellipse cx="28" cy="30" rx="2" ry="1" fill="#C99A53" opacity="0.3" />
      </svg>
    ),
  },
];

// ============================================
// FLAVOR NOTES DATA
// ============================================

const FLAVOR_NOTES: FlavorNote[] = [
  { id: 'earthy', name: 'Earthy', description: 'Deep mineral notes from river sediment and clay pots', angle: 0, color: '#5D4037' },
  { id: 'umami', name: 'Umami', description: 'Intense savory depth from glutamate-rich fermentation', angle: 72, color: '#C75B39' },
  { id: 'salty', name: 'Salty', description: 'Sea salt crystals preserved in the paste', angle: 144, color: '#C99A53' },
  { id: 'pungent', name: 'Pungent', description: 'Sharp fermented aromatics that mellow with cooking', angle: 216, color: '#D4A574' },
  { id: 'savory', name: 'Savory Depth', description: 'Complex layers that build over months of aging', angle: 288, color: '#8D6E63' },
];

// ============================================
// REGIONAL VARIANTS DATA
// ============================================

const REGIONAL_VARIANTS: RegionalVariant[] = [
  {
    id: 'rakhine',
    name: 'Rakhine Ngapi',
    location: 'Rakhine State (Coastal)',
    description: 'Considered the finest in Myanmar. Made from saltwater fish with intense oceanic depth. The Rakhine people have perfected coastal fermentation over millennia.',
    traits: ['Saltwater fish', 'Strong umami', 'Coastal tradition'],
    icon: (
      <svg viewBox="0 0 64 64" role="img" aria-label="Rakhine coastal scene">
        <title>Rakhine Ngapi</title>
        <rect x="0" y="40" width="64" height="24" fill="#546E7A" />
        <path d="M0 40 Q16 35 32 40 Q48 45 64 40 L64 50 Q48 55 32 50 Q16 45 0 50 Z" fill="#37474F" />
        <circle cx="50" cy="15" r="8" fill="#D4A574" opacity="0.8" />
        <path d="M20 25 L24 15 L28 25 Z" fill="#8D6E63" />
        <ellipse cx="32" cy="50" rx="8" ry="4" fill="#5D4037" />
      </svg>
    ),
  },
  {
    id: 'delta',
    name: 'Delta Ngapi',
    location: 'Irrawaddy Delta',
    description: 'Made from freshwater fish abundant in the delta. Milder and sweeter than coastal varieties. The backbone of central Myanmar cooking.',
    traits: ['Freshwater fish', 'Milder flavor', 'Most common'],
    icon: (
      <svg viewBox="0 0 64 64" role="img" aria-label="Delta river scene">
        <title>Delta Ngapi</title>
        <rect x="0" y="35" width="64" height="29" fill="#546E7A" opacity="0.6" />
        <path d="M0 35 Q20 30 32 35 Q44 40 64 35" stroke="#8D6E63" strokeWidth="3" fill="none" />
        <rect x="24" y="20" width="16" height="20" rx="2" fill="#C75B39" />
        <ellipse cx="32" cy="20" rx="8" ry="3" fill="#A04A2E" />
        <path d="M10 45 L14 42 L18 45 L22 42" stroke="#5D4037" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    id: 'shan',
    name: 'Shan Fermented Fish',
    location: 'Shan State (Highland)',
    description: 'Mountain streams provide unique freshwater species. Often mixed with rice powder. Distinct from lowland traditions.',
    traits: ['Mountain fish', 'Rice addition', 'Highland style'],
    icon: (
      <svg viewBox="0 0 64 64" role="img" aria-label="Shan mountain scene">
        <title>Shan Fermented Fish</title>
        <path d="M0 50 L20 25 L35 40 L50 20 L64 45 L64 64 L0 64 Z" fill="#8D6E63" />
        <path d="M0 55 L64 55 L64 64 L0 64 Z" fill="#546E7A" opacity="0.4" />
        <ellipse cx="32" cy="52" rx="10" ry="5" fill="#6D4C41" />
        <circle cx="20" cy="15" r="4" fill="#D4A574" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: 'tanintharyi',
    name: 'Tanintharyi Ngapi',
    location: 'Tanintharyi Region (Deep South)',
    description: 'Tropical coastal variety with distinct techniques influenced by Thai-Malay traditions. Often includes shrimp paste elements.',
    traits: ['Tropical coast', 'Shrimp blend', 'Thai influence'],
    icon: (
      <svg viewBox="0 0 64 64" role="img" aria-label="Tanintharyi tropical scene">
        <title>Tanintharyi Ngapi</title>
        <rect x="0" y="45" width="64" height="19" fill="#546E7A" />
        <path d="M15 45 Q15 30 20 25 Q25 30 25 45" fill="#7CB342" />
        <path d="M40 45 Q40 35 45 30 Q50 35 50 45" fill="#8BC34A" />
        <circle cx="55" cy="12" r="6" fill="#D4A574" />
        <ellipse cx="32" cy="55" rx="8" ry="4" fill="#5D4037" />
        <path d="M28 52 Q32 48 36 52" stroke="#C99A53" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
];

// ============================================
// INGREDIENT DATA
// ============================================

const INGREDIENTS: Record<string, Ingredient> = {
  ngagyin: {
    id: 'ngagyin',
    name: 'Ngagyin Fish',
    origin: 'Irrawaddy River',
    role: 'The primary fish species for delta ngapi. Small, abundant, and rich in proteins that break down into umami compounds.',
    tastingNotes: 'Clean, delicate flesh that transforms into complex savory paste after fermentation.',
    icon: (
      <svg viewBox="0 0 40 40" role="img" aria-label="Ngagyin fish">
        <title>Ngagyin Fish</title>
        <ellipse cx="20" cy="20" rx="14" ry="6" fill="#546E7A" />
        <path d="M34 20 L40 14 L40 26 Z" fill="#546E7A" />
        <circle cx="10" cy="18" r="2" fill="#1a1410" />
        <path d="M14 20 Q20 16 26 20" fill="#37474F" opacity="0.5" />
        <path d="M20 14 L22 10 L24 14" fill="#546E7A" opacity="0.8" />
      </svg>
    ),
    color: '#546E7A',
  },
  seaSalt: {
    id: 'seaSalt',
    name: 'Sea Salt',
    origin: 'Rakhine Coast',
    role: 'Essential preservative that prevents spoilage and creates the environment for beneficial fermentation.',
    tastingNotes: 'Mineral-rich coastal salt with subtle brininess that intensifies during aging.',
    icon: (
      <svg viewBox="0 0 40 40" role="img" aria-label="Sea salt crystals">
        <title>Sea Salt</title>
        <rect x="12" y="18" width="8" height="8" fill="#F5F0E6" transform="rotate(15 16 22)" />
        <rect x="20" y="16" width="6" height="6" fill="#E0D6C8" transform="rotate(-10 23 19)" />
        <rect x="16" y="24" width="10" height="10" fill="#F5F0E6" opacity="0.9" transform="rotate(5 21 29)" />
        <rect x="24" y="22" width="5" height="5" fill="#D4C4A8" transform="rotate(20 26 24)" />
      </svg>
    ),
    color: '#F5F0E6',
  },
  clayPot: {
    id: 'clayPot',
    name: 'Clay Pot (Ohn)',
    origin: 'Throughout Myanmar',
    role: 'Traditional fermentation vessel. Porous clay allows subtle oxygen exchange while maintaining anaerobic conditions.',
    tastingNotes: 'Imparts earthy, mineral undertones to the final paste that metal containers cannot replicate.',
    icon: (
      <svg viewBox="0 0 40 40" role="img" aria-label="Clay fermentation pot">
        <title>Clay Pot</title>
        <path d="M10 14 Q6 20 8 32 Q10 38 20 38 Q30 38 32 32 Q34 20 30 14 Z" fill="#C75B39" />
        <ellipse cx="20" cy="14" rx="10" ry="4" fill="#A04A2E" />
        <ellipse cx="20" cy="14" rx="6" ry="2" fill="#5D4037" />
        <ellipse cx="20" cy="30" rx="6" ry="2" fill="#8D6E63" opacity="0.5" />
      </svg>
    ),
    color: '#C75B39',
  },
  riceBran: {
    id: 'riceBran',
    name: 'Rice Bran',
    origin: 'Myanmar Rice Paddies',
    role: 'Added in some regional varieties to speed fermentation and add subtle sweetness.',
    tastingNotes: 'Contributes nutty undertones and helps create a smoother, less pungent paste.',
    icon: (
      <svg viewBox="0 0 40 40" role="img" aria-label="Rice bran">
        <title>Rice Bran</title>
        <ellipse cx="20" cy="24" rx="12" ry="6" fill="#D4A574" />
        <ellipse cx="20" cy="22" rx="12" ry="6" fill="#E0B87A" />
        {/* Rice grain pattern */}
        <ellipse cx="16" cy="22" rx="2" ry="4" fill="#F5F0E6" opacity="0.5" transform="rotate(-15 16 22)" />
        <ellipse cx="22" cy="21" rx="2" ry="3" fill="#F5F0E6" opacity="0.4" transform="rotate(10 22 21)" />
        <ellipse cx="26" cy="23" rx="1.5" ry="3" fill="#F5F0E6" opacity="0.3" transform="rotate(-5 26 23)" />
      </svg>
    ),
    color: '#D4A574',
  },
};

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

function useIntersectionObserver(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasAnimated) setHasAnimated(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '-5% 0px -10% 0px' }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, hasAnimated]);
  
  return { ref, isVisible, hasAnimated };
}

// ============================================
// COMPONENTS
// ============================================

// Clay Pot Progress Meter
function ClayPotProgress({ progress }: { progress: number }) {
  const fillHeight = 24 * progress;
  
  return (
    <div className="clay-pot-progress">
      <svg 
        viewBox="0 0 48 48" 
        className="clay-pot-svg"
        role="img"
        aria-label={`Reading progress: ${Math.round(progress * 100)}%`}
      >
        <title>Reading Progress</title>
        <desc>A clay fermentation pot filling with ngapi as you scroll through the story</desc>
        {/* Pot outline */}
        <path 
          d="M10 14 Q6 20 8 36 Q10 42 24 42 Q38 42 40 36 Q42 20 38 14 Z" 
          fill="#3d3530" 
          stroke="#C75B39" 
          strokeWidth="2"
        />
        {/* Fill level - clips to pot shape */}
        <defs>
          <clipPath id="potClip">
            <path d="M10 14 Q6 20 8 36 Q10 42 24 42 Q38 42 40 36 Q42 20 38 14 Z" />
          </clipPath>
        </defs>
        <rect 
          x="6" 
          y={42 - fillHeight} 
          width="36" 
          height={fillHeight} 
          fill="url(#ngapiFill)"
          clipPath="url(#potClip)"
        />
        <defs>
          <linearGradient id="ngapiFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8D6E63" />
            <stop offset="100%" stopColor="#5D4037" />
          </linearGradient>
        </defs>
        {/* Pot rim */}
        <ellipse cx="24" cy="14" rx="14" ry="5" fill="#A04A2E" />
        <ellipse cx="24" cy="14" rx="10" ry="3" fill="#5D4037" />
      </svg>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>
      <span className="progress-label">{Math.round(progress * 100)}%</span>
    </div>
  );
}

// Steam Particle System
function SteamParticles({ intensity = 1 }: { intensity?: number }) {
  return (
    <div className="steam-container" style={{ opacity: intensity }}>
      {Array.from({ length: 15 }).map((_, i) => (
        <div 
          key={i} 
          className="steam-particle"
          style={{
            left: `${15 + Math.random() * 70}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            ['--drift' as string]: `${-30 + Math.random() * 60}px`,
          }}
        />
      ))}
    </div>
  );
}

// Section Wrapper
function Section({ 
  id, 
  className = '', 
  children 
}: { 
  id: string; 
  className?: string; 
  children: React.ReactNode;
}) {
  const { ref, isVisible, hasAnimated } = useIntersectionObserver(0.15);
  
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id={id}
      className={`ngapi-section ${className} ${isVisible ? 'visible' : ''} ${hasAnimated ? 'animated' : ''}`}
    >
      {children}
    </section>
  );
}

// Fermentation Timeline Slider
function FermentationTimeline() {
  const [currentStage, setCurrentStage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const handleInteraction = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const stage = Math.round(percent * (FERMENTATION_STAGES.length - 1));
    setCurrentStage(stage);
  }, []);
  
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    handleInteraction(e.clientX);
  }, [handleInteraction]);
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) handleInteraction(e.clientX);
  }, [isDragging, handleInteraction]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    handleInteraction(e.touches[0].clientX);
  }, [handleInteraction]);
  
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDragging) handleInteraction(e.touches[0].clientX);
  }, [isDragging, handleInteraction]);
  
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);
  
  const progress = currentStage / (FERMENTATION_STAGES.length - 1);
  const stage = FERMENTATION_STAGES[currentStage];
  
  return (
    <div className="fermentation-timeline">
      <h3>The Fermentation Process</h3>
      <p>Drag to explore each stage of transformation</p>
      
      <div 
        ref={trackRef}
        className="timeline-track"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="timeline-fill" style={{ width: `${progress * 100}%` }} />
        <div 
          className="timeline-thumb" 
          style={{ left: `${progress * 100}%` }}
        />
      </div>
      
      <div className="timeline-stages">
        {FERMENTATION_STAGES.map((s, idx) => (
          <div 
            key={s.id} 
            className={`timeline-stage ${idx === currentStage ? 'active' : ''}`}
            onClick={() => setCurrentStage(idx)}
          >
            <div className="stage-icon">{s.icon}</div>
            <span className="stage-label">{s.name}</span>
          </div>
        ))}
      </div>
      
      <div className="fermentation-visual">
        <div className="visual-content">
          <div className="visual-title">{stage.name}</div>
          <div className="visual-description">{stage.description}</div>
          <div className="stage-label" style={{ marginTop: '0.5rem' }}>{stage.duration}</div>
        </div>
      </div>
    </div>
  );
}

// Flavor Spectrum Dial
function FlavorDial() {
  const [selectedFlavor, setSelectedFlavor] = useState(FLAVOR_NOTES[1]); // Start with Umami
  
  return (
    <div className="flavor-dial-container">
      <h3>The Flavor Spectrum of Ngapi</h3>
      <p>Explore the complex taste dimensions</p>
      
      <div className="flavor-dial">
        <div className="dial-ring" />
        <div className="dial-inner">
          <div className="dial-center-text">
            <div className="dial-flavor-name">{selectedFlavor.name}</div>
            <div className="dial-flavor-desc">{selectedFlavor.description}</div>
          </div>
        </div>
        <div 
          className="dial-pointer" 
          style={{ transform: `translateX(-50%) rotate(${selectedFlavor.angle}deg)` }}
        />
      </div>
      
      <div className="flavor-buttons">
        {FLAVOR_NOTES.map((flavor) => (
          <button
            key={flavor.id}
            className={`flavor-btn ${selectedFlavor.id === flavor.id ? 'active' : ''}`}
            onClick={() => setSelectedFlavor(flavor)}
            style={{ ['--btn-color' as string]: flavor.color }}
          >
            {flavor.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// Ingredient Capsule
function IngredientCapsule({ 
  ingredient, 
  onTap 
}: { 
  ingredient: Ingredient; 
  onTap: (ingredient: Ingredient) => void;
}) {
  return (
    <button 
      className="ingredient-capsule"
      onClick={() => onTap(ingredient)}
    >
      <div className="capsule-icon">{ingredient.icon}</div>
      <span className="capsule-name">{ingredient.name}</span>
      <span className="capsule-origin">{ingredient.origin}</span>
    </button>
  );
}

// Ingredient Modal
function IngredientModal({ 
  ingredient, 
  onClose 
}: { 
  ingredient: Ingredient | null; 
  onClose: () => void;
}) {
  if (!ingredient) return null;
  
  return (
    <div className="ingredient-modal-overlay" onClick={onClose}>
      <div className="ingredient-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        <div className="modal-icon">{ingredient.icon}</div>
        <h3 className="modal-name">{ingredient.name}</h3>
        <p className="modal-origin">{ingredient.origin}</p>
        <div className="modal-section">
          <h4>Role in Ngapi</h4>
          <p>{ingredient.role}</p>
        </div>
        <div className="modal-section">
          <h4>Tasting Notes</h4>
          <p>{ingredient.tastingNotes}</p>
        </div>
      </div>
    </div>
  );
}

// Regional Variant Card
function RegionalCard({ variant }: { variant: RegionalVariant }) {
  return (
    <div className="regional-card">
      <div className="regional-visual">
        {variant.icon}
      </div>
      <div className="regional-content">
        <h4 className="regional-title">{variant.name}</h4>
        <span className="regional-location">{variant.location}</span>
        <p className="regional-description">{variant.description}</p>
        <div className="regional-traits">
          {variant.traits.map((trait) => (
            <span key={trait} className="trait-tag">{trait}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Myanmar Map Component
function MyanmarMap({ highlightedRegion }: { highlightedRegion?: string }) {
  return (
    <div className="map-container">
      <svg 
        viewBox="0 0 300 400" 
        className="map-svg"
        role="img"
        aria-labelledby="myanmar-map-title myanmar-map-desc"
      >
        <title id="myanmar-map-title">Map of Myanmar</title>
        <desc id="myanmar-map-desc">A stylized map of Myanmar showing the regions where ngapi is produced</desc>
        
        <defs>
          <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8D6E63" />
            <stop offset="100%" stopColor="#6D4C41" />
          </linearGradient>
          <filter id="mapGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Simplified Myanmar outline */}
        <path 
          d="M80 40 Q120 30 150 50 Q180 40 200 60 Q220 90 230 130 
             Q240 170 220 210 Q210 250 180 280 Q160 310 140 340 
             Q130 360 120 380 Q110 370 100 350 Q80 320 70 280 
             Q60 240 50 200 Q45 160 50 120 Q55 80 80 40 Z"
          fill="url(#landGradient)"
          stroke="#5D4037"
          strokeWidth="2"
          opacity="0.8"
        />
        
        {/* Rivers - Irrawaddy */}
        <path 
          d="M150 60 Q140 100 145 140 Q150 180 140 220 Q135 260 130 300 Q125 340 120 370"
          fill="none"
          stroke="#546E7A"
          strokeWidth="3"
          opacity="0.6"
        />
        
        {/* Rakhine Coast */}
        <circle 
          cx="65" cy="180" r="15" 
          fill={highlightedRegion === 'rakhine' ? '#C75B39' : '#5D4037'}
          opacity="0.8"
          className={`map-region ${highlightedRegion === 'rakhine' ? 'highlighted' : ''}`}
        />
        <text x="65" y="210" textAnchor="middle" fill="#F5F0E6" fontSize="10">Rakhine</text>
        
        {/* Delta Region */}
        <circle 
          cx="140" cy="300" r="18" 
          fill={highlightedRegion === 'delta' ? '#C75B39' : '#5D4037'}
          opacity="0.8"
          className={`map-region ${highlightedRegion === 'delta' ? 'highlighted' : ''}`}
        />
        <text x="140" y="335" textAnchor="middle" fill="#F5F0E6" fontSize="10">Delta</text>
        
        {/* Shan State */}
        <circle 
          cx="200" cy="140" r="16" 
          fill={highlightedRegion === 'shan' ? '#C75B39' : '#5D4037'}
          opacity="0.8"
          className={`map-region ${highlightedRegion === 'shan' ? 'highlighted' : ''}`}
        />
        <text x="200" y="170" textAnchor="middle" fill="#F5F0E6" fontSize="10">Shan</text>
        
        {/* Tanintharyi */}
        <circle 
          cx="170" cy="360" r="12" 
          fill={highlightedRegion === 'tanintharyi' ? '#C75B39' : '#5D4037'}
          opacity="0.8"
          className={`map-region ${highlightedRegion === 'tanintharyi' ? 'highlighted' : ''}`}
        />
        <text x="195" y="365" textAnchor="start" fill="#F5F0E6" fontSize="9">Tanintharyi</text>
        
        {/* Trade routes */}
        <path 
          d="M65 180 Q100 200 140 220 Q160 250 140 300"
          fill="none"
          stroke="#C99A53"
          strokeWidth="2"
          strokeDasharray="5,5"
          opacity="0.5"
        />
      </svg>
      
      <div className="map-labels">
        <div className="map-label-item">
          <span className="map-label-dot" style={{ background: '#546E7A' }} />
          <span>Rivers</span>
        </div>
        <div className="map-label-item">
          <span className="map-label-dot" style={{ background: '#C99A53' }} />
          <span>Trade Routes</span>
        </div>
      </div>
    </div>
  );
}

// Sources Component
function Sources() {
  const sources = [
    { title: "Food Culture in Southeast Asia — Penn Museum", url: "https://www.penn.museum/sites/expedition/food-culture-in-southeast-asia/" },
    { title: "Fermented Fish Products — FAO Corporate Document Repository", url: "https://www.fao.org/3/x0560e/x0560e00.htm" },
    { title: "Myanmar Cuisine: Traditional Recipes — Smithsonian Folklife", url: "https://folklife.si.edu/" },
    { title: "The Oxford Companion to Food — Alan Davidson", url: "https://global.oup.com/" },
    { title: "History of Fermentation in Southeast Asia — Journal of Ethnic Foods", url: "https://journalofethnicfoods.biomedcentral.com/" },
    { title: "Mon and Pyu Archaeological Evidence — University of Yangon", url: "https://www.uy.edu.mm/" },
  ];
  
  return (
    <section className="sources-section">
      <div className="sources-content">
        <h3 className="sources-title">Sources & Further Reading</h3>
        <ul className="sources-list">
          {sources.map((source, index) => (
            <li key={index}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.title}
              </a>
            </li>
          ))}
        </ul>
        <p className="sources-note">
          This narrative draws from ethnographic research, archaeological evidence, and culinary scholarship 
          on Southeast Asian fermented foods. Cultural practices described reflect historical traditions.
        </p>
      </div>
    </section>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function NgapiJourneyClient() {
  const progress = useScrollProgress();
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [highlightedRegion, setHighlightedRegion] = useState<string>('');
  
  // Cycle through highlighted regions for demo
  useEffect(() => {
    const regions = ['', 'rakhine', 'delta', 'shan', 'tanintharyi'];
    const idx = Math.floor(progress * 5) % regions.length;
    setHighlightedRegion(regions[idx]);
  }, [progress]);
  
  return (
    <div className="ngapi-story">
      <ClayPotProgress progress={progress} />
      
      {/* HERO SECTION */}
      <Section id="hero" className="hero full-bleed">
        <div className="hero-background">
          <div className="hero-clay-glow" />
          <SteamParticles intensity={0.6} />
        </div>
        
        <div className="hero-badge">
          <span>🇲🇲</span>
          <span>Myanmar Culinary Heritage</span>
        </div>
        
        <h1 className="hero-title">
          <span className="hero-title-accent">Ngapi</span>
        </h1>
        <p className="hero-subtitle">
          The Soul Ingredient of Myanmar — A Journey Through 2,000 Years of Fermented Fish Paste
        </p>
        
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-value">2,000+</span>
            <span className="stat-label">Years Old</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">4</span>
            <span className="stat-label">Regional Varieties</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">100%</span>
            <span className="stat-label">Essential to Burmese Cuisine</span>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow" />
        </div>
      </Section>
      
      {/* SECTION 2: THE PROBLEM */}
      <Section id="problem">
        <div className="section-content">
          <h4>The Challenge</h4>
          <h2>The Problem of Heat & Preservation</h2>
          <p className="lead-text">
            In the humid tropics of prehistoric Myanmar, <span className="highlight-text">fish spoiled within hours</span>. 
            The abundance of the Irrawaddy River and coastal waters meant nothing if the catch couldn&apos;t survive 
            the journey from net to village.
          </p>
          <p>
            Before refrigeration, before modern preservation, ancient communities faced an existential challenge: 
            how to transform the fleeting bounty of the waters into lasting sustenance. The answer they discovered 
            would become the foundation of an entire cuisine.
          </p>
          <p>
            Through trial and generations of accumulated wisdom, they learned that <strong>salt and time</strong> could 
            transform decay into preservation, turning fish into something that could last months — even years.
          </p>
        </div>
      </Section>
      
      {/* SECTION 3: PREHISTORIC ROOTS */}
      <Section id="prehistoric">
        <div className="section-content">
          <h4>Origins</h4>
          <h2>Prehistoric Roots of Fish Fermentation</h2>
          <p className="lead-text">
            Fish fermentation emerged independently across Southeast Asia — a parallel evolution driven by 
            similar needs and similar environments.
          </p>
          <p>
            Archaeological evidence suggests fermented fish products existed in the region as early as 
            2,000 BCE. Coastal communities developed saltwater-based methods, while inland river communities 
            created freshwater variations. Both discovered the same fundamental truth: that controlled 
            fermentation could unlock preservation and intense umami flavor.
          </p>
          <p>
            The earliest ngapi-like products likely emerged from simple survival innovation — fish mixed 
            with available salt, stored in earthen vessels, and left to transform. What began as necessity 
            became culinary art.
          </p>
        </div>
      </Section>
      
      {/* SECTION 4: MON CIVILIZATION */}
      <Section id="mon">
        <div className="section-content">
          <h4>Coastal Origins</h4>
          <h2>The Mon Civilization & Coastal Influence</h2>
          <p className="lead-text">
            The Mon people, one of the oldest civilizations in mainland Southeast Asia, developed 
            sophisticated coastal ngapi traditions that would influence the entire region.
          </p>
          <p>
            With access to both sea fish and abundant sea salt, Mon communities along the coast of 
            present-day Rakhine and Tanintharyi perfected techniques that produced intensely flavored 
            fish paste. Their methods spread through trade networks that connected the Bay of Bengal 
            to inland kingdoms.
          </p>
          <p>
            The Mon legacy lives on in <strong>Rakhine ngapi</strong> — still considered by many to be the 
            finest expression of the craft, prized for its oceanic depth and complex fermentation.
          </p>
        </div>
      </Section>
      
      {/* SECTION 5: PYU CITY-STATES */}
      <Section id="pyu">
        <div className="section-content">
          <h4>River Culture</h4>
          <h2>The Pyu City-States</h2>
          <p className="lead-text">
            While the Mon mastered coastal fermentation, the Pyu civilization developed distinct 
            freshwater traditions along the great rivers of Upper Myanmar.
          </p>
          <p>
            The Pyu city-states — Sri Ksetra, Beikthano, Halin — flourished from the 2nd century BCE 
            to the 9th century CE along the Irrawaddy River valley. Their ngapi utilized freshwater 
            species like <em>ngagyin</em>, producing milder, sweeter pastes that complemented the 
            rice-based diet of the river plains.
          </p>
          <p>
            Archaeological remains reveal clay storage vessels remarkably similar to those still used 
            today — testament to techniques refined over millennia.
          </p>
          
          <div className="ingredients-grid">
            {Object.values(INGREDIENTS).map((ingredient) => (
              <IngredientCapsule 
                key={ingredient.id} 
                ingredient={ingredient} 
                onTap={setSelectedIngredient}
              />
            ))}
          </div>
        </div>
      </Section>
      
      {/* SECTION 6: BAMAR KINGDOM */}
      <Section id="bamar">
        <div className="section-content">
          <h4>Cultural Integration</h4>
          <h2>Bamar Kingdom Era</h2>
          <p className="lead-text">
            As Bamar kingdoms rose to dominance — Pagan, Ava, Taungoo, Konbaung — ngapi transformed 
            from regional product to national staple.
          </p>
          <p>
            Royal courts and common households alike embraced ngapi as the foundation of cooking. 
            It appeared in elaborate palace dishes and simple village meals. The great kingdoms 
            facilitated trade between coast and interior, blending Mon and Pyu traditions into 
            what we now recognize as Burmese cuisine.
          </p>
          <p>
            By the height of the Konbaung Dynasty (1752-1885), ngapi had become inseparable from 
            Burmese identity — the invisible thread connecting every meal, every region, every class.
          </p>
        </div>
      </Section>
      
      {/* SECTION 7: REGIONAL VARIANTS */}
      <Section id="regional">
        <div className="section-content wide">
          <h4>Diversity</h4>
          <h2>Regional Variants Emerge</h2>
          <p className="lead-text" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2rem' }}>
            From mountain streams to tropical coasts, each region of Myanmar developed its own 
            ngapi tradition, shaped by local fish, local salt, and local taste.
          </p>
          
          <MyanmarMap highlightedRegion={highlightedRegion} />
          
          <div className="regional-gallery">
            <div className="gallery-scroll">
              {REGIONAL_VARIANTS.map((variant) => (
                <RegionalCard key={variant.id} variant={variant} />
              ))}
            </div>
          </div>
        </div>
      </Section>
      
      {/* SECTION 8: FERMENTATION PROCESS */}
      <Section id="fermentation">
        <div className="section-content">
          <h4>The Craft</h4>
          <h2>The Science of Transformation</h2>
          <p className="lead-text">
            Ngapi is not made — it is <em>grown</em>. The transformation from fresh fish to 
            finished paste is a slow alchemy of salt, time, and beneficial bacteria.
          </p>
          
          <FermentationTimeline />
          
          <p>
            During fermentation, enzymes break down fish proteins into glutamates — the molecules 
            responsible for umami taste. This same process occurs in soy sauce, miso, and aged cheese. 
            The result is a concentrate of pure savory flavor, able to transform any dish it touches.
          </p>
        </div>
      </Section>
      
      {/* QUOTE MONUMENT */}
      <Section id="quote" className="quote-monument">
        <blockquote>
          <p className="quote-text">
            To understand Myanmar, you must first understand ngapi. 
            It is in every dish, every home, every memory of meals shared.
          </p>
          <cite className="quote-attribution">— Burmese culinary saying</cite>
        </blockquote>
      </Section>
      
      {/* SECTION 9: WHY NGAPI BECAME STAPLE */}
      <Section id="staple">
        <div className="section-content">
          <h4>Essential</h4>
          <h2>Why Ngapi Became a Staple</h2>
          <p className="lead-text">
            Three forces combined to make ngapi indispensable: <span className="highlight-text">nutrition</span>, 
            <span className="highlight-text">climate</span>, and <span className="highlight-text">flavor architecture</span>.
          </p>
          <p>
            <strong>Nutrition:</strong> In a rice-based diet, ngapi provides essential proteins, amino acids, 
            and minerals. A small amount delivers concentrated nutrition — vital in regions where fresh 
            fish couldn&apos;t always reach.
          </p>
          <p>
            <strong>Climate pragmatism:</strong> Without refrigeration, ngapi was the only way to preserve 
            the annual fish abundance. A year&apos;s worth of protein could be stored in a single clay pot.
          </p>
          <p>
            <strong>Flavor architecture:</strong> Ngapi is the umami foundation upon which Burmese cuisine 
            is built. It provides the &quot;fifth taste&quot; that makes simple ingredients sing.
          </p>
          
          <FlavorDial />
        </div>
      </Section>
      
      {/* SECTION 10: MODERN CUISINE */}
      <Section id="modern">
        <div className="section-content">
          <h4>Today</h4>
          <h2>Ngapi in Modern Burmese Cuisine</h2>
          <p className="lead-text">
            From the national dish of <strong>mohinga</strong> to the beloved <strong>ngapi yay</strong> 
            dipping sauce, ngapi remains the invisible thread connecting every Burmese meal.
          </p>
          <p>
            In <strong>mohinga</strong> — Myanmar&apos;s fish noodle soup breakfast — ngapi provides the 
            savory backbone. In <strong>ngapi yay</strong>, raw ngapi is dissolved with water, garlic, 
            and chili to create a dipping sauce for vegetables. In countless curries, salads, and 
            sambol-like mixtures, it adds depth without being detected.
          </p>
          <p>
            For the Myanmar diaspora, ngapi carries the taste of home. A jar of family-made paste 
            traveling across oceans connects generations and geographies, each meal a small act 
            of cultural preservation.
          </p>
        </div>
      </Section>
      
      {/* CLOSING SECTION */}
      <Section id="closing" className="closing-section">
        <h2 className="closing-title">Ngapi is history you can taste.</h2>
        <p className="closing-message">
          Every jar contains centuries of innovation, adaptation, and cultural identity. 
          From prehistoric river communities to modern kitchens worldwide, the journey of ngapi 
          mirrors the journey of Myanmar itself — resilient, complex, and profoundly flavorful.
        </p>
      </Section>
      
      {/* SOURCES */}
      <Sources />
      
      {/* INGREDIENT MODAL */}
      <IngredientModal 
        ingredient={selectedIngredient} 
        onClose={() => setSelectedIngredient(null)} 
      />
    </div>
  );
}

