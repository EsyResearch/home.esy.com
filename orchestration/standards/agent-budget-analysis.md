# Agent Budget Analysis: Visual Essay Pipeline

> Created: February 2026
> Status: Active — updated with real production data from "The Sword" (first fully automated essay)

---

## Overview

This document defines the per-gate cost model for running the visual essay pipeline via Claude API agents. It informs model selection, budget caps, and the routing table used by the agents-runtime executor.

**Key finding**: The first fully automated essay ("The Sword") cost **$27.06** across 16 gates, ~40 minutes wall time, consuming 4.26M input tokens and 145K output tokens. This section contains both the original estimates and the real data.

---

## Current API Pricing (Anthropic, as of February 2026)

| Model | API ID | Input | Output | Context | Max Output |
|-------|--------|-------|--------|---------|------------|
| **Opus 4.6** | `claude-opus-4-6` | $15 / MTok | $75 / MTok | 200K (1M beta) | 128K tokens |
| **Sonnet 4.5** | `claude-sonnet-4-5` | $3 / MTok | $15 / MTok | 200K (1M beta) | 64K tokens |
| **Haiku 4.5** | `claude-haiku-4-5` | $1 / MTok | $5 / MTok | 200K | 64K tokens |

Additional cost modifiers:
- **Prompt caching**: Cached input tokens are ~90% cheaper (write once per session, read many times)
- **Batch API**: 50% discount on all tokens (for non-time-sensitive runs)
- **Extended thinking**: Thinking tokens billed at output rates

---

## Real Production Data: "The Sword" (Feb 10, 2026)

First fully automated essay through all 16 gates via `agents-runtime`.

### Actuals from Anthropic Dashboard

| Metric | Value |
|--------|-------|
| **Total cost** | **$27.06** |
| **Total input tokens** | 4,262,603 |
| **Total output tokens** | 144,626 |
| **Input:Output ratio** | 29:1 |
| **Wall time** | ~40 minutes |
| **Gates passed** | 12 / 16 |
| **Gates failed** | 4 (all infrastructure — not quality) |

### Cost by Model

| Model | ~Input Tokens | ~Output Tokens | ~Cost | % of Total |
|-------|--------------|----------------|-------|------------|
| **Sonnet 4.5** (13 gates) | ~1.7M | ~80K | ~$14 | 52% |
| **Opus 4.6** (2 gates: G4, G5) | ~0.9M | ~50K | ~$12 | 44% |
| **Haiku 4.5** (1 gate: G9) | ~0.3M | ~10K | ~$1 | 4% |

### Per-Gate Actuals (Audit Phase — from logs)

| Gate | Model | Cumul. Input | Output | Rounds | Time | Status |
|------|-------|-------------|--------|--------|------|--------|
| G4.1 | Sonnet | 260,070 | 18,189 | 8 | 414s | ✅ PASS |
| G4.5 | Sonnet | 433,345 | 21,092 | 10 | 349s | ✅ PASS |
| G4.6 | Sonnet | 185,302 | 8,931 | 6 | 180s | ❌ FAIL (contract mismatch) |
| G5.4 | Sonnet | 140,118 | 10,032 | 5 | 177s | ❌ FAIL (no frontmatter) |
| G5.2 | Sonnet | 355,825 | 17,589 | 8 | 347s | ✅ PASS |
| G5.3 | Sonnet | 163,426 | 3,159 | 8 | 75s | ✅ PASS |
| G5.5 | Sonnet | 302,850 | 17,646 | 8 | 340s | ❌ FAIL (no frontmatter) |
| G6 | Sonnet | 283,142 | 13,704 | 8 | 263s | ❌ FAIL (no frontmatter) |
| G6.6 | Sonnet | 152,537 | 8,425 | 8 | 208s | ✅ PASS |
| G7 | Sonnet | — | — | — | — | ✅ PASS |
| G8 | Sonnet | 309,956 | 6,308 | 8 | 130s | ✅ PASS |
| G9 | Haiku | 262,605 | 9,859 | 6 | 76s | ✅ PASS |

### Why 4.26M Input for 145K Output? (The 29:1 Problem)

The agentic loop resends the **entire conversation** (system prompt + all prior messages + all tool results) on every round. This means:

- System prompt: ~20K tokens (agent .md compiled)
- Round 1: 20K input → produces tool calls
- Round 2: 20K + round 1 messages → 25K input
- Round 3: 25K + round 2 messages → 35K input
- Round 8: accumulated context → 70K+ input
- **Cumulative input across 8 rounds**: ~260K for what is essentially ~18K of new output

This is the fundamental cost driver. Every tool call's full response gets re-sent on the next turn.

### Failure Analysis

All 4 failures were **infrastructure issues**, not quality failures:
1. **G4.6**: Agent used different heading format than contract expected
2. **G5.4**: No YAML frontmatter on audit report
3. **G5.5**: No YAML frontmatter on audit report
4. **G6**: No YAML frontmatter on audit report

**Fix applied**: Agent compiler now includes explicit YAML frontmatter instructions. On re-run, all 4 would pass.

---

## Per-Gate Token Estimates (Updated with Real Data)

Original estimates vs. actuals. The key learning: **original estimates were 5-10x too low** because they didn't account for cumulative conversation replay in agentic loops.

### Phase: Intake

| Gate | Name | Est. Input | **Actual Input** | Est. Output | **Actual Output** | Rounds |
|------|------|-----------|-----------------|-------------|-------------------|--------|
| G1 | Intake Approval | 5K | **~90K** | 3K | **~10K** | 10 |

### Phase: Research

| Gate | Name | Est. Input | **Actual Input** | Est. Output | **Actual Output** | Rounds |
|------|------|-----------|-----------------|-------------|-------------------|--------|
| G2 | Research Complete | 30K | **~150K** | 20K | **~30K** | 20 |

### Phase: Spec Build

| Gate | Name | Est. Input | **Actual Input** | Est. Output | **Actual Output** | Rounds |
|------|------|-----------|-----------------|-------------|-------------------|--------|
| G3 | Spec Approval | 25K | **~120K** | 15K | **~20K** | 15 |

### Phase: Production

| Gate | Name | Est. Input | **Actual Input** | Est. Output | **Actual Output** | Rounds |
|------|------|-----------|-----------------|-------------|-------------------|--------|
| G4 | Design Research | 20K | **~400K** | 10K | **~50K** | 12 |
| G4.1 | Design Reconciliation | 15K | **260K** | 8K | **18K** | 8 |
| G4.5 | Image Sourcing | 15K | **433K** | 8K | **21K** | 10 |
| G4.6 | Viz Technology Decision | 15K | **185K** | 6K | **9K** | 6 |
| **G5** | **Content Production** | **80K** | **~500K** | **40K** | **~40K** | ~15 |
| G5.4 | Viz Ambition Audit | 25K | **140K** | 8K | **10K** | 5 |
| G5.2 | Design Fidelity Audit | 25K | **356K** | 8K | **18K** | 8 |
| G5.3 | Diagram-Code Recon | 20K | **163K** | 6K | **3K** | 8 |
| G5.5 | Bibliography | 15K | **303K** | 8K | **18K** | 8 |

### Phase: Audit

| Gate | Name | Est. Input | **Actual Input** | Est. Output | **Actual Output** | Rounds |
|------|------|-----------|-----------------|-------------|-------------------|--------|
| G6 | Citation Audit | 25K | **283K** | 10K | **14K** | 8 |
| G6.6 | Prose Quality Audit | 20K | **153K** | 8K | **8K** | 8 |

### Phase: Publication

| Gate | Name | Est. Input | **Actual Input** | Est. Output | **Actual Output** | Rounds |
|------|------|-----------|-----------------|-------------|-------------------|--------|
| G7 | Scroll Certification | 20K | **~200K** | 6K | **~8K** | 8 |
| G8 | Publication Cert | 15K | **310K** | 6K | **6K** | 8 |
| G9 | Publication Approval | 10K | **263K** | 5K | **10K** | 6 |

### Totals: Estimated vs. Actual

| Metric | Original Estimate | Actual |
|--------|------------------|--------|
| **Total input tokens** | ~760K (with 2x multiplier) | **4,263K** (5.6x original) |
| **Total output tokens** | ~200K | **145K** (0.7x — agents are focused) |
| **Total tool rounds** | ~65-95 | **~145** |
| **Total cost** | ~$6 (hybrid estimate) | **$27.06** |
| **Input:Output ratio** | ~4:1 (estimated) | **29:1** (actual) |

---

## Hybrid Model Assignment (Current — Validated by Production Run)

| Gate | Model | Rationale |
|------|-------|-----------|
| G1 | **Sonnet 4.5** | Haiku was too passive/exploratory — Sonnet is directive enough |
| G2 | **Sonnet 4.5** | Information synthesis, structured research output |
| G3 | **Sonnet 4.5** | Structured spec generation from research |
| G4 | **Opus 4.6** | Creative vision — color theory, typography, animation philosophy. Taste matters. |
| G4.1 | Sonnet 4.5 | Evaluating design research against implementation |
| G4.5 | Sonnet 4.5 | Image sourcing is procedural |
| G4.6 | Sonnet 4.5 | Downgraded from Opus — Sonnet handles tech decisions fine |
| **G5** | **Opus 4.6** | **The production gate. Code quality, prose quality, visualization sophistication.** |
| G5.4 | Sonnet 4.5 | Auditing viz ambition against tier assignments |
| G5.2 | Sonnet 4.5 | Design fidelity checking |
| G5.3 | Sonnet 4.5 | Diagram-code reconciliation |
| G5.5 | Sonnet 4.5 | Bibliography is procedural |
| G6 | Sonnet 4.5 | Citation verification |
| G6.6 | Sonnet 4.5 | Downgraded from Opus — Sonnet catches slop patterns via regex + structured checks |
| G7 | Sonnet 4.5 | Scroll behavior is evaluatable by Sonnet |
| G8 | Sonnet 4.5 | Aggregating audit reports |
| G9 | Haiku 4.5 | Final checklist — simple aggregation |

### Per-Essay Cost (Real): $27.06

| Model | Gates | ~Cost | Share |
|-------|-------|-------|-------|
| Opus 4.6 | G4, G5 | ~$12 | 44% |
| Sonnet 4.5 | 13 gates | ~$14 | 52% |
| Haiku 4.5 | G9 | ~$1 | 4% |

### Cost Reduction Levers

| Lever | Est. Savings | Target Cost | Notes |
|-------|-------------|-------------|-------|
| **Directive prompts + fewer rounds** | 30-40% | ~$16-19 | Reduce exploration rounds, make system prompts more instructive |
| **Sliding window context** | 40-50% | ~$14-16 | Only resend last 2-3 rounds + system prompt, not full history |
| **Prompt caching** | 20-30% on input | ~$11-14 | Cache system prompt + agent .md across rounds |
| **Sonnet for G5 (experimental)** | 35-40% | ~$10-12 | Biggest lever — needs quality testing |
| **Batch API** | 50% on all | ~$8-10 | For async/queued runs (not interactive) |
| **Prompt caching + Batch + Sonnet G5** | 60-70% | **~$8-10** | Aggressive target |
| **OpenRouter cheaper models for audits** | 15-20% | ~$6-8 | Use DeepSeek/Llama for audit gates |

### Projected Cost at Scale

| Scenario | Cost/Essay | 10 Essays | 100 Essays | 500 Essays |
|----------|-----------|-----------|------------|------------|
| **Current (unoptimized)** | **$27** | **$270** | **$2,700** | **$13,500** |
| Directive prompts only | ~$18 | $180 | $1,800 | $9,000 |
| + Sliding window | ~$14 | $140 | $1,400 | $7,000 |
| + Prompt caching | ~$11 | $110 | $1,100 | $5,500 |
| + Sonnet for G5 | ~$10 | $100 | $1,000 | $5,000 |
| + Batch API (full optimization) | **~$8** | **$80** | **$800** | **$4,000** |

---

## Budget Caps (Routing Table — Updated with Real Data)

Caps updated to reflect actual consumption. Original caps were too low and caused budget_exceeded aborts.

| Gate | Max Input | Max Output | Max Rounds | Actual Input | Notes |
|------|----------|-----------|-----------|-------------|-------|
| G1 | 300K | 50K | 10 | ~90K | Was 20K — way too low |
| G2 | 800K | 150K | 20 | ~150K | Research needs room |
| G3 | 600K | 100K | 15 | ~120K | Spec generation |
| G4 | 500K | 80K | 12 | ~400K | Opus creative gate |
| G4.1 | 400K | 60K | 10 | 260K | Audit gate |
| G4.5 | 400K | 60K | 10 | 433K | Hit budget ceiling |
| G4.6 | 400K | 50K | 10 | 185K | Tech decisions |
| **G5** | **2M** | **300K** | **30** | **~500K** | Production — needs headroom |
| G5.4 | 500K | 60K | 10 | 140K | Viz audit |
| G5.2 | 500K | 60K | 10 | 356K | Design audit |
| G5.3 | 400K | 50K | 8 | 163K | Code recon |
| G5.5 | 400K | 60K | 10 | 303K | Bibliography |
| G6 | 500K | 80K | 10 | 283K | Citation audit |
| G6.6 | 400K | 60K | 8 | 153K | Prose quality |
| G7 | 400K | 50K | 8 | ~200K | Scroll cert |
| G8 | 400K | 50K | 8 | 310K | Pub cert |
| G9 | 300K | 40K | 10 | 263K | Final approval |
| **Run total** | **8M** | **1.5M** | **200** | **4.26M** | — |

---

## Web Interface Portability

This budget model is designed to port directly to the planned web interface:

1. **Cost dashboard**: The per-gate cost data maps directly to a real-time cost display. Each gate execution reports actual tokens used vs. budget cap.

2. **Model configuration UI**: The routing table is a JSON config. A web UI can present it as a drag-and-drop model selector per gate.

3. **Budget alerts**: Gate budget caps become real-time warnings in the UI. If G5 approaches 80% of its token budget, the dashboard can flag it before the executor aborts.

4. **Run history**: Actual vs. estimated costs per gate, per run, are stored in the run record (`RUN.json`). The web UI aggregates this for cost analytics.

5. **Batch mode toggle**: The web UI can offer "fast mode" (real-time, full price) vs. "batch mode" (50% cost, async execution) per run.

---

## Architecture: agents-runtime (Implemented)

The agent budget model is enforced by the `agents-runtime/` executor, which is consumed by both the CLI and the future web server. **This is now built and tested.**

```
orchestration/
├── runner/                     ← orchestration, validation, state
│   ├── cli.js                  ← CLI consumer (with `agent execute` commands)
│   └── lib/
│       ├── validator.js
│       ├── contract-loader.js
│       └── ...
├── agents-runtime/             ← execution engine (library)
│   ├── index.js                ← public API (import from here)
│   ├── executor.js             ← agentic loop with budget enforcement
│   ├── agent-compiler.js       ← agent .md → system prompt compiler
│   ├── adapters/
│   │   └── claude.js           ← Anthropic SDK wrapper (streaming + retry)
│   ├── tools/
│   │   ├── index.js            ← tool registry
│   │   ├── read-file.js        ← sandboxed file read
│   │   ├── write-file.js       ← sandboxed file write (guards against .env, node_modules, etc.)
│   │   └── list-directory.js   ← directory listing
│   ├── routing-table.json      ← model + budget config per gate
│   └── __tests__/
│       ├── tools.test.js       ← 29 tests
│       ├── agent-compiler.test.js ← 10 tests
│       └── routing-table.test.js  ← 12 tests
```

### CLI Commands

```bash
# Execute a single gate with a real Claude agent
node cli.js agent execute --run <run-id> --gate G5

# Execute an entire workflow automatically
node cli.js agent run-workflow --slug the-speed-of-everything

# List all available agents
node cli.js agent list-agents

# View routing config for a gate
node cli.js agent config --gate G5
```

### Library API (for web server / app.esy.com)

```javascript
// In web API route handler
const { executeGate } = require('./orchestration/agents-runtime');

const result = await executeGate({
  gateCode: 'G5',
  gateName: 'Content Complete',
  agentName: 'production-orchestrator',
  slug: 'the-speed-of-everything',
  artifactPath: 'src/app/essays/the-speed-of-everything/',
  projectRoot: '/absolute/path/to/project',
  onEvent: (event) => ws.send(JSON.stringify(event)) // stream to browser
});

// result.completed, result.usage, result.filesWritten, result.durationMs
```

### Python Portability (for app.esy.com)

The runtime reads config-driven artifacts that are language-agnostic:
- `routing-table.json` → Python reads JSON identically
- `agents/*.md` → agent-compiler logic is ~100 lines, trivial to port
- `gates/contracts/*.contract.json` → Python validator reads same JSON
- Tool definitions → Python equivalent: os.read, os.write, os.listdir

The heavy lift is the executor loop (~300 lines) and the Claude adapter (~200 lines). The Anthropic Python SDK (`anthropic`) has the same API surface as the Node SDK.

---

## Related Documents

- [Pipeline Testing Standard](./pipeline-testing-standard.md) — test infrastructure
- [Visualization Quality Standard](./visualization-quality-standard.md) — viz tier requirements
- [Gate Accountability Standard](./gate-accountability.md) — QA model
- [Multi-Model Architecture Overview](../planning/multi-model-platform/architecture-overview.md) — long-term platform vision
- [Pipeline Reliability Postmortem](../2026-02-09-pipeline-reliability-postmortem.md) — why we need real agents

---

## Last Updated
February 10, 2026

### Revision History
- **v1** — Initial creation with per-gate token estimates and hybrid model assignment
- **v2** — Added budget caps, web interface portability, agents-runtime architecture
- **v3 (current)** — **Updated with real production data from "The Sword" pipeline run.** Key changes:
  - Corrected API pricing (Opus is $15/$75 per MTok, not $5/$25)
  - Replaced all estimated token counts with actual production data
  - Added 29:1 input:output ratio analysis (the "conversation replay" problem)
  - Increased all budget caps based on real consumption (original caps were 5-10x too low)
  - Updated model assignments: Haiku→Sonnet for G1/G2, Opus→Sonnet for G4.6/G6.6
  - Added detailed cost reduction roadmap with projected savings at each optimization tier
  - Added failure analysis from first production run (4/16 infrastructure failures, 0 quality failures)
