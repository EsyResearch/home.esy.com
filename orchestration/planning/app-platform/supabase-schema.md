# Supabase Schema: app.esy.com

> Database tables, relationships, indexes, and RLS policies for the orchestration platform.

## Entity Relationship Overview

```
profiles (Supabase Auth extension)
  │
  ├──< runs
  │     ├──< gate_executions
  │     │     └──< artifacts
  │     └── spec_id →── specs
  │                      └── template_id →── workflow_templates
  │
  └── models (standalone reference table)
```

---

## Tables

### 1. `profiles`

Extends Supabase Auth. Stores user metadata and role.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'display_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

---

### 2. `workflow_templates`

The templates users browse at `/workflows`. Each template defines a type of content that can be produced.

```sql
CREATE TABLE workflow_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,                    -- 'typographic-etymology'
  name TEXT NOT NULL,                           -- 'Typographic / Etymology Visual Essay'
  description TEXT,
  type TEXT NOT NULL,                           -- 'visual-essay', 'infographic', 'research'
  depth TEXT NOT NULL DEFAULT 'standard',       -- 'quick', 'standard', 'deep'
  tags TEXT[] DEFAULT '{}',                     -- ['visual-essay', 'etymology']
  
  -- What the user sees
  what_you_get JSONB DEFAULT '[]',             -- ["Multi-chapter visual essay", "Historical timeline", ...]
  estimated_time TEXT,                          -- '3-5 min'
  step_count INTEGER,                          -- 10
  
  -- Display
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  
  -- Metadata
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_templates_slug ON workflow_templates(slug);
CREATE INDEX idx_templates_type ON workflow_templates(type);
CREATE INDEX idx_templates_active ON workflow_templates(is_active) WHERE is_active = true;
```

---

### 3. `specs`

Versioned execution contracts tied to templates. A spec defines exactly how a workflow runs: stages, models, QA checks, constraints.

```sql
CREATE TABLE specs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID NOT NULL REFERENCES workflow_templates(id),
  version TEXT NOT NULL,                        -- 'v1.0.0'
  version_hash TEXT,                            -- 'sha256-etymology-v1-...'
  
  -- Intent schema (what inputs the user provides)
  intent_schema JSONB NOT NULL DEFAULT '[]',
  -- Example: [
  --   { "field": "word", "type": "string", "required": true, "description": "The word to research" },
  --   { "field": "angle", "type": "enum", "options": ["etymology","cultural","linguistic","historical"], "default": "etymology" },
  --   { "field": "audience", "type": "enum", "options": ["academic","general","expert"], "default": "general" },
  --   { "field": "length", "type": "enum", "options": ["6min","12min","20min"], "default": "12min" }
  -- ]
  
  -- Pipeline stages (ordered sequence of agent invocations)
  stages JSONB NOT NULL DEFAULT '[]',
  -- Example: [
  --   {
  --     "order": 1, "id": "stage-intent-parse", "name": "Intent Parsing",
  --     "type": "analysis", "agent": "intent-parser",
  --     "model_id": "claude-haiku-3.5",
  --     "inputs": [{"name": "word", "source": "intent"}, {"name": "angle", "source": "intent"}],
  --     "outputs": [{"name": "parsed_intent", "type": "structured"}, {"name": "search_terms", "type": "data"}],
  --     "constraints": ["format: structured_json"],
  --     "estimated_time": "5-10s", "estimated_tokens": 800
  --   },
  --   ...
  -- ]
  
  -- QA configuration
  qa_config JSONB NOT NULL DEFAULT '{}',
  -- Example: {
  --   "total_checks": 6,
  --   "min_pass_rate": 0.9,
  --   "block_on_critical": true,
  --   "generate_report": true,
  --   "checks": [
  --     { "name": "Citation Validity", "severity": "critical", "required": true },
  --     { "name": "Hallucination Detection", "severity": "critical", "required": true },
  --     { "name": "Fact Verification", "severity": "warning", "required": true },
  --     { "name": "Source Diversity", "severity": "info", "required": false },
  --     { "name": "Tone Consistency", "severity": "info", "required": false },
  --     { "name": "Completeness Check", "severity": "warning", "required": true }
  --   ]
  -- }
  
  -- Output guarantees
  output_guarantees JSONB DEFAULT '[]',
  -- Example: [
  --   { "type": "structure", "threshold": "300%", "description": "Multi-chapter visual essay with timeline" },
  --   { "type": "quality", "threshold": "95%", "description": "All claims sourced to verified references" },
  --   { "type": "content", "threshold": "90%", "description": "Complete etymology trace from origin to present" },
  --   { "type": "format", "threshold": "100%", "description": "Properly formatted bibliography" }
  -- ]
  
  -- Cost profile
  cost_profile JSONB DEFAULT '{}',
  -- Example: {
  --   "min": { "cost_usd": 0.28, "tokens": 8000 },
  --   "typical": { "cost_usd": 0.42, "tokens": 12000 },
  --   "max": { "cost_usd": 0.65, "tokens": 18000 },
  --   "breakdown_by_stage": [
  --     { "stage": "Intent Parsing", "percentage": 2 },
  --     { "stage": "Source Research", "percentage": 35 },
  --     ...
  --   ]
  -- }
  
  -- Artifact metadata
  artifact_type TEXT,                           -- 'visual-essay'
  output_formats TEXT[] DEFAULT '{}',           -- ['html', 'pdf', 'markdown']
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  visibility TEXT DEFAULT 'system',             -- 'system', 'public', 'private'
  
  -- Metadata
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(template_id, version)
);

CREATE INDEX idx_specs_template ON specs(template_id);
CREATE INDEX idx_specs_active ON specs(is_active) WHERE is_active = true;
```

---

### 4. `runs`

Individual workflow executions. Created when a user clicks "Run workflow."

```sql
CREATE TABLE runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spec_id UUID NOT NULL REFERENCES specs(id),
  user_id UUID NOT NULL REFERENCES profiles(id),
  
  -- What the user submitted
  intent JSONB NOT NULL,
  -- Example: { "word": "serendipity", "angle": "etymology", "audience": "general", "length": "12min" }
  
  -- Derived identifiers
  project_slug TEXT NOT NULL,                   -- 'serendipity-etymology-20260208'
  display_name TEXT,                            -- 'Serendipity'
  
  -- Execution state
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'running', 'paused', 'completed', 'failed', 'cancelled')),
  current_gate TEXT,                            -- 'G3' (which gate is active)
  pause_reason TEXT,                            -- 'Gate G4 failed: MISSING_ARTIFACT'
  
  -- Aggregated metrics
  total_gates INTEGER DEFAULT 0,
  gates_passed INTEGER DEFAULT 0,
  gates_failed INTEGER DEFAULT 0,
  total_tokens_in INTEGER DEFAULT 0,
  total_tokens_out INTEGER DEFAULT 0,
  total_cost_usd NUMERIC(10, 4) DEFAULT 0,
  
  -- Timing
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_runs_user ON runs(user_id);
CREATE INDEX idx_runs_spec ON runs(spec_id);
CREATE INDEX idx_runs_status ON runs(status);
CREATE INDEX idx_runs_created ON runs(created_at DESC);
```

---

### 5. `gate_executions`

Each gate's execution within a run. One row per gate per attempt.

```sql
CREATE TABLE gate_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID NOT NULL REFERENCES runs(id) ON DELETE CASCADE,
  
  -- Gate identity
  gate_id TEXT NOT NULL,                        -- 'G1', 'G2', 'G4.1', 'G5.2'
  gate_name TEXT NOT NULL,                      -- 'Intake Approval', 'Research Complete'
  phase TEXT,                                   -- 'intake', 'research', 'design', 'production', 'audit', 'publication'
  gate_order INTEGER NOT NULL,                  -- Sequential position in pipeline
  
  -- Agent + model used
  agent_slug TEXT,                              -- 'concept-research-agent'
  model_id TEXT,                                -- 'claude-opus-4'
  model_provider TEXT,                          -- 'anthropic'
  
  -- Execution state
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'running', 'passed', 'failed', 'skipped', 'warning')),
  attempt_number INTEGER NOT NULL DEFAULT 1,
  max_attempts INTEGER DEFAULT 3,
  
  -- What was sent and received
  prompt_packet TEXT,                           -- The full prompt sent to the model (can be large)
  raw_output TEXT,                              -- The full response from the model (can be large)
  
  -- Validation
  validation_results JSONB DEFAULT '[]',
  -- Example: [
  --   { "type": "file_exists", "target": "CONCEPTS.md", "passed": true },
  --   { "type": "file_exists", "target": "SEQUENCE.md", "passed": true },
  --   { "type": "contains_headings", "target": "CONCEPTS.md", "headings": ["Core", "Related"], "passed": false, "severity": "warning" }
  -- ]
  
  fail_codes TEXT[] DEFAULT '{}',               -- ['MISSING_ARTIFACT', 'HEADING_MISMATCH']
  
  -- Metrics
  tokens_in INTEGER DEFAULT 0,
  tokens_out INTEGER DEFAULT 0,
  cost_usd NUMERIC(10, 4) DEFAULT 0,
  duration_ms INTEGER DEFAULT 0,
  
  -- Timing
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_gate_exec_run ON gate_executions(run_id);
CREATE INDEX idx_gate_exec_status ON gate_executions(status);
CREATE INDEX idx_gate_exec_gate ON gate_executions(gate_id);
CREATE INDEX idx_gate_exec_run_order ON gate_executions(run_id, gate_order);
```

---

### 6. `artifacts`

Generated files/outputs from gate executions.

```sql
CREATE TABLE artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID NOT NULL REFERENCES runs(id) ON DELETE CASCADE,
  gate_execution_id UUID REFERENCES gate_executions(id),
  
  -- File identity
  file_name TEXT NOT NULL,                      -- 'CONCEPTS.md'
  file_path TEXT,                               -- 'research/CONCEPTS.md'
  content_type TEXT,                            -- 'markdown', 'jsx', 'css', 'json', 'typescript'
  
  -- Content
  content TEXT,                                 -- Full file content (for text artifacts)
  content_hash TEXT,                            -- SHA256 hash for integrity tracking
  size_bytes INTEGER DEFAULT 0,
  
  -- Storage (for large artifacts or binary files)
  storage_url TEXT,                             -- Cloudflare R2 or Supabase Storage URL
  
  -- Classification
  artifact_type TEXT,                           -- 'research', 'spec', 'design', 'code', 'audit', 'publication'
  gate_id TEXT,                                 -- Which gate produced this
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_artifacts_run ON artifacts(run_id);
CREATE INDEX idx_artifacts_gate ON artifacts(gate_execution_id);
CREATE INDEX idx_artifacts_type ON artifacts(artifact_type);
```

---

### 7. `models`

Available AI models for the agent router.

```sql
CREATE TABLE models (
  id TEXT PRIMARY KEY,                          -- 'claude-opus-4'
  provider TEXT NOT NULL,                       -- 'anthropic', 'openai', 'google'
  display_name TEXT NOT NULL,                   -- 'Claude Opus 4'
  tier TEXT NOT NULL CHECK (tier IN ('top', 'mid', 'low')),
  
  -- Pricing (per 1K tokens)
  input_cost_per_1k NUMERIC(10, 6),            -- 0.015
  output_cost_per_1k NUMERIC(10, 6),           -- 0.075
  
  -- Capabilities
  max_context_tokens INTEGER,                   -- 200000
  supports_tools BOOLEAN DEFAULT false,
  supports_streaming BOOLEAN DEFAULT true,
  supports_structured_output BOOLEAN DEFAULT false,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Seed data:**

```sql
INSERT INTO models (id, provider, display_name, tier, input_cost_per_1k, output_cost_per_1k, max_context_tokens, supports_tools, supports_structured_output) VALUES
  ('claude-opus-4', 'anthropic', 'Claude Opus 4', 'top', 0.015, 0.075, 200000, true, true),
  ('claude-sonnet-4', 'anthropic', 'Claude Sonnet 4', 'mid', 0.003, 0.015, 200000, true, true),
  ('claude-haiku-3.5', 'anthropic', 'Claude Haiku 3.5', 'low', 0.0008, 0.004, 200000, true, true),
  ('gpt-5.3', 'openai', 'GPT-5.3', 'top', 0.010, 0.030, 128000, true, true),
  ('gpt-4o', 'openai', 'GPT-4o', 'mid', 0.005, 0.015, 128000, true, true),
  ('gpt-4o-mini', 'openai', 'GPT-4o Mini', 'low', 0.0003, 0.0012, 128000, true, true),
  ('o3', 'openai', 'O3 (Reasoning)', 'top', 0.010, 0.040, 200000, true, true),
  ('o3-mini', 'openai', 'O3 Mini', 'mid', 0.0011, 0.0044, 200000, true, true),
  ('gemini-2.5-pro', 'google', 'Gemini 2.5 Pro', 'mid', 0.0035, 0.014, 1000000, true, true),
  ('gemini-2.5-flash', 'google', 'Gemini 2.5 Flash', 'low', 0.0005, 0.0015, 1000000, true, true);
```

---

## Row Level Security (RLS)

```sql
-- Users can only see their own runs
ALTER TABLE runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own runs" ON runs FOR SELECT USING (
  user_id = auth.uid() OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users create own runs" ON runs FOR INSERT WITH CHECK (
  user_id = auth.uid()
);

-- Gate executions visible to run owner or admin
ALTER TABLE gate_executions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Via run ownership" ON gate_executions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM runs WHERE runs.id = gate_executions.run_id
    AND (runs.user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  )
);

-- Artifacts visible to run owner or admin
ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Via run ownership" ON artifacts FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM runs WHERE runs.id = artifacts.run_id
    AND (runs.user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  )
);

-- Templates and specs are public read
ALTER TABLE workflow_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON workflow_templates FOR SELECT USING (is_active = true);
CREATE POLICY "Admin write" ON workflow_templates FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

ALTER TABLE specs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON specs FOR SELECT USING (is_active = true);
CREATE POLICY "Admin write" ON specs FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Models are public read
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON models FOR SELECT USING (is_active = true);
CREATE POLICY "Admin write" ON models FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
```

---

## Key Queries

### Dashboard: Active Runs

```sql
SELECT r.id, r.display_name, r.status, r.current_gate, r.total_cost_usd,
       s.version, wt.name AS template_name,
       r.gates_passed, r.total_gates, r.started_at
FROM runs r
JOIN specs s ON r.spec_id = s.id
JOIN workflow_templates wt ON s.template_id = wt.id
WHERE r.status IN ('running', 'paused')
ORDER BY r.started_at DESC;
```

### Run Detail: Gate Timeline

```sql
SELECT ge.gate_id, ge.gate_name, ge.phase, ge.status,
       ge.agent_slug, ge.model_id, ge.attempt_number,
       ge.tokens_in, ge.tokens_out, ge.cost_usd, ge.duration_ms,
       ge.validation_results, ge.fail_codes,
       ge.started_at, ge.completed_at
FROM gate_executions ge
WHERE ge.run_id = $1
ORDER BY ge.gate_order ASC, ge.attempt_number DESC;
```

### Artifact Browser

```sql
SELECT a.id, a.file_name, a.content_type, a.content_hash, a.size_bytes,
       a.gate_id, a.artifact_type, a.created_at,
       r.display_name AS run_name, r.project_slug
FROM artifacts a
JOIN runs r ON a.run_id = r.id
WHERE r.user_id = $1
ORDER BY a.created_at DESC;
```

### Admin: Cost By Model (This Month)

```sql
SELECT ge.model_id, ge.model_provider,
       COUNT(*) AS total_executions,
       SUM(ge.tokens_in) AS total_tokens_in,
       SUM(ge.tokens_out) AS total_tokens_out,
       SUM(ge.cost_usd) AS total_cost,
       AVG(ge.duration_ms) AS avg_duration_ms
FROM gate_executions ge
JOIN runs r ON ge.run_id = r.id
WHERE ge.created_at >= date_trunc('month', now())
  AND ge.status != 'pending'
GROUP BY ge.model_id, ge.model_provider
ORDER BY total_cost DESC;
```
