const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function getAllGlossaryTerms() {
  const termsDirectory = path.join(process.cwd(), 'src/content/glossary');
  
  if (!fs.existsSync(termsDirectory)) {
    return [];
  }
  
  const files = fs.readdirSync(termsDirectory);
  
  const terms = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace(/\.md$/, '');
      const termPath = path.join(termsDirectory, file);
      const rawMarkdown = fs.readFileSync(termPath, 'utf8');
      const { data } = matter(rawMarkdown);
      
      return {
        slug,
        ...data,
      };
    });
  
  return terms;
}

// Generate the JSON file
const terms = getAllGlossaryTerms();
const outputPath = path.join(process.cwd(), 'public/glossary-terms.json');

fs.writeFileSync(outputPath, JSON.stringify(terms, null, 2));
console.log(`Generated glossary JSON with ${terms.length} terms`);
