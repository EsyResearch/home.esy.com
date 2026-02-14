/**
 * Regression tests for the visual essay pipeline
 * 
 * Uses synthetic fixtures (known-good and known-bad essay structures)
 * to verify that the full contract → validator chain catches real failures.
 * 
 * These tests exercise the INTEGRATION between:
 *   contract-loader.js (path resolution, contract parsing)
 *   validator.js (validation execution)
 *   *.contract.json (gate contracts)
 * 
 * Run: node --test orchestration/runner/__tests__/regression.test.js
 */

const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');

const { loadContract, getRequiredOutputs, getValidations, REPO_ROOT } = require('../lib/contract-loader');
const { runValidations } = require('../lib/validator');

// --- Test fixtures ---

let fixtureDir;
let fixtureSlug;
let fixtureArtifactPath;
let fixtureContext;

/**
 * Create a fixture directory that mimics a real essay artifact path
 * inside the actual repo so that contract-loader path resolution works.
 */
function createFixtureDir() {
  // Create a unique slug to avoid collisions
  fixtureSlug = `__test-essay-${Date.now()}`;
  fixtureArtifactPath = `src/app/essays/${fixtureSlug}`;
  fixtureDir = path.join(REPO_ROOT, fixtureArtifactPath);
  fs.mkdirSync(path.join(fixtureDir, 'research'), { recursive: true });
  fixtureContext = {
    slug: fixtureSlug,
    artifact_path: fixtureArtifactPath,
    depth: 'standard'
  };
}

function cleanupFixtureDir() {
  if (fixtureDir && fs.existsSync(fixtureDir)) {
    fs.rmSync(fixtureDir, { recursive: true, force: true });
  }
}

/**
 * Write a file in the fixture essay directory
 */
function writeFixture(relativePath, content) {
  const fullPath = path.join(fixtureDir, relativePath);
  const dir = path.dirname(fullPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, content);
  return fullPath;
}

/**
 * Run a gate's validations against the fixture essay
 */
async function validateGate(gateCode) {
  const contract = loadContract(gateCode);
  const outputs = getRequiredOutputs(contract, fixtureContext);
  const validations = getValidations(contract, fixtureContext);
  return runValidations(contract, outputs, validations, fixtureContext);
}

// ============================================================================
// KNOWN-GOOD FIXTURES: These should PASS all validations
// ============================================================================

/**
 * Create a known-good essay that satisfies ALL contracts
 */
function createKnownGoodEssay() {
  // -- page.tsx: proper ArtifactDetailWrapper structure --
  writeFixture('page.tsx', `
import { Metadata } from 'next';
import { ArtifactDetailWrapper } from '@/components/ArtifactDetail';
import TestEssayClient from './TestEssayClient';

const ESSAY_META = {
  title: 'Test Essay',
  slug: '${fixtureSlug}',
  number: '99',
  category: 'Science',
};

export const metadata: Metadata = {
  title: ESSAY_META.title,
  description: 'A test essay for regression testing',
};

export default function Page() {
  return (
    <ArtifactDetailWrapper meta={ESSAY_META}>
      <TestEssayClient />
    </ArtifactDetailWrapper>
  );
}
`);

  // -- Client component: NO emojis, NO AI slop, HAS diagram-contracts --
  writeFixture('TestEssayClient.tsx', `'use client';

import React, { useState, useRef, useEffect } from 'react';
import './${fixtureSlug}.css';

/**
 * @diagram-contract SpeedComparison
 * invariant: bars scale linearly to data values
 * invariant: labels show exact km/h values
 * invariant: color gradient follows design token --speed-gradient
 */

interface SpeedData {
  name: string;
  speed: number;
  unit: string;
}

const SPEEDS: SpeedData[] = [
  { name: 'Walking', speed: 5, unit: 'km/h' },
  { name: 'Cycling', speed: 25, unit: 'km/h' },
  { name: 'Driving', speed: 120, unit: 'km/h' },
  { name: 'Sound', speed: 1235, unit: 'km/h' },
  { name: 'Light', speed: 1079252849, unit: 'km/h' },
];

/**
 * @diagram-contract LightDelay
 * invariant: delay = distance / speed_of_light
 * invariant: animation duration proportional to actual delay
 * invariant: distance labels in astronomical units
 */

function SpeedComparison({ speeds }: { speeds: SpeedData[] }) {
  const maxSpeed = Math.max(...speeds.map(s => s.speed));
  return (
    <div className="speed-comparison" role="figure" aria-label="Speed comparison chart">
      {speeds.map(s => (
        <div key={s.name} className="speed-bar-row">
          <span className="speed-label">{s.name}</span>
          <div className="speed-bar" style={{ width: \`\${(s.speed / maxSpeed) * 100}%\` }} />
          <span className="speed-value">{s.speed.toLocaleString()} {s.unit}</span>
        </div>
      ))}
    </div>
  );
}

export default function TestEssayClient() {
  return (
    <article className="test-essay">
      <section className="essay-intro">
        <h1>The Spectrum of Velocity</h1>
        <p>
          At 5 kilometers per hour, the human body moves through space at roughly the same 
          pace our ancestors traveled across the African savanna 200,000 years ago. The 
          mechanical advantage of a bicycle multiplies that fivefold. An automobile pushes 
          past 100 km/h with the casual turn of a foot. Sound propagates through sea-level 
          air at 1,235 km/h.
        </p>
        <p>
          And light, the universe's absolute speed limit, covers 299,792,458 meters every 
          second. That number is not approximate; it is the definition by which we measure 
          distance itself.
        </p>
      </section>

      <SpeedComparison speeds={SPEEDS} />

      <section className="essay-body">
        <h2>Why Nothing Moves Faster</h2>
        <p>
          In 1905, a 26-year-old patent clerk in Bern published four papers that 
          dismantled classical mechanics. The second, "On the Electrodynamics of Moving 
          Bodies," established that the speed of light in vacuum is invariant across all 
          inertial reference frames. This was not a discovery about light. It was a 
          discovery about spacetime.
        </p>
        <p>
          As an object with mass approaches c, the energy required to continue accelerating 
          grows without bound. At 99.999% of c, a proton in the Large Hadron Collider 
          carries the kinetic energy of a flying mosquito concentrated into a particle 
          10^-15 meters across.
        </p>
      </section>
    </article>
  );
}
`);

  // -- CSS file --
  writeFixture(`${fixtureSlug}.css`, `
.test-essay {
  --speed-gradient: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
  font-family: 'Inter', sans-serif;
  color: #e8e8e8;
}

.speed-comparison {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 2rem;
}

.speed-bar-row {
  display: grid;
  grid-template-columns: 100px 1fr 120px;
  align-items: center;
  gap: 1rem;
}

.speed-bar {
  height: 24px;
  background: var(--speed-gradient);
  border-radius: 4px;
  transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
`);

  // -- G1 intake --
  writeFixture('G1-INTAKE.md', `---
gate: G1
status: PASS
---
# Intake: Test Essay
## Thesis
Speed is relative.
## Learning Objectives
1. Understand relative motion
## Scope
Standard depth.
`);

  // -- Research artifacts for G2 --
  writeFixture('research/CITATIONS.md', `# Citations

### Einstein, A. (1905)
- URL: https://doi.org/10.1002/andp.19053221004
- Type: Primary

### NASA (2024)
- URL: https://science.nasa.gov/speed-of-light
- Type: Primary

### Feynman, R. (1964)
- URL: https://www.feynmanlectures.caltech.edu
- Type: Primary

### CERN (2024)
- URL: https://home.cern/science/accelerators
- Type: Primary

### Michelson, A. & Morley, E. (1887)
- URL: https://doi.org/10.2475/ajs.s3-34.203.333
- Type: Primary

### Maxwell, J.C. (1865)
- URL: https://doi.org/10.1098/rstl.1865.0008
- Type: Primary

### Planck Collaboration (2020)
- URL: https://doi.org/10.1051/0004-6361/201833910
- Type: Primary

### LIGO Scientific Collaboration (2016)
- URL: https://doi.org/10.1103/PhysRevLett.116.061102
- Type: Primary
`);

  // -- Design research (G4) --
  writeFixture('DESIGN-RESEARCH.md', `---
gate: G4
status: PASS
---
# Design Research: Test Essay
## Visual Identity
Dark cosmos aesthetic with velocity gradients.
## Color Palette
Primary: #0f3460, Accent: #e94560
## Typography
Inter for body, JetBrains Mono for data.
## Animation Philosophy
Easing curves that mirror physical acceleration.
`);

  // -- Audit reports --
  writeFixture('G4.1-DESIGN-RECONCILIATION.md', `---
gate: G4.1
status: PASS
---
# Design Reconciliation
Thematic authenticity verified. Visual identity is novel and derived from subject matter.
`);

  writeFixture('research/IMAGE-SOURCES.md', `---
gate: G4.5
status: PASS
---
# Image Sources
All images sourced with appropriate licenses.
`);

  writeFixture('G5.2-DESIGN-FIDELITY-AUDIT.md', `---
gate: G5.2
status: PASS
score: 92
blocking_issues: 0
---
# Design Fidelity Audit
All design tokens implemented. Color palette matches. Typography hierarchy correct.
`);

  writeFixture('DIAGRAM-CODE-RECONCILIATION.md', `---
gate: G5.3
status: PASS
score: 88
blocking_issues: 0
---
# Diagram-Code Reconciliation
All @diagram-contract blocks verified against implementation.
`);

  writeFixture('research/CONTENT-BIBLIOGRAPHY-AUDIT.md', `---
gate: G5.5
status: PASS
---
# Content Bibliography Audit
Works Cited section verified. All citations present.
`);

  writeFixture('research/CITATION-AUDIT.md', `---
gate: G6
status: PASS
---
# Citation Audit
All sources verified. Links healthy. Content-research alignment confirmed.
`);

  writeFixture('research/PROSE-QUALITY-AUDIT.md', `---
gate: G6.6
status: PASS
voice_consistency: 90
ai_slop_score: 95
transition_quality: 88
specificity: 92
rhythm: 85
---
# Prose Quality Audit
Writing craft evaluated across five dimensions. No AI slop patterns detected.
Voice is consistent throughout. Transitions are earned and specific.
`);

  writeFixture('research/SCROLL-CERTIFICATION.md', `---
gate: G7
status: PASS
---
# Scroll Certification
60fps verified. Mobile layout certified.
`);

  writeFixture('research/PUBLICATION-CERTIFICATION.md', `---
gate: G8
status: PASS
decision: GO
---
# Publication Certification
All domain audits passed. Ready for publication.
`);

  writeFixture('research/PUBLICATION-APPROVAL.md', `---
gate: G9
status: PASS
decision: APPROVED
---
# Publication Approval
Director sign-off. Approved for deployment.
`);
}

// ============================================================================
// KNOWN-BAD FIXTURES: Specific failure modes we MUST catch
// ============================================================================

/**
 * Bad fixture: Missing ArtifactDetailWrapper (the exact bug from the-speed-of-everything)
 */
function createBadEssay_NoWrapper() {
  createKnownGoodEssay(); // Start from good, then break it
  
  writeFixture('page.tsx', `
import { Metadata } from 'next';
import TestEssayClient from './TestEssayClient';

export const metadata: Metadata = {
  title: 'Test Essay',
  description: 'Missing the wrapper',
};

export default function Page() {
  return <TestEssayClient />;
}
`);
}

/**
 * Bad fixture: Emoji in client component
 */
function createBadEssay_Emojis() {
  createKnownGoodEssay();
  
  writeFixture('TestEssayClient.tsx', `'use client';
import React from 'react';

/**
 * @diagram-contract SpeedComparison
 * invariant: bars scale linearly
 */

export default function TestEssayClient() {
  return (
    <article>
      <h1>Speed of Everything</h1>
      <div className="speed-card">
        <span className="icon">🚀</span>
        <span>Rocket: 40,000 km/h</span>
      </div>
      <div className="speed-card">
        <span className="icon">⚡</span>
        <span>Lightning: 440,000 km/h</span>
      </div>
    </article>
  );
}
`);
}

/**
 * Bad fixture: AI slop phrases in content
 */
function createBadEssay_AISlop() {
  createKnownGoodEssay();
  
  writeFixture('TestEssayClient.tsx', `'use client';
import React from 'react';

/**
 * @diagram-contract SpeedComparison
 * invariant: bars scale linearly
 */

export default function TestEssayClient() {
  return (
    <article>
      <h1>The Speed of Everything</h1>
      <p>Let us delve into the fascinating journey of speed through history.</p>
      <p>In today's world, it's important to note that speed affects everything.</p>
      <p>Let's dive into the tapestry of velocity that shapes our universe.</p>
    </article>
  );
}
`);
}

/**
 * Bad fixture: Missing diagram-contract blocks
 */
function createBadEssay_NoDiagramContracts() {
  createKnownGoodEssay();
  
  // Overwrite client component WITHOUT any @diagram-contract blocks
  writeFixture('TestEssayClient.tsx', `'use client';
import React from 'react';

// No diagram contracts here - just raw implementation

function SpeedChart({ data }) {
  return (
    <div>
      {data.map(d => (
        <div key={d.name} style={{ width: d.width }}>
          {d.name}: {d.speed}
        </div>
      ))}
    </div>
  );
}

export default function TestEssayClient() {
  return (
    <article>
      <h1>Velocity</h1>
      <SpeedChart data={[{ name: 'Light', speed: '3e8 m/s', width: '100%' }]} />
    </article>
  );
}
`);
}

/**
 * Bad fixture: Audit report says FAIL but essay still tries to pass
 */
function createBadEssay_FailedAudit() {
  createKnownGoodEssay();
  
  writeFixture('G5.2-DESIGN-FIDELITY-AUDIT.md', `---
gate: G5.2
status: FAIL
score: 35
blocking_issues: 5
---
# Design Fidelity Audit
FAILED — Critical design deviations found.
- Missing color palette
- Typography not implemented
- Animation philosophy ignored
`);
}

/**
 * Bad fixture: No page.tsx at all (missing core artifact)
 */
function createBadEssay_MissingPage() {
  createKnownGoodEssay();
  fs.unlinkSync(path.join(fixtureDir, 'page.tsx'));
}

/**
 * Bad fixture: Rejected publication
 */
function createBadEssay_RejectedPublication() {
  createKnownGoodEssay();
  
  writeFixture('research/PUBLICATION-APPROVAL.md', `---
gate: G9
status: FAIL
decision: REJECTED
---
# Publication Approval
REJECTED — Quality does not meet publication standards.
Reason: Visualizations are incomplete and prose quality is below threshold.
`);
}

// ============================================================================
// TEST SUITES
// ============================================================================

describe('REGRESSION: Known-good essay passes all gates', () => {
  beforeEach(createFixtureDir);
  afterEach(cleanupFixtureDir);

  const criticalGates = ['G5', 'G5.2', 'G5.3', 'G6.6', 'G9'];
  
  for (const gate of criticalGates) {
    it(`known-good essay passes ${gate}`, async () => {
      createKnownGoodEssay();
      const result = await validateGate(gate);
      
      if (!result.pass) {
        const failures = result.results.filter(r => !r.pass);
        const details = failures.map(f => `  ${f.type}: ${f.description || ''} ${f.reason || ''} ${f.missing ? `missing: ${JSON.stringify(f.missing)}` : ''}`).join('\n');
        assert.fail(`${gate} should PASS for known-good essay but FAILED:\n${details}`);
      }
    });
  }
});

describe('REGRESSION: Missing ArtifactDetailWrapper is caught', () => {
  beforeEach(createFixtureDir);
  afterEach(cleanupFixtureDir);

  it('G5 fails when page.tsx lacks ArtifactDetailWrapper', async () => {
    createBadEssay_NoWrapper();
    const result = await validateGate('G5');
    
    assert.equal(result.pass, false, 'G5 should FAIL when ArtifactDetailWrapper is missing');
    
    const wrapperCheck = result.results.find(r => 
      r.type === 'contains_text' && r.missing && r.missing.includes('ArtifactDetailWrapper')
    );
    assert.ok(wrapperCheck, 'Should have a specific contains_text failure for ArtifactDetailWrapper');
    assert.equal(wrapperCheck.pass, false);
  });

  it('G9 fails when page.tsx lacks ArtifactDetailWrapper', async () => {
    createBadEssay_NoWrapper();
    const result = await validateGate('G9');
    
    assert.equal(result.pass, false, 'G9 should catch missing ArtifactDetailWrapper as final safety net');
  });
});

describe('REGRESSION: Emoji anti-pattern is caught', () => {
  beforeEach(createFixtureDir);
  afterEach(cleanupFixtureDir);

  it('G5 fails when client component contains emoji', async () => {
    createBadEssay_Emojis();
    const result = await validateGate('G5');
    
    assert.equal(result.pass, false, 'G5 should FAIL when client has emoji');
    
    const emojiCheck = result.results.find(r => 
      r.type === 'regex_match' && r.regex && r.regex.includes('1F300')
    );
    assert.ok(emojiCheck, 'Should have a regex_match result for emoji detection');
    assert.equal(emojiCheck.pass, false);
    assert.equal(emojiCheck.matched, true, 'Emoji should have been detected');
  });

  it('G6.6 fails when client component contains emoji', async () => {
    createBadEssay_Emojis();
    const result = await validateGate('G6.6');
    
    assert.equal(result.pass, false, 'G6.6 should also catch emoji');
  });
});

describe('REGRESSION: AI slop phrases are caught', () => {
  beforeEach(createFixtureDir);
  afterEach(cleanupFixtureDir);

  it('G6.6 warns on AI slop phrases (delve, tapestry, etc.)', async () => {
    createBadEssay_AISlop();
    const result = await validateGate('G6.6');
    
    // AI slop regex in G6.6 is severity: "warning", so the gate still passes
    // but the warning should be flagged
    const slopCheck = result.results.find(r => 
      r.type === 'regex_match' && r.regex && r.regex.includes('delve')
    );
    assert.ok(slopCheck, 'Should have a regex_match result for AI slop');
    assert.equal(slopCheck.matched, true, 'AI slop patterns should be detected');
    assert.equal(slopCheck.warning, true, 'Should be flagged as a warning');
  });
});

describe('REGRESSION: Missing @diagram-contract blocks are caught', () => {
  beforeEach(createFixtureDir);
  afterEach(cleanupFixtureDir);

  it('G5.3 fails when client component has no @diagram-contract blocks', async () => {
    createBadEssay_NoDiagramContracts();
    const result = await validateGate('G5.3');
    
    assert.equal(result.pass, false, 'G5.3 should FAIL when @diagram-contract blocks are missing');
    
    const contractCheck = result.results.find(r => 
      r.type === 'contains_text' && r.missing && r.missing.includes('@diagram-contract')
    );
    assert.ok(contractCheck, 'Should have a contains_text failure for @diagram-contract');
  });
});

describe('REGRESSION: Failed audit reports block the pipeline', () => {
  beforeEach(createFixtureDir);
  afterEach(cleanupFixtureDir);

  it('G5.2 fails when design fidelity audit has status: FAIL', async () => {
    createBadEssay_FailedAudit();
    const result = await validateGate('G5.2');
    
    assert.equal(result.pass, false, 'G5.2 should FAIL when audit report says FAIL');
    
    const fmCheck = result.results.find(r => r.type === 'frontmatter_status');
    assert.ok(fmCheck, 'Should have frontmatter_status check');
    assert.equal(fmCheck.pass, false, 'frontmatter_status should detect FAIL status');
  });
});

describe('REGRESSION: Missing core artifacts are caught', () => {
  beforeEach(createFixtureDir);
  afterEach(cleanupFixtureDir);

  it('G5 fails when page.tsx is missing entirely', async () => {
    createBadEssay_MissingPage();
    const result = await validateGate('G5');
    
    assert.equal(result.pass, false, 'G5 should FAIL when page.tsx is missing');
    
    const fileCheck = result.results.find(r => r.type === 'file_exists' && !r.pass);
    assert.ok(fileCheck, 'Should have a file_exists failure');
  });
});

describe('REGRESSION: Rejected publications are blocked', () => {
  beforeEach(createFixtureDir);
  afterEach(cleanupFixtureDir);

  it('G9 fails when publication approval is REJECTED', async () => {
    createBadEssay_RejectedPublication();
    const result = await validateGate('G9');
    
    assert.equal(result.pass, false, 'G9 should FAIL when approval is REJECTED');
    
    // Should be caught by either not_contains "REJECTED" or frontmatter_status
    const rejection = result.results.find(r => !r.pass);
    assert.ok(rejection, 'Should have at least one failing check');
  });
});

describe('REGRESSION: not_contains on missing files FAILS (RC-3 fix)', () => {
  beforeEach(createFixtureDir);
  afterEach(cleanupFixtureDir);

  it('not_contains check fails when target audit file is missing', async () => {
    createKnownGoodEssay();
    // Delete the prose quality audit — the not_contains should now FAIL
    const auditPath = path.join(fixtureDir, 'research', 'PROSE-QUALITY-AUDIT.md');
    if (fs.existsSync(auditPath)) {
      fs.unlinkSync(auditPath);
    }
    // Also delete the root-level fallback
    const rootAuditPath = path.join(fixtureDir, 'PROSE-QUALITY-AUDIT.md');
    if (fs.existsSync(rootAuditPath)) {
      fs.unlinkSync(rootAuditPath);
    }
    
    const result = await validateGate('G6.6');
    
    assert.equal(result.pass, false, 'G6.6 should FAIL when audit report is missing entirely');
  });
});

describe('REGRESSION: The original speed-of-everything failures', () => {
  beforeEach(createFixtureDir);
  afterEach(cleanupFixtureDir);

  it('recreates all three original bugs simultaneously and they are all caught', async () => {
    // Recreate the exact combination of bugs from the original essay:
    // 1. No ArtifactDetailWrapper in page.tsx
    // 2. Emoji in client component
    // 3. No @diagram-contract blocks
    
    writeFixture('page.tsx', `
import { Metadata } from 'next';
import TestEssayClient from './TestEssayClient';

export const metadata: Metadata = {
  title: 'The Speed of Everything',
};

export default function Page() {
  return <TestEssayClient />;
}
`);

    writeFixture('TestEssayClient.tsx', `'use client';
import React from 'react';

// No diagram-contract blocks anywhere

export default function TestEssayClient() {
  return (
    <article>
      <h1>Speed of Everything</h1>
      <div>
        <span>🚀 Rocket</span>
        <span>⚡ Lightning</span>
        <span>🌍 Earth Rotation</span>
      </div>
      <p>Let us delve into the fascinating journey of velocity.</p>
    </article>
  );
}
`);

    writeFixture(`${fixtureSlug}.css`, 'body { color: white; }');
    
    // Minimal audit files to not block on file_exists
    writeFixture('G5.2-DESIGN-FIDELITY-AUDIT.md', '---\ngate: G5.2\nstatus: PASS\nscore: 90\nblocking_issues: 0\n---\n# Audit\n');
    writeFixture('DIAGRAM-CODE-RECONCILIATION.md', '---\ngate: G5.3\nstatus: PASS\nscore: 80\nblocking_issues: 0\n---\n# Recon\n');
    writeFixture('research/PROSE-QUALITY-AUDIT.md', '---\ngate: G6.6\nstatus: PASS\n---\n# Prose\n');
    writeFixture('research/PUBLICATION-APPROVAL.md', '---\ngate: G9\nstatus: PASS\n---\n# Approved\n');
    writeFixture('research/CITATIONS.md', '### S1\n- URL: https://example.com/1\n### S2\n- URL: https://example.com/2\n### S3\n- URL: https://example.com/3\n### S4\n- URL: https://example.com/4\n### S5\n- URL: https://example.com/5\n### S6\n- URL: https://example.com/6\n### S7\n- URL: https://example.com/7\n### S8\n- URL: https://example.com/8\n');

    // G5: Should catch missing ArtifactDetailWrapper AND emoji
    const g5Result = await validateGate('G5');
    assert.equal(g5Result.pass, false, 'G5 must fail');
    
    const g5Failures = g5Result.results.filter(r => !r.pass).map(r => r.type);
    assert.ok(
      g5Failures.includes('contains_text') || g5Failures.includes('regex_match'),
      `G5 should fail on contains_text or regex_match, got: ${g5Failures.join(', ')}`
    );

    // G5.3: Should catch missing @diagram-contract blocks
    const g53Result = await validateGate('G5.3');
    assert.equal(g53Result.pass, false, 'G5.3 must fail');
    
    // G6.6: Should catch emoji
    const g66Result = await validateGate('G6.6');
    assert.equal(g66Result.pass, false, 'G6.6 must fail on emoji');

    // G9: Should catch missing ArtifactDetailWrapper
    const g9Result = await validateGate('G9');
    assert.equal(g9Result.pass, false, 'G9 must fail');
  });
});
