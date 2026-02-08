/**
 * Validation logic for gate contracts
 */

const fs = require('fs');
const path = require('path');
const { hashFile } = require('./hasher');

/**
 * Check if a file exists
 * @param {string} filePath - Absolute path to file
 * @returns {boolean}
 */
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Count sources in a source-tracking file (CITATIONS.md or CLAIMS.md)
 * Uses multiple heuristics and takes the highest count:
 * 
 * 1. Count H3+ headings that look like individual source entries
 *    (### headings that are NOT generic section headers like "Primary Sources")
 * 2. Count unique URLs
 * 3. Count "- **URL**:" or "- **Source**:" list entries
 * 
 * @param {string} filePath - Path to source-tracking file (CITATIONS.md or CLAIMS.md)
 * @returns {number} Source count
 */
function countSources(filePath) {
  if (!fileExists(filePath)) return 0;
  
  const content = fs.readFileSync(filePath, 'utf8');
  const counts = [];
  
  // Method 1: Count H3 headings that are actual source entries
  // Exclude generic section headings like "Primary Sources", "Secondary Sources", "Notes"
  const sectionHeadingPatterns = /^###\s+(primary|secondary|tertiary|tier\s+\d|notes|references|bibliography|sources|overview)/i;
  const h3Headings = content.match(/^###\s+.+/gm) || [];
  const sourceHeadings = h3Headings.filter(h => !sectionHeadingPatterns.test(h));
  counts.push(sourceHeadings.length);
  
  // Method 2: Count unique URLs
  const urlPattern = /https?:\/\/[^\s\)>\]]+/g;
  const urls = content.match(urlPattern);
  if (urls) {
    counts.push([...new Set(urls)].length);
  }
  
  // Method 3: Count structured source entries (e.g., "- **URL**:", "- **Source**:")
  const structuredEntries = content.match(/^-\s+\*\*(URL|Source|Reference)\*\*:/gim);
  if (structuredEntries) {
    counts.push(structuredEntries.length);
  }
  
  // Method 4: Count top-level bullet items that look like source entries
  // (lines starting with "- " that contain substantive content, not sub-bullets)
  const bulletSources = content.match(/^- \S.{10,}/gm);
  if (bulletSources) {
    counts.push(bulletSources.length);
  }
  
  return Math.max(...counts, 0);
}

/**
 * Check if file contains all required headings
 * @param {string} filePath - Path to file
 * @param {string[]} requiredHeadings - Headings that must be present
 * @returns {{pass: boolean, missing: string[]}}
 */
function containsHeadings(filePath, requiredHeadings) {
  if (!fileExists(filePath)) {
    return { pass: false, missing: requiredHeadings, reason: 'File not found' };
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const missing = [];
  
  for (const heading of requiredHeadings) {
    if (!content.includes(heading)) {
      missing.push(heading);
    }
  }
  
  return {
    pass: missing.length === 0,
    missing
  };
}

/**
 * Check if a directory exists
 * @param {string} dirPath - Absolute path to directory
 * @returns {boolean}
 */
function dirExists(dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
}

/**
 * Count files matching a glob pattern in a directory
 * @param {string} dirPath - Absolute path to directory
 * @param {string} pattern - Simple glob pattern (e.g., "*.md")
 * @returns {number} Number of matching files
 */
function countFiles(dirPath, pattern) {
  if (!dirExists(dirPath)) return 0;

  // Simple glob matching — supports "*.ext" patterns
  const ext = pattern.startsWith('*.') ? pattern.slice(1) : null;
  
  try {
    const files = fs.readdirSync(dirPath);
    if (ext) {
      return files.filter(f => f.endsWith(ext) && fs.statSync(path.join(dirPath, f)).isFile()).length;
    }
    return files.filter(f => fs.statSync(path.join(dirPath, f)).isFile()).length;
  } catch {
    return 0;
  }
}

/**
 * Check if file does NOT contain a pattern
 * @param {string} filePath - Path to file
 * @param {string} pattern - Pattern to check for
 * @returns {{pass: boolean, found: boolean}}
 */
function notContains(filePath, pattern) {
  if (!fileExists(filePath)) {
    return { pass: true, found: false, reason: 'File not found (treated as pass)' };
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const found = content.includes(pattern);
  
  return {
    pass: !found,
    found
  };
}

/**
 * Run all validations for a gate
 * @param {object} contract - Gate contract
 * @param {Array} outputs - Output definitions from getRequiredOutputs
 * @param {Array} validations - Validation specs from getValidations
 * @param {object} context - { depth }
 * @returns {Promise<{pass: boolean, results: Array, artifacts: Array}>}
 */
async function runValidations(contract, outputs, validations, context) {
  const results = [];
  const artifacts = [];
  let allPass = true;
  
  // Check file existence
  const anyOfOutputs = outputs.filter(o => o.anyOf);
  const requiredOutputs = outputs.filter(o => o.required && !o.anyOf);
  
  // For any_of: at least one must exist
  if (anyOfOutputs.length > 0) {
    const anyExists = anyOfOutputs.some(o => fileExists(o.path));
    const existingPaths = anyOfOutputs.filter(o => fileExists(o.path));
    
    results.push({
      type: 'file_exists_any_of',
      pass: anyExists,
      checked: anyOfOutputs.map(o => ({ path: o.pathTemplate, exists: fileExists(o.path) })),
      description: 'At least one intake artifact must exist'
    });
    
    if (!anyExists) {
      allPass = false;
    } else {
      // Hash the existing file(s)
      for (const output of existingPaths) {
        const hash = await hashFile(output.path);
        artifacts.push({
          path: output.pathTemplate,
          absolute_path: output.path,
          sha256: hash,
          exists: true
        });
      }
    }
  }
  
  // For all_of required: all must exist
  for (const output of requiredOutputs) {
    const exists = fileExists(output.path);
    
    results.push({
      type: 'file_exists',
      path: output.pathTemplate,
      absolute_path: output.path,
      pass: exists,
      description: output.description
    });
    
    if (!exists) {
      allPass = false;
    } else {
      const hash = await hashFile(output.path);
      artifacts.push({
        path: output.pathTemplate,
        absolute_path: output.path,
        sha256: hash,
        exists: true
      });
    }
  }
  
  // For optional outputs, just record if they exist
  const optionalOutputs = outputs.filter(o => !o.required && !o.anyOf);
  for (const output of optionalOutputs) {
    const exists = fileExists(output.path);
    if (exists) {
      const hash = await hashFile(output.path);
      artifacts.push({
        path: output.pathTemplate,
        absolute_path: output.path,
        sha256: hash,
        exists: true,
        optional: true
      });
    }
  }
  
  // Run additional validations
  for (const validation of validations) {
    if (validation.type === 'file_exists') {
      // Already handled above
      continue;
    }
    
    if (validation.type === 'min_sources') {
      const targetPath = validation.resolvedTarget;
      const count = countSources(targetPath);
      const threshold = validation.thresholds[context.depth || 'standard'] || 8;
      const pass = count >= threshold;
      
      results.push({
        type: 'min_sources',
        path: validation.target,
        count,
        threshold,
        depth: context.depth || 'standard',
        pass,
        description: validation.description
      });
      
      if (!pass) {
        allPass = false;
      }
    }
    
    if (validation.type === 'min_sources_any_of') {
      // Check multiple possible source-tracking files, use the one that exists
      const resolvedTargets = (validation.resolvedTargets || []);
      const threshold = validation.thresholds[context.depth || 'standard'] || 8;
      
      let bestCount = 0;
      let bestPath = null;
      let bestTemplate = null;
      
      for (let i = 0; i < resolvedTargets.length; i++) {
        const targetPath = resolvedTargets[i];
        if (fileExists(targetPath)) {
          const count = countSources(targetPath);
          if (count > bestCount) {
            bestCount = count;
            bestPath = targetPath;
            bestTemplate = validation.targets[i];
          }
        }
      }
      
      const pass = bestCount >= threshold;
      
      results.push({
        type: 'min_sources_any_of',
        checked: validation.targets,
        matched: bestTemplate,
        count: bestCount,
        threshold,
        depth: context.depth || 'standard',
        pass,
        description: validation.description
      });
      
      if (!pass) {
        allPass = false;
      }
    }
    
    if (validation.type === 'contains_headings') {
      const targetPath = validation.resolvedTarget;
      const result = containsHeadings(targetPath, validation.required_headings);
      
      const headingResult = {
        type: 'contains_headings',
        path: validation.target,
        missing: result.missing,
        severity: validation.severity || 'error',
        description: validation.description
      };
      
      // If severity is warning, don't fail the gate
      if (validation.severity === 'warning') {
        headingResult.pass = true;
        headingResult.warning = !result.pass;
      } else {
        headingResult.pass = result.pass;
        if (!result.pass) {
          allPass = false;
        }
      }
      
      results.push(headingResult);
    }
    
    if (validation.type === 'dir_exists') {
      const targetPath = validation.resolvedTarget;
      const exists = dirExists(targetPath);
      
      results.push({
        type: 'dir_exists',
        path: validation.target,
        absolute_path: targetPath,
        pass: exists,
        description: validation.description
      });
      
      if (!exists) {
        allPass = false;
      }
    }
    
    if (validation.type === 'min_file_count') {
      const targetPath = validation.resolvedTarget;
      const filePattern = validation.pattern || '*';
      const count = countFiles(targetPath, filePattern);
      const threshold = validation.thresholds[context.depth || 'standard'] || 3;
      const pass = count >= threshold;
      
      results.push({
        type: 'min_file_count',
        path: validation.target,
        absolute_path: targetPath,
        pattern: filePattern,
        count,
        threshold,
        depth: context.depth || 'standard',
        pass,
        description: validation.description
      });
      
      if (!pass) {
        allPass = false;
      }
    }
    
    if (validation.type === 'not_contains') {
      const targetPath = validation.resolvedTarget;
      const result = notContains(targetPath, validation.pattern);
      
      const validationResult = {
        type: 'not_contains',
        path: validation.target,
        pattern: validation.pattern,
        found: result.found,
        severity: validation.severity || 'error',
        description: validation.description
      };
      
      // If it's a warning, don't fail the gate
      if (validation.severity === 'warning') {
        validationResult.pass = true;
        validationResult.warning = result.found;
      } else {
        validationResult.pass = result.pass;
        if (!result.pass) {
          allPass = false;
        }
      }
      
      results.push(validationResult);
    }
  }
  
  return {
    pass: allPass,
    results,
    artifacts
  };
}

module.exports = {
  fileExists,
  dirExists,
  countFiles,
  countSources,
  containsHeadings,
  notContains,
  runValidations
};
