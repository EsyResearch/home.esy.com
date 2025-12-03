'use client';

import React, { useState } from 'react';
import { elevatedDarkTheme } from '@/lib/theme';
import { Copy, Check, Code2 } from 'lucide-react';

interface TemplatePreviewProps {
  content: string;
  variables?: string[];
  title?: string;
}

export default function TemplatePreview({
  content,
  variables = [],
  title = 'Prompt Template',
}: TemplatePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Highlight variables in the content
  const highlightedContent = content.replace(
    /\[([^\]]+)\]/g,
    '<span class="template-variable">[$1]</span>'
  );

  return (
    <div
      style={{
        background: 'linear-gradient(145deg, rgba(10, 10, 15, 0.95) 0%, rgba(15, 15, 22, 0.98) 50%, rgba(8, 8, 12, 0.95) 100%)',
        border: `1px solid ${elevatedDarkTheme.border}`,
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          borderBottom: `1px solid ${elevatedDarkTheme.divider}`,
          background: 'rgba(255, 255, 255, 0.02)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: elevatedDarkTheme.muted,
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        >
          <Code2 size={18} style={{ color: elevatedDarkTheme.accent }} />
          {title}
        </div>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: copied
              ? `${elevatedDarkTheme.success}20`
              : elevatedDarkTheme.borderSubtle,
            border: `1px solid ${copied ? elevatedDarkTheme.success : elevatedDarkTheme.border}`,
            borderRadius: '8px',
            color: copied ? elevatedDarkTheme.success : elevatedDarkTheme.muted,
            fontSize: '0.8125rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div
        style={{
          padding: '1.5rem',
          maxHeight: '500px',
          overflowY: 'auto',
        }}
      >
        <pre
          style={{
            fontFamily: "'SF Mono', 'JetBrains Mono', 'Monaco', monospace",
            fontSize: '0.875rem',
            lineHeight: 1.7,
            color: elevatedDarkTheme.textSecondary,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            margin: 0,
          }}
          dangerouslySetInnerHTML={{ __html: highlightedContent }}
        />
      </div>

      {/* Variables indicator */}
      {variables.length > 0 && (
        <div
          style={{
            padding: '1rem 1.5rem',
            borderTop: `1px solid ${elevatedDarkTheme.divider}`,
            background: 'rgba(255, 255, 255, 0.01)',
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              color: elevatedDarkTheme.subtle,
              marginBottom: '0.5rem',
              fontWeight: 500,
            }}
          >
            Variables to customize:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {variables.map((variable) => (
              <span
                key={variable}
                style={{
                  padding: '0.25rem 0.625rem',
                  background: `${elevatedDarkTheme.accent}15`,
                  color: elevatedDarkTheme.accentLight,
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontFamily: "'SF Mono', monospace",
                  border: `1px solid ${elevatedDarkTheme.accent}30`,
                }}
              >
                [{variable}]
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Styles for variable highlighting */}
      <style jsx global>{`
        .template-variable {
          color: ${elevatedDarkTheme.accentLight};
          background: ${elevatedDarkTheme.accent}15;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

