'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './inside-a-black-hole.css';

/* ═══════════════════════════════════════════════════════════════
   Inside a Black Hole — Interactive Visual Essay
   
   Research: 22 Tier-1 sources (91%)
   Spec: 9 sections, 6 visualizations
   Design: Subject-derived (EHT gold, lensing blue, quantum violet)
   ═══════════════════════════════════════════════════════════════ */

const SOURCES = [
  'Penrose, R. (1965). "Gravitational Collapse and Space-Time Singularities." Physical Review Letters 14(3), 57–59.',
  'Hawking, S. (1975). "Particle Creation by Black Holes." Communications in Mathematical Physics 43(3), 199–220.',
  'Schwarzschild, K. (1916). "Über das Gravitationsfeld eines Massenpunktes." Sitzungsberichte der Königlich Preußischen Akademie der Wissenschaften, 189–196.',
  'EHT Collaboration (2019). "First M87 Event Horizon Telescope Results I–VI." The Astrophysical Journal Letters 875.',
  'Abbott, B. et al. / LIGO (2016). "Observation of Gravitational Waves from a Binary Black Hole Merger." Physical Review Letters 116(6), 061102.',
  'Almheiri, A., Marolf, D., Polchinski, J., Sully, J. (2013). "Black Holes: Complementarity vs. Firewalls." JHEP 2013(2), 62.',
  'Maldacena, J. (1999). "The Large N Limit of Superconformal Field Theories and Supergravity." Int. J. Theor. Phys. 38(4), 1113–1133.',
  'Bekenstein, J. (1973). "Black Holes and Entropy." Physical Review D 7(8), 2333.',
  'Misner, C., Thorne, K., Wheeler, J. (1973). Gravitation. W.H. Freeman.',
  'Carroll, S. (2004). Spacetime and Geometry: An Introduction to General Relativity. Addison-Wesley.',
  'Thorne, K. (1994). Black Holes and Time Warps: Einstein\'s Outrageous Legacy. W.W. Norton.',
  'Susskind, L. (2008). The Black Hole War. Little, Brown.',
  'Hawking, S. & Ellis, G. (1973). The Large Scale Structure of Space-Time. Cambridge University Press.',
  'Kerr, R. (1963). "Gravitational Field of a Spinning Mass." Physical Review Letters 11(5), 237.',
  'Bousso, R. (2002). "The Holographic Principle." Reviews of Modern Physics 74(3), 825.',
  'Susskind, L., Thorlacius, L., Uglum, J. (1993). "The Stretched Horizon and Black Hole Complementarity." Physical Review D 48(8), 3743.',
];

/* ─── Intersection Observer Hook ─────────────────────────────── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options.once !== false) observer.unobserve(el);
        }
      },
      { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);

  return [ref, isInView];
}

/* ─── Scroll Progress Hook ───────────────────────────────────── */
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}

/* ─── EHT Ring Component ─────────────────────────────────────── */
function EHTRing() {
  const [ref, inView] = useInView({ threshold: 0.3 });

  const annotations = [
    { key: 'shadow', label: 'The Shadow', text: 'Light that crossed the event horizon and never returned.', style: { top: '50%', left: '-60%', transform: 'translateY(-50%)' } },
    { key: 'ring', label: 'Photon Ring', text: 'Superheated gas orbiting near the photon sphere.', style: { top: '-15%', left: '50%', transform: 'translateX(-50%)' } },
    { key: 'doppler', label: 'Doppler Beaming', text: 'Brighter side = gas moving toward us.', style: { bottom: '-15%', right: '-40%' } },
    { key: 'lensing', label: 'Gravitational Lensing', text: 'Light from behind, bent around the hole.', style: { top: '50%', right: '-60%', transform: 'translateY(-50%)' } },
  ];

  return (
    <div ref={ref} className="bh-eht-ring" role="img" aria-label="Annotated diagram of a black hole image inspired by the Event Horizon Telescope photograph of M87*. A bright orange ring of superheated gas surrounds a dark central shadow.">
      <div className="bh-eht-ring__outer">
        <div className="bh-eht-ring__asymmetry" />
      </div>
      <div className="bh-eht-ring__shadow" />
      {annotations.map((a, i) => (
        <div
          key={a.key}
          className={`bh-annotation ${inView ? 'bh-annotation--visible' : ''}`}
          style={{ ...a.style, transitionDelay: `${0.3 + i * 0.2}s` }}
        >
          <span className="bh-annotation__line" />
          <span className="bh-annotation__text">
            <span className="bh-annotation__label">{a.label}</span>
            {a.text}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Observer Duality Split Component ───────────────────────── */
function ObserverDuality() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2400),
      setTimeout(() => setPhase(3), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const externalScenes = [
    { clock: '12:00:00', desc: 'Your friend watches you fall toward the black hole.' },
    { clock: '12:00:01', desc: 'You appear to slow down. Your light begins to shift red.' },
    { clock: '12:00:01', desc: 'You freeze at the horizon — fading from view. To them, you never cross.' },
    { clock: '12:00:01', desc: 'Frozen. Red-shifted. Invisible. Forever.' },
  ];

  const infallingScenes = [
    { clock: '12:00:00', desc: 'You fall freely. Nothing unusual.' },
    { clock: '12:03:47', desc: 'Still nothing. Your watch runs normally.' },
    { clock: '12:07:22', desc: 'You cross the event horizon. Nothing happens.' },
    { clock: '12:07:23', desc: 'But you can never go back.' },
  ];

  const ext = externalScenes[phase];
  const inf = infallingScenes[phase];

  return (
    <div ref={ref} className="bh-observer-split" role="figure" aria-label="Split-screen comparison showing two perspectives of someone falling into a black hole.">
      <div className="bh-observer-panel bh-observer-panel--external" style={{ backgroundColor: phase >= 2 ? '#0d0808' : undefined }}>
        <div className="bh-observer-panel__title">What Your Friend Sees</div>
        <div className="bh-observer-panel__scene">
          <div className={`bh-observer-panel__clock ${phase >= 2 ? 'bh-observer-panel__clock--frozen' : ''}`}>
            {ext.clock}
          </div>
        </div>
        <div className="bh-observer-panel__description">{ext.desc}</div>
      </div>
      <div className="bh-observer-panel">
        <div className="bh-observer-panel__title">What You Experience</div>
        <div className="bh-observer-panel__scene">
          <div className="bh-observer-panel__clock">{inf.clock}</div>
        </div>
        <div className="bh-observer-panel__description">{inf.desc}</div>
      </div>
    </div>
  );
}

/* ─── Horizon Crossing Component ─────────────────────────────── */
function HorizonCrossing() {
  const containerRef = useRef(null);
  const [crossed, setCrossed] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && !crossed) {
      const timer = setTimeout(() => setCrossed(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [inView, crossed]);

  const stars = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.5,
    })), []
  );

  return (
    <div ref={ref} className="bh-crossing" role="figure" aria-label="Scroll-triggered transition simulating crossing a black hole's event horizon.">
      <div className="bh-crossing__starfield" ref={containerRef}>
        {stars.map(s => (
          <div
            key={s.id}
            className="bh-crossing__star"
            style={{
              left: `${s.x}%`,
              top: crossed ? `${s.y * 0.3}%` : `${s.y}%`,
              width: s.size,
              height: s.size,
              opacity: crossed ? s.opacity * 0.4 : s.opacity,
            }}
          />
        ))}
      </div>
      <div className={`bh-crossing__horizon-line ${crossed ? 'bh-crossing__horizon-line--flash' : ''}`} />
      <div className="bh-crossing__label">
        {crossed
          ? "You've crossed the event horizon. Nothing happened."
          : 'Approaching the event horizon...'}
      </div>
    </div>
  );
}

/* ─── Penrose Diagram Component ──────────────────────────────── */
function PenroseDiagram({ interactive = false }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [step, setStep] = useState(0);
  const [selectedPoint, setSelectedPoint] = useState(null);

  useEffect(() => {
    if (!inView || interactive) return;
    const maxStep = 5;
    const timers = [];
    for (let i = 1; i <= maxStep; i++) {
      timers.push(setTimeout(() => setStep(i), i * 1200));
    }
    return () => timers.forEach(clearTimeout);
  }, [inView, interactive]);

  useEffect(() => {
    if (interactive && inView) setStep(5);
  }, [interactive, inView]);

  // Diamond coordinates (SVG viewBox: 0 0 300 300)
  const cx = 150, cy = 150, size = 120;
  const top = { x: cx, y: cy - size };
  const right = { x: cx + size, y: cy };
  const bottom = { x: cx, y: cy + size };
  const left = { x: cx - size, y: cy };

  // Singularity zig-zag at top of interior
  const singularityY = cy - size * 0.4;
  const singularityPath = useMemo(() => {
    let d = `M ${left.x + 20} ${singularityY}`;
    const count = 12;
    const width = (cx - left.x - 20) * 2;
    const segWidth = width / count;
    for (let i = 1; i <= count; i++) {
      const y = singularityY + (i % 2 === 1 ? -4 : 4);
      d += ` L ${left.x + 20 + i * segWidth} ${y}`;
    }
    return d;
  }, [left.x, singularityY, cx]);

  // Interior region (triangle: left, singularity-left, singularity-right, top-horizon)
  const horizonMidpoint = { x: (top.x + right.x) / 2, y: (top.y + right.y) / 2 };
  const interiorPath = `M ${left.x} ${left.y} L ${left.x + 20} ${singularityY} L ${right.x - 20} ${singularityY} L ${top.x} ${top.y} Z`;

  const stepLabels = [
    '',
    'Step 1: All of spacetime on one page',
    'Step 2: Your future lies inside your light cone',
    'Step 3: The event horizon divides inside from outside',
    'Step 4: The singularity — at the TOP. Your future.',
    'Step 5: Inside, every light cone points to the singularity',
  ];

  const interactivePoints = interactive ? [
    { x: cx + 40, y: cy + 20, label: 'Outside', inside: false },
    { x: cx - 20, y: cy - 20, label: 'Inside', inside: true },
    { x: cx, y: cy + 60, label: 'Far outside', inside: false },
  ] : [];

  return (
    <div ref={ref} className="bh-penrose" role="figure" aria-label="Penrose diagram for a Schwarzschild black hole showing causal structure.">
      <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        {/* Step 1: Diamond outline */}
        {step >= 1 && (
          <path
            className="bh-penrose__diamond"
            d={`M ${top.x} ${top.y} L ${right.x} ${right.y} L ${bottom.x} ${bottom.y} L ${left.x} ${left.y} Z`}
            style={{ opacity: step >= 1 ? 1 : 0, transition: 'opacity 0.6s ease' }}
          />
        )}

        {/* Step 1 labels */}
        {step >= 1 && (
          <>
            <text className="bh-penrose__label" x={top.x} y={top.y - 8} textAnchor="middle">future ∞</text>
            <text className="bh-penrose__label" x={bottom.x} y={bottom.y + 16} textAnchor="middle">past ∞</text>
            <text className="bh-penrose__label" x={right.x + 8} y={right.y} textAnchor="start">space ∞</text>
          </>
        )}

        {/* Step 2: Light cone at a point */}
        {step >= 2 && (
          <path
            className={`bh-penrose__lightcone ${step >= 2 ? 'bh-penrose__lightcone--visible' : ''}`}
            d={`M ${cx + 30} ${cy + 30} L ${cx + 30 + 30} ${cy + 30 - 30} L ${cx + 30 - 30} ${cy + 30 - 30} Z`}
          />
        )}

        {/* Step 3: Event horizon line */}
        {step >= 3 && (
          <>
            <line
              className="bh-penrose__horizon"
              x1={left.x} y1={left.y} x2={top.x} y2={top.y}
              style={{ opacity: step >= 3 ? 0.8 : 0, transition: 'opacity 0.6s ease' }}
            />
            <path
              className="bh-penrose__interior"
              d={interiorPath}
              style={{ opacity: step >= 3 ? 1 : 0, transition: 'opacity 0.6s ease' }}
            />
            <text className="bh-penrose__label" x={left.x + 15} y={cy - 45} textAnchor="start" style={{ fill: 'var(--bh-lensing-blue-dim, #2a5a8f)' }}>interior</text>
          </>
        )}

        {/* Step 4: Singularity */}
        {step >= 4 && (
          <>
            <path
              className="bh-penrose__singularity"
              d={singularityPath}
              style={{ opacity: step >= 4 ? 1 : 0, transition: 'opacity 0.6s ease' }}
            />
            <text className="bh-penrose__label" x={cx} y={singularityY - 12} textAnchor="middle" style={{ fill: 'var(--bh-singularity-white, #fff)', fontWeight: 600 }}>SINGULARITY</text>
          </>
        )}

        {/* Step 5: Trapped light cones inside */}
        {step >= 5 && !interactive && (
          <>
            <path
              className={`bh-penrose__lightcone bh-penrose__lightcone--visible`}
              d={`M ${cx - 15} ${cy - 10} L ${cx - 15 + 20} ${cy - 10 - 20} L ${cx - 15 - 20} ${cy - 10 - 20} Z`}
            />
            <path
              className={`bh-penrose__lightcone bh-penrose__lightcone--visible`}
              d={`M ${cx - 35} ${cy + 5} L ${cx - 35 + 20} ${cy + 5 - 20} L ${cx - 35 - 20} ${cy + 5 - 20} Z`}
            />
          </>
        )}

        {/* Interactive points */}
        {interactive && interactivePoints.map((p, i) => (
          <g key={i}>
            <circle
              className="bh-penrose__point"
              cx={p.x} cy={p.y} r={4}
              onClick={() => setSelectedPoint(selectedPoint === i ? null : i)}
            />
            {selectedPoint === i && (
              <path
                className="bh-penrose__lightcone bh-penrose__lightcone--visible"
                d={`M ${p.x} ${p.y} L ${p.x + 25} ${p.y - 25} L ${p.x - 25} ${p.y - 25} Z`}
                style={{ fill: p.inside ? 'rgba(181, 56, 42, 0.15)' : 'rgba(61, 126, 199, 0.15)' }}
              />
            )}
            <text className="bh-penrose__label" x={p.x + 10} y={p.y + 4} textAnchor="start" style={{ fontSize: '9px' }}>{p.label}</text>
          </g>
        ))}
      </svg>
      {!interactive && step > 0 && (
        <div className="bh-penrose__step-label">{stepLabels[step]}</div>
      )}
      {interactive && (
        <div className="bh-penrose__step-label">Tap a point to see its light cone — where its future can reach.</div>
      )}
    </div>
  );
}

/* ─── Tidal Force Comparison Component ───────────────────────── */
function TidalComparison() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  const cards = [
    {
      name: 'Stellar Black Hole',
      mass: '10 solar masses',
      radius: '~30 km',
      figure: { stretch: 3.5, color: 'var(--bh-danger-red)' },
      verdict: 'Torn apart before reaching the horizon.',
      lethal: true,
    },
    {
      name: 'Sagittarius A*',
      mass: '4 million solar masses',
      radius: '~12 million km',
      figure: { stretch: 1.3, color: 'var(--bh-accretion-gold)' },
      verdict: 'Survive crossing. ~20 seconds inside.',
      lethal: false,
    },
    {
      name: 'TON 618',
      mass: '66 billion solar masses',
      radius: '~200 billion km',
      figure: { stretch: 1, color: 'var(--bh-horizon-teal)' },
      verdict: 'Cross in comfort. Hours to days inside.',
      lethal: false,
    },
  ];

  return (
    <div ref={ref} className="bh-tidal-comparison" role="figure" aria-label="Comparison of tidal forces at the event horizon for three black holes of different masses.">
      {cards.map((c, i) => (
        <div
          key={c.name}
          className={`bh-tidal-card bh-fade-in ${inView ? 'bh-fade-in--visible' : ''}`}
          style={{ transitionDelay: `${i * 0.15}s` }}
        >
          <div className="bh-tidal-card__name">{c.name}</div>
          <div className="bh-tidal-card__mass">{c.mass}</div>
          <div className="bh-tidal-card__figure">
            <svg viewBox="0 0 60 120" width="60" height="120">
              {/* Simplified human figure — stretched by tidal factor */}
              <ellipse
                cx="30" cy={60 / c.figure.stretch}
                rx={12 / c.figure.stretch} ry="8"
                fill={c.figure.color} opacity="0.8"
              />
              <rect
                x={30 - 6 / c.figure.stretch} y={60 / c.figure.stretch + 8}
                width={12 / c.figure.stretch}
                height={50 * c.figure.stretch}
                rx="4"
                fill={c.figure.color} opacity="0.6"
              />
            </svg>
          </div>
          <div className={`bh-tidal-card__verdict ${c.lethal ? 'bh-tidal-card__verdict--lethal' : 'bh-tidal-card__verdict--safe'}`}>
            {c.verdict}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Information Flow Diagram ───────────────────────────────── */
function InformationFlow() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <div ref={ref} className={`bh-info-flow bh-fade-in ${inView ? 'bh-fade-in--visible' : ''}`}
      role="figure" aria-label="Flow diagram illustrating the information paradox. Structured information falls in, only featureless thermal radiation comes out.">
      <div className="bh-info-flow__input">
        <div className="bh-info-flow__item">
          <span className="bh-info-flow__item-icon">📖</span>
          <span className="bh-info-flow__item-label">A book (structured information)</span>
        </div>
        <div className="bh-info-flow__item">
          <span className="bh-info-flow__item-icon">🧬</span>
          <span className="bh-info-flow__item-label">A person (quantum state)</span>
        </div>
        <div className="bh-info-flow__item">
          <span className="bh-info-flow__item-icon">⭐</span>
          <span className="bh-info-flow__item-label">A star (mass, composition, history)</span>
        </div>
        <div className="bh-info-flow__arrow">→</div>
      </div>

      <div className="bh-info-flow__center">
        <div className="bh-info-flow__hole" />
        <span className="bh-caption">Black Hole</span>
      </div>

      <div className="bh-info-flow__output">
        <div className="bh-info-flow__arrow">→</div>
        {[1, 2, 3].map(i => (
          <div key={i} className="bh-info-flow__particle">
            <span className="bh-info-flow__particle-dot" />
            <span className="bh-info-flow__particle-label">thermal photon (random)</span>
          </div>
        ))}
      </div>

      <div className="bh-info-flow__paradox">
        <div className="bh-info-flow__paradox-label">The Paradox</div>
        <div className="bh-info-flow__paradox-text">
          Quantum mechanics says information can never be truly destroyed.
          But Hawking radiation carries no information about what fell in.
          If the black hole evaporates completely, the information is simply… gone.
        </div>
      </div>
    </div>
  );
}

/* ─── Section Wrapper ────────────────────────────────────────── */
function Section({ id, className = '', children }) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  return (
    <section
      ref={ref}
      id={id}
      className={`bh-section ${className} bh-fade-in ${inView ? 'bh-fade-in--visible' : ''}`}
    >
      {children}
    </section>
  );
}

/* ─── Main Essay Component ───────────────────────────────────── */
export default function InsideABlackHoleClient() {
  const scrollProgress = useScrollProgress();

  return (
    <article className="bh-essay">
      {/* Progress bar */}
      <div className="bh-progress">
        <div className="bh-progress__bar" style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

      {/* ═══ HERO ═══ */}
      <header className="bh-hero">
        <h1 className="bh-title">Inside a Black Hole</h1>
        <p className="bh-subtitle">What physics actually tells us about the most extreme object in the universe</p>
      </header>

      {/* ═══ SECTION 1: We Photographed One ═══ */}
      <Section id="photographed">
        <div className="bh-prose-container bh-prose">
          <h2 className="bh-section-heading">We Photographed One</h2>
          <p>
            On April 10, 2019, the Event Horizon Telescope collaboration released an image that took
            eight telescopes spanning four continents, five petabytes of data, and two years of
            computational processing to develop. It showed a glowing ring of light surrounding an
            abyss of total darkness. Humanity had photographed a black hole.
          </p>
          <p>
            The image — of M87*, a supermassive black hole 55 million light-years away with the mass
            of 6.5 billion suns — was not what most people expected. No swirling vortex. No dramatic
            funnel. Just a lopsided ring of fire around a void. Three years later, the same team
            captured Sagittarius A*, the black hole at the center of our own galaxy.
            <span className="bh-citation"> [EHT Collaboration, 2019; Akiyama et al., 2022]</span>
          </p>
        </div>

        <div className="bh-vis-container">
          <EHTRing />
        </div>

        <div className="bh-prose-container bh-prose">
          <p>
            That bright ring is not the black hole. It is superheated plasma — gas heated to billions
            of degrees — orbiting just outside the point of no return. The darkness at the center is
            the shadow: the region where photons crossed the event horizon and never returned. We are
            looking at absence made visible.
          </p>
          <p>
            Black holes are no longer theoretical. LIGO detected gravitational waves from two merging
            black holes in 2015 — ripples in spacetime itself, arriving exactly as Einstein's equations
            predicted a century earlier.
            <span className="bh-citation"> [Abbott et al., 2016]</span>
          </p>
          <p>
            We know what they look like from the outside. But what happens <em>inside</em>? The answer
            is stranger than any science fiction — and it begins with a paradox about time.
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 2: Approaching the Horizon ═══ */}
      <Section id="approaching">
        <div className="bh-prose-container bh-prose">
          <h2 className="bh-section-heading">Approaching the Horizon</h2>
          <p>
            Imagine your friend watches you fall toward a black hole from a safe distance.
            What they see and what you experience are not just different — they are irreconcilable.
            And both are simultaneously, physically real.
          </p>
          <p>
            This is not a metaphor. It is a mathematical consequence of the Schwarzschild metric —
            the equation Karl Schwarzschild derived in 1916, while serving on the Eastern Front of
            World War I, describing the curvature of spacetime around a spherical mass.
            <span className="bh-citation"> [Schwarzschild, 1916]</span>
          </p>
        </div>

        <div className="bh-vis-container">
          <ObserverDuality />
        </div>

        <div className="bh-prose-container bh-prose">
          <p>
            For your friend, time dilation becomes infinite at the event horizon. They watch you
            slow down, redshift from visible light to infrared to radio waves, and asymptotically
            freeze — never quite reaching the boundary. To them, you hover there forever, fading
            from view but never crossing.
            <span className="bh-citation"> [Carroll, 2004]</span>
          </p>
          <p>
            For you, falling freely, none of this happens. Your watch ticks normally. You cross the
            event horizon in finite time — minutes or hours depending on the black hole's mass. You
            notice nothing special at the boundary. The universe outside is still visible above you.
            But from the moment you cross, no signal you send — no photon, no radio wave, no
            gravitational wave — will ever reach your friend again.
          </p>
          <p>
            Two observers. Two realities. Both correct. So what happens when you actually cross?
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 3: The Crossing ═══ */}
      <Section id="crossing">
        <div className="bh-prose-container bh-prose">
          <h2 className="bh-section-heading">The Crossing</h2>
          <p>
            You're moments from the event horizon. Every instinct says something dramatic should
            happen — a wall, a membrane, a flash of light, a physical sensation. You brace yourself.
          </p>
        </div>

        <div className="bh-vis-container">
          <HorizonCrossing />
        </div>

        <div className="bh-prose-container bh-prose">
          <p>
            The most surprising thing about crossing the event horizon is that nothing happens.
            No wall. No flash. No alarm. The event horizon is not a physical surface — it is a
            mathematical boundary, as invisible and intangible as the equator.
            <span className="bh-citation"> [Thorne, 1994]</span>
          </p>
          <p>
            For a supermassive black hole — one with millions or billions of solar masses — you would
            not even notice tidal forces at the crossing. The curvature of spacetime at the horizon
            of a supermassive black hole is gentle. It is only for stellar-mass black holes, small and
            intensely curved, that the tidal stretch becomes lethal before you even arrive.
            <span className="bh-citation"> [Misner, Thorne, Wheeler, 1973]</span>
          </p>

          <div className="bh-pull-quote">
            The most anticlimactic moment in the most extreme object in the universe. You crossed
            the point of no return — and felt nothing at all.
          </div>

          <p>
            But everything has changed. Looking up, you can still see the universe — stars,
            galaxies, the light of everything outside — compressed into a shrinking circle above you.
            Looking in any other direction: darkness. And ahead of you is something your spatial
            intuition cannot prepare you for.
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 4: Where Space Becomes Time ═══ */}
      <Section id="spacetime-swap">
        <div className="bh-prose-container bh-prose">
          <h2 className="bh-section-heading">Where Space Becomes Time</h2>
          <p>
            Now the universe turns inside out.
          </p>
          <p>
            If you've imagined the singularity as a point at the center of the black hole — a dense
            dot you fall toward like a marble rolling into a bowl — you need to abandon that image
            entirely. It is the most widely held and most completely wrong intuition about black holes.
          </p>
        </div>

        <div className="bh-vis-container">
          <PenroseDiagram interactive={false} />
        </div>

        <div className="bh-prose-container bh-prose">
          <p>
            Inside the event horizon, the roles of space and time swap. The radial coordinate — the
            direction toward what you'd call "the center" — becomes timelike. The singularity is not
            a place in space you travel toward. It is a moment in your future.
            <span className="bh-citation"> [Penrose, 1965; Misner, Thorne, Wheeler, 1973]</span>
          </p>

          <div className="bh-pull-quote">
            Inside a black hole, the singularity is not a point at the center you fall toward.
            It is a moment in your future — as unavoidable as next Tuesday.
          </div>

          <p>
            You can no more avoid the singularity than you can avoid tomorrow. You can flail around,
            change direction, fire rockets at maximum thrust in the opposite direction — and every
            one of these actions brings you to the singularity <em>faster</em>, not slower. Attempting
            to escape is like trying to run backward through time.
          </p>
          <p>
            This is not a consequence of overwhelming gravitational force. It is a consequence of
            geometry. Inside the horizon, every possible trajectory — every path through spacetime
            that obeys the laws of physics — terminates at the singularity. It is built into the
            structure of spacetime itself.
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 5: The Stretch ═══ */}
      <Section id="spaghettification">
        <div className="bh-prose-container bh-prose">
          <h2 className="bh-section-heading">The Stretch</h2>
          <p>
            As you fall toward the moment you cannot avoid, the tidal forces grow. Gravity pulls
            harder on the side of your body closer to the singularity than the side farther away.
            You are stretched vertically and compressed horizontally — spaghettified, in the word
            Stephen Hawking coined.
          </p>
          <p>
            But the severity of spaghettification depends entirely on the black hole's mass. The
            tidal force at the horizon scales as 1/M² — the square of the mass. A more massive
            black hole means a more gentle crossing.
          </p>
        </div>

        <div className="bh-vis-container">
          <TidalComparison />
        </div>

        <div className="bh-prose-container bh-prose">
          <p>
            For a stellar black hole of 10 solar masses, the tidal forces would tear you apart
            long before you reached the event horizon. For Sagittarius A*, the supermassive black
            hole at the center of our galaxy, you could cross the horizon in comfort and survive
            for roughly 20 seconds of proper time inside. For the most massive black holes known —
            like TON 618, at 66 billion solar masses — you could live for hours.
            <span className="bh-citation"> [Thorne, 1994; Hamilton, 2021]</span>
          </p>
          <p>
            Looking outward during these final moments, you would see something extraordinary. The
            entire visible universe — every star, every galaxy — compressed into a shrinking bright
            circle directly above you. Cosmic history plays out in fast-forward as light from the
            outside universe blueshifts to extreme energies. The universe is saying goodbye.
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 6: Reading the Map of Everything ═══ */}
      <Section id="penrose">
        <div className="bh-prose-container bh-prose">
          <h2 className="bh-section-heading">Reading the Map of Everything</h2>
          <p>
            Physicists needed a way to see the causal structure of spacetime at a glance — to
            determine instantly which events can influence which, where signals can travel, and
            where they cannot. In 1963, Roger Penrose invented one: the conformal diagram.
            <span className="bh-citation"> [Penrose, 1963]</span>
          </p>
          <p>
            A Penrose diagram maps all of spacetime — past, present, future, even infinity — onto
            a finite diamond-shaped page using a coordinate transformation that preserves one
            critical property: light always travels at exactly 45° angles. This single rule makes
            causal structure immediately visible.
          </p>
        </div>

        <div className="bh-vis-container">
          <PenroseDiagram interactive={true} />
        </div>

        <div className="bh-prose-container bh-prose">
          <p>
            Tap any point on the diagram to see its light cone — the set of all events it can
            possibly influence. Outside the event horizon, light cones reach future infinity. A
            signal sent from there can, in principle, reach anywhere in the universe.
          </p>
          <p>
            Inside the horizon, every light cone points upward — toward the singularity. There is
            no direction you can orient a light cone that avoids it. This is not because something
            is blocking the light. It is because the geometry of spacetime inside the horizon
            <em> has no outward directions</em>. Every direction is toward the future. And the
            future is the singularity.
            <span className="bh-citation"> [Hawking & Ellis, 1973]</span>
          </p>
          <p>
            This is the complete classical picture — elegant, beautiful, mathematically exact. General
            relativity gives us a perfect map of a black hole's interior. But it is missing something.
            When you add quantum mechanics, everything breaks.
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 7: The Evaporating Paradox ═══ */}
      <Section id="information-paradox" className="bh-section--quantum">
        <div className="bh-prose-container bh-prose">
          <h2 className="bh-section-heading">The Evaporating Paradox</h2>
          <p>
            In 1974, Stephen Hawking made a calculation that would haunt physics for half a century.
            Working at the intersection of quantum field theory and general relativity — two
            frameworks that had never been successfully combined — he showed that black holes are
            not perfectly black. They glow.
            <span className="bh-citation"> [Hawking, 1975]</span>
          </p>
          <p>
            Quantum effects near the event horizon cause black holes to emit faint thermal radiation
            — now called Hawking radiation. This radiation carries energy away from the black hole,
            which means the black hole slowly loses mass. Given enough time — roughly 10⁶⁷ years for
            a stellar-mass black hole, inconceivably longer than the current age of the universe — it
            would evaporate completely.
          </p>
          <p>
            But here is where the story breaks.
          </p>
        </div>

        <div className="bh-vis-container">
          <InformationFlow />
        </div>

        <div className="bh-prose-container bh-prose">
          <p>
            Think of burning a book. In principle, if you collected every ash particle, every photon
            of light, every molecule of smoke, you could reconstruct the text. The information is
            scrambled beyond any practical recovery, but it still exists somewhere in the universe.
            <span className="bh-citation"> [Susskind, 2008]</span>
          </p>
          <p>
            Hawking radiation is different. It is purely thermal — perfectly random, bearing no
            relationship whatsoever to what fell into the black hole. It's as if the smoke from the
            fire contained no trace of which book was burned. The information doesn't get scrambled.
            It seems to <em>vanish</em>.
          </p>

          <div className="bh-pull-quote">
            If a black hole evaporates completely, where does the information about everything
            that fell in go? Quantum mechanics says it can't be destroyed. Hawking's calculation
            says it is. Someone is wrong.
          </div>

          <p>
            This is the information paradox, and it has been debated since 1976. It pits the two
            pillars of modern physics against each other: general relativity (which says black holes
            can evaporate) and quantum mechanics (which says information is never destroyed).
            Resolving it may require changing something fundamental about one — or both — of these
            theories.
            <span className="bh-citation"> [Hawking, 1976]</span>
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 8: Firewalls, Holograms, and the Frontier ═══ */}
      <Section id="frontier" className="bh-section--quantum">
        <div className="bh-prose-container bh-prose">
          <h2 className="bh-section-heading">Firewalls, Holograms, and the Frontier</h2>
          <p>
            In 2012, four physicists — Ahmed Almheiri, Donald Marolf, Joseph Polchinski, and James
            Sully — published a paper that sharpened the information paradox into a razor. They showed
            that three individually reasonable assumptions about black holes are mutually contradictory.
            At least one must be wrong.
            <span className="bh-citation"> [Almheiri et al., 2013]</span>
          </p>
          <p>
            The three assumptions: (1) Hawking radiation preserves information (unitarity holds).
            (2) The event horizon is smooth — an infalling observer notices nothing special when
            crossing. (3) Local quantum field theory is valid outside the horizon.
          </p>
          <p>
            If you accept (1) and (3), then (2) must be false — the event horizon is NOT smooth.
            Instead, there is a "firewall" of high-energy particles that would incinerate anything
            that crosses. Everything we said in Section 3 — the gentle, unremarkable crossing — would
            be wrong.
          </p>
          <p>
            Before AMPS, Leonard Susskind had proposed a different resolution: black hole
            complementarity. Information is both reflected at the horizon (from an outside observer's
            perspective) and passes through (from the infalling observer's perspective). No single
            observer can ever witness the contradiction, so there is no paradox — just two
            complementary descriptions of the same physics.
            <span className="bh-citation"> [Susskind, Thorlacius, Uglum, 1993]</span>
          </p>
          <p>
            Others look to the holographic principle — the idea that all information inside the
            black hole is encoded on its two-dimensional event horizon surface, like data on a DVD.
            The mathematics of the AdS/CFT correspondence, discovered by Juan Maldacena in 1997,
            provides a concrete framework where this works perfectly. But it works in a universe
            with different geometry than ours.
            <span className="bh-citation"> [Maldacena, 1999]</span>
          </p>
          <p>
            Fifty years after Hawking's calculation, there is no consensus. The information paradox
            remains open — arguably the most important unsolved problem in theoretical physics.
            Whichever assumption falls, our understanding of the universe changes with it.
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 9: What Black Holes Tell Us About Reality ═══ */}
      <Section id="reality">
        <div className="bh-prose-container bh-prose">
          <h2 className="bh-section-heading">What Black Holes Tell Us About Reality</h2>
          <p>
            In 1973, Jacob Bekenstein made an observation that still astonishes. The entropy of a
            black hole — its information content, the number of distinct quantum states it could
            have — is proportional not to its volume, but to the <em>area</em> of its event horizon.
            <span className="bh-citation"> [Bekenstein, 1973]</span>
          </p>
          <p>
            This is deeply strange. For every other physical system, entropy scales with volume. A
            box twice as large can hold twice as many states. But a black hole's information capacity
            is written on its surface, not contained in its interior. It is as if the interior is a
            projection — a hologram — of the boundary.
            <span className="bh-citation"> [Bousso, 2002]</span>
          </p>
          <p>
            The holographic principle, inspired by this discovery, proposes that this is not unique
            to black holes. All of three-dimensional reality may be a projection of information
            encoded on a two-dimensional boundary. Our experience of depth, volume, and interiority
            may emerge from a fundamentally flat encoding.
          </p>
          <p>
            Black holes are not just the universe's most extreme objects. They are its most
            <em>revealing</em>. The event horizon is where general relativity and quantum mechanics
            collide. The singularity is where general relativity breaks down and confesses its own
            incompleteness. The information paradox is where the deepest principles of physics
            contradict each other.
          </p>
          <p>
            We went inside a black hole — as far as physics can take us — and found the limits of
            human knowledge. Not a wall, not a void, but a question: What is the nature of spacetime
            itself? The answer, when it comes, will not just resolve a paradox. It will rewrite our
            understanding of reality.
          </p>

          <div className="bh-pull-quote">
            Black holes aren't just the universe's most extreme objects. They may be its most
            fundamental — the place where the deepest laws of nature are written, and where we
            can almost, but not quite, read them.
          </div>
        </div>
      </Section>

      {/* ═══ SOURCES ═══ */}
      <footer className="bh-sources">
        <div className="bh-sources__title">Sources</div>
        <div className="bh-sources__list">
          {SOURCES.map((s, i) => (
            <div key={i} className="bh-sources__item">{s}</div>
          ))}
        </div>
      </footer>
    </article>
  );
}
