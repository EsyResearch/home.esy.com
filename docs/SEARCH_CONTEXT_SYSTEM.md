# Search Context System

## Overview

The Search Context System provides a sophisticated, centralized approach to managing search functionality across different pages in the Esy application. It ensures consistent behavior, easy maintenance, and systematic context switching.

## Architecture

### Core Components

1. **`/src/lib/searchContexts.ts`** - Centralized configuration for all search contexts
2. **`/src/components/Navigation/ContextAwareNavigation.tsx`** - Smart navigation component
3. **`/src/hooks/useSearchContext.ts`** - React hook for context management
4. **`/src/components/HeaderSearch/HeaderSearch.tsx`** - Updated to use centralized system

### Search Contexts

| Context | Placeholder | Data Source | Search URL | Result URL | Always Expanded |
|---------|-------------|-------------|------------|------------|-----------------|
| `prompt-library` | "Search prompts..." | prompts | `/prompt-library?search=` | `/prompt-library/` | ✅ |
| `glossary` | "Search glossary terms..." | glossary | `/glossary?search=` | `/glossary/` | ✅ |
| `school` | "Search articles & guides..." | school | `/school?search=` | (direct) | ✅ |
| `essays` | "Search essays..." | essays | `/essays?search=` | (direct) | ✅ |
| `blog` | "Search articles, topics, or authors..." | blog | `/blog?search=` | `/blog/` | ✅ |
| `general` | "Search..." | none | `/search?q=` | (none) | ❌ |

## Usage

### Basic Implementation

```tsx
import ContextAwareNavigation from '@/components/Navigation/ContextAwareNavigation';

// Automatic context detection
<ContextAwareNavigation showHeaderSearch={true} />

// Force specific context
<ContextAwareNavigation showHeaderSearch={true} forceContext="blog" />
```

### Using the Hook

```tsx
import { useSearchContext } from '@/hooks/useSearchContext';

const MyComponent = () => {
  const { searchContext, contextConfig, isContextActive } = useSearchContext();
  
  return (
    <div>
      <p>Current context: {searchContext}</p>
      <p>Placeholder: {contextConfig.placeholder}</p>
      <p>Is blog active: {isContextActive('blog')}</p>
    </div>
  );
};
```

### Manual Context Configuration

```tsx
import { getSearchContextConfig, getContextSearchUrl } from '@/lib/searchContexts';

const config = getSearchContextConfig('blog');
const searchUrl = getContextSearchUrl('blog', 'AI writing');
// Result: "/blog?search=AI%20writing"
```

## Key Features

### 1. Automatic Context Detection
- Contexts are automatically detected based on the current pathname
- No manual configuration needed for most use cases

### 2. Centralized Configuration
- All search contexts defined in one place
- Easy to add new contexts or modify existing ones
- Type-safe with TypeScript

### 3. Consistent Behavior
- All pages use the same search logic
- Uniform placeholder text and navigation patterns
- Standardized URL generation

### 4. Easy Maintenance
- Changes to search behavior only need to be made in one place
- New contexts can be added by updating the configuration
- Clear separation of concerns

## Adding a New Search Context

1. **Update the configuration** in `/src/lib/searchContexts.ts`:

```typescript
export const SEARCH_CONTEXTS: Record<SearchContext, SearchContextConfig> = {
  // ... existing contexts
  'new-context': {
    context: 'new-context',
    placeholder: 'Search new content...',
    dataSource: 'new-data',
    searchUrl: '/new-context?search=',
    resultUrlPattern: '/new-context/',
    shouldAlwaysExpand: true,
    description: 'Search through new content type'
  }
};
```

2. **Add the context type** to the `SearchContext` union:

```typescript
export type SearchContext = 
  | 'prompt-library' 
  | 'glossary' 
  | 'school' 
  | 'essays' 
  | 'blog' 
  | 'new-context'  // Add here
  | 'general';
```

3. **Update path detection** in `getSearchContextFromPath`:

```typescript
export const getSearchContextFromPath = (pathname: string): SearchContext => {
  if (pathname?.startsWith('/prompt-library')) return 'prompt-library';
  if (pathname?.startsWith('/glossary')) return 'glossary';
  if (pathname?.startsWith('/school')) return 'school';
  if (pathname?.startsWith('/essays')) return 'essays';
  if (pathname?.startsWith('/blog')) return 'blog';
  if (pathname?.startsWith('/new-context')) return 'new-context'; // Add here
  return 'general';
};
```

4. **Add data loading logic** in `ContextAwareNavigation.tsx`:

```typescript
case 'new-context':
  // Load new context data
  const newData = await loadNewContextData();
  setSearchData(newData);
  break;
```

5. **Create search hook** (if needed) in `/src/hooks/useNewContextSearch.ts`

## Migration Guide

### From Old System

**Before:**
```tsx
<Navigation showHeaderSearch={true} searchContext="blog" />
```

**After:**
```tsx
<ContextAwareNavigation showHeaderSearch={true} forceContext="blog" />
```

### Benefits of Migration

1. **Consistency**: All pages now use the same search system
2. **Maintainability**: Changes only need to be made in one place
3. **Type Safety**: Full TypeScript support with proper types
4. **Extensibility**: Easy to add new search contexts
5. **Performance**: Optimized data loading and context switching

## Best Practices

1. **Use automatic context detection** when possible
2. **Only force context** when necessary (e.g., custom pages)
3. **Keep context configurations simple** and focused
4. **Test all contexts** when making changes
5. **Document new contexts** in this file

## Troubleshooting

### Common Issues

1. **Context not detected**: Check pathname patterns in `getSearchContextFromPath`
2. **Wrong placeholder**: Verify context configuration
3. **Navigation not working**: Check URL patterns in configuration
4. **Data not loading**: Verify data source and loading logic

### Debug Mode

Enable debug logging by setting `localStorage.setItem('search-debug', 'true')` in the browser console.
