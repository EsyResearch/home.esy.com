"use client";

import { useState } from "react";
import { elevatedDarkTheme } from "@/lib/theme";
import { Copy, Check } from "lucide-react";

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
        backgroundColor: elevatedDarkTheme.elevated,
        border: `1px solid ${elevatedDarkTheme.border}`,
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          {category && (
            <span 
              className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md mb-2"
              style={{
                background: 'rgba(139, 92, 246, 0.15)',
                color: '#c4b5fd',
              }}
            >
              {category}
            </span>
          )}
          <h4 
            className="font-semibold text-sm"
            style={{ color: elevatedDarkTheme.text }}
          >
            {title}
          </h4>
        </div>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 p-2 rounded-lg transition-all"
          style={{
            backgroundColor: copied 
              ? 'rgba(34, 197, 94, 0.15)' 
              : elevatedDarkTheme.surface,
            color: copied 
              ? '#22c55e' 
              : elevatedDarkTheme.muted,
          }}
          title="Copy prompt"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <p 
        className="text-sm leading-relaxed font-mono rounded-lg p-3"
        style={{
          color: elevatedDarkTheme.muted,
          backgroundColor: elevatedDarkTheme.bg,
          border: `1px solid ${elevatedDarkTheme.borderSubtle}`,
        }}
      >
        {prompt}
      </p>
    </div>
  );
}

export default PromptCard;
