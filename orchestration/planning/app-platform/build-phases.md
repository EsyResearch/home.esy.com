# Build Phases: From UI Shells to Working Platform

> What to build first, what to defer, and why — organized around the principle of "each phase gives you something usable."

## Current Starting Point

You have:
- ✅ UI at app.esy.com: dashboard, workflow browser, spec viewer, artifact browser, activity feed
- ✅ Local orchestration: 50+ agents, 13-gate runner, contracts, workflows, research profiles
- ✅ Supabase account (auth likely set up)
- ✅ Vercel account for app.esy.com
- ❌ No API routes
- ❌ No database tables for runs/gates
- ❌ No model API integration
- ❌ No admin panel
- ❌ No real-time updates

---

## Phase 1: Make "Run Workflow" Work

**Goal**: User clicks "Run workflow" → run is created → gates execute → artifacts appear.

**What you build:**
1. Supabase tables: `profiles`, `workflow_templates`, `specs`, `runs`, `gate_executions`, `artifacts`, `models`
2. Seed data: insert your existing workflow templates and specs into the database
3. API routes:
   - `GET /api/workflows` — feeds the workflow browser
   - `GET /api/workflows/:slug` — feeds the template detail + intent form
   - `POST /api/runs` — creates a run and enqueues execution
   - `GET /api/runs` — feeds the activity page
   - `GET /api/runs/:id` — feeds the run progress view
   - `GET /api/runs/:id/artifacts` — feeds the artifact list
4. Run execution engine:
   - Background function that processes gates sequentially
   - For each gate: build prompt → call model API → parse output → validate against contract → store artifacts
   - Start with **one model adapter** (Claude/Anthropic only)
5. Wire existing UI to API:
   - Workflow browser reads from `/api/workflows`
   - "Run workflow" button calls `POST /api/runs`
   - Activity page reads from `/api/runs`
   - Run progress reads from `/api/runs/:id` (polling, not real-time yet)

**What you skip:**
- No admin panel yet
- No real-time updates (polling is fine for Phase 1)
- No multi-model (Claude only)
- No rerun capability
- No observability beyond basic status

**What you can do after Phase 1:**
- Click "Run workflow" on the Typographic Etymology template
- Fill in the intent form (word, angle, audience, length)
- See the run appear in Activity with a status
- Watch gates progress (via polling)
- See the completed artifact

**Estimated effort:** 3-5 days of focused work.

**Technical decisions:**
- Use Next.js App Router API routes (already in Vercel)
- Use `@supabase/supabase-js` for database + auth
- Use `@anthropic-ai/sdk` for Claude API calls
- Background execution: `waitUntil()` for short gates, or Inngest for the full pipeline
- Prompt generation: port logic from `orchestration/runner/lib/prompt-generator.js`
- Contract validation: port logic from `orchestration/runner/lib/validator.js`

---

## Phase 2: Admin Run Inspector (Observability)

**Goal**: Admin can see inside any run — gate timeline, validation results, prompt packets, raw outputs, and rerun failed gates.

**What you build:**
1. Admin route group: `/admin/*` with middleware role check
2. Admin dashboard (`/admin`):
   - Active runs with status
   - Basic system stats (runs today, cost today)
3. Run inspector (`/admin/runs/:id`):
   - Gate timeline visualization (the horizontal G1→G2→...→G9 bar)
   - Click to expand any gate: validation results, fail codes, duration, model used
   - Prompt packet viewer (modal showing what was sent)
   - Raw output viewer (modal showing what was returned)
   - "Rerun this gate" button
   - "Skip gate" and "Override as passed" buttons
4. Real-time updates:
   - Supabase Realtime subscription on `gate_executions` table
   - Gate status updates live as the pipeline runs
5. API routes:
   - `GET /api/admin/runs` — all runs across all users
   - `GET /api/admin/runs/:id` — full detail with prompt packets and raw outputs
   - `POST /api/admin/runs/:id/gates/:gateId/rerun`
   - `POST /api/admin/runs/:id/gates/:gateId/skip`
   - `POST /api/admin/runs/:id/gates/:gateId/approve`
   - `POST /api/admin/runs/:id/resume`
   - `POST /api/admin/runs/:id/cancel`

**What you skip:**
- No template creator yet (still create templates via SQL seed or API)
- No model comparison views
- No system health aggregations
- No diff between attempts

**What you can do after Phase 2:**
- See exactly what's happening inside a running pipeline
- Diagnose why a gate failed (view prompt, view output, view validation)
- Rerun a failed gate without restarting the whole pipeline
- Override a gate that failed on a technicality
- Watch gates execute in real-time

**This is where phantom gate passing dies.** Every gate has:
- A stored prompt packet (what was asked)
- A stored raw output (what was returned)
- Validation results (what passed and what failed)
- Fail codes (specific reasons for failure)
- Attempt history (how many times it was tried)

**Estimated effort:** 4-6 days of focused work.

---

## Phase 3: Template Creator + Multi-Model + Polish

**Goal**: Admin can create new workflow templates through the UI. Multiple models are available. System health metrics exist.

**What you build:**
1. Template creator (`/admin/templates/new`):
   - Name, description, type, depth fields
   - Intent schema builder (add fields with types and defaults)
   - Pipeline stage builder (add stages, assign agents, assign models)
   - QA check configurator
   - Output guarantee editor
   - Cost profile (auto-calculated from model pricing)
   - "Publish as Spec v1.0.0"
2. Multi-model support:
   - OpenAI adapter (GPT-5.x, O3)
   - Google adapter (Gemini 2.5 Pro/Flash)
   - Model selector per stage in template creator
   - Model override on rerun
3. Admin model config page (`/admin/models`):
   - API key management (encrypted in Supabase)
   - Model status and pricing
   - Usage stats per model
4. System health view:
   - Gate reliability matrix (pass rates by gate × model)
   - Error frequency chart
   - Cost trends over time
5. Diff view between gate attempts
6. Run export (download full run record as JSON)

**What you can do after Phase 3:**
- Create entirely new workflow types through the UI
- Swap models per stage to optimize cost/quality
- Compare model performance across gates
- See system-wide reliability trends
- Identify and fix systematic failures

**Estimated effort:** 8-12 days of focused work.

---

## Phase 4: User Polish + Artifact Experience

**Goal**: The user experience is publication-quality. Artifacts are beautifully presented. Research packages are browsable.

**What you build:**
1. Artifact detail view (`/artifacts/:id`):
   - Rendered visual essay preview
   - Research package browser (tree view of all research files)
   - Spec that produced it
   - Download in multiple formats
2. User run progress view improvements:
   - Animated gate progress
   - ETA calculation
   - "Your artifact is ready" notification
3. Artifact gallery/portfolio:
   - Grid of all completed artifacts
   - Filter by type, date, template
   - Share links
4. Custom Specs (the "Coming Soon" feature in your UI):
   - Fork existing specs
   - Modify constraints and models
   - Save custom specs to user library

**Estimated effort:** 5-8 days of focused work.

---

## Summary Timeline

| Phase | What | Outcome | Effort |
|-------|------|---------|--------|
| **Phase 1** | Run execution backend | "Run workflow" actually works | 3-5 days |
| **Phase 2** | Admin observability | Can see inside runs, debug, rerun | 4-6 days |
| **Phase 3** | Template creator + multi-model | Can create workflows, swap models | 8-12 days |
| **Phase 4** | User polish + artifacts | Publication-quality user experience | 5-8 days |

**Total: 20-31 days of focused work**

Each phase is independently valuable. You can stop after Phase 1 and have a working product. Phase 2 gives you the debugging tools you've been asking for. Phase 3 unlocks the multi-model vision. Phase 4 makes it beautiful.

---

## What NOT to Build

Things that are tempting but not worth building now:

| Temptation | Why Not |
|------------|---------|
| Custom agent editor in UI | Agent .md files work fine in the repo. Edit in IDE. |
| LLM-as-judge scoring | Complex, expensive. Manual review is sufficient for now. |
| Team collaboration | You're the only admin. Add this when there's demand. |
| Public API / webhooks | No external consumers yet. Build when needed. |
| Mobile admin app | Desktop-only admin is fine. Mobile is for users. |
| Automated pipeline scheduling | Manual triggers are fine. No cron needed yet. |
| Fine-tuning integration | Off-the-shelf models are sufficient. |

---

## Migration from Local Runner

The local runner (`orchestration/runner/cli.js`) doesn't go away. It evolves:

| Function | Local Runner | Web Platform |
|----------|-------------|-------------|
| Gate contracts | `orchestration/gates/contracts/*.json` | Same files, loaded by API |
| Workflow definitions | `orchestration/runner/workflows/*.json` | Same data, stored in `specs` table |
| Validation logic | `orchestration/runner/lib/validator.js` | Port to `lib/orchestration/validator.ts` |
| Prompt generation | `orchestration/runner/lib/prompt-generator.js` | Port to `lib/orchestration/prompt-generator.ts` |
| Run records | `orchestration/runs/*.json` | `runs` + `gate_executions` tables |
| Agent definitions | `orchestration/agents/*.md` | Same files, read by prompt generator |

The web platform reads from the same `orchestration/` directory for agent definitions and gate contracts. The database replaces file-based run records. The API replaces CLI commands.

**The local runner remains useful for:**
- Development and testing
- Running pipelines offline
- Debugging contract issues
- Quick experiments before committing to a web run
