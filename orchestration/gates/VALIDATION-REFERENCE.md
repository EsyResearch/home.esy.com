# Gate Contract Validation Reference

> Per-type contract schema, examples, and extension guide.
> For the design philosophy (why source-code validation, layered defense, skill injection): see [Gate Validation Standard](../standards/gate-validation-standard.md)

Reference for all validation types available in gate contracts (`orchestration/gates/contracts/*.contract.json`).

**Runtime**: `orchestration/runner/lib/validator.js`
**Contract loader**: `orchestration/runner/lib/contract-loader.js`

---

## Contract Structure

Every contract is a JSON file with this shape:

```json
{
  "gate": "G5",
  "name": "Content Complete",
  "blocking": true,
  "description": "Human-readable description of what this gate validates",
  "required_outputs": {
    "all_of": [ ... ],
    "any_of": [ ... ]
  },
  "validations": [ ... ],
  "notes": "Context for contract authors"
}
```

### Output modes

| Mode | Behavior |
|------|----------|
| `all_of` | Every listed file must exist. Each can be `"required": true` (default) or `false`. |
| `any_of` | At least one listed file must exist. Used when output format varies (e.g., `.md` or `.ts`). |

### Required skills

Contracts can declare skill dependencies via `required_skills`. When present, the prompt generator loads the skill files and injects their full content into the prompt packet. This ensures the executing agent has the procedure in context without needing to discover or load files manually.

```json
{
  "required_skills": [
    {
      "path": "orchestration/skills/image-url-extraction",
      "name": "Image URL Extraction",
      "reason": "Agent MUST follow the extraction procedure to obtain direct image URLs.",
      "inject": ["SKILL.md", "references/wikimedia-commons.md"]
    }
  ]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `path` | string | yes | Path to skill directory (relative to repo root) |
| `name` | string | no | Human-readable skill name (defaults to directory name) |
| `reason` | string | no | Why this skill is required for this gate |
| `inject` | string[] | yes | Files within the skill directory to inject into the prompt packet |

**How it works:**
1. Contract declares `required_skills` with `inject` file list
2. `contract-loader.js` → `getRequiredSkills()` reads the files
3. `prompt-generator.js` → `formatSkillsSection()` embeds full file content between Gate Instructions and Required Outputs
4. The executing agent receives the skill procedure in-context, not as a path to load

**Design intent:** Skills are advisory documentation. Without injection, agents may not load them (especially in CI mode where context is the prompt packet alone). By injecting skill content directly into the prompt, the procedure becomes part of the execution context — not an optional reference.

### Template variables

| Variable | Resolved to | Example |
|----------|-------------|---------|
| `{artifact_path}` | Essay directory path | `src/app/essays/seven-million-years` |
| `{slug}` | Essay slug | `seven-million-years` |
| `{client_component}` | Auto-discovered `*Client.tsx` or `*Client.jsx` in artifact directory | `src/app/essays/seven-million-years/SevenMillionYearsClient.tsx` |

### Severity

Every validation supports `"severity"`:

| Value | Behavior |
|-------|----------|
| `"error"` (default) | Fails the gate if the check fails |
| `"warning"` | Logs a warning but does not fail the gate |

---

## Validation Types

### `file_exists`

Checks that required output files exist. Handled automatically from `required_outputs` — usually you don't need to add this to `validations` manually.

```json
{
  "type": "file_exists",
  "target": "all_required"
}
```

---

### `dir_exists`

Checks that a directory exists.

```json
{
  "type": "dir_exists",
  "target": "{artifact_path}/research",
  "description": "Research directory must exist"
}
```

---

### `min_file_count`

Counts files in a directory matching a glob pattern. Supports depth-based thresholds.

```json
{
  "type": "min_file_count",
  "target": "{artifact_path}/research",
  "pattern": "*.md",
  "thresholds": {
    "quick": 3,
    "standard": 5,
    "deep": 8
  },
  "description": "Research directory must contain enough markdown files"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `target` | string | yes | Directory path (template variables supported) |
| `pattern` | string | no | Glob pattern, e.g. `"*.md"`. Default: `"*"` |
| `thresholds` | object | yes | `{ quick: N, standard: N, deep: N }` |

---

### `min_sources`

Counts academic/research sources in a markdown file using heuristics (H3 headings, URLs, structured entries). Supports depth-based thresholds.

```json
{
  "type": "min_sources",
  "target": "{artifact_path}/research/CITATIONS.md",
  "thresholds": {
    "quick": 5,
    "standard": 8,
    "deep": 15
  },
  "description": "Citations file must contain enough sources"
}
```

---

### `min_sources_any_of`

Like `min_sources` but checks multiple possible files and uses whichever has the highest count.

```json
{
  "type": "min_sources_any_of",
  "targets": [
    "{artifact_path}/research/CITATIONS.md",
    "{artifact_path}/research/CLAIMS.md"
  ],
  "thresholds": {
    "quick": 5,
    "standard": 8,
    "deep": 15
  },
  "description": "At least one source-tracking file must have enough sources"
}
```

---

### `contains_text`

Checks that a file contains all specified text strings (exact substring match).

```json
{
  "type": "contains_text",
  "target": "{artifact_path}/page.tsx",
  "patterns": ["ArtifactDetailWrapper", "ESSAY_META"],
  "severity": "error",
  "description": "page.tsx must import ArtifactDetailWrapper and ESSAY_META"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `target` | string | yes | File path |
| `patterns` | string[] | yes | All strings must be present (AND logic) |

---

### `not_contains`

Checks that a file does NOT contain a specific string. Useful for catching anti-patterns.

```json
{
  "type": "not_contains",
  "target": "{artifact_path}/images.ts",
  "pattern": "/commons/thumb/",
  "severity": "error",
  "missing_ok": false,
  "description": "images.ts must not contain thumbnail URLs"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `target` | string | yes | File path |
| `pattern` | string | yes | String that must NOT appear |
| `missing_ok` | boolean | no | If `true`, missing file = pass. Default: `false` (missing file = fail). |

---

### `contains_headings`

Checks that a file contains all specified heading-like strings. Originally designed for markdown headings but works as a general substring check.

```json
{
  "type": "contains_headings",
  "target": "{artifact_path}/page.tsx",
  "required_headings": ["export default", "metadata"],
  "description": "page.tsx must have a default export and metadata"
}
```

---

### `regex_match`

Checks that a file's content matches (or does NOT match) a regex pattern.

```json
{
  "type": "regex_match",
  "target": "{client_component}",
  "regex": "import .*(d3|recharts)",
  "description": "Must import a visualization library"
}
```

**Anti-pattern mode** (must NOT match):

```json
{
  "type": "regex_match",
  "target": "{client_component}",
  "regex": "[\\u{1F300}-\\u{1F9FF}]",
  "must_not_match": true,
  "description": "Must not contain emoji"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `target` | string | yes | File path |
| `regex` | string | yes | Regex pattern (JavaScript syntax, `gm` flags auto-applied) |
| `must_not_match` | boolean | no | If `true`, regex match = FAIL. Default: `false` (no match = FAIL). |

---

### `min_regex_count`

Counts occurrences of a regex pattern in a file and enforces a minimum. Useful for "at least N images" or "at least N citations" checks.

```json
{
  "type": "min_regex_count",
  "target": "{client_component}",
  "regex": "<img[\\s\\n]",
  "min_count": 3,
  "severity": "error",
  "description": "Must contain at least 3 <img> elements"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `target` | string | yes | File path |
| `regex` | string | yes | Regex pattern to count matches of |
| `min_count` | number | yes | Minimum number of matches required |

---

### `frontmatter_status`

Parses YAML frontmatter (`---` delimited) from a markdown file and checks field values. Supports equality, negation, and numeric threshold checks.

```json
{
  "type": "frontmatter_status",
  "target": "{artifact_path}/research/SCROLL-CERTIFICATION.md",
  "checks": {
    "status": { "not": "FAIL" },
    "score": { "min": 8.0 }
  },
  "description": "Frontmatter must not be FAIL and score must be >= 8.0"
}
```

**Check modes:**

| Check | Syntax | Meaning |
|-------|--------|---------|
| Equality | `"status": "PASS"` | Field must equal `"PASS"` |
| Negation | `"status": { "not": "FAIL" }` | Field must NOT equal `"FAIL"` |
| Threshold | `"score": { "min": 8.0 }` | Field must be a number >= 8.0 |

---

### `url_reachable`

**Network validation.** Extracts URLs from a file using a regex, then makes HTTP HEAD requests to verify each returns a 2xx status code. Catches broken URLs, 404s, and redirect loops before they ship.

```json
{
  "type": "url_reachable",
  "target": "{artifact_path}/images.ts",
  "url_pattern": "https://upload\\.wikimedia\\.org/wikipedia/commons/[a-f0-9]/[a-f0-9]{2}/[^\"]+",
  "max_failures": 0,
  "sample_size": 10,
  "severity": "error",
  "description": "All image URLs must return HTTP 2xx"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `target` | string | yes | File path containing URLs |
| `url_pattern` | string | no | Regex to extract URLs. Default: all `https://` URLs. |
| `max_failures` | number | no | Maximum allowed 4xx/5xx responses. Default: `0` (zero tolerance). |
| `sample_size` | number | no | If set, randomly samples this many URLs instead of checking all. Useful for large URL sets. |

**Behavior:**
- Makes HTTP HEAD requests (not GET) to minimize bandwidth
- Follows up to 5 redirects
- Times out after 10 seconds per URL
- Runs all checks in parallel
- Deduplicates URLs before checking

**CLI output** shows per-URL results:

```
  ✗ url_reachable: All image URLs must return HTTP 2xx
    URLs: 10/12 reachable (17 total)
    ✗ 404 https://upload.wikimedia.org/wikipedia/commons/5/55/Broken.jpg
    ✗ 0 https://upload.wikimedia.org/wikipedia/commons/x/xx/Timeout.jpg (Timeout (10s))
```

---

## Target Resolution

Validation targets go through a resolution pipeline:

1. **Template expansion**: `{artifact_path}`, `{slug}`, `{client_component}` are replaced
2. **any_of fallback**: If the resolved path doesn't exist but the contract has `any_of` outputs, the validator tries each `any_of` path and uses the first one that exists
3. **Absolute path**: The final resolved path is joined with the repo root

This means a `not_contains` check targeting a specific `any_of` variant will automatically fall through to whichever variant actually exists.

---

## Design Principles

### Validate the code, not just the audit

The biggest risk in the pipeline is **self-certifying audits**: the same agent writes both the code and the audit report that says the code is correct. Gate contracts must include at least one validation that targets the **actual source code** (client component, images.ts, CSS file), not just the audit markdown.

**Good:**

```json
{
  "type": "contains_text",
  "target": "{client_component}",
  "patterns": ["SOURCES", "IMAGE_CREDITS"],
  "description": "Client component must render bibliography"
}
```

**Insufficient on its own:**

```json
{
  "type": "frontmatter_status",
  "target": "{artifact_path}/research/CONTENT-BIBLIOGRAPHY-AUDIT.md",
  "checks": { "status": { "not": "FAIL" } }
}
```

### Layer your defenses

Critical requirements should be checked at multiple gates. For example, image URLs are validated at:
- **G4.5**: `url_reachable` on images.ts (catches broken source URLs early)
- **G4.7**: `not_contains` for `upload.wikimedia.org` + `url_reachable` on `images.esy.com` URLs (verifies R2 migration)
- **G5**: `min_regex_count` for `<img>` tags (catches missing images in code)
- **G7**: `min_regex_count` for `IMAGES.` refs (catches images not rendering)
- **G8**: `url_reachable` spot-check on `images.esy.com` URLs + `not_contains` for hotlinked URLs (final defense)

### Combine `not_contains` + `url_reachable` for R2 enforcement

After G4.7 (R2 Image Upload), images must be self-hosted on `images.esy.com`. Use this pattern to enforce it:

```json
[
  {
    "type": "not_contains",
    "target": "{artifact_path}/images.ts",
    "pattern": "upload.wikimedia.org",
    "description": "No hotlinked URLs — all images must be on images.esy.com"
  },
  {
    "type": "url_reachable",
    "target": "{artifact_path}/images.ts",
    "url_pattern": "https://images\\.esy\\.com/[^\"']+",
    "max_failures": 0,
    "description": "All R2-hosted URLs must be reachable"
  }
]
```

The `not_contains` catches any remaining hotlinks; the `url_reachable` verifies the R2 replacements are live.

### Use `url_reachable` judiciously

Network checks add latency. Use `sample_size` to limit checks on large URL sets, and prefer running expensive checks at critical gates (G4.5, G8) rather than every intermediate gate.

---

## Adding a New Validation Type

1. Add the core function to `orchestration/runner/lib/validator.js`
2. Wire it into `runValidations()` with the standard severity/warning pattern
3. Add it to the `module.exports`
4. Add CLI output handling in `orchestration/runner/cli.js`
5. Document it in this file
6. Add to the header comment in `validator.js`
7. Update the validation type table in [Gate Validation Standard](../standards/gate-validation-standard.md)
8. Add unit tests per the [Pipeline Testing Standard](../standards/pipeline-testing-standard.md)

---

## Related Documents

- [Gate Validation Standard](../standards/gate-validation-standard.md) — Design philosophy, self-certification problem, layered defense model, skill injection rationale
- [Gate Accountability Standard](../standards/gate-accountability.md) — Three-layer QA model
- [Pipeline Testing Standard](../standards/pipeline-testing-standard.md) — Testing pyramid for validators and contracts
- [Runner README](../runner/README.md) — CLI usage and run record structure
