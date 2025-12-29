"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import "./rock-and-roll.css";

// ==================== TYPES ====================

type Era = "prerock" | "explosion" | "invasion" | "evolution" | "present";

interface Figure {
  name: string;
  epithet: string;
  dates: string;
  domains: string[];
  description: string;
  quote?: string;
  quoteContext?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageCredit?: string;
  featured?: boolean;
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  era: Era;
  epigraph?: { text: string; attribution: string };
  contentWarning?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
  narrative: string[];
  figures: Figure[];
}

// ==================== HOOKS ====================

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setProgress(docHeight > 0 ? scrolled / docHeight : 0);
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateProgress);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
};

const useHeroProgress = (heroRef: React.RefObject<HTMLElement | null>) => {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight;
      const scrolled = -rect.top;
      const newProgress = Math.min(Math.max(scrolled / (heroHeight * 0.6), 0), 1);
      setProgress(newProgress);
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateProgress);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroRef]);

  return progress;
};

// ==================== PROGRESS BAR ====================

const ProgressBar: React.FC<{ progress: number; chapters: Chapter[] }> = ({
  progress,
  chapters,
}) => {
  const fillHeight = `${Math.min(progress * 100, 100)}%`;
  const needleTop = `${Math.min(progress * 100, 100)}%`;

  return (
    <>
      {/* Desktop: Vertical left bar */}
      <aside className="rnr-progress" aria-hidden="true">
        <div className="rnr-progress__track">
          <div className="rnr-progress__fill" style={{ height: fillHeight }} />
          <div className="rnr-progress__needle" style={{ top: needleTop }} />
          <div className="rnr-progress__markers">
            {chapters.map((chapter, idx) => {
              const markerProgress = idx / (chapters.length - 1);
              return (
                <div
                  key={chapter.id}
                  className={`rnr-progress__marker ${
                    progress >= markerProgress ? "rnr-progress__marker--passed" : ""
                  }`}
                  data-era={chapter.era}
                  title={chapter.title}
                />
              );
            })}
          </div>
        </div>
      </aside>

      {/* Mobile: Horizontal bottom bar */}
      <div className="rnr-progress--mobile" aria-hidden="true">
        <div
          className="rnr-progress__fill"
          style={{ width: `${Math.min(progress * 100, 100)}%` }}
        />
      </div>
    </>
  );
};

// ==================== HERO SECTION ====================

const Hero: React.FC = () => {
  return (
    <header className="rnr-hero">
      <div className="rnr-hero__ambient" />

      {/* Hero content - visible immediately */}
      <div className="rnr-hero__content">
        <span className="rnr-hero__overline">A Visual History</span>
        <h1 className="rnr-hero__title">Rock & Roll</h1>
        <p className="rnr-hero__subtitle">The Noise That Remade the World</p>
      </div>

      {/* Scroll hint */}
      <div className="rnr-hero__scroll-hint">
        <span className="rnr-hero__scroll-text">Scroll</span>
        <div className="rnr-hero__scroll-line" />
      </div>
    </header>
  );
};

// ==================== CONVERGENCE SECTION ====================

interface StreamPosition {
  x: number;
  y: number;
  opacity: number;
}

const ConvergenceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Progress from 0 (section entering viewport) to 1 (section leaving)
      const visibleTop = viewportHeight - rect.top;
      const totalTravel = viewportHeight + sectionHeight;
      const newProgress = Math.min(Math.max(visibleTop / totalTravel, 0), 1);
      setProgress(newProgress);
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateProgress);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate stream positions based on scroll progress
  const getStreamPosition = (
    index: number,
    total: number,
    prog: number
  ): StreamPosition => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    const startRadius = 200;
    const endRadius = 0;

    // Fade in from 0-40%, converge from 20-80%
    const fadeIn = Math.min(prog / 0.4, 1);
    const converge = Math.max(0, Math.min((prog - 0.2) / 0.6, 1));

    const radius = startRadius - (startRadius - endRadius) * converge;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const opacity = fadeIn * (1 - converge * 0.6);

    return { x, y, opacity };
  };

  const streams = ["gospel", "boogie", "blues", "jump", "rnb"];
  const burstOpacity = progress > 0.6 ? Math.min((progress - 0.6) / 0.2, 1) : 0;
  const taglineOpacity = progress > 0.7 ? Math.min((progress - 0.7) / 0.15, 1) : 0;

  return (
    <section ref={sectionRef} className="rnr-convergence">
      <div className="rnr-convergence__container">
        {/* Convergence streams */}
        <div className="rnr-convergence__streams">
          {streams.map((stream, idx) => {
            const pos = getStreamPosition(idx, streams.length, progress);
            return (
              <div
                key={stream}
                className={`rnr-convergence__stream rnr-convergence__stream--${stream}`}
                style={{
                  transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                  opacity: pos.opacity,
                }}
              />
            );
          })}
          <div className="rnr-convergence__burst" style={{ opacity: burstOpacity }} />
        </div>

        {/* Tagline appears after convergence */}
        <p className="rnr-convergence__tagline" style={{ opacity: taglineOpacity }}>
          It converged.
        </p>
      </div>
    </section>
  );
};

// ==================== FIGURE CARD ====================

const FigureCard: React.FC<{ figure: Figure }> = ({ figure }) => {
  const hasImage = !!figure.imageSrc;

  return (
    <article
      className={`rnr-figure ${figure.featured ? "rnr-figure--featured" : ""} ${
        hasImage ? "rnr-figure--has-image" : ""
      }`}
    >
      {hasImage && (
        <div className="rnr-figure__image-wrap">
          <Image
            src={figure.imageSrc!}
            alt={figure.imageAlt || figure.name}
            width={160}
            height={220}
            className="rnr-figure__image"
          />
          {figure.imageCredit && (
            <span className="rnr-figure__image-credit">{figure.imageCredit}</span>
          )}
        </div>
      )}
      <div className="rnr-figure__content">
        <h3 className="rnr-figure__name">{figure.name}</h3>
        <p className="rnr-figure__epithet">{figure.epithet}</p>
        <span className="rnr-figure__dates">{figure.dates}</span>
        <div className="rnr-figure__domains">
          {figure.domains.map((domain) => (
            <span key={domain} className="rnr-figure__domain">
              {domain}
            </span>
          ))}
        </div>
        <p className="rnr-figure__description">{figure.description}</p>
        {figure.quote && (
          <blockquote className="rnr-figure__quote">
            &ldquo;{figure.quote}&rdquo;
            {figure.quoteContext && (
              <cite className="rnr-figure__quote-context">
                {" "}
                — {figure.quoteContext}
              </cite>
            )}
          </blockquote>
        )}
      </div>
    </article>
  );
};

// ==================== CHAPTER SECTION ====================

const ChapterSection: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-5% 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={chapter.id}
      className={`rnr-chapter rnr-chapter--era-${chapter.era} ${
        isVisible ? "rnr-chapter--visible" : ""
      }`}
    >
      <div className="rnr-chapter__inner">
        {/* Header */}
        <header className="rnr-chapter__header">
          <span className="rnr-chapter__number">{chapter.number}</span>
          <h2 className="rnr-chapter__title">{chapter.title}</h2>
          <p className="rnr-chapter__subtitle">{chapter.subtitle}</p>
          {chapter.epigraph && (
            <blockquote className="rnr-chapter__epigraph">
              &ldquo;{chapter.epigraph.text}&rdquo;
              <cite>{chapter.epigraph.attribution}</cite>
            </blockquote>
          )}
        </header>

        {/* Content warning */}
        {chapter.contentWarning && (
          <div className="rnr-chapter__warning">
            <div className="rnr-chapter__warning-label">Content Note</div>
            {chapter.contentWarning}
          </div>
        )}

        {/* Chapter image */}
        {chapter.imageSrc && (
          <div className="rnr-chapter__image-container">
            <Image
              src={chapter.imageSrc}
              alt={chapter.imageAlt || chapter.title}
              width={720}
              height={400}
              className="rnr-chapter__image"
            />
            {chapter.imageCaption && (
              <p className="rnr-chapter__image-caption">{chapter.imageCaption}</p>
            )}
          </div>
        )}

        {/* Narrative */}
        <div className="rnr-narrative rnr-narrative--dropcap">
          {chapter.narrative.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Figures */}
        {chapter.figures.length > 0 && (
          <div className="rnr-figures">
            {chapter.figures.map((figure) => (
              <FigureCard key={figure.name} figure={figure} />
            ))}
          </div>
        )}

        <div className="rnr-divider" />
      </div>
    </section>
  );
};

// ==================== EPILOGUE ====================

const Epilogue: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      className={`rnr-epilogue ${isVisible ? "rnr-chapter--visible" : ""}`}
    >
      <p className="rnr-epilogue__text">
        The break is always playing. The amp is always on. The noise continues.
      </p>
      <span className="rnr-epilogue__closing">The End</span>
    </footer>
  );
};

// ==================== SOURCES ====================

const Sources: React.FC = () => (
  <section className="rnr-sources">
    <div className="rnr-sources__inner">
      <h2 className="rnr-sources__title">Sources & Further Reading</h2>

      <div className="rnr-sources__category">
        <h3 className="rnr-sources__category-title">Books</h3>
        <ul className="rnr-sources__list">
          <li>
            <a href="#">
              Peter Guralnick, <em>Last Train to Memphis</em> (1994)
            </a>
          </li>
          <li>
            <a href="#">
              Greil Marcus, <em>Mystery Train</em> (1975)
            </a>
          </li>
          <li>
            <a href="#">
              Nick Tosches, <em>Unsung Heroes of Rock &apos;n&apos; Roll</em> (1984)
            </a>
          </li>
          <li>
            <a href="#">
              Robert Palmer, <em>Deep Blues</em> (1981)
            </a>
          </li>
          <li>
            <a href="#">
              Jack Hamilton, <em>Just Around Midnight</em> (2016)
            </a>
          </li>
        </ul>
      </div>

      <div className="rnr-sources__category">
        <h3 className="rnr-sources__category-title">Documentaries</h3>
        <ul className="rnr-sources__list">
          <li>
            <a href="#">
              <em>The History of Rock &apos;n&apos; Roll</em> (1995)
            </a>
          </li>
          <li>
            <a href="#">
              <em>Sister Rosetta Tharpe: The Godmother of Rock & Roll</em> (2011)
            </a>
          </li>
          <li>
            <a href="#">
              <em>Standing in the Shadows of Motown</em> (2002)
            </a>
          </li>
        </ul>
      </div>

      <p className="rnr-sources__note">
        Complete bibliography available in the research package.
      </p>
    </div>
  </section>
);

// ==================== CHAPTER DATA ====================

const chapters: Chapter[] = [
  {
    id: "prologue",
    number: "Prologue",
    title: "The Convergence",
    subtitle: "Before the Name: Multiple Streams Toward a Single Sound",
    era: "prerock",
    epigraph: {
      text: "All this new stuff they call Rock and Roll, why I've been playing that for years now.",
      attribution: "Sister Rosetta Tharpe, 1957",
    },
    narrative: [
      "Who invented rock and roll? It's the question everyone asks, and it's the wrong question. Rock and roll was not invented—it converged. At least six distinct streams of African American musical innovation merged in the late 1940s, powered by new technologies and reaching across racial lines.",
      "Boogie-woogie piano from Texas lumber camps. Jump blues from Kansas City and New York. Electric blues electrifying the Delta sound in Chicago. Gospel driving sacred music with rock rhythms. Rhythm & Blues as an industry category replacing 'race records.' Western swing from cross-racial Texas dance halls.",
      "Each stream had its own masters, techniques, and regional character. When they converged—when amplifiers got loud enough, when tape recorders captured the energy, when radio waves crossed state lines and segregation barriers—they became something the world had never heard before.",
    ],
    figures: [
      {
        name: "Sister Rosetta Tharpe",
        epithet: "The Godmother of Rock and Roll",
        dates: "1915–1973",
        domains: ["Gospel", "Electric Guitar", "Pioneer"],
        description:
          "First gospel recording star; pioneered electric guitar distortion. Her 1944 'Strange Things Happening Every Day' was the first gospel song to reach the R&B Top 10.",
        quote: "All this new stuff they call Rock and Roll, why I've been playing that for years now.",
        quoteContext: "1957",
        featured: true,
      },
      {
        name: "Louis Jordan",
        epithet: "Father of Rhythm & Blues",
        dates: "1908–1975",
        domains: ["Jump Blues", "Saxophone", "Showman"],
        description:
          "Alto saxophonist and bandleader with 57 R&B chart hits and 113 weeks at #1 between 1943 and 1950. His Tympany Five dominated the decade.",
        quote: "Rock and roll would have never happened without him.",
        quoteContext: "Doc Pomus",
        featured: false,
      },
    ],
  },
  {
    id: "chapter-1",
    number: "Chapter 1",
    title: "Rivers Before the Flood",
    subtitle: "The Pre-Rock Streams (1920s–1949)",
    era: "prerock",
    narrative: [
      "In Texas lumber camps of the 1870s, African American pianists developed a driving style—eight-to-the-bar left-hand patterns beneath improvised right-hand melodies. The music migrated to Chicago, where Pinetop Smith's 'Pinetop's Boogie Woogie' (December 29, 1928) became the first hit with 'boogie' in the title.",
      "On December 23, 1938, boogie-woogie reached Carnegie Hall. The 'Spirituals to Swing' concert featured Meade 'Lux' Lewis, Albert Ammons, and Pete Johnson. Classical America heard the rolling thunder.",
      "Meanwhile, T-Bone Walker picked up the electric guitar in 1935 and invented its vocabulary—single-string phrases, double-string slurs, showmanship like playing behind his head. When Muddy Waters moved from Mississippi to Chicago in 1943, he faced a problem: acoustic Delta blues couldn't compete with Chicago's noisy clubs. The Delta blues became electrified, loud enough to shake walls.",
    ],
    figures: [
      {
        name: "Pinetop Smith",
        epithet: "First Boogie-Woogie Recording Star",
        dates: "1904–1929",
        domains: ["Boogie-Woogie", "Piano"],
        description:
          "Recorded 'Pinetop's Boogie Woogie' (December 29, 1928), the first recording with 'boogie' in the title. Died from a gunshot wound in a Chicago dance-hall fight at age 24.",
        featured: false,
      },
      {
        name: "T-Bone Walker",
        epithet: "Electric Blues Guitar Pioneer",
        dates: "1910–1975",
        domains: ["Electric Blues", "Guitar", "Showman"],
        description:
          "First blues guitarist to make electric guitar a solo centerpiece (1935). Invented the vocabulary: single-string phrases, double-string slurs, playing behind his head.",
        quote: "I thought 'Jesus Himself had returned to earth playing electric guitar.'",
        quoteContext: "B.B. King",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-2",
    number: "Chapter 2",
    title: "The Impossible Question",
    subtitle: "What Was the First Rock and Roll Record? (1944–1951)",
    era: "explosion",
    narrative: [
      "The search for rock's 'first record' is impossible to resolve definitively—and the attempt reveals how we construct origin myths. 1944: Sister Rosetta Tharpe's 'Strange Things Happening Every Day'—gospel with electric guitar distortion, crossing to the secular R&B chart. 1947: Roy Brown's 'Good Rockin' Tonight'—the word 'rock' used musically rather than sexually. 1949: Fats Domino's 'The Fat Man'—first rock record to sell one million copies.",
      "Then there's 1951: 'Rocket 88' by Jackie Brenston with Ike Turner's Kings of Rhythm. Often cited as the first rock and roll record. Features distorted guitar—Willie Kizart's amplifier broke en route to Sun Studio; Sam Phillips stuffed newspaper in the cone to stop rattling, creating the first recorded distortion.",
      "Nick Tosches wrote: 'It is impossible to discern the first modern rock record, just as it is impossible to discern where blue becomes indigo in the spectrum.' The impossibility of the question reveals the truth: rock emerged from a continuum of Black musical innovation. There was no single moment, no single inventor. There was a convergence.",
    ],
    figures: [
      {
        name: "Fats Domino",
        epithet: "New Orleans' Gentle Giant",
        dates: "1928–2017",
        domains: ["Piano", "R&B", "New Orleans"],
        description:
          "Record sales in the 1950s-60s rivaled only by Elvis Presley; 65 million records sold. 'The Fat Man' (1949) was the first rock record to sell 1 million copies.",
        quote: "Rock 'n roll is nothing but rhythm and blues, and we've been playing it for years down in New Orleans.",
        featured: true,
      },
      {
        name: "Ike Turner",
        epithet: "Architect of 'Rocket 88'",
        dates: "1931–2007",
        domains: ["Piano", "Bandleader", "Producer"],
        description:
          "Led the Kings of Rhythm; wrote and arranged 'Rocket 88' though Jackie Brenston got vocal credit. Sam Phillips called him 'the most talented person he ever worked with.'",
        featured: false,
      },
    ],
  },
  {
    id: "chapter-3",
    number: "Chapter 3",
    title: "The Naming",
    subtitle: "Alan Freed and the Word 'Rock and Roll' (1951–1952)",
    era: "explosion",
    narrative: [
      "The music existed before the name. African American artists and audiences knew what they were hearing. But for the music to cross the racial divide, it needed a new vocabulary.",
      "Leo Mintz ran Record Rendezvous in Cleveland. In the late 1940s, he noticed something strange: white teenagers were coming into his store to buy R&B records marketed to Black audiences. They were dancing to music not meant for them. Mintz saw opportunity.",
      "He approached local DJ Alan Freed with an idea: a radio show featuring this music, pitched to white teenagers. On July 11, 1951, Freed debuted 'The Moondog Rock 'n' Roll Party' on WJW Cleveland. The term 'rock and roll' had existed in Black culture for decades. Freed didn't invent it; he appropriated it, sanitizing the term for white consumption.",
      "On March 21, 1952, Freed organized the Moondog Coronation Ball at Cleveland Arena—capacity 10,000. Over 20,000 people showed up. The fire department shut it down after one song. It was the first major rock and roll concert—and it nearly ended before it began.",
    ],
    figures: [
      {
        name: "Alan Freed",
        epithet: "Moondog—Rock's First DJ Champion",
        dates: "1921–1965",
        domains: ["Radio", "Promoter", "DJ"],
        description:
          "Popularized 'rock and roll' on radio starting July 11, 1951. Organized the Moondog Coronation Ball (March 21, 1952)—the first major rock concert. Destroyed by payola scandal; died penniless at 43.",
        quote: "When the dance was stopped, I went off and cried. I'm not ashamed to admit it.",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-4",
    number: "Chapter 4",
    title: "The Electric Revolution",
    subtitle: "Technology as Co-Author (1935–1959)",
    era: "explosion",
    narrative: [
      "Rock and roll was not just performed with new technologies—it was constituted by them. The physics of solid-body guitars, the electronics of tube amplifiers, the economics of 45 RPM singles: these shaped the music's fundamental character.",
      "The acoustic guitar's hollow body created feedback when amplified. Leo Fender—who never learned to play guitar—solved this with a solid slab of wood: the Broadcaster (later Telecaster, 1950) and Stratocaster (1954). The solid body eliminated feedback and enabled volume. Rock's aggression became possible.",
      "When vacuum tube amplifiers were pushed past their intended limits, they distorted the signal. This 'flaw' became rock's signature sound. The 45 RPM single (1949) made records affordable for teenagers and shaped song structure—rock songs had to be short, immediate, impactful. The Regency TR-1 transistor radio (1954) let teenagers listen privately, away from parents. Rock became youth property.",
    ],
    figures: [
      {
        name: "Leo Fender",
        epithet: "Solid-Body Guitar Creator",
        dates: "1909–1991",
        domains: ["Inventor", "Luthier", "Engineer"],
        description:
          "Created the first mass-produced solid-body electric guitar (Telecaster, 1950; Stratocaster, 1954). Rock and Roll Hall of Fame inductee (1992). Never learned to play guitar.",
        featured: true,
      },
      {
        name: "Sam Phillips",
        epithet: "Sun Records Founder",
        dates: "1923–2003",
        domains: ["Producer", "Engineer", "Label Owner"],
        description:
          "Produced 'Rocket 88,' discovered Elvis, invented the slapback echo technique using two Ampex 350 tape recorders. First non-performer inducted into Rock and Roll Hall of Fame (1986).",
        quote: "I knew that for black music to come to its rightful place in this country, we had to have some white singers come over and do black music.",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-5",
    number: "Chapter 5",
    title: "The Crescent City Sound",
    subtitle: "New Orleans: The Rhythmic Foundation (1945–1960)",
    era: "explosion",
    narrative: [
      "New Orleans gave rock and roll its rhythm. The city's unique musical culture—blending Caribbean, African, French, and American traditions—produced the backbeat that would define the music.",
      "Drummer Earl Palmer is 'correctly identified as the man who put the backbeat in rock 'n' roll'—emphasizing beats 2 and 4 rather than 1 and 3. This rhythmic innovation, rooted in New Orleans second-line tradition, became rock's defining pulse.",
      "Cosimo Matassa opened J&M Recording Studio at 838 North Rampart Street in 1945. In just 15 x 16 feet, he captured virtually every New Orleans R&B hit from the late 1940s through the early 1970s. Producer Dave Bartholomew and artist Fats Domino created over 40 Top 10 R&B hits together. Their partnership defined the New Orleans sound.",
    ],
    figures: [
      {
        name: "Earl Palmer",
        epithet: "The Man Who Put the Backbeat in Rock 'n' Roll",
        dates: "1924–2008",
        domains: ["Drums", "Session Musician", "New Orleans"],
        description:
          "Drummer on Little Richard's 'Tutti Frutti,' Fats Domino's hits, and countless others. Session musician on over 250 records. Rock and Roll Hall of Fame inductee (2000).",
        quote: "I wasn't thinking about inventing anything. I was just playing what felt right.",
        featured: true,
      },
      {
        name: "Cosimo Matassa",
        epithet: "New Orleans Recording Engineer",
        dates: "1926–2014",
        domains: ["Engineer", "Studio Owner", "Producer"],
        description:
          "Captured virtually every New Orleans R&B hit from the late 1940s through early 1970s at J&M Studio. Rock and Roll Hall of Fame inductee (2012).",
        quote: "The sound was in the room, not in the equipment.",
        featured: false,
      },
    ],
  },
  {
    id: "chapter-6",
    number: "Chapter 6",
    title: "Where the Soul Was Recorded",
    subtitle: "Memphis and Sun Studio (1950–1959)",
    era: "explosion",
    narrative: [
      "Memphis was where the races met in music—not without tension, not without exploitation, but with revolutionary results. Sam Phillips opened Memphis Recording Service (later Sun Studio) at 706 Union Avenue on January 3, 1950.",
      "In August 1953, an 18-year-old truck driver paid $4 to record a demo for his mother. Elvis Presley's voice impressed Marion Keisker, Phillips's assistant. A year later, on July 5, 1954, Elvis returned to the studio. After hours of frustrating attempts at ballads, he started fooling around with Arthur Crudup's 'That's All Right.'",
      "Phillips recognized the sound immediately. On July 7, 1954, DJ Dewey Phillips played 'That's All Right' on WHBQ Memphis. The phone lines exploded. A white boy singing Black music—not imitating, not sanitizing, but inhabiting it. The crossover began.",
    ],
    figures: [
      {
        name: "Elvis Presley",
        epithet: "The King—The Crossover",
        dates: "1935–1977",
        domains: ["Singer", "Actor", "Icon"],
        description:
          "Bridged Black and white music for a mass audience. Over 1 billion records sold worldwide. His Sun Studio recordings changed American music.",
        quote: "A lot of people seem to think I started this business. But rock 'n' roll was here a long time before I came along. Nobody can sing it like colored people.",
        quoteContext: "1957",
        featured: true,
      },
      {
        name: "Jerry Lee Lewis",
        epithet: "The Killer",
        dates: "1935–2022",
        domains: ["Piano", "Rock", "Country"],
        description:
          "Wild piano style; 'Whole Lotta Shakin' Going On' (1957), 'Great Balls of Fire' (1957). Career derailed by marriage to 13-year-old cousin (1958).",
        quote: "Rock and roll is not a sin. Some of the people who play it are sinners.",
        featured: false,
      },
    ],
  },
  {
    id: "chapter-7",
    number: "Chapter 7",
    title: "The House That Blues Built",
    subtitle: "Chicago and Chess Records (1950–1969)",
    era: "explosion",
    narrative: [
      "When the Delta blues came to Chicago, it got loud. Leonard Chess (born Lejzor Czyz) and Phil Chess (born Fiszel Czyz)—Polish Jewish immigrants—owned nightclubs on Chicago's South Side where bluesmen performed. In 1950, they founded Chess Records. At 2120 South Michigan Avenue, they built a catalog that defined electric blues.",
      "Muddy Waters brought the Delta blues north and plugged it in. His 1958 UK tour shocked British audiences—electric blues at volume levels they'd never experienced. He planted seeds that would grow into the British Invasion.",
      "Chuck Berry was the complete package: guitar innovation, lyrical wit, showmanship, and business sense. 'Maybellene' (1955) was his breakthrough—#1 R&B, #5 Pop. But Berry lost royalties for 31 years. Alan Freed demanded co-writing credit as payment for radio play. Berry didn't regain full ownership until 1986.",
    ],
    figures: [
      {
        name: "Chuck Berry",
        epithet: "Rock's Supreme Poet",
        dates: "1926–2017",
        domains: ["Guitar", "Singer", "Songwriter"],
        description:
          "'Maybellene' (1955) moved Chess from R&B into mainstream rock. Lost royalties for 31 years when Alan Freed was added to writing credits.",
        quote: "It used to be called boogie-woogie, it used to be called blues, it used to be called rhythm and blues... It's called rock now.",
        featured: true,
      },
      {
        name: "Muddy Waters",
        epithet: "Father of Modern Chicago Blues",
        dates: "1913–1983",
        domains: ["Electric Blues", "Guitar", "Bandleader"],
        description:
          "Recorded by Alan Lomax for Library of Congress (1941-1942). Electrified Delta blues in Chicago. His 1958 UK tour inspired the British Invasion.",
        quote: "When I went into the clubs, the first thing I wanted was an amplifier.",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-8",
    number: "Chapter 8",
    title: "The Crossover and The Theft",
    subtitle: "Race, Covers, and Erasure (1950–1960)",
    era: "explosion",
    contentWarning:
      "This chapter discusses racism, economic exploitation, and systemic erasure of Black artists.",
    narrative: [
      "Rock and roll's history cannot be separated from the history of American racism—in its creation, exploitation, erasure, and eventual (partial) integration.",
      "In the 1950s, white artists routinely covered Black artists' songs with sanitized arrangements for segregated radio markets. Big Mama Thornton's 'Hound Dog' (1953) topped the R&B chart for seven weeks. She received a flat fee of $500. No royalties. Elvis's 1956 version sold 10 million copies. Thornton died penniless in 1984.",
      "Little Richard's 'Tutti Frutti' was covered by Pat Boone, who outsold the original. LaVern Baker's 'Tweedle Dee' was covered by Georgia Gibbs using nearly the identical arrangement. Baker was so frustrated she petitioned Congress to outlaw note-for-note covers.",
      "Yet something else was happening. At rock and roll shows, the segregated seating—often enforced by literal ropes—began to collapse. Ralph Bass, Chess Records producer: 'Then, hell, the rope would come down, and they'd all be dancing together.' Music became a space where integration happened in practice before it was achieved in law.",
    ],
    figures: [
      {
        name: "Big Mama Thornton",
        epithet: "Hound Dog Original",
        dates: "1926–1984",
        domains: ["Blues", "Harmonica", "Singer"],
        description:
          "Her 1953 'Hound Dog' topped the R&B chart for seven weeks, sold 500,000+ copies. Paid a flat fee of $500, no royalties. Died penniless in Los Angeles.",
        quote: "Didn't get no money from them at all. Everybody livin' in a house but me. I'm just livin.",
        quoteContext: "1984",
        featured: true,
      },
      {
        name: "Little Richard",
        epithet: "The Architect of Rock and Roll",
        dates: "1932–2020",
        domains: ["Piano", "Singer", "Showman"],
        description:
          "Recorded 'Tutti Frutti,' 'Long Tall Sally,' 'Good Golly Miss Molly.' Self-proclaimed innovator, originator, and architect of rock and roll.",
        quote: "I am the innovator. I am the originator. I am the emancipator. I am the architect of rock 'n' roll.",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-9",
    number: "Chapter 9",
    title: "The Feedback Loop",
    subtitle: "The British Invasion Returns the Blues (1958–1966)",
    era: "invasion",
    narrative: [
      "The British Invasion was not merely an export of American music—it was a transformation that changed American rock itself. In October 1958, Muddy Waters toured the UK. British audiences, expecting acoustic folk blues, were stunned by his electric ferocity.",
      "Alexis Korner and Cyril Davies founded Blues Incorporated in 1961—'Britain's First Rhythm & Blues Band.' The Ealing Club became a training ground. Young musicians who would become the Rolling Stones, Cream, and Led Zeppelin cycled through.",
      "On February 9, 1964, the Beatles appeared on Ed Sullivan. 73 million Americans watched. The British Invasion began. But the British bands carried a secret cargo: American blues. The Rolling Stones named themselves after a Muddy Waters song. They recorded at Chess Records, 2120 South Michigan Avenue.",
      "White British teenagers reintroduced Black American music to white American teenagers. The feedback loop was complete—but the original creators were still being credited last.",
    ],
    figures: [
      {
        name: "The Beatles",
        epithet: "Liverpool's Gift to the World",
        dates: "1960–1970",
        domains: ["Rock", "Pop", "Cultural Revolution"],
        description:
          "73 million watched their Ed Sullivan appearance (February 9, 1964). Hamburg crucible transformed raw talent into world-beaters.",
        quote: "I was born in Liverpool, but I grew up in Hamburg.",
        quoteContext: "John Lennon",
        featured: true,
      },
      {
        name: "The Rolling Stones",
        epithet: "Blues Devotees",
        dates: "1962–present",
        domains: ["Rock", "Blues", "British Invasion"],
        description:
          "Named after a Muddy Waters song. Recorded at Chess Records. Mick Jagger and Keith Richards reconnected over blues albums.",
        quote: "We wanted to turn people on to blues. That was the whole idea.",
        quoteContext: "Keith Richards",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-10",
    number: "Chapter 10",
    title: "Global Amplification",
    subtitle: "Rock Spreads Worldwide (1964–1980)",
    era: "invasion",
    narrative: [
      "Rock and roll was never just American or British. Almost as soon as it had a name, it began to travel—and everywhere it landed, it adapted.",
      "In Brazil, Caetano Veloso and Gilberto Gil led Tropicalia—a movement fusing psychedelic rock with Brazilian traditions. Os Mutantes became the 'house band' of the movement. But the music was too radical for Brazil's military dictatorship. In 1969, Veloso and Gil were arrested, imprisoned, and eventually exiled.",
      "The Beatles' performances at Tokyo's Budokan in June-July 1966 triggered Japan's 'Group Sounds' explosion. In Germany, Kraftwerk, Neu!, and Tangerine Dream rejected both Anglo-American rock and conservative German culture, creating electronic rock that would influence punk, new wave, and all electronic music that followed.",
    ],
    figures: [
      {
        name: "Caetano Veloso",
        epithet: "Tropicalia Founder",
        dates: "b. 1942",
        domains: ["Tropicalia", "MPB", "Political Art"],
        description:
          "Led Tropicalia movement with Gilberto Gil, fusing psychedelia with Brazilian traditions. Arrested by military regime 1969; later exiled.",
        quote: "The violent aspect of rock 'n' roll interested us more because we were seeing violence.",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-11",
    number: "Chapter 11",
    title: "The Fracturing",
    subtitle: "Genre Evolution (1968–1995)",
    era: "evolution",
    narrative: [
      "Rock didn't stay unified. From the late 1960s, it splintered into genres—each with its own rules, heroes, and audiences.",
      "Black Sabbath emerged from Birmingham, England in 1968. Their doom-laden sound—slow, heavy, dark—became heavy metal. CBGB at 315 Bowery, New York, became ground zero for punk. The Ramones stripped rock to three chords and aggression. Across the Atlantic, the Sex Pistols and The Clash made punk political.",
      "On August 1, 1981, MTV launched with 'Video Killed the Radio Star.' The channel transformed rock into a visual medium. In 1991, Nirvana's 'Nevermind' broke grunge into the mainstream. Kurt Cobain became rock's last great martyr.",
    ],
    figures: [
      {
        name: "The Ramones",
        epithet: "Punk Originators",
        dates: "1974–1996",
        domains: ["Punk", "Rock", "CBGB"],
        description:
          "Stripped rock to three chords and two minutes. 'Blitzkrieg Bop' (1976) became a punk anthem.",
        quote: "We decided to start our own group because we were bored with everything we heard.",
        quoteContext: "Joey Ramone",
        featured: true,
      },
      {
        name: "Kurt Cobain",
        epithet: "Grunge Martyr",
        dates: "1967–1994",
        domains: ["Grunge", "Alternative", "Songwriter"],
        description:
          "Nirvana frontman; 'Nevermind' sold 30 million copies. Suicide at 27 ended grunge's brightest voice.",
        quote: "I'd rather be hated for who I am than loved for who I am not.",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-12",
    number: "Chapter 12",
    title: "The Silenced Half",
    subtitle: "Women in Rock (1920s–Present)",
    era: "evolution",
    contentWarning:
      "This chapter discusses sexism, erasure, and ongoing discrimination against women in the music industry.",
    narrative: [
      "Women have been in rock since before it had a name. Ma Rainey was recording blues in the 1920s. Sister Rosetta Tharpe invented electric guitar distortion. Big Mama Thornton's 'Hound Dog' was stolen and made famous by a man.",
      "Yet rock's history has systematically erased, diminished, and sexualized women's contributions. Wanda Jackson was the 'Queen of Rockabilly'—raw, powerful, overlooked. Janis Joplin became rock's first female superstar, dead at 27. Joan Jett, rejected by 23 labels, formed her own (Blackheart Records) and had hit after hit.",
      "In the early 1990s, Bikini Kill, Sleater-Kinney, and others created riot grrrl—feminist punk that explicitly named the industry's sexism. Today, women still face barriers in rock—fewer festival slots, less critical attention, ongoing sexualization. But the history cannot be rewritten without them.",
    ],
    figures: [
      {
        name: "Joan Jett",
        epithet: "The Queen of Rock 'n' Roll",
        dates: "b. 1958",
        domains: ["Rock", "Punk", "Label Owner"],
        description:
          "Rejected by 23 labels; formed Blackheart Records. 'I Love Rock 'n' Roll' (1981) spent eight weeks at #1.",
        quote: "I don't give a damn 'bout my bad reputation.",
        featured: true,
      },
      {
        name: "Janis Joplin",
        epithet: "Rock's First Female Superstar",
        dates: "1943–1970",
        domains: ["Blues Rock", "Psychedelic", "Vocalist"],
        description:
          "Fronted Big Brother and the Holding Company; solo career cut short. Died at 27 from overdose.",
        quote: "Don't compromise yourself. You are all you've got.",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-13",
    number: "Chapter 13",
    title: "The Invisible Architects",
    subtitle: "Producers, Engineers, and Session Musicians",
    era: "evolution",
    narrative: [
      "Behind every rock hit, there are names you've never heard. Producers who shaped the sound. Engineers who captured it. Session musicians who played on more hits than the stars themselves.",
      "Phil Spector created the 'Wall of Sound' at Gold Star Studios. George Martin was the 'Fifth Beatle.' The Wrecking Crew in Los Angeles played on more #1 hits than anyone can count—drummer Hal Blaine played on 40 #1 singles. Bassist Carol Kaye played on 'Good Vibrations,' 'Wichita Lineman,' and thousands more.",
      "The Funk Brothers at Motown played on more #1 hits than the Beatles, Elvis, Rolling Stones, and Beach Boys combined—yet most died unknown and uncompensated.",
    ],
    figures: [
      {
        name: "George Martin",
        epithet: "The Fifth Beatle",
        dates: "1926–2016",
        domains: ["Producer", "Arranger", "Orchestrator"],
        description:
          "Produced virtually all Beatles recordings. Arranged strings, experimented with tape effects, enabled the band's artistic evolution.",
        featured: true,
      },
      {
        name: "Carol Kaye",
        epithet: "Bass Legend",
        dates: "b. 1935",
        domains: ["Bass", "Session Musician", "Wrecking Crew"],
        description:
          "Played bass on 'Good Vibrations,' 'Wichita Lineman,' and thousands more. One of few female session musicians in a male-dominated field.",
        quote: "I played on so many records, I stopped counting.",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-14",
    number: "Chapter 14",
    title: "The Unfinished Reckoning",
    subtitle: "Race, Legacy, and Debts Unpaid (1986–Present)",
    era: "present",
    narrative: [
      "Rock and roll has begun to reckon with its history—but the reckoning is incomplete. The Rock and Roll Hall of Fame opened in Cleveland in 1995. The first induction ceremony (1986) saw 60% of inductees being African American. But the institution has faced criticism for how it weighs commercial success versus creative innovation.",
      "Ruth Brown's 20-year legal battle resulted in $20,000 in back royalties from Atlantic—and the creation of the Rhythm and Blues Foundation to help aging artists. Chuck Berry regained 'Maybellene' writing credit in 1986, 31 years after release. Sister Rosetta Tharpe was inducted into the Rock and Roll Hall of Fame in 2017, 44 years after her death.",
      "Today, hip-hop has surpassed rock as America's most consumed music genre (2017). Some see this as a return: Black musical innovation reclaiming the mainstream. The question persists: Can a music born from Black innovation, taken by white appropriation, and spread globally ever settle its debts?",
    ],
    figures: [
      {
        name: "Ruth Brown",
        epithet: "Miss Rhythm",
        dates: "1928–2006",
        domains: ["R&B", "Singer", "Activist"],
        description:
          "Her hits made Atlantic 'The House That Ruth Built.' Left Atlantic in the 1960s with no savings; worked as bus driver, floor scrubber. Won 20-year legal battle; received $20,000 in back royalties.",
        quote: "They called Atlantic 'The House That Ruth Built.' But Ruth wasn't getting paid.",
        featured: true,
      },
    ],
  },
];

// ==================== MAIN COMPONENT ====================

export default function RockAndRollClient() {
  const scrollProgress = useScrollProgress();

  return (
    <article className="rnr-essay">
      <ProgressBar progress={scrollProgress} chapters={chapters} />
      <Hero />
      <ConvergenceSection />

      {chapters.map((chapter) => (
        <ChapterSection key={chapter.id} chapter={chapter} />
      ))}

      <Epilogue />
      <Sources />
    </article>
  );
}
