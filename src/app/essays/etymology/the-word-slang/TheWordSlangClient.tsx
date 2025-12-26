'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import './the-word-slang.css';

interface Section {
  id: string;
  title: string;
  era?: string;
}

interface TimelineEntry {
  year: string;
  event: string;
  significance?: string;
}


const sections: Section[] = [
  { id: 'title', title: 'Title' },
  { id: 'criminal-underground', title: 'Criminal Underground', era: 'era-1' },
  { id: 'first-attestation', title: 'First Attestation', era: 'era-1' },
  { id: 'lexicographic-dawn', title: 'Lexicographic Dawn', era: 'era-2' },
  { id: 'etymology-mystery', title: 'The Mystery of Origin', era: 'era-2' },
  { id: 'victorian-gatekeeping', title: 'Victorian Gatekeeping', era: 'era-3' },
  { id: 'american-expansion', title: 'American Expansion', era: 'era-4' },
  { id: 'academic-legitimation', title: 'Academic Legitimation', era: 'era-5' },
  { id: 'digital-present', title: 'Digital Present', era: 'era-6' },
  { id: 'timeline', title: 'Timeline' },
  { id: 'sources', title: 'Sources' },
];

const timeline: TimelineEntry[] = [
  {
    year: '1566',
    event: 'Thomas Harman publishes first English cant glossary',
    significance: 'Pre-slang: "cant" and "pedlars French" name criminal language',
  },
  {
    year: '1698',
    event: 'B.E. Gentleman\'s "New Dictionary of the Canting Crew"',
    significance: 'Expands underworld vocabulary documentation',
  },
  {
    year: '1741',
    event: 'Earliest verb usage: "slanging the gentry mort"',
    significance: 'Criminal deception scheme described at Tyburn execution',
  },
  {
    year: '1756',
    event: 'First noun attestation in Toldervy\'s novel',
    significance: '"knew the slang well" — earliest confirmed written use',
  },
  {
    year: '1785',
    event: 'Grose\'s "Classical Dictionary of the Vulgar Tongue"',
    significance: 'First major slang dictionary; scholarly yet subversive',
  },
  {
    year: '1801',
    event: 'OED attests "slang" for any professional jargon',
    significance: 'Semantic expansion beyond criminal vocabulary',
  },
  {
    year: '1818',
    event: '"Slang" attested for informal language generally',
    significance: 'Modern broad meaning emerges',
  },
  {
    year: '1859',
    event: 'Hotten\'s "Slang Dictionary" published',
    significance: 'First etymological treatment of slang words',
  },
  {
    year: '1860s',
    event: 'Isaac Taylor proposes Scandinavian etymology',
    significance: '"Narrow strip of land" theory—still leading hypothesis',
  },
  {
    year: '1911',
    event: 'Bradley\'s Britannica definition',
    significance: '"Conscious offence against propriety" — canonical Victorian view',
  },
  {
    year: '1919',
    event: 'Mencken\'s "The American Language"',
    significance: 'Rehabilitates slang as creative, respectable innovation',
  },
  {
    year: '1937',
    event: 'Partridge\'s "Dictionary of Slang"',
    significance: 'Standard 20th-century reference work',
  },
  {
    year: '1960s',
    event: 'Sociolinguistics emerges as discipline',
    significance: 'Academic study of informal language begins',
  },
  {
    year: '1996',
    event: 'Eble\'s "Slang and Sociability"',
    significance: 'Reframes slang as identity and solidarity marker',
  },
  {
    year: '1999',
    event: 'Urban Dictionary founded',
    significance: 'Crowdsourced lexicography democratizes definition',
  },
  {
    year: '2016',
    event: 'Liberman claims etymology "is known"',
    significance: 'Advocates Scandinavian origin; OED remains unconvinced',
  },
  {
    year: '2020s',
    event: 'TikTok accelerates slang evolution',
    significance: 'Digital virality creates and spreads new vocabulary',
  },
];


export default function TheWordSlangClient() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentEra, setCurrentEra] = useState('era-1');
  const [activeSection, setActiveSection] = useState('title');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);

      // Determine current section and era
      const sectionElements = sections.map((s) => ({
        ...s,
        element: document.getElementById(s.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(section.id);
            if (section.era) {
              setCurrentEra(section.era);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`slang-essay ${currentEra}`} ref={contentRef}>
      {/* Progress Bar */}
      <div className="slang-progress-bar">
        <div
          className="slang-progress-fill"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="slang-nav">
        <Link href="/essays" className="slang-nav-back">
          ← Essays
        </Link>
        <div className="slang-nav-sections">
          {sections.slice(1, -1).map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`slang-nav-link ${activeSection === section.id ? 'active' : ''}`}
            >
              {section.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Title Section */}
      <section id="title" className="slang-section slang-title-section">
        <div className="slang-title-container">
          <div className="slang-title-etymology">Etymology</div>
          <h1 className="slang-main-title">SLANG</h1>
          <p className="slang-subtitle">The Word That Names the Unnamed</p>
          <div className="slang-title-meta">
            <span className="slang-attestation">First attested 1756</span>
            <span className="slang-separator">•</span>
            <span className="slang-origin">Origin unknown</span>
          </div>
        </div>
        <div className="slang-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="slang-scroll-arrow">↓</div>
        </div>
      </section>

      {/* Section 1: Criminal Underground */}
      <section id="criminal-underground" className="slang-section slang-underground">
        <div className="slang-section-content">
          <div className="slang-era-marker">1720s–1780s</div>
          <h2 className="slang-section-title">The Criminal Underground</h2>

          <div className="slang-narrative">
            <p className="slang-lede">
              In the shadowy world of Georgian London—a city of gin lanes, pickpockets, and public
              hangings—a new word was taking shape. It emerged not from academies or drawing rooms,
              but from the very margins of society: the thieves&apos; dens, beggars&apos; haunts, and
              itinerant performers who had their own secret tongue.
            </p>

            <p>
              For centuries, this secret language had been called <em>cant</em> or{' '}
              <em>pedlars&apos; French</em>—vocabulary deliberately obscured to exclude outsiders and
              protect criminal enterprises. Thomas Harman had documented it as early as 1566, and
              successive glossaries catalogued the canting crew&apos;s coded speech.
            </p>

            <p>
              But by the mid-eighteenth century, a new term was circulating among those who knew this
              hidden language. That word was <em>slang</em>—itself a piece of insider vocabulary,
              destined to migrate from the darkness into the light of common usage.
            </p>
          </div>

          <figure className="slang-figure slang-hogarth">
            <div className="slang-figure-image">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/William_Hogarth_-_Gin_Lane.jpg"
                alt="Gin Lane by William Hogarth, 1751 - depicting the squalor and chaos of Georgian London's gin-drinking culture"
                loading="lazy"
              />
            </div>
            <figcaption>
              Hogarth&apos;s London: the world where slang was born. William Hogarth, &quot;Gin Lane,&quot; 1751.
              Wikimedia Commons, Public Domain.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Section 2: First Attestation */}
      <section id="first-attestation" className="slang-section slang-attestation-section">
        <div className="slang-section-content">
          <h2 className="slang-section-title">First Attestation</h2>

          <div className="slang-scroll-lock-container">
            <blockquote className="slang-attestation-quote">
              <p>
                &quot;Thomas Throw had been upon the town, <mark>knew the slang well</mark>; had
                often sate a flasher at M——d——g——n&apos;s, and understood every word in the
                scoundrel&apos;s dictionary.&quot;
              </p>
              <cite>
                —William Toldervy, <em>The History of Two Orphans</em>, 1756
              </cite>
            </blockquote>
          </div>

          <div className="slang-narrative">
            <p>
              The year 1756 marks the earliest confirmed written use of <em>slang</em> as a noun.
              William Toldervy&apos;s novel describes a character who &quot;knew the slang
              well&quot;—meaning he understood the criminal vocabulary, the secret language of the
              London underworld.
            </p>

            <p>
              But words live in speech long before they appear in print. Fifteen years earlier, in
              1741, an account of the pickpocket Mary Young (alias Jenny Diver) at Tyburn execution
              used <em>slang</em> as a verb: &quot;slanging the gentry mort rumly with a sham
              kinchin&quot;—describing her elaborate deception scheme.
            </p>

            <p>
              The word was already in circulation, already useful, already marking the boundary
              between those who belonged and those who did not.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Lexicographic Dawn */}
      <section id="lexicographic-dawn" className="slang-section slang-lexicographic">
        <div className="slang-section-content">
          <div className="slang-era-marker">1785–1860</div>
          <h2 className="slang-section-title">Lexicographic Dawn</h2>

          <div className="slang-two-column">
            <div className="slang-column-text">
              <div className="slang-narrative">
                <p>
                  In 1785, Captain Francis Grose published the{' '}
                  <em>Classical Dictionary of the Vulgar Tongue</em>—a work that was part
                  scholarship, part subversion. Grose, whom Eric Partridge would later call
                  &quot;the greatest antiquary, joker, and porter-drinker of his day,&quot;
                  deliberately parodied Samuel Johnson&apos;s august <em>Dictionary</em> by applying
                  the same meticulous methods to disreputable vocabulary.
                </p>

                <p>
                  Grose&apos;s dictionary performed a paradox: by cataloguing slang, he began to
                  domesticate it. The very act of documentation—ordering, defining, presenting in
                  alphabetical dignity—drew marginal language toward the center.
                </p>

                <p>
                  By 1801, the OED attests <em>slang</em> extending beyond criminal jargon to mean
                  any professional vocabulary. By 1818, it had expanded further to encompass
                  informal, vivid language generally. The word was climbing the social ladder.
                </p>
              </div>
            </div>

            <div className="slang-column-figure">
              <figure className="slang-figure slang-grose-portrait">
                <div className="slang-figure-image">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/da/Captain_Francisa_Grose%2C_FSA.jpg"
                    alt="Portrait of Captain Francis Grose, antiquary and lexicographer"
                    loading="lazy"
                  />
                </div>
                <figcaption>
                  Francis Grose (1731–1791), antiquary and lexicographer of the vulgar tongue.
                  Wikimedia Commons, Public Domain.
                </figcaption>
              </figure>
            </div>
          </div>

          <figure className="slang-figure slang-dictionary-title">
            <div className="slang-figure-image">
              <img
                src="https://ia800304.us.archive.org/BookReader/BookReaderImages.php?zip=/4/items/bim_eighteenth-century_a-classical-dictionary-o_grose-francis-f-a-s_1785/bim_eighteenth-century_a-classical-dictionary-o_grose-francis-f-a-s_1785_jp2.zip&file=bim_eighteenth-century_a-classical-dictionary-o_grose-francis-f-a-s_1785_jp2/bim_eighteenth-century_a-classical-dictionary-o_grose-francis-f-a-s_1785_0005.jp2&id=bim_eighteenth-century_a-classical-dictionary-o_grose-francis-f-a-s_1785&scale=4"
                alt="Title page of A Classical Dictionary of the Vulgar Tongue by Francis Grose, 1785"
                loading="lazy"
              />
            </div>
            <figcaption>
              Title page of Grose&apos;s <em>Classical Dictionary of the Vulgar Tongue</em>, 1785.
              Internet Archive, Public Domain.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Section 4: Etymology Mystery */}
      <section id="etymology-mystery" className="slang-section slang-mystery">
        <div className="slang-section-content">
          <h2 className="slang-section-title">The Mystery of Origin</h2>

          <div className="slang-etymology-box">
            <div className="slang-dictionary-entry">
              <div className="slang-entry-word">slang</div>
              <div className="slang-entry-pronunciation">/slaŋ/</div>
              <div className="slang-entry-origin">
                <strong>Origin:</strong> unknown
              </div>
            </div>
          </div>

          <div className="slang-narrative">
            <p>
              Here is the paradox at the heart of this etymology: the word <em>slang</em>—which
              names vocabulary of marginal, obscure, uncertain origin—is itself of marginal, obscure,
              uncertain origin. After 250 years of scholarly attention, dictionaries still confess
              ignorance.
            </p>

            <blockquote className="slang-inline-quote">
              <p>&quot;The etymology of slang remains uncertain.&quot;</p>
              <cite>—Oxford English Dictionary</cite>
            </blockquote>

            <blockquote className="slang-inline-quote">
              <p>&quot;Origin unknown.&quot;</p>
              <cite>—Merriam-Webster</cite>
            </blockquote>

            <p>
              The leading theory, proposed by Isaac Taylor in the 1860s, connects <em>slang</em> to
              Norwegian dialect words for narrow strips of land—<em>sleng</em>, meaning a slinging
              or throwing motion, and related terms suggesting something that &quot;moves freely in
              any direction.&quot; The OED calls this &quot;the prime but unproven suspect.&quot;
            </p>

            <p>
              In 2016, etymologist Anatoly Liberman declared confidently that the origin &quot;is
              known.&quot; The OED, reviewing the same evidence, politely disagreed. The mystery
              endures.
            </p>

            <p className="slang-emphasis">
              The word performs what it names: it arrived from the margins, its papers never quite
              in order, and it has never fully disclosed its origins.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Victorian Gatekeeping */}
      <section id="victorian-gatekeeping" className="slang-section slang-victorian">
        <div className="slang-section-content">
          <div className="slang-era-marker">1860–1911</div>
          <h2 className="slang-section-title">Victorian Gatekeeping</h2>

          <div className="slang-narrative">
            <p>
              As slang migrated from the criminal underworld into broader usage, a new question
              emerged: who gets to police the boundary between proper language and improper? The
              Victorian era answered with characteristic confidence.
            </p>
          </div>

          <blockquote className="slang-featured-quote slang-bradley-quote">
            <p>
              &quot;Slang is a conscious offence against some conventional standard of propriety. A
              mere vulgarism is not slang, except when it is purposely adopted... The slang word is
              a deliberate substitute for a word of the vernacular, just as the characters of a
              cipher are substitutes for the letters of the alphabet.&quot;
            </p>
            <cite>
              —Henry Bradley, <em>Encyclopædia Britannica</em>, 11th edition, 1911
            </cite>
          </blockquote>

          <div className="slang-narrative">
            <p>
              Bradley&apos;s definition—&quot;conscious offence against propriety&quot;—reveals the
              class anxiety beneath Victorian linguistic gatekeeping. Slang was not merely informal
              speech; it was deliberate transgression. To use slang was to choose the cipher over
              the letter, the shadow over the light.
            </p>

            <p>
              The British Museum Reading Room, where the <em>Britannica</em> was compiled, stood as
              a monument to proper knowledge—ordered, catalogued, authoritative. Slang represented
              everything that escaped such ordering.
            </p>
          </div>

          <figure className="slang-figure slang-reading-room">
            <div className="slang-figure-image">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c5/British_Museum_Reading_Room_Panorama_Feb_2006.jpg"
                alt="Interior panorama of the British Museum Reading Room, showing the domed ceiling and circular arrangement of desks"
                loading="lazy"
              />
            </div>
            <figcaption>
              The British Museum Reading Room: cathedral of proper language.
              Photo by David Iliff, Wikimedia Commons, CC-BY-SA.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Section 6: American Expansion */}
      <section id="american-expansion" className="slang-section slang-american">
        <div className="slang-section-content">
          <div className="slang-era-marker">1919–1950s</div>
          <h2 className="slang-section-title">American Expansion</h2>

          <div className="slang-narrative">
            <p>
              If Victorian Britain viewed slang as conscious offense, American voices offered
              rehabilitation. No one championed the cause more vigorously than H.L. Mencken, the
              &quot;Sage of Baltimore,&quot; whose 1919 treatise <em>The American Language</em>{' '}
              inverted British class anxieties.
            </p>
          </div>

          <div className="slang-two-column slang-mencken-section">
            <div className="slang-column-figure">
              <figure className="slang-figure slang-mencken-portrait">
                <div className="slang-figure-image">
                  <img
                    src="https://tile.loc.gov/storage-services/service/pnp/van/5a52000/5a52400/5a52407r.jpg"
                    alt="Portrait photograph of H.L. Mencken by Carl Van Vechten, 1932"
                    loading="lazy"
                  />
                </div>
                <figcaption>
                  H.L. Mencken (1880–1956). Photograph by Carl Van Vechten, 1932.
                  Library of Congress, Public Domain.
                </figcaption>
              </figure>
            </div>

            <div className="slang-column-text">
              <blockquote className="slang-featured-quote slang-mencken-quote">
                <p>
                  &quot;Slang in its origin is nearly always respectable; it is devised not by the
                  stupid populace, but by individuals of wit and ingenuity.&quot;
                </p>
                <cite>
                  —H.L. Mencken, <em>The American Language</em>, 1919
                </cite>
              </blockquote>

              <div className="slang-narrative">
                <p>
                  Mencken&apos;s move was radical: slang was not the language of the ignorant
                  masses but the invention of the clever. It demonstrated &quot;wit and
                  ingenuity,&quot; not vulgarity. American democracy, he implied, could create
                  language as surely as British aristocracy could police it.
                </p>
              </div>
            </div>
          </div>

          <div className="slang-narrative">
            <p>
              The Jazz Age provided the proving ground. New vocabulary flooded American speech:
              words for music, for dance, for the exuberance of a nation unbuttoning its linguistic
              collar. Slang was no longer transgression—it was invention.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: Academic Legitimation */}
      <section id="academic-legitimation" className="slang-section slang-academic">
        <div className="slang-section-content">
          <div className="slang-era-marker">1960s–1990s</div>
          <h2 className="slang-section-title">Academic Legitimation</h2>

          <div className="slang-narrative">
            <p>
              The emergence of sociolinguistics as a discipline in the 1960s brought new questions:
              not whether slang was proper, but what it <em>did</em>. How did informal vocabulary
              function in communities? What social work did it perform?
            </p>

            <p>
              The answer was not simple. Some linguists, like William Labov, saw slang as peripheral
              to serious study—relegated, as one critic put it, to &quot;an outer, extra-linguistic
              darkness.&quot; But others recognized something the Victorian gatekeepers had
              missed.
            </p>
          </div>

          <blockquote className="slang-featured-quote slang-eble-quote">
            <p>
              &quot;[Slang is] a colloquial vocabulary that creates solidarity within a social group
              or affiliates speakers with a trend in society.&quot;
            </p>
            <cite>
              —Connie Eble, <em>Slang and Sociability</em>, 1996
            </cite>
          </blockquote>

          <div className="slang-narrative">
            <p>
              Eble&apos;s research on college slang at UNC Chapel Hill reframed the question
              entirely. Slang was not offense against propriety or even creative wit—it was social
              glue. It marked who belonged, who was current, who understood the unwritten rules of a
              community.
            </p>

            <p>
              The word <em>slang</em> had traveled from the underworld to the lecture hall. But
              could it survive its next migration—into the digital world?
            </p>
          </div>
        </div>
      </section>

      {/* Section 8: Digital Present */}
      <section id="digital-present" className="slang-section slang-digital">
        <div className="slang-section-content">
          <div className="slang-era-marker">1999–Present</div>
          <h2 className="slang-section-title">Digital Present</h2>

          <div className="slang-narrative">
            <p>
              In 1999, a website called Urban Dictionary appeared, promising definitions
              &quot;written by you.&quot; The democratic impulse Mencken championed had found its
              ultimate expression: anyone could define slang, anyone could vote on meanings, anyone
              could contribute to the living vocabulary.
            </p>

            <p>
              By the 2020s, TikTok had accelerated slang evolution to unprecedented speed. Words
              like <em>rizz</em>, <em>bussin&apos;</em>, and <em>no cap</em> traveled from niche
              usage to mainstream awareness in weeks rather than decades. The vocabulary that once
              took generations to escape the underworld now went viral overnight.
            </p>
          </div>

          <div className="slang-digital-mockup">
            <div className="slang-search-bar">
              <span className="slang-search-icon">🔍</span>
              <span className="slang-search-text">Define...</span>
            </div>
            <div className="slang-definition-card">
              <div className="slang-def-word">slang</div>
              <div className="slang-def-votes">
                <span className="slang-upvote">▲ 42,847</span>
                <span className="slang-downvote">▼ 1,203</span>
              </div>
              <div className="slang-def-text">
                Words that exist to confuse your parents and make you feel old.
              </div>
              <div className="slang-def-example">
                &quot;I don&apos;t understand any of this slang anymore&quot;
              </div>
            </div>
          </div>

          <div className="slang-narrative">
            <p>
              Yet something curious persists. Even in an age of crowdsourced lexicography, slang
              still marks boundaries. The vocabulary of each generation, each subculture, each
              online community still serves Eble&apos;s function: creating solidarity, signaling
              membership, distinguishing insiders from outsiders.
            </p>

            <p className="slang-emphasis">
              The word <em>slang</em> began as underworld insider vocabulary—and remains, in its
              function if not its status, a marker of who belongs and who does not.
            </p>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="slang-section slang-conclusion">
        <div className="slang-section-content">
          <div className="slang-conclusion-text">
            <p>
              To trace the word <em>slang</em> is to trace the contested boundary between proper
              speech and everything that threatens it. From Toldervy&apos;s 1756 novel to
              today&apos;s crowdsourced definitions, the word has named the outside, the excluded,
              the improper—even as that boundary constantly shifts.
            </p>

            <p>
              The word performs what it describes: uncertain origin, marginal beginnings, gradual
              legitimization. Like the vocabulary it names, <em>slang</em> arrived from somewhere we
              cannot quite pin down, carrying papers we cannot quite verify.
            </p>

            <p>
              And like the language itself, it refuses to hold still.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="slang-section slang-timeline-section">
        <div className="slang-section-content">
          <h2 className="slang-section-title">Timeline</h2>
          <div className="slang-timeline">
            {timeline.map((entry, index) => (
              <div key={index} className="slang-timeline-entry">
                <div className="slang-timeline-year">{entry.year}</div>
                <div className="slang-timeline-content">
                  <div className="slang-timeline-event">{entry.event}</div>
                  {entry.significance && (
                    <div className="slang-timeline-significance">{entry.significance}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sources Section */}
      <section id="sources" className="slang-section slang-sources-section">
        <div className="slang-section-content">
          <h2 className="slang-section-title">Sources</h2>

          <div className="slang-sources-grid">
            <div className="slang-source-category">
              <h3>Primary Sources</h3>
              <ul>
                <li>
                  <a
                    href="https://www.oed.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Oxford English Dictionary
                  </a>
                  , &quot;slang, n.³&quot; and &quot;The rise and rise of slang&quot;
                </li>
                <li>
                  <a
                    href="https://www.merriam-webster.com/dictionary/slang"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Merriam-Webster
                  </a>
                  , &quot;slang&quot;
                </li>
                <li>
                  <a
                    href="https://www.etymonline.com/word/slang"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Online Etymology Dictionary
                  </a>
                  , &quot;slang&quot;
                </li>
              </ul>
            </div>

            <div className="slang-source-category">
              <h3>Historical Dictionaries</h3>
              <ul>
                <li>
                  Francis Grose,{' '}
                  <a
                    href="https://archive.org/details/bim_eighteenth-century_a-classical-dictionary-o_grose-francis-f-a-s_1785"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <em>A Classical Dictionary of the Vulgar Tongue</em>
                  </a>{' '}
                  (1785)
                </li>
                <li>
                  John Camden Hotten, <em>The Slang Dictionary</em> (1859)
                </li>
                <li>
                  Eric Partridge, <em>A Dictionary of Slang and Unconventional English</em> (1937)
                </li>
              </ul>
            </div>

            <div className="slang-source-category">
              <h3>Scholarly Works</h3>
              <ul>
                <li>
                  Henry Bradley, &quot;Slang,&quot;{' '}
                  <a
                    href="https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Slang"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <em>Encyclopædia Britannica</em>, 11th ed.
                  </a>{' '}
                  (1911)
                </li>
                <li>
                  H.L. Mencken, <em>The American Language</em> (1919)
                </li>
                <li>
                  Connie Eble, <em>Slang and Sociability</em> (1996)
                </li>
                <li>
                  Anatoly Liberman,{' '}
                  <a
                    href="https://blog.oup.com/2016/09/slang-word-origin-etymology/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    &quot;The origin of the word &apos;slang&apos; is known!&quot;
                  </a>{' '}
                  <em>OUPblog</em> (2016)
                </li>
              </ul>
            </div>

            <div className="slang-source-category">
              <h3>Images</h3>
              <ul>
                <li>
                  William Hogarth, &quot;Gin Lane&quot; (1751) — Metropolitan Museum of Art, Public
                  Domain
                </li>
                <li>
                  Francis Grose portrait — Francesco Bartolozzi, Yale Center for British Art,
                  Public Domain
                </li>
                <li>
                  H.L. Mencken photograph — Carl Van Vechten, Library of Congress, Public Domain
                </li>
                <li>British Museum Reading Room — Wikimedia Commons, CC-BY-SA</li>
              </ul>
            </div>
          </div>

          <div className="slang-sources-note">
            <p>
              <strong>Note on Etymology:</strong> This essay presents the current scholarly
              consensus that the etymology of &quot;slang&quot; remains uncertain. The Scandinavian
              theory (Isaac Taylor, 1860s; Liberman, 2016) is the leading hypothesis but has not
              been definitively proven. Merriam-Webster states &quot;origin unknown&quot;; the OED
              calls the Scandinavian theory &quot;the prime but unproven suspect.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="slang-footer">
        <div className="slang-footer-content">
          <div className="slang-footer-nav">
            <Link href="/essays" className="slang-footer-link">
              ← All Essays
            </Link>
            <Link href="/essays/etymology" className="slang-footer-link">
              Etymology Essays
            </Link>
          </div>
          <div className="slang-footer-meta">
            <p>A visual etymology essay by Esy</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
