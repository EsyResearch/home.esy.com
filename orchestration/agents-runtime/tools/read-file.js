/**
 * read_file tool — reads a file from the local filesystem
 * 
 * This is one of the tools the executor provides to Claude during agentic execution.
 * The agent uses it to read essay files, research artifacts, config files, etc.
 */

const fs = require('fs');
const path = require('path');

/**
 * Tool definition in Anthropic's tool_use format.
 * This is passed to the API in the `tools` array.
 */
const definition = {
  name: 'read_file',
  description: 'Read the contents of a file. Returns the file contents as text. Use this to read essay files, research artifacts, configuration files, CSS, TypeScript components, and any other text file in the project.',
  input_schema: {
    type: 'object',
    properties: {
      path: {
        type: 'string',
        description: 'The file path to read, relative to the project root.'
      }
    },
    required: ['path']
  }
};

/**
 * Execute the read_file tool.
 * 
 * @param {Object} input - Tool input from Claude { path: string }
 * @param {Object} context - Execution context
 * @param {string} context.projectRoot - Absolute path to the project root
 * @param {string[]} [context.allowedPaths] - If set, restricts reads to these path prefixes
 * @returns {Object} { success: boolean, content?: string, error?: string }
 */
function execute(input, context) {
  const { projectRoot, allowedPaths } = context;
  
  if (!input.path) {
    return { success: false, error: 'Missing required parameter: path' };
  }

  // Resolve to absolute path
  const absolutePath = path.isAbsolute(input.path)
    ? input.path
    : path.resolve(projectRoot, input.path);

  // Security: ensure the path is within allowed boundaries
  const normalizedPath = path.normalize(absolutePath);
  
  if (!normalizedPath.startsWith(projectRoot)) {
    return { success: false, error: `Access denied: path is outside project root` };
  }

  if (allowedPaths && allowedPaths.length > 0) {
    const isAllowed = allowedPaths.some(prefix => {
      const absPrefix = path.isAbsolute(prefix)
        ? prefix
        : path.resolve(projectRoot, prefix);
      return normalizedPath.startsWith(absPrefix);
    });
    
    if (!isAllowed) {
      return { success: false, error: `Access denied: path is not in allowed paths` };
    }
  }

  // Check existence
  if (!fs.existsSync(normalizedPath)) {
    return { success: false, error: `File not found: ${input.path}` };
  }

  // Check if it's a file (not directory)
  const stat = fs.statSync(normalizedPath);
  if (!stat.isFile()) {
    return { success: false, error: `Not a file: ${input.path}` };
  }

  // Size guard — don't read huge files into context
  const MAX_FILE_SIZE = 512 * 1024; // 512KB
  if (stat.size > MAX_FILE_SIZE) {
    return { 
      success: false, 
      error: `File too large (${(stat.size / 1024).toFixed(0)}KB). Maximum: ${MAX_FILE_SIZE / 1024}KB. Consider reading a specific section.` 
    };
  }

  try {
    const content = fs.readFileSync(normalizedPath, 'utf8');
    return { success: true, content };
  } catch (err) {
    return { success: false, error: `Failed to read file: ${err.message}` };
  }
}

module.exports = { definition, execute };
