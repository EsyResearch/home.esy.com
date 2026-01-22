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
Artifact Path: ${artifactPath}
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

Execute the RESEARCH phase for this visual essay:

Topic/Slug: ${slug}
Depth Mode: ${depth}
Target Directory: ${artifactPath}/research/

Tasks:
1. Invoke the Research Orchestrator for depth="${depth}"
2. Produce the complete research package

Required research artifacts (write to ${artifactPath}/research/):
- CITATIONS.md    → All sources with verification status (min ${depth === 'quick' ? '3' : depth === 'standard' ? '8' : '15'} sources)
- SYNTHESIS.md    → Key findings synthesis${depth === 'quick' ? ' (optional for quick)' : ''}
- FIGURES.md      → 5-15 figures with imagery availability
- QUOTES.md       → 10+ verified quotes with sources
- TIMELINE.md     → Chronological events mapping
- VISUALS.md      → Archive/visual sources identification

Research methodology:
1. Domain detection (History, Science, Culinary, etc.)
2. Source discovery and evaluation (Tier 1-2 preferred)
3. Synthesis and gap analysis
4. Package assembly`;

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
          descriptions.push(`- CITATIONS.md must contain at least ${threshold} sources (depth: ${context.depth})`);
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
