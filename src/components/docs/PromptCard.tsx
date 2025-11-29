"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

// Design system colors from DESIGN_SYSTEM.md
const colors = {
  bg: '#18181b',
  elevated: '#27272a',
  surface: '#1f1f23',
  text: '#fafafa',
  muted: '#a1a1aa',
  border: 'rgba(63, 63, 70, 0.4)',
  borderSubtle: 'rgba(63, 63, 70, 0.2)',
  accentLight: '#c4b5fd',
  success: '#22c55e',
};

interface PromptCardProps {
  title: string;
  prompt: string;
  category?: string;
}

export function PromptCard({ title, prompt, category }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="group relative rounded-xl p-4 transition-all"
      style={{
        backgroundColor: colors.elevated,
        border: `1px solid ${colors.border}`,
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="min-w-0">
          {category && (
            <span 
              className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md mb-2"
              style={{
                background: 'rgba(139, 92, 246, 0.15)',
                color: colors.accentLight,
              }}
            >
              {category}
            </span>
          )}
          <h4 className="font-semibold text-sm" style={{ color: colors.text }}>
            {title}
          </h4>
        </div>
        <button
          onClick={handleCopy}
          className="shrink-0 p-2 rounded-lg transition-all hover:scale-105"
          style={{
            backgroundColor: copied ? 'rgba(34, 197, 94, 0.15)' : colors.surface,
            color: copied ? colors.success : colors.muted,
          }}
          title="Copy prompt"
          aria-label={copied ? "Copied!" : "Copy prompt"}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <p 
        className="text-sm leading-relaxed font-mono rounded-lg p-3"
        style={{
          color: colors.muted,
          backgroundColor: colors.bg,
          border: `1px solid ${colors.borderSubtle}`,
        }}
      >
        {prompt}
      </p>
    </div>
  );
}

export default PromptCard;
