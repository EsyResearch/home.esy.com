# Admin Observability: Run Inspector & System Health

> Detailed spec for the admin panel — the interface that solves phantom gate passing, gives visibility into agent execution, and lets you debug, rerun, and configure workflows.

## Why This Matters

From the ChatGPT conversation dump:

> *"Everytime I run my prompt through it, the results end up where a gate is supposedly passed but then at the end it appears that gate didn't run or it ran partially. It's always unreliable."*

The observability layer solves this by making **every gate execution verifiable**:
- Did the model actually produce output? (raw_output is stored)
- Did the output pass contract validation? (validation_results are recorded)
- What specific checks failed? (fail_codes are logged)
- Can I see exactly what was sent to the model? (prompt_packet is preserved)
- Can I rerun just the failed gate without restarting? (rerun endpoint exists)

---

## Admin Dashboard (`/admin`)

The landing page for admin. Shows system health at a glance.

```
┌─────────────────────────────────────────────────────────────────┐
│  admin / Dashboard                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   3 Active   │  │  12 Today    │  │   $4.22      │          │
│  │   Runs       │  │  Completed   │  │   Cost Today │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│  Active Runs                                                     │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ ● Serendipity        G5 Production    claude-opus-4  45s   │ │
│  │ ● Water Scarcity     G2 Research      o3             22s   │ │
│  │ ⏸ Synthetic Sweet.   G4 FAILED        —              —     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Gate Pass Rates (Last 7 Days)                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ G1 ████████████████████████ 95%                            │ │
│  │ G2 ████████████████████░░░░ 88%                            │ │
│  │ G3 █████████████████████░░░ 92%                            │ │
│  │ G4 ████████████████░░░░░░░░ 78%  ← Attention              │ │
│  │ G5 █████████████░░░░░░░░░░░ 65%  ← Needs investigation    │ │
│  │ G6 ██████████████████████░░ 90%                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Model Usage                                                     │
│  claude-opus-4:   45 calls  │  $67.20  │  avg 38s              │
│  o3:              30 calls  │  $22.10  │  avg 52s              │
│  claude-haiku:    18 calls  │  $0.85   │  avg 4s               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Key metrics surfaced:**
- Active runs with current gate and model
- Gate pass rates (identifies systematically failing gates)
- Model usage and cost breakdown
- Failed runs requiring attention

---

## Run Inspector (`/admin/runs`)

Table of all runs with filtering and real-time status updates.

```
┌─────────────────────────────────────────────────────────────────┐
│  admin / Runs                                    [Export CSV]    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Filters:  [All ▼]  [All Templates ▼]  [This Week ▼]  🔍       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │ Project          Template       Status    Gate   Cost  Time  ││
│  ├──────────────────────────────────────────────────────────────┤│
│  │ Serendipity      Etymology      ● Run     G5    $2.1  3m    ││
│  │ Water Scarcity   Data Journal.  ● Run     G2    $0.3  1m    ││
│  │ Synth. Sweet.    Etymology      ⏸ Paused  G4    $1.8  —     ││
│  │ The Word Robot   Etymology      ✅ Done    G9    $4.2  8m    ││
│  │ Slang            Etymology      ✅ Done    G9    $3.8  7m    ││
│  │ Water Cycle      Infographic    ✅ Done    G9    $1.2  4m    ││
│  │ Money Creation   Data Journal.  ❌ Failed  G5    $3.1  5m    ││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Showing 7 of 42 runs                        [< 1 2 3 4 5 >]   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Run Detail (`/admin/runs/:id`) — Core Observability View

This is the most important admin screen. It's what you look at when a gate fails or behaves unexpectedly.

### Gate Timeline

Horizontal pipeline visualization showing every gate's status:

```
┌─────────────────────────────────────────────────────────────────┐
│  Run: serendipity-etymology-20260208                             │
│  Template: Typographic Etymology   Spec: v1.0.0                  │
│  Status: Running   Started: 3m ago   Cost so far: $2.14          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  INTAKE    RESEARCH     SPEC     DESIGN       PRODUCTION         │
│  ┌──┐     ┌──┐        ┌──┐     ┌──┐  ┌──┐   ┌──┐              │
│  │G1│────▶│G2│───────▶│G3│────▶│G4│─▶│4.1│─▶│4.5│──▶ ...      │
│  │✅│     │✅│        │✅│     │✅│  │✅ │   │● │              │
│  └──┘     └──┘        └──┘     └──┘  └──┘   └──┘              │
│  0.8s     45s         22s      38s   12s     ●running           │
│  haiku    o3          sonnet   opus  sonnet  sonnet             │
│                                                                  │
│  Click any gate to expand ▼                                      │
└─────────────────────────────────────────────────────────────────┘
```

### Expanded Gate Detail

When you click a gate in the timeline, it expands to show full details:

```
┌─────────────────────────────────────────────────────────────────┐
│  ▼ G4: Design Research                                           │
│  Agent: ui-ux-design-expert    Model: claude-opus-4              │
│  Status: PASSED   Attempt: 2/3   Duration: 38s   Cost: $0.80    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Validation Results                                              │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ ✅ file_exists    DESIGN-RESEARCH.md          passed       │ │
│  │ ⚠️ headings       "Color" found               warning      │ │
│  │ ⚠️ headings       "Typography" found          warning      │ │
│  │ ⚠️ headings       "Animation" found           warning      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Artifacts Produced                                              │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 📄 DESIGN-RESEARCH.md   sha256:a3f2b1...   4.2 KB         │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  [View Prompt Packet]  [View Raw Output]  [View Artifact]       │
│  [Rerun This Gate]     [Skip Gate]        [View Diff]           │
│                                                                  │
│  ── Attempt History ──                                           │
│  Attempt 1: ❌ FAILED — MISSING_ARTIFACT (DESIGN-RESEARCH.md)   │
│  Attempt 2: ✅ PASSED — all validations clear                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Prompt Packet Viewer (Modal)

Shows exactly what was sent to the model. Critical for debugging.

```
┌─────────────────────────────────────────────────────────────────┐
│  Prompt Packet — G4: Design Research (Attempt 2)                 │
│                                                        [Copy]    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  System Prompt (from ui-ux-design-expert.md):                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ You are a world-class designer and UI/UX expert with       │ │
│  │ 15+ years of experience crafting visual identities for     │ │
│  │ editorial publications...                                   │ │
│  │ [2,340 tokens]                                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Gate Instructions:                                              │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Gate 4: Design Research                                     │ │
│  │ Conduct thorough design research for this visual essay.     │ │
│  │ Derive a unique color palette, typography stack, and        │ │
│  │ animation philosophy from the subject matter itself.        │ │
│  │                                                             │ │
│  │ Required output: DESIGN-RESEARCH.md                         │ │
│  │ Must include sections: Color, Typography, Animation         │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Context (previous gate outputs):                                │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Attached: G1-INTAKE.md, research/CONCEPTS.md, spec.md      │ │
│  │ [18,420 tokens total]                                       │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Total tokens sent: 20,760                                       │
│                                                          [Close] │
└─────────────────────────────────────────────────────────────────┘
```

### Raw Output Viewer (Modal)

Shows exactly what the model returned.

```
┌─────────────────────────────────────────────────────────────────┐
│  Raw Output — G4: Design Research (Attempt 2)                    │
│  Model: claude-opus-4   Tokens: 3,840   Duration: 38s  [Copy]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  # Design Research Report: Serendipity                           │
│                                                                  │
│  ## Visual Archaeology Findings                                  │
│                                                                  │
│  **Primary materials:** Ink, parchment, manuscript pages,        │
│  Persian textiles, maritime navigation instruments, library      │
│  card catalogs, letterpress type...                              │
│                                                                  │
│  ## Color Palette                                                │
│                                                                  │
│  - Primary: #2C1810 (aged manuscript brown)                      │
│  - Secondary: #0F4C75 (Persian blue)                             │
│  - Accent: #D4A574 (parchment gold)                              │
│  - Background: #0a0a0f (deep darkness)                           │
│  ...                                                             │
│                                                                  │
│                                                          [Close] │
└─────────────────────────────────────────────────────────────────┘
```

### Diff View (Modal)

When a gate is rerun, shows what changed between attempts.

```
┌─────────────────────────────────────────────────────────────────┐
│  Diff — G4: Design Research (Attempt 1 → Attempt 2)              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  DESIGN-RESEARCH.md                                              │
│                                                                  │
│  + ## Visual Archaeology Findings        (added in attempt 2)    │
│  + **Primary materials:** Ink, parchment...                      │
│                                                                  │
│    ## Color Palette                      (unchanged)             │
│    - Primary: #2C1810                                            │
│  - - Secondary: #1A5276                  (changed)               │
│  + - Secondary: #0F4C75                                          │
│                                                                  │
│  + ## Animation Philosophy               (added in attempt 2)    │
│  + - Overall tempo: medium-slow                                  │
│  + - Reveal style: page-turn dissolves                           │
│                                                                  │
│                                                          [Close] │
└─────────────────────────────────────────────────────────────────┘
```

---

## Failure Analysis View

When a gate fails, the run pauses and this view helps diagnose why:

```
┌─────────────────────────────────────────────────────────────────┐
│  ⚠️  Run Paused — Gate G5 Failed                                 │
│                                                                  │
│  Fail Codes:                                                     │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ ❌ MISSING_ARTIFACT                                        │ │
│  │    Expected: page.tsx                                       │ │
│  │    Not found in model output                                │ │
│  │                                                             │ │
│  │ ❌ VALIDATION_FAILED                                        │ │
│  │    Check: file_contains "export default"                    │ │
│  │    Result: file does not exist, cannot check contents       │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Attempt History:                                                │
│  Attempt 1: ❌ MISSING_ARTIFACT (page.tsx not produced)          │
│  Attempt 2: ❌ MISSING_ARTIFACT (model produced page.jsx not .tsx)│
│  Attempt 3: ❌ Budget exhausted (3/3 attempts)                   │
│                                                                  │
│  Actions:                                                        │
│  [🔄 Rerun with same model]                                     │
│  [🔄 Rerun with different model ▼]                               │
│  [⏭️  Skip this gate]                                            │
│  [✅ Override as passed]                                         │
│  [🛑 Cancel run]                                                 │
│                                                                  │
│  [📋 View Prompt Packet]  [📄 View Raw Output]                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Cost Tracking View (`/admin/runs/:id` cost tab)

Per-run cost breakdown with model attribution:

```
┌─────────────────────────────────────────────────────────────────┐
│  Cost Breakdown — Serendipity Etymology                          │
│  Total: $4.22   Tokens: 186K in / 42K out                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  By Gate:                                                        │
│  G1  Intent Parsing      claude-haiku    $0.01  ░               │
│  G2  Source Research      o3             $0.85  ████████         │
│  G3  Source Verification  o3-mini        $0.12  █                │
│  G4  Design Research      claude-opus    $0.80  ████████         │
│  G5  Narrative Drafting   claude-opus    $1.92  ███████████████  │
│  G5  Output Formatting    claude-sonnet  $0.32  ███              │
│  G6  QA Verification      claude-sonnet  $0.20  ██               │
│                                                                  │
│  By Model:                                                       │
│  claude-opus-4:    $2.72  (64%)                                  │
│  o3:               $0.85  (20%)                                  │
│  claude-sonnet-4:  $0.52  (12%)                                  │
│  o3-mini:          $0.12  (3%)                                   │
│  claude-haiku:     $0.01  (1%)                                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## System Health View (`/admin` or `/admin/health`)

Aggregated metrics across all runs:

### Gate Reliability Matrix

Shows which gates fail most often and which models have the best pass rates:

```
                    claude-opus  claude-sonnet  o3      gpt-5.3
G1 Intake           100%         100%          100%    —
G2 Research          95%          88%           92%    85%
G3 Spec              98%          90%           —      —
G4 Design            85%          72%           —      —
G5 Production        70%          55%           —      60%
G6 Citation Audit    92%          88%           90%    —
G7 Scroll Cert       88%          80%           —      —
```

This matrix directly answers: "Which gates have reliability problems?" and "Which model is best for each gate?"

### Error Frequency

```
Top fail codes (last 30 days):
1. MISSING_ARTIFACT      — 23 occurrences (G5 mostly)
2. HEADING_MISMATCH      — 15 occurrences (G4, G6)
3. VALIDATION_FAILED     — 12 occurrences (various)
4. TIMEOUT               — 4 occurrences (G5)
5. MODEL_ERROR           — 2 occurrences (API failures)
```

---

## Real-Time Updates Implementation

### Server-Sent Events (SSE)

SSE is simpler than WebSocket for this use case (server pushes to client, no bidirectional communication needed).

```typescript
// app/api/runs/[id]/stream/route.ts
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      // Subscribe to Supabase real-time changes on gate_executions
      const subscription = supabase
        .channel(`run-${params.id}`)
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'gate_executions',
          filter: `run_id=eq.${params.id}`
        }, (payload) => {
          const event = mapToSSEEvent(payload.new);
          controller.enqueue(encoder.encode(`event: ${event.type}\ndata: ${JSON.stringify(event.data)}\n\n`));
        })
        .subscribe();
      
      // Also listen for run-level changes
      supabase
        .channel(`run-status-${params.id}`)
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'runs',
          filter: `id=eq.${params.id}`
        }, (payload) => {
          if (payload.new.status === 'completed') {
            controller.enqueue(encoder.encode(`event: run_completed\ndata: ${JSON.stringify(payload.new)}\n\n`));
            subscription.unsubscribe();
            controller.close();
          }
        })
        .subscribe();
    }
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
}
```

### Alternative: Supabase Realtime (Client-Side)

If SSE via API routes proves unreliable on Vercel, use Supabase Realtime directly from the client:

```typescript
// In the React component
useEffect(() => {
  const channel = supabase
    .channel(`run-${runId}`)
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'gate_executions',
      filter: `run_id=eq.${runId}`
    }, handleGateUpdate)
    .subscribe();
  
  return () => { channel.unsubscribe(); };
}, [runId]);
```

This approach is simpler and avoids the Vercel function timeout issue entirely. The client subscribes directly to Supabase Realtime — no API route needed for streaming.

**Recommendation**: Use Supabase Realtime directly. It's built for this exact use case and removes the SSE complexity.

---

## Feature Priority

| Feature | Priority | Phase | Complexity |
|---------|----------|-------|------------|
| Gate timeline view | P0 | Phase 2 | Medium |
| Validation results display | P0 | Phase 2 | Low |
| Prompt packet viewer | P0 | Phase 2 | Low |
| Raw output viewer | P0 | Phase 2 | Low |
| Rerun failed gate | P0 | Phase 2 | Medium |
| Fail code display | P0 | Phase 2 | Low |
| Cost breakdown per run | P1 | Phase 2 | Low |
| Real-time gate updates | P1 | Phase 2 | Medium |
| Diff between attempts | P1 | Phase 3 | Medium |
| Gate reliability matrix | P1 | Phase 3 | Medium |
| System health dashboard | P2 | Phase 3 | Medium |
| Model comparison view | P2 | Phase 3 | High |
| Template creator UI | P2 | Phase 3 | High |
| Export/download run record | P3 | Phase 3 | Low |
