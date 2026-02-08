# Orchestration Runner

A terminal-based CLI for tracking orchestration workflow runs with durable execution records.

## Overview

The runner produces two types of output for each workflow run:

| Directory | Purpose | Git Status |
|-----------|---------|------------|
| `orchestration/runs/<run-id>/record/` | Durable truth (RUN.json, gate attempts) | **COMMITTED** |
| `orchestration/runs/<run-id>/logs/` | Verbose logs, prompts, temp files | **GITIGNORED** |

## Installation

No installation required. Uses Node.js (already available in this project).

## Standard Convention

**Every essay lives in one directory:** `src/app/essays/{slug}/`

```
src/app/essays/{slug}/
├── page.tsx                    ← Next.js route (/essays/{slug})
├── {Name}Client.tsx|jsx        ← client component
├── {slug}.css                  ← styles
├── DESIGN-RESEARCH.md          ← design research (G4 output)
├── G1-INTAKE.md                ← intake approval (G1 output)
├── research/                   ← research package (G2 output)
│   ├── CITATIONS.md
│   ├── STATISTICS.md
│   └── ...
└── audits/                     ← audit reports (G6+ outputs)
```

The runner auto-derives the essay directory from `--slug`. No separate path args needed.

## Quick Start (CI Mode - Recommended)

Run the complete visual-essay pipeline with human-in-the-loop execution:

```bash
node orchestration/runner/cli.js run visual-essay \
  --slug the-geography-of-water-scarcity \
  --depth standard
```

The runner will:
1. Auto-derive essay dir: `src/app/essays/the-geography-of-water-scarcity/`
2. Validate the directory follows the standard convention
3. Initialize a run record with all 13 gates pre-populated
4. For each gate (G1 → G2 → G3 → G4 → G4.1 → G4.5 → G5 → G5.2 → G5.5 → G6 → G7 → G8 → G9):
   - Generate a **Prompt Packet** with agent-specific instructions
   - Pause and wait for you to execute in Claude Code
   - Validate outputs against the gate contract
   - Hash all artifacts and record results
5. Stop on failure or complete when all gates pass

### With a Prompt File

```bash
node orchestration/runner/cli.js run visual-essay \
  --slug the-word-robot \
  --prompt-file prompts/robot-topic.txt
```

### With Path Override

If an essay directory doesn't follow the standard convention, override:

```bash
node orchestration/runner/cli.js run visual-essay \
  --slug the-word-robot \
  --artifact-path src/app/essays/etymology/the-word-robot \
  --depth standard
```

## Quick Start (Manual Mode)

For fine-grained control, use individual commands:

```bash
# 1. Start a new run
node orchestration/runner/cli.js run start \
  --workflow visual-essay \
  --slug the-word-robot \
  --depth standard

# 2. Start a gate
node orchestration/runner/cli.js gate start \
  --run <run-id> \
  --gate G2 \
  --agent research-orchestrator

# 3. (Run your agent manually in terminal)

# 4. Finish the gate (runs validations)
node orchestration/runner/cli.js gate finish \
  --run <run-id> \
  --gate G2
```

## Commands

### Run Commands

#### `run visual-essay` (Recommended)
Run the complete visual-essay pipeline with human-in-the-loop execution.

```bash
node orchestration/runner/cli.js run visual-essay \
  --slug <slug> \
  [--artifact-path <path>] \
  [--depth quick|standard|deep] \
  [--prompt-file <path>]
```

**Options:**
- `--slug` — Essay slug (REQUIRED). Auto-derives essay dir: `src/app/essays/{slug}`
- `--artifact-path` — Override essay directory (default: `src/app/essays/{slug}`)
- `--depth` — Research depth mode (default: `standard`)
- `--prompt-file` — Path to topic/prompt file (optional)

**Behavior:**
1. Creates run record and loads workflow definition
2. For each gate: generates prompt packet, pauses for human execution, validates
3. Stops pipeline on any gate failure
4. Generates prompt packets in `logs/gates/<gate>/prompt.txt`

#### `run start`
Initialize a new workflow run (manual mode).

```bash
node orchestration/runner/cli.js run start \
  --workflow <name> \
  --slug <slug> \
  [--artifact-path <path>] \
  [--depth quick|standard|deep]
```

**Options:**
- `--workflow` — Workflow name (e.g., `visual-essay`)
- `--slug` — Essay or project slug (REQUIRED). Auto-derives essay dir: `src/app/essays/{slug}`
- `--artifact-path` — Override essay directory (default: `src/app/essays/{slug}`)
- `--depth` — Research depth mode (default: `standard`)

**Output:**
- Creates `orchestration/runs/<run-id>/record/RUN.json`
- Creates `orchestration/runs/<run-id>/logs/` directory

#### `run list`
List all runs.

```bash
node orchestration/runner/cli.js run list
```

#### `run show`
Show full run record.

```bash
node orchestration/runner/cli.js run show --run <run-id>
```

#### `run complete`
Mark a run as complete.

```bash
node orchestration/runner/cli.js run complete --run <run-id> [--status PASSED|FAILED|CANCELED]
```

### Gate Commands

#### `gate start`
Start a new gate attempt.

```bash
node orchestration/runner/cli.js gate start \
  --run <run-id> \
  --gate <Gx> \
  --agent <agent-name>
```

**Example:**
```bash
node orchestration/runner/cli.js gate start \
  --run run_20260119T143012Z_the-word-robot_ab12cd \
  --gate G2 \
  --agent research-orchestrator
```

#### `gate finish`
Finish a gate and run contract validations.

```bash
node orchestration/runner/cli.js gate finish \
  --run <run-id> \
  --gate <Gx>
```

**What happens:**
1. Loads gate contract from `orchestration/gates/contracts/<Gx>.contract.json`
2. Resolves required output paths
3. Validates file existence
4. Runs additional validations (min_sources, contains_headings, etc.)
5. Computes SHA256 hashes for all existing outputs
6. Updates `RUN.json` with results
7. Creates `record/gates/<Gx>/attempt-<n>.json`
8. Returns PASS or FAIL

#### `gate fail`
Manually fail a gate with a reason.

```bash
node orchestration/runner/cli.js gate fail \
  --run <run-id> \
  --gate <Gx> \
  --reason "Missing required quotes"
```

### Invocation Commands

#### `invocation record`
Record an agent invocation in the run.

```bash
node orchestration/runner/cli.js invocation record \
  --run <run-id> \
  --gate <Gx> \
  --agent <agent-name> \
  [--status SUCCESS|FAIL]
```

## Run Record Structure

### RUN.json

```json
{
  "run_id": "run_20260119T143012Z_the-word-robot_ab12cd",
  "workflow": {
    "name": "visual-essay",
    "version": "local-dev",
    "slug": "the-word-robot",
    "artifact_path": "src/app/essays/the-word-robot"
  },
  "depth": "standard",
  "status": "RUNNING",
  "started_at": "2026-01-19T14:30:12.000Z",
  "finished_at": null,
  "gates": [
    {
      "gate": "G1",
      "name": "Intake Approval",
      "status": "PASS",
      "attempts": [...]
    }
  ],
  "invocations": [...],
  "artifacts_index": [...],
  "validations": [...],
  "events": [...]
}
```

### Gate Attempt Files

Each gate attempt creates a file at:
`orchestration/runs/<run-id>/record/gates/<Gx>/attempt-<n>.json`

```json
{
  "attempt": 1,
  "status": "PASS",
  "started_at": "2026-01-19T14:31:00.000Z",
  "finished_at": "2026-01-19T14:32:00.000Z",
  "agent": "research-orchestrator",
  "invocation_ids": ["inv_1705673460000_abc1"],
  "required_outputs": [
    "{artifact_path}/research/CITATIONS.md"
  ],
  "artifacts": [
    {
      "path": "{artifact_path}/research/CITATIONS.md",
      "sha256": "abc123...",
      "exists": true
    }
  ],
  "validations": [
    {
      "type": "file_exists",
      "path": "{artifact_path}/research/CITATIONS.md",
      "pass": true
    }
  ],
  "failure_reason": null
}
```

## Gate Contracts

Gate contracts are stored in `orchestration/gates/contracts/`:

| Contract | Gate | Phase | Purpose |
|----------|------|-------|---------|
| `G1.contract.json` | Intake Approval | Intake | Validates intake documents exist |
| `G2.contract.json` | Research Complete | Research | Validates research substance: dir exists, CITATIONS.md present, min file count by depth |
| `G3.contract.json` | Spec Approval | Spec Build | Validates 6-layer spec with all required layer headings |
| `G4.contract.json` | Design Research | Production | Validates DESIGN-RESEARCH.md exists with color/typography/animation |
| `G4.1.contract.json` | Design Research Reconciliation | Production | Validates no [UNRECONCILED] or [COLLISION] markers |
| `G4.5.contract.json` | Image Sourcing | Production | Validates image audit/migration/TS exists |
| `G5.contract.json` | Content Complete | Production | Validates page.tsx and CSS implementation exist |
| `G5.2.contract.json` | Design Research Integration | Production | Validates both implementation and design research files exist |
| `G5.5.contract.json` | Bibliography Implementation | Production | Validates bibliography audit report exists |
| `G6.contract.json` | Citation Audit | Audit | Validates citation audit report exists |
| `G7.contract.json` | Scroll Certification | Audit | Validates scroll certification report exists |
| `G8.contract.json` | Publication Certification | Publication | Validates publication certification report exists |
| `G9.contract.json` | Publication Approval | Publication | Validates director sign-off document exists |

### Path Variables

Contracts support path variables:
- `{slug}` — The essay/project slug (e.g., `the-geography-of-water-scarcity`)
- `{artifact_path}` — The essay directory (default: `src/app/essays/{slug}`)

**Single-directory convention**: All essay files (implementation, research, design, audits) live together in `src/app/essays/{slug}/`. The runner auto-derives this from `--slug`.

### Validation Types

| Type | Description |
|------|-------------|
| `file_exists` | Check that file exists |
| `dir_exists` | Check that directory exists |
| `min_file_count` | Count files matching a pattern in a directory (depth-based thresholds) |
| `min_sources` | Count sources in a file using multi-heuristic detection |
| `min_sources_any_of` | Like `min_sources` but checks multiple possible files, uses the best |
| `contains_headings` | Check for required headings |
| `not_contains` | Warn/fail if pattern found |

### G2 Research Contract (Flexible, Dual-Profile)

G2 validates **substance over form**. Two research profiles exist — the gate accepts either:

| Check | Quick | Standard | Deep |
|-------|-------|----------|------|
| `research/` directory exists | ✅ | ✅ | ✅ |
| `CITATIONS.md` OR `CLAIMS.md` exists | ✅ | ✅ | ✅ |
| Min research files | 1 | 3 | 6 |
| Min sources in source-tracking file | 3 | 8 | 15 |

**Historical profile** (narrative essays): `CITATIONS.md` + FIGURES, QUOTES, TIMELINE, VISUALS, ERA-GUIDE
**Conceptual profile** (explanatory essays): `CLAIMS.md` + CONCEPTS, SEQUENCE, DEFINITIONS, ANALOGIES, MISCONCEPTIONS
**Data journalism extension** (adds to conceptual): DATASETS, STATISTICS, COMPARISONS, PROJECTIONS

Agents choose the appropriate profile based on domain detection. See the contract's `recommended_files` section for the full menu.

## Integration with Agents

The runner is designed to wrap existing agent invocations:

```bash
# Before running agent
node orchestration/runner/cli.js gate start --run $RUN_ID --gate G2 --agent research-orchestrator

# Run your agent (manually or via Claude)
# ... agent produces files ...

# After agent completes
node orchestration/runner/cli.js gate finish --run $RUN_ID --gate G2
```

## Non-Goals

This runner does NOT:
- Replace how agents run
- Build a web UI
- Add database storage
- Add queue systems
- Refactor existing agents

It only adds:
- Durable run records
- Contract validation
- Output hashing
- Pass/fail verification

## File Locations

```
orchestration/
├── gates/
│   ├── contracts/
│   │   ├── G1.contract.json        Intake Approval
│   │   ├── G2.contract.json        Research Complete
│   │   ├── G3.contract.json        Spec Approval
│   │   ├── G4.contract.json        Design Research
│   │   ├── G4.1.contract.json      Design Research Reconciliation
│   │   ├── G4.5.contract.json      Image Sourcing
│   │   ├── G5.contract.json        Content Complete
│   │   ├── G5.2.contract.json      Design Research Integration
│   │   ├── G5.5.contract.json      Bibliography Implementation
│   │   ├── G6.contract.json        Citation Audit
│   │   ├── G7.contract.json        Scroll Certification
│   │   ├── G8.contract.json        Publication Certification
│   │   └── G9.contract.json        Publication Approval
│   └── README.md
├── runner/
│   ├── cli.js                      Main CLI entry point
│   ├── lib/
│   │   ├── contract-loader.js      Contract loading and path resolution
│   │   ├── hasher.js               SHA256 hashing utilities
│   │   ├── prompt-generator.js     Prompt packet generation for each gate
│   │   ├── run-manager.js          Run record CRUD and gate lifecycle
│   │   └── validator.js            Validation logic for gate contracts
│   ├── workflows/
│   │   └── visual-essay.json       13-gate workflow definition
│   └── README.md
└── runs/
    └── <run-id>/
        ├── record/                  ← COMMITTED (durable truth)
        │   ├── RUN.json
        │   └── gates/
        │       ├── G1/
        │       │   └── attempt-1.json
        │       ├── G2/
        │       │   └── attempt-1.json
        │       └── ...
        └── logs/                    ← GITIGNORED (verbose)
            ├── prompts/
            │   └── original.txt
            └── gates/
                ├── G1/
                │   └── prompt.txt
                └── ...
```
