"use client";

import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import "./blockchain.css";

/* ===========================================
   THE BLOCKCHAIN
   How Digital Trust Transformed Money
   A Cinematic Visual Essay
   ===========================================
   
   DESIGN PHILOSOPHY:
   - Digital aesthetic with neon accents
   - Chain links as progress indicator
   - Block animations that connect
   - Terminal/code aesthetics for data
   - Scroll-locking sections for key animations
   - Mobile-native, 60fps GPU-accelerated
   
   COLOR PALETTE:
   - Electric Blue (#00D4FF) — digital, data streams
   - Neon Purple (#8B5CF6) — crypto mystique
   - Matrix Green (#00FF88) — validation, success
   - Deep Navy (#0A0E1A) — trustworthy dark
   - Node Orange (#FF6B35) — network nodes
   - Gold (#FFD700) — value, Bitcoin
   
   MOVEMENTS:
   I.   GENESIS — The problem of digital trust
   II.  THE PIONEERS — Cypherpunks who dreamed
   III. THE DOUBLE-SPEND — Why digital cash failed
   IV.  THE CHAIN — Blocks linked by math
   V.   THE MINERS — Proof of work explained
   VI.  SATOSHI — The anonymous revolution
   VII. THE LEDGER — How it all connects
   VIII.LEGACY — The world blockchain built
   =========================================== */

// ============================================
// SCROLL UTILITIES
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

// Scroll-locking hook for pinned sections
const usePinnedSection = (sectionHeight: number = 3) => {
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

      // Calculate how far through the section we've scrolled
      if (rect.top <= 0 && rect.bottom >= viewportHeight) {
        // We're in the pinned zone
        const scrolledInSection = -rect.top;
        const sectionProgress = Math.min(1, Math.max(0, scrolledInSection / scrollableDistance));
        setProgress(sectionProgress);
        setIsPinned(true);
      } else if (rect.top > 0) {
        // Before the section
        setProgress(0);
        setIsPinned(false);
      } else {
        // After the section
        setProgress(1);
        setIsPinned(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionHeight]);

  return { containerRef, progress, isPinned };
};

// ============================================
// SVG COMPONENTS — Blockchain Visuals
// ============================================

const BlockchainLink: React.FC<{ filled?: boolean; index?: number }> = ({ 
  filled = false, 
  index = 0 
}) => {
  return (
    <svg
      className={`chain-link-svg ${filled ? "filled" : ""}`}
      viewBox="0 0 24 12"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <rect
        x="1"
        y="1"
        width="10"
        height="10"
        rx="2"
        className="link-block"
      />
      <line x1="11" y1="6" x2="13" y2="6" className="link-connector" />
      <rect
        x="13"
        y="1"
        width="10"
        height="10"
        rx="2"
        className="link-block"
      />
    </svg>
  );
};

const BlockSVG: React.FC<{ 
  progress?: number; 
  blockNumber?: number;
  hash?: string;
  prevHash?: string;
  data?: string;
}> = ({ 
  progress = 1, 
  blockNumber = 1,
  hash = "0x7f8a...",
  prevHash = "0x0000...",
  data = "Transactions"
}) => {
  return (
    <div className="block-container" style={{ opacity: progress }}>
      <div className="block-card">
        <div className="block-header">
          <span className="block-number">Block #{blockNumber}</span>
          <span className="block-status">Confirmed</span>
        </div>
        <div className="block-content">
          <div className="block-field">
            <span className="field-label">Prev Hash</span>
            <span className="field-value hash">{prevHash}</span>
          </div>
          <div className="block-field">
            <span className="field-label">Data</span>
            <span className="field-value">{data}</span>
          </div>
          <div className="block-field">
            <span className="field-label">Hash</span>
            <span className="field-value hash highlight">{hash}</span>
          </div>
        </div>
        <div className="block-nonce">
          <span>Nonce: {Math.floor(progress * 2500000)}</span>
        </div>
      </div>
    </div>
  );
};

const NetworkNode: React.FC<{ 
  x: number; 
  y: number; 
  active?: boolean;
  delay?: number;
}> = ({ x, y, active = false, delay = 0 }) => {
  return (
    <g 
      className={`network-node ${active ? "active" : ""}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <circle cx={x} cy={y} r="8" className="node-outer" />
      <circle cx={x} cy={y} r="4" className="node-inner" />
    </g>
  );
};

const NetworkGraph: React.FC<{ progress?: number }> = ({ progress = 0 }) => {
  const nodes = [
    { x: 100, y: 80, delay: 0 },
    { x: 200, y: 40, delay: 0.1 },
    { x: 300, y: 80, delay: 0.2 },
    { x: 150, y: 140, delay: 0.15 },
    { x: 250, y: 140, delay: 0.25 },
    { x: 50, y: 140, delay: 0.05 },
    { x: 350, y: 140, delay: 0.3 },
    { x: 200, y: 180, delay: 0.35 },
  ];

  const connections = [
    [0, 1], [1, 2], [0, 3], [2, 4], [3, 4], [0, 5], [2, 6], [3, 7], [4, 7], [1, 3], [1, 4]
  ];

  return (
    <svg className="network-graph" viewBox="0 0 400 220">
      <defs>
        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--electric-blue)" stopOpacity="0.2" />
          <stop offset="50%" stopColor="var(--electric-blue)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--electric-blue)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {/* Connections */}
      <g className="connections">
        {connections.map(([from, to], i) => (
          <line
            key={i}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            className={`connection ${progress > (i / connections.length) ? "active" : ""}`}
            strokeDasharray="4 2"
          />
        ))}
      </g>
      
      {/* Nodes */}
      {nodes.map((node, i) => (
        <NetworkNode 
          key={i}
          {...node}
          active={progress > (i / nodes.length)}
        />
      ))}
    </svg>
  );
};

const HashAnimation: React.FC<{ text: string; revealed?: boolean }> = ({ 
  text, 
  revealed = false 
}) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "0123456789abcdef";

  useEffect(() => {
    if (!revealed) {
      setDisplayText(Array(text.length).fill("_").join(""));
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [revealed, text]);

  return <span className="hash-animated">{displayText}</span>;
};

const MiningAnimation: React.FC<{ progress: number }> = ({ progress }) => {
  const attempts = Math.floor(progress * 2500000);
  const difficulty = "0000";
  const currentHash = useMemo(() => {
    if (progress >= 0.95) {
      return "0000" + "a8f7c2e9b3d1".slice(0, 60);
    }
    const randomHex = Array(64).fill(0).map(() => 
      "0123456789abcdef"[Math.floor(Math.random() * 16)]
    ).join("");
    return randomHex;
  }, [progress > 0.95 ? 1 : Math.floor(progress * 10)]);

  return (
    <div className="mining-animation">
      <div className="mining-display">
        <div className="mining-stat">
          <span className="stat-label">Target Difficulty</span>
          <span className="stat-value difficulty">{difficulty}...</span>
        </div>
        <div className="mining-stat">
          <span className="stat-label">Attempts</span>
          <span className="stat-value attempts">{attempts.toLocaleString()}</span>
        </div>
      </div>
      <div className="hash-display">
        <span className="hash-label">Current Hash:</span>
        <code className={`hash-value ${progress >= 0.95 ? "success" : ""}`}>
          {currentHash.slice(0, 32)}...
        </code>
      </div>
      {progress >= 0.95 && (
        <div className="mining-success">
          <span className="success-icon">◆</span>
          <span>Block Found!</span>
        </div>
      )}
    </div>
  );
};

const DataFlowParticles: React.FC<{ count?: number }> = ({ count = 20 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: 2 + Math.random() * 3,
    }));
  }, [count]);

  return (
    <div className="data-particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="data-particle"
          style={{
            left: `${p.x}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}
    </div>
  );
};

// ============================================
// HISTORICAL FIGURES DATA
// ============================================

const pioneers = [
  {
    name: "David Chaum",
    year: "1983",
    contribution: "DigiCash & Blind Signatures",
    description: "The godfather of digital currency. His 1983 paper introduced blind signatures, allowing untraceable digital payments. DigiCash was decades ahead—and failed because the world wasn't ready.",
    quote: "You can pay for access to a database, buy software or a newsletter by e-mail, play a computer game, receive $5 owed you by a friend, or just order a pizza."
  },
  {
    name: "Adam Back",
    year: "1997", 
    contribution: "Hashcash",
    description: "Created Hashcash to combat email spam using proof-of-work. This computational puzzle—requiring real work to send messages—became the foundation of Bitcoin's mining algorithm.",
    quote: "Hashcash is a denial-of-service counter measure tool... a textual encoding of a hashcash stamp."
  },
  {
    name: "Wei Dai",
    year: "1998",
    contribution: "b-money",
    description: "Proposed b-money, an anonymous distributed electronic cash system. Never implemented, but Satoshi cited it as a key inspiration. Dai envisioned money created by computational puzzles.",
    quote: "A scheme for a group of untraceable digital pseudonyms to pay each other with money and to enforce contracts amongst themselves without outside help."
  },
  {
    name: "Nick Szabo",
    year: "1998-2005",
    contribution: "Bit Gold & Smart Contracts",
    description: "Designed Bit Gold, the most direct precursor to Bitcoin. Also invented the concept of 'smart contracts'—self-executing agreements that would power Ethereum decades later.",
    quote: "Bit gold would benefit from a database of property titles and their histories."
  },
  {
    name: "Hal Finney",
    year: "2004-2009",
    contribution: "RPOW & First Bitcoin Transaction",
    description: "Created Reusable Proof of Work (RPOW). Received the first-ever Bitcoin transaction from Satoshi Nakamoto on January 12, 2009. A cryptographic legend who believed until his last days.",
    quote: "Running bitcoin. When Satoshi announced the first release of the software, I grabbed it right away."
  },
  {
    name: "Satoshi Nakamoto",
    year: "2008-2010",
    contribution: "Bitcoin",
    description: "The anonymous creator who synthesized decades of cryptographic research into a working system. Published the Bitcoin whitepaper on October 31, 2008, then vanished in 2010, leaving behind a revolution.",
    quote: "I've been working on a new electronic cash system that's fully peer-to-peer, with no trusted third party."
  }
];

// ============================================
// SECTION COMPONENTS
// ============================================

const HeroSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <header className="blockchain-hero" ref={ref}>
      <DataFlowParticles count={30} />
      
      <div className="hero-backdrop">
        <div className="grid-overlay" />
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
      </div>

      <div className="hero-content">
        <div className={`hero-badge ${isVisible ? "reveal" : ""}`}>
          <span className="badge-dot" />
          <span>Visual Essay</span>
        </div>

        <h1 className={`hero-title ${isVisible ? "reveal" : ""}`}>
          <span className="title-line">The</span>
          <span className="title-line accent">Blockchain</span>
        </h1>

        <p className={`hero-subtitle ${isVisible ? "reveal" : ""}`}>
          How Digital Trust Transformed Money
        </p>

        <p className={`hero-description ${isVisible ? "reveal" : ""}`}>
          From cypherpunk manifestos to trillion-dollar networks. The story of 
          how a pseudonymous inventor and decades of cryptographic dreams 
          created a new foundation for trust itself.
        </p>

        <div className={`hero-meta ${isVisible ? "reveal" : ""}`}>
          <span className="meta-item">
            <span className="meta-icon">◷</span>
            25 min read
          </span>
          <span className="meta-item">
            <span className="meta-icon">◆</span>
            Technology
          </span>
          <span className="meta-item">
            <span className="meta-icon">⬡</span>
            Interactive
          </span>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Begin the journey</span>
        <div className="scroll-arrow" />
      </div>
    </header>
  );
};

const GenesisSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.15);

  return (
    <section className="movement genesis" ref={ref}>
      <div className="movement-header">
        <span className={`movement-number ${isVisible ? "reveal" : ""}`}>I</span>
        <h2 className={`movement-title ${isVisible ? "reveal" : ""}`}>Genesis</h2>
        <p className={`movement-subtitle ${isVisible ? "reveal" : ""}`}>
          The Problem of Digital Trust
        </p>
      </div>

      <div className="genesis-content">
        <div className={`genesis-narrative ${isVisible ? "reveal" : ""}`}>
          <p className="lead-text">
            For thousands of years, money required trust in institutions.
          </p>
          <p>
            Banks held your gold. Governments backed your paper. Every transaction 
            passed through gatekeepers who could freeze accounts, reverse payments, 
            or simply say no. The system worked—but it was never truly yours.
          </p>
          <p>
            Then came the internet. Information could flow freely across borders, 
            copied infinitely at zero cost. But money couldn&apos;t. Digital files could 
            be duplicated—how do you make digital cash that can&apos;t be counterfeited 
            by copying it?
          </p>
        </div>

        <div className={`problem-illustration ${isVisible ? "reveal" : ""}`}>
          <div className="trust-diagram">
            <div className="trust-node central">
              <span className="node-icon">⬢</span>
              <span className="node-label">Bank</span>
            </div>
            <div className="trust-connections">
              <div className="trust-arrow arrow-1" />
              <div className="trust-arrow arrow-2" />
              <div className="trust-arrow arrow-3" />
              <div className="trust-arrow arrow-4" />
            </div>
            <div className="trust-node user user-1">
              <span className="node-label">You</span>
            </div>
            <div className="trust-node user user-2">
              <span className="node-label">Merchant</span>
            </div>
            <div className="trust-node user user-3">
              <span className="node-label">Employer</span>
            </div>
            <div className="trust-node user user-4">
              <span className="node-label">Friend</span>
            </div>
          </div>
          <p className="diagram-caption">
            Traditional finance: Every transaction requires a trusted middleman
          </p>
        </div>
      </div>

      <blockquote className="genesis-quote">
        <p>
          &ldquo;The root problem with conventional currency is all the trust that&apos;s 
          required to make it work. The central bank must be trusted not to 
          debase the currency, but the history of fiat currencies is full of 
          breaches of that trust.&rdquo;
        </p>
        <cite>— Satoshi Nakamoto, 2009</cite>
      </blockquote>
    </section>
  );
};

const PioneersSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const [activePioneer, setActivePioneer] = useState(0);

  return (
    <section className="movement pioneers" ref={ref}>
      <div className="movement-header">
        <span className={`movement-number ${isVisible ? "reveal" : ""}`}>II</span>
        <h2 className={`movement-title ${isVisible ? "reveal" : ""}`}>The Pioneers</h2>
        <p className={`movement-subtitle ${isVisible ? "reveal" : ""}`}>
          Cypherpunks Who Dreamed of Digital Cash
        </p>
      </div>

      <div className="pioneers-intro">
        <p className={`lead-text ${isVisible ? "reveal" : ""}`}>
          Bitcoin didn&apos;t emerge from nothing. It was built on decades of work 
          by cryptographers, hackers, and visionaries who imagined a world 
          where money could move as freely as email.
        </p>
      </div>

      <div className="pioneers-timeline">
        <div className="timeline-track">
          {pioneers.map((pioneer, index) => (
            <button
              key={pioneer.name}
              className={`timeline-node ${activePioneer === index ? "active" : ""} ${isVisible ? "reveal" : ""}`}
              onClick={() => setActivePioneer(index)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="node-year">{pioneer.year}</span>
              <span className="node-dot" />
              <span className="node-name">{pioneer.name.split(" ")[1]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`pioneer-detail ${isVisible ? "reveal" : ""}`}>
        <div className="pioneer-card" key={activePioneer}>
          <div className="pioneer-header">
            <h3 className="pioneer-name">{pioneers[activePioneer].name}</h3>
            <span className="pioneer-year">{pioneers[activePioneer].year}</span>
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

      <div className="cypherpunk-manifesto">
        <h4>The Cypherpunk Creed</h4>
        <p>
          &ldquo;We the Cypherpunks are dedicated to building anonymous systems. 
          We are defending our privacy with cryptography, with anonymous mail 
          forwarding systems, with digital signatures, and with electronic money.&rdquo;
        </p>
        <cite>— A Cypherpunk&apos;s Manifesto, Eric Hughes, 1993</cite>
      </div>
    </section>
  );
};

const DoubleSpendSection: React.FC = () => {
  const { containerRef, progress, isPinned } = usePinnedSection(3);
  const { ref, isVisible } = useIntersectionReveal(0.1);

  const step = useMemo(() => {
    if (progress < 0.25) return 0;
    if (progress < 0.5) return 1;
    if (progress < 0.75) return 2;
    return 3;
  }, [progress]);

  return (
    <section 
      className="movement double-spend pinned-container" 
      ref={containerRef}
      style={{ height: `300vh` }}
    >
      <div className={`pinned-content ${isPinned ? "pinned" : ""}`} ref={ref}>
        <div className="movement-header">
          <span className={`movement-number ${isVisible ? "reveal" : ""}`}>III</span>
          <h2 className={`movement-title ${isVisible ? "reveal" : ""}`}>The Double-Spend</h2>
          <p className={`movement-subtitle ${isVisible ? "reveal" : ""}`}>
            Why Digital Cash Failed For Decades
          </p>
        </div>

        <div className="double-spend-animation">
          <div className="animation-frame">
            {/* Alice */}
            <div className={`actor alice ${step >= 0 ? "active" : ""}`}>
              <div className="actor-avatar">A</div>
              <span className="actor-name">Alice</span>
              <div className="actor-balance">
                Balance: <span className="balance-value">$10</span>
              </div>
            </div>

            {/* Digital File */}
            <div className={`digital-file ${step >= 1 ? "copying" : ""} ${step >= 2 ? "copied" : ""}`}>
              <div className="file-icon">
                <span className="file-symbol">$</span>
              </div>
              <span className="file-label">digital_dollar.dat</span>
              {step >= 2 && (
                <div className="file-copy">
                  <div className="file-icon copy">
                    <span className="file-symbol">$</span>
                  </div>
                </div>
              )}
            </div>

            {/* Recipients */}
            <div className="recipients">
              <div className={`actor bob ${step >= 2 ? "receiving" : ""}`}>
                <div className="actor-avatar">B</div>
                <span className="actor-name">Bob</span>
                <div className={`payment-arrow ${step >= 2 ? "active" : ""}`} />
              </div>
              <div className={`actor charlie ${step >= 2 ? "receiving" : ""}`}>
                <div className="actor-avatar">C</div>
                <span className="actor-name">Charlie</span>
                <div className={`payment-arrow ${step >= 2 ? "active" : ""}`} />
              </div>
            </div>
          </div>

          <div className="animation-explanation">
            {step === 0 && (
              <div className="step-text">
                <h4>The Setup</h4>
                <p>Alice has a digital $10 bill—a file on her computer.</p>
              </div>
            )}
            {step === 1 && (
              <div className="step-text">
                <h4>The Problem</h4>
                <p>Digital files can be copied infinitely. What stops Alice from copying her $10?</p>
              </div>
            )}
            {step === 2 && (
              <div className="step-text warning">
                <h4>Double Spending</h4>
                <p>Alice copies her $10 and sends it to both Bob AND Charlie. Now $10 became $20.</p>
              </div>
            )}
            {step === 3 && (
              <div className="step-text solution">
                <h4>The Solution?</h4>
                <p>Traditional systems use a central authority to prevent this. But what if we don&apos;t want a central authority?</p>
              </div>
            )}
          </div>
        </div>

        <div className={`scroll-progress-indicator ${isVisible ? "reveal" : ""}`}>
          <div className="progress-dots">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`progress-dot ${step >= i ? "active" : ""}`} />
            ))}
          </div>
          <span className="scroll-hint">Keep scrolling</span>
        </div>
      </div>
    </section>
  );
};

const ChainSection: React.FC = () => {
  const { containerRef, progress, isPinned } = usePinnedSection(4);
  const { ref, isVisible } = useIntersectionReveal(0.1);

  const visibleBlocks = useMemo(() => {
    return Math.min(4, Math.floor(progress * 5));
  }, [progress]);

  return (
    <section 
      className="movement chain-section pinned-container" 
      ref={containerRef}
      style={{ height: `400vh` }}
    >
      <div className={`pinned-content ${isPinned ? "pinned" : ""}`} ref={ref}>
        <div className="movement-header">
          <span className={`movement-number ${isVisible ? "reveal" : ""}`}>IV</span>
          <h2 className={`movement-title ${isVisible ? "reveal" : ""}`}>The Chain</h2>
          <p className={`movement-subtitle ${isVisible ? "reveal" : ""}`}>
            Blocks Linked By Mathematics
          </p>
        </div>

        <div className="chain-narrative">
          <p className={`lead-text ${isVisible ? "reveal" : ""}`}>
            Satoshi&apos;s breakthrough: What if every transaction was recorded in blocks, 
            and each block was mathematically linked to the one before it?
          </p>
        </div>

        <div className="chain-animation">
          <div className="blocks-container">
            {Array.from({ length: 4 }).map((_, i) => (
              <div 
                key={i} 
                className={`chain-block ${i < visibleBlocks ? "visible" : ""}`}
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="block-inner">
                  <div className="block-header">
                    <span className="block-num">Block {i + 1}</span>
                  </div>
                  <div className="block-hash">
                    <span className="hash-label">Hash</span>
                    <code className="hash-value">
                      {`0x${["a7f3", "c2e8", "91b4", "d5f6"][i]}...`}
                    </code>
                  </div>
                  <div className="block-prev">
                    <span className="prev-label">Prev</span>
                    <code className="prev-value">
                      {i === 0 ? "0x0000..." : `0x${["", "a7f3", "c2e8", "91b4"][i]}...`}
                    </code>
                  </div>
                  <div className="block-data">
                    <span className="data-label">Data</span>
                    <span className="data-value">
                      {["Genesis", "Alice → Bob: 5", "Bob → Eve: 2", "Eve → Dan: 1"][i]}
                    </span>
                  </div>
                </div>
                {i < 3 && i < visibleBlocks - 1 && (
                  <div className="chain-connector">
                    <div className="connector-line" />
                    <div className="connector-arrow" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={`chain-explanation ${visibleBlocks >= 2 ? "visible" : ""}`}>
          <div className="explanation-card">
            <h4>Immutable By Design</h4>
            <p>
              Each block contains a cryptographic hash of the previous block. 
              Change one transaction, and you break every block after it. 
              The chain becomes its own proof of integrity.
            </p>
          </div>
        </div>

        <div className={`metaphor-box ${visibleBlocks >= 3 ? "visible" : ""}`}>
          <div className="metaphor-icon">⬡</div>
          <div className="metaphor-content">
            <h4>The Amber Metaphor</h4>
            <p>
              Imagine transactions frozen in amber. Each layer of amber references 
              the one below. To change something at the bottom, you&apos;d have to 
              melt and re-create every layer above it—while everyone is watching.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const MinersSection: React.FC = () => {
  const { containerRef, progress, isPinned } = usePinnedSection(3);
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section 
      className="movement miners pinned-container" 
      ref={containerRef}
      style={{ height: `300vh` }}
    >
      <div className={`pinned-content ${isPinned ? "pinned" : ""}`} ref={ref}>
        <div className="movement-header">
          <span className={`movement-number ${isVisible ? "reveal" : ""}`}>V</span>
          <h2 className={`movement-title ${isVisible ? "reveal" : ""}`}>The Miners</h2>
          <p className={`movement-subtitle ${isVisible ? "reveal" : ""}`}>
            Proof of Work: Security Through Computation
          </p>
        </div>

        <div className={`miners-narrative ${isVisible ? "reveal" : ""}`}>
          <p className="lead-text">
            But who decides which transactions are valid? Who writes the blocks?
          </p>
          <p>
            In traditional systems, a central authority validates. In blockchain, 
            anyone can compete to write the next block—but they must prove they 
            did real computational work first.
          </p>
        </div>

        <div className="mining-demonstration">
          <MiningAnimation progress={progress} />
        </div>

        <div className={`mining-explanation ${progress > 0.3 ? "visible" : ""}`}>
          <div className="explanation-grid">
            <div className="exp-card">
              <span className="exp-icon">◇</span>
              <h4>The Puzzle</h4>
              <p>
                Find a number (nonce) that, when combined with block data and 
                hashed, produces a result starting with zeros. More zeros = harder.
              </p>
            </div>
            <div className="exp-card">
              <span className="exp-icon">◈</span>
              <h4>The Competition</h4>
              <p>
                Thousands of miners race to solve the puzzle. First to find a 
                valid solution broadcasts the block and earns the reward.
              </p>
            </div>
            <div className="exp-card">
              <span className="exp-icon">◆</span>
              <h4>The Security</h4>
              <p>
                To cheat, an attacker would need more computing power than all 
                honest miners combined. The cost of attack exceeds the reward.
              </p>
            </div>
          </div>
        </div>

        <div className={`pow-metaphor ${progress > 0.6 ? "visible" : ""}`}>
          <h4>The Gold Mining Metaphor</h4>
          <p>
            Like gold miners who expend real energy digging for rare metal, 
            Bitcoin miners expend real electricity searching for rare numbers. 
            The energy isn&apos;t wasted—it&apos;s converted into security. Every watt 
            makes the network harder to attack.
          </p>
        </div>
      </div>
    </section>
  );
};

const SatoshiSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section className="movement satoshi" ref={ref}>
      <div className="movement-header">
        <span className={`movement-number ${isVisible ? "reveal" : ""}`}>VI</span>
        <h2 className={`movement-title ${isVisible ? "reveal" : ""}`}>Satoshi</h2>
        <p className={`movement-subtitle ${isVisible ? "reveal" : ""}`}>
          The Anonymous Revolution
        </p>
      </div>

      <div className="satoshi-timeline">
        <div className={`timeline-event ${isVisible ? "reveal" : ""}`} style={{ animationDelay: "0s" }}>
          <div className="event-date">
            <span className="date-day">31</span>
            <span className="date-month">OCT</span>
            <span className="date-year">2008</span>
          </div>
          <div className="event-content">
            <h4>The Whitepaper</h4>
            <p>
              A nine-page document titled &ldquo;Bitcoin: A Peer-to-Peer Electronic 
              Cash System&rdquo; appears on a cryptography mailing list. The author: 
              Satoshi Nakamoto. No one knows who they are.
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
            <h4>The Genesis Block</h4>
            <p>
              Block 0 is mined. Embedded in its data: a headline from The Times—
              &ldquo;Chancellor on brink of second bailout for banks.&rdquo; A timestamp 
              and a manifesto in one.
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
            <h4>The First Transaction</h4>
            <p>
              Satoshi sends 10 bitcoins to Hal Finney—the first peer-to-peer 
              cryptocurrency transaction in history. Finney tweets simply: 
              &quot;Running bitcoin.&quot;
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
            <h4>The Disappearance</h4>
            <p>
              Satoshi posts their final message on the Bitcoin forum, then 
              vanishes. An estimated 1 million bitcoins they mined remain 
              untouched to this day—a digital fortune in permanent sleep.
            </p>
          </div>
        </div>
      </div>

      <div className={`satoshi-mystery ${isVisible ? "reveal" : ""}`}>
        <div className="mystery-content">
          <h4>The Enduring Mystery</h4>
          <p>
            Satoshi Nakamoto could be one person or many. Male, female, or a group. 
            Japanese, American, European, or none of the above. They gave humanity 
            a new form of money, then walked away. Their creation—decentralized, 
            ownerless, unstoppable—continues without them.
          </p>
          <p className="mystery-philosophy">
            Perhaps anonymity was the point. If no one controls the creator, 
            no one controls the creation.
          </p>
        </div>
      </div>
    </section>
  );
};

const LedgerSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.15);
  const [networkProgress, setNetworkProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setNetworkProgress(prev => {
        if (prev >= 1) return 0;
        return prev + 0.02;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section className="movement ledger" ref={ref}>
      <div className="movement-header">
        <span className={`movement-number ${isVisible ? "reveal" : ""}`}>VII</span>
        <h2 className={`movement-title ${isVisible ? "reveal" : ""}`}>The Ledger</h2>
        <p className={`movement-subtitle ${isVisible ? "reveal" : ""}`}>
          How It All Connects
        </p>
      </div>

      <div className="ledger-visualization">
        <NetworkGraph progress={networkProgress} />
      </div>

      <div className={`ledger-explanation ${isVisible ? "reveal" : ""}`}>
        <p className="lead-text">
          Every node keeps a complete copy of every transaction ever made.
        </p>
        <p>
          No central server. No single point of failure. The blockchain is 
          replicated across thousands of computers worldwide. To corrupt it, 
          you&apos;d need to simultaneously hack the majority of them while they&apos;re 
          all watching each other.
        </p>
      </div>

      <div className="how-it-works">
        <h3 className={isVisible ? "reveal" : ""}>The Complete Picture</h3>
        <div className="process-flow">
          <div className={`process-step ${isVisible ? "reveal" : ""}`} style={{ animationDelay: "0.1s" }}>
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Broadcast</h4>
              <p>Alice wants to send Bob 1 BTC. She signs the transaction with her private key and broadcasts it to the network.</p>
            </div>
          </div>
          <div className={`process-step ${isVisible ? "reveal" : ""}`} style={{ animationDelay: "0.2s" }}>
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Validate</h4>
              <p>Nodes verify: Does Alice have 1 BTC? Is her signature valid? Has she already spent these coins?</p>
            </div>
          </div>
          <div className={`process-step ${isVisible ? "reveal" : ""}`} style={{ animationDelay: "0.3s" }}>
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Compete</h4>
              <p>Miners collect valid transactions and race to solve the proof-of-work puzzle.</p>
            </div>
          </div>
          <div className={`process-step ${isVisible ? "reveal" : ""}`} style={{ animationDelay: "0.4s" }}>
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Confirm</h4>
              <p>Winner broadcasts the new block. Other nodes verify and add it to their copy of the chain.</p>
            </div>
          </div>
          <div className={`process-step ${isVisible ? "reveal" : ""}`} style={{ animationDelay: "0.5s" }}>
            <div className="step-number">5</div>
            <div className="step-content">
              <h4>Finalize</h4>
              <p>After 6 blocks, the transaction is considered irreversible. Bob has his bitcoin.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LegacySection: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section className="movement legacy" ref={ref}>
      <div className="movement-header">
        <span className={`movement-number ${isVisible ? "reveal" : ""}`}>VIII</span>
        <h2 className={`movement-title ${isVisible ? "reveal" : ""}`}>The Legacy</h2>
        <p className={`movement-subtitle ${isVisible ? "reveal" : ""}`}>
          A New Foundation for Trust
        </p>
      </div>

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
          <span className="stat-value">420M+</span>
          <span className="stat-label">Global Users</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">15</span>
          <span className="stat-label">Years Running</span>
        </div>
      </div>

      <div className={`beyond-bitcoin ${isVisible ? "reveal" : ""}`}>
        <h3>Beyond Bitcoin</h3>
        <div className="application-grid">
          <div className="app-card">
            <span className="app-icon">◆</span>
            <h4>Smart Contracts</h4>
            <p>
              Ethereum extended the blockchain to execute code—self-enforcing 
              agreements that run exactly as programmed.
            </p>
          </div>
          <div className="app-card">
            <span className="app-icon">◇</span>
            <h4>DeFi</h4>
            <p>
              Decentralized finance: lending, borrowing, and trading without 
              banks. $100B+ in locked value at peak.
            </p>
          </div>
          <div className="app-card">
            <span className="app-icon">⬡</span>
            <h4>NFTs</h4>
            <p>
              Digital ownership proven on-chain. Art, music, identity—anything 
              unique can be tokenized.
            </p>
          </div>
          <div className="app-card">
            <span className="app-icon">⬢</span>
            <h4>Supply Chain</h4>
            <p>
              Track products from origin to shelf. Immutable records prevent 
              counterfeiting and prove provenance.
            </p>
          </div>
        </div>
      </div>

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
          &quot;If you don&apos;t believe me or don&apos;t get it, I don&apos;t have time to try 
          to convince you, sorry.&quot;
        </p>
        <cite>— Satoshi Nakamoto, 2010</cite>
      </blockquote>
    </section>
  );
};

const SourcesSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section className="sources-section" ref={ref}>
      <h2 className={`sources-title ${isVisible ? "reveal" : ""}`}>
        Sources & Further Reading
      </h2>

      <div className={`sources-grid ${isVisible ? "reveal" : ""}`}>
        <div className="source-category">
          <h3>Primary Sources</h3>
          <ul>
            <li>
              <strong>Satoshi Nakamoto</strong> — 
              <em>Bitcoin: A Peer-to-Peer Electronic Cash System</em> (2008)
              <span className="source-note">
                The original whitepaper that started it all
              </span>
            </li>
            <li>
              <strong>David Chaum</strong> — 
              <em>Blind Signatures for Untraceable Payments</em> (1983)
              <span className="source-note">
                The foundational paper on digital cash privacy
              </span>
            </li>
            <li>
              <strong>Wei Dai</strong> — 
              <em>b-money</em> (1998)
              <span className="source-note">
                Proposal for anonymous distributed electronic cash
              </span>
            </li>
            <li>
              <strong>Nick Szabo</strong> — 
              <em>Bit Gold</em> (2005)
              <span className="source-note">
                The most direct precursor to Bitcoin
              </span>
            </li>
          </ul>
        </div>

        <div className="source-category">
          <h3>Books</h3>
          <ul>
            <li>
              <strong>Nathaniel Popper</strong> — 
              <em>Digital Gold: Bitcoin and the Inside Story of the Misfits and Millionaires Trying to Reinvent Money</em> (2015)
            </li>
            <li>
              <strong>Arvind Narayanan et al.</strong> — 
              <em>Bitcoin and Cryptocurrency Technologies</em> (Princeton, 2016)
            </li>
            <li>
              <strong>Andreas M. Antonopoulos</strong> — 
              <em>Mastering Bitcoin</em> (O&apos;Reilly, 2017)
            </li>
          </ul>
        </div>

        <div className="source-category">
          <h3>Academic Resources</h3>
          <ul>
            <li>
              <a href="https://bitcoin.org/bitcoin.pdf" target="_blank" rel="noopener noreferrer">
                Bitcoin Whitepaper (Original PDF)
              </a>
            </li>
            <li>
              <a href="https://nakamotoinstitute.org/" target="_blank" rel="noopener noreferrer">
                Satoshi Nakamoto Institute — Complete archives
              </a>
            </li>
            <li>
              <a href="https://www.lopp.net/bitcoin-information.html" target="_blank" rel="noopener noreferrer">
                Jameson Lopp&apos;s Bitcoin Resources
              </a>
            </li>
          </ul>
        </div>

        <div className="source-category">
          <h3>Historical Archives</h3>
          <ul>
            <li>
              <strong>Cypherpunks Mailing List Archives</strong>
              <span className="source-note">
                Where the ideas that became Bitcoin were first debated
              </span>
            </li>
            <li>
              <strong>BitcoinTalk Forum Archives</strong>
              <span className="source-note">
                Satoshi&apos;s original posts and early community discussions
              </span>
            </li>
            <li>
              <strong>A Cypherpunk&apos;s Manifesto</strong> — Eric Hughes (1993)
              <span className="source-note">
                The philosophical foundation of the movement
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

// ============================================
// PROGRESS BAR COMPONENT — Chain Links
// ============================================

const ChainProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const linkCount = 12;
  const filledLinks = Math.floor(progress * linkCount);

  return (
    <div className="chain-progress-bar" aria-hidden="true">
      <div className="chain-links">
        {Array.from({ length: linkCount }).map((_, i) => (
          <div 
            key={i} 
            className={`chain-link ${i < filledLinks ? "filled" : ""}`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="link-block" />
            {i < linkCount - 1 && <div className="link-connector" />}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function BlockchainClient() {
  const { progress } = useScrollProgress();

  return (
    <article className="blockchain-essay">
      <ChainProgressBar progress={progress} />
      
      <HeroSection />
      
      <main className="blockchain-narrative">
        <GenesisSection />
        <PioneersSection />
        <DoubleSpendSection />
        <ChainSection />
        <MinersSection />
        <SatoshiSection />
        <LedgerSection />
        <LegacySection />
      </main>

      <SourcesSection />

      <footer className="blockchain-footer">
        <div className="footer-content">
          <div className="footer-icon">⬡</div>
          <p className="footer-text">
            Trust, reimagined. Value, decentralized.
          </p>
          <p className="footer-credit">
            A Visual Essay by <strong>Esy</strong>
          </p>
        </div>
      </footer>
    </article>
  );
}

