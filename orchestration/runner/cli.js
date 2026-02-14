#!/usr/bin/env node

/**
 * Orchestration Runner CLI
 * 
 * Commands:
 *   run start --workflow <name> --slug <slug> --artifact-path <path> [--depth quick|standard|deep]
 *   run list
 *   run show --run <run-id>
 *   run complete --run <run-id> [--status PASSED|FAILED|CANCELED]
 * 
 *   gate start --run <run-id> --gate <Gx> --agent <agent-name>
 *   gate finish --run <run-id> --gate <Gx>
 *   gate fail --run <run-id> --gate <Gx> --reason "<text>"
 * 
 *   invocation record --run <run-id> --gate <Gx> --agent <agent-name> [--status SUCCESS|FAIL]
 */

const {
  initRun,
  loadRun,
  startGate,
  finishGate,
  failGate,
  recordInvocation,
  listRuns,
  completeRun,
  getRunPaths
} = require('./lib/run-manager');

const {
  loadWorkflow,
  generatePromptPacket,
  writePromptPacket,
  saveOriginalPrompt,
  readPromptFile,
  hashString
} = require('./lib/prompt-generator');

const readline = require('readline');
const path = require('path');

function parseArgs(args) {
  const parsed = { _: [] };
  let i = 0;
  
  while (i < args.length) {
    const arg = args[i];
    
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = args[i + 1];
      
      if (next && !next.startsWith('--')) {
        parsed[key] = next;
        i += 2;
      } else {
        parsed[key] = true;
        i += 1;
      }
    } else {
      parsed._.push(arg);
      i += 1;
    }
  }
  
  return parsed;
}

/**
 * Wait for user to press Enter
 */
function waitForEnter(prompt = 'Press Enter to continue...') {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question(prompt, () => {
      rl.close();
      resolve();
    });
  });
}

function printUsage() {
  console.log(`
Orchestration Runner CLI

Usage:
  node cli.js <command> <subcommand> [options]

Commands:
  run visual-essay   Run the complete visual-essay pipeline (CI-style, human-in-the-loop)
    --slug <slug>           Essay/project slug (REQUIRED)
    --artifact-path <path>  Override essay dir (default: src/app/essays/{slug})
    --depth <mode>          Depth mode: quick|standard|deep (default: standard)
    --prompt-file <path>    Path to topic/prompt file (optional)
    --start-from <Gx>       Skip gates before this one (auto-validate passing gates)

  run start     Initialize a new run (manual mode)
    --workflow <name>       Workflow name (e.g., visual-essay)
    --slug <slug>           Essay/project slug (REQUIRED)
    --artifact-path <path>  Override essay dir (default: src/app/essays/{slug})
    --depth <mode>          Depth mode: quick|standard|deep (default: standard)

  run list      List all runs

  run show      Show run details
    --run <run-id>          Run ID

  run complete  Mark run as complete
    --run <run-id>          Run ID
    --status <status>       Optional: PASSED|FAILED|CANCELED

  gate start    Start a gate attempt
    --run <run-id>          Run ID
    --gate <Gx>             Gate code (e.g., G1, G2, G3)
    --agent <name>          Agent name

  gate finish   Finish gate and run validations
    --run <run-id>          Run ID
    --gate <Gx>             Gate code

  gate fail     Manually fail a gate
    --run <run-id>          Run ID
    --gate <Gx>             Gate code
    --reason <text>         Failure reason

  invocation record   Record an agent invocation
    --run <run-id>          Run ID
    --gate <Gx>             Gate code
    --agent <name>          Agent name
    --status <status>       SUCCESS|FAIL (default: SUCCESS)

  agent execute       Execute a single gate using Claude API (agents-runtime)
    --run <run-id>          Run ID (gate context is loaded from the run)
    --gate <Gx>             Gate code to execute

  agent run-workflow  Execute entire workflow automatically via Claude API
    --slug <slug>           Essay slug (REQUIRED)
    --workflow <name>       Workflow name (default: visual-essay)
    --artifact-path <path>  Override essay dir
    --depth <mode>          Depth mode: quick|standard|deep

  agent list-agents   List all available agents
  agent config        Show routing table (or --gate <Gx> for one gate)

Examples:
  # Run the full visual-essay pipeline (recommended — slug auto-derives the path)
  node cli.js run visual-essay --slug the-geography-of-water-scarcity --depth standard

  # Run with explicit artifact path (override auto-derive)
  node cli.js run visual-essay --slug the-word-robot --artifact-path src/app/essays/the-word-robot --depth standard

  # Resume from a specific gate (auto-validates all prior gates)
  node cli.js run visual-essay --slug the-geography-of-water-scarcity --depth deep --start-from G5.5

  # Run with a prompt file
  node cli.js run visual-essay --slug the-word-robot --prompt-file prompts/robot-topic.txt

  # Manual mode: Start a new run
  node cli.js run start --workflow visual-essay --slug the-word-robot

  # Manual mode: Start G2 gate with research orchestrator
  node cli.js gate start --run run_20260119_the-word-robot_abc123 --gate G2 --agent research-orchestrator

  # Manual mode: Finish G2 gate (runs validations)
  node cli.js gate finish --run run_20260119_the-word-robot_abc123 --gate G2
`);
}

/**
 * Standard convention: derive essay directory from slug
 */
const STANDARD_ESSAY_DIR = 'src/app/essays';

/**
 * Validate the essay directory follows standard convention.
 * Warns if non-standard, errors if the path is outside src/.
 */
function validateConvention(slug, artifactPath) {
  const expectedPath = `${STANDARD_ESSAY_DIR}/${slug}`;
  
  if (artifactPath === expectedPath) {
    console.log(`✓ Convention check: standard path (${artifactPath})`);
    return;
  }
  
  // Non-standard but still in src/app/essays/ — warn but allow
  if (artifactPath.startsWith(STANDARD_ESSAY_DIR + '/')) {
    console.log(`⚠️  Convention warning: non-standard path`);
    console.log(`   Expected: ${expectedPath}`);
    console.log(`   Got:      ${artifactPath}`);
    console.log(`   Proceeding with override...`);
    return;
  }
  
  // Outside src/app/essays/ entirely — hard error
  if (!artifactPath.startsWith('src/')) {
    console.error(`❌ Convention error: artifact path must be under src/app/essays/`);
    console.error(`   Expected: ${expectedPath}`);
    console.error(`   Got:      ${artifactPath}`);
    console.error('');
    console.error('   The standard convention is: src/app/essays/{slug}/');
    console.error('   All essay files (implementation, research, design) live here.');
    console.error('   Use --artifact-path only to override within src/app/essays/.');
    process.exit(1);
  }
  
  // In src/ but not in src/app/essays/ — warn
  console.log(`⚠️  Convention warning: path is outside src/app/essays/`);
  console.log(`   Expected: ${expectedPath}`);
  console.log(`   Got:      ${artifactPath}`);
  console.log(`   Proceeding with override...`);
}

/**
 * Run the visual-essay pipeline in CI-style with human-in-the-loop execution
 */
async function runVisualEssayPipeline(options) {
  const { slug, artifactPath, depth, promptFile, startFrom } = options;
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════════════════');
  console.log('  VISUAL ESSAY PIPELINE - CI Mode (Human-in-the-Loop)');
  console.log('═══════════════════════════════════════════════════════════════════════════════');
  console.log('');
  
  // Validate convention
  validateConvention(slug, artifactPath);
  console.log('');
  
  // Read and hash prompt file if provided
  let originalPrompt = null;
  let promptSha256 = null;
  
  if (promptFile) {
    originalPrompt = readPromptFile(promptFile);
    promptSha256 = hashString(originalPrompt);
    console.log(`📄 Prompt file: ${promptFile}`);
    console.log(`   SHA256: ${promptSha256.substring(0, 16)}...`);
  } else {
    console.log('📄 No prompt file provided (will use slug as topic)');
    originalPrompt = `Topic: ${slug}\n\nProduce a visual essay about "${slug.replace(/-/g, ' ')}".`;
    promptSha256 = hashString(originalPrompt);
  }
  
  console.log(`📁 Essay directory: ${artifactPath}`);
  console.log(`📊 Depth mode: ${depth}`);
  console.log('');
  
  // Load workflow definition
  const workflow = loadWorkflow('visual-essay');
  console.log(`🔄 Loaded workflow: ${workflow.workflow} (${workflow.gates.length} gates)`);
  
  // Show gate overview
  const phases = {};
  for (const g of workflow.gates) {
    const phase = g.phase || 'Unknown';
    if (!phases[phase]) phases[phase] = [];
    phases[phase].push(g.gate);
  }
  for (const [phase, gates] of Object.entries(phases)) {
    console.log(`   ${phase}: ${gates.join(' → ')}`);
  }
  console.log('');
  
  // Initialize run
  const { runId, paths, runRecord } = initRun({
    workflow: 'visual-essay',
    slug,
    artifactPath,
    depth,
    promptFile: promptFile || null,
    promptSha256
  });
  
  console.log(`✓ Run initialized: ${runId}`);
  console.log(`  Record: orchestration/runs/${runId}/record/RUN.json`);
  console.log('');
  
  // Save original prompt to logs
  saveOriginalPrompt(paths, originalPrompt);
  
  // Determine if we're skipping gates (--start-from)
  let reachedStartGate = !startFrom; // If no startFrom, process everything
  
  if (startFrom) {
    const validGates = workflow.gates.map(g => g.gate);
    if (!validGates.includes(startFrom)) {
      console.error(`❌ Invalid --start-from gate: ${startFrom}`);
      console.error(`   Valid gates: ${validGates.join(', ')}`);
      process.exit(1);
    }
    console.log(`⏩ Resuming from gate ${startFrom} — auto-validating prior gates`);
    console.log('');
  }
  
  // Process each gate
  for (const gateDef of workflow.gates) {
    const gateCode = gateDef.gate;
    
    // Check if we've reached the start gate
    if (!reachedStartGate) {
      if (gateCode === startFrom) {
        reachedStartGate = true;
      } else {
        // Auto-validate: start gate, run validation, report result without pausing
        console.log(`  ⏩ ${gateCode}: ${gateDef.name} — auto-validating...`);
        
        const packetSha256 = hashString(`auto-validate-${gateCode}`);
        startGate(runId, gateCode, gateDef.agent, packetSha256);
        const result = await finishGate(runId, gateCode);
        
        if (result.pass) {
          console.log(`     ✅ PASS (artifacts exist from prior run)`);
        } else {
          console.log(`     ❌ FAIL — ${result.attempt.failure_reason}`);
          console.log('');
          console.log(`  Cannot resume from ${startFrom}: gate ${gateCode} does not pass.`);
          console.log('  Run the full pipeline or fix the missing artifacts first.');
          completeRun(runId, 'FAILED');
          process.exit(1);
        }
        continue;
      }
    }
    
    console.log('───────────────────────────────────────────────────────────────────────────────');
    console.log(`  GATE ${gateCode}: ${gateDef.name}`);
    console.log('───────────────────────────────────────────────────────────────────────────────');
    console.log('');
    
    // Get current attempt number
    const { runRecord: currentRecord } = loadRun(runId);
    const gate = currentRecord.gates.find(g => g.gate === gateCode);
    const attemptNumber = gate ? gate.attempts.length + 1 : 1;
    
    // Generate prompt packet
    const promptPacket = generatePromptPacket({
      gateCode,
      gateDef,
      runId,
      slug,
      artifactPath,
      depth,
      originalPrompt,
      attemptNumber
    });
    
    // Compute prompt packet hash
    const packetSha256 = hashString(promptPacket);
    
    // Start gate (records attempt)
    const startResult = startGate(runId, gateCode, gateDef.agent, packetSha256);
    
    // Write prompt packet to logs
    const promptPath = writePromptPacket(paths, gateCode, promptPacket);
    
    console.log(`📋 Prompt packet generated:`);
    console.log(`   ${promptPath}`);
    console.log('');
    console.log('┌─────────────────────────────────────────────────────────────────────────────┐');
    console.log('│  HUMAN ACTION REQUIRED                                                      │');
    console.log('├─────────────────────────────────────────────────────────────────────────────┤');
    console.log('│                                                                             │');
    console.log('│  1. Open the prompt packet file above                                       │');
    console.log('│  2. Copy the entire contents                                                │');
    console.log('│  3. Paste into Claude Code and execute                                      │');
    console.log('│  4. Wait for agent to complete and produce outputs                          │');
    console.log('│  5. Return here and press Enter                                             │');
    console.log('│                                                                             │');
    console.log('└─────────────────────────────────────────────────────────────────────────────┘');
    console.log('');
    
    // Wait for user
    await waitForEnter(`⏸️  Press Enter when ${gateCode} execution is complete...`);
    console.log('');
    
    // Run gate validation
    console.log(`🔍 Validating ${gateCode} outputs...`);
    console.log('');
    
    const result = await finishGate(runId, gateCode);
    
    // Display results
    if (result.pass) {
      console.log(`✅ Gate ${gateCode} PASSED`);
    } else {
      console.log(`❌ Gate ${gateCode} FAILED`);
      console.log(`   Reason: ${result.attempt.failure_reason}`);
    }
    
    console.log('');
    console.log('Validation Results:');
    for (const v of result.results) {
      const icon = v.pass ? (v.warning ? '⚠' : '✓') : '✗';
      console.log(`  ${icon} ${v.type}: ${v.description || v.path || ''}`);
      
      if (v.type === 'min_sources' && !v.pass) {
        console.log(`    Found ${v.count} sources, need ${v.threshold} for depth=${v.depth}`);
      }
      if (v.type === 'contains_headings' && v.missing?.length > 0) {
        console.log(`    Missing terms: ${v.missing.join(', ')}`);
      }
      if (v.type === 'file_exists_any_of') {
        for (const c of (v.checked || [])) {
          console.log(`    ${c.exists ? '✓' : '✗'} ${c.path}`);
        }
      }
    }
    
    if (result.attempt.artifacts.length > 0) {
      console.log('');
      console.log('Artifacts Hashed:');
      for (const a of result.attempt.artifacts) {
        console.log(`  ${a.path}`);
        console.log(`    sha256: ${a.sha256.substring(0, 16)}...`);
      }
    }
    console.log('');
    
    // If gate failed, stop pipeline
    if (!result.pass) {
      console.log('═══════════════════════════════════════════════════════════════════════════════');
      console.log('  PIPELINE STOPPED - Gate validation failed');
      console.log('═══════════════════════════════════════════════════════════════════════════════');
      console.log('');
      console.log('To retry this gate:');
      console.log('  1. Fix the missing outputs');
      console.log(`  2. Run: node orchestration/runner/cli.js run visual-essay --slug ${slug} --depth ${depth}`);
      console.log('     (Or continue from the failed gate using manual mode)');
      console.log('');
      
      // Mark run as failed
      completeRun(runId, 'FAILED');
      
      process.exit(1);
    }
  }
  
  // All gates passed
  completeRun(runId, 'PASSED');
  
  console.log('═══════════════════════════════════════════════════════════════════════════════');
  console.log('  PIPELINE COMPLETE - All gates passed!');
  console.log('═══════════════════════════════════════════════════════════════════════════════');
  console.log('');
  console.log(`Run ID: ${runId}`);
  console.log(`Record: orchestration/runs/${runId}/record/RUN.json`);
  console.log('');
  console.log('Gate Summary:');
  
  const { runRecord: finalRecord } = loadRun(runId);
  for (const gate of finalRecord.gates) {
    const statusIcon = gate.status === 'PASS' ? '✅' : '❌';
    const attempts = gate.attempts.length;
    console.log(`  ${statusIcon} ${gate.gate}: ${gate.name} (${attempts} attempt${attempts !== 1 ? 's' : ''})`);
  }
  console.log('');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const [command, subcommand] = args._;
  
  if (!command || args.help) {
    printUsage();
    process.exit(0);
  }
  
  try {
    // RUN commands
    if (command === 'run') {
      // CI-style visual-essay pipeline
      if (subcommand === 'visual-essay') {
        const { slug, 'artifact-path': artifactPathOverride, depth = 'standard', 'prompt-file': promptFile, 'start-from': startFrom } = args;
        
        if (!slug) {
          console.error('Error: --slug is required');
          process.exit(1);
        }
        
        // Standard convention: src/app/essays/{slug}
        const artifactPath = artifactPathOverride || `src/app/essays/${slug}`;
        
        await runVisualEssayPipeline({ slug, artifactPath, depth, promptFile, startFrom });
        return;
      }
      
      if (subcommand === 'start') {
        const { workflow, slug, 'artifact-path': artifactPathOverride, depth } = args;
        
        if (!workflow || !slug) {
          console.error('Error: --workflow and --slug are required');
          process.exit(1);
        }
        
        // Standard convention: src/app/essays/{slug}
        const artifactPath = artifactPathOverride || `src/app/essays/${slug}`;
        
        const result = initRun({
          workflow,
          slug,
          artifactPath,
          depth: depth || 'standard'
        });
        
        console.log('✓ Run initialized');
        console.log(`  Run ID: ${result.runId}`);
        console.log(`  Record: orchestration/runs/${result.runId}/record/RUN.json`);
        console.log(`  Logs:   orchestration/runs/${result.runId}/logs/`);
        console.log('');
        console.log('Next steps:');
        console.log(`  node orchestration/runner/cli.js gate start --run ${result.runId} --gate G1 --agent <agent-name>`);
        
        return;
      }
      
      if (subcommand === 'list') {
        const runs = listRuns();
        
        if (runs.length === 0) {
          console.log('No runs found.');
          return;
        }
        
        console.log('Runs:');
        console.log('');
        for (const run of runs) {
          const statusIcon = {
            'QUEUED': '⏳',
            'RUNNING': '🔄',
            'PASSED': '✅',
            'FAILED': '❌',
            'CANCELED': '⛔'
          }[run.status] || '❓';
          
          console.log(`  ${statusIcon} ${run.run_id}`);
          console.log(`     ${run.workflow}/${run.slug} | ${run.status} | ${run.started_at}`);
          console.log('');
        }
        
        return;
      }
      
      if (subcommand === 'show') {
        const { run: runId } = args;
        
        if (!runId) {
          console.error('Error: --run is required');
          process.exit(1);
        }
        
        const { runRecord } = loadRun(runId);
        console.log(JSON.stringify(runRecord, null, 2));
        
        return;
      }
      
      if (subcommand === 'complete') {
        const { run: runId, status } = args;
        
        if (!runId) {
          console.error('Error: --run is required');
          process.exit(1);
        }
        
        const result = completeRun(runId, status);
        console.log(`✓ Run completed with status: ${result.status}`);
        
        return;
      }
    }
    
    // GATE commands
    if (command === 'gate') {
      if (subcommand === 'start') {
        const { run: runId, gate: gateCode, agent } = args;
        
        if (!runId || !gateCode || !agent) {
          console.error('Error: --run, --gate, and --agent are required');
          process.exit(1);
        }
        
        const result = startGate(runId, gateCode, agent);
        console.log(`✓ Gate ${gateCode} started`);
        console.log(`  Attempt: ${result.attempt}`);
        console.log(`  Agent: ${agent}`);
        console.log('');
        console.log('Next steps:');
        console.log('  1. Run the agent to produce outputs');
        console.log(`  2. node orchestration/runner/cli.js gate finish --run ${runId} --gate ${gateCode}`);
        
        return;
      }
      
      if (subcommand === 'finish') {
        const { run: runId, gate: gateCode } = args;
        
        if (!runId || !gateCode) {
          console.error('Error: --run and --gate are required');
          process.exit(1);
        }
        
        const result = await finishGate(runId, gateCode);
        
        if (result.pass) {
          console.log(`✅ Gate ${gateCode} PASSED`);
        } else {
          console.log(`❌ Gate ${gateCode} FAILED`);
          console.log(`  Reason: ${result.attempt.failure_reason}`);
        }
        
        console.log('');
        console.log('Validation Results:');
        for (const v of result.results) {
          const icon = v.pass ? (v.warning ? '⚠' : '✓') : '✗';
          console.log(`  ${icon} ${v.type}: ${v.description || v.path || ''}`);
          
          if (v.type === 'min_sources' && !v.pass) {
            console.log(`    Found ${v.count} sources, need ${v.threshold} for depth=${v.depth}`);
          }
          if (v.type === 'contains_headings' && v.missing?.length > 0) {
            console.log(`    Missing terms: ${v.missing.join(', ')}`);
          }
          if (v.type === 'file_exists_any_of') {
            for (const c of (v.checked || [])) {
              console.log(`    ${c.exists ? '✓' : '✗'} ${c.path}`);
            }
          }
        }
        
        if (result.attempt.artifacts.length > 0) {
          console.log('');
          console.log('Artifacts Hashed:');
          for (const a of result.attempt.artifacts) {
            console.log(`  ${a.path}`);
            console.log(`    sha256: ${a.sha256.substring(0, 16)}...`);
          }
        }
        
        return;
      }
      
      if (subcommand === 'fail') {
        const { run: runId, gate: gateCode, reason } = args;
        
        if (!runId || !gateCode || !reason) {
          console.error('Error: --run, --gate, and --reason are required');
          process.exit(1);
        }
        
        const result = failGate(runId, gateCode, reason);
        console.log(`❌ Gate ${gateCode} marked as FAILED`);
        console.log(`  Reason: ${reason}`);
        
        return;
      }
    }
    
    // AGENT commands (agents-runtime integration)
    if (command === 'agent') {
      if (subcommand === 'execute') {
        const { gate: gateCode, run: runId, slug: agentSlug } = args;
        
        if (!runId || !gateCode) {
          console.error('Error: --run and --gate are required');
          console.error('Usage: node cli.js agent execute --run <run-id> --gate <Gx>');
          process.exit(1);
        }
        
        // Load run to get context
        const { runRecord } = loadRun(runId);
        const slug = agentSlug || runRecord.workflow.slug;
        const artifactPath = runRecord.workflow.artifact_path;
        
        // Find gate definition from workflow
        const workflow = loadWorkflow(runRecord.workflow.name);
        const gateDef = workflow.gates.find(g => g.gate === gateCode);
        
        if (!gateDef) {
          console.error(`Gate ${gateCode} not found in workflow ${runRecord.workflow.name}`);
          process.exit(1);
        }
        
        // Load agents-runtime
        const { executeGate } = require('../agents-runtime');
        const { loadContract, getRequiredOutputs } = require('./lib/contract-loader');
        
        // Load contract for required outputs
        let requiredOutputs = [];
        try {
          const contract = loadContract(gateCode);
          const context = { slug, artifact_path: artifactPath };
          const outputs = getRequiredOutputs(contract, context);
          requiredOutputs = outputs.map(o => o.pathTemplate);
        } catch (e) {
          console.log(`Warning: Could not load contract for ${gateCode}: ${e.message}`);
        }
        
        // Start gate in run record
        const packetSha256 = hashString(`agent-execute-${gateCode}-${Date.now()}`);
        startGate(runId, gateCode, gateDef.agent, packetSha256);
        
        console.log('');
        console.log('═══════════════════════════════════════════════════════════════════════════════');
        console.log(`  AGENT EXECUTION: ${gateCode} — ${gateDef.name}`);
        console.log('═══════════════════════════════════════════════════════════════════════════════');
        console.log('');
        console.log(`  Agent:    ${gateDef.agent}`);
        console.log(`  Slug:     ${slug}`);
        console.log(`  Path:     ${artifactPath}`);
        console.log('');
        
        const projectRoot = path.resolve(__dirname, '..', '..');
        
        // Execute gate with real-time event logging
        const result = await executeGate({
          gateCode,
          gateName: gateDef.name,
          agentName: gateDef.agent,
          slug,
          artifactPath,
          projectRoot,
          requiredOutputs,
          onEvent: (event) => {
            switch (event.type) {
              case 'gate:config':
                console.log(`  Model:    ${event.model}`);
                console.log(`  Rounds:   max ${event.maxToolRounds}`);
                console.log('');
                break;
              case 'round:start':
                process.stdout.write(`  Round ${event.round}/${event.maxRounds}...`);
                break;
              case 'round:response':
                console.log(` ${event.stopReason} (in: ${event.inputTokens}, out: ${event.outputTokens})`);
                break;
              case 'tool:call':
                console.log(`    → ${event.tool}(${event.input.path || ''})`);
                break;
              case 'tool:result':
                if (!event.success) {
                  console.log(`    ✗ ${event.error}`);
                }
                break;
              case 'round:error':
                console.log(` ❌ ERROR: ${event.error}`);
                break;
              case 'budget:exceeded':
                console.log(`  ⚠️  Budget exceeded: ${event.metric} (${event.used}/${event.limit})`);
                break;
              case 'gate:complete':
                console.log('');
                console.log(`  ────────────────────────────────────────`);
                console.log(`  Status:      ${event.stopReason}`);
                console.log(`  Input:       ${event.totalInput.toLocaleString()} tokens`);
                console.log(`  Output:      ${event.totalOutput.toLocaleString()} tokens`);
                console.log(`  Rounds:      ${event.rounds}`);
                console.log(`  Files:       ${event.filesWritten} written`);
                console.log(`  Duration:    ${(event.durationMs / 1000).toFixed(1)}s`);
                break;
              case 'gate:error':
                console.error(`  ❌ Error: ${event.error}`);
                break;
            }
          }
        });
        
        // Record invocation in run record
        recordInvocation(runId, {
          gate: gateCode,
          agent: gateDef.agent,
          model: result.model,
          started_at: new Date(Date.now() - result.durationMs).toISOString(),
          finished_at: new Date().toISOString(),
          duration_ms: result.durationMs,
          status: result.completed ? 'SUCCESS' : 'FAIL',
          input_refs: [],
          output_refs: result.filesWritten.map(f => f.path)
        });
        
        // Run contract validations
        console.log('');
        console.log('  🔍 Running contract validations...');
        const validationResult = await finishGate(runId, gateCode);
        
        if (validationResult.pass) {
          console.log(`  ✅ Gate ${gateCode} PASSED`);
        } else {
          console.log(`  ❌ Gate ${gateCode} FAILED`);
          console.log(`     ${validationResult.attempt.failure_reason}`);
        }
        
        console.log('');
        for (const v of validationResult.results) {
          const icon = v.pass ? '✓' : '✗';
          console.log(`  ${icon} ${v.type}: ${v.description || v.path || ''}`);
        }
        
        return;
      }
      
      if (subcommand === 'run-workflow') {
        const { workflow: wfName, slug: wfSlug, 'artifact-path': wfArtifactPath, depth: wfDepth } = args;
        
        if (!wfSlug) {
          console.error('Error: --slug is required');
          console.error('Usage: node cli.js agent run-workflow --slug <slug> [--workflow visual-essay]');
          process.exit(1);
        }
        
        const workflowName = wfName || 'visual-essay';
        const artifactPath = wfArtifactPath || `${STANDARD_ESSAY_DIR}/${wfSlug}`;
        const depth = wfDepth || 'standard';
        const projectRoot = path.resolve(__dirname, '..', '..');
        
        // Load agents-runtime
        const { executeWorkflow } = require('../agents-runtime');
        
        console.log('');
        console.log('═══════════════════════════════════════════════════════════════════════════════');
        console.log('  AUTOMATED WORKFLOW EXECUTION');
        console.log('═══════════════════════════════════════════════════════════════════════════════');
        console.log('');
        console.log(`  Workflow:  ${workflowName}`);
        console.log(`  Slug:      ${wfSlug}`);
        console.log(`  Path:      ${artifactPath}`);
        console.log(`  Depth:     ${depth}`);
        console.log('');
        
        const workflowResult = await executeWorkflow({
          workflowName,
          slug: wfSlug,
          artifactPath,
          projectRoot,
          onEvent: (event) => {
            switch (event.type) {
              case 'workflow:start':
                console.log(`  Starting ${event.gates} gates...`);
                console.log('');
                break;
              case 'workflow:gate_queued':
                console.log(`  ┌── ${event.gate}: ${event.name}`);
                break;
              case 'gate:config':
                console.log(`  │   Model: ${event.model}`);
                break;
              case 'round:start':
                process.stdout.write(`  │   Round ${event.round}...`);
                break;
              case 'round:response':
                console.log(` ${event.stopReason} (${event.outputTokens} tokens)`);
                break;
              case 'tool:call':
                console.log(`  │   → ${event.tool}(${event.input.path || ''})`);
                break;
              case 'gate:complete':
                console.log(`  └── ${event.stopReason} (${event.rounds} rounds, ${(event.durationMs / 1000).toFixed(1)}s)`);
                console.log('');
                break;
              case 'workflow:complete':
                console.log('  ════════════════════════════════════════');
                console.log(`  Workflow complete: ${event.gatesCompleted}/${event.gatesTotal} gates`);
                console.log(`  Total input:  ${event.totalInput.toLocaleString()} tokens`);
                console.log(`  Total output: ${event.totalOutput.toLocaleString()} tokens`);
                console.log(`  Duration:     ${(event.durationMs / 1000).toFixed(0)}s`);
                break;
              case 'workflow:aborted':
                console.log(`  ⚠️  Workflow aborted at ${event.gate}: ${event.reason}`);
                break;
            }
          },
          onGateComplete: (gate, result) => {
            if (!result.completed) {
              console.log(`  ⚠️  Gate ${gate} did not complete: ${result.stopReason}`);
              // Continue anyway — let the validator catch it
            }
            return true;
          }
        });
        
        return;
      }
      
      if (subcommand === 'list-agents') {
        const { listAgents } = require('../agents-runtime');
        const agents = listAgents();
        
        console.log('Available agents:');
        console.log('');
        
        const categories = {};
        for (const agent of agents) {
          if (!categories[agent.category]) categories[agent.category] = [];
          categories[agent.category].push(agent);
        }
        
        for (const [category, categoryAgents] of Object.entries(categories)) {
          console.log(`  ${category}/`);
          for (const agent of categoryAgents) {
            console.log(`    - ${agent.name}`);
          }
        }
        
        return;
      }
      
      if (subcommand === 'config') {
        const { gate: gateCode } = args;
        const { getGateConfig } = require('../agents-runtime');
        
        if (gateCode) {
          const config = getGateConfig(gateCode);
          console.log(`Gate ${gateCode} configuration:`);
          console.log(JSON.stringify(config, null, 2));
        } else {
          const { loadRoutingTable } = require('../agents-runtime');
          const table = loadRoutingTable();
          console.log('Routing table:');
          console.log(JSON.stringify(table, null, 2));
        }
        
        return;
      }
    }
    
    // INVOCATION commands
    if (command === 'invocation') {
      if (subcommand === 'record') {
        const { run: runId, gate: gateCode, agent, status = 'SUCCESS' } = args;
        
        if (!runId || !gateCode || !agent) {
          console.error('Error: --run, --gate, and --agent are required');
          process.exit(1);
        }
        
        const invocationId = recordInvocation(runId, {
          gate: gateCode,
          agent,
          status
        });
        
        console.log(`✓ Invocation recorded: ${invocationId}`);
        
        return;
      }
    }
    
    // Unknown command
    console.error(`Unknown command: ${command} ${subcommand || ''}`);
    printUsage();
    process.exit(1);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
