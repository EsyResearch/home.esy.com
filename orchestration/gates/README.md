# Gate Contracts

Gate contracts define the validation requirements for each quality gate in the orchestration pipeline.

## Overview

Each contract is a JSON file that specifies:
- **gate**: Gate identifier (e.g., "G1", "G2", "G3")
- **name**: Human-readable gate name
- **blocking**: Whether failure stops the pipeline
- **required_outputs**: Files that must exist for the gate to pass
- **validations**: Additional checks beyond file existence
- **notes**: Implementation guidance

## Path Resolution

Paths in contracts support variable substitution:
- `{slug}` — The essay/project slug
- `{artifact_path}` — The essay directory path (e.g., `src/app/essays/etymology/the-word-robot`)

Paths starting with `orchestration/` are resolved from repo root.
Other paths are resolved relative to `artifact_path`.

## Contract Files

| File | Gate | Phase | Purpose |
|------|------|-------|---------|
| `G1.contract.json` | Intake Approval | Intake | Validates intake documents exist |
| `G2.contract.json` | Research Complete | Research | Validates research package completeness |
| `G3.contract.json` | Spec Approval | Spec Build | Validates 6-layer spec structure |
| `G4.contract.json` | Design Research | Production | Validates subject-derived DESIGN-RESEARCH.md |
| `G4.1.contract.json` | Design Research Reconciliation | Production | Validates no reconciliation issues remain |
| `G4.5.contract.json` | Image Sourcing | Production | Validates image audit/sourcing artifact |
| `G4.6.contract.json` | Visualization Technology Decision | Production | Validates VIZ-TECH-DECISIONS.md with tier assignments |
| `G4.7.contract.json` | R2 Image Upload | Production | Validates images uploaded to R2, images.ts rewritten |
| `G5.contract.json` | Content Complete | Production | Validates page.tsx and CSS implementation |
| `G5.2.contract.json` | Design Research Integration | Production | Validates CSS↔TSX binding prerequisites |
| `G5.3.contract.json` | Diagram-Code Reconciliation | Production | Validates `@diagram-contract` invariants match code behavior |
| `G5.5.contract.json` | Bibliography Implementation | Production | Validates bibliography audit report |
| `G6.contract.json` | Citation Audit | Audit | Validates citation audit report |
| `G7.contract.json` | Scroll Certification | Audit | Validates scroll certification report |
| `G8.contract.json` | Publication Certification | Publication | Validates publication certification |
| `G9.contract.json` | Publication Approval | Publication | Auto-registers essay in `visualEssays.ts` via pre-script, validates director sign-off and index entry |

## Pre-Validation Scripts

Contracts can declare `pre_scripts` — idempotent scripts the runner executes before validation. This enables automated setup (e.g., registering an essay in the central index) that must happen before contract checks run.

```json
{
  "pre_scripts": [
    { "path": "scripts/register-essay.mjs", "args": ["--slug", "{slug}", "--artifact-path", "{artifact_path}"] }
  ]
}
```

Scripts run with `{slug}` and `{artifact_path}` variable substitution. A failing pre-script logs a warning but does not block validation. See the [Runner README](../runner/README.md) for full details.

**Current usage:** G9 runs `register-essay.mjs` to auto-insert the essay into `src/data/visualEssays.ts`.

## Validation Types

### file_exists
Checks that specified files exist on disk.

### min_sources
Counts sources in CITATIONS.md using a simple heuristic:
- Counts `### Source` headings, OR
- Counts unique URLs (http/https)

Thresholds vary by depth mode (quick: 3, standard: 8, deep: 15).

### contains_headings
Verifies that a file contains required section headings.

### not_contains
Warns or fails if a file contains a forbidden pattern (e.g., `[DRAFT]`).

## Usage

The runner CLI loads these contracts to validate gates:

```bash
# Start a run
node orchestration/runner/cli.js run start --workflow visual-essay --slug the-word-robot --artifact-path src/app/essays/etymology/the-word-robot

# Finish a gate (runs contract validation)
node orchestration/runner/cli.js gate finish --run <run-id> --gate G2
```

See `/orchestration/runner/README.md` for full CLI documentation.
