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

export async function getGlossaryTerm(slug) {
  try {
    const termPath = path.join(process.cwd(), 'src/content/glossary', `${slug}.md`);
    
    if (!fs.existsSync(termPath)) {
      return null;
    }
    
    const rawMarkdown = fs.readFileSync(termPath, 'utf8');
    const { data, content } = matter(rawMarkdown);
    
    // For regular markdown files, don't try to compile as MDX
    return {
      meta: data,
      content: content,
      isCompiled: false,
    };
  } catch (error) {
    console.error('Error processing glossary term:', error);
    return null;
  }
}

export function getAllGlossarySlugs() {
  const termsDirectory = path.join(process.cwd(), 'src/content/glossary');
  
  if (!fs.existsSync(termsDirectory)) {
    return [];
  }
  
  const files = fs.readdirSync(termsDirectory);
  
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''));
}

export function getAllGlossaryTerms() {
  const slugs = getAllGlossarySlugs();
  
  return slugs.map(slug => {
    const termPath = path.join(process.cwd(), 'src/content/glossary', `${slug}.md`);
    const rawMarkdown = fs.readFileSync(termPath, 'utf8');
    const { data } = matter(rawMarkdown);
    
    return {
      slug,
      ...data,
    };
  });
} 