"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Copy, Check, Clock, DollarSign,
  FileText, ChevronRight, Zap, Play, Share2,
  Eye, Code, Calendar, Cpu, ExternalLink
} from 'lucide-react';
import { elevatedDarkTheme } from '@/lib/theme';
import {
  type Workflow,
  type ToneVariant,
  type DepthVariant,
  type CitationMode,
  getVariantKey,
  ARTIFACT_TYPE_INFO,
  DIFFICULTY_INFO
} from '@/data/workflows';

const theme = elevatedDarkTheme;

interface RunData {
  runId: string;
  workflowSlug: string;
  intent: string;
  tone: ToneVariant;
  depth: DepthVariant;
  citations: CitationMode;
  completedAt: string;
  totalTokensIn: number;
  totalTokensOut: number;
  totalCost: number;
  stepResults: {
    stepId: string;
    output: string;
    tokensIn: number;
    tokensOut: number;
    cost: number;
    duration: number;
  }[];
}

interface Props {
  workflow: Workflow;
  runId: string;
}

// Generate deterministic run data from runId seed
function generateDeterministicRun(workflow: Workflow, runId: string): RunData {
  // Use runId as seed for deterministic selection
  const seed = runId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Select intent based on seed
  const intentIndex = seed % workflow.sampleIntents.length;
  const intent = workflow.sampleIntents[intentIndex];

  // Select tone/depth/citations based on seed
  const tones: ToneVariant[] = ['neutral', 'storytelling', 'academic'];
  const depths: DepthVariant[] = ['short', 'medium', 'deep'];
  const citationModes: CitationMode[] = ['off', 'light', 'heavy'];

  const tone = tones[seed % tones.length];
  const depth = depths[(seed + 1) % depths.length];
  const citations = citationModes[(seed + 2) % citationModes.length];

  const variantKey = getVariantKey(tone, depth, citations);

  // Generate step results
  let totalTokensIn = 0;
  let totalTokensOut = 0;
  let totalCost = 0;

  const stepResults = workflow.steps.map((step) => {
    const output = step.outputVariants[variantKey] ||
      step.outputVariants['neutral-medium-off'] ||
      Object.values(step.outputVariants)[0] || '';

    totalTokensIn += step.tokenEstimateIn;
    totalTokensOut += step.tokenEstimateOut;
    totalCost += step.costEstimate;

    return {
      stepId: step.id,
      output,
      tokensIn: step.tokenEstimateIn,
      tokensOut: step.tokenEstimateOut,
      cost: step.costEstimate,
      duration: step.duration,
    };
  });

  // Generate a deterministic timestamp
  const baseDate = new Date('2024-12-21T10:00:00Z');
  baseDate.setMinutes(baseDate.getMinutes() + (seed % 1440));

  return {
    runId,
    workflowSlug: workflow.slug,
    intent,
    tone,
    depth,
    citations,
    completedAt: baseDate.toISOString(),
    totalTokensIn,
    totalTokensOut,
    totalCost,
    stepResults,
  };
}

// Load run from localStorage or generate deterministic
function loadRunData(workflow: Workflow, runId: string): RunData {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(`esy-workflow-run-${runId}`);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fall through to generate
      }
    }
  }
  return generateDeterministicRun(workflow, runId);
}

export default function RunReplayClient({ workflow, runId }: Props) {
  const router = useRouter();
  const [runData, setRunData] = useState<RunData | null>(null);
  const [artifactView, setArtifactView] = useState<'preview' | 'markdown'>('preview');
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());

  // Load run data on mount
  useEffect(() => {
    const data = loadRunData(workflow, runId);
    setRunData(data);

    // Log analytics
    console.log('[Analytics] workflow_run_replayed', { slug: workflow.slug, runId });
  }, [workflow, runId]);

  // Get artifact content
  const getArtifactContent = useMemo(() => {
    if (!runData) return '';
    const variantKey = getVariantKey(runData.tone, runData.depth, runData.citations);
    return workflow.artifactVariants[variantKey] ||
      workflow.artifactVariants['neutral-medium-off'] ||
      Object.values(workflow.artifactVariants)[0] || '';
  }, [runData, workflow]);

  // Copy artifact
  const copyArtifact = async () => {
    await navigator.clipboard.writeText(getArtifactContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    console.log('[Analytics] artifact_copied', { slug: workflow.slug, runId });
  };

  // Copy share link
  const copyShareLink = async () => {
    const url = `${window.location.origin}/workflows/${workflow.slug}/runs/${runId}`;
    await navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  // Duplicate run - navigate to workflow with pre-filled settings
  const duplicateRun = () => {
    router.push(`/workflows/${workflow.slug}`);
  };

  // Toggle step expansion
  const toggleStep = (stepId: string) => {
    setExpandedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  if (!runData) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: theme.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: theme.muted }}>Loading run data...</div>
      </div>
    );
  }

  const typeInfo = ARTIFACT_TYPE_INFO[workflow.artifactType];
  const difficultyInfo = DIFFICULTY_INFO[workflow.difficulty];
  const completedDate = new Date(runData.completedAt);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: 'var(--font-inter)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(6rem, 10vh, 8rem) clamp(1.5rem, 5vw, 3rem) 3rem'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          {/* Breadcrumb */}
          <Link
            href={`/workflows/${workflow.slug}`}
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
            Back to {workflow.title}
          </Link>

          {/* Title */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <h1 style={{
              fontFamily: 'var(--font-literata)',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 400,
              color: theme.text,
              margin: 0
            }}>
              Run Replay
            </h1>
            <span style={{
              padding: '0.35rem 0.75rem',
              background: `${typeInfo.color}15`,
              border: `1px solid ${typeInfo.color}30`,
              borderRadius: '6px',
              color: typeInfo.color,
              fontSize: '0.75rem',
              fontWeight: 500
            }}>
              {typeInfo.label}
            </span>
          </div>

          {/* Run ID and timestamp */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1.5rem',
            fontSize: '0.875rem',
            color: theme.subtle
          }}>
            <span style={{ fontFamily: 'var(--font-mono, monospace)' }}>
              ID: {runId}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={14} />
              {completedDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {/* Left Column: Run Summary + Steps */}
          <div>
            {/* Run Configuration */}
            <div style={{
              background: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: theme.text,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem'
              }}>
                Run Configuration
              </h2>

              {/* Intent */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  color: theme.subtle,
                  marginBottom: '0.35rem'
                }}>
                  Intent
                </label>
                <p style={{
                  fontSize: '0.9375rem',
                  color: theme.text,
                  margin: 0,
                  padding: '0.75rem',
                  background: theme.elevated,
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`
                }}>
                  {runData.intent}
                </p>
              </div>

              {/* Settings Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    color: theme.subtle,
                    marginBottom: '0.35rem'
                  }}>
                    Tone
                  </label>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.35rem 0.75rem',
                    background: theme.elevated,
                    borderRadius: '6px',
                    fontSize: '0.8125rem',
                    color: theme.text,
                    textTransform: 'capitalize'
                  }}>
                    {runData.tone}
                  </span>
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    color: theme.subtle,
                    marginBottom: '0.35rem'
                  }}>
                    Depth
                  </label>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.35rem 0.75rem',
                    background: theme.elevated,
                    borderRadius: '6px',
                    fontSize: '0.8125rem',
                    color: theme.text,
                    textTransform: 'capitalize'
                  }}>
                    {runData.depth}
                  </span>
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    color: theme.subtle,
                    marginBottom: '0.35rem'
                  }}>
                    Citations
                  </label>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.35rem 0.75rem',
                    background: theme.elevated,
                    borderRadius: '6px',
                    fontSize: '0.8125rem',
                    color: theme.text,
                    textTransform: 'capitalize'
                  }}>
                    {runData.citations}
                  </span>
                </div>
              </div>
            </div>

            {/* Usage Summary */}
            <div style={{
              background: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: theme.text,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Zap size={14} style={{ color: theme.accent }} />
                Usage Summary
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem'
              }}>
                <div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: theme.text
                  }}>
                    {runData.totalTokensIn.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: theme.subtle }}>
                    Tokens In
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: theme.text
                  }}>
                    {runData.totalTokensOut.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: theme.subtle }}>
                    Tokens Out
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: theme.accent
                  }}>
                    ${runData.totalCost.toFixed(3)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: theme.subtle }}>
                    Total Cost
                  </div>
                </div>
              </div>
            </div>

            {/* Step Timeline */}
            <div style={{
              background: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: '16px',
              padding: '1.5rem'
            }}>
              <h2 style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: theme.text,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem'
              }}>
                Execution Timeline
              </h2>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {workflow.steps.map((step, index) => {
                  const result = runData.stepResults.find(r => r.stepId === step.id);
                  const isExpanded = expandedSteps.has(step.id);

                  return (
                    <div
                      key={step.id}
                      style={{
                        background: theme.elevated,
                        border: `1px solid ${theme.border}`,
                        borderRadius: '10px',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Step Header */}
                      <button
                        onClick={() => toggleStep(step.id)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.875rem 1rem',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        {/* Step number */}
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: theme.success,
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          flexShrink: 0
                        }}>
                          <Check size={14} />
                        </div>

                        {/* Step info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: theme.text
                          }}>
                            {step.name}
                          </div>
                          <div style={{
                            fontSize: '0.75rem',
                            color: theme.subtle,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                          }}>
                            <span>{step.modelLabel}</span>
                            <span>|</span>
                            <span>{result?.tokensIn?.toLocaleString()} in / {result?.tokensOut?.toLocaleString()} out</span>
                            <span>|</span>
                            <span>${result?.cost?.toFixed(3)}</span>
                          </div>
                        </div>

                        {/* Expand icon */}
                        <ChevronRight
                          size={16}
                          style={{
                            color: theme.subtle,
                            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)',
                            transition: 'transform 0.2s'
                          }}
                        />
                      </button>

                      {/* Step Output (collapsed by default) */}
                      {isExpanded && result && (
                        <div style={{
                          padding: '0 1rem 1rem',
                          borderTop: `1px solid ${theme.border}`
                        }}>
                          <div style={{ paddingTop: '1rem' }}>
                            <label style={{
                              display: 'block',
                              fontSize: '0.6875rem',
                              color: theme.subtle,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              marginBottom: '0.5rem'
                            }}>
                              Output
                            </label>
                            <pre style={{
                              fontSize: '0.75rem',
                              color: theme.muted,
                              whiteSpace: 'pre-wrap',
                              wordWrap: 'break-word',
                              margin: 0,
                              padding: '0.75rem',
                              background: theme.surface,
                              borderRadius: '6px',
                              maxHeight: '200px',
                              overflow: 'auto',
                              fontFamily: 'var(--font-mono, monospace)'
                            }}>
                              {result.output}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Artifact + Actions */}
          <div>
            {/* Actions */}
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <button
                onClick={duplicateRun}
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
                Run Again
              </button>

              <button
                onClick={copyShareLink}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1rem',
                  background: linkCopied ? theme.success : theme.elevated,
                  border: `1px solid ${linkCopied ? theme.success : theme.border}`,
                  borderRadius: '8px',
                  color: linkCopied ? 'white' : theme.text,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {linkCopied ? <Check size={16} /> : <Share2 size={16} />}
                {linkCopied ? 'Copied!' : 'Share'}
              </button>
            </div>

            {/* Artifact Preview */}
            <div style={{
              background: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: '16px',
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
                  color: theme.text,
                  margin: 0
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
                padding: '1.5rem',
                maxHeight: '600px',
                overflow: 'auto'
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
                    {getArtifactContent}
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
                      __html: simpleMarkdownToHtml(getArtifactContent)
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple markdown to HTML converter (same as in WorkflowDetailClient)
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
