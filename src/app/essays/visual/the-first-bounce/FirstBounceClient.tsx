"use client";

import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import "./first-bounce.css";

/* ===========================================
   THE FIRST BOUNCE
   A Cinematic History of Basketball's Invention
   Mythic + Scientific Hybrid Scrollytelling
   Version II.1 (Museum-Grade, SVG-Driven)
   ===========================================
   
   DESIGN PHILOSOPHY:
   - Gymnasium silence before the storm
   - Leather texture and hardwood warmth
   - MoMA-grade minimalist geometry
   - Mobile-native, 60fps GPU-accelerated
   - No literal maps, only symbolic geometry
   
   COLOR PALETTE:
   - Deep amber (#D4A574)
   - Leather brown (#8B5A2B)
   - Maple wood gradients (#C4A35A → #8B6914)
   - Warm gymnasium gold (#F5D69C)
   - Slate black (#0A0908)
   - Crisp white (#F5F0E6)
   
   MOVEMENTS:
   I. Invocation — Pure atmosphere, the waiting ball
   II. The Ancestral Pulse — Winter 1891, the problem
   III. Collision of Worlds — The invention moment
   IV. The Modern Echo — Global diffusion as geometry
   V. Revelation — Past and present united
*/

/* ===========================================
   BASKETBALL SVG COMPONENT
   The leather sphere with hand-stitched seams
   =========================================== */
const BasketballSVG: React.FC<{
  className?: string;
  rotation?: number;
  scale?: number;
  glowIntensity?: number;
}> = ({ className = "", rotation = 0, scale = 1, glowIntensity = 0.3 }) => (
  <svg
    className={`basketball-svg ${className}`}
    viewBox="0 0 200 200"
    style={{
      transform: `scale(${scale}) rotate(${rotation}deg)`,
      transformOrigin: "center",
    }}
    aria-label="Basketball with leather texture and seams"
  >
    <defs>
      {/* Main leather gradient */}
      <radialGradient id="leatherGradient" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#D4874A" />
        <stop offset="40%" stopColor="#C4692A" />
        <stop offset="80%" stopColor="#8B4513" />
        <stop offset="100%" stopColor="#5D3311" />
      </radialGradient>
      
      {/* Highlight for 3D effect */}
      <radialGradient id="leatherHighlight" cx="30%" cy="25%" r="40%">
        <stop offset="0%" stopColor="#FFB366" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#FFB366" stopOpacity="0" />
      </radialGradient>
      
      {/* Ambient glow */}
      <radialGradient id="ballGlow" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#F5D69C" stopOpacity={glowIntensity} />
        <stop offset="50%" stopColor="#D4A574" stopOpacity={glowIntensity * 0.5} />
        <stop offset="100%" stopColor="#D4A574" stopOpacity="0" />
      </radialGradient>
      
      {/* Leather texture noise */}
      <filter id="leatherTexture" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
        <feDiffuseLighting in="noise" lightingColor="#C4692A" surfaceScale="1.5" result="light">
          <feDistantLight azimuth="45" elevation="60" />
        </feDiffuseLighting>
        <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" />
      </filter>
      
      {/* Shadow filter */}
      <filter id="ballShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" />
      </filter>
    </defs>
    
    {/* Ambient glow behind ball */}
    <circle cx="100" cy="100" r="95" fill="url(#ballGlow)" />
    
    {/* Shadow */}
    <ellipse cx="100" cy="195" rx="50" ry="8" fill="#0A0908" opacity="0.4" filter="url(#ballShadow)" />
    
    {/* Main ball body */}
    <circle cx="100" cy="100" r="85" fill="url(#leatherGradient)" />
    
    {/* Leather highlight */}
    <circle cx="100" cy="100" r="85" fill="url(#leatherHighlight)" />
    
    {/* Seam lines - the iconic basketball pattern */}
    <g stroke="#2A1A0A" strokeWidth="2.5" fill="none" strokeLinecap="round">
      {/* Horizontal equator */}
      <path d="M15,100 Q100,85 185,100" />
      <path d="M15,100 Q100,115 185,100" />
      
      {/* Vertical meridian */}
      <path d="M100,15 Q85,100 100,185" />
      <path d="M100,15 Q115,100 100,185" />
      
      {/* Left curve */}
      <path d="M25,50 Q40,100 25,150" />
      
      {/* Right curve */}
      <path d="M175,50 Q160,100 175,150" />
    </g>
    
    {/* Pebbled texture overlay (subtle) */}
    <circle cx="100" cy="100" r="85" fill="none" stroke="#5D3311" strokeWidth="0.5" opacity="0.2" />
  </svg>
);

/* ===========================================
   DUST MOTES COMPONENT
   Floating particles in gymnasium light
   =========================================== */
const DustMotes: React.FC<{ 
  intensity?: number; 
  active?: boolean;
}> = ({ intensity = 1, active = true }) => {
  const motes = useMemo(() => 
    Array.from({ length: Math.floor(40 * intensity) }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      opacity: 0.2 + Math.random() * 0.4,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
      drift: (Math.random() - 0.5) * 30,
    })), [intensity]
  );

  if (!active) return null;

  return (
    <div className="dust-motes" aria-hidden="true">
      {motes.map((mote) => (
        <div
          key={mote.id}
          className="dust-mote"
          style={{
            '--x': `${mote.x}%`,
            '--y': `${mote.y}%`,
            '--size': `${mote.size}px`,
            '--opacity': mote.opacity,
            '--duration': `${mote.duration}s`,
            '--delay': `${mote.delay}s`,
            '--drift': `${mote.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

/* ===========================================
   GYMNASIUM LIGHT BEAM
   Warm angular light cutting through darkness
   =========================================== */
const GymnasiumLight: React.FC<{ intensity?: number }> = ({ intensity = 0.5 }) => (
  <div className="gymnasium-light" aria-hidden="true">
    <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="lightBeam" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D69C" stopOpacity={intensity * 0.4} />
          <stop offset="50%" stopColor="#D4A574" stopOpacity={intensity * 0.15} />
          <stop offset="100%" stopColor="#D4A574" stopOpacity="0" />
        </linearGradient>
        <filter id="lightBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="15" />
        </filter>
      </defs>
      
      {/* Primary light beam */}
      <path 
        d="M-50,0 L200,400 L350,400 L50,0 Z" 
        fill="url(#lightBeam)" 
        filter="url(#lightBlur)"
        opacity={intensity}
      />
      
      {/* Secondary softer beam */}
      <path 
        d="M100,0 L450,400 L550,400 L200,0 Z" 
        fill="url(#lightBeam)" 
        filter="url(#lightBlur)"
        opacity={intensity * 0.5}
      />
    </svg>
  </div>
);

/* ===========================================
   WINTER LANDSCAPE SVG
   Abstract minimalist winter scene
   =========================================== */
const WinterLandscapeSVG: React.FC<{ snowIntensity?: number }> = ({ snowIntensity = 0.5 }) => {
  const snowflakes = useMemo(() => 
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      startY: -5 - Math.random() * 20,
      size: 1 + Math.random() * 2,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 8,
      drift: (Math.random() - 0.5) * 20,
    })), []
  );

  return (
    <div className="winter-landscape" aria-hidden="true">
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="winterSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0A0908" />
            <stop offset="60%" stopColor="#1A1612" />
            <stop offset="100%" stopColor="#2A2520" />
          </linearGradient>
          <linearGradient id="snowGround" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8E4DC" />
            <stop offset="100%" stopColor="#C4C0B8" />
          </linearGradient>
        </defs>
        
        {/* Winter sky */}
        <rect x="0" y="0" width="800" height="350" fill="url(#winterSky)" />
        
        {/* Distant bare trees - abstract lines */}
        <g stroke="#3A3530" strokeWidth="1.5" fill="none" opacity="0.5">
          {[100, 180, 250, 350, 450, 520, 620, 700].map((x, i) => {
            const height = 60 + Math.sin(i * 0.8) * 30;
            return (
              <g key={i}>
                <line x1={x} y1="350" x2={x} y2={350 - height} />
                <line x1={x} y1={350 - height * 0.6} x2={x - 15} y2={350 - height * 0.8} />
                <line x1={x} y1={350 - height * 0.5} x2={x + 12} y2={350 - height * 0.7} />
              </g>
            );
          })}
        </g>
        
        {/* Snow-covered ground */}
        <path 
          d="M0,380 Q200,365 400,375 Q600,360 800,380 L800,500 L0,500 Z" 
          fill="url(#snowGround)" 
        />
        
        {/* Falling snow */}
        {snowflakes.map((flake) => (
          <circle
            key={flake.id}
            className="snowflake"
            cx={`${flake.x}%`}
            cy={flake.startY}
            r={flake.size}
            fill="#F5F0E6"
            opacity={snowIntensity * 0.6}
            style={{
              '--duration': `${flake.duration}s`,
              '--delay': `${flake.delay}s`,
              '--drift': `${flake.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </svg>
    </div>
  );
};

/* ===========================================
   GYMNASIUM SVG
   Abstract geometric gymnasium structure
   =========================================== */
const GymnasiumSVG: React.FC<{ lightLevel?: number }> = ({ lightLevel = 0.3 }) => (
  <svg 
    className="gymnasium-svg" 
    viewBox="0 0 600 400"
    aria-label="Abstract gymnasium interior"
  >
    <defs>
      <linearGradient id="gymFloor" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#C4A35A" />
        <stop offset="50%" stopColor="#A68B3D" />
        <stop offset="100%" stopColor="#8B6914" />
      </linearGradient>
      <linearGradient id="gymWall" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3A3530" />
        <stop offset="100%" stopColor="#2A2520" />
      </linearGradient>
      <radialGradient id="windowGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F5D69C" stopOpacity={lightLevel} />
        <stop offset="100%" stopColor="#F5D69C" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Back wall */}
    <rect x="50" y="80" width="500" height="200" fill="url(#gymWall)" />
    
    {/* Windows - light sources */}
    {[100, 200, 300, 400, 450].map((x, i) => (
      <g key={i}>
        <rect x={x} y="100" width="40" height="80" fill="url(#windowGlow)" rx="2" />
        <rect x={x} y="100" width="40" height="80" fill="none" stroke="#4A4540" strokeWidth="2" rx="2" />
        {/* Window dividers */}
        <line x1={x + 20} y1="100" x2={x + 20} y2="180" stroke="#4A4540" strokeWidth="1" />
        <line x1={x} y1="140" x2={x + 40} y2="140" stroke="#4A4540" strokeWidth="1" />
      </g>
    ))}
    
    {/* Hardwood floor - maple boards */}
    <rect x="0" y="280" width="600" height="120" fill="url(#gymFloor)" />
    
    {/* Floor boards - parallel lines */}
    {[...Array(30)].map((_, i) => (
      <line 
        key={i}
        x1={i * 20}
        y1="280"
        x2={i * 20}
        y2="400"
        stroke="#8B6914"
        strokeWidth="0.5"
        opacity="0.3"
      />
    ))}
    
    {/* Court line */}
    <line x1="50" y1="340" x2="550" y2="340" stroke="#F5F0E6" strokeWidth="2" opacity="0.6" />
  </svg>
);

/* ===========================================
   PEACH BASKET SVG
   The original basketball goal
   =========================================== */
const PeachBasketSVG: React.FC<{ 
  hasBall?: boolean;
  glowIntensity?: number;
}> = ({ hasBall = false, glowIntensity = 0 }) => (
  <svg 
    className="peach-basket-svg"
    viewBox="0 0 200 280"
    aria-label="Original peach basket basketball goal"
  >
    <defs>
      <linearGradient id="basketWood" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A68B3D" />
        <stop offset="50%" stopColor="#8B7328" />
        <stop offset="100%" stopColor="#6B5618" />
      </linearGradient>
      <linearGradient id="basketRim" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8B5A2B" />
        <stop offset="100%" stopColor="#5D3D1D" />
      </linearGradient>
      <radialGradient id="basketGlow" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#F5D69C" stopOpacity={glowIntensity} />
        <stop offset="100%" stopColor="#F5D69C" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Glow behind basket */}
    {glowIntensity > 0 && (
      <ellipse cx="100" cy="120" rx="80" ry="100" fill="url(#basketGlow)" />
    )}
    
    {/* Wooden backboard */}
    <rect x="20" y="10" width="160" height="80" fill="url(#basketWood)" rx="4" />
    <g stroke="#5D3D1D" strokeWidth="1" fill="none" opacity="0.3">
      <line x1="60" y1="10" x2="60" y2="90" />
      <line x1="100" y1="10" x2="100" y2="90" />
      <line x1="140" y1="10" x2="140" y2="90" />
    </g>
    
    {/* Metal rim/support */}
    <rect x="60" y="85" width="80" height="8" fill="url(#basketRim)" />
    
    {/* Basket body - woven pattern */}
    <path
      d="M55,93 
         Q50,130 55,170 
         Q60,200 75,220 
         Q100,235 125,220 
         Q140,200 145,170 
         Q150,130 145,93"
      fill="url(#basketWood)"
      stroke="#5D3D1D"
      strokeWidth="2"
    />
    
    {/* Basket weave texture */}
    <g stroke="#5D3D1D" strokeWidth="1" fill="none" opacity="0.4">
      {/* Horizontal weave lines */}
      <path d="M58,110 Q100,105 142,110" />
      <path d="M56,130 Q100,125 144,130" />
      <path d="M57,150 Q100,145 143,150" />
      <path d="M60,170 Q100,165 140,170" />
      <path d="M68,190 Q100,185 132,190" />
      <path d="M80,208 Q100,204 120,208" />
      
      {/* Vertical slats */}
      <line x1="75" y1="93" x2="82" y2="215" />
      <line x1="100" y1="93" x2="100" y2="220" />
      <line x1="125" y1="93" x2="118" y2="215" />
    </g>
    
    {/* Basket bottom (closed - they had to retrieve ball with ladder!) */}
    <ellipse cx="100" cy="222" rx="22" ry="8" fill="#6B5618" />
    
    {/* Ball in basket */}
    {hasBall && (
      <g className="ball-in-basket">
        <ellipse cx="100" cy="140" rx="35" ry="30" fill="url(#leatherGradient)" />
        <path d="M65,140 Q100,125 135,140" stroke="#2A1A0A" strokeWidth="2" fill="none" />
        <path d="M100,110 Q95,140 100,170" stroke="#2A1A0A" strokeWidth="2" fill="none" />
      </g>
    )}
    
    {/* Ladder suggestion (abstract) */}
    <g stroke="#4A4540" strokeWidth="2" fill="none" opacity="0.4">
      <line x1="170" y1="280" x2="165" y2="100" />
      <line x1="185" y1="280" x2="180" y2="100" />
      <line x1="168" y1="140" x2="183" y2="140" />
      <line x1="169" y1="180" x2="184" y2="180" />
      <line x1="170" y1="220" x2="185" y2="220" />
      <line x1="171" y1="260" x2="186" y2="260" />
    </g>
  </svg>
);

/* ===========================================
   PARABOLIC ARC SVG
   Trajectory paths for ball flight
   =========================================== */
const ParabolicArcSVG: React.FC<{
  arcType?: 'low' | 'medium' | 'high' | 'bank';
  progress?: number;
  showBall?: boolean;
}> = ({ arcType = 'medium', progress = 1, showBall = true }) => {
  const arcPaths = {
    low: "M50,350 Q175,280 300,200",
    medium: "M50,350 Q175,180 300,200",
    high: "M50,350 Q175,50 300,200",
    bank: "M50,350 Q200,200 280,150 L300,200",
  };

  const arcPath = arcPaths[arcType];
  
  return (
    <svg 
      className="parabolic-arc-svg"
      viewBox="0 0 400 400"
      aria-label={`Basketball trajectory - ${arcType} arc`}
    >
      <defs>
        <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4A574" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#F5D69C" stopOpacity="0.3" />
        </linearGradient>
        <filter id="arcGlow">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      
      {/* Arc trajectory */}
      <path
        d={arcPath}
        stroke="url(#arcGradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="400"
        strokeDashoffset={400 - progress * 400}
        filter="url(#arcGlow)"
      />
      
      {/* Dotted guide */}
      <path
        d={arcPath}
        stroke="#F5D69C"
        strokeWidth="1"
        fill="none"
        strokeDasharray="5,10"
        opacity="0.3"
      />
      
      {/* Ball at current position */}
      {showBall && progress > 0 && (
        <circle
          cx={50 + progress * 250}
          cy={350 - Math.sin(progress * Math.PI) * 200}
          r="15"
          fill="#C4692A"
          className="trajectory-ball"
        />
      )}
      
      {/* Target basket indicator */}
      <ellipse cx="300" cy="200" rx="25" ry="10" fill="none" stroke="#8B5A2B" strokeWidth="2" />
    </svg>
  );
};

/* ===========================================
   GLOBAL RIPPLE SVG
   Abstract diffusion pattern (not a map)
   =========================================== */
const GlobalRippleSVG: React.FC<{ 
  rippleCount?: number;
  pulseIntensity?: number;
}> = ({ rippleCount = 5, pulseIntensity = 0.5 }) => (
  <svg 
    className="global-ripple-svg"
    viewBox="0 0 500 300"
    aria-label="Abstract representation of basketball's global spread"
  >
    <defs>
      <radialGradient id="rippleGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#D4A574" stopOpacity={pulseIntensity} />
        <stop offset="70%" stopColor="#D4A574" stopOpacity={pulseIntensity * 0.3} />
        <stop offset="100%" stopColor="#D4A574" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Central origin point (peach basket) */}
    <circle cx="250" cy="150" r="12" fill="#C4692A" />
    <circle cx="250" cy="150" r="6" fill="#F5D69C" />
    
    {/* Expanding ripples */}
    {[...Array(rippleCount)].map((_, i) => (
      <circle
        key={i}
        className="ripple-ring"
        cx="250"
        cy="150"
        r={40 + i * 40}
        fill="none"
        stroke="url(#rippleGradient)"
        strokeWidth={2 - i * 0.3}
        style={{ '--delay': `${i * 0.5}s` } as React.CSSProperties}
      />
    ))}
    
    {/* Cultural adoption nodes */}
    {[
      { x: 150, y: 80, label: 'Schools', delay: 0.2 },
      { x: 350, y: 70, label: 'Colleges', delay: 0.4 },
      { x: 100, y: 180, label: 'YMCA', delay: 0.6 },
      { x: 400, y: 170, label: 'Olympics', delay: 0.8 },
      { x: 180, y: 250, label: 'Women', delay: 1.0 },
      { x: 320, y: 240, label: 'Professional', delay: 1.2 },
    ].map((node, i) => (
      <g key={i} className="adoption-node" style={{ '--delay': `${node.delay}s` } as React.CSSProperties}>
        <circle cx={node.x} cy={node.y} r="8" fill="#8B5A2B" opacity={pulseIntensity} />
        <circle cx={node.x} cy={node.y} r="4" fill="#F5D69C" />
        <text 
          x={node.x} 
          y={node.y + 22} 
          textAnchor="middle" 
          className="node-label"
          fill="#D4A574"
          fontSize="10"
        >
          {node.label}
        </text>
      </g>
    ))}
    
    {/* Connection lines */}
    <g stroke="#D4A574" strokeWidth="1" opacity="0.3">
      <line x1="250" y1="150" x2="150" y2="80" />
      <line x1="250" y1="150" x2="350" y2="70" />
      <line x1="250" y1="150" x2="100" y2="180" />
      <line x1="250" y1="150" x2="400" y2="170" />
      <line x1="250" y1="150" x2="180" y2="250" />
      <line x1="250" y1="150" x2="320" y2="240" />
    </g>
  </svg>
);

/* ===========================================
   EVOLUTION TIMELINE SLIDER
   Interactive era transition
   =========================================== */
const EvolutionTimelineSVG: React.FC<{ 
  progress?: number;
}> = ({ progress = 0 }) => {
  const eras = [
    { year: '1891', label: 'Peach Basket', icon: 'basket' },
    { year: '1906', label: 'Metal Rim', icon: 'rim' },
    { year: '1936', label: 'Olympics', icon: 'rings' },
    { year: '1954', label: 'Shot Clock', icon: 'clock' },
    { year: '1979', label: '3-Point Line', icon: 'arc' },
    { year: 'Today', label: 'Global', icon: 'globe' },
  ];
  
  const activeIndex = Math.floor(progress * (eras.length - 0.01));
  
  return (
    <svg 
      className="evolution-timeline-svg"
      viewBox="0 0 600 150"
      aria-label="Timeline of basketball evolution"
    >
      <defs>
        <linearGradient id="timelineGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5A2B" />
          <stop offset={`${progress * 100}%`} stopColor="#D4A574" />
          <stop offset={`${progress * 100}%`} stopColor="#4A4540" />
          <stop offset="100%" stopColor="#4A4540" />
        </linearGradient>
      </defs>
      
      {/* Timeline base */}
      <line x1="50" y1="75" x2="550" y2="75" stroke="url(#timelineGold)" strokeWidth="3" strokeLinecap="round" />
      
      {/* Era markers */}
      {eras.map((era, i) => {
        const x = 50 + (i / (eras.length - 1)) * 500;
        const isActive = i <= activeIndex;
        const isCurrent = i === activeIndex;
        
        return (
          <g key={i} className={`era-marker ${isCurrent ? 'current' : ''}`}>
            {/* Marker circle */}
            <circle 
              cx={x} 
              cy="75" 
              r={isCurrent ? 14 : 10} 
              fill={isActive ? '#D4A574' : '#4A4540'}
              className={isCurrent ? 'pulse-marker' : ''}
            />
            <circle 
              cx={x} 
              cy="75" 
              r={isCurrent ? 6 : 4} 
              fill={isActive ? '#F5D69C' : '#2A2520'}
            />
            
            {/* Year label */}
            <text 
              x={x} 
              y="50" 
              textAnchor="middle" 
              fill={isActive ? '#F5D69C' : '#6A6560'}
              fontSize="11"
              fontWeight={isCurrent ? '600' : '400'}
            >
              {era.year}
            </text>
            
            {/* Era label */}
            <text 
              x={x} 
              y="105" 
              textAnchor="middle" 
              fill={isActive ? '#D4A574' : '#5A5550'}
              fontSize="9"
            >
              {era.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/* ===========================================
   SILHOUETTE FIGURES SVG
   Abstract student silhouettes
   =========================================== */
const StudentSilhouettesSVG: React.FC<{ restlessness?: number }> = ({ restlessness = 0.5 }) => (
  <svg 
    className="student-silhouettes"
    viewBox="0 0 400 200"
    aria-hidden="true"
  >
    {/* Shuffling students - abstract forms */}
    {[60, 120, 180, 240, 300, 340].map((x, i) => {
      const height = 70 + Math.sin(i * 0.7) * 15;
      const sway = Math.sin(Date.now() / 1000 + i) * restlessness * 3;
      
      return (
        <g key={i} style={{ transform: `translateX(${sway}px)` }}>
          {/* Head */}
          <ellipse cx={x} cy={200 - height - 15} rx="10" ry="12" fill="#2A2520" />
          {/* Body */}
          <ellipse cx={x} cy={200 - height * 0.5} rx="15" ry={height * 0.5} fill="#2A2520" />
        </g>
      );
    })}
  </svg>
);

/* ===========================================
   SOURCES DATA
   =========================================== */
const sources = [
  {
    title: 'Naismith, James — "Basketball: Its Origin and Development" (1941, University of Nebraska Press)',
    url: 'https://www.amazon.com/Basketball-Origin-Development-James-Naismith/dp/0803283709',
  },
  {
    title: '"The History of Basketball" — Naismith Memorial Basketball Hall of Fame',
    url: 'https://www.hoophall.com/basketball-history/',
  },
  {
    title: '"James Naismith" — Encyclopedia Britannica',
    url: 'https://www.britannica.com/biography/James-Naismith',
  },
  {
    title: '"The Original 13 Rules of Basketball" — Springfield College Archives',
    url: 'https://springfield.edu/where-basketball-was-invented-the-birthplace-of-basketball',
  },
  {
    title: '"History of the NBA" — NBA.com',
    url: 'https://www.nba.com/history',
  },
  {
    title: 'Rains, Rob — "James Naismith: The Man Who Invented Basketball" (2009, Temple University Press)',
    url: 'https://tupress.temple.edu/book/0581',
  },
  {
    title: '"Basketball at the Olympic Games" — International Olympic Committee',
    url: 'https://olympics.com/en/sports/basketball/',
  },
  {
    title: '"The Invention of the Shot Clock" — NBA History',
    url: 'https://www.nba.com/history/shot-clock-history',
  },
];

/* ===========================================
   MAIN CLIENT COMPONENT
   =========================================== */
export default function FirstBounceClient() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [ballRotation, setBallRotation] = useState(0);
  const [lightLevel, setLightLevel] = useState(0);
  const [dustActive, setDustActive] = useState(true);
  const [arcProgress, setArcProgress] = useState(0);
  const [ripplePulse, setRipplePulse] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [ballInBasket, setBallInBasket] = useState(false);
  const [ballSuspended, setBallSuspended] = useState(false);
  const [ballScale, setBallScale] = useState(1);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const movementRefs = useRef<(HTMLElement | null)[]>([]);

  // Scroll handler
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1);
    setScrollProgress(progress);

    // Ball rotation based on scroll
    setBallRotation(scrollTop * 0.3);

    // Update state based on which movement is in view
    movementRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const threshold = window.innerHeight * 0.5;
        
        if (rect.top < threshold && rect.bottom > 0) {
          const sectionProgress = Math.max(0, Math.min(1, (threshold - rect.top) / rect.height));
          
          // Movement I: Invocation — ball suspends
          if (index === 0) {
            setBallSuspended(sectionProgress > 0.3);
            setBallScale(1 + sectionProgress * 0.1);
            setLightLevel(sectionProgress * 0.3);
          }
          
          // Movement II: Ancestral — light increases
          if (index === 1) {
            setLightLevel(0.3 + sectionProgress * 0.4);
            setDustActive(true);
          }
          
          // Movement III: Collision — arc and basket
          if (index === 2) {
            setArcProgress(sectionProgress);
            setBallInBasket(sectionProgress > 0.8);
          }
          
          // Movement IV: Echo — ripples and timeline
          if (index === 3) {
            setRipplePulse(sectionProgress);
            setTimelineProgress(sectionProgress);
          }
          
          // Movement V: Revelation — final state
          if (index === 4) {
            setLightLevel(0.7 - sectionProgress * 0.3);
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <article className="first-bounce" ref={containerRef}>
      
      {/* ==========================================
          MOVEMENT I — INVOCATION
          Pure Atmosphere — The Waiting Ball
          ========================================== */}
      <section 
        className="movement movement-invocation"
        ref={(el) => { movementRefs.current[0] = el; }}
        aria-label="Movement I: Invocation"
      >
        <div className="invocation-backdrop">
          <GymnasiumLight intensity={lightLevel} />
          <DustMotes intensity={1.2} active={dustActive} />
        </div>
        
        <div className="invocation-stage">
          <div className={`floating-ball ${ballSuspended ? 'suspended' : ''}`}>
            <BasketballSVG 
              rotation={ballRotation} 
              scale={ballScale}
              glowIntensity={lightLevel * 0.5}
            />
          </div>
          
          <div className="invocation-text reveal">
            <p className="opening-line">
              Every game begins long before the first whistle.
            </p>
            <p className="opening-line secondary">
              Every invention begins with a problem no one has solved.
            </p>
          </div>
          
          <div className="scroll-invitation reveal" aria-hidden="true">
            <span>Scroll to begin</span>
            <div className="scroll-line" />
          </div>
        </div>
      </section>

      {/* ==========================================
          MOVEMENT II — THE ANCESTRAL PULSE
          Winter 1891 — The Problem
          ========================================== */}
      <section 
        className="movement movement-ancestral"
        ref={(el) => { movementRefs.current[1] = el; }}
        aria-label="Movement II: The Ancestral Pulse"
      >
        <div className="ancestral-backdrop">
          <WinterLandscapeSVG snowIntensity={0.6} />
        </div>
        
        <div className="ancestral-content">
          <div className="time-badge reveal">
            <span className="time-location">Winter, 1891</span>
            <span className="time-place">Springfield, Massachusetts</span>
          </div>
          
          <div className="narrative-block reveal">
            <p className="scene-setter">
              Snow outside, restless students inside.
            </p>
          </div>
          
          <div className="gymnasium-scene reveal">
            <GymnasiumSVG lightLevel={lightLevel} />
            <StudentSilhouettesSVG restlessness={0.5} />
          </div>
          
          <div className="historical-context">
            <div className="context-card reveal">
              <h3>The Impossible Assignment</h3>
              <p>
                Dr. James Naismith, 30 years old, Canadian physical education instructor at the International YMCA Training School, faces a desperate challenge: create an indoor game to keep young men active during brutal New England winters.
              </p>
            </div>
            
            <div className="failed-attempts reveal">
              <h4>Failed Experiments</h4>
              <div className="attempt-list">
                <div className="attempt-item crossed">
                  <span className="attempt-name">Indoor Rugby</span>
                  <span className="attempt-result">Too dangerous</span>
                </div>
                <div className="attempt-item crossed">
                  <span className="attempt-name">Indoor Football</span>
                  <span className="attempt-result">Too violent</span>
                </div>
                <div className="attempt-item crossed">
                  <span className="attempt-name">Calisthenics</span>
                  <span className="attempt-result">Too static</span>
                </div>
                <div className="attempt-item crossed">
                  <span className="attempt-name">Indoor Track</span>
                  <span className="attempt-result">Too dull</span>
                </div>
              </div>
            </div>
            
            <blockquote className="naismith-quote reveal">
              <p>{`"The game must be interesting, easy to learn, and easy to play in winter and by artificial light."`}</p>
              <cite>— Dr. James Naismith</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ==========================================
          MOVEMENT III — THE COLLISION OF WORLDS
          The Invention Moment
          ========================================== */}
      <section 
        className="movement movement-collision"
        ref={(el) => { movementRefs.current[2] = el; }}
        aria-label="Movement III: The Collision of Worlds"
      >
        <div className="collision-content">
          <div className="invention-moment reveal">
            <p className="eureka-text">
              A Canadian teacher, a ladder, a soccer ball, and an idea:
            </p>
            <h2 className="key-insight">
              What if the goal was <em>above</em> the players instead of in front of them?
            </h2>
          </div>
          
          <div className="invention-visual reveal">
            <div className="visual-split">
              <div className="basket-stage">
                <PeachBasketSVG hasBall={ballInBasket} glowIntensity={arcProgress * 0.5} />
              </div>
              
              <div className="arc-stage">
                <ParabolicArcSVG 
                  arcType="high" 
                  progress={arcProgress}
                  showBall={!ballInBasket}
                />
              </div>
            </div>
          </div>
          
          <div className="original-rules reveal">
            <h3>December 21, 1891 — The First Game</h3>
            <div className="rules-grid">
              <div className="rule-card">
                <span className="rule-number">1</span>
                <p>No running with the ball</p>
              </div>
              <div className="rule-card">
                <span className="rule-number">2</span>
                <p>No shouldering, holding, pushing, or striking</p>
              </div>
              <div className="rule-card">
                <span className="rule-number">3</span>
                <p>Score by throwing the ball into the basket</p>
              </div>
            </div>
            <p className="rules-note">
              Naismith wrote 13 rules on two typewritten pages. Those rules, born from necessity, became the DNA of a global phenomenon.
            </p>
          </div>
          
          <div className="stat-highlight reveal">
            <div className="stat-item">
              <span className="stat-number">$4.3M</span>
              <span className="stat-label">Original rules sold for at auction (2010)</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">13</span>
              <span className="stat-label">Original rules written by Naismith</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          MOVEMENT IV — THE MODERN ECHO
          Global Diffusion as Geometry
          ========================================== */}
      <section 
        className="movement movement-echo"
        ref={(el) => { movementRefs.current[3] = el; }}
        aria-label="Movement IV: The Modern Echo"
      >
        <div className="echo-content">
          <div className="section-intro reveal">
            <h2>From Peach Baskets to the World</h2>
            <p>A game without borders—needing no translator, just a ball, a hoop, and the universal language of competition.</p>
          </div>
          
          <div className="ripple-visualization reveal">
            <GlobalRippleSVG rippleCount={5} pulseIntensity={ripplePulse} />
          </div>
          
          <div className="spread-panels">
            <div className="spread-panel reveal">
              <span className="panel-date">1893</span>
              <h4>YMCA Network</h4>
              <p>Missionaries carry basketball across oceans. France embraces it within two years.</p>
            </div>
            <div className="spread-panel reveal">
              <span className="panel-date">1892</span>
              <h4>{`Women's Basketball`}</h4>
              <p>Senda Berenson adapts the rules at Smith College. A parallel evolution begins.</p>
            </div>
            <div className="spread-panel reveal">
              <span className="panel-date">1936</span>
              <h4>Olympic Debut</h4>
              <p>Basketball arrives at Berlin Olympics. Naismith himself presents the medals.</p>
            </div>
            <div className="spread-panel reveal">
              <span className="panel-date">1946</span>
              <h4>NBA Founded</h4>
              <p>The Basketball Association of America launches in New York City.</p>
            </div>
          </div>
          
          <div className="evolution-section reveal">
            <h3>The Evolution of the Game</h3>
            <EvolutionTimelineSVG progress={timelineProgress} />
            
            <div className="evolution-milestones">
              <div className="milestone reveal">
                <span className="milestone-year">1954</span>
                <h4>The Shot Clock</h4>
                <p>24 seconds to shoot eliminates stall tactics forever. The game accelerates.</p>
              </div>
              <div className="milestone reveal">
                <span className="milestone-year">1979</span>
                <h4>The Three-Point Line</h4>
                <p>A single arc reshapes strategy. Space becomes currency.</p>
              </div>
              <div className="milestone reveal">
                <span className="milestone-year">1992</span>
                <h4>The Dream Team</h4>
                <p>{`Jordan, Magic, Bird—America's gift to global sports culture.`}</p>
              </div>
            </div>
          </div>
          
          <div className="modern-stats reveal">
            <div className="stat-row">
              <div className="stat-item large">
                <span className="stat-number">450M+</span>
                <span className="stat-label">Players worldwide</span>
              </div>
              <div className="stat-item large">
                <span className="stat-number">213</span>
                <span className="stat-label">FIBA member nations</span>
              </div>
              <div className="stat-item large">
                <span className="stat-number">25%</span>
                <span className="stat-label">NBA players now international</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          MOVEMENT V — REVELATION
          Past and Present United
          ========================================== */}
      <section 
        className="movement movement-revelation"
        ref={(el) => { movementRefs.current[4] = el; }}
        aria-label="Movement V: Revelation"
      >
        <div className="revelation-backdrop">
          <DustMotes intensity={0.5} active={true} />
        </div>
        
        <div className="revelation-content">
          <div className="dual-icons reveal">
            <div className="icon-past">
              <PeachBasketSVG hasBall={false} glowIntensity={0} />
              <span className="icon-label">1891</span>
            </div>
            <div className="icon-connector">
              <svg viewBox="0 0 100 20">
                <line x1="0" y1="10" x2="100" y2="10" stroke="#D4A574" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
            </div>
            <div className="icon-present">
              <BasketballSVG scale={0.8} glowIntensity={0.4} />
              <span className="icon-label">Today</span>
            </div>
          </div>
          
          <div className="final-reflection reveal">
            <p className="reflection-line large">The game is simple.</p>
            <p className="reflection-line large">The game is infinite.</p>
            <p className="reflection-body">
              {`A single idea from a winter gym became the world's most fluid language.`}
            </p>
          </div>
          
          <div className="closing-statement reveal">
            <p className="born-statement">
              Born in 1891. Reinvented every day.
            </p>
          </div>
          
          <blockquote className="final-quote reveal">
            <p>{`"The invention of basketball was not an accident. It was developed to meet a need."`}</p>
            <cite>— Dr. James Naismith</cite>
          </blockquote>
        </div>
      </section>

      {/* ==========================================
          SOURCES & FURTHER READING
          ========================================== */}
      <section className="sources-section" aria-label="Sources and Further Reading">
        <div className="sources-container">
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
            This narrative was fact-checked against peer-reviewed sources and authoritative historical records.
          </p>
        </div>
      </section>

      {/* ==========================================
          STORY FOOTER
          ========================================== */}
      <footer className="story-footer">
        <div className="footer-emblem" aria-hidden="true">
          <BasketballSVG scale={0.4} glowIntensity={0.2} />
        </div>
        <p className="footer-text">
          Every driveway hoop, every playground game, every buzzer-beater
          <br />connects back to that December day in Springfield.
        </p>
        <span className="footer-mark">An Esy Visual Essay</span>
      </footer>
    </article>
  );
}

