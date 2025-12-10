# SEO Element Extraction Skill

## Purpose
Systematically extract all SEO-relevant elements from a webpage for audit, analysis, or optimization purposes.

## When to Use
- Before conducting an SEO audit
- When analyzing a page for optimization opportunities
- When comparing page elements across competitors
- When documenting current SEO state before changes

## Skill Type
**Extraction** — Procedural data collection from web pages

---

## Extraction Procedure

### Step 1: Page Access
1. Navigate to target URL
2. Verify page loads completely (wait for JS rendering if needed)
3. Confirm no access restrictions (auth walls, geo-blocks)
4. Note any redirects (document final URL)

### Step 2: Meta Element Extraction

**Title Tag**
```
Location: <head><title>...</title>
Extract: Full text content
Note: Character count
```

**Meta Description**
```
Location: <meta name="description" content="...">
Extract: Full content attribute value
Note: Character count
```

**Meta Robots**
```
Location: <meta name="robots" content="...">
Extract: Full content attribute value
Default if missing: index, follow
```

**Canonical URL**
```
Location: <link rel="canonical" href="...">
Extract: Full href value
Note: Match to current URL
```

**Open Graph Tags**
```
og:title - <meta property="og:title" content="...">
og:description - <meta property="og:description" content="...">
og:image - <meta property="og:image" content="...">
og:url - <meta property="og:url" content="...">
og:type - <meta property="og:type" content="...">
```

**Twitter Card Tags**
```
twitter:card - <meta name="twitter:card" content="...">
twitter:title - <meta name="twitter:title" content="...">
twitter:description - <meta name="twitter:description" content="...">
twitter:image - <meta name="twitter:image" content="...">
```

**Other Meta Tags**
```
viewport - <meta name="viewport" content="...">
charset - <meta charset="...">
author - <meta name="author" content="...">
```

### Step 3: Header Extraction

**H1 Tags**
```
Extract: All <h1> elements
Note: Count, full text content of each
```

**H2-H6 Tags**
```
Extract: All header elements in document order
Format: Level | Text Content | Position in document
```

**Header Hierarchy Map**
```
Build nested structure showing header relationships:
H1: [text]
  H2: [text]
    H3: [text]
    H3: [text]
  H2: [text]
    H3: [text]
```

### Step 4: Content Metrics

**Word Count**
```
Method: Extract visible text content, split by whitespace
Exclude: Navigation, footer, sidebar (if identifiable)
Include: Main content area text
```

**Paragraph Count**
```
Count: <p> elements with substantive content
Note: Average words per paragraph
```

**Content Areas**
```
Identify: Main content container
Identify: Sidebar content (if present)
Identify: Navigation content
Identify: Footer content
```

### Step 5: Link Extraction

**Internal Links**
```
Selector: a[href^="/"], a[href*="domain.com"]
Extract per link:
- href value
- Anchor text
- rel attribute (if any)
- Position context (nav/content/footer)
```

**External Links**
```
Selector: a[href^="http"] NOT containing domain
Extract per link:
- href value
- Anchor text  
- rel attribute (nofollow, sponsored, ugc)
- Target attribute
```

**Broken Link Candidates**
```
Note: Any href="" or href="#" that appear unintentional
Note: Any javascript:void(0) links
```

### Step 6: Image Extraction

**All Images**
```
Selector: img, picture source, [style*="background-image"]
Extract per image:
- src/srcset
- alt attribute (present/missing/empty)
- width/height attributes
- loading attribute (lazy/eager/none)
- File format (from URL)
- Approximate file size (if accessible)
```

**Image Summary**
```
Total count
With alt text count
Missing alt text count
Lazy loaded count
Modern format count (WebP, AVIF)
```

### Step 7: Schema Markup Extraction

**JSON-LD Schema**
```
Selector: script[type="application/ld+json"]
Extract: Full JSON content (parse and validate)
Note: Schema @type(s) present
```

**Microdata Schema**
```
Selector: [itemscope], [itemprop]
Extract: itemtype and itemprop values
Map: Property relationships
```

**RDFa Schema**
```
Selector: [typeof], [property]
Extract: typeof and property values
```

**Schema Inventory**
```
List all schema types found
For each type, list properties present
Note: Required vs optional properties
```

### Step 8: Technical Elements

**Hreflang Tags**
```
Selector: link[rel="alternate"][hreflang]
Extract: hreflang value and href for each
```

**Pagination**
```
Selector: link[rel="prev"], link[rel="next"]
Extract: href values
```

**RSS/Atom Feeds**
```
Selector: link[type="application/rss+xml"], link[type="application/atom+xml"]
Extract: href values
```

**Preload/Prefetch**
```
Selector: link[rel="preload"], link[rel="prefetch"], link[rel="preconnect"]
Extract: href and as values
```

### Step 9: Page Structure Signals

**Breadcrumbs**
```
Identify: Breadcrumb navigation (by structure or schema)
Extract: Breadcrumb items and URLs
```

**Navigation Structure**
```
Identify: Primary navigation
Count: Top-level items
Note: Depth of navigation
```

**Sidebar**
```
Present: Yes/No
Content type: Related links, ads, widgets, etc.
```

**Footer**
```
Links present: Count
Key sections: About, Contact, Legal, etc.
```

---

## Output Format

### Structured Extraction Report

```markdown
# SEO Element Extraction: [URL]

## Extraction Date: [Date]
## Final URL: [URL after redirects]
## HTTP Status: [Status code]

---

## Meta Elements

### Title Tag
- **Content**: "[exact title]"
- **Length**: [X] characters

### Meta Description
- **Content**: "[exact description]"
- **Length**: [X] characters
- **Present**: Yes/No

### Meta Robots
- **Content**: [directives]
- **Present**: Yes/No (default assumed if missing)

### Canonical
- **URL**: [canonical URL]
- **Matches Current**: Yes/No
- **Present**: Yes/No

### Open Graph
| Property | Value |
|----------|-------|
| og:title | [value] |
| og:description | [value] |
| og:image | [value] |
| og:url | [value] |
| og:type | [value] |

### Twitter Card
| Property | Value |
|----------|-------|
| twitter:card | [value] |
| twitter:title | [value] |
| twitter:description | [value] |
| twitter:image | [value] |

---

## Headers

### H1 Tags ([count])
1. "[H1 text]"
[2. "[H1 text]" - if multiple]

### Header Hierarchy
```
H1: [text]
  H2: [text]
    H3: [text]
  H2: [text]
```

### Header Summary
| Level | Count |
|-------|-------|
| H1 | [X] |
| H2 | [X] |
| H3 | [X] |
| H4 | [X] |
| H5 | [X] |
| H6 | [X] |

---

## Content Metrics

| Metric | Value |
|--------|-------|
| Word Count | [X] |
| Paragraph Count | [X] |
| Avg Words/Paragraph | [X] |

---

## Links

### Internal Links ([count])
| Anchor Text | URL | Rel | Context |
|-------------|-----|-----|---------|
| [text] | [url] | [rel] | [nav/content/footer] |

### External Links ([count])
| Anchor Text | URL | Rel | Target |
|-------------|-----|-----|--------|
| [text] | [url] | [rel] | [_blank/none] |

### Link Summary
| Type | Count |
|------|-------|
| Internal | [X] |
| External | [X] |
| Nofollow | [X] |
| Broken Candidates | [X] |

---

## Images

### Image Inventory ([count])
| Src | Alt Text | Format | Lazy | Size |
|-----|----------|--------|------|------|
| [src] | [alt or "MISSING"] | [format] | Yes/No | [size] |

### Image Summary
| Metric | Count | Percentage |
|--------|-------|------------|
| Total | [X] | 100% |
| With Alt | [X] | [%] |
| Missing Alt | [X] | [%] |
| Lazy Loaded | [X] | [%] |
| Modern Format | [X] | [%] |

---

## Schema Markup

### Schema Types Found
- [Type 1]
- [Type 2]

### JSON-LD Content
```json
[Full JSON-LD if present]
```

### Schema Properties
| Type | Property | Value Present |
|------|----------|---------------|
| [Type] | [property] | Yes/No |

---

## Technical Elements

### Hreflang
| Language | URL |
|----------|-----|
| [lang] | [url] |

### Pagination
- **Prev**: [url or "None"]
- **Next**: [url or "None"]

### Resource Hints
| Type | Resource |
|------|----------|
| preload | [resource] |
| prefetch | [resource] |
| preconnect | [resource] |

---

## Page Structure

### Breadcrumbs
- **Present**: Yes/No
- **Items**: [Home > Category > Page]

### Navigation
- **Primary Nav Items**: [X]
- **Max Depth**: [X] levels

### Sidebar
- **Present**: Yes/No
- **Content**: [Description]

### Footer
- **Link Count**: [X]
- **Key Sections**: [List]

---

## Extraction Notes
- [Any issues encountered]
- [Any elements that couldn't be extracted]
- [Any unusual page characteristics]
```

---

## Usage by Agents

### Primary Consumer
- **`seo-audit-agent.md`** — Uses extraction as Phase 3 data source

### Secondary Consumers
- **`seo-specialist-expert.md`** — For optimization planning
- **`visual-essay-orchestrator.md`** — For pre-publication checks
- **Content writers** — For current state documentation

---

## Invocation Examples

**Standard Extraction:**
```
Using @skills/seo-element-extraction, extract all SEO elements from:

URL: https://example.com/page

Provide complete structured extraction report.
```

**Focused Extraction:**
```
Using @skills/seo-element-extraction, extract meta elements and 
headers only from [URL].
```

**Comparison Extraction:**
```
Using @skills/seo-element-extraction, extract SEO elements from 
these pages for comparison:

1. [URL 1]
2. [URL 2]  
3. [URL 3]

Present in comparison table format.
```

---

## Skill Limitations

- Cannot access pages behind authentication
- Cannot execute JavaScript requiring user interaction
- Cannot extract elements from iframes (cross-origin)
- Cannot determine actual Core Web Vitals (requires different tools)
- Cannot verify backlinks or external factors
- Word count may vary based on content container identification

---

## Related Skills
- `image-url-extraction` — For finding replacement image URLs
- (Future) `schema-validation` — For detailed schema testing

---

## Last Updated
December 2024

