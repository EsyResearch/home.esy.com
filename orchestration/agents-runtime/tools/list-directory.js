/**
 * list_directory tool — lists files and directories at a given path
 * 
 * The agent uses this to explore the project structure, discover existing
 * essays, check for file presence, etc.
 */

const fs = require('fs');
const path = require('path');

/**
 * Tool definition in Anthropic's tool_use format.
 */
const definition = {
  name: 'list_directory',
  description: 'List files and directories at a given path. Returns names with type indicators (file/dir). Use this to explore project structure, discover existing files, or check what exists before reading or writing.',
  input_schema: {
    type: 'object',
    properties: {
      path: {
        type: 'string',
        description: 'The directory path to list, relative to the project root.'
      }
    },
    required: ['path']
  }
};

/**
 * Execute the list_directory tool.
 * 
 * @param {Object} input - Tool input from Claude { path: string }
 * @param {Object} context - Execution context
 * @param {string} context.projectRoot - Absolute path to the project root
 * @returns {Object} { success: boolean, entries?: Array, error?: string }
 */
function execute(input, context) {
  const { projectRoot } = context;
  
  if (!input.path) {
    return { success: false, error: 'Missing required parameter: path' };
  }

  // Resolve to absolute path
  const absolutePath = path.isAbsolute(input.path)
    ? input.path
    : path.resolve(projectRoot, input.path);

  const normalizedPath = path.normalize(absolutePath);
  
  // Security: ensure within project root
  if (!normalizedPath.startsWith(projectRoot)) {
    return { success: false, error: `Access denied: path is outside project root` };
  }

  if (!fs.existsSync(normalizedPath)) {
    return { success: false, error: `Directory not found: ${input.path}` };
  }

  const stat = fs.statSync(normalizedPath);
  if (!stat.isDirectory()) {
    return { success: false, error: `Not a directory: ${input.path}` };
  }

  try {
    const entries = fs.readdirSync(normalizedPath, { withFileTypes: true })
      .filter(entry => !entry.name.startsWith('.')) // skip dotfiles
      .map(entry => ({
        name: entry.name,
        type: entry.isDirectory() ? 'directory' : 'file',
        size: entry.isFile() ? fs.statSync(path.join(normalizedPath, entry.name)).size : undefined
      }))
      .sort((a, b) => {
        // Directories first, then files
        if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
        return a.name.localeCompare(b.name);
      });

    return { success: true, entries };
  } catch (err) {
    return { success: false, error: `Failed to list directory: ${err.message}` };
  }
}

module.exports = { definition, execute };
