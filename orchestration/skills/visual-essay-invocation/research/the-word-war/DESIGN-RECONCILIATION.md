# Design Reconciliation Report: The Word War

> **For**: Visual Essay Orchestrator
> **From**: Design Research Reconciliation Agent
> **Date**: January 3, 2026
> **Status**: Three-Phase Audit Complete

---

## Executive Summary

The design research for "The Word War" etymology visual essay has passed all three phases of reconciliation. The design system is historically authentic, novel within the Esy ecosystem, and fully implementable in CSS.

**Overall Reconciliation Status: PASS**

---

## Phase 1: Thematic Authenticity Audit

### Color Palette Verification

| Color | Claimed Source | Verification Status | Notes |
|-------|----------------|---------------------|-------|
| **Merovingian Garnet #830E0D** | Frankish cloisonne (Childeric I tomb) | VERIFIED | Childeric I's tomb (discovered 1653) contained 300 golden bees/cicadas with garnet cloisonne wings. Garnets from India/Sri Lanka were signature of Merovingian royal graves. The deep red-brown is consistent with pyrope and rhodolite garnets found in archaeological analysis. |
| **Bayeux Terracotta #B5542A** | Bayeux Tapestry madder dye | VERIFIED | Laboratory analysis (LAMS 2022) confirmed madder dye produced terracotta reds in the tapestry. The tapestry contains 14 documented colors including terracotta reds. |
| **Tapestry Blue-Green #3A6B5C** | Bayeux Tapestry woad dye | VERIFIED | Woad-based indigotine produced blue-green tones. Analysis describes the medium blue as "really more of a turquoise or a dark teal blue-green color" when dyed with copper mordant. |
| **Peterborough Parchment #F2E8D5** | MS Laud Misc. 636 | VERIFIED | The Peterborough Chronicle (MS Laud Misc. 636) is a 12th-century manuscript on parchment, 24 x 16.8 cm. Warm cream with slight yellow undertone is accurate for aged vellum. |
| **Chronicle Ink #1E1915** | Iron gall ink | VERIFIED | Iron gall ink was the standard ink formulation in Europe from 5th-19th centuries. Fresh ink oxidizes to blue-black; the dark tone is consistent with well-preserved iron gall ink. |
| **Aged Iron Gall #584B40** | Oxidized iron gall | VERIFIED | Iron gall ink oxidizes over time, with iron ions (Fe2+) converting to (Fe3+), causing fading to reddish-brown tones. This is well-documented in conservation literature. |
| **Frankish Gold #C9A030** | Merovingian gold leaf / Carolingian manuscripts | VERIFIED | The Drogo Sacramentary (c.850) used "luminous gold ink" and gold leaf extensively. The Metz school under Archbishop Drogo (823-855) was known for gold-dominated aesthetics. |

**Color Palette Status: 7/7 VERIFIED**

---

### Typography Verification

| Typeface | Claimed Feature | Verification Status | Notes |
|----------|-----------------|---------------------|-------|
| **Cormorant Garamond** | Based on Claude Garamond's 16th-century designs | VERIFIED | Designed by Christian Thalmann, "inspired by the sixteenth century types of Claude Garamond." Designed as a display face with historical Garamond heritage. |
| **EB Garamond** | IPA support + manuscript heritage | VERIFIED | EB Garamond includes 3,218 glyphs including full IPA support. Based on the 1592 Berner specimen showing Garamond's roman and Granjon's italic. Direct lineage from 16th-century printing via Plantin-Moretus preserved punches. |
| **Junicode** | Old English characters (wyn, thorn, eth) | VERIFIED | Junicode explicitly designed for medievalists. Supports thorn, eth, and wyn. MUFI v4.0 compliant. Contains 3002+ characters in regular style. Provides Nordic shapes of thorn and eth via OpenType Stylistic Set 1. |

**Typography Status: 3/3 VERIFIED**

---

### Visual Motif Verification

| Motif | Claimed Source | Verification Status | Notes |
|-------|----------------|---------------------|-------|
| **Palimpsest** | Medieval manuscript recycling | VERIFIED | Palimpsests are well-documented. Parchment was scraped with pumice or washed with milk and oat bran. Famous examples: Archimedes Palimpsest (10th c.), Codex Ephraemi Rescriptus (5th c.). A synodal decree of 691 CE forbade destruction of scripture manuscripts, evidence of widespread practice. |
| **Norman Chevron** | Norman Romanesque architecture | VERIFIED | The chevron (zigzag) pattern is "the most distinctive decorative element in 11th century Norman architecture." Durham Cathedral (1093-1128) is "covered in zigzags." The pattern appears on arch mouldings and in Bayeux Tapestry borders. |
| **Cloisonne** | Merovingian metalwork technique | VERIFIED | Cloisonne uses thin gold strips (cloisons) to create cells filled with garnets or enamel. Technique documented in Childeric I tomb treasures (481 CE). Garnets sourced from India/Sri Lanka and Bohemia. |
| **Wax Seals** | Anglo-Norman document culture | VERIFIED | Edward the Confessor used a "Great Seal" before 1066. Medieval seals used beeswax with vermillion (red) for royal documents and verdigris (green) for Exchequer/court documents. National Archives holds 250,000+ seals from 11th-20th centuries. |
| **Bayeux Border Beasts** | Bayeux Tapestry decorative borders | VERIFIED | Upper and lower borders contain "birds, beasts, fish and scenes from fables, agriculture, and hunting." Four Aesop's Fables identified: Fox and Crow, Wolf and Crane, Wolf and Kid, Wolf and Lamb. |
| **Chronicle Rubrication** | Peterborough Chronicle red ink | VERIFIED | MS Laud Misc. 636 features "decorated initial B on folio 1r" and "rubrication of annal numbers and large capitals." Red ink for dates and majuscules is documented. |
| **Etymology River (T-O Map)** | Medieval T-O maps | PARTIAL | T-O maps are well-documented (Isidore of Seville's Etymologies). East/Paradise at top is accurate. The conceptual mapping of etymology to geography is original interpretation but historically grounded. |

**Motif Status: 6/7 VERIFIED, 1/7 PARTIAL**

---

### Phase 1 Summary

**Thematic Authenticity Score: PASS**

All 7 colors are verified against historical sources. All 3 typography choices are verified. 6 of 7 motifs are fully verified; the Etymology River is a creative interpretation with historical grounding but not a direct reproduction.

**Corrections Needed: None required. The T-O map interpretation is conceptually sound.**

---

## Phase 2: Cross-Essay Novelty Audit

### Existing Essays Examined

| Essay | Design System | Potential Overlap |
|-------|---------------|-------------------|
| **the-word-robot** | Brutalist industrial (void black, chrome, copper) | None - completely different era/aesthetic |
| **the-word-han** | East Asian calligraphy (ink night #0A0A0C, imperial red #B8202D, royal blue #1E3F66) | Minor - both use serif display fonts, but Han uses CJK-focused fonts |
| **the-word-slang** | Era-based typographic evolution (candlelight yellow, sealing wax red) | Minor - both are etymology essays, but Slang is 18th-20th century focused |
| **the-printing-press** | Medieval/Renaissance printing (burgundy #8B1538, manuscript gold #D4A574) | Moderate - overlapping era, both use gold tones |
| **the-history-of-pizza** | Food/culinary (oven black, tomato red, mozzarella white) | None - completely different subject matter |
| **the-holocaust** | Memorial (void black, memorial gold #C9A227, cream) | Minor - both use gold accents on dark backgrounds |

### Collision Analysis

#### Color Palette Collisions

| Word War Color | Similar Colors in Other Essays | Severity |
|----------------|-------------------------------|----------|
| Merovingian Garnet #830E0D | No direct match. Different from Han Imperial Red (#B8202D), Slang Sealing Wax (#8B2332), Holocaust Warning (#8B0000) | UNIQUE |
| Bayeux Terracotta #B5542A | Different from Pizza Tomato Red (#C24D37), Robot Copper (#B87333) | UNIQUE |
| Tapestry Blue-Green #3A6B5C | Han Jade (#5D9B79) is similar family but distinct hue | MINOR OVERLAP |
| Peterborough Parchment #F2E8D5 | Similar to Han Paper (#FDF5E6), Holocaust Cream (#F5E6C8), Slang Vellum (#f5f0e6) | ACCEPTABLE (background neutrals) |
| Chronicle Ink #1E1915 | Similar to Robot Void Black (#050507), Holocaust Void (#0A0A0A) | ACCEPTABLE (text colors) |
| Aged Iron Gall #584B40 | No direct match | UNIQUE |
| Frankish Gold #C9A030 | Printing Press Gold (#D4A574), Holocaust Gold (#C9A227), Han Gold (#C9A83E) | MODERATE OVERLAP |

#### Typography Collisions

| Word War Font | Other Essay Usage | Severity |
|---------------|-------------------|----------|
| Cormorant Garamond | Han uses Cormorant Garamond for display; Printing Press uses for quotes | MODERATE OVERLAP |
| EB Garamond | Not used as primary in examined essays | UNIQUE |
| Junicode | Not used in any examined essay | UNIQUE |

#### Motif Collisions

| Word War Motif | Similar Motifs Elsewhere | Severity |
|----------------|--------------------------|----------|
| Palimpsest ghost text | None found | UNIQUE |
| Norman chevron borders | None found | UNIQUE |
| Cloisonne cell containers | None found | UNIQUE |
| Wax seal icons | None found | UNIQUE |
| Bayeux border beasts | None found | UNIQUE |
| Chronicle rubrication | None found | UNIQUE |
| Etymology river diagram | None found | UNIQUE |

### Phase 2 Summary

**Novelty Score: MOSTLY UNIQUE**

**Differentiation Analysis:**

1. **Primary Palette is Unique**: The Merovingian Garnet + Bayeux Terracotta + Tapestry Blue-Green combination does not exist in any other Esy essay. The progression from red to terracotta to blue-green is word-specific.

2. **Gold Overlap is Acceptable**: While gold tones appear in other essays, each uses gold differently:
   - Holocaust: Memorial candle glow
   - Printing Press: Manuscript illumination
   - Han: East Asian seal/jade aesthetic
   - Word War: Frankish metalwork/Carolingian manuscripts

   The *meaning* of gold differs in each essay.

3. **Cormorant Garamond Overlap**: Both Han and Printing Press use Cormorant Garamond. However:
   - Han pairs it with CJK fonts (Source Han Serif)
   - Printing Press uses it for quotes only
   - Word War uses it for display titles and word transformation
   - The *typographic journey* (Junicode -> Cormorant -> EB Garamond) is unique

4. **All 7 Motifs are Novel**: No other essay uses palimpsest, chevron borders, cloisonne cells, wax seals, border beasts, or rubrication effects.

**Collision Status: ACCEPTABLE - No critical collisions**

---

## Phase 3: CSS Implementation Verification

### Color Variables

| Requirement | Status | Notes |
|-------------|--------|-------|
| All colors have valid hex codes | COMPLETE | All 7 colors specified with valid 6-digit hex |
| CSS custom properties defined | COMPLETE | Full `:root` block provided in design research |
| Accessibility contrast ratios | COMPLETE | WCAG AA/AAA ratios provided for all combinations |

**Provided CSS:**
```css
:root {
  --merovingian-garnet: #830E0D;
  --bayeux-terracotta: #B5542A;
  --tapestry-blue-green: #3A6B5C;
  --peterborough-parchment: #F2E8D5;
  --chronicle-ink: #1E1915;
  --aged-iron-gall: #584B40;
  --frankish-gold: #C9A030;
}
```

### Font Families

| Requirement | Status | Notes |
|-------------|--------|-------|
| Google Fonts availability | COMPLETE | Cormorant Garamond and EB Garamond on Google Fonts |
| Self-hosted fonts identified | COMPLETE | Junicode noted for local hosting |
| Font loading strategy | COMPLETE | `preconnect` and `font-display: swap` specified |
| Fallback stacks | COMPLETE | Georgia serif fallbacks provided |

**Provided CSS:**
```css
:root {
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'EB Garamond', Georgia, serif;
  --font-medieval: 'Junicode', 'EB Garamond', serif;
}
```

### Type Scale

| Requirement | Status | Notes |
|-------------|--------|-------|
| Desktop sizes specified | COMPLETE | H1: 56px, H2: 36px, H3: 24px, Body: 19px |
| Mobile sizes specified | COMPLETE | H1: 40px, H2: 28px, H3: 22px, Body: 17px |
| Line heights specified | COMPLETE | H1: 1.05, H2: 1.15, H3: 1.25, Body: 1.75 |
| Ratio documented | COMPLETE | 1.333 (perfect fourth) |

### Spacing Scale

| Requirement | Status | Notes |
|-------------|--------|-------|
| Spacing tokens defined | COMPLETE | Line: 32px, Paragraph: 24px, Section: 96px, Module: 128px |
| Grid system documented | COMPLETE | 680px content, 280px marginalia, 120px margins |
| Baseline grid | COMPLETE | 32px baseline (19px text x 1.75 line-height) |

**Provided CSS:**
```css
:root {
  --space-line: 32px;
  --space-paragraph: 24px;
  --space-section: 96px;
  --space-module: 128px;
}
```

### Animation Timings

| Requirement | Status | Notes |
|-------------|--------|-------|
| Duration tokens | COMPLETE | Text reveal: 600ms, Node connection: 1000ms, Color transition: 800ms, Hero transform: 800ms, Ghost fade: 1200ms, Border draw: 1500ms |
| Easing functions | COMPLETE | Specified per animation type (ease-out, ease-in-out, linear) |
| Era-specific variations | COMPLETE | Frankish: 400-600ms, Norman: 600-800ms, English: 800-1200ms |
| Reduced motion | COMPLETE | `prefers-reduced-motion` handling specified |

### Motif Implementation Notes

| Motif | CSS Approach | Status |
|-------|--------------|--------|
| Palimpsest ghost | Absolute positioning, opacity: 0.15, z-index: -1 | COMPLETE |
| Chevron border | SVG pattern with userSpaceOnUse | COMPLETE |
| Cloisonne cells | Border: 1px solid gold, border-radius: 3px, rgba backgrounds | COMPLETE |
| Wax seals | Not fully specified | NEEDS ADDITION |
| Border beasts | Not fully specified | NEEDS ADDITION |
| Rubrication | Inline color styling | COMPLETE |

### Implementation Checklist

- [x] Color variables defined
- [x] Font families defined with fallbacks
- [x] Type scale defined (desktop + mobile)
- [x] Line heights defined
- [x] Spacing scale defined
- [x] Animation timings defined
- [x] Easing functions documented
- [x] Accessibility (contrast, reduced motion)
- [x] Palimpsest CSS provided
- [x] Chevron SVG pattern provided
- [x] Cloisonne cell CSS provided
- [ ] Wax seal icon specification (needs addition)
- [ ] Border beast SVG assets (needs addition)

### Phase 3 Summary

**CSS Implementation Score: PASS (with minor additions needed)**

All critical CSS specifications are present. Two decorative motifs (wax seals, border beasts) need additional specification but are not blocking for implementation.

---

## Overall Reconciliation Status

### Summary Table

| Phase | Status | Score |
|-------|--------|-------|
| Phase 1: Thematic Authenticity | PASS | 16/17 verified (94%) |
| Phase 2: Cross-Essay Novelty | PASS | MOSTLY UNIQUE |
| Phase 3: CSS Implementation | PASS | 11/13 items complete (85%) |

### Final Status: **PASS**

The design research for "The Word War" etymology visual essay is approved for implementation.

---

## Recommendations

### For Implementation

1. **Proceed with implementation** - All critical elements are verified and novel.

2. **Junicode font hosting** - Download and self-host Junicode for reliable medieval character support. Do not rely on CDN for this specialized font.

3. **Gold differentiation** - While the gold tone is similar to other essays, ensure the *usage context* (Frankish metalwork, Carolingian manuscripts) is visually distinct through cloisonne cell styling.

### Minor Additions Needed

1. **Wax Seal Icon** - Add SVG specification for the wax seal section marker. Suggest:
   - Red fill (#830E0D) for conflict sections
   - Green fill (#3A6B5C) for administrative sections
   - Stylized "W" letterform inside

2. **Border Beast Assets** - Add SVG specifications for the Bayeux-inspired decorative creatures. These should be:
   - Flat/stylized (not realistic)
   - Rendered in Tapestry Blue-Green (#3A6B5C)
   - Used sparingly in Norman-era sections only

3. **Etymology River Diagram** - The T-O map visualization concept needs detailed visual specification. Consider collaborating with a diagram designer to finalize the geographic-etymology mapping.

### No Changes Required To

- Color palette (all 7 colors verified)
- Typography system (all fonts verified and available)
- Spacing system (fully specified)
- Animation timings (comprehensive)
- Palimpsest effect (CSS provided)
- Chevron borders (SVG pattern provided)
- Cloisonne cells (CSS provided)

---

## Sources Consulted for Verification

### Merovingian Artifacts
- [Napoleon and the Bees: Childeric I Tomb](https://www.hhantiquejewelry.com/napoleon-bees-jewelry-tomb-childeric-i-symbols-empire/)
- [Childeric I - Wikipedia](https://en.wikipedia.org/wiki/Childeric_I)
- [Mineralogy of Merovingian Garnet Cloisonne](http://www.minsocam.org/msa/ammin/toc/Articles_Free/1998/Farges_p323-330_98.pdf)

### Bayeux Tapestry
- [The Colours of the Bayeux Tapestry - The Mulberry Dyer](https://mulberrydyer.com/shop/the-colours-of-the-bayeux-tapestry/)
- [Bayeux Tapestry - Wikipedia](https://en.wikipedia.org/wiki/Bayeux_Tapestry)
- [Animals in Medieval Art: The Bayeux Tapestry](https://www.sciencedirect.com/science/article/abs/pii/030441858790042X)

### Peterborough Chronicle
- [MS. Laud Misc. 636 - Medieval Manuscripts](https://medieval.bodleian.ox.ac.uk/catalog/manuscript_7423)
- [Peterborough Chronicle - Wikipedia](https://en.wikipedia.org/wiki/Peterborough_Chronicle)

### Iron Gall Ink
- [Iron Gall Ink - Wikipedia](https://en.wikipedia.org/wiki/Iron_gall_ink)
- [Iron Gall Ink - IFLA](https://www.ifla.org/iron-gall-ink/)

### Carolingian Manuscripts
- [Drogo Sacramentary - Ziereis Facsimiles](https://www.facsimiles.com/facsimiles/drogo-sacramentary)
- [Carolingian Illumination - Wikipedia](https://en.wikipedia.org/wiki/Carolingian_illumination)

### Typography
- [Cormorant Garamond - Google Fonts](https://fonts.google.com/specimen/Cormorant+Garamond)
- [EB Garamond - Google Fonts](https://fonts.google.com/specimen/EB+Garamond)
- [Junicode Font Manual](https://mirrors.mit.edu/CTAN/fonts/junicodevf/doc/JunicodeManual.pdf)

### Palimpsests
- [Palimpsests - British Library](https://blogs.bl.uk/digitisedmanuscripts/2016/09/palimpsests-the-art-of-medieval-recycling.html)
- [Archimedes Palimpsest](https://archimedespalimpsest.org/about/)

### Norman Architecture
- [Norman Architecture - Wikipedia](https://en.wikipedia.org/wiki/Norman_architecture)
- [Durham Cathedral - Durham World Heritage Site](https://www.durhamworldheritagesite.com/learn/architecture/romanesque)

### Anglo-Norman Seals
- [Medieval Seals - The National Archives](https://www.nationalarchives.gov.uk/education/resources/medieval-seals/)
- [Great Seal of the Realm - Wikipedia](https://en.wikipedia.org/wiki/Great_Seal_of_the_Realm)

---

*Reconciliation Report prepared by Design Research Reconciliation Agent*
*January 3, 2026*
*Status: PASS - Ready for Implementation*
