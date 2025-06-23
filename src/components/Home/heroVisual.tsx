export default function HeroVisual () {
    return (
      <div className="hero-visual">
        <div className="hero-mockup">
          <div className="mockup-header">
            <div className="mockup-dot"></div>
            <div className="mockup-dot"></div>
            <div className="mockup-dot"></div>
          </div>
          <div className="mockup-content">
            <div className="mockup-editor">
              <p style={{marginBottom: '1rem'}}>
                <span style={{color: '#a855f7'}}>## Introduction</span>
              </p>
              <p style={{marginBottom: '1rem'}}>
                The integration of artificial intelligence into academic writing represents one of the most significant transformations in scholarly communication since the advent of digital publishing...
              </p>
              <p>
                <span style={{color: '#6366f1'}}>AI Suggestion:</span> Consider adding a citation here to strengthen your argument. Recent studies by Chen et al. (2025) demonstrate...
              </p>
            </div>
            
            <div className="floating-card floating-card-1">
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
                <div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#10b981'}}></div>
                <span style={{fontSize: '0.875rem', fontWeight: '600', color: '#10b981'}}>AI Analysis</span>
              </div>
              <p style={{fontSize: '0.875rem', color: 'var(--text-muted)'}}>
                Strong introduction. Consider adding specific examples to support your thesis.
              </p>
            </div>
            
            <div className="floating-card floating-card-2">
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
                  <path d="M9 11L12 14L22 4"></path>
                  <path d="M21 12V19A2 2 0 0119 21H5A2 2 0 013 19V5A2 2 0 015 3H16"></path>
                </svg>
                <span style={{fontSize: '0.875rem', fontWeight: '600', color: '#6366f1'}}>Citation Found</span>
              </div>
              <p style={{fontSize: '0.875rem', color: 'var(--text-muted)'}}>
                Chen, L. et al. (2025) Nature
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  