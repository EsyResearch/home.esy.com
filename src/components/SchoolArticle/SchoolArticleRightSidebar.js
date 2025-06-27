"use client"

export default function SchoolArticleRightSidebar({ article }) {
  return (
    <aside style={{ position: 'sticky', top: '6rem', height: 'fit-content' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Course CTA */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: '#ffffff' }}>
            Master Prompt Engineering
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Get access to our complete course with 50+ lessons, practical exercises, and certification.
          </p>
          <button style={{
            width: '100%',
            padding: '0.75rem',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}>
            Start Learning
          </button>
        </div>

        {/* Newsletter */}
        <div style={{
          background: '#16161f',
          border: '1px solid #2a2a3a',
          borderRadius: '16px',
          padding: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: '#ffffff' }}>
            Weekly AI Insights
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Get the latest prompt engineering tips delivered to your inbox.
          </p>
          <input 
            type="email" 
            placeholder="Your email" 
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              background: '#1e1e2a',
              border: '1px solid #2a2a3a',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '0.875rem',
              marginBottom: '0.75rem',
              outline: 'none'
            }}
          />
          <button style={{
            width: '100%',
            padding: '0.5rem',
            background: '#1e1e2a',
            border: '1px solid #2a2a3a',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}>
            Subscribe
          </button>
        </div>

        {/* Tags */}
        <div style={{
          background: '#16161f',
          border: '1px solid #2a2a3a',
          borderRadius: '16px',
          padding: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#ffffff' }}>
            Topics
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {article.tags.map((tag) => (
              <span 
                key={tag} 
                style={{
                  padding: '0.25rem 0.75rem',
                  background: '#1e1e2a',
                  border: '1px solid #2a2a3a',
                  borderRadius: '24px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2a2a3a';
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
} 