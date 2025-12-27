# Cloudflare Images Setup for esy.com

This document describes how to wire Cloudflare Images into `esy.com` for OG and hero images, starting with the homepage.

## 1. Create a Cloudflare Images account

1. Sign in to Cloudflare
2. Go to **Images → Overview**
3. Enable **Cloudflare Images**
4. Note the following:
   - **Account ID**
   - **Images account hash** (used in `https://imagedelivery.net/{hash}/...` URLs)
   - **API token** with Images write permissions

## 2. Configure environment variables

In your Netlify / local `.env`:

```bash
NEXT_PUBLIC_IMAGE_CDN_PROVIDER=cloudflare
NEXT_PUBLIC_CF_ACCOUNT_ID=your_account_id
NEXT_PUBLIC_CF_ACCOUNT_HASH=your_image_hash
CF_IMAGES_API_TOKEN=your_images_api_token
```

Only `NEXT_PUBLIC_IMAGE_CDN_PROVIDER` and `NEXT_PUBLIC_CF_ACCOUNT_HASH` are needed for read-only usage with pre-generated URLs. The token is required only if you build upload tooling.

## 3. Upload OG and hero images to Cloudflare Images

You can upload via:

- Cloudflare dashboard (manual upload), or
- API / CLI (scripted upload)

For each upload, Cloudflare returns:

- An **image ID**
- One or more **variant URLs**, e.g.:

```text
https://imagedelivery.net/{hash}/{image_id}/public
```

Copy these URLs somewhere handy.

## 4. Map local paths to Cloudflare URLs

We added a small helper at `src/lib/imageCdn.ts`.

Update the `CLOUDFLARE_IMAGE_MAP` with the URLs you got from Cloudflare:

```ts
// src/lib/imageCdn.ts
const CLOUDFLARE_IMAGE_MAP: Record<string, string> = {
  '/og/the-word-essay.png':
    'https://imagedelivery.net/YOUR_HASH/the-word-essay-id/public',
  '/og/the-origin-of-toy.png':
    'https://imagedelivery.net/YOUR_HASH/the-origin-of-toy-id/public',
  '/og/the-history-of-languages.png':
    'https://imagedelivery.net/YOUR_HASH/the-history-of-languages-id/public',
  '/og/how-money-is-created.png':
    'https://imagedelivery.net/YOUR_HASH/how-money-is-created-id/public',
};
```

Anything not in this map will continue to use the original local `/public` path.

## 5. How it’s used in code

Homepage components now call the helper:

- `CuratedGallery.tsx` (curated grid)
- `RecentEssaysStrip.tsx` (recent essays strip)

Example:

```tsx
import { cdnImageSrc } from '@/lib/imageCdn';

<Image
  src={cdnImageSrc(essay.heroImage)}
  alt={essay.heroAlt}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

Behavior:

- If `NEXT_PUBLIC_IMAGE_CDN_PROVIDER !== 'cloudflare'` → returns the original local path
- If provider is `cloudflare` and the path is in `CLOUDFLARE_IMAGE_MAP` → uses the Cloudflare URL
- If provider is `cloudflare` but path not mapped → falls back to local path

## 6. Rollout strategy

1. **Phase 1: OG images**
   - Upload `/public/og/*.png`
   - Fill `CLOUDFLARE_IMAGE_MAP` for the homepage OG images
   - Verify homepage loads and images come from `imagedelivery.net`

2. **Phase 2: Essay hero images**
   - Identify key hero images in `/public/images/essays/**`
   - Upload and map them the same way

3. **Phase 3: Optional**
   - Add more mappings over time
   - (Optional) Build a small internal script/tool to upload and update the map automatically

## 7. Verification checklist

- [ ] Homepage renders without broken images
- [ ] Network tab shows `imagedelivery.net` for mapped OG images
- [ ] Lighthouse performance for LCP improves after optimization
- [ ] Fallback still works if `NEXT_PUBLIC_IMAGE_CDN_PROVIDER` is unset








