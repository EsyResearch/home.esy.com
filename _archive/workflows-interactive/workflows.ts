// Workflow Demonstrations Data Model
// Public demo workflows for esy.com/workflows

export type ArtifactType = 'essay' | 'infographic' | 'timeline' | 'brief';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type ToneVariant = 'neutral' | 'storytelling' | 'academic';
export type DepthVariant = 'short' | 'medium' | 'deep';
export type CitationMode = 'off' | 'light' | 'heavy';

export interface WorkflowStep {
  id: string;
  name: string;
  purpose: string;
  modelLabel: string;
  tokenEstimateIn: number;
  tokenEstimateOut: number;
  costEstimate: number;
  duration: number; // ms for simulation
  outputVariants: Record<string, string>;
}

export interface Workflow {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  whatYouLearn: string[];
  whatItDemonstrates: string;
  artifactType: ArtifactType;
  difficulty: Difficulty;
  estimatedCost: number;
  estimatedTime: string;
  popularity: number;
  isNew?: boolean;
  steps: WorkflowStep[];
  sampleIntents: string[];
  defaultContext?: string;
  artifactVariants: Record<string, string>;
  inputs: { name: string; description: string }[];
  outputs: { name: string; description: string }[];
}

// Helper to generate variant key
export function getVariantKey(tone: ToneVariant, depth: DepthVariant, citations: CitationMode): string {
  return `${tone}-${depth}-${citations}`;
}

// Demo Workflows
export const workflows: Workflow[] = [
  // 1. First Artifact - Research-backed Essay
  {
    slug: 'first-artifact',
    title: 'Your First Artifact',
    subtitle: 'Research-backed essay from intent to output',
    description: 'Learn how Esy transforms a simple question into a well-researched, structured essay. This workflow demonstrates the core pipeline: intent shaping, research synthesis, and artifact assembly.',
    whatYouLearn: [
      'How intent shapes the research direction',
      'How synthesis distills sources into arguments',
      'How artifacts are assembled from components'
    ],
    whatItDemonstrates: 'The fundamental Esy pipeline: Intent → Research → Synthesis → Assembly → Artifact. Watch how each step builds on the previous, with full token and cost visibility.',
    artifactType: 'essay',
    difficulty: 'beginner',
    estimatedCost: 0.12,
    estimatedTime: '~45 sec',
    popularity: 100,
    isNew: true,
    inputs: [
      { name: 'Intent', description: 'Your research question or topic' },
      { name: 'Context', description: 'Optional constraints and scope' }
    ],
    outputs: [
      { name: 'Essay', description: '800-1200 word structured essay' },
      { name: 'Sources', description: 'Referenced materials and citations' }
    ],
    sampleIntents: [
      'Why did the Roman Empire fall?',
      'How does photosynthesis work?',
      'What caused the 2008 financial crisis?'
    ],
    defaultContext: 'Target audience: general reader. Tone: accessible but informed. Length: approximately 1000 words.',
    steps: [
      {
        id: 'intent-parsing',
        name: 'Intent Parsing',
        purpose: 'Analyze the question to identify key concepts, scope, and research direction',
        modelLabel: 'Analysis Model',
        tokenEstimateIn: 150,
        tokenEstimateOut: 320,
        costEstimate: 0.008,
        duration: 800,
        outputVariants: {
          'neutral-short-off': '**Parsed Intent:**\n- Primary question: Historical causation\n- Key entities: Roman Empire, decline, fall\n- Scope: Political, economic, military factors\n- Output format: Explanatory essay',
          'neutral-medium-off': '**Parsed Intent:**\n- Primary question: Historical causation analysis\n- Key entities: Roman Empire, Western Rome, decline period (3rd-5th century)\n- Scope: Political instability, economic factors, military pressures, social changes\n- Temporal bounds: 235 CE - 476 CE\n- Output format: Structured analytical essay\n- Depth required: Multi-causal explanation',
          'neutral-deep-heavy': '**Parsed Intent:**\n- Primary question: Comprehensive historical causation analysis\n- Key entities: Roman Empire (Western), decline period, fall of Rome\n- Scope: Political (succession crises, administrative decay), Economic (inflation, trade disruption), Military (barbarian pressures, army reforms), Social (population decline, urbanization shifts), Cultural (religious transformation)\n- Temporal bounds: Crisis of Third Century through 476 CE\n- Historiographical context: Gibbon thesis vs. modern revisionism\n- Output format: Academic analytical essay with citations\n- Citation requirement: Heavy (primary and secondary sources)',
          'storytelling-medium-off': '**Parsed Intent:**\n- Narrative frame: The story of an empire\'s twilight\n- Key dramatic elements: Rise and fall arc, key turning points\n- Scope: Human drama behind political/economic forces\n- Emotional register: Epic tragedy, lessons of history\n- Output format: Narrative essay with dramatic structure',
          'academic-deep-heavy': '**Parsed Intent:**\n- Research question: What factors contributed to the dissolution of Roman imperial authority in the West?\n- Methodology: Multi-causal historical analysis\n- Historiographical positioning: Post-Gibbonian synthesis\n- Key debates: Transformation vs. decline, internal vs. external factors\n- Citation framework: Chicago/Turabian\n- Output format: Academic essay with full apparatus'
        }
      },
      {
        id: 'research-synthesis',
        name: 'Research Synthesis',
        purpose: 'Gather and synthesize relevant information from knowledge base',
        modelLabel: 'Research Model',
        tokenEstimateIn: 420,
        tokenEstimateOut: 1800,
        costEstimate: 0.045,
        duration: 1200,
        outputVariants: {
          'neutral-short-off': '**Synthesized Research:**\n\n**Key Factors Identified:**\n1. Political instability (50+ emperors in 50 years during Crisis of Third Century)\n2. Economic troubles (currency debasement, trade disruption)\n3. Military pressure (Germanic tribes, Huns)\n4. Administrative overreach\n\n**Consensus View:** Multiple reinforcing factors rather than single cause.',
          'neutral-medium-off': '**Synthesized Research:**\n\n**Political Factors:**\n- Crisis of Third Century: 235-284 CE saw ~50 emperors\n- Diocletian\'s reforms: Tetrarchy, administrative division\n- Constantine\'s legacy: New capital, religious transformation\n\n**Economic Factors:**\n- Currency debasement: Denarius silver content dropped from 90% to 5%\n- Trade disruption: Mediterranean commerce declined\n- Taxation burden: Coloni system emergence\n\n**Military Factors:**\n- Barbarization of army\n- Frontier pressure: Goths, Vandals, Huns\n- Battle of Adrianople (378 CE): Turning point\n\n**Scholarly Consensus:** Fall was a process, not an event. Multiple reinforcing factors created systemic fragility.',
          'neutral-deep-heavy': '**Comprehensive Research Synthesis:**\n\n**I. Political Dissolution**\n- Crisis of Third Century (235-284 CE): ~26 claimants to throne\n- Diocletian\'s reforms created administrative complexity\n- Division of Empire (395 CE) formalized structural weakness\n- Sources: Heather (2006), Goldsworthy (2009)\n\n**II. Economic Transformation**\n- Antonine Plague (165-180 CE): 25-33% population loss\n- Currency debasement: Silver content 90% → 5% by 270s\n- Shift from monetary to natural economy\n- Sources: Harper (2017), Wickham (2009)\n\n**III. Military Evolution**\n- Limitanei vs. Comitatenses reorganization\n- Foederati integration: Gothic settlement post-382\n- Battle of Adrianople (378): 2/3 of Eastern field army lost\n- Sources: Elton (1996), Lee (2007)\n\n**IV. Historiographical Context**\n- Gibbon thesis: Internal decay, Christianity as factor\n- Modern revision: "Transformation" vs. "Fall" debate\n- Key synthesis: Ward-Perkins (2005) economic archaeology',
          'storytelling-medium-off': '**Research Narrative Elements:**\n\n**The Crisis Years (235-284 CE):**\nImagine an empire where emperors lasted months, not decades. Soldiers made and unmade rulers while frontiers burned.\n\n**The Economic Unraveling:**\nCoins that once bought estates now barely bought bread. Farmers fled to become serfs. Cities shrank behind hastily-built walls.\n\n**The Barbarian Tide:**\nThey came not as conquerors but as refugees—until desperation made them armies. Adrianople wasn\'t just a battle; it was a funeral.\n\n**The Slow Sunset:**\nRome didn\'t fall in a day. It flickered, rallied, flickered again. By 476, the "fall" was almost anticlimactic—a teenager deposed, and no one much cared.',
          'academic-deep-heavy': '**Research Synthesis with Citations:**\n\n**1. Political-Administrative Factors**\nThe political instability following the Severan dynasty created systemic vulnerabilities (Goldsworthy, 2009, pp. 290-315). Heather (2006) argues that the "cumulative effect of frontier pressure and internal political competition" proved insurmountable (p. 431).\n\n**2. Economic-Demographic Factors**\nHarper\'s (2017) analysis of climate data and plague evidence suggests environmental factors compounded political dysfunction. Wickham (2005) demonstrates the transition from tax-based to land-based wealth concentration.\n\n**3. Military-Strategic Factors**\nElton (1996) documents the transformation of Roman military organization, while Lee (2007) analyzes the strategic consequences of Gothic settlement.\n\n**4. Historiographical Positioning**\nWard-Perkins (2005) challenges the "transformation" narrative with archaeological evidence of material decline, while Wickham (2009) offers a synthetic view emphasizing regional variation.'
        }
      },
      {
        id: 'outline-generation',
        name: 'Outline Generation',
        purpose: 'Create structured outline based on research findings',
        modelLabel: 'Writing Model',
        tokenEstimateIn: 1900,
        tokenEstimateOut: 600,
        costEstimate: 0.025,
        duration: 900,
        outputVariants: {
          'neutral-short-off': '**Essay Outline:**\n\n1. **Introduction** - The question of Rome\'s fall\n2. **Political Factors** - Instability and division\n3. **Economic Decline** - Currency and trade\n4. **Military Pressure** - External threats\n5. **Conclusion** - A process, not an event',
          'neutral-medium-off': '**Essay Outline:**\n\n1. **Introduction**\n   - Hook: "Rome wasn\'t built in a day, nor did it fall in one"\n   - Thesis: Multiple reinforcing factors\n\n2. **Political Instability**\n   - Crisis of Third Century\n   - Administrative reforms and their limits\n   - Division of Empire\n\n3. **Economic Transformation**\n   - Currency debasement\n   - Trade disruption\n   - Shift to natural economy\n\n4. **Military Challenges**\n   - Army transformation\n   - Barbarian pressure\n   - Adrianople as turning point\n\n5. **Synthesis**\n   - How factors reinforced each other\n   - Why no single cause suffices\n\n6. **Conclusion**\n   - Process vs. event\n   - Legacy and lessons',
          'neutral-deep-heavy': '**Detailed Essay Outline:**\n\n**I. Introduction**\n- Historiographical context: From Gibbon to modern synthesis\n- Thesis: Systemic fragility from reinforcing political, economic, and military pressures\n- Scope: Western Empire, 235-476 CE\n\n**II. Political Dissolution**\n- A. Crisis of Third Century: Structural causes\n- B. Diocletian\'s reforms: Solutions that created new problems\n- C. Post-Constantine fragmentation\n- D. The question of "decline" vs. "transformation"\n\n**III. Economic Transformation**\n- A. Monetary collapse and its consequences\n- B. Demographic factors: Plague, climate, migration\n- C. From urban economy to rural subsistence\n- D. Archaeological evidence (Ward-Perkins)\n\n**IV. Military Evolution**\n- A. Army reforms: From citizen soldier to professional force\n- B. Barbarization: Integration and its limits\n- C. Strategic overextension\n- D. Adrianople and after\n\n**V. Systemic Analysis**\n- A. Feedback loops between factors\n- B. Why recovery failed\n- C. Regional variation in collapse\n\n**VI. Conclusion**\n- A. Synthesis of causal factors\n- B. Historiographical implications\n- C. Broader lessons for complex systems',
          'storytelling-medium-off': '**Narrative Essay Outline:**\n\n**Act I: The Height Before the Fall**\n- Opening scene: Rome at its zenith\n- Foreshadowing: Cracks beneath the marble\n\n**Act II: The Unraveling**\n- Chapter 1: When Emperors Became Ephemeral\n- Chapter 2: The Coin That Lost Its Silver\n- Chapter 3: Strangers at the Gates\n\n**Act III: The Long Twilight**\n- The reforms that couldn\'t save\n- Adrianople: The battle that changed everything\n- The last emperors\n\n**Epilogue: Not With a Bang**\n- 476 CE: An ending that was barely noticed\n- What remains when empires fall',
          'academic-deep-heavy': '**Academic Essay Outline:**\n\n**I. Introduction**\n1.1 Research question and significance\n1.2 Historiographical context\n1.3 Thesis statement\n1.4 Methodological approach\n\n**II. Literature Review**\n2.1 Classical interpretations (Gibbon)\n2.2 Twentieth-century revisions\n2.3 Contemporary synthesis\n\n**III. Political-Administrative Analysis**\n3.1 Institutional framework\n3.2 Crisis and reform cycles\n3.3 Evidence evaluation\n\n**IV. Economic-Demographic Analysis**\n4.1 Monetary evidence\n4.2 Archaeological data\n4.3 Demographic modeling\n\n**V. Military-Strategic Analysis**\n5.1 Organizational changes\n5.2 Strategic pressures\n5.3 Battle analyses\n\n**VI. Synthesis and Discussion**\n6.1 Causal interconnections\n6.2 Counterfactual considerations\n6.3 Limitations\n\n**VII. Conclusion**\n7.1 Summary of findings\n7.2 Historiographical contribution\n7.3 Future research directions\n\n**References**'
        }
      },
      {
        id: 'draft-assembly',
        name: 'Draft Assembly',
        purpose: 'Generate full essay draft from outline and research',
        modelLabel: 'Writing Model',
        tokenEstimateIn: 2500,
        tokenEstimateOut: 2200,
        costEstimate: 0.035,
        duration: 1500,
        outputVariants: {
          'neutral-short-off': '**Draft Preview (first 200 words):**\n\n# Why Did the Roman Empire Fall?\n\nThe fall of the Roman Empire stands as one of history\'s most studied collapses. Yet despite centuries of scholarship, no single cause explains why the greatest empire of the ancient world crumbled. The answer lies not in any single factor but in the toxic combination of political instability, economic decay, and military pressure that reinforced each other in a downward spiral.\n\nThe political troubles began in earnest during the Crisis of the Third Century, when Rome saw approximately fifty emperors in just fifty years. This constant turnover made long-term planning impossible and encouraged military strongmen to prioritize personal power over imperial welfare...\n\n*[Draft continues for ~800 words]*',
          'neutral-medium-off': '**Draft Preview (first 300 words):**\n\n# Why Did the Roman Empire Fall?\n\n*Rome wasn\'t built in a day, and it didn\'t fall in one either.*\n\nThe collapse of the Roman Empire remains one of history\'s most debated questions. Since Edward Gibbon published his monumental *Decline and Fall* in 1776, scholars have proposed countless explanations: lead poisoning, Christianity, moral decay, climate change, barbarian invasions. Yet the most compelling modern answer is also the most complex: Rome fell because multiple crises reinforced each other until the system could no longer recover.\n\n## Political Instability: When Emperors Became Ephemeral\n\nThe Crisis of the Third Century (235-284 CE) shattered any illusion of political stability. In just fifty years, the empire saw roughly fifty different emperors—most of whom died violently. Armies made and unmade rulers based on who could pay them best, while frontiers went undefended and provinces broke away.\n\nDiocletian\'s reforms after 284 CE brought temporary stability but at enormous cost. The empire was divided administratively, the bureaucracy expanded massively, and taxation became crushing. Constantine\'s decision to found a new capital at Constantinople further divided imperial attention and resources...\n\n## Economic Decay: The Coin That Lost Its Silver\n\nRome\'s economic troubles ran deep. The silver content of Roman coins dropped from about 90% under the early emperors to barely 5% by the 270s. This currency debasement caused rampant inflation, disrupted trade, and eroded trust in imperial institutions...\n\n*[Draft continues for ~1000 words]*',
          'neutral-deep-heavy': '**Draft Preview (first 400 words):**\n\n# The Fall of the Roman Empire: A Systemic Analysis\n\n## Introduction\n\nThe dissolution of Roman imperial authority in the Western Mediterranean represents one of the most consequential political transformations in world history. Since Edward Gibbon\'s *History of the Decline and Fall of the Roman Empire* (1776-1789), scholars have proposed numerous explanatory frameworks, from moral-religious decline to environmental catastrophe. Contemporary historiography, synthesizing archaeological, textual, and scientific evidence, increasingly favors multi-causal models emphasizing systemic fragility. This essay argues that the "fall" of Rome resulted from the interaction of political, economic, and military pressures that created reinforcing feedback loops, ultimately overwhelming the empire\'s adaptive capacity.\n\n## Political-Administrative Dissolution\n\nThe political instability following the Severan dynasty (235 CE) marked a fundamental rupture in Roman governance. As Goldsworthy (2009) documents, the fifty years following Maximinus Thrax\'s accession saw approximately twenty-six legitimate emperors and countless usurpers, creating what historians term the "Crisis of the Third Century" (pp. 290-315). This instability was not merely dynastic but structural: the absence of clear succession mechanisms combined with the army\'s role as kingmaker created perverse incentives favoring military adventurism over administrative competence.\n\nDiocletian\'s reforms (284-305 CE) addressed immediate crises but introduced new vulnerabilities. The tetrarchic system, dividing imperial authority among four rulers, temporarily restored order but institutionalized fragmentation. As Heather (2006) argues, "the cure contained the seeds of future disease" (p. 58)...\n\n*[Draft continues for ~1500 words with full citations]*',
          'storytelling-medium-off': '**Draft Preview (first 300 words):**\n\n# The Twilight of Rome\n\n*An Empire\'s Long Farewell*\n\nPicture Rome at its height: a million souls crowded into the greatest city the world had ever seen. Aqueducts carried water from distant mountains. Roads stretched to the edges of the known world. The Mediterranean was a Roman lake, and the Pax Romana had brought two centuries of unprecedented peace.\n\nNow picture the same city in 410 CE, as Gothic warriors pour through breached walls. Citizens who had never seen an enemy army watch in disbelief as their eternal city burns. The unthinkable has happened.\n\nBut Rome\'s fall didn\'t begin that August day. It began generations earlier, in choices made and crises weathered, in coins debased and borders breached, in a thousand small surrenders that made the final collapse inevitable.\n\n## When Emperors Became Ephemeral\n\nThe year 235 CE should have been unremarkable. Emperor Severus Alexander was campaigning on the Rhine frontier, as emperors often did. But his soldiers, frustrated by what they saw as weakness, murdered him and proclaimed their general Maximinus emperor.\n\nThey had done something far more destructive than killing one man. They had demonstrated that any general with loyal troops could become emperor—and that no emperor was safe. In the fifty years that followed, roughly fifty men claimed the purple. Most died violently...\n\n*[Draft continues for ~1200 words with narrative arc]*',
          'academic-deep-heavy': '**Draft Preview (first 500 words):**\n\n# The Dissolution of Western Roman Imperial Authority: A Multi-Causal Analysis\n\n## Abstract\n\nThis essay examines the factors contributing to the collapse of Roman imperial governance in the Western Mediterranean during the third through fifth centuries CE. Drawing on recent historiographical synthesis, archaeological evidence, and comparative analysis, it argues that the "fall" of Rome resulted from systemic fragility created by reinforcing political, economic, and military pressures. The analysis engages with ongoing debates between "decline" and "transformation" paradigms while emphasizing the utility of complex systems frameworks for understanding historical collapse.\n\n## 1. Introduction\n\n### 1.1 Research Question and Significance\n\nThe dissolution of Roman imperial authority in the West remains among the most studied—and contested—topics in historical scholarship. As Ward-Perkins (2005) observes, "the fall of Rome" has served as "a lens through which every generation has examined its own anxieties about civilizational fragility" (p. 1). This essay addresses the question: What factors contributed to the failure of Roman imperial governance in the Western Mediterranean, and how did these factors interact to produce systemic collapse?\n\n### 1.2 Historiographical Context\n\nSince Gibbon\'s foundational work, explanatory frameworks have evolved considerably. Nineteenth-century scholarship emphasized moral and religious factors; twentieth-century revisionism highlighted economic and demographic forces; contemporary synthesis increasingly employs multi-causal models (Heather, 2006; Wickham, 2009; Harper, 2017). This essay positions itself within the latter tradition while engaging critically with the "transformation" paradigm associated with late antique studies.\n\n### 1.3 Thesis and Methodology\n\nThis analysis argues that Roman imperial collapse resulted from the interaction of three primary factor clusters—political-administrative dysfunction, economic-demographic stress, and military-strategic pressure—operating through reinforcing feedback mechanisms...\n\n*[Draft continues for ~2000 words with full academic apparatus]*'
        }
      },
      {
        id: 'quality-check',
        name: 'Quality Assurance',
        purpose: 'Review draft for coherence, accuracy, and completeness',
        modelLabel: 'QA Model',
        tokenEstimateIn: 2400,
        tokenEstimateOut: 450,
        costEstimate: 0.012,
        duration: 700,
        outputVariants: {
          'neutral-short-off': '**QA Report:**\n✓ Thesis clearly stated\n✓ Arguments logically structured\n✓ Evidence supports claims\n✓ Conclusion synthesizes main points\n\n**Minor suggestions:**\n- Consider adding transition between economic and military sections\n- Opening hook could be stronger\n\n**Overall: Ready for delivery**',
          'neutral-medium-off': '**Quality Assurance Report:**\n\n**Strengths:**\n✓ Clear thesis statement\n✓ Well-organized structure\n✓ Good balance of factors\n✓ Effective use of specific examples\n✓ Strong conclusion that synthesizes arguments\n\n**Areas for refinement:**\n△ Transition between sections 2 and 3 could be smoother\n△ Consider adding one more specific example in military section\n△ Opening hook is good but could be more vivid\n\n**Accuracy check:**\n✓ Dates verified\n✓ Emperor count approximately accurate\n✓ Economic claims supported by scholarship\n\n**Overall assessment: Strong draft, ready for delivery**',
          'neutral-deep-heavy': '**Comprehensive QA Report:**\n\n**Structural Analysis:**\n✓ Thesis clearly articulated and defended\n✓ Section organization follows logical progression\n✓ Paragraph-level coherence maintained\n✓ Transitions generally effective\n\n**Content Evaluation:**\n✓ Historical accuracy verified against sources\n✓ Scholarly consensus accurately represented\n✓ Counterarguments acknowledged where appropriate\n✓ Evidence-claim relationships sound\n\n**Citation Audit:**\n✓ All major claims attributed\n✓ Citation format consistent (Chicago)\n✓ Source diversity adequate\n△ Consider adding primary source reference in section IV\n\n**Style Assessment:**\n✓ Academic register maintained\n✓ Technical terms defined where necessary\n✓ Sentence variety appropriate\n△ Some passive constructions could be revised\n\n**Overall: Publication-ready with minor revisions**',
          'storytelling-medium-off': '**Narrative QA Report:**\n\n**Story arc:**\n✓ Compelling opening scene\n✓ Rising tension through middle sections\n✓ Satisfying resolution\n✓ Emotional resonance achieved\n\n**Historical accuracy:**\n✓ Facts support narrative\n✓ Dramatization doesn\'t distort history\n✓ Key figures appropriately characterized\n\n**Pacing:**\n✓ Scenes well-balanced\n△ Consider tightening middle section slightly\n\n**Voice:**\n✓ Consistent narrative perspective\n✓ Vivid imagery\n✓ Accessible but not condescending\n\n**Overall: Engaging and accurate, ready for delivery**',
          'academic-deep-heavy': '**Academic QA Report:**\n\n**Methodological Rigor:**\n✓ Research question clearly defined\n✓ Methodology appropriate and explicit\n✓ Evidence systematically evaluated\n✓ Limitations acknowledged\n\n**Argumentation:**\n✓ Thesis defensible and significant\n✓ Claims adequately supported\n✓ Counterarguments addressed\n✓ Logical structure sound\n\n**Scholarly Apparatus:**\n✓ Citations complete and consistent\n✓ Bibliography comprehensive\n✓ Engagement with recent scholarship evident\n△ Consider adding reference to Halsall (2007) on barbarian identity\n\n**Style and Convention:**\n✓ Academic register appropriate\n✓ Discipline conventions followed\n✓ Abstract accurately summarizes\n△ Minor passive voice reduction recommended\n\n**Plagiarism/Originality:**\n✓ Original synthesis evident\n✓ Proper attribution throughout\n\n**Overall: Meets publication standards**'
        }
      }
    ],
    artifactVariants: {
      'neutral-short-off': `# Why Did the Roman Empire Fall?

The fall of the Roman Empire stands as one of history's most studied collapses. Yet despite centuries of scholarship, no single cause explains why the greatest empire of the ancient world crumbled. The answer lies not in any single factor but in the toxic combination of political instability, economic decay, and military pressure that reinforced each other in a downward spiral.

## Political Instability

The political troubles began in earnest during the Crisis of the Third Century, when Rome saw approximately fifty emperors in just fifty years. This constant turnover made long-term planning impossible and encouraged military strongmen to prioritize personal power over imperial welfare. Diocletian's reforms brought temporary stability but at the cost of dividing the empire and massively expanding the bureaucracy.

## Economic Decline

Rome's economic foundation crumbled alongside its politics. The silver content of Roman coins dropped from 90% to barely 5%, causing rampant inflation. Trade networks that had once connected the Mediterranean world broke down. Farmers abandoned fields for the relative security of serfdom.

## Military Pressure

External pressures compounded internal decay. Germanic tribes pushed against the frontiers, eventually crossing in waves. The Battle of Adrianople in 378 CE, where Goths destroyed two-thirds of the Eastern Roman army, proved a turning point from which the West never recovered.

## Conclusion

Rome's fall was not a single event but a process spanning centuries. Political instability undermined economic confidence, economic decay weakened military capacity, and military setbacks accelerated political chaos. By 476 CE, when the last Western emperor was deposed, the fall was almost anticlimactic—the empire had already hollowed out from within.`,
      'neutral-medium-off': `# Why Did the Roman Empire Fall?

*Rome wasn't built in a day, and it didn't fall in one either.*

The collapse of the Roman Empire remains one of history's most debated questions. Since Edward Gibbon published his monumental *Decline and Fall* in 1776, scholars have proposed countless explanations: lead poisoning, Christianity, moral decay, climate change, barbarian invasions. Yet the most compelling modern answer is also the most complex: Rome fell because multiple crises reinforced each other until the system could no longer recover.

## Political Instability: When Emperors Became Ephemeral

The Crisis of the Third Century (235-284 CE) shattered any illusion of political stability. In just fifty years, the empire saw roughly fifty different emperors—most of whom died violently. Armies made and unmade rulers based on who could pay them best, while frontiers went undefended and provinces broke away.

Diocletian's reforms after 284 CE brought temporary stability but at enormous cost. The empire was divided administratively, the bureaucracy expanded massively, and taxation became crushing. Constantine's decision to found a new capital at Constantinople further divided imperial attention and resources.

## Economic Decay: The Coin That Lost Its Silver

Rome's economic troubles ran deep. The silver content of Roman coins dropped from about 90% under the early emperors to barely 5% by the 270s. This currency debasement caused rampant inflation, disrupted trade, and eroded trust in imperial institutions.

The consequences rippled outward. Long-distance trade declined as merchants lost confidence in Roman currency. Cities shrank as economic activity contracted. Farmers, crushed by taxation and instability, abandoned their lands or became bound serfs (coloni) on great estates. The vibrant urban economy of the early empire gave way to rural subsistence.

## Military Challenges: Barbarians at the Gates

While Rome weakened internally, external pressures mounted. Germanic tribes—Goths, Vandals, Franks, and others—pushed against the frontiers with increasing success. These were not the primitive savages of Roman propaganda but sophisticated peoples who had learned from centuries of contact with Rome.

The Battle of Adrianople in 378 CE proved catastrophic. Emperor Valens and two-thirds of the Eastern Roman field army died fighting Gothic cavalry. The empire never fully recovered militarily. Within decades, Rome was paying tribute to barbarian kings and settling entire tribes within imperial borders.

## The Feedback Loop of Decline

What made Rome's situation ultimately fatal was how these factors reinforced each other. Political instability undermined economic confidence and military effectiveness. Economic decay starved the military of resources and encouraged political adventurism. Military setbacks accelerated political chaos and economic decline.

Each crisis made the next one harder to address. By the fifth century, the Western Empire had lost the resilience to recover from shocks that earlier generations had weathered.

## Conclusion: Not With a Bang

When Romulus Augustulus, the last Western Roman emperor, was deposed in 476 CE, it was almost anticlimactic. No great battle marked the end. A barbarian general named Odoacer simply decided that the fiction of Western imperial authority was no longer worth maintaining.

Rome's fall teaches us that great powers rarely collapse from a single cause. They decline through the accumulated weight of compounding problems, each making the others worse, until a system that once seemed invincible simply stops functioning. The fall of Rome was less an event than a process—and by the time it was obvious, it was already too late to reverse.`,
      'storytelling-medium-off': `# The Twilight of Rome

*An Empire's Long Farewell*

Picture Rome at its height: a million souls crowded into the greatest city the world had ever seen. Aqueducts carried water from distant mountains. Roads stretched to the edges of the known world. The Mediterranean was a Roman lake, and the Pax Romana had brought two centuries of unprecedented peace.

Now picture the same city in 410 CE, as Gothic warriors pour through breached walls. Citizens who had never seen an enemy army watch in disbelief as their eternal city burns. The unthinkable has happened.

But Rome's fall didn't begin that August day. It began generations earlier, in choices made and crises weathered, in coins debased and borders breached, in a thousand small surrenders that made the final collapse inevitable.

## When Emperors Became Ephemeral

The year 235 CE should have been unremarkable. Emperor Severus Alexander was campaigning on the Rhine frontier, as emperors often did. But his soldiers, frustrated by what they saw as weakness, murdered him and proclaimed their general Maximinus emperor.

They had done something far more destructive than killing one man. They had demonstrated that any general with loyal troops could become emperor—and that no emperor was safe.

In the fifty years that followed, roughly fifty men claimed the purple. Most died violently. The lucky ones lasted a few years; the unlucky, a few weeks. Armies marched not against barbarians but against each other. Provinces broke away. The frontiers burned.

## The Coin That Lost Its Soul

Walk through any Roman market in the year 100 CE, and you'd find merchants happily accepting denarii—silver coins with the emperor's face, worth their weight in precious metal. The Roman economy ran on trust in that silver.

By 270 CE, those coins were copper with a silver wash. The government had debased the currency so badly that the metal itself was nearly worthless. Prices soared. Merchants demanded gold or barter. The web of trade that had connected the Mediterranean world for centuries began to unravel.

Farmers, crushed between falling prices for their goods and rising taxes, faced an impossible choice. Many abandoned their land. Others became serfs, trading freedom for protection on great estates. The cities that had defined Roman civilization began to hollow out.

## Strangers at the Gates

They came first as raiders, then as refugees, then as armies. The Germanic peoples beyond the Rhine and Danube had watched Rome's crisis with keen interest. Where once they had faced disciplined legions, now they found undermanned forts and distracted generals.

The Goths crossed the Danube in 376 CE, fleeing the Huns sweeping out of the Asian steppes. Rome, in a fatal moment of miscalculation, admitted them but then abused and starved them. Within two years, those desperate refugees had destroyed a Roman army and killed an emperor at Adrianople.

After Adrianople, Rome was never the same. The empire had lost not just soldiers but confidence. Barbarian generals rose to command Roman armies. Barbarian kings demanded tribute. The frontier was no longer a line to be defended but a fiction to be maintained.

## Not With a Bang

The man who ended the Roman Empire in the West wasn't a conquering warlord or a crusading ideologue. Odoacer was a barbarian general in Roman service who decided, in 476 CE, that the teenage emperor Romulus Augustulus was more trouble than he was worth.

He didn't sack Rome or massacre its people. He simply sent the boy into comfortable retirement and informed Constantinople that the West no longer needed an emperor. The Senate sent the imperial regalia to the Eastern court, and that was that.

Rome had been dying for so long that its final breath went almost unnoticed. The greatest empire of the ancient world ended not with a bang but with a bureaucratic notification.

## What Remains

Walk through Rome today, and you can still see the Colosseum, the Pantheon, the remnants of forums where senators once debated. But between these monuments, ordinary life continues—people buying groceries, children going to school, lovers meeting in cafes.

That's what the fall of Rome really means. Not the dramatic destruction of Hollywood epics but the slow fading of one world into another. The people who lived through it didn't experience a catastrophe so much as a gradual diminishment, until one day they woke up and realized the empire was gone.

Perhaps that's the most unsettling lesson. Great powers don't usually fall in flames. They flicker, rally, flicker again, and finally go dark—so slowly that no one can say exactly when the light went out.`
    }
  },

  // 2. Infographic Brief
  {
    slug: 'infographic-brief',
    title: 'Infographic Brief',
    subtitle: 'Structured extraction to visual layout',
    description: 'See how Esy extracts key data points from research and structures them for visual presentation. The output is a design-ready brief for an infographic.',
    whatYouLearn: [
      'How data extraction identifies visual elements',
      'How hierarchy determines layout priority',
      'How briefs translate to designer-ready specs'
    ],
    whatItDemonstrates: 'The visualization pipeline: Research → Data Extraction → Hierarchy → Layout Spec → Visual Brief. Ideal for understanding how Esy supports visual content creation.',
    artifactType: 'infographic',
    difficulty: 'intermediate',
    estimatedCost: 0.09,
    estimatedTime: '~35 sec',
    popularity: 75,
    inputs: [
      { name: 'Topic', description: 'Subject for the infographic' },
      { name: 'Focus', description: 'Key message or angle' }
    ],
    outputs: [
      { name: 'Infographic Brief', description: 'Designer-ready specification' },
      { name: 'Data Points', description: 'Extracted facts and figures' }
    ],
    sampleIntents: [
      'The global coffee supply chain',
      'How vaccines work in the body',
      'The water cycle explained'
    ],
    steps: [
      {
        id: 'topic-research',
        name: 'Topic Research',
        purpose: 'Gather comprehensive information on the topic',
        modelLabel: 'Research Model',
        tokenEstimateIn: 200,
        tokenEstimateOut: 1500,
        costEstimate: 0.025,
        duration: 1000,
        outputVariants: {
          'neutral-medium-off': '**Research Summary: Global Coffee Supply Chain**\n\n**Production:**\n- 70+ countries produce coffee\n- Brazil: 37% of global production\n- Vietnam: 16%, Colombia: 8%\n- 25 million farmers worldwide\n- 12.5 million hectares cultivated\n\n**Processing:**\n- Cherry picking → Processing → Drying → Milling → Grading\n- Wet vs. dry processing methods\n- 6-8 weeks from harvest to export-ready\n\n**Trade:**\n- $102.5 billion global market (2023)\n- Second most traded commodity after oil\n- 170 million bags (60kg) traded annually\n\n**Consumption:**\n- 2.25 billion cups consumed daily\n- Finland: highest per capita (12kg/year)\n- USA: largest total consumer'
        }
      },
      {
        id: 'data-extraction',
        name: 'Data Point Extraction',
        purpose: 'Identify visual-friendly facts, figures, and relationships',
        modelLabel: 'Analysis Model',
        tokenEstimateIn: 1600,
        tokenEstimateOut: 800,
        costEstimate: 0.02,
        duration: 800,
        outputVariants: {
          'neutral-medium-off': '**Extracted Data Points:**\n\n**Hero Statistics:**\n- 2.25 billion cups/day (global consumption)\n- 25 million farmers (human scale)\n- $102.5 billion market\n\n**Comparative Data:**\n- Brazil (37%) vs Vietnam (16%) vs Colombia (8%)\n- Production share visualization opportunity\n\n**Process Steps:**\n1. Growing (3-4 years to first harvest)\n2. Harvesting (cherry picking)\n3. Processing (wet/dry)\n4. Drying (7-14 days)\n5. Milling & Grading\n6. Export & Roasting\n7. Consumption\n\n**Geographic Data:**\n- "Bean belt" between tropics\n- 70+ producing countries\n- Major trade routes'
        }
      },
      {
        id: 'hierarchy-design',
        name: 'Hierarchy Design',
        purpose: 'Prioritize information and establish visual hierarchy',
        modelLabel: 'Design Model',
        tokenEstimateIn: 900,
        tokenEstimateOut: 600,
        costEstimate: 0.015,
        duration: 700,
        outputVariants: {
          'neutral-medium-off': '**Visual Hierarchy:**\n\n**Level 1 (Hero):**\n- Title: "From Bean to Cup"\n- Hero stat: 2.25 billion cups daily\n- Visual: Coffee cup icon with steam\n\n**Level 2 (Primary Sections):**\n- Production map (bean belt)\n- Processing timeline (7 steps)\n- Top producers (bar chart)\n\n**Level 3 (Supporting):**\n- Farmer statistics\n- Market value\n- Consumption patterns\n\n**Level 4 (Details):**\n- Per-capita leaders\n- Processing methods comparison\n- Trade route indicators'
        }
      },
      {
        id: 'layout-spec',
        name: 'Layout Specification',
        purpose: 'Generate designer-ready layout and specifications',
        modelLabel: 'Design Model',
        tokenEstimateIn: 700,
        tokenEstimateOut: 900,
        costEstimate: 0.02,
        duration: 900,
        outputVariants: {
          'neutral-medium-off': '**Infographic Specification:**\n\n**Format:** Vertical scroll (1200x3000px)\n**Style:** Modern minimalist, earth tones\n\n**Section 1: Header (300px)**\n- Title: "From Bean to Cup"\n- Subtitle: "The Global Coffee Journey"\n- Hero stat with icon\n\n**Section 2: Production (600px)**\n- World map with bean belt highlighted\n- Top 3 producers with percentages\n- Icon: coffee plant\n\n**Section 3: Process (900px)**\n- 7-step horizontal timeline\n- Icons for each stage\n- Duration callouts\n\n**Section 4: Trade (600px)**\n- Market value headline\n- Trade volume stat\n- Ship/route illustration\n\n**Section 5: Consumption (600px)**\n- Cups per day stat\n- Top consumers list\n- Coffee cup fill visualization\n\n**Color Palette:**\n- Primary: #6F4E37 (coffee brown)\n- Secondary: #C4A484 (cream)\n- Accent: #228B22 (plant green)\n- Background: #FFF8F0 (warm white)'
        }
      }
    ],
    artifactVariants: {
      'neutral-medium-off': `# Infographic Brief: From Bean to Cup

## Overview
**Title:** From Bean to Cup: The Global Coffee Journey
**Format:** Vertical infographic (1200 × 3000px)
**Style:** Modern minimalist with earth-tone palette

---

## Visual Specification

### Header Section
**Height:** 300px

| Element | Specification |
|---------|---------------|
| Title | "From Bean to Cup" - 48pt, Coffee Brown (#6F4E37) |
| Subtitle | "The Global Coffee Journey" - 24pt, Warm Gray |
| Hero Stat | "2.25 Billion Cups Daily" - 72pt with cup icon |

### Production Section
**Height:** 600px

**Elements:**
- World map showing "Bean Belt" (23.5°N to 23.5°S)
- Highlighted producing regions
- Top 3 Producers bar chart:
  - 🇧🇷 Brazil: 37%
  - 🇻🇳 Vietnam: 16%
  - 🇨🇴 Colombia: 8%
- Supporting stat: "25 million farmers worldwide"

### Process Timeline Section
**Height:** 900px

**7-Step Horizontal Timeline:**
1. **Growing** (3-4 years) - Plant icon
2. **Harvesting** - Hand-picking icon
3. **Processing** - Water/sun icons
4. **Drying** (7-14 days) - Sun rays icon
5. **Milling** - Machine icon
6. **Roasting** - Flame icon
7. **Brewing** - Cup icon

### Trade Section
**Height:** 600px

**Key Statistics:**
- "$102.5 Billion" - Global market value
- "170 Million Bags" - Annual trade volume
- "2nd Most Traded" - After crude oil
- Ship route illustration connecting continents

### Consumption Section
**Height:** 600px

**Visualization:** Coffee cup fill levels showing:
- 🇫🇮 Finland: 12kg/person/year
- 🇳🇴 Norway: 9.9kg
- 🇮🇸 Iceland: 9kg
- 🇺🇸 USA: Largest total volume

---

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Coffee Brown | #6F4E37 | Primary text, headers |
| Cream | #C4A484 | Secondary elements |
| Plant Green | #228B22 | Growing/nature elements |
| Warm White | #FFF8F0 | Background |
| Accent Gold | #DAA520 | Highlights, statistics |

---

## Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Title | Playfair Display | 48pt | Bold |
| Section Headers | Montserrat | 32pt | Semi-bold |
| Body Text | Open Sans | 16pt | Regular |
| Statistics | Montserrat | Various | Bold |

---

## Design Notes

1. **Flow:** Top-to-bottom narrative following coffee's journey
2. **Icons:** Simple, consistent line-art style
3. **Data Viz:** Minimal, high-contrast charts
4. **Whitespace:** Generous margins between sections
5. **Mobile:** Consider 2-column layout for wide sections`
    }
  },

  // 3. Timeline History
  {
    slug: 'timeline-history',
    title: 'Historical Timeline',
    subtitle: 'Chronological narrative from events',
    description: 'Watch how Esy extracts chronological data, identifies pivotal moments, and constructs a narrative arc for historical topics.',
    whatYouLearn: [
      'How chronology extraction works',
      'How pivotal events are identified',
      'How narrative arc shapes timelines'
    ],
    whatItDemonstrates: 'The timeline pipeline: Research → Chronology → Event Selection → Narrative Arc → Visual Timeline. Essential for understanding historical content creation.',
    artifactType: 'timeline',
    difficulty: 'intermediate',
    estimatedCost: 0.11,
    estimatedTime: '~40 sec',
    popularity: 82,
    inputs: [
      { name: 'Historical Topic', description: 'Era, event, or development to chronicle' },
      { name: 'Time Range', description: 'Start and end dates (optional)' }
    ],
    outputs: [
      { name: 'Timeline', description: 'Chronological visualization' },
      { name: 'Narrative', description: 'Connecting story thread' }
    ],
    sampleIntents: [
      'The Space Race (1957-1975)',
      'The development of the internet',
      'The French Revolution'
    ],
    steps: [
      {
        id: 'chronology-extraction',
        name: 'Chronology Extraction',
        purpose: 'Extract dated events from historical research',
        modelLabel: 'Research Model',
        tokenEstimateIn: 250,
        tokenEstimateOut: 1400,
        costEstimate: 0.028,
        duration: 1100,
        outputVariants: {
          'neutral-medium-off': '**Extracted Chronology: The Space Race**\n\n**1957**\n- Oct 4: Sputnik 1 launch (USSR)\n- Nov 3: Sputnik 2 with Laika\n\n**1958**\n- Jan 31: Explorer 1 (USA)\n- Jul 29: NASA established\n\n**1961**\n- Apr 12: Gagarin - first human in space\n- May 5: Shepard - first American in space\n- May 25: Kennedy Moon speech\n\n**1962**\n- Feb 20: Glenn orbits Earth\n\n**1963**\n- Jun 16: Tereshkova - first woman in space\n\n**1965**\n- Mar 18: Leonov - first spacewalk\n\n**1967**\n- Jan 27: Apollo 1 fire (3 deaths)\n\n**1968**\n- Dec 24: Apollo 8 orbits Moon\n\n**1969**\n- Jul 20: Apollo 11 Moon landing\n\n**1975**\n- Jul 17: Apollo-Soyuz mission'
        }
      },
      {
        id: 'event-selection',
        name: 'Pivotal Event Selection',
        purpose: 'Identify the most significant moments for the narrative',
        modelLabel: 'Analysis Model',
        tokenEstimateIn: 1500,
        tokenEstimateOut: 700,
        costEstimate: 0.022,
        duration: 800,
        outputVariants: {
          'neutral-medium-off': '**Pivotal Events Selected:**\n\n**Tier 1 (Must Include):**\n1. Sputnik 1 (1957) - Catalyst event\n2. Gagarin\'s flight (1961) - First human\n3. Kennedy\'s speech (1961) - Political commitment\n4. Moon landing (1969) - Climax\n5. Apollo-Soyuz (1975) - Resolution\n\n**Tier 2 (Major Context):**\n- Explorer 1 - US response\n- Glenn\'s orbit - US catches up\n- Apollo 1 fire - Cost of ambition\n- Apollo 8 - Dress rehearsal\n\n**Tier 3 (Supporting):**\n- Laika - Emotional hook\n- Tereshkova - Broader participation\n- Leonov - EVA milestone\n\n**Narrative Arc:**\nCrisis → Response → Commitment → Setbacks → Triumph → Reconciliation'
        }
      },
      {
        id: 'narrative-arc',
        name: 'Narrative Arc Construction',
        purpose: 'Build the connecting story between events',
        modelLabel: 'Writing Model',
        tokenEstimateIn: 800,
        tokenEstimateOut: 600,
        costEstimate: 0.018,
        duration: 900,
        outputVariants: {
          'neutral-medium-off': '**Narrative Arc:**\n\n**Act 1: The Shock (1957-1958)**\nSputnik\'s beep shocked America into action. A Soviet basketball-sized satellite circling overhead every 98 minutes made the Cold War very real.\n\n**Act 2: The Chase (1961-1965)**\nGagarin\'s orbit humiliated America again. Kennedy\'s response: reach for the Moon. What followed was the most ambitious engineering project in human history.\n\n**Act 3: The Price (1967)**\nApollo 1\'s fire reminded everyone that space exploration could kill. Three astronauts died on the launch pad. The program nearly collapsed.\n\n**Act 4: The Triumph (1968-1969)**\nApollo 8\'s Christmas orbit showed the Moon was within reach. Seven months later, Armstrong stepped onto lunar soil.\n\n**Epilogue: The Handshake (1975)**\nAmerican and Soviet spacecraft docked in orbit—former rivals now partners. The race was over; a new era had begun.'
        }
      },
      {
        id: 'timeline-assembly',
        name: 'Timeline Assembly',
        purpose: 'Construct the visual timeline with events and narrative',
        modelLabel: 'Design Model',
        tokenEstimateIn: 1400,
        tokenEstimateOut: 1000,
        costEstimate: 0.032,
        duration: 1000,
        outputVariants: {
          'neutral-medium-off': '**Timeline Specification:**\n\n**Format:** Vertical timeline, alternating sides\n**Period:** 1957-1975 (18 years)\n**Events:** 12 major milestones\n\n**Visual Elements:**\n- Central spine with year markers\n- Event cards alternating left/right\n- Icon per event type (rocket, astronaut, handshake)\n- Color coding: USSR (red), USA (blue), Joint (purple)\n\n**Event Cards Include:**\n- Date\n- Event title\n- 1-2 sentence description\n- Significance indicator (star rating)\n- Optional image placeholder\n\n**Narrative Connectors:**\n- Dashed lines between related events\n- Arc labels at section breaks\n- Quote callouts for key moments'
        }
      }
    ],
    artifactVariants: {
      'neutral-medium-off': `# The Space Race Timeline
## 1957-1975: From Sputnik to Apollo-Soyuz

---

### 🔴 1957 | THE SHOCK

**October 4, 1957**
### Sputnik 1 Launches
The Soviet Union places the first artificial satellite in orbit. Its radio signal—a simple beep—echoes around the world every 98 minutes, announcing a new era.
*"Listen now for the sound that will forever separate the old from the new."*

**November 3, 1957**
### Laika Orbits Earth
Sputnik 2 carries the first living creature to orbit—a stray dog named Laika. She dies within hours, but proves survival in space is possible.

---

### 🔵 1958 | THE RESPONSE

**January 31, 1958**
### Explorer 1 (USA)
America's first satellite discovers the Van Allen radiation belts. The space race has two competitors.

**July 29, 1958**
### NASA Established
President Eisenhower signs NASA into existence, consolidating America's space efforts under civilian control.

---

### 🔴 1961 | THE CHALLENGE

**April 12, 1961**
### Gagarin: First Human in Space ★★★★★
Yuri Gagarin completes one orbit of Earth in Vostok 1. "I see Earth. It is so beautiful."
The Soviets have won another first.

**May 25, 1961**
### Kennedy's Moon Speech ★★★★★
"I believe that this nation should commit itself to achieving the goal, before this decade is out, of landing a man on the Moon and returning him safely to the Earth."
The race has a finish line.

---

### 🔵 1962-1965 | THE CHASE

**February 20, 1962**
### Glenn Orbits Earth
John Glenn becomes the first American to orbit Earth. America is catching up.

**June 16, 1963**
### Tereshkova: First Woman in Space 🔴
Valentina Tereshkova spends three days in orbit—more than all American astronauts combined at that point.

**March 18, 1965**
### First Spacewalk 🔴
Alexei Leonov floats outside his spacecraft for 12 minutes. His suit inflates dangerously; he barely survives.

---

### ⚫ 1967 | THE PRICE

**January 27, 1967**
### Apollo 1 Fire ★★★★
Astronauts Grissom, White, and Chaffee die in a launch pad fire during a routine test. The Moon program nearly ends.
*"If we die, we want people to accept it... The conquest of space is worth the risk of life."* — Gus Grissom

---

### 🔵 1968-1969 | THE TRIUMPH

**December 24, 1968**
### Apollo 8 Orbits the Moon ★★★★★
Humans see the far side of the Moon for the first time. On Christmas Eve, they read from Genesis while Earth rises over the lunar horizon.

**July 20, 1969**
### Apollo 11: Moon Landing ★★★★★
Neil Armstrong and Buzz Aldrin walk on the Moon. 600 million people watch live.
*"That's one small step for man, one giant leap for mankind."*
America has won the race.

---

### 🟣 1975 | THE HANDSHAKE

**July 17, 1975**
### Apollo-Soyuz Mission ★★★★
American and Soviet spacecraft dock in orbit. Astronaut Tom Stafford and Cosmonaut Alexei Leonov shake hands through the hatch.
The Space Race is over. Cooperation begins.

---

## By the Numbers

| Metric | USSR | USA |
|--------|------|-----|
| First Satellite | ✓ | |
| First Human in Space | ✓ | |
| First Spacewalk | ✓ | |
| First Moon Landing | | ✓ |
| Total Moon Landings | 0 | 6 |
| Lives Lost | 4 | 7 |

---

*"We came in peace for all mankind."*
— Plaque left on the Moon, Apollo 11`
    }
  },

  // 4. Source Checker
  {
    slug: 'source-checker',
    title: 'Source Verification',
    subtitle: 'Claim analysis and confidence scoring',
    description: 'Experience how Esy evaluates claims against sources, scores confidence levels, and generates verification briefs for fact-checking.',
    whatYouLearn: [
      'How claims are extracted and isolated',
      'How sources are evaluated for reliability',
      'How confidence scores are calculated'
    ],
    whatItDemonstrates: 'The verification pipeline: Claim Extraction → Source Matching → Confidence Scoring → Verification Brief. Critical for understanding Esy\'s quality assurance capabilities.',
    artifactType: 'brief',
    difficulty: 'advanced',
    estimatedCost: 0.14,
    estimatedTime: '~50 sec',
    popularity: 68,
    inputs: [
      { name: 'Text', description: 'Content containing claims to verify' },
      { name: 'Focus', description: 'Specific claims or general verification' }
    ],
    outputs: [
      { name: 'Verification Brief', description: 'Confidence-scored analysis' },
      { name: 'Source Report', description: 'Evaluated citations' }
    ],
    sampleIntents: [
      'Verify: "Coffee is the second most traded commodity after oil"',
      'Fact-check this paragraph about climate change statistics',
      'Evaluate the historical claims in this article'
    ],
    steps: [
      {
        id: 'claim-extraction',
        name: 'Claim Extraction',
        purpose: 'Identify specific verifiable claims in the content',
        modelLabel: 'Analysis Model',
        tokenEstimateIn: 300,
        tokenEstimateOut: 500,
        costEstimate: 0.015,
        duration: 700,
        outputVariants: {
          'neutral-medium-heavy': '**Extracted Claims:**\n\n1. **Primary Claim:** "Coffee is the second most traded commodity after oil"\n   - Type: Statistical ranking\n   - Specificity: High\n   - Verifiable: Yes\n\n2. **Implicit Claims:**\n   - Coffee has higher trade volume than other commodities\n   - Oil is #1 traded commodity\n   - This ranking is current/recent\n\n3. **Scope Questions:**\n   - By value or volume?\n   - Which commodities included?\n   - What time period?'
        }
      },
      {
        id: 'source-matching',
        name: 'Source Matching',
        purpose: 'Find and evaluate relevant sources for each claim',
        modelLabel: 'Research Model',
        tokenEstimateIn: 600,
        tokenEstimateOut: 1200,
        costEstimate: 0.035,
        duration: 1200,
        outputVariants: {
          'neutral-medium-heavy': '**Source Evaluation:**\n\n**Source 1: International Coffee Organization (ICO)**\n- Authority: High (industry body)\n- Claim support: Partial\n- Quote: "Coffee is one of the most valuable primary products in world trade"\n- Note: Does not claim #2 ranking specifically\n\n**Source 2: World Trade Organization (WTO)**\n- Authority: High (intergovernmental)\n- Claim support: Not found\n- Note: Commodity rankings vary by methodology\n\n**Source 3: Various Business Publications**\n- Authority: Medium\n- Claim support: Repeated but unattributed\n- Pattern: Claim appears to be "zombie statistic"\n\n**Source 4: Academic Research (2019)**\n- Authority: High\n- Finding: By value, coffee ranks below oil, natural gas, gold, iron ore\n- By volume metrics differ significantly'
        }
      },
      {
        id: 'confidence-scoring',
        name: 'Confidence Scoring',
        purpose: 'Calculate verification confidence based on evidence',
        modelLabel: 'Analysis Model',
        tokenEstimateIn: 1300,
        tokenEstimateOut: 600,
        costEstimate: 0.025,
        duration: 800,
        outputVariants: {
          'neutral-medium-heavy': '**Confidence Analysis:**\n\n**Claim: "Coffee is the second most traded commodity after oil"**\n\n**Confidence Score: 35/100 (LOW)**\n\n**Scoring Breakdown:**\n- Primary source support: 15/30 (ICO doesn\'t make this specific claim)\n- Secondary source consensus: 10/25 (claim repeated but unverified)\n- Methodological clarity: 5/20 (no clear measurement basis)\n- Recency: 5/15 (rankings shift annually)\n- Expert consensus: 0/10 (economists dispute this)\n\n**Verdict: MISLEADING**\n\nThe claim is widely repeated but appears to be a "zombie statistic" without clear sourcing. Coffee is among the most traded agricultural commodities, but the #2 overall ranking is not supported by trade data.'
        }
      },
      {
        id: 'brief-generation',
        name: 'Verification Brief',
        purpose: 'Generate comprehensive verification report',
        modelLabel: 'Writing Model',
        tokenEstimateIn: 2000,
        tokenEstimateOut: 1500,
        costEstimate: 0.055,
        duration: 1100,
        outputVariants: {
          'neutral-medium-heavy': '**Verification Brief Generated**\n\nThe brief includes:\n- Executive summary\n- Claim breakdown\n- Source evaluation matrix\n- Confidence scoring methodology\n- Verdict with reasoning\n- Corrected statement recommendation\n- Further reading suggestions'
        }
      }
    ],
    artifactVariants: {
      'neutral-medium-heavy': `# Verification Brief

## Claim Under Review
> "Coffee is the second most traded commodity after oil"

---

## Executive Summary

| Metric | Value |
|--------|-------|
| **Confidence Score** | 35/100 |
| **Verdict** | MISLEADING |
| **Primary Issue** | Unsubstantiated ranking claim |
| **Sources Reviewed** | 7 |

This widely-repeated claim appears to be a "zombie statistic"—frequently cited but without clear original sourcing. While coffee is economically significant, trade data does not support the specific #2 ranking.

---

## Detailed Analysis

### Claim Decomposition

The statement makes several implicit claims:

1. ✓ Coffee is a major traded commodity *(Supported)*
2. ✗ Coffee ranks exactly #2 *(Not supported)*
3. ✗ Only oil exceeds coffee in trade *(Not supported)*
4. ? Ranking is by value/volume *(Undefined)*

### Source Evaluation

| Source | Authority | Supports Claim | Notes |
|--------|-----------|----------------|-------|
| International Coffee Organization | High | Partial | Says "one of most valuable" not "#2" |
| World Trade Organization | High | No | No such ranking published |
| UN Comtrade Database | High | No | Coffee not in top 10 by value |
| Business publications | Medium | Repeats | No original source cited |
| Academic literature | High | Contradicts | Multiple commodities rank higher |

### What the Data Actually Shows

**By Trade Value (2022):**
1. Crude petroleum: $1.3 trillion
2. Refined petroleum: $800 billion
3. Natural gas: $400 billion
4. Gold: $380 billion
5. Iron ore: $150 billion
...
~15. Coffee: $30-40 billion

**Among Agricultural Commodities:**
Coffee consistently ranks in the top 5 agricultural exports globally, but not #2 overall.

---

## Confidence Score Breakdown

| Factor | Score | Max | Reasoning |
|--------|-------|-----|-----------|
| Primary source support | 15 | 30 | Industry body doesn't make this claim |
| Source consensus | 10 | 25 | Repeated but unverified pattern |
| Methodological clarity | 5 | 20 | No clear measurement basis |
| Data recency | 5 | 15 | Rankings shift with prices |
| Expert agreement | 0 | 10 | Trade economists dispute this |
| **Total** | **35** | **100** | |

---

## Verdict: MISLEADING

### Why This Rating

The claim is not fabricated—coffee is indeed a major commodity. However:

1. **No authoritative source** makes this specific ranking claim
2. **Trade data contradicts** the #2 position
3. **Ambiguous metrics** (value vs. volume) obscure the claim
4. **Origin is unclear**—appears to be folk wisdom passed as fact

### The "Zombie Statistic" Pattern

This claim exhibits classic zombie statistic traits:
- Sounds plausible and memorable
- Frequently repeated without verification
- Original source untraceable
- Persists despite contradicting data

---

## Recommended Correction

**Instead of:**
> "Coffee is the second most traded commodity after oil"

**Consider:**
> "Coffee is among the world's most traded agricultural commodities, with global exports valued at approximately $30-40 billion annually."

Or more specifically:
> "Coffee is one of the most economically significant agricultural exports, supporting 25 million farming families worldwide."

---

## Further Reading

1. International Coffee Organization Trade Statistics
2. UN Comtrade Database
3. "The Economics of Coffee" - International Trade Centre
4. World Trade Statistical Review (WTO, Annual)

---

*Verification conducted using Esy's source-checking workflow. Confidence scores reflect evidence quality, not claim importance.*`
    }
  }
];

// Helper functions
export function getWorkflowBySlug(slug: string): Workflow | undefined {
  return workflows.find(w => w.slug === slug);
}

export function getAllWorkflows(): Workflow[] {
  return workflows;
}

export function getWorkflowsByDifficulty(difficulty: Difficulty): Workflow[] {
  return workflows.filter(w => w.difficulty === difficulty);
}

export function getWorkflowsByArtifactType(type: ArtifactType): Workflow[] {
  return workflows.filter(w => w.artifactType === type);
}

export function searchWorkflows(query: string): Workflow[] {
  const q = query.toLowerCase();
  return workflows.filter(w =>
    w.title.toLowerCase().includes(q) ||
    w.subtitle.toLowerCase().includes(q) ||
    w.description.toLowerCase().includes(q) ||
    w.whatYouLearn.some(item => item.toLowerCase().includes(q))
  );
}

// Artifact type display info
export const ARTIFACT_TYPE_INFO: Record<ArtifactType, { label: string; icon: string; color: string }> = {
  essay: { label: 'Essay', icon: '📝', color: '#8b5cf6' },
  infographic: { label: 'Infographic', icon: '📊', color: '#f59e0b' },
  timeline: { label: 'Timeline', icon: '📅', color: '#10b981' },
  brief: { label: 'Brief', icon: '📋', color: '#3b82f6' }
};

// Difficulty display info
export const DIFFICULTY_INFO: Record<Difficulty, { label: string; color: string }> = {
  beginner: { label: 'Beginner', color: '#22c55e' },
  intermediate: { label: 'Intermediate', color: '#f59e0b' },
  advanced: { label: 'Advanced', color: '#ef4444' }
};
