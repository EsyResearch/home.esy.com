/**
 * Prompt Packet Generator for Human-in-the-Loop Execution
 */

const fs = require('fs');
const path = require('path');
const { hashString } = require('./hasher');
const { loadContract, getRequiredOutputs, REPO_ROOT } = require('./contract-loader');

const WORKFLOWS_DIR = path.join(__dirname, '..', 'workflows');

/**
 * Load workflow definition
 */
function loadWorkflow(workflowName) {
  const workflowPath = path.join(WORKFLOWS_DIR, `${workflowName}.json`);
  
  if (!fs.existsSync(workflowPath)) {
    throw new Error(`Workflow not found: ${workflowPath}`);
  }
  
  return JSON.parse(fs.readFileSync(workflowPath, 'utf8'));
}

/**
 * Generate prompt packet for a specific gate
 */
function generatePromptPacket(options) {
  const { 
    gateCode, 
    gateDef, 
    runId, 
    slug, 
    artifactPath, 
    depth, 
    originalPrompt,
    attemptNumber
  } = options;
  
  // Load contract to get required outputs
  const contract = loadContract(gateCode);
  const context = { slug, artifact_path: artifactPath, depth };
  const requiredOutputs = getRequiredOutputs(contract, context);
  
  // Format required outputs for display
  const outputsList = requiredOutputs
    .map(o => `  - ${o.pathTemplate}${o.required ? '' : ' (optional)'}`)
    .join('\n');
  
  // Generate gate-specific instructions
  const gateInstructions = getGateInstructions(gateCode, gateDef, { slug, artifactPath, depth });
  
  const promptPacket = `================================================================================
ORCHESTRATION PROMPT PACKET
================================================================================

Run ID:        ${runId}
Gate:          ${gateCode} - ${gateDef.name}
Attempt:       ${attemptNumber}
Slug:          ${slug}
Essay Dir:     ${artifactPath}
Depth:         ${depth}
Agent:         ${gateDef.agent}
Generated:     ${new Date().toISOString()}

================================================================================
ORIGINAL PROMPT / TOPIC
================================================================================

${originalPrompt || '[No prompt file provided]'}

================================================================================
GATE INSTRUCTIONS
================================================================================

${gateInstructions}

================================================================================
REQUIRED OUTPUTS (Contract: ${contract.gate})
================================================================================

This gate will PASS only if ALL required outputs exist and pass validation.

${outputsList}

================================================================================
HOW TO EXECUTE
================================================================================

1. Copy this entire prompt packet
2. Paste into Claude Code
3. Follow the gate instructions above
4. Ensure all required outputs are written to the correct paths
5. When complete, return to the runner terminal and press Enter

================================================================================
VALIDATION WILL CHECK
================================================================================

${getValidationDescription(contract, context)}

================================================================================
END PROMPT PACKET
================================================================================
`;

  return promptPacket;
}

/**
 * Get gate-specific instructions
 */
function getGateInstructions(gateCode, gateDef, context) {
  const { slug, artifactPath, depth } = context;
  
  switch (gateCode) {
    case 'G1':
      return `## G1: Intake Approval

Using @orchestration/agents/orchestrators/visual-essay-orchestrator.md

Execute the INTAKE phase for this visual essay:

Topic/Slug: ${slug}
Depth Mode: ${depth}
Target Directory: ${artifactPath}

Tasks:
1. Review the topic and confirm scope
2. Determine appropriate depth mode (quick/standard/deep)
3. Create the intake approval artifact

Write ONE of these files:
- orchestration/projects/${slug}/INTAKE-APPROVAL.md (project-level)
- OR ${artifactPath}/research/INTAKE.md (essay-level)

The intake document should include:
- Confirmed topic and scope
- Approved depth mode
- Key research questions to explore
- Any special requirements or constraints`;

    case 'G2':
      return `## G2: Research Complete

Using @orchestration/agents/orchestrators/research-orchestrator.md

Execute the RESEARCH phase for this essay:

Topic/Slug: ${slug}
Depth Mode: ${depth}
Target Directory: ${artifactPath}/research/

Tasks:
1. Invoke the Research Orchestrator for depth="${depth}"
2. Detect the essay's domain and research profile
3. Produce a research package appropriate to the profile and depth

Gate requirements (what the validator checks):
- ✅ research/ directory must exist
- ✅ CITATIONS.md OR CLAIMS.md must exist with min ${depth === 'quick' ? '3' : depth === 'standard' ? '8' : '15'} sources
- ✅ At least ${depth === 'quick' ? '1' : depth === 'standard' ? '3' : '6'} markdown files in research/

Two research profiles exist — choose based on domain detection:

HISTORICAL PROFILE (narrative essays — history, biography, origin stories):
  Source-tracking: CITATIONS.md (all sources with verification status)
  Recommended: FIGURES.md, QUOTES.md, TIMELINE.md, VISUALS.md, ERA-GUIDE.md, SYNTHESIS.md

CONCEPTUAL PROFILE (explanatory essays — science, data journalism, how-it-works):
  Source-tracking: CLAIMS.md (verified facts with sources + expert quotes)
  Recommended: CONCEPTS.md, SEQUENCE.md, DEFINITIONS.md, ANALOGIES.md, MISCONCEPTIONS.md
  Data journalism extension: DATASETS.md, STATISTICS.md, COMPARISONS.md, PROJECTIONS.md

Research methodology:
1. Domain detection — determines profile (historical vs conceptual)
2. Source discovery and evaluation (Tier 1-2 preferred, ≥80%)
3. Synthesis and gap analysis
4. Package assembly — produce the source-tracking file + domain-relevant files`;

    case 'G3':
      return `## G3: Spec Approval

Using @orchestration/agents/utilities/visual-essay-invocation-agent.md

Execute the SPEC CONSTRUCTION phase for this visual essay:

Topic/Slug: ${slug}
Depth Mode: ${depth}
Research Location: ${artifactPath}/research/

Tasks:
1. Read the completed research package from ${artifactPath}/research/
2. Build the 6-layer visual essay specification
3. Write spec to: orchestration/skills/visual-essay-invocation/specs/${slug}.md

The spec MUST include these 6 layers:
- ## Layer 1: Strategic Foundation
- ## Layer 2: Technical Systems
- ## Layer 3: Hero Architecture
- ## Layer 4: Chapter Schema
- ## Layer 5: Design System
- ## Layer 6: Implementation Notes

Build spec FROM research (research-first):
- Figure profiles sourced from research/FIGURES.md
- Quotes verified in research/QUOTES.md
- Narrative arc matches research/TIMELINE.md
- No claims from research/GAPS.md appear in spec`;

    case 'G4':
      return `## G4: Design Research

Using @orchestration/agents/research/design-researcher.md

Execute the DESIGN RESEARCH phase for this visual essay:

Topic/Slug: ${slug}
Artifact Path: ${artifactPath}
Spec Location: orchestration/skills/visual-essay-invocation/specs/${slug}.md

Tasks:
1. Read the spec and research package to understand the subject
2. Research the subject's visual history, materials, cultural associations
3. Derive a UNIQUE visual identity from the subject matter itself
4. Produce a comprehensive Design Research Report

Write to: ${artifactPath}/DESIGN-RESEARCH.md

The report MUST include:
- ## Color Palette — derived FROM the subject (with hex codes and subject connection)
- ## Typography — font selections with era/character alignment rationale
- ## Animation Philosophy — motion design matching the subject's nature
- ## Visual Motifs — decorative elements inspired by subject-specific elements
- ## Differentiation Check — how this differs from all previous Esy essays

CRITICAL: The design must be unmistakably tied to THIS subject. Never copy from previous essays.`;

    case 'G4.1':
      return `## G4.1: Design Research Reconciliation

Using @orchestration/agents/auditors/design-research-reconciliation-agent.md

Execute DESIGN RESEARCH RECONCILIATION for this visual essay:

Topic/Slug: ${slug}
Design Research: ${artifactPath}/DESIGN-RESEARCH.md
Spec: orchestration/skills/visual-essay-invocation/specs/${slug}.md

Tasks:
1. Read the DESIGN-RESEARCH.md produced in G4
2. Verify thematic authenticity (design is subject-derived, not generic)
3. Check for cross-essay aesthetic collisions with other Esy essays
4. Verify CSS custom properties can implement the design research
5. Reconcile any issues and update DESIGN-RESEARCH.md

Pass criteria:
- No [UNRECONCILED] markers remain
- No [COLLISION] markers remain
- Design is demonstrably unique to this subject`;

    case 'G4.5':
      return `## G4.5: Image Sourcing

Using @orchestration/agents/research/image-research-licensing-expert.md

Execute IMAGE SOURCING for this visual essay:

Topic/Slug: ${slug}
Artifact Path: ${artifactPath}
Research: ${artifactPath}/research/
Design Research: ${artifactPath}/DESIGN-RESEARCH.md

Tasks:
1. Identify all images needed based on the spec and design research
2. Source images from Wikimedia, Library of Congress, public domain archives
3. Verify licenses for each image (public domain, CC-BY, etc.)
4. Extract URLs and prepare attribution data
5. Produce image sourcing artifact

Write ONE of:
- ${artifactPath}/research/IMAGE_RESEARCH_AUDIT.md (preferred)
- ${artifactPath}/images-migration.json (if using migration format)
- ${artifactPath}/images.ts (if using TypeScript image data)

NOTE: If this essay uses SVG-only illustrations (no external images), produce the audit file noting "SVG-only — no external images required" and this gate passes.`;

    case 'G5':
      return `## G5: Content Complete

Using @orchestration/agents/orchestrators/production-orchestrator.md

Execute CONTENT PRODUCTION for this visual essay:

Topic/Slug: ${slug}
Essay Directory: ${artifactPath}
Spec: orchestration/skills/visual-essay-invocation/specs/${slug}.md
Design Research: ${artifactPath}/DESIGN-RESEARCH.md
Research: ${artifactPath}/research/

Tasks:
1. Invoke the production team:
   - Historian Writer → drafts narrative content
   - Historian Editor → fact-checks all claims
   - UI/UX Designer → refines visual system
   - SVG Illustration Expert → creates visual assets
   - Software Engineer → implements components
   - Immersive Experience Engineer → mobile-native implementation
2. Produce the complete implementation

Required outputs (write to essay directory):
- ${artifactPath}/page.tsx (Next.js page with metadata)
- ${artifactPath}/[Name]Client.tsx or [Name]Client.jsx (main client component)
- ${artifactPath}/${slug}.css (story-specific styles)

The implementation must:
- Follow the 6-layer spec exactly
- Use the design research color palette and typography
- Include all sections from the spec
- Be mobile-first and responsive
- Include Sources & Further Reading section
- Wrap the essay in ArtifactDetailWrapper from @/components/ArtifactDetail
  with an ESSAY_META object containing: title, subtitle, category, subcategory,
  readTime, sourceCount, sourceTier, sectionCount, visualizationCount,
  designSystem, published, model, template, palette, visualizations, keySources`;

    case 'G5.2':
      return `## G5.2: Design Fidelity Audit

Using @orchestration/agents/auditors/design-research-implementation-auditor.md

Execute DESIGN FIDELITY AUDIT for this visual essay:

Topic/Slug: ${slug}
Essay Directory: ${artifactPath}
Design Research (PRIMARY): ${artifactPath}/DESIGN-RESEARCH.md
Invocation Spec (STRUCTURAL): orchestration/skills/visual-essay-invocation/specs/${slug}.md
CSS File: ${artifactPath}/${slug}.css
Implementation: ${artifactPath}/page.tsx

Tasks:
1. Load DESIGN-RESEARCH.md as the PRIMARY design authority
2. Load invocation spec as the STRUCTURAL authority (component requirements)
3. Extract all design tokens from DESIGN-RESEARCH.md (colors, typography, spacing, animations)
4. Extract all implemented values from CSS and TSX/JSX files
5. Compare every token: spec value vs. implemented value
6. For data journalism essays: verify visualization styling uses essay design tokens
7. Classify all deviations (Critical, Major, Minor, Intentional Departure)
8. Produce G5.2-DESIGN-FIDELITY-AUDIT.md with YAML frontmatter header

Required output:
- ${artifactPath}/research/G5.2-DESIGN-FIDELITY-AUDIT.md

The audit report MUST include:
- YAML frontmatter with gate, status, score, threshold (85), blocking_issues, warning_issues
- Per-category compliance scores (Typography, Color, Spacing, Interactions, Components)
- For data journalism: Data Visualization Fidelity score
- All deviations with severity, location, and fix recommendation
- Overall compliance percentage

Pass criteria:
- CSS custom properties implement design research tokens
- className values in TSX have corresponding CSS selectors
- No orphan CSS selectors (defined but never used)
- No orphan classNames (used but never defined)`;

    case 'G5.5':
      return `## G5.5: Bibliography Implementation

Using @orchestration/agents/orchestrators/bibliography-orchestrator.md

Execute BIBLIOGRAPHY IMPLEMENTATION for this visual essay:

Topic/Slug: ${slug}
Artifact Path: ${artifactPath}
Research: ${artifactPath}/research/

Tasks:
1. Implement the complete bibliography section in the essay:
   - Works Cited — all textual sources
   - Image Credits — all image attributions with licenses
   - A/V Credits — any audio/video sources (if applicable)
   - Data Sources — any datasets used (if applicable)
2. Ensure inline citations sync with the bibliography
3. Verify all sources from research/CITATIONS.md or research/CLAIMS.md are represented
4. Produce the bibliography audit report

Write to: ${artifactPath}/research/CONTENT-BIBLIOGRAPHY-AUDIT.md

See: docs/artifact-patterns-guide/BIBLIOGRAPHY_STRUCTURE_GUIDE.md
See: docs/artifact-patterns-guide/ARTIFACT_CITATION_PATTERNS_GUIDE.md`;

    case 'G6':
      return `## G6: Citation Audit

Using @orchestration/agents/auditors/citation-audit-agent.md

Execute CITATION AUDIT for this visual essay:

Topic/Slug: ${slug}
Artifact Path: ${artifactPath}
Research: ${artifactPath}/research/

Source-tracking file: CITATIONS.md (historical essays) OR CLAIMS.md (conceptual essays)
— Check which file exists in the research directory and use it as the source of truth.

Tasks:
1. Identify the source-tracking file (CITATIONS.md or CLAIMS.md)
2. Map every factual claim in the essay to a source in the research package
3. Verify source tier distribution (must be 80%+ Tier 1-2)
4. Authenticate all quotes (verify exact wording against sources)
5. Check all URLs/links for health (functional or archived)
6. Verify content matches research package (no orphan claims)
7. Produce Citation Certification (Approved/Rejected)

Write to: ${artifactPath}/research/CITATION-AUDIT.md

The audit report must include:
- Source-tracking file used (CITATIONS.md or CLAIMS.md)
- Claim-citation mapping
- Source tier analysis
- Link integrity report
- Quote verification status
- Gap analysis (uncited claims)
- Citation Certification status`;

    case 'G7':
      return `## G7: Scroll Certification

Using @orchestration/agents/auditors/immersive-scrolling-auditor.md

Execute SCROLL CERTIFICATION for this visual essay:

Topic/Slug: ${slug}
Artifact Path: ${artifactPath}

Tasks:
1. Audit scroll-lock behavior (all sticky sections work correctly)
2. Test animation performance (60fps target on mobile)
3. Verify Mobile Safari compatibility
4. Test touch interactions (44px+ targets, thumb-friendly)
5. Check safe areas and viewport handling
6. Produce certification with score (must be ≥8.0/10 to pass)

Write to: ${artifactPath}/research/SCROLL-CERTIFICATION.md

Pass criteria:
- Overall score ≥ 8.0/10
- No Tier 1 failures (blocking issues)
- 60fps confirmed on mobile
- Mobile Safari verified
- Touch targets ≥ 44px`;

    case 'G8':
      return `## G8: Publication Certification

Using @orchestration/agents/orchestrators/publish-artifact-orchestrator.md

Execute PRE-PUBLICATION CERTIFICATION for this visual essay:

Topic/Slug: ${slug}
Artifact Path: ${artifactPath}

Tasks:
1. Run all domain audits in parallel:
   - Bibliography Orchestrator (audit mode) — verify bibliography completeness
   - Audit Orchestrator — quality domains (scroll, experience, visual, content, hydration, spec)
   - Social Media Meta Expert — verify OG/Twitter meta tags
   - SEO Audit Agent — search optimization check
   - Gate Guard Auditor — verify G1-G7 all passed
2. If issues found → invoke QA Remediation Orchestrator (max 2 iterations)
3. Produce certification: GO / CONDITIONAL / NO-GO

Write to: ${artifactPath}/research/PUBLICATION-CERTIFICATION.md

Status meanings:
- GO: All audits pass, no blocking issues → proceed to G9
- CONDITIONAL: Minor issues (🟡/🟢) only → proceed with documented conditions
- NO-GO: Blocking issues (🔴) remain → return to remediation`;

    case 'G9':
      return `## G9: Publication Approval

Using @orchestration/agents/orchestrators/visual-essay-orchestrator.md

Execute FINAL PUBLICATION APPROVAL for this visual essay:

Topic/Slug: ${slug}
Artifact Path: ${artifactPath}

Tasks:
1. Review the complete package:
   - All gates G1-G8 must be PASSED
   - Publication Certification must be GO or CONDITIONAL
2. Verify visualEssays.ts is updated:
   - New entry added with isNew: true
   - New story set as isFeatured: true
   - Previous featured story unfeatured
3. Verify page.tsx wraps essay in ArtifactDetailWrapper from @/components/ArtifactDetail
4. Director sign-off
5. Trigger deployment

Write to: ${artifactPath}/research/PUBLICATION-APPROVAL.md

This is the final human gate. The essay will be published to esy.com/essays/ after this approval.`;

    default:
      return `## ${gateCode}: ${gateDef.name}

Using @orchestration/agents/${gateDef.agent}.md

Execute this gate for:
- Slug: ${slug}
- Depth: ${depth}
- Artifact Path: ${artifactPath}

Refer to the contract for specific requirements.`;
  }
}

/**
 * Get validation description for display
 */
function getValidationDescription(contract, context) {
  const descriptions = [];
  
  if (contract.validations) {
    for (const v of contract.validations) {
      switch (v.type) {
        case 'file_exists':
          descriptions.push('- All required files must exist');
          break;
        case 'min_sources':
          const threshold = v.thresholds[context.depth] || v.thresholds['standard'];
          descriptions.push(`- Source-tracking file (CITATIONS.md or CLAIMS.md) must contain at least ${threshold} sources (depth: ${context.depth})`);
          break;
        case 'min_sources_any_of':
          const anyOfThreshold = v.thresholds[context.depth] || v.thresholds['standard'];
          descriptions.push(`- CITATIONS.md or CLAIMS.md must contain at least ${anyOfThreshold} sources (depth: ${context.depth})`);
          break;
        case 'contains_headings':
          descriptions.push(`- Spec must contain layer headings: ${v.required_headings.join(', ')}`);
          break;
        case 'not_contains':
          if (v.severity === 'warning') {
            descriptions.push(`- Warning if contains: ${v.pattern}`);
          } else {
            descriptions.push(`- Must NOT contain: ${v.pattern}`);
          }
          break;
      }
    }
  }
  
  return descriptions.length > 0 ? descriptions.join('\n') : '- File existence checks only';
}

/**
 * Write prompt packet to logs directory
 */
function writePromptPacket(runPaths, gateCode, promptContent) {
  const gateLogsDir = path.join(runPaths.logsDir, 'gates', gateCode);
  fs.mkdirSync(gateLogsDir, { recursive: true });
  
  const promptPath = path.join(gateLogsDir, 'prompt.txt');
  fs.writeFileSync(promptPath, promptContent);
  
  return promptPath;
}

/**
 * Save original prompt file to logs
 */
function saveOriginalPrompt(runPaths, promptContent) {
  const promptsDir = path.join(runPaths.logsDir, 'prompts');
  fs.mkdirSync(promptsDir, { recursive: true });
  
  const originalPath = path.join(promptsDir, 'original.txt');
  fs.writeFileSync(originalPath, promptContent);
  
  return originalPath;
}

/**
 * Read prompt file content
 */
function readPromptFile(promptFilePath) {
  if (!promptFilePath) return null;
  
  const absolutePath = path.isAbsolute(promptFilePath) 
    ? promptFilePath 
    : path.join(REPO_ROOT, promptFilePath);
  
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Prompt file not found: ${absolutePath}`);
  }
  
  return fs.readFileSync(absolutePath, 'utf8');
}

module.exports = {
  loadWorkflow,
  generatePromptPacket,
  writePromptPacket,
  saveOriginalPrompt,
  readPromptFile,
  hashString,
  WORKFLOWS_DIR
};
