'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { SelectionContext, InsightResponse, EssayMeta, InsightStatus } from './types';
import { fetchInsight } from '@/lib/insights/api';
import { loadPrecomputedInsights, lookupPrecomputed, addToSession } from '@/lib/insights/precomputed';
import type { PrecomputedInsights } from './types';

const MIN_SELECTION_LENGTH = 10;

function extractSelectionContext(): SelectionContext | null {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) return null;

  const text = selection.toString().trim();
  if (text.length < MIN_SELECTION_LENGTH) return null;

  const range = selection.getRangeAt(0);
  const container = document.getElementById('artifact-essay-content');
  if (!container || !container.contains(range.commonAncestorContainer)) return null;

  let paragraphEl: HTMLElement | null = range.endContainer as HTMLElement;
  while (paragraphEl && paragraphEl !== container) {
    if (paragraphEl.nodeName === 'P' || paragraphEl.nodeName === 'DIV') break;
    paragraphEl = paragraphEl.parentElement;
  }
  if (paragraphEl === container) paragraphEl = null;

  const parentText = paragraphEl?.textContent || '';
  const prevSibling = paragraphEl?.previousElementSibling;
  const nextSibling = paragraphEl?.nextElementSibling;
  const prevText = prevSibling?.textContent || '';
  const nextText = nextSibling?.textContent || '';
  const surroundingContext = [prevText, parentText, nextText]
    .filter(Boolean)
    .join('\n\n')
    .slice(0, 3000);

  let sectionTitle = '';
  let walker: HTMLElement | null = paragraphEl;
  while (walker && walker !== container) {
    if (walker.nodeName === 'H2' || walker.nodeName === 'H3') {
      sectionTitle = walker.textContent || '';
      break;
    }
    const prevEl = walker.previousElementSibling as HTMLElement | null;
    if (prevEl && (prevEl.nodeName === 'H2' || prevEl.nodeName === 'H3')) {
      sectionTitle = prevEl.textContent || '';
      break;
    }
    walker = walker.parentElement;
  }

  return {
    selectedText: text,
    surroundingContext,
    sectionTitle,
    paragraphElement: paragraphEl,
  };
}

export function useSelectionIntelligence(essayMeta: EssayMeta) {
  const [selectionContext, setSelectionContext] = useState<SelectionContext | null>(null);
  const [buttonPosition, setButtonPosition] = useState<{ top: number; left: number } | null>(null);
  const [insightResponse, setInsightResponse] = useState<InsightResponse | null>(null);
  const [status, setStatus] = useState<InsightStatus>('idle');
  const [activeParagraph, setActiveParagraph] = useState<HTMLElement | null>(null);
  const [deepening, setDeepening] = useState(false);
  const precomputedRef = useRef<PrecomputedInsights | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    loadPrecomputedInsights(essayMeta.slug).then((data) => {
      precomputedRef.current = data;
    });
  }, [essayMeta.slug]);

  const handleSelectionChange = useCallback(() => {
    const context = extractSelectionContext();
    if (!context) {
      setSelectionContext(null);
      setButtonPosition(null);
      return;
    }

    setSelectionContext(context);

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setButtonPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    }
  }, []);

  useEffect(() => {
    const container = document.getElementById('artifact-essay-content');
    if (!container) return;

    let selectionDebounce: ReturnType<typeof setTimeout> | null = null;

    const onMouseUp = () => {
      setTimeout(handleSelectionChange, 10);
    };
    const onTouchEnd = () => {
      setTimeout(handleSelectionChange, 200);
    };
    const onSelectionChange = () => {
      if (selectionDebounce) clearTimeout(selectionDebounce);
      selectionDebounce = setTimeout(handleSelectionChange, 300);
    };

    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchend', onTouchEnd);
    document.addEventListener('selectionchange', onSelectionChange);
    return () => {
      container.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('selectionchange', onSelectionChange);
      if (selectionDebounce) clearTimeout(selectionDebounce);
    };
  }, [handleSelectionChange]);

  const dismiss = useCallback(() => {
    setSelectionContext(null);
    setButtonPosition(null);
    setInsightResponse(null);
    setStatus('idle');
    setActiveParagraph(null);
    setDeepening(false);
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }, []);

  const requestInsight = useCallback(
    async (depth: 'standard' | 'deep' = 'standard') => {
      if (!selectionContext) return;

      const precomputed = lookupPrecomputed(
        precomputedRef.current,
        selectionContext.selectedText
      );
      if (precomputed && depth === 'standard') {
        setInsightResponse({
          insight: precomputed,
          source: 'cached',
          can_go_deeper: true,
        });
        setStatus('success');
        setActiveParagraph(selectionContext.paragraphElement);
        setButtonPosition(null);
        return;
      }

      const isDeepening = depth === 'deep' && status === 'success';
      if (!isDeepening) {
        setStatus('loading');
      } else {
        setDeepening(true);
      }
      setActiveParagraph(selectionContext.paragraphElement);
      setButtonPosition(null);

      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      try {
        const response = await fetchInsight({
          content_type: 'essay',
          slug: essayMeta.slug,
          selected_text: selectionContext.selectedText,
          surrounding_context: selectionContext.surroundingContext,
          section_title: selectionContext.sectionTitle,
          title: essayMeta.title,
          category: essayMeta.category,
          depth,
        });
        setInsightResponse(response);
        setStatus('success');
        setDeepening(false);
        addToSession(precomputedRef.current, selectionContext.selectedText, response.insight);
      } catch (err: unknown) {
        setDeepening(false);
        const message = err instanceof Error ? err.message : '';
        if (message === 'unavailable') {
          setStatus('unavailable');
        } else {
          setStatus('error');
        }
      }
    },
    [selectionContext, essayMeta, status]
  );

  return {
    selectionContext,
    buttonPosition,
    insightResponse,
    status,
    activeParagraph,
    deepening,
    requestInsight,
    dismiss,
  };
}
