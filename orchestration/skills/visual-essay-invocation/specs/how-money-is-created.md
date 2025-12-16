---
status: [DRAFT]
title: How Money Is Created
slug: how-money-is-created
created: 2025-12
type: process-driven
visual_treatment: technical-illustration
research_package: orchestration/projects/how-money-is-created/research/
---

# Visual Essay Invocation: How Money Is Created

## [Layer 1: Strategic Foundation]

### Project Title
**"How Money Is Created: The Mechanics of Credit, Banking, and Monetary Systems"**

### Executive Brief

Create an immersive, scroll-driven visual essay that mechanically explains how money is actually created in modern economies. This experience uses technical illustrations, balance sheet diagrams, and flow charts to demystify a system that most people misunderstand.

The narrative traces the complete money creation process through eight distinct stages—from central bank operations to commercial bank lending, from credit circulation to money destruction. Each stage functions as a mechanism in a larger system, clicking into place to reveal how money flows through the economy.

This essay matters because money creation is fundamental to modern life, yet it's rarely explained clearly. Most explanations are either oversimplified ("printing money") or ideologically charged. This essay treats money as infrastructure—a system to understand, not a political argument to win. It dispels misconceptions, explains mechanics, and provides intellectual clarity.

The user who completes this essay will understand that money is created primarily through credit, not printing presses; that commercial banks create most money through lending decisions; that money creation is distributed and constrained by multiple factors; and that inflation is a system outcome, not a simple switch. They will leave with a reference-quality understanding of one of the most important but least understood systems in modern life.

### Visual Treatment Philosophy

**Illustration Approach**

This essay uses **technical illustration** as its primary visual medium—not photography, not photorealistic imagery. The subject is abstract (money, credit, balance sheets) and requires clear, mechanical visualization.

**Style**: Clean, technical, process-focused illustrations similar to "How a Chip Is Manufactured"
- Line-based diagrams with clear hierarchy
- Minimal color palette (see Design System)
- Technical precision without decorative elements
- Each visual supports clarity, not decoration

**Primary Visual Elements**:
1. **Balance Sheet Diagrams**: Before/after states showing loan creation = deposit creation
2. **Flow Charts**: Money creation process, credit circulation patterns
3. **Technical Illustrations**: Central bank operations, QE mechanics, regulatory frameworks
4. **Data Visualizations**: Only if they clarify the process (money supply measures, not decorative charts)
5. **Minimal Photography**: Only if it serves context (central bank buildings, trading floors as atmospheric background, not primary content)

**Visual Progression**:
- Each stage introduces new visual elements that build understanding
- Diagrams become more complex as the system is revealed
- Visuals feel like "a mechanism clicking into place" with each scroll
- Technical precision maintains throughout—no decorative flourishes

**Era/Mood Treatments**: Not applicable (process-driven, not historical narrative)

---

## [Layer 2: Technical Systems]

### Scroll-Lock Animation System

**Critical Implementation**: Viewport locks during key sequences; scroll input drives animation progress.

**Required Behavior**:
- Scroll into designated zone triggers viewport lock
- Continued scroll input controls: Diagram assembly, flow progression, balance sheet transformations
- Visual progress indicator shows sequence completion (see Progress Bar)
- Upon 100% completion, lock releases with smooth easing
- Skip affordance available: Bottom-right corner, subtle "Skip" button with fade-in

**Scroll-Lock Techniques for This Essay**:
- **The Assembly**: Balance sheet diagrams assemble piece by piece as user scrolls (assets appear, then liabilities, then connections)
- **The Flow**: Flow charts animate money movement through the system (arrows appear, paths light up, data flows)
- **The Transformation**: Before/after states transition smoothly (old state fades, new state builds, showing the change)
- **The Mechanism**: Technical illustrations reveal internal mechanics (gears turn, connections form, systems activate)

### Parallax Depth System

- **Layer 0 (Background)**: Subtle grid patterns, atmospheric technical textures (very slow, 0.3x speed)
- **Layer 1 (Mid-ground)**: Supporting diagram elements, secondary flow paths (slow, 0.6x speed)
- **Layer 2 (Subject)**: Primary diagrams, balance sheets, main flow charts (normal, 1x speed)
- **Layer 3 (Overlay)**: Labels, annotations, UI elements, progress indicators (normal, 1x speed)
- **Layer 4 (Ambient)**: Subtle particle effects (money symbols, flow indicators) - very subtle, 0.2x speed

**Note**: Parallax is minimal for this essay—focus is on clarity, not visual effects. Layers 0 and 4 are very subtle.

### Progress Bar Design

**Concept: "Money Flow Indicator"**

The progress indicator visualizes money flowing through the system—like a circuit or pipeline that fills as the user progresses. Each stage adds a segment to the flow, showing how money moves from creation to circulation to destruction.

**Design**:
- Position: Left edge, vertical bar
- Visual: Clean vertical bar with 8 segments (one per stage)
- Each segment represents a stage of money creation
- Bar fills from bottom to top as user progresses
- Current stage highlighted with subtle glow
- Stage markers: Small labels on left side showing stage names
- Micro-interactions: Segment pulses slightly when entered, smooth fill animation

**Data Structure**:
- Segment 1: "Opening" - Introduction and context
- Segment 2: "Central Bank" - Stage 1: Central Bank Sets Conditions
- Segment 3: "Bank Lending" - Stage 2: Commercial Banks Create Money
- Segment 4: "Circulation" - Stage 3: Credit Becomes Circulation
- Segment 5: "Constraints" - Stage 4: Constraints on Money Creation
- Segment 6: "Government" - Stage 5: Government Spending and Treasury
- Segment 7: "QE" - Stage 6: Central Bank Asset Purchases
- Segment 8: "Destruction" - Stage 7: Destruction of Money
- Segment 9: "Inflation" - Stage 8: Inflation as System Outcome
- Segment 10: "Closing" - Conclusion and reflection

---

## [Layer 3: Hero Architecture]

### Hero Section Specification

**Visual Concept: "The System Awakens"**

The hero sequence reveals money creation as a system coming to life—not a single action, but a distributed process. Technical illustrations of banking infrastructure, balance sheets, and flow paths assemble as the user scrolls, building toward the central thesis: money is created through credit, not printing.

**Scroll-Lock Hero Sequence**:

- **0-20% scroll**: Dark background with subtle grid. Text appears: "Most people think money is created by printing presses. They're wrong." Balance sheet outline fades in (very faint).

- **20-40% scroll**: Balance sheet structure becomes clearer. Text: "In modern economies, money is created primarily through credit." Flow arrows begin to appear, connecting elements.

- **40-60% scroll**: Full balance sheet visible. Commercial bank illustration appears. Text: "Commercial banks create money through lending." Loan arrow animates from bank to borrower.

- **60-80% scroll**: System expands. Central bank, commercial banks, borrowers all visible. Money flows through the system. Text: "This is how it actually works."

- **80-100% scroll**: Complete system view. Title card fades in over the illustration. Smooth transition to essay content.

**Title Card**:
**How Money Is Created**
*The Mechanics of Credit, Banking, and Monetary Systems*

---

## [Layer 4: Stage Schema]

### Opening Context
*Introduction to the System*

**Metaphor**: "Money as Infrastructure" — Money is not a thing, but a system of claims and records.

**Central Visuals**:
- Simple diagram: "What people think" (printing press) vs. "What actually happens" (credit creation)
- Minimal illustration of money as digital records, not physical objects
- Clean typography emphasizing key misconceptions

**Content Focus** (300-400 words):
1. **What people think money is**: Cash, coins, physical currency
2. **What money actually is**: A system of claims and records, mostly digital
3. **The "printing money" misconception**: Why this explanation is incomplete
4. **Core thesis introduction**: "In modern economies, money is created primarily through credit, not printing presses"
5. **Distributed creation**: Money creation is distributed, not centralized
6. **What's coming**: Eight stages that explain the complete system

**Key Quote** (from research):
> "The reality of how money is created today differs from the description found in some economics textbooks: Rather than banks receiving deposits when households save and then lending them out, bank lending creates deposits." — Bank of England (2014)

**Scroll-Lock Sequence: "The Reveal"**
- **0-25% scroll**: "What people think" illustration (printing press) visible
- **25-50% scroll**: Crossfade to "What actually happens" (credit creation diagram)
- **50-75% scroll**: System diagram expands, showing distributed nature
- **75-100% scroll**: Transition to Stage 1, balance sheet elements fade in

**Parallax Treatment**: Minimal—focus on clarity. Background grid very subtle.

---

### Stage 1: Central Bank Sets Conditions
*The Foundation Layer*

**Metaphor**: "The Price of Money" — Central banks set the conditions, not the quantity.

**Central Visuals**:
- Central bank building illustration (minimal, atmospheric)
- Interest rate mechanism diagram
- Central bank balance sheet (simplified)
- Flow diagram: Central bank → Commercial banks

**Content Focus**:
1. **What a central bank does**: Sets interest rates, manages reserves, provides liquidity
2. **What it does NOT directly do**: Create most money (common misconception)
3. **Why interest rates matter more than cash**: Interest rates are the "price of money"
4. **Key idea**: "Central banks influence money creation, but they do not do most of it themselves"
5. **Base money vs. broad money**: Central banks create base money (reserves), commercial banks create broad money

**Key Quote**:
> "The Federal Reserve creates money through open market operations, in which the Fed buys or sells securities to inject or withdraw money from the banking system." — Federal Reserve

**Scroll-Lock Sequence: "The Mechanism"**
- **0-30% scroll**: Central bank illustration appears, interest rate dial visible
- **30-60% scroll**: Interest rate changes, flow arrows show impact on commercial banks
- **60-90% scroll**: Balance sheet shows base money creation (reserves)
- **90-100% scroll**: Transition to Stage 2, commercial bank elements fade in

**Parallax Treatment**: Central bank building in background (very subtle), diagrams in foreground.

---

### Stage 2: Commercial Banks Create Money Through Lending
*The Primary Mechanism*

**Metaphor**: "Loans Create Deposits" — The loan itself creates the money, not the reverse.

**Central Visuals**:
- **CRITICAL**: Before/after balance sheet diagram showing loan creation
- Flow diagram: Loan issuance → Deposit creation
- Commercial bank illustration with lending mechanism
- Diagram dispelling "banks lend deposits" misconception

**Content Focus**:
1. **The core mechanism**: Loans create deposits (not the reverse)
2. **Why banks don't lend existing deposits first**: The loan creates the deposit
3. **Balance sheet expansion**: Assets (loan) and liabilities (deposit) increase simultaneously
4. **Key idea**: "A loan creates new money the moment it is issued"
5. **Dispelling the money multiplier myth**: Traditional textbook explanation is incorrect

**Key Quote** (CRITICAL):
> "The reality of how money is created today differs from the description found in some economics textbooks: Rather than banks receiving deposits when households save and then lending them out, bank lending creates deposits." — Bank of England (2014)

**Key Quote**:
> "Banks create credit and purchasing power ex nihilo (out of nothing)." — Werner (2014)

**Scroll-Lock Sequence: "The Creation"**
- **0-25% scroll**: Empty balance sheet structure visible
- **25-50% scroll**: Loan appears on assets side (animated entry)
- **50-75% scroll**: Deposit appears on liabilities side (simultaneous creation)
- **75-100% scroll**: Connection arrows show the relationship, text emphasizes "loans create deposits"

**Parallax Treatment**: Balance sheet is primary focus (Layer 2), supporting elements in background.

---

### Stage 3: Credit Becomes Circulation
*Money Enters the Economy*

**Metaphor**: "Money Must Move" — Money only matters if it circulates.

**Central Visuals**:
- Flow diagram: Loan → Spending → Circulation
- Circular flow showing money moving through economy
- Simple velocity visualization (without heavy math)
- Wages, spending, business investment connections

**Content Focus**:
1. **How newly created money enters the economy**: Borrower spends the loan
2. **Wages, spending, business investment**: Different paths money takes
3. **Why money only "exists" if it is used**: Idle money doesn't affect economy
4. **Money velocity (conceptually)**: Speed of circulation matters (explain without math)
5. **Key idea**: "Money must circulate to matter"

**Key Quote**:
> "In the modern economy, most money takes the form of bank deposits. But how those bank deposits are created is often misunderstood: the principal way is through commercial banks making loans." — Bank of England

**Scroll-Lock Sequence: "The Flow"**
- **0-30% scroll**: Loan deposit visible in bank account
- **30-60% scroll**: Spending arrow animates, money moves to another account
- **60-90% scroll**: Circular flow shows money circulating through economy
- **90-100% scroll**: Multiple paths visible (wages, spending, investment)

**Parallax Treatment**: Flow paths in mid-ground, circular motion emphasized.

---

### Stage 4: Constraints on Money Creation
*The Limits*

**Metaphor**: "Confidence and Regulation" — Money creation is constrained by multiple factors.

**Central Visuals**:
- Constraint diagram: Capital requirements, risk assessment, demand, regulation
- Capital ratio visualization
- Risk assessment flow
- Regulatory framework illustration (Basel III reference)

**Content Focus**:
1. **Capital requirements**: Banks must maintain minimum capital ratios (Basel III)
2. **Risk assessment**: Banks evaluate borrower creditworthiness
3. **Regulation**: Reserve requirements, liquidity requirements, regulatory oversight
4. **Demand for loans**: Market forces affect money creation
5. **Key idea**: "Money creation is constrained by confidence, not just policy"

**Key Quote**:
> "Banks cannot create money without limits. Several factors constrain this process: regulatory requirements, market forces, and monetary policy." — Bank of England

**Key Quote**:
> "Capital requirements affect banks' ability to extend credit and create money through lending." — Federal Reserve

**Scroll-Lock Sequence: "The Constraints"**
- **0-25% scroll**: Unconstrained money creation diagram (hypothetical)
- **25-50% scroll**: Capital requirement barrier appears
- **50-75% scroll**: Risk assessment filter appears
- **75-100% scroll**: Complete constraint system visible, showing all limiting factors

**Parallax Treatment**: Constraint elements layer in, creating visual barriers.

---

### Stage 5: Government Spending and Treasury Operations
*A Different Mechanism*

**Metaphor**: "Not Like Households" — Governments inject money differently than banks.

**Central Visuals**:
- Government spending flow diagram
- Treasury bond issuance illustration
- Comparison: Bank lending vs. Government spending
- Deficit mechanics (simplified)

**Content Focus**:
1. **Difference from bank lending**: Government spending doesn't require loan repayment
2. **Treasury bonds**: How government finances spending
3. **Deficits explained mechanically**: Not politically, just the mechanics
4. **Why governments don't operate like households**: Different constraints and mechanisms
5. **Key idea**: "Governments inject money differently than banks"

**Key Quote**:
> "The government borrows money by selling financial products called bonds." — Bank of England

**Scroll-Lock Sequence: "The Comparison"**
- **0-30% scroll**: Bank lending mechanism (from Stage 2) visible
- **30-60% scroll**: Government spending mechanism appears alongside
- **60-90% scroll**: Comparison highlights key differences
- **90-100% scroll**: Transition to Stage 6

**Parallax Treatment**: Side-by-side comparison, clear visual separation.

---

### Stage 6: Central Bank Asset Purchases (QE)
*Changing Where Money Flows*

**Metaphor**: "Asset Swaps, Not Free Money" — QE changes flows, not existence.

**Central Visuals**:
- QE mechanics diagram: Asset purchase → Reserve credit
- Central bank balance sheet expansion
- Flow diagram: QE → Bank reserves → Asset prices
- Before/after: Normal operations vs. QE operations

**Content Focus**:
1. **What QE actually does**: Central bank purchases assets, credits bank reserves
2. **Asset swaps, not free money**: QE is an exchange, not creation from nothing
3. **Why QE inflates assets before wages**: Reserves go to asset purchases first
4. **Limits of monetary tools**: QE has diminishing returns
5. **Key idea**: "QE changes where money flows, not whether money exists"

**Key Quote**:
> "Quantitative easing (QE) is a monetary policy where central banks spur economic activity by buying a range of assets." — Federal Reserve Bank of St. Louis

**Key Quote**:
> "Quantitative easing (QE) is one of the tools we use to meet our inflation target. QE lowers long-term borrowing costs to support spending in the economy and hit the inflation target." — Bank of England

**Scroll-Lock Sequence: "The Exchange"**
- **0-30% scroll**: Normal central bank operations visible
- **30-60% scroll**: QE asset purchase animates (bonds → central bank)
- **60-90% scroll**: Reserve credit appears in commercial bank account
- **90-100% scroll**: Flow shows reserves → asset purchases (not wages)

**Parallax Treatment**: QE flow paths emphasized, asset price connection visible.

---

### Stage 7: Destruction of Money
*The Reverse Process*

**Metaphor**: "Balance Sheets Contract" — Money is destroyed the same way it's created.

**Central Visuals**:
- Loan repayment diagram: Deposit destroyed as loan repaid
- Default mechanism illustration
- Credit contraction visualization
- Balance sheet contraction (before/after)

**Content Focus**:
1. **Loan repayment**: When borrower repays, deposit is destroyed
2. **Defaults**: When loans default, money is destroyed
3. **Credit contraction**: Less lending = net money destruction
4. **Why money disappears quietly**: Destruction is less visible than creation
5. **Key idea**: "Money is destroyed the same way it is created: through balance sheets"

**Key Quote**:
> "As loans are repaid, the money created is effectively destroyed, reducing the money supply." — Bank of England

**Scroll-Lock Sequence: "The Destruction"**
- **0-30% scroll**: Balance sheet with loan and deposit visible
- **30-60% scroll**: Repayment arrow animates
- **60-90% scroll**: Deposit disappears, loan balance decreases
- **90-100% scroll**: Balance sheet contracts, showing money destruction

**Parallax Treatment**: Reverse of creation sequence, visual symmetry.

---

### Stage 8: Inflation as a System Outcome
*Imbalance, Not Printing*

**Metaphor**: "Supply and Demand Imbalance" — Inflation is a delayed system response.

**Central Visuals**:
- Supply/demand imbalance diagram
- Time lag visualization
- Uneven price rise illustration
- System feedback loop

**Content Focus**:
1. **Inflation as imbalance**: Not just "printing money," but supply vs. demand
2. **Supply constraints vs. demand**: Both factors matter
3. **Why prices rise unevenly**: Different sectors affected differently
4. **Time lag effects**: Money creation → inflation has delays
5. **Key idea**: "Inflation is not a switch—it's a delayed response"

**Key Quote**:
> "Inflation is a general increase in prices and a fall in the purchasing power of money." — Federal Reserve

**Key Quote**:
> "Inflation is the measure of how much the prices of goods and services have gone up over time." — Bank of England

**Scroll-Lock Sequence: "The Imbalance"**
- **0-30% scroll**: Balanced supply/demand diagram
- **30-60% scroll**: Demand increases (money creation effect)
- **60-90% scroll**: Supply constraints appear
- **90-100% scroll**: Imbalance visible, prices rise (delayed)

**Parallax Treatment**: Imbalance visualization, time lag emphasized.

---

### Closing Section
*Reflection on the System*

**Metaphor**: "Trust, Accounting, and Expectations" — The real infrastructure is intangible.

**Central Visuals**:
- System overview diagram (all stages connected)
- Minimal, contemplative illustration
- Clean typography for closing quote

**Content Focus** (200-300 words):
1. **Why money feels abstract and political**: It's a system, not a thing
2. **Why misunderstandings persist**: Traditional explanations are incomplete
3. **Why modern economies rely on credit creation**: It's efficient and flexible
4. **Why this system is both powerful and fragile**: Depends on trust and confidence
5. **Closing line**: "Money is not created with ink or metal, but with trust, accounting, and expectations — and those are harder to manage than machines."

**Scroll-Lock Sequence: "The Reflection"**
- **0-50% scroll**: System diagram fades to background
- **50-100% scroll**: Closing text appears, contemplative tone

**Parallax Treatment**: Minimal, focus on text.

---

## [Layer 5: Design System]

### Color Palette

**Primary Background**: `#0A0A0A` (Near black, technical feel)
**Secondary Background**: `#1A1A1A` (Slightly elevated sections)
**Accent 1 (Money/Credit)**: `#4A9EFF` (Blue, represents money flow, trust)
**Accent 2 (Warning/Constraints)**: `#FF6B6B` (Red, represents constraints, risks)
**Primary Text**: `#FFFFFF` (White, 90% opacity for body, 100% for headlines)
**Secondary Text**: `#CCCCCC` (Light gray, 70% opacity)
**Success/Positive**: `#4ECDC4` (Teal, represents creation, flow)
**Warning/Caution**: `#FFD93D` (Yellow, represents constraints, limits)
**Technical/Data**: `#8B8B8B` (Medium gray, for technical annotations)

**Semantic Meanings**:
- Blue (Accent 1): Money, credit, flow, trust
- Red (Accent 2): Constraints, risks, destruction
- Teal (Success): Creation, positive flow
- Yellow (Warning): Limits, caution, constraints

### Typography

**Headlines**: 
- Font: System font stack (SF Pro, -apple-system, sans-serif)
- Weight: 700 (Bold)
- Character: Technical, authoritative, clear
- Size: Responsive (48px desktop, 32px mobile)

**Body**: 
- Font: System font stack
- Weight: 400 (Regular)
- Purpose: Maximum readability, technical clarity
- Size: 18px desktop, 16px mobile
- Line height: 1.6

**Quotes**: 
- Font: System font stack
- Weight: 400
- Treatment: Italic, larger size (20px), left border accent (blue)
- Indentation: 24px left margin

**Technical/Code**: 
- Font: 'SF Mono', 'Monaco', 'Courier New', monospace
- Weight: 400
- Purpose: Balance sheet labels, technical terms, data

**Captions/Data**: 
- Font: System font stack
- Weight: 300 (Light)
- Treatment: Smaller size (14px), reduced opacity (70%)

### Animation Principles

**Scroll-Lock Zone Depth**: 600-800px per sequence (varies by complexity)
**Transition Durations**:
- Diagram assembly: 800ms
- Flow animations: 600ms
- Balance sheet transformations: 1000ms
- Text reveals: 400ms

**Easing Curves**:
- Diagram assembly: `ease-out` (smooth entry)
- Flow animations: `ease-in-out` (natural movement)
- Transitions: `cubic-bezier(0.4, 0, 0.2, 1)` (material design)

**Stagger Values**:
- Balance sheet elements: 100ms delay between items
- Flow arrows: 150ms delay
- Text reveals: 50ms delay

**Parallax Speed Ratios**:
- Layer 0 (Background): 0.3x (very slow)
- Layer 1 (Mid-ground): 0.6x (slow)
- Layer 2 (Subject): 1x (normal)
- Layer 3 (Overlay): 1x (normal)
- Layer 4 (Ambient): 0.2x (very slow)

---

## [Layer 6: Implementation]

### Responsive Adaptations

**Mobile-First Approach**:
- Diagrams scale down but remain readable
- Balance sheets use horizontal scroll if needed
- Flow charts stack vertically on small screens
- Text size adjusts (16px base on mobile)
- Touch-friendly scroll-lock zones (minimum 400px height)

**Tablet Optimizations**:
- Larger diagrams possible
- Side-by-side comparisons work well
- Parallax effects more pronounced

**Desktop Enhancements**:
- Full diagram complexity
- Maximum parallax depth
- Hover states on interactive elements

### Accessibility Requirements

**Reduced Motion**:
- All animations respect `prefers-reduced-motion`
- Static versions of diagrams available
- Scroll-lock sequences can be skipped immediately

**Screen Reader Support**:
- All diagrams have descriptive alt text
- Balance sheets have text equivalents
- Flow charts have sequential descriptions
- ARIA labels for interactive elements

**Color Contrast**:
- All text meets WCAG AA standards (4.5:1 minimum)
- Accent colors have sufficient contrast
- Diagrams work in grayscale

**Keyboard Navigation**:
- All scroll-lock sequences can be advanced with arrow keys
- Skip buttons are keyboard accessible
- Focus indicators visible

### Source Attribution Standards

**In-Text Citations**:
- Sources cited inline with (Author, Year) format
- Links to full citations in Sources section

**Sources Section**:
- Complete source list from research package
- All 25 sources included
- Links verified and functional
- Tier classifications noted

**Visual Attribution**:
- Diagram sources noted (if based on specific publications)
- Balance sheet formats credited to central bank publications
- Flow chart inspirations cited

### Deliverables Checklist

**Content**:
- [ ] Opening Context (300-400 words)
- [ ] Stage 1: Central Bank Sets Conditions
- [ ] Stage 2: Commercial Banks Create Money Through Lending
- [ ] Stage 3: Credit Becomes Circulation
- [ ] Stage 4: Constraints on Money Creation
- [ ] Stage 5: Government Spending and Treasury Operations
- [ ] Stage 6: Central Bank Asset Purchases (QE)
- [ ] Stage 7: Destruction of Money
- [ ] Stage 8: Inflation as a System Outcome
- [ ] Closing Section (200-300 words)

**Visuals**:
- [ ] Hero sequence illustrations
- [ ] 8 balance sheet diagrams (one per relevant stage)
- [ ] Flow charts for money creation process
- [ ] Technical illustrations for each stage
- [ ] Progress bar implementation
- [ ] All diagrams mobile-responsive

**Technical**:
- [ ] Scroll-lock sequences implemented (8 sequences)
- [ ] Parallax system functional
- [ ] Progress bar working
- [ ] Mobile testing complete
- [ ] Accessibility requirements met
- [ ] Sources section complete

**Quality**:
- [ ] All content fact-checked against research package
- [ ] All quotes verified
- [ ] All diagrams accurate
- [ ] Tone consistent (neutral, mechanical, educational)
- [ ] No political arguments or moral judgments
- [ ] Closing line included: "Money is not created with ink or metal, but with trust, accounting, and expectations — and those are harder to manage than machines."

---

## Research Package Integration

**Research Package Location**: `orchestration/projects/how-money-is-created/research/`

**Key Sources to Reference**:
- Bank of England (2014) - "Money Creation in the Modern Economy" (CRITICAL)
- Werner (2014) - "Can Banks Individually Create Money Out of Nothing?" (CRITICAL)
- Federal Reserve - "Money and Payments" (2022)
- ECB (2014) - "The Role of Banks in the Money Creation Process"
- All 25 sources from CITATIONS.md

**Quotes to Use** (all verified in research package):
- Bank of England quote on loans creating deposits (Stage 2)
- Werner quote on credit creation (Stage 2)
- Federal Reserve quote on QE (Stage 6)
- Bank of England quote on money destruction (Stage 7)
- Additional quotes from SYNTHESIS.md

**Confidence Levels** (from CONFIDENCE-MATRIX.md):
- HIGH confidence claims: Emphasize these (60% of claims)
- MEDIUM confidence claims: Frame carefully, acknowledge nuance
- LOW confidence claims: Minimize (only 1 claim, can be reframed)

**Gaps to Avoid** (from GAPS.md):
- Don't claim historical evolution is comprehensive (brief reference only)
- Don't make comprehensive international comparisons
- Don't provide detailed money velocity calculations (conceptual only)

---

## Status

**Spec Status**: [DRAFT]  
**Ready for**: Production (Phase 4)  
**Next Step**: Invoke Scrollytelling Expert with this spec and research package

---

*This invocation spec is complete and ready for production. All 8 stages are specified with scroll-lock sequences, visual treatments, and content focus. The spec follows the six-layer architecture and integrates the complete research package. Tone is neutral, mechanical, and educational—treating money as infrastructure, not a political argument.*


