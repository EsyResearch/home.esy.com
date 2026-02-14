# Pipeline Testing Standard: Proving Gates Do What They Say

> Version: 1.0
> Created: February 9, 2026
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

**The critical test**: Validation type existence. If a contract declares `"type": "contract_coverage"` and the validator doesn't implement it, this test fails. This is how we prevent the exact class of bug that let `@diagram-contract` enforcement silently disappear.

**Coverage rule**: Every `.contract.json` in `orchestration/gates/contracts/` is automatically included. No manual registration. Add a contract file, the tests find it.

**File**: `orchestration/runner/__tests__/contracts.test.js`

---

### Layer 3: Regression Tests

> "Does the full contract → validator chain catch real failures?"

These tests are the most important. They create synthetic essay fixtures (a temporary directory with real files), run actual gate contracts against them, and verify the correct pass/fail outcome.

**What's tested:**

| Scenario | Expected Result | Why It Matters |
|----------|----------------|----------------|
| Known-good essay with all artifacts | All gates PASS | Proves contracts don't have false positives |
| Missing `ArtifactDetailWrapper` | G5 and G9 FAIL | The speed-of-everything bug |
| Emoji in client component | G5 and G6.6 FAIL | Anti-pattern enforcement |
| AI slop phrases in prose | G6.6 warns | Prose quality gate detects patterns |
| Missing `@diagram-contract` blocks | G5.3 FAILS | Diagram contract enforcement |
| Audit report with `status: FAIL` | G5.2 FAILS | Failed audits block pipeline |
| Missing `page.tsx` entirely | G5 FAILS | Core artifact enforcement |
| Rejected publication (`REJECTED`) | G9 FAILS | Rejection marker enforcement |
| Missing audit file (all paths) | Gate FAILS | RC-3 fix: `not_contains` on missing files |
| All three original bugs at once | G5, G5.3, G6.6, G9 all FAIL | Compound regression |

**The critical test**: "The original speed-of-everything failures." This test recreates the exact combination of bugs from the incident — missing wrapper, emoji, no diagram-contracts — in a single fixture and verifies that MULTIPLE gates independently catch the problems. If the pipeline is ever weakened to the point where this essay could pass, this test screams.

**Fixture strategy**: Tests create temporary essay directories inside the real repo (needed for `contract-loader.js` path resolution to work), run contracts, then clean up. No persistent fixture files committed. Every test is self-contained.

**Coverage rule**: Every known failure mode from a postmortem MUST become a regression test. The test name should reference the root cause ID (e.g., "RC-3 fix: not_contains on missing files").

**File**: `orchestration/runner/__tests__/regression.test.js`

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

## Fixture Design Principles

### Known-Good Fixtures

A known-good fixture is a synthetic essay that satisfies ALL contracts for the tested gates. It serves as the baseline — if a known-good fixture starts failing, something broke in the pipeline itself.

**Requirements:**
- `page.tsx` with `ArtifactDetailWrapper`, `ESSAY_META`, and `@/components/ArtifactDetail` import
- Client component with `@diagram-contract` blocks, NO emoji, NO AI slop phrases
- CSS file with design tokens
- All required audit reports with `status: PASS` frontmatter
- CITATIONS.md with ≥ 8 sources
- All gate-specific artifacts (DESIGN-RESEARCH.md, reconciliation reports, etc.)

### Known-Bad Fixtures

A known-bad fixture intentionally violates a specific contract requirement. Each known-bad fixture should test exactly ONE failure mode (though compound tests are also valuable).

**Design rules:**
- Start from the known-good fixture and break exactly one thing
- The fixture name should describe what's broken (e.g., `createBadEssay_NoWrapper`)
- The test should assert the SPECIFIC validation that catches the failure, not just `result.pass === false`
- If the failure should be caught by multiple gates, test all of them

### Fixture Lifecycle

Tests create temporary directories inside the repo at `src/app/essays/__test-essay-{timestamp}/`. This is necessary because `contract-loader.js` resolves paths relative to the repo root. Tests MUST clean up after themselves in `afterEach`.

**Never commit fixture files.** All fixtures are created programmatically in tests.

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
| `npm test` | All test files | Before any merge, after any pipeline change |
| `npm run test:validator` | `validator.test.js` | After modifying `validator.js` |
| `npm run test:contracts` | `contracts.test.js` | After modifying any `.contract.json` or `visual-essay.json` |
| `npm run test:regression` | `regression.test.js` | After modifying contracts or validators, after postmortems |

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

## Anti-Patterns

| Anti-Pattern | Why It's Dangerous | Do This Instead |
|--------------|-------------------|-----------------|
| Modifying `validator.js` without running tests | Regression risk on all validation types | Run `npm run test:validator` after every change |
| Adding a validation type to a contract without checking it's implemented | Phantom type silently skipped | `npm run test:contracts` catches this |
| Writing a postmortem without a regression test | The same leak can recur | Write the test in the same session as the fix |
| Committing fixture files | Pollutes the repo, fixtures drift | Create fixtures programmatically in tests |
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

---

*This standard governs how the orchestration pipeline infrastructure is tested. It complements the Gate Accountability Standard (which defines what gates enforce) and the Pipeline Execution Standard (which defines how pipelines run). Compliance is mandatory before any workflow template is used in production.*
