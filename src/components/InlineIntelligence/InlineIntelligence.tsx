'use client';

import React from 'react';
import { useSelectionIntelligence } from './useSelectionIntelligence';
import FloatingActionButton from './FloatingActionButton';
import InlineInsightPanel from './InlineInsightPanel';
import type { EssayMeta } from './types';
import './InlineIntelligence.css';

interface InlineIntelligenceProps {
  meta: EssayMeta;
}

export default function InlineIntelligence({ meta }: InlineIntelligenceProps) {
  const {
    selectionContext,
    buttonPosition,
    insightResponse,
    status,
    activeParagraph,
    deepening,
    requestInsight,
    dismiss,
  } = useSelectionIntelligence(meta);

  return (
    <>
      {buttonPosition && selectionContext && (
        <FloatingActionButton
          position={buttonPosition}
          onClick={() => requestInsight('standard')}
          onDismiss={dismiss}
        />
      )}
      {activeParagraph && status !== 'idle' && (
        <InlineInsightPanel
          paragraphElement={activeParagraph}
          response={insightResponse}
          status={status}
          deepening={deepening}
          selectedText={selectionContext?.selectedText || ''}
          onGoDeeper={() => requestInsight('deep')}
          onDismiss={dismiss}
        />
      )}
    </>
  );
}
