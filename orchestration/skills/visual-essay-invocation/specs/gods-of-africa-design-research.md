# Design Research Report: Gods of Africa

> **Project**: Gods of Africa — A Journey from Light to Terror
> **Date**: December 12, 2025
> **Phase**: 0 (Design Research — MANDATORY)

---

## Visual Archaeology Findings

### Primary Materials of African Sacred Art

| Material | Traditions | Visual Character | Design Application |
|----------|-----------|------------------|-------------------|
| **Bronze/Brass** | Yoruba (Benin), Fon | Warm metallic sheen, patina, gravity | Gold/bronze accent colors, reflective effects |
| **Wood** | All traditions | Carved texture, warm browns, organic forms | Background textures, organic transitions |
| **Gold** | Akan/Ashanti | Pure radiance, royal, precious | Divine light, creator god sections |
| **Terracotta** | Akan, Nok | Earth-red, memorial, ancestral | Mortality chapters, grounding |
| **Beadwork** | Zulu, Yoruba | Intricate patterns, color communication | Decorative borders, progress bar nodes |
| **Textile/Cloth** | Fon (appliqué), Akan (Kente) | Layered, storytelling through pattern | Section backgrounds, transition textures |
| **Stone** | Egyptian | Monumental, eternal, carved | Judgment chapter, permanence |
| **Papyrus** | Egyptian | Ancient, documentary, amber/cream | Egyptian sections, aged texture |

### Historical Color Associations

| Tradition | Primary Colors | Meaning | Hex Values |
|-----------|---------------|---------|------------|
| **Yoruba** | Indigo, white, red | Royalty, purity, power | `#2C3E6E`, `#F5F5F5`, `#8B0000` |
| **Akan** | Gold, black, green | Divine, contrast, forest | `#D4AF37`, `#1A1A1A`, `#2D5A27` |
| **Fon/Dahomey** | Deep red, brass, black | Blood/sacrifice, divine metal, mystery | `#722F37`, `#B8860B`, `#0D0D0D` |
| **Egyptian** | Gold, lapis, black | Solar, sacred, underworld | `#FFD700`, `#1E3A5F`, `#0A0A0B` |
| **Zulu** | Earth ochre, white, red | Ground, purity, life | `#CC7722`, `#FFFFFF`, `#A52A2A` |
| **Terror** | Cold blue-black, void | Fear, absence of warmth | `#0D1B2A`, `#000000` |

### Recurring Visual Motifs

1. **The Serpent** — Creation (Aido Hwedo), chaos (Apophis), water (Mami Wata)
2. **The Eye** — Divine sight, judgment, terror (Popobawa's single eye)
3. **Concentric Circles** — Akan symbols, cosmic order, spider webs
4. **Vertical Lines** — Rain, divine descent, journey from sky to earth
5. **The Threshold/Doorway** — Legba, Eshu, crossroads, transition
6. **Fire/Flame** — Living tradition, warmth fading to darkness

### Era-Specific Aesthetics

| Era/Phase | Visual Character | Processing | Mood |
|-----------|------------------|------------|------|
| **Creation** | Luminous, formless, cosmic | Soft bloom, golden warmth | Wonder |
| **Order** | Structured, sculptural, grounded | Clear, rich saturation | Power |
| **Trickster** | Shifting, dappled, playful | Mixed lighting, movement | Unease |
| **Threshold** | Dimming, amber, weight | Vignetting, shadows | Dread |
| **Terror** | Cold, isolated, void | Desaturated, high contrast | Fear |

---

## Cultural & Brand Analysis

### Emotional/Cultural Associations

- **Africa as source**: Primal, ancient, origin of humanity
- **Sacred art as living**: Not museum artifacts—living tradition
- **Mythology as sophisticated**: Equal to Greek, Norse, Hindu
- **Terror as real**: These fears are current, not historical
- **Diversity as essential**: No single "African" aesthetic

### Existing Visual Treatments (Research)

| Source | Treatment | What Works | What to Avoid |
|--------|-----------|------------|---------------|
| British Museum | Clinical, documentary | Clean photography of objects | Cold institutional feel |
| Afrofuturism | Bold, sci-fi, contemporary | Energy, modernity | Anachronistic for tradition |
| Documentary films | Warm, humanizing | Real places, real people | Anthropological distance |
| **Our approach** | **Cinematic, immersive, journey** | Transform, not document | Never clinical or distant |

### Authenticity Markers

✅ **Authentic feels like:**
- Museum-quality object photography
- Dramatic lighting that honors the objects
- Regional distinction (Yoruba ≠ Zulu)
- Warm-to-cold journey matching content
- Sacred objects treated with gravity

❌ **Inauthentic would be:**
- Generic "African" pattern overlays
- Cartoon/simplified deity representations
- Stock photography of "Africa"
- Same visual treatment for all traditions
- Terror as exploitation, not exploration

---

## Proposed Color Palette

### Primary Palette

| Role | Color | Hex | Derived From |
|------|-------|-----|--------------|
| **Creation Gold** | Divine light | `#D4AF37` | Akan goldweights, Ra's sun |
| **Yoruba Indigo** | Tradition, depth | `#2C3E6E` | Adire cloth, royalty |
| **Void Black** | Background, terror | `#0A0A0B` | Absence, the unknown |
| **Flame Amber** | Transition, warmth fading | `#CC7722` | Firelight, ochre |
| **Blood Ochre** | Earth, mortality | `#8B4513` | Terracotta, Zulu earth |
| **Terror Cold** | Final act | `#0D1B2A` | Night, cold absence |

### Semantic Colors

| Usage | Color | Hex | Connection |
|-------|-------|-----|------------|
| Divine/Creator | Golden | `#FFD700` | Ra, Nyame, light |
| Trickster | Amber/Red | `#F5A623` | Eshu's duality |
| Death | Dark Gray | `#4A4A4A` | Owuo, transition |
| Terror | Near-black | `#0D0D0D` | Apophis, void |
| Living Tradition | Warm Flame | `#FF6B35` | Fire still burning |

### Gradient Journey

```css
/* The essay's visual journey */
--gradient-creation: linear-gradient(135deg, #FFD700 0%, #D4AF37 100%);
--gradient-order: linear-gradient(135deg, #2C3E6E 0%, #1A1A2E 100%);
--gradient-trickster: linear-gradient(135deg, #F5A623 0%, #8B4513 100%);
--gradient-threshold: linear-gradient(135deg, #4A4A4A 0%, #1A1A1A 100%);
--gradient-terror: linear-gradient(135deg, #0D1B2A 0%, #000000 100%);
```

---

## Typography Stack

### Display/Headlines: Cinzel

**Why**: Carved, monumental, eternal—evokes temple inscriptions and bronze casting. Not generic serif; has specific weight and antiquity.

```css
--font-display: 'Cinzel', serif;
--font-display-weight: 700;
```

### Body: Source Serif Pro

**Why**: Readable warmth, narrative-friendly. Feels like quality editorial, invites long reading. Not cold or technical.

```css
--font-body: 'Source Serif Pro', serif;
--font-body-weight: 400;
```

### Divine Names: Cinzel Decorative

**Why**: When naming gods (OLODUMARE, ANANSI), the extra gravity of decorative elements honors the sacred. Used sparingly.

```css
--font-divine: 'Cinzel Decorative', serif;
--font-divine-weight: 700;
--font-divine-tracking: 0.1em;
```

### UI/Functional: Inter

**Why**: Clean, functional, disappears. For captions, navigation, source links. Never competes with content.

```css
--font-ui: 'Inter', sans-serif;
--font-ui-weight: 400;
```

---

## Animation Philosophy

### Overall Tempo: Ceremonial → Creeping

| Phase | Tempo | Animation Style | Subject Connection |
|-------|-------|-----------------|-------------------|
| Creation | Slow, reverent | Soft fades, gentle reveals | Dawn, first light |
| Order | Measured, powerful | Confident slides, presence | Divine authority |
| Trickster | Quickening, shifting | Playful, unpredictable | Eshu's chaos |
| Threshold | Slowing, weighted | Heavy, deliberate | Approaching death |
| Terror | Creeping, sudden | Slow reveals with sudden accents | Prey and predator |

### Reveal Style: The Manifestation

Primary reveal pattern: Elements coalesce from particles/light into form. This mirrors:
- Divine creation (formless → form)
- Sacred art (material → meaning)
- Story journey (unknown → known → feared)

```css
.manifest-in {
  opacity: 0;
  filter: blur(8px);
  transform: scale(0.95);
  transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.manifest-in.visible {
  opacity: 1;
  filter: blur(0);
  transform: scale(1);
}
```

### Parallax Intensity: Moderate → Minimal

- Early chapters: Moderate parallax (depth, wonder)
- Middle chapters: Reduced parallax (grounding)
- Terror chapters: Minimal parallax (claustrophobia, no escape)

### Special Effects

| Effect | Usage | Subject Connection |
|--------|-------|-------------------|
| **Golden particle dust** | Creation chapters | Divine light/ashe |
| **Subtle smoke/mist** | Threshold chapters | Boundary between worlds |
| **Creeping shadow** | Terror chapters | Approaching danger |
| **Single eye glow** | Popobawa chapter | The watcher |
| **Flame flicker** | Epilogue | Living tradition |

---

## Visual Motifs

### Progress Bar: "The Light Fades"

A vertical bar that transforms as the reader journeys from wonder to terror.

```
START: Bright golden glow (creation)
  │
  ▼ Color shifts with scroll
  │
  │ Gold → Amber → Red → Gray → Cold Blue → Near-Black
  │
END: Dying ember in darkness (terror)
```

**Implementation:**
- 4px vertical bar, left edge
- CSS gradient shift based on scroll position
- Chapter markers as small horizontal ticks
- Current position: brighter node
- Terror chapters: subtle flicker effect

### Section Transitions

| Transition | Between | Visual |
|------------|---------|--------|
| **Golden Dissolve** | Prologue → Creators | Warm fade |
| **Color Shift** | Between traditions | Palette crossfade |
| **Shadow Creep** | Order → Tricksters | Edges darken |
| **Descending** | Tricksters → Death | Vertical movement, weight |
| **Void Consume** | Death → Terror | Darkness eating edges |

### Decorative Elements

| Element | Derived From | Usage |
|---------|--------------|-------|
| Gye Nyame symbol | Akan tradition | Chapter markers |
| Serpent line | Aido Hwedo | Section dividers |
| Concentric circles | Akan goldweights | Loading states |
| Single vertical line | Rain, divine descent | Block quotes |
| Eye motif | Terror entities | Terror chapter headers |

---

## Differentiation Check

### How This Differs from Other Esy Scrollytelling

| Aspect | This Essay | Previous Essays |
|--------|------------|-----------------|
| **Color Journey** | Warm → Cold (narrative arc) | Static palettes |
| **Progress Bar** | Transforming (light fades) | Standard fill |
| **Typography** | Cinzel for sacred gravity | Various |
| **Animation** | Ceremonial → creeping | Consistent tempo |
| **Photo Treatment** | Museum objects as characters | Documentary |
| **Cultural Distinction** | 6 distinct visual sub-systems | Unified style |

### What Makes This Design Unmistakably "African Mythology"

1. **The Gold-to-Void Journey** — The essay's color temperature shift mirrors the content arc
2. **Sacred Objects as Characters** — Masks and sculptures photographed as divine presences
3. **Regional Visual Languages** — Each tradition has distinct processing
4. **The Creeping Terror** — Final act uses horror visual language (cold, isolated, claustrophobic)
5. **Living Tradition Epilogue** — Ends with flame, not monument

### Anti-Pattern Avoidance

❌ **Banned for this essay:**
- Generic "tribal pattern" overlays
- Sepia/vintage processing for all sections
- Same warm palette throughout
- Stock African landscape photography
- Cute/friendly deity illustrations
- Jump scares in terror sections (earn the dread)

---

## Mobile-First Considerations

### Touch Targets
- Divine name reveals: 48px minimum
- Chapter navigation: Bottom-aligned, thumb-reachable
- Skip controls: Bottom-right, 44px+

### Typography Scale (Mobile)
```css
/* Mobile base */
--font-size-hero: 2.5rem;
--font-size-chapter: 1.75rem;
--font-size-body: 18px;
--line-height: 1.65;

/* Desktop enhancement */
@media (min-width: 768px) {
  --font-size-hero: 4rem;
  --font-size-chapter: 2.5rem;
  --font-size-body: 20px;
}
```

### Parallax Reduction
- Mobile: 2 layers maximum (performance)
- Reduce parallax intensity by 50% on mobile
- Terror sections: No parallax (intentional claustrophobia)

### Safe Areas
- Respect notch (iPhone)
- Account for home indicator
- Theatre Bar integration

---

## Unique Interaction Mechanics (Required 2+)

### 1. The Light Fades Progress Bar
**Never used before in Esy scrollytelling.**

A progress bar that doesn't just fill—it transforms. Color temperature shifts from warm gold to cold void as the reader progresses through the terror arc.

### 2. The Creeping Reveal
**Never used before.**

For terror chapters: Instead of content fading in from below, shadows creep in from the edges, *revealing* content that was always there but hidden. The reader realizes they've been in darkness all along.

### 3. Regional Color Transitions
**Novel implementation.**

As the reader moves between traditions (Yoruba → Akan → Egyptian → Zulu), the entire color palette subtly shifts—not as a jarring transition but as a cross-fade acknowledging the change in cultural context.

---

## Forcing Question Answer

> "What interactive element in this story could ONLY exist in a story about African mythology's journey from light to terror?"

**Answer**: The Light Fades progress bar and the terror chapter shadow reveals.

Only a story about the transition from divine creation to nightmare would need a progress indicator that literally darkens and cools as you read. Only a story about hidden terrors would reveal content by having shadows creep away rather than content fade in.

---

## Design Research Report: APPROVED ✅

This design system is:
- ✅ Derived from subject matter (African sacred art materials and traditions)
- ✅ Unique to this essay (color journey, transforming progress bar)
- ✅ Differentiated from all previous Esy scrollytelling
- ✅ Respectful of living traditions
- ✅ Mobile-first considered
- ✅ Terror earned, not exploited

**Ready to proceed to Story Architecture and Implementation.**

---

*Design Research Complete. Visual identity derived from African sacred art traditions, regional distinctions honored, terror arc visualized through progressive desaturation and temperature shift.*

