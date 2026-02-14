/**
 * Tests for agents-runtime tools (read_file, write_file, list_directory)
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const readFile = require('../tools/read-file');
const writeFile = require('../tools/write-file');
const listDir = require('../tools/list-directory');
const { getToolDefinitions, executeTool } = require('../tools');

// Create a temp directory for tests
let tmpDir;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agents-runtime-test-'));
  // Create test files
  fs.writeFileSync(path.join(tmpDir, 'test.txt'), 'hello world');
  fs.mkdirSync(path.join(tmpDir, 'subdir'));
  fs.writeFileSync(path.join(tmpDir, 'subdir', 'nested.txt'), 'nested content');
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe('read_file', () => {
  test('has valid tool definition', () => {
    expect(readFile.definition.name).toBe('read_file');
    expect(readFile.definition.input_schema.required).toContain('path');
  });

  test('reads existing file', () => {
    const result = readFile.execute(
      { path: 'test.txt' },
      { projectRoot: tmpDir }
    );
    expect(result.success).toBe(true);
    expect(result.content).toBe('hello world');
  });

  test('reads nested file', () => {
    const result = readFile.execute(
      { path: 'subdir/nested.txt' },
      { projectRoot: tmpDir }
    );
    expect(result.success).toBe(true);
    expect(result.content).toBe('nested content');
  });

  test('fails on missing file', () => {
    const result = readFile.execute(
      { path: 'nonexistent.txt' },
      { projectRoot: tmpDir }
    );
    expect(result.success).toBe(false);
    expect(result.error).toContain('not found');
  });

  test('fails on missing path parameter', () => {
    const result = readFile.execute({}, { projectRoot: tmpDir });
    expect(result.success).toBe(false);
    expect(result.error).toContain('Missing');
  });

  test('rejects paths outside project root', () => {
    const result = readFile.execute(
      { path: '/etc/passwd' },
      { projectRoot: tmpDir }
    );
    expect(result.success).toBe(false);
    expect(result.error).toContain('Access denied');
  });

  test('rejects directory reads', () => {
    const result = readFile.execute(
      { path: 'subdir' },
      { projectRoot: tmpDir }
    );
    expect(result.success).toBe(false);
    expect(result.error).toContain('Not a file');
  });

  test('respects allowedPaths', () => {
    const result = readFile.execute(
      { path: 'test.txt' },
      { projectRoot: tmpDir, allowedPaths: ['subdir/'] }
    );
    expect(result.success).toBe(false);
    expect(result.error).toContain('Access denied');
  });

  test('allows reads within allowedPaths', () => {
    const result = readFile.execute(
      { path: 'subdir/nested.txt' },
      { projectRoot: tmpDir, allowedPaths: ['subdir/'] }
    );
    expect(result.success).toBe(true);
  });
});

describe('write_file', () => {
  test('has valid tool definition', () => {
    expect(writeFile.definition.name).toBe('write_file');
    expect(writeFile.definition.input_schema.required).toContain('path');
    expect(writeFile.definition.input_schema.required).toContain('content');
  });

  test('writes new file', () => {
    const result = writeFile.execute(
      { path: 'new-file.txt', content: 'new content' },
      { projectRoot: tmpDir }
    );
    expect(result.success).toBe(true);
    expect(result.bytesWritten).toBeGreaterThan(0);
    expect(fs.readFileSync(path.join(tmpDir, 'new-file.txt'), 'utf8')).toBe('new content');
  });

  test('overwrites existing file', () => {
    const result = writeFile.execute(
      { path: 'test.txt', content: 'overwritten' },
      { projectRoot: tmpDir }
    );
    expect(result.success).toBe(true);
    expect(fs.readFileSync(path.join(tmpDir, 'test.txt'), 'utf8')).toBe('overwritten');
  });

  test('creates parent directories', () => {
    const result = writeFile.execute(
      { path: 'deep/nested/dir/file.txt', content: 'deep content' },
      { projectRoot: tmpDir }
    );
    expect(result.success).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, 'deep', 'nested', 'dir', 'file.txt'))).toBe(true);
  });

  test('fails on missing path', () => {
    const result = writeFile.execute(
      { content: 'content' },
      { projectRoot: tmpDir }
    );
    expect(result.success).toBe(false);
  });

  test('fails on missing content', () => {
    const result = writeFile.execute(
      { path: 'file.txt' },
      { projectRoot: tmpDir }
    );
    expect(result.success).toBe(false);
  });

  test('rejects paths outside project root', () => {
    const result = writeFile.execute(
      { path: '/tmp/evil-file.txt', content: 'bad' },
      { projectRoot: tmpDir }
    );
    expect(result.success).toBe(false);
    expect(result.error).toContain('Access denied');
  });

  test('rejects writing to node_modules', () => {
    const result = writeFile.execute(
      { path: 'node_modules/bad.js', content: 'bad' },
      { projectRoot: tmpDir }
    );
    expect(result.success).toBe(false);
    expect(result.error).toContain('not allowed');
  });

  test('rejects writing to .env', () => {
    const result = writeFile.execute(
      { path: '.env', content: 'SECRET=bad' },
      { projectRoot: tmpDir }
    );
    expect(result.success).toBe(false);
    expect(result.error).toContain('not allowed');
  });

  test('rejects writing to package.json', () => {
    const result = writeFile.execute(
      { path: 'package.json', content: '{}' },
      { projectRoot: tmpDir }
    );
    expect(result.success).toBe(false);
    expect(result.error).toContain('not allowed');
  });
});

describe('list_directory', () => {
  test('has valid tool definition', () => {
    expect(listDir.definition.name).toBe('list_directory');
  });

  test('lists directory contents', () => {
    const result = listDir.execute(
      { path: '.' },
      { projectRoot: tmpDir }
    );
    expect(result.success).toBe(true);
    expect(result.entries).toBeDefined();
    
    const names = result.entries.map(e => e.name);
    expect(names).toContain('test.txt');
    expect(names).toContain('subdir');
  });

  test('directories come before files', () => {
    const result = listDir.execute(
      { path: '.' },
      { projectRoot: tmpDir }
    );
    const types = result.entries.map(e => e.type);
    const lastDirIndex = types.lastIndexOf('directory');
    const firstFileIndex = types.indexOf('file');
    
    if (lastDirIndex >= 0 && firstFileIndex >= 0) {
      expect(lastDirIndex).toBeLessThan(firstFileIndex);
    }
  });

  test('fails on missing directory', () => {
    const result = listDir.execute(
      { path: 'nonexistent' },
      { projectRoot: tmpDir }
    );
    expect(result.success).toBe(false);
  });

  test('fails on file path', () => {
    const result = listDir.execute(
      { path: 'test.txt' },
      { projectRoot: tmpDir }
    );
    expect(result.success).toBe(false);
    expect(result.error).toContain('Not a directory');
  });

  test('hides dotfiles', () => {
    fs.writeFileSync(path.join(tmpDir, '.hidden'), 'hidden');
    const result = listDir.execute(
      { path: '.' },
      { projectRoot: tmpDir }
    );
    const names = result.entries.map(e => e.name);
    expect(names).not.toContain('.hidden');
  });
});

describe('tool registry', () => {
  test('getToolDefinitions returns all tools', () => {
    const defs = getToolDefinitions();
    expect(defs.length).toBe(3);
    
    const names = defs.map(d => d.name);
    expect(names).toContain('read_file');
    expect(names).toContain('write_file');
    expect(names).toContain('list_directory');
  });

  test('getToolDefinitions filters by name', () => {
    const defs = getToolDefinitions(['read_file']);
    expect(defs.length).toBe(1);
    expect(defs[0].name).toBe('read_file');
  });

  test('getToolDefinitions throws on unknown tool', () => {
    expect(() => getToolDefinitions(['nonexistent'])).toThrow('Unknown tool');
  });

  test('executeTool dispatches correctly', () => {
    const result = executeTool('read_file', { path: 'test.txt' }, { projectRoot: tmpDir });
    expect(result.success).toBe(true);
    expect(result.content).toBe('hello world');
  });

  test('executeTool returns error for unknown tool', () => {
    const result = executeTool('nonexistent', {}, { projectRoot: tmpDir });
    expect(result.success).toBe(false);
    expect(result.error).toContain('Unknown tool');
  });
});
