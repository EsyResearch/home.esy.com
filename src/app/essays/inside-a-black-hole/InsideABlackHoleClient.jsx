'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import './inside-a-black-hole.css';

const SpacetimeVisualization = dynamic(
  () => import('./SpacetimeVisualization'),
  { ssr: false, loading: () => <div style={{ height: 500, background: '#050508' }} /> }
);

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

  const vb = 440;
  const cx = vb / 2, cy = vb / 2, s = 160;
  const top = { x: cx, y: cy - s };
  const right = { x: cx + s, y: cy };
  const bottom = { x: cx, y: cy + s };
  const left = { x: cx - s, y: cy };

  // Singularity wavy line at top of interior
  const singY = cy - s * 0.42;
  const singL = left.x + s * 0.22;
  const singR = right.x - s * 0.22;
  const singularityPath = useMemo(() => {
    let d = `M ${singL} ${singY}`;
    const count = 20;
    const w = singR - singL;
    const seg = w / count;
    for (let i = 1; i <= count; i++) {
      d += ` L ${singL + i * seg} ${singY + (i % 2 === 1 ? -5 : 5)}`;
    }
    return d;
  }, [singL, singR, singY]);

  // Conformal grid: curved coordinate lines showing spacetime warping
  const conformalGrid = useMemo(() => {
    const rCurves = [];
    const tCurves = [];
    // Constant-r curves: from i⁻ (bottom) to i⁺ (top), bowing toward i⁰ (right)
    for (let i = 1; i <= 7; i++) {
      const f = i / 8;
      rCurves.push({
        d: `M ${bottom.x} ${bottom.y} Q ${cx + s * f} ${cy} ${top.x} ${top.y}`,
        o: 0.06 + f * 0.04,
      });
    }
    // Constant-t curves: from left edge to right edge
    for (let i = 1; i <= 5; i++) {
      const f = (i / 6) * 2 - 1;
      tCurves.push({
        d: `M ${left.x} ${left.y} Q ${cx} ${cy - s * f * 0.35} ${right.x} ${right.y}`,
        o: 0.06 + Math.abs(f) * 0.03,
      });
    }
    return { rCurves, tCurves };
  }, [bottom, top, left, right, cx, cy, s]);

  const interiorPath = `M ${left.x} ${left.y} L ${singL} ${singY} L ${singR} ${singY} L ${top.x} ${top.y} Z`;

  const stepLabels = [
    '',
    'All of spacetime — past, present, future, infinity — compressed onto a single diamond.',
    'Light always travels at 45°. Your future lies within your light cone.',
    'The event horizon: a one-way causal boundary in spacetime.',
    'The singularity sits at the top — it is your future, not a place in space.',
    'Inside, every light cone tilts toward the singularity. There is no escape direction.',
  ];

  const interactivePoints = interactive ? [
    { x: cx + 55, y: cy + 25, label: 'Outside observer', inside: false },
    { x: cx - 25, y: cy - 25, label: 'Fallen inside', inside: true },
    { x: cx + 15, y: cy + 75, label: 'Distant observer', inside: false },
  ] : [];

  return (
    <div ref={ref} className="bh-penrose" role="figure" aria-label="Penrose conformal diagram for a Schwarzschild black hole showing the causal structure of spacetime.">
      <svg viewBox={`0 0 ${vb} ${vb}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="penrose-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="cone-glow" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="interior-fill" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(61,126,199,0.01)" />
            <stop offset="60%" stopColor="rgba(61,126,199,0.08)" />
            <stop offset="100%" stopColor="rgba(181,56,42,0.12)" />
          </linearGradient>
          <linearGradient id="cone-fill-out" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(61,126,199,0.2)" />
            <stop offset="100%" stopColor="rgba(61,126,199,0.02)" />
          </linearGradient>
          <linearGradient id="cone-fill-in" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(181,56,42,0.2)" />
            <stop offset="100%" stopColor="rgba(181,56,42,0.02)" />
          </linearGradient>
        </defs>

        {/* Conformal coordinate grid — shows spacetime curvature */}
        {step >= 1 && (
          <g className="bh-penrose__grid-group" style={{ opacity: step >= 1 ? 1 : 0, transition: 'opacity 0.8s ease' }}>
            {conformalGrid.rCurves.map((c, i) => (
              <path key={`r${i}`} d={c.d} fill="none" stroke="var(--bh-diagram-line)" strokeWidth="0.5" opacity={c.o} />
            ))}
            {conformalGrid.tCurves.map((c, i) => (
              <path key={`t${i}`} d={c.d} fill="none" stroke="var(--bh-diagram-line)" strokeWidth="0.5" opacity={c.o} />
            ))}
            {/* 45° light ray reference diagonals */}
            <line x1={bottom.x} y1={bottom.y} x2={right.x} y2={right.y} stroke="var(--bh-accretion-gold-dim)" strokeWidth="0.4" opacity="0.15" strokeDasharray="6 10" />
            <line x1={bottom.x} y1={bottom.y} x2={left.x} y2={left.y} stroke="var(--bh-accretion-gold-dim)" strokeWidth="0.4" opacity="0.15" strokeDasharray="6 10" />
          </g>
        )}

        {/* Diamond boundary */}
        {step >= 1 && (
          <path
            className="bh-penrose__diamond"
            d={`M ${top.x} ${top.y} L ${right.x} ${right.y} L ${bottom.x} ${bottom.y} L ${left.x} ${left.y} Z`}
          />
        )}

        {/* Infinity labels */}
        {step >= 1 && (
          <>
            <text className="bh-penrose__label" x={top.x} y={top.y - 16} textAnchor="middle" style={{ fontWeight: 500 }}>i⁺</text>
            <text className="bh-penrose__label bh-penrose__label--dim" x={top.x} y={top.y - 4} textAnchor="middle">future timelike ∞</text>
            <text className="bh-penrose__label" x={bottom.x} y={bottom.y + 18} textAnchor="middle" style={{ fontWeight: 500 }}>i⁻</text>
            <text className="bh-penrose__label bh-penrose__label--dim" x={bottom.x} y={bottom.y + 30} textAnchor="middle">past timelike ∞</text>
            <text className="bh-penrose__label" x={right.x + 14} y={right.y + 4} textAnchor="start" style={{ fontWeight: 500 }}>i⁰</text>
            <text className="bh-penrose__label bh-penrose__label--dim" x={right.x + 14} y={right.y + 16} textAnchor="start">spatial ∞</text>
            <text className="bh-penrose__label--script" x={cx + s * 0.62} y={cy - s * 0.52} textAnchor="middle" transform={`rotate(-45,${cx + s * 0.62},${cy - s * 0.52})`}>𝒥⁺</text>
            <text className="bh-penrose__label--script" x={cx + s * 0.62} y={cy + s * 0.52} textAnchor="middle" transform={`rotate(45,${cx + s * 0.62},${cy + s * 0.52})`}>𝒥⁻</text>
          </>
        )}

        {/* Light cone at an exterior point */}
        {step >= 2 && (
          <g filter="url(#cone-glow)">
            <path
              className="bh-penrose__lightcone bh-penrose__lightcone--visible"
              d={`M ${cx + 55} ${cy + 40} L ${cx + 90} ${cy + 5} L ${cx + 20} ${cy + 5} Z`}
              fill="url(#cone-fill-out)" stroke="var(--bh-lensing-blue)" strokeWidth="1"
            />
            <circle cx={cx + 55} cy={cy + 40} r="3.5" fill="var(--bh-lensing-blue)" />
            <text className="bh-penrose__label" x={cx + 55} y={cy + 56} textAnchor="middle" style={{ fill: 'var(--bh-lensing-blue)', fontSize: '9px' }}>you are here</text>
          </g>
        )}

        {/* Event horizon + interior region */}
        {step >= 3 && (
          <>
            <path d={interiorPath} fill="url(#interior-fill)" style={{ opacity: step >= 3 ? 1 : 0, transition: 'opacity 0.6s ease' }} />
            <line className="bh-penrose__horizon" x1={left.x} y1={left.y} x2={top.x} y2={top.y} />
            <text className="bh-penrose__label" x={left.x + 24} y={cy - s * 0.18} textAnchor="start" style={{ fill: 'var(--bh-lensing-blue-dim)', fontSize: '10px', fontWeight: 500 }}>event horizon</text>
          </>
        )}

        {/* Singularity with glow */}
        {step >= 4 && (
          <g filter="url(#penrose-glow)">
            <path className="bh-penrose__singularity" d={singularityPath} />
            <text x={cx} y={singY - 18} textAnchor="middle" style={{ fill: '#fff', fontWeight: 600, fontSize: '10px', letterSpacing: '0.2em', fontFamily: "'JetBrains Mono', monospace" }}>SINGULARITY</text>
          </g>
        )}

        {/* Trapped light cones inside the horizon */}
        {step >= 5 && !interactive && (
          <g filter="url(#cone-glow)">
            {[
              { x: cx - 20, y: cy - 12 },
              { x: cx - 50, y: cy + 10 },
              { x: cx, y: cy - 45 },
            ].map((p, i) => (
              <g key={`trapped-${i}`}>
                <path
                  className="bh-penrose__lightcone bh-penrose__lightcone--visible"
                  d={`M ${p.x} ${p.y} L ${p.x + 24} ${p.y - 24} L ${p.x - 24} ${p.y - 24} Z`}
                  fill="url(#cone-fill-in)" stroke="var(--bh-danger-red)" strokeWidth="0.8"
                />
                <circle cx={p.x} cy={p.y} r="2.5" fill="var(--bh-danger-red)" opacity="0.8" />
              </g>
            ))}
          </g>
        )}

        {/* Interactive clickable points */}
        {interactive && interactivePoints.map((p, i) => (
          <g key={`ip-${i}`}>
            <circle
              className="bh-penrose__point"
              cx={p.x} cy={p.y} r={selectedPoint === i ? 6 : 4}
              onClick={() => setSelectedPoint(selectedPoint === i ? null : i)}
              style={{ filter: selectedPoint === i ? 'drop-shadow(0 0 6px var(--bh-horizon-teal))' : 'none' }}
            />
            {selectedPoint === i && (
              <path
                className="bh-penrose__lightcone bh-penrose__lightcone--visible"
                d={`M ${p.x} ${p.y} L ${p.x + 30} ${p.y - 30} L ${p.x - 30} ${p.y - 30} Z`}
                fill={p.inside ? 'url(#cone-fill-in)' : 'url(#cone-fill-out)'}
                stroke={p.inside ? 'var(--bh-danger-red)' : 'var(--bh-lensing-blue)'}
                strokeWidth="1" filter="url(#cone-glow)"
              />
            )}
            <text className="bh-penrose__label" x={p.x + 12} y={p.y + 4} textAnchor="start" style={{ fontSize: '10px' }}>{p.label}</text>
          </g>
        ))}
      </svg>
      {!interactive && step > 0 && (
        <div className="bh-penrose__step-label">{stepLabels[step]}</div>
      )}
      {interactive && (
        <div className="bh-penrose__step-label">Tap any point to see its light cone — the region of spacetime its future can reach.</div>
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
      mass: '10 M☉',
      radius: '~30 km',
      stretch: 3.5,
      color: 'var(--bh-danger-red)',
      rgb: '181,56,42',
      verdict: 'Spaghettified before reaching the horizon.',
      lethal: true,
    },
    {
      name: 'Sagittarius A*',
      mass: '4 million M☉',
      radius: '~12 million km',
      stretch: 1.4,
      color: 'var(--bh-accretion-gold)',
      rgb: '196,146,42',
      verdict: 'Survive crossing. ~20 seconds inside.',
      lethal: false,
    },
    {
      name: 'TON 618',
      mass: '66 billion M☉',
      radius: '~200 billion km',
      stretch: 1.05,
      color: 'var(--bh-horizon-teal)',
      rgb: '26,158,143',
      verdict: 'Cross in comfort. Hours to days inside.',
      lethal: false,
    },
  ];

  return (
    <div ref={ref} className="bh-tidal-comparison" role="figure" aria-label="Comparison of tidal forces at the event horizon for three black holes of different masses.">
      {cards.map((c, i) => {
        const baseR = 18;
        const rx = baseR / Math.sqrt(c.stretch);
        const ry = baseR * Math.sqrt(c.stretch);

        return (
          <div
            key={c.name}
            className={`bh-tidal-card bh-fade-in ${inView ? 'bh-fade-in--visible' : ''}`}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div className="bh-tidal-card__name">{c.name}</div>
            <div className="bh-tidal-card__mass">{c.mass}</div>
            <div className="bh-tidal-card__radius">{c.radius}</div>
            <div className="bh-tidal-card__figure">
              <svg viewBox="0 0 80 160" width="80" height="160">
                <defs>
                  <radialGradient id={`tfield-${i}`} cx="50%" cy="12%" r="90%">
                    <stop offset="0%" stopColor={`rgba(${c.rgb},0.18)`} />
                    <stop offset="100%" stopColor={`rgba(${c.rgb},0)`} />
                  </radialGradient>
                  <radialGradient id={`tbody-${i}`} cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor={`rgba(${c.rgb},0.5)`} />
                    <stop offset="100%" stopColor={`rgba(${c.rgb},0.15)`} />
                  </radialGradient>
                </defs>

                {/* Tidal force field gradient */}
                <rect x="0" y="0" width="80" height="160" fill={`url(#tfield-${i})`} />

                {/* Black hole source at top */}
                <circle cx="40" cy="14" r="9" fill="var(--bh-void)" stroke={c.color} strokeWidth="1.5" opacity="0.6" />
                <circle cx="40" cy="14" r="4" fill="var(--bh-void)" />

                {/* Force field lines radiating from hole */}
                {[-0.7, -0.45, -0.2, 0.2, 0.45, 0.7].map((f, j) => (
                  <line
                    key={j}
                    x1={40 + 22 * f} y1="24"
                    x2={40 + 14 * f} y2="152"
                    stroke={c.color} strokeWidth="0.5" opacity={0.12 + Math.abs(f) * 0.06}
                  />
                ))}

                {/* Deformed body — sphere under tidal stress */}
                <ellipse
                  cx="40" cy="90" rx={rx} ry={Math.min(ry, 55)}
                  fill={`url(#tbody-${i})`} stroke={c.color} strokeWidth="1" opacity="0.85"
                />

                {/* Stretch arrows for significant deformation */}
                {c.stretch > 1.2 && (
                  <>
                    {/* Vertical stretch indicators */}
                    <line x1="40" y1={90 - Math.min(ry, 55) - 10} x2="40" y2={90 - Math.min(ry, 55) - 3} stroke={c.color} strokeWidth="1" opacity="0.5" />
                    <polygon points={`40,${90 - Math.min(ry, 55) - 14} 37,${90 - Math.min(ry, 55) - 8} 43,${90 - Math.min(ry, 55) - 8}`} fill={c.color} opacity="0.5" />
                    <line x1="40" y1={90 + Math.min(ry, 55) + 3} x2="40" y2={90 + Math.min(ry, 55) + 10} stroke={c.color} strokeWidth="1" opacity="0.5" />
                    <polygon points={`40,${90 + Math.min(ry, 55) + 14} 37,${90 + Math.min(ry, 55) + 8} 43,${90 + Math.min(ry, 55) + 8}`} fill={c.color} opacity="0.5" />
                    {/* Horizontal compression indicators */}
                    <line x1={40 - rx - 10} y1="90" x2={40 - rx - 3} y2="90" stroke={c.color} strokeWidth="0.8" opacity="0.35" />
                    <polygon points={`${40 - rx - 2},90 ${40 - rx - 8},87.5 ${40 - rx - 8},92.5`} fill={c.color} opacity="0.35" />
                    <line x1={40 + rx + 3} y1="90" x2={40 + rx + 10} y2="90" stroke={c.color} strokeWidth="0.8" opacity="0.35" />
                    <polygon points={`${40 + rx + 2},90 ${40 + rx + 8},87.5 ${40 + rx + 8},92.5`} fill={c.color} opacity="0.35" />
                  </>
                )}

                {/* Force magnitude label */}
                <text x="40" y="155" textAnchor="middle" style={{ fontSize: '7px', fill: c.color, opacity: 0.6, fontFamily: "'JetBrains Mono', monospace" }}>
                  {c.stretch > 2 ? '∝ 1/M² → extreme' : c.stretch > 1.2 ? '∝ 1/M² → mild' : '∝ 1/M² → negligible'}
                </text>
              </svg>
            </div>
            <div className={`bh-tidal-card__verdict ${c.lethal ? 'bh-tidal-card__verdict--lethal' : 'bh-tidal-card__verdict--safe'}`}>
              {c.verdict}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Information Flow Diagram ───────────────────────────────── */
function InformationFlow() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  // Random thermal dots representing featureless Hawking radiation
  const thermalDots = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      x: 8 + Math.random() * 84,
      y: 8 + Math.random() * 84,
      r: 1 + Math.random() * 2.5,
      o: 0.12 + Math.random() * 0.28,
    })), []
  );

  // SVG icon components — replace system emojis with programmatic graphics
  const StructuredIcons = [
    // Grid = organized data structure
    <svg key="grid" viewBox="0 0 32 32" width="28" height="28" className="bh-info-flow__svg-icon">
      {[0, 1, 2].map(r => [0, 1, 2].map(c => (
        <rect key={`${r}${c}`} x={3 + c * 9.5} y={3 + r * 9.5} width="7.5" height="7.5" rx="1"
          fill="var(--bh-lensing-blue)" opacity={0.2 + (r + c) * 0.1} />
      )))}
    </svg>,
    // Double helix = biological quantum state
    <svg key="helix" viewBox="0 0 32 32" width="28" height="28" className="bh-info-flow__svg-icon">
      <path d="M 10 2 Q 22 8, 10 16 Q 22 24, 10 30" fill="none" stroke="var(--bh-horizon-teal)" strokeWidth="1.5" opacity="0.5" />
      <path d="M 22 2 Q 10 8, 22 16 Q 10 24, 22 30" fill="none" stroke="var(--bh-horizon-teal)" strokeWidth="1.5" opacity="0.5" />
      {[6, 10, 14, 18, 22, 26].map((y, j) => (
        <line key={j} x1="11" y1={y} x2="21" y2={y} stroke="var(--bh-horizon-teal)" strokeWidth="0.7" opacity="0.25" />
      ))}
    </svg>,
    // Radial burst = stellar composition
    <svg key="star" viewBox="0 0 32 32" width="28" height="28" className="bh-info-flow__svg-icon">
      {[0, 45, 90, 135].map((angle, j) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line key={j} x1={16 + Math.cos(rad) * 4} y1={16 + Math.sin(rad) * 4}
            x2={16 + Math.cos(rad) * 13} y2={16 + Math.sin(rad) * 13}
            stroke="var(--bh-accretion-gold)" strokeWidth="1.2" opacity={0.3 + j * 0.08} />
        );
      })}
      <circle cx="16" cy="16" r="4" fill="var(--bh-accretion-gold)" opacity="0.35" />
    </svg>,
  ];

  const items = [
    { label: 'A book', sub: 'Organized content with meaning' },
    { label: 'A person', sub: 'Complete quantum state' },
    { label: 'A star', sub: 'Mass, composition, history' },
  ];

  return (
    <div ref={ref} className={`bh-info-flow bh-fade-in ${inView ? 'bh-fade-in--visible' : ''}`}
      role="figure" aria-label="The information paradox: structured information enters a black hole, only featureless thermal radiation exits.">

      <div className="bh-info-flow__input">
        <div className="bh-info-flow__column-label">Falls In</div>
        {items.map((item, i) => (
          <div key={i} className="bh-info-flow__item">
            <span className="bh-info-flow__item-icon">{StructuredIcons[i]}</span>
            <span className="bh-info-flow__item-text">
              <span className="bh-info-flow__item-label">{item.label}</span>
              <span className="bh-info-flow__item-sublabel">{item.sub}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="bh-info-flow__center">
        {/* Converging arrows */}
        <svg className="bh-info-flow__conv-arrows" viewBox="0 0 40 80" width="24" height="48">
          <line x1="0" y1="15" x2="36" y2="40" stroke="var(--bh-diagram-line)" strokeWidth="1" opacity="0.35" />
          <line x1="0" y1="40" x2="36" y2="40" stroke="var(--bh-diagram-line)" strokeWidth="1" opacity="0.45" />
          <line x1="0" y1="65" x2="36" y2="40" stroke="var(--bh-diagram-line)" strokeWidth="1" opacity="0.35" />
          <polygon points="37,40 30,36 30,44" fill="var(--bh-diagram-line)" opacity="0.4" />
        </svg>

        <div className="bh-info-flow__hole-wrap">
          <div className="bh-info-flow__accretion-ring" />
          <div className="bh-info-flow__hole" />
        </div>

        {/* Diverging dashed arrows */}
        <svg className="bh-info-flow__div-arrows" viewBox="0 0 40 80" width="24" height="48">
          <line x1="4" y1="40" x2="40" y2="15" stroke="var(--bh-quantum-violet-dim)" strokeWidth="1" opacity="0.25" strokeDasharray="3 4" />
          <line x1="4" y1="40" x2="40" y2="40" stroke="var(--bh-quantum-violet-dim)" strokeWidth="1" opacity="0.35" strokeDasharray="3 4" />
          <line x1="4" y1="40" x2="40" y2="65" stroke="var(--bh-quantum-violet-dim)" strokeWidth="1" opacity="0.25" strokeDasharray="3 4" />
        </svg>

        <span className="bh-info-flow__center-label bh-caption">Black Hole</span>
      </div>

      <div className="bh-info-flow__output">
        <div className="bh-info-flow__column-label">Comes Out</div>
        <div className="bh-info-flow__thermal-box">
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            {thermalDots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="var(--bh-quantum-violet-dim)" opacity={d.o} />
            ))}
          </svg>
        </div>
        <div className="bh-info-flow__thermal-desc">
          <span className="bh-info-flow__thermal-title">Thermal noise</span>
          <span className="bh-info-flow__thermal-detail">Perfectly random. Featureless. No trace of what fell in.</span>
        </div>
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

        <div className="bh-vis-container bh-vis-container--3d">
          <SpacetimeVisualization />
          <p className="bh-vis-caption">
            Spacetime curves so steeply inside the event horizon (teal ring) that every path — 
            shown as light cones on the surface — tilts inward. The gold particles spiral in from all 
            directions, demonstrating that no trajectory can escape. The singularity waits at the bottom.
          </p>
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
