# Wikimedia Commons URL Extraction

## Overview

Wikimedia Commons is the largest free media repository, hosting millions of freely usable images. This reference provides reliable methods to extract direct image URLs from Wikimedia file pages.

---

## URL Structure

### File Description Page (HTML) — What You Land On
```
https://commons.wikimedia.org/wiki/File:{filename}
```

Example:
```
https://commons.wikimedia.org/wiki/File:Alan_Turing_Aged_16.jpg
```

### Direct Image URL — What You Need
```
https://upload.wikimedia.org/wikipedia/commons/{hash1}/{hash2}/{filename}
```

Example:
```
https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg
```

### Thumbnail URL — Avoid for Final Assets
```
https://upload.wikimedia.org/wikipedia/commons/thumb/{hash1}/{hash2}/{filename}/{width}px-{filename}
```

---

## Extraction Methods

### Method 1: curl + grep (RECOMMENDED)

This is the most reliable method. It extracts the direct URL from the HTML page.

```bash
curl -s "https://commons.wikimedia.org/wiki/File:{filename}" | \
  grep -oE 'https://upload\.wikimedia\.org/wikipedia/commons/[a-f0-9]/[a-f0-9]{2}/[^"]+\.(jpg|jpeg|png|gif|svg|tif|tiff)' | \
  grep -v thumb | \
  head -1
```

**Example:**
```bash
curl -s "https://commons.wikimedia.org/wiki/File:Alan_Turing_Aged_16.jpg" | \
  grep -oE 'https://upload\.wikimedia\.org/wikipedia/commons/[a-f0-9]/[a-f0-9]{2}/Alan_Turing_Aged_16\.jpg' | \
  head -1
```

**Output:**
```
https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg
```

### Method 2: Wikimedia API

Use the MediaWiki API to get the image URL programmatically.

```bash
curl -s "https://commons.wikimedia.org/w/api.php?action=query&titles=File:{filename}&prop=imageinfo&iiprop=url&format=json"
```

**Example:**
```bash
curl -s "https://commons.wikimedia.org/w/api.php?action=query&titles=File:Alan_Turing_Aged_16.jpg&prop=imageinfo&iiprop=url&format=json"
```

**Parse the JSON response:**
```
.query.pages["{pageid}"].imageinfo[0].url
```

### Method 3: Browser Fallback

When automated methods fail:

1. Navigate to the file page in browser
2. Click on the image to view full size
3. Right-click → "Open image in new tab"
4. Copy the URL from the address bar

**Or:**

1. Scroll down to "Original file" link on file page
2. Right-click → "Copy link address"

---

## Hash Structure Explanation

Wikimedia uses MD5 hashing to distribute files across directories:

- `{hash1}` = First character of MD5(filename)
- `{hash2}` = First two characters of MD5(filename)

**Example:**
- Filename: `Alan_Turing_Aged_16.jpg`
- MD5 hash: `a1b2c3d4...`
- Path: `/a/a1/Alan_Turing_Aged_16.jpg`

**Important:** Never calculate hashes manually — always extract from the page.

---

## Verification

After extracting a URL, verify it returns an image:

```bash
# Check Content-Type
curl -sI "https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" | grep -i content-type
```

**Expected output:**
```
content-type: image/jpeg
```

**If you see `text/html`, the URL is wrong — re-extract.**

```bash
# Check file size
curl -sI "https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" | grep -i content-length
```

**Expected:** Large number (real images are typically 100KB+)

---

## Common Pitfalls

### 1. Using the File Page URL
❌ Wrong:
```
https://commons.wikimedia.org/wiki/File:Alan_Turing_Aged_16.jpg
```

✅ Correct:
```
https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg
```

### 2. Using Thumbnail URLs
❌ Wrong (thumbnail):
```
https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/220px-Alan_Turing_Aged_16.jpg
```

✅ Correct (full resolution):
```
https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg
```

### 3. URL Encoding Issues
Filenames with special characters need proper encoding:
- Spaces → `_` (underscores in Wikimedia)
- Special chars → URL encoded (`%28` for `(`, etc.)

### 4. Case Sensitivity
Wikimedia filenames are **case-sensitive**:
- `File:Alan_Turing.jpg` ≠ `File:alan_turing.jpg`

---

## Download Procedure

Once you have the verified URL:

```bash
# Download to local directory
curl -L -o /path/to/public/images/{local_filename}.jpg "{verified_url}"

# Verify download
file /path/to/public/images/{local_filename}.jpg
# Should output: JPEG image data, ...
```

---

## Complete Example

**Goal:** Get the direct URL for "ENIAC" computer image

**Step 1: Start with file page**
```
https://commons.wikimedia.org/wiki/File:Classic_shot_of_the_ENIAC.jpg
```

**Step 2: Extract direct URL**
```bash
curl -s "https://commons.wikimedia.org/wiki/File:Classic_shot_of_the_ENIAC.jpg" | \
  grep -oE 'https://upload\.wikimedia\.org/wikipedia/commons/[a-f0-9]/[a-f0-9]{2}/Classic_shot_of_the_ENIAC[^"]*\.jpg' | \
  grep -v thumb | \
  head -1
```

**Step 3: Verify**
```bash
curl -sI "{extracted_url}" | grep -i content-type
# content-type: image/jpeg ✓
```

**Step 4: Download**
```bash
curl -L -o ./public/images/eniac.jpg "{extracted_url}"
```

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Empty grep output | Filename has special chars | URL-encode the filename in grep pattern |
| 404 error | Wrong hash path | Re-extract from page, don't guess |
| Returns HTML | Used file page URL | Use Method 1 to get upload.wikimedia URL |
| Tiny file size | Downloaded thumbnail | Ensure URL doesn't contain `/thumb/` |
| SSL error | Certificate issue | Add `--insecure` flag (not recommended for production) |

---

*This reference is part of the `image-url-extraction` skill.*

