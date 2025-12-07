# Esy.com Agent System

This directory contains specialized AI agents for the Esy.com ecosystem. Each agent is designed for a specific domain and can be invoked by referencing it in your prompt.

---

## Quick Reference

| Agent | Best For | Invocation Prefix |
|-------|----------|-------------------|
| [Invocation Enhancer](#scrollytelling-invocation-enhancer) | **🚀 Enhance any scrollytelling request** | `@agents/scrollytelling-invocation-enhancer.md` |
| [Scrollytelling Expert](#scrollytelling-expert) | Immersive scroll-based stories | `@agents/scrollytelling-expert.md` |
| [Children's Fiction Scrollytelling](#childrens-fiction-scrollytelling-agent) | **Magical stories for ages 3-6** | `@agents/childrens-fiction-scrollytelling-agent.md` |
| [Children's Books Writer](#childrens-books-writer-expert) | **Picture book narratives, ages 3-6** | `@agents/childrens-books-writer-expert.md` |
| [Immersive Experience Engineer](#immersive-experience-engineer) | App-like web experiences, animations | `@agents/immersive-experience-engineer.md` |
| [Research & Citations](#research--citations-expert) | Authoritative source discovery | `@agents/research-citations-expert.md` |
| [Historian Writer](#historian-writer-expert) | Historical narrative content | `@agents/historian-writer-expert.md` |
| [Historian Editor](#historian-editor-expert) | Fact-checking & verification | `@agents/historian-editor-expert.md` |
| [Software Engineer](#software-engineering-expert) | Full-stack development | `@agents/software-engineering-expert.md` |
| [UI/UX Designer](#uiux-design-expert) | Interface & experience design | `@agents/ui-ux-design-expert.md` |
| [Template Integration](#template-integration-engineer) | Raw templates → Next.js pages | `@agents/template-integration-engineer.md` |
| [Essayist](#essayist-expert) | Academic essay guidance | `@agents/essayist-expert.md` |
| [Copywriter](#copywriter-marketing-expert) | Marketing & conversion copy | `@agents/copywriter-marketing-expert.md` |

---

## How to Invoke Agents

### Method 1: File Reference (Recommended)
Reference the agent file directly in your prompt:

```
Using @agents/scrollytelling-expert.md, create a scrollytelling experience 
about the history of coffee.
```

### Method 2: Role Statement
Use the full role definition from the agent:

```
Using your assigned role as an award-winning digital storytelling architect 
and scrollytelling expert with 15+ years of experience crafting immersive, 
scroll-based narrative experiences, create...
```

### Method 3: Combined (Most Effective)
Reference the file AND provide context:

```
Apply @agents/research-citations-expert.md to find Tier 1-2 sources for 
our scrollytelling piece about [topic]. Focus on .edu and major news sources.
```

---

## Agent Details

### Scrollytelling Invocation Enhancer
**File:** `scrollytelling-invocation-enhancer.md`

**Role:** Expert prompt architect that transforms rough requests into comprehensive, structured briefs for scrollytelling agents. Asks strategic clarifying questions when needed.

**🚀 USE THIS FIRST:** Before invoking any scrollytelling agent, run your request through this enhancer for maximum quality output.

**Best For:**
- Transforming rough ideas into structured briefs
- Getting strategic questions to maximize output quality
- Auto-detecting target agent (children's vs general)
- Generating character names, themes, and visual directions
- Ensuring world-class scrollytelling output

**Operating Modes:**
| Mode | Trigger | Behavior |
|------|---------|----------|
| **Quick** | `enhance this request:` | Uses intelligent defaults, no questions |
| **Guided** | `enhance with questions:` | Always asks 2-6 strategic questions first |
| **Auto** | Just provide request | Asks questions only if ambiguous |

**What It Does:**
1. **Detects** which agent your request is for (children's or general)
2. **Assesses** clarity — is the request clear or ambiguous?
3. **Asks** 2-6 high-impact questions (if needed)
4. **Fills gaps** with intelligent defaults
5. **Outputs** a complete structured brief ready for the target agent

**Invocation Examples:**
```
# Quick mode — trust the defaults
Using @agents/scrollytelling-invocation-enhancer.md, enhance this request:
"story about a bunny who learns to share"

# Guided mode — I want to answer questions first
Using @agents/scrollytelling-invocation-enhancer.md, enhance with questions:
"a story about an owl"

# Auto mode — ask if needed
Using @agents/scrollytelling-invocation-enhancer.md:
"scrollytelling about how coffee was discovered"
```

**Strategic Questions It Asks:**
- 🎯 "What lesson should the child take away?"
- 🌙 "Bedtime-cozy or playtime-energetic?"
- 🔤 "Weave in counting, a letter, or pure story?"
- ⏱️ "Quick story or journey story?"
- 🎨 "Any visual inspiration?"

**Why Use This:**
| Without Enhancer | With Enhancer |
|------------------|---------------|
| "make a mouse story" | Full brief with character name, personality, theme, emotions, visual style, participation mechanics, animation priorities |
| Gaps → suboptimal output | Strategic questions → exactly what you envisioned |
| Agent makes assumptions | You control high-impact decisions |

---

### Scrollytelling Expert
**File:** `scrollytelling-expert.md`

**Role:** Award-winning digital storytelling architect specializing in immersive, **mobile-native**, scroll-based narrative experiences.

**Best For:**
- Creating new scrollytelling pages
- Designing visual narratives
- Orchestrating multi-agent content workflows

**Key Features:**
- **📱 Mobile-Native First** — Phone is the primary canvas; desktop enhances
- Mandatory Design Research phase (unique visual identity per story)
- **Anti-Pattern-Matching Protocol** — prevents reusing structural patterns
- **Layout Variation Required** (minimum 3 different patterns, no consecutive duplicates)
- Requires 2+ unique interaction mechanics never used before
- Coordinates **6 agents** (Research, Writer, Editor, UI/UX, Engineer, **Immersive Experience**)
- Enforces Sources & Further Reading section
- **Real device testing required** (not just browser responsive mode)

**⚠️ Anti-Pattern-Matching Protocol:**
Before creating any new scrollytelling:
1. Audit last 3-5 stories for reused patterns
2. Create a "banned list" of overused layouts/mechanics
3. Identify 2+ unique interaction mechanics for this story
4. Answer: "What interactive element could ONLY exist in this story?"

**Available Layout Patterns:**
| Pattern | Best For |
|---------|----------|
| `split-screen` | Visual subjects, image+text |
| `full-bleed` | Dramatic moments, hero sections |
| `timeline` | Chronological stories |
| `sticky-scroll` | Deep dives, processes |
| `comparison` | Before/after, contrasts (use SVG illustrations, NOT blog cards) |
| `quote-monument` | Key quotes, turning points |
| `data-viz` | Statistics, impact numbers |
| `horizontal` | Galleries, sequences |

**Invocation Examples:**
```
# Create a new scrollytelling piece
Apply @agents/scrollytelling-expert.md to create a scrollytelling 
experience about "The History of the Bicycle"

# With specific requirements
Using @agents/scrollytelling-expert.md, build an immersive narrative 
about the invention of the printing press. Include 8 sections, emphasize 
the Gutenberg era, and use a medieval manuscript aesthetic.
```

---

### Children's Fiction Scrollytelling Agent
**File:** `childrens-fiction-scrollytelling-agent.md`

**Role:** Award-winning children's digital experience designer and interactive storytelling architect specializing in magical, scroll-based narrative experiences for young children ages 3-6.

**⚠️ ORCHESTRATOR:** This agent coordinates the Children's Books Writer and other agents to create complete children's scrollytelling experiences.

**Best For:**
- Creating immersive, animated children's stories
- SVG character animation and choreography
- Interactive/participatory storytelling for ages 3-6
- Short stories (5-10 minutes) and long stories (15-25 minutes)
- Magical, delightful scroll-based experiences

**Key Features:**
- **📱 Tablet-Native First** — Tablets in small hands are the primary canvas
- **56px+ touch targets** — Child-friendly interactions
- **SVG Animation System** — Character expressions, environmental effects
- **Participation Mechanics** — Count, find, help, choose interactions
- **Unique Visual Identity** — Every story gets its own design research
- **Age-Appropriate Everything** — Vocabulary, emotions, pacing for 3-6 year olds
- **Parent-Child Experience** — Magical for kids, enjoyable for adults
- Coordinates: Children's Books Writer, UI/UX, Software Engineer, Immersive Experience

**Story Types:**
| Type | Duration | Best For |
|------|----------|----------|
| Short | 5-10 min | Bedtime, single session, younger kids (3-4) |
| Long | 15-25 min | Multi-chapter, journey stories, older kids (5-6) |

**Participation Options:**
- 🔢 Counting moments (tap to count objects)
- 🔍 Finding/searching (where's the hidden frog?)
- 🤝 Helping character (shake to wake, tap to open)
- 🛤️ Making choices (which path should Bunny take?)

**Invocation Examples:**
```
# Create a complete children's scrollytelling
Using @agents/childrens-fiction-scrollytelling-agent.md, create a 
magical scrollytelling experience about a curious kitten who 
discovers a secret garden. Short format, cozy visual style, 
include counting flowers participation.

# With specific brief
Apply @agents/childrens-fiction-scrollytelling-agent.md with this brief:
- Theme: friendship and sharing
- Length: Long (15-20 minutes)
- Characters: A shy bear and an energetic squirrel
- Visual style: Cozy autumn forest
- Participation: Help characters gather acorns
```

---

### Children's Books Writer Expert
**File:** `childrens-books-writer-expert.md`

**Role:** Award-winning children's author and early literacy specialist with 25+ years crafting beloved stories for young readers ages 3-6.

**Best For:**
- Writing picture book narratives
- Creating age-appropriate dialogue and vocabulary
- Crafting humor for young children
- Developing memorable characters
- Writing both short and long format stories

**Key Features:**
- **Early Reader Expertise** — Dolch sight words, 5-15 word sentences
- **Read-Aloud Excellence** — Natural rhythm, fun to perform
- **Humor Mastery** — Slapstick, wordplay, subverted expectations
- **Emotional Truth** — Validates children's real feelings
- **Educational Integration** — Learning woven naturally into story
- **Animation Cue System** — [ANIMATION:], [SOUND:], [PARTICIPATION:] markers
- **Rule of Three** — Three attempts, three friends, three discoveries

**Story Architecture:**
| Format | Duration | Structure | Word Count |
|--------|----------|-----------|------------|
| Short | 5-10 min | 3-beat (Spark → Adventure → Triumph) | 500-1,000 |
| Long | 15-25 min | 5-act with chapters | 1,500-3,000 |

**Character Archetypes:**
- 🦸 The Plucky Underdog (small but mighty)
- 🏠 The Reluctant Hero (discovers hidden courage)
- 🔍 The Boundless Explorer (curiosity that cannot be contained)
- ❤️ The Caring Friend (helps others before self)

**Invocation Examples:**
```
# Write a short children's story
Using @agents/childrens-books-writer-expert.md, write a short story 
(5-10 minutes) about a ladybug who wants to fly to the moon. Include 
animation cues and participation prompts for scrollytelling.

# Write with specific requirements
Apply @agents/childrens-books-writer-expert.md to write a long story 
about three animal friends who build a treehouse. Theme: teamwork. 
Include counting moments and sound effects.

# Character-focused story
Using @agents/childrens-books-writer-expert.md, create a bedtime story 
featuring a sleepy cloud named Cumulus who can't fall asleep. 
Gentle, cozy tone. 500-700 words.
```

---

### Immersive Experience Engineer
**File:** `immersive-experience-engineer.md`

**Role:** World-class frontend engineer specializing in immersive web experiences, building app-like, scroll-driven, and native-feeling interfaces.

**⚠️ MANDATORY for Scrollytelling:** This agent is required for every scrollytelling piece to ensure mobile-native feel. Designs created by `scrollytelling-expert.md` must be implemented through this agent.

**Best For:**
- Making web experiences feel like native apps
- Scroll-driven animations and parallax
- Entry/exit transitions
- Custom UI chrome (theatre bars, custom headers)
- Hiding browser UI and creating immersion
- Performance optimization for animations
- Touch/gesture interactions

**Key Features:**
- Browser Invisibility philosophy (users forget they're in a browser)
- **60fps animation guarantee on mobile**
- **Mobile-first, touch-first approach**
- `prefers-reduced-motion` respect
- GPU-accelerated animation patterns
- Safe area handling (notches, home indicators)
- Real device testing protocols

**Invocation Examples:**
```
# Implement mobile-native scrollytelling layer
Using @agents/immersive-experience-engineer.md, implement the mobile-native 
experience layer for this scrollytelling piece. Ensure 60fps animations, 
proper safe area handling, and app-like feel on mobile devices.

# Create immersive UI components
Using @agents/immersive-experience-engineer.md, build a Theatre Bar 
component with progress indicator and share panel.

# Performance optimization
Using @agents/immersive-experience-engineer.md, optimize the scroll 
animations for 60fps on mid-tier Android devices.

# Touch interaction implementation
Apply @agents/immersive-experience-engineer.md to implement touch-friendly 
interactions with 44px+ tap targets and thumb-zone-aware layouts.
```

---

### Research & Citations Expert
**File:** `research-citations-expert.md`

**Role:** World-class research librarian and citations specialist with expertise in academic source discovery and verification.

**Best For:**
- Finding authoritative sources
- Verifying claims and citations
- Building source packages for content

**Key Features:**
- Strict 4-tier source hierarchy
- Prioritizes .edu, peer-reviewed, major news (NYT, FT, Guardian)
- Provides formatted citations ready for use

**Source Tiers:**
| Tier | Quality | Examples |
|------|---------|----------|
| 1 | Gold Standard | .edu, JSTOR, university presses, museums |
| 2 | Highly Credible | NYT, WSJ, FT, Guardian, Economist, major publishers |
| 3 | Use with Caution | Wikipedia (starting point), expert blogs |
| 4 | Avoid | Social media, anonymous, self-published |

**Invocation Examples:**
```
# Source discovery for content
Using @agents/research-citations-expert.md, compile a source package 
for a scrollytelling piece about the history of vaccines. Provide 
Tier 1-2 sources only.

# Fact verification
Apply @agents/research-citations-expert.md to verify these claims 
and provide authoritative citations: [list claims]

# Source audit
Using @agents/research-citations-expert.md, audit this source list 
for credibility: [list sources]
```

---

### Historian Writer Expert
**File:** `historian-writer-expert.md`

**Role:** Award-winning historian and narrative writer with 20+ years crafting compelling historical narratives.

**Best For:**
- Writing historical content
- Crafting engaging narratives from research
- Developing character-driven non-fiction

**Invocation Examples:**
```
# Draft historical content
Using @agents/historian-writer-expert.md, write the narrative content 
for a scrollytelling piece about the Industrial Revolution. Focus on 
the human stories behind the factories.

# With specific brief
Apply @agents/historian-writer-expert.md to draft 8 sections about 
the history of photography, from daguerreotypes to digital.
```

---

### Historian Editor Expert
**File:** `historian-editor-expert.md`

**Role:** World-renowned historian and editorial expert specializing in fact-checking and historical accuracy verification.

**Best For:**
- Fact-checking historical content
- Verifying dates, names, and claims
- Ensuring scholarly accuracy

**Invocation Examples:**
```
# Fact-check content
Apply @agents/historian-editor-expert.md to fact-check this 
scrollytelling content and verify all historical claims: [content]

# Verify and provide citations
Using @agents/historian-editor-expert.md, review this narrative 
for accuracy and provide corrections with sources.
```

---

### Software Engineering Expert
**File:** `software-engineering-expert.md`

**Role:** World-class software engineer with 20+ years of enterprise-scale development experience.

**Best For:**
- Building Next.js components and pages
- Implementing complex features
- Code review and optimization
- Performance improvements

**Invocation Examples:**
```
# Implement a feature
Using @agents/software-engineering-expert.md, implement the 
scrollytelling page with Intersection Observer animations and 
parallax effects.

# Code review
Apply @agents/software-engineering-expert.md to review this 
component for performance and accessibility.

# Debug an issue
Using @agents/software-engineering-expert.md, debug why the 
scroll animations are janky on mobile.
```

---

### UI/UX Design Expert
**File:** `ui-ux-design-expert.md`

**Role:** World-class designer and UI/UX expert specializing in interface design and user experience.

**Best For:**
- Visual design refinement
- Typography and spacing decisions
- Interaction design
- Accessibility compliance

**Invocation Examples:**
```
# Refine visual design
Using @agents/ui-ux-design-expert.md, refine the visual system 
for this scrollytelling piece. Focus on typography hierarchy 
and mobile responsiveness.

# Design review
Apply @agents/ui-ux-design-expert.md to review this page design 
for accessibility and usability issues.
```

---

### Template Integration Engineer
**File:** `template-integration-engineer.md`

**Role:** Specialized frontend engineer for converting AI-generated templates into production Next.js pages.

**Best For:**
- Converting raw templates to Next.js pages
- Extracting CSS from inline styles
- Setting up routing for new pages
- Maintaining 1:1 design fidelity

**Invocation Examples:**
```
# Integrate a template
Apply @agents/template-integration-engineer.md to 
@raw_templates/[template-name].txt

# With specific routing
Using @agents/template-integration-engineer.md, convert this 
template to a Next.js page at /scrollytelling/[slug]
```

---

### Essayist Expert
**File:** `essayist-expert.md`

**Role:** Award-winning academic essayist and instructional editor with expertise in essay writing pedagogy.

**Best For:**
- Essay writing guidance
- Academic writing instruction
- Essay structure and argumentation
- Educational content about writing

**Invocation Examples:**
```
# Essay guidance
Using @agents/essayist-expert.md, provide guidance on writing 
a comparative essay about two historical periods.

# Structure advice
Apply @agents/essayist-expert.md to review this essay outline 
and suggest improvements to the argument structure.
```

---

### Copywriter Marketing Expert
**File:** `copywriter-marketing-expert.md`

**Role:** Expert marketing copywriter specializing in conversion-focused content.

**Best For:**
- Marketing copy and headlines
- Landing page content
- Conversion optimization
- Brand voice development

**Invocation Examples:**
```
# Write marketing copy
Using @agents/copywriter-marketing-expert.md, write compelling 
copy for the Esy.com homepage hero section.

# Optimize for conversion
Apply @agents/copywriter-marketing-expert.md to improve the 
CTA copy on this landing page for better conversion.
```

---

---

## Orchestrator Architecture

### What is an Orchestrator?

An **orchestrator agent** coordinates multiple specialized agents to produce complex deliverables. Unlike standalone agents that work independently, orchestrators:

1. **Define the workflow** — Sequence of agent invocations
2. **Set quality gates** — Approval checkpoints between stages
3. **Integrate outputs** — Combine deliverables from multiple agents
4. **Enforce standards** — Ensure all agents follow shared requirements

### Current Orchestrators

| Orchestrator | Domain | Agents Coordinated | Output |
|--------------|--------|-------------------|--------|
| `scrollytelling-expert.md` | Digital Storytelling | 6 agents | Mobile-native scrollytelling pages |
| `childrens-fiction-scrollytelling-agent.md` | **Children's Stories (3-6)** | 4 agents | Magical animated children's experiences |

### Scrollytelling Orchestrator Architecture

```
                    ┌─────────────────────────────────────┐
                    │      SCROLLYTELLING EXPERT          │
                    │         (Orchestrator)              │
                    │                                     │
                    │  Responsibilities:                  │
                    │  • Design Research (unique identity)│
                    │  • Mobile-first layout planning     │
                    │  • Story architecture               │
                    │  • Quality gates & final review     │
                    └──────────────┬──────────────────────┘
                                   │
           ┌───────────────────────┼───────────────────────┐
           │                       │                       │
           ▼                       ▼                       ▼
    ┌─────────────┐        ┌─────────────┐        ┌─────────────┐
    │  RESEARCH   │        │  HISTORIAN  │        │  HISTORIAN  │
    │  CITATIONS  │───────►│   WRITER    │───────►│   EDITOR    │
    │  (Sources)  │        │  (Content)  │        │(Fact-Check) │
    └─────────────┘        └─────────────┘        └──────┬──────┘
                                                         │
                                                         │ Approved Content
                                                         ▼
                           ┌─────────────────────────────────────┐
                           │           DESIGN LAYER              │
                           │                                     │
                           │           ┌───────────┐             │
                           │           │   UI/UX   │             │
                           │           │  DESIGN   │             │
                           │           │ (Visual)  │             │
                           │           └─────┬─────┘             │
                           └─────────────────┼───────────────────┘
                                             │
                                             ▼
                           ┌─────────────────────────────────────┐
                           │        IMPLEMENTATION LAYER         │
                           │                                     │
                           │  ┌───────────┐    ┌───────────────┐│
                           │  │ SOFTWARE  │    │   IMMERSIVE   ││
                           │  │ ENGINEER  │◄──►│   EXPERIENCE  ││
                           │  │(Structure)│    │   ENGINEER    ││
                           │  └───────────┘    │ (Mobile UX)   ││
                           │                   │ ⚠️ MANDATORY  ││
                           │                   └───────────────┘│
                           └─────────────────────────────────────┘
```

### Agent Responsibilities in Orchestra

| Agent | Input | Output | Quality Gate |
|-------|-------|--------|--------------|
| **Research Citations** | Topic | Tier 1-2 sources | Sources verified |
| **Historian Writer** | Sources + Brief | Narrative draft | Content complete |
| **Historian Editor** | Draft | Fact-checked content | **APPROVAL REQUIRED** |
| **UI/UX Design** | Visual direction | Refined design system | Mobile typography verified |
| **Software Engineer** | Content + Design | Component architecture, code structure | Build passes |
| **Immersive Experience** ⚠️ | Design + Code | Mobile-native UX, 60fps animations, Theatre Bar | **REAL DEVICE TESTING** |

**Implementation Layer Distinction:**
- `software-engineering-expert.md` → Component architecture, data flow, TypeScript, accessibility
- `immersive-experience-engineer.md` → Mobile-native feel, 60fps animations, touch interactions, Theatre Bar, hidden browser chrome

### Quality Gates (Blocking)

These checkpoints **must pass** before proceeding:

```
┌─────────────────────────────────────────────────────────────────┐
│                    QUALITY GATES                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ① DESIGN RESEARCH COMPLETE                                    │
│     └─ Unique visual identity derived from subject              │
│     └─ Mobile-first layouts specified                           │
│                                                                 │
│  ② HISTORIAN EDITOR APPROVAL ⚠️ BLOCKING                       │
│     └─ All facts verified                                       │
│     └─ Sources authenticated                                    │
│     └─ Cannot proceed without explicit approval                 │
│                                                                 │
│  ③ MOBILE DEVICE TESTING ⚠️ BLOCKING                           │
│     └─ Tested on real iPhone                                    │
│     └─ Tested on real Android                                   │
│     └─ 60fps animations confirmed                               │
│     └─ Cannot ship without device verification                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### When to Use Orchestrator vs Standalone

| Scenario | Approach |
|----------|----------|
| Complete scrollytelling page | Use `scrollytelling-expert.md` (orchestrator) |
| Just need sources | Use `research-citations-expert.md` (standalone) |
| Just need fact-check | Use `historian-editor-expert.md` (standalone) |
| Just need UI component | Use `ui-ux-design-expert.md` (standalone) |
| Performance optimization only | Use `immersive-experience-engineer.md` (standalone) |
| Complex, multi-deliverable project | Consider orchestrator pattern |

### Invoking an Orchestrator

When you invoke an orchestrator, it **automatically coordinates** all required agents:

```
# This single invocation triggers the full 6-agent workflow:
Apply @agents/scrollytelling-expert.md to create a scrollytelling 
experience about "The History of Coffee"

# The orchestrator will:
# 1. Conduct Design Research
# 2. Coordinate source discovery
# 3. Direct narrative writing
# 4. Enforce fact-checking
# 5. Guide visual refinement  
# 6. Ensure mobile-native implementation
# 7. Perform final review
```

---

## Multi-Agent Workflows

### Scrollytelling Production Pipeline

The recommended workflow for creating **mobile-native** scrollytelling content:

```
1.  @agents/scrollytelling-expert.md        → Design Research (mobile-first visual identity)
2.  @agents/research-citations-expert.md    → Source Discovery (Tier 1-2 only)
3.  @agents/scrollytelling-expert.md        → Story Architecture (mobile layouts first)
4.  @agents/historian-writer-expert.md      → Narrative Draft
5.  @agents/historian-editor-expert.md      → Fact-Check
6.  @agents/research-citations-expert.md    → Final Source Audit
7.  @agents/ui-ux-design-expert.md          → Visual Refinement (mobile typography)
8.  @agents/software-engineering-expert.md  → Component Implementation
9.  @agents/immersive-experience-engineer.md → Mobile-Native Layer (60fps, touch, Theatre Bar)
10. @agents/scrollytelling-expert.md        → Final Review (real device testing)
```

**Key Addition:** Step 9 (`immersive-experience-engineer.md`) ensures the final experience feels like a native app, not a website. This includes 60fps animations, touch interactions, hidden browser chrome, and Theatre Bar integration.

### Quick Content Creation

For faster iteration, use combined invocations:

```
Using @agents/scrollytelling-expert.md with support from 
@agents/research-citations-expert.md, create a complete 
scrollytelling experience about [topic] with verified sources.
```

---

## Meta-Framework

For creating new agents or understanding the underlying architecture, see:

**`META-AGENT-FRAMEWORK.md`** — The abstract parent framework that defines:
- Required structural components
- Role definition patterns
- Quality assurance frameworks
- Collaboration protocols
- Agent creation checklist

---

## Best Practices

1. **Be Specific**: Include topic, scope, and any constraints in your prompt
2. **Reference the File**: Always use `@agents/[name].md` for clear invocation
3. **Chain Agents**: For complex tasks, invoke multiple agents in sequence
4. **Trust the Framework**: Agents have built-in quality checks—let them work
5. **Provide Context**: The more context you give, the better the output

---

## Mobile-First Scrollytelling (Critical)

**70%+ of scrollytelling users are on mobile.** Every scrollytelling piece must:

| Requirement | Agent Responsible |
|-------------|-------------------|
| Design mobile-first layouts | `scrollytelling-expert.md` |
| 60fps animations on mobile | `immersive-experience-engineer.md` |
| Touch-friendly (44px+ targets) | `immersive-experience-engineer.md` |
| Safe area handling (notches) | `immersive-experience-engineer.md` |
| Theatre Bar integration | `immersive-experience-engineer.md` |
| Real device testing | Both |

**Quick Mobile Check:**
- [ ] Tested on real iPhone (not just browser)
- [ ] Tested on real Android
- [ ] All tap targets reachable with thumb
- [ ] No horizontal scroll
- [ ] Feels like an app, not a website

---

*Last Updated: December 2024*

