import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Elevated Dark Theme
const theme = {
  elevated: '#27272a',
  text: '#fafafa',
  muted: 'rgba(255, 255, 255, 0.7)',
  border: 'rgba(255, 255, 255, 0.08)',
  accent: '#8b5cf6',
};

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  isNew?: boolean;
}

export function FeatureCard({
  title,
  description,
  href,
  icon,
  isNew,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      style={{
        display: 'block',
        textDecoration: 'none',
      }}
    >
      <div
        style={{
          padding: '1.75rem',
          background: 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)',
          border: `1px solid ${theme.border}`,
          borderRadius: '16px',
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column' as const,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.borderColor = 'rgba(159, 122, 234, 0.3)';
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(159, 122, 234, 0.2)';
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(39, 39, 42, 0.95) 0%, rgba(31, 31, 35, 0.8) 100%)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = theme.border;
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(31, 31, 35, 0.9) 0%, rgba(39, 39, 42, 0.7) 100%)';
        }}
      >
        {/* Icon + New Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          {icon && (
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(139, 92, 246, 0.15)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#a78bfa',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)',
              }}
            >
              {icon}
            </div>
          )}
          {isNew && (
            <span
              style={{
                padding: '0.25rem 0.625rem',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                color: '#ffffff',
                borderRadius: '8px',
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.05em',
              }}
            >
              New
            </span>
          )}
        </div>

        {/* Content */}
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            marginBottom: '0.75rem',
            color: theme.text,
            fontFamily: 'var(--font-literata)',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '0.9375rem',
            color: theme.muted,
            lineHeight: 1.6,
            marginBottom: '1.25rem',
            flexGrow: 1,
          }}
        >
          {description}
        </p>

        {/* Arrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: theme.accent,
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        >
          Learn more
          <ArrowRight style={{ width: '16px', height: '16px' }} />
        </div>
      </div>
    </Link>
  );
}

export default FeatureCard;
