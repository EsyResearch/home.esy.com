// Font size configurations
export const fontSizes = {
  small: { body: '0.875rem', heading: '1.875rem', lineHeight: 1.6 },
  default: { body: '1.063rem', heading: '2.25rem', lineHeight: 1.7 },
  large: { body: '1.25rem', heading: '2.5rem', lineHeight: 1.8 }
};

// Theme configurations
export const getThemeConfig = (theme) => {
  return theme === 'dark' 
    ? { bg: '#0a0a0f', text: '#ffffff', muted: 'rgba(255, 255, 255, 0.7)', border: 'rgba(255, 255, 255, 0.05)' }
    : { bg: '#ffffff', text: '#000000', muted: 'rgba(0, 0, 0, 0.7)', border: 'rgba(0, 0, 0, 0.05)' };
};

// Default essay data
export const defaultEssay = {
  title: "The Geopolitics of Renewable Energy: Power Shifts in a Decarbonizing World",
  authors: ["Zev Uhuru", "Han Thi Htet"],
  institution: "MIT Energy Initiative",
  publishDate: "March 15, 2025",
  readTime: 45,
  wordCount: 12450,
  abstract: "This comprehensive analysis examines how the global transition to renewable energy is fundamentally reshaping international power dynamics. Through examination of energy infrastructure investments, rare earth mineral dependencies, and emerging energy alliances, we argue that traditional petrostates face unprecedented challenges while new forms of resource competition emerge around lithium, cobalt, and renewable technology patents.",
  sections: [
    { id: 'introduction', title: 'Introduction', readTime: 5 },
    { id: 'historical-context', title: 'Historical Context', readTime: 8 },
    { id: 'current-landscape', title: 'Current Landscape', readTime: 12 },
    { id: 'emerging-dynamics', title: 'Emerging Power Dynamics', readTime: 10 },
    { id: 'case-studies', title: 'Case Studies', readTime: 8 },
    { id: 'conclusion', title: 'Conclusion', readTime: 2 }
  ]
};

// Default filters
export const defaultFilters = [
  { id: 'all', label: 'All Essays', count: 1247 },
  { id: 'climate', label: 'Climate & Environment', count: 234 },
  { id: 'politics', label: 'Political Science', count: 189 },
  { id: 'economics', label: 'Economics', count: 267 },
  { id: 'tech', label: 'Technology & Society', count: 342 },
  { id: 'philosophy', label: 'Philosophy', count: 215 }
];

// Extract sections from essay content
export const extractSectionsFromContent = (content, fallbackSections = defaultEssay.sections) => {
  if (!content) return fallbackSections;
  
  const headingRegex = /<h[2-3][^>]*id="([^"]*)"[^>]*>(.*?)<\/h[2-3]>/g;
  const sections = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    sections.push({
      id: match[1],
      title: match[2].replace(/<[^>]*>/g, ''), // Remove any HTML tags
      readTime: Math.floor(Math.random() * 8) + 3 // Estimate read time
    });
  }
  
  return sections.length > 0 ? sections : fallbackSections;
};

// Share functionality
export const handleShare = async (platform, essay, setLinkCopied) => {
  if (platform === 'link') {
    await navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  } else if (platform === 'twitter') {
    const title = essay?.title || 'Essay';
    const author = essay?.authors?.[0] || 'Esy Essays';
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} - An insightful essay by ${author}`)}&url=${encodeURIComponent(window.location.href)}`);
  } else if (platform === 'linkedin') {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`);
  }
}; 