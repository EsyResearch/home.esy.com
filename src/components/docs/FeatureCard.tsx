import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Design system colors from DESIGN_SYSTEM.md
const colors = {
  elevated: '#27272a',
  text: '#fafafa',
  muted: '#a1a1aa',
  subtle: '#71717a',
  border: 'rgba(63, 63, 70, 0.4)',
  accent: '#9f7aea',
  accentLight: '#c4b5fd',
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
      className="group relative block p-6 rounded-xl transition-all hover:-translate-y-1"
      style={{
        backgroundColor: colors.elevated,
        border: `1px solid ${colors.border}`,
      }}
    >
      {/* Gradient overlay on hover */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(236, 72, 153, 0.04) 100%)',
        }}
      />

      <div className="relative">
        {/* Icon */}
        {icon && (
          <div 
            className="w-11 h-11 mb-4 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform"
            style={{
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              color: colors.accent,
            }}
          >
            {icon}
          </div>
        )}

        {/* Content */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="font-semibold text-base" style={{ color: colors.text }}>
                {title}
              </h3>
              {isNew && (
                <span 
                  className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md text-white shrink-0"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' }}
                >
                  New
                </span>
              )}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>
              {description}
            </p>
          </div>
          <ArrowRight 
            className="w-5 h-5 shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform"
            style={{ color: colors.subtle }}
          />
        </div>
      </div>
    </Link>
  );
}

export default FeatureCard;
