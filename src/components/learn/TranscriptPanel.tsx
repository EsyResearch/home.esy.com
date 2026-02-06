"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Search, X, ArrowDown, ArrowUp } from 'lucide-react';
import type { TranscriptSegment } from '@/lib/learn/types';

interface TranscriptPanelProps {
  segments: TranscriptSegment[];
  currentTimeMs: number;
  onSeek: (ms: number) => void;
  isDark: boolean;
}

function formatMs(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function TranscriptPanel({ segments, currentTimeMs, onSeek, isDark }: TranscriptPanelProps) {
  const [search, setSearch] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const activeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const userScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>(undefined);

  const accent = isDark ? '#00D4AA' : '#00A896';
  const text = isDark ? '#FFFFFF' : '#1A1A2E';
  const muted = isDark ? 'rgba(255,255,255,0.5)' : '#8E9AAF';
  const bg = isDark ? 'transparent' : 'transparent';
  const activeBg = isDark ? 'rgba(0,212,170,0.1)' : 'rgba(0,168,150,0.06)';
  const hoverBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const border = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const searchBg = isDark ? 'rgba(15, 52, 96, 0.4)' : '#F8F9FA';

  // Find active segment
  const activeIdx = useMemo(() => {
    for (let i = segments.length - 1; i >= 0; i--) {
      if (currentTimeMs >= segments[i].startMs) return i;
    }
    return -1;
  }, [currentTimeMs, segments]);

  // Filter by search
  const filteredSegments = useMemo(() => {
    if (!search.trim()) return segments.map((s, i) => ({ segment: s, originalIdx: i }));
    const q = search.toLowerCase();
    return segments
      .map((s, i) => ({ segment: s, originalIdx: i }))
      .filter(({ segment }) => segment.text.toLowerCase().includes(q));
  }, [segments, search]);

  // Highlight search matches
  const highlightText = useCallback((text: string) => {
    if (!search.trim()) return text;
    const q = search.toLowerCase();
    const idx = text.toLowerCase().indexOf(q);
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark style={{
          backgroundColor: `${accent}40`,
          color: 'inherit', borderRadius: '2px', padding: '0 1px',
        }}>
          {text.slice(idx, idx + search.length)}
        </mark>
        {text.slice(idx + search.length)}
      </>
    );
  }, [search, accent]);

  // Auto-scroll to active segment
  useEffect(() => {
    if (!autoScroll || search.trim() || !activeRef.current) return;
    activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [activeIdx, autoScroll, search]);

  // Detect user scrolling to pause auto-scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (userScrollRef.current) {
        setAutoScroll(false);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          userScrollRef.current = false;
        }, 2000);
      }
    };
    const handleWheel = () => { userScrollRef.current = true; };
    const handleTouchMove = () => { userScrollRef.current = true; };

    container.addEventListener('scroll', handleScroll);
    container.addEventListener('wheel', handleWheel);
    container.addEventListener('touchmove', handleTouchMove);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const matchCount = search.trim() ? filteredSegments.length : 0;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Search bar */}
      <div style={{
        padding: '0.75rem', borderBottom: `1px solid ${border}`,
        display: 'flex', flexDirection: 'column', gap: '0.5rem',
      }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={14} style={{ position: 'absolute', left: '0.625rem', color: muted }} />
          <input
            type="text"
            placeholder="Find in transcript…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '0.5rem 2rem 0.5rem 2rem',
              fontSize: '0.813rem', color: text,
              backgroundColor: searchBg, border: `1px solid ${border}`,
              borderRadius: '6px', outline: 'none',
            }}
            aria-label="Search transcript"
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
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {search.trim() ? (
            <span style={{ fontSize: '0.688rem', color: muted }}>
              {matchCount} result{matchCount !== 1 ? 's' : ''}
            </span>
          ) : <span />}
          <button
            onClick={() => setAutoScroll(a => !a)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.25rem',
              fontSize: '0.688rem', color: autoScroll ? accent : muted,
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '2px 6px', borderRadius: '4px',
            }}
            aria-label={autoScroll ? 'Disable auto-scroll' : 'Enable auto-scroll'}
          >
            <ArrowDown size={10} />
            Auto-scroll {autoScroll ? 'on' : 'off'}
          </button>
        </div>
      </div>

      {/* Transcript segments */}
      <div
        ref={containerRef}
        style={{
          flex: 1, overflowY: 'auto', padding: '0.5rem 0',
        }}
        role="list"
        aria-label="Transcript segments"
      >
        {filteredSegments.map(({ segment, originalIdx }) => {
          const isActive = originalIdx === activeIdx && !search.trim();
          return (
            <div
              key={segment.id}
              ref={isActive ? activeRef : undefined}
              role="listitem"
              onClick={() => onSeek(segment.startMs)}
              style={{
                display: 'flex', gap: '0.75rem',
                padding: '0.5rem 0.75rem',
                cursor: 'pointer',
                backgroundColor: isActive ? activeBg : 'transparent',
                borderLeft: isActive ? `2px solid ${accent}` : '2px solid transparent',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = hoverBg; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <span style={{
                fontSize: '0.688rem', color: isActive ? accent : muted,
                fontVariantNumeric: 'tabular-nums', flexShrink: 0,
                minWidth: '36px', paddingTop: '2px',
              }}>
                {formatMs(segment.startMs)}
              </span>
              <span style={{
                fontSize: '0.813rem', color: isActive ? text : isDark ? 'rgba(255,255,255,0.8)' : '#555',
                lineHeight: 1.6, fontWeight: isActive ? 500 : 400,
              }}>
                {highlightText(segment.text)}
              </span>
            </div>
          );
        })}
        {filteredSegments.length === 0 && search.trim() && (
          <div style={{
            padding: '2rem 1rem', textAlign: 'center',
            color: muted, fontSize: '0.813rem',
          }}>
            No matches found for &ldquo;{search}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}
