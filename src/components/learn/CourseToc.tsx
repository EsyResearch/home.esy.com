"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ChevronDown, ChevronRight, Check, PlayCircle, Clock, Search, X
} from 'lucide-react';
import type { Course, Lesson, LessonProgress } from '@/lib/learn/types';

interface CourseTocProps {
  course: Course;
  currentLessonSlug: string;
  progress: Record<string, LessonProgress>;
  isDark: boolean;
  onClose?: () => void;
}

export default function CourseToc({ course, currentLessonSlug, progress, isDark, onClose }: CourseTocProps) {
  const [search, setSearch] = useState('');
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    course.chapters.forEach((ch, i) => {
      const hasCurrent = ch.lessons.some(l => l.slug === currentLessonSlug);
      init[i] = hasCurrent || i === 0;
    });
    return init;
  });

  const accent = isDark ? '#00D4AA' : '#00A896';
  const bg = 'transparent'; // Inherits from parent sidebar
  const surface = isDark ? 'rgba(15, 52, 96, 0.4)' : '#FFFFFF';
  const text = isDark ? '#FFFFFF' : '#1A1A2E';
  const muted = isDark ? 'rgba(255,255,255,0.55)' : '#6C757D';
  const border = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const hoverBg = isDark ? 'rgba(0,212,170,0.06)' : 'rgba(0,168,150,0.05)';
  const activeBg = isDark ? 'rgba(0,212,170,0.12)' : 'rgba(0,168,150,0.08)';

  const filteredChapters = useMemo(() => {
    if (!search.trim()) return course.chapters;
    const q = search.toLowerCase();
    return course.chapters.map(ch => ({
      ...ch,
      lessons: ch.lessons.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.transcript.some(seg => seg.text.toLowerCase().includes(q))
      ),
    })).filter(ch => ch.lessons.length > 0);
  }, [course, search]);

  const totalLessons = course.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const completedCount = Object.values(progress).filter(p => p.courseSlug === course.slug && p.completed).length;

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      backgroundColor: bg,
    }}>
      {/* Header */}
      <div style={{
        padding: '1.25rem 1rem 1rem', borderBottom: `1px solid ${border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <h2 style={{
            fontSize: '0.938rem', fontWeight: 600, color: text,
            margin: 0, lineHeight: 1.3,
          }}>
            {course.title}
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close table of contents"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '28px', height: '28px', borderRadius: '6px',
                background: 'transparent', border: 'none', color: muted,
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div style={{
            flex: 1, height: '4px', borderRadius: '2px',
            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#E9ECEF',
          }}>
            <div style={{
              width: `${totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0}%`,
              height: '100%', borderRadius: '2px', backgroundColor: accent,
              transition: 'width 0.3s ease',
            }} />
          </div>
          <span style={{ fontSize: '0.688rem', color: muted, whiteSpace: 'nowrap' }}>
            {completedCount}/{totalLessons}
          </span>
        </div>

        {/* Search */}
        <div style={{
          position: 'relative', display: 'flex', alignItems: 'center',
        }}>
          <Search size={14} style={{ position: 'absolute', left: '0.625rem', color: muted }} />
          <input
            type="text"
            placeholder="Search this course…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '0.5rem 0.5rem 0.5rem 2rem',
              fontSize: '0.813rem', color: text,
              backgroundColor: surface, border: `1px solid ${border}`,
              borderRadius: '6px', outline: 'none',
            }}
            aria-label="Search course lessons"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute', right: '0.5rem',
                background: 'none', border: 'none', color: muted,
                cursor: 'pointer', display: 'flex',
              }}
              aria-label="Clear search"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Chapters & lessons */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 0' }}>
        {filteredChapters.map((ch, chIdx) => {
          const isExpanded = expandedChapters[chIdx] ?? false;
          return (
            <div key={chIdx}>
              {/* Chapter header */}
              <button
                onClick={() => setExpandedChapters(prev => ({ ...prev, [chIdx]: !prev[chIdx] }))}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  width: '100%', padding: '0.625rem 1rem',
                  background: 'transparent', border: 'none',
                  color: muted, fontSize: '0.688rem', fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                  cursor: 'pointer', textAlign: 'left',
                }}
                aria-expanded={isExpanded}
              >
                {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                {ch.title}
                <span style={{ marginLeft: 'auto', fontSize: '0.625rem', fontWeight: 400 }}>
                  {ch.lessons.length} lessons
                </span>
              </button>

              {/* Lessons */}
              {isExpanded && ch.lessons.map((lesson) => {
                const isCurrent = lesson.slug === currentLessonSlug;
                const progressData = progress[`${course.slug}/${lesson.slug}`];
                const isCompleted = progressData?.completed;
                const isInProgress = progressData && !progressData.completed && progressData.lastWatchedMs > 0;

                return (
                  <Link
                    key={lesson.slug}
                    href={`/courses/${course.slug}/${lesson.slug}`}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.625rem',
                      padding: '0.625rem 1rem 0.625rem 1.75rem',
                      textDecoration: 'none',
                      backgroundColor: isCurrent ? activeBg : 'transparent',
                      borderLeft: isCurrent ? `2px solid ${accent}` : '2px solid transparent',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => { if (!isCurrent) e.currentTarget.style.backgroundColor = hoverBg; }}
                    onMouseLeave={e => { if (!isCurrent) e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    {/* Status icon */}
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: '1px', flexShrink: 0,
                      backgroundColor: isCompleted ? accent : isCurrent ? `${accent}33` : 'transparent',
                      border: isCompleted ? 'none' : `1.5px solid ${isCurrent ? accent : isDark ? 'rgba(255,255,255,0.2)' : '#CED4DA'}`,
                    }}>
                      {isCompleted ? (
                        <Check size={11} color={isDark ? '#0A2540' : '#FFFFFF'} strokeWidth={3} />
                      ) : isCurrent ? (
                        <PlayCircle size={12} color={accent} />
                      ) : null}
                    </div>

                    {/* Lesson info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.813rem', fontWeight: isCurrent ? 600 : 400,
                        color: isCurrent ? accent : text,
                        lineHeight: 1.4,
                        overflow: 'hidden', textOverflow: 'ellipsis',
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                      }}>
                        {lesson.title}
                      </div>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.375rem',
                        marginTop: '0.25rem',
                      }}>
                        <Clock size={10} color={muted} />
                        <span style={{ fontSize: '0.688rem', color: muted }}>
                          {lesson.durationLabel}
                        </span>
                        {isInProgress && (
                          <span style={{
                            fontSize: '0.625rem', color: accent,
                            backgroundColor: `${accent}15`,
                            padding: '1px 6px', borderRadius: '3px',
                          }}>
                            In Progress
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
