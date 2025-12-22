"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, Play, Clock, DollarSign,
  ChevronRight, Sparkles, Filter,
  FileText, BarChart3, Calendar, ClipboardList,
  Info
} from 'lucide-react';
import { elevatedDarkTheme } from '@/lib/theme';
import {
  workflows,
  ARTIFACT_TYPE_INFO,
  DIFFICULTY_INFO,
  type Workflow,
  type ArtifactType,
  type Difficulty
} from '@/data/workflows';

const theme = elevatedDarkTheme;

// Artifact type icons
const ARTIFACT_ICONS: Record<ArtifactType, React.ReactNode> = {
  essay: <FileText size={18} />,
  infographic: <BarChart3 size={18} />,
  timeline: <Calendar size={18} />,
  brief: <ClipboardList size={18} />
};

type SortOption = 'popular' | 'newest' | 'fastest';

export default function WorkflowsClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ArtifactType | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Filter and sort workflows
  const filteredWorkflows = useMemo(() => {
    let result = [...workflows];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(w =>
        w.title.toLowerCase().includes(q) ||
        w.subtitle.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q)
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      result = result.filter(w => w.artifactType === selectedType);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      result = result.filter(w => w.difficulty === selectedDifficulty);
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'fastest':
        result.sort((a, b) => a.estimatedCost - b.estimatedCost);
        break;
    }

    return result;
  }, [searchQuery, selectedType, selectedDifficulty, sortBy]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: 'var(--font-inter)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(1.5rem, 5vw, 3rem)'
      }}>
        {/* Hero Section */}
        <section style={{
          paddingTop: 'clamp(6rem, 12vh, 8rem)',
          paddingBottom: 'clamp(3rem, 6vh, 4rem)'
        }}>
          <h1 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            color: theme.text,
            lineHeight: 1.2
          }}>
            Workflow Demonstrations
          </h1>

          <p style={{
            fontSize: '1.25rem',
            color: theme.muted,
            maxWidth: '700px',
            lineHeight: 1.6,
            marginBottom: '2rem'
          }}>
            Run demo workflows to see how Esy transforms intent into artifacts.
            Watch the pipeline execute step-by-step with full token and cost visibility.
          </p>

          {/* Demo Banner */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1.25rem',
            background: `${theme.accent}10`,
            border: `1px solid ${theme.accentBorder}`,
            borderRadius: '8px',
            fontSize: '0.875rem',
            color: theme.muted
          }}>
            <Info size={16} style={{ color: theme.accent }} />
            <span>
              These are public demos with mock execution. Real workflows run on{' '}
              <Link
                href="https://app.esy.com"
                style={{ color: theme.accent, textDecoration: 'none' }}
              >
                app.esy.com
              </Link>
            </span>
          </div>
        </section>

        {/* Filter Bar */}
        <section style={{
          position: 'sticky',
          top: '80px',
          zIndex: 10,
          paddingTop: '1rem',
          paddingBottom: '1rem',
          marginBottom: '2rem',
          background: theme.bg,
          borderBottom: `1px solid ${theme.border}`
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center'
          }}>
            {/* Search */}
            <div style={{
              position: 'relative',
              flex: '1 1 250px',
              minWidth: '200px',
              maxWidth: '400px'
            }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: theme.subtle,
                  pointerEvents: 'none'
                }}
              />
              <input
                type="text"
                placeholder="Search workflows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.75rem',
                  background: theme.elevated,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  color: theme.text,
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = theme.accent;
                  e.target.style.boxShadow = `0 0 0 3px ${theme.accentGlow}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme.border;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as ArtifactType | 'all')}
              style={{
                padding: '0.75rem 2.5rem 0.75rem 1rem',
                background: theme.elevated,
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                color: theme.text,
                fontSize: '0.875rem',
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option value="all">All Types</option>
              <option value="essay">Essay</option>
              <option value="infographic">Infographic</option>
              <option value="timeline">Timeline</option>
              <option value="brief">Brief</option>
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | 'all')}
              style={{
                padding: '0.75rem 2.5rem 0.75rem 1rem',
                background: theme.elevated,
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                color: theme.text,
                fontSize: '0.875rem',
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              style={{
                padding: '0.75rem 2.5rem 0.75rem 1rem',
                background: theme.elevated,
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                color: theme.text,
                fontSize: '0.875rem',
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="fastest">Fastest</option>
            </select>

            {/* Results count */}
            <span style={{
              fontSize: '0.875rem',
              color: theme.subtle,
              marginLeft: 'auto'
            }}>
              {filteredWorkflows.length} workflow{filteredWorkflows.length !== 1 ? 's' : ''}
            </span>
          </div>
        </section>

        {/* Workflow Grid */}
        <section style={{ paddingBottom: '4rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredWorkflows.map((workflow) => (
              <WorkflowCard
                key={workflow.slug}
                workflow={workflow}
                isHovered={hoveredCard === workflow.slug}
                onHover={() => setHoveredCard(workflow.slug)}
                onLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>

          {filteredWorkflows.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: theme.muted
            }}>
              <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                No workflows match your filters
              </p>
              <p style={{ fontSize: '0.875rem', color: theme.subtle }}>
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </section>

        {/* Why Public Demos Section */}
        <section style={{
          paddingTop: '3rem',
          paddingBottom: '4rem',
          borderTop: `1px solid ${theme.divider}`
        }}>
          <h2 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: '1.5rem',
            fontWeight: 400,
            color: theme.text,
            marginBottom: '1rem'
          }}>
            Why Public Demos?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{ color: theme.muted, lineHeight: 1.7 }}>
              <h3 style={{
                color: theme.text,
                fontSize: '1rem',
                fontWeight: 500,
                marginBottom: '0.5rem'
              }}>
                Transparency
              </h3>
              <p style={{ fontSize: '0.9375rem' }}>
                See exactly how Esy processes intent into artifacts. Every step, every token, every decision is visible.
              </p>
            </div>
            <div style={{ color: theme.muted, lineHeight: 1.7 }}>
              <h3 style={{
                color: theme.text,
                fontSize: '1rem',
                fontWeight: 500,
                marginBottom: '0.5rem'
              }}>
                Learning
              </h3>
              <p style={{ fontSize: '0.9375rem' }}>
                Understand workflow design before building your own. These demos teach the principles of spec-driven pipelines.
              </p>
            </div>
            <div style={{ color: theme.muted, lineHeight: 1.7 }}>
              <h3 style={{
                color: theme.text,
                fontSize: '1rem',
                fontWeight: 500,
                marginBottom: '0.5rem'
              }}>
                No Risk
              </h3>
              <p style={{ fontSize: '0.9375rem' }}>
                These are deterministic demos—no API costs, no account required. Experiment freely.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Workflow Card Component
function WorkflowCard({
  workflow,
  isHovered,
  onHover,
  onLeave
}: {
  workflow: Workflow;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const typeInfo = ARTIFACT_TYPE_INFO[workflow.artifactType];
  const difficultyInfo = DIFFICULTY_INFO[workflow.difficulty];

  return (
    <Link
      href={`/workflows/${workflow.slug}`}
      style={{ textDecoration: 'none' }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div style={{
        background: isHovered
          ? theme.gradients.hover
          : theme.gradients.featured,
        border: `1px solid ${isHovered ? theme.accentBorder : theme.border}`,
        borderRadius: '16px',
        padding: '1.5rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? theme.shadows.hover : theme.shadows.sm,
        cursor: 'pointer'
      }}>
        {/* Header: Type + Difficulty */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          {/* Artifact Type Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.75rem',
            background: `${typeInfo.color}15`,
            border: `1px solid ${typeInfo.color}30`,
            borderRadius: '6px',
            color: typeInfo.color,
            fontSize: '0.75rem',
            fontWeight: 500
          }}>
            {ARTIFACT_ICONS[workflow.artifactType]}
            <span>{typeInfo.label}</span>
          </div>

          {/* Difficulty + New Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {workflow.isNew && (
              <span style={{
                padding: '0.25rem 0.5rem',
                background: theme.accent,
                borderRadius: '4px',
                color: 'white',
                fontSize: '0.625rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                New
              </span>
            )}
            <span style={{
              padding: '0.25rem 0.5rem',
              background: `${difficultyInfo.color}15`,
              border: `1px solid ${difficultyInfo.color}30`,
              borderRadius: '4px',
              color: difficultyInfo.color,
              fontSize: '0.6875rem',
              fontWeight: 500
            }}>
              {difficultyInfo.label}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-literata)',
          fontSize: '1.25rem',
          fontWeight: 400,
          color: theme.text,
          marginBottom: '0.5rem',
          lineHeight: 1.3
        }}>
          {workflow.title}
        </h3>

        {/* Subtitle */}
        <p style={{
          fontSize: '0.9375rem',
          color: theme.muted,
          marginBottom: '1rem',
          lineHeight: 1.5
        }}>
          {workflow.subtitle}
        </p>

        {/* What You'll Learn */}
        <div style={{
          flex: 1,
          marginBottom: '1.25rem'
        }}>
          <p style={{
            fontSize: '0.75rem',
            color: theme.subtle,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem'
          }}>
            What you&apos;ll learn
          </p>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            fontSize: '0.8125rem',
            color: theme.muted
          }}>
            {workflow.whatYouLearn.slice(0, 3).map((item, i) => (
              <li key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                marginBottom: '0.35rem'
              }}>
                <span style={{ color: theme.accent, flexShrink: 0 }}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer: Stats + CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '1rem',
          borderTop: `1px solid ${theme.divider}`
        }}>
          {/* Stats */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.75rem',
            color: theme.subtle
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={12} />
              {workflow.estimatedTime}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <DollarSign size={12} />
              ~${workflow.estimatedCost.toFixed(2)}
            </span>
          </div>

          {/* CTA */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: theme.accent,
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'gap 0.2s'
          }}>
            <Play size={14} />
            <span>Run demo</span>
            <ChevronRight
              size={14}
              style={{
                transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
                transition: 'transform 0.2s'
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
