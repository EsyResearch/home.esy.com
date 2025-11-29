import { Info, AlertTriangle, CheckCircle, Lightbulb, Zap } from "lucide-react";

// Design system colors from DESIGN_SYSTEM.md
const colors = {
  textSecondary: '#e4e4e7',
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
    bg: "rgba(96, 165, 250, 0.1)",
    border: "rgba(96, 165, 250, 0.3)",
    iconColor: "#60a5fa",
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5" />,
    bg: "rgba(251, 191, 36, 0.1)",
    border: "rgba(251, 191, 36, 0.3)",
    iconColor: "#fbbf24",
  },
  success: {
    icon: <CheckCircle className="w-5 h-5" />,
    bg: "rgba(34, 197, 94, 0.1)",
    border: "rgba(34, 197, 94, 0.3)",
    iconColor: "#22c55e",
  },
  tip: {
    icon: <Lightbulb className="w-5 h-5" />,
    bg: "rgba(139, 92, 246, 0.1)",
    border: "rgba(139, 92, 246, 0.3)",
    iconColor: "#8b5cf6",
  },
  note: {
    icon: <Zap className="w-5 h-5" />,
    bg: "rgba(236, 72, 153, 0.1)",
    border: "rgba(236, 72, 153, 0.3)",
    iconColor: "#ec4899",
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
      className="my-6 rounded-xl p-4"
      style={{
        backgroundColor: styles.bg,
        border: `1px solid ${styles.border}`,
      }}
    >
      <div className="flex gap-3">
        <div className="shrink-0" style={{ color: styles.iconColor }}>
          {styles.icon}
        </div>
        <div className="min-w-0">
          {title && (
            <h4 className="font-semibold mb-1" style={{ color: styles.iconColor }}>
              {title}
            </h4>
          )}
          <div className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocsCallout;
