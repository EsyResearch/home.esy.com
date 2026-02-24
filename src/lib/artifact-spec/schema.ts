import type { ModelId } from '@/lib/models/registry';

export interface ArtifactPalette {
  name: string;
  color: string;
}

export interface ArtifactVisualization {
  name: string;
  type: string;
}

export interface ArtifactMeta {
  title: string;
  subtitle: string;
  category: string;
  subcategory?: string;
  readTime: string;
  sourceCount: number;
  sourceTier: string;
  sectionCount: number;
  visualizationCount: number;
  designSystem: string;
  published: string;
  model: ModelId | string;
  template: string;
  backLink?: string;
  backLabel?: string;
  palette?: ArtifactPalette[];
  visualizations?: ArtifactVisualization[];
  keySources?: string[];
  citationFirst?: boolean;
}
