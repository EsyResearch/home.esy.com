/**
 * Tool registry — central index of all tools available to agents
 * 
 * Each tool exports:
 *   - definition: Anthropic tool_use format object
 *   - execute(input, context): function that runs the tool
 * 
 * To add a new tool:
 *   1. Create a new file in this directory
 *   2. Export { definition, execute }
 *   3. Add it to the registry below
 */

const readFile = require('./read-file');
const writeFile = require('./write-file');
const listDirectory = require('./list-directory');

/**
 * All available tools, keyed by tool name.
 */
const registry = {
  read_file: readFile,
  write_file: writeFile,
  list_directory: listDirectory
};

/**
 * Get tool definitions for the Anthropic API.
 * 
 * @param {string[]} [toolNames] - Specific tools to include. If omitted, all tools are returned.
 * @returns {Array} Tool definitions for the `tools` parameter
 */
function getToolDefinitions(toolNames) {
  const tools = toolNames
    ? toolNames.map(name => {
        const tool = registry[name];
        if (!tool) throw new Error(`Unknown tool: ${name}`);
        return tool.definition;
      })
    : Object.values(registry).map(t => t.definition);
  
  return tools;
}

/**
 * Execute a tool by name.
 * 
 * @param {string} toolName - The tool to execute
 * @param {Object} input - Tool input from Claude
 * @param {Object} context - Execution context (projectRoot, allowedPaths, etc.)
 * @returns {Object} Tool result
 */
function executeTool(toolName, input, context) {
  const tool = registry[toolName];
  
  if (!tool) {
    return { success: false, error: `Unknown tool: ${toolName}` };
  }
  
  return tool.execute(input, context);
}

module.exports = {
  registry,
  getToolDefinitions,
  executeTool
};
