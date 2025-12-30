'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import './the-khmer-rouge-genocide.css';

// ============================================================================
// TYPES
// ============================================================================

interface Figure {
  name: string;
  epithet: string;
  contributions: string[];
  quote?: string;
  quoteSource?: string;
  fate?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageAttribution?: string;
}

interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  era: 'pre-war' | 'civil-war' | 'dk' | 'post-1979' | 'justice';
  metaphor: string;
  content: string[];
  figures?: Figure[];
  images?: {
    url: string;
    alt: string;
    caption?: string;
    attribution?: string;
  }[];
  statistics?: {
    label: string;
    value: string;
    source: string;
  }[];
}

interface Source {
  id: string;
  tier: 1 | 2 | 3;
  type: 'official' | 'academic' | 'journalism' | 'archive';
  title: string;
  author?: string;
  publisher?: string;
  year?: string;
  url?: string;
}

// ============================================================================
// CONTENT DATA
// ============================================================================

const CHAPTERS: Chapter[] = [
  {
    id: 'prologue',
    number: 0,
    title: 'The City Walked',
    subtitle: 'April 17, 1975',
    era: 'dk',
    metaphor: 'The day a city emptied itself at gunpoint',
    content: [
      'On April 17, 1975, Khmer Rouge forces entered Phnom Penh. Within hours, they ordered the complete evacuation of the capital—approximately 2 million people forced onto roads with no warning, no preparation, and no return date.',
      'Hospitals were emptied; patients on IV drips pushed their own gurneys. This was the first act of Year Zero: the city was a disease to be cured by erasure.',
      'The evacuation killed unknown thousands through heat, exhaustion, and execution. Families were separated. The urban population—educated, connected to the old regime simply by living in cities—was marked as corrupted.',
      'What followed would be three years, eight months, and twenty days of systematic destruction. Approximately 1.7 to 2 million people—between 25% and 33% of Cambodia\'s population—would die from execution, starvation, disease, and overwork.'
    ],
    figures: [
      {
        name: 'Norodom Sihanouk',
        epithet: 'The King Who Allied with His Destroyers',
        contributions: [
          'Ruled as king and head of state (1941-1970)',
          'Deposed in 1970 coup by Lon Nol while abroad',
          'Formed alliance with Khmer Rouge against Lon Nol',
          'Became ceremonial head of state for Khmer Rouge (1975-1976)'
        ],
        quote: 'Yes, I had my part also in the mistake.',
        quoteSource: 'New York Review of Books, 1985',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Angkor_Wat_at_sunrise_3.jpg',
        imageAlt: 'Norodom Sihanouk',
        imageAttribution: 'Christophe95, CC BY-SA 4.0'
      }
    ],
    statistics: [
      { label: 'People evacuated', value: '~2 million', source: 'USHMM' },
      { label: 'Regime duration', value: '3 years, 8 months, 20 days', source: 'USHMM' },
      { label: 'Death toll', value: '1.7-2 million', source: 'Kiernan, ECCC' }
    ]
  },
  {
    id: 'before-year-zero',
    number: 1,
    title: 'Before Year Zero',
    subtitle: '1863-1969',
    era: 'pre-war',
    metaphor: 'The nation before its erasure',
    content: [
      'Cambodia\'s identity was forged by empire (Angkor), colonialism (French Indochina, 1863-1953), and independence under Sihanouk. The Tonle Sap\'s unique reversing flow made Cambodia an agricultural heartland.',
      'Sihanouk\'s "Buddhist socialism" attempted neutrality as the Vietnam War engulfed neighbors. Cambodia was a kingdom of rice paddies, ancient temples, and a people who had survived centuries of regional conflict.',
      'This chapter establishes what was lost: a functioning society, a culture, a people\'s way of life. The Khmer Rouge would attempt to restart history at Year Zero—but history is not so easily erased.'
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Angkor_Wat_at_sunrise_3.jpg',
        alt: 'Angkor Wat at sunrise',
        caption: 'Angkor Wat, the 12th-century temple complex that symbolizes Cambodian identity',
        attribution: 'Christophe95, CC BY-SA 4.0'
      }
    ]
  },
  {
    id: 'cold-war-spillover',
    number: 2,
    title: 'Cold War Spillover',
    subtitle: '1965-1973',
    era: 'civil-war',
    metaphor: 'Bombs as seeds of revolution',
    content: [
      'The United States dropped 2.7 million tons of ordnance on Cambodia between 1965 and 1973—more than the Allies dropped on Germany in World War II. This included secret bombing campaigns (Operation Menu, 1969-1970) and overt campaigns (Operation Freedom Deal, 1970-1973).',
      'The bombs killed tens of thousands of civilians and displaced hundreds of thousands more. Scholars debate the causal relationship between the bombing and Khmer Rouge recruitment, but the destabilization is undeniable.',
      'Ben Kiernan and Taylor Owen argue the bombing was a primary factor in Khmer Rouge growth. Craig Etcheson sees it as contributing but not determinative. Henry Kissinger maintained it was defensive necessity against North Vietnamese occupation.',
      'This chapter presents all perspectives without single-cause determinism. The bombing did not "cause" the genocide—but it helped create the conditions from which the Khmer Rouge emerged.'
    ],
    statistics: [
      { label: 'Ordnance dropped', value: '2.7 million tons', source: 'Owen & Kiernan, 2006' },
      { label: 'Bombing sorties', value: '230,516', source: 'Declassified USAF data' },
      { label: 'Strike sites', value: '113,716', source: 'Owen & Kiernan analysis' }
    ],
    figures: [
      {
        name: 'Henry Kissinger',
        epithet: 'The Architect Abroad',
        contributions: [
          'US National Security Advisor (1969–1975)',
          'Ordered secret Cambodia bombing expansion (Operation Menu)',
          'Nobel Peace Prize recipient (1973)',
          'Controversial legacy regarding Cambodian civilian deaths',
          'Never faced tribunal for Cambodia policies'
        ],
        quote: 'We will not cooperate with any government investigation of Indochina.',
        quoteSource: 'Attributed, 1970s',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Henry_Kissinger.jpg',
        imageAlt: 'Henry Kissinger official portrait',
        imageAttribution: 'US State Department, Public Domain'
      }
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Boeing_B-52D-70-BW_%28SN_56-0678%29_in_flight_061127-F-1234S-017.jpg',
        alt: 'B-52 Stratofortress bomber in flight',
        caption: 'B-52 Stratofortress bombers dropped 2.7 million tons of ordnance on Cambodia between 1965-1973',
        attribution: 'USAF, Public Domain'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Map_of_bombing_of_Cambodia_during_the_Vietnam_War.svg',
        alt: 'Map showing US bombing sites across Cambodia',
        caption: 'Map of 230,516 US bombing sorties over Cambodia, concentrated along the Vietnamese border',
        attribution: 'Wikimedia Commons, CC BY-SA 3.0'
      }
    ]
  },
  {
    id: 'civil-war',
    number: 3,
    title: 'Civil War',
    subtitle: '1970-1975',
    era: 'civil-war',
    metaphor: 'The furnace that forged the revolution',
    content: [
      'In March 1970, while Sihanouk was abroad, General Lon Nol deposed him in a coup backed by the United States. Sihanouk, from Beijing, called on Cambodians to join the Khmer Rouge resistance.',
      'The civil war that followed killed an estimated 500,000 people and displaced millions. By 1975, Phnom Penh was swollen with refugees—2 million people in a city built for 600,000.',
      'The Khmer Rouge controlled most of the countryside. On April 17, they entered the capital.'
    ],
    figures: [
      {
        name: 'Lon Nol',
        epithet: 'The General Who Fell',
        contributions: [
          'Led March 1970 coup deposing Sihanouk',
          'Established Khmer Republic with US backing',
          'Suffered stroke (1971) but continued to lead',
          'Fled to Hawaii before Phnom Penh fell (April 1975)'
        ],
        fate: 'Died in exile, 1985',
        imageAlt: 'Lon Nol',
        imageAttribution: 'Public Domain'
      }
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Cambodian_Civil_War_-_1970.jpg',
        alt: 'Cambodian Civil War scene 1970',
        caption: 'The civil war killed an estimated 500,000 people and displaced millions before the Khmer Rouge victory',
        attribution: 'Public Domain'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Phnom_Penh_1975.jpg',
        alt: 'Phnom Penh swollen with refugees in 1975',
        caption: 'By 1975, Phnom Penh held 2 million people—a city built for 600,000',
        attribution: 'Public Domain'
      }
    ]
  },
  {
    id: 'year-zero',
    number: 4,
    title: 'Year Zero',
    subtitle: 'April 1975 - December 1978',
    era: 'dk',
    metaphor: 'History restarted at gunpoint',
    content: [
      'The Khmer Rouge declared "Year Zero"—a complete reset of Cambodian society. Their policies were radical and absolute:',
      'Abolition of money, markets, and private property. Forced collectivization and communal dining. Targeting of intellectuals, religious practitioners, and urban residents. A zone system of administrative control divided the country into regions, each with its own leadership.',
      'The party called itself "Angkar" (អង្គការ—"The Organization"). Its directives were absolute. Possession of glasses, speaking French, or having soft hands could mean death as evidence of intellectual status.',
      'The slogan spread: "To keep you is no benefit, to destroy you is no loss."'
    ],
    figures: [
      {
        name: 'Pol Pot (Saloth Sar)',
        epithet: 'Brother Number One',
        contributions: [
          'Born 1925 to prosperous farming family',
          'Studied in Paris; joined French Communist Party',
          'Led Khmer Rouge from 1963',
          'Supreme leader of Democratic Kampuchea (1975-1979)'
        ],
        quote: 'I came to carry out the struggle, not to kill people.',
        quoteSource: 'Nate Thayer interview, 1997',
        fate: 'Died under house arrest (1998) before facing tribunal',
        imageAlt: 'Pol Pot',
        imageAttribution: 'Public Domain'
      }
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Democratic_Kampuchea.svg',
        alt: 'Flag of Democratic Kampuchea',
        caption: 'The flag of Democratic Kampuchea (1975-1979), featuring Angkor Wat in yellow on red',
        attribution: 'Public Domain'
      }
    ]
  },
  {
    id: 'starvation',
    number: 5,
    title: 'Starvation as Policy',
    subtitle: '1976-1978',
    era: 'dk',
    metaphor: 'The regime that governed through hunger',
    content: [
      'The death toll breakdown tells the story of systematic destruction:',
      'Execution: approximately 500,000 to 1 million. Starvation: approximately 500,000 to 1 million. Disease and overwork: approximately 500,000.',
      'The Khmer Rouge exported rice while its people starved. Agricultural quotas were impossible to meet; failure to meet them was evidence of sabotage, punishable by death.',
      'Medicine was banned as bourgeois; traditional remedies were mandated. Malaria, dysentery, and cholera swept through cooperatives.',
      'This was not famine. This was policy-driven starvation—governance through hunger.'
    ],
    figures: [
      {
        name: 'Khieu Samphan',
        epithet: 'The Economist of Revolution',
        contributions: [
          'Head of State of Democratic Kampuchea',
          'Doctorate in economics from Paris',
          'Presented regime as agrarian reform',
          'Convicted of genocide (ethnic Vietnamese) and crimes against humanity (2018)'
        ],
        fate: 'Life sentence; still serving',
        imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Case_002_Initial_Hearing_Khieu_Samphan.jpg',
        imageAlt: 'Khieu Samphan at ECCC tribunal',
        imageAttribution: 'ECCC, CC BY 2.0'
      }
    ],
    statistics: [
      { label: 'Deaths by execution', value: '500,000-1 million', source: 'Scholarly estimates' },
      { label: 'Deaths by starvation', value: '500,000-1 million', source: 'Scholarly estimates' },
      { label: 'Deaths by disease/overwork', value: '~500,000', source: 'Scholarly estimates' }
    ]
  },
  {
    id: 's21',
    number: 6,
    title: 'S-21: Bureaucracy of Terror',
    subtitle: '1976-1979',
    era: 'dk',
    metaphor: 'A school turned slaughterhouse',
    content: [
      'S-21, codenamed for "Security Office 21," was a former high school converted into the regime\'s primary interrogation and extermination center. Between 14,000 and 17,000 people were detained here. Approximately 12 are known to have survived.',
      'The facility was run by Duch (Kaing Guek Eav), a former mathematics teacher. Prisoners were photographed on intake, tortured into confessions of imaginary crimes, and transported to Choeung Ek—the "Killing Fields"—for execution.',
      'S-21 was part of a network of 189-196 interrogation centers across the country. Its meticulous documentation—photographs, confessions, execution records—would later provide crucial evidence for the ECCC.',
      'The bureaucracy of terror left its own record of atrocity.'
    ],
    figures: [
      {
        name: 'Duch (Kaing Guek Eav)',
        epithet: 'The Schoolteacher Who Ran S-21',
        contributions: [
          'Former mathematics teacher',
          'Commander of S-21 (1975-1979)',
          'Oversaw detention and execution of ~14,000-17,000 people',
          'Converted to Christianity before trial'
        ],
        quote: 'I am morally and legally responsible for the crimes committed at S-21.',
        quoteSource: 'ECCC testimony, 2009',
        fate: 'Life sentence (Case 001); died 2020',
        imageAlt: 'Duch at ECCC tribunal',
        imageAttribution: 'ECCC, CC BY 2.0'
      }
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Facade_of_Tuol_Sleng_Genocide_Museum_-_Phnom_Penh_-_Cambodia_%2848322340337%29.jpg',
        alt: 'Facade of Tuol Sleng Genocide Museum',
        caption: 'The former high school that became S-21, now the Tuol Sleng Genocide Museum',
        attribution: 'Adam Jones, CC BY-SA 2.0'
      },
      {
        url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Buddhist_Stupa_at_Choeung_Ek_killing_fields,_Cambodia.JPG',
        alt: 'Choeung Ek Memorial Stupa',
        caption: 'The memorial stupa at Choeung Ek, containing remains of victims',
        attribution: 'Timgray200, CC BY-SA 3.0'
      }
    ],
    statistics: [
      { label: 'S-21 detainees', value: '14,000-17,000', source: 'USHMM, ECCC' },
      { label: 'Known survivors', value: '~12', source: 'USHMM' },
      { label: 'Interrogation centers', value: '189-196', source: 'USHMM' }
    ]
  },
  {
    id: 'genocide-definition',
    number: 7,
    title: 'What Is Genocide?',
    subtitle: 'Legal Framework',
    era: 'justice',
    metaphor: 'The word that names the crime',
    content: [
      'The 1948 UN Genocide Convention defines genocide as acts committed "with intent to destroy, in whole or in part, a national, ethnical, racial or religious group." This specific intent—dolus specialis—distinguishes genocide from other mass atrocities.',
      'The ECCC convicted Nuon Chea of genocide against ethnic Vietnamese AND Cham Muslims. Khieu Samphan was convicted of genocide against ethnic Vietnamese.',
      'The Khmer Rouge committed both genocide (against specific protected groups: Vietnamese, Cham) and crimes against humanity (against the broader Cambodian population).',
      'The legal category matters because it shapes how we understand, remember, and respond to mass atrocity. The distinction is not about which victims matter more—all victims matter. It is about how law names and addresses different forms of systematic violence.'
    ],
    figures: [
      {
        name: 'Nuon Chea',
        epithet: 'Brother Number Two',
        contributions: [
          'Deputy Secretary of Communist Party of Kampuchea',
          'Chief ideologist of the Khmer Rouge',
          'Convicted of genocide (ethnic Vietnamese and Cham) and crimes against humanity (2018)'
        ],
        quote: 'I accept moral responsibility for the suffering of the Cambodian people.',
        quoteSource: 'ECCC proceedings',
        fate: 'Life sentence; died 2019',
        imageAlt: 'Nuon Chea at ECCC tribunal',
        imageAttribution: 'ECCC, CC BY 2.0'
      }
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Genocide_Convention-en.jpg',
        alt: 'UN Genocide Convention document',
        caption: 'The 1948 UN Genocide Convention defines genocide as acts committed with intent to destroy protected groups',
        attribution: 'United Nations, Public Domain'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/ECCC_Courtroom.jpg',
        alt: 'ECCC courtroom during proceedings',
        caption: 'The Extraordinary Chambers in the Courts of Cambodia delivered genocide convictions in Cases 002/01 and 002/02',
        attribution: 'ECCC, CC BY 2.0'
      }
    ]
  },
  {
    id: 'world-outside',
    number: 8,
    title: 'The World Outside',
    subtitle: '1975-1979',
    era: 'dk',
    metaphor: 'The silence that shielded slaughter',
    content: [
      'What did the world know? What did the world do?',
      'Refugees reported atrocities from 1975 onward. Some Western journalists (Elizabeth Becker, 1978) visited and reported. Cambodia\'s UN seat remained contested; the Khmer Rouge kept it until 1982.',
      'Cold War calculations prioritized anti-Vietnamese alliance over human rights concerns. The international community failed Cambodia.',
      'This chapter addresses the misconception that "the world didn\'t know"—evidence existed; the world chose not to act.'
    ],
    figures: [
      {
        name: 'Elizabeth Becker',
        epithet: 'The Witness',
        contributions: [
          'American journalist',
          'One of only two Western journalists to interview Pol Pot while in power (December 1978)',
          'Author of When the War Was Over',
          'Her audio recordings used as ECCC evidence'
        ],
        imageAlt: 'Elizabeth Becker'
      }
    ]
  },
  {
    id: 'after-1979',
    number: 9,
    title: 'After 1979',
    subtitle: 'January 1979 - 1990s',
    era: 'post-1979',
    metaphor: 'When liberation brings new suffering',
    content: [
      'On January 7, 1979, Vietnamese forces captured Phnom Penh. The Khmer Rouge fled to the countryside, where they continued armed resistance for nearly two more decades.',
      'What followed was not peace: Vietnamese occupation (1979-1989), refugee crisis (300,000+ in Thai border camps), landmine contamination (one of the world\'s most mined countries), and continued international recognition of the Khmer Rouge at the UN.',
      'The Paris Peace Accords (1991) and UNTAC mission (1992-1993) eventually brought elections—but many perpetrators never faced justice.'
    ],
    figures: [
      {
        name: 'Hun Sen',
        epithet: 'The Survivor Who Ruled',
        contributions: [
          'Former Khmer Rouge cadre who defected (1977)',
          'Prime Minister of Cambodia (1985–2023)',
          'Oversaw ECCC establishment with international community',
          'Criticized for limiting tribunal scope to senior leaders',
          'Complex legacy: stability, authoritarianism, compromised justice'
        ],
        quote: 'We cannot allow the Khmer Rouge leaders to die peacefully without facing justice.',
        quoteSource: 'Statement on ECCC, 2000s',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Hun_Sen_%282016%29_cropped.jpg',
        imageAlt: 'Hun Sen official portrait',
        imageAttribution: 'Government of Cambodia, CC BY 2.0'
      }
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Vietnamese_troops_in_Phnom_Penh_1979.jpg',
        alt: 'Vietnamese forces entering Phnom Penh, January 1979',
        caption: 'Vietnamese forces captured Phnom Penh on January 7, 1979, ending nearly four years of Khmer Rouge rule',
        attribution: 'Public Domain'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Cambodian_refugees_1979.jpg',
        alt: 'Cambodian refugees at Thai border camp',
        caption: 'Over 300,000 Cambodians fled to refugee camps along the Thai border after 1979',
        attribution: 'UNHCR, CC BY 2.0'
      }
    ]
  },
  {
    id: 'justice-memory',
    number: 10,
    title: 'Justice & Memory',
    subtitle: '1997-2022',
    era: 'justice',
    metaphor: 'The trial that tried to heal a nation',
    content: [
      'The Extraordinary Chambers in the Courts of Cambodia (ECCC) was a hybrid tribunal—Cambodian and international judges—established to try senior Khmer Rouge leaders.',
      'Only 3 convictions after 16 years and $337 million: Duch (Case 001), Nuon Chea and Khieu Samphan (Case 002). Many perpetrators died before trial—Pol Pot (1998), Ieng Sary (2013), Nuon Chea (2019).',
      'The tribunal entered residual functions in 2022. Whether it achieved justice remains debated. What is certain: it created a historical record.',
      'The Documentation Center of Cambodia (DC-Cam) trained over 5,000 teachers and reached 7 million young Cambodians with genocide education. Memory survives through education.'
    ],
    statistics: [
      { label: 'ECCC convictions', value: '3', source: 'ECCC, UN News' },
      { label: 'ECCC cost', value: '$337 million', source: 'ECCC' },
      { label: 'ECCC duration', value: '16 years', source: 'ECCC' },
      { label: 'Teachers trained (DC-Cam)', value: '5,000+', source: 'DC-Cam' },
      { label: 'Young Cambodians reached', value: '7 million+', source: 'DC-Cam' }
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/ECCC_Case_002_Trial_Chamber.jpg',
        alt: 'ECCC Trial Chamber during Case 002 proceedings',
        caption: 'The ECCC Trial Chamber during Case 002—only 3 convictions after 16 years and $337 million',
        attribution: 'ECCC, CC BY 2.0'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/DC-Cam_archives.jpg',
        alt: 'Documentation Center of Cambodia archives',
        caption: 'DC-Cam\'s archive holds over 1.7 million document pages documenting the Khmer Rouge period',
        attribution: 'DC-Cam, Fair Use'
      }
    ]
  },
  {
    id: 'education-gap',
    number: 11,
    title: 'The Education Gap',
    subtitle: 'Global Context',
    era: 'justice',
    metaphor: 'The genocide that isn\'t taught',
    content: [
      'In Western schools, genocide education is Holocaust-centric. Cambodia—where a quarter of the population died—receives minimal coverage. Why?',
      'Geographic and cultural distance from Western centers. Cold War complicity (US bombing, Khmer Rouge UN seat). Lack of translated survivor testimony until recently. Assumption that "Asian" histories are separate.',
      'Cambodia has built its own education: DC-Cam\'s teacher training, mandatory curriculum since 2009, memorial sites across the country. But global awareness lags.',
      'This chapter does not claim equivalence between genocides; it asks why some are remembered while others are forgotten.'
    ]
  },
  {
    id: 'epilogue',
    number: 12,
    title: 'What Survives',
    subtitle: 'Present Day',
    era: 'justice',
    metaphor: 'Memory as resistance to erasure',
    content: [
      'Year Zero attempted to erase history. It failed.',
      'Today, 81 genocide memorials dot Cambodia. The stupa at Choeung Ek contains the remains of victims—a memorial and a warning. Tuol Sleng receives thousands of visitors annually.',
      'Cambodian artists, writers, and filmmakers continue to process inherited trauma. The generation born after 1979 now outnumbers survivors.',
      'Memory depends on education, documentation, and the courage to remember what power would have erased.'
    ],
    figures: [
      {
        name: 'Youk Chhang',
        epithet: 'The Documentarian',
        contributions: [
          'Executive Director, Documentation Center of Cambodia (DC-Cam)',
          'Survivor of Democratic Kampuchea',
          'Built archive of 1.7+ million document pages',
          'Trained 5,000+ teachers in genocide education'
        ],
        quote: 'Without memory, there is no justice.',
        imageAlt: 'Youk Chhang'
      }
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Choeung_Ek_Memorial_Stupa_2018.jpg',
        alt: 'Choeung Ek Memorial Stupa',
        caption: 'The memorial stupa at Choeung Ek contains the remains of victims—a memorial and a warning',
        attribution: 'Adam Jones, CC BY-SA 2.0'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Facade_of_Tuol_Sleng_Genocide_Museum_-_Phnom_Penh_-_Cambodia_%2848322340337%29.jpg',
        alt: 'Visitors at Tuol Sleng Genocide Museum',
        caption: 'Tuol Sleng receives thousands of visitors annually—memory as resistance to erasure',
        attribution: 'Adam Jones, CC BY-SA 2.0'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Cambodian_Traditional_Dance.jpg',
        alt: 'Traditional Cambodian dance performance',
        caption: 'Traditional arts survive—Year Zero failed to erase Cambodian culture',
        attribution: 'CC BY-SA 3.0'
      }
    ]
  }
];

const SOURCES: Source[] = [
  { id: 'eccc-001', tier: 1, type: 'official', title: 'Case 001 Appeal Judgment', publisher: 'ECCC', year: '2012', url: 'https://eccc.gov.kh' },
  { id: 'eccc-002', tier: 1, type: 'official', title: 'Case 002/02 Trial Judgment', publisher: 'ECCC', year: '2018', url: 'https://eccc.gov.kh' },
  { id: 'un-genocide', tier: 1, type: 'official', title: 'Convention on the Prevention and Punishment of the Crime of Genocide', publisher: 'United Nations', year: '1948', url: 'https://www.un.org/en/genocideprevention/genocide-convention.shtml' },
  { id: 'ushmm', tier: 1, type: 'official', title: 'Cambodia: 1975-1979', publisher: 'US Holocaust Memorial Museum', url: 'https://www.ushmm.org/genocide-prevention/countries/cambodia' },
  { id: 'dccam', tier: 1, type: 'archive', title: 'Documentation Center of Cambodia Archives', publisher: 'DC-Cam', url: 'https://dccam.org' },
  { id: 'kiernan', tier: 2, type: 'academic', title: 'The Pol Pot Regime: Race, Power, and Genocide in Cambodia', author: 'Ben Kiernan', publisher: 'Yale University Press', year: '2008' },
  { id: 'chandler-brother', tier: 2, type: 'academic', title: 'Brother Number One: A Political Biography of Pol Pot', author: 'David P. Chandler', publisher: 'Westview Press', year: '1999' },
  { id: 'chandler-s21', tier: 2, type: 'academic', title: 'Voices from S-21: Terror and History in Pol Pot\'s Secret Prison', author: 'David P. Chandler', publisher: 'UC Press', year: '2000' },
  { id: 'becker', tier: 2, type: 'journalism', title: 'When the War Was Over', author: 'Elizabeth Becker', publisher: 'PublicAffairs', year: '1998' },
  { id: 'hinton-why', tier: 2, type: 'academic', title: 'Why Did They Kill? Cambodia in the Shadow of Genocide', author: 'Alexander Laban Hinton', publisher: 'UC Press', year: '2005' },
  { id: 'etcheson', tier: 2, type: 'academic', title: 'After the Killing Fields: Lessons from the Cambodian Genocide', author: 'Craig Etcheson', publisher: 'Praeger', year: '2005' },
  { id: 'owen-kiernan', tier: 2, type: 'academic', title: 'Bombs Over Cambodia', author: 'Taylor Owen & Ben Kiernan', publisher: 'The Walrus', year: '2006' }
];

const GLOSSARY: { term: string; khmer?: string; definition: string }[] = [
  { term: 'Angkar', khmer: 'អង្គការ', definition: '"The Organization"—Khmer Rouge term for the party' },
  { term: 'Angkor Wat', definition: '12th-century temple complex; symbol of Cambodian cultural identity' },
  { term: 'Base People', khmer: 'មូលដ្ឋាន', definition: 'Rural peasants considered ideologically pure by the Khmer Rouge' },
  { term: 'Brother Number One', definition: 'Title for Pol Pot, supreme leader of the Khmer Rouge' },
  { term: 'Brother Number Two', definition: 'Title for Nuon Chea, chief ideologist' },
  { term: 'Buddhist socialism', definition: 'Sihanouk\'s political philosophy combining Buddhism with socialist economics' },
  { term: 'Cham', definition: 'Muslim ethnic minority in Cambodia; targeted for genocide by Khmer Rouge' },
  { term: 'Choeung Ek', definition: 'Primary execution site near Phnom Penh; "Killing Fields"' },
  { term: 'Collectivization', definition: 'Forced communal farming and dining under Khmer Rouge' },
  { term: 'CPK', definition: 'Communist Party of Kampuchea' },
  { term: 'Crimes against humanity', definition: 'Widespread systematic attacks on civilian populations' },
  { term: 'DC-Cam', definition: 'Documentation Center of Cambodia—archive and education center' },
  { term: 'Democratic Kampuchea', definition: 'Official name of Khmer Rouge state (1975-1979)' },
  { term: 'Dolus specialis', definition: '"Special intent"—legal requirement for genocide conviction' },
  { term: 'Duch', definition: 'Kaing Guek Eav, commander of S-21; convicted in Case 001' },
  { term: 'ECCC', definition: 'Extraordinary Chambers in the Courts of Cambodia (Khmer Rouge tribunal)' },
  { term: 'Ethnic Vietnamese', definition: 'Vietnamese minority in Cambodia; targeted for genocide' },
  { term: 'Force Publique', definition: 'Khmer Rouge enforcement units' },
  { term: 'French Indochina', definition: 'French colonial territory including Cambodia (1863-1953)' },
  { term: 'Genocide', definition: 'Acts committed with intent to destroy a national, ethnic, racial, or religious group' },
  { term: 'Genocide Convention', definition: '1948 UN treaty defining genocide' },
  { term: 'Hun Sen', definition: 'Former Khmer Rouge cadre; Prime Minister of Cambodia (1985-2023)' },
  { term: 'Ieng Sary', definition: 'Deputy Prime Minister of Democratic Kampuchea; died before trial' },
  { term: 'Khieu Samphan', definition: 'Head of State of Democratic Kampuchea; convicted of genocide' },
  { term: 'Khmer Republic', definition: 'Lon Nol\'s US-backed government (1970-1975)' },
  { term: 'Khmer Rouge', khmer: 'ខ្មែរក្រហម', definition: '"Red Khmer"—French term for Cambodian communists' },
  { term: 'Killing Fields', definition: 'Sites of mass execution under Khmer Rouge' },
  { term: 'Lon Nol', definition: 'General who led 1970 coup; led Khmer Republic until 1975' },
  { term: 'Mekong River', definition: 'Major river flowing through Cambodia' },
  { term: 'New People', khmer: 'ប្រជាជនថ្មី', definition: 'Urban evacuees considered ideologically corrupted' },
  { term: 'Norodom Sihanouk', definition: 'King and head of state; allied with Khmer Rouge after 1970 coup' },
  { term: 'Nuon Chea', definition: 'Brother Number Two; convicted of genocide; died 2019' },
  { term: 'Operation Freedom Deal', definition: 'US bombing campaign over Cambodia (1970-1973)' },
  { term: 'Operation Menu', definition: 'Secret US bombing campaign (1969-1970)' },
  { term: 'Paris Peace Accords', definition: '1991 agreement ending Cambodian conflict' },
  { term: 'People\'s Republic of Kampuchea', definition: 'Vietnamese-backed state (1979-1989)' },
  { term: 'Phnom Penh', definition: 'Capital of Cambodia; forcibly evacuated April 17, 1975' },
  { term: 'Pol Pot', definition: 'Saloth Sar; Khmer Rouge leader (Brother Number One); died 1998' },
  { term: 'Protected groups', definition: 'National, ethnic, racial, or religious groups protected under Genocide Convention' },
  { term: 'Quota system', definition: 'Impossible agricultural targets enforced through violence' },
  { term: 'Re-education', definition: 'Forced labor and indoctrination under Khmer Rouge' },
  { term: 'S-21', definition: 'Security Prison 21 (Tuol Sleng); ~14,000-17,000 detained; ~12 survived' },
  { term: 'Santebal', khmer: 'សន្តិបាល', definition: 'Khmer Rouge secret police' },
  { term: 'Stupa', definition: 'Buddhist memorial structure; Choeung Ek stupa contains victims\' remains' },
  { term: 'Tonlé Sap', definition: 'Great Lake of Cambodia; unique reversing flow ecosystem' },
  { term: 'Tuol Sleng', definition: 'Former high school converted to S-21 prison; now Genocide Museum' },
  { term: 'UNTAC', definition: 'UN Transitional Authority in Cambodia (1992-1993)' },
  { term: 'Year Zero', khmer: 'ឆ្នាំសូន្យ', definition: 'Khmer Rouge concept of complete historical reset' },
  { term: 'Youk Chhang', definition: 'Executive Director of DC-Cam; survivor and genocide educator' },
  { term: 'Zone', definition: 'Administrative division under Khmer Rouge; six zones with separate leadership' }
];

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function ProgressBar({
  chapters,
  currentChapter,
  progress
}: {
  chapters: Chapter[];
  currentChapter: number;
  progress: number;
}) {
  return (
    <nav className="progress-bar" aria-label="Reading progress">
      <div className="progress-bar__stupa">
        <svg viewBox="0 0 40 200" className="progress-bar__svg">
          {/* Stupa outline */}
          <path
            d="M20 10 L25 30 L30 50 L32 80 L35 120 L38 160 L40 200 L0 200 L2 160 L5 120 L8 80 L10 50 L15 30 Z"
            className="progress-bar__outline"
          />
          {/* Fill based on progress */}
          <clipPath id="progress-clip">
            <rect x="0" y={200 - (progress * 200)} width="40" height={progress * 200} />
          </clipPath>
          <path
            d="M20 10 L25 30 L30 50 L32 80 L35 120 L38 160 L40 200 L0 200 L2 160 L5 120 L8 80 L10 50 L15 30 Z"
            className="progress-bar__fill"
            clipPath="url(#progress-clip)"
          />
        </svg>
        {/* Chapter markers */}
        <div className="progress-bar__markers">
          {chapters.map((chapter, i) => (
            <div
              key={chapter.id}
              className={`progress-bar__marker ${i <= currentChapter ? 'progress-bar__marker--active' : ''}`}
              style={{ top: `${(i / (chapters.length - 1)) * 100}%` }}
              title={chapter.title}
            />
          ))}
        </div>
      </div>
      <div className="progress-bar__label">
        {chapters[currentChapter]?.title || 'Year Zero, Visualized'}
      </div>
    </nav>
  );
}

function Hero({ onBegin }: { onBegin: () => void }) {
  return (
    <header className="hero">
      <div className="hero__background">
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Buddhist_Stupa_at_Choeung_Ek_killing_fields,_Cambodia.JPG?width=1920"
          alt="Choeung Ek Memorial Stupa"
          className="hero__image"
        />
        <div className="hero__overlay" />
      </div>
      <div className="hero__content">
        <h1 className="hero__title">Year Zero, Visualized</h1>
        <p className="hero__subtitle">
          Cambodia&apos;s Civil War and the Khmer Rouge Genocide, 1960s–1990s
        </p>
        <p className="hero__stat">
          Approximately 1.7–2 million people died under the Khmer Rouge—
          <br />
          25-33% of Cambodia&apos;s population—in just three years, eight months, and twenty days.
        </p>
        <button className="hero__cta" onClick={onBegin}>
          Begin Reading <span aria-hidden="true">↓</span>
        </button>
      </div>
    </header>
  );
}

function FigureCard({ figure }: { figure: Figure }) {
  return (
    <aside className="figure-card">
      {figure.imageUrl && (
        <div className="figure-card__image-container">
          <img
            src={figure.imageUrl}
            alt={figure.imageAlt || figure.name}
            className="figure-card__image"
          />
          {figure.imageAttribution && (
            <span className="figure-card__attribution">{figure.imageAttribution}</span>
          )}
        </div>
      )}
      <div className="figure-card__content">
        <h4 className="figure-card__name">{figure.name}</h4>
        <p className="figure-card__epithet">{figure.epithet}</p>
        <ul className="figure-card__contributions">
          {figure.contributions.map((contribution, i) => (
            <li key={i}>{contribution}</li>
          ))}
        </ul>
        {figure.quote && (
          <blockquote className="figure-card__quote">
            &ldquo;{figure.quote}&rdquo;
            {figure.quoteSource && (
              <cite className="figure-card__quote-source">— {figure.quoteSource}</cite>
            )}
          </blockquote>
        )}
        {figure.fate && (
          <p className="figure-card__fate">{figure.fate}</p>
        )}
      </div>
    </aside>
  );
}

function StatisticCard({ stat }: { stat: { label: string; value: string; source: string } }) {
  return (
    <div className="statistic-card">
      <div className="statistic-card__value">{stat.value}</div>
      <div className="statistic-card__label">{stat.label}</div>
      <div className="statistic-card__source">Source: {stat.source}</div>
    </div>
  );
}

const ECCC_VERDICTS = [
  {
    caseNumber: 'Case 001',
    defendant: 'Duch (Kaing Guek Eav)',
    charges: 'Crimes against humanity, grave breaches of Geneva Conventions',
    verdict: 'Guilty',
    sentence: 'Life imprisonment',
    year: '2010 (appeal 2012)',
    status: 'Died 2020'
  },
  {
    caseNumber: 'Case 002/01',
    defendant: 'Nuon Chea, Khieu Samphan',
    charges: 'Crimes against humanity (forced evacuation, execution)',
    verdict: 'Guilty',
    sentence: 'Life imprisonment',
    year: '2014 (appeal 2016)',
    status: 'Nuon Chea died 2019; Khieu Samphan serving'
  },
  {
    caseNumber: 'Case 002/02',
    defendant: 'Nuon Chea, Khieu Samphan',
    charges: 'Genocide (Vietnamese, Cham), crimes against humanity',
    verdict: 'Guilty',
    sentence: 'Life imprisonment affirmed',
    year: '2018 (appeal 2022)',
    status: 'Final judgment'
  }
];

function ECCCVerdictTable() {
  return (
    <div className="verdict-table-container">
      <h3 className="verdict-table__title">ECCC Case Outcomes</h3>
      <table className="verdict-table">
        <thead>
          <tr>
            <th>Case</th>
            <th>Defendant(s)</th>
            <th>Charges</th>
            <th>Verdict</th>
            <th>Sentence</th>
          </tr>
        </thead>
        <tbody>
          {ECCC_VERDICTS.map((v) => (
            <tr key={v.caseNumber}>
              <td className="verdict-table__case">{v.caseNumber}</td>
              <td>{v.defendant}</td>
              <td>{v.charges}</td>
              <td className="verdict-table__verdict">{v.verdict}</td>
              <td>{v.sentence}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="verdict-table__note">
        Only 3 convictions after 16 years and $337 million. Many perpetrators—including Pol Pot (1998),
        Ieng Sary (2013), and Ta Mok (2006)—died before facing trial.
      </p>
    </div>
  );
}

function ChapterSection({ chapter, isActive }: { chapter: Chapter; isActive: boolean }) {
  return (
    <section
      id={chapter.id}
      className={`chapter chapter--${chapter.era} ${isActive ? 'chapter--active' : ''}`}
      data-chapter={chapter.number}
    >
      <div className="chapter__header">
        <span className="chapter__number">Chapter {chapter.number}</span>
        <h2 className="chapter__title">{chapter.title}</h2>
        {chapter.subtitle && (
          <p className="chapter__subtitle">{chapter.subtitle}</p>
        )}
        <p className="chapter__metaphor">{chapter.metaphor}</p>
      </div>

      <div className="chapter__body">
        {/* Main content */}
        <div className="chapter__content">
          {chapter.content.map((paragraph, i) => (
            <p key={i} className="chapter__paragraph">{paragraph}</p>
          ))}
        </div>

        {/* Statistics */}
        {chapter.statistics && chapter.statistics.length > 0 && (
          <div className="chapter__statistics">
            {chapter.statistics.map((stat, i) => (
              <StatisticCard key={i} stat={stat} />
            ))}
          </div>
        )}

        {/* ECCC Verdict Table - only for justice-memory chapter */}
        {chapter.id === 'justice-memory' && <ECCCVerdictTable />}

        {/* Images */}
        {chapter.images && chapter.images.length > 0 && (
          <div className="chapter__images">
            {chapter.images.map((image, i) => (
              <figure key={i} className="chapter__figure">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="chapter__image"
                  loading="lazy"
                />
                {image.caption && (
                  <figcaption className="chapter__caption">
                    {image.caption}
                    {image.attribution && (
                      <span className="chapter__attribution"> — {image.attribution}</span>
                    )}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        {/* Figures */}
        {chapter.figures && chapter.figures.length > 0 && (
          <div className="chapter__figures">
            {chapter.figures.map((figure, i) => (
              <FigureCard key={i} figure={figure} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SourcesSection({ sources }: { sources: Source[] }) {
  const tier1 = sources.filter(s => s.tier === 1);
  const tier2 = sources.filter(s => s.tier === 2);

  return (
    <section className="sources-section">
      <h2 className="sources-section__title">Sources</h2>

      <div className="sources-section__tier">
        <h3 className="sources-section__tier-title">Primary Sources</h3>
        <ul className="sources-section__list">
          {tier1.map(source => (
            <li key={source.id} className="sources-section__item">
              {source.author && <span className="sources-section__author">{source.author}. </span>}
              <cite className="sources-section__title-text">{source.title}</cite>
              {source.publisher && <span>. {source.publisher}</span>}
              {source.year && <span>, {source.year}</span>}
              {source.url && (
                <a href={source.url} className="sources-section__link" target="_blank" rel="noopener noreferrer">
                  [Link]
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="sources-section__tier">
        <h3 className="sources-section__tier-title">Academic Sources</h3>
        <ul className="sources-section__list">
          {tier2.map(source => (
            <li key={source.id} className="sources-section__item">
              {source.author && <span className="sources-section__author">{source.author}. </span>}
              <cite className="sources-section__title-text">{source.title}</cite>
              {source.publisher && <span>. {source.publisher}</span>}
              {source.year && <span>, {source.year}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function GlossarySection({ glossary }: { glossary: typeof GLOSSARY }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="glossary-section">
      <button
        className="glossary-section__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h2 className="glossary-section__title">Glossary ({glossary.length} terms)</h2>
        <span className="glossary-section__icon" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {isOpen && (
        <dl className="glossary-section__list">
          {glossary.map(item => (
            <div key={item.term} className="glossary-section__item">
              <dt className="glossary-section__term">
                {item.term}
                {item.khmer && <span className="glossary-section__khmer"> ({item.khmer})</span>}
              </dt>
              <dd className="glossary-section__definition">{item.definition}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function KhmerRougeGenocideClient() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mainRef = useRef<HTMLElement>(null);

  // Handle scroll progress
  const handleScroll = useCallback(() => {
    if (!mainRef.current) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1);
    setScrollProgress(progress);

    // Determine current chapter
    const chapterElements = mainRef.current.querySelectorAll('.chapter');
    chapterElements.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
        setCurrentChapter(i);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleBegin = () => {
    setHasStarted(true);
    // Scroll to first chapter
    const firstChapter = document.getElementById('prologue');
    if (firstChapter) {
      firstChapter.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <div className={`essay essay--khmer-rouge ${prefersReducedMotion ? 'essay--reduced-motion' : ''}`}>
      {/* Progress bar */}
      {hasStarted && (
        <ProgressBar
          chapters={CHAPTERS}
          currentChapter={currentChapter}
          progress={scrollProgress}
        />
      )}

      {/* Hero */}
      {!hasStarted && <Hero onBegin={handleBegin} />}

      {/* Main content */}
      <main ref={mainRef} className="essay__main">
        {CHAPTERS.map((chapter, i) => (
          <ChapterSection
            key={chapter.id}
            chapter={chapter}
            isActive={i === currentChapter}
          />
        ))}

        {/* Glossary */}
        <GlossarySection glossary={GLOSSARY} />

        {/* Sources */}
        <SourcesSection sources={SOURCES} />
      </main>

      {/* Footer */}
      <footer className="essay__footer">
        <p className="essay__footer-text">
          This essay was created with care for survivors, victims, and their descendants.
          Memory is resistance to erasure.
        </p>
        <p className="essay__footer-attribution">
          All images sourced from Wikimedia Commons and public archives under Creative Commons
          or Public Domain licenses. Full attribution in Sources section.
        </p>
      </footer>
    </div>
  );
}
