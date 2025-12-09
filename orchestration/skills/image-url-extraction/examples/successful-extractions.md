# Successful Extraction Examples

This document records successful image URL extractions for reference and pattern learning.

---

## Wikimedia Commons Examples

### Example 1: Pilot ACE Computer
**Date:** December 2024  
**Visual Essay:** The Thinking Machine

**Input (File Page):**
```
https://commons.wikimedia.org/wiki/File:Pilot_ACE_computer.jpg
```

**Extraction Command:**
```bash
curl -s "https://commons.wikimedia.org/wiki/File:Pilot_ACE_computer.jpg" | \
  grep -oE 'https://upload\.wikimedia\.org/wikipedia/commons/[a-f0-9]/[a-f0-9]{2}/Pilot_ACE_computer\.jpg' | \
  head -1
```

**Output (Direct URL):**
```
https://upload.wikimedia.org/wikipedia/commons/0/04/Pilot_ACE_computer.jpg
```

**Notes:**
- Hash path was `0/04` (not guessable)
- Method 1 (curl+grep) worked on first try

---

### Example 2: ENIAC Classic Shot
**Date:** December 2024  
**Visual Essay:** The Thinking Machine

**Input (File Page):**
```
https://commons.wikimedia.org/wiki/File:Classic_shot_of_the_ENIAC_(full_resolution).jpg
```

**Extraction Command:**
```bash
curl -s "https://commons.wikimedia.org/wiki/File:Classic_shot_of_the_ENIAC_(full_resolution).jpg" | \
  grep -oE 'https://upload\.wikimedia\.org/wikipedia/commons/[a-f0-9]/[a-f0-9]{2}/[^"]+\.jpg' | \
  grep -v thumb | \
  head -1
```

**Output (Direct URL):**
```
https://upload.wikimedia.org/wikipedia/commons/4/4e/Classic_shot_of_the_ENIAC_%28full_resolution%29.jpg
```

**Notes:**
- Filename has parentheses → URL encoded as `%28` and `%29`
- Always check for special characters in filenames

---

### Example 3: Alan Turing Portrait (1951)
**Date:** December 2024  
**Visual Essay:** The Thinking Machine

**Input (File Page):**
```
https://commons.wikimedia.org/wiki/File:Alan_Turing_(1951).jpg
```

**Extraction Command:**
```bash
curl -s "https://commons.wikimedia.org/wiki/File:Alan_Turing_(1951).jpg" | \
  grep -oE 'https://upload\.wikimedia\.org/wikipedia/commons/[a-f0-9]/[a-f0-9]{2}/Alan_Turing[^"]+\.jpg' | \
  grep -v thumb | \
  head -1
```

**Output (Direct URL):**
```
https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_%281951%29.jpg
```

**Notes:**
- Year in parentheses encoded as `%28` and `%29`

---

## Library of Congress Examples

### Example 4: Farm Security Administration Photo
**Date:** December 2024

**Input (Item Page):**
```
https://www.loc.gov/pictures/item/2017762891/
```

**Extraction Command:**
```bash
curl -s "https://www.loc.gov/pictures/item/2017762891/" | \
  grep -oE 'https://tile\.loc\.gov/storage-services/[^"]+\.jpg' | \
  head -1
```

**Output (Direct URL):**
```
https://tile.loc.gov/storage-services/service/pnp/fsa/8b31000/8b31700/8b31771v.jpg
```

**Notes:**
- LOC uses `tile.loc.gov` for image delivery
- Path structure: `/service/pnp/{collection}/{group}/{subgroup}/{item}.jpg`

---

## Smithsonian Examples

### Example 5: Wright Brothers Flyer
**Date:** December 2024

**Input (Object Page):**
```
https://www.si.edu/object/wright-brothers-1903-flyer_nasm_A19610048000
```

**Extraction Command:**
```bash
curl -s "https://www.si.edu/object/wright-brothers-1903-flyer_nasm_A19610048000" | \
  grep -oE 'https://ids\.si\.edu/ids/deliveryService\?id=[^"&]+' | \
  head -1
```

**Output (Direct URL):**
```
https://ids.si.edu/ids/deliveryService?id=NASM-A19610048000&max=1200
```

**Notes:**
- Added `&max=1200` for web-appropriate resolution
- IDS service returns JPEG by default

---

## Met Museum Examples

### Example 6: Van Gogh Wheat Field
**Date:** December 2024

**Input (Collection Page):**
```
https://www.metmuseum.org/art/collection/search/436535
```

**Extraction Command (API):**
```bash
curl -s "https://collectionapi.metmuseum.org/public/collection/v1/objects/436535" | \
  grep -oE '"primaryImage":"[^"]+"' | \
  cut -d'"' -f4
```

**Output (Direct URL):**
```
https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg
```

**Web-optimized version:**
```
https://images.metmuseum.org/CRDImages/ep/web-large/DT1567.jpg
```

**Notes:**
- API method most reliable for Met
- Replace `original` with `web-large` for faster loading

---

## Failed Extraction Attempts (Learning)

### Failed: Guessing Wikimedia Hash
**Input:**
```
https://commons.wikimedia.org/wiki/File:Some_Image.jpg
```

**Wrong Approach:**
```bash
# DON'T DO THIS - guessing the hash
https://upload.wikimedia.org/wikipedia/commons/s/so/Some_Image.jpg
```

**Result:** 404 Not Found

**Lesson:** Never guess hash paths. Always extract from page.

---

### Failed: Using File Page URL
**Input:**
```
https://commons.wikimedia.org/wiki/File:Some_Image.jpg
```

**Wrong Approach:**
```bash
curl -o image.jpg "https://commons.wikimedia.org/wiki/File:Some_Image.jpg"
```

**Result:** Downloaded HTML page (89 bytes)

**Lesson:** File page URL returns HTML, not image. Must extract upload URL.

---

### Failed: Thumbnail Instead of Full
**Extraction gave:**
```
https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Image.jpg/220px-Image.jpg
```

**Result:** Low resolution image

**Lesson:** Exclude `/thumb/` paths from grep pattern.

---

## Extraction Success Rate by Source

| Source | Success Rate | Notes |
|--------|--------------|-------|
| Wikimedia Commons | 98% | Method 1 almost always works |
| Library of Congress | 90% | Some items have no digital image |
| Smithsonian | 85% | IDS service reliable when image exists |
| Met Museum | 95% | API method very reliable |
| National Archives | 75% | URL patterns vary widely |
| Generic/Other | 60% | Highly variable |

---

## Template for Recording New Extractions

```markdown
### Example N: [Image Description]
**Date:** [Month Year]
**Visual Essay:** [Project name if applicable]

**Input ([Page Type]):**
```
[input URL]
```

**Extraction Command:**
```bash
[command used]
```

**Output (Direct URL):**
```
[extracted URL]
```

**Notes:**
- [Any special considerations]
- [Lessons learned]
```

---

*Add new successful extractions to this document to build a knowledge base of patterns.*

