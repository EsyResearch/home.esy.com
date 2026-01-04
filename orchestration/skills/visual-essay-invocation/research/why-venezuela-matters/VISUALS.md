# Visual Assets: Why Venezuela Matters

> Last Updated: January 3, 2026

## Visual Asset Philosophy

This essay prioritizes **custom SVG diagrams and maps** over photography due to:
1. Disinformation concerns (AI-generated capture images circulating)
2. Editorial constraints (no sensational/violence imagery)
3. Systems-first storytelling (processes > events)
4. Evergreen design (diagrams age better than news photos)

---

## Required Visual Modules

### Module A: "Venezuela in the Hemisphere" — SVG Map

**Type**: Interactive SVG map

**Layers**:
- **Layer 1 (Geography/Energy)**:
  - Venezuela country outline (highlighted)
  - Orinoco Belt region (dotted boundary)
  - Gulf Coast refineries (Texas/Louisiana markers)
  - Shipping lanes (dotted arrow paths)
  - Neighbors: Colombia, Guyana, Brazil, Caribbean

- **Layer 2 (Diplomacy/Reactions)**:
  - Color-coded country markers by reaction:
    - Condemn (red)
    - Support (green)
    - Cautious/Fact-finding (amber)
    - No clear position (gray)
  - Legend explaining positions

**Micro-interactions**:
- Hover: Highlight region/marker + 1-2 sentence tooltip
- Toggle: Switch between energy and diplomacy layers

**Data sources**:
- Geography: Public domain world map SVG
- Reactions: CITATIONS.md INT-1 through INT-10

**Caption**: Why geography, proximity, and chokepoints shape Venezuela's strategic importance

---

### Module B: "Heavy vs Light Crude" — SVG Diagram

**Type**: Explanatory technical diagram

**Content**:
- API gravity scale (vertical axis, 0-50+)
- Sulfur content indicator (sweet vs. sour)
- Light sweet zone (shale, Brent-like)
- Heavy sour zone (Venezuela, Canada oil sands)
- Refinery compatibility indicators

**Micro-interactions**:
- Toggle: "Light crude path" vs "Heavy crude path" highlights different refinery units
- Hover: Technical term definitions

**Data sources**:
- EIA crude type definitions
- EPRINC refinery analysis

---

### Module C: "Why the U.S. Imports Heavy Crude" — SVG System Diagram

**Type**: Flow diagram (left to right)

**Content**:
- **Left side**: U.S. shale production (light sweet)
  - Arrow: "Exports / Blending"

- **Right side**: Heavy crude sources
  - Venezuela (reduced)
  - Canada (primary)
  - Mexico (declining)
  - Arrow: "Gulf Coast Complex Refineries"

- **Center**: Gulf Coast refinery complex
  - Coker unit
  - Hydrocracker
  - Desulfurization

- **Output**: Diesel, jet fuel, petrochemicals

**Micro-interactions**:
- Hover on refinery units: Reveals function definition
- Click: Expands detail panel

**Data sources**:
- EIA PADD 3 import data
- S&P Global analysis
- Stillwater Associates

---

### Module D: "U.S. Production vs Crude-Type Mismatch" — SVG Chart

**Type**: Conceptual bar/area chart

**Content**:
- U.S. light crude production (growing band)
- U.S. heavy crude demand (stable band)
- Import dependency zone (gap between)
- Source breakdown (Canada, Venezuela, Mexico, Other)

**Treatment**:
- Use qualitative bands if precise data unavailable
- Include note: "Conceptual illustration; verify data series"

**Tooltip fields**:
- series_name
- year/month (or "qualitative")
- value + unit (or "conceptual band")
- source_name + link

**Data sources**:
- EIA production/import series
- EPRINC chart

---

### Module E: "From Chavez to Absolute Resolve" — Timeline Band

**Type**: Horizontal compressed timeline

**Content**:
- Pre-Chavez era (1970s-1999): Peak production context
- Chavez era (1999-2013): Nationalization, decline begins
- Maduro era (2013-2025): Collapse, sanctions, crisis
- 2019: Guaido recognition crisis
- 2020: DOJ indictments
- Jan 3, 2026: Operation Absolute Resolve (with "as-of" note)

**Verification markers**:
- ⚑ flag on any disputed dates
- "Developing" label on current events

**Micro-interactions**:
- Hover: Event detail popup
- Scroll: Advances through timeline

**Data sources**:
- TIMELINE.md
- Historical records

---

### Module F: "Markets: Why Short-Term Turbulence Often Fades" — SVG Chart

**Type**: Schematic conceptual chart

**Content**:
- X-axis: Time (generic)
- Y-axis: Volatility/Uncertainty
- Shape: Shock spike → oscillation → stabilization

**Toggle**:
- "Contained conflict" scenario: Returns to baseline
- "Escalation scenario": Longer volatility tail

**Caption**: "Under contained conflict assumptions, markets typically price in disruption quickly. Escalation changes the calculus."

**Treatment**:
- NOT precise price predictions
- Conceptual illustration only

---

### Module G: "Operation Absolute Resolve" Fact Box

**Type**: Callout/card module

**Content structure**:
| Column | Content |
|--------|---------|
| Confirmed | Verified timeline points (with citations) |
| Reported | Single-source claims requiring corroboration |
| Unknown | Explicitly uncertain elements |

**Hard rule**: Note when detail cannot be independently verified

**Content from**:
- CLAIM-REGISTRY.md
- TIMELINE.md
- CITATIONS.md OAR-1 through OAR-12

---

### Module H: "Legality & Legitimacy: Two Tests, One Crisis" — SVG Matrix

**Type**: Two-axis decision tree / matrix

**Axes**:
- **X-axis**: Domestic U.S. Legality
  - War Powers Resolution
  - Congressional authorization
  - Article II authority
  - Law enforcement framing

- **Y-axis**: International Legality
  - UN Charter Art. 2(4) force prohibition
  - Self-defense exception (Art. 51)
  - UN authorization
  - Humanitarian intervention

**Quadrants**:
- Domestic legal + International legal: (empty in this case)
- Domestic legal + International illegal: Administration position
- Domestic illegal + International illegal: Critic position
- Other combinations as applicable

**Micro-interactions**:
- Hover on each "test" node reveals:
  - What the test asks
  - What evidence required
  - Which sources to cite

**Treatment**: Neutral presentation; does not take sides

**Data sources**:
- CITATIONS.md LEG-1 through LEG-10
- UN Charter text
- War Powers Resolution text

---

## Archival/Reference Imagery (Limited Use)

### Acceptable Categories

| Category | Use Case | Source Targets |
|----------|----------|----------------|
| Maps | Historical context | Library of Congress, Wikimedia |
| Documents | Monroe Doctrine, legal texts | National Archives, Gov sources |
| Infrastructure | Refineries, tankers (generic) | EIA, industry sources |
| Official portraits | Key figures (formal, respectful) | Government sources, wire services |

### Prohibited Categories

| Category | Reason |
|----------|--------|
| Raid/capture footage | Sensational, unverified |
| Violence/casualties | Editorial constraint |
| Social media screenshots | Disinformation risk |
| AI-generated images | Confirmed fakes circulating |
| Triumph/humiliation | Editorial constraint |

---

## Image Sourcing Notes

For any photography used:

1. **Prefer public domain**: LOC, Wikimedia Commons, National Archives
2. **Verify license**: Document in CITATIONS.md
3. **Extract direct URLs**: Use image-url-extraction skill
4. **Provide attribution**: Credit line for each image
5. **Fallback to diagram**: If suitable photo unavailable, use SVG

---

## Visual Module Summary

| Module | Type | Status | Priority |
|--------|------|--------|----------|
| A: Hemisphere Map | SVG Interactive | Required | P0 |
| B: Heavy vs Light | SVG Diagram | Required | P0 |
| C: Import Flow | SVG Diagram | Required | P0 |
| D: Production Chart | SVG Chart | Required | P1 |
| E: Timeline Band | SVG Timeline | Required | P0 |
| F: Markets Chart | SVG Schematic | Required | P1 |
| G: Fact Box | Callout Module | Required | P0 |
| H: Legality Matrix | SVG Matrix | Required | P0 |
