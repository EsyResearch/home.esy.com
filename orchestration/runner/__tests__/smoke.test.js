/**
 * Smoke tests — real network calls to verify R2 image URLs are live.
 *
 * NOT run in `npm test`. Run separately via `npm run test:smoke`.
 * These tests hit production infrastructure (images.esy.com) and require
 * network access. They verify that deployed images actually resolve.
 *
 * Run: node --test orchestration/runner/__tests__/smoke.test.js
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const { headRequest } = require('../lib/validator');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const ESSAYS_DIR = path.join(REPO_ROOT, 'src', 'app', 'essays');

/**
 * Find all images.ts files across published essays and extract R2 URLs.
 */
function collectR2Urls() {
  const urls = [];
  if (!fs.existsSync(ESSAYS_DIR)) return urls;

  for (const entry of fs.readdirSync(ESSAYS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('__test')) continue;

    const imagesPath = path.join(ESSAYS_DIR, entry.name, 'images.ts');
    if (!fs.existsSync(imagesPath)) continue;

    const content = fs.readFileSync(imagesPath, 'utf8');
    const matches = content.match(/https:\/\/images\.esy\.com\/[^"'\s]+/g) || [];
    for (const url of matches) {
      urls.push({ essay: entry.name, url });
    }
  }

  return urls;
}

describe('SMOKE: R2 image URLs are reachable', () => {
  const r2Urls = collectR2Urls();

  if (r2Urls.length === 0) {
    it('no R2 URLs found — nothing to smoke test', () => {
      assert.ok(true, 'No essays with R2 images found');
    });
    return;
  }

  const sample = r2Urls.length > 20 ? r2Urls.slice(0, 20) : r2Urls;

  for (const { essay, url } of sample) {
    it(`${essay}: ${url}`, async () => {
      const result = await headRequest(url);
      assert.ok(result.ok,
        `${url} returned HTTP ${result.status} (expected 2xx)`
      );
    });
  }
});
