// Docs Navigation Structure
// Designed to integrate with Esy's design system and be easily extensible

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: 'home' | 'sparkles' | 'book' | 'pencil' | 'workflow' | 'prompt' | 'essay' | 'template' | 'spec' | 'quality' | 'layers' | 'user-cog';
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
    title: "Architecture",
    items: [
      {
        title: "Core Model",
        href: "/docs/core-model",
        description: "Execution architecture and philosophy",
        icon: "layers",
        isNew: true,
      },
      {
        title: "Roles",
        href: "/docs/roles",
        description: "Agent contracts and behavior definitions",
        icon: "user-cog",
        isNew: true,
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
    title: "Canonical References",
    items: [
      {
        title: "Templates Overview",
        href: "/docs/templates",
        description: "Pre-designed research systems",
        icon: "template",
      },
      {
        title: "Artifact Specifications",
        href: "/docs/specs",
        description: "Structure, metadata, and provenance",
        icon: "spec",
      },
      {
        title: "Quality Assurance & Evals",
        href: "/docs/quality",
        description: "Validation, refinement, and evaluation",
        icon: "quality",
      },
    ],
  },
  {
    title: "Prompts & Techniques",
    items: [
      {
        title: "Prompt Engineering Guide",
        href: "/docs/prompt-engineering",
        description: "Techniques for effective AI prompting",
        icon: "sparkles",
      },
      {
        title: "ChatGPT Prompts for Academic Writing",
        href: "/docs/chatgpt-prompts-for-academic-writing",
        description: "50+ ready-to-use academic prompts",
        icon: "prompt",
      },
      {
        title: "Write Better Essays with AI",
        href: "/docs/how-to-write-better-essays-with-ai",
        description: "AI assistance throughout writing",
        icon: "pencil",
      },
      {
        title: "Agent Workflows",
        href: "/docs/agent-workflows",
        description: "Build no-code research automation",
        icon: "workflow",
      },
    ],
  },
  {
    title: "Essay Writing Guides",
    items: [
      {
        title: "How to Write an Essay",
        href: "/docs/how-to-write-an-essay",
        description: "Complete essay writing guide",
        icon: "book",
      },
      {
        title: "How to Write a Thesis Statement",
        href: "/docs/how-to-write-a-thesis-statement",
        description: "Craft strong thesis statements",
        icon: "essay",
      },
      {
        title: "How to Write an Introduction",
        href: "/docs/how-to-write-an-essay-introduction",
        description: "Hook readers from the start",
        icon: "essay",
      },
      {
        title: "How to Write a Conclusion",
        href: "/docs/how-to-write-an-essay-conclusion",
        description: "End with lasting impact",
        icon: "essay",
      },
      {
        title: "How to Write an Argumentative Essay",
        href: "/docs/how-to-write-an-argumentative-essay",
        description: "Build persuasive arguments",
        icon: "essay",
      },
      {
        title: "How to Write an Expository Essay",
        href: "/docs/how-to-write-an-expository-essay",
        description: "Explain topics clearly",
        icon: "essay",
      },
      {
        title: "How to Write an Informative Essay",
        href: "/docs/how-to-write-an-informative-essay",
        description: "Present factual information",
        icon: "essay",
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
