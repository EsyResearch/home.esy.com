// Docs Navigation Structure
// Designed to integrate with Esy's design system and be easily extensible

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: 'home' | 'workflow' | 'spec' | 'layers' | 'user-cog';
  isNew?: boolean;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const docsNavigation: NavSection[] = [
  {
    title: "How We Build",
    items: [
      {
        title: "Overview",
        href: "/docs",
        description: "How Esy artifacts are made",
        icon: "home",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Core Model",
        href: "/docs/core-model",
        description: "Execution architecture and philosophy",
        icon: "layers",
      },
      {
        title: "Roles",
        href: "/docs/roles",
        description: "Agent contracts and behavior definitions",
        icon: "user-cog",
      },
      {
        title: "Workflows",
        href: "/docs/workflows",
        description: "Execution pipelines and step design",
        icon: "workflow",
      },
    ],
  },
  {
    title: "Artifacts",
    items: [
      {
        title: "Artifact Specifications",
        href: "/docs/specs",
        description: "Structure, metadata, authorship, and provenance",
        icon: "spec",
      },
      {
        title: "Designing Visual Essays",
        href: "/docs/designing-visual-essays",
        description: "Design doctrine and interaction patterns",
        icon: "layers",
      },
    ],
  },
];

// Flat list of all doc pages for easy lookup
export const allDocPages: NavItem[] = docsNavigation.flatMap(
  (section) => section.items
);

// Get page by href
export function getDocPageByHref(href: string): NavItem | undefined {
  return allDocPages.find((page) => page.href === href);
}

// Get adjacent pages for prev/next navigation
export function getAdjacentPages(currentHref: string): {
  prev: NavItem | null;
  next: NavItem | null;
} {
  const index = allDocPages.findIndex((page) => page.href === currentHref);
  return {
    prev: index > 0 ? allDocPages[index - 1] : null,
    next: index < allDocPages.length - 1 ? allDocPages[index + 1] : null,
  };
}

// Generate breadcrumbs from href
export function getBreadcrumbs(
  href: string
): { title: string; href: string }[] {
  const breadcrumbs = [{ title: "Docs", href: "/docs" }];

  if (href !== "/docs") {
    const page = getDocPageByHref(href);
    if (page) {
      breadcrumbs.push({ title: page.title, href: page.href });
    }
  }

  return breadcrumbs;
}
