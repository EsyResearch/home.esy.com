import type { PrecomputedInsights } from '@/components/InlineIntelligence/types';

const cache = new Map<string, PrecomputedInsights | null>();

export async function loadPrecomputedInsights(slug: string): Promise<PrecomputedInsights | null> {
  if (cache.has(slug)) return cache.get(slug)!;

  try {
    const res = await fetch(`/insights/${slug}.json`);
    if (!res.ok) {
      cache.set(slug, null);
      return null;
    }
    const data: PrecomputedInsights = await res.json();
    cache.set(slug, data);
    return data;
  } catch {
    cache.set(slug, null);
    return null;
  }
}

export function lookupPrecomputed(
  insights: PrecomputedInsights | null,
  selectedText: string
): string | null {
  if (!insights) return null;

  const normalized = selectedText.trim().toLowerCase();

  for (const [term, insight] of Object.entries(insights.terms)) {
    if (normalized.includes(term.toLowerCase()) || term.toLowerCase().includes(normalized)) {
      return insight;
    }
  }

  for (const [, insight] of Object.entries(insights.passages)) {
    return insight;
  }

  return null;
}

export function addToSession(
  insights: PrecomputedInsights | null,
  selectedText: string,
  insight: string
): void {
  if (!insights) return;
  insights.terms[selectedText] = insight;
}
