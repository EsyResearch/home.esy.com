# Architecture: Three-Layer Visibility Model

> How to think about app.esy.com — one app, three layers of visibility gated by role.

## The Mental Model

You don't have two apps. You don't need a separate admin domain. You have **one app with three layers**, and each layer is a superset of the one below it:

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 3: OPERATOR (Admin)                               │
│  Everything in Creator + live observability, run         │
│  inspector, gate debugging, cost tracking, agent logs    │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  LAYER 2: CREATOR (Admin)                           │ │
│  │  Everything in User + create/edit workflow templates,│ │
│  │  configure specs, assign models per stage, manage   │ │
│  │  QA checks, set cost profiles                       │ │
│  │                                                     │ │
│  │  ┌─────────────────────────────────────────────────┐│ │
│  │  │  LAYER 1: USER                                  ││ │
│  │  │  Browse templates, run workflows, view progress, ││ │
│  │  │  receive artifacts + research packages          ││ │
│  │  └─────────────────────────────────────────────────┘│ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

| Layer | Who | Access Control |
|-------|-----|----------------|
| **User** | Anyone with an account | `role: user` on Supabase `profiles` table |
| **Creator** | You (admin) | `role: admin` — can create/edit templates |
| **Operator** | You (admin) | `role: admin` — can observe/debug/rerun runs |

Creator and Operator are the same role (`admin`) but different sections of the UI. In practice, they're both "admin" — just different tabs.

---

## Route Structure

### User Routes (Layer 1)

These routes already exist as UI. They need API wiring.

```
app.esy.com/                              → Dashboard
  ├── Featured template card
  ├── Recent artifacts
  └── Quick stats

app.esy.com/workflows                     → Browse workflow templates
  ├── Search + filter (Quick / Standard / Deep)
  ├── Template cards (Run workflow / Preview / Spec)
  └── Shows: name, description, time estimate, step count

app.esy.com/workflows/:id                 → Template detail
  ├── Description, what you'll get
  ├── Intent schema (input form)
  └── "Run this template" button

app.esy.com/workflows/:id/run             → Run a workflow (NEW)
  ├── Intent form (word, angle, audience, length)
  ├── Submit → creates run → shows progress
  └── Redirects to /activity/:runId on submit

app.esy.com/activity                      → Activity feed (run history)
  ├── List of all runs
  ├── Status badges (Running, Complete, Failed)
  └── Click → run detail

app.esy.com/activity/:runId               → Run progress view (NEW)
  ├── Gate progress bar (G1 ✅ → G2 ● → G3 ○)
  ├── Current stage name + description
  ├── ETA / elapsed time
  └── "View artifact" when complete

app.esy.com/artifacts                     → Artifact browser
  ├── Grid of completed artifacts
  ├── Status, date, type
  └── Click → artifact detail

app.esy.com/artifacts/:id                 → Artifact detail (NEW)
  ├── Full artifact view (rendered essay, downloadable files)
  ├── Research package browser
  ├── Spec that produced it
  └── Download options (HTML, PDF, markdown)

app.esy.com/specs                         → Spec browser (read-only)
  ├── List of versioned specs
  └── Click → spec detail

app.esy.com/specs/:id                     → Spec detail (read-only)
  ├── Pipeline stages with models
  ├── QA configuration
  ├── Output guarantees
  └── Cost profile
```

### Admin Routes (Layers 2 + 3)

These routes are entirely new. They're gated behind `role: admin` middleware.

```
app.esy.com/admin                         → Admin dashboard (NEW)
  ├── Active runs with live status
  ├── System health (pass rates, error rates)
  ├── Total cost (today / week / month)
  ├── Quick actions (create template, view failed runs)
  └── Model usage breakdown

app.esy.com/admin/runs                    → Run inspector (NEW) ← OBSERVABILITY
  ├── Table of all runs (filterable by status, template, date)
  ├── Columns: project, template, status, current gate, cost, duration
  ├── Bulk actions (cancel, rerun all failed)
  └── Real-time updates via SSE

app.esy.com/admin/runs/:id                → Run detail (NEW) ← CORE OBSERVABILITY
  ├── Gate timeline (horizontal: G1→G2→...→G9)
  │   ├── Each gate shows: ✅ passed / ❌ failed / ● running / ○ pending
  │   ├── Click gate → expand detail panel
  │   └── Shows: agent, model, duration, attempt count
  ├── Expanded gate detail:
  │   ├── Validation results (which checks passed/failed)
  │   ├── Fail codes + fix plan
  │   ├── Prompt packet (view what was sent to the model)
  │   ├── Raw output (view what the model returned)
  │   ├── Artifacts produced (with sha256 hashes)
  │   ├── Diff view (what changed from previous attempt)
  │   └── Actions: [Rerun This Gate] [Skip] [Approve Override]
  ├── Artifact panel (all files produced so far)
  ├── Cost breakdown (per gate, per model)
  └── Timeline log (timestamped events)

app.esy.com/admin/templates               → Template manager (NEW)
  ├── All workflow templates (edit / archive / duplicate)
  └── "Create new template" button

app.esy.com/admin/templates/new           → Template creator (NEW)
  ├── Name, description, type, depth
  ├── Intent schema builder (add fields, types, defaults)
  ├── Pipeline stage builder (add stages, assign agents + models)
  ├── QA check configurator (add checks, set severity)
  ├── Output guarantee editor
  ├── Cost profile calculator
  └── "Publish as Spec v1.0.0"

app.esy.com/admin/templates/:id/edit      → Template editor (NEW)
  ├── Same as creator but pre-populated
  ├── Version history
  └── "Publish new version"

app.esy.com/admin/agents                  → Agent registry browser (NEW)
  ├── All agents from orchestration/agents/
  ├── Grouped by category (content, engineering, auditors, etc.)
  ├── Each shows: name, role, capabilities, which gates use it
  └── Click → view full agent definition

app.esy.com/admin/models                  → Model configuration (NEW)
  ├── Available models (Claude, GPT, Gemini)
  ├── API key status (connected / expired)
  ├── Default model per tier (top/mid/low)
  ├── Usage stats per model
  └── Cost rates

app.esy.com/admin/settings                → Platform settings (NEW)
  ├── API keys management
  ├── Default retry config
  ├── Cost budget limits
  └── User management
```

---

## How Auth Works

```
User hits any route
  → Next.js middleware checks Supabase session
  → If /admin/* route:
      → Check profiles.role === 'admin'
      → If not admin → redirect to /
  → If no session → redirect to /login
```

One Supabase auth instance. One `profiles` table with a `role` column. No separate auth system.

---

## How a Run Flows Through the System

```
User clicks "Run workflow"
  │
  ├─ 1. Frontend sends POST /api/runs
  │     Body: { specId, intent: { word: "serendipity", angle: "etymology", ... } }
  │
  ├─ 2. API creates run record in Supabase (status: "pending")
  │     Creates gate_execution rows for each gate (all status: "pending")
  │     Returns: { runId }
  │
  ├─ 3. Frontend redirects to /activity/:runId
  │     Opens SSE connection to GET /api/runs/:id/stream
  │
  ├─ 4. API begins executing gates sequentially:
  │     │
  │     ├─ For each gate:
  │     │   ├─ Update gate status → "running" (SSE pushes to frontend)
  │     │   ├─ Generate prompt packet (agent .md + inputs + gate instructions)
  │     │   ├─ Call model API via adapter (see multi-model-platform docs)
  │     │   ├─ Parse response → extract artifacts
  │     │   ├─ Run contract validation against gate contract
  │     │   ├─ If PASS:
  │     │   │   ├─ Store artifacts with sha256 hashes
  │     │   │   ├─ Update gate status → "passed" (SSE pushes)
  │     │   │   └─ Continue to next gate
  │     │   ├─ If FAIL:
  │     │   │   ├─ Record fail codes and validation results
  │     │   │   ├─ Update gate status → "failed" (SSE pushes)
  │     │   │   └─ Pause run (status: "paused")
  │     │   │       Admin sees failure in run inspector
  │     │   │       Admin can: [Rerun] [Skip] [Abort]
  │     │   └─ If WARNING:
  │     │       ├─ Record warnings
  │     │       ├─ Update gate status → "passed_with_warnings"
  │     │       └─ Continue to next gate
  │     │
  │     └─ After final gate:
  │         ├─ Compile all artifacts into deliverable package
  │         ├─ Update run status → "completed"
  │         └─ SSE pushes completion event
  │
  └─ 5. User sees completed artifact at /artifacts/:id
```

---

## What Already Exists vs. What's New

| Component | Status | Details |
|-----------|--------|---------|
| **User dashboard** | ✅ UI exists | Needs API wiring |
| **Workflow browser** | ✅ UI exists | Cards, search, filters — needs to read from Supabase |
| **Spec viewer** | ✅ UI exists | Stages, QA, cost — currently hardcoded? |
| **Artifact viewer** | ✅ UI exists | Cards with status — needs to read from Supabase |
| **Activity feed** | ✅ UI exists | Run list — needs to read from Supabase |
| **Supabase tables** | ❌ New | See [supabase-schema.md](./supabase-schema.md) |
| **API routes** | ❌ New | See [api-routes.md](./api-routes.md) |
| **Run execution engine** | ❌ New | Calls model APIs, validates gates |
| **SSE/WebSocket** | ❌ New | Pushes gate status to frontend |
| **Admin run inspector** | ❌ New | See [admin-observability.md](./admin-observability.md) |
| **Admin template creator** | ❌ New | Visual workflow builder |
| **Admin model config** | ❌ New | API keys, model assignment |

---

## Technology Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | Next.js + React | Already using for esy.com |
| Hosting | Vercel | Already have account for app.esy.com |
| Database | Supabase (Postgres) | Already using for auth |
| Auth | Supabase Auth | Already set up |
| Real-time | Supabase Realtime or SSE via Vercel | Live gate updates |
| Assets | Cloudflare | Already using for esy.com assets |
| Model APIs | Anthropic, OpenAI, Google | Direct API calls, no SDK |
| Job Queue | Vercel Background Functions or Inngest | Long-running gate executions |

### Why a Job Queue Matters

Gate executions can take 30-90 seconds (some generate 100K+ tokens). Vercel serverless functions have a 10s timeout on Hobby and 60s on Pro. Options:

1. **Vercel Background Functions** (Pro plan) — up to 15 minutes, ideal for gate execution
2. **Inngest** — event-driven job queue that integrates with Vercel, handles retries
3. **Supabase Edge Functions** — alternative if Vercel timeouts are a problem
4. **Separate long-running server** — overkill for now but necessary at scale

**Recommendation**: Start with Vercel Pro (60s timeout handles most gates). Use Inngest for G5 Production gates that may take longer.

---

## Separation of Concerns

```
esy.com (Netlify)              app.esy.com (Vercel)
├── Marketing site              ├── User product
├── Visual essays (published)   ├── Workflow execution
├── School articles             ├── Artifact delivery
├── Glossary                    ├── Admin panel
├── Blog                        ├── Run observability
└── SEO content                 └── Model configuration

orchestration/ (this repo)
├── agents/       → Agent definitions (shared by local runner + web platform)
├── gates/        → Gate contracts (shared by local runner + web platform)
├── runner/       → Local CLI runner (development/testing tool)
├── planning/     → Architecture + planning docs
├── projects/     → Project-specific artifacts
├── profiles/     → Research profiles
└── skills/       → Invocation specs
```

The `orchestration/` directory is the **source of truth** for agent definitions, gate contracts, and workflow specifications. Both the local CLI runner and the web platform read from these same files. The web platform just adds: database persistence, model API integration, real-time UI, and admin tools.
