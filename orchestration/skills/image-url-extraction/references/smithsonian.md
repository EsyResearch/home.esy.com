# Smithsonian Open Access URL Extraction

## Overview

The Smithsonian Institution provides Open Access to millions of digital images across its museums. Images are served through their IDS (Image Delivery Service) system.

---

## URL Patterns

### Object Page (HTML) — What You Land On
```
https://www.si.edu/object/{object_id}
https://{museum}.si.edu/object/{object_id}
```

Examples:
```
https://www.si.edu/object/nasm_A19610048000
https://americanhistory.si.edu/collections/object/nmah_1234567
```

### Direct Image URL — What You Need

**IDS URL Pattern:**
```
https://ids.si.edu/ids/deliveryService?id={image_id}
https://ids.si.edu/ids/deliveryService?id={image_id}&max={size}
```

**IIIF Pattern (newer):**
```
https://ids.si.edu/ids/iiif/{image_id}/full/max/0/default.jpg
```

---

## Extraction Methods

### Method 1: curl + grep for IDS URLs (RECOMMENDED)

```bash
curl -s "{si_object_url}" | \
  grep -oE 'https://ids\.si\.edu/ids/[^"]+' | \
  head -1
```

**Example:**
```bash
curl -s "https://www.si.edu/object/wright-brothers-1903-flyer_nasm_A19610048000" | \
  grep -oE 'https://ids\.si\.edu/ids/[^"]+' | \
  head -1
```

### Method 2: Look for IIIF Manifest

```bash
curl -s "{si_object_url}" | \
  grep -oE 'https://ids\.si\.edu/ids/iiif/[^"]+/manifest' | \
  head -1
```

Then extract image URL from manifest:
```bash
curl -s "{manifest_url}" | \
  grep -oE 'https://ids\.si\.edu/ids/iiif/[^"]+/full/[^"]+' | \
  head -1
```

### Method 3: Construct from Object ID

If you have the object ID, you can often construct the IDS URL:

```
https://ids.si.edu/ids/deliveryService?id=NASM-{object_id}
```

But **prefer extraction from page** as IDs vary by museum.

### Method 4: Browser Fallback

1. Navigate to object page
2. Right-click on image → "Open image in new tab"
3. Copy URL from address bar
4. Look for `ids.si.edu` in the URL

---

## Smithsonian Museums

Each museum may have slightly different URL patterns:

| Museum | Prefix | Example |
|--------|--------|---------|
| National Air & Space | NASM | `nasm_A19610048000` |
| American History | NMAH | `nmah_1234567` |
| Natural History | NMNH | `nmnh_1234567` |
| American Art | SAAM | `saam_1234567` |
| Portrait Gallery | NPG | `npg_1234567` |
| African American History | NMAAHC | `nmaahc_1234567` |

---

## Getting Maximum Resolution

The IDS service supports size parameters:

```bash
# Maximum size (recommended)
https://ids.si.edu/ids/deliveryService?id={id}&max=1000

# Specific dimensions
https://ids.si.edu/ids/deliveryService?id={id}&max_w=1200&max_h=800

# Full resolution (may be very large)
https://ids.si.edu/ids/deliveryService?id={id}
```

**For web use, `&max=1000` or `&max=1200` is usually sufficient.**

---

## Verification

```bash
# Check Content-Type
curl -sI "https://ids.si.edu/ids/deliveryService?id={image_id}" | grep -i content-type
# Expected: image/jpeg

# Check it's not an error page
curl -sI "https://ids.si.edu/ids/deliveryService?id={image_id}" | grep -i content-length
# Should be substantial (>100KB for real images)
```

---

## Common Pitfalls

### 1. Missing or Invalid ID
Some objects don't have digital images available:
- Check for "No image available" on page
- Verify object ID is correct

### 2. Using Object Page URL
❌ Wrong:
```
https://www.si.edu/object/wright-brothers-1903-flyer_nasm_A19610048000
```

✅ Correct:
```
https://ids.si.edu/ids/deliveryService?id=NASM-A19610048000
```

### 3. Low Resolution
Default IDS response may be low-res. Add size parameters:
```
?id={id}&max=1200
```

---

## Download Procedure

```bash
# Download with size limit for web
curl -L -o /path/to/public/images/{filename}.jpg \
  "https://ids.si.edu/ids/deliveryService?id={image_id}&max=1200"

# Verify download
file /path/to/public/images/{filename}.jpg
```

---

## Complete Example

**Goal:** Get Wright Brothers Flyer image

**Step 1: Start with object page**
```
https://www.si.edu/object/wright-brothers-1903-flyer_nasm_A19610048000
```

**Step 2: Extract IDS URL**
```bash
curl -s "https://www.si.edu/object/wright-brothers-1903-flyer_nasm_A19610048000" | \
  grep -oE 'https://ids\.si\.edu/ids/deliveryService\?id=[^"&]+' | \
  head -1
```

**Step 3: Add size parameter and verify**
```bash
URL="https://ids.si.edu/ids/deliveryService?id=NASM-A19610048000&max=1200"
curl -sI "$URL" | grep -i content-type
# content-type: image/jpeg ✓
```

**Step 4: Download**
```bash
curl -L -o ./public/images/wright-flyer.jpg "$URL"
```

---

## Open Access Licensing

Smithsonian Open Access images are released under **CC0** (public domain dedication):
- No attribution required (but appreciated)
- Free for any use, including commercial
- No restrictions on modification

**Recommended attribution format:**
```
[Object Title]. Smithsonian Institution. CC0.
```

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| "Image not found" | Invalid ID | Verify object has digital image on SI website |
| 403 Forbidden | Not Open Access | Check if item is in Open Access program |
| Blurry image | Low resolution | Add `&max=1200` or higher |
| Wrong image | Multiple images per object | Check page for correct image ID |

---

*This reference is part of the `image-url-extraction` skill.*

