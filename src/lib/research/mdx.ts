import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import { CodeBlock, Aside, DropCap, PullQuote, MarginNote, NextArticle, AuthorBox, CachePerformanceChart, CostReductionChart } from '@/components/research/mdxArticleComponents';

const articlesDirectory = path.join(process.cwd(), 'src/content/research/articles');

type Frontmatter = {
  title: string;
  subtitle?: string;
  author?: {
    name: string;
    role?: string;
    avatar?: string;
    bio?: string;
  };
  date?: string;
  readTime?: number;
  featuredImage?: string;
  tags?: string[];
  stats?: {
    views?: string;
    likes?: number;
    comments?: number;
    shares?: number;
  };
  updateDate?: string;
  featuredImageCaption?: string;
};

export async function getResearchArticleBySlug(slug: string) {
  const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Article not found: ${slug}`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Parse frontmatter
  const { data: frontmatter, content } = matter(fileContents);
  
  // Compile MDX
  const { content: compiledContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [rehypeSlug],
      },
    },
    components: {
      CodeBlock,
      Aside,
      DropCap,
      PullQuote,
      MarginNote,
      NextArticle,
      AuthorBox,
      CachePerformanceChart,
      CostReductionChart,
    },
  });
  
  return {
    frontmatter: frontmatter as Frontmatter,
    content: compiledContent,
  };
}

export function getAllResearchArticleSlugs() {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}

