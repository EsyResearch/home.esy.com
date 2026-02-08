# Architectural Lineage: Where the Runner's Patterns Come From

> The Esy orchestration runner isn't one invention — it's a composite of battle-tested industry patterns, repurposed for AI-native production workflows.

---

## The Five Lineages

The runner combines five established patterns. None are novel individually. The combination — applied to AI agent orchestration — is what's new.

### 1. Quality Gates (Manufacturing → Software)

**Origin**: Stage-Gate®, invented by Robert Cooper in the 1980s for product development. Every phase ends at a gate where work is validated before proceeding.

**Industry adoption**:
- **Manufacturing** — Six Sigma quality gates
- **Enterprise software** — SAP, Oracle project methodologies
- **CI/CD pipelines** — GitHub Actions, GitLab CI stages with approval gates
- **Game development** — Milestone reviews (vertical slice, alpha, beta, gold)

**How Esy uses it**: The 13-gate visual essay pipeline (G1 → G9) is a direct implementation. Each gate has a contract defining acceptance criteria. Work cannot proceed past a blocking gate until validation passes. Failed gates can be retried without restarting the pipeline.

```
G1 ──► G2 ──► G3 ──► G4 ──► G4.1 ──► G4.5 ──► G5 ──► G5.2 ──► G5.5 ──► G6 ──► G7 ──► G8 ──► G9
│      │      │      │       │        │        │       │        │        │      │      │      │
▼      ▼      ▼      ▼       ▼        ▼        ▼       ▼        ▼        ▼      ▼      ▼      ▼
PASS?  PASS?  PASS?  PASS?   PASS?    PASS?    PASS?   PASS?    PASS?    PASS?  PASS?  PASS?  PASS?
```

### 2. Design by Contract (Eiffel → API Specs)

**Origin**: Coined by Bertrand Meyer in 1986 for the Eiffel programming language. Every module declares its preconditions, postconditions, and invariants. The system validates mechanically rather than relying on trust.

**Industry adoption**:
- **API specifications** — OpenAPI/Swagger defines request/response contracts
- **Infrastructure as Code** — Terraform plans declare desired state, then validate
- **Database migrations** — Schema declarations with rollback contracts
- **Type systems** — TypeScript interfaces, Rust traits, Go interfaces

**How Esy uses it**: Gate contracts (`G2.contract.json`, etc.) are Design by Contract applied to AI outputs:

| Contract Concept | Esy Implementation |
|---|---|
| **Preconditions** | Prior gates passed |
| **Postconditions** | `required_outputs` exist and `validations` pass |
| **Invariants** | Path conventions, depth thresholds, file patterns |

Example — the G2 contract doesn't say "do good research." It says: `research/` directory must exist, `CITATIONS.md` or `CLAIMS.md` must contain ≥8 sources at standard depth, and ≥3 markdown files must be present. Mechanical. Unambiguous. Verifiable.

### 3. Human-in-the-Loop (ML Ops)

**Origin**: Standard pattern in machine learning operations where automation prepares work, a human acts, and automation validates the result.

**Industry adoption**:
- **Amazon SageMaker Ground Truth** — ML training data labeling with human review
- **Scale AI / Labelbox** — Human annotation with automated quality checks
- **Content moderation** — Automated flagging → human review → automated enforcement
- **Surgical robotics** — AI assists, surgeon decides, system validates

**How Esy uses it**: The runner generates a **prompt packet** (structured instructions), pauses for a human operator to execute it in a separate AI session (e.g., Claude Code), then resumes to validate the outputs mechanically. The loop:

```
Runner generates prompt packet
         │
         ▼
Human copies packet → pastes into AI tool → AI produces artifacts
         │
         ▼
Human signals completion (presses Enter)
         │
         ▼
Runner validates artifacts against contract
         │
         ├── PASS → advance to next gate
         └── FAIL → retry or block
```

The human isn't doing the creative work — they're the bridge between the runner's structured intent and the AI's execution. This is HITL where the "human action" is prompt relay, not content creation.

### 4. Runbooks / Playbooks (SRE / DevOps)

**Origin**: Operational documentation that tells an operator exactly what to do in a specific situation. Predates software — military field manuals, aviation checklists, surgical protocols.

**Industry adoption**:
- **Google SRE** — Incident response runbooks with step-by-step procedures
- **PagerDuty / Opsgenie** — Automated runbook triggering on alerts
- **Aviation** — Preflight checklists, emergency procedures
- **Surgery** — WHO Surgical Safety Checklist

**How Esy uses it**: The prompt packet IS a runbook. It contains:

| Runbook Element | Prompt Packet Equivalent |
|---|---|
| **Context** | Run ID, gate, slug, depth, agent |
| **Instructions** | Gate-specific task list |
| **Expected outputs** | Required outputs with paths |
| **Validation criteria** | What the validator will check |
| **Execution steps** | "Copy → paste into Claude Code → follow instructions → press Enter" |

The key insight: a prompt packet is a runbook where the executor is an AI agent, mediated by a human operator.

### 5. Durable Execution (Workflow Engines)

**Origin**: Workflow engines that persist state across failures, allowing long-running processes to resume from the last checkpoint rather than restarting.

**Industry adoption**:
- **Temporal** (formerly Cadence at Uber) — Durable workflows with replay
- **Inngest** — Event-driven durable functions
- **AWS Step Functions** — State machines with retry and checkpoint
- **Apache Airflow** — DAG-based workflow orchestration with task state

**How Esy uses it**: The `RUN.json` record is a durable execution log:

```json
{
  "run_id": "VE-water-scarcity-20260208-abc123",
  "status": "RUNNING",
  "gates": [
    { "gate": "G1", "status": "PASS", "attempts": [...] },
    { "gate": "G2", "status": "PASS", "attempts": [...] },
    { "gate": "G5", "status": "FAIL", "attempts": [
      { "attempt": 1, "status": "FAIL", "failure_reason": "..." },
      { "attempt": 2, "status": "PASS" }
    ]}
  ]
}
```

If the process crashes at G5, it can resume from G5 — not G1. Each gate attempt is logged with artifacts, validations, and SHA256 hashes. This is the same persistence model as Temporal workflows, implemented as JSON files instead of a database (for now — the app-platform plans move this to Supabase).

---

## The Composite: What's Novel

No single pattern above is new. The combination — applied to **AI agent orchestration** — is what creates something distinct:

| Traditional Pattern | Esy's AI-Native Adaptation |
|---|---|
| CI validates **code** artifacts | Gates validate **prose + code + research** |
| Quality gates check **binary pass/fail** | Contracts check **substance** (source counts, heading presence, file patterns, depth thresholds) |
| Runbooks are instructions **for humans** | Prompt packets are instructions **for AI agents via human relay** |
| Design by Contract defines **API shapes** | Contracts define **research quality thresholds and creative output requirements** |
| Durable execution persists **function state** | Run records persist **creative production state with provenance** |

### Closest Industry Parallels (2025-2026)

| System | Similarity | Key Difference |
|---|---|---|
| **Temporal / Inngest** | Durable execution with retry, state persistence, activity logging | Esy orchestrates creative AI work, not deterministic functions |
| **LangChain / LangGraph** | Agent workflows with tool-call chains | Fully automated (no HITL); no gate contracts or quality validation |
| **Devin / OpenHands** | AI software engineering with checkpoints | Mostly automated; no research verification or citation audits |
| **Anthropic's internal pipelines** | Structured prompt generation with validation | Not public; likely similar architecture |
| **CI/CD (GitHub Actions, GitLab)** | Stage-based pipelines with approval gates | Validates code, not creative/research output |

---

## Bottom Line

The **architecture** (gates + contracts + validation + run records) is battle-tested across decades of software engineering. The **application** (orchestrating AI agents via prompt packets with human-in-the-loop handoff) is bleeding edge — most teams doing this are building it ad hoc. Having it formalized with contracts, depth scaling, and audit trails puts it ahead of most current approaches.

The natural evolution is replacing the human copy-paste step with direct API calls — the prompt packet becomes the API payload, the HITL loop becomes an automated agent invocation, and the architecture becomes structurally identical to Temporal/Inngest durable workflows with LLM tool calls as activities. The planning for this transition lives in [app-platform/](./app-platform/) and [multi-model-platform/](./multi-model-platform/).

---

*Last updated: February 2026*
