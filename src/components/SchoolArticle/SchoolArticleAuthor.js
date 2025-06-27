"use client"

export default function SchoolArticleAuthor({ author }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      borderRadius: '16px',
      padding: '2rem',
      marginTop: '3rem'
    }}>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <img 
          src={author.avatar}
          alt={author.name}
          style={{ width: '80px', height: '80px', borderRadius: '16px', border: '2px solid #2a2a3a' }}
        />
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: '#ffffff' }}>
            {author.name}
          </h3>
          <p style={{ color: '#6366f1', marginBottom: '0.75rem' }}>{author.title}</p>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {author.bio}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button style={{
              padding: '0.5rem 1rem',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>
              Follow
            </button>
            <button style={{
              padding: '0.5rem 1rem',
              background: '#1e1e2a',
              border: '1px solid #2a2a3a',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 