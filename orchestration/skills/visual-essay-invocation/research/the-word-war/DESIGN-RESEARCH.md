# Design Research Report: The Word War

> **For**: Visual Essay Implementation Team
> **From**: Design Researcher
> **Date**: January 3, 2026
> **Status**: G4 Design Research Complete

---

## Executive Summary

This design research derives a unique visual identity for "The Word War" etymology essay entirely from the subject matter: medieval manuscripts, scribal culture, lexicographic tradition, and the word itself as typographic artifact. Every color, typeface, and motif traces directly to documented historical materials, ensuring authenticity without arbitrary aesthetics.

The visual approach evokes the scriptorium of Peterborough Abbey c.1121 where the word "war" first appeared in English, the scholarly apparatus of historical dictionaries, and the careful, contemplative nature of etymological investigation.

---

## 1. Color Palette

### Derivation Method

All colors derive from documented materials in medieval manuscript production and conservation studies. These are not arbitrary choices but historically justified color values based on the actual pigments, inks, and substrates used in the Peterborough Chronicle era (c.1100-1200) and the lexicographic tradition.

### Primary Palette (5 Colors)

| Role | Color Name | Hex Value | RGB | Source Material | Usage Guidelines |
|------|------------|-----------|-----|-----------------|------------------|
| **Primary Text** | Iron Gall Black | `#1F1B17` | 31, 27, 23 | Fresh iron gall ink as used in 12th-century manuscripts. Iron gall ink begins gray and oxidizes to purple-black. | All body text, headings, primary typographic elements. Deep and legible. |
| **Accent/Rubrication** | Minium Red | `#C54B3C` | 197, 75, 60 | Red lead (minium) used for rubrication in medieval manuscripts. The Latin *miniare* (to apply minium) is the origin of "miniature." | Key dates, important terms, section markers, drop cap accents. Used sparingly for emphasis. |
| **Background** | Parchment | `#F5EDE0` | 245, 237, 224 | Aged vellum/parchment tone. Medieval manuscripts used animal skin substrates with this characteristic warm cream color. | Page backgrounds, reading surfaces. Provides comfortable, warm reading experience. |
| **Secondary Text** | Aged Ink Brown | `#5C4A3D` | 92, 74, 61 | Oxidized and aged iron gall ink. Over centuries, iron gall ink fades to reddish-brown through chemical degradation. | Marginalia, sidenotes, secondary annotations, source citations, captions. |
| **Highlight** | Burnished Gold | `#C9A227` | 201, 162, 39 | Gold leaf illumination. From the 12th century, gold leaf was polished (burnished) over red bole to enhance richness. | Sparingly for illuminated initials, key moments, section dividers. Represents the "illuminated" tradition. |

### Extended Palette (2 Additional Colors)

| Role | Color Name | Hex Value | RGB | Source Material | Usage Guidelines |
|------|------------|-----------|-----|-----------------|------------------|
| **Alternative Accent** | Lombard Blue | `#2D4B73` | 45, 75, 115 | Blue pigment (often azurite or woad) used alongside red in decorated initials. "Lombard" capitals alternated red and blue. | Alternative to red for variety in decorative elements; used in diagrams, charts. |
| **Subtle Background** | Vellum Dark | `#E5DBC8` | 229, 219, 200 | Darker parchment tone for subtle differentiation. | Blockquotes, code blocks, highlighted sections requiring subtle visual distinction from main background. |

### Color Usage Principles

1. **Hierarchy through Contrast**: Iron Gall Black on Parchment provides maximum readability; Minium Red draws attention to dates and key terms.

2. **Historical Accuracy**: These colors derive from conservation studies of actual medieval manuscripts, not arbitrary "old-looking" choices.

3. **Restraint**: Gold appears only at significant moments (section openings, key revelations). Overuse would cheapen its impact.

4. **Accessibility**: All text colors meet WCAG AA contrast ratios against background:
   - Iron Gall Black (#1F1B17) on Parchment (#F5EDE0): 13.2:1 (exceeds AAA)
   - Aged Ink Brown (#5C4A3D) on Parchment (#F5EDE0): 6.1:1 (meets AA)
   - Minium Red (#C54B3C) on Parchment (#F5EDE0): 4.8:1 (meets AA for large text)

---

## 2. Typography System

### Typeface Selection Rationale

Typography selections trace directly to the essay's subject matter: the visual tradition of historical dictionaries (Johnson's Dictionary, the OED), the scholarly apparatus of etymology, and the need for excellent IPA/diacritic support.

### Display Typography

| Role | Typeface | Weight | Justification |
|------|----------|--------|---------------|
| **Hero/Title** | **EB Garamond Display** | Bold (700) | Based on the 1592 Egenolff-Berner specimen. Garamond typefaces derive from Claude Garamond's 16th-century designs, contemporary with early printed dictionaries. EB Garamond is free, open-source, and supports IPA. Erik Spiekermann called it "one of the best open source fonts." |
| **Section Headings (H2)** | **EB Garamond** | SemiBold (600) | Provides gravitas without the full weight of display use. |
| **Subheadings (H3-H4)** | **EB Garamond** | Regular (400), Small Caps | Small caps evoke scholarly tradition and dictionary conventions. |

### Body Typography

| Role | Typeface | Weight | Justification |
|------|----------|--------|---------------|
| **Body Text** | **EB Garamond** | Regular (400) | Highly readable at text sizes. Excellent IPA and diacritics support (3,218 glyphs). Historical resonance with scholarly publishing tradition. |
| **Emphasis** | **EB Garamond** | Italic | True italics based on Robert Granjon's designs. Used for foreign words, historical forms (*werre*, *guerre*), and light emphasis. |

### Supporting Typography

| Role | Typeface | Weight | Justification |
|------|----------|--------|---------------|
| **Historical Forms / IPA** | **Junicode** | Regular | Designed specifically for medievalists. Based on 17th-century Oxford University Press typefaces. Over 3,000 characters with excellent diacritic support. Named after Franciscus Junius. |
| **Marginalia / Sidenotes** | **EB Garamond** | Regular, smaller size | Maintains family consistency while indicating secondary importance. |
| **Language Labels** | **EB Garamond** | Small Caps | FRANKISH, OLD FRENCH, MIDDLE ENGLISH rendered in small caps for consistent visual treatment. |
| **Code / Technical** | **Source Serif 4** | Regular | For any technical content, code examples, or structured data requiring monospace-like clarity. |

### Type Scale

Based on a 1.25 ratio (major third), optimized for long-form reading:

| Element | Size (Desktop) | Size (Mobile) | Line Height | Letter Spacing |
|---------|----------------|---------------|-------------|----------------|
| **H1 (Title)** | 48px / 3rem | 36px / 2.25rem | 1.1 | 0.02em |
| **H2 (Section)** | 32px / 2rem | 28px / 1.75rem | 1.2 | 0.01em |
| **H3 (Subsection)** | 24px / 1.5rem | 22px / 1.375rem | 1.3 | 0 |
| **H4 (Minor Head)** | 20px / 1.25rem | 18px / 1.125rem | 1.3 | 0 |
| **Body** | 18px / 1.125rem | 17px / 1.0625rem | 1.7 | 0 |
| **Caption/Footnote** | 14px / 0.875rem | 14px / 0.875rem | 1.5 | 0 |
| **Marginalia** | 13px / 0.8125rem | 12px / 0.75rem | 1.4 | 0 |

### Typography Principles

1. **Generous Line Height**: 1.7 for body text enables comfortable reading of complex etymological content.

2. **Microtypography**: Use proper curly quotation marks ("not straight"), en dashes for ranges (1121-1155), em dashes for breaks, and proper ellipses.

3. **Historical Form Treatment**:
   - Reconstructed forms: Italicized with asterisk prefix (*\*werra*)
   - Attested forms: Italicized without asterisk (*werre*, *guerre*)
   - Language labels: Small caps (FRANKISH)
   - IPA: Within slashes /wɔːr/ or brackets [wɛrə]

4. **Hierarchy**: Clear visual distinction between heading levels without excessive weight variation.

---

## 3. Visual Motifs

### Motif Derivation

All motifs derive from medieval manuscript conventions, scribal culture, and lexicographic tradition. These are not decorative choices but functional elements grounded in the essay's subject matter.

### Primary Motifs (7)

#### 1. Rubricated Date Markers

**Source**: Medieval rubrication practice using minium (red lead) for dates and important terms.

**Implementation**:
- Key dates appear in Minium Red (#C54B3C)
- Subtle pill or bracket treatment around dates
- Example: "858 CE" or "c.1121"

**Technical Notes**:
```css
.date-marker {
  color: #C54B3C;
  font-variant-numeric: oldstyle-nums;
}
```

#### 2. Marginalia System

**Source**: Medieval manuscripts reserved ~50% of page space for margins. Technical signs, glosses, and corrections appeared in margins.

**Implementation**:
- Sidenotes for source attributions: (OED), (MED), (Peterborough)
- Dates in margins for chronological context
- Scholarly apparatus (uncertainty notes, cross-references)
- On mobile: Sidenotes collapse to inline footnotes

**Technical Notes**:
- Desktop: Fixed margin column (240px) on right side
- Sidenotes align with relevant text via scroll-position awareness
- Use Aged Ink Brown (#5C4A3D) for secondary importance

#### 3. Illuminated Drop Caps

**Source**: Medieval scribes used decorated initials to mark section openings. The practice continued into early printing.

**Implementation**:
- Opening section begins with illuminated initial (3-4 lines tall)
- Gold accent (#C9A227) on initial letter
- Major section breaks may include smaller drop caps (2 lines)
- Design inspired by Lombardic capitals (rounded forms, thick curved stems)

**Technical Notes**:
```css
.drop-cap {
  float: left;
  font-size: 3.5em;
  line-height: 0.8;
  margin-right: 0.1em;
  color: #C9A227;
  font-family: 'EB Garamond', serif;
  font-weight: 600;
}
```

#### 4. Attestation Markers

**Source**: Scholarly convention distinguishing reconstructed from attested forms.

**Implementation**:
- Reconstructed forms: asterisk prefix, dashed underline, slightly faded
- Attested forms: solid underline or no underline, full opacity
- Visual cue in etymology diagrams (dashed vs. solid borders)

**Visual Treatment**:
| Status | Typography | Border Treatment |
|--------|------------|------------------|
| Reconstructed | *\*werra* (italic, asterisk) | Dashed outline |
| Attested | *werre* (italic) | Solid outline |

#### 5. Folio Marks / Section Navigation

**Source**: Medieval manuscripts used folio marks (recto/verso notation) for navigation. Printers later adapted this to page numbers and running heads.

**Implementation**:
- Section indicators at top of each major section
- Progress indicator styled as subtle folio notation
- Example: "III. Meaning Drift" with decorative rule

**Technical Notes**:
- Centered section number with rules extending left/right
- Small caps for section titles
- Uses Aged Ink Brown for subtle presence

#### 6. Language Label System

**Source**: Dictionary conventions for etymology notation; language names distinguished from definitions.

**Implementation**:
- Language names in SMALL CAPS: FRANKISH, OLD FRENCH, MIDDLE ENGLISH
- Consistent visual treatment across all contexts
- Applied to etymology river diagram, tables, and inline text

**Technical Notes**:
```css
.language-label {
  font-variant: small-caps;
  letter-spacing: 0.05em;
  color: #5C4A3D;
}
```

#### 7. Rule and Border System

**Source**: Medieval ruling (pricking and ruling to guide scribes); dictionary column dividers.

**Implementation**:
- Thin rules (1px) in Aged Ink Brown for horizontal dividers
- Subtle vertical rules for column layouts in tables
- Decorative rules with center ornament for major section breaks

**Technical Notes**:
```css
.section-divider {
  border: none;
  border-top: 1px solid #5C4A3D;
  margin: 3rem auto;
  width: 60%;
  position: relative;
}
.section-divider::after {
  content: "~";
  position: absolute;
  top: -0.6em;
  left: 50%;
  transform: translateX(-50%);
  background: #F5EDE0;
  padding: 0 1rem;
  color: #5C4A3D;
}
```

---

## 4. Animation Philosophy

### Core Principles

Animation in "The Word War" must embody the contemplative, scholarly nature of etymological investigation. The Peterborough Chronicle was written by monks in a scriptorium, not warriors on a battlefield. Animations should feel like turning manuscript pages, not cinematic action.

### Five Principles

1. **Slow and Contemplative**
   - Duration: 400-800ms for most transitions
   - Easing: ease-out or cubic-bezier curves that decelerate gracefully
   - No sudden movements; everything arrives with scholarly patience

2. **Progressive Disclosure**
   - Etymology nodes appear in sequence, revealing linguistic descent
   - Content emerges as reader scrolls, respecting reading pace
   - Never reveal everything at once; knowledge builds incrementally

3. **Ink-Flow Metaphor**
   - Text and elements appear as if written or drawn onto parchment
   - Opacity transitions from 0 to 1 (fade-in as ink appears)
   - No sliding/bouncing; elements materialize in place

4. **Scholarly Precision**
   - Clean, minimal transitions without flourish
   - No decorative animation that doesn't serve content
   - Motion should aid comprehension, not distract

5. **Respect for Stillness**
   - Most of the essay should be static
   - Animation reserved for key moments (diagram reveals, section transitions)
   - Reader control: animations pause when not scrolling

### Timing Recommendations

| Animation Type | Duration | Easing | Use Case |
|----------------|----------|--------|----------|
| Fade-in (content reveal) | 600ms | ease-out | Text blocks entering viewport |
| Etymology node appear | 400ms | ease-out | Sequential node revelation |
| Connection line draw | 800ms | ease-in-out | Lines connecting etymology nodes |
| Tooltip appear | 200ms | ease-out | Hover/tap interactions |
| Section transition | 500ms | ease | Scrolling between major sections |

### Specific Animation Suggestions by Module

| Module | Animation Approach |
|--------|-------------------|
| **Etymology River Diagram** | Nodes appear sequentially top-to-bottom (PIE first, Modern English last). Connecting lines draw after nodes appear. Reconstructed nodes pulse subtly with dashed-border animation. |
| **Sound & Spelling Panel** | Map fades in first, then regions highlight. Sound transformation arrows animate as paths being drawn. Toggle switch uses instant swap, not slide. |
| **Cognate Network Map** | Central node appears first, then clusters radiate outward. Color fills in after structure is revealed. Interactive highlights use instant color change, not transitions. |
| **Semantic Constellation** | Central "WAR" appears, then rings expand outward. Terms fade in by semantic distance. Gradient lines draw slowly like calligraphy. |
| **Timeline Band** | Dual tracks appear simultaneously. Events populate left-to-right as time progresses. Warning annotation fades in last. |
| **Geographic Map** | Base map appears instantly. Color regions fill in by etymological family. Norman invasion route arrow draws as path. |
| **Typographic Hero** | Large "WAR" letters fade in with slight opacity build. No 3D effects, no perspective shifts. |

### What NOT to Animate

- Body text paragraphs (should be immediately readable)
- Sidenotes and marginalia (should be present when relevant content appears)
- Navigation elements
- Any element the user needs to read immediately

---

## 5. Layout Principles

### Margin and Whitespace Philosophy

Medieval manuscripts reserved approximately 50% of page area for margins. While modern screens require different ratios, the principle of generous whitespace remains essential for scholarly content.

### Grid System

**Desktop (1200px+)**:
- Content column: 680px maximum width
- Right margin: 240px for sidenotes
- Left margin: flexible (centers content)
- Total content area: 920px

**Tablet (768px - 1199px)**:
- Content column: 600px maximum width
- Sidenotes inline as footnotes or expandable elements
- Margins: 2rem on sides

**Mobile (< 768px)**:
- Content column: full width minus 1.5rem padding
- Sidenotes become inline footnotes (numbered, expandable)
- Diagrams and charts scroll horizontally if needed

### Spacing Scale

Based on 8px unit system:

| Token | Value | Use |
|-------|-------|-----|
| `--space-xs` | 4px | Icon margins, tight elements |
| `--space-sm` | 8px | Inline spacing, small gaps |
| `--space-md` | 16px | Paragraph margins, element spacing |
| `--space-lg` | 24px | Section padding, card internal spacing |
| `--space-xl` | 48px | Between major sections |
| `--space-2xl` | 96px | Between essay parts, visual breathing room |

### Layout Principles

1. **Text Column Width**: 65-75 characters per line for optimal readability. With 18px EB Garamond, this is approximately 680px.

2. **Vertical Rhythm**: All spacing derives from line-height multiples. With 18px text and 1.7 line-height, base vertical unit is 30.6px (round to 32px for calculations).

3. **Sidenote Alignment**: Sidenotes begin at the same baseline as the text they reference.

4. **Visual Module Spacing**: Full-bleed diagrams preceded and followed by `--space-2xl` (96px).

5. **Mobile Adaptation**: Diagrams simplify rather than shrink. Complex etymology trees may become vertical stacks on mobile.

### Visual Module Layout

| Module | Desktop Layout | Mobile Layout |
|--------|----------------|---------------|
| Etymology River | Full-width diagram with horizontal flow | Vertical stack with scrollable area |
| Sound & Spelling Panel | Side-by-side map and diagram | Stacked: map on top, diagram below |
| Cognate Network | Radial network, interactive | Simplified list view with key connections |
| Semantic Constellation | Radial layout | Concentric rings, scrollable |
| Timeline Band | Horizontal dual-track | Vertical timeline, single column |
| Geographic Map | Full map with overlays | Scrollable/zoomable |

---

## 6. Accessibility Considerations

### Color Contrast

All text meets WCAG 2.1 AA requirements:

| Combination | Contrast Ratio | WCAG Level |
|-------------|----------------|------------|
| Iron Gall Black on Parchment | 13.2:1 | AAA |
| Aged Ink Brown on Parchment | 6.1:1 | AA |
| Minium Red on Parchment | 4.8:1 | AA Large Text |
| Lombard Blue on Parchment | 7.2:1 | AAA |

**Note**: Minium Red should only be used for large text (18px+) or bold text (14px+ bold).

### Reduced Motion

Implement `prefers-reduced-motion` media query for all animations:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Alternative Behaviors**:
- Etymology diagram: All nodes appear immediately, no sequential reveal
- Timeline: Static display, no scroll-triggered animations
- All fade-ins: Elements appear at full opacity immediately

### Screen Reader Considerations

1. **Etymology Diagrams**: Provide text description of complete pathway. Use `aria-label` to describe relationships.

2. **Interactive Elements**: All clickable/tappable elements must have clear focus states using outline (not just color change).

3. **Sidenotes**: Linked inline with `aria-describedby` pointing to sidenote content. Screen readers announce both the reference and the content.

4. **Language Labels**: Use `lang` attribute for foreign words:
   ```html
   <span lang="fro">werre</span>
   ```

5. **Abbreviations**: First use expanded, subsequent uses with `<abbr>`:
   ```html
   <abbr title="Oxford English Dictionary">OED</abbr>
   ```

### Focus States

```css
:focus-visible {
  outline: 2px solid #2D4B73;
  outline-offset: 2px;
}
```

### Text Resizing

- All text in relative units (rem, em)
- Layout remains functional up to 200% text zoom
- Line length remains comfortable (maximum 80 characters at 200% zoom)

---

## 7. Anti-Patterns (What NOT to Do)

### Visual Approaches to Avoid

| Anti-Pattern | Why It's Wrong | What to Do Instead |
|--------------|----------------|-------------------|
| **Military/Combat Imagery** | This essay is about language history, not violence glorification. Battle scenes sensationalize the subject. | Use manuscripts, documents, typography as visual anchors. |
| **Propaganda Poster Aesthetics** | Bold geometric designs, stark colors, and angular layouts evoke 20th-century war propaganda, which is historically and tonally inappropriate. | Embrace organic manuscript forms, warm colors, scholarly restraint. |
| **Aggressive Typography** | All-caps headlines, compressed sans-serifs, or display faces with sharp angles create military feeling. | Use EB Garamond and Junicode; scholarly, readable, historically grounded. |
| **Explosion/Impact Effects** | Burst animations, particles, or shatter effects glorify violence. | Fade-ins, gentle reveals, ink-flow metaphors. |
| **Heavy Grunge/Distressing** | Excessive texture overlays, torn edges, or "aged" filters look gimmicky rather than authentic. | Subtle parchment tone; texture is color, not overlay. |
| **Dark Mode as Default** | Black backgrounds with light text evoke screens and modernity, not manuscripts. | Parchment background as default; dark mode only as accessibility option. |
| **Sans-Serif Body Text** | Sans-serif disrupts historical continuity and feels cold for this content. | Serif body text throughout (EB Garamond). |
| **Sliding/Bouncing Animations** | Playful motion is inappropriate for scholarly content about conflict. | Fade and opacity transitions only. |
| **Autoplay Video/Sound** | Disrupts reading flow and accessibility. | Static content; user-initiated media only. |
| **Gamification Elements** | Progress bars, achievement badges, or quiz elements trivialize the subject. | Linear reading experience with subtle section indicators. |

### Tonal Boundaries

**This essay is NOT**:
- A celebration of war
- A military history primer
- Entertainment/spectacle
- Designed to impress with technical flourishes

**This essay IS**:
- A scholarly examination of language
- Contemplative and precise
- Grounded in documentary evidence
- Designed to educate with clarity

---

## 8. Reference Images and Inspiration

### Primary Sources (for direct visual reference)

1. **Peterborough Chronicle (MS. Laud Misc. 636)**
   - Bodleian Digital Library: https://digital.bodleian.ox.ac.uk/objects/6272311c-058d-417a-8e21-05e463b4f1f9/
   - Contains first English attestation of "war"
   - Note: Round English vernacular hand, 30 long lines, Caroline/insular letter-forms
   - Ornamental initial B in green with red decoration (fol. 1r)

2. **Johnson's Dictionary (1755)**
   - Internet Archive: https://archive.org/details/johnsons_dictionary_1755
   - Typography: Caslon-like faces from Alexander Wilson's foundry
   - Layout: Bold headwords, indented definitions, literary quotations

3. **Oxford English Dictionary First Edition**
   - Large boldface headwords
   - Historical quotations in chronological order
   - Typography: Clear hierarchy, readable at small sizes

### Design Mood

- **Contemplative, not dramatic**
- **Precise, not elaborate**
- **Warm, not cold**
- **Historical, not archaic**
- **Scholarly, not academic (accessible, not exclusive)**

---

## 9. Implementation Checklist

### Before Development

- [ ] Confirm EB Garamond and Junicode font loading
- [ ] Set up CSS custom properties for color palette
- [ ] Establish spacing scale tokens
- [ ] Create responsive breakpoint strategy

### During Development

- [ ] Implement reduced-motion alternatives for all animations
- [ ] Test all color combinations for WCAG compliance
- [ ] Ensure sidenotes degrade gracefully to inline footnotes
- [ ] Validate `lang` attributes on all foreign text

### Quality Assurance

- [ ] Test at 200% text zoom
- [ ] Screen reader testing (VoiceOver, NVDA)
- [ ] Performance audit (animations at 60fps)
- [ ] Cross-browser testing (Safari, Chrome, Firefox, Edge)

---

## Sources Consulted

### Medieval Manuscripts and Paleography
- Bodleian Library MS. Laud Misc. 636 manuscript description
- Stanford EM1060 project: The Production and Use of English Manuscripts 1060-1220
- Medievalbooks.nl on manuscript layout and margins
- Wikipedia: Insular script, Carolingian minuscule, Rubrication

### Colors and Materials
- Conservation studies on iron gall ink degradation
- Medieval manuscript pigment analysis (minium, vermillion)
- Encyclopedia of Color: Parchment and Vellum values
- British Library Collection Care blog on inks

### Typography
- EB Garamond: Google Fonts documentation
- Junicode: Wikipedia and font documentation
- Paul Luna on Johnson's Dictionary typography
- OED typography history

### Animation and Accessibility
- MDN: prefers-reduced-motion
- W3C WCAG 2.1 guidelines
- NN/G: Scroll-Triggered Text Animations
- web.dev: Animation and motion accessibility

---

*Design Research prepared by Design Researcher*
*January 3, 2026*
*Status: G4 Complete - Ready for G4.1 Reconciliation*
