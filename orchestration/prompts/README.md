# Visual Essay Prompts

This directory contains prompt files for the visual essay pipeline.

## Usage

Pass a prompt file to the runner using `--prompt-file`:

```bash
node orchestration/runner/cli.js run visual-essay \
  --slug the-word-slang \
  --artifact-path src/app/essays/etymology/the-word-slang \
  --depth standard \
  --prompt-file orchestration/prompts/the-word-slang.md
```

## Naming Convention

Prompt files should match the essay slug:
- `the-word-slang.md` → for essay with slug `the-word-slang`
- `the-word-robot.md` → for essay with slug `the-word-robot`

## What Goes in a Prompt File

A good prompt file includes:
- **Role & mindset** for the AI
- **Core deliverable** description
- **Research requirements** (sources, standards)
- **Visual direction** (image types, typography)
- **Content structure** (chapters/sections)
- **Style constraints**

The runner will:
1. Read the prompt file
2. Hash it (SHA256) for tracking
3. Include it in each gate's Prompt Packet
4. Store a copy in `logs/prompts/original.txt`

## Current Prompts

| File | Essay | Description |
|------|-------|-------------|
| `the-word-slang-v1.md` | Etymology: Slang | Photo-visual etymology essay on the word "slang" |
| `the-word-slang-v2.md` | Etymology: Slang | Updated version with refined prompts |
| `the-brain-as-prediction-machine-v1.md` | Science: Neuroscience | SVG-first visual essay on predictive processing |
