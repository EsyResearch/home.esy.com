# Visualization Quality Standard: Research Before Rendering

> Version: 1.0
> Created: February 9, 2026
> Status: Active

## Purpose

This document defines the standard for visualization quality in all Esy visual essays. It establishes that **every non-trivial visualization must be researched before it is rendered**, documents the audit model for verifying visualization research quality, and codifies the structured deliverable format that makes research auditable.

This standard exists because the pipeline was producing visualizations that were structurally present but visually and conceptually inadequate — flat where they should be dimensional, confusing where they should clarify, and generic where they should be authoritative.

---

## Origin: The Black Hole Lesson

### What Happened

The "Inside a Black Hole" essay passed all 13 gates (G1–G9) successfully. Contracts validated. Scores passed thresholds. Yet when reviewed, multiple visualizations were substandard:

| Visualization | Problem | Root Cause |
|---|---|---|
| Penrose Diagram | Flat diamond, no conformal grid, visually meaningless | No research on what Penrose diagrams actually require |
| Tidal Comparison | Stick figures confusing to non-physicists | No research on how tidal forces are best communicated visually |
| Information Flow | Flat, generic, no depth | No research on how information paradox is typically visualized |
| Gravitational Lensing | The ONE good one — compelling and informative | Accidentally followed natural visual conventions (rings, distortion) |

### Root Cause Analysis

The pipeline had a **research gap** between knowing WHAT to visualize and knowing HOW to visualize it:

```
G2 Research     → "The essay needs a Penrose diagram"         ✅ (identified)
G3 Spec         → "Section 6: Penrose diagram visualization"  ✅ (specified)
G4 Design       → "Colors: deep-void black, hawking-gold"     ✅ (styled)
G4.1 Reconcile  → "Design is authentic to subject"            ✅ (verified)
                   ↓
                   ??? NO STEP FOR: "What does a good Penrose diagram actually look like?"
                   ??? NO STEP FOR: "What are the essential features that make it communicate physics?"
                   ??? NO STEP FOR: "What implementation approach (SVG? D3? Canvas?) is appropriate?"
                   ↓
G5 Production   → Agent builds a flat diamond with no grid    ❌ (bad output)
G5.2 Fidelity   → "Colors match DESIGN-RESEARCH.md"          ✅ (true but irrelevant)
G7 Scroll       → "Scroll performance meets standard"         ✅ (true but irrelevant)
G8 Pub Cert     → "All gates passed"                          ✅ (technically correct)
```

**The pipeline was checking everything except whether the visualization actually communicated what it needed to communicate.**

### The Lesson

Passing all gates doesn't mean passing the reader's eyes. Quality gates catch structural and stylistic violations, but they can't catch **conceptual inadequacy** — a visualization that is structurally valid CSS/SVG but conceptually wrong for its purpose. That requires **domain-specific visualization research**.

---

## The Core Principle

**Every non-trivial visualization must have a research brief before it is built.**

A "non-trivial visualization" is any diagram, chart, or interactive visual that:
- Represents a domain-specific concept (Penrose diagram, supply/demand curve, DNA helix)
- Could be rendered in multiple valid ways, some dramatically better than others
- Requires the reader to understand something from the visual alone (not just decoration)

Simple elements (progress bars, decorative separators, basic data counters) don't require visualization research. But any visualization that carries conceptual weight does.

### The Research-Before-Rendering Contract

| Principle | Requirement |
|---|---|
| **No rendering without research** | The production agent MUST NOT build a domain-specific visualization without a research brief |
| **Research must cite exemplars** | Every brief must reference specific, verifiable examples of the visualization done well |
| **Essential features must be enumerated** | Not "make it good" but "must have: conformal grid, 45° light rays, labeled vertices" |
| **Anti-patterns must be specific** | Not "don't make it ugly" but "don't use a flat diamond without grid lines because..." |
| **Implementation must be justified** | "Use D3" must explain WHY D3 specifically, what capability it provides |
| **A comprehension test must exist** | A specific statement of what the reader should understand from the visual alone |

---

## The Two-Phase Audit Model

Visualization quality is audited in two phases, because what makes visualization research *good* splits into things that can be checked mechanically and things that require human judgment.

### Phase A: Research Integrity (Pre-Production, Systematic)

These checks can be performed by an auditing agent or by a human scanning the `VISUALIZATION-RESEARCH.md` document:

#### 1. Reference Exemplar Verification

Every exemplar must cite a **specific** source — not categories, but instances.

| ❌ Vague (Unverifiable) | ✅ Specific (Verifiable) |
|---|---|
| "Standard Penrose diagrams" | "MTW *Gravitation* (1973), Figure 31.4" |
| "Good examples from Wikipedia" | "Wikipedia 'Penrose diagram' — Schwarzschild section, SVG version" |
| "Science YouTube videos" | "PBS Space Time, 'Penrose Diagrams' (YouTube), timestamp 8:23–9:41" |

An auditor can verify: **Does this source exist? Does it actually show what the agent claims?**

#### 2. Essential Feature Traceability

Every "required feature" must trace back to a reference exemplar or domain standard.

| ❌ Unjustified | ✅ Traced |
|---|---|
| "Must have curved grid lines" | "Must have curved grid lines — these represent the conformal mapping of Schwarzschild coordinates (see MTW Fig. 31.4, Carroll Ch. 5.7). Without them, the diagram communicates shape but not the warping of spacetime." |
| "Should look 3D" | "Should use radial gradient shading on interior region — this convention (see Hawking & Ellis, Fig. 9.1) distinguishes the trapped region from the exterior" |

An auditor can check: **Is the reasoning sound? Does the cited source actually support this claim?**

#### 3. Anti-Pattern Justification

Every anti-pattern must explain **why** it fails, not just that it's bad.

| ❌ Prescriptive Only | ✅ Justified |
|---|---|
| "Don't use a flat diamond" | "A flat diamond without conformal grid lines fails the comprehension test because the reader cannot distinguish 'inside the horizon, all paths lead to the singularity' from 'the interior is just a shaded triangle'" |
| "Don't use stick figures" | "Stick figures for tidal forces fail because they anthropomorphize an abstract force, making the reader think about injury rather than spacetime geometry" |

#### 4. Implementation Prescription Rationale

"Use D3" must say **why** D3 specifically.

| ❌ Tool Name Only | ✅ Justified |
|---|---|
| "Use D3.js" | "Use D3.js because conformal coordinate transformation (Schwarzschild → Kruskal-Szekeres → Penrose) requires parametric curve generation. Inline SVG cannot compute these curves at render time." |
| "Use SVG" | "Use inline SVG because this diagram is static and geometric — no coordinate transformation needed, and SVG paths give precise control over the diamond shape and grid lines." |

### Phase B: Comprehension Test (Post-Production, Human-in-the-Loop)

This is the part that **cannot be fully automated** and is the highest-value human review point.

Every visualization prescription includes a **comprehension test** — a falsifiable statement of what the visualization should communicate on its own, without surrounding prose:

```markdown
### Comprehension Test
> A first-time reader should understand from this visualization alone:
> 1. All of spacetime fits on one finite page
> 2. Light always travels at 45° angles on this page
> 3. Inside the shaded region, every possible path leads upward to the singularity
> 4. There is no path from inside to outside
```

After production, the audit is: **Does the implemented visualization pass this test?**

In the current development phase, this is a human-in-the-loop check — you look at the diagram and ask "does a first-time reader get this?" In the web interface at scale, this could be:
- Evaluated by a dedicated QA agent that hasn't seen the implementation
- A/B tested with real users
- Reviewed against the comprehension test criteria by the Diagram Clarity Auditor

---

## The Structured Deliverable: VISUALIZATION-RESEARCH.md

The audit process shapes the deliverable format. If the output is structured for auditability, the agent is constrained to produce auditable research.

### Per-Visualization Brief Format

Every non-trivial visualization in the essay gets its own brief within `VISUALIZATION-RESEARCH.md`:

```markdown
## Visualization: [Name]

### Classification
- Type: [Diagrammatic / Statistical / Geographic / Comparative / Conceptual]
- Domain: [e.g., General Relativity / Economics / Biology]
- Complexity: [Low / Medium / High] — [brief justification]

### Reference Exemplars
1. **[Source Title] ([Year]), [Figure/Page/Timestamp]**
   - Features: [what this exemplar does well]
   - Why it works: [specific reason it communicates effectively]

2. **[Source Title] ([Year/URL])**
   - Features: [what this exemplar does well]
   - Why it works: [specific reason]

3. **[Source Title] ([Year/URL])**
   - Features: [what this exemplar does well]
   - Why it works: [specific reason]

### Essential Features (Required)
| Feature | Justification | Source |
|---|---|---|
| [Feature 1] | [Why this is necessary for comprehension] | [Which exemplar/source] |
| [Feature 2] | [Why this is necessary] | [Source] |
| [Feature 3] | [Why this is necessary] | [Source] |

### Anti-Patterns
| Don't | Why | What Instead |
|---|---|---|
| [Anti-pattern 1] | [Why it fails — specific comprehension failure] | [What to do instead] |
| [Anti-pattern 2] | [Why it fails] | [Alternative] |

### Implementation Prescription
- **Approach**: [D3.js / Inline SVG / Canvas / CSS-only]
- **Why this approach**: [Specific capability required that this approach provides]
- **Fallback**: [If primary approach is unavailable, what's the alternative?]
- **Key technical notes**: [Any specific implementation details the production agent needs]

### Comprehension Test
> A first-time reader should understand from this visualization alone:
> 1. [Specific understanding #1]
> 2. [Specific understanding #2]
> 3. [Specific understanding #3]
```

### Document-Level Structure

```markdown
---
gate: G4.V
type: research
status: PASS | CONDITIONAL | FAIL
visualization_count: [N]
high_complexity_count: [N]
agent: visualization-research-agent
date: YYYY-MM-DD
essay: essay-slug
---

# Visualization Research: [Essay Title]

## Summary
- **Total visualizations**: N
- **High complexity**: N (require D3 or equivalent)
- **Medium complexity**: N (structured SVG with interaction)
- **Low complexity**: N (static SVG or CSS-only)

## Visualization Index
| # | Name | Type | Complexity | Approach |
|---|---|---|---|---|
| 1 | [Name] | [Type] | [H/M/L] | [D3/SVG/CSS] |
| 2 | [Name] | [Type] | [H/M/L] | [D3/SVG/CSS] |

---

## Visualization 1: [Name]
[Per-visualization brief — see format above]

## Visualization 2: [Name]
[Per-visualization brief]

...
```

---

## Visualization Taxonomy

Different visualization types have different research requirements. This taxonomy helps the research agent calibrate depth:

### Tier 1: Domain-Standard Diagrams (HIGH research requirement)

Visualizations with established conventions in their field. Getting these wrong signals incompetence to anyone familiar with the domain.

| Type | Examples | Why High Research |
|---|---|---|
| Scientific diagrams | Penrose diagram, Feynman diagram, phase diagram | Domain experts expect specific conventions |
| Medical illustrations | Anatomical cross-sections, pathway diagrams | Clinical accuracy is non-negotiable |
| Engineering schematics | Circuit diagrams, architectural plans | Symbol standards exist (IEEE, ISO) |
| Mathematical visualizations | Manifolds, topology, function spaces | Precision of representation matters |

**Research requirement**: 3+ reference exemplars from authoritative sources. All essential features must trace to domain standards. Anti-patterns must explain domain-specific failures.

### Tier 2: Data Visualizations (MEDIUM research requirement)

Charts and graphs that encode data. The visualization type is well-understood, but the design choices matter.

| Type | Examples | Why Medium Research |
|---|---|---|
| Statistical charts | Bar, line, scatter, area | Well-understood but easy to misapply |
| Geographic visualizations | Choropleths, flow maps | Projection choices matter |
| Comparison visualizations | Small multiples, parallel coordinates | Layout choices affect comprehension |
| Proportional visualizations | Sankey, treemap, waffle | Proportional encoding must be accurate |

**Research requirement**: 1-2 reference exemplars. Focus on data-type appropriateness and encoding accuracy. Anti-patterns focus on misleading representations (truncated axes, inappropriate chart types).

### Tier 3: Conceptual Illustrations (MEDIUM research requirement)

Visualizations that explain abstract concepts through metaphor or analogy.

| Type | Examples | Why Medium Research |
|---|---|---|
| Process flows | Tidal stretching, cellular division | Metaphor choice determines comprehension |
| Comparative diagrams | Before/after, side-by-side | What to compare and how affects understanding |
| Abstract concept maps | Information flow, causal chains | Layout implies relationships that may be wrong |

**Research requirement**: 2+ reference exemplars. Focus on whether the visual metaphor helps or hinders understanding. Comprehension test is critical.

### Tier 4: Decorative/Ambient (LOW research requirement)

Visualizations that create atmosphere but don't carry primary informational weight.

| Type | Examples | Why Low Research |
|---|---|---|
| Background effects | Star fields, particle systems, gradients | Aesthetic, not informational |
| Progress indicators | Custom progress bars, section dividers | Subject-derived (handled by Design Slop Auditor) |
| Decorative icons | Section markers, bullet replacements | Stylistic consistency matters, not domain accuracy |

**Research requirement**: No per-visualization brief needed. Handled by existing design research (G4) and slop audit (G8).

---

## Anti-Pattern Blacklist

These visualization patterns are **never acceptable** in Esy visual essays, regardless of essay type:

| Anti-Pattern | Why It Fails | What Instead |
|---|---|---|
| **System emojis as diagram elements** | Signals cheap, unresearched output; not resolution-independent; varies by OS | Custom SVG elements derived from subject matter |
| **Flat geometric shapes with no visual encoding** | A diamond that's "just a diamond" communicates nothing | Shapes with internal structure (grids, gradients, labels) |
| **Stick figures for scientific concepts** | Anthropomorphizes abstract forces; looks childish | Abstract representations, field lines, gradient visualizations |
| **Library default colors in visualizations** | D3/Chart.js defaults signal "I didn't customize this" | Essay palette tokens applied to all visualization elements |
| **Generic tooltips/popovers** | Library-default styling breaks essay design system | Custom tooltips using essay typography and colors |
| **Static SVG for dynamic concepts** | Some concepts (tidal forces, gravitational lensing) are inherently about change/motion | Animation, interaction, or progressive reveal |
| **Text labels as primary communicator** | If the visualization needs a paragraph of labels to work, it's not working | The visual structure should communicate; labels supplement |
| **Placeholder implementations** | "TODO: improve this diagram" shipped to production | No visualization ships without meeting its comprehension test |

---

## Pipeline Integration

### Where Visualization Research Fits

```
G2 Research     → Identifies WHAT needs to be visualized
G3 Spec         → Specifies visualization requirements (type, data, purpose)
G4 Design       → Derives visual identity (colors, typography, animation philosophy)
G4.1 Reconcile  → Verifies design authenticity

  → G4.V Visualization Research (NEW)
      Input: G3 spec (what to visualize) + G4 design (how it should look)
      Output: VISUALIZATION-RESEARCH.md (how each visualization should work)
      Agent: visualization-research-agent (NEW)
      Parallel to: G4.5 (Image Sourcing) — both can run after G4.1

G4.5 Images     → Sources external imagery
G5 Production   → Builds the essay (now WITH visualization research as input)
G5.2 Fidelity   → Verifies design token compliance
G6 Citations    → Verifies source integrity
G7 Scroll       → Verifies interaction quality + COMPREHENSION TEST enforcement
G8 Pub Cert     → Aggregate QA (slop audit includes visualization quality)
```

### How Existing Agents Reference Visualization Research

| Agent | How They Use VISUALIZATION-RESEARCH.md |
|---|---|
| **Production Orchestrator (G5)** | Reads each visualization brief as a construction spec. Essential features become implementation requirements. Anti-patterns become constraints. Implementation prescription determines technology. |
| **Design Fidelity Auditor (G5.2)** | Adds visualization-specific checks: do chart colors match essay palette? Do diagram elements use essay typography? |
| **Diagram Clarity Auditor (G7)** | Evaluates each visualization against its comprehension test. Checks diagram language consistency. |
| **Design Slop Auditor (G8)** | Checks that visualizations are subject-derived, not library defaults. |

### Gate Contract (G4.V)

The Visualization Research gate validates:
1. `VISUALIZATION-RESEARCH.md` exists in the essay directory
2. Document has structured YAML frontmatter
3. Document does NOT contain `status: FAIL`
4. Document does NOT contain `[PLACEHOLDER]` or `[TODO]`
5. At least one visualization brief is present

### When G4.V is Not Required

Some essays may not have non-trivial visualizations. The gate can be **skipped** if:
- The G3 spec contains zero Tier 1-3 visualizations
- All visual elements are Tier 4 (decorative/ambient)
- The essay type is purely text-based (no visualization component)

The skip decision is documented in the run record and must be justified.

---

## The HITL Dimension

### Why This Gate Is High-Value for Human Review

Visualization research is one of the **most cost-effective human review points** in the entire pipeline:

| Review Point | Cost to Review | Cost of Failure |
|---|---|---|
| G1 Intake | ~1 min | Low (pipeline compensates) |
| G2 Research | ~5 min (scanning sources) | Medium (bad research propagates) |
| **G4.V Visualization Research** | **~2-3 min per visualization** | **High (bad visualizations require rebuilding)** |
| G5 Production | ~15 min (reviewing full essay) | Very High (already built) |
| G9 Approval | ~10 min | Highest (about to publish) |

Reviewing 3-5 visualization briefs takes minutes. Rebuilding 3-5 bad visualizations post-production takes hours. The leverage ratio is 10:1 or higher.

### Web Interface Implication

In the web interface, `VISUALIZATION-RESEARCH.md` could be surfaced as an **approval step** before G5:
- "Here's how we plan to visualize [X]. Does this match your expectations?"
- Customer sees the reference exemplars, essential features, and comprehension test
- Customer approves, modifies, or rejects each visualization plan
- Only approved plans proceed to production

This is a natural HITL gate that adds value without adding friction — the customer WANTS to see the plan before production.

---

## Scaling Considerations

### For Different Essay Types

| Essay Type | Typical Visualization Count | Research Depth |
|---|---|---|
| Data Journalism | 5-10 (charts, maps, widgets) | Medium — mostly Tier 2 |
| Conceptual/Scientific | 3-7 (diagrams, process flows) | High — often Tier 1 |
| Historical/Narrative | 1-3 (timelines, maps) | Low-Medium — mostly Tier 2-3 |
| Literary Analysis | 0-2 (text-focused) | Minimal — often skippable |

### For Template Scalability

The visualization taxonomy (Tier 1-4) enables **template-level configuration**:
- A "Scientific Explainer" template sets default research depth to HIGH for all diagrams
- A "Data Dashboard" template sets default to MEDIUM with chart-type-specific checklists
- A "Personal Essay" template sets default to LOW or skippable

The research brief format is template-agnostic — it works for Penrose diagrams and pie charts alike.

### Quality Over Time

As the pipeline produces more essays, we accumulate a **visualization pattern library**:
- Successful visualization briefs become templates for similar future visualizations
- Anti-patterns from failed visualizations are added to the blacklist
- Comprehension test failures feed back into the research agent's instructions
- Reference exemplar quality improves as we curate which sources produce the best results

---

## Relationship to Other Standards

| Standard | Relationship |
|---|---|
| [Gate Accountability](./gate-accountability.md) | G4.V must comply with three-layer accountability — contract enforcement, structured artifact header, audit trail |
| [Intake Quality Principles](./intake-quality-principles.md) | The user does NOT specify visualization approaches in the intake. "Must include: Penrose diagrams" is enough. The pipeline researches how to do it well. |
| [Pipeline Execution Standard](./pipeline-execution-standard.md) | G4.V follows the same gate start/finish CLI workflow as all other gates |

---

## Decision Framework: "Does This Need a Visualization Brief?"

| Question | If Yes → Brief Required | If No → Skip |
|---|---|---|
| Does the visualization represent a domain concept with established conventions? | Penrose diagram, supply/demand curve | Decorative gradient |
| Could the visualization be done wrong in a way that confuses the reader? | Tidal force comparison, election map | Background star field |
| Would a domain expert have opinions about how this should look? | Feynman diagram, financial flow | Progress bar shape |
| Does the visualization need to communicate something without prose? | Information paradox flow, DNA replication | Section divider |

If 2+ answers are "yes" → write a brief. If 0-1 → handled by existing design research.

---

## Version History

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-02-09 | Initial standard — root cause analysis from black hole essay, two-phase audit model, structured deliverable format, visualization taxonomy, anti-pattern blacklist, pipeline integration |

---

*This standard governs visualization quality for all Esy visual essays. It was developed after the "Inside a Black Hole" pipeline run revealed that passing all gates doesn't guarantee visualization effectiveness. The core principle — research before rendering — ensures that every non-trivial visualization is informed by domain conventions, verified by exemplars, and tested against comprehension criteria. Compliance with this standard is enforced by the Visualization Research Agent (G4.V) and verified by the Diagram Clarity Auditor (G7) and Design Slop Auditor (G8).*
