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

// ==================== COMPONENTS ====================

// Typography Progress Bar - The word morphs through eras
const TypographyProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const eras = [
    { name: "Medieval", type: "blackletter", range: [0, 20] },
    { name: "Renaissance", type: "renaissance", range: [20, 40] },
    { name: "Georgian", type: "georgian", range: [40, 60] },
    { name: "Victorian", type: "victorian", range: [60, 80] },
    { name: "Modern", type: "modern", range: [80, 100] }
  ];
  
  const getCurrentEra = () => {
    for (const era of eras) {
      if (progress >= era.range[0] && progress < era.range[1]) {
        return era;
      }
    }
    return eras[eras.length - 1];
  };
  
  const currentEra = getCurrentEra();

  return (
    <div className="typography-progress-bar">
      <div className="progress-word-container">
        <span className={`progress-word era-${currentEra.type}`}>
          PUSSY
        </span>
      </div>
      <div className="progress-era-name">{currentEra.name}</div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
        {eras.map((era, i) => (
          <span 
            key={i} 
            className={`progress-marker ${progress >= era.range[0] ? 'active' : ''}`}
            style={{ left: `${era.range[0]}%` }}
          />
        ))}
      </div>
      <span className="progress-percentage">{Math.round(progress)}%</span>
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

      {/* ==================== HERO SECTION ==================== */}
      <section className="etymology-hero">
        <div className="hero-background">
          <div className="hero-paper-texture" />
        </div>
        <div className="hero-content">
          <div className="hero-question">
            <span>How did a word for cats...</span>
          </div>
          
          <div className="hero-word-evolution">
            <div className="word-era era-blackletter">
              <span className="era-word">PUSSY</span>
              <span className="era-label">Medieval</span>
            </div>
            <div className="word-era era-renaissance">
              <span className="era-word">PUSSY</span>
              <span className="era-label">1530s</span>
            </div>
            <div className="word-era era-georgian">
              <span className="era-word">PUSSY</span>
              <span className="era-label">1755</span>
            </div>
            <div className="word-era era-victorian">
              <span className="era-word">PUSSY</span>
              <span className="era-label">Victorian</span>
            </div>
            <div className="word-era era-modern">
              <span className="era-word">P***Y</span>
              <span className="era-label">Modern</span>
            </div>
          </div>
          
          <div className="hero-question-end">
            <span>...become one of the most controversial words in English?</span>
          </div>
          
          <h1 className="hero-title">
            <span className="hero-title-main">Words Have Histories</span>
            <span className="hero-title-sub">The Curious Journey of <em>&ldquo;Pussy&rdquo;</em></span>
          </h1>
          
          <p className="hero-tagline">
            From Germanic pet-names for cats to modern taboo—a 500-year etymological odyssey through affection, metaphor, and the euphemism treadmill
          </p>
          
          <div className="hero-meta">
            <div className="meta-item">
              <span className="meta-value">500</span>
              <span className="meta-label">Years of Evolution</span>
            </div>
            <div className="meta-item">
              <span className="meta-value">3</span>
              <span className="meta-label">Meaning Branches</span>
            </div>
            <div className="meta-item">
              <span className="meta-value">5</span>
              <span className="meta-label">Typeface Eras</span>
            </div>
          </div>
          
          <div className="hero-scroll-cue">
            <span>Scroll to explore the etymology</span>
            <div className="scroll-arrow" />
          </div>
        </div>
      </section>

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

        <QuoteMonument
          quote="The word pussie is now used of a woman."
          attribution="Philip Stubbes, The Anatomie of Abuses, 1583"
          era="renaissance"
        />

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

        <div className="dictionary-absence">
          <div className="dictionary-page">
            <div className="dictionary-entry">
              <span className="entry-word">PUSS</span>
              <span className="entry-definition">n.s. [A fondling name for a cat.]</span>
            </div>
            <div className="dictionary-entry absent">
              <span className="entry-word">PUSSY</span>
              <span className="entry-definition">— NOT INCLUDED —</span>
            </div>
            <div className="dictionary-entry">
              <span className="entry-word">PUSTULE</span>
              <span className="entry-definition">n.s. [pustule, Fr.] A small swelling...</span>
            </div>
          </div>
          <p className="dictionary-note">
            Johnson&apos;s 1755 Dictionary: &ldquo;puss&rdquo; appears, but &ldquo;pussy&rdquo; is absent
          </p>
        </div>

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


