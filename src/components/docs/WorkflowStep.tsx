// Design system colors from DESIGN_SYSTEM.md
const colors = {
  elevated: '#27272a',
  text: '#fafafa',
  muted: '#a1a1aa',
  border: 'rgba(63, 63, 70, 0.4)',
};

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
    <div className="relative pl-12 pb-6 last:pb-0">
      {/* Connector line */}
      <div 
        className="absolute left-[17px] top-10 bottom-0 w-0.5"
        style={{
          background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.15) 100%)',
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
        <h3 className="text-base font-semibold mb-1" style={{ color: colors.text }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>
          {description}
        </p>
        {children && (
          <div 
            className="rounded-xl p-4 mt-3"
            style={{
              backgroundColor: colors.elevated,
              border: `1px solid ${colors.border}`,
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
