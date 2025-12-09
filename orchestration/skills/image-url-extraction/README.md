# Image URL Extraction Skill

A procedural skill for reliably extracting direct image URLs from archive HTML pages.

## Problem Statement

When researching images on archives like Wikimedia Commons, Library of Congress, or Smithsonian, the agent lands on **file description pages** (HTML), not the actual image files. Attempting to use these HTML URLs results in:
- Broken images in visual essays
- Failed downloads returning HTML instead of image data
- Incorrect URL guessing based on assumed patterns

## Solution

This skill provides **deterministic extraction procedures** for each major image archive, ensuring the agent always obtains the correct direct image URL.

## Directory Structure

```
image-url-extraction/
├── SKILL.md                    # Core skill definition & procedures
├── README.md                   # This file
├── references/
│   ├── wikimedia-commons.md    # Wikimedia Commons extraction
│   ├── library-of-congress.md  # LOC extraction
│   ├── smithsonian.md          # Smithsonian Open Access
│   ├── met-museum.md           # Metropolitan Museum
│   ├── national-archives.md    # NARA extraction
│   └── generic-fallback.md     # Unknown sources
└── examples/
    └── successful-extractions.md
```

## Quick Start

1. **Identify the source** from the URL pattern
2. **Open the matching reference** file
3. **Execute the extraction method** (usually `curl` + `grep`)
4. **Verify** the URL returns `Content-Type: image/*`
5. **Use** the verified URL

## Supported Sources

| Source | Coverage | Reliability |
|--------|----------|-------------|
| Wikimedia Commons | Excellent | ⭐⭐⭐⭐⭐ |
| Library of Congress | Good | ⭐⭐⭐⭐ |
| Smithsonian | Good | ⭐⭐⭐⭐ |
| Metropolitan Museum | Good | ⭐⭐⭐⭐ |
| National Archives | Moderate | ⭐⭐⭐ |
| Generic/Other | Variable | ⭐⭐ |

## Usage by Agents

This skill is primarily invoked by:
- `@orchestration/agents/image-research-licensing-expert.md`

### When to Invoke

- After landing on any archive file page
- When a previous image URL attempt failed
- Before downloading any image to local storage
- Before adding any external image URL to `images.ts`

## Key Principles

1. **Never guess** — Always extract from the actual page
2. **Always verify** — Check Content-Type before using
3. **Prefer full resolution** — Avoid thumbnail URLs
4. **Document sources** — Keep provenance records

## Related Skills

- `visual-essay-invocation` — Uses images sourced with this skill

## Related Agents

- `image-research-licensing-expert.md` — Primary consumer of this skill
- `visual-essay-director.md` — Quality gate verification

---

*Last updated: December 2024*

