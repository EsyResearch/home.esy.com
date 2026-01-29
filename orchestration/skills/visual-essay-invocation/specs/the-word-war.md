---
title: The Word War
subtitle: How a Frankish term for confusion became English's name for organized violence
slug: the-word-war
status: "[SPEC-APPROVED]"
created: 2026-01-03
gate1_approved: 2026-01-03
gate2_approved: 2026-01-03
gate3_approved: 2026-01-03
artifact_type: etymology-visual-essay
target_path: /essays/etymology/the-word-war/
estimated_read_time: 18-25 minutes
research_depth: deep
source_count: 38
---

# The Word War — Six-Layer Invocation Spec

> **Status**: [PUBLISHED] — All gates approved
> **Research**: Complete (38 sources across 7 language families)
> **Implementation**: Complete — src/app/essays/etymology/the-word-war/

---

## Current Gate Status

| Gate | Name | Status | Date |
|------|------|--------|------|
| G1 | Intake Approval | ✅ APPROVED | 2026-01-03 |
| G2 | Research Complete | ✅ APPROVED | 2026-01-03 |
| G3 | Spec Approval | ✅ APPROVED | 2026-01-03 |
| G4 | Design Research | ✅ APPROVED | 2026-01-03 |
| G4.1 | Design Research Reconciliation | ✅ APPROVED | 2026-01-03 |
| G4.5 | Image Sourcing | ✅ APPROVED | 2026-01-03 |
| G5 | Content Complete | ✅ APPROVED | 2026-01-04 |
| G5.2 | Design Research Integration | ✅ APPROVED | 2026-01-04 |
| G5.5 | Bibliography Implementation | ✅ APPROVED | 2026-01-04 |
| G6 | Citation Audit | ✅ APPROVED | 2026-01-04 |
| G7 | Scroll Certification | ✅ APPROVED | 2026-01-04 |
| G8 | Publication Certification | ✅ APPROVED | 2026-01-04 |
| G9 | Publication Approval | ✅ APPROVED | 2026-01-04 |

---

# Layer 1: Core Concept

## Primary Term

**WAR** (English, noun and verb)

- **Modern Pronunciation**: /wɔːr/ (RP), /wɔr/ (GA)
- **Part of Speech**: Noun (primary), Verb (derived)
- **Semantic Domain**: Armed conflict, organized violence, hostility

## Complete Etymology Summary

```
Proto-Indo-European *wers- "to confuse, mix up"
       ↓
Proto-Germanic *werz-a- "to confuse, bring into confusion"
       ↓
Frankish *werra (RECONSTRUCTED) "confusion, quarrel, strife"
       ↓
Medieval Latin werra (FIRST ATTESTED: 858 CE)
       ↓
    ┌─────────────────────────────────────┐
    ↓                                     ↓
Old French guerre          Old North French werre/were/wiere
(Standard French path)     (Norman dialect path)
    ↓                                     ↓
Modern French guerre       Anglo-Norman werre
                                          ↓
                           Middle English werre/warre (c.1121+)
                                          ↓
                           Modern English war (standardized c.1500+)
```

### Key Forms and Dates

| Stage | Form | Status | Date | Source |
|-------|------|--------|------|--------|
| PIE | *wers- | Reconstructed | — | Watkins |
| Proto-Germanic | *werz-a- | Reconstructed | — | OED |
| Frankish | *werra | Reconstructed | — | OED, Romance evidence |
| Medieval Latin | werra | **ATTESTED** | 858 CE | Episcopal letter |
| Old High German | werra | **ATTESTED** | c.800-1050 | OHG texts |
| Old North French | werre | **ATTESTED** | c.1000+ | AN/OF texts |
| Middle English | werre/warre | **ATTESTED** | c.1121 | Peterborough Chronicle |
| Modern English | war | **ATTESTED** | c.1500+ | Printed texts |

## Thesis Statement

The English word *war* is not native to English. It arrived through Norman French after 1066, descending from Old French *werre*—itself borrowed from Frankish *\*werra*, a Germanic term scholars believe originally meant "confusion" or "strife" rather than organized military conflict. The word's journey reveals how conquest moves vocabulary across languages, and how meaning transforms as words travel from chaos to order, from private quarrel to state-sanctioned violence.

## Evergreen Framing (MANDATORY)

> *"This essay studies the history of a word, not the glamor of violence. Where scholarly views differ or evidence is incomplete, we label uncertainty and cite the best available sources."*

**Placement**: Must appear in essay introduction, immediately following the opening scene.

## Reader Promise

By the end, a reader should be able to answer:
1. Where does the English word *war* come from (attested forms, path, dates)?
2. Why doesn't English use a Latin root like *bellum*?
3. How did spelling/pronunciation shift across centuries?
4. How did meaning expand from armed conflict to metaphorical campaigns?
5. How do different cultures/languages carve up the "war/battle/conflict/feud" space?

---

# Layer 2: Visual Treatment

## Design Philosophy

**Evoke**: Manuscripts, treaties, maps, inscriptions, scribal culture
**Avoid**: Battlefield imagery, combat aesthetics, sensationalized violence, propaganda poster mimicry, illegibility

### Typography Principles
- Defined type scale (H1-H4, body, caption, footnote, glossary)
- Consistent baseline rhythm and generous whitespace
- Microtypography: proper quotation marks, en/em dashes, kerning-aware headings
- Clear diacritic/IPA support
- Citations that are readable and non-intrusive

### Signature Flourish
- **Rubricated date markers**: Key dates rendered in contrasting color (archival red)
- **Manuscript-style sidenotes**: Source attributions in margin annotations
- **Drop cap**: Opening scene begins with illuminated initial

---

## Visual Module 1: Etymology River Diagram

**Title**: "From *werra* to *war*"

### Purpose
Visualize the complete etymological pathway with branching variants, showing how a single reconstructed Frankish form descended into Romance and then into English.

### Data Structure

```typescript
interface EtymologyNode {
  form: string;           // e.g., "*werra", "werre", "war"
  language: string;       // e.g., "Frankish", "Middle English"
  date: string | null;    // e.g., "858 CE", "c.1121", null for reconstructed
  status: "reconstructed" | "attested";
  source: string;         // e.g., "OED", "Peterborough Chronicle"
  ipa?: string;           // pronunciation if available
  meaning?: string;       // gloss
  region?: string;        // geographic context
}
```

### Nodes to Include

| Form | Language | Date | Status | IPA | Notes |
|------|----------|------|--------|-----|-------|
| *wers- | PIE | — | Reconstructed | — | "to confuse, mix up" |
| *werz-a- | Proto-Germanic | — | Reconstructed | — | "to confuse" |
| *werra | Frankish | — | Reconstructed | — | "confusion, strife" |
| werra | Medieval Latin | 858 CE | Attested | — | First written record |
| werra | Old High German | c.800-1050 | Attested | — | "confusion, strife" |
| guerre | Old French | c.1000+ | Attested | [gɛr] | Standard French path |
| werre | Old North French | c.1000+ | Attested | [wɛrə] | Norman dialect |
| werre | Anglo-Norman | c.1066+ | Attested | [wɛrə] | Post-Conquest England |
| wyrre | Middle English | c.1121 | Attested | — | First English attestation |
| warre | Middle English | 13c-14c | Attested | — | Common variant |
| war | Modern English | c.1500+ | Attested | /wɔːr/ | Standardized form |

### Branches
1. **Main Trunk**: PIE → PGmc → Frankish → Medieval Latin → OF/ONF → ME → ModE
2. **Romance Branch**: Frankish → guerre (French), guerra (Spanish, Italian, Portuguese)
3. **ME Variants Branch**: Show spelling variants (werre, warre, weer, weorre, etc.)

### Micro-Interaction
- **Hover/Tap on node**: Tooltip displays full data (form, language, date, IPA, source, meaning)
- **Reconstructed forms**: Rendered with asterisk prefix and dashed outline
- **Attested forms**: Solid outline with source citation

---

## Visual Module 2: Sound & Spelling Panel

**Title**: "How *guerre* becomes *war*"

### Purpose
Explain the phonological change that created the w-/gu- split between northern and standard Old French, showing why English has "war" rather than "*guar."

### Core Explanation

```
Frankish /w-/
    │
    ├──→ Standard Old French: /w/ → /gw/ → /g/
    │    Result: guerre [gɛʁ]
    │
    └──→ Old North French (Norman, Picard): /w/ preserved
         Result: werre [wɛrə]
         → Anglo-Norman → Middle English → "war"
```

### Visual Elements
1. **Map inset**: Northern France (Norman region) vs. central France (Île-de-France)
2. **Sound wave representation**: Visual distinction between /w/ and /g/ sounds
3. **Toggle overlay**: Switch between "spelling" view and "sound" view

### Toggle States
- **Spelling View**: Shows orthographic forms (guerre vs. werre)
- **Sound View**: Shows IPA transcriptions with articulation notes

### Key Points to Annotate
- Norman Conquest (1066) brought northern French /w/ forms to England
- Standard French /g/ forms never took hold in English
- This is why English has "war" but borrowed French "guarantee" (from *warant)

---

## Visual Module 3: Cognate & Borrowing Network Map

**Title**: "The *werra* Family Tree"

### Purpose
Show the relationships between languages that share the Frankish borrowing vs. those with independent "war" words.

### Network Structure

```typescript
interface LanguageNode {
  language: string;
  family: string;
  warWord: string;
  etymology: string;
  relationship: "frankish-descendant" | "independent" | "sino-borrowing";
}
```

### Nodes (15 languages)

| Language | Family | War Word | Etymology | Cluster |
|----------|--------|----------|-----------|---------|
| English | Germanic | war | < Frankish *werra | Frankish descendants |
| French | Romance | guerre | < Frankish *werra | Frankish descendants |
| Spanish | Romance | guerra | < Frankish *werra | Frankish descendants |
| Italian | Romance | guerra | < Frankish *werra | Frankish descendants |
| Portuguese | Romance | guerra | < Frankish *werra | Frankish descendants |
| German | Germanic | Krieg | < OHG chreg "stubbornness" | Independent Germanic |
| Dutch | Germanic | oorlog | < PGmc "fate/decree" | Independent Germanic |
| Russian | Slavic | voyna | < PSl *vojьna "warrior" | Slavic |
| Polish | Slavic | wojna | < PSl *vojьna | Slavic |
| Arabic | Semitic | harb | < "blade, weapon" | Semitic |
| Hebrew | Semitic | milkhamah | < l-ḥ-m "to fight" | Semitic |
| Chinese | Sino-Tibetan | zhanzheng | "battle-struggle" | Sinosphere |
| Japanese | Japonic | senso | < Chinese | Sinosphere |
| Korean | Koreanic | jeonjaeng | < Chinese | Sinosphere |
| Hindi | Indo-Iranian | yuddh | < PIE *yewdʰ- "to fight" | Indo-Iranian |
| Swahili | Bantu | vita | Bantu origin | African |

### Visual Treatment
1. **Color-code by etymology**: guerre/guerra family in one color, independent words in others
2. **Edge types**:
   - Solid lines for direct borrowing
   - Dashed lines for shared ancestry
3. **Cluster grouping**: Frankish descendants visually grouped

### Highlight Interaction
- Click on Frankish cluster to highlight all descendants
- Click on "Sinosphere" to show Chinese → Japanese → Korean borrowing chain

---

## Visual Module 4: Semantic Constellation

**Title**: "What *war* points to"

### Purpose
Map the semantic field around "war," showing related terms with gradients for intensity and legal/formal framing.

### Central Node
**WAR**: organized armed conflict between states or parties

### Surrounding Terms (arranged by semantic distance)

**Inner Ring (Near-Synonyms)**:
- **battle**: single engagement within a war
- **conflict**: broader term, may be non-violent
- **combat**: active fighting
- **hostilities**: state of armed opposition

**Middle Ring (Related Concepts)**:
- **campaign**: organized military operations
- **skirmish**: minor engagement
- **siege**: prolonged attack on fortified position
- **invasion**: armed entry into territory

**Outer Ring (Adjacent Concepts)**:
- **feud**: prolonged private hostility
- **riot**: violent civil disturbance
- **rebellion**: organized resistance to authority
- **genocide**: deliberate destruction of a group

### Gradient Dimensions
1. **Intensity**: riot → skirmish → battle → war → total war
2. **Legal Framing**: street fight (criminal) → riot (civil) → war (state-sanctioned)
3. **Scale**: feud (personal) → civil war (internal) → world war (global)

### Design Notes
- Terms positioned spatially by semantic proximity
- Gradient lines or shading show intensity spectrum
- Annotations explain why "war" carries distinct legal/moral weight

---

## Visual Module 5: Historical Frequency Chart

**Title**: "The Word Through Time"

### Status
**CONCEPTUAL** — Corpus data not gathered in research phase

### If Implemented

**Data Sources** (to be gathered):
- COHA (Corpus of Historical American English)
- Google Ngram Viewer
- EEBO (Early English Books Online)

**Bias Warning** (must display):
> "Corpus data reflects what was printed and preserved, not what was spoken. Frequency changes may reflect publishing trends as much as actual usage."

### Chart Type
Line chart showing relative frequency over time, with annotations for:
- 1066: Norman Conquest
- 1914-1918: World War I
- 1939-1945: World War II
- 1964: "War on Poverty"

### Alternative Treatment
If corpus data unavailable, use timeline of compound proliferation:
- 1848: "world war" first used
- 1906: "war crime" attested
- 1914: "war zone" attested
- 1918: "total war" coined
- 1964: "war on poverty"
- 1971: "war on drugs"

---

## Visual Module 6: Metaphor Expansion Chart

**Title**: "From Battlefield to Boardroom"

### Purpose
Show the timeline of literal vs. figurative usage, tracing when "war" began to describe non-military campaigns.

### Timeline Structure

| Year | Usage | Category | Source |
|------|-------|----------|--------|
| c.1121 | "war" = armed conflict | Literal | Peterborough Chronicle |
| 1540s | "warfare" used figuratively | Early figurative | Etymonline |
| 1933 | "War on Crime" | Political metaphor | AG Homer Cummings |
| 1964 | "War on Poverty" | Social program | LBJ State of the Union |
| 1971 | "War on Drugs" | Policy framing | Nixon |
| Various | "culture wars," "price war," "trade war" | Rhetorical extension | — |

### Visual Treatment
- Dual-track timeline: Literal uses on top, figurative uses below
- Branch point clearly marked (c. 1540s)
- Modern cluster of "war on X" constructions highlighted

### Annotation
> The "War on X" construction transforms policy into crusade, borrowing war's urgency and moral weight for non-military campaigns.

---

## Visual Module 7: Geographic Map

**Title**: "Where 'war' words come from"

### Purpose
Show the geographic distribution of different etymologies for "war" across Europe and globally.

### Map Scope
1. **Primary map**: Europe (showing guerre/guerra spread vs. Krieg, oorlog)
2. **Inset**: Global view (showing Sinosphere, Arabic, Hindi, Swahili)

### Color Coding
- **Red/Orange**: Frankish *werra descendants (English, French, Spanish, Italian, Portuguese)
- **Blue**: Independent Germanic (German Krieg, Dutch oorlog)
- **Green**: Slavic (Russian voyna, Polish wojna)
- **Gold**: Semitic (Arabic harb, Hebrew milkhamah)
- **Purple**: Sinosphere (Chinese, Japanese, Korean)

### Annotations
1. **Borrowing corridor**: Arrow from Frankish territory to Romance Europe
2. **Norman invasion route**: Arrow to England showing word's entry path
3. **East Asian shared script**: Note that Chinese characters spread to Japan and Korea

### Key Insight to Highlight
> Three major Germanic languages—English, German, Dutch—each use completely different words for "war," showing that language families do not guarantee shared vocabulary.

---

## Visual Module 8: Timeline Band

**Title**: "Word History vs. World History"

### Purpose
Dual-track timeline showing linguistic milestones alongside historical events, without implying simplistic causality.

### Dual Tracks

**Linguistic Track** (Top):
| Date | Event |
|------|-------|
| 858 CE | First attestation: Latin *werra* |
| c.1066 | Norman French enters England |
| c.1121 | First English attestation: *wyrre* |
| c.1300 | "warrior" first attested |
| c.1400 | "warfare" attested |
| c.1500 | Spelling standardizes to "war" |
| 1755 | Johnson's Dictionary |
| 1848 | "world war" first used |
| 1918 | "total war" coined |
| 1939 | "World War I" and "World War II" coined |
| 1964 | "War on Poverty" |

**Historical Track** (Bottom):
| Date | Event |
|------|-------|
| 800 | Charlemagne crowned |
| 1066 | Norman Conquest of England |
| 1337-1453 | Hundred Years' War |
| 1642-1651 | English Civil War |
| 1755 | Seven Years' War begins |
| 1914-1918 | World War I |
| 1939-1945 | World War II |

### Warning Annotation
> Correlation is not causation. This timeline shows linguistic and historical events in parallel, but words change for many reasons beyond direct historical triggers.

---

## Visual Module 9: Typographic Hero System

**Title**: "WAR as Artifact"

### Purpose
Establish the visual language for displaying the word "war" and historical forms throughout the essay.

### Typography Specifications

**Display Treatment (Hero Moments)**:
- Font: Inscriptional serif (suggest: Trajan, Garamond Premiere Display, or similar)
- Weight: Bold/Black for primary term
- Color: Deep charcoal (#1a1a1a) or archival brown
- Tracking: Slightly expanded for gravitas

**Historical Forms**:
- Font: Readable serif with good IPA support
- Italics for foreign and historical forms (*werre*, *guerre*)
- Asterisk prefix for reconstructed forms (*\*werra*)
- Small caps for language labels (FRANKISH, OLD FRENCH)

**Marginalia System**:
- Dates in rubricated style (contrasting color, typically red)
- Source abbreviations in parentheses: (OED), (MED), (Peterborough)
- Folio-style sidenotes for extended citations

**Body Text**:
- Readable serif at comfortable size (16-18px base)
- Proper quotation marks (curly, not straight)
- En dashes for ranges, em dashes for breaks
- Clear visual distinction for block quotes

### Visual Example Zones
- **Hero zone**: Large display of "WAR" with etymology annotation
- **Historical zone**: Middle English variants in period-appropriate styling
- **Comparison zone**: Multilingual terms in consistent format

---

# Layer 3: Narrative Structure

## Required H2 Sections (in order)

### 1. The Scene: A Word Being Chosen

**Opening Constraints**:
- Human-scale, non-violent scene that foregrounds language
- No battlefield imagery
- Focus on scribal/documentary context

**Suggested Scene**:
A medieval scribe in the scriptorium of Peterborough Abbey, 1121. He is copying the year's entry into the chronicle. His quill hovers: how to spell the Norman word for armed conflict? The native English term *guþ* feels archaic now. He writes *wyrre*—or perhaps *werre*? The word is new to English, barely a generation old in this land. It came with the Conquerors in 1066.

**Visual Integration**: None (pure prose opening)

**Transition**: From scene to evergreen framing statement.

---

### 2. What We Mean When We Say "War"

**Content**:
- OED definition: "Hostile contention by means of armed forces, carried on between nations, states, or rulers..."
- Why "war" carries specific legal and moral weight
- Distinction from other conflict terms
- The word as a formal classification, not just a description

**Key Points**:
- "War" implies state-level conflict (vs. personal feud)
- Declaring "war" has legal consequences (international law)
- The word triggers specific responses: fear, urgency, mobilization

---

### 3. The Etymology Spine: Forms, Dates, Pathways

**Content**:
Complete etymological pathway from PIE to modern English:

1. **PIE *wers-**: "to confuse, mix up" (reconstructed; source: Watkins)
2. **Proto-Germanic *werz-a-**: "to confuse, bring into confusion"
3. **Frankish *werra**: "confusion, quarrel, strife" (RECONSTRUCTED)
4. **Medieval Latin werra**: First attestation 858 CE in episcopal letter from NE France
5. **Old French guerre / Old North French werre**: c.1000+
6. **Anglo-Norman werre**: Post-1066 in England
7. **Middle English werre/warre**: First attested c.1121 in Peterborough Chronicle
8. **Modern English war**: Standardized c.1500+

**INSERT VISUAL MODULE 1**: Etymology River Diagram

**Critical Notes**:
- Mark all reconstructed forms with asterisk (*)
- Cite sources for each stage
- Acknowledge that Frankish is unattested (reconstructed from Romance descendants)

---

### 4. From Spellings to Sounds: How the Word Stabilized

**Content**:
- Middle English spelling variants (from MED): werre, guer, guerre, gwerre, ver, verr, verre, waar, waer, war, ware, warr, warre, weer, weire, weore, weorre, wer, were, werr, weyr, where, wherre, wirre, worre, berre
- Why "berre" exists (manuscript transmission error)
- The w- vs. gu- split explained
- How printing (c.1476+) standardized spelling to "war"

**INSERT VISUAL MODULE 2**: Sound & Spelling Panel

**Key Phonological Point**:
Standard Old French changed Frankish /w/ to /gw/ → /g/ (producing *guerre*), but northern dialects (Norman, Picard) preserved /w/ (producing *werre*). English inherited the northern form through the Norman Conquest.

---

### 5. Meaning Drift: From Conflict to Metaphor

**Content**:
Semantic evolution table:

| Era | Primary Sense | New Extensions |
|-----|---------------|----------------|
| PIE | "to confuse, mix up" | — |
| Frankish | "confusion, strife, quarrel" | — |
| Middle English (c.1121) | "large-scale military conflict" | — |
| Late 12c | | "state of hostility between persons" |
| Mid-14c | | "fighting as profession" |
| Late 14c | | "civil war" (calque from Latin) |
| 1540s | | figurative "warfare" |
| 1848 | | "world war" |
| 1918 | | "total war" |
| 1933+ | | figurative "war on [X]" |

**INSERT VISUAL MODULE 6**: Metaphor Expansion Chart

**Key Insight**:
The word transformed from describing disorder ("confusion") to describing organized violence. Modern "war on poverty" returns to metaphor—but now the metaphor borrows the connotations of state power and moral urgency.

---

### 6. The Word Family: warfare, warrior, warmonger...

**Content**:
Derivatives and compounds:

| Word | Etymology | First Attested |
|------|-----------|----------------|
| **warrior** | ONF *werreier* "one who wages war" | c.1300 |
| **warfare** | war + fare | implied c.1400 |
| **warlike** | war + like | — |
| **warmonger** | war + monger | — |
| **warlord** | war + lord | — |
| **warship** | war + ship | — |

**Collocations**:
- "declare war" (legal/formal act)
- "wage war" (active prosecution)
- "at war" (state of hostility)
- "war footing" (preparatory mobilization)
- "in war and peace" (at all times)

**Compounding Productivity**:
- world war (1848)
- civil war (late 14c)
- total war (1918)
- cold war (1945)
- culture war (1990s)
- price war, trade war (business metaphors)

---

### 7. War vs Battle vs Conflict: A Precision Toolkit

**INSERT VISUAL MODULE 4**: Semantic Constellation

**Contrast Definitions**:

| Term | Definition | Key Distinction |
|------|------------|-----------------|
| **war** | sustained armed conflict between states/parties | scale, duration, legal status |
| **battle** | single engagement within a war | discrete event |
| **conflict** | any opposition or struggle | may be non-violent |
| **combat** | active fighting | the act itself |
| **feud** | prolonged hostility between families/groups | private, not state-level |
| **riot** | violent civil disturbance | spontaneous, localized |
| **genocide** | deliberate destruction of a group | intent and target |

**Why Word Choice Matters**:
- Calling something a "war" invokes international law
- "Conflict" may be euphemistic ("the Vietnam conflict")
- "Operations" is often military euphemism ("Operation Iraqi Freedom")
- Language choice shapes public perception and legal status

---

### 8. A World Tour: How Languages Name War

**INSERT VISUAL MODULE 3**: Cognate & Borrowing Network Map
**INSERT VISUAL MODULE 7**: Geographic Map

**15 Languages Comparison**:

| Language | Family | Term | IPA | Etymology | Relation to English |
|----------|--------|------|-----|-----------|---------------------|
| English | Germanic | war | /wɔːr/ | < Frankish *werra | — |
| French | Romance | guerre | [gɛʁ] | < Frankish *werra | Same source |
| Spanish | Romance | guerra | [ˈgera] | < Frankish *werra | Same source |
| Italian | Romance | guerra | [ˈɡwɛrra] | < Frankish *werra | Same source |
| Portuguese | Romance | guerra | [ˈɡɛʁɐ] | < Frankish *werra | Same source |
| German | Germanic | Krieg | [kʁiːk] | < OHG chreg "stubbornness" | Different root |
| Dutch | Germanic | oorlog | [ˈoːrlɔx] | < PGmc "fate/decree" | Different root |
| Russian | Slavic | voyna | [vɐjˈna] | < PSl "warrior" | Unrelated |
| Polish | Slavic | wojna | [ˈvɔjna] | < PSl "warrior" | Unrelated |
| Arabic | Semitic | harb | [ħarb] | < "blade, weapon" | Unrelated |
| Hebrew | Semitic | milkhamah | [milχaˈma] | < "to fight" | Unrelated |
| Chinese | Sino-Tibetan | zhanzheng | [ʈʂân.ʈʂə́ŋ] | "battle-struggle" | Unrelated |
| Japanese | Japonic | senso | [seɴsoː] | < Chinese | Borrowed |
| Korean | Koreanic | jeonjaeng | [t͡ɕʌnd͡ʑɛŋ] | < Chinese | Borrowed |
| Hindi | Indo-Iranian | yuddh | [jud̪d̪ʰ] | < PIE *yewdʰ- "to fight" | Distant PIE cognate |
| Swahili | Bantu | vita | [ˈvi.ta] | Bantu origin | Unrelated |

**Key Observations**:

1. **The Frankish Spread**: One Germanic word (*werra) became the standard for "war" in five major Romance languages.

2. **Germanic Diversity**: Despite being relatives, English, German, and Dutch use completely different words for "war."

3. **Sinosphere Unity**: Chinese, Japanese, and Korean share the same characters (戰爭).

4. **Semantic Variety**: Different cultures conceptualize war differently:
   - *war* (English): from "confusion"
   - *Krieg* (German): from "stubbornness"
   - *oorlog* (Dutch): from "fate/decree"
   - *voyna* (Russian): from "warrior"
   - *harb* (Arabic): from "blade"

---

### 9. Debates & Uncertainties: What Scholars Still Argue About

**Source**: GAPS.md research

**Active Debates**:

#### A. "Confusion" vs. "Strife" as Original Sense

| Position | Evidence |
|----------|----------|
| PIE *wers- meant "confusion" | Watkins' reconstruction; semantic fits "mixing up" |
| Germanic attestations emphasize "strife" | OHG werra glossed as "strife," not confusion |
| Resolution | Semantic evolution: confusion (disorder) → strife (interpersonal) → war (organized) |

**Essay Approach**: Present both; note PIE suggests "confusion" is older.

#### B. Why Romance Languages Abandoned Latin *bellum*

| Theory | Explanation |
|--------|-------------|
| **Homophony (consensus)** | *bellum* (war) merged with *bellus* (beautiful) in Vulgar Latin |
| Semantic shift | *bellum* described "orderly" Roman warfare; *werra* captured post-Roman chaos |
| Euphemism | *bellum* acquired taboo associations |
| de Vaan (2008) | *bellum* and *bellus* may share etymology |

**Essay Approach**: Lead with homophony theory; mention alternatives.

#### C. Exact Semantic Content of Frankish *werra

Glosses vary across sources:
- "confusion" (Etymonline)
- "strife" (OED)
- "quarrel" (Wiktionary)
- "riot, disturbance, tumult" (various)

**Essay Approach**: List multiple glosses; acknowledge uncertainty.

**What We Cannot Claim**:
1. Precise pronunciation of historical forms (IPA for ME forms uncertain)
2. Exact manuscript location of 858 CE letter (not identified)
3. Corpus frequency changes over time (data not gathered)
4. First attestation dates for collocations like "wage war" (not confirmed)

---

### 10. Why This Matters: Language, Law, and Moral Weight

**INSERT VISUAL MODULE 8**: Timeline Band (Word History vs. World History)

**Content**:

The word "war" is not neutral. It carries ethical weight:
- Legal weight: "Declaration of war" triggers international law
- Political weight: Calling conflict "war" mobilizes public
- Propaganda weight: "War on X" borrows urgency for non-military campaigns

**OED (1921) Observation**:
> "It is a curious fact that no Germanic nation in early historic times had in living use any word properly meaning 'war'... The Romanic-speaking peoples, who were obliged to avoid the Latin bellum on account of its formal coincidence with bello- beautiful, found no nearer equivalent in Germanic than werra."

**Why English Uses a French Loanword**:
Old English had native words: *guþ*, *wig*, *gewin*. These died out after 1066. English acquired "war" not from its Germanic ancestors but through conquest—the very act the word describes.

**Ethical Frame**:
This essay does not glorify war. It examines how language names human reality, and how word choice shapes understanding. The history of "war" is a history of how societies conceptualize organized violence.

---

### 11. FAQ (8-12 Questions)

**Q1: Is "war" a native English word?**
No. It entered English from Norman French after the Conquest of 1066. Old English had different words for war: *guþ*, *wig*, *gewin*.

**Q2: What was the earliest recorded use of "war" in English?**
The Peterborough Chronicle, c.1121-1122, in the form *wyrre*, describing King Henry I's war in Normandy.

**Q3: Why doesn't English use a Latin root like *bellum*?**
The Latin word *bellum* (war) became phonologically identical to *bellus* (beautiful) in Vulgar Latin, causing confusion. Romance languages adopted the Germanic *werra* instead.

**Q4: Is German *Krieg* related to English "war"?**
No. They are completely different etymologies. *Krieg* comes from Old High German *chreg* meaning "stubbornness" or "effort."

**Q5: When did "declare war" and "wage war" become fixed phrases?**
These collocations were established by the 18th century in legal and diplomatic language, though exact first attestation dates are unconfirmed.

**Q6: What does the asterisk (*) before a word mean?**
It marks a reconstructed form—a word scholars believe existed but that is not directly attested in any surviving document. *\*werra* is reconstructed from its Romance descendants.

**Q7: Why do French say *guerre* but English says *war*?**
Standard Old French changed Germanic /w/ to /g/ (producing *guerre*), but northern dialects (Norman) kept /w/ (producing *werre*). English inherited the Norman form.

**Q8: When did "war on poverty" and similar phrases appear?**
LBJ's 1964 State of the Union address coined "War on Poverty." The "War on Drugs" followed in 1971. These metaphorical extensions apply war's urgency to policy goals.

**Q9: What languages share the same word for war?**
French, Spanish, Italian, and Portuguese all use forms of *guerra*—all descended from Frankish *\*werra*. Chinese, Japanese, and Korean share 戰爭 (zhanzheng/senso/jeonjaeng).

**Q10: Is there still scholarly debate about the word's origin?**
Yes. The exact meaning of Frankish *\*werra* (confusion? strife? quarrel?) and why Romance languages chose it over Latin *bellum* are still discussed by etymologists.

---

### 12. Key Terms Mini-Glossary (12-18 terms)

| Term | Definition |
|------|------------|
| **Attestation** | A documented occurrence of a word in a dated text |
| **Cognate** | Words in different languages descended from the same ancestor |
| **Collocation** | Words that frequently occur together (e.g., "wage war") |
| **Compound** | A word formed from two or more elements (e.g., "warfare") |
| **Etymology** | The study of word origins and historical development |
| **Gloss** | A brief definition or translation of a word |
| **IPA** | International Phonetic Alphabet; standardized pronunciation notation |
| **Loanword** | A word borrowed from another language |
| **Middle English (ME)** | English c.1150-1500, post-Conquest |
| **Old English (OE)** | English c.450-1150, pre-Conquest |
| **Old French (OF)** | French c.900-1400 |
| **PIE** | Proto-Indo-European; reconstructed ancestor of Indo-European languages |
| **Phonology** | The study of sounds in language |
| **Reconstruction** | Scholarly inference of an unattested ancestral form |
| **Semantic shift** | Change in a word's meaning over time |
| **Vulgar Latin** | Spoken Latin of the common people, ancestor of Romance languages |

---

### 13. Methods & Sources

**Research Methodology**:
This essay's claims are grounded in historical lexicography. Every etymology pathway follows the chain of evidence documented in:
- Oxford English Dictionary (primary authority for English)
- Middle English Dictionary (University of Michigan)
- Etymonline (etymological reference)
- Historical dictionaries (Kluge, de Vaan)

**How Claims Were Verified**:
1. **Attested forms** cite specific manuscripts or dictionaries
2. **Reconstructed forms** are marked with asterisk (*) and attributed to source
3. **Dates** specify "c." (circa) when approximate
4. **Disputes** are documented in the Debates section

**What We Did Not Do**:
- Corpus frequency analysis (data not gathered)
- Direct consultation of 858 CE manuscript (location unconfirmed)
- Direct access to Anglo-Norman Dictionary (cited via OED)

---

### 14. Citations Plan

**Source Types and Placement**:

| Source Type | Examples | Where Used |
|-------------|----------|------------|
| **Tier 1: Primary dictionaries** | OED, MED | Etymology spine, dates, definitions |
| **Tier 2: Etymological references** | Etymonline, Kluge, Watkins | PIE reconstruction, Germanic data |
| **Tier 3: Manuscript sources** | Peterborough Chronicle | First attestation |
| **Tier 4: Scholarly monographs** | Huizinga's *Homo Ludens* | Dutch *oorlog* etymology |
| **Tier 5: Historical documents** | LBJ speech (1964), Time (1939) | Modern extensions |

**Citation Style**:
Inline parenthetical citations: (OED, "war, n.1"), (MED, s.v. "werre")
Full bibliography at essay end.

---

### 15. Claim Registry

**High-Stakes Claims Requiring Verification**:

| Claim | Source | Verification Status |
|-------|--------|---------------------|
| First English attestation c.1121 | OED, MED | VERIFIED |
| 858 CE first written record | OED (secondary) | PARTIALLY VERIFIED (document location unknown) |
| PIE *wers- = "to confuse" | Watkins | VERIFIED (within reconstruction limits) |
| Frankish *werra is reconstructed | OED, Etymonline | VERIFIED |
| bellum/bellus homophony theory | OED 1921, scholarly consensus | VERIFIED as leading theory |
| "World war" first used 1848 | OED | VERIFIED |
| LBJ coined "War on Poverty" 1964 | Historical record | VERIFIED |

**Claims to Hedge**:
- Exact meaning of Frankish *werra: use "may have meant" or list multiple glosses
- Pronunciation of ME forms: avoid specific IPA without source
- First use of collocations: say "long-established" without dates

---

### 16. Internal Linking Plan

**Follow-Up Essays (3 Clusters)**:

**Cluster A: Related Etymology Essays**
1. "The Word Battle" — from Vulgar Latin *battuere* "to beat"
2. "The Word Peace" — the opposite semantic field
3. "The Word Conquest" — Norman Conquest language
4. "The Word Army" — Latin *armata* through Old French

**Cluster B: Language Contact Essays**
5. "Norman Words in English" — the Conquest's linguistic legacy
6. "Why English Has Two Words" — Germanic vs. Romance doublets
7. "The Word Guarantee" — another word where w-/g- split matters
8. "French Words in English" — broader borrowing patterns

**Cluster C: Semantic Field Essays**
9. "The Word Violence" — from Latin *violentia*
10. "The Word Terror" — modern political etymology
11. "The Word Enemy" — from Latin *inimicus*
12. "The Word Hero" — Greek origins, semantic evolution

**Linking Strategy**:
- Inline contextual links where terms appear naturally
- "Further Reading" sidebar with 3-4 most relevant links
- End-of-essay "Related Essays" section

---

# Layer 4: Content Modules

## Module A: Etymological Spine

**Source**: ETYMOLOGY-DATA.md

### Complete Pathway

1. **Proto-Indo-European *wers-**
   - Meaning: "to confuse, mix up"
   - Status: RECONSTRUCTED
   - Source: Watkins (via Etymonline)
   - Confidence: High (widely accepted)

2. **Proto-Germanic *werz-a-**
   - Meaning: "to confuse, bring into confusion"
   - Status: RECONSTRUCTED
   - Related verbs: *werran- (to confuse)
   - Cognates: OS werran, OHG werran "to confuse"

3. **Frankish *werra / *werru**
   - Meaning: "confusion; riot; quarrel; strife"
   - Status: RECONSTRUCTED (no direct attestation)
   - Evidence: Romance descendants, OHG cognate, Medieval Latin attestation

4. **Medieval Latin werra**
   - First attestation: 858 CE
   - Context: Episcopal letter from northeastern France
   - Gloss: "strifes or arguments or seditions" (vernacular term)
   - Status: ATTESTED

5. **Old French guerre / Old North French werre**
   - Forms: guerre (standard), werre/were/wiere (northern)
   - Meaning: "difficulty, dispute; hostility; fight, combat, war"
   - Period: c.1000-1300
   - Key distinction: Northern dialects retained Germanic /w/

6. **Anglo-Norman werre**
   - Forms: werre, were, wiere, guerre
   - Period: c.1066-1400
   - Note: Post-Conquest England; preserved /w/ forms

7. **Middle English werre/warre**
   - First attestation: c.1121-1122 (entry for 1116)
   - Source document: Peterborough Chronicle (MS. Laud Misc. 636)
   - First form: wyrre (possibly inverted spelling)
   - Full variant list: werre, guer, guerre, gwerre, ver, verr, verre, waar, waer, war, ware, warr, warre, weer, weire, weore, weorre, wer, were, werr, weyr, where, wherre, wirre, worre, berre

8. **Modern English war**
   - Standard form: war
   - Spelling standardization: c.1500+ (with printing)
   - Pronunciation: /wɔːr/ (RP), /wɔr/ (GA)

### Old English Context

English had native words before the Norman Conquest:
- **guþ** (gūþ): "war, battle, combat" (poetic)
- **wig**: "war, battle" (common)
- **gewin**: "struggle, strife" (usual translation of Latin bellum)
- **ingewinn**: "civil war"

These were displaced by the Norman French loan *werre*.

---

## Module B: Semantic Evolution

**Source**: TIMELINE.md

| Period | Primary Sense | Extensions | Source |
|--------|---------------|------------|--------|
| PIE | "to confuse, mix up" | — | Watkins |
| PGmc / Frankish | "confusion, strife, quarrel" | — | OED |
| c. 1121 | "large-scale military conflict" | — | MED |
| late 12c | | "state of hostility between persons" | OED |
| mid-14c | | "fighting as profession" | OED |
| late 14c | | "civil war" (calque from Latin) | OED |
| 1540s | | figurative "warfare" | Etymonline |
| 1848 | | "world war" | OED |
| 1918 | | "total war" | Wikipedia |
| 1933+ | | figurative "war on [X]" | Wikipedia |

**Key Transformation**: From disorder (PIE "confusion") to organized state violence (modern "war").

---

## Module C: Morphological Productivity

### Derivatives

| Word | Origin | First Attested |
|------|--------|----------------|
| warrior | ONF werreier | c.1300 |
| warfare | war + fare | implied c.1400 |
| warlike | war + like | — |
| warmonger | war + monger | — |
| warlord | war + lord | — |
| warship | war + ship | — |
| warpath | war + path | — |
| war-weary | war + weary | 1895 |
| war zone | war + zone | 1914 |
| war crime | war + crime | 1906 |
| war bride | war + bride | 1918 |
| war chest | war + chest | 1901 |

### Compounds by Era

| Era | Compounds |
|-----|-----------|
| Medieval | warrior, warfare |
| Early Modern | warlike, warmonger |
| 19th century | world war (1848) |
| 20th century | total war, cold war, war crime, war zone |
| Contemporary | culture war, price war, trade war |

### Collocations

- **declare war**: formal legal act
- **wage war**: active prosecution
- **at war**: state of hostility
- **war footing**: preparatory mobilization
- **in war and peace**: at all times (late 14c)
- **man-of-war**: fighting ship (mid-14c: "fighting as profession")

---

## Module D: Contrast Set

### War vs. Battle vs. Conflict

| Term | Scale | Duration | Actors | Legal Status |
|------|-------|----------|--------|--------------|
| **war** | Large | Sustained | States/parties | Formally declared |
| **battle** | Localized | Single event | Military units | Part of war |
| **conflict** | Variable | Variable | Any parties | May be informal |
| **combat** | Immediate | Momentary | Individuals/units | The act itself |
| **feud** | Personal/family | Prolonged | Private parties | Not state-sanctioned |
| **riot** | Urban/local | Spontaneous | Crowds | Civil disturbance |

### Why "War" Is Distinct

1. **Scale**: Wars involve large-scale mobilization
2. **State actors**: Wars are typically between nations or organized parties
3. **Legal framing**: "Declaration of war" triggers international law
4. **Duration**: Wars are sustained campaigns, not isolated incidents
5. **Formal termination**: Wars end with treaties, surrenders, armistices

---

## Module E: Cross-Linguistic Comparison

**Source**: CROSS-LINGUISTIC.md

### 15 Languages, 7 Families

**Family 1: Germanic**
- English: war (< Frankish via French)
- German: Krieg (< "stubbornness")
- Dutch: oorlog (< "fate/decree")

**Family 2: Romance**
- French: guerre (< Frankish *werra)
- Spanish: guerra
- Italian: guerra
- Portuguese: guerra
- Exception: Romanian război (< Slavic)

**Family 3: Slavic**
- Russian: voyna (< "warrior")
- Polish: wojna

**Family 4: Semitic**
- Arabic: harb (< "blade, weapon")
- Hebrew: milkhamah (< "to fight")

**Family 5: Sino-Tibetan**
- Chinese: zhanzheng (戰爭, "battle-struggle")

**Family 6: Japonic**
- Japanese: senso (戦争, < Chinese)

**Family 7: Koreanic**
- Korean: jeonjaeng (전쟁, < Chinese)

**Additional**:
- Hindi: yuddh (< PIE *yewdʰ- "to fight")
- Swahili: vita (Bantu origin)

### Key Observations

1. **Frankish Spread**: One Germanic word colonized five major Romance languages
2. **Germanic Diversity**: Three Germanic languages use three different roots
3. **Sinosphere Unity**: Chinese script spread war terminology to Japan and Korea
4. **Semantic Origins Vary**: Each culture conceptualized war differently (confusion, stubbornness, fate, warrior, blade)

---

## Module F: Cultural-Historical Context

### How the Word Traveled

**Language Contact Events**:

1. **Frankish-Romance Contact (5th-10th c.)**
   - Frankish tribes conquered Gaul
   - Germanic *werra entered Vulgar Latin
   - First written attestation: 858 CE

2. **Norman Conquest (1066)**
   - Norman French brought to England
   - Northern French preserved /w/ (vs. standard French /g/)
   - Anglo-Norman *werre* displaced OE *guþ*, *wig*, *gewin*

3. **Printing Revolution (c.1476+)**
   - Caxton's press standardized spelling
   - "war" became fixed form by 1500

### Prestige Channels

- **Court**: Norman French was the language of English royalty/aristocracy
- **Law**: Legal documents used Anglo-Norman terminology
- **Administration**: Government records in French and Latin
- **Print**: Standardization through printed texts

### Why Norman French Won

- Conquerors imposed their language on administration
- Native OE words lost prestige
- "War" arrived with the warriors who waged it

---

## Module G: Disputes & Debates

**Source**: GAPS.md

### Unresolved Questions

1. **Original meaning of *werra**: "confusion" or "strife" or both?
2. **Why Romance chose Germanic**: homophony alone, or semantic factors too?
3. **de Vaan's hypothesis**: Are *bellum* and *bellus* etymologically related?
4. **Exact timing**: When did w → gu change occur in Old French?

### What We Cannot Verify

- Location of 858 CE manuscript (OED cites secondarily)
- IPA for Middle English forms (reconstruction uncertain)
- Corpus frequency changes (data not gathered)
- First use dates for collocations

### Safe vs. Hedged Claims

**Safe**:
- First English attestation c.1121 in Peterborough Chronicle
- Etymology: ONF werre < Frankish *werra (reconstructed)
- Romance languages borrowed from Germanic
- Homophony theory is scholarly consensus

**Hedged**:
- Original PIE sense "may have been" confusion
- Frankish form is "reconstructed, not directly attested"
- Scholarly debate continues on exact original meaning

---

# Layer 5: Scroll-Lock Sequences

## Proposed Animation Choreography

### Sequence 1: Etymology River (Section 3)

**Trigger**: User scrolls into Section 3 (Etymology Spine)

**Animation**:
1. PIE node appears (with asterisk, dashed outline)
2. Arrow animates downward
3. Proto-Germanic node fades in
4. Arrow continues
5. Frankish node appears (still dashed—reconstructed)
6. Arrow splits into two branches
7. Medieval Latin (858 CE) highlights as "First Written Record"
8. Old French and Old North French appear simultaneously
9. Arrows converge on Anglo-Norman
10. Middle English variants cascade (werre, warre, war)
11. Modern "war" locks into position

**Micro-interaction**: Tap any node for tooltip with full data.

### Sequence 2: Sound & Spelling Panel (Section 4)

**Trigger**: User scrolls into Section 4

**Animation**:
1. Map of France appears
2. Northern region highlights (Norman, Picard)
3. Central region highlights (Île-de-France)
4. Sound transformation arrows animate:
   - North: /w/ → /w/ (preserved)
   - Center: /w/ → /gw/ → /g/
5. Toggle appears: "Spelling" / "Sound"
6. Default view shows orthographic forms
7. User toggle reveals IPA transcriptions

### Sequence 3: Cognate Network (Section 8)

**Trigger**: User scrolls into "World Tour" section

**Animation**:
1. Central node appears: "war words"
2. Frankish cluster materializes (English, French, Spanish, Italian, Portuguese)
3. Independent Germanic nodes appear (German, Dutch)
4. Slavic cluster appears
5. Semitic nodes appear
6. Sinosphere cluster appears with borrowing arrows
7. Connections animate to show relationships

**Interaction**: Click on cluster to highlight related languages.

### Sequence 4: Timeline Band (Section 10)

**Trigger**: User scrolls into "Why This Matters" section

**Animation**:
1. Dual tracks appear (Linguistic above, Historical below)
2. Timeline scrubs from 858 CE toward present
3. Events appear in sequence with gentle pulsing
4. Parallel events on both tracks highlight simultaneously
5. Warning annotation fades in: "Correlation is not causation"

---

# Layer 6: Production Notes

## Key Figures (Lexicographers, Scholars)

| Name | Role | Relevance |
|------|------|-----------|
| **Calvert Watkins** | PIE etymologist | Source for *wers- reconstruction |
| **Samuel Johnson** | Lexicographer | 1755 Dictionary codified "war" |
| **James Murray** | OED editor | Historical etymology documentation |
| **Douglas Harper** | Etymonline editor | Modern etymological reference |
| **Friedrich Kluge** | German etymologist | German *Krieg* etymology |
| **Johan Huizinga** | Cultural historian | Dutch *oorlog* etymology (Homo Ludens) |
| **Michiel de Vaan** | Latinist | bellum/bellus hypothesis |

## Key Quotes (Selected from QUOTES.md)

### Primary Attestations

**1. Peterborough Chronicle (c.1121-22)**
> "Eall þis gear wunode se cyng Henri on Normandig for þes cynges **wyrre** of France..."

Translation: "All this year King Henry stayed in Normandy on account of the **war** of the King of France..."

**2. Chaucer, Canterbury Tales (c.1387-95)**
> "Ful worthy was he in his lordes **werre**, / And therto hadde he riden, no man ferre..."

### Lexicographic Authority

**3. OED (1921 edition)**
> "It is a curious fact that no Germanic nation in early historic times had in living use any word properly meaning 'war'... The Romanic-speaking peoples, who were obliged to avoid the Latin bellum on account of its formal coincidence with bello- beautiful, found no nearer equivalent in Germanic than werra."

**4. OED Definition**
> "Hostile contention by means of armed forces, carried on between nations, states, or rulers, or between parties in the same nation or state."

### Scholarly Commentary

**5. Kluge on German *Krieg***
> "This word, obscure in origin, is shared only by Dutch (krijg) with German; in all the other Teutonic languages it is wanting..."

**6. Huizinga on Dutch *oorlog* (Homo Ludens)**
> "The origin of the curious Dutch word for war, oorlog, is not altogether clear, but at any rate it belongs to the sacred or ritual sphere."

**7. Etymonline**
> "The cognates suggest the original sense was 'bring into confusion.'"

### Historical Usage

**8. LBJ State of the Union (1964)**
> "This administration today, here and now, declares unconditional war on poverty in America."

## Visual Assets (from VISUALS.md)

### Primary Visual Sources

| Asset | Repository | Access | Priority |
|-------|------------|--------|----------|
| Peterborough Chronicle (MS. Laud Misc. 636) | Bodleian Library | Digital facsimile | HIGHEST |
| Johnson's Dictionary (1755) | Internet Archive | Public domain | HIGH |
| Webster's Dictionary (1828) | Internet Archive | Public domain | MEDIUM |
| Bayeux Tapestry | Wikimedia Commons | Public domain | MEDIUM (context) |

### Recommended Visual Narrative

1. **Opening**: Document/manuscript imagery (not battle scenes)
2. **Etymology Section**: Peterborough Chronicle page with *wyrre* highlighted
3. **Dictionary Section**: Johnson's Dictionary entry
4. **Cross-Linguistic Section**: Multilingual typography infographic
5. **Modern Usage**: Newspaper headline typography

### Typography Considerations

| Era | Suggested Style |
|-----|-----------------|
| Medieval manuscripts | Insular script, Carolingian minuscule |
| 15th-16th century | Blackletter/Gothic |
| 18th century | Caslon, transitional serif |
| 19th century | Clarendon, modern serif |
| 20th century | Various modern faces |

## Claims Requiring Verification

### Before Publication, Verify:

| Claim | Source | Action |
|-------|--------|--------|
| 858 CE letter location | OED (secondary) | Attempt to identify archive |
| ME forms from MED | MED (access blocked) | Verify via institutional access |
| AND entry | OED summary | Direct AND consultation if possible |
| de Vaan's bellum/bellus theory | Secondary citation | Consult de Vaan 2008 directly |

### Mark as Uncertain in Essay:

1. Exact pronunciation of historical forms
2. First attestation dates for collocations
3. Corpus frequency changes
4. Specific folio number in Peterborough Chronicle

---

## Research Package Reference

All source data in:
```
orchestration/skills/visual-essay-invocation/research/the-word-war/
├── INTAKE.md                   ✅ Complete
├── ETYMOLOGY-DATA.md           ✅ Complete
├── CROSS-LINGUISTIC.md         ✅ Complete (15 languages, 7 families)
├── TIMELINE.md                 ✅ Complete
├── QUOTES.md                   ✅ Complete (18 quotes)
├── VISUALS.md                  ✅ Complete
├── GAPS.md                     ✅ Complete
└── SYNTHESIS.md                ✅ Complete
```

---

## Implementation Notes for Production Orchestrator

### Content Completeness
This spec contains all content needed to build the essay without consulting research files directly.

### Visual Module Priority
1. Etymology River (Module 1) — Core visualization
2. Sound & Spelling Panel (Module 2) — Key explainer
3. Cognate Network (Module 3) — High impact
4. Semantic Constellation (Module 4) — Useful for contrast set
5. Geographic Map (Module 7) — High impact
6. Timeline Band (Module 8) — Dual-track narrative
7. Metaphor Chart (Module 6) — Semantic evolution
8. Typographic System (Module 9) — Design foundation
9. Frequency Chart (Module 5) — DEFER (data not gathered)

### Ethical Guardrails
- No battlefield imagery
- Documents, inscriptions, typography only
- No glorification of violence
- Treat war as linguistic artifact, not spectacle

### SEO Keywords to Include
- etymology of war
- origin of the word war
- guerre / guerra
- Middle English warre/werre
- semantic shift of "war"
- war vs battle vs conflict

---

*Spec prepared by Visual Essay Invocation Agent*
*January 3, 2026*
*Status: [SPEC-DRAFT] — Pending Gate 3 Approval*
