/**
 * Agent Compiler — converts agent .md files into Claude system prompts
 * 
 * The agent definition files in orchestration/agents/ are rich Markdown documents
 * with role definitions, expertise areas, writing standards, etc.
 * 
 * This module:
 *   1. Locates the agent .md file by name
 *   2. Reads and parses it
 *   3. Compiles it into a structured system prompt for the Claude API
 *   4. Injects gate-specific context (contract requirements, prior artifacts, etc.)
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const AGENTS_DIR = path.join(REPO_ROOT, 'orchestration', 'agents');

/**
 * Agent search paths (in priority order).
 * The agent registry can organize agents by category.
 */
const AGENT_SEARCH_PATHS = [
  AGENTS_DIR,
  path.join(AGENTS_DIR, 'orchestrators'),
  path.join(AGENTS_DIR, 'auditors'),
  path.join(AGENTS_DIR, 'content'),
  path.join(AGENTS_DIR, 'engineering'),
  path.join(AGENTS_DIR, 'research'),
  path.join(AGENTS_DIR, 'specialists'),
  path.join(AGENTS_DIR, 'utilities'),
  path.join(AGENTS_DIR, 'regional')
];

/**
 * Find an agent .md file by name.
 * 
 * @param {string} agentName - Agent identifier (e.g., 'production-orchestrator')
 * @returns {string|null} Absolute path to the agent file, or null if not found
 */
function findAgentFile(agentName) {
  // Try exact filename match first
  for (const searchDir of AGENT_SEARCH_PATHS) {
    if (!fs.existsSync(searchDir)) continue;
    
    const candidate = path.join(searchDir, `${agentName}.md`);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  
  // Try recursive search (for deeply nested agents)
  function searchDir(dir) {
    if (!fs.existsSync(dir)) return null;
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === `${agentName}.md` && entry.isFile()) {
        return path.join(dir, entry.name);
      }
      if (entry.isDirectory() && !entry.name.startsWith('_') && !entry.name.startsWith('.')) {
        const found = searchDir(path.join(dir, entry.name));
        if (found) return found;
      }
    }
    return null;
  }
  
  return searchDir(AGENTS_DIR);
}

/**
 * Compile an agent .md file into a system prompt.
 * 
 * @param {string} agentName - Agent identifier
 * @param {Object} [gateContext] - Optional gate-specific context to inject
 * @param {string} [gateContext.gateCode] - e.g., 'G5'
 * @param {string} [gateContext.gateName] - e.g., 'Content Complete'
 * @param {string} [gateContext.slug] - e.g., 'the-speed-of-everything'
 * @param {string} [gateContext.artifactPath] - e.g., 'src/app/essays/the-speed-of-everything/'
 * @param {string[]} [gateContext.requiredOutputs] - List of files the agent must produce
 * @param {string} [gateContext.priorArtifactsSummary] - Summary of prior gate outputs
 * @param {string} [gateContext.contractRequirements] - Human-readable contract requirements
 * @returns {string} Compiled system prompt
 */
function compileAgent(agentName, gateContext = {}) {
  const agentFile = findAgentFile(agentName);
  
  if (!agentFile) {
    throw new Error(
      `Agent not found: "${agentName}". Searched in:\n${AGENT_SEARCH_PATHS.map(p => `  - ${p}`).join('\n')}`
    );
  }

  const agentMarkdown = fs.readFileSync(agentFile, 'utf8');

  // Build the system prompt
  const sections = [];

  // 1. Agent identity (the .md file itself)
  sections.push(agentMarkdown);

  // 2. Gate context (injected dynamically)
  if (gateContext.gateCode) {
    sections.push(buildGateContext(gateContext));
  }

  // 3. Tool usage instructions
  sections.push(buildToolInstructions());

  // 4. Output constraints
  sections.push(buildOutputConstraints());

  return sections.join('\n\n---\n\n');
}

/**
 * Build the gate-specific context section.
 */
function buildGateContext(ctx) {
  const lines = ['## Current Gate Assignment\n'];
  
  if (ctx.gateCode && ctx.gateName) {
    lines.push(`**Gate:** ${ctx.gateCode} — ${ctx.gateName}`);
  }
  
  if (ctx.slug) {
    lines.push(`**Essay slug:** ${ctx.slug}`);
  }
  
  if (ctx.artifactPath) {
    lines.push(`**Artifact path:** ${ctx.artifactPath}`);
  }

  if (ctx.requiredOutputs && ctx.requiredOutputs.length > 0) {
    lines.push('\n### Required Outputs\n');
    lines.push('You MUST produce the following files:\n');
    for (const output of ctx.requiredOutputs) {
      lines.push(`- \`${output}\``);
    }
  }

  if (ctx.contractRequirements) {
    lines.push('\n### Contract Requirements\n');
    lines.push(ctx.contractRequirements);
  }

  if (ctx.priorArtifactsSummary) {
    lines.push('\n### Prior Artifacts Available\n');
    lines.push(ctx.priorArtifactsSummary);
  }

  return lines.join('\n');
}

/**
 * Build tool usage instructions for the agent.
 */
function buildToolInstructions() {
  return `## Tool Usage

You have access to the following tools:

- **read_file**: Read files ONLY within this essay's own directory and orchestration config. You can read your own prior artifacts (research, design research, spec) and orchestration standards/contracts. You CANNOT and MUST NOT read any other essay's files.
- **write_file**: Write content to a file. Use this to produce your required outputs — components, CSS, markdown reports, etc.
- **list_directory**: List files in a directory. Use this to explore the essay directory and orchestration structure.

### Critical Rules

1. **NEVER read other essays.** Each essay must have a unique design derived from its own subject matter. You do NOT have access to other essay directories.
2. **Read orchestration standards** to understand quality requirements, contracts, and templates.
3. **Write complete files.** Never write partial files or placeholder content.
4. **Be direct.** Read what you need, then write your outputs. Do not spend rounds exploring.
5. **Verify your work.** After writing, consider reading the file back to confirm it was written correctly.`;
}

/**
 * Build output quality constraints.
 */
function buildOutputConstraints() {
  return `## Output Constraints

- **No emoji** in prose or code. Use SVG icons or CSS-only decorative elements.
- **No placeholder content.** Every section must contain real, substantive content.
- **No "AI slop"** — avoid clichés like "delve into", "tapestry of", "it's important to note that".
- **All visualizations must have @diagram-contract blocks** in JSDoc comments.
- **All essays must use ArtifactDetailWrapper** from @/components/ArtifactDetail/.
- **All CSS must derive from DESIGN-RESEARCH.md** — never use generic color schemes.
- **Every factual claim must trace to a citation** in CITATIONS.md or the research package.

## CRITICAL: YAML Frontmatter Required on All Markdown Reports

Every .md audit report you produce MUST begin with a YAML frontmatter block. This is non-negotiable — the pipeline validator parses it programmatically.

\`\`\`
---
status: PASS
gate: G{x}
date: {YYYY-MM-DD}
---
\`\`\`

Valid status values: PASS, CONDITIONAL, FAIL
- Use PASS if all checks clear
- Use CONDITIONAL if there are non-blocking issues
- Use FAIL if there are blocking defects

The frontmatter MUST be the very first thing in the file — no blank lines before it, no heading before it. The validator will reject files without valid YAML frontmatter.`;
}

/**
 * List all available agents.
 * 
 * @returns {Array<{name: string, path: string, category: string}>}
 */
function listAgents() {
  const agents = [];
  
  function scan(dir, category) {
    if (!fs.existsSync(dir)) return;
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('README') && !entry.name.startsWith('META')) {
        agents.push({
          name: entry.name.replace('.md', ''),
          path: path.join(dir, entry.name),
          category
        });
      }
      if (entry.isDirectory() && !entry.name.startsWith('_') && !entry.name.startsWith('.')) {
        scan(path.join(dir, entry.name), entry.name);
      }
    }
  }
  
  scan(AGENTS_DIR, 'root');
  return agents;
}

module.exports = {
  findAgentFile,
  compileAgent,
  listAgents,
  AGENTS_DIR,
  REPO_ROOT
};
