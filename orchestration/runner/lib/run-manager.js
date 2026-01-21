/**
 * Run record management
 */

const fs = require('fs');
const path = require('path');
const { loadContract, getRequiredOutputs, getValidations, REPO_ROOT } = require('./contract-loader');
const { runValidations } = require('./validator');

const RUNS_DIR = path.join(REPO_ROOT, 'orchestration', 'runs');

/**
 * Generate a unique run ID
 * Format: run_<ISO-timestamp>_<slug>_<random>
 */
function generateRunId(slug) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '').replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 8);
  return `run_${timestamp}_${slug}_${random}`;
}

/**
 * Get paths for a run
 */
function getRunPaths(runId) {
  const runDir = path.join(RUNS_DIR, runId);
  return {
    runDir,
    recordDir: path.join(runDir, 'record'),
    logsDir: path.join(runDir, 'logs'),
    runJson: path.join(runDir, 'record', 'RUN.json'),
    gatesDir: path.join(runDir, 'record', 'gates'),
    invocationsLogsDir: path.join(runDir, 'logs', 'invocations')
  };
}

/**
 * Initialize a new run
 */
function initRun(options) {
  const { workflow, slug, artifactPath, depth = 'standard' } = options;
  
  const runId = generateRunId(slug);
  const paths = getRunPaths(runId);
  
  // Create directory structure
  fs.mkdirSync(paths.recordDir, { recursive: true });
  fs.mkdirSync(paths.logsDir, { recursive: true });
  fs.mkdirSync(paths.gatesDir, { recursive: true });
  fs.mkdirSync(paths.invocationsLogsDir, { recursive: true });
  
  // Initialize RUN.json
  const runRecord = {
    run_id: runId,
    workflow: {
      name: workflow,
      version: 'local-dev',
      slug,
      artifact_path: artifactPath
    },
    depth,
    status: 'QUEUED',
    started_at: new Date().toISOString(),
    finished_at: null,
    gates: [],
    invocations: [],
    artifacts_index: [],
    validations: [],
    events: [
      {
        timestamp: new Date().toISOString(),
        type: 'RUN_STARTED',
        message: `Run initialized for ${workflow}/${slug}`
      }
    ]
  };
  
  // Pre-populate gates based on workflow
  if (workflow === 'visual-essay') {
    runRecord.gates = [
      { gate: 'G1', name: 'Intake Approval', status: 'NOT_STARTED', attempts: [] },
      { gate: 'G2', name: 'Research Complete', status: 'NOT_STARTED', attempts: [] },
      { gate: 'G3', name: 'Spec Approval', status: 'NOT_STARTED', attempts: [] }
    ];
  }
  
  fs.writeFileSync(paths.runJson, JSON.stringify(runRecord, null, 2));
  
  return { runId, paths, runRecord };
}

/**
 * Load an existing run record
 */
function loadRun(runId) {
  const paths = getRunPaths(runId);
  
  if (!fs.existsSync(paths.runJson)) {
    throw new Error(`Run not found: ${runId}`);
  }
  
  const content = fs.readFileSync(paths.runJson, 'utf8');
  return {
    runId,
    paths,
    runRecord: JSON.parse(content)
  };
}

/**
 * Save run record
 */
function saveRun(runId, runRecord) {
  const paths = getRunPaths(runId);
  fs.writeFileSync(paths.runJson, JSON.stringify(runRecord, null, 2));
}

/**
 * Start a gate attempt
 */
function startGate(runId, gateCode, agentName) {
  const { paths, runRecord } = loadRun(runId);
  
  // Find the gate
  const gate = runRecord.gates.find(g => g.gate === gateCode);
  if (!gate) {
    throw new Error(`Gate not found: ${gateCode}`);
  }
  
  // Create new attempt
  const attemptNumber = gate.attempts.length + 1;
  const attempt = {
    attempt: attemptNumber,
    status: 'RUNNING',
    started_at: new Date().toISOString(),
    finished_at: null,
    agent: agentName,
    invocation_ids: [],
    required_outputs: [],
    artifacts: [],
    validations: [],
    failure_reason: null
  };
  
  gate.attempts.push(attempt);
  gate.status = 'RUNNING';
  runRecord.status = 'RUNNING';
  
  runRecord.events.push({
    timestamp: new Date().toISOString(),
    type: 'GATE_STARTED',
    gate: gateCode,
    attempt: attemptNumber,
    agent: agentName,
    message: `Gate ${gateCode} attempt ${attemptNumber} started with agent ${agentName}`
  });
  
  saveRun(runId, runRecord);
  
  // Create gate directory for this attempt
  const gateDir = path.join(paths.gatesDir, gateCode);
  fs.mkdirSync(gateDir, { recursive: true });
  
  return { attempt: attemptNumber, gate };
}

/**
 * Record an agent invocation
 */
function recordInvocation(runId, invocationData) {
  const { runRecord } = loadRun(runId);
  
  const invocationId = `inv_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  
  const invocation = {
    invocation_id: invocationId,
    gate: invocationData.gate,
    agent: invocationData.agent,
    model: invocationData.model || 'unknown',
    started_at: invocationData.started_at || new Date().toISOString(),
    finished_at: invocationData.finished_at || new Date().toISOString(),
    duration_ms: invocationData.duration_ms || 0,
    status: invocationData.status || 'SUCCESS',
    input_refs: invocationData.input_refs || [],
    output_refs: invocationData.output_refs || []
  };
  
  runRecord.invocations.push(invocation);
  
  // Link to current gate attempt
  const gate = runRecord.gates.find(g => g.gate === invocationData.gate);
  if (gate && gate.attempts.length > 0) {
    const currentAttempt = gate.attempts[gate.attempts.length - 1];
    currentAttempt.invocation_ids.push(invocationId);
  }
  
  runRecord.events.push({
    timestamp: new Date().toISOString(),
    type: 'INVOCATION_RECORDED',
    invocation_id: invocationId,
    gate: invocationData.gate,
    agent: invocationData.agent
  });
  
  saveRun(runId, runRecord);
  
  return invocationId;
}

/**
 * Finish a gate (run validations)
 */
async function finishGate(runId, gateCode) {
  const { paths, runRecord } = loadRun(runId);
  
  const gate = runRecord.gates.find(g => g.gate === gateCode);
  if (!gate) {
    throw new Error(`Gate not found: ${gateCode}`);
  }
  
  if (gate.attempts.length === 0) {
    throw new Error(`No attempt started for gate ${gateCode}. Call 'gate start' first.`);
  }
  
  const currentAttempt = gate.attempts[gate.attempts.length - 1];
  
  // Load contract and run validations
  const contract = loadContract(gateCode);
  const context = {
    slug: runRecord.workflow.slug,
    artifact_path: runRecord.workflow.artifact_path,
    depth: runRecord.depth
  };
  
  const outputs = getRequiredOutputs(contract, context);
  const validations = getValidations(contract, context);
  
  const validationResult = await runValidations(contract, outputs, validations, context);
  
  // Update attempt
  currentAttempt.finished_at = new Date().toISOString();
  currentAttempt.status = validationResult.pass ? 'PASS' : 'FAIL';
  currentAttempt.required_outputs = outputs.map(o => o.pathTemplate);
  currentAttempt.artifacts = validationResult.artifacts;
  currentAttempt.validations = validationResult.results;
  
  if (!validationResult.pass) {
    const failedValidations = validationResult.results.filter(r => !r.pass);
    currentAttempt.failure_reason = failedValidations.map(f => {
      if (f.type === 'file_exists') {
        return `Missing: ${f.path}`;
      }
      if (f.type === 'file_exists_any_of') {
        return `None of required files exist: ${f.checked.map(c => c.path).join(', ')}`;
      }
      if (f.type === 'min_sources') {
        return `Insufficient sources: ${f.count}/${f.threshold} (depth: ${f.depth})`;
      }
      if (f.type === 'contains_headings') {
        return `Missing headings: ${f.missing.join(', ')}`;
      }
      if (f.type === 'not_contains') {
        return `Found forbidden pattern: ${f.pattern}`;
      }
      return f.description;
    }).join('; ');
  }
  
  // Update gate status
  gate.status = validationResult.pass ? 'PASS' : 'FAIL';
  
  // Update artifacts_index
  for (const artifact of validationResult.artifacts) {
    const existing = runRecord.artifacts_index.find(a => a.path === artifact.path);
    if (existing) {
      existing.sha256 = artifact.sha256;
      existing.updated_at = new Date().toISOString();
    } else {
      runRecord.artifacts_index.push({
        path: artifact.path,
        sha256: artifact.sha256,
        gate: gateCode,
        recorded_at: new Date().toISOString()
      });
    }
  }
  
  // Update run status
  if (!validationResult.pass && contract.blocking) {
    runRecord.status = 'FAILED';
  }
  
  runRecord.events.push({
    timestamp: new Date().toISOString(),
    type: validationResult.pass ? 'GATE_PASSED' : 'GATE_FAILED',
    gate: gateCode,
    attempt: currentAttempt.attempt,
    message: validationResult.pass 
      ? `Gate ${gateCode} passed on attempt ${currentAttempt.attempt}`
      : `Gate ${gateCode} failed: ${currentAttempt.failure_reason}`
  });
  
  saveRun(runId, runRecord);
  
  // Write attempt file
  const attemptFile = path.join(paths.gatesDir, gateCode, `attempt-${currentAttempt.attempt}.json`);
  fs.writeFileSync(attemptFile, JSON.stringify(currentAttempt, null, 2));
  
  return {
    pass: validationResult.pass,
    attempt: currentAttempt,
    results: validationResult.results
  };
}

/**
 * Fail a gate manually with a reason
 */
function failGate(runId, gateCode, reason) {
  const { paths, runRecord } = loadRun(runId);
  
  const gate = runRecord.gates.find(g => g.gate === gateCode);
  if (!gate) {
    throw new Error(`Gate not found: ${gateCode}`);
  }
  
  // If no attempt exists, create one
  if (gate.attempts.length === 0) {
    gate.attempts.push({
      attempt: 1,
      status: 'FAIL',
      started_at: new Date().toISOString(),
      finished_at: new Date().toISOString(),
      agent: 'manual',
      invocation_ids: [],
      required_outputs: [],
      artifacts: [],
      validations: [],
      failure_reason: reason
    });
  } else {
    const currentAttempt = gate.attempts[gate.attempts.length - 1];
    currentAttempt.finished_at = new Date().toISOString();
    currentAttempt.status = 'FAIL';
    currentAttempt.failure_reason = reason;
  }
  
  gate.status = 'FAIL';
  
  // Check if blocking
  const contract = loadContract(gateCode);
  if (contract.blocking) {
    runRecord.status = 'FAILED';
  }
  
  runRecord.events.push({
    timestamp: new Date().toISOString(),
    type: 'GATE_FAILED',
    gate: gateCode,
    message: `Gate ${gateCode} manually failed: ${reason}`
  });
  
  saveRun(runId, runRecord);
  
  // Write attempt file
  const currentAttempt = gate.attempts[gate.attempts.length - 1];
  const attemptFile = path.join(paths.gatesDir, gateCode, `attempt-${currentAttempt.attempt}.json`);
  fs.mkdirSync(path.dirname(attemptFile), { recursive: true });
  fs.writeFileSync(attemptFile, JSON.stringify(currentAttempt, null, 2));
  
  return { gate, attempt: currentAttempt };
}

/**
 * List all runs
 */
function listRuns() {
  if (!fs.existsSync(RUNS_DIR)) {
    return [];
  }
  
  const entries = fs.readdirSync(RUNS_DIR, { withFileTypes: true });
  const runs = [];
  
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name.startsWith('run_')) {
      try {
        const { runRecord } = loadRun(entry.name);
        runs.push({
          run_id: runRecord.run_id,
          workflow: runRecord.workflow.name,
          slug: runRecord.workflow.slug,
          status: runRecord.status,
          started_at: runRecord.started_at
        });
      } catch (e) {
        // Skip invalid runs
      }
    }
  }
  
  return runs.sort((a, b) => new Date(b.started_at) - new Date(a.started_at));
}

/**
 * Complete a run (mark as finished)
 */
function completeRun(runId, status = null) {
  const { runRecord } = loadRun(runId);
  
  // Auto-determine status if not provided
  if (!status) {
    const allPassed = runRecord.gates.every(g => g.status === 'PASS');
    const anyFailed = runRecord.gates.some(g => g.status === 'FAIL');
    
    if (anyFailed) {
      status = 'FAILED';
    } else if (allPassed) {
      status = 'PASSED';
    } else {
      status = 'CANCELED';
    }
  }
  
  runRecord.status = status;
  runRecord.finished_at = new Date().toISOString();
  
  runRecord.events.push({
    timestamp: new Date().toISOString(),
    type: 'RUN_COMPLETED',
    status,
    message: `Run completed with status: ${status}`
  });
  
  saveRun(runId, runRecord);
  
  return runRecord;
}

module.exports = {
  generateRunId,
  getRunPaths,
  initRun,
  loadRun,
  saveRun,
  startGate,
  recordInvocation,
  finishGate,
  failGate,
  listRuns,
  completeRun,
  RUNS_DIR
};
