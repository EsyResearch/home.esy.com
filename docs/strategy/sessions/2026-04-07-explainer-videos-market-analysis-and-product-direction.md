# Explainer Videos: Market Analysis & Product Direction

**Date:** April 7, 2026
**Type:** Strategy Session — Market Analysis, Product Expansion, Business Model Evaluation
**Status:** Active — Defines the near-term revenue path and product expansion strategy.
**Context:** Triggered by Ahrefs keyword research on the U.S. explainer video market. Evaluates whether to pivot Esy into AI explainer videos for B2B, ship the existing visual essay platform, or integrate explainer videos as a new artifact type. Concludes with a decision to add explainer videos to the existing Esy template/workflow/artifact system as the primary near-term revenue path.

---

## The Trigger

Three factors converged on April 7, 2026:

1. **Esy has not shipped its SaaS product.** The visual essay platform at app.esy.com remains unvalidated. Signups occur organically without marketing, but there is no data on who these users are, what they'd pay for, or whether the product solves a problem they'd spend money on. The Author Agents vision (March 11) and Channel & Funnel Architecture (March 24) are compelling strategy documents, but they describe a future that hasn't been tested against reality.

2. **clip.art is operational and semi-automated.** clip.art (a division of Esy LLC) is a working AI animation product using Kling 3.0 via Fal.ai. It generates images, animates them, pushes to YouTube, creates SEO pages per generation, and supports bundle creation for purchase. The founder produces 50-100 images/day with prompts from Claude AI, with plans for batch processing and daily agent automation. clip.art demonstrates existing capability in AI image/video generation and provides a functioning content/SEO flywheel that requires minimal ongoing attention.

3. **Ahrefs data on explainer videos revealed a clear B2B market.** A keyword export for "explainer videos" matching terms (U.S.) showed a niche with identifiable buyers, proven willingness to pay, and low keyword difficulty — a contrast to the visual essay market where the buyer is unknown.

The central question: **Where should the founder's active time go for the next 3-6 months?**

---

## Market Analysis: Explainer Videos (U.S.)

### Search Volume — Top Keywords

| Keyword | Volume (mo) | Difficulty | CPC | Trend | Traffic Potential |
|---------|-------------|-----------|-----|-------|-------------------|
| explainer videos | 900 | 35 | $4.00 | Declining (~1,191 → ~888) | 2,200 |
| animated explainer videos | 400 | 3 | $2.50 | Declining (~688 → ~409) | 3,900 |
| ai explainer videos | 200 | 5 | $2.00 | **Growing (~174 → ~213)** | 3,100 |
| saas explainer videos | 200 | 0 | $3.00 | **Growing (~91 → ~198)** | 70 |
| corporate explainer videos | 200 | 3 | $13.00 | Stable | 700 |
| explainer videos company | 200 | 56 | $16.00 | Stable | 2,700 |
| explainer videos for business | 150 | 31 | $14.00 | Stable | 350 |
| product explainer videos | 150 | 2 | $9.00 | Stable | 3,600 |
| b2b explainer videos | 90 | 2 | $3.50 | **Growing (~43 → ~88)** | 150 |
| startup explainer videos | 90 | 0 | $4.00 | Stable | 600 |
| tech explainer videos | 150 | 0 | $6.00 | Stable | 50 |

*Source: Ahrefs Keywords Explorer, data pulled April 7, 2026. Full CSV: `google_us_explainer-videos_matching-terms_2026-04-07_14-35-51.csv`*

### Search Intent Breakdown

**Not all "explainer video" searches are B2B purchase intent.** The 750+ keywords in the dataset break into four distinct intent buckets. Treating the full cluster as commercially addressable would overstate the opportunity.

**Bucket 1: B2B / Commercial — businesses looking to buy or hire (~1,400-1,800/mo)**

These are the only keywords that represent potential clients for a services business:

| Keyword | Volume | CPC | Signal |
|---------|--------|-----|--------|
| corporate explainer videos | 200 | $13.00 | Direct purchase intent |
| explainer videos company | 200 | $16.00 | Looking for a provider |
| saas explainer videos | 200 | $3.00 | Vertical-specific buyer |
| explainer videos for business | 150 | $14.00 | Direct purchase intent |
| product explainer videos | 150 | $9.00 | Product-focused buyer |
| explainer videos production | 150 | $12.00 | Looking for production |
| b2b explainer videos | 90 | $3.50 | Vertical-specific buyer |
| explainer videos agency | 90 | $6.00 | Looking for a provider |
| startup explainer videos | 90 | $4.00 | Vertical-specific buyer |
| affordable explainer videos | 100 | $13.00 | Price-sensitive buyer |

**Bucket 2: Educational / Academic — people wanting concept explanations (~400-600/mo)**

These searchers want videos that explain academic or scientific concepts, not product explainers:

| Keyword | Volume | Signal |
|---------|--------|--------|
| medical explainer videos | 150 | Healthcare education |
| educational explainer videos | 90 | Classroom content |
| explainer videos for education | 60 | Classroom content |
| quantum entanglement explainer videos | 30 | Science concept |
| vox explainer videos | 10 | Media/journalism style |
| bbc explainer videos | 10 | Media/journalism style |
| science explainer videos | 20 | Science concept |
| climate change explainer videos | 10 | Topic-specific |

**Bucket 3: DIY / Tool seekers — people who want to make their own (~300-500/mo)**

These searchers want software or tutorials, not a production company. Many end up at Canva (the top-ranking result for "ai explainer videos" is Canva's free video maker page):

| Keyword | Volume | Signal |
|---------|--------|--------|
| how to make explainer videos | 70 | Tutorial seeker |
| create explainer videos | 60 | Tool seeker |
| create explainer videos with ai | 60 | AI tool seeker |
| best explainer video maker | 70 | Tool comparison |
| explainer videos software | 20 | Tool seeker |
| free explainer videos | 10 | Free tool seeker |

**Bucket 4: Ambiguous head terms — mixed intent (~1,500-2,000/mo)**

These head terms contain a mix of all three buckets above. Estimated B2B purchase intent is 25-35% of the volume:

| Keyword | Volume | Likely split |
|---------|--------|-------------|
| explainer videos | 900 | ~250-300 B2B, rest split across educational/DIY/browsing |
| animated explainer videos | 400 | ~100-140 B2B, rest DIY/educational |
| ai explainer videos | 200 | ~70-100 B2B, rest DIY tool seekers |
| best explainer videos | 200 | Mostly browsing/inspiration, minimal purchase intent |

### Key Findings

**The commercially addressable search volume is ~1,400-1,800/mo from explicit B2B terms, plus an estimated 25-35% of ambiguous head terms — totaling roughly 2,000-2,500 monthly searches with real purchase intent.** This is smaller than the raw cluster suggests but still sufficient for a services business that needs 2-3 clients/month, not 2,000 visitors.

**Head terms are declining.** "Explainer videos" dropped ~25% over two years (1,191 → 735-888 range). "Animated explainer videos" dropped ~40% (688 → 305-409 range). The generic category is mature.

**AI and SaaS variants are growing.** "AI explainer videos" grew from ~174 to ~213. "SaaS explainer videos" more than doubled from ~91 to ~198. "B2B explainer videos" doubled from ~43 to ~88. The growth is in the AI-specific, vertical-specific sub-categories — which are also the most commercially valuable.

**High CPCs on commercial terms confirm buyer intent.** Keywords like "explainer videos company" ($16 CPC), "corporate explainer videos" ($13 CPC), and "explainer videos for business" ($14 CPC) reflect agencies bidding for project leads worth $2K-$25K. Advertisers don't pay $16/click for educational browsers.

**Keyword difficulty is very low.** Most commercially relevant terms have difficulty scores of 0-5, requiring only ~6 referring domains to rank in the top 10. This is achievable within 2-3 months for a site with esy.com's existing domain authority.

**Traffic potential exceeds raw volume for AI terms.** "AI explainer videos" has 200/mo search volume but 3,100 traffic potential and $18.9K estimated traffic value — indicating that ranking for this term captures significant adjacent traffic. However, a portion of this traffic is DIY/tool-seeker intent (Canva ranks #1), not purchase intent.

**SEO alone won't drive the business.** With ~2,000-2,500 monthly searches of real B2B intent and realistic ranking positions, organic search might deliver 100-300 qualified visitors/month. At a 2-3% inquiry rate, that's 2-9 leads/month from SEO. Viable as a supplement, but LinkedIn outreach, cold email, and portfolio-driven sales will be the primary client acquisition channels.

### Comparison to Prior Market Targets

| Metric | Essay Writing (March 11 data) | Explainer Videos (April 7 data) |
|--------|-------------------------------|--------------------------------|
| Total search volume | 24K/month transactional | 6-8K/month total (2-2.5K B2B intent) |
| Identified buyer | Students, professionals | Marketing teams, SaaS founders |
| Willingness to pay (validated) | Unknown (unshipped product) | Proven ($2K-$25K per video) |
| Revenue per customer | $12-$39/month subscription (projected) | $3K-$10K per project |
| Competitive landscape | Essay mills in decline (EssayPro -51K traffic) | Agencies + AI tools (Synthesia, HeyGen) |
| Time to first revenue | Unknown | 3-6 months |
| Primary acquisition channel | SEO (high volume) | Outreach + portfolio (SEO supplemental) |

---

## Competitive Landscape

### Initial Assessment (Overstated)

The initial analysis flagged a brutal competitive landscape: Synthesia ($1.5B+ valuation), HeyGen, Lumen5, Pictory, InVideo, Descript, Veed.io, Canva, and foundation model companies (Runway, Pika).

### Revised Assessment

Several factors reduce the competitive threat:

1. **Sora has been discontinued.** The single most threatening potential entrant (OpenAI's video generation model) is no longer in the market.

2. **Most competitors are platform-level, not services-level.** Synthesia, HeyGen, and others are self-serve tools. They compete for DIY users, not for businesses that want a professional to handle the entire production process. Many businesses prefer to hire a knowledgeable team rather than learn a tool themselves.

3. **The services market is fragmented.** Explainer video agencies range from solo freelancers on Fiverr to premium shops charging $25K+. There is room for a small, professional outfit that combines AI production efficiency with hands-on expertise — offering agency quality at below-agency pricing.

4. **"AI explainer videos" is an underserved positioning.** The top-ranking result for this term is Canva's generic video maker page. No one is specifically positioning as "we use AI to produce better explainer videos faster and cheaper." This is open territory.

---

## Options Evaluated

### Option 1: Full Pivot to Explainer Videos (Rejected)

**What it meant:** Redesign esy.com entirely around explainer video production. Abandon visual essays, school content, and existing SEO assets.

**Why it was rejected:** The existing assets (96+ visual essays, school articles, SEO pages, organic signups) have compounding value. A full pivot destroys that value for an unproven direction. The "add, don't pivot" approach carries less risk.

### Option 2: Ship Esy Visual Essay Platform and Test for 3 Months (Rejected)

**What it meant:** Launch the visual essay SaaS at app.esy.com, market it, and see if anyone pays.

**Why it was rejected:** Testing requires a hypothesis about who will pay for what. The current state is: "I don't know who would pay to produce visual essays." Shipping a product without a buyer hypothesis isn't testing — it's wandering. Three months of wandering delays revenue and produces vanity metrics (signups, page views) instead of revenue metrics (paying customers). The learning gap isn't about the product — it's about the market.

### Option 3: Add Explainer Videos as a New Artifact Type (Selected)

**What it means:** Keep all existing Esy assets. Add explainer videos as a new template/workflow/artifact category. Build a dedicated B2B landing page at `esy.com/explainer-videos`. Use app.esy.com to build the production workflows. Produce portfolio work, then sell services to businesses.

**Why it was selected:**
- Lowest risk — nothing is lost, everything is additive
- Clear buyer — marketing teams and founders at B2B/SaaS companies
- Proven willingness to pay — the explainer video services market is established
- Fastest path to revenue — 2-3 clients at $3K-$5K each = meaningful income
- Natural brand fit — an explainer video is an essay in a different medium
- Existing architecture supports it — the template → workflow → artifact system maps directly to video production

---

## Why Explainer Videos Are Natural to the Esy Brand

### The Etymology Chain

Esy → Essai → Essay → Explain → Educate

The word "essay" derives from the French *essai* — "an attempt, a trial, a way of thinking something through." An explainer video is exactly that: an attempt to think through a product or concept clearly enough to explain it to someone else in 60-90 seconds.

### The Workflow Maps Directly

| Esy Workflow (Current) | Explainer Video Workflow |
|----------------------|------------------------|
| Your Sources (PDFs, citations, notes) | Product docs, URLs, briefs, brand guidelines |
| Research & Analysis | Script research, competitive analysis, messaging strategy |
| Verify / Structure | Script review, storyboard, factual accuracy check |
| Your Artifact (Essays, Visuals, Reports) | Your Artifact (Essays, Visuals, Reports, **Videos**) |

"Videos" becomes another artifact type in the same system. The template changes, the workflow adapts, but the philosophy is identical: take sources, synthesize understanding, produce a structured artifact.

### The "E" Cluster

The Esy brand naturally clusters around a set of "E" associations that reinforce each other:

- **Esy** — the brand name
- **Essai/Essay** — the etymological root, the act of attempting to understand
- **Explain** — the core service (explainer videos, visual essays)
- **Educate** — the school, courses, educational content
- **Easy** — the phonetic impression, the promise ("we make complex things easy to understand")

This isn't a forced acronym. It's a natural convergence. The brand was built for explanation without explicitly planning for it.

### Unified Positioning

> **Esy explains things.**

Visual essays explain science. Explainer videos explain products. The school educates on AI skills. clip.art provides visual assets. Everything converges on one concept: synthesis and explanation.

---

## The Unified Esy LLC Business Architecture

### Three Products, Clear Roles

```
Esy LLC
├── clip.art (B2C Content Flywheel)
│   ├── AI image generation + animation (Kling 3.0 via Fal.ai)
│   ├── SEO page per generation
│   ├── YouTube upload pipeline
│   ├── Bundle creation and purchase
│   ├── 50-100 images/day, scaling to batch + agent automation
│   └── Runs semi-autonomously — minimal active attention required
│
├── esy.com (B2B Services + SaaS)
│   ├── Explainer videos (NEW — primary revenue focus)
│   ├── Visual essays (EXISTING — SEO + brand proof)
│   ├── School + Courses (EXISTING — education + funnel)
│   ├── app.esy.com workflows for video production
│   └── Requires active attention — this is where the founder's time goes
│
└── api.esy.com (Long-Term Infrastructure — NOT a near-term product)
    ├── Quality verification for AI-generated content
    ├── Built as INTERNAL tooling first (script accuracy, content verification)
    ├── clip.art is the first internal customer
    ├── Becomes a public API only when internal tools are proven + external demand validated
    └── No active development as a standalone product for 6+ months
```

### Why This Structure Works

- **clip.art** compounds in the background through SEO and content volume. Every image is a page, every page is a potential ranking, every ranking is a potential sale. Low maintenance.
- **esy.com** is the active revenue engine. Explainer video services generate meaningful per-project revenue ($3K-$10K). The existing content (visual essays, school) continues to build domain authority and demonstrate capability.
- **api.esy.com** emerges from the work, not the other way around. Quality verification tools built for internal use across clip.art and explainer video production may eventually become a product — but only when proven through real usage and validated by external demand.

### Resource Allocation (Next 6 Months)

| Product | Time Allocation | Revenue Role |
|---------|----------------|-------------|
| clip.art | 10-15% (maintenance, automation improvements) | Passive — SEO traffic, bundle sales, YouTube |
| esy.com explainer videos | 70-80% (learning, building, selling) | Active — services revenue from B2B clients |
| esy.com existing assets | 5-10% (keep running, occasional updates) | Supporting — SEO, brand credibility, funnel |
| api.esy.com | 0% as standalone product | N/A — internal tooling only, built into workflows |

---

## Domain Assessment

**esy.com for explainer videos:** Mildly positive. A 3-letter .com carries inherent credibility. "Esy" sounds like "easy," which is strong positioning for a services business ("we make explaining things easy"). The domain is brand-neutral enough to support any vertical. A marketing director seeing `esy.com` on a proposal reads "established, professional" — not "random freelancer."

**clip.art for educational content:** Perfect. The domain is literally the product category. Reserved for the B2C image/animation flywheel. Not used for explainer video work.

---

## Execution Plan

### Phase 1: Learn and Build (Weeks 1-4)

**Objective:** Develop the craft and build the production pipeline.

- Study 20-30 SaaS explainer videos. Deconstruct: script structure, pacing, visual style, length, voiceover tone, CTA placement
- Build the explainer video workflow inside app.esy.com:
  - Intake: company URL, product description, target audience, tone, length
  - Script generation + human review
  - Storyboard / scene planning
  - Animation via API (Kling, Runway, or best available)
  - Voiceover via ElevenLabs
  - Assembly + final review
  - Output: finished explainer video artifact
- Produce 3-5 spec explainer videos for real SaaS products
  - Pick products you actually use or admire
  - These don't need to be perfect — they need to demonstrate understanding of the format
  - Each spec video doubles as a portfolio piece and a cold outreach tool

### Phase 2: Ship the Landing Page (Weeks 5-6)

**Objective:** Make the offering publicly visible and start generating inbound interest.

- Build `esy.com/explainer-videos` as a dedicated B2B landing page:
  - Portfolio of spec videos
  - Clear process description (intake → script → storyboard → animation → delivery)
  - Pricing guidance (or "starting at $X")
  - Contact / inquiry form
  - No mention of research artifacts, PDFs, or citations — this page speaks only to video buyers
- Write 2-3 SEO articles targeting:
  - "AI explainer videos" (200/mo, difficulty 5)
  - "SaaS explainer videos" (200/mo, difficulty 0)
  - "B2B explainer videos" (90/mo, difficulty 2)
- Add "Videos" to the artifact types listed on the Esy homepage

### Phase 3: Market and Sell (Weeks 7-12)

**Objective:** Get paying clients.

- Cold outreach on LinkedIn targeting SaaS founders and marketing leads
- Post spec videos as content: "I made an unsolicited explainer video for [Company]. Here's what I learned about their product by explaining it in 60 seconds."
- Offer first 2-3 projects at introductory pricing ($1.5K-$3K) to build real case studies and testimonials
- Track: inquiries, conversations, conversion rate, revenue
- Continue producing spec work for portfolio depth

### Decision Point: Month 3 (Early July 2026)

| Signal | Action |
|--------|--------|
| Paying clients or strong pipeline | Double down. Restructure esy.com messaging around explainer videos. Expand to product demos and video ads. |
| Some interest but no closed deals | Refine positioning, pricing, or outreach. Extend test by 6 weeks. |
| Zero traction despite consistent effort | Reassess. Consider shipping the visual essay platform or exploring a different direction. |

### Parallel: clip.art Continues on Autopilot

Throughout the entire 3-month period:
- Maintain 50-100 images/day production
- Launch packs and bundles as planned
- Implement batch processing and agent automation
- No strategic changes — let the flywheel compound

---

## Long-Term Scaling Path

### Stage 1 — Explainer Videos for SaaS (Months 1-6)

- Learn the craft, build the portfolio, get first clients
- One vertical (SaaS), one format (explainer videos)
- Revenue target: $5K-$15K/month from services
- Build and refine app.esy.com workflows through dogfooding

### Stage 2 — Add Product Demos + Short-Form Video Ads (Months 6-12)

- Existing clients naturally ask "can you also make us..."
- Product demos are adjacent (same skills, slightly different format)
- Short-form video ads (15-30 seconds) are compressed explainers
- Revenue shifts from project-based to retainer/recurring
- Revenue target: $15K-$30K/month
- app.esy.com handles workflow orchestration across all video types

### Stage 3 — Full AI Video Production Platform (Month 12+)

- Explainer videos, product demos, video ads, customer testimonials, social content
- Monthly retainers: $3K-$10K/client/month
- app.esy.com matures into self-serve SaaS alongside the services arm
- Internal quality verification tools may be ready to expose as api.esy.com
- clip.art continues compounding independently

### Why Video Ads Are the Natural Expansion

Explainer videos are a one-time purchase (1-3 per year per client at $3K-$10K). Video ads are recurring (5-20 new creatives per month per client). The transition from explainer videos to video ads solves the project-based revenue problem:

- **Same buyer** — the marketing team that hired you for the explainer also controls the ad creative budget
- **Same core skills** — scripting, visual storytelling, pacing, CTA design
- **Natural upsell** — the explainer video is the gateway into the account
- **Recurring revenue** — ad creative needs constant refreshing due to creative fatigue

---

## Revenue Model

### Near-Term: Services (Months 1-6)

| Tier | Deliverable | Price Range | Target |
|------|------------|------------|--------|
| Starter | 30-second explainer video | $1,500-$3,000 | Startups, early-stage SaaS |
| Standard | 60-second explainer video | $3,000-$5,000 | Series A-B SaaS companies |
| Premium | 90-second explainer + shorter social cuts | $5,000-$8,000 | Growth-stage companies |

**Target:** 2-3 clients/month for $6K-$15K/month revenue.

### Mid-Term: Services + Retainers (Months 6-12)

- Explainer video projects (one-time)
- Monthly ad creative retainers ($3K-$10K/month per client)
- Product demo videos (per-project or bundled with retainer)

### Long-Term: SaaS + Services (Month 12+)

- Self-serve video production workflows at app.esy.com (subscription)
- Premium services arm for clients who want hands-on production
- clip.art continues as independent B2C revenue stream

---

## Target Keywords for SEO

### Priority 1 — Write articles in Phase 2

| Keyword | Volume | Difficulty | CPC | Traffic Potential | Intent |
|---------|--------|-----------|-----|-------------------|--------|
| ai explainer videos | 200 | 5 | $2.00 | 3,100 | Informational, Commercial |
| saas explainer videos | 200 | 0 | $3.00 | 70 | Informational |
| b2b explainer videos | 90 | 2 | $3.50 | 150 | Informational |

### Priority 2 — Write articles in Phase 3

| Keyword | Volume | Difficulty | CPC | Traffic Potential | Intent |
|---------|--------|-----------|-----|-------------------|--------|
| startup explainer videos | 90 | 0 | $4.00 | 600 | Informational |
| product explainer videos | 150 | 2 | $9.00 | 3,600 | Informational |
| tech explainer videos | 150 | 0 | $6.00 | 50 | Informational |
| corporate explainer videos | 200 | 3 | $13.00 | 700 | Informational |

### Priority 3 — Landing pages for commercial intent

| Keyword | Volume | Difficulty | CPC | Traffic Potential | Intent |
|---------|--------|-----------|-----|-------------------|--------|
| explainer videos company | 200 | 56 | $16.00 | 2,700 | Commercial |
| explainer videos for business | 150 | 31 | $14.00 | 350 | Commercial |
| explainer videos production | 150 | 46 | $12.00 | 3,300 | Commercial |
| affordable explainer videos | 100 | 33 | $13.00 | 100 | Commercial |

---

## Key Decisions from This Session

1. **Explainer videos are added as a new artifact type at esy.com** — not a full pivot, not a replacement. The existing template → workflow → artifact architecture supports this natively.

2. **All existing Esy assets are preserved.** Visual essays, school articles, courses, SEO content, and organic signups remain untouched. They continue building domain authority and brand credibility.

3. **esy.com/explainer-videos gets a dedicated B2B landing page** with its own messaging. B2B video buyers never need to see the research artifacts framing unless they explore.

4. **Explainer video workflows are built inside app.esy.com** connecting to APIs for video generation (Kling, Runway, etc.), voiceover (ElevenLabs), and other services. The moat is in the UI, workflows, and expertise developed through practice.

5. **The founder's active time goes to explainer videos for the next 3-6 months.** clip.art runs on autopilot. Existing Esy content runs on autopilot. Explainer video craft, pipeline, and sales get focused attention.

6. **Services-first, SaaS-second.** Revenue comes from producing explainer videos for clients, not from selling software. The software exists to make production faster and better. It becomes a product only after it's proven through internal use.

7. **The Author Agents vision (March 11) is paused, not killed.** The voice-matching concept and essay market analysis may be revisited if the explainer video direction doesn't pan out. Nothing is deleted.

8. **The API business (api.esy.com) is not a near-term product.** Quality verification is built as internal tooling within clip.art and explainer video workflows. It becomes a public API only when internal tools are proven and external demand is validated. No active development as a standalone product for 6+ months.

9. **The long-term scaling path is: Explainer Videos → Product Demos → Video Ads.** Video ads solve the recurring revenue problem that project-based explainer video work creates. The transition is natural — same buyer, same skills, natural upsell.

10. **3-month decision point: early July 2026.** Paying clients or strong pipeline = double down. Zero traction = reassess.

---

## Updates to Existing Strategy Documents

### Supplements (does not replace)

| Document | Status |
|----------|--------|
| `ESY_DEFINITION.md` | Still canonical for brand philosophy. Explainer videos fit within the "structured thought → durable artifacts" framework. No changes needed. |
| `GROWTH_STRATEGY.md` | SEO-first approach still applies. Explainer video keywords are new SEO targets. Newsletter and email list strategy remains valid. |
| `2026-03-24-channel-funnel-architecture.md` | LinkedIn as primary channel for knowledge workers/corporate audience is directly applicable to explainer video B2B outreach. Two-audience model still holds. |

### Pauses (not replaced, not active)

| Document | Status |
|----------|--------|
| `2026-03-11-author-agents-product-vision.md` | Paused. The Author Agents vision is not the near-term direction. The essay market, voice-matching technology, and agent architecture may be revisited if explainer videos don't gain traction. The strategic analysis in this document remains valid as market research. |

---

## Source Data

- **Ahrefs keyword export:** `google_us_explainer-videos_matching-terms_2026-04-07_14-35-51.csv`
- **Data scope:** U.S. Google search, "explainer videos" matching terms, 750+ keywords
- **Data freshness:** Most keywords last updated between February-April 2026
- **Ahrefs overview screenshot:** "ai explainer videos" — KD 5, Volume 200, Traffic Potential 3.1K, Value $18.9K

---

*Last updated: April 7, 2026*
