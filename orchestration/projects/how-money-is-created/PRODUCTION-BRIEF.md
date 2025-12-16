# Phase 4: Production Brief - How Money Is Created

**Date**: December 2025  
**Status**: ⏳ In Progress  
**Phase**: Production (Phase 4)

---

## Production Invocation

```
Using @orchestration/agents/orchestrators/scrollytelling-expert.md, create an immersive visual essay 
following this spec:

Spec Location: orchestration/skills/visual-essay-invocation/specs/how-money-is-created.md
Research Package Location: orchestration/projects/how-money-is-created/research/

The spec is already research-backed. Use it as the authoritative guide.
Reference research/CITATIONS.md for source attribution in implementation.

Requirements:
1. Begin with Design Research phase — unique visual identity required
2. Mobile-native first — phone is primary design canvas
3. Minimum 3 different layout patterns, no consecutive same layouts
4. All content comes from spec (which is research-backed)
5. Real mobile device testing required before completion
6. Integrate with Immersive Experience Engineer for 60fps animations

Deliver:
- Design Research Report
- Story Architecture Document
- Complete implementation (page.tsx, Client.tsx, CSS)
- Sources section using citations from research package
- Mobile testing confirmation
```

---

## Production Requirements

### Design Research Phase (Gate 4)
- [ ] Design Research Report delivered
- [ ] Visual identity is unique (not copied from previous essays)
- [ ] Color palette derived from subject matter (money, credit, technical systems)
- [ ] Typography justified by process-driven, technical nature
- [ ] Animation philosophy matches mechanical, process-focused subject

### Story Architecture
- [ ] Story Architecture Document created
- [ ] All 8 stages mapped to layout patterns
- [ ] Minimum 3 different layout patterns used
- [ ] No consecutive same layouts
- [ ] Scroll-lock sequences specified for each stage
- [ ] Progress bar implementation planned

### Content Creation
- [ ] Opening Context (300-400 words)
- [ ] Stage 1: Central Bank Sets Conditions
- [ ] Stage 2: Commercial Banks Create Money Through Lending
- [ ] Stage 3: Credit Becomes Circulation
- [ ] Stage 4: Constraints on Money Creation
- [ ] Stage 5: Government Spending and Treasury Operations
- [ ] Stage 6: Central Bank Asset Purchases (QE)
- [ ] Stage 7: Destruction of Money
- [ ] Stage 8: Inflation as a System Outcome
- [ ] Closing Section (200-300 words)
- [ ] All content fact-checked against research package
- [ ] All quotes verified from CITATIONS.md

### Implementation
- [ ] `page.tsx` created (Next.js page wrapper)
- [ ] `HowMoneyIsCreatedClient.tsx` created (main client component)
- [ ] `how-money-is-created.css` created (custom styles)
- [ ] Scroll-lock sequences implemented
- [ ] Progress bar implemented ("Money Flow Indicator")
- [ ] Technical illustrations integrated (balance sheets, flow charts)
- [ ] Mobile-responsive design
- [ ] Accessibility requirements met

### Sources Section
- [ ] Sources section complete
- [ ] All 25 sources from CITATIONS.md included
- [ ] Links verified and functional
- [ ] Proper attribution format

### Mobile Testing
- [ ] Real device testing performed (Safari iOS, Chrome Android)
- [ ] Mobile performance verified (60fps animations)
- [ ] Touch interactions tested
- [ ] Safe areas respected (notches, home indicators)

---

## Key Specifications from Spec

### Visual Treatment
- **Primary Medium**: Technical illustrations (not photography)
- **Style**: Clean, technical, process-focused
- **Key Visuals**: Balance sheet diagrams, flow charts, technical illustrations
- **Color Palette**: Dark background (#0A0A0A), blue accent (#4A9EFF) for money flow, red accent (#FF6B6B) for constraints

### Layout Patterns Required
- Minimum 3 different patterns
- No consecutive same layouts
- Suggested patterns for process-driven essay:
  - `sticky-scroll` (for balance sheet explanations)
  - `standard` (for detailed text)
  - `comparison` (for before/after states)
  - `data-viz` (for flow charts)
  - `quote-monument` (for key quotes)

### Scroll-Lock Sequences
- Hero sequence: "The System Awakens" (0-100% scroll)
- Stage 2: "The Creation" (balance sheet assembly)
- Stage 6: "The Exchange" (QE mechanics)
- Additional sequences as specified in spec

### Progress Bar
- Concept: "Money Flow Indicator"
- Position: Left edge, vertical bar
- 10 segments (opening + 8 stages + closing)
- Fills from bottom to top

---

## Next Steps

1. **Design Research Phase** - Create unique visual identity
2. **Story Architecture** - Map all stages to layout patterns
3. **Content Creation** - Write all sections from spec
4. **Implementation** - Build React components and styles
5. **Integration** - Add scroll-lock, progress bar, animations
6. **Testing** - Mobile device testing
7. **Sources** - Complete sources section

---

## Status Tracking

| Milestone | Status | Notes |
|-----------|--------|-------|
| Design Research Report | ⏳ Pending | |
| Story Architecture | ⏳ Pending | |
| Content Draft | ⏳ Pending | |
| Implementation Complete | ⏳ Pending | |
| Mobile Testing | ⏳ Pending | |
| Gate 4-5 Approval | ⏳ Pending | |

