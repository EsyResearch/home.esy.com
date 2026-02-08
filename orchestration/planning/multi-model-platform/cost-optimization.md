# Cost Optimization: Multi-Model Agent Routing

> Strategy for assigning AI models to agent roles based on task complexity and quality requirements.

## The Core Tradeoff

Not every agent needs the most expensive model. The pipeline has ~7 distinct agent invocations per workflow run. Using the top-tier model for everything is expensive. Using a cheap model for everything produces low-quality artifacts. The goal is to **match model capability to task requirements**.

## Task Taxonomy

Every agent task in the pipeline falls into one of these categories:

| Category | Description | Quality Sensitivity | Model Tier |
|----------|-------------|-------------------|------------|
| **Creative Prose** | Original writing, narrative, argumentation | Very High | Top tier |
| **Structured Research** | Gathering facts, organizing into templates | Medium-High | Mid tier |
| **Technical Generation** | React code, SVG, data viz architecture | High | Top tier |
| **Verification/Audit** | Checking outputs against checklists | Medium | Mid tier |
| **Routing/Orchestration** | Deciding which agent to invoke next | Low | Low tier |
| **Formatting/Cleanup** | SEO metadata, citation formatting | Low | Low tier |

## Recommended Model Tier Mapping

### Tier 1: Top-Tier (Creative + Technical)

Use for agents where output quality directly determines publishability.

| Agent | Role | Why Top Tier |
|-------|------|-------------|
| Data Journalist Writer | G5 prose | Prose quality is the primary user-visible output |
| Historian Writer | G5 prose | Same — narrative quality defines the artifact |
| Data Visualization Architect | G5 engineering | Complex code generation, visual fidelity |
| SVG Illustration Expert | G5 engineering | Visual quality, animation choreography |
| Design Researcher | G4 design | Aesthetic judgment, visual identity |

**Models**: Claude Opus, GPT-5.x (flagship), Gemini Ultra

### Tier 2: Mid-Tier (Research + Audit)

Use for agents that produce structured outputs following well-defined templates.

| Agent | Role | Why Mid Tier |
|-------|------|-------------|
| Research Agent | G2 research | Template-following with fact gathering |
| Accuracy Audit Agent | G6 audit | Checklist verification |
| Data Accuracy Auditor | G6.1 audit | Numeric verification |
| Immersive Scrolling Auditor | G6.5 audit | Pattern-matching against standards |
| Frontend Architecture Expert | G5 architecture | Structural decisions, less creative |

**Models**: Claude Sonnet, GPT-4o, Gemini Pro

### Tier 3: Low-Tier (Routing + Formatting)

Use for simple decision-making or template-filling tasks.

| Agent | Role | Why Low Tier |
|-------|------|-------------|
| Orchestrator (routing decisions) | Gate routing | Simple if/then logic |
| SEO Optimizer | G8 metadata | Template filling |
| Citation Formatter | Post-processing | Mechanical transformation |
| README Curator | Maintenance | Simple pattern matching |

**Models**: Claude Haiku, GPT-4o-mini, Gemini Flash

## Cost Projections

### Scenario: Water Scarcity Benchmark Essay

Assuming ~60K tokens input and ~120K tokens output per full pipeline run:

| Strategy | Est. Cost | Quality Risk |
|----------|-----------|-------------|
| All Opus/flagship | ~$12-18 | Minimal |
| Mixed tiers (recommended) | ~$4-7 | Low (top tier where it matters) |
| All mid-tier | ~$2-4 | Medium (prose quality drops) |
| All low-tier | ~$0.50-1 | High (unusable for production) |

### Estimated Per-Gate Costs (Mixed Tier Strategy)

| Gate | Agent(s) | Model | Est. Tokens | Est. Cost |
|------|----------|-------|-------------|-----------|
| G1 | Orchestrator | Low | ~5K | $0.01 |
| G2 | Research Agent | Mid | ~40K | $0.30 |
| G3 | Spec Agent | Mid | ~30K | $0.25 |
| G4 | Design Researcher | Top | ~25K | $0.80 |
| G5 (prose) | Data Journalist Writer | Top | ~60K | $2.00 |
| G5 (viz) | Data Viz Architect | Top | ~40K | $1.50 |
| G6/G6.1 | Audit agents (2x) | Mid | ~30K | $0.25 |
| G7 | QA Remediation | Mid | ~20K | $0.15 |
| G8 | SEO | Low | ~10K | $0.02 |
| **Total** | | | **~260K** | **~$5.28** |

These are rough estimates — actual costs depend on model pricing at time of use.

## Dynamic Model Selection

Beyond static routing, consider dynamic selection based on:

1. **Depth mode**: Deep research → top-tier for G2. Quick research → mid-tier for G2.
2. **Retry escalation**: If mid-tier model fails a gate, retry with top-tier before failing.
3. **User tier**: Free users get mid-tier pipeline. Premium users get top-tier for creative agents.
4. **Time of day**: Use cheaper models during off-peak for background processing.

## Metrics to Track

For each production run:
- Total token usage (input + output, per gate, per model)
- Total cost (USD, per gate, per model)
- Gate pass rate (first-attempt pass vs retry)
- Quality scores (if human review is captured)
- Latency (time per gate, time to first token)

Over time, this data builds the evidence base for model routing decisions.
