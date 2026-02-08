# Pipeline Execution Standard: How to Run Workflows

> Version: 1.0
> Created: February 8, 2026
> Status: Active

## Purpose

This document defines the standard operating procedure for executing orchestration workflows. It establishes the phases of execution maturity, the tradeoffs of each approach, and the current recommended standard. All internal pipeline runs MUST follow this standard to ensure consistency, reproducibility, and honest validation of pipeline quality.

---

## The Three Execution Models

### Model A: Single-Session Orchestration

One operator session. The operator acts as every agent sequentially. The CLI tracks run state and validates contracts at each gate.

```
[Operator] → acts as all agents → [CLI validates each gate]
              G1 → G2 → G3 → G4 → ... → G9
              (full context accumulates across gates)
```

**Concrete workflow:**
```bash
# 1. Create the intake document (once)
#    Write 5-7 lines to src/app/essays/{slug}/G1-INTAKE.md

# 2. Initialize the run (once)
node cli.js run start --workflow visual-essay --slug {slug} --depth {mode}

# 3. For EACH gate (same pattern, every time):
node cli.js gate start  --run $RUN_ID --gate Gx --agent {agent-name}
# → Operator executes the work, produces the files
node cli.js gate finish --run $RUN_ID --gate Gx
# → CLI validates automatically. PASS → next gate. FAIL → fix and retry.
```

**Strengths:**
- Zero friction — no context switching, no copy-pasting between sessions
- Full context accumulation — later gates benefit from seeing earlier gates' outputs
- Fastest feedback loop — pipeline bugs are diagnosed and fixed in real time
- CLI contract enforcement still runs — automated quality checks are independent of operator context
- Matches development phase needs — we're iterating on the pipeline itself, not just producing essays

**Weaknesses:**
- Operator has unfair context advantage — in the web interface, each gate will be an isolated API call with only the prompt packet and file system as context. Full accumulated context is not representative of production.
- No separation of duties — Layer 3 of the Gate Accountability Standard says "a different agent evaluates." If one operator is all agents, they audit their own work.
- Doesn't validate prompt packet sufficiency — if the operator has full context, the prompt packets don't need to be good. In production, prompt packets are ALL the agent gets.
- Context window pressure — for a 13-gate deep pipeline, accumulated context can reach 100k+ tokens. Late gates may suffer from noise.

---

### Model B: Isolated Sessions Per Gate

One fresh operator session per gate. Each session only receives the prompt packet — no accumulated context from prior gates. The operator reads files from disk as needed (simulating what an API-called model would do).

```
[Session 1: G1 agent]  → CLI validates → done
[Session 2: G2 agent]  → CLI validates → done
[Session 3: G3 agent]  → CLI validates → done
...
[Session 13: G9 agent] → CLI validates → done
(each session is isolated, like a web API call)
```

**Concrete workflow:**
```bash
# Same CLI commands as Model A, but each gate runs in a FRESH session.
# The session only receives:
#   1. The prompt packet (from orchestration/runs/.../logs/gates/Gx/prompt.txt)
#   2. File system access to the essay directory
# No prior conversation context.
```

**Strengths:**
- Tests prompt packet quality — if the prompt packet isn't sufficient, the gate will struggle. This reveals prompt generator gaps.
- Tests agent isolation — simulates the web interface execution model where each gate is an independent API call.
- Enforces separation of duties — each "agent" starts fresh with no memory of producing prior artifacts.
- Validates pipeline robustness — if the essay quality holds under isolation, the pipeline is truly strong.

**Weaknesses:**
- High friction — requires opening/closing sessions, managing run IDs across windows, context switching.
- Slow feedback loop — when a gate fails, diagnosing whether it's a contract bug, prompt bug, or agent bug requires cross-referencing across sessions.
- Not ideal for pipeline development — when we're iterating on infrastructure, the overhead of isolation slows iteration.
- Prompt packets may not yet be mature enough — if the prompt generator is still being refined, isolated sessions will fail for infrastructure reasons, not quality reasons.

---

### Model C: Interactive CLI Mode

The `run visual-essay` command drives the sequence. It pauses at each gate for the human to invoke agents in a separate environment, then resumes.

```
[CLI runs] → pauses → [Human copies prompt to agent elsewhere]
           → [Agent produces files] → [Human presses Enter]
           → [CLI validates] → next gate → pauses → ...
```

**Strengths:**
- CLI manages the sequence — no need to remember gate order or run IDs.
- Prompt packets are generated automatically.

**Weaknesses:**
- Requires interactive stdin — breaks when run in background or in environments without terminal input.
- Human is glue — the human manually bridges the CLI and the agent, adding friction and error surface.
- Worst of both worlds — has the friction of Model B (separate agent invocation) without its benefit (true isolation testing), plus the fragility of interactive terminal processes.

**Verdict:** Model C is not recommended as a standard. It was the initial design for the CLI's human-in-the-loop mode, but in practice Models A and B are both superior.

---

## Recommended Standard: Phased Execution Maturity

The execution model should evolve as the pipeline matures:

### Phase 1: Single-Session Development (Current)

> **Use Model A. Standard for the first 3-5 essays and all pipeline iteration.**

**Why now:**
- We're building the car and driving it at the same time. Full context lets us diagnose and fix pipeline infrastructure (contracts, prompt generators, agent instructions, validators) in real time.
- The pipeline is not yet proven end-to-end from minimal intake. We need tight feedback loops to identify and fix weaknesses.
- Contract enforcement (Layer 1 of accountability) runs regardless of execution model — automated quality checks are independent of operator context.

**What we're optimizing for:** Pipeline reliability. Get all 13 gates working mechanically, contracts validating correctly, prompt packets generating properly.

**What we're NOT testing:** Agent isolation, prompt packet sufficiency, separation of duties.

**Transition trigger:** 2-3 successful end-to-end runs where all gates pass contract validation without manual contract/infrastructure fixes mid-run.

### Phase 2: Isolation Validation (Next)

> **Run ONE essay with Model B. This is a diagnostic test, not the new default.**

**Why:**
- Tests whether the prompt packets are sufficient as stand-alone instructions.
- Tests whether the pipeline produces quality output without accumulated context advantage.
- Reveals prompt generator gaps that were hidden by full-context execution.

**What we're optimizing for:** Prompt packet quality. If essay quality drops under isolation, the prompt generator needs improvement.

**What we're NOT testing:** Scale, latency, cost optimization.

**Transition trigger:** One essay passes all gates under Model B with quality comparable to Model A runs.

### Phase 3: API-Driven Execution (Web Interface)

> **Each gate is an API call to a model. The CLI becomes a server. No human in the loop except G9.**

**Why:**
- This is the production architecture for the web interface.
- Each gate receives only its prompt packet + file system access.
- Customers click "Generate" and the system handles everything.

**What we're optimizing for:** Reliability at scale, cost per run, latency per gate, customer experience.

**What we're NOT testing:** This IS the test.

---

## The Standard Operating Procedure (Phase 1)

### Before Any Run

1. **Create the essay directory**: `src/app/essays/{slug}/research/`
2. **Write the intake**: 5-7 lines in `G1-INTAKE.md` following the [Intake Quality Principles](./intake-quality-principles.md)
3. **Do not over-prompt**: If you're writing more than 10 lines, you're violating the intake standard

### Starting a Run

```bash
# Initialize — this creates the run record and assigns a run ID
node orchestration/runner/cli.js run start \
  --workflow visual-essay \
  --slug {slug} \
  --depth {quick|standard|deep}

# Save the run ID (printed in output) — you'll use it for every gate command
export RUN=run_XXXXXXXX_{slug}_XXXXXX
```

### For Each Gate

```bash
# 1. Start the gate (registers the attempt)
node orchestration/runner/cli.js gate start \
  --run $RUN --gate {Gx} --agent {agent-name}

# 2. Execute the work
#    - Read the prompt packet if needed (orchestration/runs/$RUN/logs/gates/Gx/prompt.txt)
#    - Produce all required output files
#    - Follow the agent's instructions for the gate

# 3. Finish the gate (runs contract validation)
node orchestration/runner/cli.js gate finish \
  --run $RUN --gate {Gx}

# 4. Check result
#    ✅ PASSED → proceed to next gate
#    ❌ FAILED → fix the issues, then retry from step 1 (attempt increments)
```

### Gate Sequence (Visual Essay Pipeline)

| Order | Gate | Agent | What Gets Produced |
|-------|------|-------|--------------------|
| 1 | G1 | visual-essay-orchestrator | G1-INTAKE.md |
| 2 | G2 | research-orchestrator | research/ directory (CLAIMS.md + domain files) |
| 3 | G3 | visual-essay-invocation-agent | specs/{slug}.md |
| 4 | G4 | design-researcher | DESIGN-RESEARCH.md |
| 5 | G4.1 | design-research-reconciliation-agent | G4.1-DESIGN-RECONCILIATION.md |
| 6 | G4.5 | image-sourcing-agent | research/IMAGE_RESEARCH_AUDIT.md |
| 7 | G5 | production-orchestrator | page.tsx, {slug}.css, [Name]Client.tsx |
| 8 | G5.2 | design-research-implementation-auditor | G5.2-DESIGN-FIDELITY-AUDIT.md |
| 9 | G5.5 | bibliography-orchestrator | research/CONTENT-BIBLIOGRAPHY-AUDIT.md |
| 10 | G6 | citation-audit-agent | research/CITATION-AUDIT.md |
| 11 | G7 | immersive-scrolling-auditor | research/SCROLL-CERTIFICATION.md |
| 12 | G8 | publish-artifact-orchestrator | research/PUBLICATION-CERTIFICATION.md |
| 13 | G9 | human (director) | research/PUBLICATION-APPROVAL.md |

### After the Run

```bash
# Mark the run as complete
node orchestration/runner/cli.js run complete \
  --run $RUN --status PASSED
```

---

## Why This Beats the Alternatives (Phase 1)

| Criterion | Model A (recommended) | Model B (isolated) | Model C (interactive CLI) |
|-----------|:---:|:---:|:---:|
| **Setup friction** | None | High (new session per gate) | Medium (separate agent env) |
| **Feedback loop speed** | Fastest | Slow | Slow |
| **Pipeline bug diagnosis** | Immediate | Cross-session | Cross-environment |
| **Contract enforcement** | ✅ Automated | ✅ Automated | ✅ Automated |
| **Prompt packet testing** | ❌ Not tested | ✅ Tested | ⚠️ Partially |
| **Agent isolation testing** | ❌ Not tested | ✅ Tested | ⚠️ Partially |
| **Separation of duties** | ❌ One operator | ✅ Fresh per gate | ⚠️ Depends |
| **Development iteration** | ✅ Excellent | ❌ Painful | ❌ Painful |
| **Simulates web interface** | ❌ Not representative | ✅ Representative | ❌ Not representative |
| **Consistency** | ✅ Same every time | ✅ Same every time | ❌ Error-prone |

**The honest summary:** Model A is the right standard NOW because we're optimizing for pipeline reliability and iteration speed. Its weaknesses (no isolation testing, no separation of duties) are real but acceptable during development. We will transition to Model B validation once the pipeline is mechanically proven, and ultimately to Model C (API-driven) for the web interface.

---

## Anti-Patterns

| Anti-Pattern | Why It's Bad | Do This Instead |
|--------------|-------------|-----------------|
| Running `run visual-essay` with stdin | Breaks in background, fragile | Use `gate start` / `gate finish` manually |
| Forgetting to `gate start` before producing files | Run record doesn't track the attempt | Always start before working |
| Skipping `gate finish` after producing files | Contract validation doesn't run | Always finish to validate |
| Running gates out of order | Later gates may depend on earlier outputs | Follow the gate sequence table |
| Over-prompting the intake | Violates intake quality principles | 5-7 lines maximum |
| Fixing contract bugs without documenting | Same bug will recur | Fix the contract AND update standards |

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-02-08 | Initial standard — three execution models, phased maturity, SOP for Phase 1 |

---

*This standard governs how all Esy orchestration pipelines are executed during development, testing, and eventually production. It ensures consistency, reproducibility, and honest quality validation at every phase of maturity.*
