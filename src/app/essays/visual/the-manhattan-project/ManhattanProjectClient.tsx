"use client";

import { elevatedDarkTheme } from "@/lib/theme";

export default function ManhattanProjectClient() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: elevatedDarkTheme.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "600px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-literata)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 300,
            color: elevatedDarkTheme.text,
            marginBottom: "1rem",
            letterSpacing: "-0.02em",
          }}
        >
          Coming Soon
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: elevatedDarkTheme.muted,
            lineHeight: 1.6,
          }}
        >
          The Manhattan Project visual essay is currently in development.
        </p>
      </div>
    </main>
  );
}
