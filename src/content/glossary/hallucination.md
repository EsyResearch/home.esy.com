---
title: "Hallucination"
category: "verification"
description: "When an AI model generates plausible-sounding but factually incorrect information, including fabricated citations, invented data, or false claims."
tldr: "Hallucination is when a language model produces text that reads as authoritative but is factually wrong — fabricated paper titles, invented statistics, non-existent URLs. It's the core failure mode that makes raw AI output unpublishable without verification."
inEsy: "Esy's agentic workflows include dedicated verification stages that catch hallucinations before they reach the final artifact. Citation verification agents validate every source reference against real databases. [Learn about Citation Verification](/glossary/citation-verification)"
relatedTerms: ["citation-verification", "agentic-workflow", "structured-output"]
---

## What hallucination looks like

Language models don't retrieve facts from a database — they predict the most statistically likely next token. This means they can generate text that follows the *pattern* of truthful content without containing any actual truth.

Common forms:

- **Fabricated citations** — paper titles that don't exist, authors who never wrote them, DOIs that resolve to nothing
- **Invented statistics** — "studies show 73% of..." with no underlying study
- **False attributions** — real quotes assigned to the wrong person, or real people credited with things they never said
- **Confident nonsense** — plausible-sounding technical explanations that are fundamentally wrong

## Why it happens

Hallucination is not a bug in a specific model — it's a structural property of how large language models work.

LLMs are trained to minimize perplexity (maximize the probability of the training data). They learn patterns of language, not facts about the world. When prompted to produce something specific — a citation, a date, a name — they generate the *most probable sequence of tokens*, which may or may not correspond to reality.

Key factors:

- **No grounding** — the model has no access to external truth at generation time
- **Training data gaps** — the model fills gaps with plausible-sounding interpolation
- **Instruction following** — when told to "cite sources," the model will produce citation-shaped text whether or not it knows real sources
- **Confidence calibration** — models don't signal uncertainty; a hallucinated fact reads identically to a real one

## The scale of the problem

Hallucination rates vary by model and task, but research consistently shows:

- Citation hallucination rates of **30-70%** in unverified research outputs
- Models performing worse on specific/niche topics where training data is sparse
- No reliable way to detect hallucination from the output alone — the text gives no signal

> You cannot tell a hallucinated citation from a real one by reading it. Both look identical. Only external verification — checking the source against a real database — catches the error.

## Why it matters for artifact production

For conversational AI (chatbots, assistants), hallucination is a nuisance. For artifact production — where the output is published, shared, or used as a basis for decisions — it's disqualifying.

A visual essay with fabricated citations undermines the entire artifact. A research brief with invented statistics is worse than no brief at all. Batch-processed content with unchecked claims creates liability at scale.

This is why verification can't be optional — it must be a built-in stage of the production pipeline.

## Mitigation strategies

- **Retrieval-Augmented Generation (RAG)** — ground the model in real documents at generation time
- **Citation verification** — validate every reference against external databases post-generation
- **Multi-agent verification** — use a separate agent to fact-check the output of the generation agent
- **Structured output** — constrain the model's output format to reduce free-form fabrication
- **Human-in-the-loop** — flag low-confidence sections for human review (doesn't scale)
