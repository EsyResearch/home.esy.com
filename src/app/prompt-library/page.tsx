"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PromptCard from '@/components/PromptLibrary/PromptCard';
import SearchBar from '@/components/SearchBar/SearchBar';
import type { SearchResult } from '@/components/SearchBar/SearchBar';
import { usePromptSearch } from '@/hooks/usePromptSearch';
import { useScrollHeaderSearch } from '@/hooks/useScrollHeaderSearch';
import { elevatedDarkTheme } from '@/lib/theme';

const PromptLibrary = () => {
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedPrompt, setCopiedPrompt] = useState(null);
  
  // Responsive breakpoints
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // Show header search when in-page search scrolls out of view
  useScrollHeaderSearch(searchBarRef);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Reset all button styles when selectedCategory changes
  useEffect(() => {
    const resetAllButtonStyles = () => {
      const buttons = document.querySelectorAll('[data-category-button]');
      buttons.forEach(button => {
        const element = button as HTMLElement;
        // Only reset if this button is not the currently selected one
        if (element.getAttribute('data-category-id') !== selectedCategory) {
          element.style.backgroundColor = 'rgba(22, 22, 31, 0.6)';
          element.style.color = 'rgba(255, 255, 255, 0.7)';
          element.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        }
      });
    };
    
    resetAllButtonStyles();
  }, [selectedCategory]);
  const [currentView, setCurrentView] = useState('library'); // 'library', 'prompt', or 'category'
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [promptVariables, setPromptVariables] = useState({});

  const promptCategories = [
    { id: 'all', name: 'All Prompts', count: 0 },
    { id: 'writing', name: 'Creative Writing', count: 12 },
    { id: 'research', name: 'Academic Research', count: 15 },
    { id: 'analysis', name: 'Literary Analysis', count: 10 },
    { id: 'essays', name: 'Essay Writing', count: 14 },
    { id: 'professional', name: 'Professional Writing', count: 8 },
    { id: 'ebooks', name: 'Book & Publication', count: 9 }
  ];

  const prompts = useMemo(() => [
    // Creative Writing (12 prompts)
    {
      id: 1,
      slug: 'character-development-deep-dive',
      category: 'writing',
      title: 'Character Development Deep Dive',
      description: 'Comprehensive character creation for complex narratives',
      shortDescription: 'Create detailed character profiles with psychological depth',
      variables: ['GENRE'],
      prompt: `Create a detailed character profile for a protagonist in [GENRE] fiction. Include: 

**Core Identity:**
- Full name, age, occupation, and social background
- Three defining personality traits with specific examples
- Internal contradiction or moral complexity

**Psychological Profile:**
- Primary motivation and what drives them daily
- Greatest fear and how it manifests in behavior
- Childhood experience that shaped their worldview

**Narrative Function:**
- Character arc from beginning to end of story
- Key relationships and how they challenge/support growth
- Specific skills or knowledge that advances the plot

**Voice & Dialogue:**
- Unique speech patterns, vocabulary, or verbal tics
- How they communicate differently with various characters
- Internal monologue style and thought patterns

Provide concrete examples and avoid generic traits. Make this character feel distinctly human with authentic flaws and strengths.`,
      isPro: false
    },
    {
      id: 2,
      slug: 'scene-tension-architecture',
      category: 'writing',
      title: 'Scene Tension Architecture',
      description: 'Building dramatic tension through environmental and emotional layers',
      shortDescription: 'Master the art of creating compelling, tension-filled scenes',
      variables: ['SETTING', 'CONFLICT_TYPE'],
      prompt: `Analyze and construct a high-tension scene set in [SETTING] focusing on [CONFLICT_TYPE]:

**Setting as Character:**
- Physical environment that mirrors internal conflict
- Sensory details that heighten emotional stakes
- How space constrains or enables character actions

**Dialogue Mechanics:**
- Subtext: What characters say vs. what they mean
- Power dynamics shifting through conversation
- Information revealed and concealed strategically

**Pacing Techniques:**
- Sentence length variation for rhythm control
- Strategic use of white space and paragraph breaks
- Building to climactic moment through incremental reveals

**Emotional Choreography:**
- Character's internal state vs. external presentation
- Physical manifestations of psychological tension
- How other characters respond to unstated emotions

Write a 500-word scene demonstrating these principles, then provide a technical breakdown of your choices.`,
      isPro: true
    },
    {
      id: 3,
      slug: 'world-building-framework',
      category: 'writing',
      title: 'World-Building Framework',
      description: 'Systematic creation of immersive fictional universes',
      shortDescription: 'Build rich, consistent worlds that enhance your narrative',
      variables: ['GENRE', 'TIME_PERIOD'],
      prompt: `Develop a comprehensive world for [GENRE] fiction set in [TIME_PERIOD]:

**Physical Foundation:**
- Geography and climate systems
- Natural resources and their impact on civilization
- Architectural styles and urban planning
- Transportation and communication methods

**Social Architecture:**
- Power structures and governance systems
- Economic models and trade relationships
- Social hierarchies and class mobility
- Cultural traditions and belief systems

**Historical Context:**
- Three pivotal historical events that shaped current society
- Ongoing conflicts or tensions
- Recent innovations or discoveries
- Generational differences in worldview

**Daily Life Integration:**
- What a typical day looks like for different social classes
- Common foods, entertainment, and social rituals
- How your world's unique elements affect everyday experiences
- Seasonal or cyclical patterns that influence behavior

Create a world that feels lived-in and authentic, where every element serves the story's themes.`,
      isPro: false
    },
    {
      id: 4,
      slug: 'dialogue-mastery-system',
      category: 'writing',
      title: 'Dialogue Mastery System',
      description: 'Crafting authentic, purposeful conversations',
      shortDescription: 'Write dialogue that reveals character and advances plot',
      variables: ['CHARACTER_RELATIONSHIP', 'EMOTIONAL_SUBTEXT'],
      prompt: `Create a dialogue-driven scene between characters with [CHARACTER_RELATIONSHIP] where [EMOTIONAL_SUBTEXT] drives the conversation:

**Voice Differentiation:**
- Unique speech patterns for each character
- Educational background reflected in vocabulary
- Regional or cultural linguistic influences
- Generational speech differences

**Subtext Layers:**
- What characters want vs. what they say
- Power dynamics shifting through conversation
- Information they're hiding or revealing gradually
- Emotional undercurrents affecting word choice

**Functional Dialogue:**
- How each exchange moves the plot forward
- Character development through speech patterns
- Conflict escalation or resolution techniques
- Exposition delivered naturally through conversation

**Technical Craft:**
- Rhythm and pacing through sentence variation
- Strategic use of interruptions and pauses
- Tags and action beats that enhance meaning
- Silence as a powerful dialogue tool

Write a 400-word dialogue scene, then analyze how each exchange serves multiple narrative purposes.`,
      isPro: true
    },
    {
      id: 5,
      slug: 'plot-structure-architect',
      category: 'writing',
      title: 'Plot Structure Architect',
      description: 'Engineering compelling narrative progression',
      shortDescription: 'Design plot structures that keep readers engaged',
      variables: ['STORY_TYPE', 'THEME'],
      prompt: `Design a complete plot structure for a [STORY_TYPE] exploring the theme of [THEME]:

**Three-Act Framework:**
- Setup: Character introduction and world establishment
- Confrontation: Rising conflict and character testing
- Resolution: Climax and thematic conclusion

**Character Arc Integration:**
- How plot events force character growth
- Internal conflict mirroring external challenges
- Moments of choice that reveal true character
- Character change reflected in plot resolution

**Pacing Architecture:**
- Action beats vs. quiet character moments
- Information revelation timing
- Tension escalation patterns
- Reader engagement maintenance strategies

**Thematic Weaving:**
- How each plot point reinforces your theme
- Symbolic events and their deeper meanings
- Character decisions that embody thematic conflicts
- Resolution that provides thematic satisfaction

**Structural Variations:**
- Innovative approaches to traditional structure
- Non-linear timeline considerations
- Multiple POV integration strategies
- Genre-specific structural requirements

Create a detailed outline that balances character development with compelling plot progression.`,
      isPro: false
    },
    {
      id: 6,
      slug: 'voice-and-style-mastery',
      category: 'writing',
      title: 'Voice and Style Mastery',
      description: 'Developing distinctive narrative voice',
      shortDescription: 'Craft a unique writing voice that captivates readers',
      variables: ['POV_TYPE', 'TONE'],
      prompt: `Develop a distinctive narrative voice using [POV_TYPE] with a [TONE] approach:

**Voice Characteristics:**
- Sentence structure preferences and rhythms
- Vocabulary choices and register level
- Perspective on events and character judgments
- Humor, irony, or emotional coloring

**POV Mastery:**
- Access to character thoughts and knowledge
- Narrative distance and intimacy levels
- Information filtering and revelation control
- Reader connection and empathy building

**Style Consistency:**
- Maintaining voice across different scenes
- Adapting tone for various emotional moments
- Balancing description, dialogue, and action
- Genre conventions and voice expectations

**Technical Elements:**
- Metaphor and imagery patterns
- Rhythm and flow through sentence variation
- Transition techniques between scenes
- Paragraph structure and white space use

**Voice Evolution:**
- How voice reflects character growth
- Adapting to story's emotional trajectory
- Maintaining authenticity while showing change
- Reader engagement through voice development

Write three different scene openings in your chosen voice, each demonstrating different emotional registers while maintaining consistency.`,
      isPro: true
    },
    {
      id: 7,
      slug: 'conflict-escalation-engine',
      category: 'writing',
      title: 'Conflict Escalation Engine',
      description: 'Creating and intensifying dramatic conflict',
      shortDescription: 'Build tension that drives readers through your story',
      variables: ['CONFLICT_TYPE', 'STAKES'],
      prompt: `Design a conflict escalation system for [CONFLICT_TYPE] with [STAKES] at risk:

**Conflict Foundation:**
- Root cause and historical context
- Character motivations and opposing goals
- Initial stakes and potential consequences
- Relationship dynamics affecting conflict

**Escalation Ladder:**
- Progressive intensification stages
- Point of no return identification
- Complication introduction timing
- Character choice pressure points

**Character Integration:**
- How conflict tests each character uniquely
- Personal growth through adversity
- Relationship changes under pressure
- Character flaw exploitation by conflict

**Tension Maintenance:**
- Pacing between action and reflection
- False resolution and renewed conflict
- Reader expectation management
- Emotional investment deepening

**Resolution Architecture:**
- Multiple possible outcomes consideration
- Character agency in resolution
- Thematic satisfaction achievement
- Consequence acceptance and growth

Create a detailed conflict progression that maintains reader engagement while serving character development and thematic purposes.`,
      isPro: false
    },
    {
      id: 8,
      slug: 'setting-as-character',
      category: 'writing',
      title: 'Setting as Character',
      description: 'Making environments integral to storytelling',
      shortDescription: 'Create settings that actively participate in your narrative',
      variables: ['LOCATION_TYPE', 'MOOD'],
      prompt: `Transform [LOCATION_TYPE] into a character that embodies [MOOD] and drives narrative:

**Environmental Personality:**
- Physical characteristics that suggest emotion
- Historical events that shaped the location's "memory"
- Seasonal or temporal changes affecting atmosphere
- Unique features that influence plot development

**Sensory Immersion:**
- Specific smells, sounds, and textures
- Visual details that support theme and mood
- Tactile experiences that affect characters
- Taste and atmospheric elements

**Plot Integration:**
- How setting creates or solves problems
- Environmental obstacles and opportunities
- Setting changes that mirror character arcs
- Location-specific conflict possibilities

**Symbolic Resonance:**
- Metaphorical significance of environmental elements
- Setting details that foreshadow events
- Contrast between appearance and reality
- Thematic representation through physical space

**Character Interaction:**
- How different characters perceive the same space
- Setting's effect on character behavior and mood
- Memories and associations triggered by environment
- Power dynamics influenced by location

Write three scene descriptions of the same location at different story moments, showing how setting actively participates in narrative development.`,
      isPro: true
    },
    {
      id: 9,
      slug: 'narrative-hook-mastery',
      category: 'writing',
      title: 'Narrative Hook Mastery',
      description: 'Crafting irresistible story openings',
      shortDescription: 'Create openings that immediately engage readers',
      variables: ['GENRE', 'OPENING_TYPE'],
      prompt: `Create a compelling opening for [GENRE] using a [OPENING_TYPE] approach:

**Hook Varieties:**
- Action openings that thrust readers into conflict
- Character-focused beginnings revealing personality
- Setting openings that establish atmosphere
- Dialogue starts that intrigue and engage

**Reader Psychology:**
- Questions that demand answers
- Emotional investment creation strategies
- Expectation establishment and subversion
- Genre promise fulfillment

**Character Introduction:**
- Revealing personality through action/choice
- Establishing sympathy or intrigue
- Voice demonstration in first paragraphs
- Reader connection establishment techniques

**World Entry:**
- Essential information delivery without info-dumping
- Genre conventions and reader expectations
- Atmosphere and tone establishment
- Conflict or tension early introduction

**Technical Craft:**
- First sentence impact and memorability
- Paragraph flow and rhythm
- Scene setting efficiency
- Transition to second scene/chapter

Write five different opening paragraphs for the same story, demonstrating various hook approaches while maintaining story integrity.`,
      isPro: false
    },
    {
      id: 10,
      slug: 'character-relationship-dynamics',
      category: 'writing',
      title: 'Character Relationship Dynamics',
      description: 'Building complex interpersonal connections',
      shortDescription: 'Develop relationships that drive plot and character growth',
      variables: ['RELATIONSHIP_TYPE', 'CENTRAL_TENSION'],
      prompt: `Develop a complex [RELATIONSHIP_TYPE] relationship centered on [CENTRAL_TENSION]:

**Relationship Foundation:**
- Historical context and shared experiences
- Individual character needs and fears
- Power dynamics and dependency patterns
- Communication styles and conflict patterns

**Dynamic Evolution:**
- How relationship changes through story events
- Growth and regression cycles
- External pressures affecting connection
- Individual character arc impact on relationship

**Conflict Integration:**
- Relationship tensions serving plot advancement
- Personal conflicts reflecting story themes
- Character growth through relationship challenges
- Resolution possibilities and consequences

**Authentic Interaction:**
- Realistic dialogue and behavior patterns
- Non-verbal communication and subtext
- Intimate moments and relationship deepening
- Conflict styles and resolution attempts

**Character Development:**
- How each character changes the other
- Individual growth through relationship
- Relationship as character transformation catalyst
- Personal versus relationship needs balance

Create a relationship arc that spans your story's timeline, showing how external plot events test and transform the interpersonal connection.`,
      isPro: true
    },
    {
      id: 11,
      slug: 'theme-integration-system',
      category: 'writing',
      title: 'Theme Integration System',
      description: 'Weaving meaningful themes throughout narrative',
      shortDescription: 'Embed powerful themes naturally within your story',
      variables: ['CENTRAL_THEME', 'SYMBOLIC_ELEMENT'],
      prompt: `Integrate the theme of [CENTRAL_THEME] throughout your narrative using [SYMBOLIC_ELEMENT] as a recurring motif:

**Thematic Foundation:**
- Theme definition and personal significance
- Universal human experiences the theme explores
- Contemporary relevance and reader connection
- Subtlety versus directness in theme presentation

**Symbolic Development:**
- How your chosen element represents theme aspects
- Symbol evolution throughout story progression
- Character interaction with symbolic elements
- Reader recognition and interpretation guidance

**Plot Integration:**
- Story events that naturally explore theme
- Character decisions reflecting thematic conflicts
- Conflict resolution demonstrating theme
- Plot structure supporting thematic journey

**Character Embodiment:**
- Characters representing different theme perspectives
- Character growth reflecting thematic understanding
- Dialogue and action expressing theme naturally
- Character flaws and strengths serving theme

**Subtle Reinforcement:**
- Environmental details supporting theme
- Metaphor and imagery patterns
- Recurring situations or choices
- Ending that provides thematic satisfaction

Design a thematic integration plan that makes your story's meaning emerge naturally from character and plot rather than explicit statement.`,
      isPro: false
    },
    {
      id: 12,
      slug: 'ending-mastery-framework',
      category: 'writing',
      title: 'Ending Mastery Framework',
      description: 'Crafting satisfying and memorable conclusions',
      shortDescription: 'Write endings that resonate long after the final page',
      variables: ['ENDING_TYPE', 'EMOTIONAL_GOAL'],
      prompt: `Create a [ENDING_TYPE] ending that achieves [EMOTIONAL_GOAL] for your readers:

**Resolution Architecture:**
- Main conflict resolution and consequence integration
- Character arc completion and growth demonstration
- Subplot resolution and loose end tying
- Theme culmination and meaning crystallization

**Emotional Satisfaction:**
- Reader expectation fulfillment and surprise balance
- Emotional catharsis and reader investment payoff
- Character fate appropriateness to their journey
- Hope, closure, or contemplation as appropriate

**Technical Execution:**
- Pacing in final scenes and chapters
- Information revelation and withholding
- Action versus reflection balance
- Final image or line impact

**Reader Experience:**
- Memorable moments and lasting impressions
- Rereading value and new discovery potential
- Discussion and interpretation possibilities
- Emotional resonance extension beyond reading

**Ending Variations:**
- Open versus closed ending effectiveness
- Twist ending setup and execution
- Epilogue necessity and content
- Series consideration and standalone satisfaction

Write three different ending scenarios for the same story, analyzing how each serves different reader needs while maintaining story integrity.`,
      isPro: true
    },

    // Academic Research (15 prompts)
    {
      id: 13,
      slug: 'literature-review-synthesis-framework',
      category: 'research',
      title: 'Literature Review Synthesis Framework',
      description: 'Systematic approach to synthesizing scholarly sources',
      shortDescription: 'Comprehensive methodology for academic literature reviews',
      variables: ['RESEARCH_TOPIC', 'DISCIPLINE'],
      prompt: `Conduct a comprehensive literature review on [RESEARCH_TOPIC] within [DISCIPLINE] using this structured approach:

**Source Evaluation Matrix:**
- Categorize sources by methodology, theoretical framework, and conclusions
- Identify geographical, temporal, and demographic scope of studies
- Assess sample sizes, limitations, and potential biases

**Theoretical Landscape Mapping:**
- Major schools of thought and their key proponents
- Evolution of understanding over the past decade
- Competing theories and points of contention

**Gap Analysis:**
- Understudied populations or contexts
- Methodological limitations across the field
- Contradictory findings requiring further investigation

**Synthesis Structure:**
- Chronological development of key concepts
- Thematic clustering of related findings
- Critical evaluation of methodological approaches

**Research Questions Generation:**
- Three specific, answerable questions based on identified gaps
- Potential methodological approaches for each question
- Expected contributions to the field

Present findings in academic format with proper citations and clear argumentation.`,
      isPro: false
    },
    {
      id: 14,
      slug: 'methodology-design-blueprint',
      category: 'research',
      title: 'Methodology Design Blueprint',
      description: 'Creating robust research methodologies',
      shortDescription: 'Design rigorous methods for academic investigation',
      variables: ['RESEARCH_QUESTION', 'STUDY_TYPE'],
      prompt: `Design a comprehensive methodology for investigating [RESEARCH_QUESTION] using [STUDY_TYPE] approach:

**Research Design Foundation:**
- Epistemological and ontological positioning
- Justification for chosen methodological approach
- Integration of theoretical framework with methods
- Ethical considerations and approval requirements

**Data Collection Strategy:**
- Participant selection criteria and recruitment methods
- Sample size justification and power analysis
- Data collection instruments and validation
- Timeline and logistics planning

**Quality Assurance:**
- Validity and reliability measures
- Bias reduction strategies
- Triangulation methods for data verification
- Researcher reflexivity and positionality

**Analysis Framework:**
- Data analysis software and techniques
- Coding schemes and categorization systems
- Statistical or thematic analysis procedures
- Interpretation and meaning-making processes

**Limitations and Considerations:**
- Anticipated challenges and mitigation strategies
- Generalizability and transferability assessment
- Resource requirements and constraints
- Alternative approaches consideration

Create a methodology that demonstrates scholarly rigor while remaining feasible within practical constraints.`,
      isPro: true
    },
    {
      id: 15,
      slug: 'primary-source-analysis-protocol',
      category: 'research',
      title: 'Primary Source Analysis Protocol',
      description: 'Rigorous methodology for analyzing historical and archival materials',
      shortDescription: 'Systematic framework for primary source interpretation',
      variables: ['SOURCE_TYPE', 'TIME_PERIOD'],
      prompt: `Analyze [SOURCE_TYPE] from [TIME_PERIOD] using systematic historical methodology:

**Source Contextualization:**
- Author's position, biases, and intended audience
- Historical moment and its influence on content
- Genre conventions and their impact on presentation
- Cultural and social context affecting interpretation

**Content Analysis Layers:**
- Explicit arguments and stated positions
- Implicit assumptions and unstated beliefs
- Rhetorical strategies and persuasive techniques
- Symbolic language and metaphorical content

**Corroboration Strategy:**
- Cross-reference with contemporary sources
- Identify confirming and contradicting evidence
- Assess representativeness within historical context
- Compare with secondary scholarship

**Critical Interpretation:**
- What the source reveals about its time period
- Limitations and silences in the documentation
- How the source fits within broader historical narratives
- Multiple possible interpretations consideration

**Modern Relevance:**
- Connections to contemporary issues or debates
- Methodological lessons for current research
- Ethical considerations in interpretation and use
- Historiographical significance and contribution

Provide specific examples and quotations to support your analysis, maintaining scholarly objectivity while acknowledging interpretive frameworks.`,
      isPro: false
    },
    {
      id: 16,
      slug: 'qualitative-data-analysis-engine',
      category: 'research',
      title: 'Qualitative Data Analysis Engine',
      description: 'Systematic approach to interview and observation data',
      shortDescription: 'Transform qualitative data into meaningful insights',
      variables: ['DATA_TYPE', 'ANALYTICAL_APPROACH'],
      prompt: `Analyze [DATA_TYPE] using [ANALYTICAL_APPROACH] methodology:

**Data Preparation:**
- Transcription accuracy and formatting standards
- Initial coding scheme development
- Participant anonymization protocols
- Quality checks and verification processes

**Coding Strategy:**
- Open coding for emergent themes
- Axial coding for relationship identification
- Selective coding for core category development
- Constant comparative method application

**Pattern Recognition:**
- Frequency analysis of themes and concepts
- Divergent case analysis for theory refinement
- Saturation point identification
- Member checking and validation procedures

**Theoretical Development:**
- Conceptual framework emergence from data
- Relationship mapping between themes
- Theory building and hypothesis generation
- Literature integration with findings

**Reliability and Validity:**
- Inter-rater reliability establishment
- Audit trail documentation
- Triangulation with multiple data sources
- Reflexivity and researcher bias acknowledgment

Present findings with supporting quotations while maintaining participant confidentiality and demonstrating analytical rigor.`,
      isPro: true
    },
    {
      id: 17,
      slug: 'quantitative-analysis-framework',
      category: 'research',
      title: 'Quantitative Analysis Framework',
      description: 'Statistical analysis for empirical research',
      shortDescription: 'Design and execute robust statistical investigations',
      variables: ['RESEARCH_HYPOTHESIS', 'DATA_TYPE'],
      prompt: `Design a quantitative analysis to test [RESEARCH_HYPOTHESIS] using [DATA_TYPE]:

**Statistical Design:**
- Hypothesis formulation and operationalization
- Variable identification and measurement scales
- Sample size calculation and power analysis
- Control variable selection and justification

**Data Collection Protocol:**
- Instrument design and validation procedures
- Sampling strategy and representativeness
- Data quality assurance measures
- Missing data handling strategies

**Analysis Strategy:**
- Descriptive statistics and data exploration
- Assumption testing for chosen statistical tests
- Primary analysis techniques selection
- Secondary and sensitivity analyses

**Results Interpretation:**
- Effect size calculation and practical significance
- Confidence intervals and uncertainty quantification
- Clinical or practical significance assessment
- Limitation acknowledgment and discussion

**Reporting Standards:**
- Statistical reporting guidelines adherence
- Table and figure design for clarity
- Results presentation without interpretation bias
- Replication information and data availability

Create an analysis plan that demonstrates statistical literacy while addressing real-world research questions meaningfully.`,
      isPro: false
    },
    {
      id: 18,
      slug: 'mixed-methods-integration',
      category: 'research',
      title: 'Mixed Methods Integration',
      description: 'Combining qualitative and quantitative approaches',
      shortDescription: 'Leverage multiple methodologies for comprehensive understanding',
      variables: ['RESEARCH_PROBLEM', 'INTEGRATION_STRATEGY'],
      prompt: `Design a mixed methods study addressing [RESEARCH_PROBLEM] using [INTEGRATION_STRATEGY]:

**Philosophical Foundation:**
- Paradigmatic positioning and justification
- Integration rationale and added value
- Timing and priority decisions
- Methodological compatibility assessment

**Sequential Design:**
- Phase sequencing and dependency relationships
- Data collection timeline and logistics
- Sample relationship between phases
- Integration points throughout study

**Data Integration:**
- Convergent analysis and triangulation
- Complementary findings synthesis
- Discrepancy resolution strategies
- Meta-inference development

**Quality Criteria:**
- Validity across methodological approaches
- Legitimation strategies for integration
- Transferability and generalizability
- Methodological rigor maintenance

**Reporting Integration:**
- Joint displays and visual integration
- Narrative weaving of findings
- Multiple audience consideration
- Contribution demonstration to field

Design a study that demonstrates how methodological integration provides insights unavailable through single-method approaches.`,
      isPro: true
    },
    {
      id: 19,
      slug: 'research-ethics-framework',
      category: 'research',
      title: 'Research Ethics Framework',
      description: 'Navigating ethical considerations in academic research',
      shortDescription: 'Ensure ethical integrity throughout research process',
      variables: ['RESEARCH_CONTEXT', 'PARTICIPANT_TYPE'],
      prompt: `Develop an ethical framework for research in [RESEARCH_CONTEXT] involving [PARTICIPANT_TYPE]:

**Ethical Principle Application:**
- Beneficence and non-maleficence in research design
- Justice in participant selection and benefit distribution
- Respect for persons and autonomy protection
- Cultural sensitivity and community consideration

**Informed Consent Process:**
- Information provision and comprehension assessment
- Voluntary participation and withdrawal rights
- Ongoing consent in longitudinal studies
- Special considerations for vulnerable populations

**Risk Assessment:**
- Physical, psychological, and social risk identification
- Risk-benefit analysis and mitigation strategies
- Confidentiality and anonymity protection
- Data security and storage protocols

**Community Engagement:**
- Stakeholder involvement in research design
- Community benefit and reciprocity
- Cultural protocols and respect
- Dissemination and feedback strategies

**Institutional Requirements:**
- IRB approval process and documentation
- Professional guidelines adherence
- Legal requirements and compliance
- Ongoing monitoring and reporting

Create an ethics protocol that demonstrates commitment to participant welfare while enabling meaningful research contribution.`,
      isPro: false
    },
    {
      id: 20,
      slug: 'systematic-review-protocol',
      category: 'research',
      title: 'Systematic Review Protocol',
      description: 'Conducting comprehensive systematic literature reviews',
      shortDescription: 'Master the gold standard of literature synthesis',
      variables: ['REVIEW_QUESTION', 'INCLUSION_CRITERIA'],
      prompt: `Conduct a systematic review addressing [REVIEW_QUESTION] with [INCLUSION_CRITERIA]:

**Protocol Development:**
- PICO framework application for review question
- Inclusion and exclusion criteria specification
- Search strategy development and database selection
- Review registration and protocol publication

**Search and Selection:**
- Comprehensive database and grey literature searching
- Citation tracking and reference list reviewing
- Duplicate removal and screening procedures
- Inter-reviewer reliability for selection decisions

**Quality Assessment:**
- Risk of bias assessment tools selection
- Study quality evaluation criteria
- Quality rating and weight assignment
- Sensitivity analysis based on study quality

**Data Extraction:**
- Standardized extraction form development
- Multiple reviewer extraction and verification
- Contact with authors for missing information
- Data management and organization systems

**Synthesis and Analysis:**
- Narrative synthesis techniques
- Meta-analysis feasibility assessment
- Heterogeneity evaluation and exploration
- Subgroup and sensitivity analyses

Produce a systematic review that meets PRISMA guidelines and contributes meaningful evidence synthesis to your field.`,
      isPro: true
    },
    {
      id: 21,
      slug: 'grant-proposal-architecture',
      category: 'research',
      title: 'Grant Proposal Architecture',
      description: 'Crafting competitive funding applications',
      shortDescription: 'Design proposals that secure research funding',
      variables: ['FUNDING_AGENCY', 'RESEARCH_PROJECT'],
      prompt: `Develop a compelling grant proposal for [FUNDING_AGENCY] supporting [RESEARCH_PROJECT]:

**Project Significance:**
- Problem importance and urgency demonstration
- Gap in current knowledge identification
- Potential impact and beneficiaries
- Alignment with funder priorities and mission

**Innovation and Approach:**
- Novel methodological or theoretical contributions
- Feasibility demonstration with preliminary data
- Risk assessment and mitigation strategies
- Timeline and milestone specification

**Research Team:**
- Principal investigator qualifications and track record
- Team member expertise and role justification
- Institutional support and resources
- Collaboration and partnership benefits

**Budget Justification:**
- Detailed cost breakdown and rationale
- Cost-effectiveness demonstration
- Indirect cost negotiation
- Multi-year funding sustainability

**Dissemination Plan:**
- Academic publication strategy
- Community engagement and outreach
- Policy implications and recommendations
- Knowledge translation and implementation

Create a proposal that demonstrates both scientific rigor and practical impact while meeting specific funder requirements.`,
      isPro: false
    },
    {
      id: 22,
      slug: 'research-question-formulation',
      category: 'research',
      title: 'Research Question Formulation',
      description: 'Crafting precise and answerable research questions',
      shortDescription: 'Develop questions that drive meaningful inquiry',
      variables: ['BROAD_TOPIC', 'RESEARCH_CONTEXT'],
      prompt: `Transform the broad topic of [BROAD_TOPIC] into precise research questions for [RESEARCH_CONTEXT]:

**Question Hierarchy:**
- Overarching research goal and purpose
- Primary research questions driving investigation
- Secondary questions supporting main inquiry
- Operational questions guiding data collection

**SMART Criteria Application:**
- Specific focus and clear boundaries
- Measurable outcomes and indicators
- Achievable within resource constraints
- Relevant to field and stakeholder needs
- Time-bound with realistic completion timeline

**Methodological Alignment:**
- Question type and appropriate methodology matching
- Data requirements and collection feasibility
- Analysis techniques and interpretation possibilities
- Ethical considerations emerging from questions

**Theoretical Grounding:**
- Connection to existing literature and theory
- Conceptual framework development
- Variable identification and relationship specification
- Hypothesis generation where appropriate

**Stakeholder Relevance:**
- Academic contribution and knowledge advancement
- Practical applications and policy implications
- Community benefit and social impact
- Long-term research program development

Develop a research question framework that balances theoretical significance with practical feasibility and social relevance.`,
      isPro: true
    },
    {
      id: 23,
      slug: 'data-visualization-strategy',
      category: 'research',
      title: 'Data Visualization Strategy',
      description: 'Communicating research findings through visual design',
      shortDescription: 'Transform data into compelling visual narratives',
      variables: ['DATA_TYPE', 'AUDIENCE'],
      prompt: `Design a visualization strategy for [DATA_TYPE] targeting [AUDIENCE]:

**Visualization Selection:**
- Chart type appropriateness for data structure
- Audience expertise and visualization literacy
- Story narrative and key message emphasis
- Cultural and contextual considerations

**Design Principles:**
- Color theory and accessibility compliance
- Typography and readability optimization
- White space and layout effectiveness
- Visual hierarchy and attention guidance

**Data Integrity:**
- Accurate representation without distortion
- Uncertainty and confidence interval display
- Scale appropriateness and baseline consideration
- Missing data acknowledgment and handling

**Interactive Elements:**
- User engagement and exploration features
- Progressive disclosure of complexity
- Filtering and customization options
- Mobile and platform compatibility

**Narrative Integration:**
- Caption and annotation effectiveness
- Sequential revelation for complex stories
- Context provision and interpretation guidance
- Call-to-action and next steps clarity

Create visualizations that enhance understanding while maintaining scientific integrity and engaging your target audience effectively.`,
      isPro: false
    },
    {
      id: 24,
      slug: 'peer-review-excellence',
      category: 'research',
      title: 'Peer Review Excellence',
      description: 'Conducting thorough and constructive manuscript reviews',
      shortDescription: 'Master the art of scholarly peer evaluation',
      variables: ['MANUSCRIPT_TYPE', 'REVIEW_FOCUS'],
      prompt: `Conduct a comprehensive peer review of a [MANUSCRIPT_TYPE] focusing on [REVIEW_FOCUS]:

**Initial Assessment:**
- Manuscript scope and journal fit evaluation
- Originality and contribution significance
- Methodological soundness overview
- Writing quality and organization assessment

**Content Evaluation:**
- Literature review comprehensiveness and currency
- Theoretical framework appropriateness
- Methodology rigor and replicability
- Results presentation clarity and accuracy

**Critical Analysis:**
- Argument logic and evidence support
- Limitation acknowledgment and discussion
- Alternative explanation consideration
- Conclusion justification and appropriateness

**Constructive Feedback:**
- Specific improvement suggestions with examples
- Resource recommendations for enhancement
- Structural and organizational advice
- Writing and presentation improvements

**Professional Standards:**
- Confidentiality and ethical obligations
- Respectful and supportive tone maintenance
- Expertise boundary acknowledgment
- Timeline adherence and communication

Provide review feedback that helps authors improve their work while maintaining scholarly standards and advancing field knowledge.`,
      isPro: true
    },
    {
      id: 25,
      slug: 'research-impact-assessment',
      category: 'research',
      title: 'Research Impact Assessment',
      description: 'Measuring and communicating research significance',
      shortDescription: 'Demonstrate the value and reach of academic work',
      variables: ['RESEARCH_AREA', 'IMPACT_TYPE'],
      prompt: `Assess and communicate the impact of research in [RESEARCH_AREA] focusing on [IMPACT_TYPE]:

**Impact Measurement:**
- Citation analysis and scholarly influence
- Alternative metrics and social media reach
- Policy uptake and implementation evidence
- Media coverage and public engagement

**Stakeholder Analysis:**
- Academic community benefit identification
- Practitioner and professional applications
- Public and community impact assessment
- Policy maker and decision maker influence

**Evidence Collection:**
- Quantitative metrics and trend analysis
- Qualitative testimonials and case studies
- Longitudinal tracking and follow-up
- Comparative assessment with similar research

**Communication Strategy:**
- Academic audience impact demonstration
- Public understanding and accessibility
- Funder reporting and accountability
- Career development and promotion support

**Future Planning:**
- Impact enhancement strategies
- Dissemination improvement opportunities
- Collaboration and partnership development
- Long-term influence sustainability

Create an impact assessment that demonstrates research value across multiple dimensions while planning for enhanced future influence.`,
      isPro: false
    },
    {
      id: 26,
      slug: 'interdisciplinary-research-design',
      category: 'research',
      title: 'Interdisciplinary Research Design',
      description: 'Bridging knowledge across academic disciplines',
      shortDescription: 'Create research that transcends traditional boundaries',
      variables: ['PRIMARY_DISCIPLINE', 'SECONDARY_DISCIPLINE'],
      prompt: `Design an interdisciplinary study integrating [PRIMARY_DISCIPLINE] and [SECONDARY_DISCIPLINE]:

**Conceptual Integration:**
- Theoretical framework synthesis from multiple fields
- Methodological approach compatibility assessment
- Common ground identification and boundary spanning
- Disciplinary language and concept translation

**Collaboration Structure:**
- Team composition and expertise representation
- Communication protocols and regular interaction
- Decision-making processes and conflict resolution
- Intellectual property and authorship agreements

**Methodological Synthesis:**
- Multi-method approach design and integration
- Data collection across disciplinary boundaries
- Analysis technique combination and validation
- Quality criteria from multiple traditions

**Knowledge Translation:**
- Findings interpretation for multiple audiences
- Disciplinary contribution articulation
- Bridge-building between field vocabularies
- Innovation through disciplinary intersection

**Institutional Navigation:**
- Funding opportunity identification and application
- Publication venue selection and strategy
- Career development in interdisciplinary context
- Institutional support and resource access

Develop research that demonstrates how disciplinary integration creates knowledge unavailable through single-discipline approaches.`,
      isPro: true
    },
    {
      id: 27,
      slug: 'replication-study-framework',
      category: 'research',
      title: 'Replication Study Framework',
      description: 'Designing studies that verify and extend existing research',
      shortDescription: 'Strengthen scientific knowledge through replication',
      variables: ['ORIGINAL_STUDY', 'REPLICATION_TYPE'],
      prompt: `Design a [REPLICATION_TYPE] replication of [ORIGINAL_STUDY]:

**Replication Planning:**
- Original study analysis and method extraction
- Replication type justification and goals
- Resource requirement assessment
- Timeline and feasibility evaluation

**Methodological Fidelity:**
- Procedure replication accuracy
- Material and instrument equivalence
- Population and sampling considerations
- Context and setting appropriateness

**Innovation Opportunities:**
- Extension and improvement possibilities
- Additional measures and analysis inclusion
- Generalizability testing across contexts
- Technology and method advancement integration

**Statistical Considerations:**
- Power analysis and sample size planning
- Effect size estimation and precision
- Multiple testing and error rate control
- Equivalence versus significance testing

**Contribution Framework:**
- Original finding confirmation or disconfirmation
- Boundary condition identification
- Theory refinement and development
- Field advancement through replication

Create a replication study that both verifies existing knowledge and contributes new insights to scientific understanding.`,
      isPro: false
    },

    // Literary Analysis (10 prompts)
    {
      id: 28,
      slug: 'narrative-structure-deconstruction',
      category: 'analysis',
      title: 'Narrative Structure Deconstruction',
      description: 'Advanced analysis of storytelling techniques and their effects',
      shortDescription: 'Systematic framework for analyzing literary structure',
      variables: ['LITERARY_WORK', 'AUTHOR'],
      prompt: `Perform a comprehensive structural analysis of "[LITERARY_WORK]" by [AUTHOR]:

**Temporal Architecture:**
- Chronological vs. narrative time manipulation
- Flashbacks, foreshadowing, and their strategic purposes
- Pacing variations and their emotional impact

**Point of View Mechanics:**
- Narrator reliability and perspective limitations
- How POV shapes reader understanding and sympathy
- Moments where perspective shifts or expands

**Symbolic Systems:**
- Recurring motifs and their evolution throughout the text
- Color, weather, objects as meaning-carriers
- How symbols interact with character development

**Language and Style:**
- Sentence structure patterns and their effects
- Diction choices and register variations
- How style reflects or contrasts with content

**Thematic Architecture:**
- Central themes and their interconnections
- How plot events illuminate larger ideas
- Unresolved tensions and their interpretive possibilities

Support analysis with specific textual evidence and consider multiple valid interpretations.`,
      isPro: false
    },
    {
      id: 29,
      slug: 'character-psychology-framework',
      category: 'analysis',
      title: 'Character Psychology Framework',
      description: 'Deep psychological analysis of literary characters',
      shortDescription: 'Uncover the complex psychology driving character behavior',
      variables: ['CHARACTER_NAME', 'PSYCHOLOGICAL_THEORY'],
      prompt: `Analyze [CHARACTER_NAME] using [PSYCHOLOGICAL_THEORY] as an interpretive framework:

**Psychological Profile Construction:**
- Childhood experiences and formative events
- Defense mechanisms and coping strategies
- Unconscious motivations and repressed desires
- Relationship patterns and attachment styles

**Behavioral Analysis:**
- Action patterns and decision-making processes
- Speech patterns revealing psychological states
- Body language and non-verbal communication
- Response to stress and conflict situations

**Character Development Arc:**
- Psychological growth or regression throughout narrative
- Moments of self-awareness and insight
- Resistance to change and psychological barriers
- Integration of conscious and unconscious elements

**Theoretical Application:**
- How chosen theory illuminates character behavior
- Textual evidence supporting psychological interpretation
- Alternative theoretical perspectives consideration
- Theory limitations and character complexity

**Literary Function:**
- How character psychology serves thematic purposes
- Reader identification and emotional investment
- Character as representative of universal human experiences
- Psychological realism versus symbolic function

Create a character analysis that demonstrates sophisticated understanding of both psychology and literary technique.`,
      isPro: true
    },
    {
      id: 30,
      slug: 'comparative-literature-framework',
      category: 'analysis',
      title: 'Comparative Literature Framework',
      description: 'Cross-cultural and cross-temporal literary analysis',
      shortDescription: 'Analyze connections across different literary traditions',
      variables: ['WORK_ONE', 'WORK_TWO'],
      prompt: `Compare and contrast [WORK_ONE] and [WORK_TWO] across cultural and temporal boundaries:

**Cultural Context Analysis:**
- Historical and social circumstances of each work
- Cultural values and worldviews reflected
- Translation considerations and their impact
- Reception history in different contexts

**Formal Comparison:**
- Narrative techniques and structural choices
- Linguistic features and stylistic elements
- Genre conventions and innovations
- Symbolic systems and their cultural specificity

**Thematic Synthesis:**
- Universal human experiences explored
- Culture-specific interpretations and emphases
- Evolution of themes across time periods
- Contemporary relevance and applications

**Intertextual Relationships:**
- Direct influences and literary dialogue
- Shared sources and common traditions
- Parallel development in different contexts
- Reader response across cultures

**Critical Perspectives:**
- Postcolonial, feminist, or other theoretical lenses
- Power dynamics and cultural representation
- Canon formation and literary value systems
- Global literature and world literary studies

Demonstrate sophisticated understanding of both works while avoiding cultural bias or oversimplification.`,
      isPro: false
    },
    {
      id: 31,
      slug: 'symbol-and-metaphor-mastery',
      category: 'analysis',
      title: 'Symbol and Metaphor Mastery',
      description: 'Decoding symbolic language and metaphorical systems',
      shortDescription: 'Uncover hidden meanings in literary imagery',
      variables: ['LITERARY_WORK', 'SYMBOLIC_ELEMENT'],
      prompt: `Analyze the symbolic significance of [SYMBOLIC_ELEMENT] in [LITERARY_WORK]:

**Symbol Development:**
- Initial introduction and context establishment
- Evolution and transformation throughout narrative
- Multiple layers of meaning and interpretation
- Connection to character development and plot

**Cultural and Historical Resonance:**
- Traditional symbolic associations and meanings
- Author's cultural background influence
- Historical period symbolism and conventions
- Reader cultural context affecting interpretation

**Textual Integration:**
- Frequency and placement patterns
- Relationship to other symbols and motifs
- Contribution to overall thematic structure
- Style and language supporting symbolic meaning

**Interpretive Analysis:**
- Multiple valid interpretations consideration
- Ambiguity and symbolic richness
- Reader response and meaning construction
- Critical tradition and scholarly interpretation

**Literary Function:**
- How symbolism enhances theme and meaning
- Reader engagement and interpretive depth
- Artistic achievement and symbolic innovation
- Symbol effectiveness and resonance

Create an analysis that demonstrates how symbolic elements contribute to literary meaning while acknowledging interpretive complexity.`,
      isPro: true
    },
    {
      id: 32,
      slug: 'genre-theory-application',
      category: 'analysis',
      title: 'Genre Theory Application',
      description: 'Analyzing works through genre conventions and innovations',
      shortDescription: 'Examine how texts engage with literary traditions',
      variables: ['LITERARY_WORK', 'GENRE'],
      prompt: `Analyze how [LITERARY_WORK] engages with [GENRE] conventions:

**Genre Convention Analysis:**
- Traditional genre characteristics and expectations
- Structural patterns and narrative formulas
- Character types and archetypal roles
- Thematic concerns and ideological implications

**Innovation and Subversion:**
- Departures from traditional conventions
- Creative adaptations and modifications
- Subversive elements and genre critique
- Hybrid forms and boundary crossing

**Reader Expectations:**
- Genre knowledge and reader competence
- Satisfaction and frustration of expectations
- Genre pleasure and reading experience
- Commercial and artistic considerations

**Cultural Context:**
- Genre development and historical evolution
- Social and political influences on genre
- Audience and market factors
- Genre prestige and literary value

**Theoretical Framework:**
- Genre theory and critical approaches
- Formalist versus historical perspectives
- Genre as constraint versus creative opportunity
- Postmodern genre play and metafiction

Demonstrate understanding of how genre functions as both literary framework and cultural institution.`,
      isPro: false
    },
    {
      id: 33,
      slug: 'feminist-literary-criticism',
      category: 'analysis',
      title: 'Feminist Literary Criticism',
      description: 'Examining gender dynamics and representation in literature',
      shortDescription: 'Analyze texts through feminist critical perspectives',
      variables: ['LITERARY_WORK', 'FEMINIST_APPROACH'],
      prompt: `Apply [FEMINIST_APPROACH] feminist criticism to analyze [LITERARY_WORK]:

**Gender Representation Analysis:**
- Female character development and agency
- Male character construction and masculinity
- Gender role expectations and transgressions
- Intersectionality with race, class, and sexuality

**Narrative Power Dynamics:**
- Who tells the story and whose voice is heard
- Silences and marginalized perspectives
- Language and discourse patterns
- Reader positioning and identification

**Textual Politics:**
- Ideological implications of plot and structure
- Romance, marriage, and domestic themes
- Work, public sphere, and economic independence
- Violence, sexuality, and bodily autonomy

**Historical and Cultural Context:**
- Women's social position during writing period
- Feminist movements and consciousness
- Publication and reception history
- Author's biographical context and influence

**Critical Methodology:**
- Theoretical framework application
- Evidence selection and interpretation
- Alternative readings and counter-arguments
- Contemporary relevance and ongoing significance

Create an analysis that demonstrates sophisticated feminist critical thinking while engaging respectfully with textual complexity.`,
      isPro: true
    },
    {
      id: 34,
      slug: 'postcolonial-reading-strategy',
      category: 'analysis',
      title: 'Postcolonial Reading Strategy',
      description: 'Analyzing literature through postcolonial theoretical frameworks',
      shortDescription: 'Examine power, identity, and resistance in colonial contexts',
      variables: ['LITERARY_WORK', 'COLONIAL_CONTEXT'],
      prompt: `Conduct a postcolonial analysis of [LITERARY_WORK] within [COLONIAL_CONTEXT]:

**Colonial Discourse Analysis:**
- Representation of colonized peoples and cultures
- Imperial ideology and justification narratives
- Othering strategies and stereotyping patterns
- Language, education, and cultural domination

**Power Structure Examination:**
- Economic exploitation and resource extraction
- Political control and administrative systems
- Social hierarchy and racial classification
- Religious and cultural conversion efforts

**Resistance and Agency:**
- Forms of resistance and counter-narrative
- Cultural preservation and adaptation strategies
- Language reclamation and linguistic choices
- Identity negotiation and hybrid formations

**Textual Politics:**
- Whose story is told and how
- Narrative authority and perspective
- Silenced voices and marginalized experiences
- Reader positioning and identification

**Contemporary Relevance:**
- Ongoing effects of colonial history
- Neocolonialism and global power structures
- Cultural appropriation and representation ethics
- Decolonization movements and initiatives

Develop an analysis that demonstrates understanding of postcolonial theory while respecting cultural complexity and avoiding essentialization.`,
      isPro: false
    },
    {
      id: 35,
      slug: 'psychoanalytic-interpretation',
      category: 'analysis',
      title: 'Psychoanalytic Interpretation',
      description: 'Applying psychoanalytic theory to literary analysis',
      shortDescription: 'Uncover unconscious elements in literary texts',
      variables: ['LITERARY_WORK', 'PSYCHOANALYTIC_CONCEPT'],
      prompt: `Apply [PSYCHOANALYTIC_CONCEPT] to interpret [LITERARY_WORK]:

**Unconscious Elements:**
- Repressed desires and forbidden impulses
- Dream symbolism and wish fulfillment
- Slips, gaps, and textual unconscious
- Return of the repressed in narrative

**Character Psychology:**
- Oedipal dynamics and family relationships
- Defense mechanisms and psychological coping
- Trauma and its textual manifestations
- Identity formation and ego development

**Symbolic Analysis:**
- Sexual symbolism and erotic undertones
- Death drive and destruction impulses
- Narcissism and object relations
- Castration anxiety and lack

**Textual Dynamics:**
- Reader identification and transference
- Author psychology and creative process
- Genre and form psychological functions
- Reception and interpretation psychology

**Critical Application:**
- Theoretical framework sophistication
- Evidence and interpretation balance
- Alternative readings consideration
- Contemporary psychoanalytic developments

Create an interpretation that demonstrates psychoanalytic literacy while maintaining textual grounding and critical sophistication.`,
      isPro: true
    },
    {
      id: 36,
      slug: 'marxist-literary-analysis',
      category: 'analysis',
      title: 'Marxist Literary Analysis',
      description: 'Examining class, economics, and ideology in literature',
      shortDescription: 'Analyze texts through Marxist critical frameworks',
      variables: ['LITERARY_WORK', 'CLASS_FOCUS'],
      prompt: `Conduct a Marxist analysis of [LITERARY_WORK] focusing on [CLASS_FOCUS]:

**Economic Base Analysis:**
- Material conditions and economic systems
- Labor relations and exploitation patterns
- Wealth distribution and class stratification
- Commodity fetishism and reification

**Ideological Critique:**
- Dominant ideology reinforcement or challenge
- False consciousness and mystification
- Hegemony and consent manufacturing
- Revolutionary potential and limitations

**Class Dynamics:**
- Bourgeoisie representation and interests
- Working class portrayal and agency
- Class conflict and struggle depiction
- Social mobility myths and realities

**Cultural Production:**
- Literature as commodity and cultural product
- Patronage, publishing, and market forces
- Author class position and consciousness
- Reader class identification and reception

**Historical Materialism:**
- Historical context and social formation
- Mode of production and cultural superstructure
- Change mechanisms and revolutionary potential
- Dialectical thinking and contradiction analysis

Develop an analysis that demonstrates Marxist critical sophistication while engaging meaningfully with textual specificity.`,
      isPro: false
    },
    {
      id: 37,
      slug: 'reader-response-theory',
      category: 'analysis',
      title: 'Reader Response Theory',
      description: 'Exploring how readers create meaning through interpretation',
      shortDescription: 'Examine the active role of readers in literary meaning',
      variables: ['LITERARY_WORK', 'READER_COMMUNITY'],
      prompt: `Analyze how [READER_COMMUNITY] creates meaning from [LITERARY_WORK]:

**Reader Construction of Meaning:**
- Individual interpretation strategies and patterns
- Personal experience influence on reading
- Cultural background shaping understanding
- Emotional response and engagement levels

**Text-Reader Interaction:**
- Gaps and indeterminacies requiring reader participation
- Reading process and interpretation development
- Multiple valid interpretations coexistence
- Reader expectations and genre knowledge

**Interpretive Communities:**
- Shared reading practices and conventions
- Professional versus amateur interpretation
- Institutional influence on meaning-making
- Power dynamics in interpretation authority

**Reception History:**
- Historical interpretation changes over time
- Different audience responses across periods
- Censorship, controversy, and public reaction
- Canon formation and value assessment

**Reading Process Analysis:**
- First-time versus rereading experiences
- Prediction, revision, and meaning adjustment
- Memory and interpretation relationship
- Reading context and environmental factors

Create an analysis that demonstrates understanding of reader agency while maintaining respect for textual constraints and interpretive validity.`,
      isPro: true
    },

    // Essay Writing (14 prompts)
    {
      id: 38,
      slug: 'argumentative-essay-architecture',
      category: 'essays',
      title: 'Argumentative Essay Architecture',
      description: 'Building compelling, evidence-based arguments',
      shortDescription: 'Master persuasive essay structure and argumentation',
      variables: ['TOPIC', 'TARGET_AUDIENCE'],
      prompt: `Construct a persuasive argumentative essay on [TOPIC] for [TARGET_AUDIENCE]:

**Thesis Development:**
- Clear, debatable central claim
- Preview of main supporting arguments
- Acknowledgment of complexity or nuance

**Evidence Integration:**
- Primary and secondary source material
- Statistical data with proper interpretation
- Expert testimony and its credibility
- Historical precedents and analogies

**Counterargument Strategy:**
- Strongest opposing viewpoints
- Fair representation of alternative positions
- Specific refutation with evidence
- Concessions where appropriate

**Logical Flow:**
- Each paragraph advances the central argument
- Smooth transitions between ideas
- Building intensity toward conclusion
- Addressing reader's potential questions

**Rhetorical Effectiveness:**
- Appropriate tone for intended audience
- Emotional appeals balanced with logic
- Credibility establishment and maintenance
- Call to action or implications for readers

Write 1200-1500 words demonstrating sophisticated reasoning and engaging prose.`,
      isPro: false
    },
    {
      id: 39,
      slug: 'analytical-essay-mastery',
      category: 'essays',
      title: 'Analytical Essay Mastery',
      description: 'Deep analysis and interpretation of complex topics',
      shortDescription: 'Break down complex subjects with clarity and insight',
      variables: ['SUBJECT', 'ANALYTICAL_APPROACH'],
      prompt: `Develop an analytical essay examining [SUBJECT] using [ANALYTICAL_APPROACH]:

**Analysis Framework:**
- Clear definition of analytical approach and methodology
- Systematic breakdown of subject into components
- Relationship identification between elements
- Pattern recognition and significance assessment

**Evidence and Support:**
- Primary source integration and close reading
- Secondary scholarship engagement and synthesis
- Data interpretation and statistical analysis
- Multiple perspective consideration and evaluation

**Critical Thinking:**
- Assumption identification and examination
- Bias recognition in sources and interpretation
- Alternative explanation exploration
- Limitation acknowledgment and honest assessment

**Interpretive Depth:**
- Surface versus deeper meaning exploration
- Context influence on interpretation
- Implication and consequence consideration
- Broader significance and relevance

**Scholarly Engagement:**
- Academic conversation participation
- Contribution to existing knowledge
- Theoretical framework application
- Methodological sophistication demonstration

Create an analysis that demonstrates intellectual rigor while remaining accessible to your intended audience.`,
      isPro: true
    },
    {
      id: 40,
      slug: 'compare-and-contrast-framework',
      category: 'essays',
      title: 'Compare and Contrast Framework',
      description: 'Sophisticated comparison analysis structure',
      shortDescription: 'Illuminate insights through systematic comparison',
      variables: ['SUBJECT_A', 'SUBJECT_B'],
      prompt: `Compare and contrast [SUBJECT_A] and [SUBJECT_B] using sophisticated analytical structure:

**Comparison Framework:**
- Clear criteria for comparison establishment
- Point-by-point versus block organization decision
- Balanced treatment of both subjects
- Significance of comparison justification

**Similarity Analysis:**
- Fundamental shared characteristics identification
- Underlying pattern or principle recognition
- Common origins or influences exploration
- Parallel development or evolution

**Difference Examination:**
- Key distinguishing features analysis
- Cause and effect of differences
- Contextual factors creating distinctions
- Significance of differences assessment

**Synthesis and Insight:**
- What comparison reveals about both subjects
- Broader implications and generalizations
- New understanding through juxtaposition
- Unexpected connections or revelations

**Evaluative Conclusion:**
- Relative strengths and weaknesses
- Situational appropriateness or effectiveness
- Preference justification with criteria
- Future development predictions

Develop a comparison that generates new insights rather than simply cataloging similarities and differences.`,
      isPro: false
    },
    {
      id: 41,
      slug: 'personal-statement-architecture',
      category: 'essays',
      title: 'Personal Statement Architecture',
      description: 'Compelling narrative for academic and professional applications',
      shortDescription: 'Tell your story with purpose and authenticity',
      variables: ['APPLICATION_TYPE', 'CORE_EXPERIENCE'],
      prompt: `Craft a powerful personal statement for [APPLICATION_TYPE] centered on [CORE_EXPERIENCE]:

**Narrative Arc:**
- Engaging opening that establishes voice and theme
- Formative experience as central story element
- Challenge or obstacle that spurred development
- Learning process and skill acquisition demonstration
- Future goals and contribution potential

**Evidence Integration:**
- Specific examples of achievement and growth
- Quantifiable impact where possible
- Skills demonstrated through experience
- Character traits revealed through actions
- Leadership and collaboration examples

**Voice Development:**
- Authentic personal tone without artificiality
- Professional maturity appropriate to context
- Intellectual curiosity and passion demonstration
- Humility balanced with confidence

**Strategic Positioning:**
- Unique perspective or background emphasis
- Fit with program or opportunity goals
- Clear vision for future contribution
- Memorable and distinguishing elements

**Technical Excellence:**
- Compelling opening and satisfying conclusion
- Smooth transitions and logical flow
- Concise language and efficient storytelling
- Error-free writing and professional presentation

Write 500-750 words that tell a compelling story while meeting application requirements and demonstrating growth potential.`,
      isPro: true
    },
    {
      id: 42,
      slug: 'expository-essay-excellence',
      category: 'essays',
      title: 'Expository Essay Excellence',
      description: 'Clear explanation and information presentation',
      shortDescription: 'Explain complex topics with clarity and engagement',
      variables: ['TOPIC', 'COMPLEXITY_LEVEL'],
      prompt: `Create an expository essay explaining [TOPIC] at [COMPLEXITY_LEVEL]:

**Information Architecture:**
- Logical organization and sequence
- Complex concept breakdown into manageable parts
- Definition and terminology clarity
- Background context and prerequisite knowledge

**Clarity Strategies:**
- Concrete examples and analogies
- Visual description and imagery
- Step-by-step process explanation
- Cause and effect relationships

**Audience Engagement:**
- Reader knowledge level assessment and accommodation
- Interest maintenance through variety and relevance
- Question posing and answer provision
- Personal connection and significance

**Comprehensive Coverage:**
- Multiple perspectives and approaches
- Historical development and evolution
- Current state and recent developments
- Future implications and possibilities

**Educational Value:**
- Learning objective achievement
- Key takeaway identification
- Further exploration guidance
- Practical application suggestions

Develop an explanation that transforms complex information into accessible, engaging, and memorable content.`,
      isPro: false
    },
    {
      id: 43,
      slug: 'persuasive-essay-strategy',
      category: 'essays',
      title: 'Persuasive Essay Strategy',
      description: 'Influencing reader opinion through strategic argumentation',
      shortDescription: 'Move readers to action through compelling persuasion',
      variables: ['POSITION', 'PERSUASION_GOAL'],
      prompt: `Develop a persuasive essay advocating [POSITION] to achieve [PERSUASION_GOAL]:

**Audience Analysis:**
- Reader values, beliefs, and priorities
- Existing knowledge and opinion assessment
- Resistance points and objection anticipation
- Motivation and decision-making factors

**Persuasion Strategy:**
- Credibility establishment and maintenance
- Logical reasoning and evidence presentation
- Emotional appeal and value connection
- Social proof and authority utilization

**Argument Structure:**
- Strong opening that commands attention
- Clear position statement and preview
- Supporting arguments in order of strength
- Counterargument acknowledgment and refutation

**Evidence Selection:**
- Most compelling and relevant support
- Multiple source types and perspectives
- Recent and credible information
- Audience-appropriate complexity and format

**Action Motivation:**
- Clear call to action or behavior change
- Immediate and long-term benefit emphasis
- Obstacle removal and ease demonstration
- Urgency creation without manipulation

Create persuasive writing that respects reader intelligence while effectively motivating desired response.`,
      isPro: true
    },
    {
      id: 44,
      slug: 'critical-essay-framework',
      category: 'essays',
      title: 'Critical Essay Framework',
      description: 'Sophisticated critique and evaluation methodology',
      shortDescription: 'Develop nuanced critical assessment skills',
      variables: ['SUBJECT', 'EVALUATION_CRITERIA'],
      prompt: `Write a critical essay evaluating [SUBJECT] using [EVALUATION_CRITERIA]:

**Critical Framework:**
- Evaluation criteria establishment and justification
- Standard setting and benchmark identification
- Multiple perspective consideration
- Bias recognition and mitigation

**Evidence Gathering:**
- Comprehensive information collection
- Source credibility and reliability assessment
- Primary versus secondary evidence distinction
- Quantitative and qualitative data integration

**Analytical Process:**
- Strength identification and assessment
- Weakness or limitation recognition
- Context influence on evaluation
- Alternative interpretation consideration

**Balanced Assessment:**
- Fair representation of positive and negative aspects
- Proportional treatment based on significance
- Complexity acknowledgment and nuance
- Oversimplification avoidance

**Evaluative Conclusion:**
- Clear judgment based on established criteria
- Recommendation or rating with justification
- Improvement suggestion where appropriate
- Broader significance and implication

Produce criticism that demonstrates intellectual sophistication while providing useful evaluation for readers.`,
      isPro: false
    },
    {
      id: 45,
      slug: 'narrative-essay-artistry',
      category: 'essays',
      title: 'Narrative Essay Artistry',
      description: 'Storytelling techniques for academic and personal writing',
      shortDescription: 'Craft compelling narratives that inform and engage',
      variables: ['EXPERIENCE_TYPE', 'LESSON_LEARNED'],
      prompt: `Create a narrative essay about [EXPERIENCE_TYPE] that illustrates [LESSON_LEARNED]:

**Story Structure:**
- Engaging opening that establishes context and voice
- Clear chronological progression or thoughtful organization
- Climactic moment or turning point identification
- Satisfying resolution that connects to larger meaning

**Descriptive Technique:**
- Sensory detail integration for immersion
- Character development through action and dialogue
- Setting establishment and atmosphere creation
- Pacing variation for tension and interest

**Reflection Integration:**
- Personal growth and insight demonstration
- Lesson extraction without heavy-handedness
- Universal significance and reader connection
- Honest self-assessment and vulnerability

**Voice Development:**
- Consistent narrative persona throughout
- Age-appropriate perspective for story timeline
- Personality and character revelation through voice
- Professional appropriateness for context

**Thematic Coherence:**
- Central theme development throughout narrative
- Symbol and metaphor integration where appropriate
- Message clarity without explicit statement
- Reader takeaway and lasting impression

Write a narrative that combines engaging storytelling with meaningful insight and personal growth demonstration.`,
      isPro: true
    },
    {
      id: 46,
      slug: 'cause-and-effect-analysis',
      category: 'essays',
      title: 'Cause and Effect Analysis',
      description: 'Examining relationships between events and outcomes',
      shortDescription: 'Trace complex causal relationships with precision',
      variables: ['PHENOMENON', 'ANALYSIS_FOCUS'],
      prompt: `Analyze the causes and effects of [PHENOMENON] focusing on [ANALYSIS_FOCUS]:

**Causal Chain Analysis:**
- Root cause identification and examination
- Immediate versus distant cause distinction
- Multiple causation factor consideration
- Causal relationship strength assessment

**Effect Mapping:**
- Immediate consequence identification
- Long-term effect projection and analysis
- Intended versus unintended outcome distinction
- Ripple effect and secondary consequence examination

**Complexity Navigation:**
- Multiple variable interaction analysis
- Feedback loop identification and examination
- Correlation versus causation distinction
- Intervening variable consideration

**Evidence Integration:**
- Empirical data and statistical analysis
- Expert testimony and scholarly research
- Historical precedent and case study
- Logical reasoning and theoretical framework

**Implication Assessment:**
- Future prediction based on causal analysis
- Policy or intervention recommendation
- Prevention or mitigation strategy development
- Broader pattern recognition and generalization

Develop an analysis that demonstrates sophisticated understanding of causality while maintaining logical rigor and evidence-based reasoning.`,
      isPro: false
    },
    {
      id: 47,
      slug: 'definition-essay-mastery',
      category: 'essays',
      title: 'Definition Essay Mastery',
      description: 'Exploring complex concepts through extended definition',
      shortDescription: 'Define abstract concepts with depth and nuance',
      variables: ['CONCEPT', 'DEFINITIONAL_APPROACH'],
      prompt: `Create an extended definition of [CONCEPT] using [DEFINITIONAL_APPROACH]:

**Definition Foundation:**
- Dictionary and etymology exploration
- Historical development and evolution
- Multiple discipline perspective integration
- Common usage versus technical distinction

**Expansion Strategies:**
- Comparison with related concepts
- Contrast with opposing or different ideas
- Example and illustration provision
- Cause and effect relationship exploration

**Contextual Analysis:**
- Cultural and social context influence
- Professional or academic field application
- Personal experience and interpretation
- Contemporary relevance and significance

**Complexity Recognition:**
- Multiple meaning acknowledgment
- Debate and disagreement recognition
- Ambiguity and uncertainty acceptance
- Oversimplification avoidance

**Synthesis Achievement:**
- Personal definition development and justification
- Multiple perspective integration
- Practical application demonstration
- Broader significance and implication

Create a definition that goes beyond basic explanation to provide deep understanding and insight into concept complexity.`,
      isPro: true
    },
    {
      id: 48,
      slug: 'process-analysis-essay',
      category: 'essays',
      title: 'Process Analysis Essay',
      description: 'Explaining procedures and sequential operations',
      shortDescription: 'Guide readers through complex processes clearly',
      variables: ['PROCESS', 'READER_LEVEL'],
      prompt: `Explain the process of [PROCESS] for [READER_LEVEL] audience:

**Process Breakdown:**
- Clear step identification and sequencing
- Prerequisite knowledge and skill assessment
- Material and tool requirement specification
- Time and resource estimation

**Instructional Clarity:**
- Simple, direct language use
- Technical term definition and explanation
- Visual description and spatial orientation
- Safety consideration and warning integration

**Troubleshooting Integration:**
- Common mistake identification and prevention
- Problem recognition and solution provision
- Alternative method and approach discussion
- Quality check and verification procedure

**Contextual Information:**
- Process purpose and application explanation
- Historical development and evolution
- Variation and adaptation possibility
- Professional versus amateur distinction

**Practical Application:**
- Reader practice opportunity suggestion
- Success measurement and evaluation criteria
- Further learning and skill development guidance
- Real-world application and relevance

Develop process explanation that enables reader success while providing comprehensive understanding of procedure and context.`,
      isPro: false
    },
    {
      id: 49,
      slug: 'synthesis-essay-excellence',
      category: 'essays',
      title: 'Synthesis Essay Excellence',
      description: 'Combining multiple sources into coherent arguments',
      shortDescription: 'Weave diverse sources into unified analysis',
      variables: ['TOPIC', 'SOURCE_TYPES'],
      prompt: `Create a synthesis essay on [TOPIC] integrating [SOURCE_TYPES]:

**Source Integration:**
- Multiple perspective identification and analysis
- Common ground and divergence recognition
- Source credibility and reliability assessment
- Bias and limitation acknowledgment

**Synthesis Strategy:**
- Thematic organization rather than source-by-source
- Original argument development through source combination
- Gap identification and analysis
- New insight generation through synthesis

**Evidence Orchestration:**
- Strategic quotation and paraphrase selection
- Source attribution and citation accuracy
- Evidence balance and proportional representation
- Conflicting evidence acknowledgment and resolution

**Original Contribution:**
- Personal analysis and interpretation development
- Source limitation and strength assessment
- Implication and consequence exploration
- Future research direction suggestion

**Coherent Argumentation:**
- Clear thesis development through synthesis
- Logical progression and idea connection
- Reader guidance through complex information
- Satisfying conclusion that demonstrates synthesis value

Produce synthesis that demonstrates ability to work with multiple sources while developing original insight and argument.`,
      isPro: true
    },
    {
      id: 50,
      slug: 'research-essay-architecture',
      category: 'essays',
      title: 'Research Essay Architecture',
      description: 'Academic research integration and presentation',
      shortDescription: 'Present research findings with scholarly rigor',
      variables: ['RESEARCH_QUESTION', 'METHODOLOGY'],
      prompt: `Develop a research essay addressing [RESEARCH_QUESTION] using [METHODOLOGY]:

**Research Foundation:**
- Literature review and context establishment
- Research question development and refinement
- Methodology selection and justification
- Hypothesis or thesis formation

**Investigation Process:**
- Source selection criteria and strategy
- Data collection and analysis procedure
- Evidence evaluation and synthesis
- Finding organization and presentation

**Academic Standards:**
- Proper citation and attribution
- Scholarly voice and register maintenance
- Objective analysis and bias recognition
- Limitation acknowledgment and discussion

**Argument Development:**
- Clear thesis and supporting evidence
- Logical progression and idea connection
- Counterargument consideration and response
- Conclusion that demonstrates research value

**Contribution Assessment:**
- Original insight and analysis identification
- Field advancement and knowledge addition
- Practical application and implication
- Future research direction and possibility

Create research essay that demonstrates scholarly competence while making meaningful contribution to academic conversation.`,
      isPro: false
    },
    {
      id: 51,
      slug: 'reflective-essay-framework',
      category: 'essays',
      title: 'Reflective Essay Framework',
      description: 'Thoughtful examination of experience and learning',
      shortDescription: 'Transform experience into insight through reflection',
      variables: ['EXPERIENCE', 'REFLECTION_FOCUS'],
      prompt: `Write a reflective essay on [EXPERIENCE] focusing on [REFLECTION_FOCUS]:

**Experience Analysis:**
- Detailed experience description and context
- Key moment and turning point identification
- Emotional response and reaction examination
- Initial understanding and assumption assessment

**Reflection Process:**
- Critical thinking and analysis application
- Multiple perspective consideration
- Assumption challenging and revision
- Pattern recognition and connection making

**Learning Integration:**
- Skill development and knowledge acquisition
- Personal growth and character development
- Value clarification and priority assessment
- Worldview expansion and understanding deepening

**Application Planning:**
- Future situation preparation and planning
- Behavior modification and improvement strategy
- Knowledge transfer to new contexts
- Continued learning and development goals

**Metacognitive Awareness:**
- Learning process examination and understanding
- Thinking pattern recognition and analysis
- Strength and weakness honest assessment
- Growth mindset development and maintenance

Create reflective writing that demonstrates genuine self-awareness and commitment to continued growth and learning.`,
      isPro: true
    },

    // Professional Writing (8 prompts)
    {
      id: 52,
      slug: 'executive-communication-framework',
      category: 'professional',
      title: 'Executive Communication Framework',
      description: 'High-impact business writing for leadership contexts',
      shortDescription: 'Professional communication for executive audiences',
      variables: ['BUSINESS_CONTEXT', 'STAKEHOLDER_TYPE'],
      prompt: `Develop executive-level communication materials for [BUSINESS_CONTEXT] targeting [STAKEHOLDER_TYPE]:

**Strategic Messaging:**
- Core message distilled to essential points
- Business impact quantified with metrics
- Risk assessment and mitigation strategies
- Timeline and resource requirements

**Audience Analysis:**
- Stakeholder priorities and concerns
- Decision-making criteria and processes
- Preferred communication styles
- Political and organizational dynamics

**Document Structure:**
- Executive summary (key points in 2-3 paragraphs)
- Situation analysis with relevant data
- Recommended actions with rationale
- Implementation roadmap with milestones

**Professional Tone:**
- Confident but not presumptuous
- Data-driven with clear conclusions
- Acknowledges uncertainties appropriately
- Action-oriented with specific next steps

**Visual Information Design:**
- Strategic use of white space and formatting
- Bullet points for scannable content
- Charts or graphs where they clarify data
- Professional layout that enhances readability

Create materials that demonstrate strategic thinking while remaining accessible.`,
      isPro: true
    },
    {
      id: 53,
      slug: 'technical-writing-excellence',
      category: 'professional',
      title: 'Technical Writing Excellence',
      description: 'Clear documentation for complex technical subjects',
      shortDescription: 'Transform complex information into accessible documentation',
      variables: ['TECHNICAL_SUBJECT', 'USER_TYPE'],
      prompt: `Create comprehensive technical documentation for [TECHNICAL_SUBJECT] designed for [USER_TYPE]:

**User-Centered Design:**
- User needs assessment and task analysis
- Skill level and context consideration
- Goal-oriented information architecture
- Accessibility and inclusion principles

**Information Architecture:**
- Logical organization and hierarchy
- Cross-referencing and navigation aids
- Modular content for flexible use
- Progressive disclosure of complexity

**Clarity Techniques:**
- Plain language and jargon minimization
- Step-by-step instruction formatting
- Visual aid integration and optimization
- Example and scenario inclusion

**Accuracy and Completeness:**
- Technical review and verification
- Edge case and exception handling
- Troubleshooting and error resolution
- Update and maintenance procedures

**Usability Testing:**
- User feedback collection and integration
- Iterative improvement and refinement
- Performance metric establishment
- Continuous improvement processes

Develop documentation that enables user success while maintaining technical accuracy and professional standards.`,
      isPro: false
    },
    {
      id: 54,
      slug: 'grant-proposal-mastery',
      category: 'professional',
      title: 'Grant Proposal Mastery',
      description: 'Persuasive funding applications for research and projects',
      shortDescription: 'Secure funding through compelling proposal writing',
      variables: ['FUNDING_AGENCY', 'PROJECT_TYPE'],
      prompt: `Develop a competitive grant proposal for [FUNDING_AGENCY] supporting [PROJECT_TYPE]:

**Project Significance:**
- Problem importance and urgency demonstration
- Gap in current knowledge or capability identification
- Potential impact quantification and beneficiary analysis
- Alignment with funder priorities and mission

**Innovation and Approach:**
- Novel methodological or theoretical contributions
- Feasibility demonstration with preliminary data
- Risk assessment and mitigation strategies
- Timeline and milestone specification with deliverables

**Research Team Excellence:**
- Principal investigator qualifications and track record
- Team member expertise and role justification
- Institutional support and resource availability
- Collaboration and partnership value demonstration

**Budget Justification:**
- Detailed cost breakdown with clear rationale
- Cost-effectiveness and value demonstration
- Indirect cost negotiation and explanation
- Multi-year funding sustainability planning

**Impact and Dissemination:**
- Academic publication and conference strategy
- Community engagement and outreach plans
- Policy implications and recommendation development
- Knowledge translation and implementation pathways

Create a proposal that demonstrates both scientific rigor and practical impact while meeting specific funder requirements and evaluation criteria.`,
      isPro: true
    },
    {
      id: 55,
      slug: 'policy-brief-architecture',
      category: 'professional',
      title: 'Policy Brief Architecture',
      description: 'Concise analysis for policy makers and decision makers',
      shortDescription: 'Influence policy through clear, evidence-based communication',
      variables: ['POLICY_ISSUE', 'RECOMMENDATION'],
      prompt: `Create a policy brief addressing [POLICY_ISSUE] with [RECOMMENDATION]:

**Issue Framing:**
- Problem definition and scope clarification
- Stakeholder impact and affected population analysis
- Current policy landscape and gap identification
- Urgency and timing consideration for action

**Evidence Synthesis:**
- Research finding compilation and analysis
- Best practice identification from comparable contexts
- Cost-benefit analysis and economic modeling
- Risk assessment and unintended consequence evaluation

**Policy Option Analysis:**
- Multiple solution approach comparison
- Implementation feasibility and resource requirement
- Political viability and stakeholder acceptance
- Timeline and phased implementation possibility

**Recommendation Development:**
- Clear, specific, and actionable proposals
- Implementation strategy and resource allocation
- Success measurement and evaluation criteria
- Monitoring and adjustment mechanism design

**Communication Strategy:**
- Executive summary for decision maker attention
- Visual presentation of key data and findings
- Stakeholder-specific messaging and emphasis
- Media and public communication consideration

Develop policy communication that transforms complex analysis into actionable recommendations for busy decision makers.`,
      isPro: false
    },
    {
      id: 56,
      slug: 'business-report-framework',
      category: 'professional',
      title: 'Business Report Framework',
      description: 'Comprehensive analysis and recommendation reporting',
      shortDescription: 'Present business insights with clarity and impact',
      variables: ['BUSINESS_PROBLEM', 'ANALYSIS_TYPE'],
      prompt: `Create a comprehensive business report analyzing [BUSINESS_PROBLEM] using [ANALYSIS_TYPE]:

**Executive Summary:**
- Key findings and recommendations in 1-2 pages
- Critical decision points and time sensitivity
- Resource requirements and expected outcomes
- Risk factors and mitigation strategies

**Situation Analysis:**
- Current state assessment with quantitative data
- Market conditions and competitive landscape
- Internal capability and resource evaluation
- Trend analysis and pattern identification

**Methodology and Approach:**
- Analysis framework and tool selection
- Data source identification and reliability assessment
- Analytical process and quality assurance
- Limitation acknowledgment and impact assessment

**Findings and Insights:**
- Key discovery presentation with supporting evidence
- Pattern recognition and correlation identification
- Surprising or counterintuitive result highlighting
- Implication analysis for business operations

**Strategic Recommendations:**
- Prioritized action plan with rationale
- Implementation timeline and resource allocation
- Success metric definition and measurement plan
- Risk management and contingency planning

Create business communication that enables informed decision-making while demonstrating analytical rigor and strategic thinking.`,
      isPro: true
    },
    {
      id: 57,
      slug: 'proposal-writing-excellence',
      category: 'professional',
      title: 'Proposal Writing Excellence',
      description: 'Persuasive project and service proposals',
      shortDescription: 'Win contracts and approval through compelling proposals',
      variables: ['PROPOSAL_TYPE', 'CLIENT_NEED'],
      prompt: `Develop a winning [PROPOSAL_TYPE] proposal addressing [CLIENT_NEED]:

**Needs Assessment:**
- Client challenge and opportunity analysis
- Requirement specification and priority ranking
- Success criteria and outcome expectation
- Constraint and limitation acknowledgment

**Solution Design:**
- Approach methodology and framework presentation
- Deliverable specification and quality standards
- Innovation and value-added element highlighting
- Customization and client-specific adaptation

**Capability Demonstration:**
- Team expertise and relevant experience showcase
- Past success and case study presentation
- Resource and infrastructure availability
- Quality assurance and project management

**Project Management:**
- Timeline and milestone development
- Communication and reporting protocol
- Risk identification and mitigation planning
- Change management and flexibility provision

**Value Proposition:**
- Cost structure and pricing justification
- Return on investment calculation and projection
- Competitive advantage and differentiation
- Long-term partnership and relationship building

Create proposal writing that demonstrates understanding of client needs while positioning your solution as the optimal choice.`,
      isPro: false
    },
    {
      id: 58,
      slug: 'professional-email-mastery',
      category: 'professional',
      title: 'Professional Email Mastery',
      description: 'Effective email communication for business contexts',
      shortDescription: 'Master professional email for maximum impact',
      variables: ['EMAIL_PURPOSE', 'RECIPIENT_LEVEL'],
      prompt: `Craft professional emails for [EMAIL_PURPOSE] targeting [RECIPIENT_LEVEL]:

**Subject Line Optimization:**
- Clear, specific, and action-oriented language
- Urgency and priority indication when appropriate
- Keyword inclusion for searchability and filing
- Length optimization for mobile and desktop viewing

**Opening and Relationship:**
- Appropriate greeting and tone establishment
- Relationship acknowledgment and context setting
- Previous communication reference when relevant
- Rapport building without excessive familiarity

**Message Structure:**
- Purpose statement in opening paragraph
- Logical information organization and flow
- Key point emphasis and highlighting
- Clear request or next step identification

**Professional Tone:**
- Respectful and courteous language throughout
- Confidence without arrogance demonstration
- Appropriate formality level for relationship
- Cultural sensitivity and awareness

**Action and Follow-up:**
- Specific request or action item articulation
- Timeline and deadline communication
- Response expectation and method specification
- Professional closing and contact information

Develop email communication that builds relationships while achieving business objectives efficiently and professionally.`,
      isPro: true
    },
    {
      id: 59,
      slug: 'crisis-communication-strategy',
      category: 'professional',
      title: 'Crisis Communication Strategy',
      description: 'Managing communication during organizational challenges',
      shortDescription: 'Navigate difficult situations with strategic communication',
      variables: ['CRISIS_TYPE', 'STAKEHOLDER_GROUP'],
      prompt: `Develop crisis communication strategy for [CRISIS_TYPE] targeting [STAKEHOLDER_GROUP]:

**Situation Assessment:**
- Crisis scope and impact evaluation
- Stakeholder identification and priority ranking
- Information gathering and fact verification
- Legal and regulatory consideration assessment

**Message Development:**
- Key message crafting with accuracy and transparency
- Tone and approach selection for audience and situation
- Accountability and responsibility acknowledgment
- Solution and corrective action communication

**Communication Channels:**
- Medium selection for maximum reach and effectiveness
- Timing and sequence coordination across platforms
- Spokesperson identification and training
- Monitoring and response capability establishment

**Stakeholder Management:**
- Internal communication and coordination
- External stakeholder engagement and relationship maintenance
- Media relations and interview preparation
- Community and public response management

**Recovery and Reputation:**
- Trust rebuilding and relationship repair strategy
- Long-term communication and engagement planning
- Lesson learned integration and process improvement
- Reputation monitoring and management

Create crisis communication that demonstrates leadership while protecting organizational interests and stakeholder relationships.`,
      isPro: false
    },

    // Book & Publication (9 prompts)
    {
      id: 60,
      slug: 'non-fiction-book-structure-blueprint',
      category: 'ebooks',
      title: 'Non-Fiction Book Structure Blueprint',
      description: 'Comprehensive framework for organizing educational content',
      shortDescription: 'Design compelling non-fiction that teaches and engages',
      variables: ['SUBJECT', 'TARGET_READER'],
      prompt: `Design a complete structure for a non-fiction book on [SUBJECT] for [TARGET_READER]:

**Reader Journey Mapping:**
- Target reader's current knowledge level and background
- Learning objectives and skill development goals
- Pain points and challenge identification
- Success outcome and transformation vision

**Content Architecture:**
- Logical chapter sequence and dependency mapping
- Concept introduction and complexity progression
- Theory and practice balance throughout
- Integration points and knowledge building

**Engagement Strategies:**
- Chapter opening hooks and reader motivation
- Case studies and real-world application examples
- Interactive elements and reader participation
- Progress markers and achievement recognition

**Knowledge Transfer:**
- Complex concept breakdown and explanation techniques
- Visual aid and diagram integration planning
- Repetition and reinforcement pattern design
- Assessment and self-testing opportunity creation

**Publication Considerations:**
- Optimal length and scope for target market
- Series potential and companion material possibilities
- Platform-specific formatting and feature requirements
- Marketing angle and unique value proposition development

Include detailed chapter outlines with key concepts, estimated word counts, and specific examples that will illustrate major ideas throughout the book.`,
      isPro: true
    },
    {
      id: 61,
      slug: 'chapter-writing-mastery',
      category: 'ebooks',
      title: 'Chapter Writing Mastery',
      description: 'Crafting individual chapters that build toward larger goals',
      shortDescription: 'Write chapters that engage, educate, and advance your book',
      variables: ['CHAPTER_TOPIC', 'BOOK_THEME'],
      prompt: `Develop a compelling chapter on [CHAPTER_TOPIC] that advances [BOOK_THEME]:

**Chapter Architecture:**
- Opening hook that connects to reader interest and book theme
- Clear learning objectives and chapter promise
- Logical flow from introduction through conclusion
- Transition preparation for following chapter

**Content Development:**
- Core concept introduction and definition
- Supporting evidence and example integration
- Practical application and implementation guidance
- Common misconception addressing and clarification

**Reader Engagement:**
- Storytelling and narrative element incorporation
- Question posing and answer development
- Personal anecdote and relatable experience sharing
- Interactive exercise and reflection prompt inclusion

**Educational Effectiveness:**
- Information chunking and digestible section creation
- Visual break and formatting for readability
- Summary and key takeaway highlighting
- Further reading and resource recommendation

**Thematic Integration:**
- Connection to overarching book message and purpose
- Building on previous chapter knowledge and skills
- Setting foundation for subsequent chapter development
- Contributing to reader transformation and goal achievement

Create chapter content that stands alone as valuable while contributing meaningfully to the complete book experience and reader journey.`,
      isPro: false
    },
    {
      id: 62,
      slug: 'audience-development-strategy',
      category: 'ebooks',
      title: 'Audience Development Strategy',
      description: 'Building readership before and after publication',
      shortDescription: 'Create a loyal readership that grows with each publication',
      variables: ['NICHE_TOPIC', 'PLATFORM_FOCUS'],
      prompt: `Develop an audience building strategy for [NICHE_TOPIC] focusing on [PLATFORM_FOCUS]:

**Audience Identification:**
- Ideal reader persona development with specific characteristics
- Pain point and desire analysis for content creation
- Community and gathering place identification
- Influencer and thought leader mapping

**Content Strategy:**
- Value-first content creation and sharing
- Educational resource and tool development
- Behind-the-scenes and process documentation
- Community question addressing and problem solving

**Platform Optimization:**
- Platform-specific content adaptation and formatting
- Posting schedule and consistency establishment
- Engagement strategy and community building
- Cross-platform promotion and traffic direction

**Relationship Building:**
- Email list development and nurturing sequence
- Direct engagement and conversation facilitation
- Collaboration and partnership opportunity pursuit
- Feedback collection and incorporation process

**Launch Preparation:**
- Pre-publication buzz and anticipation creation
- Beta reader and early access program development
- Review and testimonial collection strategy
- Launch sequence and promotional campaign planning

Create an audience development plan that builds genuine relationships while establishing authority and trust in your subject area expertise.`,
      isPro: true
    },
    {
      id: 63,
      slug: 'self-publishing-roadmap',
      category: 'ebooks',
      title: 'Self-Publishing Roadmap',
      description: 'Complete guide to independent publishing success',
      shortDescription: 'Navigate the self-publishing process from manuscript to market',
      variables: ['BOOK_TYPE', 'PUBLISHING_GOAL'],
      prompt: `Create a comprehensive self-publishing plan for [BOOK_TYPE] with [PUBLISHING_GOAL]:

**Pre-Publication Planning:**
- Market research and competition analysis
- Publishing timeline and milestone establishment
- Budget planning and resource allocation
- Professional service provider identification

**Manuscript Preparation:**
- Developmental editing and structural revision
- Copy editing and proofreading process
- Formatting and layout design considerations
- ISBN and copyright registration procedures

**Design and Production:**
- Cover design and visual branding development
- Interior layout and typography selection
- Print and digital format optimization
- Quality control and final review process

**Platform and Distribution:**
- Publishing platform selection and comparison
- Distribution channel and retailer strategy
- Pricing strategy and market positioning
- Metadata and keyword optimization

**Marketing and Promotion:**
- Launch strategy and promotional timeline
- Social media and content marketing integration
- Reviewer outreach and publicity campaign
- Long-term sales and audience growth planning

Develop a publishing strategy that maximizes reach and impact while maintaining quality and professional standards throughout the process.`,
      isPro: false
    },
    {
      id: 64,
      slug: 'course-creation-framework',
      category: 'ebooks',
      title: 'Course Creation Framework',
      description: 'Transforming expertise into educational experiences',
      shortDescription: 'Design online courses that deliver real learning outcomes',
      variables: ['EXPERTISE_AREA', 'LEARNING_FORMAT'],
      prompt: `Design an online course on [EXPERTISE_AREA] using [LEARNING_FORMAT]:

**Learning Design:**
- Student outcome specification and measurement criteria
- Prerequisite knowledge and skill assessment
- Learning module breakdown and progression sequence
- Assessment and certification planning

**Content Development:**
- Video script and presentation planning
- Interactive exercise and hands-on practice creation
- Resource compilation and supplementary material
- Case study and real-world example integration

**Engagement Strategy:**
- Community building and peer interaction facilitation
- Motivation maintenance and completion encouragement
- Feedback collection and course improvement
- Office hours and direct instructor access

**Technology Platform:**
- Learning management system selection and setup
- Video hosting and delivery optimization
- Mobile accessibility and user experience
- Payment processing and student management

**Marketing and Sales:**
- Course positioning and unique value proposition
- Pricing strategy and payment option consideration
- Launch sequence and promotional campaign
- Student testimonial and success story collection

Create educational content that transforms student knowledge and skills while building sustainable business around expertise sharing.`,
      isPro: true
    },
    {
      id: 65,
      slug: 'memoir-writing-structure',
      category: 'ebooks',
      title: 'Memoir Writing Structure',
      description: 'Crafting personal stories with universal appeal',
      shortDescription: 'Transform life experience into compelling narrative',
      variables: ['LIFE_THEME', 'TARGET_MESSAGE'],
      prompt: `Structure a memoir exploring [LIFE_THEME] to convey [TARGET_MESSAGE]:

**Narrative Architecture:**
- Central theme identification and thread development
- Key scene and pivotal moment selection
- Chronological versus thematic organization decision
- Character introduction and development throughout

**Scene Construction:**
- Vivid detail and sensory experience recreation
- Dialogue reconstruction and conversation authenticity
- Setting establishment and atmospheric development
- Tension and conflict integration for engagement

**Personal Reflection:**
- Growth and learning demonstration through experience
- Vulnerability and honesty balance with privacy
- Universal connection and reader relevance
- Wisdom and insight sharing without preaching

**Narrative Voice:**
- Consistent perspective and tone throughout
- Age-appropriate voice for different life periods
- Personality and character revelation through style
- Reader trust and credibility establishment

**Thematic Coherence:**
- Life lesson and message integration throughout narrative
- Symbol and metaphor development for deeper meaning
- Resolution and transformation demonstration
- Reader inspiration and takeaway creation

Write memoir content that honors personal experience while creating meaningful connection and inspiration for readers facing similar challenges.`,
      isPro: false
    },
    {
      id: 66,
      slug: 'research-publication-strategy',
      category: 'ebooks',
      title: 'Research Publication Strategy',
      description: 'Academic writing for scholarly publication',
      shortDescription: 'Navigate academic publishing for maximum scholarly impact',
      variables: ['RESEARCH_FIELD', 'PUBLICATION_TYPE'],
      prompt: `Develop a publication strategy for [RESEARCH_FIELD] research in [PUBLICATION_TYPE]:

**Publication Planning:**
- Journal selection and ranking assessment
- Submission timeline and conference coordination
- Collaboration and co-authorship arrangement
- Impact factor and audience reach consideration

**Manuscript Development:**
- Literature review and context establishment
- Methodology and findings presentation
- Discussion and implication development
- Abstract and keyword optimization

**Peer Review Navigation:**
- Reviewer comment response and revision strategy
- Rejection handling and alternative venue consideration
- Revision timeline and improvement implementation
- Professional relationship and reputation building

**Academic Impact:**
- Citation and reference network building
- Conference presentation and networking
- Media and public engagement opportunity
- Career advancement and recognition strategy

**Open Access Considerations:**
- Publishing model selection and cost assessment
- Repository and archive submission planning
- Copyright and intellectual property management
- Long-term availability and accessibility

Create publication strategy that advances academic career while contributing meaningfully to scholarly knowledge and field development.`,
      isPro: true
    },
    {
      id: 67,
      slug: 'content-marketing-integration',
      category: 'ebooks',
      title: 'Content Marketing Integration',
      description: 'Using publication to build business and authority',
      shortDescription: 'Leverage books and content for business growth',
      variables: ['BUSINESS_FOCUS', 'AUTHORITY_GOAL'],
      prompt: `Integrate book publishing with business strategy for [BUSINESS_FOCUS] to achieve [AUTHORITY_GOAL]:

**Authority Building:**
- Expertise demonstration and credibility establishment
- Thought leadership and industry recognition
- Speaking opportunity and media appearance creation
- Professional network and relationship development

**Business Integration:**
- Lead generation and client acquisition strategy
- Premium pricing and service differentiation
- Partnership and collaboration opportunity development
- Brand building and market positioning

**Content Ecosystem:**
- Blog post and article development from book content
- Podcast and video content creation strategy
- Social media and community engagement
- Email marketing and audience nurturing

**Monetization Strategy:**
- Direct book sales and passive income generation
- Consulting and speaking engagement booking
- Course and coaching program development
- Licensing and intellectual property opportunities

**Long-term Vision:**
- Series development and content expansion
- Media and publishing deal negotiation
- Industry expert and go-to authority establishment
- Business scaling and growth strategy

Develop integrated strategy that uses publishing as business development tool while creating genuine value for readers and clients.`,
      isPro: false
    },
    {
      id: 68,
      slug: 'multi-format-publishing-strategy',
      category: 'ebooks',
      title: 'Multi-Format Publishing Strategy',
      description: 'Maximizing reach across print, digital, and audio formats',
      shortDescription: 'Optimize content for every reading preference and platform',
      variables: ['CONTENT_TYPE', 'FORMAT_PRIORITY'],
      prompt: `Design multi-format publishing strategy for [CONTENT_TYPE] prioritizing [FORMAT_PRIORITY]:

**Format Optimization:**
- Print layout and typography for readability and appeal
- E-book formatting and interactive element integration
- Audiobook script adaptation and narration planning
- Platform-specific feature and capability utilization

**Production Workflow:**
- Master content creation and version control
- Format-specific adaptation and optimization process
- Quality assurance and testing across platforms
- Timeline coordination and simultaneous release planning

**Distribution Strategy:**
- Platform selection and exclusive versus wide distribution
- Pricing strategy and format-specific consideration
- Marketing message adaptation for different audiences
- Cross-format promotion and reader migration

**Technical Considerations:**
- File format and compression optimization
- Metadata and discoverability enhancement
- Accessibility and inclusive design implementation
- Update and revision process across formats

**Performance Analysis:**
- Sales tracking and format preference analysis
- Reader feedback and satisfaction measurement
- ROI calculation and resource allocation optimization
- Future format and technology adaptation planning

Create publishing approach that maximizes content reach while maintaining quality and reader satisfaction across all formats and platforms.`,
      isPro: true
    }
  ], []);

  // Update the counts to match actual number of prompts
  promptCategories[0].count = prompts.length; // All prompts

  // Use the search hook for dropdown functionality
  const {
    searchResults,
    isLoading: searchLoading,
    searchTerm,
    setSearchTerm,
    showDropdown
  } = usePromptSearch({ 
    prompts, 
    debounceMs: 300, 
    maxResults: 8 
  });

  // Handle search result selection
  const handleResultSelect = (result: SearchResult) => {
    if (result.type === 'prompt' && result.slug) {
      router.push(`/prompt-library/${result.slug}`);
    }
  };

  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
      const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory, prompts]);

  const handleCopyPrompt = async (promptText: string, promptId: number) => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopiedPrompt(promptId);
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
    }
  };

  const closePromptView = () => {
    setCurrentView('library');
    setSelectedPrompt(null);
    setPromptVariables({});
  };

  const updateVariable = (variable: string, value: string) => {
    setPromptVariables(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  const getCustomizedPrompt = () => {
    if (!selectedPrompt) return '';
    let customized = selectedPrompt.prompt;
    Object.entries(promptVariables).forEach(([variable, value]) => {
      const placeholder = `[${variable}]`;
      customized = customized.replaceAll(placeholder, value || placeholder);
    });
    return customized;
  };

  const styles = {
    container: {
      backgroundColor: elevatedDarkTheme.bg,
      minHeight: '100vh',
      color: elevatedDarkTheme.text,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    },
    
    // Library View Styles
    heroSection: {
      position: 'relative' as const,
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '8rem 2rem 2rem 2rem',
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center'
    },
    heroContent: {
      display: 'grid',
      gridTemplateColumns: isTablet ? '1fr' : '1.2fr 0.8fr',
      gap: isTablet ? '3rem' : '4rem',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: isTablet ? 'center' : 'left'
    },
    heroLeft: {
      maxWidth: '720px'
    },
    heroTitle: {
      fontFamily: 'Literata, Georgia, serif',
      fontSize: 'clamp(3rem, 7vw, 6rem)',
      fontWeight: '300',
      lineHeight: '0.95',
      marginBottom: '2rem',
      opacity: '1',
      letterSpacing: '-0.02em'
    },
    heroTitleAccent: {
      display: 'block',
      fontSize: 'clamp(2.5rem, 6vw, 5rem)',
      fontWeight: '400',
      marginTop: '0.5rem',
      color: '#8b5cf6'
    },
    heroSubtitle: {
      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
      fontWeight: '400',
      opacity: '0.8',
      lineHeight: '1.6',
      marginBottom: '2rem',
      maxWidth: '500px'
    },
    heroStats: {
      display: 'flex',
      gap: isMobile ? '2rem' : '4rem',
      marginBottom: '4rem',
      justifyContent: isMobile ? 'center' : 'flex-start'
    },
    statItem: {
      textAlign: isTablet ? 'center' : 'left'
    },
    statNumber: {
      fontFamily: 'Literata, Georgia, serif',
      fontSize: '2.5rem',
      fontWeight: '300',
      opacity: '1',
      display: 'block',
      lineHeight: '1'
    },
    statLabel: {
      fontSize: '0.9rem',
      opacity: '0.5',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginTop: '0.5rem'
    },
    heroCta: {
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'center',
      justifyContent: isMobile ? 'center' : 'flex-start'
    },
    ctaButton: {
      padding: '1.25rem 2.5rem',
      backgroundColor: elevatedDarkTheme.accent,
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontFamily: 'Inter, sans-serif',
      textDecoration: 'none',
      display: 'inline-block'
    },
    ctaSecondary: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.95rem',
      textDecoration: 'none',
      borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
      paddingBottom: '2px',
      transition: 'all 0.2s ease'
    },
    heroRight: {
      position: 'relative',
      display: isTablet ? 'none' : 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    featureCard: {
      backgroundColor: 'rgba(22, 22, 31, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '10px',
      padding: '1rem',
      backdropFilter: 'blur(10px)'
    },
    featureTitle: {
      fontFamily: 'Literata, Georgia, serif',
      fontSize: '1rem',
      fontWeight: '400',
      marginBottom: '0.5rem',
      opacity: '0.9'
    },
    featureDescription: {
      fontSize: '0.8rem',
      opacity: '0.6',
      lineHeight: '1.5'
    },
    
    // Hero Search Section
    heroSearchSection: {
      marginTop: '2rem',
      maxWidth: '500px'
    },
    
    // Search Section
    searchSection: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1rem 2rem 2rem 2rem',
      textAlign: 'center' as const
    },
    
    // Controls Section
    controlsSection: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '6rem 2rem 4rem 2rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
    },
    sectionTitle: {
      fontFamily: 'Literata, Georgia, serif',
      fontSize: '2.5rem',
      fontWeight: '300',
      marginBottom: '1rem',
      opacity: '1'
    },
    sectionSubtitle: {
      fontSize: '1.1rem',
      opacity: '0.6',
      marginBottom: '4rem',
      maxWidth: '600px'
    },
    
    // Category Tabs
    categoryTabs: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '2rem',
      marginBottom: '4rem',
      flexWrap: 'wrap' as const
    },
    categoryTab: {
      padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)',
      backgroundColor: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '25px',
      color: 'rgba(255, 255, 255, 0.7)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
      fontFamily: 'Inter, sans-serif',
      whiteSpace: 'nowrap' as const
    },
    categoryTabActive: {
      backgroundColor: elevatedDarkTheme.accent,
      borderColor: elevatedDarkTheme.accent,
      color: 'white'
    },
    
    // Prompt Grid Container with Elegant Frame
    promptGridContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 clamp(1rem, 4vw, 2rem) 4rem clamp(1rem, 4vw, 2rem)',
      position: 'relative' as const
    },
    promptGridFrame: {
      background: 'rgba(255, 255, 255, 0.01)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      borderRadius: isMobile ? '16px' : '20px',
      padding: isMobile ? '2rem 1.5rem' : '3rem 2rem',
      position: 'relative' as const,
      overflow: 'hidden' as const,
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
    },
    promptGridFrameAccent: {
      position: 'absolute' as const,
      top: '0',
      left: '0',
      right: '0',
      height: '1px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '20px 20px 0 0'
    },
    promptGridFrameGlow: {
      position: 'absolute' as const,
      top: '-1px',
      left: '-1px',
      right: '-1px',
      bottom: '-1px',
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '20px',
      zIndex: -1,
      filter: 'blur(0.5px)'
    },
    promptGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(350px, 100%), 1fr))',
      gap: 'clamp(1rem, 3vw, 2rem)',
      position: 'relative' as const,
      zIndex: 1
    },
    promptSectionHeader: {
      textAlign: 'center' as const,
      marginBottom: '3rem',
      position: 'relative' as const
    },
    promptSectionTitle: {
      fontFamily: 'Literata, Georgia, serif',
      fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
      fontWeight: '300',
      marginBottom: '0.75rem',
      color: 'rgba(255, 255, 255, 0.95)',
      letterSpacing: '-0.02em'
    },
    promptSectionSubtitle: {
      fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
      color: 'rgba(255, 255, 255, 0.5)',
      fontWeight: '400',
      lineHeight: '1.5',
      maxWidth: '500px',
      margin: '0 auto'
    },
    
    // Category and Prompt Views
    categoryView: {
      display: 'flex',
      minHeight: '100vh'
    },
    promptView: {
      display: 'flex',
      minHeight: '100vh'
    },
    
    // Sidebar Styles
    promptSidebar: {
      width: '280px',
      backgroundColor: 'rgba(16, 16, 21, 0.9)',
      borderRight: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '2rem 0',
      position: 'sticky' as const,
      top: '0',
      height: '100vh',
      overflowY: 'auto' as const
    },
    sidebarContent: {
      padding: '0 2rem'
    },
    backButton: {
      display: 'inline-flex' as const,
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      backgroundColor: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      color: 'rgba(255, 255, 255, 0.7)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '0.9rem',
      marginBottom: '2rem',
      fontFamily: 'Inter, sans-serif'
    },
    sidebarTitle: {
      fontFamily: 'Literata, Georgia, serif',
      fontSize: '1.2rem',
      fontWeight: '400',
      marginBottom: '2rem',
      opacity: '0.9'
    },
    categoryList: {
      listStyle: 'none',
      padding: '0',
      margin: '0'
    },
    categoryItem: {
      marginBottom: '0.5rem'
    },
    categoryLink: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 1.5rem',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '12px',
      color: 'rgba(255, 255, 255, 0.7)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '0.9rem',
      width: '100%',
      textAlign: 'left' as const,
      fontFamily: 'Inter, sans-serif'
    },
    categoryLinkActive: {
      backgroundColor: 'rgba(139, 92, 246, 0.15)',
      color: '#8b5cf6'
    },
    categoryCount: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'rgba(255, 255, 255, 0.6)',
      padding: '0.25rem 0.6rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    categoryCountActive: {
      backgroundColor: 'rgba(139, 92, 246, 0.2)',
      color: '#8b5cf6'
    },
    
    // Main Content Areas
    categoryViewMain: {
      flex: '1',
      padding: '2rem'
    },
    promptViewMain: {
      flex: '1',
      padding: '2rem'
    },
    
    // Category View Specific
    categoryHeader: {
      marginBottom: '3rem',
      paddingBottom: '2rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    },
    categoryTitle: {
      fontFamily: 'Literata, Georgia, serif',
      fontSize: '2.5rem',
      fontWeight: '400',
      marginBottom: '1rem',
      lineHeight: '1.2'
    },
    categoryDescription: {
      fontSize: '1.1rem',
      opacity: '0.8',
      lineHeight: '1.6',
      marginBottom: '2rem'
    },
    categoryMeta: {
      display: 'flex',
      gap: '2rem',
      fontSize: '0.9rem',
      opacity: '0.6'
    },
    categoryPromptGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '2rem',
      maxWidth: '1200px'
    },
    
    // Prompt View Specific
    promptViewHeader: {
      marginBottom: '3rem',
      paddingBottom: '2rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    },
    promptViewTitle: {
      fontFamily: 'Literata, Georgia, serif',
      fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
      fontWeight: '400',
      marginBottom: '1rem',
      lineHeight: '1.2'
    },
    promptViewDescription: {
      fontSize: 'clamp(1rem, 3vw, 1.1rem)',
      opacity: '0.8',
      lineHeight: '1.6',
      marginBottom: '2rem'
    },
    promptViewMeta: {
      display: 'flex',
      gap: 'clamp(1rem, 3vw, 2rem)',
      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
      opacity: '0.6',
      flexWrap: 'wrap'
    },
    promptContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '3rem',
      alignItems: 'start',
      maxWidth: '1200px'
    },
    promptDisplay: {
      backgroundColor: elevatedDarkTheme.surface,
      border: `1px solid ${elevatedDarkTheme.borderSubtle}`,
      borderRadius: '16px',
      padding: '2rem',
      position: 'relative' as const
    },
    promptDisplayHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    },
    promptDisplayTitle: {
      fontFamily: 'Literata, Georgia, serif',
      fontSize: '1.3rem',
      fontWeight: '400',
      margin: '0'
    },
    promptActions: {
      display: 'flex',
      gap: '0.75rem'
    },
    actionButton: {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.85rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontFamily: 'Inter, sans-serif'
    },
    copyButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    tryEsyButton: {
      backgroundColor: elevatedDarkTheme.accent,
      color: 'white'
    },
    promptText: {
      fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
      lineHeight: '1.8',
      opacity: '0.9',
      whiteSpace: 'pre-wrap' as const,
      fontFamily: 'JetBrains Mono, Consolas, monospace',
      wordBreak: 'break-word' as const,
      overflowWrap: 'break-word' as const
    },
    
    // Variables Section
    variablesSection: {
      backgroundColor: elevatedDarkTheme.elevated,
      border: `1px solid ${elevatedDarkTheme.borderSubtle}`,
      borderRadius: '16px',
      padding: '2rem'
    },
    variablesSectionTitle: {
      fontFamily: 'Literata, Georgia, serif',
      fontSize: '1.3rem',
      fontWeight: '400',
      marginBottom: '1.5rem'
    },
    variableLabel: {
      display: 'block' as const,
      fontSize: '0.9rem',
      opacity: '0.8',
      marginBottom: '0.5rem',
      fontWeight: '500'
    },
    variableInput: {
      width: '100%',
      padding: '1rem',
      backgroundColor: 'rgba(10, 10, 15, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      color: 'white',
      fontSize: '0.95rem',
      marginBottom: '1rem',
      outline: 'none',
      transition: 'all 0.2s ease'
    },
  } as const;

  // Category view with sidebar
  if (currentView === 'category') {
    const currentCategory = promptCategories.find(c => c.id === selectedCategory);
    const categoryPrompts = selectedCategory === 'all' ? prompts : prompts.filter(p => p.category === selectedCategory);
    
    return (
      <div style={styles.container}>
        <div style={styles.categoryView}>
          {/* Left Sidebar */}
          <div style={styles.promptSidebar}>
            <div style={styles.sidebarContent}>
              <button 
                onClick={closePromptView}
                style={styles.backButton}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  (e.target as HTMLButtonElement).style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
                  (e.target as HTMLButtonElement).style.color = 'rgba(255, 255, 255, 0.7)';
                }}
              >
                ← Back to Library
              </button>
              
              <h3 style={styles.sidebarTitle}>Categories</h3>
              <ul style={styles.categoryList}>
                {promptCategories.map(category => {
                  const count = category.id === 'all' ? prompts.length : category.count;
                  const isActive = selectedCategory === category.id;
                  
                  return (
                    <li key={category.id} style={styles.categoryItem}>
                      {category.id === 'all' ? (
                        <Link
                          href="/prompt-library"
                          style={{
                            ...styles.categoryLink,
                            ...(isActive ? styles.categoryLinkActive : {}),
                            textDecoration: 'none'
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                              e.currentTarget.style.color = 'white';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                            }
                          }}
                        >
                          <span>{category.name}</span>
                          <span style={{
                            ...styles.categoryCount,
                            ...(isActive ? styles.categoryCountActive : {})
                          }}>
                            {count}
                          </span>
                        </Link>
                      ) : (
                        <Link
                          href={`/prompt-library/category/${category.id}`}
                          style={{
                            ...styles.categoryLink,
                            ...(isActive ? styles.categoryLinkActive : {}),
                            textDecoration: 'none'
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                              e.currentTarget.style.color = 'white';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                            }
                          }}
                        >
                          <span>{category.name}</span>
                          <span style={{
                            ...styles.categoryCount,
                            ...(isActive ? styles.categoryCountActive : {})
                          }}>
                            {count}
                          </span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          
          {/* Main Content */}
          <div style={styles.categoryViewMain}>
            <div style={styles.categoryHeader}>
              <h1 style={styles.categoryTitle}>{currentCategory?.name || 'All Prompts'}</h1>
              <p style={styles.categoryDescription}>
                {selectedCategory === 'all' 
                  ? 'Browse all available prompts across every category. Each prompt is crafted for academic excellence and professional results.'
                  : selectedCategory === 'writing'
                  ? 'Master the art of creative writing with prompts designed for character development, scene construction, and narrative excellence.'
                  : selectedCategory === 'research'
                  ? 'Comprehensive frameworks for academic research, literature reviews, and scholarly analysis with methodological rigor.'
                  : selectedCategory === 'analysis'
                  ? 'Advanced analytical tools for literary criticism, textual analysis, and interpretive frameworks.'
                  : selectedCategory === 'essays'
                  ? 'Professional essay writing frameworks for argumentative, persuasive, and academic compositions.'
                  : selectedCategory === 'professional'
                  ? 'Executive-level communication tools for business writing, reports, and professional correspondence.'
                  : selectedCategory === 'ebooks'
                  ? 'Complete publishing frameworks for non-fiction books, guides, and educational content.'
                  : 'Explore specialized prompts designed for your specific needs.'
                }
              </p>
              <div style={styles.categoryMeta}>
                <span>{categoryPrompts.length} prompt{categoryPrompts.length !== 1 ? 's' : ''}</span>
                <span>Academic Grade</span>
                <span>Research Tested</span>
              </div>
            </div>
            
            <div style={styles.categoryPromptGrid}>
              {categoryPrompts.map(prompt => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
            
            {categoryPrompts.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                opacity: '0.5'
              }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No prompts found</p>
                <p>This category is coming soon with more prompts</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Prompt view with sidebar
  if (currentView === 'prompt' && selectedPrompt) {
    return (
      <div style={styles.container}>
        <div style={styles.promptView}>
          {/* Left Sidebar */}
          <div style={styles.promptSidebar}>
            <div style={styles.sidebarContent}>
              <button 
                onClick={closePromptView}
                style={styles.backButton}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  (e.target as HTMLButtonElement).style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
                  (e.target as HTMLButtonElement).style.color = 'rgba(255, 255, 255, 0.7)';
                }}
              >
                ← Back to Library
              </button>
              
              <h3 style={styles.sidebarTitle}>Categories</h3>
              <ul style={styles.categoryList}>
                {promptCategories.map(category => {
                  const count = category.id === 'all' ? prompts.length : category.count;
                  const isActive = selectedCategory === category.id;
                  
                  return (
                    <li key={category.id} style={styles.categoryItem}>
                      {category.id === 'all' ? (
                        <Link
                          href="/prompt-library"
                          style={{
                            ...styles.categoryLink,
                            ...(isActive ? styles.categoryLinkActive : {}),
                            textDecoration: 'none'
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                              e.currentTarget.style.color = 'white';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                            }
                          }}
                        >
                          <span>{category.name}</span>
                          <span style={{
                            ...styles.categoryCount,
                            ...(isActive ? styles.categoryCountActive : {})
                          }}>
                            {count}
                          </span>
                        </Link>
                      ) : (
                        <Link
                          href={`/prompt-library/category/${category.id}`}
                          style={{
                            ...styles.categoryLink,
                            ...(isActive ? styles.categoryLinkActive : {}),
                            textDecoration: 'none'
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                              e.currentTarget.style.color = 'white';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                            }
                          }}
                        >
                          <span>{category.name}</span>
                          <span style={{
                            ...styles.categoryCount,
                            ...(isActive ? styles.categoryCountActive : {})
                          }}>
                            {count}
                          </span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          
          {/* Main Content */}
          <div style={styles.promptViewMain}>
            <div style={styles.promptViewHeader}>
              <h1 style={styles.promptViewTitle}>{selectedPrompt.title}</h1>
              <p style={styles.promptViewDescription}>{selectedPrompt.description}</p>
              <div style={styles.promptViewMeta}>
                <span>Category: {promptCategories.find(c => c.id === selectedPrompt.category)?.name}</span>
                {selectedPrompt.isPro && <span style={{ 
                  backgroundColor: 'rgba(251, 191, 36, 0.15)',
                  color: '#fbbf24',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}>Pro</span>}
              </div>
            </div>
            
            <div style={styles.promptContent}>
              <div style={styles.promptDisplay}>
                <div style={styles.promptDisplayHeader}>
                  <h3 style={styles.promptDisplayTitle}>Generated Prompt</h3>
                  <div style={styles.promptActions}>
                    <button
                      onClick={() => handleCopyPrompt(getCustomizedPrompt(), selectedPrompt.id)}
                      style={{
                        ...styles.actionButton,
                        ...styles.copyButton,
                        ...(copiedPrompt === selectedPrompt.id ? {
                          backgroundColor: '#10b981',
                          color: 'white',
                          borderColor: '#10b981'
                        } : {})
                      }}
                      onMouseEnter={(e) => {
                        if (copiedPrompt !== selectedPrompt.id) {
                          (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                          (e.target as HTMLButtonElement).style.color = 'white';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (copiedPrompt !== selectedPrompt.id) {
                          (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                          (e.target as HTMLButtonElement).style.color = 'rgba(255, 255, 255, 0.8)';
                        }
                      }}
                    >
                      {copiedPrompt === selectedPrompt.id ? '✓ Copied' : 'Copy'}
                    </button>
                    <button
                      style={{
                        ...styles.actionButton,
                        ...styles.tryEsyButton
                      }}
                      onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = elevatedDarkTheme.accentDark}
                      onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = elevatedDarkTheme.accent}
                    >
                      Try in Esy →
                    </button>
                  </div>
                </div>
                <div style={styles.promptText}>
                  {getCustomizedPrompt()}
                </div>
              </div>
              
              <div style={styles.variablesSection}>
                <h3 style={styles.variablesSectionTitle}>Customize Variables</h3>
                {selectedPrompt.variables?.length > 0 ? (
                  selectedPrompt.variables.map((variable: string) => (
                    <div key={variable}>
                      <label style={styles.variableLabel}>
                        {variable.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </label>
                      <input
                        type="text"
                        value={promptVariables[variable] || ''}
                        onChange={(e) => updateVariable(variable, e.target.value)}
                        placeholder={`Enter ${variable.toLowerCase()}`}
                        style={styles.variableInput}
                        onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = 'rgba(139, 92, 246, 0.4)'}
                        onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                      />
                    </div>
                  ))
                ) : (
                  <p style={{opacity: '0.6', fontStyle: 'italic'}}>
                    This prompt has no customizable variables.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default library view
  return (
    <div style={styles.container}>
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.heroLeft}>
            <h1 style={styles.heroTitle}>
              Prompt
              <span style={styles.heroTitleAccent}>Library</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Stop guessing what to ask AI.<br />
              Get the right prompts instantly.
            </p>
            
            {/* Search Bar in Hero */}
            <div ref={searchBarRef} style={styles.heroSearchSection}>
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                onSearch={(query) => console.log('Searching for:', query)}
                context="prompt-library"
                inputFontSize="0.9rem"
                style={{ marginBottom: '0' }}
                autoFocus={true}
                showDropdown={showDropdown}
                searchResults={searchResults}
                onResultSelect={handleResultSelect}
                loadingResults={searchLoading}
                maxResults={8}
              />
            </div>
          </div>

          <div style={styles.heroRight}>
            <div style={styles.featureCard}>
              <h3 style={styles.featureTitle}>Ready-to-Use Prompts</h3>
              <p style={styles.featureDescription}>
                No more guessing what to ask AI. Our prompts are tested and optimized to get you exactly the help you need for any writing task.
              </p>
            </div>
            <div style={styles.featureCard}>
              <h3 style={styles.featureTitle}>Customize Everything</h3>
              <p style={styles.featureDescription}>
                Adjust variables like topic, audience, and style to make each prompt perfectly fit your specific assignment and requirements.
              </p>
            </div>
            <div style={styles.featureCard}>
              <h3 style={styles.featureTitle}>Copy & Paste Ready</h3>
              <p style={styles.featureDescription}>
                One click copies the entire prompt. Just paste it into ChatGPT, Claude, or any AI tool and start getting results immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters Section */}
      <section style={styles.searchSection}>
        <div style={styles.categoryTabs}>
          {promptCategories.map(category => (
            category.id === 'all' ? (
              <button
                key={category.id}
                data-category-button
                data-category-id={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  ...styles.categoryTab,
                  ...(selectedCategory === category.id ? styles.categoryTabActive : {})
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(22, 22, 31, 0.6)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  }
                }}
              >
                {category.name}
              </button>
            ) : (
              <button
                key={category.id}
                data-category-button
                data-category-id={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  ...styles.categoryTab,
                  ...(selectedCategory === category.id ? styles.categoryTabActive : {})
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(22, 22, 31, 0.6)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  }
                }}
              >
                {category.name}
              </button>
            )
          ))}
        </div>
      </section>

      {/* Prompts Section with Elegant Frame */}
      <main id="prompts" style={styles.promptGridContainer}>
        <div style={styles.promptGridFrame}>
          {/* Frame Glow Effect */}
          <div style={styles.promptGridFrameGlow}></div>
          
          {/* Frame Accent Line */}
          <div style={styles.promptGridFrameAccent}></div>
          
          {/* Section Header */}
          <div style={styles.promptSectionHeader}>
            <h2 style={styles.promptSectionTitle}>
              {selectedCategory === 'all' ? 'All Prompts' : promptCategories.find(cat => cat.id === selectedCategory)?.name}
            </h2>
            <p style={styles.promptSectionSubtitle}>
              {selectedCategory === 'all' 
                ? 'Discover our complete collection of AI-powered writing prompts, carefully crafted for every academic and creative writing need.'
                : `Explore ${promptCategories.find(cat => cat.id === selectedCategory)?.name.toLowerCase()} prompts designed to enhance your writing process.`
              }
            </p>
          </div>
          
          {/* Prompt Grid */}
          <div style={styles.promptGrid}>
            {filteredPrompts.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
            
            {filteredPrompts.length === 0 && (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '4rem 2rem',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', opacity: '0.8' }}>
                  No prompts found
                </h3>
                <p style={{ fontSize: '1rem', opacity: '0.6' }}>
                  Try adjusting your search or category filter
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <style>
        {`
          * {
            box-sizing: border-box;
          }
          
          @media (max-width: 1024px) {
            .prompt-view, .category-view {
              flex-direction: column !important;
            }
            .prompt-sidebar {
              width: 100% !important;
              height: auto !important;
              position: relative !important;
              border-right: none !important;
              border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
            }
            .prompt-content {
              grid-template-columns: 1fr !important;
              gap: 1.5rem !important;
            }
            .category-prompt-grid {
              grid-template-columns: 1fr !important;
            }
          }
          
          @media (max-width: 768px) {
            .prompt-grid {
              grid-template-columns: 1fr !important;
              padding: 0 1rem !important;
            }
            .category-tabs {
              gap: 0.25rem !important;
              padding: 0 1rem !important;
            }
            .category-tab {
              font-size: 0.8rem !important;
              padding: 0.5rem 1rem !important;
            }
            .prompt-card-meta {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 0.5rem !important;
            }
            .prompt-actions {
              flex-direction: column !important;
              gap: 0.5rem !important;
            }
            .action-button {
              width: 100% !important;
              justify-content: center !important;
            }
            .prompt-view-meta {
              flex-direction: column !important;
              gap: 0.5rem !important;
              align-items: flex-start !important;
            }
            .category-meta {
              flex-direction: column !important;
              gap: 0.5rem !important;
              align-items: flex-start !important;
            }
          }
          
          @media (max-width: 480px) {
            .hero-section {
              padding: 2rem 1rem 1rem 1rem !important;
            }
            .search-container {
              margin: 0 auto 2rem auto !important;
              padding: 0 1rem !important;
            }
            .category-tabs {
              margin-bottom: 2rem !important;
            }
            .prompt-view-main, .category-view-main {
              padding: 1rem !important;
            }
            .sidebar-content {
              padding: 0 1rem !important;
            }
            .prompt-display-header {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 1rem !important;
            }
            .prompt-actions {
              width: 100% !important;
            }
          }
          
          /* Ensure no horizontal scrolling */
          html, body {
            overflow-x: hidden;
            width: 100%;
          }
          
          /* Fix for very small screens */
          @media (max-width: 320px) {
            .variables-section, .prompt-display {
              padding: 1rem !important;
            }
            .hero-title {
              font-size: 2rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default PromptLibrary;
