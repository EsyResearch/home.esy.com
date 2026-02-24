# Pipeline Testing Standard: Proving Gates Do What They Say

> Version: 1.1
> Created: February 9, 2026
> Updated: February 24, 2026
> Status: Active

## Purpose

This standard defines how the orchestration pipeline itself is tested. Not the essays — the infrastructure that validates them. It establishes the testing philosophy, the testing pyramid, the fixture strategy, and the mandatory coverage requirements for all contracts, validators, and workflows.

A pipeline whose gates don't enforce what they claim is worse than no pipeline at all. It creates false confidence. An essay that fails quality standards is a problem. An essay that fails quality standards *while the pipeline reports all gates PASS* is a systemic betrayal of trust.

**The core principle**: If an essay doesn't meet standards, the cause should be traceable to an architectural decision — the wrong model assigned to a gate, the wrong agent for a set of tasks, a missing gate in the sequence, or a misalignment between gate boundaries and the problem they're supposed to solve. These are real engineering problems worth solving. What should NEVER be the cause is leaky infrastructure — validators with bugs, contracts referencing phantom types, or gates that silently skip checks. Architecture is the hard problem. Plumbing is the solved problem. Tests keep it solved.

---

## Origin

This standard was born from the "The Speed of Everything" postmortem (February 9, 2026). The pipeline ran 13 gates, reported all PASS, and produced an essay with:

- Missing `ArtifactDetailWrapper` (a red-line violation)
- Emoji icons instead of SVG illustrations
- AI-boilerplate prose
- Zero `@diagram-contract` blocks
- Fabricated audit reports

Root cause analysis revealed 10 systemic failures. Three were directly caused by untested infrastructure:

1. **`not_contains` silently passed on missing files** — a validator bug no unit test would have missed
2. **`contract_coverage` validation type didn't exist** — a contract referenced a phantom type, silently skipped
3. **Emoji regex used wrong flags** — `gm` instead of `gmu` for Unicode property escapes

A single test file would have caught all three. The pipeline that validates essay quality had zero tests validating its own correctness.

---

## The Testing Pyramid for Agentic Pipelines

Agentic pipelines have a different testing pyramid than traditional software. The system under test is not a web server — it's a chain of contracts, validators, and workflow definitions that gate creative output.

```
                    ┌─────────────────┐
                    │  REGRESSION      │  ← Integration: full contract chain
                    │  TESTS           │    against known-good/bad fixtures
                    ├─────────────────┤
                    │  CONTRACT        │  ← Schema: every .contract.json
                    │  SCHEMA TESTS    │    is structurally valid
                    ├─────────────────┤
                    │  VALIDATOR       │  ← Unit: each validation type
                    │  UNIT TESTS      │    with controlled inputs
                    └─────────────────┘
```

### Layer 1: Validator Unit Tests

> "Does each validation function do what it claims?"

These are fast, isolated, and use temp files. Every validation type in `validator.js` has a corresponding test suite.

**What's tested:**
- `fileExists` / `dirExists` — basic path checks
- `countFiles` — glob matching
- `countSources` — heuristic source counting (H3 headings, URLs, structured entries)
- `containsHeadings` — required string presence
- `containsText` — required patterns (single and array)
- `notContains` — forbidden patterns, **including the critical missing-file behavior**
- `frontmatterStatus` — YAML parsing with equality, negation, and threshold checks
- `regexMatch` — pattern matching with Unicode support and `must_not_match` mode
- `minRegexCount` — minimum occurrence counting with regex patterns
- `urlReachable` — HTTP HEAD requests with local server mock (pass, 404, max_failures tolerance, missing file)
- `resolveAnyOfTarget` — fallback resolution for `any_of` outputs

**The critical test**: `notContains` on a missing file MUST FAIL by default. This was the silent bypass that let fabricated audits through. The test for this behavior is a regression guardrail — if anyone changes `notContains` to pass on missing files again, the test breaks immediately.

**Coverage rule**: Every validation type exported from `validator.js` MUST have at least:
- One test where it passes
- One test where it fails
- One test for the edge case (missing file, empty content, malformed input)

**File**: `orchestration/runner/__tests__/validator.test.js`

---

### Layer 2: Contract Schema Tests

> "Does every .contract.json reference things that actually exist?"

These tests load every contract file and verify structural correctness. They are the defense against phantom validation types — the exact bug where `contract_coverage` was declared in a contract but never implemented in the validator.

**What's tested:**

| Check | What it catches |
|-------|----------------|
| Valid JSON | Syntax errors in contracts |
| Required fields (`gate`, `name`, `required_outputs`) | Incomplete contracts |
| Gate code matches filename | `G5.contract.json` must have `"gate": "G5"` |
| At least one output (`all_of` or `any_of`) | Contracts that validate nothing |
| All `type` values are IMPLEMENTED | Phantom validation types silently skipped |
| Path variables are VALID (`{slug}`, `{artifact_path}`, `{client_component}`) | Unresolvable path templates |
| Every workflow gate has a contract file | Workflow references non-existent contract |
| Every contract is in the workflow | Orphaned contracts with no pipeline entry |
| `contains_text` validations have patterns | Empty pattern arrays that always pass |
| `frontmatter_status` validations have checks | Missing check definitions |
| `regex_match` patterns compile without error | Invalid regex that would crash at runtime |
| `min_regex_count` has valid regex + min_count > 0 | Malformed counting validations |
| `url_reachable` url_pattern is valid regex | Invalid URL patterns that crash extraction |
| `required_skills` paths exist on disk | Contracts referencing skills that don't exist |

**The critical test**: Validation type existence. If a contract declares `"type": "contract_coverage"` and the validator doesn't implement it, this test fails. This is how we prevent the exact class of bug that let `@diagram-contract` enforcement silently disappear.

**Coverage rule**: Every `.contract.json` in `orchestration/gates/contracts/` is automatically included. No manual registration. Add a contract file, the tests find it.

**File**: `orchestration/runner/__tests__/contracts.test.js`

---

### Layer 3: Regression Tests

> "Does the full contract → validator chain catch real failures?"

These tests are the most important. They use **persistent fixture directories** — real essay files committed to the repo — and run actual gate contracts against them to verify the correct pass/fail outcome.

**What's tested:**

| Fixture | Expected Result | Why It Matters |
|---------|----------------|----------------|
| `baseline` (known-good essay) | All tested gates PASS | Proves contracts don't have false positives |
| `no-wrapper` | G5 and G9 FAIL | The speed-of-everything bug |
| `emoji-in-client` | G5 and G6.6 FAIL | Anti-pattern enforcement |
| `ai-slop` | G6.6 warns | Prose quality gate detects patterns |
| `no-diagram-contracts` | G5.3 FAILS | Diagram contract enforcement |
| `failed-audit` | G5.2 FAILS | Failed audits block pipeline |
| `missing-page` | G5 FAILS | Core artifact enforcement |
| `rejected-publication` | G9 FAILS | Rejection marker enforcement |
| `hotlinked-images` | G4.7 and G8 FAIL | R2 enforcement (no Wikimedia hotlinks) |
| `missing-bibliography` | G5 and G8 FAIL | Sources/bibliography required |

**Fixture strategy**: Persistent directories in `__tests__/__fixtures__/`. Each fixture has a `manifest.json` declaring which gates to test and expected outcomes. The test runner auto-discovers all fixtures — adding a test case is creating a directory, not writing code. See "Persistent Fixture System" below.

**Coverage rule**: Every known failure mode from a postmortem MUST become a fixture. The manifest description should reference the incident.

**File**: `orchestration/runner/__tests__/regression.test.js`

### Layer 4: Smoke Tests

> "Are R2 image URLs actually live in production?"

Smoke tests make real HTTP HEAD requests to `images.esy.com` URLs found across all published essays. They verify that images uploaded to R2 are reachable. These are NOT run in `npm test` — they require network access and hit production infrastructure.

**Run**: `npm run test:smoke`

**When to use**: After an R2 migration, before publication, or as a periodic health check.

**File**: `orchestration/runner/__tests__/smoke.test.js`

---

## The "Leaky Gate" Anti-Pattern

A **leaky gate** is a gate that reports PASS when it should report FAIL. Leaky gates are the single most dangerous failure mode in an agentic pipeline because they are invisible during normal operation.

### How Gates Leak

| Leak Type | Mechanism | Example | Test Layer That Catches It |
|-----------|-----------|---------|---------------------------|
| **Phantom validation** | Contract references unimplemented type | `contract_coverage` silently skipped | Schema tests |
| **Silent bypass** | Validator passes on unexpected input | `not_contains` passes on missing file | Unit tests |
| **Wrong flags** | Regex or parser misconfigured | `gm` instead of `gmu` for Unicode | Unit tests |
| **Path miss** | Validation targets wrong file | `not_contains` targets non-`any_of` path | Regression tests |
| **Shallow check** | Validation exists but checks too little | Only `file_exists`, not content | Schema tests (minimum validations) |
| **Orphaned contract** | Contract file exists but isn't in workflow | New gate added but workflow not updated | Schema tests |

### The Leak Detection Principle

> **If you can construct a file that is obviously wrong but passes a gate, that gate is leaky.**

Every regression test is an application of this principle. The known-bad fixtures are *obviously* wrong — they have emoji, they're missing the wrapper, they use AI slop phrases. If the pipeline passes them, the pipeline is broken.

### Leak Severity

| Severity | Definition | Response |
|----------|-----------|----------|
| **S0 — Silent Skip** | A validation type doesn't exist and is silently skipped | Immediate fix + regression test. This is the worst kind — the contract *looks* like it enforces something but enforcement doesn't exist. |
| **S1 — Wrong Result** | A validation runs but returns the wrong pass/fail | Immediate fix + regression test. The validator has a bug. |
| **S2 — Insufficient Check** | A validation runs correctly but doesn't check enough | Contract hardening + regression test. The contract needs more validations. |
| **S3 — Missing Gate** | A failure mode has no gate assigned to catch it | New gate + contract + regression test. The pipeline has a coverage gap. |

---

## Test-Driven Development for Pipeline Changes

### When Adding a New Validation Type

1. **Write the unit test FIRST** — define inputs, expected outputs, edge cases
2. Implement the validation function in `validator.js`
3. Run `npm run test:validator` — all tests must pass
4. Run `npm run test:contracts` — no contract should reference the new type yet (unless you're also adding it to a contract)
5. Add the type to any contracts that need it
6. Run `npm test` — full suite

### When Modifying a Contract

1. **Write a regression test FIRST** — create a fixture that should fail under the new contract
2. Run `npm run test:regression` — the new test should FAIL (proving the current contract doesn't catch it)
3. Modify the contract
4. Run `npm run test:regression` — the new test should now PASS
5. Run `npm run test:contracts` — schema validation still passes
6. Run `npm test` — full suite

### When Adding a New Gate

1. Create the `.contract.json` file
2. Run `npm run test:contracts` — it will fail because the new contract isn't in the workflow yet
3. Add the gate to `visual-essay.json` and `prompt-generator.js`
4. Run `npm run test:contracts` — should now pass
5. Write a regression test with a fixture that exercises the new gate
6. Run `npm test` — full suite

### When a Postmortem Identifies a Leak

1. **Write the regression test FIRST** — reproduce the exact failure as a test
2. Run `npm run test:regression` — confirm it fails (proving the leak exists)
3. Fix the validator/contract/workflow
4. Run `npm run test:regression` — confirm the test now passes
5. Run `npm test` — ensure no regressions in other gates
6. Document the fix in the postmortem

---

## Persistent Fixture System

Regression tests use persistent fixture directories committed to the repo at `orchestration/runner/__tests__/__fixtures__/`. Each fixture is a directory containing real essay files and a `manifest.json`.

### Directory Structure

```
__fixtures__/
  baseline/                         Known-good essay (passes all gates)
    manifest.json
    page.tsx
    TestEssayClient.tsx
    images.ts
    test-fixture.css
    G1-INTAKE.md
    DESIGN-RESEARCH.md
    ...audit markdown files...
    research/
      CITATIONS.md
      PROSE-QUALITY-AUDIT.md
      PUBLICATION-CERTIFICATION.md
      ...
  no-wrapper/                       Bad: missing ArtifactDetailWrapper
    manifest.json
    page.tsx                        The one broken file
  hotlinked-images/                 Bad: Wikimedia URLs in images.ts
    manifest.json
    images.ts                       The one broken file
```

### manifest.json

```json
{
  "description": "Essay with hotlinked Wikimedia images instead of R2 URLs",
  "extends": "baseline",
  "exclude": [],
  "assertions": [
    { "gate": "G4.7", "expect": "fail", "reason": "images.ts has upload.wikimedia.org URLs" },
    { "gate": "G8", "expect": "fail", "reason": "Publication gate catches remaining hotlinks" }
  ]
}
```

- **`description`**: Why this fixture exists and what it tests.
- **`extends`**: (optional) Name of another fixture to copy as the base. Most bad fixtures extend `baseline`.
- **`exclude`**: (optional) Files to delete after copying the base (e.g., to test a missing `page.tsx`).
- **`assertions`**: Gate/expect pairs. `"pass"`, `"fail"`, or `"warn"`.

### How the Test Runner Works

1. Scans `__fixtures__/` for directories containing `manifest.json`
2. For each fixture, reads the manifest
3. If `extends` is set, copies the base fixture into a temp dir, then overlays this fixture's files
4. If `exclude` is set, deletes those files
5. Runs each assertion's gate against the temp dir
6. Asserts pass/fail matches the expectation
7. Cleans up the temp dir

`url_reachable` validations are filtered out in regression tests — those require real network calls and are covered by the smoke test layer.

### Adding a New Test Case

1. Create a directory in `__fixtures__/` with a descriptive name
2. Add a `manifest.json` with `extends: "baseline"` and assertions
3. Drop in the broken file(s) that override the baseline
4. Run `npm run test:regression` — the new test should be auto-discovered

No code changes to `regression.test.js` needed.

### Fixture Design Rules

- Each fixture should test ONE failure mode (or a documented compound scenario)
- Bad fixtures should `extends: "baseline"` and override only the broken file(s)
- The fixture directory name should describe what's wrong (`hotlinked-images`, `no-wrapper`)
- The `manifest.json` description should reference the incident or postmortem that motivated it
- If a failure should be caught by multiple gates, add assertions for all of them

### Fixture Lifecycle

At runtime, the test runner copies fixture files into a temporary essay directory at `src/app/essays/__test-fixture-{timestamp}/` (needed for `contract-loader.js` path resolution). Tests clean up automatically in `afterEach`.

---

## Coverage Requirements

### Before a Template Goes to Production

| Requirement | Minimum | Rationale |
|-------------|---------|-----------|
| Validator unit tests | 1 pass + 1 fail + 1 edge per type | Every validation function is verified |
| Contract schema tests | All contracts loaded and validated | No phantom types, no orphaned contracts |
| Known-good regression | 1 fixture passing all critical gates | Proves the pipeline doesn't have false positives |
| Known-bad regressions | 1 per known failure mode from postmortems | Proves known leaks are sealed |
| All tests passing | `npm test` exits 0 | No regressions anywhere |

### After Every Pipeline Modification

Run `npm test`. If any test fails, the modification is not ready. No exceptions.

### After Every Postmortem

Every root cause that involved a leaky gate MUST produce a regression test within the same work session. The postmortem is not complete until the test exists.

---

## Test Runner

The pipeline uses Node.js built-in test runner (`node:test`) — zero dependencies, ships with Node 22+.

### Commands

| Command | Scope | When to Use |
|---------|-------|-------------|
| `npm test` | Validator + contracts + regression | Before any merge, after any pipeline change |
| `npm run test:validator` | `validator.test.js` | After modifying `validator.js` |
| `npm run test:contracts` | `contracts.test.js` | After modifying any `.contract.json` or `visual-essay.json` |
| `npm run test:regression` | `regression.test.js` | After modifying contracts or validators, after postmortems |
| `npm run test:smoke` | `smoke.test.js` | After R2 migrations, before publication (requires network) |

### Test Output

Tests produce TAP (Test Anything Protocol) output. A passing run looks like:

```
# tests 377
# suites 31
# pass 377
# fail 0
```

Any non-zero fail count means the pipeline has a leak.

---

## Pre-Commit Enforcement

A git pre-commit hook runs `npm test` whenever files in `orchestration/` are staged. If any test fails, the commit is blocked.

**Install**: `npm run test:install-hook`

This ensures that pipeline infrastructure changes are always tested before they hit the repo. The hook only triggers for `orchestration/` changes — frontend, content, and other files are unaffected.

To bypass in emergencies: `git commit --no-verify` (not recommended).

---

## Anti-Patterns

| Anti-Pattern | Why It's Dangerous | Do This Instead |
|--------------|-------------------|-----------------|
| Modifying `validator.js` without running tests | Regression risk on all validation types | Run `npm run test:validator` after every change |
| Adding a validation type to a contract without checking it's implemented | Phantom type silently skipped | `npm run test:contracts` catches this |
| Writing a postmortem without a regression test | The same leak can recur | Write the test in the same session as the fix |
| Adding test scenarios by editing regression.test.js | Couples test data to test code | Create a fixture directory with manifest.json instead |
| Testing only happy paths | Leaky gates pass happy paths by definition | Every known-bad fixture is a sad-path test |
| Skipping `npm test` before essay production | Building on a broken pipeline | Always verify the pipeline before using it |
| Fixing a validator bug without understanding WHY it was wrong | Superficial fix may not cover all cases | Write the unit test first, understand the edge case |
| Trusting a gate because it has a contract | Contracts can reference phantom types | Schema tests prove contracts reference real validations |

---

## Relationship to Other Standards

| Standard | Relationship |
|----------|-------------|
| [Gate Accountability](./gate-accountability.md) | Defines what gates SHOULD enforce. This standard proves they DO enforce it. |
| [Pipeline Execution](./pipeline-execution-standard.md) | Defines how pipelines RUN. This standard defines how pipelines are VERIFIED. |
| [Visual Essay Engineering](./visual-essay-engineering-standard.md) | Defines red lines (e.g., ArtifactDetailWrapper). This standard proves contracts catch violations. |
| [Diagram-Code Contract](./diagram-code-contract.md) | Defines `@diagram-contract` annotation. This standard proves G5.3 actually checks for them. |

---

## The Philosophy

There are two categories of failure in an agentic pipeline. They are not equal.

### Category 1: Architectural Failures (Acceptable)

An essay fails to meet quality standards because:
- The wrong model was assigned to a gate (e.g., a fast model on a gate that requires deep reasoning)
- The wrong agent was assigned to a set of tasks (e.g., a generalist where a domain specialist is needed)
- A gate is missing from the sequence (e.g., no prose quality gate existed to catch AI slop)
- Gate boundaries are misaligned with the problem (e.g., one gate tries to do too much, or audit and production are fused)
- The execution model doesn't support the required isolation (e.g., same session for producer and auditor)

These are **real engineering problems**. They require analysis, architectural decisions, and sometimes new infrastructure. They are the hard problems worth solving. When an essay fails for architectural reasons, the pipeline is telling the truth — it's saying "I enforced everything I was told to enforce, and it still wasn't enough."

### Category 2: Infrastructure Failures (Unacceptable)

An essay fails to meet quality standards because:
- A validator has a bug (`not_contains` passes on missing files)
- A contract references a validation type that doesn't exist (`contract_coverage` silently skipped)
- A regex uses wrong flags (`gm` instead of `gmu`)
- A path variable doesn't resolve (`{client_component}` returns garbage)
- A gate is in the contract directory but not in the workflow (orphaned, never runs)

These are **plumbing problems**. They are entirely preventable with tests. When an essay fails for infrastructure reasons, the pipeline is lying — it's saying "all gates PASS" while checks aren't actually running. This is the worst outcome because it destroys trust in the entire system.

### The Boundary

**Tests eliminate Category 2 failures.** Once plumbing is verified, every remaining failure is architectural — a real problem that demands a real solution: reassign models, restructure gates, add missing audit stages, fix agent isolation.

Tests do NOT prove the architecture is correct. They prove the architecture is faithfully executed. The distinction matters: you can have a perfectly tested pipeline with the wrong architecture, and it will reliably produce mediocre output. But you cannot diagnose architectural problems while plumbing is leaky — you'll never know if the gate failed because the model isn't smart enough, or because the validator silently skipped a check.

**Fix the plumbing first. Then fix the architecture. Never confuse the two.**

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-02-09 | Initial standard — testing pyramid, fixture strategy, coverage requirements, TDD for pipeline changes, leaky gate anti-pattern. Born from the "Speed of Everything" postmortem: 10 root causes, 3 caused by untested infrastructure. |
| 1.1 | 2026-02-24 | Persistent fixture system replaces programmatic fixtures. Added Layer 4 (smoke tests) for `url_reachable` with real network calls. Added `min_regex_count`, `url_reachable`, `required_skills` to schema tests. Added pre-commit hook enforcement. Added 2 new fixture scenarios: `hotlinked-images` (G4.7/G8) and `missing-bibliography` (G5/G8). |

---

*This standard governs how the orchestration pipeline infrastructure is tested. It complements the Gate Accountability Standard (which defines what gates enforce) and the Pipeline Execution Standard (which defines how pipelines run). Compliance is mandatory before any workflow template is used in production.*
