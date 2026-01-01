# Design Research Report — The Nakba, Visualized

> Gate 4 Deliverable
> Status: DRAFT
> Last Updated: December 31, 2024
> Design Researcher: Visual Essay Orchestrator Pipeline

---

## 1. Visual Archaeology

### Subject Matter Analysis

The Nakba is fundamentally about:
- **Displacement** — movement from home to elsewhere
- **Memory** — how the past lives in the present
- **Documents** — paper that creates political reality (declarations, resolutions, maps)
- **Objects** — keys, deeds, photographs as memory vessels
- **Land** — geography transformed, names erased, continuity broken
- **Fabric** — tatreez embroidery as encoded identity

### Material Sources (What We're Working With)

| Material | Visual Character | Era |
|----------|------------------|-----|
| Mandate-era photographs (Matson Collection) | B&W, documentary grain, Mediterranean light | 1898–1946 |
| British survey maps | Technical cartography, blue/black ink, precise geometry | 1920s–1940s |
| UN documents | Typewritten, formal seals, institutional bureaucracy | 1947–1950 |
| Tatreez embroidery | Cross-stitch geometry, saturated thread colors, regional variation | Timeless |
| Refugee camp photography | Tents, dust, harsh light, waiting | 1948–1950s |
| Keys and deeds | Iron, paper, age marks, domestic scale | Pre-1948 |

### Color Sources (Derived from Subject)

**From the Land**:
- Olive groves: Deep olive green (#6B7F3F)
- Basalt stone (Galilee, Golan): Dark gray (#4A4A4A)
- Mediterranean sea: Shifting blue-green (#88B7A6)
- Dust roads: Tan/ochre (#C4B49A)

**From the Documents**:
- Aged parchment: Warm cream (#F5E6C8)
- Typewriter ink: Near-black (#2C2C2C)
- Blue map ink: Administrative blue (#4A6FA5)
- Red annotations: Burgundy (#8B2E2E)

**From Tatreez**:
- Crimson thread: Deep red (used sparingly)
- Indigo: Night blue (#1E2A3A)
- Gold/yellow: Accent warmth
- Black outline: Structure

---

## 2. Color Palette Derivation

### Primary Palette (7 colors)

| Name | Hex | Source | Semantic Use |
|------|-----|--------|--------------|
| **Olive** | #6B7F3F | Olive groves, landscape | Earth, rootedness, agriculture |
| **Basalt** | #4A4A4A | Galilean stone | Permanence, architecture, weight |
| **Parchment** | #F5E6C8 | Mandate documents, maps | History, record, memory |
| **Sea-Glass** | #88B7A6 | Mediterranean coast | Diaspora, hope, horizon |
| **Night-Sky** | #1E2A3A | Deep indigo, loss | Gravity, unknown, absence |
| **Dust** | #C4B49A | Camp roads, aftermath | Waiting, displacement, endurance |
| **Ink** | #2C2C2C | Document text | Primary text, readability |

### Semantic Color Usage

| Context | Color | Rationale |
|---------|-------|-----------|
| Background (default) | Parchment | Documentary, archival feel |
| Background (catastrophe era) | Near-white to near-black | High contrast, rupture |
| Background (aftermath) | Dust | Displacement, camps |
| Primary text | Ink | Readability |
| Secondary text | Basalt at 70% | Hierarchy |
| Links/interactive | Sea-Glass | Hope, forward motion |
| Content warnings | Burgundy (#8B2E2E) | Alertness without alarm |
| Accents | Olive | Grounding, land connection |

### Era-Based Color Shifts

| Era | Background | Text | Accent |
|-----|------------|------|--------|
| Ottoman/Early Mandate | Parchment warm | Sepia-tinted ink | Gold |
| Late Mandate | Cream/warm gray | Near-black | Olive |
| Catastrophe | White/high contrast | Pure black | Red (warning only) |
| Aftermath | Dust | Dark gray | Sea-Glass |
| Memory/Present | Return to Parchment | Ink | Sea-Glass + Olive |

---

## 3. Typography Research

### Era-Appropriate Typography

**The Challenge**: This essay spans 1917–1950+ and includes English, Arabic, and Hebrew terms. Typography must:
- Feel documentary/archival without being dated
- Support bilingual presentation
- Distinguish eras through weight/treatment
- Remain highly readable

### Typography Recommendations

**English Headlines**:
- **Primary**: Libre Baskerville (serif)
- **Rationale**: Classic, authoritative, readable. Evokes quality journalism without being flashy. Works well at large sizes.
- **Fallback**: Georgia, Times New Roman

**English Body**:
- **Primary**: Inter or Source Sans Pro (sans-serif)
- **Rationale**: Clean, highly legible, excellent for extended reading. Professional without being cold.
- **Fallback**: System sans-serif stack

**Arabic Text**:
- **Primary**: Amiri (for display) / Noto Naskh Arabic (for body)
- **Rationale**: Amiri is elegant and readable; Noto Naskh is highly legible and well-supported.
- **Fallback**: System Arabic stack

**Document/Quotes**:
- **Primary**: Courier Prime or IBM Plex Mono
- **Rationale**: Typewriter aesthetic for document excerpts, UN resolutions.

**Captions/Data**:
- **Primary**: Inter (small caps or reduced weight)
- **Rationale**: Consistency with body, clear hierarchy.

### Typography Scale

| Level | Size (Desktop) | Size (Mobile) | Weight |
|-------|----------------|---------------|--------|
| H1 (Chapter title) | 48–56px | 32–36px | Bold |
| H2 (Section) | 32–36px | 24–28px | Bold |
| H3 (Subsection) | 24–28px | 20–22px | Semibold |
| Body | 18–20px | 16–18px | Regular |
| Caption | 14–16px | 12–14px | Regular |
| Quote | 22–24px | 18–20px | Italic |

### Bilingual Typography Pairing

```
English (Libre Baskerville) + Arabic (Amiri)
----------------
THE NAKBA, VISUALIZED
النكبة، مُصَوَّرة
```

- Arabic displayed right-to-left
- Equal visual weight
- Consistent baseline alignment where possible
- Transliteration in parentheses: Nakba (النكبة, al-Nakba)

---

## 4. Animation Philosophy

### Core Principle: Movement as History

Animation should mirror the subject matter:
- **Gradual reveals** — like uncovering documents
- **Parallax layers** — like peeling back maps
- **Dust and light** — like sunlight through tent fabric
- **Patient pacing** — history takes time to understand

### Animation NOT to Use

| Avoid | Reason |
|-------|--------|
| Fast, flashy transitions | Disrespects gravity of subject |
| Bouncy/playful easing | Tone mismatch |
| Excessive particle effects | Distracting from content |
| Aggressive scroll-lock | User requirement: NO hero scroll-lock |

### Animation Patterns (Appropriate)

| Pattern | Use Case | Timing |
|---------|----------|--------|
| **Fade reveal** | Chapter transitions, evidence cards | 400–600ms, ease-out |
| **Parallax drift** | Background/foreground separation | Continuous, 0.3–0.6x scroll |
| **Gentle zoom** | Map exploration, photo focus | 800–1200ms, ease-in-out |
| **Slide-in** | Evidence cards, side panels | 300–400ms, ease-out |
| **Crossfade** | Before/after sliders | User-controlled |
| **Dust particles** | Aftermath era ambient | Subtle, slow, low opacity |

### Era-Specific Animation Adjustments

| Era | Animation Character |
|-----|---------------------|
| Ottoman/Early Mandate | Slow, sepia-filtered, film flicker |
| Late Mandate | Documentary pacing, clean transitions |
| Catastrophe | Sharp cuts, high contrast reveals |
| Aftermath | Slow, heavy, dust particles |
| Memory/Present | Gentle, hopeful, return to warmth |

### Reduced Motion Mode

All animations must respect `prefers-reduced-motion`:
- Replace motion with opacity fades
- Instant state changes
- No parallax
- Essential information never locked behind animation

---

## 5. Cultural Motifs

### Tatreez-Inspired Design Elements

**CRITICAL**: We create ORIGINAL geometric designs inspired by traditional patterns. We do NOT copy specific contemporary designer patterns (copyright protected).

**Inspiration Sources**:
- UNESCO documentation of regional styles (reference only)
- Historical photographs showing traditional dress (Matson Collection)
- General cross-stitch geometry principles

**Original Motif Applications**:

| Element | Design Approach |
|---------|-----------------|
| Section dividers | Simple geometric cross-stitch patterns (8-point stars, chevrons) |
| Progress indicator dots | Diamond shapes inspired by traditional geometry |
| Chapter opening frames | Subtle corner ornaments, not full borders |
| Quote marks | Geometric "»« style derived from regional aesthetics |

**Design Principles for Motifs**:
- Restraint over ornamentation
- Geometric precision
- Cultural respect without appropriation
- Never used as wallpaper/background fill
- Always purposeful, never decorative-only

### Key Motif: The Key

The key (مفتاح, miftah) is a powerful symbol of Palestinian memory:
- Original vector illustration of an old iron key
- Used in hero sequence
- Subtle key shape in chapter navigation?
- NOT overused—restraint maintains power

### Map Aesthetics

Maps are central to this story:
- Mandate-era cartographic style for historical layers
- Clean, modern satellite for "now" layers
- Consistent coordinates across before/after
- Place names in Arabic with transliteration

---

## 6. Document Lens Visual Language

### Document Treatment

UN resolutions and British documents are primary sources. Visual treatment:

| Element | Treatment |
|---------|-----------|
| Paper texture | Subtle parchment, fold lines |
| Typeface | Courier Prime for resolution text |
| Annotations | Handwritten-style highlights (not actual handwriting) |
| Highlights | Yellow/gold overlay on key passages |
| Margins | Red bracket annotations |

### Document Lens Interaction

- Full document visible with context
- Key passages highlighted
- Tap/click to see annotation
- Plain-language explanation alongside
- Source citation always visible

---

## 7. Photography Treatment

### Era-Based Processing

| Era | Treatment |
|-----|-----------|
| **Pre-1920** | Heavy sepia, vignetting, age marks |
| **1920–1947** | B&W with warm undertones, documentary grain |
| **1947–1949** | High contrast B&W, harsh light, no warmth |
| **1949–1950s** | Desaturated, dust tones, washed out |

### Photo Presentation

- Clean borders (no faux-vintage frames)
- Caption always visible
- Alt text comprehensive
- Source attribution inline
- Before/after sliders for map comparison

---

## 8. Interactive Module Design

### Evidence Cards

```
┌─────────────────────────────────────┐
│  [Icon]  EVIDENCE CARD              │
│  ─────────────────────────          │
│  Title of Source                    │
│  Brief description...               │
│                                     │
│  [Expand to see full citation]      │
└─────────────────────────────────────┘
```

- Collapsed by default
- Tap to expand
- Source citation on expansion
- Close button clear

### Before/After Slider

- Mandate-era map on left
- Satellite on right
- Central draggable handle
- Touch-friendly (full width on mobile)
- Coordinates displayed
- Labels clear

### Displacement Engine

Multi-causal visualization:
- Toggles for cause categories
- Map updates to show examples
- Citation appears for each example
- Uncertainty bands on flow arrows

### Uncertainty Dashboard

- Grid of claims
- Confidence indicators (high/medium/low)
- "What evidence supports this" column
- "What would change my mind" column
- Designed for epistemic humility

---

## 9. Responsive Design Notes

### Mobile-First Considerations

- Single column primary
- Evidence cards stack vertically
- Before/after slider full-width
- Reduced parallax (performance)
- Touch targets 44px minimum
- Safe area padding for notches

### Desktop Enhancements

- Side-by-side comparisons
- Multi-column evidence cards
- Full parallax effects
- Persistent chapter navigation

---

## 10. Accessibility Integration

### Color Contrast

All text combinations must meet WCAG AA:
- Ink on Parchment: ✅ High contrast
- Basalt on Parchment: ✅ Sufficient
- Sea-Glass on Night-Sky: ⚠️ Test required

### Focus States

- Visible focus indicators
- Skip links for screen readers
- Keyboard navigation for all interactive elements

### Content Warnings

- Clear visual distinction
- Not auto-played
- Skip option prominent
- No essential content hidden behind warning

---

## 11. Design System Summary

### CSS Variables (Draft)

```css
:root {
  /* Colors */
  --color-olive: #6B7F3F;
  --color-basalt: #4A4A4A;
  --color-parchment: #F5E6C8;
  --color-sea-glass: #88B7A6;
  --color-night-sky: #1E2A3A;
  --color-dust: #C4B49A;
  --color-ink: #2C2C2C;
  --color-warning: #8B2E2E;

  /* Typography */
  --font-headline: 'Libre Baskerville', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-arabic: 'Amiri', 'Noto Naskh Arabic', serif;
  --font-document: 'Courier Prime', monospace;

  /* Animation */
  --ease-reveal: cubic-bezier(0.25, 0.1, 0.25, 1);
  --duration-fast: 250ms;
  --duration-medium: 400ms;
  --duration-slow: 800ms;

  /* Parallax */
  --parallax-bg: 0.3;
  --parallax-mid: 0.6;
  --parallax-fg: 1.0;
}
```

---

## 12. Design Research Approval Criteria

| Criterion | Status |
|-----------|--------|
| Color palette derived from subject materials | ✅ From land, documents, tatreez |
| Typography justified by era/character | ✅ Documentary + bilingual |
| Animation philosophy matches subject nature | ✅ Patient, respectful, parallax |
| Unique visual motifs identified | ✅ Key, tatreez geometry, maps |
| Visual identity is unique (not copied) | ✅ Built from subject research |
| All design decisions traceable to subject | ✅ Documented above |

---

## Gate 4 Status: ✅ COMPLETE

This Design Research Report provides the visual foundation for implementation. The Scrollytelling Expert should use this as the authoritative guide for all visual decisions.

---

*Design Research derived from subject matter research. No existing essays referenced.*
