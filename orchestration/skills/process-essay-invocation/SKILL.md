# Programmatic Process Essay Invocation Skill

> Created: December 2025
> Format: Programmatic Process Essay (Stateful Interactive Assembly)

## Overview

This skill defines the **12-section specification template** for Programmatic Process Essays—a new Esy format where readers build a digital twin through interactive choices that persist and affect outcomes.

**Key Distinction from Standard Visual Essays:**
- Standard visual essays are **narrative-first** with scroll-driven reveals
- Process essays are **assembly-first** with stateful reader agency
- Both share: high production quality, research rigor, accessibility standards

---

## Format Definition

### What is a Programmatic Process Essay?

A **Programmatic Process Essay** guides readers through assembling a small object from parts into a finished form. The essay includes interactive scenes where readers:

- Make configuration choices (component selection, parameter tuning)
- Perform "virtual assembly" actions (drag-and-drop, step confirmations)
- See their decisions reflected in a persistent digital twin
- Receive a final "artifact card" summarizing what they built

**Core Promise**: Reader choices matter. Early decisions demonstrably affect late outcomes.

### Format Requirements

| Requirement | Description |
|-------------|-------------|
| **Narrative-first** | Every interactive element serves a learning objective, introduced with context |
| **Stateful progression** | Reader decisions stored and reflected throughout (final config depends on earlier actions) |
| **Step-by-step assembly** | Each step adds or configures parts; visualization updates accordingly |
| **Digital twin** | Coherent representation of the object (IDs, properties, connections) |
| **Programmatic scenes** | At least 5 scenes with dynamic logic (not just animations) |
| **No reader coding** | Controls are direct manipulation; programming is behind the scenes |
| **Graceful fallback** | Each scene has static fallback (image + explanation) if scripts fail |
| **Accessibility** | Keyboard support, ARIA labels, reduced-motion mode |
| **Web-implementable** | Works with Esy's React/Next.js/TypeScript stack |

---

## 12-Section Specification Template

### Section 1: One-Paragraph Concept

**Purpose**: Capture the core promise in a single paragraph.

**Template**:
```markdown
## 1. Concept

[Object name] is [what it is]. In this programmatic process essay, readers will 
[what they'll do] through [number] interactive steps. By the end, they'll have 
[what they'll have built] and understand [what they'll understand]. Their choices—
[list 2-3 key choice types]—will determine [what outcomes vary].
```

**Example**:
```markdown
## 1. Concept

An LED flashlight is one of the simplest complete electronic devices: a power 
source, a switch, a current-limiting resistor, and a light-emitting diode. In 
this programmatic process essay, readers will assemble a working flashlight 
through 10 interactive steps. By the end, they'll have a personalized digital 
flashlight and understand how component choices create engineering tradeoffs. 
Their choices—LED color, resistor value, battery type—will determine brightness, 
battery life, and overall efficiency.
```

---

### Section 2: Learning Objectives

**Purpose**: Define 6-10 concrete, measurable learning outcomes.

**Template**:
```markdown
## 2. Learning Objectives

After completing this essay, the reader will be able to:

1. [Verb] [specific knowledge/skill] (e.g., "Explain why...")
2. [Verb] [specific knowledge/skill]
3. [Verb] [specific knowledge/skill]
4. [Verb] [specific knowledge/skill]
5. [Verb] [specific knowledge/skill]
6. [Verb] [specific knowledge/skill]
...
```

**Verb Bank**: Explain, Identify, Calculate, Predict, Compare, Select, Justify, Trace, Diagnose, Configure

---

### Section 3: Storyboard Outline

**Purpose**: Map 8-12 steps with narrative, interaction, state, and visualization.

**Template** (per step):
```markdown
## 3. Storyboard Outline

### Step [N]: [Title]

**Narrative**: [What the essay text explains at this moment]

**Interaction**: [What the reader does—drag, slide, toggle, confirm]

**State Modified**: 
- `state.field1` ← [new value or transformation]
- `state.field2` ← [new value or transformation]

**Visualization Shows**:
- [What appears/changes in the digital twin]
- [Annotations, highlights, animations]

**"Notice This" Insight**: [One key takeaway the reader should internalize]
```

**Step Types**:
| Type | Description | Example |
|------|-------------|---------|
| **Introduction** | Set context, no interaction | "Meet the components" |
| **Selection** | Choose from options | "Pick your LED color" |
| **Configuration** | Tune parameters | "Set resistor value" |
| **Assembly** | Place part in position | "Drag LED into socket" |
| **Verification** | Test/diagnose | "Why isn't it lighting?" |
| **Reveal** | Show consequence of choices | "Your efficiency score" |
| **Completion** | Final artifact card | "Your flashlight specs" |

---

### Section 4: Scene Templates

**Purpose**: Define 6-10 reusable interaction patterns.

**Template** (per scene type):
```markdown
## 4. Scene Templates

### Template: [Name]

**Description**: [What this scene type does]

**Inputs**:
- [Input 1]: [type] — [description]
- [Input 2]: [type] — [description]

**Output Visuals**:
- [What renders when interaction occurs]

**State Changes**:
- [What state fields are modified]

**Failure/Fallback**:
- [What shows if JS fails or user has reduced-motion]

**Best Used For**:
- [Situation 1]
- [Situation 2]
```

**Required Scene Templates**:
1. **Exploded View Assembly** — Drag part into place
2. **Parameter Tuning** — Sliders with constraints and live feedback
3. **Tradeoff Explorer** — Two variables, one outcome visualization
4. **Part Selection** — Choose from options with preview
5. **Diagnostic Mode** — "Why isn't it working?" troubleshooting
6. **Connection Wiring** — Draw/confirm connections between components

**Optional Scene Templates**:
7. **Timeline Scrub** — Watch signals/forces evolve over time
8. **Branching Explanation** — "If you chose X earlier..." conditional content
9. **Comparison View** — Side-by-side different configurations
10. **Simulation Run** — Animate the assembled object in operation

---

### Section 5: State Model

**Purpose**: Define the JSON schema for the object's configuration.

**Template**:
```markdown
## 5. State Model

### Schema

```typescript
interface [Object]State {
  // Parts inventory
  parts: {
    [partId: string]: {
      id: string;
      type: string;
      selected: boolean;
      properties: Record<string, number | string | boolean>;
    };
  };
  
  // Configuration choices
  config: {
    [choiceId: string]: string | number | boolean;
  };
  
  // Connections (conceptual graph)
  connections: Array<{
    from: string;  // part ID
    to: string;    // part ID
    type: string;  // connection type
  }>;
  
  // Derived metrics (computed from choices)
  metrics: {
    [metricId: string]: number;
  };
  
  // Progress tracking
  progress: {
    currentStep: number;
    completedSteps: string[];
    startedAt: number;
  };
  
  // User preferences
  preferences: {
    reducedMotion: boolean;
    highContrast: boolean;
  };
}
```

### Example Instance

```json
{
  "parts": { ... },
  "config": { ... },
  "connections": [ ... ],
  "metrics": { ... },
  "progress": { ... },
  "preferences": { ... }
}
```
```

---

### Section 6: Simulation/Logic Model

**Purpose**: Define how outcomes are computed from choices.

**Template**:
```markdown
## 6. Simulation/Logic Model

### Simplified Model Explanation

[2-3 paragraphs explaining the physics/engineering model in plain language.
This is educational, not a physics textbook. Accuracy matters, but accessibility
matters more.]

### Derived Metrics

| Metric | Formula | Units | Range |
|--------|---------|-------|-------|
| [Metric 1] | [formula] | [units] | [min-max] |
| [Metric 2] | [formula] | [units] | [min-max] |
| [Metric 3] | [formula] | [units] | [min-max] |

### Pseudocode

```
function computeMetrics(state):
  // Metric 1
  metric1 = [calculation using state.config values]
  
  // Metric 2
  metric2 = [calculation]
  
  // Metric 3
  metric3 = [calculation]
  
  return { metric1, metric2, metric3 }
```

### Uncertainty/Variability (Optional)

[How real-world variability could be represented—e.g., ±10% tolerance on
component values, random variation in simulation runs]
```

---

### Section 7: Visual System Spec

**Purpose**: Define how the digital twin is rendered.

**Template**:
```markdown
## 7. Visual System Spec

### Rendering Approach

- **Primary**: [SVG layers | Canvas | WebGL]
- **Coordinate System**: [origin, units, scale]
- **Viewport**: [dimensions, responsive behavior]

### Part Naming Convention

| Part | SVG ID | Layer | Z-Index |
|------|--------|-------|---------|
| [Part 1] | `part-[name]` | [layer] | [z] |
| [Part 2] | `part-[name]` | [layer] | [z] |

### Rendering States

| State | Visual Treatment |
|-------|-----------------|
| **Unselected** | Ghosted (30% opacity), dotted outline |
| **Available** | Full color, subtle pulse animation |
| **Selected** | Highlighted, glow effect |
| **Assembled** | In-place, connected, no glow |
| **Error** | Red outline, shake animation |

### Connection Rendering

- **Wires/Traces**: [how connections between parts are drawn]
- **Joints/Fasteners**: [how mechanical connections appear]
- **Flow Indicators**: [how current/force/signal flow is shown]

### Animation Principles

- **Assembly**: [how parts animate into place]
- **State Change**: [how parameter changes animate]
- **Feedback**: [how user actions get visual response]
```

---

### Section 8: Implementation Architecture

**Purpose**: Define the web implementation structure.

**Template**:
```markdown
## 8. Implementation Architecture

### File Structure

```
src/app/essays/[slug]/
├── page.tsx                    # Next.js page wrapper
├── [Name]Client.tsx            # Main client component
├── [slug].css                  # Custom styles
├── components/
│   ├── DigitalTwin.tsx         # SVG/Canvas renderer
│   ├── scenes/                 # Scene components
│   │   ├── [Scene1].tsx
│   │   ├── [Scene2].tsx
│   │   └── ...
│   └── controls/               # UI primitives
│       ├── DragDropZone.tsx
│       ├── ParameterSlider.tsx
│       └── ...
├── lib/
│   ├── state.ts                # State types + reducer
│   └── simulation.ts           # Metric calculations
└── SPEC.md                     # This specification
```

### Component Architecture

```
┌─────────────────────────────────────────────────────────┐
│ [Name]Client.tsx                                         │
│ ┌─────────────────┐  ┌────────────────────────────────┐ │
│ │ State Provider  │  │ Sticky Viewport                │ │
│ │ (useReducer)    │  │ ┌────────────────────────────┐ │ │
│ │                 │  │ │ DigitalTwin.tsx            │ │ │
│ │ state ──────────┼──┼─│ (SVG renderer)             │ │ │
│ │                 │  │ └────────────────────────────┘ │ │
│ └─────────────────┘  └────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Scrollytelling Content                              │ │
│ │ ┌──────────┐ ┌──────────┐ ┌──────────┐             │ │
│ │ │ Scene 1  │ │ Scene 2  │ │ Scene 3  │ ...         │ │
│ │ └──────────┘ └──────────┘ └──────────┘             │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### State Management

- **Store**: React `useReducer` with typed actions
- **Persistence**: `localStorage` for cross-session state
- **Export/Import**: JSON download/upload for sharing configurations

### Scene Runtime

Each scene component receives:
- `state`: Current object state
- `dispatch`: Action dispatcher
- `isActive`: Whether scene is currently in viewport

### Testing Strategy

- **State Tests**: Snapshot tests for reducer transitions
- **Interaction Tests**: Playwright for drag/drop, slider interactions
- **Visual Regression**: Screenshot comparison for SVG rendering
- **Accessibility**: axe-core automated checks

### Performance Notes

- Throttle scroll handlers (16ms)
- Use `requestAnimationFrame` for SVG updates
- Avoid layout thrash in animations
- Lazy-load scenes below fold
```

---

### Section 9: Essay Text (Steps 1-3)

**Purpose**: Write the actual narrative prose for the first three steps.

**Template**:
```markdown
## 9. Essay Text (Steps 1-3)

### Step 1: [Title]

[Narrative prose introducing the step. 2-4 paragraphs.]

[Embedded reader prompt or interaction cue, e.g.:]
> **Your turn**: [Instruction for what to do]

[Micro-insight or "notice this" moment]

---

### Step 2: [Title]

[Narrative prose...]

> **Your turn**: [Instruction]

[Micro-insight]

---

### Step 3: [Title]

[Narrative prose...]

> **Your turn**: [Instruction]

[Micro-insight]
```

**Tone Guidelines**:
- Futuristic but human
- Precise, not cheesy
- Use metaphor sparingly (one per concept)
- Explain jargon immediately after introducing it
- Address the reader directly ("you'll notice...", "your choice here...")

---

### Section 10: Working Scene Prototype

**Purpose**: Provide a single-file, self-contained code demo for one scene.

**Requirements**:
- Renders a simple digital twin (SVG)
- Has 2-3 controls (slider/toggle/drag)
- Updates state
- Updates visualization
- Outputs "current configuration" summary
- Includes reset button
- Has accessibility notes in comments
- **No external libraries, no network calls**

**Template**:
```markdown
## 10. Working Scene Prototype

### Scene: [Name]

**File**: `prototype-[scene-name].html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Scene Name] - Prototype</title>
  <style>
    /* Styles here */
  </style>
</head>
<body>
  <!-- SVG digital twin -->
  <svg id="twin" viewBox="0 0 400 300">
    <!-- Parts here -->
  </svg>
  
  <!-- Controls -->
  <div class="controls">
    <!-- Sliders, toggles, etc. -->
  </div>
  
  <!-- Configuration summary -->
  <div id="summary"></div>
  
  <!-- Reset button -->
  <button id="reset">Reset</button>
  
  <script>
    // State
    const state = { /* initial state */ };
    
    // Render function
    function render() { /* update SVG from state */ }
    
    // Event handlers
    // ...
    
    // Accessibility: keyboard support
    // ...
    
    // Initial render
    render();
  </script>
</body>
</html>
```
```

---

### Section 11: Esy Fit Notes

**Purpose**: Explain how this becomes a repeatable authoring workflow.

**Template**:
```markdown
## 11. Esy Fit Notes

### Authoring Workflow

1. **Subject Selection**: Choose a build subject with clear part choices and tradeoffs
2. **Research Phase**: Gather technical specs, formulas, component data
3. **Spec Construction**: Fill out this 12-section template
4. **Prototype Scene**: Build one working scene to validate interaction model
5. **Full Production**: Implement all scenes using established patterns
6. **Audit**: State integrity, accessibility, simulation accuracy

### AI vs. Human Division

| Task | AI-Generated | Human-Refined |
|------|--------------|---------------|
| Technical research | ✅ | Review for accuracy |
| State model schema | ✅ | Validate edge cases |
| Simulation formulas | ✅ | Verify against real-world |
| Scene templates | ✅ | Polish interactions |
| Essay prose | ✅ | Voice and tone editing |
| SVG artwork | Partial | Final visual polish |
| Accessibility | ✅ | Real-device testing |

### Maintainability

- **Scene templates** are reusable across process essays
- **State model patterns** (parts, config, connections, metrics) are consistent
- **Simulation logic** is isolated in `lib/simulation.ts` for easy updates
- **Fallbacks** ensure essays remain functional if JS evolves

### Scaling Considerations

- Extract common scene components to `src/components/process-essay/`
- Create a scene template registry for authoring tools
- Consider CMS integration for non-technical authors
```

---

### Section 12: Extensions

**Purpose**: List ambitious future features that respect narrative-first design.

**Template**:
```markdown
## 12. Extensions

### Near-Term (Next 2 Essays)

1. **[Extension 1]**: [Description]
2. **[Extension 2]**: [Description]

### Medium-Term (Format Maturity)

3. **[Extension 3]**: [Description]
4. **[Extension 4]**: [Description]
5. **[Extension 5]**: [Description]

### Long-Term (Platform Evolution)

6. **[Extension 6]**: [Description]
7. **[Extension 7]**: [Description]
8. **[Extension 8]**: [Description]
```

**Example Extensions**:
- AR mode (view digital twin in physical space)
- Collaborative builds (multiple readers configuring together)
- Adaptive tutoring (adjust difficulty based on reader choices)
- Physical kit integration (order real components matching digital config)
- Failure simulation (what happens if you chose wrong?)
- Export to CAD (download 3D model of your configuration)
- Challenge mode (optimize for a specific metric)
- Community gallery (share and compare configurations)

---

## Quality Checklist

Before marking a Process Essay spec complete:

### Section Completeness
- [ ] Section 1: Concept paragraph captures core promise
- [ ] Section 2: 6-10 measurable learning objectives
- [ ] Section 3: 8-12 steps with all fields (narrative, interaction, state, viz, insight)
- [ ] Section 4: 6+ scene templates with all fields
- [ ] Section 5: State model with schema + example instance
- [ ] Section 6: Simulation model with formulas + pseudocode
- [ ] Section 7: Visual system spec with rendering states
- [ ] Section 8: Implementation architecture with file structure
- [ ] Section 9: Essay text for steps 1-3
- [ ] Section 10: Working prototype code (self-contained)
- [ ] Section 11: Esy fit notes with AI/human division
- [ ] Section 12: 5-8 extensions

### Quality Standards
- [ ] No vague adjectives (translate "cool" into specifics)
- [ ] All formulas are real (not made up)
- [ ] State model covers all reader choices
- [ ] Simulation logic produces meaningful variation
- [ ] Prototype actually runs in browser
- [ ] Accessibility addressed throughout
- [ ] Fallbacks specified for all scenes

---

## Invocation

To create a Process Essay spec, invoke the Interactive Experience Architect:

```
Using @agents/specialists/interactive-experience-architect.md, create a 
complete 12-section specification for a Programmatic Process Essay:

Subject: [build subject]
Intake Document: [reference to intake]

Follow the SKILL.md template at @skills/process-essay-invocation/SKILL.md
```

---

## Last Updated
December 2025

---

*This skill defines the specification template for Programmatic Process Essays—Esy's format for stateful, interactive assembly experiences. Unlike standard visual essays (narrative-first with scroll reveals), process essays are assembly-first with persistent reader agency. The 12-section template ensures comprehensive coverage of concept, learning objectives, storyboard, scene templates, state model, simulation logic, visual system, implementation architecture, essay text, working prototype, authoring workflow, and future extensions.*









