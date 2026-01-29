---
status: DRAFT
topic: The Word Han
generated: 2025-12-14
visual_treatment: photorealistic with calligraphic hybrid
chapters: 6
figures: 12
lens_applied: history + linguistics
research_package: research/the-word-han/
---

# Visual Essay Invocation: The Word "Han"

## Layer 1: Strategic Foundation

### Project Title
**"漢 / 韓 / ハン / 한: How One Word Shaped East Asia"**

*Subtitle: The 2,000-Year Journey of a River's Name to Four Civilizations*

---

### Executive Brief

Create an immersive, photography-driven visual essay with a strong calligraphic/typographic design identity that chronicles the origin, spread, and transformation of the word "Han" across East Asian civilizations. This experience uses archival photography, historical documents, and typography as a narrative device to explore how a single morpheme became embedded in ethnic identity, writing systems, and national consciousness.

The narrative spans from ancient China (c. 206 BCE) to the present day, tracing how a river's name became a dynasty's name, then an ethnicity's name, then a script system's name—ultimately shaping the identities of billions. The essay reveals a central discovery: there are *two* etymologically distinct "Han" characters—Chinese 漢 and Korean 韓—representing shared heritage and distinct identity.

This matters now because East Asian geopolitics increasingly involves questions of identity, cultural ownership, and nationalism. Understanding that "Han Chinese" is a modern construction (coined in 1902), that Korea deliberately chose a *different* "Han" for its name, and that Vietnam completely departed from Han characters illuminates the contingent, constructed nature of what often seems primordial.

The reader who completes this essay will never see Chinese, Korean, Japanese, or Vietnamese scripts the same way. They will understand the invisible threads of 2,000 years of shared history—and the deliberate assertions of distinct identity—encoded in every written character across East Asia.

---

### Visual Treatment Philosophy

#### Photography Across Eras

This essay spans 2,200+ years across four civilizations. Visual treatment must honor each era's aesthetic while maintaining narrative coherence.

**Era 1: Ancient Origins (Pre-206 BCE)**
- Color treatment: Sepia/bronze tones
- Processing: Warm patina, high texture, grain
- Aesthetic: Archaeological, sacred, ritualistic
- Sources: Museum artifact photography, oracle bone images

**Era 2: Han Dynasty (206 BCE–220 CE)**
- Color treatment: Imperial red and gold accents, warm tones
- Processing: Rich contrast, silk texture overlay
- Aesthetic: Imperial grandeur, Confucian dignity
- Sources: National Museum of China, British Museum Han collections

**Era 3: Transmission Period (3rd–10th Century CE)**
- Color treatment: Ink black and paper cream
- Processing: Manuscript aesthetic, temple atmosphere
- Aesthetic: Scholarly, devotional, journey
- Sources: Temple archives, early manuscript reproductions

**Era 4: Korean Renaissance (15th Century)**
- Color treatment: Royal blue and white, refined gold
- Processing: Clean, scholarly, revolutionary
- Aesthetic: Intellectual brilliance, democratic aspiration
- Sources: National Museum of Korea, King Sejong Memorial

**Era 5: Modern Nationalism (19th–20th Century)**
- Color treatment: Transition from sepia photography to B&W to color
- Processing: Documentary grain, newspaper aesthetic
- Aesthetic: Political urgency, nation-building
- Sources: Historical photography archives

**Era 6: Contemporary (21st Century)**
- Color treatment: Clean, contemporary
- Processing: Modern photography, minimal grain
- Aesthetic: Digital unity, heritage consciousness
- Sources: Contemporary typography, urban photography

**Transition Treatment:**
Visual style shifts are scroll-driven. As the reader moves through eras, color grading, grain, and processing subtly transform, marking temporal passage without jarring cuts.

---

#### Typography as Narrative Device

**Core Principle:** Typography is not decoration—it's storytelling. Font choices should *embody* the era and culture being discussed.

**Script Evolution Moments:**
The character 漢 will be shown transforming through scripts:
Oracle bone → Bronze inscription → Seal script → Clerical script → Regular script → Simplified

**Regional Typography:**
- Chinese sections: Source Han Serif, classical Ming aesthetics
- Korean sections: Nanum Myeongjo, Batang, Hangul prominence
- Japanese sections: Hiragino Mincho, Minchō tradition
- Vietnamese sections: Transition from Han to Latin-based fonts

**Display Typography:**
Chapter headers use historically-informed display fonts that shift by era:
- Ancient: Rough, carved, ancient script flavor
- Han Dynasty: Heavy serif with imperial weight
- Korean: Korean-designed typefaces
- Contemporary: Clean pan-CJK fonts

---

## Layer 2: Technical Systems

### Scroll-Lock Animation System

**Critical Implementation:** Viewport locks during key sequences; scroll input drives animation progress.

**Required Behavior:**
- Scroll into designated zone triggers viewport lock
- Continued scroll input controls animation frame progression
- Visual progress indicator shows sequence completion
- Upon 100% completion, lock releases with smooth easing (0.6s cubic-bezier)
- Skip affordance: Small "Skip" button in bottom-right corner, appears after 2s

**Scroll-Lock Techniques for This Essay:**

- **The Script Morph:** Scroll drives the transformation of character 漢 through historical scripts—each scroll increment advances the morphing animation
- **The Map Spread:** Scroll controls animated map showing Han character diffusion across East Asia—lines draw from China to Korea, Japan, Vietnam
- **The Two Hans:** Scroll drives a split-screen reveal comparing 漢 and 韓 side by side, then separating them
- **The Typography Timeline:** Scroll advances through typeface specimens from ancient to modern
- **The Declaration:** Scroll reveals King Sejong's quote line by line in original Hangul

---

### Parallax Depth System

- **Layer 0 (Background):** Atmospheric texture, ink wash gradients, subtle geographic shapes (0.2x scroll speed)
- **Layer 1 (Mid-ground):** Supporting photographs, maps, calligraphic specimens (0.5x scroll speed)
- **Layer 2 (Subject):** Primary portraits, key artifacts, focal images (1x scroll speed)
- **Layer 3 (Overlay):** Text, quotes, annotations, UI elements (1.2x scroll speed)
- **Layer 4 (Ambient):** Floating character fragments, ink drops, particle effects (1.5x scroll speed)

---

### Progress Bar Design

#### Concept: "The Ink Stroke"

A vertical brush stroke on the left edge of the screen that evolves from rough, ancient calligraphy at the top to refined, modern typography at the bottom. As the reader scrolls, the stroke fills with ink, revealing chapter markers as traditional seal stamps (印章).

**Design:**
- Position: Left edge, 80% viewport height, 4px width expanding to 8px on hover
- Visual: Brush stroke shape, fills with ink gradient
- Chapter markers: Red seal stamps (印) at each chapter break
- Current position: Glowing dot following scroll position
- Micro-interactions: Stamp appears with subtle "press" animation when reached

**Data Structure:**
- Chapter 1: 🈂️ First seal — "The River"
- Chapter 2: 🈂️ Second seal — "The Empire"
- Chapter 3: 🈂️ Third seal — "The Characters"
- Chapter 4: 🈂️ Fourth seal — "The King"
- Chapter 5: 🈂️ Fifth seal — "The Nations"
- Chapter 6: 🈂️ Sixth seal — "The Legacy"

---

## Layer 3: Hero Architecture

### Hero Section Specification

#### Visual Concept: "The Character Emerges"

The hero opens on abstract ink flowing in water—evoking the Han River itself. Scroll reveals the ancient oracle bone form of the character 漢 emerging from the flow, then morphing through script stages, finally resolving into a split: 漢 and 韓 side by side. The title card appears between them.

**Scroll-Lock Hero Sequence:**

- **0-15% scroll:** Dark screen with gentle water flow animation. Subtle ink tendrils drift. Ambient sound of flowing water. Text whisper: "In ancient China, a river flowed..."

- **15-35% scroll:** Water flow intensifies. From the flow emerges the oracle bone form of 漢—rough, angular, ancient. Character rotates slowly, surrounded by archaeological texture.

- **35-55% scroll:** The character begins morphing: Oracle bone → Bronze inscription → Large seal → Small seal. Each stage holds for a beat, showing the evolution. Background shifts from water to bronze to stone.

- **55-75% scroll:** Character continues: Seal → Clerical → Regular script. Color shifts from ancient bronze to imperial red. The word "HAN" echoes in different scripts around the central character.

- **75-90% scroll:** The character 漢 slides to the left. On the right, 韓 (Korean Han) appears. They face each other—same sound, different origins. Subtle tension in visual balance.

- **90-100% scroll:** Characters part, making space. Title card fades in between them:

**Title Card:**
漢 / 韓 / ハン / 한
**How One Word Shaped East Asia**
*The 2,000-Year Journey of a River's Name to Four Civilizations*

---

## Layer 4: Chapter Schema

### Chapter 1: The River
*Central China, Antiquity*

**Metaphor:** A river's name becomes a kingdom's name becomes a word that echoes for millennia.

**Central Photographs/Visuals:**
- Contemporary Han River (漢水) photography with historical overlay
- Oracle bone inscription specimens showing proto-漢 forms
- Bronze ritual vessels with inscriptions
- Map of the Han River watershed in ancient China
- The character 漢 in its earliest forms

**Content Focus:**
Every great word has an origin. The word "Han" (漢) began as a river—the Han River (漢水), which flows through what is now Hubei and Shaanxi provinces in central China. In the wars that followed the fall of the Qin Dynasty, a peasant rebel named Liu Bang was given the title "King of Han" (漢王), named after this region.

The character 漢 itself contains the water radical (氵), marking its aquatic origin. Archaeological evidence—oracle bones, bronze vessels—shows this character evolving over centuries, always tied to water, to geography, to place.

When Liu Bang conquered China in 206 BCE, he kept the name. The Han Dynasty was born—named not for a concept, not for an ideal, but for a river. This geographical accident would echo across 2,200 years, shaping the identities of billions.

**Key Figure Profile:**

**Liu Bang (劉邦)** — The Peasant Who Named a Civilization
- Rose from common origins to overthrow the Qin Dynasty
- Received the title "King of Han" from his territory near the Han River
- Founded the Han Dynasty in 206 BCE, keeping the name
- His pragmatic approach laid foundations for 400 years of rule
- "I conquered the empire on horseback, but I cannot rule it from horseback." (attributed)
- Photograph: Artistic representation from traditional Chinese painting

**Scroll-Lock Sequence: "The Naming"**

This sequence shows Liu Bang's rise and the moment the dynasty is named.

- **0-25% scroll:** Map of Warring States China, highlighting the Han River region. Text: "After the Qin fell, China fractured..."
- **25-50% scroll:** Liu Bang's portrait emerges. Text: "A peasant named Liu Bang was granted the title 'King of Han' (漢王)—named for the river."
- **50-75% scroll:** Animation of Liu Bang's conquest—stylized map showing his forces spreading. Text: "When he conquered China, he kept the name."
- **75-100% scroll:** The character 漢 fills the screen, pulsing with imperial red. Text: "The Han Dynasty was born."

**Parallax Treatment:**
- Background: Atmospheric river mist, slow-moving
- Mid-ground: Map elements, territory shapes
- Subject: Liu Bang portrait, 漢 character
- Overlay: Text, dates

---

### Chapter 2: The Empire
*Han Dynasty, 206 BCE–220 CE*

**Metaphor:** Four hundred years of glory make a dynasty's name synonymous with a civilization.

**Central Photographs/Visuals:**
- Han Dynasty tomb paintings and murals
- Emperor Wu artistic portrait
- Sima Qian artistic representation
- Silk Road map showing Han expansion
- Han Dynasty artifacts (jade, bronze, silk)
- Stone stele with clerical script inscription

**Content Focus:**
Why did "Han" stick? Dynasties come and go—Qin, Han, Tang, Song, Ming, Qing—yet "Han" became the word for Chinese civilization itself. The answer lies in the Han Dynasty's extraordinary duration and cultural consolidation.

For over 400 years, the Han ruled. Under Emperor Wu (漢武帝), the empire expanded to include Korea, Vietnam, and Central Asia. More importantly, Emperor Wu established Confucianism as the state ideology, creating an imperial academy, civil service examinations, and a cultural framework that would endure for 2,000 years.

The historian Sima Qian, writing during this period, created the *Shiji* (Records of the Grand Historian)—the foundational work of Chinese historiography. His documentation ensured that the Han Dynasty's achievements would be remembered, studied, and revered.

By the time the Han fell in 220 CE, "Han" had become something larger than a dynasty. It was an identity—a way of understanding what it meant to be Chinese.

**Key Figure Profiles:**

**Emperor Wu of Han (漢武帝)** — The Martial Emperor
- Reigned 141–87 BCE, expanding Han territory dramatically
- Secured the Silk Road, connecting China to the West
- Established Confucianism as state ideology
- Created the Imperial Academy for training administrators
- "A man must not forget benevolence through poverty, nor alter integrity through wealth." (attributed)
- Photograph: Artistic representation from imperial portraiture traditions

**Sima Qian (司馬遷)** — Father of Chinese History
- Court historian who authored the *Shiji* (Records of the Grand Historian)
- Suffered castration rather than abandon his historical work
- Documented Liu Bang's rise and the Han Dynasty's foundations
- Created the biographical-style historical writing that China used for 2,000 years
- "A person's death can be weightier than Mount Tai or lighter than a feather."
- Photograph: Traditional artistic portrait

**Scroll-Lock Sequence: "The Expansion"**

This sequence shows the Han Dynasty's growth and cultural consolidation.

- **0-25% scroll:** Map of early Han territory. Text: "The Han inherited the Qin's centralized state..."
- **25-50% scroll:** Animated expansion under Emperor Wu—Korea, Vietnam, Central Asia fill in. Silk Road lines appear. Text: "Under Emperor Wu, the empire reached from the Pacific to Central Asia."
- **50-75% scroll:** Transition from map to interior—Imperial Academy, scrolls, scholars. Text: "Confucianism became the state ideology. Scholars trained to govern."
- **75-100% scroll:** Sima Qian at work, writing the *Shiji*. Text: "The historian Sima Qian ensured the Han would never be forgotten."

**Parallax Treatment:**
- Background: Silk Road landscape, distant mountains
- Mid-ground: Map territories, expanding borders
- Subject: Emperor Wu, Sima Qian, key artifacts
- Overlay: Text, timeline markers

---

### Chapter 3: The Characters
*East Asia, 1st Century BCE–10th Century CE*

**Metaphor:** Writing travels—and with it, a word becomes a script's name.

**Central Photographs/Visuals:**
- Map animation showing spread of Han characters
- Early Hanja manuscript specimens
- Prince Shōtoku artistic portrait
- Buddhist sutra manuscripts
- Temple of Literature (Hanoi) imagery
- Comparative chart: 漢字 in Chinese, Korean, Japanese, Vietnamese

**Content Focus:**
The Han Dynasty's cultural reach extended beyond its borders through a powerful medium: writing. Chinese characters—now called "Han characters" (漢字)—spread to the Korean peninsula, the Japanese archipelago, and the Vietnamese territories.

In Korea, Han characters arrived during the Han Dynasty's military presence (Han commanderies, 108 BCE) and spread through Buddhist missionaries and Confucian scholarship. The Koreans called them "Hanja" (한자/漢字)—"Han characters."

In Japan, the transmission came partly through Korea. According to tradition, a scholar named Wani brought Chinese texts from Baekje (Korea) to Japan in the 4th century. Prince Shōtoku (574–622 CE) promoted Chinese learning and Buddhist texts, embedding "Kanji" (漢字) in Japanese culture. Notably, Shōtoku's 607 CE letter to the Sui Emperor—"The sovereign of the land where the sun rises..."—used Chinese characters to assert Japanese distinctiveness.

In Vietnam, Chinese rule (111 BCE–939 CE) brought "Chữ Hán" (漢字). Even after independence, Vietnamese scholars continued using Han characters for official documents, eventually developing Chữ Nôm—a Vietnamese adaptation.

By the 10th century, "Han characters" had become the shared script of East Asia. The word "Han" was now embedded in how four civilizations wrote.

**Key Figure Profiles:**

**Prince Shōtoku (聖徳太子)** — Father of Japanese Civilization
- Regent under Empress Suiko (574–622 CE)
- Promoted adoption of Chinese characters and Buddhism
- Sent embassies to Sui China, introducing the term "Land of the Rising Sun"
- Authored early Japanese texts using Chinese writing
- "The sovereign of the land where the sun rises addresses the sovereign of the land where the sun sets."
- Photograph: Famous historical portrait (used on old Japanese currency)

**Wani (王仁)** — The Legendary Transmitter
- Korean scholar traditionally credited with bringing Chinese texts to Japan (c. 4th century)
- Represents the Korea → Japan transmission route for Han characters
- Though partially legendary, symbolizes the cultural bridge between peninsular and island Asia
- Photograph: Memorial statue (Osaka)

**Scroll-Lock Sequence: "The Map Spread"**

Animated map showing Han character diffusion across East Asia.

- **0-20% scroll:** China alone illuminated on map. The character 漢字 pulses at center.
- **20-40% scroll:** Line draws from China to Korean peninsula. "Hanja (한자)" appears in Korea. Korean manuscripts fade in.
- **40-60% scroll:** Line draws from Korea to Japan. "Kanji (漢字)" appears in Japan. Shōtoku's portrait emerges.
- **60-80% scroll:** Line draws from China to Vietnam. "Chữ Hán" appears. Temple of Literature imagery.
- **80-100% scroll:** Full map illuminated—the "Han character cultural sphere" (漢字文化圏) labeled.

**Parallax Treatment:**
- Background: Stylized East Asian geography
- Mid-ground: Animated lines showing spread
- Subject: Regional manuscript specimens
- Overlay: Labels, dates, script names

---

### Chapter 4: The King
*Joseon Korea, 15th Century*

**Metaphor:** A king creates an alphabet—and deliberately names it Korean.

**Central Photographs/Visuals:**
- King Sejong portrait (Joseon era painting)
- King Sejong statue (Gwanghwamun Square)
- Hunminjeongeum manuscript pages
- The 28 original Hangul letters
- Contrast image: Hanja document vs. Hangul document
- Diagram of Hangul's scientific letter design

**Content Focus:**
In 1443, something remarkable happened. King Sejong the Great of Joseon Korea created Hangul—a new alphabet designed specifically for Korean sounds. He named it "훈민정음" (Hunminjeongeum, "The Correct Sounds for the Instruction of the People").

Sejong's motivation was democratic: the complex Chinese characters (Hanja) kept literacy confined to the elite. In the preface to the Hunminjeongeum, Sejong wrote: "The sounds of our country's language are different from those of China and do not correspond to Chinese characters. Therefore, among the ignorant people, there have been many who, having something to put into writing, have in the end been unable to express their feelings. I have been distressed by this..."

The design was revolutionary. Consonants were shaped to mirror the positions of mouth and tongue during pronunciation. Vowels represented philosophical concepts. It was one of history's most deliberately constructed writing systems.

But here's what matters for our story: Sejong called it "한글" (Hangul)—and that "한" (han) would later connect to Korean national identity. When Korea needed a name for itself, it would choose 韓 (Han)—a *different* "Han" from the Chinese 漢.

**Key Figure Profile:**

**King Sejong the Great (世宗大王)** — Creator of Hangul
- Fourth king of Joseon Dynasty (reigned 1418–1450)
- Created Hangul in 1443, promulgated in 1446
- Designed scientifically: consonants mirror mouth positions, vowels represent philosophy
- Faced aristocratic opposition from scholars defending Chinese characters
- "The sounds of our country's language are different from those of China and do not correspond to Chinese characters... I have been distressed by this and have designed twenty-eight new letters."
- Photograph: Traditional portrait paintings; iconic statue in Gwanghwamun Square

**Scroll-Lock Sequence: "The Declaration"**

King Sejong's famous quote appears line by line in original Hangul, then translates.

- **0-25% scroll:** King Sejong portrait emerges. Scholarly atmosphere. Text: "In 1443, a king made a revolutionary decision..."
- **25-50% scroll:** First line of Hunminjeongeum preface appears in classical Hangul: "國之語音 異乎中國 (나랏말싸미 中國에 달아)"
- **50-75% scroll:** Translation fades in beneath: "The sounds of our country's language are different from those of China..."
- **75-100% scroll:** Final lines appear: "...I have been distressed by this and have designed twenty-eight new letters." The 28 original letters arrange around Sejong.

**Parallax Treatment:**
- Background: Joseon palace architecture, subtle
- Mid-ground: Manuscript pages, scrolls
- Subject: King Sejong portrait, Hangul letters
- Overlay: Text translation, dates

---

### Chapter 5: The Nations
*East Asia, 19th–20th Century*

**Metaphor:** Two Hans diverge—and a word becomes a weapon of nationalism.

**Central Photographs/Visuals:**
- King Gojong imperial photograph
- Liang Qichao photograph
- Sun Yat-sen photograph
- Side-by-side comparison: 漢 vs 韓
- Korean independence movement imagery
- Early PRC ethnic classification documents
- Vietnam's Quốc ngữ transition documents

**Content Focus:**
In the modern era, "Han" became a tool of nationalism—but with a twist. China and Korea would each claim a "Han," but they were *different words*.

In 1897, King Gojong renamed Korea "Daehan Jeguk" (大韓帝國, "Great Han Empire"). He chose the character 韓—the Korean "Han" from the ancient Samhan confederacies, meaning "great" or "leader." This was *not* the Chinese 漢. It was a deliberate assertion of Korean distinctiveness.

Meanwhile, in China, intellectuals were constructing "Han Chinese" (漢族) as an ethnic identity. Liang Qichao coined "Zhonghua minzu" (中華民族) in 1902, initially equating it with "Han people." Sun Yat-sen declared after the 1911 revolution: "Chinese people are entirely Han people." The 1949 PRC would codify "Han Chinese" as an official ethnic category—92% of China's population.

Vietnam took a different path entirely. During the 20th century, Vietnam abandoned Han characters completely, adopting the Latin-based Quốc ngữ script. Today, Vietnamese contains thousands of Han-derived words, but the characters themselves have vanished from daily life.

By the mid-20th century, "Han" meant different things in different places: an ethnic identity in China, a national identity in Korea (using 韓, not 漢), and an abandoned heritage in Vietnam.

**Key Figure Profiles:**

**King Gojong (고종)** — Emperor of the Korean Empire
- Last king of Joseon, first Emperor of the Korean Empire (1852–1919)
- Renamed Korea "Daehan Jeguk" (大韓帝國) in 1897
- Chose 韓 (Korean Han), not 漢 (Chinese Han), asserting Korean distinctiveness
- His naming choice established the modern Korean national identity
- Photograph: Imperial photography (extensive archive available)

**Liang Qichao (梁啟超)** — Architect of Chinese Nationalism
- Scholar, journalist, philosopher (1873–1929)
- Coined "Zhonghua minzu" (中華民族) in 1902
- Initially equated this with "Han Chinese" (漢族)
- Later developed "Greater Nationalism" including non-Han peoples
- "Today's Zhonghua minzu is what is commonly called the Han people." (1905)
- Photograph: Early 20th century photography

**Sun Yat-sen (孫中山)** — Father of Modern China
- Revolutionary leader, founder of Republic of China (1866–1925)
- Promoted Han Chinese identity as core of Chinese nationalism
- "Chinese people are entirely Han people: sharing a common bloodline, language, religion..."
- His framing continues to influence Chinese nationalism
- Photograph: Extensive photography archive

**Scroll-Lock Sequence: "The Two Hans"**

Split-screen reveal comparing 漢 and 韓.

- **0-25% scroll:** Screen divided. Left side: Chinese flag/imagery, 漢 character. Right side: Korean flag/imagery, 韓 character.
- **25-50% scroll:** Text appears on left: "漢 — From Han River, Han Dynasty, Han Chinese." Text on right: "韓 — From Samhan confederacies, meaning 'great.'"
- **50-75% scroll:** Characters move toward center, almost touching. Text: "Same sound. Different word. Different origin."
- **75-100% scroll:** Characters separate again. Text: "Shared heritage. Distinct identity."

**Parallax Treatment:**
- Background: Split national imagery
- Mid-ground: Historical photographs
- Subject: The two characters, key figures
- Overlay: Text, dates, terminology

---

### Chapter 6: The Legacy
*Contemporary East Asia*

**Metaphor:** A word lives on—in fonts, in identity, in the shaping of nations.

**Central Photographs/Visuals:**
- Source Han Sans/Serif font specimens
- Contemporary East Asian city signage (Chinese, Korean, Japanese)
- Modern calligraphy practice
- Unicode consortium imagery
- Pan-CJK typography examples
- Contemporary figures learning Han characters

**Content Focus:**
Today, the word "Han" remains embedded in East Asian life. In China, "Han Chinese" (漢族) is the official designation for 92% of the population. In Korea, "Hanguk" (한국/韓國) is the nation's name, and "Hangul" (한글) its script. In Japan, "Kanji" (漢字) remains essential to literacy. Even in Vietnam, where Han characters have been abandoned, the linguistic heritage persists in vocabulary.

Modern technology has reunited what history divided. In 2014, Adobe and Google released Source Han Sans—a pan-CJK font family designed to work across Chinese, Japanese, and Korean while respecting regional differences. The Unicode standard ensures that 漢 and 韓 are both encoded, preserved, and transmissible across digital systems.

Yet the geopolitical significance persists. Questions of "Han" identity remain politically charged—in Taiwan's relationship with the PRC, in Korean unification debates, in China's policies toward ethnic minorities. The word that began as a river's name continues to shape nations.

Perhaps the deepest lesson is this: words create worlds. A geographical accident—a river called Han—became an empire, an ethnicity, a script, an identity. Understanding this etymology is understanding that identity is constructed, contingent, historical—not primordial, not inevitable.

The word "Han" reminds us that even the most foundational categories—what it means to be Chinese, or Korean, or part of the "Han character cultural sphere"—are human creations. And what humans have made, humans can understand, question, and reimagine.

**Scroll-Lock Sequence: "The Typography Unification"**

Fonts from across East Asia converge into modern pan-CJK design.

- **0-25% scroll:** Classical Chinese calligraphy specimen. Text: "For 2,000 years, Han characters carried culture across East Asia."
- **25-50% scroll:** Multiple regional fonts appear: Traditional Chinese, Simplified Chinese, Japanese, Korean. They orbit slowly.
- **50-75% scroll:** Fonts begin converging. Source Han Serif specimens appear. Text: "In 2014, a new font family united the heritage."
- **75-100% scroll:** Source Han Serif sample fills screen, showing Chinese, Japanese, Korean variants side by side. Text: "Shared heritage. Distinct identity. One font family."

**Parallax Treatment:**
- Background: Clean contemporary gradient
- Mid-ground: Font specimens, typography samples
- Subject: The unified font display
- Overlay: Text, modern design elements

---

## Layer 5: Design System

### Color Palette

- **Primary Background:** #0A0A0C (deep ink black)
- **Secondary Background:** #1A1A1E (elevated surface)
- **Ink Wash:** #2A2A32 (calligraphic atmosphere)
- **Imperial Red:** #B8202D (Han Dynasty accent, important moments)
- **Royal Blue:** #1E3F66 (Korean accent, Sejong sections)
- **Bronze Patina:** #8B7355 (ancient origins accent)
- **Text Primary:** #FDFBF7 at 90% opacity (warm white)
- **Text Secondary:** #FDFBF7 at 60% opacity
- **Gold Accent:** #C9A83E (seals, important markers)
- **Paper Cream:** #FDF5E6 (manuscript aesthetic)

### Era-Based Visual Treatment

**Ancient Origins (Pre-206 BCE):**
- Heavy bronze and sepia tones
- High texture, grain overlay
- Patinated aesthetic

**Han Dynasty (206 BCE–220 CE):**
- Imperial red and gold accents
- Silk texture, rich saturation
- Warm, dignified lighting

**Transmission Period:**
- Ink black and paper cream
- Manuscript aesthetic
- Temple atmosphere lighting

**Korean Renaissance:**
- Royal blue and white
- Clean, scholarly feel
- Refined gold accents

**Modern Nationalism:**
- Documentary photography aesthetic
- Sepia → B&W → early color transition
- Newspaper grain

**Contemporary:**
- Clean, minimal
- Full color, modern photography
- Digital precision

### Typography

- **Headlines:** Source Han Serif, 700 weight, with era-appropriate display variants for chapter titles
- **Body:** Source Han Serif, 400 weight, 1.7 line height for readability
- **Quotes:** Kaishu-influenced italic treatment, larger size (1.375rem)
- **Technical/Captions:** Source Han Sans, 300 weight
- **Character Display:** Variable weight, often at display sizes (3rem+)
- **Hangul Emphasis:** Nanum Myeongjo for Korean-focused sections

### Animation Principles

- **Scroll-lock zones:** 800–1600px depth (varies by sequence importance)
- **Character morphing:** 0.4s per script stage, cubic-bezier(0.4, 0, 0.2, 1)
- **Photo transitions:** 0.6s crossfade
- **Text reveals:** 0.3s fade, 20ms stagger between lines
- **Parallax ratios:** Background 0.2x, Mid 0.5x, Subject 1x, Overlay 1.2x
- **Easing:** cubic-bezier(0.4, 0, 0.2, 1) for most transitions
- **Stagger values:** 40ms between sequential character reveals

---

## Layer 6: Implementation

### Responsive Considerations

#### Mobile Adaptations
- Scroll-lock sequences simplified for touch (fewer intermediate states)
- Typography scales down: headlines 2.5rem → 1.75rem
- Parallax depth reduced (0.15x / 0.3x / 1x / 1.1x)
- Progress bar moves to bottom horizontal on mobile
- Skip affordance enlarged for touch (44x44px minimum)
- Character morphing sequences auto-play with minimal scroll requirement

#### Tablet Adaptations
- Full parallax depth maintained
- Side-by-side layouts for "Two Hans" comparison
- Progress bar remains vertical on left

### Accessibility

- **Reduced Motion:** All scroll-lock animations skip to final state; parallax disabled
- **Skip Controls:** Every locked section has visible skip button after 2s
- **Alt Text:** All character images include pronunciation and meaning
- **Screen Reader:** Semantic HTML for figures, quotes, timeline events
- **Color Contrast:** All text meets WCAG AA (4.5:1 minimum)
- **Focus Indicators:** Visible focus states for all interactive elements

### Source Attribution Requirements

All content must be properly attributed following Esy standards.

**Archives to Reference:**
- National Museum of China (Beijing)
- National Palace Museum (Taipei)
- British Museum (Han Dynasty collection)
- National Museum of Korea
- Tokyo National Museum
- Smithsonian National Museum of Asian Art
- Academia Sinica Digital Archives (Taiwan)

**Citation Format:**
- Figure name and dates
- Source archive and accession number (where available)
- Quote attribution with original source

### Content Warnings

None required for this content.

### Deliverables Checklist

- [ ] Hero sequence with scroll-lock character morphing animation
- [ ] "Ink Stroke" themed progress bar component with seal stamps
- [ ] 6 chapters with scroll-lock sequences
- [ ] 12 historical figures profiled with available imagery
- [ ] Parallax depth system (5 layers) implemented
- [ ] Era-based visual treatment (6 eras) with scroll-driven transitions
- [ ] Typography system with era-appropriate display fonts
- [ ] Character 漢 morphing animation (oracle → regular script)
- [ ] "Two Hans" comparison animation (漢 vs 韓)
- [ ] Map animation showing character spread across East Asia
- [ ] Mobile-responsive adaptations
- [ ] Accessibility: reduced motion support, skip controls, alt text
- [ ] Source attribution system (Sources section)
- [ ] Pan-CJK font implementation (Source Han Serif/Sans)

---

## Research Package Reference

This specification was built from verified research in:
```
orchestration/skills/visual-essay-invocation/research/the-word-han/
├── README.md
├── RESEARCH-BRIEF.md
├── FIGURES.md
├── QUOTES.md
├── TIMELINE.md
├── ERA-GUIDE.md
├── VISUALS.md
├── TYPOGRAPHY.md
├── CITATIONS.md
├── SYNTHESIS.md
└── GAPS.md
```

All figures, quotes, and timeline events are research-verified. See GAPS.md for claims requiring qualification.

---

*This invocation is ready for production by the Production Orchestrator.*
