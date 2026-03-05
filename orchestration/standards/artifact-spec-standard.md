# Artifact Specification Standard

> Version: 2.0
> Created: February 24, 2026
> Updated: March 1, 2026
> Status: Active

## Purpose

Every artifact (visual essay, brief, infographic) published on Esy carries a specification — structured metadata that describes what it is, how it was made, and who made it. This standard defines the required and optional fields, their semantics, and the constraints that the pipeline enforces.

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
| `authorship` | ArtifactAuthorship | Authorship provenance (see [Authorship](#authorship) below). When absent, defaults to `{ mode: 'ai-directed', model: meta.model }`. |
| `backLink` | string | URL path for the back button (default: `/essays`). |
| `backLabel` | string | Label for the back button (default: "Essays"). |
| `palette` | Array<{name, color}> | Named color palette used in the design system. |
| `visualizations` | Array<{name, type}> | List of visualizations with their implementation type. |
| `keySources` | string[] | Highlighted primary sources. |
| `citationFirst` | boolean | Whether the essay was written citation-first. |

---

## Authorship

The `authorship` field describes who made the artifact and what role AI played in its creation. It replaces the flat `model` field as the primary provenance mechanism.

### Authorship Modes

Every artifact falls into one of three authorship modes:

| Mode | Meaning | Spec Panel Display |
|------|---------|-------------------|
| `'human'` | A named person wrote the essay. No meaningful AI involvement. | **Author:** [Name] |
| `'ai-assisted'` | A named person wrote the essay. AI assisted with specific contributions. | **Author:** [Name] + **AI Assist:** [Model] · [Contributions] |
| `'ai-directed'` | AI produced the artifact under human editorial direction (the current pipeline). | **Model:** [Model label] |

The naming encodes directionality: in `ai-assisted`, the human is the author and AI is the tool. In `ai-directed`, AI is the production engine and the human is the director.

### ArtifactAuthorship Schema

```typescript
type AuthorshipMode = 'human' | 'ai-assisted' | 'ai-directed';

type AiContribution =
  | 'research'
  | 'code'
  | 'editing'
  | 'fact-checking'
  | 'visualization';

interface ArtifactAuthor {
  name: string;
  role?: string;   // e.g., "Editor-in-Chief", "Staff Writer"
}

interface ArtifactAuthorship {
  mode: AuthorshipMode;
  author?: ArtifactAuthor;       // Required for 'human' and 'ai-assisted'
  model?: ModelId | string;      // Required for 'ai-assisted' and 'ai-directed'
  aiContributions?: AiContribution[];  // What AI helped with (ai-assisted only)
}
```

### Examples

**Human-written essay (no AI):**
```typescript
authorship: {
  mode: 'human',
  author: { name: 'Zev Uhuru', role: 'Editor-in-Chief' },
}
```

**Human-written with AI assistance:**
```typescript
authorship: {
  mode: 'ai-assisted',
  author: { name: 'Zev Uhuru', role: 'Editor-in-Chief' },
  model: 'claude-opus-4.6',
  aiContributions: ['research', 'visualization', 'fact-checking'],
}
```

**AI-directed (current default for pipeline-produced essays):**
```typescript
authorship: {
  mode: 'ai-directed',
  model: 'claude-opus-4.6',
}
```

### AI Contributions

When an essay is `ai-assisted`, the `aiContributions` array describes what AI helped with. Valid values:

| Contribution | Meaning |
|-------------|---------|
| `'research'` | AI assisted with source discovery, synthesis, or research packages |
| `'code'` | AI wrote visualization code, components, or CSS |
| `'editing'` | AI helped with prose editing, structure, or tone |
| `'fact-checking'` | AI verified claims, dates, or attributions |
| `'visualization'` | AI designed or implemented data visualizations |

These render in the spec panel as a comma-separated list after the model name (e.g., "Claude Opus 4.6 · Research, Visualization").

### Backward Compatibility

The flat `model` field remains on `ArtifactMeta` for backward compatibility. When `authorship` is absent, `ArtifactDetailWrapper` derives it as:

```typescript
{ mode: 'ai-directed', model: meta.model }
```

This means every existing essay works without modification. The `model` field will be gradually superseded by `authorship.model` but is not deprecated yet.

---

## Model Field (Legacy)

The `model` field identifies which AI model produced the artifact. It should be a **model ID** from the model registry at `orchestration/models/registry.json`. For new essays, prefer setting `authorship.model` instead.

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
3. Use the new ID in any essay's `ESSAY_META.authorship.model` or `ESSAY_META.model` field

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

export type AuthorshipMode = 'human' | 'ai-assisted' | 'ai-directed';

export type AiContribution =
  | 'research'
  | 'code'
  | 'editing'
  | 'fact-checking'
  | 'visualization';

export interface ArtifactAuthor {
  name: string;
  role?: string;
}

export interface ArtifactAuthorship {
  mode: AuthorshipMode;
  author?: ArtifactAuthor;
  model?: ModelId | string;
  aiContributions?: AiContribution[];
}

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
  authorship?: ArtifactAuthorship;
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

### Phase 1 (Current)
- The `authorship` field is optional. All existing essays work without changes — `ArtifactDetailWrapper` derives `{ mode: 'ai-directed', model: meta.model }` when `authorship` is absent.
- New human-written or AI-assisted essays should set `authorship` explicitly.

### Phase 2 (Future)
- Existing essays with `model: 'Claude'` should be migrated to use specific model IDs (e.g., `'claude-opus-4.5'`).
- Existing AI-directed essays can optionally add `authorship: { mode: 'ai-directed', model: '...' }` for explicitness.
- The flat `model` field will eventually be deprecated in favor of `authorship.model`.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 2.0 | 2026-03-01 | Authorship system — `authorship` field with three modes (`human`, `ai-assisted`, `ai-directed`), `AiContribution` enum, backward-compatible rendering in spec panel. |
| 1.0 | 2026-02-24 | Initial standard — schema definition, model registry integration, pipeline enforcement. |
