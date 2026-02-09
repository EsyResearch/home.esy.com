# Orchestration Standards

> Mandatory standards for all Esy orchestration workflows, gates, agents, and contracts.

## Documents

| File | Purpose | Status |
|------|---------|--------|
| [citation-first-source-standard.md](./citation-first-source-standard.md) | **Foundational.** Defines the Citation-First brand promise: artifacts are built FROM sources, not decorated with them. Five source acquisition models (template-assisted, user-provided, hybrid, deep research, constraints). Source-to-artifact traceability chain. Decorative citation anti-pattern. Gate implications. Migration path from current state. | Active — Foundational |
| [gate-accountability.md](./gate-accountability.md) | Three-layer QA model (contract enforcement, producer self-assessment, external audit), structured artifact headers, contract strength requirements, scaling to web interface | Active |
| [intake-quality-principles.md](./intake-quality-principles.md) | Why simple inputs beat comprehensive prompts. Defines the 5-signal intake model, the over-prompting anti-pattern, and where intelligence should live (template design, not intake). Critical for web interface scaling. | Active |
| [pipeline-execution-standard.md](./pipeline-execution-standard.md) | How to run workflows. Defines three execution models (single-session, isolated, API-driven), phased maturity path, and the standard operating procedure. Includes gate sequence table and anti-patterns. | Active |
| [visual-essay-engineering-standard.md](./visual-essay-engineering-standard.md) | Mandatory engineering patterns for shipping visual essays. Page structure (`page.tsx` + Client + CSS), `ArtifactDetailWrapper` requirement, `visualEssays.ts` registration, category-based routing, CSP for Three.js, OG image pipeline via R2. Born from "Inside a Black Hole" production corrections. | Active |
| [visualization-quality-standard.md](./visualization-quality-standard.md) | Why every non-trivial visualization needs a research brief before production. Defines the two-phase audit model (research integrity + comprehension test), visualization taxonomy (Tier 1-4), structured deliverable format, anti-pattern blacklist, and pipeline integration for G4.V. Born from the "Inside a Black Hole" lesson. | Active |

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
- All templates MUST declare a source acquisition model per the Citation-First Source Standard
- All visual essays MUST follow the [Visual Essay Engineering Standard](./visual-essay-engineering-standard.md) for page structure, wrappers, routing, and deployment
- Compliance is verified at G8 (Publication Certification) for each run
