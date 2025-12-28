"use client";

import React, { useEffect, useRef, useState } from "react";
import "./rock-and-roll.css";

// ============================================================================
// ROCK & ROLL: THE NOISE THAT REMADE THE WORLD
// ============================================================================
// Visual Treatment: Photography-driven with era-specific color grading
// Arc Type: Convergence (Origins -> Explosion -> Crossover -> Global -> Reckoning)
// Progress Bar: "Vinyl Groove / Waveform" - record spiral transforming to audio wave
// Cultural Lens: Authentic history with acknowledgment of complexity
// ============================================================================

// ==================== TYPE DEFINITIONS ====================

interface Figure {
  name: string;
  epithet: string;
  born?: string;
  died?: string;
  domains: string[];
  description: string;
  quote?: string;
  quoteContext?: string;
  isFeatured?: boolean;
  imageUrl?: string;
  imageAttribution?: string;
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  era: "prerock" | "explosion" | "invasion" | "evolution" | "present";
  epigraph?: { text: string; source: string };
  narrative: string[];
  figures: Figure[];
  contentWarning?: string;
  chapterImage?: {
    url: string;
    alt: string;
    attribution: string;
  };
}

// ==================== VERIFIED CC-LICENSED IMAGES ====================

const IMAGES = {
  // Hero / Key visuals
  sisterRosettaTharpe: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Sister_Rosetta_Tharpe_%281938_publicity_photo_with_guitar%29.jpg",
  louisJordan: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Louis_Jordan%2C_New_York%2C_N.Y.%2C_ca._July_1946_%28William_P._Gottlieb_04681%29.jpg",
  fatsDomino1956: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Fats_Domino_1956.png",
  boDiddley1957: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Bo_Diddley_%281957_publicity_portrait%29.jpg",
  littleRichard: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Little_Richard_in_2007_%28cropped%29_%282%29.jpg",
  bigMamaThornton: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Big_Mama_Thornton_1984.jpg",
  janisJoplin1970: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Janis_Joplin_1970.JPG",
  joanJett: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Joan_Jett_2013.jpg",
  cavernClub: "https://upload.wikimedia.org/wikipedia/commons/f/f5/CavernClub.JPG",
  sunStudio: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Memphis_-_Sun_Studio_01.jpg",
  chessRecords: "https://upload.wikimedia.org/wikipedia/commons/8/89/Chess_Records_Office.jpg",
  // Technology
  fenderTelecaster: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Muddy_Waters_1958_Fender_Telecaster_Guitar_%28details%29_-_Rock_%26_Roll_Hall_of_Fame_and_Museum%2C_Cleveland_%28by_Adam_Jones%29.jpg/1280px-Muddy_Waters_1958_Fender_Telecaster_Guitar_%28details%29_-_Rock_%26_Roll_Hall_of_Fame_and_Museum%2C_Cleveland_%28by_Adam_Jones%29.jpg",
  regencyTR1: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Regency_TR-1_Transistor_Radio.jpg",
} as const;

// ==================== CUSTOM HOOKS ====================

const useIntersectionReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

const useGlobalScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      const newProgress = Math.min(Math.max(scrollTop / scrollableHeight, 0), 1);
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

  return progress;
};

// ==================== VINYL GROOVE PROGRESS BAR ====================

const trackMarkers = [
  { id: "prologue", position: 0.02, label: "Prologue", era: "prerock" },
  { id: "ch1", position: 0.07, label: "1. Rivers Before the Flood", era: "prerock" },
  { id: "ch2", position: 0.12, label: "2. The Impossible Question", era: "prerock" },
  { id: "ch3", position: 0.17, label: "3. The Naming", era: "explosion" },
  { id: "ch4", position: 0.22, label: "4. The Electric Revolution", era: "explosion" },
  { id: "ch5", position: 0.27, label: "5. The Crescent City Sound", era: "explosion" },
  { id: "ch6", position: 0.32, label: "6. Where the Soul Was Recorded", era: "explosion" },
  { id: "ch7", position: 0.37, label: "7. The House That Blues Built", era: "explosion" },
  { id: "ch8", position: 0.44, label: "8. The Crossover and The Theft", era: "explosion" },
  { id: "ch9", position: 0.51, label: "9. The Feedback Loop", era: "invasion" },
  { id: "ch10", position: 0.58, label: "10. Global Amplification", era: "invasion" },
  { id: "ch11", position: 0.65, label: "11. The Fracturing", era: "evolution" },
  { id: "ch12", position: 0.72, label: "12. The Silenced Half", era: "evolution" },
  { id: "ch13", position: 0.79, label: "13. The Invisible Architects", era: "evolution" },
  { id: "ch14", position: 0.86, label: "14. The Unfinished Reckoning", era: "present" },
  { id: "epilogue", position: 0.94, label: "Epilogue", era: "present" },
];

const VinylProgress: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <>
      {/* Desktop vertical progress */}
      <div
        className="vinyl-progress"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      >
        <div className="vinyl-shell">
          <div
            className="vinyl-fill"
            style={{ height: `${progress * 90}%` }}
          />
          <div className="vinyl-tracks">
            {trackMarkers.map((marker) => (
              <div
                key={marker.id}
                className={`vinyl-track ${progress >= marker.position ? "passed" : ""}`}
                data-track={marker.label}
                data-era={marker.era}
              />
            ))}
          </div>
          <div
            className="vinyl-needle"
            style={{ top: `${5 + progress * 90}%` }}
          />
        </div>
      </div>

      {/* Mobile horizontal progress */}
      <div className="vinyl-progress-mobile">
        <div
          className="vinyl-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </>
  );
};

// ==================== FIGURE PROFILE COMPONENT ====================

const FigureProfile: React.FC<{ figure: Figure; era: string }> = ({ figure, era }) => {
  const accentColors: Record<string, string> = {
    prerock: "var(--era-prerock)",
    explosion: "var(--accent-amber)",
    invasion: "var(--era-invasion)",
    evolution: "var(--era-evolution)",
    present: "var(--era-present)",
  };

  return (
    <article
      className={`figure-profile ${figure.isFeatured ? "featured" : ""} ${figure.imageUrl ? "has-image" : ""}`}
      style={{ "--figure-accent": accentColors[era] } as React.CSSProperties}
    >
      {figure.imageUrl && (
        <div className="figure-image-container">
          <img
            src={figure.imageUrl}
            alt={`${figure.name} - ${figure.epithet}`}
            className="figure-image"
            loading="lazy"
          />
          {figure.imageAttribution && (
            <p className="figure-image-attribution">{figure.imageAttribution}</p>
          )}
        </div>
      )}
      <div className="figure-text">
        <h3 className="figure-name">{figure.name}</h3>
        <p className="figure-epithet">{figure.epithet}</p>
        {(figure.born || figure.died) && (
          <p className="figure-meta">
            {figure.born && `${figure.born}`}
            {figure.born && figure.died && " - "}
            {figure.died && `${figure.died}`}
          </p>
        )}
        <div className="figure-domains">
          {figure.domains.map((domain) => (
            <span key={domain} className="figure-domain">
              {domain}
            </span>
          ))}
        </div>
        <p className="figure-description">{figure.description}</p>
        {figure.quote && (
          <p className="figure-quote">
            &ldquo;{figure.quote}&rdquo;
            {figure.quoteContext && <span className="quote-context"> ({figure.quoteContext})</span>}
          </p>
        )}
      </div>
    </article>
  );
};

// ==================== CHAPTER COMPONENT ====================

const ChapterSection: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  const accentColors: Record<string, string> = {
    prerock: "var(--era-prerock)",
    explosion: "var(--accent-amber)",
    invasion: "var(--era-invasion)",
    evolution: "var(--era-evolution)",
    present: "var(--era-present)",
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`chapter-section ${isVisible ? "visible" : ""}`}
      data-era={chapter.era}
      style={{ "--chapter-accent": accentColors[chapter.era] } as React.CSSProperties}
    >
      <div className="chapter-content">
        <header className="chapter-header">
          <span className="chapter-number">{chapter.number}</span>
          <h2 className="chapter-title">{chapter.title}</h2>
          {chapter.subtitle && <p className="chapter-subtitle">{chapter.subtitle}</p>}
          {chapter.epigraph && (
            <div className="chapter-epigraph">
              &ldquo;{chapter.epigraph.text}&rdquo;
              <cite>- {chapter.epigraph.source}</cite>
            </div>
          )}
        </header>

        {chapter.contentWarning && (
          <div className="content-warning">
            <div className="content-warning-label">Content Note</div>
            {chapter.contentWarning}
          </div>
        )}

        {chapter.chapterImage && (
          <figure className="chapter-image-container">
            <img
              src={chapter.chapterImage.url}
              alt={chapter.chapterImage.alt}
              className="chapter-image"
              loading="lazy"
            />
            <figcaption className="chapter-image-attribution">
              {chapter.chapterImage.attribution}
            </figcaption>
          </figure>
        )}

        <div className="narrative-block has-dropcap">
          {chapter.narrative.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {chapter.figures.map((figure) => (
          <FigureProfile key={figure.name} figure={figure} era={chapter.era} />
        ))}
      </div>

      <div className="transition-divider" data-era={chapter.era} />
    </section>
  );
};

// ==================== CONTENT DATA ====================

const chapters: Chapter[] = [
  // PROLOGUE
  {
    id: "prologue",
    number: "Prologue",
    title: "The Convergence",
    subtitle: "Before the Name: Multiple Streams Toward a Single Sound",
    era: "prerock",
    epigraph: {
      text: "All this new stuff they call Rock and Roll, why I've been playing that for years now.",
      source: "Sister Rosetta Tharpe, 1957",
    },
    narrative: [
      "The question everyone asks: Who invented rock and roll?",
      "The answer is more complicated than a name. Rock and roll was never invented. It converged.",
      "In the late 1940s, multiple streams of African American musical innovation began flowing together: boogie-woogie piano from Texas lumber camps, jump blues from Kansas City ballrooms, electric blues from Chicago's South Side, gospel fire from storefront churches, rhythm & blues as the industry's new name for what they'd called 'race records.'",
      "Each stream had its own masters, its own techniques, its own regional character. When they merged-powered by new technologies and reaching across racial lines-they became something the world had never heard before.",
      "This is the story of that convergence. Of the Black innovators who created the sound and the white promoters who brought it across the racial divide. Of the technologies that amplified it and the industry that exploited it. Of the theft and the integration, the covers and the crossovers, the rope coming down at concerts where the music proved too powerful to contain.",
      "The noise that remade the world began not with a single spark, but with many rivers meeting.",
    ],
    figures: [
      {
        name: "Sister Rosetta Tharpe",
        epithet: "The Godmother of Rock and Roll",
        born: "March 20, 1915, Cotton Plant, Arkansas",
        died: "October 9, 1973",
        domains: ["Gospel", "Electric Guitar", "Pioneer"],
        description: "First gospel recording star to pioneer electric guitar distortion and bring rock rhythms to sacred music. 'Strange Things Happening Every Day' (1944) was the first gospel record to reach the R&B Top 10, blending secular and sacred in ways that scandalized the church establishment.",
        quote: "All this new stuff they call Rock and Roll, why I've been playing that for years now.",
        quoteContext: "1957",
        isFeatured: true,
        imageUrl: IMAGES.sisterRosettaTharpe,
        imageAttribution: "James J. Kriegsmann, Public domain, via Wikimedia Commons",
      },
    ],
  },

  // CHAPTER 1
  {
    id: "ch1",
    number: "Chapter I",
    title: "Rivers Before the Flood",
    subtitle: "The Pre-Rock Streams (1920s-1949)",
    era: "prerock",
    epigraph: {
      text: "I thought 'Jesus Himself had returned to earth playing electric guitar.'",
      source: "B.B. King, on first hearing T-Bone Walker",
    },
    narrative: [
      "Before rock and roll had a name, it was many things happening in many places-and all of them were Black.",
      "In Texas lumber camps of the 1870s, African American pianists developed boogie-woogie: eight-to-the-bar left-hand patterns beneath improvised right-hand melodies. The music migrated to Chicago, where Pinetop Smith's 'Pinetop's Boogie Woogie' (December 29, 1928) became the first hit. On December 23, 1938, boogie-woogie reached Carnegie Hall: the 'Spirituals to Swing' concert featured Meade 'Lux' Lewis, Albert Ammons, and Pete Johnson. Classical America heard the rolling thunder.",
      "Louis Jordan's Tympany Five dominated the 1940s R&B charts with 57 chart hits and 113 weeks at number one. Jordan combined comedy, showmanship, and propulsive rhythm. This was dance music with attitude, the direct precursor to rock's energy.",
      "T-Bone Walker picked up the electric guitar in 1935 and invented its vocabulary-single-string phrases, double-string slurs, showmanship like playing behind his head. When Muddy Waters moved from Mississippi to Chicago in 1943, he faced a problem: acoustic Delta blues couldn't compete with Chicago's noisy clubs. 'When I went into the clubs, the first thing I wanted was an amplifier,' he said. The Delta blues became electrified, loud enough to shake walls.",
      "And in the churches, Thomas A. Dorsey-formerly 'Georgia Tom,' blues pianist with Ma Rainey-fused blues technique with sacred music. He composed over 1,000 gospel songs. Sister Rosetta Tharpe took gospel electric, distorting her guitar before anyone had a name for it.",
    ],
    figures: [
      {
        name: "Pinetop Smith",
        epithet: "First Boogie-Woogie Recording Star",
        born: "June 11, 1904, Troy, Alabama",
        died: "March 15, 1929, Chicago",
        domains: ["Boogie-Woogie", "Piano", "Pioneer"],
        description: "Recorded 'Pinetop's Boogie Woogie' (December 29, 1928), the first recording with 'boogie' in the title. Died from a gunshot wound in a Chicago dance-hall fight at age 24, before seeing his influence spread worldwide.",
        quote: "Now when I tell you to hold yourself, I want you to get it!",
        quoteContext: "Spoken on 'Pinetop's Boogie Woogie' recording",
        isFeatured: true,
      },
      {
        name: "Louis Jordan",
        epithet: "Father of Rhythm & Blues",
        born: "July 8, 1908, Brinkley, Arkansas",
        died: "February 4, 1975",
        domains: ["Jump Blues", "Saxophone", "Showmanship"],
        description: "Alto saxophonist and bandleader with 57 R&B chart hits and 113 weeks at number one (1943-1950). Rock and Roll Hall of Fame Early Influence inductee (1987). Combined humor with hard-driving rhythm in ways Elvis and others would later follow.",
        quote: "Rock and roll would have never happened without him.",
        quoteContext: "Doc Pomus",
        isFeatured: true,
      },
      {
        name: "T-Bone Walker",
        epithet: "Electric Blues Guitar Pioneer",
        born: "May 28, 1910, Linden, Texas",
        died: "March 16, 1975",
        domains: ["Electric Blues", "Guitar", "Innovation"],
        description: "First blues guitarist to make electric guitar a solo centerpiece (1935). Invented the vocabulary of electric blues: single-string phrases, double-string slurs, playing guitar behind his head. Every rock guitarist who followed learned from his innovations.",
        quote: "They call it rock and roll now, but it's really the same old boogie woogie.",
        isFeatured: true,
      },
      {
        name: "Muddy Waters",
        epithet: "Father of Modern Chicago Blues",
        born: "April 4, 1913, Issaquena County, Mississippi",
        died: "April 30, 1983",
        domains: ["Electric Blues", "Chicago", "Influence"],
        description: "Recorded by Alan Lomax for Library of Congress (1941-1942). Electrified Delta blues in Chicago. His 1958 UK tour shocked British audiences with electric ferocity and planted seeds that grew into the British Invasion.",
        quote: "When I went into the clubs, the first thing I wanted was an amplifier.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 2
  {
    id: "ch2",
    number: "Chapter II",
    title: "The Impossible Question",
    subtitle: "What Was the First Rock and Roll Record? (1944-1951)",
    era: "prerock",
    epigraph: {
      text: "It is impossible to discern the first modern rock record, just as it is impossible to discern where blue becomes indigo in the spectrum.",
      source: "Nick Tosches, music critic",
    },
    narrative: [
      "The search for rock's 'first record' is impossible to resolve definitively-and the attempt reveals how we construct origin myths.",
      "Consider the candidates:",
      "1944: Sister Rosetta Tharpe's 'Strange Things Happening Every Day.' Gospel music with electric guitar distortion, driving backbeat, crossing to the secular R&B chart. Some say this was rock before rock had a name.",
      "1947: Roy Brown's 'Good Rockin' Tonight.' The word 'rock' used musically rather than sexually. Covered by Wynonie Harris, later by Elvis Presley. The vocabulary was forming.",
      "1949: Fats Domino's 'The Fat Man.' First rock record to sell one million copies. New Orleans rumba-boogie piano, wailing vocals. Recorded at Cosimo Matassa's J&M Studio at 838 North Rampart Street.",
      "1951: 'Rocket 88' by Jackie Brenston with Ike Turner's Kings of Rhythm. Often cited as the first rock and roll record. Features distorted guitar-Willie Kizart's amplifier broke en route to Sun Studio; Sam Phillips stuffed newspaper in the cone to stop rattling, creating the first recorded distortion. Car-culture lyrics, driving rhythm.",
      "The impossibility of the question reveals the truth: rock emerged from a continuum of Black musical innovation. There was no single moment, no single inventor. There was a convergence.",
    ],
    figures: [
      {
        name: "Ike Turner",
        epithet: "Architect of 'Rocket 88'",
        born: "November 5, 1931, Clarksdale, Mississippi",
        died: "December 12, 2007",
        domains: ["Bandleader", "Piano", "Producer"],
        description: "Led the Kings of Rhythm; wrote and arranged 'Rocket 88' though Jackie Brenston got vocal credit. Sam Phillips called him 'the most talented person he ever worked with.' Later decades obscured by domestic violence revelations and addiction.",
        isFeatured: false,
      },
      {
        name: "Fats Domino",
        epithet: "New Orleans' Gentle Giant",
        born: "February 26, 1928, New Orleans, Louisiana",
        died: "October 24, 2017",
        domains: ["Piano", "New Orleans R&B", "Hit Maker"],
        description: "Record sales in 1950s-60s rivaled only by Elvis Presley; 65 million records sold. 'The Fat Man' (1949) was the first rock record to sell 1 million copies. His rolling piano style defined the New Orleans sound.",
        quote: "Rock 'n roll is nothing but rhythm and blues, and we've been playing it for years down in New Orleans.",
        isFeatured: true,
        imageUrl: IMAGES.fatsDomino1956,
        imageAttribution: "Public domain, screenshot from Alan Freed Show 1956",
      },
    ],
  },

  // CHAPTER 3
  {
    id: "ch3",
    number: "Chapter III",
    title: "The Naming",
    subtitle: "Alan Freed and the Word 'Rock and Roll' (1951-1952)",
    era: "explosion",
    epigraph: {
      text: "When the dance was stopped, I went off and cried. I'm not ashamed to admit it.",
      source: "Alan Freed, on the Moondog Coronation Ball",
    },
    narrative: [
      "The music existed before the name. African American artists and audiences knew what they were hearing. But for the music to cross the racial divide, it needed a new vocabulary.",
      "Leo Mintz ran Record Rendezvous in Cleveland. In the late 1940s, he noticed something strange: white teenagers were coming into his store to buy R&B records marketed to Black audiences. They were dancing to music not meant for them. Mintz saw opportunity.",
      "He approached local DJ Alan Freed with an idea: a radio show featuring this music, pitched to the white teenagers who were already buying it. Freed agreed-but he needed a name that wouldn't scare white parents. 'Rhythm and blues' still carried racial coding.",
      "On July 11, 1951, Freed debuted 'The Moondog Rock 'n' Roll Party' on WJW Cleveland. The term 'rock and roll' had existed in Black culture for decades-sometimes meaning sex, sometimes meaning dancing, sometimes meaning spiritual transcendence. Freed didn't invent it; he appropriated it, sanitizing the term for white consumption.",
      "On March 21, 1952, Freed organized the Moondog Coronation Ball at Cleveland Arena-capacity 10,000. Over 20,000 people showed up, many with counterfeit tickets. The fire department shut it down after one song. Chaos, overcrowding, broken doors.",
      "It was the first major rock and roll concert-and it nearly ended before it began. Alan Freed wept when police stopped the show.",
    ],
    figures: [
      {
        name: "Alan Freed",
        epithet: "Moondog - Rock's First DJ Champion",
        born: "December 15, 1921, Johnstown, Pennsylvania",
        died: "January 20, 1965",
        domains: ["Radio", "Promotion", "Pioneer"],
        description: "Popularized 'rock and roll' on radio starting July 11, 1951. Organized the Moondog Coronation Ball (March 21, 1952)-first major rock concert. Destroyed by payola scandal; died penniless at 43.",
        quote: "When the dance was stopped, I went off and cried. I'm not ashamed to admit it.",
        isFeatured: true,
      },
      {
        name: "Leo Mintz",
        epithet: "Record Store Visionary",
        born: "1910",
        died: "1976",
        domains: ["Retail", "Observation", "Sponsorship"],
        description: "Observed white teenagers buying R&B at Record Rendezvous in Cleveland. Sponsored Alan Freed's radio show and concerts. Saw the crossover potential before the industry did.",
        quote: "It was more Leo's idea than mine.",
        quoteContext: "Alan Freed, on the 'rock and roll' concept",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 4
  {
    id: "ch4",
    number: "Chapter IV",
    title: "The Electric Revolution",
    subtitle: "Technology as Co-Author (1935-1959)",
    era: "explosion",
    epigraph: {
      text: "Technology became co-author.",
      source: "Rock & Roll Design Research",
    },
    narrative: [
      "Rock and roll was not just performed with new technologies-it was constituted by them. The physics of solid-body guitars, the electronics of tube amplifiers, the economics of 45 RPM singles: these shaped the music's fundamental character.",
      "The acoustic guitar's hollow body created feedback when amplified. Leo Fender-who never learned to play guitar-solved this with a solid slab of wood: the Broadcaster (later Telecaster, 1950) and Stratocaster (1954). Les Paul created 'The Log' prototype; Gibson produced the Les Paul model (1952). The solid body eliminated feedback and enabled volume. Rock's aggression became possible.",
      "When vacuum tube amplifiers were pushed past their intended limits, they distorted the signal. This 'flaw' became rock's signature sound. From Willie Kizart's broken amp on 'Rocket 88' to the cranked Marshalls of the British Invasion, distortion was the sound of rock.",
      "Sam Phillips used two Ampex 350 tape recorders to create a 134-137 millisecond delay-the 'Sun Sound.' This slapback echo defined Elvis, Johnny Cash, and Jerry Lee Lewis. When Elvis moved to RCA, engineers had to build a makeshift echo chamber to approximate it.",
      "RCA Victor introduced the 45 RPM single in December 1948. Affordable for teenagers, the format shaped song structure: rock songs had to be short, immediate, impactful. The 3-minute limit became creative constraint.",
      "The Regency TR-1 (October 18, 1954) was the first commercial transistor radio. Teenagers could now listen privately-in bedrooms, at school, away from parents. Rock became youth property.",
    ],
    figures: [
      {
        name: "Leo Fender",
        epithet: "Solid-Body Guitar Creator",
        born: "August 10, 1909, Anaheim, California",
        died: "March 21, 1991",
        domains: ["Invention", "Manufacturing", "Vision"],
        description: "Created the first mass-produced solid-body electric guitar (Telecaster, 1950; Stratocaster, 1954). Rock and Roll Hall of Fame inductee (1992). Never learned to play guitar himself, but transformed what the instrument could do.",
        isFeatured: true,
      },
      {
        name: "Les Paul",
        epithet: "Inventor and Guitarist",
        born: "June 9, 1915, Waukesha, Wisconsin",
        died: "August 12, 2009",
        domains: ["Guitar", "Multitrack Recording", "Innovation"],
        description: "Created 'The Log' solid-body prototype; invented multitrack recording. National Inventors Hall of Fame (2005), Rock and Roll Hall of Fame (1988). Commissioned the first 8-track recorder from Ampex.",
        isFeatured: true,
      },
      {
        name: "Sam Phillips",
        epithet: "Sun Records Founder and Technical Innovator",
        born: "January 5, 1923, Florence, Alabama",
        died: "July 30, 2003",
        domains: ["Recording", "Production", "Discovery"],
        description: "Produced 'Rocket 88,' discovered Elvis, invented the slapback echo technique. First non-performer inducted into Rock and Roll Hall of Fame (1986). His vision of bridging Black and white music transformed American culture.",
        quote: "I knew that for black music to come to its rightful place in this country, we had to have some white singers come over and do black music-not copy it, not change, not sweeten it.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 5
  {
    id: "ch5",
    number: "Chapter V",
    title: "The Crescent City Sound",
    subtitle: "New Orleans: The Rhythmic Foundation (1945-1960)",
    era: "explosion",
    epigraph: {
      text: "The sound was in the room, not in the equipment.",
      source: "Cosimo Matassa",
    },
    narrative: [
      "New Orleans gave rock and roll its rhythm. The city's unique musical culture-blending Caribbean, African, French, and American traditions-produced the backbeat that would define the music.",
      "Drummer Earl Palmer is 'correctly identified as the man who put the backbeat in rock 'n' roll'-emphasizing beats 2 and 4 rather than 1 and 3. This rhythmic innovation, rooted in New Orleans second-line tradition, became rock's defining pulse.",
      "Cosimo Matassa opened J&M Recording Studio at 838 North Rampart Street in 1945. In just 15 x 16 feet, he captured virtually every New Orleans R&B hit from the late 1940s through the early 1970s. Fats Domino's 'The Fat Man' (1949), Little Richard's 'Tutti Frutti' (1955), and countless others were born here.",
      "Producer Dave Bartholomew and artist Fats Domino created over 40 Top 10 R&B hits together. Bartholomew wrote arrangements; Domino delivered the rolling piano and warm vocals. Their partnership defined the New Orleans sound.",
      "Henry Roeland Byrd-'Professor Longhair'-created the rumba-boogie piano style that influenced every New Orleans pianist who followed. His 1953 recording 'Tipitina' is now in the Library of Congress National Recording Registry.",
    ],
    figures: [
      {
        name: "Cosimo Matassa",
        epithet: "New Orleans Recording Engineer",
        born: "April 13, 1926, New Orleans",
        died: "September 11, 2014",
        domains: ["Recording", "Studio", "Legacy"],
        description: "Captured virtually every New Orleans R&B hit from late 1940s through early 1970s at J&M Studio. Rock and Roll Hall of Fame inductee (2012).",
        quote: "The sound was in the room, not in the equipment.",
        isFeatured: true,
      },
      {
        name: "Earl Palmer",
        epithet: "The Man Who Put the Backbeat in Rock 'n' Roll",
        born: "October 25, 1924, New Orleans",
        died: "September 19, 2008",
        domains: ["Drums", "Backbeat", "Session Work"],
        description: "Drummer on Little Richard's 'Tutti Frutti,' Fats Domino's hits, countless others. Session musician on over 250 records. Rock and Roll Hall of Fame inductee (2000).",
        quote: "I wasn't thinking about inventing anything. I was just playing what felt right.",
        isFeatured: true,
      },
      {
        name: "Professor Longhair",
        epithet: "The Bach of Rock",
        born: "December 19, 1918, Bogalusa, Louisiana",
        died: "January 30, 1980",
        domains: ["Piano", "Rumba-Boogie", "Influence"],
        description: "Created the rumba-boogie piano style influencing all New Orleans pianists. 'Tipitina' (1953) is in the National Recording Registry.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 6
  {
    id: "ch6",
    number: "Chapter VI",
    title: "Where the Soul Was Recorded",
    subtitle: "Memphis and Sun Studio (1950-1959)",
    era: "explosion",
    narrative: [
      "Memphis was where the races met in music-not without tension, not without exploitation, but with revolutionary results.",
      "Sam Phillips opened Memphis Recording Service (later Sun Studio) at 706 Union Avenue on January 3, 1950. He recorded Black blues artists for independent labels, capturing Howlin' Wolf, B.B. King, and Ike Turner.",
      "But Phillips saw something more: 'I knew that for black music to come to its rightful place in this country, we had to have some white singers come over and do black music.'",
      "In August 1953, an 18-year-old truck driver paid $4 to record a demo for his mother. Elvis Presley's voice impressed Marion Keisker, Phillips's assistant. A year later, on July 5, 1954, Elvis returned to the studio. After hours of frustrating attempts at ballads, he started fooling around with Arthur Crudup's 'That's All Right.'",
      "Phillips recognized the sound immediately. On July 7, 1954, DJ Dewey Phillips (no relation) played 'That's All Right' on WHBQ Memphis. The phone lines exploded.",
      "A white boy singing Black music-not imitating, not sanitizing, but inhabiting it. The crossover began.",
      "On December 4, 1956, Elvis, Jerry Lee Lewis, Carl Perkins, and Johnny Cash gathered for an impromptu jam session at Sun. The 'Million Dollar Quartet' session captured rock's original energy in an unguarded moment.",
    ],
    figures: [
      {
        name: "Elvis Presley",
        epithet: "The King / The Crossover",
        born: "January 8, 1935, Tupelo, Mississippi",
        died: "August 16, 1977",
        domains: ["Voice", "Performance", "Cultural Bridge"],
        description: "Bridged Black and white music for mass audience. Record sales over 1 billion worldwide. Changed what was possible in popular music-and who could sell it.",
        quote: "A lot of people seem to think I started this business. But rock 'n' roll was here a long time before I came along. Nobody can sing it like colored people.",
        quoteContext: "1957",
        isFeatured: true,
      },
      {
        name: "Jerry Lee Lewis",
        epithet: "The Killer",
        born: "September 29, 1935, Ferriday, Louisiana",
        died: "October 28, 2022",
        domains: ["Piano", "Performance", "Wild Man"],
        description: "Wild piano style; 'Whole Lotta Shakin' Going On' (1957), 'Great Balls of Fire' (1957). Career derailed by marriage to 13-year-old cousin (1958). Uncompromising rock and roll energy.",
        quote: "Rock and roll is not a sin. Some of the people who play it are sinners.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 7
  {
    id: "ch7",
    number: "Chapter VII",
    title: "The House That Blues Built",
    subtitle: "Chicago and Chess Records (1950-1969)",
    era: "explosion",
    narrative: [
      "When the Delta blues came to Chicago, it got loud. The Chess brothers-Polish Jewish immigrants-created the label that electrified the blues and birthed rock and roll.",
      "Leonard Chess (born Lejzor Czyz) and Phil Chess (born Fiszel Czyz) owned nightclubs on Chicago's South Side where bluesmen performed. In 1950, they founded Chess Records. At 2120 South Michigan Avenue, they built a catalog that defined electric blues.",
      "Muddy Waters brought the Delta blues north and plugged it in. His 1958 UK tour shocked British audiences-electric blues at volume levels they'd never experienced. He planted seeds that would grow into the British Invasion.",
      "Chuck Berry was the complete package: guitar innovation, lyrical wit, showmanship, and business sense. 'Maybellene' (1955) was his breakthrough-#1 R&B, #5 Pop, one million copies sold. But Berry lost royalties for 31 years. Alan Freed demanded co-writing credit as payment for radio play. Berry didn't regain full ownership until 1986.",
      "Ellas McDaniel's self-titled 1955 debut introduced the 'Bo Diddley beat'-shave-and-a-haircut, two bits. The rhythm appears in Rolling Stones, U2, and countless other songs.",
    ],
    figures: [
      {
        name: "Chuck Berry",
        epithet: "Rock's Supreme Poet",
        born: "October 18, 1926, St. Louis, Missouri",
        died: "March 18, 2017",
        domains: ["Guitar", "Lyrics", "Duck Walk"],
        description: "'Maybellene' (1955) moved Chess from R&B into mainstream rock. Lost royalties for 31 years when Alan Freed was added to credits. The prototype for what a rock and roll star should be.",
        quote: "It used to be called boogie-woogie, it used to be called blues, it used to be called rhythm and blues... It's called rock now.",
        isFeatured: true,
      },
      {
        name: "Bo Diddley",
        epithet: "Rhythm Innovator",
        born: "December 30, 1928, McComb, Mississippi",
        died: "June 2, 2008",
        domains: ["Guitar", "The Beat", "Rectangular Guitar"],
        description: "Self-titled 1955 debut introduced the 'Bo Diddley beat.' The rhythm appears in countless songs, but Diddley received nothing for its use.",
        quote: "Don't trust nobody but your mama, and even then, look at her real good.",
        isFeatured: true,
        imageUrl: IMAGES.boDiddley1957,
        imageAttribution: "Public domain, via Wikimedia Commons",
      },
      {
        name: "Leonard Chess & Phil Chess",
        epithet: "Chess Records Founders",
        born: "Leonard: 1917; Phil: 1921",
        died: "Leonard: 1969; Phil: 2016",
        domains: ["Label", "Chicago", "Legacy"],
        description: "Polish immigrant brothers who recorded Chuck Berry, Muddy Waters, Howlin' Wolf. 2120 South Michigan Avenue became a pilgrimage site for British bands.",
        isFeatured: false,
      },
    ],
  },

  // CHAPTER 8
  {
    id: "ch8",
    number: "Chapter VIII",
    title: "The Crossover and The Theft",
    subtitle: "Race, Covers, and Erasure (1950-1960)",
    era: "explosion",
    contentWarning: "This chapter discusses systemic racism, economic exploitation, and racial violence in the music industry.",
    epigraph: {
      text: "Didn't get no money from them at all. Everybody livin' in a house but me. I'm just livin.",
      source: "Big Mama Thornton, 1984",
    },
    narrative: [
      "Rock and roll's history cannot be separated from the history of American racism-in its creation, exploitation, erasure, and eventual (partial) integration.",
      "In the 1950s, white artists routinely covered Black artists' songs with sanitized arrangements for segregated radio markets. The results were stark:",
      "Big Mama Thornton's 'Hound Dog' (1953): #1 R&B for seven weeks. She received a flat fee of $500. No royalties. Elvis's 1956 version sold 10 million copies. Thornton died penniless in a Los Angeles boarding house in 1984.",
      "Little Richard's 'Tutti Frutti': Pat Boone's cover outsold the original. Richard said: 'When Pat Boone covered my record, I was mad, I wanted to get him... he was stoppin' my progress.'",
      "LaVern Baker's 'Tweedle Dee': Georgia Gibbs's cover used nearly identical arrangement. Baker was so frustrated she petitioned Congress (unsuccessfully) to outlaw note-for-note covers.",
      "Chuck Berry lost 'Maybellene' royalties for 31 years when Alan Freed was added to the writing credits as payola. Bo Diddley's beat was copied worldwide; he received nothing. The pattern repeated across the industry.",
      "Yet something else was happening. At rock and roll shows, the segregated seating-often enforced by literal ropes-began to collapse. As Ralph Bass, Chess Records producer, remembered: 'Then, hell, the rope would come down, and they'd all be dancing together.'",
      "Music became a space where integration happened in practice before it was achieved in law. This doesn't excuse the exploitation-but it explains why rock mattered.",
    ],
    figures: [
      {
        name: "Big Mama Thornton",
        epithet: "'Hound Dog' Original",
        born: "December 11, 1926, Ariton, Alabama",
        died: "July 25, 1984",
        domains: ["Blues", "Voice", "Exploitation Victim"],
        description: "Her 1953 version of 'Hound Dog' topped R&B chart for seven weeks, sold 500,000+ copies. Paid flat fee of $500, no royalties. Died penniless in Los Angeles boarding house while Elvis's cover earned millions.",
        quote: "Didn't get no money from them at all. Everybody livin' in a house but me. I'm just livin.",
        quoteContext: "1984",
        isFeatured: true,
        imageUrl: IMAGES.bigMamaThornton,
        imageAttribution: "Barbara Weinberg Barefield, CC BY-SA 3.0, via Wikimedia Commons",
      },
      {
        name: "Little Richard",
        epithet: "The Architect of Rock and Roll",
        born: "December 5, 1932, Macon, Georgia",
        died: "May 9, 2020",
        domains: ["Piano", "Voice", "Showmanship"],
        description: "Recorded 'Tutti Frutti,' 'Long Tall Sally,' 'Good Golly Miss Molly.' His flamboyant style influenced everyone from the Beatles to Prince. Self-proclaimed 'architect of rock 'n' roll.'",
        quote: "I am the innovator. I am the originator. I am the emancipator. I am the architect of rock 'n' roll.",
        isFeatured: true,
        imageUrl: IMAGES.littleRichard,
        imageAttribution: "Anna Bleker, Public domain, via Wikimedia Commons",
      },
      {
        name: "Ruth Brown",
        epithet: "Miss Rhythm",
        born: "January 12, 1928, Portsmouth, Virginia",
        died: "November 17, 2006",
        domains: ["Voice", "Atlantic Records", "Advocate"],
        description: "Her hits made Atlantic 'The House That Ruth Built.' Left Atlantic in 1960s with no savings; worked as bus driver, floor scrubber. Won 20-year legal battle; received $20,000 in back royalties.",
        quote: "They called Atlantic 'The House That Ruth Built.' But Ruth wasn't getting paid.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 9
  {
    id: "ch9",
    number: "Chapter IX",
    title: "The Feedback Loop",
    subtitle: "The British Invasion Returns the Blues (1958-1966)",
    era: "invasion",
    epigraph: {
      text: "We wanted to turn people on to blues. That was the whole idea.",
      source: "Keith Richards",
    },
    narrative: [
      "The British Invasion was not merely an export of American music-it was a transformation that changed American rock itself.",
      "In October 1958, Muddy Waters toured the UK. British audiences, expecting acoustic folk blues, were stunned by his electric ferocity. Young musicians like Eric Burdon and Jimmy Page saw their future in that sound.",
      "Alexis Korner and Cyril Davies founded Blues Incorporated in 1961-'Britain's First Rhythm & Blues Band.' The Ealing Club became a training ground. Young musicians who would become the Rolling Stones, Cream, and Led Zeppelin cycled through.",
      "John Mayall's Bluesbreakers was a finishing school for guitarists: Eric Clapton, Peter Green, Mick Taylor all learned their craft there.",
      "On February 9, 1964, the Beatles appeared on Ed Sullivan. 73 million Americans watched. The British Invasion began.",
      "But the British bands carried a secret cargo: American blues. The Rolling Stones named themselves after Muddy Waters's song. They recorded at Chess Records, 2120 South Michigan Avenue. The Animals' 'House of the Rising Sun' introduced folk-blues to pop audiences.",
      "The irony was profound: white British teenagers reintroduced Black American music to white American teenagers. The feedback loop was complete-but the original creators were still being credited last.",
    ],
    figures: [
      {
        name: "Alexis Korner",
        epithet: "Founding Father of British Blues",
        born: "April 19, 1928, Paris, France",
        died: "January 1, 1984",
        domains: ["British Blues", "Mentor", "Pioneer"],
        description: "Co-founded Blues Incorporated 1961; ran the Ealing Club. Rock and Roll Hall of Fame inductee (2024). Trained a generation of British blues musicians.",
        quote: "We were just trying to play the music we loved. We never imagined it would come back to change America.",
        isFeatured: true,
      },
      {
        name: "The Beatles",
        epithet: "Liverpool's Gift to the World",
        born: "Formed 1960",
        domains: ["British Invasion", "Pop", "Revolution"],
        description: "Hamburg crucible transformed raw talent into world-beaters. 73 million watched Ed Sullivan appearance (February 9, 1964). Changed what was possible in popular music.",
        quote: "I was born in Liverpool, but I grew up in Hamburg.",
        quoteContext: "John Lennon",
        isFeatured: true,
        imageUrl: IMAGES.cavernClub,
        imageAttribution: "CC0, Public Domain, via Wikimedia Commons",
      },
      {
        name: "The Rolling Stones",
        epithet: "Blues Devotees",
        born: "Formed 1962",
        domains: ["British Blues", "Longevity", "R&B"],
        description: "Named after Muddy Waters song; recorded at Chess Records. Mick Jagger and Keith Richards reconnected over blues albums. Introduced American audiences to their own blues heritage.",
        quote: "We wanted to turn people on to blues. That was the whole idea.",
        quoteContext: "Keith Richards",
        isFeatured: true,
      },
      {
        name: "Eric Clapton",
        epithet: "Blues Purist Turned Guitar God",
        born: "March 30, 1945, Ripley, England",
        domains: ["Guitar", "Bluesbreakers", "Cream"],
        description: "Left Yardbirds for being 'too commercial'; joined Mayall, then Cream. 'Bluesbreakers with Eric Clapton' (1966) redefined electric blues guitar.",
        quote: "I wanted to get as close to the original blues as possible.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 10
  {
    id: "ch10",
    number: "Chapter X",
    title: "Global Amplification",
    subtitle: "Rock Spreads Worldwide (1964-1980)",
    era: "invasion",
    narrative: [
      "Rock and roll was never just American or British. Almost as soon as it had a name, it began to travel-and everywhere it landed, it adapted.",
      "Brazil: Caetano Veloso and Gilberto Gil led Tropicalia-a movement fusing psychedelic rock with Brazilian traditions. Os Mutantes became the 'house band' of the movement. But the music was too radical for Brazil's military dictatorship. In 1969, Veloso and Gil were arrested, imprisoned, and eventually exiled.",
      "Japan: The Beatles' performances at Budokan in June-July 1966 triggered the 'Group Sounds' explosion. Japanese bands adapted rock to local sensibilities, creating a distinct scene that would evolve into J-pop and visual kei.",
      "Germany: In the late 1960s, German musicians rejected both Anglo-American rock and conservative German culture. Kraftwerk (Dusseldorf, 1970), Neu!, Tangerine Dream, and Can created something new: electronic rock that would influence punk, new wave, and all electronic music that followed.",
      "Everywhere else: Australia had its own rock explosion. South Africa's scene survived apartheid. Latin American rock developed regional variants. The music couldn't be stopped at any border.",
    ],
    figures: [
      {
        name: "Caetano Veloso & Gilberto Gil",
        epithet: "Tropicalia Founders",
        born: "Veloso: 1942; Gil: 1942",
        domains: ["Brazilian Rock", "Tropicalia", "Political Art"],
        description: "Fused psychedelia with Brazilian traditions. Arrested by military regime 1969; later exiled. Returned to reshape Brazilian music.",
        quote: "The violent aspect of rock 'n' roll interested us more because we were seeing violence.",
        quoteContext: "Caetano Veloso",
        isFeatured: true,
      },
      {
        name: "Kraftwerk",
        epithet: "Electronic Rock Pioneers",
        born: "Formed 1970, Dusseldorf",
        domains: ["Electronic", "Krautrock", "Innovation"],
        description: "Created the template for electronic music. Their influence extends from Hip-Hop to EDM to synthpop.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 11
  {
    id: "ch11",
    number: "Chapter XI",
    title: "The Fracturing",
    subtitle: "Genre Evolution (1968-1995)",
    era: "evolution",
    epigraph: {
      text: "We decided to start our own group because we were bored with everything we heard.",
      source: "Joey Ramone",
    },
    narrative: [
      "Rock didn't stay unified. From the late 1960s, it splintered into genres-each with its own rules, heroes, and audiences.",
      "Heavy Metal (1968-): Black Sabbath emerged from Birmingham, England in 1968. Their doom-laden sound-slow, heavy, dark-became heavy metal. Led Zeppelin added virtuosity. Deep Purple added classical influences. By the 1980s, metal had fractured further: thrash (Metallica), hair metal (Motley Crue), and more.",
      "Punk (1974-): CBGB at 315 Bowery, New York, became ground zero. The Ramones stripped rock to three chords and aggression. Blondie brought pop sensibility. Television added art-rock complexity. Across the Atlantic, the Sex Pistols and The Clash made punk political. 'Anarchy in the U.K.' (1976) was banned from BBC but reached #38.",
      "New Wave (1978-): Punk's aggression gave way to artier approaches. Talking Heads, Devo, The Cars, and countless others built on punk's energy but added synthesizers, irony, and accessibility.",
      "MTV and the Video Age (1981-): On August 1, 1981, MTV launched with 'Video Killed the Radio Star.' The channel transformed rock into a visual medium. Looks mattered as much as sound.",
      "Grunge (1991-): Sub Pop Records in Seattle signed Nirvana, Soundgarden, and Pearl Jam. 'Nevermind' (September 24, 1991) broke grunge into the mainstream. Kurt Cobain became rock's last great martyr.",
    ],
    figures: [
      {
        name: "The Ramones",
        epithet: "Punk Originators",
        born: "Formed 1974, Queens, New York",
        died: "Joey: 2001; Johnny: 2004; Dee Dee: 2002; Tommy: 2014",
        domains: ["Punk", "Speed", "Simplicity"],
        description: "Stripped rock to three chords and two minutes. 'Blitzkrieg Bop' (1976) became punk anthem. Defined what punk rock could be.",
        quote: "We decided to start our own group because we were bored with everything we heard.",
        quoteContext: "Joey Ramone",
        isFeatured: true,
      },
      {
        name: "Kurt Cobain",
        epithet: "Grunge Martyr",
        born: "February 20, 1967, Aberdeen, Washington",
        died: "April 5, 1994",
        domains: ["Grunge", "Nirvana", "Alternative"],
        description: "Nirvana frontman; 'Nevermind' sold 30 million copies. Suicide at 27 ended grunge's brightest voice.",
        quote: "I'd rather be hated for who I am than loved for who I am not.",
        isFeatured: true,
      },
      {
        name: "Ozzy Osbourne",
        epithet: "Heavy Metal Pioneer",
        born: "December 3, 1948, Birmingham, England",
        domains: ["Heavy Metal", "Black Sabbath", "Theatrics"],
        description: "Black Sabbath frontman 1968-1979. Defined heavy metal vocal style and theatrics.",
        quote: "I'm the Prince of Darkness. I'm metal.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 12
  {
    id: "ch12",
    number: "Chapter XII",
    title: "The Silenced Half",
    subtitle: "Women in Rock (1920s-Present)",
    era: "evolution",
    epigraph: {
      text: "We had to fight twice as hard to be taken half as seriously.",
      source: "Ann Wilson, Heart",
    },
    narrative: [
      "Women have been in rock since before it had a name. Ma Rainey was recording blues in the 1920s. Sister Rosetta Tharpe invented electric guitar distortion. Big Mama Thornton's 'Hound Dog' was stolen and made famous by a man.",
      "Yet rock's history has systematically erased, diminished, and sexualized women's contributions. This chapter restores the record.",
      "The Pioneers: Wanda Jackson was the 'Queen of Rockabilly'-raw, powerful, overlooked. Brenda Lee was a teenage sensation. These women competed in a field that dismissed them.",
      "The 1960s-70s Breakthroughs: Janis Joplin became rock's first female superstar, dead at 27. Grace Slick fronted Jefferson Airplane. Tina Turner survived an abusive marriage to emerge as a solo icon. Heart's Ann and Nancy Wilson proved women could play hard rock at the highest level.",
      "The 1980s-90s Reclamation: Joan Jett, rejected by 23 labels, formed her own (Blackheart Records) and had hit after hit. The Go-Go's were the first all-female band to write their own songs and play their own instruments on a #1 album.",
      "Riot Grrrl: In the early 1990s, Bikini Kill, Sleater-Kinney, and others created riot grrrl-feminist punk that explicitly named the industry's sexism. Kathleen Hanna's performances directly confronted the male gaze.",
      "Today, women still face barriers in rock-fewer festival slots, less critical attention, ongoing sexualization. But the history cannot be rewritten without them.",
    ],
    figures: [
      {
        name: "Wanda Jackson",
        epithet: "Queen of Rockabilly",
        born: "October 20, 1937, Maud, Oklahoma",
        domains: ["Rockabilly", "Pioneer", "Country"],
        description: "Raw, powerful voice; toured with Elvis before he was famous. Rock and Roll Hall of Fame inductee (2009).",
        quote: "I was told women couldn't sing rock and roll. I sang it anyway.",
        isFeatured: true,
      },
      {
        name: "Janis Joplin",
        epithet: "Rock's First Female Superstar",
        born: "January 19, 1943, Port Arthur, Texas",
        died: "October 4, 1970",
        domains: ["Blues Rock", "Psychedelic", "Voice"],
        description: "Fronted Big Brother and the Holding Company; solo career cut short. Died at 27 (overdose).",
        quote: "Don't compromise yourself. You are all you've got.",
        isFeatured: true,
        imageUrl: IMAGES.janisJoplin1970,
        imageAttribution: "Public domain (PD US no notice), via Wikimedia Commons",
      },
      {
        name: "Joan Jett",
        epithet: "The Queen of Rock 'n' Roll",
        born: "September 22, 1958, Wynnewood, Pennsylvania",
        domains: ["Punk Rock", "Independence", "Anthem"],
        description: "Rejected by 23 labels; formed Blackheart Records. 'I Love Rock 'n' Roll' (1981) eight weeks at #1.",
        quote: "I don't give a damn 'bout my bad reputation.",
        isFeatured: true,
      },
      {
        name: "Ann Wilson & Nancy Wilson",
        epithet: "Heart",
        born: "Ann: 1950; Nancy: 1954",
        domains: ["Hard Rock", "Sisters", "Vocals/Guitar"],
        description: "Proved women could lead a hard rock band. 'Barracuda' (1977), 'Crazy on You' (1976).",
        quote: "We had to fight twice as hard to be taken half as seriously.",
        quoteContext: "Ann Wilson",
        isFeatured: true,
      },
      {
        name: "Kathleen Hanna",
        epithet: "Riot Grrrl Pioneer",
        born: "November 12, 1968, Portland, Oregon",
        domains: ["Feminist Punk", "Bikini Kill", "Activism"],
        description: "Bikini Kill frontwoman; defined feminist punk.",
        quote: "We're not anti-boy, we're pro-girl.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 13
  {
    id: "ch13",
    number: "Chapter XIII",
    title: "The Invisible Architects",
    subtitle: "Producers, Engineers, and Session Musicians",
    era: "evolution",
    narrative: [
      "Behind every rock hit, there are names you've never heard. Producers who shaped the sound. Engineers who captured it. Session musicians who played on more hits than the stars themselves.",
      "The Producers: Phil Spector created the 'Wall of Sound' at Gold Star Studios-multiple instruments playing the same parts, washed in echo. The Ronettes' 'Be My Baby' was his masterpiece. George Martin was the 'Fifth Beatle,' arranging and producing their evolution from pop to art. Brian Eno invented ambient music and produced U2, Talking Heads, David Bowie.",
      "The Session Musicians: The Wrecking Crew in Los Angeles played on more #1 hits than anyone can count. Drummer Hal Blaine played on 40 #1 singles. Bassist Carol Kaye played on 'Good Vibrations,' 'Wichita Lineman,' and thousands more.",
      "The Muscle Shoals Rhythm Section ('The Swampers') gave Aretha Franklin, Wilson Pickett, and the Rolling Stones their sound. Four white musicians in Alabama backing soul legends.",
      "The Funk Brothers at Motown played on more #1 hits than the Beatles, Elvis, Rolling Stones, and Beach Boys combined-yet most died unknown and uncompensated.",
    ],
    figures: [
      {
        name: "Phil Spector",
        epithet: "'Wall of Sound' Creator",
        born: "December 26, 1939, Bronx, New York",
        died: "January 16, 2021",
        domains: ["Production", "Wall of Sound", "Innovation"],
        description: "Created dense, reverberant production technique at Gold Star Studios. Produced Ronettes, Crystals, Righteous Brothers. Note: Convicted of murder in 2009.",
        quote: "I don't have a style. I have a sound.",
        isFeatured: true,
      },
      {
        name: "George Martin",
        epithet: "The Fifth Beatle",
        born: "January 3, 1926, Holloway, London",
        died: "March 8, 2016",
        domains: ["Production", "Arrangement", "Beatles"],
        description: "Produced virtually all Beatles recordings. Arranged strings, experimented with tape effects, enabled artistic evolution.",
        quote: "Without him, the Beatles would not be the Beatles.",
        isFeatured: true,
      },
      {
        name: "Hal Blaine",
        epithet: "Most Recorded Drummer in History",
        born: "February 5, 1929, Holyoke, Massachusetts",
        died: "March 11, 2019",
        domains: ["Drums", "Session Work", "Wrecking Crew"],
        description: "Played on 40 #1 singles, 150 Top 10 hits. Member of The Wrecking Crew.",
        quote: "I never got famous, but I got paid.",
        isFeatured: true,
      },
      {
        name: "Carol Kaye",
        epithet: "Bass Legend",
        born: "March 24, 1935, Everett, Washington",
        domains: ["Bass", "Session Work", "Pioneer"],
        description: "Played bass on 'Good Vibrations,' 'Wichita Lineman,' thousands more. One of few female session musicians in male-dominated field.",
        quote: "I played on so many records, I stopped counting.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 14
  {
    id: "ch14",
    number: "Chapter XIV",
    title: "The Unfinished Reckoning",
    subtitle: "Race, Legacy, and Debts Unpaid (1986-Present)",
    era: "present",
    narrative: [
      "Rock and roll has begun to reckon with its history-but the reckoning is incomplete.",
      "The Rock and Roll Hall of Fame opened in Cleveland in 1995, acknowledging the city's role in popularizing the genre. The first induction ceremony (1986) saw 60% of inductees being African American. But the institution has faced criticism for how it weighs commercial success versus creative innovation, and for its treatment of Black artists as 'influences' rather than creators.",
      "Ruth Brown's 20-year legal battle resulted in $20,000 in back royalties from Atlantic-and the creation of the Rhythm and Blues Foundation to help aging artists. Chuck Berry regained 'Maybellene' writing credit in 1986, 31 years after release.",
      "Sister Rosetta Tharpe-who invented electric guitar distortion before anyone-was inducted into the Rock and Roll Hall of Fame in 2017, 44 years after her death.",
      "Today, hip-hop has surpassed rock as America's most consumed music genre (2017). Some see this as a return: Black musical innovation reclaiming the mainstream. Others see rock itself as history-a genre whose demographic has aged out.",
      "The question persists: Can a music born from Black innovation, taken by white appropriation, and spread globally ever settle its debts? Or does the reckoning never end?",
    ],
    figures: [
      {
        name: "The Rock and Roll Hall of Fame",
        epithet: "The Temple of Recognition",
        born: "First induction: 1986; Building opened: 1995",
        domains: ["Recognition", "Cleveland", "Institution"],
        description: "First induction ceremony (1986) saw 60% of inductees African American. Continues to wrestle with questions of who gets credit for creating rock and roll.",
        isFeatured: true,
      },
      {
        name: "The Rhythm and Blues Foundation",
        epithet: "Advocate for Pioneers",
        born: "Founded 1988",
        domains: ["Advocacy", "Royalties", "Justice"],
        description: "Created after Ruth Brown's legal battle. Works to ensure aging R&B and rock pioneers receive recognition and financial support.",
        isFeatured: true,
      },
    ],
  },

  // EPILOGUE
  {
    id: "epilogue",
    number: "Epilogue",
    title: "The Noise Continues",
    subtitle: "What Rock and Roll Is Now",
    era: "present",
    narrative: [
      "In 1973, a party in the South Bronx invented hip-hop-using rock and funk breaks, extending them, building something new. The cycle continued.",
      "Rock and roll is no longer the dominant popular music form. Hip-hop and pop command the charts. Guitar sales have declined. Festivals that once featured rock now headline DJs and rappers.",
      "Yet something persists. Teenagers still discover the classic records. New bands still plug in amplifiers and seek distortion. The guitar remains the most played instrument in America.",
      "Rock and roll was never just a genre. It was an attitude: amplification over subtlety, energy over technique, volume over restraint. That attitude survives in metal, in punk's descendants, in hip-hop's aggression, in pop's excess.",
      "The noise converged in the late 1940s. It exploded in the 1950s. It transformed in the 1960s and 70s. It fragmented in the 80s and 90s. It may no longer dominate-but it cannot be silenced.",
      "The break is always playing. The amp is always on. The noise continues.",
    ],
    figures: [],
  },
];

// ==================== SOURCES DATA ====================

const sources = {
  books: [
    { title: "The Sound of the City: The Rise of Rock and Roll - Charlie Gillett", url: "#" },
    { title: "Unsung Heroes of Rock 'n' Roll - Nick Tosches", url: "#" },
    { title: "Sweet Soul Music: Rhythm and Blues and the Southern Dream of Freedom - Peter Guralnick", url: "#" },
    { title: "Mystery Train: Images of America in Rock 'n' Roll Music - Greil Marcus", url: "#" },
    { title: "Just Around Midnight: Rock and Roll and the Racial Imagination - Jack Hamilton", url: "#" },
    { title: "Shout, Sister, Shout!: The Untold Story of Rock-and-Roll Trailblazer Sister Rosetta Tharpe - Gayle Wald", url: "#" },
    { title: "Chess Records: An Illustrated History - John Collis", url: "#" },
    { title: "Good Rockin' Tonight: Sun Records and the Birth of Rock 'n' Roll - Colin Escott", url: "#" },
  ],
  archives: [
    { title: "Rock and Roll Hall of Fame Library and Archives", url: "https://www.rockhall.com/library-archives" },
    { title: "Library of Congress - National Recording Registry", url: "https://www.loc.gov/programs/national-recording-preservation-board/recording-registry/" },
    { title: "Smithsonian National Museum of African American History and Culture", url: "https://nmaahc.si.edu/" },
    { title: "Michael Ochs Archives", url: "#" },
    { title: "Blues Foundation Archives", url: "https://blues.org/" },
  ],
  documentaries: [
    { title: "The History of Rock 'n' Roll (1995) - Time-Life/Warner", url: "#" },
    { title: "20 Feet from Stardom (2013)", url: "#" },
    { title: "Standing in the Shadows of Motown (2002)", url: "#" },
    { title: "The Wrecking Crew (2008)", url: "#" },
    { title: "Sister Rosetta Tharpe: The Godmother of Rock & Roll (2011)", url: "#" },
  ],
};

// ==================== SCROLL-LOCK HOOK ====================

const useScrollLock = (isLocked: boolean) => {
  const scrollDelta = useRef(0);
  const [progress, setProgress] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!isLocked) {
      scrollDelta.current = 0;
      return;
    }

    // Lock body scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollDelta.current += e.deltaY;
      // Normalize: ~2000px of scroll = 100% progress
      const newProgress = Math.min(Math.max(scrollDelta.current / 2000, 0), 1);
      setProgress(newProgress);
    };

    const handleTouchStart = (e: TouchEvent) => {
      lastScrollY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const delta = lastScrollY.current - e.touches[0].clientY;
      lastScrollY.current = e.touches[0].clientY;
      scrollDelta.current += delta * 2;
      const newProgress = Math.min(Math.max(scrollDelta.current / 2000, 0), 1);
      setProgress(newProgress);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isLocked]);

  return { progress, setProgress };
};

// ==================== HERO SECTION ====================

interface HeroProps {
  onComplete: () => void;
}

const Hero: React.FC<HeroProps> = ({ onComplete }) => {
  const heroRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const { progress, setProgress } = useScrollLock(isLocked && isInView);

  // Show skip button after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Detect when hero scrolls out of view
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Release lock when animation completes
  useEffect(() => {
    if (progress >= 1) {
      const timer = setTimeout(() => {
        setIsLocked(false);
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  const handleSkip = () => {
    setProgress(1);
    setTimeout(() => {
      setIsLocked(false);
      onComplete();
    }, 100);
  };

  // Calculate stream positions based on progress
  const getStreamStyle = (index: number): React.CSSProperties => {
    // Streams start at edges (25-40% scroll) and converge at center (55-70%)
    const streamStart = 0.25;
    const streamMerge = 0.7;
    const streamProgress = Math.min(Math.max((progress - streamStart) / (streamMerge - streamStart), 0), 1);

    // Each stream starts from a different edge position
    const startPositions = [
      { x: -120, y: -100 },  // Gospel - top left
      { x: 120, y: -100 },   // Boogie - top right
      { x: -150, y: 50 },    // Blues - bottom left
      { x: 150, y: 50 },     // Jump - bottom right
      { x: 0, y: 150 },      // R&B - bottom center
    ];

    const start = startPositions[index];
    const opacity = progress >= streamStart ? Math.min((progress - streamStart) * 4, 1) : 0;
    const x = start.x * (1 - streamProgress);
    const y = start.y * (1 - streamProgress);
    const scale = 0.8 + (streamProgress * 0.4); // Grow as they converge

    return {
      opacity,
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
      transition: 'opacity 0.3s ease, transform 0.1s ease-out',
    };
  };

  // Text phases based on progress
  const questionOpacity = progress >= 0 && progress < 0.25 ? Math.min(progress * 6.67, 1) : progress >= 0.25 ? 1 - ((progress - 0.25) * 4) : 0;
  const complicatedOpacity = progress >= 0.4 && progress < 0.7 ? Math.min((progress - 0.4) * 3.33, 1) : progress >= 0.7 ? 1 - ((progress - 0.7) * 5) : 0;
  const neverInventedOpacity = progress >= 0.7 && progress < 0.85 ? Math.min((progress - 0.7) * 6.67, 1) : progress >= 0.85 ? 1 : 0;
  const titleOpacity = progress >= 0.85 ? Math.min((progress - 0.85) * 6.67, 1) : 0;
  const titleScale = progress >= 0.85 ? 0.9 + (Math.min((progress - 0.85) / 0.15, 1) * 0.1) : 0.9;

  // Convergence burst effect
  const burstOpacity = progress >= 0.55 && progress < 0.7 ? Math.sin((progress - 0.55) / 0.15 * Math.PI) : 0;

  return (
    <section ref={heroRef} className="hero-section hero-section--scroll-lock">
      <div className="hero-background" />

      {/* Convergence streams */}
      <div className="hero-convergence" aria-hidden="true">
        {['gospel', 'boogie', 'blues', 'jump', 'rnb'].map((stream, index) => (
          <div
            key={stream}
            className={`convergence-stream convergence-stream--${stream}`}
            style={{
              ...getStreamStyle(index),
              position: 'absolute',
              left: '50%',
              top: '50%',
            }}
          />
        ))}

        {/* Convergence burst */}
        <div
          className="convergence-burst"
          style={{ opacity: burstOpacity }}
          aria-hidden="true"
        />
      </div>

      {/* Phase 1: The Question (0-25%) */}
      <div
        className="hero-text-phase"
        style={{ opacity: questionOpacity }}
        aria-hidden={questionOpacity === 0}
      >
        <p className="hero-phase-text">The question everyone asks...</p>
        <p className="hero-phase-question">Who invented rock and roll?</p>
      </div>

      {/* Phase 2: Complication (40-70%) */}
      <div
        className="hero-text-phase"
        style={{ opacity: complicatedOpacity }}
        aria-hidden={complicatedOpacity === 0}
      >
        <p className="hero-phase-text">The answer is more complicated than a name...</p>
      </div>

      {/* Phase 3: Never Invented (70-85%) */}
      <div
        className="hero-text-phase"
        style={{ opacity: neverInventedOpacity }}
        aria-hidden={neverInventedOpacity === 0}
      >
        <p className="hero-phase-revelation">...because rock and roll was never invented.</p>
      </div>

      {/* Final Title Card (85-100%) */}
      <div
        className="hero-content hero-content--final"
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        <span className="hero-overline">A Visual Essay</span>
        <h1 className="hero-title">Rock & Roll</h1>
        <p className="hero-subtitle">The Noise That Remade the World</p>
        <p className="hero-tagline" style={{ opacity: titleOpacity }}>It converged.</p>
      </div>

      {/* Progress indicator during scroll-lock */}
      {isLocked && (
        <div className="hero-progress-indicator" aria-hidden="true">
          <div
            className="hero-progress-bar"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      )}

      {/* Skip button - appears after 2 seconds */}
      {isLocked && showSkip && (
        <button
          className="hero-skip-button"
          onClick={handleSkip}
          aria-label="Skip introduction animation"
        >
          Skip
        </button>
      )}

      {/* Scroll indicator (only when animation complete) */}
      {!isLocked && (
        <div className="hero-scroll-indicator">
          <span className="scroll-text">Scroll to Begin</span>
          <div className="scroll-line" />
        </div>
      )}
    </section>
  );
};

// ==================== MAIN COMPONENT ====================

export default function RockAndRollClient() {
  const progress = useGlobalScrollProgress();
  const [heroComplete, setHeroComplete] = useState(false);

  const handleHeroComplete = React.useCallback(() => {
    setHeroComplete(true);
  }, []);

  return (
    <div className="rock-and-roll-essay">
      <VinylProgress progress={progress} />

      {/* Global Content Warning */}
      <div className="sr-only" role="alert">
        Content warning: This essay discusses systemic racism, economic exploitation, racial violence, sexism, and references to death. Reader discretion advised.
      </div>

      {/* HERO */}
      <Hero onComplete={handleHeroComplete} />

      {/* CHAPTERS */}
      {chapters.map((chapter) => (
        <ChapterSection key={chapter.id} chapter={chapter} />
      ))}

      {/* EPILOGUE VISUAL */}
      <section className="epilogue-section">
        <p className="epilogue-text">
          The noise converged in the late 1940s. It exploded in the 1950s.
          It transformed in the 1960s and 70s. It fragmented in the 80s and 90s.
          It may no longer dominate-but it cannot be silenced.
        </p>
        <p className="epilogue-closing">The Noise Continues</p>
      </section>

      {/* SOURCES */}
      <section className="sources-section">
        <div className="sources-content">
          <h3 className="sources-title">Sources & Further Reading</h3>

          <div className="sources-category">
            <h4 className="sources-category-title">Books</h4>
            <ul className="sources-list">
              {sources.books.map((source, index) => (
                <li key={index}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sources-category">
            <h4 className="sources-category-title">Archives</h4>
            <ul className="sources-list">
              {sources.archives.map((source, index) => (
                <li key={index}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sources-category">
            <h4 className="sources-category-title">Documentaries</h4>
            <ul className="sources-list">
              {sources.documentaries.map((source, index) => (
                <li key={index}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <p className="sources-note">
            This narrative draws from oral histories, academic research, and documented archives.
            Rock and roll history is contested territory-memories conflict, dates blur, credit is disputed.
            We honor the complexity while telling the story. All quotes are verified from primary sources where possible.
          </p>
        </div>
      </section>
    </div>
  );
}
