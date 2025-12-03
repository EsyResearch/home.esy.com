// Templates Marketplace Static Data
// This will be replaced with database queries in Phase 2

import { Template, TemplateCategoryInfo, TemplateSubcategory } from './types';

// Category definitions with subcategories
export const templateCategories: TemplateCategoryInfo[] = [
  {
    id: 'prompt',
    name: 'Prompts',
    slug: 'prompts',
    description: 'Ready-to-use AI prompts for academic writing, research, and creative projects',
    count: 10,
    subcategories: [
      {
        id: 'essay-writing',
        slug: 'essay-writing',
        name: 'Essay Writing',
        description: 'Prompts for structuring and writing academic essays',
        count: 3,
      },
      {
        id: 'research',
        slug: 'research',
        name: 'Research & Analysis',
        description: 'Prompts for conducting research and analysis',
        count: 3,
      },
      {
        id: 'creative-writing',
        slug: 'creative-writing',
        name: 'Creative Writing',
        description: 'Prompts for fiction, storytelling, and creative projects',
        count: 2,
      },
      {
        id: 'professional',
        slug: 'professional',
        name: 'Professional Writing',
        description: 'Prompts for business and professional communication',
        count: 2,
      },
    ],
  },
  {
    id: 'template',
    name: 'Templates',
    slug: 'templates',
    description: 'Structured writing templates and frameworks',
    count: 0,
    isComingSoon: true,
    subcategories: [],
  },
  {
    id: 'bundle',
    name: 'Bundles',
    slug: 'bundles',
    description: 'Curated collections of prompts and templates',
    count: 0,
    isComingSoon: true,
    subcategories: [],
  },
];

// Static templates/prompts data
export const templates: Template[] = [
  // Essay Writing Prompts
  {
    id: '1',
    slug: 'argumentative-essay-builder',
    title: 'Argumentative Essay Builder',
    shortDescription: 'Craft compelling argumentative essays with clear thesis statements and supporting evidence.',
    description: 'This comprehensive prompt helps you structure and write persuasive argumentative essays. It guides you through developing a clear thesis, organizing supporting arguments, addressing counterarguments, and creating a compelling conclusion.',
    category: 'prompt',
    subcategory: 'essay-writing',
    tags: ['essay', 'argumentative', 'thesis', 'academic'],
    difficulty: 'intermediate',
    isNew: true,
    isFeatured: true,
    variables: ['TOPIC', 'THESIS_STATEMENT', 'TARGET_AUDIENCE', 'WORD_COUNT'],
    content: `You are an expert academic writing assistant. Help me write a compelling argumentative essay on the following topic:

**Topic:** [TOPIC]

**My Thesis Statement:** [THESIS_STATEMENT]

**Target Audience:** [TARGET_AUDIENCE]

**Desired Length:** [WORD_COUNT] words

Please help me structure this essay with:

1. **Introduction**
   - Hook to grab reader attention
   - Background context on the topic
   - Clear thesis statement positioned at the end

2. **Body Paragraphs** (3-4 paragraphs)
   - Topic sentence for each paragraph
   - Supporting evidence with citations
   - Analysis connecting evidence to thesis
   - Smooth transitions between paragraphs

3. **Counterargument Section**
   - Acknowledge opposing viewpoints fairly
   - Refute with logical reasoning and evidence
   - Strengthen original position

4. **Conclusion**
   - Restate thesis in new words
   - Summarize key arguments
   - End with call to action or thought-provoking statement

Please provide specific, well-researched content rather than placeholder text.`,
    expectedOutput: 'A structured argumentative essay outline with detailed content for each section, including specific examples and evidence.',
    useCases: [
      'Academic essays for courses',
      'Opinion pieces and editorials',
      'Debate preparation',
      'Policy position papers',
    ],
    relatedSlugs: ['thesis-statement-generator', 'essay-outline-creator'],
  },
  {
    id: '2',
    slug: 'thesis-statement-generator',
    title: 'Thesis Statement Generator',
    shortDescription: 'Generate strong, arguable thesis statements for any essay type.',
    description: 'This prompt helps you craft clear, specific, and arguable thesis statements. It provides multiple options based on your topic and guides you in selecting the strongest approach for your essay.',
    category: 'prompt',
    subcategory: 'essay-writing',
    tags: ['thesis', 'essay', 'academic', 'writing'],
    difficulty: 'beginner',
    isFeatured: true,
    variables: ['TOPIC', 'ESSAY_TYPE', 'STANCE'],
    content: `You are an expert academic writing coach specializing in thesis development. Help me create a strong thesis statement.

**Topic:** [TOPIC]

**Essay Type:** [ESSAY_TYPE] (argumentative, expository, analytical, compare/contrast)

**My Initial Stance/Angle:** [STANCE]

Please provide:

1. **3 Different Thesis Statement Options**
   - Each should be specific, arguable, and appropriately scoped
   - Vary the approach (cause/effect, comparison, evaluation, etc.)

2. **For Each Thesis:**
   - Explain why it works
   - Identify potential body paragraph topics
   - Note any weaknesses to address

3. **Thesis Refinement Tips**
   - How to make each thesis more specific
   - Common pitfalls to avoid
   - Questions to test thesis strength

4. **Recommended Thesis**
   - Which option is strongest and why
   - Final polished version`,
    expectedOutput: 'Three thesis statement options with analysis, recommendations, and a final polished thesis.',
    useCases: [
      'Starting any academic essay',
      'Refining unclear thesis statements',
      'Brainstorming essay directions',
      'Academic writing workshops',
    ],
    relatedSlugs: ['argumentative-essay-builder', 'essay-outline-creator'],
  },
  {
    id: '3',
    slug: 'essay-outline-creator',
    title: 'Essay Outline Creator',
    shortDescription: 'Create detailed essay outlines with logical structure and flow.',
    description: 'Generate comprehensive essay outlines that organize your ideas logically. This prompt creates hierarchical outlines with main points, subpoints, and transitions.',
    category: 'prompt',
    subcategory: 'essay-writing',
    tags: ['outline', 'structure', 'organization', 'essay'],
    difficulty: 'beginner',
    variables: ['THESIS', 'MAIN_POINTS', 'ESSAY_LENGTH'],
    content: `You are an expert essay structure consultant. Help me create a detailed outline for my essay.

**Thesis Statement:** [THESIS]

**Main Points/Arguments:** [MAIN_POINTS]

**Target Length:** [ESSAY_LENGTH]

Please create:

1. **Hierarchical Outline**
   - Roman numerals for main sections
   - Capital letters for main points
   - Numbers for supporting details
   - Lowercase letters for examples/evidence

2. **For Each Section:**
   - Clear topic sentence
   - 2-3 supporting points
   - Suggested evidence or examples
   - Transition phrases to next section

3. **Introduction Blueprint**
   - Hook options (3 choices)
   - Context/background points
   - Thesis placement

4. **Conclusion Framework**
   - Thesis restatement approach
   - Summary strategy
   - Closing impact options

5. **Paragraph-Level Guidance**
   - Estimated word count per section
   - Key vocabulary to incorporate
   - Potential challenges and solutions`,
    expectedOutput: 'A detailed hierarchical outline with all sections mapped, transitions planned, and writing guidance included.',
    useCases: [
      'Planning any essay type',
      'Organizing complex arguments',
      'Preparing for timed writing',
      'Research paper structure',
    ],
    relatedSlugs: ['argumentative-essay-builder', 'thesis-statement-generator'],
  },

  // Research & Analysis Prompts
  {
    id: '4',
    slug: 'literature-review-assistant',
    title: 'Literature Review Assistant',
    shortDescription: 'Synthesize sources and structure comprehensive literature reviews.',
    description: 'This prompt guides you through organizing, analyzing, and synthesizing multiple sources into a coherent literature review. It helps identify themes, gaps, and connections across your research.',
    category: 'prompt',
    subcategory: 'research',
    tags: ['research', 'literature review', 'synthesis', 'academic'],
    difficulty: 'advanced',
    isPro: true,
    isFeatured: true,
    variables: ['RESEARCH_TOPIC', 'SOURCE_LIST', 'REVIEW_PURPOSE'],
    content: `You are a research methodology expert specializing in literature reviews. Help me synthesize my sources.

**Research Topic:** [RESEARCH_TOPIC]

**Sources to Review:** [SOURCE_LIST]

**Purpose of Review:** [REVIEW_PURPOSE]

Please help me:

1. **Thematic Organization**
   - Identify 3-5 major themes across sources
   - Group sources by theme
   - Note methodological approaches

2. **Source Analysis Matrix**
   - Key arguments from each source
   - Methodologies used
   - Main findings
   - Strengths and limitations

3. **Synthesis Strategies**
   - Points of agreement across sources
   - Contradictions or debates
   - Evolution of thinking over time
   - Gaps in current research

4. **Literature Review Structure**
   - Introduction approach
   - Thematic sections outline
   - Critical analysis integration
   - Conclusion and gap identification

5. **Writing Guidance**
   - Transition phrases for synthesis
   - Citation integration strategies
   - Maintaining your analytical voice`,
    expectedOutput: 'A thematic organization with source matrix, synthesis analysis, and structured outline for writing the literature review.',
    useCases: [
      'Thesis and dissertation chapters',
      'Research paper introductions',
      'Grant proposal backgrounds',
      'Systematic reviews',
    ],
    relatedSlugs: ['research-question-refiner', 'source-evaluation-framework'],
  },
  {
    id: '5',
    slug: 'research-question-refiner',
    title: 'Research Question Refiner',
    shortDescription: 'Transform broad topics into focused, researchable questions.',
    description: 'This prompt helps you narrow down broad research interests into specific, answerable research questions. It guides you through the process of scoping, refining, and validating your research questions.',
    category: 'prompt',
    subcategory: 'research',
    tags: ['research', 'questions', 'methodology', 'academic'],
    difficulty: 'intermediate',
    variables: ['BROAD_TOPIC', 'DISCIPLINE', 'CONSTRAINTS'],
    content: `You are a research design specialist. Help me develop a focused research question.

**Broad Topic Area:** [BROAD_TOPIC]

**Discipline/Field:** [DISCIPLINE]

**Constraints:** [CONSTRAINTS] (time, resources, access, etc.)

Please provide:

1. **Topic Narrowing Process**
   - 3 progressively narrower versions of the topic
   - Rationale for each narrowing decision
   - Scope assessment

2. **Research Question Options**
   - 5 potential research questions
   - Question types (descriptive, comparative, causal, etc.)
   - Feasibility assessment for each

3. **Question Quality Check**
   For the top 2 questions:
   - Is it specific enough?
   - Is it researchable with available methods?
   - Is it significant to the field?
   - Is it achievable within constraints?

4. **Recommended Question**
   - Final refined question
   - Sub-questions to address
   - Potential hypotheses (if applicable)

5. **Next Steps**
   - Suggested methodology approach
   - Key variables to consider
   - Initial source recommendations`,
    expectedOutput: 'A refined, focused research question with sub-questions, feasibility analysis, and methodology suggestions.',
    useCases: [
      'Thesis and dissertation proposals',
      'Research project initiation',
      'Grant applications',
      'Independent research',
    ],
    relatedSlugs: ['literature-review-assistant', 'source-evaluation-framework'],
  },
  {
    id: '6',
    slug: 'source-evaluation-framework',
    title: 'Source Evaluation Framework',
    shortDescription: 'Critically evaluate sources for credibility, relevance, and quality.',
    description: 'This prompt provides a systematic framework for evaluating academic and non-academic sources. It helps you assess credibility, identify bias, and determine source quality.',
    category: 'prompt',
    subcategory: 'research',
    tags: ['research', 'sources', 'evaluation', 'critical thinking'],
    difficulty: 'intermediate',
    isNew: true,
    variables: ['SOURCE_TYPE', 'SOURCE_DETAILS', 'RESEARCH_CONTEXT'],
    content: `You are an information literacy expert. Help me evaluate this source critically.

**Source Type:** [SOURCE_TYPE] (journal article, book, website, report, etc.)

**Source Details:** [SOURCE_DETAILS]

**My Research Context:** [RESEARCH_CONTEXT]

Please evaluate using:

1. **CRAAP Test Analysis**
   - Currency: How recent? Is timeliness important?
   - Relevance: How well does it fit my research?
   - Authority: Who created it? What are their credentials?
   - Accuracy: Is information verifiable? Evidence-based?
   - Purpose: Why was this created? Any bias?

2. **Scholarly Quality Indicators**
   - Peer review status
   - Citation count and impact
   - Methodology transparency
   - Data availability

3. **Bias Assessment**
   - Funding sources
   - Author affiliations
   - Language and framing analysis
   - Missing perspectives

4. **Contextual Evaluation**
   - Position in scholarly conversation
   - Reception by other scholars
   - Limitations acknowledged by authors

5. **Recommendation**
   - Overall quality rating (1-5)
   - Best use case for this source
   - Caveats for using this source
   - Alternative sources to consider`,
    expectedOutput: 'Comprehensive source evaluation with ratings, bias assessment, and usage recommendations.',
    useCases: [
      'Research paper source selection',
      'Fact-checking and verification',
      'Literature review quality control',
      'Teaching critical evaluation',
    ],
    relatedSlugs: ['literature-review-assistant', 'research-question-refiner'],
  },

  // Creative Writing Prompts
  {
    id: '7',
    slug: 'character-development-deep-dive',
    title: 'Character Development Deep Dive',
    shortDescription: 'Create complex, multi-dimensional characters with rich backstories.',
    description: 'This comprehensive prompt helps you develop fully realized characters with psychological depth, consistent motivations, and compelling backstories.',
    category: 'prompt',
    subcategory: 'creative-writing',
    tags: ['creative writing', 'character', 'fiction', 'storytelling'],
    difficulty: 'intermediate',
    isFeatured: true,
    variables: ['CHARACTER_NAME', 'STORY_GENRE', 'CHARACTER_ROLE'],
    content: `You are a master storyteller and character development expert. Help me create a compelling character.

**Character Name:** [CHARACTER_NAME]

**Story Genre:** [STORY_GENRE]

**Role in Story:** [CHARACTER_ROLE] (protagonist, antagonist, supporting, etc.)

Please develop:

1. **Core Identity**
   - Age, appearance, distinguishing features
   - Voice and speech patterns
   - Body language and mannerisms
   - First impression they create

2. **Psychological Profile**
   - Core values and beliefs
   - Greatest fear and deepest desire
   - Internal contradictions
   - Defense mechanisms

3. **Backstory Architecture**
   - Formative childhood experiences
   - Key relationships that shaped them
   - Wounds and traumas
   - Proud moments and achievements

4. **Character Arc Potential**
   - Starting point (beliefs, limitations)
   - What needs to change
   - Catalysts for growth
   - Potential ending states

5. **Relationship Dynamics**
   - How they interact with different character types
   - Trust patterns
   - Conflict styles
   - What they need from others

6. **Distinctive Details**
   - Quirks and habits
   - Possessions that matter to them
   - Secrets they keep
   - Contradictory behaviors`,
    expectedOutput: 'A fully developed character profile with psychological depth, backstory, arc potential, and distinctive details.',
    useCases: [
      'Novel and short story writing',
      'Screenwriting',
      'Role-playing games',
      'Creative writing courses',
    ],
    relatedSlugs: ['story-structure-architect', 'dialogue-polish-workshop'],
  },
  {
    id: '8',
    slug: 'story-structure-architect',
    title: 'Story Structure Architect',
    shortDescription: 'Design compelling narratives using proven story structure frameworks.',
    description: 'This prompt helps you structure your story using classic and contemporary narrative frameworks. Choose from multiple structure options to find the best fit for your story.',
    category: 'prompt',
    subcategory: 'creative-writing',
    tags: ['story', 'structure', 'plot', 'narrative'],
    difficulty: 'intermediate',
    variables: ['STORY_PREMISE', 'GENRE', 'TARGET_LENGTH'],
    content: `You are a narrative structure expert and story consultant. Help me architect my story.

**Story Premise:** [STORY_PREMISE]

**Genre:** [GENRE]

**Target Length:** [TARGET_LENGTH]

Please provide:

1. **Structure Options**
   Apply my premise to THREE different structures:
   - Three-Act Structure
   - Hero's Journey
   - Save the Cat! Beat Sheet

2. **For Each Structure:**
   - Key plot points mapped to premise
   - Suggested scene list
   - Pacing recommendations
   - Strengths for this particular story

3. **Recommended Structure**
   - Which structure fits best and why
   - Detailed beat-by-beat breakdown
   - Scene-by-scene outline

4. **Subplot Integration**
   - 2-3 subplot suggestions
   - How subplots reinforce main theme
   - Weaving strategy

5. **Opening and Closing**
   - 3 opening hook options
   - Climax staging suggestions
   - Resolution approaches

6. **Pacing Guide**
   - Word count distribution by section
   - Tension escalation map
   - Breather moments placement`,
    expectedOutput: 'Complete story structure analysis with multiple framework options, detailed beat sheet, and pacing guide.',
    useCases: [
      'Novel planning',
      'Screenplay outlining',
      'Short story structure',
      'Story revision and restructuring',
    ],
    relatedSlugs: ['character-development-deep-dive', 'dialogue-polish-workshop'],
  },

  // Professional Writing Prompts
  {
    id: '9',
    slug: 'executive-summary-generator',
    title: 'Executive Summary Generator',
    shortDescription: 'Create concise, impactful executive summaries for reports and proposals.',
    description: 'This prompt helps you distill complex information into clear, actionable executive summaries that busy stakeholders can quickly understand and act upon.',
    category: 'prompt',
    subcategory: 'professional',
    tags: ['business', 'executive summary', 'professional', 'reports'],
    difficulty: 'intermediate',
    isPro: true,
    variables: ['DOCUMENT_TYPE', 'FULL_CONTENT', 'TARGET_AUDIENCE', 'DESIRED_ACTION'],
    content: `You are a business communication expert specializing in executive communications. Help me create an executive summary.

**Document Type:** [DOCUMENT_TYPE] (report, proposal, analysis, etc.)

**Full Content to Summarize:** [FULL_CONTENT]

**Target Audience:** [TARGET_AUDIENCE]

**Desired Reader Action:** [DESIRED_ACTION]

Please create:

1. **Executive Summary** (1 page max)
   - Opening hook with key insight
   - Problem/opportunity statement
   - Solution/findings overview
   - Key recommendations
   - Call to action

2. **Key Takeaways Box**
   - 3-5 bullet points
   - Most critical data points
   - Bottom-line message

3. **At-a-Glance Elements**
   - Suggested header
   - Key metrics to highlight
   - Visual element recommendations

4. **Tone Calibration**
   - Adjust formality for audience
   - Action-oriented language
   - Confidence level appropriate to findings

5. **Alternative Versions**
   - 50-word version (email subject + first line)
   - 100-word version (slack/email)
   - 250-word version (brief memo)`,
    expectedOutput: 'A polished executive summary with key takeaways, multiple length versions, and tone-appropriate language.',
    useCases: [
      'Board presentations',
      'Investor updates',
      'Project proposals',
      'Research report summaries',
    ],
    relatedSlugs: ['professional-email-crafter', 'presentation-outline-builder'],
  },
  {
    id: '10',
    slug: 'professional-email-crafter',
    title: 'Professional Email Crafter',
    shortDescription: 'Write clear, professional emails that get results.',
    description: 'This prompt helps you compose effective professional emails for various business situations, ensuring clarity, appropriate tone, and actionable outcomes.',
    category: 'prompt',
    subcategory: 'professional',
    tags: ['email', 'business', 'communication', 'professional'],
    difficulty: 'beginner',
    isNew: true,
    variables: ['EMAIL_PURPOSE', 'RECIPIENT', 'KEY_MESSAGE', 'DESIRED_OUTCOME'],
    content: `You are a business communication expert. Help me craft an effective professional email.

**Email Purpose:** [EMAIL_PURPOSE]

**Recipient:** [RECIPIENT] (role, relationship, context)

**Key Message:** [KEY_MESSAGE]

**Desired Outcome:** [DESIRED_OUTCOME]

Please provide:

1. **Subject Line Options**
   - 3 clear, action-oriented subject lines
   - Open rate optimization tips

2. **Email Body**
   - Professional greeting
   - Opening that establishes context
   - Clear main message
   - Specific ask or call to action
   - Professional closing

3. **Tone Variations**
   - Formal version
   - Conversational version
   - Urgent version (if applicable)

4. **Structure Analysis**
   - Paragraph breakdown
   - Readability check
   - Mobile-friendly formatting

5. **Response Facilitation**
   - Easy-to-answer questions
   - Clear next steps
   - Deadline handling

6. **Common Pitfalls Avoided**
   - Passive language removed
   - Ambiguity eliminated
   - Appropriate length maintained`,
    expectedOutput: 'Complete professional email with subject lines, multiple tone versions, and structure optimized for response.',
    useCases: [
      'Client communication',
      'Internal requests',
      'Follow-up emails',
      'Difficult conversations',
    ],
    relatedSlugs: ['executive-summary-generator', 'presentation-outline-builder'],
  },
];

// Utility functions for data access
export function getAllTemplates(): Template[] {
  return templates;
}

export function getTemplateBySlug(slug: string): Template | undefined {
  return templates.find((t) => t.slug === slug);
}

export function getTemplatesByCategory(category: string): Template[] {
  if (category === 'all') return templates;
  return templates.filter((t) => t.category === category);
}

export function getTemplatesBySubcategory(subcategory: string): Template[] {
  return templates.filter((t) => t.subcategory === subcategory);
}

export function getFeaturedTemplates(): Template[] {
  return templates.filter((t) => t.isFeatured);
}

export function getNewTemplates(): Template[] {
  return templates.filter((t) => t.isNew);
}

export function searchTemplates(query: string): Template[] {
  const searchTerm = query.toLowerCase();
  return templates.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm) ||
      t.description.toLowerCase().includes(searchTerm) ||
      t.shortDescription.toLowerCase().includes(searchTerm) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );
}

export function getRelatedTemplates(slug: string, limit: number = 3): Template[] {
  const template = getTemplateBySlug(slug);
  if (!template) return [];

  // First try related slugs
  if (template.relatedSlugs && template.relatedSlugs.length > 0) {
    const related = template.relatedSlugs
      .map((s) => getTemplateBySlug(s))
      .filter((t): t is Template => t !== undefined)
      .slice(0, limit);
    if (related.length >= limit) return related;
  }

  // Fall back to same subcategory
  const sameSubcategory = templates
    .filter((t) => t.subcategory === template.subcategory && t.slug !== slug)
    .slice(0, limit);

  return sameSubcategory;
}

export function getCategoryInfo(categoryId: string): TemplateCategoryInfo | undefined {
  return templateCategories.find((c) => c.id === categoryId || c.slug === categoryId);
}

export function getAllSubcategories(): TemplateSubcategory[] {
  return templateCategories.flatMap((c) => c.subcategories);
}

export function getSubcategoryInfo(subcategoryId: string): TemplateSubcategory | undefined {
  return getAllSubcategories().find((s) => s.id === subcategoryId || s.slug === subcategoryId);
}

