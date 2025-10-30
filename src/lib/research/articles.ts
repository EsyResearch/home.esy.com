import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ResearchArticleFrontmatter {
  title: string;
  subtitle?: string;
  author: {
    name: string;
    role: string;
  };
  date: string;
  readTime: number;
  featuredImage: string;
  tags: string[];
  slug: string;
  // Homepage placement metadata
  placement?: 'featured' | 'secondary' | 'feed' | 'none';
  mediaType?: 'video' | 'audio' | null;
}

export interface ResearchArticleData extends ResearchArticleFrontmatter {
  excerpt?: string;
  type?: 'experiment' | 'build' | 'research' | 'analysis';
  stats?: {
    views: string;
    likes: number;
    comments?: number;
  };
}

export function getAllResearchArticles(): ResearchArticleData[] {
  const articlesDir = path.join(process.cwd(), 'src/content/research/articles');
  
  // Check if directory exists
  if (!fs.existsSync(articlesDir)) {
    return [];
  }
  
  const files = fs.readdirSync(articlesDir);
  
  const articles = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(articlesDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      // Extract excerpt from first paragraph, filtering out imports and other non-content
      const lines = content.split('\n');
      const contentLines = lines.filter(line => 
        line.trim() && 
        !line.startsWith('import') && 
        !line.startsWith('#') && 
        !line.startsWith('---') &&
        !line.includes('@/components/')
      );
      
      const firstParagraph = contentLines
        .join('\n')
        .split('\n\n')
        .find(block => block.trim())
        ?.replace(/<[^>]+>/g, '') // Remove HTML/JSX/MDX tags
        .replace(/[#*`]/g, '')
        .trim()
        .substring(0, 200);
      
      // Determine type from tags or default
      const type = data.tags?.includes('experiment') ? 'experiment' :
                   data.tags?.includes('build') ? 'build' :
                   data.tags?.includes('analysis') ? 'analysis' :
                   data.tags?.includes('research') ? 'research' : 'research';
      
      // Generate mock stats based on read time and date
      const daysSincePublished = Math.floor((Date.now() - new Date(data.date).getTime()) / (1000 * 60 * 60 * 24));
      const baseViews = Math.max(500, 2000 - daysSincePublished * 50);
      const views = baseViews > 1000 ? `${(baseViews / 1000).toFixed(1)}k` : baseViews.toString();
      const likes = Math.floor(baseViews * 0.03);
      
      return {
        ...data,
        slug: data.slug || file.replace('.mdx', ''), // Use frontmatter slug or filename
        excerpt: firstParagraph,
        type,
        stats: {
          views,
          likes,
          comments: Math.floor(likes * 0.2)
        }
      } as ResearchArticleData;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return articles;
}

export function getFeaturedResearchArticle(): ResearchArticleData | null {
  const articles = getAllResearchArticles();
  return articles.find(article => article.placement === 'featured') || articles[0] || null;
}

export function getSecondaryResearchFeatures(limit: number = 3): ResearchArticleData[] {
  const articles = getAllResearchArticles();
  const secondary = articles.filter(article => article.placement === 'secondary');
  return secondary.length >= limit ? secondary.slice(0, limit) : articles.slice(1, limit + 1);
}

export function getFeedResearchArticles(limit: number = 4): ResearchArticleData[] {
  const articles = getAllResearchArticles();
  const feed = articles.filter(article => article.placement === 'feed' || !article.placement);
  return feed.slice(0, limit);
}

export function getRecentResearchArticles(limit: number = 4): ResearchArticleData[] {
  const articles = getAllResearchArticles();
  return articles.slice(0, limit);
}

