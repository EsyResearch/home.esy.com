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
    --artifact-path <path>  Repo-relative path to essay directory (REQUIRED)
    --depth <mode>          Depth mode: quick|standard|deep (default: standard)
    --prompt-file <path>    Path to topic/prompt file (optional)

  run start     Initialize a new run (manual mode)
    --workflow <name>       Workflow name (e.g., visual-essay)
    --slug <slug>           Essay/project slug
    --artifact-path <path>  Repo-relative path to essay directory
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

Examples:
  # Run the full visual-essay pipeline (recommended)
  node cli.js run visual-essay --slug the-word-robot --artifact-path src/app/essays/etymology/the-word-robot --depth standard

  # Run with a prompt file
  node cli.js run visual-essay --slug the-word-robot --artifact-path src/app/essays/etymology/the-word-robot --prompt-file prompts/robot-topic.txt

  # Manual mode: Start a new run
  node cli.js run start --workflow visual-essay --slug the-word-robot --artifact-path src/app/essays/etymology/the-word-robot

  # Manual mode: Start G2 gate with research orchestrator
  node cli.js gate start --run run_20260119_the-word-robot_abc123 --gate G2 --agent research-orchestrator

  # Manual mode: Finish G2 gate (runs validations)
  node cli.js gate finish --run run_20260119_the-word-robot_abc123 --gate G2
`);
}

/**
 * Run the visual-essay pipeline in CI-style with human-in-the-loop execution
 */
async function runVisualEssayPipeline(options) {
  const { slug, artifactPath, depth, promptFile } = options;
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════════════════');
  console.log('  VISUAL ESSAY PIPELINE - CI Mode (Human-in-the-Loop)');
  console.log('═══════════════════════════════════════════════════════════════════════════════');
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
  
  console.log(`📁 Artifact path: ${artifactPath}`);
  console.log(`📊 Depth mode: ${depth}`);
  console.log('');
  
  // Load workflow definition
  const workflow = loadWorkflow('visual-essay');
  console.log(`🔄 Loaded workflow: ${workflow.workflow} (${workflow.gates.length} gates)`);
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
  
  // Process each gate
  for (const gateDef of workflow.gates) {
    const gateCode = gateDef.gate;
    
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
      const icon = v.pass ? '✓' : (v.warning ? '⚠' : '✗');
      console.log(`  ${icon} ${v.type}: ${v.description || v.path || ''}`);
      
      if (v.type === 'min_sources' && !v.pass) {
        console.log(`    Found ${v.count} sources, need ${v.threshold} for depth=${v.depth}`);
      }
      if (v.type === 'contains_headings' && v.missing?.length > 0) {
        console.log(`    Missing: ${v.missing.join(', ')}`);
      }
      if (v.type === 'file_exists_any_of' && !v.pass) {
        console.log(`    Checked: ${v.checked.map(c => `${c.path} (${c.exists ? 'exists' : 'missing'})`).join(', ')}`);
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
      console.log(`  2. Run: node orchestration/runner/cli.js run visual-essay --slug ${slug} --artifact-path ${artifactPath} --depth ${depth}`);
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
        const { slug, 'artifact-path': artifactPath, depth = 'standard', 'prompt-file': promptFile } = args;
        
        if (!slug || !artifactPath) {
          console.error('Error: --slug and --artifact-path are required');
          process.exit(1);
        }
        
        await runVisualEssayPipeline({ slug, artifactPath, depth, promptFile });
        return;
      }
      
      if (subcommand === 'start') {
        const { workflow, slug, 'artifact-path': artifactPath, depth } = args;
        
        if (!workflow || !slug || !artifactPath) {
          console.error('Error: --workflow, --slug, and --artifact-path are required');
          process.exit(1);
        }
        
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
          const icon = v.pass ? '✓' : (v.warning ? '⚠' : '✗');
          console.log(`  ${icon} ${v.type}: ${v.description || v.path || ''}`);
          
          if (v.type === 'min_sources' && !v.pass) {
            console.log(`    Found ${v.count} sources, need ${v.threshold} for depth=${v.depth}`);
          }
          if (v.type === 'contains_headings' && v.missing?.length > 0) {
            console.log(`    Missing: ${v.missing.join(', ')}`);
          }
          if (v.type === 'file_exists_any_of' && !v.pass) {
            console.log(`    Checked: ${v.checked.map(c => `${c.path} (${c.exists ? 'exists' : 'missing'})`).join(', ')}`);
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
