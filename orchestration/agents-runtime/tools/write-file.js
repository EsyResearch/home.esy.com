/**
 * write_file tool — writes content to a file on the local filesystem
 * 
 * The agent uses this to produce essay artifacts: components, CSS, markdown,
 * audit reports, etc.
 */

const fs = require('fs');
const path = require('path');

/**
 * Tool definition in Anthropic's tool_use format.
 */
const definition = {
  name: 'write_file',
  description: 'Write content to a file. Creates the file if it does not exist, overwrites if it does. Creates parent directories as needed. Use this to write essay components, CSS files, markdown artifacts, audit reports, and any other text file.',
  input_schema: {
    type: 'object',
    properties: {
      path: {
        type: 'string',
        description: 'The file path to write, relative to the project root.'
      },
      content: {
        type: 'string',
        description: 'The complete file content to write.'
      }
    },
    required: ['path', 'content']
  }
};

/**
 * Execute the write_file tool.
 * 
 * @param {Object} input - Tool input from Claude { path: string, content: string }
 * @param {Object} context - Execution context
 * @param {string} context.projectRoot - Absolute path to the project root
 * @param {string[]} [context.allowedPaths] - If set, restricts writes to these path prefixes
 * @returns {Object} { success: boolean, bytesWritten?: number, error?: string }
 */
function execute(input, context) {
  const { projectRoot, allowedPaths } = context;
  
  if (!input.path) {
    return { success: false, error: 'Missing required parameter: path' };
  }
  
  if (input.content === undefined || input.content === null) {
    return { success: false, error: 'Missing required parameter: content' };
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

  // Prevent writing to dangerous locations
  const dangerousPatterns = [
    /node_modules/,
    /\.git\//,
    /\.env/,
    /package\.json$/,
    /package-lock\.json$/,
    /\.lock$/
  ];

  const relativePath = path.relative(projectRoot, normalizedPath);
  for (const pattern of dangerousPatterns) {
    if (pattern.test(relativePath)) {
      return { success: false, error: `Access denied: writing to ${relativePath} is not allowed` };
    }
  }

  // Size guard — don't write huge files
  const MAX_WRITE_SIZE = 1024 * 1024; // 1MB
  if (input.content.length > MAX_WRITE_SIZE) {
    return { 
      success: false, 
      error: `Content too large (${(input.content.length / 1024).toFixed(0)}KB). Maximum: ${MAX_WRITE_SIZE / 1024}KB.` 
    };
  }

  try {
    // Create parent directories
    const dir = path.dirname(normalizedPath);
    fs.mkdirSync(dir, { recursive: true });

    // Write file
    fs.writeFileSync(normalizedPath, input.content, 'utf8');
    
    return { success: true, bytesWritten: Buffer.byteLength(input.content, 'utf8') };
  } catch (err) {
    return { success: false, error: `Failed to write file: ${err.message}` };
  }
}

module.exports = { definition, execute };
