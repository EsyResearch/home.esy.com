# Engineer-First Rebrand & Homepage Redesign

**Date:** April 12, 2026
**Type:** Strategy Session — Brand Identity, Product Positioning, Homepage Architecture
**Status:** Active — Supersedes all prior consumer-facing positioning. Esy is now engineer-first.
**Context:** Resolves a long-standing design target conflict between consumer and technical audiences. Consolidates brand identity, name etymology, visual identity (wordmark), content funnel, and homepage structure into a single coherent direction.

---

## The Core Decision

**Esy is engineer-first.** Consumers can use `app.esy.com` at a higher cost per run — they're paying for access to infrastructure built for practitioners. The long-term product is `api.esy.com`.

### Why This Resolves the Conflict

The previous tension: designing for both consumers and engineers simultaneously forces compromises on UX, pricing, documentation, and messaging. Picking engineers as the design target eliminates that entirely. Consumers don't disappear — they just pay more for what they get. That's economically honest.

---

## Brand Identity: Name & Etymology

### Esy = Essay Synthesis

**Pronunciation:** Eh-see (not E-S-Y spelled out)

The name derives from **Essay Synthesis** — but "essay" here carries its original meaning from the French *essayer*: to attempt, to try, to experiment. Not the five-paragraph school paper.

Under this framing:
- **Essay** = an attempt, an experiment, a structured try at producing something real
- **Synthesis** = the pipeline that turns the attempt into verified, publishable output

This covers the full artifact spectrum without constraint:
- A visual essay with citation chains is an essay (attempt → synthesis)
- A batch of clip art with verified subject data is an essay (attempt → synthesis)
- A coloring page with accurate dinosaur anatomy is an essay (attempt → synthesis)
- A research brief with source verification is an essay (attempt → synthesis)

The acronym is a backstory, not a pronunciation guide — like IKEA (Ingvar Kamprad Elmtaryd Agunnaryd) or Haribo (Hans Riegel Bonn). "Esy, pronounced Eh-see" is the brand. "Essay Synthesis" is what someone finds on the About page.

---

## Visual Identity: Wordmark

### Logo Change

Replaced the old image-based logo across all properties with a typographic wordmark:

- **Font:** Black Ops One (Google Fonts)
- **"e"** in brand teal `#00A896`
- **"sy"** in theme-aware color (near-white on dark, near-black on light)
- **Size:** controlled by `--wordmark-size` CSS variable (currently `2.5rem`)

### Favicon

New teal "e" mark (geometric/octagonal) replaces old favicon across all sizes (16, 32, 192, 512, apple-touch-icon, favicon.ico).

### Where Updated

- `esy.com` — nav, footer, all essay headers, glossary navs, scrollytelling nav/theatre bar, newsletter modal, infographic artifact footer, 3D specimen loaders
- `app.esy.com` — signin, signup, dashboard side-rail

### Other Fonts Loaded (for future comparison)

- ZCOOL XiaoWei (`--font-zcool-xiaowei`) — distinctive character at wordmark scale
- Noto Serif JP (`--font-noto-serif-jp`) — clean and strong

Both are available via `wordmarkFont` prop on the Logo component: `"zcool"`, `"noto"`, or `"blackops"`.

---

## Brand Palette (Confirmed)

| Token | Value | Usage |
|-------|-------|-------|
| Navy | `#0A2540` | Primary dark background |
| Teal | `#00A896` | Brand accent, "e" in wordmark, CTAs |
| Teal light | `#00D4AA` | Gradients, hover states |

---

## Content Funnel

```
YouTube (@EsyDotCom)
  → agentic workflow demos, coding tools, artifact development
  → neuroscience / evolution of intelligence as subject matter

synthesize.esy.com (Substack)
  → written workflow breakdowns
  → newsletter companion to YouTube

esy.com/research (builder's log)
  → how templates and workflows are built
  → tutorials on AI coding tools and third-party research tools
  → practitioner content for the engineer audience

esy.com/docs (future)
  → end-user template guides, configuration, API reference
  → migrated from /school when ready

app.esy.com
  → the product: run workflow templates, get artifacts

api.esy.com (future)
  → what engineers eventually build on
```

### Social Links

- YouTube: `youtube.com/@EsyDotCom`
- Substack: `synthesize.esy.com`
- LinkedIn: commented out (B2B convention, not needed yet)

---

## Homepage Redesign

### Previous Structure (6 sections)

1. Hero — "Choose a template. Get a publishable artifact."
2. Template grid — 3 template cards
3. How It Works — 4 steps
4. Artifacts gallery — infographics + visual essays
5. Final CTA — "Ready to build something defensible?"

### New Structure (3 sections)

1. **Hero** — "Agentic workflows. Real artifacts."
2. **Artifacts gallery** — infographics + visual essays with QA metadata
3. **Final CTA** — "Build something auditable."

### Hero Copy

- **Line 1:** "Agentic workflows."
- **Line 2 (gradient):** "Real artifacts."
- **Subhead:** "Subscribe to a workflow template. Esy automates research, citation verification, and quality assurance — then delivers a publishable artifact. Batch processing, structured output, auditable by default."
- **Primary CTA:** "Browse Templates" → `/templates`
- **Secondary CTA:** "View Artifacts" → `/essays/`

Key signals in the subhead: **subscribe** (service model), **automate** (agents), **batch processing** (clip.art use case without naming it), **structured output** (not chat), **auditable** (citation chain).

### Artifacts Section

- **Eyebrow:** "Workflow Output"
- **Headline:** "Artifacts produced by these workflows"
- **Description:** References the agentic pipeline, citation verification, QA. Source counts and verification status attached to each card.

### Final CTA

- **Headline:** "Build something auditable."
- **Description:** "Start from a template. Let agents handle the pipeline."
- **Primary CTA:** "Browse Templates" → `/templates`
- **Secondary CTA:** "Follow the Research" → `https://synthesize.esy.com`

### What Was NOT Changed

- CircuitCanvas (pipeline visualization) — kept, correct signal for engineers
- Infographic coverflow component
- Visual essays grid + metadata (source counts, QA badges)
- CSS/styling + all theme support
- Navigation and footer (updated earlier in session)

---

## Page Metadata

- **Title:** "Esy — Automate & Audit. Agentic Workflows."
- **Description:** "Agentic workflows that produce citation-verified, publishable artifacts. Subscribe to a workflow template. Get structured, auditable output."
- **Twitter:** `@EsyDotCom`

---

## Template Model (Clarified)

Templates are predefined workflow pipelines. Users don't create workflows — they **subscribe to a template**. This is the Costco model: individuals can buy, but practitioners running at scale are the real customer.

Templates remain meaningful and are linked from the homepage CTA. They just don't get their own homepage section — the hero handles that message.

---

## Research Identity

**The evolution of intelligence across all life on Earth** — from single-cell organisms through the human brain to AI as the latest expression. This is the core subject matter for YouTube content and synthesize.esy.com. Agentic workflows are the production method; intelligence is the subject.

---

## Navigation Update

- **Header nav:** Artifacts, Templates, Research, App
- **School** removed from header nav and footer. Content to migrate to /docs when ready.
- **Research** added to header nav — links to /research (builder's log, workflow architecture, AI tool tutorials)

---

## Glossary Pivot: Writing → AI/Agentic

### Current State

The glossary at `/glossary` contains 38 academic writing terms (thesis statement, MLA style, comma splice, etc.) — entirely consumer/student-facing. Stored as markdown in `src/content/glossary/`, hardcoded index in `page.tsx`, search JSON at `public/glossary-terms.json`.

### New Direction

Pivot to an **AI and agentic workflow glossary** — the Cloudflare model. Own the definitions for agentic/AI terminology the way Cloudflare owns networking terms.

Target terms (initial set):
- Agentic workflow, agent loop, tool use, function calling
- RAG, retrieval-augmented generation, vector embedding
- Hallucination, grounding, citation verification
- Prompt chaining, pipeline orchestration
- Structured output, JSON schema, typed artifacts
- Batch processing, queue, job runner
- QA agent, verification step, audit trail

### Content Architecture

```
/glossary/[term]              → quick definition (200-500 words)
  └── links to → /agents/[agent]   → deep dive on the agent/tool that implements it
```

Examples:
- `/glossary/citation-verification` → defines the concept → links to `/agents/citation-verifier`
- `/glossary/batch-processing` → defines the pattern → links to the relevant agent
- `/glossary/structured-output` → defines what it means → links to agents that produce it

The glossary captures **search intent** (people looking up terms). Agent pages capture **product intent** (people evaluating tools). Cross-linking strengthens both.

### Migration Plan

1. Archive existing writing glossary terms (they're indexed in SERPs)
2. Set up 301 redirects from old `/glossary/[writing-term]` to glossary index or relevant new term
3. Replace index page content and metadata for AI/agentic positioning
4. Write new AI/agentic term markdown files
5. Regenerate `glossary-terms.json` via `scripts/generate-glossary-json.js`

---

## What's NOT Ready

- `/research` — linked in nav but content still being built. Builder's log format.
- `/docs` — future home for end-user template guides (currently at /school).
- `/glossary` pivot — planned, current writing terms still live. Migration to AI/agentic terms pending.
- `api.esy.com` — future product, mentioned in strategy but not on site.
