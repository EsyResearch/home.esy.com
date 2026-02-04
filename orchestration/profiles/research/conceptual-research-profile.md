# Conceptual Research Profile

> Created: February 2026

## Overview

This profile defines the **G2 research deliverables** for conceptual explainer essays — educational content that teaches abstract concepts through diagrams and progressive explanation rather than historical figures and timelines.

## Use Cases

- Science explainers (e.g., "The Brain as a Prediction Machine")
- Technical concepts (e.g., "How Encryption Works")
- Abstract ideas (e.g., "What is Emergence?")
- Process explanations (e.g., "How a Bill Becomes a Law")

---

## G2: Concept Research Complete

### Purpose

Gather and verify all conceptual content BEFORE writing begins:
- Core concepts and their relationships
- Learning sequence (prerequisites → advanced)
- Precise definitions
- Effective analogies
- Common misconceptions to address
- Verified claims with sources

---

## Research Deliverables

### Required Files

| File | Purpose | Contents |
|------|---------|----------|
| `CONCEPTS.md` | Core concepts | Definitions, relationships, hierarchy |
| `SEQUENCE.md` | Learning progression | What must come before what |
| `DEFINITIONS.md` | Key terms | Precise, audience-appropriate definitions |
| `ANALOGIES.md` | Concrete comparisons | Abstract → concrete mappings |
| `MISCONCEPTIONS.md` | Common errors | What people get wrong, how to address |
| `CLAIMS.md` | Verified facts | Claims with sources + relevant quotes |

---

## File Specifications

### CONCEPTS.md

```markdown
# Core Concepts: [Topic]

## Concept Hierarchy

```
[Root Concept]
├── [Sub-concept A]
│   ├── [Detail 1]
│   └── [Detail 2]
├── [Sub-concept B]
└── [Sub-concept C]
```

## Concept Profiles

### [Concept 1 Name]
- **Definition**: [One-sentence definition]
- **Why it matters**: [Importance to understanding]
- **Prerequisites**: [What must be understood first]
- **Related concepts**: [Connections to other concepts]
- **Visual representation**: [How to diagram this]

### [Concept 2 Name]
...
```

---

### SEQUENCE.md

```markdown
# Learning Sequence: [Topic]

## Prerequisite Chain

```
[Foundation Concept] → [Building Block] → [Core Idea] → [Advanced Application]
```

## Section Progression

### Section 1: [Title]
- **Introduces**: [Concepts introduced]
- **Assumes**: [Prior knowledge required]
- **Prepares for**: [What this enables]

### Section 2: [Title]
...

## Cognitive Load Map

| Section | New Concepts | Complexity | Notes |
|---------|--------------|------------|-------|
| 1 | 2 | Low | Foundational |
| 2 | 3 | Medium | Building |
| 3 | 2 | High | Synthesis |
```

---

### DEFINITIONS.md

```markdown
# Key Definitions: [Topic]

## Glossary

### [Term 1]
- **Technical definition**: [Precise scientific definition]
- **Accessible definition**: [Plain language for target audience]
- **Example**: [Concrete example]
- **Non-example**: [What it is NOT]
- **Source**: [Where definition comes from]

### [Term 2]
...

## Terms to Avoid

| Avoid | Use Instead | Reason |
|-------|-------------|--------|
| [Jargon term] | [Plain language] | [Why] |
```

---

### ANALOGIES.md

```markdown
# Analogies: [Topic]

## Primary Analogy

**The [Topic] is like [Concrete Thing]**

- **Mapping**:
  - [Abstract element] → [Concrete element]
  - [Abstract element] → [Concrete element]
- **Where it works**: [What this explains well]
- **Where it breaks**: [Limitations of this analogy]
- **Source**: [If from literature]

## Supporting Analogies

### For [Specific Concept]
- **Analogy**: [Description]
- **Use when**: [When to deploy this]
- **Caution**: [What to avoid implying]

## Analogies to Avoid

| Bad Analogy | Why It Fails | Better Alternative |
|-------------|--------------|-------------------|
| [Common but wrong] | [How it misleads] | [What to use instead] |
```

---

### MISCONCEPTIONS.md

```markdown
# Common Misconceptions: [Topic]

## Critical Misconceptions

### Misconception 1: "[What people wrongly believe]"

- **Why people believe this**: [Root cause]
- **Why it's wrong**: [The error]
- **Correct understanding**: [What's actually true]
- **How to address**: [Pedagogical approach]
- **Source**: [Research on this misconception]

### Misconception 2: ...

## Misconception-Concept Map

| Misconception | Affects Understanding Of | Section to Address |
|---------------|-------------------------|-------------------|
| [Misconception] | [Concept] | [Section #] |

## Pre-emptive Framing

For each misconception, note where in the essay to preemptively address it.
```

---

### CLAIMS.md

```markdown
# Verified Claims: [Topic]

## Claim Verification Log

### Claim 1: "[Exact claim to be made in essay]"
- **Status**: ✅ Verified / ⚠️ Simplified / ❌ Cannot verify
- **Source**: [Citation]
- **Source tier**: Tier 1 / Tier 2 / Tier 3
- **Verification**: [How verified]
- **Notes**: [Any caveats]

### Claim 2: ...

## Relevant Quotes

### From [Scientist/Expert Name]
- **Quote**: "[Exact quote]"
- **Source**: [Publication, year]
- **Context**: [When/why they said this]
- **Use in essay**: [Where this supports the narrative]

## Claim Tier Distribution

| Tier | Count | Percentage |
|------|-------|------------|
| Tier 1 (Primary/Academic) | X | X% |
| Tier 2 (Reputable secondary) | X | X% |
| Tier 3 (Popular/General) | X | X% |

**Target**: ≥80% Tier 1-2
```

---

## G2 Gate Checklist

Before proceeding to G3 (Spec Construction):

- [ ] CONCEPTS.md has complete concept hierarchy
- [ ] SEQUENCE.md defines clear learning progression
- [ ] DEFINITIONS.md has accessible definitions for all key terms
- [ ] ANALOGIES.md has primary analogy with clear limitations
- [ ] MISCONCEPTIONS.md addresses 3+ common errors
- [ ] CLAIMS.md has ≥80% Tier 1-2 sources
- [ ] All claims are verified (no speculation)
- [ ] Prerequisite chain is logical and complete

**G2 Status**: ⏳ Pending / ✅ Approved / ❌ Rejected

---

## Comparison to Historical Research Profile

| Historical Profile | Conceptual Profile |
|-------------------|-------------------|
| FIGURES.md (people) | CONCEPTS.md (ideas) |
| TIMELINE.md (events) | SEQUENCE.md (learning progression) |
| QUOTES.md (historical quotes) | CLAIMS.md (verified facts + expert quotes) |
| VISUALS.md (archival images) | ANALOGIES.md (concrete comparisons) |
| ERA-GUIDE.md (periods) | MISCONCEPTIONS.md (errors to address) |

---

## See Also

- [concept-research-agent.md](../../agents/research/concept-research-agent.md) — Agent that produces these deliverables
- [historical-research-profile.md](./historical-research-profile.md) — Comparison profile
- [conceptual-essay-orchestrator.md](../../agents/orchestrators/conceptual-essay-orchestrator.md) — Uses this profile

---

## Last Updated
February 2026
