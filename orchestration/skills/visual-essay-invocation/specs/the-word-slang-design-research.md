# DESIGN RESEARCH REPORT: The Word "Slang"

**Created**: December 2024
**Status**: Approved (Gate 4)

---

## Visual Archaeology

### Subject Matter Analysis

The word "slang" carries inherent visual tensions:
- **Margin vs. Center**: Language of outsiders entering mainstream discourse
- **Secrecy vs. Documentation**: Hidden vocabulary being catalogued
- **Ephemeral vs. Permanent**: Fleeting speech captured in permanent dictionaries
- **Handmade vs. Typeset**: Oral origins becoming printed matter

### Historical Visual Materials

| Era | Primary Visual Sources | Character |
|-----|----------------------|-----------|
| 1740s–1780s | Hogarth prints, broadside ballads, tavern scenes | Dark, candlelit, crowded, dangerous |
| 1785–1860 | Dictionary title pages, engraved portraits | Neoclassical formality with subversive content |
| 1860–1911 | Victorian encyclopedias, scholarly portraits | High contrast, institutional, authoritative |
| 1919–1950s | American journalism, Baltimore streets | Documentary, energetic, urban |
| 1960s–1990s | University campuses, textbooks | Clean, systematic, academic |
| 1999–present | Digital interfaces, social media | Bright, flat, interface-driven |

---

## Color Palette Derivation

### Rationale
Colors derived from the materials themselves: aged paper, printer's ink, candlelight, and digital screens.

### Primary Palette

| Color | Hex | Source | Usage |
|-------|-----|--------|-------|
| **Scoundrel's Ink** | `#1a1a1a` | Printer's black | Primary text, headlines |
| **Aged Vellum** | `#f5f0e6` | 18th-century paper | Background, Era 1–3 |
| **Candlelight** | `#c9a227` | Tallow candle glow | Accents, Era 1 highlights |
| **Dictionary Red** | `#8b2332` | Traditional dictionary markers | Key terms, citations |
| **Newsprint Cream** | `#faf8f0` | American newspapers | Background, Era 4 |
| **Interface Blue** | `#2563eb` | Hyperlink convention | Era 6, digital elements |

### Era-Specific Accent Colors

| Era | Accent | Hex | Rationale |
|-----|--------|-----|-----------|
| Criminal Underground | Tallow Gold | `#c9a227` | Candlelight in dark taverns |
| Lexicographic Dawn | Sealing Wax | `#8b2332` | Formal documents |
| Victorian | Pure Black | `#000000` | Authority, propriety |
| American | Printer's Red | `#cc3333` | Mencken's combative journalism |
| Academic | Muted Teal | `#2d6a6a` | Scholarly restraint |
| Digital | Electric Blue | `#2563eb` | Hyperlinks, interfaces |

---

## Typography Research

### Historical Type Analysis

**1740s–1780s Context**:
- Printing dominated by Caslon (William Caslon, 1722)
- Blackletter still used for warnings, broadsides
- Irregular setting, mixed sizes from limited type cases
- **Selected**: Caslon for body; Blackletter display for underworld atmosphere

**1785–1860 Context**:
- Didone revolution (Bodoni, Didot) bringing neoclassical elegance
- Grose's title page uses period conventions satirically
- **Selected**: Bodoni/Didot for headlines; Baskerville for body

**1860–1911 Context**:
- Industrial slab-serifs (Clarendon, 1845)
- Encyclopedia typography: dense, columned, ruled
- **Selected**: Clarendon for display; transitional serifs for body

**1919–1950s Context**:
- American Typewriter emerging
- News Gothic, Franklin Gothic for journalism
- More open, democratic layouts
- **Selected**: American Typewriter or Courier for display; News Gothic for navigation

**1960s–1990s Context**:
- Humanist sans-serifs (Gill Sans, Frutiger, Meta)
- Academic publishing conventions
- **Selected**: FF Meta or similar for contemporary scholarly feel

**1999–Present Context**:
- System fonts (San Francisco, Segoe, Roboto)
- Variable fonts, interface patterns
- **Selected**: Inter or Space Grotesk for digital-native sections

### Typography Palette (Web-Safe Alternatives)

```
DISPLAY HIERARCHY
Era 1–2: EB Garamond + Playfair Display
Era 3: Libre Baskerville + Roboto Slab
Era 4: Special Elite + Oswald
Era 5–6: Inter + Space Grotesk

BODY TEXT
Libre Baskerville or Lora (transitional serif, web-optimized)

CAPTIONS/CITATIONS
Source Sans Pro or body face at smaller weight

MONOSPACE
JetBrains Mono or IBM Plex Mono
```

---

## Animation Philosophy

### Core Principles

**1. Archival Reverence**
Motion should feel like handling old documents: careful, deliberate, respectful. No flashy transitions.

**2. Typography as Action**
The primary animations involve text: appearing letter-by-letter, sliding into dictionary columns, stamping dates.

**3. Era-Appropriate Speed**
- Early eras: Slower reveals (0.8–1.2s)
- Modern eras: Quicker transitions (0.3–0.5s)
- Digital era: Near-instant, interface-like

**4. Paper as Metaphor**
Transitions between eras use paper texture shifts—yellowed vellum to clean newsprint to flat digital white.

### Animation Specifications

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Quote reveal | 1.5s | ease-out | Scroll into view |
| Date stamp | 0.4s | cubic-bezier(.17,.67,.83,.67) | Sequence trigger |
| Era transition | 0.8s | ease-in-out | Section change |
| Figure fade-in | 0.6s | ease | Scroll 30% visible |
| Timeline scrub | Real-time | linear | User interaction |
| Digital counter | 2s | ease-out | Scroll lock |

---

## Visual Motifs

### Primary Motif: The Dictionary Entry

The visual essay structured as a dictionary entry being written:
- Progress bar = entry line filling with text
- Sections = definition components (etymology, usage, quotes)
- Conclusion = complete entry

### Secondary Motifs

**1. The Margin**
Visual elements positioned at literal margins—gutter notes, marginalia style—reinforcing the theme of slang as marginal language.

**2. The Redacted/Revealed**
Certain text appears "censored" then revealed on scroll, echoing Victorian propriety vs. underworld vocabulary.

**3. Mismatched Type**
Title treatment uses intentionally mismatched letterforms (different faces, sizes) suggesting slang's irregular origins.

### Texture Library

| Texture | Application | Era |
|---------|-------------|-----|
| Aged vellum grain | Background | 1–2 |
| Letterpress impression | Text shadows | 1–3 |
| Foxing/spots | Archival images | 1–3 |
| Newsprint halftone | Photography | 4 |
| Clean matte | Academic | 5 |
| Flat digital | Interface | 6 |

---

## Uniqueness Verification

- [x] Color palette derived from subject materials (paper, ink, candlelight)
- [x] Typography justified by historical research (each era documented)
- [x] Animation philosophy matches subject nature (archival, textual)
- [x] Visual motifs unique to this essay's thesis (dictionary entry, margins)
- [x] No patterns copied from existing essays
- [x] Design decisions traceable to research

---

## Implementation CSS Variables

```css
:root {
  /* Primary Colors */
  --slang-ink: #1a1a1a;
  --slang-vellum: #f5f0e6;
  --slang-candlelight: #c9a227;
  --slang-dictionary-red: #8b2332;
  --slang-newsprint: #faf8f0;
  --slang-interface-blue: #2563eb;

  /* Era Accents */
  --era-1-accent: #c9a227;
  --era-2-accent: #8b2332;
  --era-3-accent: #000000;
  --era-4-accent: #cc3333;
  --era-5-accent: #2d6a6a;
  --era-6-accent: #2563eb;

  /* Animation Timing */
  --transition-slow: 1.2s;
  --transition-medium: 0.8s;
  --transition-fast: 0.4s;
  --transition-instant: 0.2s;

  /* Typography Scale */
  --font-display: 'Playfair Display', 'EB Garamond', Georgia, serif;
  --font-body: 'Libre Baskerville', 'Lora', Georgia, serif;
  --font-ui: 'Inter', 'Space Grotesk', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'IBM Plex Mono', monospace;
}
```

---

## Gate 4 Certification

**Status**: APPROVED

All design decisions derived from subject matter research. Visual identity is unique to this essay and not copied from existing implementations.
