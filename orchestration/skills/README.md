# Esy Skills System

Skills are codified procedural knowledge—step-by-step workflows that any agent can apply to accomplish specific tasks reliably.

---

## What is a Skill?

A **skill** is a documented procedure that transforms a task from "figure it out each time" to "follow these verified steps."

### Skills vs Agents

| Aspect | Agent | Skill |
|--------|-------|-------|
| **Nature** | Persona with expertise | Procedure with steps |
| **Decision Making** | Exercises judgment | Deterministic execution |
| **Applicability** | Owns a domain | Used by any agent |
| **Output** | Deliverables (content, code) | Verified results |
| **Invocation** | "Using your role as..." | "Apply this skill..." |
| **Metaphor** | A specialist you hire | A recipe you follow |

### When to Create a Skill

Create a skill when you observe:

1. **Repeated Failure Pattern** — Agents keep failing the same task the same way
2. **Procedural Solution** — The fix is a specific sequence of steps
3. **Agent-Agnostic** — Multiple agents could benefit from the procedure
4. **Source-Specific Knowledge** — Different sources require different approaches

**Example:** The `image-url-extraction` skill was created because agents repeatedly failed to extract direct image URLs from archive pages. The solution was source-specific procedures (Wikimedia, LOC, etc.) that any agent researching images can now apply.

---

## Current Skills

| Skill | Purpose | Used By |
|-------|---------|---------|
| [image-url-extraction](./image-url-extraction/) | Extract direct image URLs from archive HTML pages | `image-research-licensing-expert.md` |
| [visual-essay-invocation](./visual-essay-invocation/) | Generate comprehensive visual essay briefs | `visual-essay-director.md` |

---

## Skill Anatomy

Every skill follows this structure:

```
skill-name/
├── SKILL.md                  # Core definition, procedures, decision tree
├── README.md                 # Quick reference, usage guide
├── references/               # Source-specific or context-specific procedures
│   ├── source-a.md
│   ├── source-b.md
│   └── generic-fallback.md
└── examples/
    └── successful-examples.md  # Documented real-world applications
```

### SKILL.md Structure

```markdown
# [Skill Name]

## Purpose
What problem this skill solves.

## When to Use
Conditions that trigger skill application.

## Core Procedure
Step-by-step process with decision points.

## Red Lines
What to never do.

## Integration with Agents
Which agents use this skill and how.

## Troubleshooting
Common problems and solutions.
```

### References

References provide **context-specific procedures**. For `image-url-extraction`:

| Reference | Context |
|-----------|---------|
| `wikimedia-commons.md` | Extracting from Wikimedia |
| `library-of-congress.md` | Extracting from LOC |
| `generic-fallback.md` | Unknown sources |

### Examples

Document real successful applications:
- What was the input?
- What procedure was followed?
- What was the output?
- Any lessons learned?

---

## Using a Skill

### From an Agent's Perspective

When an agent needs to apply a skill:

1. **Recognize the trigger** — "I need to extract an image URL from Wikimedia"
2. **Locate the skill** — `@orchestration/skills/image-url-extraction/SKILL.md`
3. **Identify the reference** — Match source to reference file
4. **Execute the procedure** — Follow steps exactly
5. **Verify the result** — Apply skill's verification steps

### Invocation Pattern

```
# Agent documentation should include:

## Required Skill: [Skill Name]

When [trigger condition], apply `@orchestration/skills/[skill-name]/SKILL.md`:

1. [Step 1 from skill]
2. [Step 2 from skill]
3. Verify using [verification method]
```

---

## Creating a New Skill

### Step 1: Identify the Need

- [ ] Observed repeated failures (same task, same way)?
- [ ] Solution is procedural (specific steps)?
- [ ] Multiple agents could benefit?
- [ ] Not just domain expertise (that's an agent)?

### Step 2: Create the Structure

```bash
mkdir -p orchestration/skills/new-skill-name/{references,examples}
touch orchestration/skills/new-skill-name/{SKILL.md,README.md}
```

### Step 3: Write SKILL.md

Follow the template:

```markdown
# [Skill Name] Skill

## Purpose
[One paragraph: what problem this solves]

## When to Use This Skill
[Bullet list of trigger conditions]

## Core Procedure

### Step 1: [First Step]
[Detailed instructions]

### Step 2: [Second Step]
[Detailed instructions]

### Step 3: Verification
[How to confirm success]

## Red Lines
- ❌ [Never do this]
- ❌ [Never do that]

## Quick Reference
[One-liner commands or patterns]

## Integration with Agents
[Which agents should use this, how to invoke]

## Troubleshooting
| Problem | Cause | Solution |
|---------|-------|----------|
| [Issue] | [Why] | [Fix] |
```

### Step 4: Create References (if source-specific)

For each context variation:
- Document the specific procedure
- Include working examples
- Note edge cases

### Step 5: Document Examples

Add at least one real successful application to `examples/`.

### Step 6: Update Documentation

```
Using @orchestration/agents/readme-curator.md, update documentation
to reflect the new [skill-name] skill. Added to skills directory.
```

---

## Skill Quality Checklist

Before considering a skill complete:

- [ ] **SKILL.md** has clear purpose and trigger conditions
- [ ] **Procedure** is step-by-step with verification
- [ ] **Red lines** document what never to do
- [ ] **References** cover all major context variations
- [ ] **Examples** document real applications
- [ ] **Agent integration** documented (which agents, how invoked)
- [ ] **Skills README** updated with new entry
- [ ] **Agent README** cross-references skill if applicable

---

## Skill vs Agent Decision Guide

```
┌─────────────────────────────────────────────┐
│ Is the solution a series of specific steps  │
│ that work the same way every time?          │
└─────────────────────┬───────────────────────┘
                      │
            ┌─────────┴─────────┐
            │ YES               │ NO
            ▼                   ▼
     ┌─────────────┐     ┌─────────────────────┐
     │   SKILL     │     │ Does it require     │
     │             │     │ judgment/expertise? │
     │ Procedural  │     └──────────┬──────────┘
     │ Repeatable  │                │
     │ Verifiable  │         ┌──────┴──────┐
     └─────────────┘         │ YES         │ NO
                             ▼             ▼
                      ┌─────────────┐  ┌─────────────┐
                      │   AGENT     │  │  NEITHER    │
                      │             │  │             │
                      │ Expertise   │  │ Might just  │
                      │ Judgment    │  │ be docs or  │
                      │ Creative    │  │ a simple    │
                      └─────────────┘  │ script      │
                                       └─────────────┘
```

---

## See Also

- **[Orchestration Overview](../README.md)** — System architecture
- **[Agents README](../agents/README.md)** — Agent catalog
- **[META-AGENT-FRAMEWORK](../agents/META-AGENT-FRAMEWORK.md)** — Creating agents

---

*Last Updated: December 2024*

