"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import './who-invented-the-fork.css';

const TheForkClient = () => {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Progress bar
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressPercent = (scrollTop / docHeight) * 100;
      setProgress(progressPercent);

      // Parallax for hero background
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translateY(${scrollTop * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Update nav dots
          const sectionId = entry.target.id;
          if (sectionId && sectionId.startsWith('section-')) {
            const sectionNum = parseInt(sectionId.split('-')[1]);
            setActiveSection(sectionNum);
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-in, section[id^="section-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Initial animation trigger for hero
    setTimeout(() => {
      document.querySelectorAll('.hero-content .animate-in').forEach((el) => {
        el.classList.add('visible');
      });
    }, 100);
  }, []);

  const scrollToSection = (sectionNum: number) => {
    const section = document.getElementById(`section-${sectionNum}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="scrollytelling-container" style={{ marginTop: '4rem' }}>
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Navigation Dots */}
      <nav className="nav-dots">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            className={`nav-dot ${activeSection === num ? 'active' : ''}`}
            onClick={() => scrollToSection(num)}
            aria-label={`Go to section ${num + 1}`}
          />
        ))}
      </nav>

      {/* Hero Section */}
      <section className="section-dark noise-overlay" id="section-0">
        <div className="hero-bg" ref={heroBgRef} />
        <div className="hero-content">
          <svg className="hero-fork animate-float" viewBox="0 0 100 400">
            <defs>
              <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E8E8E8" />
                <stop offset="30%" stopColor="#B8B8B8" />
                <stop offset="50%" stopColor="#F5F5F5" />
                <stop offset="70%" stopColor="#A0A0A0" />
                <stop offset="100%" stopColor="#D0D0D0" />
              </linearGradient>
            </defs>
            <path
              d="M30 10 L30 100 Q30 120 35 140 L35 380 Q35 390 40 390 L60 390 Q65 390 65 380 L65 140 Q70 120 70 100 L70 10 M30 10 L30 100 M45 10 L45 100 M55 10 L55 100 M70 10 L70 100"
              fill="none"
              stroke="url(#silverGradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          <p className="chapter-label animate-in stagger-1">A Journey Through Time</p>

          <h1 className="animate-in stagger-2">
            The <span className="italic text-gradient">Fork</span>
          </h1>

          <p className="lead-text max-w-2xl mx-auto animate-in stagger-3">
            From ancient civilizations to modern tables, discover the extraordinary 4,000-year journey of
            humanity&apos;s most revolutionary eating utensil.
          </p>

          <div className="scroll-indicator animate-in stagger-4">
            <span>Scroll to Explore</span>
            <div className="scroll-line" />
          </div>
        </div>
      </section>

      {/* Origins - Ancient Mesopotamia */}
      <section className="section-dark animate-in" id="section-1">
        <div className="timeline-marker">
          <div className="timeline-line" />
          <div className="timeline-year text-gold">3000 BCE</div>
          <div className="timeline-line" />
        </div>

        <div className="content">
          <div className="grid-2">
            <div>
              <span className="chapter-label">Chapter I — Origins</span>
              <h2 className="text-light">
                The Cradle of
                <br />
                <span className="italic text-gradient">Civilization</span>
              </h2>
              <p className="lead-text mb-6">
                In the fertile crescent of ancient Mesopotamia, the first forks emerged not as dining implements, but
                as tools of ritual and ceremony. These two-pronged instruments, crafted from bronze, were used by
                priests to handle sacred offerings—keeping human hands from touching food destined for the gods.
              </p>
              <p className="lead-text">
                Archaeological discoveries in the royal tombs of Ur reveal ornate serving forks dating back five
                millennia, their elegant curves suggesting a sophistication we rarely associate with such ancient times.
              </p>
            </div>
            <div className="fork-illustration">
              <div className="fork-circle">
                <div className="fork-circle-ring" />
                <div className="fork-circle-ring-inner" />
                <svg viewBox="0 0 80 200" width="100" className="animate-float">
                  <defs>
                    <linearGradient id="bronzeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#CD7F32" />
                      <stop offset="50%" stopColor="#8B4513" />
                      <stop offset="100%" stopColor="#654321" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M25 10 L25 60 Q25 80 30 90 L30 180 Q30 190 40 190 Q50 190 50 180 L50 90 Q55 80 55 60 L55 10"
                    fill="none"
                    stroke="url(#bronzeGradient)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ancient Egypt & Greece */}
      <section className="section-light animate-in" id="section-2">
        <div className="timeline-marker">
          <div className="timeline-line-brown" />
          <div className="timeline-year text-brown">1000 BCE</div>
          <div className="timeline-line-brown" />
        </div>

        <div className="content">
          <div className="text-center mb-12">
            <span className="chapter-label">Chapter II — The Classical World</span>
            <h2 className="text-dark">
              Egypt, Greece &<br />
              <span className="italic">The Golden Age</span>
            </h2>
          </div>

          <div className="grid-2">
            <div className="card">
              <div className="card-corner card-corner-tl" />
              <div className="card-corner card-corner-br" />
              <h3 className="font-display text-dark card-title">Ancient Egypt</h3>
              <p className="font-serif card-text">
                Large bronze forks graced the kitchens of pharaohs, though they remained cooking tools rather than table
                implements. The Egyptians preferred to dine with their fingers, considering direct contact with food a
                sensual pleasure not to be mediated by metal.
              </p>
            </div>

            <div className="card">
              <div className="card-corner card-corner-tl" />
              <div className="card-corner card-corner-br" />
              <h3 className="font-display text-dark card-title">Classical Greece</h3>
              <p className="font-serif card-text">
                Greek symposiums saw the introduction of small forks for specific delicacies. Wealthy Athenians used
                silver forks to spear olives and honeyed fruits, though the practice remained confined to the elite and
                never entered common usage.
              </p>
            </div>
          </div>

          <div className="quote mt-12">
            <p className="text-dark">
              &quot;The fork is but an affectation of the East, unsuited to the robust appetites of true Romans.&quot;
            </p>
            <cite>— Attributed to Seneca, 1st Century CE</cite>
          </div>
        </div>
      </section>

      {/* Byzantine Empire */}
      <section className="section-accent animate-in" id="section-3">
        <div className="timeline-marker">
          <div className="timeline-line" />
          <div className="timeline-year text-gold">400 CE</div>
          <div className="timeline-line" />
        </div>

        <div className="content">
          <div className="grid-2">
            <div className="image-container">
              <div className="image-container-content">
                <div className="image-container-blur" />
                <svg viewBox="0 0 100 400" width="80" style={{ position: 'relative', zIndex: 10 }}>
                  <path
                    d="M30 10 L30 100 Q30 120 35 140 L35 380 Q35 390 40 390 L60 390 Q65 390 65 380 L65 140 Q70 120 70 100 L70 10 M30 10 L30 100 M45 10 L45 100 M55 10 L55 100 M70 10 L70 100"
                    fill="none"
                    stroke="url(#silverGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="image-container-caption">
                <p>&quot;A golden fork from the Byzantine court&quot;</p>
                <span>Constantinople, 6th Century</span>
              </div>
            </div>

            <div>
              <span className="chapter-label">Chapter III — The Eastern Empire</span>
              <h2 className="text-light">
                Byzantine
                <br />
                <span className="italic text-gradient">Refinement</span>
              </h2>
              <p className="lead-text mb-6">
                It was in the glittering courts of Byzantium that the table fork first achieved true prominence. The
                Byzantine aristocracy embraced the fork as a symbol of refinement and civilization, distinguishing
                themselves from the &quot;barbaric&quot; customs of Western Europe.
              </p>
              <p className="lead-text">
                Golden forks with ornate handles became treasured possessions, passed down through generations of noble
                families. The fork had transformed from a mere tool into a statement of cultural superiority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Scandalous Princess */}
      <section className="section-dark animate-in" id="section-4">
        <div className="timeline-marker">
          <div className="timeline-line" />
          <div className="timeline-year text-gold">1004 CE</div>
          <div className="timeline-line" />
        </div>

        <div className="content text-center">
          <span className="chapter-label">Chapter IV — The Great Scandal</span>
          <h2 className="text-light mb-8">
            The Princess &<br />
            <span className="italic text-gradient">The Golden Fork</span>
          </h2>

          <div className="relative quote-section">
            <div className="divider" />
            <div className="quote-box max-w-2xl mx-auto">
              <p className="text-light">
                &quot;God in his wisdom has provided man with natural forks—his fingers. Therefore it is an insult to
                Him to substitute artificial metallic forks for them when eating.&quot;
              </p>
              <cite>— Saint Peter Damian</cite>
            </div>
          </div>

          <div className="max-w-3xl mx-auto scandal-text">
            <p className="lead-text mb-6">
              When Byzantine Princess Maria Argyropoulina married the Venetian Doge&apos;s son in 1004 CE, she brought
              with her a golden case containing several small forks. Her use of this utensil at the wedding banquet
              caused immediate scandal.
            </p>
            <p className="lead-text mb-6">
              The Venetian clergy condemned her as sinfully proud and excessively delicate. When she died of plague two
              years later, Saint Peter Damian declared it divine punishment for her vanity.
            </p>
            <p className="lead-text italic">
              The fork&apos;s reputation in Western Europe would not recover for another five centuries.
            </p>
          </div>
        </div>
      </section>

      {/* Medieval Resistance */}
      <section className="section-light animate-in" id="section-5">
        <div className="timeline-marker">
          <div className="timeline-line-brown" />
          <div className="timeline-year text-brown">1100-1400</div>
          <div className="timeline-line-brown" />
        </div>

        <div className="content">
          <div className="grid-2">
            <div>
              <span className="chapter-label">Chapter V — The Dark Ages</span>
              <h2 className="text-dark">
                Medieval Europe&apos;s
                <br />
                <span className="italic">Stubborn Resistance</span>
              </h2>
              <p className="lead-text mb-6">
                Throughout the medieval period, Europeans remained steadfastly opposed to the fork. Knights and nobles
                alike ate with their hands, using thick slices of stale bread called &quot;trenchers&quot; as plates. To
                use a fork was considered effeminate, pretentious, and even ungodly.
              </p>
              <p className="lead-text">
                The few forks that existed in medieval courts were primarily used for serving, not personal dining. Even
                these were viewed with suspicion—their pointed tines too reminiscent of the devil&apos;s pitchfork for
                comfortable Christian sensibilities.
              </p>
            </div>

            <div>
              <div className="info-box">
                <h3>Did You Know?</h3>
                <p>
                  Medieval diners followed strict etiquette: use only three fingers, never lick them, and always wipe on
                  the tablecloth—never your clothes. The fork was seen as an unnecessary complication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Italian Renaissance */}
      <section className="section-accent animate-in" id="section-6">
        <div className="timeline-marker">
          <div className="timeline-line" />
          <div className="timeline-year text-gold">1500s</div>
          <div className="timeline-line" />
        </div>

        <div className="content">
          <div className="text-center mb-12">
            <span className="chapter-label">Chapter VI — Renaissance</span>
            <h2 className="text-light">
              Italy&apos;s Culinary
              <br />
              <span className="italic text-gradient">Revolution</span>
            </h2>
          </div>

          <div className="grid-2">
            <div>
              <p className="font-serif renaissance-intro">
                The fork&apos;s rehabilitation began in Renaissance Italy, where wealthy merchants and nobles sought to
                distinguish themselves through elaborate table manners.
              </p>
              <p className="lead-text mb-6">
                Italian pasta—particularly the long, slippery varieties emerging from Naples—practically demanded a
                fork. The new noodle dishes were impossible to eat elegantly with fingers alone.
              </p>
              <p className="lead-text">
                By the 16th century, Italian courts had developed elaborate fork designs with multiple tines, and the
                practice of using personal forks had spread throughout the peninsula&apos;s upper classes.
              </p>
            </div>

            <div>
              <div className="fork-grid">
                {[0, 90, 180, 270].map((rotation, index) => (
                  <div key={index} className="fork-grid-item">
                    <svg
                      viewBox="0 0 100 400"
                      width="40"
                      style={{ opacity: 0.7 + index * 0.1, transform: `rotate(${rotation}deg)` }}
                    >
                      <path
                        d="M30 10 L30 100 Q30 120 35 140 L35 380 Q35 390 40 390 L60 390 Q65 390 65 380 L65 140 Q70 120 70 100 L70 10 M30 10 L30 100 M45 10 L45 100 M55 10 L55 100 M70 10 L70 100"
                        fill="none"
                        stroke="url(#silverGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                ))}
              </div>
              <p className="chapter-label mt-4 text-center">Evolution of Italian Fork Designs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catherine de' Medici */}
      <section className="section-dark animate-in" id="section-7">
        <div className="timeline-marker">
          <div className="timeline-line" />
          <div className="timeline-year text-gold">1533</div>
          <div className="timeline-line" />
        </div>

        <div className="content max-w-3xl mx-auto">
          <div className="relative pl-8">
            <div className="vertical-line" />

            <span className="chapter-label">Chapter VII — The Queen&apos;s Dowry</span>

            <h2 className="text-light mb-8">
              Catherine
              <br />
              <span className="italic text-gradient">de&apos; Medici</span>
            </h2>

            <p className="font-serif catherine-intro">
              When the fourteen-year-old Catherine de&apos; Medici traveled from Florence to France to marry the future
              King Henry II, she brought more than just her dowry. She brought an entire Italian kitchen staff,
              elaborate Florentine recipes, and most controversially—a set of silver forks.
            </p>

            <div className="catherine-quote">
              <p className="font-display text-gold italic text-center">
                &quot;She transformed French cuisine and
                <br />
                French manners in a single generation.&quot;
              </p>
            </div>

            <p className="lead-text mb-6">
              Initially mocked by the French court, Catherine&apos;s Italian habits gradually gained acceptance. Her
              sons—three of whom would become kings—were raised using forks, and the practice slowly spread among the
              French aristocracy.
            </p>

            <p className="lead-text">
              By the end of Catherine&apos;s life, forks had become fashionable in Paris, though the French still
              insisted on a distinctively Gallic style: smaller, more delicate, and always wielded in the left hand
              while cutting with a knife in the right.
            </p>
          </div>
        </div>
      </section>

      {/* England & America */}
      <section className="section-light animate-in" id="section-8">
        <div className="timeline-marker">
          <div className="timeline-line-brown" />
          <div className="timeline-year text-brown">1600-1800</div>
          <div className="timeline-line-brown" />
        </div>

        <div className="content">
          <div className="grid-2">
            <div>
              <span className="chapter-label">Chapter VIII — Crossing Borders</span>
              <h2 className="text-dark">
                England&apos;s
                <br />
                <span className="italic">Reluctant Adoption</span>
              </h2>
              <p className="lead-text mb-6">
                The English proved even more resistant than the French. When Thomas Coryate introduced forks to England
                after his Italian travels in 1611, he was mercilessly mocked as &quot;furcifer&quot;—a pun meaning both
                &quot;fork-bearer&quot; and &quot;gallows bird.&quot;
              </p>
              <p className="lead-text">
                Yet by the 1660s, following the Restoration of Charles II (who had spent his exile in France), forks
                finally became accepted in English society. The Great Fire of London in 1666 even sparked a boom in
                cutlery production as wealthy families replaced their lost household goods.
              </p>
            </div>

            <div>
              <h2 className="text-dark">
                The American
                <br />
                <span className="italic">Exception</span>
              </h2>
              <p className="lead-text mb-6">
                American colonists initially adopted the Continental style of fork use, but developed their own unique
                practice: cutting food with the knife in the right hand, then switching the fork from left to right to
                eat.
              </p>
              <p className="lead-text mb-6">
                This &quot;zigzag&quot; method, considered inefficient by Europeans, became a distinctly American
                tradition that persists to this day—a small culinary declaration of independence.
              </p>

              <div className="info-box mt-8">
                <p className="chapter-label mb-2">By the Numbers</p>
                <p className="font-display american-year">1850</p>
                <p className="font-serif opacity-70 american-caption">
                  The year forks became common in middle-class American homes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Evolution & Conclusion */}
      <section className="section-accent animate-in" id="section-9">
        <div className="timeline-marker">
          <div className="timeline-line" />
          <div className="timeline-year text-gold">Today</div>
          <div className="timeline-line" />
        </div>

        <div className="content text-center">
          <span className="chapter-label">Chapter IX — The Modern Era</span>
          <h2 className="text-light mb-8">
            Four Thousand Years
            <br />
            <span className="italic text-gradient">In Your Hand</span>
          </h2>

          <div className="max-w-3xl mx-auto mb-12">
            <p className="font-serif modern-intro">
              Today, we lift our forks without a second thought—unaware that we&apos;re participating in a ritual
              thousands of years in the making.
            </p>
            <p className="lead-text">
              From Mesopotamian temples to Byzantine courts, from Italian renaissance halls to American diners, the fork
              has traveled across continents and centuries, carrying with it stories of scandal, faith, fashion, and the
              eternal human quest for civilization at the table.
            </p>
          </div>

          <div className="stats-grid mb-12">
            <div className="stat">
              <div className="stat-number">4000+</div>
              <div className="stat-label">Years of History</div>
            </div>
            <div className="stat">
              <div className="stat-number">4</div>
              <div className="stat-label">Tines (Usually)</div>
            </div>
            <div className="stat">
              <div className="stat-number">200+</div>
              <div className="stat-label">Fork Types Today</div>
            </div>
            <div className="stat">
              <div className="stat-number">∞</div>
              <div className="stat-label">Meals Transformed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="section-dark final-section">
        <div className="final-bg" />

        <div className="content text-center relative z-10">
          <svg viewBox="0 0 100 400" width="60" className="final-fork">
            <path
              d="M30 10 L30 100 Q30 120 35 140 L35 380 Q35 390 40 390 L60 390 Q65 390 65 380 L65 140 Q70 120 70 100 L70 10 M30 10 L30 100 M45 10 L45 100 M55 10 L55 100 M70 10 L70 100"
              fill="none"
              stroke="url(#silverGradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          <h2 className="font-display text-light mb-8 final-title">
            Next time you pick up a fork,
            <br />
            <span className="italic text-gradient">remember its journey.</span>
          </h2>

          <p className="lead-text max-w-2xl mx-auto mb-12 final-text">
            You hold in your hand an object that has been condemned by saints, wielded by queens, scorned by nations,
            and ultimately embraced by billions. The humble fork is nothing less than a monument to human progress—one
            bite at a time.
          </p>

          <button className="btn" onClick={scrollToTop}>
            <span>Return to Beginning</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ transform: 'rotate(180deg)' }}>
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="footer">
            <p>A Scrollytelling Experience</p>
            <Link href="/scrollytelling" className="footer-link">
              ← Back to Scrollytelling
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TheForkClient;

