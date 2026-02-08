# Multi-Model Orchestration Platform

> Planning directory for Esy's transition from single-model CLI orchestration to a web-based, multi-model platform where any AI model can be swapped into any agent role.

## Context

This initiative was born from a conversation about testing the Water Scarcity benchmark essay pipeline with models other than Claude — specifically, how to evaluate whether ChatGPT 5.3, Gemini, or future Claude versions could perform specific agent roles within existing workflows.

The core realization: **Esy's orchestration framework is already model-agnostic.** Agent files define contracts (role, inputs, outputs, quality criteria), not model-specific prompts. The platform work is about building the runtime layer that routes these contracts to model APIs, evaluates outputs against quality gates, and lets you swap models per-agent per-workflow.

## Current State (Feb 2026)

| Layer | Status | Location |
|-------|--------|----------|
| Agent definitions (50+ agents) | ✅ Production | `orchestration/agents/` |
| Quality gate contracts | ✅ Production | `orchestration/gates/contracts/` |
| Workflow definitions | ✅ Production (1 workflow) | `orchestration/runner/workflows/` |
| CLI runner (human-in-the-loop) | ✅ Production | `orchestration/runner/cli.js` |
| Run records + validation | ✅ Production | `orchestration/runs/` |
| Invocation specs (6-layer) | ✅ Production | `orchestration/skills/` |
| Research profiles | ✅ Production | `orchestration/profiles/` |
| Model adapter layer | ❌ Not started | — |
| Agent-to-model router | ❌ Not started | — |
| Web UI for workflow execution | ❌ Not started | — |
| A/B model comparison harness | ❌ Not started | — |

## Documents in This Directory

| File | Purpose |
|------|---------|
| [architecture-overview.md](./architecture-overview.md) | Three-layer platform architecture (Workflow Engine → Agent Router → Model Adapter) |
| [model-testing-strategy.md](./model-testing-strategy.md) | How to test a new model against existing workflows, gate-by-gate evaluation approach |
| [cost-optimization.md](./cost-optimization.md) | Agent-to-model-tier mapping strategy for balancing cost and quality |
| [open-questions.md](./open-questions.md) | Unresolved decisions that need further discussion |

## Key Insight

Esy's about page says: *"Think of the difference between asking ChatGPT to 'make a logo' and using Canva."*

The same principle applies to the platform itself. Users never see agents, gates, or models. They see: template → intake → artifact. The multi-model layer is invisible infrastructure that makes each artifact better and cheaper to produce.

## How to Continue This Conversation

When resuming planning in a future session, share this directory as context:

```
@orchestration/planning/multi-model-platform/
```

The AI will have full context on:
- What's already built (agents, gates, runner, workflows)
- What's planned (three-layer architecture)
- What's unresolved (open questions)
- Cost/quality tradeoffs discussed so far
