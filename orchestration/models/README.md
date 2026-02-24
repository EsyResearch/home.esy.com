# Model Registry

Canonical registry of AI models used to produce Esy artifacts.

## Files

| File | Purpose |
|------|---------|
| `registry.json` | Source of truth for all model IDs, labels, vendors, and statuses |
| `src/lib/models/registry.ts` | Runtime adapter — imports the JSON and exports typed functions for React components |

## registry.json Format

```json
{
  "models": {
    "claude-opus-4.6": {
      "label": "Claude Opus 4.6",
      "vendor": "Anthropic",
      "family": "Claude",
      "subfamily": "Opus",
      "version": "4.6",
      "status": "recommended"
    }
  }
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| key | string | Model ID — `{family}-{subfamily}-{version}`, lowercase, hyphenated |
| `label` | string | Human-readable display name shown in artifact spec panels |
| `vendor` | string | Model vendor (e.g., "Anthropic", "OpenAI") |
| `family` | string | Model family (e.g., "Claude", "GPT") |
| `subfamily` | string or null | Sub-family within the family (e.g., "Opus", "Sonnet", "Haiku") |
| `version` | string | Version identifier (e.g., "4.6", "5.2", "4-turbo") |
| `status` | string | One of: `recommended`, `supported`, `legacy`, `deprecated` |

### Status Meanings

| Status | Meaning |
|--------|---------|
| `recommended` | Current production version. New artifacts should use this. |
| `supported` | Previous stable version. Existing artifacts are fine. |
| `legacy` | Maintained for compatibility. Should not be used for new work. |
| `deprecated` | Scheduled for removal. Migrate existing artifacts away. |

## Adding a New Model

1. Add an entry to `registry.json`:
   ```json
   "claude-opus-4.7": {
     "label": "Claude Opus 4.7",
     "vendor": "Anthropic",
     "family": "Claude",
     "subfamily": "Opus",
     "version": "4.7",
     "status": "recommended"
   }
   ```
2. Update the previous version's status (e.g., `claude-opus-4.6` from `recommended` to `supported`)
3. The `ModelId` TypeScript type auto-derives from the JSON keys — no code changes needed
4. Use the new ID in essay `ESSAY_META`: `model: 'claude-opus-4.7'`

## How the Runtime Adapter Works

`src/lib/models/registry.ts` imports `registry.json` and exports:

- `ModelId` — union type of all model ID strings
- `resolveModelLabel(idOrLabel)` — takes a model ID or legacy string, returns the display label
- `isModelId(value)` — type guard to check if a string is a registered model ID
- `getModelEntry(id)` — returns the full model entry for a given ID
- `getAllModelIds()` — returns all registered model IDs

The `ArtifactDetailWrapper` component uses `resolveModelLabel()` to display the model name in the spec panel. Legacy essays with `model: 'Claude'` are displayed as-is until migrated.

## Relationship to Other Model Files

| File | Purpose | Audience |
|------|---------|----------|
| `orchestration/models/registry.json` | Model ID registry | Pipeline, runtime, documentation |
| `src/lib/models/data.ts` | Rich model page data (strengths, limitations, templates) | `/models` reference pages |
| `src/lib/models/types.ts` | Type definitions for model pages | `/models` reference pages |
| `orchestration/agents-runtime/routing-table.json` | Agent-to-model routing for pipeline execution | Pipeline runner |

The registry is the lean lookup. The other files serve their own specific purposes and are not affected by registry changes.
