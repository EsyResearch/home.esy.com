import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// Force static generation for static export
export const dynamic = 'force-static'

// Recursively find all page files in a directory
function findPageFiles(dir: string, baseDir: string = dir): string[] {
  const results: string[] = []
  
  try {
    const files = fs.readdirSync(dir)
    
    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory()) {
        // Skip special Next.js directories and components
        if (['api', 'components', '_components'].includes(file)) continue
        
        results.push(...findPageFiles(filePath, baseDir))
      } else if (file.match(/^page\.(js|jsx|ts|tsx)$/)) {
        // Convert file path to route
        let route = path.dirname(filePath)
          .replace(baseDir, '')
          .replace(/\\/g, '/') // Windows compatibility
        
        // Skip dynamic routes (containing [])
        if (route.includes('[')) continue
        
        results.push(route || '/')
      }
    }
  } catch (error) {
    console.warn(`Could not read directory: ${dir}`)
  }
  
  return results
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://esy.com'
  
  // Routes to exclude from sitemap (disabled pages)
  const excludedRoutes = [
    '/ai-writing-tools',
    '/essays/visual',
  ]
  
  // Automatically discover all static routes from the app directory
  const appDir = path.join(process.cwd(), 'src/app')
  const discoveredRoutes = findPageFiles(appDir)
    .map(route => route === '/' ? '' : route)
    .filter(route => !excludedRoutes.includes(route))
    .sort((a, b) => {
      if (a === '') return -1
      if (b === '') return 1
      return a.localeCompare(b)
    })

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

  // Add automatically discovered static routes
  // Note: Homepage (route === '') gets NO trailing slash; all others get trailing slash
  discoveredRoutes.forEach(route => {
    const url = route === '' 
      ? baseUrl  // Homepage: https://esy.com (no trailing slash)
      : `${baseUrl}${route}/`  // All other routes: https://esy.com/about/
    
    sitemap.push({
      url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.8,
    })
  })

  // Add essay routes (all with trailing slashes)
  essays.forEach(essay => {
    sitemap.push({
      url: `${baseUrl}/essays/${essay}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Add glossary routes (all with trailing slashes)
  glossaryTerms.forEach(term => {
    sitemap.push({
      url: `${baseUrl}/glossary/${term}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  // Add school article routes (all with trailing slashes)
  schoolArticles.forEach(article => {
    sitemap.push({
      url: `${baseUrl}/school/articles/${article}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Log discovered routes for debugging
  console.log(`Sitemap generated with ${sitemap.length} total routes:`)
  console.log(`- ${discoveredRoutes.length} static routes (auto-discovered)`)
  console.log(`- ${essays.length} essay routes`)
  console.log(`- ${glossaryTerms.length} glossary routes`)
  console.log(`- ${schoolArticles.length} school article routes`)

  return sitemap
}