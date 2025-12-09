# Library of Congress URL Extraction

## Overview

The Library of Congress (LOC) hosts millions of digitized photographs, prints, maps, and documents. Their URL structure differs significantly from Wikimedia, requiring specific extraction techniques.

---

## URL Patterns

### Item Page (HTML) — What You Land On

**Prints & Photographs:**
```
https://www.loc.gov/pictures/item/{item_id}/
https://www.loc.gov/pictures/resource/{resource_id}/
```

**Digital Collections:**
```
https://www.loc.gov/item/{item_id}/
https://www.loc.gov/resource/{resource_id}/
```

### Direct Image URL — What You Need

**JPEG (standard quality):**
```
https://tile.loc.gov/storage-services/service/pnp/{collection}/{item_id}/{item_id}.jpg
```

**TIFF (highest quality):**
```
https://tile.loc.gov/storage-services/master/pnp/{collection}/{item_id}/{item_id}.tif
```

---

## Extraction Methods

### Method 1: curl + grep (RECOMMENDED)

```bash
curl -s "{loc_item_url}" | \
  grep -oE 'https://tile\.loc\.gov/storage-services/[^"]+\.(jpg|jpeg|tif|tiff|gif)' | \
  head -1
```

**Example:**
```bash
curl -s "https://www.loc.gov/pictures/item/2004671908/" | \
  grep -oE 'https://tile\.loc\.gov/storage-services/[^"]+\.(jpg|jpeg|tif|tiff)' | \
  head -1
```

### Method 2: Look for Download Links

LOC pages often have explicit download links. Search for:
```bash
curl -s "{loc_item_url}" | grep -i "download" | grep -oE 'https://[^"]+\.(jpg|tif)'
```

### Method 3: IIIF Image API

Many LOC images support IIIF. Look for IIIF manifest URLs:
```bash
curl -s "{loc_item_url}" | grep -oE 'https://tile\.loc\.gov/image-services/iiif/[^"]+' | head -1
```

Then construct full image URL:
```
{iiif_base}/full/max/0/default.jpg
```

### Method 4: Browser Fallback

1. Navigate to item page
2. Click "Download" or look for image links
3. Right-click highest resolution option → "Copy link address"
4. Or: Look in page source for `tile.loc.gov` URLs

---

## LOC Collection Codes

Common collection prefixes in URLs:

| Code | Collection |
|------|------------|
| `fsa` | Farm Security Administration |
| `cwp` | Civil War Photographs |
| `ppmsca` | Popular & Applied Graphic Art |
| `cph` | Prints & Photographs |
| `matpc` | Matson Photo Collection |
| `hec` | Harris & Ewing Collection |
| `ggbain` | George Grantham Bain Collection |

---

## Verification

```bash
# Check Content-Type
curl -sI "{extracted_url}" | grep -i content-type
# Expected: image/jpeg or image/tiff

# Check file size
curl -sI "{extracted_url}" | grep -i content-length
# LOC images are typically large (1MB+)
```

---

## Common Pitfalls

### 1. Using the Item Page URL
❌ Wrong:
```
https://www.loc.gov/pictures/item/2004671908/
```

✅ Correct:
```
https://tile.loc.gov/storage-services/service/pnp/cph/3c30000/3c39000/3c39200/3c39265v.jpg
```

### 2. Restricted Images
Some LOC images have access restrictions. Check for:
- "Rights Advisory" notices
- Login requirements
- "Not available online" messages

### 3. Multiple Resolutions
LOC often provides multiple versions:
- Thumbnail (small)
- Service copy (medium, usually `.jpg`)
- Master (highest, usually `.tif`)

**For web use, the service copy (`.jpg`) is usually best.**

---

## Download Procedure

```bash
# Download JPEG version
curl -L -o /path/to/public/images/{filename}.jpg "{verified_url}"

# For TIFF (convert to JPEG if needed)
curl -L -o /path/to/temp/{filename}.tif "{tiff_url}"
convert /path/to/temp/{filename}.tif /path/to/public/images/{filename}.jpg
```

---

## Complete Example

**Goal:** Get direct URL for a Civil War photograph

**Step 1: Start with item page**
```
https://www.loc.gov/pictures/item/2018666249/
```

**Step 2: Extract direct URL**
```bash
curl -s "https://www.loc.gov/pictures/item/2018666249/" | \
  grep -oE 'https://tile\.loc\.gov/storage-services/[^"]+\.jpg' | \
  head -1
```

**Step 3: Verify**
```bash
curl -sI "{extracted_url}" | grep -i content-type
# content-type: image/jpeg ✓
```

**Step 4: Download**
```bash
curl -L -o ./public/images/civil-war-photo.jpg "{extracted_url}"
```

---

## Rights Information

Most LOC images are in the public domain, but always verify:
- Check "Rights Advisory" on item page
- Look for "No known restrictions" statement
- Some collections have specific restrictions

**Attribution format:**
```
[Title], [Date]. Library of Congress, [Collection Name].
```

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| 403 Forbidden | Rate limited or restricted | Wait and retry, or check access rights |
| Empty grep output | Different URL structure | Try Method 2 or 3 |
| Low resolution | Got thumbnail | Look for "Larger" or "Download" links |
| Redirects to login | Restricted content | Item not freely available |

---

*This reference is part of the `image-url-extraction` skill.*

