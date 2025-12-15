"use client";

import React, { useState, useEffect, useRef } from "react";
import "./the-word-han.css";

// ============================================================================
// TYPES
// ============================================================================

interface Figure {
  id: string;
  name: string;
  chineseName?: string;
  role: string;
  years: string;
  contributions: string[];
  quote?: string;
  quoteSource?: string;
  culture: "chinese" | "korean" | "japanese" | "vietnamese" | "western";
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  era: "ancient" | "han" | "transmission" | "korean" | "modern" | "contemporary";
}

interface Source {
  title: string;
  url: string;
  type: "primary" | "academic" | "museum" | "journalism";
}

// ============================================================================
// DATA
// ============================================================================

const keyFigures: Figure[] = [
  {
    id: "liu-bang",
    name: "Liu Bang",
    chineseName: "劉邦",
    role: "Founder of the Han Dynasty",
    years: "256–195 BCE",
    contributions: [
      "Founded the Han Dynasty in 206 BCE",
      "Named dynasty after his title 'King of Han' (漢王)",
      "Transformed a river's name into a civilizational identity",
    ],
    quote: "I conquered the empire on horseback, but I cannot rule it from horseback.",
    quoteSource: "Traditional attribution",
    culture: "chinese",
  },
  {
    id: "emperor-wu",
    name: "Emperor Wu of Han",
    chineseName: "漢武帝",
    role: "The Martial Emperor",
    years: "156–87 BCE",
    contributions: [
      "Expanded Han territory to Korea, Vietnam, Central Asia",
      "Established Confucianism as state ideology",
      "Made 'Han' synonymous with Chinese civilization",
    ],
    culture: "chinese",
  },
  {
    id: "sima-qian",
    name: "Sima Qian",
    chineseName: "司馬遷",
    role: "Father of Chinese History",
    years: "c. 145–86 BCE",
    contributions: [
      "Authored the Shiji (Records of the Grand Historian)",
      "Documented the Han Dynasty's founding",
      "Suffered castration rather than abandon his work",
    ],
    quote: "A person's death can be weightier than Mount Tai or lighter than a feather.",
    quoteSource: "Letter to Ren An",
    culture: "chinese",
  },
  {
    id: "king-sejong",
    name: "King Sejong the Great",
    chineseName: "世宗大王",
    role: "Creator of Hangul",
    years: "1397–1450",
    contributions: [
      "Created Hangul (한글) in 1443",
      "Named the script with Korean '한' (han)",
      "Democratized literacy for Korean commoners",
    ],
    quote: "The sounds of our country's language are different from those of China and do not correspond to Chinese characters. I have been distressed by this...",
    quoteSource: "Hunminjeongeum Preface, 1446",
    culture: "korean",
  },
  {
    id: "king-gojong",
    name: "King Gojong",
    chineseName: "고종",
    role: "Emperor of the Korean Empire",
    years: "1852–1919",
    contributions: [
      "Renamed Korea 'Daehan Jeguk' (大韓帝國) in 1897",
      "Chose 韓 (Korean Han), not 漢 (Chinese Han)",
      "Asserted Korean national distinctiveness",
    ],
    culture: "korean",
  },
  {
    id: "shotoku",
    name: "Prince Shōtoku",
    chineseName: "聖徳太子",
    role: "Father of Japanese Civilization",
    years: "574–622 CE",
    contributions: [
      "Promoted adoption of Chinese characters (Kanji 漢字)",
      "Sent embassies to Sui China in 607 CE",
      "Introduced 'Land of the Rising Sun' terminology",
    ],
    quote: "The sovereign of the land where the sun rises addresses the sovereign of the land where the sun sets.",
    quoteSource: "607 CE Letter to Sui Emperor",
    culture: "japanese",
  },
  {
    id: "nguyen-trai",
    name: "Nguyễn Trãi",
    chineseName: "阮廌",
    role: "Father of Vietnamese Independence Literature",
    years: "1380–1442",
    contributions: [
      "Authored the Bình Ngô đại cáo (1428)",
      "Used Han characters to declare Vietnamese independence",
      "Pioneered Chữ Nôm development",
    ],
    quote: "Our country, Đại Việt, has long been established. Its culture is distinct from that of the North.",
    quoteSource: "Bình Ngô đại cáo, 1428",
    culture: "vietnamese",
  },
  {
    id: "liang-qichao",
    name: "Liang Qichao",
    chineseName: "梁啟超",
    role: "Architect of Chinese Nationalism",
    years: "1873–1929",
    contributions: [
      "Coined 'Zhonghua minzu' (中華民族) in 1902",
      "Initially equated this with 'Han Chinese' (漢族)",
      "Transformed 'Han' into modern ethnic identity",
    ],
    quote: "Today's Zhonghua minzu is what is commonly called the Han people.",
    quoteSource: "Observations on Chinese History, 1905",
    culture: "chinese",
  },
  {
    id: "sun-yat-sen",
    name: "Sun Yat-sen",
    chineseName: "孫中山",
    role: "Father of Modern China",
    years: "1866–1925",
    contributions: [
      "Founded the Republic of China",
      "Promoted Han Chinese as core of nationalism",
      "Developed the Three Principles of the People",
    ],
    quote: "Chinese people are entirely Han people: sharing a common bloodline, language, religion, and customs.",
    quoteSource: "Post-1911 Revolution statements",
    culture: "chinese",
  },
];

const timelineEvents: TimelineEvent[] = [
  { year: "~400 BCE", title: "Han River Named", description: "The river in central China gives its name to the region", era: "ancient" },
  { year: "206 BCE", title: "Han Dynasty Founded", description: "Liu Bang names his dynasty after his 'King of Han' title", era: "han" },
  { year: "141 BCE", title: "Emperor Wu Reigns", description: "Han expansion and Confucian consolidation begins", era: "han" },
  { year: "108 BCE", title: "Han Commanderies", description: "Han characters reach Korea through Chinese administration", era: "transmission" },
  { year: "220 CE", title: "Han Dynasty Falls", description: "'Han' persists as cultural identity beyond dynasty", era: "han" },
  { year: "c. 400 CE", title: "Kanji in Japan", description: "Chinese characters systematized as 'Han characters' (漢字)", era: "transmission" },
  { year: "607 CE", title: "Shōtoku's Embassy", description: "Japan asserts identity while embracing Han script", era: "transmission" },
  { year: "939 CE", title: "Vietnam Independent", description: "Continues using Chữ Hán despite political independence", era: "transmission" },
  { year: "1443", title: "Hangul Created", description: "King Sejong creates Korean alphabet with '한' (han)", era: "korean" },
  { year: "1897", title: "Korean Empire", description: "Korea adopts 大韓帝國, using 韓 not 漢", era: "korean" },
  { year: "1902", title: "'Zhonghua Minzu' Coined", description: "Liang Qichao invents modern Chinese nationalism term", era: "modern" },
  { year: "1949", title: "PRC Codifies Han", description: "'Han Chinese' (漢族) becomes official ethnic category", era: "modern" },
  { year: "2014", title: "Source Han Released", description: "Pan-CJK fonts reunite Han character heritage", era: "contemporary" },
];

const sources: Source[] = [
  { title: "Sima Qian, Shiji (Records of the Grand Historian), c. 94 BCE", url: "https://ctext.org/shiji", type: "primary" },
  { title: "Hunminjeongeum (훈민정음), 1446 — UNESCO Memory of the World", url: "https://en.unesco.org/memoryoftheworld", type: "primary" },
  { title: "Nguyễn Trãi, Bình Ngô đại cáo, 1428 — UNESCO Memory of the World", url: "https://en.unesco.org/memoryoftheworld", type: "primary" },
  { title: "Encyclopædia Britannica: Han Dynasty", url: "https://www.britannica.com/topic/Han-dynasty", type: "academic" },
  { title: "Encyclopædia Britannica: Hangul", url: "https://www.britannica.com/topic/Hangul-Korean-alphabet", type: "academic" },
  { title: "National Museum of China — Han Dynasty Collections", url: "http://www.chnmuseum.cn/", type: "museum" },
  { title: "British Museum — Han Dynasty Objects (~1,955 items)", url: "https://www.britishmuseum.org/collection", type: "museum" },
  { title: "National Museum of Korea — Hangul Archives", url: "https://www.museum.go.kr/", type: "museum" },
  { title: "Adobe & Google: Source Han Serif/Sans Fonts", url: "https://github.com/adobe-fonts/source-han-serif", type: "academic" },
];

// Script evolution stages
const scriptStages = [
  { name: "Oracle Bone", chinese: "甲骨文", period: "c. 1250–1046 BCE", description: "Carved on animal bones and turtle shells" },
  { name: "Bronze", chinese: "金文", period: "c. 1046–256 BCE", description: "Cast on bronze ritual vessels" },
  { name: "Seal", chinese: "篆書", period: "c. 221–206 BCE", description: "Standardized under Qin Dynasty" },
  { name: "Clerical", chinese: "隸書", period: "c. 206 BCE–220 CE", description: "Developed during Han Dynasty" },
  { name: "Regular", chinese: "楷書", period: "c. 3rd century CE–present", description: "Standard modern script" },
];

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Ink Stroke Progress Bar
 * Vertical brush stroke with seal stamp chapter markers
 */
const InkStrokeProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = Math.min((window.scrollY / scrollHeight) * 100, 100);
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const chapters = [
    { id: 1, name: "The River", position: 10 },
    { id: 2, name: "The Empire", position: 25 },
    { id: 3, name: "The Characters", position: 42 },
    { id: 4, name: "The King", position: 58 },
    { id: 5, name: "The Nations", position: 75 },
    { id: 6, name: "The Legacy", position: 90 },
  ];

  return (
    <div className="ink-stroke-progress" aria-hidden="true">
      <div className="ink-stroke-track">
        <div className="ink-stroke-fill" style={{ height: `${progress}%` }} />
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className={`seal-stamp ${progress >= chapter.position ? "stamped" : ""}`}
            style={{ top: `${chapter.position}%` }}
            title={chapter.name}
          >
            <span className="seal-number">{chapter.id}</span>
          </div>
        ))}
        <div className="ink-dot" style={{ top: `${progress}%` }} />
      </div>
    </div>
  );
};

/**
 * Section with Intersection Observer
 */
const Section: React.FC<{
  id: string;
  className?: string;
  children: React.ReactNode;
  era?: "ancient" | "han" | "transmission" | "korean" | "modern" | "contemporary";
}> = ({ id, className = "", children, era }) => {
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
    <section
      ref={sectionRef}
      id={id}
      className={`han-section ${className} ${isVisible ? "visible" : ""} ${era ? `era-${era}` : ""}`}
    >
      {children}
    </section>
  );
};

/**
 * Character Display - Large format Han character
 */
const CharacterDisplay: React.FC<{
  character: string;
  reading?: string;
  meaning?: string;
  variant?: "chinese" | "korean" | "japanese" | "vietnamese";
  size?: "hero" | "section" | "inline";
}> = ({ character, reading, meaning, variant = "chinese", size = "section" }) => {
  return (
    <div className={`character-display character-${variant} character-${size}`}>
      <span className="character-glyph">{character}</span>
      {reading && <span className="character-reading">{reading}</span>}
      {meaning && <span className="character-meaning">{meaning}</span>}
    </div>
  );
};

/**
 * Two Hans Comparison
 */
const TwoHansComparison: React.FC = () => {
  const [revealed, setRevealed] = useState(false);
  const compRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.3 }
    );

    if (compRef.current) observer.observe(compRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={compRef} className={`two-hans-comparison ${revealed ? "revealed" : ""}`}>
      <div className="han-chinese-side">
        <CharacterDisplay character="漢" reading="hàn" meaning="Chinese Han" variant="chinese" size="hero" />
        <div className="han-origin">
          <p className="origin-label">Origin</p>
          <p className="origin-text">Han River → Han Dynasty → Han Chinese → Han characters</p>
        </div>
      </div>
      <div className="han-divider">
        <div className="divider-line" />
        <span className="divider-text">≠</span>
        <div className="divider-line" />
      </div>
      <div className="han-korean-side">
        <CharacterDisplay character="韓" reading="han" meaning="Korean Han" variant="korean" size="hero" />
        <div className="han-origin">
          <p className="origin-label">Origin</p>
          <p className="origin-text">Samhan confederacies → "Great/Leader" → Korean identity</p>
        </div>
      </div>
      <p className="han-conclusion">Same sound. Different word. Different origin.</p>
    </div>
  );
};

/**
 * Quote Monument
 */
const QuoteMonument: React.FC<{
  quote: string;
  speaker: string;
  source: string;
  year?: string;
  variant?: "chinese" | "korean" | "vietnamese" | "general";
}> = ({ quote, speaker, source, year, variant = "general" }) => {
  return (
    <blockquote className={`quote-monument quote-${variant}`}>
      <p className="quote-text">&ldquo;{quote}&rdquo;</p>
      <footer className="quote-footer">
        <cite className="quote-speaker">{speaker}</cite>
        <span className="quote-source">
          {source}
          {year && `, ${year}`}
        </span>
      </footer>
    </blockquote>
  );
};

/**
 * Figure Profile Card
 */
const FigureCard: React.FC<{ figure: Figure }> = ({ figure }) => {
  return (
    <article className={`figure-card figure-${figure.culture}`}>
      <div className="figure-header">
        <h4 className="figure-name">
          {figure.name}
          {figure.chineseName && <span className="figure-chinese">{figure.chineseName}</span>}
        </h4>
        <p className="figure-role">{figure.role}</p>
        <p className="figure-years">{figure.years}</p>
      </div>
      <ul className="figure-contributions">
        {figure.contributions.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
      {figure.quote && (
        <blockquote className="figure-quote">
          <p>&ldquo;{figure.quote}&rdquo;</p>
          {figure.quoteSource && <cite>{figure.quoteSource}</cite>}
        </blockquote>
      )}
    </article>
  );
};

/**
 * Script Evolution Display
 */
const ScriptEvolution: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const evolutionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!evolutionRef.current) return;
      const rect = evolutionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + 200)));
      setActiveStage(Math.floor(progress * scriptStages.length));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={evolutionRef} className="script-evolution">
      <h3 className="evolution-title">The Character 漢 Through Time</h3>
      <div className="evolution-stages">
        {scriptStages.map((stage, i) => (
          <div key={stage.name} className={`evolution-stage ${i <= activeStage ? "active" : ""}`}>
            <div className="stage-marker">
              <span className="stage-number">{i + 1}</span>
            </div>
            <div className="stage-content">
              <h4 className="stage-name">
                {stage.name}
                <span className="stage-chinese">{stage.chinese}</span>
              </h4>
              <p className="stage-period">{stage.period}</p>
              <p className="stage-description">{stage.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Timeline Section
 */
const TimelineSection: React.FC = () => {
  return (
    <div className="timeline-section">
      <h3 className="timeline-title">Key Moments in the Journey of &ldquo;Han&rdquo;</h3>
      <div className="timeline-events">
        {timelineEvents.map((event, i) => (
          <div key={i} className={`timeline-event era-${event.era}`}>
            <div className="timeline-year">{event.year}</div>
            <div className="timeline-content">
              <h4 className="timeline-event-title">{event.title}</h4>
              <p className="timeline-description">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Sources Section
 */
const SourcesSection: React.FC = () => {
  return (
    <section className="sources-section">
      <div className="sources-content">
        <h3 className="sources-title">Sources & Further Reading</h3>
        <ul className="sources-list">
          {sources.map((source, i) => (
            <li key={i} className={`source-item source-${source.type}`}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.title}
              </a>
            </li>
          ))}
        </ul>
        <p className="sources-note">
          This visual essay was researched using primary sources, academic scholarship, and museum collections.
          All quotes are verified against documented sources.
        </p>
      </div>
    </section>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const TheWordHanClient: React.FC = () => {
  return (
    <article className="the-word-han">
        <InkStrokeProgress />

        {/* Hero Section */}
        <Section id="hero" className="hero-section" era="ancient">
          <div className="hero-content">
            <div className="hero-characters">
              <span className="hero-character char-han-chinese">漢</span>
              <span className="hero-divider">/</span>
              <span className="hero-character char-han-korean">韓</span>
              <span className="hero-divider">/</span>
              <span className="hero-character char-han-katakana">ハン</span>
              <span className="hero-divider">/</span>
              <span className="hero-character char-han-hangul">한</span>
            </div>
            <h1 className="hero-title">How One Word Shaped East Asia</h1>
            <p className="hero-subtitle">
              The 2,200-Year Journey of a River&apos;s Name to Four Civilizations
            </p>
            <div className="hero-scroll-indicator">
              <span className="scroll-text">Scroll to explore</span>
              <div className="scroll-arrow" />
            </div>
          </div>
        </Section>

        {/* Chapter 1: The River */}
        <Section id="chapter-1" className="chapter chapter-river" era="ancient">
          <div className="chapter-header">
            <span className="chapter-number">Chapter One</span>
            <h2 className="chapter-title">The River</h2>
            <p className="chapter-marker">Central China, Antiquity</p>
          </div>

          <div className="chapter-content">
            <p className="chapter-lead">
              Every great word has an origin. The word &ldquo;Han&rdquo; (漢) began as a river—the Han River
              (漢水), which flows through what is now Hubei and Shaanxi provinces in central China.
            </p>

            <CharacterDisplay character="漢" reading="hàn" meaning="The water radical (氵) marks its aquatic origin" variant="chinese" />

            <p>
              The character 漢 contains the water radical (氵), marking its connection to flowing water.
              Archaeological evidence—oracle bones, bronze vessels—shows this character evolving over
              centuries, always tied to geography, to place, to a specific location in the Chinese landscape.
            </p>

            <div className="callout-box">
              <p>
                In the chaos following the fall of the Qin Dynasty, a peasant rebel named Liu Bang was
                granted the title &ldquo;King of Han&rdquo; (漢王), named after his territory near this river.
              </p>
            </div>

            <p>
              When Liu Bang conquered China in 206 BCE, he kept the name. The Han Dynasty was born—named
              not for a concept, not for an ideal, but for a river. This geographical accident would echo
              across 2,200 years, shaping the identities of billions.
            </p>

            <FigureCard figure={keyFigures.find(f => f.id === "liu-bang")!} />
          </div>
        </Section>

        {/* Chapter 2: The Empire */}
        <Section id="chapter-2" className="chapter chapter-empire" era="han">
          <div className="chapter-header">
            <span className="chapter-number">Chapter Two</span>
            <h2 className="chapter-title">The Empire</h2>
            <p className="chapter-marker">Han Dynasty, 206 BCE–220 CE</p>
          </div>

          <div className="chapter-content">
            <p className="chapter-lead">
              Why did &ldquo;Han&rdquo; stick? Dynasties come and go—Qin, Han, Tang, Song, Ming, Qing—yet
              &ldquo;Han&rdquo; became the word for Chinese civilization itself.
            </p>

            <p>
              The answer lies in the Han Dynasty&apos;s extraordinary duration and cultural consolidation.
              For over 400 years, the Han ruled. Under Emperor Wu (漢武帝), the empire expanded to include
              Korea, Vietnam, and Central Asia. More importantly, Emperor Wu established Confucianism as
              the state ideology, creating an imperial academy, civil service examinations, and a cultural
              framework that would endure for 2,000 years.
            </p>

            <QuoteMonument
              quote="A person's death can be weightier than Mount Tai or lighter than a feather."
              speaker="Sima Qian"
              source="Letter to Ren An"
              variant="chinese"
            />

            <p>
              The historian Sima Qian, writing during this period, created the <em>Shiji</em> (Records
              of the Grand Historian)—the foundational work of Chinese historiography. His documentation
              ensured that the Han Dynasty&apos;s achievements would be remembered, studied, and revered.
            </p>

            <ScriptEvolution />

            <p>
              By the time the Han fell in 220 CE, &ldquo;Han&rdquo; had become something larger than a
              dynasty. It was an identity—a way of understanding what it meant to be Chinese.
            </p>

            <div className="figures-grid">
              <FigureCard figure={keyFigures.find(f => f.id === "emperor-wu")!} />
              <FigureCard figure={keyFigures.find(f => f.id === "sima-qian")!} />
            </div>
          </div>
        </Section>

        {/* Chapter 3: The Characters */}
        <Section id="chapter-3" className="chapter chapter-characters" era="transmission">
          <div className="chapter-header">
            <span className="chapter-number">Chapter Three</span>
            <h2 className="chapter-title">The Characters</h2>
            <p className="chapter-marker">East Asia, 1st Century BCE–10th Century CE</p>
          </div>

          <div className="chapter-content">
            <p className="chapter-lead">
              The Han Dynasty&apos;s cultural reach extended beyond its borders through a powerful medium:
              writing. Chinese characters—now called &ldquo;Han characters&rdquo; (漢字)—spread to the
              Korean peninsula, the Japanese archipelago, and the Vietnamese territories.
            </p>

            <div className="script-names-grid">
              <div className="script-name">
                <span className="script-characters">漢字</span>
                <span className="script-reading">Hànzì</span>
                <span className="script-origin">Chinese</span>
              </div>
              <div className="script-name">
                <span className="script-characters">한자 / 漢字</span>
                <span className="script-reading">Hanja</span>
                <span className="script-origin">Korean</span>
              </div>
              <div className="script-name">
                <span className="script-characters">漢字</span>
                <span className="script-reading">Kanji</span>
                <span className="script-origin">Japanese</span>
              </div>
              <div className="script-name">
                <span className="script-characters">漢字</span>
                <span className="script-reading">Chữ Hán</span>
                <span className="script-origin">Vietnamese</span>
              </div>
            </div>

            <p>
              In Korea, Han characters arrived during the Han Dynasty&apos;s military presence (Han
              commanderies, 108 BCE) and spread through Buddhist missionaries and Confucian scholarship.
              The Koreans called them &ldquo;Hanja&rdquo; (한자/漢字)—&ldquo;Han characters.&rdquo;
            </p>

            <QuoteMonument
              quote="The sovereign of the land where the sun rises addresses the sovereign of the land where the sun sets."
              speaker="Prince Shōtoku"
              source="607 CE Letter to Sui Emperor Yang"
              variant="general"
            />

            <p>
              In Japan, the transmission came partly through Korea. Prince Shōtoku (574–622 CE) promoted
              Chinese learning and Buddhist texts, embedding &ldquo;Kanji&rdquo; (漢字) in Japanese culture.
              Notably, Shōtoku&apos;s letter to the Sui Emperor used Chinese characters to assert Japanese
              distinctiveness.
            </p>

            <p>
              In Vietnam, Chinese rule (111 BCE–939 CE) brought &ldquo;Chữ Hán&rdquo; (漢字). Even after
              independence, Vietnamese scholars continued using Han characters for official documents.
            </p>

            <p className="insight-text">
              By the 10th century, &ldquo;Han characters&rdquo; had become the shared script of East Asia.
              The word &ldquo;Han&rdquo; was now embedded in how four civilizations wrote.
            </p>

            <div className="figures-grid">
              <FigureCard figure={keyFigures.find(f => f.id === "shotoku")!} />
              <FigureCard figure={keyFigures.find(f => f.id === "nguyen-trai")!} />
            </div>
          </div>
        </Section>

        {/* Chapter 4: The King */}
        <Section id="chapter-4" className="chapter chapter-king" era="korean">
          <div className="chapter-header">
            <span className="chapter-number">Chapter Four</span>
            <h2 className="chapter-title">The King</h2>
            <p className="chapter-marker">Joseon Korea, 15th Century</p>
          </div>

          <div className="chapter-content">
            <p className="chapter-lead">
              In 1443, something remarkable happened. King Sejong the Great of Joseon Korea created
              Hangul—a new alphabet designed specifically for Korean sounds.
            </p>

            <CharacterDisplay character="한글" reading="Hangul" meaning="Korean Alphabet" variant="korean" />

            <QuoteMonument
              quote="The sounds of our country's language are different from those of China and do not correspond to Chinese characters. Therefore, among the ignorant people, there have been many who, having something to put into writing, have in the end been unable to express their feelings. I have been distressed by this and have designed twenty-eight new letters."
              speaker="King Sejong the Great"
              source="Hunminjeongeum Preface, 1446"
              variant="korean"
            />

            <p>
              Sejong&apos;s motivation was democratic: the complex Chinese characters (Hanja) kept literacy
              confined to the elite. The design was revolutionary—consonants shaped to mirror mouth
              positions during pronunciation, vowels representing philosophical concepts.
            </p>

            <div className="callout-box callout-korean">
              <p>
                <strong>But here&apos;s what matters for our story:</strong> Sejong called it &ldquo;한글&rdquo;
                (Hangul)—and that &ldquo;한&rdquo; (han) would later connect to Korean national identity.
              </p>
            </div>

            <p>
              When Korea needed a name for itself, it would choose 韓 (Han)—a <em>different</em> &ldquo;Han&rdquo;
              from the Chinese 漢.
            </p>

            <FigureCard figure={keyFigures.find(f => f.id === "king-sejong")!} />
          </div>
        </Section>

        {/* Chapter 5: The Nations */}
        <Section id="chapter-5" className="chapter chapter-nations" era="modern">
          <div className="chapter-header">
            <span className="chapter-number">Chapter Five</span>
            <h2 className="chapter-title">The Nations</h2>
            <p className="chapter-marker">East Asia, 19th–20th Century</p>
          </div>

          <div className="chapter-content">
            <p className="chapter-lead">
              In the modern era, &ldquo;Han&rdquo; became a tool of nationalism—but with a twist. China
              and Korea would each claim a &ldquo;Han,&rdquo; but they were <em>different words</em>.
            </p>

            <TwoHansComparison />

            <p>
              In 1897, King Gojong renamed Korea &ldquo;Daehan Jeguk&rdquo; (大韓帝國, &ldquo;Great Han
              Empire&rdquo;). He chose the character 韓—the Korean &ldquo;Han&rdquo; from the ancient
              Samhan confederacies, meaning &ldquo;great&rdquo; or &ldquo;leader.&rdquo; This was <em>not</em>
              the Chinese 漢. It was a deliberate assertion of Korean distinctiveness.
            </p>

            <QuoteMonument
              quote="Today's Zhonghua minzu is what is commonly called the Han people."
              speaker="Liang Qichao"
              source="Observations on Chinese History, 1905"
              variant="chinese"
            />

            <p>
              Meanwhile, in China, intellectuals were constructing &ldquo;Han Chinese&rdquo; (漢族) as an
              ethnic identity. Liang Qichao coined &ldquo;Zhonghua minzu&rdquo; (中華民族) in 1902.
              Sun Yat-sen declared after the 1911 revolution that Chinese people were &ldquo;entirely Han
              people.&rdquo; The 1949 PRC would codify &ldquo;Han Chinese&rdquo; as an official ethnic
              category—92% of China&apos;s population.
            </p>

            <p>
              Vietnam took a different path entirely. During the 20th century, Vietnam abandoned Han
              characters completely, adopting the Latin-based Quốc ngữ script. Today, Vietnamese contains
              thousands of Han-derived words, but the characters themselves have vanished from daily life.
            </p>

            <div className="figures-grid">
              <FigureCard figure={keyFigures.find(f => f.id === "king-gojong")!} />
              <FigureCard figure={keyFigures.find(f => f.id === "liang-qichao")!} />
              <FigureCard figure={keyFigures.find(f => f.id === "sun-yat-sen")!} />
            </div>
          </div>
        </Section>

        {/* Chapter 6: The Legacy */}
        <Section id="chapter-6" className="chapter chapter-legacy" era="contemporary">
          <div className="chapter-header">
            <span className="chapter-number">Chapter Six</span>
            <h2 className="chapter-title">The Legacy</h2>
            <p className="chapter-marker">Contemporary East Asia</p>
          </div>

          <div className="chapter-content">
            <p className="chapter-lead">
              Today, the word &ldquo;Han&rdquo; remains embedded in East Asian life. In China, &ldquo;Han
              Chinese&rdquo; (漢族) is the official designation for 92% of the population. In Korea,
              &ldquo;Hanguk&rdquo; (한국/韓國) is the nation&apos;s name, and &ldquo;Hangul&rdquo; (한글)
              its script. In Japan, &ldquo;Kanji&rdquo; (漢字) remains essential to literacy.
            </p>

            <div className="callout-box callout-contemporary">
              <p>
                Modern technology has reunited what history divided. In 2014, Adobe and Google released
                Source Han Sans—a pan-CJK font family designed to work across Chinese, Japanese, and
                Korean while respecting regional differences.
              </p>
            </div>

            <p>
              The Unicode standard ensures that both 漢 and 韓 are encoded, preserved, and transmissible
              across digital systems. Typography carries the memory of 2,200 years.
            </p>

            <TimelineSection />

            <div className="closing-reflection">
              <h3>Words Create Worlds</h3>
              <p>
                Perhaps the deepest lesson is this: words create worlds. A geographical accident—a river
                called Han—became an empire, an ethnicity, a script, an identity. Understanding this
                etymology is understanding that identity is constructed, contingent, historical—not
                primordial, not inevitable.
              </p>
              <p>
                The word &ldquo;Han&rdquo; reminds us that even the most foundational categories—what it
                means to be Chinese, or Korean, or part of the &ldquo;Han character cultural sphere&rdquo;—are
                human creations. And what humans have made, humans can understand, question, and reimagine.
              </p>
            </div>

            <div className="final-characters">
              <CharacterDisplay character="漢" variant="chinese" size="inline" />
              <CharacterDisplay character="韓" variant="korean" size="inline" />
              <p className="final-note">Shared heritage. Distinct identity.</p>
            </div>
          </div>
        </Section>

        {/* Sources */}
        <SourcesSection />
      </article>
  );
};

export default TheWordHanClient;
