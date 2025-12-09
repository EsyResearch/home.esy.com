# Visual Essay Creation Template

> **How to use:** Reference this template with your topic idea:
> ```
> Using @agents/InvocationTemplates/visual-essay-creation.md, I want to create 
> a visual essay about [YOUR TOPIC IDEA]
> ```

---

## Operating Modes

This template supports three modes based on user preference:

| Mode | Trigger | Behavior |
|------|---------|----------|
| **Quick** | "just run with it" / "fill in the gaps" / "use defaults" | Verify uniqueness, apply intelligent defaults, proceed immediately |
| **Guided** | "ask me questions" / "guide me through" | Ask all strategic questions interactively |
| **Auto** | Default — just provide topic | Ask 3-5 key questions, fill remaining gaps with defaults |

**Examples:**
```
# Quick Mode — minimal questions, maximum defaults
Using @agents/InvocationTemplates/visual-essay-creation.md, 
create a visual essay about the history of paper. Just run with it.

# Guided Mode — full interactive questionnaire  
Using @agents/InvocationTemplates/visual-essay-creation.md,
create a visual essay about the history of paper. Guide me through all the options.

# Auto Mode — balanced approach (default)
Using @agents/InvocationTemplates/visual-essay-creation.md,
create a visual essay about the history of paper.
```

---

## Template Instructions

When a user invokes this template with a topic idea, follow this process:

### STEP 1: ACKNOWLEDGE & VERIFY UNIQUENESS

First, acknowledge the user's topic and verify it doesn't duplicate existing Esy visual essays.

**Check against this existing inventory:**

| Category | Existing Topics (DO NOT REPLICATE) |
|----------|-----------------------------------|
| **Science** | Mammary gland evolution, Honey chemistry, DNA/genetics, Antibiotics |
| **Technology** | Skyscrapers, Firearms, Gunpowder, Trains, Automobiles, Bicycles |
| **Food/Beverage** | Wine, Honey, Tea (2 versions), Cocoa/Chocolate, Fried chicken, Bread, Soda |
| **Culture** | Language death, Sneakers, High heels, Basketball (2 versions), Fork, Spoon, Mirror |
| **Space** | Pale Blue Dot (cosmic perspective) |
| **Nature** | Deep ocean descent |
| **Asian Cuisine** | Chinese/Thai/Myanmar foods, Ngapi fish paste (2 versions) |

**Existing visual aesthetics to differentiate from:**
- Pyramid descent (Eternal Honey)
- Elevator/floor rise (Skyscraper)
- Burning fuse progress (Gunpowder)
- Rotating mechanical elements (Firearm, Train)
- Cosmic zoom-out (Pale Blue Dot)
- Ocean depth descent (Deep Ocean)
- Hand-drawn sketch style (Automobile)
- Tea ceremony meditative pacing (Tea Journey)
- Botanical plant-to-product (Cocoa Odyssey)

If the topic overlaps, suggest how to differentiate OR propose an alternative angle.

---

### STEP 2: ASK STRATEGIC QUESTIONS

After confirming uniqueness, ask the user these questions **interactively** (present 3-5 at a time, don't overwhelm):

#### Round 1: Core Concept
```
Great! Let's build your visual essay about [TOPIC]. I have a few questions to 
ensure we create something award-winning:

1. **CENTRAL QUESTION**: What single question should this essay answer?
   (e.g., "How did X change humanity?" or "Why does X matter?")

2. **INTENDED OUTCOME**: After viewing, what should someone be able to do?
   □ Explain the topic to others (EDUCATE)
   □ Feel emotionally moved (INSPIRE)
   □ See things differently (PERSUADE)
   □ Want to learn more (SPARK CURIOSITY)

3. **TARGET AUDIENCE**: Who is this for?
   □ Curious general adults
   □ Students (what level?)
   □ Subject enthusiasts
   □ Specific group: ___
```

#### Round 2: Emotional & Visual Direction
```
Now let's shape the experience:

4. **EMOTIONAL JOURNEY**: 
   - Opening: How should viewers feel when they start? (curious / surprised / awed / intrigued)
   - Ending: How should they feel when done? (enlightened / moved / inspired / provoked)

5. **VISUAL MOOD**: Describe the feeling in 3-5 words
   (e.g., "warm nostalgic sepia elegance" or "cold technical precision")

6. **TIME & SCOPE**: 
   - What time period does this cover? (specific dates or eras)
   - Geographic scope? (global / regional / specific location)
```

#### Round 3: Content Requirements
```
Let's nail down the content:

7. **MUST-INCLUDE**: What facts/moments/dates absolutely MUST appear?
   (List your top 5-7 essentials)

8. **KEY FIGURES**: Are there specific people central to this story?

9. **QUOTES**: Any specific quotes you want featured?

10. **DATA**: Any statistics or numbers that should be visualized?
```

#### Round 4: Technical Specs
```
Final details:

11. **LENGTH**: How deep should we go?
    □ Short (8-10 min) — focused, punchy
    □ Standard (12-15 min) — comprehensive  
    □ Long (18-22 min) — epic, exhaustive

12. **SPECIAL FEATURES**: Any specific requests?
    □ Custom SVG illustrations
    □ Interactive elements
    □ Data visualizations
    □ Character/mascot
    □ Other: ___

13. **ANYTHING ELSE**: Any other vision, references, or requirements?
```

---

### STEP 3: FILL GAPS WITH INTELLIGENT DEFAULTS

**CRITICAL**: If user chooses Quick Mode, skips questions, or says "you decide" / "fill in the gaps" — apply these intelligent defaults and PROCEED WITHOUT WAITING:

#### Intelligent Defaults System

| Element | Default Strategy |
|---------|------------------|
| **Central Question** | "How did [TOPIC] shape [most relevant domain: humanity/culture/technology/science]?" |
| **Intended Outcome** | EDUCATE + SPARK CURIOSITY |
| **Target Audience** | Curious general adults, no prior knowledge assumed |
| **Opening Emotion** | Curiosity ("I didn't know this existed") |
| **Closing Emotion** | Enlightened + Satisfied ("I understand now") |
| **Visual Mood** | Derive from subject's primary material, era, or cultural context |
| **Color Palette** | Research subject's physical materials and derive colors organically |
| **Typography** | Match to subject's era (ancient → classical serif, modern → clean sans, industrial → utilitarian) |
| **Animation Style** | Match to subject's nature (mechanical → precise, organic → flowing, historical → measured) |
| **Length** | Standard (12-15 min), 8 sections |
| **Layout Patterns** | full-bleed hero → standard thesis → split-screen → timeline → quote-monument → data-viz → split-screen → full-bleed climax → standard resolution |
| **Special Features** | Custom SVG illustrations, scroll-triggered animations |
| **Unique Interactions** | Research subject and propose 2 subject-specific mechanics never used in Esy |

#### Quick Mode Flow

If user triggers Quick Mode:

```
1. Acknowledge topic
2. Verify uniqueness (REQUIRED — cannot skip)
3. Apply ALL intelligent defaults
4. Research subject to derive:
   - Visual identity from materials/era
   - 2 unique interaction mechanics
   - Narrative structure based on subject's natural chronology
5. Present complete brief for confirmation
6. If user approves (or says "proceed"), invoke Visual Essay Director immediately
```

#### Auto Mode Flow (Default)

If user provides topic without mode specification:

```
1. Acknowledge topic
2. Verify uniqueness (REQUIRED)
3. Ask ONLY these 3 key questions:
   - "What's the ONE thing viewers must understand?" (thesis)
   - "Any specific moments/facts that MUST be included?" (requirements)
   - "Any visual direction or mood preference?" (aesthetic)
4. Fill ALL other gaps with intelligent defaults
5. Present complete brief
6. Proceed on approval
```

#### Guided Mode Flow

If user requests full guidance:

```
1. Acknowledge topic
2. Verify uniqueness (REQUIRED)
3. Ask all questions in Rounds 1-4 (Step 2)
4. Fill only unanswered gaps with defaults
5. Present complete brief
6. Proceed on approval
```

---

### STEP 4: PROPOSE UNIQUE VISUAL IDENTITY

Based on the user's answers, propose a unique visual identity:

```
Based on your answers, here's my proposed visual identity:

**VISUAL CONCEPT**: [Describe the unique aesthetic approach]

**COLOR PALETTE**: 
- Derived from: [Subject's materials/era/culture]
- Primary: [Color] — because [reason]
- Secondary: [Color] — because [reason]
- Accent: [Color] — because [reason]

**TYPOGRAPHY**:
- Display: [Font style] — evokes [quality]
- Body: [Font style] — for [readability/tone]

**ANIMATION PHILOSOPHY**:
- Overall tempo: [fast/medium/slow] — because [subject connection]
- Motion style: [mechanical/organic/flowing/precise]

**UNIQUE INTERACTIONS** (never used before in Esy):
1. [Interaction 1] — [description]
2. [Interaction 2] — [description]

**STRUCTURAL INNOVATION**:
[How this essay's structure differs from existing essays]

Does this direction resonate? Any adjustments?
```

---

### STEP 5: PRESENT NARRATIVE STRUCTURE

Propose the essay structure:

```
Here's the proposed narrative structure:

## VISUAL ESSAY: [TITLE]

**Central Question**: [Question]
**Read Time**: [X] minutes | **Sections**: [Y]

### STRUCTURE

| # | Section | Type | Layout | Emotional Beat |
|---|---------|------|--------|----------------|
| 1 | THE HOOK | Hero | full-bleed | [emotion] |
| 2 | THE THESIS | Context | standard | Anticipation |
| 3 | [SCENE TITLE] | Evidence | [layout] | [emotion] |
| 4 | [SCENE TITLE] | Narrative | [layout] | [emotion] |
| 5 | [SCENE TITLE] | Transition | [layout] | [emotion] |
| 6 | [SCENE TITLE] | Impact | [layout] | [emotion] |
| 7 | THE CLIMAX | Peak | [layout] | Revelation |
| 8 | THE RESOLUTION | Legacy | standard | Satisfaction |
| 9 | SOURCES | Trust | standard | Credibility |

**Layout Diversity Check**: ✅ [X] different patterns, no consecutive duplicates

Does this structure work? Any sections to add, remove, or adjust?
```

---

### STEP 6: CONFIRM & INVOKE

Once the user approves (or you've incorporated their feedback), present the final confirmation:

```
Perfect! Here's the final brief:

═══════════════════════════════════════════════════════════════
                    VISUAL ESSAY BRIEF
═══════════════════════════════════════════════════════════════

**Title**: [WORKING TITLE]
**Central Question**: [QUESTION]
**Target Audience**: [AUDIENCE]
**Primary Outcome**: [OUTCOME]

**Emotional Journey**: [OPENING] → [KEY BEATS] → [CLOSING]

**Visual Identity**:
- Mood: [MOOD]
- Palette: [COLORS] (derived from [SOURCE])
- Typography: [STYLE]
- Animation: [PHILOSOPHY]

**Unique Elements**:
- [INTERACTION 1]
- [INTERACTION 2]

**Structure**: [X] sections, [Y] minutes
[STRUCTURE TABLE]

**Must-Include Content**:
- [FACT 1]
- [FACT 2]
- [KEY DATES]
- [KEY FIGURES]
- [QUOTES]

**Technical Specs**:
- 60 FPS mobile performance (non-negotiable)
- Mobile-native first design
- Minimum 3 layout patterns
- Citation Certification required

═══════════════════════════════════════════════════════════════

Ready to proceed? I'll invoke the Visual Essay Director to begin production.
```

Then invoke:

```
Using @agents/visual-essay-director.md, initiate production for this visual essay:

[PASTE COMPLETE BRIEF FROM ABOVE]

REQUIREMENTS:
1. Complete production pipeline (all 7 quality gates)
2. Design Research phase — unique visual identity required
3. Mobile-native first — 60FPS on mid-tier devices
4. Citation Certification required before publication
5. Real device testing (iPhone + Android) required
6. Minimum 3 layout patterns, no consecutive same
7. Award-winning cinematic quality
```

---

## QUALITY STANDARDS ENFORCED

This template ensures every visual essay meets:

### Uniqueness
- ✅ Novel topic (not in existing inventory)
- ✅ Fresh angle (even if adjacent to existing)
- ✅ Unique visual aesthetic
- ✅ 2+ never-before-used interaction mechanics
- ✅ Structural innovation

### Narrative
- ✅ Clear central question (thesis)
- ✅ Hook → Thesis → Body → Climax → Resolution
- ✅ Planned emotional journey
- ✅ Chronological/logical progression
- ✅ Satisfying conclusion that answers the question

### Technical
- ✅ 60 FPS on mobile
- ✅ Mobile-native design
- ✅ WCAG AA accessibility
- ✅ 3+ layout patterns
- ✅ No consecutive identical layouts

### Scholarly
- ✅ Tier 1-2 sources (80%+ minimum)
- ✅ Citation Certification required
- ✅ All quotes authenticated
- ✅ Sources section included

---

## EXISTING ESSAYS REFERENCE

For uniqueness verification, here are all existing visual essays:

### Published Essays (32 total)
1. Mammary Gland Evolution (Science)
2. Evolution of Mammary Glands (Science)
3. Eternal Honey (History) — pyramid descent aesthetic
4. Honey Never Spoils (Science)
5. DNA & The Double Helix (Science)
6. The Skyscraper (Technology) — elevator rise aesthetic
7. The Firearm (Technology) — rotating cylinder aesthetic
8. Gunpowder (Technology) — burning fuse aesthetic
9. The Train (Technology) — locomotive motion aesthetic
10. The Automobile (Technology) — hand-drawn sketch aesthetic
11. The Invention of Wine (Culture)
12. The Pale Blue Dot (Space) — cosmic zoom-out aesthetic
13. The Deep Ocean (Nature) — descent aesthetic
14. Language Death (Culture)
15. The Mirror (History)
16. The Fizz/Soda (Culture)
17. The Sneaker Story (Culture)
18. The High Heels Story (Culture)
19. The Bicycle Story (Technology)
20. The Spoon Story (History)
21. The Basketball Story (Culture)
22. The Fork Story (History)
23. The Discovery of Antibiotics (Science)
24. Flavors of the East (Culture/Food)
25. The Ngapi Journey (Culture/Food)
26. Ngapi: The Fermented Soul (Culture/Food)
27. Leaves of Time - Tea Journey (Culture)
28. Leaves of Time - Illustrated Edition (Culture)
29. The Cocoa Odyssey (History) — botanical journey aesthetic
30. The Golden Crunch - Fried Chicken (History)
31. The First Loaf - Bread (History)
32. The First Bounce - Basketball (History)

### Children's Fiction (Draft)
- The Night the Stars Fell
- The Monster Under My Bed
- Mia Mouse and the Mystery M
- The Alphabet Adventure Train
- Sammy Snail's Super Speed Day

---

## INVOCATION EXAMPLES

### Example 1: Quick Mode (Fill Gaps & Run)

```
User: Using @agents/InvocationTemplates/visual-essay-creation.md, 
create a visual essay about the history of paper. Just run with it.

Template Response: 
On it! Creating a visual essay about the history of paper.

**UNIQUENESS CHECK**
✅ Paper is not in our existing inventory
✅ No existing essays cover writing materials, printing, or paper-making  
✅ Novel topic — APPROVED

**APPLYING INTELLIGENT DEFAULTS**

I've researched paper's history and derived:

═══════════════════════════════════════════════════════════════
                    VISUAL ESSAY BRIEF
═══════════════════════════════════════════════════════════════

**Title**: "The Paper Trail"
**Subtitle**: "How Pressed Fibers Built Civilization"
**Central Question**: How did paper transform human knowledge and power?

**Visual Identity** (derived from subject):
- Mood: warm archival elegance, tactile authenticity
- Palette: papyrus cream (#F5E6C8), ink black (#1A1A1A), 
  aged brown (#8B7355), vermillion seal red (#CC3300)
  → Derived from: paper materials, ink, wax seals
- Typography: Classical serif (Garamond) for historical gravitas
- Animation: Measured, deliberate — paper unfurling, ink spreading

**Unique Interactions** (never used in Esy):
1. Fiber-weave animation — watch paper form fiber by fiber as you scroll
2. Ink-spread reveal — text appears as if wet ink bleeding into paper

**Structure**: 8 sections, ~14 minutes

| # | Section | Layout | Beat |
|---|---------|--------|------|
| 1 | The First Mark | full-bleed | Curiosity |
| 2 | Before Paper | split-screen | Context |
| 3 | Cai Lun's Gift (105 AD) | timeline | Discovery |
| 4 | The Silk Road of Ideas | sticky-scroll | Journey |
| 5 | Paper Meets Press | comparison | Transformation |
| 6 | The Democratization of Knowledge | data-viz | Impact |
| 7 | The Digital Paradox | quote-monument | Reflection |
| 8 | Legacy in Fiber | full-bleed | Satisfaction |

**Research Direction**: Chinese invention, Islamic transmission, 
European adoption, Gutenberg intersection, modern production

═══════════════════════════════════════════════════════════════

Proceeding to invoke Visual Essay Director...

[INVOKES @agents/visual-essay-director.md WITH COMPLETE BRIEF]
```

---

### Example 2: Auto Mode (3 Key Questions)

```
User: Using @agents/InvocationTemplates/visual-essay-creation.md,
create a visual essay about the history of paper

Template Response:
Great topic! Paper is not in our existing inventory — uniqueness confirmed ✅

Three quick questions to shape this:

1. **What's the ONE thing viewers must understand?**
   (e.g., "Paper democratized knowledge" or "Paper was China's secret weapon")

2. **Any specific moments that MUST be included?**
   (e.g., Cai Lun's invention, arrival in Europe, Gutenberg's press)

3. **Any visual mood preference?**
   (e.g., "ancient and sacred" or "industrial and mechanical")

Or say "you decide" and I'll fill these with intelligent defaults!
```

---

### Example 3: Guided Mode (Full Questions)

```
User: Using @agents/InvocationTemplates/visual-essay-creation.md,
create a visual essay about the history of paper. Guide me through all options.

Template Response:
Let's build this together! Paper is uniqueness-approved ✅

**ROUND 1: CORE CONCEPT**

1. What single question should this essay answer?
   (e.g., "How did paper change human civilization?")

2. After viewing, what should someone be able to do?
   □ Explain paper's history to others (EDUCATE)
   □ Feel moved by paper's impact (INSPIRE)
   □ See paper differently (PERSUADE)
   □ Want to learn more (SPARK CURIOSITY)

3. Who is this for?
   □ Curious general adults
   □ Students (what level?)
   □ History enthusiasts
   □ Other: ___

[CONTINUES WITH ALL ROUNDS...]
```

---

*This template guides users through strategic questions to produce novel, unique, cinematic visual essays that meet award-winning standards.*
