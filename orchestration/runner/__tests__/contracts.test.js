/**
 * Contract schema validation tests
 * 
 * Ensures every .contract.json file:
 * 1. Is valid JSON
 * 2. Has required fields (gate, name, required_outputs)
 * 3. References only IMPLEMENTED validation types
 * 4. Has valid path templates (no unresolvable variables)
 * 5. Maps to an entry in the workflow
 * 
 * Run: node --test orchestration/runner/__tests__/contracts.test.js
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const CONTRACTS_DIR = path.join(REPO_ROOT, 'orchestration', 'gates', 'contracts');
const WORKFLOW_PATH = path.join(REPO_ROOT, 'orchestration', 'runner', 'workflows', 'visual-essay.json');

// These are the validation types actually implemented in validator.js
const IMPLEMENTED_VALIDATION_TYPES = new Set([
  'file_exists',
  'dir_exists',
  'min_file_count',
  'min_sources',
  'min_sources_any_of',
  'contains_headings',
  'contains_text',
  'not_contains',
  'frontmatter_status',
  'regex_match',
  'min_regex_count',
  'url_reachable',
]);

// Valid path template variables
const VALID_PATH_VARIABLES = new Set([
  '{slug}',
  '{artifact_path}',
  '{client_component}',
]);

// --- Helpers ---

function loadAllContracts() {
  const files = fs.readdirSync(CONTRACTS_DIR).filter(f => f.endsWith('.contract.json'));
  return files.map(f => {
    const filePath = path.join(CONTRACTS_DIR, f);
    const content = fs.readFileSync(filePath, 'utf8');
    return { file: f, path: filePath, contract: JSON.parse(content) };
  });
}

function loadWorkflow() {
  const content = fs.readFileSync(WORKFLOW_PATH, 'utf8');
  return JSON.parse(content);
}

// --- Tests ---

describe('Contract JSON validity', () => {
  const contractFiles = fs.readdirSync(CONTRACTS_DIR).filter(f => f.endsWith('.contract.json'));
  
  for (const file of contractFiles) {
    it(`${file} is valid JSON`, () => {
      const content = fs.readFileSync(path.join(CONTRACTS_DIR, file), 'utf8');
      assert.doesNotThrow(() => JSON.parse(content), `${file} is not valid JSON`);
    });
  }
});

describe('Contract required fields', () => {
  const contracts = loadAllContracts();
  
  for (const { file, contract } of contracts) {
    it(`${file} has required "gate" field`, () => {
      assert.ok(contract.gate, `${file} missing "gate" field`);
    });

    it(`${file} has required "name" field`, () => {
      assert.ok(contract.name, `${file} missing "name" field`);
    });

    it(`${file} has required "required_outputs" field`, () => {
      assert.ok(contract.required_outputs, `${file} missing "required_outputs" field`);
    });

    it(`${file} has at least one output (all_of or any_of)`, () => {
      const outputs = contract.required_outputs;
      const hasOutputs = (outputs.all_of && outputs.all_of.length > 0) ||
                         (outputs.any_of && outputs.any_of.length > 0);
      assert.ok(hasOutputs, `${file} has no outputs defined`);
    });

    it(`${file} gate code matches filename`, () => {
      const expectedGate = file.replace('.contract.json', '');
      assert.equal(contract.gate, expectedGate, 
        `${file} gate "${contract.gate}" doesn't match filename "${expectedGate}"`);
    });
  }
});

describe('Contract validation types are implemented', () => {
  const contracts = loadAllContracts();
  
  for (const { file, contract } of contracts) {
    if (!contract.validations) continue;
    
    for (const validation of contract.validations) {
      it(`${file} validation type "${validation.type}" is implemented`, () => {
        assert.ok(
          IMPLEMENTED_VALIDATION_TYPES.has(validation.type),
          `${file} uses validation type "${validation.type}" which is NOT implemented in validator.js. ` +
          `Implemented types: ${[...IMPLEMENTED_VALIDATION_TYPES].join(', ')}`
        );
      });
    }
  }
});

describe('Contract path templates use valid variables', () => {
  const contracts = loadAllContracts();
  const variablePattern = /\{[^}]+\}/g;
  
  function checkPath(filePath, contractFile, pathStr) {
    const variables = pathStr.match(variablePattern) || [];
    for (const variable of variables) {
      it(`${contractFile} path "${pathStr}" variable "${variable}" is valid`, () => {
        assert.ok(
          VALID_PATH_VARIABLES.has(variable),
          `${contractFile} uses unknown path variable "${variable}" in "${pathStr}". ` +
          `Valid variables: ${[...VALID_PATH_VARIABLES].join(', ')}`
        );
      });
    }
  }
  
  for (const { file, contract } of contracts) {
    const outputs = contract.required_outputs;
    
    if (outputs.all_of) {
      for (const output of outputs.all_of) {
        checkPath(file, file, output.path);
      }
    }
    if (outputs.any_of) {
      for (const output of outputs.any_of) {
        checkPath(file, file, output.path);
      }
    }
    
    if (contract.validations) {
      for (const v of contract.validations) {
        if (v.target && typeof v.target === 'string' && 
            v.target !== 'any_of' && v.target !== 'all_required') {
          checkPath(file, file, v.target);
        }
        if (v.targets && Array.isArray(v.targets)) {
          for (const t of v.targets) {
            checkPath(file, file, t);
          }
        }
      }
    }
  }
});

describe('Workflow references valid contracts', () => {
  const workflow = loadWorkflow();
  const contractFiles = new Set(
    fs.readdirSync(CONTRACTS_DIR)
      .filter(f => f.endsWith('.contract.json'))
      .map(f => f.replace('.contract.json', ''))
  );
  
  for (const gate of workflow.gates) {
    it(`workflow gate ${gate.gate} has a matching contract file`, () => {
      assert.ok(
        contractFiles.has(gate.gate),
        `Workflow references gate "${gate.gate}" but no ${gate.gate}.contract.json exists`
      );
    });
    
    it(`workflow gate ${gate.gate} has a contract path that exists`, () => {
      const contractPath = path.join(REPO_ROOT, gate.contract);
      assert.ok(
        fs.existsSync(contractPath),
        `Workflow gate "${gate.gate}" contract path "${gate.contract}" does not exist`
      );
    });
  }
});

describe('All contracts are in the workflow', () => {
  const workflow = loadWorkflow();
  const workflowGates = new Set(workflow.gates.map(g => g.gate));
  const contracts = loadAllContracts();
  
  for (const { file, contract } of contracts) {
    it(`contract ${contract.gate} is referenced in the workflow`, () => {
      assert.ok(
        workflowGates.has(contract.gate),
        `Contract ${file} (gate ${contract.gate}) exists but is NOT in the visual-essay.json workflow`
      );
    });
  }
});

describe('not_contains validations target resolvable paths', () => {
  const contracts = loadAllContracts();
  
  for (const { file, contract } of contracts) {
    if (!contract.validations) continue;
    
    const notContainsValidations = contract.validations.filter(v => v.type === 'not_contains');
    
    for (const v of notContainsValidations) {
      it(`${file} not_contains target "${v.target}" is a resolvable path (not "any_of")`, () => {
        // not_contains should target a specific file path, not the abstract "any_of"
        assert.notEqual(v.target, 'any_of', 
          `${file} has not_contains targeting "any_of" — this is invalid. ` +
          `not_contains must target a specific file path (the resolveAnyOfTarget helper handles resolution).`
        );
      });
    }
  }
});

describe('contains_text validations have patterns', () => {
  const contracts = loadAllContracts();
  
  for (const { file, contract } of contracts) {
    if (!contract.validations) continue;
    
    const containsValidations = contract.validations.filter(v => v.type === 'contains_text');
    
    for (const v of containsValidations) {
      it(`${file} contains_text has patterns defined`, () => {
        const hasPatterns = (v.patterns && v.patterns.length > 0) || v.pattern;
        assert.ok(hasPatterns, 
          `${file} has contains_text validation without patterns`
        );
      });
    }
  }
});

describe('frontmatter_status validations have checks', () => {
  const contracts = loadAllContracts();
  
  for (const { file, contract } of contracts) {
    if (!contract.validations) continue;
    
    const fmValidations = contract.validations.filter(v => v.type === 'frontmatter_status');
    
    for (const v of fmValidations) {
      it(`${file} frontmatter_status has checks defined`, () => {
        assert.ok(v.checks && Object.keys(v.checks).length > 0, 
          `${file} has frontmatter_status validation without checks`
        );
      });
    }
  }
});

describe('min_regex_count validations have regex and min_count', () => {
  const contracts = loadAllContracts();
  
  for (const { file, contract } of contracts) {
    if (!contract.validations) continue;
    
    const mrcValidations = contract.validations.filter(v => v.type === 'min_regex_count');
    
    for (const v of mrcValidations) {
      it(`${file} min_regex_count has regex defined`, () => {
        assert.ok(v.regex, `${file} has min_regex_count validation without regex field`);
      });

      it(`${file} min_regex_count regex "${v.regex}" is valid`, () => {
        assert.doesNotThrow(() => {
          new RegExp(v.regex, 'gm');
        }, `${file} regex "${v.regex}" is not a valid regular expression`);
      });

      it(`${file} min_regex_count has min_count > 0`, () => {
        assert.ok(typeof v.min_count === 'number' && v.min_count > 0,
          `${file} has min_regex_count without a valid min_count (got ${v.min_count})`);
      });
    }
  }
});

describe('url_reachable validations have valid config', () => {
  const contracts = loadAllContracts();
  
  for (const { file, contract } of contracts) {
    if (!contract.validations) continue;
    
    const urValidations = contract.validations.filter(v => v.type === 'url_reachable');
    
    for (const v of urValidations) {
      if (v.url_pattern) {
        it(`${file} url_reachable url_pattern "${v.url_pattern}" is a valid regex`, () => {
          assert.doesNotThrow(() => {
            new RegExp(v.url_pattern, 'g');
          }, `${file} url_pattern "${v.url_pattern}" is not a valid regular expression`);
        });
      }

      if (v.max_failures !== undefined) {
        it(`${file} url_reachable max_failures is a non-negative number`, () => {
          assert.ok(typeof v.max_failures === 'number' && v.max_failures >= 0,
            `${file} url_reachable max_failures must be >= 0 (got ${v.max_failures})`);
        });
      }

      if (v.sample_size !== undefined) {
        it(`${file} url_reachable sample_size is a positive number`, () => {
          assert.ok(typeof v.sample_size === 'number' && v.sample_size > 0,
            `${file} url_reachable sample_size must be > 0 (got ${v.sample_size})`);
        });
      }
    }
  }
});

describe('required_skills have valid structure', () => {
  const contracts = loadAllContracts();
  
  for (const { file, contract } of contracts) {
    if (!contract.required_skills) continue;
    
    for (const skill of contract.required_skills) {
      it(`${file} required_skill has path`, () => {
        assert.ok(typeof skill.path === 'string' && skill.path.length > 0,
          `${file} required_skill missing "path" field`);
      });

      it(`${file} required_skill has inject array`, () => {
        assert.ok(Array.isArray(skill.inject) && skill.inject.length > 0,
          `${file} required_skill missing or empty "inject" array`);
      });

      it(`${file} required_skill path "${skill.path}" exists on disk`, () => {
        const skillDir = path.join(REPO_ROOT, skill.path);
        assert.ok(fs.existsSync(skillDir),
          `${file} required_skill path "${skill.path}" does not exist`);
      });

      for (const injectFile of skill.inject) {
        it(`${file} required_skill inject file "${injectFile}" exists`, () => {
          const filePath = path.join(REPO_ROOT, skill.path, injectFile);
          assert.ok(fs.existsSync(filePath),
            `${file} inject file "${skill.path}/${injectFile}" does not exist`);
        });
      }
    }
  }
});

describe('regex_match validations have regex', () => {
  const contracts = loadAllContracts();
  
  for (const { file, contract } of contracts) {
    if (!contract.validations) continue;
    
    const regexValidations = contract.validations.filter(v => v.type === 'regex_match');
    
    for (const v of regexValidations) {
      it(`${file} regex_match has regex defined`, () => {
        assert.ok(v.regex, `${file} has regex_match validation without regex field`);
      });

      it(`${file} regex_match regex "${v.regex}" is valid`, () => {
        assert.doesNotThrow(() => {
          const flags = v.regex.includes('\\u{') ? 'gmu' : 'gm';
          new RegExp(v.regex, flags);
        }, `${file} regex "${v.regex}" is not a valid regular expression`);
      });
    }
  }
});
