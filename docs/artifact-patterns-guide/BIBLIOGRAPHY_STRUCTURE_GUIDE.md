# Bibliography Structure Guide

This document establishes the standard structure for the **Sources & Further Reading** section across all Esy visual essays and artifacts. This section serves as the comprehensive attribution container for all sources, media credits, and references.

---

## Table of Contents

1. [Configuration](#configuration)
2. [Overview](#overview)
3. [Section Structure](#section-structure)
4. [Source Categories](#source-categories)
5. [Inline Attribution Patterns](#inline-attribution-patterns)
6. [Section Implementation Patterns](#section-implementation-patterns)
7. [Media-Specific Credits](#media-specific-credits)
8. [Implementation Reference](#implementation-reference)
9. [Audit Compliance](#audit-compliance)

---

## Configuration

> **IMPORTANT**: This section defines configurable standards. Update here to change project-wide behavior.

### Section Title Standard

```yaml
# CURRENT STANDARD - Update this to change all essays
SECTION_TITLE: "Sources & Further Reading"
SECTION_TITLE_SHORT: "Sources"  # Acceptable abbreviation

# Previously considered alternatives (for reference):
# - "Bibliography" (too academic/formal)
# - "Sources" (doesn't signal further reading purpose)
# - "References" (doesn't include media credits)
```

**Rationale**: "Sources & Further Reading" fits the scholarly-accessible tone of Esy visual essays. It signals to readers that these aren't just citations but also recommended exploration paths.

### Audit Enforcement

The Bibliography Orchestrator agent MUST verify that essays use the configured `SECTION_TITLE`. If an essay uses a different title (e.g., "Bibliography", "References", "Sources"), it should be flagged for standardization.

**To change the standard in the future:**
1. Update `SECTION_TITLE` in this Configuration section
2. Update the Bibliography Orchestrator's title check
3. Run audit across all essays to identify non-compliant titles
4. Update essays to use new standard

---

## Overview

The **Sources & Further Reading** section is the parent container for all attribution and citation content at the end of each essay.

### Design Principles

1. **All citations require BOTH inline AND section entries** — No exceptions
2. **Evolving categories** — Source categories expand as content types evolve
3. **Media-agnostic** — Same patterns apply to images, audio, video, data
4. **Audit-friendly** — Structure enables automated and manual audits
5. **Legal compliance** — Satisfies CC license requirements and academic standards
6. **Accessible tone** — Title invites exploration, not just documentation

### Why "Sources & Further Reading"?

| Term | Tone | Limitation | Decision |
|------|------|------------|----------|
| Sources | Neutral | Doesn't signal exploration | ❌ |
| References | Academic | Doesn't include media credits | ❌ |
| Citations | Narrow | Implies text only | ❌ |
| Bibliography | Formal | Can feel stuffy for general readers | ❌ |
| **Sources & Further Reading** | Inviting | Slightly longer | ✅ CHOSEN |

---

## Section Structure

```
Sources & Further Reading
├── [Category-specific subsections]
│   ├── Primary Archives (.gov)
│   ├── University Research Guides (.edu)
│   ├── Academic Books & Journals
│   ├── Institutional Reports
│   ├── Documentaries & Film
│   └── Data Sources
├── Image Credits
├── Audio/Video Credits (if applicable)
└── Acknowledgments (optional)
```

### Section Hierarchy

| Section | Required | Contents |
|---------|----------|----------|
| **Source Categories** | Yes | All textual sources cited, organized by type |
| **Image Credits** | If images used | All images with photographer, license, source link |
| **Audio/Video Credits** | If A/V used | All audio/video with creator, license, source link |
| **Acknowledgments** | Optional | Subject experts, consultants, institutions |

---

## Source Categories

### Works Cited Categories

These categories should be used within the Works Cited section. Not all essays will use all categories — include only those relevant to the essay's sources.

#### Books & Academic Works
Peer-reviewed journals, university press publications, scholarly monographs, textbooks.

```markdown
### Books & Academic Works
- **Title** by Author (Publisher, Year) — [Link if available]
- **Title** by Author (Publisher, Year) — [Link if available]
```

#### Archives & Primary Documents
Government records, museum collections, historical archives, official documents, court records.

```markdown
### Archives & Primary Documents
- **Document Title** (Archive Name, Date) — [Link]
- **Collection Name** (Institution) — [Link]
```

#### Articles & Interviews
Magazine features, newspaper reporting, podcast interviews, published interviews.

```markdown
### Articles & Interviews
- **"Article Title"** by Author, *Publication* (Date) — [Link]
- **"Interview Title"** with Subject, *Publication* (Date) — [Link]
```

#### Documentaries & Film
Documentary films, video essays, archival footage compilations.

```markdown
### Documentaries & Film
- **Title** directed by Director (Studio, Year) — [Streaming/Archive Link]
```

#### Data Sources
Statistical databases, research datasets, APIs, quantitative sources.

```markdown
### Data Sources
- **Dataset Name** (Organization, Year) — [Link]
- **Database Name**: Specific data accessed (Access Date) — [Link]
```

### Source Category Evolution

As new essay types emerge, additional categories may be added:

| Potential Future Categories | Use Case |
|----------------------------|----------|
| Software & Tools | Technical essays citing software |
| Oral Histories | Essays with interview transcripts |
| Legal Documents | Essays citing case law, patents |
| Ephemera | Essays citing posters, packaging, etc. |

---

## Inline Attribution Patterns

**Every citable element requires inline attribution.** The inline serves as immediate context; the Bibliography provides full details.

### Text Sources (Inline)

When citing a fact, quote, or claim within the essay body:

```
According to [Author Name] in [Work Title]...
```

or with footnote-style inline:

```
The first patent was filed in 1845¹.
```

For visual essays without traditional footnotes, use contextual attribution:

```
As noted by [Source], [claim].
```

### Images (Inline)

Below each image:

```
"Photographer Name, License"
```

Examples:
- `"Bryan Ledgard, CC BY 2.0"`
- `"U.S. Navy/John Smith, Public Domain"`
- `"Stax Records, Public Domain"`

See [ARTIFACT_CITATION_PATTERNS_GUIDE.md](./ARTIFACT_CITATION_PATTERNS_GUIDE.md) for complete image patterns.

### Audio (Inline)

Below audio embeds or in audio section:

```
"Artist/Composer, Label/Source, License"
```

Examples:
- `"John Coltrane, Impulse! Records, Fair Use (clip)"`
- `"Field Recording by Alan Lomax, Library of Congress, Public Domain"`
- `"Creative Commons Audio, Freesound, CC0"`

### Video (Inline)

Below video embeds:

```
"Creator/Director, Source, License"
```

Examples:
- `"CBS News, Archive.org, Public Domain"`
- `"Subject's Channel, YouTube, Embedded with Permission"`
- `"National Archives, Public Domain"`

### Data (Inline)

When citing statistics or data:

```
According to [Source] (Year), [statistic].
```

or:

```
Data from the [Organization] shows [finding].
```

---

## Section Implementation Patterns

### Main Section Format

```tsx
<section className="sources-section">
  <h2 className="sources-title">Sources & Further Reading</h2>
  {/* NOTE: Title must match SECTION_TITLE in Configuration */}

  <div className="sources-content">
    <div className="source-category">
      <h3 className="source-category-title">Academic Books & Journals</h3>
      <ul className="source-list">
        <li>
          <a href="[URL]" target="_blank" rel="noopener noreferrer">
            <strong>Title</strong>
          </a>
          <span> by Author (Publisher, Year)</span>
        </li>
      </ul>
    </div>

    <!-- Additional categories as needed -->
  </div>
</section>
```

### Image Credits Format

```tsx
<div className="image-credits-section">
  <h3 className="image-credits-title">
    <span className="source-jack" />
    Image Credits
  </h3>
  <p className="image-credits-intro">
    All images sourced from Wikimedia Commons unless otherwise noted.
    Click subject names to view original files.
  </p>
  <ul className="image-credits-list">
    <li>
      <a href="https://commons.wikimedia.org/wiki/File:Example.jpg"
         target="_blank" rel="noopener noreferrer">
        Subject Name
      </a>
      <span>— Photographer Name, License</span>
    </li>
  </ul>
</div>
```

### Audio/Video Credits Format

```tsx
<div className="av-credits-section">
  <h3 className="av-credits-title">
    <span className="source-jack" />
    Audio/Video Credits
  </h3>
  <p className="av-credits-intro">
    Media clips used under fair use for educational commentary or with
    appropriate licensing as noted.
  </p>
  <ul className="av-credits-list">
    <li>
      <a href="[SOURCE_URL]" target="_blank" rel="noopener noreferrer">
        <strong>Title/Description</strong>
      </a>
      <span>— Creator, Source, License/Usage</span>
    </li>
  </ul>
</div>
```

### Data Sources Format

```tsx
<div className="data-sources-section">
  <h3 className="data-sources-title">
    <span className="source-jack" />
    Data Sources
  </h3>
  <ul className="data-sources-list">
    <li>
      <a href="[URL]" target="_blank" rel="noopener noreferrer">
        <strong>Dataset/Database Name</strong>
      </a>
      <span>— Organization (Year). Accessed: [Date]</span>
    </li>
  </ul>
</div>
```

---

## Media-Specific Credits

### Images

| Requirement | Inline | Bibliography |
|-------------|--------|--------------|
| Photographer/Creator | ✓ | ✓ |
| License | ✓ | ✓ |
| Source platform | ✗ | ✓ (link) |
| File page link | ✗ | ✓ |

See [ARTIFACT_CITATION_PATTERNS_GUIDE.md](./ARTIFACT_CITATION_PATTERNS_GUIDE.md) for complete patterns.

### Audio

| Requirement | Inline | Bibliography |
|-------------|--------|--------------|
| Artist/Composer | ✓ | ✓ |
| Track/Recording title | Context | ✓ |
| Label/Source | ✓ | ✓ |
| License/Usage basis | ✓ | ✓ |
| Link to source | ✗ | ✓ |

#### Audio License Types

| License | Use Case | Requirements |
|---------|----------|--------------|
| **Public Domain** | Pre-1928 recordings, government | Attribute creator |
| **CC Licenses** | Creative Commons audio | Follow license terms |
| **Fair Use (Clip)** | Brief excerpt for commentary | Must be transformative, educational |
| **Embedded** | Platform embed (YouTube, etc.) | Platform terms apply |

### Video

| Requirement | Inline | Bibliography |
|-------------|--------|--------------|
| Creator/Director | ✓ | ✓ |
| Title | Context | ✓ |
| Source platform | ✓ | ✓ |
| License/Usage basis | ✓ | ✓ |
| Link to source | ✗ | ✓ |

### Data

| Requirement | Inline | Bibliography |
|-------------|--------|--------------|
| Organization | ✓ | ✓ |
| Dataset name | Context | ✓ |
| Year/Version | ✓ | ✓ |
| Access date | ✗ | ✓ |
| Link | ✗ | ✓ |

---

## Implementation Reference

### TypeScript Interfaces

```typescript
// For figures with images
interface Figure {
  name: string;
  epithet: string;
  // ... other fields
  imageUrl?: string;
  imageAttribution?: string;  // "Photographer, License"
}

// For audio clips
interface AudioClip {
  title: string;
  artist: string;
  source: string;
  license: string;
  url: string;
  attribution: string;  // "Artist, Source, License"
}

// For video clips
interface VideoClip {
  title: string;
  creator: string;
  source: string;
  license: string;
  url: string;
  attribution: string;  // "Creator, Source, License"
}

// For data sources
interface DataSource {
  name: string;
  organization: string;
  year: number;
  accessDate: string;
  url: string;
}
```

### CSS Class Reference

```css
/* Parent container */
.bibliography-section { }
.bibliography-title { }
.bibliography-subtitle { }

/* Works Cited */
.works-cited { }
.source-category { }
.source-category-title { }
.source-list { }

/* Image Credits */
.image-credits-section { }
.image-credits-title { }
.image-credits-intro { }
.image-credits-list { }

/* Audio/Video Credits */
.av-credits-section { }
.av-credits-title { }
.av-credits-intro { }
.av-credits-list { }

/* Data Sources */
.data-sources-section { }
.data-sources-title { }
.data-sources-list { }
```

---

## Audit Compliance

### Section Title Verification (CRITICAL)

**The section title MUST match the configured standard:**

```yaml
REQUIRED_TITLE: "Sources & Further Reading"
ACCEPTABLE_VARIANTS: ["Sources & Further Reading"]
NON_COMPLIANT_TITLES: ["Bibliography", "References", "Sources", "Works Cited"]
```

If an essay uses a non-compliant title, the audit MUST flag it for standardization.

### Completeness Checklist

**Section Title**
- [ ] Uses "Sources & Further Reading" as main heading
- [ ] Does NOT use "Bibliography", "References", or standalone "Sources"

**Source Categories**
- [ ] All factual claims trace to cited sources
- [ ] All quotes have source attribution
- [ ] Sources organized by category
- [ ] All links functional and accessible
- [ ] Tier 1-2 sources comprise 80%+

**Image Credits**
- [ ] Every image has inline attribution
- [ ] Every image appears in Image Credits section
- [ ] All Wikimedia links verified
- [ ] License abbreviations standardized

**Audio/Video Credits**
- [ ] Every A/V element has inline attribution
- [ ] Every A/V element appears in Credits section
- [ ] License/usage basis documented
- [ ] Source links verified

**Data Sources**
- [ ] Statistical claims cite data source
- [ ] Access dates recorded
- [ ] Links to original data verified

### Audit Integration

The [Bibliography Orchestrator](../../orchestration/agents/orchestrators/bibliography-orchestrator.md) coordinates audits across all sections:

1. **Citation Audit Agent** → Works Cited verification
2. **Quotes Audit Agent** → Quote authenticity (orchestrated by Citation Audit)
3. **Image Research & Licensing Expert** → Image Credits verification
4. **Bibliography Orchestrator** → Overall structure compliance

---

## Reference Implementations

### R&B History Essay
`src/app/essays/history/rnb-history/`
- Full hybrid image attribution pattern
- Complete Image Credits section
- Categorized Sources section

### Visual Essays (General)
Pattern reference for new essays following this structure.

---

## Changelog

| Date | Change |
|------|--------|
| 2024-12-30 | Initial guide created |
| 2024-12-30 | Added Data Sources category |
| 2024-12-30 | Added Audio/Video credit patterns |
| 2024-12-30 | Established Bibliography as parent container |
| 2025-12-30 | **BREAKING**: Changed standard title from "Bibliography" to "Sources & Further Reading" |
| 2025-12-30 | Added Configuration section with SECTION_TITLE standard |
| 2025-12-30 | Added Section Title Verification to Audit Compliance |

---

*This guide is maintained as part of the Esy Artifact Patterns documentation system. For image-specific patterns, see [ARTIFACT_CITATION_PATTERNS_GUIDE.md](./ARTIFACT_CITATION_PATTERNS_GUIDE.md). For orchestration, see the [Bibliography Orchestrator](../../orchestration/agents/orchestrators/bibliography-orchestrator.md).*
