import { BookOpen } from "lucide-react";

const theme = {
  text: '#fafafa',
  muted: 'rgba(250, 250, 250, 0.7)',
  subtle: 'rgba(250, 250, 250, 0.45)',
  border: 'rgba(250, 250, 250, 0.08)',
  accent: '#a78bfa',
  accentMuted: 'rgba(167, 139, 250, 0.08)',
};

interface AgentsDefinitionProps {
  term: string;
  children: React.ReactNode;
}

export function AgentsDefinition({ term, children }: AgentsDefinitionProps) {
  return (
    <div
      style={{
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
        padding: '1.25rem 1.5rem',
        borderRadius: '10px',
        background: theme.accentMuted,
        border: `1px solid rgba(167, 139, 250, 0.12)`,
        position: 'relative',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.625rem',
      }}>
        <BookOpen className="w-4 h-4" style={{ color: theme.accent }} />
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: theme.accent,
        }}>
          Definition
        </span>
      </div>
      <div style={{
        fontSize: '0.875rem',
        lineHeight: 1.65,
        color: theme.muted,
      }}>
        <strong style={{ 
          color: theme.text, 
          fontWeight: 600,
        }}>
          {term}
        </strong>
        {' '}— {children}
      </div>
    </div>
  );
}

export default AgentsDefinition;
