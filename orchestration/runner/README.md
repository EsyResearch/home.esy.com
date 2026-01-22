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

## Quick Start (CI Mode - Recommended)

Run the complete visual-essay pipeline with human-in-the-loop execution:

```bash
node orchestration/runner/cli.js run visual-essay \
  --slug the-word-robot \
  --artifact-path src/app/essays/etymology/the-word-robot \
  --depth standard
```

The runner will:
1. Initialize a run record
2. For each gate (G1, G2, G3):
   - Generate a **Prompt Packet** with instructions
   - Pause and wait for you to execute in Claude Code
   - Validate outputs and record results
3. Stop on failure or complete when all gates pass

### With a Prompt File

```bash
node orchestration/runner/cli.js run visual-essay \
  --slug the-word-robot \
  --artifact-path src/app/essays/etymology/the-word-robot \
  --depth standard \
  --prompt-file prompts/robot-topic.txt
```

## Quick Start (Manual Mode)

For fine-grained control, use individual commands:

```bash
# 1. Start a new run
node orchestration/runner/cli.js run start \
  --workflow visual-essay \
  --slug the-word-robot \
  --artifact-path src/app/essays/etymology/the-word-robot \
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
  --artifact-path <path> \
  [--depth quick|standard|deep] \
  [--prompt-file <path>]
```

**Options:**
- `--slug` — Essay slug (REQUIRED)
- `--artifact-path` — Repo-relative path to essay directory (REQUIRED)
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
  --artifact-path <path> \
  [--depth quick|standard|deep]
```

**Options:**
- `--workflow` — Workflow name (e.g., `visual-essay`)
- `--slug` — Essay or project slug (e.g., `the-word-robot`)
- `--artifact-path` — Repo-relative path to essay directory
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
    "artifact_path": "src/app/essays/etymology/the-word-robot"
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
    "{artifact_path}/research/CITATIONS.md",
    "{artifact_path}/research/FIGURES.md"
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

| Contract | Gate | Purpose |
|----------|------|---------|
| `G1.contract.json` | Intake Approval | Validates intake documents exist |
| `G2.contract.json` | Research Complete | Validates research package |
| `G3.contract.json` | Spec Approval | Validates 6-layer spec |

### Path Variables

Contracts support path variables:
- `{slug}` — The essay/project slug
- `{artifact_path}` — The essay directory path

### Validation Types

| Type | Description |
|------|-------------|
| `file_exists` | Check that file exists |
| `min_sources` | Count sources in CITATIONS.md |
| `contains_headings` | Check for required headings |
| `not_contains` | Warn/fail if pattern found |

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
│   │   ├── G1.contract.json
│   │   ├── G2.contract.json
│   │   └── G3.contract.json
│   └── README.md
├── runner/
│   ├── cli.js
│   ├── lib/
│   │   ├── contract-loader.js
│   │   ├── hasher.js
│   │   ├── run-manager.js
│   │   └── validator.js
│   └── README.md
└── runs/
    └── <run-id>/
        ├── record/          ← COMMITTED
        │   ├── RUN.json
        │   └── gates/
        │       └── G2/
        │           └── attempt-1.json
        └── logs/            ← GITIGNORED
            └── invocations/
```
