# Workflow Strategy & Product Direction

**Date:** February 20, 2026
**Type:** Strategy Session

---

## Core Product Vision (Crystallized)

**Help users research anything using workflow templates that don't require prompt engineering, and get a reasonably reliable artifact.**

This is the one-liner. Everything we build should pass one test: does this help users research something without prompt engineering and get a reliable artifact?

### Key Differentiators
- **Workflows over prompts** — the template absorbs the prompt engineering, not the user
- **Research-first** — every workflow starts with real research, not just generation
- **Multi-artifact** — same engine produces text (essays, reports), visuals (infographics), and structured docs (RFCs, case studies)
- **Reasonably reliable** — real sources, structured reasoning, proper formatting, transparent methodology

### Competitive Position
- vs. ChatGPT: no prompt engineering required, produces formatted artifacts (not chat transcripts), real citations (not hallucinated)
- vs. Canva/Venngage: research-first design, not template-filling
- vs. Jasper/Copy.ai: structured workflow methodology, not single-shot generation
- vs. Notion templates: workflows that actually execute research, not empty structures

---

## Strategic Decisions

### Broad vs. Narrow
**Decision: Platform is broad. Workflows are specific. Distribution is focused.**

- The engine is general — it supports any research domain
- Each workflow template is an opinionated path through a specific domain
- Distribution goes through existing channels (visual essays, school articles, newsletter) which reach students, researchers, educators
- Internal discovery handles the rest — users who come for essays see other workflow types in the library

### Niche Selection
Not picking a single niche at the platform level. The niche is horizontal: "people who need to research something and don't want to learn prompt engineering." Workflow types provide vertical specialization.

### When to Expand
Expansion is a response to market signals, not a pre-planned strategy:
1. Users hacking the product for unintended use cases
2. Inbound from audiences you never marketed to
3. Growth in core segment plateaus
4. Revenue from core funds the experiment

Don't plan expansion. Earn the signal. Follow it.

---

## Existing Workflows (Already Built)

### Production-Ready
1. **Argumentative Essay** (wf-2) — Intake → Research → Outline → Draft → Cite & Format → Artifact
2. **Analytical Essay** (wf-3) — same pipeline, literary/critical analysis focus
3. **Expository Essay** (wf-4) — same pipeline, explanatory focus
4. **Narrative Essay** (wf-5) — same pipeline, story arc focus
5. **Research Paper** (wf-6) — same pipeline, lit review + methodology focus
6. **College Application Essay** (wf-7) — same pipeline, personal narrative + program research
7. **Research Infographic** (wf-1) — Intake → Research → Design → Render → Artifact (different pipeline, visual output)

### In Progress
- Conceptual Essay — implemented in agents, JSON workflow pending
- Process Essay — skill defined, workflow not implemented

### Key Observation
The 6 essay workflows share the same 6-stage pipeline with slightly different intake questions. They're effectively one product with six presets, not six products. The infographic workflow is the first truly distinct artifact type.

---

## Template Opportunities Identified

### 50 Pain-Resolving Workflows (Full List)

#### Career & Work
1. Salary Negotiation Prep (F)
2. Career Pivot Research (P)
3. Job Offer Comparison (B)
4. Promotion Case Document (B)
5. "Should I Quit?" Decision Framework (P)
6. Layoff Survival Plan (F)
7. Performance Review Self-Assessment (F)

#### Freelance & Solo Business
8. Freelance Launch Plan (B)
9. Client Proposal (P)
10. Scope of Work / SOW (B)
11. Rate Increase Justification (F)
12. Client Results Case Study (P)

#### Engineering & Technical
13. Technical RFC / ADR (P)
14. Tech Stack Evaluation (P)
15. Incident Post-Mortem (B)
16. System Migration Plan (P)
17. Build vs. Buy Analysis (P)
18. Technical Debt Prioritization (B)

#### Education & Academic
19. College Application Strategy (B)
20. Grad School Statement of Purpose (B)
21. Scholarship Application (F)
22. Thesis Proposal (P)
23. Systematic Literature Review (P)
24. Study Abroad Comparison (F)

#### Personal Finance
25. Home Buying Decision Framework (B)
26. Personal Investment Due Diligence (P)
27. Retirement Readiness Analysis (P)
28. Debt Payoff Strategy (F)
29. Refinance / Mortgage Decision (B)
30. Insurance Comparison (F)

#### Health
31. Medical Treatment Decision Research (P)
32. Health Insurance Plan Selection (F)
33. Therapist / Provider Selection (F)
34. Eldercare Planning (P)

#### Legal & Administrative
35. Immigration / Visa Application Prep (P)
36. Small Claims Court Prep (F)
37. Tenant Rights Research (F)
38. Nonprofit Formation (P)

#### Business & Strategy
39. Competitive Intelligence Report (P)
40. B2B Case Study (P)
41. Grant Proposal (P)
42. Business Case / ROI Analysis (P)
43. Product Requirements Document (P)
44. Partnership Evaluation (P)

#### Life Decisions
45. Relocation Decision Framework (B)
46. School Selection for Kids (P)
47. "Should I Go Back to School?" (B)
48. Wedding Vendor Comparison & Budget (F)
49. Buy vs. Rent Analysis (B)
50. Divorce Financial Planning (P)

**Legend:** F = Free (SEO funnel fuel), P = Paid (the product), B = Both

### Academic-Specific Expansion (Beyond Essays)

#### Tier 1: Graduate & Research (high willingness to pay)
- Systematic Literature Review
- Thesis/Dissertation Proposal
- Research Grant Proposal
- Conference Paper
- Annotated Bibliography
- Research Proposal

#### Tier 2: Application & Admissions (high stakes, seasonal)
- Grad School Statement of Purpose
- Scholarship Application
- Diversity Statement
- Teaching Philosophy Statement

#### Tier 3: Professional Academic
- Academic Cover Letter
- Research Brief / Policy Brief
- Book Proposal (academic)
- Peer Review Response

#### Tier 4: STEM-Specific
- Lab Report / Scientific Report
- Case Study Analysis (academic)
- Data Analysis Report

#### Tier 5: Student Fundamentals (high volume)
- Book Report / Critical Review
- Capstone / Senior Thesis
- Reflection Paper

### Resume & Career Workflows
- Job-Targeted Resume Tailoring (differentiated — research-first)
- Cover Letter with Company Research (differentiated)
- Interview Prep Dossier (differentiated)
- Job Search Strategy (differentiated)
- Career Pivot Research (differentiated)
- Job Offer Comparison (differentiated)
- Salary Negotiation Prep (both free + paid)
- Portfolio Case Study (differentiated)
- LinkedIn Profile Overhaul (commodity — skip or free)
- Generic Resume Builder (commodity — skip)

---

## Template Selection Framework

### Two Axes
1. **Can it drive traffic?** (search volume, low KD, topical relevance)
2. **Would someone pay for the workflow?** (cost of the alternative)

### Four Quadrants
| | Low Traffic | High Traffic |
|---|---|---|
| **People pay** | Deep workflows — niche but monetize directly | Unicorns — chase aggressively |
| **People won't pay** | Don't build | Free templates — funnel fuel |

### Paid Workflow Criteria
- Cost of alternative is $500+ (consultant, lawyer, advisor) or 20+ hours DIY
- Structure is the hard part (person has info, can't organize thinking)
- Output gets referenced repeatedly (durable artifact, not disposable)

### Free Template Criteria
- KD under 20
- Volume 500+
- Buildable in a day
- Showcases the workflow methodology
- Leads to "imagine doing this for harder problems"

---

## Infographics as a Product

### Why Infographics May Be Stronger Than Essays
- ChatGPT cannot produce researched, designed, data-accurate infographics — genuine capability gap
- Higher perceived value (visual > text)
- Competition is design-first (Canva, Venngage), not research-first — Esy's gap
- Clear, demonstrable output — sells itself visually in 2 seconds
- Broader audience: content marketers, educators, social media managers, newsletter creators, founders, students

### Risk
Quality bar for visual output is unforgiving. A mediocre infographic destroys trust. Must be at or near professional designer quality before shipping.

---

## Essay Market Assessment

### Commoditized
- "AI essay writer" competes with ChatGPT (free, instant, good enough)
- Dozens of tools, race to the bottom

### Not Commoditized
- "Research workflow that produces cited academic work"
- Real citations (ChatGPT hallucinates)
- Structured research phase before writing
- Auditable reasoning trail
- Proper APA/MLA formatting with real bibliography

### Positioning Matters
| Commodity Framing | Differentiated Framing |
|---|---|
| "AI Essay Writer" | "Research workflow for academic writing" |
| "Write an argumentative essay" | "Build a sourced, structured argument" |
| "College application essay tool" | "Personal statement workshop with research" |

### Viable If
- Move upmarket from "essay writer" to "academic research workflow platform"
- Climb toward literature reviews, thesis proposals, grant proposals, conference papers
- That's where ChatGPT can't follow

---

## Precedent for Going Broad Early

- **Gumroad** — "sell any digital product" from day one. Ebooks and courses emerged from data.
- **Canva** — social media, presentations, posters, flyers, business cards all at launch. Social media and presentations became focus.
- **Notion** — docs, wikis, databases, kanban, calendars simultaneously. Users self-selected use cases.
- **Etsy** — all handmade goods. Jewelry, clothing, home decor emerged organically.
- **Zapier** — hundreds of integrations from the start. Breadth was the product.

### Pattern
- Core engine was already general (adding categories was cheap)
- Breadth was a discovery mechanism
- Users self-selected
- Companies doubled down on winners

### Requirement
Distribution that reaches multiple audiences. Breadth without distribution = empty storefronts.

### Esy's Approach
Go broad on the product, focused on distribution. Ship 10-12 workflows across categories. Route all of them through existing channels (visual essays, school articles, newsletter). Internal product discovery handles cross-category exposure. Watch data. Double down on winners.

---

## Execution Plan

### Priority 1: Generalize the Engine
Make workflow types configurable — different intake fields, research methodologies, structures, verification criteria, artifact outputs. Adding a new workflow should be days, not weeks.

### Priority 2: Ship 10-12 Workflows
Already have 7. Add 3-5 meaningfully different ones:
- Systematic Literature Review (different research methodology)
- Resume Tailoring (different audience, research-first differentiation)
- Interview Prep (different artifact type)
- Technical RFC / ADR (proves the platform beyond academic)

Spend time on methodology design, not just code. Run each workflow 3-5 times. Is the artifact actually reliable?

### Priority 3: Landing Pages for Top Workflows
Not all 12. Just the 3-4 with highest search volume. Let SEO work on those while internal discovery handles the rest.

### Priority 4: Watch Data, Double Down
Which workflows get completed? Shared? Drive signups? Convert to paid?

---

## Revenue Sanity Check

$1K MRR = 35 paying users at $29/month.

The market math works: 20M+ US college students, 3M+ grad students, millions of knowledge workers, plus everyone frustrated with ChatGPT's blank text box.

The only question: does the workflow produce an artifact worth $29/month to access?

Ship and find out.

---

## Key Principles

1. **The product is the workflow engine, not any single artifact type.** Essays are the first configuration. Infographics are the second. More will follow.
2. **Ship what you have.** The essay workflows exist. They serve the audience your content already attracts.
3. **Position as methodology, not output.** "Research workflow" not "essay writer."
4. **Speed is your advantage. Quality of research methodology is your constraint.** Don't let fast shipping compromise artifact reliability.
5. **Expansion is earned, not planned.** Let the market pull you into new categories through user behavior and data.
6. **Every workflow should pass the one-liner test:** Does this help users research something without prompt engineering and get a reliable artifact?
