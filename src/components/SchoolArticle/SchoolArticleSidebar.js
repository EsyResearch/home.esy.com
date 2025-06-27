"use client"

export default function SchoolArticleSidebar({ activeSection, scrollProgress, article }) {
  // Extract sections from the article content
  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'what-is-prompt-engineering', title: 'What is Prompt Engineering?' },
    { id: 'key-principles', title: 'Key Principles' },
    { id: 'basic-techniques', title: 'Basic Techniques' },
    { id: 'advanced-strategies', title: 'Advanced Strategies' },
    { id: 'practical-examples', title: 'Practical Examples' },
    { id: 'conclusion', title: 'Conclusion' }
  ];

  return (
    <aside style={{ position: 'sticky', top: '6rem', height: 'fit-content' }}>
      <div style={{ background: '#16161f', border: '1px solid #2a2a3a', borderRadius: '16px', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          Table of Contents
        </h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                textDecoration: 'none',
                color: activeSection === section.id ? '#ffffff' : '#64748b',
                background: activeSection === section.id ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)' : 'transparent',
                borderLeft: activeSection === section.id ? '2px solid #6366f1' : '2px solid transparent',
                transition: 'all 0.3s'
              }}
            >
              {section.title}
            </a>
          ))}
        </nav>

        <div style={{ marginTop: '2rem', padding: '1rem', background: '#1e1e2a', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Reading Progress</span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6366f1' }}>{Math.round(scrollProgress)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#2a2a3a', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
              width: `${scrollProgress}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      </div>
    </aside>
  );
} 