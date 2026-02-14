/**
 * Unit tests for orchestration/runner/lib/validator.js
 * 
 * Run: node --test orchestration/runner/__tests__/validator.test.js
 */

const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');

const {
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
  resolveAnyOfTarget,
} = require('../lib/validator');

// --- Test helpers ---

let tmpDir;

function setup() {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'validator-test-'));
}

function teardown() {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

function writeTemp(name, content) {
  const filePath = path.join(tmpDir, name);
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content);
  return filePath;
}

// --- fileExists ---

describe('fileExists', () => {
  beforeEach(setup);
  afterEach(teardown);

  it('returns true for existing file', () => {
    const p = writeTemp('exists.txt', 'hello');
    assert.equal(fileExists(p), true);
  });

  it('returns false for non-existing file', () => {
    assert.equal(fileExists(path.join(tmpDir, 'nope.txt')), false);
  });
});

// --- dirExists ---

describe('dirExists', () => {
  beforeEach(setup);
  afterEach(teardown);

  it('returns true for existing directory', () => {
    const dir = path.join(tmpDir, 'subdir');
    fs.mkdirSync(dir);
    assert.equal(dirExists(dir), true);
  });

  it('returns false for non-existing directory', () => {
    assert.equal(dirExists(path.join(tmpDir, 'nope')), false);
  });

  it('returns false for a file (not a directory)', () => {
    const p = writeTemp('file.txt', 'hello');
    assert.equal(dirExists(p), false);
  });
});

// --- countFiles ---

describe('countFiles', () => {
  beforeEach(setup);
  afterEach(teardown);

  it('counts files matching pattern', () => {
    writeTemp('a.md', '# A');
    writeTemp('b.md', '# B');
    writeTemp('c.txt', 'text');
    assert.equal(countFiles(tmpDir, '*.md'), 2);
  });

  it('returns 0 for non-existing directory', () => {
    assert.equal(countFiles(path.join(tmpDir, 'nope'), '*.md'), 0);
  });

  it('counts all files with wildcard', () => {
    writeTemp('a.md', '# A');
    writeTemp('b.txt', 'text');
    assert.equal(countFiles(tmpDir, '*'), 2);
  });
});

// --- countSources ---

describe('countSources', () => {
  beforeEach(setup);
  afterEach(teardown);

  it('counts H3 headings that are source entries', () => {
    const content = `# Citations

## Primary Sources

### Source One
- URL: https://example.com/1

### Source Two
- URL: https://example.com/2

### Source Three
- URL: https://example.com/3
`;
    const p = writeTemp('CITATIONS.md', content);
    assert.ok(countSources(p) >= 3);
  });

  it('returns 0 for non-existing file', () => {
    assert.equal(countSources(path.join(tmpDir, 'nope.md')), 0);
  });

  it('counts unique URLs', () => {
    const content = `
https://example.com/a
https://example.com/b
https://example.com/a
`;
    const p = writeTemp('CITATIONS.md', content);
    assert.ok(countSources(p) >= 2);
  });
});

// --- containsHeadings ---

describe('containsHeadings', () => {
  beforeEach(setup);
  afterEach(teardown);

  it('passes when all headings present', () => {
    const p = writeTemp('page.tsx', `
export default function Page() {}
export const metadata = {};
`);
    const result = containsHeadings(p, ['export default', 'metadata']);
    assert.equal(result.pass, true);
    assert.deepEqual(result.missing, []);
  });

  it('fails when heading missing', () => {
    const p = writeTemp('page.tsx', 'export default function Page() {}');
    const result = containsHeadings(p, ['export default', 'metadata']);
    assert.equal(result.pass, false);
    assert.deepEqual(result.missing, ['metadata']);
  });

  it('fails when file does not exist', () => {
    const result = containsHeadings(path.join(tmpDir, 'nope.tsx'), ['export default']);
    assert.equal(result.pass, false);
  });
});

// --- containsText ---

describe('containsText', () => {
  beforeEach(setup);
  afterEach(teardown);

  it('passes when all patterns present', () => {
    const p = writeTemp('page.tsx', `
import { ArtifactDetailWrapper } from '@/components/ArtifactDetail';
const ESSAY_META = {};
`);
    const result = containsText(p, ['ArtifactDetailWrapper', 'ESSAY_META']);
    assert.equal(result.pass, true);
    assert.deepEqual(result.missing, []);
  });

  it('fails when pattern missing', () => {
    const p = writeTemp('page.tsx', 'export default function Page() {}');
    const result = containsText(p, ['ArtifactDetailWrapper', 'ESSAY_META']);
    assert.equal(result.pass, false);
    assert.deepEqual(result.missing, ['ArtifactDetailWrapper', 'ESSAY_META']);
  });

  it('fails when file does not exist', () => {
    const result = containsText(path.join(tmpDir, 'nope.tsx'), ['something']);
    assert.equal(result.pass, false);
    assert.equal(result.reason, 'File not found');
  });

  it('accepts a single string pattern', () => {
    const p = writeTemp('test.txt', 'hello world');
    const result = containsText(p, 'hello');
    assert.equal(result.pass, true);
  });
});

// --- notContains ---

describe('notContains', () => {
  beforeEach(setup);
  afterEach(teardown);

  it('passes when pattern is absent', () => {
    const p = writeTemp('audit.md', 'status: PASS');
    const result = notContains(p, 'status: FAIL');
    assert.equal(result.pass, true);
    assert.equal(result.found, false);
  });

  it('fails when pattern is present', () => {
    const p = writeTemp('audit.md', 'status: FAIL');
    const result = notContains(p, 'status: FAIL');
    assert.equal(result.pass, false);
    assert.equal(result.found, true);
  });

  it('FAILS when file does not exist (default behavior)', () => {
    const result = notContains(path.join(tmpDir, 'nope.md'), 'anything');
    assert.equal(result.pass, false, 'not_contains on missing file should FAIL by default');
    assert.ok(result.reason.includes('File not found'));
  });

  it('passes when file does not exist with missing_ok: true', () => {
    const result = notContains(path.join(tmpDir, 'nope.md'), 'anything', { missing_ok: true });
    assert.equal(result.pass, true);
  });
});

// --- parseFrontmatter ---

describe('parseFrontmatter', () => {
  beforeEach(setup);
  afterEach(teardown);

  it('parses YAML frontmatter', () => {
    const p = writeTemp('audit.md', `---
gate: G5.2
status: PASS
score: 85
blocking_issues: 0
---
# Audit Report
Content here.
`);
    const fm = parseFrontmatter(p);
    assert.equal(fm.gate, 'G5.2');
    assert.equal(fm.status, 'PASS');
    assert.equal(fm.score, 85);
    assert.equal(fm.blocking_issues, 0);
  });

  it('returns null for file without frontmatter', () => {
    const p = writeTemp('plain.md', '# No frontmatter');
    const fm = parseFrontmatter(p);
    assert.equal(fm, null);
  });

  it('returns null for non-existing file', () => {
    const fm = parseFrontmatter(path.join(tmpDir, 'nope.md'));
    assert.equal(fm, null);
  });
});

// --- frontmatterStatus ---

describe('frontmatterStatus', () => {
  beforeEach(setup);
  afterEach(teardown);

  it('passes equality check', () => {
    const p = writeTemp('audit.md', `---
status: PASS
---`);
    const result = frontmatterStatus(p, { status: 'PASS' });
    assert.equal(result.pass, true);
  });

  it('fails equality check', () => {
    const p = writeTemp('audit.md', `---
status: FAIL
---`);
    const result = frontmatterStatus(p, { status: 'PASS' });
    assert.equal(result.pass, false);
  });

  it('passes "not" check', () => {
    const p = writeTemp('audit.md', `---
status: PASS
---`);
    const result = frontmatterStatus(p, { status: { not: 'FAIL' } });
    assert.equal(result.pass, true);
  });

  it('fails "not" check when value matches', () => {
    const p = writeTemp('audit.md', `---
status: FAIL
---`);
    const result = frontmatterStatus(p, { status: { not: 'FAIL' } });
    assert.equal(result.pass, false);
  });

  it('passes "min" check', () => {
    const p = writeTemp('audit.md', `---
score: 85
---`);
    const result = frontmatterStatus(p, { score: { min: 75 } });
    assert.equal(result.pass, true);
  });

  it('fails "min" check', () => {
    const p = writeTemp('audit.md', `---
score: 60
---`);
    const result = frontmatterStatus(p, { score: { min: 75 } });
    assert.equal(result.pass, false);
  });

  it('fails when file has no frontmatter', () => {
    const p = writeTemp('plain.md', '# No frontmatter');
    const result = frontmatterStatus(p, { status: 'PASS' });
    assert.equal(result.pass, false);
  });

  it('fails when file does not exist', () => {
    const result = frontmatterStatus(path.join(tmpDir, 'nope.md'), { status: 'PASS' });
    assert.equal(result.pass, false);
  });
});

// --- regexMatch ---

describe('regexMatch', () => {
  beforeEach(setup);
  afterEach(teardown);

  it('passes when pattern matches', () => {
    const p = writeTemp('code.tsx', 'const x = "hello world";');
    const result = regexMatch(p, 'hello\\s+world');
    assert.equal(result.pass, true);
    assert.equal(result.matched, true);
  });

  it('fails when pattern does not match', () => {
    const p = writeTemp('code.tsx', 'const x = 42;');
    const result = regexMatch(p, 'hello\\s+world');
    assert.equal(result.pass, false);
    assert.equal(result.matched, false);
  });

  it('passes must_not_match when pattern is absent', () => {
    const p = writeTemp('code.tsx', 'clean code here');
    const result = regexMatch(p, 'TODO', { must_not_match: true });
    assert.equal(result.pass, true);
    assert.equal(result.matched, false);
  });

  it('fails must_not_match when pattern is present', () => {
    const p = writeTemp('code.tsx', '// TODO: fix this');
    const result = regexMatch(p, 'TODO', { must_not_match: true });
    assert.equal(result.pass, false);
    assert.equal(result.matched, true);
  });

  it('handles Unicode emoji patterns with \\u{} syntax', () => {
    const p = writeTemp('code.tsx', 'const icon = "🚀 rocket";');
    const result = regexMatch(p, '[\\u{1F300}-\\u{1F9FF}\\u{2600}-\\u{26FF}\\u{2700}-\\u{27BF}]', { must_not_match: true });
    assert.equal(result.pass, false, 'Emoji should be detected');
    assert.equal(result.matched, true);
  });

  it('passes Unicode emoji check on clean file', () => {
    const p = writeTemp('code.tsx', 'const icon = "rocket";');
    const result = regexMatch(p, '[\\u{1F300}-\\u{1F9FF}\\u{2600}-\\u{26FF}\\u{2700}-\\u{27BF}]', { must_not_match: true });
    assert.equal(result.pass, true);
    assert.equal(result.matched, false);
  });

  it('detects AI slop phrases', () => {
    const p = writeTemp('essay.tsx', 'Let us delve into the tapestry of history.');
    const result = regexMatch(p, '(\\bdelve\\b|\\btapestry\\b|\\bunlock the secrets\\b)', { must_not_match: true });
    assert.equal(result.pass, false);
    assert.equal(result.matched, true);
  });

  it('fails when file does not exist', () => {
    const result = regexMatch(path.join(tmpDir, 'nope.tsx'), 'anything');
    assert.equal(result.pass, false);
  });
});

// --- resolveAnyOfTarget ---

describe('resolveAnyOfTarget', () => {
  beforeEach(setup);
  afterEach(teardown);

  it('returns original path when file exists', () => {
    const p = writeTemp('research/AUDIT.md', 'content');
    const result = resolveAnyOfTarget(p, []);
    assert.equal(result, p);
  });

  it('resolves to existing any_of sibling when target missing', () => {
    const existing = writeTemp('AUDIT.md', 'content at root');
    const missing = path.join(tmpDir, 'research', 'AUDIT.md');
    
    const anyOfOutputs = [
      { path: missing },
      { path: existing },
    ];
    
    const result = resolveAnyOfTarget(missing, anyOfOutputs);
    assert.equal(result, existing);
  });

  it('returns original path when no any_of siblings exist', () => {
    const missing = path.join(tmpDir, 'research', 'AUDIT.md');
    const alsoMissing = path.join(tmpDir, 'AUDIT.md');
    
    const anyOfOutputs = [
      { path: missing },
      { path: alsoMissing },
    ];
    
    const result = resolveAnyOfTarget(missing, anyOfOutputs);
    assert.equal(result, missing);
  });

  it('returns original path when anyOfOutputs is empty', () => {
    const missing = path.join(tmpDir, 'nope.md');
    const result = resolveAnyOfTarget(missing, []);
    assert.equal(result, missing);
  });
});
