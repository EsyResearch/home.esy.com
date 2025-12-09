"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import "./ledger.css";

// ============================================================================
// DESIGN RESEARCH REPORT: THE LEDGER
// ============================================================================
// Visual Archaeology: Metal coins, paper currency, digital transactions
// Color Palette: Coin gold, patina bronze, dollar green, electric cyan
// Typography: Institutional serif for gravitas, clean sans for readability
// Animation Philosophy: Heavy/metallic → paper flutter → digital dissolution
// Unique Interactions: Coin mint animation, value counter transformation
// ============================================================================

// ==================== VALUE DISPLAY MAPPINGS ====================
const VALUE_DISPLAYS = [
  { era: "ancient", symbol: "🐚 3", label: "COWRIE SHELLS" },
  { era: "coin", symbol: "III", label: "DENARII" },
  { era: "coin", symbol: "£3", label: "POUNDS" },
  { era: "paper", symbol: "$3", label: "DOLLARS" },
  { era: "digital", symbol: "₿0.00005", label: "BITCOIN" },
];

// ==================== SVG ILLUSTRATIONS ====================

const HundredDollarBill: React.FC = () => (
  <svg viewBox="0 0 300 150" className="hero-bill" role="img" aria-labelledby="bill-title bill-desc">
    <title id="bill-title">One Hundred Dollar Bill</title>
    <desc id="bill-desc">A stylized representation of a US hundred dollar bill, the central visual metaphor for the essay&apos;s opening question</desc>
    <defs>
      <linearGradient id="bill-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#85BB65" />
        <stop offset="50%" stopColor="#6B9B4D" />
        <stop offset="100%" stopColor="#85BB65" />
      </linearGradient>
      <pattern id="bill-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
        <circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)" />
      </pattern>
    </defs>
    {/* Bill base */}
    <rect x="10" y="10" width="280" height="130" rx="5" fill="url(#bill-gradient)" />
    <rect x="10" y="10" width="280" height="130" rx="5" fill="url(#bill-pattern)" />
    {/* Border */}
    <rect x="20" y="20" width="260" height="110" rx="3" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
    {/* Denomination */}
    <text x="150" y="85" textAnchor="middle" fill="#1A3A1A" fontSize="48" fontWeight="bold" fontFamily="var(--font-display)">$100</text>
    {/* Corner numbers */}
    <text x="35" y="45" fill="#1A3A1A" fontSize="14" fontWeight="bold" fontFamily="var(--font-mono)">100</text>
    <text x="265" y="45" textAnchor="end" fill="#1A3A1A" fontSize="14" fontWeight="bold" fontFamily="var(--font-mono)">100</text>
    <text x="35" y="120" fill="#1A3A1A" fontSize="14" fontWeight="bold" fontFamily="var(--font-mono)">100</text>
    <text x="265" y="120" textAnchor="end" fill="#1A3A1A" fontSize="14" fontWeight="bold" fontFamily="var(--font-mono)">100</text>
  </svg>
);

const BarterScene: React.FC = () => (
  <svg viewBox="0 0 400 250" className="barter-illustration" role="img" aria-labelledby="barter-title barter-desc">
    <title id="barter-title">The Barter Problem</title>
    <desc id="barter-desc">Two figures attempting to trade — one with fish, one with grain — illustrating the double coincidence of wants problem that money solved</desc>
    {/* Background */}
    <rect x="0" y="200" width="400" height="50" fill="var(--patina-bronze-dark, #8B5A2B)" opacity="0.3" />
    
    {/* Person 1 - has fish */}
    <g className="trader trader-1">
      <circle cx="100" cy="120" r="25" fill="var(--paper-cream, #F5F5DC)" />
      <rect x="85" y="145" width="30" height="50" fill="var(--patina-bronze, #CD7F32)" rx="5" />
      {/* Fish */}
      <ellipse cx="60" cy="100" rx="25" ry="10" fill="#4A90A4" />
      <polygon points="35,100 25,90 25,110" fill="#4A90A4" />
    </g>
    
    {/* Question marks */}
    <text x="200" y="100" textAnchor="middle" fill="var(--coin-gold, #D4AF37)" fontSize="40" fontWeight="bold">?</text>
    
    {/* Person 2 - wants cloth, has grain */}
    <g className="trader trader-2">
      <circle cx="300" cy="120" r="25" fill="var(--paper-cream, #F5F5DC)" />
      <rect x="285" y="145" width="30" height="50" fill="var(--patina-bronze, #CD7F32)" rx="5" />
      {/* Grain sack */}
      <ellipse cx="340" cy="110" rx="20" ry="25" fill="#DAA520" />
      <rect x="330" y="85" width="20" height="10" fill="#8B4513" />
    </g>
    
    {/* X mark showing trade failure */}
    <g stroke="var(--patina-bronze, #CD7F32)" strokeWidth="4" opacity="0.6">
      <line x1="160" y1="130" x2="240" y2="170" />
      <line x1="240" y1="130" x2="160" y2="170" />
    </g>
    
    {/* Labels */}
    <text x="60" y="230" textAnchor="middle" fill="var(--text-secondary, #A0A0A0)" fontSize="12" fontFamily="var(--font-body)">Has: Fish</text>
    <text x="60" y="245" textAnchor="middle" fill="var(--text-secondary, #A0A0A0)" fontSize="12" fontFamily="var(--font-body)">Wants: Shoes</text>
    <text x="340" y="230" textAnchor="middle" fill="var(--text-secondary, #A0A0A0)" fontSize="12" fontFamily="var(--font-body)">Has: Grain</text>
    <text x="340" y="245" textAnchor="middle" fill="var(--text-secondary, #A0A0A0)" fontSize="12" fontFamily="var(--font-body)">Wants: Fish</text>
  </svg>
);

const CowrieShells: React.FC<{ animate: boolean }> = ({ animate }) => (
  <svg viewBox="0 0 350 200" className="cowrie-illustration" role="img" aria-labelledby="cowrie-title cowrie-desc">
    <title id="cowrie-title">Cowrie Shell Currency</title>
    <desc id="cowrie-desc">Cowrie shells arranged in groups, representing one of humanity&apos;s first forms of money used across Africa, Asia, and the Pacific</desc>
    {/* Shell shapes - deterministic positions */}
    {[
      { cx: 60, cy: 80, delay: 0 },
      { cx: 120, cy: 70, delay: 0.1 },
      { cx: 180, cy: 85, delay: 0.2 },
      { cx: 240, cy: 75, delay: 0.3 },
      { cx: 300, cy: 80, delay: 0.4 },
      { cx: 90, cy: 130, delay: 0.5 },
      { cx: 150, cy: 140, delay: 0.6 },
      { cx: 210, cy: 135, delay: 0.7 },
      { cx: 270, cy: 125, delay: 0.8 },
    ].map((shell, i) => (
      <g 
        key={i} 
        className={`cowrie-shell ${animate ? 'minted' : ''}`}
        style={{ 
          opacity: animate ? 1 : 0,
          transform: animate ? 'scale(1)' : 'scale(0.5)',
          transition: `all 0.5s ease ${shell.delay}s`
        }}
      >
        <ellipse cx={shell.cx} cy={shell.cy} rx="22" ry="15" fill="#F5DEB3" />
        <ellipse cx={shell.cx} cy={shell.cy} rx="18" ry="10" fill="#DEB887" />
        {/* Shell opening */}
        <ellipse cx={shell.cx} cy={shell.cy + 2} rx="8" ry="3" fill="#8B7355" />
        {/* Ridges */}
        <path d={`M${shell.cx - 12} ${shell.cy - 5} Q${shell.cx} ${shell.cy - 12} ${shell.cx + 12} ${shell.cy - 5}`} 
              fill="none" stroke="#D2B48C" strokeWidth="1" />
      </g>
    ))}
    {/* Label */}
    <text x="175" y="180" textAnchor="middle" fill="var(--text-secondary, #A0A0A0)" fontSize="14" fontFamily="var(--font-body)">
      Cowrie Shells • Used until 20th century
    </text>
  </svg>
);

const LydianCoin: React.FC<{ progress: number }> = ({ progress }) => {
  const rotation = progress * 360;
  return (
    <svg viewBox="0 0 200 200" className="coin-illustration" role="img" aria-labelledby="lydian-title lydian-desc">
      <title id="lydian-title">Lydian Electrum Coin</title>
      <desc id="lydian-desc">The first standardized coin, minted in Lydia around 600 BC, made from electrum (gold-silver alloy) and featuring a lion&apos;s head</desc>
      <defs>
        <linearGradient id="coin-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0D78C" />
          <stop offset="30%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <filter id="coin-shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.4" />
        </filter>
      </defs>
      <g style={{ transform: `rotateY(${rotation}deg)`, transformOrigin: 'center' }}>
        {/* Coin base */}
        <circle cx="100" cy="100" r="80" fill="url(#coin-gold-grad)" filter="url(#coin-shadow)" />
        {/* Outer ring */}
        <circle cx="100" cy="100" r="75" fill="none" stroke="#9E7B1B" strokeWidth="3" />
        <circle cx="100" cy="100" r="65" fill="none" stroke="#9E7B1B" strokeWidth="1" />
        {/* Lion head (simplified) */}
        <g fill="#8B6914">
          {/* Mane */}
          <circle cx="100" cy="90" r="30" />
          {/* Face */}
          <ellipse cx="100" cy="100" rx="20" ry="22" fill="#B8860B" />
          {/* Eyes */}
          <circle cx="92" cy="95" r="3" fill="#4A3C1A" />
          <circle cx="108" cy="95" r="3" fill="#4A3C1A" />
          {/* Nose */}
          <ellipse cx="100" cy="105" rx="5" ry="4" fill="#6B4E1A" />
          {/* Mouth */}
          <path d="M90 115 Q100 122 110 115" fill="none" stroke="#4A3C1A" strokeWidth="2" />
        </g>
        {/* Text around edge */}
        <text x="100" y="170" textAnchor="middle" fill="#6B4E1A" fontSize="10" fontFamily="var(--font-display)">
          LYDIA • 600 BC
        </text>
      </g>
    </svg>
  );
};

const PaperMoneyEvolution: React.FC = () => (
  <svg viewBox="0 0 400 300" className="paper-illustration" role="img" aria-labelledby="paper-title paper-desc">
    <title id="paper-title">Paper Money Evolution</title>
    <desc id="paper-desc">The evolution from Chinese jiaozi (the world&apos;s first paper money from Song Dynasty) to modern banknotes</desc>
    <defs>
      <linearGradient id="jiaozi-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F5F5DC" />
        <stop offset="100%" stopColor="#DEB887" />
      </linearGradient>
    </defs>
    
    {/* Song Dynasty Jiaozi */}
    <g className="jiaozi">
      <rect x="30" y="50" width="140" height="200" rx="3" fill="url(#jiaozi-grad)" />
      <rect x="40" y="60" width="120" height="180" fill="none" stroke="#8B4513" strokeWidth="1" />
      {/* Chinese characters (stylized) */}
      <text x="100" y="120" textAnchor="middle" fill="#4A3C1A" fontSize="24" fontFamily="serif">交子</text>
      <text x="100" y="150" textAnchor="middle" fill="#8B4513" fontSize="12">Song Dynasty</text>
      <text x="100" y="170" textAnchor="middle" fill="#8B4513" fontSize="12">1024 AD</text>
      {/* Red seal */}
      <rect x="70" y="190" width="60" height="40" fill="#CC3300" opacity="0.8" rx="2" />
      <text x="100" y="215" textAnchor="middle" fill="#F5F5DC" fontSize="10">官印</text>
    </g>
    
    {/* Arrow */}
    <g fill="var(--coin-gold, #D4AF37)">
      <polygon points="200,150 220,140 220,160" />
      <rect x="180" y="147" width="20" height="6" />
    </g>
    
    {/* Modern banknote */}
    <g className="modern-note">
      <rect x="240" y="80" width="140" height="70" rx="3" fill="#85BB65" />
      <rect x="245" y="85" width="130" height="60" fill="none" stroke="#5A8A3C" strokeWidth="1" />
      <text x="310" y="120" textAnchor="middle" fill="#1A3A1A" fontSize="20" fontWeight="bold" fontFamily="var(--font-mono)">$100</text>
      <text x="310" y="138" textAnchor="middle" fill="#1A3A1A" fontSize="8">FEDERAL RESERVE NOTE</text>
    </g>
    
    {/* Bank of England note */}
    <g className="boe-note">
      <rect x="240" y="170" width="140" height="70" rx="3" fill="#E8D5B7" />
      <rect x="245" y="175" width="130" height="60" fill="none" stroke="#8B7355" strokeWidth="1" />
      <text x="310" y="210" textAnchor="middle" fill="#4A3C1A" fontSize="18" fontWeight="bold" fontFamily="var(--font-display)">£10</text>
      <text x="310" y="228" textAnchor="middle" fill="#4A3C1A" fontSize="8">BANK OF ENGLAND • 1694</text>
    </g>
  </svg>
);

const DigitalMoney: React.FC<{ animate: boolean }> = ({ animate }) => {
  // Deterministic particle positions
  const particles = [
    { x: 50, y: 60, delay: 0 }, { x: 120, y: 40, delay: 0.2 }, { x: 180, y: 70, delay: 0.4 },
    { x: 250, y: 50, delay: 0.6 }, { x: 320, y: 80, delay: 0.8 }, { x: 80, y: 120, delay: 1 },
    { x: 150, y: 100, delay: 1.2 }, { x: 220, y: 130, delay: 1.4 }, { x: 290, y: 110, delay: 1.6 },
    { x: 100, y: 170, delay: 1.8 }, { x: 200, y: 160, delay: 2 }, { x: 300, y: 150, delay: 2.2 },
  ];
  
  return (
    <svg viewBox="0 0 400 250" className="digital-illustration" role="img" aria-labelledby="digital-title digital-desc">
      <title id="digital-title">Digital Money</title>
      <desc id="digital-desc">Abstract representation of digital money as flowing data streams and particles, representing the 97% of money that exists only as electronic entries</desc>
      <defs>
        <linearGradient id="digital-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Data streams */}
      <g opacity={animate ? 1 : 0} style={{ transition: 'opacity 1s ease' }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${20 + i * 80} 220 Q${60 + i * 80} ${100 + i * 20} ${100 + i * 60} 30`}
            fill="none"
            stroke="url(#digital-grad)"
            strokeWidth="2"
            opacity="0.5"
            strokeDasharray="5,5"
          />
        ))}
      </g>
      
      {/* Floating particles */}
      {particles.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4 + (i % 3)}
          fill="#00D4FF"
          filter="url(#glow)"
          className="digital-particle"
          style={{
            opacity: animate ? 0.8 : 0,
            animationDelay: `${p.delay}s`,
            transition: `opacity 0.5s ease ${p.delay}s`
          }}
        />
      ))}
      
      {/* Binary code snippets */}
      <g fill="#00D4FF" opacity={animate ? 0.4 : 0} style={{ transition: 'opacity 1s ease 0.5s' }} fontFamily="var(--font-mono)" fontSize="10">
        <text x="30" y="200">01001101 01001111</text>
        <text x="180" y="220">11010010 10101001</text>
        <text x="280" y="190">01100101 01111001</text>
      </g>
      
      {/* Central statistic */}
      <g className="central-stat" filter="url(#glow)">
        <text x="200" y="125" textAnchor="middle" fill="#00D4FF" fontSize="36" fontWeight="bold" fontFamily="var(--font-mono)">
          97%
        </text>
        <text x="200" y="150" textAnchor="middle" fill="#A0A0A0" fontSize="12" fontFamily="var(--font-body)">
          of money is digital
        </text>
      </g>
    </svg>
  );
};

const BitcoinBlock: React.FC = () => (
  <svg viewBox="0 0 200 200" className="bitcoin-illustration" role="img" aria-labelledby="btc-title btc-desc">
    <title id="btc-title">Bitcoin Genesis Block</title>
    <desc id="btc-desc">The Bitcoin symbol representing Satoshi Nakamoto&apos;s 2009 creation — the first decentralized cryptocurrency</desc>
    <defs>
      <linearGradient id="btc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F7931A" />
        <stop offset="100%" stopColor="#E87C0F" />
      </linearGradient>
      <filter id="btc-glow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    {/* Outer glow ring */}
    <circle cx="100" cy="100" r="85" fill="none" stroke="#F7931A" strokeWidth="1" opacity="0.3" />
    <circle cx="100" cy="100" r="90" fill="none" stroke="#F7931A" strokeWidth="1" opacity="0.2" />
    
    {/* Main coin */}
    <circle cx="100" cy="100" r="70" fill="url(#btc-grad)" filter="url(#btc-glow)" />
    
    {/* Bitcoin B symbol */}
    <g fill="#FFFFFF">
      {/* Vertical bars */}
      <rect x="80" y="55" width="8" height="90" />
      <rect x="112" y="55" width="8" height="90" />
      {/* B shape */}
      <path d="M88 60 H110 Q130 60 130 80 Q130 100 110 100 H88 Z" />
      <path d="M88 100 H115 Q135 100 135 120 Q135 140 115 140 H88 Z" />
      {/* Inner cuts */}
      <rect x="95" y="70" width="20" height="20" fill="url(#btc-grad)" />
      <rect x="95" y="110" width="25" height="20" fill="url(#btc-grad)" />
    </g>
    
    {/* Date */}
    <text x="100" y="175" textAnchor="middle" fill="#F7931A" fontSize="12" fontFamily="var(--font-mono)">
      Jan 3, 2009
    </text>
  </svg>
);

// ==================== SECTION COMPONENT ====================

const Section: React.FC<{
  id: string;
  className?: string;
  children: React.ReactNode;
  onVisible?: () => void;
}> = ({ id, className = "", children, onVisible }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onVisible?.();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`ledger-section ${className} ${isVisible ? "visible" : ""}`}
    >
      {children}
    </section>
  );
};

// ==================== MAIN COMPONENT ====================

const LedgerClient: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [valueIndex, setValueIndex] = useState(0);
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({});

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, window.scrollY / scrollHeight));
    setScrollProgress(progress);
    
    // Update value display based on scroll progress
    const newIndex = Math.min(
      VALUE_DISPLAYS.length - 1,
      Math.floor(progress * VALUE_DISPLAYS.length)
    );
    setValueIndex(newIndex);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const markSectionVisible = (sectionId: string) => {
    setSectionVisibility(prev => ({ ...prev, [sectionId]: true }));
  };

  const currentValue = VALUE_DISPLAYS[valueIndex];

  return (
    <div className="ledger-story">
      {/* Progress Bar */}
      <div className="scroll-progress-bar">
        <div className="scroll-progress-fill" style={{ width: `${scrollProgress * 100}%` }} />
      </div>

      {/* Value Counter (Unique Interaction) */}
      <div className={`value-counter era-${currentValue.era}`}>
        <span className="value-label">{currentValue.label}</span>
        <span className="value-amount">{currentValue.symbol}</span>
      </div>

      {/* ==================== SECTION 1: THE QUESTION (HERO) ==================== */}
      <Section id="hero" className="hero-section full-bleed">
        <div className="hero-visual">
          <HundredDollarBill />
        </div>
        
        <h1 className="hero-title">
          <span className="title-line">THE</span>
          <span className="title-line accent">LEDGER</span>
        </h1>
        
        <p className="hero-subtitle">
          How Humanity Learned to Trust an Idea
        </p>
        
        <div className="hero-question">
          What makes this piece of paper worth $100? It&apos;s not the cotton. 
          It&apos;s not the ink. It&apos;s something far more extraordinary: 
          <strong> collective belief</strong>.
        </div>
        
        <div className="scroll-indicator">
          <span>Scroll to explore 5,000 years</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </Section>

      {/* ==================== SECTION 2: BEFORE MONEY ==================== */}
      <Section id="before-money" className="split-screen" onVisible={() => markSectionVisible('before-money')}>
        <div className="split-visual">
          <BarterScene />
        </div>
        
        <div className="split-content">
          <span className="section-badge">BEFORE MONEY</span>
          <h2>The Double Coincidence Problem</h2>
          <p className="lead">
            Before money, there was barter. And barter had a fatal flaw.
          </p>
          <p>
            Imagine you&apos;re a fisherman with extra salmon. You need shoes. 
            You find a cobbler—but he doesn&apos;t want fish. He wants grain. 
            Now you must find a farmer who wants fish AND has extra grain 
            to trade for shoes you don&apos;t have yet.
          </p>
          <p>
            Economists call this the <strong>double coincidence of wants</strong>. 
            Both parties must want exactly what the other has, at exactly the same time. 
            It almost never happens.
          </p>
          <p>
            Humanity needed an intermediary. Something everyone would accept. 
            Something that could store value across time and space.
          </p>
        </div>
      </Section>

      {/* ==================== SECTION 3: THE FIRST MONEY (TIMELINE) ==================== */}
      <Section id="first-money" className="timeline-section" onVisible={() => markSectionVisible('first-money')}>
        <div className="timeline-header">
          <span className="section-badge">THE FIRST MONEY</span>
          <h2>Before Coins, There Was Trust</h2>
          <p className="lead">
            The earliest &quot;money&quot; wasn&apos;t made of metal—it was made of meaning.
          </p>
        </div>
        
        <div className="split-visual" style={{ marginBottom: '3rem' }}>
          <CowrieShells animate={sectionVisibility['first-money']} />
        </div>
        
        <div className="timeline">
          <div className="timeline-line" />
          
          <div className="timeline-event bronze">
            <div className="event-year">~3000 BC</div>
            <div className="event-content">
              <h3>Cowrie Shells</h3>
              <p>
                Small, beautiful, portable, and impossible to counterfeit—cowrie shells 
                became currency across Africa, Asia, and the Pacific. They remained 
                legal tender in parts of Africa until the 20th century.
              </p>
            </div>
          </div>
          
          <div className="timeline-event bronze">
            <div className="event-year">~2000 BC</div>
            <div className="event-content">
              <h3>Cattle & Grain</h3>
              <p>
                The Latin word for money, &quot;pecunia,&quot; comes from &quot;pecus&quot; (cattle). 
                In agricultural societies, livestock was wealth—living, breathing capital 
                that could reproduce and provide milk.
              </p>
            </div>
          </div>
          
          <div className="timeline-event bronze">
            <div className="event-year">~1500 BC</div>
            <div className="event-content">
              <h3>Salt (Salary&apos;s Origin)</h3>
              <p>
                Roman soldiers were sometimes paid in salt—&quot;salarium,&quot; 
                the root of our word &quot;salary.&quot; Salt preserved food, purified, 
                and was universally desired. To be &quot;worth your salt&quot; meant 
                to earn your pay.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ==================== SECTION 4: THE COIN (STICKY SCROLL) ==================== */}
      <Section id="the-coin" className="sticky-scroll-section">
        <div className="sticky-element">
          <LydianCoin progress={scrollProgress} />
          <h2 style={{ marginTop: '2rem', color: 'var(--coin-gold)' }}>The Coin</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', textAlign: 'center' }}>
            When weight became worth, and metal became trust
          </p>
        </div>
        
        <div className="scroll-panels">
          <div className="scroll-panel">
            <h3>Lydia, 600 BC</h3>
            <p>
              In the kingdom of Lydia (modern Turkey), King Alyattes did something 
              revolutionary: he stamped lumps of electrum (gold-silver alloy) with 
              a lion&apos;s head—the royal seal guaranteeing weight and purity.
            </p>
            <p>
              For the first time, you didn&apos;t need to weigh or test metal. 
              The king&apos;s stamp <em>was</em> the guarantee. Trust in authority 
              replaced trust in measurement.
            </p>
          </div>
          
          <div className="scroll-panel">
            <h3>Croesus&apos;s Innovation</h3>
            <p>
              King Croesus of Lydia (560-547 BC) refined the system by minting 
              pure gold and pure silver coins separately. His wealth became legendary—
              &quot;rich as Croesus&quot; we still say today.
            </p>
            <p>
              Coins solved the divisibility problem: you couldn&apos;t easily split 
              a cow, but you could break a gold piece into smaller denominations.
            </p>
          </div>
          
          <div className="scroll-panel">
            <h3>The Roman Denarius</h3>
            <p>
              Rome spread coinage across Europe. The denarius became so trusted 
              that &quot;denier&quot; (France), &quot;dinar&quot; (Middle East), 
              and &quot;denaro&quot; (Italy) all derive from it.
            </p>
            <p>
              But Rome also taught a dangerous lesson: when empires debased their 
              currency—mixing silver with cheaper metals—inflation destroyed trust, 
              and empires fell.
            </p>
          </div>
        </div>
      </Section>

      {/* ==================== SECTION 5: THE PAPER PROMISE (COMPARISON) ==================== */}
      <Section id="paper-promise" className="comparison-section">
        <div className="comparison-header">
          <span className="section-badge paper-era">THE PAPER PROMISE</span>
          <h2>When Trust Left the Metal</h2>
        </div>
        
        <div className="split-visual" style={{ marginBottom: '3rem' }}>
          <PaperMoneyEvolution />
        </div>
        
        <div className="comparison-container">
          <div className="comparison-panel before">
            <h3>Coins</h3>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
              <li>Heavy to transport</li>
              <li>Value = metal content</li>
              <li>Physical limits on supply</li>
              <li>Hard to counterfeit</li>
              <li>Universally recognized</li>
            </ul>
          </div>
          
          <div className="comparison-divider">
            <div className="divider-year">1024 AD</div>
            <div className="divider-arrow">→</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Song Dynasty<br />China
            </p>
          </div>
          
          <div className="comparison-panel after">
            <h3>Paper</h3>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
              <li>Lightweight, portable</li>
              <li>Value = government promise</li>
              <li>Unlimited supply potential</li>
              <li>Easier to counterfeit</li>
              <li>Requires institutional trust</li>
            </ul>
          </div>
        </div>
        
        <div style={{ maxWidth: '700px', margin: '3rem auto', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            The Song Dynasty&apos;s &quot;jiaozi&quot; was the world&apos;s first government-issued 
            paper money. Marco Polo was astounded: &quot;The Great Khan causes the bark of trees, 
            made into something like paper, to pass for money all over his country.&quot;
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '1rem' }}>
            Europe wouldn&apos;t catch up for 600 years. The Bank of England, founded in 1694, 
            began issuing paper notes backed by gold. The modern financial system was born.
          </p>
        </div>
      </Section>

      {/* ==================== SECTION 6: THE GREAT EXPERIMENT (QUOTE MONUMENT) ==================== */}
      <Section id="fiat-era" className="quote-monument-section">
        <div className="monument-backdrop">
          <div style={{ 
            fontSize: 'clamp(4rem, 15vw, 10rem)', 
            fontWeight: 'bold', 
            color: 'var(--coin-gold)',
            opacity: 0.2,
            fontFamily: 'var(--font-display)'
          }}>
            1971
          </div>
        </div>
        
        <blockquote className="monument-quote">
          <p>
            &quot;I have directed Secretary Connally to suspend temporarily 
            the convertibility of the dollar into gold.&quot;
          </p>
          <cite>— President Richard Nixon, August 15, 1971</cite>
        </blockquote>
        
        <div className="monument-context">
          <p>
            With those words, Nixon ended the gold standard. For the first time 
            in history, no major currency was backed by anything physical. 
            The dollar&apos;s value came purely from trust in the U.S. government.
          </p>
          <p style={{ marginTop: '1rem' }}>
            This was the &quot;Nixon Shock&quot;—the birth of pure <strong>fiat money</strong> 
            (from Latin &quot;let it be done&quot;). Money by decree. Value by consensus. 
            The greatest experiment in collective belief humanity has ever conducted.
          </p>
          <p style={{ marginTop: '1rem' }}>
            It worked. Mostly. The dollar remains the world&apos;s reserve currency. 
            But inflation, financial crises, and currency collapses remind us: 
            fiat money requires eternal vigilance over the institutions that issue it.
          </p>
        </div>
      </Section>

      {/* ==================== SECTION 7: THE DIGITAL LEAP (DATA VIZ) ==================== */}
      <Section id="digital-money" className="data-viz-section" onVisible={() => markSectionVisible('digital-money')}>
        <div className="data-header">
          <span className="section-badge digital-era">THE DIGITAL LEAP</span>
          <h2>The Disappearing Dollar</h2>
          <p className="lead">
            Most money no longer exists in physical form. It&apos;s entries in databases, 
            pulses of electricity, numbers on screens.
          </p>
        </div>
        
        <div className="split-visual" style={{ marginBottom: '3rem' }}>
          <DigitalMoney animate={sectionVisibility['digital-money']} />
        </div>
        
        <div className="data-grid">
          <div className="data-card">
            <div className="data-icon">💳</div>
            <div className="data-value">1950</div>
            <div className="data-label">First Credit Card</div>
            <div className="data-description">
              Diners Club introduced the first universal credit card. 
              For the first time, you could spend money you didn&apos;t physically have.
            </div>
          </div>
          
          <div className="data-card">
            <div className="data-icon">🌐</div>
            <div className="data-value">$40T</div>
            <div className="data-label">Daily SWIFT Transfers</div>
            <div className="data-description">
              Every day, $40 trillion moves through the SWIFT network—
              more than the entire U.S. GDP, transferred in 24 hours.
            </div>
          </div>
          
          <div className="data-card">
            <div className="data-icon">📱</div>
            <div className="data-value">97%</div>
            <div className="data-label">Digital-Only Money</div>
            <div className="data-description">
              Only 3% of all money exists as physical cash. The rest is purely digital—
              numbers in bank computers that never become bills or coins.
            </div>
          </div>
          
          <div className="data-card">
            <div className="data-icon">🏦</div>
            <div className="data-value">10:1</div>
            <div className="data-label">Fractional Reserve</div>
            <div className="data-description">
              Banks only keep ~10% of deposits as reserves. The rest they lend out. 
              Your &quot;money&quot; is mostly promises on top of promises.
            </div>
          </div>
        </div>
      </Section>

      {/* ==================== SECTION 8: THE CRYPTOGRAPHIC DREAM ==================== */}
      <Section id="crypto" className="split-screen reverse">
        <div className="split-content">
          <span className="section-badge digital-era">THE CRYPTOGRAPHIC DREAM</span>
          <h2>Trust Without Trustees</h2>
          <p className="lead">
            On January 3, 2009, an anonymous programmer called Satoshi Nakamoto 
            launched an experiment: money without banks, governments, or central authority.
          </p>
          <p>
            Bitcoin&apos;s blockchain is a public ledger—every transaction recorded, 
            verified by thousands of computers worldwide. No one controls it. 
            Everyone can verify it.
          </p>
          <p>
            The Genesis Block contained a hidden message: &quot;The Times 03/Jan/2009 
            Chancellor on brink of second bailout for banks.&quot; A declaration 
            of intent: money free from institutional failure.
          </p>
          <p>
            Whether cryptocurrency will replace fiat money or remain a speculative 
            asset is unclear. But it proved something profound: in the digital age, 
            trust can be encoded in mathematics rather than institutions.
          </p>
        </div>
        
        <div className="split-visual">
          <BitcoinBlock />
        </div>
      </Section>

      {/* ==================== SECTION 9: THE LEDGER (LEGACY) ==================== */}
      <Section id="legacy" className="legacy-section full-bleed">
        <div className="legacy-content">
          <h2>The Ledger</h2>
          
          <p className="legacy-lead">
            From cowrie shells to cryptocurrency, money&apos;s 5,000-year journey 
            reveals a single, astonishing truth:
          </p>
          
          <div className="final-insight">
            Money has no intrinsic value. It never did. 
            Its power comes entirely from shared belief.
          </div>
          
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '2rem' }}>
            Shells worked because communities agreed they worked. Gold worked because 
            empires guaranteed it. Paper works because governments promise it. 
            Bitcoin works because code enforces it.
          </p>
          
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '1rem' }}>
            The ledger—whether clay tablet, bank vault, or blockchain—is just 
            a record of who owes what to whom. The real magic is that we all 
            agree to believe it.
          </p>
          
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '1rem' }}>
            Next time you hold a dollar bill, remember: you&apos;re not holding wealth. 
            You&apos;re holding a token of trust in an idea that 8 billion people 
            choose to believe. Every single day.
          </p>
          
          <p style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            color: 'var(--electric-cyan)',
            marginTop: '3rem'
          }}>
            That&apos;s the extraordinary story of money.
          </p>
        </div>
      </Section>

      {/* ==================== SOURCES ==================== */}
      <Section id="sources" className="sources-section">
        <div className="sources-content">
          <h3 className="sources-title">Sources & Further Reading</h3>
          
          <ul className="sources-list">
            <li>
              <a href="https://www.britannica.com/money/money" target="_blank" rel="noopener noreferrer">
                Encyclopedia Britannica: History of Money
              </a>
            </li>
            <li>
              <a href="https://www.federalreservehistory.org/essays/gold-convertibility-ends" target="_blank" rel="noopener noreferrer">
                Federal Reserve History: Nixon Ends Gold Convertibility (1971)
              </a>
            </li>
            <li>
              <a href="https://www.bankofengland.co.uk/quarterly-bulletin/2014/q1/money-creation-in-the-modern-economy" target="_blank" rel="noopener noreferrer">
                Bank of England: Money Creation in the Modern Economy
              </a>
            </li>
            <li>
              <a href="https://www.bis.org/publ/work880.htm" target="_blank" rel="noopener noreferrer">
                Bank for International Settlements: Rise of Central Bank Digital Currencies
              </a>
            </li>
            <li>
              <a href="https://bitcoin.org/bitcoin.pdf" target="_blank" rel="noopener noreferrer">
                Satoshi Nakamoto: Bitcoin Whitepaper (2008)
              </a>
            </li>
            <li>
              <a href="https://www.britannica.com/biography/Croesus" target="_blank" rel="noopener noreferrer">
                Encyclopedia Britannica: Croesus of Lydia
              </a>
            </li>
            <li>
              <a href="https://www.britannica.com/topic/cowrie" target="_blank" rel="noopener noreferrer">
                Encyclopedia Britannica: Cowrie Shells as Currency
              </a>
            </li>
            <li>
              <a href="https://www.swift.com/about-us" target="_blank" rel="noopener noreferrer">
                SWIFT: Global Financial Messaging Network
              </a>
            </li>
          </ul>

          <h4 className="sources-subtitle">Primary Sources</h4>
          <ul className="sources-list">
            <li>
              <a href="https://www.gutenberg.org/ebooks/10636" target="_blank" rel="noopener noreferrer">
                Marco Polo: <em>The Travels</em> — Book II, Chapter XXIV (Paper Money)
              </a>
            </li>
            <li>
              Nixon Address (August 15, 1971) — Transcript via Federal Reserve History
            </li>
          </ul>
          
          <h4 className="sources-subtitle">Recommended Books</h4>
          <ul className="sources-list">
            <li>
              <em>Debt: The First 5,000 Years</em> — David Graeber (2011)
            </li>
            <li>
              <em>Money: The Unauthorized Biography</em> — Felix Martin (2013)
            </li>
            <li>
              <em>The Ascent of Money</em> — Niall Ferguson (2008)
            </li>
          </ul>
          
          <p className="sources-note">
            This narrative was fact-checked against authoritative economic history sources, 
            central bank publications, and peer-reviewed research on monetary systems.
            Statistics on digital money derived from Bank of England research.
          </p>
        </div>
      </Section>
    </div>
  );
};

export default LedgerClient;

