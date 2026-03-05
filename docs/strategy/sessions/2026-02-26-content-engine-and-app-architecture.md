# Content Engine & app.esy.com Architecture

**Date:** February 26, 2026 (Part 2)
**Type:** Strategy Session — Content Strategy, SEO, Product Architecture
**Continues:** [Template Design & Intake Architecture](./2026-02-26-template-design-and-intake-architecture.md)

---

## Context

This session continued from the intake architecture discussion into broader strategic territory: what content theme to pursue, how to grow traffic from a DR 21 baseline, what to build next, and how app.esy.com should publish artifacts to esy.com.

---

## Content Theme Decision: Intelligence

Evaluated two candidates for Esy's primary visual essay theme:

### Intelligence (from life to machines) — SELECTED

Covers biological intelligence (evolution, neuroscience), cognitive science (memory, learning, perception), artificial intelligence (history of computing, neural networks), and philosophy of mind (consciousness, the hard problem).

**Why it wins:**
- EdTech alignment is near-perfect — these are curriculum topics students and educators search for
- The existing paleoanthropology cluster (Lucy, Seven Million Years, Homo naledi) already fits — human evolution IS the story of intelligence emerging
- Deep SEO clustering potential: 4+ natural clusters (biological, cognitive, artificial, philosophical) each 5-10 essays deep, all cross-linking
- Evergreen at the core — how the brain works doesn't change when a new model drops
- Brand-safe — no political risk, no controversy
- Direct template showcase — artifacts demonstrate the product for the target audience

### Geopolitics — REJECTED as primary theme

**Why it loses for Esy (despite personal passion):**
- Politically divisive — one perceived-biased essay on Israel-Palestine or Taiwan could define the brand and repel EdTech buyers (schools, universities, parents)
- Poor EdTech fit — geopolitics isn't a standard educational workflow; the artifacts don't drive template adoption
- Not truly evergreen — current events shift quarterly, breaking the "publish once, compound forever" model
- Competes with institutional players (Foreign Affairs, The Economist, Brookings) with massive domain authority
- SEO clusters are regional and fragmented rather than conceptually interlinked

**Compromise:** Occasional historical-geopolitical essays (the history of borders, how maps lie, the Silk Road) can live in a "history" category without making geopolitics a primary theme.

---

## SEO Baseline (March 2026, Ahrefs)

| Metric | Value | Assessment |
|---|---|---|
| DR (Domain Rating) | 21 | Low-moderate. Need 40+ for mid-tail page 1 rankings. |
| Organic keywords | 14 | Just starting. Site barely exists in Google's index. |
| Organic traffic | 47/month | Essentially zero. |
| Referring domains | 60 (declining -17) | Red flag. Losing links faster than gaining. |
| Positions | Mostly 21-50 | Page 2-5. Not where people click. |
| ChatGPT citations | 79 (+37) | Interesting. AI systems recognize content quality. |

### The bottleneck is DR, not content

500 perfect pages at DR 21 would mostly sit at positions 21-50. DR is the ceiling on which keywords you can rank for:
- DR 20-25: Long-tail only
- DR 30-35: Some mid-tail
- DR 40-50: Competitive mid-tail
- DR 50+: Head terms (not happening in 12 months)

Content volume helps with topical authority signals, but DR is driven primarily by backlinks from external domains.

### 12-month traffic projection (with 500 pages)

| Scenario | Monthly organic (Month 12) | Key variable |
|---|---|---|
| Content-only (no active link building) | 8,000-15,000 | DR grows to ~28-32 |
| Content + active link building | 30,000-60,000 | DR grows to ~38-45 |
| Content + links + viral pieces | 60,000-120,000 | DR grows to ~45-55 |

---

## Three-Pillar Content Strategy

### /essays — Showcase + Evergreen SEO

Visual essays in the intelligence theme. Produced through the workflow pipeline (currently internal, moving to app.esy.com). Tightly clustered around intelligence sub-themes. Demonstrates product capability. Earns educational backlinks (Wikipedia, teacher resource lists).

**Audience:** Students, educators, curious readers
**Conversion path:** Indirect — admire artifact → realize it was template-produced → try the template
**DR contribution:** Moderate (educational links)

### /school — Conversion Funnel + High-Intent SEO

Tutorials and workflow guides targeting people actively solving problems. "How to write a research paper with AI," "Best Notion templates for students" (with Esy as the better alternative), "How to use ChatGPT for essay writing" (with Esy workflow as the structured version).

**Audience:** Students and educators actively looking for workflow solutions
**Conversion path:** Direct — searching for solution → finds tutorial → sees Esy template as easier path → uses template
**DR contribution:** Moderate-high (tutorial aggregators, educational resource links)

Third-party app tutorials (Notion, ChatGPT, Google Docs) are SEO arbitrage — piggybacking on established brand search volume while positioning Esy as the streamlined alternative.

### /research — DR Engine + Build-in-Public

Engineering deep dives about building Esy. Not generic AI tool tutorials — content grounded in a real product with real architecture. "How we built a 17-gate visual essay pipeline with Claude Code," "Multi-agent orchestration: how Esy's runner coordinates 9 specialized agents."

**Audience:** Developers, AI builders
**Conversion path:** Indirect — but earns high-quality developer backlinks that raise DR for the whole domain
**DR contribution:** Highest per piece (developer blogs, HN, Reddit)

**Key principle:** The research content isn't "Claude Code tutorial." It's "how we built Esy" and Claude Code is the medium. The subject is workflow architecture. The tools are incidental.

---

## Link Building Strategy (Priority Order)

### Highest impact, lowest effort
1. **Wikipedia citations** — Visual essays are exactly what Wikipedia articles need as external links. Educational, cited, interactive.
2. **Educational resource lists** — Teachers curate "best resources for teaching X" pages on .edu sites and blogs. Email curators with genuine value.
3. **Embed strategy** — Make key visualizations available as standalone embeds with attribution links. Every embed is a backlink.

### Medium effort, strong impact
4. **Science communication communities** — Reddit (r/dataisbeautiful, r/Paleoanthropology, r/AskScience), Hacker News, science Twitter/Bluesky.
5. **Guest contributions to education sites** — Short pieces for EdSurge, The Conversation, Smithsonian blog, EdTech Magazine linking back to full essays.
6. **HARO / journalist queries** — Respond as expert source when journalists write about relevant topics.

### Slow compound
7. **Original data and visualizations** — Best-in-class charts become citation magnets. Other writers link because no better visualization exists.
8. **Broken link building** — Find dead links on educational sites, offer your content as replacement.

**Goal:** 60 referring domains (declining) → 200+ referring domains (growing). That alone pushes DR from 21 to 35-40.

---

## Production Economics

Visual essays take ~1 hour through the internal pipeline (Claude Code orchestrating 17 gates, human-in-the-loop approval). This means 3-4 essays/day is feasible.

However: the internal pipeline has served its purpose. 80+ essays have proven the workflow, validated the gate structure, and revealed the intake architecture. Continuing to produce internally is content production, not R&D.

**The priority is building app.esy.com so production moves to the product.**

---

## Weekly Allocation (Until app.esy.com Launches)

| Priority | Time | Focus |
|---|---|---|
| app.esy.com development | 60% | Workflow engine, intake forms, artifact storage, admin CMS, universal renderer |
| School content | 25% | 2-3 tutorials/articles per week targeting high-intent queries |
| Visual essays (internal) | 10% | 1-2 per week, maintaining cluster growth |
| Research / build-in-public | 5% | 1 piece every 2 weeks, high-impact DR plays |

**This allocation flips when app.esy.com launches.** Essay production moves to the app. Content time shifts to school tutorials that funnel users to the app.

---

## app.esy.com Publish Architecture

### The problem

Currently, each essay is a bespoke React component checked into git (e.g., `LucyClient.tsx` is 2,600 lines of custom React + D3). This doesn't work when app.esy.com needs to publish dynamically. You can't deploy a new Next.js build for every artifact.

### The solution: Admin CMS + Universal Renderer + ISR

**Universal Renderer:** The pipeline produces structured data (sections, text, visualization configs, images, metadata), not bespoke code. A universal `VisualEssayRenderer` component interprets the data and renders any essay. The essay is data, not code.

**Storage:** Artifacts stored as structured JSON in Supabase. Assets (images, 3D models) in Cloudflare R2 (already using images.esy.com).

**Admin CMS (thin):** Not a WordPress-style editor. The pipeline writes the content. The CMS is just the publish/manage layer:
- List of completed artifacts with status (draft / published / unpublished)
- Publish action: set slug, category, cluster assignment
- Metadata editing: title, description, OG image
- Preview before publish

**ISR delivery:** A catch-all route at `src/app/essays/[...slug]/page.tsx` fetches from Supabase and renders with the universal renderer. Next.js ISR caches the result as static HTML. Same performance as bespoke pages.

Existing bespoke essays (Lucy, Homo naledi, etc.) coexist — static routes resolve first, catch-all handles everything else.

### Publish flow

```
Admin clicks "Publish to esy.com"
  → Validates: all gates passed, slug available, metadata complete, OG image exists
  → Writes publish record to Supabase (status → published, published_at, slug, category)
  → Calls POST /api/revalidate on esy.com with the slug + secret key
  → esy.com invalidates cache for that path + index page + sitemap + cluster siblings
  → Next visitor gets a fresh server render, which is then cached
  → Page is live with full SEO (metadata, structured data, OG tags)
```

**Edits:** Same flow — update Supabase, call revalidate, cache refreshes.

**Unpublish:** Set status to unpublished, revalidate, catch-all returns 404.

### Revalidation API

```typescript
// src/app/api/revalidate/route.ts
export async function POST(request: Request) {
  const { slug, secret } = await request.json();
  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }
  revalidatePath(`/essays/${slug}`);
  revalidatePath('/essays');
  revalidatePath('/sitemap.xml');
  return Response.json({ revalidated: true });
}
```

---

## Two-Tier Artifact Visibility

### User sharing (app.esy.com)

Every artifact a user creates gets a shareable URL: `app.esy.com/a/{artifact-id}`. Users can send it to professors, colleagues, friends. The page renders their artifact with the universal renderer and includes "Made with Esy" branding.

- URL: `app.esy.com/a/{id}`
- Who decides: the user
- SEO indexed: **No** (`noindex`) — user artifacts must not dilute esy.com's domain authority
- Quality control: none needed
- Purpose: viral growth, portfolio building, assignment submission
- Every shared link is a Esy ad (Canva's growth model)

### Admin publishing (esy.com)

Only admin can publish artifacts to esy.com. These are curated showcase pieces with full SEO.

- URL: `esy.com/essays/{category}/{slug}`
- Who decides: admin only
- SEO indexed: **Yes** (full metadata, structured data, sitemap, OG tags)
- Quality control: admin curation
- Purpose: SEO, brand showcase, product demonstration

---

## The Content Engine (The Real Product)

The visual essay pipeline was the proof of concept. app.esy.com is the product.

**What we're actually building:** A platform where you define a workflow template once — intake schema, pipeline stages, agents, quality gates, artifact format, renderer — and then produce publishable artifacts at scale. Each new template type opens a new artifact format, a new audience, a new SEO surface area.

The competitive moat isn't "we have 1,000 visual essays." It's "we have a system that can produce any structured artifact type at scale, and we keep adding new types." Every new template widens the moat.

### Template-creation loop

```
Define problem → Define artifact → Design process → Identify agents → Derive intake
  → Build pipeline → Build renderer → Add to app.esy.com
  → Produce artifacts at scale → Publish to esy.com → Compound SEO
  → Repeat for next template type
```

### Scale vision

- 10-20 workflow templates (visual essay, research brief, infographic, transcript outline, literature review, case study, course syllabus...)
- Each template producing artifacts at scale through the engine
- Each artifact type with its own renderer on esy.com
- esy.com becomes a multi-format educational content library — all produced by the engine, all showcasing the product, all compounding SEO
- app.esy.com users see the library and think "I want to make one of these"

---

## Key Decisions Made

1. **Intelligence is the primary content theme.** Geopolitics is a personal passion, not a product strategy.
2. **Three pillars: essays (showcase), school (conversion), research (DR).** Each serves a different function in the growth engine.
3. **Stop producing essays internally.** The pipeline is proven after 80+ runs. Build app.esy.com.
4. **Admin-only publish to esy.com.** Users get shareable links at app.esy.com. Only admin curates the esy.com showcase.
5. **Universal renderer + ISR + Supabase.** Structured artifact data, not bespoke React components.
6. **The product is the template-creation system, not any single template.** Visual essays were the proof of concept.

---

## What to Build (Priority Order)

1. **Visual essay artifact schema** — define the structured data format that represents a complete essay
2. **Universal renderer** — a component that renders any essay from the schema
3. **Supabase storage layer** — tables for artifacts, metadata, publish status
4. **Adapt G5** — pipeline outputs structured data instead of bespoke React components
5. **Admin CMS screens** — artifact list, publish action, metadata editor, preview
6. **ISR catch-all route** — `src/app/essays/[...slug]/page.tsx` reading from Supabase
7. **Revalidation API** — webhook endpoint for publish/edit/unpublish
8. **User sharing** — `app.esy.com/a/{id}` with universal renderer + "Made with Esy" branding
