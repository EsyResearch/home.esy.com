import type { ModelId } from '@/lib/models/registry';

export interface ArtifactPalette {
  name: string;
  color: string;
}

export interface ArtifactVisualization {
  name: string;
  type: string;
}

export type AuthorshipMode = 'human' | 'ai-assisted' | 'ai-directed';

export type AiContribution =
  | 'research'
  | 'code'
  | 'editing'
  | 'fact-checking'
  | 'visualization';

export interface ArtifactAuthor {
  name: string;
  role?: string;
}

export interface ArtifactAuthorship {
  mode: AuthorshipMode;
  author?: ArtifactAuthor;
  director?: ArtifactAuthor;
  model?: ModelId | string;
  aiContributions?: AiContribution[];
}

export interface InfographicMeta {
  title: string;
  description: string;
  cluster: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
  sources?: string[];
  relatedEssays?: string[];
  published: string;
  template: string;
  authorship?: ArtifactAuthorship;
}

export interface ArtifactMeta {
  title: string;
  subtitle: string;
  category: string;
  subcategory?: string;
  readTime: string;
  wordCount?: number;
  sourceCount: number;
  sourceTier: string;
  sectionCount: number;
  visualizationCount: number;
  designSystem: string;
  published: string;
  model: ModelId | string;
  template: string;
  authorship?: ArtifactAuthorship;
  backLink?: string;
  backLabel?: string;
  palette?: ArtifactPalette[];
  visualizations?: ArtifactVisualization[];
  keySources?: string[];
  citationFirst?: boolean;
  /** Shared spec slug linking all builds of the same essay concept */
  spec?: string;
  /** Model shorthand for non-canonical builds (undefined = canonical) */
  variant?: string;
  /** For variants: href to the canonical build for comparison navigation */
  canonicalHref?: string;
}
