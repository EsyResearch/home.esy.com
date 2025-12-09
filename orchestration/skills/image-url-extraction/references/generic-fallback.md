# Generic Fallback URL Extraction

## Overview

When you encounter an image source not covered by the specific reference files, use these generic techniques to extract direct image URLs.

---

## When to Use This Reference

- URL doesn't match any known archive pattern
- Specific reference methods have failed
- Source is a museum, university, or archive not yet documented
- You need a quick extraction from any website

---

## Generic Extraction Methods

### Method 1: grep for All Image URLs

Extract all image URLs from the page and filter:

```bash
curl -s "{page_url}" | \
  grep -oE 'https?://[^"]+\.(jpg|jpeg|png|gif|webp|tif|tiff)' | \
  grep -v -E '(thumb|icon|logo|sprite|button|avatar|small|tiny|_s\.|_xs\.)' | \
  sort -u | \
  head -10
```

This excludes common thumbnail/icon patterns and shows unique URLs.

### Method 2: Look for Open Graph Image

Many sites specify a primary image in meta tags:

```bash
curl -s "{page_url}" | \
  grep -oE 'og:image" content="[^"]+"' | \
  sed 's/og:image" content="//;s/"$//'
```

### Method 3: Look for Schema.org Image

```bash
curl -s "{page_url}" | \
  grep -oE '"image"\s*:\s*"[^"]+"' | \
  sed 's/"image"\s*:\s*"//;s/"$//' | \
  head -1
```

### Method 4: Find Largest Image

Download page and look for size attributes:

```bash
curl -s "{page_url}" | \
  grep -oE '<img[^>]+src="[^"]+"[^>]*>' | \
  grep -oE 'src="[^"]+"' | \
  sed 's/src="//;s/"$//'
```

Then check each URL's Content-Length to find the largest.

### Method 5: Browser Developer Tools

When automated methods fail:

1. Open page in browser
2. Right-click on target image → "Inspect"
3. Look for `src` or `data-src` attribute
4. Check "Network" tab for image requests
5. Copy the full URL

### Method 6: View Page Source

1. Right-click → "View Page Source"
2. Search (Ctrl+F) for `.jpg`, `.png`, `.webp`
3. Look for full URLs or relative paths
4. Construct full URL from relative paths

---

## Converting Relative URLs

If you find a relative path like `/images/photo.jpg`:

```bash
# Given base URL and relative path
BASE="https://example.com"
RELATIVE="/images/photo.jpg"

# Construct full URL
FULL_URL="${BASE}${RELATIVE}"
echo $FULL_URL
# https://example.com/images/photo.jpg
```

For paths starting with `//`:
```bash
RELATIVE="//cdn.example.com/photo.jpg"
FULL_URL="https:${RELATIVE}"
```

---

## Handling Lazy Loading

Modern sites often lazy-load images. Look for:

```bash
# data-src (lazy load)
curl -s "{page_url}" | grep -oE 'data-src="[^"]+"' | sed 's/data-src="//;s/"$//'

# data-lazy
curl -s "{page_url}" | grep -oE 'data-lazy="[^"]+"' | sed 's/data-lazy="//;s/"$//'

# srcset (responsive images)
curl -s "{page_url}" | grep -oE 'srcset="[^"]+"' | sed 's/srcset="//;s/"$//'
```

---

## Verification (Critical)

**Always verify before using:**

```bash
# 1. Check it returns an image type
curl -sI "{url}" | grep -i content-type
# Must show: image/jpeg, image/png, image/gif, image/webp, etc.
# NOT: text/html, application/json

# 2. Check reasonable file size
curl -sI "{url}" | grep -i content-length
# Real images are typically >10KB, often >100KB

# 3. Quick download test
curl -s -o /tmp/test-image "{url}" && file /tmp/test-image
# Should report: JPEG image data, PNG image data, etc.
# NOT: HTML document, ASCII text
```

---

## Common Patterns by Site Type

### University Archives
```
/{collection}/{item_id}/files/{filename}.jpg
/digital/collection/{id}/{filename}
```

### WordPress Sites
```
/wp-content/uploads/{year}/{month}/{filename}.jpg
```

### Squarespace
```
/static/{hash}/{filename}
/s/{hash}/{filename}.jpg
```

### Shopify
```
/cdn/shop/files/{filename}.jpg
```

### Cloud Storage
```
# AWS S3
https://{bucket}.s3.{region}.amazonaws.com/{path}/{filename}

# Google Cloud
https://storage.googleapis.com/{bucket}/{path}/{filename}

# Azure
https://{account}.blob.core.windows.net/{container}/{filename}
```

---

## Red Flags

Watch for these indicators that you have the wrong URL:

| Indicator | Problem | Solution |
|-----------|---------|----------|
| `content-type: text/html` | Got HTML page | Re-extract, look for different pattern |
| `content-length: <1000` | Probably error/icon | Look for larger version |
| URL contains `thumb`, `small` | Thumbnail | Find original/full version |
| 302/301 redirect to HTML | Landing page | Follow redirects or find direct URL |
| 403 Forbidden | Hotlink protection | May need referrer header |
| JavaScript required | Dynamic loading | Use browser fallback |

---

## Handling Hotlink Protection

Some sites block direct image access. Try:

```bash
# Add referrer header
curl -H "Referer: {site_url}" -o output.jpg "{image_url}"

# Add user agent
curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "{image_url}"

# Both together
curl -H "Referer: {site_url}" \
     -A "Mozilla/5.0 (compatible)" \
     -o output.jpg "{image_url}"
```

---

## Download Procedure

Once verified:

```bash
# Standard download
curl -L -o /path/to/images/{filename}.jpg "{verified_url}"

# With headers if needed
curl -L \
  -H "Referer: {source_site}" \
  -A "Mozilla/5.0" \
  -o /path/to/images/{filename}.jpg \
  "{verified_url}"

# Verify download
file /path/to/images/{filename}.jpg
ls -la /path/to/images/{filename}.jpg
```

---

## When All Else Fails

1. **Screenshot the image** — Use browser screenshot as last resort
2. **Contact the source** — Request direct download link
3. **Find alternative source** — Search for same image elsewhere
4. **Use a different image** — Find similar public domain alternative
5. **Document the failure** — Note the URL pattern for future reference

---

## Adding New Sources

If you successfully extract from a new source:

1. Document the URL patterns
2. Note the extraction method that worked
3. Consider creating a dedicated reference file
4. Add to `successful-extractions.md` examples

---

*This reference is part of the `image-url-extraction` skill.*

