# Data Journalism Research Profile

> Created: February 2026

## Overview

This profile defines the **G2 research deliverables** for data-driven argumentative essays — content that builds a thesis through data visualizations, statistical evidence, and systems analysis rather than historical narratives or abstract concept explanations.

## Use Cases

- Global issue essays (e.g., "The Geography of Water Scarcity")
- Policy analysis pieces (e.g., "Why Universal Healthcare Costs Less")
- Comparative data stories (e.g., "Same Rain, Different Outcomes")
- Trend-driven arguments (e.g., "The Acceleration of Climate Migration")
- Systems-thinking essays (e.g., "How Food Becomes Water Scarcity")

---

## Relationship to Conceptual Research Profile

This profile **extends** the Conceptual Research Profile. All standard conceptual deliverables (CONCEPTS.md, SEQUENCE.md, DEFINITIONS.md, ANALOGIES.md, MISCONCEPTIONS.md, CLAIMS.md) are still required. This profile adds four data-specific deliverables.

| Conceptual Profile (Required) | Data Journalism Profile (Additional) |
|-------------------------------|--------------------------------------|
| CONCEPTS.md (core concepts) | DATASETS.md (curated data sources) |
| SEQUENCE.md (learning progression) | STATISTICS.md (verified key numbers) |
| DEFINITIONS.md (key terms) | COMPARISONS.md (entity comparison data) |
| ANALOGIES.md (concrete comparisons) | PROJECTIONS.md (future trend data) |
| MISCONCEPTIONS.md (common errors) | — |
| CLAIMS.md (verified facts + quotes) | — |

---

## G2: Data Journalism Research Complete

### Purpose

Gather and verify all data BEFORE writing or visualization begins:
- Curated datasets with methodology and licensing
- Key statistics verified against Tier 1-2 institutional sources
- Normalized comparison data for interactive widgets
- Future projections with model sources and confidence intervals
- All standard conceptual deliverables (concepts, sequence, claims, etc.)

---

## Additional Research Deliverables

### DATASETS.md

```markdown
# Curated Datasets: [Topic]

## Dataset Registry

### Dataset 1: [Name]
- **Source**: [Institution — e.g., World Resources Institute, UN Water, WHO]
- **URL**: [Direct link to dataset]
- **License**: [Open / CC-BY / Restricted — usage terms]
- **Coverage**: [Geographic scope, time range]
- **Resolution**: [Country-level / Region-level / City-level]
- **Last Updated**: [Date of most recent data]
- **Methodology**: [How data was collected — survey, satellite, model, etc.]
- **Variables Used**:
  - `[variable_name]`: [Description, units]
  - `[variable_name]`: [Description, units]
- **Limitations**: [Known gaps, biases, or caveats]
- **Used In**: [Which visualization(s) use this dataset]

### Dataset 2: [Name]
...

## Cross-Dataset Compatibility

| Dataset A | Dataset B | Compatible? | Normalization Required |
|-----------|-----------|-------------|----------------------|
| [Name] | [Name] | ✅/⚠️/❌ | [Description if needed] |

## Data Freshness

| Dataset | Latest Year | Acceptable for [Publication Year]? |
|---------|-------------|-------------------------------------|
| [Name] | [Year] | ✅ Yes / ⚠️ Aging / ❌ Stale |
```

---

### STATISTICS.md

```markdown
# Key Statistics: [Topic]

## Verified Statistics

### Statistic 1: "[Exact number and claim]"
- **Value**: [Number with units]
- **Source**: [Institution, report name, year]
- **Source Tier**: Tier 1 / Tier 2
- **Page/Table**: [Specific location in source]
- **Verification**: [How verified — direct from report / calculated from data / cross-referenced]
- **Context**: [What this number means in plain language]
- **Caveats**: [Any important qualifications]
- **Used In**: [Which visualization or text section]
- **Last Verified**: [Date]

### Statistic 2: "[Exact number and claim]"
...

## Statistics by Category

| Category | Stat | Value | Source | Tier |
|----------|------|-------|--------|------|
| Scale | [Description] | [Value] | [Source] | [Tier] |
| Trend | [Description] | [Value] | [Source] | [Tier] |
| Comparison | [Description] | [Value] | [Source] | [Tier] |
| Projection | [Description] | [Value] | [Source] | [Tier] |

## Tier Distribution

| Tier | Count | Percentage |
|------|-------|------------|
| Tier 1 (UN, WHO, World Bank, peer-reviewed) | X | X% |
| Tier 2 (Reputable NGO, government agency) | X | X% |
| Tier 3 (News, general reference) | X | X% |

**Target**: ≥85% Tier 1-2 for data journalism essays

## Statistics to Avoid

| Misleading Stat | Why It's Problematic | Better Alternative |
|-----------------|---------------------|-------------------|
| [Common but misleading] | [How it distorts] | [What to use instead] |
```

---

### COMPARISONS.md

```markdown
# Comparison Data: [Topic]

## Comparison Strategy

**Purpose**: [What the comparisons demonstrate — e.g., "policy choices produce different outcomes from similar starting conditions"]

**Comparison Type**: [Country vs. country / Region vs. region / Time period vs. time period]

## Entity Profiles

### Entity 1: [Name — e.g., Israel]

| Metric | Value | Year | Source | Notes |
|--------|-------|------|--------|-------|
| [Metric 1 — e.g., Annual Rainfall] | [Value + units] | [Year] | [Source] | [Context] |
| [Metric 2 — e.g., Water Stress Index] | [Value] | [Year] | [Source] | |
| [Metric 3 — e.g., % Water Recycled] | [Value] | [Year] | [Source] | |
| [Metric 4 — e.g., Infrastructure Investment] | [Value] | [Year] | [Source] | |

### Entity 2: [Name — e.g., Jordan]

| Metric | Value | Year | Source | Notes |
|--------|-------|------|--------|-------|
| [Same metrics as Entity 1] | ... | ... | ... | ... |

## Curated Comparison Pairs

| Pair | Entity A | Entity B | Key Insight | Why This Pair |
|------|----------|----------|-------------|---------------|
| 1 | [Name] | [Name] | [What the comparison reveals] | [Why these two are meaningful together] |
| 2 | [Name] | [Name] | [Insight] | [Rationale] |

## Normalization Methodology

| Metric | Raw Unit | Normalized To | Method | Rationale |
|--------|----------|---------------|--------|-----------|
| [Metric] | [Raw] | [Normalized] | [Method] | [Why this normalization] |

## Fairness Checks

- [ ] Comparison entities have similar enough starting conditions to be meaningful
- [ ] Metrics are normalized appropriately (per capita, per GDP, etc.)
- [ ] Time periods align across compared entities
- [ ] Confounding variables are acknowledged
- [ ] Contextual annotations explain WHY differences exist

## Contextual Annotations

### [Pair 1]: [Entity A] vs. [Entity B]
**Why the difference exists**: [Brief explanation of policy, infrastructure, or geographic factors that explain divergent outcomes]
**Source**: [Citation for this explanation]
```

---

### PROJECTIONS.md

```markdown
# Projections & Future Data: [Topic]

## ⚠️ Projection Disclaimer

All data in this file represents **model-based projections**, not measured observations. Projections must be:
1. Clearly labeled as projections in all visualizations
2. Attributed to specific models and institutions
3. Presented with confidence intervals where available
4. Distinguished visually from historical/measured data

---

## Projection Registry

### Projection 1: "[What is projected]"
- **Projected Value**: [Number/range with units]
- **Target Year**: [Year]
- **Baseline Year**: [Year from which projection starts]
- **Model/Source**: [Institution, model name, report]
- **Source Tier**: Tier 1 / Tier 2
- **Scenario**: [Which scenario — e.g., BAU, optimistic, pessimistic, RCP 4.5]
- **Confidence Interval**: [Range if available — e.g., ±15%]
- **Key Assumptions**: [What the model assumes]
- **Limitations**: [Known weaknesses of this projection]
- **Used In**: [Which visualization]

### Projection 2: "[What is projected]"
...

## Historical vs. Projected Data Boundaries

| Dataset | Historical Range | Projection Range | Boundary Year | Visual Treatment |
|---------|-----------------|------------------|---------------|-----------------|
| [Dataset] | [Start–End] | [Start–End] | [Year] | [Solid line → dashed line, color shift, etc.] |

## Scenario Comparison

| Metric | Current | BAU 2030 | Optimistic 2030 | Pessimistic 2030 | Source |
|--------|---------|----------|-----------------|-------------------|--------|
| [Metric] | [Value] | [Value] | [Value] | [Value] | [Source] |

## Projection Quality Assessment

| Projection | Model Track Record | Peer-Reviewed? | Multiple Models Agree? | Confidence |
|------------|-------------------|----------------|----------------------|------------|
| [Projection] | [Good/Mixed/Unknown] | ✅/❌ | ✅/❌ | High / Medium / Low |
```

---

## G2 Gate Checklist (Data Journalism Extension)

Before proceeding to G3 (Spec Construction):

### Standard Conceptual Checklist (Required)
- [ ] CONCEPTS.md has complete concept hierarchy
- [ ] SEQUENCE.md defines clear learning progression
- [ ] DEFINITIONS.md has accessible definitions for all key terms
- [ ] ANALOGIES.md has primary analogy with clear limitations
- [ ] MISCONCEPTIONS.md addresses 3+ common errors
- [ ] CLAIMS.md has ≥80% Tier 1-2 sources
- [ ] All claims are verified (no speculation)
- [ ] Prerequisite chain is logical and complete

### Data Journalism Extension (Required in Data Journalism Mode)
- [ ] DATASETS.md has all datasets registered with sources and licensing
- [ ] DATASETS.md documents methodology and limitations for each dataset
- [ ] STATISTICS.md has all key statistics verified (≥85% Tier 1-2)
- [ ] STATISTICS.md includes context and caveats for each statistic
- [ ] COMPARISONS.md has curated entity pairs with normalized metrics
- [ ] COMPARISONS.md includes fairness checks and contextual annotations
- [ ] PROJECTIONS.md clearly distinguishes projections from measured data
- [ ] PROJECTIONS.md includes model sources, scenarios, and confidence intervals
- [ ] Cross-dataset compatibility verified
- [ ] Data freshness acceptable for publication year

**G2 Status**: ⏳ Pending / ✅ Approved / ❌ Rejected

---

## See Also

- [conceptual-research-profile.md](./conceptual-research-profile.md) — Base profile (required alongside this one)
- [concept-research-agent.md](../../agents/research/concept-research-agent.md) — Agent that produces these deliverables
- [data-accuracy-auditor.md](../../agents/auditors/data-accuracy-auditor.md) — Audits data fidelity in visualizations
- [conceptual-essay-orchestrator.md](../../agents/orchestrators/conceptual-essay-orchestrator.md) — Uses this profile in Data Journalism mode

---

## Last Updated
February 2026
