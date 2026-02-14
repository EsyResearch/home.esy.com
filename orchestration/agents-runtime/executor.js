/**
 * Gate Executor — the agentic loop that drives a single gate to completion
 * 
 * This is the core of agents-runtime. It:
 *   1. Loads the routing config for the gate
 *   2. Compiles the agent into a system prompt
 *   3. Runs the tool-use loop: call Claude → process tool calls → call again
 *   4. Tracks token usage against budget caps
 *   5. Emits events for real-time progress (CLI, WebSocket, SSE)
 *   6. Returns a structured result with all artifacts and usage data
 * 
 * Design principles:
 *   - The executor is a LIBRARY, not a CLI tool
 *   - Stateless: all state passed in, all state returned
 *   - Event-driven: consumers subscribe to events for UI
 *   - Budget-enforced: hard caps prevent runaway loops
 */

const { sendMessageWithRetry, extractText, extractToolCalls, needsToolExecution } = require('./adapters/claude');
const { getToolDefinitions, executeTool } = require('./tools');
const { compileAgent } = require('./agent-compiler');
const { EventEmitter } = require('events');
const fs = require('fs');
const path = require('path');

const ROUTING_TABLE_PATH = path.join(__dirname, 'routing-table.json');

/**
 * Load the routing table.
 * @returns {Object}
 */
function loadRoutingTable() {
  return JSON.parse(fs.readFileSync(ROUTING_TABLE_PATH, 'utf8'));
}

/**
 * Get the routing config for a specific gate, merged with defaults.
 * 
 * @param {string} gateCode - e.g., 'G5'
 * @param {Object} [routingTable] - Pre-loaded routing table (loaded if not provided)
 * @returns {Object} Merged gate config
 */
function getGateConfig(gateCode, routingTable) {
  const table = routingTable || loadRoutingTable();
  const defaults = table.defaults || {};
  const gateConfig = table.gates?.[gateCode] || {};
  
  return {
    model: gateConfig.model || defaults.model || 'claude-sonnet-4-5',
    max_input_tokens: gateConfig.max_input_tokens || defaults.max_input_tokens || 80000,
    max_output_tokens: gateConfig.max_output_tokens || defaults.max_output_tokens || 20000,
    max_tool_rounds: gateConfig.max_tool_rounds || defaults.max_tool_rounds || 8,
    temperature: gateConfig.temperature ?? defaults.temperature ?? 0.7,
    tools: gateConfig.tools || defaults.tools || ['read_file', 'write_file', 'list_directory'],
    rationale: gateConfig.rationale || ''
  };
}

/**
 * @typedef {Object} ExecuteGateOptions
 * @property {string} gateCode - Gate identifier (e.g., 'G5')
 * @property {string} gateName - Human-readable name (e.g., 'Content Complete')
 * @property {string} agentName - Agent to invoke (e.g., 'production-orchestrator')
 * @property {string} slug - Essay slug
 * @property {string} artifactPath - Path to essay directory (relative to project root)
 * @property {string} projectRoot - Absolute path to project root
 * @property {string[]} [requiredOutputs] - Files the agent must produce
 * @property {string} [contractRequirements] - Human-readable contract requirements
 * @property {string} [priorArtifactsSummary] - Summary of prior gate outputs
 * @property {string} [userMessage] - Initial user message (overrides default)
 * @property {Object} [routingOverrides] - Override routing table values
 * @property {Function} [onEvent] - Event callback: (event) => void
 */

/**
 * @typedef {Object} ExecuteGateResult
 * @property {boolean} completed - Whether the gate ran to completion
 * @property {string} stopReason - Why execution stopped ('complete', 'budget_exceeded', 'max_rounds', 'error')
 * @property {Array} messages - Full conversation history
 * @property {string} finalText - Last text response from the agent
 * @property {Object} usage - Token usage { total_input, total_output, rounds }
 * @property {Object} budget - Budget status { input_remaining, output_remaining, rounds_remaining }
 * @property {Array} toolCalls - All tool calls made during execution
 * @property {Array} filesWritten - Files created/modified by the agent
 * @property {number} durationMs - Total execution time
 * @property {string} model - Model that was used
 */

/**
 * Execute a single gate using the agentic tool-use loop.
 * 
 * @param {ExecuteGateOptions} options
 * @returns {Promise<ExecuteGateResult>}
 */
async function executeGate(options) {
  const {
    gateCode,
    gateName,
    agentName,
    slug,
    artifactPath,
    projectRoot,
    requiredOutputs = [],
    contractRequirements = '',
    priorArtifactsSummary = '',
    userMessage,
    routingOverrides = {},
    onEvent = () => {}
  } = options;

  const startTime = Date.now();

  // 1. Load routing config
  const routingTable = loadRoutingTable();
  const gateConfig = getGateConfig(gateCode, routingTable);
  
  // Apply overrides
  const config = { ...gateConfig, ...routingOverrides };

  onEvent({
    type: 'gate:config',
    gateCode,
    model: config.model,
    maxToolRounds: config.max_tool_rounds,
    temperature: config.temperature
  });

  // 2. Compile agent into system prompt
  let systemPrompt;
  try {
    systemPrompt = compileAgent(agentName, {
      gateCode,
      gateName,
      slug,
      artifactPath,
      requiredOutputs,
      contractRequirements,
      priorArtifactsSummary
    });
  } catch (err) {
    onEvent({ type: 'gate:error', error: `Agent compilation failed: ${err.message}` });
    return {
      completed: false,
      stopReason: 'error',
      messages: [],
      finalText: '',
      usage: { total_input: 0, total_output: 0, rounds: 0 },
      budget: { input_remaining: config.max_input_tokens, output_remaining: config.max_output_tokens, rounds_remaining: config.max_tool_rounds },
      toolCalls: [],
      filesWritten: [],
      durationMs: Date.now() - startTime,
      model: config.model,
      error: err.message
    };
  }

  onEvent({ type: 'gate:start', gateCode, gateName, agentName, model: config.model });

  // 3. Build initial user message
  const initialMessage = userMessage || buildDefaultUserMessage({
    gateCode, gateName, slug, artifactPath, requiredOutputs
  });

  // 4. Initialize conversation state
  const messages = [{ role: 'user', content: initialMessage }];
  const toolDefinitions = getToolDefinitions(config.tools);
  const toolContext = {
    projectRoot,
    allowedPaths: [artifactPath, 'orchestration/', 'package.json', 'tsconfig.json', 'src/components/', 'src/data/', 'docs/']
  };

  // 5. Track usage
  const usage = { total_input: 0, total_output: 0, rounds: 0 };
  const allToolCalls = [];
  const filesWritten = [];
  let finalText = '';
  let stopReason = 'complete';

  // 6. Agentic loop
  while (usage.rounds < config.max_tool_rounds) {
    usage.rounds++;

    onEvent({
      type: 'round:start',
      round: usage.rounds,
      maxRounds: config.max_tool_rounds,
      inputTokensSoFar: usage.total_input,
      outputTokensSoFar: usage.total_output
    });

    // Call Claude
    let response;
    try {
      response = await sendMessageWithRetry({
        model: config.model,
        system: systemPrompt,
        messages,
        tools: toolDefinitions,
        maxTokens: Math.min(
          16000,  // Per-call cap: keep individual responses focused
          config.model.includes('opus') ? 32000 : 16000
        ),
        temperature: config.temperature
      });
    } catch (err) {
      onEvent({ type: 'round:error', round: usage.rounds, error: err.message });
      stopReason = 'error';
      break;
    }

    // Update usage
    usage.total_input += response.usage.input_tokens;
    usage.total_output += response.usage.output_tokens;

    onEvent({
      type: 'round:response',
      round: usage.rounds,
      stopReason: response.stopReason,
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
      totalInput: usage.total_input,
      totalOutput: usage.total_output
    });

    // Check budget
    if (usage.total_input > config.max_input_tokens) {
      onEvent({ type: 'budget:exceeded', metric: 'input_tokens', used: usage.total_input, limit: config.max_input_tokens });
      stopReason = 'budget_exceeded';
      break;
    }
    if (usage.total_output > config.max_output_tokens) {
      onEvent({ type: 'budget:exceeded', metric: 'output_tokens', used: usage.total_output, limit: config.max_output_tokens });
      stopReason = 'budget_exceeded';
      break;
    }

    // Extract text from response
    const textContent = extractText(response.content);
    if (textContent) {
      finalText = textContent;
    }

    // Check if we need to process tool calls
    if (!needsToolExecution(response.stopReason)) {
      // Agent is done — no more tool calls
      messages.push({ role: 'assistant', content: response.content });
      stopReason = 'complete';
      break;
    }

    // Process tool calls
    const toolCalls = extractToolCalls(response.content);
    
    // Add assistant message (with tool_use blocks)
    messages.push({ role: 'assistant', content: response.content });

    // Execute each tool and collect results
    const toolResults = [];
    
    for (const toolCall of toolCalls) {
      onEvent({
        type: 'tool:call',
        round: usage.rounds,
        tool: toolCall.name,
        input: toolCall.input
      });

      const result = executeTool(toolCall.name, toolCall.input, toolContext);

      onEvent({
        type: 'tool:result',
        round: usage.rounds,
        tool: toolCall.name,
        success: result.success,
        error: result.error || null
      });

      // Track tool calls
      allToolCalls.push({
        round: usage.rounds,
        tool: toolCall.name,
        input: toolCall.input,
        success: result.success,
        error: result.error || null
      });

      // Track files written
      if (toolCall.name === 'write_file' && result.success) {
        filesWritten.push({
          path: toolCall.input.path,
          bytesWritten: result.bytesWritten,
          round: usage.rounds
        });
      }

      // Format tool result for Claude
      const toolResultContent = result.success
        ? (result.content || result.entries 
            ? JSON.stringify(result.entries || result.content) 
            : `Success. ${result.bytesWritten ? `${result.bytesWritten} bytes written.` : ''}`)
        : `Error: ${result.error}`;

      toolResults.push({
        type: 'tool_result',
        tool_use_id: toolCall.id,
        content: toolResultContent
      });
    }

    // Add tool results as user message
    messages.push({ role: 'user', content: toolResults });
  }

  // Check if we hit max rounds
  if (usage.rounds >= config.max_tool_rounds && stopReason === 'complete') {
    // Only override if we're still in the loop (not if we broke out early)
    if (needsToolExecution(messages[messages.length - 1]?.content?.[0]?.type === 'tool_result' ? 'tool_use' : 'end_turn')) {
      stopReason = 'max_rounds';
    }
  }

  const durationMs = Date.now() - startTime;

  onEvent({
    type: 'gate:complete',
    gateCode,
    stopReason,
    totalInput: usage.total_input,
    totalOutput: usage.total_output,
    rounds: usage.rounds,
    filesWritten: filesWritten.length,
    durationMs
  });

  return {
    completed: stopReason === 'complete',
    stopReason,
    messages,
    finalText,
    usage,
    budget: {
      input_remaining: config.max_input_tokens - usage.total_input,
      output_remaining: config.max_output_tokens - usage.total_output,
      rounds_remaining: config.max_tool_rounds - usage.rounds
    },
    toolCalls: allToolCalls,
    filesWritten,
    durationMs,
    model: config.model
  };
}

/**
 * Build the default initial user message for a gate.
 */
function buildDefaultUserMessage(ctx) {
  const lines = [
    `Execute gate ${ctx.gateCode} (${ctx.gateName}) for essay "${ctx.slug}".`,
    '',
    `The essay artifacts are located at: ${ctx.artifactPath}`,
    '',
    'Instructions:',
    '1. List the essay directory to see what exists already.',
    '2. Read any prior artifacts in the essay directory that inform this gate.',
    '3. Produce ALL required output files. Write complete, production-quality content.',
    '4. Do NOT read other essays. This essay must have a unique design.',
    '5. Be direct — minimize exploration rounds, maximize writing.'
  ];

  if (ctx.requiredOutputs && ctx.requiredOutputs.length > 0) {
    lines.push('', 'Required output files:');
    for (const output of ctx.requiredOutputs) {
      lines.push(`  - ${output}`);
    }
  }

  return lines.join('\n');
}

/**
 * Execute an entire workflow (all gates in sequence).
 * 
 * @param {Object} options
 * @param {string} options.workflowName - Workflow identifier
 * @param {string} options.slug - Essay slug
 * @param {string} options.artifactPath - Path to essay directory
 * @param {string} options.projectRoot - Absolute path to project root
 * @param {Function} [options.onEvent] - Event callback
 * @param {Function} [options.onGateComplete] - Called after each gate with result. Return false to abort.
 * @returns {Promise<Object>} Workflow result with per-gate results
 */
async function executeWorkflow(options) {
  const {
    workflowName,
    slug,
    artifactPath,
    projectRoot,
    onEvent = () => {},
    onGateComplete = () => true
  } = options;

  // Load workflow definition
  const workflowPath = path.join(projectRoot, 'orchestration', 'runner', 'workflows', `${workflowName}.json`);
  if (!fs.existsSync(workflowPath)) {
    throw new Error(`Workflow not found: ${workflowPath}`);
  }
  const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

  const routingTable = loadRoutingTable();
  const startTime = Date.now();
  const results = {};
  const totalUsage = { total_input: 0, total_output: 0, rounds: 0 };

  onEvent({ type: 'workflow:start', workflow: workflowName, slug, gates: workflow.gates.length });

  for (const gateDef of workflow.gates) {
    onEvent({ type: 'workflow:gate_queued', gate: gateDef.gate, name: gateDef.name });

    // Load contract to get required outputs
    let requiredOutputs = [];
    let contractRequirements = '';
    try {
      const { loadContract, getRequiredOutputs } = require('../runner/lib/contract-loader');
      const contract = loadContract(gateDef.gate);
      const context = { slug, artifact_path: artifactPath };
      const outputs = getRequiredOutputs(contract, context);
      requiredOutputs = outputs.map(o => o.pathTemplate);
      
      // Build human-readable requirements from contract
      if (contract.validations) {
        contractRequirements = contract.validations
          .map(v => `- ${v.type}: ${JSON.stringify(v)}`)
          .join('\n');
      }
    } catch (err) {
      // Contract not found — proceed without it
      onEvent({ type: 'workflow:warning', gate: gateDef.gate, message: `Could not load contract: ${err.message}` });
    }

    // Execute the gate
    const gateResult = await executeGate({
      gateCode: gateDef.gate,
      gateName: gateDef.name,
      agentName: gateDef.agent,
      slug,
      artifactPath,
      projectRoot,
      requiredOutputs,
      contractRequirements,
      onEvent,
      routingOverrides: {}
    });

    results[gateDef.gate] = gateResult;
    totalUsage.total_input += gateResult.usage.total_input;
    totalUsage.total_output += gateResult.usage.total_output;
    totalUsage.rounds += gateResult.usage.rounds;

    // Allow consumer to inspect result and decide whether to continue
    const shouldContinue = onGateComplete(gateDef.gate, gateResult);
    if (shouldContinue === false) {
      onEvent({ type: 'workflow:aborted', gate: gateDef.gate, reason: 'Gate callback returned false' });
      break;
    }

    // If gate didn't complete successfully, stop on blocking gates
    if (!gateResult.completed && gateResult.stopReason === 'error') {
      onEvent({ type: 'workflow:aborted', gate: gateDef.gate, reason: gateResult.error || gateResult.stopReason });
      break;
    }
  }

  const durationMs = Date.now() - startTime;

  onEvent({
    type: 'workflow:complete',
    workflow: workflowName,
    slug,
    totalInput: totalUsage.total_input,
    totalOutput: totalUsage.total_output,
    totalRounds: totalUsage.rounds,
    durationMs,
    gatesCompleted: Object.keys(results).length,
    gatesTotal: workflow.gates.length
  });

  return {
    workflow: workflowName,
    slug,
    results,
    totalUsage,
    durationMs,
    gatesCompleted: Object.keys(results).length,
    gatesTotal: workflow.gates.length
  };
}

module.exports = {
  executeGate,
  executeWorkflow,
  getGateConfig,
  loadRoutingTable
};
