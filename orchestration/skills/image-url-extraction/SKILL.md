# Image URL Extraction Skill

## Purpose

Reliably extract direct image URLs from archive HTML pages for download or embedding in visual essays. This skill solves the common problem where an agent lands on a file description page (HTML) but needs the actual image file URL.

---

## When to Use This Skill

Invoke this skill when:
- You have navigated to an image file page on an archive site
- You need to download an image to local storage
- You need to reference an image URL in code (e.g., `images.ts`)
- A previously attempted image URL returned an error or HTML instead of an image

---

## The Problem This Solves

### What You Land On (HTML Page)
```
https://commons.wikimedia.org/wiki/File:Alan_Turing_portrait.jpg
```

### What You Actually Need (Direct Image)
```
https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_portrait.jpg
```

The HTML page contains metadata, licensing, and a preview—but using this URL in an `<img>` tag or `curl` download will fail or return HTML.

---

## Core Procedure

### Step 1: Identify the Source

Match the current URL against known archive patterns:

| URL Pattern | Source | Reference File |
|-------------|--------|----------------|
| `commons.wikimedia.org/wiki/File:` | Wikimedia Commons | `wikimedia-commons.md` |
| `loc.gov/pictures/` or `loc.gov/resource/` | Library of Congress | `library-of-congress.md` |
| `si.edu/object/` or `ids.si.edu` | Smithsonian | `smithsonian.md` |
| `metmuseum.org/art/collection/` | Metropolitan Museum | `met-museum.md` |
| `catalog.archives.gov/` | National Archives (NARA) | `national-archives.md` |
| Other / Unknown | Use generic fallback | `generic-fallback.md` |

### Step 2: Execute Source-Specific Extraction

Open the matched reference file and follow its extraction procedure exactly. Each reference contains:
- URL structure explanation
- Primary extraction method (usually `curl` + parsing)
- Fallback methods
- Verification steps
- Common pitfalls

### Step 3: Verify the Extracted URL

Before using any extracted URL, **always verify**:

```bash
# Check Content-Type header
curl -sI "{extracted_url}" | grep -i "content-type"
```

**Expected**: `content-type: image/jpeg`, `image/png`, `image/gif`, etc.
**Failure**: `content-type: text/html` means you got the wrong URL

```bash
# Check file size (should be > 1KB for real images)
curl -sI "{extracted_url}" | grep -i "content-length"
```

### Step 4: Download or Reference

Once verified, either:

**Download locally:**
```bash
curl -L -o /path/to/public/images/{filename} "{verified_url}"
```

**Or reference directly in code:**
```typescript
src: "{verified_url}",
```

---

## Decision Tree

```
┌─────────────────────────────────────┐
│ Have URL to image file page (HTML)  │
└─────────────────┬───────────────────┘
                  ▼
┌─────────────────────────────────────┐
│ Identify source from URL pattern    │
└─────────────────┬───────────────────┘
                  ▼
┌─────────────────────────────────────┐
│ Load source-specific reference      │
└─────────────────┬───────────────────┘
                  ▼
┌─────────────────────────────────────┐
│ Execute Method 1 (curl + grep)      │
└─────────────────┬───────────────────┘
                  ▼
          ┌───────┴───────┐
          │ URL extracted? │
          └───────┬───────┘
         Yes      │      No
          ▼       │       ▼
┌─────────────┐   │  ┌─────────────────┐
│ Verify URL  │   │  │ Try Method 2    │
└──────┬──────┘   │  │ (API or browser)│
       ▼          │  └────────┬────────┘
┌─────────────┐   │           ▼
│ Content-Type│   │  ┌─────────────────┐
│ = image/* ? │   │  │ Still failing?  │
└──────┬──────┘   │  │ Use fallback.md │
  Yes  │  No      │  └─────────────────┘
   ▼   │   ▼      │
┌─────┐│┌────────┐│
│ USE ││ │ RETRY  ││
└─────┘│└────────┘│
```

---

## Red Lines (Never Do These)

- ❌ **NEVER guess URL hash structures** — always extract from page
- ❌ **NEVER use thumbnail URLs for final assets** — look for "Original file" links
- ❌ **NEVER skip verification** — always check Content-Type before using
- ❌ **NEVER assume URL structure is consistent** — different files may have different hashes
- ❌ **NEVER download without checking file size** — tiny files are usually error pages

---

## Quick Reference Commands

### Wikimedia Commons
```bash
curl -s "{file_page_url}" | grep -oE 'https://upload\.wikimedia\.org/wikipedia/commons/[a-f0-9]/[a-f0-9]{2}/[^"]+\.(jpg|jpeg|png|gif)' | grep -v thumb | head -1
```

### Library of Congress
```bash
curl -s "{item_url}" | grep -oE 'https://tile\.loc\.gov/[^"]+\.(jpg|tif)' | head -1
```

### Generic (any site)
```bash
curl -s "{page_url}" | grep -oE 'https?://[^"]+\.(jpg|jpeg|png|gif|webp)' | grep -v thumb | grep -v icon | head -5
```

---

## Integration with Agents

This skill is primarily used by:
- `@orchestration/agents/image-research-licensing-expert.md`

### Invocation Pattern
When the image research agent needs to extract a URL, it should:

1. State: "Applying image-url-extraction skill for {source_name}"
2. Follow the source-specific reference
3. Verify before using
4. Document the extraction in the image record

---

## Troubleshooting

### "File not found" errors
- The hash path may be wrong — re-extract from the HTML page
- The filename may have special characters — check URL encoding

### Curl returns HTML instead of image
- You're using the file page URL, not the direct image URL
- Re-run extraction procedure

### Image downloads but is tiny/corrupted
- You may have grabbed a thumbnail — look for "Original file" link
- The server may require specific headers — try adding `-H "User-Agent: Mozilla/5.0"`

### Rate limiting
- Add delays between requests: `sleep 1`
- Some archives block automated access — use browser fallback

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | December 2024 | Initial skill definition |

---

*This skill ensures reliable image URL extraction from major archives, eliminating the guesswork that leads to broken images in visual essays.*

