"use client";

import { useState } from "react";
import { FileText, ChevronDown } from "lucide-react";
import { navyCalmLightTheme as theme } from "@/lib/theme";

type TranscriptToggleProps = {
  transcript: string;
};

export function TranscriptToggle({ transcript }: TranscriptToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!transcript || !transcript.trim()) return null;

  return (
    <div
      style={{
        borderLeft: `1px solid ${theme.border}`,
        borderRight: `1px solid ${theme.border}`,
        borderBottom: `1px solid ${theme.border}`,
        borderRadius: "0 0 12px 12px",
        overflow: "hidden",
        backgroundColor: theme.surfaceElevated,
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1rem",
          border: "none",
          backgroundColor: "transparent",
          color: theme.textSecondary,
          cursor: "pointer",
          fontSize: "0.875rem",
          fontFamily: "inherit",
          transition: "color 0.2s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = theme.text; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = theme.textSecondary; }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FileText size={16} />
          {isOpen ? "Hide Transcript" : "Show Transcript"}
        </span>
        <ChevronDown
          size={16}
          style={{
            transition: "transform 0.2s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {isOpen && (
        <div
          style={{
            borderTop: `1px solid ${theme.border}`,
            padding: "1rem",
            maxHeight: 320,
            overflowY: "auto",
          }}
        >
          <pre
            style={{
              fontSize: "0.875rem",
              lineHeight: 1.7,
              color: theme.textSecondary,
              whiteSpace: "pre-wrap",
              fontFamily: "var(--font-geist-mono)",
              margin: 0,
            }}
          >
            {transcript}
          </pre>
        </div>
      )}
    </div>
  );
}
