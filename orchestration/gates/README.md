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

| File | Gate | Purpose |
|------|------|---------|
| `G1.contract.json` | Intake Approval | Validates intake documents exist |
| `G2.contract.json` | Research Complete | Validates research package completeness |
| `G3.contract.json` | Spec Approval | Validates 6-layer spec structure |

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
