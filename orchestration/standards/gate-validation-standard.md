# Gate Validation Standard: Proving the Code, Not Just the Audit

> Version: 1.0
> Created: February 24, 2026
> Status: Active

## Purpose

This standard defines how gate contracts validate artifacts in the orchestration pipeline. It establishes the principle that contracts must validate **the actual source code and assets**, not just the audit documents that describe them. It codifies the validation type library, the skill injection system, and the layered defense model that prevents defective artifacts from reaching production.

A gate that only checks "does the audit report exist and say PASS" is a gate that trusts the agent to audit itself. That trust model failed. This standard closes the gap.

---

## Origin

This standard was born from the "Seven Million Years" visual essay (February 2026). The pipeline ran all 16 gates, reported PASS at every one, and produced an essay with:

- **15 broken images** — all returning HTTP 404 because they used Wikimedia thumbnail URLs (`/commons/thumb/`) instead of direct URLs (`/commons/{hash}/{hash}/`)
- **No bibliography section** — Sources & Further Reading was entirely absent from the rendered page
- **No image credits** — zero attribution for any external photography

Root cause analysis revealed a systemic flaw: **every gate was validating documents about the code, not the code itself**. The G4.5 contract checked if `IMAGE_RESEARCH_AUDIT.md` existed. The G5.5 contract checked if `CONTENT-BIBLIOGRAPHY-AUDIT.md` existed. The G8 contract checked if `PUBLICATION-CERTIFICATION.md` said "GO." The same agent that wrote the code also wrote the audit reports — and self-certified them as passing.

Additionally, the `image-url-extraction` skill — which contains the exact procedure for obtaining correct Wikimedia URLs — was never loaded into the agent's context during G4.5. The skill existed, the agent definition referenced it, but the prompt packet never included it.

---

## The Self-Certification Problem

In an agentic pipeline, the same model often produces both the artifact and the audit report that certifies it. This creates a structural conflict of interest:

```
Agent writes code → Agent writes audit report → Gate checks audit report → PASS
                                                              ↑
                                              No one checked the actual code
```

**Document-based validation** checks:
- Does `CITATION-AUDIT.md` exist? (yes)
- Does its frontmatter say `status: PASS`? (yes)
- Does it contain `[FAIL]`? (no)

**Source-code validation** checks:
- Does the client component import from `./images`? (regex on actual `.tsx`)
- Does it contain at least 3 `<img>` elements? (count in actual `.tsx`)
- Do the URLs in `images.ts` return HTTP 200? (network request to actual URLs)
- Does the bibliography section render `SOURCES` and `IMAGE_CREDITS`? (text match in actual `.tsx`)

The first set can pass with fabricated audit reports. The second set cannot.

---

## Core Principles

### 1. Validate the Code, Not Just the Audit

Every gate contract that touches a producing gate (G4.5, G5, G5.5) MUST include at least one validation that targets the **actual source file** — not the audit markdown. Audit document checks are Layer 1 (necessary). Source code checks are Layer 2 (sufficient).

| Layer | What it checks | What it catches | Example |
|-------|---------------|-----------------|---------|
| Layer 1: Document | Audit report exists, says PASS | Missing reports | `frontmatter_status` on `CITATION-AUDIT.md` |
| Layer 2: Source code | Pattern exists in actual code | Missing implementation | `contains_text` for `SOURCES` in `Client.tsx` |
| Layer 3: Runtime | Asset is actually reachable | Broken URLs, 404s | `url_reachable` on `images.ts` URLs |

A gate with only Layer 1 is **structurally insufficient** for producing gates.

### 2. Layer Your Defenses

Critical requirements must be checked at multiple gates. A single check at one gate is a single point of failure. The pipeline should catch the same defect at multiple stages:

**Example: Image URL integrity**

| Gate | Check | Catches |
|------|-------|---------|
| G4.5 | `url_reachable` on `images.ts` | Broken source URLs at sourcing time |
| G4.5 | `not_contains` for `/commons/thumb/` | Thumbnail URLs |
| G4.7 | `not_contains` for `upload.wikimedia.org` | Hotlinked URLs not migrated to R2 |
| G4.7 | `url_reachable` on `images.esy.com` URLs | R2 upload failed or incomplete |
| G5 | `regex_match` for `from './images'` import | Hardcoded URLs in component |
| G5 | `min_regex_count` for `<img>` tags | Missing photography |
| G7 | `min_regex_count` for `IMAGES.` refs | Images not rendering via central source |
| G8 | `url_reachable` spot-check on `images.esy.com` | Final defense before publication |
| G8 | `not_contains` for `upload.wikimedia.org` | Hotlinks reintroduced after G4.7 |

### 3. Inject Procedure Upstream, Validate Results Downstream

Skills contain the *how* — the extraction procedures, verification commands, and red lines. Contracts validate the *what* — the output meets structural requirements. Both are necessary:

- **Without skill injection**: Agent doesn't know the correct procedure, produces wrong output
- **Without contract validation**: Agent ignores the procedure, wrong output passes anyway

The `required_skills` contract field bridges this gap. When a contract declares skills, the prompt generator injects their full content into the prompt packet. The agent receives the procedure in-context, and the contract validates the result.

**Example: R2 image migration.** G4.7 injects `SKILL.md` (extraction + R2 upload procedure) and `references/r2-upload.md` (script documentation) into the prompt. The agent receives the exact commands to run (`scan-hotlinked-images.mjs`, `r2-migrate-flat-url-map.mjs`). Downstream, the contract validates `not_contains` for hotlinked URLs and `url_reachable` for `images.esy.com` URLs — proving the procedure was actually followed.

### 4. Use `url_reachable` Judiciously

Network checks add latency (~1-10s per URL). Guidelines:

- Use `sample_size` to limit checks on large URL sets
- Prefer `url_reachable` at critical gates (G4.5 sourcing, G8 publication) not every intermediate gate
- Set `max_failures: 0` for image URLs (zero tolerance for broken images)
- Use `severity: "warning"` for non-critical URLs (e.g., academic paper links that may be paywalled)

---

## Validation Type Library

The pipeline provides 12 validation types. Each operates on files resolved via template variables (`{artifact_path}`, `{slug}`, `{client_component}`).

### Filesystem Checks

| Type | Purpose |
|------|---------|
| `file_exists` | Artifact file was produced |
| `dir_exists` | Directory structure created |
| `min_file_count` | Sufficient artifacts in directory (depth-based thresholds) |

### Content Checks

| Type | Purpose |
|------|---------|
| `contains_text` | File contains all required strings (AND logic) |
| `not_contains` | File must NOT contain a pattern (anti-pattern detection) |
| `contains_headings` | File contains required heading strings |
| `regex_match` | File matches (or must not match) a regex |
| `min_regex_count` | File has at least N regex occurrences |

### Research Checks

| Type | Purpose |
|------|---------|
| `min_sources` | Source count meets depth-based threshold |
| `min_sources_any_of` | Flexible — checks multiple possible source files |

### Structured Data Checks

| Type | Purpose |
|------|---------|
| `frontmatter_status` | YAML frontmatter field checks (equality, negation, threshold) |

### Network Checks

| Type | Purpose |
|------|---------|
| `url_reachable` | Extract URLs from file, verify HTTP 2xx (catches 404s, broken hotlinks) |

For complete per-type schema and usage examples, see: [VALIDATION-REFERENCE.md](../gates/VALIDATION-REFERENCE.md)

---

## Skill Injection System

### The Problem

Skills are procedure documents that tell agents *how* to do something (e.g., extract Wikimedia URLs). Agent definitions *reference* skills. But in CI mode, the prompt packet is the entire execution context — if the skill content isn't in the packet, it isn't in context.

```
Prompt packet → mentions agent path → agent doc says "use skill" → skill has procedures
         ↑                                                              ↑
    No skill content injected               Procedures never loaded
```

### The Solution: `required_skills` on Contracts

Contracts declare skill dependencies:

```json
{
  "required_skills": [
    {
      "path": "orchestration/skills/image-url-extraction",
      "name": "Image URL Extraction",
      "reason": "Agent MUST follow extraction procedure for direct image URLs.",
      "inject": ["SKILL.md", "references/wikimedia-commons.md"]
    }
  ]
}
```

The pipeline resolves this at prompt generation time:

1. `contract-loader.js` → `getRequiredSkills()` reads the declared files from disk
2. `prompt-generator.js` → `formatSkillsSection()` embeds the full file content into the prompt packet
3. The executing agent receives the procedure in-context, between Gate Instructions and Required Outputs

### Design Intent

Skills are advisory documentation. Without injection, agents may not load them — especially in CI mode where the prompt packet is the sole execution context. Injecting skill content transforms a path reference into an in-context procedure. The agent can still ignore it, but the contract's downstream validations (`url_reachable`, `regex_match`, etc.) will catch the failure.

### Currently Declared Skills

| Gate | Skill | Files Injected | Reason |
|------|-------|----------------|--------|
| G4.5 | Image URL Extraction | `SKILL.md`, `references/wikimedia-commons.md` | Direct URL extraction procedure for Wikimedia (never guess hash paths) |
| G4.7 | Image URL Extraction & R2 Upload | `SKILL.md`, `references/r2-upload.md` | R2 upload procedure — scan, migrate, rewrite URLs to images.esy.com |
| G5 | Image URL Extraction | `SKILL.md` | Production agent must use `images.ts` pattern with `IMAGES.key` refs |

---

## Contract Authoring Rules

### For Producing Gates (G4-G5.5)

Every producing gate contract MUST include:

1. **At least one document-layer check** — audit/report file exists and isn't FAIL
2. **At least one source-code check** — actual implementation file has the expected pattern
3. **`required_skills`** — if the gate depends on a procedural skill (e.g., image extraction)

### For Audit Gates (G6-G7)

Audit gate contracts SHOULD include:

1. **Document check** — audit report exists with passing frontmatter
2. **Source-code spot-check** — at least one validation on the actual client component (e.g., lazy loading on images)

### For Publication Gates (G8)

Publication gate contracts MUST include:

1. **All previous requirements** as final defense checks
2. **`url_reachable`** for any external assets (images, embedded media)
3. **`not_contains`** for known anti-patterns (thumbnail URLs, emoji, raw unicode escapes)

---

## Adding a New Validation Type

1. Add the core function to `orchestration/runner/lib/validator.js`
2. Wire it into `runValidations()` following the standard severity/warning pattern
3. Export it from `module.exports`
4. Add CLI output handling in `orchestration/runner/cli.js`
5. Document it in [VALIDATION-REFERENCE.md](../gates/VALIDATION-REFERENCE.md)
6. Add it to the header comment in `validator.js`
7. Update this standard's validation type table
8. Add unit tests per the [Pipeline Testing Standard](./pipeline-testing-standard.md)

---

## Compliance

- All producing gate contracts (G4.5, G5, G5.5) MUST include source-code validation per this standard
- All publication gate contracts (G8) MUST include `url_reachable` for external assets
- All contracts using external procedures MUST declare `required_skills` with `inject` files
- New validation types MUST be documented in VALIDATION-REFERENCE.md before use in contracts
- Compliance is verified during gate contract review and at G8 (Publication Certification)

---

## Related Documents

- [VALIDATION-REFERENCE.md](../gates/VALIDATION-REFERENCE.md) — Per-type contract schema, examples, and extension guide
- [Gate Accountability Standard](./gate-accountability.md) — Three-layer QA model (contract → self-assessment → external audit)
- [Pipeline Testing Standard](./pipeline-testing-standard.md) — Testing pyramid for validators, contracts, and workflows
- [Pipeline Execution Standard](./pipeline-execution-standard.md) — How to run workflows
- [Visual Essay Engineering Standard](./visual-essay-engineering-standard.md) — Mandatory patterns for shipping essays

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | February 24, 2026 | Initial standard. Born from "Seven Million Years" postmortem — self-certification gap, broken images, missing bibliography. Codifies source-code validation, `url_reachable`, skill injection, layered defense. |
