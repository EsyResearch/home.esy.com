# Orchestration Planning

> Planning and architecture documents for the Esy orchestration platform — from local CLI to web-based admin at app.esy.com.

## Directories

| Directory | Purpose | Status |
|-----------|---------|--------|
| [app-platform/](./app-platform/) | Web application architecture for app.esy.com — routing, database, API, admin observability, build phases | Active planning |
| [multi-model-platform/](./multi-model-platform/) | Multi-model infrastructure — model routing, testing strategy, cost optimization | Active planning |

## Quick Navigation

### App Platform (app.esy.com)

*"How does the web app work?"*

| Document | Answers |
|----------|---------|
| [architecture.md](./app-platform/architecture.md) | Three-layer model (User/Creator/Operator), route structure, auth, run flow |
| [supabase-schema.md](./app-platform/supabase-schema.md) | Database tables, relationships, RLS policies, key queries |
| [api-routes.md](./app-platform/api-routes.md) | REST API spec — user routes, admin routes, SSE streaming, background jobs |
| [admin-observability.md](./app-platform/admin-observability.md) | Run inspector, gate timeline, prompt viewer, failure analysis, cost tracking |
| [build-phases.md](./app-platform/build-phases.md) | Phase 1-4 build plan with effort estimates and what to skip |

### Multi-Model Platform

*"How do models get selected and invoked?"*

| Document | Answers |
|----------|---------|
| [architecture-overview.md](./multi-model-platform/architecture-overview.md) | Workflow Engine → Agent Router → Model Adapter |
| [model-testing-strategy.md](./multi-model-platform/model-testing-strategy.md) | How to A/B test models per gate |
| [cost-optimization.md](./multi-model-platform/cost-optimization.md) | Agent-to-model-tier mapping |
| [open-questions.md](./multi-model-platform/open-questions.md) | Unresolved architectural decisions |

## How These Relate

```
app-platform/               multi-model-platform/
┌──────────────────┐        ┌──────────────────┐
│ Web UI           │        │                  │
│ Routes           │        │ Agent Router     │
│ Database         │───────▶│ Model Adapters   │
│ API              │        │ Cost Optimizer   │
│ Admin Panel      │        │ A/B Testing      │
└──────────────────┘        └──────────────────┘
        │                           │
        │     Both read from:       │
        └──────────┬────────────────┘
                   ▼
         orchestration/
         ├── agents/     (agent definitions)
         ├── gates/      (gate contracts)
         ├── runner/     (local CLI / prototype)
         ├── profiles/   (research profiles)
         └── skills/     (invocation specs)
```

The **app-platform** defines the web application — how users and admin interact with the system. The **multi-model-platform** defines how the system invokes AI models — routing, adapters, cost. They meet at the API layer: when a user triggers a run, the API routes (app-platform) call into the agent router and model adapters (multi-model-platform).

## How to Continue Planning

When resuming in a future session, share:

```
@orchestration/planning/
```

This gives the AI full context on both the web app architecture and the multi-model infrastructure.
