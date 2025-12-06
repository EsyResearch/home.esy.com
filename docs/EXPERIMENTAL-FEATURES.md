# Experimental Features & Ideas

> A living document for tracking experimental UI/UX concepts, proposed features, and design explorations that warrant future testing.

**Last Updated:** December 2024

---

## Document Structure

Each experiment is categorized and includes:
- **Status:** `💡 Idea` | `🔬 In Testing` | `✅ Approved` | `❌ Rejected` | `⏸️ On Hold`
- **Priority:** `P0` (Critical) | `P1` (High) | `P2` (Medium) | `P3` (Low)
- **Effort:** `XS` | `S` | `M` | `L` | `XL`

---

## Categories

1. **[IMMERSION]** — Scrollytelling & reading experience enhancements
2. **[NAVIGATION]** — Headers, footers, routing, wayfinding
3. **[MOBILE]** — Mobile-specific optimizations
4. **[ANIMATION]** — Motion, transitions, scroll effects
5. **[ACCESSIBILITY]** — A11y improvements
6. **[PERFORMANCE]** — Speed, loading, optimization
7. **[BRAND]** — Logo, identity, visual consistency
8. **[SOCIAL]** — Sharing, engagement, viral features

---

## Active Experiments

### EXP-001: Mobile Logo-in-Theatre-Bar
**Category:** `[MOBILE]` `[NAVIGATION]` `[IMMERSION]`  
**Status:** 💡 Idea  
**Priority:** P2  
**Effort:** M  
**Branch:** —  

#### Concept
On mobile devices, remove the top header entirely and relocate the Esy logo to the center of the Theatre Bar (bottom). This creates a single control surface and maximizes immersion.

#### Proposed Layout
```
Mobile (Current):
┌─────────────────────────────────────────┐
│ [esy logo]                              │  ← Header (top)
├─────────────────────────────────────────┤
│           STORY CONTENT                 │
├─────────────────────────────────────────┤
│ ← Stories    42% • 10 min       Share   │  ← Theatre Bar (bottom)
└─────────────────────────────────────────┘

Mobile (Proposed):
┌─────────────────────────────────────────┐
│                                         │  ← NO HEADER (full bleed)
│           STORY CONTENT                 │
├─────────────────────────────────────────┤
│ ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  ← Progress line
│    [←]        [esy]        [↑]          │  ← Theatre Bar with logo
└─────────────────────────────────────────┘
```

#### Rationale
- Maximum immersion on mobile (hero goes edge-to-edge)
- Single control surface in thumb zone
- Follows iOS/Android native app patterns
- Brand presence maintained, just relocated

#### Open Questions
- Where does progress percentage go? (Proposal: remove, keep line only)
- Logo size constraints within bar height?
- Does logo link to `/scrollytelling` or `/`?
- Desktop behavior unchanged, or also adapt?

#### Dependencies
- Requires Theatre Bar scroll-reveal feature (EXP-002)

#### Related Discussion
- Discussed 2024-12-06: Evaluated Essay Reader header vs. Theatre Bar approach

---

### EXP-002: Theatre Bar Scroll-Reveal
**Category:** `[IMMERSION]` `[NAVIGATION]`  
**Status:** 🔬 In Testing  
**Priority:** P1  
**Effort:** S  
**Branch:** `feature/theatre-bar-scroll-reveal`  

#### Concept
Theatre Bar is hidden when at top of page, slides up smoothly after user scrolls past ~100px threshold.

#### Implementation
- Bar starts with `transform: translateY(100%); opacity: 0`
- On scroll > 100px: `transform: translateY(0); opacity: 1`
- Smooth 0.4s cubic-bezier animation
- Increased height for breathing room (60-72px vs. 50-56px)

#### Status
✅ Built and ready for testing on branch

#### Next Steps
- User testing on mobile devices
- Evaluate feel of slide-up animation timing
- Decision: merge to main or iterate

---

## Backlog (Ideas Not Yet Scoped)

### EXP-003: Haptic Feedback on Mobile
**Category:** `[MOBILE]` `[IMMERSION]`  
**Status:** 💡 Idea  
**Priority:** P3  
**Effort:** S  

Subtle vibration feedback on key interactions (share success, reaching end of story, etc.) using Navigator.vibrate API where supported.

---

### EXP-004: Story-to-Story Swipe Navigation
**Category:** `[MOBILE]` `[NAVIGATION]`  
**Status:** 💡 Idea  
**Priority:** P2  
**Effort:** L  

At end of story, allow horizontal swipe to go to next/previous story (like Instagram Stories navigation).

---

### EXP-005: Ambient Audio Option
**Category:** `[IMMERSION]`  
**Status:** 💡 Idea  
**Priority:** P3  
**Effort:** M  

Optional ambient soundscapes for scrollytelling (subtle, muted by default, opt-in).

---

### EXP-006: Reading Time Countdown
**Category:** `[IMMERSION]`  
**Status:** 💡 Idea  
**Priority:** P3  
**Effort:** XS  

Instead of showing "10 min read", show countdown: "8 min left" → "3 min left" → "Almost done".

---

### EXP-007: Pull-to-Refresh on Index
**Category:** `[MOBILE]`  
**Status:** 💡 Idea  
**Priority:** P3  
**Effort:** S  

Native-feeling pull-to-refresh gesture on scrollytelling index page.

---

### EXP-008: Dark/Light Mode for Stories
**Category:** `[ACCESSIBILITY]` `[IMMERSION]`  
**Status:** 💡 Idea  
**Priority:** P3  
**Effort:** XL  

Allow users to toggle story theme. Major undertaking — each story is art-directed.

---

## Rejected Ideas

*None yet — this section tracks ideas we've explicitly decided against and why.*

---

## Decision Log

| Date | Experiment | Decision | Rationale |
|------|------------|----------|-----------|
| 2024-12-06 | Essay Reader Header for Scrollytelling | ❌ Rejected | Too feature-dense; breaks immersion; wrong mental model for entertainment content |
| 2024-12-06 | EXP-002: Theatre Bar Scroll-Reveal | 🔬 Testing | Built on branch, pending user testing |
| 2024-12-06 | EXP-001: Mobile Logo-in-Theatre-Bar | 💡 Idea | Documented for future exploration |

---

## How to Add a New Experiment

1. Assign next `EXP-XXX` number
2. Choose appropriate category tags
3. Set initial status to `💡 Idea`
4. Describe concept with visuals if helpful
5. List open questions and dependencies
6. Add to Decision Log when status changes

---

*This document is maintained alongside development. Update status as experiments progress.*

