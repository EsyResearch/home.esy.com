# Design Research Report: The Origin of the Word "Pussy"

> **Status**: COMPLETE
> **Date**: December 14, 2025
> **Visual Treatment**: Photo-Documentary + Typography-Forward

---

## Visual Archaeology Findings

### Subject Matter Analysis

This visual essay is fundamentally about **language as artifact**—specifically, the evolution of a single word across 500 years. Unlike essays about physical objects, people, or events, this story's primary "object" is invisible: the word itself.

**The Challenge**: How do you *show* etymology? How do you visualize semantic shift?

**The Solution**: **Typography becomes the visual**. The word "pussy" rendered in period-appropriate typefaces *is* the hero image. The letterforms themselves tell the story of time passing.

### Primary Materials of the Subject

| Material | Era | Visual Character |
|----------|-----|------------------|
| Manuscript ink | Medieval | Hand-drawn, imperfect, sacred |
| Early printing type | Renaissance | Mechanical reproduction, human touch |
| Metal type | Georgian | Precise, refined, literary |
| Victorian print | 19th century | Ornate, decorative, mass-produced |
| Digital type | Modern | Clean, sterile, infinitely reproducible |

### Historical Color Associations

The color palette follows the **materials of writing** through time:

| Era | Dominant Colors | Source |
|-----|-----------------|--------|
| Medieval | Parchment cream, iron gall black, vermillion red | Manuscript tradition |
| Renaissance | Warm paper, printing black, scholar's brown | Early book culture |
| Georgian | Ivory, deep brown, candlelight gold | Coffeehouse elegance |
| Victorian | Split: nursery pastels vs. mourning blacks | Era's duality |
| Modern | Clinical white, urban gray, warning red | Digital sterility |

### Recurring Visual Motifs

1. **The Letterform**: Especially the **letter P**—transformed across eras
2. **The Dictionary Page**: Documentation, definition, omission
3. **The Branch/Split**: Visual metaphor for meaning divergence
4. **The Redaction**: Black bars, asterisks—modern censorship
5. **The Cat** (sparingly): Original innocent meaning

---

## Proposed Color Palette

### Primary Palette

| Color | Hex | Derivation |
|-------|-----|------------|
| **Manuscript Cream** | `#F5E6D3` | Medieval parchment, aged paper |
| **Iron Gall Black** | `#1A1A1A` | Historical ink, type |
| **Printing Brown** | `#3C2415` | Early book covers, leather |
| **Vermillion Accent** | `#C41E3A` | Rubrication, emphasis |
| **Scholar's Gold** | `#D4AF37` | Illumination, refinement |

### Era-Specific Palettes

**Medieval**:
- Background: `#F5E6D3` (parchment)
- Text: `#1A1A1A` (ink)
- Accent: `#C41E3A` (vermillion)
- Highlight: `#D4AF37` (gold)

**Renaissance**:
- Background: `#F0E4D7` (aged paper)
- Text: `#2C1810` (printing brown)
- Accent: `#CC8B3C` (ochre)

**Georgian**:
- Background: `#FFFFF0` (ivory)
- Text: `#3C2415` (coffeehouse brown)
- Accent: `#FFDF00` (candlelight)

**Victorian**:
- Split palette:
  - Innocent: `#FFD1DC` (nursery pink), `#355E3B` (parlor green)
  - Shadow: `#000000` (black), `#8E4585` (plum)

**Modern**:
- Background: `#FFFFFF` (white)
- Text: `#1A1A1A` (black)
- Accent: `#FF0000` (warning red)
- Secondary: `#808080` (gray)

### Semantic Color Meanings

| Color | Meaning in Essay |
|-------|------------------|
| Cream/Parchment | History, age, authenticity |
| Black | Text, authority, redaction |
| Vermillion/Red | Emphasis, warning, taboo |
| Gold | Significance, illumination |
| White | Modernity, sterility, clinical |

---

## Typography Stack

### Display Typefaces (Hero Use)

| Era | Typeface | Why This Choice |
|-----|----------|-----------------|
| Medieval | **Cloister Black** | Blackletter representing manuscript tradition, Gutenberg's world |
| Renaissance | **EB Garamond** | Humanist clarity, Venetian printing culture, scholarly elegance |
| Georgian | **Libre Baskerville** | Transitional refinement, Johnson's era, literary precision |
| Victorian | **Playfair Display** | Didone drama, extreme contrast, era's visual excess |
| Modern | **Inter** | Sans-serif neutrality, digital-native, clinical clarity |

### Why Typography is the Hero Visual

1. **Etymology IS about words**: The subject is language—letterforms are the most authentic representation
2. **Visual distinctiveness**: Each era's typography has unmistakable character
3. **Scroll-driven transformation**: Typography morphing as you scroll is novel and memorable
4. **No need for people**: Unlike biography essays, this story's "characters" are letters
5. **Scholarly authenticity**: Type specimens evoke the archives where this history lives

### Body & Reading Typefaces

| Purpose | Typeface | Why |
|---------|----------|-----|
| Body Text | **EB Garamond** (primary) | Readable, scholarly, connects to subject |
| Quotes | **Playfair Display** (italic) | Elegance, distinction from body |
| Technical/Notes | **Inter** | Modern clarity, contrast |
| Captions | **Inter** (light) | Unobtrusive, functional |

### CSS Variable System

```css
:root {
  /* Era typefaces - for hero use */
  --type-medieval: "Cloister Black", "Old English Text MT", serif;
  --type-renaissance: "EB Garamond", Georgia, serif;
  --type-georgian: "Libre Baskerville", Baskerville, serif;
  --type-victorian: "Playfair Display", Bodoni, serif;
  --type-modern: Inter, -apple-system, sans-serif;
  
  /* Reading typefaces */
  --font-body: "EB Garamond", Georgia, serif;
  --font-display: "Playfair Display", serif;
  --font-ui: Inter, sans-serif;
  
  /* Type scale (mobile-first) */
  --text-xs: 0.8125rem;   /* 13px - captions */
  --text-sm: 0.9375rem;   /* 15px - secondary */
  --text-base: 1.125rem;  /* 18px - body */
  --text-lg: 1.5rem;      /* 24px - lead */
  --text-xl: 2rem;        /* 32px - section headers */
  --text-2xl: 2.5rem;     /* 40px - chapter titles */
  --text-3xl: 3.5rem;     /* 56px - hero, mobile */
  --text-4xl: 5rem;       /* 80px - hero, desktop */
  --text-hero: clamp(3rem, 10vw, 8rem); /* responsive hero */
}
```

---

## Animation Philosophy

### Overall Tempo: **Scholarly Pace**

This isn't a sports story or a thriller—it's an intellectual journey. Animations should feel:
- **Deliberate**: Not hurried
- **Elegant**: Type-based reveals
- **Transformative**: Morphing, not jumping

### Core Animation Concept: **Typography Evolution**

The central animation is the **word itself morphing between typefaces** as the user scrolls through eras.

**Technical Approach**:
- CSS `font-variation-settings` for variable fonts
- JavaScript-driven typeface swaps at scroll breakpoints
- Smooth transitions using opacity crossfades

### Reveal Styles by Era

| Era | Animation Style | Why |
|-----|-----------------|-----|
| Medieval | Slow fade-in from darkness | Manuscript emerging from history |
| Renaissance | Slide-in from bottom | Page being turned, revealed |
| Georgian | Crossfade | Elegant transition, refinement |
| Victorian | Split-screen emergence | The era's duality |
| Modern | Instant/cut | Digital abruptness |

### Parallax Intensity: **Subtle**

Typography-forward design means parallax should support, not distract:
- Background layers: 0.2x scroll speed
- Text layers: 1x scroll speed (static)
- Decorative elements: 0.5x scroll speed

### Special Effects

1. **The Morph**: Word transforms between typefaces
2. **The Split**: Word duplicates and diverges (meaning branches)
3. **The Redaction**: Black bar slides over word (modern censorship)
4. **The Dictionary Zoom**: Scroll into dictionary page, word highlighted

---

## Visual Motifs

### 1. The Letterform P

The letter P rendered in period type becomes a recurring visual anchor.

**Usage**:
- Chapter openers feature a large P in that era's type
- P as decorative drop cap
- P as section divider

### 2. The Dictionary Page

Facsimile dictionary pages—presence and absence.

**Usage**:
- Show Johnson's Dictionary page where the word would be (but isn't)
- Show OED entry (present)
- Scroll-locked zoom into specific entries

### 3. The Branch Diagram

Visual metaphor for semantic divergence.

**Usage**:
- SVG illustration of meaning branches
- Animated reveal as user scrolls
- Color-coded by meaning type

### 4. The Redaction Bar

Modern censorship as visual.

**Usage**:
- Black bar over the word (███████)
- Asterisks (p***y)
- Represents modern avoidance

---

## Differentiation Check

### How This Differs from Other Esy Scrollytelling

| Element | Other Stories | This Story |
|---------|---------------|------------|
| Hero Visual | Photography | Typography |
| Color Source | Subject's materials | Ink, paper, parchment |
| Primary Motion | Image parallax | Type transformation |
| Character Focus | Historical figures | The word itself |
| Layout Core | Image-text pairs | Typography specimens |

### What Makes This Design Unmistakably About Etymology?

1. **The word is literally the visual**: You're looking at "pussy" in different typefaces
2. **Paper and ink textures**: Colors from the materials of writing
3. **Dictionary pages as props**: The artifacts of lexicography
4. **Typography evolution**: The viewer experiences letterform history
5. **Minimal imagery**: No photographs of people or modern cats

### Forced Uniqueness

> "What interactive element in this story could ONLY exist in a story about etymology?"

**Answer**: The scroll-locked **Typography Evolution Sequence** where the word itself morphs from Blackletter → Garamond → Baskerville → Bodoni → Helvetica as you scroll. This could NOT exist in a story about basketball, spoons, or space exploration. It is inherently about language and letterforms.

---

## Progress Indicator Concept

### "The Timeline of Meaning"

A horizontal bar that shows:
- Era markers (Medieval → Renaissance → Georgian → Victorian → Modern)
- Current position in the story
- The word rendered in that era's typeface

**Visual**:
```
[P] ─────●──────────────── [pussy]
 ↑                            ↑
 Medieval                   Modern
 (Blackletter)            (Helvetica)
```

As user scrolls, the dot moves and the word morphs.

---

## Implementation Notes

### Mobile Considerations

1. **Typography must remain readable**: Hero text sizes responsive (clamp)
2. **Vertical orientation**: Timeline becomes vertical on mobile
3. **Touch-friendly**: Large tap targets for era navigation
4. **Performance**: Font loading optimized (variable fonts, preload)

### Accessibility

1. **Font sizes**: 18px minimum body text
2. **Contrast**: All type meets AA standards
3. **Reduced motion**: Typography transitions without morph
4. **Screen readers**: Proper heading hierarchy, alt text for type specimens

### Font Loading Strategy

```html
<link rel="preload" href="/fonts/EB-Garamond.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin>
```

Fallback chain ensures content displays immediately while custom fonts load.

---

## Validation

### Does this design pass the tests?

✅ **"If I removed all text, would someone guess the subject?"**
Yes—the typography evolution and dictionary page imagery signal etymology.

✅ **"Does this design honor the subject's material history?"**
Yes—colors from ink and paper, typography from printing history.

✅ **"Could this design work for ANY topic?"**
No—typography-as-hero is specific to language/etymology stories.

✅ **"Have I actually researched the subject's visual history?"**
Yes—type specimens, printing history, dictionary conventions researched.

✅ **"Does the animation style match the subject?"**
Yes—scholarly pace, transformative reveals, deliberate motion.

---

## Summary

This is a **typography-forward visual essay** where **the word itself is the hero image**. The design derives entirely from the materials of writing (ink, paper, type) and the history of typography from Gutenberg to the digital age. No photography of people. No stock imagery. The story is told through letterforms evolving across eras, dictionary pages documenting (or omitting) the word, and the visual representation of semantic branching. This design could only exist for an etymology story.
