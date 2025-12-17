# SEO Rich Results Audit — Batch 2

**Date:** December 17, 2025  
**Auditor:** SEO Orchestrator Agent  
**Scope:** 4 essays (the-holocaust, the-invention-of-the-car, the-invention-of-wine, the-manhattan-project)

---

## Summary

| Essay | Canonical | OG/Twitter | JSON-LD | FAQs | Status |
|-------|-----------|------------|---------|------|--------|
| the-holocaust | ✅ Added | ✅ Complete | ✅ Article+BreadcrumbList+FAQPage | 5 | ✅ Pass |
| the-invention-of-the-car | ✅ Fixed | ✅ Complete | ✅ Article+BreadcrumbList+FAQPage | 5 | ✅ Pass |
| the-invention-of-wine | ✅ Added | ✅ Complete | ✅ Article+BreadcrumbList+FAQPage | 5 | ✅ Pass |
| the-manhattan-project | ✅ Fixed | ✅ Complete | ✅ Article+BreadcrumbList+FAQPage | 5 | ✅ Pass |

---

## 1. the-holocaust

### Before
- Canonical: None
- OG URL: `/essays/visual/the-holocaust` ❌ (wrong path)
- JSON-LD: None
- FAQs: None
- twitter:site: Missing
- OG image: Missing

### After
- Canonical: `https://esy.com/essays/the-holocaust/` ✅
- OG/Twitter: Complete with `/og/the-holocaust.png`, `@EsyResearch`
- JSON-LD: Article + BreadcrumbList + FAQPage (5 Q&As)
- Publisher logo: `https://esy.com/esy-logo.png`
- inLanguage: `en-US`
- articleSection: `History`

### FAQs Implemented
1. What was the Holocaust?
2. How many people died in the Holocaust?
3. What were concentration camps?
4. Who were some notable Holocaust survivors?
5. Why is Holocaust remembrance important?

---

## 2. the-invention-of-the-car

### Before
- Canonical: None
- OG URL: `/scrollytelling/the-invention-of-the-car` ❌ (wrong path)
- JSON-LD: None
- FAQs: None
- twitter:site: Missing
- OG image: Missing

### After
- Canonical: `https://esy.com/essays/the-invention-of-the-car/` ✅
- OG/Twitter: Complete with `/og/the-invention-of-the-car.png`, `@EsyResearch`
- JSON-LD: Article + BreadcrumbList + FAQPage (5 Q&As)
- Publisher logo: `https://esy.com/esy-logo.png`
- inLanguage: `en-US`
- articleSection: `Technology History`

### FAQs Implemented
1. Who invented the first car?
2. What was the first mass-produced car?
3. How did Henry Ford change manufacturing?
4. When were electric cars invented?
5. How did the car change society?

---

## 3. the-invention-of-wine

### Before
- Canonical: None
- OG URL: Missing
- JSON-LD: None
- FAQs: None
- twitter:site: Missing
- OG image: Missing

### After
- Canonical: `https://esy.com/essays/the-invention-of-wine/` ✅
- OG/Twitter: Complete with `/og/the-invention-of-wine.png`, `@EsyResearch`
- JSON-LD: Article + BreadcrumbList + FAQPage (5 Q&As)
- Publisher logo: `https://esy.com/esy-logo.png`
- inLanguage: `en-US`
- articleSection: `Food History`

### FAQs Implemented
1. Where was wine first invented?
2. How old is winemaking?
3. Who was Dionysus?
4. How did wine spread around the world?
5. What makes Bordeaux wines famous?

---

## 4. the-manhattan-project

### Before
- Using `createVisualEssayMetadata` helper (good)
- Canonical: Uses helper (should resolve to correct path)
- JSON-LD: None
- FAQs: None

### After
- Canonical: `https://esy.com/essays/the-manhattan-project/` ✅
- OG/Twitter: Complete with `/og/the-manhattan-project.png`, `@EsyResearch`
- JSON-LD: Article + BreadcrumbList + FAQPage (5 Q&As)
- Publisher logo: `https://esy.com/esy-logo.png`
- inLanguage: `en-US`
- articleSection: `History`

### FAQs Implemented
1. What was the Manhattan Project?
2. Who led the Manhattan Project?
3. What was the Trinity test?
4. Why did Einstein write to Roosevelt?
5. What was the human cost of the atomic bombs?

---

## Files Changed

- `src/app/essays/the-holocaust/page.tsx`
- `src/app/essays/the-invention-of-the-car/page.tsx`
- `src/app/essays/the-invention-of-wine/page.tsx`
- `src/app/essays/the-manhattan-project/page.tsx`
- `public/og/the-holocaust.png` (created placeholder)
- `public/og/the-invention-of-the-car.png` (created placeholder)
- `public/og/the-invention-of-wine.png` (created placeholder)

---

## Verification Checklist

- [x] All URLs absolute HTTPS with trailing slash
- [x] All canonicals match actual page paths (`/essays/[slug]/`)
- [x] OG/Twitter images created or existing
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
  - `the-holocaust.png`
  - `the-invention-of-the-car.png`
  - `the-invention-of-wine.png`

---

## Go/No-Go

**PASS** — All four essays are rich-results eligible with Article, BreadcrumbList, and FAQPage schema. No blocking issues remain.

