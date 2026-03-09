export interface SelectionContext {
  selectedText: string;
  surroundingContext: string;
  sectionTitle: string;
  paragraphElement: HTMLElement | null;
}

export interface InsightRequest {
  content_type: string;
  slug: string;
  selected_text: string;
  surrounding_context: string;
  section_title: string;
  title: string;
  category: string;
  depth: 'standard' | 'deep';
}

export interface InsightResponse {
  insight: string;
  source: 'cached' | 'generated';
  can_go_deeper: boolean;
}

export interface PrecomputedInsights {
  terms: Record<string, string>;
  passages: Record<string, string>;
}

export interface EssayMeta {
  title: string;
  category: string;
  slug: string;
}

export type InsightStatus = 'idle' | 'loading' | 'success' | 'error' | 'unavailable';
