# CSS-TSX Binding Patterns Guide

> **Purpose**: Ensure CSS selectors correctly bind to TSX className attributes so design systems are actually rendered.
>
> **Related Agents**:
> - `orchestration/agents/auditors/design-research-reconciliation-agent.md` (G4.1)
> - `orchestration/agents/auditors/design-research-integration-agent.md` (G5.2)
>
> **Gate Position**: G5.2 (post-content-complete, pre-bibliography)

---

## The Problem This Solves

The Nakba essay failure demonstrated a critical issue: **CSS can be written perfectly but never applied** if selector names don't match TSX className values.

### What Happened

**CSS File** used hyphen convention:
```css
.ntv__stratigraphy-fill { ... }
.ntv__stratigraphy-marker { ... }
.ntv__testimony-card { ... }
```

**TSX File** used BEM double-underscore convention:
```tsx
<div className="ntv__stratigraphy__fill" />
<div className="ntv__stratigraphy__marker" />
<div className="ntv__testimony__card" />
```

**Result**: 0% of CSS was applied. The essay rendered with browser defaults despite passing all earlier gates.

---

## Binding Pattern Requirements

### 1. Naming Convention Consistency

**Choose ONE convention and use it everywhere:**

| Convention | CSS Example | TSX Example | Status |
|------------|-------------|-------------|--------|
| BEM Double Underscore | `.ntv__hero__title` | `className="ntv__hero__title"` | ✅ Recommended |
| BEM Hyphen | `.ntv__hero-title` | `className="ntv__hero-title"` | ⚠️ Less common |
| Camel Case | `.ntvHeroTitle` | `className="ntvHeroTitle"` | ❌ Not BEM |

**BEM Double Underscore Pattern (Recommended)**:
```
.[prefix]__[block]__[element]--[modifier]

Examples:
.ntv__hero                      ← Block
.ntv__hero__title               ← Block + Element
.ntv__hero__title--active       ← Block + Element + Modifier
.ntv__chapter--era-ottoman      ← Block + Modifier
```

### 2. Prefix Uniqueness

Each essay must use a unique CSS class prefix:

| Essay | Prefix | Rationale |
|-------|--------|-----------|
| The Nakba, Visualized | `ntv__` | Nakba: The Visualized |
| Hip-Hop History | `hh__` | Hip-Hop |
| Rock & Roll History | `rnr__` | Rock 'n' Roll |
| Holocaust | `hol__` | Holocaust |

**Never reuse prefixes across essays.**

### 3. CSS Custom Property Naming

CSS custom properties should also use essay-specific prefixes:

```css
/* ✅ GOOD — Subject-derived, unique */
:root {
  --ntv-ink: #1A1A1A;
  --ntv-prussian: #003153;
  --ntv-dust: #C9BDA7;
}

/* ❌ BAD — Generic, could apply to any essay */
:root {
  --primary-color: #1A1A1A;
  --accent-color: #003153;
  --background: #C9BDA7;
}
```

---

## Implementation Checklist

### Before Writing CSS

- [ ] Define essay prefix (e.g., `ntv__`, `hh__`)
- [ ] Choose BEM convention (double underscore recommended)
- [ ] Define CSS custom property prefix (e.g., `--ntv-`, `--hh-`)
- [ ] Document in DESIGN-RESEARCH.md

### CSS File Structure

```css
/* ═══════════════════════════════════════════════════════════════════════════
   THE NAKBA, VISUALIZED — CSS
   Prefix: ntv__
   Convention: BEM with double underscore
   Custom Properties: --ntv-*
   ═══════════════════════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────────────────────────
   1. CSS Custom Properties (from DESIGN-RESEARCH.md)
   ────────────────────────────────────────────────────────────────────────── */
:root {
  /* Colors — derived from subject materials */
  --ntv-ink: #1A1A1A;         /* Printing ink, iron oxide */
  --ntv-bond: #FFFEF9;        /* Government bond paper */
  --ntv-prussian: #003153;    /* Mandate map ink */

  /* Typography — justified by document culture */
  --ntv-font-display: 'IBM Plex Serif', serif;
  --ntv-font-body: 'Charter', Georgia, serif;
  --ntv-font-mono: 'IBM Plex Mono', monospace;

  /* Animation — derived from subject characteristics */
  --ntv-reveal-duration: 600ms;
  --ntv-ease-documentary: cubic-bezier(0.4, 0, 0.6, 1);
}

/* ──────────────────────────────────────────────────────────────────────────
   2. Component Styles
   ────────────────────────────────────────────────────────────────────────── */

/* Hero */
.ntv__hero { ... }
.ntv__hero__title { ... }
.ntv__hero__subtitle { ... }

/* Chapters */
.ntv__chapter { ... }
.ntv__chapter__header { ... }
.ntv__chapter__content { ... }
.ntv__chapter--era-ottoman { ... }
.ntv__chapter--era-mandate { ... }
```

### TSX File Structure

```tsx
// THE NAKBA, VISUALIZED — TSX
// Prefix: ntv__
// Convention: BEM with double underscore

export default function NakbaVisualizedClient() {
  return (
    <article className="ntv__essay">
      {/* Hero */}
      <header className="ntv__hero">
        <h1 className="ntv__hero__title">The Nakba</h1>
        <p className="ntv__hero__subtitle">What the Evidence Shows</p>
      </header>

      {/* Chapter */}
      <section className="ntv__chapter ntv__chapter--era-mandate">
        <header className="ntv__chapter__header">
          <h2>The Mandate Years</h2>
        </header>
        <div className="ntv__chapter__content">
          {/* Content */}
        </div>
      </section>
    </article>
  );
}
```

---

## Verification Process

### Manual Verification

1. **Extract CSS selectors**: List all class selectors from CSS file
2. **Extract TSX classNames**: List all className values from TSX files
3. **Cross-reference**: Verify each CSS selector has a matching TSX className
4. **Calculate binding percentage**: `(matched / total CSS selectors) × 100`

### Automated Verification (G5.2 Agent)

The Design Research Integration Agent performs this automatically:

```
Using @agents/auditors/design-research-integration-agent.md, verify:

CSS: src/app/essays/history/the-nakba-visualized/the-nakba-visualized.css
TSX: src/app/essays/history/the-nakba-visualized/page.tsx

Verify all CSS selectors bind to TSX classNames.
Report binding percentage and convention consistency.
```

**Passing Criteria**:
- ≥95% binding percentage
- No convention mismatches (hyphen vs underscore)
- No critical orphan selectors

---

## Common Anti-Patterns

### 1. Convention Mismatch

```css
/* CSS uses hyphens */
.ntv__hero-title { }
```

```tsx
/* TSX uses underscores — MISMATCH! */
<h1 className="ntv__hero__title">
```

**Fix**: Standardize on one convention. BEM double underscore is recommended.

### 2. Typos

```css
.ntv__stratigraphhy__fill { }  /* Double 'h' typo */
```

```tsx
<div className="ntv__stratigraphy__fill">  /* Correct spelling */
```

**Fix**: Use editor autocomplete, search-replace for bulk fixes.

### 3. Missing Prefix

```css
.hero { }  /* No prefix — will collide with other essays */
```

**Fix**: Always use essay-specific prefix.

### 4. Orphan Selectors

```css
.ntv__progress-indicator { }  /* CSS exists */
```

```tsx
/* Never used in TSX — orphan CSS, dead code */
```

**Fix**: Remove unused CSS or add corresponding TSX element.

---

## Integration with DESIGN-RESEARCH.md

The DESIGN-RESEARCH.md should document the binding conventions:

```markdown
## 6. Unique Class Naming Convention

**Prefix**: `ntv-` (Nakba: The Visualized)

**BEM Convention**: Double underscore for elements
- Block: `.ntv__hero`
- Element: `.ntv__hero__title`
- Modifier: `.ntv__hero--active`

**CSS Custom Properties**:
- Color tokens: `--ntv-[name]` (e.g., `--ntv-ink`, `--ntv-prussian`)
- Font tokens: `--ntv-font-[role]` (e.g., `--ntv-font-display`)
- Animation tokens: `--ntv-[property]` (e.g., `--ntv-reveal-duration`)
```

---

## Gate Dependency

| Gate | Dependency |
|------|------------|
| G4.1 (Design Reconciliation) | CSS custom properties match DESIGN-RESEARCH.md |
| **G5.2 (Design Integration)** | **CSS selectors bind to TSX classNames** |
| G5.5 (Bibliography) | Requires G5.2 pass |

**G5.2 blocks progression if**:
- Binding percentage < 95%
- Convention mismatch detected
- Critical orphan selectors found

---

## Reference Implementation

**Exemplar Essay**: `src/app/essays/history/hip-hop-history/`

This essay demonstrates correct binding:
- Unique prefix: `hh__`
- Consistent BEM convention
- Subject-derived CSS custom properties
- 100% CSS-TSX binding

---

## Handoff Deliverables

When implementing CSS for a visual essay, produce:

1. **CSS file** with:
   - Header comment documenting prefix and convention
   - CSS custom properties section
   - BEM-structured component styles

2. **TSX file** with:
   - Matching className values
   - Consistent convention usage

3. **Verification**:
   - Run G5.2 agent to confirm binding
   - Document binding percentage in QA report

---

## Troubleshooting

### "Why isn't my CSS being applied?"

1. **Check convention**: Is CSS using hyphens while TSX uses underscores?
2. **Check spelling**: Any typos in class names?
3. **Check import**: Is the CSS file imported in the TSX file?
4. **Check specificity**: Is another rule overriding?
5. **Run G5.2 agent**: Get a binding report

### "How do I fix a convention mismatch?"

1. Decide which convention to keep (prefer TSX convention if already in use)
2. Use search-replace to update CSS selectors
3. Re-run G5.2 agent to verify fix

---

*Last Updated: December 31, 2024*

*Created in response to the Nakba essay CSS binding failure. G5.2 gate added to prevent this class of error from reaching production.*
