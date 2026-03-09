# Inline Intelligence — Highlight-to-Insight System

**Last Updated:** March 2026

A highlight-to-insight interaction for visual essay detail pages. Users select text in any essay, an "Explain" button appears, and on click an inline panel slides down below the containing paragraph with a contextual AI-generated insight.

---

## Architecture

```
User highlights text on esy.com
        │
        ▼
Floating "Explain" button appears
        │
        ▼
Check in-memory pre-computed data  ──── Hit ──── Show panel instantly (zero cost)
        │
       Miss
        │
        ▼
POST api.esy.com/v1/insights
        │
        ▼
Redis cache check (Railway) ──── Hit ──── Log to Neon, return cached
        │
       Miss
        │
        ▼
Claude Haiku (or Sonnet for "Go deeper")
        │
        ▼
Store in Redis (90-day TTL) + log to Neon + write to client session cache
        │
        ▼
Show InlineInsightPanel below paragraph
```

### Infrastructure

- **esy.com** — Next.js on Netlify. Frontend only. Pre-computed JSON in `/public/insights/`.
- **api.esy.com** — Python/FastAPI on Railway. `POST /v1/insights` endpoint.
- **Redis** — Railway Redis, same private network. Ephemeral response cache + rate limiting + cost ceiling.
- **Neon Postgres** — `intelligence_requests` analytics table. Append-only, never on the hot path.
- **LLM** — Anthropic API. Haiku for standard, Sonnet for "Go deeper."

---

## Two-Tier Caching + Session Write-Back

### Tier 1: Pre-Computed JSON (static, client-side)

Each essay can have a pre-computed JSON file at `/public/insights/{slug}.json`:

```json
{
  "terms": {
    "KNM-WT 15000": "The catalog number for the Turkana Boy skeleton...",
    "Kamoya Kimeu": "The Kenyan fossil hunter who discovered..."
  },
  "passages": {}
}
```

Loaded once on page mount via `fetch('/insights/{slug}.json')`, stored in an in-memory `Map`. If the file doesn't exist (404), that's fine — the map stores `null` and all lookups fall through to the API.

### Tier 2: On-Demand API (server-side, Redis-cached)

Cache key: `intel:{slug}:{sha256(normalized_text)}`. TTL: 90 days. Standard and deep insights stored in the same key as separate fields.

### Session Write-Back

After the API returns an insight, the text and response are written back into the in-memory pre-computed data (`addToSession`). This means:

- First highlight of "thermoregulation" → API call → insight generated
- Second highlight of "thermoregulation" (same page session) → **in-memory hit, zero network**

This closes the loop between the two tiers within a single page session.

---

## Term Matching Strategy

The pre-computed lookup uses **bidirectional substring matching**, not exact string comparison:

```typescript
for (const [term, insight] of Object.entries(insights.terms)) {
  if (normalized.includes(term.toLowerCase()) || term.toLowerCase().includes(normalized)) {
    return insight;
  }
}
```

This means:

| User selects | Stored term | Match? | Why |
|---|---|---|---|
| "Kamoya Kimeu" | "Kamoya Kimeu" | Yes | Exact |
| "Kamoya Kimeu discovered the skeleton" | "Kamoya Kimeu" | Yes | Selection contains term |
| "Kimeu" | "Kamoya Kimeu" | Yes | Term contains selection |
| "the great fossil hunter" | "Kamoya Kimeu" | No | No substring overlap |

**Session write-back entries** are keyed by the full selected text. Subsequent partial re-selections still match via the bidirectional check.

**Known trade-off:** A very long stored string could match a short unrelated selection by coincidence. In practice this is rare because pre-computed terms are short and specific. If false positives become a problem, add a minimum overlap threshold (e.g., shorter string must be at least 60% of the longer one).

---

## Abuse Protection (IP-Based, 3 Layers)

All layers use Railway Redis. No auth required — essays are public.

### Layer 1: IP Rate Limiting

Sliding window via Redis sorted sets.

| Tier | Limit | Window |
|---|---|---|
| Burst | 10 requests | per minute |
| Sustained | 60 requests | per hour |
| Daily | 200 requests | per day |

Returns `429 Too Many Requests` with `Retry-After` header. No LLM call, no cost.

### Layer 2: Request Validation

- `selected_text`: 10–1000 characters
- `surrounding_context`: 20–3000 characters
- `selected_text` must be a substring of `surrounding_context`
- `content_type` must be a known value

Returns `400 Bad Request`. Blocks garbage before it touches Redis or the LLM.

### Layer 3: Global Daily Cost Ceiling

- Redis counter: `INCRBYFLOAT cost:{date} {cents}`
- Default cap: $5/day (configurable via `DAILY_COST_CEILING_CENTS` env var)
- When ceiling is hit: cache hits still work, cache misses return 503
- Resets at UTC midnight (Redis key TTL)

Worst-case monthly spend: $150. Normal usage: pennies.

---

## Frontend Components

All live in `src/components/InlineIntelligence/`:

| File | Purpose |
|---|---|
| `types.ts` | Shared TypeScript types |
| `useSelectionIntelligence.ts` | Core hook: selection detection, context extraction, API calls, session cache |
| `FloatingActionButton.tsx` | Teal "Explain" pill near the selection |
| `InlineInsightPanel.tsx` | Roll-down panel injected below the paragraph via DOM insertion |
| `InlineIntelligence.tsx` | Orchestrator, rendered in `ArtifactDetailWrapper` |
| `InlineIntelligence.css` | All styles including mobile breakpoints |

Supporting utilities in `src/lib/insights/`:

| File | Purpose |
|---|---|
| `api.ts` | Fetch wrapper for `POST api.esy.com/v1/insights` |
| `precomputed.ts` | Loader, fuzzy term matcher, session write-back |

### Integration Point

`InlineIntelligence` is rendered inside `ArtifactDetailWrapper` (`src/components/ArtifactDetail/ArtifactDetail.jsx`) in both artifact and immersive modes. It listens for selections within `#artifact-essay-content`. Every essay that uses `ArtifactDetailWrapper` gets inline intelligence automatically.

---

## Backend (api.esy.com)

| File | Purpose |
|---|---|
| `app/api/v1/insights.py` | POST endpoint with rate limiting and validation |
| `app/schemas/insights.py` | Pydantic request/response models |
| `app/services/insights_service.py` | Cache check → LLM call → cache store → analytics log |
| `app/services/anthropic_client.py` | Anthropic SDK wrapper, model routing, cost estimation |
| `app/services/rate_limiter.py` | 3-tier rate limiting + cost ceiling |
| `app/models/intelligence_request.py` | SQLAlchemy model for analytics table |

### Environment Variables (Railway)

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Anthropic API key |
| `REDIS_URL` | Auto-provided by Railway Redis service |
| `DAILY_COST_CEILING_CENTS` | Cost cap in cents (default: 500 = $5/day) |
| `CORS_ORIGINS` | Must include `https://esy.com` |

---

## Generating Pre-Computed Insights

```bash
# Single essay
ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-insights-json.mjs turkana-boy

# All essays with research packages
ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-insights-json.mjs --all

# Dry run (placeholder insights, no API key needed)
node scripts/generate-insights-json.mjs turkana-boy
```

The script reads `FIGURES.md`, `CITATIONS.md`, and `SYNTHESIS.md` from each essay's `research/` directory, extracts named entities and technical terms, generates insights via Haiku, and writes to `/public/insights/{slug}.json`.

---

## Model Selection

| Tier | Model | Max Tokens | Use Case |
|---|---|---|---|
| Standard | Claude 3.5 Haiku | 400 | Initial "Explain" requests |
| Deep | Claude 3.5 Sonnet | 800 | "Go deeper" escalation |

The "Go deeper" button appears on standard insights. When clicked, the existing insight stays visible while the deeper response loads below it.
