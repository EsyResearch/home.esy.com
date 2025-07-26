# Sitemap Management Guide

## Overview

The sitemap is automatically generated at build time using Next.js's built-in sitemap functionality. The sitemap is available at `https://esy.com/sitemap.xml`.

## How It Works

### Automatic Route Discovery

As of the latest update, the sitemap now **automatically discovers all static routes** by scanning the `/src/app` directory for `page.js`, `page.jsx`, `page.ts`, and `page.tsx` files.

**Benefits:**
- ✅ No manual updates needed when adding new pages
- ✅ Impossible to forget adding a page to the sitemap
- ✅ Always in sync with your actual routes

### Dynamic Content

The sitemap also automatically includes dynamic content from:
- `/src/content/essays/` - Essay pages
- `/src/content/glossary/` - Glossary term pages
- `/src/content/school-articles/` - School article pages

## When Updates Happen

The sitemap is regenerated:
1. **Every build** - When you run `npm run build`
2. **Every deployment** - Automatically when pushing to production
3. **No manual intervention needed**

## Adding New Pages

### Static Pages
Simply create a new `page.js/jsx/ts/tsx` file in the `/src/app` directory. The sitemap will automatically include it on the next build.

Example:
```
/src/app/new-feature/page.tsx → https://esy.com/new-feature
```

### Dynamic Content
Add markdown files to the appropriate content directory:
- Essays: `/src/content/essays/my-essay.md`
- Glossary: `/src/content/glossary/new-term.md`
- School Articles: `/src/content/school-articles/article.md`

## Verification

### Local Testing
```bash
# Run the route discovery script to see all detected routes
node scripts/generate-sitemap-routes.js

# Build the project to generate the sitemap
npm run build

# Check the generated sitemap
cat out/sitemap.xml
```

### Production
After deployment, verify your sitemap at:
```
https://esy.com/sitemap.xml
```

## Google Search Console

1. **Initial Setup** (one-time):
   - Submit `https://esy.com/sitemap.xml` to Google Search Console
   - Google will remember this location

2. **Automatic Updates**:
   - Google periodically recrawls your sitemap
   - New pages are discovered automatically

3. **Manual Ping** (optional for urgent updates):
   ```
   https://www.google.com/ping?sitemap=https://esy.com/sitemap.xml
   ```

## Troubleshooting

### Page Not in Sitemap?

1. Check that the file is named `page.{js,jsx,ts,tsx}`
2. Ensure it's not in an excluded directory (api, components, _components)
3. Dynamic routes (with `[brackets]`) are excluded from static routes
4. Run `node scripts/generate-sitemap-routes.js` to verify detection

### Build Errors

If the sitemap generation fails during build:
1. Check for syntax errors in `sitemap.ts`
2. Ensure all directories exist
3. Check file permissions

## Related Files

- `/src/app/sitemap.ts` - Main sitemap generation logic
- `/public/robots.txt` - Points search engines to the sitemap
- `/scripts/generate-sitemap-routes.js` - Utility to list all discovered routes