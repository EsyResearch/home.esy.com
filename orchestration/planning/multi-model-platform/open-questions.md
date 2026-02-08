# Open Questions

> Unresolved decisions for the multi-model orchestration platform. These need further discussion and exploration before implementation.

---

## Q1: Agent .md Parsing — How Much Structure Do We Need?

**Context**: Agent markdown files were written for humans to read and paste into Claude. For automated routing, the platform needs to programmatically extract system prompt, expected inputs, expected outputs, and quality criteria.

**Options**:
- **A) Treat as opaque text** — send the entire .md as the system prompt. Simple, works today.
- **B) Add frontmatter** — add YAML frontmatter to each agent .md with machine-readable metadata (model hints, token budget, input/output schemas).
- **C) Separate spec from prompt** — split each agent into a `.prompt.md` (for the model) and a `.spec.yaml` (for the platform).

**Considerations**:
- Option A is the simplest starting point but wastes tokens on sections irrelevant to the current task
- Option B preserves the current single-file convention
- Option C is the cleanest but doubles the number of agent files

**Status**: Unresolved. Start with A, evolve to B.

---

## Q2: Workflow Definition Format — JSON or YAML?

**Context**: Current workflow definitions are in JSON (`visual-essay.json`). The extended format (with modes, conditional gates, parallel agents) may be more readable in YAML.

**Options**:
- Stay with JSON (compatible with runner, easy to validate)
- Move to YAML (more readable, supports comments, multiline strings)

**Status**: Low priority. JSON works fine for now.

---

## Q3: Where Does the Platform Run?

**Context**: The web interface needs a backend that makes API calls to multiple model providers. This backend needs to:
- Store API keys securely
- Manage run state
- Stream responses to the UI
- Handle retries and fallbacks

**Options**:
- **A) Next.js API routes** — keep everything in the existing esy.com codebase
- **B) Separate orchestration service** — a dedicated backend (Node.js, Python) that the Next.js frontend calls
- **C) Serverless functions** — Vercel/AWS Lambda for each model adapter

**Considerations**:
- Long-running agent calls (some gates produce 100K+ tokens) don't fit well in serverless (timeout limits)
- A separate service can be deployed independently and scaled separately
- Next.js API routes keep the codebase unified

**Status**: Unresolved. Needs architectural decision.

---

## Q4: How Do Users See Model Selection?

**Context**: The about page says users don't need to be prompt engineers. Should they also not need to be "model engineers"?

**Options**:
- **A) Fully invisible** — Esy picks the optimal model mix. Users never see model names.
- **B) Quality tiers** — Users choose "Standard" or "Premium" quality, which maps to model tiers internally.
- **C) Transparent** — Power users can see and override which model handles each agent.

**Considerations**:
- Option A is most aligned with Esy's philosophy ("structure over prompting")
- Option B gives users price/quality control without complexity
- Option C serves power users and researchers but adds UI complexity

**Status**: Unresolved. Likely B for v1, C as an advanced feature.

---

## Q5: How Do We Handle Model-Specific Prompt Optimization?

**Context**: Claude, GPT, and Gemini each respond differently to the same prompt. An agent .md optimized for Claude may underperform on GPT.

**Options**:
- **A) One prompt, all models** — use the same agent .md regardless of model. Accept variance.
- **B) Per-model prompt variants** — maintain Claude-optimized and GPT-optimized versions of each agent.
- **C) Prompt compiler** — a layer that adapts the generic agent .md to model-specific conventions (e.g., Claude prefers XML tags, GPT prefers JSON schemas).

**Considerations**:
- Option A is the only scalable starting point (50+ agents × N models = too many variants)
- Option C is the ideal long-term solution but requires understanding each model's quirks
- Prompt sensitivity may be less of an issue with frontier models (they're increasingly capable of following arbitrary formatting)

**Status**: Unresolved. Start with A, build C when model-specific failures surface.

---

## Q6: Gate Contracts — Are They Sufficient for Automated Validation?

**Context**: Current gate contracts check file existence, heading presence, and source counts. For automated model comparison, we may need deeper validation:
- Does the .jsx file actually compile?
- Does the prose meet a minimum word count?
- Are data visualizations rendering correctly?
- Is the research internally consistent?

**Options**:
- **A) Expand contract validation** — add more validation types (compile check, word count, JSON schema validation, etc.)
- **B) LLM-as-judge** — use a separate model to evaluate gate outputs (e.g., "Score this research package 1-5 on completeness")
- **C) Both** — automated checks for objective criteria, LLM-as-judge for subjective quality

**Considerations**:
- Option C is the gold standard for evaluation
- LLM-as-judge adds cost but can evaluate prose quality, which no automated check can
- The judge model should be different from the model being tested (to avoid self-evaluation bias)

**Status**: Unresolved. Important for the A/B comparison harness.

---

## Q7: State Management — Where Do Runs Live?

**Context**: Currently, run records are JSON files on disk (`orchestration/runs/`). A web platform needs persistent, queryable state.

**Options**:
- **A) Database** — PostgreSQL/SQLite for run records, gate results, evaluations
- **B) File-based + API** — keep JSON files, add a thin API layer that reads/writes them
- **C) Hybrid** — database for indexes and queries, files for large artifacts (research packages, specs)

**Considerations**:
- Database is necessary for any serious web platform (queries, user associations, history)
- Large artifacts (100K+ character specs, research files) are awkward in a database
- The existing file-based approach works for local development and could coexist

**Status**: Unresolved. Likely C for production.

---

## Q8: Multi-Agent Parallelism in Production (G5)

**Context**: In G5 (Production), the Conceptual Essay Orchestrator invokes multiple agents: writer, visualization architect, frontend architect. These could potentially run in parallel with different models.

**Questions**:
- Can the writer and viz architect work independently, or does one need the other's output?
- How do you merge outputs from parallel agents into a single .jsx file?
- Who resolves conflicts (e.g., writer specifies a layout that the viz architect can't implement)?

**Considerations**:
- The current invocation spec serves as the shared contract — both agents work from it
- A "merge agent" or the orchestrator itself may need to combine outputs
- This is an advanced feature; v1 can run agents sequentially

**Status**: Unresolved. Sequential execution for v1, explore parallelism for v2.

---

## Q9: How Do We Benchmark a Complete Visual Essay?

**Context**: The Water Scarcity benchmark prompt demands a publishable artifact. "If it could be published on The Pudding without embarrassment, it passes." How do you objectively measure that?

**Dimensions to evaluate**:
- Prose quality (narrative arc, intellectual rigor, accessibility)
- Visual quality (editorial-grade design, responsive, accessible)
- Interaction quality (smooth animations, intuitive controls, mobile-friendly)
- Data accuracy (correct numbers, faithful visual encoding, sourced)
- Technical quality (clean code, performant, no console errors)
- Coherence (prose and visuals reinforce each other, no contradictions)

**Open sub-questions**:
- Who judges? Human panel? LLM-as-judge? Automated metrics?
- What's the scoring rubric?
- How do you compare across models fairly?
- Is the benchmark reproducible? (Same prompt should yield comparable quality across runs)

**Status**: Unresolved. Critical for the benchmarking initiative.

---

## Next Steps

These questions don't all need answers at once. The priority order:

1. **Q1** (Agent parsing) — blocks model adapter implementation
2. **Q3** (Platform architecture) — blocks web UI development
3. **Q6** (Gate validation) — blocks A/B comparison
4. **Q4** (User-facing model selection) — blocks product design
5. **Q7** (State management) — blocks production deployment
6. The rest can be deferred until v1 is running
