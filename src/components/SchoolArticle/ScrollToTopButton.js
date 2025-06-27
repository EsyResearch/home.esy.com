"use client"

export default function ScrollToTopButton({ scrollProgress }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (scrollProgress <= 20) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '48px',
        height: '48px',
        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
        borderRadius: '50%',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px -4px rgba(99, 102, 241, 0.5)',
        cursor: 'pointer',
        transition: 'all 0.3s',
        zIndex: 100
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 32px -4px rgba(99, 102, 241, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(99, 102, 241, 0.5)';
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  );
} 