# Orchestration Standards

> Mandatory standards for all Esy orchestration workflows, gates, agents, and contracts.

## Documents

| File | Purpose | Status |
|------|---------|--------|
| [citation-first-source-standard.md](./citation-first-source-standard.md) | **Foundational.** Defines the Citation-First brand promise: artifacts are built FROM sources, not decorated with them. Five source acquisition models (template-assisted, user-provided, hybrid, deep research, constraints). Source-to-artifact traceability chain. Decorative citation anti-pattern. Gate implications. Migration path from current state. | Active — Foundational |
| [gate-accountability.md](./gate-accountability.md) | Three-layer QA model (contract enforcement, producer self-assessment, external audit), structured artifact headers, contract strength requirements, scaling to web interface | Active |
| [intake-quality-principles.md](./intake-quality-principles.md) | Why simple inputs beat comprehensive prompts. Defines the 5-signal intake model, the over-prompting anti-pattern, and where intelligence should live (template design, not intake). Critical for web interface scaling. | Active |
| [pipeline-execution-standard.md](./pipeline-execution-standard.md) | How to run workflows. Defines three execution models (single-session, isolated, API-driven), phased maturity path, and the standard operating procedure. Includes gate sequence table and anti-patterns. | Active |
| [pipeline-testing-standard.md](./pipeline-testing-standard.md) | **Pipeline infrastructure testing.** Defines the testing pyramid (validator unit tests, contract schema tests, regression tests), the "leaky gate" anti-pattern taxonomy (S0–S3 severity), TDD for pipeline changes, fixture design principles, and mandatory coverage requirements before production templates. Born from the "Speed of Everything" postmortem: 10 root causes, 3 caused by untested infrastructure. | Active |
| [visual-essay-engineering-standard.md](./visual-essay-engineering-standard.md) | Mandatory engineering patterns for shipping visual essays. Page structure (`page.tsx` + Client + CSS), `ArtifactDetailWrapper` requirement, `visualEssays.ts` registration, category-based routing, CSP for Three.js, OG image pipeline via R2. Born from "Inside a Black Hole" production corrections. | Active |
| [visualization-quality-standard.md](./visualization-quality-standard.md) | **Foundational.** Defines the 5-tier Visualization Technology Ladder (CSS → SVG → D3+SVG → Canvas → Three.js), Subject-to-Technology Mapping, Component Decomposition Rule (> 80 lines → own file), Visualization Ambition Rubric (1-5 scale, avg ≥ 3.5), anti-patterns, and two new gates: G4.6 (Viz Tech Decision) + G5.4 (Viz Ambition Audit). Born from "Speed of Everything" — 90+ essays using CSS divs while Three.js/D3/Canvas sit installed but unused. | Active — Foundational |
| [diagram-code-contract.md](./diagram-code-contract.md) | **Diagram-code reconciliation standard for visualizations.** Defines the `@diagram-contract` JSDoc annotation format for declaring diagram invariants (direction, labels, scale, domain rules). Requires every visualization function to carry a contract block. Audited at G5.3 by the Diagram-Code Reconciliation Auditor. Supports multiple domains (wave-mechanics, quantum-mechanics, economics, demographics, chronology). Born from the "Anatomy of a Wave" direction arrow bug. | Active |
| [agent-budget-analysis.md](./agent-budget-analysis.md) | **Operational.** Per-gate token estimates, per-essay cost model (~$5.95 hybrid, ~$10.25 all-Opus, ~$4.80 all-Sonnet), hybrid model routing table (Opus for creative/production gates, Sonnet for audits, Haiku for intake), budget caps per gate, cost reduction levers (prompt caching, batch API), and web interface portability plan. Architecture decision: Option B (agents-runtime/ as standalone execution library). | Active |

## Philosophy

Standards are developed reactively — as problems surface during real pipeline execution, we codify the solution into a standard. Standards are not theoretical; they are the crystallization of lessons learned.

### How Standards Evolve

1. A pipeline execution reveals a quality gap (e.g., design issues reaching production)
2. The gap is diagnosed and a solution is designed
3. The solution is implemented across agents, contracts, and workflow definitions
4. The pattern is generalized and codified into a standard
5. Future workflows reference the standard during construction

### Compliance

- **All artifacts MUST be built from traceable sources** per the [Citation-First Source Standard](./citation-first-source-standard.md). No decorative citations.
- All gate contracts MUST comply with the Gate Accountability Standard
- All agent definitions MUST reference applicable standards
- All audit artifacts MUST use structured YAML frontmatter headers
- All intake forms and G1 artifacts MUST comply with the Intake Quality Principles (5-signal maximum)
- All non-trivial visualizations MUST have a research brief per the Visualization Quality Standard before production
- All visualization functions MUST carry a `@diagram-contract` annotation per the [Diagram-Code Contract Standard](./diagram-code-contract.md). Missing contracts are an automatic G5.3 FAIL.
- All templates MUST declare a source acquisition model per the Citation-First Source Standard
- All visual essays MUST follow the [Visual Essay Engineering Standard](./visual-essay-engineering-standard.md) for page structure, wrappers, routing, and deployment
- All pipeline infrastructure changes MUST pass `npm test` per the [Pipeline Testing Standard](./pipeline-testing-standard.md). No untested validators, no phantom validation types, no orphaned contracts.
- Compliance is verified at G8 (Publication Certification) for each run
