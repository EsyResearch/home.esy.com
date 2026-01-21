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
  completeRun
} = require('./lib/run-manager');

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

function printUsage() {
  console.log(`
Orchestration Runner CLI

Usage:
  node cli.js <command> <subcommand> [options]

Commands:
  run start     Initialize a new run
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
  # Start a new run
  node cli.js run start --workflow visual-essay --slug the-word-robot --artifact-path src/app/essays/etymology/the-word-robot

  # Start G2 gate with research orchestrator
  node cli.js gate start --run run_20260119_the-word-robot_abc123 --gate G2 --agent research-orchestrator

  # Finish G2 gate (runs validations)
  node cli.js gate finish --run run_20260119_the-word-robot_abc123 --gate G2
`);
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
