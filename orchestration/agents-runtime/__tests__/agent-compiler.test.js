/**
 * Tests for agent-compiler module
 */

const { findAgentFile, compileAgent, listAgents } = require('../agent-compiler');

describe('findAgentFile', () => {
  test('finds agent in content directory', () => {
    const file = findAgentFile('data-journalist-writer-expert');
    expect(file).toBeTruthy();
    expect(file).toContain('data-journalist-writer-expert.md');
  });

  test('finds agent in auditors directory', () => {
    // Check if any auditor exists
    const agents = listAgents();
    const auditor = agents.find(a => a.category === 'auditors');
    if (auditor) {
      const file = findAgentFile(auditor.name);
      expect(file).toBeTruthy();
    }
  });

  test('returns null for nonexistent agent', () => {
    const file = findAgentFile('totally-fake-agent-that-does-not-exist');
    expect(file).toBeNull();
  });
});

describe('compileAgent', () => {
  test('compiles agent with basic context', () => {
    const agents = listAgents();
    if (agents.length === 0) {
      console.warn('No agents found — skipping compileAgent test');
      return;
    }

    const systemPrompt = compileAgent(agents[0].name, {
      gateCode: 'G5',
      gateName: 'Content Complete',
      slug: 'test-essay',
      artifactPath: 'src/app/essays/test-essay/',
      requiredOutputs: ['page.tsx', 'TestClient.tsx']
    });

    // Should include the agent markdown content
    expect(systemPrompt).toBeTruthy();
    expect(systemPrompt.length).toBeGreaterThan(500);

    // Should include gate context
    expect(systemPrompt).toContain('G5');
    expect(systemPrompt).toContain('Content Complete');
    expect(systemPrompt).toContain('test-essay');

    // Should include tool instructions
    expect(systemPrompt).toContain('read_file');
    expect(systemPrompt).toContain('write_file');

    // Should include output constraints
    expect(systemPrompt).toContain('No emoji');
    expect(systemPrompt).toContain('ArtifactDetailWrapper');
  });

  test('compiles agent without gate context', () => {
    const agents = listAgents();
    if (agents.length === 0) return;

    const systemPrompt = compileAgent(agents[0].name);
    expect(systemPrompt).toBeTruthy();
    // Should NOT include gate context section
    expect(systemPrompt).not.toContain('Current Gate Assignment');
  });

  test('throws for nonexistent agent', () => {
    expect(() => compileAgent('nonexistent-agent-xyz')).toThrow('Agent not found');
  });
});

describe('listAgents', () => {
  test('returns array of agents', () => {
    const agents = listAgents();
    expect(Array.isArray(agents)).toBe(true);
    expect(agents.length).toBeGreaterThan(0);
  });

  test('agents have required fields', () => {
    const agents = listAgents();
    for (const agent of agents) {
      expect(agent.name).toBeTruthy();
      expect(agent.path).toBeTruthy();
      expect(agent.category).toBeTruthy();
    }
  });

  test('includes agents from multiple categories', () => {
    const agents = listAgents();
    const categories = new Set(agents.map(a => a.category));
    // Should have at least 2 categories
    expect(categories.size).toBeGreaterThanOrEqual(2);
  });
});
