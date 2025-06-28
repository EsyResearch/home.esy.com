import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import ComponentCard from '@/components/SchoolArticle/ComponentCard';
import PrincipleCard from '@/components/SchoolArticle/PrincipleCard';
import VideoCard from '@/components/SchoolArticle/VideoCard';
import CardGroup from '@/components/SchoolArticle/CardGroup';
import CallToAction from '@/components/SchoolArticle/CallToAction';

// Custom components that can be used in MDX
const customComponents = {
  ComponentCard,
  PrincipleCard,
  VideoCard,
  CardGroup,
  CallToAction,
};

export async function getMdxContent(slug) {
  try {
    const articlePath = path.join(process.cwd(), 'src/content/school-articles', `${slug}.mdx`);
    
    if (!fs.existsSync(articlePath)) {
      return null;
    }
    
    const rawMdx = fs.readFileSync(articlePath, 'utf8');
    const { data, content } = matter(rawMdx);
    
    // Try to compile the MDX content
    try {
      const { content: compiledContent } = await compileMDX({
        source: content,
        components: customComponents,
        options: {
          parseFrontmatter: false, // We already parsed it with gray-matter
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
          },
        },
      });
      
      return {
        meta: data,
        content: compiledContent,
        isCompiled: true,
      };
    } catch (compileError) {
      console.error('Failed to compile MDX:', compileError);
      
      // Fallback to raw content
      return {
        meta: data,
        content: content,
        isCompiled: false,
      };
    }
  } catch (error) {
    console.error('Error processing MDX:', error);
    return null;
  }
}

export function getAllMdxSlugs() {
  const articlesDirectory = path.join(process.cwd(), 'src/content/school-articles');
  const files = fs.readdirSync(articlesDirectory);
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));
}

export function getAllMdxArticles() {
  const slugs = getAllMdxSlugs();
  
  return slugs.map(slug => {
    const articlePath = path.join(process.cwd(), 'src/content/school-articles', `${slug}.mdx`);
    const rawMdx = fs.readFileSync(articlePath, 'utf8');
    const { data } = matter(rawMdx);
    
    return {
      slug,
      ...data,
    };
  });
} 