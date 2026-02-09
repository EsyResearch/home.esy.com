# Citation-First Source Standard

> Version: 1.0
> Created: February 9, 2026
> Status: Active — Foundational

## The Principle

**Every claim in a published artifact must trace back to a source that was actually read, extracted from, and used during production.** No citation may be added to an artifact on the basis of contextual relevance alone. If a source was not consulted during research or production, it does not appear in the artifact.

This is the defining promise of the Esy platform. It is not a quality preference — it is the brand contract with users.

---

## The Anti-Pattern: Decorative Citations

### What Decorative Citations Look Like

```
Model recalls from training data → Model writes content from memory
→ Model finds plausible-sounding sources → Model attaches them as citations
```

The model produces content from its training data, then searches its memory for authors and papers that are associated with the topic. The citations are **attributionally plausible** — the authors likely wrote about the topic — but they are **not consulted sources**. The model did not read them. The content was not derived from them.

### Why This Is Unacceptable

1. **The citation may not say what the artifact claims it says** — the model's recall of a paper's content may be wrong, outdated, or conflated with another source
2. **The citation may not exist** — LLMs fabricate plausible-sounding paper titles, journal names, and dates
3. **The claim may be wrong but the citation makes it look authoritative** — a real citation attached to a false claim is worse than no citation at all
4. **The user cannot trust the artifact for downstream work** — if a student cites our artifact in their paper, they're propagating unverified attributions
5. **It destroys the brand** — "Citation-First" means nothing if citations are decorative

### The Litmus Test

> If you remove the model's training data and only give it the source documents, could it still produce the same claims with the same citations? If not, the citations are decorative.

---

## Source Acquisition Models

Every template declares a source acquisition model. This determines how sources enter the research package before production begins.

### Model 1: Template-Assisted Discovery

The template offers curated, searchable sources via integrated APIs (Semantic Scholar, CrossRef, PubMed, etc.). The user selects from discovered papers.

```
User selects topic
    → Template searches source APIs
        → User selects 3 / 5 / 7 papers from results
            → Pipeline ingests selected papers
                → Research package built from ingested sources
                    → Artifact built from research package
```

**User experience**: Select a topic, browse suggested papers, pick the ones you want, optionally upload additional sources. Press generate.

**Source integrity**: High — papers are retrieved from real databases with DOIs, abstracts, and (where available) full text.

### Model 2: User-Provided Sources

The user provides all sources. The template does not search for or suggest additional sources.

```
User uploads PDFs / pastes URLs / provides DOIs
    → Pipeline ingests user-provided sources
        → Research package built from ingested sources
            → Artifact built from research package
```

**User experience**: Upload your own materials. The pipeline works ON them, not around them.

**Source integrity**: Highest — the user selected and verified these sources themselves. The pipeline's job is to extract, synthesize, and build — not to editorialize.

### Model 3: Hybrid (Template Discovery + User Sources)

The template discovers sources AND the user provides additional sources. Both feed into the research package.

```
User selects topic + uploads their own sources
    → Template searches source APIs for additional papers
        → User reviews all sources (discovered + uploaded)
            → User approves final source set
                → Pipeline ingests approved sources
                    → Research package built from ingested sources
                        → Artifact built from research package
```

**User experience**: The richest intake. The user brings what they have, the pipeline fills gaps with discovered sources, the user approves the final set.

### Model 4: Deep Research Fallback

When no user sources are provided and the template's purpose requires sources (e.g., visual essays, research summaries), the pipeline conducts deep research to find and retrieve real sources.

```
User provides topic only
    → Deep Research Agent searches the web
        → Agent retrieves, reads, and extracts from real sources
            → Research package built from retrieved sources
                → Artifact built from research package
```

**Source integrity**: Moderate — the sources are real and retrieved, but the pipeline selected them, not the user. The user should be able to review and approve the source set before production.

**Important**: Even in this model, citations are NOT decorative. The Deep Research Agent must actually retrieve and read source documents, not recall from training data.

### Model 5: Sources as Constraints

The user limits the pipeline to ONLY specified sources. The pipeline must not introduce external sources.

```
User provides sources + declares "ONLY these sources"
    → Pipeline ingests user-provided sources
        → Research package built EXCLUSIVELY from provided sources
            → Artifact built from research package
                → Citation audit verifies NO external sources were introduced
```

**Use case**: Academic integrity contexts. A student assigned 3 readings must produce work citing only those 3 readings. A researcher building a literature review from a specific corpus.

---

## The Source-to-Artifact Chain

Every published artifact must maintain a traceable chain from source to claim:

```
SOURCE DOCUMENT (PDF, URL, DOI)
    ↓
EXTRACTION (specific passage, page, section)
    ↓
RESEARCH PACKAGE (CLAIMS.md / CITATIONS.md with extracted passages)
    ↓
PRODUCTION (essay content derived from extracted material)
    ↓
INLINE CITATION (traces back to specific extraction)
    ↓
BIBLIOGRAPHY (links back to original source document)
```

### Research Package Format (Citation-First)

The current format stores model-recalled claims:
```markdown
### Claim: Space and time swap inside the horizon
**Source**: Penrose, 1965
```

The Citation-First format stores extracted content:
```markdown
### Claim: Space and time swap inside the horizon
**Source**: Misner, C.W., Thorne, K.S., Wheeler, J.A. (1973). "Gravitation"
**Location**: Chapter 31, §31.2, p. 836
**Extracted passage**: "For r < 2M, the Schwarzschild coordinate r becomes 
timelike and t becomes spacelike. The singularity at r = 0 is not a point 
in space but a moment in time."
**Source type**: User-provided / Template-discovered / Deep Research
**Retrieval method**: PDF upload / Semantic Scholar API / Web search
```

Every claim must include:
- **Source** with full bibliographic detail
- **Location** within the source (page, section, timestamp, URL anchor)
- **Extracted passage** — the actual text from the source
- **Source type** — how the source entered the pipeline
- **Retrieval method** — how the source was accessed

---

## Gate Implications

### G1 (Intake)
- Template source model is declared
- If source model is "required" and no sources provided → G1 FAILS
- If source model is "optional" and user provides sources → sources are flagged as input material

### G2 (Research)
- **This is the most affected gate.** G2 must produce a research package built from ACTUAL sources, not model recall
- If user provided sources → G2 reads, extracts, and structures claims from those sources
- If template discovers sources → G2 reads, extracts, and structures claims from discovered sources
- If deep research fallback → G2 uses web search to find, retrieve, read, and extract from real sources
- **G2 MUST NOT produce claims from model training data alone.** Every claim must trace to a specific passage in a specific source document

### G5 (Production)
- The production agent writes from the research package, not from training data
- Inline citations reference specific claims in the research package
- The agent should not introduce new factual claims that don't exist in the research package

### G5.5 (Bibliography)
- Verifies that every inline citation traces back to the research package
- Verifies that every research package claim traces back to a source document
- Verifies that the bibliography contains only sources that were actually used

### G6 (Citation Audit)
- **Traceability audit**: Can every claim be traced from inline citation → research package → source document?
- **Completeness audit**: Are there claims in the essay that don't appear in the research package?
- **Fabrication check**: Do the cited sources actually exist? (Verify DOIs, URLs, publication records)
- **Accuracy check**: Does the extracted passage actually support the claim?

---

## What the Model's Training Data Is (and Isn't)

The AI model's training data is the engine that powers extraction, synthesis, and writing. It is NOT a source.

| Training Data IS | Training Data IS NOT |
|------------------|---------------------|
| The model's ability to understand source material | A citable source of facts |
| The model's ability to write clearly about complex topics | A substitute for reading actual sources |
| The model's ability to identify relevant passages | An acceptable basis for factual claims |
| The model's background knowledge for context | A bibliography entry |

If the model produces a factual claim that isn't in any provided source, one of two things must happen:
1. The model finds a real source for the claim and adds it to the research package (via deep research)
2. The claim is removed from the artifact

**The model may not use its training data as an unattributed source of facts.** It may use its training data to understand, synthesize, and write about facts that come from real, traceable sources.

---

## Current Gap and Migration Path

### Where We Are Now
- G2 produces research packages from model recall
- Citations are decorative (attributionally plausible but not consulted)
- No source ingestion capability exists in the pipeline
- No deep research integration exists

### Where We Need to Be
- G2 produces research packages from ingested source documents
- Citations trace back to specific passages in specific documents
- Source ingestion (PDF, URL, DOI) is a pipeline capability
- Deep research (web search + document retrieval) is available as a fallback

### Migration Steps
1. **Define the Citation-First research package format** (this document) ✅
2. **Build source ingestion capability** — PDF parsing, URL scraping, DOI resolution
3. **Integrate deep research** — web search API for Model 4 (fallback)
4. **Update G2 agent instructions** — require extracted passages, not recalled claims
5. **Update G6 Citation Audit** — add traceability and fabrication checks
6. **Update CLAIMS.md / CITATIONS.md format** — require extracted passages and source metadata
7. **Test with real sources** — run a pipeline where user provides actual PDFs

### Interim Acknowledgment

Until the Citation-First pipeline is fully implemented, all artifacts should include a transparent acknowledgment:

```markdown
**Source Note**: This essay was produced by AI. The cited sources represent 
works the AI associates with the claims made, based on its training data. 
These sources were not directly consulted during production. Readers are 
encouraged to verify claims against the original sources.
```

This acknowledgment is removed once the Citation-First pipeline is operational and sources are genuinely consulted.

---

## Template Configuration

Every template must declare its source configuration in the workflow definition:

```json
{
  "template": "visual-essay",
  "source_model": "hybrid",
  "source_config": {
    "discovery_enabled": true,
    "discovery_apis": ["semantic_scholar", "crossref"],
    "discovery_count": [3, 5, 7],
    "user_upload_enabled": true,
    "user_upload_formats": ["pdf", "url", "doi", "text"],
    "sources_required": false,
    "deep_research_fallback": true,
    "constraint_mode_available": true
  }
}
```

---

## Summary

1. **Citation-First is the brand promise.** Artifacts are built FROM sources, not decorated with them.
2. **Five source acquisition models** cover all template types: template-assisted, user-provided, hybrid, deep research fallback, and sources-as-constraints.
3. **Every claim must trace** from inline citation → research package extraction → source document passage.
4. **The model's training data is not a source.** It is the engine for understanding and writing. Facts must come from traceable sources.
5. **Decorative citations are the anti-pattern.** If a source was not read and extracted from, it does not appear in the artifact.
6. **This standard is ahead of implementation.** The current pipeline does not yet support source ingestion or deep research. An interim acknowledgment is required until the Citation-First pipeline is operational.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-02-09 | Initial standard — Citation-First principle, five source models, source-to-artifact chain, gate implications, migration path, interim acknowledgment |

---

*This standard establishes the foundational source integrity guarantee for all Esy orchestration workflows. It defines what "Citation-First" means operationally, how sources enter the pipeline, and the traceability chain that every published artifact must maintain. Compliance with this standard is essential for brand integrity and user trust.*
