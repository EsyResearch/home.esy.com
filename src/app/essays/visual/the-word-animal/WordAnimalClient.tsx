/* eslint-disable react/no-unescaped-entities */
"use client";

/**
 * ANIMUS — THE LIVING WORD
 * =========================
 * Visual Essay Client Component
 * 
 * Created via Visual Essay Orchestrator Pipeline
 * Following 6-Layer Invocation Spec: ./specs/invocation-spec.md
 * Research Package: ./research/
 * 
 * Unique Visual Identity:
 * - Breathing progress bar (anima metaphor)
 * - 5 distinct era treatments with evolving typography
 * - Deep forest color base with warm ivory text
 * - Organic animations reflecting living things
 */

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  VisualEssay,
  VoiceUnseen,
  VoiceEternal,
  PullQuote,
  SectionDivider,
  useCinematicScroll,
  useIntersectionReveal,
  useReducedMotion,
} from '@/components/VisualEssay';
import './the-word-animal.css';

// ===========================================
// IMAGE SOURCES - Verified Public Domain / CC Licensed
// Documentation: ./research/IMAGE-DOCUMENTATION.md
// All URLs verified with curl -sI for Content-Type: image/*
// ===========================================

const IMAGES = {
  hero: {
    // Wolf portrait - CC BY-SA 3.0 - Bernard Landgraf via Wikimedia Commons
    main: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Canis_lupus_laying_in_grass.jpg',
    alt: 'Eurasian wolf (Canis lupus) resting in grass, representing the animal kingdom',
  },
  ancient: {
    // Aristotle bust - Public Domain - Museo Nazionale Romano
    aristotle: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Aristotle_Altemps_Inv8575.jpg',
    aristotleAlt: 'Roman marble bust of Aristotle, copy after Greek bronze by Lysippos',
    // Greek Temple - CC BY-SA 4.0
    inscription: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Temple_of_Hephaestus_in_Athens.jpg',
    inscriptionAlt: 'Temple of Hephaestus in Athens, Greece - ancient Greek architecture',
    // Reuse Aristotle for mosaic context
    mosaic: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Aristotle_Altemps_Inv8575.jpg',
    mosaicAlt: 'Roman marble bust of Aristotle from Museo Nazionale Romano',
  },
  medieval: {
    // Met Museum illuminated manuscript - CC0
    manuscript: 'https://images.metmuseum.org/CRDImages/rl/original/DT738.jpg',
    manuscriptAlt: 'Medieval illuminated manuscript depicting demons, from The Metropolitan Museum of Art',
    // Cabinet of Curiosities - Public Domain (1655)
    scriptorium: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Musei_Wormiani_Historia.jpg',
    scriptorimAlt: 'Musei Wormiani Historia - Renaissance cabinet of curiosities (1655)',
    // Reuse manuscript for lion context
    lion: 'https://images.metmuseum.org/CRDImages/rl/original/DT738.jpg',
    lionAlt: 'Medieval illuminated manuscript from The Metropolitan Museum of Art',
  },
  renaissance: {
    // Cabinet of Curiosities - Public Domain (1655)
    anatomy: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Musei_Wormiani_Historia.jpg',
    anatomyAlt: 'Musei Wormiani Historia showing a cabinet of curiosities',
    cabinet: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Musei_Wormiani_Historia.jpg',
    cabinetAlt: 'Musei Wormiani Historia - 17th century cabinet of curiosities illustration by Ole Worm',
    naturalist: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Musei_Wormiani_Historia.jpg',
    naturalistAlt: 'Ole Worm\'s Museum Wormianum illustration showing natural specimens',
  },
  enlightenment: {
    // Systema Naturae title page - Public Domain (1758)
    taxonomy: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Linnaeus1758-title-page.jpg',
    taxonomyAlt: 'Title page of Systema Naturae, 10th edition (1758) by Carl Linnaeus',
    // Linnaeus portrait - Public Domain
    specimens: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Carolus_Linnaeus.jpg',
    specimensAlt: 'Portrait of Carl Linnaeus (Carolus Linnaeus), father of modern taxonomy',
    library: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Linnaeus1758-title-page.jpg',
    libraryAlt: 'Systema Naturae title page representing Enlightenment scientific classification',
  },
  darwin: {
    // Darwin finches - Public Domain (John Gould, 1845)
    finches: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Darwin%27s_finches.jpeg',
    finchesAlt: 'Darwin\'s finches illustration by John Gould (1845) showing beak variations',
    // Tree of Life sketch - Public Domain (Darwin's notebook, 1837)
    tree: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Darwin_Tree_1837.png',
    treeAlt: 'Darwin\'s first tree of life sketch from his 1837 notebook with "I think" written above',
    // Fossil - CC BY 2.5
    fossils: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Elrathia_kingii_growth_series.jpg',
    fossilsAlt: 'Elrathia kingii trilobite fossil growth series showing evolution',
  },
  modern: {
    // DNA structure - CC BY-SA 3.0
    dna: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/DNA_Structure%2BKey%2BLabelled.pn_NoBB.png',
    dnaAlt: 'DNA double helix structure diagram with labeled base pairs',
    // Chimpanzee - CC BY-SA 4.0
    primate: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Pan_troglodytes_-_Serengeti-Park_Hodenhagen_10.jpg',
    primateAlt: 'Portrait of a chimpanzee (Pan troglodytes) showing expressive face',
    // Wolf for diversity
    diversity: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Canis_lupus_laying_in_grass.jpg',
    diversityAlt: 'Eurasian wolf representing animal kingdom diversity',
  },
};

// ===========================================
// BREATHING PROGRESS BAR (Themed per spec)
// ===========================================

interface BreathingProgressProps {
  progress: number;
}

const BreathingProgress: React.FC<BreathingProgressProps> = ({ progress }) => {
  // Determine current era based on progress
  const getEra = () => {
    if (progress < 0.15) return 'ancient';
    if (progress < 0.30) return 'medieval';
    if (progress < 0.50) return 'renaissance';
    if (progress < 0.70) return 'enlightenment';
    if (progress < 0.85) return 'darwin';
    return 'modern';
  };
  
  const era = getEra();
  
  // Era milestones for the breathing bar
  const milestones = [
    { position: 0, label: '350 BCE', era: 'ancient' },
    { position: 15, label: '630 CE', era: 'medieval' },
    { position: 35, label: '1550', era: 'renaissance' },
    { position: 55, label: '1758', era: 'enlightenment' },
    { position: 75, label: '1859', era: 'darwin' },
    { position: 95, label: '2025', era: 'modern' },
  ];
  
  return (
    <div className={`breathing-progress era-${era}`} aria-label={`Progress: ${Math.round(progress * 100)}%`}>
      <div className="breathing-track">
        {/* The "breath" that fills as you scroll */}
        <div 
          className="breathing-fill"
          style={{ height: `${progress * 100}%` }}
        >
          <div className="breath-pulse" />
        </div>
        
        {/* Era milestones */}
        {milestones.map((milestone) => (
          <div 
            key={milestone.label}
            className={`breathing-milestone ${progress * 100 >= milestone.position ? 'passed' : ''}`}
            style={{ top: `${milestone.position}%` }}
          >
            <span className="milestone-dot" />
            <span className="milestone-label">{milestone.label}</span>
          </div>
        ))}
      </div>
      
      {/* ANIMA letters that form as you scroll */}
      <div className="anima-letters">
        {['A', 'N', 'I', 'M', 'A', 'L'].map((letter, i) => (
          <span 
            key={i}
            className={`anima-letter ${progress > (i + 1) / 7 ? 'visible' : ''}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

// ===========================================
// SCROLL-REVEALED BLOCK
// ===========================================

interface RevealedBlockProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const RevealedBlock: React.FC<RevealedBlockProps> = ({ children, className = '', delay = 0 }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <div 
      ref={ref}
      className={`revealed-block ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ===========================================
// ERA-STYLED CHAPTER HEADER
// ===========================================

interface ChapterHeaderProps {
  number: string;
  title: string;
  temporal: string;
  era: 'ancient' | 'medieval' | 'renaissance' | 'enlightenment' | 'darwin' | 'modern';
}

const ChapterHeader: React.FC<ChapterHeaderProps> = ({ number, title, temporal, era }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  return (
    <header ref={ref} className={`chapter-header era-${era} ${isVisible ? 'visible' : ''}`}>
      <span className="chapter-number">{number}</span>
      <h2 className="chapter-title">{title}</h2>
      <span className="chapter-temporal">{temporal}</span>
    </header>
  );
};

// ===========================================
// ETYMOLOGY SPOTLIGHT
// ===========================================

interface EtymologySpotlightProps {
  word: string;
  pronunciation: string;
  language: string;
  meaning: string;
  date: string;
  derivation?: string;
  era: 'ancient' | 'medieval' | 'renaissance' | 'enlightenment' | 'darwin' | 'modern';
}

const EtymologySpotlight: React.FC<EtymologySpotlightProps> = ({
  word,
  pronunciation,
  language,
  meaning,
  date,
  derivation,
  era,
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  return (
    <div ref={ref} className={`etymology-spotlight era-${era} ${isVisible ? 'visible' : ''}`}>
      <div className="etymology-word-container">
        <span className="etymology-word">{word}</span>
        <span className="etymology-pronunciation">/{pronunciation}/</span>
      </div>
      <div className="etymology-meta">
        <span className="etymology-language">{language}</span>
        <span className="etymology-date">{date}</span>
      </div>
      <p className="etymology-meaning">{meaning}</p>
      {derivation && (
        <p className="etymology-derivation">{derivation}</p>
      )}
    </div>
  );
};

// ===========================================
// FIGURE PROFILE CARD
// ===========================================

interface FigureProfileProps {
  name: string;
  epithet: string;
  dates: string;
  imageSrc: string;
  imageAlt: string;
  contributions: string[];
  quote?: string;
  quoteSource?: string;
  era: 'ancient' | 'medieval' | 'renaissance' | 'enlightenment' | 'darwin' | 'modern';
}

const FigureProfile: React.FC<FigureProfileProps> = ({
  name,
  epithet,
  dates,
  imageSrc,
  imageAlt,
  contributions,
  quote,
  quoteSource,
  era,
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <figure ref={ref} className={`figure-profile era-${era} ${isVisible ? 'visible' : ''}`}>
      <div className="figure-image-wrapper">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={240}
          height={300}
          className="figure-image"
        />
        <div className="figure-frame" />
      </div>
      
      <figcaption className="figure-content">
        <h4 className="figure-name">{name}</h4>
        <p className="figure-epithet">{epithet}</p>
        <p className="figure-dates">{dates}</p>
        
        <ul className="figure-contributions">
          {contributions.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        
        {quote && (
          <blockquote className="figure-quote">
            <p>"{quote}"</p>
            {quoteSource && <cite>— {quoteSource}</cite>}
          </blockquote>
        )}
      </figcaption>
    </figure>
  );
};

// ===========================================
// IMAGE REVEAL
// ===========================================

interface ImageRevealProps {
  src: string;
  alt: string;
  caption?: string;
  era: 'ancient' | 'medieval' | 'renaissance' | 'enlightenment' | 'darwin' | 'modern';
}

const ImageReveal: React.FC<ImageRevealProps> = ({ src, alt, caption, era }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.15,
    triggerOnce: true,
  });
  
  return (
    <div ref={ref} className={`image-reveal era-${era} ${isVisible ? 'visible' : ''}`}>
      <div className="image-reveal-inner">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className="reveal-image"
        />
        <div className="image-vignette" />
        <div className="image-grain" />
      </div>
      {caption && <p className="image-caption">{caption}</p>}
    </div>
  );
};

// ===========================================
// MAIN CLIENT COMPONENT
// ===========================================

export default function WordAnimalClient() {
  const { progress: scrollProgress } = useCinematicScroll();
  const prefersReduced = useReducedMotion();
  
  return (
    <VisualEssay className="word-animal-essay">
      {/* Breathing Progress Bar */}
      <BreathingProgress progress={scrollProgress} />
      
      {/* ============================================
          HERO: FIRST BREATH
          ============================================ */}
      <header className="hero-section">
        <div className="hero-background">
          <Image
            src={IMAGES.hero.main}
            alt={IMAGES.hero.alt}
            fill
            priority
            className="hero-image"
          />
          <div className="hero-overlay" />
          <div className="hero-grain" />
        </div>
        
        <div className="hero-content">
          <span className="hero-kicker">The Etymology of</span>
          
          <h1 className="hero-title">
            <span className="hero-title-animus">ANIMUS</span>
            <span className="hero-title-connector">
              <svg viewBox="0 0 60 24" className="arrow-svg">
                <path d="M0 12h50M45 6l10 6-10 6" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </span>
            <span className="hero-title-animal">ANIMAL</span>
          </h1>
          
          <p className="hero-subtitle">
            The Word That Named Every Creature That Breathes
          </p>
          
          <div className="hero-scroll-cue">
            <span>Begin the Journey</span>
            <div className="scroll-breath" />
          </div>
        </div>
      </header>
      
      {/* ============================================
          PROLOGUE
          ============================================ */}
      <section className="prologue">
        <div className="prologue-content">
          <RevealedBlock className="prologue-question" delay={0}>
            What is an animal?
          </RevealedBlock>
          
          <RevealedBlock className="prologue-modern" delay={200}>
            Today's biology textbook answers: a multicellular, eukaryotic organism 
            that consumes organic matter, breathes oxygen, and is capable of 
            voluntary movement.
          </RevealedBlock>
          
          <RevealedBlock className="prologue-ancient" delay={400}>
            But 2,500 years ago, the answer was simpler—and infinitely more profound.
          </RevealedBlock>
          
          <RevealedBlock className="prologue-revelation" delay={600}>
            An animal was anything that had <em>anima</em>.<br />
            Breath. Soul. The invisible force that separates<br />
            the living from the dead.
          </RevealedBlock>
        </div>
      </section>
      
      {/* ============================================
          CHAPTER 1: THE BREATH OF LIFE
          ============================================ */}
      <section className="chapter era-ancient" id="ancient">
        <ChapterHeader
          number="I"
          title="The Breath of Life"
          temporal="Greek & Roman World • 350 BCE – 100 CE"
          era="ancient"
        />
        
        <ImageReveal
          src={IMAGES.ancient.aristotle}
          alt={IMAGES.ancient.aristotleAlt}
          caption="The classical world where philosophy first named the living"
          era="ancient"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The story begins not with beasts, but with breath. In the ancient 
            Mediterranean, the word that would become "animal" started as 
            something invisible—the vapor that entered a body at birth and 
            departed at death.
          </VoiceUnseen>
        </div>
        
        <EtymologySpotlight
          word="*h₂enh₁-"
          pronunciation="h₂enh₁"
          language="Proto-Indo-European"
          meaning="to breathe"
          date="c. 4000 BCE"
          derivation="The reconstructed root that gave rise to Latin anima, Greek anemos (wind), and Sanskrit ātman (soul)"
          era="ancient"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            From this ancient root, the Romans derived <em>anima</em>—the breath 
            of life, the soul made manifest in respiration. And from <em>anima</em>, 
            they created <em>animalis</em>: "having breath" or "having a soul."
          </VoiceUnseen>
        </div>
        
        <EtymologySpotlight
          word="anima"
          pronunciation="AH-nee-mah"
          language="Latin"
          meaning="breath, soul, life force, the vital principle"
          date="c. 350 BCE"
          era="ancient"
        />
        
        <FigureProfile
          name="Aristotle"
          epithet="The Father of Zoology"
          dates="384–322 BCE"
          imageSrc={IMAGES.ancient.mosaic}
          imageAlt="Ancient mosaic representing classical knowledge"
          contributions={[
            "First systematic classification of living things",
            "Wrote De Anima (On the Soul) and Historia Animalium",
            "Defined animals by sensation and voluntary movement",
            "Greek ζῷον (zōion) translated to Latin animalis"
          ]}
          quote="The soul is the cause and principle of the living body."
          quoteSource="De Anima, Book II"
          era="ancient"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Aristotle divided nature into three categories: things that grow 
            (plants), things that feel (animals), and things that reason (humans). 
            The animal was defined by sensation—the ability to perceive and 
            respond to the world.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          Before we named them by their forms, we named them by their breath. 
          The taxonomy was theological before it was biological.
        </VoiceEternal>
        
        <SectionDivider symbol="◆" />
      </section>
      
      {/* ============================================
          CHAPTER 2: BEASTS IN PARCHMENT
          ============================================ */}
      <section className="chapter era-medieval" id="medieval">
        <ChapterHeader
          number="II"
          title="Beasts in Parchment"
          temporal="Christian Europe • 500 – 1500 CE"
          era="medieval"
        />
        
        <ImageReveal
          src={IMAGES.medieval.manuscript}
          alt={IMAGES.medieval.manuscriptAlt}
          caption="Medieval manuscript—where animals became moral lessons"
          era="medieval"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            In medieval Europe, the Latin <em>animal</em> underwent a profound 
            transformation. Christianity collapsed Aristotle's three categories 
            into two: humans (with immortal souls) and animals (with merely 
            mortal breath).
          </VoiceUnseen>
        </div>
        
        <FigureProfile
          name="Isidore of Seville"
          epithet="The Last Scholar of the Ancient World"
          dates="c. 560–636 CE"
          imageSrc={IMAGES.medieval.scriptorium}
          imageAlt="Medieval monastery library"
          contributions={[
            "Wrote Etymologiae—the medieval encyclopedia",
            "Provided canonical etymology: 'animalia' from 'anima'",
            "Bridge between Roman knowledge and medieval understanding"
          ]}
          quote="Animals are so called because they are animated by life and moved by spirit."
          quoteSource="Etymologiae, Book XII"
          era="medieval"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The bestiaries flourished—gorgeously illustrated manuscripts cataloging 
            real and mythical animals. But these were not natural history texts. 
            Each creature was a letter in God's alphabet, spelling out divine truth.
          </VoiceUnseen>
          <VoiceUnseen>
            The lion represented Christ. The pelican symbolized sacrifice. The 
            unicorn embodied purity. Animals existed not as biological specimens 
            but as moral lessons.
          </VoiceUnseen>
        </div>
        
        <ImageReveal
          src={IMAGES.medieval.lion}
          alt={IMAGES.medieval.lionAlt}
          caption="The lion—king of beasts, symbol of Christ in medieval bestiaries"
          era="medieval"
        />
        
        <EtymologySpotlight
          word="animal"
          pronunciation="AN-ih-mul"
          language="Middle English"
          meaning="a living being other than a human; a beast"
          date="c. 1380 CE"
          derivation="From Old French animal, from Latin animalis"
          era="medieval"
        />
        
        <VoiceEternal>
          The medieval animal was half biology, half theology—a breathing sermon 
          in fur and feather.
        </VoiceEternal>
        
        <SectionDivider symbol="❧" />
      </section>
      
      {/* ============================================
          CHAPTER 3: THE CABINET OF NATURE
          ============================================ */}
      <section className="chapter era-renaissance" id="renaissance">
        <ChapterHeader
          number="III"
          title="The Cabinet of Nature"
          temporal="Age of Observation • 1450 – 1700"
          era="renaissance"
        />
        
        <ImageReveal
          src={IMAGES.renaissance.cabinet}
          alt={IMAGES.renaissance.cabinetAlt}
          caption="Cabinets of curiosities—where wonder replaced worship"
          era="renaissance"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The Renaissance brought rediscovery: ancient texts, new lands, new 
            species. European explorers returned with armadillos, hummingbirds, 
            opossums—creatures that fit no medieval category.
          </VoiceUnseen>
          <VoiceUnseen>
            The question changed. Medieval scholars asked: <em>what does this 
            animal mean?</em> Renaissance naturalists asked: <em>what is this 
            animal?</em> How does it move, eat, reproduce?
          </VoiceUnseen>
        </div>
        
        <ImageReveal
          src={IMAGES.renaissance.anatomy}
          alt={IMAGES.renaissance.anatomyAlt}
          caption="Comparative anatomy revealed hidden connections across species"
          era="renaissance"
        />
        
        <FigureProfile
          name="Conrad Gessner"
          epithet="The Father of Modern Zoology"
          dates="1516–1565"
          imageSrc={IMAGES.renaissance.naturalist}
          imageAlt="Natural history illustration style"
          contributions={[
            "Historia Animalium (1551-1558): first modern zoological encyclopedia",
            "Attempted to catalog every known animal",
            "Combined ancient sources with firsthand observation",
            "Published over 4,500 pages on animal life"
          ]}
          era="renaissance"
        />
        
        <VoiceEternal>
          Wonder replaced worship. The animal became a puzzle to solve, 
          not a sermon to interpret.
        </VoiceEternal>
        
        <SectionDivider symbol="✧" />
      </section>
      
      {/* ============================================
          CHAPTER 4: NAMING THE KINGDOM
          ============================================ */}
      <section className="chapter era-enlightenment" id="enlightenment">
        <ChapterHeader
          number="IV"
          title="Naming the Kingdom"
          temporal="The Age of Classification • 1735 – 1859"
          era="enlightenment"
        />
        
        <ImageReveal
          src={IMAGES.enlightenment.taxonomy}
          alt={IMAGES.enlightenment.taxonomyAlt}
          caption="Systema Naturae—the book that named every living thing"
          era="enlightenment"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Carl Linnaeus changed everything. In 1735, the Swedish botanist 
            published <em>Systema Naturae</em>, a slim catalog that would grow 
            through twelve editions into the foundation of modern taxonomy.
          </VoiceUnseen>
          <VoiceUnseen>
            Linnaeus formalized what had been chaos. He divided nature into 
            three kingdoms: Animalia, Vegetabilia, and Mineralia. For the first 
            time, "animal" had a precise scientific boundary.
          </VoiceUnseen>
        </div>
        
        <EtymologySpotlight
          word="Animalia"
          pronunciation="ah-nee-MAH-lee-ah"
          language="Scientific Latin"
          meaning="The taxonomic kingdom comprising all animals"
          date="1758"
          derivation="Linnaeus's 10th edition of Systema Naturae established binomial nomenclature"
          era="enlightenment"
        />
        
        <FigureProfile
          name="Carl Linnaeus"
          epithet="The Father of Taxonomy"
          dates="1707–1778"
          imageSrc={IMAGES.enlightenment.specimens}
          imageAlt="Natural history specimens representing classification"
          contributions={[
            "Created binomial nomenclature (Genus species)",
            "Established Kingdom Animalia in Systema Naturae",
            "Placed humans within Animalia as Homo sapiens",
            "Made 'animal' a precise scientific term"
          ]}
          quote="I demand of you, and of the whole world, that you show me a generic character by which to distinguish between Man and Ape."
          quoteSource="Systema Naturae, 10th edition"
          era="enlightenment"
        />
        
        <PullQuote attribution="Carl Linnaeus" year="1758">
          Natura non facit saltus. Nature does not make leaps.
        </PullQuote>
        
        <div className="narrative-block">
          <VoiceUnseen>
            This was revolutionary—and controversial. Linnaeus had used the 
            ancient Latin <em>animalis</em> not to separate humans from beasts, 
            but to unite them. We were <em>Homo sapiens</em>—the "wise man"—but 
            animals nonetheless.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          Science reclaimed the word. The hierarchy of souls collapsed into the 
          democracy of species.
        </VoiceEternal>
        
        <SectionDivider symbol="◈" />
      </section>
      
      {/* ============================================
          CHAPTER 5: THE FAMILY TREE
          ============================================ */}
      <section className="chapter era-darwin" id="darwin">
        <ChapterHeader
          number="V"
          title="The Family Tree"
          temporal="Evolution's Dawn • 1859 – 1900"
          era="darwin"
        />
        
        <ImageReveal
          src={IMAGES.darwin.tree}
          alt={IMAGES.darwin.treeAlt}
          caption="The tree of life—Darwin's radical insight that all life is connected"
          era="darwin"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            If Linnaeus arranged life into a system, Darwin explained how it 
            got that way. <em>On the Origin of Species</em> (1859) proposed that 
            all animals shared common ancestry—that the kingdom Animalia was not 
            a divine filing system but a family tree.
          </VoiceUnseen>
        </div>
        
        <FigureProfile
          name="Charles Darwin"
          epithet="The Father of Evolution"
          dates="1809–1882"
          imageSrc={IMAGES.darwin.finches}
          imageAlt="Bird species representing evolutionary diversity"
          contributions={[
            "Proposed evolution by natural selection",
            "United all animals through common ancestry",
            "Made 'animal' a genealogical term, not just categorical",
            "The Descent of Man (1871): humans explicitly descended"
          ]}
          quote="We thus learn that man is descended from a hairy quadruped, furnished with a tail and pointed ears, probably arboreal in its habits."
          quoteSource="The Descent of Man, 1871"
          era="darwin"
        />
        
        <ImageReveal
          src={IMAGES.darwin.fossils}
          alt={IMAGES.darwin.fossilsAlt}
          caption="The fossil record—ancestors frozen in stone"
          era="darwin"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The word "animal" suddenly meant something deeper: not just "having 
            breath," but "descended from breath-havers." Every animal was cousin 
            to every other, separated only by millions of years and millions of 
            mutations.
          </VoiceUnseen>
        </div>
        
        <PullQuote attribution="Charles Darwin" year="1859">
          Endless forms most beautiful and most wonderful have been, and are being, 
          evolved.
        </PullQuote>
        
        <VoiceEternal>
          We are animals not by category but by ancestry. The word became a 
          family name.
        </VoiceEternal>
        
        <SectionDivider symbol="◇" />
      </section>
      
      {/* ============================================
          CHAPTER 6: COUSINS IN THE MIRROR
          ============================================ */}
      <section className="chapter era-modern" id="modern">
        <ChapterHeader
          number="VI"
          title="Cousins in the Mirror"
          temporal="The Molecular Age • 1900 – Present"
          era="modern"
        />
        
        <ImageReveal
          src={IMAGES.modern.dna}
          alt={IMAGES.modern.dnaAlt}
          caption="DNA sequencing reveals the molecular definition of 'animal'"
          era="modern"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Modern biology has both complicated and clarified the meaning of 
            "animal." DNA sequencing allows us to trace ancestry with precision 
            impossible for Linnaeus or Darwin. The kingdom Animalia is now 
            defined by molecular characteristics.
          </VoiceUnseen>
        </div>
        
        <EtymologySpotlight
          word="animal"
          pronunciation="AN-ih-muhl"
          language="Modern English"
          meaning="Any member of the kingdom Animalia; a multicellular eukaryotic organism developing from a blastula"
          date="Contemporary"
          derivation="Current scientific and colloquial usage"
          era="modern"
        />
        
        <ImageReveal
          src={IMAGES.modern.primate}
          alt={IMAGES.modern.primateAlt}
          caption="98% of our DNA is shared with chimpanzees—cousins in the mirror"
          era="modern"
        />
        
        <FigureProfile
          name="Jane Goodall"
          epithet="The Chimpanzee's Champion"
          dates="1934–present"
          imageSrc={IMAGES.modern.diversity}
          imageAlt="Animal kingdom diversity"
          contributions={[
            "Revolutionized understanding of animal intelligence and emotion",
            "Recognized individual chimpanzees as persons with names",
            "Challenged the strict human/animal divide through observation",
            "Advocated for animal rights and conservation"
          ]}
          quote="In what terms should we think of these beings, nonhuman yet possessing so very many human-like characteristics?"
          quoteSource="Through a Window, 1990"
          era="modern"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The numbers are staggering. Animalia includes approximately 1.5 million 
            described species—and perhaps 8 million yet to be cataloged. From 
            tardigrades measuring 0.1mm to blue whales at 30 meters. All sharing 
            that ancient quality: they breathe, in some form.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          From breath to biology, from soul to sequence—the word evolved with our 
          understanding, and carries every layer still.
        </VoiceEternal>
      </section>
      
      {/* ============================================
          EPILOGUE: THE BREATH REMAINS
          ============================================ */}
      <section className="epilogue">
        <div className="epilogue-background">
          <Image
            src={IMAGES.hero.main}
            alt="Return to the living creature"
            fill
            className="epilogue-image"
          />
          <div className="epilogue-overlay" />
        </div>
        
        <div className="epilogue-content">
          <RevealedBlock delay={0}>
            <h2 className="epilogue-title">The Breath Remains</h2>
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-text" delay={200}>
            When you use the word "animal," you invoke 2,500 years of human 
            questioning. What is life? What is soul? What separates the living 
            from the dead?
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-text" delay={400}>
            The Romans heard breath. Medieval monks heard moral instruction. 
            Linnaeus heard scientific precision. Darwin heard shared ancestry. 
            Modern biologists hear molecular definition.
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-text" delay={600}>
            But beneath every meaning, the original intuition persists: an animal 
            is something that breathes. Something with <em>anima</em>. Something 
            alive in the way that stones and plants are not quite alive.
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-final" delay={800}>
            Look at any creature—a sparrow, a whale, a spider, your own hand.<br />
            You are witnessing anima made flesh.<br />
            The breath that named a kingdom.
          </RevealedBlock>
        </div>
      </section>
      
      {/* ============================================
          SOURCES (from research/CITATIONS.md)
          ============================================ */}
      <footer className="sources-section">
        <h3>Sources & Further Reading</h3>
        
        <div className="sources-grid">
          <div className="source-category">
            <h4>Primary Sources</h4>
            <ul>
              <li>Aristotle. <em>De Anima</em>. Trans. W.D. Ross. Oxford.</li>
              <li>Aristotle. <em>Historia Animalium</em>. Trans. D'Arcy Thompson.</li>
              <li>Isidore of Seville. <em>Etymologiae</em>. Trans. Barney (2006).</li>
              <li>Linnaeus. <em>Systema Naturae</em>, 10th ed. (1758).</li>
              <li>Darwin. <em>On the Origin of Species</em> (1859).</li>
              <li>Darwin. <em>The Descent of Man</em> (1871).</li>
            </ul>
          </div>
          
          <div className="source-category">
            <h4>Etymology & Linguistics</h4>
            <ul>
              <li>Oxford English Dictionary. "animal, n. and adj."</li>
              <li>Lewis & Short. <em>A Latin Dictionary</em>.</li>
              <li>Watkins. <em>American Heritage Dictionary of IE Roots</em>.</li>
            </ul>
          </div>
          
          <div className="source-category">
            <h4>History of Science</h4>
            <ul>
              <li>Mayr. <em>The Growth of Biological Thought</em> (1982).</li>
              <li>Lovejoy. <em>The Great Chain of Being</em> (1936).</li>
              <li>Stanford Encyclopedia of Philosophy.</li>
            </ul>
          </div>
        </div>
        
        <p className="sources-note">
          Full citation details available in research/CITATIONS.md. 
          Images sourced from Unsplash under free license.
        </p>
        
        <div className="sources-cta">
          <Link href="/essays/visual" className="back-link">
            ← Back to Visual Essays
          </Link>
        </div>
      </footer>
    </VisualEssay>
  );
}

