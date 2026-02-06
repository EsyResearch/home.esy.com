"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  PlayCircle, Clock, BookOpen, ChevronRight,
  Sparkles, Users, Award, ArrowRight, Play, Sun, Moon, Zap,
} from 'lucide-react';
import { courses } from '@/lib/learn/mockData';
import { getAllLessonsFlat } from '@/lib/learn/mockData';
import { navyCalmDarkTheme } from '@/lib/theme';
import { lightTheme } from '@/lib/lightTheme';

/* ─────────────────────────────────────────────
   Courses Index — Premium Landing Page
   Esy navy/teal brand · signature grid bg
   ───────────────────────────────────────────── */

const COURSE_ICONS: Record<string, string> = {
  'how-to-use-claude-code': '⚡',
  'chatgpt-for-research-workflows': '🔬',
  'create-educational-infographics-with-nano-banana': '🍌',
};

export default function CoursesListClient() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ─── Theme tokens ──────────────────────────────
  const accent = isDark ? '#00D4AA' : '#00A896';
  const accentLight = isDark ? '#5EEAD4' : '#00D4AA';
  const text = isDark ? '#FFFFFF' : '#1A1A2E';
  const textSecondary = isDark ? 'rgba(255,255,255,0.85)' : '#4A4A5A';
  const muted = isDark ? 'rgba(255,255,255,0.6)' : '#6C757D';
  const subtle = isDark ? 'rgba(255,255,255,0.35)' : '#ADB5BD';
  const bg = isDark ? '#0A2540' : '#FFFFFF';
  const bgAlt = isDark ? '#061527' : '#F8FAFB';
  const cardBg = isDark ? 'rgba(15, 52, 96, 0.35)' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.06)' : '#E2E8F0';
  const hoverBorder = isDark ? 'rgba(0,212,170,0.35)' : 'rgba(0,168,150,0.35)';
  const surfaceElevated = isDark ? '#0F3460' : '#F1F5F9';
  const gridLineColor = isDark ? 'rgba(255,255,255,0.025)' : 'rgba(10,37,64,0.035)';
  const tagBg = isDark ? 'rgba(0,212,170,0.1)' : 'rgba(0,168,150,0.06)';

  // ─── Stats ─────────────────────────────────────
  const totalLessons = courses.reduce((a, c) => a + c.totalLessons, 0);
  const totalCourses = courses.length;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: bg,
      color: text,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      transition: 'background-color 0.3s, color 0.3s',
    }}>
      {/* ═══ Theme Toggle ═══ */}
      <button
        onClick={() => setIsDark(d => !d)}
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem',
          width: '42px', height: '42px', borderRadius: '50%',
          backgroundColor: isDark ? 'rgba(15, 52, 96, 0.95)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 50,
          boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'all 0.2s ease',
        }}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={16} color={accent} /> : <Moon size={16} color="#4A4A5A" />}
      </button>

      {/* ═══ HERO ═══ */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: isMobile ? '100px' : '120px',
        paddingBottom: isMobile ? '3rem' : '5rem',
      }}>
        {/* Signature grid background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${gridLineColor} 1px, transparent 1px), linear-gradient(90deg, ${gridLineColor} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 30%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 30%, black 0%, transparent 70%)',
        }} />
        {/* Gradient glow */}
        <div style={{
          position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '600px',
          background: isDark
            ? 'radial-gradient(ellipse, rgba(0,212,170,0.08) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(0,168,150,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />
        {/* Secondary glow */}
          <div style={{
          position: 'absolute', top: '40%', right: '10%',
          width: '400px', height: '400px',
          background: isDark
            ? 'radial-gradient(circle, rgba(0,168,150,0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0,168,150,0.04) 0%, transparent 70%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} />

            <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: '1200px', margin: '0 auto',
          padding: isMobile ? '0 1.5rem' : '0 2.5rem',
            }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
            fontSize: '0.875rem',
            color: subtle,
          }}>
            <Link href="/" style={{ color: subtle, textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <span style={{ color: muted }}>Courses</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0 0 1.25rem',
            color: text,
            maxWidth: '700px',
          }}>
            Esy <span style={{ color: accent }}>Courses</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: isMobile ? '1rem' : '1.188rem',
            color: textSecondary,
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 0 2rem',
          }}>
            Premium video courses with interactive transcripts, instructor commentary,
            and timestamped notes. Learn from researchers, for researchers.
          </p>

          {/* Stats row */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: isMobile ? '1.5rem' : '2.5rem',
            flexWrap: 'wrap',
          }}>
            {[
              { icon: <BookOpen size={16} />, label: `${totalCourses} courses` },
              { icon: <PlayCircle size={16} />, label: `${totalLessons} lessons` },
              { icon: <Clock size={16} />, label: 'Self-paced' },
              { icon: <Award size={16} />, label: 'Free access' },
            ].map((stat, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                color: muted, fontSize: '0.875rem',
              }}>
                <span style={{ color: accent, display: 'flex' }}>{stat.icon}</span>
                {stat.label}
            </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COURSES GRID ═══ */}
      <section style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: isMobile ? '0 1.5rem 4rem' : '0 2.5rem 6rem',
      }}>
        {/* Section divider */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          marginBottom: '2.5rem',
        }}>
          <span style={{
            fontSize: '0.75rem', fontWeight: 600, color: accent,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
          }}>
            All Courses
          </span>
          <div style={{
            flex: 1, height: '1px',
            background: isDark ? 'rgba(255,255,255,0.06)' : '#E2E8F0',
          }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '1.75rem',
        }}>
          {courses.map((course, idx) => {
            const isHovered = hoveredCard === course.slug;
            const emoji = COURSE_ICONS[course.slug] || '📚';
            return (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: cardBg,
                  border: `1px solid ${isHovered ? hoverBorder : cardBorder}`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: isHovered
                    ? isDark
                      ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,170,0.1)'
                      : '0 20px 60px rgba(10,37,64,0.12), 0 0 0 1px rgba(0,168,150,0.08)'
                    : isDark
                      ? '0 2px 8px rgba(0,0,0,0.2)'
                      : '0 1px 4px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={() => setHoveredCard(course.slug)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* ─── Card Hero Area ─── */}
                <div style={{
                  position: 'relative',
                  height: '200px',
                  background: isDark
                    ? `linear-gradient(135deg, #0F3460 0%, ${idx === 0 ? '#0A2540' : idx === 1 ? '#0D2B4A' : '#081E35'} 100%)`
                    : `linear-gradient(135deg, ${idx === 0 ? '#0A2540' : idx === 1 ? '#0F3460' : '#061527'} 0%, ${idx === 0 ? '#0F3460' : idx === 1 ? '#0A2540' : '#0D2B4A'} 100%)`,
                  overflow: 'hidden',
                }}>
                  {/* Grid overlay on card */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.5,
                  }} />
                  {/* Accent glow */}
                  <div style={{
                    position: 'absolute', bottom: '-30%', right: '-10%',
                    width: '200px', height: '200px',
                    background: 'radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    transition: 'opacity 0.3s',
                    opacity: isHovered ? 1 : 0.5,
                  }} />

                  {/* Center content */}
                  <div style={{
                    position: 'relative', zIndex: 1,
                    height: '100%',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: '0.75rem',
                  }}>
                    {/* Icon */}
                    <div style={{
                      fontSize: '2.5rem',
                      filter: isHovered ? 'none' : 'grayscale(0.2)',
                      transition: 'all 0.3s',
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    }}>
                      {emoji}
                    </div>
                    {/* Play button */}
                    <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '44px', height: '44px', borderRadius: '50%',
                      backgroundColor: isHovered ? accent : 'rgba(255,255,255,0.1)',
                      border: `2px solid ${isHovered ? accent : 'rgba(255,255,255,0.2)'}`,
                      transition: 'all 0.3s',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  }}>
                      <Play size={18} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '2px' }} />
                  </div>
                    {/* Metadata */}
                  <span style={{
                    fontSize: '0.688rem', color: 'rgba(255,255,255,0.5)',
                      textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500,
                  }}>
                    {course.totalLessons} lessons · {course.totalDurationLabel}
                  </span>
                  </div>
                </div>

                {/* ─── Card Body ─── */}
                <div style={{
                  padding: '1.5rem',
                  flex: 1,
                  display: 'flex', flexDirection: 'column',
                }}>
                  <h3 style={{
                    fontSize: '1.25rem', fontWeight: 700, color: text,
                    margin: '0 0 0.625rem', lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                  }}>
                    {course.title}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem', color: muted,
                    lineHeight: 1.7, margin: '0 0 1.25rem',
                    flex: 1,
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {course.description}
                  </p>

                  {/* Tags */}
                  <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: '0.375rem',
                    marginBottom: '1.25rem',
                  }}>
                    {course.tags.slice(0, 3).map(tag => (
                      <span key={tag} style={{
                        fontSize: '0.688rem', color: accent, fontWeight: 500,
                        backgroundColor: tagBg,
                        padding: '3px 10px', borderRadius: '100px',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#E2E8F0'}`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      {course.author.avatar ? (
                        <img
                          src={course.author.avatar}
                          alt={course.author.name}
                          style={{
                            width: '30px', height: '30px', borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                      <div style={{
                          width: '30px', height: '30px', borderRadius: '50%',
                          background: `linear-gradient(135deg, ${accent}, ${accentLight})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.688rem', fontWeight: 700, color: '#0A2540',
                      }}>
                        {course.author.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      )}
                      <div>
                        <span style={{ fontSize: '0.813rem', color: text, fontWeight: 500, display: 'block', lineHeight: 1.2 }}>
                        {course.author.name}
                      </span>
                        <span style={{ fontSize: '0.688rem', color: subtle }}>
                          {course.author.role}
                        </span>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.375rem',
                      fontSize: '0.813rem', fontWeight: 600, color: accent,
                      transition: 'gap 0.2s',
                    }}>
                      View Course
                      <ArrowRight size={14} style={{
                        transition: 'transform 0.2s',
                        transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                      }} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        padding: isMobile ? '3rem 1.5rem' : '5rem 2.5rem',
        backgroundColor: '#0A2540',
      }}>
        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,212,170,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 60% 80% at 50% 50%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 50% 50%, black 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: '600px', margin: '0 auto', textAlign: 'center',
        }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            backgroundColor: 'rgba(0,212,170,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}>
            <Zap size={22} color="#00D4AA" />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-literata)',
            fontSize: isMobile ? '1.75rem' : '2.25rem',
            fontWeight: 300, color: '#FFFFFF',
            margin: '0 0 0.75rem',
            letterSpacing: '-0.01em',
          }}>
            Start Learning Today
          </h2>
          <p style={{
            fontSize: '0.938rem', color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.7, marginBottom: '2rem',
          }}>
            All courses are free during our beta. Dive into AI research workflows
            with interactive video lessons built for serious learners.
          </p>
          <Link href={`/courses/${courses[0].slug}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.875rem 2rem',
            backgroundColor: '#00A896', color: '#FFFFFF',
            borderRadius: '8px', textDecoration: 'none',
            fontWeight: 600, fontSize: '0.938rem',
            transition: 'all 0.2s',
            boxShadow: '0 4px 16px rgba(0,212,170,0.25)',
          }}>
            Browse Courses <ArrowRight size={16} />
          </Link>
      </div>
      </section>
    </div>
  );
}
