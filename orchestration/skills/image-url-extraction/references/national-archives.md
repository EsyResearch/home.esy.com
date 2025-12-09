# National Archives (NARA) URL Extraction

## Overview

The National Archives and Records Administration (NARA) holds billions of records including photographs, documents, maps, and films. Their catalog system has a complex URL structure.

---

## URL Patterns

### Catalog Page (HTML) — What You Land On
```
https://catalog.archives.gov/id/{record_id}
```

Example:
```
https://catalog.archives.gov/id/6011605
```

### Direct Image URL — What You Need

**Standard Pattern:**
```
https://catalog.archives.gov/OpaAPI/media/{record_id}/content/electronic-records/{path}/{filename}
```

**Or:**
```
https://s3.amazonaws.com/NARAprodstorage/{path}/{filename}
```

---

## Extraction Methods

### Method 1: curl + grep for Media URLs (RECOMMENDED)

```bash
curl -s "https://catalog.archives.gov/id/{record_id}" | \
  grep -oE 'https://[^"]+\.(jpg|jpeg|png|gif|tif|tiff)' | \
  grep -v thumbnail | \
  head -1
```

**Example:**
```bash
curl -s "https://catalog.archives.gov/id/6011605" | \
  grep -oE 'https://[^"]+\.(jpg|jpeg|png|gif|tif)' | \
  head -1
```

### Method 2: NARA API

NARA provides an API for catalog records:

```bash
curl -s "https://catalog.archives.gov/api/v1/?naIds={record_id}"
```

Parse the JSON response for `objects[].file.@url` or `objects[].thumbnail.@url`.

### Method 3: Look for Download Button

```bash
curl -s "https://catalog.archives.gov/id/{record_id}" | \
  grep -i "download" | \
  grep -oE 'https://[^"]+\.(jpg|tif|pdf)'
```

### Method 4: Browser Fallback

1. Navigate to catalog page
2. Click "View in National Archives Catalog"
3. Look for download/view options
4. Right-click image → "Open image in new tab"
5. Copy URL from address bar

---

## Record Types

NARA holds various record types with different URL patterns:

| Type | Extension | Notes |
|------|-----------|-------|
| Photographs | `.jpg`, `.tif` | Most common |
| Documents | `.pdf`, `.jpg` | Scanned pages |
| Maps | `.jpg`, `.tif` | Often very large |
| Motion Pictures | `.mp4` | Requires different handling |
| Audio | `.mp3`, `.wav` | Not covered here |

---

## Verification

```bash
# Check Content-Type
curl -sI "{extracted_url}" | grep -i content-type
# Expected: image/jpeg, image/tiff, etc.

# NARA images can be large
curl -sI "{extracted_url}" | grep -i content-length
```

**Note:** NARA servers may be slow. Allow time for response.

---

## Common Pitfalls

### 1. Complex Redirect Chains
NARA URLs often redirect multiple times. Always use `curl -L`:
```bash
curl -L -o output.jpg "{nara_url}"
```

### 2. Access Restrictions
Some records have access restrictions:
- Check "Access Restriction" field on catalog page
- Some records require in-person access
- Sensitive materials may be redacted

### 3. Multiple Objects per Record
A single catalog record may have many associated images:
- Series of photographs
- Multi-page documents
- Look for "Objects in this record" section

### 4. Inconsistent URL Patterns
NARA's infrastructure has evolved over time. URLs may follow different patterns based on when they were digitized.

---

## Download Procedure

```bash
# Download with redirect following
curl -L -o /path/to/public/images/{filename}.jpg "{nara_url}"

# Verify it's an image
file /path/to/public/images/{filename}.jpg
```

---

## Complete Example

**Goal:** Get a D-Day photograph

**Step 1: Start with catalog page**
```
https://catalog.archives.gov/id/6011605
```

**Step 2: Extract image URL**
```bash
curl -s "https://catalog.archives.gov/id/6011605" | \
  grep -oE 'https://[^"]+\.(jpg|tif)' | \
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
curl -L -o ./public/images/d-day-photo.jpg "{extracted_url}"
```

---

## Rights Information

Most NARA holdings are in the **public domain** as U.S. Government works:
- No copyright protection (17 U.S.C. § 105)
- Free to use without restriction
- Attribution appreciated but not required

**Exceptions:**
- Donated private materials may have restrictions
- Some records contain third-party copyrighted content
- Check "Use Restriction" field on catalog page

**Recommended attribution:**
```
[Title/Description]. National Archives and Records Administration, [Record Group].
```

---

## API Reference

**Search records:**
```bash
curl "https://catalog.archives.gov/api/v1/?q={query}&resultTypes=item"
```

**Get specific record:**
```bash
curl "https://catalog.archives.gov/api/v1/?naIds={record_id}"
```

**Get objects (images) for record:**
```bash
curl "https://catalog.archives.gov/api/v1/?naIds={record_id}&objects=true"
```

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| 403 Forbidden | Access restricted | Check catalog for access restrictions |
| Slow response | Large file or server load | Be patient, NARA servers can be slow |
| Empty grep output | Different URL structure | Try API method or browser fallback |
| Multiple images | Series of objects | Check catalog for specific object IDs |
| PDF instead of image | Document record | Look for individual page images |

---

*This reference is part of the `image-url-extraction` skill.*

