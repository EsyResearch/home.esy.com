# School Video Pages — Design System

> Last Updated: February 2026

## Overview

The `/school` section is Esy's video-first learning hub. Each page showcases a workflow template through a tutorial video paired with rich editorial content. The design prioritizes immersive video playback, scannable written content, and clear calls-to-action.

**Routes:**

| Route | Purpose |
|---|---|
| `/school` | Video index — featured video + grid of all tutorials |
| `/school/[slug]` | Video detail — player, workflow pipeline, editorial content, sidebar |

## Design Philosophy

1. **Video-first** — The player dominates the viewport on load. A full-width black theater frame eliminates distractions.
2. **Editorial content, not documentation** — Written content reads like a product blog post: active voice, short paragraphs, specific claims.
3. **Workflow visibility** — A visual pipeline component bridges the video and the written content, showing users what the workflow does at a glance.
4. **Light theme** — All school pages use `navyCalmLightTheme` for a clean, academic-yet-modern feel.

## Theme & Color Palette

All school pages use the **Navy Calm Light** theme:

| Token | Value | Usage |
|---|---|---|
| `bg` | `#F8FAFC` | Page background |
| `text` | `#0A2540` | Primary headings |
| `textSecondary` | `#475569` | Body text, metadata |
| `accent` | `#00A896` | Links, active elements, teal accents |
| `accentTint` | `rgba(0, 168, 150, 0.08)` | Tag backgrounds, subtle fills |
| `border` | `rgba(10, 37, 64, 0.08)` | Dividers, card borders |
| `surfaceElevated` | `#FFFFFF` | Cards, sidebar panels |
| `navBg` | `rgba(248, 250, 252, 0.85)` | Breadcrumb bar, blurred nav |
| `muted` | `#94A3B8` | Tertiary text, sublabels |
| `success` | `#10B981` | Success states (newsletter) |

## Page Architecture

### Video Detail Page (`/school/[slug]`)

```
┌──────────────────────────────────────────────┐
│  Navigation (fixed, light theme)             │
├──────────────────────────────────────────────┤
│  Breadcrumbs   Home > School > Video Title   │
├──────────────────────────────────────────────┤
│                                              │
│           ████████████████████████           │
│           ██   Mux Video Player  ██          │
│           ██   (black theater    ██          │
│           ██    frame, full-w)   ██          │
│           ████████████████████████           │
│                                              │
├──────────────────────────────────────────────┤
│  Newsletter Bar (full width)                 │
├──────────────────────────────────────────────┤
│                          │                   │
│  Title                   │  MORE VIDEOS      │
│  Date · Duration · Tags  │  ┌─────────────┐  │
│                          │  │ Related 1    │  │
│  Description paragraph   │  │ Related 2    │  │
│                          │  │ Related 3    │  │
│  ┌────────────────────┐  │  └─────────────┘  │
│  │ Workflow Pipeline   │  │                   │
│  │ ①→②→③→④→⑤→⑥      │  │  ┌─────────────┐  │
│  └────────────────────┘  │  │ Newsletter   │  │
│                          │  │ Signup       │  │
│  Editorial markdown      │  └─────────────┘  │
│  content with images     │                   │
│                          │   (sticky)        │
│  ┌────────────────────┐  │                   │
│  │ Try This Workflow   │  │                   │
│  │ CTA → /templates   │  │                   │
│  └────────────────────┘  │                   │
│                          │                   │
├──────────────────────────┴───────────────────┤
│  Footer                                      │
└──────────────────────────────────────────────┘
```

### Video Index Page (`/school`)

```
┌──────────────────────────────────────────────┐
│  Navigation (fixed, light theme)             │
├──────────────────────────────────────────────┤
│  Breadcrumbs   Home > School                 │
├──────────────────────────────────────────────┤
│  Hero Section                                │
│  "Workflow Tutorials"                        │
│  Subtitle                                    │
├──────────────────────────────────────────────┤
│  Featured Video Card (large, 2-col)          │
│  ┌──────────────┬───────────────────────┐    │
│  │  Thumbnail   │  Title · Duration     │    │
│  │              │  Description          │    │
│  │              │  Watch now →          │    │
│  └──────────────┴───────────────────────┘    │
├──────────────────────────────────────────────┤
│  All Tutorials (3-col grid)                  │
│  ┌──────┐  ┌──────┐  ┌──────┐               │
│  │ Card │  │ Card │  │ Card │               │
│  └──────┘  └──────┘  └──────┘               │
│  ┌──────┐  ┌──────┐  ┌──────┐               │
│  │ Card │  │ Card │  │ Card │               │
│  └──────┘  └──────┘  └──────┘               │
├──────────────────────────────────────────────┤
│  CTA Banner                                  │
├──────────────────────────────────────────────┤
│  Newsletter Section                          │
├──────────────────────────────────────────────┤
│  Footer                                      │
└──────────────────────────────────────────────┘
```

## Component Inventory

### Video Player

- **Component:** `src/components/School/VideoPlayer.tsx`
- **Player:** `@mux/mux-player-react`
- **Theater frame:** Full-width `#000` container, max-width 1200px inner
- **Player colors:** `primaryColor: #000000`, `secondaryColor: rgba(255,255,255,0.85)`, `accentColor: #00A896`
- **Placeholder:** Pure black with centered play icon when no `playbackId`

### Workflow Pipeline

- **Component:** `WorkflowPipeline` (inline in `/school/[slug]/client.tsx`)
- **Data source:** `stages` array on each `SchoolVideo` entry
- **Visual:** Numbered circles connected by horizontal lines; final stage gets solid teal fill
- **Container:** Rounded card with `surfaceElevated` background, "WORKFLOW PIPELINE" label
- **Mobile:** Horizontal scroll with `100px` min-width per stage

### Markdown Content

- **Component:** `src/components/SchoolArticle/EnhancedMarkdownRenderer.js`
- **Light variant:** Activated via `light` prop, applies `.markdownContainerLight` CSS class
- **CSS file:** `src/components/SchoolArticle/EnhancedMarkdownRenderer.module.css`

### Sidebar

- **Sticky behavior:** `position: sticky; top: 112px` on desktop, static on mobile/tablet
- **Contents:** Related videos list + newsletter signup widget
- **Width:** Fixed 360px column on desktop grid

### Breadcrumbs

- **Component:** `src/components/Breadcrumbs.tsx` (site-wide shared)
- **Container:** Blurred nav background with bottom border, padded for header clearance

### Newsletter

- **Bar:** `src/components/School/SchoolNewsletterBar.tsx` — full-width below video
- **Sidebar widget:** `SidebarNewsletter` (inline in `/school/[slug]/client.tsx`) — compact email form

## Typography (Light Variant)

Defined in `.markdownContainerLight` at the end of `EnhancedMarkdownRenderer.module.css`.

| Element | Font | Size | Weight | Color | Margin |
|---|---|---|---|---|---|
| h1 | Literata | 1.75rem | 700 | `#0A2540` | 2rem top, 1rem bottom |
| h2 | Literata | 1.375rem | 600 | `#0A2540` | 2rem top, 0.75rem bottom |
| h3 | Inter | 1.125rem | 600 | `#0A2540` | 1.25rem top, 0.5rem bottom |
| h4 | Inter | 1rem | 600 | `#0A2540` | 1rem top, 0.5rem bottom |
| p | Inter | 1rem | 400 | `#475569` | 0.75rem vertical |
| li | Inter | 1rem | 400 | `#475569` | 0.35rem vertical |
| blockquote | Inter | 1rem | 400 | `#475569` | italic, teal left border |

### CSS Cascade Note

The light variant rules **must** appear after the dark theme base rules in the CSS file. Both use `!important`, so source order determines the winner when specificity is equal. Moving the light block above the dark rules will cause the dark theme's larger margins and font sizes to leak through.

## Markdown Content Structure

Each video's `content` field in `src/data/school-videos.ts` follows this editorial structure:

1. **Opening paragraph** — Engaging hook about the problem the workflow solves (2-3 sentences, no heading)
2. **Hero image** — Relevant Unsplash photo via `![alt](url)`
3. **"What You'll Create"** — h2 + blockquote describing the output artifact
4. **"How the Workflow Runs"** — h2 + numbered h3 stages (matching the `stages` array), 1-2 sentences each
5. **Second image** — Different contextual photo
6. **"Perfect For"** — h2 + bullet list of use cases
7. **"Sample Artifacts"** — h2 + bold titles with descriptions
8. **Closing CTA** — Inline link to `/templates/{slug}`

### Visual Treatments

| Element | Style |
|---|---|
| Images | Full width, 12px border-radius, subtle shadow |
| Blockquotes | Teal left border (3px `#00A896`), light teal bg, rounded, italic |
| h2 headings | Clean navy text, no border/background decoration |
| Lists | Teal disc markers via `::marker` |
| Links | Teal (`#00A896`), underline on hover |
| `<hr>` | Centered teal dot pattern (radial-gradient) |

## Responsive Breakpoints

Breakpoint detection via `useBreakpoint()` hook:

| Breakpoint | Width | Layout Changes |
|---|---|---|
| Mobile | < 640px | Single column, stacked sidebar, smaller fonts, 72px top padding |
| Tablet | 640–1023px | Single column, 1.5rem gutters |
| Desktop | ≥ 1024px | 2-column grid (1fr + 360px sidebar), 96px top padding |

### Key Responsive Behaviors

- **Video player:** Always full width, aspect-ratio maintained
- **Featured card:** Stacks vertically on compact viewports
- **Video grid:** 1 col (mobile) → 2 col (tablet) → 3 col (desktop)
- **Sidebar:** Moves below main content on mobile/tablet, becomes sticky on desktop
- **Workflow pipeline:** Horizontal scroll on mobile with 100px minimum stage width

## Data Model

```typescript
interface WorkflowStage {
  label: string;    // "Intake", "Research", etc.
  sublabel: string; // "Topic & stance", "Evidence & counterargs", etc.
}

interface SchoolVideo {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  durationSeconds: number;
  publishedAt: string;
  muxPlaybackId: string;
  thumbnailUrl?: string;
  transcript?: string;
  content: string;           // Markdown editorial content
  tags: string[];
  relatedSlugs: string[];
  templateSlug?: string;     // Links to /templates/{slug}
  stages?: WorkflowStage[];  // Visual pipeline data
}
```

**Data file:** `src/data/school-videos.ts`

All 7 entries correspond to Esy's workflow templates defined in `src/lib/templates/data.ts`:

| Video Slug | Template Slug | Stages |
|---|---|---|
| `build-research-infographic` | `research-infographic` | 5 (Intake → Artifact) |
| `write-argumentative-essay` | `argumentative-essay-builder` | 6 |
| `create-analytical-essay` | `analytical-essay` | 6 |
| `write-expository-essay` | `expository-essay` | 6 |
| `tell-your-narrative` | `narrative-essay` | 6 |
| `from-question-to-research-paper` | `research-paper` | 6 |
| `college-application-essay-guide` | `college-application-essay` | 6 |

## File Map

```
src/
├── app/school/
│   ├── page.tsx              # Index route (server component, metadata)
│   ├── client.tsx            # Index client component (hero, grid)
│   └── [slug]/
│       ├── page.tsx          # Detail route (server component, metadata, static params)
│       └── client.tsx        # Detail client component (player, pipeline, content, sidebar)
├── components/School/
│   ├── VideoPlayer.tsx       # Mux player wrapper + placeholder
│   ├── VideoCard.tsx         # Thumbnail card for grids
│   ├── RelatedVideos.tsx     # Sidebar related videos list
│   ├── TranscriptToggle.tsx  # Expandable transcript panel
│   ├── SchoolNewsletterBar.tsx  # Full-width newsletter bar
│   └── SchoolNewsletter.tsx  # Newsletter section (index page)
├── components/SchoolArticle/
│   ├── EnhancedMarkdownRenderer.js      # Markdown → React renderer
│   └── EnhancedMarkdownRenderer.module.css  # Dark + light variant styles
├── components/Breadcrumbs.tsx  # Shared breadcrumb component
└── data/
    └── school-videos.ts      # Video data + utility functions
```

## Header/Footer Theme Integration

The navigation and footer components detect school pages and apply the light theme:

```typescript
// In navigation.tsx and footer.tsx
const isSchoolPage = normalizedPath.startsWith('/school/');
if (isSchoolPage) {
  // Apply navyCalmLightTheme
}
```

Default fallback for unrecognized paths is `navyCalmDarkTheme`.

## Design Decisions & Rationale

### Why full-width black video frame?
Creates an immersive "theater" experience that separates the video from the light page content. The contrast draws the eye to the player on load.

### Why no left border on h2 headings?
Early iterations added a teal left border + tinted background to all h2 elements. Combined with blockquotes (which also use a teal left border), this created visual repetition. The fix: h2 headings use clean navy text only; blockquotes keep the teal accent border as a distinguishing visual cue.

### Why light variant CSS at end of file?
Both dark and light rules use `!important`. When specificity is equal, CSS cascade order (last wins) determines the active rule. Placing the light variant after the dark base ensures it overrides correctly.

### Why static newsletter placement (not animated)?
Early iterations used `IntersectionObserver` to fade in the sidebar newsletter below the fold. This caused layout shifts and "popping" that felt jarring regardless of animation tuning. Static placement at the bottom of the sidebar is predictable and avoids content shift.

### Why editorial content instead of documentation?
School pages serve as marketing + education. Users land here from search or social. Dry documentation converts poorly — editorial content with images, use cases, and sample outputs builds confidence and drives template adoption.
