"use client";

import React, { useState, useEffect, useRef } from "react";
import "./the-word-pussy.css";

// ==================== TYPES ====================

interface Figure {
  id: string;
  name: string;
  role: string;
  years: string;
  contributions: string[];
  quote?: string;
  era: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  era: string;
}

// ==================== DATA ====================

const keyFigures: Figure[] = [
  {
    id: "philip-stubbes",
    name: "Philip Stubbes",
    role: "The First Documenter",
    years: "c. 1555–c. 1610",
    contributions: [
      "English pamphleteer and Puritan moralist",
      "Wrote The Anatomie of Abuses (1583)",
      "First to document: 'The word pussie is now used of a woman'"
    ],
    era: "renaissance"
  },
  {
    id: "charles-cotton",
    name: "Charles Cotton",
    role: "The Double-Meaning Master",
    years: "1630–1687",
    contributions: [
      "English poet known for burlesque translations",
      "Wrote Virgile Travestie (1664)",
      "Documented the word's double meaning in verse"
    ],
    quote: "Aeneas, here's a Health to thee, To Pusse and to good company.",
    era: "restoration"
  },
  {
    id: "samuel-johnson",
    name: "Samuel Johnson",
    role: "The Great Omitter",
    years: "1709–1784",
    contributions: [
      "Created A Dictionary of the English Language (1755)",
      "Notably OMITTED 'pussy' from his dictionary",
      "His silence reveals the word's vulgar status by the 18th century"
    ],
    era: "georgian"
  },
  {
    id: "james-murray",
    name: "James Murray",
    role: "The OED Pioneer",
    years: "1837–1915",
    contributions: [
      "Primary editor of the Oxford English Dictionary",
      "Documented the word's complete etymology",
      "Brought scholarly rigor to recording 'vulgar' terms"
    ],
    era: "victorian"
  },
  {
    id: "johannes-gutenberg",
    name: "Johannes Gutenberg",
    role: "The Technology Enabler",
    years: "c. 1400–1468",
    contributions: [
      "Invented movable type printing (c. 1440)",
      "His Blackletter type represents the medieval era",
      "Printing enabled standardized spelling and word spread"
    ],
    era: "medieval"
  },
  {
    id: "nicolas-jenson",
    name: "Nicolas Jenson",
    role: "The Humanist Typographer",
    years: "c. 1420–1480",
    contributions: [
      "Created the first true Roman typeface (1470)",
      "His type represents the Renaissance clarity",
      "Venice, the printing capital of the humanist world"
    ],
    era: "renaissance"
  }
];

const timelineEvents: TimelineEvent[] = [
  { year: "Pre-1500", title: "Germanic Roots", description: "Dutch 'poes', Middle Low German 'pūse' — call-words for cats", era: "medieval" },
  { year: "c. 1530s", title: "First English Attestation", description: "'Puss' appears in English (OED: 16th c.)", era: "renaissance" },
  { year: "1583", title: "Stubbes Documents", description: "'The word pussie is now used of a woman'", era: "renaissance" },
  { year: "1664", title: "Cotton's Poem", description: "Double meaning explicitly documented", era: "restoration" },
  { year: "1755", title: "Johnson's Omission", description: "Dictionary excludes the word entirely", era: "georgian" },
  { year: "1773", title: "'Pussycat' Compound", description: "Term of endearment established", era: "georgian" },
  { year: "1805", title: "Nursery Rhyme", description: "'Pussy Cat, Pussy Cat' published", era: "victorian" },
  { year: "1960s", title: "American Innovation", description: "'Coward' meaning becomes widespread", era: "modern" },
  { year: "2025", title: "Today", description: "The word primarily taboo, etymology fascinating", era: "modern" }
];

// ==================== HOOKS ====================

const useIntersectionReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Scroll-lock hook per SCROLL_LOCK_PATTERN.md
interface ScrollLockState {
  containerRef: React.RefObject<HTMLDivElement>;
  progress: number;
  isPinned: boolean;
}

const useScrollLock = (sectionHeight: number = 3): ScrollLockState => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionTotalHeight = rect.height;

      const scrollableDistance = sectionTotalHeight - windowHeight;
      const scrolledIntoSection = -sectionTop;

      if (sectionTop <= 0 && scrolledIntoSection <= scrollableDistance) {
        setIsPinned(true);
        const newProgress = Math.min(
          Math.max(scrolledIntoSection / scrollableDistance, 0),
          1
        );
        setProgress(newProgress);
      } else {
        setIsPinned(false);
        setProgress(sectionTop > 0 ? 0 : 1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionHeight]);

  return { containerRef, progress, isPinned };
};

// ==================== COMPONENTS ====================

// Typography Progress Bar - Era Timeline with morphing word
const TypographyProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const eras = [
    { name: "Medieval", type: "blackletter", position: 0 },
    { name: "Renaissance", type: "renaissance", position: 25 },
    { name: "Georgian", type: "georgian", position: 50 },
    { name: "Victorian", type: "victorian", position: 75 },
    { name: "Modern", type: "modern", position: 100 }
  ];
  
  // Get current era based on scroll progress
  const getCurrentEra = () => {
    if (progress < 20) return eras[0];
    if (progress < 40) return eras[1];
    if (progress < 60) return eras[2];
    if (progress < 80) return eras[3];
    return eras[4];
  };
  
  const currentEra = getCurrentEra();

  // Calculate which era labels to show (fade based on proximity)
  const getEraOpacity = (eraPosition: number) => {
    const distance = Math.abs(progress - eraPosition);
    if (distance < 15) return 1;
    if (distance < 30) return 0.5;
    return 0.2;
  };

  return (
    <div className="typography-progress-bar" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
      {/* Morphing word at start */}
      <div className="progress-word-container">
        <span className={`progress-word era-${currentEra.type}`}>
          {currentEra.type === "modern" ? "P***Y" : "PUSSY"}
        </span>
      </div>
      
      {/* Timeline track with era markers */}
      <div className="progress-track" style={{ flex: 1 }}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
        
        {/* Era markers with labels */}
        {eras.map((era, i) => (
          <div 
            key={i}
            className="era-marker-container"
            style={{ 
              position: "absolute",
              left: `${era.position}%`,
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              top: "-8px"
            }}
          >
            <span 
              className={`progress-marker ${progress >= era.position ? 'active' : ''}`}
              style={{ position: "static", transform: "none" }}
            />
            <span 
              style={{ 
                fontFamily: "var(--font-ui)",
                fontSize: "0.625rem",
                color: "var(--color-text-muted)",
                marginTop: "12px",
                opacity: getEraOpacity(era.position),
                transition: "opacity 0.3s ease-out",
                whiteSpace: "nowrap",
                display: progress < 5 || progress > 95 ? "none" : "block"
              }}
            >
              {era.name}
            </span>
          </div>
        ))}
        
        {/* Moving dot indicator */}
        <span 
          className="progress-dot"
          style={{
            position: "absolute",
            top: "50%",
            left: `${progress}%`,
            transform: "translate(-50%, -50%)",
            width: "12px",
            height: "12px",
            background: "var(--color-vermillion)",
            borderRadius: "50%",
            boxShadow: "0 0 8px rgba(196, 30, 58, 0.5)",
            zIndex: 2,
            transition: "left 0.1s linear"
          }}
        />
      </div>
      
      {/* Current era name on mobile */}
      <div className="progress-era-name">{currentEra.name}</div>
    </div>
  );
};

// Section wrapper with reveal
const Section: React.FC<{
  id: string;
  era?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, era, className = "", children }) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  
  return (
    <section 
      ref={ref}
      id={id}
      data-era={era}
      className={`etymology-section ${className} ${isVisible ? "visible" : ""}`}
    >
      {children}
    </section>
  );
};

// Quote Monument
const QuoteMonument: React.FC<{
  quote: string;
  attribution: string;
  era?: string;
}> = ({ quote, attribution, era }) => (
  <div className={`quote-monument ${era ? `era-${era}` : ''}`}>
    <blockquote>
      <p>&ldquo;{quote}&rdquo;</p>
      <cite>— {attribution}</cite>
    </blockquote>
  </div>
);

// Figure Card
const FigureCard: React.FC<{ figure: Figure }> = ({ figure }) => (
  <div className={`figure-card era-${figure.era}`}>
    <h4 className="figure-name">{figure.name}</h4>
    <p className="figure-role">{figure.role}</p>
    <p className="figure-years">{figure.years}</p>
    <ul className="figure-contributions">
      {figure.contributions.map((contrib, i) => (
        <li key={i}>{contrib}</li>
      ))}
    </ul>
    {figure.quote && (
      <p className="figure-quote">&ldquo;{figure.quote}&rdquo;</p>
    )}
  </div>
);

// The Morphing Word Display
const MorphingWord: React.FC<{ era: string }> = ({ era }) => (
  <div className="morphing-word-container">
    <span className={`morphing-word era-${era}`}>PUSSY</span>
  </div>
);

// Era Typography Specimen
const TypographySpecimen: React.FC<{
  era: string;
  letter: string;
  description: string;
}> = ({ era, letter, description }) => (
  <div className={`typography-specimen era-${era}`}>
    <span className="specimen-letter">{letter}</span>
    <p className="specimen-description">{description}</p>
  </div>
);

// ==================== SCROLL-LOCKED MOMENT COMPONENTS ====================

// The 1583 Moment - Stubbes quote reveal
const ScrollLock1583: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(2.5); // 50vh x 2.5
  
  const phase = React.useMemo(() => {
    if (progress < 0.3) return "book";
    if (progress < 0.6) return "highlight";
    return "explain";
  }, [progress]);

  return (
    <div 
      ref={containerRef}
      className="scroll-lock-container"
      style={{ height: "250vh", background: "var(--color-aged-paper)" }}
    >
      <div className={`pinned-content ${isPinned ? "is-pinned" : ""}`} style={{ background: "var(--color-aged-paper)" }}>
        <div style={{ maxWidth: "800px", textAlign: "center", padding: "0 var(--spacing-md)" }}>
          {/* Phase 1: Book appears */}
          <div style={{ 
            opacity: phase === "book" ? 1 : 0.3,
            transition: "opacity 0.5s ease-out"
          }}>
            <p style={{ 
              fontFamily: "var(--font-ui)", 
              fontSize: "var(--text-sm)",
              color: "var(--color-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: "var(--spacing-md)"
            }}>
              The Anatomie of Abuses, 1583
            </p>
          </div>
          
          {/* Phase 2: Quote highlights */}
          <blockquote style={{
            fontFamily: "var(--type-renaissance)",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontStyle: "italic",
            color: phase === "highlight" || phase === "explain" ? "var(--color-vermillion)" : "var(--color-text-secondary)",
            transition: "color 0.5s ease-out",
            lineHeight: 1.4,
            margin: "0 0 var(--spacing-lg)"
          }}>
            &ldquo;The word pussie is now used of a woman.&rdquo;
          </blockquote>
          
          <p style={{ 
            fontFamily: "var(--font-ui)", 
            fontSize: "var(--text-sm)",
            color: "var(--color-text-muted)"
          }}>
            — Philip Stubbes
          </p>
          
          {/* Phase 3: Explanation */}
          <p style={{
            marginTop: "var(--spacing-xl)",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-base)",
            color: "var(--color-text-secondary)",
            opacity: phase === "explain" ? 1 : 0,
            transform: phase === "explain" ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease-out",
            maxWidth: "600px",
            margin: "var(--spacing-xl) auto 0"
          }}>
            The first documented use of the word applied to females—not vulgar, but <em>affectionate</em>. 
            Calling a woman soft and sweet like a cat.
          </p>
        </div>
      </div>
    </div>
  );
};

// Johnson&apos;s Silence - Dictionary absence reveal
const ScrollLockJohnson: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(2.5);
  
  const phase = React.useMemo(() => {
    if (progress < 0.3) return "page";
    if (progress < 0.6) return "scan";
    return "absence";
  }, [progress]);

  return (
    <div 
      ref={containerRef}
      className="scroll-lock-container"
      style={{ height: "250vh", background: "var(--color-ivory)" }}
    >
      <div className={`pinned-content ${isPinned ? "is-pinned" : ""}`} style={{ background: "var(--color-ivory)" }}>
        <div style={{ maxWidth: "600px", textAlign: "center", padding: "0 var(--spacing-md)" }}>
          <p style={{ 
            fontFamily: "var(--font-ui)", 
            fontSize: "var(--text-sm)",
            color: "var(--color-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: "var(--spacing-lg)",
            opacity: phase !== "page" ? 0.5 : 1,
            transition: "opacity 0.3s"
          }}>
            A Dictionary of the English Language, 1755
          </p>
          
          {/* Simulated dictionary page */}
          <div style={{
            background: "var(--color-ivory)",
            border: "1px solid rgba(26, 26, 26, 0.2)",
            padding: "var(--spacing-lg)",
            fontFamily: "var(--type-georgian)",
            textAlign: "left",
            transform: phase === "scan" ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.5s ease-out"
          }}>
            <div style={{ padding: "var(--spacing-sm) 0", borderBottom: "1px solid rgba(26, 26, 26, 0.1)" }}>
              <span style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>PUSS</span>
              <span style={{ color: "var(--color-text-secondary)", fontStyle: "italic", marginLeft: "1rem" }}>
                n.s. [A fondling name for a cat.]
              </span>
            </div>
            
            <div style={{ 
              padding: "var(--spacing-md)",
              margin: "var(--spacing-sm) 0",
              background: phase === "absence" ? "rgba(196, 30, 58, 0.1)" : "transparent",
              transition: "background 0.5s ease-out"
            }}>
              <span style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>PUSSY</span>
              <span style={{ 
                color: phase === "absence" ? "var(--color-vermillion)" : "var(--color-text-muted)", 
                fontStyle: "italic", 
                marginLeft: "1rem",
                fontWeight: phase === "absence" ? 600 : 400,
                transition: "all 0.5s ease-out"
              }}>
                — NOT INCLUDED —
              </span>
            </div>
            
            <div style={{ padding: "var(--spacing-sm) 0", borderTop: "1px solid rgba(26, 26, 26, 0.1)" }}>
              <span style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>PUSTULE</span>
              <span style={{ color: "var(--color-text-secondary)", fontStyle: "italic", marginLeft: "1rem" }}>
                n.s. [pustule, Fr.] A small swelling...
              </span>
            </div>
          </div>
          
          {/* Explanation */}
          <p style={{
            marginTop: "var(--spacing-xl)",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-base)",
            color: "var(--color-text-secondary)",
            opacity: phase === "absence" ? 1 : 0,
            transform: phase === "absence" ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease-out"
          }}>
            Johnson included &ldquo;fart&rdquo; and &ldquo;piss.&rdquo; His silence on &ldquo;pussy&rdquo; speaks volumes 
            about the word&apos;s status by 1755.
          </p>
        </div>
      </div>
    </div>
  );
};

// ==================== SCROLL-LOCKED HERO COMPONENT ====================

type HeroPhase = "question1" | "question2" | "blackletter" | "renaissance" | "georgian" | "victorian" | "modern" | "stack" | "title" | "complete";

const HeroScrollLock: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(5); // 5 scroll-heights per spec
  const [showSkip, setShowSkip] = useState(false);
  
  // Show skip affordance after 3 seconds of being pinned
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isPinned && progress > 0.1 && progress < 0.9) {
      timeout = setTimeout(() => setShowSkip(true), 3000);
    } else {
      setShowSkip(false);
    }
    return () => clearTimeout(timeout);
  }, [isPinned, progress]);

  // Phase calculation per spec choreography
  const phase: HeroPhase = React.useMemo(() => {
    if (progress < 0.05) return "question1";
    if (progress < 0.15) return "question2";
    if (progress < 0.25) return "blackletter";
    if (progress < 0.40) return "renaissance";
    if (progress < 0.55) return "georgian";
    if (progress < 0.70) return "victorian";
    if (progress < 0.85) return "modern";
    if (progress < 0.95) return "stack";
    return "title";
  }, [progress]);

  // Get current era type for morph word
  const currentEra = React.useMemo(() => {
    switch (phase) {
      case "blackletter": return "blackletter";
      case "renaissance": return "renaissance";
      case "georgian": return "georgian";
      case "victorian": return "victorian";
      case "modern": 
      case "stack":
      case "title":
        return "modern";
      default: return "blackletter";
    }
  }, [phase]);

  // Era labels for display
  const eraLabels: Record<string, string> = {
    blackletter: "c. 1533 — Medieval",
    renaissance: "The Word Enters English",
    georgian: "From Affection to Omission",
    victorian: "The Double Life",
    modern: "The Taboo Takes Over",
  };

  const handleSkip = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const targetScroll = window.scrollY + rect.height - window.innerHeight + 100;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const isWordPhase = ["blackletter", "renaissance", "georgian", "victorian", "modern"].includes(phase);
  const showAllEras = phase === "stack" || phase === "title";

  return (
    <section 
      ref={containerRef}
      className="scroll-lock-container hero-scroll-lock"
      style={{ height: "500vh" }}
    >
      <div className={`pinned-content ${isPinned ? "is-pinned" : ""}`}>
        {/* Question 1: How did a word for cats... */}
        <p className={`phase-text phase-question ${phase === "question1" ? "visible" : "hidden"}`}>
          How did a word for cats...
        </p>

        {/* Question 2: ...become controversial */}
        <p className={`phase-text phase-question ${phase === "question2" ? "visible" : "hidden"}`}>
          ...become one of the most controversial words in English?
        </p>

        {/* The morphing word display */}
        {isWordPhase && (
          <div className="hero-morph-container" style={{ textAlign: "center" }}>
            <span className={`hero-morph-word era-${currentEra}`}>
              PUSSY
            </span>
            <p className="phase-era-label">{eraLabels[currentEra]}</p>
          </div>
        )}

        {/* All eras stacked */}
        {showAllEras && (
          <div className="era-stack">
            <span className={`era-stack-word era-blackletter visible`} style={{ fontFamily: "var(--type-blackletter)" }}>PUSSY</span>
            <span className={`era-stack-word era-renaissance visible`} style={{ fontFamily: "var(--type-renaissance)", transitionDelay: "100ms" }}>PUSSY</span>
            <span className={`era-stack-word era-georgian visible`} style={{ fontFamily: "var(--type-georgian)", transitionDelay: "200ms" }}>PUSSY</span>
            <span className={`era-stack-word era-victorian visible`} style={{ fontFamily: "var(--type-victorian)", transitionDelay: "300ms" }}>PUSSY</span>
            <span className={`era-stack-word era-modern visible`} style={{ fontFamily: "var(--type-modern)", transitionDelay: "400ms" }}>P***Y</span>
          </div>
        )}

        {/* Title reveal at end */}
        {phase === "title" && (
          <div className="hero-title-reveal visible" style={{ marginTop: "var(--spacing-xl)" }}>
            <h1 style={{ margin: 0 }}>
              <span className="hero-title-main">Words Have Histories</span>
              <span className="hero-title-sub">The Curious Journey of <em>&ldquo;Pussy&rdquo;</em></span>
            </h1>
          </div>
        )}

        {/* Skip affordance */}
        <button 
          className={`skip-affordance ${showSkip ? "visible" : ""}`}
          onClick={handleSkip}
          aria-label="Skip to content"
        >
          Skip to essay →
        </button>
      </div>
    </section>
  );
};

// ==================== MAIN COMPONENT ====================

const TheWordPussyClient: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get figures by era
  const figuresByEra = (era: string) => keyFigures.filter(f => f.era === era);

  return (
    <div className="etymology-essay">
      {/* Progress Bar */}
      <TypographyProgressBar progress={scrollProgress} />

      {/* ==================== HERO SECTION (SCROLL-LOCKED) ==================== */}
      <HeroScrollLock />

      {/* ==================== CHAPTER 1: THE MYSTERY ==================== */}
      <Section id="chapter-1" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter One</span>
          <h2 className="chapter-title">The Mystery of Meaning</h2>
          <span className="chapter-temporal">Present Day</span>
        </div>

        <div className="chapter-intro">
          <p className="lead-paragraph">
            Say the word <strong>&ldquo;pussy&rdquo;</strong> and watch reactions shift. For some, it&apos;s a term of endearment for a cat. For others, it&apos;s one of the most vulgar words in the language. For others still, it&apos;s an insult meaning coward. <em>How did one word come to mean such wildly different things?</em>
          </p>
        </div>

        <div className="meaning-branches">
          <div className="branch branch-feline">
            <span className="branch-icon">🐱</span>
            <h3>Feline</h3>
            <p>&ldquo;Pussycat,&rdquo; &ldquo;pussy willow&rdquo; — soft, affectionate</p>
            <span className="branch-origin">From Germanic cat-calling words</span>
          </div>
          <div className="branch branch-anatomical">
            <span className="branch-icon">⚠️</span>
            <h3>Anatomical</h3>
            <p>Vulgar slang, euphemism, taboo</p>
            <span className="branch-origin">Possibly Old Norse &ldquo;pūss&rdquo; (pocket)</span>
          </div>
          <div className="branch branch-coward">
            <span className="branch-icon">😰</span>
            <h3>Cowardice</h3>
            <p>&ldquo;Don&apos;t be a pussy&rdquo; — American slang</p>
            <span className="branch-origin">20th century gender-based insult</span>
          </div>
        </div>

        <div className="content-block">
          <p>
            The answer lies in etymology—the study of word origins—and in the fascinating mechanisms by which language changes: <strong>metaphor</strong>, <strong>euphemism</strong>, and <strong>taboo</strong>. What we&apos;ll discover is that this word&apos;s journey mirrors the history of English itself, from Germanic roots through Norman influence, Victorian prudery, and American slang innovation.
          </p>
        </div>
      </Section>

      {/* ==================== CHAPTER 2: GERMANIC ROOTS ==================== */}
      <Section id="chapter-2" era="medieval" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Two</span>
          <h2 className="chapter-title">Poes, Pūse, and the Sound of Softness</h2>
          <span className="chapter-temporal">Medieval Europe • Pre-1500</span>
        </div>
        
        <TypographySpecimen 
          era="blackletter" 
          letter="P" 
          description="Blackletter: The angular, dense letterforms of medieval manuscripts"
        />

        <div className="chapter-intro">
          <p className="lead-paragraph">
            Before there was English &ldquo;puss,&rdquo; there was Dutch <strong>poes</strong> and Middle Low German <strong>pūse</strong>—conventional call-words for cats, the sounds you make when you want a cat to come. Similar words appear across Germanic languages and beyond: Lithuanian <em>puižė</em>, Irish <em>puisín</em>. The word may be onomatopoeic, mimicking the soft sounds humans use to attract felines.
          </p>
        </div>

        <MorphingWord era="blackletter" />

        <div className="content-block">
          <h3>Two Possible Roots</h3>
          <p>
            But there&apos;s another thread. Old Norse <strong>pūss</strong> meant &ldquo;pocket&rdquo; or &ldquo;purse&rdquo;—a container, a pouch. Old English <strong>pusa</strong> carried the same meaning. And in Low German, <strong>puse</strong> was used directly for vulva. The metaphor is ancient: a container, an enclosed space.
          </p>
          <p>
            These two roots—the cat-calling sound and the container metaphor—may have merged in English, giving the word its strange double life from the very beginning.
          </p>
        </div>

        <div className="figures-grid">
          {figuresByEra("medieval").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>
      </Section>

      {/* ==================== CHAPTER 3: FIRST APPEARANCES ==================== */}
      <Section id="chapter-3" era="renaissance" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Three</span>
          <h2 className="chapter-title">First Appearances</h2>
          <span className="chapter-temporal">c. 1530s–1583</span>
        </div>
        
        <TypographySpecimen 
          era="renaissance" 
          letter="P" 
          description="Garamond: Renaissance clarity, humanist proportion, scholarly elegance"
        />

        <div className="chapter-intro">
          <p className="lead-paragraph">
            By the 1530s, the word &ldquo;puss&rdquo; appears in English writing as a name for a cat (per the OED, first attested in the 16th century). Within fifty years, the word had already begun branching. In 1583, the Puritan pamphleteer Philip Stubbes wrote a line that would become crucial evidence for etymologists centuries later.
          </p>
        </div>

        {/* Scroll-locked 1583 Moment */}
        <ScrollLock1583 />

        <MorphingWord era="renaissance" />

        <div className="content-block">
          <h3>The Affectionate Path</h3>
          <p>
            Stubbes wasn&apos;t describing vulgarity. The feminine usage was <em>affectionate</em>—a term of endearment, calling a woman soft and sweet like a cat. The same semantic path that gave us &ldquo;kitten&rdquo; and &ldquo;pet&rdquo; as terms of endearment.
          </p>
          <p>
            This is crucial: the word&apos;s application to women <em>preceded</em> its vulgar meaning. The path was: <strong>cat → woman (soft, sweet) → anatomy (euphemism)</strong>. Affection came first.
          </p>
        </div>

        <div className="figures-grid">
          {figuresByEra("renaissance").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>
      </Section>

      {/* ==================== CHAPTER 4: THE SHADOW MEANING ==================== */}
      <Section id="chapter-4" era="restoration" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Four</span>
          <h2 className="chapter-title">A Health to Pusse</h2>
          <span className="chapter-temporal">1664</span>
        </div>

        <div className="chapter-intro">
          <p className="lead-paragraph">
            By the mid-17th century, the word had acquired its shadow meaning. We know this because poets comfortable with wordplay began using it with deliberate ambiguity. In 1664, Charles Cotton&apos;s burlesque translation of Virgil contained a toast that left no doubt about the double meaning.
          </p>
        </div>

        <QuoteMonument
          quote="Aeneas, here's a Health to thee, To Pusse and to good company."
          attribution="Charles Cotton, Virgile Travestie, 1664"
          era="restoration"
        />

        <div className="content-block">
          <h3>The Euphemism Emerges</h3>
          <p>
            The vulgar meaning may have developed through multiple paths simultaneously. One theory connects it to Old Norse <em>pūss</em> (pocket), via metaphor. Another sees it as natural extension of the affectionate feminine usage. Perhaps both contributed—the word was destined for this meaning by its very sounds.
          </p>
          <p>
            What matters is that by 1664, English speakers understood the double meaning well enough that poets could play with it. The word lived two lives.
          </p>
        </div>

        <div className="figures-grid">
          {figuresByEra("restoration").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>
      </Section>

      {/* ==================== CHAPTER 5: JOHNSON'S SILENCE ==================== */}
      <Section id="chapter-5" era="georgian" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Five</span>
          <h2 className="chapter-title">The Great Omission</h2>
          <span className="chapter-temporal">1755</span>
        </div>
        
        <TypographySpecimen 
          era="georgian" 
          letter="P" 
          description="Baskerville: Transitional elegance, sharper contrast, literary refinement"
        />

        <div className="chapter-intro">
          <p className="lead-paragraph">
            In 1755, Samuel Johnson published his monumental <em>A Dictionary of the English Language</em>—the first comprehensive dictionary of English. Johnson included words like &ldquo;fart&rdquo; and &ldquo;piss.&rdquo; But he did <em>not</em> include &ldquo;pussy.&rdquo; His silence speaks volumes.
          </p>
        </div>

        <MorphingWord era="georgian" />

        {/* Scroll-locked Johnson&apos;s Silence */}
        <ScrollLockJohnson />

        <div className="content-block">
          <h3>The Dictionary as Gatekeeper</h3>
          <p>
            Johnson was creating a dictionary for &ldquo;polite&rdquo; society. His omission tells us that by 1755, the word had become too vulgar for a literary dictionary. The word was not unknown—it was <em>too well known</em> in the wrong way.
          </p>
          <p>
            This is the moment when the word&apos;s status crystallized. In the century between Cotton&apos;s poem and Johnson&apos;s dictionary, &ldquo;pussy&rdquo; had crossed from wordplay to obscenity.
          </p>
        </div>

        <div className="figures-grid">
          {figuresByEra("georgian").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>
      </Section>

      {/* ==================== CHAPTER 6: VICTORIAN SPLIT ==================== */}
      <Section id="chapter-6" era="victorian" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Six</span>
          <h2 className="chapter-title">Nursery and Shadow</h2>
          <span className="chapter-temporal">1805–1900</span>
        </div>
        
        <TypographySpecimen 
          era="victorian" 
          letter="P" 
          description="Bodoni: Didone drama, extreme contrast, Victorian elegance"
        />

        <div className="chapter-intro">
          <p className="lead-paragraph">
            The Victorian era crystallized the word&apos;s double life. In 1805, the nursery rhyme &ldquo;Pussy Cat, Pussy Cat&rdquo; was published—pure feline innocence, recited by children for generations. Meanwhile, in the shadows of adult vernacular, the vulgar meaning was thoroughly established.
          </p>
        </div>

        <div className="victorian-split">
          <div className="split-nursery">
            <div className="split-content">
              <h3>The Nursery</h3>
              <blockquote>
                &ldquo;Pussy cat, pussy cat, where have you been?
                I&apos;ve been to London to visit the Queen.&rdquo;
              </blockquote>
              <p>Children&apos;s literature, pure innocence</p>
            </div>
          </div>
          <div className="split-shadow">
            <div className="split-content">
              <h3>The Shadow</h3>
              <p className="shadow-word">████████</p>
              <p>Adult vernacular, established taboo</p>
            </div>
          </div>
        </div>

        <MorphingWord era="victorian" />

        <div className="content-block">
          <h3>Victorian Language Apartheid</h3>
          <p>
            The Victorians were masters of linguistic compartmentalization. They created separate vocabularies for public and private, for children and adults. The same word could exist in both worlds, never meeting. Children sang about pussycats while adults whispered about something else entirely.
          </p>
          <p>
            This duality is the word&apos;s defining feature. It has never stopped meaning &ldquo;cat.&rdquo; It just also means something else—and which meaning you hear depends entirely on context.
          </p>
        </div>

        <div className="figures-grid">
          {figuresByEra("victorian").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>
      </Section>

      {/* ==================== CHAPTER 7: AMERICAN INNOVATION ==================== */}
      <Section id="chapter-7" era="modern" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Seven</span>
          <h2 className="chapter-title">The Third Meaning</h2>
          <span className="chapter-temporal">1960s–Present</span>
        </div>
        
        <TypographySpecimen 
          era="modern" 
          letter="P" 
          description="Helvetica/Inter: Sans-serif clarity, digital neutrality, clinical modernity"
        />

        <div className="chapter-intro">
          <p className="lead-paragraph">
            American English added a third branch. By the 1960s, calling someone a &ldquo;pussy&rdquo; meant calling them a coward. The insult built on the anatomical meaning: <em>feminine anatomy → femininity → weakness → cowardice</em>. The word became a weapon.
          </p>
        </div>

        <MorphingWord era="modern" />

        <div className="content-block">
          <h3>Language Encodes Attitudes</h3>
          <p>
            This third meaning reveals how language encodes social attitudes. The chain of logic—that feminine equals weak, that weak equals cowardly—is a cultural assumption baked into the insult. Etymology becomes a mirror, showing us not just how words change, but what those changes reveal about the people using them.
          </p>
          <p>
            Today, the word is primarily taboo. We censor it with asterisks (p***y), avoid it with euphemisms (&ldquo;the p-word&rdquo;), or speak it only in contexts of deliberate transgression. The feline meaning still exists—your grandmother might still call her cat &ldquo;pussycat&rdquo;—but it&apos;s overshadowed.
          </p>
        </div>

        <div className="redaction-demo">
          <div className="redaction-versions">
            <span className="version-full">PUSSY</span>
            <span className="version-asterisk">P***Y</span>
            <span className="version-redacted"><span className="redaction-bar" /></span>
            <span className="version-euphemism">&ldquo;the p-word&rdquo;</span>
          </div>
          <p className="redaction-caption">Modern avoidance strategies</p>
        </div>
      </Section>

      {/* ==================== CHAPTER 8: TODAY ==================== */}
      <Section id="chapter-8" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Eight</span>
          <h2 className="chapter-title">The Euphemism Treadmill</h2>
          <span className="chapter-temporal">Present</span>
        </div>

        <div className="chapter-intro">
          <p className="lead-paragraph">
            The linguist Steven Pinker described the &ldquo;euphemism treadmill&rdquo;—the phenomenon where words invented to be polite eventually become impolite themselves, requiring new euphemisms. &ldquo;Pussy&rdquo; followed this path: affectionate term → euphemism → taboo.
          </p>
        </div>

        <div className="content-block">
          <h3>What Etymology Teaches</h3>
          <p>
            The word &ldquo;pussy&rdquo; is a case study in how language lives. It demonstrates that words don&apos;t have fixed meanings—they have <em>histories</em>. Those histories are shaped by the people who use them, the contexts where they appear, and the cultural attitudes they encode.
          </p>
          <p>
            Today, you can still buy pussy willows at a florist. You can still read &ldquo;Pussy Cat, Pussy Cat&rdquo; to a child. The innocent meaning never disappeared. But you&apos;d think twice before saying the word aloud in many contexts. The taboo meaning has become dominant in collective consciousness—not because the word changed, but because we changed.
          </p>
        </div>

        <div className="semantic-branches-visual">
          <h3>Three Branches, One Root</h3>
          <div className="branches-diagram">
            <div className="branch-root">
              <span>Germanic <em>poes/pūse</em></span>
            </div>
            <div className="branch-lines">
              <div className="branch-line feline" />
              <div className="branch-line anatomical" />
              <div className="branch-line coward" />
            </div>
            <div className="branch-destinations">
              <div className="destination feline">
                <span>🐱 Feline</span>
                <span className="year">1530s+</span>
              </div>
              <div className="destination anatomical">
                <span>⚠️ Anatomical</span>
                <span className="year">1660s+</span>
              </div>
              <div className="destination coward">
                <span>😰 Coward</span>
                <span className="year">1960s+</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ==================== CONCLUSION ==================== */}
      <Section id="conclusion" className="conclusion">
        <h2 className="conclusion-title">Words Have Histories</h2>
        <p className="conclusion-text">
          A single word, rooted in Germanic sounds for calling cats and Old Norse metaphors for pouches, became one of the most semantically complex words in English. It traveled from manuscript to printing press, from affection to euphemism, from euphemism to taboo.
        </p>
        <p className="conclusion-text">
          The next time you encounter a word that seems simple, remember: every word is an archaeological site. Dig deep enough, and you&apos;ll find layers of history, culture, and human psychology—encoded in sounds we make with our mouths.
        </p>
        <p className="conclusion-question">
          What histories are hidden in the words you use every day?
        </p>
      </Section>

      {/* ==================== TIMELINE ==================== */}
      <Section id="timeline" className="timeline-section">
        <div className="chapter-header">
          <h2 className="chapter-title">Timeline: 500 Years</h2>
        </div>
        <div className="timeline">
          {timelineEvents.map((event, i) => (
            <div key={i} className={`timeline-event era-${event.era}`}>
              <span className="timeline-year">{event.year}</span>
              <span className="timeline-dot" />
              <div className="timeline-content">
                <p className="timeline-title">{event.title}</p>
                <p className="timeline-description">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ==================== SOURCES ==================== */}
      <section className="sources-section">
        <h2 className="sources-title">Sources & Further Reading</h2>
        <div className="sources-grid">
          <div className="source-category">
            <h3 className="source-category-title">Etymology & Dictionaries</h3>
            <ul className="source-list">
              <li>
                <a href="https://www.etymonline.com/word/pussy" target="_blank" rel="noopener noreferrer">
                  Etymology Online: &ldquo;Pussy&rdquo;
                </a>
              </li>
              <li>
                <a href="https://www.oed.com/search/dictionary/?scope=Entries&q=pussy" target="_blank" rel="noopener noreferrer">
                  Oxford English Dictionary: &ldquo;Pussy&rdquo;
                </a>
                {" "}(subscription required)
              </li>
              <li>
                <a href="https://www.merriam-webster.com/dictionary/puss" target="_blank" rel="noopener noreferrer">
                  Merriam-Webster: &ldquo;Puss&rdquo;
                </a>
              </li>
            </ul>
          </div>
          <div className="source-category">
            <h3 className="source-category-title">Primary Historical Sources</h3>
            <ul className="source-list">
              <li>Stubbes, Philip. <em>The Anatomie of Abuses</em>, 1583</li>
              <li>Cotton, Charles. <em>Virgile Travestie</em>, 1664</li>
              <li>Johnson, Samuel. <em>A Dictionary of the English Language</em>, 1755</li>
            </ul>
          </div>
          <div className="source-category">
            <h3 className="source-category-title">Linguistics & Language Change</h3>
            <ul className="source-list">
              <li>Pinker, Steven. <em>The Stuff of Thought</em>, 2007 (euphemism treadmill)</li>
              <li>
                <a href="https://en.wikipedia.org/wiki/Semantic_change" target="_blank" rel="noopener noreferrer">
                  Wikipedia: Semantic Change
                </a>
                {" "}(overview with citations)
              </li>
              <li>
                <a href="https://en.wikipedia.org/wiki/Euphemism#Euphemism_treadmill" target="_blank" rel="noopener noreferrer">
                  Wikipedia: Euphemism Treadmill
                </a>
                {" "}(overview with citations)
              </li>
            </ul>
          </div>
        </div>
        <p className="sources-note">
          This etymology was researched using peer-reviewed sources, historical dictionaries, and primary texts. Typography specimens represent the visual history of English printing.
        </p>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="etymology-footer">
        <p className="footer-word">PUSSY</p>
        <p className="footer-text">A Visual Essay on Etymology by Esy.com</p>
      </footer>
    </div>
  );
};

export default TheWordPussyClient;


