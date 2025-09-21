import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

// Custom components that can be used in blog MDX
const customComponents = {
  // Add any custom components here if needed
};

export async function getBlogPost(slug) {
  try {
    const blogPath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`);
    
    if (!fs.existsSync(blogPath)) {
      return null;
    }
    
    const rawMdx = fs.readFileSync(blogPath, 'utf8');
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
    console.error('Error processing blog post:', error);
    return null;
  }
}

export function getAllBlogSlugs() {
  const blogDirectory = path.join(process.cwd(), 'src/content/blog');
  
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(blogDirectory);
  return fileNames
    .filter(name => name.endsWith('.mdx'))
    .map(name => name.replace(/\.mdx$/, ''));
}

export async function getAllBlogPosts() {
  const slugs = getAllBlogSlugs();
  const posts = [];
  
  for (const slug of slugs) {
    const post = await getBlogPost(slug);
    if (post) {
      posts.push({
        slug,
        ...post.meta,
        content: post.content
      });
    }
  }
  
  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getFeaturedBlogPosts() {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter(post => post.featured);
}

export async function getBlogPostsByCategory(category) {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter(post => post.category === category);
}

export async function searchBlogPosts(query) {
  const allPosts = await getAllBlogPosts();
  const lowercaseQuery = query.toLowerCase();
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.author.toLowerCase().includes(lowercaseQuery)
  );
}
