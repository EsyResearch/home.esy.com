// Script to extract prompts from page.tsx and create structured data
const fs = require('fs');
const path = require('path');

// Function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Read the page.tsx file
const pagePath = path.join(__dirname, '../app/prompt-library/page.tsx');
const pageContent = fs.readFileSync(pagePath, 'utf-8');

// Extract the prompts array
const promptsMatch = pageContent.match(/const prompts = \[([\s\S]*?)\];/);
if (!promptsMatch) {
  console.error('Could not find prompts array');
  process.exit(1);
}

// Parse the prompts (simplified - in production would use proper AST parsing)
const promptsStr = promptsMatch[0];
const promptRegex = /\{\s*id:\s*(\d+),[\s\S]*?category:\s*['"]([^'"]+)['"],[\s\S]*?title:\s*['"]([^'"]+)['"],[\s\S]*?description:\s*['"]([^'"]+)['"],[\s\S]*?shortDescription:\s*['"]([^'"]+)['"],[\s\S]*?variables:\s*\[([^\]]*)\],[\s\S]*?prompt:\s*`([^`]+)`[\s\S]*?isPro:\s*(true|false)[\s\S]*?\}/g;

const prompts = [];
let match;

while ((match = promptRegex.exec(promptsStr)) !== null) {
  const [_, id, category, title, description, shortDescription, variablesStr, prompt, isPro] = match;
  
  // Parse variables
  const variables = variablesStr
    .split(',')
    .map(v => v.trim().replace(/['"]/g, ''))
    .filter(v => v);
  
  prompts.push({
    id: parseInt(id),
    slug: generateSlug(title),
    category,
    title,
    description,
    shortDescription,
    variables,
    prompt: prompt.trim(),
    isPro: isPro === 'true'
  });
}

// Create the content directory if it doesn't exist
const contentDir = path.join(__dirname, '../content/prompts');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Write the prompts data
const outputPath = path.join(contentDir, 'prompts.json');
fs.writeFileSync(outputPath, JSON.stringify(prompts, null, 2));

console.log(`Successfully extracted ${prompts.length} prompts to ${outputPath}`);

// Also create an index.ts file for easy importing
const indexContent = `// Auto-generated prompt data
import promptsData from './prompts.json';
import { Prompt } from '@/lib/prompts';

export const prompts: Prompt[] = promptsData as Prompt[];

export default prompts;
`;

fs.writeFileSync(path.join(contentDir, 'index.ts'), indexContent);
console.log('Created index.ts file');