'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';
import { theme, styles } from '@/lib/research/theme';

export const CodeBlock = ({ children, language = 'javascript' }: { children: React.ReactNode, language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children?.toString() || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.codeBlock}>
      <div style={styles.codeHeader}>
        <span style={{ 
          textTransform: 'uppercase', 
          letterSpacing: '0.05em',
          fontWeight: 500
        }}>
          {language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            background: 'transparent',
            border: `1px solid ${theme.border}`,
            color: theme.textSecondary,
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre style={styles.codeContent}>
        <code>{children}</code>
      </pre>
    </div>
  );
};

export const Aside = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <aside style={{ 
      ...styles.aside,
      float: isMobile ? 'none' : 'right', 
      width: isMobile ? '100%' : '320px', 
      margin: isMobile ? '1.5rem 0' : '0 0 2rem 2rem', 
      padding: isMobile ? '1rem' : '1.25rem', 
      fontSize: isMobile ? '0.9rem' : '1rem'
    }}>
      {children}
    </aside>
  );
};

export const DropCap = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <span style={{ 
      float: 'left', 
      fontSize: isMobile ? '4rem' : '5.5rem', 
      lineHeight: 0.8, 
      fontWeight: 700, 
      color: '#8b5cf6', 
      marginRight: isMobile ? '0.5rem' : '0.75rem', 
      marginTop: isMobile ? '0.25rem' : '0.5rem',
      fontFamily: 'serif' 
    }}>{children}</span>
  );
};

export const PullQuote = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <blockquote style={{ 
      ...styles.pullQuote,
      margin: isMobile ? '2rem 0' : '2.5rem 0', 
      padding: isMobile ? '0 1rem' : '1.5rem 2rem', 
      fontSize: isMobile ? '1.1rem' : '1.25rem'
    }}>
      {children}
    </blockquote>
  );
};

export const MarginNote = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ 
      float: isMobile ? 'none' : 'right', 
      width: isMobile ? '100%' : '220px', 
      margin: isMobile ? '1rem 0' : '0 0 1.5rem 2rem', 
      padding: isMobile ? '0.875rem' : '1rem', 
      background: theme.surface, 
      borderLeft: `3px solid ${theme.border}`, 
      borderRadius: '6px', 
      color: theme.textSecondary, 
      fontSize: isMobile ? '0.875rem' : '0.98rem', 
      fontStyle: 'italic', 
      boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
      border: `1px solid ${theme.border}`
    }}>
      {children}
    </div>
  );
};

export const NextArticle = ({ href, title, subtitle }: { href: string, title: string, subtitle: string }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ 
      marginTop: isMobile ? '2rem' : '3rem', 
      padding: isMobile ? '1.5rem' : '2rem', 
      background: theme.surface, 
      borderRadius: '10px', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: `1px solid ${theme.border}`
    }}>
      <div style={{ 
        fontSize: isMobile ? '0.875rem' : '0.95rem', 
        color: theme.textTertiary, 
        marginBottom: '0.5rem', 
        fontWeight: 500 
      }}>Next Article</div>
      <Link href={href} style={{ textDecoration: 'none', color: theme.accent }}>
        <div style={{ 
          fontSize: isMobile ? '1.125rem' : '1.25rem', 
          fontWeight: 600, 
          marginBottom: '0.25rem' 
        }}>{title}</div>
        <div style={{ 
          fontSize: isMobile ? '0.95rem' : '1.05rem', 
          color: theme.textSecondary 
        }}>{subtitle}</div>
      </Link>
    </div>
  );
};

export const AuthorBox = ({ name, role }: { name: string, role: string }) => (
  <div style={{ 
    margin: '3rem 0 0 0', 
    padding: '1.5rem 2rem', 
    background: theme.surface, 
    borderRadius: '10px', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    boxShadow: '0 2px 8px #0001' 
  }}>
    <div style={{ 
      fontWeight: 700, 
      fontSize: '1.1rem', 
      color: theme.accent, 
      marginBottom: '0.25rem' 
    }}>{name}</div>
    <div style={{ 
      fontSize: '1rem', 
      color: theme.textSecondary 
    }}>{role}</div>
  </div>
);

// Chart Components
export const CachePerformanceChart = () => {
  const data = [
    { time: '0s', before: 1000, after: 50 },
    { time: '1s', before: 1200, after: 45 },
    { time: '2s', before: 1500, after: 55 },
    { time: '3s', before: 2000, after: 48 },
    { time: '4s', before: 1800, after: 52 },
    { time: '5s', before: 1600, after: 47 }
  ];

  return (
    <div style={styles.chart}>
      <h3 style={styles.chartTitle}>
        Cache Performance: Before vs After Optimization
      </h3>
      <div style={{ height: '250px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
            <XAxis 
              dataKey="time" 
              stroke={theme.textSecondary}
              fontSize={12}
            />
            <YAxis 
              stroke={theme.textSecondary}
              fontSize={12}
              label={{ value: 'Performance Metric', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: theme.textSecondary } }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                color: theme.text
              }}
            />
            <Line 
              type="monotone" 
              dataKey="before" 
              stroke="#ef4444" 
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              name="Before Optimization"
              animationDuration={2000}
              animationEasing="ease-out"
            />
            <Line 
              type="monotone" 
              dataKey="after" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              name="After Optimization"
              animationDuration={2000}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const CostReductionChart = () => {
  const data = [
    { month: 'Jan', cost: 2400 },
    { month: 'Feb', cost: 2600 },
    { month: 'Mar', cost: 2800 },
    { month: 'Apr', cost: 800 },
    { month: 'May', cost: 750 },
    { month: 'Jun', cost: 820 }
  ];

  return (
    <div style={styles.chart}>
      <h3 style={styles.chartTitle}>
        Monthly Infrastructure Costs
      </h3>
      <div style={{ height: '250px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
            <XAxis 
              dataKey="month" 
              stroke={theme.textSecondary}
              fontSize={12}
            />
            <YAxis 
              stroke={theme.textSecondary}
              fontSize={12}
              label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: theme.textSecondary } }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                color: theme.text
              }}
              formatter={(value) => [`$${value}`, 'Cost']}
            />
            <Bar 
              dataKey="cost" 
              fill={theme.accent}
              radius={[4, 4, 0, 0]}
              animationDuration={2000}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 