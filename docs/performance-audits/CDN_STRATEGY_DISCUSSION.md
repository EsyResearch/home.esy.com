# CDN Strategy Discussion: Image Optimization for Visual Essays

**Date:** December 18, 2025  
**Context:** Performance audit revealed 2,491 KiB savings potential from image optimization

## Current Image Landscape

### Image Inventory
- **Local images:** ~55 images in `/public/images/` (~67MB total)
- **OG images:** 20 images in `/public/og/` (~17MB total)
- **External images:** 425+ references to external sources (Wikimedia Commons, Met Museum, Unsplash)
- **Total local assets:** ~84MB

### Current Image Sources

**Local (Self-hosted):**
- Essay-specific images: `/images/essays/[essay-name]/`
- OG/social sharing images: `/og/`
- Logo assets: `/esy-logos/`

**External (Already on CDNs):**
- Wikimedia Commons (`upload.wikimedia.org`) - Already optimized CDN
- Met Museum (`images.metmuseum.org`) - Already optimized CDN
- Unsplash (`images.unsplash.com`) - Already optimized CDN

### Current Constraints
- **Static export:** `output: 'export'` in `next.config.mjs`
- **Image optimization disabled:** `unoptimized: true`
- **No responsive images:** Single large image served to all devices
- **PNG format:** OG images are large PNGs (1-1.5MB each)

---

## The CDN Question: Should You Use One?

### Short Answer: **Yes, but selectively**

You have a **hybrid image strategy** already:
- ✅ External images are already on fast CDNs (Wikimedia, Met Museum)
- ❌ Local images are self-hosted and unoptimized
- ❌ OG images are particularly problematic (large PNGs)

**Recommendation:** Use a CDN for **local images only**. External images are already optimized.

---

## CDN Options Comparison

### Option 1: Cloudinary (Recommended for Your Use Case)

**Best for:** Image optimization + CDN in one service

**Pros:**
- ✅ Automatic image optimization (WebP, AVIF, responsive)
- ✅ On-the-fly transformations (resize, crop, format conversion)
- ✅ Free tier: 25GB storage, 25GB bandwidth/month
- ✅ Excellent Next.js integration
- ✅ Handles both local uploads and external URLs (fetch from URL)
- ✅ Automatic responsive images with `srcset`
- ✅ Can optimize existing external images by proxying through Cloudinary

**Cons:**
- ⚠️ Free tier may not be enough long-term (84MB local images)
- ⚠️ Paid plans start at $89/month (Pro plan)
- ⚠️ Additional dependency

**Cost Estimate:**
- **Free tier:** Good for testing, may hit limits with traffic
- **Pro ($89/mo):** 100GB storage, 100GB bandwidth
- **Plus ($224/mo):** 500GB storage, 500GB bandwidth

**Implementation:**
```tsx
// Before
<Image src="/og/the-word-essay.png" />

// After
<Image src="https://res.cloudinary.com/your-cloud/image/upload/f_auto,q_auto,w_auto/the-word-essay.png" />
```

**Best if:** You want automatic optimization without manual work.

---

### Option 2: Vercel Image Optimization (If You Can Switch from Static Export)

**Best for:** Next.js-native optimization

**Pros:**
- ✅ Built into Vercel (if you deploy there)
- ✅ Automatic WebP/AVIF conversion
- ✅ Responsive images
- ✅ Free tier: 100GB bandwidth/month
- ✅ Zero configuration

**Cons:**
- ❌ Requires Next.js server (can't use with `output: 'export'`)
- ❌ Tied to Vercel hosting
- ❌ Doesn't help with external images

**Best if:** You can switch from static export to server-side rendering.

---

### Option 3: Cloudflare Images ⭐ **RECOMMENDED**

**Best for:** Cost-effective CDN with optimization + superior global network

**Pros:**
- ✅ **$5/month for 100,000 served images** (vs $89/month for Cloudinary)
- ✅ **Superior CDN network:** Cloudflare has one of the largest global CDN networks (200+ cities)
- ✅ Automatic optimization (WebP, AVIF)
- ✅ Responsive variants
- ✅ **Better performance:** Cloudflare's network is optimized for speed
- ✅ Can proxy external images
- ✅ **Unlimited storage** (only pay per image served)
- ✅ **No bandwidth limits** (unlike Cloudinary's tiered plans)
- ✅ Works with static export
- ✅ Can integrate with Cloudflare Pages (if you switch hosting)

**Cons:**
- ⚠️ Requires uploading images to Cloudflare (one-time setup)
- ⚠️ API-based (but has good SDKs)
- ⚠️ Less Next.js-specific tooling than Cloudinary

**Cost Estimate:**
- **$5/month:** 100,000 served images
- **$1 per 100,000 additional images**
- **Storage:** Unlimited (free)
- **Bandwidth:** Unlimited (included)

**Real-world cost example:**
- 20 OG images × 1,000 views/month = 20,000 images = **$5/month**
- 55 essay images × 500 views/month = 27,500 images = **$5/month**
- Total: ~47,500 images/month = **$5/month** (vs $89/month Cloudinary)

**Best if:** You want the best cost-to-performance ratio and don't mind API integration.

---

### Option 4: AWS CloudFront + S3 + Lambda@Edge

**Best for:** Full control, enterprise scale

**Pros:**
- ✅ Highly scalable
- ✅ Pay-as-you-go pricing
- ✅ Full control over optimization pipeline
- ✅ Can integrate with existing AWS infrastructure

**Cons:**
- ❌ Complex setup (S3 + CloudFront + Lambda)
- ❌ Requires building optimization pipeline
- ❌ More DevOps overhead
- ❌ Learning curve

**Cost Estimate:**
- **S3 storage:** ~$0.023/GB/month (~$2/month for 84MB)
- **CloudFront:** ~$0.085/GB transfer (~$7/month for 84GB)
- **Lambda@Edge:** Pay per request

**Best if:** You need enterprise-scale and have DevOps resources.

---

### Option 5: ImageKit

**Best for:** Developer-friendly, good free tier

**Pros:**
- ✅ Free tier: 20GB storage, 20GB bandwidth/month
- ✅ Automatic optimization
- ✅ Good Next.js integration
- ✅ URL-based transformations
- ✅ Can proxy external images

**Cons:**
- ⚠️ Free tier may be limiting
- ⚠️ Paid plans start at $49/month

**Cost Estimate:**
- **Free:** 20GB storage, 20GB bandwidth
- **Starter ($49/mo):** 100GB storage, 200GB bandwidth

**Best if:** You want a Cloudinary alternative with better free tier.

---

### Option 6: Netlify Large Media (If You Deploy on Netlify)

**Best for:** Netlify-hosted sites

**Pros:**
- ✅ Integrated with Netlify
- ✅ Automatic optimization
- ✅ Git-based workflow

**Cons:**
- ❌ Only works if you deploy on Netlify
- ❌ Requires Netlify Large Media addon ($19/month)
- ❌ Less flexible than dedicated image CDNs

**Best if:** You're already on Netlify and want integrated solution.

---

## My Recommendation: **Cloudflare Images** ⭐ (Revised)

**Why Cloudflare is Superior:**

### Why Cloudflare Images?

1. **Cost advantage:**
   - **$5/month** vs Cloudinary's $89/month (18x cheaper!)
   - Unlimited storage (Cloudinary charges per GB)
   - Unlimited bandwidth (Cloudinary has tiered limits)
   - Pay only for images served, not stored

2. **Superior CDN performance:**
   - Cloudflare has **200+ data centers** globally (larger than Cloudinary)
   - Optimized network routing for fastest delivery
   - Better global coverage = faster load times worldwide

3. **Automatic optimization:**
   - WebP/AVIF conversion
   - Responsive variants
   - Quality optimization
   - Format detection based on browser support

4. **Works with your setup:**
   - Works with static export
   - Can proxy external images
   - Good SDK support (JavaScript/TypeScript)
   - API-based (more flexible than URL-only approach)

5. **Scalability:**
   - No storage limits
   - No bandwidth limits
   - Pay per image served (predictable costs)
   - Can handle traffic spikes without surprise bills

### Implementation Strategy

**Phase 1: OG Images (Highest Impact)**
- Upload OG images to Cloudflare Images
- Convert to WebP/AVIF automatically
- Resize to actual display dimensions
- **Expected savings:** ~2,491 KiB (from audit)
- **Cost:** ~$5/month (assuming 20 images × 1,000 views/month)

**Phase 2: Local Essay Images**
- Upload `/public/images/` to Cloudflare Images
- Use Cloudflare Image URLs in components
- **Expected savings:** ~50-70% file size reduction
- **Cost:** Included in $5/month plan

**Phase 3: External Image Optimization (Optional)**
- Proxy external images through Cloudflare Images
- Format: `https://imagedelivery.net/{account_hash}/{image_id}/public`
- **Benefit:** Consistent optimization across all images

### Migration Path

```tsx
// 1. Install Cloudflare Images SDK
npm install @cloudflare/images

// 2. Create utility
// utils/cloudflare-images.ts
import { CloudflareImages } from '@cloudflare/images';

const cfImages = new CloudflareImages({
  accountId: process.env.NEXT_PUBLIC_CF_ACCOUNT_ID!,
  apiToken: process.env.CF_IMAGES_API_TOKEN!,
});

export async function uploadImage(file: File | Buffer, filename: string) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CF_ACCOUNT_ID}/images/v1`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CF_IMAGES_API_TOKEN}`,
      },
      body: formData,
    }
  );
  
  const data = await response.json();
  return data.result.variants[0]; // Returns optimized URL
}

// 3. Get optimized image URL
export function getCloudflareImageUrl(imageId: string, options?: { width?: number; format?: 'webp' | 'avif' }) {
  const baseUrl = `https://imagedelivery.net/${process.env.NEXT_PUBLIC_CF_ACCOUNT_HASH}/${imageId}`;
  const variant = options?.width 
    ? `w=${options.width},f=${options?.format || 'auto'}`
    : 'public';
  
  return `${baseUrl}/${variant}`;
}

// 4. Update components
// Before
<Image src="/og/the-word-essay.png" />

// After
<Image src={getCloudflareImageUrl('the-word-essay-id', { width: 1448, format: 'webp' })} />
```

**Alternative: Direct URL approach (simpler)**
```tsx
// After uploading, Cloudflare gives you a direct URL
// Format: https://imagedelivery.net/{hash}/{image_id}/public
// You can append transformations: ?width=1448&format=webp

<Image src={`https://imagedelivery.net/${CF_HASH}/the-word-essay-id/public?width=1448&format=webp`} />
```

---

## Alternative: Manual Optimization (No CDN)

If you want to avoid CDN costs, you can optimize manually:

### Tools
- **ImageMagick/Sharp:** Batch convert PNG → WebP
- **Squoosh:** Web-based optimization
- **Sharp (Node.js):** Build script to optimize during build

### Process
1. Convert PNG → WebP/AVIF
2. Create responsive variants (1x, 2x)
3. Resize to display dimensions
4. Keep in `/public/` folder

### Pros
- ✅ No ongoing costs
- ✅ Full control
- ✅ No external dependency

### Cons
- ❌ Manual work for each image
- ❌ No automatic optimization
- ❌ Larger build times
- ❌ No on-the-fly transformations

**Best if:** You have limited budget and can automate optimization in build process.

---

## Cost-Benefit Analysis

### Current State (Self-hosted)
- **Storage:** Included in hosting
- **Bandwidth:** Included in hosting
- **Optimization:** None (large files)
- **Performance:** Poor (6.6s LCP)

### With Cloudinary (Recommended)
- **Cost:** $0-89/month (free tier → Pro)
- **Storage:** 25-100GB
- **Bandwidth:** 25-100GB/month
- **Optimization:** Automatic
- **Expected LCP:** 2.5-3.5s (from audit)

### ROI Calculation
- **Performance improvement:** +15-20 Lighthouse points
- **User experience:** Faster page loads = better engagement
- **SEO:** Better Core Web Vitals = better rankings
- **Bandwidth savings:** ~50-70% reduction in image transfer

---

## Decision Matrix

| Factor | Cloudflare ⭐ | Cloudinary | Manual | Vercel |
|-------|------------|-----------|--------|--------|
| **Ease of setup** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| **Automatic optimization** | ✅ | ✅ | ❌ | ✅ |
| **Cost (your scale)** | **$5/mo** | $0-89/mo | $0 | Free (if on Vercel) |
| **CDN performance** | ⭐⭐⭐⭐⭐ (200+ cities) | ⭐⭐⭐⭐ | N/A | ⭐⭐⭐⭐ |
| **Storage limits** | **Unlimited** | 25-500GB | N/A | N/A |
| **Bandwidth limits** | **Unlimited** | 25-500GB | N/A | 100GB |
| **Works with static export** | ✅ | ✅ | ✅ | ❌ |
| **External image support** | ✅ | ✅ | ❌ | ❌ |
| **Next.js integration** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Best for** | **Cost + Performance** | Ease of use | Budget | Vercel hosting |

---

## My Final Recommendation ⭐

**Start with Cloudflare Images:**

1. **Test with OG images first** (biggest impact, smallest volume)
   - Upload 20 OG images to Cloudflare Images
   - Convert to WebP/AVIF automatically
   - Measure performance improvement
   - **Cost:** ~$5/month (assuming moderate traffic)

2. **Evaluate results:**
   - Check Lighthouse score improvement
   - Monitor image delivery performance
   - Compare costs vs. Cloudinary

3. **Scale up if needed:**
   - Cloudflare Images scales automatically
   - No tier upgrades needed (just pay per image served)
   - If traffic grows: Still only $5/month for 100k images

4. **Consider Cloudflare Pages (optional):**
   - If you switch from Netlify to Cloudflare Pages
   - Get integrated hosting + images + CDN
   - Single platform for everything

5. **Keep external images as-is:**
   - Wikimedia, Met Museum images are already optimized
   - Only proxy if you want consistent optimization
   - Cloudflare Images can proxy external URLs too

---

## Next Steps

1. **Decide on approach:** CDN vs. manual optimization
2. **If CDN:** Set up Cloudinary account (free tier)
3. **If manual:** Create build script for image optimization
4. **Implement:** Start with OG images (highest impact)
5. **Measure:** Run Lighthouse audit after changes
6. **Iterate:** Expand to other images based on results

---

## Questions to Consider

1. **Budget:** What's your monthly budget for image hosting?
2. **Traffic:** What's your expected monthly bandwidth?
3. **Maintenance:** Do you want automatic optimization or manual control?
4. **Deployment:** Are you committed to static export, or open to server-side?
5. **Timeline:** Do you need quick wins (CDN) or long-term solution (manual)?

Let me know your thoughts on these options, and I can help implement whichever approach you prefer!

