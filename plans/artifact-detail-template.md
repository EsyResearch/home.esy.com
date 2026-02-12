# ArtifactDetailTemplate — Architectural Plan

> Created: February 11, 2026
> Status: Active
> Component: `src/components/ArtifactDetailTemplate/`

## Overview

A premium template detail page for workflow-type templates (infographics, academic essays, visual essays). Replaces the legacy `TemplateDetailClient` (dark bg, violet accents) for any template with `isWorkflow: true`.

Uses the **Navy Calm Light Theme** exclusively: `#FFFFFF` background, `#0A2540` text, `#00A896` teal accent.

## Naming Rationale

`ArtifactDetailTemplate` — reads as "this is an Artifact Detail page, and this component is its Template." Follows patterns like `ProductDetailPage`, `OrderDetailView`. The noun being detailed (`Artifact`) comes first, then the view type (`Detail`), then the role (`Template`).

- Component: `ArtifactDetailTemplate`
- CSS namespace: `.adt-`
- Directory: `src/components/ArtifactDetailTemplate/`

## Architecture

```
src/components/ArtifactDetailTemplate/
├── ArtifactDetailTemplate.tsx   # Full page component
├── ArtifactDetailTemplate.css   # Scoped styles (.adt-*)
├── WorkflowCircuit.tsx          # SVG pipeline animation
├── types.ts                     # Component-level types
└── index.ts                     # Barrel exports
```

### Data Flow

```
src/app/templates/[slug]/page.tsx
  ├── getTemplateBySlug(slug)           → Template (from src/lib/templates/data.ts)
  ├── if template.isWorkflow:
  │     └── <ArtifactDetailTemplate>
  │           ├── Hero (title, badges, CTAs)
  │           ├── <WorkflowCircuit stages={template.workflowStages} />
  │           ├── Input/Output Spec Section
  │           └── Related Templates
  └── else:
        └── <TemplateDetailClient>       (legacy prompt-based templates)
```

## WorkflowCircuit — Design Spec

### Visual Language

Inspired by but independent from `CircuitCanvas`. The WorkflowCircuit is a data-driven, horizontal pipeline visualization that accepts arbitrary stages.

| Element | Spec |
|---------|------|
| **Nodes** | Rounded rectangles, white fill `#FFFFFF`, stroke `rgba(10, 37, 64, 0.1)`, `rx="8"` |
| **Trace Lines** | Teal gradient from `rgba(0, 168, 150, 0.2)` to `rgba(0, 168, 150, 0.35)`, 2px stroke |
| **Energy Ball** | `#00A896`, 6px radius, `feGaussianBlur` glow, flows left-to-right through nodes |
| **Check Marks** | `#2A9D8F`, appear in each node as ball passes, `checkGlow` filter |
| **Output Pulse** | Final node gets accent glow ring on ball arrival |
| **Grid Backdrop** | Navy lines at 3% opacity, 26px spacing |
| **Fonts** | Inter for all labels (UI chrome) |

### Layout

- **Desktop** (>=768px): Horizontal. Nodes arranged left-to-right with trace lines connecting them.
- **Mobile** (<768px): Vertical. Nodes stacked top-to-bottom.

### Animation

- Continuous loop, 5-6s cycle duration
- Started by `IntersectionObserver` at 20% threshold
- `requestAnimationFrame` for smooth 60fps rendering
- `prefers-reduced-motion`: Static completed state (all checks shown, no moving ball)

### Props

```typescript
interface WorkflowCircuitProps {
  stages: WorkflowStage[];
  className?: string;
}
```

## ArtifactDetailTemplate — Section Spec

### 1. Breadcrumb
Templates > {Category} > {Title}

### 2. Hero
- Title: `font-family: Literata`, `font-size: 2.5rem`, `color: #0A2540`
- Description: `font-family: Inter`, `color: rgba(10, 37, 64, 0.7)`
- Badges: category, output type (e.g., "Infographic"), estimated time
- Primary CTA: "Run in Esy" → `app.esy.com?workflow={slug}`
- Secondary CTA: "View Sample" or "Explore Artifacts"

### 3. WorkflowCircuit Section
- Eyebrow: "How this workflow runs"
- Centered within max-width container (1200px)
- Subtle elevated surface background `#F8FAFC`

### 4. What You Provide / What You Get
- Two-column layout on desktop, stacked on mobile
- Left: Input requirements (bulleted, with icons)
- Right: Output specs with format badges (PNG, SVG, PDF)

### 5. Related Templates
- 3-column grid on desktop
- Reuses existing `TemplateCard` component

## Theme Tokens

```typescript
const theme = {
  bg: '#FFFFFF',
  elevated: '#F8FAFC',
  surface: '#F1F5F9',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  faint: 'rgba(10, 37, 64, 0.35)',
  border: 'rgba(10, 37, 64, 0.08)',
  divider: 'rgba(10, 37, 64, 0.05)',
  accent: '#00A896',
  accentLight: 'rgba(0, 168, 150, 0.08)',
  accentBorder: 'rgba(0, 168, 150, 0.2)',
};
```

## Type Extensions

### WorkflowStage (new)
```typescript
interface WorkflowStage {
  id: string;
  label: string;
  sublabel?: string;
  isFinal?: boolean;
}
```

### Template (extended)
```typescript
// New optional fields added to existing Template interface
isWorkflow?: boolean;
workflowStages?: WorkflowStage[];
outputFormats?: string[];
estimatedTime?: string;
inputRequirements?: string[];
sampleArtifacts?: { title: string; description: string; }[];
engine?: string;
```

## Routing Logic

```typescript
// src/app/templates/[slug]/page.tsx
if (template.isWorkflow) {
  return <ArtifactDetailTemplate template={template} relatedTemplates={...} />;
} else {
  return <TemplateDetailClient template={template} ... />;
}
```

## Not in Scope

- Modifying `CircuitCanvas` or `HowItWorksSection`
- Building the actual infographic pipeline/orchestration
- Wiring live execution to `app.esy.com` (CTAs link to placeholder URLs)
- Additional workflow templates (only Research Infographic for initial build)

## Design Principles (per ui-ux-design-expert.md)

- 8px spacing grid for all layout decisions
- Maximum 3 font families: Literata (headings), Inter (body/UI)
- Content reading width: 680–720px for prose, up to 1200px for visualizations
- Touch targets: minimum 44x44px
- Color contrast: WCAG AA minimum
- Loading states for every async operation (skeleton, not spinner)
- No emojis in UI chrome
- Progressive disclosure: essential metadata visible, full specs on demand
