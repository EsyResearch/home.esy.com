"use client";

import React, { useState, useMemo, useCallback } from 'react';
import {
  Plus, Trash2, Download, Clock, SortAsc, SortDesc, Edit3
} from 'lucide-react';
import type { UserNote } from '@/lib/learn/types';

interface NotesPanelProps {
  courseSlug: string;
  lessonSlug: string;
  currentTimeMs: number;
  onSeek: (ms: number) => void;
  isDark: boolean;
  notes: UserNote[];
  setNotes: (notes: UserNote[]) => void;
}

function formatMs(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function NotesPanel({
  courseSlug, lessonSlug, currentTimeMs, onSeek, isDark,
  notes, setNotes,
}: NotesPanelProps) {
  const [newNote, setNewNote] = useState('');
  const [sortBy, setSortBy] = useState<'time' | 'recent'>('time');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const accent = isDark ? '#00D4AA' : '#00A896';
  const text = isDark ? '#FFFFFF' : '#1A1A2E';
  const muted = isDark ? 'rgba(255,255,255,0.5)' : '#8E9AAF';
  const border = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const inputBg = isDark ? 'rgba(15, 52, 96, 0.4)' : '#F5F6F8';
  const cardBg = isDark ? 'rgba(255,255,255,0.02)' : '#FAFBFC';

  const sortedNotes = useMemo(() => {
    const sorted = [...notes];
    if (sortBy === 'time') {
      sorted.sort((a, b) => a.timestampMs - b.timestampMs);
    } else {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return sorted;
  }, [notes, sortBy]);

  const addNote = useCallback(() => {
    if (!newNote.trim()) return;
    const note: UserNote = {
      id: `note-${Date.now()}`,
      timestampMs: currentTimeMs,
      text: newNote.trim(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...notes, note];
    setNotes(updated);
    setNewNote('');
  }, [newNote, currentTimeMs, notes, setNotes]);

  const deleteNote = useCallback((id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  }, [notes, setNotes]);

  const startEdit = useCallback((note: UserNote) => {
    setEditingId(note.id);
    setEditText(note.text);
  }, []);

  const saveEdit = useCallback(() => {
    if (!editingId || !editText.trim()) return;
    setNotes(notes.map(n => n.id === editingId ? { ...n, text: editText.trim() } : n));
    setEditingId(null);
    setEditText('');
  }, [editingId, editText, notes, setNotes]);

  const exportMarkdown = useCallback(() => {
    const sorted = [...notes].sort((a, b) => a.timestampMs - b.timestampMs);
    const lines = [
      `# Notes: ${courseSlug} / ${lessonSlug}`,
      `Exported: ${new Date().toLocaleDateString()}`,
      '',
      ...sorted.map(n => `- **[${formatMs(n.timestampMs)}]** ${n.text}`),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes-${courseSlug}-${lessonSlug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [notes, courseSlug, lessonSlug]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Add note */}
      <div style={{
        padding: '0.75rem', borderBottom: `1px solid ${border}`,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.375rem',
          marginBottom: '0.5rem',
        }}>
          <Clock size={12} color={accent} />
          <span style={{
            fontSize: '0.688rem', color: accent,
            fontVariantNumeric: 'tabular-nums',
          }}>
            {formatMs(currentTimeMs)}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <textarea
            placeholder="Add a note at current timestamp…"
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                addNote();
              }
            }}
            style={{
              flex: 1, padding: '0.5rem', fontSize: '0.813rem',
              color: text, backgroundColor: inputBg,
              border: `1px solid ${border}`, borderRadius: '6px',
              outline: 'none', resize: 'none', minHeight: '40px',
              maxHeight: '80px', fontFamily: 'inherit', lineHeight: 1.5,
            }}
            aria-label="Note text"
          />
          <button
            onClick={addNote}
            disabled={!newNote.trim()}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '36px', borderRadius: '6px',
              backgroundColor: newNote.trim() ? accent : isDark ? 'rgba(255,255,255,0.05)' : '#E9ECEF',
              border: 'none', cursor: newNote.trim() ? 'pointer' : 'default',
              color: newNote.trim() ? '#0A2540' : muted,
              flexShrink: 0, alignSelf: 'flex-end',
            }}
            aria-label="Add note"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Sort & export */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.5rem 0.75rem', borderBottom: `1px solid ${border}`,
      }}>
        <button
          onClick={() => setSortBy(s => s === 'time' ? 'recent' : 'time')}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.25rem',
            fontSize: '0.688rem', color: muted,
            background: 'none', border: 'none', cursor: 'pointer',
          }}
          aria-label={`Sort by ${sortBy === 'time' ? 'most recent' : 'timestamp'}`}
        >
          {sortBy === 'time' ? <SortAsc size={12} /> : <SortDesc size={12} />}
          {sortBy === 'time' ? 'By timestamp' : 'Most recent'}
        </button>
        {notes.length > 0 && (
          <button
            onClick={exportMarkdown}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.25rem',
              fontSize: '0.688rem', color: accent,
              background: 'none', border: 'none', cursor: 'pointer',
            }}
            aria-label="Export notes as Markdown"
          >
            <Download size={12} />
            Export
          </button>
        )}
      </div>

      {/* Notes list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
        {sortedNotes.length === 0 ? (
          <div style={{
            padding: '2rem 1rem', textAlign: 'center', color: muted,
          }}>
            <Edit3 size={24} style={{ marginBottom: '0.75rem', opacity: 0.4 }} />
            <p style={{ fontSize: '0.813rem', margin: 0 }}>
              No notes yet. Add your first note above!
            </p>
            <p style={{ fontSize: '0.688rem', margin: '0.5rem 0 0', opacity: 0.7 }}>
              Notes are saved to your browser and tied to timestamps.
            </p>
          </div>
        ) : (
          sortedNotes.map(note => (
            <div
              key={note.id}
              style={{
                padding: '0.625rem',
                backgroundColor: cardBg,
                border: `1px solid ${border}`,
                borderRadius: '8px',
                marginBottom: '0.5rem',
              }}
            >
              {/* Timestamp */}
              <button
                onClick={() => onSeek(note.timestampMs)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.25rem',
                  fontSize: '0.688rem', color: accent,
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: 0, marginBottom: '0.375rem',
                }}
                aria-label={`Jump to ${formatMs(note.timestampMs)}`}
              >
                <Clock size={10} />
                {formatMs(note.timestampMs)}
              </button>

              {/* Note text */}
              {editingId === note.id ? (
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <textarea
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    style={{
                      flex: 1, padding: '0.375rem', fontSize: '0.813rem',
                      color: text, backgroundColor: inputBg,
                      border: `1px solid ${accent}`, borderRadius: '4px',
                      outline: 'none', resize: 'none', minHeight: '36px',
                      fontFamily: 'inherit', lineHeight: 1.5,
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveEdit(); }
                      if (e.key === 'Escape') { setEditingId(null); }
                    }}
                    autoFocus
                  />
                </div>
              ) : (
                <p style={{
                  fontSize: '0.813rem', color: isDark ? 'rgba(255,255,255,0.85)' : '#444',
                  lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap',
                }}>
                  {note.text}
                </p>
              )}

              {/* Actions */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                marginTop: '0.375rem',
              }}>
                {editingId === note.id ? (
                  <>
                    <button onClick={saveEdit} style={{
                      fontSize: '0.688rem', color: accent,
                      background: 'none', border: 'none', cursor: 'pointer',
                    }}>Save</button>
                    <button onClick={() => setEditingId(null)} style={{
                      fontSize: '0.688rem', color: muted,
                      background: 'none', border: 'none', cursor: 'pointer',
                    }}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(note)} style={{
                      fontSize: '0.688rem', color: muted,
                      background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '0.25rem',
                    }}>
                      <Edit3 size={10} /> Edit
                    </button>
                    <button onClick={() => deleteNote(note.id)} style={{
                      fontSize: '0.688rem', color: isDark ? 'rgba(248,113,113,0.8)' : '#EF4444',
                      background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '0.25rem',
                    }}>
                      <Trash2 size={10} /> Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
