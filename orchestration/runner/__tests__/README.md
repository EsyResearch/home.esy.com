# Pipeline Tests

Tests for the orchestration pipeline infrastructure — validators, contracts, and gate enforcement.

## Quick Reference

```bash
npm test                    # Run all tests (validator + contracts + regression)
npm run test:validator      # Unit tests only
npm run test:contracts      # Schema tests only
npm run test:regression     # Fixture-based regression tests only
npm run test:smoke          # Network smoke tests (hits images.esy.com, not in npm test)
```

## Test Layers

### 1. Validator Unit Tests — `validator.test.js`

Tests each validation function in `lib/validator.js` in isolation using temp files.

Every validation type must have at least:
- One test where it passes
- One test where it fails
- One edge case test (missing file, empty content, malformed input)

Covered types: `fileExists`, `dirExists`, `countFiles`, `countSources`, `containsHeadings`, `containsText`, `notContains`, `frontmatterStatus`, `regexMatch`, `minRegexCount`, `urlReachable`, `resolveAnyOfTarget`.

The `urlReachable` tests spin up a local HTTP server to test pass/fail/tolerance without hitting real infrastructure.

### 2. Contract Schema Tests — `contracts.test.js`

Loads every `.contract.json` in `orchestration/gates/contracts/` and validates:

- Valid JSON syntax
- Required fields (`gate`, `name`, `required_outputs`)
- Gate code matches filename (`G5.contract.json` must have `"gate": "G5"`)
- At least one output defined (`all_of` or `any_of`)
- All validation `type` values are implemented in `validator.js`
- Path template variables are valid (`{slug}`, `{artifact_path}`, `{client_component}`)
- Every workflow gate has a contract, every contract is in the workflow
- Type-specific schema checks for `contains_text`, `frontmatter_status`, `regex_match`, `min_regex_count`, `url_reachable`, `required_skills`

This is the defense against phantom validation types — if a contract references a type that doesn't exist in the validator, these tests catch it.

### 3. Regression Tests — `regression.test.js`

Auto-discovers persistent fixture directories in `__fixtures__/` and runs real gate contracts against them. See [Fixtures](#fixtures) below.

### 4. Smoke Tests — `smoke.test.js`

Makes real HTTP HEAD requests to `images.esy.com` URLs found across all published essays. Verifies R2 image uploads are reachable.

**Not included in `npm test`** — requires network access and hits production. Run explicitly with `npm run test:smoke` after R2 migrations or before publication.

---

## Fixtures

Fixtures live in `__fixtures__/`. Each fixture is a directory containing real essay files and a `manifest.json`.

### Current Fixtures

| Fixture | What's Wrong | Gates Tested | Expected |
|---------|-------------|--------------|----------|
| `baseline` | Nothing — known-good essay | G5, G5.2, G5.3, G6.6, G4.7, G8, G9 | All pass |
| `no-wrapper` | `page.tsx` missing ArtifactDetailWrapper | G5, G9 | Fail |
| `emoji-in-client` | Client component has emoji characters | G5, G6.6 | Fail |
| `ai-slop` | Client has "delve", "tapestry" phrases | G6.6 | Warn |
| `no-diagram-contracts` | Client has no `@diagram-contract` blocks | G5.3 | Fail |
| `failed-audit` | Design fidelity audit has `status: FAIL` | G5.2 | Fail |
| `missing-page` | No `page.tsx` at all | G5 | Fail |
| `rejected-publication` | Publication approval is REJECTED | G9 | Fail |
| `hotlinked-images` | `images.ts` has `upload.wikimedia.org` URLs | G4.7, G8 | Fail |
| `missing-bibliography` | Client has no Sources section | G5, G8 | Fail |

### manifest.json Format

```json
{
  "description": "Human-readable explanation of what this fixture tests and why.",
  "extends": "baseline",
  "exclude": ["page.tsx"],
  "assertions": [
    { "gate": "G5", "expect": "fail", "reason": "page.tsx is missing entirely" }
  ]
}
```

**Fields:**

- **`description`** (required): What this fixture tests and why it exists. Reference the postmortem or incident if applicable.
- **`extends`** (optional): Name of another fixture directory to copy as the base before overlaying this fixture's files. Most bad fixtures use `"extends": "baseline"`.
- **`exclude`** (optional): Array of relative file paths to delete after copying the base. Used to test missing files (e.g., `["page.tsx"]` removes page.tsx from the copied baseline).
- **`assertions`** (required): Array of gate/expectation pairs.
  - `gate`: Gate code (e.g., `"G5"`, `"G4.7"`)
  - `expect`: `"pass"`, `"fail"`, or `"warn"`
  - `reason` (optional): Why this outcome is expected — shows in the test name

### How It Works

1. The test runner scans `__fixtures__/` for directories containing `manifest.json`
2. For each fixture, it reads the manifest
3. Creates a temp directory at `src/app/essays/__test-fixture-{timestamp}/`
4. If `extends` is set, copies the base fixture's files into the temp dir
5. Copies this fixture's files on top (overriding any from the base)
6. If `exclude` is set, deletes those files
7. Runs each assertion's gate contract against the temp dir
8. Asserts pass/fail/warn matches the expectation
9. Cleans up the temp dir

`url_reachable` validations are filtered out in regression tests — those require real network calls and are covered by `smoke.test.js`.

### Adding a New Fixture

1. Create a directory in `__fixtures__/` with a descriptive name (e.g., `inline-hardcoded-urls`)

2. Create `manifest.json`:
   ```json
   {
     "description": "Client component has hardcoded image URLs instead of IMAGES constant",
     "extends": "baseline",
     "assertions": [
       { "gate": "G5", "expect": "fail", "reason": "regex_match requires import from ./images" }
     ]
   }
   ```

3. Add the broken file(s). Only include files that differ from baseline — `extends` handles the rest:
   ```
   __fixtures__/inline-hardcoded-urls/
     manifest.json
     TestEssayClient.tsx    ← the one file that's different
   ```

4. Run the tests:
   ```bash
   npm run test:regression
   ```

   The new fixture is auto-discovered. No changes to `regression.test.js` needed.

### Design Rules

- **One failure mode per fixture** (or a documented compound scenario)
- **Use `extends: "baseline"`** and only override the broken file(s)
- **Name the directory after what's wrong**, not after the gate (e.g., `hotlinked-images` not `fails-g47`)
- **Include a reason in assertions** — it shows in test output and helps debugging
- **Reference the incident** in the description if this fixture was created from a postmortem

### The Baseline

The `baseline` fixture is the one known-good essay. It must pass every gate that any other fixture tests against. If you add a new gate to any fixture's assertions, make sure `baseline` also passes it.

Baseline contents:
- `page.tsx` — ArtifactDetailWrapper, ESSAY_META, metadata
- `TestEssayClient.tsx` — `@diagram-contract` blocks, `import from './images'`, 6 `<img>` tags with `src={IMAGES.xxx}`, Sources section, IMAGE_CREDITS, SOURCES
- `images.ts` — 6 `images.esy.com` URLs, IMAGE_CREDITS, SOURCES, `as const`
- `test-fixture.css` — CSS with design tokens
- Markdown audit files for G1, G4, G4.1, G5.2, G5.3
- `research/` directory with CITATIONS (8 sources), IMAGE-SOURCES, CONTENT-BIBLIOGRAPHY-AUDIT, CITATION-AUDIT, PROSE-QUALITY-AUDIT, SCROLL-CERTIFICATION, PUBLICATION-CERTIFICATION, PUBLICATION-APPROVAL

---

## Pre-Commit Hook

A git pre-commit hook runs `npm test` when `orchestration/` files are staged.

**Install:**
```bash
npm run test:install-hook
```

If tests fail, the commit is blocked. To bypass in emergencies: `git commit --no-verify`.

---

## Adding a New Validation Type (TDD Workflow)

1. Write unit tests in `validator.test.js` first (pass, fail, edge case)
2. Implement the function in `lib/validator.js`
3. Run `npm run test:validator`
4. Add the type to `IMPLEMENTED_VALIDATION_TYPES` in `contracts.test.js`
5. Add schema validation blocks if the type has specific fields (e.g., regex, min_count)
6. Add the type to contracts that need it
7. Create a fixture that exercises the new type
8. Run `npm test`

## Postmortem Workflow

When a postmortem identifies a leaky gate:

1. Create a fixture that reproduces the exact failure
2. Run `npm run test:regression` — confirm the new fixture fails as expected
3. If it doesn't fail (the leak is real), fix the validator/contract
4. Run `npm test` — all tests green
5. Reference the postmortem in the fixture's `manifest.json` description
