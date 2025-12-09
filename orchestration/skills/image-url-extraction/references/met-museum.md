# Metropolitan Museum of Art URL Extraction

## Overview

The Met provides Open Access to over 490,000 images of public domain artworks. Images are served through their CDN with predictable URL patterns.

---

## URL Patterns

### Collection Page (HTML) — What You Land On
```
https://www.metmuseum.org/art/collection/search/{object_id}
```

Example:
```
https://www.metmuseum.org/art/collection/search/436535
```

### Direct Image URL — What You Need

**Standard Pattern:**
```
https://images.metmuseum.org/CRDImages/{department}/original/{filename}
```

**Web-optimized Pattern:**
```
https://images.metmuseum.org/CRDImages/{department}/web-large/{filename}
```

---

## Extraction Methods

### Method 1: curl + grep (RECOMMENDED)

```bash
curl -s "{met_collection_url}" | \
  grep -oE 'https://images\.metmuseum\.org/CRDImages/[^"]+\.(jpg|jpeg|png)' | \
  head -1
```

**Example:**
```bash
curl -s "https://www.metmuseum.org/art/collection/search/436535" | \
  grep -oE 'https://images\.metmuseum\.org/CRDImages/[^"]+original[^"]+\.(jpg|jpeg)' | \
  head -1
```

### Method 2: Met Collection API

The Met provides a free API:

```bash
# Get object data
curl -s "https://collectionapi.metmuseum.org/public/collection/v1/objects/{object_id}"
```

**Parse JSON for `primaryImage` or `primaryImageSmall`:**
```json
{
  "objectID": 436535,
  "primaryImage": "https://images.metmuseum.org/CRDImages/ep/original/DT1502.jpg",
  "primaryImageSmall": "https://images.metmuseum.org/CRDImages/ep/web-large/DT1502.jpg"
}
```

**One-liner:**
```bash
curl -s "https://collectionapi.metmuseum.org/public/collection/v1/objects/436535" | \
  grep -oE '"primaryImage":"[^"]+"' | \
  cut -d'"' -f4
```

### Method 3: Browser Fallback

1. Navigate to collection page
2. Click on artwork image to zoom
3. Right-click zoomed image → "Open image in new tab"
4. Copy URL from address bar

---

## Department Codes

The Met organizes images by department:

| Code | Department |
|------|------------|
| `ep` | European Paintings |
| `dp` | Drawings & Prints |
| `as` | Asian Art |
| `eg` | Egyptian Art |
| `gr` | Greek & Roman Art |
| `is` | Islamic Art |
| `ma` | Medieval Art |
| `ph` | Photographs |
| `ad` | American Decorative Arts |
| `ci` | Costume Institute |

---

## Image Sizes

The Met provides multiple sizes:

| Folder | Size | Use Case |
|--------|------|----------|
| `original` | Full resolution | Print, archival |
| `web-large` | ~1000px | Web display (recommended) |
| `web-additional` | Varies | Additional views |

**For visual essays, `web-large` is usually optimal.**

---

## Verification

```bash
# Check Content-Type
curl -sI "https://images.metmuseum.org/CRDImages/ep/original/DT1502.jpg" | grep -i content-type
# Expected: image/jpeg

# Check file size
curl -sI "https://images.metmuseum.org/CRDImages/ep/original/DT1502.jpg" | grep -i content-length
# Original files are often 2-10MB
```

---

## Common Pitfalls

### 1. Not Open Access
Not all Met images are Open Access. Check for:
- "Public Domain" designation on page
- "Open Access" badge
- Objects without images may return 404

### 2. Using Collection Page URL
❌ Wrong:
```
https://www.metmuseum.org/art/collection/search/436535
```

✅ Correct:
```
https://images.metmuseum.org/CRDImages/ep/original/DT1502.jpg
```

### 3. Wrong Size
Using `original` for web can be slow. Prefer `web-large`:
```
https://images.metmuseum.org/CRDImages/ep/web-large/DT1502.jpg
```

---

## Download Procedure

```bash
# For web use (recommended)
curl -L -o /path/to/public/images/{filename}.jpg \
  "https://images.metmuseum.org/CRDImages/{dept}/web-large/{image_file}"

# For archival/print use
curl -L -o /path/to/archives/{filename}.jpg \
  "https://images.metmuseum.org/CRDImages/{dept}/original/{image_file}"
```

---

## Complete Example

**Goal:** Get Van Gogh's Wheat Field with Cypresses

**Step 1: Start with collection page**
```
https://www.metmuseum.org/art/collection/search/436535
```

**Step 2: Use API to get image URL**
```bash
curl -s "https://collectionapi.metmuseum.org/public/collection/v1/objects/436535" | \
  grep -oE '"primaryImage":"[^"]+"' | \
  cut -d'"' -f4
```

**Output:**
```
https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg
```

**Step 3: Verify**
```bash
curl -sI "https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg" | grep -i content-type
# content-type: image/jpeg ✓
```

**Step 4: Download (web-optimized)**
```bash
# Replace 'original' with 'web-large' for web use
curl -L -o ./public/images/van-gogh-wheat-field.jpg \
  "https://images.metmuseum.org/CRDImages/ep/web-large/DT1567.jpg"
```

---

## Open Access Licensing

Met Open Access images are released under **CC0** (public domain dedication):
- No attribution required
- Free for any use
- No restrictions

**Recommended attribution:**
```
[Artwork Title], [Artist], [Date]. The Metropolitan Museum of Art. CC0.
```

---

## API Reference

**Search objects:**
```bash
curl "https://collectionapi.metmuseum.org/public/collection/v1/search?q={query}&hasImages=true"
```

**Get object details:**
```bash
curl "https://collectionapi.metmuseum.org/public/collection/v1/objects/{object_id}"
```

**Get all Open Access objects:**
```bash
curl "https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=2024-01-01"
```

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| 404 Not Found | Image not available | Check if object is Open Access |
| Empty API response | Invalid object ID | Verify ID from collection URL |
| Slow download | Using `original` | Switch to `web-large` |
| No `primaryImage` | Object has no image | Check page for image availability |

---

*This reference is part of the `image-url-extraction` skill.*

