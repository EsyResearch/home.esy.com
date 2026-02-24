/**
 * Validation logic for gate contracts
 * 
 * Validation types:
 *   file_exists        — artifact file was produced
 *   dir_exists         — directory structure created
 *   min_file_count     — sufficient artifacts in directory
 *   min_sources        — research has substance (source count)
 *   min_sources_any_of — flexible source tracking across files
 *   contains_headings  — file contains required heading strings
 *   contains_text      — file contains required text patterns (e.g. ArtifactDetailWrapper)
 *   not_contains       — file must NOT contain a pattern (fails on missing file by default)
 *   frontmatter_status — parse YAML frontmatter, enforce status field value
 *   regex_match        — file content must match (or must NOT match) a regex pattern
 *   min_regex_count    — file must contain at least N occurrences of a regex pattern
 *   url_reachable      — extract URLs from a file and verify they return HTTP 2xx
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
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
 * @param {object} [options] - Options
 * @param {boolean} [options.missing_ok=false] - If true, missing file = pass (legacy behavior). Default: FAIL on missing.
 * @returns {{pass: boolean, found: boolean, reason?: string}}
 */
function notContains(filePath, pattern, options = {}) {
  const missingOk = options.missing_ok === true;
  
  if (!fileExists(filePath)) {
    if (missingOk) {
      return { pass: true, found: false, reason: 'File not found (missing_ok: true)' };
    }
    return { pass: false, found: false, reason: 'File not found — cannot verify content (use missing_ok: true to skip)' };
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const found = content.includes(pattern);
  
  return {
    pass: !found,
    found
  };
}

/**
 * Check if file DOES contain required text
 * @param {string} filePath - Path to file
 * @param {string|string[]} patterns - String(s) that must be present
 * @returns {{pass: boolean, missing: string[], reason?: string}}
 */
function containsText(filePath, patterns) {
  const patternList = Array.isArray(patterns) ? patterns : [patterns];
  
  if (!fileExists(filePath)) {
    return { pass: false, missing: patternList, reason: 'File not found' };
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const missing = patternList.filter(p => !content.includes(p));
  
  return {
    pass: missing.length === 0,
    missing
  };
}

/**
 * Parse YAML frontmatter from a markdown file
 * @param {string} filePath - Path to file
 * @returns {object|null} Parsed frontmatter fields, or null if not parseable
 */
function parseFrontmatter(filePath) {
  if (!fileExists(filePath)) return null;
  
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const fields = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();
    // Parse numeric values
    if (/^\d+(\.\d+)?$/.test(value)) {
      fields[key] = parseFloat(value);
    } else {
      fields[key] = value;
    }
  }
  
  return fields;
}

/**
 * Check YAML frontmatter status field
 * @param {string} filePath - Path to markdown file with YAML frontmatter
 * @param {object} checks - Fields to check { field: expectedValue } or { field: { not: value } }
 * @returns {{pass: boolean, fields: object, reason?: string}}
 */
function frontmatterStatus(filePath, checks) {
  const fm = parseFrontmatter(filePath);
  
  if (!fm) {
    return { pass: false, fields: {}, reason: `File not found or no YAML frontmatter: ${filePath}` };
  }
  
  const failures = [];
  for (const [field, expected] of Object.entries(checks)) {
    const actual = fm[field];
    
    if (typeof expected === 'object' && expected.not !== undefined) {
      // Negative check: field must NOT equal this value
      if (actual === expected.not) {
        failures.push(`${field}: expected NOT "${expected.not}", got "${actual}"`);
      }
    } else if (typeof expected === 'object' && expected.min !== undefined) {
      // Numeric threshold check
      if (typeof actual !== 'number' || actual < expected.min) {
        failures.push(`${field}: expected >= ${expected.min}, got ${actual}`);
      }
    } else {
      // Equality check
      if (actual !== expected) {
        failures.push(`${field}: expected "${expected}", got "${actual}"`);
      }
    }
  }
  
  return {
    pass: failures.length === 0,
    fields: fm,
    failures
  };
}

/**
 * Check if file content matches (or must NOT match) a regex
 * @param {string} filePath - Path to file
 * @param {string} regexStr - Regex pattern string
 * @param {object} [options] - Options
 * @param {boolean} [options.must_not_match=false] - If true, the regex must NOT match (anti-pattern check)
 * @returns {{pass: boolean, matched: boolean, reason?: string}}
 */
function regexMatch(filePath, regexStr, options = {}) {
  if (!fileExists(filePath)) {
    return { pass: false, matched: false, reason: 'File not found' };
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  // Use 'u' flag for Unicode property escapes (\u{...} ranges)
  const flags = regexStr.includes('\\u{') ? 'gmu' : 'gm';
  const regex = new RegExp(regexStr, flags);
  const matched = regex.test(content);
  
  if (options.must_not_match) {
    return { pass: !matched, matched };
  }
  return { pass: matched, matched };
}

/**
 * Count occurrences of a regex pattern in a file
 * @param {string} filePath - Path to file
 * @param {string} regexStr - Regex pattern string
 * @param {number} minCount - Minimum number of matches required
 * @returns {{pass: boolean, count: number, reason?: string}}
 */
function minRegexCount(filePath, regexStr, minCount) {
  if (!fileExists(filePath)) {
    return { pass: false, count: 0, reason: 'File not found' };
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const flags = regexStr.includes('\\u{') ? 'gmu' : 'gm';
  const regex = new RegExp(regexStr, flags);
  const matches = content.match(regex) || [];

  return {
    pass: matches.length >= minCount,
    count: matches.length
  };
}

/**
 * Make an HTTP HEAD request and return the status code.
 * Follows up to 5 redirects. Times out after 10 seconds.
 * @param {string} url - URL to check
 * @returns {Promise<{status: number, ok: boolean, error?: string}>}
 */
function headRequest(url, redirectCount = 0, retryCount = 0) {
  return new Promise((resolve) => {
    if (redirectCount > 5) {
      resolve({ status: 0, ok: false, error: 'Too many redirects' });
      return;
    }

    const proto = url.startsWith('https') ? https : http;
    const req = proto.request(url, {
      method: 'HEAD',
      timeout: 10000,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EsyBot/1.0; +https://esy.com)' }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(headRequest(res.headers.location, redirectCount + 1, 0));
        return;
      }
      if (res.statusCode === 429 && retryCount < 3) {
        const delay = (retryCount + 1) * 2000;
        setTimeout(() => resolve(headRequest(url, redirectCount, retryCount + 1)), delay);
        return;
      }
      resolve({ status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 300 });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 0, ok: false, error: 'Timeout (10s)' });
    });
    req.on('error', (err) => {
      resolve({ status: 0, ok: false, error: err.message });
    });
    req.end();
  });
}

/**
 * Extract URLs from a file matching a regex, then verify each returns HTTP 2xx.
 * @param {string} filePath - Path to file containing URLs
 * @param {string} urlPattern - Regex to extract URLs (must capture full URL). If omitted, extracts all https:// URLs.
 * @param {object} [options]
 * @param {number} [options.max_failures=0] - Maximum allowed failures before the check fails
 * @param {number} [options.sample_size] - If set, only check this many URLs (random sample for large sets)
 * @returns {Promise<{pass: boolean, total: number, checked: number, ok: number, failed: Array<{url: string, status: number, error?: string}>}>}
 */
async function urlReachable(filePath, urlPattern, options = {}) {
  if (!fileExists(filePath)) {
    return { pass: false, total: 0, checked: 0, ok: 0, failed: [], reason: 'File not found' };
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const pattern = urlPattern || 'https?://[^\\s"\'\\)>]+';
  const regex = new RegExp(pattern, 'gm');
  const urls = [...new Set(content.match(regex) || [])];

  if (urls.length === 0) {
    return { pass: false, total: 0, checked: 0, ok: 0, failed: [], reason: 'No URLs found matching pattern' };
  }

  let toCheck = urls;
  if (options.sample_size && options.sample_size < urls.length) {
    const shuffled = [...urls].sort(() => Math.random() - 0.5);
    toCheck = shuffled.slice(0, options.sample_size);
  }

  const maxFailures = options.max_failures || 0;
  const failed = [];

  const results = [];
  for (const url of toCheck) {
    const result = await headRequest(url);
    if (!result.ok) {
      failed.push({ url, status: result.status, error: result.error });
    }
    results.push(result);
    if (toCheck.indexOf(url) < toCheck.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  const okCount = results.filter(r => r.ok).length;

  return {
    pass: failed.length <= maxFailures,
    total: urls.length,
    checked: toCheck.length,
    ok: okCount,
    failed
  };
}

/**
 * Resolve a not_contains target to the actual existing file when any_of outputs are present.
 * If the target path doesn't exist but an any_of sibling does, returns the existing sibling.
 * @param {string} targetPath - The resolved target path from the validation
 * @param {Array} anyOfOutputs - The any_of outputs from the contract (already resolved)
 * @returns {string} The path to actually check
 */
function resolveAnyOfTarget(targetPath, anyOfOutputs) {
  // If target exists, use it directly
  if (fileExists(targetPath)) return targetPath;
  
  // Otherwise, find the first any_of output that does exist
  if (anyOfOutputs && anyOfOutputs.length > 0) {
    for (const output of anyOfOutputs) {
      if (fileExists(output.path)) {
        return output.path;
      }
    }
  }
  
  // No file found at all — return original (will fail in the validation)
  return targetPath;
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
      // Resolve target: if the hardcoded path doesn't exist, check any_of siblings
      let targetPath = validation.resolvedTarget;
      targetPath = resolveAnyOfTarget(targetPath, anyOfOutputs);
      
      const result = notContains(targetPath, validation.pattern, {
        missing_ok: validation.missing_ok === true
      });
      
      const validationResult = {
        type: 'not_contains',
        path: validation.target,
        resolved_path: targetPath,
        pattern: validation.pattern,
        found: result.found,
        severity: validation.severity || 'error',
        description: validation.description
      };
      
      if (result.reason) {
        validationResult.reason = result.reason;
      }
      
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
    
    if (validation.type === 'contains_text') {
      let targetPath = validation.resolvedTarget;
      // Support any_of resolution for contains_text too
      if (targetPath) {
        targetPath = resolveAnyOfTarget(targetPath, anyOfOutputs);
      }
      
      const patterns = validation.patterns || (validation.pattern ? [validation.pattern] : []);
      const result = containsText(targetPath, patterns);
      
      const validationResult = {
        type: 'contains_text',
        path: validation.target,
        resolved_path: targetPath,
        patterns,
        missing: result.missing,
        severity: validation.severity || 'error',
        description: validation.description
      };
      
      if (result.reason) {
        validationResult.reason = result.reason;
      }
      
      if (validation.severity === 'warning') {
        validationResult.pass = true;
        validationResult.warning = !result.pass;
      } else {
        validationResult.pass = result.pass;
        if (!result.pass) {
          allPass = false;
        }
      }
      
      results.push(validationResult);
    }
    
    if (validation.type === 'frontmatter_status') {
      let targetPath = validation.resolvedTarget;
      if (targetPath) {
        targetPath = resolveAnyOfTarget(targetPath, anyOfOutputs);
      }
      
      const checks = validation.checks || {};
      const result = frontmatterStatus(targetPath, checks);
      
      const validationResult = {
        type: 'frontmatter_status',
        path: validation.target,
        resolved_path: targetPath,
        checks,
        fields: result.fields,
        failures: result.failures,
        severity: validation.severity || 'error',
        description: validation.description
      };
      
      if (result.reason) {
        validationResult.reason = result.reason;
      }
      
      if (validation.severity === 'warning') {
        validationResult.pass = true;
        validationResult.warning = !result.pass;
      } else {
        validationResult.pass = result.pass;
        if (!result.pass) {
          allPass = false;
        }
      }
      
      results.push(validationResult);
    }
    
    if (validation.type === 'regex_match') {
      let targetPath = validation.resolvedTarget;
      if (targetPath) {
        targetPath = resolveAnyOfTarget(targetPath, anyOfOutputs);
      }
      
      const result = regexMatch(targetPath, validation.regex, {
        must_not_match: validation.must_not_match === true
      });
      
      const validationResult = {
        type: 'regex_match',
        path: validation.target,
        resolved_path: targetPath,
        regex: validation.regex,
        must_not_match: validation.must_not_match || false,
        matched: result.matched,
        severity: validation.severity || 'error',
        description: validation.description
      };
      
      if (result.reason) {
        validationResult.reason = result.reason;
      }
      
      if (validation.severity === 'warning') {
        validationResult.pass = true;
        validationResult.warning = !result.pass;
      } else {
        validationResult.pass = result.pass;
        if (!result.pass) {
          allPass = false;
        }
      }
      
      results.push(validationResult);
    }
    
    if (validation.type === 'min_regex_count') {
      let targetPath = validation.resolvedTarget;
      if (targetPath) {
        targetPath = resolveAnyOfTarget(targetPath, anyOfOutputs);
      }
      
      const minCount = validation.min_count || 1;
      const result = minRegexCount(targetPath, validation.regex, minCount);
      
      const validationResult = {
        type: 'min_regex_count',
        path: validation.target,
        resolved_path: targetPath,
        regex: validation.regex,
        min_count: minCount,
        actual_count: result.count,
        severity: validation.severity || 'error',
        description: validation.description
      };
      
      if (result.reason) {
        validationResult.reason = result.reason;
      }
      
      if (validation.severity === 'warning') {
        validationResult.pass = true;
        validationResult.warning = !result.pass;
      } else {
        validationResult.pass = result.pass;
        if (!result.pass) {
          allPass = false;
        }
      }
      
      results.push(validationResult);
    }
    
    if (validation.type === 'url_reachable') {
      let targetPath = validation.resolvedTarget;
      if (targetPath) {
        targetPath = resolveAnyOfTarget(targetPath, anyOfOutputs);
      }
      
      const urlPattern = validation.url_pattern || null;
      const result = await urlReachable(targetPath, urlPattern, {
        max_failures: validation.max_failures || 0,
        sample_size: validation.sample_size
      });
      
      const validationResult = {
        type: 'url_reachable',
        path: validation.target,
        resolved_path: targetPath,
        total_urls: result.total,
        checked: result.checked,
        ok: result.ok,
        failed: result.failed,
        max_failures: validation.max_failures || 0,
        severity: validation.severity || 'error',
        description: validation.description
      };
      
      if (result.reason) {
        validationResult.reason = result.reason;
      }
      
      if (validation.severity === 'warning') {
        validationResult.pass = true;
        validationResult.warning = !result.pass;
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
  containsText,
  notContains,
  frontmatterStatus,
  parseFrontmatter,
  regexMatch,
  minRegexCount,
  urlReachable,
  headRequest,
  resolveAnyOfTarget,
  runValidations
};
