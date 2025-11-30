import { Info, AlertTriangle, CheckCircle, Lightbulb, Zap } from "lucide-react";

// Elevated Dark Theme
const theme = {
  text: '#fafafa',
  muted: 'rgba(255, 255, 255, 0.7)',
  accent: '#8b5cf6',
  success: '#22c55e',
  warning: '#fbbf24',
  error: '#f87171',
  info: '#60a5fa',
  pink: '#ec4899',
};

type CalloutType = "info" | "warning" | "success" | "tip" | "note";

interface DocsCalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutStyles: Record<
  CalloutType,
  { icon: React.ReactNode; bg: string; border: string; iconColor: string }
> = {
  info: {
    icon: <Info className="w-5 h-5" />,
    bg: 'rgba(96, 165, 250, 0.08)',
    border: 'rgba(96, 165, 250, 0.2)',
    iconColor: theme.info,
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5" />,
    bg: 'rgba(251, 191, 36, 0.08)',
    border: 'rgba(251, 191, 36, 0.2)',
    iconColor: theme.warning,
  },
  success: {
    icon: <CheckCircle className="w-5 h-5" />,
    bg: 'rgba(34, 197, 94, 0.08)',
    border: 'rgba(34, 197, 94, 0.2)',
    iconColor: theme.success,
  },
  tip: {
    icon: <Lightbulb className="w-5 h-5" />,
    bg: 'rgba(139, 92, 246, 0.08)',
    border: 'rgba(139, 92, 246, 0.2)',
    iconColor: theme.accent,
  },
  note: {
    icon: <Zap className="w-5 h-5" />,
    bg: 'rgba(236, 72, 153, 0.08)',
    border: 'rgba(236, 72, 153, 0.2)',
    iconColor: theme.pink,
  },
};

export function DocsCallout({
  type = "info",
  title,
  children,
}: DocsCalloutProps) {
  const styles = calloutStyles[type];

  return (
    <div
      style={{
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
        borderRadius: '12px',
        padding: '1.25rem 1.5rem',
        backgroundColor: styles.bg,
        border: `1px solid ${styles.border}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div 
          style={{ 
            flexShrink: 0,
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: `${styles.iconColor}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: styles.iconColor 
          }}
        >
          {styles.icon}
        </div>
        <div style={{ flex: 1 }}>
          {title && (
            <h4
              style={{
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: styles.iconColor,
                fontSize: '1rem',
                letterSpacing: '-0.01em'
              }}
            >
              {title}
            </h4>
          )}
          <div
            style={{
              fontSize: '0.9375rem',
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

export default DocsCallout;
