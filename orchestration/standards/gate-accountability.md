# Gate Accountability Standard

> Version: 1.0
> Created: February 8, 2026
> Status: Active

## Purpose

This document defines the quality assurance architecture for all Esy orchestration workflows. It establishes the standards that every gate must meet, the accountability model that prevents defective artifacts from progressing through the pipeline, and the structured output formats that enable scaling to the web interface.

Every gate in every workflow MUST comply with this standard.

---

## Scope

- All orchestration workflows (visual essay, editorial, future types)
- All gate contracts (`orchestration/gates/contracts/`)
- All agent definitions (`orchestration/agents/`)
- All workflow definitions (`orchestration/runner/workflows/`)
- Web interface pipeline execution (future)

---

## The Three-Layer Accountability Model

Every gate has three layers of quality assurance. The first layer is mandatory for all gates. Layers 2 and 3 are mandatory for producing gates and audit gates respectively.

### Layer 1: Contract Enforcement (Automated, Instant)

> "Does the output structurally meet the minimum bar?"

**What it does**: Machine-verifiable checks that run without agent invocation. These are the floor.

**Requirements**:
- Every gate contract MUST validate more than file existence
- Contracts MUST include at least one structural validation (headings, source counts, keyword presence, frontmatter check)
- Contracts MUST specify `blocking: true` for quality-critical gates
- Contract validations MUST be sufficient to catch obvious structural failures without agent involvement

**Validation types available**:

| Type | Purpose | Example |
|------|---------|---------|
| `file_exists` | Artifact was produced | page.tsx exists |
| `dir_exists` | Directory structure created | research/ exists |
| `min_file_count` | Sufficient artifacts produced | ≥3 markdown files in research/ |
| `min_sources` | Research has substance | ≥8 sources in CITATIONS.md |
| `min_sources_any_of` | Flexible source tracking | CITATIONS.md or CLAIMS.md has ≥8 sources |
| `contains_headings` | Document has required structure | Spec contains layer headings |
| `not_contains` | No forbidden markers | No `[UNRECONCILED]`, `[FAIL]`, `[CRITICAL]` |
| `frontmatter_status` | Structured pass/fail check | YAML frontmatter `status` ≠ `FAIL` |

**For web interface scaling**: Contract checks execute instantly (milliseconds) and produce structured pass/fail results. These are displayed as real-time status indicators in the UI.

### Layer 2: Producer Self-Assessment (Inline, Same Agent)

> "The agent that builds the artifact documents how well it met the brief."

**What it does**: The producing agent includes a structured self-assessment in its output artifact. This is documentation, not validation — it creates an audit trail and forces the producer to compare output against input requirements.

**Requirements**:
- Every producing gate (gates that create artifacts, not audit gates) SHOULD include a self-assessment section in its output
- Self-assessment MUST reference the input requirements (spec, design research, research package)
- Self-assessment MUST flag known gaps or deviations
- Self-assessment is NOT a substitute for external audit (Layer 3)

**Format**: A `## Self-Assessment` section at the end of the artifact, or a structured YAML frontmatter header (see Structured Artifact Headers below).

**For web interface scaling**: Self-assessments are parsed and displayed as "producer confidence" indicators. Low self-assessment scores trigger automatic escalation to human review.

### Layer 3: External Audit (Cross-Gate, Different Agent)

> "A different agent — one that didn't build the thing — evaluates it."

**What it does**: Enforces separation of duties. The producing agent and the auditing agent MUST be different agents. The auditor verifies the producer's work against the original requirements.

**Requirements**:
- Every quality-critical production output MUST have a corresponding audit gate
- The audit agent MUST be a different agent than the producing agent
- The audit gate MUST produce its own artifact (the audit report)
- The audit report MUST include a structured header with pass/fail status and numeric score
- The audit report MUST document all findings with severity classification

**Current audit pairings**:

| Production Gate | Produces | Audit Gate | Audits |
|----------------|----------|------------|--------|
| G4 Design Research | DESIGN-RESEARCH.md | G4.1 Reconciliation | Authenticity, novelty, completeness |
| G4.V Visualization Research | VISUALIZATION-RESEARCH.md | G7 Diagram Clarity | Comprehension test evaluation |
| G5 Content Complete | page.tsx, CSS, Client component | G5.2 Design Fidelity | Spec-to-code compliance |
| G5 Content Complete | Narrative content | G6 Citation Audit | Source integrity |
| G5 Content Complete | Scroll interactions | G7 Scroll Certification | Performance, UX |
| G5 Content Complete | Learning sequence, analogies | G6.5 Pedagogy Audit | Framework consistency, misconception addressing |
| G5 Content Complete | Prose quality, voice | G6.6 Prose Quality Audit | AI slop, voice consistency, transitions |
| G5.5 Bibliography | Works Cited section | G6 Citation Audit | Bibliography accuracy |

**For web interface scaling**: Audit scores are the primary quality signal shown to customers. Audits above threshold proceed automatically; audits below threshold pause for human review.

---

## Structured Artifact Headers

Every audit artifact MUST include a YAML frontmatter header that enables machine-readable quality signals. This is critical for web interface scaling — the UI reads these headers to display status dashboards.

### Format

```yaml
---
gate: G5.2
type: audit
status: PASS | CONDITIONAL | FAIL
score: 72
threshold: 85
blocking_issues: 0
warning_issues: 3
agent: design-research-implementation-auditor
date: 2026-02-08
essay: the-geography-of-water-scarcity
---
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `gate` | string | Gate code (e.g., `G4.1`, `G5.2`) |
| `type` | string | `audit` or `production` |
| `status` | enum | `PASS`, `CONDITIONAL`, or `FAIL` |
| `score` | number | Numeric score (0-100) |
| `threshold` | number | Minimum passing score for this gate |
| `blocking_issues` | number | Count of critical/blocking issues |
| `warning_issues` | number | Count of non-blocking issues |
| `agent` | string | Agent that produced this artifact |
| `date` | string | ISO date of production |
| `essay` | string | Essay slug |

### Status Definitions

| Status | Meaning | Pipeline Behavior |
|--------|---------|-------------------|
| `PASS` | All checks passed, score ≥ threshold | Proceed to next gate |
| `CONDITIONAL` | Score ≥ threshold but warnings exist | Proceed with noted issues |
| `FAIL` | Score < threshold or blocking issues exist | Pipeline halts, remediation required |

---

## Contract Strength Requirements

### Minimum Viable Contract

Every gate contract MUST include:

1. **At least one required output** — the artifact the gate produces
2. **At least one structural validation** beyond `file_exists`
3. **A `blocking` flag** — whether failure halts the pipeline
4. **A `notes` field** — explaining what the gate actually validates

### Audit Gate Contracts

Audit gates (G4.1, G5.2, G6, G6.5, G6.6, G7, G8) MUST additionally include:

1. **Required audit artifact** — the report file the auditor produces
2. **`not_contains` validation for `[FAIL]`** — the contract checks the audit artifact doesn't contain a failure marker
3. **Threshold documentation** — what score constitutes passing

### Contract Anti-Patterns

| Anti-Pattern | Why It's Bad | Fix |
|--------------|-------------|-----|
| Only `file_exists` validations | A zero-byte file passes | Add structural checks |
| No required audit artifact | Agent can "pass" without doing work | Require report output |
| No failure marker check | Audit can report FAIL but gate still passes | Add `not_contains` for `[FAIL]` |
| Hardcoded paths | Doesn't scale to different essays | Use `{artifact_path}`, `{slug}` variables |

---

## Gate Design Principles

### Principle 1: Separation of Producer and Auditor

The agent that produces an artifact MUST NOT be the same agent that audits it. This is the most fundamental quality assurance principle.

```
GOOD:  G4 (design-researcher) → G4.1 (reconciliation-agent)
BAD:   G4 (design-researcher) → G4 also validates its own output
```

### Principle 2: Progressive Quality Accumulation

Each gate builds on the previous gate's quality guarantee. Like a compiler pipeline:

```
G2 guarantees research substance
  → G4 guarantees design authenticity (builds on G2 research)
    → G5 guarantees implementation completeness (builds on G4 design)
      → G5.2 guarantees design fidelity (verifies G5 matches G4)
        → G6 guarantees citation integrity (verifies G5 matches G2)
          → G6.5 guarantees pedagogical consistency (verifies learning sequence)
            → G6.6 guarantees prose quality (verifies writing craft, no AI slop)
              → G7 guarantees interaction quality
                → G8 aggregates all quality signals
```

A gate MAY assume all prior gates have passed. A gate MUST NOT re-validate prior gates' concerns (that's G8's job as the aggregator).

### Principle 3: Fail Fast, Fail Specific

Gates should catch problems as early as possible with specific, actionable feedback.

- **Fail fast**: G4.1 catches incomplete design research before G5 builds on it
- **Fail specific**: "Color token --ws-water-blue (#2980b9) not found in CSS" is actionable. "Design doesn't match spec" is not.

### Principle 4: Contracts Enforce, Agents Enrich

- **Contracts** define the minimum structural requirements (automated, instant)
- **Agents** provide the nuanced evaluation (qualitative, detailed)
- A gate should NEVER pass on agent goodwill alone — the contract must independently verify minimum quality

### Principle 5: Every Quality Signal is Structured Data

For web interface scaling, every quality assessment must produce machine-readable output:
- YAML frontmatter with status/score
- Structured tables with pass/fail per criterion
- Numeric scores with defined thresholds

Prose narrative is valuable for human review but MUST be accompanied by structured data.

---

## Quality Assurance Phase Architecture

### Pipeline Phases

Every workflow has four phases:

```
┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌─────────────┐
│ RESEARCH  │ →  │ SPECIFICATION │ →  │  PRODUCTION   │ →  │ PUBLICATION  │
│ G1, G2    │    │ G3, G4, G4.1 │    │ G4.5–G7       │    │ G8, G9       │
│           │    │              │    │               │    │              │
│ Substance │    │ Blueprint    │    │ Build + QA    │    │ Aggregate +  │
│ gathering │    │ creation     │    │ interleaved   │    │ Human sign   │
└──────────┘    └──────────────┘    └──────────────┘    └─────────────┘
```

### Production + QA Interleaving

In the Production phase, build steps and QA steps alternate:

```
G4.V Visualization Research ← Research (briefs for complex diagrams)
G4.5 Image Sourcing      ← Build
G5   Content Complete     ← Build (THE BIG ONE)
G5.2 Design Fidelity     ← QA (audits G5 against G4)
G5.5 Bibliography         ← Build
G6   Citation Audit       ← QA (audits G5+G5.5 against G2)
G6.5 Pedagogy Audit       ← QA (audits learning sequence, framework consistency)
G6.6 Prose Quality         ← QA (audits writing craft, AI slop, voice)
G7   Scroll Certification ← QA (audits G5 interactions)
```

This interleaving catches issues close to where they're introduced. The alternative — all build then all QA — creates a long feedback loop.

### The Aggregation Gate (G8)

G8 is special. It's the ONLY gate that sees the complete picture:

- Verifies all prior gates passed
- Runs cross-cutting checks (slop detection, SEO, social meta)
- Produces a composite GO/CONDITIONAL/NO-GO decision
- This is the "ready for your review" signal in the web interface

G8 MUST reference all prior audit scores in its report.

### The Human Gate (G9)

G9 is the customer approval point:

- Reviews G8's aggregate certification
- Makes final editorial judgment
- Triggers deployment
- This gate is ALWAYS human — it cannot be automated

---

## Scaling Considerations for Web Interface

### Automated vs. Human Gates

| Gate Type | Execution | Web Interface Behavior |
|-----------|-----------|----------------------|
| Contract-only | Automated, instant | Real-time status indicator |
| Agent audit | Automated, async | Progress spinner → score display |
| Human gate | Manual | "Review and Approve" button |

### Customer-Facing Quality Dashboard

The web interface displays:

1. **Pipeline progress**: Which gate is current, which passed, which failed
2. **Quality scores**: Numeric scores from each audit gate (from structured headers)
3. **Issue summary**: Count of blocking vs. warning issues
4. **Audit details**: Expandable narrative from each audit report
5. **Action required**: What the customer needs to do (approve, revise, etc.)

### Reliability Over Time

Quality improves through:

1. **Contract tightening**: As failure patterns emerge, add new validations to contracts
2. **Threshold adjustment**: Raise minimum passing scores as agents improve
3. **Pattern library**: Catalog common failures and add automated detection
4. **Feedback loops**: Customer rejections at G9 feed back into G4.1 reconciliation criteria

---

## Standards Compliance Checklist

Use this checklist when creating or updating any gate:

### Gate Definition (workflow JSON)
- [ ] Gate has a unique code (G1, G2, G3, etc.)
- [ ] Gate has an assigned agent
- [ ] Gate references a contract file
- [ ] Gate has a description that explains what it validates
- [ ] Gate is assigned to a pipeline phase

### Contract (contract JSON)
- [ ] Has at least one `required_output`
- [ ] Has at least one structural validation beyond `file_exists`
- [ ] Has `blocking` flag set appropriately
- [ ] Has `notes` explaining validation logic
- [ ] Audit gates: requires an audit artifact output
- [ ] Audit gates: validates audit artifact doesn't contain `[FAIL]`

### Agent Definition (agent markdown)
- [ ] Role definition matches gate responsibility
- [ ] Phase protocol includes all inputs and outputs
- [ ] Report template includes structured YAML frontmatter header
- [ ] Collaboration section lists upstream/downstream agents
- [ ] Red Lines section defines what cannot be approved
- [ ] Paths reference single-directory standard (`src/app/essays/{slug}/`)

### Audit Artifact
- [ ] Has YAML frontmatter with all required fields
- [ ] Has `status: PASS | CONDITIONAL | FAIL`
- [ ] Has numeric `score` with defined `threshold`
- [ ] Has `blocking_issues` and `warning_issues` counts
- [ ] Narrative sections support the structured data (not contradict it)

---

## Template Scalability: Gates as OS, Workflows as Applications

### The Architecture

The orchestration system is designed with a clear separation between **infrastructure** and **content**:

```
┌─────────────────────────────────────────────────┐
│  INFRASTRUCTURE (the OS)                        │
│  • Validator engine (validator.js)              │
│  • Contract loader (contract-loader.js)         │
│  • Run manager (run-manager.js)                 │
│  • CLI / Web API (cli.js → future: api.js)     │
│  • Prompt generator (prompt-generator.js)       │
│  • Validation types: file_exists, not_contains, │
│    min_sources, dir_exists, min_file_count, ... │
├─────────────────────────────────────────────────┤
│  TEMPLATES (the applications)                   │
│  • Workflow definitions (*.json)                │
│  • Gate contracts (*.contract.json)             │
│  • Agent assignments (agent field in workflow)  │
│  • Prompt templates (prompt_template in workflow│
└─────────────────────────────────────────────────┘
```

**The infrastructure never changes per template.** Only contracts, agents, and workflow definitions change. This means:

- A "Visual Essay" pipeline and a "Literature Review Generator" pipeline use the same validator engine
- A "Citation Audit" gate in a visual essay checks for `CITATIONS.md` with Tier 1-2 sources; the same gate type in an academic paper pipeline checks for annotated PDFs with DOI verification
- The `not_contains` validation works identically whether it's checking for `[UNRECONCILED]` in design research or `[PLAGIARISM]` in an academic paper

### What Changes Per Template

| Layer | What Changes | What Stays |
|-------|-------------|------------|
| **Workflow JSON** | Gate sequence, agent assignments, gate names, phases | Schema format |
| **Contracts** | Required files, heading names, source thresholds, failure markers | Validation type syntax |
| **Agents** | Domain expertise, audit criteria, report format specifics | Structured YAML header standard |
| **Prompts** | Domain context, task descriptions, examples | Template substitution engine |

### Gate Types Are Reusable Patterns

The 13-gate visual essay pipeline establishes **gate archetypes** that recur across templates:

| Archetype | Visual Essay Instance | Academic Paper Instance (future) | Pattern |
|-----------|----------------------|----------------------------------|---------|
| **Intake** | G1: Scope approval | G1: Assignment/prompt upload | Human confirms scope |
| **Research** | G2: Research package | G2: Source gathering + annotation | Substance over form |
| **Specification** | G3: 6-layer spec | G3: Outline approval | Blueprint before build |
| **Design** | G4: Visual identity | — (not applicable) | Domain-specific prep |
| **Reconciliation** | G4.1: Design reconciliation | G3.1: Outline-to-sources reconciliation | Cross-reference inputs |
| **Production** | G5: Content implementation | G5: Draft production | The build step |
| **Fidelity Audit** | G5.2: Design fidelity | G5.2: Outline fidelity | Spec-to-output comparison |
| **Source Audit** | G6: Citation audit | G6: Plagiarism + citation check | Source integrity |
| **Domain Audit** | G7: Scroll certification | G7: Readability + formatting | Domain-specific quality |
| **Aggregate QA** | G8: Publication cert | G8: Submission readiness | All-signals synthesis |
| **Human Approval** | G9: Director sign-off | G9: Student review + submit | Human final call |

### Implications for Contract Design

When designing contracts, think in terms of **what the gate archetype validates**, not just the current template:

1. **Research gates** always check for substance (source counts, file counts, directory structure) — the specific files change per template
2. **Audit gates** always require structured reports with YAML frontmatter and `not_contains` failure checks — the audit criteria change per template
3. **Reconciliation gates** always cross-reference two inputs and check for conflict markers — which inputs and which markers change
4. **Human gates** always check for approval/rejection markers — the marker format may change
5. **Production gates** always check for output file existence and basic structural validity — which files and what structure changes

### The Path Forward

This is not something to over-engineer now. The right approach:

1. **Launch with visual essay pipeline** — it establishes all gate archetypes
2. **Build second template** — reveals which parts of the infrastructure generalize cleanly and which need abstraction
3. **Extract shared contract fragments** — common validation patterns become reusable blocks
4. **Build template registry** — web interface pulls workflow definitions from a registry, not hardcoded configs
5. **Customer workflow customization** — customers pick a template and optionally adjust depth, gate strictness, etc.

The architecture already supports this. The `{artifact_path}` and `{slug}` variable system means contracts are parameterized. The validation type system is extensible. The workflow JSON schema is template-agnostic. The investment now is in making the visual essay pipeline excellent and ensuring the standards we establish here carry forward.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-02-08 | Initial standard — three-layer accountability model, structured headers, contract requirements |
| 1.1 | 2026-02-08 | Strengthened all 13 gate contracts to comply with minimum viable contract standard. Added template scalability architecture section. |
| 1.2 | 2026-02-09 | Added G6.5 (Pedagogy Audit) and G6.6 (Prose Quality) to audit pairings, production+QA interleaving, progressive quality chain, and audit gate contract list. |

---

*This standard governs all Esy orchestration workflows. It is maintained by the orchestration team and referenced by all gate contracts, agent definitions, and workflow configurations. Compliance is mandatory for all gates in all workflows.*
