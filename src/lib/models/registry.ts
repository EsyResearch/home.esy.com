import registryData from '../../../orchestration/models/registry.json';

const MODELS = registryData.models;
type ModelsMap = typeof MODELS;
export type ModelId = string & keyof ModelsMap;

export interface ModelEntry {
  label: string;
  vendor: string;
  family: string;
  subfamily: string | null;
  version: string;
  status: 'recommended' | 'supported' | 'legacy' | 'deprecated';
}

const MODEL_REGISTRY: Record<string, ModelEntry> = MODELS as Record<string, ModelEntry>;

export function isModelId(value: string): boolean {
  return value in MODEL_REGISTRY;
}

export function resolveModelLabel(idOrLabel: string): string {
  if (idOrLabel in MODEL_REGISTRY) {
    return MODEL_REGISTRY[idOrLabel].label;
  }
  return idOrLabel;
}

export function getModelEntry(id: ModelId): ModelEntry {
  return MODEL_REGISTRY[id];
}

export function getAllModelIds(): ModelId[] {
  return Object.keys(MODEL_REGISTRY) as ModelId[];
}

export { MODEL_REGISTRY };
