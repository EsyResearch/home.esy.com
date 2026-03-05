# Template Design & Intake Architecture

**Date:** February 26, 2026
**Type:** Strategy Session — Product Architecture & Process Design

---

## How This Started

Planning the next visual essay for the paleoanthropology cluster (Turkana Boy — KNM-WT 15000). Selected "The Forensic Unspooling" narrative structure: essay opens with the boy's death (dental abscess, 1.53 Ma) and reverse-engineers his entire life from the skeleton. Each section is a forensic question the bones answer.

When writing the prompt file for the orchestration runner, the same problem resurfaced: I kept including design decisions (hex codes, CSS variables, typography), technology decisions (D3, Recharts, React Three Fiber tier assignments), and research details (specific author-year citations) — all things the pipeline's gate agents are responsible for.

This wasn't a one-time mistake. It happens every time I launch a new essay. The conversation turned to understanding why.

---

## The Diagnosis: Role Confusion

The prompt file has no schema. It's a free-text document where I'm playing two roles simultaneously:

1. **User role** — provides intent: "I want a visual essay about Turkana Boy with a forensic narrative"
2. **Operator role** — knows the pipeline internals: "This needs Three.js for the skull viewer, Source Serif 4 for the cluster font, alkaline blue for the Lake Turkana palette"

The operator knowledge is correct but belongs to different gate agents:

| What I kept putting in prompts | Which gate agent should decide it |
|---|---|
| CSS custom properties, hex values | G4 (design-researcher) |
| Visualization tier assignments | G4.6 (visualization-architect) |
| Library names (D3, Recharts, R3F) | G4.6 (visualization-architect) |
| Detailed academic citations | G2 (research-orchestrator) |
| Implementation patterns | G5 (production-orchestrator) |
| Typography stack | G4 (design-researcher) |

When app.esy.com exists, the intake form's structured fields will naturally prevent this — there's no "paste your CSS variables" field. But right now, the free-text prompt file has no guard rails.

**The real question isn't "what should I put in this prompt file?" — it's "what does the visual essay intake form capture?"**

Once the schema is defined, every future prompt file just fills it in and the boundary problem disappears.

---

## The Template Model

### What a template actually is

A template has two components:

1. **Encoded expertise** (constant across all runs) — the workflow definition, quality standards, agent instructions. For visual essays: the 17-gate pipeline, "charts must be publication-quality," "run a citation audit," "design must be subject-derived." Users never provide this. It's the template designer's domain knowledge, crystallized.

2. **Intake schema** (structure that varies per run) — the fields that capture what's different each time. For visual essays: topic, thesis, narrative structure, cluster context, tone, constraints.

**Template = encoded expertise + intake schema.**

### What an intake captures

Three layers:

1. **Structured fields** — topic, thesis, narrative preference, tone (form answers)
2. **Materials / attachments** — PDFs, images, datasets, links, citations, existing artifacts (rich context the user brings that influences the output)
3. **Optional free-text** — additional notes, constraints, preferences that don't fit a specific field

Mapped to two template types:

| Intake layer | YouTube → Outline | Visual Essay |
|---|---|---|
| **Structured fields** | Output preference (outline, timestamps, summary) | Topic, thesis, narrative structure, cluster context, tone |
| **Materials** | URL (the video itself), optional related docs | PDFs, research papers, images, datasets, reference links |
| **Free-text** | "Focus on the pricing strategy discussion" | "Don't duplicate naledi's cave palette" |

---

## What the Pipeline Actually Does

### Not prompt shaping — progressive refinement

The intake doesn't produce "a prompt" in the ChatGPT sense. It produces context that every gate receives alongside gate-specific instructions. But calling it "context propagation" is too implementation-level.

What's actually happening at the product level: **the pipeline progressively refines intent into artifact through domain specialization.**

Intent → structured intent (G1) → researched intent (G2) → specified intent (G3) → designed intent (G4) → implemented intent (G5) → audited intent (G6-G7) → published artifact (G8-G9)

Each gate takes the accumulated specification and adds its domain's contribution. Research doesn't just "have context" — it turns a topic into a research package. Design doesn't just "see the intake" — it transforms subject matter into a visual identity.

### Three things happening, three names

1. **Intent capture** — what the intake does. Turns unstructured user desire into structured input. This is what templates solve.
2. **Progressive refinement** — what the pipeline does. Each gate adds domain expertise to transform the specification toward the final artifact.
3. **Context engineering** — how each gate receives the right information. The implementation mechanism.

**One-sentence product framing:** Esy templates turn user intent into publishable artifacts through progressive refinement — the intake captures intent, the workflow refines it, each stage adds specialized expertise, and the artifact emerges from the other end.

---

## The Meta-Template: How to Design a Template

The intake form should be designed **last**, not first. It's the residual — whatever the user needs to provide that the template's encoded expertise and agents can't supply on their own.

### Design sequence

```
Problem → Artifact → Process → Expertise → Intake
  what?     done?     how?      who?       ask?
```

Each step constrains the next:

**1. Problem** — What recurring workflow problem are we solving?
"Users need to turn YouTube videos into structured outlines."

**2. Artifact** — What does "done" look like? What separates good from bad?
"A nested outline with key arguments, timestamps, speaker attribution. Good = accurate, complete, hierarchical. Bad = hallucinates claims, misses key points."

**3. Process** — What transformations are needed from input to artifact?
"Extract transcript → identify segments → classify information → structure hierarchy → format." These become workflow stages/gates.

**4. Expertise** — What domain knowledge is needed at each step?
"Transcript extraction needs API integration. Classification needs content analysis. Structuring needs editorial organizing." Each capability maps to an agent.

**5. Intake** — Given the process and agents above, what MUST come from the user?
"URL is required. Focus area is optional. Output format has a sensible default."

### Validation signal

The intake size is a diagnostic:
- **50 fields** → agents need more autonomy, process is under-designed
- **1 field** → artifact might be too generic, insufficient personalization
- **Right-sized** → captures only what varies per run and can't be inferred

---

## Applied: Visual Essay Intake Schema (To Be Defined)

The visual essay intake form should capture:

### Required structured fields
- **Topic** — what the essay is about
- **Core thesis** — the central claim or question
- **Category / subcategory** — science, history, etymology, etc.

### Optional structured fields
- **Narrative structure preference** — chronological, thematic, forensic, dual-timeline, etc.
- **Section ideas** — rough architecture the user has in mind
- **Cluster context** — which existing essays it sits alongside
- **Tone** — academic, narrative, forensic, conversational
- **Audience** — general, specialist, student
- **Estimated depth** — quick, standard, deep

### Materials
- Research papers, PDFs, primary sources
- Images the user wants included
- Datasets
- Reference artifacts (existing essays, external examples)
- Links and citations

### Free-text constraints
- "Don't duplicate X essay's visual identity"
- "Must cover Y figure/event"
- "This is for Z audience"

**Everything else — palette, typography, technology tiers, library choices, implementation patterns, citation research — belongs to the pipeline agents.**

---

## Applied: Turkana Boy Prompt Rewrite

The current `orchestration/prompts/turkana-boy.txt` needs to be rewritten using this framework. It should contain only:

- Topic and thesis (Turkana Boy, the first modern body)
- Narrative structure (the forensic unspooling)
- Section architecture (12 sections with forensic questions)
- Content scope (what subjects to cover)
- Cluster context (paleoanthropology cluster with Lucy, Seven Million Years, Homo naledi)
- Tone (forensic, precise, ultimately moving)
- Visual requirements at high level (kinds of information to visualize, not libraries)
- Design constraints only (must not duplicate naledi or Lucy palettes)
- Quality bar (estimated scope)

Remove: hex codes, CSS variables, typography specs, tier assignments, library names, specific citations, implementation patterns.

---

## Implications for app.esy.com

### Template creation workflow
When building new templates for app.esy.com, follow the meta-template:
1. Identify a recurring workflow problem users have
2. Define what the artifact looks like when done
3. Design the process (workflow stages)
4. Identify expertise needed (agents)
5. Derive the intake schema (the residual)

### Intake form architecture
Every template's intake form has three layers:
1. Structured fields (template-specific, form-rendered)
2. Materials upload (attachments, references, context)
3. Free-text notes (optional, unstructured)

The template definition should carry both its workflow (process + agents) and its intake schema (what to ask the user). These are two sides of the same design.

### Next steps
- Define the visual essay intake schema formally
- Rewrite the Turkana Boy prompt using only intake-level information
- Run it through the pipeline to validate the boundary
- Use the same meta-template process to design the YouTube transcript workflow
- Compare the two to validate the universal pattern

---

## Key Principles (New)

1. **The intake is the residual.** It captures only what varies per run and can't be inferred by the pipeline. Design it last.
2. **Templates encode expertise. Intakes capture intent.** Don't mix them.
3. **Problem → Artifact → Process → Expertise → Intake.** This is the sequence for designing any template.
4. **Three layers of intake: structured fields + materials + free-text.** Every template type follows this pattern.
5. **Progressive refinement, not prompt propagation.** The pipeline transforms intent into artifact through domain specialization. Each gate adds expertise, not just context.
6. **The intake size is a diagnostic.** Too many fields = under-designed agents. Too few = under-personalized output.
7. **Free-text prompt files are a temporary bridge.** The real solution is a structured intake form per template type. Until then, the intake schema is the boundary that keeps prompt files consistent.
