"use client";

import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import "./origin-of-bread.css";

/* ===========================================
   THE ORIGIN OF BREAD
   A Cinematic History of Humanity's First Food
   Mythic + Scientific Hybrid Scrollytelling
   Version II.1 (SVG-Strict)
   ===========================================
   
   DESIGN PHILOSOPHY:
   - Cosmic scale: grains as celestial bodies
   - Primordial darkness illuminated by ember
   - Three-voice narration system
   - Abstract SVG geometry (NO literal maps, NO stock imagery)
   - Mobile-native, 60fps GPU-accelerated
   
   VISUAL MODES:
   1. Sensory Overwhelm — grain cosmos, fire embers
   2. Historical Dreamscape — abstract vector landscapes
   3. Collision Montage — fermentation miracle
   4. Global Threads — abstract network geometry
   
   NARRATION VOICES:
   - Voice 1 (The Seen): Concrete visuals
   - Voice 2 (The Unseen): Cultural layers
   - Voice 3 (The Eternal): Philosophical depth
*/

/* ===========================================
   COSMIC GRAIN FIELD
   Grains drifting like comets through void
   =========================================== */
const CosmicGrainField: React.FC<{ 
  density?: number; 
  lightLevel?: number;
}> = ({ density = 1, lightLevel = 0 }) => {
  const grains = useMemo(() => {
    const count = Math.floor(35 * density);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      startY: -10 - Math.random() * 30,
      size: 2 + Math.random() * 4,
      glow: 0.4 + Math.random() * 0.5,
      duration: 18 + Math.random() * 12,
      delay: Math.random() * 15,
      drift: (Math.random() - 0.5) * 30,
      rotation: Math.random() * 360,
    }));
  }, [density]);

  return (
    <div className="cosmic-grain-field" aria-hidden="true">
      <svg 
        className="grain-cosmos-svg" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="grainGlow" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#F5A623" stopOpacity="1" />
            <stop offset="50%" stopColor="#C7A43C" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#C7A43C" stopOpacity="0" />
          </radialGradient>
          <filter id="grainBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.3" />
          </filter>
        </defs>
        
        {grains.map((grain) => (
          <g
            key={grain.id}
            className="cosmic-grain"
            style={{
              '--start-x': `${grain.x}%`,
              '--start-y': `${grain.startY}%`,
              '--drift': `${grain.drift}px`,
              '--duration': `${grain.duration}s`,
              '--delay': `${grain.delay}s`,
              '--rotation': `${grain.rotation}deg`,
              '--glow-intensity': grain.glow * (0.3 + lightLevel * 0.7),
            } as React.CSSProperties}
          >
            {/* Grain body - elongated ellipse */}
            <ellipse
              cx="0"
              cy="0"
              rx={grain.size * 0.35}
              ry={grain.size}
              fill="url(#grainGlow)"
              filter="url(#grainBlur)"
              opacity={grain.glow}
            />
            {/* Grain highlight */}
            <ellipse
              cx="0"
              cy={-grain.size * 0.3}
              rx={grain.size * 0.15}
              ry={grain.size * 0.4}
              fill="#F2EDE4"
              opacity={0.6}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

/* ===========================================
   PRIMORDIAL EMBER
   The fire that waits below
   =========================================== */
const PrimordialEmber: React.FC<{ intensity?: number }> = ({ intensity = 0.5 }) => (
  <div className="primordial-ember" aria-hidden="true">
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMax slice">
      <defs>
        <radialGradient id="emberCore" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="#D4451A" stopOpacity={intensity} />
          <stop offset="40%" stopColor="#F5A623" stopOpacity={intensity * 0.6} />
          <stop offset="100%" stopColor="#050403" stopOpacity="0" />
        </radialGradient>
        <filter id="emberBlur" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>
      
      {/* Main ember glow */}
      <ellipse 
        cx="200" 
        cy="200" 
        rx="180" 
        ry="120"
        fill="url(#emberCore)"
        filter="url(#emberBlur)"
        className="ember-pulse"
      />
      
      {/* Hot core */}
      <ellipse
        cx="200"
        cy="195"
        rx="60"
        ry="30"
        fill="#F5A623"
        opacity={intensity * 0.4}
        filter="url(#emberBlur)"
        className="ember-core-pulse"
      />
    </svg>
  </div>
);

/* ===========================================
   FLOUR DUST PARTICLES
   Fine mist gathering into dunes
   =========================================== */
const FlourDust: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const particles = useMemo(() => 
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 60 + Math.random() * 40,
      size: 1 + Math.random() * 2,
      opacity: 0.15 + Math.random() * 0.25,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 8,
    })), []
  );

  if (!active) return null;

  return (
    <div className="flour-dust" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="flour-mote"
          style={{
            '--x': `${p.x}%`,
            '--y': `${p.y}%`,
            '--size': `${p.size}px`,
            '--opacity': p.opacity,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

/* ===========================================
   ABSTRACT PLAINS SVG
   Wind-blown grass as curved vector lines
   NO literal maps, only dreamscape
   =========================================== */
const AbstractPlainsSVG: React.FC<{ windIntensity?: number }> = ({ windIntensity = 0.5 }) => (
  <svg 
    className="abstract-plains" 
    viewBox="0 0 1000 500" 
    preserveAspectRatio="xMidYMax slice"
    aria-label="Abstract landscape of wild grass plains"
  >
    <defs>
      <linearGradient id="skyFade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#050403" />
        <stop offset="70%" stopColor="#0D0B09" />
        <stop offset="100%" stopColor="#1A1612" />
      </linearGradient>
      <linearGradient id="grassStroke" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#4A4239" stopOpacity="0.2" />
        <stop offset="60%" stopColor="#8B7355" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#C7A43C" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    
    {/* Sky gradient */}
    <rect x="0" y="0" width="1000" height="350" fill="url(#skyFade)" />
    
    {/* Ground plane */}
    <path 
      d="M0,400 Q250,380 500,390 Q750,400 1000,385 L1000,500 L0,500 Z" 
      fill="#1A1612" 
    />
    
    {/* Abstract grass stalks - curved lines swaying */}
    <g className="grass-field">
      {[...Array(50)].map((_, i) => {
        const x = 20 + (i * 20);
        const height = 80 + Math.sin(i * 0.4) * 50;
        const curve = Math.sin(i * 0.3) * 20 * windIntensity;
        const delay = i * 0.05;
        
        return (
          <path
            key={i}
            className="grass-stalk"
            d={`M${x},450 Q${x + curve * 0.5},${450 - height * 0.5} ${x + curve},${450 - height}`}
            stroke="url(#grassStroke)"
            strokeWidth={1 + Math.random() * 0.8}
            fill="none"
            strokeLinecap="round"
            style={{ '--delay': `${delay}s` } as React.CSSProperties}
          />
        );
      })}
    </g>
  </svg>
);

/* ===========================================
   STONE MORTAR SVG
   Abstract grinding ritual
   =========================================== */
const StoneMortarSVG: React.FC<{ grindProgress?: number }> = ({ grindProgress = 0 }) => {
  const grindAngle = Math.sin(grindProgress * Math.PI * 4) * 12;
  
  return (
    <svg 
      className="stone-mortar" 
      viewBox="0 0 200 180"
      aria-label="Ancient stone mortar and grinding stone"
    >
      <defs>
        <radialGradient id="mortarStone" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#6B6155" />
          <stop offset="70%" stopColor="#4A4239" />
          <stop offset="100%" stopColor="#2A2520" />
        </radialGradient>
        <linearGradient id="grindStone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7A7065" />
          <stop offset="100%" stopColor="#4A4239" />
        </linearGradient>
        <radialGradient id="grainMass" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C7A43C" />
          <stop offset="100%" stopColor="#8B7355" />
        </radialGradient>
      </defs>
      
      {/* Shadow */}
      <ellipse cx="100" cy="165" rx="70" ry="12" fill="#0A0908" opacity="0.4" />
      
      {/* Mortar bowl */}
      <path
        d="M35,150 Q25,110 40,70 Q60,45 100,40 Q140,45 160,70 Q175,110 165,150 Q150,165 100,170 Q50,165 35,150"
        fill="url(#mortarStone)"
      />
      
      {/* Inner cavity */}
      <ellipse cx="100" cy="110" rx="50" ry="30" fill="#1A1612" />
      
      {/* Grain being crushed */}
      <ellipse 
        cx="100" 
        cy="115" 
        rx={20 + grindProgress * 20} 
        ry={10 + grindProgress * 8}
        fill="url(#grainMass)"
        opacity={0.5 + grindProgress * 0.4}
      />
      
      {/* Grinding stone */}
      <g 
        className="grinder"
        style={{ 
          transform: `rotate(${grindAngle}deg)`,
          transformOrigin: '100px 90px'
        }}
      >
        <ellipse cx="100" cy="105" rx="30" ry="15" fill="#4A4239" />
        <ellipse cx="100" cy="60" rx="18" ry="40" fill="url(#grindStone)" />
        <ellipse cx="100" cy="30" rx="12" ry="8" fill="#6B6155" />
      </g>
      
      {/* Scattered grain fragments */}
      {grindProgress > 0.2 && (
        <g className="grain-scatter" opacity={grindProgress * 0.8}>
          {[...Array(8)].map((_, i) => (
            <ellipse
              key={i}
              cx={70 + Math.random() * 60}
              cy={100 + Math.random() * 25}
              rx={1 + Math.random() * 2}
              ry={2 + Math.random() * 3}
              fill="#C7A43C"
              opacity={0.4 + Math.random() * 0.4}
            />
          ))}
        </g>
      )}
    </svg>
  );
};

/* ===========================================
   CLAY BOWL SVG
   Fermentation vessel with rain and bubbles
   =========================================== */
const ClayBowlSVG: React.FC<{ 
  stage: 'empty' | 'rain' | 'fermenting' | 'alive';
}> = ({ stage }) => {
  const hasRain = stage === 'rain' || stage === 'fermenting' || stage === 'alive';
  const hasBubbles = stage === 'fermenting' || stage === 'alive';
  const isAlive = stage === 'alive';
  
  return (
    <svg 
      className={`clay-bowl stage-${stage}`}
      viewBox="0 0 180 220"
      aria-label="Clay vessel with fermenting grain mixture"
    >
      <defs>
        <linearGradient id="clayBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A07050" />
          <stop offset="50%" stopColor="#8B5E3C" />
          <stop offset="100%" stopColor="#6A4530" />
        </linearGradient>
        <radialGradient id="doughSurface" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#D4C4A8" />
          <stop offset="100%" stopColor="#B8A080" />
        </radialGradient>
        <radialGradient id="bubbleShine" cx="30%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#F2EDE4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F2EDE4" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Shadow */}
      <ellipse cx="90" cy="210" rx="55" ry="10" fill="#0A0908" opacity="0.3" />
      
      {/* Bowl body */}
      <path
        d="M30,200 Q20,150 30,90 Q45,50 90,45 Q135,50 150,90 Q160,150 150,200 Q130,215 90,218 Q50,215 30,200"
        fill="url(#clayBody)"
      />
      
      {/* Bowl rim */}
      <ellipse cx="90" cy="52" rx="48" ry="12" fill="#9A6545" />
      <ellipse cx="90" cy="48" rx="42" ry="10" fill="#5A3A28" />
      
      {/* Grain/dough mixture */}
      <ellipse 
        className="dough-mass"
        cx="90" 
        cy={isAlive ? 65 : hasBubbles ? 78 : 90}
        rx={isAlive ? 38 : 35}
        ry={isAlive ? 25 : hasBubbles ? 18 : 12}
        fill="url(#doughSurface)"
      />
      
      {/* Rain drops falling */}
      {hasRain && !isAlive && (
        <g className="rain-drops">
          {[...Array(5)].map((_, i) => (
            <line
              key={i}
              className="rain-drop"
              x1={70 + i * 10}
              y1={10}
              x2={70 + i * 10}
              y2={18}
              stroke="#A8D4E6"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
              style={{ '--delay': `${i * 0.3}s` } as React.CSSProperties}
            />
          ))}
        </g>
      )}
      
      {/* Yeast spores drifting in */}
      {hasBubbles && (
        <g className="yeast-spores">
          {[...Array(6)].map((_, i) => (
            <circle
              key={i}
              className="yeast-spore"
              cx={60 + i * 12}
              cy={30}
              r={1}
              fill="#F2EDE4"
              opacity="0.5"
              style={{ '--delay': `${i * 0.5}s` } as React.CSSProperties}
            />
          ))}
        </g>
      )}
      
      {/* Fermentation bubbles */}
      {hasBubbles && (
        <g className="ferment-bubbles">
          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              className="ferment-bubble"
              cx={65 + (i % 4) * 15}
              cy={isAlive ? 70 : 82}
              r={2 + Math.random() * 2.5}
              fill="url(#bubbleShine)"
              style={{ '--delay': `${i * 0.35}s` } as React.CSSProperties}
            />
          ))}
        </g>
      )}
      
      {/* Clay texture lines */}
      <g stroke="#5A3A28" strokeWidth="1" fill="none" opacity="0.25">
        <path d="M45,160 Q70,155 90,158 Q110,161 135,156" />
        <path d="M40,130 Q65,125 90,128 Q115,131 140,126" />
      </g>
    </svg>
  );
};

/* ===========================================
   CLAY OVEN SVG
   Beehive oven with fire glow
   =========================================== */
const ClayOvenSVG: React.FC<{ firing?: boolean }> = ({ firing = false }) => (
  <svg 
    className={`clay-oven ${firing ? 'firing' : ''}`}
    viewBox="0 0 260 220"
    aria-label="Ancient beehive clay oven"
  >
    <defs>
      <radialGradient id="ovenInterior" cx="50%" cy="70%" r="60%">
        <stop offset="0%" stopColor={firing ? "#D4451A" : "#1A1612"} />
        <stop offset="60%" stopColor={firing ? "#8B2A10" : "#0D0B09"} />
        <stop offset="100%" stopColor="#050403" />
      </radialGradient>
      <linearGradient id="ovenClay" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#9A8070" />
        <stop offset="100%" stopColor="#6A5545" />
      </linearGradient>
    </defs>
    
    {/* Ground */}
    <rect x="10" y="185" width="240" height="35" fill="#2A2520" />
    
    {/* Oven dome */}
    <path
      d="M40,185 Q30,100 70,55 Q130,20 190,55 Q230,100 220,185 Z"
      fill="url(#ovenClay)"
    />
    
    {/* Oven opening */}
    <ellipse cx="130" cy="155" rx="35" ry="45" fill="url(#ovenInterior)" />
    
    {/* Fire glow */}
    {firing && (
      <g className="oven-fire">
        <ellipse 
          cx="130" 
          cy="160" 
          rx="30" 
          ry="40" 
          fill="#D4451A" 
          opacity="0.5"
          className="fire-glow"
        />
        <path
          className="flame"
          d="M115,175 Q110,155 120,140 Q115,150 125,155 Q120,165 115,175"
          fill="#F5A623"
        />
        <path
          className="flame"
          d="M130,180 Q125,150 135,130 Q130,145 140,155 Q135,170 130,180"
          fill="#F5A623"
          style={{ '--delay': '0.2s' } as React.CSSProperties}
        />
        <path
          className="flame"
          d="M145,175 Q140,155 150,142 Q145,152 155,158 Q150,168 145,175"
          fill="#F5A623"
          style={{ '--delay': '0.4s' } as React.CSSProperties}
        />
      </g>
    )}
    
    {/* Oven texture */}
    <g stroke="#5A4A3A" strokeWidth="1" fill="none" opacity="0.2">
      <path d="M55,140 Q100,130 130,135 Q160,140 205,130" />
      <path d="M50,100 Q100,90 130,95 Q160,100 210,90" />
      <path d="M70,65 Q110,55 130,60 Q150,65 190,55" />
    </g>
  </svg>
);

/* ===========================================
   GLOBAL NETWORK SVG
   Abstract geometry — NOT a map
   Cultural diffusion as pulsing nodes
   =========================================== */
const GlobalNetworkSVG: React.FC<{ pulseIntensity?: number }> = ({ pulseIntensity = 0.5 }) => (
  <svg 
    className="global-network"
    viewBox="0 0 600 350"
    aria-label="Abstract network of global bread cultures"
  >
    <defs>
      <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#C7A43C" stopOpacity="0" />
        <stop offset="50%" stopColor="#C7A43C" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#C7A43C" stopOpacity="0" />
      </linearGradient>
      <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    {/* Connection threads — abstract paths */}
    <g className="network-threads">
      <path 
        className="thread" 
        d="M100,175 Q200,100 300,150" 
        stroke="url(#threadGradient)" 
        strokeWidth="1.5" 
        fill="none" 
      />
      <path 
        className="thread" 
        d="M300,150 Q400,200 500,140" 
        stroke="url(#threadGradient)" 
        strokeWidth="1.5" 
        fill="none" 
      />
      <path 
        className="thread" 
        d="M150,250 Q250,180 350,230" 
        stroke="url(#threadGradient)" 
        strokeWidth="1.5" 
        fill="none" 
      />
      <path 
        className="thread" 
        d="M350,230 Q450,280 520,200" 
        stroke="url(#threadGradient)" 
        strokeWidth="1.5" 
        fill="none" 
      />
      <path 
        className="thread" 
        d="M100,175 Q125,220 150,250" 
        stroke="url(#threadGradient)" 
        strokeWidth="1.5" 
        fill="none" 
      />
      <path 
        className="thread" 
        d="M300,150 Q325,190 350,230" 
        stroke="url(#threadGradient)" 
        strokeWidth="1.5" 
        fill="none" 
      />
      <path 
        className="thread" 
        d="M500,140 Q510,170 520,200" 
        stroke="url(#threadGradient)" 
        strokeWidth="1.5" 
        fill="none" 
      />
    </g>
    
    {/* Culture nodes — abstract circles */}
    <g className="culture-nodes">
      {/* Flatbreads node */}
      <g className="node node-1">
        <circle cx="100" cy="175" r="20" fill="#D4451A" opacity={0.2 + pulseIntensity * 0.3} filter="url(#nodeGlow)" />
        <circle cx="100" cy="175" r="12" fill="#D4451A" />
        <circle cx="100" cy="175" r="6" fill="#F2EDE4" />
        <text x="100" y="210" textAnchor="middle" className="node-label">Flatbreads</text>
      </g>
      
      {/* Fermented node */}
      <g className="node node-2">
        <circle cx="300" cy="150" r="24" fill="#C7A43C" opacity={0.2 + pulseIntensity * 0.3} filter="url(#nodeGlow)" />
        <circle cx="300" cy="150" r="14" fill="#C7A43C" />
        <circle cx="300" cy="150" r="7" fill="#F2EDE4" />
        <text x="300" y="190" textAnchor="middle" className="node-label">Leavened</text>
      </g>
      
      {/* Steamed node */}
      <g className="node node-3">
        <circle cx="500" cy="140" r="18" fill="#8B7355" opacity={0.2 + pulseIntensity * 0.3} filter="url(#nodeGlow)" />
        <circle cx="500" cy="140" r="11" fill="#8B7355" />
        <circle cx="500" cy="140" r="5" fill="#F2EDE4" />
        <text x="500" y="175" textAnchor="middle" className="node-label">Steamed</text>
      </g>
      
      {/* Corn node */}
      <g className="node node-4">
        <circle cx="150" cy="250" r="16" fill="#E8B84A" opacity={0.2 + pulseIntensity * 0.3} filter="url(#nodeGlow)" />
        <circle cx="150" cy="250" r="10" fill="#E8B84A" />
        <circle cx="150" cy="250" r="5" fill="#F2EDE4" />
        <text x="150" y="280" textAnchor="middle" className="node-label">Maize</text>
      </g>
      
      {/* Rye node */}
      <g className="node node-5">
        <circle cx="350" cy="230" r="15" fill="#6A5545" opacity={0.2 + pulseIntensity * 0.3} filter="url(#nodeGlow)" />
        <circle cx="350" cy="230" r="9" fill="#6A5545" />
        <circle cx="350" cy="230" r="4" fill="#F2EDE4" />
        <text x="350" y="260" textAnchor="middle" className="node-label">Rye</text>
      </g>
      
      {/* Rice node */}
      <g className="node node-6">
        <circle cx="520" cy="200" r="14" fill="#B8A080" opacity={0.2 + pulseIntensity * 0.3} filter="url(#nodeGlow)" />
        <circle cx="520" cy="200" r="8" fill="#B8A080" />
        <circle cx="520" cy="200" r="4" fill="#F2EDE4" />
        <text x="520" y="230" textAnchor="middle" className="node-label">Rice</text>
      </g>
    </g>
    
    {/* Floating particles */}
    <g className="network-particles">
      {[...Array(20)].map((_, i) => (
        <circle
          key={i}
          className="network-particle"
          cx={80 + (i * 25) % 480}
          cy={100 + (i * 17) % 180}
          r={1 + (i % 2)}
          fill="#C7A43C"
          opacity="0.3"
          style={{ '--delay': `${i * 0.2}s` } as React.CSSProperties}
        />
      ))}
    </g>
  </svg>
);

/* ===========================================
   THREE-VOICE NARRATION COMPONENT
   =========================================== */
interface VoiceProps {
  voice: 'seen' | 'unseen' | 'eternal';
  children: React.ReactNode;
}

const Voice: React.FC<VoiceProps> = ({ voice, children }) => (
  <div className={`voice voice-${voice}`} role="text">
    <span className="voice-marker" aria-hidden="true">
      {voice === 'seen' && '●'}
      {voice === 'unseen' && '◆'}
      {voice === 'eternal' && '✦'}
    </span>
    <p className="voice-text">{children}</p>
  </div>
);

/* ===========================================
   SOURCES DATA
   =========================================== */
const sources = [
  { 
    title: 'Arranz-Otaegui et al. — "Archaeobotanical evidence reveals the origins of bread 14,400 years ago" (PNAS 2018)', 
    url: 'https://www.pnas.org/doi/10.1073/pnas.1801071115' 
  },
  { 
    title: 'Heun et al. — "Site of Einkorn Wheat Domestication Identified by DNA Fingerprinting" (Science 1997)', 
    url: 'https://www.science.org/doi/10.1126/science.278.5341.1312' 
  },
  { 
    title: 'Revedin et al. — "Thirty thousand-year-old evidence of plant food processing" (PNAS 2010)', 
    url: 'https://www.pnas.org/doi/10.1073/pnas.1006993107' 
  },
  { 
    title: 'Rubel, William — "Bread: A Global History" (Reaktion Books)', 
    url: 'https://reaktionbooks.co.uk/work/bread' 
  },
  { 
    title: 'McGee, Harold — "On Food and Cooking: The Science and Lore of the Kitchen" (Scribner)', 
    url: 'https://www.simonandschuster.com/books/On-Food-and-Cooking/Harold-McGee/9780684800011' 
  },
  { 
    title: 'Tannahill, Reay — "Food in History" (Three Rivers Press)', 
    url: 'https://www.amazon.com/Food-History-Reay-Tannahill/dp/0517884046' 
  },
];

/* ===========================================
   MAIN CLIENT COMPONENT
   =========================================== */
export default function OriginOfBreadClient() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightLevel, setLightLevel] = useState(0);
  const [grindProgress, setGrindProgress] = useState(0);
  const [bowlStage, setBowlStage] = useState<'empty' | 'rain' | 'fermenting' | 'alive'>('empty');
  const [ovenFiring, setOvenFiring] = useState(false);
  const [networkPulse, setNetworkPulse] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const movementRefs = useRef<(HTMLElement | null)[]>([]);

  // Scroll handler
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1);
    setScrollProgress(progress);

    // Update state based on which movement is in view
    movementRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const threshold = window.innerHeight * 0.5;
        
        if (rect.top < threshold && rect.bottom > 0) {
          const sectionProgress = Math.max(0, Math.min(1, (threshold - rect.top) / rect.height));
          
          // Movement I: Invocation — light increases with scroll
          if (index === 0) {
            setLightLevel(sectionProgress);
          }
          
          // Movement II: Ancestral — grinding progress
          if (index === 1) {
            setGrindProgress(sectionProgress);
          }
          
          // Movement III: Collision — fermentation stages
          if (index === 2) {
            if (sectionProgress < 0.25) setBowlStage('empty');
            else if (sectionProgress < 0.5) setBowlStage('rain');
            else if (sectionProgress < 0.75) setBowlStage('fermenting');
            else setBowlStage('alive');
            setOvenFiring(sectionProgress > 0.6);
          }
          
          // Movement IV: Echo — network pulse
          if (index === 3) {
            setNetworkPulse(sectionProgress);
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
    <article className="origin-of-bread" ref={containerRef}>
      
      {/* ==========================================
          MOVEMENT I — INVOCATION
          Sensory Overwhelm Mode
          ========================================== */}
      <section 
        className="movement movement-invocation"
        ref={(el) => { movementRefs.current[0] = el; }}
        aria-label="Movement I: Invocation"
      >
        <CosmicGrainField density={1.2} lightLevel={lightLevel} />
        <PrimordialEmber intensity={0.3 + lightLevel * 0.5} />
        <FlourDust active={lightLevel > 0.3} />
        
        <div className="invocation-content">
          <div className="invocation-stage">
            <h1 className="cinematic-title reveal">
              <span className="title-line">The Origin</span>
              <span className="title-line title-accent">of Bread</span>
            </h1>
            
            <p className="cinematic-subtitle reveal">
              A Cinematic History of Humanity's First Food
            </p>
          </div>
          
          <div className="voice-stack reveal">
            <Voice voice="seen">
              Grain falls through darkness, landing on stone.
            </Voice>
            
            <Voice voice="unseen">
              Long before cities, before metal, before names… humans reached for wild grass and found possibility.
            </Voice>
            
            <Voice voice="eternal">
              Civilization begins when hunger meets imagination.
            </Voice>
          </div>
          
          <div className="scroll-indicator reveal" aria-hidden="true">
            <span>Descend</span>
            <div className="scroll-line" />
          </div>
        </div>
      </section>

      {/* ==========================================
          MOVEMENT II — THE ANCESTRAL PULSE
          Historical Dreamscape Mode
          ========================================== */}
      <section 
        className="movement movement-ancestral"
        ref={(el) => { movementRefs.current[1] = el; }}
        aria-label="Movement II: The Ancestral Pulse"
      >
        <div className="ancestral-backdrop">
          <AbstractPlainsSVG windIntensity={0.5 + grindProgress * 0.5} />
        </div>
        
        <div className="ancestral-content">
          <div className="movement-label reveal">MOVEMENT II</div>
          <h2 className="section-heading reveal">The Ancestral Pulse</h2>
          
          <div className="voice-block reveal">
            <Voice voice="seen">
              Hands crush wild kernels between stones.
            </Voice>
            
            <Voice voice="unseen">
              They gather einkorn and emmer from the hillsides, not knowing they are gathering their future.
            </Voice>
            
            <Voice voice="eternal">
              Every origin is small, fragile, and nearly forgotten.
            </Voice>
          </div>
          
          <div className="ritual-scene reveal">
            <div className="ritual-visual">
              <StoneMortarSVG grindProgress={grindProgress} />
            </div>
            <div className="ritual-narrative">
              <p className="scientific-note">
                <span className="era-badge">30,000 BCE</span>
                Archaeology reveals traces of wild-grain grinding long before agriculture.
                Paste smeared onto hot stones. Early unleavened discs charred by fire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          MOVEMENT III — THE COLLISION OF WORLDS
          Collision Montage Mode
          ========================================== */}
      <section 
        className="movement movement-collision"
        ref={(el) => { movementRefs.current[2] = el; }}
        aria-label="Movement III: The Collision of Worlds"
      >
        <div className="collision-content">
          <div className="movement-label reveal">MOVEMENT III</div>
          <h2 className="section-heading reveal">The Collision of Worlds</h2>
          
          <p className="collision-catalyst reveal">
            The accidental discovery of <em>fermentation</em>.
          </p>
          
          <div className="collision-triptych">
            <div className="triptych-panel reveal">
              <ClayBowlSVG stage={bowlStage} />
              <div className="panel-caption">
                <h3>The Accident</h3>
                <p>A forgotten clay bowl fills with rain. Wild yeast drifts into the mixture.</p>
              </div>
            </div>
            
            <div className="triptych-panel triptych-center reveal">
              <div className="voice-block">
                <Voice voice="seen">
                  The wet grain stirs. The surface rises.
                </Voice>
                <Voice voice="unseen">
                  Wild yeast slips into the mixture, an unseen guest that rewrites human hunger.
                </Voice>
                <Voice voice="eternal">
                  From a mistake came the architecture of nourishment.
                </Voice>
              </div>
              <p className="scientific-note">
                Wild <em>Saccharomyces</em> yeasts ferment starch → CO₂ forms → dough expands.
                The first leavened bread is born through pure accident and observation.
              </p>
            </div>
            
            <div className="triptych-panel reveal">
              <ClayOvenSVG firing={ovenFiring} />
              <div className="panel-caption">
                <h3>The Birth</h3>
                <p>A stylized clay oven glows softly. Heat transforms the risen mass.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          MOVEMENT IV — THE MODERN ECHO
          Global Threads Mode
          ========================================== */}
      <section 
        className="movement movement-echo"
        ref={(el) => { movementRefs.current[3] = el; }}
        aria-label="Movement IV: The Modern Echo"
      >
        <div className="echo-content">
          <div className="movement-label reveal">MOVEMENT IV</div>
          <h2 className="section-heading reveal">The Modern Echo</h2>
          
          <p className="echo-intro reveal">
            A global network rendered in minimalist geometry. Lines pulse outward as bread evolves across continents and centuries.
          </p>
          
          <div className="network-stage reveal">
            <GlobalNetworkSVG pulseIntensity={networkPulse} />
          </div>
          
          <div className="echo-closing reveal">
            <Voice voice="eternal">
              What began as accident became ritual. What was survival became culture.
              In every loaf, the memory of ten thousand generations.
            </Voice>
          </div>
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
            This narrative draws from peer-reviewed archaeological research and authoritative historical scholarship.
          </p>
        </div>
      </section>

      {/* ==========================================
          STORY END
          ========================================== */}
      <footer className="story-footer">
        <div className="footer-emblem" aria-hidden="true">
          <svg viewBox="0 0 60 40">
            <ellipse cx="30" cy="25" rx="22" ry="12" fill="#C7A43C" opacity="0.8" />
            <path d="M12,23 Q30,15 48,23" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>
        <p className="footer-text">
          Grain remembers. Stone remembers. Fire remembers.
          <br />In every rising loaf, the echo of our beginning.
        </p>
        <span className="footer-mark">An Esy Visual Essay</span>
      </footer>
    </article>
  );
}

