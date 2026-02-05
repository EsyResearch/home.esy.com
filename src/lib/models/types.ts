// Model Reference System Type Definitions

export type ModelFamilyName = 'Claude' | 'GPT';

export type ModelSubFamilyName = 'Opus' | 'Sonnet' | 'Haiku';

export type AgentRole = 
  | 'planning' 
  | 'research' 
  | 'synthesis' 
  | 'verification' 
  | 'long-context' 
  | 'code-generation' 
  | 'code-review' 
  | 'software-architecture';

export type VersionStatus = 'recommended' | 'supported' | 'legacy' | 'deprecated';

export type ConfidenceLevel = 'primary' | 'secondary' | 'experimental';

export type ModelPageType = 'family' | 'subfamily' | 'version';

export interface ModelVersion {
  version: string;
  status: VersionStatus;
  note?: string;
  releaseDate?: string;
}

export interface ModelSubFamily {
  id: string;
  name: string;
  family: ModelFamilyName;
  description: string;
  versions: ModelVersion[];
}

export interface ModelFamily {
  id: string;
  name: string;
  vendor: string;
  description: string;
  subFamilies?: ModelSubFamily[];
  versions?: ModelVersion[]; // For families without sub-families
}

export interface ModelUsage {
  agentRole: AgentRole;
  description: string;
  confidence: ConfidenceLevel;
}

export interface ModelTemplate {
  slug: string;
  title: string;
  artifactType: string;
  agentRole: string;
  pinnedVersion?: string;
}

export interface ModelPage {
  id: string;
  slug: string;
  type: ModelPageType;
  family: ModelFamily;
  subFamily?: ModelSubFamily;
  version?: ModelVersion;
  description: string;
  usage: ModelUsage[];
  strengths: string[];
  limitations: string[];
  templates: ModelTemplate[];
  lastReviewed?: string;
  researchLinks?: Array<{
    label: string;
    href: string;
  }>;
}
