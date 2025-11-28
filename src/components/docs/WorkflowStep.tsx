import { elevatedDarkTheme } from "@/lib/theme";

interface WorkflowStepProps {
  number: number;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function WorkflowStep({
  number,
  title,
  description,
  children,
}: WorkflowStepProps) {
  return (
    <div className="relative pl-12 pb-8 last:pb-0">
      {/* Connector line */}
      <div 
        className="absolute left-4 top-10 bottom-0 w-0.5 last:hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.5) 0%, rgba(236, 72, 153, 0.2) 100%)',
        }}
      />

      {/* Number badge */}
      <div 
        className="absolute left-0 top-0 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
        style={{
          background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
        }}
      >
        {number}
      </div>

      {/* Content */}
      <div>
        <h3 
          className="text-lg font-semibold mb-2"
          style={{ color: elevatedDarkTheme.text }}
        >
          {title}
        </h3>
        <p 
          className="mb-4"
          style={{ color: elevatedDarkTheme.muted }}
        >
          {description}
        </p>
        {children && (
          <div 
            className="rounded-xl p-4"
            style={{
              backgroundColor: elevatedDarkTheme.elevated,
              border: `1px solid ${elevatedDarkTheme.border}`,
            }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkflowStep;
