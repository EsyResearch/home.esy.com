/**
 * LessonClient — Main client component for the Esy Video Lesson experience.
 * 
 * Architecture: Three-surface layout
 *   A) NAVIGATION (left): Course outline, progress, search
 *   B) PRIMARY LEARNING (center): Video player, title, controls
 *   C) RESEARCH (right): Tabs for Transcript, Commentary, Notes, Discussion
 * 
 * State Management:
 *   - Video time synced via ref callbacks (no heavy state)
 *   - Notes persisted in localStorage (keyed by course/lesson slug)
 *   - Progress persisted in localStorage
 *   - Theme read from body class (set by parent or nav system)
 * 
 * To swap in real APIs later:
 *   - Replace mockData imports with fetch calls in page.tsx
 *   - Pass course/lesson as props (already structured this way)
 *   - Replace localStorage notes with API calls
 *   - Replace localStorage progress with API calls
 */

"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen,
  Maximize2, Minimize2, ChevronLeft, ChevronRight, Menu,
  BookOpen, FileText, Edit3, MessageCircle, User, Calendar, Clock,
  Sun, Moon
} from 'lucide-react';

import VideoPlayer, { type VideoPlayerHandle } from '@/components/learn/VideoPlayer';
import CourseToc from '@/components/learn/CourseToc';
import TranscriptPanel from '@/components/learn/TranscriptPanel';
import CommentaryPanel from '@/components/learn/CommentaryPanel';
import NotesPanel from '@/components/learn/NotesPanel';
import DiscussionPanel from '@/components/learn/DiscussionPanel';

import type { Course, Lesson, LessonProgress, UserNote } from '@/lib/learn/types';
import { getAdjacentLessons } from '@/lib/learn/mockData';
import { navyCalmDarkTheme } from '@/lib/theme';
import { lightTheme } from '@/lib/lightTheme';
import Link from 'next/link';

import './lesson.css';

interface LessonClientProps {
  course: Course;
  lesson: Lesson;
  chapterTitle: string;
}

// ─── localStorage helpers ──────────────────────────────────
const PROGRESS_KEY = 'esy-course-progress';
const NOTES_KEY = 'esy-course-notes';

function loadProgress(): Record<string, LessonProgress> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  } catch { return {}; }
}

function saveProgress(progress: Record<string, LessonProgress>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function loadNotes(courseSlug: string, lessonSlug: string): UserNote[] {
  if (typeof window === 'undefined') return [];
  try {
    const all = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
    return all[`${courseSlug}/${lessonSlug}`] || [];
  } catch { return []; }
}

function saveNotes(courseSlug: string, lessonSlug: string, notes: UserNote[]) {
  if (typeof window === 'undefined') return;
  try {
    const all = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
    all[`${courseSlug}/${lessonSlug}`] = notes;
    localStorage.setItem(NOTES_KEY, JSON.stringify(all));
  } catch { /* ignore */ }
}

// ─── Tabs config ───────────────────────────────────────────
type TabId = 'transcript' | 'commentary' | 'notes' | 'discussion';
const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'transcript', label: 'Transcript', icon: <FileText size={14} /> },
  { id: 'commentary', label: 'Commentary', icon: <BookOpen size={14} /> },
  { id: 'notes', label: 'Notes', icon: <Edit3 size={14} /> },
  { id: 'discussion', label: 'Discussion', icon: <MessageCircle size={14} /> },
];

export default function LessonClient({ course, lesson, chapterTitle }: LessonClientProps) {
  const searchParams = useSearchParams();
  const videoRef = useRef<VideoPlayerHandle>(null);

  // ─── Theme ───────────────────────────────────
  // Always start dark (server-safe); read localStorage after mount
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme-school');
    if (stored === 'light') setIsDark(false);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isDark) {
      document.body.style.backgroundColor = navyCalmDarkTheme.bg;
      document.body.className = document.body.className.replace(/\blight\b/g, '').trim();
      if (!document.body.className.includes('dark')) document.body.className += ' dark';
      localStorage.setItem('theme-school', 'dark');
    } else {
      document.body.style.backgroundColor = lightTheme.bg;
      document.body.className = document.body.className.replace(/\bdark\b/g, '').trim();
      if (!document.body.className.includes('light')) document.body.className += ' light';
      localStorage.setItem('theme-school', 'light');
    }
    window.dispatchEvent(new Event('themechange'));
  }, [isDark, mounted]);

  // ─── Layout state ────────────────────────────
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [theater, setTheater] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('transcript');

  // ─── Video state ─────────────────────────────
  const [currentTimeMs, setCurrentTimeMs] = useState(0);

  // ─── Progress & Notes ────────────────────────
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [notes, setNotes] = useState<UserNote[]>([]);

  // Responsive
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1200);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Close left on tablet by default
  useEffect(() => {
    if (isTablet) setLeftOpen(false);
  }, [isTablet]);

  // Load progress & notes
  useEffect(() => {
    setProgress(loadProgress());
    setNotes(loadNotes(course.slug, lesson.slug));
  }, [course.slug, lesson.slug]);

  // URL timestamp ?t=
  useEffect(() => {
    const t = searchParams.get('t');
    if (t) {
      const sec = parseInt(t, 10);
      if (!isNaN(sec) && videoRef.current) {
        videoRef.current.seekTo(sec * 1000);
      }
    }
  }, [searchParams]);

  // Save progress on time update (throttled)
  const lastSaveRef = useRef(0);
  const handleTimeUpdate = useCallback((ms: number) => {
    setCurrentTimeMs(ms);
    const now = Date.now();
    if (now - lastSaveRef.current < 5000) return;
    lastSaveRef.current = now;

    const key = `${course.slug}/${lesson.slug}`;
    const durationMs = lesson.durationMs || 1;
    const completed = ms / durationMs >= 0.9;

    setProgress(prev => {
      const updated = {
        ...prev,
        [key]: {
          courseSlug: course.slug,
          lessonSlug: lesson.slug,
          lastWatchedMs: ms,
          completed,
          updatedAt: new Date().toISOString(),
        },
      };
      saveProgress(updated);
      return updated;
    });
  }, [course.slug, lesson.slug, lesson.durationMs]);

  // Notes persistence
  const handleSetNotes = useCallback((updated: UserNote[]) => {
    setNotes(updated);
    saveNotes(course.slug, lesson.slug, updated);
  }, [course.slug, lesson.slug]);

  // Seek handler
  const handleSeek = useCallback((ms: number) => {
    videoRef.current?.seekTo(ms);
  }, []);

  // Adjacent lessons
  const { prev, next } = useMemo(() => getAdjacentLessons(course, lesson.slug), [course, lesson.slug]);

  // Initial resume time
  const initialTimeMs = useMemo(() => {
    const p = progress[`${course.slug}/${lesson.slug}`];
    return p?.lastWatchedMs || 0;
  }, [progress, course.slug, lesson.slug]);

  // Colors — distinct surfaces for visual hierarchy
  const accent = isDark ? '#00D4AA' : '#00A896';
  const bgMain = isDark ? navyCalmDarkTheme.bg : '#FFFFFF';                   // Center: primary bg
  const bgSidebar = isDark ? '#05101F' : '#F5F6F8';                           // Sidebars: slightly deeper/lighter
  const textColor = isDark ? '#FFFFFF' : '#1A1A2E';
  const mutedColor = isDark ? 'rgba(255,255,255,0.5)' : '#8E9AAF';
  const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';

  // Grid class
  let layoutClass = 'lesson-layout';
  if (theater) layoutClass += ' lesson-layout--theater';
  else if (!leftOpen && !rightOpen) layoutClass += ' lesson-layout--no-both';
  else if (!leftOpen) layoutClass += ' lesson-layout--no-left';
  else if (!rightOpen) layoutClass += ' lesson-layout--no-right';

  return (
    <>
      {/* Theme toggle */}
      <button
        onClick={() => setIsDark(d => !d)}
        style={{
          position: 'fixed', bottom: '4.5rem',
          right: '1.25rem',
          width: '36px', height: '36px', borderRadius: '50%',
          backgroundColor: isDark ? 'rgba(15, 52, 96, 0.95)' : 'rgba(255,255,255,0.95)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 50,
          boxShadow: isDark ? '0 2px 16px rgba(0,0,0,0.4)' : '0 2px 16px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.2s ease',
        }}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={14} color="#00D4AA" /> : <Moon size={14} color="#00A896" />}
      </button>

      {/* Mobile drawer */}
      {isMobile && drawerOpen && (
        <>
          <div className="lesson-drawer-overlay" onClick={() => setDrawerOpen(false)} />
          <div className="lesson-drawer" style={{ backgroundColor: isDark ? '#05101F' : '#F5F6F8' }}>
            <CourseToc
              course={course}
              currentLessonSlug={lesson.slug}
              progress={progress}
              isDark={isDark}
              onClose={() => setDrawerOpen(false)}
            />
          </div>
        </>
      )}

      <div className={layoutClass} style={{ backgroundColor: bgMain }}>
        {/* ═══ A) NAVIGATION (left sidebar) — hidden on mobile via CSS ═══ */}
        <div className={`lesson-toc ${!leftOpen || theater ? 'lesson-toc--collapsed' : ''}`}
          style={{
            borderRight: `1px solid ${borderColor}`,
            backgroundColor: bgSidebar,
          }}
        >
          <CourseToc
            course={course}
            currentLessonSlug={lesson.slug}
            progress={progress}
            isDark={isDark}
          />
        </div>

        {/* ═══ B) PRIMARY LEARNING (center) ═══ */}
        <div className="lesson-center" style={{ backgroundColor: bgMain }}>
          {/* Video */}
          <div className="lesson-video-wrapper">
            <VideoPlayer
              ref={videoRef}
              src={lesson.videoUrl}
              title={lesson.title}
              author={lesson.author.name}
              durationLabel={lesson.durationLabel}
              publishedAt={lesson.publishedAt}
              onTimeUpdate={handleTimeUpdate}
              initialTimeMs={initialTimeMs}
              isDark={isDark}
            />
          </div>

          {/* Control bar + meta */}
          <div className="lesson-meta" style={{ borderBottom: `1px solid ${borderColor}` }}>
            {/* Toggle buttons row */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: '0.375rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {/* Mobile: open drawer */}
                <button
                  className="lesson-toggle-btn lesson-toggle-mobile"
                  onClick={() => setDrawerOpen(true)}
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F0F0F0', color: mutedColor, display: 'none' }}
                  aria-label="Open course outline"
                >
                  <Menu size={16} />
                </button>

                {/* Desktop: toggle left sidebar */}
                <button
                  className="lesson-toggle-btn lesson-toggle-desktop"
                  onClick={() => setLeftOpen(o => !o)}
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F0F0F0', color: mutedColor }}
                  aria-label={leftOpen ? 'Close sidebar' : 'Open sidebar'}
                >
                  {leftOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
                </button>

                {/* Desktop: theater mode */}
                <button
                  className="lesson-toggle-btn lesson-toggle-desktop"
                  onClick={() => setTheater(t => !t)}
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F0F0F0', color: mutedColor }}
                  aria-label={theater ? 'Exit theater mode' : 'Theater mode'}
                >
                  {theater ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {/* Prev/Next */}
                {prev && (
                  <Link
                    href={`/courses/${course.slug}/${prev.slug}`}
                    className="lesson-toggle-btn"
                    style={{
                      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F0F0F0',
                      color: mutedColor, textDecoration: 'none',
                    }}
                    aria-label={`Previous lesson: ${prev.title}`}
                  >
                    <ChevronLeft size={16} />
                  </Link>
                )}
                {next && (
                  <Link
                    href={`/courses/${course.slug}/${next.slug}`}
                    className="lesson-toggle-btn"
                    style={{
                      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F0F0F0',
                      color: mutedColor, textDecoration: 'none',
                    }}
                    aria-label={`Next lesson: ${next.title}`}
                  >
                    <ChevronRight size={16} />
                  </Link>
                )}

                {/* Desktop: toggle right panel */}
                <button
                  className="lesson-toggle-btn lesson-toggle-desktop"
                  onClick={() => setRightOpen(o => !o)}
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F0F0F0', color: mutedColor }}
                  aria-label={rightOpen ? 'Close research panel' : 'Open research panel'}
                >
                  {rightOpen ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="lesson-title" style={{ color: textColor }}>
              {lesson.title}
            </h1>

            {/* Meta row */}
            <div className="lesson-meta-row">
              <div className="lesson-meta-item" style={{ color: mutedColor }}>
                <User size={12} />
                <span>{lesson.author.name}</span>
              </div>
              <div className="lesson-meta-item" style={{ color: mutedColor }}>
                <Calendar size={12} />
                <span>{new Date(lesson.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="lesson-meta-item" style={{ color: mutedColor }}>
                <Clock size={12} />
                <span>{lesson.durationLabel}</span>
              </div>
              <div className="lesson-meta-item" style={{
                color: accent, fontSize: '0.688rem',
                backgroundColor: `${accent}15`, padding: '1px 8px',
                borderRadius: '4px',
              }}>
                {chapterTitle}
              </div>
            </div>
          </div>

          {/* Mobile: tabs below video — shown on mobile via CSS */}
          <div className="lesson-research-mobile lesson-research" style={{ borderTopColor: borderColor }}>
            <div className="lesson-tabs" style={{ borderBottom: `1px solid ${borderColor}` }}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`lesson-tab ${activeTab === tab.id ? 'lesson-tab--active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    color: activeTab === tab.id ? accent : mutedColor,
                    borderBottomColor: activeTab === tab.id ? accent : 'transparent',
                  }}
                  aria-selected={activeTab === tab.id}
                  role="tab"
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="lesson-tab-content">
              {activeTab === 'transcript' && (
                <TranscriptPanel segments={lesson.transcript} currentTimeMs={currentTimeMs} onSeek={handleSeek} isDark={isDark} />
              )}
              {activeTab === 'commentary' && (
                <CommentaryPanel commentary={lesson.commentary} onSeek={handleSeek} isDark={isDark} />
              )}
              {activeTab === 'notes' && (
                <NotesPanel courseSlug={course.slug} lessonSlug={lesson.slug} currentTimeMs={currentTimeMs} onSeek={handleSeek} isDark={isDark} notes={notes} setNotes={handleSetNotes} />
              )}
              {activeTab === 'discussion' && (
                <DiscussionPanel isDark={isDark} />
              )}
            </div>
          </div>
        </div>

        {/* ═══ C) RESEARCH (right sidebar) — hidden on mobile via CSS ═══ */}
        <div
          className={`lesson-research lesson-research--desktop ${!rightOpen || theater ? 'lesson-research--collapsed' : ''}`}
          style={{ borderLeft: `1px solid ${borderColor}`, backgroundColor: bgSidebar }}
        >
          {/* Tabs */}
          <div className="lesson-tabs" style={{ borderBottom: `1px solid ${borderColor}` }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`lesson-tab ${activeTab === tab.id ? 'lesson-tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  color: activeTab === tab.id ? accent : mutedColor,
                  borderBottomColor: activeTab === tab.id ? accent : 'transparent',
                }}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', justifyContent: 'center' }}>
                  {tab.icon}
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="lesson-tab-content">
            {activeTab === 'transcript' && (
              <TranscriptPanel segments={lesson.transcript} currentTimeMs={currentTimeMs} onSeek={handleSeek} isDark={isDark} />
            )}
            {activeTab === 'commentary' && (
              <CommentaryPanel commentary={lesson.commentary} onSeek={handleSeek} isDark={isDark} />
            )}
            {activeTab === 'notes' && (
              <NotesPanel courseSlug={course.slug} lessonSlug={lesson.slug} currentTimeMs={currentTimeMs} onSeek={handleSeek} isDark={isDark} notes={notes} setNotes={handleSetNotes} />
            )}
            {activeTab === 'discussion' && (
              <DiscussionPanel isDark={isDark} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
