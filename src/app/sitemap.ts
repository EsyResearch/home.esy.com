import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// Force static generation for static export
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://esy.com'
  
  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/essays',
    '/glossary',
    '/school',
    '/school/articles',
    '/ai-story-generator',
    '/privacy',
    '/terms',
    '/cookies',
    '/ai-essay-writer',
    '/extended-school-year',
    '/how-to-write',
    '/how-to-write-an-essay',
    '/writing-prompt-generator',
    '/writing-prompts',
    '/ai-writing-tools',
    '/agentic-workflows',
  ]

  // Get dynamic routes from content directories
  const essaysDir = path.join(process.cwd(), 'src/content/essays')
  const glossaryDir = path.join(process.cwd(), 'src/content/glossary')
  const schoolArticlesDir = path.join(process.cwd(), 'src/content/school-articles')

  // Helper function to get markdown files from directory
  const getMarkdownFiles = (dir: string): string[] => {
    try {
      if (!fs.existsSync(dir)) return []
      return fs.readdirSync(dir)
        .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
        .map(file => file.replace(/\.(md|mdx)$/, ''))
    } catch (error) {
      console.warn(`Could not read directory: ${dir}`)
      return []
    }
  }

  // Get dynamic content
  const essays = getMarkdownFiles(essaysDir)
  const glossaryTerms = getMarkdownFiles(glossaryDir)
  const schoolArticles = getMarkdownFiles(schoolArticlesDir)

  // Build sitemap entries
  const sitemap: MetadataRoute.Sitemap = []

  // Add static routes
  staticRoutes.forEach(route => {
    sitemap.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.8,
    })
  })

  // Add essay routes
  essays.forEach(essay => {
    sitemap.push({
      url: `${baseUrl}/essays/${essay}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Add glossary routes
  glossaryTerms.forEach(term => {
    sitemap.push({
      url: `${baseUrl}/glossary/${term}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  // Add school article routes
  schoolArticles.forEach(article => {
    sitemap.push({
      url: `${baseUrl}/school/articles/${article}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  return sitemap
} 