# Data Visualizations: Specifications

## ⚠️ Content Advisory

This document specifies data visualizations for a documentary essay on a racial slur. All visualizations serve scholarly analysis.

---

## Required Visualizations (Minimum 4)

The master prompt requires at least four data visualizations. This document specifies each with data sources, methodology, and visual design.

---

## Visualization 1: Timeline Band Chart

### Title
"The Weight of a Word: Public Usage Intensity Across Eras"

### What It Shows
Intensity of normalized public usage of the term across historical eras, based on corpus analysis of newspapers and books.

### Data Sources

**Primary**:
- Google Books Ngram Viewer (1500–2019)
- Chronicling America (1770–1963)
- ProQuest Historical Newspapers

**Methodology**:
1. Query Google Ngram for relative frequency
2. Sample Chronicling America by decade for headline/article counts
3. Normalize data to show relative intensity, not raw counts

### Visual Design

**Format**: Horizontal band chart with time on X-axis, intensity on Y-axis

**Era Bands**:
| Era | Years | Expected Intensity | Color |
|-----|-------|-------------------|-------|
| Early Modern | 1500–1700 | Low (rare attestation) | #F5E6C8 |
| Colonial | 1700–1800 | Rising | #C5A572 |
| Antebellum | 1800–1865 | High | #8B3A3A |
| Jim Crow | 1865–1954 | Peak | #CC0000 |
| Civil Rights | 1954–1970s | Declining | #B22222 |
| Late 20th c. | 1970s–2000 | Sharp decline | #4A4A4A |
| Contemporary | 2000–Present | Very low (public usage) | #1A1A1A |

**Annotations (overlay on chart)**:
- 1830: Minstrelsy emerges
- 1857: Dred Scott decision
- 1896: Plessy v. Ferguson
- 1954: Brown v. Board
- 1964: Civil Rights Act
- 1980s: "N-word" euphemism rises

**Note**: Intensity refers to *normalized public usage* (newspapers, books, public speech). Does not measure intra-community use or private speech.

### Caption
"This chart shows the relative frequency of the term in American newspapers and books over four centuries. Peak usage coincides with Jim Crow era. The sharp decline after the Civil Rights movement reflects changing public norms—not the elimination of racist language."

### Alt Text
"Timeline band chart showing intensity of the N-word's public usage from 1500 to present. Usage rises through colonial period, peaks during Jim Crow era (1880s-1950s), and declines sharply after Civil Rights movement. Key events annotated along timeline."

---

## Visualization 2: Diffusion Map

### Title
"From Latin to Global: How the Word Traveled"

### What It Shows
Geographic spread of the term from Latin origins through colonial trade routes to contemporary global reach.

### Data Sources

**Primary**:
- Historical linguistics scholarship
- Oxford English Dictionary etymology
- Transatlantic slave trade route documentation

**Methodology**:
- Trace etymological pathway (Latin → Romance → English)
- Overlay slave trade routes
- Mark colonial language spread nodes

### Visual Design

**Format**: Animated map with layered historical information

**Phase 1: Etymology (1500s)**
- Latin origin (Rome/Italy) → Spain/Portugal → France
- Markers: *niger* → *negro* → *nègre*

**Phase 2: Colonial Spread (1600s–1800s)**
- Transatlantic slave trade routes
- Major ports: Lisbon, Liverpool, Charleston, New Orleans
- Colonial administration centers
- Arrows showing movement of enslaved people AND language

**Phase 3: American Entrenchment (1800s–1900s)**
- Concentration in American South
- Minstrelsy spreads via theater circuits
- Media networks (newspapers, later radio/TV)

**Phase 4: Contemporary (1900s–Present)**
- Hollywood/media global reach
- Hip-hop cultural export
- Note: Local cognates and histories vary

**Color System**:
- Etymology arrows: #704214 (sepia)
- Slave trade routes: #CC0000 (blood red)
- Media spread: #0047AB (broadcast blue)
- Contemporary: #0066CC (digital blue)

### Annotations
- "1574: First English attestation"
- "1619: First enslaved Africans to Virginia"
- "1830s: Minstrelsy begins"
- "1915: Birth of a Nation global"
- "1988: N.W.A.'s Straight Outta Compton"

### Caption
"The word traveled the same routes as enslaved human beings—from Latin roots through Romance languages to English, then across the Atlantic with the slave trade. Later, American media exported the term globally."

### Alt Text
"World map showing the spread of the N-word from Latin origins in Rome, through Spain and Portugal, across the Atlantic via slave trade routes, concentrating in the American South, then spreading globally through media."

---

## Visualization 3: Dictionary Definition Changelog

### Title
"How Dictionaries Learned to Condemn"

### What It Shows
Evolution of dictionary definitions and usage labels from first entries to present.

### Data Sources

**Primary**:
- Oxford English Dictionary (all editions)
- Webster's dictionaries (1828, 1934, 1961, current)
- Merriam-Webster current

**Methodology**:
- Extract key phrases from each definition
- Note usage labels chronologically
- Show evolution of labeling practice

### Visual Design

**Format**: Vertical timeline with definition cards

**Structure**: Each card shows:
```
┌─────────────────────────────────────────┐
│ [Year] [Dictionary Name]                │
├─────────────────────────────────────────┤
│ Definition: "[Key phrase]"              │
│ Label: [Usage label or "none"]          │
├─────────────────────────────────────────┤
│ [Significance note]                     │
└─────────────────────────────────────────┘
```

**Timeline Entries**:

| Year | Dictionary | Definition Key | Label | Visual Treatment |
|------|------------|----------------|-------|------------------|
| 1755 | Johnson | (No entry) | — | Gray, absent |
| 1828 | Webster | (No entry) | — | Gray, absent |
| 1889 | OED 1st | "A Negro" | "Usually contemptuous" | Yellow warning |
| 1934 | Webster's 2nd | "A Negro" | "vulgar" | Orange warning |
| 1961 | Webster's 3rd | "NEGRO" | "usually offensive" | Orange-red |
| 1989 | OED 2nd | Expanded | "contemptuous" | Red |
| 2023 | OED/MW | Full context | "most offensive word in English" | Deep red |

**Color Progression**:
- Absence: #CCCCCC
- First entry: #F5E6C8
- "Contemptuous": #DAA520
- "Offensive": #CC6600
- "Most offensive": #8B0000

### Caption
"Dictionary treatment evolved from absence to acknowledgment to full condemnation. Early dictionaries excluded the term as 'vulgar.' Today's entries include extensive usage notes explaining its harm."

### Alt Text
"Vertical timeline showing dictionary definition evolution from 1755 to 2023. Early dictionaries had no entry. First OED entry in 1889 notes 'usually contemptuous.' Modern entries describe it as 'one of the most offensive words in English.'"

---

## Visualization 4: Corpus Frequency Trend

### Title
"The Rise and Fall of a Slur in Print"

### What It Shows
Frequency of the term in published books and newspapers over time, with historical events annotated.

### Data Sources

**Primary**:
- Google Books Ngram Viewer (most reliable for books)
- Chronicling America (newspapers, 1789-1963)

**Methodology**:
1. Download Ngram data for [term] (case-insensitive)
2. Smooth data for readability (3-year moving average)
3. Overlay significant historical events

### Visual Design

**Format**: Line graph with event annotations

**X-axis**: Year (1800–2019 recommended range)
**Y-axis**: Relative frequency (percentage of corpus)

**Line styling**:
- Thick line (#1A1A1A) for frequency
- Confidence band (light gray) if available

**Event Markers** (vertical lines with labels):
| Year | Event | Label Style |
|------|-------|-------------|
| 1830 | Minstrelsy begins | Dashed gray |
| 1852 | Uncle Tom's Cabin | Solid |
| 1857 | Dred Scott | Solid red |
| 1863 | Emancipation | Solid |
| 1896 | Plessy | Solid |
| 1954 | Brown v. Board | Solid |
| 1964 | Civil Rights Act | Solid green |
| 1985 | N.W.A. forms | Solid |

**Key observations to highlight**:
1. Rise through 19th century
2. Peak around 1920s-1930s
3. Decline after 1960s (public printed usage)
4. Possible plateau or different pattern post-1980s (hip-hop)

### Caption
"Frequency of the term in American books (1800-2019). Usage rose steadily through the 19th century, peaked during the Jim Crow era, and declined after the Civil Rights movement. The pattern in books reflects changing norms in *published, public* language. Source: Google Books Ngram Viewer."

### Alt Text
"Line graph showing frequency of the N-word in American books from 1800 to 2019. Line rises from 1800, peaks around 1920-1940, then declines sharply after 1960. Historical events are marked: Dred Scott (1857), Plessy (1896), Brown v. Board (1954), Civil Rights Act (1964)."

---

## Optional Visualization 5: Context Word Cloud

### Title
"Neighboring Words: How Context Shifted Across Eras"

### What It Shows
Words that commonly appeared near the term in different historical periods—showing how its context shifted.

### Data Sources
- Chronicling America searchable archive
- Google Books corpus
- Scholarly corpus linguistics databases

### Methodology
1. Sample text from three eras (1850s, 1920s, 1980s)
2. Extract words appearing within 10-word window
3. Filter stop words
4. Rank by frequency

### Visual Design

**Format**: Three word clouds, side by side

| Era | Expected prominent words |
|-----|-------------------------|
| 1850s | slave, Negro, master, property, cotton |
| 1920s | Jim Crow, lynch, colored, segregation |
| 1980s | rap, music, culture, controversy |

**Color by sentiment**:
- Neutral context words: #666666
- Legal/commercial: #000080
- Violence-related: #8B0000
- Cultural reclamation: #2E8B57

### Caption
"The words surrounding the term changed dramatically across eras—from the commercial language of slavery to the violence of Jim Crow to contemporary cultural debates."

---

## Optional Visualization 6: Legal Document Frequency

### Title
"The Word in Court"

### What It Shows
Frequency of the term appearing in legal documents, court cases, and legislation.

### Data Sources
- Westlaw/LexisNexis (if accessible)
- Supreme Court case database
- State court records

### Methodology
- Count appearances by decade
- Note context (quoted, discussed, or operative language)

### Visual Design
Bar chart by decade showing legal document appearances

---

## Visualization Guidelines

### Accessibility
- All charts must have high-contrast versions
- Screen reader-friendly data tables as alternatives
- Color not sole conveyor of information

### Mobile Adaptation
- Simplified views for small screens
- Scroll-driven reveal for timeline charts
- Touch-friendly interactive elements

### Animation
- Charts can build as user scrolls
- Annotations appear sequentially
- No animation required for understanding

### Source Attribution
Every visualization must include:
- Data source(s)
- Date range
- Methodology notes
- "Visualization created for Esy.com"

---

## Data Quality Notes

### Google Ngram Limitations
- OCR errors in early texts
- Changing corpus composition
- "Frequency" is relative, not absolute
- Spelling variants may require separate queries

### Newspaper Archive Limitations
- Chronicling America ends in 1963
- Regional coverage varies
- OCR quality varies by era

### Recommended Disclaimers
All visualizations should note:
> "This data reflects *published, public* usage and does not capture private speech, oral culture, or intra-community use."

---

*All visualizations require verification of data sources before implementation. See CITATIONS.md for source details.*

