---
status: DRAFT
topic: Gods of Africa — African Mythology
generated: 2025-12-12
visual_treatment: mythological
chapters: 12
figures: 20
scroll_lock_sequences: 14
lens_applied: mythology
estimated_read_time: 25-30 minutes
research_package: research/african-mythology/
---

# Visual Essay Invocation: Gods of Africa

## "Gods of Africa: A Journey from Light to Terror"
### The Divine Pantheons of a Continent, from Creation to Nightmare

---

# [Layer 1: Strategic Foundation]

## Executive Brief

Create an immersive, photography-driven visual essay that journeys through African mythology across the continent's diverse traditions—from the luminous creator deities who shaped the world, through the clever tricksters who teach through chaos, to the terrifying entities that haunt the edges of firelight. This experience uses museum-quality photography of masks, sculptures, and sacred art combined with atmospheric landscape imagery to bring these gods to life.

The narrative traverses five acts, beginning in wonder and concluding in genuine terror. We meet Olodumare, the unreachable Yoruba source of all existence. We follow Anansi the Spider as he tricks his way to owning all stories. We stand with Ra as he battles the chaos serpent Apophis each night. And we descend into darkness where Ammit waits to devour unworthy souls, where the Tokoloshe creeps toward beds raised on bricks, where Popobawa transforms from human to bat-winged nightmare.

This essay matters because African mythology rivals any world tradition in sophistication, terror, and beauty—yet remains vastly underexplored. These are not museum curiosities but living beliefs; millions practice traditions descended from these narratives today. The reader who completes this journey will understand that "African mythology" encompasses dozens of distinct theological systems, will carry unforgettable characters and stories, and will never again sleep quite as soundly without checking what lurks in the shadows.

The transformation: From ignorance to wonder to knowledge to appropriate fear.

## Visual Treatment Philosophy

### Mythological Treatment: Photography of Sacred Art

**Primary Visual Source:** Museum photography of African sacred objects
- Masks, sculptures, bronzes, textiles
- Photographed dramatically with museum-quality lighting
- Treated as the *faces of the gods themselves*

**Secondary Visual Source:** African landscape photography
- Atmospheric, establishing shots by region
- Golden hour for creation chapters
- Blue hour to darkness for terror chapters

**Tertiary Visual Source:** Selective illustration
- Only for cosmic/abstract sequences (Apophis as void, Ammit's realm)
- Must reference traditional art styles, not Western fantasy
- Clearly distinguished from historical sources

### Photography Across Traditions

**Yoruba (Nigeria/Benin):**
- Benin Bronzes, shrine sculptures, beaded regalia
- Warm, rich processing; royal indigo and gold accents
- Sources: British Museum, Nigerian National Museum

**Akan/Ashanti (Ghana):**
- Goldweights, Adinkra symbols, funeral terracottas
- High contrast, gold-on-black emphasis
- Sources: British Museum, Fowler Museum

**Egyptian (North Africa):**
- Temple reliefs, papyri, statuary
- Warm amber/gold with lapis accents
- Sources: British Museum, Egyptian Museum Cairo

**Zulu (Southern Africa):**
- Beadwork, shields, natural materials
- Earth tones, high grain for texture
- Sources: Ethnographic documentation, museum collections

**Terror Chapter Treatment:**
- Progressive desaturation (100% → 40%)
- Cool color temperature shift
- High contrast, deep shadows
- Isolated subjects, no warm tones

---

# [Layer 2: Technical Systems]

## Scroll-Lock Animation System

**Critical Implementation:** Viewport locks during key mythological moments; scroll input drives revelation and transformation.

**Required Behavior:**
- Scroll into designated zone triggers viewport lock
- Continued scroll controls animation/revelation progress
- Visual progress indicator (themed) shows sequence completion
- Upon 100% completion, lock releases with smooth easing (800ms)
- Skip affordance: Small "skip" text, bottom right, appears after 2s of lock

**Scroll-Lock Techniques for This Essay:**

| Technique | Description | Used In |
|-----------|-------------|---------|
| **The Manifestation** | Formless light/particles coalesce into divine form | Hero, Creator chapters |
| **The Darshan** | Slow zoom into deity's face, eyes "awaken" | Figure introductions |
| **The Scale Tip** | Weighing scales balance, then tip | Judgment chapter |
| **The Descent** | Vertical journey downward into darkness | Terror transition |
| **The Creeping** | Slow horizontal reveal of approaching horror | Tokoloshe, terror |
| **The Transformation** | One form morphs into another | Apophis battle, Popobawa |

## Parallax Depth System

```
- Layer 0 (Background): Atmospheric gradients, distant landscapes
  Speed: 0.3x scroll | Subtle blur | Warm → Cool shift across essay

- Layer 1 (Mid-ground): Secondary art objects, architectural elements
  Speed: 0.6x scroll | Supporting context

- Layer 2 (Subject): Primary mask/sculpture/figure
  Speed: 1.0x scroll | Crisp, dominant

- Layer 3 (Overlay): Text, captions, divine names
  Speed: 1.2x scroll | Subtle forward motion

- Layer 4 (Ambient): Particle effects (dust motes, fireflies, darkness tendrils)
  Speed: Variable | Atmosphere builders
```

## Progress Bar Design

### Concept: "The Light Fades"

A vertical bar on the left edge that transforms as the reader journeys from wonder to terror.

**Design:**
- Position: Left edge, full height, 4px width
- Initial state: Bright golden glow
- Progression: Gold → amber → dim red → cold blue → near-black

**Visual Behavior:**
- Filled portion shows completed content
- Current position: Brighter node
- Chapter markers: Small horizontal ticks with hover labels
- Terror chapters: Bar flickers slightly, as if flame dying

**Chapter Mapping:**
```
|  100% ─ [Eye icon] Epilogue
|   92% ─ 🦇 Popobawa
|   84% ─ 👁️ Tokoloshe  
|   76% ─ 🌳 Forest Horrors
|   68% ─ 🐍 The Chaos Serpent
|   60% ─ ⚖️ The Weighing
|   52% ─ 💀 Death Arrives
|   44% ─ 🔀 Eshu's Crossroads
|   36% ─ 🕷️ Anansi's Stories
|   28% ─ ⚡ The Order Keepers
|   20% ─ ☀️ The Creators
|   10% ─ 🌍 The Continent
|    0% ─ ✨ Hero
```

---

# [Layer 3: Hero Architecture]

## Hero Section Specification

### Visual Concept: "From Light Into Darkness"

The hero presents a luminous creation moment that gradually reveals the essay's journey will end in darkness. The reader understands immediately: this is beautiful, but something waits at the end.

**Scroll-Lock Hero Sequence:**

- **0-15% scroll:** 
  Black void. Single point of golden light in center. Text fades in:
  *"In the beginning, there was light..."*

- **15-35% scroll:**
  Light expands, particles begin forming shapes. Hints of divine faces in the light. African continent outline traces itself in gold.
  *"...and the gods shaped the world."*

- **35-55% scroll:**
  Multiple traditions appear as light sources across the continent map—Nigeria glows, Ghana glows, Egypt glows, South Africa glows. Music of creation.
  *"Every people had their creators..."*

- **55-75% scroll:**
  The lights begin to dim at the edges. Shadows creep in from the corners. The warmth becomes amber.
  *"...their tricksters..."*

- **75-90% scroll:**
  Most lights extinguished. Single dim glow remains. Shadows dominate. A hint of teeth, of eyes, of something waiting.
  *"...and their terrors."*

- **90-100% scroll:**
  Darkness recedes slightly to reveal title card. One golden eye peers from the shadow.

**Title Card:**
```
GODS OF AFRICA
A Journey from Light to Terror

[Scroll to begin ↓]
```

---

# [Layer 4: Chapter Schema]

---

## Prologue: The Continent of Gods
*Orientation*

**Metaphor:** "Africa is not one story, but a library"

**Central Visuals:**
- Animated map showing distinct mythological regions
- Montage of masks from different traditions
- Geographic diversity (forest, desert, savanna, coast)

**Content Focus:**
Establish that Africa contains 54 nations, thousands of ethnic groups, and dozens of major mythological systems. "African mythology" is as diverse as "European mythology." We will journey through six traditions, but they represent a fraction of the continent's spiritual wealth.

Prepare the reader for the arc: we begin with creators, pass through tricksters, and descend into terror.

**Scroll-Lock Sequence: "The Map Reveals"**

- **0-25% scroll:** African continent outline draws itself
- **25-50% scroll:** Regions illuminate: Nigeria (Yoruba), Ghana (Akan), Benin (Fon), Egypt, South Africa, Zanzibar
- **50-75% scroll:** Lines connect to the essay's journey path
- **75-100% scroll:** Map fades, first tradition region (Yoruba/Nigeria) expands

---

## ACT I: THE CREATORS

---

### Chapter 1: Where Light Began
*The Supreme Beings*

**Metaphor:** "The sources we cannot see"

**Central Visuals:**
- Nigerian sky at dawn (photography)
- Abstract light/cloud imagery
- Shrine architecture in white cloth
- Akan Gye Nyame symbol in gold

**Content Focus:**
Introduce the creator gods who stand at the source: Olodumare (Yoruba), Nyame (Akan), Mawu-Lisa (Fon), Ra (Egyptian). Establish that these supreme beings are often distant—they create but do not directly interfere. They work through intermediaries.

Focus on Olodumare's unreachable transcendence and Nyame's role as holder of all stories (setting up Anansi's quest later).

**Key Figure Profiles:**

**Olodumare** — The Supreme Source
- The formless origin of all existence in Yoruba theology
- Never depicted directly; works through the Orishas
- Represents the unreachable ultimate
- "Olodumare is too high to be bothered with petty affairs of men"
- Visual: Abstract light, white cloth, temple ceiling looking up

**Nyame** — The Sky Father
- Akan supreme deity, holder of all the world's stories
- The Gye Nyame symbol ("Except for God") is ubiquitous in Akan culture
- Will later be tricked by Anansi into releasing the stories
- Visual: Gye Nyame symbol in gold leaf, sky imagery

**Scroll-Lock Sequence: "The Manifestation"**

Divine light coalesces into the suggestion of form without ever fully resolving.

- **0-30% scroll:** Darkness, single point of warm light
- **30-60% scroll:** Light expands, hints of divine presence
- **60-90% scroll:** Form almost visible, magnificence felt
- **90-100% scroll:** Light settles, text reveals: "And so existence began"

**Parallax Treatment:**
Background: Slow-moving cloud/light layers
Subject: Central light manifestation
Ambient: Dust motes catching divine light

---

### Chapter 2: The Shapers
*Creation in Action*

**Metaphor:** "The hands that gave us form"

**Central Visuals:**
- Obatala shrine sculpture in white
- Fon appliqué depicting Mawu-Lisa on Aido Hwedo
- Egyptian Ra/Atum imagery with sun disk
- Clay/creation material textures

**Content Focus:**
The active creators: Obatala (who shapes human bodies from clay), Mawu-Lisa (who rode the rainbow serpent across creation), Ra (who emerged from the primordial waters). These are the gods who got their hands dirty.

Tell the Obatala story: commissioned by Olodumare, he shaped humans from clay—but drank palm wine and created some imperfect. This is why he protects those with disabilities as his special children.

Tell the Mawu-Lisa creation journey on Aido Hwedo, whose coils formed mountains and who now holds up the world.

**Key Figure Profiles:**

**Obatala** — The Sculptor of Humanity
- Tasked by Olodumare to create human bodies
- Shapes humans from clay, breathes life into them
- His drunken creation explains human imperfection with compassion
- Always depicted in pure white; devotees wear only white
- Visual: White-draped Obatala shrine figure

**Mawu-Lisa** — The Dual Creator
- Sun and moon united, male and female balanced
- Rode Aido Hwedo (rainbow serpent) to create the world
- Serpent's excrement became mountains (rich with minerals)
- Visual: Fon appliqué depicting the serpent journey

**Scroll-Lock Sequence: "The Shaping"**

Clay forms into human shape, breath enters.

- **0-25% scroll:** Formless clay
- **25-50% scroll:** Hands appear, begin shaping
- **50-75% scroll:** Human form emerges
- **75-100% scroll:** Eyes open—creation complete

---

## ACT II: THE ORDER KEEPERS

---

### Chapter 3: The Active Gods
*Divine Forces in the World*

**Metaphor:** "The gods who answer when called"

**Central Visuals:**
- Benin Bronze warrior figures
- Lightning over Nigerian landscape
- River Osun photography
- Ogun shrine with iron implements

**Content Focus:**
Unlike the distant creators, these Orishas engage with humanity. Ogun clears paths with his iron machete. Amadioha strikes the guilty with lightning. Oshun heals with her river waters. These are the gods of everyday life—prayed to for specific needs, feared for specific powers.

Focus on Ogun's dual nature: the same iron makes the surgeon's scalpel and the warrior's sword.

**Key Figure Profiles:**

**Ogun** — The Iron Lord
- God of iron, war, labor, and civilization
- Cleared the path for all other Orishas to reach earth
- Patron of blacksmiths, warriors, surgeons—all who work with metal
- "Swearing by Ogun" (kissing iron) is the most binding oath
- Visual: Benin Bronze warrior, iron implements

**Amadioha** — The Thunder's Justice
- Igbo god of thunder and lightning
- Enforces moral order; strikes wrongdoers dead
- Those he kills are left unburied as warning
- Represented as a white ram
- Visual: Lightning photography, storm clouds

**Oshun** — The River's Grace
- Goddess of fresh water, love, fertility, prosperity
- Her river (Osun) cures and blesses
- Taught that feminine power cannot be ignored
- Visual: Brass Oshun figure, golden river light

**Scroll-Lock Sequence: "The Lightning Strikes"**

Amadioha demonstrates divine justice.

- **0-30% scroll:** Peaceful scene, figures below
- **30-50% scroll:** Clouds gather, darkness builds
- **50-70% scroll:** Lightning flash—STRIKE
- **70-100% scroll:** Aftermath; justice delivered

---

## ACT III: THE TRICKSTERS

---

### Chapter 4: The Spider's Web
*Anansi Wins All Stories*

**Metaphor:** "Cleverness defeats strength"

**Central Visuals:**
- Ashanti goldweight spider
- Forest canopy (Ghana)
- The story-box (golden container)
- Captured creatures: python, leopard, hornets, fairy

**Content Focus:**
**FULL STORY: How Anansi Won All the Stories in the World**

Nyame owned all stories, kept in a golden box in the sky. Anansi hungered for them. Nyame named an impossible price: bring me Onini the Python, Osebo the Leopard, the Mmoboro hornets, and Mmoatia the invisible fairy.

One by one, Anansi used trickery:
- The python: tricked by pride into stretching alongside a pole, tied down
- The leopard: fell into a pit, "rescued" into a web
- The hornets: fooled by "rain" into a gourd
- The fairy: stuck to a sap-covered doll

Nyame, astonished, gave Anansi all stories. They became "Anansesem"—Spider Stories.

This is the origin story of storytelling itself.

**Key Figure Profile:**

**Anansi** — The Spider Who Owns All Stories
- Small, clever, uses wit to defeat the powerful
- Hero of the powerless; intelligence over brute force
- His stories traveled to the Caribbean and Americas
- "Wisdom is not in the head of one person"
- Visual: Ashanti goldweight spider, intricate and golden

**Scroll-Lock Sequence: "The Four Captures"**

Four-part sequence showing each capture:

- **0-20% scroll:** Python captured (pride)
- **20-40% scroll:** Leopard captured (rescue)
- **40-60% scroll:** Hornets captured (shelter)
- **60-80% scroll:** Fairy captured (silence)
- **80-100% scroll:** Nyame presents the story-box

---

### Chapter 5: The Crossroads
*Eshu and the Danger of Certainty*

**Metaphor:** "Everything depends on where you stand"

**Central Visuals:**
- Eshu shrine figure with cowrie shells
- Crossroads photography (African)
- The two-colored hat
- Two friends fighting

**Content Focus:**
**FULL STORY: Eshu and the Two Friends**

Eshu heard two friends boast: "Nothing will ever divide us."

He crafted a hat—red on one side, white on the other. He walked between their farms. One friend saw white, one saw red. They fought over the color. Their friendship was destroyed.

Eshu returned, showed both colors. "You were both right. Both wrong. Neither thought to walk to the other side."

The trickster teaches: perspective matters. Certainty is dangerous. The divine tests what we think we know.

**Transition begins here:** Eshu is playful, but his lessons have teeth. From here, the darkness begins.

**Key Figure Profile:**

**Eshu/Elegba** — The Crossroads Keeper
- Messenger between gods and humans
- Trickster who tests morality through chaos
- "Eshu throws a stone today and kills a bird yesterday"
- Red and black: duality, crossroads, threshold
- His offerings come first—ignore him at your peril
- Visual: Cowrie-encrusted Eshu figure, crossroads

**Scroll-Lock Sequence: "The Two-Colored Hat"**

- **0-25% scroll:** Two friends working peacefully
- **25-50% scroll:** Eshu appears, hat visible (show both colors to reader)
- **50-75% scroll:** Friends argue, fight, friendship destroyed
- **75-100% scroll:** Eshu reveals truth; nothing is healed

**Parallax Treatment:**
Eshu moves at different speed than background—otherworldly, separate

---

## ACT IV: THE THRESHOLD

---

### Chapter 6: Death Arrives
*The End That Was Never Meant*

**Metaphor:** "A message delivered too late"

**Central Visuals:**
- Akan funerary terracotta
- South African landscape (veld)
- Chameleon (moving slowly)
- Lizard (darting quickly)

**Content Focus:**
**FULL STORY: How Death Came to Humanity (Zulu Version)**

Unkulunkulu, the Old Old One, loved his humans. He sent the Chameleon with the message: "You shall not die. Shed your skin and become young again."

But chameleons are slow. They pause. They consider.

Unkulunkulu grew impatient. He sent the Lizard with a different message: "You shall die. When you die, you are finished."

The Lizard was fast. It arrived first.

When the Chameleon finally arrived with immortality, it was too late. The people had already accepted death.

And so we die.

Introduce Owuo (Akan personification of death)—not evil, but necessary, inevitable.

**Key Figure Profiles:**

**Owuo** — The Akan Face of Death
- Created by Odomankoma to end what was created
- Depicted as a giant with tusks and a single eye
- Cannot be bargained with, cannot be escaped
- "Death has no house, yet Death is a great worker"
- Visual: Akan funerary terracotta, shadows

**Scroll-Lock Sequence: "The Race"**

- **0-25% scroll:** Chameleon begins slow journey
- **25-50% scroll:** Lizard sent, races past
- **50-75% scroll:** Lizard arrives, delivers death's message
- **75-100% scroll:** Chameleon arrives—too late

**Visual transition:** Colors begin to desaturate. Warmth fades.

---

### Chapter 7: The Weighing of the Heart
*Judgment and the Devourer*

**Metaphor:** "Your heart knows what you did"

**Central Visuals:**
- Papyrus of Ani (weighing scene)
- Anubis guiding souls
- Ma'at's feather
- Ammit crouching beneath the scales

**Content Focus:**
**FULL STORY: The Weighing of the Heart**

You are dead. Anubis guides you through the Duat. You speak denials to forty-two judges. But they are not who decides.

In the center: scales. On one side, the feather of Ma'at. On the other, your heart.

Your heart knows every lie. Every cruelty. Every small betrayal.

Beneath the scales waits Ammit—part crocodile, part lion, part hippopotamus. She does not threaten. She waits.

If your heart outweighs the feather... Ammit devours it. You cease to exist. Not hell—annihilation. Complete erasure from existence.

The scales tip...

**Key Figure Profiles:**

**Anubis** — The Guide of the Dead
- Jackal-headed god of mummification and the afterlife
- Leads souls through the underworld to judgment
- Not evil—a psychopomp, a guide
- Visual: Papyrus depiction, black jackal statuary

**Ammit** — The Devourer of the Unworthy
- Chimera: crocodile head, lion's front, hippo's rear
- Crouches beneath the scales, eternally patient
- Devours hearts heavier than the feather
- "She who waits never tires. She who devours never hungers."
- Visual: Papyrus of Hunefer, Ammit crouching

**Scroll-Lock Sequence: "The Scale Tips"**

- **0-25% scroll:** Heart placed on scale
- **25-50% scroll:** Scales balance... trembling...
- **50-75% scroll:** Ammit's eyes track the movement
- **75-100% scroll:** Scales begin to tip—freeze. Ambiguity maintained.

---

## ACT V: THE DEVOURERS

*[Color desaturation begins: 60% → 40% over remaining chapters]*

---

### Chapter 8: The Chaos Serpent
*Ra's Eternal Battle*

**Metaphor:** "Every sunrise is a victory"

**Central Visuals:**
- Ra in solar barque (papyrus)
- Apophis as colossal serpent (illustration allowed here)
- Battle scenes from tomb paintings
- Dawn light breaking over desert

**Content Focus:**
**FULL STORY: Ra's Nightly Battle with Apophis**

Every evening, the sun dies. Ra boards the night barque and enters the underworld.

In the seventh hour, Apophis waits. He is not a god—he is older. The void before creation. Chaos given coils.

The serpent attacks. The barque shakes. Ra's light flickers. Above, the sleeping world dreams of falling.

Set—the chaos god himself—fights beside Ra. Only chaos can face chaos.

"You are powerless, Apophis. You are cut. You are repelled."

Apophis falls back. The barque sails on.

But Apophis reforms. He always reforms.

Tomorrow night, the same battle.

Forever.

**Key Figure Profile:**

**Apophis/Apep** — The Chaos Serpent
- Not a god but the void before creation given form
- Vast enough to threaten the sun itself
- Battles Ra every night in the underworld
- Can never be permanently destroyed
- Visual: Tomb paintings of serpent threatening barque

**Scroll-Lock Sequence: "The Nightly Battle"**

- **0-20% scroll:** Ra descends into darkness
- **20-40% scroll:** Apophis appears, colossal
- **40-60% scroll:** Battle joined—light vs. void
- **60-80% scroll:** Apophis driven back
- **80-100% scroll:** Dawn breaks—victory, for now

---

### Chapter 9: The Forest Horrors
*Sasabonsam and the Adze*

**Metaphor:** "The woods where human rules don't apply"

**Central Visuals:**
- Deep Ghanaian forest at dusk
- Shadows in trees
- Firefly illumination (beautiful/terrifying)
- Iron teeth (suggestion, not explicit)

**Content Focus:**
The African forest holds terrors.

**Sasabonsam/Asanbosam:** In Ghana's deep forests, something hangs from the cotton trees. Iron teeth. Hook-like feet. It waits for the unwary hunter, the person who wanders too far from the path. It drops. It drinks.

**The Adze:** In Ghana, Togo, and Benin, the Adze appears as a harmless firefly. Beautiful, glowing, gentle. It slips through cracks in your home. Then it transforms. It drinks blood. It possesses. It spreads disease.

The beautiful things in the forest may be the most dangerous.

**Key Figure Profiles:**

**Sasabonsam** — The Forest Vampire
- Hangs from trees by hook-like feet
- Iron teeth that never stop reaching
- Represents the deep forest's real danger
- Visual: Shadowy forest canopy, hanging silhouettes

**Adze** — The Vampiric Firefly
- Transforms from beautiful firefly to blood-drinker
- Slips through any crack
- Can possess victims, turning them into witches
- Visual: Fireflies in darkness, contrast of beauty and horror

**Scroll-Lock Sequence: "The Forest Darkens"**

- **0-30% scroll:** Forest at dusk, beautiful
- **30-60% scroll:** Shadows deepen, something moves
- **60-80% scroll:** Eyes visible in darkness
- **80-100% scroll:** Fireflies appear—beautiful... then one gets close

---

### Chapter 10: The Night Terrors
*Tokoloshe and Popobawa*

**Metaphor:** "Home is not safe"

**Central Visuals:**
- South African bedroom with bed on bricks
- Scratch marks on floor
- Zanzibar at night
- Bat silhouettes, single eye

**Content Focus:**
These terrors invade the safe space.

**FULL STORY: The Tokoloshe and the Raised Beds**

A witch creates a Tokoloshe from a corpse—cuts out eyes, cuts out tongue, performs the rituals. What results is small, hairy, invisible. It creeps. It causes nightmares. Illness. Death.

It cannot reach high.

Throughout Southern Africa, beds are raised on bricks. Not superstition—survival.

In the morning, they find scratch marks on the floor.

**Popobawa:** In Zanzibar, since the 1960s, the Popobawa has caused mass panic. By day, it looks human. By night: bat wings, one eye, violence. It particularly attacks those who deny its existence.

This is not ancient mythology. This is documented modern terror. Mass panic. Contemporary newspaper reports.

The mythology is alive.

**Key Figure Profiles:**

**Tokoloshe** — The Nightmare Dwarf
- Created by witches from corpses
- Small, hairy, hollow-eyed, invisible
- Causes nightmares, illness, death
- "Raise your bed on bricks, or what creeps below will reach you"
- Visual: Raised beds on bricks (documentary), scratch marks

**Popobawa** — The Bat Demon of Zanzibar
- Modern entity, first reported 1960s-70s
- By day human, by night bat-winged, one-eyed
- Attacks skeptics specifically
- Caused documented mass panics (1995, 2000s)
- Visual: Zanzibar night, bat silhouette, single eye

**Scroll-Lock Sequence: "The Creeping"**

- **0-25% scroll:** Bedroom at night, bed on bricks
- **25-50% scroll:** Something enters, low to ground
- **50-75% scroll:** Scratching sounds, approaches bed
- **75-90% scroll:** Cannot reach... this time
- **90-100% scroll:** Morning: scratch marks on floor

---

## Epilogue: The Fires Still Burn
*Living Traditions*

**Metaphor:** "These gods have not died"

**Central Visuals:**
- Contemporary shrine photography
- Modern practitioners
- The diaspora (Vodou, Santería, Candomblé)
- Single candle flame

**Content Focus:**
These are not museum artifacts. Millions practice traditions descended from these narratives today. The Orishas answer prayers in Lagos and New York. Anansi's stories are told in Jamaica and London. Beds in Johannesburg still rest on bricks.

African mythology is not history—it is presence.

The reader leaves with knowledge, with wonder, and with appropriate respect for what waits in the dark.

**Scroll-Lock Sequence: "The Flame Endures"**

- **0-50% scroll:** Darkness, single flame grows
- **50-75% scroll:** Flame reveals contemporary shrine, modern worshippers
- **75-100% scroll:** Flame steadies; text: "The stories continue."

---

# [Layer 5: Design System]

## Color Palette

### Primary Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Void Black** | `#0A0A0B` | Primary background (terror chapters) |
| **Night Indigo** | `#1A1A2E` | Secondary background |
| **Creation Gold** | `#D4AF37` | Divine light, creator gods, accents |
| **Yoruba Indigo** | `#3D5A80` | Yoruba tradition sections |
| **Blood Ochre** | `#8B4513` | Earth, Zulu sections, mortality |
| **Terror Cold** | `#2D3E50` | Terror chapter backgrounds |

### Semantic Colors

| Color | Hex | Meaning |
|-------|-----|---------|
| **Divine Light** | `#FFD700` | Creator gods, majesty |
| **Trickster Amber** | `#F5A623` | Anansi, Eshu, playful danger |
| **Threshold Red** | `#8B0000` | Danger, blood, transition |
| **Death Gray** | `#4A4A4A` | Owuo, mortality, endings |
| **Chaos Void** | `#0D0D0D` | Apophis, ultimate darkness |

### Text Colors

| Element | Color | Opacity |
|---------|-------|---------|
| **Primary Text** | `#F5F5F5` | 90% |
| **Secondary Text** | `#B8B8B8` | 70% |
| **Accent Text** | `#D4AF37` | 100% |
| **Caption Text** | `#888888` | 60% |

## Typography

| Element | Font | Weight | Character |
|---------|------|--------|-----------|
| **Headlines** | Playfair Display | Bold | Timeless, slightly dramatic, story-worthy |
| **Body** | Source Serif Pro | Regular | Readable, warm, narrative-friendly |
| **Divine Names** | Cinzel | Bold | Carved, monumental, sacred |
| **Quotes** | Source Serif Pro | Italic | Distinguished from body |
| **Captions/Data** | Inter | Regular | Clean, functional |

## Era/Tradition Visual Treatments

| Tradition | Processing | Temperature | Saturation |
|-----------|------------|-------------|------------|
| Yoruba | Rich, warm | 3500K | 100% |
| Akan | High contrast | 4000K | 95% |
| Egyptian | Amber/ancient | 3000K | 90% |
| Fon/Dahomey | Deep reds | 3500K | 95% |
| Zulu | Earth tones | 4500K | 85% |
| **Terror** | Desaturated | 6500K | 40-60% |

## Animation Principles

| Element | Duration | Easing |
|---------|----------|--------|
| Scroll-lock zones | 1500-3000px depth | — |
| Photo transitions | 600ms | ease-out |
| Text reveals | 400ms | ease-out |
| Title cards | 800ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Terror reveals | 1200ms | linear (unsettling) |

**Parallax Ratios:**
- Background: 0.3x
- Mid-ground: 0.6x  
- Subject: 1.0x
- Overlay: 1.2x
- Ambient: variable

**Stagger Values:**
- Sequential elements: 100ms
- Quote words: 50ms
- Terror reveals: 200ms (slower, more dread)

---

# [Layer 6: Implementation]

## Responsive Considerations

### Mobile Adaptations
- Scroll-lock sequences maintain full functionality on touch
- Parallax reduced to 2 layers on mobile (performance)
- Terror "creeping" sequences use horizontal swipe on mobile
- Progress bar moves to bottom on mobile, becomes minimal
- Divine names display at reduced size but maintain Cinzel font

### Tablet Adaptations
- Full parallax system enabled
- Progress bar remains left-positioned
- Scroll-lock depths reduced by 30%

### Desktop
- Full experience with all layers
- Enhanced particle effects
- Extended scroll-lock depths

## Accessibility Requirements

- **Reduced Motion:** All scroll-locks have CSS prefers-reduced-motion fallbacks with instant state changes
- **Skip Controls:** Every scroll-lock sequence has skip affordance appearing after 2 seconds
- **Alt Text:** All mask/sculpture imagery has descriptive alt text referencing cultural origin
- **Color Contrast:** All text meets WCAG AA standards
- **Screen Reader:** Chapter transitions announced; figure names have pronunciation guides
- **Content Warnings:** Terror chapters preceded by optional content warning for nightmare imagery

## Source Attribution Requirements

All museum imagery must be attributed with:
- Museum name
- Object accession number (if available)
- Cultural origin
- Approximate date
- "Photography courtesy of [Museum]"

**Primary Archive Sources:**
- British Museum (Benin Bronzes, Egyptian papyri)
- Metropolitan Museum of Art (African collection)
- Smithsonian National Museum of African Art
- Musée du Quai Branly (Dahomey collection)

## Content Warnings

**Displayed before Act V:**
> "The following chapters contain imagery and descriptions of frightening supernatural entities from African folklore. Some content may be disturbing."

**Skip option provided to jump to Epilogue**

## Deliverables Checklist

- [ ] Hero sequence with manifestation scroll-lock animation
- [ ] "Light Fades" progress bar component (gold → darkness)
- [ ] 12 chapters with named scroll-lock sequences
- [ ] 20 divine/supernatural figures profiled
- [ ] 6 complete stories told in full narrative
- [ ] Parallax depth system with 5 layers
- [ ] Tradition-based visual treatments (6 distinct palettes)
- [ ] Terror chapter desaturation system (100% → 40%)
- [ ] Mobile-responsive adaptations
- [ ] Accessibility: reduced motion, skip controls, alt text, content warnings
- [ ] Source attribution system for museum imagery
- [ ] Research package integration (quotes, figures, stories)

---

# Appendix: Scroll-Lock Sequence Reference

| Sequence Name | Chapter | Type | Duration (scroll depth) |
|---------------|---------|------|------------------------|
| From Light Into Darkness | Hero | Manifestation | 2500px |
| The Map Reveals | Prologue | Assembly | 1500px |
| The Manifestation | Ch. 1 | Coalescence | 2000px |
| The Shaping | Ch. 2 | Transformation | 1800px |
| The Lightning Strikes | Ch. 3 | Dramatic | 1500px |
| The Four Captures | Ch. 4 | Sequence | 2500px |
| The Two-Colored Hat | Ch. 5 | Narrative | 2000px |
| The Race | Ch. 6 | Parallel motion | 1800px |
| The Scale Tips | Ch. 7 | Tension | 2000px |
| The Nightly Battle | Ch. 8 | Combat | 2500px |
| The Forest Darkens | Ch. 9 | Reveal | 1800px |
| The Creeping | Ch. 10 | Horror | 2200px |
| The Flame Endures | Epilogue | Resolution | 1500px |

---

# Production Notes

## Unique Interactions

1. **The Light Fades Progress Bar** — Not just visual progress but emotional journey tracker
2. **Tradition Transitions** — Color/processing shifts as we move between cultures
3. **The Creeping** (Ch. 10) — Low, horizontal reveal creating genuine dread
4. **Terror Desaturation** — Gradual color drain across Act V

## Key Production Challenges

1. **Cultural Sensitivity** — These are living traditions; expert review recommended
2. **Terror Balance** — Frightening without exploitation
3. **Visual Variety** — 6 traditions must feel distinct but unified
4. **Museum Rights** — Verify image permissions for major objects

## Research Package Reference

All content derives from verified research:
```
orchestration/skills/visual-essay-invocation/research/african-mythology/
├── FIGURES.md     → Divine figure profiles
├── STORIES.md     → Complete narratives with beats
├── QUOTES.md      → Verified quotes
├── VISUALS.md     → Museum sources
├── ERA-GUIDE.md   → Visual treatments
├── CITATIONS.md   → All sources
└── GAPS.md        → Sensitivity notes
```

---

*Specification complete. Ready for Visual Essay Orchestrator Gate 3 approval and Production Orchestrator production.*

