# App Platform: app.esy.com

> Architecture, database, API, and build plan for the Esy orchestration web platform.

## Context

app.esy.com is the web interface where:
- **Users** browse workflow templates, run them, and receive artifacts (visual essays, infographics, research packages)
- **Admin** creates workflow templates, configures models per stage, monitors runs in real-time, debugs agent failures, and reruns failed gates

This is **one app with role-based visibility** — not two separate apps. Users see the product surface. Admin sees everything users see plus observability, creation, and configuration tools.

## Current State (Feb 2026)

| Layer | Status | Notes |
|-------|--------|-------|
| UI: Workflow browser | ✅ Built | `/workflows` — 4 templates, search, filter by depth |
| UI: Spec viewer (read-only) | ✅ Built | `/specs/:id` — stages, QA config, cost profile, output guarantees |
| UI: Artifact browser | ✅ Built | `/artifacts` — 3 artifacts shown |
| UI: Activity feed | ✅ Built | `/activity` — 5 runs tracked |
| UI: Dashboard | ✅ Built | Featured template, recent artifacts |
| Backend: API routes | ❌ Not started | No execution backend exists |
| Backend: Supabase schema | ❌ Not started | No database tables for runs/gates |
| Backend: Model adapters | ❌ Not started | See `../multi-model-platform/` |
| Admin: Run inspector | ❌ Not started | Gate timeline, live status, rerun |
| Admin: Template creator | ❌ Not started | Visual workflow builder |
| Admin: Observability | ❌ Not started | System health, error rates, cost |
| Real-time: WebSocket/SSE | ❌ Not started | Live gate status updates |

## Documents in This Directory

| File | Purpose |
|------|---------|
| [architecture.md](./architecture.md) | Three-layer visibility model, routing structure, separation of concerns |
| [supabase-schema.md](./supabase-schema.md) | Database tables, relationships, indexes, RLS policies |
| [api-routes.md](./api-routes.md) | REST API specification for workflow execution and admin operations |
| [admin-observability.md](./admin-observability.md) | Admin run inspector, observability UI spec, gate timeline views |
| [build-phases.md](./build-phases.md) | Phased build plan — what to build first, what to defer |

## Relationship to Other Planning Docs

```
orchestration/planning/
├── app-platform/              ← YOU ARE HERE (web app architecture)
│   ├── README.md
│   ├── architecture.md        — Routing, roles, layers
│   ├── supabase-schema.md     — Database design
│   ├── api-routes.md          — API spec
│   ├── admin-observability.md — Admin UI + observability
│   └── build-phases.md        — Build order + timeline
│
└── multi-model-platform/      ← Model swapping + routing
    ├── README.md
    ├── architecture-overview.md  — Workflow Engine → Agent Router → Model Adapter
    ├── model-testing-strategy.md — A/B testing models per gate
    ├── cost-optimization.md      — Agent-to-model-tier mapping
    └── open-questions.md         — Unresolved decisions
```

**app-platform** = *how the web app works* (users, admin, API, database)
**multi-model-platform** = *how models are selected and invoked* (routing, adapters, cost)

They intersect at the API layer — the app-platform API routes call into the multi-model-platform's agent router and model adapters.

## Key Principle

From the Esy about page:

> *"Think of the difference between asking ChatGPT to 'make a logo' and using Canva."*

Users never see agents, gates, models, or contracts. They see:

```
Template → Intake form → Progress indicator → Artifact
```

All orchestration complexity is invisible infrastructure. The admin panel exists so **you** can see inside that black box — observe, debug, configure, and improve.

## How to Continue This Conversation

When resuming planning in a future session, share both directories:

```
@orchestration/planning/app-platform/
@orchestration/planning/multi-model-platform/
```

This gives full context on web app architecture + model infrastructure.
