# Typography: Era-Appropriate Type System

## ⚠️ Content Advisory

This document specifies typography for a documentary essay on a racial slur. All typographic choices serve scholarly communication, not spectacle.

---

## Typography Philosophy

### Core Principles
1. **Grave, precise, respectful** — never playful or casual
2. **Era-appropriate** — typography evolves with the timeline
3. **Readability first** — no distressed type for body text
4. **Authority without coldness** — scholarly but accessible

### The Word Itself
When the full term appears (in citations only):
- **Never display typography** — no large, decorative treatments
- **Documentary context only** — embedded in body text or captions
- **Never for shock value** — functional, not spectacular

---

## Primary Typeface System

### Headlines
**Font Family**: Playfair Display or similar high-contrast serif
**Character**: Authoritative, elegant, appropriate gravity
**Weights**: Regular (400), Bold (700)
**Use**: Main headlines, chapter titles

### Body Text
**Font Family**: Source Serif Pro or similar readable serif
**Character**: Comfortable extended reading, scholarly warmth
**Weights**: Regular (400), Italic (400i), Semibold (600)
**Use**: Primary narrative, all body copy

### Accent / Display
**Font Family**: EB Garamond (historical sections) / Inter (contemporary)
**Character**: Era-specific accent
**Weights**: Variable
**Use**: Pull quotes, dates, labels, era-specific moments

### Captions / Data
**Font Family**: Source Sans Pro
**Character**: Clean, functional, readable at small sizes
**Weights**: Regular (400), Semibold (600)
**Use**: Image captions, chart labels, footnotes

### Monospace / Documentary
**Font Family**: IBM Plex Mono or Courier Prime
**Character**: Typewriter, official document aesthetic
**Weights**: Regular (400)
**Use**: Era 5 captions, court documents, transcripts

---

## Era-Specific Typography

### Era 1: Origins & Early Modern (1500s–1700s)

**Primary Typeface**: EB Garamond
- Old-style serif with humanist characteristics
- Evokes Renaissance printing
- Calligraphic warmth

**Display Typeface**: Cormorant Garamond (for larger titles)

**Treatment**:
- Generous letter-spacing
- Drop caps for chapter openings (manuscript tradition)
- Ligatures enabled
- Italic for Latin terms and emphasis

**Sample CSS**:
```css
.era-1-body {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 1.125rem;
  line-height: 1.75;
  letter-spacing: 0.02em;
}
```

---

### Era 2: Colonial & Transatlantic (1700s)

**Primary Typeface**: Libre Caslon Text
- Transitional serif
- Sturdy, practical
- English printing tradition

**Display Typeface**: Libre Caslon Display

**Treatment**:
- Slightly tighter than Era 1
- Small caps for headings
- Formal, orderly feel
- Numerals: oldstyle figures

**Sample CSS**:
```css
.era-2-body {
  font-family: 'Libre Caslon Text', 'Times New Roman', serif;
  font-size: 1.0625rem;
  line-height: 1.65;
}
```

---

### Era 3: Antebellum & Slavery (1800–1865)

**Primary Typeface**: Spectral (abolitionist stream) / Playfair Display (commercial)
- High contrast
- Didone influence
- Sharp, urgent

**Display Typeface**: Old Standard TT

**Treatment**:
- Strong contrast between thick and thin strokes
- Headlines: all caps with letter-spacing
- Commercial/minstrel materials: distressed display types (documentary, not decorative)

**Sample CSS**:
```css
.era-3-body {
  font-family: 'Spectral', Georgia, serif;
  font-size: 1.0625rem;
  line-height: 1.6;
}

.era-3-headline {
  font-family: 'Playfair Display', serif;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
```

---

### Era 4: Reconstruction & Jim Crow (1865–1954)

**Primary Typeface**: Lora (body) / Oswald (signage)
- Transitioning to industrial aesthetic
- Court document feel for body
- Stark sans-serif for signage elements

**Display Typeface**: Oswald (condensed, industrial)

**Treatment**:
- Tight, efficient layouts
- Sans-serif for signage/headlines
- Serif for legal text, body
- Heavy weight for warning/signage

**Sample CSS**:
```css
.era-4-body {
  font-family: 'Lora', Georgia, serif;
  font-size: 1rem;
  line-height: 1.6;
}

.era-4-sign {
  font-family: 'Oswald', 'Arial Narrow', sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
}
```

---

### Era 5: Civil Rights Era (1954–1970s)

**Primary Typeface**: IBM Plex Mono (captions) / Source Serif Pro (body)
- Typewriter aesthetic for captions
- Documentary feel
- Contact sheet labels

**Display Typeface**: Archivo Black

**Treatment**:
- Typewriter for photo captions (all caps)
- Tight leading for headlines (newsroom urgency)
- Monospace for transcripts
- Bold sans for headlines

**Sample CSS**:
```css
.era-5-caption {
  font-family: 'IBM Plex Mono', 'Courier New', monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.era-5-headline {
  font-family: 'Archivo Black', Impact, sans-serif;
  text-transform: uppercase;
}
```

---

### Era 6: Late 20th Century (1970s–2000)

**Primary Typeface**: Inter (body) / Helvetica Neue (display)
- Broadcast aesthetic
- Clean modernism
- Video caption bar feel

**Display Typeface**: Helvetica Neue Bold

**Treatment**:
- Clean sans-serif
- Lower-third caption bar styling
- White on black for captions
- Minimal decoration

**Sample CSS**:
```css
.era-6-body {
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}

.era-6-chyron {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 0.5em 1em;
}
```

---

### Era 7: Contemporary (2000–Present)

**Primary Typeface**: Inter or system sans-serif
- Clean digital aesthetic
- Maximum readability
- Platform-native feel

**Display Typeface**: Inter or variable font

**Treatment**:
- Standard web typography
- System font stack acceptable
- Responsive type scaling
- No decoration

**Sample CSS**:
```css
.era-7-body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1rem;
  line-height: 1.7;
}
```

---

## Typography Scale

### Responsive Type Scale

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| H1 (Hero) | 2.5rem | 3.5rem | 4.5rem |
| H2 (Chapter) | 2rem | 2.5rem | 3rem |
| H3 (Section) | 1.5rem | 1.75rem | 2rem |
| Body | 1rem | 1.0625rem | 1.125rem |
| Caption | 0.75rem | 0.8125rem | 0.875rem |
| Footnote | 0.6875rem | 0.75rem | 0.8125rem |

### Line Heights

| Element | Line Height |
|---------|-------------|
| Headlines | 1.2 |
| Body | 1.65–1.75 |
| Captions | 1.4 |
| Footnotes | 1.5 |

### Letter Spacing

| Element | Letter Spacing |
|---------|---------------|
| Display (uppercase) | 0.1–0.15em |
| Body | normal or 0.01em |
| Small caps | 0.05em |
| Monospace | normal |

---

## Special Typography Treatments

### Pull Quotes
```css
.pull-quote {
  font-family: 'EB Garamond', Georgia, serif;
  font-style: italic;
  font-size: 1.5rem;
  line-height: 1.4;
  border-left: 4px solid currentColor;
  padding-left: 1.5rem;
}
```

### Dictionary Entries
```css
.dictionary-entry {
  font-family: 'Source Serif Pro', Georgia, serif;
  font-size: 1rem;
}

.dictionary-headword {
  font-weight: 700;
}

.dictionary-label {
  font-style: italic;
  color: #666;
}
```

### Timeline Dates
```css
.timeline-date {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

### Figure Profiles
```css
.figure-name {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 700;
}

.figure-epithet {
  font-style: italic;
  font-size: 1.125rem;
  color: #555;
}
```

---

## Critical Typography Rules

### 1. The Slur in Text
When the full term appears in cited quotations:
- Use standard body text
- No emphasis (bold, italic, color)
- Same typographic treatment as surrounding text
- Never pull-quote the slur itself

### 2. Resistance Voices Prominent
- Pull quotes feature resistance figures prominently
- Baldwin, King, Wells, Du Bois — their words large and honored
- Typography serves their dignity

### 3. No Shock Typography
- Never use the slur in display type
- Never as headline
- Never in decorative treatment
- Documentary only

### 4. Accessibility
- Minimum 16px for body text
- No fully distressed type for body
- High contrast maintained
- Decorative type for accents only

---

## Font Loading Strategy

### Performance Considerations
```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/source-serif-pro-v14-latin-regular.woff2" as="font" type="font/woff2" crossorigin>

<!-- Font display swap for FOUT -->
@font-face {
  font-family: 'Source Serif Pro';
  font-display: swap;
  src: url('/fonts/source-serif-pro-v14-latin-regular.woff2') format('woff2');
}
```

### Fallback Stack
```css
/* Body text fallback */
font-family: 'Source Serif Pro', Georgia, 'Times New Roman', serif;

/* Sans fallback */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

/* Mono fallback */
font-family: 'IBM Plex Mono', 'SF Mono', SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace;
```

---

## Typography Summary

| Era | Primary Body | Display | Character |
|-----|--------------|---------|-----------|
| 1 | EB Garamond | Cormorant | Humanist, warm |
| 2 | Libre Caslon | Libre Caslon Display | Transitional, sturdy |
| 3 | Spectral | Playfair Display | High contrast, urgent |
| 4 | Lora | Oswald | Industrial, official |
| 5 | Source Serif | Archivo Black | Documentary, typewriter |
| 6 | Inter | Helvetica Neue | Broadcast, clean |
| 7 | Inter | Inter | Digital, accessible |

---

*This typography system serves historical documentation with appropriate gravity. See ERA-GUIDE.md for full visual treatments per period.*

