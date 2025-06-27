# Essays Components

This directory contains the refactored essay components, breaking down the monolithic `EssayTemplate.js` into smaller, more manageable subcomponents with organized CSS modules.

## Component Structure

### Main Components

- **`EssayTemplate.js`** - The main template component that orchestrates the entire essay interface
- **`EssayReader.js`** - Handles the essay reading interface with all reading controls and layout
- **`EssayHeader.js`** - Sticky header with navigation, reading controls, and action buttons
- **`TableOfContents.js`** - Sidebar navigation for essay sections
- **`EssayContent.js`** - Main content area including essay header, abstract, and body content
- **`EssayMetadata.js`** - Author bios and related essays section

### CSS Modules

Each component has its corresponding CSS module for organized styling:

- **`EssayReader.module.css`** - Styles for the main reader container, progress bar, and layout
- **`EssayHeader.module.css`** - Header styles including controls, buttons, and share menu
- **`TableOfContents.module.css`** - Sidebar navigation styles with theme variants
- **`EssayContent.module.css`** - Content styles including typography, sections, and abstracts
- **`EssayMetadata.module.css`** - Author and related essays section styles

### Utility Files

- **`essayUtils.js`** - Common functions, constants, and configurations used across components

## CSS Modules Organization

### Theme System

All CSS modules follow a consistent theme system with dark and light variants:

```css
/* Base styles */
.component {
  /* Common styles */
}

/* Theme variants */
.componentDark {
  /* Dark theme specific styles */
}

.componentLight {
  /* Light theme specific styles */
}
```

### Font Size System

Font sizes are organized with responsive variants:

```css
.titleSmall { font-size: 1.875rem; }
.titleDefault { font-size: 2.25rem; }
.titleLarge { font-size: 2.5rem; }

.contentSmall { font-size: 0.875rem; line-height: 1.6; }
.contentDefault { font-size: 1.063rem; line-height: 1.7; }
.contentLarge { font-size: 1.25rem; line-height: 1.8; }
```

### Component-Specific Styles

Each component has its own CSS module with:

- **Base styles** - Common layout and typography
- **Theme variants** - Dark/light theme specific styles
- **Interactive states** - Hover, focus, and active states
- **Responsive design** - Font size and layout adjustments

## Usage

### Basic Essay Template

```jsx
import { EssayTemplate } from '@/components/Essays';

<EssayTemplate
  pageTitle="Academic Essays"
  pageSubtitle="& Research"
  essays={essaysArray}
  featuredEssay={featuredEssayData}
  isEssayReader={false}
/>
```

### Essay Reader Mode

```jsx
<EssayTemplate
  isEssayReader={true}
  essay={essayData}
  essayContent={htmlContent}
/>
```

### Using Individual Components

```jsx
import { 
  EssayReader, 
  EssayHeader, 
  TableOfContents,
  EssayContent,
  EssayMetadata 
} from '@/components/Essays';

// Use individual components as needed
<EssayReader
  essay={essayData}
  essayContent={htmlContent}
  sections={sectionsArray}
  onBackToEssays={handleBack}
/>
```

## Component Props

### EssayTemplate

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pageTitle` | string | "Academic Essays" | Main page title |
| `pageSubtitle` | string | "& Research" | Page subtitle |
| `pageDescription` | string | "A collection of..." | Page description |
| `filters` | array | [] | Filter options |
| `featuredEssay` | object | null | Featured essay data |
| `essays` | array | [] | Array of essays |
| `searchPlaceholder` | string | "Search essays..." | Search input placeholder |
| `showFullContent` | boolean | false | Show full essay content |
| `essayContent` | string | "" | HTML content of essay |
| `isEssayReader` | boolean | false | Enable essay reader mode |
| `essay` | object | null | Essay data for reader mode |

### EssayReader

| Prop | Type | Description |
|------|------|-------------|
| `essay` | object | Essay data object |
| `essayContent` | string | HTML content of the essay |
| `sections` | array | Array of section objects |
| `onBackToEssays` | function | Callback for back navigation |

### EssayHeader

| Prop | Type | Description |
|------|------|-------------|
| `theme` | string | Current theme ('dark' or 'light') |
| `setTheme` | function | Theme setter function |
| `fontSize` | string | Current font size |
| `setFontSize` | function | Font size setter function |
| `isBookmarked` | boolean | Bookmark state |
| `setIsBookmarked` | function | Bookmark setter function |
| `showShareMenu` | boolean | Share menu visibility |
| `setShowShareMenu` | function | Share menu setter function |
| `linkCopied` | boolean | Link copy state |
| `handleShare` | function | Share handler function |
| `showTOC` | boolean | Table of contents visibility |
| `setShowTOC` | function | TOC setter function |
| `onBackToEssays` | function | Back navigation handler |
| `currentTheme` | object | Theme configuration object |

## Utility Functions

### `essayUtils.js`

- **`fontSizes`** - Font size configurations for different reading modes
- **`getThemeConfig(theme)`** - Get theme configuration object
- **`defaultEssay`** - Default essay data structure
- **`defaultFilters`** - Default filter options
- **`extractSectionsFromContent(content)`** - Extract sections from HTML content
- **`handleShare(platform, essay, setLinkCopied)`** - Handle social sharing

## Benefits of Refactoring

1. **Maintainability** - Smaller, focused components are easier to maintain
2. **Reusability** - Individual components can be reused in different contexts
3. **Testability** - Each component can be tested independently
4. **Performance** - Better code splitting and lazy loading opportunities
5. **Developer Experience** - Easier to understand and modify specific functionality
6. **Separation of Concerns** - Each component has a single responsibility
7. **Organized Styling** - CSS modules provide scoped, maintainable styles
8. **Theme Consistency** - Centralized theme system across all components

## CSS Modules Benefits

1. **Scoped Styles** - No style conflicts between components
2. **Type Safety** - CSS class names are validated at build time
3. **Better Organization** - Styles are co-located with components
4. **Theme Support** - Easy theme switching with CSS class variants
5. **Performance** - Only loaded styles are included in the bundle
6. **Maintainability** - Clear separation of styling concerns

## Migration from Monolithic Component

The original `EssayTemplate.js` has been refactored into:

- **State Management**: Moved to `EssayReader.js` for essay reader mode
- **Header Logic**: Extracted to `EssayHeader.js`
- **Content Rendering**: Separated into `EssayContent.js`
- **Metadata Display**: Moved to `EssayMetadata.js`
- **Navigation**: Isolated in `TableOfContents.js`
- **Utilities**: Centralized in `essayUtils.js`
- **Styling**: Organized into CSS modules for each component

The main `EssayTemplate.js` now acts as a coordinator, determining which mode to render and passing appropriate props to subcomponents.

## Styling Guidelines

### CSS Module Naming Convention

- Use camelCase for class names
- Prefix theme variants with `Dark` or `Light`
- Use descriptive names that reflect the component structure
- Group related styles together

### Theme Implementation

```jsx
const componentClass = `${styles.base} ${theme === 'dark' ? styles.dark : styles.light}`;
```

### Font Size Implementation

```jsx
const titleClass = `${styles.title} ${styles[`title${fontSize.charAt(0).toUpperCase() + fontSize.slice(1)}`]}`;
``` 