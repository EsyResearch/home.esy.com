# Architecture Overview: Multi-Model Orchestration Platform

> Three-layer architecture for routing agent contracts to any AI model API.

## The Problem

Today, Esy's orchestration pipeline runs through a single flow:

```
Agent .md file → Human reads it → Human pastes to Claude → Claude produces output → Runner validates
```

This has three limitations:
1. **Single model** — Claude is the only execution engine
2. **Human bottleneck** — every gate requires manual copy-paste
3. **No comparison** — can't A/B test models against the same contract

## The Target

```
Agent .md file → Platform parses it → Router selects model → Adapter calls API → Runner validates
```

No human in the loop for execution. Human reviews at gate boundaries (approve/reject), but the model invocation is automated.

## Three-Layer Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│  LAYER 1: WORKFLOW ENGINE                                         │
│                                                                   │
│  Reads orchestrator files → builds directed acyclic graph (DAG)   │
│  of quality gates. Manages state: which gate is active, what      │
│  inputs are available, what outputs are expected.                  │
│                                                                   │
│  Existing foundation: orchestration/runner/cli.js                 │
│  Existing data: orchestration/runner/workflows/visual-essay.json  │
│                                                                   │
│  G1 → G2 → G3 → G4 → G5 → G6 → G6.1 → G7 → G8 → G9            │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         │  For each gate: "invoke agent X with inputs Y"
                         │
┌────────────────────────▼─────────────────────────────────────────┐
│  LAYER 2: AGENT ROUTER                                            │
│                                                                   │
│  Maps each agent invocation to a model configuration.             │
│  Configuration is per-project, per-agent, swappable at runtime.   │
│                                                                   │
│  Example routing table:                                           │
│                                                                   │
│  concept-research-agent        → claude-sonnet-4                  │
│  data-journalist-writer-expert → claude-opus-4                    │
│  data-viz-architect-expert     → chatgpt-5.3                      │
│  accuracy-audit-agent          → claude-sonnet-4                  │
│  scrolling-auditor             → gemini-2.5-pro                   │
│  seo-optimizer                 → gpt-4o-mini (cost tier)          │
│                                                                   │
│  The router also handles:                                         │
│  - Retry logic (if model fails, retry or fall back)               │
│  - Context window management (split large inputs if needed)       │
│  - Token budget tracking per run                                  │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         │  "Call model Z with system prompt + messages"
                         │
┌────────────────────────▼─────────────────────────────────────────┐
│  LAYER 3: MODEL ADAPTER                                           │
│                                                                   │
│  Translates agent markdown → model-specific API format.           │
│  Normalizes output back to pipeline-expected format.              │
│                                                                   │
│  Adapters needed:                                                 │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Claude (Anthropic)                                          │  │
│  │ - system prompt field + messages array                      │  │
│  │ - supports tool_use for structured output                   │  │
│  │ - max_tokens, temperature, stop_sequences                   │  │
│  │ - Models: opus-4, sonnet-4, haiku-3.5                       │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ OpenAI (GPT)                                                │  │
│  │ - system + developer message + user messages                │  │
│  │ - supports function calling / tool use                      │  │
│  │ - response_format for JSON mode                             │  │
│  │ - Models: gpt-5.3, gpt-4o, gpt-4o-mini, o3, o4-mini       │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Google (Gemini)                                             │  │
│  │ - system_instruction + contents array                       │  │
│  │ - supports function declarations                            │  │
│  │ - Models: gemini-2.5-pro, gemini-2.5-flash                  │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Open Source (via API providers)                              │  │
│  │ - Llama, Mistral, DeepSeek, etc.                            │  │
│  │ - Standard chat completion format                           │  │
│  │ - Models: llama-4-maverick, mistral-large, deepseek-v3     │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  Each adapter must:                                               │
│  1. Parse agent .md → extract system prompt components            │
│  2. Format input artifacts as context (messages or attached docs) │
│  3. Call the model API                                            │
│  4. Parse response into expected output format (markdown files)   │
│  5. Handle streaming if needed (for long generations)             │
│  6. Return normalized result to the router                        │
└──────────────────────────────────────────────────────────────────┘
```

## Agent .md → System Prompt Translation

The most critical design decision is how to convert agent markdown files into effective system prompts for each model. The agent files contain:

```
## Role & Identity         →  System prompt opening
## Philosophy              →  Behavioral constraints
## Expertise Architecture  →  Capabilities and knowledge domains
## Quality Framework       →  Output quality criteria
## Deliverables            →  Expected output format/structure
## Collaboration Protocols →  How to interact with other agents
```

### Translation Strategy

**Option A: Full Injection** — send the entire agent .md as the system prompt. Simple but token-heavy.

**Option B: Selective Extraction** — parse the .md and extract only the sections relevant to the current task. More efficient but requires a parser.

**Option C: Compiled Prompts** — pre-compile each agent .md into optimized per-model system prompts. Best performance but requires maintenance.

**Recommendation**: Start with Option A (full injection) for simplicity and correctness, then optimize to Option B once you have comparison data showing where token costs matter.

## Workflow Definition Evolution

The current `visual-essay.json` workflow definition needs to be extended for:

1. **Multiple workflow types** — `conceptual-essay.json`, `academic-essay.json`, `infographic.json`
2. **Agent-per-gate mapping** — which specific agent handles each gate
3. **Model override support** — allow per-gate model specification
4. **Parallel gate support** — some gates could run in parallel (e.g., multiple audit agents)
5. **Conditional gates** — e.g., G6.1 (Data Integrity) only runs in Data Journalism mode

### Example Extended Workflow Definition

```json
{
  "workflow": "conceptual-essay",
  "version": "2.0",
  "modes": ["conceptual", "data-journalism"],
  "gates": [
    {
      "gate": "G1",
      "name": "Intake Approval",
      "agent": "conceptual-essay-orchestrator",
      "contract": "orchestration/gates/contracts/G1.contract.json"
    },
    {
      "gate": "G2",
      "name": "Research Complete",
      "agent": "research-orchestrator",
      "profiles": {
        "conceptual": "conceptual-research-profile",
        "data-journalism": ["conceptual-research-profile", "data-journalism-research-profile"]
      },
      "contract": "orchestration/gates/contracts/G2.contract.json"
    },
    {
      "gate": "G5",
      "name": "Production",
      "parallel_agents": [
        { "agent": "data-journalist-writer-expert", "role": "prose" },
        { "agent": "data-visualization-architect-expert", "role": "visualizations" },
        { "agent": "frontend-architecture-expert", "role": "architecture" }
      ],
      "contract": "orchestration/gates/contracts/G5.contract.json"
    },
    {
      "gate": "G6.1",
      "name": "Data Integrity Audit",
      "agent": "data-accuracy-auditor",
      "condition": "mode == 'data-journalism'",
      "contract": "orchestration/gates/contracts/G6.1.contract.json"
    }
  ]
}
```

## Web UI Responsibilities

The web interface replaces the CLI's human-in-the-loop with a dashboard:

1. **Workflow launcher** — select template, fill intake, start run
2. **Run monitor** — watch gates execute in real-time, see model responses streaming
3. **Gate review** — at each gate boundary, human can approve/reject/request-revision
4. **Model configuration** — drag-and-drop model assignment to agent roles
5. **Run history** — compare runs across models, see gate scores side-by-side
6. **Cost dashboard** — token usage per gate, per model, per run

## Relationship to User-Facing Product

Users never see any of this. The user experience remains:

```
Template → Intake → [invisible orchestration] → Artifact
```

The multi-model layer is entirely backend infrastructure. It affects:
- **Quality** — better models for critical agents
- **Cost** — cheaper models for routine agents
- **Speed** — faster models for time-sensitive gates
- **Reliability** — fallback models if primary fails
