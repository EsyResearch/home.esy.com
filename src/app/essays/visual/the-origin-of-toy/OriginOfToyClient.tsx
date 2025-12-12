"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, ChevronDown, ExternalLink } from "lucide-react";
import "./the-origin-of-toy.css";
import {
  chapter1Images,
  chapter2Images,
  chapter3Images,
  chapter4Images,
  chapter5Images,
  chapter6Images,
  chapter7Images,
  type ToyImage,
} from "./images";

// ==================== SCROLL-LOCK HOOK ====================

interface ScrollLockState {
  isLocked: boolean;
  progress: number; // 0-100
  stage: number;    // For multi-stage animations
}

const useScrollLock = (
  ref: React.RefObject<HTMLElement>,
  lockHeight: number = 400, // vh units of scroll to complete
  stages: number = 5
): ScrollLockState => {
  const [state, setState] = useState<ScrollLockState>({
    isLocked: false,
    progress: 0,
    stage: 0,
  });
  const scrollStartRef = useRef(0);
  const isActiveRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollLockDistance = (lockHeight / 100) * viewportHeight;

      // Check if we should activate the lock
      if (rect.top <= 0 && rect.bottom > viewportHeight * 0.5) {
        if (!isActiveRef.current) {
          isActiveRef.current = true;
          scrollStartRef.current = window.scrollY;
          document.body.style.overflow = "hidden";
        }

        // Calculate progress based on scroll within the lock zone
        const scrollDelta = window.scrollY - scrollStartRef.current;
        const progress = Math.min(100, Math.max(0, (scrollDelta / scrollLockDistance) * 100));
        const stage = Math.floor((progress / 100) * stages);

        setState({ isLocked: true, progress, stage });

        // Release lock when complete
        if (progress >= 100) {
          document.body.style.overflow = "";
          isActiveRef.current = false;
        }
      } else if (rect.top > viewportHeight * 0.2) {
        // Reset when scrolling back up
        if (isActiveRef.current) {
          document.body.style.overflow = "";
          isActiveRef.current = false;
        }
        setState({ isLocked: false, progress: 0, stage: 0 });
      }
    };

    // Use wheel event for scroll-lock behavior
    const handleWheel = (e: WheelEvent) => {
      if (isActiveRef.current && state.progress < 100) {
        e.preventDefault();
        const scrollLockDistance = (lockHeight / 100) * window.innerHeight;
        const newProgress = Math.min(100, Math.max(0, state.progress + (e.deltaY / scrollLockDistance) * 20));
        const newStage = Math.floor((newProgress / 100) * stages);
        
        setState({ isLocked: true, progress: newProgress, stage: newStage });

        if (newProgress >= 100) {
          document.body.style.overflow = "";
          isActiveRef.current = false;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      document.body.style.overflow = "";
    };
  }, [ref, lockHeight, stages, state.progress]);

  return state;
};

/*
 * THE ETYMOLOGY OF PLAY
 * How "Toy" Traveled from Sin to Innocence
 * 
 * Design Research Summary:
 * - Subject materials: Parchment, dictionary pages, wooden toys, typography
 * - Color palette: Aged cream, scholarly brown, illuminated gold, terracotta wood
 * - Animation philosophy: Word transformations, gradual reveals (like dictionary archaeology)
 * - Unique element: Building Blocks progress bar (stacking letters T-O-Y-S)
 * - Era treatments: Medieval parchment → Renaissance oil → Enlightenment powder → Victorian sepia → Modern clean
 */

// ==================== TYPES ====================

interface Section {
  id: string;
  era?: string;
  chapterNum?: number;
  title: string;
  metaphor?: string;
  content: React.ReactNode;
  layout: "hero" | "chapter" | "quote" | "timeline" | "etymology" | "revelation";
}

// ==================== DATA ====================

const ESSAY_META = {
  title: "The Etymology of Play",
  subtitle: "How \"Toy\" Traveled from Sin to Innocence",
  readTime: "18 min",
  category: "History",
};

const SOURCES = [
  { title: "Oxford English Dictionary - 'toy' entry", url: "https://www.oed.com/dictionary/toy_n1" },
  { title: "Middle English Dictionary - University of Michigan", url: "https://quod.lib.umich.edu/m/middle-english-dictionary/" },
  { title: "Huizinga, Johan. Homo Ludens: A Study of the Play-Element in Culture (1938)", url: "https://www.routledge.com/Homo-Ludens-A-Study-of-the-Play-Element-in-Culture/Huizinga/p/book/9780415175944" },
  { title: "Sutton-Smith, Brian. The Ambiguity of Play (1997)", url: "https://www.hup.harvard.edu/books/9780674017337" },
  { title: "Cross, Gary. Kids' Stuff: Toys and the Changing World of American Childhood", url: "https://www.hup.harvard.edu/books/9780674503489" },
  { title: "V&A Museum of Childhood - Toy History Collection", url: "https://www.vam.ac.uk/collections/toys" },
  { title: "The Strong National Museum of Play - History of Toys", url: "https://www.museumofplay.org/" },
  { title: "Shakespeare's Use of 'Toy' - Folger Shakespeare Library", url: "https://shakespeare.folger.edu/" },
];

// ==================== COMPONENTS ====================

// Building Blocks Progress Bar
const BlocksProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const blocks = ["T", "O", "Y", "S", "!", "★", "∞"];
  const activeBlocks = Math.floor((progress / 100) * blocks.length);

  return (
    <div className="blocks-progress" aria-label={`Reading progress: ${Math.round(progress)}%`}>
      <div className="blocks-stack">
        {blocks.map((letter, index) => (
          <div
            key={index}
            className={`block ${index < activeBlocks ? "stacked" : ""} ${
              index === activeBlocks - 1 ? "current" : ""
            }`}
            style={{ 
              transitionDelay: `${index * 50}ms`,
              opacity: index <= activeBlocks ? 1 : 0.2,
            }}
          >
            <span className="block-letter">{letter}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Header with scroll awareness
const EssayHeader: React.FC<{ scrolled: boolean }> = ({ scrolled }) => (
  <header className={`essay-header ${scrolled ? "scrolled" : ""}`}>
    <Link href="/essays/visual" className="back-link">
      <ArrowLeft size={18} />
      <span>Essays</span>
    </Link>
    <div className="header-meta">
      <span className="header-category">{ESSAY_META.category}</span>
      <span className="header-divider">·</span>
      <Clock size={14} />
      <span>{ESSAY_META.readTime}</span>
    </div>
  </header>
);

// Hero Section with SCROLL-DRIVEN word fragmentation
// Spec choreography: 0-15% word appears, 15-30% flicker/cracks, 30-50% fracture/TOYE,
// 50-70% annotations, 70-85% swirl/settle, 85-100% title card + block
const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight;
      
      // Calculate progress: 0 at top, 100 when hero is scrolled past
      const scrolled = -rect.top;
      const progress = Math.min(100, Math.max(0, (scrolled / (heroHeight * 0.7)) * 100));
      
      setScrollProgress(progress);
      if (progress >= 98) setIsComplete(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSkip = useCallback(() => {
    setIsComplete(true);
    setScrollProgress(100);
    if (heroRef.current) {
      const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
      window.scrollTo({ top: heroBottom - 100, behavior: "smooth" });
    }
  }, []);

  // Spec-precise phase calculations
  const phase1 = scrollProgress >= 0 && scrollProgress < 15;   // 0-15%: Word appears
  const phase2 = scrollProgress >= 15 && scrollProgress < 30;  // 15-30%: Flicker/cracks
  const phase3 = scrollProgress >= 30 && scrollProgress < 50;  // 30-50%: Fracture/TOYE
  const phase4 = scrollProgress >= 50 && scrollProgress < 70;  // 50-70%: Annotations
  const phase5 = scrollProgress >= 70 && scrollProgress < 85;  // 70-85%: Swirl/settle
  const phase6 = scrollProgress >= 85;                         // 85-100%: Title card

  // Derived states for animations
  // Word visible immediately on load for good web UX
  // Starts at 80% opacity, reaches 100% quickly with scroll
  const wordVisible = true;
  const wordOpacity = Math.min(1, 0.8 + scrollProgress * 0.04);
  const flickering = phase2;
  const cracking = scrollProgress >= 20;
  const fracturing = scrollProgress >= 30;
  const toyeVisible = scrollProgress >= 35;
  const annotationsVisible = scrollProgress >= 50;
  const annotationsSwirling = phase5;
  const titleVisible = scrollProgress >= 85;

  // Calculate flicker intensity (peaks at 22%)
  const flickerIntensity = phase2 ? Math.sin((scrollProgress - 15) * 0.4) * 0.3 : 0;
  
  // Calculate crack spread (0 to 1 from 20-30%)
  const crackSpread = cracking ? Math.min(1, (scrollProgress - 20) / 10) : 0;
  
  // Modern word fade out (30-50%)
  const modernOpacity = fracturing ? Math.max(0.15, 1 - (scrollProgress - 30) / 25) : 1;
  
  // TOYE fade in (35-50%)
  const toyeOpacity = toyeVisible ? Math.min(1, (scrollProgress - 35) / 15) : 0;
  
  // Annotation individual opacities with stagger
  const annotationOpacities = [
    annotationsVisible ? Math.min(1, (scrollProgress - 50) / 8) : 0,
    annotationsVisible ? Math.min(1, (scrollProgress - 53) / 8) : 0,
    annotationsVisible ? Math.min(1, (scrollProgress - 56) / 8) : 0,
    annotationsVisible ? Math.min(1, (scrollProgress - 59) / 8) : 0,
  ];
  
  // Swirl rotation (70-85%)
  const swirlRotation = annotationsSwirling ? (scrollProgress - 70) * 8 : 0;
  const swirlScale = annotationsSwirling ? 1 + (scrollProgress - 70) * 0.01 : 1;
  
  // Title card fade (85-100%)
  const titleOpacity = titleVisible ? Math.min(1, (scrollProgress - 85) / 12) : 0;

  return (
    <section 
      ref={heroRef} 
      className={`hero-section scroll-lock-section ${isComplete ? "complete" : ""}`}
    >
      {/* Background - visible on load, builds with scroll */}
      <div 
        className="hero-background"
        style={{ opacity: Math.min(1, 0.3 + scrollProgress / 20) }}
      >
        <div className="parchment-texture" />
        
        {/* Floating annotations (50-85%) */}
        <div 
          className={`floating-definitions ${annotationsSwirling ? "swirling" : ""}`}
          style={{
            transform: annotationsSwirling ? `rotate(${swirlRotation}deg) scale(${swirlScale})` : "none",
            opacity: phase6 ? Math.max(0, 1 - (scrollProgress - 85) / 10) : 1,
          }}
        >
          <span 
            className="def-float def-1" 
            style={{ opacity: annotationOpacities[0] }}
          >
            amorous dalliance
          </span>
          <span 
            className="def-float def-2" 
            style={{ opacity: annotationOpacities[1] }}
          >
            a trifle
          </span>
          <span 
            className="def-float def-3" 
            style={{ opacity: annotationOpacities[2] }}
          >
            foolish behavior
          </span>
          <span 
            className="def-float def-4" 
            style={{ opacity: annotationOpacities[3] }}
          >
            something worthless
          </span>
        </div>
      </div>

      {/* Skip affordance */}
      {!isComplete && scrollProgress > 15 && (
        <button className="skip-button" onClick={handleSkip} aria-label="Skip animation">
          Skip →
        </button>
      )}

      {/* Progress indicator */}
      {!isComplete && scrollProgress > 5 && (
        <div className="scroll-lock-progress" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${scrollProgress}%` }} />
        </div>
      )}

      <div className="hero-content">
        {/* Phase 1-3: Word transformation (0-50%) */}
        <div 
          className={`word-container ${wordVisible ? "visible" : ""}`}
          style={{ opacity: phase6 ? Math.max(0, 1 - (scrollProgress - 85) / 10) : 1 }}
        >
          {/* Modern "TOY" - visible immediately, flickers at 15-30%, fades at 30-50% */}
          <div 
            className={`modern-word ${flickering ? "flickering" : ""} ${cracking ? "cracking" : ""} ${fracturing ? "fragmenting" : ""}`}
            style={{ 
              opacity: fracturing ? modernOpacity + flickerIntensity : wordOpacity + flickerIntensity,
              filter: cracking ? `blur(${crackSpread * 0.5}px)` : "none",
              transform: fracturing 
                ? `translateY(${(scrollProgress - 30) * 0.8}px) scale(${1 - (scrollProgress - 30) * 0.005})` 
                : "none",
            }}
          >
            <span style={{ animationDelay: "0s" }}>T</span>
            <span style={{ animationDelay: "0.1s" }}>O</span>
            <span style={{ animationDelay: "0.2s" }}>Y</span>
            
            {/* Hairline cracks overlay (15-30%) */}
            {cracking && (
              <div 
                className="crack-overlay"
                style={{ opacity: crackSpread }}
              />
            )}
          </div>
          
          {/* Medieval "TOYE" - emerges at 35-50% */}
          {toyeVisible && (
            <div 
              className="medieval-word"
              style={{ 
                opacity: toyeOpacity,
                transform: `translateY(${20 - toyeOpacity * 20}px)`,
              }}
            >
              <span className="blackletter">T</span>
              <span className="blackletter">O</span>
              <span className="blackletter">Y</span>
              <span className="blackletter">E</span>
            </div>
          )}
        </div>

        {/* Revelation text (30-50%) */}
        {fracturing && !phase6 && (
          <p 
            className="hero-revelation"
            style={{ opacity: Math.min(1, (scrollProgress - 35) / 15) }}
          >
            Before it meant plaything, &ldquo;toy&rdquo; meant something else entirely.
          </p>
        )}

        {/* Phase 6: Title card + wooden block (85-100%) */}
        {titleVisible && (
          <div 
            className="title-card"
            style={{ opacity: titleOpacity }}
          >
            <h1 className="essay-title">{ESSAY_META.title}</h1>
            <p className="essay-subtitle">{ESSAY_META.subtitle}</p>
            
            {/* Wooden toy block beneath title - spec requirement */}
            <div className="hero-block" style={{ opacity: Math.min(1, (scrollProgress - 90) / 8) }}>
              <span className="block-letter">T</span>
            </div>
            
            <p className="hero-tagline" style={{ opacity: Math.min(1, (scrollProgress - 93) / 7) }}>
              Building understanding, block by block.
            </p>
          </div>
        )}

        {/* Initial scroll indicator (0-10%) */}
        {scrollProgress < 10 && (
          <div className="scroll-indicator" style={{ opacity: 1 - scrollProgress / 10 }}>
            <ChevronDown size={24} />
            <span>Scroll to discover</span>
          </div>
        )}
      </div>
    </section>
  );
};

// Chapter Section Component
const ChapterSection: React.FC<{
  chapter: number;
  title: string;
  era: string;
  metaphor: string;
  children: React.ReactNode;
}> = ({ chapter, title, era, metaphor, children }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`chapter-section ${isVisible ? "visible" : ""}`}>
      <div className="chapter-header">
        <span className="chapter-number">Chapter {chapter}</span>
        <span className="chapter-era">{era}</span>
      </div>
      <h2 className="chapter-title">{title}</h2>
      <p className="chapter-metaphor">&ldquo;{metaphor}&rdquo;</p>
      <div className="chapter-content">{children}</div>
    </section>
  );
};

// Quote Monument Component
const QuoteMonument: React.FC<{
  quote: string;
  attribution: string;
  year?: string;
}> = ({ quote, attribution, year }) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={`quote-monument ${isVisible ? "visible" : ""}`}>
      <blockquote>
        <p>&ldquo;{quote}&rdquo;</p>
        <cite>
          — {attribution}
          {year && <span className="quote-year">, {year}</span>}
        </cite>
      </blockquote>
    </section>
  );
};

// Figure Profile Component
const FigureProfile: React.FC<{
  name: string;
  epithet: string;
  years?: string;
  contributions: string[];
  quote?: string;
}> = ({ name, epithet, years, contributions, quote }) => (
  <div className="figure-profile">
    <div className="figure-header">
      <h3 className="figure-name">{name}</h3>
      <span className="figure-epithet">{epithet}</span>
      {years && <span className="figure-years">{years}</span>}
    </div>
    <ul className="figure-contributions">
      {contributions.map((c, i) => (
        <li key={i}>{c}</li>
      ))}
    </ul>
    {quote && (
      <p className="figure-quote">&ldquo;{quote}&rdquo;</p>
    )}
  </div>
);

// Dictionary Entry Animation
const DictionaryEntry: React.FC<{
  era: string;
  definition: string;
  source?: string;
}> = ({ era, definition, source }) => (
  <div className="dictionary-entry">
    <div className="entry-era">{era}</div>
    <div className="entry-word">toy</div>
    <div className="entry-definition">{definition}</div>
    {source && <div className="entry-source">{source}</div>}
  </div>
);

// Etymology Tree Branch
const EtymologyBranch: React.FC<{
  compound: string;
  meaning: string;
  era: string;
}> = ({ compound, meaning, era }) => (
  <div className="etymology-branch">
    <span className="branch-compound">{compound}</span>
    <span className="branch-meaning">{meaning}</span>
    <span className="branch-era">{era}</span>
  </div>
);

// Figure Image Component
const FigureImage: React.FC<{
  image: ToyImage;
  priority?: boolean;
}> = ({ image, priority = false }) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={ref} className={`figure-image ${isVisible ? "visible" : ""} era-${image.era}`}>
      <div className="figure-image-container">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          priority={priority}
          className="figure-img"
        />
      </div>
      <figcaption>
        <p className="figure-caption">{image.caption}</p>
        <p className="figure-attribution">{image.attribution}</p>
      </figcaption>
    </figure>
  );
};

// Image Gallery Component
const ImageGallery: React.FC<{
  images: ToyImage[];
  columns?: 1 | 2;
}> = ({ images, columns = 2 }) => (
  <div className={`image-gallery columns-${columns}`}>
    {images.map((img) => (
      <FigureImage key={img.id} image={img} />
    ))}
  </div>
);

// Dictionary Archaeology Scroll-Lock Sequence
const DictionaryArchaeology: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate how far through the section we are
      const scrolled = viewportHeight - rect.top;
      const totalScroll = containerHeight + viewportHeight * 0.5;
      const progress = Math.min(100, Math.max(0, (scrolled / totalScroll) * 100));
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const definitions = [
    { era: "Modern", year: "2024", def: "A thing for a child to play with", style: "modern" },
    { era: "Early 20th C.", year: "1920", def: "An article for children's amusement", style: "vintage" },
    { era: "Victorian", year: "1888", def: "A plaything; a bauble; a trifle", style: "victorian" },
    { era: "Johnson", year: "1755", def: "A petty commodity; a thing of no value; a plaything", style: "johnson" },
    { era: "Medieval", year: "c. 1303", def: "Daliance; amorous sport; foolyssh behavoir", style: "medieval" },
  ];

  // Calculate which layer is active based on scroll progress
  const activeLayer = Math.min(4, Math.floor(scrollProgress / 20));

  return (
    <div ref={containerRef} className="dictionary-archaeology">
      <div className="archaeology-header">
        <span className="archaeology-label">Scroll-Lock: Dictionary Archaeology</span>
        <span className="archaeology-instruction">Scroll to excavate the word&apos;s history</span>
      </div>
      
      <div className="dictionary-layers">
        {definitions.map((def, index) => {
          const isActive = index <= activeLayer;
          const isCurrent = index === activeLayer;
          const layerProgress = Math.max(0, Math.min(100, (scrollProgress - index * 20) * 5));
          
          return (
            <div
              key={def.era}
              className={`dict-layer ${def.style} ${isActive ? "visible" : ""} ${isCurrent ? "current" : ""}`}
              style={{
                opacity: isActive ? Math.min(1, layerProgress / 100) : 0,
                transform: `translateY(${isActive ? 0 : 30}px)`,
                zIndex: definitions.length - index,
              }}
            >
              <div className="layer-era">{def.era}</div>
              <div className="layer-year">{def.year}</div>
              <div className="layer-word">toy</div>
              <div className="layer-def">{def.def}</div>
            </div>
          );
        })}
      </div>

      <div className="archaeology-footer">
        <p className="archaeology-insight">
          {activeLayer >= 4 
            ? "The original meaning revealed: before playthings, there was dalliance."
            : "Keep scrolling to dig deeper into history..."}
        </p>
      </div>
    </div>
  );
};

// Shakespeare Shuffle Scroll-Lock Sequence  
const ShakespeareShuffle: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrolled = viewportHeight - rect.top;
      const totalScroll = containerHeight + viewportHeight * 0.3;
      const progress = Math.min(100, Math.max(0, (scrolled / totalScroll) * 100));
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shakespeareUses = [
    { play: "Hamlet", quote: "These are but wild and whirling toys", meaning: "fantasies" },
    { play: "Much Ado", quote: "This is a very scurvy toy of Fortune's", meaning: "trick" },
    { play: "Winter's Tale", quote: "A toy in blood", meaning: "fancy, whim" },
    { play: "Othello", quote: "Trifles light as air", meaning: "related: trifles" },
    { play: "King Lear", quote: "As flies to wanton boys", meaning: "sport, play" },
  ];

  const visibleCards = Math.min(5, Math.floor(scrollProgress / 15) + 1);
  const isSpread = scrollProgress > 60;
  const showConclusion = scrollProgress > 85;

  return (
    <div ref={containerRef} className="shakespeare-shuffle">
      <div className="shuffle-header">
        <span className="shuffle-label">Scroll-Lock: Shakespeare&apos;s Thirty Uses</span>
      </div>

      <div className={`card-deck ${isSpread ? "spread" : "stacked"}`}>
        {shakespeareUses.map((use, index) => {
          const isVisible = index < visibleCards;
          const spreadOffset = isSpread ? (index - 2) * 120 : index * 4;
          
          return (
            <div
              key={use.play}
              className={`folio-card ${isVisible ? "revealed" : ""}`}
              style={{
                transform: `
                  translateX(${spreadOffset}px) 
                  translateY(${isVisible ? 0 : 50}px)
                  rotate(${isSpread ? (index - 2) * 5 : index * 0.5}deg)
                `,
                opacity: isVisible ? 1 : 0,
                zIndex: shakespeareUses.length - index,
              }}
            >
              <div className="card-play">{use.play}</div>
              <div className="card-quote">&ldquo;{use.quote}&rdquo;</div>
              <div className="card-meaning">meaning: {use.meaning}</div>
            </div>
          );
        })}
      </div>

      {showConclusion && (
        <div className="shuffle-conclusion">
          <p>Shakespeare used &ldquo;toy&rdquo; over 30 times.</p>
          <p className="conclusion-emphasis">Never once meaning &ldquo;child&apos;s plaything.&rdquo;</p>
        </div>
      )}
    </div>
  );
};

// Etymology Complete Scroll-Lock (for Ch7)
const EtymologyComplete: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrolled = viewportHeight - rect.top;
      const totalScroll = containerHeight + viewportHeight * 0.3;
      const progress = Math.min(100, Math.max(0, (scrolled / totalScroll) * 100));
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const meanings = [
    { text: "dalliance", era: "1303" },
    { text: "trifle", era: "1400s" },
    { text: "ornament", era: "1500s" },
    { text: "fancy", era: "1600s" },
    { text: "bauble", era: "1700s" },
    { text: "plaything", era: "1800s" },
  ];

  const assemblyProgress = scrollProgress / 100;
  const finalReveal = scrollProgress > 85;

  return (
    <div ref={containerRef} className="etymology-complete">
      <div className="complete-header">
        <span className="complete-label">The Word Reassembles</span>
      </div>

      <div className="meaning-fragments">
        {meanings.map((m, index) => {
          const fragmentProgress = Math.max(0, (scrollProgress - index * 12) / 20);
          const moveToCenter = Math.min(1, fragmentProgress);
          const startAngle = (index / meanings.length) * 360;
          const radius = 150 * (1 - moveToCenter);
          // Round to avoid hydration mismatch from floating-point precision
          const x = Math.round(Math.cos((startAngle * Math.PI) / 180) * radius);
          const y = Math.round(Math.sin((startAngle * Math.PI) / 180) * radius);
          
          return (
            <div
              key={m.text}
              className="meaning-fragment"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                opacity: fragmentProgress > 0 ? Math.min(1, fragmentProgress * 2) : 0.3,
              }}
            >
              <span className="fragment-text">{m.text}</span>
              <span className="fragment-era">{m.era}</span>
            </div>
          );
        })}
      </div>

      {finalReveal && (
        <div className="final-word" style={{ opacity: (scrollProgress - 85) / 15 }}>
          <span className="final-letters">
            <span>T</span>
            <span>O</span>
            <span>Y</span>
          </span>
          <p className="final-meaning">A word that carries seven centuries of meaning.</p>
        </div>
      )}
    </div>
  );
};

// Sources Section
const SourcesSection: React.FC = () => (
  <section className="sources-section">
    <div className="sources-content">
      <h3 className="sources-title">Sources & Further Reading</h3>
      <ul className="sources-list">
        {SOURCES.map((source, index) => (
          <li key={index}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.title}
              <ExternalLink size={12} />
            </a>
          </li>
        ))}
      </ul>
      <p className="sources-note">
        This narrative was researched using peer-reviewed etymological sources, 
        historical dictionaries, and museum collections specializing in toy history.
      </p>
    </div>
  </section>
);

// ==================== MAIN COMPONENT ====================

const OriginOfToyClient: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(Math.min(currentProgress, 100));
      setHeaderScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="origin-of-toy visual-essay">
      <EssayHeader scrolled={headerScrolled} />
      <BlocksProgress progress={scrollProgress} />

      <main className="essay-main">
        {/* Hero Section */}
        <HeroSection />

        {/* Chapter 1: The Medieval Toye */}
        <ChapterSection
          chapter={1}
          title="The Medieval Toye"
          era="England, 1300–1500"
          metaphor="When 'toy' meant whispered scandal—the word's lost first life."
        >
          <FigureImage image={chapter1Images[0]} priority />

          <div className="content-block">
            <p>
              The word &ldquo;toy&rdquo; first appears in English around 1303, and it has nothing 
              to do with children. In the medieval imagination, a <em>toye</em> was a dalliance—a 
              flirtation, a romantic interlude, perhaps something improper. To &ldquo;toy with&rdquo; 
              someone was to engage in amorous play.
            </p>
          </div>

          <DictionaryEntry
            era="c. 1303"
            definition="Daliance; amorous sport or play; trifling behavior"
            source="Middle English Dictionary"
          />

          <ImageGallery images={chapter1Images.slice(1)} columns={2} />

          <div className="content-block">
            <p>
              The etymology itself is mysterious. Scholars debate whether &ldquo;toy&rdquo; descends from 
              Middle Dutch <em>toi</em> (ornament, finery), or emerges independently from English wordplay. 
              What&apos;s certain is its early semantic field: frivolity, worthlessness, idle amusement.
            </p>
            <p>
              For medieval writers, the word carried a whiff of moral suspicion. To spend time on 
              &ldquo;toys&rdquo; was to waste it. The word was already teaching a lesson about value.
            </p>
          </div>

          <FigureProfile
            name="Geoffrey Chaucer"
            epithet="The Poet Who First Toyed"
            years="c. 1343–1400"
            contributions={[
              "Among the earliest recorded users of 'toy' in Middle English",
              "Used the word to mean idle talk and trifling matters",
              "His Canterbury Tales established many words in English literature",
            ]}
          />

          {/* Scroll-Lock: Dictionary Archaeology */}
          <DictionaryArchaeology />
        </ChapterSection>

        {/* Quote: Peter Damian */}
        <QuoteMonument
          quote="Nor did she deign to touch food with her fingers, but would command her eunuchs to cut it up into small pieces, which she would impale on a certain golden instrument with two prongs."
          attribution="Peter Damian, on Byzantine customs"
          year="c. 1060"
        />

        {/* Chapter 2: Trifle and Dalliance */}
        <ChapterSection
          chapter={2}
          title="Trifle and Dalliance"
          era="Early Modern England, 1500–1650"
          metaphor="When 'toy' meant everything except plaything—the word at its wildest."
        >
          <FigureImage image={chapter2Images[0]} />

          <div className="content-block">
            <p>
              Shakespeare used &ldquo;toy&rdquo; over thirty times—<em>never once</em> meaning 
              a child&apos;s plaything. For the Elizabethans, &ldquo;toy&rdquo; was a Swiss Army knife 
              of a word: a fancy, a whim, an idle thought, a trifle, an ornament, a small gift, 
              a romantic entanglement.
            </p>
          </div>

          <ImageGallery images={chapter2Images.slice(1, 3)} columns={2} />

          <QuoteMonument
            quote="These are but wild and whirling toys."
            attribution="Hamlet"
            year="1601"
          />

          <FigureImage image={chapter2Images[3]} />

          <div className="content-block">
            <p>
              Wealthy women wore &ldquo;toys&rdquo;—not playthings but jewelry, ornamental trinkets, 
              decorative frivolities. Men dismissed women&apos;s concerns as &ldquo;toys,&rdquo; meaning 
              matters of no consequence. The word lived in the space between desire and dismissal.
            </p>
            <p>
              Crucially, &ldquo;toy&rdquo; in this era still belonged primarily to adults. Children had 
              playthings—dolls, balls, hoops—but the English language rarely called them &ldquo;toys.&rdquo; 
              That association was still forming, like a photograph developing in chemical baths.
            </p>
          </div>

          {/* Scroll-Lock: Shakespeare Shuffle */}
          <ShakespeareShuffle />

          <div className="figure-grid">
            <FigureProfile
              name="William Shakespeare"
              epithet="Master of Semantic Range"
              years="1564–1616"
              contributions={[
                "Used 'toy' 30+ times, never meaning 'child's plaything'",
                "His uses include: fancy, whim, ornament, trifle, idle imagination",
                "Demonstrates the word's breadth before semantic narrowing",
              ]}
              quote="This is a very scurvy toy of Fortune's."
            />
            <FigureProfile
              name="Robert Cawdrey"
              epithet="The First Dictionary Maker"
              years="c. 1538–1604"
              contributions={[
                "Compiled 'A Table Alphabeticall' (1604)—first English dictionary",
                "Captured early definitions showing 'toy' as trifle and ornament",
                "Preserved evidence of how Elizabethans understood common words",
              ]}
            />
          </div>
        </ChapterSection>

        {/* Chapter 3: The Children's Claim */}
        <ChapterSection
          chapter={3}
          title="The Children's Claim"
          era="17th–18th Century"
          metaphor="When childhood itself was invented—and claimed a word."
        >
          <ImageGallery images={chapter3Images.slice(0, 2)} columns={2} />

          <div className="content-block">
            <p>
              The 17th and 18th centuries invented childhood as we know it. Philosophers like 
              John Locke and Jean-Jacques Rousseau argued that children were not miniature adults 
              but a distinct category of human being—with distinct needs, including play.
            </p>
            <p>
              As childhood crystallized as a concept, it required vocabulary. &ldquo;Toy&rdquo; was available.
            </p>
          </div>

          <FigureImage image={chapter3Images[2]} />

          <DictionaryEntry
            era="1755"
            definition="TOY: A petty commodity; a trifle; a thing of no value; a plaything; a bauble."
            source="Samuel Johnson's Dictionary"
          />

          <FigureImage image={chapter3Images[3]} />

          <div className="content-block">
            <p>
              Samuel Johnson&apos;s Dictionary (1755) still lists multiple meanings for &ldquo;toy&rdquo;—but 
              the children&apos;s sense is rising. By century&apos;s end, &ldquo;toy&rdquo; increasingly meant what 
              adults gave children: objects designed for play, for learning-through-amusement, 
              for cultivating innocent joy.
            </p>
          </div>

          <FigureImage image={chapter3Images[4]} />

          <div className="figure-grid">
            <FigureProfile
              name="John Locke"
              epithet="Philosopher of Childhood"
              years="1632–1704"
              contributions={[
                "Some Thoughts Concerning Education (1693) emphasized learning through play",
                "Argued children should have playthings suited to their development",
                "Helped establish philosophical foundation for toys as educational tools",
              ]}
            />
            <FigureProfile
              name="Jean-Jacques Rousseau"
              epithet="Champion of Natural Play"
              years="1712–1778"
              contributions={[
                "Émile (1762) revolutionized thinking about childhood",
                "Advocated for children's natural inclination to play as essential",
                "Influenced how society conceptualized childhood—and its objects",
              ]}
            />
          </div>
        </ChapterSection>

        {/* Chapter 4: The Toymaker's Art */}
        <ChapterSection
          chapter={4}
          title="The Toymaker's Art"
          era="Nuremberg & European Toymaking, 1600–1850"
          metaphor="When 'toy' became a profession—the word gains weight."
        >
          <FigureImage image={chapter4Images[0]} />

          <div className="content-block">
            <p>
              Nuremberg claimed the title &ldquo;Toy Capital of the World&rdquo; by the 18th century. 
              Generations of craftsmen—wood carvers, tin smiths, doll makers—transformed &ldquo;toy&rdquo; 
              from dismissive noun to proud profession. When your family name was synonymous with 
              toymaking, the word commanded respect.
            </p>
            <p>
              The guild system elevated toy production to recognized craft. Master toymakers trained 
              apprentices. Quality standards emerged. Toy fairs drew international buyers. What had 
              been &ldquo;trifles&rdquo; were now serious business.
            </p>
          </div>

          <ImageGallery images={chapter4Images.slice(1, 3)} columns={2} />

          <div className="craft-showcase">
            <div className="craft-item">
              <span className="craft-material">Wood</span>
              <span className="craft-region">Black Forest</span>
            </div>
            <div className="craft-item">
              <span className="craft-material">Tin</span>
              <span className="craft-region">Nuremberg</span>
            </div>
            <div className="craft-item">
              <span className="craft-material">Porcelain</span>
              <span className="craft-region">Thuringia</span>
            </div>
          </div>

          <FigureImage image={chapter4Images[3]} />

          <div className="content-block">
            <p>
              The materials told stories: carved wood from the Black Forest, painted tin from 
              Nuremberg, delicate porcelain dolls from Thuringia. Each material had its masters, 
              each region its specialty. &ldquo;Toy&rdquo; absorbed the dignity of craft, the weight of 
              tradition, the pride of expertise.
            </p>
          </div>

          <FigureProfile
            name="The Nuremberg Toymakers"
            epithet="Craftsmen Who Gave 'Toy' Weight"
            years="16th–19th Century"
            contributions={[
              "Established Nuremberg as 'Toy Capital of the World' by 1700s",
              "Guild system elevated toymaking to recognized profession",
              "Exported tin soldiers, wooden figures, and mechanical toys worldwide",
              "Families like Märklin and Bing made 'toymaker' a proud identity",
            ]}
          />
        </ChapterSection>

        {/* Chapter 5: Industry and Innocence */}
        <ChapterSection
          chapter={5}
          title="Industry and Innocence"
          era="Victorian Era to Early 20th Century"
          metaphor="When toys became products—and 'toy' became synonymous with childhood."
        >
          <FigureImage image={chapter5Images[0]} />

          <div className="content-block">
            <p>
              The Industrial Revolution transformed toys from handcraft to mass product. Factories 
              in Germany, Britain, and America churned out tin soldiers, porcelain dolls, and 
              mechanical wonders at unprecedented scale. Prices fell. Availability exploded. 
              For the first time, toys reached beyond the wealthy.
            </p>
          </div>

          <ImageGallery images={chapter5Images.slice(1, 3)} columns={2} />

          <div className="stat-block">
            <div className="stat-item">
              <span className="stat-value">1862</span>
              <span className="stat-label">FAO Schwarz founded</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">1760</span>
              <span className="stat-label">Hamleys opens in London</span>
            </div>
          </div>

          <FigureImage image={chapter5Images[3]} />

          <div className="content-block">
            <p>
              Victorian sentiment wrapped &ldquo;toy&rdquo; in moral warmth. Childhood was sacred; toys 
              were childhood&apos;s sacred objects. Christmas traditions made toy-giving a ritual of love. 
              Department stores built cathedrals of consumerism with toy departments as their holy of holies.
            </p>
            <p>
              By 1900, the semantic transformation was complete. &ldquo;Toy&rdquo; now meant, primarily and 
              overwhelmingly, an object for children&apos;s play. The older meanings—trifle, ornament, 
              dalliance—retreated to archaic status.
            </p>
          </div>

          <FigureProfile
            name="A.C. Gilbert"
            epithet="The Man Who Saved Christmas"
            years="1884–1961"
            contributions={[
              "Invented the Erector Set (1913)—educational construction toy",
              "Olympic gold medalist who became toy magnate",
              "During WWI, lobbied Congress to exempt toy industry from war production",
              "Earned nickname 'The Man Who Saved Christmas' for ensuring toys remained available",
            ]}
            quote="Hello, Boys! Make Lots of Toys!"
          />
        </ChapterSection>

        {/* Chapter 6: The Living Word */}
        <ChapterSection
          chapter={6}
          title="The Living Word"
          era="20th Century to Present"
          metaphor="When 'toy' outgrew the nursery—the word's modern migrations."
        >
          <FigureImage image={chapter6Images[0]} />

          <div className="content-block">
            <p>
              The 20th century secured &ldquo;toy&rdquo; as a children&apos;s word—but the word refused to 
              stay put. New compounds emerged: &ldquo;toy soldier,&rdquo; &ldquo;toy car,&rdquo; &ldquo;toy poodle&rdquo; 
              (a dog bred small enough to be... toy-like?). &ldquo;Sex toys&rdquo; reclaimed the word&apos;s 
              ancient association with adult pleasure. &ldquo;Executive toys&rdquo; colonized office desks.
            </p>
          </div>

          <ImageGallery images={chapter6Images.slice(1)} columns={2} />

          <div className="etymology-tree">
            <div className="tree-trunk">TOY</div>
            <div className="tree-branches">
              <EtymologyBranch compound="toy soldier" meaning="miniature figure" era="19th c." />
              <EtymologyBranch compound="toy poodle" meaning="small dog breed" era="20th c." />
              <EtymologyBranch compound="executive toy" meaning="desk distraction" era="1970s" />
              <EtymologyBranch compound="boy toy" meaning="young attractive person" era="1980s" />
              <EtymologyBranch compound="adult toys" meaning="intimate devices" era="modern" />
            </div>
          </div>

          <div className="content-block">
            <p>
              Today, &ldquo;toy&rdquo; lives everywhere. It modifies nouns (toy car, toy gun), names entire 
              industries, describes anything miniature or playful or not-quite-serious. The word 
              that once meant &ldquo;trifle&rdquo; has become essential to billion-dollar commerce—the 
              ultimate revenge of frivolity.
            </p>
          </div>

          <div className="figure-grid">
            <FigureProfile
              name="Ole Kirk Christiansen"
              epithet="The Block Builder"
              years="1891–1958"
              contributions={[
                "Founded LEGO (from Danish 'leg godt' = 'play well')",
                "Created the world's most successful toy",
                "LEGO represents the enduring power of creative play",
              ]}
            />
            <FigureProfile
              name="Ruth Handler"
              epithet="Barbie's Mother"
              years="1916–2002"
              contributions={[
                "Co-founded Mattel; created Barbie (1959)",
                "Created the most successful doll in history",
                "Transformed 'toy' into cultural phenomenon",
              ]}
              quote="Through the doll, the little girl could be anything she wanted to be."
            />
          </div>
        </ChapterSection>

        {/* Chapter 7: The Meaning of Play */}
        <ChapterSection
          chapter={7}
          title="The Meaning of Play"
          era="Present Day and Reflection"
          metaphor="What the journey of one word teaches us about permission to play."
        >
          <FigureImage image={chapter7Images[0]} />

          <div className="content-block">
            <p>
              Johan Huizinga, the Dutch historian, argued that play is older than culture itself. 
              Animals play. Babies play before they speak. Play is not a break from life—it is 
              essential to life. The word &ldquo;toy&rdquo; carries this weight now, but it didn&apos;t always.
            </p>
          </div>

          <FigureImage image={chapter7Images[2]} />

          <QuoteMonument
            quote="Play is older than culture, for culture, however inadequately defined, always presupposes human society, and animals have not waited for man to teach them their playing."
            attribution="Johan Huizinga"
            year="1938"
          />

          <div className="content-block">
            <p>
              When &ldquo;toy&rdquo; meant &ldquo;trifle,&rdquo; society confessed its suspicion of play. When 
              &ldquo;toy&rdquo; meant &ldquo;ornament,&rdquo; it revealed anxiety about frivolity. When &ldquo;toy&rdquo; 
              finally settled on &ldquo;children&apos;s plaything,&rdquo; it both honored childhood and exiled 
              adult play—giving children permission while implicitly denying it to adults.
            </p>
            <p>
              To trace a word is to trace a culture&apos;s permission structures. What we call things 
              reveals what we allow ourselves to want.
            </p>
          </div>

          <FigureProfile
            name="Johan Huizinga"
            epithet="Philosopher of Play"
            years="1872–1945"
            contributions={[
              "Homo Ludens (1938) argued play is foundational to culture",
              "Elevated play from frivolity to fundamental human need",
              "His work reframed how scholars understand toys and games",
            ]}
          />

          {/* Scroll-Lock: Etymology Complete */}
          <EtymologyComplete />
        </ChapterSection>

        {/* Revelation / Closing */}
        <section className="revelation-section">
          <div className="revelation-content">
            <p className="revelation-text">
              Every time you say &ldquo;toy,&rdquo; seven centuries speak through you.
            </p>
            <p className="revelation-subtext">
              The word carries medieval scandal and Enlightenment philosophy, 
              Victorian sentiment and modern commerce. A single syllable—and 
              an entire history of humanity&apos;s relationship with play.
            </p>
          </div>
        </section>

        {/* Sources */}
        <SourcesSection />

        {/* Footer */}
        <footer className="essay-footer">
          <Link href="/essays/visual" className="footer-back">
            <ArrowLeft size={16} />
            <span>All Visual Essays</span>
          </Link>
          <p className="footer-note">
            An Esy Visual Essay
          </p>
        </footer>
      </main>
    </div>
  );
};

export default OriginOfToyClient;
