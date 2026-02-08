# Intake Quality Principles: Why Simple Inputs Beat Comprehensive Prompts

> Version: 1.0
> Created: February 8, 2026
> Status: Active

## The Core Principle

**Pipeline quality is inversely proportional to intake complexity.** A strong pipeline compensates for a simple prompt. A weak pipeline requires a comprehensive prompt. If you need a 5000-word pre-researched prompt to get a good essay, the pipeline isn't doing its job — it's just expensive formatting.

The goal is always: **make the pipeline strong enough that the intake form can be simple.** That's what scales to customers. No customer will write a 5000-word prompt. They'll fill out 5 fields and press "Generate."

---

## The Anti-Pattern: Over-Prompting

### What It Looks Like

```
Topic idea
    → Deep Research tool (30 min, 5000 words of pre-research)
        → Meta Prompt Enhancer (refined, structured, comprehensive)
            → Visual Essay Intake (pipeline starts with pre-solved problem)
                → G2 Research (performative — just reformats what you already found)
                    → G4 Design (constrained — prompt implies aesthetics)
                        → Pipeline produces... exactly what you specified
```

### Why It's Harmful

1. **G2 Research becomes performative** — the agent reformats what you already found instead of discovering things you didn't think to look for
2. **G4 Design Research loses creative freedom** — a comprehensive prompt implies aesthetics, constraining the design researcher who might derive something better from the subject matter itself
3. **G4.1 Reconciliation has nothing to reconcile** — if you already specified the design, reconciliation is rubber-stamping
4. **The pipeline becomes an assembly line instead of a creative system** — agents can't surprise you because you've already decided everything
5. **You can't test scalability** — if you're internally crafting dramatic prompts for G1, you're not testing what a customer would actually submit through a web form
6. **You're back to prompt engineering** — the pipeline exists so users DON'T need to be prompt engineers

### The Litmus Test

> If removing half the intake document wouldn't change the final essay quality, you over-prompted.

---

## The Correct Pattern: Minimal Intent, Maximum Pipeline

### What the Intake Actually Needs (Core Signals)

| Signal | Why It Matters | Form Field |
|--------|---------------|------------|
| **Clear topic** | Pipeline can't infer intent | Free text (1-2 sentences) |
| **Audience** | Determines depth, tone, vocabulary ceiling | Dropdown or short text |
| **2-3 must-includes** | Author's editorial POV, what makes THIS essay theirs | Tags or bullet input |
| **Quality exemplar** (optional) | Defines "good" by pointing, not describing | Reference link or text |
| **What it's NOT** (optional) | Prevents the pipeline from drifting | Short text |
| **User-supplied sources** (template-dependent) | The material the pipeline works ON | File upload, URL list, paste |

Everything else — research depth, design direction, citation format, scroll behavior, narrative arc — is the pipeline's job to figure out through the gates.

### The Sixth Signal: User-Supplied Sources

Esy is a **citation-first research workflow platform**. This has a direct implication for intake design: many templates exist specifically to do work ON user-provided sources. User-supplied citations are not over-prompting — they are the raw material the pipeline processes.

**Three intake source models exist across templates:**

| Model | When It Applies | Examples |
|-------|----------------|---------|
| **No sources required** | Pipeline discovers all sources during research | Visual essays, explainers, original reporting |
| **Sources optional** | User CAN supply sources to guide research, but pipeline will discover more | Research papers, literature reviews |
| **Sources required** | The template's entire purpose is to work ON user-supplied material | "Fix My Citations," "PDF → Annotated Summary," "Turn My Notes Into a Research Paper" |

**Critical distinction**: User-supplied sources are **input material**, not prompt engineering. A student uploading 5 PDFs for "Literature Review Generator" is providing raw material for the pipeline to process — they're not telling the pipeline HOW to work. This is the same as a chef receiving ingredients vs. receiving a recipe.

```
INPUT MATERIAL (legitimate)              OVER-PROMPTING (anti-pattern)
────────────────────────                 ──────────────────────────────
• 5 academic PDFs to synthesize          • "Synthesize these using thematic analysis
• A messy notes document to structure      with APA format, starting with methodology..."
• A list of URLs to fact-check           • "Check these links and organize by credibility
• Raw interview transcripts                tier, noting any that contradict the thesis..."
```

The user supplies WHAT to work on. The template defines HOW to work on it. The pipeline executes.

**Template design responsibility**: Each template must declare its source model in its configuration. This determines whether the intake form shows a source upload field, and whether source absence blocks G1.

### Example: Minimal Intake That Should Produce Excellence

```markdown
# G1 Intake: Inside a Black Hole

Topic: What physics actually tells us about the interior of black holes
Audience: Curious adults who watch Kurzgesagt/Veritasium but haven't studied physics
Must Include: Penrose diagrams (simplified), gravitational lensing visualization,
  the information paradox, what happens at the singularity
Quality Exemplar: Kurzgesagt's "Black Holes" video as a scrollytelling reading experience
What It's NOT: Not a physics textbook, not sci-fi speculation, not about how black holes form
```

Seven lines. If the pipeline can't produce an excellent essay from this, the pipeline needs strengthening — not the intake.

---

## Where Intelligence Should Live

### NOT at Intake (User's Job)

The user provides intent, not instructions. They say WHAT they want, not HOW to build it.

- ❌ "Use a dark color palette with deep purples and event-horizon gradients"
- ✅ "Audience: curious adults, not physicists"

- ❌ "Research should include Penrose 1965, Hawking 1974, the EHT 2019 results..."
- ✅ "Must include: Penrose diagrams, the information paradox"

- ❌ "The scroll experience should lock sections with parallax backgrounds and..."
- ✅ (Nothing — this is the pipeline's job entirely)

### AT the Pipeline (Gate's Job)

Each gate owns a dimension of quality. The gates take the simple intake and build progressively:

```
G1  Intake         → Validates the 5 signals are present and coherent
G2  Research       → DISCOVERS sources, builds research package from topic
G3  Spec           → GENERATES 6-layer spec from intake + research
G4  Design         → DERIVES visual identity from subject matter
G4.1 Reconciliation → AUDITS design for authenticity and originality
G5  Production     → BUILDS the essay from spec + design + research
G5.2 Fidelity     → AUDITS implementation against design
G6  Citations      → AUDITS source integrity
G7  Scroll         → AUDITS interaction quality
G8  Publication    → AGGREGATES all quality signals
G9  Approval       → HUMAN makes final call
```

The pipeline's competitive advantage is that agents can surprise you. The design researcher might find that the visual identity for a black hole essay should be derived from Penrose's original hand-drawn diagrams — you'd never think to specify that.

### AT Template Design Time (Our Job)

This is where the Meta Prompt Enhancer and deep prompt engineering DO belong — not at intake, but at template design time:

- Crafting the system prompts that each gate's agent receives
- Defining the default opinions each template bakes in
- Designing the quality vector (what "good" means for this template type)
- Engineering the agent definitions in `orchestration/agents/`

The quality of these system prompts (the agent definitions) is what determines output quality at scale. The user's input just parameterizes them.

```
INTELLIGENCE DISTRIBUTION
─────────────────────────

Template Design Time (our job, once per template)
├── Agent definitions           ← Deep prompt engineering lives HERE
├── Gate contracts              ← Quality standards live HERE
├── Default template opinions   ← Sensible defaults live HERE
└── Workflow definition         ← Gate sequence lives HERE

Intake Time (user's job, once per essay)
├── Topic                       ← Simple
├── Audience                    ← Simple
├── Must-includes               ← Simple
├── Quality exemplar            ← Optional
├── What it's NOT               ← Optional
└── User-supplied sources       ← Template-dependent (raw material, not instructions)

Pipeline Execution (agents' job, automated)
├── Research                    ← Agent discovers
├── Specification               ← Agent generates
├── Design                      ← Agent derives
├── Production                  ← Agent builds
├── Audits                      ← Agents verify
└── Certification               ← Agents aggregate
```

---

## For Template Scaling (Web Interface)

When the pipeline runs through a web interface, the architecture is:

```
USER INPUT (minimal form)         TEMPLATE OPINIONS (pre-baked by us)
─────────────────────────         ──────────────────────────────────
• Topic (free text)               • Essay type defaults
• Audience (dropdown)             • Depth mode (quick/standard/deep)
• 2-3 must-includes (tags)        • Design philosophy constraints
• Quality exemplar (optional)     • Gate strictness levels
• What it's NOT (optional)        • Default quality thresholds
• Sources (template-dependent)    • Source model (none/optional/required)
                │                              │
                └──────────┬───────────────────┘
                           ▼
                ┌─────────────────────┐
                │  INTAKE SYNTHESIZER  │
                │  (G1 agent)          │
                │                     │
                │  Combines user input │
                │  + template defaults │
                │  → G1-INTAKE.md     │
                └─────────┬───────────┘
                          ▼
                 Pipeline runs G2→G9
```

The user never writes a prompt. The intake form IS the prompt. The template's opinions fill in everything the user doesn't specify. This only works if the pipeline is strong enough to handle simple inputs.

---

## Quality Must Be Pre-Defined, But Not By the User

Quality is a vector, not a number. Different gates own different dimensions:

| Quality Dimension | Owned By | Defined In |
|-------------------|----------|------------|
| Factual accuracy | G2, G6 | Agent definitions + contracts |
| Design distinctiveness | G4, G4.1, G5.2 | Design slop auditor thresholds |
| Narrative engagement | G5, G7 | Spec template + scroll auditor |
| Source integrity | G5.5, G6 | Citation audit agent standards |
| Technical performance | G7 | Scroll certification criteria |
| Publication readiness | G8 | Aggregate certification logic |

These quality dimensions are defined at **template design time**, not at intake. The user doesn't need to know about them. They just need to provide clear intent, and the pipeline applies the quality standards automatically.

---

## Decision Framework: "Should I Add This to the Intake?"

When tempted to add more to an intake document or form field, ask:

| Question | If Yes | If No |
|----------|--------|-------|
| Would a customer on the web form provide this? | Maybe include it | Don't include it |
| Does this constrain the pipeline's creative freedom? | Don't include it | Maybe include it |
| Would the essay be wrong without this? | Include it | Don't include it |
| Is this a HOW instruction or a WHAT requirement? | Don't include it (HOW) | Include it (WHAT) |
| Would an agent discover this during research anyway? | Don't include it | Include it |

**The simplest test**: If you're writing more than 10 lines for the intake, you're over-prompting.

---

## Validation Status & Known Nuances

> **Status: Architectural principle, not yet validated by pipeline results.**
> These principles represent correct directional thinking. They will be refined as actual pipeline runs confirm or challenge them. The first validation test is "Inside a Black Hole: What Physics Tells Us" — a visual essay run from a minimal intake.

### What Needs Proving

1. **Can the pipeline produce excellence from a minimal intake?** The water scarcity essay required manual intervention at nearly every gate. A 7-line intake is the north star, not yet proven. If the black hole essay comes out mediocre from minimal intake, that's diagnostic data about which gates need strengthening — not evidence that the principles are wrong.

2. **The quality exemplar signal is the most powerful and least supported.** "Like Kurzgesagt's black hole video" communicates tone, visual ambition, audience level, and pacing in one reference. But no gate currently translates an exemplar into actionable spec requirements. G3's spec agent would need to understand what "Kurzgesagt-like" means. This is a capability gap to close.

### Nuances to the Model

3. **A fourth source model may emerge: sources as constraints.** Beyond none/optional/required, some users will want to *limit* the pipeline to only certain sources. "Write about X using ONLY these 3 assigned readings." That's a research boundary, not input material. Academic integrity contexts (students citing only assigned readings) will need this. It's architecturally distinct from the three models above.

4. **Editorial intent is not over-prompting.** The anti-pattern targets HOW instructions ("use purple gradients, parallax scroll, APA format"). But WHAT intent from an experienced author is legitimate: "the narrative arc should move from wonder to existential unease." The distinction is type, not length. A 15-line intake with strong editorial vision may produce a better essay than a generic 7-line one. The 10-line heuristic is a guard against over-prompting, not a ceiling on editorial voice.

5. **Standards are ahead of implementation.** Two polished standards documents, zero successful end-to-end runs from minimal intake. These principles should be treated as hypotheses to validate, then codified as proven patterns after testing. Each pipeline run that succeeds or fails from minimal intake will refine the model.

### Validation Log

| Test | Date | Intake Size | Result | Lessons |
|------|------|-------------|--------|---------|
| The Geography of Water Scarcity | 2026-02-08 | Over-prompted (pre-existing) | Passed all gates with manual intervention | Pipeline needs strengthening; gates were toothless (now fixed) |
| Inside a Black Hole | TBD | Minimal (7-line) | TBD | First true test of intake minimalism principles |

---

## Summary

1. **The pipeline exists so users don't need to be prompt engineers.** If the intake requires prompt engineering, the pipeline has failed.
2. **Core signals + source material is enough**: topic, audience, must-includes, quality exemplar, what-it's-not, and (for applicable templates) user-supplied sources.
3. **User-supplied sources are input material, not over-prompting.** A student uploading PDFs is providing ingredients, not a recipe. The template defines how to process them.
4. **Deep prompt engineering belongs at template design time**, not at intake time. Engineer the agents, not the intake.
5. **The test of pipeline quality is whether a simple intake produces excellence.** If it doesn't, strengthen the pipeline, not the intake.
6. **Every internal test run should simulate the customer experience.** If you're crafting dramatic prompts internally, you're not testing what ships.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-02-08 | Initial principles — intake minimalism, intelligence distribution, anti-patterns |
| 1.1 | 2026-02-08 | Added user-supplied sources as template-dependent sixth signal. Defined three source models (none/optional/required). Clarified that source material is input, not over-prompting. |
| 1.2 | 2026-02-08 | Added Validation Status section. Documented known nuances (exemplar gap, fourth source model, editorial intent distinction). Added validation log for tracking pipeline test results. |

---

*This document establishes the intake quality philosophy for all Esy orchestration workflows. It prevents the anti-pattern of front-loading intelligence into prompts instead of building it into the pipeline. Compliance with these principles is essential for any workflow intended to scale to the web interface.*
