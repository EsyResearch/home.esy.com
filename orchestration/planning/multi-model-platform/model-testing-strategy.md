# Model Testing Strategy

> How to evaluate whether a new AI model (e.g., ChatGPT 5.3) can perform specific agent roles within Esy's orchestration pipeline.

## Principle: Test at Gate Boundaries, Not Whole Pipelines

Don't test a new model by running it through the entire 9-gate pipeline. That conflates too many variables. Instead:

1. Pick a **single gate** (e.g., G2 Research, or G5 Production)
2. Give the model the **agent .md file** as its system prompt
3. Give it the **same inputs** the gate expects (intake doc, research package, spec, etc.)
4. Evaluate the output against the **gate contract** (same checklist, same validation)
5. Compare against the **baseline** (what Claude produced for the same gate)

This isolates the variable: same contract, same inputs, different model.

## Testing Levels

### Level 1: Single-Agent Evaluation

Test one agent's job with one model.

**Example: Test ChatGPT 5.3 on the Research Agent role (G2)**

```
Input:
  - System prompt: orchestration/agents/research/concept-research-agent.md
  - Research profile: orchestration/profiles/research/data-journalism-research-profile.md
  - Intake doc: orchestration/projects/the-geography-of-water-scarcity/G1-INTAKE.md

Expected output:
  - CONCEPTS.md, SEQUENCE.md, DEFINITIONS.md, ANALOGIES.md, MISCONCEPTIONS.md, CLAIMS.md
  - DATASETS.md, STATISTICS.md, COMPARISONS.md, PROJECTIONS.md

Evaluation:
  - Do all 10 files exist? (file_exists validation)
  - Do they contain required headings? (contains_headings validation)
  - Are sources cited at the expected tier distribution? (manual review)
  - Is the content quality comparable to Claude's output? (human judgment)
```

### Level 2: Multi-Agent Pipeline Segment

Test a sequence of 2-3 gates with the same model (or mixed models).

**Example: Test G2 → G3 with ChatGPT 5.3**

1. Run G2 (Research) with ChatGPT 5.3 → produces research package
2. Run G3 (Spec Construction) with ChatGPT 5.3 → produces invocation spec from that research
3. Evaluate: Does the spec reference the research correctly? Is the 6-layer structure sound?

This tests whether a model can build on its own prior output — a key capability for pipeline coherence.

### Level 3: Full Pipeline Comparison

Run the complete pipeline twice — once with Claude, once with the test model — and compare the final artifacts.

This is the most expensive test but the most definitive. Use it only after Level 1 and Level 2 show the model is competitive.

## Evaluation Criteria Per Gate

| Gate | Automated Checks | Human Review Criteria |
|------|-------------------|----------------------|
| G1 (Intake) | File exists, required fields present | Scope appropriateness, mode detection |
| G2 (Research) | 10 files exist, headings present, source count ≥ threshold | Source quality, claim verification depth, dataset relevance |
| G3 (Spec) | File exists, 6 layers present | Visualization specs completeness, section architecture quality |
| G4 (Design) | Design tokens file exists | Aesthetic judgment, palette appropriateness, typography choices |
| G5 (Production) | .jsx file exists, compiles, renders | Prose quality, visual quality, interaction smoothness, mobile responsiveness |
| G6 (Audit) | Audit report exists | Accuracy of audit findings, false positive/negative rate |
| G6.1 (Data) | Data audit report exists | Visual encoding accuracy, projection correctness |
| G7 (QA) | Remediation report exists | Were audit findings actually fixed? |

## Scoring Rubric

For each gate output, score on 5 dimensions:

| Dimension | 1 (Fail) | 3 (Adequate) | 5 (Excellent) |
|-----------|----------|--------------|----------------|
| **Completeness** | Missing required sections/files | All required elements present | Exceeds requirements with useful additions |
| **Accuracy** | Factual errors or fabrications | Generally accurate, minor issues | Verified, well-sourced, precise |
| **Structure** | Disorganized, doesn't follow template | Follows template, minor deviations | Clean structure, easy to parse programmatically |
| **Quality** | Below publishable threshold | Publishable with light editing | Publication-ready, no editing needed |
| **Coherence** | Contradicts or ignores input artifacts | Uses inputs appropriately | Deeply integrates inputs, draws novel connections |

**Pass threshold**: Average ≥ 3.0, no dimension below 2.

## How to Run a Test Today (Before Web Platform)

### Manual Protocol

1. **Prepare the test case**
   ```bash
   # Identify the gate, agent, and inputs
   GATE="G2"
   AGENT_FILE="orchestration/agents/research/concept-research-agent.md"
   PROFILE_FILE="orchestration/profiles/research/data-journalism-research-profile.md"
   INPUT_FILE="orchestration/projects/the-geography-of-water-scarcity/G1-INTAKE.md"
   ```

2. **Compose the prompt for the test model**
   - Paste the agent .md content as the system prompt (or first message)
   - Paste the profile .md as additional context
   - Paste the intake doc as the user request
   - Add: "Produce all required research deliverables as specified in the profile."

3. **Execute in the test model's interface**
   - ChatGPT: paste into a new conversation with the system prompt feature
   - Gemini: use the system instruction field
   - API: use the appropriate system prompt parameter

4. **Collect outputs**
   - Save each generated file to a test directory:
     `orchestration/planning/multi-model-platform/evaluations/chatgpt-5.3/G2/`

5. **Run gate validation**
   ```bash
   # Use the existing runner's validation logic against the test outputs
   # (Would need to point the validator at the test directory)
   ```

6. **Score using the rubric above**

7. **Record results** in an evaluation file (see template below)

### Evaluation Record Template

```yaml
# orchestration/planning/multi-model-platform/evaluations/chatgpt-5.3/G2/evaluation.yaml
model: chatgpt-5.3
model_version: "2026-02-08"
gate: G2
agent: concept-research-agent
profile: data-journalism-research-profile
project: the-geography-of-water-scarcity
date: 2026-02-08
evaluator: "<your name>"

baseline_model: claude-opus-4
baseline_run: "run_20260208_water-scarcity_abc123"

automated_checks:
  files_exist: 10/10
  headings_present: true
  source_count: 14

scores:
  completeness: 4
  accuracy: 3
  structure: 5
  quality: 3
  coherence: 4
  average: 3.8

pass: true

notes: |
  Strong structural compliance. DATASETS.md was well-organized.
  CLAIMS.md had two statistics without source tier classification.
  Prose quality in ANALOGIES.md was slightly below Claude baseline.
  PROJECTIONS.md correctly identified confidence intervals.

cost:
  input_tokens: 12400
  output_tokens: 48200
  total_cost_usd: 0.42
  baseline_cost_usd: 1.85

recommendation: |
  Viable for G2 research tasks. 77% cost reduction vs Claude Opus.
  Consider for standard-depth research; keep Claude for deep-depth.
```

## Priority Test Cases

For the Water Scarcity benchmark essay, test these agents first:

| Priority | Agent | Gate | Why Test This First |
|----------|-------|------|---------------------|
| 1 | Data Journalist Writer | G5 | Prose quality is the hardest to replicate — this tells you the ceiling |
| 2 | Research Agent (w/ data journalism profile) | G2 | High-volume structured output — biggest cost savings opportunity |
| 3 | Data Visualization Architect | G5 | Technical code generation — tests engineering capability |
| 4 | Accuracy Audit Agent | G6 | Verification tasks may suit cheaper models well |
| 5 | Data Accuracy Auditor | G6.1 | Numeric verification is pattern-matchable — could use a smaller model |

## What This Tells You

After running Level 1 tests for 3-5 models across 3-5 agents, you'll have a matrix:

```
                  Claude Opus  Claude Sonnet  GPT-5.3  GPT-4o  Gemini Pro
Research (G2)        4.8          4.2          3.9      3.5      4.1
Writing (G5)         4.9          3.8          4.2      3.0      3.5
Viz Arch (G5)        4.5          4.0          4.3      3.8      3.2
Audit (G6)           4.6          4.4          4.1      4.0      4.3
Data Audit (G6.1)    4.3          4.2          3.8      3.7      4.0
Cost per run ($)    $8.50        $2.10        $3.20    $0.80    $1.50
```

This matrix directly informs the agent-to-model routing table in production.
