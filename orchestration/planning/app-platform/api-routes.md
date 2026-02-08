# API Routes: app.esy.com

> REST API specification for workflow execution, run management, and admin operations.

## Base URL

```
https://app.esy.com/api
```

All routes require authentication via Supabase session token (passed as Bearer token or cookie). Admin routes additionally require `role: admin` on the user profile.

---

## User Routes

### Workflows

#### `GET /api/workflows`

List active workflow templates.

```
Query params:
  type    — filter by type ('visual-essay', 'infographic', 'research')
  depth   — filter by depth ('quick', 'standard', 'deep')
  search  — text search on name/description
  
Response: {
  workflows: [
    {
      id, slug, name, description, type, depth, tags,
      what_you_get, estimated_time, step_count,
      is_featured, active_spec_version
    }
  ]
}
```

#### `GET /api/workflows/:slug`

Get workflow detail with its active spec.

```
Response: {
  workflow: { id, slug, name, description, type, depth, tags, ... },
  spec: { id, version, intent_schema, stages, qa_config, output_guarantees, cost_profile }
}
```

---

### Runs

#### `POST /api/runs`

Create and start a new run. This is what fires when the user clicks "Run workflow."

```
Body: {
  spec_id: "uuid",
  intent: {
    word: "serendipity",
    angle: "etymology",
    audience: "general",
    length: "12min"
  }
}

Response: {
  run: {
    id: "uuid",
    project_slug: "serendipity-etymology-20260208",
    status: "pending",
    total_gates: 13,
    gates: [
      { gate_id: "G1", gate_name: "Intake Approval", status: "pending" },
      { gate_id: "G2", gate_name: "Research Complete", status: "pending" },
      ...
    ]
  }
}
```

**Server-side behavior:**
1. Validate intent against spec's intent_schema
2. Insert run row (status: pending)
3. Insert gate_execution rows for each stage (all pending)
4. Enqueue the run for execution (background job)
5. Return immediately — client polls or uses SSE for updates

#### `GET /api/runs`

List user's runs.

```
Query params:
  status   — filter ('running', 'completed', 'failed', 'paused')
  limit    — pagination (default 20)
  offset   — pagination

Response: {
  runs: [
    {
      id, display_name, project_slug, status, current_gate,
      gates_passed, total_gates, total_cost_usd,
      template_name, spec_version,
      started_at, completed_at, created_at
    }
  ],
  total: 42
}
```

#### `GET /api/runs/:id`

Get full run detail with all gate statuses.

```
Response: {
  run: {
    id, display_name, project_slug, status, current_gate,
    intent, pause_reason,
    total_gates, gates_passed, gates_failed,
    total_tokens_in, total_tokens_out, total_cost_usd,
    started_at, completed_at
  },
  gates: [
    {
      gate_id, gate_name, phase, status,
      agent_slug, model_id, attempt_number,
      tokens_in, tokens_out, cost_usd, duration_ms,
      fail_codes, started_at, completed_at,
      validation_summary: { total: 5, passed: 4, failed: 0, warnings: 1 }
    }
  ],
  template: { name, slug, type },
  spec: { version, id }
}
```

#### `GET /api/runs/:id/stream`

**Server-Sent Events (SSE)** — real-time gate status updates.

```
Event types:
  gate_started    — { gate_id, gate_name, agent_slug, model_id }
  gate_passed     — { gate_id, gate_name, duration_ms, cost_usd }
  gate_failed     — { gate_id, gate_name, fail_codes, validation_results }
  gate_warning    — { gate_id, gate_name, warnings }
  run_paused      — { gate_id, pause_reason }
  run_completed   — { total_cost_usd, total_duration_ms, artifact_count }
  run_failed      — { gate_id, reason }
```

**Usage in frontend:**

```javascript
const eventSource = new EventSource(`/api/runs/${runId}/stream`);
eventSource.addEventListener('gate_passed', (e) => {
  const data = JSON.parse(e.data);
  updateGateStatus(data.gate_id, 'passed');
});
eventSource.addEventListener('run_completed', (e) => {
  showArtifactButton();
  eventSource.close();
});
```

---

### Artifacts

#### `GET /api/runs/:id/artifacts`

List artifacts produced by a run.

```
Response: {
  artifacts: [
    {
      id, file_name, file_path, content_type, content_hash,
      size_bytes, artifact_type, gate_id, created_at
    }
  ]
}
```

#### `GET /api/artifacts/:id`

Get artifact content (for text artifacts) or download URL (for binary).

```
Response: {
  artifact: {
    id, file_name, content_type, content_hash,
    content: "# CONCEPTS.md\n\n## Core Concepts\n...",  // or null if binary
    storage_url: "https://..."  // for binary/large files
  }
}
```

#### `GET /api/artifacts/:id/download`

Download artifact as a file.

```
Content-Disposition: attachment; filename="CONCEPTS.md"
Content-Type: text/markdown
```

---

### Specs

#### `GET /api/specs`

List active specs.

```
Response: {
  specs: [
    { id, version, template_name, template_slug, stage_count, qa_check_count, is_active, created_at }
  ]
}
```

#### `GET /api/specs/:id`

Get full spec detail (read-only for users).

```
Response: {
  spec: {
    id, version, version_hash,
    intent_schema, stages, qa_config,
    output_guarantees, cost_profile,
    artifact_type, output_formats
  },
  template: { name, slug, type, depth }
}
```

---

## Admin Routes

All admin routes require `role: admin`. Middleware rejects with 403 otherwise.

### Run Management

#### `GET /api/admin/runs`

List all runs across all users (admin can see everything).

```
Query params:
  status, user_id, template_slug, date_from, date_to, limit, offset

Response: {
  runs: [ ...same as user runs but includes user_id, email... ],
  total: 142
}
```

#### `GET /api/admin/runs/:id`

Full run detail with all gate executions, including prompt packets and raw outputs.

```
Response: {
  run: { ... },
  gates: [
    {
      ...all user-visible fields...,
      prompt_packet: "You are a world-class research...",  // ADMIN ONLY
      raw_output: "# CONCEPTS.md\n\n## Core...",          // ADMIN ONLY
      validation_results: [ { type, target, passed, severity, detail } ]
    }
  ],
  artifacts: [ ... ],
  cost_breakdown: {
    by_gate: [ { gate_id, cost_usd } ],
    by_model: [ { model_id, cost_usd } ]
  }
}
```

#### `POST /api/admin/runs/:id/gates/:gateId/rerun`

Rerun a failed or passed gate. Creates a new gate_execution with incremented attempt_number.

```
Body: {
  model_id: "gpt-5.3"  // optional: override model for this attempt
}

Response: {
  gate_execution: { id, gate_id, attempt_number, status: "running", model_id }
}
```

#### `POST /api/admin/runs/:id/gates/:gateId/skip`

Skip a gate and move to the next one.

```
Body: {
  reason: "Design research not needed for this test run"
}

Response: {
  gate_execution: { id, gate_id, status: "skipped" }
}
```

#### `POST /api/admin/runs/:id/gates/:gateId/approve`

Override a failed gate as approved (manual admin override).

```
Body: {
  reason: "Output is acceptable despite missing optional heading"
}

Response: {
  gate_execution: { id, gate_id, status: "passed" }
}
```

#### `POST /api/admin/runs/:id/cancel`

Cancel a running or paused run.

```
Response: {
  run: { id, status: "cancelled" }
}
```

#### `POST /api/admin/runs/:id/resume`

Resume a paused run from the current gate.

```
Response: {
  run: { id, status: "running", current_gate: "G5" }
}
```

---

### Template Management

#### `POST /api/admin/templates`

Create a new workflow template.

```
Body: {
  slug: "data-journalism-essay",
  name: "Data Journalism Visual Essay",
  description: "A data-driven argumentative essay with interactive visualizations",
  type: "visual-essay",
  depth: "deep",
  tags: ["data-journalism", "visual-essay", "interactive"],
  what_you_get: ["Data-driven visual essay", "5+ interactive visualizations", "Research package"],
  estimated_time: "15-20 min",
  step_count: 13
}

Response: { template: { id, slug, ... } }
```

#### `PUT /api/admin/templates/:id`

Update a template.

#### `DELETE /api/admin/templates/:id`

Soft-delete (set `is_active: false`).

---

### Spec Management

#### `POST /api/admin/specs`

Create a new spec version for a template.

```
Body: {
  template_id: "uuid",
  version: "v2.0.0",
  intent_schema: [ ... ],
  stages: [ ... ],
  qa_config: { ... },
  output_guarantees: [ ... ],
  cost_profile: { ... }
}

Response: { spec: { id, version, version_hash, ... } }
```

---

### Model Management

#### `GET /api/admin/models`

List all models with usage stats.

```
Response: {
  models: [
    {
      id, provider, display_name, tier,
      input_cost_per_1k, output_cost_per_1k,
      is_active, total_executions_this_month, total_cost_this_month
    }
  ]
}
```

#### `PUT /api/admin/models/:id`

Update model config (e.g., toggle active, update pricing).

---

### Analytics (Admin)

#### `GET /api/admin/analytics/overview`

Platform-level stats.

```
Response: {
  today: { runs: 3, completed: 2, failed: 1, cost_usd: 4.22 },
  this_week: { runs: 12, completed: 9, failed: 3, cost_usd: 28.50 },
  this_month: { runs: 42, completed: 35, failed: 7, cost_usd: 112.80 },
  gate_pass_rates: {
    G1: 0.95, G2: 0.88, G3: 0.92, G4: 0.78, G5: 0.65, ...
  },
  model_usage: [
    { model_id: "claude-opus-4", executions: 45, cost_usd: 67.20 },
    { model_id: "o3", executions: 30, cost_usd: 22.10 },
    ...
  ]
}
```

---

## Implementation Notes

### Next.js App Router Structure

```
app/
├── api/
│   ├── workflows/
│   │   ├── route.ts           — GET /api/workflows
│   │   └── [slug]/
│   │       └── route.ts       — GET /api/workflows/:slug
│   ├── runs/
│   │   ├── route.ts           — GET, POST /api/runs
│   │   └── [id]/
│   │       ├── route.ts       — GET /api/runs/:id
│   │       ├── stream/
│   │       │   └── route.ts   — GET /api/runs/:id/stream (SSE)
│   │       └── artifacts/
│   │           └── route.ts   — GET /api/runs/:id/artifacts
│   ├── artifacts/
│   │   └── [id]/
│   │       ├── route.ts       — GET /api/artifacts/:id
│   │       └── download/
│   │           └── route.ts   — GET /api/artifacts/:id/download
│   ├── specs/
│   │   ├── route.ts           — GET /api/specs
│   │   └── [id]/
│   │       └── route.ts       — GET /api/specs/:id
│   └── admin/
│       ├── runs/
│       │   ├── route.ts       — GET /api/admin/runs
│       │   └── [id]/
│       │       ├── route.ts   — GET /api/admin/runs/:id
│       │       ├── cancel/
│       │       │   └── route.ts
│       │       ├── resume/
│       │       │   └── route.ts
│       │       └── gates/
│       │           └── [gateId]/
│       │               ├── rerun/
│       │               │   └── route.ts
│       │               ├── skip/
│       │               │   └── route.ts
│       │               └── approve/
│       │                   └── route.ts
│       ├── templates/
│       │   ├── route.ts       — GET, POST /api/admin/templates
│       │   └── [id]/
│       │       └── route.ts   — PUT, DELETE
│       ├── specs/
│       │   └── route.ts       — POST /api/admin/specs
│       ├── models/
│       │   ├── route.ts       — GET /api/admin/models
│       │   └── [id]/
│       │       └── route.ts   — PUT
│       └── analytics/
│           └── overview/
│               └── route.ts   — GET /api/admin/analytics/overview
```

### Auth Middleware

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  
  // Require auth for all /api routes
  if (req.nextUrl.pathname.startsWith('/api') && !session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Require admin for /api/admin routes
  if (req.nextUrl.pathname.startsWith('/api/admin')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();
    
    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }
  
  return res;
}

export const config = { matcher: ['/api/:path*', '/admin/:path*'] };
```

### Background Job Execution

Gate execution is asynchronous. When a run is created, the API enqueues it:

```typescript
// Option A: Vercel Background Function (Pro plan)
// The POST /api/runs handler starts execution in background
export async function POST(req: Request) {
  const run = await createRun(body);
  
  // Fire and forget — execution happens in background
  // Use waitUntil() to keep the function alive after response
  (globalThis as any).__NEXT_REQUEST_CONTEXT?.waitUntil(
    executeRunPipeline(run.id)
  );
  
  return NextResponse.json({ run });
}

// Option B: Inngest (event-driven)
import { inngest } from '@/lib/inngest';

export async function POST(req: Request) {
  const run = await createRun(body);
  await inngest.send({ name: 'run/started', data: { runId: run.id } });
  return NextResponse.json({ run });
}

// Inngest function handles the pipeline
export const executeRun = inngest.createFunction(
  { id: 'execute-run' },
  { event: 'run/started' },
  async ({ event, step }) => {
    const { runId } = event.data;
    const gates = await step.run('load-gates', () => loadGates(runId));
    
    for (const gate of gates) {
      await step.run(`execute-${gate.gate_id}`, () => executeGate(runId, gate));
      // Inngest handles retries, timeouts, and failure automatically
    }
  }
);
```
