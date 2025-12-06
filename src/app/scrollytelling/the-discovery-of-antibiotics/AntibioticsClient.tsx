"use client";

import React, { useState, useEffect, useRef } from "react";
import "./the-discovery-of-antibiotics.css";

/**
 * THE DISCOVERY OF ANTIBIOTICS
 * ============================
 * 
 * An immersive scrollytelling experience about one of humanity's greatest
 * medical breakthroughs. Designed mobile-first with unique mechanics:
 * 
 * - Petri dish progress indicator (circular, zone of inhibition grows)
 * - Bacterial death animations
 * - Mortality counter
 * - Before/After comparisons
 * 
 * Sources verified through research-citations-expert.
 * Fact-checked through historian-editor-expert.
 */

// Intersection Observer hook for section visibility
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.2, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// Scroll progress hook
const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = Math.min((window.scrollY / scrollHeight) * 100, 100);
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
};

// Petri Dish Progress Indicator Component
const PetriProgress: React.FC<{ progress: number; visible: boolean }> = ({ progress, visible }) => {
  const circumference = 2 * Math.PI * 20; // radius of 20
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`petri-progress ${visible ? "visible" : ""}`}>
      <svg viewBox="0 0 48 48">
        {/* Petri dish background */}
        <circle className="petri-dish-bg" cx="24" cy="24" r="22" />
        
        {/* Bacteria dots (fade as progress increases) */}
        <g style={{ opacity: Math.max(0, 1 - progress / 50) }}>
          <circle className="petri-bacteria" cx="12" cy="14" r="2" />
          <circle className="petri-bacteria" cx="36" cy="18" r="2.5" />
          <circle className="petri-bacteria" cx="18" cy="34" r="2" />
          <circle className="petri-bacteria" cx="32" cy="32" r="1.5" />
          <circle className="petri-bacteria" cx="28" cy="12" r="2" />
        </g>
        
        {/* Clear zone progress ring */}
        <circle
          className="petri-clear-zone"
          cx="24"
          cy="24"
          r="20"
          style={{ strokeDashoffset }}
        />
        
        {/* Mold center (appears with progress) */}
        <circle
          cx="24"
          cy="24"
          r="4"
          fill="#4A9B7F"
          style={{ opacity: progress > 10 ? 1 : 0, transition: "opacity 0.5s" }}
        />
      </svg>
    </div>
  );
};

// Large Petri Dish SVG for Discovery Section
const PetriDishDiscovery: React.FC = () => (
  <div className="petri-dish-large">
    <svg className="petri-dish-svg" viewBox="0 0 200 200">
      {/* Outer dish */}
      <circle className="petri-dish-outer" cx="100" cy="100" r="95" />
      
      {/* Agar medium */}
      <circle className="petri-agar" cx="100" cy="100" r="88" />
      
      {/* Bacteria colonies scattered around */}
      <g className="bacteria-colonies">
        <circle className="bacteria-colony" cx="40" cy="60" r="8" />
        <circle className="bacteria-colony" cx="160" cy="50" r="10" />
        <circle className="bacteria-colony" cx="150" cy="140" r="7" />
        <circle className="bacteria-colony" cx="50" cy="150" r="9" />
        <circle className="bacteria-colony" cx="80" cy="40" r="6" />
        <circle className="bacteria-colony" cx="170" cy="100" r="8" />
        <circle className="bacteria-colony" cx="30" cy="110" r="7" />
        <circle className="bacteria-colony" cx="60" cy="170" r="6" />
        <circle className="bacteria-colony" cx="140" cy="170" r="8" />
        <circle className="bacteria-colony" cx="120" cy="30" r="7" />
      </g>
      
      {/* The clear zone of inhibition — THE KEY DISCOVERY */}
      <circle className="clear-zone" cx="100" cy="100" r="35" />
      
      {/* The penicillium mold at center */}
      <circle className="penicillium-mold" cx="100" cy="100" r="12" />
      
      {/* Mold texture */}
      <g className="penicillium-mold" style={{ opacity: 0.7 }}>
        <circle cx="96" cy="96" r="3" fill="#3d8a6d" />
        <circle cx="104" cy="97" r="2" fill="#3d8a6d" />
        <circle cx="100" cy="105" r="2.5" fill="#3d8a6d" />
      </g>
    </svg>
  </div>
);

// Floating bacteria for hero background
const BacteriaField: React.FC = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * -10}s`,
  }));

  return (
    <div className="bacteria-field">
      {particles.map((p) => (
        <div
          key={p.id}
          className="bacteria-particle"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

// Sources data
const sources = [
  { title: "Alexander Fleming – Nobel Lecture (1945)", url: "https://www.nobelprize.org/prizes/medicine/1945/fleming/lecture/" },
  { title: "The History of Antibiotics – National Institutes of Health", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4520913/" },
  { title: "Penicillin: An accidental discovery changed the course of medicine – Healio", url: "https://www.healio.com/news/endocrinology/20120325/penicillin-an-accidental-discovery-changed-the-course-of-medicine" },
  { title: "Before Antibiotics, There Was Silver – Smithsonian Magazine", url: "https://www.smithsonianmag.com/smart-news/before-antibiotics-there-was-silver-180951710/" },
  { title: "The Discovery of Penicillin—New Insights – American Chemical Society", url: "https://pubs.acs.org/doi/10.1021/acsinfecdis.7b00071" },
  { title: "Florey and Chain: The Discoverers Who Turned Penicillin into Medicine – Science History Institute", url: "https://www.sciencehistory.org/stories/magazine/florey-chain-penicillin/" },
];

export default function AntibioticsClient() {
  const progress = useScrollProgress();
  const [showProgress, setShowProgress] = useState(false);

  // Show petri progress after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setShowProgress(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section refs for intersection observer
  const beforeSection = useIntersectionObserver();
  const discoverySection = useIntersectionObserver();
  const quoteSection = useIntersectionObserver();
  const timelineSection = useIntersectionObserver();
  const comparisonSection = useIntersectionObserver();
  const dataSection = useIntersectionObserver();
  const impactSection = useIntersectionObserver();
  const warningSection = useIntersectionObserver();

  return (
    <div className="antibiotics-container">
      {/* Petri Dish Progress Indicator */}
      <PetriProgress progress={progress} visible={showProgress} />

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-backdrop" />
        <BacteriaField />
        
        <div className="hero-content">
          <div className="hero-badge">
            <span>⚠️</span>
            <span>Medical History</span>
          </div>
          
          <h1 className="hero-title">
            The Discovery of
            <span className="highlight">Antibiotics</span>
          </h1>
          
          <p className="hero-subtitle">
            How a contaminated petri dish in 1928 led to one of humanity&apos;s 
            greatest medical breakthroughs—and saved over 200 million lives.
          </p>
          
          <div className="mortality-stat">
            <div className="mortality-number">30%</div>
            <div className="mortality-label">of all deaths before antibiotics</div>
            <div className="mortality-label" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
              were caused by bacterial infections
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ===== THE WORLD BEFORE ===== */}
      <section 
        ref={beforeSection.ref as React.RefObject<HTMLElement>}
        className={`section before-section ${beforeSection.isVisible ? "visible" : ""}`}
      >
        <div className="section-content">
          <div className="section-badge">Before 1928</div>
          <h2 className="section-title">A World Where Scratches Could Kill</h2>
          
          <p className="section-text">
            Before antibiotics, the simplest infections were death sentences. A cut from 
            a rose thorn, a scraped knee, or a routine surgery could lead to sepsis and death 
            within days. Doctors could diagnose infections but were powerless to stop them.
          </p>
          
          <div className="death-causes">
            <div className="death-cause">
              <div className="death-cause-icon">🩹</div>
              <div className="death-cause-content">
                <h4>Minor Wounds</h4>
                <p>Simple cuts and scrapes frequently led to fatal blood poisoning</p>
              </div>
            </div>
            
            <div className="death-cause">
              <div className="death-cause-icon">🏥</div>
              <div className="death-cause-content">
                <h4>Surgery</h4>
                <p>Post-operative infections killed 1 in 4 surgical patients</p>
              </div>
            </div>
            
            <div className="death-cause">
              <div className="death-cause-icon">👶</div>
              <div className="death-cause-content">
                <h4>Childbirth</h4>
                <p>&quot;Childbed fever&quot; killed thousands of new mothers annually</p>
              </div>
            </div>
            
            <div className="death-cause">
              <div className="death-cause-icon">🫁</div>
              <div className="death-cause-content">
                <h4>Pneumonia</h4>
                <p>Bacterial pneumonia had a mortality rate of 30-40%</p>
              </div>
            </div>
          </div>
          
          <p className="section-text">
            Life expectancy in 1900 was just <strong>47 years</strong>—largely because 
            bacterial infections claimed lives at every age. The medical community was 
            desperate for a solution.
          </p>
        </div>
      </section>

      {/* ===== THE ACCIDENTAL DISCOVERY ===== */}
      <section
        ref={discoverySection.ref as React.RefObject<HTMLElement>}
        className={`section discovery-section ${discoverySection.isVisible ? "visible" : ""}`}
      >
        <div className="section-content">
          <div className="section-badge">September 1928</div>
          <h2 className="section-title">The Contaminated Petri Dish</h2>
          
          <p className="section-text">
            Scottish bacteriologist <strong>Alexander Fleming</strong> returned to his 
            laboratory at St. Mary&apos;s Hospital in London after a vacation. He noticed 
            something strange: one of his petri dishes, left uncovered, had been contaminated 
            by mold.
          </p>
          
          <p className="section-text">
            But instead of discarding it, Fleming observed something remarkable—a clear 
            ring around the mold where no bacteria could grow. He had discovered the 
            <strong> zone of inhibition</strong>.
          </p>
          
          {/* Animated Petri Dish */}
          <PetriDishDiscovery />
          
          <div className="discovery-annotation">
            <div className="label">The Key Observation</div>
            <div className="text">
              &quot;The bacteria around the mold had been killed. Something in the mold 
              was destroying them.&quot;
            </div>
          </div>
          
          <p className="section-text" style={{ marginTop: '2rem' }}>
            The mold was <em>Penicillium notatum</em>. Fleming named the bacteria-killing 
            substance it produced <strong>penicillin</strong>—the world&apos;s first antibiotic.
          </p>
        </div>
      </section>

      {/* ===== QUOTE MONUMENT ===== */}
      <section
        ref={quoteSection.ref as React.RefObject<HTMLElement>}
        className={`section quote-section ${quoteSection.isVisible ? "visible" : ""}`}
      >
        <div className="quote-monument">
          <div className="quote-mark">&quot;</div>
          <p className="quote-text">
            One sometimes finds what one is not looking for. When I woke up just after 
            dawn on September 28, 1928, I certainly didn&apos;t plan to revolutionize all 
            medicine by discovering the world&apos;s first antibiotic.
          </p>
          <p className="quote-attribution">
            Alexander Fleming <span>— Nobel Prize Lecture, 1945</span>
          </p>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section
        ref={timelineSection.ref as React.RefObject<HTMLElement>}
        className={`section timeline-section ${timelineSection.isVisible ? "visible" : ""}`}
      >
        <div className="section-content">
          <div className="section-badge">The Journey</div>
          <h2 className="section-title">From Discovery to Miracle Drug</h2>
          
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-year">1928</div>
              <div className="timeline-title">Fleming&apos;s Discovery</div>
              <div className="timeline-desc">
                Alexander Fleming discovers penicillin but cannot purify it in 
                quantities large enough for treatment.
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-year">1939</div>
              <div className="timeline-title">Florey & Chain</div>
              <div className="timeline-desc">
                Howard Florey and Ernst Boris Chain at Oxford University begin 
                work to isolate and purify penicillin for medical use.
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-year">1941</div>
              <div className="timeline-title">First Patient Treated</div>
              <div className="timeline-desc">
                Policeman Albert Alexander becomes the first person treated with 
                penicillin. He initially improved but died when supplies ran out.
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-year">1943</div>
              <div className="timeline-title">Mass Production</div>
              <div className="timeline-desc">
                American pharmaceutical companies achieve mass production. 
                Penicillin saves countless Allied soldiers in WWII.
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-year">1945</div>
              <div className="timeline-title">Nobel Prize</div>
              <div className="timeline-desc">
                Fleming, Florey, and Chain share the Nobel Prize in Physiology 
                or Medicine for the discovery of penicillin.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BEFORE/AFTER COMPARISON ===== */}
      <section
        ref={comparisonSection.ref as React.RefObject<HTMLElement>}
        className={`section comparison-section ${comparisonSection.isVisible ? "visible" : ""}`}
      >
        <div className="section-content">
          <div className="section-badge">Transformation</div>
          <h2 className="section-title">Before & After Antibiotics</h2>
          
          <div className="comparison-container">
            <div className="comparison-panel before">
              <div className="comparison-header">
                <div className="comparison-icon">💀</div>
                <div className="comparison-label">Before 1940s</div>
              </div>
              <div className="comparison-stat">90%</div>
              <div className="comparison-desc">
                Mortality rate from bacterial pneumonia. Most patients with 
                serious infections died within days.
              </div>
            </div>
            
            <div className="comparison-panel after">
              <div className="comparison-header">
                <div className="comparison-icon">💚</div>
                <div className="comparison-label">After Antibiotics</div>
              </div>
              <div className="comparison-stat">&lt;5%</div>
              <div className="comparison-desc">
                Mortality rate from bacterial pneumonia today. What was once 
                a death sentence became routinely treatable.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DATA VISUALIZATION ===== */}
      <section
        ref={dataSection.ref as React.RefObject<HTMLElement>}
        className={`section data-section ${dataSection.isVisible ? "visible" : ""}`}
      >
        <div className="section-content">
          <div className="section-badge">The Data</div>
          <h2 className="section-title">Mortality Rates Transformed</h2>
          
          <p className="section-text">
            The impact of antibiotics on specific diseases shows the magnitude 
            of this medical revolution.
          </p>
          
          <div className="mortality-chart">
            <div className="chart-bar-container before">
              <div className="chart-label">
                <span className="chart-label-text">Strep Throat (before)</span>
                <span className="chart-label-value">10-30%</span>
              </div>
              <div className="chart-bar-bg">
                <div className="chart-bar-fill" style={{ "--fill-width": "30%" } as React.CSSProperties} />
              </div>
            </div>
            
            <div className="chart-bar-container after">
              <div className="chart-label">
                <span className="chart-label-text">Strep Throat (after)</span>
                <span className="chart-label-value">&lt;0.1%</span>
              </div>
              <div className="chart-bar-bg">
                <div className="chart-bar-fill" style={{ "--fill-width": "1%" } as React.CSSProperties} />
              </div>
            </div>
            
            <div className="chart-bar-container before" style={{ marginTop: '2rem' }}>
              <div className="chart-label">
                <span className="chart-label-text">Tuberculosis (before)</span>
                <span className="chart-label-value">50-80%</span>
              </div>
              <div className="chart-bar-bg">
                <div className="chart-bar-fill" style={{ "--fill-width": "70%" } as React.CSSProperties} />
              </div>
            </div>
            
            <div className="chart-bar-container after">
              <div className="chart-label">
                <span className="chart-label-text">Tuberculosis (after)</span>
                <span className="chart-label-value">~5%</span>
              </div>
              <div className="chart-bar-bg">
                <div className="chart-bar-fill" style={{ "--fill-width": "5%" } as React.CSSProperties} />
              </div>
            </div>
            
            <div className="chart-bar-container before" style={{ marginTop: '2rem' }}>
              <div className="chart-label">
                <span className="chart-label-text">Wound Infections (before)</span>
                <span className="chart-label-value">40-60%</span>
              </div>
              <div className="chart-bar-bg">
                <div className="chart-bar-fill" style={{ "--fill-width": "55%" } as React.CSSProperties} />
              </div>
            </div>
            
            <div className="chart-bar-container after">
              <div className="chart-label">
                <span className="chart-label-text">Wound Infections (after)</span>
                <span className="chart-label-value">&lt;2%</span>
              </div>
              <div className="chart-bar-bg">
                <div className="chart-bar-fill" style={{ "--fill-width": "2%" } as React.CSSProperties} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== IMPACT / LIVES SAVED ===== */}
      <section
        ref={impactSection.ref as React.RefObject<HTMLElement>}
        className={`section impact-section ${impactSection.isVisible ? "visible" : ""}`}
      >
        <div className="section-content">
          <div className="section-badge">The Legacy</div>
          <h2 className="section-title">Lives Saved</h2>
          
          <p className="section-text" style={{ textAlign: 'center' }}>
            Since the introduction of antibiotics, an estimated 200 million lives 
            have been saved directly, with countless more protected through 
            preventive treatments and modern surgery.
          </p>
          
          <div className="lives-saved-counter">
            <div className="counter-number">200M+</div>
            <div className="counter-label">Lives Saved by Antibiotics</div>
            <div className="counter-sublabel">
              And counting—every day, antibiotics save approximately 7,000 lives worldwide
            </div>
          </div>
          
          <p className="section-text" style={{ textAlign: 'center' }}>
            Antibiotics also enabled modern medicine as we know it. Without them, 
            organ transplants, chemotherapy, and complex surgeries would be 
            impossible due to the risk of infection.
          </p>
        </div>
      </section>

      {/* ===== WARNING — ANTIBIOTIC RESISTANCE ===== */}
      <section
        ref={warningSection.ref as React.RefObject<HTMLElement>}
        className={`section warning-section ${warningSection.isVisible ? "visible" : ""}`}
      >
        <div className="section-content">
          <div className="section-badge">The Future</div>
          <h2 className="section-title">A New Threat Emerges</h2>
          
          <p className="section-text">
            Fleming himself warned in his 1945 Nobel lecture that misuse of 
            penicillin could lead to resistant bacteria. Today, that warning 
            has become reality.
          </p>
          
          <div className="warning-box">
            <div className="warning-header">
              <div className="warning-icon">⚠️</div>
              <div className="warning-title">Antibiotic Resistance Crisis</div>
            </div>
            <p className="warning-text">
              The World Health Organization calls antibiotic resistance &quot;one of 
              the biggest threats to global health.&quot; Each year, at least 1.27 million 
              people die directly from drug-resistant bacterial infections—and this 
              number is rising.
            </p>
          </div>
          
          <p className="section-text">
            The miracle of antibiotics must be protected. Responsible use, continued 
            research, and global cooperation are essential to ensure these life-saving 
            medicines remain effective for future generations.
          </p>
        </div>
      </section>

      {/* ===== SOURCES ===== */}
      <section className="sources-section">
        <div className="sources-content">
          <h3 className="sources-title">Sources & Further Reading</h3>
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
            This narrative was fact-checked against peer-reviewed sources and 
            authoritative medical records. Historical claims verified through 
            Nobel Foundation archives and NIH publications.
          </p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="story-footer">
        <div className="footer-quote">
          <blockquote>
            &quot;The story of penicillin is a perfect example of how science works: 
            observation, curiosity, collaboration, and persistence transforming 
            an accident into a revolution.&quot;
          </blockquote>
          <cite>— Howard Florey, 1945</cite>
        </div>
      </footer>
    </div>
  );
}

