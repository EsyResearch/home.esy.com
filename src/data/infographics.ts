/**
 * Infographics Data
 *
 * SINGLE SOURCE OF TRUTH for all infographic artifacts across the platform.
 * Used by /infographics, search, sitemap, and cluster interlinking.
 *
 * ORDERING: Infographics are ordered by `publishedDate` descending (newest first).
 *
 * Unlike visual essays (which use static per-directory routing), infographics
 * use dynamic [slug] routing with generateStaticParams. This file drives
 * both the index page and all individual detail pages.
 */

export type InfographicCategory =
  | 'Science'
  | 'History'
  | 'Technology'
  | 'Culture'
  | 'Nature'
  | 'Economics'
  | 'Education';

export interface InfographicDataPoint {
  label: string;
  value: string;
}

export interface InfographicAuthorship {
  mode: 'human' | 'ai-assisted' | 'ai-directed';
  director?: { name: string; role?: string };
  author?: { name: string; role?: string };
  model?: string;
  aiContributions?: string[];
}

export interface Infographic {
  id: string;
  title: string;
  description: string;
  cluster: string;
  category: InfographicCategory;
  imageSrc: string;
  thumbnailSrc?: string;
  animatedSrc?: string;
  imageAlt: string;
  width: number;
  height: number;
  designSystem?: string;
  sourceTier?: string;
  citationFirst?: boolean;
  model?: string;
  authorship?: InfographicAuthorship;
  palette?: Array<{ name: string; color: string }>;
  dataPoints?: InfographicDataPoint[];
  sources?: string[];
  relatedEssays?: string[];
  keywords?: string[];
  publishedDate: string;
  draft?: boolean;
}

export const INFOGRAPHIC_CATEGORY_COLORS: Record<InfographicCategory, string> = {
  'Science': '#10B981',
  'History': '#F59E0B',
  'Technology': '#3B82F6',
  'Culture': '#EC4899',
  'Nature': '#06B6D4',
  'Economics': '#22C55E',
  'Education': '#14B8A6',
};

export const CLUSTER_LABELS: Record<string, string> = {
  'hominids': 'Human Evolution',
  'the-brain': 'The Brain',
  'mythology': 'Mythology & Fables',
  'etymology': 'Etymology',
  'food-history': 'Food & Agriculture',
};

const infographics: Infographic[] = [
  {
    id: 'seven-million-years-homo',
    title: 'How Our Brains Grew Over 7 Million Years',
    description: 'Cranial capacity comparison across 8 hominid species — from Sahelanthropus tchadensis (350 cc) to Homo sapiens (1,350 cc), with Homo naledi as the outlier that challenges the linear growth narrative.',
    cluster: 'hominids',
    category: 'Science',
    imageSrc: 'https://images.esy.com/infographics/seven-million-years-homo.62ef82d9a3.webp',
    thumbnailSrc: 'https://images.esy.com/infographics/seven-million-years-homo-thumb.abc5405e26.webp',
    imageAlt: 'Eight hominid skulls arranged chronologically showing brain volume growth from 350 cc to 1,450 cc over 7 million years, with Homo naledi as a small-brained outlier contemporary with Homo sapiens',
    width: 1376,
    height: 768,
    designSystem: 'Subject-derived',
    sourceTier: 'Tier-1',
    citationFirst: true,
    model: 'nano-banana-2',
    authorship: {
      mode: 'ai-directed',
      director: { name: 'Zev Uhuru' },
      model: 'nano-banana-2',
      aiContributions: ['research', 'visualization'],
    },
    palette: [
      { name: 'Deep Black', color: '#0A0A0A' },
      { name: 'Bone Ivory', color: '#E8DCC8' },
      { name: 'Brain Amber', color: '#D4883A' },
      { name: 'Fossil Grey', color: '#8A8477' },
    ],
    dataPoints: [
      { label: 'Species shown', value: '8' },
      { label: 'Time span', value: '7 million years' },
      { label: 'Smallest brain', value: '350 cc (S. tchadensis)' },
      { label: 'Largest brain', value: '1,450 cc (Neanderthal)' },
      { label: 'The outlier', value: 'H. naledi — 500 cc at 300 ka' },
    ],
    sources: [
      'Seven Million Years: The Complete Visual History of Our Kind — esy.com/essays/science/seven-million-years',
      'Turkana Boy: The First Modern Body — esy.com/essays/science/turkana-boy',
      'Lucy: Before the Genus Homo — esy.com/essays/science/lucy',
      'Homo naledi: The Small-Brained Species That Buried Its Dead — esy.com/essays/science/homo-naledi',
      'Human Evolution, Visualized — esy.com/essays/history/human-evolution',
    ],
    relatedEssays: [
      '/essays/science/seven-million-years',
      '/essays/science/turkana-boy',
      '/essays/science/lucy',
      '/essays/science/homo-naledi',
      '/essays/history/human-evolution',
    ],
    keywords: [
      'human evolution skull comparison',
      'hominid brain size',
      'cranial capacity chart',
      'homo naledi brain size',
      'human brain evolution infographic',
      'hominin skull comparison',
    ],
    publishedDate: '2026-03-09',
  },

  // ── PLACEHOLDER INFOGRAPHICS (replace with real data as they're produced) ──

  {
    id: 'lucy-bipedalism',
    title: 'Lucy & the Birth of Bipedalism',
    description: 'How Australopithecus afarensis transformed locomotion 3.2 million years ago — skeletal evidence for upright walking before large brains.',
    cluster: 'hominids',
    category: 'Science',
    imageSrc: 'https://images.esy.com/infographics/seven-million-years-homo.62ef82d9a3.webp',
    imageAlt: 'Placeholder — Lucy bipedalism infographic',
    width: 1376,
    height: 768,
    keywords: ['lucy skeleton', 'bipedalism evolution', 'australopithecus afarensis'],
    publishedDate: '2026-03-08',
  },
  {
    id: 'turkana-boy-anatomy',
    title: 'Turkana Boy: The Most Complete Early Human',
    description: 'Anatomical breakdown of KNM-WT 15000 — the 1.6 million-year-old Homo erectus skeleton that redefined our understanding of early human body proportions.',
    cluster: 'hominids',
    category: 'Science',
    imageSrc: 'https://images.esy.com/infographics/seven-million-years-homo.62ef82d9a3.webp',
    imageAlt: 'Placeholder — Turkana Boy anatomy infographic',
    width: 1376,
    height: 768,
    keywords: ['turkana boy', 'homo erectus skeleton', 'nariokotome boy'],
    publishedDate: '2026-03-08',
    
  },
  {
    id: 'hominin-migration-routes',
    title: 'Out of Africa: Hominin Migration Routes',
    description: 'Mapping the major dispersal events from Homo erectus to Homo sapiens — across 2 million years and 6 continents.',
    cluster: 'hominids',
    category: 'History',
    imageSrc: 'https://images.esy.com/infographics/seven-million-years-homo.62ef82d9a3.webp',
    imageAlt: 'Placeholder — Hominin migration routes infographic',
    width: 1376,
    height: 768,
    keywords: ['human migration map', 'out of africa', 'hominin dispersal'],
    publishedDate: '2026-03-08',
    
  },
  {
    id: 'neocortex-ratio',
    title: 'The Neocortex Ratio: Why Social Brains Are Big',
    description: 'Dunbar\'s number visualized — correlating neocortex size with social group complexity across primates and hominids.',
    cluster: 'the-brain',
    category: 'Science',
    imageSrc: 'https://images.esy.com/infographics/seven-million-years-homo.62ef82d9a3.webp',
    imageAlt: 'Placeholder — Neocortex ratio infographic',
    width: 1376,
    height: 768,
    keywords: ['dunbar number', 'neocortex ratio', 'social brain hypothesis'],
    publishedDate: '2026-03-08',
    
  },
  {
    id: 'tool-use-timeline',
    title: 'Stone to Steel: 3.3 Million Years of Tool Use',
    description: 'From Lomekwian choppers to Acheulean hand axes — charting the technological leaps that paralleled cognitive evolution.',
    cluster: 'hominids',
    category: 'History',
    imageSrc: 'https://images.esy.com/infographics/seven-million-years-homo.62ef82d9a3.webp',
    imageAlt: 'Placeholder — Tool use timeline infographic',
    width: 1376,
    height: 768,
    keywords: ['stone tools evolution', 'oldowan acheulean', 'human technology timeline'],
    publishedDate: '2026-03-07',
    
  },
];

export const publishedInfographics = infographics
  .filter(i => !i.draft)
  .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

export function getInfographicBySlug(slug: string): Infographic | undefined {
  return publishedInfographics.find(i => i.id === slug);
}

export function getInfographicsByCluster(cluster: string): Infographic[] {
  return publishedInfographics.filter(i => i.cluster === cluster);
}

export function getInfographicSlugs(): string[] {
  return publishedInfographics.map(i => i.id);
}

export function getUniqueClusters(): string[] {
  return [...new Set(publishedInfographics.map(i => i.cluster))];
}
