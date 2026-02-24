# Artifact Specification Standard

> Version: 1.0
> Created: February 24, 2026
> Status: Active

## Purpose

Every artifact (visual essay, brief, infographic) published on Esy carries a specification — structured metadata that describes what it is, how it was made, and what model produced it. This standard defines the required and optional fields, their semantics, and the constraints that the pipeline enforces.

The specification appears in the artifact's detail panel (the "spec card" rendered by `ArtifactDetailWrapper`) and is defined as the `ESSAY_META` object in each essay's `page.tsx`.

---

## Schema

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Artifact title. Displayed as the page heading. |
| `subtitle` | string | Secondary title line. Appears below the title. |
| `category` | string | Primary category (e.g., "Science", "History", "Education & Writing"). |
| `readTime` | string | Estimated reading time (e.g., "25 min"). |
| `sourceCount` | number | Total number of sources cited. |
| `sourceTier` | string | Source quality tier (e.g., "Tier-1" for peer-reviewed). |
| `sectionCount` | number | Number of major sections in the artifact. |
| `visualizationCount` | number | Number of data visualizations or interactive elements. |
| `designSystem` | string | Design approach (e.g., "Subject-derived", "Typographic"). |
| `published` | string | Publication date (e.g., "February 24, 2026"). |
| `model` | ModelId or string | Model that produced the artifact. Must be a registered model ID from `orchestration/models/registry.json`. Legacy essays may use display strings. |
| `template` | string | Production template used (e.g., "Visual Essay"). |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `subcategory` | string | Secondary category (e.g., "Physics" under "Science"). |
| `backLink` | string | URL path for the back button (default: `/essays`). |
| `backLabel` | string | Label for the back button (default: "Essays"). |
| `palette` | Array<{name, color}> | Named color palette used in the design system. |
| `visualizations` | Array<{name, type}> | List of visualizations with their implementation type. |
| `keySources` | string[] | Highlighted primary sources. |
| `citationFirst` | boolean | Whether the essay was written citation-first. |

---

## Model Field

The `model` field identifies which AI model produced the artifact. It should be a **model ID** from the model registry at `orchestration/models/registry.json`.

### Model IDs

Model IDs follow the pattern: `{family}-{subfamily}-{version}` (lowercase, hyphenated).

Examples:
- `claude-opus-4.6` — Claude Opus version 4.6 (Anthropic)
- `claude-sonnet-4.5` — Claude Sonnet version 4.5 (Anthropic)
- `gpt-5.2` — GPT version 5.2 (OpenAI)

### Resolution

The `ArtifactDetailWrapper` component resolves model IDs to human-readable labels at render time. `'claude-opus-4.6'` displays as "Claude Opus 4.6" in the spec panel.

For backward compatibility, unrecognized strings (e.g., `'Claude'` from legacy essays) are displayed as-is.

### Adding a New Model

1. Add an entry to `orchestration/models/registry.json`
2. The `ModelId` type in `src/lib/models/registry.ts` auto-derives from the JSON keys
3. Use the new ID in any essay's `ESSAY_META.model` field

---

## Pipeline Enforcement

The artifact specification is validated at multiple gates:

- **G5 (Content Complete)**: Validates that `page.tsx` exists with `ESSAY_META` and `ArtifactDetailWrapper`
- **G8 (Publication Certification)**: Cross-checks metadata completeness before publication

Future gates may validate that the `model` field matches a known registry ID.

---

## TypeScript Interface

The canonical TypeScript interface lives at `src/lib/artifact-spec/schema.ts`:

```typescript
import type { ModelId } from '@/lib/models/registry';

export interface ArtifactMeta {
  title: string;
  subtitle: string;
  category: string;
  subcategory?: string;
  readTime: string;
  sourceCount: number;
  sourceTier: string;
  sectionCount: number;
  visualizationCount: number;
  designSystem: string;
  published: string;
  model: ModelId | string;
  template: string;
  backLink?: string;
  backLabel?: string;
  palette?: Array<{ name: string; color: string }>;
  visualizations?: Array<{ name: string; type: string }>;
  keySources?: string[];
  citationFirst?: boolean;
}
```

---

## Migration

Existing essays with `model: 'Claude'` should be migrated to use specific model IDs (e.g., `'claude-opus-4.5'`). This is a gradual process — the system tolerates both formats.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-02-24 | Initial standard — schema definition, model registry integration, pipeline enforcement. |
