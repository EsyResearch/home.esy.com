"use client"

export default function RelatedSchoolArticles({ articles }) {
  return (
    <div style={{ marginTop: '4rem' }}>
      <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', color: '#ffffff' }}>
        Continue Learning
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        {articles.map((article, index) => (
          <a 
            key={index}
            href="#" 
            style={{
              display: 'block',
              background: '#16161f',
              border: '1px solid #2a2a3a',
              borderRadius: '12px',
              padding: '1.5rem',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#2a2a3a';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ 
                fontSize: '0.75rem', 
                color: '#6366f1', 
                fontWeight: 600, 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em' 
              }}>
                {article.type}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: '#ffffff' }}>
              {article.title}
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
              {article.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
} 