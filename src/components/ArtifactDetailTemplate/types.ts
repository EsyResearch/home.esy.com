import type { Template, WorkflowStage } from '@/lib/templates/types';

export type { WorkflowStage };

export interface WorkflowCircuitProps {
  stages: WorkflowStage[];
  className?: string;
}

export interface ArtifactDetailTemplateProps {
  template: Template;
  relatedTemplates: Template[];
}
