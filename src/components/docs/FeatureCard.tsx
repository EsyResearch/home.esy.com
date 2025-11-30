import Link from "next/link";
import { ArrowRight } from "lucide-react";

const theme = {
  elevated: '#27272a',
  surface: '#1f1f23',
  text: '#fafafa',
  muted: '#a1a1aa',
  subtle: '#71717a',
  border: 'rgba(63, 63, 70, 0.4)',
  borderSubtle: 'rgba(63, 63, 70, 0.2)',
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
      className="group relative block rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2"
      style={{
        backgroundColor: theme.elevated,
        border: `1px solid ${theme.border}`,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Ambient Glow on Hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(236, 72, 153, 0.04) 100%)',
          boxShadow: '0 20px 60px rgba(139, 92, 246, 0.2)',
        }}
      />

      {/* Content */}
      <div className="relative space-y-4">
        {/* Icon & Badge Row */}
        <div className="flex items-start justify-between">
          {icon && (
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                color: theme.accentLight,
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)',
              }}
            >
              {icon}
            </div>
          )}
          {isNew && (
            <span
              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full text-white"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
              }}
            >
              New
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="text-xl font-bold tracking-tight transition-colors duration-200 group-hover:text-violet-300"
          style={{
            color: theme.text,
            fontFamily: 'var(--font-literata), Georgia, serif',
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-base leading-relaxed"
          style={{ color: theme.muted }}
        >
          {description}
        </p>

        {/* Arrow Indicator */}
        <div className="flex items-center gap-2 pt-2">
          <span
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: theme.accent }}
          >
            Learn more
          </span>
          <ArrowRight
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: theme.accent }}
          />
        </div>
      </div>

      {/* Subtle Border Glow on Hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          border: '1px solid rgba(139, 92, 246, 0.3)',
        }}
      />
    </Link>
  );
}

export default FeatureCard;
