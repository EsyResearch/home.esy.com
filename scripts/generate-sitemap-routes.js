const fs = require('fs');
const path = require('path');

/**
 * Recursively find all page files in the app directory
 */
function findPageFiles(dir, baseDir = dir) {
  const results = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip special Next.js directories and components
      if (['api', 'components', '_components'].includes(file)) continue;
      
      results.push(...findPageFiles(filePath, baseDir));
    } else if (file.match(/^page\.(js|jsx|ts|tsx)$/)) {
      // Convert file path to route
      const route = path.dirname(filePath)
        .replace(baseDir, '')
        .replace(/\\/g, '/') // Windows compatibility
        .replace(/\[([^\]]+)\]/g, ':$1'); // Convert [id] to :id for clarity
      
      results.push(route || '/');
    }
  }

  return results;
}

// Find all routes
const appDir = path.join(__dirname, '../src/app');
const routes = findPageFiles(appDir);

// Sort routes and format output
const sortedRoutes = routes
  .filter(route => !route.includes(':')) // Filter out dynamic routes
  .sort((a, b) => {
    if (a === '/') return -1;
    if (b === '/') return 1;
    return a.localeCompare(b);
  });

console.log('Found static routes:');
console.log(JSON.stringify(sortedRoutes, null, 2));

// Generate the staticRoutes array for sitemap.ts
console.log('\nCopy this to your sitemap.ts staticRoutes array:');
console.log('const staticRoutes = [');
sortedRoutes.forEach(route => {
  console.log(`    '${route === '/' ? '' : route}',`);
});
console.log('];');