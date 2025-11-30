"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

// Design system colors - Updated for better contrast
const colors = {
  bg: '#18181b',
  elevated: '#27272a',
  surface: '#1f1f23',
  text: '#fafafa',
  muted: 'rgba(255, 255, 255, 0.75)',
  border: 'rgba(255, 255, 255, 0.08)',
  borderSubtle: 'rgba(255, 255, 255, 0.05)',
  accentLight: '#a78bfa',
  success: '#22c55e',
};

interface PromptCardProps {
  title: string;
  prompt: string;
  category?: string;
}

export function PromptCard({ title, prompt, category }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? 'linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)'
          : 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
        border: `1px solid ${isHovered ? 'rgba(159, 122, 234, 0.3)' : colors.border}`,
        borderRadius: '16px',
        padding: '1.25rem',
        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        backdropFilter: 'blur(10px)',
        boxShadow: isHovered
          ? '0 12px 32px rgba(159, 122, 234, 0.2)'
          : '0 4px 16px rgba(0, 0, 0, 0.15)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.875rem' }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          {category && (
            <span 
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.625rem',
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.05em',
                borderRadius: '8px',
                marginBottom: '0.625rem',
                background: 'rgba(139, 92, 246, 0.2)',
                color: colors.accentLight,
                border: '1px solid rgba(139, 92, 246, 0.3)'
              }}
            >
              {category}
            </span>
          )}
          <h4 style={{ 
            fontWeight: 600, 
            fontSize: '1rem',
            color: colors.text,
            lineHeight: 1.4
          }}>
            {title}
          </h4>
        </div>
        <button
          onClick={handleCopy}
          style={{
            flexShrink: 0,
            padding: '0.625rem',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            backgroundColor: copied ? 'rgba(34, 197, 94, 0.15)' : colors.surface,
            color: copied ? colors.success : colors.muted,
            border: `1px solid ${copied ? 'rgba(34, 197, 94, 0.3)' : colors.borderSubtle}`,
            cursor: 'pointer'
          }}
          title="Copy prompt"
          aria-label={copied ? "Copied!" : "Copy prompt"}
          onMouseEnter={(e) => {
            if (!copied) e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
          }}
          onMouseLeave={(e) => {
            if (!copied) e.currentTarget.style.backgroundColor = colors.surface;
          }}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <p 
        style={{
          fontSize: '0.875rem',
          lineHeight: 1.6,
          fontFamily: 'monospace',
          borderRadius: '8px',
          padding: '0.875rem',
          color: 'rgba(255, 255, 255, 0.7)',
          backgroundColor: colors.bg,
          border: `1px solid ${colors.border}`,
        }}
      >
        {prompt}
      </p>
    </div>
  );
}

export default PromptCard;
