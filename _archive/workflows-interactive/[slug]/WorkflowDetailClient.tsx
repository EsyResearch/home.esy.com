"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Play, Pause, RotateCcw, ChevronDown, ChevronUp,
  Clock, DollarSign, Cpu, FileText, Check, Loader2,
  Copy, Eye, Code, ChevronRight, Zap, AlertCircle,
  Settings2, Sliders, ExternalLink, Share2
} from 'lucide-react';
import { elevatedDarkTheme } from '@/lib/theme';
import {
  type Workflow,
  type WorkflowStep,
  type ToneVariant,
  type DepthVariant,
  type CitationMode,
  getVariantKey,
  ARTIFACT_TYPE_INFO,
  DIFFICULTY_INFO
} from '@/data/workflows';

const theme = elevatedDarkTheme;

type RunStatus = 'idle' | 'running' | 'paused' | 'completed';
type MobileTab = 'run' | 'about' | 'artifact';

interface StepState {
  status: 'pending' | 'running' | 'completed';
  output?: string;
  tokensIn?: number;
  tokensOut?: number;
  cost?: number;
}

interface Props {
  workflow: Workflow;
}

// Generate unique run ID
function generateRunId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomPart}`;
}

export default function WorkflowDetailClient({ workflow }: Props) {
  const router = useRouter();

  // Window width for responsive layout
  const [windowWidth, setWindowWidth] = useState(1200);
  const isDesktop = windowWidth >= 1024;

  // Mobile tabs
  const [mobileTab, setMobileTab] = useState<MobileTab>('run');

  // Current run ID (set when run completes)
  const [currentRunId, setCurrentRunId] = useState<string | null>(null);

  // Desktop: toggle detail panel when artifact shown
  const [showDetailPanel, setShowDetailPanel] = useState(true);

  // Runner state
  const [runStatus, setRunStatus] = useState<RunStatus>('idle');
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [stepStates, setStepStates] = useState<Record<string, StepState>>({});
  const [selectedIntent, setSelectedIntent] = useState(workflow.sampleIntents[0]);
  const [customIntent, setCustomIntent] = useState('');
  const [showContext, setShowContext] = useState(false);
  const [context, setContext] = useState(workflow.defaultContext || '');

  // Advanced controls
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [tone, setTone] = useState<ToneVariant>('neutral');
  const [depth, setDepth] = useState<DepthVariant>('medium');
  const [citations, setCitations] = useState<CitationMode>('off');

  // Artifact state
  const [showArtifact, setShowArtifact] = useState(false);
  const [artifactView, setArtifactView] = useState<'preview' | 'markdown'>('preview');
  const [copied, setCopied] = useState(false);

  // Totals
  const [totalTokensIn, setTotalTokensIn] = useState(0);
  const [totalTokensOut, setTotalTokensOut] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  // Run control ref
  const runControlRef = useRef<{ paused: boolean; cancelled: boolean }>({ paused: false, cancelled: false });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get current variant key
  const variantKey = getVariantKey(tone, depth, citations);

  // Get artifact content
  const getArtifactContent = () => {
    // Try exact match first, then fall back to closest match
    const artifact = workflow.artifactVariants[variantKey] ||
      workflow.artifactVariants['neutral-medium-off'] ||
      Object.values(workflow.artifactVariants)[0];
    return artifact || '';
  };

  // Run workflow
  const runWorkflow = useCallback(async (fromStepIndex = 0) => {
    setRunStatus('running');
    runControlRef.current = { paused: false, cancelled: false };

    // Reset states from this step forward
    const newStepStates: Record<string, StepState> = {};
    workflow.steps.forEach((step, i) => {
      if (i < fromStepIndex) {
        newStepStates[step.id] = stepStates[step.id] || { status: 'completed' };
      } else {
        newStepStates[step.id] = { status: 'pending' };
      }
    });
    setStepStates(newStepStates);

    // Reset totals if starting from beginning
    if (fromStepIndex === 0) {
      setTotalTokensIn(0);
      setTotalTokensOut(0);
      setTotalCost(0);
      setShowArtifact(false);
    }

    // Execute steps
    for (let i = fromStepIndex; i < workflow.steps.length; i++) {
      if (runControlRef.current.cancelled) break;

      // Wait while paused
      while (runControlRef.current.paused) {
        await new Promise(resolve => setTimeout(resolve, 100));
        if (runControlRef.current.cancelled) break;
      }
      if (runControlRef.current.cancelled) break;

      const step = workflow.steps[i];
      setCurrentStepIndex(i);

      // Set step to running
      setStepStates(prev => ({
        ...prev,
        [step.id]: { status: 'running' }
      }));

      // Simulate execution
      await new Promise(resolve => setTimeout(resolve, step.duration));

      // Get output variant
      const output = step.outputVariants[variantKey] ||
        step.outputVariants['neutral-medium-off'] ||
        Object.values(step.outputVariants)[0] || '';

      // Complete step
      setStepStates(prev => ({
        ...prev,
        [step.id]: {
          status: 'completed',
          output,
          tokensIn: step.tokenEstimateIn,
          tokensOut: step.tokenEstimateOut,
          cost: step.costEstimate
        }
      }));

      // Update totals
      setTotalTokensIn(prev => prev + step.tokenEstimateIn);
      setTotalTokensOut(prev => prev + step.tokenEstimateOut);
      setTotalCost(prev => prev + step.costEstimate);
    }

    if (!runControlRef.current.cancelled) {
      setRunStatus('completed');
      setShowArtifact(true);
      setCurrentStepIndex(-1);

      // Generate run ID and save to localStorage
      const runId = generateRunId();
      setCurrentRunId(runId);

      // Calculate final totals
      let finalTokensIn = 0;
      let finalTokensOut = 0;
      let finalCost = 0;
      const stepResults = workflow.steps.map(step => {
        const output = step.outputVariants[variantKey] ||
          step.outputVariants['neutral-medium-off'] ||
          Object.values(step.outputVariants)[0] || '';
        finalTokensIn += step.tokenEstimateIn;
        finalTokensOut += step.tokenEstimateOut;
        finalCost += step.costEstimate;
        return {
          stepId: step.id,
          output,
          tokensIn: step.tokenEstimateIn,
          tokensOut: step.tokenEstimateOut,
          cost: step.costEstimate,
          duration: step.duration,
        };
      });

      // Save run data
      const runData = {
        runId,
        workflowSlug: workflow.slug,
        intent: customIntent || selectedIntent,
        tone,
        depth,
        citations,
        completedAt: new Date().toISOString(),
        totalTokensIn: finalTokensIn,
        totalTokensOut: finalTokensOut,
        totalCost: finalCost,
        stepResults,
      };

      try {
        localStorage.setItem(`esy-workflow-run-${runId}`, JSON.stringify(runData));
        console.log('[Analytics] workflow_run_saved', { runId, slug: workflow.slug });
      } catch (e) {
        console.warn('Failed to save run to localStorage:', e);
      }

      // Analytics event
      console.log('[Analytics] workflow_demo_completed', { slug: workflow.slug, variantKey, runId });
    }
  }, [workflow, stepStates, variantKey, customIntent, selectedIntent, tone, depth, citations]);

  // Pause/Resume
  const togglePause = () => {
    if (runStatus === 'running') {
      runControlRef.current.paused = true;
      setRunStatus('paused');
    } else if (runStatus === 'paused') {
      runControlRef.current.paused = false;
      setRunStatus('running');
    }
  };

  // Restart
  const restart = () => {
    runControlRef.current.cancelled = true;
    setRunStatus('idle');
    setCurrentStepIndex(-1);
    setStepStates({});
    setTotalTokensIn(0);
    setTotalTokensOut(0);
    setTotalCost(0);
    setShowArtifact(false);
    setCurrentRunId(null);
  };

  // Re-run from step
  const rerunFromStep = (stepIndex: number) => {
    runControlRef.current.cancelled = true;
    setTimeout(() => {
      runWorkflow(stepIndex);
      console.log('[Analytics] workflow_demo_step_rerun', { slug: workflow.slug, stepIndex });
    }, 100);
  };

  // Copy artifact
  const copyArtifact = async () => {
    const content = getArtifactContent();
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    console.log('[Analytics] artifact_copied', { slug: workflow.slug });
  };

  // Start run handler
  const handleStartRun = () => {
    console.log('[Analytics] workflow_demo_run_started', { slug: workflow.slug, intent: selectedIntent || customIntent });
    runWorkflow(0);
  };

  // Log page view
  useEffect(() => {
    console.log('[Analytics] workflow_demo_viewed', { slug: workflow.slug });
  }, [workflow.slug]);

  // Render detail panel content
  const DetailContent = () => (
    <div style={{ height: '100%', overflowY: 'auto', padding: isDesktop ? '0' : '1.5rem' }}>
      {/* Back link */}
      <Link
        href="/workflows"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: theme.muted,
          textDecoration: 'none',
          fontSize: '0.875rem',
          marginBottom: '1.5rem',
          transition: 'color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = theme.accent}
        onMouseLeave={(e) => e.currentTarget.style.color = theme.muted}
      >
        <ArrowLeft size={16} />
        All Workflows
      </Link>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '0.75rem'
        }}>
          <span style={{
            padding: '0.35rem 0.75rem',
            background: `${ARTIFACT_TYPE_INFO[workflow.artifactType].color}15`,
            border: `1px solid ${ARTIFACT_TYPE_INFO[workflow.artifactType].color}30`,
            borderRadius: '6px',
            color: ARTIFACT_TYPE_INFO[workflow.artifactType].color,
            fontSize: '0.75rem',
            fontWeight: 500
          }}>
            {ARTIFACT_TYPE_INFO[workflow.artifactType].label}
          </span>
          <span style={{
            padding: '0.25rem 0.5rem',
            background: `${DIFFICULTY_INFO[workflow.difficulty].color}15`,
            border: `1px solid ${DIFFICULTY_INFO[workflow.difficulty].color}30`,
            borderRadius: '4px',
            color: DIFFICULTY_INFO[workflow.difficulty].color,
            fontSize: '0.6875rem',
            fontWeight: 500
          }}>
            {DIFFICULTY_INFO[workflow.difficulty].label}
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-literata)',
          fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
          fontWeight: 400,
          color: theme.text,
          marginBottom: '0.5rem',
          lineHeight: 1.2
        }}>
          {workflow.title}
        </h1>

        <p style={{
          fontSize: '1rem',
          color: theme.muted,
          lineHeight: 1.6
        }}>
          {workflow.subtitle}
        </p>
      </div>

      {/* What This Demonstrates */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: theme.text,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.75rem'
        }}>
          What This Demonstrates
        </h2>
        <p style={{
          fontSize: '0.9375rem',
          color: theme.muted,
          lineHeight: 1.7
        }}>
          {workflow.whatItDemonstrates}
        </p>
      </div>

      {/* Pipeline Steps */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: theme.text,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.75rem'
        }}>
          Pipeline Steps
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {workflow.steps.map((step, index) => {
            const state = stepStates[step.id];
            const isActive = currentStepIndex === index;
            const isCompleted = state?.status === 'completed';
            const canRerun = runStatus === 'completed';

            return (
              <div
                key={step.id}
                onClick={() => canRerun && rerunFromStep(index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  background: isActive ? `${theme.accent}10` : theme.elevated,
                  border: `1px solid ${isActive ? theme.accent : theme.border}`,
                  borderRadius: '8px',
                  cursor: canRerun ? 'pointer' : 'default',
                  transition: 'all 0.2s'
                }}
              >
                {/* Step number/status */}
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isCompleted ? theme.success : isActive ? theme.accent : theme.surface,
                  color: isCompleted || isActive ? 'white' : theme.muted,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  flexShrink: 0
                }}>
                  {isCompleted ? <Check size={14} /> : isActive ? <Loader2 size={14} className="animate-spin" /> : index + 1}
                </div>

                {/* Step info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: theme.text,
                    marginBottom: '0.125rem'
                  }}>
                    {step.name}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: theme.subtle
                  }}>
                    {step.modelLabel}
                  </div>
                </div>

                {/* Rerun indicator */}
                {canRerun && (
                  <RotateCcw size={14} style={{ color: theme.subtle, flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Inputs & Outputs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <h2 style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: theme.text,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.75rem'
          }}>
            Inputs
          </h2>
          {workflow.inputs.map((input, i) => (
            <div key={i} style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8125rem', color: theme.text, fontWeight: 500 }}>
                {input.name}
              </span>
              <span style={{ fontSize: '0.75rem', color: theme.subtle, display: 'block' }}>
                {input.description}
              </span>
            </div>
          ))}
        </div>
        <div>
          <h2 style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: theme.text,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.75rem'
          }}>
            Outputs
          </h2>
          {workflow.outputs.map((output, i) => (
            <div key={i} style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8125rem', color: theme.text, fontWeight: 500 }}>
                {output.name}
              </span>
              <span style={{ fontSize: '0.75rem', color: theme.subtle, display: 'block' }}>
                {output.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render runner panel content
  const RunnerContent = () => (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: theme.surface,
      borderRadius: isDesktop ? '16px' : '0',
      border: isDesktop ? `1px solid ${theme.border}` : 'none',
      overflow: 'hidden'
    }}>
      {/* Runner Header */}
      <div style={{
        padding: '1rem 1.25rem',
        borderBottom: `1px solid ${theme.border}`,
        background: theme.elevated
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h3 style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: theme.text
          }}>
            Workflow Runner
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {runStatus !== 'idle' && (
              <span style={{
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.6875rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                background: runStatus === 'completed' ? `${theme.success}15` :
                  runStatus === 'paused' ? `${theme.warning}15` : `${theme.accent}15`,
                color: runStatus === 'completed' ? theme.success :
                  runStatus === 'paused' ? theme.warning : theme.accent
              }}>
                {runStatus}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Runner Body - Scrollable */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1.25rem'
      }}>
        {/* Intent Selection */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: theme.text,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem'
          }}>
            Intent
          </label>
          <select
            value={selectedIntent}
            onChange={(e) => setSelectedIntent(e.target.value)}
            disabled={runStatus === 'running'}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: theme.elevated,
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              color: theme.text,
              fontSize: '0.875rem',
              marginBottom: '0.75rem',
              cursor: runStatus === 'running' ? 'not-allowed' : 'pointer',
              opacity: runStatus === 'running' ? 0.6 : 1
            }}
          >
            {workflow.sampleIntents.map((intent, i) => (
              <option key={i} value={intent}>{intent}</option>
            ))}
          </select>

          {/* Custom intent option */}
          <input
            type="text"
            placeholder="Or enter custom intent..."
            value={customIntent}
            onChange={(e) => setCustomIntent(e.target.value)}
            disabled={runStatus === 'running'}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: theme.elevated,
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              color: theme.text,
              fontSize: '0.875rem',
              opacity: runStatus === 'running' ? 0.6 : 1
            }}
          />
        </div>

        {/* Context Toggle */}
        {workflow.defaultContext && (
          <div style={{ marginBottom: '1.25rem' }}>
            <button
              onClick={() => setShowContext(!showContext)}
              disabled={runStatus === 'running'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                border: 'none',
                color: theme.muted,
                fontSize: '0.8125rem',
                cursor: runStatus === 'running' ? 'not-allowed' : 'pointer',
                padding: 0,
                marginBottom: showContext ? '0.75rem' : 0
              }}
            >
              {showContext ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {showContext ? 'Hide' : 'Show'} context
            </button>
            {showContext && (
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                disabled={runStatus === 'running'}
                style={{
                  width: '100%',
                  minHeight: '80px',
                  padding: '0.75rem',
                  background: theme.elevated,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  color: theme.text,
                  fontSize: '0.8125rem',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            )}
          </div>
        )}

        {/* Advanced Controls */}
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            disabled={runStatus === 'running'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: theme.muted,
              fontSize: '0.8125rem',
              cursor: runStatus === 'running' ? 'not-allowed' : 'pointer',
              padding: 0,
              marginBottom: showAdvanced ? '1rem' : 0
            }}
          >
            <Settings2 size={14} />
            Advanced Controls
            {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showAdvanced && (
            <div style={{
              padding: '1rem',
              background: theme.elevated,
              borderRadius: '8px',
              border: `1px solid ${theme.border}`
            }}>
              {/* Tone */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  color: theme.subtle,
                  marginBottom: '0.5rem'
                }}>
                  Tone / Narrator
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {(['neutral', 'storytelling', 'academic'] as ToneVariant[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        background: tone === t ? theme.accent : 'transparent',
                        border: `1px solid ${tone === t ? theme.accent : theme.border}`,
                        borderRadius: '6px',
                        color: tone === t ? 'white' : theme.muted,
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        textTransform: 'capitalize'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Depth */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  color: theme.subtle,
                  marginBottom: '0.5rem'
                }}>
                  Depth
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {(['short', 'medium', 'deep'] as DepthVariant[]).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDepth(d)}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        background: depth === d ? theme.accent : 'transparent',
                        border: `1px solid ${depth === d ? theme.accent : theme.border}`,
                        borderRadius: '6px',
                        color: depth === d ? 'white' : theme.muted,
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        textTransform: 'capitalize'
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Citations */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  color: theme.subtle,
                  marginBottom: '0.5rem'
                }}>
                  Citations
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {(['off', 'light', 'heavy'] as CitationMode[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCitations(c)}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        background: citations === c ? theme.accent : 'transparent',
                        border: `1px solid ${citations === c ? theme.accent : theme.border}`,
                        borderRadius: '6px',
                        color: citations === c ? 'white' : theme.muted,
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        textTransform: 'capitalize'
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step Outputs */}
        {Object.keys(stepStates).length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: theme.text,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem'
            }}>
              Step Outputs
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {workflow.steps.map((step) => {
                const state = stepStates[step.id];
                if (!state || state.status === 'pending') return null;

                return (
                  <div
                    key={step.id}
                    style={{
                      padding: '0.75rem',
                      background: theme.elevated,
                      borderRadius: '8px',
                      border: `1px solid ${theme.border}`
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        color: theme.text
                      }}>
                        {step.name}
                      </span>
                      {state.status === 'running' ? (
                        <Loader2 size={14} className="animate-spin" style={{ color: theme.accent }} />
                      ) : (
                        <Check size={14} style={{ color: theme.success }} />
                      )}
                    </div>
                    {state.output && (
                      <pre style={{
                        fontSize: '0.75rem',
                        color: theme.muted,
                        whiteSpace: 'pre-wrap',
                        margin: 0,
                        maxHeight: '150px',
                        overflow: 'auto',
                        fontFamily: 'var(--font-mono, monospace)'
                      }}>
                        {state.output.slice(0, 500)}{state.output.length > 500 ? '...' : ''}
                      </pre>
                    )}
                    {state.status === 'completed' && (
                      <div style={{
                        display: 'flex',
                        gap: '1rem',
                        marginTop: '0.5rem',
                        paddingTop: '0.5rem',
                        borderTop: `1px solid ${theme.divider}`,
                        fontSize: '0.6875rem',
                        color: theme.subtle
                      }}>
                        <span>In: {state.tokensIn?.toLocaleString()} tokens</span>
                        <span>Out: {state.tokensOut?.toLocaleString()} tokens</span>
                        <span>${state.cost?.toFixed(3)}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Token/Cost Panel */}
        {(runStatus === 'running' || runStatus === 'paused' || runStatus === 'completed') && (
          <div style={{
            padding: '1rem',
            background: theme.elevated,
            borderRadius: '8px',
            border: `1px solid ${theme.border}`,
            marginBottom: '1.5rem'
          }}>
            <h4 style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: theme.text,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Zap size={12} style={{ color: theme.accent }} />
              Usage & Cost
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem'
            }}>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: theme.text }}>
                  {totalTokensIn.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.6875rem', color: theme.subtle }}>Tokens In</div>
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: theme.text }}>
                  {totalTokensOut.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.6875rem', color: theme.subtle }}>Tokens Out</div>
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: theme.accent }}>
                  ${totalCost.toFixed(3)}
                </div>
                <div style={{ fontSize: '0.6875rem', color: theme.subtle }}>Total Cost</div>
              </div>
            </div>

            {runStatus === 'completed' && (
              <div style={{
                marginTop: '0.75rem',
                paddingTop: '0.75rem',
                borderTop: `1px solid ${theme.divider}`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                fontSize: '0.75rem',
                color: theme.subtle
              }}>
                <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  Biggest cost driver: <strong style={{ color: theme.text }}>
                    {workflow.steps.reduce((max, step) =>
                      step.costEstimate > max.costEstimate ? step : max
                    ).name}
                  </strong>. Real runs may vary based on input complexity.
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Runner Footer - Controls */}
      <div style={{
        padding: '1rem 1.25rem',
        borderTop: `1px solid ${theme.border}`,
        background: theme.elevated,
        display: 'flex',
        gap: '0.75rem'
      }}>
        {runStatus === 'idle' && (
          <button
            onClick={handleStartRun}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.875rem 1.5rem',
              background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accentHover} 100%)`,
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '0.9375rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Play size={18} />
            Run Workflow
          </button>
        )}

        {(runStatus === 'running' || runStatus === 'paused') && (
          <>
            <button
              onClick={togglePause}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.5rem',
                background: runStatus === 'paused' ? theme.accent : theme.elevated,
                border: `1px solid ${runStatus === 'paused' ? theme.accent : theme.border}`,
                borderRadius: '8px',
                color: runStatus === 'paused' ? 'white' : theme.text,
                fontSize: '0.9375rem',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              {runStatus === 'paused' ? <Play size={18} /> : <Pause size={18} />}
              {runStatus === 'paused' ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={restart}
              style={{
                padding: '0.875rem',
                background: theme.elevated,
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                color: theme.muted,
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={18} />
            </button>
          </>
        )}

        {runStatus === 'completed' && (
          <>
            <button
              onClick={restart}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.5rem',
                background: theme.elevated,
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                color: theme.text,
                fontSize: '0.9375rem',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={18} />
              Run Again
            </button>
            {currentRunId && (
              <Link
                href={`/workflows/${workflow.slug}/runs/${currentRunId}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1rem',
                  background: 'transparent',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  color: theme.muted,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
              >
                <ExternalLink size={16} />
                View Run
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );

  // Render artifact panel content
  const ArtifactContent = () => {
    const artifact = getArtifactContent();

    if (!showArtifact || !artifact) {
      return (
        <div style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          color: theme.subtle
        }}>
          <div>
            <FileText size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>No artifact yet</p>
            <p style={{ fontSize: '0.875rem' }}>Run the workflow to generate an artifact</p>
          </div>
        </div>
      );
    }

    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: theme.surface,
        borderRadius: isDesktop ? '16px' : '0',
        border: isDesktop ? `1px solid ${theme.border}` : 'none',
        overflow: 'hidden'
      }}>
        {/* Artifact Header */}
        <div style={{
          padding: '1rem 1.25rem',
          borderBottom: `1px solid ${theme.border}`,
          background: theme.elevated,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h3 style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: theme.text
          }}>
            Generated Artifact
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setArtifactView(artifactView === 'preview' ? 'markdown' : 'preview')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.5rem 0.75rem',
                background: 'transparent',
                border: `1px solid ${theme.border}`,
                borderRadius: '6px',
                color: theme.muted,
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              {artifactView === 'preview' ? <Code size={14} /> : <Eye size={14} />}
              {artifactView === 'preview' ? 'Markdown' : 'Preview'}
            </button>
            <button
              onClick={copyArtifact}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.5rem 0.75rem',
                background: copied ? theme.success : 'transparent',
                border: `1px solid ${copied ? theme.success : theme.border}`,
                borderRadius: '6px',
                color: copied ? 'white' : theme.muted,
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Artifact Body */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '1.5rem'
        }}>
          {artifactView === 'markdown' ? (
            <pre style={{
              fontSize: '0.8125rem',
              color: theme.text,
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              margin: 0,
              fontFamily: 'var(--font-mono, monospace)',
              lineHeight: 1.6
            }}>
              {artifact}
            </pre>
          ) : (
            <div
              className="artifact-preview"
              style={{
                fontSize: '0.9375rem',
                color: theme.text,
                lineHeight: 1.8
              }}
              dangerouslySetInnerHTML={{
                __html: simpleMarkdownToHtml(artifact)
              }}
            />
          )}
        </div>
      </div>
    );
  };

  // DESKTOP LAYOUT
  if (isDesktop) {
    // POST-RUN COMPLETED STATE: Artifact-centric layout
    if (runStatus === 'completed' && showArtifact) {
      const artifact = getArtifactContent();

      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: theme.bg,
          color: theme.text,
          fontFamily: 'var(--font-inter)'
        }}>
          {/* Compact header bar */}
          <div style={{
            position: 'sticky',
            top: '64px',
            zIndex: 20,
            background: theme.bg,
            borderBottom: `1px solid ${theme.border}`,
            padding: '0.75rem 0'
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 clamp(1.5rem, 5vw, 3rem)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              {/* Left: Back + Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link
                  href="/workflows"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: theme.muted,
                    textDecoration: 'none',
                    fontSize: '0.8125rem',
                    transition: 'color 0.2s'
                  }}
                >
                  <ArrowLeft size={16} />
                  Workflows
                </Link>
                <span style={{ color: theme.border }}>|</span>
                <span style={{
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: theme.text
                }}>
                  {workflow.title}
                </span>
                <span style={{
                  padding: '0.2rem 0.5rem',
                  background: `${theme.success}15`,
                  border: `1px solid ${theme.success}30`,
                  borderRadius: '4px',
                  color: theme.success,
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  textTransform: 'uppercase'
                }}>
                  Completed
                </span>
              </div>

              {/* Center: Stats */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                fontSize: '0.8125rem',
                color: theme.subtle
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Zap size={14} style={{ color: theme.accent }} />
                  {(totalTokensIn + totalTokensOut).toLocaleString()} tokens
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <DollarSign size={14} />
                  ${totalCost.toFixed(3)}
                </span>
              </div>

              {/* Right: Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => setArtifactView(artifactView === 'preview' ? 'markdown' : 'preview')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.5rem 0.75rem',
                    background: 'transparent',
                    border: `1px solid ${theme.border}`,
                    borderRadius: '6px',
                    color: theme.muted,
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  {artifactView === 'preview' ? <Code size={14} /> : <Eye size={14} />}
                  {artifactView === 'preview' ? 'Markdown' : 'Preview'}
                </button>
                <button
                  onClick={copyArtifact}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.5rem 0.75rem',
                    background: copied ? theme.success : 'transparent',
                    border: `1px solid ${copied ? theme.success : theme.border}`,
                    borderRadius: '6px',
                    color: copied ? 'white' : theme.muted,
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={restart}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.5rem 0.75rem',
                    background: theme.accent,
                    border: 'none',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  <RotateCcw size={14} />
                  Run Again
                </button>
                {currentRunId && (
                  <Link
                    href={`/workflows/${workflow.slug}/runs/${currentRunId}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.5rem 0.75rem',
                      background: 'transparent',
                      border: `1px solid ${theme.border}`,
                      borderRadius: '6px',
                      color: theme.muted,
                      fontSize: '0.75rem',
                      textDecoration: 'none'
                    }}
                  >
                    <ExternalLink size={14} />
                    Share
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Main artifact content - centered, generous width */}
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '3rem clamp(1.5rem, 5vw, 3rem)'
          }}>
            {artifactView === 'markdown' ? (
              <pre style={{
                fontSize: '0.875rem',
                color: theme.text,
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                margin: 0,
                fontFamily: 'var(--font-mono, monospace)',
                lineHeight: 1.7,
                padding: '2rem',
                background: theme.surface,
                borderRadius: '12px',
                border: `1px solid ${theme.border}`
              }}>
                {artifact}
              </pre>
            ) : (
              <article
                className="artifact-preview"
                style={{
                  fontSize: '1.0625rem',
                  color: theme.text,
                  lineHeight: 1.9
                }}
                dangerouslySetInnerHTML={{
                  __html: simpleMarkdownToHtml(artifact)
                }}
              />
            )}
          </div>

          {/* Expandable execution details at bottom */}
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '0 clamp(1.5rem, 5vw, 3rem) 3rem'
          }}>
            <button
              onClick={() => setShowDetailPanel(!showDetailPanel)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                color: theme.muted,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                width: '100%',
                justifyContent: 'center'
              }}
            >
              {showDetailPanel ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {showDetailPanel ? 'Hide execution details' : 'View execution details'}
            </button>

            {showDetailPanel && (
              <div style={{
                marginTop: '1rem',
                padding: '1.5rem',
                background: theme.surface,
                borderRadius: '12px',
                border: `1px solid ${theme.border}`
              }}>
                <h3 style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: theme.text,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '1rem'
                }}>
                  Execution Summary
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  {workflow.steps.map((step) => {
                    const state = stepStates[step.id];
                    return (
                      <div
                        key={step.id}
                        style={{
                          padding: '0.75rem',
                          background: theme.elevated,
                          borderRadius: '8px',
                          border: `1px solid ${theme.border}`
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.35rem'
                        }}>
                          <Check size={14} style={{ color: theme.success }} />
                          <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: theme.text }}>
                            {step.name}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: theme.subtle }}>
                          {state?.tokensIn?.toLocaleString()} in · {state?.tokensOut?.toLocaleString()} out · ${state?.cost?.toFixed(3)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // PRE-RUN / DURING RUN: Two-column layout (Details | Runner)
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: theme.bg,
        color: theme.text,
        fontFamily: 'var(--font-inter)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(6rem, 10vh, 8rem) clamp(1.5rem, 5vw, 3rem) 3rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '2rem',
            minHeight: 'calc(100vh - 12rem)'
          }}>
            {/* Left: Details */}
            <div style={{ minWidth: 0 }}>
              <DetailContent />
            </div>

            {/* Right: Runner */}
            <div style={{ minWidth: 0 }}>
              <RunnerContent />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MOBILE LAYOUT - Stacked with tabs
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: 'var(--font-inter)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Segmented Tab Control */}
      <div style={{
        position: 'sticky',
        top: '64px',
        zIndex: 10,
        padding: '0.75rem 1rem',
        background: theme.bg,
        borderBottom: `1px solid ${theme.border}`
      }}>
        <div style={{
          display: 'flex',
          background: theme.elevated,
          borderRadius: '8px',
          padding: '4px'
        }}>
          {[
            { id: 'run', label: 'Run Demo' },
            { id: 'about', label: 'About' },
            { id: 'artifact', label: 'Artifact', badge: showArtifact }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setMobileTab(tab.id as MobileTab)}
              style={{
                flex: 1,
                padding: '0.625rem 0.75rem',
                background: mobileTab === tab.id ? theme.accent : 'transparent',
                border: 'none',
                borderRadius: '6px',
                color: mobileTab === tab.id ? 'white' : theme.muted,
                fontSize: '0.8125rem',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
              {tab.badge && (
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: mobileTab === tab.id ? 'white' : theme.success
                }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {mobileTab === 'run' && <RunnerContent />}
        {mobileTab === 'about' && <DetailContent />}
        {mobileTab === 'artifact' && <ArtifactContent />}
      </div>
    </div>
  );
}

// Simple markdown to HTML converter
function simpleMarkdownToHtml(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3 style="font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.75rem; color: #fafafa;">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="font-size: 1.5rem; font-weight: 500; margin: 2rem 0 1rem; color: #fafafa; font-family: var(--font-literata);">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 style="font-size: 2rem; font-weight: 400; margin: 0 0 1.5rem; color: #fafafa; font-family: var(--font-literata);">$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong style="color: #fafafa;">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Blockquotes
    .replace(/^\> (.*$)/gim, '<blockquote style="border-left: 3px solid #8b5cf6; padding-left: 1rem; margin: 1rem 0; color: #a1a1aa; font-style: italic;">$1</blockquote>')
    // Horizontal rules
    .replace(/^---$/gim, '<hr style="border: none; border-top: 1px solid rgba(63, 63, 70, 0.4); margin: 2rem 0;" />')
    // Lists
    .replace(/^\- (.*$)/gim, '<li style="margin-bottom: 0.35rem;">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li style="margin-bottom: 0.35rem;">$1</li>')
    // Tables - basic support
    .replace(/\|(.*)\|/gim, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.some(c => c.includes('---'))) return '';
      const cellTags = cells.map(c => `<td style="padding: 0.5rem; border: 1px solid rgba(63, 63, 70, 0.4);">${c.trim()}</td>`).join('');
      return `<tr>${cellTags}</tr>`;
    })
    // Paragraphs
    .replace(/\n\n/g, '</p><p style="margin: 1rem 0;">')
    // Line breaks
    .replace(/\n/g, '<br />');

  // Wrap in paragraph if not starting with a tag
  if (!html.startsWith('<')) {
    html = `<p style="margin: 1rem 0;">${html}</p>`;
  }

  // Wrap consecutive li elements in ul
  html = html.replace(/(<li.*?<\/li>\s*)+/g, '<ul style="padding-left: 1.5rem; margin: 1rem 0;">$&</ul>');

  // Wrap consecutive tr elements in table
  html = html.replace(/(<tr.*?<\/tr>\s*)+/g, '<table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">$&</table>');

  return html;
}
