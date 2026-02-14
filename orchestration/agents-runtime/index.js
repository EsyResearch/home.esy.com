/**
 * agents-runtime — Esy's agent execution engine
 * 
 * This is the public API for the runtime. Both the CLI (runner/cli.js) and
 * the future web server (app.esy.com) import from here.
 * 
 * Usage:
 * 
 *   const { executeGate, executeWorkflow } = require('./orchestration/agents-runtime');
 * 
 *   // Execute a single gate
 *   const result = await executeGate({
 *     gateCode: 'G5',
 *     gateName: 'Content Complete',
 *     agentName: 'production-orchestrator',
 *     slug: 'the-speed-of-everything',
 *     artifactPath: 'src/app/essays/the-speed-of-everything/',
 *     projectRoot: '/absolute/path/to/project',
 *     onEvent: (event) => console.log(event)
 *   });
 * 
 *   // Execute an entire workflow
 *   const workflowResult = await executeWorkflow({
 *     workflowName: 'visual-essay',
 *     slug: 'the-speed-of-everything',
 *     artifactPath: 'src/app/essays/the-speed-of-everything/',
 *     projectRoot: '/absolute/path/to/project',
 *     onEvent: (event) => ws.send(JSON.stringify(event)),
 *     onGateComplete: (gate, result) => {
 *       // Return false to abort the workflow
 *       if (!result.completed) return false;
 *       return true;
 *     }
 *   });
 */

const { executeGate, executeWorkflow, getGateConfig, loadRoutingTable } = require('./executor');
const { compileAgent, findAgentFile, listAgents } = require('./agent-compiler');
const { getToolDefinitions, executeTool } = require('./tools');
const { sendMessage, streamMessage, sendMessageWithRetry } = require('./adapters/claude');

module.exports = {
  // Core execution
  executeGate,
  executeWorkflow,

  // Configuration
  getGateConfig,
  loadRoutingTable,

  // Agent compilation
  compileAgent,
  findAgentFile,
  listAgents,

  // Tools
  getToolDefinitions,
  executeTool,

  // Low-level adapter (for custom integrations)
  sendMessage,
  streamMessage,
  sendMessageWithRetry
};
