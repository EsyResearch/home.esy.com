# Citation Fixes Changelog

This changelog tracks all citation-related fixes across all visual essays.

---

## December 2025

### 2025-12-14

#### the-word-animal
- **[v1.0]** `INIT`: Initial citation audit completed
  - Overall Score: 8/10 (Approved with Notes)
  - Source Tier Distribution: 85% Tier 1-2 (exceeds 80% threshold)
  - Quote Verification: 17/17 quotes verified (100%)
  - Research Directory: Complete with 6 documentation files

- **[v1.0 → v1.1]** `LINK-FIX`: Darwin Online links replaced with Gutenberg
  - Before: darwin-online.org.uk URLs (redirect loop)
  - After: gutenberg.org/ebooks/1228 and /2300
  - Reason: Darwin Online experiencing server issues

- **[v1.1]** `LINK-FIX`: Pliny Natural History URL updated
  - Before: loebclassics.com (403 paywall)
  - After: perseus.tufts.edu (free access)
  - Reason: Provide publicly accessible alternative

- **[v1.1]** `SRC-ADD`: Added species count citation
  - Added: Mora et al. (2011) "How Many Species?" PLOS Biology
  - Supports: "1.5 million described species, 8.7 million total"

- **[v1.1]** `SRC-ADD`: Added DNA similarity citation
  - Added: Chimpanzee Sequencing Consortium, Nature 437 (2005)
  - Supports: "~99% DNA shared with chimpanzees"

- **[v1.1]** `CERT`: Certification status upgraded
  - Before: 🟢 Approved with Notes (8/10)
  - After: ✅ Fully Approved (9/10)

---

## December 2024

### 2024-12-11

#### the-history-of-burmese-cuisine
- **[v1.0 → v1.1]** `SRC-FIX`: Replaced 6 fabricated source URLs with verified sources
  - Before: britannica.com/topic/Myanmar-cuisine (does not exist)
  - After: en.wikipedia.org/wiki/Burmese_cuisine (verified)
  - Before: jstor.org/stable/southeast-asian-studies (invalid URL)
  - After: en.wikipedia.org/wiki/Lahpet (verified)
  - Before: oxford.academia.edu/BurmeseFoodStudies (fabricated)
  - After: en.wikipedia.org/wiki/Ngapi (verified)
  - Before: asiasociety.org/tea-culture-myanmar (does not exist)
  - After: britannica.com/place/Myanmar (verified)
  - Before: burmaresearch.org/konbaung-dynasty (domain doesn't exist)
  - After: en.wikipedia.org/wiki/Konbaung_dynasty (verified)
  - Before: archive.org/details/foodofburma0000khin (uncertain)
  - After: simonandschuster.com/books/The-Burmese-Kitchen (verified)
  - Reason: Original URLs were fabricated placeholder content

- **[v1.1]** `QUOTE-FIX`: Removed quotation marks from fabricated statements
  - Before: Composite character statements in quotation marks (implied real quotes)
  - After: Quotation marks removed, rendered as "perspectives" (editorial descriptions)
  - Technical: Modified FigureProfile component, replaced QuoteMonument with narrative
  - Reason: Cannot present fabricated statements as direct quotes, even with disclosure

- **[v1.1]** `CERT`: Certification status upgraded
  - Before: ⚠️ CONDITIONAL (5.5/10)
  - After: ✅ APPROVED (8.5/10)

---

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

*Last updated: December 14, 2025*
