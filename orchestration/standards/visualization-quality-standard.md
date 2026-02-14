# Visualization Quality Standard

> **Status**: Active — Foundational  
> **Created**: 2026-02-09  
> **Applies to**: All visual essays with interactive or data-driven visualizations

---

## Problem Statement

Across 90+ visual essays, exactly **one** uses any external visualization library (Three.js — "Inside a Black Hole"). Every other essay renders visualizations as CSS-styled `<div>` elements with `width: X%` or `border-radius: 50%`. This produces flat, boilerplate output indistinguishable from a Bootstrap dashboard — not the award-winning, publication-quality experiences the platform requires.

The root cause is a **missing enforcement layer** between design specifications and implementation. DESIGN-RESEARCH.md files routinely specify ambitious visualizations ("animated race," "scroll-locked 17-order logarithmic axis," "nested orbital rings"), but the producing agent defaults to the simplest implementation that passes the contract. A `<div>` with `width: 40%` technically satisfies "bar chart" — and there is no gate that says otherwise.

---

## The Visualization Technology Ladder

### Tier 0: CSS-Only (Micro-interactions Only)

**Acceptable for**: Progress bars, hover states, button transitions, fade-in-on-scroll, opacity toggles.

**NOT acceptable for**: Any visualization that encodes data, compares quantities, shows relationships, or represents a physical phenomenon.

Examples:
- ✅ A reading progress bar at the top of the page
- ✅ A card fading in on scroll
- ❌ A speed comparison ("Familiar Race")
- ❌ A cost breakdown chart ("Price Split")

### Tier 1: SVG (2D Diagrams, Small Data)

**Acceptable for**: Diagrams, annotated illustrations, small-data charts (< 20 data points), category comparisons, process flows, anatomy diagrams.

**Technology**: Inline SVG elements in JSX, or SVG generated via D3 scales/paths.

**When to use**: The visualization is essentially a **drawing** with data-driven attributes (position, size, color, path). It does not need animation frames, physics, or > 60fps rendering.

Examples:
- Annotated black hole anatomy (accretion disk, event horizon labels)
- Chocolate price-split stacked bar
- Cacao transformation stages (with SVG illustrations per stage)
- Timeline with positioned markers

### Tier 2: D3 + SVG/Canvas (Data Visualization)

**Acceptable for**: Multi-data-point visualizations, animated transitions between states, proportional area charts, geographic visualizations, force-directed graphs, Sankey diagrams.

**Technology**: `d3-scale`, `d3-geo`, `d3-interpolate`, `d3-shape` for computation; SVG or Canvas for rendering. React manages lifecycle, D3 manages data transforms.

**When to use**: The visualization needs **computed layout** (positions derived from data), **animated transitions** between states, or **geographic projections**.

Available packages (already installed):
- `d3-scale` — linear, log, ordinal, sequential scales
- `d3-geo` — geographic projections and path generation
- `d3-interpolate` — smooth transitions between values
- `topojson-client` — geographic boundary data

Examples:
- Logarithmic ruler (d3-scaleLog for position mapping)
- Speed comparison race (d3-scaleLinear for proportional positioning, requestAnimationFrame for animation)
- Choropleth maps (d3-geo projections)
- Time-series with scrubber

### Tier 3: Canvas 2D (High-Volume, Smooth Animation)

**Acceptable for**: Visualizations with > 100 elements, particle systems, smooth scroll-linked rendering, custom text layout, real-time interactive simulations.

**Technology**: HTML Canvas API with `requestAnimationFrame`. React manages the `<canvas>` element lifecycle; rendering is imperative.

**When to use**: SVG would create too many DOM nodes (> 500), or the visualization needs **per-frame rendering** tied to scroll position or user input.

Examples:
- Logarithmic ruler with 27 positioned entries + tick marks + scroll cursor
- Particle flow simulations
- Animated race tracks with smooth physics
- Star field / atmospheric effects

### Tier 4: Three.js / WebGL (3D, Immersive)

**Acceptable for**: 3D scenes, spacetime visualizations, orbital mechanics, geological cross-sections, architectural walkthroughs, anything requiring camera perspective.

**Technology**: `three` (already installed), `@types/three` for TypeScript.

**When to use**: The subject inherently involves **3D space** or the visualization's explanatory power comes from **perspective, depth, or rotation**.

Examples:
- Spacetime curvature (Flamm's paraboloid)
- Penrose diagram (3D interactive)
- Orbital mechanics (nested 3D orbits)
- Geological strata cross-section

---

## Subject-to-Technology Mapping

This table provides the **minimum acceptable technology** for common visualization types. The producing agent MUST NOT use a lower tier than specified.

| Visualization Concept | Minimum Tier | Rationale |
|---|---|---|
| Reading progress bar | Tier 0 (CSS) | Pure UI, no data encoding |
| Fade-in-on-scroll | Tier 0 (CSS) | Presentation effect |
| Speed/quantity comparison | **Tier 2 (D3+SVG)** | Must encode proportional data accurately |
| Animated race / competition | **Tier 2 (D3+Canvas)** | Requires frame-based animation |
| Time-series chart | **Tier 2 (D3+SVG)** | Requires computed scales and axes |
| Geographic map | **Tier 2 (D3+SVG)** | Requires projection math |
| Scroll-locked data axis | **Tier 3 (Canvas)** | Many elements + scroll-linked rendering |
| Particle system / flow | **Tier 3 (Canvas)** | High element count |
| Orbital mechanics | **Tier 3 (Canvas) or Tier 4 (Three.js)** | Rotation + depth |
| Spacetime / physics simulation | **Tier 4 (Three.js)** | 3D is essential to understanding |
| Annotated diagram (< 20 labels) | Tier 1 (SVG) | Static layout with positioned labels |
| Process flow / transformation | Tier 1 (SVG) | Sequential illustration |
| Cost/proportion breakdown | Tier 1 (SVG) | Stacked bar or treemap |

---

## Component Decomposition Rule

**Any visualization with > 80 lines of rendering logic MUST be extracted into its own file.**

Pattern:
```
src/app/essays/{slug}/
  ├── page.tsx                          # Server component
  ├── {Name}Client.tsx                  # Client component (prose + layout)
  ├── visualizations/
  │   ├── FamiliarRaceViz.tsx           # Dedicated viz component
  │   ├── CosmicSpeedometerViz.tsx
  │   └── LogarithmicRulerViz.tsx
  ├── {slug}.css
  └── DESIGN-RESEARCH.md
```

The client component imports and composes:
```tsx
import FamiliarRaceViz from './visualizations/FamiliarRaceViz';
import CosmicSpeedometerViz from './visualizations/CosmicSpeedometerViz';

// In render:
<FamiliarRaceViz racers={FAMILIAR_RACERS} />
<CosmicSpeedometerViz layers={COSMIC_LAYERS} />
```

Benefits:
- Each visualization can be reviewed, tested, and iterated independently
- The client component stays focused on prose and layout
- Visualization files can import d3/three without cluttering the main file
- Easier to enforce technology tier per visualization

---

## Visualization Ambition Rubric

Each visualization is scored on a 1-5 scale. The essay's average must be ≥ 3.5 to pass G5.4.

| Score | Description | Example |
|---|---|---|
| 1 | CSS-styled div | `<div style={{ width: '40%' }}>` bar |
| 2 | CSS with animation | Bars that grow on scroll |
| 3 | SVG with data binding | SVG bars/paths with D3-computed positions |
| 4 | Canvas/D3 with interaction | Animated race, scroll-linked axis, state transitions |
| 5 | Three.js / immersive | 3D scene, particle physics, spatial simulation |

A Score 1-2 visualization is only acceptable for Tier 0 use cases (progress bars, micro-interactions).

---

## Anti-Patterns

### ❌ The "Width Percentage" Bar Chart
```tsx
// BAD — This is a div, not a visualization
<div style={{ width: `${(speed / maxSpeed) * 100}%`, backgroundColor: '#4285F4' }} />
```

### ❌ The "Border-Left Card" Data Display
```tsx
// BAD — This is a list item, not a visualization
<div style={{ borderLeft: '4px solid #C4923A' }}>
  <span>Continental Drift</span>
  <span>2.5 cm/year</span>
</div>
```

### ❌ Everything In One File
```tsx
// BAD — 7 visualizations in 1086 lines of a single file
function FamiliarRace() { /* 30 lines of div rendering */ }
function SlowParade() { /* 50 lines of div rendering */ }
function CosmicSpeedometer() { /* 30 lines of div rendering */ }
// ... 4 more ...
export default function Client() { /* uses all of them */ }
```

### ✅ Proper Visualization Component
```tsx
// GOOD — Dedicated file, uses Canvas/SVG, encodes data properly
// visualizations/FamiliarRaceViz.tsx
import { useRef, useEffect } from 'react';

export default function FamiliarRaceViz({ racers }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    
    let frame: number;
    const animate = (time: number) => {
      // Clear, compute positions from speeds, draw racers
      // Each racer moves at its actual proportional speed
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [racers]);
  
  return <canvas ref={canvasRef} width={800} height={300} />;
}
```

---

## Gate Enforcement

### G4.5 — Visualization Technology Decision (New)

**When**: After DESIGN-RESEARCH.md (G4), before Content Complete (G5)  
**Produces**: `VIZ-TECH-DECISIONS.md`  
**Contents**: For each visualization specified in DESIGN-RESEARCH.md:
- Visualization name and purpose
- Assigned technology tier (0–4)
- Justification referencing the Subject-to-Technology Mapping
- Required libraries / imports
- Estimated complexity (lines of rendering code)
- Whether it requires a dedicated component file

**Fails if**: Any data-encoding visualization is assigned Tier 0 (CSS-only)

### G5.4 — Visualization Ambition Audit (New)

**When**: After Content Complete (G5), before Design Fidelity (G5.2)  
**Checks**:
1. Each visualization's technology tier matches or exceeds its G4.5 assignment
2. Average ambition score ≥ 3.5
3. Complex visualizations (> 80 lines) are in separate files
4. Appropriate library imports are present (d3, three, etc.)
5. No data-encoding visualization uses CSS-only rendering

**Fails if**: Any data-encoding visualization scores ≤ 2 on the ambition rubric

---

## Available Libraries Reference

These packages are already installed in the project. There is **zero cost** to using them.

| Package | Import | Use For |
|---|---|---|
| `three` | `import * as THREE from 'three'` | 3D scenes, WebGL |
| `d3-scale` | `import { scaleLinear, scaleLog } from 'd3-scale'` | Mapping data → visual position |
| `d3-geo` | `import { geoPath, geoNaturalEarth1 } from 'd3-geo'` | Geographic projections |
| `d3-interpolate` | `import { interpolate } from 'd3-interpolate'` | Smooth value transitions |
| `topojson-client` | `import { feature } from 'topojson-client'` | Geographic boundaries |
| `recharts` | `import { LineChart, BarChart } from 'recharts'` | Declarative React charts |
| `lucide-react` | `import { Icon } from 'lucide-react'` | SVG icons |

---

*This standard exists because a `<div>` with `width: 40%` is not a visualization. It is a colored rectangle. Our essays deserve better.*
