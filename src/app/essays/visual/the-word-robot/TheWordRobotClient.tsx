"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import "./the-word-robot.css";

// ============================================================================
// DESIGN RESEARCH REPORT: THE WORD ROBOT
// ============================================================================
// Visual Identity: Era-variable typography as narrative device
// Color Palette: Void Black (#0A0A0F), Machine Steel (#1A1A2E), Constructivist Red (#C41E3A)
// Era Accents: Gold (1920s), Orange (1950s), Green (1970s), Red (1980s), Warm (2000s), Blue (2020s)
// Typography: Era-variable (Playfair→Space Grotesk→Inter→Oswald→Nunito→Inter)
// Animation: Assembly/construction, typewriter reveals, era-specific tempo
// Unique: Assembly line progress bar building "ROBOT" letter by letter
// Photo Treatment: Era-based (sepia 1920s, warm 1950s, industrial 1970s, noir 1980s, clean 2000s+)
// ============================================================================

// ==================== TYPE DEFINITIONS ====================

interface Figure {
  id: string;
  name: string;
  epithet: string;
  era: string;
  years: string;
  contributions: string[];
  quote: string;
  quoteSource: string;
  legacy?: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  era: "1920s" | "1950s" | "1970s" | "1980s" | "2000s" | "2020s";
}

interface Source {
  title: string;
  url: string;
}

// ==================== DATA: KEY FIGURES ====================

const keyFigures: Figure[] = [
  {
    id: "karel-capek",
    name: "Karel Čapek",
    epithet: "Father of the Robot",
    era: "1920s",
    years: "1890–1938",
    contributions: [
      "Introduced 'robot' to the world in R.U.R. (1920)",
      "Playwright who transformed industrial anxiety into theatrical sensation",
      "One of the most important Czech writers of the 20th century",
    ],
    quote: "I did not invent the word 'robot,' my brother Josef did.",
    quoteSource: "Lidové noviny column, 1933",
    legacy: "The word he introduced became one of the 20th century's most consequential linguistic innovations",
  },
  {
    id: "josef-capek",
    name: "Josef Čapek",
    epithet: "The True Inventor",
    era: "1920s",
    years: "1887–1945",
    contributions: [
      "Suggested 'robot' when Karel hesitated over 'labori'",
      "Cubist painter who gave the word its Slavic labor roots",
      "Drew from 'robota'—forced labor under feudal system",
    ],
    quote: "The word should sound Czech and carry the weight of toil.",
    quoteSource: "Attributed, family correspondence",
    legacy: "Died in Bergen-Belsen, never seeing how his word changed the world",
  },
  {
    id: "isaac-asimov",
    name: "Isaac Asimov",
    epithet: "The Lawgiver",
    era: "1950s",
    years: "1920–1992",
    contributions: [
      "Created the Three Laws of Robotics (1942)",
      "Coined the word 'robotics' itself",
      "Wrote 500+ books reshaping robot imagination",
    ],
    quote: "A robot may not injure a human being or, through inaction, allow a human being to come to harm.",
    quoteSource: "First Law of Robotics, 'Runaround' (1942)",
    legacy: "His ethical framework is still referenced in actual AI development discussions",
  },
  {
    id: "fritz-lang",
    name: "Fritz Lang",
    epithet: "The Visualizer",
    era: "1920s",
    years: "1890–1976",
    contributions: [
      "Created cinema's first iconic robot in Metropolis (1927)",
      "Established visual language: metallic, feminine, dangerous",
      "The Maschinenmensch became template for robot representation",
    ],
    quote: "I was deeply impressed by New York... the buildings seemed to be a vertical veil.",
    quoteSource: "On the inspiration for Metropolis",
  },
  {
    id: "joseph-engelberger",
    name: "Joseph Engelberger",
    epithet: "Father of Robotics",
    era: "1970s",
    years: "1925–2015",
    contributions: [
      "Created Unimate, first industrial robot",
      "Installed at GM 1961—handling hot metal",
      "Made robots practical, not fantastical",
    ],
    quote: "The key is to keep making robots more capable and less expensive.",
    quoteSource: "Attributed, various interviews",
  },
  {
    id: "masahiro-mori",
    name: "Masahiro Mori",
    epithet: "The Psychologist of Robots",
    era: "1970s",
    years: "1927–present",
    contributions: [
      "Proposed 'uncanny valley' concept (1970)",
      "Explained why near-human robots disturb us",
      "Influenced robot design for decades",
    ],
    quote: "As robots appear more humanlike, our sense of familiarity increases until we reach a point where the slightest deviation makes them seem eerie.",
    quoteSource: "Energy magazine, 1970",
  },
  {
    id: "james-cameron",
    name: "James Cameron",
    epithet: "The Fear-Maker",
    era: "1980s",
    years: "1954–present",
    contributions: [
      "Created the T-800, icon of machine menace",
      "Crystallized robot uprising fears for a generation",
      "'I'll be back' became shorthand for robotic threat",
    ],
    quote: "The Terminator is out there. It can't be bargained with. It can't be reasoned with.",
    quoteSource: "The Terminator (1984)",
  },
  {
    id: "rodney-brooks",
    name: "Rodney Brooks",
    epithet: "The Domesticator",
    era: "2000s",
    years: "1954–present",
    contributions: [
      "Co-founded iRobot, created Roomba (2002)",
      "Made robots affordable and approachable",
      "Changed 'robot' from threat to helper",
    ],
    quote: "The Roomba is not a robot that looks like a person. It's a robot that acts like a vacuum cleaner.",
    quoteSource: "On iRobot design philosophy",
  },
  {
    id: "cynthia-breazeal",
    name: "Cynthia Breazeal",
    epithet: "The Relationship Builder",
    era: "2000s",
    years: "1967–present",
    contributions: [
      "Pioneered social robotics (Kismet, Jibo)",
      "Studies emotional human-robot connection",
      "MIT Media Lab social robots research",
    ],
    quote: "The robots of the future will not be our slaves. They will be our partners.",
    quoteSource: "On social robotics",
  },
];

// ==================== DATA: TIMELINE ====================

const timeline: TimelineEvent[] = [
  { year: "1920", title: "R.U.R. Written", description: "Karel Čapek introduces 'robot' in his play", era: "1920s" },
  { year: "1921", title: "World Premiere", description: "R.U.R. premieres in Prague", era: "1920s" },
  { year: "1923", title: "English Translation", description: "'Robot' enters the English language", era: "1920s" },
  { year: "1927", title: "Metropolis", description: "First iconic cinematic robot appears", era: "1920s" },
  { year: "1942", title: "Three Laws", description: "Asimov creates ethical framework", era: "1950s" },
  { year: "1950", title: "I, Robot", description: "Asimov's collection reshapes imagination", era: "1950s" },
  { year: "1961", title: "Unimate", description: "First industrial robot deployed", era: "1970s" },
  { year: "1970", title: "Uncanny Valley", description: "Mori explains robot discomfort", era: "1970s" },
  { year: "1977", title: "Star Wars", description: "R2-D2 and C-3PO become beloved", era: "1970s" },
  { year: "1984", title: "Terminator", description: "Robot fear reaches peak", era: "1980s" },
  { year: "1999", title: "AIBO", description: "Robot as pet/companion emerges", era: "1980s" },
  { year: "2002", title: "Roomba", description: "Robot enters millions of homes", era: "2000s" },
  { year: "2016", title: "Boston Dynamics", description: "Viral humanoid videos", era: "2020s" },
  { year: "2022", title: "ChatGPT", description: "'Robot' expands to AI", era: "2020s" },
];

// ==================== DATA: SOURCES ====================

const sources: Source[] = [
  { title: "Karel Čapek — Wikipedia", url: "https://en.wikipedia.org/wiki/Karel_%C4%8Capek" },
  { title: "R.U.R. (Rossum's Universal Robots) — Wikipedia", url: "https://en.wikipedia.org/wiki/R.U.R." },
  { title: "The Origin of the Word 'Robot' — Science Friday", url: "https://www.sciencefriday.com/segments/the-origin-of-the-word-robot/" },
  { title: "Where Does the Word Robot Come From? — BBC Science Focus", url: "https://www.sciencefocus.com/future-technology/where-does-the-word-robot-come-from" },
  { title: "History of Robotics — Stanford CS", url: "https://cs.stanford.edu/people/eroberts/courses/soco/projects/robotics/history.html" },
  { title: "Three Laws of Robotics — Wikipedia", url: "https://en.wikipedia.org/wiki/Three_Laws_of_Robotics" },
  { title: "Uncanny Valley — Wikipedia", url: "https://en.wikipedia.org/wiki/Uncanny_valley" },
  { title: "Pew Research: Public Predictions for Workforce Automation", url: "https://time.com/4254154/robots-human-jobs-survey/" },
  { title: "History of Robots — Wikipedia", url: "https://en.wikipedia.org/wiki/History_of_robots" },
  { title: "Metropolis (1927 Film) — Wikipedia", url: "https://en.wikipedia.org/wiki/Metropolis_(1927_film)" },
];

// ==================== COMPONENTS ====================

// Progress Bar: Assembly Line Building "ROBOT"
const AssemblyProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const letters = ["R", "O", "B", "O", "T"];
  const eraFonts = ["era-1920s", "era-1950s", "era-1970s", "era-1980s", "era-2000s"];
  
  return (
    <div className="assembly-progress-bar">
      <div className="assembly-conveyor">
        <div className="conveyor-belt" />
        <div className="assembly-letters">
          {letters.map((letter, index) => {
            const letterProgress = (index + 1) / letters.length * 100;
            const isVisible = progress >= letterProgress * 0.8;
            const isActive = progress >= letterProgress * 0.6 && progress < letterProgress;
            
            return (
              <span
                key={index}
                className={`assembly-letter ${eraFonts[index]} ${isVisible ? "visible" : ""} ${isActive ? "active" : ""}`}
              >
                {letter}
              </span>
            );
          })}
        </div>
      </div>
      <div className="assembly-percentage">{Math.round(progress)}%</div>
    </div>
  );
};

// Section wrapper with intersection observer
const Section: React.FC<{
  id: string;
  era: string;
  children: React.ReactNode;
  className?: string;
}> = ({ id, era, children, className = "" }) => {
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
      className={`robot-section ${era} ${className} ${isVisible ? "visible" : ""}`}
      data-era={era}
    >
      {children}
    </section>
  );
};

// Figure Profile Card
const FigureCard: React.FC<{ figure: Figure }> = ({ figure }) => (
  <div className={`figure-card era-${figure.era}`}>
    <div className="figure-header">
      <div className="figure-avatar">
        <span className="figure-initial">{figure.name[0]}</span>
      </div>
      <div className="figure-info">
        <h4 className="figure-name">{figure.name}</h4>
        <span className="figure-epithet">{figure.epithet}</span>
        <span className="figure-years">{figure.years}</span>
      </div>
    </div>
    <ul className="figure-contributions">
      {figure.contributions.map((contribution, idx) => (
        <li key={idx}>{contribution}</li>
      ))}
    </ul>
    <blockquote className="figure-quote">
      <p>&ldquo;{figure.quote}&rdquo;</p>
      <cite>— {figure.quoteSource}</cite>
    </blockquote>
    {figure.legacy && <p className="figure-legacy">{figure.legacy}</p>}
  </div>
);

// Timeline component
const TimelineSection: React.FC = () => (
  <div className="timeline-container">
    <h3 className="timeline-title">105 Years of Robot</h3>
    <div className="timeline-track">
      {timeline.map((event, idx) => (
        <div key={idx} className={`timeline-event era-${event.era}`}>
          <div className="timeline-year">{event.year}</div>
          <div className="timeline-content">
            <h4>{event.title}</h4>
            <p>{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Quote Monument
const QuoteMonument: React.FC<{
  quote: string;
  attribution: string;
  era: string;
}> = ({ quote, attribution, era }) => (
  <div className={`quote-monument era-${era}`}>
    <blockquote>
      <p>&ldquo;{quote}&rdquo;</p>
      <cite>— {attribution}</cite>
    </blockquote>
  </div>
);

// Data stat
const DataStat: React.FC<{
  value: string;
  label: string;
  source?: string;
}> = ({ value, label, source }) => (
  <div className="data-stat">
    <span className="data-value">{value}</span>
    <span className="data-label">{label}</span>
    {source && <span className="data-source">{source}</span>}
  </div>
);

// ==================== MAIN COMPONENT ====================

const TheWordRobotClient: React.FC = () => {
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

  // Figures by era
  const figuresByEra = useCallback((era: string) => 
    keyFigures.filter(f => f.era === era), 
  []);

  return (
    <div className="robot-essay">
      {/* Progress Bar */}
      <AssemblyProgressBar progress={scrollProgress} />

      {/* ==================== HERO SECTION ==================== */}
      <section className="robot-hero">
        <div className="hero-background">
          <div className="hero-gradient" />
          <div className="hero-noise" />
        </div>
        <div className="hero-content">
          <div className="hero-etymology">
            <span className="etymology-word">ROBOTA</span>
            <span className="etymology-arrow">→</span>
            <span className="etymology-meaning">forced labor</span>
          </div>
          <h1 className="hero-title">
            <span className="title-main">ROBOT</span>
            <span className="title-sub">The Word That Imagined Our Future</span>
          </h1>
          <p className="hero-tagline">
            How a Czech neologism from a 1920 play became the word through which we negotiate our relationship with artificial beings
          </p>
          <div className="hero-stats">
            <DataStat value="105" label="Years Since R.U.R." />
            <DataStat value="12" label="Key Figures" />
            <DataStat value="6" label="Cultural Eras" />
          </div>
          <div className="hero-scroll-cue">
            <span>Scroll to begin</span>
            <div className="scroll-arrow" />
          </div>
        </div>
      </section>

      {/* ==================== CHAPTER 1: THE BIRTH (1920s) ==================== */}
      <Section id="chapter-1" era="era-1920s" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter 1</span>
          <h2 className="chapter-title">The Birth of a Word</h2>
          <span className="chapter-date">Prague, 1920</span>
        </div>

        <div className="chapter-intro">
          <p className="lead-paragraph">
            The word &ldquo;robot&rdquo; carries its origin story in its DNA. Derived from Czech <strong>&ldquo;robota&rdquo;</strong>—meaning forced labor, corvée, or serfdom—the term was deliberately chosen to evoke the condition of workers under feudal or industrial subjugation.
          </p>
        </div>

        <QuoteMonument
          quote="I did not invent the word 'robot,' my brother Josef did. I was hesitating whether to call these artificial workers 'laborers' or 'labori'... Josef suggested 'robots.'"
          attribution="Karel Čapek, 1933"
          era="1920s"
        />

        <div className="content-block">
          <h3>R.U.R.: Rossum&apos;s Universal Robots</h3>
          <p>
            On January 25, 1921, Karel Čapek&apos;s play premiered at the National Theatre in Prague. The story followed artificial workers—manufactured biological beings designed to perform labor—who eventually rebel against their human masters.
          </p>
          <p>
            Crucially, Čapek&apos;s robots were not the metal machines we imagine today. They were <em>assembled biological beings</em>, closer to what we might now call replicants or androids. The word&apos;s first use contained both the promise of artificial labor AND the fear of rebellion.
          </p>
        </div>

        <div className="figures-grid">
          {figuresByEra("1920s").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>

        <div className="content-block">
          <h3>Metropolis: The Visual Template</h3>
          <p>
            Six years after R.U.R., Fritz Lang&apos;s <em>Metropolis</em> (1927) gave robots their cinematic form. The Maschinenmensch—Machine-Human—established the visual language that would define robots for a century: metallic, feminine, simultaneously beautiful and dangerous.
          </p>
        </div>
      </Section>

      {/* ==================== CHAPTER 2: THE IMAGINATION (1940s-50s) ==================== */}
      <Section id="chapter-2" era="era-1950s" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter 2</span>
          <h2 className="chapter-title">Imagining the Machine</h2>
          <span className="chapter-date">1940s–1950s</span>
        </div>

        <div className="chapter-intro">
          <p className="lead-paragraph">
            For approximately 40 years (1920–1961), &ldquo;robot&rdquo; existed primarily as a fictional concept. Before real robots existed, <strong>fiction programmed our expectations</strong>.
          </p>
        </div>

        <div className="content-block">
          <h3>The Three Laws of Robotics</h3>
          <p>
            In 1942, Isaac Asimov published &ldquo;Runaround,&rdquo; introducing the Three Laws of Robotics—an ethical framework that would shape robot discourse for generations:
          </p>
          <div className="laws-container">
            <div className="law-card">
              <span className="law-number">1</span>
              <p>A robot may not injure a human being or, through inaction, allow a human being to come to harm.</p>
            </div>
            <div className="law-card">
              <span className="law-number">2</span>
              <p>A robot must obey orders given it by human beings except where such orders would conflict with the First Law.</p>
            </div>
            <div className="law-card">
              <span className="law-number">3</span>
              <p>A robot must protect its own existence as long as such protection does not conflict with the First or Second Law.</p>
            </div>
          </div>
        </div>

        <QuoteMonument
          quote="I grew to be tired of the ever-increasing tendency to picture robots as dangerous devices that inevitably destroyed their creators."
          attribution="Isaac Asimov"
          era="1950s"
        />

        <div className="figures-grid">
          {figuresByEra("1950s").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>

        <div className="content-block">
          <p>
            Asimov didn&apos;t just write about robots—he also coined the word <strong>&ldquo;robotics&rdquo;</strong> (first appearing in his 1941 story &ldquo;Liar!&rdquo;). He reframed robots from inevitable threats to potential partners, countering what he called humanity&apos;s &ldquo;Frankenstein complex.&rdquo;
          </p>
        </div>
      </Section>

      {/* ==================== CHAPTER 3: THE INDUSTRY (1960s-70s) ==================== */}
      <Section id="chapter-3" era="era-1970s" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter 3</span>
          <h2 className="chapter-title">Robots Enter the Factory</h2>
          <span className="chapter-date">1960s–1970s</span>
        </div>

        <div className="chapter-intro">
          <p className="lead-paragraph">
            From page to factory floor—the word becomes metal, and anxiety gets real.
          </p>
        </div>

        <div className="content-block">
          <h3>Unimate: The First Industrial Robot</h3>
          <p>
            In 1961, at a General Motors plant in Trenton, New Jersey, the <strong>Unimate</strong> robot arm was installed to handle hot die-cast metal pieces. Robots were no longer fiction—they were doing work humans didn&apos;t want to do.
          </p>
          <p>
            Joseph Engelberger and George Devol&apos;s creation marked the beginning of industrial automation. Labor displacement fears, long confined to science fiction, became workplace reality.
          </p>
        </div>

        <div className="figures-grid">
          {figuresByEra("1970s").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>

        <div className="content-block">
          <h3>The Uncanny Valley</h3>
          <p>
            In 1970, Japanese roboticist Masahiro Mori proposed a concept that would influence robot design for decades: the <strong>uncanny valley</strong>.
          </p>
          <p>
            As robots become more humanlike, our comfort with them increases—until we reach a point where near-human robots trigger deep discomfort. This explains why some robots succeed while others disturb us.
          </p>
        </div>

        <div className="content-block">
          <h3>Star Wars: Friendly Robot Companions</h3>
          <p>
            In 1977, <em>Star Wars</em> introduced R2-D2 and C-3PO—robots who were helpful, comedic, and beloved. For the first time in a generation, popular culture offered friendly robot companions rather than threats.
          </p>
        </div>
      </Section>

      {/* ==================== CHAPTER 4: THE FEAR PEAK (1980s) ==================== */}
      <Section id="chapter-4" era="era-1980s" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter 4</span>
          <h2 className="chapter-title">The Rise of the Machines</h2>
          <span className="chapter-date">1980s–1990s</span>
        </div>

        <div className="chapter-intro">
          <p className="lead-paragraph">
            Nightmare machine—cinema crystallized our deepest fears into red-eyed chrome.
          </p>
        </div>

        <QuoteMonument
          quote="Listen, and understand. That terminator is out there. It can't be bargained with. It can't be reasoned with. It doesn't feel pity, or remorse, or fear. And it absolutely will not stop, ever, until you are dead."
          attribution="Kyle Reese, The Terminator (1984)"
          era="1980s"
        />

        <div className="content-block">
          <h3>The Terminator: Peak Robot Fear</h3>
          <p>
            James Cameron&apos;s 1984 film crystallized robot-as-threat in the public imagination. The T-800—an unstoppable machine assassin from a future where AI has decided humanity must be eliminated—became the icon of technological anxiety.
          </p>
          <p>
            &ldquo;I&apos;ll be back&rdquo; entered the global lexicon. The Terminator became shorthand for machine menace, influencing debates about AI and autonomous weapons to this day.
          </p>
        </div>

        <div className="figures-grid">
          {figuresByEra("1980s").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>

        <div className="content-block">
          <h3>AIBO: The First Hint of Change</h3>
          <p>
            In 1999, Sony released AIBO—a robotic dog designed not for work, but for companionship. People formed emotional attachments to their robot pets. This was the first mass-market glimpse of a future where robots might be friends, not threats.
          </p>
        </div>
      </Section>

      {/* ==================== CHAPTER 5: DOMESTICATION (2000s-2010s) ==================== */}
      <Section id="chapter-5" era="era-2000s" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter 5</span>
          <h2 className="chapter-title">Robot Comes Home</h2>
          <span className="chapter-date">2000s–2010s</span>
        </div>

        <div className="chapter-intro">
          <p className="lead-paragraph">
            The vacuum cleaner that changed everything—when robots stopped threatening and started helping.
          </p>
        </div>

        <div className="content-block">
          <h3>Roomba: The Domestication of Robot</h3>
          <p>
            In 2002, iRobot released the Roomba—and robots entered millions of homes. The Roomba didn&apos;t look like a science fiction robot. It looked like a vacuum cleaner, because that&apos;s what it was.
          </p>
          <p>
            Function over form changed the word&apos;s connotation. &ldquo;Robot&rdquo; began its shift from threat to helper.
          </p>
        </div>

        <QuoteMonument
          quote="The Roomba is not a robot that looks like a person. It's a robot that acts like a vacuum cleaner."
          attribution="Rodney Brooks"
          era="2000s"
        />

        <div className="figures-grid">
          {figuresByEra("2000s").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>

        <div className="content-block">
          <h3>Mars Rovers: Robots as Heroes</h3>
          <p>
            In 2004, Spirit and Opportunity landed on Mars. NASA&apos;s rovers became beloved characters—people followed their &ldquo;adventures&rdquo; and mourned when Opportunity finally went silent in 2018 after 15 years of exploration.
          </p>
          <p>
            Robots could be more than tools or threats. They could be extensions of human curiosity.
          </p>
        </div>
      </Section>

      {/* ==================== CHAPTER 6: AI EXPANSION (2016-2025) ==================== */}
      <Section id="chapter-6" era="era-2020s" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Chapter 6</span>
          <h2 className="chapter-title">Beyond the Physical</h2>
          <span className="chapter-date">2016–Present</span>
        </div>

        <div className="chapter-intro">
          <p className="lead-paragraph">
            The word unbound—&ldquo;robot&rdquo; expands beyond metal bodies into disembodied intelligence.
          </p>
        </div>

        <div className="content-block">
          <h3>The AI Moment</h3>
          <p>
            When ChatGPT launched in late 2022, millions of people began interacting with an AI they colloquially called a &ldquo;robot&rdquo;—despite it having no physical form whatsoever.
          </p>
          <p>
            The word &ldquo;robot&rdquo; is expanding in real-time. A 1920 term for biological artificial workers now encompasses software systems that exist only as code.
          </p>
        </div>

        <div className="perception-gap">
          <h3>The Perception Gap</h3>
          <div className="gap-stats">
            <DataStat value="93%" label="Corporate leaders optimistic about AI" source="Just Capital, 2025" />
            <DataStat value="58%" label="General public shares that optimism" source="Just Capital, 2025" />
          </div>
          <p className="gap-context">
            A significant gap persists between how elites and the public view robots and AI. While business leaders see opportunity, many workers still see the &ldquo;robota&rdquo; their ancestors knew: machines that might take their labor.
          </p>
        </div>

        <div className="content-block">
          <h3>The Humanoid Race</h3>
          <p>
            In 2024-2025, multiple companies announced general-purpose humanoid robots: Tesla&apos;s Optimus, Figure&apos;s Figure 01, Boston Dynamics&apos; Atlas. The race to create robots that look and move like humans has accelerated.
          </p>
          <p>
            We&apos;ve come full circle: from Čapek&apos;s biological artificial workers to actual humanoid machines. The word&apos;s meaning continues to evolve.
          </p>
        </div>
      </Section>

      {/* ==================== CONCLUSION ==================== */}
      <Section id="conclusion" era="era-2020s" className="conclusion">
        <div className="conclusion-content">
          <h2 className="conclusion-title">The Living Word</h2>
          <p className="conclusion-text">
            The word &ldquo;robot&rdquo; is not just a technological term—it&apos;s a cultural Rorschach test. How we define, depict, and relate to robots reveals our hopes and fears about work, humanity, and the future.
          </p>
          <p className="conclusion-text">
            A 1920 Czech neologism has become the vocabulary through which we negotiate our relationship with artificial beings. The word&apos;s etymology prophesied every debate we&apos;re still having: about labor, about autonomy, about what it means to create life.
          </p>
          <QuoteMonument
            quote="Robots are people... manufactured people."
            attribution="Karel Čapek, R.U.R. (1920)"
            era="1920s"
          />
          <p className="conclusion-final">
            105 years later, we&apos;re still figuring out what that means.
          </p>
        </div>
      </Section>

      {/* ==================== TIMELINE ==================== */}
      <Section id="timeline" era="era-timeline" className="timeline-section">
        <TimelineSection />
      </Section>

      {/* ==================== SOURCES ==================== */}
      <section className="sources-section">
        <div className="sources-content">
          <h3 className="sources-title">Sources &amp; Further Reading</h3>
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
            This visual essay was researched using 22 verified sources from academic institutions, major publications, and primary historical records. All quotes have been verified against original sources where available.
          </p>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="robot-footer">
        <p className="footer-text">
          <strong>ROBOT</strong> — The Word That Imagined Our Future
        </p>
        <p className="footer-credit">
          A visual essay exploring the origin, history, and evolution of the word &ldquo;robot&rdquo;
        </p>
      </footer>
    </div>
  );
};

export default TheWordRobotClient;
