import type { InsightRequest, InsightResponse } from '@/components/InlineIntelligence/types';

const API_BASE = process.env.NEXT_PUBLIC_ESY_API_URL || 'https://api.esy.com';

export async function fetchInsight(request: InsightRequest): Promise<InsightResponse> {
  const res = await fetch(`${API_BASE}/v1/insights`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (res.status === 429) {
    throw new Error('rate_limited');
  }

  if (res.status === 503) {
    throw new Error('unavailable');
  }

  if (!res.ok) {
    throw new Error(`insight_error_${res.status}`);
  }

  return res.json();
}
