/**
 * Regression tests for the visual essay pipeline
 *
 * Auto-discovers persistent fixture directories in __fixtures__/.
 * Each fixture has a manifest.json declaring which gates it should pass/fail.
 * Bad fixtures can "extend" baseline — the runner copies the base, then overlays
 * the fixture's own files on top (and optionally excludes files).
 *
 * To add a new test case: create a folder in __fixtures__/, add a manifest.json,
 * and drop in the broken file(s). No code changes needed here.
 *
 * Run: node --test orchestration/runner/__tests__/regression.test.js
 */

const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const { loadContract, getRequiredOutputs, getValidations, REPO_ROOT } = require('../lib/contract-loader');
const { runValidations } = require('../lib/validator');

// --- Constants ---

const FIXTURES_DIR = path.join(__dirname, '__fixtures__');
const FIXTURE_SLUG = 'test-fixture';

// --- Helpers ---

let fixtureDir;

function createTempEssayDir() {
  const tempSlug = `__test-fixture-${Date.now()}`;
  fixtureDir = path.join(REPO_ROOT, 'src', 'app', 'essays', tempSlug);
  fs.mkdirSync(path.join(fixtureDir, 'research'), { recursive: true });
  return {
    slug: FIXTURE_SLUG,
    artifact_path: `src/app/essays/${tempSlug}`,
    depth: 'standard',
  };
}

function cleanupTempDir() {
  if (fixtureDir && fs.existsSync(fixtureDir)) {
    fs.rmSync(fixtureDir, { recursive: true, force: true });
  }
}

/**
 * Recursively copy all files from src to dest, preserving directory structure.
 */
function copyDirSync(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDirSync(srcPath, destPath);
    } else if (entry.name !== 'manifest.json') {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Load a fixture into the temp essay directory.
 * If the manifest has "extends", copies the base fixture first, then overlays.
 * If the manifest has "exclude", deletes those files after copying.
 */
function loadFixture(fixtureName) {
  const fixtureRoot = path.join(FIXTURES_DIR, fixtureName);
  const manifestPath = path.join(fixtureRoot, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  if (manifest.extends) {
    const basePath = path.join(FIXTURES_DIR, manifest.extends);
    copyDirSync(basePath, fixtureDir);
  }

  copyDirSync(fixtureRoot, fixtureDir);

  if (manifest.exclude && Array.isArray(manifest.exclude)) {
    for (const relPath of manifest.exclude) {
      const target = path.join(fixtureDir, relPath);
      if (fs.existsSync(target)) {
        fs.unlinkSync(target);
      }
    }
  }

  return manifest;
}

/**
 * Run a gate's validations against the temp essay directory.
 * Skips url_reachable validations (those are covered by smoke.test.js).
 */
async function validateGate(gateCode, context) {
  const contract = loadContract(gateCode);
  const outputs = getRequiredOutputs(contract, context);
  const validations = getValidations(contract, context);

  const filteredValidations = validations.filter(v => v.type !== 'url_reachable');

  return runValidations(contract, outputs, filteredValidations, context);
}

// --- Discover fixtures ---

function discoverFixtures() {
  const fixtures = [];
  if (!fs.existsSync(FIXTURES_DIR)) return fixtures;

  for (const entry of fs.readdirSync(FIXTURES_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const manifestPath = path.join(FIXTURES_DIR, entry.name, 'manifest.json');
    if (!fs.existsSync(manifestPath)) continue;

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    fixtures.push({ name: entry.name, manifest });
  }

  return fixtures;
}

// --- Test suites ---

const allFixtures = discoverFixtures();

for (const fixture of allFixtures) {
  describe(`FIXTURE: ${fixture.name}`, () => {
    let context;

    beforeEach(() => {
      context = createTempEssayDir();
    });
    afterEach(cleanupTempDir);

    for (const assertion of fixture.manifest.assertions) {
      const verb = assertion.expect === 'pass' ? 'passes' : assertion.expect === 'warn' ? 'warns on' : 'fails';
      const testName = `${assertion.gate} ${verb} — ${assertion.reason || fixture.manifest.description}`;

      it(testName, async () => {
        loadFixture(fixture.name);
        const result = await validateGate(assertion.gate, context);

        if (assertion.expect === 'pass') {
          if (!result.pass) {
            const failures = result.results.filter(r => !r.pass);
            const details = failures.map(f =>
              `  ${f.type}: ${f.description || ''} ${f.reason || ''} ${f.missing ? `missing: ${JSON.stringify(f.missing)}` : ''}`
            ).join('\n');
            assert.fail(`${assertion.gate} should PASS for "${fixture.name}" but FAILED:\n${details}`);
          }
        } else if (assertion.expect === 'fail') {
          assert.equal(result.pass, false,
            `${assertion.gate} should FAIL for "${fixture.name}" but PASSED`
          );
        } else if (assertion.expect === 'warn') {
          const warnings = result.results.filter(r => r.warning === true);
          assert.ok(warnings.length > 0,
            `${assertion.gate} should produce warnings for "${fixture.name}" but had none`
          );
        }
      });
    }
  });
}
