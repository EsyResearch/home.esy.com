import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export async function getAllBlogIds() {
  const fileNames = fs.readdirSync(blogDirectory);
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.mdx?$/, '')
      }
    };
  });
}

export async function getBlogPost(slug) {
  const fullPath = path.join(blogDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...matterResult.data
  };
}

export async function getAllBlogPosts() {
  const fileNames = fs.readdirSync(blogDirectory);
  const allBlogPosts = fileNames.map(fileName => {
    // Remove ".mdx" from file name to get slug
    const slug = fileName.replace(/\.mdx?$/, '');

    // Read markdown file as string
    const fullPath = path.join(blogDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the slug
    return {
      slug,
      ...matterResult.data
    };
  });

  // Sort posts by date (newest first)
  return allBlogPosts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });
}

export async function getFeaturedBlogPost() {
  const allPosts = await getAllBlogPosts();
  return allPosts.find(post => post.featured) || allPosts[0];
}

export async function getBlogPostsByCategory(category) {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter(post => post.category === category);
}

export async function getBlogPostSlugs() {
  const fileNames = fs.readdirSync(blogDirectory);
  return fileNames.map(fileName => fileName.replace(/\.mdx?$/, ''));
}