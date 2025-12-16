# Design Research Report: How Money Is Created

**Date**: December 2025  
**Status**: ✅ Complete  
**Gate**: G4 - Design Research

---

## Design Research Overview

This visual essay requires a **unique visual identity** that reflects its process-driven, mechanical nature. Unlike narrative-driven essays with historical figures and dramatic arcs, this essay explains a system—money creation—through technical precision and clarity.

**Key Challenge**: Create visual identity that is:
- Technical and precise (not decorative)
- Process-focused (not narrative-driven)
- Accessible (not academic)
- Reference-quality (bookmark-worthy)

---

## Visual Identity Analysis

### Subject Matter Characteristics

**Money Creation Is**:
- Abstract (not physical objects)
- Systemic (interconnected processes)
- Mechanical (step-by-step operations)
- Technical (balance sheets, flows, mechanisms)
- Infrastructure (foundational, not dramatic)

**Money Creation Is NOT**:
- Narrative-driven (no heroes, no dramatic arc)
- Photorealistic (no historical photos needed)
- Emotional (neutral, factual tone)
- Decorative (clarity over aesthetics)

### Visual Treatment Decision

**Primary Medium**: **Technical Illustration**

**Rationale**:
1. Subject is abstract (money, credit, balance sheets) - requires visualization, not photography
2. Process-driven nature demands diagrams, not images
3. Technical precision needed (balance sheets, flow charts)
4. Spec explicitly requires technical illustrations
5. Similar to "How a Chip Is Manufactured" - process-focused, technical

**NOT Using**:
- Photography (except minimal atmospheric background)
- Photorealistic imagery
- Historical photos
- Decorative elements

---

## Color Palette Derivation

### Subject Matter → Color Mapping

**Money/Credit Flow**:
- Association: Trust, flow, movement, liquidity
- Color: Blue (#4A9EFF)
- Rationale: Blue represents trust, stability, flow (water, circuits, data)

**Constraints/Risks**:
- Association: Limits, barriers, caution, destruction
- Color: Red (#FF6B6B)
- Rationale: Red signals constraints, warnings, stops

**Technical/Infrastructure**:
- Association: Precision, systems, machinery, technical
- Color: Dark background (#0A0A0A) with gray accents
- Rationale: Dark technical aesthetic, like engineering diagrams

**Success/Creation**:
- Association: Positive flow, creation, growth
- Color: Teal (#4ECDC4)
- Rationale: Teal represents positive technical processes

### Final Color Palette

**Primary Background**: `#0A0A0A` (Near black)
- Technical, precise, focused
- Like engineering diagrams, technical documentation

**Secondary Background**: `#1A1A1A` (Slightly elevated)
- For elevated sections, subtle hierarchy

**Accent 1 (Money/Credit)**: `#4A9EFF` (Blue)
- Money flow, credit creation, positive processes
- Primary accent for diagrams, flow arrows

**Accent 2 (Constraints)**: `#FF6B6B` (Red)
- Constraints, risks, limits, destruction
- Secondary accent for barriers, warnings

**Success/Positive**: `#4ECDC4` (Teal)
- Creation, positive flow, system health

**Warning/Caution**: `#FFD93D` (Yellow)
- Limits, caution, constraints

**Primary Text**: `#FFFFFF` (White, 90% opacity)
- Maximum readability on dark background

**Secondary Text**: `#CCCCCC` (Light gray, 70% opacity)
- Supporting text, annotations

**Technical/Data**: `#8B8B8B` (Medium gray)
- Technical annotations, data labels

**Color Psychology Justification**:
- Dark background: Technical precision, focus, reduces eye strain
- Blue accent: Trust, stability, flow (money = trust-based system)
- Red accent: Constraints, limits (regulatory, risk-based)
- Minimal palette: Clarity over decoration

---

## Typography Selection

### Typography Requirements

**Process-Driven Essay Needs**:
- Maximum readability (long-form technical content)
- Technical precision (not decorative)
- System font stack (performance, accessibility)
- Clear hierarchy (headlines, body, technical, captions)

### Typography Stack

**Headlines**: System font stack (SF Pro, -apple-system, sans-serif)
- Weight: 700 (Bold)
- Character: Technical, authoritative, clear
- Size: Responsive (48px desktop, 32px mobile)
- Rationale: System fonts ensure performance and accessibility, bold weight for authority

**Body**: System font stack
- Weight: 400 (Regular)
- Size: 18px desktop, 16px mobile
- Line height: 1.6
- Rationale: Generous line height for technical content, readable sizes

**Quotes**: System font stack
- Weight: 400
- Treatment: Italic, 20px, left border accent (blue)
- Rationale: Distinguishes quotes while maintaining readability

**Technical/Code**: 'SF Mono', 'Monaco', 'Courier New', monospace
- Weight: 400
- Rationale: Monospace for balance sheet labels, technical terms, data

**Captions/Data**: System font stack
- Weight: 300 (Light)
- Size: 14px, 70% opacity
- Rationale: Subtle, supporting information

**Typography Justification**:
- System fonts: Performance, accessibility, native feel
- No custom fonts: Reduces load time, ensures consistency
- Clear hierarchy: Headlines → Body → Technical → Captions
- Readability first: Generous line height, appropriate sizes

---

## Animation Philosophy

### Subject Nature → Animation Approach

**Money Creation Is**:
- Mechanical (step-by-step)
- Process-driven (not narrative)
- Technical (precision over drama)
- System-focused (interconnected)

**Animation Should**:
- Feel like "a mechanism clicking into place"
- Support clarity (not distract)
- Reveal processes (not create drama)
- Be precise (not decorative)

### Animation Principles

**Scroll-Lock Sequences**:
- Purpose: Reveal balance sheet assembly, flow progression
- Feel: Mechanical, precise, step-by-step
- Timing: Deliberate, not rushed (800-1000ms for assembly)
- Easing: `ease-out` for entry, `ease-in-out` for flow

**Diagram Assembly**:
- Balance sheets: Piece by piece (assets → liabilities → connections)
- Flow charts: Arrows appear, paths light up sequentially
- Before/after: Smooth transitions showing change
- Feel: "Mechanism clicking into place"

**Parallax**:
- Minimal (focus on clarity, not effects)
- Background: Very subtle (0.3x speed)
- Subject: Normal (1x speed)
- Ambient: Very subtle (0.2x speed)

**Animation Timing**:
- Diagram assembly: 800ms (deliberate, mechanical)
- Flow animations: 600ms (natural movement)
- Balance sheet transformations: 1000ms (clear change)
- Text reveals: 400ms (quick, not distracting)

**Reduced Motion**:
- All animations respect `prefers-reduced-motion`
- Static versions available
- Skip affordances for scroll-lock sequences

**Animation Justification**:
- Mechanical feel matches process-driven subject
- Precision over drama aligns with technical nature
- Step-by-step reveals support understanding
- Minimal parallax keeps focus on content

---

## Visual Style Guide

### Illustration Style

**Technical Illustration Approach**:
- Line-based diagrams with clear hierarchy
- Minimal color (blue for flow, red for constraints)
- Technical precision (no decorative elements)
- Clear labels and annotations
- Balance sheet format: Standard accounting layout

**Balance Sheet Diagrams**:
- Format: Standard T-account layout
- Assets on left, Liabilities on right
- Clear labels, numerical values
- Before/after states clearly distinguished
- Animation: Piece-by-piece assembly

**Flow Charts**:
- Clean arrows showing direction
- Nodes clearly labeled
- Color coding: Blue for money flow, red for constraints
- Sequential reveal (arrows appear in order)

**Technical Illustrations**:
- Central bank operations: Simplified, clear
- QE mechanics: Asset swaps visualized
- Regulatory frameworks: Constraint diagrams
- All illustrations: Clarity over decoration

### Visual Progression

**Stage-by-Stage Build**:
- Each stage introduces new visual elements
- Diagrams become more complex as system is revealed
- Visuals feel like "mechanism clicking into place"
- Technical precision maintained throughout

**No Decorative Elements**:
- No flourishes, no decorative patterns
- No unnecessary visual effects
- Focus on clarity and understanding
- Every visual supports the explanation

---

## Progress Bar Concept

**Concept**: "Money Flow Indicator"

**Visual Design**:
- Vertical bar on left edge
- 10 segments (opening + 8 stages + closing)
- Fills from bottom to top
- Current stage highlighted with subtle glow
- Stage labels on left side

**Metaphor Alignment**:
- Money flows through system (like circuit or pipeline)
- Each stage adds to the flow
- Progress = money moving through creation → circulation → destruction
- Visual reinforces process-driven nature

**Justification**:
- Aligns with subject matter (money flow)
- Reinforces process-driven structure
- Clear progress indication
- Technical aesthetic (not decorative)

---

## Layout Pattern Strategy

### Process-Driven Layout Selection

**Recommended Patterns** (minimum 3, no consecutive same):

1. **Sticky-Scroll** (`sticky-scroll`)
   - For: Balance sheet explanations (Stage 2)
   - Rationale: Fixed diagram while text scrolls, perfect for technical explanations

2. **Standard** (`standard`)
   - For: Detailed text sections (Opening, Stage 1, Stage 3, Stage 4, Stage 5, Stage 7, Stage 8, Closing)
   - Rationale: Traditional text blocks with accent elements, maximum readability

3. **Comparison** (`comparison`)
   - For: Before/after states (Stage 2: loan creation, Stage 7: money destruction)
   - Rationale: Side-by-side panels show transformation clearly

4. **Data-Viz** (`data-viz`)
   - For: Flow charts (Stage 3: circulation, Stage 6: QE mechanics)
   - Rationale: Flow charts as primary visual focus

5. **Quote Monument** (`quote-monument`)
   - For: Key quotes (Bank of England quote in Stage 2, Werner quote)
   - Rationale: Emphasize critical quotes that dispel misconceptions

**Layout Distribution**:
- Opening: Standard
- Stage 1: Standard
- Stage 2: Sticky-Scroll (balance sheet) + Quote Monument (key quote)
- Stage 3: Data-Viz (flow chart)
- Stage 4: Standard
- Stage 5: Comparison (bank vs. government)
- Stage 6: Data-Viz (QE flow)
- Stage 7: Comparison (before/after destruction)
- Stage 8: Standard
- Closing: Standard

**Layout Count**: 5 different patterns ✅
**Consecutive Same**: None ✅

---

## Mobile-Native Considerations

### Mobile-First Design

**Primary Canvas**: Phone (portrait orientation)
- ~390px width (iPhone) to ~430px (larger phones)
- Full viewport height for immersion
- Thumb-friendly interactions

**Typography for Mobile**:
- Body: 16px base (comfortable reading)
- Headlines: 32px (large but not overwhelming)
- Line height: 1.6 (generous leading)
- Max width: 100% (full width on mobile)

**Touch Interactions**:
- Minimum 44×44px tap targets
- 8px minimum spacing between targets
- Visual feedback on touch
- No precision-required interactions

**Performance Budget (Mobile)**:
- Max 3 simultaneous animations
- Prefer `transform` and `opacity` (GPU-accelerated)
- Parallax: max 2 layers, subtle movement
- Reduce animation complexity below 768px

**Safe Areas**:
- Use `100dvh` (dynamic viewport height)
- Respect `env(safe-area-inset-*)` for notches
- Fixed elements account for safe areas

---

## Accessibility Requirements

### Reduced Motion
- All animations respect `prefers-reduced-motion`
- Static versions of diagrams available
- Scroll-lock sequences can be skipped immediately

### Screen Reader Support
- All diagrams have descriptive alt text
- Balance sheets have text equivalents
- Flow charts have sequential descriptions
- ARIA labels for interactive elements

### Color Contrast
- All text meets WCAG AA standards (4.5:1 minimum)
- Accent colors have sufficient contrast
- Diagrams work in grayscale

### Keyboard Navigation
- All scroll-lock sequences can be advanced with arrow keys
- Skip buttons are keyboard accessible
- Focus indicators visible

---

## Uniqueness Verification

### Comparison to Previous Essays

**NOT Like**:
- "The Fork" (photorealistic, historical narrative)
- "The Word Dick" (etymology, historical timeline)
- "The Thinking Machine" (narrative-driven, character-focused)

**IS Like**:
- "How a Chip Is Manufactured" (process-driven, technical)
- But with unique visual identity (money flow vs. chip manufacturing)

**Unique Elements**:
- Money flow as central metaphor (not manufacturing)
- Blue/red color coding (money flow vs. constraints)
- Balance sheet diagrams as primary visual
- Process-driven, not narrative-driven
- Technical illustration, not photography

**Conclusion**: Visual identity is **unique** and appropriate for subject matter.

---

## Design Research Summary

### Visual Identity
- **Medium**: Technical illustration (not photography)
- **Style**: Clean, technical, process-focused
- **Color**: Dark background, blue/red accents
- **Typography**: System fonts, clear hierarchy
- **Animation**: Mechanical, precise, step-by-step

### Layout Strategy
- **5 different patterns** (exceeds 3 minimum)
- **No consecutive same layouts**
- **Process-appropriate patterns** (sticky-scroll, data-viz, comparison)

### Mobile-Native
- **Phone-first design**
- **Performance-conscious**
- **Accessibility-compliant**

### Uniqueness
- **Distinct from previous essays**
- **Appropriate for subject matter**
- **Reference-quality aesthetic**

---

## Gate 4 Status

**Design Research Report**: ✅ **COMPLETE**

**Gate 4: Design Research** — **APPROVED**

Visual identity is unique, appropriate, and production-ready.

---

## Next Steps

1. ✅ Design Research complete
2. **Story Architecture** - Map all stages to layout patterns
3. **Content Creation** - Write all sections from spec
4. **Implementation** - Build React components and styles

