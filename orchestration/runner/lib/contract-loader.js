/**
 * Contract loading and path resolution
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const CONTRACTS_DIR = path.join(REPO_ROOT, 'orchestration', 'gates', 'contracts');

/**
 * Load a gate contract
 * @param {string} gateCode - Gate code (e.g., "G1", "G2", "G3")
 * @returns {object} Parsed contract object
 */
function loadContract(gateCode) {
  const contractPath = path.join(CONTRACTS_DIR, `${gateCode}.contract.json`);
  
  if (!fs.existsSync(contractPath)) {
    throw new Error(`Contract not found: ${contractPath}`);
  }
  
  const content = fs.readFileSync(contractPath, 'utf8');
  return JSON.parse(content);
}

/**
 * Resolve path variables in a contract path
 * @param {string} pathTemplate - Path with variables like {slug}, {artifact_path}
 * @param {object} context - Variable values { slug, artifact_path }
 * @returns {string} Resolved absolute path
 */
function resolvePath(pathTemplate, context) {
  let resolved = pathTemplate;
  
  // Replace variables
  if (context.slug) {
    resolved = resolved.replace(/\{slug\}/g, context.slug);
  }
  if (context.artifact_path) {
    resolved = resolved.replace(/\{artifact_path\}/g, context.artifact_path);
  }
  
  // If path starts with orchestration/, resolve from repo root
  // Otherwise it's already an artifact-relative path that got resolved via artifact_path
  if (resolved.startsWith('orchestration/') || resolved.startsWith('src/')) {
    return path.join(REPO_ROOT, resolved);
  }
  
  // For paths that don't start with known prefixes, assume already resolved
  return path.join(REPO_ROOT, resolved);
}

/**
 * Get all output paths from a contract for validation
 * @param {object} contract - Contract object
 * @param {object} context - Variable values { slug, artifact_path, depth }
 * @returns {Array<{path: string, required: boolean, description: string}>}
 */
function getRequiredOutputs(contract, context) {
  const outputs = [];
  const requiredOutputs = contract.required_outputs;
  
  if (requiredOutputs.any_of) {
    // For any_of, mark all as optional but track that at least one is needed
    requiredOutputs.any_of.forEach(output => {
      outputs.push({
        path: resolvePath(output.path, context),
        pathTemplate: output.path,
        required: false, // Individual items are optional, but one must exist
        anyOf: true,
        description: output.description
      });
    });
  }
  
  if (requiredOutputs.all_of) {
    requiredOutputs.all_of.forEach(output => {
      // Check depth-based requirements
      let isRequired = output.required !== false;
      
      if (output.required_for_depth && context.depth) {
        isRequired = output.required_for_depth.includes(context.depth);
      }
      if (output.optional_for_depth && context.depth) {
        if (output.optional_for_depth.includes(context.depth)) {
          isRequired = false;
        }
      }
      
      outputs.push({
        path: resolvePath(output.path, context),
        pathTemplate: output.path,
        required: isRequired,
        description: output.description
      });
    });
  }
  
  return outputs;
}

/**
 * Get validation specs from a contract
 * @param {object} contract - Contract object
 * @param {object} context - Variable values { slug, artifact_path, depth }
 * @returns {Array} Validation specifications
 */
function getValidations(contract, context) {
  if (!contract.validations) return [];
  
  return contract.validations.map(v => {
    const validation = { ...v };
    
    // Resolve target path if present
    if (validation.target && typeof validation.target === 'string' && 
        validation.target !== 'any_of' && validation.target !== 'all_required') {
      validation.resolvedTarget = resolvePath(validation.target, context);
    }
    
    // Resolve targets array if present (for min_sources_any_of etc.)
    if (validation.targets && Array.isArray(validation.targets)) {
      validation.resolvedTargets = validation.targets.map(t => resolvePath(t, context));
    }
    
    return validation;
  });
}

module.exports = {
  loadContract,
  resolvePath,
  getRequiredOutputs,
  getValidations,
  REPO_ROOT,
  CONTRACTS_DIR
};
