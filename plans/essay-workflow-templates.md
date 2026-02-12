# Essay Workflow Templates — Architectural Plan

> Created: February 12, 2026
> Status: Active
> Depends on: `plans/artifact-detail-template.md`

## Overview

Six workflow templates covering all major academic essay types. Each uses the `ArtifactDetailTemplate` component (routed via `isWorkflow: true`) and a shared 6-stage pipeline with a dedicated Research stage.

## Rationale: 6 Templates, Not 18

Most essay types share the same underlying pipeline — what differs is the rhetorical strategy, structure rules, and evaluation criteria. Grouping by pipeline structure reduces maintenance (6 workflows to test vs. 18), provides clearer UX (6 categories vs. a wall of cards), and preserves SEO coverage (each subtype listed in tags).

| # | Slug | Title | Covers |
|---|------|-------|--------|
| 1 | `argumentative-essay` | Argumentative Essay | Argumentative, Persuasive, Synthesis |
| 2 | `analytical-essay` | Analytical Essay | Analytical, Literary Analysis, Critical Review |
| 3 | `expository-essay` | Expository Essay | Expository, Cause/Effect, Compare/Contrast, Definition, Process |
| 4 | `narrative-essay` | Narrative Essay | Narrative, Descriptive, Reflective |
| 5 | `research-paper` | Research Paper | Research Paper, MLA Format, APA Format |
| 6 | `college-application-essay` | College Application Essay | Personal Statement, Supplementals |

## Shared 6-Stage Pipeline

Every essay template includes a dedicated Research stage. Esy actively gathers evidence, sources, and context before outlining.

```
Intake → Research → Outline → Draft → Cite & Format → Artifact
```

### Per-Template Stage Sublabels

| Stage | Argumentative | Analytical | Expository | Narrative | Research Paper | College App |
|-------|--------------|------------|------------|-----------|---------------|-------------|
| Intake | Topic & stance | Text & lens | Topic & scope | Theme & voice | Question & field | Prompt & goals |
| Research | Evidence & counterargs | Source close-reading | Facts & data | Context & setting | Literature review | Program research |
| Outline | Thesis & evidence map | Framework & sections | Logic structure | Story arc & scenes | Methodology design | Narrative arc |
| Draft | Argument composition | Interpretive analysis | Explanatory prose | Scene writing | Findings & discussion | Personal narrative |
| Cite & Format | APA/MLA + counterarg check | Textual citations | Source attribution | Style & voice polish | Full bibliography | Word count & tone |
| Artifact | DOCX / PDF | DOCX / PDF | DOCX / PDF | DOCX / PDF | DOCX / PDF | DOCX / PDF |

## Shared Properties

- `isWorkflow: true`
- `category: 'template'`
- `engine: 'Claude'`
- `estimatedTime: '~3 min'`
- `outputFormats: ['DOCX', 'PDF']`
- `pricing: { type: 'premium', price: 1.49 }` — text essays cheaper than infographics ($2.99)
- `model: 'Claude'`

## Per-Template Specifications

### 1. Argumentative Essay (`wf-2`)

- **Subcategory**: `essay-argumentative`
- **Tags**: essay, argumentative, persuasive, synthesis, thesis, debate, evidence, academic
- **Input Requirements**: Topic or question, Position/stance, Target audience, Required sources (optional)
- **Sample Artifacts**: "Should Universities Abolish Standardized Testing?", "The Case for Universal Basic Income"

### 2. Analytical Essay (`wf-3`)

- **Subcategory**: `essay-analytical`
- **Tags**: essay, analytical, literary analysis, critical review, interpretation, close reading, academic
- **Input Requirements**: Source text or subject, Analytical lens/framework, Specific focus or question
- **Sample Artifacts**: "Symbolism in Toni Morrison's Beloved", "Power Dynamics in Orwell's 1984"

### 3. Expository Essay (`wf-4`)

- **Subcategory**: `essay-expository`
- **Tags**: essay, expository, cause and effect, compare and contrast, definition, process, informative, academic
- **Input Requirements**: Topic or concept, Essay subtype (compare/contrast, cause/effect, etc.), Scope and depth level
- **Sample Artifacts**: "How CRISPR Gene Editing Works", "Comparing Keynesian and Austrian Economics"

### 4. Narrative Essay (`wf-5`)

- **Subcategory**: `essay-narrative`
- **Tags**: essay, narrative, descriptive, reflective, personal, storytelling, creative nonfiction, academic
- **Input Requirements**: Theme or experience, Narrative perspective, Tone/mood preference (optional)
- **Sample Artifacts**: "The Summer That Changed Everything", "Finding Home in a Foreign Language"

### 5. Research Paper (`wf-6`)

- **Subcategory**: `essay-research`
- **Tags**: essay, research paper, MLA, APA, literature review, methodology, citations, thesis, academic
- **Input Requirements**: Research question, Academic field/discipline, Preferred citation format (MLA/APA/Chicago), Key sources (optional)
- **Sample Artifacts**: "The Impact of Social Media on Adolescent Mental Health", "Renewable Energy Adoption in Developing Nations"

### 6. College Application Essay (`wf-7`)

- **Subcategory**: `essay-college-application`
- **Tags**: essay, college application, personal statement, supplemental, admissions, Common App, academic
- **Input Requirements**: Essay prompt or question, Target school(s), Word count limit, Key experiences or themes to highlight
- **Sample Artifacts**: "Why This University: Engineering at MIT", "Overcoming Adversity: A First-Generation Story"

## Cross-Linking Strategy

Each template's `relatedSlugs` includes the other 5 essay templates. The `getRelatedTemplates()` function resolves these and displays them in the Related Templates section at the bottom of each page.

## Files Changed

1. `plans/essay-workflow-templates.md` — This document
2. `src/lib/templates/types.ts` — Add `essay-analytical` and `essay-narrative` to `SUBCATEGORY_CATEGORY_MAP`
3. `src/lib/templates/data.ts` — Add 2 new subcategories, 6 new workflow template entries

## No Component Changes

The existing `ArtifactDetailTemplate`, `WorkflowCircuit`, and routing in `src/app/templates/[slug]/page.tsx` handle everything automatically via `isWorkflow: true`.
