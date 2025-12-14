# Trailing Slash URL Standard

> Created: December 14, 2024  
> Status: **Active Standard**

## Overview

All URLs on esy.com use trailing slashes, **except the homepage**. This standard ensures:

1. **No 301 redirects in sitemap** - Google Search Console won't report "3XX redirect in sitemap"
2. **Consistent canonical URLs** - No duplicate content issues
3. **Faster page loads** - Users hit final URLs directly without redirect hops

## The Rule

| URL Type | Format | Example |
|----------|--------|---------|
| Homepage | No trailing slash | `https://esy.com` |
| All other pages | With trailing slash | `https://esy.com/about/` |

## Configuration

### Next.js Config (`next.config.mjs`)

```javascript
const nextConfig = {
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,  // ← This is key
    // ...
  }),
};
```

The `trailingSlash: true` setting tells Next.js to:
- Generate static files with trailing slashes (`/about/index.html`)
- Redirect non-trailing-slash requests to trailing-slash URLs

### Sitemap Generator (`src/app/sitemap.ts`)

The sitemap explicitly handles the homepage exception:

```typescript
discoveredRoutes.forEach(route => {
  const url = route === '' 
    ? baseUrl  // Homepage: https://esy.com (no trailing slash)
    : `${baseUrl}${route}/`  // All other routes: https://esy.com/about/
  
  sitemap.push({ url, /* ... */ })
})
```

## Implementation Checklist

When adding new pages or links, follow these guidelines:

### ✅ Internal Links

```tsx
// Correct - with trailing slash
<Link href="/essays/">Essays</Link>
<Link href="/about/">About</Link>
<Link href={`/glossary/${term.slug}/`}>{term.name}</Link>

// Incorrect - missing trailing slash (causes redirect)
<Link href="/essays">Essays</Link>
<Link href="/about">About</Link>
```

### ✅ Canonical Tags

```tsx
// Correct
alternates: {
  canonical: 'https://esy.com/essays/the-word-animal/'
}

// Incorrect
alternates: {
  canonical: 'https://esy.com/essays/the-word-animal'
}
```

### ✅ OpenGraph URLs

```tsx
openGraph: {
  url: 'https://esy.com/essays/the-word-animal/',  // With slash
}
```

### ✅ Dynamic Routes

When generating links from data:

```tsx
// Correct
href={`/school/articles/${article.slug}/`}
href={`/glossary/${term.id}/`}
href={`/templates/${template.slug}/`}

// Incorrect
href={`/school/articles/${article.slug}`}
```

## Using the Visual Essay Metadata Helper

For visual essays, use the `createVisualEssayMetadata` helper which automatically generates correct trailing-slash canonical URLs:

```tsx
import { createVisualEssayMetadata } from '@/lib/visual-essay-metadata';

export const metadata = createVisualEssayMetadata({
  slug: 'the-word-animal',  // Helper adds trailing slash automatically
  title: 'The Word Animal | Esy',
  // ...
});
```

The helper generates: `https://esy.com/essays/the-word-animal/`

## Hash Links

For anchor links with hashes, add the trailing slash before the hash:

```tsx
// Correct
<Link href="/essays/#early-access">Early Access</Link>

// Incorrect
<Link href="/essays#early-access">Early Access</Link>
```

## Verification

### Check Sitemap

```bash
curl -s https://esy.com/sitemap.xml | grep '<loc>' | head -10
```

Expected output:
```xml
<loc>https://esy.com</loc>
<loc>https://esy.com/about/</loc>
<loc>https://esy.com/contact/</loc>
```

### Check for Redirects

```bash
curl -I https://esy.com/about/
# Should return 200 OK

curl -I https://esy.com/about
# Should return 301 redirect to /about/
```

### Google Search Console

After deployment, verify in Google Search Console:
1. Go to Sitemaps report
2. Check that "3XX redirect in sitemap" errors are resolved
3. All URLs should return 200 status

## Files Updated in Initial Implementation

The following files were updated to enforce this standard (December 2024):

### Sitemap
- `src/app/sitemap.ts`

### Canonical Tags
- `src/lib/visual-essay-metadata.ts`
- `src/app/essays/*/page.tsx` (all visual essays)
- `src/app/photo-essays/page.tsx`

### Navigation & Footers
- `src/components/Home/navigation.tsx`
- `src/components/Home/footer.tsx`
- `src/components/About/Footer.tsx`
- `src/components/Essays/Footer.js`
- All other navigation components

### Link Components
- `src/components/*/` - Various card and link components

## Troubleshooting

### Issue: New page shows redirect in sitemap

**Cause**: Sitemap URL missing trailing slash  
**Fix**: Check `src/app/sitemap.ts` and ensure the URL ends with `/`

### Issue: Canonical mismatch warning

**Cause**: Canonical tag doesn't match trailing-slash URL  
**Fix**: Update canonical in page metadata to include trailing slash

### Issue: Internal link causing redirect

**Cause**: Link href missing trailing slash  
**Fix**: Add trailing slash to href: `href="/path/"` not `href="/path"`

## Related Documentation

- [Next.js trailingSlash config](https://nextjs.org/docs/app/api-reference/next-config-js/trailingSlash)
- [Google: Duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Netlify redirects](https://docs.netlify.com/routing/redirects/)
