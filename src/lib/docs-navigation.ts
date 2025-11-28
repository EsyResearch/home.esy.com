// Docs Navigation Structure
// Designed to integrate with Esy's design system and be easily extensible

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: 'home' | 'sparkles' | 'book' | 'pencil' | 'workflow' | 'prompt';
  isNew?: boolean;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const docsNavigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Documentation",
        href: "/docs",
        description: "Welcome to Esy documentation",
        icon: "home",
      },
    ],
  },
  {
    title: "Prompt Engineering",
    items: [
      {
        title: "Prompt Engineering Guide",
        href: "/docs/prompt-engineering",
        description: "Master the art of AI prompting",
        icon: "sparkles",
      },
      {
        title: "ChatGPT Prompts for Academic Writing",
        href: "/docs/chatgpt-prompts-for-academic-writing",
        description: "50+ ready-to-use academic prompts",
        icon: "prompt",
        isNew: true,
      },
      {
        title: "Write Better Essays with AI",
        href: "/docs/how-to-write-better-essays-with-ai",
        description: "Improve your essay writing process",
        icon: "pencil",
      },
    ],
  },
  {
    title: "Agentic Workflows",
    items: [
      {
        title: "Agent Workflows in Esy",
        href: "/docs/agent-workflows",
        description: "Build no-code research automation",
        icon: "workflow",
        isNew: true,
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
