# Citation Fixes Changelog

This changelog tracks all citation-related fixes across all visual essays.

---

## December 2024

### 2024-12-10

#### the-mirror
- **[v1.0 → v1.1]** `QUOTE-FIX`: Replaced unverified Anish Kapoor quote with verified Anaïs Nin quote
  - Before: "The mirror is a tool of self-confrontation." — Anish Kapoor
  - After: "We don't see things as they are, we see them as we are." — Anaïs Nin
  - Reason: Original quote could not be verified in any reliable source

- **[v1.1]** `STAT-FIX`: Corrected all statistics in Mercury section
  - Global Mirror Market: $4.2B → $145B (2024 verified)
  - Daily Mirror Time: 17 min → 38 min (2014 survey)
  - Homes with Mirrors: 93% → 85% (best available estimate)
  - Added source notes to essay

- **[v1.1]** `QUOTE-FIX`: Fixed vague attribution
  - Before: "What you see in the mirror is not what others see." — Ancient Wisdom
  - After: "What you see in the mirror is not what others see." — Unknown
  - Reason: No ancient text contains this phrase

- **[v1.1]** `SRC-UPG`: Upgraded source tier distribution
  - Added: Britannica — Justus von Liebig Biography (Tier 1)
  - Added: McGill University — How Mirrors Are Made (Tier 1)
  - Added: Britannica — Venetian Glass & Murano (Tier 2)
  - Removed: Wikipedia — Mirror (redundant with Britannica)
  - Result: Tier 1-2 sources increased from 50% to 83%

- **[v1.1]** `CERT`: Certification status upgraded
  - Before: 🟡 Needs Work (6/10)
  - After: ✅ Approved (8.5/10)

---

## Changelog Format

```
### YYYY-MM-DD

#### essay-slug
- **[vX.X]** `ACTION-CODE`: Brief description
  - Before: [previous state]
  - After: [new state]
  - Reason: [why change was made]
```

### Action Codes
| Code | Description |
|------|-------------|
| `INIT` | Initial citation audit |
| `QUOTE-FIX` | Quote corrected/verified/removed |
| `SRC-ADD` | New source added |
| `SRC-REM` | Source removed |
| `SRC-UPG` | Source tier upgraded |
| `STAT-FIX` | Statistic corrected |
| `LINK-FIX` | Broken link repaired |
| `RE-AUDIT` | Full re-audit conducted |
| `CERT` | Certification status changed |

---

*Last updated: December 10, 2024*
