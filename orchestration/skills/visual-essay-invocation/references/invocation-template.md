# Visual Essay Invocation Template

Use this template structure for every visual essay invocation. Customize content but maintain consistent formatting.

---

## [Layer 1: Strategic Foundation]

### Project Title
**"[Evocative Title]: [Explanatory Subtitle]"**

Example: *"Now I Am Become Death: The Making of the Atomic Bomb"*

### Executive Brief

Write 3-4 paragraphs covering:
1. What this essay explores and why it matters
2. The emotional/intellectual journey the reader will take
3. The visual approach and medium choice
4. The transformation promise—what the reader will understand by the end

Template:
```
Create an immersive, [photo-driven/illustrated] visual essay that [chronicles/explores/explains] [subject]. This experience uses [visual medium description] to [emotional goal].

The narrative [spans/traces/follows] [scope], exploring [key themes].

[Why this matters now paragraph]

The user who completes this essay will understand [transformation promise].
```

### Visual Treatment Philosophy

Define the medium rules:

**For Photorealistic Essays:**
```
### Photography Across Eras

[Describe era-based treatment]

**Era 1: [Date Range]**
- [Color treatment: B&W, early color, etc.]
- [Processing: grain, contrast, warmth]
- [Sources: specific archives]

**Era 2: [Date Range]**
- [Color treatment]
- [Processing]
- [Sources]

[Continue for all eras]

**Transition Treatment:**
[How visual style shifts between eras—scroll-driven processing changes, etc.]
```

**For Illustrated Essays:**
```
### Illustration Approach

**Style:** [Describe illustration style]
**Palette:** [Color approach]
**Metaphor Visualization:** [How abstract concepts become visual]
**Animation:** [How illustrations animate]
```

---

## [Layer 2: Technical Systems]

### Scroll-Lock Animation System

```
**Critical Implementation:** Viewport locks during key sequences; scroll input drives animation progress.

**Required Behavior:**
- Scroll into designated zone triggers viewport lock
- Continued scroll input controls: [specific controls]
- Visual progress indicator shows sequence completion
- Upon 100% completion, lock releases with smooth easing
- Skip affordance available: [describe location/style]

**Scroll-Lock Techniques for This Essay:**
- **[Technique 1 Name]:** [Description]
- **[Technique 2 Name]:** [Description]
- **[Technique 3 Name]:** [Description]
```

### Parallax Depth System

```
- **Layer 0 (Background):** [Description—slow-moving, atmospheric]
- **Layer 1 (Mid-ground):** [Description—supporting elements]
- **Layer 2 (Subject):** [Description—primary content]
- **Layer 3 (Overlay):** [Description—UI, annotations]
- **Layer 4 (Ambient):** [Description—particles, effects]
```

### Progress Bar Design

```
### Concept: "[Themed Name]"

[Describe how progress indicator reflects essay's central metaphor]

**Design:**
- Position: [left edge vertical / bottom horizontal / etc.]
- Visual: [How it looks and builds]
- Chapter markers: [How chapters are indicated]
- Current position: [How user's location is shown]
- Micro-interactions: [Hover states, animations]

**Data Structure:**
- Chapter 1: [Progress element] - "[Chapter Title]"
- Chapter 2: [Progress element] - "[Chapter Title]"
[Continue for all chapters]
```

---

## [Layer 3: Hero Architecture]

### Hero Section Specification

```
### Visual Concept: "[Concept Name]"

[Describe the hero's visual and emotional intent in 2-3 sentences]

**Scroll-Lock Hero Sequence:**

- **0-[X]% scroll:** [Initial state description]

- **[X]-[Y]% scroll:** [Transition/build description]

- **[Y]-[Z]% scroll:** [Development description]

- **[Z]-[W]% scroll:** [Climax/key moment description]

- **[W]-100% scroll:** [Resolution into title card]

**Title Card:**
[Title]
Subtitle: [Subtitle]
```

---

## [Layer 4: Chapter Schema]

Repeat this structure for each chapter:

```
### Chapter [N]: [Chapter Title]
*[Date/Era/Context Marker]*

**Metaphor:** [One-line conceptual anchor]

**Central Photographs/Visuals:**
- [Specific asset 1]
- [Specific asset 2]
- [Specific asset 3]
- [Continue as needed]

**Content Focus:**
[3-5 paragraphs describing the narrative content, key events, significance]

**Key Figure Profile(s):**

**[Full Name]** — [Epithet]
- [Contribution 1]
- [Contribution 2]
- [Contribution 3]
- [Defining quote if available]
- Photograph: [Description of ideal image]

[Additional figures as needed]

**Scroll-Lock Sequence: "[Sequence Name]"**

[Describe what the sequence accomplishes in 1-2 sentences]

- **0-[X]% scroll:** [State description]
- **[X]-[Y]% scroll:** [State description]
- **[Y]-[Z]% scroll:** [State description]
- **[Z]-100% scroll:** [State description]

**Parallax Treatment:**
[Describe layer separation for key visuals in this chapter]
```

---

## [Layer 5: Design System]

```
## Design System Specifications

### Color Palette
- **Primary Background:** [Hex] ([description])
- **Secondary Background:** [Hex] ([description])
- **Accent Primary:** [Hex] ([semantic meaning])
- **Accent Secondary:** [Hex] ([semantic meaning])
- **Text Primary:** [Hex] at [opacity]
- **Text Secondary:** [Hex] at [opacity]
- **[Semantic Color 1]:** [Hex] ([usage])
- **[Semantic Color 2]:** [Hex] ([usage])

### Era-Based Visual Treatment
[If applicable—describe processing changes across timeline]

**[Era 1]:** [Treatment description]
**[Era 2]:** [Treatment description]

### Typography
- **Headlines:** [Font family, weight, character description]
- **Body:** [Font family, purpose]
- **Quotes:** [Font family, treatment]
- **Technical/Code:** [Monospace font]
- **Captions/Data:** [Treatment]

### Animation Principles
- Scroll-lock zones: [px depth range]
- Photo/content transitions: [durations by type]
- Text reveals: [timing for quotes, body]
- Parallax ratios: Background [X]x, Mid [Y]x, Foreground [Z]x
- Stagger values: [ms between sequential elements]
- Easing: [curve description or bezier values]
```

---

## [Layer 6: Implementation]

```
## Responsive Considerations

### Mobile Adaptations
- [Adaptation 1]
- [Adaptation 2]
- [Adaptation 3]

### Accessibility
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

## Source Attribution Requirements

[Describe attribution standards for this essay's content]

**Archives to Reference:**
- [Source 1]
- [Source 2]
- [Source 3]

## Content Warnings
[If applicable]

## Deliverables Checklist

- [ ] Hero sequence with scroll-lock animation
- [ ] Themed progress bar component
- [ ] [N] chapters with scroll-lock sequences
- [ ] [N] historical figures profiled
- [ ] Parallax depth system implemented
- [ ] Era-based visual treatment [if applicable]
- [ ] Mobile-responsive adaptations
- [ ] Accessibility: reduced motion, skip controls, alt text
- [ ] Source attribution system
- [ ] [Additional deliverables specific to this essay]
```

---

## Template Usage Notes

1. **Be specific with scroll percentages** — Vague ranges ("middle of the sequence") fail during implementation
2. **Name every scroll-lock sequence** — Names like "The Freeze" or "The Assembly" communicate intent
3. **Describe photographs concretely** — "Oppenheimer at a blackboard" not "a photo of the scientist"
4. **Include actual quotes** — Research during invocation, not during implementation
5. **Match progress bar to subject** — The metaphor should be obvious and delightful
6. **Define color semantics** — Not just hex values but what each color means in context
7. **Specify skip affordances** — Every locked section needs an exit