# Esy.com Agent System

This directory contains specialized AI agents for the Esy.com ecosystem. Each agent is designed for a specific domain and can be invoked by referencing it in your prompt.

**📍 Output Location:** All scrollytelling/visual essay output goes to `src/app/essays/visual/[story-slug]/` unless directed otherwise. The hub is at `/essays/visual/` with data in `VisualEssaysClient.tsx`.

---

## Directory Structure

```
agents/
├── orchestrators/     # 🎬 Top-level coordination (5 agents)
├── auditors/          # 🔍 Quality verification (7 agents)
├── content/           # 📚 Content creation (4 agents)
├── research/          # 🔬 Source discovery (2 agents)
├── regional/          # 🌏 Regional specialists (2 agents)
├── engineering/       # ⚙️ Technical implementation (7 agents)
└── utilities/         # 🔧 Support & enhancement (3 agents)
```

---

## Quick Reference

### 🎬 Orchestrators
| Agent | Best For | Invocation |
|-------|----------|------------|
| [Visual Essay Orchestrator](#visual-essay-orchestrator) | **END-TO-END PRODUCTION** | `@agents/orchestrators/visual-essay-orchestrator.md` |
| [Research Orchestrator](#research-orchestrator) | **Research pipeline (Phase 2)** | `@agents/orchestrators/research-orchestrator.md` |
| [Meta Audit Orchestrator](#meta-audit-orchestrator) | Multi-domain audit coordination | `@agents/orchestrators/meta-audit-orchestrator.md` |
| [QA Remediation Orchestrator](#qa-remediation-orchestrator) | **Iterative fix loop** (audit→fix→reaudit) | `@agents/orchestrators/qa-remediation-orchestrator.md` |
| [Scrollytelling Expert](#scrollytelling-expert) | Immersive scroll-based stories | `@agents/orchestrators/scrollytelling-expert.md` |

### 🔍 Auditors
| Agent | Best For | Invocation |
|-------|----------|------------|
| [Citation Audit Agent](#citation-audit-agent) | Verify citations & source quality | `@agents/auditors/citation-audit-agent.md` |
| [Quotes Audit Agent](#quotes-audit-agent) | Verify quote authenticity | `@agents/auditors/quotes-audit-agent.md` |
| [Visual Auditor Agent](#visual-auditor-agent) | SVG quality & animation audit | `@agents/auditors/visual-auditor-agent.md` |
| [Scrollytelling Audit Agent](#scrollytelling-audit-agent) | Experience evaluation | `@agents/auditors/scrollytelling-audit-agent.md` |
| [Immersive Scrolling Auditor](#immersive-scrolling-auditor) | Scroll-lock & 60fps certification | `@agents/auditors/immersive-scrolling-auditor.md` |
| [Immersive Experience Auditor](#immersive-experience-auditor) | Comprehensive experience QA | `@agents/auditors/immersive-experience-auditor.md` |
| [SEO Audit Agent](#seo-audit-agent) | Page-level SEO auditing | `@agents/auditors/seo-audit-agent.md` |

**Reports:** `auditors/CitationReports/` · `auditors/VisualAuditReports/`

### 📚 Content Creators
| Agent | Best For | Invocation |
|-------|----------|------------|
| [Historian Writer](#historian-writer-expert) | Historical narrative content | `@agents/content/historian-writer-expert.md` |
| [Historian Editor](#historian-editor-expert) | Fact-checking & verification | `@agents/content/historian-editor-expert.md` |
| [Essayist](#essayist-expert) | Academic essay guidance | `@agents/content/essayist-expert.md` |
| [Copywriter](#copywriter-marketing-expert) | Marketing & conversion copy | `@agents/content/copywriter-marketing-expert.md` |

### 🔬 Research
| Agent | Best For | Invocation |
|-------|----------|------------|
| [Brainstorming Agent](#brainstorming-agent) | Research question formulation | `@agents/research/brainstorming-agent.md` |
| [Research & Citations](#research--citations-expert) | Authoritative source discovery | `@agents/research/research-citations-expert.md` |
| [Image Research & Licensing](#image-research--licensing-expert) | Archive image sourcing & rights | `@agents/research/image-research-licensing-expert.md` |

### 🌏 Regional Experts
| Agent | Best For | Invocation |
|-------|----------|------------|
| [Burmese Historian Expert](#burmese-historian-expert) | 🇲🇲 Myanmar cuisine, history, language, culture | `@agents/regional/burmese-historian-expert.md` |
| [Thai Historian Expert](#thai-historian-expert) | 🇹🇭 Thai cuisine, history, culture | `@agents/regional/thai-historian-expert.md` |

### ⚙️ Engineering
| Agent | Best For | Invocation |
|-------|----------|------------|
| [Software Engineer](#software-engineering-expert) | Full-stack Next.js development | `@agents/engineering/software-engineering-expert.md` |
| [Frontend Debugging](#frontend-debugging-expert) | React/Next.js issue diagnosis | `@agents/engineering/frontend-debugging-expert.md` |
| [Immersive Experience Engineer](#immersive-experience-engineer) | 60fps mobile, animations | `@agents/engineering/immersive-experience-engineer.md` |
| [SVG Illustration & Animation](#svg-illustration-animation-expert) | Inline SVG visuals & motion | `@agents/engineering/svg-illustration-animation-expert.md` |
| [UI/UX Designer](#uiux-design-expert) | Interface & experience design | `@agents/engineering/ui-ux-design-expert.md` |
| [Template Integration](#template-integration-engineer) | Raw templates → Next.js pages | `@agents/engineering/template-integration-engineer.md` |
| [SEO Specialist](#seo-specialist-expert) | Technical SEO, SERP strategy | `@agents/engineering/seo-specialist-expert.md` |

### 🔧 Utilities
| Agent | Best For | Invocation |
|-------|----------|------------|
| [Visual Essay Intake Enhancer](#visual-essay-intake-enhancer) | Enhance rough visual essay requests | `@agents/utilities/visual-essay-intake-enhancer.md` |
| [Scrollytelling Invocation Enhancer](#scrollytelling-invocation-enhancer) | Enhance scrollytelling requests | `@agents/utilities/scrollytelling-invocation-enhancer.md` |
| [Visual Essay Invocation](#visual-essay-invocation-agent) | Generate visual essay specs | `@agents/utilities/visual-essay-invocation-agent.md` |
| [README Curator](#readme-curator) | Documentation routing & maintenance | `@agents/utilities/readme-curator.md` |

**Resources:** `utilities/InvocationTemplates/`

---

## How to Invoke Agents

### Method 1: File Reference (Recommended)
Reference the agent file directly in your prompt:

```
Using @agents/scrollytelling-expert.md, create a scrollytelling experience 
about the history of coffee.
```

### Method 2: Role Statement
Use the full role definition from the agent:

```
Using your assigned role as an award-winning digital storytelling architect 
and scrollytelling expert with 15+ years of experience crafting immersive, 
scroll-based narrative experiences, create...
```

### Method 3: Combined (Most Effective)
Reference the file AND provide context:

```
Apply @agents/research-citations-expert.md to find Tier 1-2 sources for 
our scrollytelling piece about [topic]. Focus on .edu and major news sources.
```

---

## Agent Details

### Visual Essay Orchestrator
**File:** `orchestrators/visual-essay-orchestrator.md`

**Role:** Award-winning editorial director and digital publishing executive that orchestrates the complete visual essay production pipeline from brief to publication.

**🎬 TOP-LEVEL ORCHESTRATOR:** This is the highest-level agent for visual essay production. It coordinates the entire pipeline including content creation, citation research, and audit verification.

**Best For:**
- End-to-end visual essay production management
- Quality gate enforcement across all phases
- Citation integrity oversight (research + audit)
- Publication readiness approval
- Multi-project coordination

**Pipeline Phases:**
| Phase | Description | Owner |
|-------|-------------|-------|
| **1. Intake & Planning** | Brief development, scope, timeline | Director |
| **2. Production** | Content & design creation | → Scrollytelling Expert |
| **3. Citation Pipeline** | Source research + audit | → Research Expert → Citation Audit |
| **4. Publication Approval** | Final quality gates | Director |
| **5. Deployment & Monitoring** | Publish + track | Director |

**Quality Gates (All Blocking):**
| Gate | Pass Criteria | Certified By |
|------|---------------|--------------|
| G1: Brief Approval | Complete brief with scope, timeline, criteria | Director |
| G2: Design Research | Unique visual identity from subject matter | Scrollytelling Expert |
| G3: Content Complete | All sections drafted, fact-checked | Historian Editor |
| G4: Citation Research | Tier 1-2 sources for all major claims | Research Expert |
| G5: Citation Audit | Citation Certification achieved | Citation Audit Agent |
| G6: Scroll Certification | Scroll-lock, 60fps, mobile device testing | **Scrolling Auditor** |
| G7: Mobile Verification | Real device tested (Safari iOS, Chrome Android) | Director |
| G8: Publication Approval | Director sign-off | Director |

> 📖 **Learn More:** See [Quality Gates System](#quality-gates-system) for comprehensive documentation.

**Orchestrates:**
- `scrollytelling-expert.md` — Content and design creation
- `research-citations-expert.md` — Source discovery and verification
- `citation-audit-agent.md` — Citation integrity certification
- `immersive-scrolling-auditor.md` — Scroll functionality certification

**Invocation Examples:**
```
# Start new visual essay production
Using @agents/visual-essay-orchestrator.md, initiate production for a 
visual essay about "The History of the Bicycle".

Key details:
- Target read time: 10-12 minutes
- Include timeline of major innovations
- Vintage photography aesthetic

# Check production status
Using @agents/visual-essay-orchestrator.md, provide status update on 
the visual essay "The History of Coffee" currently in production.

# Final publication approval
Using @agents/visual-essay-orchestrator.md, conduct final publication 
approval review for the visual essay at 
src/app/essays/visual/history-of-coffee/
```

**Output:**
1. Production Brief with scope and timeline
2. Gate Status Reports for each checkpoint
3. Citation Pipeline coordination records
4. Publication Approval Document
5. Deployment confirmation

**When to Use:**
| Scenario | Use Director? |
|----------|---------------|
| Complete visual essay from scratch | ✅ Yes |
| Just need content creation | ❌ Use scrollytelling-expert directly |
| Just need citations | ❌ Use research-citations-expert directly |
| Just need citation audit | ❌ Use citation-audit-agent directly |
| Multiple essays in parallel | ✅ Yes (project tracking) |
| Strict quality gates needed | ✅ Yes |

---

### Visual Essay Intake Enhancer
**File:** `utilities/visual-essay-intake-enhancer.md`

**Role:** Expert brief architect that transforms rough visual essay requests into comprehensive, structured intake documents for the Visual Essay Orchestrator. Asks strategic clarifying questions when needed.

**🚀 USE THIS FIRST:** Before invoking the Visual Essay Orchestrator, run your rough request through this enhancer to ensure maximum quality output.

**Best For:**
- Transforming rough visual essay ideas into structured intakes
- Translating vague requirements ("cool visuals") into concrete specifications
- Capturing tone preferences as actionable directives
- Getting strategic questions about scope, audience, and approach

**Operating Modes:**
| Mode | Trigger | Behavior |
|------|---------|----------|
| **Quick** | `enhance this request:` | Uses intelligent defaults, no questions |
| **Guided** | `enhance with questions:` | Always asks 2-6 strategic questions first |
| **Auto** | Just provide request | Asks questions only if ambiguous |

**What It Does:**
1. **Assesses** clarity — is the request specific or vague?
2. **Asks** 2-6 high-impact questions (if needed)
3. **Translates** vague adjectives into concrete requirements
4. **Outputs** a complete intake document for the Visual Essay Orchestrator

**Invocation Examples:**
```
# Quick mode — trust the defaults
Using @agents/utilities/visual-essay-intake-enhancer.md, enhance this request:
"visual essay about semiconductors with cool visuals"

# Guided mode — I want to answer questions first
Using @agents/utilities/visual-essay-intake-enhancer.md, enhance with questions:
"I want a visual essay about the history of computing"

# Auto mode — ask if needed
Using @agents/utilities/visual-essay-intake-enhancer.md:
"create a visual essay about the fork's journey from scandal to necessity"
```

**Strategic Questions It Asks:**
- 🎯 "What's the ONE thing readers should understand after this essay?"
- 👥 "Complete beginners, curious generalists, or knowledgeable readers?"
- 🎭 "Any narrative tone to avoid? (e.g., too dramatic, too academic)"
- 📊 "Data-heavy with visualizations, or more narrative-driven?"
- 🎨 "Photorealistic, illustrated, or mixed visual treatment?"

**Why Use This:**
| Without Enhancer | With Enhancer |
|------------------|---------------|
| "cool visuals" | Specific: archival photography + data visualizations |
| Undefined audience | Clear: curious generalists |
| No tone guidance | Directive: educator mode, avoid purple prose |
| Vague scope | Prioritized: 5 ranked scope items |

---

### Scrollytelling Invocation Enhancer
**File:** `utilities/scrollytelling-invocation-enhancer.md`

**Role:** Expert prompt architect that transforms rough requests into comprehensive, structured briefs for scrollytelling agents. Asks strategic clarifying questions when needed.

**🚀 USE THIS FIRST:** Before invoking any scrollytelling agent, run your request through this enhancer for maximum quality output.

**Best For:**
- Transforming rough ideas into structured briefs
- Getting strategic questions to maximize output quality
- Generating character names, themes, and visual directions
- Ensuring world-class scrollytelling output

**Operating Modes:**
| Mode | Trigger | Behavior |
|------|---------|----------|
| **Quick** | `enhance this request:` | Uses intelligent defaults, no questions |
| **Guided** | `enhance with questions:` | Always asks 2-6 strategic questions first |
| **Auto** | Just provide request | Asks questions only if ambiguous |

**What It Does:**
1. **Assesses** clarity — is the request clear or ambiguous?
2. **Asks** 2-6 high-impact questions (if needed)
3. **Fills gaps** with intelligent defaults
4. **Outputs** a complete structured brief ready for the target agent

**Invocation Examples:**
```
# Quick mode — trust the defaults
Using @agents/scrollytelling-invocation-enhancer.md, enhance this request:
"story about a bunny who learns to share"

# Guided mode — I want to answer questions first
Using @agents/scrollytelling-invocation-enhancer.md, enhance with questions:
"a story about an owl"

# Auto mode — ask if needed
Using @agents/scrollytelling-invocation-enhancer.md:
"scrollytelling about how coffee was discovered"
```

**Strategic Questions It Asks:**
- 🎯 "What lesson should the child take away?"
- 🌙 "Bedtime-cozy or playtime-energetic?"
- 🔤 "Weave in counting, a letter, or pure story?"
- ⏱️ "Quick story or journey story?"
- 🎨 "Any visual inspiration?"

**Why Use This:**
| Without Enhancer | With Enhancer |
|------------------|---------------|
| "make a mouse story" | Full brief with character name, personality, theme, emotions, visual style, participation mechanics, animation priorities |
| Gaps → suboptimal output | Strategic questions → exactly what you envisioned |
| Agent makes assumptions | You control high-impact decisions |

---

### Scrollytelling Audit Agent
**File:** `auditors/scrollytelling-audit-agent.md`

**Role:** Orchestrating auditor that coordinates specialist agents to evaluate completed scrollytelling experiences and produce approval-required improvement recommendations.

**🔍 USE AFTER CREATING:** Run completed experiences through this agent to identify improvements before publishing.

**Best For:**
- Evaluating completed scrollytelling experiences
- Identifying mobile-native issues
- Performance and accessibility verification
- Systematic quality improvement

**Orchestrates:**
- `scrollytelling-expert.md` — Narrative & design evaluation
- `immersive-experience-engineer.md` — Mobile-native & performance

**Audit Depths:**
| Level | Time | Coverage |
|-------|------|----------|
| Quick | 5 min | Hero + 2-3 sections, first impressions |
| Standard | 15 min | Full walkthrough, spot-checks |
| Deep | 30+ min | Full specialist evaluations, real devices |

**Invocation Examples:**
```
# Quick audit
Using @agents/scrollytelling-audit-agent.md, conduct a quick audit of
/essays/visual/the-history-of-coffee

# Standard audit with focus
Using @agents/scrollytelling-audit-agent.md, conduct a standard audit of
/essays/visual/the-fork
Focus areas: Touch targets, animation performance

# Deep audit
Using @agents/scrollytelling-audit-agent.md, conduct a deep audit of
/essays/visual/the-discovery-of-antibiotics
```

**Output Format:**
The agent produces a structured audit report with:
1. Overall scores by category
2. 🔴 Critical issues (must fix)
3. 🟡 Important issues (should fix)
4. 🟢 Polish suggestions (nice to have)
5. Approval checkboxes for each recommendation
6. Positive findings (what's working)

**Approval Flow:**
```
Issue presented → User marks [x] Approve / [ ] Defer / [ ] Reject → 
Only approved fixes implemented
```

---

### Citation Audit Agent
**File:** `auditors/citation-audit-agent.md`

**Role:** World-class research librarian and citation integrity specialist that audits scrollytelling experiences for source quality, claim-evidence alignment, and citation accuracy.

**📚 USE BEFORE PUBLISHING:** Run completed experiences through this agent to verify all citations are valid, sources are credible, and claims are properly supported.

**📁 Reports Directory:** All audit reports are saved to `agents/auditors/CitationReports/` — see [CitationReports/README.md](./auditors/CitationReports/README.md) for the full index.

**Best For:**
- Verifying source credibility (Tier 1-4 classification)
- Mapping claims to citations (gap analysis)
- Detecting broken links
- Verifying quote authenticity
- Upgrading weak sources to authoritative alternatives

**📂 Research Directory Requirement (NEW):**
Every visual essay MUST have a `research/CITATIONS.md` file as the **single source of truth** for all citations:
```
src/app/essays/visual/[essay-slug]/
└── research/
    ├── README.md        # Directory overview
    └── CITATIONS.md     # ← Citation log (REQUIRED)
```

The citation log contains:
- All sources with URLs, tiers, and verification status
- Quote attributions with verification status
- Factual claims requiring citation support
- Version history of citation changes

**If research/CITATIONS.md is missing, the audit CANNOT proceed.**

**Source Tier System:**
| Tier | Quality | Examples |
|------|---------|----------|
| Tier 1 | Gold Standard | JSTOR, .edu, peer-reviewed, museums, archives |
| Tier 2 | Highly Credible | NYT, WSJ, Guardian, Britannica, major publishers |
| Tier 3 | Use with Caution | Wikipedia (verify elsewhere), expert blogs |
| Tier 4 | Red Flag (AVOID) | Social media, anonymous, self-published |

**Audit Depths:**
| Level | Time | Coverage |
|-------|------|----------|
| Quick | 5 min | Sources scan, link check, tier classification |
| Standard | 15 min | Full claim mapping, source verification |
| Deep | 30+ min | Quote verification, original source review |

**Invocation Examples:**
```
# Standard citation audit
Using @agents/citation-audit-agent.md, audit the citations for
/essays/visual/the-firearm
Type: General

# Deep audit with focus areas
Using @agents/citation-audit-agent.md, conduct a deep citation audit of
/essays/visual/the-history-of-burmese-cuisine
Focus areas: Historical accuracy, quote verification

# Quick check before publishing
Using @agents/citation-audit-agent.md, perform a quick citation audit of
/essays/visual/the-discovery-of-antibiotics
```

**What It Checks:**
| Category | Checks |
|----------|--------|
| Research Directory | `research/CITATIONS.md` exists and is complete |
| Citation Log Sync | Essay sources ↔ CITATIONS.md match (bidirectional) |
| Claim-Citation Mapping | Every factual claim has Tier 1-2 source |
| Source Quality | 80%+ sources are Tier 1-2, zero Tier 4 |
| Link Integrity | **Browser-verified** — all URLs physically tested |
| Quote Accuracy | **Orchestrates quotes-audit-agent.md** for verification |
| Format Consistency | Uniform citation style throughout |

**🔗 Browser-Based Link Verification (NEW):**
This agent uses actual browser navigation to verify links work:
```
1. Navigate to each URL using browser tools
2. Check page title matches expected content
3. Detect redirects to wrong pages (sneaky 404s)
4. Find replacement URLs for broken links
```

**💬 Quote Orchestration (NEW):**
When quotes are detected, this agent invokes `quotes-audit-agent.md`:
```
Citation Audit → Extracts quotes → Quotes Audit Agent → Returns verdicts → Integrated into report
```

**Output Format:**
The agent produces a structured audit report with:
1. Source tier distribution metrics
2. 🔴 Critical issues (unsupported claims, Tier 4 sources)
3. 🟡 Important issues (weak sources, broken links)
4. 🟢 Polish suggestions (format, ordering)
5. Unsupported claims inventory with suggested sources
6. Link status report
7. Certification status (Approved/Rejected)

**Approval Flow:**
```
Critical issues found → Must fix before publishing →
User approves fixes → Agent implements → Re-audit → Certification
```

---

### Quotes Audit Agent
**File:** `auditors/quotes-audit-agent.md`

**Role:** World-class quote verification specialist that authenticates quotations, identifies misattributions, and ensures proper citation standards for direct quotes.

**💬 ORCHESTRATED BY CITATION AUDIT AGENT:** This agent is invoked by `citation-audit-agent.md` when quotes are detected in scrollytelling content. Do not invoke directly unless specifically auditing quotes.

**Best For:**
- Verifying quote authenticity against primary sources
- Detecting famous misattributions (Einstein, Gandhi, etc.)
- Ensuring proper attribution and context
- Converting unverified quotes to paraphrases

**Quote Verdicts:**
| Verdict | Meaning | Action |
|---------|---------|--------|
| ✅ Verified | Primary source found | Approve |
| ⚠️ Plausible | Secondary sources agree | Add source note |
| 🟡 Disputed | Origin unclear | Must note "origin disputed" |
| ❌ Unverified | No credible source | Rephrase as paraphrase |
| 🚫 Misattributed | Wrong speaker | Critical fix required |

**Quote Fix Patterns:**
```
UNVERIFIED → Remove quotes, rephrase:
  Before: "Fire lances could spit flames for five minutes."
  After:  Historical accounts describe fire lances spitting flames for up to five minutes.

DISPUTED → Add attribution note:
  Before: "God created men. Sam Colt made them equal."
  After:  "God created men. Sam Colt made them equal." — Popular frontier saying, origin disputed

EDITORIAL → Label clearly:
  Before: "The gun is the great equalizer..."
  After:  The gun became the great equalizer... — Editorial synthesis
```

**Invoked By:**
The Citation Audit Agent automatically invokes this agent when quotes are found:
```
Using @agents/quotes-audit-agent.md, verify the following quotes:
1. "[Quote text]" — Attributed to [Speaker]
2. ...
```

**Red Flags Detected:**
- Quotes found only on brainyquote.com / goodreads
- "Too perfect" quotes for historical figures
- Anachronistic language for the era
- No date/context provided

---

### Visual Auditor Agent
**File:** `auditors/visual-auditor-agent.md`

**Role:** World-class visual quality assurance specialist and creative director that audits SVG illustrations and animations for technical quality, aesthetic excellence, performance, accessibility, and content relevance.

**🎨 USE BEFORE PUBLISHING:** Run all custom SVG visual assets through this agent to verify they meet publication standards.

**Best For:**
- Auditing SVG technical quality (optimization, structure, code cleanliness)
- Verifying animation performance (60fps on mobile)
- Assessing visual composition and aesthetic excellence
- Checking accessibility compliance (WCAG AA)
- Evaluating content relevance and narrative alignment
- Cross-browser and cross-device rendering validation
- Cultural accuracy and sensitivity review

**Five-Tier Audit Framework:**
| Tier | Focus | Blocking? |
|------|-------|-----------|
| 1 | Technical Foundation | ✅ Yes |
| 2 | Accessibility Compliance | ✅ Yes |
| 3 | Animation Performance | ✅ Yes |
| 4 | Visual Excellence | ⚠️ Important |
| 5 | Content Relevance | ⚠️ Important |

**Grading System:**
| Grade | Score | Publication Status |
|-------|-------|-------------------|
| A+ | 97-100 | ✅ Ship immediately |
| A | 93-96 | ✅ Ship |
| A- | 90-92 | ✅ Ship with notes |
| B+ | 87-89 | ✅ Ship after review |
| B | 83-86 | ⚠️ Revise if time permits |
| B- | 80-82 | ⚠️ Revise recommended |
| C+ | 77-79 | ❌ Revise required |
| C | 73-76 | ❌ Major revision required |
| C-/D/F | <73 | ❌ Reject |

**Category Weights:**
- Technical Quality: 25%
- Accessibility: 20%
- Animation Performance: 20%
- Visual Excellence: 20%
- Content Relevance: 15%

**Invocation Examples:**
```
# Standard visual audit
Using @agents/visual-auditor-agent.md, audit the SVG illustrations for
/essays/visual/flavors-of-the-east
Focus: Character illustrations, animation performance

# Pre-publication certification
Using @agents/visual-auditor-agent.md, perform a full certification audit
on all visual assets for /essays/visual/the-night-the-stars-fell

# Performance-focused audit
Apply @agents/visual-auditor-agent.md to audit animation performance 
for the monster character SVG. Test on mobile devices.

# Accessibility audit
Using @agents/visual-auditor-agent.md, verify WCAG compliance for
all SVG illustrations in the visual essay.
```

**Output Format:**
The agent produces a structured Visual Audit Report with:
1. Executive summary with overall grade
2. Five-tier category scores with weights
3. 🔴 Blocking issues (must fix before publication)
4. 🟡 Important issues (should fix)
5. 🟢 Polish suggestions (nice to have)
6. Detailed findings by category
7. Remediation checklist
8. Certification status (Approved/Rejected)

**Collaboration:**
- ← **SVG Illustration & Animation Expert**: Creates assets → Visual Auditor certifies
- ← **Scrollytelling Expert**: Requests certification before publication
- ← **Immersive Experience Engineer**: Performance validation

---

### Immersive Scrolling Auditor
**File:** `auditors/immersive-scrolling-auditor.md`

**Role:** World-class frontend QA engineer specializing in scroll-driven experience certification, with expertise in scroll-lock verification, animation performance auditing, and mobile-native testing.

**🎢 GATE 6 CERTIFIER:** This agent owns Gate 6 (Scroll Certification) in the Visual Essay Orchestrator pipeline. No visual essay publishes without scroll certification.

**Best For:**
- Verifying scroll-lock sections pin and release correctly
- Certifying 60fps animation performance
- Testing on real mobile devices (Safari iOS + Chrome Android)
- Validating parallax and progress indicator accuracy
- Ensuring accessibility (reduced motion) compliance
- Cross-browser scroll behavior consistency

**What It Audits:**
| Category | Tests |
|----------|-------|
| Scroll-Lock | Pin entry/release, progress calculation, no user trapping |
| Animation Performance | 60fps verification, jank detection, GPU acceleration |
| Parallax | Layer depth, speed ratios, edge case handling |
| Progress Indicators | Accuracy (±2%), smooth interpolation, chapter alignment |
| Touch/Gesture | Response latency (<100ms), momentum, swipe recognition |
| Accessibility | `prefers-reduced-motion`, focus management, skip links |

**6-Phase Audit Methodology:**
| Phase | Duration | Focus |
|-------|----------|-------|
| 1. Static Analysis | 5 min | Code review, patterns |
| 2. Desktop Functional | 10 min | Chrome DevTools |
| 3. Mobile Simulation | 5 min | DevTools emulation |
| 4. **Real Device Testing** | 15 min | Safari iOS + Android (CRITICAL) |
| 5. Edge Case Testing | 5 min | Stress testing |
| 6. Accessibility Testing | 5 min | Reduced motion, screen readers |

**Certification Thresholds:**
| Status | Score | Criteria |
|--------|-------|----------|
| ✅ **CERTIFIED** | ≥8.0/10 | No Tier 1 failures |
| ⚠️ **CONDITIONAL** | ≥6.0/10 | ≤2 Tier 1 failures (must fix) |
| ❌ **REJECTED** | <6.0/10 | >2 Tier 1 failures |

**Automatic Rejection (Red Lines):**
- ❌ User trapped in scroll-lock
- ❌ Complete failure on Safari iOS
- ❌ Visible jank on mid-tier devices
- ❌ No real mobile device testing performed

**Invocation Examples:**
```
# Standard scroll audit for Gate 6
Using @agents/immersive-scrolling-auditor.md, audit the scroll experience 
for the visual essay at:
Path: src/app/essays/visual/the-thinking-machine/
Perform full 6-phase audit and produce certification report.

# Targeted re-audit after fixes
Using @agents/immersive-scrolling-auditor.md, verify fixes for:
1. Safari iOS scroll-lock not releasing
2. Progress bar jumping at 50%
Perform targeted testing and update certification status.

# Pre-publication verification
Using @agents/immersive-scrolling-auditor.md, perform final Gate 6 
certification for visual essay "The Thinking Machine" prior to G7.
```

**Output:**
1. Scroll Audit Report with overall score
2. Certification Status (CERTIFIED/CONDITIONAL/REJECTED)
3. Tier 1 (blocking) issue list with fixes
4. Device testing evidence log
5. Performance recordings (DevTools)

**Collaboration:**
- ← **Visual Essay Orchestrator**: Invokes for Gate 6 certification
- ← **Immersive Experience Engineer**: Implementation partner for fixes
- ← **Scrollytelling Expert**: Narrative-scroll synchronization review

---

### Immersive Experience Auditor
**File:** `auditors/immersive-experience-auditor.md`

**Role:** World-class digital experience QA director that orchestrates comprehensive experience verification, including animations, reveals, interactions, and content visibility.

**🎭 COMPREHENSIVE QA ORCHESTRATOR:** This agent audits the complete experience—not just scroll performance. It catches issues like missing reveal animations, broken images, dead zones, and spec-to-implementation gaps.

**Orchestrates:** `immersive-scrolling-auditor.md` for scroll-specific testing

**Best For:**
- Comprehensive pre-publication audits
- Detecting missing animations/reveals
- Finding broken images or invisible content
- Comparing implementation against original brief
- Diagnosing "why doesn't this animate?" issues

**Audit Categories:**
| Category | Weight | What's Checked |
|----------|--------|----------------|
| Content Visibility | 20% | Images load, text readable, no clipping |
| Animation/Reveals | 20% | All designed animations trigger correctly |
| Interaction Fidelity | 15% | Buttons, links, touch targets work |
| Scroll Experience | 20% | Delegated to Scrolling Auditor |
| Narrative Coherence | 15% | Story flow, no dead zones, pacing |
| Accessibility | 10% | Reduced motion, keyboard nav, focus |

**8-Phase Methodology:**
1. Brief Review (5 min) — Understand what was designed
2. Static Code Review (10 min) — Check hooks and structure
3. Visual Walkthrough (15 min) — Experience as user
4. Scroll Behavior Audit (delegated) — Invoke Scrolling Auditor
5. Interaction Testing (10 min) — Click/tap everything
6. Responsive Verification (10 min) — All viewports
7. Accessibility Check (5 min) — Reduced motion, keyboard
8. Report Synthesis — Compile and prioritize

**Issue Severity:**
| Severity | Example |
|----------|---------|
| 🔴 BLOCKING | Section doesn't render, images broken |
| 🟠 CRITICAL | Animation never fires, interaction dead |
| 🟡 IMPORTANT | Reveal timing off, stagger wrong order |
| 🟢 POLISH | Easing could be smoother |

**Invocation Examples:**
```
# Full audit
Using @agents/immersive-experience-auditor.md, conduct a comprehensive 
audit of the visual essay at src/app/essays/visual/the-thinking-machine/
Include spec comparison against original brief.

# Quick issue investigation
Using @agents/immersive-experience-auditor.md, investigate why 
"The Tragedy" section in Chapter 1 has no reveal animation.
Diagnose and recommend fix.

# Pre-publication check
Using @agents/immersive-experience-auditor.md, perform final certification 
for "The Thinking Machine" visual essay.
```

**Output:**
1. Comprehensive audit report
2. Certification status (CERTIFIED/CONDITIONAL/REJECTED)
3. Prioritized issue list with severity
4. Specific fix recommendations with code
5. Spec-to-implementation comparison

**Collaboration:**
- → **Scrolling Auditor**: Delegates scroll-specific testing
- → **Visual Essay Orchestrator**: Reports certification status
- ← **Experience Engineer**: Implementation partner for fixes

---

### Meta Audit Orchestrator
**File:** `orchestrators/meta-audit-orchestrator.md`

**Role:** World-class quality assurance director that orchestrates comprehensive multi-domain audits by coordinating all specialist audit agents.

**🔬 TOP-LEVEL AUDIT COORDINATOR:** This agent runs comprehensive audits across all quality domains—scroll, experience, visual, citations, quotes, and SEO—producing unified certification reports.

**Best For:**
- Pre-publication comprehensive audits
- Multi-domain quality certification
- Synthesizing findings across audit types
- Single source of truth for publication readiness
- Identifying cross-domain issue patterns

**Orchestrates:**
| Agent | Domain | Focus |
|-------|--------|-------|
| `immersive-scrolling-auditor.md` | Scroll | Scroll-lock, 60fps, mobile |
| `immersive-experience-auditor.md` | Experience | Animations, reveals, interactions |
| `visual-auditor-agent.md` | Visual | SVG quality, accessibility |
| `citation-audit-agent.md` | Citations | Source integrity, links |
| `quotes-audit-agent.md` | Quotes | Quote verification |
| `seo-audit-agent.md` | SEO | On-page, technical, schema, E-E-A-T |

**Certification Matrix:**
| Status | Criteria |
|--------|----------|
| ✅ **CERTIFIED** | All domains pass minimum thresholds, no blocking issues |
| ⚠️ **CONDITIONAL** | 1-2 domains below threshold OR ≤3 non-blocking issues |
| ❌ **REJECTED** | >2 domains below threshold OR any blocking issue |

**Report Storage:**
```
orchestration/audits/[essay-slug]/YYYY-MM-DD-comprehensive-audit.md
```

**Invocation Examples:**
```
# Full comprehensive audit
Using @agents/meta-audit-orchestrator.md, conduct a comprehensive 
audit of the visual essay at:
Path: src/app/essays/visual/the-thinking-machine/
Spec: src/app/essays/visual/the-thinking-machine/EXPERIENCE-SPEC.md

# Targeted domain audit
Using @agents/meta-audit-orchestrator.md, audit scroll and experience 
domains only for the visual essay at src/app/essays/visual/[slug]/

# Re-certification after fixes
Using @agents/meta-audit-orchestrator.md, verify fixes for issues 
identified in previous audit and update certification status.
```

**Output:**
1. Comprehensive audit report with all domain findings
2. Overall certification status
3. Prioritized remediation plan by impact
4. Cross-domain issue analysis
5. Individual domain reports (linked)

**Collaboration:**
- → **Scrolling Auditor**: Delegates scroll-specific testing
- → **Experience Auditor**: Delegates experience verification
- → **Visual Auditor**: Delegates SVG quality assessment
- → **Citation Audit**: Delegates source verification
- → **SEO Audit Agent**: Delegates search optimization verification
- → **Visual Essay Orchestrator**: Reports certification status

---

### QA Remediation Orchestrator
**File:** `orchestrators/qa-remediation-orchestrator.md`

**Role:** World-class quality engineering director that orchestrates iterative audit-fix-reaudit loops until publication-ready quality is achieved.

**🔄 FIX LOOP COORDINATOR:** This agent takes audit findings and systematically routes issues to appropriate fixers, verifies fixes through re-audit, and iterates until all issues are resolved.

**Best For:**
- Fixing issues found during audits (section-by-section or full essay)
- Iterating until scroll-lock, animations, and images work correctly
- Routing issues to correct specialist (engineer vs image researcher)
- Verifying fixes don't introduce regressions
- Post-audit remediation before publication

**Invocation Modes:**
| Mode | Flag | Behavior |
|------|------|----------|
| **Auto** | `--auto` | Fix immediately, report after |
| **Approval** | `--approval` | Present issues, await approval before fixing |
| **Report Only** | `--report-only` | Audit only, no fixes |

**Scope Options:**
| Scope | Example | Description |
|-------|---------|-------------|
| Full Essay | `audit /essays/visual/the-fork` | All sections |
| Explicit Sections | `audit Hero, Ch1-3` | Named sections |
| Range | `audit sections 2-5` | Numeric range |
| Single Section | `audit Ch4` | Deep-dive one section |

**Issue Routing:**
| Issue Type | Routed To |
|------------|-----------|
| Scroll-lock, animations, reveals | `immersive-experience-engineer.md` |
| Broken/missing images | `image-research-licensing-expert.md` |
| SVG issues | `svg-illustration-animation-expert.md` |
| CSS/code bugs | `software-engineering-expert.md` |
| Citation/content | Manual flag (editorial decision) |

**Invocation Examples:**
```
# Full essay remediation (auto mode)
Using @agents/orchestrators/qa-remediation-orchestrator.md, conduct
a full QA remediation for:
Path: src/app/essays/visual/the-fork/
Mode: --auto
Max iterations: 3

# Targeted section remediation (approval mode)
Using @agents/orchestrators/qa-remediation-orchestrator.md, conduct
targeted QA remediation for:
Path: src/app/essays/visual/the-holocaust/
Sections: Hero, Ch1, Ch2
Mode: --approval
```

**Output:**
- QA Remediation Report stored at `orchestration/audits/[slug]/QA-REMEDIATION-[date].md`
- Per-section pass/fail status
- Issues found, fixed, and remaining
- Score progression across iterations

**Collaboration:**
- ← **Meta Audit Orchestrator**: Receives issue list from comprehensive audit
- → **Immersive Experience Engineer**: Delegates scroll/animation fixes
- → **Image Research Expert**: Delegates image sourcing
- → **Software Engineering Expert**: Delegates code fixes
- → **Auditors**: Re-invokes for verification

---

### README Curator
**File:** `utilities/readme-curator.md`

**Role:** Expert technical documentation architect responsible for maintaining consistency, accuracy, and discoverability across the Esy orchestration documentation ecosystem.

**📖 DOCUMENTATION STEWARD:** This agent determines which README to update and maintains cross-reference integrity across the orchestration system.

**Best For:**
- Determining where to document new features
- Updating documentation after changes
- Auditing documentation for consistency
- Maintaining cross-reference integrity

**Documentation Hierarchy:**
| Level | README | Scope |
|-------|--------|-------|
| System | `orchestration/README.md` | Philosophy, component types, relationships |
| Agents | `orchestration/agents/README.md` | Agent details, invocation, quality gates |
| Skills | `orchestration/skills/README.md` | Skill anatomy, creation guide, index |

**Routing Decision:**
| Change Type | Target README |
|-------------|---------------|
| New component type | `orchestration/README.md` |
| New relationship pattern | `orchestration/README.md` |
| New agent | `orchestration/agents/README.md` |
| New skill | `orchestration/skills/README.md` |
| Quality gate change | Both system + agents |

**Invocation Examples:**
```
# Update docs after a change
Using @agents/readme-curator.md, update documentation to reflect 
the new image-url-extraction skill.

# Get routing advice
Using @agents/readme-curator.md, determine where to document 
[new feature]. Provide routing recommendation.

# Full audit
Using @agents/readme-curator.md, audit orchestration documentation 
for consistency, broken links, and scope violations.
```

---

### Image Research & Licensing Expert
**File:** `research/image-research-licensing-expert.md`

**Role:** World-class visual research specialist and digital archivist with expertise in public domain discovery, Creative Commons licensing, and archival research.

**🖼️ IMAGE SOURCING:** This agent finds, verifies, and documents images from authoritative archives for visual essays.

**Best For:**
- Finding public domain images from archives
- Verifying licensing and rights status
- Documenting image provenance
- Extracting direct image URLs (via skill)

**Source Tier System:**
| Tier | Quality | Examples |
|------|---------|----------|
| Tier 1 | Gold Standard | Wikimedia Commons, Library of Congress, Smithsonian |
| Tier 2 | Highly Credible | Met Museum, National Archives, British Library |
| Tier 3 | Use with Caution | Flickr Commons, aggregators |
| Tier 4 | Avoid | Pinterest, social media, unverified |

**Required Skill:** `@orchestration/skills/image-url-extraction/`

When extracting image URLs from archive pages, this agent applies the `image-url-extraction` skill to reliably obtain direct URLs.

**Invocation Examples:**
```
# Source images for a visual essay
Using @agents/image-research-licensing-expert.md, find public domain 
images for a visual essay about the history of computing. Focus on:
- Alan Turing portraits
- ENIAC photographs
- Early computer labs

# Verify image licensing
Using @agents/image-research-licensing-expert.md, verify the licensing 
status of these images and provide attribution text.

# Fix broken image
Apply @agents/image-research-licensing-expert.md to find a replacement 
for the broken ACE computer image on Wikimedia Commons.
```

**Output:**
1. Image candidates with thumbnails
2. Complete documentation records
3. Rights verification
4. Attribution text ready for use
5. Direct download links

---

### Scrollytelling Expert
**File:** `orchestrators/scrollytelling-expert.md`

**Role:** Award-winning digital storytelling architect specializing in immersive, **mobile-native**, scroll-based narrative experiences.

**Best For:**
- Creating new scrollytelling pages
- Designing visual narratives
- Orchestrating multi-agent content workflows

**Key Features:**
- **📱 Mobile-Native First** — Phone is the primary canvas; desktop enhances
- Mandatory Design Research phase (unique visual identity per story)
- **Anti-Pattern-Matching Protocol** — prevents reusing structural patterns
- **Layout Variation Required** (minimum 3 different patterns, no consecutive duplicates)
- Requires 2+ unique interaction mechanics never used before
- Coordinates **7 agents** (Research, Writer, Editor, UI/UX, **SVG Illustration**, Engineer, **Immersive Experience**)
- Enforces Sources & Further Reading section
- **Real device testing required** (not just browser responsive mode)

**⚠️ Anti-Pattern-Matching Protocol:**
Before creating any new scrollytelling:
1. Audit last 3-5 stories for reused patterns
2. Create a "banned list" of overused layouts/mechanics
3. Identify 2+ unique interaction mechanics for this story
4. Answer: "What interactive element could ONLY exist in this story?"

**Available Layout Patterns:**
| Pattern | Best For |
|---------|----------|
| `split-screen` | Visual subjects, image+text |
| `full-bleed` | Dramatic moments, hero sections |
| `timeline` | Chronological stories |
| `sticky-scroll` | Deep dives, processes |
| `comparison` | Before/after, contrasts (use SVG illustrations, NOT blog cards) |
| `quote-monument` | Key quotes, turning points |
| `data-viz` | Statistics, impact numbers |
| `horizontal` | Galleries, sequences |

**Invocation Examples:**
```
# Create a new scrollytelling piece
Apply @agents/scrollytelling-expert.md to create a scrollytelling 
experience about "The History of the Bicycle"

# With specific requirements
Using @agents/scrollytelling-expert.md, build an immersive narrative 
about the invention of the printing press. Include 8 sections, emphasize 
the Gutenberg era, and use a medieval manuscript aesthetic.
```

---

### Immersive Experience Engineer
**File:** `engineering/immersive-experience-engineer.md`

**Role:** World-class frontend engineer specializing in immersive web experiences, building app-like, scroll-driven, and native-feeling interfaces.

**⚠️ MANDATORY for Scrollytelling:** This agent is required for every scrollytelling piece to ensure mobile-native feel. Designs created by `scrollytelling-expert.md` must be implemented through this agent.

**Best For:**
- Making web experiences feel like native apps
- Scroll-driven animations and parallax
- Entry/exit transitions
- Custom UI chrome (theatre bars, custom headers)
- Hiding browser UI and creating immersion
- Performance optimization for animations
- Touch/gesture interactions

**Key Features:**
- Browser Invisibility philosophy (users forget they're in a browser)
- **60fps animation guarantee on mobile**
- **Mobile-first, touch-first approach**
- `prefers-reduced-motion` respect
- GPU-accelerated animation patterns
- Safe area handling (notches, home indicators)
- Real device testing protocols

**Invocation Examples:**
```
# Implement mobile-native scrollytelling layer
Using @agents/immersive-experience-engineer.md, implement the mobile-native 
experience layer for this scrollytelling piece. Ensure 60fps animations, 
proper safe area handling, and app-like feel on mobile devices.

# Create immersive UI components
Using @agents/immersive-experience-engineer.md, build a Theatre Bar 
component with progress indicator and share panel.

# Performance optimization
Using @agents/immersive-experience-engineer.md, optimize the scroll 
animations for 60fps on mid-tier Android devices.

# Touch interaction implementation
Apply @agents/immersive-experience-engineer.md to implement touch-friendly 
interactions with 44px+ tap targets and thumb-zone-aware layouts.
```

---

### Research & Citations Expert
**File:** `research/research-citations-expert.md`

**Role:** World-class research librarian and citations specialist with expertise in academic source discovery and verification.

**Best For:**
- Finding authoritative sources
- Verifying claims and citations
- Building source packages for content

**Key Features:**
- Strict 4-tier source hierarchy
- Prioritizes .edu, peer-reviewed, major news (NYT, FT, Guardian)
- Provides formatted citations ready for use

**Source Tiers:**
| Tier | Quality | Examples |
|------|---------|----------|
| 1 | Gold Standard | .edu, JSTOR, university presses, museums |
| 2 | Highly Credible | NYT, WSJ, FT, Guardian, Economist, major publishers |
| 3 | Use with Caution | Wikipedia (starting point), expert blogs |
| 4 | Avoid | Social media, anonymous, self-published |

**Invocation Examples:**
```
# Source discovery for content
Using @agents/research-citations-expert.md, compile a source package 
for a scrollytelling piece about the history of vaccines. Provide 
Tier 1-2 sources only.

# Fact verification
Apply @agents/research-citations-expert.md to verify these claims 
and provide authoritative citations: [list claims]

# Source audit
Using @agents/research-citations-expert.md, audit this source list 
for credibility: [list sources]
```

---

### Historian Writer Expert
**File:** `content/historian-writer-expert.md`

**Role:** Award-winning historian and narrative writer with 20+ years crafting compelling historical narratives.

**Best For:**
- Writing historical content
- Crafting engaging narratives from research
- Developing character-driven non-fiction

**Invocation Examples:**
```
# Draft historical content
Using @agents/historian-writer-expert.md, write the narrative content 
for a scrollytelling piece about the Industrial Revolution. Focus on 
the human stories behind the factories.

# With specific brief
Apply @agents/historian-writer-expert.md to draft 8 sections about 
the history of photography, from daguerreotypes to digital.
```

---

### Historian Editor Expert
**File:** `content/historian-editor-expert.md`

**Role:** World-renowned historian and editorial expert specializing in fact-checking and historical accuracy verification.

**Best For:**
- Fact-checking historical content
- Verifying dates, names, and claims
- Ensuring scholarly accuracy

**Invocation Examples:**
```
# Fact-check content
Apply @agents/historian-editor-expert.md to fact-check this 
scrollytelling content and verify all historical claims: [content]

# Verify and provide citations
Using @agents/historian-editor-expert.md, review this narrative 
for accuracy and provide corrections with sources.
```

---

### Burmese Historian Expert
**File:** `regional/burmese-historian-expert.md`

**Role:** World-renowned Burmese scholar, historian, and culinary anthropologist with 25+ years of immersive research in Myanmar/Burma, combining native-equivalent fluency in Burmese language (ဗမာစာ), script, and dialects with encyclopedic expertise in Burmese history, culture, cuisine, Buddhism, literature, and traditions.

**🇲🇲 THE AUTHORITY ON BURMESE CUISINE:** This agent possesses complete mastery of every documented Burmese dish (500+), including origins, evolution, regional variations, and cultural significance.

**Best For:**
- **Burmese culinary history** — every dish, its origins, evolution, influences
- **Burmese language** — script (မြန်မာအက္ခရာ), romanization, pronunciation, dialects
- **Myanmar history** — Pyu kingdoms through contemporary era
- **Regional cuisines** — Yangon, Mandalay, Shan, Rakhine, Kachin, Chin, Mon, Karen
- **Theravāda Buddhism** — monastic traditions, festivals, sacred sites
- **Ethnic diversity** — Bamar, Shan, Karen, Mon, Rakhine, Kachin, Chin, Kayah
- **Cross-cultural culinary analysis** — Indian, Chinese, Thai, Mon, British influences

**Unique Expertise:**
| Domain | Capability |
|--------|------------|
| Culinary Encyclopedia | 500+ dishes with complete provenance |
| Burmese Script | Native-equivalent reading/writing (မြန်မာအက္ခရာ) |
| Dish Etymology | Origins, evolution, regional variations for any dish |
| Influence Mapping | What India/China/Thailand/Mon/British contributed |
| Burmese Contributions | Globally unique innovations (laphet, si pyan, Shan tohu) |
| Fermentation Authority | Ngapi universe, laphet, bamboo, and more |

**Key Burmese Culinary Concepts:**
| Burmese | Romanization | Meaning |
|---------|--------------|---------|
| မုန့်ဟင်းခါး | mohinga | National dish — rice noodle fish soup |
| လက်ဖက်သုပ် | laphet thoke | Fermented tea leaf salad (globally unique!) |
| ဆီပြန် | si pyan | "Oil returns" — signature curry technique |
| ငါးပိ | ngapi | Fermented fish/shrimp paste (umami foundation) |
| ရှမ်းတိုဟူး | Shan tohu | Chickpea tofu (not soybean!) |

**Collaboration:**
- Works with `historian-writer-expert.md` — provides cultural/linguistic verification
- Works with `historian-editor-expert.md` — specialized Myanmar fact-checking
- Works with `scrollytelling-expert.md` — authentic Burmese visual references

**Invocation Examples:**
```
# Burmese culinary content
Using @agents/burmese-historian-expert.md, provide the complete history 
and evolution of mohinga (မုန့်ဟင်းခါး), including Mon influences, 
regional variations, and its status as national dish.

# Linguistic verification
Using @agents/burmese-historian-expert.md, verify the Burmese script 
and romanization for all dish names in this content, and add proper 
diacritics and cultural context.

# Cultural deep-dive
Using @agents/burmese-historian-expert.md, explain the role of laphet 
(fermented tea leaves) in Burmese culture — from its origins to its 
unique status as the world's only fermented tea eating tradition.

# Cross-cultural culinary analysis
Using @agents/burmese-historian-expert.md, analyze what Indian cuisine 
contributed to Burmese food culture and what unique innovations 
Burma developed in response.

# Regional cuisine exploration
Using @agents/burmese-historian-expert.md, document the distinctive 
culinary traditions of Shan State, including Shan khaukswè, htamin jin, 
and Shan tohu traditions.
```

**Output:**
1. Culturally authentic content with proper Burmese script
2. Romanization following MLCTS or common systems
3. Historical provenance for dishes and traditions
4. Foreign influence attribution (what came from where)
5. Burmese innovations clearly identified
6. Regional variation documentation
7. Cultural significance and context

---

### Software Engineering Expert
**File:** `engineering/software-engineering-expert.md`

**Role:** World-class software engineer with 20+ years of enterprise-scale development experience.

**Best For:**
- Building Next.js components and pages
- Implementing complex features
- Code review and optimization
- Performance improvements

**Invocation Examples:**
```
# Implement a feature
Using @agents/software-engineering-expert.md, implement the 
scrollytelling page with Intersection Observer animations and 
parallax effects.

# Code review
Apply @agents/software-engineering-expert.md to review this 
component for performance and accessibility.

# Debug an issue
Using @agents/software-engineering-expert.md, debug why the 
scroll animations are janky on mobile.
```

---

### UI/UX Design Expert
**File:** `engineering/ui-ux-design-expert.md`

**Role:** World-class designer and UI/UX expert specializing in interface design and user experience.

**Best For:**
- Visual design refinement
- Typography and spacing decisions
- Interaction design
- Accessibility compliance

**Invocation Examples:**
```
# Refine visual design
Using @agents/ui-ux-design-expert.md, refine the visual system 
for this scrollytelling piece. Focus on typography hierarchy 
and mobile responsiveness.

# Design review
Apply @agents/ui-ux-design-expert.md to review this page design 
for accessibility and usability issues.
```

---

### SVG Illustration & Animation Expert
**File:** `engineering/svg-illustration-animation-expert.md`

**Role:** World-class illustrator and motion designer with 20+ years of experience creating scalable vector graphics, specializing in editorial illustration, character design, icon systems, and scroll-driven animation.

**Best For:**
- Creating inline SVG illustrations for scrollytelling
- Character design and expression systems
- Icon and symbol design
- Food, object, and environmental illustration
- Scroll-linked animations (steam, particles, morphing)
- CSS and JavaScript animation choreography
- Data visualization graphics

**Core Capabilities:**
- **Illustration**: Composition, color theory, shape language, character design
- **SVG Mastery**: Path optimization, viewBox, gradients, filters, accessibility
- **Animation**: Classical principles, timing/easing, scroll-linked motion
- **Performance**: GPU-accelerated transforms, reduced motion support

**Collaboration:**
- ← **Scrollytelling Expert**: Provides visual direction, receives illustrated assets
- → **Immersive Experience Engineer**: Animation implementation
- ← **UI/UX Designer**: Design system alignment

**Invocation Examples:**
```
# Create character illustration
Using @agents/svg-illustration-animation-expert.md, create an SVG 
character design for Sammy Snail with expression variations and 
animation-ready structure.

# Design icon system
Apply @agents/svg-illustration-animation-expert.md to design an 
ingredient icon system for our Asian cuisine scrollytelling piece.

# Animate existing SVG
Using @agents/svg-illustration-animation-expert.md, add scroll-triggered
animations to the wok illustration — fire flicker, tossing ingredients,
and rising steam.
```

---

### Template Integration Engineer
**File:** `engineering/template-integration-engineer.md`

**Role:** Specialized frontend engineer for converting AI-generated templates into production Next.js pages.

**Best For:**
- Converting raw templates to Next.js pages
- Extracting CSS from inline styles
- Setting up routing for new pages
- Maintaining 1:1 design fidelity

**Invocation Examples:**
```
# Integrate a template
Apply @agents/template-integration-engineer.md to 
@raw_templates/[template-name].txt

# With specific routing
Using @agents/template-integration-engineer.md, convert this 
template to a Next.js page at /essays/visual/[slug]
```

---

### Essayist Expert
**File:** `content/essayist-expert.md`

**Role:** Award-winning academic essayist and instructional editor with expertise in essay writing pedagogy.

**Best For:**
- Essay writing guidance
- Academic writing instruction
- Essay structure and argumentation
- Educational content about writing

**Invocation Examples:**
```
# Essay guidance
Using @agents/essayist-expert.md, provide guidance on writing 
a comparative essay about two historical periods.

# Structure advice
Apply @agents/essayist-expert.md to review this essay outline 
and suggest improvements to the argument structure.
```

---

### Copywriter Marketing Expert
**File:** `content/copywriter-marketing-expert.md`

**Role:** Expert marketing copywriter specializing in conversion-focused content.

**Best For:**
- Marketing copy and headlines
- Landing page content
- Conversion optimization
- Brand voice development

**Invocation Examples:**
```
# Write marketing copy
Using @agents/copywriter-marketing-expert.md, write compelling 
copy for the Esy.com homepage hero section.

# Optimize for conversion
Apply @agents/copywriter-marketing-expert.md to improve the 
CTA copy on this landing page for better conversion.
```

---

### SEO Specialist Expert
**File:** `engineering/seo-specialist-expert.md`

**Role:** World-class SEO strategist and search marketing expert with 20+ years of experience driving organic growth, specializing in technical SEO, content optimization, SERP domination, and algorithmic adaptation.

**🔍 SEARCH VISIBILITY:** This agent ensures content ranks well and captures SERP features, driving organic discovery.

**Best For:**
- Technical SEO audits (crawlability, indexation, Core Web Vitals)
- Content optimization for search
- Keyword research and topic mapping
- Featured snippet capture strategies
- Schema markup and structured data
- Link building strategy
- Local SEO optimization
- Algorithm update response

**Expertise Areas:**
| Domain | Capabilities |
|--------|--------------|
| Technical SEO | Crawlability, indexation, site architecture, page speed, Core Web Vitals |
| On-Page SEO | Title tags, meta descriptions, headers, content optimization, schema |
| SERP Features | Featured snippets, PAA, knowledge panels, rich results |
| Content Strategy | Keyword research, topic clustering, content briefs, SEO writing |
| Link Building | Backlink analysis, acquisition strategies, authority building |
| Analytics | Search Console, GA4, ranking tracking, ROI measurement |

**Integration Points:**
- **G3 (Content Complete)**: SEO review of visual essays before publication
- **Content Writers**: Provides keyword targets and content briefs
- **Software Engineers**: Technical SEO implementation specs

**Red Lines:**
- ❌ Never employ black-hat tactics (cloaking, link schemes, keyword stuffing)
- ❌ Never guarantee specific rankings
- ❌ Never sacrifice user experience for search optimization

**Invocation Examples:**
```
# Technical SEO audit
Using @agents/seo-specialist-expert.md, conduct a technical SEO audit 
of esy.com focusing on Core Web Vitals and JavaScript rendering.

# Content optimization
Using @agents/seo-specialist-expert.md, optimize the visual essay at 
/essays/visual/the-thinking-machine for search. Target: "history of AI"

# Keyword research
Using @agents/seo-specialist-expert.md, conduct keyword research for 
a visual essay about "The History of Coffee." Include featured snippet 
opportunities.

# Featured snippet strategy
Using @agents/seo-specialist-expert.md, develop a featured snippet 
capture strategy for [query]. Analyze current SERP and recommend 
content structure.

# SEO content brief
Using @agents/seo-specialist-expert.md, create an SEO content brief 
for a new visual essay about [topic]. Include keywords, structure, 
and schema requirements.
```

**Output:**
1. Technical SEO audit reports with prioritized fixes
2. Content optimization guides (titles, metas, headers, schema)
3. Keyword research packages with clustering
4. SERP analysis and feature capture strategies
5. Link building strategy and opportunity lists
6. Performance reports with actionable recommendations

---

### SEO Audit Agent
**File:** `auditors/seo-audit-agent.md`

**Role:** World-class SEO audit specialist with 20+ years of experience conducting rigorous technical and content audits, specializing in objective page-level analysis, algorithmic compliance verification, and actionable optimization scoring.

**📊 COMPREHENSIVE AUDITOR:** This agent conducts exhaustive, evidence-based SEO audits with objective grading (A+ to F scale). Every finding is supported by specific evidence, and all recommendations are actionable.

**Key Capabilities:**
- **On-Page Element Auditing**: Title tags, meta descriptions, headers, URLs, internal/external links, images
- **Technical SEO Verification**: Crawlability, indexability, canonicalization, mobile-friendliness
- **Content Quality Assessment**: Word count, readability, keyword usage, search intent alignment
- **Core Web Vitals Analysis**: LCP, INP, CLS measurement and optimization
- **Structured Data Validation**: Schema markup presence, validity, and rich result eligibility
- **E-E-A-T Signal Evaluation**: Experience, Expertise, Authoritativeness, Trustworthiness
- **Competitive Benchmarking**: SERP position context, competitor comparison

**Grading Scale:**
| Grade | Score | Definition |
|-------|-------|------------|
| A+/A/A- | 85-100 | Excellent — Well-optimized, minor refinements only |
| B+/B/B- | 70-84 | Good — Solid foundation with clear opportunities |
| C+/C/C- | 55-69 | Fair — Multiple issues affecting ranking potential |
| D | 45-54 | Failing — Critical issues blocking potential |
| F | 0-44 | Critical — Fundamental failures, urgent remediation |

**Category Weights:**
| Category | Weight |
|----------|--------|
| Technical Foundation | 25% |
| On-Page Elements | 25% |
| Content Quality | 20% |
| Page Experience | 15% |
| Structured Data | 10% |
| E-E-A-T Signals | 5% |

**Uses Skill:** `@skills/seo-element-extraction` — Systematic extraction of all SEO elements from pages

**Invocation Examples:**
```markdown
# Standard page audit
Using @agents/seo-audit-agent.md, conduct a comprehensive SEO audit of:

URL: https://esy.com/essays/visual/the-thinking-machine
Target Keywords: history of artificial intelligence, AI timeline
Search Intent: Informational

Provide full scored report with prioritized recommendations.

# Pre-publication audit
Using @agents/seo-audit-agent.md, perform pre-publication SEO audit 
for visual essay "[Title]". Verify title, meta, schema, and provide 
go/no-go recommendation.

# Competitive audit
Using @agents/seo-audit-agent.md, audit [URL] with competitive focus.
Include detailed gap analysis against top 3 ranking competitors.

# Quick assessment
Using @agents/seo-audit-agent.md, provide rapid SEO assessment of [URL].
Focus on blocking issues and critical fixes only.
```

**Output:**
1. Full audit report with overall letter grade (A+ to F)
2. Category breakdown scores (Technical, On-Page, Content, etc.)
3. Issue registry classified by severity (🔴 Blocking → ⚪ Minor)
4. Prioritized recommendations with effort/impact estimates
5. Optimized element rewrites (title, meta, H1, schema)
6. Quick wins list for immediate implementation
7. Competitive benchmarking data

**Collaboration:**
- Works with `seo-specialist-expert.md` for strategy implementation
- Integrates with `visual-essay-orchestrator.md` at G3 (Content Complete)
- Provides data to content writers for optimization

---

---

## Orchestrator Architecture

### What is an Orchestrator?

An **orchestrator agent** coordinates multiple specialized agents to produce complex deliverables. Unlike standalone agents that work independently, orchestrators:

1. **Define the workflow** — Sequence of agent invocations
2. **Set quality gates** — Approval checkpoints between stages
3. **Integrate outputs** — Combine deliverables from multiple agents
4. **Enforce standards** — Ensure all agents follow shared requirements

### Current Orchestrators

| Orchestrator | Domain | Agents Coordinated | Output |
|--------------|--------|-------------------|--------|
| `visual-essay-orchestrator.md` | **Production Pipeline** | 4 orchestrators | **Publication-ready visual essays** |
| `scrollytelling-expert.md` | Digital Storytelling | 7 agents | Mobile-native scrollytelling pages |
| `scrollytelling-audit-agent.md` | Quality Assurance | 3-4 agents | Experience audit reports |
| `citation-audit-agent.md` | **Citation Integrity (G5)** | 2-3 agents | Source verification reports |
| `visual-auditor-agent.md` | **Visual Quality Assurance** | 1-2 agents | SVG certification reports |
| `immersive-scrolling-auditor.md` | **Scroll QA (G6)** | 1-2 agents | Scroll certification reports |
| `meta-audit-orchestrator.md` | **Comprehensive QA** | 6 agents | Unified certification reports |

### Visual Essay Orchestrator Architecture (Top-Level)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         VISUAL ESSAY DIRECTOR                                │
│                      (Top-Level Pipeline Executive)                          │
│                                                                             │
│  Quality Gates: G1 Brief → G2 Design → G3 Content → G4 Sources →           │
│                 G5 Citation Audit → G6 Scroll Cert → G7 Publish             │
└─────────────────────────────────────────┬───────────────────────────────────┘
                                          │
         ┌────────────────────────────────┼────────────────────────────────┐
         │                    │                    │                       │
         ▼                    ▼                    ▼                       ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  SCROLLYTELLING │  │  RESEARCH &     │  │  CITATION AUDIT │  │  SCROLLING      │
│     EXPERT      │  │  CITATIONS      │  │     AGENT       │  │    AUDITOR      │
│  (Production)   │  │    EXPERT       │  │  (G5 Verify)    │  │  (G6 Verify)    │
│                 │  │  (G4 Sources)   │  │                 │  │                 │
│  • G2: Design   │  │                 │  │  • Claim-cite   │  │  • Scroll-lock  │
│  • G3: Content  │  │  • Tier 1-2     │  │  • Link verify  │  │  • 60fps test   │
│  • Mobile impl  │  │  • Quote auth   │  │  • Certify      │  │  • Safari iOS   │
│                 │  │                 │  │                 │  │  • Real devices │
│  Coordinates:   │  └─────────────────┘  │  Orchestrates:  │  │                 │
│  ┌───────────┐ │                        │  • quotes-audit │  │  Certifies:     │
│  │ Historian │ │                        │  • research-cit │  │  • Pin/release  │
│  │ UI/UX     │ │                        │                 │  │  • Progress bar │
│  │ SVG       │ │                        └─────────────────┘  │  • Touch/scroll │
│  │ Software  │ │                                             │                 │
│  │ Immersive │ │                                             └─────────────────┘
│  └───────────┘ │
└─────────────────┘
```

**Pipeline Flow:**
```
User Request
     │
     ▼
┌─────────────────┐
│ Visual Essay    │──► G1: Brief Approval
│ Director        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Scrollytelling  │──► G2: Design Research
│ Expert          │──► G3: Content Complete
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Research &      │──► G4: Citation Research
│ Citations       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Citation        │──► G5: Citation Audit
│ Audit Agent     │    ⚠️ CERTIFICATION REQUIRED
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Immersive       │──► G6: Scroll Certification
│ Scrolling       │    ⚠️ REAL DEVICE TESTING REQUIRED
│ Auditor         │    (Safari iOS + Chrome Android)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Visual Essay    │──► G7: Publication Approval
│ Director        │
└────────┬────────┘
         │
         ▼
   📦 PUBLISH
```

### Scrollytelling Orchestrator Architecture

```
                    ┌─────────────────────────────────────┐
                    │      SCROLLYTELLING EXPERT          │
                    │         (Orchestrator)              │
                    │                                     │
                    │  Responsibilities:                  │
                    │  • Design Research (unique identity)│
                    │  • Mobile-first layout planning     │
                    │  • Story architecture               │
                    │  • Quality gates & final review     │
                    └──────────────┬──────────────────────┘
                                   │
           ┌───────────────────────┼───────────────────────┐
           │                       │                       │
           ▼                       ▼                       ▼
    ┌─────────────┐        ┌─────────────┐        ┌─────────────┐
    │  RESEARCH   │        │  HISTORIAN  │        │  HISTORIAN  │
    │  CITATIONS  │───────►│   WRITER    │───────►│   EDITOR    │
    │  (Sources)  │        │  (Content)  │        │(Fact-Check) │
    └─────────────┘        └─────────────┘        └──────┬──────┘
                                                         │
                                                         │ Approved Content
                                                         ▼
                           ┌─────────────────────────────────────┐
                           │           DESIGN LAYER              │
                           │                                     │
                           │  ┌───────────┐    ┌───────────────┐│
                           │  │   UI/UX   │    │     SVG       ││
                           │  │  DESIGN   │───►│ ILLUSTRATION  ││
                           │  │ (Visual)  │    │ & ANIMATION   ││
                           │  └───────────┘    │ (Visual Assets)│
                           │                   └───────┬───────┘│
                           └───────────────────────────┼────────┘
                                             │
                                             ▼
                           ┌─────────────────────────────────────┐
                           │        IMPLEMENTATION LAYER         │
                           │                                     │
                           │  ┌───────────┐    ┌───────────────┐│
                           │  │ SOFTWARE  │    │   IMMERSIVE   ││
                           │  │ ENGINEER  │◄──►│   EXPERIENCE  ││
                           │  │(Structure)│    │   ENGINEER    ││
                           │  └───────────┘    │ (Mobile UX)   ││
                           │                   │ ⚠️ MANDATORY  ││
                           │                   └───────────────┘│
                           └─────────────────────────────────────┘
```

### Agent Responsibilities in Orchestra

| Agent | Input | Output | Quality Gate |
|-------|-------|--------|--------------|
| **Research Citations** | Topic | Tier 1-2 sources | G4: Sources verified |
| **Historian Writer** | Sources + Brief | Narrative draft | Content complete |
| **Historian Editor** | Draft | Fact-checked content | G3: **APPROVAL REQUIRED** |
| **UI/UX Design** | Visual direction | Refined design system | Mobile typography verified |
| **SVG Illustration & Animation** | Design system | Inline SVG assets, animation CSS | Assets optimized, accessible |
| **Visual Auditor** ⚠️ | SVG assets | Certification report, grade | **SVG CERTIFICATION** |
| **Software Engineer** | Content + Design + Certified SVGs | Component architecture, code structure | Build passes |
| **Immersive Experience** ⚠️ | Design + Code | Mobile-native UX, 60fps animations, Theatre Bar | Implementation ready |
| **Scrolling Auditor** ⚠️ | Implemented experience | Scroll certification report | G6: **SCROLL CERTIFICATION** |

**Implementation Layer Distinction:**
- `software-engineering-expert.md` → Component architecture, data flow, TypeScript, accessibility
- `immersive-experience-engineer.md` → Mobile-native feel, 60fps animations, touch interactions, Theatre Bar, hidden browser chrome

### Quality Gates (Blocking)

These checkpoints **must pass** before proceeding. See [Quality Gates System](#quality-gates-system) for full documentation.

```
┌─────────────────────────────────────────────────────────────────┐
│                    BLOCKING QUALITY GATES                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  G2: DESIGN RESEARCH COMPLETE                                   │
│     └─ Unique visual identity derived from subject              │
│     └─ Mobile-first layouts specified                           │
│     └─ Certified by: Scrollytelling Expert                      │
│                                                                 │
│  G3: HISTORIAN EDITOR APPROVAL ⚠️ BLOCKING                      │
│     └─ All facts verified                                       │
│     └─ Sources authenticated                                    │
│     └─ Cannot proceed without explicit approval                 │
│     └─ Certified by: Historian Editor                           │
│                                                                 │
│  G4: VISUAL AUDITOR CERTIFICATION ⚠️ BLOCKING                   │
│     └─ All SVG assets audited (5-tier framework)                │
│     └─ Technical quality verified (optimized, accessible)       │
│     └─ Animation performance certified (60fps mobile)           │
│     └─ Grade B+ or higher required for publication              │
│     └─ Certified by: Visual Auditor Agent                       │
│                                                                 │
│  G5: CITATION AUDIT APPROVAL ⚠️ BLOCKING                        │
│     └─ All claims have Tier 1-2 source support                  │
│     └─ All links functional (browser-verified)                  │
│     └─ Zero Tier 4 sources                                      │
│     └─ Quotes verified and attributed                           │
│     └─ Certified by: Citation Audit Agent                       │
│                                                                 │
│  G6: SCROLL CERTIFICATION ⚠️ BLOCKING (NEW)                     │
│     └─ Scroll-lock sections pin/release correctly               │
│     └─ 60fps animations on mid-tier mobile                      │
│     └─ Safari iOS tested on REAL device                         │
│     └─ Chrome Android tested on REAL device                     │
│     └─ Progress indicators accurate (±2%)                       │
│     └─ No user trapping in scroll-lock                          │
│     └─ Certified by: Immersive Scrolling Auditor                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### When to Use Orchestrator vs Standalone

| Scenario | Approach |
|----------|----------|
| Complete scrollytelling page | Use `scrollytelling-expert.md` (orchestrator) |
| Just need sources | Use `research-citations-expert.md` (standalone) |
| Just need fact-check | Use `historian-editor-expert.md` (standalone) |
| Just need UI component | Use `ui-ux-design-expert.md` (standalone) |
| Performance optimization only | Use `immersive-experience-engineer.md` (standalone) |
| Complex, multi-deliverable project | Consider orchestrator pattern |

---

## Quality Gates System

### What Are Quality Gates?

**Quality Gates** are mandatory checkpoints in the visual essay production pipeline. Each gate represents a specific quality standard that must be verified and certified before the project can advance to the next phase.

Think of gates like airport security checkpoints:
- You **cannot skip** a gate
- Each gate has **specific criteria** that must pass
- A **designated certifier** (agent or director) owns each gate
- **Failure is blocking** — you fix issues before proceeding
- Once passed, you **move forward** with confidence

### Why Gates Matter

| Without Gates | With Gates |
|---------------|------------|
| Publish broken scroll-lock | Scroll-lock verified on real devices |
| Unverified citations slip through | Citation Certification required |
| Mobile experience untested | Real device testing mandatory |
| Quality varies per essay | Consistent excellence every time |
| Issues found post-publication | Issues caught before deployment |
| User trust erodes | User trust strengthened |

### The Eight Gates

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        VISUAL ESSAY QUALITY GATES                                       │
│                                                                                         │
│  ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐        │
│  │ G1  │──►│ G2  │──►│ G3  │──►│ G4  │──►│ G5  │──►│ G6  │──►│ G7  │──►│ G8  │        │
│  │Brief│   │Design│  │Content│ │Sources│ │Citation│ │Scroll│  │Mobile│  │Publish│       │
│  └─────┘   └─────┘   └─────┘   └─────┘   └─────┘   └─────┘   └─────┘   └─────┘        │
│     │         │         │         │         │         │         │         │            │
│  Director  Scrolly-  Historian Research  Citation  Scrolling Director  Director       │
│            telling    Editor    Expert    Audit     Auditor                            │
│            Expert                         Agent                                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

#### G1: Brief Approval
**Owner:** Visual Essay Orchestrator
**Phase Boundary:** Intake → Production

| Criterion | Requirement |
|-----------|-------------|
| Scope Definition | Sections, read time, visual complexity defined |
| Timeline | Milestones with target dates |
| Success Criteria | Measurable quality thresholds |
| User Approval | User has reviewed and approved brief |

**Pass Condition:** Complete brief document with all sections filled.

---

#### G2: Design Research
**Owner:** Scrollytelling Expert
**Phase Boundary:** Pre-Production → Production

| Criterion | Requirement |
|-----------|-------------|
| Unique Visual Identity | Not copied from previous essays |
| Color Palette | Derived from subject matter |
| Typography | Justified by era/character alignment |
| Animation Philosophy | Matches subject nature |
| Mobile-First Layouts | Phone is primary design canvas |

**Pass Condition:** Design Research Report delivered with unique identity.

**Example Design Research Output:**
```markdown
## Design Research Report: The Thinking Machine

### Visual Archaeology
- Subject: AI History (1943-2025)
- Visual Language: Vacuum tubes → Neural networks → Data centers
- Era Transitions: B&W → Kodachrome → Digital

### Color System
- Primary: #0A0A0F (Deep Black) — technology depth
- Accent: #00B4D8 (Neural Blue) — connections, activations
- Warning: #FF6B6B (Soft Red) — AI safety discussions

### Typography
- Display: Space Grotesk — technical, modern
- Serif: Crimson Pro — historical gravitas
- Mono: JetBrains Mono — code, data

### Animation Philosophy
- Neural network building progressively
- Era color shifts on scroll
- Typewriter text reveals
```

---

#### G3: Content Complete
**Owner:** Historian Editor
**Phase Boundary:** Production → Citation Pipeline

| Criterion | Requirement |
|-----------|-------------|
| All Sections Drafted | Every planned section written |
| Fact-Check Complete | Historian Editor has verified facts |
| Sources Identified | Major claims have source candidates |
| Implementation Functional | Code builds and runs |

**Pass Condition:** Explicit approval from Historian Editor.

---

#### G4: Citation Research
**Owner:** Research & Citations Expert
**Phase Boundary:** Citation Discovery

| Criterion | Requirement |
|-----------|-------------|
| Minimum Source Count | Met project requirements (typically 10+) |
| Tier Distribution | 80%+ are Tier 1-2 sources |
| Claim Coverage | All major claims have citation |
| Quote Authentication | Quotes traced to original sources |
| URLs Accessible | Links verified working |

**Source Tier System:**
| Tier | Quality | Examples |
|------|---------|----------|
| Tier 1 | Gold Standard | .edu, JSTOR, peer-reviewed, museums |
| Tier 2 | Highly Credible | NYT, Guardian, Britannica, major publishers |
| Tier 3 | Use with Caution | Wikipedia, expert blogs |
| Tier 4 | ❌ AVOID | Social media, anonymous, self-published |

**Pass Condition:** Source package delivered with 80%+ Tier 1-2.

---

#### G5: Citation Audit
**Owner:** Citation Audit Agent
**Phase Boundary:** Citation Verification

| Criterion | Requirement |
|-----------|-------------|
| Claim-Citation Mapping | Every factual claim mapped to source |
| Source Quality | 80%+ Tier 1-2, zero Tier 4 |
| Link Integrity | All URLs browser-verified functional |
| Quote Accuracy | Quotes verified via Quotes Audit Agent |
| Format Consistency | Uniform citation style |

**Certification Status:**
| Status | Meaning |
|--------|---------|
| ✅ Certified | All criteria pass, ready for G6 |
| ⚠️ Conditional | Minor issues, fix before G7 |
| ❌ Rejected | Critical issues, must fix and re-audit |

**Pass Condition:** Citation Certification achieved.

---

#### G6: Scroll Certification ⭐ NEW
**Owner:** Immersive Scrolling Auditor
**Phase Boundary:** Pre-Publication

| Criterion | Requirement |
|-----------|-------------|
| Scroll-Lock Functionality | All sections pin/release correctly |
| Animation Performance | 60fps on mid-tier mobile devices |
| Safari iOS Testing | Real device verification (MANDATORY) |
| Chrome Android Testing | Real device verification |
| Progress Indicator | Accurate within ±2% |
| Accessibility | Reduced motion respected |
| No User Trapping | Can always escape scroll-lock |

**6-Phase Audit Methodology:**
1. Static Analysis (5 min)
2. Desktop Functional Testing (10 min)
3. Mobile Simulation Testing (5 min)
4. **Real Device Testing (15 min) — CRITICAL**
5. Edge Case Testing (5 min)
6. Accessibility Testing (5 min)

**Certification Thresholds:**
| Score | Status | Meaning |
|-------|--------|---------|
| ≥8.0/10 | ✅ CERTIFIED | Ready for G7 (Mobile Verification) |
| ≥6.0/10 | ⚠️ CONDITIONAL | Fix Tier 1 issues first |
| <6.0/10 | ❌ REJECTED | Major rework required |

**Automatic Rejection (Red Lines):**
- ❌ User trapped in scroll-lock section
- ❌ Complete failure on Safari iOS
- ❌ Visible jank/stutter on mid-tier devices
- ❌ No real mobile device testing performed

**Pass Condition:** Scroll Certification achieved (CERTIFIED or CONDITIONAL with fixes completed).

---

#### G7: Mobile Verification
**Owner:** Visual Essay Orchestrator
**Phase Boundary:** Pre-Publication

| Criterion | Requirement |
|-----------|-------------|
| Safari iOS Real Device | Physical iPhone tested |
| Chrome Android Real Device | Physical Android tested |
| Safe Area Handling | Notches, home bars don't obscure content |
| Touch Responsiveness | All interactions feel native |
| Network Conditions | Tested on throttled 3G/4G |

**Pass Condition:** Director confirms experience on real mobile devices.

---

#### G8: Publication Approval
**Owner:** Visual Essay Orchestrator
**Phase Boundary:** Approval → Deployment

| Criterion | Requirement |
|-----------|-------------|
| All Gates Passed | G1-G7 verified complete |
| No Outstanding Blockers | All critical issues resolved |
| Index Entry Prepared | `visualEssays` array entry ready |
| Metadata Complete | SEO, Open Graph, sitemap |
| Final Review | Director has reviewed end-to-end |

**Pass Condition:** Director sign-off on complete package.

---

### Gate Status Tracking

During production, track gate status with this format:

```markdown
## Gate Status Report: [Essay Title]

| Gate | Status | Date | Notes |
|------|--------|------|-------|
| G1: Brief Approval | ✅ Passed | Dec 8 | User approved |
| G2: Design Research | ✅ Passed | Dec 8 | Neural network theme |
| G3: Content Complete | ✅ Passed | Dec 9 | Editor approved |
| G4: Citation Research | ✅ Passed | Dec 9 | 35 sources, 89% Tier 1-2 |
| G5: Citation Audit | ✅ Certified | Dec 9 | Score: 9.2/10 |
| G6: Scroll Certification | ✅ Certified | Dec 9 | Score: 8.2/10 |
| G7: Mobile Verification | ⏳ In Progress | — | Awaiting real device test |
| G8: Publication Approval | ⏸️ Pending | — | Blocked on G7 |
| G7: Publication Approval | ⏳ Pending | — | Blocked by G6 |

**Current Blocker:** G6 - Awaiting Safari iOS testing
**Next Action:** Complete real device testing, invoke scrolling auditor
```

---

### Tutorial: Working With Gates

#### Scenario 1: Starting a New Visual Essay

```
# 1. Initiate production (starts at G1)
Using @agents/visual-essay-orchestrator.md, initiate production for 
a visual essay about "The History of Coffee".

# Director will:
# - Create production brief
# - Define scope and timeline
# - Present brief for G1 approval
```

#### Scenario 2: Gate Blocked - How to Proceed

When a gate fails:

```
# Example: G5 Citation Audit failed

## Citation Audit Result: ❌ REJECTED
- Score: 5.8/10
- Critical Issues:
  - 3 claims lack Tier 1-2 citation
  - 2 broken links
  - 1 Tier 4 source present

## Resolution Steps:
1. Address critical issues first
2. Invoke Research Expert for missing citations
3. Fix broken links
4. Remove/replace Tier 4 source
5. Re-invoke Citation Audit Agent

# Re-audit command:
Using @agents/citation-audit-agent.md, re-audit citations for
/essays/visual/history-of-coffee after fixes applied.
Focus: Verify the 3 previously uncited claims now have sources.
```

#### Scenario 3: Expedited Production

When timeline pressure exists:

```
# Request expedited production
Using @agents/visual-essay-orchestrator.md, initiate expedited production
for "Breaking News: AI Milestone" with 24-hour timeline.

# Director will:
# - Identify which gates can be parallelized (NOT skipped)
# - G5 Citation Audit remains mandatory (no exceptions)
# - G6 Scroll Certification remains mandatory (no exceptions)
# - Document exception approval
# - Schedule post-publication audit for accelerated gates
```

#### Scenario 4: Checking Gate Status Mid-Production

```
# Check current status
Using @agents/visual-essay-orchestrator.md, provide gate status report
for "The Thinking Machine" visual essay.

# Director returns:
# - Current gate position
# - Pass/fail for completed gates
# - Blockers if any
# - Next actions required
```

---

### Gate Ownership Summary

| Gate | Owner Agent | Certification Output |
|------|-------------|---------------------|
| G1 | Visual Essay Orchestrator | Production Brief |
| G2 | Scrollytelling Expert | Design Research Report |
| G3 | Historian Editor | Fact-Check Approval |
| G4 | Research & Citations Expert | Source Package |
| G5 | Citation Audit Agent | Citation Certification |
| G6 | **Immersive Scrolling Auditor** | Scroll Certification |
| G7 | Visual Essay Orchestrator | Publication Approval |

---

### Invoking an Orchestrator

When you invoke an orchestrator, it **automatically coordinates** all required agents:

```
# This single invocation triggers the full 6-agent workflow:
Apply @agents/scrollytelling-expert.md to create a scrollytelling 
experience about "The History of Coffee"

# The orchestrator will:
# 1. Conduct Design Research
# 2. Coordinate source discovery
# 3. Direct narrative writing
# 4. Enforce fact-checking
# 5. Guide visual refinement  
# 6. Ensure mobile-native implementation
# 7. Perform final review
```

---

## Multi-Agent Workflows

### Citation Audit Workflow

The `citation-audit-agent.md` orchestrates a comprehensive verification process before any scrollytelling can be published.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      CITATION AUDIT WORKFLOW                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ① CONTENT EXTRACTION                                                  │
│     └─ Read complete scrollytelling content                             │
│     └─ Extract all factual claims                                       │
│     └─ Extract all quotes and attributions                              │
│     └─ Extract Sources & Further Reading section                        │
│                                                                         │
│  ② CLAIM INVENTORY                                                     │
│     └─ List all verifiable claims with sections                         │
│     └─ List all statistics with dates                                   │
│     └─ 💬 EXTRACT QUOTES → Invoke quotes-audit-agent.md                │
│                                                                         │
│  ③ QUOTE VERIFICATION (Delegated to quotes-audit-agent.md)            │
│     ┌─────────────────────────────────────────────────────────────┐    │
│     │  Quotes Audit Agent                                          │    │
│     │  • Trace quotes to primary sources                           │    │
│     │  • Detect famous misattributions                             │    │
│     │  • Verify speaker identity                                   │    │
│     │  • Check context appropriateness                             │    │
│     │  • Return verdicts: ✅/⚠️/🟡/❌/🚫                           │    │
│     └─────────────────────────────────────────────────────────────┘    │
│                                                                         │
│  ④ SOURCE VERIFICATION                                                 │
│     └─ Classify each source by Tier (1-4)                               │
│     └─ Verify 80%+ are Tier 1-2                                         │
│     └─ Flag any Tier 4 sources as critical                              │
│                                                                         │
│  ⑤ BROWSER-BASED LINK VERIFICATION ⚠️ MANDATORY                       │
│     ┌─────────────────────────────────────────────────────────────┐    │
│     │  For EACH URL in Sources section:                            │    │
│     │  1. Navigate to URL using browser tools                      │    │
│     │  2. Check page title matches expected content                │    │
│     │  3. Detect sneaky redirects (page loads but wrong content)   │    │
│     │  4. Log status: ✅ Working / ❌ Broken / ⚠️ Redirect         │    │
│     │  5. Find replacement URLs for any broken links               │    │
│     └─────────────────────────────────────────────────────────────┘    │
│                                                                         │
│  ⑥ GAP ANALYSIS                                                        │
│     └─ Claims without adequate citation                                 │
│     └─ Citations without claim connection                               │
│     └─ Tier 3-4 sources needing upgrade                                 │
│     └─ Broken links requiring replacement                               │
│                                                                         │
│  ⑦ REPORT & CERTIFICATION                                              │
│     └─ Generate Citation Audit Report                                   │
│     └─ List 🔴 Critical / 🟡 Important / 🟢 Polish issues              │
│     └─ Issue certification: ✅ Approved / ❌ Rejected                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Browser Link Verification Process:**
```
Original URL → Browser Navigate → Check Result
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
              ✅ Page loads     ❌ 404/Error     ⚠️ Wrong content
              with expected     Page not found   (sneaky redirect)
              content                │                 │
                    │                │                 │
                    │                └────────┬────────┘
                    │                         │
                    ▼                         ▼
               Keep URL              Search for replacement
                                     • Same domain first
                                     • Same institution
                                     • Alternative Tier 1-2 source
                                     • Archive.org as last resort
```

**Quote Verdict Integration:**
| Quote Verdict | Citation Audit Impact | Required Action |
|---------------|----------------------|-----------------|
| ✅ Verified | No impact | None |
| ⚠️ Plausible | Note in report | Add source note if possible |
| 🟡 Disputed | 🟡 Important issue | Must add "origin disputed" |
| ❌ Unverified | 🔴 Critical issue | Rephrase as paraphrase |
| 🚫 Misattributed | 🔴 Critical issue | Correct or remove |

**Example Invocation:**
```
Using @agents/citation-audit-agent.md, audit the citations for
/essays/visual/the-firearm
Type: General

# The agent will:
# 1. Extract all claims and quotes
# 2. Invoke quotes-audit-agent.md for quote verification
# 3. Classify all sources by tier
# 4. Navigate to EACH URL using browser tools
# 5. Find replacements for broken links
# 6. Produce certification report
```

---

### Scrollytelling Production Pipeline

**Option A: Use Visual Essay Orchestrator (Recommended for Full Production)**

For complete end-to-end production with quality gates and certification:

```
@agents/visual-essay-orchestrator.md
     │
     ├─► Develops production brief (G1)
     ├─► Invokes scrollytelling-expert.md for content/design (G2, G3)
     ├─► Invokes research-citations-expert.md for sources (G4)
     ├─► Invokes citation-audit-agent.md for verification (G5)
     ├─► Invokes immersive-scrolling-auditor.md for scroll certification (G6)
     └─► Signs off on publication (G7)
```

**Option B: Direct Pipeline (For Experienced Users)**

The detailed workflow for creating **mobile-native** scrollytelling content:

```
1.  @agents/scrollytelling-expert.md              → Design Research (mobile-first visual identity) [G2]
2.  @agents/research-citations-expert.md          → Source Discovery (Tier 1-2 only) [G4]
3.  @agents/scrollytelling-expert.md              → Story Architecture (mobile layouts first)
4.  @agents/historian-writer-expert.md            → Narrative Draft
5.  @agents/historian-editor-expert.md            → Fact-Check [G3]
6.  @agents/research-citations-expert.md          → Final Source Audit
7.  @agents/scrollytelling-expert.md              → Content Integration
8.  @agents/ui-ux-design-expert.md                → Visual Refinement (mobile typography)
9.  @agents/svg-illustration-animation-expert.md  → Visual Assets (characters, icons, animations)
10. @agents/visual-auditor-agent.md               → Visual Certification (SVG quality) ⚠️ BLOCKING
11. @agents/software-engineering-expert.md        → Component Implementation (with certified SVG assets)
12. @agents/immersive-experience-engineer.md      → Mobile-Native Layer (60fps, touch, Theatre Bar)
13. @agents/citation-audit-agent.md               → Citation Verification (claim-source mapping) [G5]
14. @agents/immersive-scrolling-auditor.md        → Scroll Certification (scroll-lock, 60fps, devices) [G6] ⚠️ NEW
15. @agents/scrollytelling-expert.md              → Final Review → Publication Approval [G7]
```

**When to Use Which:**
| Scenario | Recommended Approach |
|----------|---------------------|
| New to visual essays | Use Visual Essay Orchestrator |
| Strict quality requirements | Use Visual Essay Orchestrator |
| Multiple essays in progress | Use Visual Essay Orchestrator |
| Quick iteration / familiar workflow | Use Direct Pipeline |
| Specific phase only (e.g., just citations) | Invoke specific agent directly |

**Key Steps:**
- Step 9 (`svg-illustration-animation-expert.md`) creates all inline SVG illustrations — characters, icons, objects, environments — with animation-ready structure. **Invoked when custom visuals are needed.**
- Step 10 (`visual-auditor-agent.md`) audits all SVG assets for technical quality, accessibility, animation performance, visual excellence, and content relevance. **BLOCKING**: Assets must receive certification (Grade B+ or higher) before integration.
- Step 11 (`software-engineering-expert.md`) implements components using the certified SVG assets from step 10.
- Step 12 (`immersive-experience-engineer.md`) ensures the final experience feels like a native app, not a website. This includes 60fps animations, touch interactions, hidden browser chrome, and Theatre Bar integration.
- Step 13 (`citation-audit-agent.md`) verifies all citations are valid, sources are Tier 1-2, links work, and claims have proper support. **BLOCKING (G5)**: Cannot publish without citation certification.
- Step 14 (`immersive-scrolling-auditor.md`) certifies all scroll-driven functionality: scroll-lock pin/release, 60fps performance, progress indicators, Safari iOS + Chrome Android real device testing. **BLOCKING (G6)**: Cannot publish without scroll certification.

### Quick Content Creation

For faster iteration, use combined invocations:

```
Using @agents/scrollytelling-expert.md with support from 
@agents/research-citations-expert.md, create a complete 
scrollytelling experience about [topic] with verified sources.
```

---

## Invocation Templates

For comprehensive, structured agent invocations, see:

**`InvocationTemplates/`** — Pre-built templates for maximum-quality agent invocations:

| Template | Purpose | Target Agent |
|----------|---------|--------------|
| [Visual Essay Creation](./InvocationTemplates/visual-essay-creation.md) | Novel, unique visual essays with cinematic quality | Visual Essay Orchestrator |

---

## Citation Reports

**`auditors/CitationReports/`** — Archive of citation audit reports for all visual essays:

| File | Purpose |
|------|---------|
| [README.md](./auditors/CitationReports/README.md) | Index of all audits with status tracking |
| `{slug}-citation-audit.md` | Individual audit reports |

**Current Reports:**
| Report | Experience | Status |
|--------|------------|--------|
| [the-gridiron-citation-audit.md](./auditors/CitationReports/the-gridiron-citation-audit.md) | The Gridiron (#33) | 🟡 Approved with Conditions |

New reports are automatically saved here by `@agents/auditors/citation-audit-agent.md`.

---

## Visual Audit Reports

**`auditors/VisualAuditReports/`** — Archive of SVG/animation audit reports for all visual essays:

| File | Purpose |
|------|---------|
| [README.md](./auditors/VisualAuditReports/README.md) | Index of all audits with grades |
| `{slug}-visual-audit.md` | Individual audit reports |

**Current Reports:**
| Report | Experience | Grade | Status |
|--------|------------|-------|--------|
| [the-ledger-visual-audit.md](./auditors/VisualAuditReports/the-ledger-visual-audit.md) | The Ledger (#34) | A- (91/100) | ✅ Certified |

New reports are automatically saved here by `@agents/auditors/visual-auditor-agent.md`.

---

## Audit Reports (Centralized)

**`orchestration/audits/`** — Centralized storage for all audit reports, organized by essay:

```
orchestration/audits/
├── README.md                          # Audit system overview
├── the-thinking-machine/              # All audits for this essay
│   ├── README.md                      # Essay audit history
│   ├── 2024-12-09-scroll-audit.md     # Scroll certification
│   └── 2024-12-10-experience-audit.md # Experience audit
└── [other-essay-slug]/
```

**Naming Convention:** `YYYY-MM-DD-[type]-audit.md`

**Audit Types:**
| Type | Agent | Focus |
|------|-------|-------|
| `scroll-audit` | Scrolling Auditor | Scroll-lock, performance |
| `experience-audit` | Experience Auditor | Animations, reveals |
| `visual-audit` | Visual Auditor | SVG quality |
| `citation-audit` | Citation Audit | Source integrity |
| `comprehensive-audit` | Meta Audit Orchestrator | All domains |

---

## Experience Specifications

Each visual essay should have an **EXPERIENCE-SPEC.md** documenting expected behaviors:

**Location:** `src/app/essays/visual/[slug]/EXPERIENCE-SPEC.md`

**Purpose:** Documents what SHOULD happen (prescriptive) — the source of truth for auditing.

**Contents:**
- Scroll-lock sequences with progress thresholds
- Animation timings and triggers
- Reveal patterns per section
- Expected behaviors per chapter
- Implementation status tracker

**Example:**
```markdown
## Chapter 2: The Dartmouth Summer
**Type:** Scroll-Lock Sequence
**Scroll Depth:** 350vh

| Progress | Phase | Content |
|----------|-------|---------|
| 0-50% | Proposal Reveal | Phrases appear progressively |
| 52% | Punchline 1 | "They believed... 2 months" |
| 60% | Punchline 2 | "It would take 70 years" |
| 78%+ | Founders | McCarthy, Minsky, Shannon portraits |
```

**Used By:** Meta Audit Orchestrator, Experience Auditor, Scrolling Auditor

---

**Why Use Templates?**
- **Uniqueness enforcement** — Explicit checks against existing work
- **Intelligent defaults** — Fills gaps when you want to move fast
- **Strategic questioning** — Optional deep customization
- **Award-winning standards** — Technical and creative requirements defined

**How to Use:**
```
Using @agents/InvocationTemplates/visual-essay-creation.md,
create a visual essay about [YOUR TOPIC]
```

**Operating Modes:**
| Mode | Trigger | Behavior |
|------|---------|----------|
| **Quick** | "just run with it" | Apply defaults, proceed immediately |
| **Guided** | "guide me through" | Ask all questions interactively |
| **Auto** | Just provide topic | Ask 3-5 key questions, fill rest |

---

## Meta-Framework

For creating new agents or understanding the underlying architecture, see:

**`META-AGENT-FRAMEWORK.md`** — The abstract parent framework that defines:
- Required structural components
- Role definition patterns
- Quality assurance frameworks
- Collaboration protocols
- Agent creation checklist

---

## Best Practices

1. **Be Specific**: Include topic, scope, and any constraints in your prompt
2. **Reference the File**: Always use `@agents/[name].md` for clear invocation
3. **Chain Agents**: For complex tasks, invoke multiple agents in sequence
4. **Trust the Framework**: Agents have built-in quality checks—let them work
5. **Provide Context**: The more context you give, the better the output

---

## ⚠️ Known Style Conflicts (Scrollytelling)

> 📄 **Full documentation with copy-paste fix:** [`docs/fixes/visual-essays/PATTERN-global-css-hero-content-fix.md`](../../docs/fixes/visual-essays/PATTERN-global-css-hero-content-fix.md)

### Global CSS Bleeding into Scrollytelling Pages

**Problem:** The global `globals.css` file contains styles for common class names (like `.hero-content`) that can bleed into scrollytelling story pages and cause unexpected layout issues.

**Specific Issue: `.hero-content` Two-Column Split**

In `src/app/globals.css`:
```css
.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* Causes two-column layout! */
  gap: 4rem;
}
```

This global rule applies to ANY element with class `.hero-content`, including those inside scrollytelling stories. On wide screens (>1024px), this causes hero content to split into two columns unexpectedly.

**Solution:** Always override global styles in scrollytelling-specific CSS:

```css
/* In your-story.css */
.your-story .hero-content {
  /* Override global grid styles */
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-template-columns: unset;
  gap: unset;
}
```

**Prevention Checklist:**
- [ ] Use unique class prefixes (`.firearm-story .hero-content` not just `.hero-content`)
- [ ] Explicitly set `display`, `grid-template-columns`, `flex-direction` in story CSS
- [ ] Test on wide desktop screens (1440px+) to catch layout bleed
- [ ] Consider using CSS Modules or more specific selectors

**Other Potentially Conflicting Global Classes:**
- `.hero-title`, `.hero-subtitle`, `.hero-description`
- `.section`, `.content`
- Any generic layout class names

**Rule of Thumb:** If your scrollytelling uses a class name that sounds generic, check `globals.css` for conflicts and add explicit overrides.

---

## Mobile-First Scrollytelling (Critical)

**70%+ of scrollytelling users are on mobile.** Every scrollytelling piece must:

| Requirement | Agent Responsible |
|-------------|-------------------|
| Design mobile-first layouts | `scrollytelling-expert.md` |
| 60fps animations on mobile | `immersive-experience-engineer.md` |
| Touch-friendly (44px+ targets) | `immersive-experience-engineer.md` |
| Safe area handling (notches) | `immersive-experience-engineer.md` |
| Theatre Bar integration | `immersive-experience-engineer.md` |
| Real device testing | Both |

**Quick Mobile Check:**
- [ ] Tested on real iPhone (not just browser)
- [ ] Tested on real Android
- [ ] All tap targets reachable with thumb
- [ ] No horizontal scroll
- [ ] Feels like an app, not a website

---

## See Also

- **[AGENT-REGISTRY.md](./AGENT-REGISTRY.md)** — Quick-reference index of all agents, patterns, and relationships
- **[Orchestration Overview](../README.md)** — System architecture, component types, relationships
- **[Skills README](../skills/README.md)** — Procedural knowledge agents can apply
- **[Audits Directory](../audits/README.md)** — Centralized audit reports by essay
- **[META-AGENT-FRAMEWORK](./META-AGENT-FRAMEWORK.md)** — Creating new agents

---

*Last Updated: December 2024*

