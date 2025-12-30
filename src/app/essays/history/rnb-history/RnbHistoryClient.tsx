"use client";

import React, { useEffect, useRef, useState } from "react";
import "./rnb-history.css";

// ============================================================================
// R&B: THE HEARTBEAT THAT TAUGHT POP TO FEEL
// ============================================================================
// Visual Treatment: MIXING CONSOLE metaphor
// - R&B was DEFINED by studio production (Motown, Stax, PIR, Sigma Sound)
// - The console is WHERE R&B was created
// - No other essay uses this metaphor
//
// Progress Bar: FADER — realistic channel fader with dB scale and LED meter
// Section Transitions: CROSSFADE — audio mixing metaphor
// Figure Cards: PATCH CONNECTIONS — studio patch bay styling
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
  isFeatured?: boolean;
  imageUrl?: string;
  imageAttribution?: string;
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  era: "race-records" | "early-rb" | "soul" | "philly" | "quiet-storm" | "new-jack" | "pop-rb" | "alternative";
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
  // Locations
  hitsvilleUsa: "https://upload.wikimedia.org/wikipedia/commons/4/48/Hitsville_U.S.A.jpg",
  staxMuseum: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Stax_Museum_2011.jpg",
  apolloTheater: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Apollo_Theater%2C_Harlem_%2846992038484%29.jpg",
  sunStudio: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Sun_Studio.jpg",
  // Equipment
  tr808: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Roland_TR-808_%28large%29.jpg",
  yamahaDx7: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Yamaha_DX7.jpg",
  mpc3000: "https://upload.wikimedia.org/wikipedia/commons/0/03/AKAI_MPC_3000.jpg",
  // Artists - All verified CC-licensed from Wikimedia Commons
  ruthBrown: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Ruth_Brown_cropped.jpg",
  fatsDomino: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Fats_Domino018.JPG",
  otisRedding: "https://upload.wikimedia.org/wikipedia/commons/1/14/Otis_Redding_1967.JPG",
  bookerTJones: "https://upload.wikimedia.org/wikipedia/commons/9/94/Booker_T._Jones_2009.jpg",
  alGreen: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Al_Green_1973.jpg",
  berryGordy: "https://upload.wikimedia.org/wikipedia/commons/d/d1/BerryGordyDec10.jpg",
  smokeyRobinson: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Smokey_Robinson_special_1970.JPG",
  stevieWonder: "https://upload.wikimedia.org/wikipedia/commons/5/55/Stevie_Wonder_1973.JPG",
  marvinGaye: "https://upload.wikimedia.org/wikipedia/commons/0/03/Marvin_Gaye_%281973_publicity_photo%29.jpg",
  arethaFranklin: "https://upload.wikimedia.org/wikipedia/commons/9/94/Aretha_Franklin_1968.jpg",
  missyElliott: "https://upload.wikimedia.org/wikipedia/commons/7/77/Missy_Elliot.jpg",
  maryJBlige: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Mary_J._Blige_in_2009.JPG",
  teddyRiley: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Teddy_Riley_at_the_90%27s_Block_Party_Tour.jpg",
  timbaland: "https://upload.wikimedia.org/wikipedia/commons/0/05/Timbaland_%2847903248821%29_%28cropped%29.jpg",
  tinaTurner: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Tina_Turner_1985.jpg",
  sza: "https://upload.wikimedia.org/wikipedia/commons/f/f4/KendrickSZASPurs230725-19_-_54683179509_%28cropped%29_%28cropped%29.jpg",
  frankOcean: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Frank_Ocean_2022_Blonded.jpg",
  // Additional verified images
  bigMamaThornton: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Blues_is_a_woman_Reitz_%28Big_Mama_Thornton%29.jpg",
  gambleAndHuff: "https://upload.wikimedia.org/wikipedia/commons/0/02/Kenny_Gamble_Leon_Huff.jpg",
  funkBrothers: "https://upload.wikimedia.org/wikipedia/commons/4/43/The_Funk_Brothers.jpg",
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

// ==================== FADER PROGRESS (Novel Progress Bar) ====================
// Realistic mixing console fader with channel display, track, cap, and LED meter

const channelLabels = [
  { id: "prologue", position: 0.02, label: "PRO" },
  { id: "ch1", position: 0.10, label: "CH1" },
  { id: "ch2", position: 0.18, label: "CH2" },
  { id: "ch3", position: 0.26, label: "CH3" },
  { id: "ch4", position: 0.34, label: "CH4" },
  { id: "ch5", position: 0.42, label: "CH5" },
  { id: "ch6", position: 0.50, label: "CH6" },
  { id: "ch7", position: 0.58, label: "CH7" },
  { id: "ch8", position: 0.66, label: "CH8" },
  { id: "ch9", position: 0.74, label: "CH9" },
  { id: "ch10", position: 0.82, label: "C10" },
  { id: "ch11", position: 0.90, label: "C11" },
  { id: "epilogue", position: 0.98, label: "MST" },
];

const getCurrentChannel = (progress: number): string => {
  for (let i = channelLabels.length - 1; i >= 0; i--) {
    if (progress >= channelLabels[i].position) {
      return channelLabels[i].label;
    }
  }
  return "PRO";
};

const FaderProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const segmentCount = 12;
  const litSegments = Math.floor(progress * segmentCount);
  const currentChannel = getCurrentChannel(progress);

  // Calculate fader cap position (top to bottom)
  const trackHeight = 100; // percentage
  const capPosition = progress * (trackHeight - 10); // leave room for cap

  return (
    <div
      className="fader-progress"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      {/* Channel display */}
      <div className="fader-channel">{currentChannel}</div>

      {/* Fader track container */}
      <div className="fader-track-container">
        {/* dB scale */}
        <div className="fader-scale">
          <span className="fader-db">+10</span>
          <span className="fader-db">0</span>
          <span className="fader-db">-10</span>
          <span className="fader-db">-20</span>
          <span className="fader-db">-∞</span>
        </div>

        {/* The track groove */}
        <div className="fader-track">
          {/* The fader cap */}
          <div
            className="fader-cap"
            style={{ top: `${capPosition}%` }}
          />
        </div>

        {/* LED meter */}
        <div className="fader-meter">
          {[...Array(segmentCount)].map((_, i) => {
            let colorClass = "";
            if (i < litSegments) {
              if (i >= segmentCount - 2) {
                colorClass = "lit-red";
              } else if (i >= segmentCount - 4) {
                colorClass = "lit-yellow";
              } else {
                colorClass = "lit-green";
              }
            }
            return (
              <div
                key={i}
                className={`fader-meter-segment ${colorClass}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ==================== METER BRIDGE (Sticky Header) ====================

const MeterBridge: React.FC<{ progress: number; currentChapter: string }> = ({
  progress,
  currentChapter,
}) => {
  const vuBars = 8;
  const activeBars = Math.ceil(progress * vuBars);

  return (
    <div className="meter-bridge">
      <div className="meter-bridge-vu">
        {[...Array(vuBars)].map((_, i) => (
          <div
            key={i}
            className={`meter-bridge-vu-bar ${i < activeBars ? "active" : ""}`}
          />
        ))}
      </div>
      <div className="meter-bridge-label">
        <span className="current">{currentChapter}</span>
      </div>
    </div>
  );
};

// ==================== PATCH CONNECTION (Figure Component) ====================

const PatchConnection: React.FC<{ figure: Figure }> = ({ figure }) => {
  return (
    <article
      className={`patch-connection ${figure.isFeatured ? "featured" : ""} ${figure.imageUrl ? "has-image" : ""}`}
    >
      {figure.imageUrl && (
        <div className="patch-image-container">
          <img
            src={figure.imageUrl}
            alt={`${figure.name} - ${figure.epithet}`}
            className="patch-image"
            loading="lazy"
          />
          {figure.imageAttribution && (
            <p className="patch-image-credit">{figure.imageAttribution}</p>
          )}
        </div>
      )}
      <div className="patch-info">
        <h3 className="patch-name">{figure.name}</h3>
        <p className="patch-epithet">{figure.epithet}</p>
        {(figure.born || figure.died) && (
          <p className="patch-meta">
            {figure.born && `Born ${figure.born}`}
            {figure.born && figure.died && " | "}
            {figure.died && `Died ${figure.died}`}
          </p>
        )}
        <div className="patch-domains">
          {figure.domains.map((domain) => (
            <span key={domain} className="patch-domain">
              {domain}
            </span>
          ))}
        </div>
        <p className="patch-description">{figure.description}</p>
        {figure.quote && <p className="patch-quote-inline">&ldquo;{figure.quote}&rdquo;</p>}
      </div>
    </article>
  );
};

// ==================== CHANNEL STRIP (Chapter Component) ====================

const ChannelStrip: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`channel-strip ${isVisible ? "visible" : ""}`}
      data-era={chapter.era}
    >
      <div className="channel-strip-content">
        <header className="channel-header">
          <span className="channel-number">{chapter.number}</span>
          <h2 className="channel-title">{chapter.title}</h2>
          {chapter.subtitle && <p className="channel-subtitle">{chapter.subtitle}</p>}
          {chapter.epigraph && (
            <blockquote className="patch-quote">
              <p className="patch-quote-text">&ldquo;{chapter.epigraph.text}&rdquo;</p>
              <cite className="patch-quote-source">— {chapter.epigraph.source}</cite>
            </blockquote>
          )}
        </header>

        {chapter.contentWarning && (
          <div className="console-warning">
            <div className="console-warning-led" />
            <div className="console-warning-text">{chapter.contentWarning}</div>
          </div>
        )}

        {chapter.chapterImage && (
          <figure className="channel-image">
            <img
              src={chapter.chapterImage.url}
              alt={chapter.chapterImage.alt}
              loading="lazy"
            />
            <figcaption className="channel-image-caption">
              {chapter.chapterImage.attribution}
            </figcaption>
          </figure>
        )}

        <div className="signal-flow has-dropcap">
          {chapter.narrative.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {chapter.figures.map((figure) => (
          <PatchConnection key={figure.name} figure={figure} />
        ))}
      </div>

      <div className="channel-insert">
        <div className="channel-insert-line" />
        <div className="channel-insert-jack" />
        <div className="channel-insert-line" />
      </div>
    </section>
  );
};

// ==================== CONTENT DATA ====================

const chapters: Chapter[] = [
  // PROLOGUE
  {
    id: "prologue",
    number: "Prologue",
    title: "Before the Name",
    subtitle: "What Race Records Hid and Revealed (1920–1948)",
    era: "race-records",
    narrative: [
      "Before there was 'rhythm and blues,' there were 'race records'—a classification that segregated Black popular music from 1920 onward. The term was honest about the market's racism while hiding the music's innovation.",
      "In juke joints and roadhouses across the American South, electric amplification was transforming the blues. T-Bone Walker electrified the guitar. Jump blues bands merged swing with blues feeling. Big bands gave way to smaller combos with bigger sounds.",
      "The music was already evolving when a Billboard reporter decided to give it a new name. What followed would reshape American popular music—and teach pop how to feel.",
    ],
    figures: [],
  },

  // CHAPTER 1: THE CLASSIFICATION
  {
    id: "ch1",
    number: "Chapter I",
    title: "The Classification",
    subtitle: "Jerry Wexler and the Birth of a Genre (June 1949)",
    era: "early-rb",
    epigraph: {
      text: "In my capacity as a Billboard reporter I was also responsible for a minor semantic and, as it turned out, musical revolution.",
      source: "Jerry Wexler",
    },
    narrative: [
      "In June 1949, Jerry Wexler—a young reporter at Billboard magazine—proposed replacing 'race records' with 'rhythm and blues.' The change was partly humanitarian (the old term was offensive) and partly commercial (the new term was marketable).",
      "The classification created a chart. The chart created radio formats. Radio formats created audiences. And suddenly, Black popular music had infrastructure—flawed, exploitative, but functional.",
      "Atlantic Records, founded in 1947 by Ahmet Ertegun with $10,000, was positioned to ride this wave. They signed Ruth Brown in 1949, and she became 'Miss Rhythm'—building the label hit by hit until it could afford to sign Ray Charles.",
      "The naming wasn't just semantic. It was economic architecture. A category became a culture.",
    ],
    figures: [
      {
        name: "Jerry Wexler",
        epithet: "The Name-Giver",
        born: "January 10, 1917, Bronx, New York",
        died: "August 15, 2008",
        domains: ["Billboard Reporter", "Atlantic Records", "Producer"],
        description: "Coined 'rhythm and blues' in Billboard's June 1949 issue. Later became a partner at Atlantic Records and produced Aretha Franklin's legendary sessions at Muscle Shoals. His classification created the infrastructure for R&B as an industry.",
        isFeatured: true,
      },
      {
        name: "Ruth Brown",
        epithet: "Miss Rhythm",
        born: "January 12, 1928, Portsmouth, Virginia",
        died: "November 17, 2006",
        domains: ["Singer", "Activist", "Label Builder"],
        description: "Built Atlantic Records with consecutive hits (1949–1960). Later co-founded the Rhythm and Blues Foundation to recover unpaid royalties—not just for herself, but for dozens of artists exploited by the industry she helped build.",
        quote: "That's Atlantic Records—the house that Ruth Brown built.",
        isFeatured: true,
        imageUrl: IMAGES.ruthBrown,
        imageAttribution: "Wikimedia Commons, CC BY-SA",
      },
    ],
  },

  // CHAPTER 2: NEW ORLEANS
  {
    id: "ch2",
    number: "Chapter II",
    title: "New Orleans Crucible",
    subtitle: "J&M Recording Studio and the Rolling Piano (1945–1960)",
    era: "early-rb",
    epigraph: {
      text: "Responsible for virtually every New Orleans R&B record that made the charts.",
      source: "Rock and Roll Hall of Fame, on Cosimo Matassa",
    },
    narrative: [
      "New Orleans was R&B's first capital. In a room just 15 by 16 feet at J&M Recording Studio, teenage engineer Cosimo Matassa captured a sound that would define the genre: rolling piano triplets, second-line rhythms, warm vocal tones.",
      "Fats Domino's 'The Fat Man' (1949) sold a million copies—one of the first R&B records to cross over to white audiences. Little Richard improvised 'Tutti Frutti' at the Dew Drop Inn, then recorded it at J&M, launching rock and roll's most flamboyant career.",
      "Behind them was producer Dave Bartholomew, who assembled the house band and wrote many of Domino's hits. The system was already in place: a studio, a producer, a house band, a label relationship. Every major R&B city would replicate this model.",
    ],
    figures: [
      {
        name: "Cosimo Matassa",
        epithet: "The Teen Engineer",
        born: "April 13, 1926, New Orleans",
        died: "September 11, 2014",
        domains: ["Engineer", "Studio Owner", "Pioneer"],
        description: "Opened J&M Recording Studio at age 18 in 1945. Recorded virtually every New Orleans R&B hit through the 1970s. Inducted into the Rock and Roll Hall of Fame in 2012 for his foundational contributions.",
        isFeatured: true,
      },
      {
        name: "Fats Domino",
        epithet: "The Rolling Piano",
        born: "February 26, 1928, New Orleans",
        died: "October 24, 2017",
        domains: ["Singer", "Pianist", "Crossover Pioneer"],
        description: "'The Fat Man' (1949) was a million-seller crossover hit. Sold 65+ million records—more than any 1950s artist except Elvis. His rolling triplet piano style became the New Orleans signature sound.",
        isFeatured: true,
        imageUrl: IMAGES.fatsDomino,
        imageAttribution: "Roland Godefroy, Wikimedia Commons, CC BY-SA 3.0",
      },
    ],
  },

  // CHAPTER 3: MEMPHIS
  {
    id: "ch3",
    number: "Chapter III",
    title: "Memphis Soul Stew",
    subtitle: "Stax, Hi Records, and the Southern Sound (1957–1975)",
    era: "soul",
    epigraph: {
      text: "As you go down the slope, the music gets bigger, it separates.",
      source: "Willie Mitchell, on Royal Studios' acoustics",
    },
    chapterImage: {
      url: IMAGES.staxMuseum,
      alt: "Stax Museum of American Soul Music, Memphis",
      attribution: "CC BY-SA 3.0, via Wikimedia Commons",
    },
    narrative: [
      "Memphis developed two distinct but related sounds. At Stax Records—a converted movie theater where the sloped floor created unique acoustics—an integrated house band (Booker T. & the M.G.'s) backed virtually every recording. The result was grittier, rawer than Motown: the delayed backbeat, the horn punch, the unpolished emotion.",
      "At Royal Studios, Willie Mitchell discovered Al Green and created smooth Southern soul. Both sounds were shaped by architecture. Both were built by bands who created distinctive styles.",
      "And both were destroyed by business failures—Stax collapsed in 1975 after a disastrous distribution deal that exposed the vulnerability of Black-owned labels in a white-dominated industry.",
    ],
    figures: [
      {
        name: "Otis Redding",
        epithet: "The King of Soul",
        born: "September 9, 1941, Dawson, Georgia",
        died: "December 10, 1967",
        domains: ["Singer", "Songwriter", "Stax Star"],
        description: "Stax Records' biggest star. '(Sittin' On) The Dock of the Bay' went #1 posthumously after his death in a plane crash at age 26. His raw emotional delivery defined Southern soul.",
        quote: "These arms of mine, they are lonely...",
        isFeatured: true,
        imageUrl: IMAGES.otisRedding,
        imageAttribution: "Wikimedia Commons, 1967",
      },
      {
        name: "Booker T. Jones",
        epithet: "The M.G.'s Architect",
        born: "November 12, 1944, Memphis, Tennessee",
        domains: ["Organist", "Bandleader", "Composer"],
        description: "Led Booker T. & the M.G.'s, the integrated house band that backed virtually every Stax recording. Composed 'Green Onions.' Their interracial collaboration was revolutionary in the segregated South.",
        quote: "We were a family. Black and white didn't matter in that studio.",
        isFeatured: true,
        imageUrl: IMAGES.bookerTJones,
        imageAttribution: "Wikimedia Commons, 2009",
      },
      {
        name: "Al Green",
        epithet: "The Smooth Reverend",
        born: "April 13, 1946, Forrest City, Arkansas",
        domains: ["Singer", "Songwriter", "Minister"],
        description: "'Let's Stay Together' (1971), 'Love and Happiness' (1972). Left secular music for ministry in 1979, returning partially. His falsetto and intimate delivery at Royal Studios created smooth Southern soul.",
        isFeatured: true,
        imageUrl: IMAGES.alGreen,
        imageAttribution: "Wikimedia Commons, 1973",
      },
    ],
  },

  // CHAPTER 4: DETROIT
  {
    id: "ch4",
    number: "Chapter IV",
    title: "Hitsville U.S.A.",
    subtitle: "Motown and the Detroit Assembly Line (1959–1972)",
    era: "soul",
    epigraph: {
      text: "I realized that a hit record was a product of its own.",
      source: "Berry Gordy",
    },
    chapterImage: {
      url: IMAGES.hitsvilleUsa,
      alt: "Hitsville U.S.A., Motown's original headquarters in Detroit",
      attribution: "CC BY-SA 3.0, via Wikimedia Commons",
    },
    narrative: [
      "Berry Gordy borrowed $800 from his family in 1959 and built an empire. Motown applied Detroit's automotive assembly-line principles to music: quality control, in-house production, artist development, and relentless polish.",
      "In Studio A—nicknamed 'The Snake Pit' for its claustrophobic intimacy—the Funk Brothers played on more #1 hits than the Beatles, Rolling Stones, Beach Boys, and Elvis combined. They were paid $10 per song. They received no royalties. They were not credited on album covers until 1971.",
      "Motown's 'charm school' taught artists to appeal to white audiences—proper diction, choreography, etiquette. It was crossover by design. But in 1972, Gordy moved operations to Los Angeles. The Funk Brothers discovered this when they saw a notice on the studio door.",
    ],
    figures: [
      {
        name: "Berry Gordy",
        epithet: "The Mogul",
        born: "November 28, 1929, Detroit, Michigan",
        domains: ["Founder", "Producer", "Businessman"],
        description: "Founded Motown Records with an $800 family loan in 1959. Created the 'assembly line' approach to hit-making. Sold Motown to MCA for $61 million in 1988. Built the most successful Black-owned business in America.",
        isFeatured: true,
        imageUrl: IMAGES.berryGordy,
        imageAttribution: "Wikimedia Commons, 2010",
      },
      {
        name: "The Funk Brothers",
        epithet: "The Invisible Hit Makers",
        domains: ["Session Musicians", "Arrangers", "Creators"],
        description: "Motown's house band—James Jamerson (bass), Benny Benjamin (drums), Earl Van Dyke (keys), and others. Played on more #1 hits than any group in history. Not credited until 1971. Documented in 'Standing in the Shadows of Motown' (2002).",
        quote: "We played on everything. We were Motown.",
        isFeatured: true,
        imageUrl: IMAGES.funkBrothers,
        imageAttribution: "Wikimedia Commons, 2013",
      },
      {
        name: "Smokey Robinson",
        epithet: "The Poet Laureate",
        born: "February 19, 1940, Detroit, Michigan",
        domains: ["Singer", "Songwriter", "VP"],
        description: "The Miracles frontman and Motown VP. Wrote 'My Girl,' 'The Tracks of My Tears,' and countless hits for other artists. Bob Dylan called him 'America's greatest living poet.'",
        isFeatured: true,
        imageUrl: IMAGES.smokeyRobinson,
        imageAttribution: "NBC Television, 1970, Public Domain",
      },
    ],
  },

  // CHAPTER 5: PHILADELPHIA
  {
    id: "ch5",
    number: "Chapter V",
    title: "The Philadelphia Sound",
    subtitle: "Sigma Sound and Soul in a Tuxedo (1968–1979)",
    era: "philly",
    epigraph: {
      text: "Soul music in a tuxedo.",
      source: "Joe Tarsia, on the Philadelphia Sound",
    },
    narrative: [
      "Philadelphia developed R&B's most sophisticated sound. At Sigma Sound Studios, producer Thom Bell and songwriter-producers Kenny Gamble and Leon Huff orchestrated what became 'soul in a tuxedo.'",
      "MFSB—'Mother Father Sister Brother'—was a 30+ member orchestra that played on Philadelphia International hits. Their own 'TSOP (The Sound of Philadelphia)' became Soul Train's theme and the first TV theme song to reach #1.",
      "The Philadelphia Sound was consciously upmarket: lush strings, sophisticated arrangements, positive messages. It was crossover by elevation rather than dilution. But like every R&B capital before it, Philadelphia's moment faded as trends shifted.",
    ],
    figures: [
      {
        name: "Gamble and Huff",
        epithet: "The Architects of Philadelphia Soul",
        domains: ["Songwriters", "Producers", "Label Founders"],
        description: "Kenneth Gamble and Leon Huff founded Philadelphia International Records in 1971. Wrote and produced 'If You Don't Know Me by Now,' 'Love Train,' 'For the Love of Money.' Their orchestral approach defined 1970s R&B sophistication.",
        quote: "We wanted to bring Black music to the world without losing its soul.",
        isFeatured: true,
        imageUrl: IMAGES.gambleAndHuff,
        imageAttribution: "Wikimedia Commons, 2019",
      },
      {
        name: "Thom Bell",
        epithet: "The Quiet Genius",
        born: "January 26, 1943, Kingston, Jamaica",
        domains: ["Producer", "Arranger", "Songwriter"],
        description: "Produced The Stylistics, The Spinners, Elton John. His lush arrangements and meticulous production defined the Philadelphia Sound's elegance.",
        quote: "To put it in a nutshell, he's responsible for everything that's happened to me in my career. — Russell Thompkins Jr.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 6: SESSION MUSICIANS
  {
    id: "ch6",
    number: "Chapter VI",
    title: "The Invisible Engine",
    subtitle: "Session Musicians and the Economics of Credit (1950–Present)",
    era: "soul",
    contentWarning: "This chapter discusses economic exploitation and systemic credit erasure.",
    narrative: [
      "Every major R&B sound was built by largely uncredited session musicians. The Funk Brothers at Motown, Booker T. & the M.G.'s at Stax, MFSB in Philadelphia, the Swampers at Muscle Shoals—these bands created the sounds that made stars.",
      "They were paid per song. They received no royalties. They were rarely credited. At Motown, the rate was $10 per song—regardless of how many millions that song sold.",
      "This invisibility was structural. The 'artist' model of popular music requires a face, a name, a story. The musicians who actually played the music were hidden behind that story. It took decades and documentaries to begin correcting the record.",
    ],
    figures: [
      {
        name: "James Jamerson",
        epithet: "The Phantom Bassist",
        born: "January 29, 1936, Edisto Island, South Carolina",
        died: "August 2, 1983",
        domains: ["Bassist", "Innovator", "Motown Sound"],
        description: "Motown's principal bassist. Played on more #1 hits than any instrumentalist in history. Developed the melodic bass style that influenced all pop music. Never credited on albums. Struggled financially late in life.",
        isFeatured: true,
      },
      {
        name: "Benny Benjamin",
        epithet: "Papa Zita",
        born: "July 15, 1925, Birmingham, Alabama",
        died: "April 20, 1969",
        domains: ["Drummer", "Creator", "The Motown Beat"],
        description: "Motown's principal drummer. Invented the 'Motown beat' that drove hundreds of hits. Died at 43, never seeing his influence recognized. The heartbeat of Motown.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 7: TECHNOLOGY
  {
    id: "ch7",
    number: "Chapter VII",
    title: "Technology as Instrument",
    subtitle: "From Electric Guitar to Auto-Tune (1940–Present)",
    era: "quiet-storm",
    chapterImage: {
      url: IMAGES.tr808,
      alt: "Roland TR-808 drum machine",
      attribution: "CC BY-SA 2.0, via Wikimedia Commons",
    },
    narrative: [
      "R&B's evolution tracks precisely with technological change. Each major innovation didn't just change the sound—it created an entirely new era.",
      "Electric amplification (1940s) allowed solo instruments to compete with big bands. Multitrack recording (1958+) enabled layered production. Synthesizers (1972+) with Stevie Wonder's TONTO began the electronic era.",
      "Drum machines (1980–82) transformed everything. Marvin Gaye's 'Sexual Healing' (1982) was the first US hit to feature the TR-808—and the first to use the machine as an instrument of intimacy rather than cold rhythm. This shifted R&B's entire trajectory.",
      "Auto-Tune (1997) was created by Andy Hildebrand, who admits: 'I put that setting in the software. But I didn't think anyone in their right mind would ever use it.' Cher's 'Believe' (1998) proved him wrong.",
    ],
    figures: [
      {
        name: "Stevie Wonder",
        epithet: "The Synthesizer Pioneer",
        born: "May 13, 1950, Saginaw, Michigan",
        domains: ["Singer", "Multi-instrumentalist", "Producer"],
        description: "'Music of My Mind' (1972) was the first classic album integrating the TONTO synthesizer. Proved synthesizers could convey soul and emotion, not just cold electronica. Revolutionized what R&B could sound like.",
        quote: "I wanted to use technology to expand what the human spirit could express.",
        isFeatured: true,
        imageUrl: IMAGES.stevieWonder,
        imageAttribution: "Wikimedia Commons, 1973",
      },
      {
        name: "Marvin Gaye",
        epithet: "The 808 Intimist",
        born: "April 2, 1939, Washington, D.C.",
        died: "April 1, 1984",
        domains: ["Singer", "Producer", "Innovator"],
        description: "'Sexual Healing' (1982) was the first US hit to feature the TR-808. Made drum machines sensual rather than mechanical. Proved technology could serve intimacy.",
        isFeatured: true,
        imageUrl: IMAGES.marvinGaye,
        imageAttribution: "Motown Records, 1973",
      },
    ],
  },

  // CHAPTER 8: WOMEN AS ARCHITECTS
  {
    id: "ch8",
    number: "Chapter VIII",
    title: "Women as Architects",
    subtitle: "Builders, Not Appendices (1940s–Present)",
    era: "new-jack",
    narrative: [
      "R&B history typically centers male producers—Berry Gordy, Quincy Jones, Teddy Riley. But women were equally foundational, though systematically undervalued.",
      "Ruth Brown didn't just sing for Atlantic—she built it, hit by hit, then fought for royalties reform that benefited all artists. Sylvia Robinson created hip-hop's first hit ('Rapper's Delight') and first socially conscious hit ('The Message'). Sylvia Rhone became the first African-American woman to run a major label (Elektra, 1994).",
      "Missy Elliott summarized the disparity: 'A lot of people don't know a lot of records that I've written or produced... I always said if a man would have done half the records that I've done we would know about it.'",
    ],
    figures: [
      {
        name: "Aretha Franklin",
        epithet: "The Queen of Soul",
        born: "March 25, 1942, Memphis, Tennessee",
        died: "August 16, 2018",
        domains: ["Singer", "Pianist", "Icon"],
        description: "'Respect' (1967) became a feminist and civil rights anthem. First woman inducted into the Rock and Roll Hall of Fame (1987). Her creative control at Atlantic—sitting at the piano, bringing her own arrangements—changed what was possible for women in R&B.",
        quote: "It was the need of a nation, the need of the average man and woman in the street.",
        isFeatured: true,
        imageUrl: IMAGES.arethaFranklin,
        imageAttribution: "Wikimedia Commons, 1968",
      },
      {
        name: "Sylvia Robinson",
        epithet: "The Godmother of Hip-Hop",
        born: "May 6, 1935, New York City",
        died: "September 29, 2011",
        domains: ["Producer", "Label Owner", "Visionary"],
        description: "Co-founded Sugar Hill Records. Produced 'Rapper's Delight' (1979) and 'The Message' (1982). Created hip-hop's recorded form before anyone else saw its potential.",
        isFeatured: true,
      },
      {
        name: "Missy Elliott",
        epithet: "The Producer Who Proved It",
        born: "July 1, 1971, Portsmouth, Virginia",
        domains: ["Producer", "Songwriter", "Rapper"],
        description: "First female rapper inducted into the Rock and Roll Hall of Fame (2022). Produced and wrote for countless artists while building her own career. Made the invisible work of women producers visible.",
        quote: "I knew I would have to produce. I didn't want to just be an artist and let someone else have all that control.",
        isFeatured: true,
        imageUrl: IMAGES.missyElliott,
        imageAttribution: "Wikimedia Commons, CC BY-SA 4.0",
      },
    ],
  },

  // CHAPTER 9: THE SYMBIOSIS
  {
    id: "ch9",
    number: "Chapter IX",
    title: "The Symbiosis",
    subtitle: "R&B and Hip-Hop Co-Evolution (1979–1999)",
    era: "new-jack",
    epigraph: {
      text: "New Jack Swing is a movement... When you're doing New Jack Swing, you're doing a singer and a rapper together.",
      source: "Teddy Riley",
    },
    narrative: [
      "The narrative that 'hip-hop killed R&B' is false. The genres have been in continuous mutual exchange since the late 1980s.",
      "Hip-hop sampled R&B from the beginning—DJ Kool Herc spinning funk and soul breaks. R&B adopted hip-hop production starting with New Jack Swing (Teddy Riley, 1987). The relationship was bidirectional: R&B provided melodic/harmonic vocabulary; hip-hop provided rhythmic/production vocabulary.",
      "Mary J. Blige's 'What's the 411?' (1992) is credited with inventing hip-hop soul—not hip-hop taking over R&B, but a genuine hybrid created by an R&B vocalist working over hip-hop production.",
      "On December 11, 1999, Billboard officially recognized the merger: the chart became 'Hot R&B/Hip-Hop Songs.' The genres had been evolving together for a decade; the industry finally caught up.",
    ],
    figures: [
      {
        name: "Mary J. Blige",
        epithet: "The Queen of Hip-Hop Soul",
        born: "January 11, 1971, Bronx, New York",
        domains: ["Singer", "Songwriter", "Genre Creator"],
        description: "'What's the 411?' (1992) invented hip-hop soul. Combined R&B vocals with hip-hop production, street authenticity with emotional vulnerability. Created a template that dominates contemporary R&B.",
        quote: "I started speaking about what I was dealing with through my music, and 4 million women responded and said, 'Us too, Mary.'",
        isFeatured: true,
        imageUrl: IMAGES.maryJBlige,
        imageAttribution: "Wikimedia Commons, 2009",
      },
      {
        name: "Teddy Riley",
        epithet: "The New Jack Swing Architect",
        born: "October 8, 1967, Harlem, New York",
        domains: ["Producer", "Songwriter", "Genre Creator"],
        description: "Created the New Jack Swing sound that fused R&B with hip-hop rhythms. Produced Keith Sweat, Bobby Brown, Michael Jackson's 'Dangerous.' Built the bridge between genres.",
        isFeatured: true,
        imageUrl: IMAGES.teddyRiley,
        imageAttribution: "Wikimedia Commons, CC BY 2.0",
      },
      {
        name: "Timbaland",
        epithet: "The Sound of the Future",
        born: "March 10, 1972, Norfolk, Virginia",
        domains: ["Producer", "Songwriter", "Innovator"],
        description: "Produced Aaliyah, Missy Elliott, Justin Timberlake. Pioneered sample-heavy, rhythmically complex production that pushed R&B into the future. 'You will play her songs for 20 years... She is the Aretha Franklin of hip-hop.' (on Missy Elliott)",
        isFeatured: true,
        imageUrl: IMAGES.timbaland,
        imageAttribution: "Wikimedia Commons, CC BY 2.0",
      },
    ],
  },

  // CHAPTER 10: CROSSOVER ECONOMICS
  {
    id: "ch10",
    number: "Chapter X",
    title: "Crossover Economics",
    subtitle: "Race, Money, and the Mainstream (1950–Present)",
    era: "pop-rb",
    contentWarning: "This chapter discusses economic exploitation and racial inequality in the music industry.",
    narrative: [
      "'Crossover' in R&B has always meant: music created by Black artists reaching white audiences through controlled sanitization or strategic positioning.",
      "In the 1950s, white artists like Pat Boone recorded note-for-note covers of Black originals for segregated radio. LaVern Baker watched Georgia Gibbs copy her arrangements and outsell her—leading Baker to petition Congress for arrangement copyright protection. She failed.",
      "Big Mama Thornton recorded 'Hound Dog' in 1952. It sold 2 million copies. She received $500 total. 'That song sold over 2 million records. I got one check for $500 and never saw another.'",
      "The economic reality: artists who crossed over earned more money, but often at the cost of Black cultural specificity. The industry extracted value while limiting Black ownership.",
    ],
    figures: [
      {
        name: "Big Mama Thornton",
        epithet: "The Original Hound Dog",
        born: "December 11, 1926, Ariton, Alabama",
        died: "July 25, 1984",
        domains: ["Singer", "Songwriter", "Blues Pioneer"],
        description: "Recorded the original 'Hound Dog' (1952), #1 R&B for 7 weeks. Received only $500 while Elvis Presley's cover became one of the best-selling singles ever. Her exploitation became emblematic of the industry's treatment of Black artists.",
        quote: "That song sold over 2 million records. I got one check for $500 and never saw another.",
        isFeatured: true,
        imageUrl: IMAGES.bigMamaThornton,
        imageAttribution: "Reitz, Wikimedia Commons, 1982",
      },
      {
        name: "Tina Turner",
        epithet: "The Comeback Queen",
        born: "November 26, 1939, Brownsville, Tennessee",
        died: "May 24, 2023",
        domains: ["Singer", "Performer", "Survivor"],
        description: "Left Ike Turner in 1976 with '36 cents and a gas station credit card.' 'Private Dancer' (1984) at age 45 sold 20 million copies. Proved crossover didn't require compromising power.",
        quote: "I had to go out in the world and become strong, to discover my mission in life.",
        isFeatured: true,
        imageUrl: IMAGES.tinaTurner,
        imageAttribution: "Wikimedia Commons, 1985",
      },
    ],
  },

  // CHAPTER 11: THE MYTH OF REAL R&B
  {
    id: "ch11",
    number: "Chapter XI",
    title: "The Myth of Real R&B",
    subtitle: "Authenticity Cycles and Continuous Reinvention",
    era: "alternative",
    epigraph: {
      text: "When you try to label it, you remove the option for it to be limitless. It diminishes the music.",
      source: "SZA",
    },
    narrative: [
      "Every generation believes the previous generation's R&B was 'real' and the current generation is corrupted. This pattern has repeated for 75 years.",
      "1960s: Jump blues was 'real'; soul is too smooth. 1970s: Classic soul was 'real'; disco is selling out. 1980s: Motown/Stax was 'real'; synthesizers ruined vocals. 1990s: 80s quiet storm was 'real'; hip-hop is taking over. 2000s: 90s hip-hop soul was 'real'; Auto-Tune ruined singing. 2010s: 2000s R&B was 'real'; alternative R&B isn't 'real.'",
      "The evidence against these claims is overwhelming: technology has always shaped R&B sound, each era produced enduring classics, and 'authenticity' claims typically mask genre boundary policing. R&B's reinvention isn't a bug—it's the defining feature.",
    ],
    figures: [
      {
        name: "SZA",
        epithet: "The Genre Refuser",
        born: "November 8, 1989, St. Louis, Missouri",
        domains: ["Singer", "Songwriter", "Alternative R&B"],
        description: "'Ctrl' (2017) sold 3.5+ million copies, bringing alternative R&B to the mainstream. First female artist at TDE (Top Dawg Entertainment). Refuses genre categorization as limiting.",
        isFeatured: true,
        imageUrl: IMAGES.sza,
        imageAttribution: "Wikimedia Commons, 2023, CC BY-SA 2.0",
      },
      {
        name: "Frank Ocean",
        epithet: "The Alternative Pioneer",
        born: "October 28, 1987, Long Beach, California",
        domains: ["Singer", "Songwriter", "Producer"],
        description: "'channel ORANGE' (2012) and 'Blonde' (2016) redefined what R&B could be. His introspective, experimental approach helped establish 'alternative R&B' as a recognized movement.",
        isFeatured: true,
        imageUrl: IMAGES.frankOcean,
        imageAttribution: "Wikimedia Commons, 2022, CC BY-SA 4.0",
      },
    ],
  },
];

// ==================== MAIN COMPONENT ====================

export default function RnbHistoryClient() {
  const progress = useGlobalScrollProgress();
  const currentChannel = getCurrentChannel(progress);

  // Get current chapter title for meter bridge
  const getCurrentChapterTitle = () => {
    for (let i = chapters.length - 1; i >= 0; i--) {
      const chapterProgress = channelLabels.find(c => c.id === chapters[i].id);
      if (chapterProgress && progress >= chapterProgress.position) {
        return chapters[i].title;
      }
    }
    return "R&B History";
  };

  return (
    <article className="console">
      <a href="#main-content" className="console-skip-link">
        Skip to main content
      </a>

      <FaderProgress progress={progress} />
      <MeterBridge progress={progress} currentChapter={getCurrentChapterTitle()} />

      {/* CONSOLE HERO */}
      <header className="console-hero" id="main-content">
        <div
          className="console-hero-bg"
          style={{
            backgroundImage: `url(${IMAGES.apolloTheater})`,
          }}
        />
        <div className="console-hero-overlay" />

        <div className="console-hero-content">
          <div className="console-hero-status">Recording</div>
          <h1 className="console-hero-title">
            <span className="accent">R&B</span>
          </h1>
          <p className="console-hero-subtitle">The Heartbeat That Taught Pop to Feel</p>

          <div className="console-hero-transport">
            <span className="console-hero-transport-label">Scroll to begin</span>
            <div className="console-hero-transport-btn" />
          </div>
        </div>
      </header>

      {/* CHANNEL STRIPS (Chapters) */}
      <main>
        {chapters.map((chapter) => (
          <ChannelStrip key={chapter.id} chapter={chapter} />
        ))}

        {/* MASTER SECTION (Epilogue) */}
        <section className="master-section">
          <div className="master-section-content">
            <div className="master-label">MASTER</div>
            <h2 className="master-title">The Feeling Itself</h2>
            <div className="master-text">
              <p>
                In 1949, Jerry Wexler gave a name to music that already existed. That name
                created a category, and that category created an industry, and that industry
                created wealth (mostly for others) and art (mostly from Black creators).
              </p>
              <p>
                R&amp;B didn&apos;t die—it did something more profound. It taught pop how to feel.
                The melismatic vocals, the groove-based rhythm, the emotional directness,
                the technological innovation—all of this is now standard in popular music.
                R&B won so completely that it became invisible, absorbed into the mainstream.
              </p>
              <p>
                But the genre persists. In bedroom studios and major labels, artists
                continue to make music they call R&B. They argue about what it means.
                They claim authenticity. They innovate. The vinyl still spins. The groove
                still hits.
              </p>
            </div>
            <p className="master-closing">The heartbeat continues.</p>
          </div>
        </section>

        {/* OUTPUT SECTION (Sources) */}
        <section className="output-section">
          <div className="output-content">
            <h2 className="output-label">Output / Sources & Further Reading</h2>
            <div className="output-list">
              <p>
                <strong>Primary Sources:</strong> Jerry Wexler autobiography; Ruth Brown interviews
                (NPR Forebears); Aretha Franklin (Academy of Achievement interview, 1991);
                Big Mama Thornton (Jet magazine); Billboard magazine archives.
              </p>
              <p>
                <strong>Academic Sources:</strong> Nelson George, <em>The Death of Rhythm and Blues</em>;
                Portia K. Maultsby, academic papers on African American music; Charlie Gillett,
                <em>Making Tracks: Atlantic Records</em>; Rob Bowman, <em>Soulsville U.S.A.: The Story of Stax Records</em>.
              </p>
              <p>
                <strong>Documentaries:</strong> <em>Standing in the Shadows of Motown</em> (2002);
                <em>Muscle Shoals</em> (2013); <em>20 Feet from Stardom</em> (2013).
              </p>
              <p>
                <strong>Image Credits:</strong> All images sourced from Wikimedia Commons under
                CC-BY-SA or Public Domain licenses. Full attribution provided in image captions.
              </p>
            </div>
          </div>
        </section>
      </main>
    </article>
  );
}
