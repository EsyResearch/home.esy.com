# SEO Rich Results Audit — Batch 1

**Date:** December 17, 2025  
**Auditor:** SEO Orchestrator Agent  
**Scope:** 3 essays (the-history-of-burmese-cuisine, the-history-of-languages, the-history-of-pizza)

---

## Summary

| Essay | Canonical | OG/Twitter | JSON-LD | FAQs | Status |
|-------|-----------|------------|---------|------|--------|
| the-history-of-burmese-cuisine | ✅ Fixed | ✅ Complete | ✅ Article+BreadcrumbList+FAQPage | 5 | ✅ Pass |
| the-history-of-languages | ✅ Fixed | ✅ Complete | ✅ Article+BreadcrumbList+FAQPage | 5 | ✅ Pass |
| the-history-of-pizza | ✅ Fixed | ✅ Complete | ✅ Article+BreadcrumbList+FAQPage | 5 | ✅ Pass |

---

## 1. the-history-of-burmese-cuisine

### Before
- Canonical: `/essays/visual/the-history-of-burmese-cuisine/` ❌ (wrong path)
- JSON-LD: None
- FAQs: None

### After
- Canonical: `https://esy.com/essays/the-history-of-burmese-cuisine/` ✅
- OG/Twitter: Complete with Wikimedia image, `@EsyResearch`, alt text
- JSON-LD: Article + BreadcrumbList + FAQPage (5 Q&As)
- Publisher logo: `https://esy.com/esy-logo.png`
- inLanguage: `en-US`
- articleSection: `Food History`

### FAQs Implemented
1. What is the cornerstone of Burmese cuisine?
2. What is Myanmar's national dish?
3. What is laphet thoke?
4. How did trade routes influence Burmese food?
5. How has the diaspora shaped modern Burmese cuisine?

### Blocking Issues Resolved
- [x] Wrong canonical URL path fixed
- [x] Missing JSON-LD added
- [x] Missing FAQPage schema added

---

## 2. the-history-of-languages

### Before
- Canonical: `/essays/visual/the-history-of-languages/` ❌ (wrong path)
- JSON-LD: None
- FAQs: None

### After
- Canonical: `https://esy.com/essays/the-history-of-languages/` ✅
- OG/Twitter: Complete with `/og/the-history-of-languages.png`, `@EsyResearch`
- JSON-LD: Article + BreadcrumbList + FAQPage (5 Q&As)
- Publisher logo: `https://esy.com/esy-logo.png`
- inLanguage: `en-US`
- articleSection: `Linguistics`

### FAQs Implemented
1. How did human language begin?
2. What was the first writing system?
3. What is Proto-Indo-European?
4. How do languages go extinct?
5. How are endangered languages preserved?

### Blocking Issues Resolved
- [x] Wrong canonical URL path fixed
- [x] Missing JSON-LD added
- [x] Missing FAQPage schema added

---

## 3. the-history-of-pizza

### Before
- Canonical: None
- OG image: `/images/pizza-history-og.jpg` (relative, likely 404)
- JSON-LD: None
- FAQs: None
- twitter:site: Missing

### After
- Canonical: `https://esy.com/essays/the-history-of-pizza/` ✅
- OG/Twitter: Complete with `/og/the-history-of-pizza.png`, `@EsyResearch`
- JSON-LD: Article + BreadcrumbList + FAQPage (5 Q&As)
- Publisher logo: `https://esy.com/esy-logo.png`
- inLanguage: `en-US`
- articleSection: `Food History`

### FAQs Implemented
1. When was pizza first documented?
2. Who invented the Margherita pizza?
3. How did pizza come to America?
4. Why is Neapolitan pizza UNESCO-recognized?
5. What makes Neapolitan pizza different?

### Blocking Issues Resolved
- [x] Missing canonical added
- [x] Relative OG image fixed to absolute URL
- [x] Missing twitter:site added
- [x] Missing JSON-LD added
- [x] Missing FAQPage schema added
- [x] OG image file created (`public/og/the-history-of-pizza.png`)

---

## Files Changed

- `src/app/essays/the-history-of-burmese-cuisine/page.tsx`
- `src/app/essays/the-history-of-languages/page.tsx`
- `src/app/essays/the-history-of-pizza/page.tsx`
- `public/og/the-history-of-pizza.png` (created)

---

## Verification Checklist

- [x] All URLs absolute HTTPS with trailing slash
- [x] All canonicals match actual page paths (`/essays/[slug]/`)
- [x] OG/Twitter images 1200×630 or Wikimedia fallback
- [x] twitter:site `@EsyResearch` present
- [x] JSON-LD single block with Article + BreadcrumbList + FAQPage
- [x] Publisher logo absolute URL
- [x] inLanguage set
- [x] articleSection set
- [x] FAQs have on-page parity (content-aligned)
- [x] No duplicate `@id` entities

---

## Remaining Work

- Replace placeholder OG images with essay-specific designs:
  - `the-history-of-pizza.png` (currently using homepage.png)
  - Consider local OG image for burmese-cuisine instead of Wikimedia

---

## Go/No-Go

**PASS** — All three essays are rich-results eligible with Article, BreadcrumbList, and FAQPage schema. No blocking issues remain.

