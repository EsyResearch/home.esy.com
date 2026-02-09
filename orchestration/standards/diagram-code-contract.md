# Diagram-Code Contract Standard

> **Purpose:** Prevent diagram-code mismatches in visualizations — where visual annotations (labels, arrows, text) contradict the code behavior (math, animation direction, scale).

## The Problem

Visualizations have two layers that must agree:

| Layer | Example | Machine-Readable? |
|---|---|---|
| **Annotations** — labels, arrows, text | `"wave direction →"` | ✅ String in code |
| **Behavior** — math driving animation | `sin(kx + ωt)` propagates left | ✅ Expression in code |

No linter, type checker, or screenshot catches a mismatch between these layers. A human spots it by watching. An automated system can catch it by **reading both layers and checking logical consistency**.

## The Contract

Every visualization function (`D1`, `D2`, etc.) in a visual essay client component **must** include a `@diagram-contract` JSDoc block declaring its invariants.

### Format

```javascript
/**
 * @diagram-contract
 * @diagram D1-ocean-wave-anatomy
 * @domain wave-mechanics
 *
 * @invariant PROPAGATION_DIRECTION +x
 *   arrow_label: "wave direction" points +x
 *   phase_formula: sin(kx - ωt) for +x propagation
 *   validation: phase increments → crest x-position increases between frames
 *
 * @invariant AMPLITUDE_SYMMETRY
 *   crest_y: midY - amplitude (above equilibrium)
 *   trough_y: midY + amplitude (below equilibrium)
 *   label: "amplitude" arrow spans equilibrium → crest
 *
 * @invariant WAVELENGTH_SPAN
 *   label: "λ (wavelength)" bracket spans exactly one full cycle
 *   code: bracket x1=0, x2=wl (one wavelength constant)
 *
 * @invariant LABEL_POSITION_ACCURACY
 *   "crest" label placed at sin() maximum
 *   "trough" label placed at sin() minimum
 *   "equilibrium" label placed at midY (y = 0 displacement)
 */
```

### Required Fields

| Field | Description |
|---|---|
| `@diagram` | Matches diagram ID (e.g., `D1`, `D2`) and descriptive name |
| `@domain` | Domain for selecting the right verification rules |
| `@invariant` | One per assertion. Each has a name, plain-English description, and validation criteria |

### Supported Domains

| Domain | Common Invariants |
|---|---|
| `wave-mechanics` | Propagation direction, phase formula sign, amplitude symmetry |
| `particle-dynamics` | Force direction, momentum conservation, energy conservation |
| `electromagnetism` | Field direction, E⊥B, right-hand rule compliance |
| `thermodynamics` | Energy flow direction (hot→cold), entropy increase |
| `quantum-mechanics` | Probability normalization, wavefunction collapse behavior |
| `relativity` | Light cone orientation, time dilation direction |
| `fluid-dynamics` | Flow direction, pressure gradient direction |
| `economics` | Trend direction, axis label accuracy, scale consistency |
| `demographics` | Population direction, bar/chart value accuracy |
| `chronology` | Date order, timeline direction |
| `general` | Label-to-value consistency |

## Verification Rules

### Direction Consistency

For any `PROPAGATION_DIRECTION` invariant:

1. **Arrow check:** Find all SVG `<line>` + `<polygon>` combos or CSS arrows near a text label containing direction language ("direction", "flow", "propagation"). Verify the arrow's geometric direction matches the declared direction.

2. **Phase formula check:** For sinusoidal animations:
   - `sin(kx - ωt)` or `sin(kx - phase)` where phase increases → propagates in **+x**
   - `sin(kx + ωt)` or `sin(kx + phase)` where phase increases → propagates in **-x**
   - Verify the formula sign matches the declared direction.

3. **Frame-to-frame check (runtime):** Sample crest position at two consecutive phases. Verify the crest moves in the declared direction.

### Amplitude & Scale Consistency

1. **Label-to-code check:** If a label says "amplitude", verify the annotation geometrically spans from equilibrium to peak (not peak-to-peak, which would be "peak-to-peak amplitude" or "2A").

2. **Symmetry check:** Crest displacement above equilibrium should equal trough displacement below (for symmetric waves).

### Label Position Accuracy

1. **Crest labels** must be positioned at or near the y-coordinate of the wave's maximum.
2. **Trough labels** must be positioned at or near the y-coordinate of the wave's minimum.
3. **Node labels** (standing waves) must be at points of zero displacement.
4. **Antinode labels** must be at points of maximum displacement.

## Integration with Pipeline

### Gate: G5.3 — Diagram-Code Reconciliation

Runs after G5.2 (Design Fidelity) and before G5.5 (Bibliography).

**Agent:** `diagram-code-reconciliation-auditor`

**Process:**
1. Parse all `@diagram-contract` blocks from the client component
2. For each `@invariant`, locate the corresponding code
3. Apply domain-specific verification rules
4. Produce `DIAGRAM-CODE-RECONCILIATION.md` with per-invariant PASS/FAIL

**Blocking:** Yes. A FAIL on any invariant blocks the pipeline.

### Runtime Dev Assertions (Optional Safety Net)

For animated visualizations, embed lightweight runtime assertions that fire once in development:

```javascript
if (process.env.NODE_ENV === 'development') {
  // Verify propagation direction matches arrow
  requestAnimationFrame(() => {
    const crestX_t0 = findCrestX(phase);
    requestAnimationFrame(() => {
      const crestX_t1 = findCrestX(phase);
      console.assert(
        crestX_t1 > crestX_t0,
        `[D1] Diagram-code contract violation: wave propagates -x but arrow indicates +x`
      );
    });
  });
}
```

These are a **safety net**, not a replacement for the gate audit.

## Common Failure Patterns

| Pattern | Root Cause | Contract Catches It |
|---|---|---|
| Arrow points right, wave moves left | `sin(kx + ωt)` vs `sin(kx - ωt)` | ✅ `PROPAGATION_DIRECTION` invariant |
| "Amplitude" label spans peak-to-peak | Label misplaced or measures 2A not A | ✅ `AMPLITUDE_SYMMETRY` invariant |
| "Crest" label on the trough | Label y-coordinate near minimum not maximum | ✅ `LABEL_POSITION_ACCURACY` invariant |
| Node/antinode labels swapped | Text at wrong positions in standing wave | ✅ `LABEL_POSITION_ACCURACY` invariant |
| Compression label on rarefaction | Phase offset error in longitudinal wave | ✅ Domain-specific longitudinal check |
| Probability density goes negative | Missing `|ψ|²` (forgot absolute square) | ✅ `quantum-mechanics` domain rule |
| "Growth" arrow on declining trend | Direction-value mismatch | ✅ `PROPAGATION_DIRECTION` invariant |
| Timeline dates out of order | Chronological inconsistency | ✅ `chronology` domain rule |

## Accountability

Every visualization in every visual essay **must** have a `@diagram-contract`. The G5.3 gate will reject any client component that contains a visualization function without a corresponding contract block.
