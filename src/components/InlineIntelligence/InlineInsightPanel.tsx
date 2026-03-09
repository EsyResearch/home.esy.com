'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { InsightResponse, InsightStatus } from './types';

interface InlineInsightPanelProps {
  paragraphElement: HTMLElement;
  response: InsightResponse | null;
  status: InsightStatus;
  deepening: boolean;
  selectedText: string;
  onGoDeeper: () => void;
  onDismiss: () => void;
}

function LoadingDots() {
  return (
    <span className="inline-intel-dots" aria-label="Loading insight">
      <span className="inline-intel-dots__dot" />
      <span className="inline-intel-dots__dot" />
      <span className="inline-intel-dots__dot" />
    </span>
  );
}

export default function InlineInsightPanel({
  paragraphElement,
  response,
  status,
  deepening,
  selectedText,
  onGoDeeper,
  onDismiss,
}: InlineInsightPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!paragraphElement) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'inline-intel-portal';
    paragraphElement.after(wrapper);
    portalRef.current = wrapper;

    requestAnimationFrame(() => {
      setVisible(true);
      setTimeout(() => {
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 350);
    });

    return () => {
      setVisible(false);
      wrapper.remove();
      portalRef.current = null;
    };
  }, [paragraphElement]);

  useEffect(() => {
    if (!portalRef.current || !panelRef.current) return;

    portalRef.current.innerHTML = '';
    portalRef.current.appendChild(panelRef.current);
  });

  const truncatedText =
    selectedText.length > 80
      ? selectedText.slice(0, 80) + '…'
      : selectedText;

  return (
    <div
      ref={panelRef}
      className={`inline-intel-panel ${visible ? 'inline-intel-panel--open' : ''}`}
      role="complementary"
      aria-label="Text insight"
    >
      <div className="inline-intel-panel__header">
        <span className="inline-intel-panel__label">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Insight
        </span>
        <button
          className="inline-intel-panel__close"
          onClick={onDismiss}
          aria-label="Dismiss insight"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <p className="inline-intel-panel__quote">&ldquo;{truncatedText}&rdquo;</p>

      <div className="inline-intel-panel__body">
        {status === 'loading' && !deepening && <LoadingDots />}
        {(status === 'success' || deepening) && response && (
          <p className="inline-intel-panel__text">{response.insight}</p>
        )}
        {deepening && (
          <div className="inline-intel-panel__deepening">
            <LoadingDots />
            <span className="inline-intel-panel__deepening-label">Going deeper...</span>
          </div>
        )}
        {status === 'error' && !deepening && (
          <p className="inline-intel-panel__error">
            Something went wrong. Try highlighting the text again.
          </p>
        )}
        {status === 'unavailable' && !deepening && (
          <p className="inline-intel-panel__error">
            Insights are temporarily unavailable. Please try again later.
          </p>
        )}
      </div>

      {status === 'success' && response?.can_go_deeper && !deepening && (
        <div className="inline-intel-panel__footer">
          <button className="inline-intel-panel__deeper" onClick={onGoDeeper}>
            Go deeper
          </button>
        </div>
      )}
    </div>
  );
}
