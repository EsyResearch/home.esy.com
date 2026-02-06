"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';

interface DiscussionPanelProps {
  isDark: boolean;
}

export default function DiscussionPanel({ isDark }: DiscussionPanelProps) {
  const accent = isDark ? '#00D4AA' : '#00A896';
  const muted = isDark ? 'rgba(255,255,255,0.5)' : '#8E9AAF';
  const border = isDark ? 'rgba(255,255,255,0.08)' : '#E9ECEF';

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        width: '56px', height: '56px', borderRadius: '50%',
        backgroundColor: isDark ? 'rgba(0,212,170,0.1)' : 'rgba(0,168,150,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1rem',
      }}>
        <MessageCircle size={24} color={accent} />
      </div>
      <h3 style={{
        fontSize: '1rem', fontWeight: 600,
        color: isDark ? '#FFFFFF' : '#333333',
        margin: '0 0 0.5rem',
      }}>
        Discussion Coming Soon
      </h3>
      <p style={{
        fontSize: '0.813rem', color: muted,
        textAlign: 'center', lineHeight: 1.6,
        maxWidth: '280px', margin: 0,
      }}>
        Ask questions, share insights, and connect with other learners.
        Discussion will be available in a future update.
      </p>
      <div style={{
        marginTop: '1.25rem',
        padding: '0.5rem 1rem',
        backgroundColor: isDark ? 'rgba(0,212,170,0.08)' : 'rgba(0,168,150,0.06)',
        border: `1px solid ${isDark ? 'rgba(0,212,170,0.15)' : 'rgba(0,168,150,0.12)'}`,
        borderRadius: '8px',
        fontSize: '0.75rem',
        color: accent,
      }}>
        Notify me when available
      </div>
    </div>
  );
}
