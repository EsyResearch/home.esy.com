/**
 * Claude Adapter — Anthropic SDK wrapper for the agents-runtime
 * 
 * Handles:
 *   - Message creation with tool use
 *   - Streaming support (for web interface)
 *   - Token counting and budget tracking
 *   - Retry logic with exponential backoff
 *   - Rate limit handling
 * 
 * Design: stateless adapter. Each call is independent.
 * The executor manages conversation state.
 */

const Anthropic = require('@anthropic-ai/sdk');

// Lazy-init client (created on first call, reuses connection)
let _client = null;

function getClient() {
  if (!_client) {
    _client = new Anthropic();
  }
  return _client;
}

/**
 * @typedef {Object} AdapterOptions
 * @property {string} model - Claude model ID (e.g., 'claude-opus-4-6')
 * @property {string} system - System prompt
 * @property {Array} messages - Conversation messages
 * @property {Array} [tools] - Tool definitions
 * @property {number} [maxTokens=8192] - Max output tokens
 * @property {number} [temperature=0.7] - Temperature
 * @property {string[]} [stopSequences] - Stop sequences
 */

/**
 * @typedef {Object} AdapterResult
 * @property {string} stopReason - Why the model stopped ('end_turn', 'tool_use', 'max_tokens')
 * @property {Array} content - Response content blocks
 * @property {Object} usage - Token usage { input_tokens, output_tokens }
 * @property {string} model - Model that was used
 * @property {string} id - Message ID
 */

/**
 * Send a message to Claude and get a response.
 * 
 * @param {AdapterOptions} options
 * @returns {Promise<AdapterResult>}
 */
async function sendMessage(options) {
  const {
    model,
    system,
    messages,
    tools = [],
    maxTokens = 8192,
    temperature = 0.7,
    stopSequences = []
  } = options;

  const client = getClient();

  const params = {
    model,
    max_tokens: maxTokens,
    temperature,
    messages
  };

  // Only include system if non-empty
  if (system) {
    params.system = system;
  }

  // Only include tools if we have them
  if (tools.length > 0) {
    params.tools = tools;
  }

  // Only include stop_sequences if provided
  if (stopSequences.length > 0) {
    params.stop_sequences = stopSequences;
  }

  // Use streaming to avoid SDK timeout limits on long operations
  const stream = await client.messages.stream(params);
  const response = await stream.finalMessage();

  return {
    stopReason: response.stop_reason,
    content: response.content,
    usage: response.usage,
    model: response.model,
    id: response.id
  };
}

/**
 * Send a message with streaming. Returns an async generator of events.
 * 
 * Useful for the web interface (SSE/WebSocket) to show real-time progress.
 * 
 * @param {AdapterOptions} options
 * @returns {AsyncGenerator<Object>} Stream of events
 */
async function* streamMessage(options) {
  const {
    model,
    system,
    messages,
    tools = [],
    maxTokens = 8192,
    temperature = 0.7,
    stopSequences = []
  } = options;

  const client = getClient();

  const params = {
    model,
    max_tokens: maxTokens,
    temperature,
    messages
  };

  if (system) {
    params.system = system;
  }

  if (tools.length > 0) {
    params.tools = tools;
  }

  if (stopSequences.length > 0) {
    params.stop_sequences = stopSequences;
  }

  const stream = client.messages.stream(params);

  // Accumulate usage for final event
  let totalUsage = { input_tokens: 0, output_tokens: 0 };

  for await (const event of stream) {
    if (event.type === 'message_start') {
      totalUsage.input_tokens = event.message.usage?.input_tokens || 0;
      yield { type: 'message_start', model: event.message.model, id: event.message.id };
    } else if (event.type === 'content_block_start') {
      yield { type: 'content_block_start', index: event.index, contentBlock: event.content_block };
    } else if (event.type === 'content_block_delta') {
      yield { type: 'content_block_delta', index: event.index, delta: event.delta };
    } else if (event.type === 'content_block_stop') {
      yield { type: 'content_block_stop', index: event.index };
    } else if (event.type === 'message_delta') {
      totalUsage.output_tokens = event.usage?.output_tokens || 0;
      yield { type: 'message_delta', stopReason: event.delta?.stop_reason, usage: totalUsage };
    } else if (event.type === 'message_stop') {
      yield { type: 'message_stop', usage: totalUsage };
    }
  }
}

/**
 * Send a message with automatic retry on rate limits and transient errors.
 * 
 * @param {AdapterOptions} options
 * @param {Object} [retryConfig]
 * @param {number} [retryConfig.maxRetries=3]
 * @param {number} [retryConfig.baseDelayMs=1000]
 * @param {number} [retryConfig.maxDelayMs=30000]
 * @returns {Promise<AdapterResult>}
 */
async function sendMessageWithRetry(options, retryConfig = {}) {
  const {
    maxRetries = 3,
    baseDelayMs = 1000,
    maxDelayMs = 30000
  } = retryConfig;

  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await sendMessage(options);
    } catch (error) {
      lastError = error;

      // Don't retry on client errors (bad request, auth, etc.)
      if (error.status && error.status >= 400 && error.status < 500 && error.status !== 429) {
        throw error;
      }

      // Retry on rate limits (429) and server errors (5xx)
      if (attempt < maxRetries) {
        const delay = Math.min(
          baseDelayMs * Math.pow(2, attempt) + Math.random() * 1000,
          maxDelayMs
        );

        // If rate limited, use the retry-after header if available
        if (error.status === 429 && error.headers?.['retry-after']) {
          const retryAfter = parseInt(error.headers['retry-after'], 10) * 1000;
          await sleep(Math.min(retryAfter, maxDelayMs));
        } else {
          await sleep(delay);
        }
      }
    }
  }

  throw lastError;
}

/**
 * Extract text content from a Claude response.
 * 
 * @param {Array} content - Response content blocks
 * @returns {string} Concatenated text content
 */
function extractText(content) {
  return content
    .filter(block => block.type === 'text')
    .map(block => block.text)
    .join('\n');
}

/**
 * Extract tool use blocks from a Claude response.
 * 
 * @param {Array} content - Response content blocks
 * @returns {Array} Tool use blocks
 */
function extractToolCalls(content) {
  return content.filter(block => block.type === 'tool_use');
}

/**
 * Check if response requires tool execution.
 * 
 * @param {string} stopReason
 * @returns {boolean}
 */
function needsToolExecution(stopReason) {
  return stopReason === 'tool_use';
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  sendMessage,
  streamMessage,
  sendMessageWithRetry,
  extractText,
  extractToolCalls,
  needsToolExecution,
  getClient
};
