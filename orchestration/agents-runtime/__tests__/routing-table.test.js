/**
 * Tests for routing table and executor configuration
 */

const fs = require('fs');
const path = require('path');
const { getGateConfig, loadRoutingTable } = require('../executor');

describe('routing table', () => {
  let table;

  beforeAll(() => {
    table = loadRoutingTable();
  });

  test('loads without error', () => {
    expect(table).toBeTruthy();
    expect(table._version).toBe('1.0.0');
  });

  test('has defaults section', () => {
    expect(table.defaults).toBeTruthy();
    expect(table.defaults.model).toBeTruthy();
    expect(table.defaults.max_input_tokens).toBeGreaterThan(0);
    expect(table.defaults.max_output_tokens).toBeGreaterThan(0);
    expect(table.defaults.max_tool_rounds).toBeGreaterThan(0);
  });

  test('has gates section', () => {
    expect(table.gates).toBeTruthy();
    expect(Object.keys(table.gates).length).toBeGreaterThan(0);
  });

  test('every gate has a valid model', () => {
    const validModels = Object.values(table._models);
    for (const [gate, config] of Object.entries(table.gates)) {
      expect(validModels).toContain(config.model);
    }
  });

  test('every gate has a rationale', () => {
    for (const [gate, config] of Object.entries(table.gates)) {
      expect(config.rationale).toBeTruthy();
    }
  });

  test('has budget section', () => {
    expect(table.budget).toBeTruthy();
    expect(table.budget.max_run_input_tokens).toBeGreaterThan(0);
    expect(table.budget.max_run_output_tokens).toBeGreaterThan(0);
  });

  test('G5 uses Opus (production gate)', () => {
    expect(table.gates.G5.model).toContain('opus');
  });

  test('G1 uses Haiku (simple intake)', () => {
    expect(table.gates.G1.model).toContain('haiku');
  });

  test('audit gates use Sonnet', () => {
    const auditGates = ['G5.2', 'G5.3', 'G5.4', 'G6'];
    for (const gate of auditGates) {
      if (table.gates[gate]) {
        expect(table.gates[gate].model).toContain('sonnet');
      }
    }
  });
});

describe('getGateConfig', () => {
  test('returns merged config for known gate', () => {
    const config = getGateConfig('G5');
    expect(config.model).toContain('opus');
    expect(config.max_input_tokens).toBeGreaterThan(0);
    expect(config.max_output_tokens).toBeGreaterThan(0);
    expect(config.max_tool_rounds).toBeGreaterThan(0);
    expect(config.tools).toBeDefined();
  });

  test('returns defaults for unknown gate', () => {
    const config = getGateConfig('G99');
    const table = loadRoutingTable();
    expect(config.model).toBe(table.defaults.model);
  });

  test('gate-specific values override defaults', () => {
    const table = loadRoutingTable();
    const config = getGateConfig('G1');
    expect(config.model).not.toBe(table.defaults.model); // G1 uses Haiku, not default Sonnet
  });
});
