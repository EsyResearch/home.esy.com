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
 * Count sources in a CITATIONS.md file
 * Uses simple heuristics:
 * 1. Count "### Source" headings
 * 2. If that yields 0, count unique URLs
 * 
 * @param {string} filePath - Path to CITATIONS.md
 * @returns {number} Source count
 */
function countSources(filePath) {
  if (!fileExists(filePath)) return 0;
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Method 1: Count "### Source" headings (case-insensitive)
  const sourceHeadings = content.match(/^###\s+Source\s*/gim);
  if (sourceHeadings && sourceHeadings.length > 0) {
    return sourceHeadings.length;
  }
  
  // Method 2: Count unique URLs
  const urlPattern = /https?:\/\/[^\s\)>\]]+/g;
  const urls = content.match(urlPattern);
  if (urls) {
    const uniqueUrls = [...new Set(urls)];
    return uniqueUrls.length;
  }
  
  return 0;
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
    
    if (validation.type === 'contains_headings') {
      const targetPath = validation.resolvedTarget;
      const result = containsHeadings(targetPath, validation.required_headings);
      
      results.push({
        type: 'contains_headings',
        path: validation.target,
        pass: result.pass,
        missing: result.missing,
        description: validation.description
      });
      
      if (!result.pass) {
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
  countSources,
  containsHeadings,
  notContains,
  runValidations
};
