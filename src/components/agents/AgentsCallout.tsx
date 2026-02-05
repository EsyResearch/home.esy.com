import { Info, AlertTriangle, CheckCircle, Lightbulb, Zap } from "lucide-react";

const theme = {
  text: '#fafafa',
  muted: 'rgba(250, 250, 250, 0.7)',
  accent: '#00A896',
  success: '#4ade80',
  warning: '#fbbf24',
  error: '#f87171',
  info: '#60a5fa',
};

type CalloutType = "info" | "warning" | "success" | "tip" | "note";

interface AgentsCalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutStyles: Record<
  CalloutType,
  { icon: React.ReactNode; bg: string; border: string; iconColor: string }
> = {
  info: {
    icon: <Info className="w-4 h-4" />,
    bg: 'rgba(96, 165, 250, 0.06)',
    border: 'rgba(96, 165, 250, 0.15)',
    iconColor: theme.info,
  },
  warning: {
    icon: <AlertTriangle className="w-4 h-4" />,
    bg: 'rgba(251, 191, 36, 0.06)',
    border: 'rgba(251, 191, 36, 0.15)',
    iconColor: theme.warning,
  },
  success: {
    icon: <CheckCircle className="w-4 h-4" />,
    bg: 'rgba(74, 222, 128, 0.06)',
    border: 'rgba(74, 222, 128, 0.15)',
    iconColor: theme.success,
  },
  tip: {
    icon: <Lightbulb className="w-4 h-4" />,
    bg: 'rgba(0, 168, 150, 0.06)',
    border: 'rgba(0, 168, 150, 0.15)',
    iconColor: theme.accent,
  },
  note: {
    icon: <Zap className="w-4 h-4" />,
    bg: 'rgba(250, 250, 250, 0.03)',
    border: 'rgba(250, 250, 250, 0.08)',
    iconColor: theme.muted,
  },
};

export function AgentsCallout({
  type = "info",
  title,
  children,
}: AgentsCalloutProps) {
  const styles = calloutStyles[type];

  return (
    <div
      style={{
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
        borderRadius: '10px',
        padding: '1rem 1.25rem',
        backgroundColor: styles.bg,
        border: `1px solid ${styles.border}`,
      }}
    >
      <div style={{ display: 'flex', gap: '0.875rem' }}>
        <div 
          style={{ 
            flexShrink: 0,
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: `${styles.iconColor}10`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: styles.iconColor,
          }}
        >
          {styles.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <h4
              style={{
                fontWeight: 600,
                marginBottom: '0.375rem',
                color: styles.iconColor,
                fontSize: '0.875rem',
                letterSpacing: '-0.01em',
              }}
            >
              {title}
            </h4>
          )}
          <div
            style={{
              fontSize: '0.875rem',
              lineHeight: 1.6,
              color: theme.muted,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentsCallout;
