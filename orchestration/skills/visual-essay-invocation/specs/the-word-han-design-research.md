# Design Research Report: The Word "Han"

> Visual Identity Development for Typography-Forward Scrollytelling
> Created: December 14, 2025
> Status: ✅ Ready for Production

---

## Executive Summary

This visual essay about "The Word Han" demands a typography-forward design where **type is the protagonist**. The subject matter—the spread of a word across civilizations—is itself about writing. The visual identity must emerge from the calligraphic traditions of East Asia, the evolution of scripts, and the material culture of ink, paper, and stone.

**Design Philosophy**: Typography is not decoration—it IS the story. The essay should feel like walking through 2,000 years of writing, with each era's aesthetic embodied in the visual treatment.

---

## Visual Archaeology Findings

### Primary Materials

| Material | Cultural Context | Visual Character |
|----------|------------------|------------------|
| **Ink (墨)** | The medium of East Asian writing | Deep blacks with subtle variations, occasional blue-black tones |
| **Paper (紙)** | Traditional rice paper, hanji, washi | Warm cream tones, subtle texture, visible fibers |
| **Stone (石)** | Steles, oracle bones, bronze vessels | Weathered grays, patinated surfaces, carved textures |
| **Bronze (青銅)** | Ritual vessels with inscriptions | Oxidized greens, warm metallic browns, patina |
| **Silk (絲)** | Imperial documents, scrolls | Smooth, warm ivory, subtle sheen |
| **Vermillion (朱)** | Seals, official stamps | Intense red-orange, ceremonial significance |

### Historical Color Associations

| Era | Primary Colors | Hex Codes | Significance |
|-----|----------------|-----------|--------------|
| **Ancient** | Bronze patina, bone white | `#8B7355`, `#4A6741`, `#F5F0E1` | Archaeological, sacred |
| **Han Dynasty** | Imperial red, gold, jade | `#B8202D`, `#C9A83E`, `#5D9B79` | Power, legitimacy |
| **Transmission** | Ink black, paper cream | `#1A1A1E`, `#FDF5E6` | Scholarly, devotional |
| **Korean** | Royal blue, white, refined gold | `#1E3F66`, `#FFFFFF`, `#D4AF37` | Revolutionary, democratic |
| **Japanese** | Indigo, cherry, natural wood | `#3D5A80`, `#FFB7C5`, `#8B6F47` | Refined, aesthetic |
| **Vietnamese** | Amber, lacquer red, palm green | `#D4AF37`, `#8B0000`, `#228B22` | Tropical, independent |
| **Contemporary** | Clean blacks, whites, accent colors | `#0A0A0C`, `#FDFBF7`, varies | Digital, unified |

### Recurring Visual Motifs

1. **The Character 漢 Itself** — The protagonist, shown transforming through scripts
2. **Water/River Imagery** — Origin story (Han River), water radical (氵)
3. **Seal Stamps (印章)** — Authenticity, authority, chapter markers
4. **Brush Strokes** — Movement, calligraphic energy
5. **Manuscript Edges** — Torn paper, scroll corners, aged document aesthetic
6. **Stone Rubbings** — Textural, archaeological, ancient
7. **Parallel Scripts** — Side-by-side comparisons (漢 vs 韓, regional variants)

### Era-Specific Aesthetics

**Ancient Origins**
- Rough, carved textures
- Archaeological photography aesthetic
- Warm sepia/bronze tones
- Heavy grain and patina

**Han Dynasty**
- Imperial grandeur
- Silk and lacquer textures
- Red and gold accents
- Dignified, formal

**Transmission Period**
- Monastic, scholarly
- Temple candlelight warmth
- Manuscript paper textures
- Subdued, reverent

**Korean Renaissance**
- Intellectual clarity
- Clean, scientific design
- Royal blue and white
- Democratic aspiration

**Modern Era**
- Documentary photography
- Sepia → B&W → color transition
- Newspaper print textures
- Political urgency

**Contemporary**
- Digital precision
- Clean typography specimens
- Pan-CJK font displays
- Global connectivity

---

## Proposed Color Palette

### Core Palette

| Role | Hex | Name | Subject Connection |
|------|-----|------|-------------------|
| **Primary Background** | `#0A0A0C` | Ink Night | Deep black of traditional ink stone |
| **Secondary Background** | `#1A1A1E` | Elevated Ink | Lighter surface for layering |
| **Ink Wash** | `#2A2A32` | Atmosphere | Subtle ink wash background zones |
| **Text Primary** | `#FDFBF7` | Paper White | Traditional paper color, warm not cold |
| **Text Secondary** | `#FDFBF7` @ 60% | Faded Ink | Aged text, secondary information |

### Accent Palette

| Role | Hex | Name | Subject Connection |
|------|-----|------|-------------------|
| **Imperial Accent** | `#B8202D` | Han Red | Imperial Han Dynasty vermillion seals |
| **Korean Accent** | `#1E3F66` | Joseon Blue | Royal Korean court color |
| **Gold Accent** | `#C9A83E` | Seal Gold | Traditional seal impressions |
| **Bronze Accent** | `#8B7355` | Ancient Bronze | Ritual vessel color |
| **Jade Accent** | `#5D9B79` | Han Jade | Imperial jade artifacts |

### Era Transitions

The color palette subtly shifts as the reader progresses through eras:

```
Ancient: Bronze (#8B7355) + Patina (#4A6741) + Bone (#F5F0E1)
    ↓
Han Dynasty: Red (#B8202D) + Gold (#C9A83E) + Jade (#5D9B79)
    ↓
Transmission: Ink (#1A1A1E) + Paper (#FDF5E6) + Temple warmth
    ↓
Korean: Blue (#1E3F66) + White (#FFFFFF) + Refined gold
    ↓
Modern: Documentary sepia → B&W → full color
    ↓
Contemporary: Clean blacks + whites + pan-CJK unity
```

---

## Typography Stack

### Philosophy

Typography is the PROTAGONIST of this essay. Font choices are not mere styling—they embody the subject matter itself. The reader should feel they are witnessing 2,000 years of writing evolution.

### Primary Stack (Pan-CJK)

| Role | Font | Reasoning |
|------|------|-----------|
| **CJK Serif** | Source Han Serif | The pan-CJK font that literally unifies the Han character heritage—it IS the subject matter made type |
| **CJK Sans** | Source Han Sans | Modern complement, used for UI, captions |
| **Latin Serif** | Source Serif Pro | Harmonizes with Source Han for bilingual text |
| **Latin Display** | Cormorant Garamond | Elegant, historically-informed display for English headlines |

### Era-Specific Display Treatments

| Era | Display Treatment | Typeface Choice |
|-----|-------------------|-----------------|
| **Ancient** | Rough, carved aesthetic | Custom brush script treatment or decorative ancient-style display |
| **Han Dynasty** | Heavy serif, imperial weight | Source Han Serif Bold with gold color accents |
| **Korean** | Hangul prominence | Nanum Myeongjo for Korean-focused sections |
| **Japanese** | Minchō refinement | Source Han Serif JP for Japanese context |
| **Contemporary** | Clean, unified | Source Han Serif with modern spacing |

### Typography Scale

```css
/* Mobile-First Typography */
:root {
  /* Display (Chapter Titles) */
  --type-display: 2.5rem / 1.1;      /* 40px */
  
  /* Headlines */
  --type-h1: 2rem / 1.15;            /* 32px */
  --type-h2: 1.5rem / 1.2;           /* 24px */
  
  /* Body */
  --type-body: 1.125rem / 1.7;       /* 18px */
  --type-body-large: 1.25rem / 1.6;  /* 20px */
  
  /* Quotes */
  --type-quote: 1.375rem / 1.5;      /* 22px */
  
  /* Captions & UI */
  --type-caption: 0.875rem / 1.5;    /* 14px */
  --type-micro: 0.75rem / 1.4;       /* 12px */
  
  /* Character Display (large format) */
  --type-character-hero: 8rem;        /* 128px - for hero character displays */
  --type-character-section: 4rem;     /* 64px - for section character reveals */
}

/* Desktop Enhancement */
@media (min-width: 768px) {
  :root {
    --type-display: 3.5rem / 1.1;
    --type-h1: 2.5rem / 1.15;
    --type-character-hero: 12rem;
    --type-character-section: 6rem;
  }
}
```

### Special Typography Treatments

**1. Character Morphing Display**
Large-scale display of 漢 that morphs through scripts. Uses variable font weight and custom animation.

**2. Parallel Script Comparison**
Side-by-side display of 漢 (Chinese) vs 韓 (Korean), emphasizing visual difference through careful spacing and sizing.

**3. Quote Monuments**
Historical quotes displayed at large scale with subtle calligraphic treatment—not overwhelming, but carrying gravitas.

**4. Era Headers**
Each chapter/era header uses typography that reflects its period:
- Ancient: Rough, bronze-inscription style
- Han: Imperial serif with gold accent
- Korean: Clean with Hangul integration
- Contemporary: Refined modern serif

---

## Animation Philosophy

### Core Principle

Animation matches the nature of calligraphy: **deliberate, graceful, unhurried**. Unlike energetic sports or mechanical topics, this subject demands contemplative motion.

### Tempo & Timing

| Animation Type | Duration | Easing | Reasoning |
|----------------|----------|--------|-----------|
| **Character morph** | 400ms per stage | ease-in-out | Calligraphic strokes are deliberate |
| **Text reveals** | 300ms | ease-out | Ink settling on paper |
| **Section transitions** | 600ms | cubic-bezier(0.4, 0, 0.2, 1) | Scroll unrolling |
| **Parallax** | Continuous | linear | Water flowing (Han River metaphor) |
| **Seal stamp** | 250ms | ease-out with bounce | Physical impression |

### Signature Animations

**1. The Script Morph**
The character 漢 transforms through historical scripts:
- Oracle bone → Bronze → Seal → Clerical → Regular → Simplified
- Each stage holds for 400ms as scroll advances
- Morphing is smooth, calligraphic, not abrupt

**2. Ink Flow**
Background elements use subtle ink-in-water animations:
- Soft, organic movement
- Low opacity (5-10%)
- Evokes the Han River origin

**3. Seal Stamp Reveal**
Progress bar chapter markers appear with a subtle "stamp" animation:
- Scale from 120% to 100%
- Slight bounce on land
- Red color (vermillion) fill

**4. Manuscript Unfurl**
Sections reveal as if a scroll is being unrolled:
- Top-to-bottom reveal
- Subtle paper texture appearance
- Contemplative pacing

**5. Parallel Drift**
When comparing 漢 and 韓:
- Characters drift toward center
- Pause in proximity
- Separate again with gravity

### Motion Values

```css
:root {
  /* Durations */
  --duration-fast: 200ms;     /* UI feedback */
  --duration-normal: 350ms;   /* Standard reveals */
  --duration-slow: 600ms;     /* Major transitions */
  --duration-morph: 400ms;    /* Character script changes */
  
  /* Easing */
  --ease-calligraphic: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-settle: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-stamp: cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Parallax Speeds */
  --parallax-bg: 0.2;
  --parallax-mid: 0.5;
  --parallax-subject: 1.0;
  --parallax-overlay: 1.2;
  --parallax-ambient: 1.5;
  
  /* Stagger */
  --stagger-text: 40ms;
  --stagger-list: 60ms;
}
```

---

## Visual Motifs & Decorative Elements

### Progress Bar: "The Ink Stroke"

**Concept**: A vertical brush stroke on the left edge that evolves from ancient to modern.

**Design**:
- Shape: Brush stroke silhouette, rough at top (ancient), refined at bottom (contemporary)
- Fill: Ink gradient that fills as scroll progresses
- Chapter markers: Red seal stamps (印) that "stamp" into place
- Current position: Glowing dot with subtle pulse

**Implementation**:
```
Top (Ancient)
   │
   ■ Chapter 1 - "The River" [seal stamp]
   │
   ■ Chapter 2 - "The Empire"
   │
   ■ Chapter 3 - "The Characters"
   │
   ■ Chapter 4 - "The King"
   │
   ■ Chapter 5 - "The Nations"
   │
   ■ Chapter 6 - "The Legacy"
   │
Bottom (Contemporary)
```

### Section Dividers

**Era Transitions**: Subtle horizontal brush stroke that fades in, marking era shifts

**Chapter Breaks**: Vermillion seal stamp motif centered

### Background Textures

- **Paper grain**: Subtle fiber texture at 5% opacity
- **Ink wash**: Gradient zones suggesting ink diffusion
- **Stone rubbing**: For ancient section backgrounds

### Floating Elements

- **Ink particles**: Small, slow-moving dots suggesting ink in water
- **Character fragments**: Very subtle background elements showing script components
- **Water ripples**: Occasional subtle ripple effect (Han River metaphor)

---

## Differentiation Check

### How This Differs From Other Esy Scrollytelling

| Aspect | This Essay | Typical Esy Pattern |
|--------|------------|---------------------|
| **Color Palette** | Ink black + paper cream + vermillion accents | Warm earth tones, burnt orange |
| **Typography Role** | Typography IS the protagonist | Typography serves content |
| **Animation Style** | Calligraphic, contemplative | Varied by topic |
| **Progress Bar** | Brush stroke with seal stamps | Generic line or dots |
| **Cultural Specificity** | Pan-East Asian, script-focused | Topic-specific |
| **Visual Complexity** | Typography-forward, minimal imagery | Photography-heavy |

### What Makes This Design Unmistakably "About Han"

1. **The Character Morph**: Only this essay would have the 漢 character transforming through scripts
2. **Seal Stamp Navigation**: Chinese/Korean seal tradition as UI element
3. **Pan-CJK Typography**: Source Han fonts literally embody the subject
4. **Parallel Script Comparisons**: 漢 vs 韓 visualization
5. **Ink & Paper Aesthetic**: The materials of writing as the design foundation
6. **Era-Specific Type Treatments**: Typography shifts to reflect historical periods

---

## Unique Interaction Mechanics

### 1. Script Morph Scroll-Lock (UNIQUE)

**Description**: Scroll input drives the transformation of 漢 through historical scripts.

**Implementation**: 
- Viewport locks when user scrolls into the morph zone
- Continued scroll advances the character through stages
- Each stage has visual artifacts (bronze texture, paper grain, etc.)
- Progress indicator shows morph completion
- Skip affordance after 2 seconds

**Why Unique**: No other Esy story would have a character evolving through millennia of scripts.

### 2. Two Hans Divergence (UNIQUE)

**Description**: Split-screen interaction showing 漢 and 韓 approaching then separating.

**Implementation**:
- Screen divides vertically
- Left: Chinese 漢 with red accent
- Right: Korean 韓 with blue accent
- Scroll brings them together, then separates
- Text explains: "Same sound. Different word."

**Why Unique**: Visualizes the central insight about two distinct etymologies.

### 3. Typography Timeline (UNIQUE)

**Description**: Fonts from across East Asia converge into modern pan-CJK.

**Implementation**:
- Multiple regional font specimens orbit
- Scroll brings them together
- Source Han Serif emerges as unifying design
- Shows CN/JP/KR variants side by side

**Why Unique**: Uses actual fonts as visual narrative—fonts ARE the story.

---

## Mobile-First Considerations

### Typography on Mobile

- Body text: 18px minimum for handheld reading
- Character displays: Scale down but remain impactful (4rem on mobile vs 8rem desktop)
- Line height: 1.7 for comfortable reading
- Paragraph length: 3-4 sentences max before visual break

### Animation Performance

- Reduce parallax layers to 2 on mobile
- Simplify ink particle count
- Character morph uses simpler transitions
- Respect `prefers-reduced-motion`

### Touch Interactions

- Skip affordance: 44x44px minimum
- Progress bar: Bottom horizontal on mobile for thumb reach
- Seal stamp markers: Larger tap targets

### Safe Areas

- Respect notches and home indicators
- Content padding accounts for safe-area-inset
- Fixed elements never overlap system UI

---

## Validation Checklist

### Subject Authenticity

- [x] If I removed all text, would someone guess this is about writing/typography/East Asia? **YES**
- [x] Does this design pay homage to ink, paper, and calligraphic traditions? **YES**
- [x] Could this design work for ANY topic? **NO — it's specifically about scripts and writing**
- [x] Have I actually researched the subject's visual history? **YES — extensive**
- [x] Does the animation style reflect calligraphic contemplation? **YES**

### Differentiation

- [x] Color palette is NOT warm earth tones/burnt orange
- [x] Typography is central, not supporting
- [x] Progress bar is subject-specific (brush stroke + seals)
- [x] Animations are calligraphic, not energetic
- [x] No patterns copied from previous Esy work

### Technical Feasibility

- [x] Pan-CJK fonts available (Source Han — open source)
- [x] Character morph achievable with CSS/SVG animation
- [x] Mobile performance budget respected
- [x] Accessibility requirements addressed

---

## Deliverables Summary

| Deliverable | Status |
|-------------|--------|
| Visual Archaeology Findings | ✅ Complete |
| Color Palette with Subject Justification | ✅ Complete |
| Typography Stack with Era Alignment | ✅ Complete |
| Animation Philosophy | ✅ Complete |
| Visual Motifs & Decorative Elements | ✅ Complete |
| Differentiation Verification | ✅ Complete |
| Unique Interaction Mechanics | ✅ Complete |
| Mobile-First Considerations | ✅ Complete |

---

## Next Steps

1. **Production Implementation**: The Production Orchestrator can now proceed with production using this design system
2. **Font Acquisition**: Ensure Source Han Serif/Sans are properly loaded
3. **Character Animation**: Work with Immersive Experience Engineer on script morph animation
4. **Progress Bar**: Custom brush stroke SVG for the "Ink Stroke" progress indicator
5. **Testing**: Real device testing on iOS and Android for font rendering

---

*This Design Research Report establishes a unique, typography-forward visual identity for "The Word Han" that cannot be confused with any other Esy visual essay. The design emerges directly from the subject matter—ink, paper, calligraphy, and the evolution of scripts across East Asia.*
