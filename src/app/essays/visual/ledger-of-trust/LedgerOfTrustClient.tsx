"use client";
/* eslint-disable react/no-unescaped-entities */

import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import "./ledger-of-trust.css";

/* ===========================================
   THE LEDGER OF TRUST
   A Visual Journey Through the Blockchain
   
   An immersive, scroll-driven visual essay
   ===========================================
   
   DESIGN PHILOSOPHY:
   - Dark void with luminescent accents
   - Genesis block as origin point metaphor
   - Chain links as progress indicator
   - Scroll-lock zones for key animations
   - Mobile-native, 60fps GPU-accelerated
   - Parallax depth system (4 layers)
   
   COLOR PALETTE (Derived from subject):
   - Void Black (#050508) — digital nothingness
   - Genesis Glow (#00E5FF) — creation energy
   - Trust Gold (#FFB800) — value, Bitcoin orange
   - Hash Purple (#A855F7) — cryptographic mystery
   - Validation Green (#10B981) — consensus confirmed
   - Node Blue (#3B82F6) — network connections
   - Error Red (#EF4444) — double-spend warning
   
   TYPOGRAPHY:
   - Display: JetBrains Mono (code aesthetic)
   - Serif: Crimson Pro (manifesto gravitas)
   - Sans: Inter (readable narrative)
   
   CHAPTERS:
   1. The Problem of Trust
   2. The Cypherpunk Dream
   3. The Pioneers Who Paved the Way
   4. The Satoshi Solution
   5. Anatomy of a Block
   6. The Mining Metaphor
   7. Consensus & Truth
   8. The Living Ledger
   =========================================== */

// ============================================
// TYPES
// ============================================

interface Pioneer {
  name: string;
  years: string;
  contribution: string;
  description: string;
  quote: string;
  imageDesc: string;
}

interface ChapterInfo {
  number: number;
  title: string;
  subtitle: string;
}

// ============================================
// DATA — Historical Figures
// ============================================

const pioneers: Pioneer[] = [
  {
    name: "David Chaum",
    years: "1983",
    contribution: "DigiCash & Blind Signatures",
    description:
      "The godfather of digital currency. His 1983 paper introduced blind signatures, allowing untraceable digital payments. Founded DigiCash in 1989—decades ahead of its time. The world wasn't ready, but his ideas would echo through every cryptocurrency that followed.",
    quote:
      "You can pay for access to a database, buy software or a newsletter by e-mail, play a computer game, receive $5 owed you by a friend, or just order a pizza.",
    imageDesc: "Portrait with signature innovation diagram",
  },
  {
    name: "Eric Hughes",
    years: "1993",
    contribution: "A Cypherpunk's Manifesto",
    description:
      'Co-founder of the cypherpunks mailing list and author of "A Cypherpunk\'s Manifesto." His 1993 document became the philosophical foundation for the entire movement—privacy as a right, cryptography as the tool to defend it.',
    quote:
      "Privacy is necessary for an open society in the electronic age. Privacy is not secrecy. A private matter is something one doesn't want the whole world to know, but a secret matter is something one doesn't want anybody to know.",
    imageDesc: "Manifesto text emerging from typewriter",
  },
  {
    name: "Adam Back",
    years: "1997",
    contribution: "Hashcash (Proof-of-Work)",
    description:
      "Created Hashcash in 1997 as an anti-spam system. The concept: require computational work to send a message. This proof-of-work mechanism became the foundation of Bitcoin's mining algorithm. Simple idea, revolutionary application.",
    quote:
      "Hashcash is a denial-of-service counter measure tool... The main idea is that a textual stamp is computed by the sender. The stamp is a proof of work.",
    imageDesc: "Email spam transforming into computational puzzle",
  },
  {
    name: "Wei Dai",
    years: "1998",
    contribution: "b-money",
    description:
      "Proposed b-money, an anonymous distributed electronic cash system. Never implemented, but Satoshi cited it directly in the Bitcoin whitepaper. Dai envisioned money created by computational puzzles in a network of untraceable pseudonyms.",
    quote:
      "A scheme for a group of untraceable digital pseudonyms to pay each other with money and to enforce contracts amongst themselves without outside help.",
    imageDesc: "Blueprint-style diagram of b-money system",
  },
  {
    name: "Nick Szabo",
    years: "1998–2005",
    contribution: "Bit Gold & Smart Contracts",
    description:
      'Designed Bit Gold in 1998—the most direct precursor to Bitcoin. Also invented the concept of "smart contracts": self-executing agreements encoded in software. These ideas would later power Ethereum and the entire DeFi ecosystem.',
    quote:
      "Bit gold would benefit from a database of property titles and their histories. Such a database would be needed to determine the transaction history and thus the value of any given piece of bit gold.",
    imageDesc: "Contract document morphing into code",
  },
  {
    name: "Hal Finney",
    years: "2004–2009",
    contribution: "RPOW & First Bitcoin Transaction",
    description:
      'Created Reusable Proof of Work (RPOW) in 2004. Received the first-ever Bitcoin transaction from Satoshi Nakamoto on January 12, 2009. His historic tweet: "Running bitcoin." A cryptographic legend who believed until his final days.',
    quote:
      "When Satoshi announced the first release of the software, I grabbed it right away. I think I was the first person besides Satoshi to run bitcoin.",
    imageDesc: "Two nodes connecting, first transaction visualization",
  },
  {
    name: "Satoshi Nakamoto",
    years: "2008–2010",
    contribution: "Bitcoin",
    description:
      "The phantom founder. Published the Bitcoin whitepaper on Halloween 2008. Mined the genesis block on January 3, 2009—embedding a Times headline about bank bailouts. Vanished in 2010, leaving behind approximately 1 million unmoved bitcoins and a revolution.",
    quote:
      "I've been working on a new electronic cash system that's fully peer-to-peer, with no trusted third party. The root problem with conventional currency is all the trust that's required to make it work.",
    imageDesc: "Silhouette obscured by floating question marks and code",
  },
];

const chapters: ChapterInfo[] = [
  { number: 1, title: "The Problem of Trust", subtitle: "Why intermediaries?" },
  { number: 2, title: "The Cypherpunk Dream", subtitle: "Privacy as a right" },
  { number: 3, title: "The Pioneers", subtitle: "Giants' shoulders" },
  { number: 4, title: "The Satoshi Solution", subtitle: "Halloween 2008" },
  { number: 5, title: "Anatomy of a Block", subtitle: "Time capsules" },
  { number: 6, title: "The Mining Metaphor", subtitle: "Proof of work" },
  { number: 7, title: "Consensus & Truth", subtitle: "Byzantine generals" },
  { number: 8, title: "The Living Ledger", subtitle: "Every 10 minutes" },
];

// ============================================
// HOOKS — Scroll & Animation Utilities
// ============================================

const useScrollProgress = () => {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      setViewportHeight(window.innerHeight);
      setDocumentHeight(document.documentElement.scrollHeight);
    };

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    updateDimensions();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const progress = useMemo(() => {
    if (documentHeight <= viewportHeight) return 0;
    return Math.min(1, Math.max(0, scrollY / (documentHeight - viewportHeight)));
  }, [scrollY, documentHeight, viewportHeight]);

  return { scrollY, progress, viewportHeight, documentHeight };
};

const useIntersectionReveal = (threshold = 0.15) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Scroll-lock hook for pinned animation sections
const useScrollLock = (sectionHeight: number = 3) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = containerHeight - viewportHeight;

      if (rect.top <= 0 && rect.bottom >= viewportHeight) {
        const scrolledInSection = -rect.top;
        const sectionProgress = Math.min(
          1,
          Math.max(0, scrolledInSection / scrollableDistance)
        );
        setProgress(sectionProgress);
        setIsPinned(true);
      } else if (rect.top > 0) {
        setProgress(0);
        setIsPinned(false);
      } else {
        setProgress(1);
        setIsPinned(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionHeight]);

  return { containerRef, progress, isPinned };
};

// Parallax hook
const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(centerOffset * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset };
};

// ============================================
// SVG COMPONENTS — Visual Elements
// ============================================

// Genesis Block SVG
const GenesisBlockSVG: React.FC<{ progress: number; className?: string }> = ({
  progress,
  className = "",
}) => {
  const glowIntensity = 0.3 + progress * 0.7;
  const rotation = progress * 360;

  return (
    <svg
      className={`genesis-block-svg ${className}`}
      viewBox="0 0 200 200"
      style={{ transform: `rotateY(${rotation}deg)` }}
    >
      <defs>
        <linearGradient id="blockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#FFB800" />
        </linearGradient>
        <filter id="glowFilter">
          <feGaussianBlur stdDeviation={4 * glowIntensity} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Outer glow ring */}
      <circle
        cx="100"
        cy="100"
        r={70 + progress * 15}
        fill="none"
        stroke="url(#blockGradient)"
        strokeWidth="1"
        opacity={glowIntensity * 0.5}
        filter="url(#glowFilter)"
      />
      {/* Main block */}
      <rect
        x="50"
        y="50"
        width="100"
        height="100"
        rx="8"
        fill="none"
        stroke="url(#blockGradient)"
        strokeWidth="2"
        filter="url(#glowFilter)"
      />
      {/* Inner structure */}
      <line
        x1="60"
        y1="80"
        x2="140"
        y2="80"
        stroke="#00E5FF"
        strokeWidth="1"
        opacity={progress}
      />
      <line
        x1="60"
        y1="100"
        x2="140"
        y2="100"
        stroke="#A855F7"
        strokeWidth="1"
        opacity={progress}
      />
      <line
        x1="60"
        y1="120"
        x2="140"
        y2="120"
        stroke="#FFB800"
        strokeWidth="1"
        opacity={progress}
      />
      {/* Genesis text */}
      <text
        x="100"
        y="140"
        textAnchor="middle"
        fill="#00E5FF"
        fontSize="10"
        fontFamily="monospace"
        opacity={progress}
      >
        GENESIS
      </text>
    </svg>
  );
};

// Network Node Component
const NetworkNodeSVG: React.FC<{
  x: number;
  y: number;
  active?: boolean;
  delay?: number;
  size?: number;
}> = ({ x, y, active = false, delay = 0, size = 8 }) => {
  return (
    <g
      className={`network-node ${active ? "active" : ""}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <circle
        cx={x}
        cy={y}
        r={size}
        className="node-pulse"
        style={{ animationDelay: `${delay}s` }}
      />
      <circle cx={x} cy={y} r={size * 0.5} className="node-core" />
    </g>
  );
};

// Blockchain Chain SVG
const ChainLinkSVG: React.FC<{ filled?: boolean; glowing?: boolean }> = ({
  filled = false,
  glowing = false,
}) => {
  return (
    <svg className={`chain-link ${filled ? "filled" : ""} ${glowing ? "glowing" : ""}`} viewBox="0 0 32 16">
      <rect x="2" y="2" width="12" height="12" rx="2" className="block-shape" />
      <line x1="14" y1="8" x2="18" y2="8" className="connector" />
      <rect x="18" y="2" width="12" height="12" rx="2" className="block-shape" />
    </svg>
  );
};

// Particle System
const ParticleField: React.FC<{ count?: number; layer?: number }> = ({
  count = 30,
  layer = 0,
}) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 10,
      opacity: 0.1 + Math.random() * 0.3,
    }));
  }, [count]);

  return (
    <div className={`particle-field layer-${layer}`} aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

// Grid Background
const GridOverlay: React.FC = () => {
  return (
    <div className="grid-overlay" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="ledgerGrid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(0, 229, 255, 0.03)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ledgerGrid)" />
      </svg>
    </div>
  );
};

// ============================================
// PROGRESS BAR — Chain of Blocks
// ============================================

const ChainProgressBar: React.FC<{ progress: number; currentChapter: number }> = ({
  progress,
  currentChapter,
}) => {
  const blockCount = 8;
  const filledBlocks = Math.ceil(progress * blockCount);

  return (
    <nav className="chain-progress-bar" aria-label="Reading progress">
      <div className="progress-track">
        {chapters.map((chapter, i) => (
          <button
            key={i}
            className={`progress-block ${i < filledBlocks ? "filled" : ""} ${
              i === currentChapter ? "current" : ""
            }`}
            title={chapter.title}
            onClick={() => {
              const section = document.getElementById(`chapter-${i + 1}`);
              section?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="block-number">{i + 1}</span>
            <span className="block-glow" />
            {i < blockCount - 1 && <span className="block-connector" />}
          </button>
        ))}
      </div>
      <div className="progress-tooltip">
        <span className="tooltip-chapter">Chapter {currentChapter + 1}</span>
        <span className="tooltip-title">{chapters[currentChapter]?.title}</span>
      </div>
    </nav>
  );
};

// ============================================
// HERO SECTION — The Genesis Block
// ============================================

const HeroSection: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(2);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Animation phases based on scroll progress
  const phase = useMemo(() => {
    if (progress < 0.2) return 0; // Initial: single block
    if (progress < 0.4) return 1; // Block multiplies
    if (progress < 0.6) return 2; // Chain forms
    if (progress < 0.8) return 3; // Network appears
    return 4; // Full reveal
  }, [progress]);

  return (
    <header
      className="hero-section scroll-lock-container"
      ref={containerRef}
      style={{ height: "250vh" }}
    >
      <div className={`hero-pinned ${isPinned ? "pinned" : ""}`}>
        {/* Parallax Layers */}
        <div className="hero-backdrop">
          <ParticleField count={50} layer={0} />
          <GridOverlay />
          <div className="gradient-orb orb-1" />
          <div className="gradient-orb orb-2" />
          <div className="gradient-orb orb-3" />
        </div>

        {/* Genesis Block Animation */}
        <div className={`genesis-animation phase-${phase}`}>
          <div className="block-cluster">
            <GenesisBlockSVG progress={progress} className="genesis-main" />
            {phase >= 1 && (
              <>
                <div className="block-child block-1" style={{ opacity: Math.min(1, (progress - 0.2) * 5) }}>
                  <GenesisBlockSVG progress={progress} />
                </div>
                <div className="block-child block-2" style={{ opacity: Math.min(1, (progress - 0.25) * 4) }}>
                  <GenesisBlockSVG progress={progress} />
                </div>
              </>
            )}
            {phase >= 2 && (
              <div className="chain-connections">
                <svg className="chain-lines" viewBox="0 0 400 200">
                  <line
                    x1="150"
                    y1="100"
                    x2="250"
                    y2="100"
                    stroke="#00E5FF"
                    strokeWidth="2"
                    strokeDasharray="10 5"
                    className="animate-draw"
                  />
                  <line
                    x1="250"
                    y1="100"
                    x2="350"
                    y2="100"
                    stroke="#A855F7"
                    strokeWidth="2"
                    strokeDasharray="10 5"
                    className="animate-draw"
                    style={{ animationDelay: "0.3s" }}
                  />
                </svg>
              </div>
            )}
            {phase >= 3 && (
              <div className="network-nodes">
                <svg className="network-svg" viewBox="0 0 400 300">
                  <NetworkNodeSVG x={50} y={50} active delay={0} />
                  <NetworkNodeSVG x={350} y={50} active delay={0.1} />
                  <NetworkNodeSVG x={50} y={250} active delay={0.2} />
                  <NetworkNodeSVG x={350} y={250} active delay={0.3} />
                  <NetworkNodeSVG x={200} y={30} active delay={0.15} />
                  <NetworkNodeSVG x={200} y={270} active delay={0.25} />
                  {/* Connection lines */}
                  <line x1="50" y1="50" x2="200" y2="150" stroke="#3B82F6" strokeWidth="1" opacity="0.5" />
                  <line x1="350" y1="50" x2="200" y2="150" stroke="#3B82F6" strokeWidth="1" opacity="0.5" />
                  <line x1="50" y1="250" x2="200" y2="150" stroke="#3B82F6" strokeWidth="1" opacity="0.5" />
                  <line x1="350" y1="250" x2="200" y2="150" stroke="#3B82F6" strokeWidth="1" opacity="0.5" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Hero Content */}
        <div className={`hero-content ${heroLoaded ? "loaded" : ""}`}>
          <div className="hero-badge">
            <span className="badge-pulse" />
            <span className="badge-text">Visual Essay</span>
          </div>

          <h1 className="hero-title">
            <span className="title-line">The Ledger</span>
            <span className="title-line accent">of Trust</span>
          </h1>

          <p className="hero-tagline">
            How a chain of blocks rebuilt trust in a trustless world
          </p>

          <p className="hero-description">
            From humanity&apos;s earliest ledgers through the cypherpunk movement, 
            to the anonymous invention that challenged the foundations of money itself.
          </p>

          <div className="hero-meta">
            <span className="meta-item">
              <span className="meta-icon">◷</span>
              18 min read
            </span>
            <span className="meta-item">
              <span className="meta-icon">⬡</span>
              Interactive
            </span>
            <span className="meta-item">
              <span className="meta-icon">◈</span>
              8 Chapters
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`scroll-indicator ${phase >= 4 ? "hide" : ""}`}>
          <span className="scroll-text">Scroll to begin</span>
          <div className="scroll-chain">
            <ChainLinkSVG glowing />
          </div>
        </div>

        {/* Progress Hint */}
        <div className="scroll-progress-hint">
          <div className="progress-bar-mini">
            <div
              className="progress-fill-mini"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

// ============================================
// CHAPTER 1: The Problem of Trust
// ============================================

const Chapter1: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(2.5);
  const { ref: sectionRef, isVisible } = useIntersectionReveal(0.1);

  const intermediaryStep = useMemo(() => {
    if (progress < 0.14) return 0;
    if (progress < 0.28) return 1;
    if (progress < 0.42) return 2;
    if (progress < 0.56) return 3;
    if (progress < 0.70) return 4;
    if (progress < 0.84) return 5;
    return 6;
  }, [progress]);

  const intermediaries = [
    { name: "You", icon: "👤", fee: "" },
    { name: "Your Bank", icon: "🏦", fee: "-$2" },
    { name: "Clearinghouse", icon: "⚙️", fee: "-$0.50" },
    { name: "Federal Reserve", icon: "🏛️", fee: "-$0.25" },
    { name: "Clearinghouse", icon: "⚙️", fee: "-$0.50" },
    { name: "Their Bank", icon: "🏦", fee: "-$2" },
    { name: "Recipient", icon: "👤", fee: "" },
  ];

  return (
    <section
      id="chapter-1"
      className="chapter chapter-1 scroll-lock-container"
      ref={containerRef}
      style={{ height: "300vh" }}
    >
      <div className={`chapter-pinned ${isPinned ? "pinned" : ""}`} ref={sectionRef}>
        <div className="chapter-header">
          <span className={`chapter-number ${isVisible ? "reveal" : ""}`}>I</span>
          <h2 className={`chapter-title ${isVisible ? "reveal" : ""}`}>
            The Problem of Trust
          </h2>
          <p className={`chapter-subtitle ${isVisible ? "reveal" : ""}`}>
            Before we can understand the solution, we must feel the weight of the problem.
          </p>
        </div>

        <div className="chapter-content">
          <div className={`narrative-block ${isVisible ? "reveal" : ""}`}>
            <p className="lead-text">
              Every transaction you&apos;ve ever made required trusting someone in the middle.
            </p>
            <p>
              Banks hold your money. Payment processors move it. Governments regulate it. 
              Each intermediary adds fees, delays, and points of failure. They can freeze 
              accounts, reverse transactions, or simply say no. The system works—but it 
              was never truly yours.
            </p>
          </div>

          {/* Interactive Intermediary Animation */}
          <div className="intermediary-animation">
            <div className="animation-label">
              Watch your $100 travel through the system
            </div>
            <div className="intermediary-chain">
              {intermediaries.map((int, i) => (
                <div
                  key={i}
                  className={`intermediary-node ${i <= intermediaryStep ? "active" : ""} ${
                    i === intermediaryStep ? "current" : ""
                  }`}
                >
                  <div className="node-icon">{int.icon}</div>
                  <div className="node-name">{int.name}</div>
                  {int.fee && <div className="node-fee">{int.fee}</div>}
                  {i < intermediaries.length - 1 && (
                    <div className={`node-arrow ${i < intermediaryStep ? "active" : ""}`}>
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="animation-result">
              <span className="result-label">Amount received:</span>
              <span className={`result-value ${intermediaryStep >= 6 ? "final" : ""}`}>
                ${(100 - Math.min(intermediaryStep, 6) * 0.875).toFixed(2)}
              </span>
              {intermediaryStep >= 6 && (
                <span className="result-note">3-5 business days later</span>
              )}
            </div>
          </div>

          {/* The Double-Spend Problem */}
          <div className={`problem-card ${progress > 0.7 ? "reveal" : ""}`}>
            <h3>The Digital Dilemma</h3>
            <p>
              Digital files can be copied infinitely. When you email a photo, you don&apos;t 
              lose it—you both have it. But money can&apos;t work that way. How do you create 
              digital cash that can&apos;t be counterfeited by copying it?
            </p>
            <p className="problem-emphasis">
              This is the <strong>double-spend problem</strong>—the reason digital cash 
              failed for decades.
            </p>
          </div>
        </div>

        <blockquote className={`chapter-quote ${progress > 0.85 ? "reveal" : ""}`}>
          <p>
            &ldquo;The root problem with conventional currency is all the trust that&apos;s 
            required to make it work.&rdquo;
          </p>
          <cite>— Satoshi Nakamoto, 2009</cite>
        </blockquote>
      </div>
    </section>
  );
};

// ============================================
// CHAPTER 2: The Cypherpunk Dream
// ============================================

const Chapter2: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section id="chapter-2" className="chapter chapter-2" ref={ref}>
      <div className="chapter-header">
        <span className={`chapter-number ${isVisible ? "reveal" : ""}`}>II</span>
        <h2 className={`chapter-title ${isVisible ? "reveal" : ""}`}>
          The Cypherpunk Dream
        </h2>
        <p className={`chapter-subtitle ${isVisible ? "reveal" : ""}`}>
          A group of rebels imagined a world where privacy was a right and money was free.
        </p>
      </div>

      <div className="chapter-content">
        <div className={`manifesto-block ${isVisible ? "reveal" : ""}`}>
          <div className="manifesto-header">
            <span className="manifesto-icon">⌘</span>
            <h3>A Cypherpunk&apos;s Manifesto</h3>
            <span className="manifesto-date">March 9, 1993</span>
          </div>
          <div className="manifesto-text">
            <p className="typewriter-text">
              &ldquo;Privacy is necessary for an open society in the electronic age. Privacy 
              is not secrecy. A private matter is something one doesn&apos;t want the whole 
              world to know, but a secret matter is something one doesn&apos;t want anybody 
              to know. Privacy is the power to selectively reveal oneself to the world.&rdquo;
            </p>
          </div>
          <cite className="manifesto-author">— Eric Hughes</cite>
        </div>

        <div className={`cypherpunk-values ${isVisible ? "reveal" : ""}`}>
          <h3>The Movement&apos;s Core Beliefs</h3>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🔐</div>
              <h4>Cryptography as Defense</h4>
              <p>
                Strong encryption is the tool that levels the playing field between 
                individuals and institutions.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌐</div>
              <h4>Borderless Communication</h4>
              <p>
                Information and value should flow freely across borders, beyond the 
                reach of any single government.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">👁️</div>
              <h4>Privacy by Default</h4>
              <p>
                Surveillance should require effort. Privacy should be the default 
                state, not a privilege.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h4>Code as Speech</h4>
              <p>
                Software is expression. Publishing cryptographic code is a form of 
                protected speech.
              </p>
            </div>
          </div>
        </div>

        <div className={`timeline-preview ${isVisible ? "reveal" : ""}`}>
          <h3>The Ideas That Preceded Bitcoin</h3>
          <div className="timeline-mini">
            <div className="timeline-item">
              <span className="year">1983</span>
              <span className="event">Chaum&apos;s Blind Signatures</span>
            </div>
            <div className="timeline-item">
              <span className="year">1993</span>
              <span className="event">Cypherpunk Manifesto</span>
            </div>
            <div className="timeline-item">
              <span className="year">1997</span>
              <span className="event">Back&apos;s Hashcash</span>
            </div>
            <div className="timeline-item">
              <span className="year">1998</span>
              <span className="event">Dai&apos;s b-money &amp; Szabo&apos;s Bit Gold</span>
            </div>
            <div className="timeline-item">
              <span className="year">2004</span>
              <span className="event">Finney&apos;s RPOW</span>
            </div>
            <div className="timeline-item highlight">
              <span className="year">2008</span>
              <span className="event">Satoshi&apos;s Bitcoin</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CHAPTER 3: The Pioneers
// ============================================

const Chapter3: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const [activePioneer, setActivePioneer] = useState(0);

  return (
    <section id="chapter-3" className="chapter chapter-3" ref={ref}>
      <div className="chapter-header">
        <span className={`chapter-number ${isVisible ? "reveal" : ""}`}>III</span>
        <h2 className={`chapter-title ${isVisible ? "reveal" : ""}`}>
          The Pioneers Who Paved the Way
        </h2>
        <p className={`chapter-subtitle ${isVisible ? "reveal" : ""}`}>
          Each failure was a lesson. Each lesson became a building block.
        </p>
      </div>

      <div className="chapter-content">
        <div className={`pioneers-intro ${isVisible ? "reveal" : ""}`}>
          <p className="lead-text">
            Bitcoin didn&apos;t emerge from nothing. It was built on decades of work by 
            cryptographers, hackers, and visionaries who imagined money that moved 
            as freely as email.
          </p>
        </div>

        {/* Pioneer Timeline */}
        <div className="pioneers-timeline">
          <div className="timeline-track">
            {pioneers.map((pioneer, index) => (
              <button
                key={pioneer.name}
                className={`pioneer-node ${activePioneer === index ? "active" : ""} ${
                  isVisible ? "reveal" : ""
                }`}
                onClick={() => setActivePioneer(index)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="node-year">{pioneer.years}</span>
                <span className="node-dot" />
                <span className="node-name">{pioneer.name.split(" ")[1] || pioneer.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pioneer Detail Card */}
        <div className={`pioneer-detail ${isVisible ? "reveal" : ""}`}>
          <div className="pioneer-card" key={activePioneer}>
            <div className="pioneer-portrait">
              <div className="portrait-placeholder">
                <span className="portrait-initial">
                  {pioneers[activePioneer].name.charAt(0)}
                </span>
              </div>
            </div>
            <div className="pioneer-info">
              <div className="pioneer-header">
                <h3 className="pioneer-name">{pioneers[activePioneer].name}</h3>
                <span className="pioneer-years">{pioneers[activePioneer].years}</span>
              </div>
              <span className="pioneer-contribution">
                {pioneers[activePioneer].contribution}
              </span>
              <p className="pioneer-description">
                {pioneers[activePioneer].description}
              </p>
              <blockquote className="pioneer-quote">
                <p>&ldquo;{pioneers[activePioneer].quote}&rdquo;</p>
              </blockquote>
            </div>
          </div>
        </div>

        {/* Pioneer Navigation Dots */}
        <div className="pioneer-nav">
          {pioneers.map((_, i) => (
            <button
              key={i}
              className={`nav-dot ${activePioneer === i ? "active" : ""}`}
              onClick={() => setActivePioneer(i)}
              aria-label={`View ${pioneers[i].name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// CHAPTER 4: The Satoshi Solution
// ============================================

const Chapter4: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const [whitepaperRevealed, setWhitepaperRevealed] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setWhitepaperRevealed(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <section id="chapter-4" className="chapter chapter-4" ref={ref}>
      <div className="chapter-header">
        <span className={`chapter-number ${isVisible ? "reveal" : ""}`}>IV</span>
        <h2 className={`chapter-title ${isVisible ? "reveal" : ""}`}>
          The Satoshi Solution
        </h2>
        <p className={`chapter-subtitle ${isVisible ? "reveal" : ""}`}>
          On Halloween 2008, a ghost published a whitepaper that would haunt the 
          financial system forever.
        </p>
      </div>

      <div className="chapter-content">
        {/* Timeline */}
        <div className="satoshi-timeline">
          <div className={`timeline-event ${isVisible ? "reveal" : ""}`}>
            <div className="event-date">
              <span className="date-day">31</span>
              <span className="date-month">OCT</span>
              <span className="date-year">2008</span>
            </div>
            <div className="event-content">
              <h3>The Whitepaper</h3>
              <p>
                A nine-page document titled &ldquo;Bitcoin: A Peer-to-Peer Electronic Cash 
                System&rdquo; appears on a cryptography mailing list. The author: Satoshi 
                Nakamoto. No one knows who they are.
              </p>
            </div>
          </div>

          <div className={`timeline-event ${isVisible ? "reveal" : ""}`} style={{ animationDelay: "0.2s" }}>
            <div className="event-date">
              <span className="date-day">03</span>
              <span className="date-month">JAN</span>
              <span className="date-year">2009</span>
            </div>
            <div className="event-content">
              <h3>The Genesis Block</h3>
              <p>
                Block 0 is mined. Embedded in its coinbase parameter—a message that 
                would become legendary:
              </p>
              <code className="genesis-message">
                The Times 03/Jan/2009 Chancellor on brink of second bailout for banks
              </code>
            </div>
          </div>

          <div className={`timeline-event ${isVisible ? "reveal" : ""}`} style={{ animationDelay: "0.4s" }}>
            <div className="event-date">
              <span className="date-day">12</span>
              <span className="date-month">JAN</span>
              <span className="date-year">2009</span>
            </div>
            <div className="event-content">
              <h3>The First Transaction</h3>
              <p>
                Satoshi sends 10 bitcoins to Hal Finney—the first peer-to-peer 
                cryptocurrency transaction in history. Finney&apos;s response: &ldquo;Running bitcoin.&rdquo;
              </p>
            </div>
          </div>

          <div className={`timeline-event ${isVisible ? "reveal" : ""}`} style={{ animationDelay: "0.6s" }}>
            <div className="event-date">
              <span className="date-day">12</span>
              <span className="date-month">DEC</span>
              <span className="date-year">2010</span>
            </div>
            <div className="event-content">
              <h3>The Disappearance</h3>
              <p>
                Satoshi posts their final message, then vanishes. An estimated 1 million 
                bitcoins they mined remain untouched to this day—a digital fortune in 
                permanent sleep.
              </p>
            </div>
          </div>
        </div>

        {/* Whitepaper Visualization */}
        <div className={`whitepaper-visual ${whitepaperRevealed ? "revealed" : ""}`}>
          <div className="paper-document">
            <div className="paper-header">
              <h4>Bitcoin: A Peer-to-Peer Electronic Cash System</h4>
              <span className="paper-author">Satoshi Nakamoto</span>
              <span className="paper-email">satoshin@gmx.com</span>
            </div>
            <div className="paper-abstract">
              <strong>Abstract.</strong> A purely peer-to-peer version of electronic 
              cash would allow online payments to be sent directly from one party to 
              another without going through a financial institution...
            </div>
            <div className="paper-concepts">
              <span className="concept highlight">peer-to-peer</span>
              <span className="concept highlight">proof-of-work</span>
              <span className="concept highlight">chain of digital signatures</span>
              <span className="concept highlight">timestamp server</span>
              <span className="concept highlight">longest chain</span>
            </div>
          </div>
        </div>

        {/* Mystery Box */}
        <div className={`mystery-box ${isVisible ? "reveal" : ""}`}>
          <div className="mystery-icon">?</div>
          <div className="mystery-content">
            <h4>The Enduring Mystery</h4>
            <p>
              Satoshi Nakamoto could be one person or many. Male, female, or a group. 
              Japanese, American, European, or none of the above. They gave humanity 
              a new form of money, then walked away.
            </p>
            <p className="mystery-philosophy">
              Perhaps anonymity was the point. If no one controls the creator, no one 
              controls the creation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CHAPTER 5: Anatomy of a Block
// ============================================

const Chapter5: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(3);
  const { ref: sectionRef, isVisible } = useIntersectionReveal(0.1);

  const assemblyPhase = useMemo(() => {
    if (progress < 0.2) return 0;
    if (progress < 0.4) return 1;
    if (progress < 0.6) return 2;
    if (progress < 0.8) return 3;
    return 4;
  }, [progress]);

  return (
    <section
      id="chapter-5"
      className="chapter chapter-5 scroll-lock-container"
      ref={containerRef}
      style={{ height: "350vh" }}
    >
      <div className={`chapter-pinned ${isPinned ? "pinned" : ""}`} ref={sectionRef}>
        <div className="chapter-header">
          <span className={`chapter-number ${isVisible ? "reveal" : ""}`}>V</span>
          <h2 className={`chapter-title ${isVisible ? "reveal" : ""}`}>
            Anatomy of a Block
          </h2>
          <p className={`chapter-subtitle ${isVisible ? "reveal" : ""}`}>
            Every block is a time capsule—a permanent record of human exchange.
          </p>
        </div>

        <div className="chapter-content">
          {/* Block Assembly Animation */}
          <div className="block-assembly">
            <div className={`assembly-container phase-${assemblyPhase}`}>
              {/* Empty Shell */}
              <div className={`block-shell ${assemblyPhase >= 0 ? "visible" : ""}`}>
                <div className="shell-outline" />
              </div>

              {/* Transactions */}
              <div className={`block-transactions ${assemblyPhase >= 1 ? "visible" : ""}`}>
                <div className="tx-item">Alice → Bob: 0.5 BTC</div>
                <div className="tx-item">Carol → Dan: 1.2 BTC</div>
                <div className="tx-item">Eve → Frank: 0.3 BTC</div>
              </div>

              {/* Merkle Tree */}
              <div className={`block-merkle ${assemblyPhase >= 2 ? "visible" : ""}`}>
                <div className="merkle-tree">
                  <div className="merkle-node root">
                    <span className="node-label">Merkle Root</span>
                    <code className="node-hash">7f8a...</code>
                  </div>
                  <div className="merkle-branches">
                    <div className="merkle-node branch">
                      <code>a3b2...</code>
                    </div>
                    <div className="merkle-node branch">
                      <code>c4d5...</code>
                    </div>
                  </div>
                  <div className="merkle-leaves">
                    <div className="merkle-node leaf">TX1</div>
                    <div className="merkle-node leaf">TX2</div>
                    <div className="merkle-node leaf">TX3</div>
                  </div>
                </div>
              </div>

              {/* Header */}
              <div className={`block-header-assembly ${assemblyPhase >= 3 ? "visible" : ""}`}>
                <div className="header-field">
                  <span className="field-label">Previous Hash</span>
                  <code className="field-value">0x00a7f3...</code>
                </div>
                <div className="header-field">
                  <span className="field-label">Timestamp</span>
                  <code className="field-value">2024-01-15 14:32:07</code>
                </div>
                <div className="header-field">
                  <span className="field-label">Nonce</span>
                  <code className="field-value">2,504,387</code>
                </div>
              </div>

              {/* Chain Connection */}
              <div className={`block-chain-link ${assemblyPhase >= 4 ? "visible" : ""}`}>
                <div className="prev-block">
                  <span>Block N-1</span>
                </div>
                <div className="link-arrow">→</div>
                <div className="current-block">
                  <span>Block N</span>
                </div>
                <div className="link-arrow">→</div>
                <div className="next-block">
                  <span>Block N+1</span>
                </div>
              </div>
            </div>

            {/* Phase Labels */}
            <div className="assembly-labels">
              <div className={`phase-label ${assemblyPhase === 0 ? "active" : ""}`}>
                <span className="phase-number">1</span>
                <span className="phase-text">Empty block shell</span>
              </div>
              <div className={`phase-label ${assemblyPhase === 1 ? "active" : ""}`}>
                <span className="phase-number">2</span>
                <span className="phase-text">Transactions flow in</span>
              </div>
              <div className={`phase-label ${assemblyPhase === 2 ? "active" : ""}`}>
                <span className="phase-number">3</span>
                <span className="phase-text">Merkle tree constructs</span>
              </div>
              <div className={`phase-label ${assemblyPhase === 3 ? "active" : ""}`}>
                <span className="phase-number">4</span>
                <span className="phase-text">Header populates</span>
              </div>
              <div className={`phase-label ${assemblyPhase === 4 ? "active" : ""}`}>
                <span className="phase-number">5</span>
                <span className="phase-text">Chain connects</span>
              </div>
            </div>
          </div>

          {/* Explanation Card */}
          <div className={`anatomy-explanation ${assemblyPhase >= 2 ? "visible" : ""}`}>
            <h3>Immutable By Design</h3>
            <p>
              Each block contains a cryptographic hash of the previous block. Change 
              one transaction, and you change the hash. Change the hash, and you break 
              every block that follows. The chain becomes its own proof of integrity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CHAPTER 6: The Mining Metaphor
// ============================================

const Chapter6: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(2.5);
  const { ref: sectionRef, isVisible } = useIntersectionReveal(0.1);

  const miningAttempts = Math.floor(progress * 2500000);
  const miningSuccess = progress >= 0.85;

  const [hashDisplay, setHashDisplay] = useState("000000000000000000000000...");
  const progressBucket = Math.floor(progress * 20);
  
  useEffect(() => {
    if (miningSuccess) {
      setHashDisplay("0000a8f7c2e9b3d1f4a6...");
    } else {
      const chars = "0123456789abcdef";
      let hash = "";
      for (let i = 0; i < 24; i++) {
        hash += chars[Math.floor(Math.random() * 16)];
      }
      setHashDisplay(hash + "...");
    }
  }, [miningSuccess, progressBucket]);
  
  const currentHash = hashDisplay;

  return (
    <section
      id="chapter-6"
      className="chapter chapter-6 scroll-lock-container"
      ref={containerRef}
      style={{ height: "300vh" }}
    >
      <div className={`chapter-pinned ${isPinned ? "pinned" : ""}`} ref={sectionRef}>
        <div className="chapter-header">
          <span className={`chapter-number ${isVisible ? "reveal" : ""}`}>VI</span>
          <h2 className={`chapter-title ${isVisible ? "reveal" : ""}`}>
            The Mining Metaphor
          </h2>
          <p className={`chapter-subtitle ${isVisible ? "reveal" : ""}`}>
            Mining isn&apos;t about finding coins. It&apos;s about proving you did the work 
            to earn the right to write history.
          </p>
        </div>

        <div className="chapter-content">
          <div className={`mining-narrative ${isVisible ? "reveal" : ""}`}>
            <p className="lead-text">
              The lottery where tickets cost electricity.
            </p>
            <p>
              Miners don&apos;t dig for Bitcoin. They guess numbers. Trillions of guesses 
              per second, racing to find a number that, when combined with block data 
              and hashed, produces a result starting with enough zeros.
            </p>
          </div>

          {/* Mining Animation */}
          <div className="mining-visualization">
            <div className="mining-stats">
              <div className="stat-item">
                <span className="stat-label">Target Difficulty</span>
                <code className="stat-value difficulty">0000...</code>
              </div>
              <div className="stat-item">
                <span className="stat-label">Nonce Attempts</span>
                <span className="stat-value attempts">
                  {miningAttempts.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="hash-display">
              <span className="hash-label">Current Hash:</span>
              <code className={`hash-value ${miningSuccess ? "success" : ""}`}>
                {currentHash}
              </code>
            </div>

            {miningSuccess && (
              <div className="mining-success">
                <span className="success-icon">◆</span>
                <span className="success-text">Block Found!</span>
                <span className="success-reward">+6.25 BTC</span>
              </div>
            )}

            <div className="mining-progress">
              <div
                className="progress-fill"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>

          {/* Mining Explanation */}
          <div className={`mining-cards ${progress > 0.3 ? "visible" : ""}`}>
            <div className="mining-card">
              <span className="card-icon">◇</span>
              <h4>The Puzzle</h4>
              <p>
                Find a nonce that produces a hash below the target. More leading 
                zeros = harder puzzle. Difficulty adjusts every 2,016 blocks.
              </p>
            </div>
            <div className="mining-card">
              <span className="card-icon">◈</span>
              <h4>The Race</h4>
              <p>
                Thousands of miners worldwide compete simultaneously. First valid 
                solution wins the block reward and transaction fees.
              </p>
            </div>
            <div className="mining-card">
              <span className="card-icon">◆</span>
              <h4>The Security</h4>
              <p>
                To attack the network, you&apos;d need more computing power than all 
                honest miners combined. The cost exceeds any possible reward.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CHAPTER 7: Consensus & Truth
// ============================================

const Chapter7: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(2.5);
  const { ref: sectionRef, isVisible } = useIntersectionReveal(0.1);

  const forkPhase = useMemo(() => {
    if (progress < 0.25) return 0;
    if (progress < 0.5) return 1;
    if (progress < 0.75) return 2;
    return 3;
  }, [progress]);

  return (
    <section
      id="chapter-7"
      className="chapter chapter-7 scroll-lock-container"
      ref={containerRef}
      style={{ height: "300vh" }}
    >
      <div className={`chapter-pinned ${isPinned ? "pinned" : ""}`} ref={sectionRef}>
        <div className="chapter-header">
          <span className={`chapter-number ${isVisible ? "reveal" : ""}`}>VII</span>
          <h2 className={`chapter-title ${isVisible ? "reveal" : ""}`}>
            Consensus & Truth
          </h2>
          <p className={`chapter-subtitle ${isVisible ? "reveal" : ""}`}>
            In a world without authorities, how do strangers agree on what&apos;s real?
          </p>
        </div>

        <div className="chapter-content">
          <div className={`consensus-narrative ${isVisible ? "reveal" : ""}`}>
            <p className="lead-text">
              The Byzantine Generals Problem, solved.
            </p>
            <p>
              Imagine generals surrounding a city. They must all attack together or 
              all retreat—but some might be traitors sending conflicting messages. 
              How do you achieve consensus without trust?
            </p>
          </div>

          {/* Fork Resolution Animation */}
          <div className="fork-animation">
            <div className={`fork-visual phase-${forkPhase}`}>
              {/* Main Chain */}
              <div className="chain-main">
                <div className="block-mini">1</div>
                <div className="chain-link-mini" />
                <div className="block-mini">2</div>
                <div className="chain-link-mini" />
                <div className="block-mini">3</div>
                <div className="chain-link-mini" />
              </div>

              {/* Fork Point */}
              <div className={`fork-point ${forkPhase >= 1 ? "active" : ""}`}>
                {/* Chain A */}
                <div className={`fork-branch branch-a ${forkPhase >= 1 ? "visible" : ""}`}>
                  <div className="block-mini chain-a">4a</div>
                  {forkPhase >= 2 && (
                    <>
                      <div className="chain-link-mini" />
                      <div className="block-mini chain-a">5a</div>
                      <div className="chain-link-mini" />
                      <div className="block-mini chain-a">6a</div>
                    </>
                  )}
                </div>

                {/* Chain B */}
                <div className={`fork-branch branch-b ${forkPhase >= 1 ? "visible" : ""}`}>
                  <div className="block-mini chain-b">4b</div>
                  {forkPhase >= 2 && (
                    <>
                      <div className="chain-link-mini" />
                      <div className="block-mini chain-b orphaned">5b</div>
                    </>
                  )}
                </div>
              </div>

              {/* Winner indication */}
              {forkPhase >= 3 && (
                <div className="fork-winner">
                  <span className="winner-label">Longest Chain Wins</span>
                  <span className="winner-arrow">↑</span>
                </div>
              )}
            </div>

            <div className="fork-explanation">
              {forkPhase === 0 && (
                <p>The blockchain grows one block at a time...</p>
              )}
              {forkPhase === 1 && (
                <p>Two miners find valid blocks simultaneously—a fork!</p>
              )}
              {forkPhase === 2 && (
                <p>Both chains continue. Miners choose which to build on.</p>
              )}
              {forkPhase === 3 && (
                <p>
                  <strong>Longest chain wins.</strong> Chain B is orphaned. 
                  Its transactions return to the mempool.
                </p>
              )}
            </div>
          </div>

          {/* Consensus Rules */}
          <div className={`consensus-rules ${progress > 0.6 ? "visible" : ""}`}>
            <h3>The Rules of Truth</h3>
            <div className="rules-list">
              <div className="rule-item">
                <span className="rule-number">1</span>
                <div className="rule-content">
                  <h4>Longest Chain Rule</h4>
                  <p>The chain with the most accumulated proof-of-work is the valid chain.</p>
                </div>
              </div>
              <div className="rule-item">
                <span className="rule-number">2</span>
                <div className="rule-content">
                  <h4>Independent Verification</h4>
                  <p>Every node validates every transaction and block independently.</p>
                </div>
              </div>
              <div className="rule-item">
                <span className="rule-number">3</span>
                <div className="rule-content">
                  <h4>Economic Incentives</h4>
                  <p>Honesty pays. Cheating costs more than it could ever gain.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CHAPTER 8: The Living Ledger
// ============================================

const Chapter8: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const [networkActivity, setNetworkActivity] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setNetworkActivity((prev) => (prev + 1) % 100);
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section id="chapter-8" className="chapter chapter-8" ref={ref}>
      <div className="chapter-header">
        <span className={`chapter-number ${isVisible ? "reveal" : ""}`}>VIII</span>
        <h2 className={`chapter-title ${isVisible ? "reveal" : ""}`}>
          The Living Ledger
        </h2>
        <p className={`chapter-subtitle ${isVisible ? "reveal" : ""}`}>
          Every ten minutes, a new page is written in humanity&apos;s most transparent 
          financial record.
        </p>
      </div>

      <div className="chapter-content">
        {/* Network Visualization */}
        <div className={`network-visual ${isVisible ? "reveal" : ""}`}>
          <svg className="network-svg" viewBox="0 0 500 300">
            {/* Global network connections */}
            <g className="network-connections">
              {[...Array(20)].map((_, i) => {
                const x1 = 50 + (i % 5) * 100;
                const y1 = 50 + Math.floor(i / 5) * 60;
                const x2 = 50 + ((i + 1) % 5) * 100;
                const y2 = 50 + Math.floor((i + 2) / 5) * 60;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#3B82F6"
                    strokeWidth="1"
                    opacity={0.3 + (networkActivity === i ? 0.5 : 0)}
                  />
                );
              })}
            </g>
            {/* Nodes */}
            <g className="network-nodes">
              {[...Array(15)].map((_, i) => {
                const x = 50 + (i % 5) * 100;
                const y = 75 + Math.floor(i / 5) * 75;
                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r={8}
                      fill="#050508"
                      stroke="#00E5FF"
                      strokeWidth="2"
                      opacity={0.6 + (networkActivity % 15 === i ? 0.4 : 0)}
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={3}
                      fill="#00E5FF"
                      opacity={networkActivity % 15 === i ? 1 : 0.5}
                    />
                  </g>
                );
              })}
            </g>
          </svg>
          <p className="network-caption">
            Thousands of nodes. Every transaction. Every block. Synchronized.
          </p>
        </div>

        {/* Transaction Flow */}
        <div className={`flow-diagram ${isVisible ? "reveal" : ""}`}>
          <h3>The Complete Journey</h3>
          <div className="flow-steps">
            <div className="flow-step">
              <div className="step-icon">1</div>
              <h4>Broadcast</h4>
              <p>Transaction signed and sent to the network</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="step-icon">2</div>
              <h4>Validate</h4>
              <p>Nodes verify signature and balance</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="step-icon">3</div>
              <h4>Mempool</h4>
              <p>Waiting for inclusion in a block</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="step-icon">4</div>
              <h4>Mine</h4>
              <p>Miners compete to include it</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="step-icon">5</div>
              <h4>Confirm</h4>
              <p>Block added. Transaction permanent.</p>
            </div>
          </div>
        </div>

        {/* Legacy Stats */}
        <div className={`legacy-stats ${isVisible ? "reveal" : ""}`}>
          <div className="stat-card">
            <span className="stat-value">$1T+</span>
            <span className="stat-label">Market Cap Peak</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">15K+</span>
            <span className="stat-label">Cryptocurrencies</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">400M+</span>
            <span className="stat-label">Global Users</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">15+</span>
            <span className="stat-label">Years Running</span>
          </div>
        </div>

        {/* Final Reflection */}
        <div className={`final-reflection ${isVisible ? "reveal" : ""}`}>
          <p className="reflection-lead">
            Blockchain didn&apos;t just create a new currency.
          </p>
          <p>
            It proved that strangers across the world could agree on truth without 
            knowing or trusting each other. That math could replace institutions. 
            That the ledger could belong to everyone and no one.
          </p>
          <p>
            Whether you see it as liberation or speculation, revolution or excess, 
            one thing is undeniable: the way we think about trust, money, and 
            coordination will never be the same.
          </p>
        </div>

        <blockquote className="closing-quote">
          <p>
            &ldquo;If you don&apos;t believe me or don&apos;t get it, I don&apos;t have time to try 
            to convince you, sorry.&rdquo;
          </p>
          <cite>— Satoshi Nakamoto, 2010</cite>
        </blockquote>
      </div>
    </section>
  );
};

// ============================================
// SOURCES SECTION
// ============================================

const SourcesSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  const sources = [
    {
      category: "Primary Sources",
      items: [
        {
          title: "Bitcoin: A Peer-to-Peer Electronic Cash System",
          author: "Satoshi Nakamoto",
          year: "2008",
          url: "https://bitcoin.org/bitcoin.pdf",
        },
        {
          title: "A Cypherpunk's Manifesto",
          author: "Eric Hughes",
          year: "1993",
          url: "https://www.activism.net/cypherpunk/manifesto.html",
        },
        {
          title: "b-money",
          author: "Wei Dai",
          year: "1998",
          url: "http://www.weidai.com/bmoney.txt",
        },
        {
          title: "Hashcash - A Denial of Service Counter-Measure",
          author: "Adam Back",
          year: "2002",
          url: "http://www.hashcash.org/papers/hashcash.pdf",
        },
      ],
    },
    {
      category: "Books & Academic",
      items: [
        {
          title: "Digital Gold: Bitcoin and the Inside Story of the Misfits and Millionaires Trying to Reinvent Money",
          author: "Nathaniel Popper",
          year: "2015",
        },
        {
          title: "Bitcoin and Cryptocurrency Technologies",
          author: "Narayanan, Bonneau, Felten, Miller, Goldfeder",
          year: "2016",
          note: "Princeton University Press",
        },
        {
          title: "Mastering Bitcoin",
          author: "Andreas M. Antonopoulos",
          year: "2017",
          note: "O'Reilly Media",
        },
      ],
    },
    {
      category: "Archives & Resources",
      items: [
        {
          title: "Satoshi Nakamoto Institute",
          url: "https://nakamotoinstitute.org/",
          note: "Complete Satoshi emails, posts, and whitepaper",
        },
        {
          title: "Bitcoin Forum Archives",
          url: "https://bitcointalk.org/",
          note: "Original discussions and Satoshi's posts",
        },
        {
          title: "Cypherpunks Mailing List Archives",
          note: "Where the ideas that became Bitcoin were first debated",
        },
      ],
    },
  ];

  return (
    <section className="sources-section" ref={ref}>
      <h2 className={`sources-title ${isVisible ? "reveal" : ""}`}>
        Sources & Further Reading
      </h2>

      <div className={`sources-grid ${isVisible ? "reveal" : ""}`}>
        {sources.map((category) => (
          <div key={category.category} className="source-category">
            <h3>{category.category}</h3>
            <ul>
              {category.items.map((item, i) => (
                <li key={i}>
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <strong>{item.title}</strong>
                    </a>
                  ) : (
                    <strong>{item.title}</strong>
                  )}
                  {item.author && <span className="source-author"> — {item.author}</span>}
                  {item.year && <span className="source-year"> ({item.year})</span>}
                  {item.note && <span className="source-note">{item.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="sources-note">
        This visual essay synthesizes primary sources, academic research, and 
        historical archives to present an accurate account of blockchain's origins 
        and mechanics.
      </p>
    </section>
  );
};

// ============================================
// FOOTER
// ============================================

const Footer: React.FC = () => {
  return (
    <footer className="essay-footer">
      <div className="footer-content">
        <div className="footer-icon">
          <ChainLinkSVG filled glowing />
        </div>
        <p className="footer-tagline">
          Trust, reimagined. Value, decentralized.
        </p>
        <p className="footer-credit">
          A Visual Essay by <strong>Esy</strong>
        </p>
      </div>
    </footer>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function LedgerOfTrustClient() {
  const { progress } = useScrollProgress();
  const [currentChapter, setCurrentChapter] = useState(0);

  // Track current chapter based on scroll position
  useEffect(() => {
    const updateChapter = () => {
      const chapterElements = document.querySelectorAll(".chapter");
      let current = 0;

      chapterElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5) {
          current = index;
        }
      });

      setCurrentChapter(current);
    };

    window.addEventListener("scroll", updateChapter, { passive: true });
    updateChapter();

    return () => window.removeEventListener("scroll", updateChapter);
  }, []);

  return (
    <article className="ledger-of-trust-essay">
      {/* Progress Bar */}
      <ChainProgressBar progress={progress} currentChapter={currentChapter} />

      {/* Hero */}
      <HeroSection />

      {/* Main Content */}
      <main className="essay-narrative">
        <Chapter1 />
        <Chapter2 />
        <Chapter3 />
        <Chapter4 />
        <Chapter5 />
        <Chapter6 />
        <Chapter7 />
        <Chapter8 />
      </main>

      {/* Sources */}
      <SourcesSection />

      {/* Footer */}
      <Footer />
    </article>
  );
}

